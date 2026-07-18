import { useEffect, useMemo, useState } from 'react'
import {
  APPLICATION_STATUSES,
  CHECKLIST_ITEMS,
  PROGRESS_STAGES,
  type ApplicationStatus,
  type ChecklistItem,
  type ProgressStage,
} from '../config/programme'
import { addUpdate, isDemoMode, listApplications, updateApplication } from '../lib/data'
import type { Application } from '../lib/types'
import { useAuth } from '../lib/auth'
import { useI18n } from '../i18n'
import { RequireRole } from './RequireRole'
import './portal.css'

/** Team operations labels stay in BM — the working language of the team */
const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: 'Baru',
  in_review: 'Dalam Semakan',
  contacted: 'Telah Dihubungi',
  qualified: 'Layak',
  follow_up: 'Susulan',
  enrolled: 'Mendaftar',
  not_suitable: 'Tidak Sesuai',
  withdrawn: 'Menarik Diri',
}

const STATUS_PILL: Record<ApplicationStatus, string> = {
  new: 'pill--navy',
  in_review: 'pill--gold',
  contacted: 'pill--gold',
  qualified: 'pill--green',
  follow_up: 'pill--gold',
  enrolled: 'pill--green',
  not_suitable: 'pill--red',
  withdrawn: 'pill--gray',
}

const PATHWAY_LABELS = {
  keusahawanan: 'Keusahawanan',
  kepimpinan: 'Kepimpinan',
  unsure: 'Belum pasti',
} as const

