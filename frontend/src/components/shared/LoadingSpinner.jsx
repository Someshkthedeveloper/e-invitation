import React from 'react'

export default function LoadingSpinner({ size = 56, message = 'Loading...' }) {
  return (
    <div
      className="loading-spinner"
      style={{
        '--spinner-size': `${size}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        padding: '40px',
      }}
    >
      <div
        className="loading-spinner__orbit"
        style={{
          position: 'relative',
          width: 'var(--spinner-size)',
          height: 'var(--spinner-size)',
        }}
      >
        <div className="loading-spinner__ring" />
        <span
          className="loading-spinner__om"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            lineHeight: 1,
          }}
        >
          ✿
        </span>
      </div>
      {message && <p className="loading-spinner__message">{message}</p>}
    </div>
  )
}
