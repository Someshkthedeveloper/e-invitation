import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { shareInvitation } from '../../../utils/shareUtils'

export default function PremiumFooter({ data }) {
  const { brideName, groomName, rsvpEmail, rsvpPhone, publishedSlug, slug } = data
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const invSlug = publishedSlug || slug
    const url = invSlug ? `${window.location.origin}/w/${invSlug}` : window.location.href
    await shareInvitation({
      title: `${brideName} & ${groomName}'s Wedding`,
      text: "You're invited to our wedding celebration!",
      url,
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const firstName = n => n?.split(' ')[0] ?? ''

  return (
    <footer
      style={{
        padding: '5rem 1.5rem 7rem',
        background: 'var(--color-ivory-warm)',
        borderTop: '1px solid rgba(197,160,89,0.15)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '40rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {/* Ornamental divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '20rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(197,160,89,0.25)' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '0.875rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(197,160,89,0.25)' }} />
        </div>

        {/* Couple names */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 3.75rem)',
            fontWeight: 400,
            color: 'var(--color-charcoal)',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {firstName(brideName)} &amp; {firstName(groomName)}
        </h2>

        {/* Thank-you */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-muted)',
            lineHeight: 1.8,
            maxWidth: '28rem',
            margin: 0,
          }}
        >
          Thank you for being part of our journey. Your presence and blessings mean the world to us.
        </p>

        {/* Contact */}
        {(rsvpEmail || rsvpPhone) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: 'var(--tracking-premium)',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '0.25rem',
              }}
            >
              Get in Touch
            </p>
            {rsvpPhone && (
              <a
                href={`tel:${rsvpPhone}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                }}
              >
                {rsvpPhone}
              </a>
            )}
            {rsvpEmail && (
              <a
                href={`mailto:${rsvpEmail}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                }}
              >
                {rsvpEmail}
              </a>
            )}
          </div>
        )}

        {/* Share button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          style={{
            background: copied ? 'var(--color-gold)' : 'var(--color-charcoal)',
            color: copied ? 'var(--color-charcoal)' : 'var(--color-ivory)',
            border: 'none',
            padding: '0.875rem 2.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: 'var(--tracking-premium)',
            textTransform: 'uppercase',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            transition: 'background 0.25s, color 0.25s',
          }}
        >
          {copied ? '✓ Link Copied' : 'Share Invitation'}
        </motion.button>

        {/* Bottom divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '20rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(197,160,89,0.25)' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '0.875rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(197,160,89,0.25)' }} />
        </div>

        {/* Credit */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            color: 'rgba(107,101,96,0.5)',
            margin: 0,
          }}
        >
          Made with care using eInvite
        </p>
      </div>
    </footer>
  )
}
