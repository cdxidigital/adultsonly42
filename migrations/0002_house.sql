-- fleshsesh house ledger: catalog + per-user commerce
create table if not exists products (
  id text primary key,
  kind text not null,
  slug text not null unique,
  title text not null,
  subtitle text not null default '',
  description text not null,
  price_cents integer not null,
  image text not null,
  inventory integer,
  sort integer not null default 0,
  active boolean not null default true
);

create table if not exists talent (
  id text primary key,
  name text not null,
  pronouns text not null,
  role text not null,
  bio text not null,
  day_rate_cents integer not null,
  image text not null,
  available boolean not null default true,
  sort integer not null default 0
);

create table if not exists rooms (
  id text primary key,
  name text not null,
  blurb text not null,
  hourly_cents integer not null,
  image text not null,
  sort integer not null default 0
);

create table if not exists course_modules (
  id text primary key,
  product_id text not null references products(id),
  title text not null,
  body text not null,
  sort integer not null default 0
);

create table if not exists cart_items (
  id serial primary key,
  user_id text not null,
  product_id text not null references products(id),
  qty integer not null default 1,
  unique (user_id, product_id)
);
create index if not exists cart_items_user_id_idx on cart_items (user_id);

create table if not exists orders (
  id serial primary key,
  user_id text not null,
  total_cents integer not null,
  credit_used integer not null default 0,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);
create index if not exists orders_user_id_idx on orders (user_id);

create table if not exists order_items (
  id serial primary key,
  order_id integer not null references orders(id),
  product_id text,
  title text not null,
  qty integer not null,
  unit_cents integer not null
);

create table if not exists memberships (
  id serial primary key,
  user_id text not null unique,
  plan text not null,
  status text not null default 'active',
  started_at timestamptz not null default now()
);

create table if not exists credits (
  user_id text primary key,
  cents integer not null default 0
);

create table if not exists enrollments (
  id serial primary key,
  user_id text not null,
  product_id text not null references products(id),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);
create index if not exists enrollments_user_id_idx on enrollments (user_id);

create table if not exists bookings (
  id serial primary key,
  user_id text not null,
  room_id text not null references rooms(id),
  date text not null,
  start_hour integer not null,
  hours integer not null,
  total_cents integer not null,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);
create index if not exists bookings_user_id_idx on bookings (user_id);
create index if not exists bookings_room_date_idx on bookings (room_id, date);

create table if not exists briefs (
  id serial primary key,
  user_id text not null,
  kind text not null,
  talent_id text,
  company text not null default '',
  contact_name text not null default '',
  details text not null,
  deposit_cents integer not null default 0,
  status text not null default 'received',
  created_at timestamptz not null default now()
);
create index if not exists briefs_user_id_idx on briefs (user_id);

insert into products (id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort) values
  ('pass-member', 'membership', 'member', 'House Member', 'Monthly pass', 'Member pricing on the atelier, academy seat holds, and a mark on the desk. Pronouns travel with the file. Cancel any month.', 3900, '/still-lips.jpg', null, 1),
  ('pass-patron', 'membership', 'patron', 'House Patron', 'Monthly pass', 'First look at drops, twenty percent off the floor, two hundred dollars house credit on join, and priority on rooms. The house knows your name.', 18000, '/still-live.jpg', null, 2),
  ('gift-200', 'credit', 'house-credit-200', 'House credit $200', 'Ledger note', 'Credit the house tab two hundred Australian dollars. Spend it on drops, seats, or rooms. Does not expire in this room.', 20000, '/still-hands.jpg', null, 3),
  ('at-scarf', 'atelier', 'midnight-silk', 'Midnight silk', 'Edition object', 'A length of black silk cut for the house. Wear it, drape it, or keep it in a drawer like a secret. Limited run.', 22000, '/still-atelier.jpg', 24, 10),
  ('at-key', 'atelier', 'magenta-key', 'Magenta key', 'Pendant', 'A small key in heat-pink enamel on a black cord. It does not open a lock. It says you already have a door.', 8500, '/still-hands.jpg', 40, 11),
  ('at-print', 'atelier', 'lip-curve-print', 'Lip curve print', 'Edition of 50', 'The original mark, pulled as a navy and magenta still. Numbered in pencil on the back. No binary lockup exists.', 16000, '/still-lips.jpg', 50, 12),
  ('at-strap', 'atelier', 'void-strap', 'Void camera strap', 'Studio tool', 'A black leather strap for analog work. Stamped once. Built for hands that take pictures, not selfies of the house.', 9500, '/still-talent.jpg', 18, 13),
  ('at-candle', 'atelier', 'navy-candle', 'Navy candle', 'Scent object', 'A slow burn. Resin, metal, night air. The box is navy; the wax is darker. Burn it in a room you mean.', 6400, '/still-academy.jpg', 36, 14),
  ('at-tee', 'atelier', 'mark-tee', 'Mark tee', 'Soft object', 'Heavy cotton, the original wordmark in ivory on navy. Cut to sit on any body. Size is a letter, not a gender.', 7800, '/logo-navy.jpg', 48, 15),
  ('ac-consent', 'academy', 'consent-architecture', 'Consent as architecture', 'Four modules', 'Paperwork that can move. Names that can change. Revocation without theatre. A professional school for how the house is built — not a coach for acts.', 24000, '/still-academy.jpg', 40, 20),
  ('ac-fluid', 'academy', 'fluid-brief', 'The fluid brief', 'Three modules', 'Pronouns as production data. Casting without a binary grid. Language that holds a body in motion. For producers, talent, and the desk.', 18000, '/hero-corridor.jpg', 40, 21),
  ('ac-brands', 'academy', 'house-craft-brands', 'House craft for brands', 'Five modules', 'How to brief fleshsesh without being careless. Likeness, permissions, campaign architecture, and why the roster is the brand.', 32000, '/still-talent.jpg', 24, 22),
  ('ac-live', 'academy', 'live-presence', 'Live presence', 'Three modules', 'Directing a room as presence, not inventory. Light, language, limits — set before the door opens. No real-time instruction of acts.', 21000, '/still-live.jpg', 32, 23),
  ('fee-talent', 'fee', 'talent-file', 'Talent file', 'Application', 'Open a roster file. The desk reads it. A paid file is read first. No guarantee of a seat. Adults only, signed later.', 4000, '/still-talent.jpg', null, 30),
  ('dep-campaign', 'fee', 'campaign-deposit', 'Campaign deposit', 'Open a brief', 'Five hundred dollars to open a talent campaign brief. Credited against the day rate if the house accepts the work.', 50000, '/still-talent.jpg', null, 31)
