import { useI18n } from '../i18n'
import { usePageMeta } from '../lib/usePageMeta'

export function PrivacyPage() {
  const { t } = useI18n()
  usePageMeta(t.seo.privacy.title, t.seo.privacy.desc, '/privasi')
  return (
    <section className="section">
      <div className="container container--narrow">
        <h1>{t.privacy.title}</h1>
        <div className="gold-rule" />
        {t.privacy.body.map((p) => (
          <p key={p} style={{ marginTop: '1rem', lineHeight: 1.75 }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}
