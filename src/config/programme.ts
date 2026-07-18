/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SPM2DIPLOMA — EDITABLE OFFICIAL CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Every official fact the website displays lives HERE and only here.
 * Edit this file to update programme names, NOSS references, fees, durations,
 * contact details and verification links across the entire site.
 *
 * Fields marked `pendingConfirmation: true` are displayed with placeholder
 * treatment and MUST be confirmed by KOBIS / RATC before launch.
 * Do NOT invent accreditations, statistics, testimonials or guarantees.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface PathwayConfig {
  id: 'keusahawanan' | 'kepimpinan'
  /** Public marketing name (BM) */
  marketingName: string
  /** Official qualification title — EDITABLE, confirm with JPK/RATC */
  officialName: string
  officialNameMs: string
  level: string
  nossRef: string
  pendingConfirmation: boolean
  /** Verification link for the qualification, when officially available */
  verificationUrl: string | null
}

export const PATHWAYS: Record<'keusahawanan' | 'kepimpinan', PathwayConfig> = {
  keusahawanan: {
    id: 'keusahawanan',
    marketingName: 'Diploma Kemahiran Keusahawanan',
    officialName: 'Diploma Kemahiran Malaysia — Level 4 · Micro & Small Entrepreneurship Management',
    officialNameMs: 'Diploma Kemahiran Malaysia — Tahap 4 · Pengurusan Keusahawanan Mikro dan Kecil',
    level: 'DKM Tahap 4',
    // Project materials also reference: Small & Medium Entrepreneurship Management /
    // Pengurusan Usahawan Kecil & Sederhana. Confirm final title before launch.
    nossRef: 'FB-022-4:2012',
    pendingConfirmation: true,
    verificationUrl: null,
  },
  kepimpinan: {
    id: 'kepimpinan',
    marketingName: 'Diploma Lanjutan Kepimpinan & Pentadbiran Organisasi',
    officialName: 'Diploma Lanjutan Kemahiran Malaysia — Level 5 · Corporate Leadership',
    officialNameMs: 'Diploma Lanjutan Kemahiran Malaysia — Tahap 5 · Kepimpinan Korporat',
    level: 'DLKM Tahap 5',
    nossRef: 'FB-001-5:2012',
    pendingConfirmation: true,
    verificationUrl: null,
  },
}

/**
 * Contact & continuation channels.
 * NOTE: The V2.5 master prompt mentions 011-2846 5813, but the live V1 site
 * and the original build spec both use 011-2846 6813. Keeping 6813 (the
 * number currently in use) — change BOTH values below if 5813 is correct.
 */
export const CONTACT = {
  whatsappDisplay: '011-2846 6813',
  whatsappIntl: '601128466813',
  whatsappMessage:
    'Salam, saya berminat dengan Program SPM2Diploma dan ingin mengetahui langkah untuk semakan kelayakan.',
  kobisUrl: 'https://www.kobisberhad.com/',
}

export const whatsappLink = (message: string = CONTACT.whatsappMessage) =>
  `https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(message)}`

/** Coach & team — biography and credentials are placeholders until officially supplied */
export const COACH = {
  name: 'Coach Hjh Roszie Amir',
  shortName: 'Coach Roszie',
  roles: ['Operating Partner', 'Lead Trainer'],
  /** Role-based description — only verified facts; no invented credentials */
  bioMs:
    'Coach Hjh Roszie Amir menerajui perjalanan bimbingan peserta bersama Team SPM2Diploma di bawah ' +
    'KOBIS Berhad. Daripada semakan profil awal dan perbincangan laluan sehingga bimbingan portfolio ' +
    'dan persediaan penilaian, peserta menerima sokongan tersusun sepanjang proses.',
  bioEn:
    'Coach Hjh Roszie Amir leads the participant guidance journey together with Team SPM2Diploma under ' +
    'KOBIS Berhad. From preliminary profile review and pathway discussion to portfolio guidance and ' +
    'assessment preparation, participants receive structured support throughout the process.',
  bioPending: false,
  /** PLACEHOLDER — list confirmed credentials only; do not invent */
  credentials: [] as string[],
  photoUrl: null as string | null, // Replace with official photograph path
  videoUrl: null as string | null, // Optional introduction video
}

