import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as HeatButton } from "./router-Dt0_uhc_.mjs";
import { i as getLedger, n as claimFleshPass } from "./rewards-DNE05TVd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger.collection-bRx8-FIp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PERKS = [
	"Member pricing on the atelier and academy",
	"FLESH Points on every settle",
	"Priority on live blocks",
	"The mark as a house file, not a market token"
];
function CollectionPage() {
	const [data, setData] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	function load() {
		getLedger().then(setData).catch(() => setData(null));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function claim() {
		setBusy(true);
		try {
			const res = await claimFleshPass({ data: { idempotencyKey: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` } });
			toast.success(res.message);
			load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "The mark would not mint.");
		} finally {
			setBusy(false);
		}
	}
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[50vh] place-items-center text-muted",
		children: "Opening the collection…"
	});
	const pass = data.pass;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-5 py-12 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "The collection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: "Keep what is yours."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-px bg-line lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-80 overflow-hidden bg-navy p-8 lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo.png",
							alt: "",
							className: "pointer-events-none absolute top-8 right-8 w-28 opacity-80"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-widest text-heat uppercase",
							children: "FLESH Pass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 font-display text-4xl tracking-wide uppercase",
							children: data.plan ? `${data.plan} mark` : "Unclaimed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 font-display text-xl tracking-widest uppercase",
							children: pass?.pass_number
						}),
						pass?.token_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted",
							children: ["Token ", pass.token_id]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: pass?.claimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xs tracking-widest text-heat uppercase",
								children: "On the file"
							}) : pass?.eligible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
								type: "button",
								disabled: busy,
								onClick: claim,
								children: busy ? "Minting…" : "Claim your pass"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pass",
								className: "font-display text-xs tracking-widest text-heat uppercase",
								children: "Take a house pass first"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-void p-8 lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-widest text-heat uppercase",
							children: "What the pass unlocks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6",
							children: PERKS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-t border-line py-4 text-sm",
								children: p
							}, p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-xs leading-relaxed text-muted",
							children: "The mint is a house ledger on a mock chain. You do not need to manage a token to use the benefits. Nothing here is for sale as a speculative asset."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 border border-dashed border-line p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Coming"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl tracking-wide uppercase",
						children: "Collectibles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-md text-sm leading-relaxed text-muted",
						children: [
							"Limited house objects will land here. You hold ",
							data.points.collectibles,
							" so far."
						]
					})
				]
			})
		]
	});
}
//#endregion
export { CollectionPage as component };
