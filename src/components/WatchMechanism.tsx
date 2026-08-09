'use client'

import { useEffect, useRef } from 'react'

/**
 * WatchMechanism — « la création » VWION, à partir d'une VRAIE photo de mouvement.
 *
 * Cohérence spatiale (Apple) : le mécanisme se forme À PARTIR de pixels qui
 * convergent (assemblage ~2 s), devient une photo nette (temps de pose), puis
 * se disloque en pixels vers l'extérieur (big bang) — même chemin à l'aller
 * et au retour. La photo est masquée en disque (loupe d'horloger), recadrée
 * sur les rouages pour rester neutre (sans marque).
 */

// ── Timeline (ms) — synchro avec ClockIntro ──
export const ASSEMBLE = 2000
export const HOLD = 500
export const EXPLODE = 1700
export const TOTAL = ASSEMBLE + HOLD + EXPLODE

const SRC = '/eta-valjoux.jpg'

// Recadrage circulaire sur le mouvement ETA (fractions de l'image source)
// → remplit le disque de mécanisme, écarte le fond jaune.
const CROP = { x: 0.22, y: 0.2, s: 0.68 } // x, y (haut-gauche) et côté (× petit côté)

type Particle = {
  hx: number
  hy: number
  sx: number
  sy: number
  ang: number
  spd: number
  size: number
  color: string
  a: number
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
const eoc = (t: number) => 1 - Math.pow(1 - t, 3)
const eoq = (t: number) => 1 - Math.pow(1 - t, 4)

// ── Duotone OR sur OBSIDIAN — map la luminance vers la palette VWION ──
const SS = 520 // résolution de la version stylisée
const RAMP: [number, [number, number, number]][] = [
  [0.0, [6, 6, 6]],
  [0.3, [58, 42, 14]],
  [0.55, [139, 105, 20]],
  [0.78, [201, 168, 76]],
  [1.0, [242, 220, 140]],
]
function gold(l: number): [number, number, number] {
  for (let i = 1; i < RAMP.length; i++) {
    if (l <= RAMP[i][0]) {
      const [l0, c0] = RAMP[i - 1]
      const [l1, c1] = RAMP[i]
      const f = (l - l0) / (l1 - l0)
      return [
        c0[0] + (c1[0] - c0[0]) * f,
        c0[1] + (c1[1] - c0[1]) * f,
        c0[2] + (c1[2] - c0[2]) * f,
      ]
    }
  }
  return RAMP[RAMP.length - 1][1]
}

export default function WatchMechanism({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let startTs = 0
    let particles: Particle[] = []
    let D = 360 // diamètre d'affichage du disque
    let w = 0
    let h = 0
    let dpr = 1
    let ready = false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const img = new Image()
    let crop = { sx: 0, sy: 0, ss: 0 }
    let duo: HTMLCanvasElement | null = null // version stylisée or-monochrome

    function computeCrop() {
      const side = Math.min(img.width, img.height)
      const ss = Math.min(img.width, img.height) * CROP.s
      const sx = Math.min(img.width - ss, img.width * CROP.x)
      const sy = Math.min(img.height - ss, img.height * CROP.y)
      crop = { sx, sy, ss: Math.min(ss, side) }
    }

    // Génère une fois la version or-monochrome du mouvement recadré.
    function buildDuotone() {
      const c = document.createElement('canvas')
      c.width = SS
      c.height = SS
      const cc = c.getContext('2d')
      if (!cc) return
      cc.drawImage(img, crop.sx, crop.sy, crop.ss, crop.ss, 0, 0, SS, SS)
      const im = cc.getImageData(0, 0, SS, SS)
      const d = im.data
      for (let i = 0; i < d.length; i += 4) {
        const l = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255
        // léger gamma pour creuser les noirs → mécanisme qui émerge de l'obsidian
        const [r, g, b] = gold(Math.pow(l, 1.15))
        d[i] = r
        d[i + 1] = g
        d[i + 2] = b
      }
      cc.putImageData(im, 0, 0)
      duo = c
    }

    // Dessine la photo nette, masquée en disque + fin liseré or.
    function drawDisc(alpha: number) {
      const r = D / 2
      ctx!.save()
      ctx!.globalAlpha = alpha
      ctx!.beginPath()
      ctx!.arc(0, 0, r * 0.98, 0, Math.PI * 2)
      ctx!.clip()
      if (duo) ctx!.drawImage(duo, 0, 0, SS, SS, -r, -r, D, D)
      // vignette pour fondre les bords (et le résidu de fond) dans le noir
      const vg = ctx!.createRadialGradient(0, 0, r * 0.48, 0, 0, r)
      vg.addColorStop(0, 'rgba(8,8,8,0)')
      vg.addColorStop(0.82, 'rgba(8,8,8,0.55)')
      vg.addColorStop(1, 'rgba(8,8,8,0.95)')
      ctx!.fillStyle = vg
      ctx!.fillRect(-r, -r, D, D)
      ctx!.restore()
      // liseré or
      ctx!.save()
      ctx!.globalAlpha = alpha
      ctx!.strokeStyle = 'rgba(201,168,76,0.5)'
      ctx!.lineWidth = Math.max(1, D * 0.006)
      ctx!.beginPath()
      ctx!.arc(0, 0, r * 0.98, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.restore()
    }

    function drawGlow(intensity: number) {
      if (intensity <= 0) return
      const r = D
      const g = ctx!.createRadialGradient(0, 0, D * 0.15, 0, 0, r)
      g.addColorStop(0, `rgba(201,168,76,${0.14 * intensity})`)
      g.addColorStop(0.5, `rgba(201,168,76,${0.05 * intensity})`)
      g.addColorStop(1, 'rgba(201,168,76,0)')
      ctx!.fillStyle = g
      ctx!.fillRect(-r, -r, r * 2, r * 2)
    }

    function buildParticles() {
      const off = document.createElement('canvas')
      off.width = D
      off.height = D
      const oc = off.getContext('2d')
      if (!oc || !duo) return
      oc.drawImage(duo, 0, 0, SS, SS, 0, 0, D, D)
      const data = oc.getImageData(0, 0, D, D).data
      const r = D / 2

      let step = Math.max(5, Math.ceil(D / 52))
      const collect = (s: number) => {
        const out: Particle[] = []
        for (let y = 0; y < D; y += s) {
          for (let x = 0; x < D; x += s) {
            const hx = x - r
            const hy = y - r
            if (Math.hypot(hx, hy) > r * 0.98) continue
            const idx = (y * D + x) * 4
            const scAng = Math.random() * Math.PI * 2
            const scRad = D * (0.9 + Math.random() * 1.6)
            const eAng = Math.atan2(hy, hx) + (Math.random() - 0.5) * 0.5
            const dist = Math.hypot(hx, hy)
            out.push({
              hx,
              hy,
              sx: Math.cos(scAng) * scRad,
              sy: Math.sin(scAng) * scRad,
              ang: eAng,
              spd: (D * 0.6 + dist * 1.7) * (0.7 + Math.random() * 0.9),
              size: s,
              color: `${data[idx]},${data[idx + 1]},${data[idx + 2]}`,
              a: data[idx + 3] / 255,
            })
          }
        }
        return out
      }
      particles = collect(step)
      while (particles.length > 2800) {
        step += 1
        particles = collect(step)
      }
    }

    function frame(ts: number) {
      if (!ready) {
        raf = requestAnimationFrame(frame)
        return
      }
      if (!startTs) startTs = ts
      const t = ts - startTs
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, w, h)
      ctx!.translate(w / 2, h * 0.5)

      if (reduce) {
        drawGlow(1)
        drawDisc(1)
        raf = requestAnimationFrame(frame)
        return
      }

      if (t < ASSEMBLE) {
        // ── Assemblage : les pixels convergent vers la photo ──
        const a = t / ASSEMBLE
        const e = eoc(a)
        drawGlow(e * 0.7)
        const pAlpha = a < 0.82 ? 1 : 1 - (a - 0.82) / 0.18
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const x = p.sx + (p.hx - p.sx) * e
          const y = p.sy + (p.hy - p.sy) * e
          ctx!.globalAlpha = clamp01(p.a * pAlpha)
          ctx!.fillStyle = `rgb(${p.color})`
          ctx!.fillRect(x - p.size / 2, y - p.size / 2, p.size, p.size)
        }
        ctx!.globalAlpha = 1
        const imgAlpha = clamp01((a - 0.72) / 0.28)
        if (imgAlpha > 0) drawDisc(imgAlpha)
      } else if (t < ASSEMBLE + HOLD) {
        // ── Temps de pose : photo nette ──
        const hp = (t - ASSEMBLE) / HOLD
        drawGlow(0.7 + Math.sin(hp * Math.PI) * 0.4)
        drawDisc(1)
      } else {
        // ── Big bang : la photo se disloque en pixels ──
        const ep = (t - ASSEMBLE - HOLD) / EXPLODE
        if (ep < 1) {
          const imgAlpha = 1 - clamp01(ep / 0.12)
          if (imgAlpha > 0) drawDisc(imgAlpha)

          const flash = 1 - clamp01(ep / 0.26)
          if (flash > 0) {
            const fr = D * (0.4 + ep * 4)
            const fg = ctx!.createRadialGradient(0, 0, 0, 0, 0, fr)
            fg.addColorStop(0, `rgba(255,248,220,${0.85 * flash})`)
            fg.addColorStop(0.4, `rgba(232,201,106,${0.4 * flash})`)
            fg.addColorStop(1, 'rgba(201,168,76,0)')
            ctx!.fillStyle = fg
            ctx!.fillRect(-fr, -fr, fr * 2, fr * 2)
          }

          const travel = eoq(ep)
          const fade = 1 - Math.pow(ep, 1.7)
          const pIn = clamp01(ep / 0.1)
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i]
            const d = p.spd * travel
            const x = p.hx + Math.cos(p.ang) * d
            const y = p.hy + Math.sin(p.ang) * d
            const s = p.size * (1 + travel * 0.6)
            ctx!.globalAlpha = clamp01(p.a * fade * pIn)
            ctx!.fillStyle = `rgb(${p.color})`
            ctx!.fillRect(x - s / 2, y - s / 2, s, s)
          }
          ctx!.globalAlpha = 1
        }
      }

      raf = requestAnimationFrame(frame)
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      D = Math.max(260, Math.min(Math.min(w, h) * 0.36, 460))
      if (ready) buildParticles()
    }

    img.onload = () => {
      computeCrop()
      buildDuotone()
      resize()
      buildParticles()
      ready = true
    }
    img.src = SRC

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
