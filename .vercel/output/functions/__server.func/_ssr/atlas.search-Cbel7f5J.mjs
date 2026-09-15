import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as isKind, J as KINDS, K as search, Y as KIND_META, l as Route$17, q as socialDirectory, x as cn } from "./router-Dt0_uhc_.mjs";
import { n as EntityRow } from "./entity-card-CKpKh91N.mjs";
import { t as SearchBox } from "./search-box-1zaIEatL.mjs";
import { n as LIVE_SOURCE_LINE } from "./sources-Cj8xlN2Y.mjs";
import { t as LiveRow } from "./live-row-BfJNlA-k.mjs";
import { n as searchLiveIndex } from "./queries-fjRHN5XR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas.search-Cbel7f5J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q, kind } = Route$17.useSearch();
	const hits = kind === "social" ? [] : search(q, kind === "all" || !isKind(kind) ? "all" : kind);
	const socialHits = kind === "all" || kind === "social" ? socialDirectory().filter((row) => {
		if (!q.trim()) return kind === "social";
		const blob = `${row.platform} ${row.handle} ${row.entity.name}`.toLowerCase();
		return q.toLowerCase().split(/\s+/).every((t) => blob.includes(t));
	}) : [];
	const [live, setLive] = (0, import_react.useState)([]);
	const [liveState, setLiveState] = (0, import_react.useState)("idle");
	const [liveError, setLiveError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const query = q.trim();
		if (query.length < 2 || kind === "social" || kind === "agents" || kind === "events" || kind === "law") {
			setLive([]);
			setLiveState("idle");
			setLiveError(null);
			return;
		}
		let alive = true;
		setLiveState("loading");
		searchLiveIndex({ data: {
			q: query,
			kind
		} }).then((res) => {
			if (!alive) return;
			setLive(res.hits);
			setLiveError(res.error ?? null);
			setLiveState(res.error ? "error" : "done");
		});
		return () => {
			alive = false;
		};
	}, [q, kind]);
	const liveKinds = kind === "all" || kind === "performers" || kind === "productions" || kind === "companies";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-10 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "Index"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-wide uppercase",
				children: "Search"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
					initial: q,
					autoFocus: true,
					kind
				}, `${kind}:${q}`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					label: "All",
					kind: "all",
					current: kind,
					q
				}), KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					label: KIND_META[k].label,
					kind: k,
					current: kind,
					q
				}, k))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-muted",
				children: [
					kind === "social" ? `${socialHits.length} public handle${socialHits.length === 1 ? "" : "s"}` : `${hits.length} desk record${hits.length === 1 ? "" : "s"}`,
					liveKinds && q.trim().length >= 2 ? ` · ${liveState === "loading" ? "querying live databases" : `${live.length} live`}` : "",
					q.trim() ? ` for “${q}”` : "",
					q.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/atlas/dossier",
						search: {
							q,
							qid: "",
							id: ""
						},
						className: "text-heat",
						children: "Compile a dossier"
					})] }) : null
				]
			}),
			hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityRow, {
						entity: h.entity,
						q
					}, `${h.entity.kind}:${h.entity.id}`))
				})]
			}) : null,
			(kind === "social" || kind === "all" && socialHits.length > 0 && q.trim()) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: socialHits.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/atlas/$kind/$id",
					params: {
						kind: row.entity.kind,
						id: row.entity.id
					},
					className: "flex items-center gap-3 border-t border-line py-3 hover:text-heat",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-24 shrink-0 font-display text-[11px] tracking-widest text-muted uppercase",
							children: row.platform
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm",
							children: row.handle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: row.entity.name
						})
					]
				}, `${row.entity.id}-${row.platform}-${row.handle}`))
			}),
			liveKinds && q.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: ["Live databases · ", LIVE_SOURCE_LINE]
					}),
					liveState === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Querying Wikidata…"
					}) : null,
					liveState === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [
							"Live index unavailable",
							liveError ? ` (${liveError})` : "",
							". Desk records above still search."
						]
					}) : null,
					live.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: live.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRow, {
							hit,
							q
						}, hit.qid))
					}) : null,
					liveState === "done" && live.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm text-muted",
						children: "No live database match. Try a performer, title, or studio name. Performers need a Wikidata birth year of 21+."
					}) : null
				]
			}) : null,
			hits.length === 0 && socialHits.length === 0 && live.length === 0 && liveState !== "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 max-w-md text-muted",
				children: q.trim() ? "Nothing matched the desk. Live results appear when a public industry database has a record." : "Type a name, title, statute, or city. Two characters open the live industry databases."
			}) : null
		]
	});
}
function FilterChip({ label, kind, current, q }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/atlas/search",
		search: {
			q,
			kind
		},
		className: cn("px-3 py-2 font-display text-xs tracking-widest uppercase", current === kind ? "bg-heat text-navy" : "border border-line text-muted hover:border-heat hover:text-heat"),
		children: label
	});
}
//#endregion
export { SearchPage as component };
