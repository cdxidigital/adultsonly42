import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  fanPlanFromProduct,
  hasAcademyLibrary,
  higherPlan,
  isDiscountable,
  memberRate,
  osPlanFromProduct,
} from "./money";
import { awardSpend } from "./rewards";
import { specLabel, validateSpec } from "./atelier";
import { activateOs, enrollLibrary, licenseTwin, openJob, takeNight } from "./ops";

export type ProductKind = string;

export type Product = {
  id: string;
  kind: ProductKind;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price_cents: number;
  image: string;
  inventory: number | null;
  sort: number;
};

export type Talent = {
  id: string;
  name: string;
  pronouns: string;
  role: string;
  bio: string;
  day_rate_cents: number;
  image: string;
  available: boolean;
};

export type Room = {
  id: string;
  name: string;
  blurb: string;
  hourly_cents: number;
  image: string;
};

export const listProducts = createServerFn({ method: "GET" })
  .validator((kind: unknown) => (typeof kind === "string" ? kind : ""))
  .handler(async ({ data: kind }) => {
    const sql = await getSql();
    if (kind) {
      return sql<Product>`
        select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
        from products where active = true and kind = ${kind} order by sort
      `;
    }
    return sql<Product>`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where active = true order by sort
    `;
  });

export const getProduct = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const rows = await sql<Product>`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where slug = ${slug} and active = true
    `;
    return rows[0] ?? null;
  });

export const listTalent = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<Talent>`
    select id, name, pronouns, role, bio, day_rate_cents, image, available
    from talent order by sort
  `;
});

export const getTalent = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    const rows = await sql<Talent>`
      select id, name, pronouns, role, bio, day_rate_cents, image, available
      from talent where id = ${id}
    `;
    return rows[0] ?? null;
  });

export const listRooms = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<Room>`
    select id, name, blurb, hourly_cents, image from rooms order by sort
  `;
});

export type CartLine = Product & { qty: number; spec: string; lineId: number };

export const getCart = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<Product & { qty: number; spec: string; line_id: number }>`
      select p.id, p.kind, p.slug, p.title, p.subtitle, p.description, p.price_cents, p.image, p.inventory, p.sort,
             c.qty, coalesce(c.spec, '') as spec, c.id as line_id
      from cart_items c
      join products p on p.id = c.product_id
      where c.user_id = ${context.userId}
      order by p.sort, c.id
    `;
    return rows.map((r) => ({
      id: r.id,
      kind: r.kind,
      slug: r.slug,
      title: r.title,
      subtitle: r.subtitle,
      description: r.description,
      price_cents: r.price_cents,
      image: r.image,
      inventory: r.inventory,
      sort: r.sort,
      qty: r.qty,
      spec: r.spec ?? "",
      lineId: r.line_id,
    }));
  });

export const addToCart = createServerFn({ method: "POST" })
  .validator((input: { productId: string; qty?: number; spec?: string }) => ({
    productId: input.productId,
    qty: Math.max(1, Math.min(8, input.qty ?? 1)),
    spec: typeof input.spec === "string" ? input.spec.slice(0, 400) : "",
  }))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const products = await sql<Product>`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where id = ${data.productId} and active = true
    `;
    const product = products[0];
    if (!product) throw new Error("Not in the house");
    if (product.inventory !== null && product.inventory < data.qty) {
      throw new Error("Sold through");
    }
    const spec = validateSpec(product.id, data.spec);
    const existing = await sql<{ id: number; qty: number }>`
      select id, qty from cart_items
      where user_id = ${context.userId} and product_id = ${data.productId} and spec = ${spec}
    `;
    if (existing[0]) {
      await sql`update cart_items set qty = ${existing[0].qty + data.qty} where id = ${existing[0].id}`;
    } else {
      await sql`
        insert into cart_items (user_id, product_id, qty, spec)
        values (${context.userId}, ${data.productId}, ${data.qty}, ${spec})
      `;
    }
    return { ok: true as const };
  });

export const setCartQty = createServerFn({ method: "POST" })
  .validator((input: { lineId: number; qty: number }) => input)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    if (data.qty <= 0) {
      await sql`
        delete from cart_items
        where user_id = ${context.userId} and id = ${data.lineId}
      `;
      return { ok: true as const };
    }
    await sql`
      update cart_items set qty = ${Math.max(1, Math.min(8, data.qty))}
      where user_id = ${context.userId} and id = ${data.lineId}
    `;
    return { ok: true as const };
  });

