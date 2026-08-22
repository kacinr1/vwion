// Templates d'emails transactionnels — « concierge horloger » : en-tête sombre centré
// (monogramme + filet ornemental + titre serif) → corps ivoire → bandeau de clôture sombre.
// Structure inspirée du DESIGN.md Superhuman, élevée à la charte de luxe VWION obsidian + or.
// DESIGN.md source : ~/.claude/awesome-design-md/design-md/superhuman
//
// Contraintes email : tables + styles inline uniquement, aucune police web, aucun JS.
// Toute donnée utilisateur passe par escapeHtml() avant injection (anti-injection HTML).

import { BUSINESS, BUSINESS_ADDRESS, SITE_URL } from '@/lib/business'

// ── Charte ─────────────────────────────────────────────────────────────────
const C = {
  obsidian: '#0A0A0A',
  obsidianSoft: '#121212',
  obsidianCard: '#171717',
  gold: '#C9A84C',
  goldLight: '#E8C96A',
  goldDark: '#8B6914',
  goldFaint: 'rgba(201,168,76,0.28)',
  cream: '#F6F4EF',
  creamMute: '#B9B6AC',
  canvas: '#FBFAF7', // ivoire chaud
  ink: '#211F1B',
  inkSoft: '#4A463F',
  inkMute: '#8A867C',
  hairline: '#E7E2D7',
}

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const SERIF = "Georgia, 'Times New Roman', 'Playfair Display', serif"
const GOLD_GRAD = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 48%, ${C.goldDark} 100%)`

// Échappe toute donnée utilisateur destinée au HTML de l'email.
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const nl2br = (s: string) => escapeHtml(s).replace(/\r?\n/g, '<br>')

// Filet ornemental centré : ligne — losange or — ligne.
function ornament(): string {
  return `
  <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>
    <td style="width:56px;border-top:1px solid ${C.goldFaint};font-size:0;line-height:0;">&nbsp;</td>
    <td style="padding:0 12px;color:${C.gold};font-size:9px;line-height:1;vertical-align:middle;">&#9670;</td>
    <td style="width:56px;border-top:1px solid ${C.goldFaint};font-size:0;line-height:0;">&nbsp;</td>
  </tr></table>`
}

// Bouton or à dégradé (fallback bgcolor pour clients sans gradient).
function goldButton(label: string, href: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td bgcolor="${C.gold}" style="border-radius:2px;background:${C.gold};background:${GOLD_GRAD};box-shadow:0 6px 22px rgba(201,168,76,0.28);">
      <a href="${href}" style="display:inline-block;padding:15px 30px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${C.obsidian};text-decoration:none;border-radius:2px;">${escapeHtml(label)}</a>
    </td>
  </tr></table>`
}

// ── Coquille commune ───────────────────────────────────────────────────────
function shell(opts: {
  preheader: string
  eyebrow: string
  title: string
  bodyHtml: string
  cta?: { label: string; href: string }
}): string {
  const { preheader, eyebrow, title, bodyHtml, cta } = opts

  return `<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:${C.obsidian};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.obsidian}" style="background:${C.obsidian};">
  <tr><td align="center" style="padding:36px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;border:1px solid #232323;border-radius:16px;overflow:hidden;">

      <!-- filet or supérieur (sceau) -->
      <tr><td height="3" style="height:3px;background:${GOLD_GRAD};font-size:0;line-height:0;">&nbsp;</td></tr>

      <!-- EN-TÊTE sombre, centré -->
      <tr><td bgcolor="${C.obsidianSoft}" align="center" style="background:${C.obsidianSoft};padding:44px 40px 38px;">
        <!-- monogramme -->
        <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="58" height="58" align="center" valign="middle" style="width:58px;height:58px;border:1px solid ${C.gold};border-radius:50%;font-family:${SERIF};font-size:26px;font-style:italic;color:${C.gold};">V</td>
        </tr></table>
        <div style="font-family:${SANS};font-size:14px;font-weight:700;letter-spacing:0.5em;color:${C.cream};text-transform:uppercase;margin-top:18px;padding-left:0.5em;">VWION</div>
        <div style="font-family:${SANS};font-size:8px;font-weight:600;letter-spacing:0.42em;color:${C.gold};text-transform:uppercase;margin-top:8px;padding-left:0.42em;">Manufacture · Genève</div>
        <div style="margin:22px 0 20px;">${ornament()}</div>
        <div style="font-family:${SANS};font-size:10px;font-weight:600;letter-spacing:0.34em;color:${C.gold};text-transform:uppercase;">${escapeHtml(eyebrow)}</div>
        <div style="font-family:${SERIF};font-size:33px;font-weight:400;line-height:1.12;color:${C.cream};margin-top:12px;">${escapeHtml(title)}</div>
      </td></tr>

      <!-- CORPS ivoire -->
      <tr><td bgcolor="${C.canvas}" style="background:${C.canvas};padding:38px 44px 40px;">
        ${bodyHtml}
        ${cta ? `<div style="margin-top:30px;">${goldButton(cta.label, cta.href)}</div>` : ''}
      </td></tr>

      <!-- FOOTER sombre, centré -->
      <tr><td bgcolor="${C.obsidian}" align="center" style="background:${C.obsidian};padding:30px 40px 34px;">
        <div style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:0.4em;color:${C.cream};text-transform:uppercase;padding-left:0.4em;">${escapeHtml(BUSINESS.name)}</div>
        <div style="font-family:${SANS};font-size:8px;font-weight:600;letter-spacing:0.32em;color:${C.inkMute};text-transform:uppercase;margin-top:9px;">Restauration · Polissage · Révision</div>
        <div style="margin:18px 0 16px;">${ornament()}</div>
        <div style="font-family:${SANS};font-size:12px;line-height:1.8;color:${C.creamMute};">
          ${escapeHtml(BUSINESS_ADDRESS)}<br>
          <a href="tel:${BUSINESS.phone}" style="color:${C.gold};text-decoration:none;">${escapeHtml(BUSINESS.phoneDisplay)}</a>
          &nbsp;·&nbsp; ${escapeHtml(BUSINESS.hours)}<br>
          <a href="${SITE_URL}" style="color:${C.gold};text-decoration:none;letter-spacing:0.08em;">vwion.ch</a>
        </div>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`
}

