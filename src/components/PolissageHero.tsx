'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const SECTIONS = [
  {
    id: 'boitier',
    label: 'BOÎTIER',
    number: '01',
    title: "L'Art Invisible",
    accent: 'de la Perfection',
    desc: "La carrure, âme visible de la montre. Chaque surface polie à la main, chaque angle façonné avec une précision de 0,01 mm.",
    videoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-v-i-d-e-o-v1/media__6/-t-e-x-t_-t-o_-v-i-d-e-o-49c17992-75da-47bc-b5ec-9c8451b26e82.mp4?Expires=2100207169&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=dMuMKqZDcP7T1iE9~0-6RsGe6Me4nxobzMRm7HoZQpQQF3L2MVmRcaO0GFtkL8VM5P2fcbO6Nc6yz49f3aKEyToImow9MBCftLQlMXoBQYhvvw9QLaHngZQqnVjbesAegz72r2yyU0NqFy7fBbuUBqky~AwXj-7tUDGN~7zxq0Ko0tId7KFjPk1RhV1C-6-XQ9sgP82G0Y-eNzD4u8n8yR8Pp6rTp~e~ZZ11FitW5Ep3AKEB0yaqPlAn29FRTIydSRrs4kkwM8v1Bxx5e2F1Pui0i5Hk9q5iwc-VCKIVkt4-4n8GnR~VkwKEENjuAXwRyrszJUQuieKUgfQjHdfgog__',
    align: 'left' as const,
  },
  {
    id: 'fond',
    label: 'FOND',
    number: '02',
    title: 'Révélation',
    accent: 'Microscopique',
    desc: "Le fond de boîte, invisible au porteur mais obsession de l'artisan. Miroir parfait ou finition satinée — l'exigence est absolue.",
    videoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-v-i-d-e-o-v1/media__3/-t-e-x-t_-t-o_-v-i-d-e-o-fa6842cd-5114-46b3-8de5-b82e6b180c29.mp4?Expires=2100207154&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=SlA0U66aWBMyEuo60NLH-CNQcwx3c71e4aWO9h5Ib0bZAkjbyZ0HgiHnKBTqIyH9bLWUE6bkw5eYx71cFh~HIoocTLsEtk2ymhW1BX6zKddePlMBB4Y3yFux8vGpccmfy1guQ8sxPKIXw366f2ajBlIUPEumsgck3tGJZU0b1SmPtr4DSshhPp2qYH6vmm2h~hQlsPO3gXCnuulmIGZKPgpoR75XZszq7tN1LJtraTqmo58t2mIYKfGNbZMYsgqoXDg1JyyMNo~wFJgOjq8n48qgdwVLzoJ50bwjty4T9DIsncrtQupdNZkSPpFeTOLS2vXlzQ5RuoS6lh~yUJNK9Q__',
    align: 'right' as const,
  },
  {
    id: 'carrure',
    label: 'CARRURE',
    number: '03',
    title: 'Lumière',
    accent: 'Pure',
    desc: 'Les flancs de la carrure captent et réfléchissent la lumière comme nul autre élément. Une surface qui respire, qui vit.',
    videoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-v-i-d-e-o-v1/media__1/-t-e-x-t_-t-o_-v-i-d-e-o-865fe1bc-e5d0-4a9d-aa79-5eb52e8bdc04.mp4?Expires=2100207138&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=EBvBFvB2JYnrYBZUNMgJzdHxYcVx0sfvKYTHRaHaPbOeoL-RZgsdXgL0KRSrSGnVxeehCjNyDMpBZuR~~qubFnB3YlVD8SgQheR5UQHUnVecoimcOIJfOxhE7O45LUWxsnkXmooHGGerctRX06pRpzuURYkVSI1JywmAa-iC5a6hiqZdbIdr4sH5mTnvVmJ0MFp~3e0mpSVJWWyQtGWFHI3OezeqC3ho~VFsYxk9KyErVQOpDFfNbHO-LzYgnUoGgydqINpsnjNM12SGne8NP91yA4rpecj59QyQyqyo4H3q1EzPugwmtoXsVOok9Jlz-pRZCxc9W10AUtUmEhhqbg__',
    align: 'left' as const,
  },
  {
    id: 'bracelet',
    label: 'BRACELET',
    number: '04',
    title: 'Du Satin',
    accent: "à l'Absolu",
    desc: 'Maille par maille, le bracelet passe du brut au miroir. Cinq cents coups de polish pour une chaîne parfaite.',
    videoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-v-i-d-e-o-v1/media__9/-t-e-x-t_-t-o_-v-i-d-e-o-0711f2be-ee51-4dd6-9139-1450e148fdac.mp4?Expires=2100207231&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=xBl8~ID7ajrJAFccny6SfyBHAioV1wP6JdyfXzl4MpdwggYa6mCBDa3t1SfMajKutVdLj7R~VDiEcsT6cFqYp0ckmWS8RVC6mgNVCTAgusPA49~6b9g6ywtr-EXmgekI3mURABrkBuVkVax87Qv6hL9w5vYd0b2rUquPepNjNW3uShfqQLHpNF8R~L16qXYmNch9m9e02VO4roomc75k2RwngSCidiwXZ-UiiSgnX4co6pPx3SezymsEg5LXk6yVSuNj8jx3bmZkgBzVPB3JjjoJpARzBCVH1fA4UZwlMLPA8YpxbICidOjxayPbyW61itPwz1W0elQIRBwWDYbJFw__',
    align: 'right' as const,
  },
]

