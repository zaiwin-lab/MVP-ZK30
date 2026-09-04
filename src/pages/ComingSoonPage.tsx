import { Link } from 'react-router-dom'
import { whatsappLink, CONTACT } from '../config/programme'
import { usePageMeta } from '../lib/usePageMeta'
import { useI18n } from '../i18n'

/** Participant login/register is on hold — this placeholder shows in its place. */
export function ComingSoonPage() {
  const { t } = useI18n()
  usePageMeta(t.soon.title, t.soon.body, '/peserta-login')
  return (
    <section className="section">
      <div className="container container--narrow">
        <div className="card" style={{ padding: '2.6rem 1.6rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.6rem', lineHeight: 1 }} aria-hidden="true">🔧</div>
          <h1 style={{ marginTop: '0.7rem' }}>{t.soon.title}</h1>
          <p className="text-soft" style={{ margin: '0.9rem auto 1.6rem', maxWidth: '48ch' }}>
            {t.soon.body}
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/semakan" className="btn btn--gold">
              {t.nav.cta}
            </Link>
            <a className="btn btn--ghost-navy" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              {t.participant.whatsappSupport} — {CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
