import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { QuickCheck } from '../components/QuickCheck'
import { COACH, TESTIMONIALS, whatsappLink, CONTACT } from '../config/programme'
import { track } from '../lib/analytics'
import { usePageMeta } from '../lib/usePageMeta'
import { useI18n } from '../i18n'
import './home.css'

const RECEIVE_ICONS = ['🔍', '🧭', '🎓', '📁', '📋', '🎯', '📊', '🤝']

export function HomePage() {
  const { t } = useI18n()
  const { hash } = useLocation()
  usePageMeta(t.seo.home.title, t.seo.home.desc, '/')

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
  }, [hash])

  const trackCta = (where: string) => () => track('hero_cta_clicked', { where })
  const trackWa = (where: string) => () => track('whatsapp_clicked', { where })

  return (
    <>
      {/* 1 ── HERO: V1 split-screen energy, V2 credibility */}
      <section className="hero" id="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span className="hero__eyebrowrule" aria-hidden="true" />
              {t.hero.eyebrow}
            </p>
            <h1 className="hero__headline">
              <span className="hero__line">{t.hero.headline1}</span>
              <span className="hero__line hero__line--gold">{t.hero.headline2}</span>
            </h1>
            <p className="hero__support">{t.hero.support}</p>
            <ul className="hero__badges">
              {t.hero.badges.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="hero__ctas">
              <Link to="/semakan" className="btn btn--gold" onClick={trackCta('hero')}>
                {t.hero.ctaPrimary}
              </Link>
              <a href="#laluan" className="btn btn--ghost-light">
                {t.hero.ctaSecondary}
              </a>
            </div>
            <p className="hero__micro">{t.hero.ctaMicrocopy}</p>
            <p className="hero__trust">{t.hero.trust}</p>
          </div>

          {/* Premium journey card replaces the decorative area (V2.5 §7) */}
          <div className="hero__visual">
            <div className="journeycard">
              <h2 className="journeycard__title">{t.hero.card.title}</h2>
              <ol className="journeycard__steps">
                {t.hero.card.steps.map((s, i) => (
                  <li key={s}>
                    <span className="journeycard__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <Link to="/semakan" className="btn btn--gold journeycard__cta" onClick={trackCta('hero-card')}>
                {t.hero.card.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 ── CREDIBILITY STRIP (V2.5 §8) */}
      <div className="credstrip" role="list">
        {t.credStrip.map((item) => (
          <span className="credstrip__item" role="listitem" key={item}>
            <span aria-hidden="true">✦</span> {item}
          </span>
        ))}
      </div>

      {/* 3 ── PROBLEM SECTION (V2.5 §9) */}
      <section className="section" id="pengalaman">
        <div className="container">
          <Reveal>
            <p className="sectionlabel">{t.experience.label}</p>
            <h2 className="problem__title">{t.experience.title}</h2>
            <div className="gold-rule" />
            <p className="text-soft problem__intro">{t.experience.intro}</p>
          </Reveal>
          <div className="problem__grid">
            {t.experience.items.map((item, i) => (
              <Reveal key={item} delay={i * 50} className="problem__card">
                <span className="problem__tick" aria-hidden="true">
                  ✓
                </span>
                {item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ── TWO PATHWAYS (V2.5 §10) */}
      <section className="section section--ivory" id="laluan">
        <div className="container">
          <Reveal className="text-center">
            <h2>{t.pathways.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {t.pathways.intro}
            </p>
          </Reveal>
          <div className="pathsplit">
            <Reveal className="pathpanel pathpanel--navy">
              <p className="pathpanel__level">{t.pathways.card1.levelNote}</p>
              <h3 className="pathpanel__name">{t.pathways.card1.name}</h3>
              <p className="pathpanel__msg">“{t.pathways.card1.message}”</p>
              <p className="pathpanel__fortitle">{t.pathways.card1.forTitle}</p>
              <ul className="pathpanel__for">
                {t.pathways.card1.for.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="pathpanel__fortitle">{t.pathways.card1.expTitle}</p>
              <ul className="pathpanel__exp">
                {t.pathways.card1.expAreas.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <Link
                to="/laluan/keusahawanan"
                className="btn btn--gold pathpanel__cta"
                onClick={() => track('pathway_selected', { pathway: 'keusahawanan', where: 'home-cards' })}
              >
                {t.pathways.card1.cta}
              </Link>
            </Reveal>
            <Reveal delay={120} className="pathpanel pathpanel--light">
              <p className="pathpanel__level">{t.pathways.card2.levelNote}</p>
              <h3 className="pathpanel__name">{t.pathways.card2.name}</h3>
              <p className="pathpanel__msg">“{t.pathways.card2.message}”</p>
              <p className="pathpanel__fortitle">{t.pathways.card2.forTitle}</p>
              <ul className="pathpanel__for">
                {t.pathways.card2.for.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="pathpanel__fortitle">{t.pathways.card2.expTitle}</p>
              <ul className="pathpanel__exp pathpanel__exp--light">
                {t.pathways.card2.expAreas.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <Link
                to="/laluan/kepimpinan"
                className="btn btn--navy pathpanel__cta"
                onClick={() => track('pathway_selected', { pathway: 'kepimpinan', where: 'home-cards' })}
              >
                {t.pathways.card2.cta}
              </Link>
            </Reveal>
          </div>
          <Reveal className="pathunsure">
            <p className="pathunsure__q">{t.pathways.unsure.question}</p>
            <Link to="/semakan" className="btn btn--ghost-navy" onClick={trackCta('pathway-unsure')}>
              {t.pathways.unsure.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 5 ── WHAT YOU RECEIVE (V2.5 §11) */}
      <section className="section" id="manfaat">
        <div className="container">
          <Reveal className="text-center">
            <h2>{t.receive.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {t.receive.intro}
            </p>
          </Reveal>
          <div className="receive__grid">
            {t.receive.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 40} className="receive__card">
                <span className="receive__icon" aria-hidden="true">
                  {RECEIVE_ICONS[i]}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 ── MID-PAGE CONVERSION BLOCK (V2.5 §13) */}
      <section className="midcta">
        <div className="container text-center">
          <h2 className="midcta__title">{t.midCta.title}</h2>
          <p className="midcta__body">{t.midCta.body}</p>
          <div className="midcta__actions">
            <Link to="/semakan" className="btn btn--gold" onClick={trackCta('mid-page')}>
              {t.midCta.ctaPrimary}
            </Link>
            <a
              href={whatsappLink()}
              className="btn btn--ghost-light"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWa('mid-page')}
            >
              {t.midCta.ctaWhatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* 7 ── COACH ROSZIE + TEAM AUTHORITY (V2.5 §14) */}
      <section className="section section--navy" id="coach">
        <div className="container coachsec__grid">
          <Reveal className="coachsec__photo">
            {COACH.photoUrl ? (
              <img src={COACH.photoUrl} alt={COACH.name} />
            ) : (
              <div className="coachsec__placeholder" role="img" aria-label={t.coach.photoPlaceholder}>
                <svg viewBox="0 0 120 120" width="72" height="72" fill="none" stroke="var(--gold-300)" strokeWidth="3" aria-hidden="true">
                  <circle cx="60" cy="42" r="22" />
                  <path d="M18 108c6-24 22-36 42-36s36 12 42 36" strokeLinecap="round" />
                </svg>
                <p>{t.coach.photoPlaceholder}</p>
              </div>
            )}
          </Reveal>
          <div className="coachsec__copy">
            <Reveal>
              <h2>{t.coach.title}</h2>
              <div className="gold-rule" />
              <p className="coachsec__name">{COACH.name}</p>
              <ul className="coachsec__roles">
                {t.coach.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className="coachsec__bio">{COACH.bioMs}</p>
              <div className="coachsec__teamcard">
                <h3>{t.coach.teamCard.title}</h3>
                <p>{t.coach.teamCard.body}</p>
              </div>
              <blockquote className="coachsec__trust">
                <p>“{t.coach.trust}”</p>
                <p className="coachsec__trustms">{t.coach.trustMs}</p>
              </blockquote>
              <a
                href={whatsappLink()}
                className="btn btn--ghost-light"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '1.2rem' }}
                onClick={trackWa('coach')}
              >
                {t.coach.whatsappCta}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="section" id="testimoni">
          <div className="container">
            <h2 className="text-center">Testimoni</h2>
            <div className="outcomes">
              {TESTIMONIALS.map((tm) => (
                <blockquote key={tm.name} className="outcome">
                  <p>“{tm.quote}”</p>
                  <footer>
                    <strong>{tm.name}</strong> — {tm.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8 ── SUITABILITY (retained from V2) */}
      <section className="section" id="sesuai">
        <div className="container suit__grid">
          <Reveal className="suit__lead">
            <h2>{t.suitability.title}</h2>
            <div className="gold-rule" />
            <p className="suit__statement">“{t.suitability.statement}”</p>
          </Reveal>
          <ul className="suit__list">
            {t.suitability.items.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 50} className="suit__item">
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 ── EIGHT-STEP JOURNEY: premium alternating timeline (V2.5 §16) */}
      <section className="section section--wash" id="perjalanan">
        <div className="container">
          <Reveal className="text-center">
            <h2>{t.journey.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {t.journey.intro}
            </p>
          </Reveal>
          <ol className="timeline">
            {t.journey.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="timeline__step">
                <span className="timeline__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="timeline__body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 10 ── FUTURE TRANSFORMATION (V2.5 §17) */}
      <section className="section" id="transformasi">
        <div className="container">
          <Reveal>
            <h2>{t.transform.title}</h2>
            <div className="gold-rule" />
          </Reveal>
          <div className="outcomes">
            {t.transform.items.map((o, i) => (
              <Reveal key={o} delay={i * 50} className="transform__item">
                <span aria-hidden="true" className="transform__mark">
                  →
                </span>
                <p>{o}</p>
              </Reveal>
            ))}
          </div>
          <p className="outcomes__note text-soft">{t.transform.disclaimer}</p>
        </div>
      </section>

      {/* 11 ── HOW IT WORKS OFFICIALLY (V2.5 §15) + credibility accordion */}
      <section className="section section--ivory" id="kredibiliti">
        <div className="container container--narrow">
          <Reveal>
            <h2>{t.official.title}</h2>
            <div className="gold-rule" />
          </Reveal>
          <ol className="official__list">
            {t.official.points.map((p, i) => (
              <li key={p}>
                <span className="official__num" aria-hidden="true">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
          <p className="official__pending">
            <span className="pending-mark">{t.common.pendingConfirmation}</span> {t.official.pendingNote}
          </p>
          <div className="accordion">
            {t.credibility.items.map((item) => (
              <details key={item.q} className="accordion__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 ── GENUINE URGENCY (V2.5 §18) */}
      <section className="urgency">
        <div className="container text-center">
          <h2 className="urgency__title">{t.urgency.title}</h2>
          <p className="urgency__body">{t.urgency.body}</p>
          <Link to="/semakan" className="btn btn--gold" onClick={trackCta('urgency')}>
            {t.urgency.cta}
          </Link>
          <p className="urgency__promise">{t.urgency.responsePromise}</p>
        </div>
      </section>

      {/* 13 ── FAQ (V2.5 §19) */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <Reveal>
            <h2>{t.faq.title}</h2>
            <div className="gold-rule" />
          </Reveal>
          <div className="accordion">
            {t.faq.items.map((item) => (
              <details key={item.q} className="accordion__item" onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) track('faq_opened', { q: item.q.slice(0, 60) })
              }}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '1.8rem' }}>
            <a
              href={whatsappLink()}
              className="btn btn--ghost-navy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWa('faq')}
            >
              {t.midCta.ctaWhatsapp} — {CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* 14 ── 60-SECOND CHECK (embedded) */}
      <section className="section section--wash" id="semakan-embed">
        <div className="container">
          <QuickCheck leadSource="homepage" />
        </div>
      </section>

      {/* 15 ── FINAL CTA */}
      <section className="section section--navy finalcta">
        <div className="container text-center">
          <Reveal>
            <h2 className="finalcta__headline">
              {t.finalCta.headline1}
              <br />
              <span className="finalcta__gold">{t.finalCta.headline2}</span>
            </h2>
            <div className="finalcta__actions">
              <Link to="/semakan" className="btn btn--gold finalcta__btn" onClick={trackCta('final')}>
                {t.finalCta.cta}
              </Link>
              <a
                href={whatsappLink()}
                className="btn btn--ghost-light"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWa('final')}
              >
                {t.midCta.ctaWhatsapp}
              </a>
            </div>
            <p className="finalcta__trust">{t.finalCta.trust}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
