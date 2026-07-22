'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'

export default function Navigation() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/galerie', label: t.nav.gallery },
    { href: '/tarifs', label: t.nav.pricing },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-gold/10' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-2xl font-serif tracking-[0.3em] text-cream font-light">VWION</span>
          <span className="text-[9px] tracking-[0.4em] text-gold uppercase font-sans mt-0.5">Atelier Horloger</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.2em] uppercase text-cream-muted hover:text-gold transition-colors duration-300 font-sans"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-5">
          {/* Language switcher */}
          <div className="flex items-center gap-2 text-[10px] tracking-widest font-sans">
            <button
              onClick={() => setLang('fr')}
              className={`uppercase transition-colors ${lang === 'fr' ? 'text-gold' : 'text-cream-muted hover:text-cream'}`}
            >
              FR
            </button>
            <span className="text-gold/30">|</span>
            <button
              onClick={() => setLang('en')}
              className={`uppercase transition-colors ${lang === 'en' ? 'text-gold' : 'text-cream-muted hover:text-cream'}`}
            >
              EN
            </button>
          </div>

          <Link
            href="/contact"
            className="px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans bg-gold text-obsidian font-semibold hover:bg-gold-light transition-colors duration-300"
          >
            {t.nav.appointment}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-obsidian/98 backdrop-blur-md border-t border-gold/10"
          >
            <nav className="flex flex-col py-6 px-6 gap-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[12px] tracking-[0.25em] uppercase text-cream-muted hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-gold/10">
                <button onClick={() => setLang('fr')} className={`text-[10px] tracking-widest uppercase ${lang === 'fr' ? 'text-gold' : 'text-cream-muted'}`}>FR</button>
                <span className="text-gold/30">|</span>
                <button onClick={() => setLang('en')} className={`text-[10px] tracking-widest uppercase ${lang === 'en' ? 'text-gold' : 'text-cream-muted'}`}>EN</button>
              </div>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="inline-block text-center py-3 text-[10px] tracking-[0.2em] uppercase bg-gold text-obsidian font-semibold font-sans">
                {t.nav.appointment}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
