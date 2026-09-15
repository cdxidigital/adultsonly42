import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-fjRHN5XR.js
var searchLiveIndex = createServerFn({ method: "POST" }).validator((d) => {
	const o = d ?? {};
	return {
		q: typeof o.q === "string" ? o.q.slice(0, 80) : "",
		kind: typeof o.kind === "string" ? o.kind.slice(0, 24) : "all"
	};
}).handler(createSsrRpc("726656b1ad5879af916a37b5dc6632a9e3969bf4af3081950973aa085d6e3bb4"));
var getLiveRecord = createServerFn({ method: "POST" }).validator((d) => {
	const o = d ?? {};
	return { qid: typeof o.qid === "string" ? o.qid.slice(0, 16) : "" };
}).handler(createSsrRpc("1ec17876e35cc728acc40f0fa75dbee50a94bfc2fe5e2bcc0ab19c9f7c3b20e0"));
//#endregion
export { searchLiveIndex as n, getLiveRecord as t };
