import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Printer } from "lucide-react";
import { toast } from "sonner";
import { SearchBox } from "@/components/atlas/search-box";
import { EntityRow } from "@/components/atlas/entity-card";
import { LiveRow } from "@/components/atlas/live-row";
import { GhostButton } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { getById, relatedOf, search } from "@/lib/catalog";
import { searchLiveIndex, getLiveRecord } from "@/lib/live/queries";
import type { LiveHit } from "@/lib/live/types";
import { LIVE_SOURCE_LINE } from "@/lib/live/sources";
import { fileDossier, getDossierState } from "@/lib/house/ops";
import { isUnauthorized } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type Search = { q: string; qid: string; id: string };

export const Route = createFileRoute("/atlas/dossier")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : "",
    qid: typeof s.qid === "string" ? s.qid : "",
    id: typeof s.id === "string" ? s.id : "",
  }),
  component: DossierPage,
});

const TRY = ["Vale Noir", "fleshsesh", "Evil Angel", "2257", "Helix House"] as const;

function DossierPage() {
  const { q, qid, id } = Route.useSearch();
  const query = q.trim();
  const pinned = id ? getById(id) : undefined;
  const deskHits = useMemo(() => {
    if (!query && !pinned) return [];
    const hits = query ? search(query, "all").map((h) => h.entity) : [];
    if (pinned && !hits.some((e) => e.id === pinned.id)) hits.unshift(pinned);
    return hits.slice(0, 8);
  }, [query, pinned]);

  const related = pinned ? relatedOf(pinned).slice(0, 6) : deskHits[0] ? relatedOf(deskHits[0]).slice(0, 6) : [];

  const [live, setLive] = useState<LiveHit[]>([]);
  const [liveState, setLiveState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [liveError, setLiveError] = useState<string | null>(null);

  const { user } = useCurrentUserState();
  const [bought, setBought] = useState(false);
  const [filed, setFiled] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setBought(false);
      setFiled(false);
      return;
    }
    getDossierState()
      .then((s) => {
        setBought(s.bought);
        const match = s.files.some(
          (f) => f.query.toLowerCase() === query.toLowerCase() && f.qid === qid && f.entity_id === id,
        );
        setFiled(match);
      })
      .catch(() => undefined);
  }, [user, query, qid, id]);

  useEffect(() => {
    const skip = query.length < 2 && !qid;
    if (skip) {
      setLive([]);
      setLiveState("idle");
      setLiveError(null);
      return;
    }
    let alive = true;
    setLiveState("loading");
    const run = async () => {
      const hits: LiveHit[] = [];
      let err: string | null = null;
      if (qid) {
        const row = await getLiveRecord({ data: { qid } });
        if (row) hits.push(row);
      }
      if (query.length >= 2) {
        const res = await searchLiveIndex({ data: { q: query, kind: "all" } });
        if (!alive) return;
        if (res.error) err = res.error;
        for (const h of res.hits) {
          if (!hits.some((x) => x.qid === h.qid)) hits.push(h);
        }
      }
      if (!alive) return;
      setLiveError(err);
      setLive(hits.slice(0, 8));
      setLiveState(err && hits.length === 0 ? "error" : "done");
    };
    void run().catch(() => {
      if (!alive) return;
      setLiveState("error");
      setLiveError("live index unavailable");
    });
    return () => {
      alive = false;
    };
  }, [query, qid]);

  const sources = useMemo(() => {
    const names: string[] = ["House desk"];
    for (const h of live) {
      for (const d of h.databases) {
        if (!names.includes(d.name)) names.push(d.name);
      }
    }
    if (live.length && !names.includes("Wikidata")) names.push("Wikidata");
    return names;
  }, [live]);

  const title = pinned?.name || live[0]?.name || query || "Untitled";
  const compiled = Boolean(query || pinned || qid);

  async function stamp() {
    if (!query && !title) return;
    setBusy(true);
    try {
      const res = await fileDossier({
        data: {
          query: query || title,
          qid: qid || undefined,
          entityId: id || undefined,
          title,
          sources,
        },
      });
      setFiled(true);
      toast.success(res.already ? "Already on the desk." : "Filed on the desk.");
    } catch (err) {
      if (isUnauthorized(err)) {
        toast.error("Sign in to file this name.");
        return;
      }
      toast.error(err instanceof Error ? err.message : "The desk could not file that.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="px-5 py-10 md:px-8">
      <p className="font-display text-xs tracking-widest text-heat uppercase">Dossier</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide uppercase md:text-6xl">A name, compiled.</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Pull a record from the house desk and live industry databases into one file. Identifiers only — IAFD, AFDB,
        AVN, XXXBios. No photographs. No scene descriptions. Stamp it on the desk for A$49.
      </p>

      <div className="mt-8 max-w-2xl">
        <SearchBox
          key={query}
          initial={query}
          dest="dossier"
          autoFocus={!query}
          placeholder="A name, a house, a statute…"
        />
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
        <li className="font-display text-[11px] tracking-widest uppercase">Try</li>
        {TRY.map((ex) => (
          <li key={ex}>
            <Link to="/atlas/dossier" search={{ q: ex, qid: "", id: "" }} className="hover:text-heat">
              {ex}
            </Link>
          </li>
        ))}
      </ul>

      {!compiled ? (
        <p className="mt-14 max-w-md text-sm text-muted">
          Search a name. The compiler will fold desk records, live identifiers, and related files into a single sheet.
        </p>
      ) : (
        <article className="mt-12 border border-line bg-navy p-5 md:p-8">
          <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="font-display text-[11px] tracking-widest text-heat lowercase">fleshsesh atlas · dossier</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">{title}</h2>
              <p className="mt-2 text-sm text-muted">
                Compiled {new Date().toISOString().slice(0, 10)} · 18+ · identifiers only
              </p>
            </div>
            <GhostButton type="button" onClick={() => window.print()}>
              <Printer className="mr-2 size-4" />
              Print
            </GhostButton>
          </header>

          <section className="mt-8">
            <h3 className="font-display text-xs tracking-widest text-heat uppercase">Sources</h3>
            <p className="mt-2 text-sm">{sources.join(" · ")}</p>
            <p className="mt-1 text-xs text-muted">{LIVE_SOURCE_LINE}. Birth years used only to enforce 21+.</p>
          </section>

          {deskHits.length > 0 ? (
            <section className="mt-10">
              <h3 className="font-display text-xs tracking-widest text-heat uppercase">Desk file</h3>
              <div className="mt-3">
                {deskHits.map((e) => (
                  <EntityRow key={`${e.kind}:${e.id}`} entity={e} q={query} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-10">
            <h3 className="font-display text-xs tracking-widest text-heat uppercase">Live identifiers</h3>
            {liveState === "loading" ? <p className="mt-3 text-sm text-muted">Querying Wikidata…</p> : null}
            {liveState === "error" && live.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                Live index unavailable{liveError ? ` (${liveError})` : ""}. Desk records above still compile.
              </p>
            ) : null}
            {liveState !== "loading" && live.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                No live industry identifiers for this string. Desk records and statutes still file.
              </p>
            ) : null}
            {live.length > 0 ? (
              <div className="mt-3">
                {live.map((h) => (
                  <div key={h.qid} className="border-t border-line py-3">
                    <LiveRow hit={h} />
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {h.databases.map((d) => (
                        <li key={d.name + d.href}>
                          <a
                            href={d.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 border border-line px-2.5 text-xs hover:border-heat hover:text-heat"
                          >
                            {d.name}
                            <ExternalLink className="size-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          {related.length > 0 ? (
            <section className="mt-10">
              <h3 className="font-display text-xs tracking-widest text-heat uppercase">Related on the desk</h3>
              <div className="mt-3">
                {related.map((e) => (
                  <EntityRow key={`${e.kind}:${e.id}`} entity={e} />
                ))}
              </div>
            </section>
          ) : null}

          <footer className="mt-12 border-t border-line pt-6">
            {filed ? (
              <p className="text-sm">
                Filed on the desk.{" "}
                <Link to="/desk" className="text-heat">
                  Open the desk →
                </Link>
              </p>
            ) : bought ? (
              <div>
                <p className="text-sm text-muted">The pack is settled. Stamp this name onto the desk.</p>
                <div className="mt-4">
                  <GhostButton type="button" disabled={busy} onClick={stamp}>
                    {busy ? "Filing…" : "File this name"}
                  </GhostButton>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="font-display text-xs tracking-widest text-heat uppercase">Research pack</p>
                  <p className="mt-2 max-w-md text-sm text-muted">
                    A$49, once. Then stamp as many names as the desk needs. The file is identifiers and sources — not a
                    tube, not a classifieds board.
                  </p>
                </div>
                <BuyButton productId="atlas-dossier" label="Settle the pack · A$49" />
              </div>
            )}
          </footer>
        </article>
      )}
    </div>
  );
}
