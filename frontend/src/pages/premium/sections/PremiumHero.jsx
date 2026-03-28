import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { formatDate } from '../../../utils/formatDate'

export default function PremiumHero({ data }) {
  const { brideName, groomName, weddingDate, venue, venueAddress } = data

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '5rem 2rem 4rem',
        textAlign: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #0f0a06 0%, #1a0e08 50%, #0a0604 100%)',
      }}
    >
      {/* Gold bloom behind text */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '60vmax', height: '60vmax',
        borderRadius: '9999px',
        background: 'radial-gradient(circle, rgba(197,160,89,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Corner decorations — top-left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ position: 'absolute', top: '2.5rem', left: '2.5rem', width: '3.5rem', height: '3.5rem', pointerEvents: 'none' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(197,160,89,0.5)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '1px', background: 'rgba(197,160,89,0.5)' }} />
      </motion.div>

      {/* Corner decorations — top-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ position: 'absolute', top: '2.5rem', right: '2.5rem', width: '3.5rem', height: '3.5rem', pointerEvents: 'none' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(197,160,89,0.5)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '1px', background: 'rgba(197,160,89,0.5)' }} />
      </motion.div>

      {/* Corner decorations — bottom-left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', width: '3.5rem', height: '3.5rem', pointerEvents: 'none' }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(197,160,89,0.5)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '1px', background: 'rgba(197,160,89,0.5)' }} />
      </motion.div>

      {/* Corner decorations — bottom-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', width: '3.5rem', height: '3.5rem', pointerEvents: 'none' }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(197,160,89,0.5)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '1px', background: 'rgba(197,160,89,0.5)' }} />
      </motion.div>

      {/* Horizontal lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '2.75rem', left: '6rem', right: '6rem',
          height: '1px', background: 'rgba(197,160,89,0.2)',
          transformOrigin: 'center',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '2.75rem', left: '6rem', right: '6rem',
          height: '1px', background: 'rgba(197,160,89,0.2)',
          transformOrigin: 'center',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.8)',
            marginBottom: '1.5rem',
          }}
        >
          The Wedding of
        </motion.p>

        {/* Groom name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 400,
            color: '#f9f7f2',
            lineHeight: 1.0,
            margin: 0,
            textShadow: '0 0 80px rgba(197,160,89,0.15)',
          }}
        >
          {groomName}
        </motion.h1>

        {/* Ampersand */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            margin: '1rem 0',
            justifyContent: 'center',
          }}
        >
          <div style={{ flex: 1, maxWidth: '8rem', height: '1px', background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.6))' }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
            lineHeight: 1,
          }}>
            &amp;
          </span>
          <div style={{ flex: 1, maxWidth: '8rem', height: '1px', background: 'linear-gradient(to left, transparent, rgba(197,160,89,0.6))' }} />
        </motion.div>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 400,
            color: '#f9f7f2',
            lineHeight: 1.0,
            margin: 0,
            textShadow: '0 0 80px rgba(197,160,89,0.15)',
          }}
        >
          {brideName}
        </motion.h1>

        {/* Date + Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginTop: '2.5rem' }}
        >
          <div style={{ width: '4rem', height: '1px', background: 'rgba(197,160,89,0.5)', margin: '0 auto 1.5rem' }} />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            color: 'rgba(249,247,242,0.55)',
            lineHeight: 1.9,
          }}>
            {formatDate(weddingDate)}
            {venue && (
              <>
                <br />
                {venue}{venueAddress ? `, ${venueAddress}` : ''}
              </>
            )}
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(197,160,89,0.5)',
        }}
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  )
}
