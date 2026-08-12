# RAPPORT CHECKLIST — VWION.CH

Atelier horloger (Next.js 16 · App Router · i18n FR/EN par contexte client).
Date : 2026-08-12. Build de production : ✅ vert (16 routes). Vérifié visuellement via Playwright (desktop + mobile 375×667).

> ⚠️ **À confirmer avant mise en ligne** : l'adresse NAP `Rue de la Horlogerie 15, 1211 Genève`, le téléphone `+41 22 123 45 67` et les coordonnées GPS proviennent du brief. Le site affichait auparavant « lieu communiqué sur RDV » : j'ai appliqué le NAP fourni partout (footer, JSON-LD, mentions légales, carte). Remplacer par les vraies coordonnées enregistrées avant publication. Source unique : `src/lib/business.ts`.

| # | Item | Statut | Détail |
|---|------|--------|--------|
| 1 | Titres de pages uniques | ✅ | `layout.tsx` serveur par route (les pages sont `use client`). Titres < 60 c, mot-clé en tête. |
| 2 | Page de remerciement | ✅ | `/merci` (noindex), event GA4 `generate_lead`, redirection depuis le formulaire contact. |
| 3 | robots.txt + sitemap.xml | ✅ | `app/robots.ts` (disallow `/merci`, `/api`) + `app/sitemap.ts` dynamique. |
| 4 | Avis clients | ✅ | `data/testimonials.ts` (placeholders TODO) + section « Ils nous font confiance ». Pas de schema Review (faux avis interdits — voir note). |
| 5 | CTA sticky mobile | ✅ | `StickyCTA.tsx` < 768px, après 300px de scroll : « Prendre RDV » + icône téléphone. Vérifié à l'écran. |
| 6 | Meta descriptions | ✅ | Uniques par route, 150–160 c, avec CTA. |
| 7 | Fil d'Ariane | N/A | Architecture plate (pas de pages détail sous /services). À réévaluer si des pages profondes sont ajoutées. |
| 8 | Page confidentialité | ✅ | `/confidentialite` conforme nLPD 2023 + `/mentions-legales`. Liens footer. Bilingue. |
| 9 | Images de partage RS | ✅ | OG image dynamique `app/opengraph-image.tsx` (next/og, 1200×630) + balises OG/Twitter. |
| 10 | FAQ + schema | ✅ | `/faq` accordéon accessible (aria-expanded) + JSON-LD `FAQPage` (8 Q/R réelles). |
| 11 | 404 personnalisée | ✅ | `not-found.tsx` cohérent, liens Accueil/Services/Contact. |
| 12 | Carte + itinéraire | ✅ | Embed Google Maps iframe (sans clé) + bouton « Itinéraire ». Note : rendu réseau à revérifier en prod. |
| 13 | CTA above-the-fold | ✅ | Corrigé : hero mobile resserré (vidéo 46vh→32vh, marges réduites) → CTA visible sans scroll sur 375×667. |
| 14 | Alt text images | ✅ | Un seul `<img>` (aperçu estimateur) → alt descriptif localisé. Reste = SVG inline / vidéos décoratives. |
| 15 | Temps de réponse | ⚠️ | `next/font` (swap) OK, vidéos `preload="metadata"`. **Recommandation** : ajouter des `poster` aux 3 vidéos hero/craft et lancer Lighthouse en prod (non exécutable dans ce sandbox). |
| 16 | Google Analytics (GA4) | ✅ | `Analytics.tsx` : GA4 chargé **après consentement** (bandeau LPD accepter/refuser). Events `generate_lead`, `click_phone`, `click_devis`, `click_directions`. Env `NEXT_PUBLIC_GA_ID` dans `.env.example`. |
| 17 | Liens internes | ✅ | Footer 4 colonnes (nav + légal + NAP), maillage hero/services/tarifs/faq/contact. |
| 18 | Schema LocalBusiness | ✅ | JSON-LD `LocalBusiness` (additionalType JewelryStore) dans le layout : adresse, geo, horaires, téléphone, priceRange. |
| 19 | Études de cas | ✅ | `data/caseStudies.ts` (3 cas : montre/problème/intervention/résultat) + section « Réalisations ». Placeholders photos TODO. |

## Notes & recommandations
- **Avis / Review schema** : ne PAS activer `Review`/`AggregateRating` tant que les avis ne sont pas réels (pénalité Google). Remplacer `data/testimonials.ts` et `data/caseStudies.ts` par du vrai contenu.
- **GA_ID** : renseigner `NEXT_PUBLIC_GA_ID` en production (placeholder `G-XXXXXXXXXX`).
- **Formulaire contact** : l'envoi est simulé (`setTimeout` → `/merci`). Brancher l'envoi réel (API/email) — `TODO` en place.
- **Perf** : ajouter des posters vidéo + lancer Lighthouse mobile réel (cible Perf ≥ 90, LCP < 2.5s).
- **NAP** : confirmer l'adresse/téléphone réels avant publication (`src/lib/business.ts`).
