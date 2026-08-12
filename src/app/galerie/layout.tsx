import type { Metadata } from 'next'

const description =
  'Restaurations de montres de luxe avant / après : Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin. Le savoir-faire VWION à Genève en images.'

export const metadata: Metadata = {
  title: 'Galerie Avant / Après — VWION Atelier Horloger Genève',
  description,
  alternates: { canonical: '/galerie' },
  openGraph: { title: 'Galerie Avant / Après — VWION Genève', description, url: '/galerie' },
}

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return children
}
