'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'

/* Inline SVG watch renders — "before" damaged, "after" pristine */
function WatchBefore({ scratches = true }: { scratches?: boolean }) {
  return (
    <svg viewBox="0 0 160 220" className="w-full h-full" fill="none">
      <rect x="40" y="45" width="80" height="130" rx="40" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      <rect x="50" y="55" width="60" height="110" rx="30" fill="#111" stroke="#333" strokeWidth="1"/>
      <circle cx="80" cy="110" r="26" fill="#141414" stroke="#3a3a3a" strokeWidth="1.5"/>
      <line x1="80" y1="110" x2="80" y2="92" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
      <line x1="80" y1="110" x2="94" y2="115" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
      {scratches && <>
        <line x1="52" y1="72" x2="63" y2="82" stroke="#404040" strokeWidth="1.5" opacity="0.9"/>
        <line x1="95" y1="68" x2="105" y2="76" stroke="#3a3a3a" strokeWidth="1" opacity="0.9"/>
        <line x1="55" y1="140" x2="68" y2="148" stroke="#454545" strokeWidth="2" opacity="0.8"/>
        <line x1="90" y1="145" x2="108" y2="152" stroke="#404040" strokeWidth="1.5" opacity="0.8"/>
        <path d="M48 100 Q52 103 48 106" stroke="#404040" strokeWidth="1" fill="none"/>
        <line x1="60" y1="90" x2="55" y2="95" stroke="#3a3a3a" strokeWidth="1"/>
      </>}
      <rect x="60" y="18" width="20" height="32" rx="3" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
      <rect x="60" y="172" width="20" height="32" rx="3" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
    </svg>
  )
}

function WatchAfter({ variant = 0 }: { variant?: number }) {
  const goldColors = ['#C9A84C', '#D4A853', '#C5A040', '#CBB058']
  const g = goldColors[variant % goldColors.length]
  return (
    <svg viewBox="0 0 160 220" className="w-full h-full" fill="none">
      <rect x="40" y="45" width="80" height="130" rx="40" fill="#1e1e1e" stroke={g} strokeWidth="2"/>
      <rect x="50" y="55" width="60" height="110" rx="30" fill="#121212" stroke="#8B6914" strokeWidth="1"/>
      <circle cx="80" cy="110" r="26" fill="#141414" stroke={g} strokeWidth="1.5"/>
      <circle cx="80" cy="110" r="23" fill="none" stroke="#8B6914" strokeWidth="0.5" strokeDasharray="2 4"/>
      <line x1="80" y1="110" x2="80" y2="90" stroke={g} strokeWidth="2" strokeLinecap="round"/>
      <line x1="80" y1="110" x2="96" y2="115" stroke="#E8C96A" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="80" cy="110" r="2.5" fill={g}/>
      {[0,60,120,180,240,300].map((deg, i) => (
        <line key={i}
          x1={80 + 20 * Math.sin(deg * Math.PI / 180)}
          y1={110 - 20 * Math.cos(deg * Math.PI / 180)}
          x2={80 + 23 * Math.sin(deg * Math.PI / 180)}
          y2={110 - 23 * Math.cos(deg * Math.PI / 180)}
          stroke={g} strokeWidth="1" opacity="0.8"
        />
      ))}
      <rect x="60" y="18" width="20" height="32" rx="3" fill="#1a1a1a" stroke={g} strokeWidth="1"/>
      <rect x="60" y="172" width="20" height="32" rx="3" fill="#1a1a1a" stroke={g} strokeWidth="1"/>
    </svg>
  )
}

const PIECES = [
  { brand: 'Rolex Submariner', ref: 'Réf. 16610', intervention: 'Rebouchage laser · Lustration complète' },
  { brand: 'Patek Philippe Calatrava', ref: 'Réf. 5196', intervention: 'Remise à neuf · Polissage miroir' },
  { brand: 'Audemars Piguet Royal Oak', ref: 'Réf. 15202', intervention: 'Traitement flancs · Lustration' },
  { brand: 'Vacheron Constantin Overseas', ref: 'Réf. 4500V', intervention: 'Remise à neuf complète' },
  { brand: 'Richard Mille RM 11', ref: 'Titane', intervention: 'Polissage micro-sablage' },
  { brand: 'Rolex Daytona', ref: 'Réf. 116500', intervention: 'Rebouchage laser · Fond' },
]

export default function GaleriePage() {
  const { t } = useLang()

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

      {/* Gallery grid */}
      <section className="py-20 px-6 bg-obsidian-soft">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PIECES.map((piece, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-obsidian-card border border-gold/15 overflow-hidden group hover:border-gold/40 transition-all duration-500">
                  {/* Before/After comparison */}
                  <div className="grid grid-cols-2">
                    {/* Before */}
                    <div className="relative bg-obsidian p-4 border-r border-gold/10">
                      <div className="absolute top-2 left-2">
                        <span className="text-[7px] tracking-[0.3em] uppercase text-red-700/80 font-sans bg-obsidian-card px-2 py-1 border border-red-900/30">
                          {t.gallery.before}
                        </span>
                      </div>
                      <div className="h-40 pt-6 opacity-50 group-hover:opacity-70 transition-opacity">
                        <WatchBefore />
                      </div>
                    </div>
                    {/* After */}
                    <div className="relative bg-obsidian p-4">
                      <div className="absolute top-2 right-2">
                        <span className="text-[7px] tracking-[0.3em] uppercase text-gold/80 font-sans bg-obsidian-card px-2 py-1 border border-gold/30">
                          {t.gallery.after}
                        </span>
                      </div>
                      <div className="h-40 pt-6">
                        <WatchAfter variant={i} />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 border-t border-gold/10">
                    <h3 className="font-serif text-cream text-lg mb-1 group-hover:text-gold transition-colors">{piece.brand}</h3>
                    <p className="text-[10px] tracking-widest text-gold/60 font-sans uppercase mb-3">{piece.ref}</p>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-px bg-gold/50" />
                      <p className="text-cream-muted text-xs font-sans">{piece.intervention}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Legend */}
          <ScrollReveal className="mt-16">
            <div className="border border-gold/15 bg-obsidian-card p-8 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-4">Note</p>
              <p className="text-cream-muted font-sans text-sm leading-relaxed max-w-2xl mx-auto">
                Les illustrations présentées sont des représentations schématiques des types d&apos;interventions réalisées.
                Des photos réelles de vos pièces avant/après seront partagées lors de chaque RDV.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
