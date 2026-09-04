import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { QuickCheck } from '../components/QuickCheck'
import { BENEFITS, COHORT, TEAM, whatsappLink, CONTACT } from '../config/programme'

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
import { track } from '../lib/analytics'
import { usePageMeta } from '../lib/usePageMeta'
import { useI18n } from '../i18n'
import './home.css'

export function HomePage() {
  const { t } = useI18n()
  const h = t.home2
  const { hash } = useLocation()
  usePageMeta(t.seo.home.title, t.seo.home.desc, '/')

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
  }, [hash])

  const trackCta = (where: string) => () => track('hero_cta_clicked', { where })
  const trackWa = (where: string) => () => track('whatsapp_clicked', { where })

  const benefits = BENEFITS.filter((b) => b.show)

  return (
    <>
      {/* 1 ── HERO — one clear message, one primary CTA */}
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
                {h.ctaPrimary}
              </Link>
              <a
                href={whatsappLink()}
                className="btn btn--ghost-light"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWa('hero')}
              >
                {h.ctaWhatsapp}
              </a>
            </div>
            <p className="hero__micro">{t.hero.ctaMicrocopy}</p>
            <p className="hero__trust">{t.hero.trust}</p>
          </div>

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
                {h.ctaPrimary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Slim credibility strip (compact trust, not a full section) */}
      <div className="credstrip" role="list">
        {t.credStrip.map((item) => (
          <span className="credstrip__item" role="listitem" key={item}>
            <span aria-hidden="true">✦</span> {item}
          </span>
        ))}
      </div>

      {/* 2 ── SIAPA YANG SESUAI — four audience cards */}
      <section className="section" id="sesuai">
        <div className="container">
          <Reveal className="text-center">
            <p className="sectionlabel">{h.audiences.label}</p>
            <h2>{h.audiences.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {h.audiences.intro}
            </p>
          </Reveal>
          <div className="audgrid">
            {h.audiences.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 70} className="audcard">
                <span className="audcard__icon" aria-hidden="true">
                  {c.icon}
                </span>
                <h3 className="audcard__title">{c.title}</h3>
                <p className="audcard__body">{c.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2.2rem' }}>
            <Link to="/semakan" className="btn btn--gold" onClick={trackCta('audiences')}>
              {h.ctaPrimary}
            </Link>
          </div>
        </div>
      </section>

      {/* 3 ── YOUR EXPERIENCE HAS VALUE — short, respectful */}
      <section className="section section--navy valueband" id="pengalaman">
        <div className="container container--narrow text-center">
          <Reveal>
            <p className="sectionlabel sectionlabel--light">{h.value.label}</p>
            <h2 className="valueband__title">{h.value.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="valueband__body">{h.value.body}</p>
          </Reveal>
        </div>
      </section>

      {/* 4 ── HOW IT WORKS — six simple steps (screening included) */}
      <section className="section section--ivory" id="cara">
        <div className="container">
          <Reveal className="text-center">
            <h2>{h.how.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {h.how.intro}
            </p>
          </Reveal>
          <ol className="howgrid">
            {h.how.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="howstep">
                <span className="howstep__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="howstep__title">{s.title}</h3>
                  <p className="howstep__body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 ── WHAT YOU GET — benefit-led, config-driven */}
      <section className="section" id="manfaat">
        <div className="container">
          <Reveal className="text-center">
            <h2>{h.get.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {h.get.intro}
            </p>
          </Reveal>
          <div className="getgrid">
            {benefits.map((b, i) => {
              const item = h.get.items[b.id]
              return (
                <Reveal key={b.id} delay={i * 45} className="getcard">
                  <span className="getcard__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="getcard__title">{item.title}</h3>
                  <p className="getcard__body">{item.body}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6 ── YOUR PROGRESSION — simple visual */}
      <section className="section section--wash" id="progres">
        <div className="container">
          <Reveal className="text-center">
            <h2>{h.progression.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {h.progression.intro}
            </p>
          </Reveal>
          <ol className="progflow">
            {h.progression.steps.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 90} className="progstep">
                <span className="progstep__dot" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="progstep__label">{s}</span>
                {i < h.progression.steps.length - 1 && (
                  <span className="progstep__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </Reveal>
            ))}
          </ol>
          <p className="progflow__note text-soft">
            <span className="pending-mark">{t.common.pendingConfirmation}</span> {h.progression.note}
          </p>
        </div>
      </section>

      {/* 6b ── COACH & TEAM */}
      <section className="section section--ivory" id="coach">
        <div className="container">
          <Reveal className="text-center">
            <h2>{t.team2.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {t.team2.intro}
            </p>
          </Reveal>

          <Reveal className="teamcard teamcard--lead">
            {TEAM.coach.photo ? (
              <img className="teamcard__img" src={TEAM.coach.photo} alt={TEAM.coach.name} />
            ) : (
              <span className="teamcard__ph" aria-hidden="true">{initials(TEAM.coach.name)}</span>
            )}
            <h3 className="teamcard__name">{TEAM.coach.name}</h3>
            <p className="teamcard__role">{TEAM.coach.role}</p>
          </Reveal>

          <div className="teamgrid">
            {TEAM.members.map((m, i) => (
              <Reveal key={i} delay={i * 50} className="teamcard">
                {m.photo ? (
                  <img className="teamcard__img" src={m.photo} alt={m.name} />
                ) : (
                  <span className="teamcard__ph" aria-hidden="true">{initials(m.name)}</span>
                )}
                <h3 className="teamcard__name">{m.name}</h3>
                <p className="teamcard__role">{m.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 ── FAQ — curated launch set */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <Reveal>
            <h2>{h.faqTitle}</h2>
            <div className="gold-rule" />
          </Reveal>
          <div className="accordion">
            {h.faq.map((item) => (
              <details
                key={item.q}
                className="accordion__item"
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) track('faq_opened', { q: item.q.slice(0, 60) })
                }}
              >
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
              {h.ctaWhatsapp} — {CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* 8 ── ORGANISATION / COHORT — secondary conversion */}
      {COHORT.show && (
        <section className="section section--ivory" id="kohort">
          <div className="container">
            <Reveal className="cohortband">
              <div>
                <p className="sectionlabel">{h.cohort.label}</p>
                <h2 className="cohortband__title">{h.cohort.title}</h2>
                <p className="text-soft cohortband__body">{h.cohort.body}</p>
              </div>
              <a
                href={whatsappLink(COHORT.whatsappMessage)}
                className="btn btn--navy cohortband__cta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWa('cohort')}
              >
                {h.cohort.cta}
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* 9 ── FINAL CTA — embedded eligibility check + closing */}
      <section className="section section--wash" id="semakan-embed">
        <div className="container">
          <QuickCheck leadSource="homepage" />
        </div>
      </section>

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
                {h.ctaPrimary}
              </Link>
              <a
                href={whatsappLink()}
                className="btn btn--ghost-light"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWa('final')}
              >
                {h.ctaWhatsapp}
              </a>
            </div>
            <p className="finalcta__trust">{t.finalCta.trust}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