/**
 * Fees & payment — NOT yet confirmed. The public site must not display
 * invented amounts. When confirmed, set `confirmed: true` and fill values.
 */
export const FEES = {
  confirmed: false,
  keusahawanan: { display: null as string | null },
  kepimpinan: { display: null as string | null },
  stagedPaymentAvailable: null as boolean | null, // confirm before advertising
  notesMs:
    'Struktur yuran akan diterangkan semasa sesi susulan bersama Team SPM2Diploma.',
}

/** Duration & schedule — subject to participant readiness and assessment schedule */
export const DURATION = {
  confirmed: false,
  displayMs:
    'Tempoh sebenar tertakluk kepada kesiapsiagaan peserta, keperluan portfolio dan jadual penilaian.',
}

/** Compliance statements (spec section R) — use verbatim, do not strengthen */
export const COMPLIANCE = {
  eligibilityMs:
    'Pemegang SPM yang mempunyai pengalaman berkaitan dialu-alukan untuk menjalani semakan profil. ' +
    'Kelayakan akhir tertakluk kepada latar belakang, pengalaman, bukti kompetensi dan keperluan rasmi program.',
  processMs:
    'Program merangkumi latihan, bimbingan portfolio dan persediaan penilaian. ' +
    'Tempoh sebenar tertakluk kepada kesiapsiagaan peserta, keperluan portfolio dan jadual penilaian.',
  certificationMs:
    'Penyertaan program tidak menjamin pensijilan secara automatik. Peserta perlu melengkapkan keperluan ' +
    'program dan disahkan kompeten melalui proses penilaian yang ditetapkan.',
}

/** Trust messages — official wording, use verbatim */
export const TRUST = {
  en: 'Coach Roszie and the SPM2Diploma Team under KOBIS Berhad will be together with you throughout this journey.',
  ms:
    'Anda tidak perlu melalui perjalanan ini seorang diri. Coach Roszie dan Team SPM2Diploma di bawah ' +
    'KOBIS Berhad akan membantu, membimbing dan bergerak bersama anda dari semakan awal sehingga anda ' +
    'bersedia menghadapi proses penilaian.',
}

/**
 * Testimonials — EMPTY until real, consented testimonials are supplied.
 * The testimonial section stays hidden while this list is empty.
 */
export interface Testimonial {
  name: string
  role: string
  quote: string
  photoUrl: string | null
}
export const TESTIMONIALS: Testimonial[] = []

/**
 * Intake urgency facts (spec: genuine urgency only — no fake countdowns).
 * Only values entered here are shown; null values display nothing.
 */
export const INTAKE = {
  reviewsOpen: true,
  closingDate: null as string | null, // e.g. '2026-09-30'
  placesAvailable: null as number | null,
  briefingDate: null as string | null,
  intakeDate: null as string | null,
}

/** Participant journey stages (spec L) — order matters */
export const PROGRESS_STAGES = [
  'application_received',
  'profile_review',
  'pathway_confirmation',
  'registration',
  'training_guidance',
  'portfolio_preparation',
  'assessment_preparation',
  'completion',
] as const
export type ProgressStage = (typeof PROGRESS_STAGES)[number]

/** Participant checklist items (spec L) */
export const CHECKLIST_ITEMS = [
  'personal_details',
  'pathway_selected',
  'briefing_completed',
  'registration_completed',
  'documents_prepared',
  'training_attended',
  'portfolio_in_progress',
  'ready_for_assessment',
] as const
export type ChecklistItem = (typeof CHECKLIST_ITEMS)[number]

/** Application follow-up statuses used by the team */
export const APPLICATION_STATUSES = [
  'new',
  'in_review',
  'contacted',
  'qualified',
  'follow_up',
  'enrolled',
  'not_suitable',
  'withdrawn',
] as const
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]
