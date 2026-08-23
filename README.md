# SPM2Diploma Participant Journey & Operations Platform

> **Maturity:** Working public programme-journey prototype · demo operations with optional Supabase

SPM2Diploma is a multilingual recruitment, eligibility and participant-support experience for experienced Malaysian entrepreneurs and organisational leaders exploring skills-based qualification pathways while continuing their work.

**Live demonstration:** [spm2diplomafasttrack.netlify.app](https://spm2diplomafasttrack.netlify.app/)

## Business problem

Experienced practitioners may have years of real business or leadership capability but limited visibility of structured qualification pathways. Programme teams, meanwhile, need to explain requirements, collect serious enquiries, manage applications and give participants progress visibility without immediately purchasing a large education-management system.

## Intended users

- Experienced entrepreneurs and business owners
- Cooperative, NGO and organisational leaders
- Prospective participants completing an initial eligibility check
- Programme administrators managing applications and updates
- Programme directors reviewing participation and manually entered finance information

## Demonstrated capabilities

- Malay-first public programme journey with English, Chinese and Iban options
- Two configurable qualification-pathway presentations
- Multi-step eligibility and profile-completion flows
- Netlify Forms lead capture that can operate without Supabase
- Participant dashboard for individual application visibility
- Administrative application-management dashboard
- Director view with programme and finance summaries
- Demo logins and browser-local records for stakeholder testing
- Optional Supabase authentication, database tables and role-aware RLS policies
- Central configuration for programme names, references, fees, contacts and verification links

## Strategic value

The platform demonstrates a proportionate hybrid model: digital tools handle discovery, qualification, records and visibility, while coaching, evidence review, WhatsApp guidance and programme decisions remain human-led. This allows a programme team to validate demand and workflow before expanding into a larger operational system.

## What is actually implemented

Without Supabase credentials, all participant, administrator and director journeys operate in a clearly labelled browser-local demonstration mode. Demo accounts, sample applications, updates and finance entries are not real programme records.

The code includes a Supabase adapter and migrations for profiles, applications, programme updates and finance entries. RLS policies separate participant, administrator and director access, including participant-only access to their own linked application and director-only finance access. Operational use still requires a configured Supabase project, account provisioning, policy testing and data-governance controls.

The public eligibility journey also posts defined fields to Netlify Forms. A successful submission confirms technical receipt only; it does not establish eligibility, admission, qualification award or payment acceptance.

No AI assessment or autonomous admissions decision is implemented.

## Technology

- React 18, TypeScript and Vite
- React Router
- Supabase Auth, PostgreSQL and Row Level Security
- Netlify Forms for lightweight lead capture
- Browser localStorage demonstration adapter
- Config-driven programme facts
- Multilingual content dictionaries
- Netlify deployment configuration

## Delivery role

**Ts. Zaiwin Kassim** leads product strategy, participant-journey design, programme-workflow architecture and supervised AI-assisted delivery with the **KOBIS AI Prodigy Team**. This portfolio record demonstrates product and delivery capability; it does not claim accreditation authority, enrolment outcomes, qualification awards or endorsement by any external institution.

## Responsible-use boundaries

- Qualification names, levels, NOSS references, fees, durations, trainer details and verification links marked pending in the configuration must be formally confirmed before publication or enrolment.
- The platform must not imply guaranteed eligibility, admission, graduation, employment, income or government recognition.
- All partner, trainer, accreditation and institutional references require current written authorisation.
- Chinese and Iban translations flagged for review require qualified human verification.
- Eligibility submissions can contain identity, employment and experience information; production use requires clear consent, privacy notices, retention periods and restricted access.
- Admissions and evidence decisions must remain with authorised human assessors using published criteria and an appeal or correction route.
- Finance records are manual operational entries, not audited accounts or payment-provider confirmations.
- Demo credentials and sample data must never be reused as production security controls.

## Current limitations

- Supabase is optional and may not be connected on the public demonstration.
- Programme facts remain configurable and some are explicitly pending confirmation.
- Coaching, evidence review, document validation and WhatsApp communication remain manual.
- No learning-management, accreditation-registry, payment-gateway or certificate-verification integration is evidenced.
- The prototype does not verify applicant identity or prior experience.
- Automated accessibility, security, integration and user-acceptance testing are not evidenced.

## Run locally

```bash
npm install
npm run dev
npm run build
```

The application runs in demo mode until valid Supabase environment variables are supplied.

## Portfolio evidence

SPM2Diploma demonstrates multilingual service design, human-in-the-loop programme operations, configurable facts, role-aware data architecture and careful separation between lead capture, eligibility exploration and authoritative qualification decisions.
