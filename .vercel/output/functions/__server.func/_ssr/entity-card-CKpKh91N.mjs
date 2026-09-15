import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as houseCase, Y as KIND_META, x as cn } from "./router-Dt0_uhc_.mjs";
import { n as Portrait, t as KIND_ICON } from "./kind-mark-JqKbQi8c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entity-card-CKpKh91N.js
var import_jsx_runtime = require_jsx_runtime();
function EntityCard({ entity, compact = false }) {
	const Icon = KIND_ICON[entity.kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/atlas/$kind/$id",
		params: {
			kind: entity.kind,
			id: entity.id
		},
		className: cn("group block border border-line bg-navy p-3 hover:border-heat", compact && "p-2.5"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex gap-3", compact ? "items-center" : "items-start"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
				id: entity.id,
				name: entity.name,
				kind: entity.kind,
				className: compact ? "size-14 shrink-0" : "h-24 w-[4.6rem] shrink-0"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-3.5",
							strokeWidth: 1.75
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-[11px] tracking-widest uppercase",
							children: KIND_META[entity.kind].singular
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: cn("mt-1 font-display text-lg tracking-wide text-ivory group-hover:text-heat", houseCase(entity.name)),
						children: entity.name
					}),
					entity.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-sm text-muted",
						children: entity.subtitle
					}) : null,
					!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 line-clamp-2 text-sm leading-relaxed text-muted",
						children: entity.summary
					}) : null
				]
			})]
		})
	});
}
function EntityRow({ entity, q }) {
	const Icon = KIND_ICON[entity.kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/atlas/$kind/$id",
		params: {
			kind: entity.kind,
			id: entity.id
		},
		className: "group flex items-start gap-3 border-t border-line py-4 hover:text-heat",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
			id: entity.id,
			name: entity.name,
			kind: entity.kind,
			className: "size-12 shrink-0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline gap-x-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-display text-lg tracking-wide", houseCase(entity.name)),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
						text: entity.name,
						q
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 font-display text-[11px] tracking-widest text-muted uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), KIND_META[entity.kind].singular]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 line-clamp-2 text-sm text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
					text: entity.summary,
					q
				})
			})]
		})]
	});
}
function Highlight({ text, q }) {
	if (!q?.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text });
	const tokens = q.trim().split(/\s+/).filter((t) => t.length > 1);
	if (tokens.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text });
	const re = new RegExp(`(${tokens.map(escapeReg).join("|")})`, "ig");
	const parts = text.split(re);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: parts.map((part, i) => tokens.some((t) => part.toLowerCase() === t.toLowerCase()) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
		className: "bg-transparent text-heat",
		children: part
	}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i)) });
}
function escapeReg(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
export { EntityRow as n, Highlight as r, EntityCard as t };
