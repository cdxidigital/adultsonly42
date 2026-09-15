import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { F as listTalent, _ as HouseChrome, v as PageHero } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talent.index-DtxVnBZj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TalentPage() {
	const [roster, setRoster] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listTalent().then(setRoster).catch(() => setRoster([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHero, {
			kicker: "01 — Talent",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Every body",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"that consents."
			] }),
			image: "/still-talent.jpg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
				children: "Signed adult talent. Day rates in AUD. Campaign deposits open a brief. If they are not on this list, they are not available."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/join",
				className: "mt-6 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase",
				children: "Open a talent file"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: roster.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/talent/$id",
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
						children: t.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: t.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
						children: t.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-display text-xl text-heat tabular-nums",
						children: [aud(t.day_rate_cents), " / day"]
					})
				]
			})]
		}, t.id)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid place-items-center px-5 py-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Roster"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl tracking-wide uppercase",
					children: "Want a file?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/apply",
							className: "inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase",
							children: "Apply / brief"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lookbook",
							className: "inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat",
							children: "Lookbook"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/atlas",
							className: "inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat",
							children: "Atlas"
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { TalentPage as component };
