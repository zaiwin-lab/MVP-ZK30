import { QuickCheck } from '../components/QuickCheck'
import { usePageMeta } from '../lib/usePageMeta'
import { useI18n } from '../i18n'

/** Stage 1 route: the 60-second preliminary check */
export function SemakanPage() {
  const { t } = useI18n()
  usePageMeta(t.seo.semakan.title, t.seo.semakan.desc, '/semakan')
  return (
    <section className="section section--wash">
      <div className="container">
        <QuickCheck leadSource="semakan-page" />
      </div>
    </section>
  )
}
