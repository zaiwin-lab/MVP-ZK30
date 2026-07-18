# Design

## Theme

Modern Academic Prestige × Entrepreneurial Achievement × Sarawak Professional Identity. The physical object: a convocation programme printed on heavy stock — deep navy cover, gold foil rule, ivory pages. Committed color strategy: navy carries the ceremonial surfaces (hero, footer, CTA bands), white/ivory carry the reading surfaces, gold is the earned accent (rules, keylines, moments of achievement), success green appears only for confirmed/positive states.

Scene: a 44-year-old business owner in Kuching, evening, phone in hand after closing the shop — the page must feel like a dignified institution that respects them, readable in one hand, warm light not cold SaaS.

## Color palette (OKLCH)

| Token | Value | Role |
|---|---|---|
| `--navy-900` | `oklch(0.24 0.07 265)` | Deep navy — hero/footer drench, display text on light |
| `--navy-700` | `oklch(0.32 0.08 265)` | Elevated navy surfaces, hover |
| `--navy-100` | `oklch(0.93 0.02 265)` | Navy tint wash for quiet sections |
| `--gold-500` | `oklch(0.72 0.12 85)` | Refined gold — rules, accents, primary CTA |
| `--gold-600` | `oklch(0.66 0.13 80)` | Gold hover / on-ivory accessible accent |
| `--gold-300` | `oklch(0.85 0.09 90)` | Gold whisper — keylines on navy |
| `--ivory` | `oklch(0.97 0.008 85)` | Warm ivory — deliberate alternating sections only, never default body |
| `--white` | `oklch(1 0 0)` | Default reading background |
| `--ink` | `oklch(0.22 0.02 265)` | Body text on light |
| `--ink-soft` | `oklch(0.42 0.02 265)` | Secondary text (still ≥4.5:1 on white/ivory) |
| `--green-600` | `oklch(0.55 0.12 155)` | Success/confirmed only |
| `--red-600` | `oklch(0.55 0.18 25)` | Validation errors only |

On-navy text: `oklch(0.97 0.01 85)` (warm white) and `--gold-300` for accents. Never gray-on-navy.

## Typography

- **Display:** "Source Serif 4" — editorial gravity without magazine affectation; weights 500–700; `text-wrap: balance`; letter-spacing ≥ -0.02em; clamp ceiling 4.5rem.
- **Body/UI:** "Hanken Grotesk" — humanist warmth, professional; 400/500/600/700.
- **CJK fallback:** `'Noto Sans SC', sans-serif` appended for 中文.
- Modular scale ratio ≥1.28. Body 1rem/1.65, max 70ch. No all-caps body. Kickers used once as a named system (gold rule + small caps) on the hero only — not per-section grammar.

## Layout

- Max content width 1140px; forms 640px; dashboards 1280px.
- Fluid section spacing `clamp(4rem, 9vw, 7.5rem)`; tight inner groupings.
- Two-pathway split uses an asymmetric paired panel (navy vs ivory) — not identical card grid.
- Dashboards (product register): calm single-column + summary strip, no chart walls.
- Semantic z-scale: `--z-nav:100; --z-sticky:200; --z-float:300; --z-modal-backdrop:400; --z-modal:500; --z-toast:600`.

## Components

- **Buttons:** primary = gold on navy / navy on light, 12px radius, verb+object labels; large touch targets ≥48px.
- **Pathway panels:** editorial split panels with serif headline, audience list, single CTA.
- **Progress meter:** 8-stage horizontal rail (vertical on mobile), gold fill to current stage, green check for done.
- **Form steps:** one question group per screen, top progress indicator "Langkah X / 7", inline validation, no hidden continue buttons.
- **Floating tools:** WhatsApp bubble bottom-right, Digital Officer bottom-left, sticky mobile CTA bottom-center — mutually exclusive safe areas, hide sticky CTA when form in view.
- **Editable-fact fields:** all official facts render from `src/config/programme.ts`; unverified values display with a subtle "untuk pengesahan" admin-visible marker, never invented.

## Motion

Subtle premium: one orchestrated hero reveal (serif headline rise + gold rule draw), scroll reveals only where they add meaning, ease-out-quint 400–600ms, stagger ≤80ms. Everything visible by default (reveals enhance, never gate). Full `prefers-reduced-motion` fallback to instant/crossfade. No bounce, no confetti, no parallax excess.
