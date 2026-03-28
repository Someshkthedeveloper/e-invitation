import React from 'react'
import Reveal from '../Reveal'

export default function PremiumStory({ data }) {
  const { personalNote, brideName, groomName } = data

  if (!personalNote) return null

  return (
    <section
      id="story"
      style={{
        padding: '6rem 1.5rem 9rem',
        background: 'var(--color-charcoal)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Giant decorative & */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: 'var(--font-display)',
          fontSize: '30vw',
          color: 'rgba(197,160,89,0.04)',
          lineHeight: 1,
          fontStyle: 'italic',
        }}
      >
        &amp;
      </div>

      <div style={{ maxWidth: '48rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Opening quote mark */}
        <Reveal delay={0}>
          <div
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '5rem',
              color: 'rgba(197,160,89,0.3)',
              lineHeight: 1,
              marginBottom: '-1rem',
            }}
          >
            &ldquo;
          </div>
        </Reveal>

        {/* Quote */}
        <Reveal delay={0.15}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 3vw, 1.75rem)',
              fontStyle: 'italic',
              color: 'var(--color-ivory)',
              lineHeight: 1.7,
              margin: '0 0 2.5rem',
            }}
          >
            {personalNote}
          </p>
        </Reveal>

        {/* Attribution */}
        <Reveal delay={0.3}>
          <div
            style={{
              width: '3rem',
              height: '1px',
              background: 'rgba(197,160,89,0.4)',
              margin: '0 auto 1.25rem',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
            }}
          >
            {brideName} &amp; {groomName}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
