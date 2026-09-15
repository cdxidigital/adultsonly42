import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as HeatButton } from "./router-Dt0_uhc_.mjs";
import { i as getLedger, n as claimFleshPass } from "./rewards-DNE05TVd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger.index-DcSCVVl6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function pts(n) {
	return n.toLocaleString("en-AU");
}
function LedgerHome() {
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
			toast.error(err instanceof Error ? err.message : "The pass would not mint.");
		} finally {
			setBusy(false);
		}
	}
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[50vh] place-items-center text-muted",
		children: "Reading the file…"
	});
	const recent = data.activity.slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-5 py-12 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "The ledger"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase md:text-6xl",
				children: [
					"FLESH",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Points."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
				children: "Ten points per dollar on the tab. Membership, seats, rooms, and files all write here. Spend them on credit, a Member month, or the mark."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-px bg-line md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-navy p-8 md:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-widest text-heat uppercase",
							children: "Available"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-6xl tracking-wide text-heat tabular-nums md:text-7xl",
							children: pts(data.points.available)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-8 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "Pending"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-xl tabular-nums",
									children: pts(data.points.pending)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "Lifetime"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-xl tabular-nums",
									children: pts(data.points.lifetime_earned)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "Spent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-xl tabular-nums",
									children: pts(data.points.lifetime_spent)
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ledger/rewards",
							className: "mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory",
							children: "Spend points"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-void p-8 md:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-widest text-heat uppercase",
							children: "FLESH Pass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-3xl tracking-wide uppercase",
							children: data.plan ? `${data.plan} file` : "No pass yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-xs tracking-widest text-muted uppercase",
							children: data.pass?.pass_number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted",
							children: data.pass?.claimed ? "The mark is on the collection." : data.pass?.eligible ? "Eligible to claim. The mint is a house ledger — not a market." : "Hold a House Pass, then claim the mark."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: data.pass?.claimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xs tracking-widest text-heat uppercase",
								children: "Claimed"
							}) : data.pass?.eligible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
								type: "button",
								disabled: busy,
								onClick: claim,
								children: busy ? "Minting…" : "Claim pass"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pass",
								className: "font-display text-xs tracking-widest text-heat uppercase",
								children: "Take a house pass"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Collectibles"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: data.points.collectibles
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Wallet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl uppercase",
							children: data.wallet?.wallet_type ?? "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Network"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl uppercase",
							children: data.wallet?.network ?? "Base"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide uppercase",
						children: "Recent tape"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ledger/activity",
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Full tape"
					})]
				}), recent.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: recent.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapeRow, { row }, row.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Settle a tab and the first line writes itself."
				})]
			})
		]
	});
}
function TapeRow({ row }) {
	const up = row.amount > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-baseline justify-between gap-4 border-t border-line py-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: row.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs tracking-wide text-muted uppercase",
			children: row.state
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `font-display tabular-nums ${up ? "text-heat" : "text-muted"}`,
			children: [up ? "+" : "", row.amount.toLocaleString("en-AU")]
		})]
	});
}
//#endregion
export { TapeRow, LedgerHome as component };
