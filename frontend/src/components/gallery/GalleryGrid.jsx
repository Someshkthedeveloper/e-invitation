import React from 'react'
import { motion } from 'framer-motion'

export default function GalleryGrid({ photos, onSelect }) {
  if (!photos || photos.length === 0) return null

  return (
    <div className="gallery-grid">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id || index}
          className="gallery-grid__item"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => onSelect(index)}
          role="button"
          tabIndex={0}
          aria-label={photo.caption || `Photo ${index + 1}`}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(index)}
        >
          <img
            src={photo.url}
            alt={photo.caption || `Wedding photo ${index + 1}`}
            loading="lazy"
            className="gallery-grid__img"
          />
          {photo.caption && (
            <div className="gallery-grid__caption">{photo.caption}</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
