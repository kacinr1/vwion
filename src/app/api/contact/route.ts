import { Resend } from 'resend'
import { BUSINESS } from '@/lib/business'
import { ownerNotificationEmail, clientConfirmationEmail, type ContactData } from '@/lib/email-templates'

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

  const contact: ContactData = { name, email, phone, watch, message }

  try {
    // 4a. Notification interne — critique : son échec fait échouer la requête.
    const owner = ownerNotificationEmail(contact)
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email, // répondre à l'atelier = répondre au prospect
      subject: owner.subject,
      html: owner.html,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return Response.json({ error: "Échec de l'envoi email. Réessayez ou contactez-nous directement." }, { status: 500 })
    }

    // 4b. Accusé de réception au client — best-effort : ne bloque pas la réponse.
    // L'atelier a déjà été notifié ; un échec ici ne doit pas renvoyer une erreur au visiteur.
    try {
      const confirmation = clientConfirmationEmail(contact)
      const { error: confirmError } = await resend.emails.send({
        from,
        to: [email],
        replyTo: BUSINESS.email, // le client répond à l'adresse publique de l'atelier
        subject: confirmation.subject,
        html: confirmation.html,
      })
      if (confirmError) {
        console.error('[contact] Resend confirmation error (non bloquant):', confirmError)
      }
    } catch (confirmErr) {
      console.error('[contact] Confirmation inattendue (non bloquant):', confirmErr)
    }

    return Response.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return Response.json({ error: 'Erreur inattendue. Réessayez dans quelques instants.' }, { status: 500 })
  }
}
