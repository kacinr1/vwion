'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'
import PolissageHero from '@/components/PolissageHero'

const WATCH_SVG_BEFORE = (
  <svg viewBox="0 0 200 260" className="w-full h-full" fill="none">
    <rect x="60" y="60" width="80" height="140" rx="40" fill="#1a1a1a" stroke="#333" strokeWidth="2"/>
    <rect x="70" y="70" width="60" height="120" rx="30" fill="#0f0f0f" stroke="#444" strokeWidth="1"/>
    <circle cx="100" cy="130" r="28" fill="#141414" stroke="#555" strokeWidth="1.5"/>
    <line x1="100" y1="130" x2="100" y2="110" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
    <line x1="100" y1="130" x2="115" y2="135" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Scratches */}
    <line x1="72" y1="90" x2="85" y2="100" stroke="#444" strokeWidth="1.5" opacity="0.8"/>
    <line x1="115" y1="85" x2="125" y2="95" stroke="#3a3a3a" strokeWidth="1" opacity="0.9"/>
    <line x1="75" y1="155" x2="90" y2="165" stroke="#404040" strokeWidth="2" opacity="0.7"/>
    <line x1="110" y1="160" x2="128" y2="170" stroke="#383838" strokeWidth="1.5" opacity="0.8"/>
    <path d="M68 120 Q72 122 68 125" stroke="#4a4a4a" strokeWidth="1" fill="none" opacity="0.9"/>
    {/* Strap */}
    <rect x="78" y="30" width="20" height="35" rx="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5"/>
    <rect x="78" y="195" width="20" height="35" rx="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5"/>
    <line x1="80" y1="40" x2="95" y2="40" stroke="#333" strokeWidth="0.8"/>
    <line x1="80" y1="46" x2="95" y2="46" stroke="#333" strokeWidth="0.8"/>
    <line x1="80" y1="52" x2="95" y2="52" stroke="#333" strokeWidth="0.8"/>
  </svg>
)

const WATCH_SVG_AFTER = (
  <svg viewBox="0 0 200 260" className="w-full h-full" fill="none">
    <rect x="60" y="60" width="80" height="140" rx="40" fill="#1e1e1e" stroke="#C9A84C" strokeWidth="2"/>
    <rect x="70" y="70" width="60" height="120" rx="30" fill="#121212" stroke="#8B6914" strokeWidth="1"/>
    <circle cx="100" cy="130" r="28" fill="#141414" stroke="#C9A84C" strokeWidth="1.5"/>
    <circle cx="100" cy="130" r="25" fill="none" stroke="#8B6914" strokeWidth="0.5" strokeDasharray="2 3"/>
    <line x1="100" y1="130" x2="100" y2="108" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
    <line x1="100" y1="130" x2="116" y2="135" stroke="#E8C96A" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="100" cy="130" r="3" fill="#C9A84C"/>
    {/* Hour marks */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
      <line
        key={i}
        x1={100 + 22 * Math.sin(deg * Math.PI / 180)}
        y1={130 - 22 * Math.cos(deg * Math.PI / 180)}
        x2={100 + 25 * Math.sin(deg * Math.PI / 180)}
        y2={130 - 25 * Math.cos(deg * Math.PI / 180)}
        stroke="#C9A84C"
        strokeWidth="1"
        opacity="0.7"
      />
    ))}
    {/* Strap polished */}
    <rect x="78" y="30" width="20" height="35" rx="4" fill="#1a1a1a" stroke="#C9A84C" strokeWidth="1"/>
    <rect x="78" y="195" width="20" height="35" rx="4" fill="#1a1a1a" stroke="#C9A84C" strokeWidth="1"/>
    <line x1="80" y1="40" x2="95" y2="40" stroke="#8B6914" strokeWidth="0.8" opacity="0.5"/>
    <line x1="80" y1="46" x2="95" y2="46" stroke="#8B6914" strokeWidth="0.8" opacity="0.5"/>
    <line x1="80" y1="52" x2="95" y2="52" stroke="#8B6914" strokeWidth="0.8" opacity="0.5"/>
  </svg>
)

export default function HomePage() {
  const { t } = useLang()

  return (
    <>
      <PolissageHero />

      {/* ── INTRO ── */}
      <section className="py-32 px-6 bg-obsidian-soft">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.intro.badge}</span>
            <div className="w-8 h-px bg-gold mx-auto mt-4" />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-cream leading-tight mb-8">
                {t.intro.title}
              </h2>
              <p className="text-cream-muted leading-relaxed text-lg font-sans">
                {t.intro.text}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="grid grid-cols-1 gap-5">
                {[
                  { icon: '◈', label: t.intro.byAppointment },
                  { icon: '◆', label: t.intro.certified },
                  { icon: '◇', label: t.intro.discretion },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-5 p-5 border border-gold/15 bg-obsidian-card">
                    <span className="text-gold text-xl">{item.icon}</span>
                    <span className="text-cream-muted font-sans tracking-wide">{item.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-32 px-6 bg-obsidian">
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
                <div className="p-8 border border-gold/15 bg-obsidian-card hover:border-gold/40 transition-all duration-500 group">
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

      {/* ── BEFORE / AFTER TEASER ── */}
      <section className="py-32 px-6 bg-obsidian-soft">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.gallery.badge}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mt-4 mb-4">{t.gallery.title}</h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ScrollReveal direction="left">
              <div className="border border-red-900/30 bg-obsidian-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-red-700 rounded-full" />
                  <span className="text-[9px] tracking-[0.4em] uppercase text-red-700/80 font-sans">{t.gallery.before}</span>
                </div>
                <div className="w-48 h-64 mx-auto opacity-60">
                  {WATCH_SVG_BEFORE}
                </div>
                <p className="text-center text-cream-muted text-sm font-sans mt-4">Rolex Submariner — Rayures profondes</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="border border-gold/30 bg-obsidian-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                  <span className="text-[9px] tracking-[0.4em] uppercase text-gold/80 font-sans">{t.gallery.after}</span>
                </div>
                <div className="w-48 h-64 mx-auto">
                  {WATCH_SVG_AFTER}
                </div>
                <p className="text-center text-gold text-sm font-sans mt-4">Rolex Submariner — Restaurée</p>
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

      {/* ── CTA SECTION ── */}
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
                {t.contact.badge} — RDV
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