export const getDesk = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const mem = await sql<{ plan: string; status: string }>`
      select plan, status from memberships where user_id = ${context.userId}
    `;
    const cred = await sql<{ cents: number }>`
      select cents from credits where user_id = ${context.userId}
    `;
    const orders = await sql<{
      id: number;
      total_cents: number;
      credit_used: number;
      status: string;
      created_at: string;
    }>`
      select id, total_cents, credit_used, status, created_at::text as created_at
      from orders where user_id = ${context.userId}
      order by id desc limit 20
    `;
    const enrollments = await sql<{
      product_id: string;
      title: string;
      slug: string;
    }>`
      select e.product_id, p.title, p.slug
      from enrollments e join products p on p.id = e.product_id
      where e.user_id = ${context.userId}
    `;
    const bookings = await sql<{
      id: number;
      room_id: string;
      date: string;
      start_hour: number;
      hours: number;
      total_cents: number;
      status: string;
      name: string;
    }>`
      select b.id, b.room_id, b.date, b.start_hour, b.hours, b.total_cents, b.status, r.name
      from bookings b join rooms r on r.id = b.room_id
      where b.user_id = ${context.userId}
      order by b.date desc, b.start_hour desc
    `;
    const briefs = await sql<{
      id: number;
      kind: string;
      talent_id: string | null;
      company: string;
      details: string;
      deposit_cents: number;
      status: string;
      created_at: string;
    }>`
      select id, kind, talent_id, company, details, deposit_cents, status, created_at::text as created_at
      from briefs where user_id = ${context.userId}
      order by id desc
    `;
    const os = await sql<{ plan: string; handle: string }>`
      select plan, handle from creator_os where user_id = ${context.userId} and status = 'active'
    `;
    const jobs = await sql<{ id: number; kind: string; title: string; status: string }>`
      select id, kind, title, status from house_jobs
      where user_id = ${context.userId} order by id desc limit 12
    `;
    const licenses = await sql<{ title: string; kind: string; status: string }>`
      select t.title, l.kind, l.status
      from twin_licenses l join twins t on t.id = l.twin_id
      where l.user_id = ${context.userId}
      order by l.id desc
    `;
    const rsvps = await sql<{ title: string; date: string; qty: number; total_cents: number }>`
      select n.title, n.date, r.qty, r.total_cents
      from rsvps r join nights n on n.id = r.night_id
      where r.user_id = ${context.userId}
      order by n.date
    `;
    const badges = await sql<{ exam_id: string; score: number; passed: boolean }>`
      select exam_id, score, passed from academy_exams where user_id = ${context.userId}
    `;
    const features = await sql<{ company: string; weeks: number; total_cents: number }>`
      select company, weeks, total_cents from night_features
      where user_id = ${context.userId} order by id desc
    `;
    const dossiers = await sql<{ id: number; query: string; title: string; created_at: string }>`
      select id, query, title, created_at::text as created_at
      from atlas_dossiers
      where user_id = ${context.userId}
      order by id desc
      limit 12
    `;
    const profile = await sql<{ display_name: string; profile_type: string; status: string; visibility: string }>`
      select display_name, profile_type, status, visibility
      from talent_profiles where user_id = ${context.userId}
    `;
    return {
      plan: mem[0]?.plan ?? null,
      credits: cred[0]?.cents ?? 0,
      orders,
      enrollments,
      bookings,
      briefs,
      os: os[0] ?? null,
      jobs,
      licenses,
      rsvps,
      badges,
      features,
      dossiers,
      profile: profile[0] ?? null,
    };
  });

