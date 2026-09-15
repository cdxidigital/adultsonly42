import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as HouseChrome, o as Route$7 } from "./router-Dt0_uhc_.mjs";
import { c as getPublicStorefront, x as tapStorefrontLink } from "./ops-DKG_NDpI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/os._handle-_XTNVbuF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicStorefront() {
	const { handle } = Route$7.useParams();
	const [os, setOs] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		getPublicStorefront({ data: handle }).then(setOs).catch(() => setOs(null));
	}, [handle]);
	if (os === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the file…"
	}) });
	if (!os) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh place-items-center px-5 pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No such storefront." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/os",
			className: "mt-4 text-heat",
			children: "Creator OS"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-lg px-5 pt-28 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: ["OS · ", os.plan]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: os.display_name || os.handle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: ["@", os.handle]
			}),
			os.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm leading-relaxed text-ivory/80",
				children: os.bio
			}) : null,
			os.links.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 space-y-2",
				children: os.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: l.href || "#",
					className: "flex min-h-12 items-center justify-between border border-line px-4 hover:border-heat hover:text-heat",
					onClick: () => {
						tapStorefrontLink({ data: os.handle });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xs tracking-widest uppercase",
						children: l.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-sm text-muted",
						children: l.href
					})]
				}) }, l.label))
			}) : null,
			os.menu.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: os.menu.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between border-t border-line py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-heat",
							children: m.price
						})]
					}, m.title))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-xs text-muted",
				children: [os.views, " views"]
			})
		]
	}) });
}
//#endregion
export { PublicStorefront as component };
