import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales — VWION',
  description:
    "Mentions légales de l'atelier horloger VWION à Genève : raison sociale, siège, coordonnées et hébergement du site.",
  alternates: { canonical: '/mentions-legales' },
  robots: { index: true, follow: true },
}

export default function MentionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
