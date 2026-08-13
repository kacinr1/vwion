'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { SECTIONS } from '@/components/PolissageHero'

/**
 * CraftSequence — les 4 étapes de polissage en UNE séquence continue.
 * Les vidéos sont empilées en plein écran (sticky) et se fondent l'une dans
 * l'autre au scroll (crossfade), comme un seul film. Les légendes se fondent
 * en synchro.
 */

type Section = (typeof SECTIONS)[number]

const MONTSERRAT: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif)',
  fontWeight: 100,
  letterSpacing: '-0.02em',
}

const GOLD_GRADIENT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #E8C96A 0%, #C9A84C 50%, #8B6914 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const FADE = 0.06 // largeur du fondu (en fraction de progression)

function Layer({
  progress,
  i,
  total,
  section,
}: {
  progress: MotionValue<number>
  i: number
  total: number
  section: Section
}) {
  const seg = 1 / total
  const a = i * seg
  const b = (i + 1) * seg

  // Crossfade : premier plan visible dès le départ, dernier jusqu'à la fin.
  const opacity = useTransform(
    progress,
    i === 0
      ? [0, b - FADE, b + FADE]
      : i === total - 1
        ? [a - FADE, a + FADE, 1]
        : [a - FADE, a + FADE, b - FADE, b + FADE],
    i === 0 ? [1, 1, 0] : i === total - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  )

  // Léger zoom lent quand le plan est actif → sensation de vie / continuité.
  const scale = useTransform(progress, [a - seg, b + seg], [1.12, 1.0])

  // Légende : fenêtre plus serrée que la vidéo → le texte sort AVANT que le
  // suivant entre (une seule légende à la fois, même si les vidéos se fondent).
  const textOpacity = useTransform(
    progress,
    i === 0
      ? [0, b - 0.11, b - 0.05]
      : i === total - 1
        ? [a + 0.02, a + 0.06, 1]
        : [a + 0.02, a + 0.06, b - 0.11, b - 0.05],
    i === 0 ? [1, 1, 0] : i === total - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  )
  const isRight = section.align === 'right'

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {/* Vidéo */}
      <motion.div className="absolute inset-0" style={{ scale, willChange: 'transform' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={section.poster}
          src={section.videoUrl}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Voiles obsidian + or (profondeur + lisibilité) */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/10 to-obsidian/85" />
      <div
        className="absolute inset-0"
        style={{
          background: isRight
            ? 'linear-gradient(to left, rgba(10,10,10,0.78) 0%, transparent 60%)'
            : 'linear-gradient(to right, rgba(10,10,10,0.78) 0%, transparent 60%)',
        }}
      />

      {/* Légende */}
      <motion.div
        style={{ opacity: textOpacity }}
        className={`relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 ${
          isRight ? 'items-end text-right' : 'items-start text-left'
        }`}
      >
        <div className="max-w-xl">
          <div className={`flex items-center gap-3 mb-8 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[9px] tracking-[0.5em] text-gold/60 font-sans uppercase">{section.number}</span>
            <span className="w-8 h-px bg-gold/30" />
            <span className="text-[8px] tracking-[0.45em] text-gold/60 font-sans uppercase">{section.label}</span>
          </div>

          <h2 style={{ ...MONTSERRAT, fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1 }} className="text-cream mb-1">
            {section.title}
          </h2>
          <h2
            style={{ ...MONTSERRAT, ...GOLD_GRADIENT, fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1, marginBottom: '2rem' }}
          >
            {section.accent}
          </h2>

          <div className={`flex items-center gap-3 mb-5 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <div className="w-10 h-px bg-gold/40" />
          </div>

          <p className="text-cream-muted font-sans text-sm leading-[1.9] tracking-wide max-w-xs">
            {section.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CraftSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const total = SECTIONS.length

  // Fondu d'entrée/sortie global (vers/depuis les sections voisines)
  const seqOpacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0])
  // Barre de progression
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} style={{ height: `${total * 100}vh` }} className="relative bg-obsidian">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: seqOpacity }}>
          {SECTIONS.map((s, i) => (
            <Layer key={s.id} progress={scrollYProgress} i={i} total={total} section={s} />
          ))}
        </motion.div>

        {/* Barre de progression de la séquence */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-px bg-gold/15 overflow-hidden">
          <motion.div className="h-full bg-gold origin-left" style={{ scaleX: barScale }} />
        </div>
      </div>
    </section>
  )
}
