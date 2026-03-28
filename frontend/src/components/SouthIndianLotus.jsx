import React from 'react'
import { motion } from 'framer-motion'
import './SouthIndianLotus.css'

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return dateStr }
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function SouthIndianLotus({ details }) {
  return (
    <div className="sil-wrapper">
      <motion.div
        className="sil"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Corner florals */}
        <div className="sil__corner sil__corner--tl">❁</div>
        <div className="sil__corner sil__corner--tr">❁</div>
        <div className="sil__corner sil__corner--bl">❁</div>
        <div className="sil__corner sil__corner--br">❁</div>

        {/* Floral Band */}
        <div className="sil__floral-band">
          <div className="sil__floral-text">
            {[...Array(8)].map((_, i) => <span key={i}>❁ Auspicious Celebrations ❁</span>)}
          </div>
        </div>

        {/* Jasmine border line */}
        <div className="sil__jasmine-line">
          {[...Array(12)].map((_, i) => <span key={i}>✿</span>)}
        </div>

        <motion.div className="sil__body" variants={stagger} initial="hidden" animate="visible">

          {/* Lotus Center */}
          <motion.div className="sil__top" variants={item}>
            <div className="sil__lotus-center">
              <span className="sil__lotus-big">❁</span>
            </div>
            <p className="sil__blessing">
              <span>Blessed by the grace of the Divine Lotus</span>
            </p>
          </motion.div>

          {/* Event Name */}
          <motion.div className="sil__event-name" variants={item}>
            <div className="sil__event-ornament">✦ ✦ ✦</div>
            <h1>{details.eventName || 'Wedding Celebration'}</h1>
            <div className="sil__event-ornament">✦ ✦ ✦</div>
          </motion.div>

          {/* Couple */}
          <motion.div className="sil__couple" variants={item}>
            <div className="sil__bride-block">
              <div className="sil__person-ring">❁</div>
              <p className="sil__person-label">Bride</p>
              <h2 className="sil__person-name">{details.brideName || 'Priya Lakshmi'}</h2>
              <p className="sil__person-parents">D/o {details.brideParents || 'Mr. & Mrs. Ramachandran'}</p>
            </div>

            <div className="sil__couple-sep">
              <div className="sil__sep-line" />
              <span className="sil__sep-heart">♡</span>
              <div className="sil__sep-line" />
            </div>

            <div className="sil__groom-block">
              <div className="sil__person-ring">❁</div>
              <p className="sil__person-label">Groom</p>
              <h2 className="sil__person-name">{details.groomName || 'Arjun Krishnan'}</h2>
              <p className="sil__person-parents">S/o {details.groomParents || 'Mr. & Mrs. Krishnaswamy'}</p>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div className="sil__divider" variants={item}>
            <span>❋</span>
            <div className="sil__div-line" />
            <span>❁</span>
            <div className="sil__div-line" />
            <span>❋</span>
          </motion.div>

          {/* Event Cards */}
          <motion.div className="sil__event-cards" variants={item}>
            <div className="sil__event-card">
              <p className="sil__event-card-label">✿ Wedding Ceremony ✿</p>
              <p className="sil__event-card-date">{formatDate(details.weddingDate)}</p>
              <p className="sil__event-card-time">{details.muhurtamTime || '10:30 AM – 12:00 PM'}</p>
              <p className="sil__event-card-venue">{details.venue || 'Sri Kapaleeshwarar Temple Hall'}</p>
              {details.venueAddress && <p className="sil__event-card-addr">{details.venueAddress}</p>}
            </div>

            {details.receptionVenue && (
              <div className="sil__event-card sil__event-card--reception">
                <p className="sil__event-card-label">❁ Reception ❁</p>
                <p className="sil__event-card-date">{formatDate(details.receptionDate)}</p>
                <p className="sil__event-card-time">{details.receptionTime || '7:00 PM'}</p>
                <p className="sil__event-card-venue">{details.receptionVenue}</p>
                {details.receptionAddress && <p className="sil__event-card-addr">{details.receptionAddress}</p>}
              </div>
            )}
          </motion.div>

          {/* Pre-Wedding */}
          {(details.mehendi || details.haldi) && (
            <motion.div className="sil__pre-wedding" variants={item}>
              <p className="sil__pre-title">Pre-Wedding Celebrations</p>
              <div className="sil__pre-events">
                {details.mehendi && (
                  <div className="sil__pre-event">
                    <span>🌿 Henna</span>
                    <p>{formatDate(details.mehendiDate)} · {details.mehendiTime}</p>
                  </div>
                )}
                {details.haldi && (
                  <div className="sil__pre-event">
                    <span>💛 Turmeric</span>
                    <p>{formatDate(details.haldiDate)} · {details.haldiTime}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Note */}
          {details.personalNote && (
            <motion.div className="sil__note" variants={item}>
              <p>❝ {details.personalNote} ❞</p>
            </motion.div>
          )}

          {/* RSVP */}
          {details.rsvpPhone && (
            <motion.div className="sil__rsvp" variants={item}>
              <p className="sil__rsvp-label">RSVP — {details.rsvpName}</p>
              <div className="sil__rsvp-contacts">
                <span>📞 {details.rsvpPhone}</span>
                {details.rsvpEmail && <span>✉ {details.rsvpEmail}</span>}
              </div>
            </motion.div>
          )}

          {details.dressCode && (
            <motion.div className="sil__dress-code" variants={item}>
              <span>Dress Code: </span>{details.dressCode}
            </motion.div>
          )}

          {/* Footer */}
          <motion.div className="sil__footer" variants={item}>
            <p>Your presence and blessings are our greatest joy</p>
          </motion.div>

        </motion.div>

        {/* Bottom jasmine line */}
        <div className="sil__jasmine-line">
          {[...Array(12)].map((_, i) => <span key={i}>✿</span>)}
        </div>

        {/* Bottom floral band */}
        <div className="sil__floral-band">
          <div className="sil__floral-text sil__floral-text--reverse">
            {[...Array(8)].map((_, i) => <span key={i}>❁ Best Wishes ❁</span>)}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
