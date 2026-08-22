'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'
import ClockIntro from '@/components/ClockIntro'
import ServiceHero from '@/components/ServiceHero'
import CraftSequence from '@/components/CraftSequence'
import CaseStudies from '@/components/CaseStudies'
import Testimonials from '@/components/Testimonials'

export default function HomePage() {
  const { t, lang } = useLang()

  return (
    <>
      <ClockIntro />

      {/* ── HERO SERVICE (split : message + vidéo polissage) ── */}
      <ServiceHero />

      {/* ── SAVOIR-FAIRE : les 4 étapes en vidéo ── */}
      <section className="py-24 px-6 bg-obsidian text-center">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.hero.craftBadge}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mt-4">{t.hero.craftTitle}</h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </ScrollReveal>
      </section>

      {/* Séquence fondue : les 4 étapes en un seul film continu */}
      <CraftSequence />

      {/* ── AVANT / APRÈS ── */}
      <section className="py-32 px-6 bg-obsidian-soft">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.gallery.badge}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mt-4 mb-4">{t.gallery.title}</h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ScrollReveal direction="left">
              <div className="group border border-red-900/30 bg-obsidian-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-red-700 rounded-full" />
                  <span className="text-[9px] tracking-[0.4em] uppercase text-red-700/80 font-sans">{t.gallery.before}</span>
                </div>
                <div className="overflow-hidden">
                  <img
                    src="/gallery/rolex-datejust-avant.jpg"
                    alt={lang === 'fr' ? 'Rolex Datejust avant restauration — cornes et carrure rayées' : 'Rolex Datejust before restoration — scratched lugs and case band'}
                    className="w-full aspect-[4/5] object-cover grayscale-[0.2] group-hover:grayscale-0 motion-safe:group-hover:scale-[1.02] transition-[filter,scale] duration-500 ease-out-quint"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-cream-muted text-sm font-sans mt-4">{lang === 'fr' ? 'Rolex Datejust — Rayures profondes' : 'Rolex Datejust — Deep scratches'}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="group border border-gold/30 bg-obsidian-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                  <span className="text-[9px] tracking-[0.4em] uppercase text-gold/80 font-sans">{t.gallery.after}</span>
                </div>
                <div className="overflow-hidden">
                  <img
                    src="/gallery/rolex-datejust-apres.jpg"
                    alt={lang === 'fr' ? 'Rolex Datejust après restauration — poli miroir' : 'Rolex Datejust after restoration — mirror polish'}
                    className="w-full aspect-[4/5] object-cover motion-safe:group-hover:scale-[1.02] transition-transform duration-500 ease-out-quint"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-gold text-sm font-sans mt-4">{lang === 'fr' ? 'Rolex Datejust — Restaurée' : 'Rolex Datejust — Restored'}</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="text-center">
            <Link href="/galerie" className="inline-block px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans text-gold border border-gold/50 hover:bg-gold hover:text-obsidian transition-all duration-300">
              Voir la galerie complète
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MARQUES TRAVAILLÉES ── */}
      <section className="py-28 px-6 bg-obsidian">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.hero.brandsTitle}</span>
            <div className="w-8 h-px bg-gold mx-auto mt-4 mb-12" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {t.hero.brandsList.map((brand) => (
                <span
                  key={brand}
                  className="text-xl md:text-3xl font-serif font-light text-cream/70 hover:text-gold transition-colors duration-500"
                >
                  {brand}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SERVICES DÉTAILLÉS ── */}
      <section className="py-32 px-6 bg-obsidian-soft">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.services.badge}</span>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16" delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mt-4">{t.services.title}</h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.services.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-gold/15 bg-obsidian-card hover:border-gold/40 transition-all duration-500 group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-serif text-cream group-hover:text-gold transition-colors">{item.title}</h3>
                    <span className="text-gold text-xs tracking-widest font-sans mt-1">0{i + 1}</span>
                  </div>
                  <p className="text-cream-muted font-sans text-sm leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-px bg-gold/50" />
                    <span className="text-[9px] tracking-[0.3em] uppercase text-gold/70 font-sans">{item.detail}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12" delay={0.4}>
            <Link href="/services" className="inline-block px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans text-gold border border-gold/50 hover:bg-gold hover:text-obsidian transition-all duration-300">
              {t.hero.cta}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ÉTUDES DE CAS ── */}
      <CaseStudies />

      {/* ── AVIS CLIENTS ── */}
      <Testimonials />

      {/* ── CONVERSION ── */}
      <section className="py-32 px-6 bg-obsidian relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/4 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">Suisse · Sur Rendez-vous</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mt-6 mb-6">
              Confier votre pièce à <span className="text-gold">des experts</span>
            </h2>
            <p className="text-cream-muted font-sans leading-relaxed mb-10">
              Chaque montre est unique. Prenez rendez-vous pour une évaluation personnalisée et un devis précis.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold text-obsidian bg-gold hover:bg-gold-light transition-all duration-300">
                {t.hero.ctaAppointment}
              </Link>
              <Link href="/tarifs" className="px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold text-gold border border-gold/50 hover:border-gold hover:bg-gold/5 transition-all duration-300">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
