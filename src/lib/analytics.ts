/**
 * Lightweight route-level analytics (spec V2.5 §25).
 * Events go to window.dataLayer (GTM/GA pick them up automatically when a
 * tag is installed) and to a local ring buffer for debugging. UTM params
 * are captured once and preserved across the whole conversion journey.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const UTM_KEY = 'spm2d.utm'
const BUFFER_KEY = 'spm2d.events'
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

/** Capture UTM parameters on first load; persist for the session */
export function captureUTM(): void {
  try {
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    for (const key of UTM_PARAMS) {
      const v = params.get(key)
      if (v) utm[key] = v
    }
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm))
    }
  } catch {
    /* storage unavailable */
  }
}

export function getUTM(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? '{}')
  } catch {
    return {}
  }
}

/** Compose lead_source string with preserved UTM data */
export function leadSourceWithUTM(base: string): string {
  const utm = getUTM()
  const parts = [base]
  if (utm.utm_source) parts.push(`src:${utm.utm_source}`)
  if (utm.utm_campaign) parts.push(`cmp:${utm.utm_campaign}`)
  if (utm.utm_medium) parts.push(`med:${utm.utm_medium}`)
  return parts.join(' | ')
}

export function track(event: string, props: Record<string, unknown> = {}): void {
  const payload = {
    event,
    ...props,
    ...getUTM(),
    path: window.location.pathname,
    lang: localStorage.getItem('spm2d.lang') ?? 'ms',
    device: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1100 ? 'tablet' : 'desktop',
    ts: new Date().toISOString(),
  }
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)
  try {
    const buf = JSON.parse(localStorage.getItem(BUFFER_KEY) ?? '[]') as unknown[]
    buf.push(payload)
    localStorage.setItem(BUFFER_KEY, JSON.stringify(buf.slice(-200)))
  } catch {
    /* ignore quota errors */
  }
}
