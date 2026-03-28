import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getUserInvitations } from '../../services/api'
import { formatDate } from '../../utils/formatDate'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

export default function DashboardPage() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      setInvitations([])
      setLoading(false)
      return
    }
    getUserInvitations()
      .then(data => { setInvitations(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="details-page__hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="page-eyebrow">✦ Dashboard ✦</p>
          <h1>My Invitations</h1>
          <p className="page-subtitle">Manage and share your published wedding invitations</p>
        </motion.div>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        {loading && <LoadingSpinner message="Loading invitations…" />}

        {error && (
          <p style={{ color: '#c0392b', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {!loading && !error && invitations.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'rgba(90,60,30,0.6)', marginBottom: '24px' }}>
              {import.meta.env.VITE_API_URL
                ? 'No invitations found. Create your first!'
                : 'Connect a backend (set VITE_API_URL) to manage saved invitations.'}
            </p>
            <Link to="/create" className="btn btn-primary">
              Create Invitation →
            </Link>
          </div>
        )}

        {!loading && invitations.length > 0 && (
          <div className="dashboard-grid">
            {invitations.map((inv, i) => (
              <motion.div
                key={inv.slug || i}
                className="dashboard-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="dashboard-card__header">
                  <span className="dashboard-card__icon">✿</span>
                  <div>
                    <h3 className="dashboard-card__names">{inv.brideName} &amp; {inv.groomName}</h3>
                    <p className="dashboard-card__date">{formatDate(inv.weddingDate)}</p>
                  </div>
                </div>
                <div className="dashboard-card__actions">
                  <a
                    href={`/invitation/${inv.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.78rem', padding: '8px 16px' }}
                  >
                    View
                  </a>
                  <Link
                    to={`/dashboard/${inv.slug}/rsvps`}
                    className="btn btn-primary"
                    style={{ fontSize: '0.78rem', padding: '8px 16px' }}
                  >
                    RSVPs
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .dashboard-card {
          background: var(--ivory-warm);
          border: 1px solid rgba(201,149,58,0.25);
          border-radius: 8px;
          padding: 24px;
        }
        .dashboard-card__header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 18px;
        }
        .dashboard-card__icon {
          font-size: 1.5rem;
          color: var(--gold);
          margin-top: 2px;
        }
        .dashboard-card__names {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--crimson);
          margin-bottom: 4px;
        }
        .dashboard-card__date {
          font-family: var(--font-serif);
          font-size: 0.9rem;
          color: rgba(90,60,30,0.7);
          font-style: italic;
        }
        .dashboard-card__actions {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </motion.div>
  )
}
