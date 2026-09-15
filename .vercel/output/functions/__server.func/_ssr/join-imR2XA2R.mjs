import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { F as object, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { i as getSql, t as authMiddleware } from "./middleware-DaLAjX5Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-imR2XA2R.js
var fileInput = object({
	displayName: string().min(2).max(80),
	location: string().min(2).max(80),
	role: string().max(80),
	intent: array(string().max(40)).max(8),
	energy: string().max(80),
	profileType: string().min(2).max(40),
	focus: array(string().max(40)).max(8),
	height: string().max(24),
	chest: string().max(24),
	waist: string().max(24),
	hips: string().max(24),
	shoe: string().max(24),
	availability: string().max(240),
	visibility: string().min(2).max(80),
	portrait: string().max(9e5),
	lookbook: array(string().max(9e5)).max(4)
});
function parseList(raw) {
	try {
		const v = JSON.parse(raw);
		return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
	} catch {
		return [];
	}
}
var getJoinFile_createServerFn_handler = createServerRpc({
	id: "1c8a3c38ba6ae9008d53f0d7c164a82863d842bf9380e0242c1d787bc00ad339",
	name: "getJoinFile",
	filename: "src/lib/house/join.ts"
}, (opts) => getJoinFile.__executeServer(opts));
var getJoinFile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getJoinFile_createServerFn_handler, async ({ context }) => {
	const row = (await (await getSql())`
      select display_name, location, role, intent, energy, profile_type, focus, height, chest, waist, hips, shoe,
             availability, visibility, portrait, lookbook, status, submitted_at::text as submitted_at
      from talent_profiles where user_id = ${context.userId}
    `)[0];
	if (!row) return { file: null };
	return { file: {
		...row,
		intent: parseList(row.intent),
		focus: parseList(row.focus),
		lookbook: parseList(row.lookbook)
	} };
});
var submitJoin_createServerFn_handler = createServerRpc({
	id: "c24611699872d78a3a12f53e339463e18258b63d4d43472c706b30c442c9d8c2",
	name: "submitJoin",
	filename: "src/lib/house/join.ts"
}, (opts) => submitJoin.__executeServer(opts));
var submitJoin = createServerFn({ method: "POST" }).validator((input) => fileInput.parse(input)).middleware([authMiddleware]).handler(submitJoin_createServerFn_handler, async ({ context, data }) => {
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
	return { ok: true };
});
//#endregion
export { getJoinFile_createServerFn_handler, submitJoin_createServerFn_handler };
