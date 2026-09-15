import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas.live._qid-DQjtZamU.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "px-5 py-16",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl tracking-wide uppercase",
		children: "Not in the live index"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/atlas",
		className: "mt-4 inline-block text-heat",
		children: "Return to the index"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
