# SPM2 Fast Track — Phase 2 Backlog

Ideas intentionally **parked** so they do not delay the V2+ launch. Nothing here
is cancelled — it is deferred until after we have live leads and real data.

Priority order for launch stays: **Compliance → Conversion → Simplicity → Speed → Everything else.**

## Parked (do NOT build before launch)

- Advanced AI agents / autonomous advisor
- Mobile app
- Scholarship matching
- Job matching
- Education marketplace
- Complex institutional dashboard
- Partner commission portal
- Advanced analytics & BI
- Full LMS
- Gamification
- Parent portal
- AI career matching
- National programme marketplace
- Dozens of individual qualification pages
- Sophisticated referral ecosystem

## Background AI (operations only — not customer-facing gimmicks)

Quietly assist the team, never sold as a feature:
- Lead summarisation
- Suggested follow-up messages
- Candidate notes / advisor preparation
- FAQ assistance
- Management insight

## CRM pipeline — future granularity

Current lean statuses (`config/programme.ts` → `APPLICATION_STATUSES`):
`new · in_review · contacted · qualified · follow_up · enrolled · not_suitable · withdrawn`

Target full pipeline when we outgrow the lean set (still not Salesforce):
`New Lead → Eligibility Review → Contacted → Consultation → Screening/Interview →
Qualified → Quotation → Booking/Payment → Onboarding → Active Candidate → Completed/Progression`

## Requires KOBIS / RATC confirmation before publishing

Tracked centrally in `config/programme.ts`:
- Qualification titles, DKM/DLKM levels, NOSS codes, JPK / awarding body wording
- Fees, booking fee amount, payment milestones / percentages (`PAYMENT`)
- Which benefits are formally confirmed (`BENEFITS` — items flagged `pending`)
- Duration, intake dates, recognition / equivalency / progression wording
- Funding / market-access benefits (must stay "access/opportunity", never "guaranteed")
- WhatsApp number: 011-2846 **6813** (in use) vs 5813 (old V2.5 prompt) — confirm
- GTM / GA analytics id (`ANALYTICS.gtmId`)
