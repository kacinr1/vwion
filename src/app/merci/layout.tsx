import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Merci — VWION',
  description: 'Votre demande a bien été envoyée à l\'atelier VWION.',
  robots: { index: false, follow: false },
}

export default function MerciLayout({ children }: { children: React.ReactNode }) {
  return children
}
