-- ═══════════════════════════════════════════════════════════════════
-- SPM2DIPLOMA — ONE-PASTE SUPABASE SETUP
-- ═══════════════════════════════════════════════════════════════════
-- This is migrations 0001 + 0002 combined and made idempotent, so you can
-- paste it ONCE into the Supabase SQL editor (Dashboard → SQL Editor → New
-- query → paste → Run). Safe to re-run: it guards every object.
--
-- After running: create your team accounts in Auth, then promote their roles
-- with the PROMOTE snippet at the bottom of this file.
-- ═══════════════════════════════════════════════════════════════════

-- ── Roles ──────────────────────────────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('participant', 'admin', 'director');
  end if;
end$$;

-- Profiles: one row per authenticated user, maps auth → role
create table if not exists profiles (
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

drop trigger if exists on_auth_user_created on auth.users;
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

-- ── Applications ───────────────────────────────────────────────────
create table if not exists applications (
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

create index if not exists applications_status_idx on applications (status);
create index if not exists applications_pathway_idx on applications (selected_pathway);
create index if not exists applications_user_idx on applications (user_id);

-- ── Programme updates (participant-facing announcements) ───────────
create table if not exists programme_updates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  body text not null,
  training_date date,
  published boolean not null default true
);

-- ── Simple finance (director only; manually entered) ───────────────
create table if not exists finance_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  entry_type text not null
    check (entry_type in ('expected_revenue','received','operating_expense','partner_payment')),
  label text not null,
  amount numeric(12, 2) not null,
  note text
);

-- ── V2.5 two-stage columns (preliminary → complete) ────────────────
alter table applications
  add column if not exists preferred_language text,
  add column if not exists profile_stage text not null default 'complete'
    check (profile_stage in ('preliminary', 'complete'));

-- ═══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- Public sees nothing private · participants see only their own row ·
-- admin sees operations but NOT finance · director sees everything.
-- ═══════════════════════════════════════════════════════════════════
alter table profiles enable row level security;
alter table applications enable row level security;
alter table programme_updates enable row level security;
alter table finance_entries enable row level security;

-- Profiles
drop policy if exists "profiles_read_own" on profiles;
create policy "profiles_read_own" on profiles
  for select using (id = auth.uid());
drop policy if exists "profiles_read_staff" on profiles;
create policy "profiles_read_staff" on profiles
  for select using (current_role_of(auth.uid()) in ('admin', 'director'));
drop policy if exists "profiles_director_update" on profiles;
create policy "profiles_director_update" on profiles
  for update using (current_role_of(auth.uid()) = 'director');

-- Applications
drop policy if exists "applications_public_insert" on applications;
create policy "applications_public_insert" on applications
  for insert with check (consent = true);
drop policy if exists "applications_participant_read_own" on applications;
create policy "applications_participant_read_own" on applications
  for select using (user_id = auth.uid());
drop policy if exists "applications_staff_read" on applications;
create policy "applications_staff_read" on applications
  for select using (current_role_of(auth.uid()) in ('admin', 'director'));
drop policy if exists "applications_staff_update" on applications;
create policy "applications_staff_update" on applications
  for update using (current_role_of(auth.uid()) in ('admin', 'director'));

-- Participant-safe view: excludes internal_note and team-only fields.
create or replace view participant_applications
with (security_invoker = true) as
  select id, application_reference, created_at, full_name, selected_pathway,
         status, participant_progress_stage, participant_checklist, user_id
  from applications;

-- Programme updates
drop policy if exists "updates_read_published" on programme_updates;
create policy "updates_read_published" on programme_updates
  for select using (published = true and auth.uid() is not null);
drop policy if exists "updates_staff_all" on programme_updates;
create policy "updates_staff_all" on programme_updates
  for all using (current_role_of(auth.uid()) in ('admin', 'director'));

-- Finance: DIRECTOR ONLY
drop policy if exists "finance_director_only" on finance_entries;
create policy "finance_director_only" on finance_entries
  for all using (current_role_of(auth.uid()) = 'director');

-- ── Stage-2 completion RPC (anonymous can complete ONLY their own row) ──
create or replace function complete_profile(p_reference text, p_phone text, p_patch jsonb)
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  updated int;
begin
  update applications set
    age_range = coalesce(p_patch ->> 'age_range', age_range),
    location = coalesce(p_patch ->> 'location', location),
    email = coalesce(p_patch ->> 'email', email),
    business_or_organisation_name = coalesce(p_patch ->> 'business_or_organisation_name', business_or_organisation_name),
    organisation_type = coalesce(p_patch ->> 'organisation_type', organisation_type),
    current_position = coalesce(p_patch ->> 'current_position', current_position),
    industry = coalesce(p_patch ->> 'industry', industry),
    team_size = coalesce(p_patch ->> 'team_size', team_size),
    responsibilities = coalesce(p_patch ->> 'responsibilities', responsibilities),
    website_or_social_link = coalesce(p_patch ->> 'website_or_social_link', website_or_social_link),
    evidence_readiness = coalesce(
      (select array_agg(x) from jsonb_array_elements_text(p_patch -> 'evidence_readiness') as x),
      evidence_readiness
    ),
    commitment_level = coalesce(p_patch ->> 'commitment_level', commitment_level),
    financial_readiness = coalesce(p_patch ->> 'financial_readiness', financial_readiness),
    motivation = coalesce(p_patch ->> 'motivation', motivation),
    additional_information = coalesce(p_patch ->> 'additional_information', additional_information),
    profile_stage = 'complete'
  where application_reference = p_reference
    and phone = p_phone
    and profile_stage = 'preliminary';
  get diagnostics updated = row_count;
  return updated > 0;
end;
$$;

grant execute on function complete_profile(text, text, jsonb) to anon, authenticated;

-- ═══════════════════════════════════════════════════════════════════
-- PROMOTE A TEAM MEMBER (run AFTER they have signed up via the app / Auth)
-- Every new signup starts as 'participant'. Promote by email:
--
--   update profiles set role = 'director' where email = 'you@example.com';
--   update profiles set role = 'admin'    where email = 'staff@example.com';
--
-- Check who has which role:
--   select email, role from profiles order by role;
-- ═══════════════════════════════════════════════════════════════════
