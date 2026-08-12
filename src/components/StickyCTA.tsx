'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { trackEvent } from '@/lib/analytics'
import { BUSINESS } from '@/lib/business'

// CTA sticky mobile (item 5) — visible < 768px, après 300px de scroll.
export default function StickyCTA() {
  const { t } = useLang()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ne pas afficher sur les pages de conversion / légales.
  const hidden = ['/merci', '/confidentialite', '/mentions-legales'].includes(pathname)
  if (hidden) return null

  return (
    <>
      {/* Réserve d'espace pour ne jamais masquer le contenu de bas de page sur mobile */}
      <div className="md:hidden h-16" aria-hidden />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch gap-px bg-gold/20 border-t border-gold/30"
          >
            <Link
              href="/contact"
              onClick={() => trackEvent('click_devis', { location: 'sticky_cta' })}
              className="flex-1 flex items-center justify-center bg-gold text-obsidian py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold"
            >
              {t.hero.ctaAppointment}
            </Link>
            <a
              href={`tel:${BUSINESS.phone}`}
              onClick={() => trackEvent('click_phone', { location: 'sticky_cta' })}
              aria-label={`Appeler ${BUSINESS.phoneDisplay}`}
              className="flex items-center justify-center bg-obsidian text-gold px-6 py-4"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
