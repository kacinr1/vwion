'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'

const MONTSERRAT: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat, "Helvetica Neue", Helvetica, sans-serif)',
  fontWeight: 100,
  letterSpacing: '-0.01em',
}

const PARTICLES = [
  { id: 0,  x: '12%', y: '28%', s: 1.5, o: 0.50, d: 6,  dl: 0.0 },
  { id: 1,  x: '24%', y: '55%', s: 1.0, o: 0.35, d: 8,  dl: 1.5 },
  { id: 2,  x: '38%', y: '42%', s: 2.0, o: 0.55, d: 5,  dl: 3.0 },
  { id: 3,  x: '52%', y: '32%', s: 1.2, o: 0.40, d: 9,  dl: 0.7 },
  { id: 4,  x: '66%', y: '62%', s: 1.8, o: 0.65, d: 6,  dl: 2.2 },
  { id: 5,  x: '78%', y: '45%', s: 1.0, o: 0.30, d: 7,  dl: 4.0 },
  { id: 6,  x: '18%', y: '70%', s: 2.2, o: 0.45, d: 5,  dl: 1.0 },
  { id: 7,  x: '44%', y: '38%', s: 1.3, o: 0.50, d: 7,  dl: 2.8 },
  { id: 8,  x: '60%', y: '50%', s: 1.6, o: 0.60, d: 6,  dl: 3.5 },
  { id: 9,  x: '82%', y: '26%', s: 1.1, o: 0.38, d: 9,  dl: 0.4 },
  { id: 10, x: '32%', y: '65%', s: 1.9, o: 0.48, d: 7,  dl: 1.9 },
  { id: 11, x: '56%', y: '48%', s: 1.4, o: 0.55, d: 5,  dl: 2.5 },
]

const WELCOME = 'Bienvenue chez les'
const SUBTITLE = 'Soigneurs de votre Garde-Temps'

function LetterReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <div className="flex flex-wrap justify-center">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.034, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={className}
          style={MONTSERRAT}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

