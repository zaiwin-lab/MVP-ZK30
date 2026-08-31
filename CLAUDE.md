# SPM2Diploma — Project Context

## Deploy SOP (Netlify manual zip — user's preferred flow)
1. `npm run build`
2. Zip the **contents** of `dist/` (including `_redirects`) as `spm2diploma-<version>-site.zip`
3. Keep the zip at the repo root (gitignored via `*-site.zip`) AND **always deliver both**: the zip as a clickable chat attachment (SendUserFile) for drag-and-drop into Netlify → Deploys → Deploy manually, plus its full path written as a clickable file reference in the message so the user can open the location and rename it.
4. Do not automate Netlify deploys via API/MCP — manual drag-and-drop only.

## V2+ Launch Edition (current)
- Homepage is 9 focused sections: Hero → Siapa Sesuai (4 audience cards) → Pengalaman Bernilai → How It Works (6 steps, incl. screening) → What You Get (config-driven) → Progression → FAQ (8) → Cohort/Organisation → QuickCheck + Final CTA.
- ONE dominant CTA everywhere: "Semak Kelayakan Percuma" (secondary: WhatsApp Advisor). Label source: `home2.ctaPrimary` / `nav.cta`.
- All new homepage copy lives in the `home2` i18n namespace (all 4 langs). New toggles/config in `programme.ts`: `BENEFITS` (show/pending per item), `PAYMENT` (no amounts until confirmed), `COHORT`, `ANALYTICS.gtmId`.
- Old heavy sections (2-pathway split, 8-step timeline, transform, official accordion, coach section) are removed from the homepage but their i18n keys + `/laluan/:id` + `/maklumat-program` pages are preserved — nothing deleted.
- Phase 2 ideas parked in `PHASE2_BACKLOG.md`. Items needing KOBIS/RATC sign-off are flagged there and in `programme.ts`.

## Key facts
- Live site: https://spm2diplomafasttrack.netlify.app
- WhatsApp: 011-2846 6813 (V2.5 prompt said 5813 — unconfirmed; single source: `src/config/programme.ts` CONTACT)
- All official facts (names, NOSS, fees, coach bio, compliance text) live in `src/config/programme.ts` — edit there only, never hardcode in components.
- `import './styles/global.css'` must stay the FIRST import in `src/main.tsx` (CSS cascade order).
- 4 languages (BM default, EN, ZH, Iban); ZH/Iban carry verification banners. `src/i18n/ms.ts` is the source of truth for the Dict type.
- Never invent official info, guarantees, or fake urgency (see banned-claims list in PRODUCT.md).
- Supabase optional: demo mode runs without env vars. Production needs migrations 0001 + 0002 (or the combined `supabase/setup.sql`) and VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Full guide: `SUPABASE_SETUP.md`.
- Lead capture (launch default, NO database): every eligibility submission also POSTs to **Netlify Forms** (`name="eligibility"`) via `src/lib/netlifyForms.ts`. A hidden static form in `index.html` registers it at build (React SPA — Netlify can't detect JS-rendered forms). Leads land in Netlify → Site → Forms; add an email notification there. Runs independently of Supabase, so leads are captured even in demo mode. Keep the field names in `index.html` in sync with the keys sent from `data.ts`.
- Semakan funnel (V2+): `src/components/QuickCheck.tsx` is a 4-step flow — 4 questions (pathway, years, role, experiences[]) → instant preliminary result (2 safe outcomes only, never "not eligible") → name + WhatsApp + consent → success with auto reference + WhatsApp Advisor (number `CONTACT.whatsappIntl` = 601128466813, message auto-fills name + reference). Copy lives in the `semak2` i18n namespace (all 4 langs); answers are stored as indices so they survive language switches; canonical labels for storage come from `ms.semak2`. Submission is **gated**: `submitPreliminaryLead` (data.ts) awaits `postToNetlify`→`response.ok` and shows success ONLY on true; on failure it keeps answers and offers Retry + WhatsApp. It also writes a secondary demo/Supabase record with `skipNetlify` (no duplicate post). New hidden-form fields: `role`, `experiences`, `result`, `consent`. Analytics events (no PII): `semak_started`, `semak_result_viewed`, `semak_submit_success`, `semak_submit_error`, `whatsapp_clicked`, `full_profile_clicked`.

## QA
Run the Playwright suite in the session scratchpad (`qa25.mjs`) against `npx vite preview --port 4173` before shipping any zip.
