-- Creator OS, studio jobs, editorial lookbooks, Perth nights, academy exams
create table if not exists creator_os (
  user_id text primary key,
  plan text not null,
  status text not null default 'active',
  display_name text not null default '',
  handle text not null default '',
  bio text not null default '',
  links text not null default '[]',
  menu text not null default '[]',
  leak_monitor boolean not null default false,
  views integer not null default 0,
  clicks integer not null default 0,
  started_at timestamptz not null default now()
);
create unique index if not exists creator_os_handle_idx on creator_os (handle) where handle <> '';

create table if not exists os_posts (
  id serial primary key,
  user_id text not null,
  platform text not null,
  body text not null,
  scheduled_for text not null,
  status text not null default 'queued',
  created_at timestamptz not null default now()
);
create index if not exists os_posts_user_idx on os_posts (user_id, scheduled_for);

create table if not exists house_jobs (
  id serial primary key,
  user_id text not null,
  product_id text,
  kind text not null,
  title text not null,
  status text not null default 'queued',
  created_at timestamptz not null default now()
);
create index if not exists house_jobs_user_idx on house_jobs (user_id);

create table if not exists twins (
  id text primary key,
  talent_id text not null references talent(id),
  product_id text not null references products(id),
  title text not null,
  blurb text not null,
  image text not null,
  status text not null default 'live',
  sort integer not null default 0
);

create table if not exists twin_licenses (
  id serial primary key,
  user_id text not null,
  twin_id text not null references twins(id),
  kind text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (user_id, twin_id)
);
create index if not exists twin_licenses_user_idx on twin_licenses (user_id);

create table if not exists nights (
  id text primary key,
  product_id text not null references products(id),
  title text not null,
  venue text not null,
  city text not null,
  date text not null,
  blurb text not null,
  image text not null,
  featured boolean not null default false,
  sort integer not null default 0
);

create table if not exists rsvps (
  id serial primary key,
  user_id text not null,
  night_id text not null references nights(id),
  qty integer not null default 1,
  total_cents integer not null,
  created_at timestamptz not null default now(),
  unique (user_id, night_id)
);
create index if not exists rsvps_user_idx on rsvps (user_id);

create table if not exists night_features (
  id serial primary key,
  user_id text not null,
  company text not null,
  weeks integer not null default 1,
  total_cents integer not null,
  created_at timestamptz not null default now()
);

create table if not exists academy_exams (
  user_id text not null,
  exam_id text not null,
  score integer not null,
  passed boolean not null,
  created_at timestamptz not null default now(),
  unique (user_id, exam_id)
);

-- Fan passes remap to Sesh / Sesh Black / House
update products set
  slug = 'sesh',
  title = 'Sesh',
  subtitle = 'Monthly pass',
  description = 'The glue. Follow lists, FLESH Points, five percent off the floor. One ID across atelier, academy teasers, and nights.',
  price_cents = 1299,
  image = '/still-lips.jpg',
  sort = 1
where id = 'pass-member';

update products set
  slug = 'house',
  title = 'House',
  subtitle = 'Monthly pass',
  description = 'Concierge desk. Twenty percent off. Academy library. One hundred dollars house credit on join. Custom requests routed to signed talent.',
  price_cents = 9900,
  image = '/still-live.jpg',
  sort = 3
where id = 'pass-patron';

update memberships set plan = 'black' where plan = 'member';
update memberships set plan = 'house' where plan = 'patron';

