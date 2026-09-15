import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, W as require_react, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as aud } from "./money-CfiFmu6E.mjs";
import { _ as HouseChrome, a as Route$4, j as getTalent } from "./router-Dt0_uhc_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talent._id-ZUODpXLf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TalentProfile() {
	const { id } = Route$4.useParams();
	const navigate = useNavigate();
	const [person, setPerson] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		getTalent({ data: id }).then(setPerson).catch(() => setPerson(null));
	}, [id]);
	if (person === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center pt-24 text-muted",
		children: "Opening the file…"
	}) });
	if (!person) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center px-5 pt-24",
		children: "Not on the roster."
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseChrome, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid min-h-dvh pt-20 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: person.image,
			alt: "",
			className: "h-80 w-full object-cover md:h-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-center px-5 py-12 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/talent",
					className: "font-display text-xs tracking-widest text-heat uppercase",
					children: "Roster"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-xs tracking-widest text-heat uppercase",
					children: person.pronouns
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-5xl tracking-wide uppercase",
					children: person.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: person.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-md text-sm leading-relaxed text-muted",
					children: person.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 font-display text-3xl text-heat tabular-nums",
					children: [aud(person.day_rate_cents), " / day"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-8 inline-flex min-h-12 w-fit items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory",
					onClick: () => navigate({
						to: "/apply",
						search: { talent: person.id }
					}),
					children: "Open a campaign brief"
				})
			]
		})]
	}) });
}
//#endregion
export { TalentProfile as component };