type Section = (typeof SECTIONS)[0]

const MONTSERRAT: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif)',
  fontWeight: 100,
  letterSpacing: '-0.02em',
}

const GOLD_GRADIENT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #E8C96A 0%, #C9A84C 50%, #8B6914 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function VideoSection({ section }: { section: Section }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const videoY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.1, 0.9], ['24px', '-24px'])
  const isRight = section.align === 'right'

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax video */}
      <motion.div
        className="absolute w-full h-[124%] -top-[12%]"
        style={{ y: videoY, willChange: 'transform' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={section.videoUrl}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/15 to-obsidian/85" />
      <div
        className="absolute inset-0"
        style={{
          background: isRight
            ? 'linear-gradient(to left, rgba(10,10,10,0.75) 0%, transparent 60%)'
            : 'linear-gradient(to right, rgba(10,10,10,0.75) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY, willChange: 'transform, opacity' }}
        className={`relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 ${
          isRight ? 'items-end text-right' : 'items-start text-left'
        }`}
      >
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div className={`flex items-center gap-3 mb-8 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[9px] tracking-[0.5em] text-gold/50 font-sans uppercase">{section.number}</span>
            <span className="w-8 h-px bg-gold/30" />
            <span className="text-[8px] tracking-[0.45em] text-gold/50 font-sans uppercase">{section.label}</span>
          </div>

          {/* Title */}
          <h2 style={{ ...MONTSERRAT, fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1 }} className="text-cream mb-1">
            {section.title}
          </h2>
          <h2
            style={{
              ...MONTSERRAT,
              ...GOLD_GRADIENT,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 1,
              marginBottom: '2rem',
            }}
          >
            {section.accent}
          </h2>

          <div className={`flex items-center gap-3 mb-5 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <div className="w-10 h-px bg-gold/40" />
          </div>

          <p className="text-cream-muted font-sans text-sm leading-[1.9] tracking-wide max-w-xs">
            {section.desc}
          </p>
        </div>
      </motion.div>

      {/* Subtle light pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0, 0.025, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse at 50% 50%, #C9A84C 0%, transparent 65%)' }}
      />
    </section>
  )
}

export default function PolissageHero() {
  return (
    <>
      {/* ── OUVERTURE ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-obsidian">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
          />
        </div>

        {/* Micro gold grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 text-center px-6 select-none">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex items-center justify-center gap-5 mb-12"
          >
            <span className="w-14 h-px bg-gold/35" />
            <span className="text-[8px] tracking-[0.65em] uppercase text-gold/60 font-sans">VWION · Atelier Horloger · Suisse</span>
            <span className="w-14 h-px bg-gold/35" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...MONTSERRAT, fontSize: 'clamp(3.5rem, 11vw, 10rem)', lineHeight: 0.95 }}
            className="text-cream mb-5"
          >
            Le Polissage
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-[10px] tracking-[0.5em] uppercase font-sans mb-14"
            style={{ color: '#C9A84C', opacity: 0.75 }}
          >
            Signature de l&apos;Excellence Horlogère
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-cream-muted font-sans text-sm leading-loose max-w-sm mx-auto"
          >
            15 années de maîtrise.&ensp;Chaque coup.&ensp;Chaque reflet.&ensp;Chaque détail.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[7px] tracking-[0.55em] uppercase text-gold/35 font-sans">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-gold/35 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 4 SECTIONS VIDÉO ── */}
      {SECTIONS.map((s) => (
        <VideoSection key={s.id} section={s} />
      ))}

      {/* ── CTA FINALE ── */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center bg-obsidian">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 65%)' }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <span className="text-[8px] tracking-[0.55em] uppercase text-gold/55 font-sans">
              L&apos;Excellence Suisse · Sur Rendez-vous
            </span>

            <h2
              style={{ ...MONTSERRAT, fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 1.05 }}
              className="text-cream mt-10 mb-4"
            >
              Découvrez Notre
            </h2>
            <h2
              style={{
                ...MONTSERRAT,
                ...GOLD_GRADIENT,
                fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                lineHeight: 1.05,
                marginBottom: '3rem',
              }}
            >
              Expertise
            </h2>

            <p className="text-cream-muted font-sans text-sm leading-[1.9] mb-12 max-w-sm mx-auto">
              Chaque montre mérite une renaissance. Confiez-nous votre pièce pour une restauration d&apos;exception.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-10 py-4 text-[10px] tracking-[0.28em] uppercase font-sans font-semibold text-obsidian bg-gold hover:bg-gold-light transition-all duration-300"
                style={{ boxShadow: '0 8px 40px rgba(201,168,76,0.2)' }}
              >
                Prendre Rendez-vous
              </Link>
              <Link
                href="/services"
                className="px-10 py-4 text-[10px] tracking-[0.28em] uppercase font-sans font-semibold text-gold border border-gold/40 hover:border-gold hover:bg-gold/5 transition-all duration-300"
              >
                Nos Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
