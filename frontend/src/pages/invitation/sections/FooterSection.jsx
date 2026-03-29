import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { shareInvitation } from '../../../utils/shareUtils'

export default function FooterSection({ data }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const result = await shareInvitation({
      title: `${data.brideName} & ${data.groomName} — Wedding Invitation`,
      text: `You are invited to the wedding of ${data.brideName} & ${data.groomName}!`,
      url: window.location.href,
    })
    if (result.method !== 'native' && result.method !== 'aborted') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <footer className="inv-footer" id="footer">
      <div className="inv-section-inner">
        <motion.div
          className="inv-footer__om"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦
        </motion.div>

        <motion.h2
          className="inv-footer__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Thank You
        </motion.h2>

        <motion.p
          className="inv-footer__message"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your presence and blessings mean the world to us.
          <br />
          We look forward to celebrating this sacred occasion with you.
        </motion.p>

        <motion.div
          className="inv-footer__couple"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {data.brideName} &amp; {data.groomName}
        </motion.div>

        {data.rsvpPhone && (
          <motion.p
            className="inv-footer__contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Contact: {data.rsvpName} · {data.rsvpPhone}
          </motion.p>
        )}

        <motion.button
          className="btn btn-gold inv-footer__share-btn"
          onClick={handleShare}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {copied ? '✓ Link Copied!' : 'Share Invitation ✦'}
        </motion.button>

        <motion.p
          className="inv-footer__credit"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Made with ❤ using eInvite
        </motion.p>

        <motion.p
          className="inv-footer__developer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Developed by{' '}
          <a
            href="https://someshk-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inv-footer__developer-link"
          >
            Somesh
          </a>
        </motion.p>
      </div>
    </footer>
  )
}
