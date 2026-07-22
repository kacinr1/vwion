'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'

const ICONS = ['◈', '◆', '◇', '❖']

const COMPONENTS = [
  'Boîtier (case)',
  'Fond de boîtier',
  'Lunette (bezel)',
  'Couronne',
  'Poussoirs',
  'Verre saphir',
  'Anses (lugs)',
  'Bracelet métal',
  'Fermoir',
  'Flancs et cornes',
]

export default function ServicesPage() {
  const { t } = useLang()

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 bg-obsidian relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gold/4 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.services.badge}</span>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-cream mt-6 mb-6">{t.services.title}</h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="text-cream-muted text-lg font-sans leading-relaxed max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-24 px-6 bg-obsidian-soft">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.services.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-10 border border-gold/15 bg-obsidian-card hover:border-gold/40 transition-all duration-500 group h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl text-gold">{ICONS[i]}</span>
                    <span className="text-[9px] tracking-[0.4em] uppercase text-gold/50 font-sans">Service 0{i + 1}</span>
                  </div>
                  <h2 className="text-2xl font-serif text-cream group-hover:text-gold transition-colors mb-4">{item.title}</h2>
                  <p className="text-cream-muted font-sans leading-relaxed mb-6">{item.desc}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <span className="w-6 h-px bg-gold" />
                    <span className="text-[9px] tracking-[0.3em] uppercase text-gold font-sans">{item.detail}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Components treated */}
      <section className="py-24 px-6 bg-obsidian">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">Intervention complète</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-cream mt-4 mb-4">
              Tous les composants traités
            </h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {COMPONENTS.map((comp, i) => (
              <ScrollReveal key={comp} delay={i * 0.05}>
                <div className="p-4 border border-gold/15 bg-obsidian-card text-center hover:border-gold/40 transition-all duration-300">
                  <p className="text-cream-muted text-xs font-sans tracking-wide">{comp}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-24 px-6 bg-obsidian-soft">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">Marques acceptées</span>
            <h2 className="text-3xl font-serif font-light text-cream mt-4">Toutes marques de prestige</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Vacheron Constantin', 'Richard Mille', 'A. Lange & Söhne', 'IWC', 'Jaeger-LeCoultre', 'Cartier', 'Omega', 'Breguet', 'Panerai'].map((brand, i) => (
              <ScrollReveal key={brand} delay={i * 0.04}>
                <div className="p-5 border border-gold/10 bg-obsidian-card text-center hover:border-gold/40 group transition-all duration-300">
                  <p className="text-cream-muted group-hover:text-gold font-sans text-sm tracking-widest transition-colors">{brand}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-obsidian">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-cream mb-6">
              Prêt à confier votre montre ?
            </h2>
            <p className="text-cream-muted font-sans mb-10 leading-relaxed">
              Obtenez une estimation en ligne ou prenez directement rendez-vous à notre atelier.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tarifs" className="px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold bg-gold text-obsidian hover:bg-gold-light transition-all duration-300">
                Estimer ma montre
              </Link>
              <Link href="/contact" className="px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold text-gold border border-gold/50 hover:bg-gold hover:text-obsidian transition-all duration-300">
                Prendre RDV
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
