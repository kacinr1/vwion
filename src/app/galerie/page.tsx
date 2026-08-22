'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'
import { caseStudies } from '@/data/caseStudies'

type Shot = { src: string; caption: { fr: string; en: string } }

const atelier: Shot[] = [
  { src: '/gallery/atelier/emeraude.jpg', caption: { fr: 'Boîtier serti émeraudes', en: 'Emerald-set case' } },
  { src: '/gallery/atelier/daniel-roth.jpg', caption: { fr: 'Daniel Roth, chronographe', en: 'Daniel Roth, chronograph' } },
  { src: '/gallery/atelier/couronne.jpg', caption: { fr: 'Couronne vissée — détail', en: 'Screw-down crown — detail' } },
  { src: '/gallery/atelier/nautilus-or.jpg', caption: { fr: 'Patek Philippe Nautilus, or jaune', en: 'Patek Philippe Nautilus, yellow gold' } },
  { src: '/gallery/atelier/caseback.jpg', caption: { fr: 'Fond masqué avant polissage', en: 'Caseback masked before polishing' } },
  { src: '/gallery/atelier/rubis.jpg', caption: { fr: 'Lunette sertie rubis, or rose', en: 'Ruby-set bezel, rose gold' } },
  { src: '/gallery/atelier/corne-or.jpg', caption: { fr: 'Anglage des cornes, or rose', en: 'Lug bevelling, rose gold' } },
  { src: '/gallery/atelier/gmt.jpg', caption: { fr: 'Rolex GMT-Master II', en: 'Rolex GMT-Master II' } },
]

export default function GaleriePage() {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null)

  const open = useCallback((src: string, alt: string) => setActive({ src, alt }), [])
  const close = useCallback(() => setActive(null), [])

  // Échap + verrou de scroll pendant la lightbox
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active, close])

  const hover = reduce ? undefined : { scale: 1.02 }
  const tap = reduce ? undefined : { scale: 0.985 }
  const springHover = { type: 'spring' as const, bounce: 0.2, duration: 0.3 }

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 bg-obsidian relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.gallery.badge}</span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-cream mt-6 mb-6 tracking-[-0.02em]">{t.gallery.title}</h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="text-cream-muted text-lg font-sans leading-relaxed max-w-2xl mx-auto">{t.gallery.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Avant / Après — restaurations réelles */}
      <section className="pb-8 px-6 bg-obsidian-soft">
        <div className="max-w-5xl mx-auto flex flex-col gap-24">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.watch} delay={i * 0.05}>
              <article className="group">
                <div className="grid grid-cols-2 gap-px bg-gold/10">
                  {([
                    { src: cs.avant, label: t.gallery.before, tone: 'before' as const, alt: lang === 'fr' ? `${cs.watch} avant restauration — ${cs.problem.fr}` : `${cs.watch} before restoration — ${cs.problem.en}` },
                    { src: cs.apres, label: t.gallery.after, tone: 'after' as const, alt: lang === 'fr' ? `${cs.watch} après restauration — ${cs.result.fr}` : `${cs.watch} after restoration — ${cs.result.en}` },
                  ]).map((im) => (
                    <motion.button
                      key={im.src}
                      type="button"
                      onClick={() => open(im.src, im.alt)}
                      aria-label={im.alt}
                      whileHover={hover}
                      whileTap={tap}
                      transition={springHover}
                      className="relative block overflow-hidden cursor-zoom-in bg-obsidian"
                    >
                      <span className={`absolute z-10 top-3 ${im.tone === 'before' ? 'left-3' : 'right-3'} text-[8px] tracking-[0.3em] uppercase font-sans px-2 py-1 border backdrop-blur-md ${im.tone === 'before' ? 'text-red-300/90 bg-obsidian/60 border-red-900/40' : 'text-gold bg-obsidian/60 border-gold/40'}`}>
                        {im.label}
                      </span>
                      <motion.img
                        layoutId={reduce ? undefined : im.src}
                        src={im.src}
                        alt={im.alt}
                        className={`w-full aspect-[4/5] object-cover ${im.tone === 'before' ? 'grayscale-[0.2] group-hover:grayscale-0' : ''} transition-[filter] duration-500 ease-out-quint`}
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>

                <div className="pt-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-cream text-3xl tracking-[-0.01em]">{cs.watch}</h2>
                    <p className="text-[10px] tracking-[0.3em] text-gold/70 font-sans uppercase mt-2">{cs.ref[lang]}</p>
                  </div>
                  <p className="text-cream-muted text-sm font-sans leading-relaxed max-w-md sm:text-right">{cs.result[lang]}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* L'atelier — mosaïque */}
      <section className="py-24 px-6 bg-obsidian-soft">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{lang === 'fr' ? 'Savoir-faire' : 'Craftsmanship'}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mt-4 tracking-[-0.02em]">{lang === 'fr' ? "L'atelier" : 'The atelier'}</h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {atelier.map((shot, i) => {
              const alt = shot.caption[lang]
              return (
                <ScrollReveal key={shot.src} delay={(i % 4) * 0.05}>
                  <motion.button
                    type="button"
                    onClick={() => open(shot.src, alt)}
                    aria-label={alt}
                    whileHover={hover}
                    whileTap={tap}
                    transition={springHover}
                    className="group/tile relative block w-full overflow-hidden cursor-zoom-in bg-obsidian border border-gold/10 hover:border-gold/30 transition-colors duration-200 ease-out-quint"
                  >
                    <motion.img
                      layoutId={reduce ? undefined : shot.src}
                      src={shot.src}
                      alt={alt}
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200 ease-out-quint">
                      <span className="block text-[10px] tracking-[0.15em] uppercase text-cream font-sans text-left">{alt}</span>
                    </span>
                  </motion.button>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Note */}
          <ScrollReveal className="mt-16">
            <div className="border border-gold/15 bg-obsidian-card p-8 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-4">Note</p>
              <p className="text-cream-muted font-sans text-sm leading-relaxed max-w-2xl mx-auto">
                {lang === 'fr'
                  ? 'Interventions réelles réalisées à l\'atelier. D\'autres exemples avant / après vous sont présentés lors de votre rendez-vous.'
                  : 'Genuine work carried out at the atelier. Further before / after examples are shared with you during your appointment.'}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onClick={close}
          >
            <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl" />

            <button
              type="button"
              aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
              onClick={close}
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-cream/70 hover:text-gold border border-gold/20 hover:border-gold/50 bg-obsidian/60 backdrop-blur-md transition-colors duration-200 ease-out-quint"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" /></svg>
            </button>

            <motion.img
              layoutId={reduce ? undefined : active.src}
              src={active.src}
              alt={active.alt}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] max-w-[94vw] object-contain shadow-2xl shadow-black/60"
              initial={reduce ? { opacity: 0 } : undefined}
              animate={reduce ? { opacity: 1 } : undefined}
              exit={reduce ? { opacity: 0 } : undefined}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
