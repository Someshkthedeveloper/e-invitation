import React from 'react'
import { motion } from 'framer-motion'
import { formatDate } from '../../../utils/formatDate'

function openMap(venue, address) {
  const query = encodeURIComponent([venue, address].filter(Boolean).join(', '))
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer')
}

function TimelineItem({ icon, title, date, time, venue, address, index }) {
  const isRight = index % 2 !== 0
  const hasVenue = Boolean(venue)

  return (
    <motion.div
      className={`inv-timeline__item ${isRight ? 'inv-timeline__item--right' : 'inv-timeline__item--left'}`}
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
    >
      <div className="inv-timeline__dot">
        <span className="inv-timeline__dot-icon">{icon}</span>
      </div>

      <div className="inv-timeline__card">
        <h3 className="inv-timeline__card-title">{title}</h3>
        {date && <p className="inv-timeline__card-date">{formatDate(date)}</p>}
        {time && <p className="inv-timeline__card-time">{time}</p>}
        {hasVenue && (
          <button
            className="inv-timeline__card-venue"
            onClick={() => openMap(venue, address)}
            title="Open in Google Maps"
          >
            <span className="inv-timeline__card-pin">📍</span>
            <span className="inv-timeline__card-venue-text">
              <span className="inv-timeline__card-venue-name">{venue}</span>
              {address && <span className="inv-timeline__card-venue-addr">{address}</span>}
            </span>
            <span className="inv-timeline__card-map-hint">View map ↗</span>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function EventsSection({ data }) {
  const events = []

  if (data.mehendi && data.mehendiDate) {
    events.push({ icon: '🌿', title: 'Henna Ceremony', date: data.mehendiDate, time: data.mehendiTime })
  }

  if (data.haldi && data.haldiDate) {
    events.push({ icon: '💛', title: 'Turmeric Ceremony', date: data.haldiDate, time: data.haldiTime })
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

  if (data.customEvents?.length) {
    data.customEvents.forEach(ev => {
      if (ev.title) {
        events.push({ icon: ev.icon || '✦', title: ev.title, date: ev.date, time: ev.time, venue: ev.venue, address: ev.address })
      }
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

        <div className="inv-timeline">
          {events.map((ev, i) => (
            <TimelineItem key={`${ev.title}-${i}`} {...ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
