import React from 'react'
import { motion } from 'framer-motion'
import './SouthIndianClassic.css'

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return dateStr }
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function SouthIndianClassic({ details }) {
  return (
    <div className="sic-wrapper">
      <motion.div
        className="sic"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Silk weave border overlay */}
        <div className="sic__silk-border" />
        <div className="sic__silk-border sic__silk-border--inner" />

        {/* Corner ornaments */}
        <div className="sic__corner sic__corner--tl">✦</div>
        <div className="sic__corner sic__corner--tr">✦</div>
        <div className="sic__corner sic__corner--bl">✦</div>
        <div className="sic__corner sic__corner--br">✦</div>

        {/* Header Band */}
        <div className="sic__header-band">
          <div className="sic__band-text">
            {[...Array(7)].map((_, i) => <span key={i}>✿ शुभ विवाह ✿</span>)}
          </div>
        </div>

        {/* Top Kolam strip */}
        <div className="sic__kolam-strip">
          <span>❋</span><span>✦</span><span>❁</span><span>✦</span><span>❋</span>
          <span>✦</span><span>❁</span><span>✦</span><span>❋</span>
        </div>

        <motion.div className="sic__body" variants={stagger} initial="hidden" animate="visible">

          {/* OM & Blessing */}
          <motion.div className="sic__top" variants={item}>
            <div className="sic__om">ॐ</div>
            <p className="sic__blessing">
              శ్రీమతే రామానుజాయ నమః<br />
              <span>With the blessings of our elders and the grace of the Almighty</span>
            </p>
          </motion.div>

          <motion.div className="sic__divider-ornate" variants={item}>
            <span>✦</span><div className="sic__div-line" /><span>❁</span><div className="sic__div-line" /><span>✦</span>
          </motion.div>

          {/* Event Name */}
          <motion.div className="sic__event-name" variants={item}>
            <h1>{details.eventName || 'Shubha Vivah'}</h1>
          </motion.div>

          {/* Couple Section */}
          <motion.div className="sic__couple" variants={item}>
            <div className="sic__person">
              <p className="sic__person-label">Bride</p>
              <h2 className="sic__person-name">{details.brideName || 'Priya Lakshmi'}</h2>
              <p className="sic__person-parents">D/o {details.brideParents || 'Mr. & Mrs. Ramachandran'}</p>
            </div>

            <div className="sic__couple-center">
              <div className="sic__lotus-ring">
                <span className="sic__lotus-symbol">✿</span>
              </div>
              <p className="sic__with">with</p>
            </div>

            <div className="sic__person sic__person--right">
              <p className="sic__person-label">Groom</p>
              <h2 className="sic__person-name">{details.groomName || 'Arjun Krishnan'}</h2>
              <p className="sic__person-parents">S/o {details.groomParents || 'Mr. & Mrs. Krishnaswamy'}</p>
            </div>
          </motion.div>

          <motion.div className="sic__divider-ornate" variants={item}>
            <span>✦</span><div className="sic__div-line" /><span>❋</span><div className="sic__div-line" /><span>✦</span>
          </motion.div>

          {/* Wedding Details */}
          <motion.div className="sic__ceremony-block" variants={item}>
            <div className="sic__ceremony-header">
              <span>★</span> Wedding Ceremony <span>★</span>
            </div>
            <div className="sic__ceremony-details">
              <div className="sic__detail-row">
                <span className="sic__detail-icon">📅</span>
                <div>
                  <p className="sic__detail-label">Auspicious Date</p>
                  <p className="sic__detail-value">{formatDate(details.weddingDate)}</p>
                </div>
              </div>
              <div className="sic__detail-row">
                <span className="sic__detail-icon">⏰</span>
                <div>
                  <p className="sic__detail-label">Muhurtam Time</p>
                  <p className="sic__detail-value">{details.muhurtamTime || '10:30 AM – 12:00 PM'}</p>
                </div>
              </div>
              <div className="sic__detail-row sic__detail-row--full">
                <span className="sic__detail-icon">📍</span>
                <div>
                  <p className="sic__detail-label">Venue</p>
                  <p className="sic__detail-value sic__detail-value--venue">{details.venue || 'Sri Kapaleeshwarar Temple Hall'}</p>
                  <p className="sic__detail-addr">{details.venueAddress || 'Mylapore, Chennai – 600 004'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reception */}
          {details.receptionVenue && (
            <motion.div className="sic__ceremony-block sic__ceremony-block--reception" variants={item}>
              <div className="sic__ceremony-header">
                <span>❋</span> Reception <span>❋</span>
              </div>
              <div className="sic__ceremony-details sic__ceremony-details--reception">
                <div className="sic__detail-row">
                  <span className="sic__detail-icon">📅</span>
                  <div>
                    <p className="sic__detail-label">Date</p>
                    <p className="sic__detail-value">{formatDate(details.receptionDate)}</p>
                  </div>
                </div>
                <div className="sic__detail-row">
                  <span className="sic__detail-icon">⏰</span>
                  <div>
                    <p className="sic__detail-label">Time</p>
                    <p className="sic__detail-value">{details.receptionTime || '7:00 PM'}</p>
                  </div>
                </div>
                <div className="sic__detail-row sic__detail-row--full">
                  <span className="sic__detail-icon">📍</span>
                  <div>
                    <p className="sic__detail-label">Venue</p>
                    <p className="sic__detail-value sic__detail-value--venue">{details.receptionVenue}</p>
                    <p className="sic__detail-addr">{details.receptionAddress}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pre-Wedding Events */}
          {(details.mehendi || details.haldi) && (
            <motion.div className="sic__pre-wedding" variants={item}>
              <p className="sic__pre-title">✦ Pre-Wedding Celebrations ✦</p>
              <div className="sic__pre-events">
                {details.mehendi && (
                  <div className="sic__pre-event">
                    <span className="sic__pre-icon">🌿</span>
                    <p className="sic__pre-name">Mehendi</p>
                    <p>{formatDate(details.mehendiDate)}</p>
                    <p>{details.mehendiTime}</p>
                  </div>
                )}
                {details.haldi && (
                  <div className="sic__pre-event">
                    <span className="sic__pre-icon">💛</span>
                    <p className="sic__pre-name">Haldi</p>
                    <p>{formatDate(details.haldiDate)}</p>
                    <p>{details.haldiTime}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Dress Code */}
          {details.dressCode && (
            <motion.div className="sic__dress-code" variants={item}>
              <span className="sic__dress-icon">👔</span>
              <p className="sic__dress-label">Dress Code</p>
              <p className="sic__dress-value">{details.dressCode}</p>
            </motion.div>
          )}

          {/* Personal Note */}
          {details.personalNote && (
            <motion.div className="sic__note" variants={item}>
              <p className="sic__note-text">❝ {details.personalNote} ❞</p>
            </motion.div>
          )}

          <motion.div className="sic__divider-ornate" variants={item}>
            <span>✦</span><div className="sic__div-line" /><span>❁</span><div className="sic__div-line" /><span>✦</span>
          </motion.div>

          {/* RSVP */}
          {details.rsvpPhone && (
            <motion.div className="sic__rsvp" variants={item}>
              <p className="sic__rsvp-title">RSVP</p>
              <p className="sic__rsvp-name">{details.rsvpName}</p>
              <div className="sic__rsvp-contacts">
                {details.rsvpPhone && <span>📞 {details.rsvpPhone}</span>}
                {details.rsvpEmail && <span>✉ {details.rsvpEmail}</span>}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div className="sic__footer" variants={item}>
            <p>We request the pleasure of your gracious presence</p>
            <p>to bless the newly wedded couple</p>
          </motion.div>

        </motion.div>

        {/* Bottom Kolam strip */}
        <div className="sic__kolam-strip sic__kolam-strip--bottom">
          <span>❋</span><span>✦</span><span>❁</span><span>✦</span><span>❋</span>
          <span>✦</span><span>❁</span><span>✦</span><span>❋</span>
        </div>

        {/* Footer Band */}
        <div className="sic__header-band">
          <div className="sic__band-text sic__band-text--reverse">
            {[...Array(7)].map((_, i) => <span key={i}>✿ शुभ आशीर्वाद ✿</span>)}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
