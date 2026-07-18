import { useI18n } from '../i18n'

export function ProgramInfoPage() {
  const { t } = useI18n()
  return (
    <section className="section">
      <div className="container container--narrow">
        <h1>{t.programInfo.title}</h1>
        <div className="gold-rule" />
        {t.programInfo.body.map((p) => (
          <p key={p} style={{ marginTop: '1rem', lineHeight: 1.75 }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}
