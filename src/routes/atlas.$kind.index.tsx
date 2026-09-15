import { createFileRoute, Link } from "@tanstack/react-router";
import { EntityCard } from "@/components/atlas/entity-card";
import { SearchBox } from "@/components/atlas/search-box";
import { KIND_META, isKind, listKind, socialDirectory, type Kind } from "@/lib/catalog";
import { KIND_ICON } from "@/components/atlas/kind-mark";
import { LIVE_SOURCE_LINE } from "@/lib/live/sources";

const LIVE_KINDS = new Set<Kind>(["performers", "productions", "companies"]);

export const Route = createFileRoute("/atlas/$kind/")({ component: BrowseKind });

function BrowseKind() {
  const { kind } = Route.useParams();
  if (!isKind(kind)) return null;
  const meta = KIND_META[kind];
  const Icon = KIND_ICON[kind];

  if (kind === "social") {
    const rows = socialDirectory();
    return (
      <div className="px-5 py-10 md:px-8">
        <p className="flex items-center gap-2 font-display text-xs tracking-widest text-heat uppercase">
          <Icon className="size-4" /> Directory
        </p>
        <h1 className="mt-2 font-display text-5xl tracking-wide uppercase">{meta.label}</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">{meta.blurb}</p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="font-display text-[11px] tracking-widest text-muted uppercase">
              <tr className="border-b border-line">
                <th className="py-2 pr-4 font-medium">Platform</th>
                <th className="py-2 pr-4 font-medium">Handle</th>
                <th className="py-2 font-medium">Record</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={`${row.entity.kind}-${row.entity.id}-${row.platform}-${row.handle}`}
                  className="border-b border-line"
                >
                  <td className="py-3 pr-4 text-muted">{row.platform}</td>
                  <td className="py-3 pr-4 font-mono">{row.handle}</td>
                  <td className="py-3">
                    <Link
                      to="/atlas/$kind/$id"
                      params={{ kind: row.entity.kind, id: row.entity.id }}
                      className="hover:text-heat"
                    >
                      {row.entity.name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const list = listKind(kind);
  const upcoming = kind === "events" ? list.filter((e) => e.status === "Upcoming") : [];
  const rest = kind === "events" ? list.filter((e) => e.status !== "Upcoming") : list;

  return (
    <div className="px-5 py-10 md:px-8">
      <p className="flex items-center gap-2 font-display text-xs tracking-widest text-heat uppercase">
        <Icon className="size-4" /> Browse
        <span className="text-muted tabular-nums">{list.length}</span>
      </p>
      <h1 className="mt-2 font-display text-5xl tracking-wide uppercase">{meta.label}</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">{meta.blurb}</p>

      {LIVE_KINDS.has(kind) ? (
        <div className="mt-8 border border-line bg-navy p-5 md:p-6">
          <p className="font-display text-xs tracking-widest text-heat uppercase">Live databases</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Search a name to query the public industry databases. The roster below is the house desk. Performers need a
            Wikidata birth year of 21+.
          </p>
          <p className="mt-2 font-display text-[11px] tracking-widest text-muted uppercase">{LIVE_SOURCE_LINE}</p>
          <div className="mt-4 max-w-xl">
            <SearchBox size="sm" kind={kind} placeholder={`Search ${meta.label.toLowerCase()}…`} />
          </div>
        </div>
      ) : null}

      {upcoming.length > 0 ? (
        <div className="mt-8">
          <h2 className="font-display text-xs tracking-widest text-heat uppercase">Upcoming</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {upcoming.map((e) => (
              <EntityCard key={e.id} entity={e} />
            ))}
          </div>
        </div>
      ) : null}

      <div className={upcoming.length ? "mt-10" : "mt-8"}>
        {upcoming.length > 0 || LIVE_KINDS.has(kind) ? (
          <h2 className="font-display text-xs tracking-widest text-heat uppercase">
            {LIVE_KINDS.has(kind) ? "Desk roster" : "Archive"}
          </h2>
        ) : null}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {rest.map((e) => (
            <EntityCard key={e.id} entity={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
