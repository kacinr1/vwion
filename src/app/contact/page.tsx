'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'
import { trackEvent } from '@/lib/analytics'
import { BUSINESS, BUSINESS_ADDRESS, MAPS_DIRECTIONS, MAPS_EMBED } from '@/lib/business'

export default function ContactPage() {
  const { t, lang } = useLang()
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', watch: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        // Succès : event GA4 generate_lead puis redirection page de conversion
        trackEvent('generate_lead', { location: 'contact_form', watch: form.watch })
        router.push('/merci')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error || t.contact.form.error)
        setStatus('error')
      }
    } catch {
      setErrorMsg(t.contact.form.error)
      setStatus('error')
    }
  }

  const INFO = [
    { icon: '📍', label: BUSINESS_ADDRESS },
    { icon: '◈', label: t.contact.info.hours },
    { icon: '◆', label: t.contact.info.response },
    { icon: '◇', label: t.contact.info.appointment },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 bg-obsidian relative overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gold/4 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.contact.badge}</span>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-cream mt-6 mb-6">{t.contact.title}</h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="text-cream-muted text-lg font-sans leading-relaxed max-w-2xl mx-auto">{t.contact.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-obsidian-soft">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="flex flex-col gap-5 mb-10">
              {INFO.map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-5 border border-gold/15 bg-obsidian-card">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-cream-muted font-sans text-sm leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Atelier visual */}
            <div className="border border-gold/20 bg-obsidian-card p-8 text-center">
              <div className="text-5xl text-gold mb-4">◈</div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans mb-2">VWION</p>
              <p className="text-cream-muted font-sans text-sm">Atelier Horloger d&apos;Excellence</p>
              <div className="w-8 h-px bg-gold mx-auto my-4" />
              <p className="text-cream-muted font-sans text-xs tracking-wider">Suisse · Since 2020</p>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-3">
            <div className="border border-gold/20 bg-obsidian-card p-8 md:p-10">
              {(
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-gold font-sans mb-2">{t.contact.form.name}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 font-sans text-sm"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-gold font-sans mb-2">{t.contact.form.email}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 font-sans text-sm"
                        placeholder="jean@exemple.ch"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-gold font-sans mb-2">{t.contact.form.phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 font-sans text-sm"
                        placeholder="+41 XX XXX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-gold font-sans mb-2">{t.contact.form.watch}</label>
                      <input
                        type="text"
                        required
                        value={form.watch}
                        onChange={(e) => setForm({ ...form, watch: e.target.value })}
                        className="w-full px-4 py-3 font-sans text-sm"
                        placeholder="Rolex Submariner 16610"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-gold font-sans mb-2">{t.contact.form.message}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 font-sans text-sm resize-none"
                      placeholder={t.contact.form.messagePlaceholder}
                    />
                  </div>

                  {status === 'error' && errorMsg && (
                    <p role="alert" className="text-red-400 font-sans text-sm px-1 py-2 border border-red-400/30 bg-red-400/5">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="py-4 px-8 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold bg-gold text-obsidian hover:bg-gold-light disabled:opacity-60 transition-all duration-300 mt-2"
                  >
                    {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Carte + itinéraire */}
      <section className="pb-24 px-6 bg-obsidian-soft">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans mb-2">
                {lang === 'fr' ? 'Nous situer' : 'Find us'}
              </p>
              <p className="text-cream-muted font-sans text-sm">{BUSINESS_ADDRESS}</p>
            </div>
            <a
              href={MAPS_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_directions')}
              className="px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-sans bg-gold text-obsidian font-semibold hover:bg-gold-light transition-colors whitespace-nowrap"
            >
              {lang === 'fr' ? 'Itinéraire' : 'Directions'}
            </a>
          </div>
          <div className="border border-gold/20 overflow-hidden">
            <iframe
              title={lang === 'fr' ? 'Carte de l\'atelier VWION à Genève' : 'Map of the VWION atelier in Geneva'}
              src={MAPS_EMBED}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, filter: 'grayscale(0.4) contrast(1.05)' }}
            />
          </div>
          <p className="text-cream/40 text-xs font-sans mt-3">
            {lang === 'fr'
              ? 'Atelier accessible sur rendez-vous. Adresse exacte confirmée lors de la prise de rendez-vous.'
              : 'Atelier accessible by appointment. Exact address confirmed when booking.'}
          </p>
        </div>
      </section>
    </>
  )
}
