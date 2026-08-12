// Helpers GA4 — le chargement réel est conditionné au consentement (LPD).
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID
export const CONSENT_KEY = 'vwion_consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CONSENT_KEY) === 'granted'
}

// Événement custom GA4 — no-op silencieux si GA non chargé / pas de consentement.
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params ?? {})
}
