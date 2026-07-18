import { Link, Navigate, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { COMPLIANCE, PATHWAYS, whatsappLink } from '../config/programme'
import { track } from '../lib/analytics'
import { usePageMeta } from '../lib/usePageMeta'
import { useI18n } from '../i18n'
import './pathway.css'

export function PathwayPage() {
  const { pathwayId } = useParams()
  const { t } = useI18n()
  const isValid = pathwayId === 'keusahawanan' || pathwayId === 'kepimpinan'
  const seo = pathwayId === 'kepimpinan' ? t.seo.pathway2 : t.seo.pathway1
  usePageMeta(seo.title, seo.desc, `/laluan/${pathwayId ?? ''}`)

  if (!isValid) {
    return <Navigate to="/" replace />
  }

  const cfg = PATHWAYS[pathwayId]
  const card = pathwayId === 'keusahawanan' ? t.pathways.card1 : t.pathways.card2
  const journeySteps = t.journey.steps

  return (
    <>
      <section className="pathhero">
        <div className="container">
          <Reveal>
            <p className="pathhero__level">{card.levelNote}</p>
            <h1 className="pathhero__name">{card.name}</h1>
            {cfg.pendingConfirmation ? (
              /* Unconfirmed official names/NOSS are never shown as fact (V2.5 §10, §15) */
              <p className="pathhero__official">
                <span className="pending-mark">{t.common.pendingConfirmation}</span> {t.official.pendingNote}
              </p>
            ) : (
              <p className="pathhero__official">
                {cfg.officialNameMs}
                {' · '}
                <span className="pathhero__noss">NOSS: {cfg.nossRef}</span>
              </p>
            )}
            <p className="pathhero__msg">“{card.message}”</p>
            <div className="pathhero__ctas">
              <Link to="/semakan" className="btn btn--gold">
                {t.nav.cta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container pathdetail">
          <Reveal className="pathdetail__col">
            <h2>{card.forTitle}</h2>
            <div className="gold-rule" />
            <ul className="pathdetail__for">
              {card.for.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <blockquote className="pathdetail__compliance">
              <p>{COMPLIANCE.eligibilityMs}</p>
            </blockquote>
          </Reveal>
          <Reveal delay={100} className="pathdetail__col">
            <h2>{t.journey.title}</h2>
            <div className="gold-rule" />
            <ol className="pathdetail__steps">
              {journeySteps.map((s, i) => (
                <li key={s.title}>
                  <span className="pathdetail__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  {s.title}
                </li>
              ))}
            </ol>
            <blockquote className="pathdetail__compliance">
              <p>{COMPLIANCE.certificationMs}</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section section--navy text-center">
        <div className="container">
          <h2 style={{ color: 'var(--on-navy)' }}>{t.finalCta.headline2}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.9rem', marginTop: '1.6rem' }}>
            <Link to="/semakan" className="btn btn--gold" onClick={() => track('hero_cta_clicked', { where: 'pathway-page' })}>
              {t.finalCta.cta}
            </Link>
            <a
              href={whatsappLink()}
              className="btn btn--ghost-light"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_clicked', { where: 'pathway-page' })}
            >
              {t.midCta.ctaWhatsapp}
            </a>
          </div>
          <p className="finalcta__trust">{t.finalCta.trust}</p>
        </div>
      </section>
    </>
  )
}
