// Études de cas avant/après (item 19) — restaurations réelles réalisées à l'atelier.
// Photos avant/après dans public/gallery/ (recadrées 4:5).
export type CaseStudy = {
  watch: string
  ref: { fr: string; en: string }
  avant: string
  apres: string
  problem: { fr: string; en: string }
  intervention: { fr: string; en: string }
  result: { fr: string; en: string }
}

export const caseStudies: CaseStudy[] = [
  {
    watch: 'Rolex Datejust',
    ref: { fr: 'Acier · cadran bleu', en: 'Steel · blue dial' },
    avant: '/gallery/rolex-datejust-avant.jpg',
    apres: '/gallery/rolex-datejust-apres.jpg',
    problem: {
      fr: 'Rayures profondes et marques d\'usure sur les cornes et la carrure après des années de port quotidien.',
      en: 'Deep scratches and wear marks on the lugs and case band after years of daily wear.',
    },
    intervention: {
      fr: 'Polissage raisonné de la carrure et des cornes, préservation stricte des angles et des arêtes d\'origine.',
      en: 'Measured polishing of the case band and lugs, strict preservation of the original angles and edges.',
    },
    result: {
      fr: 'Poli miroir restitué, géométrie du boîtier intacte, éclat d\'origine retrouvé.',
      en: 'Mirror polish restored, case geometry intact, original brilliance reclaimed.',
    },
  },
  {
    watch: 'Daniel Roth Chronographe',
    ref: { fr: 'Acier · cadran noir', en: 'Steel · black dial' },
    avant: '/gallery/daniel-roth-avant.jpg',
    apres: '/gallery/daniel-roth-apres.jpg',
    problem: {
      fr: 'Boîtier « double ellipse » marqué par les chocs et de nombreuses micro-rayures, arêtes ternies.',
      en: '"Double ellipse" case marked by impacts and numerous micro-scratches, dulled edges.',
    },
    intervention: {
      fr: 'Reprise complète du poli miroir sur le boîtier galbé, dans le respect des facettes et de la forme d\'origine.',
      en: 'Full mirror-polish restoration of the curved case, respecting the original facets and shape.',
    },
    result: {
      fr: 'Brillance profonde retrouvée, lignes nettes, la pièce retrouve tout son caractère.',
      en: 'Deep brilliance restored, crisp lines, the piece regains all its character.',
    },
  },
  {
    watch: 'Patek Philippe Aquanaut',
    ref: { fr: 'Or rose · calendrier annuel', en: 'Rose gold · annual calendar' },
    avant: '/gallery/patek-aquanaut-avant.jpg',
    apres: '/gallery/patek-aquanaut-apres.jpg',
    problem: {
      fr: 'Rayures et marques d\'usure sur l\'or rose de la lunette et de la carrure.',
      en: 'Scratches and wear marks on the rose gold of the bezel and case band.',
    },
    intervention: {
      fr: 'Polissage délicat de l\'or rose, préservation des surfaces satinées de la lunette, remise en écrin.',
      en: 'Delicate polishing of the rose gold, preservation of the bezel\'s satin surfaces, returned in its case.',
    },
    result: {
      fr: 'Or rose ravivé, contraste satiné / poli net, montre prête à être portée ou transmise.',
      en: 'Rose gold revived, crisp satin / polish contrast, watch ready to be worn or passed on.',
    },
  },
  {
    watch: 'Sauvetage d\'un mouvement',
    ref: { fr: 'Dérouillage · remise en état', en: 'Rust removal · overhaul' },
    avant: '/gallery/derouillage-avant.jpg',
    apres: '/gallery/derouillage-apres.jpg',
    problem: {
      fr: 'Mouvement fortement corrodé après infiltration d\'humidité : rouille sur le rouage et les ponts, marche compromise.',
      en: 'Movement heavily corroded after moisture ingress: rust on the gear train and bridges, running compromised.',
    },
    intervention: {
      fr: 'Démontage complet, dérouillage et nettoyage pièce par pièce, remplacement des composants irrécupérables, remontage et huilage.',
      en: 'Full disassembly, rust removal and part-by-part cleaning, replacement of unrecoverable parts, reassembly and oiling.',
    },
    result: {
      fr: 'Mécanisme sauvé et remis en marche, surfaces assainies — une pièce que l\'on croyait perdue retrouve vie.',
      en: 'Mechanism saved and running again, surfaces cleaned — a piece thought lost is brought back to life.',
    },
  },
]
