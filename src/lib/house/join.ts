import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type JoinFile = {
  display_name: string;
  location: string;
  role: string;
  intent: string[];
  energy: string;
  profile_type: string;
  focus: string[];
  height: string;
  chest: string;
  waist: string;
  hips: string;
  shoe: string;
  availability: string;
  visibility: string;
  portrait: string;
  lookbook: string[];
  status: string;
  submitted_at: string;
};

const fileInput = z.object({
  displayName: z.string().min(2).max(80),
  location: z.string().min(2).max(80),
  role: z.string().max(80),
  intent: z.array(z.string().max(40)).max(8),
  energy: z.string().max(80),
  profileType: z.string().min(2).max(40),
  focus: z.array(z.string().max(40)).max(8),
  height: z.string().max(24),
  chest: z.string().max(24),
  waist: z.string().max(24),
  hips: z.string().max(24),
  shoe: z.string().max(24),
  availability: z.string().max(240),
  visibility: z.string().min(2).max(80),
  portrait: z.string().max(900_000),
  lookbook: z.array(z.string().max(900_000)).max(4),
});

function parseList(raw: string): string[] {
  try {
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export const getJoinFile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      display_name: string;
      location: string;
      role: string;
      intent: string;
      energy: string;
      profile_type: string;
      focus: string;
      height: string;
      chest: string;
      waist: string;
      hips: string;
      shoe: string;
      availability: string;
      visibility: string;
      portrait: string;
      lookbook: string;
      status: string;
      submitted_at: string;
    }>`
      select display_name, location, role, intent, energy, profile_type, focus, height, chest, waist, hips, shoe,
             availability, visibility, portrait, lookbook, status, submitted_at::text as submitted_at
      from talent_profiles where user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) return { file: null as JoinFile | null };
    return {
      file: {
        ...row,
        intent: parseList(row.intent),
        focus: parseList(row.focus),
        lookbook: parseList(row.lookbook),
      },
    };
  });

export const submitJoin = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof fileInput>) => fileInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into talent_profiles (
        user_id, display_name, location, role, intent, energy, profile_type, focus,
        height, chest, waist, hips, shoe, availability, visibility, portrait, lookbook, status
      )
      values (
        ${context.userId},
        ${data.displayName},
        ${data.location},
        ${data.role},
        ${JSON.stringify(data.intent)},
        ${data.energy},
        ${data.profileType},
        ${JSON.stringify(data.focus)},
        ${data.height},
        ${data.chest},
        ${data.waist},
        ${data.hips},
        ${data.shoe},
        ${data.availability},
        ${data.visibility},
        ${data.portrait},
        ${JSON.stringify(data.lookbook)},
        'pending_review'
      )
      on conflict (user_id) do update set
        display_name = excluded.display_name,
        location = excluded.location,
        role = excluded.role,
        intent = excluded.intent,
        energy = excluded.energy,
        profile_type = excluded.profile_type,
        focus = excluded.focus,
        height = excluded.height,
        chest = excluded.chest,
        waist = excluded.waist,
        hips = excluded.hips,
        shoe = excluded.shoe,
        availability = excluded.availability,
        visibility = excluded.visibility,
        portrait = excluded.portrait,
        lookbook = excluded.lookbook,
        status = 'pending_review',
        updated_at = now()
    `;
    await sql`delete from profile_drafts where user_id = ${context.userId}`;
    return { ok: true as const };
  });
