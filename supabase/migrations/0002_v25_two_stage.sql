-- ═══════════════════════════════════════════════════════════════════
-- V2.5: two-stage eligibility flow
-- Adds preliminary/complete profile staging + preferred language, and a
-- SECURITY DEFINER RPC so an anonymous applicant can complete ONLY their
-- own preliminary record (identified by reference + phone), without any
-- general anonymous UPDATE policy on the table.
-- ═══════════════════════════════════════════════════════════════════

alter table applications
  add column if not exists preferred_language text,
  add column if not exists profile_stage text not null default 'complete'
    check (profile_stage in ('preliminary', 'complete'));

-- Whitelisted stage-2 fields only; team/ops fields cannot be touched.
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

-- Callable by anonymous (the capability is reference+phone, checked inside)
grant execute on function complete_profile(text, text, jsonb) to anon, authenticated;