export const checkout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<Product & { qty: number; spec: string }>`
      select p.id, p.kind, p.slug, p.title, p.subtitle, p.description, p.price_cents, p.image, p.inventory, p.sort,
             c.qty, coalesce(c.spec, '') as spec
      from cart_items c
      join products p on p.id = c.product_id
      where c.user_id = ${context.userId}
    `;
    const lines = rows.map((r) => ({ ...r, spec: r.spec ?? "", lineId: 0 }));
    if (lines.length === 0) throw new Error("The tab is empty");

    for (const line of lines) {
      if (line.inventory !== null && line.inventory < line.qty) {
        throw new Error(`${line.title} is sold through`);
      }
    }

    const mem = await sql<{ plan: string }>`
      select plan from memberships where user_id = ${context.userId} and status = 'active'
    `;
    const plan = mem[0]?.plan ?? null;
    const rate = memberRate(plan);

    let subtotal = 0;
    const priced = lines.map((line) => {
      const unit = isDiscountable(line.kind)
        ? Math.round(line.price_cents * rate)
        : line.price_cents;
      subtotal += unit * line.qty;
      return { ...line, unit };
    });

    const cred = await sql<{ cents: number }>`
      select cents from credits where user_id = ${context.userId}
    `;
    const available = cred[0]?.cents ?? 0;
    const creditUsed = Math.min(available, subtotal);
    const total = subtotal - creditUsed;

    const inserted = await sql<{ id: number }>`
      insert into orders (user_id, total_cents, credit_used, status)
      values (${context.userId}, ${total}, ${creditUsed}, 'paid')
      returning id
    `;
    const orderId = inserted[0].id;

    for (const line of priced) {
      const title = (() => {
        const note = specLabel(line.spec, line.id);
        return note ? `${line.title} · ${note}` : line.title;
      })();
      await sql`
        insert into order_items (order_id, product_id, title, qty, unit_cents, spec)
        values (${orderId}, ${line.id}, ${title}, ${line.qty}, ${line.unit}, ${line.spec})
      `;
      if (line.inventory !== null) {
        await sql`
          update products set inventory = inventory - ${line.qty}
          where id = ${line.id}
        `;
      }
      if (line.kind === "academy") {
        await sql`
          insert into enrollments (user_id, product_id)
          values (${context.userId}, ${line.id})
          on conflict (user_id, product_id) do nothing
        `;
      }
      if (line.kind === "membership") {
        if (line.id === "pass-academy") {
          await enrollLibrary(sql, context.userId);
        } else {
          const nextPlan = fanPlanFromProduct(line.id) ?? "sesh";
          const existing = await sql<{ plan: string }>`
            select plan from memberships where user_id = ${context.userId}
          `;
          const already = existing[0]?.plan ?? null;
          const kept = higherPlan(already, nextPlan);
          await sql`
            insert into memberships (user_id, plan, status)
            values (${context.userId}, ${kept}, 'active')
            on conflict (user_id) do update set plan = ${kept}, status = 'active'
          `;
          if (hasAcademyLibrary(kept)) {
            await enrollLibrary(sql, context.userId);
          }
          if (kept === "house" && already !== "house" && already !== "patron") {
            await sql`
              insert into credits (user_id, cents)
              values (${context.userId}, 10000)
              on conflict (user_id) do update set cents = credits.cents + 10000
            `;
          }
        }
      }
      if (line.kind === "credit") {
        const add = line.price_cents * line.qty;
        await sql`
          insert into credits (user_id, cents)
          values (${context.userId}, ${add})
          on conflict (user_id) do update set cents = credits.cents + ${add}
        `;
      }
      if (line.kind === "os") {
        const osPlan = osPlanFromProduct(line.id);
        if (osPlan) await activateOs(sql, context.userId, osPlan);
      }
      if (line.kind === "service") {
        await openJob(sql, context.userId, line.id, "service", line.title);
      }
      if (line.kind === "twin") {
        const twinKind = line.id === "twin-exclusive" ? "exclusive" : line.id === "twin-build" ? "build" : "monthly";
        await licenseTwin(sql, context.userId, line.id, twinKind);
      }
      if (line.kind === "event") {
        await takeNight(sql, context.userId, line.id, line.qty, line.unit * line.qty);
      }
      if (line.kind === "atlas") {
        await openJob(sql, context.userId, line.id, "dossier", line.title);
      }
    }

    if (creditUsed > 0) {
      await sql`
        update credits set cents = cents - ${creditUsed}
        where user_id = ${context.userId}
      `;
    }

    await sql`delete from cart_items where user_id = ${context.userId}`;

    const bonus =
      (priced.some((l) => l.kind === "membership") ? 250 : 0) +
      (priced.some((l) => l.kind === "academy") ? 400 : 0) +
      (priced.some((l) => l.kind === "os") ? 300 : 0) +
      (priced.some((l) => l.kind === "service") ? 500 : 0) +
      (priced.some((l) => l.kind === "atlas") ? 200 : 0);
    await awardSpend(sql, context.userId, total, {
      kind: "spend",
      label: `Tab #${orderId}`,
      bonus,
    });

    return { orderId, total, creditUsed };
  });

export const getCourse = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const products = await sql<Product>`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where slug = ${slug} and kind = 'academy' and active = true
    `;
    const product = products[0];
    if (!product) return null;
    const modules = await sql<{
      id: string;
      title: string;
      sort: number;
    }>`
      select id, title, sort from course_modules
      where product_id = ${product.id} order by sort
    `;
    return { product, modules };
  });

export const getCourseReader = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .middleware([authMiddleware])
  .handler(async ({ context, data: slug }) => {
    const sql = await getSql();
    const products = await sql<Product>`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where slug = ${slug} and kind = 'academy'
    `;
    const product = products[0];
    if (!product) return { enrolled: false as const, modules: [] as { id: string; title: string; body: string; sort: number }[] };
    const enrolled = await sql<{ id: number }>`
      select id from enrollments
      where user_id = ${context.userId} and product_id = ${product.id}
    `;
    const mem = await sql<{ plan: string }>`
      select plan from memberships where user_id = ${context.userId} and status = 'active'
    `;
    const library = hasAcademyLibrary(mem[0]?.plan);
    if (!enrolled[0] && !library) {
      return { enrolled: false as const, modules: [] as { id: string; title: string; body: string; sort: number }[] };
    }
    if (library && !enrolled[0]) {
      await sql`
        insert into enrollments (user_id, product_id)
        values (${context.userId}, ${product.id})
        on conflict (user_id, product_id) do nothing
      `;
    }
    const modules = await sql<{
      id: string;
      title: string;
      body: string;
      sort: number;
    }>`
      select id, title, body, sort from course_modules
      where product_id = ${product.id} order by sort
    `;
    return { enrolled: true as const, modules };
  });

