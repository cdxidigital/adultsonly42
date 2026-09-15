import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { Portrait } from "@/components/atlas/portrait";
import { GhostButton } from "@/components/site/chrome";
import { KIND_META } from "@/lib/catalog/types";
import { KIND_ICON } from "@/components/atlas/kind-mark";
import { getLiveRecord } from "@/lib/live/queries";
import type { LiveHit } from "@/lib/live/types";
import { useSaved } from "@/lib/saved";
import { cn, houseCase } from "@/lib/utils";

export const Route = createFileRoute("/atlas/live/$qid")({
  component: LiveRecordPage,
  beforeLoad: ({ params }) => {
    if (!/^Q[1-9]\d{0,12}$/.test(params.qid)) throw notFound();
  },
  notFoundComponent: () => (
    <div className="px-5 py-16">
      <h1 className="font-display text-3xl tracking-wide uppercase">Not in the live index</h1>
      <Link to="/atlas" className="mt-4 inline-block text-heat">
        Return to the index
      </Link>
    </div>
  ),
});

function LiveRecordPage() {
  const { qid } = Route.useParams();
  const [hit, setHit] = useState<LiveHit | null | undefined>(undefined);
  const saved = useSaved((s) => (hit ? s.has({ kind: hit.kind, id: hit.qid }) : false));
  const toggle = useSaved((s) => s.toggle);

  useEffect(() => {
    let alive = true;
    setHit(undefined);
    void getLiveRecord({ data: { qid } }).then((row) => {
      if (alive) setHit(row);
    });
    return () => {
      alive = false;
    };
  }, [qid]);

  if (hit === undefined) {
    return <p className="px-5 py-16 text-muted">Looking up the live industry databases…</p>;
  }
  if (!hit) {
    return (
      <div className="px-5 py-16">
        <h1 className="font-display text-3xl tracking-wide uppercase">Not in the live index</h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          No industry database record matched this identifier, or the performer did not pass the 21+ birth-year
          filter.
        </p>
      </div>
    );
  }

  const Icon = KIND_ICON[hit.kind];
  const saveRef = { kind: hit.kind, id: hit.qid, name: hit.name };

  return (
    <article className="px-5 py-10 md:px-8">
      <p className="flex items-center gap-2 font-display text-xs tracking-widest text-heat uppercase">
        <Icon className="size-3.5" />
        <Link to="/atlas/$kind" params={{ kind: hit.kind }} className="hover:text-ivory">
          {KIND_META[hit.kind].singular}
        </Link>
        <span className="text-muted">· Live databases</span>
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <div className="flex items-start gap-4">
            <Portrait
              id={hit.qid}
              name={hit.name}
              kind={hit.kind}
              className="hidden h-36 w-[6.8rem] shrink-0 sm:block"
            />
            <div className="min-w-0 flex-1">
              <h1 className={cn("font-display text-4xl tracking-wide md:text-5xl", houseCase(hit.name))}>{hit.name}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="border border-heat px-2 py-1 font-display text-[11px] tracking-widest text-heat uppercase">
                  Live index
                </span>
                {hit.region ? (
                  <span className="border border-line px-2 py-1 font-display text-[11px] tracking-widest uppercase">
                    {hit.region}
                  </span>
                ) : null}
              </div>
              <GhostButton className="mt-4 lg:hidden" onClick={() => toggle(saveRef)}>
                {saved ? <BookmarkCheck className="mr-2 size-4" /> : <Bookmark className="mr-2 size-4" />}
                {saved ? "Saved" : "Save record"}
              </GhostButton>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed">{hit.summary}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Metadata is drawn from Wikidata identifiers for IAFD, Adult Film Database, AVN, XXXBios, EGAFD, BGAFD, and
            EuroBabeIndex. fleshsesh does not host explicit media, scene descriptions, or photographs. Birth dates are
            used only to enforce a 21+ filter and are not published.
          </p>

          <section className="mt-10">
            <h2 className="font-display text-xs tracking-widest text-heat uppercase">Industry databases</h2>
            <ul className="mt-3">
              {hit.databases.map((d) => (
                <li key={d.name + d.href} className="border-t border-line">
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-between gap-3 py-2.5 text-sm hover:text-heat"
                  >
                    <span>{d.name}</span>
                    <ExternalLink className="size-3.5 shrink-0 text-muted" />
                  </a>
                </li>
              ))}
              {hit.wikipedia ? (
                <li className="border-t border-line">
                  <a
                    href={hit.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-between gap-3 py-2.5 text-sm hover:text-heat"
                  >
                    <span>Wikipedia</span>
                    <ExternalLink className="size-3.5 shrink-0 text-muted" />
                  </a>
                </li>
              ) : null}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:pt-2">
          <GhostButton className="hidden w-full lg:inline-flex" onClick={() => toggle(saveRef)}>
            {saved ? <BookmarkCheck className="mr-2 size-4" /> : <Bookmark className="mr-2 size-4" />}
            {saved ? "Saved" : "Save record"}
          </GhostButton>
          <Link
            to="/atlas/dossier"
            search={{ q: hit.name, qid: hit.qid, id: "" }}
            className="block font-display text-xs tracking-widest text-heat uppercase"
          >
            Compile a dossier →
          </Link>
          <dl className="border border-line p-4">
            <div className="border-b border-line py-2.5">
              <dt className="font-display text-[11px] tracking-widest text-muted uppercase">Wikidata</dt>
              <dd className="mt-1 font-mono text-sm">{hit.qid}</dd>
            </div>
            <div className="py-2.5">
              <dt className="font-display text-[11px] tracking-widest text-muted uppercase">Sources</dt>
              <dd className="mt-1 text-sm">
                {hit.databases.map((d) => d.name).filter((n, i, a) => a.indexOf(n) === i).join(", ") || "Wikidata"}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
