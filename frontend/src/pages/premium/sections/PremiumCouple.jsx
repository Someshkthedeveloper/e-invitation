import React from 'react'
import { motion } from 'framer-motion'
import Reveal from '../Reveal'

function PersonCard({ name, parents, bio, photo, side }) {
  const initial = name?.charAt(0) ?? '?'

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.25rem',
      }}
    >
      {/* Photo */}
      <div
        style={{
          width: '10rem',
          height: '10rem',
          borderRadius: '9999px',
          overflow: 'hidden',
          border: '2px solid rgba(197,160,89,0.3)',
          boxShadow: 'var(--shadow-gold)',
          flexShrink: 0,
          background: 'var(--color-ivory-warm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {photo ? (
          <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3.5rem',
              color: 'var(--color-gold)',
              fontStyle: 'italic',
              lineHeight: 1,
            }}
          >
            {initial}
          </span>
        )}
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.875rem',
          fontWeight: 400,
          color: 'var(--color-charcoal)',
          margin: 0,
        }}
      >
        {name}
      </h3>

      {/* Parents */}
      {parents && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: 'var(--tracking-premium)',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            margin: 0,
          }}
        >
          {parents}
        </p>
      )}

      {/* Bio */}
      {bio && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-muted)',
            lineHeight: 1.75,
            maxWidth: '28rem',
            margin: 0,
          }}
        >
          {bio}
        </p>
      )}
    </motion.div>
  )
}

export default function PremiumCouple({ data }) {
  const { brideName, groomName, brideParents, groomParents, brideBio, groomBio, bridePhoto, groomPhoto } = data

  return (
    <section
      id="couple"
      style={{
        padding: '6rem 1.5rem 9rem',
        background: 'var(--color-ivory)',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        {/* Eyebrow */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '0.75rem',
              }}
            >
              Two Souls
            </p>
            <div style={{ width: '4rem', height: '1px', background: 'var(--color-gold)', margin: '0 auto' }} />
          </div>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
            gap: '3rem 5rem',
          }}
        >
          <PersonCard
            name={brideName}
            parents={brideParents}
            bio={brideBio}
            photo={bridePhoto}
            side="left"
          />
          <PersonCard
            name={groomName}
            parents={groomParents}
            bio={groomBio}
            photo={groomPhoto}
            side="right"
          />
        </div>
      </div>
    </section>
  )
}
