import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as HeatButton } from "./router-Dt0_uhc_.mjs";
import { a as listFleshRewards, i as getLedger, o as redeemReward } from "./rewards-DNE05TVd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger.rewards-BHg-XTGP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShelfPage() {
	const [rewards, setRewards] = (0, import_react.useState)([]);
	const [available, setAvailable] = (0, import_react.useState)(0);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [busy, setBusy] = (0, import_react.useState)(null);
	function load() {
		listFleshRewards().then(setRewards).catch(() => setRewards([]));
		getLedger().then((d) => setAvailable(d.points.available)).catch(() => setAvailable(0));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const cats = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(rewards.map((r) => r.category)))], [rewards]);
	const shown = rewards.filter((r) => filter === "All" || r.category === filter);
	async function unlock(id) {
		setBusy(id);
		try {
			const res = await redeemReward({ data: {
				rewardId: id,
				idempotencyKey: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
			} });
			toast.success(res.message);
			load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "The shelf held the perk.");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-5 py-12 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "The shelf"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-5xl tracking-wide uppercase",
					children: "Spend it well."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Balance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl text-heat tabular-nums",
						children: available.toLocaleString("en-AU")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(c),
					className: `min-h-11 border px-4 font-display text-xs tracking-widest uppercase ${filter === c ? "border-heat bg-heat text-navy" : "border-line hover:border-heat hover:text-heat"}`,
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3",
				children: shown.map((r) => {
					const can = available >= r.points_cost && r.available;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex min-h-64 flex-col bg-void p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xs tracking-widest text-heat uppercase",
								children: r.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-display text-2xl tracking-wide uppercase",
								children: r.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 flex-1 text-sm leading-relaxed text-muted",
								children: r.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-sm tabular-nums",
									children: [r.points_cost.toLocaleString("en-AU"), " pts"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
									type: "button",
									disabled: !can || busy === r.id,
									onClick: () => unlock(r.id),
									children: !r.available ? "Gone" : !can ? "Need more" : busy === r.id ? "Unlocking…" : "Unlock"
								})]
							})
						]
					}, r.id);
				})
			})
		]
	});
}
//#endregion
export { ShelfPage as component };