function ApplicantEditor({
  app,
  onSaved,
  onClose,
  stageLabels,
  checklistLabels,
}: {
  app: Application
  onSaved: (patch: Partial<Application>) => void
  onClose: () => void
  stageLabels: Record<ProgressStage, string>
  checklistLabels: Record<ChecklistItem, string>
}) {
  const [status, setStatus] = useState<ApplicationStatus>(app.status)
  const [assignedTo, setAssignedTo] = useState(app.assigned_to ?? '')
  const [followUp, setFollowUp] = useState(app.next_follow_up?.slice(0, 10) ?? '')
  const [note, setNote] = useState(app.internal_note ?? '')
  const [stage, setStage] = useState<ProgressStage>(app.participant_progress_stage)
  const [checklist, setChecklist] = useState<ChecklistItem[]>(app.participant_checklist)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    const patch: Partial<Application> = {
      status,
      assigned_to: assignedTo.trim() || null,
      next_follow_up: followUp || null,
      internal_note: note.trim() || null,
      participant_progress_stage: stage,
      participant_checklist: checklist,
    }
    const ok = await updateApplication(app.id, patch)
    setSaving(false)
    if (ok) {
      setSaved(true)
      onSaved(patch)
      setTimeout(() => setSaved(false), 2200)
    }
  }

  return (
    <div className="card" style={{ borderColor: 'var(--navy-700)' }}>
      <h2>
        {app.full_name} · {app.application_reference}
      </h2>
      <p className="portal__sub" style={{ marginBottom: '1rem' }}>
        {PATHWAY_LABELS[app.selected_pathway]} · {app.phone} · {app.email} · {app.location}
        <br />
        {app.business_or_organisation_name} — {app.current_position} ({app.years_experience})
        <br />
        Komitmen: <strong>{app.commitment_level || '—'}</strong> · Kewangan:{' '}
        <strong>{app.financial_readiness || '—'}</strong> · Motivasi: {app.motivation || '—'}
        <br />
        Bukti: {app.evidence_readiness.length ? app.evidence_readiness.join(', ') : '—'}
      </p>

      <div className="editor">
        <div className="field">
          <label htmlFor={`st-${app.id}`}>Status</label>
          <select id={`st-${app.id}`} value={status} onChange={(e) => setStatus(e.target.value as ApplicationStatus)}>
            {APPLICATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`as-${app.id}`}>Ditugaskan kepada</label>
          <input id={`as-${app.id}`} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Nama ahli team" />
        </div>
        <div className="field">
          <label htmlFor={`fu-${app.id}`}>Tarikh susulan</label>
          <input id={`fu-${app.id}`} type="date" value={followUp} onChange={(e) => setFollowUp(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`pg-${app.id}`}>Peringkat kemajuan peserta</label>
          <select id={`pg-${app.id}`} value={stage} onChange={(e) => setStage(e.target.value as ProgressStage)}>
            {PROGRESS_STAGES.map((s) => (
              <option key={s} value={s}>
                {stageLabels[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="field editor__wide">
          <label htmlFor={`nt-${app.id}`}>Nota dalaman (tidak dilihat peserta)</label>
          <textarea id={`nt-${app.id}`} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div className="editor__wide">
          <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Senarai semak peserta</p>
          <div className="editor__checks">
            {CHECKLIST_ITEMS.map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={checklist.includes(c)}
                  onChange={(e) =>
                    setChecklist((cur) => (e.target.checked ? [...cur, c] : cur.filter((x) => x !== c)))
                  }
                />
                {checklistLabels[c]}
              </label>
            ))}
          </div>
        </div>
        <div className="editor__actions">
          {saved && <span className="pill pill--green">Disimpan ✓</span>}
          <button className="btn btn--ghost-navy btn--sm" onClick={onClose} type="button">
            Tutup
          </button>
          <button className="btn btn--navy btn--sm" onClick={save} disabled={saving} type="button">
            {saving ? 'Menyimpan…' : 'Simpan perubahan'}
          </button>
        </div>
      </div>
    </div>
  )
}

function UpdateComposer() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [trainingDate, setTrainingDate] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const publish = async () => {
    if (!title.trim() || !body.trim()) return
    setBusy(true)
    const ok = await addUpdate({ title: title.trim(), body: body.trim(), training_date: trainingDate || null, published: true })
    setBusy(false)
    if (ok) {
      setTitle('')
      setBody('')
      setTrainingDate('')
      setDone(true)
      setTimeout(() => setDone(false), 2200)
    }
  }

  return (
    <div className="card">
      <h2>Makluman program (dilihat semua peserta)</h2>
      <div className="editor">
        <div className="field">
          <label htmlFor="up-title">Tajuk</label>
          <input id="up-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="up-date">Tarikh latihan (jika berkaitan)</label>
          <input id="up-date" type="date" value={trainingDate} onChange={(e) => setTrainingDate(e.target.value)} />
        </div>
        <div className="field editor__wide">
          <label htmlFor="up-body">Kandungan</label>
          <textarea id="up-body" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div className="editor__actions">
          {done && <span className="pill pill--green">Diterbitkan ✓</span>}
          <button className="btn btn--navy btn--sm" onClick={publish} disabled={busy || !title.trim() || !body.trim()} type="button">
            {busy ? 'Menerbitkan…' : 'Terbitkan makluman'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const { t } = useI18n()
  const { profile, signOut } = useAuth()
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [pathwayFilter, setPathwayFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listApplications().then((a) => {
      if (!cancelled) {
        setApps(a)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return apps.filter((a) => {
      if (pathwayFilter && a.selected_pathway !== pathwayFilter) return false
      if (statusFilter && a.status !== statusFilter) return false
      if (!q) return true
      return [a.full_name, a.email, a.phone, a.application_reference, a.business_or_organisation_name, a.location]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [apps, search, pathwayFilter, statusFilter])

  const counts = useMemo(
    () => ({
      total: apps.length,
      new: apps.filter((a) => a.status === 'new').length,
      qualified: apps.filter((a) => a.status === 'qualified').length,
      enrolled: apps.filter((a) => a.status === 'enrolled').length,
    }),
    [apps]
  )

  return (
    <div className="portal">
      <div className="container container--wide">
        <div className="portal__head">
          <div>
            <h1>Team Access — Operasi Pemohon</h1>
            <p className="portal__sub">
              {profile?.full_name} ({profile?.role === 'director' ? 'Pengarah' : 'Team'})
            </p>
            {isDemoMode && <span className="portal__demobadge">{t.common.demoNotice}</span>}
          </div>
          <button className="btn btn--ghost-navy btn--sm" onClick={signOut}>
            {t.participant.logout}
          </button>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat__label">Jumlah pemohon</div>
            <div className="stat__value">{counts.total}</div>
          </div>
          <div className="stat">
            <div className="stat__label">Baru</div>
            <div className="stat__value">{counts.new}</div>
          </div>
          <div className="stat stat--accent">
            <div className="stat__label">Layak</div>
            <div className="stat__value">{counts.qualified}</div>
          </div>
          <div className="stat stat--accent">
            <div className="stat__label">Mendaftar</div>
            <div className="stat__value">{counts.enrolled}</div>
          </div>
        </div>

        <div className="card">
          <h2>Senarai pemohon</h2>
          <div className="filters">
            <input
              type="search"
              placeholder="Cari nama, e-mel, telefon, rujukan…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari pemohon"
            />
            <select value={pathwayFilter} onChange={(e) => setPathwayFilter(e.target.value)} aria-label="Tapis laluan">
              <option value="">Semua laluan</option>
              <option value="keusahawanan">Keusahawanan</option>
              <option value="kepimpinan">Kepimpinan</option>
              <option value="unsure">Belum pasti</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Tapis status">
              <option value="">Semua status</option>
              {APPLICATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="portal__empty" role="status">
              {t.common.loading}
            </p>
          ) : filtered.length === 0 ? (
            <p className="portal__empty">Tiada pemohon sepadan. Laraskan carian atau tapisan di atas.</p>
          ) : (
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Laluan</th>
                    <th>Profil</th>
                    <th>Status</th>
                    <th>Komitmen</th>
                    <th>Kewangan</th>
                    <th>Susulan</th>
                    <th>Ditugaskan</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <strong>{a.full_name}</strong>
                        <br />
                        <span className="text-soft" style={{ fontSize: '0.8rem' }}>
                          {a.application_reference}
                        </span>
                      </td>
                      <td>{PATHWAY_LABELS[a.selected_pathway]}</td>
                      <td>
                        <span className={`pill ${a.profile_stage === 'preliminary' ? 'pill--gold' : 'pill--green'}`}>
                          {a.profile_stage === 'preliminary' ? 'Awal' : 'Lengkap'}
                        </span>
                      </td>
                      <td>
                        <span className={`pill ${STATUS_PILL[a.status]}`}>{STATUS_LABELS[a.status]}</span>
                      </td>
                      <td style={{ maxWidth: 150 }}>{a.commitment_level || '—'}</td>
                      <td style={{ maxWidth: 150 }}>{a.financial_readiness || '—'}</td>
                      <td>{a.next_follow_up ? a.next_follow_up.slice(0, 10) : '—'}</td>
                      <td>{a.assigned_to ?? '—'}</td>
                      <td>
                        <button className="rowlink" onClick={() => setOpenId(openId === a.id ? null : a.id)}>
                          {openId === a.id ? 'Tutup' : 'Urus'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {openId &&
          (() => {
            const app = apps.find((a) => a.id === openId)
            if (!app) return null
            return (
              <ApplicantEditor
                app={app}
                stageLabels={t.participant.stages}
                checklistLabels={t.participant.checklist}
                onClose={() => setOpenId(null)}
                onSaved={(patch) =>
                  setApps((cur) => cur.map((a) => (a.id === openId ? { ...a, ...patch } : a)))
                }
              />
            )
          })()}

        <UpdateComposer />
      </div>
    </div>
  )
}

export function AdminDashboard() {
  return (
    <RequireRole roles={['admin', 'director']}>
      <Dashboard />
    </RequireRole>
  )
}
