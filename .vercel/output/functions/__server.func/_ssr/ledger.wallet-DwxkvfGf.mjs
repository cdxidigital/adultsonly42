import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as HeatButton } from "./router-Dt0_uhc_.mjs";
import { i as getLedger, r as connectWallet } from "./rewards-DNE05TVd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger.wallet-DwxkvfGf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WalletPage() {
	const [wallet, setWallet] = (0, import_react.useState)(null);
	const [address, setAddress] = (0, import_react.useState)("");
	const [network, setNetwork] = (0, import_react.useState)("Base");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getLedger().then((d) => setWallet(d.wallet)).catch(() => setWallet(null));
	}, []);
	async function copy() {
		if (!wallet?.address) return;
		try {
			await navigator.clipboard.writeText(wallet.address);
			toast.success("Address copied.");
		} catch {
			toast.error("Could not copy.");
		}
	}
	async function connect(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const next = await connectWallet({ data: {
				address: address.trim(),
				network
			} });
			setWallet(next);
			toast.success("External wallet on the file.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "That address would not hold.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-5 py-12 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "The wallet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: "Keep it simple."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
				children: "An embedded house wallet is enough. Connect an external address only if you want the pass to travel with you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-px bg-line lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-navy p-8 lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-widest text-heat uppercase",
							children: "Current"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-3xl tracking-wide uppercase",
							children: wallet?.wallet_type ?? "Embedded wallet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								wallet?.provider,
								" · ",
								wallet?.network
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 break-all font-display text-xs tracking-widest text-ivory/80 uppercase",
							children: wallet?.address ?? "An address writes when the file opens."
						}),
						wallet?.address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: copy,
							className: "mt-6 font-display text-xs tracking-widest text-heat uppercase",
							children: "Copy address"
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: connect,
					className: "space-y-5 bg-void p-8 lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-widest text-heat uppercase",
							children: "External"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-wide uppercase",
							children: "Connect another"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block font-display text-xs tracking-widest uppercase",
							children: ["Address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: address,
								onChange: (e) => setAddress(e.target.value),
								placeholder: "0x…",
								className: "mt-2 block w-full border-b border-line bg-transparent py-3 font-sans text-sm tracking-normal normal-case"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block font-display text-xs tracking-widest uppercase",
							children: ["Network", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: network,
								onChange: (e) => setNetwork(e.target.value),
								className: "mt-2 block w-full border-b border-line bg-transparent py-3 font-sans text-sm tracking-normal normal-case",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Base",
										className: "bg-navy",
										children: "Base"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Ethereum",
										className: "bg-navy",
										children: "Ethereum"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Polygon",
										className: "bg-navy",
										children: "Polygon"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
							type: "submit",
							disabled: busy,
							children: busy ? "Connecting…" : "Connect wallet"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-3",
				children: [
					{
						t: "Protected",
						d: "The embedded wallet is managed by the house."
					},
					{
						t: "No homework",
						d: "You never have to pick a chain to spend points."
					},
					{
						t: "No surprise fees",
						d: "Redemptions settle on the house ledger."
					}
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg tracking-wide uppercase",
						children: x.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: x.d
					})]
				}, x.t))
			})
		]
	});
}
//#endregion
export { WalletPage as component };
