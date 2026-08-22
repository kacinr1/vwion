// Estimation IA — analyse d'une photo/description de montre via l'API Claude.
// Appel en fetch direct (robuste en serverless) + modèle rapide (Sonnet 4.6).

export const maxDuration = 60

const MODEL = 'claude-sonnet-4-6'

function buildPrompt(hasImage: boolean, description: string): string {
  const intro = hasImage
    ? 'Tu es un expert horloger suisse de luxe. Analyse cette montre et fournis une évaluation professionnelle en JSON.'
    : "Tu es un expert horloger suisse de luxe. Analyse la description suivante d'une montre et fournis une évaluation professionnelle en JSON."
  const issues = hasImage ? 'liste des défauts visibles' : 'liste des défauts mentionnés'
  return `${intro}
Description fournie par le client: "${description}"

Retourne UNIQUEMENT un JSON valide (sans texte autour, sans balises markdown) avec cette structure exacte:
{
  "brand": "marque détectée ou supposée",
  "model": "modèle détecté ou supposé",
  "material": "acier / or / titane / autre",
  "condition": "excellent / bon / moyen / mauvais",
  "detected_issues": ["${issues}"],
  "recommended_service": "lustration | remise_a_neuf | rebouchage_laser",
  "expert_note": "commentaire expert court (1-2 phrases)",
  "repair_explanation": "explication concrète de la restauration recommandée pour CE modèle : ce qui sera réalisé à l'atelier, pourquoi, et le résultat attendu. 2 à 3 phrases, ton d'expert horloger rassurant, en français.",
  "confidence": "high | medium | low"
}`
}

export async function POST(request: Request) {
  // Garde : sans vraie clé, erreur claire (pas un 500 opaque).
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || apiKey.startsWith('your_') || apiKey.length < 20) {
    console.error('[analyze-watch] ANTHROPIC_API_KEY manquante ou invalide')
    return Response.json(
      { error: 'not_configured', message: "L'analyse IA n'est pas encore activée. Décrivez votre montre ci-dessous ou contactez-nous directement pour une estimation." },
      { status: 503 },
    )
  }

  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File | null
    const description = (formData.get('description') as string) || ''
    const hasImage = !!(imageFile && imageFile.size > 0)

    const content: unknown[] = []
    if (hasImage) {
      const bytes = await imageFile!.arrayBuffer()
      const base64 = Buffer.from(bytes).toString('base64')
      const mediaType = imageFile!.type || 'image/jpeg'
      content.push({ type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } })
    }
    content.push({ type: 'text', text: buildPrompt(hasImage, description) })

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 900, messages: [{ role: 'user', content }] }),
    })

    if (!res.ok) {
      const errTxt = await res.text()
      console.error('[analyze-watch] Anthropic', res.status, errTxt.slice(0, 300))
      return Response.json({ error: 'Analysis failed' }, { status: 502 })
    }

    const data = await res.json()
    const text = Array.isArray(data?.content) && data.content[0]?.type === 'text' ? data.content[0].text : ''
    const cleaned = String(text).replace(/```json\s*|\s*```/g, '')
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('[analyze-watch] JSON introuvable dans la réponse:', cleaned.slice(0, 200))
      return Response.json({ error: 'Parsing failed' }, { status: 500 })
    }

    const result = JSON.parse(jsonMatch[0])
    return Response.json(result)
  } catch (err) {
    console.error('analyze-watch error:', err)
    return Response.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
