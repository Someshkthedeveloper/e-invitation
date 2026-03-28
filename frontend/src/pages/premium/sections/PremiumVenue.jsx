import React from 'react'
import Reveal from '../Reveal'

function buildMapUrl(venueMapUrl, venue, venueAddress) {
  if (venueMapUrl) return venueMapUrl
  const query = encodeURIComponent([venue, venueAddress].filter(Boolean).join(', '))
  return `https://www.google.com/maps?q=${query}&output=embed`
}

function buildDirectionsUrl(venueDirectionsUrl, venue, venueAddress) {
  if (venueDirectionsUrl) return venueDirectionsUrl
  const query = encodeURIComponent([venue, venueAddress].filter(Boolean).join(', '))
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export default function PremiumVenue({ data }) {
  const { venue, venueAddress, venueMapUrl, venueDirectionsUrl, dressCode } = data

  const mapSrc = buildMapUrl(venueMapUrl, venue, venueAddress)
  const directionsHref = buildDirectionsUrl(venueDirectionsUrl, venue, venueAddress)

  return (
    <section
      id="venue"
      style={{
        padding: '6rem 1.5rem 9rem',
        background: 'var(--color-ivory)',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        {/* Header */}
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
              Where We Gather
            </p>
            <div style={{ width: '4rem', height: '1px', background: 'var(--color-gold)', margin: '0 auto' }} />
          </div>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 24rem), 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left: address card */}
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.25rem',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {venue}
              </h3>

              {venueAddress && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {venueAddress}
                </p>
              )}

              {dressCode && (
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6rem',
                      letterSpacing: 'var(--tracking-premium)',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Dress Code
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-muted)',
                      margin: 0,
                    }}
                  >
                    {dressCode}
                  </p>
                </div>
              )}

              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  letterSpacing: 'var(--tracking-premium)',
                  textTransform: 'uppercase',
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none',
                  border: '1px solid rgba(26,26,26,0.2)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.25rem',
                  transition: 'border-color 0.2s, color 0.2s',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-gold)'
                  e.currentTarget.style.color = 'var(--color-gold)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(26,26,26,0.2)'
                  e.currentTarget.style.color = 'var(--color-charcoal)'
                }}
              >
                Get Directions →
              </a>
            </div>
          </Reveal>

          {/* Right: map */}
          <Reveal delay={0.2}>
            <div
              style={{
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-soft)',
                aspectRatio: '4 / 3',
              }}
            >
              <iframe
                title="Venue Map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
