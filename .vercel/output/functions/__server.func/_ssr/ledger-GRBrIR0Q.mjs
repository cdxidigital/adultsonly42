import { C as require_jsx_runtime, f as useRouterState, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as useCurrentUserState, _ as HouseChrome, x as cn, y as SignInHere } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-GRBrIR0Q.js
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		to: "/ledger",
		label: "Overview"
	},
	{
		to: "/ledger/rewards",
		label: "Shelf"
	},
	{
		to: "/ledger/collection",
		label: "Pass"
	},
	{
		to: "/ledger/wallet",
		label: "Wallet"
	},
	{
		to: "/ledger/activity",
		label: "Tape"
	}
];
function LedgerLayout() {
	const { user, isPending } = useCurrentUserState();
	const path = useRouterState({ select: (s) => s.location.pathname });
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the ledger…"
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInHere, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-5 pt-24 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex flex-wrap gap-4 border-b border-line pb-3 font-display text-xs tracking-widest uppercase",
			children: TABS.map((tab) => {
				const on = tab.to === "/ledger" ? path === "/ledger" || path === "/ledger/" : path.startsWith(tab.to);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: tab.to,
					className: cn("text-muted hover:text-heat", on && "text-heat"),
					children: tab.label
				}, tab.to);
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] });
}
//#endregion
export { LedgerLayout as component };
