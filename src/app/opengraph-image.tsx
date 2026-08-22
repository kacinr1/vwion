import { ImageResponse } from 'next/og'

export const alt = 'VWION — Atelier Horloger, Genève'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Carte de partage (WhatsApp, réseaux) — emblème monogramme + logo VWION + tagline.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 38%, #16130d 0%, #0a0908 70%)',
          color: '#f4ede1',
          fontFamily: 'serif',
        }}
      >
        {/* Emblème : cercle or + monogramme V */}
        <div
          style={{
            display: 'flex',
            width: 150,
            height: 150,
            borderRadius: 75,
            border: '2px solid #c9a24b',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div style={{ display: 'flex', fontSize: 88, color: '#c9a24b', fontStyle: 'italic' }}>V</div>
        </div>

        <div style={{ display: 'flex', fontSize: 118, letterSpacing: 26, fontWeight: 300 }}>VWION</div>

        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 13,
            textTransform: 'uppercase',
            color: '#c9a24b',
            marginTop: 14,
          }}
        >
          Manufacture · Genève
        </div>

        <div
          style={{
            display: 'flex',
            width: 120,
            height: 3,
            background: 'linear-gradient(90deg, transparent, #c9a24b, transparent)',
            margin: '34px 0',
          }}
        />

        <div style={{ display: 'flex', fontSize: 28, color: '#a89f8f', letterSpacing: 2 }}>
          Polissage & Restauration de Montres de Luxe
        </div>
      </div>
    ),
    { ...size },
  )
}
