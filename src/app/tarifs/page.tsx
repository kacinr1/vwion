'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { useLang } from '@/context/LanguageContext'

type AIResult = {
  brand: string
  model: string
  material: string
  condition: string
  detected_issues: string[]
  recommended_service: string
  expert_note: string
  repair_explanation: string
  confidence: string
}

const SERVICE_PRICES = { lustration: 200, remise: 300, laser: 450 }
const RECO_PRICE: Record<string, number> = { lustration: 200, remise_a_neuf: 300, rebouchage_laser: 450 }
const RECO_LABEL: Record<string, string> = { lustration: 'Lustration simple', remise_a_neuf: 'Remise à neuf complète', rebouchage_laser: 'Rebouchage laser' }

export default function TarifsPage() {
  const { t, lang } = useLang()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState<AIResult | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (file: File) => {
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setAiResult(null)
    setSelectedService(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleImageChange(file)
  }

  const handleAnalyze = async () => {
    if (!imageFile && !description.trim()) {
      setError(t.pricing.noImage)
      return
    }
    setError(null)
    setAnalyzing(true)
    setAiResult(null)
    setShowModal(false)

    try {
      const fd = new FormData()
      if (imageFile) fd.append('image', imageFile)
      fd.append('description', description)

      const res = await fetch('/api/analyze-watch', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || "Erreur lors de l'analyse. Veuillez réessayer.")
        return
      }
      const result = data as AIResult
      setAiResult(result)
      setShowModal(true)

      const svcMap: Record<string, string> = {
        lustration: 'lustration',
        remise_a_neuf: 'remise',
        rebouchage_laser: 'laser',
      }
      if (result.recommended_service && svcMap[result.recommended_service]) {
        setSelectedService(svcMap[result.recommended_service])
      }
    } catch {
      setError("Erreur lors de l'analyse. Veuillez réessayer.")
    } finally {
      setAnalyzing(false)
    }
  }

  const total = selectedService ? SERVICE_PRICES[selectedService as keyof typeof SERVICE_PRICES] : 0

  const CONDITION_COLORS: Record<string, string> = {
    excellent: 'text-emerald-400',
    bon: 'text-gold',
    moyen: 'text-amber-500',
    mauvais: 'text-red-400',
  }

  const SERVICE_IDS = ['lustration', 'remise', 'laser']
  const SERVICE_DETAILS = [
    { id: 'lustration', label: t.pricing.defects[0].label, price: 200, desc: t.pricing.defects[0].desc },
    { id: 'remise', label: t.pricing.defects[1].label, price: 300, desc: t.pricing.defects[1].desc },
    { id: 'laser', label: t.pricing.defects[2].label, price: 450, desc: t.pricing.defects[2].desc },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 bg-obsidian relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gold/4 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.pricing.badge}</span>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-cream mt-6 mb-6">{t.pricing.title}</h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="text-cream-muted text-lg font-sans leading-relaxed max-w-2xl mx-auto">{t.pricing.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Main estimator */}
      <section className="py-16 px-6 bg-obsidian-soft">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Upload + Description */}
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-6">
              {/* Upload zone */}
              <div>
                <h2 className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-4">{t.pricing.uploadTitle}</h2>
                <div
                  onClick={() => inputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="relative border-2 border-dashed border-gold/20 bg-obsidian-card hover:border-gold/50 transition-all duration-300 cursor-pointer min-h-52 flex items-center justify-center overflow-hidden"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-52">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt={lang === 'fr' ? 'Aperçu de la montre à estimer pour un devis de restauration' : 'Preview of the watch to be estimated for a restoration quote'} className="w-full h-full object-contain p-4" />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); setAiResult(null) }}
                        className="absolute top-3 right-3 w-8 h-8 bg-obsidian border border-gold/30 text-gold hover:bg-gold hover:text-obsidian transition-all flex items-center justify-center text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-10">
                      <div className="text-4xl text-gold/30 mb-4">◈</div>
                      <p className="text-cream-muted font-sans text-sm mb-2">{t.pricing.uploadHint}</p>
                      <p className="text-cream-muted/50 font-sans text-xs">{t.pricing.uploadFormats}</p>
                    </div>
                  )}
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => { if (e.target.files?.[0]) handleImageChange(e.target.files[0]) }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-3">
                  {t.pricing.descriptionLabel}
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 font-sans text-sm resize-none"
                  placeholder={t.pricing.descriptionPlaceholder}
                />
              </div>

              {error && <p className="text-red-400 text-sm font-sans">{error}</p>}

              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="py-4 px-8 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold bg-gold text-obsidian hover:bg-gold-light disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-3"
              >
                {analyzing ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-4 h-4 border border-obsidian border-t-transparent rounded-full block"
                    />
                    {t.pricing.analyzing}
                  </>
                ) : t.pricing.analyzeBtn}
              </button>
            </div>
          </ScrollReveal>

          {/* Right: AI result + service selector + price */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="flex flex-col gap-6">

              {/* AI Analysis result */}
              <AnimatePresence>
                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border border-gold/30 bg-obsidian-card p-6"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-gold text-lg">◈</span>
                      <h3 className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{t.pricing.aiAnalysisTitle}</h3>
                      <span className={`ml-auto text-[9px] tracking-widest uppercase font-sans ${
                        aiResult.confidence === 'high' ? 'text-emerald-400' : aiResult.confidence === 'medium' ? 'text-gold' : 'text-cream-muted'
                      }`}>
                        {aiResult.confidence} confidence
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div>
                        <p className="text-[8px] tracking-widest uppercase text-cream-muted/60 font-sans mb-1">Marque</p>
                        <p className="text-cream font-serif">{aiResult.brand}</p>
                      </div>
                      <div>
                        <p className="text-[8px] tracking-widest uppercase text-cream-muted/60 font-sans mb-1">Modèle</p>
                        <p className="text-cream font-serif">{aiResult.model}</p>
                      </div>
                      <div>
                        <p className="text-[8px] tracking-widest uppercase text-cream-muted/60 font-sans mb-1">Matière</p>
                        <p className="text-cream-muted font-sans text-sm">{aiResult.material}</p>
                      </div>
                      <div>
                        <p className="text-[8px] tracking-widest uppercase text-cream-muted/60 font-sans mb-1">État</p>
                        <p className={`font-sans text-sm font-medium ${CONDITION_COLORS[aiResult.condition] || 'text-cream-muted'}`}>
                          {aiResult.condition}
                        </p>
                      </div>
                    </div>

                    {aiResult.detected_issues?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[8px] tracking-widest uppercase text-cream-muted/60 font-sans mb-2">Défauts détectés</p>
                        <div className="flex flex-wrap gap-2">
                          {aiResult.detected_issues.map((issue, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 border border-red-900/40 text-red-400/80 font-sans">
                              {issue}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiResult.expert_note && (
                      <div className="border-t border-gold/10 pt-4">
                        <p className="text-[8px] tracking-widest uppercase text-gold/60 font-sans mb-2">Note expert</p>
                        <p className="text-cream-muted font-sans text-sm italic leading-relaxed">{aiResult.expert_note}</p>
                      </div>
                    )}

                    {aiResult.repair_explanation && (
                      <div className="border-t border-gold/10 pt-4 mt-4">
                        <p className="text-[8px] tracking-widest uppercase text-gold/60 font-sans mb-2">La réparation</p>
                        <p className="text-cream-muted font-sans text-sm leading-relaxed">{aiResult.repair_explanation}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service selector */}
              <div>
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans mb-4">{t.pricing.selectDefects}</h3>
                <div className="flex flex-col gap-3">
                  {SERVICE_DETAILS.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => setSelectedService(selectedService === svc.id ? null : svc.id)}
                      className={`text-left p-5 border transition-all duration-300 ${
                        selectedService === svc.id
                          ? 'border-gold bg-gold/5'
                          : 'border-gold/15 bg-obsidian-card hover:border-gold/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 border flex items-center justify-center ${
                            selectedService === svc.id ? 'border-gold bg-gold' : 'border-gold/30'
                          }`}>
                            {selectedService === svc.id && <span className="text-obsidian text-xs">✓</span>}
                          </div>
                          <div>
                            <p className={`font-sans text-sm font-medium ${selectedService === svc.id ? 'text-gold' : 'text-cream'}`}>
                              {svc.label}
                            </p>
                            <p className="text-cream-muted text-xs font-sans mt-0.5">{svc.desc}</p>
                          </div>
                        </div>
                        <span className="text-gold font-serif text-lg ml-4 whitespace-nowrap">
                          {svc.price} CHF
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Total */}
              <AnimatePresence>
                {selectedService && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border border-gold bg-gold/5 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] tracking-[0.3em] uppercase text-gold/70 font-sans">{t.pricing.totalLabel}</p>
                        <p className="text-cream-muted text-xs font-sans mt-1">* Estimation indicative</p>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-serif text-gold">{total}</p>
                        <p className="text-gold/70 font-sans text-sm">{t.pricing.currency}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href="/contact"
                className="py-4 px-8 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold text-gold border border-gold/50 hover:bg-gold hover:text-obsidian transition-all duration-300 text-center"
              >
                {t.pricing.contactForQuote}
              </Link>

              {/* Disclaimer */}
              <p className="text-cream-muted/50 text-xs font-sans leading-relaxed">{t.pricing.note}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-20 px-6 bg-obsidian">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-cream">Grille tarifaire</h2>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: 'Essentiel', service: 'Lustration simple', price: 200, features: ['Polissage surfaces', 'Brillance métaux', 'Nettoyage complet', 'Vérification état'] },
              { tier: 'Prestige', service: 'Remise à neuf', price: 300, features: ['Tout inclus Essentiel', 'Révision boîtier', 'Traitement bracelet', 'Fond de boîtier', 'Garantie résultat'], highlight: true },
              { tier: 'Excellence', service: 'Rebouchage laser', price: 450, features: ['Tout inclus Prestige', 'Laser précision suisse', 'Rayures profondes', 'Chocs et impacts', 'Invisible après traitement'] },
            ].map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`p-8 border h-full flex flex-col ${
                  plan.highlight
                    ? 'border-gold bg-gold/5'
                    : 'border-gold/15 bg-obsidian-card'
                }`}>
                  {plan.highlight && (
                    <div className="text-center mb-4">
                      <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans border border-gold/50 px-3 py-1">Recommandé</span>
                    </div>
                  )}
                  <p className="text-[9px] tracking-[0.4em] uppercase text-gold/60 font-sans mb-2">{plan.tier}</p>
                  <h3 className="text-xl font-serif text-cream mb-4">{plan.service}</h3>
                  <div className="text-4xl font-serif text-gold mb-1">{plan.price}</div>
                  <div className="text-gold/60 font-sans text-sm mb-8">CHF</div>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-cream-muted font-sans">
                        <span className="text-gold text-xs">◆</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`py-3 text-center text-[10px] tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-gold text-obsidian hover:bg-gold-light'
                        : 'border border-gold/40 text-gold hover:bg-gold hover:text-obsidian'
                    }`}
                  >
                    Réserver
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      {/* Pop-up résultat d'estimation */}
      <AnimatePresence>
        {showModal && aiResult && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(false)}
          >
            <div className="absolute inset-0 bg-obsidian/85 backdrop-blur-xl" />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-obsidian-card border border-gold/30 p-8"
            >
              <button
                onClick={() => setShowModal(false)}
                aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-cream/60 hover:text-gold border border-gold/20 hover:border-gold/50 transition-colors"
              >
                ✕
              </button>

              <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans">{lang === 'fr' ? 'Estimation · Analyse IA' : 'Estimate · AI analysis'}</p>
              <h3 className="text-3xl font-serif text-cream mt-3 pr-8">
                {aiResult.brand} <span className="text-cream-muted">{aiResult.model}</span>
              </h3>
              <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent my-5" />

              {/* Le diagnostic */}
              <p className="text-[9px] tracking-[0.3em] uppercase text-gold/60 font-sans mb-2">{lang === 'fr' ? 'Le diagnostic' : 'The diagnosis'}</p>
              <p className="text-cream-muted text-sm font-sans mb-3">
                {lang === 'fr' ? 'État' : 'Condition'} : <span className={`font-medium ${CONDITION_COLORS[aiResult.condition] || 'text-cream'}`}>{aiResult.condition}</span>
              </p>
              {aiResult.detected_issues?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {aiResult.detected_issues.map((iss, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 border border-red-900/40 text-red-400/80 font-sans">{iss}</span>
                  ))}
                </div>
              )}

              {/* Les travaux */}
              <p className="text-[9px] tracking-[0.3em] uppercase text-gold/60 font-sans mb-2">{lang === 'fr' ? 'Les travaux à réaliser' : 'The work to be done'}</p>
              <p className="text-cream-muted text-sm font-sans leading-relaxed mb-6">{aiResult.repair_explanation || aiResult.expert_note}</p>

              {/* Prix approximatif */}
              <div className="border border-gold/30 bg-gold/5 p-5 flex items-center justify-between mb-6">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gold/70 font-sans">{lang === 'fr' ? 'Prix approximatif' : 'Approximate price'}</p>
                  <p className="text-cream-muted text-xs font-sans mt-1">{RECO_LABEL[aiResult.recommended_service] || (lang === 'fr' ? 'Prestation recommandée' : 'Recommended service')}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-serif text-gold">~{RECO_PRICE[aiResult.recommended_service] || 300}</p>
                  <p className="text-gold/70 font-sans text-sm">CHF</p>
                </div>
              </div>

              <Link
                href="/contact"
                className="block w-full py-4 text-center text-[11px] tracking-[0.2em] uppercase font-sans font-semibold bg-gold text-obsidian hover:bg-gold-light transition-all duration-300"
              >
                {lang === 'fr' ? 'Obtenir un devis précis' : 'Get a precise quote'}
              </Link>
              <p className="text-cream-muted/50 text-[11px] font-sans text-center mt-3">
                {lang === 'fr' ? 'Estimation indicative — devis final après examen physique.' : 'Indicative estimate — final quote after physical inspection.'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
