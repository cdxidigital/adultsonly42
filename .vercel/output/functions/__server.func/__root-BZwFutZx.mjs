import { r as createServerFn } from "./_ssr/ssr.mjs";
import { t as createServerRpc } from "./_ssr/createServerRpc-CcvdN_gc.mjs";
import { t as AGE_KEY } from "./_ssr/pending-DwzrSU6r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/__root-BZwFutZx.js
var readAgeCookie_createServerFn_handler = createServerRpc({
	id: "183cc80904db2ed73edceccd0a398335c9eabbaa1c679e4702c12c22b470b34d",
	name: "readAgeCookie",
	filename: "src/routes/__root.tsx"
}, (opts) => readAgeCookie.__executeServer(opts));
var readAgeCookie = createServerFn({ method: "GET" }).handler(readAgeCookie_createServerFn_handler, async () => {
	try {
		const { getRequestHeader } = await import("./_ssr/ssr.mjs").then((n) => n.c).then((n) => n.t);
		const cookie = getRequestHeader("cookie") ?? "";
		return new RegExp(`(?:^|; )${AGE_KEY}=1(?:;|$)`).test(cookie);
	} catch {
		return false;
	}
});
//#endregion
export { readAgeCookie_createServerFn_handler };
