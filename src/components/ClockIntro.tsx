'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CX = 150
const CY = 150
const R  = 116

const MARKS = Array.from({ length: 12 }, (_, i) => {
  const rad    = (i * 30 - 90) * (Math.PI / 180)
  const isMain = i % 3 === 0
  const inner  = isMain ? 0.76 : 0.85
  return {
    x1: Math.cos(rad) * R * inner + CX,
    y1: Math.sin(rad) * R * inner + CY,
    x2: Math.cos(rad) * R * 0.94 + CX,
    y2: Math.sin(rad) * R * 0.94 + CY,
    isMain,
  }
})

const HAND: React.CSSProperties = {
  transition: 'transform 2s cubic-bezier(0.34, 1.08, 0.64, 1)',
}

export default function ClockIntro() {
  const [visible,  setVisible]  = useState(true)
  const [hourDeg,  setHourDeg]  = useState(0)
  const [minDeg,   setMinDeg]   = useState(0)
  const [showMsg,  setShowMsg]  = useState(false)

  useEffect(() => {
    // Une seule fois par session
    if (sessionStorage.getItem('vwion-intro')) {
      setVisible(false)
      return
    }
    sessionStorage.setItem('vwion-intro', '1')

    const now = new Date()
    const h   = now.getHours() % 12
    const m   = now.getMinutes()
    const s   = now.getSeconds()

    const t1 = setTimeout(() => {
      setHourDeg(h * 30 + m * 0.5)
      setMinDeg(m * 6 + s * 0.1)
    }, 420)

    const t2 = setTimeout(() => setShowMsg(true), 1600)
    const t3 = setTimeout(() => setVisible(false), 4800)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#080808' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Halo très doux derrière l'horloge */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 55% 50% at 50% 46%, rgba(255,255,255,0.045) 0%, transparent 70%)',
            }}
          />

          {/* ── HORLOGE SVG NOIR & BLANC ── */}
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            className="mb-10"
            style={{ filter: 'drop-shadow(0 0 28px rgba(255,255,255,0.04))' }}
          >
            {/* Anneau extérieur subtil */}
            <circle
              cx={CX} cy={CY} r={R + 7}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.8"
            />
            {/* Cadran */}
            <circle
              cx={CX} cy={CY} r={R}
              fill="rgba(255,255,255,0.018)"
              stroke="rgba(255,255,255,0.13)"
              strokeWidth="0.7"
            />

            {/* Marqueurs des heures */}
            {MARKS.map((mk, i) => (
              <line
                key={i}
                x1={mk.x1} y1={mk.y1}
                x2={mk.x2} y2={mk.y2}
                stroke={mk.isMain ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.30)'}
                strokeWidth={mk.isMain ? 1.8 : 0.9}
                strokeLinecap="round"
              />
            ))}

            {/* AIGUILLE DES HEURES */}
            <g
              style={{
                ...HAND,
                transform: `rotate(${hourDeg}deg)`,
                transformOrigin: `${CX}px ${CY}px`,
              }}
            >
              {/* Contre-poids */}
              <line
                x1={CX} y1={CY + 14}
                x2={CX} y2={CY - R * 0.52}
                stroke="rgba(255,255,255,0.90)"
                strokeWidth="3.8"
                strokeLinecap="round"
              />
            </g>

            {/* AIGUILLE DES MINUTES */}
            <g
              style={{
                ...HAND,
                transform: `rotate(${minDeg}deg)`,
                transformOrigin: `${CX}px ${CY}px`,
              }}
            >
              <line
                x1={CX} y1={CY + 18}
                x2={CX} y2={CY - R * 0.75}
                stroke="rgba(255,255,255,0.78)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>

            {/* Centre */}
            <circle cx={CX} cy={CY} r="5" fill="rgba(255,255,255,0.88)" />
            <circle cx={CX} cy={CY} r="2.2" fill="#080808" />
          </svg>

          {/* ── MESSAGE ── */}
          <AnimatePresence>
            {showMsg && (
              <motion.div
                className="text-center px-6"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p
                  className="text-[9px] tracking-[0.55em] uppercase font-sans mb-4"
                  style={{ color: 'rgba(255,255,255,0.30)' }}
                >
                  GENÈVE · SUISSE · DEPUIS 2010
                </p>

                <h1
                  style={{
                    fontFamily: 'var(--font-montserrat, "Helvetica Neue", sans-serif)',
                    fontWeight: 100,
                    fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)',
                    letterSpacing: '-0.01em',
                    color: 'rgba(255,255,255,0.88)',
                    lineHeight: 1.2,
                  }}
                >
                  Bienvenue chez{' '}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    style={{ color: '#C9A84C' }}
                  >
                    VWION
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  style={{
                    fontFamily: 'var(--font-montserrat, "Helvetica Neue", sans-serif)',
                    fontWeight: 100,
                    fontSize: 'clamp(0.85rem, 2.2vw, 1.15rem)',
                    color: 'rgba(255,255,255,0.42)',
                    marginTop: '0.6rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  Les Artistes de vos Garde-Temps
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grain film */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.042, mixBlendMode: 'overlay' }}
          >
            <filter id="ci-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.66" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#ci-grain)" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
