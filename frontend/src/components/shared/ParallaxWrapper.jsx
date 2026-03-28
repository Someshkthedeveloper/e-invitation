import React from 'react'
import { motion } from 'framer-motion'
import { useParallax } from '../../hooks/useParallax'

export default function ParallaxWrapper({ children, speed = 0.3, direction = 'up', className = '', style = {} }) {
  const { ref, y } = useParallax(speed, direction)

  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
