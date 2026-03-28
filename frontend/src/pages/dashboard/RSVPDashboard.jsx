import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getRsvps } from '../../services/api'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

export default function RSVPDashboard() {
  const { slug } = useParams()
  const [rsvps, setRsvps]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      setRsvps([])
      setLoading(false)
      return
    }
    getRsvps(slug)
      .then(data => { setRsvps(Array.isArray(data) ? data : data.rsvps || []); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [slug])

  const attending    = rsvps.filter(r => r.attending === 'yes')
  const notAttending = rsvps.filter(r => r.attending === 'no')
  const maybe        = rsvps.filter(r => r.attending === 'maybe')
  const totalGuests  = attending.reduce((sum, r) => sum + (Number(r.guestCount) || 1), 0)

  return (
    <motion.div
      className="rsvp-dashboard"
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
          <p className="page-eyebrow">✦ RSVP Dashboard ✦</p>
          <h1>Guest Responses</h1>
          <p className="page-subtitle">
            Invitation: <strong>{slug}</strong>
          </p>
        </motion.div>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <Link to="/dashboard" className="btn btn-outline" style={{ marginBottom: '28px', display: 'inline-flex' }}>
          ← Back to Dashboard
        </Link>

        {loading && <LoadingSpinner message="Loading RSVPs…" />}
        {error && (
          <p style={{ color: '#c0392b', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>{error}</p>
        )}

        {!loading && !error && (
          <>
            {/* Summary */}
            <div className="rsvp-summary">
              {[
                { label: 'Attending',  count: attending.length,    color: '#2d7a2d' },
                { label: 'Declining',  count: notAttending.length, color: 'var(--crimson)' },
                { label: 'Maybe',      count: maybe.length,        color: 'var(--gold)' },
                { label: 'Total Guests', count: totalGuests,       color: 'var(--crimson-deep)' },
              ].map(({ label, count, color }) => (
                <div key={label} className="rsvp-summary__card">
                  <span className="rsvp-summary__count" style={{ color }}>{count}</span>
                  <span className="rsvp-summary__label">{label}</span>
                </div>
              ))}
            </div>

            {/* Table */}
            {rsvps.length === 0 ? (
              <p style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', color: 'rgba(90,60,30,0.6)', padding: '40px 0' }}>
                No RSVPs yet. Share your invitation to receive responses.
              </p>
            ) : (
              <div className="rsvp-table-wrap">
                <table className="summary-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Attending</th>
                      <th>Guests</th>
                      <th>Meal</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.email || '—'}</td>
                        <td style={{ color: r.attending === 'yes' ? '#2d7a2d' : r.attending === 'no' ? 'var(--crimson)' : 'var(--gold)' }}>
                          {r.attending === 'yes' ? 'Attending' : r.attending === 'no' ? 'Declining' : 'Maybe'}
                        </td>
                        <td>{r.guestCount || 1}</td>
                        <td>{r.mealPref || '—'}</td>
                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {r.message || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .rsvp-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        .rsvp-summary__card {
          background: var(--ivory-warm);
          border: 1px solid rgba(201,149,58,0.2);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
        }
        .rsvp-summary__count {
          display: block;
          font-family: var(--font-accent);
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .rsvp-summary__label {
          font-family: var(--font-display);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(90,60,30,0.7);
        }
        .rsvp-table-wrap {
          overflow-x: auto;
        }
      `}</style>
    </motion.div>
  )
}
