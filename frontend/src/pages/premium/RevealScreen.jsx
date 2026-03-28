import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { formatDate } from '../../utils/formatDate'

export default function RevealScreen({ data, onReveal }) {
  const [phase, setPhase] = useState(0)
  // 0: idle | 1: flap opening | 2: card rising | 3: overlay fading

  const { brideName, groomName, weddingDate } = data
  const fn = n => n?.split(' ')[0] ?? ''

  const handleSeal = () => {
    if (phase !== 0) return
    setPhase(1)
    setTimeout(() => setPhase(2), 800)
    setTimeout(() => setPhase(3), 2000)
    setTimeout(() => onReveal(), 3000)
  }

  return (
    <motion.div
      animate={{ opacity: phase >= 3 ? 0 : 1 }}
      transition={{ duration: 1.0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #1c1005 0%, #080401 100%)',
        pointerEvents: phase >= 3 ? 'none' : 'auto',
      }}
    >
      {/* Subtle gold dust particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '2px', height: '2px',
            borderRadius: '9999px',
            background: 'rgba(197,160,89,0.5)',
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* 3D perspective container */}
      <div style={{ perspective: '1200px' }}>
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            width: 'min(460px, 88vw)',
            height: 'min(290px, 54vw)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Envelope body */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '4px',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(197,160,89,0.25)',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #ead5aa 0%, #c8a870 100%)' }} />
            {/* Bottom flap */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '55%',
              background: 'linear-gradient(to top, #b89050, #c8a870)',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }} />
            {/* Side flaps */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%',
              background: '#d0b880',
              clipPath: 'polygon(0 0, 0 100%, 100% 50%)',
            }} />
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%',
              background: '#c4ac74',
              clipPath: 'polygon(100% 0, 100% 100%, 0 50%)',
            }} />
          </div>

          {/* Top flap — rotates open */}
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '52%',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: phase >= 2 ? 1 : 4,
            }}
            animate={{ rotateX: phase >= 1 ? 176 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, #b89050, #d0aa70)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              backfaceVisibility: 'hidden',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(0deg, #a87840, #c09060)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
            }} />
          </motion.div>

          {/* Invitation card — slides up */}
          <motion.div
            animate={{ y: phase >= 2 ? '-60%' : '0%' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: '8%', right: '8%', bottom: '4%',
              height: '82%',
              background: 'linear-gradient(160deg, #fefaf3, #f5e8d0)',
              borderRadius: '2px',
              padding: 'clamp(0.75rem, 3vw, 1.5rem)',
              textAlign: 'center',
              zIndex: 2,
              boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
              border: '1px solid rgba(197,160,89,0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {/* Inner border */}
            <div style={{
              position: 'absolute', inset: '7px',
              border: '1px solid rgba(197,160,89,0.3)',
              borderRadius: '1px',
              pointerEvents: 'none',
            }} />

            {/* Wax seal */}
            <motion.button
              onClick={handleSeal}
              whileHover={phase === 0 ? { scale: 1.08 } : {}}
              whileTap={{ scale: 0.93 }}
              style={{
                width: 'clamp(2.5rem, 6vw, 3.25rem)',
                height: 'clamp(2.5rem, 6vw, 3.25rem)',
                borderRadius: '9999px',
                background: 'radial-gradient(circle at 38% 35%, #a52834, #6b1220)',
                border: '2px solid rgba(255,200,100,0.3)',
                cursor: phase === 0 ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,215,120,0.9)',
                fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
                boxShadow: '0 4px 20px rgba(107,18,32,0.5)',
                marginBottom: '0.2rem',
              }}
            >
              ✦
            </motion.button>

            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.9rem, 3vw, 1.35rem)',
              color: '#3a2510',
              letterSpacing: '0.04em',
              margin: 0,
            }}>
              {fn(brideName)} &amp; {fn(groomName)}
            </p>

            <div style={{ width: '3rem', height: '1px', background: 'rgba(197,160,89,0.5)', flexShrink: 0 }} />

            {weddingDate && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.5rem, 1.5vw, 0.68rem)',
                color: 'rgba(58,37,16,0.55)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                {formatDate(weddingDate)}
              </p>
            )}

            {phase === 0 && (
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.45rem, 1.2vw, 0.58rem)',
                  color: 'rgba(197,160,89,0.8)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Tap the seal to open
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
