import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { M as listProducts, _ as HouseChrome, v as PageHero } from "./router-Dt0_uhc_.mjs";
import { i as specSchema } from "./atelier--laWbw2Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atelier.index-CLilcKlx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AtelierPage() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listProducts({ data: "atelier" }).then(setItems).catch(() => setItems([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "04 — Atelier",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Objects with",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"authorship."
		] }),
		image: "/still-atelier.jpg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
			children: "Cut to the file. Size is a letter, not a gender. A name goes on the object if you want it there. Member pricing lands at the tab."
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid gap-0 sm:grid-cols-2 lg:grid-cols-3",
		children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/atelier/$slug",
			params: { slug: p.slug },
			className: "border-t border-line p-5 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-portrait overflow-hidden bg-navy outline outline-ivory/10 -outline-offset-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: "",
						className: "size-full object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg tracking-wide uppercase",
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: p.subtitle
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-heat tabular-nums",
						children: aud(p.price_cents)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: (() => {
						const custom = specSchema(p.id);
						if (custom?.madeToOrder || p.inventory === null) return "Made to order";
						if (custom) return "Cut to the file";
						return `${p.inventory} left`;
					})()
				})
			]
		}, p.id))
	})] });
}
//#endregion
export { AtelierPage as component };
