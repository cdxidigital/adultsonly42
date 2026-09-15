-- Made-to-order atelier: a spec on the line so two sizes do not collapse
alter table cart_items add column if not exists spec text not null default '';
alter table cart_items drop constraint if exists cart_items_user_id_product_id_key;
create unique index if not exists cart_items_user_product_spec_idx on cart_items (user_id, product_id, spec);

alter table order_items add column if not exists spec text not null default '';

insert into products (id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort) values
  ('at-slip', 'atelier', 'navy-slip', 'Navy slip', 'Made to order', 'Bias-cut silk in house navy. One pattern, every body. Hemmed when you order. A stamp in the hem if you want the file on the cloth.', 26000, '/still-atelier.jpg', null, 16),
  ('at-robe', 'atelier', 'house-robe', 'House robe', 'Made to order', 'Heavy cotton, navy, a magenta bar inside the cuff. Monogrammed. Cut to the letter you pick — not to a gender.', 32000, '/still-live.jpg', null, 17),
  ('at-case', 'atelier', 'leather-case', 'Leather case', 'Made to order', 'Navy leather, two pockets, the original mark blind-stamped. Initials on the flap. Holds a pass, a card, a key.', 14000, '/still-hands.jpg', null, 18),
  ('at-cuff', 'atelier', 'signet-cuff', 'Signet cuff', 'Made to order', 'Brass with the lip curve. Stamp a chosen name. Wear it on either wrist. It is jewellery, not a collar.', 18000, '/still-lips.jpg', null, 19),
  ('at-cards', 'atelier', 'calling-cards', 'Calling cards', 'Box of 50', 'The file as an object. Name and pronouns on a navy face, magenta lip. No job title. Fifty in a box.', 4800, '/still-talent.jpg', null, 20),
  ('at-match', 'atelier', 'house-matchbook', 'House matchbook', 'Impulse object', 'Navy board, magenta strike. A name on the cover, or the mark alone. The cheapest way to leave the house on a table.', 1800, '/still-academy.jpg', null, 21)
on conflict (id) do nothing;

update products set
  subtitle = 'Cut to the file',
  description = 'Heavy cotton, the original wordmark. Size is a letter, not a gender. Three inks: ivory on navy, navy on ivory, magenta on void.'
where id = 'at-tee';

update products set
  subtitle = 'Cut to length',
  description = 'Black silk. Neck, hip, or floor. Wear it, drape it, or keep it. Initials in the hem if you want them.'
where id = 'at-scarf';

update products set
  subtitle = 'Stamped',
  description = 'A small key in heat-pink enamel on a black cord. Stamp a chosen name. It does not open a lock. It says you already have a door.'
where id = 'at-key';

update products set
  subtitle = 'Edition of 50',
  description = 'The original mark, pulled as a navy and magenta still. Numbered in pencil. A dedication on the back if you want the print to belong to someone.'
where id = 'at-print';

update products set
  subtitle = 'Stamped',
  description = 'Black leather strap for analog work. Stamped once with your initials. Built for hands that take pictures.'
where id = 'at-strap';
