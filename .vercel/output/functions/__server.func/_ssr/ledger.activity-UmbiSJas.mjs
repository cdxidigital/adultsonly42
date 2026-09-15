import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as TapeRow } from "./router-Dt0_uhc_.mjs";
import { i as getLedger } from "./rewards-DNE05TVd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger.activity-UmbiSJas.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"all",
	"available",
	"pending",
	"redeemed"
];
function TapePage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [filter, setFilter] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		getLedger().then((d) => setRows(d.activity)).catch(() => setRows([]));
	}, []);
	const shown = rows.filter((r) => filter === "all" || r.state === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-5 py-12 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "The tape"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: "Every point has a story."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f),
					className: `min-h-11 border px-4 font-display text-xs tracking-widest uppercase ${filter === f ? "border-heat bg-heat text-navy" : "border-line hover:border-heat hover:text-heat"}`,
					children: f
				}, f))
			}),
			shown.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 max-w-3xl",
				children: shown.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapeRow, { row }, row.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "Nothing in this filter yet."
			})
		]
	});
}
//#endregion
export { TapePage as component };