export default function AtelierHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [showWelcome, setShowWelcome] = useState(false)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setShowWelcome(v > 0.91)
  })

  // ── Changement d'angle vers la fenêtre gauche (pas de zoom) ──
  // Effet : on se déplace vers la fenêtre → pan droit + rotateY négatif
  // rotateY négatif = côté gauche (fenêtre, lac Léman) se rapproche
  const rotateY    = useTransform(scrollYProgress, [0, 0.88], [0, -9])
  const translateX = useTransform(scrollYProgress, [0, 0.88], ['0%', '9%'])
  const translateY = useTransform(scrollYProgress, [0, 0.88], ['0%', '-1.5%'])

  // ── Rayon de lumière depuis la fenêtre gauche ──
  const rayOpacity  = useTransform(scrollYProgress, [0, 0.40, 0.88], [0.60, 0.90, 0.25])

  // ── Badge VWION pendant le travelling ──
  const badgeOp     = useTransform(scrollYProgress, [0, 0.06, 0.82, 0.88], [0, 0.85, 0.85, 0])

  // ── Fondu final : progressif et long (pas d'arrêt net) ──
  // Commence à 0.72 et finit à 0.95 → 23% de scroll = fondu très doux
  const overlayOp   = useTransform(scrollYProgress, [0.72, 0.95], [0, 1])

  // ── Hint "Entrez" disparaît vite ──
  const scrollHintOp = useTransform(scrollYProgress, [0, 0.07], [1, 0])

  return (
    <div ref={containerRef} style={{ height: '500vh' }} className="relative">
      {/* perspective sur le parent = vrai changement d'angle 3D */}
      <div className="sticky top-0 h-screen overflow-hidden bg-obsidian" style={{ perspective: '1400px' }}>

        {/* ── IMAGE UNIQUE — ANGLE CHANGE VERS LA FENÊTRE ── */}
        <motion.div
          className="absolute inset-0"
          style={{
            rotateY,
            x: translateX,
            y: translateY,
            scale: 1.08,        // légère marge statique pour que les bords ne se voient pas pendant la rotation
            willChange: 'transform',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/atelier.png"
            alt="Atelier VWION — Genève"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        {/* ── OVERLAY SOMBRE EN BAS (profondeur) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 40%), linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, transparent 25%)',
          }}
        />

        {/* ── RAYON DE LUMIÈRE (fenêtre gauche) ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: rayOpacity }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            style={{
              background:
                'linear-gradient(112deg, rgba(255,215,100,0) 5%, rgba(255,215,100,0.10) 22%, rgba(255,215,100,0.03) 40%, transparent 58%)',
            }}
          />
        </motion.div>

        {/* ── PARTICULES DORÉES ── */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none z-20"
            style={{
              left: p.x,
              top: p.y,
              width: `${p.s}px`,
              height: `${p.s}px`,
              backgroundColor: '#C9A84C',
            }}
            animate={{ y: [0, -20, -52], x: [0, 3, -2], opacity: [0, p.o, 0] }}
            transition={{ repeat: Infinity, duration: p.d, delay: p.dl, ease: 'easeOut' }}
          />
        ))}

        {/* ── GRAIN FILM ── */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          style={{ opacity: 0.036, mixBlendMode: 'overlay' }}
        >
          <filter id="vwion-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#vwion-grain)" />
        </svg>

        {/* ── BADGE VWION ── */}
        <motion.div
          style={{ opacity: badgeOp }}
          className="absolute top-7 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 pointer-events-none select-none"
        >
          <span className="w-8 h-px bg-gold/50" />
          <span className="text-[7px] tracking-[0.6em] uppercase text-gold/75 font-sans drop-shadow-lg">
            VWION · Atelier Horloger · Genève
          </span>
          <span className="w-8 h-px bg-gold/50" />
        </motion.div>

        {/* ── FONDU FINAL PROGRESSIF (pas d'arrêt net) ──
             Commence à 72% du scroll → image fond doucement en obsidian ── */}
        <motion.div
          style={{ opacity: overlayOp }}
          className="absolute inset-0 z-40 pointer-events-none"
        >
          <div className="absolute inset-0 bg-obsidian" />
          {/* Halo or subtil au centre pour que le fondu soit doré, pas juste noir */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 55% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* ── BIENVENUE (lettre par lettre) ── */}
        {showWelcome && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-5 mb-10 select-none"
            >
              <span className="w-12 h-px bg-gold/40" />
              <span className="text-[8px] tracking-[0.6em] uppercase text-gold/55 font-sans">
                VWION · Genève · Suisse
              </span>
              <span className="w-12 h-px bg-gold/40" />
            </motion.div>

            <LetterReveal
              text={WELCOME}
              className="text-3xl md:text-5xl lg:text-[3.4rem] text-cream"
              delay={0}
            />
            <div className="h-3" />
            <LetterReveal
              text={SUBTITLE}
              className="text-3xl md:text-5xl lg:text-[3.4rem] text-gold"
              delay={WELCOME.length * 0.034 + 0.2}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (WELCOME.length + SUBTITLE.length) * 0.034 + 0.65,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-14 flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/services"
                className="px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-sans font-semibold text-obsidian bg-gold hover:bg-gold-light transition-all duration-300"
                style={{ boxShadow: '0 8px 40px rgba(201,168,76,0.22)' }}
              >
                Découvrir l&apos;Atelier
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-sans font-semibold text-gold border border-gold/40 hover:border-gold hover:bg-gold/5 transition-all duration-300"
              >
                Prendre Rendez-vous
              </Link>
            </motion.div>
          </div>
        )}

        {/* ── INDICATEUR SCROLL "Entrez" ── */}
        <motion.div
          style={{ opacity: scrollHintOp }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none select-none"
        >
          <span className="text-[7px] tracking-[0.55em] uppercase text-gold/45 font-sans">Entrez</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-gold/35 to-transparent"
          />
        </motion.div>

      </div>
    </div>
  )
}
