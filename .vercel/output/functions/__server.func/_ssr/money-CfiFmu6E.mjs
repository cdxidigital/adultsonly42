//#region node_modules/.nitro/vite/services/ssr/assets/money-CfiFmu6E.js
function aud(cents) {
	const frac = cents % 100 === 0 ? 0 : 2;
	return new Intl.NumberFormat("en-AU", {
		style: "currency",
		currency: "AUD",
		minimumFractionDigits: frac,
		maximumFractionDigits: frac
	}).format(cents / 100);
}
var PLAN_RANK = {
	sesh: 1,
	member: 2,
	black: 2,
	patron: 3,
	house: 3
};
function planRank(plan) {
	if (!plan) return 0;
	return PLAN_RANK[plan] ?? 0;
}
function higherPlan(current, next) {
	if (!current) return next;
	return planRank(next) >= planRank(current) ? next : current;
}
function memberRate(plan) {
	const rank = planRank(plan);
	if (rank >= 3) return .8;
	if (rank >= 2) return .9;
	if (rank >= 1) return .95;
	return 1;
}
function planLabel(plan) {
	if (plan === "house" || plan === "patron") return "House";
	if (plan === "black" || plan === "member") return "Sesh Black";
	if (plan === "sesh") return "Sesh";
	return "Guest";
}
function hasAcademyLibrary(plan) {
	return planRank(plan) >= 2;
}
function isDiscountable(kind) {
	return kind === "atelier" || kind === "academy" || kind === "fee" || kind === "service" || kind === "event";
}
function fanPlanFromProduct(id) {
	if (id === "pass-house" || id === "pass-patron") return "house";
	if (id === "pass-black") return "black";
	if (id === "pass-sesh" || id === "pass-member") return "sesh";
	return null;
}
function osRank(plan) {
	if (plan === "studio") return 3;
	if (plan === "pro") return 2;
	if (plan === "lite") return 1;
	return 0;
}
function osPlanFromProduct(id) {
	if (id === "os-studio") return "studio";
	if (id === "os-pro") return "pro";
	if (id === "os-lite") return "lite";
	return null;
}
function isUnauthorized(err) {
	if (!err || typeof err !== "object") return false;
	const e = err;
	return e.status === 401 || e.message === "Unauthorized";
}
//#endregion
export { isDiscountable as a, osPlanFromProduct as c, higherPlan as i, osRank as l, fanPlanFromProduct as n, isUnauthorized as o, hasAcademyLibrary as r, memberRate as s, aud as t, planLabel as u };
