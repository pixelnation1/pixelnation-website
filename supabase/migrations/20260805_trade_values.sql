-- Optional Supabase schema for PixelNation trade values.
-- The current site ships with JSON file storage under /data.
-- Run this only if you migrate to Supabase later.

create table if not exists trade_items (
  id text primary key,
  slug text unique not null,
  name text not null,
  brand text not null,
  category text not null,
  model text default '',
  storage text default '',
  image_url text default '',
  cash_value integer not null check (cash_value >= 0),
  store_credit_value integer,
  required_accessories text default '',
  condition_note text default '',
  accepts_nonworking boolean default true,
  nonworking_note text default '',
  featured boolean default false,
  active boolean default true,
  sort_order integer default 100,
  is_sample boolean default false,
  repair_href text,
  internal_notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists trade_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  category text not null,
  brand text not null,
  model text not null,
  storage text default '',
  working_status text not null,
  cosmetic_condition text not null,
  included_accessories text not null,
  issue_description text default '',
  preferred_payment text not null,
  uploaded_image_urls text[] default '{}',
  submission_status text default 'new',
  internal_notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table trade_items enable row level security;
alter table trade_submissions enable row level security;

-- Public read of active non-internal fields should be done via server role or a restricted view.
-- Do not expose internal_notes to anon clients.
