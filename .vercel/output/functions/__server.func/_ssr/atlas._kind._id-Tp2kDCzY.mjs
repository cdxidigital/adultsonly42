import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as BookmarkCheck, g as Bookmark } from "../_libs/lucide-react.mjs";
import { G as resolveCredit, H as isKind, S as houseCase, V as getEntity, W as relatedOf, Y as KIND_META, h as GhostButton, r as Route$1, x as cn } from "./router-Dt0_uhc_.mjs";
import { r as useSaved } from "./saved-DqPZIONf.mjs";
import { n as Portrait, t as KIND_ICON } from "./kind-mark-JqKbQi8c.mjs";
import { t as EntityCard } from "./entity-card-CKpKh91N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas._kind._id-Tp2kDCzY.js
var import_jsx_runtime = require_jsx_runtime();
function EntityPage() {
	const { kind, id } = Route$1.useParams();
	const entity = isKind(kind) ? getEntity(kind, id) : void 0;
	const saved = useSaved((s) => entity ? s.has({
		kind: entity.kind,
		id: entity.id
	}) : false);
	const toggle = useSaved((s) => s.toggle);
	if (!entity) return null;
	const Icon = KIND_ICON[entity.kind];
	const related = relatedOf(entity);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "px-5 py-10 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 font-display text-xs tracking-widest text-heat uppercase",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/$kind",
					params: { kind: entity.kind },
					className: "hover:text-ivory",
					children: KIND_META[entity.kind].singular
				}),
				entity.source === "public" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "· Public record"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
						id: entity.id,
						name: entity.name,
						kind: entity.kind,
						className: "hidden h-36 w-[6.8rem] shrink-0 sm:block"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: cn("font-display text-4xl tracking-wide md:text-5xl", houseCase(entity.name)),
								children: entity.name
							}),
							entity.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-lg text-muted",
								children: entity.subtitle
							}) : null,
							entity.aka && entity.aka.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: ["Also ", entity.aka.join(", ")]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [entity.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-heat px-2 py-1 font-display text-[11px] tracking-widest text-heat uppercase",
									children: entity.status
								}) : null, entity.region ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-line px-2 py-1 font-display text-[11px] tracking-widest uppercase",
									children: entity.region
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
								className: "mt-4 lg:hidden",
								onClick: () => toggle({
									kind: entity.kind,
									id: entity.id
								}),
								children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "mr-2 size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-2 size-4" }), saved ? "Saved" : "Save record"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-2xl text-sm leading-relaxed text-ivory",
					children: entity.summary
				}),
				entity.body ? entity.body.split("\n\n").map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted",
					children: para
				}, para.slice(0, 40))) : null,
				entity.credits && entity.credits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Credits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: "mt-3 w-full text-left text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: entity.credits.map((c, i) => {
							const target = resolveCredit(c);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-4 text-muted",
										children: c.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-4",
										children: target ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/atlas/$kind/$id",
											params: {
												kind: target.kind,
												id: target.id
											},
											className: "hover:text-heat",
											children: c.title
										}) : c.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 font-mono text-muted tabular-nums",
										children: c.year
									})
								]
							}, i);
						}) })
					})]
				}) : null,
				entity.socials && entity.socials.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Public socials"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1",
						children: entity.socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-24 text-muted",
								children: s.platform
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: s.handle
							})]
						}, `${s.platform}-${s.handle}`))
					})]
				}) : null,
				related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Related"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCard, {
							entity: r,
							compact: true
						}, `${r.kind}:${r.id}`))
					})]
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4 lg:pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
						className: "hidden w-full lg:inline-flex",
						onClick: () => toggle({
							kind: entity.kind,
							id: entity.id
						}),
						children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "mr-2 size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-2 size-4" }), saved ? "Saved" : "Save record"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "border border-line p-4",
						children: [
							entity.citation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Citation",
								value: entity.citation
							}) : null,
							entity.venue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Venue",
								value: entity.venue
							}) : null,
							entity.dateStart ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Dates",
								value: entity.dateEnd ? `${entity.dateStart} – ${entity.dateEnd}` : entity.dateStart
							}) : null,
							entity.facts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: f.label,
								value: f.value
							}, f.label))
						]
					}),
					entity.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: entity.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/atlas/search",
							search: {
								q: t,
								kind: "all"
							},
							className: "border border-line px-2.5 py-1 text-xs text-muted hover:border-heat hover:text-heat",
							children: t
						}, t))
					}) : null,
					entity.id === "fleshsesh" || entity.kind === "performers" && entity.tags.includes("signed") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/talent",
						className: "block font-display text-xs tracking-widest text-heat uppercase",
						children: "Open the house roster →"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/atlas/dossier",
						search: {
							q: entity.name,
							qid: "",
							id: entity.id
						},
						className: "block font-display text-xs tracking-widest text-heat uppercase",
						children: "Compile a dossier →"
					})
				]
			})]
		})]
	});
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-line py-2.5 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "font-display text-[11px] tracking-widest text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm",
			children: value
		})]
	});
}
//#endregion
export { EntityPage as component };
