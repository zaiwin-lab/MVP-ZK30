import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { whatsappLink } from '../config/programme'
import { track } from '../lib/analytics'
import { useI18n } from '../i18n'
import './floating.css'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.1 15.08l-.3-.17-3.06.88.9-2.98-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.3 4.4c-.18 0-.47.07-.72.34-.24.27-.94.92-.94 2.24 0 1.32.96 2.6 1.1 2.78.13.18 1.86 2.97 4.59 4.05 2.27.9 2.73.72 3.22.67.5-.04 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.14-.18.27-.7.87-.85 1.05-.16.18-.32.2-.59.07a7.44 7.44 0 0 1-2.18-1.34 8.2 8.2 0 0 1-1.51-1.88c-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.46-.83-2-.2-.5-.42-.43-.6-.43Z" />
    </svg>
  )
}

/** Friendly assistant character — antenna, screen face, gold accents. */
function BotFace() {
  return (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none" aria-hidden="true">
      {/* antenna */}
      <line x1="24" y1="6" x2="24" y2="12" stroke="var(--gold-300)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="24" cy="5" r="2.4" fill="var(--gold-500)" />
      {/* head */}
      <rect x="9" y="12" width="30" height="24" rx="8" fill="#fff" />
      {/* eyes */}
      <circle cx="18.5" cy="23" r="2.6" fill="var(--navy-900)" />
      <circle cx="29.5" cy="23" r="2.6" fill="var(--navy-900)" />
      {/* cheeks */}
      <circle cx="14" cy="27.5" r="1.4" fill="var(--gold-500)" opacity="0.7" />
      <circle cx="34" cy="27.5" r="1.4" fill="var(--gold-500)" opacity="0.7" />
      {/* smile */}
      <path d="M19 29.5c1.6 1.6 8.4 1.6 10 0" stroke="var(--navy-900)" strokeWidth="2.2" strokeLinecap="round" />
      {/* ears */}
      <rect x="5.5" y="20" width="3" height="8" rx="1.5" fill="#fff" />
      <rect x="39.5" y="20" width="3" height="8" rx="1.5" fill="#fff" />
    </svg>
  )
}

export function FloatingTools() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const [officerOpen, setOfficerOpen] = useState(false)
  const [activeQ, setActiveQ] = useState<number | null>(null)
  const [hideSticky, setHideSticky] = useState(false)
  const [greetOpen, setGreetOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Hide the sticky CTA while the Semakan form (or its section) is on screen
  useEffect(() => {
    if (pathname.startsWith('/semakan')) {
      setHideSticky(true)
      return
    }
    const target = document.querySelector('#semakan-embed')
    if (!target) {
      setHideSticky(false)
      return
    }
    const io = new IntersectionObserver(([entry]) => setHideSticky(entry.isIntersecting), {
      threshold: 0.1,
    })
    io.observe(target)
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    setOfficerOpen(false)
  }, [pathname])

  // Welcome bubble: appear once per session, shortly after load, on the public site
  useEffect(() => {
    if (pathname.startsWith('/semakan')) return
    try {
      if (sessionStorage.getItem('spm2d.greetSeen')) return
    } catch {
      /* storage unavailable */
    }
    const id = setTimeout(() => setGreetOpen(true), 1600)
    return () => clearTimeout(id)
  }, [pathname])

  const dismissGreet = () => {
    setGreetOpen(false)
    try {
      sessionStorage.setItem('spm2d.greetSeen', '1')
    } catch {
      /* ignore */
    }
  }

  const openOfficer = () => {
    dismissGreet()
    setOfficerOpen((v) => {
      if (!v) track('digital_assistant_opened')
      return !v
    })
  }

  // Close Digital Officer on Escape
  useEffect(() => {
    if (!officerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOfficerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [officerOpen])

  return (
    <>
      {/* Digital assistant — bottom-left */}
      <div className="float float--left">
        {officerOpen && (
          <div className="officer" ref={dialogRef} role="dialog" aria-label={t.floating.officerTitle}>
            <div className="officer__head">
              <span className="officer__ident">
                <span className="officer__avatar" aria-hidden="true">
                  <BotFace />
                </span>
                <span>
                  <strong>{t.floating.officerTitle}</strong>
                  <span className="officer__status">{t.floating.online}</span>
                </span>
              </span>
              <button
                className="officer__close"
                onClick={() => setOfficerOpen(false)}
                aria-label={t.nav.close}
              >
                ✕
              </button>
            </div>
            <div className="officer__body">
              <p className="officer__intro">{t.floating.officerIntro}</p>
              <ul className="officer__list">
                {t.floating.shortcuts.map((s, i) => (
                  <li key={s.q}>
                    <button
                      className={`officer__q${activeQ === i ? ' officer__q--open' : ''}`}
                      aria-expanded={activeQ === i}
                      onClick={() => setActiveQ(activeQ === i ? null : i)}
                    >
                      {s.q}
                    </button>
                    {activeQ === i && <p className="officer__a">{s.a}</p>}
                  </li>
                ))}
              </ul>
              <p className="officer__note">{t.floating.officerNote}</p>
              <Link
                className="btn btn--gold btn--sm officer__wa"
                to="/semakan"
                onClick={() => {
                  setOfficerOpen(false)
                  track('hero_cta_clicked', { where: 'digital-officer' })
                }}
              >
                {t.floating.primaryCta}
              </Link>
              <a
                className="btn btn--navy btn--sm officer__wa"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_clicked', { where: 'digital-officer' })}
              >
                {t.floating.askTeam}
              </a>
            </div>
          </div>
        )}

        {/* Welcome bubble — invites people to use the 24/7 assistant */}
        {greetOpen && !officerOpen && (
          <div className="greet" role="status">
            <button className="greet__close" onClick={dismissGreet} aria-label={t.nav.close}>
              ✕
            </button>
            <button className="greet__body" onClick={openOfficer}>
              <span className="greet__title">{t.floating.greetingTitle}</span>
              <span className="greet__sub">{t.floating.greetingBody}</span>
            </button>
          </div>
        )}

        <button
          className={`floatbtn floatbtn--officer${!officerOpen ? ' floatbtn--pulse' : ''}`}
          onClick={openOfficer}
          aria-expanded={officerOpen}
          aria-label={t.floating.officerTitle}
        >
          <BotFace />
          <span className="floatbtn__online" aria-hidden="true" />
        </button>
      </div>

      {/* WhatsApp — bottom-right (spec Q): tasteful, never louder than primary CTA */}
      <div className="float float--right">
        <a
          className="floatbtn floatbtn--wa"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.floating.whatsappLabel}
          onClick={() => track('whatsapp_clicked', { where: 'bubble' })}
        >
          <WhatsAppIcon />
        </a>
      </div>

      {/* Sticky mobile CTA — bottom-center, hidden when the form is visible */}
      {!hideSticky && (
        <div className="stickycta">
          <Link to="/semakan" className="btn btn--gold stickycta__btn">
            {t.nav.cta}
          </Link>
        </div>
      )}
    </>
  )
}
