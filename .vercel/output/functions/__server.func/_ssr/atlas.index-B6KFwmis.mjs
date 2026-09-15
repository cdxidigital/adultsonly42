import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as getById, J as KINDS, U as listKind, Y as KIND_META, z as counts } from "./router-Dt0_uhc_.mjs";
import { t as KIND_ICON } from "./kind-mark-JqKbQi8c.mjs";
import { t as EntityCard } from "./entity-card-CKpKh91N.mjs";
import { t as SearchBox } from "./search-box-1zaIEatL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas.index-B6KFwmis.js
var import_jsx_runtime = require_jsx_runtime();
var TRY = [
	{
		q: "fleshsesh",
		kind: "companies"
	},
	{
		q: "Vale Noir",
		kind: "performers"
	},
	{
		q: "2257",
		kind: "law"
	},
	{
		q: "XBIZ",
		kind: "events"
	},
	{
		q: "Helix House",
		kind: "companies"
	}
];
function AtlasHome() {
	const c = counts();
	const spotlight = [
		getById("fleshsesh"),
		getById("vale-noir"),
		getById("usc-2257"),
		getById("helix-house")
	].filter(Boolean);
	const upcoming = listKind("events").filter((e) => e.status === "Upcoming").slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-10 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "The index"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 max-w-3xl font-display text-5xl tracking-wide uppercase md:text-7xl",
				children: [
					"The trade,",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"filed."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
				children: "A professional register — not a tube. Search public industry databases via Wikidata, plus the house desk, calendar, and the statutes that govern the work. No explicit media. Performers in the live index need a Wikidata birth year of 21 or older."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, { autoFocus: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "font-display text-[11px] tracking-widest uppercase",
					children: "Try"
				}), TRY.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/search",
					search: {
						q: ex.q,
						kind: ex.kind
					},
					className: "hover:text-heat",
					children: ex.q
				}) }, ex.q))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-7",
				children: KINDS.map((kind) => {
					const Icon = KIND_ICON[kind];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "bg-void",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/atlas/$kind",
							params: { kind },
							className: "block px-4 py-6 hover:bg-navy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-heat" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-display text-sm tracking-wide uppercase",
									children: KIND_META[kind].label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-xs text-muted tabular-nums",
									children: c[kind]
								})
							]
						})
					}, kind);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Spotlight"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: spotlight.map((e) => e ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCard, { entity: e }, e.id) : null)
				})]
			}),
			upcoming.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Upcoming"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/nights",
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "House nights"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCard, { entity: e }, e.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-14 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/atlas/dossier",
						search: {
							q: "",
							qid: "",
							id: ""
						},
						className: "hover:text-heat",
						children: "Compile a dossier"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/atlas/sources",
						className: "hover:text-heat",
						children: "Databases we index"
					})
				]
			})
		]
	});
}
//#endregion
export { AtlasHome as component };
