'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'
import { caseStudies } from '@/data/caseStudies'

export default function GaleriePage() {
  const { t, lang } = useLang()

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 bg-obsidian relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.gallery.badge}</span>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-cream mt-6 mb-6">{t.gallery.title}</h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="text-cream-muted text-lg font-sans leading-relaxed max-w-2xl mx-auto">{t.gallery.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Real before/after restorations */}
      <section className="py-20 px-6 bg-obsidian-soft">
        <div className="max-w-4xl mx-auto flex flex-col gap-20">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.watch} delay={i * 0.05}>
              <article className="bg-obsidian-card border border-gold/15 overflow-hidden group hover:border-gold/40 transition-colors duration-200 ease-out-quint">
                {/* Before / After images */}
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <figure className="relative overflow-hidden border-r border-gold/10">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[8px] tracking-[0.3em] uppercase text-red-300/90 font-sans bg-obsidian/70 backdrop-blur-sm px-2 py-1 border border-red-900/40">
                        {t.gallery.before}
                      </span>
                    </div>
                    <img
                      src={cs.avant}
                      alt={lang === 'fr'
                        ? `${cs.watch} avant restauration — ${cs.problem.fr}`
                        : `${cs.watch} before restoration — ${cs.problem.en}`}
                      className="w-full aspect-[4/5] object-cover grayscale-[0.2] group-hover:grayscale-0 motion-safe:group-hover:scale-[1.02] transition-[filter,scale] duration-[400ms] ease-out-quint"
                      loading="lazy"
                    />
                  </figure>
                  {/* After */}
                  <figure className="relative overflow-hidden">
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans bg-obsidian/70 backdrop-blur-sm px-2 py-1 border border-gold/40">
                        {t.gallery.after}
                      </span>
                    </div>
                    <img
                      src={cs.apres}
                      alt={lang === 'fr'
                        ? `${cs.watch} après restauration — ${cs.result.fr}`
                        : `${cs.watch} after restoration — ${cs.result.en}`}
                      className="w-full aspect-[4/5] object-cover motion-safe:group-hover:scale-[1.02] transition-transform duration-[400ms] ease-out-quint"
                      loading="lazy"
                    />
                  </figure>
                </div>

                {/* Info */}
                <div className="p-8 border-t border-gold/10">
                  <h3 className="font-serif text-cream text-2xl group-hover:text-gold transition-colors duration-200 ease-out-quint">{cs.watch}</h3>
                  <p className="text-[10px] tracking-[0.3em] text-gold/70 font-sans uppercase mt-1 mb-6">{cs.ref[lang]}</p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase text-cream/40 font-sans mb-1">
                        {lang === 'fr' ? 'Intervention' : 'Intervention'}
                      </p>
                      <p className="text-cream-muted text-sm font-sans leading-relaxed">{cs.intervention[lang]}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase text-gold/70 font-sans mb-1">
                        {lang === 'fr' ? 'Résultat' : 'Result'}
                      </p>
                      <p className="text-cream text-sm font-sans leading-relaxed">{cs.result[lang]}</p>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}

          {/* Note */}
          <ScrollReveal>
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
    </>
  )
}
