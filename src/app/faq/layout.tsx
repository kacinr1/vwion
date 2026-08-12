import type { Metadata } from 'next'
import { faq } from '@/data/faq'

export const metadata: Metadata = {
  title: 'Questions Fréquentes — VWION Atelier Horloger Genève',
  description:
    'Toutes les réponses sur le polissage et la restauration de montres de luxe : prix, délais, marques, assurance et devis. L\'expertise VWION à Genève.',
  alternates: { canonical: '/faq' },
}

// Schema FAQPage injecté côté serveur avec les vraies questions/réponses (item 10).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.fr.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
