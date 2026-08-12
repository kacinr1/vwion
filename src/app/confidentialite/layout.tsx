import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — VWION',
  description:
    "Politique de confidentialité de l'atelier horloger VWION, conforme à la nLPD suisse : données collectées, finalités, durée de conservation et droits des personnes.",
  alternates: { canonical: '/confidentialite' },
  robots: { index: true, follow: true },
}

export default function ConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return children
}
