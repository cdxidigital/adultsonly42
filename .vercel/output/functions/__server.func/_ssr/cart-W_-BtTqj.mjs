import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as takeAdd } from "./pending-DwzrSU6r.mjs";
import { a as isDiscountable, o as isUnauthorized, s as memberRate, t as aud, u as planLabel } from "./money-CfiFmu6E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as addToCart, E as getCart, I as setCartQty, R as useCurrentUserState, T as checkout, _ as HouseChrome, g as HeatButton, k as getDesk, y as SignInHere } from "./router-Dt0_uhc_.mjs";
import { r as specLabel } from "./atelier--laWbw2Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-W_-BtTqj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [lines, setLines] = (0, import_react.useState)(null);
	const [plan, setPlan] = (0, import_react.useState)(null);
	const [credits, setCredits] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function load() {
		try {
			const [c, d] = await Promise.all([getCart(), getDesk()]);
			setLines(c);
			setPlan(d.plan);
			setCredits(d.credits);
		} catch (err) {
			if (isUnauthorized(err)) return;
			toast.error("The tab would not open.");
			setLines([]);
		}
	}
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		const pending = takeAdd();
		if (pending) {
			addToCart({ data: {
				productId: pending.productId,
				qty: 1,
				spec: pending.spec
			} }).then(() => load()).catch(() => load());
			return;
		}
		load();
	}, [isPending, user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the tab…"
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInHere, { next: "/cart" });
	const rate = memberRate(plan);
	const subtotal = (lines ?? []).reduce((n, l) => {
		return n + (isDiscountable(l.kind) ? Math.round(l.price_cents * rate) : l.price_cents) * l.qty;
	}, 0);
	const creditUsed = Math.min(credits, subtotal);
	const total = subtotal - creditUsed;
	async function settle() {
		setBusy(true);
		try {
			const res = await checkout();
			toast.success(`Settled ${aud(res.total)}.`);
			navigate({ to: "/desk" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not settle.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-5 pt-28 pb-20 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "The tab"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: "Cart"
			}),
			!lines || lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "Nothing on the tab."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atelier",
					className: "mt-4 inline-block text-heat",
					children: "Walk the floor"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-10",
					children: lines.map((l) => {
						const unit = isDiscountable(l.kind) ? Math.round(l.price_cents * rate) : l.price_cents;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-4 border-t border-line py-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: l.image,
									alt: "",
									className: "size-20 object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display tracking-wide uppercase",
										children: l.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: specLabel(l.spec, l.id) || l.kind
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-11 border border-line",
											onClick: () => setCartQty({ data: {
												lineId: l.lineId,
												qty: l.qty - 1
											} }).then(load),
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-6 text-center tabular-nums",
											children: l.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-11 border border-line",
											onClick: () => setCartQty({ data: {
												lineId: l.lineId,
												qty: l.qty + 1
											} }).then(load),
											children: "+"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "w-20 text-right font-display text-heat tabular-nums",
									children: aud(unit * l.qty)
								})
							]
						}, l.lineId);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-2 text-sm",
					children: [
						plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted",
							children: [planLabel(plan), " pricing on the floor."]
						}) : null,
						creditUsed > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted",
							children: ["House credit ", aud(creditUsed)]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl text-heat tabular-nums",
							children: aud(total)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-xs leading-relaxed text-muted",
					children: "The house tab posts the order in AUD so the tools unlock immediately. A card rail can sit in front of this later."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
					className: "mt-6",
					disabled: busy,
					onClick: settle,
					children: busy ? "Settling…" : "Settle on the house tab"
				})
			] })
		]
	}) });
}
//#endregion
export { CartPage as component };
