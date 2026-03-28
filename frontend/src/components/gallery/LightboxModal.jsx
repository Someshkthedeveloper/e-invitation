import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function LightboxModal({ photos, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex ?? 0)

  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrent(i => (i + 1) % photos.length)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [photos.length])

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button className="lightbox-btn lightbox-btn--close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        {/* Prev */}
        {photos.length > 1 && (
          <button className="lightbox-btn lightbox-btn--prev" onClick={prev} aria-label="Previous photo">
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={photos[current]?.url}
            alt={photos[current]?.caption || `Photo ${current + 1}`}
            className="lightbox-img"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>

        {/* Next */}
        {photos.length > 1 && (
          <button className="lightbox-btn lightbox-btn--next" onClick={next} aria-label="Next photo">
            <ChevronRight size={28} />
          </button>
        )}

        {/* Caption + Counter */}
        {photos[current]?.caption && (
          <p className="lightbox-caption">{photos[current].caption}</p>
        )}
        <p className="lightbox-counter">{current + 1} / {photos.length}</p>
      </motion.div>
    </motion.div>
  )
}
