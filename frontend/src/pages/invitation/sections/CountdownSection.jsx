import React from 'react'
import { motion } from 'framer-motion'
import CountdownTimer from '../../../components/shared/CountdownTimer'

export default function CountdownSection({ data }) {
  return (
    <section className="inv-countdown" id="countdown">
      <div className="inv-section-inner">
        <motion.p
          className="inv-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ✦ Save the Date ✦
        </motion.p>

        <motion.h2
          className="inv-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Counting Down to Forever
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CountdownTimer targetDate={data.weddingDate} />
        </motion.div>
      </div>
    </section>
  )
}
