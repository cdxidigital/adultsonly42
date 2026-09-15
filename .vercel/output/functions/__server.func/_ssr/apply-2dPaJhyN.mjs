import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as stashBrief, s as takeBrief } from "./pending-DwzrSU6r.mjs";
import { o as isUnauthorized, t as aud } from "./money-CfiFmu6E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as submitBrief, R as useCurrentUserState, _ as HouseChrome, g as HeatButton, m as Route$42, v as PageHero } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/apply-2dPaJhyN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApplyPage() {
	const { talent } = Route$42.useSearch();
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [kind, setKind] = (0, import_react.useState)(talent ? "campaign" : "talent");
	const [company, setCompany] = (0, import_react.useState)("");
	const [contactName, setContactName] = (0, import_react.useState)("");
	const [details, setDetails] = (0, import_react.useState)("");
	const [payFee, setPayFee] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const fee = kind === "talent" ? 4e3 : 5e4;
	(0, import_react.useEffect)(() => {
		const draft = takeBrief();
		if (!draft) return;
		setKind(draft.kind);
		setCompany(draft.company);
		setContactName(draft.contactName);
		setDetails(draft.details);
		setPayFee(draft.payFee);
	}, []);
	function draft() {
		return {
			kind,
			talentId: talent,
			company,
			contactName,
			details,
			payFee
		};
	}
	async function send(e) {
		e.preventDefault();
		if (!user) {
			stashBrief(draft());
			navigate({
				to: "/login",
				search: { redirect: talent ? `/apply?talent=${talent}` : "/apply" }
			});
			return;
		}
		setBusy(true);
		try {
			const res = await submitBrief({ data: {
				kind,
				talentId: talent,
				company,
				contactName,
				details,
				payFee
			} });
			toast.success(res.deposit ? `File received. ${aud(res.deposit)} posted.` : "File received.");
			navigate({ to: "/desk" });
		} catch (err) {
			if (isUnauthorized(err)) {
				stashBrief(draft());
				navigate({
					to: "/login",
					search: { redirect: talent ? `/apply?talent=${talent}` : "/apply" }
				});
				return;
			}
			toast.error(err instanceof Error ? err.message : "The desk could not take the file.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HouseChrome, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageHero, {
		kicker: "The desk",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Open a",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"file."
		] }),
		image: "/hero-corridor.jpg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-md text-sm leading-relaxed text-ivory/80",
			children: "Talent applications, campaign briefs, lookbook commissions, and studio services. A paid file is read first. No guarantee of a yes."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/join",
			className: "mt-6 inline-flex min-h-12 items-center border border-heat px-6 font-display text-xs tracking-widest text-heat uppercase",
			children: "Talent onboarding"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: send,
		className: "mx-auto max-w-lg space-y-5 px-5 py-12 md:px-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block font-display text-xs tracking-widest text-heat uppercase",
				children: ["Kind", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "mt-2 block w-full border-b border-line bg-transparent py-3",
					value: kind,
					onChange: (e) => setKind(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "talent",
							className: "bg-navy",
							children: "Talent file"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "campaign",
							className: "bg-navy",
							children: "Campaign brief"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "twin",
							className: "bg-navy",
							children: "Lookbook / likeness (signed only)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "service",
							className: "bg-navy",
							children: "Studio service"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block font-display text-xs tracking-widest text-heat uppercase",
				children: ["House / brand", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "mt-2 block w-full border-b border-line bg-transparent py-3",
					value: company,
					onChange: (e) => setCompany(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block font-display text-xs tracking-widest text-heat uppercase",
				children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "mt-2 block w-full border-b border-line bg-transparent py-3",
					value: contactName,
					onChange: (e) => setContactName(e.target.value),
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block font-display text-xs tracking-widest text-heat uppercase",
				children: ["The brief", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "mt-2 block min-h-32 w-full border-b border-line bg-transparent py-3",
					value: details,
					onChange: (e) => setDetails(e.target.value),
					required: true,
					minLength: 12,
					placeholder: "Pronouns, limits, charge, dates. No moodboard dump."
				})]
			}),
			talent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: ["Attached talent: ", talent]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-3 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "mt-1 size-4 accent-heat",
					checked: payFee,
					onChange: (e) => setPayFee(e.target.checked)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Settle ",
					aud(fee),
					" now so the file is read first.",
					kind !== "talent" ? " Credited against the day rate if the house says yes." : ""
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
				type: "submit",
				disabled: busy || isPending,
				children: busy ? "Sending…" : user ? "Send the file" : "Sign in to send"
			})
		]
	})] });
}
//#endregion
export { ApplyPage as component };
