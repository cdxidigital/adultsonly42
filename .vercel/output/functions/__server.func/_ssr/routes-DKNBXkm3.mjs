import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { M as listProducts, _ as HouseChrome, b as BrandLogo } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DKNBXkm3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MARQUEE = [
	"PASS",
	"ATELIER",
	"ACADEMY",
	"TALENT",
	"OS",
	"ATLAS",
	"NIGHTS",
	"LEDGER",
	"PERTH",
	"GENDER-FLUID"
];
function Home() {
	const [drop, setDrop] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listProducts({ data: "atelier" }).then((rows) => setDrop(rows.slice(0, 3))).catch(() => setDrop([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative flex min-h-dvh items-end justify-center px-5 pb-16 pt-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/still-lips.jpg",
					alt: "",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-void via-void/40 to-navy/50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 font-display text-xs tracking-widest text-heat uppercase",
							children: "Gender-fluid adult house · Perth"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
							variant: "lockup",
							className: "h-36 w-auto md:h-52"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-sm leading-relaxed text-ivory/80",
							children: "Membership, objects, seats, talent, tools, and an industry index — a ledger, not a landing page."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pass",
								className: "inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory",
								children: "Take a pass"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/atelier",
								className: "inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat",
								children: "This drop"
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden border-y border-line bg-navy py-3",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "marquee-track flex w-max gap-9 font-display text-xs tracking-widest text-heat uppercase",
				children: [
					...MARQUEE,
					...MARQUEE,
					...MARQUEE,
					...MARQUEE
				].map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-9",
					children: [w, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-1.5 rounded-full bg-ivory/30" })]
				}, i))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/hero-corridor.jpg",
				alt: "",
				className: "h-80 w-full object-cover md:h-auto"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center bg-navy px-5 py-16 md:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "The identity"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 font-display text-4xl tracking-wide uppercase md:text-6xl",
						children: [
							"Not a side.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"The house."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-sm leading-relaxed text-muted",
						children: "Gender-fluid by design. The mark does not pick a gender and neither does the roster, the rooms, or the tab. Four desks take money. One ledger holds it."
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid sm:grid-cols-2 lg:grid-cols-4",
			children: [
				{
					n: "01",
					to: "/talent",
					t: "Talent",
					d: "Day rates. Campaign deposits. Signed bodies only."
				},
				{
					n: "02",
					to: "/os",
					t: "OS",
					d: "Storefront, calendar, leak watch, BAS pack."
				},
				{
					n: "03",
					to: "/atlas",
					t: "Atlas",
					d: "The trade, indexed. Compile a dossier from live identifiers."
				},
				{
					n: "04",
					to: "/academy",
					t: "Academy",
					d: "Paid seats. Identity, consent, house craft."
				},
				{
					n: "05",
					to: "/nights",
					t: "Nights",
					d: "Perth doors. Tickets and featured slots."
				},
				{
					n: "06",
					to: "/lookbook",
					t: "Lookbook",
					d: "Permissioned editorial likeness. A lease."
				},
				{
					n: "07",
					to: "/services",
					t: "Services",
					d: "Launch kits, capture days, takedowns."
				},
				{
					n: "08",
					to: "/ledger",
					t: "Ledger",
					d: "FLESH Points. Rewards. A pass you can claim."
				}
			].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: h.to,
				className: "border-t border-line px-5 py-12 transition-colors hover:bg-navy md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: h.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 font-display text-3xl tracking-wide uppercase",
						children: h.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xs text-sm leading-relaxed text-muted",
						children: h.d
					})
				]
			}, h.n))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 py-16 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Atelier"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl tracking-wide uppercase",
					children: "This drop"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/atelier",
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Full floor"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-3",
				children: drop.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/atelier/$slug",
					params: { slug: p.slug },
					className: "group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-portrait overflow-hidden bg-navy",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.image,
							alt: "",
							className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm tracking-wide uppercase",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm text-heat tabular-nums",
							children: aud(p.price_cents)
						})]
					})]
				}, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid place-items-center px-5 py-24 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "The door is open"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 font-display text-5xl tracking-wide uppercase md:text-7xl",
					children: [
						"Come in",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"as you are."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pass",
						className: "inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory",
						children: "House pass"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/join",
						className: "inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat",
						children: "Open a file"
					})]
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
