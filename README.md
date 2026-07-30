# SPM2Diploma 2.0 — KOBIS Berhad × Coach Roszie

High-conversion marketing and participant recruitment website for two Malaysian
Skills qualifications, with a lightweight participant portal, team operations
dashboard and management overview. Deliberately hybrid: the website markets,
qualifies and organises; Coach Roszie and the team continue coaching, document
review and WhatsApp communication manually.

## Stack

- **Vite + React 18 + TypeScript** single-page app (Netlify-ready, see `netlify.toml`)
- **Supabase** (optional at first): auth, Postgres, Row Level Security — schema in `supabase/migrations/0001_init.sql`
- **Demo mode**: with no Supabase env vars, every journey works locally against
  browser storage so the whole flow can be tested before credentials exist
- Self-hosted fonts (`public/fonts/`) — no external font dependency

## Run

```bash
npm install
npm run dev        # local development
npm run build      # production build → dist/
```

## Deploy (Netlify)

1. Connect this repo, build command `npm run build`, publish directory `dist`.
2. (When ready) create a Supabase project, run `supabase/migrations/0001_init.sql`
   in the SQL editor, then set in Netlify environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Create team accounts in Supabase Auth, then set their `role` in the
   `profiles` table (`admin` or `director`). Link a participant's auth user to
   their application via `applications.user_id`.

Without step 2 the site runs in clearly-labelled demo mode (demo logins are
shown on the login page).

## Where things live

| Concern | Location |
|---|---|
| **All official facts** (programme names, NOSS refs, fees, contact, coach bio) | `src/config/programme.ts` — single editable file, placeholder-marked |
| Translations (BM default, EN, 中文, Iban) | `src/i18n/*.ts` — ZH/Iban flagged for human verification |
| Marketing pages | `src/pages/` |
| Semakan Kelayakan (7-step form) | `src/components/SemakanForm.tsx` |
| Portal (participant / Team Access / Management Access) | `src/portal/` |
| Data adapter (Supabase ⇄ demo mode) | `src/lib/data.ts` |
| Database schema + RLS policies | `supabase/migrations/0001_init.sql` |
| Design system | `DESIGN.md`, `src/styles/global.css` |

## Access model (enforced by RLS in production)

- **Public** — marketing site + anonymous Semakan Kelayakan submission (insert-only)
- **Participant** (`/login` → `/peserta`) — sees only their own application; internal notes are never exposed
- **Programme Admin** (footer → Team Access `/team`) — applicant operations; **no finance access**
- **Programme Director** (footer → Management Access `/pengurusan`) — everything + simple manually-entered finance

## Before public launch (requires KOBIS/RATC confirmation)

Search the codebase for `pendingConfirmation`, `[Untuk pengesahan`, and
`PLACEHOLDER`: official qualification names, NOSS references, fees, Coach
Roszie's biography/photo, verification links, and verified 中文/Iban
translations must be confirmed and filled in `src/config/programme.ts` and
`src/i18n/`.


---

## Portfolio Status & Delivery Role

**Status:** Configurable training-journey and programme-operations prototype.

Product strategy, programme workflow architecture and solution direction are led by **Zaiwin Kassim**, together with the **KOBIS AI Prodigy Team**, using supervised AI-assisted development.

Programme names, partner references, fees, biographies and translations must be verified and authorised before public production use. The prototype demonstrates capability and does not by itself imply commissioning or endorsement by any external organisation.
