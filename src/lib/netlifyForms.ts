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

function buildBody(fields: Record<string, unknown>): string {
  const data: Record<string, string> = { 'form-name': NETLIFY_FORM_NAME }
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined || value === '') continue
    data[key] = Array.isArray(value) ? value.join(', ') : String(value)
  }
  return encode(data)
}

/**
 * Fire-and-forget capture — used for background/secondary submissions where
 * the applicant's flow must never block on the result.
 */
export async function submitToNetlify(fields: Record<string, unknown>): Promise<void> {
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: buildBody(fields),
    })
  } catch {
    /* Never block the funnel if lead-capture fails (e.g. offline / localhost). */
  }
}

/**
 * Gated capture — awaits Netlify and reports whether it actually accepted the
 * submission (response.ok). The funnel shows success ONLY when this is true,
 * so a network/Netlify failure never presents a false confirmation.
 */
export async function postLeadToNetlify(fields: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: buildBody(fields),
    })
    return res.ok
  } catch {
    return false
  }
}
