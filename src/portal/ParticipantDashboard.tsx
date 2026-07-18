import { useEffect, useState } from 'react'
import { CHECKLIST_ITEMS, PROGRESS_STAGES, whatsappLink, CONTACT } from '../config/programme'
import { getOwnApplication, isDemoMode, listUpdates } from '../lib/data'
import type { Application, ProgrammeUpdate } from '../lib/types'
import { useAuth } from '../lib/auth'
import { useI18n } from '../i18n'
import { RequireRole } from './RequireRole'
import './portal.css'

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
          <div className="card portal__empty">
            <p>{p.loginSupport}</p>
          </div>
        ) : (
          <>
            <div className="stats">
              <div className="stat">
                <div className="stat__label">{p.refLabel}</div>
                <div className="stat__value" style={{ fontSize: '1.05rem' }}>
                  {app.application_reference}
                </div>
              </div>
              <div className="stat">
                <div className="stat__label">{p.pathwayLabel}</div>
                <div className="stat__value" style={{ fontSize: '1.05rem' }}>
                  {app.selected_pathway === 'unsure'
                    ? t.confirmation.unsurePathway
                    : t.form.steps.pathway.options[app.selected_pathway]}
                </div>
              </div>
              <div className="stat">
                <div className="stat__label">{p.statusLabel}</div>
                <div className="stat__value" style={{ fontSize: '1.05rem' }}>
                  {p.stages[app.participant_progress_stage]}
                </div>
              </div>
              <div className="stat">
                <div className="stat__label">{p.trainingLabel}</div>
                <div className="stat__value" style={{ fontSize: '1.05rem' }}>
                  {trainingDate ? dateFmt(trainingDate) : p.trainingTBA}
                </div>
              </div>
            </div>

            <div className="card">
              <h2>{p.progressTitle}</h2>
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

            {nextItem && (
              <div className="card">
                <h2>{p.nextActionTitle}</h2>
                <p style={{ fontWeight: 600 }}>→ {p.checklist[nextItem]}</p>
              </div>
            )}

            <div className="card">
              <h2>{p.updatesTitle}</h2>
              {updates.length === 0 ? (
                <p className="text-soft">{p.noUpdates}</p>
              ) : (
                updates.map((u) => (
                  <div key={u.id} style={{ marginBottom: '0.9rem' }}>
                    <strong>{u.title}</strong>
                    <p className="text-soft" style={{ fontSize: '0.9rem' }}>
                      {u.body}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="card">
              <h2>{p.contactTitle}</h2>
              <a className="btn btn--gold" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                {p.whatsappSupport} — {CONTACT.whatsappDisplay}
              </a>
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
