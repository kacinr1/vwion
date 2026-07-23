import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VWION — Atelier Horloger d\'Excellence · Suisse',
  description: 'Polissage et restauration de montres de luxe en Suisse. Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin. Sur rendez-vous.',
  keywords: 'restauration montre luxe, polissage montre suisse, Rolex restauration, Patek Philippe, Audemars Piguet',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col bg-obsidian text-cream">
        <LanguageProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
