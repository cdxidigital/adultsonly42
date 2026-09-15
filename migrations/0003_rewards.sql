-- FLESH Points, rewards shelf, wallets, pass claims
create table if not exists flesh_rewards (
  id text primary key,
  name text not null,
  description text not null,
  points_cost integer not null,
  category text not null,
  effect text not null,
  effect_value integer not null default 0,
  available boolean not null default true,
  sort integer not null default 0
);

create table if not exists flesh_points (
  user_id text primary key,
  available integer not null default 0,
  pending integer not null default 0,
  lifetime_earned integer not null default 0,
  lifetime_spent integer not null default 0,
  collectibles integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists flesh_wallets (
  user_id text primary key,
  status text not null default 'embedded',
  wallet_type text not null default 'Embedded wallet',
  address text,
  network text not null default 'Base',
  provider text not null default 'FLESH Wallet'
);

create table if not exists flesh_passes (
  user_id text primary key,
  pass_number text not null,
  eligible boolean not null default false,
  claimed boolean not null default false,
  token_id text,
  tx_hash text
);

create table if not exists flesh_activity (
  id text primary key,
  user_id text not null,
  kind text not null,
  label text not null,
  amount integer not null,
  state text not null,
  created_at timestamptz not null default now()
);
create index if not exists flesh_activity_user_idx on flesh_activity (user_id, created_at desc);

create table if not exists flesh_redemptions (
  id text primary key,
  user_id text not null,
  reward_id text not null references flesh_rewards(id),
  points_cost integer not null,
  idempotency_key text not null,
  created_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);

create table if not exists flesh_claims (
  id text primary key,
  user_id text not null,
  token_id text not null,
  tx_hash text not null,
  idempotency_key text not null,
  created_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);

insert into flesh_rewards (id, name, description, points_cost, category, effect, effect_value, sort) values
  ('reward-credit-5', '$5 house credit', 'Five dollars on the tab. Spend it on drops, seats, or rooms.', 500, 'Platform', 'credit', 500, 1),
  ('reward-credit-25', '$25 house credit', 'Twenty-five dollars of ledger cash. Does not expire in this room.', 2000, 'Platform', 'credit', 2500, 2),
  ('reward-credit-50', '$50 house credit', 'A serious note on the desk. Member pricing still stacks.', 3500, 'Platform', 'credit', 5000, 3),
  ('reward-member', 'House Member month', 'Open a Member pass if you do not already hold one. Patron files stay Patron.', 2500, 'Access', 'membership', 0, 4),
  ('reward-academy', '$50 academy credit', 'Fifty dollars toward a seat. Identity, consent, house craft.', 1800, 'Access', 'credit', 5000, 5),
  ('reward-key', 'Magenta mark', 'A collectible of the original lip curve. Proof you spent time in the house.', 1500, 'Collectible', 'collectible', 1, 6),
  ('reward-boost', 'Campaign boost', 'The desk flags your next brief. Visibility, not a yes.', 750, 'Creator', 'collectible', 1, 7)
on conflict (id) do nothing;
