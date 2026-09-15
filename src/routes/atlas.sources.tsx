import { createFileRoute, Link } from "@tanstack/react-router";
import { LIVE_DATABASES } from "@/lib/live/sources";

export const Route = createFileRoute("/atlas/sources")({ component: SourcesPage });

function SourcesPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-12">
      <p className="font-display text-xs tracking-widest text-heat uppercase">Live index</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide uppercase">Databases</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Search queries Wikidata for records that carry identifiers from the public industry databases below. Tube
        sites and clip storefronts are not indexed. No explicit media is stored or displayed. Performer records
        require a Wikidata birth year of 21 or older.
      </p>
      <ul className="mt-10">
        {LIVE_DATABASES.map((s) => (
          <li key={s.name} className="border-t border-line py-5">
            <p className="font-display text-2xl tracking-wide uppercase">{s.name}</p>
            <p className="mt-1 text-sm text-muted">{s.full}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.what}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm">
        <Link to="/atlas/search" search={{ q: "", kind: "all" }} className="text-heat">
          Open search
        </Link>
      </p>
    </article>
  );
}
