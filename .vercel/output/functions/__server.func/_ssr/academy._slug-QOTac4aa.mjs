import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as isUnauthorized, t as aud } from "./money-CfiFmu6E.mjs";
import { D as getCourse, O as getCourseReader, R as useCurrentUserState, _ as HouseChrome, f as Route$25 } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/academy._slug-QOTac4aa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoursePage() {
	const { slug } = Route$25.useParams();
	const { user } = useCurrentUserState();
	const [pack, setPack] = (0, import_react.useState)(void 0);
	const [reader, setReader] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getCourse({ data: slug }).then(setPack).catch(() => setPack(null));
	}, [slug]);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setReader(null);
			return;
		}
		getCourseReader({ data: slug }).then(setReader).catch((err) => {
			if (!isUnauthorized(err)) setReader(null);
		});
	}, [slug, user]);
	if (pack === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the file…"
	}) });
	if (!pack) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh place-items-center px-5 pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No such seat." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/academy",
			className: "mt-4 text-heat",
			children: "Academy"
		})]
	}) });
	const enrolled = reader?.enrolled === true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid pt-20 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: pack.product.image,
			alt: "",
			className: "h-72 w-full object-cover md:min-h-[70dvh] md:h-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-center px-5 py-12 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/academy",
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Academy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-5xl tracking-wide uppercase",
					children: pack.product.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
					children: pack.product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 font-display text-3xl text-heat tabular-nums",
					children: aud(pack.product.price_cents)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: enrolled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "You hold this seat"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
						productId: pack.product.id,
						label: "Take this seat"
					})
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-t border-line px-5 py-12 md:px-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs tracking-widest text-heat uppercase",
			children: "Modules"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-8 space-y-8",
			children: enrolled && reader ? reader.modules.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border-t border-line pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: ["0", i + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl tracking-wide uppercase",
						children: m.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
						children: m.body
					})
				]
			}, m.id)) : pack.modules.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border-t border-line pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: ["0", i + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl tracking-wide uppercase",
						children: m.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Locked. The seat opens the file."
					})
				]
			}, m.id))
		})]
	})] });
}
//#endregion
export { CoursePage as component };
