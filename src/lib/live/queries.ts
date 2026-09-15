import { createServerFn } from "@tanstack/react-start";
import type { LiveHit, LiveSearchResult } from "./types";

export const searchLiveIndex = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const o = (d ?? {}) as Record<string, unknown>;
    return {
      q: typeof o.q === "string" ? o.q.slice(0, 80) : "",
      kind: typeof o.kind === "string" ? o.kind.slice(0, 24) : "all",
    };
  })
  .handler(async ({ data }): Promise<LiveSearchResult> => {
    const { searchWikidata } = await import("./wikidata.server.ts");
    return searchWikidata(data.q, data.kind);
  });

export const getLiveRecord = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const o = (d ?? {}) as Record<string, unknown>;
    return { qid: typeof o.qid === "string" ? o.qid.slice(0, 16) : "" };
  })
  .handler(async ({ data }): Promise<LiveHit | null> => {
    const { getWikidataEntity } = await import("./wikidata.server.ts");
    return getWikidataEntity(data.qid);
  });
