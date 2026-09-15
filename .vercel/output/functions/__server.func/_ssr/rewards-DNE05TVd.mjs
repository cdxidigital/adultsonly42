import { r as createServerFn } from "./ssr.mjs";
import { D as _enum, F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-DaLAjX5Q.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { r as passNumberFor, t as embeddedAddressFor } from "./chain-BBw4yz0J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rewards-DNE05TVd.js
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
async function awardSpend(sql, userId, cents, opts) {
	const amount = Math.max(0, Math.floor(cents / 10)) + (opts.bonus ?? 0);
	if (amount <= 0) return 0;
	await ensureFleshAccount(sql, userId);
	await sql`
    update flesh_points
    set available = available + ${amount},
        lifetime_earned = lifetime_earned + ${amount}
    where user_id = ${userId}
  `;
	await sql`
    insert into flesh_activity (id, user_id, kind, label, amount, state)
    values (${id("act")}, ${userId}, ${opts.kind}, ${opts.label}, ${amount}, 'available')
  `;
	return amount;
}
var listFleshRewards = createServerFn({ method: "GET" }).handler(createSsrRpc("526dd360891bcf1dec9f4e147c6c94862f9ac9bfa088aa97c1e8dacca15909d3"));
var getLedger = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6d5da0426648593150ee687704ab37e2fd7c7bcdeedc25deaadbfd0a71c25d75"));
var redeemInput = object({
	rewardId: string(),
	idempotencyKey: string().min(8).max(80)
});
var redeemReward = createServerFn({ method: "POST" }).validator((input) => redeemInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("958c5980b4ab9ad5346dd5053a80e95bc46c9aa3ae0bcbd01ed454c64a9f6b52"));
var claimInput = object({ idempotencyKey: string().min(8).max(80) });
var claimFleshPass = createServerFn({ method: "POST" }).validator((input) => claimInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("b7a4c96ec0e04e09f1721013d76c1f5d161c978df92eb8959d715ed887f92da7"));
var walletInput = object({
	address: string().regex(/^0x[a-fA-F0-9]{40}$/, "Need a 0x address"),
	network: _enum([
		"Ethereum",
		"Polygon",
		"Base"
	])
});
var connectWallet = createServerFn({ method: "POST" }).validator((input) => walletInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("29f45f4b00b3a5bcfeb3530eedb4d54b19cb2981149088db011e3ba6ff42b7df"));
//#endregion
export { listFleshRewards as a, getLedger as i, claimFleshPass as n, redeemReward as o, connectWallet as r, awardSpend as t };
