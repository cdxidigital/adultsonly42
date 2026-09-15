import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as safeRedirect } from "./pending-DwzrSU6r.mjs";
import { r as signIn } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-CrtFThNC.mjs";
import { R as useCurrentUserState, _ as HouseChrome, b as BrandLogo, p as Route$33 } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CpMoqdfW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const redirect = safeRedirect(Route$33.useSearch().redirect);
	const { user, isPending } = useCurrentUserState();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		router.history.push(redirect);
	}, [
		isPending,
		user,
		redirect,
		router
	]);
	if (!isPending && user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid min-h-dvh place-items-center px-5 pt-24 pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "mx-auto mb-8 h-14 w-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "The desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl tracking-wide uppercase",
					children: "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 mb-8 text-sm leading-relaxed text-muted",
					children: "Member pricing, seats, rooms, and the tab all sit on a signed file. Google or X."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(p.providerId, { callbackURL: redirect }),
						className: "min-h-12 border border-line font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat",
						children: ["Continue with ", p.label]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-xs text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-heat",
						children: "Back to the house"
					})
				})
			]
		})
	}) });
}
//#endregion
export { Login as component };
