'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

export default function NotFound() {
  const { t, lang } = useLang()
  const fr = lang === 'fr'

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-gold text-7xl font-serif font-light mb-6">404</p>
      <h1 className="text-2xl md:text-3xl font-serif font-light text-cream mb-4">
        {fr ? 'Cette page s\'est égarée dans les rouages' : 'This page got lost in the gears'}
      </h1>
      <p className="text-cream-muted text-sm font-sans mb-10 max-w-md">
        {fr
          ? 'La page que vous cherchez n\'existe pas ou a été déplacée. Retrouvez le chemin de l\'atelier.'
          : 'The page you are looking for does not exist or has moved. Find your way back to the atelier.'}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-sans bg-gold text-obsidian font-semibold hover:bg-gold-light transition-colors">
          {t.nav.home}
        </Link>
        <Link href="/services" className="px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-sans border border-gold/40 text-cream hover:border-gold transition-colors">
          {t.nav.services}
        </Link>
        <Link href="/contact" className="px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-sans border border-gold/40 text-cream hover:border-gold transition-colors">
          {t.nav.contact}
        </Link>
      </div>
    </div>
  )
}
