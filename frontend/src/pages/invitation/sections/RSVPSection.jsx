import React from 'react'
import { motion } from 'framer-motion'
import RSVPForm from '../../../components/rsvp/RSVPForm'

export default function RSVPSection({ data }) {
  return (
    <section className="inv-rsvp" id="rsvp">
      <div className="inv-section-inner inv-section-inner--narrow">
        <motion.p
          className="inv-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ✦ RSVP ✦
        </motion.p>

        <motion.h2
          className="inv-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Will You Join Us?
        </motion.h2>

        <motion.p
          className="inv-rsvp__subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Please let us know by filling the form below. Your presence is our greatest blessing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <RSVPForm slug={data.publishedSlug || data.slug} />
        </motion.div>
      </div>
    </section>
  )
}
