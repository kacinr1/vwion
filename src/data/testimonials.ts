// TODO: remplacer par de vrais avis clients avant mise en ligne.
// ⚠️ Ne pas activer de rich snippets Review/AggregateRating tant que les avis ne sont pas réels (Google pénalise les faux avis).
export type Testimonial = {
  name: string
  initial: string
  work: { fr: string; en: string }
  quote: { fr: string; en: string }
}

export const testimonials: Testimonial[] = [
  {
    name: 'Laurent M.',
    initial: 'L',
    work: { fr: 'Restauration boîtier or rose', en: 'Rose gold case restoration' },
    quote: {
      fr: 'Un travail d\'orfèvre. Les arêtes de mon boîtier ont été préservées, la montre a retrouvé son éclat sans perdre son caractère.',
      en: 'Goldsmith-level work. The edges of my case were preserved, and the watch regained its shine without losing its character.',
    },
  },
  {
    name: 'Sophie R.',
    initial: 'S',
    work: { fr: 'Polissage miroir acier', en: 'Steel mirror polishing' },
    quote: {
      fr: 'Discrétion, conseil et un rendu impeccable. On sent la maîtrise du satinage et du poli miroir.',
      en: 'Discretion, guidance and a flawless result. You can feel the mastery of satin and mirror finishing.',
    },
  },
  {
    name: 'Andréas K.',
    initial: 'A',
    work: { fr: 'Remise à neuf complète', en: 'Complete refurbishment' },
    quote: {
      fr: 'Délais tenus, communication claire, ma pièce est revenue comme au premier jour. Je recommande sans réserve.',
      en: 'Deadlines met, clear communication, my piece came back like new. I recommend without reservation.',
    },
  },
  {
    name: 'Isabelle V.',
    initial: 'I',
    work: { fr: 'Rebouchage laser lunette', en: 'Laser bezel filling' },
    quote: {
      fr: 'Les chocs sur la lunette ont totalement disparu. Un savoir-faire rare, à Genève.',
      en: 'The impacts on the bezel completely disappeared. A rare craft, right here in Geneva.',
    },
  },
]
