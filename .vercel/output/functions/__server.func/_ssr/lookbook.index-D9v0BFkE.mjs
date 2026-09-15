import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { M as listProducts, _ as HouseChrome, v as PageHero } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
import { p as listTwins } from "./ops-DKG_NDpI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookbook.index-D9v0BFkE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LookbookPage() {
	const [twins, setTwins] = (0, import_react.useState)([]);
	const [builds, setBuilds] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listTwins().then(setTwins).catch(() => setTwins([]));
		listProducts({ data: "twin" }).then((rows) => setBuilds(rows.filter((p) => p.id === "twin-build" || p.id === "twin-exclusive"))).catch(() => setBuilds([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Lookbook",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"A lease,",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"not a person."
			] }),
			image: "/still-talent.jpg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
				children: "Permissioned editorial likeness for signed talent only. Written, dated authorization. Withdrawal ends the work. No walk-up sessions. No clones of anyone who did not sign."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [twins.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border-t border-line px-5 py-12 text-sm text-muted md:px-10",
			children: "No live lookbooks on the floor."
		}) : null, twins.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/lookbook/$id",
			params: { id: t.id },
			className: "grid border-t border-line md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: t.image,
				alt: "",
				className: "h-64 w-full object-cover md:h-80"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center px-5 py-8 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: t.pronouns
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl tracking-wide uppercase",
						children: t.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: t.talent_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
						children: t.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-display text-xl text-heat tabular-nums",
						children: [aud(t.price_cents), " / mo"]
					})
				]
			})]
		}, t.id))] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid md:grid-cols-2",
			children: builds.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border-t border-line px-5 py-14 md:px-10",
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
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: p.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-2xl text-heat tabular-nums",
						children: aud(p.price_cents)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
							productId: p.id,
							label: "Open this file"
						})
					})
				]
			}, p.id))
		})
	] });
}
//#endregion
export { LookbookPage as component };
