import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { osRank } from "./money";

export type OsLink = { label: string; href: string };
export type OsMenu = { title: string; price: string };

export type CreatorOs = {
  plan: string;
  status: string;
  display_name: string;
  handle: string;
  bio: string;
  links: OsLink[];
  menu: OsMenu[];
  leak_monitor: boolean;
  views: number;
  clicks: number;
};

export type OsPost = {
  id: number;
  platform: string;
  body: string;
  scheduled_for: string;
  status: string;
};

export type TwinRow = {
  id: string;
  talent_id: string;
  product_id: string;
  title: string;
  blurb: string;
  image: string;
  talent_name: string;
  pronouns: string;
  price_cents: number;
};

export type NightRow = {
  id: string;
  product_id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  blurb: string;
  image: string;
  featured: boolean;
  price_cents: number;
  inventory: number | null;
};

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function asOs(row: {
  plan: string;
  status: string;
  display_name: string;
  handle: string;
  bio: string;
  links: string;
  menu: string;
  leak_monitor: boolean;
  views: number;
  clicks: number;
}): CreatorOs {
  return {
    ...row,
    links: parseJson<OsLink[]>(row.links, []),
    menu: parseJson<OsMenu[]>(row.menu, []),
  };
}

export async function activateOs(sql: Sql, userId: string, plan: string) {
  const existing = await sql<{ plan: string; handle: string }>`
    select plan, handle from creator_os where user_id = ${userId}
  `;
  const next = existing[0] && osRank(existing[0].plan) > osRank(plan) ? existing[0].plan : plan;
  const handle = existing[0]?.handle || `m${userId.replace(/[^a-z0-9]/gi, "").slice(-8).toLowerCase()}`;
  await sql`
    insert into creator_os (user_id, plan, status, handle, views, clicks)
    values (${userId}, ${next}, 'active', ${handle}, 8, 1)
    on conflict (user_id) do update set
      plan = ${next},
      status = 'active'
  `;
}

export async function openJob(sql: Sql, userId: string, productId: string, kind: string, title: string) {
  await sql`
    insert into house_jobs (user_id, product_id, kind, title, status)
    values (${userId}, ${productId}, ${kind}, ${title}, 'queued')
  `;
}

export async function licenseTwin(sql: Sql, userId: string, productId: string, kind: string) {
  const twins = await sql<{ id: string }>`
    select id from twins where product_id = ${productId}
  `;
  const twin = twins[0];
  if (!twin) {
    await openJob(sql, userId, productId, "twin", kind === "exclusive" ? "Exclusive lookbook" : "Lookbook build");
    return;
  }
  await sql`
    insert into twin_licenses (user_id, twin_id, kind, status)
    values (${userId}, ${twin.id}, ${kind}, 'active')
    on conflict (user_id, twin_id) do update set status = 'active', kind = ${kind}
  `;
}

export async function takeNight(sql: Sql, userId: string, productId: string, qty: number, cents: number) {
  if (productId === "night-boost") {
    await sql`
      insert into night_features (user_id, company, weeks, total_cents)
      values (${userId}, 'House tab', ${Math.max(1, qty)}, ${cents})
    `;
    return;
  }
  const nights = await sql<{ id: string }>`
    select id from nights where product_id = ${productId}
  `;
  const night = nights[0];
  if (!night) return;
  await sql`
    insert into rsvps (user_id, night_id, qty, total_cents)
    values (${userId}, ${night.id}, ${qty}, ${cents})
    on conflict (user_id, night_id) do update set
      qty = rsvps.qty + excluded.qty,
      total_cents = rsvps.total_cents + excluded.total_cents
  `;
}

export async function enrollLibrary(sql: Sql, userId: string) {
  await sql`
    insert into enrollments (user_id, product_id)
    select ${userId}, id from products where kind = 'academy' and active = true
    on conflict (user_id, product_id) do nothing
  `;
}

