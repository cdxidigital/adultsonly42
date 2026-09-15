import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { i as higherPlan } from "./money-CfiFmu6E.mjs";
import { D as _enum, F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { i as getSql, t as authMiddleware } from "./middleware-DaLAjX5Q.mjs";
import { n as mintFleshPass, r as passNumberFor, t as embeddedAddressFor } from "./chain-BBw4yz0J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rewards-DNGBqb_N.js
function id(prefix) {
	return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
async function ensureFleshAccount(sql, userId) {
	if ((await sql`
    select user_id from flesh_points where user_id = ${userId}
  `)[0]) {
		const mem = await sql`
      select plan from memberships where user_id = ${userId} and status = 'active'
    `;
		await sql`
      update flesh_passes set eligible = ${Boolean(mem[0])}
      where user_id = ${userId} and claimed = false
    `;
		return;
	}
	const mem = await sql`
    select plan from memberships where user_id = ${userId} and status = 'active'
  `;
	const eligible = Boolean(mem[0]);
	await sql`
    insert into flesh_points (user_id, available, pending, lifetime_earned, lifetime_spent, collectibles)
    values (${userId}, 250, 0, 250, 0, 0)
  `;
	await sql`
    insert into flesh_wallets (user_id, status, wallet_type, address, network, provider)
    values (${userId}, 'embedded', 'Embedded wallet', ${embeddedAddressFor(userId)}, 'Base', 'FLESH Wallet')
  `;
	await sql`
    insert into flesh_passes (user_id, pass_number, eligible, claimed)
    values (${userId}, ${passNumberFor(userId)}, ${eligible}, false)
  `;
	await sql`
    insert into flesh_activity (id, user_id, kind, label, amount, state)
    values (${id("act")}, ${userId}, 'welcome', 'House welcome', 250, 'available')
  `;
}
var listFleshRewards_createServerFn_handler = createServerRpc({
	id: "526dd360891bcf1dec9f4e147c6c94862f9ac9bfa088aa97c1e8dacca15909d3",
	name: "listFleshRewards",
	filename: "src/lib/house/rewards.ts"
}, (opts) => listFleshRewards.__executeServer(opts));
var listFleshRewards = createServerFn({ method: "GET" }).handler(listFleshRewards_createServerFn_handler, async () => {
	return (await getSql())`
    select id, name, description, points_cost, category, effect, effect_value, available
    from flesh_rewards where available = true order by sort
  `;
});
var getLedger_createServerFn_handler = createServerRpc({
	id: "6d5da0426648593150ee687704ab37e2fd7c7bcdeedc25deaadbfd0a71c25d75",
	name: "getLedger",
	filename: "src/lib/house/rewards.ts"
}, (opts) => getLedger.__executeServer(opts));
var getLedger = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getLedger_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureFleshAccount(sql, context.userId);
	const points = await sql`
      select available, pending, lifetime_earned, lifetime_spent, collectibles
      from flesh_points where user_id = ${context.userId}
    `;
	const wallet = await sql`
      select status, wallet_type, address, network, provider
      from flesh_wallets where user_id = ${context.userId}
    `;
	const pass = await sql`
      select pass_number, eligible, claimed, token_id, tx_hash
      from flesh_passes where user_id = ${context.userId}
    `;
	const mem = await sql`
      select plan from memberships where user_id = ${context.userId} and status = 'active'
    `;
	const activity = await sql`
      select id, kind, label, amount, state, created_at::text as created_at
      from flesh_activity where user_id = ${context.userId}
      order by created_at desc limit 24
    `;
	return {
		points: points[0] ?? {
			available: 0,
			pending: 0,
			lifetime_earned: 0,
			lifetime_spent: 0,
			collectibles: 0
		},
		wallet: wallet[0] ?? null,
		pass: pass[0] ?? null,
		plan: mem[0]?.plan ?? null,
		activity
	};
});
var redeemInput = object({
	rewardId: string(),
	idempotencyKey: string().min(8).max(80)
});
var redeemReward_createServerFn_handler = createServerRpc({
	id: "958c5980b4ab9ad5346dd5053a80e95bc46c9aa3ae0bcbd01ed454c64a9f6b52",
	name: "redeemReward",
	filename: "src/lib/house/rewards.ts"
}, (opts) => redeemReward.__executeServer(opts));
var redeemReward = createServerFn({ method: "POST" }).validator((input) => redeemInput.parse(input)).middleware([authMiddleware]).handler(redeemReward_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureFleshAccount(sql, context.userId);
	const prior = await sql`
      select id, reward_id, points_cost from flesh_redemptions
      where user_id = ${context.userId} and idempotency_key = ${data.idempotencyKey}
    `;
	if (prior[0]) {
		const pts = await sql`
        select available from flesh_points where user_id = ${context.userId}
      `;
		return {
			redemptionId: prior[0].id,
			remaining: pts[0]?.available ?? 0,
			message: "This reward was already unlocked."
		};
	}
	const reward = (await sql`
      select id, name, description, points_cost, category, effect, effect_value, available
      from flesh_rewards where id = ${data.rewardId} and available = true
    `)[0];
	if (!reward) throw new Error("That perk is no longer on the shelf.");
	const account = (await sql`
      select available, pending, lifetime_earned, lifetime_spent, collectibles
      from flesh_points where user_id = ${context.userId}
    `)[0];
	if (!account || account.available < reward.points_cost) throw new Error("Not enough FLESH Points.");
	await sql`
      update flesh_points
      set available = available - ${reward.points_cost},
          lifetime_spent = lifetime_spent + ${reward.points_cost}
      where user_id = ${context.userId}
    `;
	if (reward.effect === "credit" && reward.effect_value > 0) await sql`
        insert into credits (user_id, cents)
        values (${context.userId}, ${reward.effect_value})
        on conflict (user_id) do update set cents = credits.cents + ${reward.effect_value}
      `;
	if (reward.effect === "membership") {
		const existing = await sql`
        select plan from memberships where user_id = ${context.userId}
      `;
		const kept = higherPlan(existing[0]?.plan ?? null, "sesh");
		await sql`
        insert into memberships (user_id, plan, status)
        values (${context.userId}, ${kept}, 'active')
        on conflict (user_id) do update set status = 'active', plan = ${kept}
      `;
		await sql`
        update flesh_passes set eligible = true where user_id = ${context.userId}
      `;
	}
	if (reward.effect === "collectible") await sql`
        update flesh_points
        set collectibles = collectibles + ${Math.max(1, reward.effect_value)}
        where user_id = ${context.userId}
      `;
	const redemptionId = id("red");
	await sql`
      insert into flesh_redemptions (id, user_id, reward_id, points_cost, idempotency_key)
      values (${redemptionId}, ${context.userId}, ${reward.id}, ${reward.points_cost}, ${data.idempotencyKey})
    `;
	await sql`
      insert into flesh_activity (id, user_id, kind, label, amount, state)
      values (${id("act")}, ${context.userId}, 'redemption', ${reward.name}, ${-reward.points_cost}, 'redeemed')
    `;
	return {
		redemptionId,
		remaining: (await sql`
      select available from flesh_points where user_id = ${context.userId}
    `)[0]?.available ?? 0,
		message: `${reward.name} is on the file.`
	};
});
var claimInput = object({ idempotencyKey: string().min(8).max(80) });
var claimFleshPass_createServerFn_handler = createServerRpc({
	id: "b7a4c96ec0e04e09f1721013d76c1f5d161c978df92eb8959d715ed887f92da7",
	name: "claimFleshPass",
	filename: "src/lib/house/rewards.ts"
}, (opts) => claimFleshPass.__executeServer(opts));
var claimFleshPass = createServerFn({ method: "POST" }).validator((input) => claimInput.parse(input)).middleware([authMiddleware]).handler(claimFleshPass_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureFleshAccount(sql, context.userId);
	const prior = await sql`
      select token_id, tx_hash from flesh_claims
      where user_id = ${context.userId} and idempotency_key = ${data.idempotencyKey}
    `;
	if (prior[0]) return {
		status: "already_claimed",
		tokenId: prior[0].token_id,
		transactionHash: prior[0].tx_hash,
		message: "Your FLESH Pass is already in the collection."
	};
	const pass = (await sql`
      select pass_number, eligible, claimed, token_id, tx_hash
      from flesh_passes where user_id = ${context.userId}
    `)[0];
	if (!pass) throw new Error("No pass file.");
	if (pass.claimed && pass.token_id) return {
		status: "already_claimed",
		tokenId: pass.token_id,
		transactionHash: pass.tx_hash ?? "0xmockfleshpassalreadyclaimed",
		message: "Your FLESH Pass is already in the collection."
	};
	if (!pass.eligible) throw new Error("Hold a House Pass before claiming the mark.");
	const mint = mintFleshPass(pass.pass_number);
	await sql`
      insert into flesh_claims (id, user_id, token_id, tx_hash, idempotency_key)
      values (${id("claim")}, ${context.userId}, ${mint.tokenId}, ${mint.transactionHash}, ${data.idempotencyKey})
    `;
	await sql`
      update flesh_passes
      set claimed = true, token_id = ${mint.tokenId}, tx_hash = ${mint.transactionHash}
      where user_id = ${context.userId}
    `;
	await sql`
      update flesh_points set collectibles = collectibles + 1 where user_id = ${context.userId}
    `;
	await sql`
      insert into flesh_activity (id, user_id, kind, label, amount, state)
      values (${id("act")}, ${context.userId}, 'pass', 'FLESH Pass claimed', 0, 'available')
    `;
	return {
		status: "minted",
		tokenId: mint.tokenId,
		transactionHash: mint.transactionHash,
		message: "Your FLESH Pass is on the file."
	};
});
var walletInput = object({
	address: string().regex(/^0x[a-fA-F0-9]{40}$/, "Need a 0x address"),
	network: _enum([
		"Ethereum",
		"Polygon",
		"Base"
	])
});
var connectWallet_createServerFn_handler = createServerRpc({
	id: "29f45f4b00b3a5bcfeb3530eedb4d54b19cb2981149088db011e3ba6ff42b7df",
	name: "connectWallet",
	filename: "src/lib/house/rewards.ts"
}, (opts) => connectWallet.__executeServer(opts));
var connectWallet = createServerFn({ method: "POST" }).validator((input) => walletInput.parse(input)).middleware([authMiddleware]).handler(connectWallet_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureFleshAccount(sql, context.userId);
	await sql`
      update flesh_wallets
      set status = 'connected',
          wallet_type = 'External wallet',
          address = ${data.address},
          network = ${data.network},
          provider = 'Connected by member'
      where user_id = ${context.userId}
    `;
	return (await sql`
      select status, wallet_type, address, network, provider
      from flesh_wallets where user_id = ${context.userId}
    `)[0];
});
//#endregion
export { claimFleshPass_createServerFn_handler, connectWallet_createServerFn_handler, getLedger_createServerFn_handler, listFleshRewards_createServerFn_handler, redeemReward_createServerFn_handler };