insert into products (id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort) values
  ('pass-black', 'membership', 'sesh-black', 'Sesh Black', 'Monthly pass', 'Academy library, ten percent off, no ads on the house, priority chat with the desk. The working pass.', 2999, '/hero-corridor.jpg', null, 2),
  ('pass-academy', 'membership', 'academy-library', 'Academy library', 'Monthly', 'Every current seat, unlocked. Consent, language, house craft, money. Cancel any month.', 1900, '/still-academy.jpg', null, 4),

  ('os-lite', 'os', 'os-lite', 'OS Lite', 'Creator tools', 'A named storefront. Bio, links, a public page. Analytics on the desk. Zero take on money you process elsewhere.', 1900, '/still-hands.jpg', null, 40),
  ('os-pro', 'os', 'os-pro', 'OS Pro', 'Creator tools', 'Lite plus a posting calendar and a leak watch. The desk that keeps a week in order.', 4900, '/still-talent.jpg', null, 41),
  ('os-studio', 'os', 'os-studio', 'OS Studio', 'Agency tools', 'Pro plus a BAS-ready tax pack and a seat built for more than one name. The house undercuts a fifty percent agency.', 9900, '/still-atelier.jpg', null, 42),

  ('svc-launch', 'service', 'launch-kit', 'Launch kit', 'Studio service', 'Branding, first thirty days, pricing architecture, language. A file the roster can actually use.', 250000, '/still-talent.jpg', null, 50),
  ('svc-day', 'service', 'capture-day', 'Capture day', 'Studio service', 'One day in a house room. Stills and short motion. Pronouns travel with the file. Perth studio.', 180000, '/hero-corridor.jpg', null, 51),
  ('svc-takedown', 'service', 'takedown', 'Takedown desk', 'Studio service', 'Impersonation and leak response. One incident, dated, with a paper trail.', 49900, '/still-hands.jpg', null, 52),

  ('twin-vale-host', 'twin', 'vale-lookbook', 'Vale lookbook', 'Monthly likeness', 'Permissioned editorial likeness of Vale Noir. Campaign stills, not a person. Lease ends when they say it ends.', 39900, '/still-talent.jpg', null, 60),
  ('twin-juniper-host', 'twin', 'juniper-lookbook', 'Juniper lookbook', 'Monthly likeness', 'Permissioned editorial likeness of Juniper Hale. Brands lease a look, not a body.', 39900, '/still-lips.jpg', null, 61),
  ('twin-ash-host', 'twin', 'ash-lookbook', 'Ash lookbook', 'Monthly likeness', 'Permissioned editorial likeness of Ash Vesper. Directed stills. No walk-up sessions.', 39900, '/still-live.jpg', null, 62),
  ('twin-sable-host', 'twin', 'sable-lookbook', 'Sable lookbook', 'Monthly likeness', 'Permissioned editorial likeness of Sable Quinn. Objects and presence in the same frame.', 34900, '/still-atelier.jpg', null, 63),
  ('twin-build', 'twin', 'lookbook-build', 'Lookbook build', 'Setup', 'Face, marks, and wardrobe lock for signed talent only. Written, dated authorization required. Four to eight weeks.', 450000, '/still-talent.jpg', null, 64),
  ('twin-exclusive', 'twin', 'lookbook-exclusive', 'Exclusive lookbook', 'One buyer', 'A single-license editorial likeness. The house will not lease that file to anyone else while the term holds.', 1200000, '/hero-corridor.jpg', null, 65),

  ('ac-screen', 'academy', 'screening-101', 'Screening 101', 'Three modules', 'How the house reads a file. Age, consent, and the difference between a yes and a vibe. Required language for anyone who works a brief.', 7900, '/still-academy.jpg', 80, 24),
  ('ac-money', 'academy', 'money-for-talent', 'Money for talent', 'Four modules', 'Invoices, GST, and an AU BAS pack. What a day rate is for. The house does not do your tax — it teaches the shape of it.', 9900, '/still-hands.jpg', 80, 25),
  ('ac-workshop', 'academy', 'house-cohort', 'House cohort', 'Live workshop', 'A dated seat in a Perth room. Language, limits, and a file you leave with. Not a performance class.', 29900, '/still-live.jpg', 16, 26),
  ('exam-craft', 'exam', 'house-craft-exam', 'House craft certificate', 'Exam', 'Four questions. Seventy-five percent to pass. The badge sits on the desk. A$29, once.', 2900, '/still-academy.jpg', null, 27),

  ('night-silk', 'event', 'northbridge-silk', 'Northbridge silk', 'House night', 'A Perth night with a door. Gender-fluid dress code: none. Members first.', 5500, '/still-live.jpg', 80, 70),
  ('night-heat', 'event', 'fremantle-heat', 'Fremantle heat', 'House night', 'Harbour air, a magenta line, a two-hour door. Ticket holds a name, not a plus-one unless you buy two.', 3500, '/hero-corridor.jpg', 120, 71),
  ('night-rehearsal', 'event', 'closed-rehearsal', 'Closed rehearsal', 'House night', 'A quiet room for signed talent and House passes. Directed stills, no audience walk-up.', 9000, '/still-atelier.jpg', 40, 72),
  ('night-boost', 'event', 'night-feature', 'Featured night slot', 'Placement', 'Your name on the nights page for a week. Clubs, drops, and house collabs. Not a classifieds board.', 49900, '/still-lips.jpg', null, 73)
