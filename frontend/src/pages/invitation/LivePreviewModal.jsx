import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InvitationNavbar from './InvitationNavbar'
import HeroSection from './sections/HeroSection'
import CountdownSection from './sections/CountdownSection'
import BrideGroomSection from './sections/BrideGroomSection'
import StorySection from './sections/StorySection'
import EventsSection from './sections/EventsSection'
import VenueSection from './sections/VenueSection'
import GallerySection from './sections/GallerySection'
import RSVPSection from './sections/RSVPSection'
import FooterSection from './sections/FooterSection'
import './InvitationPage.css'

export default function LivePreviewModal({ data, templateName, onClose, onSelect }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="live-preview-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Sticky action bar */}
        <div className="live-preview-bar">
          <div className="live-preview-bar__left">
            <span className="live-preview-bar__label">Live Preview</span>
            <span className="live-preview-bar__template">{templateName}</span>
          </div>
          <div className="live-preview-bar__right">
            <button className="live-preview-bar__select" onClick={onSelect}>
              Use This Template →
            </button>
            <button className="live-preview-bar__close" onClick={onClose} aria-label="Close preview">
              ✕ Close
            </button>
          </div>
        </div>

        {/* Scrollable invitation content */}
        <motion.div
          className="live-preview-scroll"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <div className="invitation-page">
            <InvitationNavbar brideName={data.brideName} groomName={data.groomName} />
            <HeroSection data={data} />
            <CountdownSection data={data} />
            <BrideGroomSection data={data} />
            <StorySection data={data} />
            <EventsSection data={data} />
            <VenueSection data={data} />
            <GallerySection data={data} />
            <RSVPSection data={data} />
            <FooterSection data={data} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
