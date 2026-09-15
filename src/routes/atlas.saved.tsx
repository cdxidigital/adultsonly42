import { createFileRoute, Link } from "@tanstack/react-router";
import { EntityCard } from "@/components/atlas/entity-card";
import { Portrait } from "@/components/atlas/portrait";
import { getEntity } from "@/lib/catalog";
import { isLiveId, useSaved } from "@/lib/saved";

export const Route = createFileRoute("/atlas/saved")({ component: SavedPage });

function SavedPage() {
  const items = useSaved((s) => s.items);
  const local = items
    .map((r) => ({ ref: r, entity: getEntity(r.kind, r.id) }))
    .filter((x) => x.entity);
  const live = items.filter((r) => !getEntity(r.kind, r.id) && isLiveId(r.id));

  return (
    <div className="px-5 py-10 md:px-8">
      <p className="font-display text-xs tracking-widest text-heat uppercase">This device</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide uppercase">Saved</h1>
      {local.length === 0 && live.length === 0 ? (
        <p className="mt-8 max-w-md text-sm text-muted">
          Nothing pinned yet. Open a record and save it — the list stays in this browser.
        </p>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {local.map(({ entity }) =>
            entity ? <EntityCard key={`${entity.kind}:${entity.id}`} entity={entity} /> : null,
          )}
          {live.map((r) => (
            <Link
              key={`live:${r.id}`}
              to="/atlas/live/$qid"
              params={{ qid: r.id }}
              className="flex items-center gap-3 border border-line bg-navy p-3 hover:border-heat"
            >
              <Portrait id={r.id} name={r.name ?? r.id} kind={r.kind} className="size-14 shrink-0" />
              <div className="min-w-0">
                <p className="font-display text-[11px] tracking-widest text-muted uppercase">Live index</p>
                <p className="font-display text-lg tracking-wide uppercase">{r.name ?? r.id}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
