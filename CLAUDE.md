# SPM2Diploma — Project Context

## Deploy SOP (Netlify manual zip — user's preferred flow)
1. `npm run build`
2. Zip the **contents** of `dist/` (including `_redirects`) as `spm2diploma-<version>-site.zip`
3. **Always deliver the zip as a clickable chat attachment (SendUserFile)** — never only drop it in the folder. The user drags the attachment straight into Netlify → Deploys → Deploy manually.
4. Do not automate Netlify deploys via API/MCP — manual drag-and-drop only.

## Key facts
- Live site: https://spm2diplomafasttrack.netlify.app
- WhatsApp: 011-2846 6813 (V2.5 prompt said 5813 — unconfirmed; single source: `src/config/programme.ts` CONTACT)
- All official facts (names, NOSS, fees, coach bio, compliance text) live in `src/config/programme.ts` — edit there only, never hardcode in components.
- `import './styles/global.css'` must stay the FIRST import in `src/main.tsx` (CSS cascade order).
- 4 languages (BM default, EN, ZH, Iban); ZH/Iban carry verification banners. `src/i18n/ms.ts` is the source of truth for the Dict type.
- Never invent official info, guarantees, or fake urgency (see banned-claims list in PRODUCT.md).
- Supabase optional: demo mode runs without env vars. Production needs migrations 0001 + 0002 and VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.

## QA
Run the Playwright suite in the session scratchpad (`qa25.mjs`) against `npx vite preview --port 4173` before shipping any zip.
