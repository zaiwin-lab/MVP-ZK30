# Supabase Setup — SPM2Diploma

The app runs in **demo mode** (localStorage, no real persistence) until two
env vars are set. Switching to a real database is 5 steps and ~10 minutes.

## 1. Create the project
[app.supabase.com](https://app.supabase.com) → **New project**. Pick a region
close to Malaysia (e.g. Singapore `ap-southeast-1`). Save the database password
somewhere safe.

## 2. Run the schema
Dashboard → **SQL Editor** → **New query** → paste the entire contents of
[`supabase/setup.sql`](supabase/setup.sql) → **Run**.

This creates all tables, Row Level Security policies, the auto-profile trigger,
and the two-stage `complete_profile` RPC. It is idempotent — safe to re-run.

## 3. Copy the API keys
Dashboard → **Project Settings → API**. Copy:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon / public** key → `VITE_SUPABASE_ANON_KEY`

> Use the **anon** key only. Never put the `service_role` key in the frontend
> or in any committed file.

## 4. Wire the keys
- **Local dev:** paste them into `.env.local` (gitignored), then `npm run dev`.
- **Production (Netlify):** Site settings → **Environment variables** → add both
  keys → **Redeploy**. (For the manual-zip flow, env vars are read at build time,
  so build locally with `.env.local` set, or let Netlify build with its own vars.)

The app auto-detects: if both vars are present it uses Supabase; otherwise demo
mode. No code change needed — see `src/lib/data.ts`.

## 5. Create team accounts + roles
Every new signup starts as `participant`. To make staff:

1. Have each team member sign up (app `/login` → register, or Dashboard →
   **Authentication → Users → Add user**).
2. Promote them in SQL Editor:
   ```sql
   update profiles set role = 'director' where email = 'you@example.com';
   update profiles set role = 'admin'    where email = 'staff@example.com';
   ```

Roles: `participant` (own row only) · `admin` (operations, **no finance**) ·
`director` (everything incl. finance).

## Verify
- `select email, role from profiles;` shows your team.
- Submit a test eligibility check on the live site → a row appears in
  `applications` (Dashboard → Table Editor).
- The footer / dashboards stop showing the demo-mode label.

## Email auth note
By default Supabase requires email confirmation. For a smoother launch you can
turn off confirmations at **Authentication → Providers → Email** (or configure
an SMTP sender) — your call based on how you onboard the team.
