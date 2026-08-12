import { ImageResponse } from 'next/og'

export const alt = 'VWION — Atelier Horloger, Genève'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// OG image de marque (item 9) — fond sombre, logo VWION, tagline.
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
          background: 'radial-gradient(circle at 50% 40%, #16130d 0%, #0a0908 70%)',
          color: '#f4ede1',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 130, letterSpacing: 28, fontWeight: 300 }}>
          VWION
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 14,
            textTransform: 'uppercase',
            color: '#c9a24b',
            marginTop: 12,
          }}
        >
          Atelier Horloger · Genève
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#a89f8f',
            marginTop: 48,
            letterSpacing: 2,
          }}
        >
          Polissage & Restauration de Montres de Luxe
        </div>
        <div
          style={{
            display: 'flex',
            width: 120,
            height: 3,
            background: 'linear-gradient(90deg, transparent, #c9a24b, transparent)',
            marginTop: 40,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
