// Source unique des informations entreprise (cohérence NAP absolue).
// ⚠️ Adresse et coordonnées fournies dans le brief — à confirmer avant mise en ligne.
export const SITE_URL = 'https://vwion.ch'

export const BUSINESS = {
  name: 'VWION — Atelier Horloger',
  city: 'Genève',
  country: 'Suisse',
  email: 'contact@vwion.ch',
  phone: '+41762229492',
  phoneDisplay: '076 222 94 92',
  hours: 'Lundi – Vendredi, 9h – 18h',
}

// Localisation de marque uniquement — pas d'adresse postale (atelier sur rendez-vous).
export const BUSINESS_ADDRESS = `${BUSINESS.city}, ${BUSINESS.country}`
