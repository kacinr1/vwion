// Études de cas avant/après (item 19).
// TODO: remplacer les descriptions et ajouter des photos avant/après réelles.
export type CaseStudy = {
  watch: string
  problem: { fr: string; en: string }
  intervention: { fr: string; en: string }
  result: { fr: string; en: string }
}

export const caseStudies: CaseStudy[] = [
  {
    watch: 'Rolex Submariner',
    problem: {
      fr: 'Rayures profondes sur le boîtier et le bracelet, arêtes ternies après des années de port quotidien.',
      en: 'Deep scratches on the case and bracelet, dulled edges after years of daily wear.',
    },
    intervention: {
      fr: 'Polissage raisonné du boîtier, satinage droit des maillons, préservation stricte des angles d\'origine.',
      en: 'Measured case polishing, straight satin finishing of the links, strict preservation of the original angles.',
    },
    result: {
      fr: 'Éclat d\'origine restitué, géométrie du boîtier intacte, valeur de collection préservée.',
      en: 'Original shine restored, case geometry intact, collector value preserved.',
    },
  },
  {
    watch: 'Patek Philippe Calatrava',
    problem: {
      fr: 'Oxydation de la lunette et micro-rayures sur le verre, ternissement du métal précieux.',
      en: 'Bezel oxidation and micro-scratches on the crystal, tarnishing of the precious metal.',
    },
    intervention: {
      fr: 'Traitement de la lunette, poli miroir de la carrure, nettoyage complet des cornes.',
      en: 'Bezel treatment, mirror polishing of the case band, thorough cleaning of the lugs.',
    },
    result: {
      fr: 'Finition d\'atelier retrouvée, contraste satiné/poli net, pièce prête à être transmise.',
      en: 'Atelier finish restored, crisp satin/polish contrast, piece ready to be passed on.',
    },
  },
  {
    watch: 'Audemars Piguet Royal Oak',
    problem: {
      fr: 'Chocs et marques sur les flancs du boîtier, satinage « Tapisserie » émoussé.',
      en: 'Impacts and marks on the case sides, worn "Tapisserie" satin finish.',
    },
    intervention: {
      fr: 'Anglage des chanfreins, reprise du satinage, poli miroir sélectif des surfaces concernées.',
      en: 'Bevelling of the chamfers, satin re-finishing, selective mirror polishing of the affected surfaces.',
    },
    result: {
      fr: 'Signature esthétique de la Royal Oak respectée, alternance des finitions restaurée.',
      en: 'The Royal Oak\'s aesthetic signature respected, alternating finishes restored.',
    },
  },
]
