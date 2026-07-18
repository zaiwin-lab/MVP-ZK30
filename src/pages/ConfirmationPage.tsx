import { Link, Navigate } from 'react-router-dom'
import { whatsappLink, CONTACT } from '../config/programme'
import { useI18n } from '../i18n'
import { usePageMeta } from '../lib/usePageMeta'
import { track } from '../lib/analytics'
import './confirmation.css'

interface LastSubmission {
  reference: string
  pathway: 'keusahawanan' | 'kepimpinan' | 'unsure'
  date: string
  stage?: 'quick' | 'full'
}

export function ConfirmationPage() {
  const { t, lang } = useI18n()
  const raw = sessionStorage.getItem('spm2d.lastSubmission')
  usePageMeta(t.seo.semakan.title, t.seo.semakan.desc, '/semakan/terima-kasih')
  if (!raw) return <Navigate to="/semakan" replace />
  const sub = JSON.parse(raw) as LastSubmission
  const isQuick = sub.stage === 'quick'

  const pathwayLabel =
    sub.pathway === 'unsure'
      ? t.confirmation.unsurePathway
      : t.form.steps.pathway.options[sub.pathway]

  const dateLabel = new Date(sub.date).toLocaleDateString(
    lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-MY' : 'ms-MY',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const waMessage = `Salam, saya baru menghantar semakan awal SPM2Diploma. Rujukan saya: ${sub.reference}.`

  return (
    <section className="section">
      <div className="container container--narrow">
        <div className="confirm">
          <div className="confirm__badge" aria-hidden="true">
            ✓
          </div>
          {/* Completion state is always explicit (spec V2.5 §12) */}
          <span className={`pill ${isQuick ? 'pill--gold' : 'pill--green'}`}>
            {isQuick ? t.quick.statusPartial : t.quick.statusComplete}
          </span>
          <h1 className="confirm__title" style={{ marginTop: '0.8rem' }}>
            {isQuick ? t.quick.confirmTitle : t.confirmation.title}
          </h1>
          <p className="confirm__support">{isQuick ? t.quick.confirmBody : t.confirmation.support}</p>

          <dl className="confirm__meta">
            <div>
              <dt>{t.confirmation.refLabel}</dt>
              <dd className="confirm__ref">{sub.reference}</dd>
            </div>
            <div>
              <dt>{t.confirmation.pathwayLabel}</dt>
              <dd>{pathwayLabel}</dd>
            </div>
            <div>
              <dt>{t.confirmation.dateLabel}</dt>
              <dd>{dateLabel}</dd>
            </div>
          </dl>

          {isQuick ? (
            <>
              <p className="text-soft">{t.quick.continueNote}</p>
              <div className="confirm__actions">
                <Link to="/semakan/profil" className="btn btn--gold" onClick={() => track('continue_full_profile_clicked')}>
                  {t.quick.btnContinue}
                </Link>
                <Link to="/" className="btn btn--ghost-navy">
                  {t.quick.btnLater}
                </Link>
                <a
                  className="btn btn--outline btn--ghost-navy"
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_clicked', { where: 'confirmation-quick' })}
                >
                  {t.quick.btnWhatsapp}
                </a>
              </div>
              <p className="confirm__wanote">{t.urgency.responsePromise}</p>
            </>
          ) : (
            <>
              <h2>{t.confirmation.nextTitle}</h2>
              <ol className="confirm__list">
                {t.confirmation.nextSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>

              <h2>{t.confirmation.docsTitle}</h2>
              <ul className="confirm__list confirm__list--docs">
                {t.confirmation.docs.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <div className="confirm__actions">
                <a
                  className="btn btn--gold"
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_clicked', { where: 'confirmation-full' })}
                >
                  {t.confirmation.whatsappCta} — {CONTACT.whatsappDisplay}
                </a>
                <Link to="/" className="btn btn--ghost-navy">
                  {t.confirmation.backHome}
                </Link>
              </div>
              <p className="confirm__wanote">{t.confirmation.whatsappNote}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
