/**
 * Netlify Forms lead capture.
 *
 * Every eligibility submission is POSTed here so it lands in the Netlify
 * dashboard (Site → Forms) and triggers an email notification — no database
 * required. This runs INDEPENDENTLY of Supabase/demo mode: even with no
 * backend configured, leads are still captured for WhatsApp follow-up.
 *
 * How it works: a hidden static <form name="eligibility"> in index.html lets
 * Netlify's build bot register the form; the app submits to it via fetch.
 * Netlify only stores fields that exist in that hidden form, so keep the two
 * field lists in sync (index.html ⇄ the keys sent below).
 *
 * On localhost (no Netlify) the POST simply fails and is swallowed — we never
 * block the applicant's flow on lead-capture.
 */

export const NETLIFY_FORM_NAME = 'eligibility'

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')
}

export async function submitToNetlify(fields: Record<string, unknown>): Promise<void> {
  try {
    const data: Record<string, string> = { 'form-name': NETLIFY_FORM_NAME }
    for (const [key, value] of Object.entries(fields)) {
      if (value === null || value === undefined || value === '') continue
      data[key] = Array.isArray(value) ? value.join(', ') : String(value)
    }
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data),
    })
  } catch {
    /* Never block the funnel if lead-capture fails (e.g. offline / localhost). */
  }
}
