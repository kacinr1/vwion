import type { Metadata } from 'next'

const description =
  'Polissage miroir, satinage, anglage et restauration complète de boîtiers et bracelets de montres de luxe à Genève. Toutes marques. Devis sous 24h.'

export const metadata: Metadata = {
  title: 'Polissage de Boîtiers & Restauration — VWION Genève',
  description,
  alternates: { canonical: '/services' },
  openGraph: { title: 'Polissage & Restauration — VWION Genève', description, url: '/services' },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
