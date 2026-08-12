// Questions réelles du métier — utilisées par la page FAQ et le schema FAQPage.
export type QA = { q: string; a: string }

export const faq: Record<'fr' | 'en', QA[]> = {
  fr: [
    {
      q: 'Combien coûte un polissage de boîtier ?',
      a: "Un polissage simple débute autour de 200 CHF, une remise à neuf complète du boîtier et du bracelet autour de 300 CHF. Le tarif exact dépend du matériau, de l'état de la pièce et des interventions nécessaires ; il est confirmé après examen physique à l'atelier.",
    },
    {
      q: 'Le polissage altère-t-il la valeur de ma montre ?',
      a: "Un polissage mal exécuté arrondit les arêtes et fait perdre de la matière. Nous pratiquons un polissage raisonné : préservation des angles d'origine, retrait minimal de matière et respect des finitions (satinage, poli miroir). Pour une pièce de collection, nous conseillons parfois de ne traiter que certaines zones.",
    },
    {
      q: 'Quels sont les délais pour une restauration ?',
      a: "Comptez généralement de 1 à 3 semaines selon la complexité et la disponibilité des composants. Un délai précis vous est communiqué avec le devis.",
    },
    {
      q: 'Travaillez-vous sur toutes les marques ?',
      a: "Oui : Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin, Omega et la plupart des maisons horlogères de prestige. Certaines pièces très spécifiques peuvent nécessiter une évaluation préalable.",
    },
    {
      q: 'Ma montre est-elle assurée pendant l\'intervention ?',
      a: "Chaque pièce confiée est manipulée avec le plus grand soin et couverte pendant sa présence à l'atelier. Les modalités précises vous sont détaillées lors du dépôt.",
    },
    {
      q: 'Faites-vous le satinage et le microbillage ?',
      a: "Oui. Nous maîtrisons le poli miroir, le satinage (droit et circulaire), l'anglage et le microbillage, afin de restituer fidèlement les finitions d'origine de chaque garde-temps.",
    },
    {
      q: 'Comment se déroule un devis ?',
      a: "Vous décrivez votre montre et son état via le formulaire ou l'estimateur en ligne. Nous vous répondons sous 24h ouvrées avec une première estimation, confirmée après examen physique de la pièce.",
    },
    {
      q: 'Puis-je déposer ma montre à l\'atelier ?',
      a: "Oui, sur rendez-vous uniquement. Le lieu exact vous est communiqué lors de la prise de rendez-vous, à Genève.",
    },
  ],
  en: [
    {
      q: 'How much does case polishing cost?',
      a: 'A simple polish starts around CHF 200, and a full case-and-bracelet refurbishment around CHF 300. The exact price depends on the material, the condition of the piece and the work required; it is confirmed after a physical examination at the atelier.',
    },
    {
      q: 'Does polishing affect the value of my watch?',
      a: 'A poorly executed polish rounds the edges and removes material. We practise measured polishing: preserving the original angles, minimal material removal and respecting finishes (satin, mirror polish). For a collector\'s piece, we sometimes advise treating only selected areas.',
    },
    {
      q: 'How long does a restoration take?',
      a: 'Generally 1 to 3 weeks depending on complexity and component availability. A precise timeframe is provided with your quote.',
    },
    {
      q: 'Do you work on all brands?',
      a: 'Yes: Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin, Omega and most prestige watchmaking houses. Some very specific pieces may require a prior assessment.',
    },
    {
      q: 'Is my watch insured during the work?',
      a: 'Every piece entrusted to us is handled with the utmost care and covered while at the atelier. The exact terms are detailed when you drop it off.',
    },
    {
      q: 'Do you offer satin finishing and bead-blasting?',
      a: 'Yes. We master mirror polishing, satin finishing (straight and circular), bevelling and bead-blasting, to faithfully restore each timepiece\'s original finishes.',
    },
    {
      q: 'How does a quote work?',
      a: 'You describe your watch and its condition via the form or the online estimator. We reply within 24 working hours with an initial estimate, confirmed after a physical examination of the piece.',
    },
    {
      q: 'Can I bring my watch to the atelier?',
      a: 'Yes, by appointment only. The exact location in Geneva is communicated when you book your appointment.',
    },
  ],
}
