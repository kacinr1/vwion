'use client'

import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  const { lang } = useLang()
  const fr = lang === 'fr'

  return (
    <section className="py-32 px-6 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">
            {fr ? 'Ils nous font confiance' : 'They trust us'}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mt-4">
            {fr ? 'La parole à nos clients' : 'In our clients\' words'}
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.08}>
              <figure className="h-full p-8 border border-gold/15 bg-obsidian-card">
                <div aria-hidden className="flex gap-1 mb-5 text-gold text-sm">
                  {'★★★★★'.split('').map((s, j) => (
                    <span key={j}>{s}</span>
                  ))}
                </div>
                <blockquote className="text-cream-muted font-sans text-sm leading-relaxed mb-6">
                  « {item.quote[lang]} »
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold/15 text-gold flex items-center justify-center font-serif">
                    {item.initial}
                  </span>
                  <span className="text-cream text-sm font-sans">{item.name}</span>
                  <span className="text-gold/50">·</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gold/70 font-sans">
                    {item.work[lang]}
                  </span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
