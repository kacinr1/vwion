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
              <article className="h-full border border-gold/15 bg-obsidian-card flex flex-col overflow-hidden group hover:border-gold/40 transition-colors duration-200 ease-out-quint">
                <div className="relative overflow-hidden">
                  <img
                    src={cs.apres}
                    alt={fr
                      ? `${cs.watch} restaurée à l'atelier — ${cs.result.fr}`
                      : `${cs.watch} restored at the atelier — ${cs.result.en}`}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 ease-out-quint motion-safe:group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-card via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-serif text-gold">{cs.watch}</h3>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-cream/60 font-sans mt-0.5">{cs.ref[lang]}</p>
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-5 flex-1">
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
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
