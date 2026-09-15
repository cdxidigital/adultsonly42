import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Y as KIND_META } from "./router-Dt0_uhc_.mjs";
import { n as Portrait, t as KIND_ICON } from "./kind-mark-JqKbQi8c.mjs";
import { r as Highlight } from "./entity-card-CKpKh91N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-row-BfJNlA-k.js
var import_jsx_runtime = require_jsx_runtime();
function LiveRow({ hit, q }) {
	const Icon = KIND_ICON[hit.kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/atlas/live/$qid",
		params: { qid: hit.qid },
		className: "group flex items-start gap-3 border-t border-line py-4 hover:text-heat",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
			id: hit.qid,
			name: hit.name,
			kind: hit.kind,
			className: "size-12 shrink-0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-baseline gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg tracking-wide uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
							text: hit.name,
							q
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 font-display text-[11px] tracking-widest text-muted uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), KIND_META[hit.kind].singular]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted",
					children: hit.summary
				}),
				hit.databases.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 font-display text-[11px] tracking-widest text-heat uppercase",
					children: hit.databases.map((d) => d.name).filter((n, i, a) => a.indexOf(n) === i).join(" · ")
				}) : null
			]
		})]
	});
}
//#endregion
export { LiveRow as t };
