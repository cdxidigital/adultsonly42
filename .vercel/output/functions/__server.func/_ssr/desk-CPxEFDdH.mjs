import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud, u as planLabel } from "./money-CfiFmu6E.mjs";
import { R as useCurrentUserState, _ as HouseChrome, k as getDesk, y as SignInHere } from "./router-Dt0_uhc_.mjs";
import { i as getLedger } from "./rewards-DNE05TVd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-CPxEFDdH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeskPage() {
	const { user, isPending } = useCurrentUserState();
	const [desk, setDesk] = (0, import_react.useState)(null);
	const [points, setPoints] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		getDesk().then(setDesk).catch(() => setDesk(null));
		getLedger().then((d) => setPoints(d.points.available)).catch(() => setPoints(0));
	}, [isPending, user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the desk…"
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInHere, { next: "/desk" });
	const spend = desk?.orders.reduce((n, o) => n + o.total_cents, 0) ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-5 pt-28 pb-20 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "The desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: user.displayName ?? "Member"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Pass"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl uppercase",
							children: planLabel(desk?.plan)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "House credit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl text-heat tabular-nums",
							children: aud(desk?.credits ?? 0)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "FLESH Points"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl text-heat tabular-nums",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ledger",
								children: points.toLocaleString("en-AU")
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Lifetime on the tab"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl tabular-nums",
							children: aud(spend)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "File"
				}), desk?.profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm",
					children: [
						desk.profile.display_name,
						" · ",
						desk.profile.profile_type,
						" · ",
						desk.profile.status.replaceAll("_", " "),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							className: "text-heat",
							children: "Update"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No talent file.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							className: "text-heat",
							children: "Open one"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Seats"
				}), desk?.enrollments.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.enrollments.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-t border-line py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/academy/$slug",
							params: { slug: e.slug },
							className: "hover:text-heat",
							children: e.title
						})
					}, e.product_id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No seats yet.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/academy",
							className: "text-heat",
							children: "Academy"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Rooms"
				}), desk?.bookings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.bookings.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap justify-between gap-3 border-t border-line py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							b.name,
							" · ",
							b.date,
							" · ",
							String(b.start_hour).padStart(2, "0"),
							":00 · ",
							b.hours,
							"h"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-heat tabular-nums",
							children: aud(b.total_cents)
						})]
					}, b.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No blocks held.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/live",
							className: "text-heat",
							children: "Book a room"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Briefs"
				}), desk?.briefs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.briefs.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase tracking-wide text-heat",
								children: b.kind
							}),
							" · ",
							b.status,
							b.deposit_cents ? ` · ${aud(b.deposit_cents)}` : "",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted",
								children: b.details.slice(0, 140)
							})
						]
					}, b.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No briefs.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/apply",
							className: "text-heat",
							children: "Open one"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "OS"
				}), desk?.os ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm",
					children: [
						"Plan ",
						desk.os.plan,
						desk.os.handle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/os/desk",
							className: "text-heat",
							children: "Open desk"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/os/desk",
							className: "text-heat",
							children: "Open desk"
						})] })
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No OS yet.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/os",
							className: "text-heat",
							children: "Creator OS"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Jobs"
				}), desk?.jobs?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase tracking-wide text-heat",
								children: j.kind
							}),
							" · ",
							j.title,
							" · ",
							j.status
						]
					}, j.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No studio jobs.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/services",
							className: "text-heat",
							children: "Services"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Lookbooks"
				}), desk?.licenses?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.licenses.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line py-3 text-sm",
						children: [
							l.title,
							" · ",
							l.kind,
							" · ",
							l.status
						]
					}, l.title))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No leases.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lookbook",
							className: "text-heat",
							children: "Lookbook"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Nights"
				}), desk?.rsvps?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.rsvps.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between border-t border-line py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							r.title,
							" · ",
							r.date,
							" · ×",
							r.qty
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-heat tabular-nums",
							children: aud(r.total_cents)
						})]
					}, r.title))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No tickets.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/nights",
							className: "text-heat",
							children: "Nights"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Badges"
				}), desk?.badges?.some((b) => b.passed) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.badges.filter((b) => b.passed).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line py-3 text-sm",
						children: [
							"House craft · ",
							b.score,
							"%"
						]
					}, b.exam_id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No certificates.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/academy/exam",
							className: "text-heat",
							children: "Sit the exam"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Dossiers"
				}), desk?.dossiers?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.dossiers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/atlas/dossier",
							search: {
								q: d.query,
								qid: "",
								id: ""
							},
							className: "hover:text-heat",
							children: d.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", d.created_at.slice(0, 10)]
						})]
					}, d.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"No names filed.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/atlas/dossier",
							search: {
								q: "",
								qid: "",
								id: ""
							},
							className: "text-heat",
							children: "Compile a dossier"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide uppercase",
					children: "Orders"
				}), desk?.orders.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4",
					children: desk.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between border-t border-line py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["#", o.id] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-heat",
							children: aud(o.total_cents)
						})]
					}, o.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "The ledger is quiet."
				})]
			})
		]
	}) });
}
//#endregion
export { DeskPage as component };
