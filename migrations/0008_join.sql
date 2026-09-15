-- Talent onboarding file (join)
create table if not exists talent_profiles (
  user_id text primary key,
  display_name text not null,
  location text not null,
  role text not null default '',
  intent text not null default '[]',
  energy text not null default '',
  profile_type text not null,
  focus text not null default '[]',
  height text not null default '',
  chest text not null default '',
  waist text not null default '',
  hips text not null default '',
  shoe text not null default '',
  availability text not null default '',
  visibility text not null,
  portrait text not null default '',
  lookbook text not null default '[]',
  status text not null default 'pending_review',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists profile_drafts (
  user_id text primary key,
  payload text not null,
  updated_at timestamptz not null default now()
);
