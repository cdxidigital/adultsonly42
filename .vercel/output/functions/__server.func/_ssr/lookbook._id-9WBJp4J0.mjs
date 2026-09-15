import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { _ as HouseChrome, s as Route$9 } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
import { u as getTwin } from "./ops-DKG_NDpI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookbook._id-9WBJp4J0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TwinPage() {
	const { id } = Route$9.useParams();
	const [row, setRow] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		getTwin({ data: id }).then(setRow).catch(() => setRow(null));
	}, [id]);
	if (row === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the lookbook…"
	}) });
	if (!row) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh place-items-center px-5 pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Not on the lookbook." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/lookbook",
			className: "mt-4 text-heat",
			children: "Lookbook"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid pt-20 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: row.image,
			alt: "",
			className: "h-80 w-full object-cover md:min-h-[70dvh] md:h-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-center px-5 py-12 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/lookbook",
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Lookbook"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-xs tracking-widest text-heat uppercase",
					children: row.pronouns
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-5xl tracking-wide uppercase",
					children: row.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: row.talent_name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-md text-sm leading-relaxed text-muted",
					children: row.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 font-display text-3xl text-heat tabular-nums",
					children: [aud(row.price_cents), " / mo"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
						productId: row.product_id,
						label: "Lease this lookbook"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/talent/$id",
					params: { id: row.talent_id },
					className: "mt-6 font-display text-xs tracking-widest uppercase hover:text-heat",
					children: "Talent file →"
				})
			]
		})]
	}) });
}
//#endregion
export { TwinPage as component };
