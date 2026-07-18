import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitQuickLead } from '../lib/data'
import { leadSourceWithUTM, track } from '../lib/analytics'
import { useI18n } from '../i18n'
import './semakan.css'

type Pathway = 'keusahawanan' | 'kepimpinan' | 'unsure'

/**
 * Stage 1 — the 60-second preliminary eligibility check (V2.5 §12).
 * Six questions + consent. The lead is saved immediately on submit;
 * the detailed 7-step profile becomes optional stage 2.
 */
export function QuickCheck({ leadSource = 'quick-check' }: { leadSource?: string }) {
  const { t } = useI18n()
  const q = t.quick
  const navigate = useNavigate()
  const [pathway, setPathway] = useState<Pathway | ''>('')
  const [years, setYears] = useState('')
  const [qual, setQual] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [prefLang, setPrefLang] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  const [started, setStarted] = useState(false)

  const markStarted = () => {
    if (!started) {
      setStarted(true)
      track('preliminary_check_started', { leadSource })
    }
  }

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    const v = t.form.validation
    if (!pathway) e.pathway = v.selectOne
    if (!years) e.years = v.selectOne
    if (!qual) e.qual = v.selectOne
    if (!name.trim()) e.name = v.required
    if (!/^\+?[0-9\s-]{8,15}$/.test(phone.trim())) e.phone = v.invalidPhone
    if (!prefLang) e.prefLang = v.selectOne
    if (!consent) e.consent = v.consentRequired
    return e
  }

  const submit = async () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setBusy(true)
    setFailed(false)
    const result = await submitQuickLead({
      pathway: pathway as Pathway,
      years_experience: years,
      highest_qualification: qual,
      full_name: name.trim(),
      phone: phone.trim(),
      preferred_language: prefLang,
      lead_source: leadSourceWithUTM(leadSource),
    })
    setBusy(false)
    if ('error' in result) {
      setFailed(true)
      return
    }
    track('preliminary_check_completed', { pathway })
    sessionStorage.setItem(
      'spm2d.lead',
      JSON.stringify({ reference: result.reference, pathway, name: name.trim(), phone: phone.trim() })
    )
    sessionStorage.setItem(
      'spm2d.lastSubmission',
      JSON.stringify({ reference: result.reference, pathway, date: new Date().toISOString(), stage: 'quick' })
    )
    navigate('/semakan/terima-kasih')
  }

  const field = (key: string) => `field${errors[key] ? ' field--error' : ''}`

  return (
    <div className="semakan quickcheck" onFocusCapture={markStarted}>
      <div className="semakan__head">
        <h2 className="semakan__title">{q.title}</h2>
        <p className="semakan__support">{q.subtitle}</p>
      </div>
      <div className="semakan__body">
        <fieldset className="semakan__fieldset">
          <legend className="semakan__question">{q.qPathway}</legend>
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
                  setErrors((cur) => {
                    const next = { ...cur }
                    delete next.pathway
                    return next
                  })
                  track('pathway_selected', { pathway: p, where: 'quick-check' })
                }}
              >
                {q.pathwayOptions[p]}
              </button>
            ))}
          </div>
          {errors.pathway && <p className="field-error">{errors.pathway}</p>}
        </fieldset>

        <div className="quickcheck__row">
          <div className={field('years')}>
            <label htmlFor="q-years">{q.qYears}</label>
            <select id="q-years" value={years} onChange={(e) => setYears(e.target.value)}>
              <option value="">—</option>
              {q.yearsOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.years && <p className="field-error">{errors.years}</p>}
          </div>
          <div className={field('qual')}>
            <label htmlFor="q-qual">{q.qQualification}</label>
            <select id="q-qual" value={qual} onChange={(e) => setQual(e.target.value)}>
              <option value="">—</option>
              {q.qualificationOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.qual && <p className="field-error">{errors.qual}</p>}
          </div>
        </div>

        <div className={field('name')}>
          <label htmlFor="q-name">{q.qName}</label>
          <input id="q-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        <div className="quickcheck__row">
          <div className={field('phone')}>
            <label htmlFor="q-phone">{q.qPhone}</label>
            <input
              id="q-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="012-345 6789"
            />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>
          <div className={field('prefLang')}>
            <label htmlFor="q-lang">{q.qLang}</label>
            <select id="q-lang" value={prefLang} onChange={(e) => setPrefLang(e.target.value)}>
              <option value="">—</option>
              {q.langOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.prefLang && <p className="field-error">{errors.prefLang}</p>}
          </div>
        </div>

        <label className="semakan__consentrow quickcheck__consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>{q.consent}</span>
        </label>
        {errors.consent && <p className="field-error">{errors.consent}</p>}
        {failed && <p className="semakan__errorbar" role="alert">{t.common.error}</p>}

        <button className="btn btn--gold quickcheck__submit" onClick={submit} disabled={busy} type="button">
          {busy ? q.submitting : q.submit}
        </button>
        <p className="quickcheck__promise">{t.urgency.responsePromise}</p>
      </div>
    </div>
  )
}
