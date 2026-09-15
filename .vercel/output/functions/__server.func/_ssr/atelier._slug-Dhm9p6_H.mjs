import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { A as getProduct, _ as HouseChrome, d as Route$22, x as cn } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
import { i as specSchema, n as specComplete, t as encodeSpec } from "./atelier--laWbw2Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atelier._slug-Dhm9p6_H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route$22.useParams();
	const [product, setProduct] = (0, import_react.useState)(void 0);
	const [values, setValues] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		getProduct({ data: slug }).then(setProduct).catch(() => setProduct(null));
	}, [slug]);
	const schema = product ? specSchema(product.id) : null;
	const spec = (0, import_react.useMemo)(() => encodeSpec(values), [values]);
	const ready = product ? specComplete(product.id, values) : false;
	if (product === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Holding the object…"
	}) });
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh place-items-center px-5 pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That object is not on the floor." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/atelier",
			className: "mt-4 text-heat",
			children: "Back to atelier"
		})]
	}) });
	const sold = product.inventory !== null && product.inventory <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid min-h-dvh pt-20 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: product.image,
			alt: "",
			className: "h-80 w-full object-cover md:h-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-center px-5 py-12 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atelier",
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Atelier"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-5xl tracking-wide uppercase",
					children: product.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: product.subtitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 font-display text-3xl text-heat tabular-nums",
					children: aud(product.price_cents)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-md text-sm leading-relaxed text-muted",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted",
					children: sold ? "Sold through" : schema?.madeToOrder || product.inventory === null ? "Made to order · cut when you settle" : `${product.inventory} remaining`
				}),
				schema ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 max-w-md space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: schema.blurb
					}), schema.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						field,
						value: values[field.key] ?? "",
						onChange: (v) => setValues((cur) => ({
							...cur,
							[field.key]: v
						}))
					}, field.key))]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: sold ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest uppercase",
						children: "Wait for the next drop"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
						productId: product.id,
						spec,
						disabled: !ready,
						label: schema ? "Cut this object" : "Add to tab"
					})
				})
			]
		})]
	}) });
}
function Field({ field, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "font-display text-[11px] tracking-widest text-heat uppercase",
		children: [field.label, field.required ? "" : " · optional"]
	}), field.kind === "choice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: field.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(o.value),
			className: cn("min-h-11 border px-3 font-display text-xs tracking-widest uppercase", value === o.value ? "border-heat text-heat" : "border-line text-muted hover:border-heat hover:text-heat"),
			children: o.label
		}, o.value))
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value,
		maxLength: field.max,
		placeholder: field.placeholder,
		onChange: (e) => onChange(e.target.value),
		className: "mt-2 h-12 w-full border border-line bg-navy px-3 text-sm text-ivory placeholder:text-muted focus:border-heat focus:outline-none"
	})] });
}
//#endregion
export { ProductPage as component };
