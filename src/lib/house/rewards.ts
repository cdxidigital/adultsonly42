import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { embeddedAddressFor, mintFleshPass, passNumberFor } from "./chain";
import { higherPlan } from "./money";

export type FleshPoints = {
  available: number;
  pending: number;
  lifetime_earned: number;
  lifetime_spent: number;
  collectibles: number;
};

export type FleshWallet = {
  status: string;
  wallet_type: string;
  address: string | null;
  network: string;
  provider: string;
};

export type FleshPass = {
  pass_number: string;
  eligible: boolean;
  claimed: boolean;
  token_id: string | null;
  tx_hash: string | null;
};

export type FleshReward = {
  id: string;
  name: string;
  description: string;
  points_cost: number;
  category: string;
  effect: string;
  effect_value: number;
  available: boolean;
};

export type FleshActivity = {
  id: string;
  kind: string;
  label: string;
  amount: number;
  state: string;
  created_at: string;
};

function id(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function ensureFleshAccount(sql: Sql, userId: string) {
  const existing = await sql<{ user_id: string }>`
    select user_id from flesh_points where user_id = ${userId}
  `;
  if (existing[0]) {
    const mem = await sql<{ plan: string }>`
      select plan from memberships where user_id = ${userId} and status = 'active'
    `;
    const eligible = Boolean(mem[0]);
    await sql`
      update flesh_passes set eligible = ${eligible}
      where user_id = ${userId} and claimed = false
    `;
    return;
  }

  const mem = await sql<{ plan: string }>`
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

export async function awardSpend(
  sql: Sql,
  userId: string,
  cents: number,
  opts: { label: string; kind: string; bonus?: number },
) {
  const base = Math.max(0, Math.floor(cents / 10));
  const amount = base + (opts.bonus ?? 0);
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

export const listFleshRewards = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<FleshReward>`
    select id, name, description, points_cost, category, effect, effect_value, available
    from flesh_rewards where available = true order by sort
  `;
});

export const getLedger = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureFleshAccount(sql, context.userId);
    const points = await sql<FleshPoints>`
      select available, pending, lifetime_earned, lifetime_spent, collectibles
      from flesh_points where user_id = ${context.userId}
    `;
    const wallet = await sql<FleshWallet>`
      select status, wallet_type, address, network, provider
      from flesh_wallets where user_id = ${context.userId}
    `;
    const pass = await sql<FleshPass>`
      select pass_number, eligible, claimed, token_id, tx_hash
      from flesh_passes where user_id = ${context.userId}
    `;
    const mem = await sql<{ plan: string }>`
      select plan from memberships where user_id = ${context.userId} and status = 'active'
    `;
    const activity = await sql<FleshActivity>`
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
        collectibles: 0,
      },
      wallet: wallet[0] ?? null,
      pass: pass[0] ?? null,
      plan: mem[0]?.plan ?? null,
      activity,
    };
  });

const redeemInput = z.object({
  rewardId: z.string(),
  idempotencyKey: z.string().min(8).max(80),
});

export const redeemReward = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof redeemInput>) => redeemInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await ensureFleshAccount(sql, context.userId);

    const prior = await sql<{ id: string; reward_id: string; points_cost: number }>`
      select id, reward_id, points_cost from flesh_redemptions
      where user_id = ${context.userId} and idempotency_key = ${data.idempotencyKey}
    `;
    if (prior[0]) {
      const pts = await sql<{ available: number }>`
        select available from flesh_points where user_id = ${context.userId}
      `;
      return {
        redemptionId: prior[0].id,
        remaining: pts[0]?.available ?? 0,
        message: "This reward was already unlocked.",
      };
    }

    const rewards = await sql<FleshReward>`
      select id, name, description, points_cost, category, effect, effect_value, available
      from flesh_rewards where id = ${data.rewardId} and available = true
    `;
    const reward = rewards[0];
    if (!reward) throw new Error("That perk is no longer on the shelf.");

    const pts = await sql<FleshPoints>`
      select available, pending, lifetime_earned, lifetime_spent, collectibles
      from flesh_points where user_id = ${context.userId}
    `;
    const account = pts[0];
    if (!account || account.available < reward.points_cost) {
      throw new Error("Not enough FLESH Points.");
    }

    await sql`
      update flesh_points
      set available = available - ${reward.points_cost},
          lifetime_spent = lifetime_spent + ${reward.points_cost}
      where user_id = ${context.userId}
    `;

    if (reward.effect === "credit" && reward.effect_value > 0) {
      await sql`
        insert into credits (user_id, cents)
        values (${context.userId}, ${reward.effect_value})
        on conflict (user_id) do update set cents = credits.cents + ${reward.effect_value}
      `;
    }
    if (reward.effect === "membership") {
      const existing = await sql<{ plan: string }>`
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
    if (reward.effect === "collectible") {
      await sql`
        update flesh_points
        set collectibles = collectibles + ${Math.max(1, reward.effect_value)}
        where user_id = ${context.userId}
      `;
    }

    const redemptionId = id("red");
    await sql`
      insert into flesh_redemptions (id, user_id, reward_id, points_cost, idempotency_key)
      values (${redemptionId}, ${context.userId}, ${reward.id}, ${reward.points_cost}, ${data.idempotencyKey})
    `;
    await sql`
      insert into flesh_activity (id, user_id, kind, label, amount, state)
      values (${id("act")}, ${context.userId}, 'redemption', ${reward.name}, ${-reward.points_cost}, 'redeemed')
    `;

    const left = await sql<{ available: number }>`
      select available from flesh_points where user_id = ${context.userId}
    `;
    return {
      redemptionId,
      remaining: left[0]?.available ?? 0,
      message: `${reward.name} is on the file.`,
    };
  });

const claimInput = z.object({
  idempotencyKey: z.string().min(8).max(80),
});

export const claimFleshPass = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof claimInput>) => claimInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await ensureFleshAccount(sql, context.userId);

    const prior = await sql<{ token_id: string; tx_hash: string }>`
      select token_id, tx_hash from flesh_claims
      where user_id = ${context.userId} and idempotency_key = ${data.idempotencyKey}
    `;
    if (prior[0]) {
      return {
        status: "already_claimed" as const,
        tokenId: prior[0].token_id,
        transactionHash: prior[0].tx_hash,
        message: "Your FLESH Pass is already in the collection.",
      };
    }

    const passRows = await sql<FleshPass>`
      select pass_number, eligible, claimed, token_id, tx_hash
      from flesh_passes where user_id = ${context.userId}
    `;
    const pass = passRows[0];
    if (!pass) throw new Error("No pass file.");
    if (pass.claimed && pass.token_id) {
      return {
        status: "already_claimed" as const,
        tokenId: pass.token_id,
        transactionHash: pass.tx_hash ?? "0xmockfleshpassalreadyclaimed",
        message: "Your FLESH Pass is already in the collection.",
      };
    }
    if (!pass.eligible) {
      throw new Error("Hold a House Pass before claiming the mark.");
    }

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
      status: "minted" as const,
      tokenId: mint.tokenId,
      transactionHash: mint.transactionHash,
      message: "Your FLESH Pass is on the file.",
    };
  });

const walletInput = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Need a 0x address"),
  network: z.enum(["Ethereum", "Polygon", "Base"]),
});

export const connectWallet = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof walletInput>) => walletInput.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
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
    const rows = await sql<FleshWallet>`
      select status, wallet_type, address, network, provider
      from flesh_wallets where user_id = ${context.userId}
    `;
    return rows[0];
  });
