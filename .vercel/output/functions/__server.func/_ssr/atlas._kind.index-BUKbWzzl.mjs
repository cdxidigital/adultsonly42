import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as isKind, U as listKind, Y as KIND_META, i as Route$2, q as socialDirectory } from "./router-Dt0_uhc_.mjs";
import { t as KIND_ICON } from "./kind-mark-JqKbQi8c.mjs";
import { t as EntityCard } from "./entity-card-CKpKh91N.mjs";
import { t as SearchBox } from "./search-box-1zaIEatL.mjs";
import { n as LIVE_SOURCE_LINE } from "./sources-Cj8xlN2Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas._kind.index-BUKbWzzl.js
var import_jsx_runtime = require_jsx_runtime();
var LIVE_KINDS = /* @__PURE__ */ new Set([
	"performers",
	"productions",
	"companies"
]);
function BrowseKind() {
	const { kind } = Route$2.useParams();
	if (!isKind(kind)) return null;
	const meta = KIND_META[kind];
	const Icon = KIND_ICON[kind];
	if (kind === "social") {
		const rows = socialDirectory();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 py-10 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-display text-xs tracking-widest text-heat uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), " Directory"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-5xl tracking-wide uppercase",
					children: meta.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm text-muted",
					children: meta.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "font-display text-[11px] tracking-widest text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Platform"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Handle"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Record"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 text-muted",
									children: row.platform
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 font-mono",
									children: row.handle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/atlas/$kind/$id",
										params: {
											kind: row.entity.kind,
											id: row.entity.id
										},
										className: "hover:text-heat",
										children: row.entity.name
									})
								})
							]
						}, `${row.entity.kind}-${row.entity.id}-${row.platform}-${row.handle}`)) })]
					})
				})
			]
		});
	}
	const list = listKind(kind);
	const upcoming = kind === "events" ? list.filter((e) => e.status === "Upcoming") : [];
	const rest = kind === "events" ? list.filter((e) => e.status !== "Upcoming") : list;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-10 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 font-display text-xs tracking-widest text-heat uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
					" Browse",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted tabular-nums",
						children: list.length
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-wide uppercase",
				children: meta.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-muted",
				children: meta.blurb
			}),
			LIVE_KINDS.has(kind) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 border border-line bg-navy p-5 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Live databases"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
						children: "Search a name to query the public industry databases. The roster below is the house desk. Performers need a Wikidata birth year of 21+."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-[11px] tracking-widest text-muted uppercase",
						children: LIVE_SOURCE_LINE
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 max-w-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
							size: "sm",
							kind,
							placeholder: `Search ${meta.label.toLowerCase()}…`
						})
					})
				]
			}) : null,
			upcoming.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Upcoming"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2",
					children: upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCard, { entity: e }, e.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: upcoming.length ? "mt-10" : "mt-8",
				children: [upcoming.length > 0 || LIVE_KINDS.has(kind) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: LIVE_KINDS.has(kind) ? "Desk roster" : "Archive"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2",
					children: rest.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCard, { entity: e }, e.id))
				})]
			})
		]
	});
}
//#endregion
export { BrowseKind as component };
