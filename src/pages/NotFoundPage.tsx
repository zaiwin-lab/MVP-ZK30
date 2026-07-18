import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { usePageMeta } from '../lib/usePageMeta'

export function NotFoundPage() {
  const { t } = useI18n()
  usePageMeta(`404 — ${t.notFound.title}`, t.notFound.body, '/404')
  return (
    <section className="section text-center">
      <div className="container container--narrow">
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--gold-600)', fontWeight: 700 }}>
          404
        </p>
        <h1>{t.notFound.title}</h1>
        <p className="text-soft" style={{ margin: '0.8rem auto 1.6rem' }}>
          {t.notFound.body}
        </p>
        <Link to="/" className="btn btn--navy">
          {t.notFound.cta}
        </Link>
      </div>
    </section>
  )
}
