import { r as createServerFn } from "./ssr.mjs";
import { l as osRank } from "./money-CfiFmu6E.mjs";
import { D as _enum, F as object, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-DaLAjX5Q.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ops-DKG_NDpI.js
async function activateOs(sql, userId, plan) {
	const existing = await sql`
    select plan, handle from creator_os where user_id = ${userId}
  `;
	const next = existing[0] && osRank(existing[0].plan) > osRank(plan) ? existing[0].plan : plan;
	await sql`
    insert into creator_os (user_id, plan, status, handle, views, clicks)
    values (${userId}, ${next}, 'active', ${existing[0]?.handle || `m${userId.replace(/[^a-z0-9]/gi, "").slice(-8).toLowerCase()}`}, 8, 1)
    on conflict (user_id) do update set
      plan = ${next},
      status = 'active'
  `;
}
async function openJob(sql, userId, productId, kind, title) {
	await sql`
    insert into house_jobs (user_id, product_id, kind, title, status)
    values (${userId}, ${productId}, ${kind}, ${title}, 'queued')
  `;
}
async function licenseTwin(sql, userId, productId, kind) {
	const twin = (await sql`
    select id from twins where product_id = ${productId}
  `)[0];
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
async function takeNight(sql, userId, productId, qty, cents) {
	if (productId === "night-boost") {
		await sql`
      insert into night_features (user_id, company, weeks, total_cents)
      values (${userId}, 'House tab', ${Math.max(1, qty)}, ${cents})
    `;
		return;
	}
	const night = (await sql`
    select id from nights where product_id = ${productId}
  `)[0];
	if (!night) return;
	await sql`
    insert into rsvps (user_id, night_id, qty, total_cents)
    values (${userId}, ${night.id}, ${qty}, ${cents})
    on conflict (user_id, night_id) do update set
      qty = rsvps.qty + excluded.qty,
      total_cents = rsvps.total_cents + excluded.total_cents
  `;
}
async function enrollLibrary(sql, userId) {
	await sql`
    insert into enrollments (user_id, product_id)
    select ${userId}, id from products where kind = 'academy' and active = true
    on conflict (user_id, product_id) do nothing
  `;
}
var getCreatorOs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("278a1daf6e625ecb9cf9ade921ccec835574642b074b93f8c923072f6f5d90b5"));
var storefrontInput = object({
	displayName: string().max(80),
	handle: string().max(32),
	bio: string().max(400),
	links: array(object({
		label: string().max(40),
		href: string().max(200)
	})).max(6),
	menu: array(object({
		title: string().max(60),
		price: string().max(24)
	})).max(8)
});
var saveStorefront = createServerFn({ method: "POST" }).validator((input) => storefrontInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("a7e06e2b229390320b0a129a88399c2a29511b872faf0291b306505c3fdd796c"));
var setLeakMonitor = createServerFn({ method: "POST" }).validator((on) => on).middleware([authMiddleware]).handler(createSsrRpc("68c419abfffd202a4c86426c5d10bdff5ae5f3614c88b7bc77cf1f880d52e88f"));
var postInput = object({
	platform: _enum([
		"x",
		"reddit",
		"telegram",
		"site"
	]),
	body: string().min(4).max(400),
	scheduledFor: string().min(8).max(32)
});
var queuePost = createServerFn({ method: "POST" }).validator((input) => postInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("877cb7ea4eedf6f36d9a47a62fcdb1478e50222f155309cbf0dfb462c86f0348"));
var markPost = createServerFn({ method: "POST" }).validator((id) => id).middleware([authMiddleware]).handler(createSsrRpc("cfe6b4106bdc03f8d2760c866ad0ca3126c4ca1ed839b34fe4040f7ece6079c7"));
var getTaxPack = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e05ec00edeee6982f7bd04c9c1887b650168b1a1b42f33bb2354598c2bb8edcf"));
var listTwins = createServerFn({ method: "GET" }).handler(createSsrRpc("a2a28a5a9cbae1c65d64eca20f78636160bde787413185ef1b739849e3f7bff7"));
var getTwin = createServerFn({ method: "GET" }).validator((id) => id).handler(createSsrRpc("83f934fb6f0891a58bb56ea36ecf34a56c1173c06509057fdd0bc632342ac2de"));
var listNights = createServerFn({ method: "GET" }).handler(createSsrRpc("f6c5e24141a51911f420811a00e107e81dacd4d32964d062dd2f904b15a8a647"));
var getPublicStorefront = createServerFn({ method: "GET" }).validator((handle) => handle).handler(createSsrRpc("725fdb5a662c9b0f7b5955aba1f866a6669bc2be5082b847c3d3c34de262c5aa"));
var tapStorefrontLink = createServerFn({ method: "POST" }).validator((handle) => handle).handler(createSsrRpc("49a89459f5c7319084a3bb64f68009aa0f44fa00192615ac507b8a7039bdbb0d"));
var CRAFT_EXAM = {
	id: "exam-craft",
	questions: [
		{
			id: "q1",
			prompt: "The first door of the house is:",
			options: [
				"A vibe check",
				"Eighteen and over, with no coded exceptions",
				"A moodboard"
			],
			answer: 1
		},
		{
			id: "q2",
			prompt: "Pronouns in a brief are:",
			options: [
				"A courtesy line",
				"Production data, changeable, fatal if ignored",
				"Optional if the still is androgynous"
			],
			answer: 1
		},
		{
			id: "q3",
			prompt: "A withdrawn yes means:",
			options: [
				"A scandal",
				"The campaign pauses and the likeness lease ends",
				"The house keeps the stills anyway"
			],
			answer: 1
		},
		{
			id: "q4",
			prompt: "This house will not:",
			options: [
				"Hold deposits for in-person dates or scrape a public face",
				"Charge for academy seats",
				"Put a name on a night ticket"
			],
			answer: 0
		}
	]
};
var takeCraftExam = createServerFn({ method: "POST" }).validator((answers) => answers).middleware([authMiddleware]).handler(createSsrRpc("c7e640dd6376ef09a0ed6645a6e025cdc10d3477872d7be222d617580edd815f"));
var getExamState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("be0f49bb60097e909f2639b7e5090bbf49970944307bc95a583d880594bf9fe9"));
var dossierInput = object({
	query: string().min(1).max(80),
	qid: string().max(16).optional(),
	entityId: string().max(64).optional(),
	title: string().min(1).max(120),
	sources: array(string().max(40)).max(16)
});
var getDossierState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("bc595797f28e1d493490fd41dd7c1ed469a0331c3a7c40f9fa03ffe064489c07"));
var fileDossier = createServerFn({ method: "POST" }).validator((input) => dossierInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("a2851ea36d304b00e3a586c2b9b8bea2d6fa52b47e386b6eb5591c881431ae8e"));
//#endregion
export { saveStorefront as _, getCreatorOs as a, takeNight as b, getPublicStorefront as c, licenseTwin as d, listNights as f, queuePost as g, openJob as h, fileDossier as i, getTaxPack as l, markPost as m, activateOs as n, getDossierState as o, listTwins as p, enrollLibrary as r, getExamState as s, CRAFT_EXAM as t, getTwin as u, setLeakMonitor as v, tapStorefrontLink as x, takeCraftExam as y };
