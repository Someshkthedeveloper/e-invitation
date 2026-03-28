import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './HomePage.css'

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 10 + Math.random() * 14,
}))

const features = [
  {
    icon: '✿',
    title: 'Fill Your Details',
    desc: 'Enter names, dates, venue, and personal notes through our elegant form.',
  },
  {
    icon: '❁',
    title: 'Choose a Template',
    desc: 'Pick from 3 stunning South Indian designs — Classic, Lotus, or Modern.',
  },
  {
    icon: '★',
    title: 'Preview & Print',
    desc: 'See your invitation live, then save it as a PDF or share the link.',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function HomePage() {
  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Falling Petals */}
      <div className="home__petals" aria-hidden="true">
        {PETALS.map(p => (
          <span
            key={p.id}
            className="home__petal"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              fontSize: `${p.size}px`,
            }}
          >
            ✿
          </span>
        ))}
      </div>

      {/* Hero */}
      <section className="home__hero">
        <motion.div
          className="home__hero-content"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="page-eyebrow" variants={fadeUp}>
            ✦ Traditional · Elegant · Personal ✦
          </motion.p>

          <motion.div className="home__kolam-ring" variants={fadeUp}>
            <span className="home__kolam-symbol">✦</span>
          </motion.div>

          <motion.h1 className="home__title" variants={fadeUp}>
            eInvite
          </motion.h1>

          <motion.p className="home__subtitle" variants={fadeUp}>
            Create breathtaking South Indian wedding invitations<br />
            adorned with traditional beauty and modern elegance
          </motion.p>

          <motion.div className="home__cta" variants={fadeUp}>
            <Link to="/details" className="btn btn-primary btn-lg">
              Create My Invitation
            </Link>
            <Link to="/preview" className="btn btn-outline btn-lg">
              See a Demo
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="home__features">
        <div className="container">
          <motion.div
            className="home__features-grid"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((f, i) => (
              <motion.div key={i} className="home__feature-card" variants={fadeUp}>
                <div className="home__feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="home__feature-step">Step {i + 1}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Templates preview */}
      <section className="home__templates-preview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="page-eyebrow">Our Templates</p>
            <h2 className="home__section-title">Three Styles of Timeless Beauty</h2>
          </motion.div>

          <motion.div
            className="home__template-swatches"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { name: 'Kanchipuram Classic', colors: ['#8B1A1A', '#C9953A', '#FAF6EF'], icon: '❋' },
              { name: 'Lotus Bloom',         colors: ['#6B3A6E', '#C9953A', '#FBF0FF'], icon: '❁' },
              { name: 'Modern Pattam',       colors: ['#1A3A5C', '#C9953A', '#FFFFFF'], icon: '✦' },
            ].map((t, i) => (
              <motion.div key={i} className="home__swatch-card" variants={fadeUp}>
                <div className="home__swatch-colors">
                  {t.colors.map((c, j) => (
                    <div key={j} className="home__swatch-dot" style={{ background: c }} />
                  ))}
                </div>
                <span className="home__swatch-icon">{t.icon}</span>
                <p className="home__swatch-name">{t.name}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ textAlign: 'center', marginTop: '32px' }}
          >
            <Link to="/details" className="btn btn-primary btn-lg">
              Start Creating — It's Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home__footer">
        <p>✦ eInvite — Crafted with devotion ✦</p>
      </footer>
    </motion.div>
  )
}
