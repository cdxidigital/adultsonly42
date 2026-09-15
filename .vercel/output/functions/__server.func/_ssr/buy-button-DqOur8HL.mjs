import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stashAdd } from "./pending-DwzrSU6r.mjs";
import { o as isUnauthorized } from "./money-CfiFmu6E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as addToCart, g as HeatButton } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buy-button-DqOur8HL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BuyButton({ productId, label = "Add to tab", spec = "", disabled = false }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	async function buy() {
		setBusy(true);
		try {
			await addToCart({ data: {
				productId,
				qty: 1,
				spec
			} });
			toast.success("On the tab.");
			navigate({ to: "/cart" });
		} catch (err) {
			if (isUnauthorized(err)) {
				stashAdd(productId, spec);
				navigate({
					to: "/login",
					search: { redirect: "/cart" }
				});
				return;
			}
			toast.error(err instanceof Error ? err.message : "The desk could not take that.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
		type: "button",
		disabled: busy || disabled,
		onClick: buy,
		children: busy ? "Holding…" : label
	});
}
//#endregion
export { BuyButton as t };
