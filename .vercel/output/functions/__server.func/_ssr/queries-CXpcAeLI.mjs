import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CXpcAeLI.js
var searchLiveIndex_createServerFn_handler = createServerRpc({
	id: "726656b1ad5879af916a37b5dc6632a9e3969bf4af3081950973aa085d6e3bb4",
	name: "searchLiveIndex",
	filename: "src/lib/live/queries.ts"
}, (opts) => searchLiveIndex.__executeServer(opts));
var searchLiveIndex = createServerFn({ method: "POST" }).validator((d) => {
	const o = d ?? {};
	return {
		q: typeof o.q === "string" ? o.q.slice(0, 80) : "",
		kind: typeof o.kind === "string" ? o.kind.slice(0, 24) : "all"
	};
}).handler(searchLiveIndex_createServerFn_handler, async ({ data }) => {
	const { searchWikidata } = await import("./wikidata.server-Cse-FgIU.mjs");
	return searchWikidata(data.q, data.kind);
});
var getLiveRecord_createServerFn_handler = createServerRpc({
	id: "1ec17876e35cc728acc40f0fa75dbee50a94bfc2fe5e2bcc0ab19c9f7c3b20e0",
	name: "getLiveRecord",
	filename: "src/lib/live/queries.ts"
}, (opts) => getLiveRecord.__executeServer(opts));
var getLiveRecord = createServerFn({ method: "POST" }).validator((d) => {
	const o = d ?? {};
	return { qid: typeof o.qid === "string" ? o.qid.slice(0, 16) : "" };
}).handler(getLiveRecord_createServerFn_handler, async ({ data }) => {
	const { getWikidataEntity } = await import("./wikidata.server-Cse-FgIU.mjs");
	return getWikidataEntity(data.qid);
});
//#endregion
export { getLiveRecord_createServerFn_handler, searchLiveIndex_createServerFn_handler };
