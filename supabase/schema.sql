-- The Alto Circle — Supabase schema
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Tables match the Pydantic models in backend/main.py.
-- No real client/business names: seed rows are samples only.

create table if not exists members (
  id bigint generated always as identity primary key,
  name text not null,
  company text not null,
  industry text not null,
  company_size text not null check (company_size in ('medium', 'large')),
  role text not null default 'Member',
  created_at timestamptz not null default now()
);

create table if not exists resources (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

create table if not exists activity (
  id bigint generated always as identity primary key,
  title text not null,
  detail text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security.
-- STARTER-ONLY policies: anon users can read all rows and insert new ones.
-- This is fine for a portfolio demo with sample data, but NOT production
-- auth. For production, replace these with authenticated-user policies.
alter table members enable row level security;
alter table resources enable row level security;
alter table activity enable row level security;

drop policy if exists "Allow anon read" on members;
create policy "Allow anon read" on members for select using (true);
drop policy if exists "Allow anon insert" on members;
create policy "Allow anon insert" on members for insert with check (true);

drop policy if exists "Allow anon read" on resources;
create policy "Allow anon read" on resources for select using (true);
drop policy if exists "Allow anon insert" on resources;
create policy "Allow anon insert" on resources for insert with check (true);

drop policy if exists "Allow anon read" on activity;
create policy "Allow anon read" on activity for select using (true);
drop policy if exists "Allow anon insert" on activity;
create policy "Allow anon insert" on activity for insert with check (true);

-- Seed rows (sample data only). Each INSERT is guarded so re-running
-- this file does not duplicate rows.
insert into members (name, company, industry, company_size, role)
select 'Sample Member — Manufacturing', 'Sample Manufacturing Co.', 'Manufacturing', 'large', 'Owner'
where not exists (select 1 from members where company = 'Sample Manufacturing Co.');

insert into members (name, company, industry, company_size, role)
select 'Sample Member — Logistics', 'Sample Logistics Co.', 'Logistics', 'medium', 'Owner'
where not exists (select 1 from members where company = 'Sample Logistics Co.');

insert into members (name, company, industry, company_size, role)
select 'Sample Member — Technology', 'Sample Technology Co.', 'Technology', 'large', 'Founder'
where not exists (select 1 from members where company = 'Sample Technology Co.');

insert into resources (title, category, summary)
select 'Sample Resource: Member Welcome Guide', 'Onboarding', 'How new members join, introduce themselves, and find the right people.'
where not exists (select 1 from resources where title = 'Sample Resource: Member Welcome Guide');

insert into resources (title, category, summary)
select 'Sample Resource: Community Events Playbook', 'Events', 'How the community plans and runs member events in Palo Alto.'
where not exists (select 1 from resources where title = 'Sample Resource: Community Events Playbook');

insert into activity (title, detail)
select 'Sample Activity: Monthly member meetup', 'Members meet, share updates, and make introductions.'
where not exists (select 1 from activity where title = 'Sample Activity: Monthly member meetup');

insert into activity (title, detail)
select 'Sample Activity: New resource published', 'A new guide was added to the resources library.'
where not exists (select 1 from activity where title = 'Sample Activity: New resource published');