const bookingInput = z.object({
  roomId: z.string(),
  date: z.string(),
  startHour: z.number(),
  hours: z.number(),
});

export const listRoomDay = createServerFn({ method: "GET" })
  .validator((input: { roomId: string; date: string }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    return sql<{ start_hour: number; hours: number }>`
      select start_hour, hours from bookings
      where room_id = ${data.roomId} and date = ${data.date} and status = 'confirmed'
    `;
  });

export const bookRoom = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof bookingInput>) => bookingInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    if (data.hours < 2 || data.hours > 6) throw new Error("Two to six hours");
    if (data.startHour < 12 || data.startHour + data.hours > 22) {
      throw new Error("Rooms run 12:00–22:00");
    }
    const sql = await getSql();
    const rooms = await sql<Room>`
      select id, name, blurb, hourly_cents, image from rooms where id = ${data.roomId}
    `;
    const room = rooms[0];
    if (!room) throw new Error("No such room");

    const taken = await sql<{ start_hour: number; hours: number }>`
      select start_hour, hours from bookings
      where room_id = ${data.roomId} and date = ${data.date} and status = 'confirmed'
    `;
    const end = data.startHour + data.hours;
    const clash = taken.some((b) => data.startHour < b.start_hour + b.hours && end > b.start_hour);
    if (clash) throw new Error("That block is taken");

    const mem = await sql<{ plan: string }>`
      select plan from memberships where user_id = ${context.userId} and status = 'active'
    `;
    const rate = memberRate(mem[0]?.plan ?? null);
    const total = Math.round(room.hourly_cents * data.hours * rate);

    const cred = await sql<{ cents: number }>`
      select cents from credits where user_id = ${context.userId}
    `;
    const available = cred[0]?.cents ?? 0;
    const creditUsed = Math.min(available, total);
    const charged = total - creditUsed;

    const order = await sql<{ id: number }>`
      insert into orders (user_id, total_cents, credit_used, status)
      values (${context.userId}, ${charged}, ${creditUsed}, 'paid')
      returning id
    `;
    await sql`
      insert into order_items (order_id, product_id, title, qty, unit_cents)
      values (${order[0].id}, null, ${room.name + " · " + data.date}, ${data.hours}, ${Math.round(room.hourly_cents * rate)})
    `;
    if (creditUsed > 0) {
      await sql`
        update credits set cents = cents - ${creditUsed}
        where user_id = ${context.userId}
      `;
    }
    await sql`
      insert into bookings (user_id, room_id, date, start_hour, hours, total_cents, status)
      values (${context.userId}, ${data.roomId}, ${data.date}, ${data.startHour}, ${data.hours}, ${charged}, 'confirmed')
    `;
    await awardSpend(sql, context.userId, charged, {
      kind: "live",
      label: `${room.name} · ${data.date}`,
      bonus: 150,
    });
    return { total: charged, creditUsed };
  });

const briefInput = z.object({
  kind: z.enum(["talent", "campaign", "twin", "service"]),
  talentId: z.string().optional(),
  company: z.string().max(120),
  contactName: z.string().max(80),
  details: z.string().min(12).max(2000),
  payFee: z.boolean(),
});

export const submitBrief = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof briefInput>) => briefInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const feeId = data.kind === "talent" ? "fee-talent" : "dep-campaign";
    const feeRows = await sql<Product>`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where id = ${feeId}
    `;
    const fee = feeRows[0];
    let deposit = 0;
    if (data.payFee && fee) {
      deposit = fee.price_cents;
      const order = await sql<{ id: number }>`
        insert into orders (user_id, total_cents, credit_used, status)
        values (${context.userId}, ${deposit}, 0, 'paid')
        returning id
      `;
      await sql`
        insert into order_items (order_id, product_id, title, qty, unit_cents)
        values (${order[0].id}, ${fee.id}, ${fee.title}, 1, ${deposit})
      `;
    }
    await sql`
      insert into briefs (user_id, kind, talent_id, company, contact_name, details, deposit_cents, status)
      values (
        ${context.userId},
        ${data.kind},
        ${data.talentId ?? null},
        ${data.company},
        ${data.contactName},
        ${data.details},
        ${deposit},
        'received'
      )
    `;
    if (deposit > 0) {
      await awardSpend(sql, context.userId, deposit, {
        kind: "brief",
        label: `File · ${data.kind}`,
        bonus: 200,
      });
    }
    return { ok: true as const, deposit };
  });
