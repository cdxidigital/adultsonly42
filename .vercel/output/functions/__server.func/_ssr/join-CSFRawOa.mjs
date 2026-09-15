import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { o as isUnauthorized } from "./money-CfiFmu6E.mjs";
import { F as object, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-DaLAjX5Q.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { f as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { R as useCurrentUserState, _ as HouseChrome, b as BrandLogo, g as HeatButton, h as GhostButton, x as cn } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-CSFRawOa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fileInput = object({
	displayName: string().min(2).max(80),
	location: string().min(2).max(80),
	role: string().max(80),
	intent: array(string().max(40)).max(8),
	energy: string().max(80),
	profileType: string().min(2).max(40),
	focus: array(string().max(40)).max(8),
	height: string().max(24),
	chest: string().max(24),
	waist: string().max(24),
	hips: string().max(24),
	shoe: string().max(24),
	availability: string().max(240),
	visibility: string().min(2).max(80),
	portrait: string().max(9e5),
	lookbook: array(string().max(9e5)).max(4)
});
var getJoinFile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1c8a3c38ba6ae9008d53f0d7c164a82863d842bf9380e0242c1d787bc00ad339"));
var submitJoin = createServerFn({ method: "POST" }).validator((input) => fileInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("c24611699872d78a3a12f53e339463e18258b63d4d43472c706b30c442c9d8c2"));
var DRAFT_KEY = "fleshsesh-join-draft";
var INTERESTS = [
	"Model & talent",
	"Creative direction",
	"Image making",
	"Design & culture",
	"Production",
	"Brand partnerships"
];
var ENERGY = [
	{
		label: "Quiet confidence",
		note: "Precise. Observant. Intentional."
	},
	{
		label: "In motion",
		note: "Curious. Social. Open to the next room."
	},
	{
		label: "Making noise",
		note: "Expressive. Unexpected. Unafraid of scale."
	}
];
var TYPES = [
	{
		label: "Model",
		note: "Editorial, campaign, stills."
	},
	{
		label: "Creator",
		note: "Image, story, a practice."
	},
	{
		label: "Talent",
		note: "Presence, hosting, specialist work."
	},
	{
		label: "Industry partner",
		note: "Casting, brand, production."
	}
];
var FOCUS = [
	"Campaign",
	"Editorial",
	"Beauty",
	"Performance",
	"Objects",
	"Creative collaboration"
];
var VISIBILITY = [
	{
		label: "Curated introductions",
		note: "Visible when a relevant brief is in play."
	},
	{
		label: "Look-book ready",
		note: "Approved partners may review in confidence."
	},
	{
		label: "Keep private",
		note: "On the desk. Not shared onward."
	}
];
var empty = {
	step: 0,
	name: "",
	location: "Perth, WA",
	role: "",
	intent: [],
	energy: "",
	profileType: "",
	focus: [],
	height: "",
	chest: "",
	waist: "",
	hips: "",
	shoe: "",
	availability: "",
	visibility: "",
	portrait: "",
	lookbook: []
};
var STEPS = [
	"Door",
	"Name",
	"Practice",
	"Interests",
	"Energy",
	"File",
	"Selects",
	"Visibility"
];
function readDraft() {
	try {
		const raw = localStorage.getItem(DRAFT_KEY);
		if (!raw) return empty;
		return {
			...empty,
			...JSON.parse(raw)
		};
	} catch {
		return empty;
	}
}
function writeDraft(d) {
	try {
		localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
	} catch {}
}
function downscale(file, max = 720) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read the file."));
		reader.onload = () => {
			const img = new Image();
			img.onload = () => {
				const scale = Math.min(1, max / Math.max(img.width, img.height));
				const canvas = document.createElement("canvas");
				canvas.width = Math.round(img.width * scale);
				canvas.height = Math.round(img.height * scale);
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					reject(/* @__PURE__ */ new Error("Could not process the still."));
					return;
				}
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				resolve(canvas.toDataURL("image/jpeg", .72));
			};
			img.onerror = () => reject(/* @__PURE__ */ new Error("That still would not open."));
			img.src = String(reader.result);
		};
		reader.readAsDataURL(file);
	});
}
function JoinPage() {
	const { user } = useCurrentUserState();
	const navigate = useNavigate();
	const [d, setD] = (0, import_react.useState)(empty);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [filed, setFiled] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const local = readDraft();
		setD(local);
		setReady(true);
		if (!user) return;
		getJoinFile().then((s) => {
			if (s.file) {
				setFiled(true);
				setD((cur) => ({
					...cur,
					name: s.file.display_name,
					location: s.file.location,
					role: s.file.role,
					intent: s.file.intent,
					energy: s.file.energy,
					profileType: s.file.profile_type,
					focus: s.file.focus,
					height: s.file.height,
					chest: s.file.chest,
					waist: s.file.waist,
					hips: s.file.hips,
					shoe: s.file.shoe,
					availability: s.file.availability,
					visibility: s.file.visibility,
					portrait: s.file.portrait,
					lookbook: s.file.lookbook,
					step: STEPS.length - 1
				}));
			}
		}).catch(() => void 0);
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (ready) writeDraft(d);
	}, [d, ready]);
	const percent = (0, import_react.useMemo)(() => (d.step + 1) / STEPS.length * 100, [d.step]);
	function patch(p) {
		setD((cur) => ({
			...cur,
			...p
		}));
		setErr("");
	}
	function next() {
		if (d.step === 1 && d.name.trim().length < 2) {
			setErr("A name on the file.");
			return;
		}
		if (d.step === 2 && !d.profileType) {
			setErr("Choose a practice.");
			return;
		}
		if (d.step === 3 && d.intent.length === 0) {
			setErr("Pick at least one interest.");
			return;
		}
		if (d.step === 4 && !d.energy) {
			setErr("Choose an energy.");
			return;
		}
		if (d.step === 7 && !d.visibility) {
			setErr("Choose how the file travels.");
			return;
		}
		patch({ step: Math.min(STEPS.length - 1, d.step + 1) });
	}
	async function onFile(e, slot) {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		if (![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(file.type)) {
			setErr("JPEG, PNG or WebP.");
			return;
		}
		try {
			const data = await downscale(file);
			if (slot === "portrait") patch({ portrait: data });
			else if (d.lookbook.length >= 4) setErr("Four selects is the file.");
			else patch({ lookbook: [...d.lookbook, data] });
		} catch (ex) {
			setErr(ex instanceof Error ? ex.message : "The still would not take.");
		}
	}
	async function submit() {
		if (!d.visibility || d.name.trim().length < 2 || !d.profileType) {
			setErr("Finish the file first.");
			return;
		}
		setBusy(true);
		try {
			await submitJoin({ data: {
				displayName: d.name.trim(),
				location: d.location.trim() || "Perth, WA",
				role: d.role.trim(),
				intent: d.intent,
				energy: d.energy,
				profileType: d.profileType,
				focus: d.focus,
				height: d.height,
				chest: d.chest,
				waist: d.waist,
				hips: d.hips,
				shoe: d.shoe,
				availability: d.availability,
				visibility: d.visibility,
				portrait: d.portrait,
				lookbook: d.lookbook
			} });
			localStorage.removeItem(DRAFT_KEY);
			setFiled(true);
			toast.success("The desk has the file.");
			navigate({ to: "/desk" });
		} catch (ex) {
			if (isUnauthorized(ex)) {
				navigate({
					to: "/login",
					search: { redirect: "/join" }
				});
				return;
			}
			toast.error(ex instanceof Error ? ex.message : "The desk could not take the file.");
		} finally {
			setBusy(false);
		}
	}
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the file…"
	}) });
	if (filed && d.step === STEPS.length - 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-5 py-28 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
				variant: "lockup",
				className: "mb-8 h-32 w-auto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "On the desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: "File received."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
				children: [
					d.name,
					". ",
					d.profileType,
					". ",
					d.visibility,
					". The house reads it before anyone else does."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desk",
				className: "mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase",
				children: "Open the desk"
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-dvh px-5 pt-24 pb-20 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/still-lips.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover opacity-25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-b from-navy/80 via-void/85 to-void" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[11rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden lg:block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-7xl tracking-wide text-heat tabular-nums",
							children: String(d.step + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 h-40 w-px bg-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-px bg-heat",
								style: { height: `${percent}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-display text-xs tracking-widest text-muted uppercase",
							children: STEPS[d.step]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-navy/80 p-6 backdrop-blur-sm md:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
								variant: "lockup",
								className: "h-14 w-auto md:h-16"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-xs tracking-widest text-muted uppercase",
								children: [
									d.step + 1,
									" / ",
									STEPS.length
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-8 h-px bg-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-px bg-heat transition-[width] duration-200",
								style: { width: `${percent}%` }
							})
						}),
						d.step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepFrame, {
							kicker: "The file",
							title: "A profile with a point of view.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-md text-sm leading-relaxed text-muted",
								children: "Nine quiet questions. Adults only. The house reads it before a brand does. You can leave and come back — the draft sits on this device until you sign it in."
							})
						}) : null,
						d.step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepFrame, {
							kicker: "Introduction",
							title: "What does the file call you?",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: d.name,
									onChange: (e) => patch({ name: e.target.value }),
									className: "h-12 w-full border border-line bg-void px-3 text-sm focus:border-heat focus:outline-none",
									placeholder: "Chosen name"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "City",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: d.location,
									onChange: (e) => patch({ location: e.target.value }),
									className: "h-12 w-full border border-line bg-void px-3 text-sm focus:border-heat focus:outline-none",
									placeholder: "Perth, WA"
								})
							})]
						}) : null,
						d.step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepFrame, {
							kicker: "Practice",
							title: "How do you work?",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: d.profileType === t.label,
									label: t.label,
									note: t.note,
									onClick: () => patch({
										profileType: t.label,
										role: t.label
									})
								}, t.label))
							})
						}) : null,
						d.step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepFrame, {
							kicker: "Interests",
							title: "What do you want in the room?",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: INTERESTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: d.intent.includes(item),
									label: item,
									onClick: () => patch({ intent: d.intent.includes(item) ? d.intent.filter((v) => v !== item) : [...d.intent, item] })
								}, item))
							})
						}) : null,
						d.step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepFrame, {
							kicker: "Energy",
							title: "How do you enter?",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2",
								children: ENERGY.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: d.energy === t.label,
									label: t.label,
									note: t.note,
									onClick: () => patch({ energy: t.label })
								}, t.label))
							})
						}) : null,
						d.step === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepFrame, {
							kicker: "The file",
							title: "Measurements are optional. Focus is not.",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [
										[
											"height",
											"Height",
											d.height
										],
										[
											"chest",
											"Chest / bust",
											d.chest
										],
										[
											"waist",
											"Waist",
											d.waist
										],
										[
											"hips",
											"Hips",
											d.hips
										],
										[
											"shoe",
											"Shoe",
											d.shoe
										]
									].map(([key, label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value,
											onChange: (e) => patch({ [key]: e.target.value }),
											className: "h-12 w-full border border-line bg-void px-3 text-sm focus:border-heat focus:outline-none"
										})
									}, key))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 font-display text-[11px] tracking-widest text-heat uppercase",
									children: "Focus"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 grid gap-2 sm:grid-cols-2",
									children: FOCUS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
										active: d.focus.includes(item),
										label: item,
										onClick: () => patch({ focus: d.focus.includes(item) ? d.focus.filter((v) => v !== item) : [...d.focus, item] })
									}, item))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Availability",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: d.availability,
										onChange: (e) => patch({ availability: e.target.value }),
										rows: 3,
										className: "mt-0 w-full border border-line bg-void px-3 py-3 text-sm focus:border-heat focus:outline-none",
										placeholder: "Dates, cities, what you will not do."
									})
								})
							]
						}) : null,
						d.step === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepFrame, {
							kicker: "Selects",
							title: "A first impression. Skip if you want.",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "JPEG, PNG or WebP. The house stores a compact still, not a tube."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-40 cursor-pointer flex-col items-center justify-center border border-dashed border-line hover:border-heat",
									children: [d.portrait ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: d.portrait,
										alt: "",
										className: "size-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xs tracking-widest uppercase",
										children: "Portrait"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/jpeg,image/png,image/webp",
										className: "hidden",
										onChange: (e) => onFile(e, "portrait")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [d.lookbook.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "relative aspect-square overflow-hidden border border-line",
										onClick: () => patch({ lookbook: d.lookbook.filter((_, j) => j !== i) }),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src,
											alt: "",
											className: "size-full object-cover"
										})
									}, i)), d.lookbook.length < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex aspect-square cursor-pointer items-center justify-center border border-dashed border-line text-xs uppercase tracking-widest hover:border-heat",
										children: ["Add", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/jpeg,image/png,image/webp",
											className: "hidden",
											onChange: (e) => onFile(e, "lookbook")
										})]
									}) : null]
								})]
							})]
						}) : null,
						d.step === 7 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepFrame, {
							kicker: "Visibility",
							title: "Who may see this file?",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2",
								children: VISIBILITY.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: d.visibility === t.label,
									label: t.label,
									note: t.note,
									onClick: () => patch({ visibility: t.label })
								}, t.label))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm text-muted",
								children: user ? "Settling puts the file on the desk." : "Sign in to put the file on the desk. The draft stays on this device."
							})]
						}) : null,
						err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-heat",
							children: err
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap gap-3",
							children: [d.step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
								type: "button",
								onClick: () => patch({ step: d.step - 1 }),
								children: "Back"
							}) : null, d.step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
								type: "button",
								onClick: next,
								children: "Continue"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
								type: "button",
								disabled: busy,
								onClick: submit,
								children: busy ? "Filing…" : user ? "File with the house" : "Sign in and file"
							})]
						})
					]
				})]
			})
		]
	}) });
}
function StepFrame({ kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs tracking-widest text-heat uppercase",
			children: kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl tracking-wide uppercase md:text-5xl",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-4",
			children
		})
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[11px] tracking-widest text-heat uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		})]
	});
}
function Choice({ active, label, note, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: cn("flex min-h-14 items-start gap-3 border px-4 py-3 text-left", active ? "border-heat" : "border-line hover:border-heat"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("mt-0.5 grid size-4 place-items-center border", active ? "border-heat bg-heat text-navy" : "border-line"),
			children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3",
				strokeWidth: 3
			}) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-display text-sm tracking-wide uppercase",
			children: label
		}), note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
			className: "mt-1 block text-xs text-muted",
			children: note
		}) : null] })]
	});
}
//#endregion
export { JoinPage as component };
