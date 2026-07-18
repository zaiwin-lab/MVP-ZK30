import { SemakanForm } from '../components/SemakanForm'
import { usePageMeta } from '../lib/usePageMeta'
import { useEffect } from 'react'
import { track } from '../lib/analytics'
import { useI18n } from '../i18n'

/** Stage 2 route: the detailed 7-step profile */
export function ProfilePage() {
  const { t } = useI18n()
  usePageMeta(t.seo.semakan.title, t.seo.semakan.desc, '/semakan/profil')
  useEffect(() => {
    track('detailed_profile_started')
  }, [])
  return (
    <section className="section section--wash">
      <div className="container">
        <SemakanForm leadSource="profil-page" />
      </div>
    </section>
  )
}
