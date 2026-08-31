import { useState } from 'react'
import { whatsappLink } from '../config/programme'
import { submitPreliminaryLead } from '../lib/data'
import { leadSourceWithUTM, track } from '../lib/analytics'
import { ms } from '../i18n/ms'
import { useI18n } from '../i18n'
import './semakan.css'

type Pathway = 'keusahawanan' | 'kepimpinan' | 'unsure'
type Step = 'questions' | 'result' | 'success'
type Outcome = 'good' | 'review'

const LANG_LABEL: Record<string, string> = { ms: 'BM', en: 'EN', zh: '中文', iban: 'Iban' }

/**
 * V2+ Semakan funnel (60-second experience check):
 *   4 questions → instant preliminary result → name + WhatsApp → advisor.
 * Success is shown ONLY after Netlify confirms the submission; answers are
 * preserved on error (retry + WhatsApp), and double-submit is prevented.
 */
export function QuickCheck({ leadSource = 'quick-check' }: { leadSource?: string }) {
  const { t, lang } = useI18n()
  const s = t.semak2

  const [step, setStep] = useState<Step>('questions')
  const [started, setStarted] = useState(false)

  // Step 1 answers (indices are language-independent; canonical labels from `ms`)
  const [pathway, setPathway] = useState<Pathway | ''>('')
  const [yearsIdx, setYearsIdx] = useState<number>(-1)
  const [roleIdx, setRoleIdx] = useState<number>(-1)
  const [expIdxs, setExpIdxs] = useState<number[]>([])

  // Step 3 lead
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [consent, setConsent] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [reference, setReference] = useState('')

  const markStarted = () => {
    if (!started) {
      setStarted(true)
      track('semak_started', { leadSource })
    }
  }

  const outcome: Outcome = yearsIdx >= 1 && expIdxs.length >= 1 ? 'good' : 'review'

  const pathwayLabel =
    pathway === 'unsure' || pathway === '' ? s.pathwayUnsure : s.pathwayOptions[pathway]
  const focus =
    expIdxs.length > 0
      ? expIdxs.slice(0, 2).map((i) => s.experienceOptions[i]).join(', ')
      : roleIdx >= 0
        ? s.roleOptions[roleIdx]
        : s.focusFallback
  const resultBody = s.resultBody.replace('{focus}', focus).replace('{pathway}', pathwayLabel)

  const toggleExp = (i: number) =>
    setExpIdxs((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]))

  const v = t.form.validation

  const seeResult = () => {
    const e: Record<string, string> = {}
    if (!pathway) e.pathway = v.selectOne
    if (yearsIdx < 0) e.years = v.selectOne
    if (roleIdx < 0) e.role = v.selectOne
    if (expIdxs.length === 0) e.exp = v.selectOne
    setErrors(e)
    if (Object.keys(e).length) return
    track('semak_result_viewed', { outcome, pathway })
    setStep('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitLead = async () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = v.required
    if (!/^\+?[0-9\s-]{8,15}$/.test(whatsapp.trim())) e.whatsapp = v.invalidPhone
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = v.invalidEmail
    if (!consent) e.consent = v.consentRequired
    setErrors(e)
    if (Object.keys(e).length) return
    if (busy) return // prevent double submission
    setBusy(true)
    setSubmitError(false)

    const result = await submitPreliminaryLead({
      pathway: pathway as Pathway,
      years_experience: ms.semak2.yearsOptions[yearsIdx],
      role: ms.semak2.roleOptions[roleIdx],
      experiences: expIdxs.map((i) => ms.semak2.experienceOptions[i]),
      result: outcome === 'good' ? ms.semak2.resultGood : ms.semak2.resultReview,
      full_name: name.trim(),
      phone: whatsapp.trim(),
      email: email.trim(),
      org: org.trim(),
      preferred_language: LANG_LABEL[lang] ?? 'BM',
      lead_source: leadSourceWithUTM(leadSource),
      consent,
    })
    setBusy(false)

    if (!result.ok) {
      setSubmitError(true)
      track('semak_submit_error')
      return // keep all answers for retry
    }

    setReference(result.reference)
    // Hand the lead to the optional full-profile form (stage 2)
    sessionStorage.setItem(
      'spm2d.lead',
      JSON.stringify({ reference: result.reference, pathway, name: name.trim(), phone: whatsapp.trim() })
    )
    sessionStorage.setItem(
      'spm2d.lastSubmission',
      JSON.stringify({ reference: result.reference, pathway, date: new Date().toISOString(), stage: 'quick' })
    )
    track('semak_submit_success', { outcome, pathway })
    setStep('success')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const errorWaMessage = `Salam, saya ${name.trim() || '—'}. Saya ingin membuat Semakan Pengalaman SPM2Diploma dan mengetahui langkah seterusnya.`

  /* ── Step 3+ success ─────────────────────────────────────────── */
  if (step === 'success') {
    return (
      <div className="semakan semaksuccess">
        <div className="semaksuccess__badge" aria-hidden="true">✓</div>
        <h2 className="semaksuccess__title">{s.successTitle}</h2>
        <p className="semaksuccess__sub">{s.successBody.replace('{name}', name.trim())}</p>
        <div className="semaksuccess__ref">
          <span className="semaksuccess__reflabel">{s.refLabel}</span>
          <strong className="semaksuccess__refval">{reference}</strong>
        </div>
        <a href="/" className="btn btn--gold semaksuccess__wa">{s.backHome}</a>
        <p className="quickcheck__promise">{t.urgency.responsePromise}</p>
      </div>
    )
  }

  /* ── Step 2 result + Step 3 lead form ────────────────────────── */
  if (step === 'result') {
    return (
      <div className="semakan">
        <div className={`resultcard resultcard--${outcome}`}>
          <span className="resultcard__eyebrow">{s.hook}</span>
          <h2 className="resultcard__title">{outcome === 'good' ? s.resultGood : s.resultReview}</h2>
          <p className="resultcard__body">{resultBody}</p>
          <p className="resultcard__disclaimer">{s.disclaimer}</p>
        </div>

        <div className="semakan__body">
          <div className="leadintro">
            <h3 className="semakan__question" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>{s.leadHeading}</h3>
            <p className="leadintro__sub">{s.leadSub}</p>
          </div>

          <div className={`field${errors.name ? ' field--error' : ''}`}>
            <label htmlFor="s2-name">{s.qName}</label>
            <input id="s2-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
          <div className={`field${errors.whatsapp ? ' field--error' : ''}`}>
            <label htmlFor="s2-wa">{s.qWhatsapp}</label>
            <input
              id="s2-wa"
              type="tel"
              inputMode="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              autoComplete="tel"
              placeholder="012-345 6789"
            />
            {errors.whatsapp && <p className="field-error">{errors.whatsapp}</p>}
          </div>
          <div className={`field${errors.email ? ' field--error' : ''}`}>
            <label htmlFor="s2-email">
              {s.qEmail} <span className="semakan__hint">· {s.emailHint}</span>
            </label>
            <input
              id="s2-email"
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="nama@email.com"
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="s2-org">
              {s.qOrg} <span className="semakan__hint">· {s.orgHint}</span>
            </label>
            <input id="s2-org" value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" />
          </div>

          <label className="semakan__consentrow quickcheck__consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>{s.consent}</span>
          </label>
          {errors.consent && <p className="field-error">{errors.consent}</p>}

          {submitError && (
            <div className="semakerror" role="alert">
              <strong>{s.errorTitle}</strong>
              <p>{s.errorBody}</p>
              <div className="semakerror__actions">
                <button className="btn btn--navy btn--sm" onClick={submitLead} disabled={busy} type="button">
                  {s.retry}
                </button>
                <a
                  className="btn btn--outline btn--ghost-navy btn--sm"
                  href={whatsappLink(errorWaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_clicked', { where: 'semak-error' })}
                >
                  {s.errorWhatsapp}
                </a>
              </div>
            </div>
          )}

          <button className="btn btn--gold quickcheck__submit" onClick={submitLead} disabled={busy} type="button">
            {busy ? s.submitting : s.getAdvisor}
          </button>
          <button
            className="linklike semakan__editlink"
            type="button"
            onClick={() => { setSubmitError(false); setStep('questions') }}
          >
            ← {s.editAnswers}
          </button>
        </div>
      </div>
    )
  }

  /* ── Step 1 questions ────────────────────────────────────────── */
  return (
    <div className="semakan quickcheck" onFocusCapture={markStarted}>
      <div className="semakan__head">
        <h2 className="semakan__title">{s.title}</h2>
        <p className="semakan__support">{s.subtitle}</p>
        <p className="quickcheck__hook">{s.hook}</p>
      </div>
      <div className="semakan__body">
        <fieldset className="semakan__fieldset">
          <legend className="semakan__question">{s.qPathway}</legend>
          <div className="quickcheck__pills">
            {(['keusahawanan', 'kepimpinan', 'unsure'] as const).map((p) => (
              <button
                key={p}
                type="button"
                className={`quickcheck__pill${pathway === p ? ' quickcheck__pill--on' : ''}`}
                aria-pressed={pathway === p}
                onClick={() => {
                  markStarted()
                  setPathway(p)
                  setErrors((c) => { const n = { ...c }; delete n.pathway; return n })
                }}
              >
                {s.pathwayOptions[p]}
              </button>
            ))}
          </div>
          {errors.pathway && <p className="field-error">{errors.pathway}</p>}
        </fieldset>

        <fieldset className="semakan__fieldset">
          <legend className="semakan__question">{s.qYears}</legend>
          <div className="quickcheck__pills">
            {s.yearsOptions.map((o, i) => (
              <button
                key={o}
                type="button"
                className={`quickcheck__pill${yearsIdx === i ? ' quickcheck__pill--on' : ''}`}
                aria-pressed={yearsIdx === i}
                onClick={() => { markStarted(); setYearsIdx(i); setErrors((c) => { const n = { ...c }; delete n.years; return n }) }}
              >
                {o}
              </button>
            ))}
          </div>
          {errors.years && <p className="field-error">{errors.years}</p>}
        </fieldset>

        <fieldset className="semakan__fieldset">
          <legend className="semakan__question">{s.qRole}</legend>
          <div className="quickcheck__pills">
            {s.roleOptions.map((o, i) => (
              <button
                key={o}
                type="button"
                className={`quickcheck__pill${roleIdx === i ? ' quickcheck__pill--on' : ''}`}
                aria-pressed={roleIdx === i}
                onClick={() => { markStarted(); setRoleIdx(i); setErrors((c) => { const n = { ...c }; delete n.role; return n }) }}
              >
                {o}
              </button>
            ))}
          </div>
          {errors.role && <p className="field-error">{errors.role}</p>}
        </fieldset>

        <fieldset className="semakan__fieldset">
          <legend className="semakan__question">
            {s.qExperience} <span className="semakan__hint">· {s.experienceHint}</span>
          </legend>
          <div className="quickcheck__pills">
            {s.experienceOptions.map((o, i) => (
              <button
                key={o}
                type="button"
                className={`quickcheck__pill quickcheck__pill--multi${expIdxs.includes(i) ? ' quickcheck__pill--on' : ''}`}
                aria-pressed={expIdxs.includes(i)}
                onClick={() => { markStarted(); toggleExp(i); setErrors((c) => { const n = { ...c }; delete n.exp; return n }) }}
              >
                {o}
              </button>
            ))}
          </div>
          {errors.exp && <p className="field-error">{errors.exp}</p>}
        </fieldset>

        <button className="btn btn--gold quickcheck__submit" onClick={seeResult} type="button">
          {s.seeResult}
        </button>
      </div>
    </div>
  )
}
