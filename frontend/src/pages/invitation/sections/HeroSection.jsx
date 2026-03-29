import React from 'react'
import { motion } from 'framer-motion'
import { formatDate } from '../../../utils/formatDate'
import defaultCoverVideo from '../../../assets/video edit.mp4'


const stagger = {
  container: { animate: { transition: { staggerChildren: 0.18 } } },
  item: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  },
}

export default function HeroSection({ data }) {
  const scrollToNext = () => {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="inv-hero" id="hero">
      <div className="inv-hero__bg">
        <video
          className="inv-hero__video"
          src={data.coverVideoUrl || defaultCoverVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="inv-hero__overlay" />
      </div>

      <motion.div
        className="inv-hero__content"
        variants={stagger.container}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={stagger.item} className="inv-hero__om">✦</motion.div>

        <motion.p variants={stagger.item} className="inv-hero__blessing">
          {data.eventName || 'Wedding Celebration'}
        </motion.p>

        <motion.div variants={stagger.item} className="inv-hero__divider-line" />

        <motion.h1 variants={stagger.item} className="inv-hero__names">
          <span className="inv-hero__bride">{data.brideName}</span>
          <span className="inv-hero__ampersand">&amp;</span>
          <span className="inv-hero__groom">{data.groomName}</span>
        </motion.h1>

        <motion.div variants={stagger.item} className="inv-hero__divider-line" />

        <motion.p variants={stagger.item} className="inv-hero__date">
          {formatDate(data.weddingDate)}
          {data.weddingTime && <span className="inv-hero__time"> · {data.weddingTime}</span>}
        </motion.p>

        {data.venue && (
          <motion.p variants={stagger.item} className="inv-hero__venue">
            {data.venue}
          </motion.p>
        )}
      </motion.div>

      <button className="inv-hero__scroll-arrow" onClick={scrollToNext} aria-label="Scroll down">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </button>
    </section>
  )
}
