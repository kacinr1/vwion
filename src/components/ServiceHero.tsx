'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'

const MONTSERRAT: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat, "Helvetica Neue", Helvetica, sans-serif)',
  fontWeight: 100,
  letterSpacing: '-0.02em',
}

// Vidéo hero — reveal VWION
const HERO_VIDEO = '/hero/vwion-hero-reveal.mp4'

const ease = [0.16, 1, 0.3, 1] as const

export default function ServiceHero() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen bg-obsidian grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* ── TEXTE (gauche) ── */}
      <div className="order-2 lg:order-1 relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-8 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center gap-3 mb-5 lg:mb-8"
        >
          <span className="w-10 h-px bg-gold/50" />
          <span className="text-[9px] tracking-[0.45em] uppercase text-gold/70 font-sans">
            {t.hero.badge} · Genève
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          style={{ ...MONTSERRAT, fontSize: 'clamp(2.6rem, 5.2vw, 5rem)', lineHeight: 1.02 }}
          className="text-cream"
        >
          {t.hero.serviceTitle}{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #E8C96A 0%, #C9A84C 50%, #8B6914 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.hero.serviceTitleAccent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease }}
          className="mt-6 text-[11px] sm:text-xs tracking-[0.35em] uppercase text-gold/80 font-sans"
        >
          {t.hero.pillars}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease }}
          className="mt-6 max-w-md text-cream-muted font-sans text-sm sm:text-base leading-relaxed"
        >
          {t.hero.serviceSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-6 lg:mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/contact"
            className="px-8 py-4 text-[10px] tracking-[0.28em] uppercase font-sans font-semibold text-obsidian bg-gold hover:bg-gold-light transition-all duration-300"
            style={{ boxShadow: '0 8px 40px rgba(201,168,76,0.22)' }}
          >
            {t.hero.ctaAppointment}
          </Link>
          <Link
            href="/tarifs"
            className="px-8 py-4 text-[10px] tracking-[0.28em] uppercase font-sans font-semibold text-gold border border-gold/40 hover:border-gold hover:bg-gold/5 transition-all duration-300"
          >
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* Rangée de marques */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 lg:mt-14 flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          {t.hero.brandsList.map((brand, i) => (
            <span key={brand} className="flex items-center gap-5">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-gold/40" />}
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-cream-muted/70 font-serif">
                {brand}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── VIDÉO (droite) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
        className="order-1 lg:order-2 relative h-[32vh] sm:h-[44vh] lg:h-auto lg:min-h-screen overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={HERO_VIDEO}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlays obsidian + or pour la cohérence */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.15) 45%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.9) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 60% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Indicateur scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hidden lg:flex absolute bottom-8 left-16 z-20 flex-col items-start gap-2 pointer-events-none select-none"
      >
        <span className="text-[7px] tracking-[0.55em] uppercase text-gold/45 font-sans">Découvrir</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-gold/35 to-transparent"
        />
      </motion.div>
    </section>
  )
}
