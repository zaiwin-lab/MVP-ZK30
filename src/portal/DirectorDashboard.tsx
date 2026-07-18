import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { addFinanceEntry, isDemoMode, listApplications, listFinance, listProfiles } from '../lib/data'
import type { Application, FinanceEntry, Profile } from '../lib/types'
import { useAuth } from '../lib/auth'
import { useI18n } from '../i18n'
import { RequireRole } from './RequireRole'
import './portal.css'

const RM = (n: number) =>
  new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR', minimumFractionDigits: 2 }).format(n)

const ENTRY_LABELS: Record<FinanceEntry['entry_type'], string> = {
  expected_revenue: 'Hasil dijangka',
  received: 'Diterima',
  operating_expense: 'Perbelanjaan operasi',
  partner_payment: 'Bayaran rakan kongsi / jurulatih',
}

function FinanceCard() {
  const [entries, setEntries] = useState<FinanceEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState<FinanceEntry['entry_type']>('received')
  const [label, setLabel] = useState('')
  const [amount, setAmount] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    listFinance().then((f) => {
      if (!cancelled) {
        setEntries(f)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const totals = useMemo(() => {
    const sum = (t: FinanceEntry['entry_type']) =>
      entries.filter((e) => e.entry_type === t).reduce((acc, e) => acc + Number(e.amount), 0)
    const expected = sum('expected_revenue')
    const received = sum('received')
    const expenses = sum('operating_expense')
    const partner = sum('partner_payment')
    return {
      expected,
      received,
      outstanding: Math.max(expected - received, 0),
      expenses,
      partner,
      balance: received - expenses - partner,
    }
  }, [entries])

  const add = async () => {
    const amt = parseFloat(amount)
    if (!label.trim() || isNaN(amt)) return
    setBusy(true)
    const ok = await addFinanceEntry({ entry_type: type, label: label.trim(), amount: amt, note: null })
    setBusy(false)
    if (ok) {
      setEntries(await listFinance())
      setLabel('')
      setAmount('')
    }
  }

  return (
    <div className="card">
      <h2>Ringkasan Kewangan (dimasukkan secara manual)</h2>
      <div className="stats">
        <div className="stat">
          <div className="stat__label">Hasil dijangka</div>
          <div className="stat__value" style={{ fontSize: '1.1rem' }}>{RM(totals.expected)}</div>
        </div>
        <div className="stat stat--accent">
          <div className="stat__label">Diterima</div>
          <div className="stat__value" style={{ fontSize: '1.1rem' }}>{RM(totals.received)}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Belum diterima</div>
          <div className="stat__value" style={{ fontSize: '1.1rem' }}>{RM(totals.outstanding)}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Perbelanjaan operasi</div>
          <div className="stat__value" style={{ fontSize: '1.1rem' }}>{RM(totals.expenses)}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Bayaran rakan kongsi</div>
          <div className="stat__value" style={{ fontSize: '1.1rem' }}>{RM(totals.partner)}</div>
        </div>
        <div className="stat">
          <div className="stat__label">Anggaran baki program</div>
          <div className={`stat__value${totals.balance < 0 ? ' finance-neg' : ''}`} style={{ fontSize: '1.1rem' }}>
            {RM(totals.balance)}
          </div>
        </div>
      </div>

      <div className="editor" style={{ marginBottom: '1.2rem' }}>
        <div className="field">
          <label htmlFor="fin-type">Jenis</label>
          <select id="fin-type" value={type} onChange={(e) => setType(e.target.value as FinanceEntry['entry_type'])}>
            {(Object.keys(ENTRY_LABELS) as FinanceEntry['entry_type'][]).map((k) => (
              <option key={k} value={k}>
                {ENTRY_LABELS[k]}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="fin-label">Keterangan</label>
          <input id="fin-label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="cth. Yuran kohort 1" />
        </div>
        <div className="field">
          <label htmlFor="fin-amount">Jumlah (RM)</label>
          <input id="fin-amount" type="number" inputMode="decimal" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="editor__actions">
          <button className="btn btn--navy btn--sm" onClick={add} disabled={busy || !label.trim() || !amount} type="button">
            {busy ? 'Menambah…' : 'Tambah rekod'}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="portal__empty" role="status">Memuatkan…</p>
      ) : entries.length === 0 ? (
        <p className="portal__empty">
          Belum ada rekod kewangan. Tambah rekod pertama di atas — tiada data palsu dipaparkan.
        </p>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Tarikh</th>
                <th>Jenis</th>
                <th>Keterangan</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td>{e.created_at.slice(0, 10)}</td>
                  <td>{ENTRY_LABELS[e.entry_type]}</td>
                  <td>{e.label}</td>
                  <td>{RM(Number(e.amount))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Dashboard() {
  const { t } = useI18n()
  const { profile, signOut } = useAuth()
  const [apps, setApps] = useState<Application[]>([])
  const [team, setTeam] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    Promise.all([listApplications(), listProfiles()]).then(([a, p]) => {
      if (!cancelled) {
        setApps(a)
        setTeam(p)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const m = useMemo(() => {
    const total = apps.length
    const qualified = apps.filter((a) => ['qualified', 'enrolled'].includes(a.status)).length
    const enrolled = apps.filter((a) => a.status === 'enrolled').length
    const byPathway = {
      keusahawanan: apps.filter((a) => a.selected_pathway === 'keusahawanan').length,
      kepimpinan: apps.filter((a) => a.selected_pathway === 'kepimpinan').length,
      unsure: apps.filter((a) => a.selected_pathway === 'unsure').length,
    }
    const financiallyReady = apps.filter((a) => a.financial_readiness.startsWith('Ya')).length
    const committed = apps.filter((a) => a.commitment_level.startsWith('Ya')).length
    return { total, qualified, enrolled, byPathway, financiallyReady, committed }
  }, [apps])

  const pct = (n: number, of: number) => (of === 0 ? '—' : `${Math.round((n / of) * 100)}%`)

  return (
    <div className="portal">
      <div className="container container--wide">
        <div className="portal__head">
          <div>
            <h1>Management Access — Pandangan Pengarah Program</h1>
            <p className="portal__sub">{profile?.full_name}</p>
            {isDemoMode && <span className="portal__demobadge">{t.common.demoNotice}</span>}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <Link to="/team" className="btn btn--ghost-navy btn--sm">
              Buka Team Access
            </Link>
            <button className="btn btn--ghost-navy btn--sm" onClick={signOut}>
              {t.participant.logout}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="portal__empty" role="status">
            {t.common.loading}
          </p>
        ) : (
          <>
            <div className="stats">
              <div className="stat">
                <div className="stat__label">Jumlah permohonan</div>
                <div className="stat__value">{m.total}</div>
              </div>
              <div className="stat">
                <div className="stat__label">Calon layak</div>
                <div className="stat__value">{m.qualified}</div>
              </div>
              <div className="stat stat--accent">
                <div className="stat__label">Pendaftaran</div>
                <div className="stat__value">{m.enrolled}</div>
              </div>
              <div className="stat">
                <div className="stat__label">Komited</div>
                <div className="stat__value">{m.committed}</div>
              </div>
              <div className="stat">
                <div className="stat__label">Bersedia kewangan</div>
                <div className="stat__value">{m.financiallyReady}</div>
              </div>
            </div>

            <div className="card">
              <h2>Pecahan laluan & penukaran ringkas</h2>
              <div className="table-wrap">
                <table className="data">
                  <thead>
                    <tr>
                      <th>Ukuran</th>
                      <th>Nilai</th>
                      <th>Kadar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Laluan Keusahawanan</td>
                      <td>{m.byPathway.keusahawanan}</td>
                      <td>{pct(m.byPathway.keusahawanan, m.total)}</td>
                    </tr>
                    <tr>
                      <td>Laluan Kepimpinan</td>
                      <td>{m.byPathway.kepimpinan}</td>
                      <td>{pct(m.byPathway.kepimpinan, m.total)}</td>
                    </tr>
                    <tr>
                      <td>Belum pasti</td>
                      <td>{m.byPathway.unsure}</td>
                      <td>{pct(m.byPathway.unsure, m.total)}</td>
                    </tr>
                    <tr>
                      <td><strong>Permohonan → Layak</strong></td>
                      <td>{m.qualified}</td>
                      <td>{pct(m.qualified, m.total)}</td>
                    </tr>
                    <tr>
                      <td><strong>Layak → Mendaftar</strong></td>
                      <td>{m.enrolled}</td>
                      <td>{pct(m.enrolled, m.qualified)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <FinanceCard />

            <div className="card">
              <h2>Pengguna team & akses</h2>
              <div className="table-wrap">
                <table className="data">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>E-mel</th>
                      <th>Peranan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((u) => (
                      <tr key={u.id}>
                        <td>{u.full_name || '—'}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className="pill pill--navy">
                            {u.role === 'director' ? 'Pengarah Program' : u.role === 'admin' ? 'Team' : 'Peserta'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function DirectorDashboard() {
  return (
    <RequireRole roles={['director']}>
      <Dashboard />
    </RequireRole>
  )
}
