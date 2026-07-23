'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'

const PLAN1 =
  'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__7/-t-e-x-t_-t-o_-i-m-a-g-e-cf38251f-8f59-4979-a9db-6347e70e3b2b.png?Expires=2100209318&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=u1zP7RjxthCWgGrrwLxH4fuNt1hcXeEfGStzgMN4-Oudy3yju-c9gL~fWuFni~mtbW3~BNlPHGoV9lj61JSqIawHuE4~m9QbyCMS1Y7sMyqvmvw3CrEjIIlcDe47mty~1w7DGqBlq6cGVdvMwVL2PVcc8dscMkH5Hs-lCrNuFlyzNJLWpKRnLd6Jsmzq2ixRLA44uIfeJe1o3cLuYMiXnrxDxPv-Y1CtcamN-aQRduNx4UaV8IX~9IXyZeWN1AgrJQhAowVS0IJMnqz~V9iU8KSm2zTiFx2XqFQnaB04I~WHWu6mCZeyqlYFYaU7PIoLqlDLsVu9sxlQTrpQMdPpBA__'

const PLAN2 =
  'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__5/-t-e-x-t_-t-o_-i-m-a-g-e-af4233e2-83b8-4484-a794-b1c9b34f762f.png?Expires=2100209362&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=xVWmNnLEuViP1tgiRxECCKnSGsPIdiAPAogcfJlgfaTp990891VQ5HegwategD45CjivLRzr-3iNr-BGcz3~hNr3aF-f91FKVaWpTc9Pr1vSRKmlRMgmCSZUpUBkQ4ooY8v~hK5ElRbeyOfoV4eMVMAfq6IJPADNX1oo5OEp-yamtttzTXl83ENpEQWzYn8lQiMIZLq~75LYPUakM1Q7CE4WvrjCtZU2maYEhG0zDmn9hASTk7fcWHKSYklgpA-m-bq6ZsrSqabATf2Z3TQzj5YZyKyClQKj4dPzSk0zB-bOunaf3nAAixbcz2D7r3xSLE3qHZHlYyYYQA3nMuk2mA__'

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
  { id: 12, x: '70%', y: '36%', s: 1.7, o: 0.42, d: 8,  dl: 0.6 },
  { id: 13, x: '88%', y: '58%', s: 1.2, o: 0.50, d: 6,  dl: 3.2 },
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
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.034, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={className}
          style={MONTSERRAT}
        >
          {char === ' ' ? ' ' : char}
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
    setShowWelcome(v > 0.90)
  })

  // ── Opacités des plans ──
  const p1Opacity     = useTransform(scrollYProgress, [0, 0.22, 0.40], [1, 1, 0])
  const p2Opacity     = useTransform(scrollYProgress, [0.20, 0.38, 0.64, 0.80], [0, 1, 1, 0])
  const p3Opacity     = useTransform(scrollYProgress, [0.62, 0.80, 0.88], [0, 1, 1])

  // ── Scales (travelling en avant) ──
  const p1Scale       = useTransform(scrollYProgress, [0, 0.40], [1.0, 1.08])
  const p2Scale       = useTransform(scrollYProgress, [0.20, 0.80], [1.0, 1.10])
  const p3Scale       = useTransform(scrollYProgress, [0.62, 0.98], [1.12, 1.32])

  // ── Rayon de lumière ──
  const rayOpacity    = useTransform(scrollYProgress, [0, 0.45, 0.88], [0.55, 0.85, 0.30])

  // ── Badge VWION ──
  const badgeOpacity  = useTransform(scrollYProgress, [0, 0.06, 0.82, 0.88], [0, 0.8, 0.8, 0])

  // ── Overlay noir + hint de scroll ──
  const overlayOp     = useTransform(scrollYProgress, [0.82, 0.94], [0, 1])
  const scrollHintOp  = useTransform(scrollYProgress, [0, 0.07], [1, 0])

  return (
    <div ref={containerRef} style={{ height: '500vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-obsidian">

        {/* ── PLAN 1 · seuil de la porte ── */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: p1Opacity, scale: p1Scale, willChange: 'transform, opacity' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLAN1} alt="Atelier VWION — entrée" className="w-full h-full object-cover" loading="eager" />
        </motion.div>

        {/* ── PLAN 2 · milieu de l'atelier ── */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: p2Opacity, scale: p2Scale, willChange: 'transform, opacity' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLAN2} alt="Atelier VWION — intérieur" className="w-full h-full object-cover" />
        </motion.div>

        {/* ── PLAN 3 · zoom pendule (Plan 2 agrandi, CSS) ── */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: p3Opacity, scale: p3Scale, willChange: 'transform, opacity' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLAN2} alt="Atelier VWION — pendule or" className="w-full h-full object-cover" />
        </motion.div>

        {/* ── RAYON DE LUMIÈRE (fenêtre gauche) ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: rayOpacity }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            style={{
              background:
                'linear-gradient(108deg, rgba(255,210,100,0) 5%, rgba(255,210,100,0.11) 20%, rgba(255,210,100,0.04) 38%, transparent 55%)',
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
            animate={{ y: [0, -18, -48], x: [0, 3, -2], opacity: [0, p.o, 0] }}
            transition={{ repeat: Infinity, duration: p.d, delay: p.dl, ease: 'easeOut' }}
          />
        ))}

        {/* ── GRAIN FILM ── */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          style={{ opacity: 0.038, mixBlendMode: 'overlay' }}
        >
          <filter id="vwion-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#vwion-grain)" />
        </svg>

        {/* ── BADGE VWION (visible pendant le travelling) ── */}
        <motion.div
          style={{ opacity: badgeOpacity }}
          className="absolute top-7 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 pointer-events-none select-none"
        >
          <span className="w-8 h-px bg-gold/50" />
          <span className="text-[7px] tracking-[0.6em] uppercase text-gold/70 font-sans">
            VWION · Atelier Horloger · Genève
          </span>
          <span className="w-8 h-px bg-gold/50" />
        </motion.div>

        {/* ── OVERLAY NOIR ── */}
        <motion.div
          style={{ opacity: overlayOp }}
          className="absolute inset-0 bg-obsidian z-40 pointer-events-none"
        />

        {/* ── BIENVENUE (lettre par lettre) ── */}
        {showWelcome && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
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
              className="text-3xl md:text-5xl lg:text-[3.6rem] text-cream"
              delay={0}
            />
            <div className="h-3" />
            <LetterReveal
              text={SUBTITLE}
              className="text-3xl md:text-5xl lg:text-[3.6rem] text-gold"
              delay={WELCOME.length * 0.034 + 0.18}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (WELCOME.length + SUBTITLE.length) * 0.034 + 0.6,
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

        {/* ── INDICATEUR SCROLL ── */}
        <motion.div
          style={{ opacity: scrollHintOp }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none select-none"
        >
          <span className="text-[7px] tracking-[0.55em] uppercase text-gold/40 font-sans">Entrez</span>
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
