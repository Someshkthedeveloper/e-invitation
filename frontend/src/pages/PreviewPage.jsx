import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useWedding } from '../context/WeddingContext'
import SouthIndianClassic from '../components/SouthIndianClassic'
import SouthIndianLotus from '../components/SouthIndianLotus'
import SouthIndianModern from '../components/SouthIndianModern'
import { formatDate } from '../utils/formatDate'
import { copyToClipboard } from '../utils/shareUtils'
import './PreviewPage.css'

const templateMap = {
  'south-indian-classic': SouthIndianClassic,
  'south-indian-lotus':   SouthIndianLotus,
  'south-indian-modern':  SouthIndianModern,
}

export default function PreviewPage() {
  const { details, selectedTemplate, publishInvitation, publishing, publishError } = useWedding()
  const [copied, setCopied]         = useState(false)
  const [publishedLink, setPublishedLink] = useState(
    details.isPublished && details.publishedSlug
      ? `${window.location.origin}/invitation/${details.publishedSlug}`
      : null
  )

  const TemplateComponent = templateMap[selectedTemplate] || SouthIndianClassic

  const handlePrint = () => window.print()

  const handlePublish = async () => {
    try {
      const slug = await publishInvitation()
      const link = `${window.location.origin}/invitation/${slug}`
      setPublishedLink(link)
    } catch {
      // publishError is set in context
    }
  }

  const handleCopyPublishedLink = async () => {
    if (!publishedLink) return
    await copyToClipboard(publishedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <motion.div
      className="preview-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Action Bar */}
      <div className="preview-page__action-bar no-print">
        <div className="preview-page__action-bar-inner">
          <p className="page-eyebrow" style={{ margin: 0 }}>✦ Review &amp; Publish ✦</p>
          <div className="preview-page__actions">
            <Link to="/create" className="btn btn-outline">← Edit Details</Link>
            <Link to="/create" className="btn btn-outline">Change Template</Link>
            <button className="btn btn-primary" onClick={handlePrint}>🖨 Print / Save PDF</button>
            {!publishedLink ? (
              <button
                className="btn btn-gold"
                onClick={handlePublish}
                disabled={publishing}
              >
                {publishing ? 'Publishing…' : '✦ Publish & Get Link'}
              </button>
            ) : (
              <button className="btn btn-gold" onClick={handleCopyPublishedLink}>
                {copied ? '✓ Copied!' : '🔗 Copy Guest Link'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Publish success banner */}
      <AnimatePresence>
        {publishedLink && (
          <motion.div
            className="preview-page__publish-banner no-print"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <span>🎉 Your invitation is live!</span>
            <a href={publishedLink} target="_blank" rel="noopener noreferrer" className="preview-page__publish-link">
              {publishedLink}
            </a>
            <button className="btn btn-gold" style={{ padding: '8px 16px', fontSize: '0.78rem' }} onClick={handleCopyPublishedLink}>
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {publishError && (
        <div className="preview-page__publish-error no-print">
          ⚠ {publishError}
        </div>
      )}

      {/* Invitation */}
      <div className="preview-page__invitation">
        <TemplateComponent details={details} />
      </div>

      {/* Summary Table */}
      <div className="preview-page__summary no-print">
        <div className="container">
          <h2 className="preview-page__summary-title">Invitation Summary</h2>
          <table className="summary-table">
            <tbody>
              <tr><th>Event</th><td>{details.eventName || '—'}</td></tr>
              <tr><th>Bride</th><td>{details.brideName || '—'}</td></tr>
              <tr><th>Groom</th><td>{details.groomName || '—'}</td></tr>
              <tr><th>Wedding Date</th><td>{formatDate(details.weddingDate)}</td></tr>
              <tr><th>Auspicious Time</th><td>{details.muhurtamTime || '—'}</td></tr>
              <tr><th>Venue</th><td>{details.venue || '—'}{details.venueAddress ? `, ${details.venueAddress}` : ''}</td></tr>
              {details.receptionVenue && (
                <>
                  <tr><th>Reception Date</th><td>{formatDate(details.receptionDate)}</td></tr>
                  <tr><th>Reception Venue</th><td>{details.receptionVenue}</td></tr>
                </>
              )}
              {details.mehendi && <tr><th>Mehendi</th><td>{formatDate(details.mehendiDate)} · {details.mehendiTime}</td></tr>}
              {details.haldi && <tr><th>Haldi</th><td>{formatDate(details.haldiDate)} · {details.haldiTime}</td></tr>}
              {details.dressCode && <tr><th>Dress Code</th><td>{details.dressCode}</td></tr>}
              {details.rsvpPhone && <tr><th>RSVP</th><td>{details.rsvpName} · {details.rsvpPhone}</td></tr>}
              {publishedLink && <tr><th>Guest Link</th><td><a href={publishedLink} target="_blank" rel="noopener noreferrer">{publishedLink}</a></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
