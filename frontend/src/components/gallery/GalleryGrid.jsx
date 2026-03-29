import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function GalleryGrid({ photos, onSelect }) {
  const trackRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el || photos.length === 0) return

    const start = () => {
      timerRef.current = setInterval(() => {
        el.scrollLeft += 1
        // Seamless loop: when we've scrolled through the first copy, jump back
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.style.scrollBehavior = 'auto'
          el.scrollLeft -= el.scrollWidth / 2
          // scrollBehavior will reset to default on next paint
        }
      }, 20)
    }

    const pause = () => clearInterval(timerRef.current)

    start()
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', start)
    return () => {
      clearInterval(timerRef.current)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', start)
    }
  }, [photos.length])

  if (!photos || photos.length === 0) return null

  // Duplicate photos for seamless infinite scroll
  const loopPhotos = [...photos, ...photos]

  return (
    <div className="gallery-scroll-wrap">
      <div className="gallery-scroll-track" ref={trackRef}>
        {loopPhotos.map((photo, index) => (
          <motion.div
            key={`${photo.id || index}-${index}`}
            className="gallery-scroll-card"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (index % photos.length) * 0.05, duration: 0.35 }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => onSelect(index % photos.length)}
            role="button"
            tabIndex={0}
            aria-label={photo.caption || `Photo ${(index % photos.length) + 1}`}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(index % photos.length)}
          >
            <img
              src={photo.url}
              alt={photo.caption || `Wedding photo ${(index % photos.length) + 1}`}
              loading="lazy"
              className="gallery-scroll-card__img"
            />
            {photo.caption && (
              <div className="gallery-scroll-card__caption">{photo.caption}</div>
            )}
          </motion.div>
        ))}
      </div>

      <style>{`
        .gallery-scroll-wrap {
          position: relative;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
        }
        .gallery-scroll-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 12px 40px 20px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .gallery-scroll-track::-webkit-scrollbar { display: none; }
        .gallery-scroll-card {
          flex: 0 0 220px;
          height: 270px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border: 1.5px solid rgba(201,149,58,0.25);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          transition: box-shadow 0.25s;
        }
        .gallery-scroll-card:hover {
          box-shadow: 0 8px 28px rgba(201,149,58,0.3);
        }
        .gallery-scroll-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
        .gallery-scroll-card__caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px 12px;
          background: linear-gradient(transparent, rgba(0,0,0,0.6));
          color: #fff;
          font-family: var(--font-serif);
          font-size: 0.82rem;
          font-style: italic;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
