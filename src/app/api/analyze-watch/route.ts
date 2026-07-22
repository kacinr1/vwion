import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File | null
    const description = formData.get('description') as string | ''

    const messages: Anthropic.MessageParam[] = []

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const base64 = Buffer.from(bytes).toString('base64')
      const mediaType = (imageFile.type || 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'

      messages.push({
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: base64 },
          },
          {
            type: 'text',
            text: `Tu es un expert horloger suisse de luxe. Analyse cette montre et fournis une évaluation professionnelle en JSON.
Description fournie par le client: "${description}"

Retourne UNIQUEMENT un JSON valide avec cette structure exacte:
{
  "brand": "marque détectée ou supposée",
  "model": "modèle détecté ou supposé",
  "material": "acier / or / titane / autre",
  "condition": "excellent / bon / moyen / mauvais",
  "detected_issues": ["liste des défauts visibles"],
  "recommended_service": "lustration | remise_a_neuf | rebouchage_laser",
  "expert_note": "commentaire expert court (1-2 phrases)",
  "confidence": "high | medium | low"
}`,
          },
        ],
      })
    } else {
      messages.push({
        role: 'user',
        content: `Tu es un expert horloger suisse de luxe. Analyse la description suivante d'une montre et fournis une évaluation professionnelle en JSON.
Description: "${description}"

Retourne UNIQUEMENT un JSON valide avec cette structure exacte:
{
  "brand": "marque détectée ou supposée",
  "model": "modèle détecté ou supposé",
  "material": "acier / or / titane / autre",
  "condition": "excellent / bon / moyen / mauvais",
  "detected_issues": ["liste des défauts mentionnés"],
  "recommended_service": "lustration | remise_a_neuf | rebouchage_laser",
  "expert_note": "commentaire expert court (1-2 phrases)",
  "confidence": "high | medium | low"
}`,
      })
    }

    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 500,
      messages,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return Response.json({ error: 'Parsing failed' }, { status: 500 })
    }

    const result = JSON.parse(jsonMatch[0])
    return Response.json(result)
  } catch (err) {
    console.error('analyze-watch error:', err)
    return Response.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
