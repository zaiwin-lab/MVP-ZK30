import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateReference, submitApplication } from '../lib/data'
import type { NewApplication } from '../lib/types'
import { useI18n } from '../i18n'
import './semakan.css'

type Pathway = 'keusahawanan' | 'kepimpinan' | 'unsure'

interface FormState {
  pathway: Pathway | ''
  fullName: string
  ageRange: string
  location: string
  phone: string
  email: string
  qualification: string
  bizName: string
  industry: string
  years: string
  role: string
  teamSize: string
  products: string
  responsibilities: string
  website: string
  orgType: string
  evidence: string[]
  commitment: string
  financial: string
  motivation: string
  motivationOther: string
  consentReview: boolean
  consentContact: boolean
  consentStorage: boolean
  consentPrivacy: boolean
}

const INITIAL: FormState = {
  pathway: '',
  fullName: '',
  ageRange: '',
  location: '',
  phone: '',
  email: '',
  qualification: '',
  bizName: '',
  industry: '',
  years: '',
  role: '',
  teamSize: '',
  products: '',
  responsibilities: '',
  website: '',
  orgType: '',
  evidence: [],
  commitment: '',
  financial: '',
  motivation: '',
  motivationOther: '',
  consentReview: false,
  consentContact: false,
  consentStorage: false,
  consentPrivacy: false,
}

const TOTAL_STEPS = 7

