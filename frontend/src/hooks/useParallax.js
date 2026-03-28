import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export function useParallax(speed = 0.3, direction = 'up') {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const factor = direction === 'down' ? speed * 100 : -(speed * 100)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${factor}%`])

  return { ref, y }
}
