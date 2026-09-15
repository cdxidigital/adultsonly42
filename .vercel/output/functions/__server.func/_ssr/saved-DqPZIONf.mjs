import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-DqPZIONf.js
var KEY = "fleshsesh.saved";
var LEGACY_KEYS = [
	"fleshsearch.saved",
	"flesh.saved",
	"canon.saved"
];
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY) ?? LEGACY_KEYS.map((k) => window.localStorage.getItem(k)).find(Boolean);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function write(items) {
	try {
		window.localStorage.setItem(KEY, JSON.stringify(items));
	} catch {}
}
function keyOf(r) {
	return `${r.kind}:${r.id}`;
}
var useSaved = create((set, get) => ({
	items: [],
	has: (ref) => get().items.some((i) => keyOf(i) === keyOf(ref)),
	toggle: (ref) => {
		const k = keyOf(ref);
		const items = get().items.some((i) => keyOf(i) === k) ? get().items.filter((i) => keyOf(i) !== k) : [ref, ...get().items];
		write(items);
		set({ items });
	}
}));
function hydrateSaved() {
	useSaved.setState({ items: read() });
}
function isLiveId(id) {
	return /^Q[1-9]\d{0,12}$/.test(id);
}
//#endregion
export { isLiveId as n, useSaved as r, hydrateSaved as t };
