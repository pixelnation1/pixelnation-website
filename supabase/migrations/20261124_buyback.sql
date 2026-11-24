create table public.buyback_catalog (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Game', 'Console', 'Accessory')),
  title text not null,
  platform text not null,
  edition text not null,
  upc text not null default '',
  condition text not null,
  offer_cents integer not null check (offer_cents >= 0),
  active boolean not null default true,
  reviewed_at timestamptz not null default now(),
  unique (category, title, platform, edition, condition)
);

create table public.buyback_quotes (
  token uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  items jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) between 1 and 20),
  notes text not null default '',
  status text not null default 'Submitted'
    check (status in ('Submitted', 'Received', 'Offer ready', 'Accepted', 'Declined', 'Paid')),
  final_cents integer check (final_cents >= 0),
  offer_reason text,
  check (status in ('Submitted', 'Received') or final_cents is not null)
);
create index buyback_quotes_created_idx on public.buyback_quotes (created_at desc);
alter table public.buyback_catalog enable row level security;
alter table public.buyback_quotes enable row level security;
revoke all on public.buyback_catalog, public.buyback_quotes from anon, authenticated;
grant all on public.buyback_catalog, public.buyback_quotes to service_role;

create table public.buyback_resale (
  quote_token uuid not null references public.buyback_quotes(token),
  item_index integer not null check (item_index between 0 and 19),
  buy_cents integer not null check (buy_cents >= 0),
  prep_cents integer not null default 0 check (prep_cents >= 0),
  ebay_item_id text check (ebay_item_id ~ '^[0-9]{9,16}$'),
  net_cents integer,
  sold_on date,
  primary key (quote_token, item_index),
  check ((net_cents is null) = (sold_on is null))
);
alter table public.buyback_resale enable row level security;
revoke all on public.buyback_resale from anon, authenticated;
grant all on public.buyback_resale to service_role;
