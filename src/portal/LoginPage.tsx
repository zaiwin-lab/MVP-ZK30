import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isDemoMode } from '../lib/data'
import { useAuth } from '../lib/auth'
import { usePageMeta } from '../lib/usePageMeta'
import { useI18n } from '../i18n'
import './portal.css'

const HOME_BY_ROLE = { participant: '/peserta', admin: '/team', director: '/pengurusan' } as const

export function LoginPage() {
  const { t } = useI18n()
  const a = t.participant
  const ac = a.account
  usePageMeta(t.seo.login.title, t.seo.login.desc, '/login')
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [confirmSent, setConfirmSent] = useState(false)

  const from = (location.state as { from?: string } | null)?.from

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'signup') {
      if (!fullName.trim()) return setError(t.form.validation.required)
      if (password.length < 6) return setError(ac.passwordHint)
    }
    setBusy(true)
    if (mode === 'login') {
      const profile = await signIn(email, password)
      setBusy(false)
      if (!profile) return setError(a.loginError)
      return navigate(from ?? HOME_BY_ROLE[profile.role], { replace: true })
    }
    // signup
    const res = await signUp(email, password, fullName)
    setBusy(false)
    if (res.error) return setError(ac.signupError)
    if (res.needsConfirmation) return setConfirmSent(true)
    if (res.profile) return navigate(from ?? HOME_BY_ROLE[res.profile.role], { replace: true })
  }

  if (confirmSent) {
    return (
      <div className="portal">
        <div className="container">
          <div className="loginbox">
            <h1>{ac.confirmTitle}</h1>
            <p className="loginbox__sub">{ac.confirmBody}</p>
            <button
              className="btn btn--navy"
              style={{ width: '100%' }}
              onClick={() => { setConfirmSent(false); setMode('login'); setPassword('') }}
            >
              {a.login}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isSignup = mode === 'signup'

  return (
    <div className="portal">
      <div className="container">
        <form className="loginbox" onSubmit={handleSubmit}>
          <h1>{isSignup ? ac.createTitle : a.loginTitle}</h1>
          <p className="loginbox__sub">{isSignup ? ac.createSupport : a.loginSupport}</p>

          {isSignup && (
            <div className="field">
              <label htmlFor="signup-name">{ac.fullName}</label>
              <input
                id="signup-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}
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
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              required
            />
            {isSignup && !error && <p className="loginbox__hint">{ac.passwordHint}</p>}
            {error && <p className="field-error">{error}</p>}
          </div>
          <button className="btn btn--navy" type="submit" disabled={busy} style={{ width: '100%' }}>
            {busy
              ? isSignup
                ? ac.creatingAccount
                : a.loggingIn
              : isSignup
                ? ac.createAccount
                : a.login}
          </button>

          <button
            type="button"
            className="loginbox__toggle"
            onClick={() => { setMode(isSignup ? 'login' : 'signup'); setError('') }}
          >
            {isSignup ? ac.toggleToLogin : ac.toggleToCreate}
          </button>

          {isDemoMode && (
            <div className="loginbox__demo">
              <strong>{t.common.demoNotice}</strong>
              <br />
              Peserta: <code>peserta@demo.spm2diploma.my</code>
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
