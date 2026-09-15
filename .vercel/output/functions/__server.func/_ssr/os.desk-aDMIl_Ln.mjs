import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as osRank } from "./money-CfiFmu6E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { R as useCurrentUserState, _ as HouseChrome, g as HeatButton, h as GhostButton, x as cn, y as SignInHere } from "./router-Dt0_uhc_.mjs";
import { _ as saveStorefront, a as getCreatorOs, g as queuePost, l as getTaxPack, m as markPost, v as setLeakMonitor } from "./ops-DKG_NDpI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/os.desk-aDMIl_Ln.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"overview",
	"storefront",
	"schedule",
	"monitor",
	"tax"
];
function OsDesk() {
	const { user, isPending } = useCurrentUserState();
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [os, setOs] = (0, import_react.useState)(null);
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	async function load() {
		const d = await getCreatorOs();
		setOs(d.os);
		setPosts(d.posts);
		setReady(true);
	}
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		load().catch(() => setReady(true));
	}, [isPending, user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening OS…"
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInHere, { next: "/os/desk" });
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening OS…"
	}) });
	if (!os) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-5 pt-28 pb-20 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "Creator OS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: "No desk yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm text-muted",
				children: "Take Lite, Pro, or Studio. The tools unlock on settle."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/os",
				className: "mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase",
				children: "See plans"
			})
		]
	}) });
	const rank = osRank(os.plan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-5 pt-28 pb-20 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: ["Creator OS · ", os.plan]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: os.display_name || "Your desk"
			}),
			os.handle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/os/$handle",
				params: { handle: os.handle },
				className: "mt-2 inline-block text-sm text-heat",
				children: ["fleshsesh.com/os/", os.handle]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-10 flex flex-wrap gap-4 border-b border-line pb-3 font-display text-xs tracking-widest uppercase",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t),
					className: cn("text-muted hover:text-heat", tab === t && "text-heat"),
					children: t
				}, t))
			}),
			tab === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Views",
						value: os.views.toLocaleString("en-AU")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Link taps",
						value: os.clicks.toLocaleString("en-AU")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Queued posts",
						value: String(posts.filter((p) => p.status === "queued").length)
					})
				]
			}) : null,
			tab === "storefront" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StorefrontForm, {
				os,
				onSaved: load
			}) : null,
			tab === "schedule" ? rank < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locked, { need: "Pro" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Schedule, {
				posts,
				onChange: load
			}) : null,
			tab === "monitor" ? rank < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locked, { need: "Pro" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
				on: os.leak_monitor,
				onChange: load
			}) : null,
			tab === "tax" ? rank < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locked, { need: "Studio" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxPack, {}) : null
		]
	}) });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-line pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-3xl text-heat tabular-nums",
			children: value
		})]
	});
}
function Locked({ need }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-10 max-w-md text-sm text-muted",
		children: [
			"This sits on ",
			need,
			".",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/os",
				className: "text-heat",
				children: "Upgrade the desk"
			})
		]
	});
}
function StorefrontForm({ os, onSaved }) {
	const [displayName, setDisplayName] = (0, import_react.useState)(os.display_name);
	const [handle, setHandle] = (0, import_react.useState)(os.handle);
	const [bio, setBio] = (0, import_react.useState)(os.bio);
	const [links, setLinks] = (0, import_react.useState)(os.links.length ? os.links : [{
		label: "X",
		href: ""
	}, {
		label: "Site",
		href: ""
	}]);
	const [menu, setMenu] = (0, import_react.useState)(os.menu.length ? os.menu : [{
		title: "Day rate",
		price: ""
	}, {
		title: "Campaign stills",
		price: ""
	}]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const res = await saveStorefront({ data: {
				displayName,
				handle,
				bio,
				links: links.filter((l) => l.label.trim()),
				menu: menu.filter((m) => m.title.trim())
			} });
			toast.success(`Storefront live at /os/${res.handle}`);
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: save,
		className: "mt-10 max-w-xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Display name",
				value: displayName,
				onChange: setDisplayName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Handle",
				value: handle,
				onChange: setHandle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block font-display text-xs tracking-widest text-heat uppercase",
				children: ["Bio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "mt-2 block min-h-24 w-full border-b border-line bg-transparent py-3",
					value: bio,
					onChange: (e) => setBio(e.target.value),
					maxLength: 400
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "Links"
			}),
			links.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "border-b border-line bg-transparent py-3",
					value: l.label,
					placeholder: "Label",
					onChange: (e) => setLinks(links.map((x, n) => n === i ? {
						...x,
						label: e.target.value
					} : x))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "border-b border-line bg-transparent py-3",
					value: l.href,
					placeholder: "https://",
					onChange: (e) => setLinks(links.map((x, n) => n === i ? {
						...x,
						href: e.target.value
					} : x))
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "Menu"
			}),
			menu.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "border-b border-line bg-transparent py-3",
					value: m.title,
					placeholder: "Offering",
					onChange: (e) => setMenu(menu.map((x, n) => n === i ? {
						...x,
						title: e.target.value
					} : x))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "border-b border-line bg-transparent py-3",
					value: m.price,
					placeholder: "AUD",
					onChange: (e) => setMenu(menu.map((x, n) => n === i ? {
						...x,
						price: e.target.value
					} : x))
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
				type: "submit",
				disabled: busy,
				children: busy ? "Saving…" : "Publish storefront"
			})
		]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block font-display text-xs tracking-widest text-heat uppercase",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "mt-2 block w-full border-b border-line bg-transparent py-3",
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function Schedule({ posts, onChange }) {
	const [platform, setPlatform] = (0, import_react.useState)("x");
	const [body, setBody] = (0, import_react.useState)("");
	const [when, setWhen] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function add(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await queuePost({ data: {
				platform,
				body,
				scheduledFor: when
			} });
			toast.success("Queued.");
			setBody("");
			await onChange();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not queue.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: add,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block font-display text-xs tracking-widest text-heat uppercase",
					children: ["Platform", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-2 block w-full border-b border-line bg-transparent py-3",
						value: platform,
						onChange: (e) => setPlatform(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "x",
								className: "bg-navy",
								children: "X"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "reddit",
								className: "bg-navy",
								children: "Reddit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "telegram",
								className: "bg-navy",
								children: "Telegram"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "site",
								className: "bg-navy",
								children: "Site"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block font-display text-xs tracking-widest text-heat uppercase",
					children: ["When", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "datetime-local",
						className: "mt-2 block w-full border-b border-line bg-transparent py-3",
						value: when,
						onChange: (e) => setWhen(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block font-display text-xs tracking-widest text-heat uppercase",
					children: ["Copy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "mt-2 block min-h-24 w-full border-b border-line bg-transparent py-3",
						value: body,
						onChange: (e) => setBody(e.target.value),
						required: true,
						minLength: 4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
					type: "submit",
					disabled: busy,
					children: busy ? "Queuing…" : "Queue post"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-10",
			children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-3 border-t border-line py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-heat uppercase",
						children: p.platform
					}),
					" · ",
					p.scheduled_for,
					" · ",
					p.status,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: p.body
					})
				] }), p.status === "queued" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: () => markPost({ data: p.id }).then(() => onChange()).catch(() => toast.error("Could not mark sent.")),
					children: "Mark sent"
				}) : null]
			}, p.id))
		})]
	});
}
function Monitor({ on, onChange }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function toggle() {
		setBusy(true);
		try {
			await setLeakMonitor({ data: !on });
			await onChange();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not toggle.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "A watermark watch on files you publish from this desk. The house flags matches; it does not scrape a public face that is not yours."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-display text-2xl uppercase",
				children: on ? "Watch on" : "Watch off"
			}),
			on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Last scan: no matches this week. Watermark active."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
				className: "mt-6",
				disabled: busy,
				onClick: toggle,
				children: on ? "Pause watch" : "Arm watch"
			})
		]
	});
}
function TaxPack() {
	const [csv, setCsv] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getTaxPack().then((d) => {
			const header = "Date,Order,Item,AUD,GST";
			const rows = d.lines.map((l) => `${l.date},${l.order},"${l.item.replaceAll("\"", "\"\"")}",${l.aud.toFixed(2)},${l.gst.toFixed(2)}`);
			setCsv([header, ...rows].join("\n"));
		}).catch(() => setCsv(null));
	}, []);
	if (!csv) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-10 text-sm text-muted",
		children: "Building the pack…"
	});
	const href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "AU BAS-shaped export from the house tab. Date, order, item, AUD, GST (1/11). Not advice — a file your bookkeeper can read."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				download: "fleshsesh-bas.csv",
				className: "mt-6 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase",
				children: "Download CSV"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-6 max-h-64 overflow-auto border border-line p-4 text-xs text-muted",
				children: csv
			})
		]
	});
}
//#endregion
export { OsDesk as component };
