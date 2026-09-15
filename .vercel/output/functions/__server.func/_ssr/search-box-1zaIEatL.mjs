import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Search } from "../_libs/lucide-react.mjs";
import { x as cn } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-box-1zaIEatL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchBox({ initial = "", size = "lg", autoFocus = false, kind = "all", dest = "search", placeholder = "Search talent, titles, houses, statutes…" }) {
	const navigate = useNavigate();
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
				e.preventDefault();
				ref.current?.focus();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const q = String(fd.get("q") ?? "").trim();
		if (dest === "dossier") navigate({
			to: "/atlas/dossier",
			search: {
				q,
				qid: "",
				id: ""
			}
		});
		else navigate({
			to: "/atlas/search",
			search: {
				q,
				kind
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
			className: cn("pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted", size === "lg" ? "size-5" : "size-4"),
			strokeWidth: 1.75
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref,
			name: "q",
			defaultValue: initial,
			autoFocus,
			autoComplete: "off",
			placeholder,
			"aria-label": "Search the index",
			className: cn("w-full border border-line bg-navy text-ivory placeholder:text-muted focus:border-heat focus:outline-none", size === "lg" ? "h-14 pl-12 pr-4 font-display text-xl" : "h-11 pl-11 pr-4 text-sm")
		})]
	});
}
//#endregion
export { SearchBox as t };
