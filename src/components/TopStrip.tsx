import { Link } from 'react-router-dom'
import { INTAKE } from '../config/programme'
import { track } from '../lib/analytics'
import { useI18n } from '../i18n'

/** Slim premium conversion strip above the navigation (V2.5 §6) */
export function TopStrip() {
  const { t } = useI18n()
  if (!INTAKE.reviewsOpen) return null
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, oklch(0.28 0.075 265), oklch(0.32 0.08 265))',
        color: 'var(--gold-300)',
        fontSize: '0.85rem',
        fontWeight: 600,
        textAlign: 'center',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.8rem',
        flexWrap: 'wrap',
      }}
    >
      <span>{t.strip.text}</span>
      <Link
        to="/semakan"
        style={{ color: 'var(--on-navy)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}
        onClick={() => track('hero_cta_clicked', { where: 'top-strip' })}
      >
        {t.strip.cta}
      </Link>
    </div>
  )
}
