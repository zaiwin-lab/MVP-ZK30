import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ms } from './ms'
import { en } from './en'
import { zh } from './zh'
import { iban } from './iban'

export type Lang = 'ms' | 'en' | 'zh' | 'iban'
export type Dict = typeof ms

export const LANGS: { code: Lang; label: string; htmlLang: string }[] = [
  { code: 'ms', label: 'BM', htmlLang: 'ms' },
  { code: 'en', label: 'EN', htmlLang: 'en' },
  { code: 'zh', label: '中文', htmlLang: 'zh' },
  { code: 'iban', label: 'Iban', htmlLang: 'iba' },
]

const DICTS: Record<Lang, Dict> = { ms, en, zh, iban }

/** Languages whose translations still require human verification (spec N) */
export const NEEDS_VERIFICATION: Lang[] = ['zh', 'iban']

const STORAGE_KEY = 'spm2d.lang'

interface I18nValue {
  lang: Lang
  t: Dict
  setLang: (l: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && saved in DICTS ? (saved as Lang) : 'ms'
  })

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }, [])

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang)
    document.documentElement.lang = meta?.htmlLang ?? 'ms'
    document.documentElement.classList.toggle('lang-zh', lang === 'zh')
  }, [lang])

  const value = useMemo(() => ({ lang, t: DICTS[lang], setLang }), [lang, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
