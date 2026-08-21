'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
}

export default function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: Props) {
  const reduce = useReducedMotion()

  // Reduced motion : on garde le fondu (aide la compréhension), on retire le déplacement.
  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === 'up' ? 40 : 0,
        x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
      }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={
        reduce
          ? { duration: 0.25, delay, ease: [0.23, 1, 0.32, 1] }
          : { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}
