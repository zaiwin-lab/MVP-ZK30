import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LANGS, useI18n } from '../i18n'
import './header.css'

function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label="SPM2Diploma — Utama">
      <svg viewBox="0 0 64 64" width="34" height="34" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="var(--navy-900)" />
        <path
          d="M14 40 L32 14 L50 40"
          fill="none"
          stroke="var(--gold-500)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="18" y="46" width="28" height="5" rx="2.5" fill="var(--gold-500)" />
      </svg>
      <span className="wordmark__text">
        SPM<em>2</em>Diploma
      </span>
    </Link>
  )
}

function LangSwitch() {
  const { lang, setLang } = useI18n()
  return (
    <div className="langswitch" role="group" aria-label="Bahasa / Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={`langswitch__btn${lang === l.code ? ' langswitch__btn--on' : ''}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /** Homepage section links: navigate home first when needed */
  const goSection = (hash: string) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + hash)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sections = [
    { hash: '#laluan', label: t.nav.pathways },
    { hash: '#perjalanan', label: t.nav.journey },
    { hash: '#coach', label: t.nav.coach },
    { hash: '#faq', label: t.nav.faq },
  ]

  return (
    <header className="siteheader">
      <div className="siteheader__inner container--wide">
        <Wordmark />

        <nav className="siteheader__nav" aria-label="Utama">
          <NavLink to="/" className="siteheader__link" end>
            {t.nav.home}
          </NavLink>
          {sections.map((s) => (
            <button key={s.hash} className="siteheader__link" onClick={() => goSection(s.hash)}>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="siteheader__actions">
          <LangSwitch />
          <Link to="/login" className="siteheader__login">
            {t.nav.participantLogin}
          </Link>
          <Link to="/semakan" className="btn btn--gold btn--sm siteheader__cta">
            {t.nav.cta}
          </Link>
        </div>

        <button
          className="siteheader__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.nav.close : t.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="mobilemenu" id="mobile-menu">
          <nav aria-label="Menu mudah alih">
            <NavLink to="/" className="mobilemenu__link" end>
              {t.nav.home}
            </NavLink>
            {sections.map((s) => (
              <button key={s.hash} className="mobilemenu__link" onClick={() => goSection(s.hash)}>
                {s.label}
              </button>
            ))}
            <Link to="/login" className="mobilemenu__link">
              {t.nav.participantLogin}
            </Link>
          </nav>
          <div className="mobilemenu__lang">
            <LangSwitch />
          </div>
          <Link to="/semakan" className="btn btn--gold mobilemenu__cta">
            {t.nav.cta}
          </Link>
        </div>
      )}
    </header>
  )
}
