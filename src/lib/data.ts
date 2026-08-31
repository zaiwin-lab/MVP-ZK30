/**
 * Data adapter — Supabase when configured, in-browser demo mode otherwise.
 *
 * Demo mode exists so every journey (public → participant → admin → director)
 * is fully testable before Supabase credentials are added in Netlify.
 * Demo data lives in localStorage and is clearly labelled in the UI.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Application, FinanceEntry, NewApplication, Profile, ProgrammeUpdate, QuickLead, Role } from './types'
import { postLeadToNetlify, submitToNetlify } from './netlifyForms'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null
export const isDemoMode = supabase === null

/* ── Application reference ────────────────────────────────────── */
export function generateReference(): string {
  const year = new Date().getFullYear()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  const seq = Date.now().toString().slice(-4)
  return `S2D-${year}-${seq}${rand}`
}

/* ── Demo store ───────────────────────────────────────────────── */
const DEMO_APPS_KEY = 'spm2d.demo.applications'
const DEMO_SESSION_KEY = 'spm2d.demo.session'
const DEMO_UPDATES_KEY = 'spm2d.demo.updates'
const DEMO_FINANCE_KEY = 'spm2d.demo.finance'

function demoRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function demoWrite<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Demo accounts — ONLY exist in demo mode for local testing.
 * In production (Supabase configured) authentication is entirely Supabase Auth.
 */
const DEMO_ACCOUNTS: { email: string; password: string; profile: Profile }[] = [
  {
    email: 'peserta@demo.spm2diploma.my',
    password: 'demo1234',
    profile: { id: 'demo-participant', email: 'peserta@demo.spm2diploma.my', full_name: 'Peserta Demo', role: 'participant' },
  },
  {
    email: 'team@demo.spm2diploma.my',
    password: 'demo1234',
    profile: { id: 'demo-admin', email: 'team@demo.spm2diploma.my', full_name: 'Team Demo', role: 'admin' },
  },
  {
    email: 'pengarah@demo.spm2diploma.my',
    password: 'demo1234',
    profile: { id: 'demo-director', email: 'pengarah@demo.spm2diploma.my', full_name: 'Pengarah Demo', role: 'director' },
  },
]

function seedDemoData() {
  if (demoRead<Application[] | null>(DEMO_APPS_KEY, null)) return
  const now = new Date()
  const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000).toISOString()
  const seed: Application[] = [
    {
      id: 'demo-app-1',
      application_reference: 'S2D-2026-0001DEMO',
      created_at: daysAgo(6),
      full_name: 'Peserta Demo',
      age_range: '35–44',
      location: 'Kuching, Sarawak',
      phone: '60128000001',
      email: 'peserta@demo.spm2diploma.my',
      highest_qualification: 'SPM',
      selected_pathway: 'keusahawanan',
      business_or_organisation_name: 'Demo Enterprise Trading',
      organisation_type: null,
      current_position: 'Pemilik',
      industry: 'Peruncitan',
      years_experience: '6–10 tahun',
      team_size: '5',
      responsibilities: 'Operasi harian, jualan, pembelian stok, pengurusan pekerja',
      website_or_social_link: null,
      evidence_readiness: ['Pendaftaran perniagaan atau organisasi', 'Rekod kewangan atau operasi', 'Gambar atau video'],
      commitment_level: 'Ya, saya bersedia',
      financial_readiness: 'Ya, saya bersedia',
      motivation: 'Meningkatkan kelayakan',
      additional_information: null,
      lead_source: 'demo',
      status: 'enrolled',
      assigned_to: 'Team Demo',
      next_follow_up: null,
      internal_note: 'Contoh peserta demo — data ini hanya untuk paparan.',
      participant_progress_stage: 'training_guidance',
      participant_checklist: ['personal_details', 'pathway_selected', 'briefing_completed', 'registration_completed'],
      consent: true,
      consent_timestamp: daysAgo(6),
      preferred_language: 'BM',
      profile_stage: 'complete',
      user_id: 'demo-participant',
    },
    {
      id: 'demo-app-2',
      application_reference: 'S2D-2026-0002DEMO',
      created_at: daysAgo(3),
      full_name: 'Contoh Pemimpin NGO',
      age_range: '45–54',
      location: 'Sibu, Sarawak',
      phone: '60138000002',
      email: 'contoh2@demo.spm2diploma.my',
      highest_qualification: 'SPM',
      selected_pathway: 'kepimpinan',
      business_or_organisation_name: 'Persatuan Komuniti Demo',
      organisation_type: 'NGO',
      current_position: 'Setiausaha',
      industry: null,
      years_experience: 'Lebih 10 tahun',
      team_size: '25',
      responsibilities: 'Pentadbiran persatuan, minit mesyuarat, program komuniti',
      website_or_social_link: null,
      evidence_readiness: ['Minit mesyuarat', 'Laporan projek'],
      commitment_level: 'Saya perlukan penerangan lanjut',
      financial_readiness: 'Saya mahu melihat struktur bayaran terlebih dahulu',
      motivation: 'Kepimpinan organisasi',
      additional_information: null,
      lead_source: 'demo',
      status: 'in_review',
      assigned_to: null,
      next_follow_up: daysAgo(-2),
      internal_note: null,
      participant_progress_stage: 'profile_review',
      participant_checklist: ['personal_details', 'pathway_selected'],
      consent: true,
      consent_timestamp: daysAgo(3),
      preferred_language: 'BM',
      profile_stage: 'complete',
      user_id: null,
    },
  ]
  demoWrite(DEMO_APPS_KEY, seed)
  const updates: ProgrammeUpdate[] = [
    {
      id: 'demo-update-1',
      created_at: daysAgo(1),
      title: 'Selamat datang ke SPM2Diploma',
      body: 'Team akan menghubungi anda mengenai sesi penerangan program. Sila pastikan nombor WhatsApp anda aktif.',
      training_date: null,
      published: true,
    },
  ]
  demoWrite(DEMO_UPDATES_KEY, updates)
  demoWrite(DEMO_FINANCE_KEY, [] as FinanceEntry[])
}

