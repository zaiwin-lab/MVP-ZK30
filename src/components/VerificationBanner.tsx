import { NEEDS_VERIFICATION, useI18n } from '../i18n'

/**
 * Shown only for languages whose translations await human verification
 * (spec N: ZH / Iban must be clearly marked, never silently trusted).
 */
export function VerificationBanner() {
  const { lang, t } = useI18n()
  if (!NEEDS_VERIFICATION.includes(lang) || !t.meta.verificationNotice) return null
  return (
    <div
      role="note"
      style={{
        background: 'var(--gold-300)',
        color: 'var(--navy-900)',
        fontSize: '0.85rem',
        fontWeight: 600,
        textAlign: 'center',
        padding: '0.45rem 1rem',
      }}
    >
      {t.meta.verificationNotice}
    </div>
  )
}
