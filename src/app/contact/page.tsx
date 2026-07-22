'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'

export default function ContactPage() {
  const { t } = useLang()
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', watch: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('done')
  }

  const INFO = [
    { icon: '🇨🇭', label: t.contact.info.location },
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
              {status === 'done' ? (
                <div className="text-center py-12">
                  <div className="text-5xl text-gold mb-4">◈</div>
                  <h3 className="text-2xl font-serif text-cream mb-3">{t.contact.form.success}</h3>
                  <p className="text-cream-muted font-sans text-sm">Nous vous contacterons pour confirmer votre rendez-vous.</p>
                </div>
              ) : (
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
    </>
  )
}