on conflict (id) do nothing;

insert into talent (id, name, pronouns, role, bio, day_rate_cents, image, sort) values
  ('vale', 'Vale Noir', 'they/them', 'Presence / campaign', 'Androgynous stills and live presence. The face the house uses when it does not want a gender on the poster.', 280000, '/still-talent.jpg', 1),
  ('juniper', 'Juniper Hale', 'she/they', 'Campaign / language', 'Editorial and brand work. Writes their own brief. Will not be recast as a type.', 320000, '/still-lips.jpg', 2),
  ('ash', 'Ash Vesper', 'he/they', 'Live / rooms', 'Directed rooms. Calm, unreadable, expensive. Books in two-hour blocks only.', 240000, '/still-live.jpg', 3),
  ('sable', 'Sable Quinn', 'any', 'Stills / atelier', 'Objects and bodies in the same frame. The atelier''s quiet favourite. Day rate includes one look, not three.', 180000, '/still-atelier.jpg', 4)
on conflict (id) do nothing;

insert into rooms (id, name, blurb, hourly_cents, image, sort) values
  ('velvet', 'The Velvet Room', 'Black curtain, one chair, a magenta line. Two-hour minimum. Directed sessions for signed talent only.', 42000, '/still-live.jpg', 1),
  ('corridor', 'Navy Corridor', 'A long hall with a single light. Campaign stills, walk-throughs, and brand films that need a spine.', 36000, '/hero-corridor.jpg', 2),
  ('desk', 'Magenta Desk', 'Academy-adjacent. Briefings, language work, and table-top objects. Quiet. No audience.', 28000, '/still-academy.jpg', 3)
on conflict (id) do nothing;

insert into course_modules (id, product_id, title, body, sort) values
  ('c1', 'ac-consent', 'The door is the product', 'Age is the first door. Consent is the second. Neither is a slogan. In this house a yes is dated, specific, and can be taken back without a performance. If the paperwork cannot move when a name or pronoun moves, the paperwork is wrong.', 1),
  ('c2', 'ac-consent', 'Revocation without theatre', 'A withdrawn yes is not a scandal. It is a production note. Campaigns pause. Twins stop. Rooms close. The ledger keeps the money that was already used; it does not keep the likeness.', 2),
  ('c3', 'ac-consent', 'The file travels', 'Pronouns, limits, and names live in the brief, not in a courtesy line. Anyone who works the file reads the file. If they cannot, they do not work here.', 3),
  ('c4', 'ac-consent', 'Adults, always', 'Fluidity is not a costume of youth. Eighteen and over, no ambiguity, no coded casting. The house will not discuss a body that cannot walk through the door.', 4),
  ('f1', 'ac-fluid', 'No binary grid', 'Talent, rooms, and stills are not sorted into men and women. Presence is the sort. If a brand asks for a dropdown, the answer is a conversation or a no.', 1),
  ('f2', 'ac-fluid', 'Pronouns as data', 'Treat pronouns like lighting notes: required, changeable, and fatal if ignored. A deadname in a call sheet is a breach, not a typo.', 2),
  ('f3', 'ac-fluid', 'The moving brief', 'A body can change mid-relationship. The contract has to be able to change with it. This module is the language for that motion.', 3),
  ('b1', 'ac-brands', 'The roster is the brand', 'You do not hire a type from fleshsesh. You hire a signed person with a file. If they are not on the roster they are not available, cloned, or spoken for.', 1),
  ('b2', 'ac-brands', 'Likeness is a lease', 'Virtual twins and campaign stills exist only with dated permission. The lease ends when the person says it ends. Budget for that.', 2),
  ('b3', 'ac-brands', 'How to write a brief', 'Charge, not category. Limits, not vibes. Pronouns, not assumptions. A good brief is shorter than a moodboard and harder to write.', 3),
  ('b4', 'ac-brands', 'Money and the desk', 'Day rates, deposits, and house credit. Member and Patron pricing. What the campaign deposit buys — a reading, not a yes.', 4),
  ('b5', 'ac-brands', 'After the still', 'Usage, territory, and the difference between a house campaign and a brand campaign. If you cannot say where the image will live, you are not ready to shoot.', 5),
  ('l1', 'ac-live', 'Rooms without a dropdown', 'A live room is cast by presence. No men''s door, no women''s door. The audience is admitted to watch, not to own.', 1),
  ('l2', 'ac-live', 'Light, language, limits', 'Set all three before the door opens. A directed session has a brief. Heat without a brief is inventory, and this house does not sell inventory.', 2),
  ('l3', 'ac-live', 'The two-hour block', 'Rooms hire in two-hour blocks. Overtime is a new booking. Signed talent only. If you want a walk-up room, you are in the wrong house.', 3)
on conflict (id) do nothing;