export const getCreatorOs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      plan: string;
      status: string;
      display_name: string;
      handle: string;
      bio: string;
      links: string;
      menu: string;
      leak_monitor: boolean;
      views: number;
      clicks: number;
    }>`
      select plan, status, display_name, handle, bio, links, menu, leak_monitor, views, clicks
      from creator_os where user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) return { os: null as CreatorOs | null, posts: [] as OsPost[] };
    const posts = await sql<OsPost>`
      select id, platform, body, scheduled_for, status
      from os_posts where user_id = ${context.userId}
      order by scheduled_for desc, id desc
      limit 24
    `;
    return { os: asOs(row), posts };
  });

const storefrontInput = z.object({
  displayName: z.string().max(80),
  handle: z.string().max(32),
  bio: z.string().max(400),
  links: z.array(z.object({ label: z.string().max(40), href: z.string().max(200) })).max(6),
  menu: z.array(z.object({ title: z.string().max(60), price: z.string().max(24) })).max(8),
});

export const saveStorefront = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof storefrontInput>) => storefrontInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ plan: string }>`
      select plan from creator_os where user_id = ${context.userId} and status = 'active'
    `;
    if (!rows[0]) throw new Error("Take an OS plan first");
    const handle = data.handle
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 32);
    if (handle.length < 2) throw new Error("Handle needs two characters");
    const taken = await sql<{ user_id: string }>`
      select user_id from creator_os where handle = ${handle} and user_id <> ${context.userId}
    `;
    if (taken[0]) throw new Error("That handle is taken");
    await sql`
      update creator_os set
        display_name = ${data.displayName},
        handle = ${handle},
        bio = ${data.bio},
        links = ${JSON.stringify(data.links)},
        menu = ${JSON.stringify(data.menu)}
      where user_id = ${context.userId}
    `;
    return { ok: true as const, handle };
  });

export const setLeakMonitor = createServerFn({ method: "POST" })
  .validator((on: boolean) => on)
  .middleware([authMiddleware])
  .handler(async ({ context, data: on }) => {
    const sql = await getSql();
    const rows = await sql<{ plan: string }>`
      select plan from creator_os where user_id = ${context.userId} and status = 'active'
    `;
    if (!rows[0] || osRank(rows[0].plan) < 2) throw new Error("Leak watch sits on Pro");
    await sql`
      update creator_os set leak_monitor = ${on} where user_id = ${context.userId}
    `;
    return { ok: true as const, on };
  });

const postInput = z.object({
  platform: z.enum(["x", "reddit", "telegram", "site"]),
  body: z.string().min(4).max(400),
  scheduledFor: z.string().min(8).max(32),
});

export const queuePost = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof postInput>) => postInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ plan: string }>`
      select plan from creator_os where user_id = ${context.userId} and status = 'active'
    `;
    if (!rows[0] || osRank(rows[0].plan) < 2) throw new Error("The calendar sits on Pro");
    await sql`
      insert into os_posts (user_id, platform, body, scheduled_for, status)
      values (${context.userId}, ${data.platform}, ${data.body}, ${data.scheduledFor}, 'queued')
    `;
    return { ok: true as const };
  });

export const markPost = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .middleware([authMiddleware])
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`
      update os_posts set status = 'sent'
      where id = ${id} and user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

export const getTaxPack = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const os = await sql<{ plan: string }>`
      select plan from creator_os where user_id = ${context.userId} and status = 'active'
    `;
    if (!os[0] || osRank(os[0].plan) < 3) throw new Error("The BAS pack sits on Studio");
    const rows = await sql<{
      created_at: string;
      order_id: number;
      title: string;
      qty: number;
      unit_cents: number;
    }>`
      select o.created_at::text as created_at, o.id as order_id, i.title, i.qty, i.unit_cents
      from orders o
      join order_items i on i.order_id = o.id
      where o.user_id = ${context.userId}
      order by o.id desc
      limit 80
    `;
    const lines = rows.map((r) => {
      const aud = (r.unit_cents * r.qty) / 100;
      const gst = Math.round((aud / 11) * 100) / 100;
      return {
        date: r.created_at.slice(0, 10),
        order: r.order_id,
        item: r.title,
        aud,
        gst,
      };
    });
    return { lines };
  });

export const listTwins = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<TwinRow>`
    select t.id, t.talent_id, t.product_id, t.title, t.blurb, t.image,
           a.name as talent_name, a.pronouns, p.price_cents
    from twins t
    join talent a on a.id = t.talent_id
    join products p on p.id = t.product_id
    where t.status = 'live' and p.active = true
    order by t.sort
  `;
});

export const getTwin = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    const rows = await sql<TwinRow>`
      select t.id, t.talent_id, t.product_id, t.title, t.blurb, t.image,
             a.name as talent_name, a.pronouns, p.price_cents
      from twins t
      join talent a on a.id = t.talent_id
      join products p on p.id = t.product_id
      where t.id = ${id} and t.status = 'live'
    `;
    return rows[0] ?? null;
  });

export const listNights = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<NightRow>`
    select n.id, n.product_id, n.title, n.venue, n.city, n.date, n.blurb, n.image, n.featured,
           p.price_cents, p.inventory
    from nights n
    join products p on p.id = n.product_id
    where p.active = true
    order by n.featured desc, n.date, n.sort
  `;
});

export const getPublicStorefront = createServerFn({ method: "GET" })
  .validator((handle: string) => handle)
  .handler(async ({ data: handle }) => {
    const sql = await getSql();
    const rows = await sql<{
      plan: string;
      status: string;
      display_name: string;
      handle: string;
      bio: string;
      links: string;
      menu: string;
      leak_monitor: boolean;
      views: number;
      clicks: number;
    }>`
      select plan, status, display_name, handle, bio, links, menu, leak_monitor, views, clicks
      from creator_os where handle = ${handle} and status = 'active'
    `;
    const row = rows[0];
    if (!row) return null;
    await sql`update creator_os set views = views + 1 where handle = ${handle}`;
    return asOs({ ...row, views: row.views + 1 });
  });

