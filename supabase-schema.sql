-- Nissi Elite Plast uPVC Database Schema for Supabase
-- Copy and paste this script into your Supabase project's SQL Editor and click "Run".

-- 1. Create Enquiries Table
create table if not exists enquiries (
  id text primary key,
  name text not null,
  phone text not null,
  email text not null,
  role text,
  city text,
  series text,
  message text,
  created_at timestamptz default now(),
  status text default 'new'
);

-- 2. Create Brochure Downloads Table
create table if not exists brochure_downloads (
  id text primary key,
  name text,
  email text not null,
  phone text not null,
  series_interest text,
  brochure_name text,
  downloaded_at timestamptz default now()
);

-- 3. Enable Row Level Security (RLS)
alter table enquiries enable row level security;
alter table brochure_downloads enable row level security;

-- 4. Allow Service Role to access all rows (used by backend API)
create policy "Service role has full access to enquiries"
  on enquiries for all
  using (auth.role() = 'service_role');

create policy "Service role has full access to brochure_downloads"
  on brochure_downloads for all
  using (auth.role() = 'service_role');