if (isDemoMode) seedDemoData()

/* ── Auth ─────────────────────────────────────────────────────── */
export async function signIn(email: string, password: string): Promise<Profile | null> {
  if (isDemoMode) {
    const acct = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    )
    if (!acct) return null
    demoWrite(DEMO_SESSION_KEY, acct.profile)
    return acct.profile
  }
  const { data, error } = await supabase!.auth.signInWithPassword({ email, password })
  if (error || !data.user) return null
  return getProfile()
}

export async function signOut(): Promise<void> {
  if (isDemoMode) {
    localStorage.removeItem(DEMO_SESSION_KEY)
    return
  }
  await supabase!.auth.signOut()
}

export async function getProfile(): Promise<Profile | null> {
  if (isDemoMode) return demoRead<Profile | null>(DEMO_SESSION_KEY, null)
  const { data: userData } = await supabase!.auth.getUser()
  if (!userData.user) return null
  const { data } = await supabase!
    .from('profiles')
    .select('id, email, full_name, role')
    .eq('id', userData.user.id)
    .single()
  return (data as Profile | null) ?? null
}

/* ── Applications ─────────────────────────────────────────────── */

/**
 * Stage 1: save the 60-second preliminary lead IMMEDIATELY (spec V2.5 §12).
 * The full record is created with empty detail fields; stage 2 completes it.
 */
export async function submitQuickLead(lead: QuickLead): Promise<{ reference: string } | { error: string }> {
  const reference = generateReference()
  const app: NewApplication = {
    application_reference: reference,
    full_name: lead.full_name,
    age_range: '',
    location: '',
    phone: lead.phone,
    email: '',
    highest_qualification: lead.highest_qualification,
    selected_pathway: lead.pathway,
    business_or_organisation_name: '',
    organisation_type: null,
    current_position: '',
    industry: null,
    years_experience: lead.years_experience,
    team_size: '',
    responsibilities: '',
    website_or_social_link: null,
    evidence_readiness: [],
    commitment_level: '',
    financial_readiness: '',
    motivation: '',
    additional_information: null,
    lead_source: lead.lead_source,
    consent: true,
    consent_timestamp: new Date().toISOString(),
    preferred_language: lead.preferred_language,
    profile_stage: 'preliminary',
  }
  const result = await submitApplication(app)
  return 'error' in result ? result : { reference }
}

/** Payload from the 60-second experience check (V2+ funnel). */
export interface PreliminaryLead {
  pathway: 'keusahawanan' | 'kepimpinan' | 'unsure'
  years_experience: string
  role: string
  experiences: string[]
  result: string
  full_name: string
  phone: string
  preferred_language: string
  lead_source: string | null
  consent: boolean
}

