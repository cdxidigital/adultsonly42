import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { R as useCurrentUserState, _ as HouseChrome, g as HeatButton, y as SignInHere } from "./router-Dt0_uhc_.mjs";
import { t as BuyButton } from "./buy-button-DqOur8HL.mjs";
import { s as getExamState, t as CRAFT_EXAM, y as takeCraftExam } from "./ops-DKG_NDpI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/academy.exam-CPBzko90.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExamPage() {
	const { user, isPending } = useCurrentUserState();
	const [bought, setBought] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [picks, setPicks] = (0, import_react.useState)(() => CRAFT_EXAM.questions.map(() => -1));
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		getExamState().then((s) => {
			setBought(s.bought);
			setResult(s.result);
		}).catch(() => void 0);
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the exam…"
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInHere, { next: "/academy/exam" });
	async function submit() {
		if (picks.some((p) => p < 0)) {
			toast.error("Answer every question.");
			return;
		}
		setBusy(true);
		try {
			const res = await takeCraftExam({ data: picks });
			setResult({
				score: res.score,
				passed: res.passed
			});
			toast.success(res.passed ? `Passed at ${res.score}%.` : `Scored ${res.score}%. Seventy-five to pass.`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "The desk could not mark that.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl px-5 pt-28 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/academy",
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "Academy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: "House craft"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted",
				children: "Four questions. Seventy-five percent to pass. The badge sits on the desk. Language, consent, and what this house will not do."
			}),
			!bought ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-heat tabular-nums",
					children: "A$29"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyButton, {
						productId: "exam-craft",
						label: "Settle the exam"
					})
				})]
			}) : result?.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 border border-heat p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-heat uppercase",
						children: "Certificate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-3xl tracking-wide uppercase",
						children: "House craft"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							"Scored ",
							result.score,
							"%. The badge is on your desk."
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-8",
				children: [
					CRAFT_EXAM.questions.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "border-t border-line pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-display text-lg tracking-wide uppercase",
							children: q.prompt
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: q.options.map((opt, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									className: "mt-1 size-4 accent-heat",
									name: q.id,
									checked: picks[i] === n,
									onChange: () => setPicks(picks.map((p, x) => x === i ? n : p))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt })]
							}, opt))
						})]
					}, q.id)),
					result && !result.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Last score ",
							result.score,
							"%. Sit it again."
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatButton, {
						type: "button",
						disabled: busy,
						onClick: submit,
						children: busy ? "Marking…" : "Sit the exam"
					})
				]
			})
		]
	}) });
}
//#endregion
export { ExamPage as component };
