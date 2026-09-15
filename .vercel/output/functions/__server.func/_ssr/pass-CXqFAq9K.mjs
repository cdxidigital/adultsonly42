import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { M as listProducts, _ as HouseChrome, v as PageHero } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pass-CXqFAq9K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PERKS = {
	"pass-member": [
		"Five percent off atelier, academy, and fees",
		"FLESH Points on every settle",
		"One ID across nights, OS, and the desk"
	],
	"pass-black": [
		"Ten percent off the floor",
		"Academy library — every current seat",
		"Priority chat with the desk, no ads"
	],
	"pass-patron": [
		"Twenty percent off",
		"$100 house credit on join",
		"Academy library + concierge routing to signed talent"
	]
};
function PassPage() {
	const [plans, setPlans] = (0, import_react.useState)([]);
	const [credit, setCredit] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		listProducts({ data: "membership" }).then((rows) => setPlans(rows.filter((p) => p.id !== "pass-academy"))).catch(() => setPlans([]));
		listProducts({ data: "credit" }).then((rows) => setCredit(rows[0] ?? null)).catch(() => setCredit(null));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "The pass",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"One ID.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"Three doors."
			] }),
			image: "/still-live.jpg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
				children: "Sesh, Sesh Black, and House. Pricing follows the file. House credit spends like cash in this room. The glue across atelier, academy, nights, and OS."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid md:grid-cols-3",
			children: plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border-t border-line px-5 py-14 md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: p.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl tracking-wide uppercase",
						children: p.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-display text-3xl text-heat tabular-nums",
						children: [aud(p.price_cents), " / mo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm leading-relaxed text-muted",
						children: p.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-2 text-sm text-ivory/80",
						children: (PERKS[p.id] ?? []).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
							productId: p.id,
							label: "Take this pass"
						})
					})
				]
			}, p.id))
		}),
		credit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border-t border-line px-5 py-16 md:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Ledger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl tracking-wide uppercase",
					children: credit.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-sm leading-relaxed text-muted",
					children: credit.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-2xl text-heat tabular-nums",
					children: aud(credit.price_cents)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
						productId: credit.id,
						label: "Credit the tab"
					})
				})
			]
		}) : null
	] });
}
//#endregion
export { PassPage as component };
