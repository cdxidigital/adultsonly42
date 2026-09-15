import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, f as useRouterState, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as KINDS, Y as KIND_META, _ as HouseChrome, x as cn } from "./router-Dt0_uhc_.mjs";
import { t as hydrateSaved } from "./saved-DqPZIONf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas-BPR590ug.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AtlasLayout() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		hydrateSaved();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-line px-5 pt-24 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "-mx-5 flex gap-x-4 overflow-x-auto px-5 pb-3 font-display text-[11px] tracking-widest whitespace-nowrap uppercase md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:whitespace-normal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas",
					className: cn("text-muted hover:text-heat", path === "/atlas" && "text-heat"),
					children: "Index"
				}),
				KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/$kind",
					params: { kind: k },
					className: cn("text-muted hover:text-heat", path.startsWith(`/atlas/${k}`) && "text-heat"),
					children: KIND_META[k].label
				}, k)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/search",
					search: {
						q: "",
						kind: "all"
					},
					className: cn("text-muted hover:text-heat", path.startsWith("/atlas/search") && "text-heat"),
					children: "Search"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/dossier",
					search: {
						q: "",
						qid: "",
						id: ""
					},
					className: cn("text-muted hover:text-heat", path.startsWith("/atlas/dossier") && "text-heat"),
					children: "Dossier"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atlas/saved",
					className: cn("text-muted hover:text-heat", path.startsWith("/atlas/saved") && "text-heat"),
					children: "Saved"
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] });
}
//#endregion
export { AtlasLayout as component };
