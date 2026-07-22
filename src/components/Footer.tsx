'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-obsidian border-t border-gold/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="text-3xl font-serif tracking-[0.3em] text-cream font-light">VWION</span>
              <span className="text-[9px] tracking-[0.4em] text-gold uppercase font-sans mt-1">Atelier Horloger</span>
            </div>
            <p className="text-cream-muted text-sm leading-relaxed font-sans">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-5">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: t.nav.home },
                { href: '/services', label: t.nav.services },
                { href: '/galerie', label: t.nav.gallery },
                { href: '/tarifs', label: t.nav.pricing },
                { href: '/contact', label: t.nav.contact },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-[11px] tracking-[0.15em] uppercase text-cream-muted hover:text-gold transition-colors font-sans">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-5">Atelier</h4>
            <div className="flex flex-col gap-3 text-cream-muted text-sm font-sans">
              <p>🇨🇭 {t.contact.info.location}</p>
              <p>{t.contact.info.hours}</p>
              <p>{t.footer.byAppointment}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-muted text-xs tracking-widest font-sans uppercase">
            © {year} VWION · {t.footer.rights}
          </p>
          <div className="flex items-center gap-1">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold text-lg">◈</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </div>
      </div>
    </footer>
  )
}
