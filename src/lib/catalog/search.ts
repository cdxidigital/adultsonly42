import type { Entity, Kind } from "./types";
import { KINDS } from "./types";
import { industry } from "./industry";
import { desk } from "./desk";
import { house } from "./house";

export const entities: Entity[] = [...industry, ...desk, ...house];

const byId = new Map<string, Entity>();
for (const e of entities) {
  byId.set(`${e.kind}:${e.id}`, e);
  byId.set(e.id, e);
}

export function isKind(value: string): value is Kind {
  return (KINDS as readonly string[]).includes(value);
}

export function getEntity(kind: Kind, id: string): Entity | undefined {
  return byId.get(`${kind}:${id}`);
}

export function getById(id: string): Entity | undefined {
  return byId.get(id);
}

export function listKind(kind: Kind): Entity[] {
  if (kind === "social") return [];
  return entities.filter((e) => e.kind === kind);
}

export function counts(): Record<Kind, number> {
  const out = {
    performers: 0,
    productions: 0,
    companies: 0,
    agents: 0,
    events: 0,
    social: 0,
    law: 0,
  } as Record<Kind, number>;
  for (const e of entities) out[e.kind] += 1;
  out.social = socialDirectory().length;
  return out;
}

export type SocialRow = {
  platform: string;
  handle: string;
  href?: string;
  entity: Entity;
};

export function socialDirectory(): SocialRow[] {
  const rows: SocialRow[] = [];
  for (const e of entities) {
    for (const s of e.socials ?? []) {
      rows.push({ platform: s.platform, handle: s.handle, href: s.href, entity: e });
    }
  }
  rows.sort((a, b) => a.platform.localeCompare(b.platform) || a.handle.localeCompare(b.handle));
  return rows;
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[^a-z0-9§+]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function haystack(e: Entity): string {
  return [
    e.name,
    e.subtitle,
    ...(e.aka ?? []),
    e.summary,
    e.body ?? "",
    e.tags.join(" "),
    e.region ?? "",
    e.status ?? "",
    e.citation ?? "",
    e.jurisdiction ?? "",
    e.venue ?? "",
    ...(e.facts ?? []).map((f) => `${f.label} ${f.value}`),
    ...(e.credits ?? []).map((c) => `${c.role} ${c.title}`),
    ...(e.socials ?? []).map((s) => `${s.platform} ${s.handle}`),
  ]
    .join(" ")
    .toLowerCase();
}

export type Hit = { entity: Entity; score: number };

export function search(q: string, kind?: Kind | "all"): Hit[] {
  const tokens = tokenize(q);
  const pool =
    kind && kind !== "all"
      ? kind === "social"
        ? []
        : listKind(kind)
      : entities;
  if (tokens.length === 0) {
    return pool.map((entity) => ({ entity, score: 1 }));
  }

  const hits: Hit[] = [];
  for (const entity of pool) {
    const name = entity.name.toLowerCase();
    const aka = (entity.aka ?? []).map((a) => a.toLowerCase());
    const blob = haystack(entity);
    let score = 0;
    let miss = false;
    for (const t of tokens) {
      if (name === t) score += 80;
      else if (name.startsWith(t)) score += 48;
      else if (name.includes(t)) score += 32;
      else if (aka.some((a) => a === t || a.includes(t))) score += 28;
      else if (entity.citation?.toLowerCase().includes(t)) score += 40;
      else if (entity.tags.some((tag) => tag.includes(t))) score += 16;
      else if (blob.includes(t)) score += 8;
      else {
        miss = true;
        break;
      }
    }
    if (!miss) hits.push({ entity, score });
  }
  hits.sort((a, b) => b.score - a.score || a.entity.name.localeCompare(b.entity.name));
  return hits;
}

export function relatedOf(entity: Entity): Entity[] {
  const out: Entity[] = [];
  const seen = new Set<string>();
  for (const r of entity.related) {
    const hit = getEntity(r.kind, r.id);
    if (hit && !seen.has(`${hit.kind}:${hit.id}`)) {
      seen.add(`${hit.kind}:${hit.id}`);
      out.push(hit);
    }
  }
  return out;
}

export function resolveCredit(c: { kind?: Kind; id?: string }): Entity | undefined {
  if (!c.kind || !c.id) return undefined;
  return getEntity(c.kind, c.id);
}

export const totalIndexed = entities.length;
