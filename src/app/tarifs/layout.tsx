import type { Metadata } from 'next'

const description =
  "Estimez le polissage ou la restauration de votre montre de luxe en ligne. Tarifs transparents et devis personnalisé sous 24h à l'atelier VWION Genève."

export const metadata: Metadata = {
  title: 'Tarifs & Estimation en Ligne — VWION Genève',
  description,
  alternates: { canonical: '/tarifs' },
  openGraph: { title: 'Tarifs & Estimation — VWION Genève', description, url: '/tarifs' },
}

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return children
}
