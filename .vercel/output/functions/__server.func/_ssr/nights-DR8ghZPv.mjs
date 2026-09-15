import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { _ as HouseChrome, v as PageHero } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
import { f as listNights } from "./ops-DKG_NDpI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nights-DR8ghZPv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NightsPage() {
	const [nights, setNights] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listNights().then(setNights).catch(() => setNights([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Nights",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"A door",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"with a date."
			] }),
			image: "/still-live.jpg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
				children: "Perth first. A ticket holds a name. Featured slots are for clubs, drops, and house collabs — not a classifieds board."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: nights.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "grid border-t border-line md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: n.image,
				alt: "",
				className: "h-64 w-full object-cover md:h-80"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center px-5 py-8 md:px-10",
				children: [
					n.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Featured"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-muted uppercase",
						children: n.city
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl tracking-wide uppercase",
						children: n.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							n.venue,
							" · ",
							n.date
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
						children: n.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-xl text-heat tabular-nums",
						children: aud(n.price_cents)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
							productId: n.product_id,
							label: "Take a ticket"
						})
					})
				]
			})]
		}, n.id)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border-t border-line px-5 py-16 md:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Placement"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl tracking-wide uppercase",
					children: "Feature a night"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-sm leading-relaxed text-muted",
					children: "Your name on this page for a week. Clubs and house collabs. The house does not sell escort ads."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-2xl text-heat tabular-nums",
					children: aud(49900)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
						productId: "night-boost",
						label: "Buy a featured slot"
					})
				})
			]
		})
	] });
}
//#endregion
export { NightsPage as component };
