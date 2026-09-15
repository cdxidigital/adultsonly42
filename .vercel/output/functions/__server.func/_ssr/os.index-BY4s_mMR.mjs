import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { M as listProducts, R as useCurrentUserState, _ as HouseChrome, v as PageHero } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
import { a as getCreatorOs } from "./ops-DKG_NDpI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/os.index-BY4s_mMR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PERKS = {
	"os-lite": [
		"Named public storefront",
		"Bio, links, a menu",
		"View and click counts",
		"Zero take on money you process elsewhere"
	],
	"os-pro": [
		"Everything in Lite",
		"Posting calendar (X, Reddit, Telegram, site)",
		"Leak watch toggle",
		"The week, in order"
	],
	"os-studio": [
		"Everything in Pro",
		"BAS-ready tax pack from the house tab",
		"Built for more than one name",
		"Undercuts a fifty-percent agency"
	]
};
function OsPage() {
	const { user } = useCurrentUserState();
	const [plans, setPlans] = (0, import_react.useState)([]);
	const [mine, setMine] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		listProducts({ data: "os" }).then(setPlans).catch(() => setPlans([]));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		getCreatorOs().then((d) => setMine(d.os?.plan ?? null)).catch(() => setMine(null));
	}, [user]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHero, {
		kicker: "Creator OS",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Tools, not a tube." }),
		image: "/still-hands.jpg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
			children: "A storefront with your name. Scheduling, a leak watch, a BAS pack. Models already pay agencies twenty to fifty percent. This is cheaper, and it sits on the same ledger."
		}), mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/os/desk",
			className: "mt-6 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase",
			children: ["Open your OS · ", mine]
		}) : null]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid md:grid-cols-3",
		children: plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "border-t border-line px-5 py-14 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: p.subtitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl tracking-wide uppercase",
					children: p.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-3xl text-heat tabular-nums",
					children: [aud(p.price_cents), " / mo"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: p.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-2 text-sm text-ivory/80",
					children: (PERKS[p.id] ?? []).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: mine === p.id.replace("os-", "") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/os/desk",
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "You hold this desk"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
						productId: p.id,
						label: "Take this desk"
					})
				})
			]
		}, p.id))
	})] });
}
//#endregion
export { OsPage as component };
