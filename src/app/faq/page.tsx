'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { faq } from '@/data/faq'

export default function FaqPage() {
  const { lang } = useLang()
  const fr = lang === 'fr'
  const items = faq[lang]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans mb-4">FAQ</p>
      <h1 className="text-4xl font-serif font-light text-cream mb-3">
        {fr ? 'Questions fréquentes' : 'Frequently asked questions'}
      </h1>
      <p className="text-cream-muted text-sm font-sans mb-12">
        {fr
          ? 'Le polissage, la restauration et le dépôt de votre montre, en toute transparence.'
          : 'Polishing, restoration and dropping off your watch, in full transparency.'}
      </p>

      <div className="divide-y divide-gold/10 border-t border-gold/10">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-cream font-sans text-[15px]">{item.q}</span>
                <span className={`text-gold text-xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-cream-muted text-sm leading-relaxed font-sans pb-6 pr-8">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <div className="mt-14 text-center">
        <p className="text-cream-muted text-sm font-sans mb-5">
          {fr ? 'Une autre question ? Écrivez-nous.' : 'Another question? Get in touch.'}
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 text-[10px] tracking-[0.25em] uppercase font-sans bg-gold text-obsidian font-semibold hover:bg-gold-light transition-colors"
        >
          {fr ? 'Nous contacter' : 'Contact us'}
        </Link>
      </div>
    </div>
  )
}
