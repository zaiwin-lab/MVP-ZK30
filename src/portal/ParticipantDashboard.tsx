import { useEffect, useState } from 'react'
import { CHECKLIST_ITEMS, PROGRESS_STAGES, whatsappLink, CONTACT } from '../config/programme'
import { claimByReference, getOwnApplication, isDemoMode, listUpdates } from '../lib/data'
import type { Application, ProgrammeUpdate } from '../lib/types'
import { useAuth } from '../lib/auth'
import { useI18n } from '../i18n'
import { RequireRole } from './RequireRole'
import './portal.css'

function LinkSemakan({ onLinked }: { onLinked: (a: Application) => void }) {
  const { t } = useI18n()
  const ac = t.participant.account
  const [reference, setReference] = useState('')
  const [phone, setPhone] = useState('')
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  const submit = async () => {
    if (!reference.trim() || !phone.trim()) return
    setBusy(true)
    setFailed(false)
    const ok = await claimByReference(reference, phone)
    if (ok) {
      const linked = await getOwnApplication()
      if (linked) {
        setBusy(false)
        return onLinked(linked)
      }
    }
    setBusy(false)
    setFailed(true)
  }

  return (
    <div className="card">
      <h2>{ac.linkTitle}</h2>
      <p className="text-soft" style={{ marginBottom: '1rem' }}>{ac.linkBody}</p>
      <div className="field">
        <label htmlFor="link-ref">{ac.linkRef}</label>
        <input id="link-ref" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="S2D-2026-…" />
      </div>
      <div className="field">
        <label htmlFor="link-phone">{ac.linkPhone}</label>
        <input id="link-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="012-345 6789" />
      </div>
      {failed && <p className="field-error">{ac.linkFail}</p>}
      <button className="btn btn--navy" onClick={submit} disabled={busy || !reference.trim() || !phone.trim()} style={{ marginTop: '0.4rem' }}>
        {busy ? ac.linking : ac.linkBtn}
      </button>
    </div>
  )
}

function Dashboard() {
  const { t, lang } = useI18n()
  const { profile, signOut } = useAuth()
  const [app, setApp] = useState<Application | null>(null)
  const [updates, setUpdates] = useState<ProgrammeUpdate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    Promise.all([getOwnApplication(), listUpdates(true)]).then(([a, u]) => {
      if (!cancelled) {
        setApp(a)
        setUpdates(u)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const p = t.participant

  if (loading) {
    return (
      <div className="portal">
        <div className="container portal__empty" role="status">
          {t.common.loading}
        </div>
      </div>
    )
  }

  const currentIdx = app ? PROGRESS_STAGES.indexOf(app.participant_progress_stage) : 0
  const stepNo = currentIdx + 1
  const totalSteps = PROGRESS_STAGES.length
  const pct = Math.round((stepNo / totalSteps) * 100)
  const nextItem = CHECKLIST_ITEMS.find((c) => !app?.participant_checklist.includes(c))
  const trainingDate = updates.find((u) => u.training_date)?.training_date

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-MY' : 'ms-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="portal">
      <div className="container">
        <div className="portal__head">
          <div>
            <h1>
              {p.welcome}, {profile?.full_name || app?.full_name} 👋
            </h1>
            {isDemoMode && <span className="portal__demobadge">{t.common.demoNotice}</span>}
          </div>
          <button className="btn btn--ghost-navy btn--sm" onClick={signOut}>
            {p.logout}
          </button>
        </div>

        {!app ? (
          <LinkSemakan onLinked={(a) => setApp(a)} />
        ) : (
          <>
            {app.profile_stage === 'preliminary' && (
              <div className="card" style={{ borderColor: 'var(--gold-600)' }}>
                <span className="pill pill--gold">{t.quick.statusPartial}</span>
                <p style={{ marginTop: '0.6rem', fontSize: '0.92rem' }}>{t.quick.continueNote}</p>
                <a href="/semakan/profil" className="btn btn--gold btn--sm" style={{ marginTop: '0.8rem' }}>
                  {t.quick.btnContinue}
                </a>
              </div>
            )}

            {/* Status band — the anchor: where you are + what's next */}
            <section className="statusband" aria-label={p.statusLabel}>
              <div className="statusband__now">
                <span className="statusband__eyebrow">{p.statusLabel}</span>
                <h2 className="statusband__stage">{p.stages[app.participant_progress_stage]}</h2>
                <div className="progressbar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                  <div className="progressbar__fill" style={{ width: `${pct}%` }} />
                </div>
                <p className="statusband__pct">
                  {pct}% · {stepNo} / {totalSteps}
                </p>
                <div className="metachips">
                  <span className="metachip">
                    {p.refLabel}: <strong>{app.application_reference}</strong>
                  </span>
                  <span className="metachip">
                    {p.pathwayLabel}:{' '}
                    <strong>
                      {app.selected_pathway === 'unsure'
                        ? t.confirmation.unsurePathway
                        : t.form.steps.pathway.options[app.selected_pathway]}
                    </strong>
                  </span>
                  <span className="metachip">
                    {p.trainingLabel}: <strong>{trainingDate ? dateFmt(trainingDate) : p.trainingTBA}</strong>
                  </span>
                </div>
              </div>
              <div className="statusband__next">
                <span className="statusband__eyebrow">{p.nextActionTitle}</span>
                <p className="statusband__nextaction">
                  {nextItem ? p.checklist[nextItem] : p.stages[app.participant_progress_stage]}
                </p>
                <a className="btn btn--gold btn--sm" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  {p.whatsappSupport}
                </a>
              </div>
            </section>

            <div className="dashgrid">
              <div className="dashcol">
                <div className="card">
                  <div className="sectionhead">
                    <h2>{p.progressTitle}</h2>
                    <span className="sectionhead__meta">{stepNo} / {totalSteps}</span>
                  </div>
                  <ol className="rail">
                    {PROGRESS_STAGES.map((stage, i) => (
                      <li
                        key={stage}
                        className={`railstep${i < currentIdx ? ' railstep--done' : ''}${
                          i === currentIdx ? ' railstep--current' : ''
                        }`}
                        aria-current={i === currentIdx ? 'step' : undefined}
                      >
                        <span className="railstep__dot" aria-hidden="true">
                          {i < currentIdx ? '✓' : i + 1}
                        </span>
                        <span className="railstep__label">{p.stages[stage]}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="card">
                  <h2>{p.checklistTitle}</h2>
                  <ul className="checklist">
                    {CHECKLIST_ITEMS.map((item) => {
                      const done = app.participant_checklist.includes(item)
                      return (
                        <li key={item} className={done ? 'is-done' : ''}>
                          <span className={`checklist__box${done ? ' checklist__box--on' : ''}`} aria-hidden="true">
                            ✓
                          </span>
                          {p.checklist[item]}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <aside className="dashcol">
                <div className="card">
                  <h2>{p.updatesTitle}</h2>
                  {updates.length === 0 ? (
                    <p className="portal__empty" style={{ padding: '1.2rem 0' }}>{p.noUpdates}</p>
                  ) : (
                    <div className="updatefeed">
                      {updates.map((u) => (
                        <div key={u.id} className="updatefeed__item">
                          <strong>{u.title}</strong>
                          <p>{u.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card">
                  <h2>{p.contactTitle}</h2>
                  <a className="btn btn--gold" href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                    {p.whatsappSupport} — {CONTACT.whatsappDisplay}
                  </a>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function ParticipantDashboard() {
  return (
    <RequireRole roles={['participant']}>
      <Dashboard />
    </RequireRole>
  )
}
