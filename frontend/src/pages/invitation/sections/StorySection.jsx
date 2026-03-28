import React from 'react'
import { motion } from 'framer-motion'

export default function StorySection({ data }) {
  if (!data.personalNote) return null

  return (
    <section className="inv-story" id="story">
      <div className="inv-section-inner">
        <motion.div
          className="inv-story__om"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          ✦
        </motion.div>

        <motion.blockquote
          className="inv-story__quote"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inv-story__quote-mark inv-story__quote-mark--open">❝</span>
          <p className="inv-story__text">{data.personalNote}</p>
          <span className="inv-story__quote-mark inv-story__quote-mark--close">❞</span>
        </motion.blockquote>

        <motion.p
          className="inv-story__attribution"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          — {data.brideName} &amp; {data.groomName}
        </motion.p>
      </div>
    </section>
  )
}
