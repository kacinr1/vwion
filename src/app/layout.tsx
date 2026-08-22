import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'
import Analytics from '@/components/Analytics'
import { BUSINESS, SITE_URL } from '@/lib/business'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300'],
  variable: '--font-montserrat',
  display: 'swap',
})

const description =
  "Atelier horloger à Genève spécialisé en polissage et restauration de montres de luxe. 15 ans d'expertise en terminaison horlogère. Devis sous 24h."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'VWION — Polissage & Restauration de Montres de Luxe à Genève',
  description,
  keywords: [
    'restauration montre luxe Genève',
    'polissage boîtier montre',
    'polissage miroir Rolex',
    'restauration Patek Philippe',
    'terminaison horlogère Suisse',
    'satinage anglage montre',
  ],
  authors: [{ name: 'VWION — Atelier Horloger' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: SITE_URL,
    siteName: 'VWION — Atelier Horloger',
    title: 'VWION — Polissage & Restauration de Montres de Luxe à Genève',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VWION — Atelier Horloger, Genève',
    description,
  },
  robots: { index: true, follow: true },
}

// JSON-LD LocalBusiness (WatchRepair) — schéma local business (item 18)
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  additionalType: 'https://schema.org/JewelryStore',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS.name,
  description:
    'Atelier de polissage et restauration de montres de luxe à Genève : Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.city,
    addressRegion: 'Genève',
    addressCountry: 'CH',
  },
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: '$$$',
  areaServed: 'Genève et Suisse romande',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col bg-obsidian text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <LanguageProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCTA />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