export function SemakanForm({ leadSource = 'website' }: { leadSource?: string }) {
  const { t } = useI18n()
  const f = t.form
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [state, setState] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }))
    setErrors((e) => {
      if (!e[key]) return e
      const next = { ...e }
      delete next[key]
      return next
    })
  }

  const isBusiness = state.pathway === 'keusahawanan'
  const isLeadership = state.pathway === 'kepimpinan'

  const validators: Record<number, () => Record<string, string>> = useMemo(
    () => ({
      1: () => (state.pathway ? {} : ({ pathway: f.validation.selectOne } as Record<string, string>)),
      2: () => {
        const e: Record<string, string> = {}
        if (!state.fullName.trim()) e.fullName = f.validation.required
        if (!state.ageRange) e.ageRange = f.validation.selectOne
        if (!state.location.trim()) e.location = f.validation.required
        if (!/^\+?[0-9\s-]{8,15}$/.test(state.phone.trim())) e.phone = f.validation.invalidPhone
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) e.email = f.validation.invalidEmail
        if (!state.qualification) e.qualification = f.validation.selectOne
        return e
      },
      3: () => {
        const e: Record<string, string> = {}
        if (!state.bizName.trim()) e.bizName = f.validation.required
        if (isBusiness && !state.industry.trim()) e.industry = f.validation.required
        if (isLeadership && !state.orgType) e.orgType = f.validation.selectOne
        if (!state.years) e.years = f.validation.selectOne
        if (!state.role.trim()) e.role = f.validation.required
        if (!state.responsibilities.trim()) e.responsibilities = f.validation.required
        return e
      },
      4: () => ({}),
      5: () => (state.commitment ? {} : ({ commitment: f.validation.selectOne } as Record<string, string>)),
      6: () => (state.financial ? {} : ({ financial: f.validation.selectOne } as Record<string, string>)),
      7: () => {
        const e: Record<string, string> = {}
        if (!state.motivation) e.motivation = f.validation.selectOne
        if (!state.consentReview || !state.consentContact || !state.consentStorage || !state.consentPrivacy)
          e.consent = f.validation.consentRequired
        return e
      },
    }),
    [state, f, isBusiness, isLeadership]
  )

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const goNext = () => {
    const e = validators[step]()
    setErrors(e)
    if (Object.keys(e).length) return
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
    scrollTop()
  }

  const goBack = () => {
    setErrors({})
    setStep((s) => Math.max(s - 1, 1))
    scrollTop()
  }

  const handleSubmit = async () => {
    const e = validators[7]()
    setErrors(e)
    if (Object.keys(e).length) return
    setSubmitting(true)
    setSubmitError(false)
    const reference = generateReference()
    const app: NewApplication = {
      application_reference: reference,
      full_name: state.fullName.trim(),
      age_range: state.ageRange,
      location: state.location.trim(),
      phone: state.phone.trim(),
      email: state.email.trim(),
      highest_qualification: state.qualification,
      selected_pathway: state.pathway as Pathway,
      business_or_organisation_name: state.bizName.trim(),
      organisation_type: isLeadership ? state.orgType : null,
      current_position: state.role.trim(),
      industry: isBusiness ? state.industry.trim() : null,
      years_experience: state.years,
      team_size: state.teamSize.trim(),
      responsibilities: state.responsibilities.trim(),
      website_or_social_link: state.website.trim() || null,
      evidence_readiness: state.evidence,
      commitment_level: state.commitment,
      financial_readiness: state.financial,
      motivation: state.motivation,
      additional_information: state.motivationOther.trim() || null,
      lead_source: leadSource,
      consent: true,
      consent_timestamp: new Date().toISOString(),
    }
    const result = await submitApplication(app)
    setSubmitting(false)
    if ('error' in result) {
      setSubmitError(true)
      return
    }
    sessionStorage.setItem(
      'spm2d.lastSubmission',
      JSON.stringify({ reference, pathway: state.pathway, date: new Date().toISOString() })
    )
    navigate('/semakan/terima-kasih')
  }

  const exp = f.steps.experience
  const stepTitle = [
    f.steps.pathway.title,
    f.steps.personal.title,
    isBusiness ? exp.titleBusiness : isLeadership ? exp.titleLeadership : exp.titleUnsure,
    f.steps.evidence.title,
    f.steps.commitment.title,
    f.steps.financial.title,
    f.steps.motivation.title,
  ][step - 1]

  return (
    <div className="semakan" ref={topRef}>
      <div className="semakan__head">
        <h2 className="semakan__title">{f.title}</h2>
        <p className="semakan__support">{f.support}</p>
        <p className="semakan__time">{f.estTime}</p>
      </div>

      {/* Progress */}
      <div className="semakan__progress" role="group" aria-label={`${f.stepLabel} ${step} ${f.of} ${TOTAL_STEPS}`}>
        <div className="semakan__progresslabel">
          {f.stepLabel} {step} {f.of} {TOTAL_STEPS} — <strong>{stepTitle}</strong>
        </div>
        <div className="semakan__bar">
          <div className="semakan__fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
      </div>

      <div className="semakan__body">
        {step === 1 && (
          <fieldset className="semakan__fieldset">
            <legend className="visually-hidden">{f.steps.pathway.title}</legend>
            {(['keusahawanan', 'kepimpinan', 'unsure'] as const).map((p) => (
              <label key={p} className={`choice${state.pathway === p ? ' choice--selected' : ''}`}>
                <input
                  type="radio"
                  name="pathway"
                  checked={state.pathway === p}
                  onChange={() => set('pathway', p)}
                />
                <span>{f.steps.pathway.options[p]}</span>
              </label>
            ))}
            {errors.pathway && <p className="field-error">{errors.pathway}</p>}
          </fieldset>
        )}

        {step === 2 && (
          <div>
            <div className={`field${errors.fullName ? ' field--error' : ''}`}>
              <label htmlFor="s-name">{f.steps.personal.fullName}</label>
              <input id="s-name" value={state.fullName} onChange={(e) => set('fullName', e.target.value)} autoComplete="name" />
              {errors.fullName && <p className="field-error">{errors.fullName}</p>}
            </div>
            <div className={`field${errors.ageRange ? ' field--error' : ''}`}>
              <label htmlFor="s-age">{f.steps.personal.ageRange}</label>
              <select id="s-age" value={state.ageRange} onChange={(e) => set('ageRange', e.target.value)}>
                <option value="">—</option>
                {f.steps.personal.ageOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.ageRange && <p className="field-error">{errors.ageRange}</p>}
            </div>
            <div className={`field${errors.location ? ' field--error' : ''}`}>
              <label htmlFor="s-loc">{f.steps.personal.location}</label>
              <input id="s-loc" value={state.location} onChange={(e) => set('location', e.target.value)} />
              {errors.location && <p className="field-error">{errors.location}</p>}
            </div>
            <div className={`field${errors.phone ? ' field--error' : ''}`}>
              <label htmlFor="s-phone">{f.steps.personal.phone}</label>
              <input id="s-phone" type="tel" inputMode="tel" value={state.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" placeholder="012-345 6789" />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>
            <div className={`field${errors.email ? ' field--error' : ''}`}>
              <label htmlFor="s-email">{f.steps.personal.email}</label>
              <input id="s-email" type="email" inputMode="email" value={state.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div className={`field${errors.qualification ? ' field--error' : ''}`}>
              <label htmlFor="s-qual">{f.steps.personal.qualification}</label>
              <select id="s-qual" value={state.qualification} onChange={(e) => set('qualification', e.target.value)}>
                <option value="">—</option>
                {f.steps.personal.qualificationOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.qualification && <p className="field-error">{errors.qualification}</p>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            {!isBusiness && !isLeadership && <p className="semakan__note">{exp.unsureNote}</p>}
            <div className={`field${errors.bizName ? ' field--error' : ''}`}>
              <label htmlFor="s-biz">{isLeadership ? exp.orgName : exp.businessName}</label>
              <input id="s-biz" value={state.bizName} onChange={(e) => set('bizName', e.target.value)} />
              {errors.bizName && <p className="field-error">{errors.bizName}</p>}
            </div>
            {isLeadership ? (
              <div className={`field${errors.orgType ? ' field--error' : ''}`}>
                <label htmlFor="s-orgtype">{exp.orgType}</label>
                <select id="s-orgtype" value={state.orgType} onChange={(e) => set('orgType', e.target.value)}>
                  <option value="">—</option>
                  {exp.orgTypeOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                {errors.orgType && <p className="field-error">{errors.orgType}</p>}
              </div>
            ) : (
              <div className={`field${errors.industry ? ' field--error' : ''}`}>
                <label htmlFor="s-industry">{exp.industry}</label>
                <input id="s-industry" value={state.industry} onChange={(e) => set('industry', e.target.value)} />
                {errors.industry && <p className="field-error">{errors.industry}</p>}
              </div>
            )}
            <div className={`field${errors.years ? ' field--error' : ''}`}>
              <label htmlFor="s-years">{isLeadership ? exp.yearsLeadership : exp.yearsBusiness}</label>
              <select id="s-years" value={state.years} onChange={(e) => set('years', e.target.value)}>
                <option value="">—</option>
                {exp.yearsOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.years && <p className="field-error">{errors.years}</p>}
            </div>
            <div className={`field${errors.role ? ' field--error' : ''}`}>
              <label htmlFor="s-role">{isLeadership ? exp.position : exp.currentRole}</label>
              <input id="s-role" value={state.role} onChange={(e) => set('role', e.target.value)} />
              {errors.role && <p className="field-error">{errors.role}</p>}
            </div>
            <div className="field">
              <label htmlFor="s-team">{isLeadership ? exp.orgTeamSize : exp.teamSize}</label>
              <input id="s-team" value={state.teamSize} onChange={(e) => set('teamSize', e.target.value)} />
            </div>
            {isBusiness && (
              <div className="field">
                <label htmlFor="s-products">{exp.products}</label>
                <input id="s-products" value={state.products} onChange={(e) => set('products', e.target.value)} />
              </div>
            )}
            <div className={`field${errors.responsibilities ? ' field--error' : ''}`}>
              <label htmlFor="s-resp">{isLeadership ? exp.orgResponsibilities : exp.responsibilities}</label>
              <textarea id="s-resp" value={state.responsibilities} onChange={(e) => set('responsibilities', e.target.value)} />
              {errors.responsibilities && <p className="field-error">{errors.responsibilities}</p>}
            </div>
            <div className="field">
              <label htmlFor="s-web">{isLeadership ? exp.orgWebsite : exp.website}</label>
              <input id="s-web" type="url" inputMode="url" value={state.website} onChange={(e) => set('website', e.target.value)} placeholder="https://" />
            </div>
          </div>
        )}

        {step === 4 && (
          <fieldset className="semakan__fieldset">
            <legend className="semakan__note">{f.steps.evidence.intro}</legend>
            {f.steps.evidence.options.map((o) => {
              const checked = state.evidence.includes(o)
              return (
                <label key={o} className={`choice${checked ? ' choice--selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      set('evidence', checked ? state.evidence.filter((x) => x !== o) : [...state.evidence, o])
                    }
                  />
                  <span>{o}</span>
                </label>
              )
            })}
            <p className="semakan__hint">{f.steps.evidence.note}</p>
          </fieldset>
        )}

        {step === 5 && (
          <fieldset className="semakan__fieldset">
            <legend className="semakan__question">{f.steps.commitment.question}</legend>
            {f.steps.commitment.options.map((o) => (
              <label key={o} className={`choice${state.commitment === o ? ' choice--selected' : ''}`}>
                <input type="radio" name="commitment" checked={state.commitment === o} onChange={() => set('commitment', o)} />
                <span>{o}</span>
              </label>
            ))}
            {errors.commitment && <p className="field-error">{errors.commitment}</p>}
          </fieldset>
        )}

        {step === 6 && (
          <fieldset className="semakan__fieldset">
            <legend className="semakan__question">{f.steps.financial.question}</legend>
            {f.steps.financial.options.map((o) => (
              <label key={o} className={`choice${state.financial === o ? ' choice--selected' : ''}`}>
                <input type="radio" name="financial" checked={state.financial === o} onChange={() => set('financial', o)} />
                <span>{o}</span>
              </label>
            ))}
            {errors.financial && <p className="field-error">{errors.financial}</p>}
          </fieldset>
        )}

        {step === 7 && (
          <div>
            <fieldset className="semakan__fieldset">
              <legend className="semakan__question">{f.steps.motivation.question}</legend>
              {f.steps.motivation.options.map((o) => (
                <label key={o} className={`choice${state.motivation === o ? ' choice--selected' : ''}`}>
                  <input type="radio" name="motivation" checked={state.motivation === o} onChange={() => set('motivation', o)} />
                  <span>{o}</span>
                </label>
              ))}
              {errors.motivation && <p className="field-error">{errors.motivation}</p>}
            </fieldset>
            <div className="field">
              <label htmlFor="s-other">{f.steps.motivation.otherLabel}</label>
              <textarea
                id="s-other"
                value={state.motivationOther}
                onChange={(e) => set('motivationOther', e.target.value)}
                placeholder={f.steps.motivation.otherPlaceholder}
              />
            </div>

            <div className="semakan__consent">
              <h3>{f.consent.title}</h3>
              {(
                [
                  ['consentReview', f.consent.review],
                  ['consentContact', f.consent.contact],
                  ['consentStorage', f.consent.storage],
                  ['consentPrivacy', f.consent.privacy],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="semakan__consentrow">
                  <input
                    type="checkbox"
                    checked={state[key]}
                    onChange={(e) => set(key, e.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <a href="/privasi" target="_blank" rel="noopener" className="semakan__privacylink">
                {f.consent.privacyLink}
              </a>
              {errors.consent && <p className="field-error">{errors.consent}</p>}
            </div>
          </div>
        )}

        {Object.keys(errors).length > 0 && <p className="semakan__errorbar" role="alert">{f.validation.fixErrors}</p>}
        {submitError && <p className="semakan__errorbar" role="alert">{t.common.error}</p>}

        <div className="semakan__nav">
          {step > 1 && (
            <button className="btn btn--ghost-navy" onClick={goBack} type="button">
              {f.back}
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button className="btn btn--navy semakan__next" onClick={goNext} type="button">
              {f.next} →
            </button>
          ) : (
            <button className="btn btn--gold semakan__next" onClick={handleSubmit} disabled={submitting} type="button">
              {submitting ? f.submitting : f.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
