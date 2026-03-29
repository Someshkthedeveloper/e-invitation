import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getUserInvitations } from '../../services/api'
import { formatDate } from '../../utils/formatDate'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const TEMPLATE_LABELS = {
  'south-indian-classic': 'Kanchipuram Classic',
  'south-indian-lotus':   'Lotus Bloom',
  'south-indian-modern':  'Modern Pattam',
}

export default function DashboardPage() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) { setLoading(false); return }
    getUserInvitations()
      .then(data => { setInvitations(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  return (
    <motion.div
      className="db-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <div className="db-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="db-hero__inner"
        >
          <p className="page-eyebrow">✦ Dashboard ✦</p>
          <h1 className="db-hero__title">My Invitations</h1>
          <p className="page-subtitle">Manage and share your published wedding invitations</p>
        </motion.div>

        {invitations.length > 0 && (
          <motion.div
            className="db-stats"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="db-stats__pill">
              <span className="db-stats__num">{invitations.length}</span>
              <span className="db-stats__label">{invitations.length === 1 ? 'Invitation' : 'Invitations'}</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="db-body container">
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <LoadingSpinner size={52} message="Loading invitations…" />
          </div>
        )}

        {error && (
          <p className="db-error">{error}</p>
        )}

        {!loading && !error && invitations.length === 0 && (
          <motion.div
            className="db-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="db-empty__icon">✿</div>
            <h3 className="db-empty__heading">No invitations yet</h3>
            <p className="db-empty__text">
              {import.meta.env.VITE_API_URL
                ? 'Create your first digital wedding invitation and share it with your loved ones.'
                : 'Connect a backend (set VITE_API_URL) to manage saved invitations.'}
            </p>
            <Link to="/create" className="btn btn-primary btn-lg">
              Create Invitation →
            </Link>
          </motion.div>
        )}

        {!loading && invitations.length > 0 && (
          <>
            <div className="db-grid">
              {invitations.map((inv, i) => {
                const coverPhoto = inv.bridePhoto || inv.groomPhoto || null
                const templateLabel = TEMPLATE_LABELS[inv.selectedTemplate] || inv.selectedTemplate || 'Classic'
                return (
                  <motion.div
                    key={inv.slug || i}
                    className="db-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    {/* Card photo header */}
                    <div className="db-card__cover">
                      {coverPhoto ? (
                        <img src={coverPhoto} alt="" className="db-card__cover-img" />
                      ) : (
                        <div className="db-card__cover-placeholder">
                          <span>✿</span>
                        </div>
                      )}
                      <div className="db-card__cover-overlay">
                        <span className="db-card__template-badge">{templateLabel}</span>
                      </div>
                    </div>

                    {/* Couple photos strip */}
                    {(inv.bridePhoto || inv.groomPhoto) && (
                      <div className="db-card__avatars">
                        {inv.bridePhoto && (
                          <img src={inv.bridePhoto} alt={inv.brideName} className="db-card__avatar" />
                        )}
                        {inv.groomPhoto && (
                          <img src={inv.groomPhoto} alt={inv.groomName} className="db-card__avatar db-card__avatar--offset" />
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="db-card__body">
                      <h3 className="db-card__names">
                        {inv.brideName || '—'} &amp; {inv.groomName || '—'}
                      </h3>
                      <p className="db-card__date">{formatDate(inv.weddingDate) || '—'}</p>
                      {inv.gallery?.length > 0 && (
                        <p className="db-card__meta">{inv.gallery.length} photo{inv.gallery.length !== 1 ? 's' : ''}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="db-card__actions">
                      <a
                        href={`/invitation/${inv.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="db-card__btn db-card__btn--outline"
                      >
                        View ↗
                      </a>
                      <Link
                        to={`/dashboard/${inv.slug}/rsvps`}
                        className="db-card__btn db-card__btn--primary"
                      >
                        RSVPs
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="db-footer-cta">
              <Link to="/create" className="btn btn-outline">
                + Create Another
              </Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        .db-page { min-height: 100vh; }

        /* Hero */
        .db-hero {
          background: linear-gradient(160deg, var(--crimson-deep) 0%, var(--crimson) 60%, var(--surface-raised) 100%);
          padding: 60px 24px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .db-hero::before {
          content: '✿';
          position: absolute;
          font-size: 280px;
          color: rgba(255,255,255,0.03);
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          line-height: 1;
        }
        .db-hero__inner { position: relative; z-index: 1; }
        .db-hero .page-eyebrow { color: var(--gold-light); }
        .db-hero__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          color: #fff;
          letter-spacing: 0.04em;
          margin: 8px 0 12px;
        }
        .db-hero .page-subtitle { color: rgba(255,255,255,0.7); }

        /* Stats */
        .db-stats {
          display: flex;
          justify-content: center;
          margin-top: 24px;
          position: relative;
          z-index: 1;
        }
        .db-stats__pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          border-radius: 100px;
          padding: 8px 20px;
        }
        .db-stats__num {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--gold-light);
          font-weight: 600;
        }
        .db-stats__label {
          font-family: var(--font-serif);
          font-size: 0.9rem;
          color: rgba(255,255,255,0.75);
          font-style: italic;
        }

        /* Body */
        .db-body {
          padding-top: 48px;
          padding-bottom: 80px;
        }
        .db-error {
          color: var(--crimson);
          font-family: var(--font-serif);
          text-align: center;
          padding: 40px 0;
        }

        /* Empty state */
        .db-empty {
          text-align: center;
          padding: 80px 24px;
          max-width: 420px;
          margin: 0 auto;
        }
        .db-empty__icon {
          font-size: 3.5rem;
          color: var(--gold);
          margin-bottom: 20px;
          opacity: 0.5;
        }
        .db-empty__heading {
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: var(--text-primary);
          margin-bottom: 12px;
          letter-spacing: 0.04em;
        }
        .db-empty__text {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: var(--text-muted);
          font-style: italic;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        /* Grid */
        .db-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }

        /* Card */
        .db-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .db-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(201,149,58,0.2);
        }

        /* Cover */
        .db-card__cover {
          height: 160px;
          position: relative;
          background: var(--surface-raised);
          overflow: hidden;
        }
        .db-card__cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .db-card__cover-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--crimson-deep) 0%, var(--surface-raised) 100%);
          font-size: 3rem;
          color: rgba(201,149,58,0.25);
        }
        .db-card__cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%);
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 12px;
        }
        .db-card__template-badge {
          background: rgba(0,0,0,0.45);
          color: var(--gold-light);
          font-family: var(--font-display);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(201,149,58,0.35);
          backdrop-filter: blur(4px);
        }

        /* Avatars */
        .db-card__avatars {
          display: flex;
          padding: 0 20px;
          margin-top: -20px;
          gap: 0;
          position: relative;
          z-index: 2;
        }
        .db-card__avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid var(--surface);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .db-card__avatar--offset { margin-left: -10px; }

        /* Body */
        .db-card__body {
          padding: 14px 20px 10px;
          flex: 1;
        }
        .db-card__names {
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: var(--crimson);
          letter-spacing: 0.03em;
          margin-bottom: 5px;
        }
        .db-card__date {
          font-family: var(--font-serif);
          font-size: 0.9rem;
          color: var(--text-muted);
          font-style: italic;
          margin-bottom: 4px;
        }
        .db-card__meta {
          font-family: var(--font-display);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 4px;
        }

        /* Actions */
        .db-card__actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 1px solid var(--border);
        }
        .db-card__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 8px;
          font-family: var(--font-display);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .db-card__btn--outline {
          background: transparent;
          color: var(--crimson);
          border-right: 1px solid var(--border);
        }
        .db-card__btn--outline:hover { background: var(--crimson); color: var(--gold-light); }
        .db-card__btn--primary {
          background: transparent;
          color: var(--gold);
        }
        .db-card__btn--primary:hover { background: var(--gold); color: #1a0800; }

        /* Footer CTA */
        .db-footer-cta {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }

        @media (max-width: 600px) {
          .db-grid { grid-template-columns: 1fr; }
          .db-hero { padding: 48px 20px 32px; }
        }
      `}</style>
    </motion.div>
  )
}
