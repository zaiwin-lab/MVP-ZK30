import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { FloatingTools } from './components/FloatingTools'
import { VerificationBanner } from './components/VerificationBanner'
import { TopStrip } from './components/TopStrip'
import { captureUTM } from './lib/analytics'
import { useI18n } from './i18n'
import { HomePage } from './pages/HomePage'

const PathwayPage = lazy(() => import('./pages/PathwayPage').then((m) => ({ default: m.PathwayPage })))
const SemakanPage = lazy(() => import('./pages/SemakanPage').then((m) => ({ default: m.SemakanPage })))
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const ConfirmationPage = lazy(() =>
  import('./pages/ConfirmationPage').then((m) => ({ default: m.ConfirmationPage }))
)
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const ProgramInfoPage = lazy(() =>
  import('./pages/ProgramInfoPage').then((m) => ({ default: m.ProgramInfoPage }))
)
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const LoginPage = lazy(() => import('./portal/LoginPage').then((m) => ({ default: m.LoginPage })))
const ParticipantDashboard = lazy(() =>
  import('./portal/ParticipantDashboard').then((m) => ({ default: m.ParticipantDashboard }))
)
const AdminDashboard = lazy(() =>
  import('./portal/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
)
const DirectorDashboard = lazy(() =>
  import('./portal/DirectorDashboard').then((m) => ({ default: m.DirectorDashboard }))
)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const isPortal = ['/peserta', '/team', '/pengurusan', '/login'].some((p) => pathname.startsWith(p))

  useEffect(() => {
    captureUTM()
  }, [])

  return (
    <>
      <ScrollToTop />
      <VerificationBanner />
      {!isPortal && <TopStrip />}
      <Header />
      <main id="main">
        <Suspense
          fallback={
            <div className="section text-center" role="status">
              <p style={{ margin: '0 auto' }}>{t.common.loading}</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/laluan/:pathwayId" element={<PathwayPage />} />
            <Route path="/semakan" element={<SemakanPage />} />
            <Route path="/semakan/profil" element={<ProfilePage />} />
            <Route path="/semakan/terima-kasih" element={<ConfirmationPage />} />
            <Route path="/privasi" element={<PrivacyPage />} />
            <Route path="/maklumat-program" element={<ProgramInfoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/peserta" element={<ParticipantDashboard />} />
            <Route path="/team" element={<AdminDashboard />} />
            <Route path="/pengurusan" element={<DirectorDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {!isPortal && <FloatingTools />}
    </>
  )
}
