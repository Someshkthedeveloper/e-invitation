import React from 'react'
import { motion } from 'framer-motion'
import ParallaxWrapper from '../../../components/shared/ParallaxWrapper'

function PersonCard({ name, parents, bio, photo, side, delay = 0 }) {
  return (
    <motion.div
      className={`bg-card bg-card--${side}`}
      initial={{ opacity: 0, x: side === 'bride' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
    >
      <div className="bg-card__photo-frame">
        {photo ? (
          <img src={photo} alt={name} className="bg-card__photo" />
        ) : (
          <div className="bg-card__photo-placeholder">
            {side === 'bride' ? '❁' : '✦'}
          </div>
        )}
      </div>
      <div className="bg-card__info">
        <h3 className="bg-card__name">{name}</h3>
        {parents && <p className="bg-card__parents">{parents}</p>}
        {bio && <p className="bg-card__bio">{bio}</p>}
      </div>
    </motion.div>
  )
}

export default function BrideGroomSection({ data }) {
  return (
    <section className="inv-bride-groom" id="couple">
      <ParallaxWrapper speed={0.4} className="inv-bride-groom__bg-parallax">
        <div className="inv-bride-groom__bg-texture" />
      </ParallaxWrapper>

      <div className="inv-section-inner">
        <motion.p
          className="inv-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ✦ The Couple ✦
        </motion.p>

        <motion.h2
          className="inv-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Two Souls, One Journey
        </motion.h2>

        <div className="bg-cards">
          <PersonCard
            name={data.brideName}
            parents={data.brideParents}
            bio={data.brideBio}
            photo={data.bridePhoto}
            side="bride"
            delay={0.1}
          />

          <motion.div
            className="bg-cards__divider"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="bg-cards__divider-symbol">❁</span>
          </motion.div>

          <PersonCard
            name={data.groomName}
            parents={data.groomParents}
            bio={data.groomBio}
            photo={data.groomPhoto}
            side="groom"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}