// Ligne d'un tableau de détails (label or discret + valeur).
function detailRow(label: string, valueHtml: string, opts?: { strong?: boolean; last?: boolean }): string {
  const weight = opts?.strong ? '700' : '400'
  const border = opts?.last ? 'none' : `1px solid ${C.hairline}`
  return `
    <tr>
      <td style="padding:13px 0;border-bottom:${border};font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.inkMute};width:132px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:13px 0;border-bottom:${border};font-family:${SANS};font-size:15px;font-weight:${weight};line-height:1.55;color:${C.ink};vertical-align:top;">${valueHtml}</td>
    </tr>`
}

export interface ContactData {
  name: string
  email: string
  phone?: string
  watch: string
  message: string
}

// ── 1. Notification interne (vers l'atelier) ───────────────────────────────
export function ownerNotificationEmail(d: ContactData): { subject: string; html: string } {
  const dateStr = new Date().toLocaleDateString('fr-CH', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  const rows =
    detailRow('Nom', escapeHtml(d.name)) +
    detailRow('Email', `<a href="mailto:${escapeHtml(d.email)}" style="color:${C.goldDark};text-decoration:none;border-bottom:1px solid ${C.hairline};">${escapeHtml(d.email)}</a>`) +
    (d.phone
      ? detailRow('Téléphone', `<a href="tel:${escapeHtml(d.phone)}" style="color:${C.goldDark};text-decoration:none;">${escapeHtml(d.phone)}</a>`)
      : '') +
    detailRow('Montre', escapeHtml(d.watch), { strong: true }) +
    detailRow('Message', nl2br(d.message), { last: true })

  // Carte encadrée avec accent or à gauche.
  const body = `
    <div style="font-family:${SERIF};font-size:17px;font-style:italic;line-height:1.5;color:${C.inkSoft};margin-bottom:26px;">
      Un client sollicite votre expertise.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.hairline};border-left:2px solid ${C.gold};border-radius:8px;">
      <tr><td style="padding:6px 22px 10px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
      </td></tr>
    </table>
    <div style="font-family:${SANS};font-size:11px;letter-spacing:0.1em;color:${C.inkMute};margin-top:18px;">Reçu le ${escapeHtml(dateStr)}</div>`

  return {
    subject: `[VWION] Demande de devis — ${d.watch}`,
    html: shell({
      preheader: `Nouvelle demande de ${d.name} · ${d.watch}`,
      eyebrow: 'Nouvelle demande',
      title: 'Demande de devis',
      bodyHtml: body,
      cta: { label: `Répondre à ${d.name.split(' ')[0]}`, href: `mailto:${d.email}` },
    }),
  }
}

// ── 2. Accusé de réception (vers le client) ────────────────────────────────
export function clientConfirmationEmail(d: ContactData): { subject: string; html: string } {
  const firstName = d.name.split(' ')[0]

  const body = `
    <div style="font-family:${SERIF};font-size:18px;line-height:1.6;color:${C.ink};">
      Votre demande concernant <span style="font-style:italic;">${escapeHtml(d.watch)}</span> nous est bien parvenue.
    </div>
    <div style="font-family:${SANS};font-size:15px;line-height:1.65;color:${C.inkSoft};margin-top:16px;">
      Un horloger de l'atelier l'examine personnellement et vous répondra <strong style="color:${C.ink};">sous 24&nbsp;heures ouvrées</strong> avec une première estimation.
    </div>

    <div style="margin:28px 0 10px;font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${C.inkMute};">Le détail de votre demande</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.hairline};border-left:2px solid ${C.gold};border-radius:8px;background:#FFFFFF;">
      <tr><td style="padding:18px 22px;">
        <div style="font-family:${SANS};font-size:15px;font-weight:700;color:${C.ink};">${escapeHtml(d.watch)}</div>
        <div style="font-family:${SANS};font-size:14px;line-height:1.65;color:${C.inkMute};margin-top:9px;">${nl2br(d.message)}</div>
      </td></tr>
    </table>

    <div style="font-family:${SANS};font-size:14px;line-height:1.7;color:${C.inkSoft};margin-top:24px;">
      Une question d'ici là ? Répondez simplement à cet email, ou appelez-nous au
      <a href="tel:${BUSINESS.phone}" style="color:${C.goldDark};text-decoration:none;font-weight:600;">${escapeHtml(BUSINESS.phoneDisplay)}</a>.
    </div>`

  return {
    subject: 'Votre demande a bien été reçue — VWION',
    html: shell({
      preheader: `Merci ${firstName}, votre demande pour ${d.watch} est bien reçue.`,
      eyebrow: 'Accusé de réception',
      title: `Merci, ${firstName}.`,
      bodyHtml: body,
      cta: { label: "Découvrir l'atelier", href: SITE_URL },
    }),
  }
}
