'use client'

import { useLang } from '@/context/LanguageContext'
import { BUSINESS, BUSINESS_ADDRESS } from '@/lib/business'

export default function MentionsLegalesPage() {
  const { lang } = useLang()
  const fr = lang === 'fr'

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans mb-4">
        {fr ? 'Informations' : 'Information'}
      </p>
      <h1 className="text-4xl font-serif font-light text-cream mb-12">
        {fr ? 'Mentions légales' : 'Legal notice'}
      </h1>

      <div className="space-y-8 text-cream-muted text-sm leading-relaxed font-sans [&_h2]:text-cream [&_h2]:font-serif [&_h2]:text-xl [&_h2]:mb-3 [&_a]:text-gold [&_a]:underline">
        <section>
          <h2>{fr ? 'Éditeur du site' : 'Site publisher'}</h2>
          <p>
            {BUSINESS.name}
            <br />
            {BUSINESS_ADDRESS}
            <br />
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> — {BUSINESS.phoneDisplay}
          </p>
        </section>

        <section>
          <h2>{fr ? 'Activité' : 'Activity'}</h2>
          <p>
            {fr
              ? 'Atelier horloger — polissage et restauration de montres de luxe, sur rendez-vous, à Genève et en Suisse romande.'
              : 'Watchmaking atelier — polishing and restoration of luxury watches, by appointment, in Geneva and French-speaking Switzerland.'}
          </p>
        </section>

        <section>
          <h2>{fr ? 'Hébergement' : 'Hosting'}</h2>
          <p>
            {fr
              ? 'Site hébergé par son prestataire d\'infrastructure cloud. Les coordonnées de l\'hébergeur sont disponibles sur demande à '
              : 'Website hosted by its cloud infrastructure provider. Host contact details are available on request at '}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
          </p>
        </section>

        <section>
          <h2>{fr ? 'Propriété intellectuelle' : 'Intellectual property'}</h2>
          <p>
            {fr
              ? 'L\'ensemble des contenus du site (textes, visuels, marque VWION) est protégé. Toute reproduction sans autorisation est interdite.'
              : 'All site content (texts, visuals, the VWION brand) is protected. Any reproduction without authorisation is prohibited.'}
          </p>
        </section>
      </div>
    </div>
  )
}
