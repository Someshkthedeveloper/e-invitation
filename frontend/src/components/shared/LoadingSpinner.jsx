import React from 'react'

export default function LoadingSpinner({ size = 48, message = 'Loading...' }) {
  return (
    <div className="loading-spinner" style={{ '--spinner-size': `${size}px` }}>
      <div className="loading-spinner__ring" />
      <span className="loading-spinner__om">✿</span>
      {message && <p className="loading-spinner__message">{message}</p>}
    </div>
  )
}
