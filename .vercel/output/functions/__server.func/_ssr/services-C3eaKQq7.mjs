import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { M as listProducts, _ as HouseChrome, v as PageHero } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-C3eaKQq7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listProducts({ data: "service" }).then(setRows).catch(() => setRows([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Studio services",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"High ticket.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"A file, not a vibe."
			] }),
			image: "/still-talent.jpg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
				children: "Launch kits, capture days, takedowns. The house takes a file. Rooms hire by the hour. Lookbooks lease a likeness — signed talent only."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "grid border-t border-line md:grid-cols-[1fr_auto] md:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-10 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: p.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl tracking-wide uppercase",
						children: p.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-lg text-sm leading-relaxed text-muted",
						children: p.description
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-4 px-5 pb-10 md:items-end md:px-10 md:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-heat tabular-nums",
					children: aud(p.price_cents)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
					productId: p.id,
					label: "Open this job"
				})]
			})]
		}, p.id)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid sm:grid-cols-3",
			children: [
				{
					to: "/live",
					t: "Rooms",
					d: "Capture days. Two-hour blocks. Directed stills."
				},
				{
					to: "/lookbook",
					t: "Lookbooks",
					d: "Permissioned editorial likeness. A lease, not a person."
				},
				{
					to: "/apply",
					t: "Briefs",
					d: "Campaigns, talent files, likeness commissions."
				}
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: x.to,
				className: "border-t border-line px-5 py-12 hover:bg-navy md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: x.t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: x.d
				})]
			}, x.to))
		})
	] });
}
//#endregion
export { ServicesPage as component };
