'use client'

import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'
import { caseStudies } from '@/data/caseStudies'

export default function CaseStudies() {
  const { lang } = useLang()
  const fr = lang === 'fr'

  const LABELS = {
    problem: fr ? 'Problème' : 'Problem',
    intervention: fr ? 'Intervention' : 'Intervention',
    result: fr ? 'Résultat' : 'Result',
  }

  return (
    <section className="py-32 px-6 bg-obsidian-soft">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            {fr ? 'Réalisations' : 'Case studies'}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mt-4">
            {fr ? 'Études de cas' : 'Selected work'}
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.watch} delay={i * 0.1}>
              <article className="h-full p-8 border border-gold/15 bg-obsidian-card flex flex-col gap-5">
                <h3 className="text-xl font-serif text-gold">{cs.watch}</h3>
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-cream/40 font-sans mb-1">{LABELS.problem}</p>
                  <p className="text-cream-muted text-sm font-sans leading-relaxed">{cs.problem[lang]}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-cream/40 font-sans mb-1">{LABELS.intervention}</p>
                  <p className="text-cream-muted text-sm font-sans leading-relaxed">{cs.intervention[lang]}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-gold/10">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gold/70 font-sans mb-1">{LABELS.result}</p>
                  <p className="text-cream text-sm font-sans leading-relaxed">{cs.result[lang]}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