export const tapStorefrontLink = createServerFn({ method: "POST" })
  .validator((handle: string) => handle)
  .handler(async ({ data: handle }) => {
    const sql = await getSql();
    await sql`update creator_os set clicks = clicks + 1 where handle = ${handle} and status = 'active'`;
    return { ok: true as const };
  });

export const CRAFT_EXAM = {
  id: "exam-craft",
  questions: [
    {
      id: "q1",
      prompt: "The first door of the house is:",
      options: ["A vibe check", "Eighteen and over, with no coded exceptions", "A moodboard"],
      answer: 1,
    },
    {
      id: "q2",
      prompt: "Pronouns in a brief are:",
      options: ["A courtesy line", "Production data, changeable, fatal if ignored", "Optional if the still is androgynous"],
      answer: 1,
    },
    {
      id: "q3",
      prompt: "A withdrawn yes means:",
      options: ["A scandal", "The campaign pauses and the likeness lease ends", "The house keeps the stills anyway"],
      answer: 1,
    },
    {
      id: "q4",
      prompt: "This house will not:",
      options: [
        "Hold deposits for in-person dates or scrape a public face",
        "Charge for academy seats",
        "Put a name on a night ticket",
      ],
      answer: 0,
    },
  ],
};

export const takeCraftExam = createServerFn({ method: "POST" })
  .validator((answers: number[]) => answers)
  .middleware([authMiddleware])
  .handler(async ({ context, data: answers }) => {
    const sql = await getSql();
    const bought = await sql<{ id: number }>`
      select i.id from order_items i
      join orders o on o.id = i.order_id
      where o.user_id = ${context.userId} and i.product_id = 'exam-craft'
      limit 1
    `;
    if (!bought[0]) throw new Error("Settle the exam on the tab first");
    const prior = await sql<{ passed: boolean; score: number }>`
      select passed, score from academy_exams
      where user_id = ${context.userId} and exam_id = 'exam-craft'
    `;
    if (prior[0]?.passed) return { score: prior[0].score, passed: true as const, already: true as const };

    let correct = 0;
    CRAFT_EXAM.questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct += 1;
    });
    const score = Math.round((correct / CRAFT_EXAM.questions.length) * 100);
    const passed = score >= 75;
    await sql`
      insert into academy_exams (user_id, exam_id, score, passed)
      values (${context.userId}, 'exam-craft', ${score}, ${passed})
      on conflict (user_id, exam_id) do update set score = ${score}, passed = ${passed}
    `;
    return { score, passed, already: false as const };
  });

export const getExamState = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const bought = await sql<{ id: number }>`
      select i.id from order_items i
      join orders o on o.id = i.order_id
      where o.user_id = ${context.userId} and i.product_id = 'exam-craft'
      limit 1
    `;
    const row = await sql<{ score: number; passed: boolean }>`
      select score, passed from academy_exams
      where user_id = ${context.userId} and exam_id = 'exam-craft'
    `;
    return {
      bought: Boolean(bought[0]),
      result: row[0] ?? null,
    };
  });

const dossierInput = z.object({
  query: z.string().min(1).max(80),
  qid: z.string().max(16).optional(),
  entityId: z.string().max(64).optional(),
  title: z.string().min(1).max(120),
  sources: z.array(z.string().max(40)).max(16),
});

export type DossierFile = {
  id: number;
  query: string;
  qid: string;
  entity_id: string;
  title: string;
  sources: string;
  created_at: string;
};

export const getDossierState = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const bought = await sql<{ id: number }>`
      select i.id from order_items i
      join orders o on o.id = i.order_id
      where o.user_id = ${context.userId} and i.product_id = 'atlas-dossier'
      limit 1
    `;
    const files = await sql<DossierFile>`
      select id, query, qid, entity_id, title, sources, created_at::text as created_at
      from atlas_dossiers
      where user_id = ${context.userId}
      order by id desc
      limit 24
    `;
    return { bought: Boolean(bought[0]), files };
  });

export const fileDossier = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof dossierInput>) => dossierInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const bought = await sql<{ id: number }>`
      select i.id from order_items i
      join orders o on o.id = i.order_id
      where o.user_id = ${context.userId} and i.product_id = 'atlas-dossier'
      limit 1
    `;
    if (!bought[0]) throw new Error("Settle the dossier pack first");
    const qid = data.qid ?? "";
    const entityId = data.entityId ?? "";
    const existing = await sql<{ id: number }>`
      select id from atlas_dossiers
      where user_id = ${context.userId} and query = ${data.query} and qid = ${qid} and entity_id = ${entityId}
      limit 1
    `;
    if (existing[0]) return { id: existing[0].id, already: true as const };
    const inserted = await sql<{ id: number }>`
      insert into atlas_dossiers (user_id, query, qid, entity_id, title, sources)
      values (
        ${context.userId},
        ${data.query},
        ${qid},
        ${entityId},
        ${data.title},
        ${JSON.stringify(data.sources)}
      )
      returning id
    `;
    return { id: inserted[0].id, already: false as const };
  });

