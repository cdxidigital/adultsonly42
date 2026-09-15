import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchBox } from "@/components/atlas/search-box";
import { EntityRow } from "@/components/atlas/entity-card";
import { LiveRow } from "@/components/atlas/live-row";
import { KINDS, KIND_META, isKind, search, socialDirectory } from "@/lib/catalog";
import { searchLiveIndex } from "@/lib/live/queries";
import type { LiveHit } from "@/lib/live/types";
import { LIVE_SOURCE_LINE } from "@/lib/live/sources";
import { cn } from "@/lib/utils";

type SearchParams = { q: string; kind: string };

export const Route = createFileRoute("/atlas/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : "",
    kind: typeof s.kind === "string" ? s.kind : "all",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, kind } = Route.useSearch();
  const hits = kind === "social" ? [] : search(q, kind === "all" || !isKind(kind) ? "all" : kind);
  const socialHits =
    kind === "all" || kind === "social"
      ? socialDirectory().filter((row) => {
          if (!q.trim()) return kind === "social";
          const blob = `${row.platform} ${row.handle} ${row.entity.name}`.toLowerCase();
          return q
            .toLowerCase()
            .split(/\s+/)
            .every((t) => blob.includes(t));
        })
      : [];

  const [live, setLive] = useState<LiveHit[]>([]);
  const [liveState, setLiveState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [liveError, setLiveError] = useState<string | null>(null);

  useEffect(() => {
    const query = q.trim();
    const skipLive =
      query.length < 2 || kind === "social" || kind === "agents" || kind === "events" || kind === "law";
    if (skipLive) {
      setLive([]);
      setLiveState("idle");
      setLiveError(null);
      return;
    }
    let alive = true;
    setLiveState("loading");
    void searchLiveIndex({ data: { q: query, kind } }).then((res) => {
      if (!alive) return;
      setLive(res.hits);
      setLiveError(res.error ?? null);
      setLiveState(res.error ? "error" : "done");
    });
    return () => {
      alive = false;
    };
  }, [q, kind]);

  const liveKinds =
    kind === "all" || kind === "performers" || kind === "productions" || kind === "companies";

  return (
    <div className="px-5 py-10 md:px-8">
      <p className="font-display text-xs tracking-widest text-heat uppercase">Index</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide uppercase">Search</h1>
      <div className="mt-6 max-w-2xl">
        <SearchBox key={`${kind}:${q}`} initial={q} autoFocus kind={kind} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <FilterChip label="All" kind="all" current={kind} q={q} />
        {KINDS.map((k) => (
          <FilterChip key={k} label={KIND_META[k].label} kind={k} current={kind} q={q} />
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        {kind === "social"
          ? `${socialHits.length} public handle${socialHits.length === 1 ? "" : "s"}`
          : `${hits.length} desk record${hits.length === 1 ? "" : "s"}`}
        {liveKinds && q.trim().length >= 2
          ? ` · ${liveState === "loading" ? "querying live databases" : `${live.length} live`}`
          : ""}
        {q.trim() ? ` for “${q}”` : ""}
        {q.trim() ? (
          <>
            {" · "}
            <Link to="/atlas/dossier" search={{ q, qid: "", id: "" }} className="text-heat">
              Compile a dossier
            </Link>
          </>
        ) : null}
      </p>

      {hits.length > 0 ? (
        <section className="mt-6">
          <h2 className="font-display text-xs tracking-widest text-heat uppercase">Desk</h2>
          <div className="mt-2">
            {hits.map((h) => (
              <EntityRow key={`${h.entity.kind}:${h.entity.id}`} entity={h.entity} q={q} />
            ))}
          </div>
        </section>
      ) : null}

      {(kind === "social" || (kind === "all" && socialHits.length > 0 && q.trim())) && (
        <div className="mt-3">
          {socialHits.map((row) => (
            <Link
              key={`${row.entity.id}-${row.platform}-${row.handle}`}
              to="/atlas/$kind/$id"
              params={{ kind: row.entity.kind, id: row.entity.id }}
              className="flex items-center gap-3 border-t border-line py-3 hover:text-heat"
            >
              <span className="w-24 shrink-0 font-display text-[11px] tracking-widest text-muted uppercase">
                {row.platform}
              </span>
              <span className="font-mono text-sm">{row.handle}</span>
              <span className="text-sm text-muted">{row.entity.name}</span>
            </Link>
          ))}
        </div>
      )}

      {liveKinds && q.trim().length >= 2 ? (
        <section className="mt-10">
          <h2 className="font-display text-xs tracking-widest text-heat uppercase">
            Live databases · {LIVE_SOURCE_LINE}
          </h2>
          {liveState === "loading" ? <p className="mt-4 text-sm text-muted">Querying Wikidata…</p> : null}
          {liveState === "error" ? (
            <p className="mt-4 text-sm text-muted">
              Live index unavailable{liveError ? ` (${liveError})` : ""}. Desk records above still search.
            </p>
          ) : null}
          {live.length > 0 ? (
            <div className="mt-2">
              {live.map((hit) => (
                <LiveRow key={hit.qid} hit={hit} q={q} />
              ))}
            </div>
          ) : null}
          {liveState === "done" && live.length === 0 ? (
            <p className="mt-4 max-w-md text-sm text-muted">
              No live database match. Try a performer, title, or studio name. Performers need a Wikidata birth year of
              21+.
            </p>
          ) : null}
        </section>
      ) : null}

      {hits.length === 0 && socialHits.length === 0 && live.length === 0 && liveState !== "loading" ? (
        <p className="mt-10 max-w-md text-muted">
          {q.trim()
            ? "Nothing matched the desk. Live results appear when a public industry database has a record."
            : "Type a name, title, statute, or city. Two characters open the live industry databases."}
        </p>
      ) : null}
    </div>
  );
}

function FilterChip({
  label,
  kind,
  current,
  q,
}: {
  label: string;
  kind: string;
  current: string;
  q: string;
}) {
  const active = current === kind;
  return (
    <Link
      to="/atlas/search"
      search={{ q, kind }}
      className={cn(
        "px-3 py-2 font-display text-xs tracking-widest uppercase",
        active ? "bg-heat text-navy" : "border border-line text-muted hover:border-heat hover:text-heat",
      )}
    >
      {label}
    </Link>
  );
}
