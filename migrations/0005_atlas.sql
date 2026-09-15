-- Atlas dossier: compile a name from desk + live identifiers, file it on the desk
create table if not exists atlas_dossiers (
  id serial primary key,
  user_id text not null,
  query text not null,
  qid text not null default '',
  entity_id text not null default '',
  title text not null,
  sources text not null default '[]',
  created_at timestamptz not null default now()
);
create index if not exists atlas_dossiers_user_idx on atlas_dossiers (user_id, id desc);

insert into products (id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort) values
  (
    'atlas-dossier',
    'atlas',
    'atlas-dossier',
    'Atlas dossier',
    'Research pack',
    'Compile a name from the house desk and live industry databases (IAFD, AFDB, AVN, XXXBios). File it on the desk. Identifiers only — no media. One pack, then stamp as many names as you need.',
    4900,
    '/still-hands.jpg',
    null,
    80
  )
on conflict (id) do nothing;
