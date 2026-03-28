import React from 'react'
import { motion } from 'framer-motion'
import { formatDate } from '../../../utils/formatDate'

function openMap(venue, address) {
  const query = encodeURIComponent([venue, address].filter(Boolean).join(', '))
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer')
}

function EventCard({ icon, title, date, time, venue, address, index }) {
  const hasVenue = Boolean(venue)

  return (
    <motion.div
      className="inv-event-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <div className="inv-event-card__icon">{icon}</div>
      <h3 className="inv-event-card__title">{title}</h3>
      {date && <p className="inv-event-card__date">{formatDate(date)}</p>}
      {time && <p className="inv-event-card__time">{time}</p>}
      {hasVenue && (
        <button
          className="inv-event-card__venue-btn"
          onClick={() => openMap(venue, address)}
          title="Open in Google Maps"
        >
          <span className="inv-event-card__venue-pin">📍</span>
          <span>
            <span className="inv-event-card__venue">{venue}</span>
            {address && <span className="inv-event-card__address">{address}</span>}
          </span>
          <span className="inv-event-card__map-hint">View map ↗</span>
        </button>
      )}
    </motion.div>
  )
}

export default function EventsSection({ data }) {
  const events = []

  if (data.mehendi && data.mehendiDate) {
    events.push({
      icon: '🌿',
      title: 'Henna Ceremony',
      date: data.mehendiDate,
      time: data.mehendiTime,
    })
  }

  if (data.haldi && data.haldiDate) {
    events.push({
      icon: '💛',
      title: 'Turmeric Ceremony',
      date: data.haldiDate,
      time: data.haldiTime,
    })
  }

  events.push({
    icon: '✿',
    title: data.eventName || 'Wedding Ceremony',
    date: data.weddingDate,
    time: data.muhurtamTime || data.weddingTime,
    venue: data.venue,
    address: data.venueAddress,
  })

  if (data.receptionVenue) {
    events.push({
      icon: '★',
      title: 'Reception',
      date: data.receptionDate,
      time: data.receptionTime,
      venue: data.receptionVenue,
      address: data.receptionAddress,
    })
  }

  return (
    <section className="inv-events" id="events">
      <div className="inv-section-inner">
        <motion.p
          className="inv-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ✦ Celebrations ✦
        </motion.p>

        <motion.h2
          className="inv-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join Us in the Festivities
        </motion.h2>

        <div className="inv-events__grid">
          {events.map((ev, i) => (
            <EventCard key={ev.title} {...ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
