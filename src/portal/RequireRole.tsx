import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useI18n } from '../i18n'
import type { Role } from '../lib/types'

/**
 * Route guard. UI-level convenience only — real enforcement is RLS (spec M):
 * even a bypassed guard cannot read rows the database policy denies.
 */
export function RequireRole({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { profile, loading } = useAuth()
  const { t } = useI18n()
  const location = useLocation()

  if (loading) {
    return (
      <div className="portal">
        <div className="container portal__empty" role="status">
          {t.common.loading}
        </div>
      </div>
    )
  }
  if (!profile) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  if (!roles.includes(profile.role)) {
    // Directors may open the admin dashboard; everyone else goes to their own home
    const home = profile.role === 'admin' ? '/team' : profile.role === 'director' ? '/pengurusan' : '/peserta'
    return <Navigate to={home} replace />
  }
  return <>{children}</>
}
