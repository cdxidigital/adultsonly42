import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as getEntity } from "./router-Dt0_uhc_.mjs";
import { n as isLiveId, r as useSaved } from "./saved-DqPZIONf.mjs";
import { n as Portrait } from "./kind-mark-JqKbQi8c.mjs";
import { t as EntityCard } from "./entity-card-CKpKh91N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas.saved-BLQJueLW.js
var import_jsx_runtime = require_jsx_runtime();
function SavedPage() {
	const items = useSaved((s) => s.items);
	const local = items.map((r) => ({
		ref: r,
		entity: getEntity(r.kind, r.id)
	})).filter((x) => x.entity);
	const live = items.filter((r) => !getEntity(r.kind, r.id) && isLiveId(r.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-10 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "This device"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-wide uppercase",
				children: "Saved"
			}),
			local.length === 0 && live.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-md text-sm text-muted",
				children: "Nothing pinned yet. Open a record and save it — the list stays in this browser."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2",
				children: [local.map(({ entity }) => entity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityCard, { entity }, `${entity.kind}:${entity.id}`) : null), live.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/atlas/live/$qid",
					params: { qid: r.id },
					className: "flex items-center gap-3 border border-line bg-navy p-3 hover:border-heat",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
						id: r.id,
						name: r.name ?? r.id,
						kind: r.kind,
						className: "size-14 shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-[11px] tracking-widest text-muted uppercase",
							children: "Live index"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg tracking-wide uppercase",
							children: r.name ?? r.id
						})]
					})]
				}, `live:${r.id}`))]
			})
		]
	});
}
//#endregion
export { SavedPage as component };
