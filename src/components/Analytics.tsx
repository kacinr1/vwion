'use client'

import { useEffect, useState } from 'react'
import { GA_ID, CONSENT_KEY } from '@/lib/analytics'
import { useLang } from '@/context/LanguageContext'

const COPY = {
  fr: {
    text: 'Nous utilisons des cookies de mesure d\'audience (Google Analytics) pour améliorer votre expérience. Vous pouvez accepter ou refuser.',
    accept: 'Accepter',
    refuse: 'Refuser',
    privacy: 'Confidentialité',
  },
  en: {
    text: 'We use analytics cookies (Google Analytics) to improve your experience. You can accept or decline.',
    accept: 'Accept',
    refuse: 'Decline',
    privacy: 'Privacy',
  },
}

function loadGA() {
  if (!GA_ID || typeof window === 'undefined') return
  if (document.getElementById('ga4-src')) return
  const s = document.createElement('script')
  s.id = 'ga4-src'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })
}

export default function Analytics() {
  const { lang } = useLang()
  const [decision, setDecision] = useState<'granted' | 'denied' | null>(null)
  const c = COPY[lang]

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as 'granted' | 'denied' | null
    setDecision(stored)
    if (stored === 'granted') loadGA()
  }, [])

  const choose = (value: 'granted' | 'denied') => {
    localStorage.setItem(CONSENT_KEY, value)
    setDecision(value)
    if (value === 'granted') loadGA()
  }

  if (decision !== null) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-gold/20 bg-obsidian/98 backdrop-blur-md px-5 py-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-cream-muted text-[12px] leading-relaxed font-sans flex-1">
          {c.text}{' '}
          <a href="/confidentialite" className="text-gold underline underline-offset-2">
            {c.privacy}
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => choose('denied')}
            className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-sans text-cream-muted hover:text-cream transition-colors"
          >
            {c.refuse}
          </button>
          <button
            onClick={() => choose('granted')}
            className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans bg-gold text-obsidian font-semibold hover:bg-gold-light transition-colors"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
