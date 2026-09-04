import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isDemoMode } from '../lib/data'
import { useAuth } from '../lib/auth'
import { usePageMeta } from '../lib/usePageMeta'
import { useI18n } from '../i18n'
import './portal.css'

const HOME_BY_ROLE = { participant: '/peserta', admin: '/team', director: '/pengurusan' } as const

/** Dedicated Team / Management (admin) login. Participant login is separate. */
export function LoginPage() {
  const { t } = useI18n()
  const a = t.participant
  const aa = t.adminAuth
  usePageMeta(t.seo.login.title, t.seo.login.desc, '/login')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)

  const from = (location.state as { from?: string } | null)?.from

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(false)
    const profile = await signIn(email, password)
    setBusy(false)
    if (!profile) {
      setError(true)
      return
    }
    navigate(from ?? HOME_BY_ROLE[profile.role], { replace: true })
  }

  return (
    <div className="portal">
      <div className="container">
        <form className="loginbox" onSubmit={handleSubmit}>
          <h1>{aa.title}</h1>
          <p className="loginbox__sub">{aa.support}</p>

          <div className="field">
            <label htmlFor="login-email">{a.email}</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className={`field${error ? ' field--error' : ''}`}>
            <label htmlFor="login-pass">{a.password}</label>
            <input
              id="login-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            {error && <p className="field-error">{a.loginError}</p>}
          </div>
          <button className="btn btn--navy" type="submit" disabled={busy} style={{ width: '100%' }}>
            {busy ? a.loggingIn : a.login}
          </button>

          {isDemoMode && (
            <div className="loginbox__demo">
              <strong>{t.common.demoNotice}</strong>
              <br />
              Team: <code>team@demo.spm2diploma.my</code>
              <br />
              Pengarah: <code>pengarah@demo.spm2diploma.my</code>
              <br />
              Kata laluan: <code>demo1234</code>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