on conflict (id) do nothing;

insert into twins (id, talent_id, product_id, title, blurb, image, sort) values
  ('twin-vale', 'vale', 'twin-vale-host', 'Vale lookbook', 'Androgynous campaign stills. The face the house uses when it does not want a gender on the poster.', '/still-talent.jpg', 1),
  ('twin-juniper', 'juniper', 'twin-juniper-host', 'Juniper lookbook', 'Editorial language in the frame. Writes their own brief. Will not be recast as a type.', '/still-lips.jpg', 2),
  ('twin-ash', 'ash', 'twin-ash-host', 'Ash lookbook', 'Directed presence. Calm, unreadable, expensive. Books as a lease, not a session.', '/still-live.jpg', 3),
  ('twin-sable', 'sable', 'twin-sable-host', 'Sable lookbook', 'Objects and bodies in the same still. The atelier''s quiet favourite.', '/still-atelier.jpg', 4)
on conflict (id) do nothing;

insert into nights (id, product_id, title, venue, city, date, blurb, image, featured, sort) values
  ('silk', 'night-silk', 'Northbridge silk', 'The Velvet Room', 'Perth', '2026-09-19', 'The first public night of the season. A door, a mark, a two-drink quiet. Members walk in on their name.', '/still-live.jpg', true, 1),
  ('heat', 'night-heat', 'Fremantle heat', 'South jetty loft', 'Fremantle', '2026-10-03', 'Harbour night. No dress code that names a gender. Ticket is the file.', '/hero-corridor.jpg', false, 2),
  ('rehearsal', 'night-rehearsal', 'Closed rehearsal', 'Navy Corridor', 'Perth', '2026-10-12', 'Signed talent and House passes. Directed stills. If you do not have a file, the door will not know you.', '/still-atelier.jpg', false, 3)
on conflict (id) do nothing;

insert into course_modules (id, product_id, title, body, sort) values
  ('s1', 'ac-screen', 'Age is not a vibe', 'Eighteen and over is the only door. If the file cannot prove it, the file is closed. Screening is paperwork, not a feeling.', 1),
  ('s2', 'ac-screen', 'A yes that can move', 'Consent is dated and specific. Pronouns, limits, and names live in the brief. A withdrawn yes is a production note, not a scandal.', 2),
  ('s3', 'ac-screen', 'What we do not take', 'The house does not hold deposits for in-person dates, does not run a classifieds board, and does not scrape a public face. If a brand asks for that, the answer is no.', 3),
  ('m1', 'ac-money', 'A day rate is a number', 'Write it in AUD. Say what it includes. A moodboard is not a quote. The desk will not invent a number you were too shy to say.', 1),
  ('m2', 'ac-money', 'GST without theatre', 'If you are in the system, a tenth of the invoice is not a tip. This module is the shape of an AU tax invoice, not advice.', 2),
  ('m3', 'ac-money', 'The BAS pack', 'Exports from the house tab are built so a bookkeeper can read them. Date, order, item, AUD, GST. That is the product.', 3),
  ('m4', 'ac-money', 'Agencies and takes', 'Twenty to fifty percent is a habit, not a law. OS Studio exists so a roster can keep more of the file.', 4),
  ('w1', 'ac-workshop', 'The night of the cohort', 'You sit in a Perth room. Language, limits, a file you leave with. The seat is the product. Heat is not on the syllabus.', 1)
on conflict (id) do nothing;
