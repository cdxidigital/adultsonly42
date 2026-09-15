export function aud(cents: number) {
  const frac = cents % 100 === 0 ? 0 : 2;
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  }).format(cents / 100);
}

const PLAN_RANK: Record<string, number> = {
  sesh: 1,
  member: 2,
  black: 2,
  patron: 3,
  house: 3,
};

export function planRank(plan: string | null | undefined) {
  if (!plan) return 0;
  return PLAN_RANK[plan] ?? 0;
}

export function higherPlan(current: string | null | undefined, next: string) {
  if (!current) return next;
  return planRank(next) >= planRank(current) ? next : current;
}

export function memberRate(plan: string | null | undefined) {
  const rank = planRank(plan);
  if (rank >= 3) return 0.8;
  if (rank >= 2) return 0.9;
  if (rank >= 1) return 0.95;
  return 1;
}

export function planLabel(plan: string | null | undefined) {
  if (plan === "house" || plan === "patron") return "House";
  if (plan === "black" || plan === "member") return "Sesh Black";
  if (plan === "sesh") return "Sesh";
  return "Guest";
}

export function hasAcademyLibrary(plan: string | null | undefined) {
  return planRank(plan) >= 2;
}

export function isDiscountable(kind: string) {
  return kind === "atelier" || kind === "academy" || kind === "fee" || kind === "service" || kind === "event";
}

export function fanPlanFromProduct(id: string) {
  if (id === "pass-house" || id === "pass-patron") return "house";
  if (id === "pass-black") return "black";
  if (id === "pass-sesh" || id === "pass-member") return "sesh";
  return null;
}

export function osRank(plan: string | null | undefined) {
  if (plan === "studio") return 3;
  if (plan === "pro") return 2;
  if (plan === "lite") return 1;
  return 0;
}

export function higherOs(current: string | null | undefined, next: string) {
  if (!current) return next;
  return osRank(next) >= osRank(current) ? next : current;
}

export function osPlanFromProduct(id: string) {
  if (id === "os-studio") return "studio";
  if (id === "os-pro") return "pro";
  if (id === "os-lite") return "lite";
  return null;
}

export function isUnauthorized(err: unknown) {
  if (!err || typeof err !== "object") return false;
  const e = err as { status?: number; message?: string };
  return e.status === 401 || e.message === "Unauthorized";
}
