import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRsvpForm } from '../../hooks/useRsvpForm'

export default function RSVPForm({ slug }) {
  const { form, setField, status, error, handleSubmit } = useRsvpForm(slug)

  if (status === 'success') {
    return (
      <AnimatePresence>
        <motion.div
          className="rsvp-success"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="rsvp-success__icon">✿</div>
          <h3>Thank You!</h3>
          <p>Your RSVP has been received. We look forward to celebrating with you.</p>
          <p className="rsvp-success__blessing">✦ May your blessings be with us ✦</p>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="rsvp-form__row">
        <div className="rsvp-form__field">
          <label htmlFor="rsvp-name">Full Name *</label>
          <input
            id="rsvp-name"
            type="text"
            required
            value={form.name}
            onChange={e => setField('name')(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="rsvp-form__field">
          <label htmlFor="rsvp-email">Email Address</label>
          <input
            id="rsvp-email"
            type="email"
            value={form.email}
            onChange={e => setField('email')(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="rsvp-form__row">
        <div className="rsvp-form__field">
          <label>Will You Attend? *</label>
          <div className="rsvp-form__radio-group">
            {['yes', 'no', 'maybe'].map(opt => (
              <label key={opt} className={`rsvp-form__radio ${form.attending === opt ? 'rsvp-form__radio--active' : ''}`}>
                <input
                  type="radio"
                  name="attending"
                  value={opt}
                  checked={form.attending === opt}
                  onChange={() => setField('attending')(opt)}
                />
                {opt === 'yes' ? 'Joyfully Attending' : opt === 'no' ? 'Regretfully Declining' : 'Perhaps'}
              </label>
            ))}
          </div>
        </div>
        <div className="rsvp-form__field">
          <label htmlFor="rsvp-guests">Number of Guests</label>
          <input
            id="rsvp-guests"
            type="number"
            min={1}
            max={10}
            value={form.guestCount}
            onChange={e => setField('guestCount')(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="rsvp-form__row">
        <div className="rsvp-form__field">
          <label htmlFor="rsvp-meal">Meal Preference</label>
          <select
            id="rsvp-meal"
            value={form.mealPref}
            onChange={e => setField('mealPref')(e.target.value)}
          >
            <option value="">No preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="jain">Jain</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
          </select>
        </div>
      </div>

      <div className="rsvp-form__field">
        <label htmlFor="rsvp-message">Message for the Couple</label>
        <textarea
          id="rsvp-message"
          rows={3}
          value={form.message}
          onChange={e => setField('message')(e.target.value)}
          placeholder="Share your blessings or a message..."
        />
      </div>

      {error && <p className="rsvp-form__error">{error}</p>}

      <button
        type="submit"
        className="btn btn-primary btn-lg rsvp-form__submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <span className="rsvp-form__loading">Sending ✦</span>
        ) : (
          'Send RSVP ✦'
        )}
      </button>
    </form>
  )
}
