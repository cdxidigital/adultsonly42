import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { M as listProducts, _ as HouseChrome, v as PageHero } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/academy.index-DLixp4QX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AcademyPage() {
	const [courses, setCourses] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listProducts({ data: "academy" }).then(setCourses).catch(() => setCourses([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "03 — Academy",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Knowledge",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"before heat."
			] }),
			image: "/still-academy.jpg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
				children: "Paid seats. Educators, not coaches. Language, consent, and house craft — never real-time instruction of acts."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: courses.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/academy/$slug",
			params: { slug: c.slug },
			className: "grid border-t border-line md:grid-cols-[120px_1fr_auto] md:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-5 pt-8 font-display text-xs tracking-widest text-heat uppercase md:px-8 md:pt-0",
					children: ["0", i + 1]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-6 md:py-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-wide uppercase md:text-4xl",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-lg text-sm leading-relaxed text-muted",
						children: c.description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-5 pb-8 font-display text-xl text-heat tabular-nums md:px-8 md:pb-0",
					children: aud(c.price_cents)
				})
			]
		}, c.id)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/academy/exam",
				className: "border-t border-line px-5 py-12 hover:bg-navy md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Certificate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl tracking-wide uppercase",
						children: "House craft exam"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm text-muted",
						children: "Four questions. A$29. The badge sits on the desk."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line px-5 py-12 md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Library"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl tracking-wide uppercase",
						children: "Every seat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm text-muted",
						children: "Academy library A$19 / mo, or included in Sesh Black and House."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
							productId: "pass-academy",
							label: "Open the library"
						})
					})
				]
			})]
		})
	] });
}
//#endregion
export { AcademyPage as component };
