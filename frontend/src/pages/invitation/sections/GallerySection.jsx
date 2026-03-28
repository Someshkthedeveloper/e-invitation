import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import GalleryGrid from '../../../components/gallery/GalleryGrid'
import LightboxModal from '../../../components/gallery/LightboxModal'

export default function GallerySection({ data }) {
  const photos = data.gallery || []
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (photos.length === 0) return null

  return (
    <section className="inv-gallery" id="gallery">
      <div className="inv-section-inner">
        <motion.p
          className="inv-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ✦ Memories ✦
        </motion.p>

        <motion.h2
          className="inv-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our Story in Frames
        </motion.h2>

        <GalleryGrid photos={photos} onSelect={setLightboxIndex} />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal
            photos={photos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