/**
 * Gated preliminary submission for the V2+ funnel.
 * Posts to Netlify Forms and AWAITS the result: success is reported only when
 * Netlify actually accepts it (source of truth). On success it also writes a
 * secondary record to the demo/Supabase store (without re-posting to Netlify).
 * The caller keeps all answers and can retry when { ok:false } is returned.
 */
export async function submitPreliminaryLead(p: PreliminaryLead): Promise<{ ok: boolean; reference: string }> {
  const reference = generateReference()
  const ok = await postLeadToNetlify({
    application_reference: reference,
    profile_stage: 'preliminary',
    full_name: p.full_name,
    phone: p.phone,
    selected_pathway: p.pathway,
    years_experience: p.years_experience,
    role: p.role,
    experiences: p.experiences,
    result: p.result,
    preferred_language: p.preferred_language,
    consent: p.consent ? 'true' : 'false',
    lead_source: p.lead_source ?? '',
  })
  if (!ok) return { ok: false, reference }

  const app: NewApplication = {
    application_reference: reference,
    full_name: p.full_name,
    age_range: '',
    location: '',
    phone: p.phone,
    email: '',
    highest_qualification: '',
    selected_pathway: p.pathway,
    business_or_organisation_name: '',
    organisation_type: null,
    current_position: p.role,
    industry: null,
    years_experience: p.years_experience,
    team_size: '',
    responsibilities: p.experiences.join(', '),
    website_or_social_link: null,
    evidence_readiness: [],
    commitment_level: '',
    financial_readiness: '',
    motivation: '',
    additional_information: p.result ? `Semakan awal: ${p.result}` : null,
    lead_source: p.lead_source,
    consent: p.consent,
    consent_timestamp: new Date().toISOString(),
    preferred_language: p.preferred_language,
    profile_stage: 'preliminary',
  }
  await submitApplication(app, { skipNetlify: true })
  return { ok: true, reference }
}

/**
 * Stage 2: complete the detailed profile for an existing preliminary lead.
 * Identified by reference + phone (capability pair). In production this goes
 * through the `complete_profile` SECURITY DEFINER RPC so anonymous users can
 * update ONLY their own preliminary record's profile fields.
 */
export async function completeProfile(
  reference: string,
  phone: string,
  patch: Partial<Application>
): Promise<boolean> {
  // Send the completed detail to Netlify Forms too, so the fuller profile
  // reaches the team even without a database (fire-and-forget).
  void submitToNetlify({
    application_reference: reference,
    phone,
    profile_stage: 'complete',
    full_name: patch.full_name,
    email: patch.email,
    location: patch.location,
    business_or_organisation_name: patch.business_or_organisation_name,
    current_position: patch.current_position,
    industry: patch.industry,
    team_size: patch.team_size,
    motivation: patch.motivation,
    commitment_level: patch.commitment_level,
    financial_readiness: patch.financial_readiness,
  })
  if (isDemoMode) {
    const apps = demoRead<Application[]>(DEMO_APPS_KEY, [])
    const idx = apps.findIndex((a) => a.application_reference === reference && a.phone === phone)
    if (idx === -1) return false
    apps[idx] = { ...apps[idx], ...patch, profile_stage: 'complete' }
    demoWrite(DEMO_APPS_KEY, apps)
    return true
  }
  const { error } = await supabase!.rpc('complete_profile', {
    p_reference: reference,
    p_phone: phone,
    p_patch: { ...patch, profile_stage: 'complete' },
  })
  return !error
}

export async function submitApplication(
  app: NewApplication,
  opts?: { skipNetlify?: boolean }
): Promise<{ reference: string } | { error: string }> {
  const record = {
    ...app,
    status: 'new' as const,
    assigned_to: null,
    next_follow_up: null,
    internal_note: null,
    participant_progress_stage: 'application_received' as const,
    participant_checklist: ['personal_details', 'pathway_selected'] as Application['participant_checklist'],
  }
  // Capture every lead to Netlify Forms for follow-up — runs regardless of
  // whether Supabase is configured (fire-and-forget, never blocks the user).
  // Skipped when the caller has already posted to Netlify itself (gated flow),
  // to avoid a duplicate submission.
  if (!opts?.skipNetlify) void submitToNetlify({
    application_reference: app.application_reference,
    profile_stage: app.profile_stage,
    full_name: app.full_name,
    phone: app.phone,
    email: app.email,
    highest_qualification: app.highest_qualification,
    selected_pathway: app.selected_pathway,
    years_experience: app.years_experience,
    preferred_language: app.preferred_language,
    lead_source: app.lead_source,
    location: app.location,
    business_or_organisation_name: app.business_or_organisation_name,
    current_position: app.current_position,
    industry: app.industry,
    team_size: app.team_size,
    motivation: app.motivation,
    commitment_level: app.commitment_level,
    financial_readiness: app.financial_readiness,
  })
  if (isDemoMode) {
    const apps = demoRead<Application[]>(DEMO_APPS_KEY, [])
    apps.unshift({ ...record, id: `demo-${Date.now()}`, created_at: new Date().toISOString(), user_id: null })
    demoWrite(DEMO_APPS_KEY, apps)
    return { reference: app.application_reference }
  }
  const { error } = await supabase!.from('applications').insert(record)
  if (error) return { error: error.message }
  return { reference: app.application_reference }
}

