import type { ApplicationStatus, ChecklistItem, ProgressStage } from '../config/programme'

/** Mirror of the `applications` table (spec section V) */
export interface Application {
  id: string
  application_reference: string
  created_at: string
  full_name: string
  age_range: string
  location: string
  phone: string
  email: string
  highest_qualification: string
  selected_pathway: 'keusahawanan' | 'kepimpinan' | 'unsure'
  business_or_organisation_name: string
  organisation_type: string | null
  current_position: string
  industry: string | null
  years_experience: string
  team_size: string
  responsibilities: string
  website_or_social_link: string | null
  evidence_readiness: string[]
  commitment_level: string
  financial_readiness: string
  motivation: string
  additional_information: string | null
  lead_source: string | null
  status: ApplicationStatus
  assigned_to: string | null
  next_follow_up: string | null
  internal_note: string | null
  participant_progress_stage: ProgressStage
  participant_checklist: ChecklistItem[]
  consent: boolean
  consent_timestamp: string
  /** auth user linked to this application once participant account exists */
  user_id?: string | null
}

export type NewApplication = Omit<
  Application,
  'id' | 'created_at' | 'status' | 'assigned_to' | 'next_follow_up' | 'internal_note' | 'participant_progress_stage' | 'participant_checklist' | 'user_id'
>

export type Role = 'participant' | 'admin' | 'director'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: Role
}

export interface ProgrammeUpdate {
  id: string
  created_at: string
  title: string
  body: string
  training_date: string | null
  published: boolean
}

/** Simple finance rows — manually entered (spec: Programme Director) */
export interface FinanceEntry {
  id: string
  created_at: string
  entry_type: 'expected_revenue' | 'received' | 'operating_expense' | 'partner_payment'
  label: string
  amount: number
  note: string | null
}
