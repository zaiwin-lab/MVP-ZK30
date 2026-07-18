import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { SemakanForm } from '../components/SemakanForm'
import { COACH, PATHWAYS, TESTIMONIALS } from '../config/programme'
import { useI18n } from '../i18n'
import './home.css'

/** Ascending-path motif: the brand's "earned climb" in quiet gold lines */
function AscentMotif() {
  return (
    <svg className="hero__motif" viewBox="0 0 560 480" fill="none" aria-hidden="true" focusable="false">
      <g stroke="var(--gold-300)" strokeWidth="1.5" opacity="0.5">
        <path d="M40 440 H180 V360 H320 V280 H460 V200" />
        <path d="M80 470 H220 V390 H360 V310 H500 V230" opacity="0.4" />
      </g>
      <g stroke="var(--gold-500)" strokeWidth="2.5">
        <path className="hero__motifpath" d="M20 420 H160 V340 H300 V260 H440 V180 H540" />
      </g>
      <circle cx="540" cy="180" r="7" fill="var(--gold-500)" />
      <g fill="var(--gold-300)" opacity="0.85">
        <circle cx="160" cy="340" r="4" />
        <circle cx="300" cy="260" r="4" />
        <circle cx="440" cy="180" r="4" />
      </g>
    </svg>
  )
}

export function HomePage() {
  const { t } = useI18n()
  const { hash } = useLocation()

  // Support /#section deep links arriving from other routes
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
  }, [hash])

  return (
    <>
      {/* 1 ── ASPIRATIONAL HERO */}
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
            <div className="hero__ctas">
              <Link to="/semakan" className="btn btn--gold">
                {t.hero.ctaPrimary}
              </Link>
              <a href="#laluan" className="btn btn--ghost-light">
                {t.hero.ctaSecondary}
              </a>
            </div>
            <p className="hero__micro">{t.hero.ctaMicrocopy}</p>
            <p className="hero__trust">{t.hero.trust}</p>
          </div>
          <div className="hero__visual">
            <AscentMotif />
          </div>
        </div>
      </section>

      {/* 2 ── YOUR EXPERIENCE DESERVES TO GO FURTHER */}
      <section className="section" id="pengalaman">
        <div className="container exp__grid">
          <Reveal className="exp__lead">
            <h2>{t.experience.title}</h2>
            <div className="gold-rule" />
            <p className="text-soft">{t.experience.intro}</p>
          </Reveal>
          <ul className="exp__list">
            {t.experience.items.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 60} className="exp__item">
                <span className="exp__tick" aria-hidden="true">
                  ✓
                </span>
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 ── CHOOSE YOUR PATHWAY: asymmetric paired panels */}
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
              <Link to={`/laluan/${PATHWAYS.keusahawanan.id}`} className="btn btn--gold pathpanel__cta">
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
              <Link to={`/laluan/${PATHWAYS.kepimpinan.id}`} className="btn btn--navy pathpanel__cta">
                {t.pathways.card2.cta}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 ── WHAT COULD CHANGE FOR YOU? */}
      <section className="section" id="perubahan">
        <div className="container">
          <Reveal>
            <h2>{t.outcomes.title}</h2>
            <div className="gold-rule" />
          </Reveal>
          <div className="outcomes">
            {t.outcomes.items.map((o, i) => (
              <Reveal key={o.title} delay={i * 50} className="outcome">
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="outcomes__note text-soft">{t.outcomes.note}</p>
        </div>
      </section>

      {/* 5 ── COACH ROSZIE AND THE SPM2DIPLOMA TEAM */}
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
              <p className="coachsec__team">{t.coach.teamNote}</p>
              <blockquote className="coachsec__trust">
                <p>“{t.coach.trust}”</p>
                <p className="coachsec__trustms">{t.coach.trustMs}</p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Real testimonials only — section stays hidden while none are supplied */}
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

      {/* 6 ── IS THIS JOURNEY FOR YOU? */}
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

      {/* 7 ── YOUR GUIDED JOURNEY: a real ordered sequence */}
      <section className="section section--wash" id="perjalanan">
        <div className="container">
          <Reveal className="text-center">
            <h2>{t.journey.title}</h2>
            <div className="gold-rule gold-rule--center" />
            <p className="text-soft" style={{ margin: '0 auto' }}>
              {t.journey.intro}
            </p>
          </Reveal>
          <ol className="journeyrail">
            {t.journey.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="journeystep">
                <span className="journeystep__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 ── PROGRAMME CREDIBILITY (expandable; formal terms only here) */}
      <section className="section section--ivory" id="kredibiliti">
        <div className="container container--narrow">
          <Reveal>
            <h2>{t.credibility.title}</h2>
            <div className="gold-rule" />
            <p className="text-soft">{t.credibility.intro}</p>
          </Reveal>
          <div className="accordion">
            {t.credibility.items.map((item) => (
              <details key={item.q} className="accordion__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <p className="cred__disclaimer">
            <span className="pending-mark">{t.common.pendingConfirmation}</span> {t.credibility.disclaimer}
          </p>
        </div>
      </section>

      {/* 9 ── FAQ */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <Reveal>
            <h2>{t.faq.title}</h2>
            <div className="gold-rule" />
          </Reveal>
          <div className="accordion">
            {t.faq.items.map((item) => (
              <details key={item.q} className="accordion__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10 ── SEMAK KELAYAKAN (embedded application) */}
      <section className="section section--wash" id="semakan-embed">
        <div className="container">
          <SemakanForm leadSource="homepage" />
        </div>
      </section>

      {/* 11 ── FINAL CTA */}
      <section className="section section--navy finalcta">
        <div className="container text-center">
          <Reveal>
            <h2 className="finalcta__headline">
              {t.finalCta.headline1}
              <br />
              <span className="finalcta__gold">{t.finalCta.headline2}</span>
            </h2>
            <Link to="/semakan" className="btn btn--gold finalcta__btn">
              {t.finalCta.cta}
            </Link>
            <p className="finalcta__trust">{t.finalCta.trust}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
