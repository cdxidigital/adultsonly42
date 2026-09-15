import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { a as isDiscountable, c as osPlanFromProduct, i as higherPlan, n as fanPlanFromProduct, r as hasAcademyLibrary, s as memberRate } from "./money-CfiFmu6E.mjs";
import { A as boolean, D as _enum, F as object, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { i as getSql, t as authMiddleware } from "./middleware-DaLAjX5Q.mjs";
import { b as takeNight, d as licenseTwin, h as openJob, n as activateOs, r as enrollLibrary } from "./ops-DKG_NDpI.mjs";
import { a as validateSpec, r as specLabel } from "./atelier--laWbw2Z.mjs";
import { t as awardSpend } from "./rewards-DNE05TVd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-ClY7G4Q5.js
var listProducts_createServerFn_handler = createServerRpc({
	id: "741b8bd188813d7d396f95ea74805584ce6f7a424994980a515e738f105f1e89",
	name: "listProducts",
	filename: "src/lib/house/shop.ts"
}, (opts) => listProducts.__executeServer(opts));
var listProducts = createServerFn({ method: "GET" }).validator((kind) => typeof kind === "string" ? kind : "").handler(listProducts_createServerFn_handler, async ({ data: kind }) => {
	const sql = await getSql();
	if (kind) return sql`
        select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
        from products where active = true and kind = ${kind} order by sort
      `;
	return sql`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where active = true order by sort
    `;
});
var getProduct_createServerFn_handler = createServerRpc({
	id: "c51a67b4d68558e25f2a4d267983c9afa599ba75687d3cdd3d87c18bd26802c9",
	name: "getProduct",
	filename: "src/lib/house/shop.ts"
}, (opts) => getProduct.__executeServer(opts));
var getProduct = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getProduct_createServerFn_handler, async ({ data: slug }) => {
	return (await (await getSql())`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where slug = ${slug} and active = true
    `)[0] ?? null;
});
var listTalent_createServerFn_handler = createServerRpc({
	id: "6b0efdee43a97f68367a6d30c6cd7b70e0a403fa9d4afe7f52b8e137507c77e3",
	name: "listTalent",
	filename: "src/lib/house/shop.ts"
}, (opts) => listTalent.__executeServer(opts));
var listTalent = createServerFn({ method: "GET" }).handler(listTalent_createServerFn_handler, async () => {
	return (await getSql())`
    select id, name, pronouns, role, bio, day_rate_cents, image, available
    from talent order by sort
  `;
});
var getTalent_createServerFn_handler = createServerRpc({
	id: "2540b7b11a6f484f804d4f82a7b40f7de8fa1d434ee7d8b180cd76d417c39035",
	name: "getTalent",
	filename: "src/lib/house/shop.ts"
}, (opts) => getTalent.__executeServer(opts));
var getTalent = createServerFn({ method: "GET" }).validator((id) => id).handler(getTalent_createServerFn_handler, async ({ data: id }) => {
	return (await (await getSql())`
      select id, name, pronouns, role, bio, day_rate_cents, image, available
      from talent where id = ${id}
    `)[0] ?? null;
});
var listRooms_createServerFn_handler = createServerRpc({
	id: "770f14375f67e8042af794f75e0e56ce1183d644bc092f3c79e55b74255aeb5b",
	name: "listRooms",
	filename: "src/lib/house/shop.ts"
}, (opts) => listRooms.__executeServer(opts));
var listRooms = createServerFn({ method: "GET" }).handler(listRooms_createServerFn_handler, async () => {
	return (await getSql())`
    select id, name, blurb, hourly_cents, image from rooms order by sort
  `;
});
var getCart_createServerFn_handler = createServerRpc({
	id: "78be03387fae999d10f2aa0f91e39494adcaf54b57bb7b993b704ee41a333612",
	name: "getCart",
	filename: "src/lib/house/shop.ts"
}, (opts) => getCart.__executeServer(opts));
var getCart = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getCart_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select p.id, p.kind, p.slug, p.title, p.subtitle, p.description, p.price_cents, p.image, p.inventory, p.sort,
             c.qty, coalesce(c.spec, '') as spec, c.id as line_id
      from cart_items c
      join products p on p.id = c.product_id
      where c.user_id = ${context.userId}
      order by p.sort, c.id
    `).map((r) => ({
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
		lineId: r.line_id
	}));
});
var addToCart_createServerFn_handler = createServerRpc({
	id: "6ed0c9890eeae6aec6eea03db057843ddb32452809735bf32d741f4de1baa054",
	name: "addToCart",
	filename: "src/lib/house/shop.ts"
}, (opts) => addToCart.__executeServer(opts));
var addToCart = createServerFn({ method: "POST" }).validator((input) => ({
	productId: input.productId,
	qty: Math.max(1, Math.min(8, input.qty ?? 1)),
	spec: typeof input.spec === "string" ? input.spec.slice(0, 400) : ""
})).middleware([authMiddleware]).handler(addToCart_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const product = (await sql`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where id = ${data.productId} and active = true
    `)[0];
	if (!product) throw new Error("Not in the house");
	if (product.inventory !== null && product.inventory < data.qty) throw new Error("Sold through");
	const spec = validateSpec(product.id, data.spec);
	const existing = await sql`
      select id, qty from cart_items
      where user_id = ${context.userId} and product_id = ${data.productId} and spec = ${spec}
    `;
	if (existing[0]) await sql`update cart_items set qty = ${existing[0].qty + data.qty} where id = ${existing[0].id}`;
	else await sql`
        insert into cart_items (user_id, product_id, qty, spec)
        values (${context.userId}, ${data.productId}, ${data.qty}, ${spec})
      `;
	return { ok: true };
});
var setCartQty_createServerFn_handler = createServerRpc({
	id: "b5da19482ec9db43f3a672998b17f53936da8857e5edf61a5135268e94d9eeb0",
	name: "setCartQty",
	filename: "src/lib/house/shop.ts"
}, (opts) => setCartQty.__executeServer(opts));
var setCartQty = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(setCartQty_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (data.qty <= 0) {
		await sql`
        delete from cart_items
        where user_id = ${context.userId} and id = ${data.lineId}
      `;
		return { ok: true };
	}
	await sql`
      update cart_items set qty = ${Math.max(1, Math.min(8, data.qty))}
      where user_id = ${context.userId} and id = ${data.lineId}
    `;
	return { ok: true };
});
var getDesk_createServerFn_handler = createServerRpc({
	id: "a0d70c8c9b7617ac0e20c6abebdafccde673d0f3b296ae50004d85401c5def33",
	name: "getDesk",
	filename: "src/lib/house/shop.ts"
}, (opts) => getDesk.__executeServer(opts));
var getDesk = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDesk_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const mem = await sql`
      select plan, status from memberships where user_id = ${context.userId}
    `;
	const cred = await sql`
      select cents from credits where user_id = ${context.userId}
    `;
	const orders = await sql`
      select id, total_cents, credit_used, status, created_at::text as created_at
      from orders where user_id = ${context.userId}
      order by id desc limit 20
    `;
	const enrollments = await sql`
      select e.product_id, p.title, p.slug
      from enrollments e join products p on p.id = e.product_id
      where e.user_id = ${context.userId}
    `;
	const bookings = await sql`
      select b.id, b.room_id, b.date, b.start_hour, b.hours, b.total_cents, b.status, r.name
      from bookings b join rooms r on r.id = b.room_id
      where b.user_id = ${context.userId}
      order by b.date desc, b.start_hour desc
    `;
	const briefs = await sql`
      select id, kind, talent_id, company, details, deposit_cents, status, created_at::text as created_at
      from briefs where user_id = ${context.userId}
      order by id desc
    `;
	const os = await sql`
      select plan, handle from creator_os where user_id = ${context.userId} and status = 'active'
    `;
	const jobs = await sql`
      select id, kind, title, status from house_jobs
      where user_id = ${context.userId} order by id desc limit 12
    `;
	const licenses = await sql`
      select t.title, l.kind, l.status
      from twin_licenses l join twins t on t.id = l.twin_id
      where l.user_id = ${context.userId}
      order by l.id desc
    `;
	const rsvps = await sql`
      select n.title, n.date, r.qty, r.total_cents
      from rsvps r join nights n on n.id = r.night_id
      where r.user_id = ${context.userId}
      order by n.date
    `;
	const badges = await sql`
      select exam_id, score, passed from academy_exams where user_id = ${context.userId}
    `;
	const features = await sql`
      select company, weeks, total_cents from night_features
      where user_id = ${context.userId} order by id desc
    `;
	const dossiers = await sql`
      select id, query, title, created_at::text as created_at
      from atlas_dossiers
      where user_id = ${context.userId}
      order by id desc
      limit 12
    `;
	const profile = await sql`
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
		profile: profile[0] ?? null
	};
});
var checkout_createServerFn_handler = createServerRpc({
	id: "4c317887ffd6317f9659416cc910be5de40766f7b0030c9de1b78e3a4054e330",
	name: "checkout",
	filename: "src/lib/house/shop.ts"
}, (opts) => checkout.__executeServer(opts));
var checkout = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(checkout_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const lines = (await sql`
      select p.id, p.kind, p.slug, p.title, p.subtitle, p.description, p.price_cents, p.image, p.inventory, p.sort,
             c.qty, coalesce(c.spec, '') as spec
      from cart_items c
      join products p on p.id = c.product_id
      where c.user_id = ${context.userId}
    `).map((r) => ({
		...r,
		spec: r.spec ?? "",
		lineId: 0
	}));
	if (lines.length === 0) throw new Error("The tab is empty");
	for (const line of lines) if (line.inventory !== null && line.inventory < line.qty) throw new Error(`${line.title} is sold through`);
	const plan = (await sql`
      select plan from memberships where user_id = ${context.userId} and status = 'active'
    `)[0]?.plan ?? null;
	const rate = memberRate(plan);
	let subtotal = 0;
	const priced = lines.map((line) => {
		const unit = isDiscountable(line.kind) ? Math.round(line.price_cents * rate) : line.price_cents;
		subtotal += unit * line.qty;
		return {
			...line,
			unit
		};
	});
	const available = (await sql`
      select cents from credits where user_id = ${context.userId}
    `)[0]?.cents ?? 0;
	const creditUsed = Math.min(available, subtotal);
	const total = subtotal - creditUsed;
	const orderId = (await sql`
      insert into orders (user_id, total_cents, credit_used, status)
      values (${context.userId}, ${total}, ${creditUsed}, 'paid')
      returning id
    `)[0].id;
	for (const line of priced) {
		const title = (() => {
			const note = specLabel(line.spec, line.id);
			return note ? `${line.title} · ${note}` : line.title;
		})();
		await sql`
        insert into order_items (order_id, product_id, title, qty, unit_cents, spec)
        values (${orderId}, ${line.id}, ${title}, ${line.qty}, ${line.unit}, ${line.spec})
      `;
		if (line.inventory !== null) await sql`
          update products set inventory = inventory - ${line.qty}
          where id = ${line.id}
        `;
		if (line.kind === "academy") await sql`
          insert into enrollments (user_id, product_id)
          values (${context.userId}, ${line.id})
          on conflict (user_id, product_id) do nothing
        `;
		if (line.kind === "membership") {
			if (line.id === "pass-academy") await enrollLibrary(sql, context.userId);
			else {
				const nextPlan = fanPlanFromProduct(line.id) ?? "sesh";
				const already = (await sql`
            select plan from memberships where user_id = ${context.userId}
          `)[0]?.plan ?? null;
				const kept = higherPlan(already, nextPlan);
				await sql`
            insert into memberships (user_id, plan, status)
            values (${context.userId}, ${kept}, 'active')
            on conflict (user_id) do update set plan = ${kept}, status = 'active'
          `;
				if (hasAcademyLibrary(kept)) await enrollLibrary(sql, context.userId);
				if (kept === "house" && already !== "house" && already !== "patron") await sql`
              insert into credits (user_id, cents)
              values (${context.userId}, 10000)
              on conflict (user_id) do update set cents = credits.cents + 10000
            `;
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
		if (line.kind === "service") await openJob(sql, context.userId, line.id, "service", line.title);
		if (line.kind === "twin") {
			const twinKind = line.id === "twin-exclusive" ? "exclusive" : line.id === "twin-build" ? "build" : "monthly";
			await licenseTwin(sql, context.userId, line.id, twinKind);
		}
		if (line.kind === "event") await takeNight(sql, context.userId, line.id, line.qty, line.unit * line.qty);
		if (line.kind === "atlas") await openJob(sql, context.userId, line.id, "dossier", line.title);
	}
	if (creditUsed > 0) await sql`
        update credits set cents = cents - ${creditUsed}
        where user_id = ${context.userId}
      `;
	await sql`delete from cart_items where user_id = ${context.userId}`;
	const bonus = (priced.some((l) => l.kind === "membership") ? 250 : 0) + (priced.some((l) => l.kind === "academy") ? 400 : 0) + (priced.some((l) => l.kind === "os") ? 300 : 0) + (priced.some((l) => l.kind === "service") ? 500 : 0) + (priced.some((l) => l.kind === "atlas") ? 200 : 0);
	await awardSpend(sql, context.userId, total, {
		kind: "spend",
		label: `Tab #${orderId}`,
		bonus
	});
	return {
		orderId,
		total,
		creditUsed
	};
});
var getCourse_createServerFn_handler = createServerRpc({
	id: "7d904d3562bc104fb67879950dc332fbf6018214298fbecd0b48053462cb479b",
	name: "getCourse",
	filename: "src/lib/house/shop.ts"
}, (opts) => getCourse.__executeServer(opts));
var getCourse = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getCourse_createServerFn_handler, async ({ data: slug }) => {
	const sql = await getSql();
	const product = (await sql`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where slug = ${slug} and kind = 'academy' and active = true
    `)[0];
	if (!product) return null;
	return {
		product,
		modules: await sql`
      select id, title, sort from course_modules
      where product_id = ${product.id} order by sort
    `
	};
});
var getCourseReader_createServerFn_handler = createServerRpc({
	id: "0a163ca9929a2d41e7eb49ffb47a2f57bd13ccc2f70ef3e55b7d55ff56f35936",
	name: "getCourseReader",
	filename: "src/lib/house/shop.ts"
}, (opts) => getCourseReader.__executeServer(opts));
var getCourseReader = createServerFn({ method: "GET" }).validator((slug) => slug).middleware([authMiddleware]).handler(getCourseReader_createServerFn_handler, async ({ context, data: slug }) => {
	const sql = await getSql();
	const product = (await sql`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where slug = ${slug} and kind = 'academy'
    `)[0];
	if (!product) return {
		enrolled: false,
		modules: []
	};
	const enrolled = await sql`
      select id from enrollments
      where user_id = ${context.userId} and product_id = ${product.id}
    `;
	const mem = await sql`
      select plan from memberships where user_id = ${context.userId} and status = 'active'
    `;
	const library = hasAcademyLibrary(mem[0]?.plan);
	if (!enrolled[0] && !library) return {
		enrolled: false,
		modules: []
	};
	if (library && !enrolled[0]) await sql`
        insert into enrollments (user_id, product_id)
        values (${context.userId}, ${product.id})
        on conflict (user_id, product_id) do nothing
      `;
	return {
		enrolled: true,
		modules: await sql`
      select id, title, body, sort from course_modules
      where product_id = ${product.id} order by sort
    `
	};
});
var bookingInput = object({
	roomId: string(),
	date: string(),
	startHour: number(),
	hours: number()
});
var listRoomDay_createServerFn_handler = createServerRpc({
	id: "6a350458c3ec4db01ae9c90f9a009f6325bef5ef61de398ba1e52cbafaf31b7e",
	name: "listRoomDay",
	filename: "src/lib/house/shop.ts"
}, (opts) => listRoomDay.__executeServer(opts));
var listRoomDay = createServerFn({ method: "GET" }).validator((input) => input).handler(listRoomDay_createServerFn_handler, async ({ data }) => {
	return (await getSql())`
      select start_hour, hours from bookings
      where room_id = ${data.roomId} and date = ${data.date} and status = 'confirmed'
    `;
});
var bookRoom_createServerFn_handler = createServerRpc({
	id: "7a8c0d70950fbe2f71922115546557c0b93e93eb4a4a9b48dece6fdf64ee9612",
	name: "bookRoom",
	filename: "src/lib/house/shop.ts"
}, (opts) => bookRoom.__executeServer(opts));
var bookRoom = createServerFn({ method: "POST" }).validator((input) => bookingInput.parse(input)).middleware([authMiddleware]).handler(bookRoom_createServerFn_handler, async ({ context, data }) => {
	if (data.hours < 2 || data.hours > 6) throw new Error("Two to six hours");
	if (data.startHour < 12 || data.startHour + data.hours > 22) throw new Error("Rooms run 12:00–22:00");
	const sql = await getSql();
	const room = (await sql`
      select id, name, blurb, hourly_cents, image from rooms where id = ${data.roomId}
    `)[0];
	if (!room) throw new Error("No such room");
	const taken = await sql`
      select start_hour, hours from bookings
      where room_id = ${data.roomId} and date = ${data.date} and status = 'confirmed'
    `;
	const end = data.startHour + data.hours;
	if (taken.some((b) => data.startHour < b.start_hour + b.hours && end > b.start_hour)) throw new Error("That block is taken");
	const mem = await sql`
      select plan from memberships where user_id = ${context.userId} and status = 'active'
    `;
	const rate = memberRate(mem[0]?.plan ?? null);
	const total = Math.round(room.hourly_cents * data.hours * rate);
	const available = (await sql`
      select cents from credits where user_id = ${context.userId}
    `)[0]?.cents ?? 0;
	const creditUsed = Math.min(available, total);
	const charged = total - creditUsed;
	await sql`
      insert into order_items (order_id, product_id, title, qty, unit_cents)
      values (${(await sql`
      insert into orders (user_id, total_cents, credit_used, status)
      values (${context.userId}, ${charged}, ${creditUsed}, 'paid')
      returning id
    `)[0].id}, null, ${room.name + " · " + data.date}, ${data.hours}, ${Math.round(room.hourly_cents * rate)})
    `;
	if (creditUsed > 0) await sql`
        update credits set cents = cents - ${creditUsed}
        where user_id = ${context.userId}
      `;
	await sql`
      insert into bookings (user_id, room_id, date, start_hour, hours, total_cents, status)
      values (${context.userId}, ${data.roomId}, ${data.date}, ${data.startHour}, ${data.hours}, ${charged}, 'confirmed')
    `;
	await awardSpend(sql, context.userId, charged, {
		kind: "live",
		label: `${room.name} · ${data.date}`,
		bonus: 150
	});
	return {
		total: charged,
		creditUsed
	};
});
var briefInput = object({
	kind: _enum([
		"talent",
		"campaign",
		"twin",
		"service"
	]),
	talentId: string().optional(),
	company: string().max(120),
	contactName: string().max(80),
	details: string().min(12).max(2e3),
	payFee: boolean()
});
var submitBrief_createServerFn_handler = createServerRpc({
	id: "3d243e85508cdf0cdd33158748214232fd05bae039c747016bdfa52d5b110e92",
	name: "submitBrief",
	filename: "src/lib/house/shop.ts"
}, (opts) => submitBrief.__executeServer(opts));
var submitBrief = createServerFn({ method: "POST" }).validator((input) => briefInput.parse(input)).middleware([authMiddleware]).handler(submitBrief_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const fee = (await sql`
      select id, kind, slug, title, subtitle, description, price_cents, image, inventory, sort
      from products where id = ${data.kind === "talent" ? "fee-talent" : "dep-campaign"}
    `)[0];
	let deposit = 0;
	if (data.payFee && fee) {
		deposit = fee.price_cents;
		await sql`
        insert into order_items (order_id, product_id, title, qty, unit_cents)
        values (${(await sql`
        insert into orders (user_id, total_cents, credit_used, status)
        values (${context.userId}, ${deposit}, 0, 'paid')
        returning id
      `)[0].id}, ${fee.id}, ${fee.title}, 1, ${deposit})
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
	if (deposit > 0) await awardSpend(sql, context.userId, deposit, {
		kind: "brief",
		label: `File · ${data.kind}`,
		bonus: 200
	});
	return {
		ok: true,
		deposit
	};
});
//#endregion
export { addToCart_createServerFn_handler, bookRoom_createServerFn_handler, checkout_createServerFn_handler, getCart_createServerFn_handler, getCourseReader_createServerFn_handler, getCourse_createServerFn_handler, getDesk_createServerFn_handler, getProduct_createServerFn_handler, getTalent_createServerFn_handler, listProducts_createServerFn_handler, listRoomDay_createServerFn_handler, listRooms_createServerFn_handler, listTalent_createServerFn_handler, setCartQty_createServerFn_handler, submitBrief_createServerFn_handler };
