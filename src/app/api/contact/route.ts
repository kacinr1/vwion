import { Resend } from 'resend'
import { BUSINESS } from '@/lib/business'

// Validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, 1000)
}

export async function POST(request: Request) {
  // 1. Lecture du body JSON
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  // 2. Validation des champs (avant tout appel externe)
  const name = sanitize(body.name)
  const email = sanitize(body.email)
  const phone = sanitize(body.phone)
  const watch = sanitize(body.watch)
  const message = sanitize(body.message)

  if (!name || name.length < 2) {
    return Response.json({ error: 'Nom requis (2 caractères minimum)' }, { status: 400 })
  }
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'Adresse email invalide' }, { status: 400 })
  }
  if (!watch || watch.length < 2) {
    return Response.json({ error: 'Marque et modèle de la montre requis' }, { status: 400 })
  }
  if (!message || message.length < 5) {
    return Response.json({ error: 'Message requis (5 caractères minimum)' }, { status: 400 })
  }

  // 3. Vérification clé Resend — gestion propre de l'absence
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY manquante — envoi email impossible')
    return Response.json(
      { error: 'Service email non configuré. Contactez-nous directement à ' + BUSINESS.email },
      { status: 500 }
    )
  }

  // 4. Envoi via Resend
  const resend = new Resend(apiKey)

  // Expéditeur : sous-domaine vérifié dans Resend (protège la réputation du domaine racine).
  // Destinataire : boîte de réception des leads, surchargeable par env (défaut Gmail).
  // BUSINESS.email (contact@vwion.ch) reste l'adresse publique affichée / de réponse.
  const from = process.env.CONTACT_FROM || 'VWION Contact <noreply@send.vwion.ch>'
  const to = process.env.CONTACT_INBOX || 'kacinr1@gmail.com'

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[VWION] Demande de devis — ${watch}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="border-bottom: 2px solid #c9a84c; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 20px; letter-spacing: 0.1em; text-transform: uppercase;">
              VWION — Nouvelle demande de contact
            </h2>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #666; width: 160px; vertical-align: top; text-transform: uppercase; letter-spacing: 0.05em;">Nom</td>
              <td style="padding: 8px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #666; vertical-align: top; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #666; vertical-align: top; text-transform: uppercase; letter-spacing: 0.05em;">Téléphone</td>
              <td style="padding: 8px 0; font-size: 14px;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #666; vertical-align: top; text-transform: uppercase; letter-spacing: 0.05em;">Montre</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${watch}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #666; vertical-align: top; text-transform: uppercase; letter-spacing: 0.05em;">Message</td>
              <td style="padding: 8px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
            Formulaire contact VWION · ${new Date().toLocaleDateString('fr-CH', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return Response.json({ error: "Échec de l'envoi email. Réessayez ou contactez-nous directement." }, { status: 500 })
    }

    return Response.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return Response.json({ error: 'Erreur inattendue. Réessayez dans quelques instants.' }, { status: 500 })
  }
}
