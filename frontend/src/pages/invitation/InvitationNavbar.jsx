import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#couple',    label: 'Couple'    },
  { href: '#events',    label: 'Events'    },
  { href: '#venue',     label: 'Venue'     },
  { href: '#gallery',   label: 'Gallery'   },
  { href: '#rsvp',      label: 'RSVP'      },
]

export default function InvitationNavbar({ brideName, groomName }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className={`inv-navbar ${scrolled ? 'inv-navbar--scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      <a href="#hero" className="inv-navbar__brand" onClick={e => handleNavClick(e, '#hero')}>
        <span className="inv-navbar__brand-symbol">✿</span>
        <span className="inv-navbar__brand-names">{brideName} &amp; {groomName}</span>
      </a>

      {/* Desktop links */}
      <div className="inv-navbar__links">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="inv-navbar__link"
            onClick={e => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="inv-navbar__hamburger"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="inv-navbar__mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="inv-navbar__mobile-link"
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
