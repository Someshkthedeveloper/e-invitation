import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWedding } from '../context/WeddingContext'
import './DetailsPage.css'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

function FormSection({ title, icon, children, index }) {
  return (
    <motion.div
      className="form-section"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="form-section__header">
        <span className="form-section__icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="form-section__body">{children}</div>
    </motion.div>
  )
}

function Field({ label, id, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{required && <span className="field__req">*</span>}</label>
      {type === 'textarea' ? (
        <textarea id={id} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  )
}

function Toggle({ label, id, checked, onChange }) {
  return (
    <div className="toggle-field">
      <label htmlFor={id}>{label}</label>
      <button
        className={`toggle ${checked ? 'toggle--on' : ''}`}
        id={id}
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span className="toggle__thumb" />
      </button>
    </div>
  )
}

export default function DetailsPage() {
  const { details, updateDetails } = useWedding()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const set = (key) => (val) => updateDetails({ [key]: val })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      navigate('/templates')
    }, 1200)
  }

  return (
    <div className="details-page">
      <div className="details-page__hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="page-eyebrow">✦ Step 1 of 3 ✦</p>
          <h1>Event Details</h1>
          <p className="page-subtitle">Fill in your wedding details to personalize your invitation</p>
        </motion.div>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit} className="details-form">

          <FormSection title="Ceremony Details" icon="✿" index={0}>
            <div className="field-grid field-grid--2">
              <Field label="Event Name" id="eventName" value={details.eventName} onChange={set('eventName')} placeholder="Shubha Vivah" required />
              <Field label="Wedding Date" id="weddingDate" type="date" value={details.weddingDate} onChange={set('weddingDate')} required />
              <Field label="Muhurtam Time" id="muhurtamTime" value={details.muhurtamTime} onChange={set('muhurtamTime')} placeholder="10:30 AM – 12:00 PM" />
              <Field label="Wedding Time" id="weddingTime" value={details.weddingTime} onChange={set('weddingTime')} placeholder="10:30 AM" />
            </div>
            <div className="field-grid field-grid--2">
              <Field label="Venue Name" id="venue" value={details.venue} onChange={set('venue')} placeholder="Sri Kapaleeshwarar Temple Hall" />
              <Field label="Venue Address" id="venueAddress" value={details.venueAddress} onChange={set('venueAddress')} placeholder="Mylapore, Chennai" />
            </div>
          </FormSection>

          <FormSection title="Bride & Groom" icon="❁" index={1}>
            <div className="field-grid field-grid--2">
              <Field label="Bride's Full Name" id="brideName" value={details.brideName} onChange={set('brideName')} placeholder="Priya Lakshmi" required />
              <Field label="Groom's Full Name" id="groomName" value={details.groomName} onChange={set('groomName')} placeholder="Arjun Krishnan" required />
              <Field label="Bride's Parents" id="brideParents" value={details.brideParents} onChange={set('brideParents')} placeholder="Mr. & Mrs. Ramachandran" />
              <Field label="Groom's Parents" id="groomParents" value={details.groomParents} onChange={set('groomParents')} placeholder="Mr. & Mrs. Krishnaswamy" />
            </div>
          </FormSection>

          <FormSection title="Reception" icon="★" index={2}>
            <div className="field-grid field-grid--2">
              <Field label="Reception Date" id="receptionDate" type="date" value={details.receptionDate} onChange={set('receptionDate')} />
              <Field label="Reception Time" id="receptionTime" value={details.receptionTime} onChange={set('receptionTime')} placeholder="7:00 PM" />
              <Field label="Reception Venue" id="receptionVenue" value={details.receptionVenue} onChange={set('receptionVenue')} placeholder="Narada Gana Sabha" />
              <Field label="Reception Address" id="receptionAddress" value={details.receptionAddress} onChange={set('receptionAddress')} placeholder="T.T.K Road, Chennai" />
            </div>
          </FormSection>

          <FormSection title="Pre-Wedding Events" icon="✦" index={3}>
            <div className="toggle-row">
              <Toggle label="Mehendi Ceremony" id="mehendi" checked={details.mehendi} onChange={set('mehendi')} />
              <Toggle label="Haldi Ceremony" id="haldi" checked={details.haldi} onChange={set('haldi')} />
            </div>
            {details.mehendi && (
              <motion.div className="field-grid field-grid--2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <Field label="Mehendi Date" id="mehendiDate" type="date" value={details.mehendiDate} onChange={set('mehendiDate')} />
                <Field label="Mehendi Time" id="mehendiTime" value={details.mehendiTime} onChange={set('mehendiTime')} placeholder="4:00 PM" />
              </motion.div>
            )}
            {details.haldi && (
              <motion.div className="field-grid field-grid--2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <Field label="Haldi Date" id="haldiDate" type="date" value={details.haldiDate} onChange={set('haldiDate')} />
                <Field label="Haldi Time" id="haldiTime" value={details.haldiTime} onChange={set('haldiTime')} placeholder="6:00 AM" />
              </motion.div>
            )}
          </FormSection>

          <FormSection title="RSVP & Additional Info" icon="❋" index={4}>
            <div className="field-grid field-grid--3">
              <Field label="RSVP Contact Name" id="rsvpName" value={details.rsvpName} onChange={set('rsvpName')} placeholder="Ramachandran" />
              <Field label="RSVP Phone" id="rsvpPhone" value={details.rsvpPhone} onChange={set('rsvpPhone')} placeholder="+91 98765 43210" />
              <Field label="RSVP Email" id="rsvpEmail" type="email" value={details.rsvpEmail} onChange={set('rsvpEmail')} placeholder="email@example.com" />
            </div>
            <div className="field-grid field-grid--2">
              <Field label="Dress Code" id="dressCode" value={details.dressCode} onChange={set('dressCode')} placeholder="Traditional Silk – Deep Reds" />
            </div>
            <Field label="Personal Message / Blessing Note" id="personalNote" type="textarea" value={details.personalNote} onChange={set('personalNote')} placeholder="A personal note to your guests..." />
          </FormSection>

          <motion.div
            className="details-form__footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button type="submit" className={`btn btn-primary btn-lg ${saved ? 'btn--saved' : ''}`}>
              {saved ? '✓ Saved!' : 'Save & Choose Template →'}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
