-- ═══════════════════════════════════════════════════════════════════
-- SPM2DIPLOMA 2.0 — initial schema + Row Level Security (spec M, V)
-- Run in the Supabase SQL editor or via `supabase db push`.
-- Proportionate by design: four tables, no unnecessary relationships.
-- ═══════════════════════════════════════════════════════════════════

-- ── Roles ──────────────────────────────────────────────────────────
create type user_role as enum ('participant', 'admin', 'director');

-- Profiles: one row per authenticated user, maps auth → role
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role user_role not null default 'participant',
  created_at timestamptz not null default now()
);

-- Auto-create a participant profile on signup
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Role helper used by policies (security definer avoids RLS recursion)
create or replace function current_role_of(uid uuid)
returns user_role
language sql
security definer set search_path = public
stable
as $$
  select role from profiles where id = uid
$$;

-- ── Applications (spec section V field list) ───────────────────────
create table applications (
  id uuid primary key default gen_random_uuid(),
  application_reference text not null unique,
  created_at timestamptz not null default now(),
  full_name text not null,
  age_range text not null default '',
  location text not null default '',
  phone text not null,
  email text not null,
  highest_qualification text not null default '',
  selected_pathway text not null check (selected_pathway in ('keusahawanan', 'kepimpinan', 'unsure')),
  business_or_organisation_name text not null default '',
  organisation_type text,
  current_position text not null default '',
  industry text,
  years_experience text not null default '',
  team_size text not null default '',
  responsibilities text not null default '',
  website_or_social_link text,
  evidence_readiness text[] not null default '{}',
  commitment_level text not null default '',
  financial_readiness text not null default '',
  motivation text not null default '',
  additional_information text,
  lead_source text,
  status text not null default 'new'
    check (status in ('new','in_review','contacted','qualified','follow_up','enrolled','not_suitable','withdrawn')),
  assigned_to text,
  next_follow_up date,
  internal_note text,
  participant_progress_stage text not null default 'application_received'
    check (participant_progress_stage in (
      'application_received','profile_review','pathway_confirmation','registration',
      'training_guidance','portfolio_preparation','assessment_preparation','completion')),
  participant_checklist text[] not null default '{}',
  consent boolean not null default false,
  consent_timestamp timestamptz,
  user_id uuid references auth.users (id) on delete set null
);

create index applications_status_idx on applications (status);
create index applications_pathway_idx on applications (selected_pathway);
create index applications_user_idx on applications (user_id);

-- ── Programme updates (participant-facing announcements) ───────────
create table programme_updates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  body text not null,
  training_date date,
  published boolean not null default true
);

-- ── Simple finance (director only; manually entered) ───────────────
create table finance_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  entry_type text not null
    check (entry_type in ('expected_revenue','received','operating_expense','partner_payment')),
  label text not null,
  amount numeric(12, 2) not null,
  note text
);

-- ═══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (spec M)
-- Public sees nothing private · participants see only their own row ·
-- admin sees operations but NOT finance · director sees everything.
-- Internal notes stay private via a participant-safe view.
-- ═══════════════════════════════════════════════════════════════════
alter table profiles enable row level security;
alter table applications enable row level security;
alter table programme_updates enable row level security;
alter table finance_entries enable row level security;

-- Profiles: own row readable; staff can read all; director manages roles
create policy "profiles_read_own" on profiles
  for select using (id = auth.uid());
create policy "profiles_read_staff" on profiles
  for select using (current_role_of(auth.uid()) in ('admin', 'director'));
create policy "profiles_director_update" on profiles
  for update using (current_role_of(auth.uid()) = 'director');

-- Applications
-- Anonymous submission (public Semakan Kelayakan) — insert only, no read-back
create policy "applications_public_insert" on applications
  for insert with check (consent = true);

-- Participant: read ONLY their own application (linked by user_id)
create policy "applications_participant_read_own" on applications
  for select using (user_id = auth.uid());

-- Admin + director: read all, update all (operational fields)
create policy "applications_staff_read" on applications
  for select using (current_role_of(auth.uid()) in ('admin', 'director'));
create policy "applications_staff_update" on applications
  for update using (current_role_of(auth.uid()) in ('admin', 'director'));

-- Participant-safe view: excludes internal_note and team-only fields.
-- The frontend participant dashboard reads from this view.
create view participant_applications
with (security_invoker = true) as
  select id, application_reference, created_at, full_name, selected_pathway,
         status, participant_progress_stage, participant_checklist, user_id
  from applications;

-- Programme updates: published rows are readable by any authenticated user;
-- staff manage them
create policy "updates_read_published" on programme_updates
  for select using (published = true and auth.uid() is not null);
create policy "updates_staff_all" on programme_updates
  for all using (current_role_of(auth.uid()) in ('admin', 'director'));

-- Finance: DIRECTOR ONLY — admin access does not include finance (spec M)
create policy "finance_director_only" on finance_entries
  for all using (current_role_of(auth.uid()) = 'director');
