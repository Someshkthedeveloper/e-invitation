import React from 'react'
import { motion } from 'framer-motion'
import { useCountdown } from '../../../hooks/useCountdown'
import Reveal from '../Reveal'

const UNITS = [
  { key: 'days',    label: 'Days' },
  { key: 'hours',   label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

function CountBox({ value, label, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'clamp(4.5rem, 16vw, 7rem)',
          height: 'clamp(5rem, 18vw, 8rem)',
          border: '1px solid rgba(197,160,89,0.4)',
          background: 'rgba(197,160,89,0.04)',
          gap: '0.35rem',
        }}
      >
        {/* Corner accent — top-right */}
        <div style={{
          position: 'absolute', top: '-1px', right: '-1px',
          width: '10px', height: '10px',
          borderTop: '2px solid var(--color-gold)',
          borderRight: '2px solid var(--color-gold)',
        }} />
        {/* Corner accent — bottom-left */}
        <div style={{
          position: 'absolute', bottom: '-1px', left: '-1px',
          width: '10px', height: '10px',
          borderBottom: '2px solid var(--color-gold)',
          borderLeft: '2px solid var(--color-gold)',
        }} />

        {/* Number */}
        <motion.span
          key={value}
          initial={{ opacity: 0.4, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 7vw, 3.25rem)',
            fontWeight: 400,
            color: 'var(--color-ivory)',
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>

        {/* Label */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.5rem, 1.5vw, 0.65rem)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(197,160,89,0.7)',
        }}>
          {label}
        </span>
      </div>
    </Reveal>
  )
}

export default function PremiumCountdown({ data }) {
  const timeLeft = useCountdown(data.weddingDate)

  if (timeLeft.passed) return null

  return (
    <section
      style={{
        padding: '6rem 1.5rem 8rem',
        background: 'linear-gradient(160deg, #0f0a06 0%, #160d08 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '50vmax', height: '30vmax',
        background: 'radial-gradient(ellipse, rgba(197,160,89,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.7)',
            marginBottom: '3.5rem',
          }}>
            Until We Say I Do
          </p>
        </Reveal>

        {/* Countdown boxes with separators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.4rem, 2vw, 1rem)',
          flexWrap: 'wrap',
        }}>
          {UNITS.map(({ key, label }, i) => (
            <React.Fragment key={key}>
              <CountBox value={timeLeft[key]} label={label} delay={0.1 + i * 0.1} />
              {i < UNITS.length - 1 && (
                <Reveal delay={0.15 + i * 0.1}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    color: 'rgba(197,160,89,0.5)',
                    lineHeight: 1,
                    userSelect: 'none',
                    marginTop: '-1.5rem',
                  }}>
                    :
                  </span>
                </Reveal>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
