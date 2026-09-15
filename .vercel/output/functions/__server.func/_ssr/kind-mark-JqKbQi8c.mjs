import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Share2, d as Clapperboard, h as Briefcase, l as Gavel, m as Building2, n as UserRound, p as Calendar } from "../_libs/lucide-react.mjs";
import { x as cn } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kind-mark-JqKbQi8c.js
var import_jsx_runtime = require_jsx_runtime();
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function initials(name) {
	const parts = name.replace(/[§.]/g, " ").split(/\s+/).filter(Boolean);
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function Portrait({ id, name, kind, className }) {
	const h = hash(id + kind);
	const letters = initials(name);
	const rot = h % 18 - 9;
	const offset = h % 7 - 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden bg-navy", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 160 200",
			className: "size-full",
			preserveAspectRatio: "xMidYMid slice",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "160",
					height: "200",
					fill: "#0B022D"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 12 + offset,
					y: "18",
					width: "136",
					height: "164",
					fill: "none",
					stroke: "#E07DCF",
					strokeOpacity: "0.35",
					strokeWidth: "0.6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "28",
					y: "40",
					width: "104",
					height: "88",
					fill: "#E07DCF",
					opacity: "0.12",
					transform: `rotate(${rot} 80 84)`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "80",
					y: "168",
					textAnchor: "middle",
					fill: "#F3F9F7",
					fontFamily: "Oswald, sans-serif",
					fontSize: "28",
					letterSpacing: "3",
					children: letters
				})
			]
		})
	});
}
var KIND_ICON = {
	performers: UserRound,
	productions: Clapperboard,
	companies: Building2,
	agents: Briefcase,
	events: Calendar,
	social: Share2,
	law: Gavel
};
//#endregion
export { Portrait as n, KIND_ICON as t };
