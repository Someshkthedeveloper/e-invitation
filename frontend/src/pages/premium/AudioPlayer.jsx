import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause } from 'lucide-react'

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)

  if (!src) return null

  const toggle = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
      <audio
        ref={audioRef}
        src={src}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Pulse ring when playing */}
      {isPlaying && (
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            borderRadius: '9999px',
            border: '1px solid rgba(197,160,89,0.5)',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              marginRight: '0.75rem',
              background: 'rgba(26,26,26,0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(197,160,89,0.2)',
              borderRadius: '4px',
              padding: '0.4rem 0.75rem',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              color: 'rgba(249,247,242,0.8)',
            }}
          >
            {isPlaying ? 'Playing — click to pause' : 'Play background music'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '3rem', height: '3rem',
          borderRadius: '9999px',
          background: 'rgba(26,26,26,0.88)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(197,160,89,0.25)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-gold)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <Pause size={16} /> : <Music size={16} />}
      </motion.button>
    </div>
  )
}
