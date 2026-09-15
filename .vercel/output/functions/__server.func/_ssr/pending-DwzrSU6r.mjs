//#region node_modules/.nitro/vite/services/ssr/assets/pending-DwzrSU6r.js
var ADD_KEY = "fleshsesh-pending-add";
var BRIEF_KEY = "fleshsesh-pending-brief";
function safeRedirect(value) {
	if (typeof value !== "string") return "/desk";
	if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return "/desk";
	if (value.startsWith("/login")) return "/desk";
	return value;
}
function stashAdd(productId, spec = "") {
	try {
		sessionStorage.setItem(ADD_KEY, JSON.stringify({
			productId,
			spec
		}));
	} catch {}
}
function takeAdd() {
	try {
		const raw = sessionStorage.getItem(ADD_KEY);
		sessionStorage.removeItem(ADD_KEY);
		if (!raw) return null;
		if (raw.startsWith("{")) {
			const o = JSON.parse(raw);
			if (!o.productId) return null;
			return {
				productId: o.productId,
				spec: o.spec ?? ""
			};
		}
		return {
			productId: raw,
			spec: ""
		};
	} catch {
		return null;
	}
}
function stashBrief(draft) {
	try {
		sessionStorage.setItem(BRIEF_KEY, JSON.stringify(draft));
	} catch {}
}
function takeBrief() {
	try {
		const raw = sessionStorage.getItem(BRIEF_KEY);
		sessionStorage.removeItem(BRIEF_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
var AGE_KEY = "fleshsesh-age-ok";
function writeAgeOk() {
	try {
		localStorage.setItem(AGE_KEY, "1");
	} catch {}
	try {
		document.cookie = `${AGE_KEY}=1; path=/; max-age=31536000; SameSite=Lax`;
	} catch {}
}
function readAgeOkClient() {
	try {
		if (localStorage.getItem("fleshsesh-age-ok") === "1") return true;
	} catch {}
	try {
		return document.cookie.split("; ").includes(`${AGE_KEY}=1`);
	} catch {
		return false;
	}
}
//#endregion
export { stashBrief as a, writeAgeOk as c, stashAdd as i, readAgeOkClient as n, takeAdd as o, safeRedirect as r, takeBrief as s, AGE_KEY as t };
