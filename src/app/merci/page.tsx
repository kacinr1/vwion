'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { trackEvent } from '@/lib/analytics'
import { BUSINESS } from '@/lib/business'

export default function MerciPage() {
  const { lang } = useLang()
  const fr = lang === 'fr'

  // Page de conversion mesurable — déclenche generate_lead (item 2 + 16).
  useEffect(() => {
    trackEvent('generate_lead', { form: 'contact_devis' })
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-6 pt-40 pb-32 text-center">
      <div className="text-gold text-5xl mb-8">◈</div>
      <h1 className="text-4xl font-serif font-light text-cream mb-6">
        {fr ? 'Merci pour votre demande' : 'Thank you for your request'}
      </h1>
      <p className="text-cream-muted text-base leading-relaxed font-sans mb-4">
        {fr
          ? 'Votre message est bien arrivé à l\'atelier. Nous revenons vers vous sous 24 heures ouvrées avec une première estimation.'
          : 'Your message has reached the atelier. We will get back to you within 24 working hours with an initial estimate.'}
      </p>
      <p className="text-cream-muted text-sm font-sans mb-12">
        {fr ? 'Pour une demande urgente, appelez-nous directement au ' : 'For an urgent request, call us directly at '}
        <a href={`tel:${BUSINESS.phone}`} className="text-gold underline underline-offset-2">
          {BUSINESS.phoneDisplay}
        </a>
        .
      </p>
      <Link
        href="/services"
        className="inline-block px-8 py-3 text-[10px] tracking-[0.25em] uppercase font-sans bg-gold text-obsidian font-semibold hover:bg-gold-light transition-colors"
      >
        {fr ? 'Découvrir nos services' : 'Discover our services'}
      </Link>
    </div>
  )
}
