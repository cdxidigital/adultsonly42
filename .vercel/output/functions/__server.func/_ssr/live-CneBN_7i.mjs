import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as isUnauthorized, s as memberRate, t as aud } from "./money-CfiFmu6E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { N as listRoomDay, P as listRooms, R as useCurrentUserState, _ as HouseChrome, g as HeatButton, k as getDesk, v as PageHero, w as bookRoom } from "./router-Dt0_uhc_.mjs";
import { n as addDays, t as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-CneBN_7i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HOURS = [
	12,
	14,
	16,
	18
];
function LivePage() {
	const { user } = useCurrentUserState();
	const navigate = useNavigate();
	const [rooms, setRooms] = (0, import_react.useState)([]);
	const [roomId, setRoomId] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(() => format(addDays(/* @__PURE__ */ new Date(), 1), "yyyy-MM-dd"));
	const [startHour, setStartHour] = (0, import_react.useState)(14);
	const [hours, setHours] = (0, import_react.useState)(2);
	const [taken, setTaken] = (0, import_react.useState)([]);
	const [plan, setPlan] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const dates = (0, import_react.useMemo)(() => Array.from({ length: 10 }, (_, i) => format(addDays(/* @__PURE__ */ new Date(), i + 1), "yyyy-MM-dd")), []);
	(0, import_react.useEffect)(() => {
		listRooms().then((rows) => {
			setRooms(rows);
			setRoomId((id) => id || rows[0]?.id || "");
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		getDesk().then((d) => setPlan(d.plan)).catch(() => setPlan(null));
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (!roomId || !date) return;
		listRoomDay({ data: {
			roomId,
			date
		} }).then(setTaken).catch(() => setTaken([]));
	}, [roomId, date]);
	const room = rooms.find((r) => r.id === roomId);
	const rate = memberRate(plan);
	const clash = taken.some((b) => startHour < b.start_hour + b.hours && startHour + hours > b.start_hour);
	const total = room ? Math.round(room.hourly_cents * hours * rate) : 0;
	async function book() {
		if (!room) return;
		setBusy(true);
		try {
			const res = await bookRoom({ data: {
				roomId: room.id,
				date,
				startHour,
				hours
			} });
			toast.success(`Room held. ${aud(res.total)} settled.`);
			navigate({ to: "/desk" });
		} catch (err) {
			if (isUnauthorized(err)) {
				navigate({
					to: "/login",
					search: { redirect: "/live" }
				});
				return;
			}
			toast.error(err instanceof Error ? err.message : "The room would not hold.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Rooms",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Rooms without",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"a binary door."
		] }),
		image: "/still-live.jpg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
			children: "Studio hire for capture and directed stills — not a streaming tube. Two-hour minimum. 12:00–22:00. Signed talent only."
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-8 px-5 py-12 md:grid-cols-2 md:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: rooms.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setRoomId(r.id),
				className: `w-full border px-4 py-4 text-left ${roomId === r.id ? "border-heat" : "border-line"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl tracking-wide uppercase",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-heat tabular-nums",
						children: [aud(Math.round(r.hourly_cents * rate)), "/hr"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: r.blurb
				})]
			}, r.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-5",
			onSubmit: (e) => {
				e.preventDefault();
				book();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block font-display text-xs tracking-widest text-heat uppercase",
					children: ["Date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-2 block w-full border-b border-line bg-transparent py-3",
						value: date,
						onChange: (e) => setDate(e.target.value),
						children: dates.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d,
							className: "bg-navy",
							children: d
						}, d))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block font-display text-xs tracking-widest text-heat uppercase",
					children: ["Start", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-2 block w-full border-b border-line bg-transparent py-3",
						value: startHour,
						onChange: (e) => setStartHour(Number(e.target.value)),
						children: HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: h,
							className: "bg-navy",
							children: [String(h).padStart(2, "0"), ":00"]
						}, h))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block font-display text-xs tracking-widest text-heat uppercase",
					children: ["Hours", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-2 block w-full border-b border-line bg-transparent py-3",
						value: hours,
						onChange: (e) => setHours(Number(e.target.value)),
						children: [
							2,
							3,
							4
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: h,
							className: "bg-navy",
							children: h
						}, h))
					})]
				}),
				clash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-heat",
					children: "That block is taken."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-heat tabular-nums",
					children: aud(total)
				}),
				plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [plan, " pricing applied."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Sign in for member rates. House tab settles in AUD."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
					type: "submit",
					disabled: busy || clash || !room,
					children: busy ? "Holding…" : "Settle the block"
				})
			]
		})]
	})] });
}
//#endregion
export { LivePage as component };
