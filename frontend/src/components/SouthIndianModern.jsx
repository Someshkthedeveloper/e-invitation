import React from 'react'
import { motion } from 'framer-motion'
import './SouthIndianModern.css'

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return dateStr }
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}
const itemRight = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function SouthIndianModern({ details }) {
  return (
    <div className="sim-wrapper">
      <motion.div
        className="sim"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Geometric accent top */}
        <div className="sim__geo-top">
          <div className="sim__diamond-strip">
            {[...Array(14)].map((_, i) => <span key={i}>◆</span>)}
          </div>
        </div>

        <div className="sim__layout">
          {/* Left Column — Dark */}
          <motion.div
            className="sim__left"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="sim__left-top" variants={item}>
              <div className="sim__left-symbol">✦</div>
              <p className="sim__left-eyebrow">{details.eventName || 'Wedding Celebration'}</p>
            </motion.div>

            <motion.div className="sim__couple-block" variants={item}>
              <div className="sim__bride">
                <p className="sim__couple-label">Bride</p>
                <h2 className="sim__couple-name">{details.brideName || 'Priya Lakshmi'}</h2>
                <p className="sim__couple-parents">D/o {details.brideParents || 'Mr. & Mrs. Ramachandran'}</p>
              </div>

              <div className="sim__ampersand">&amp;</div>

              <div className="sim__groom">
                <p className="sim__couple-label">Groom</p>
                <h2 className="sim__couple-name">{details.groomName || 'Arjun Krishnan'}</h2>
                <p className="sim__couple-parents">S/o {details.groomParents || 'Mr. & Mrs. Krishnaswamy'}</p>
              </div>
            </motion.div>

            <motion.div className="sim__left-divider" variants={item} />

            {details.personalNote && (
              <motion.p className="sim__personal-note" variants={item}>
                ❝ {details.personalNote} ❞
              </motion.p>
            )}

            {details.dressCode && (
              <motion.div className="sim__dress-code" variants={item}>
                <p className="sim__dress-label">Dress Code</p>
                <p className="sim__dress-value">{details.dressCode}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Accent Bar */}
          <div className="sim__accent-bar">
            <div className="sim__accent-line" />
            <span className="sim__accent-diamond">◆</span>
            <div className="sim__accent-line" />
          </div>

          {/* Right Column — Light */}
          <motion.div
            className="sim__right"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Wedding Ceremony */}
            <motion.div className="sim__event-block" variants={itemRight}>
              <p className="sim__event-label">Wedding Ceremony</p>
              <div className="sim__event-detail">
                <span className="sim__event-icon">📅</span>
                <span>{formatDate(details.weddingDate)}</span>
              </div>
              <div className="sim__event-detail">
                <span className="sim__event-icon">⏰</span>
                <span>{details.muhurtamTime || '10:30 AM – 12:00 PM'}</span>
              </div>
              <div className="sim__event-detail">
                <span className="sim__event-icon">📍</span>
                <div>
                  <p>{details.venue || 'Sri Kapaleeshwarar Temple Hall'}</p>
                  {details.venueAddress && <p className="sim__addr">{details.venueAddress}</p>}
                </div>
              </div>
            </motion.div>

            {/* Reception */}
            {details.receptionVenue && (
              <motion.div className="sim__event-block sim__event-block--reception" variants={itemRight}>
                <p className="sim__event-label">Reception</p>
                <div className="sim__event-detail">
                  <span className="sim__event-icon">📅</span>
                  <span>{formatDate(details.receptionDate)}</span>
                </div>
                <div className="sim__event-detail">
                  <span className="sim__event-icon">⏰</span>
                  <span>{details.receptionTime || '7:00 PM'}</span>
                </div>
                <div className="sim__event-detail">
                  <span className="sim__event-icon">📍</span>
                  <div>
                    <p>{details.receptionVenue}</p>
                    {details.receptionAddress && <p className="sim__addr">{details.receptionAddress}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pre-Wedding */}
            {(details.mehendi || details.haldi) && (
              <motion.div className="sim__pre-events" variants={itemRight}>
                <p className="sim__event-label">Pre-Wedding</p>
                <div className="sim__pre-list">
                  {details.mehendi && (
                    <div className="sim__pre-item">
                      <span>🌿</span>
                      <div>
                        <p>Henna · {formatDate(details.mehendiDate)}</p>
                        <p className="sim__addr">{details.mehendiTime}</p>
                      </div>
                    </div>
                  )}
                  {details.haldi && (
                    <div className="sim__pre-item">
                      <span>💛</span>
                      <div>
                        <p>Turmeric · {formatDate(details.haldiDate)}</p>
                        <p className="sim__addr">{details.haldiTime}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* RSVP */}
            {details.rsvpPhone && (
              <motion.div className="sim__rsvp" variants={itemRight}>
                <p className="sim__event-label">RSVP</p>
                <p className="sim__rsvp-name">{details.rsvpName}</p>
                <p>📞 {details.rsvpPhone}</p>
                {details.rsvpEmail && <p>✉ {details.rsvpEmail}</p>}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom geometric strip */}
        <div className="sim__geo-bottom">
          <div className="sim__diamond-strip">
            {[...Array(14)].map((_, i) => <span key={i}>◆</span>)}
          </div>
          <p className="sim__footer-text">We joyfully invite you to celebrate with us</p>
        </div>
      </motion.div>
    </div>
  )
}
