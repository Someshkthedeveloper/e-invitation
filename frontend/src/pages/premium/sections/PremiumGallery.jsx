import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LightboxModal from '../../../components/gallery/LightboxModal'
import Reveal from '../Reveal'

const CARD_WIDTH = 280 // px
const CARD_GAP = 16

export default function PremiumGallery({ data }) {
  const photos = data.gallery || []
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef(null)

  // Auto-scroll every 2.5 seconds
  useEffect(() => {
    if (photos.length === 0) return
    const interval = setInterval(() => {
      if (!isHovered && carouselRef.current) {
        const el = carouselRef.current
        const maxScroll = el.scrollWidth - el.clientWidth
        if (el.scrollLeft >= maxScroll - 4) {
          el.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          el.scrollBy({ left: CARD_WIDTH + CARD_GAP, behavior: 'smooth' })
        }
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [isHovered, photos.length])

  if (photos.length === 0) return null

  return (
    <section
      id="gallery"
      style={{
        padding: '6rem 0 9rem',
        background: 'var(--color-ivory-warm)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '0 1.5rem', maxWidth: '80rem', margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            {/* Ornamental SVG */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '3rem', height: '1px', background: 'rgba(197,160,89,0.4)' }} />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-gold)' }}>
                <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.6" />
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                <line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
                <line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
                <line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
                <line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
              </svg>
              <div style={{ width: '3rem', height: '1px', background: 'rgba(197,160,89,0.4)' }} />
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '0.75rem',
            }}>
              Our Moments
            </p>
            <div style={{ width: '4rem', height: '1px', background: 'var(--color-gold)', margin: '0 auto' }} />
          </div>
        </Reveal>
      </div>

      {/* Horizontal carousel */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          gap: `${CARD_GAP}px`,
          overflowX: 'auto',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: 'grab',
        }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id || i}
            onClick={() => setLightboxIndex(i)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            style={{
              flexShrink: 0,
              width: `${CARD_WIDTH}px`,
              height: '380px',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '0 4px 24px rgba(26,26,26,0.1)',
            }}
          >
            <img
              src={photo.url}
              alt={photo.caption || `Photo ${i + 1}`}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />

            {/* Bottom vignette */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)',
              pointerEvents: 'none',
            }} />

            {/* Gold shimmer overlay on hover */}
            <div
              className="gallery-shimmer"
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(105deg, transparent 40%, rgba(197,160,89,0.18) 50%, transparent 60%)',
                opacity: 0,
                transition: 'opacity 0.3s',
                pointerEvents: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={e => (e.currentTarget.style.opacity = 0)}
            />

            {/* Caption */}
            {photo.caption && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: 'rgba(249,247,242,0.85)',
                letterSpacing: '0.04em',
              }}>
                {photo.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Scroll hint dots */}
      {photos.length > 3 && (
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0.4rem',
          marginTop: '2rem',
        }}>
          {photos.slice(0, Math.min(photos.length, 8)).map((_, i) => (
            <div
              key={i}
              style={{
                width: '4px', height: '4px',
                borderRadius: '9999px',
                background: i < 3 ? 'var(--color-gold)' : 'rgba(197,160,89,0.25)',
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal
            photos={photos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      <style>{`.gallery-carousel::-webkit-scrollbar { display: none; }`}</style>
    </section>
  )
}
