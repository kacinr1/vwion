import type { Metadata } from 'next'

const description =
  "Contactez l'atelier horloger VWION à Genève pour un devis de polissage ou de restauration de votre montre de luxe. Réponse sous 24h ouvrées, sur rendez-vous."

export const metadata: Metadata = {
  title: 'Contact & Devis — VWION Atelier Horloger Genève',
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact & Devis — VWION Genève', description, url: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