export async function listApplications(): Promise<Application[]> {
  if (isDemoMode) return demoRead<Application[]>(DEMO_APPS_KEY, [])
  const { data } = await supabase!
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })
  return (data as Application[] | null) ?? []
}

export async function getOwnApplication(): Promise<Application | null> {
  if (isDemoMode) {
    const session = demoRead<Profile | null>(DEMO_SESSION_KEY, null)
    if (!session) return null
    const apps = demoRead<Application[]>(DEMO_APPS_KEY, [])
    return apps.find((a) => a.user_id === session.id || a.email === session.email) ?? null
  }
  const { data: userData } = await supabase!.auth.getUser()
  if (!userData.user) return null
  const { data } = await supabase!
    .from('applications')
    .select('*')
    .eq('user_id', userData.user.id)
    .maybeSingle()
  return (data as Application | null) ?? null
}

export async function updateApplication(id: string, patch: Partial<Application>): Promise<boolean> {
  if (isDemoMode) {
    const apps = demoRead<Application[]>(DEMO_APPS_KEY, [])
    const idx = apps.findIndex((a) => a.id === id)
    if (idx === -1) return false
    apps[idx] = { ...apps[idx], ...patch }
    demoWrite(DEMO_APPS_KEY, apps)
    return true
  }
  const { error } = await supabase!.from('applications').update(patch).eq('id', id)
  return !error
}

/* ── Programme updates ────────────────────────────────────────── */
export async function listUpdates(publishedOnly = true): Promise<ProgrammeUpdate[]> {
  if (isDemoMode) {
    const all = demoRead<ProgrammeUpdate[]>(DEMO_UPDATES_KEY, [])
    return publishedOnly ? all.filter((u) => u.published) : all
  }
  let q = supabase!.from('programme_updates').select('*').order('created_at', { ascending: false })
  if (publishedOnly) q = q.eq('published', true)
  const { data } = await q
  return (data as ProgrammeUpdate[] | null) ?? []
}

export async function addUpdate(u: Omit<ProgrammeUpdate, 'id' | 'created_at'>): Promise<boolean> {
  if (isDemoMode) {
    const all = demoRead<ProgrammeUpdate[]>(DEMO_UPDATES_KEY, [])
    all.unshift({ ...u, id: `demo-u-${Date.now()}`, created_at: new Date().toISOString() })
    demoWrite(DEMO_UPDATES_KEY, all)
    return true
  }
  const { error } = await supabase!.from('programme_updates').insert(u)
  return !error
}

/* ── Finance (director only; enforced by RLS in production) ───── */
export async function listFinance(): Promise<FinanceEntry[]> {
  if (isDemoMode) return demoRead<FinanceEntry[]>(DEMO_FINANCE_KEY, [])
  const { data } = await supabase!
    .from('finance_entries')
    .select('*')
    .order('created_at', { ascending: false })
  return (data as FinanceEntry[] | null) ?? []
}

export async function addFinanceEntry(e: Omit<FinanceEntry, 'id' | 'created_at'>): Promise<boolean> {
  if (isDemoMode) {
    const all = demoRead<FinanceEntry[]>(DEMO_FINANCE_KEY, [])
    all.unshift({ ...e, id: `demo-f-${Date.now()}`, created_at: new Date().toISOString() })
    demoWrite(DEMO_FINANCE_KEY, all)
    return true
  }
  const { error } = await supabase!.from('finance_entries').insert(e)
  return !error
}

/* ── Team users (director view) ───────────────────────────────── */
export async function listProfiles(): Promise<Profile[]> {
  if (isDemoMode) return DEMO_ACCOUNTS.map((a) => a.profile)
  const { data } = await supabase!.from('profiles').select('id, email, full_name, role')
  return (data as Profile[] | null) ?? []
}

export type { Role }
