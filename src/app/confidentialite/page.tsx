'use client'

import { useLang } from '@/context/LanguageContext'
import { BUSINESS, BUSINESS_ADDRESS } from '@/lib/business'

export default function ConfidentialitePage() {
  const { lang } = useLang()
  const fr = lang === 'fr'

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans mb-4">
        {fr ? 'Informations' : 'Information'}
      </p>
      <h1 className="text-4xl font-serif font-light text-cream mb-3">
        {fr ? 'Politique de confidentialité' : 'Privacy policy'}
      </h1>
      <p className="text-cream-muted text-sm font-sans mb-12">
        {fr
          ? 'Conforme à la loi fédérale suisse sur la protection des données (nLPD, 2023).'
          : 'Compliant with the Swiss Federal Act on Data Protection (nFADP, 2023).'}
      </p>

      <div className="space-y-8 text-cream-muted text-sm leading-relaxed font-sans [&_h2]:text-cream [&_h2]:font-serif [&_h2]:text-xl [&_h2]:mb-3 [&_h2]:mt-2 [&_a]:text-gold [&_a]:underline">
        <section>
          <h2>{fr ? '1. Responsable du traitement' : '1. Data controller'}</h2>
          <p>
            {BUSINESS.name}, {BUSINESS_ADDRESS}.{' '}
            {fr ? 'Contact : ' : 'Contact: '}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> — {BUSINESS.phoneDisplay}.
          </p>
        </section>

        <section>
          <h2>{fr ? '2. Données collectées' : '2. Data collected'}</h2>
          <p>
            {fr
              ? "Via le formulaire de contact et de devis : nom, adresse e-mail, numéro de téléphone (optionnel), marque et modèle de la montre, description de son état et de votre demande. Aucune donnée n'est collectée à votre insu."
              : 'Through the contact and quote form: name, email address, phone number (optional), watch brand and model, description of its condition and of your request. No data is collected without your knowledge.'}
          </p>
        </section>

        <section>
          <h2>{fr ? '3. Finalités du traitement' : '3. Purposes'}</h2>
          <p>
            {fr
              ? 'Répondre à vos demandes de devis et de rendez-vous, établir une estimation, assurer le suivi de la prestation et vous recontacter. Vos données ne sont ni vendues, ni louées, ni cédées à des tiers à des fins commerciales.'
              : 'To respond to your quote and appointment requests, provide an estimate, follow up on the service and get back to you. Your data is never sold, rented or transferred to third parties for commercial purposes.'}
          </p>
        </section>

        <section>
          <h2>{fr ? '4. Durée de conservation' : '4. Retention period'}</h2>
          <p>
            {fr
              ? 'Les données des demandes sont conservées pour la durée nécessaire au traitement de votre requête, puis archivées au maximum 24 mois avant suppression, sauf obligation légale contraire.'
              : 'Request data is kept for as long as necessary to process your request, then archived for a maximum of 24 months before deletion, unless a legal obligation requires otherwise.'}
          </p>
        </section>

        <section>
          <h2>{fr ? '5. Cookies et mesure d\'audience' : '5. Cookies and analytics'}</h2>
          <p>
            {fr
              ? 'Nous utilisons Google Analytics (GA4) pour mesurer l\'audience du site. Ces cookies ne sont déposés qu\'après votre consentement explicite, via le bandeau affiché lors de votre première visite. Vous pouvez refuser sans conséquence sur votre navigation.'
              : 'We use Google Analytics (GA4) to measure site traffic. These cookies are only set after your explicit consent, via the banner shown on your first visit. You can decline without any impact on your browsing.'}
          </p>
        </section>

        <section>
          <h2>{fr ? '6. Vos droits' : '6. Your rights'}</h2>
          <p>
            {fr
              ? 'Vous disposez d\'un droit d\'accès, de rectification, d\'effacement et d\'opposition sur vos données. Pour l\'exercer, écrivez à '
              : 'You have the right to access, rectify, erase and object to the processing of your data. To exercise it, write to '}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
