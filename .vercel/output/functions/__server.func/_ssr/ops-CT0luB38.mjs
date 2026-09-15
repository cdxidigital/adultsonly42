import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { l as osRank } from "./money-CfiFmu6E.mjs";
import { D as _enum, F as object, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { i as getSql, t as authMiddleware } from "./middleware-DaLAjX5Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ops-CT0luB38.js
function parseJson(raw, fallback) {
	try {
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function asOs(row) {
	return {
		...row,
		links: parseJson(row.links, []),
		menu: parseJson(row.menu, [])
	};
}
var getCreatorOs_createServerFn_handler = createServerRpc({
	id: "278a1daf6e625ecb9cf9ade921ccec835574642b074b93f8c923072f6f5d90b5",
	name: "getCreatorOs",
	filename: "src/lib/house/ops.ts"
}, (opts) => getCreatorOs.__executeServer(opts));
var getCreatorOs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getCreatorOs_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const row = (await sql`
      select plan, status, display_name, handle, bio, links, menu, leak_monitor, views, clicks
      from creator_os where user_id = ${context.userId}
    `)[0];
	if (!row) return {
		os: null,
		posts: []
	};
	const posts = await sql`
      select id, platform, body, scheduled_for, status
      from os_posts where user_id = ${context.userId}
      order by scheduled_for desc, id desc
      limit 24
    `;
	return {
		os: asOs(row),
		posts
	};
});
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
var saveStorefront_createServerFn_handler = createServerRpc({
	id: "a7e06e2b229390320b0a129a88399c2a29511b872faf0291b306505c3fdd796c",
	name: "saveStorefront",
	filename: "src/lib/house/ops.ts"
}, (opts) => saveStorefront.__executeServer(opts));
var saveStorefront = createServerFn({ method: "POST" }).validator((input) => storefrontInput.parse(input)).middleware([authMiddleware]).handler(saveStorefront_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (!(await sql`
      select plan from creator_os where user_id = ${context.userId} and status = 'active'
    `)[0]) throw new Error("Take an OS plan first");
	const handle = data.handle.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 32);
	if (handle.length < 2) throw new Error("Handle needs two characters");
	if ((await sql`
      select user_id from creator_os where handle = ${handle} and user_id <> ${context.userId}
    `)[0]) throw new Error("That handle is taken");
	await sql`
      update creator_os set
        display_name = ${data.displayName},
        handle = ${handle},
        bio = ${data.bio},
        links = ${JSON.stringify(data.links)},
        menu = ${JSON.stringify(data.menu)}
      where user_id = ${context.userId}
    `;
	return {
		ok: true,
		handle
	};
});
var setLeakMonitor_createServerFn_handler = createServerRpc({
	id: "68c419abfffd202a4c86426c5d10bdff5ae5f3614c88b7bc77cf1f880d52e88f",
	name: "setLeakMonitor",
	filename: "src/lib/house/ops.ts"
}, (opts) => setLeakMonitor.__executeServer(opts));
var setLeakMonitor = createServerFn({ method: "POST" }).validator((on) => on).middleware([authMiddleware]).handler(setLeakMonitor_createServerFn_handler, async ({ context, data: on }) => {
	const sql = await getSql();
	const rows = await sql`
      select plan from creator_os where user_id = ${context.userId} and status = 'active'
    `;
	if (!rows[0] || osRank(rows[0].plan) < 2) throw new Error("Leak watch sits on Pro");
	await sql`
      update creator_os set leak_monitor = ${on} where user_id = ${context.userId}
    `;
	return {
		ok: true,
		on
	};
});
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
var queuePost_createServerFn_handler = createServerRpc({
	id: "877cb7ea4eedf6f36d9a47a62fcdb1478e50222f155309cbf0dfb462c86f0348",
	name: "queuePost",
	filename: "src/lib/house/ops.ts"
}, (opts) => queuePost.__executeServer(opts));
var queuePost = createServerFn({ method: "POST" }).validator((input) => postInput.parse(input)).middleware([authMiddleware]).handler(queuePost_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const rows = await sql`
      select plan from creator_os where user_id = ${context.userId} and status = 'active'
    `;
	if (!rows[0] || osRank(rows[0].plan) < 2) throw new Error("The calendar sits on Pro");
	await sql`
      insert into os_posts (user_id, platform, body, scheduled_for, status)
      values (${context.userId}, ${data.platform}, ${data.body}, ${data.scheduledFor}, 'queued')
    `;
	return { ok: true };
});
var markPost_createServerFn_handler = createServerRpc({
	id: "cfe6b4106bdc03f8d2760c866ad0ca3126c4ca1ed839b34fe4040f7ece6079c7",
	name: "markPost",
	filename: "src/lib/house/ops.ts"
}, (opts) => markPost.__executeServer(opts));
var markPost = createServerFn({ method: "POST" }).validator((id) => id).middleware([authMiddleware]).handler(markPost_createServerFn_handler, async ({ context, data: id }) => {
	await (await getSql())`
      update os_posts set status = 'sent'
      where id = ${id} and user_id = ${context.userId}
    `;
	return { ok: true };
});
var getTaxPack_createServerFn_handler = createServerRpc({
	id: "e05ec00edeee6982f7bd04c9c1887b650168b1a1b42f33bb2354598c2bb8edcf",
	name: "getTaxPack",
	filename: "src/lib/house/ops.ts"
}, (opts) => getTaxPack.__executeServer(opts));
var getTaxPack = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getTaxPack_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const os = await sql`
      select plan from creator_os where user_id = ${context.userId} and status = 'active'
    `;
	if (!os[0] || osRank(os[0].plan) < 3) throw new Error("The BAS pack sits on Studio");
	return { lines: (await sql`
      select o.created_at::text as created_at, o.id as order_id, i.title, i.qty, i.unit_cents
      from orders o
      join order_items i on i.order_id = o.id
      where o.user_id = ${context.userId}
      order by o.id desc
      limit 80
    `).map((r) => {
		const aud = r.unit_cents * r.qty / 100;
		const gst = Math.round(aud / 11 * 100) / 100;
		return {
			date: r.created_at.slice(0, 10),
			order: r.order_id,
			item: r.title,
			aud,
			gst
		};
	}) };
});
var listTwins_createServerFn_handler = createServerRpc({
	id: "a2a28a5a9cbae1c65d64eca20f78636160bde787413185ef1b739849e3f7bff7",
	name: "listTwins",
	filename: "src/lib/house/ops.ts"
}, (opts) => listTwins.__executeServer(opts));
var listTwins = createServerFn({ method: "GET" }).handler(listTwins_createServerFn_handler, async () => {
	return (await getSql())`
    select t.id, t.talent_id, t.product_id, t.title, t.blurb, t.image,
           a.name as talent_name, a.pronouns, p.price_cents
    from twins t
    join talent a on a.id = t.talent_id
    join products p on p.id = t.product_id
    where t.status = 'live' and p.active = true
    order by t.sort
  `;
});
var getTwin_createServerFn_handler = createServerRpc({
	id: "83f934fb6f0891a58bb56ea36ecf34a56c1173c06509057fdd0bc632342ac2de",
	name: "getTwin",
	filename: "src/lib/house/ops.ts"
}, (opts) => getTwin.__executeServer(opts));
var getTwin = createServerFn({ method: "GET" }).validator((id) => id).handler(getTwin_createServerFn_handler, async ({ data: id }) => {
	return (await (await getSql())`
      select t.id, t.talent_id, t.product_id, t.title, t.blurb, t.image,
             a.name as talent_name, a.pronouns, p.price_cents
      from twins t
      join talent a on a.id = t.talent_id
      join products p on p.id = t.product_id
      where t.id = ${id} and t.status = 'live'
    `)[0] ?? null;
});
var listNights_createServerFn_handler = createServerRpc({
	id: "f6c5e24141a51911f420811a00e107e81dacd4d32964d062dd2f904b15a8a647",
	name: "listNights",
	filename: "src/lib/house/ops.ts"
}, (opts) => listNights.__executeServer(opts));
var listNights = createServerFn({ method: "GET" }).handler(listNights_createServerFn_handler, async () => {
	return (await getSql())`
    select n.id, n.product_id, n.title, n.venue, n.city, n.date, n.blurb, n.image, n.featured,
           p.price_cents, p.inventory
    from nights n
    join products p on p.id = n.product_id
    where p.active = true
    order by n.featured desc, n.date, n.sort
  `;
});
var getPublicStorefront_createServerFn_handler = createServerRpc({
	id: "725fdb5a662c9b0f7b5955aba1f866a6669bc2be5082b847c3d3c34de262c5aa",
	name: "getPublicStorefront",
	filename: "src/lib/house/ops.ts"
}, (opts) => getPublicStorefront.__executeServer(opts));
var getPublicStorefront = createServerFn({ method: "GET" }).validator((handle) => handle).handler(getPublicStorefront_createServerFn_handler, async ({ data: handle }) => {
	const sql = await getSql();
	const row = (await sql`
      select plan, status, display_name, handle, bio, links, menu, leak_monitor, views, clicks
      from creator_os where handle = ${handle} and status = 'active'
    `)[0];
	if (!row) return null;
	await sql`update creator_os set views = views + 1 where handle = ${handle}`;
	return asOs({
		...row,
		views: row.views + 1
	});
});
var tapStorefrontLink_createServerFn_handler = createServerRpc({
	id: "49a89459f5c7319084a3bb64f68009aa0f44fa00192615ac507b8a7039bdbb0d",
	name: "tapStorefrontLink",
	filename: "src/lib/house/ops.ts"
}, (opts) => tapStorefrontLink.__executeServer(opts));
var tapStorefrontLink = createServerFn({ method: "POST" }).validator((handle) => handle).handler(tapStorefrontLink_createServerFn_handler, async ({ data: handle }) => {
	await (await getSql())`update creator_os set clicks = clicks + 1 where handle = ${handle} and status = 'active'`;
	return { ok: true };
});
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
var takeCraftExam_createServerFn_handler = createServerRpc({
	id: "c7e640dd6376ef09a0ed6645a6e025cdc10d3477872d7be222d617580edd815f",
	name: "takeCraftExam",
	filename: "src/lib/house/ops.ts"
}, (opts) => takeCraftExam.__executeServer(opts));
var takeCraftExam = createServerFn({ method: "POST" }).validator((answers) => answers).middleware([authMiddleware]).handler(takeCraftExam_createServerFn_handler, async ({ context, data: answers }) => {
	const sql = await getSql();
	if (!(await sql`
      select i.id from order_items i
      join orders o on o.id = i.order_id
      where o.user_id = ${context.userId} and i.product_id = 'exam-craft'
      limit 1
    `)[0]) throw new Error("Settle the exam on the tab first");
	const prior = await sql`
      select passed, score from academy_exams
      where user_id = ${context.userId} and exam_id = 'exam-craft'
    `;
	if (prior[0]?.passed) return {
		score: prior[0].score,
		passed: true,
		already: true
	};
	let correct = 0;
	CRAFT_EXAM.questions.forEach((q, i) => {
		if (answers[i] === q.answer) correct += 1;
	});
	const score = Math.round(correct / CRAFT_EXAM.questions.length * 100);
	const passed = score >= 75;
	await sql`
      insert into academy_exams (user_id, exam_id, score, passed)
      values (${context.userId}, 'exam-craft', ${score}, ${passed})
      on conflict (user_id, exam_id) do update set score = ${score}, passed = ${passed}
    `;
	return {
		score,
		passed,
		already: false
	};
});
var getExamState_createServerFn_handler = createServerRpc({
	id: "be0f49bb60097e909f2639b7e5090bbf49970944307bc95a583d880594bf9fe9",
	name: "getExamState",
	filename: "src/lib/house/ops.ts"
}, (opts) => getExamState.__executeServer(opts));
var getExamState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getExamState_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const bought = await sql`
      select i.id from order_items i
      join orders o on o.id = i.order_id
      where o.user_id = ${context.userId} and i.product_id = 'exam-craft'
      limit 1
    `;
	const row = await sql`
      select score, passed from academy_exams
      where user_id = ${context.userId} and exam_id = 'exam-craft'
    `;
	return {
		bought: Boolean(bought[0]),
		result: row[0] ?? null
	};
});
var dossierInput = object({
	query: string().min(1).max(80),
	qid: string().max(16).optional(),
	entityId: string().max(64).optional(),
	title: string().min(1).max(120),
	sources: array(string().max(40)).max(16)
});
var getDossierState_createServerFn_handler = createServerRpc({
	id: "bc595797f28e1d493490fd41dd7c1ed469a0331c3a7c40f9fa03ffe064489c07",
	name: "getDossierState",
	filename: "src/lib/house/ops.ts"
}, (opts) => getDossierState.__executeServer(opts));
var getDossierState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDossierState_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const bought = await sql`
      select i.id from order_items i
      join orders o on o.id = i.order_id
      where o.user_id = ${context.userId} and i.product_id = 'atlas-dossier'
      limit 1
    `;
	const files = await sql`
      select id, query, qid, entity_id, title, sources, created_at::text as created_at
      from atlas_dossiers
      where user_id = ${context.userId}
      order by id desc
      limit 24
    `;
	return {
		bought: Boolean(bought[0]),
		files
	};
});
var fileDossier_createServerFn_handler = createServerRpc({
	id: "a2851ea36d304b00e3a586c2b9b8bea2d6fa52b47e386b6eb5591c881431ae8e",
	name: "fileDossier",
	filename: "src/lib/house/ops.ts"
}, (opts) => fileDossier.__executeServer(opts));
var fileDossier = createServerFn({ method: "POST" }).validator((input) => dossierInput.parse(input)).middleware([authMiddleware]).handler(fileDossier_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (!(await sql`
      select i.id from order_items i
      join orders o on o.id = i.order_id
      where o.user_id = ${context.userId} and i.product_id = 'atlas-dossier'
      limit 1
    `)[0]) throw new Error("Settle the dossier pack first");
	const qid = data.qid ?? "";
	const entityId = data.entityId ?? "";
	const existing = await sql`
      select id from atlas_dossiers
      where user_id = ${context.userId} and query = ${data.query} and qid = ${qid} and entity_id = ${entityId}
      limit 1
    `;
	if (existing[0]) return {
		id: existing[0].id,
		already: true
	};
	return {
		id: (await sql`
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
    `)[0].id,
		already: false
	};
});
//#endregion
export { fileDossier_createServerFn_handler, getCreatorOs_createServerFn_handler, getDossierState_createServerFn_handler, getExamState_createServerFn_handler, getPublicStorefront_createServerFn_handler, getTaxPack_createServerFn_handler, getTwin_createServerFn_handler, listNights_createServerFn_handler, listTwins_createServerFn_handler, markPost_createServerFn_handler, queuePost_createServerFn_handler, saveStorefront_createServerFn_handler, setLeakMonitor_createServerFn_handler, takeCraftExam_createServerFn_handler, tapStorefrontLink_createServerFn_handler };
