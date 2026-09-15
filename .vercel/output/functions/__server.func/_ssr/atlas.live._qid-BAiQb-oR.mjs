import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as BookmarkCheck, g as Bookmark, u as ExternalLink } from "../_libs/lucide-react.mjs";
import { S as houseCase, Y as KIND_META, h as GhostButton, n as Route, x as cn } from "./router-Dt0_uhc_.mjs";
import { r as useSaved } from "./saved-DqPZIONf.mjs";
import { n as Portrait, t as KIND_ICON } from "./kind-mark-JqKbQi8c.mjs";
import { t as getLiveRecord } from "./queries-fjRHN5XR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas.live._qid-BAiQb-oR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LiveRecordPage() {
	const { qid } = Route.useParams();
	const [hit, setHit] = (0, import_react.useState)(void 0);
	const saved = useSaved((s) => hit ? s.has({
		kind: hit.kind,
		id: hit.qid
	}) : false);
	const toggle = useSaved((s) => s.toggle);
	(0, import_react.useEffect)(() => {
		let alive = true;
		setHit(void 0);
		getLiveRecord({ data: { qid } }).then((row) => {
			if (alive) setHit(row);
		});
		return () => {
			alive = false;
		};
	}, [qid]);
	if (hit === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-5 py-16 text-muted",
		children: "Looking up the live industry databases…"
	});
	if (!hit) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-wide uppercase",
			children: "Not in the live index"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-md text-sm text-muted",
			children: "No industry database record matched this identifier, or the performer did not pass the 21+ birth-year filter."
		})]
	});
	const Icon = KIND_ICON[hit.kind];
	const saveRef = {
		kind: hit.kind,
		id: hit.qid,
		name: hit.name
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "px-5 py-10 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 font-display text-xs tracking-widest text-heat uppercase",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/$kind",
					params: { kind: hit.kind },
					className: "hover:text-ivory",
					children: KIND_META[hit.kind].singular
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "· Live databases"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
						id: hit.qid,
						name: hit.name,
						kind: hit.kind,
						className: "hidden h-36 w-[6.8rem] shrink-0 sm:block"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: cn("font-display text-4xl tracking-wide md:text-5xl", houseCase(hit.name)),
								children: hit.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-heat px-2 py-1 font-display text-[11px] tracking-widest text-heat uppercase",
									children: "Live index"
								}), hit.region ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-line px-2 py-1 font-display text-[11px] tracking-widest uppercase",
									children: hit.region
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
								className: "mt-4 lg:hidden",
								onClick: () => toggle(saveRef),
								children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "mr-2 size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-2 size-4" }), saved ? "Saved" : "Save record"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-2xl text-sm leading-relaxed",
					children: hit.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted",
					children: "Metadata is drawn from Wikidata identifiers for IAFD, Adult Film Database, AVN, XXXBios, EGAFD, BGAFD, and EuroBabeIndex. fleshsesh does not host explicit media, scene descriptions, or photographs. Birth dates are used only to enforce a 21+ filter and are not published."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Industry databases"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3",
						children: [hit.databases.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: d.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex min-h-11 items-center justify-between gap-3 py-2.5 text-sm hover:text-heat",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 shrink-0 text-muted" })]
							})
						}, d.name + d.href)), hit.wikipedia ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: hit.wikipedia,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex min-h-11 items-center justify-between gap-3 py-2.5 text-sm hover:text-heat",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wikipedia" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 shrink-0 text-muted" })]
							})
						}) : null]
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4 lg:pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
						className: "hidden w-full lg:inline-flex",
						onClick: () => toggle(saveRef),
						children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "mr-2 size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-2 size-4" }), saved ? "Saved" : "Save record"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/atlas/dossier",
						search: {
							q: hit.name,
							qid: hit.qid,
							id: ""
						},
						className: "block font-display text-xs tracking-widest text-heat uppercase",
						children: "Compile a dossier →"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "border border-line p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-line py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-display text-[11px] tracking-widest text-muted uppercase",
								children: "Wikidata"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-mono text-sm",
								children: hit.qid
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-display text-[11px] tracking-widest text-muted uppercase",
								children: "Sources"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm",
								children: hit.databases.map((d) => d.name).filter((n, i, a) => a.indexOf(n) === i).join(", ") || "Wikidata"
							})]
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { LiveRecordPage as component };
