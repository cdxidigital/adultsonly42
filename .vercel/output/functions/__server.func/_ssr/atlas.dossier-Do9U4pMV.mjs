import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as isUnauthorized } from "./money-CfiFmu6E.mjs";
import { s as Printer, u as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as getById, K as search, R as useCurrentUserState, W as relatedOf, h as GhostButton, u as Route$19 } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
import { i as fileDossier, o as getDossierState } from "./ops-DKG_NDpI.mjs";
import { n as EntityRow } from "./entity-card-CKpKh91N.mjs";
import { t as SearchBox } from "./search-box-1zaIEatL.mjs";
import { n as LIVE_SOURCE_LINE } from "./sources-Cj8xlN2Y.mjs";
import { t as LiveRow } from "./live-row-BfJNlA-k.mjs";
import { n as searchLiveIndex, t as getLiveRecord } from "./queries-fjRHN5XR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas.dossier-Do9U4pMV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TRY = [
	"Vale Noir",
	"fleshsesh",
	"Evil Angel",
	"2257",
	"Helix House"
];
function DossierPage() {
	const { q, qid, id } = Route$19.useSearch();
	const query = q.trim();
	const pinned = id ? getById(id) : void 0;
	const deskHits = (0, import_react.useMemo)(() => {
		if (!query && !pinned) return [];
		const hits = query ? search(query, "all").map((h) => h.entity) : [];
		if (pinned && !hits.some((e) => e.id === pinned.id)) hits.unshift(pinned);
		return hits.slice(0, 8);
	}, [query, pinned]);
	const related = pinned ? relatedOf(pinned).slice(0, 6) : deskHits[0] ? relatedOf(deskHits[0]).slice(0, 6) : [];
	const [live, setLive] = (0, import_react.useState)([]);
	const [liveState, setLiveState] = (0, import_react.useState)("idle");
	const [liveError, setLiveError] = (0, import_react.useState)(null);
	const { user } = useCurrentUserState();
	const [bought, setBought] = (0, import_react.useState)(false);
	const [filed, setFiled] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setBought(false);
			setFiled(false);
			return;
		}
		getDossierState().then((s) => {
			setBought(s.bought);
			const match = s.files.some((f) => f.query.toLowerCase() === query.toLowerCase() && f.qid === qid && f.entity_id === id);
			setFiled(match);
		}).catch(() => void 0);
	}, [
		user,
		query,
		qid,
		id
	]);
	(0, import_react.useEffect)(() => {
		if (query.length < 2 && !qid) {
			setLive([]);
			setLiveState("idle");
			setLiveError(null);
			return;
		}
		let alive = true;
		setLiveState("loading");
		const run = async () => {
			const hits = [];
			let err = null;
			if (qid) {
				const row = await getLiveRecord({ data: { qid } });
				if (row) hits.push(row);
			}
			if (query.length >= 2) {
				const res = await searchLiveIndex({ data: {
					q: query,
					kind: "all"
				} });
				if (!alive) return;
				if (res.error) err = res.error;
				for (const h of res.hits) if (!hits.some((x) => x.qid === h.qid)) hits.push(h);
			}
			if (!alive) return;
			setLiveError(err);
			setLive(hits.slice(0, 8));
			setLiveState(err && hits.length === 0 ? "error" : "done");
		};
		run().catch(() => {
			if (!alive) return;
			setLiveState("error");
			setLiveError("live index unavailable");
		});
		return () => {
			alive = false;
		};
	}, [query, qid]);
	const sources = (0, import_react.useMemo)(() => {
		const names = ["House desk"];
		for (const h of live) for (const d of h.databases) if (!names.includes(d.name)) names.push(d.name);
		if (live.length && !names.includes("Wikidata")) names.push("Wikidata");
		return names;
	}, [live]);
	const title = pinned?.name || live[0]?.name || query || "Untitled";
	const compiled = Boolean(query || pinned || qid);
	async function stamp() {
		if (!query && !title) return;
		setBusy(true);
		try {
			const res = await fileDossier({ data: {
				query: query || title,
				qid: qid || void 0,
				entityId: id || void 0,
				title,
				sources
			} });
			setFiled(true);
			toast.success(res.already ? "Already on the desk." : "Filed on the desk.");
		} catch (err) {
			if (isUnauthorized(err)) {
				toast.error("Sign in to file this name.");
				return;
			}
			toast.error(err instanceof Error ? err.message : "The desk could not file that.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-10 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "Dossier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-wide uppercase md:text-6xl",
				children: "A name, compiled."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
				children: "Pull a record from the house desk and live industry databases into one file. Identifiers only — IAFD, AFDB, AVN, XXXBios. No photographs. No scene descriptions. Stamp it on the desk for A$49."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
					initial: query,
					dest: "dossier",
					autoFocus: !query,
					placeholder: "A name, a house, a statute…"
				}, query)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "font-display text-[11px] tracking-widest uppercase",
					children: "Try"
				}), TRY.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/dossier",
					search: {
						q: ex,
						qid: "",
						id: ""
					},
					className: "hover:text-heat",
					children: ex
				}) }, ex))]
			}),
			!compiled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-14 max-w-md text-sm text-muted",
				children: "Search a name. The compiler will fold desk records, live identifiers, and related files into a single sheet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-12 border border-line bg-navy p-5 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-[11px] tracking-widest text-heat lowercase",
								children: "fleshsesh atlas · dossier"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-4xl tracking-wide uppercase",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"Compiled ",
									(/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
									" · 18+ · identifiers only"
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
							type: "button",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "mr-2 size-4" }), "Print"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xs tracking-widest text-heat uppercase",
								children: "Sources"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: sources.join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [LIVE_SOURCE_LINE, ". Birth years used only to enforce 21+."]
							})
						]
					}),
					deskHits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xs tracking-widest text-heat uppercase",
							children: "Desk file"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: deskHits.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityRow, {
								entity: e,
								q: query
							}, `${e.kind}:${e.id}`))
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xs tracking-widest text-heat uppercase",
								children: "Live identifiers"
							}),
							liveState === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "Querying Wikidata…"
							}) : null,
							liveState === "error" && live.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-muted",
								children: [
									"Live index unavailable",
									liveError ? ` (${liveError})` : "",
									". Desk records above still compile."
								]
							}) : null,
							liveState !== "loading" && live.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "No live industry identifiers for this string. Desk records and statutes still file."
							}) : null,
							live.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: live.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-line py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRow, { hit: h }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 flex flex-wrap gap-2",
										children: h.databases.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: d.href,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "inline-flex min-h-11 items-center gap-1.5 border border-line px-2.5 text-xs hover:border-heat hover:text-heat",
											children: [d.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
										}) }, d.name + d.href))
									})]
								}, h.qid))
							}) : null
						]
					}),
					related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xs tracking-widest text-heat uppercase",
							children: "Related on the desk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: related.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityRow, { entity: e }, `${e.kind}:${e.id}`))
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "mt-12 border-t border-line pt-6",
						children: filed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								"Filed on the desk.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/desk",
									className: "text-heat",
									children: "Open the desk →"
								})
							]
						}) : bought ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "The pack is settled. Stamp this name onto the desk."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
								type: "button",
								disabled: busy,
								onClick: stamp,
								children: busy ? "Filing…" : "File this name"
							})
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-[1fr_auto] md:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xs tracking-widest text-heat uppercase",
								children: "Research pack"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-md text-sm text-muted",
								children: "A$49, once. Then stamp as many names as the desk needs. The file is identifiers and sources — not a tube, not a classifieds board."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
								productId: "atlas-dossier",
								label: "Settle the pack · A$49"
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { DossierPage as component };
