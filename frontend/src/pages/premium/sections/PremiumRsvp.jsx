import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RSVPForm from '../../../components/rsvp/RSVPForm'
import Reveal from '../Reveal'

export default function PremiumRsvp({ data }) {
  const slug = data.publishedSlug || data.slug
  // RSVP form is hidden by default (off)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      id="rsvp"
      style={{
        padding: '6rem 1.5rem 9rem',
        background: 'var(--color-charcoal)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '50vmax', height: '30vmax',
        background: 'radial-gradient(ellipse, rgba(197,160,89,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '36rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '0.75rem',
            }}>
              Join Us
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 400,
              color: 'var(--color-ivory)',
              margin: '0 0 0.5rem',
            }}>
              RSVP
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'rgba(249,247,242,0.45)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Kindly let us know if you will be joining our celebration
            </p>
            <div style={{ width: '4rem', height: '1px', background: 'rgba(197,160,89,0.35)', margin: '0 auto 2rem' }} />

            {/* Active / Off toggle button */}
            <motion.button
              onClick={() => setIsOpen(v => !v)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.875rem 2.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                background: isOpen
                  ? 'var(--color-gold)'
                  : 'transparent',
                color: isOpen
                  ? '#1A1A1A'
                  : 'rgba(197,160,89,0.85)',
                boxShadow: isOpen
                  ? '0 4px 24px rgba(197,160,89,0.25)'
                  : 'none',
                outline: isOpen
                  ? 'none'
                  : '1px solid rgba(197,160,89,0.35)',
              }}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    display: 'inline-block',
                    width: '6px', height: '6px',
                    borderRadius: '9999px',
                    background: '#1A1A1A',
                  }} />
                  Close Form
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    display: 'inline-block',
                    width: '6px', height: '6px',
                    borderRadius: '9999px',
                    background: 'rgba(197,160,89,0.6)',
                  }} />
                  Send RSVP ✦
                </span>
              )}
            </motion.button>
          </div>
        </Reveal>

        {/* Form — revealed when active */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="rsvp-form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Divider before form */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem',
              }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(197,160,89,0.15)' }} />
                <span style={{ color: 'rgba(197,160,89,0.4)', fontSize: '0.75rem' }}>✦</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(197,160,89,0.15)' }} />
              </div>

              <RSVPForm slug={slug} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
