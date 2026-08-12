// Source unique des informations entreprise (cohérence NAP absolue).
// ⚠️ Adresse et coordonnées fournies dans le brief — à confirmer avant mise en ligne.
export const SITE_URL = 'https://vwion.ch'

export const BUSINESS = {
  name: 'VWION — Atelier Horloger',
  street: 'Rue de la Horlogerie 15',
  postalCode: '1211',
  city: 'Genève',
  country: 'Suisse',
  email: 'contact@vwion.ch',
  phone: '+41221234567',
  phoneDisplay: '+41 22 123 45 67',
  geo: { lat: 46.2044, lng: 6.1432 }, // Genève centre — à préciser
  hours: 'Lundi – Vendredi, 9h – 18h',
}

// Adresse formatée pour affichage et lien Google Maps
export const BUSINESS_ADDRESS = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.country}`
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  BUSINESS_ADDRESS,
)}`
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  BUSINESS_ADDRESS,
)}&output=embed`
