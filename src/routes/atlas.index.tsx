import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchBox } from "@/components/atlas/search-box";
import { EntityCard } from "@/components/atlas/entity-card";
import { KIND_ICON } from "@/components/atlas/kind-mark";
import { KINDS, KIND_META, counts, getById, listKind } from "@/lib/catalog";

export const Route = createFileRoute("/atlas/")({ component: AtlasHome });

const TRY = [
  { q: "fleshsesh", kind: "companies" },
  { q: "Vale Noir", kind: "performers" },
  { q: "2257", kind: "law" },
  { q: "XBIZ", kind: "events" },
  { q: "Helix House", kind: "companies" },
] as const;

function AtlasHome() {
  const c = counts();
  const spotlight = [getById("fleshsesh"), getById("vale-noir"), getById("usc-2257"), getById("helix-house")].filter(
    Boolean,
  );
  const upcoming = listKind("events").filter((e) => e.status === "Upcoming").slice(0, 4);

  return (
    <div className="px-5 py-10 md:px-8">
      <p className="font-display text-xs tracking-widest text-heat uppercase">The index</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-wide uppercase md:text-7xl">
        The trade,
        <br />
        filed.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        A professional register — not a tube. Search public industry databases via Wikidata, plus the house desk,
        calendar, and the statutes that govern the work. No explicit media. Performers in the live index need a
        Wikidata birth year of 21 or older.
      </p>
      <div className="mt-8 max-w-2xl">
        <SearchBox autoFocus />
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
        <li className="font-display text-[11px] tracking-widest uppercase">Try</li>
        {TRY.map((ex) => (
          <li key={ex.q}>
            <Link to="/atlas/search" search={{ q: ex.q, kind: ex.kind }} className="hover:text-heat">
              {ex.q}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="mt-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-7">
        {KINDS.map((kind) => {
          const Icon = KIND_ICON[kind];
          return (
            <li key={kind} className="bg-void">
              <Link to="/atlas/$kind" params={{ kind }} className="block px-4 py-6 hover:bg-navy">
                <Icon className="size-4 text-heat" />
                <p className="mt-3 font-display text-sm tracking-wide uppercase">{KIND_META[kind].label}</p>
                <p className="mt-1 font-display text-xs text-muted tabular-nums">{c[kind]}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-14">
        <p className="font-display text-xs tracking-widest text-heat uppercase">Spotlight</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {spotlight.map((e) => (e ? <EntityCard key={e.id} entity={e} /> : null))}
        </div>
      </section>

      {upcoming.length > 0 ? (
        <section className="mt-14">
          <div className="mb-4 flex items-end justify-between">
            <p className="font-display text-xs tracking-widest text-heat uppercase">Upcoming</p>
            <Link to="/nights" className="font-display text-xs tracking-widest text-heat uppercase">
              House nights
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {upcoming.map((e) => (
              <EntityCard key={e.id} entity={e} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-14 text-sm text-muted">
        <Link to="/atlas/dossier" search={{ q: "", qid: "", id: "" }} className="hover:text-heat">
          Compile a dossier
        </Link>
        {" · "}
        <Link to="/atlas/sources" className="hover:text-heat">
          Databases we index
        </Link>
      </p>
    </div>
  );
}
