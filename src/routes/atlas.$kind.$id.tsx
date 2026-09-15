import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Portrait } from "@/components/atlas/portrait";
import { EntityCard } from "@/components/atlas/entity-card";
import { GhostButton } from "@/components/site/chrome";
import { KIND_META, getEntity, isKind, relatedOf, resolveCredit } from "@/lib/catalog";
import { useSaved } from "@/lib/saved";
import { KIND_ICON } from "@/components/atlas/kind-mark";
import { cn, houseCase } from "@/lib/utils";

export const Route = createFileRoute("/atlas/$kind/$id")({
  component: EntityPage,
  beforeLoad: ({ params }) => {
    if (!isKind(params.kind)) throw notFound();
    const entity = getEntity(params.kind, params.id);
    if (!entity) throw notFound();
  },
  notFoundComponent: () => (
    <div className="px-5 py-16">
      <h1 className="font-display text-3xl tracking-wide uppercase">Not in the index</h1>
      <Link to="/atlas" className="mt-4 inline-block text-heat">
        Return to the index
      </Link>
    </div>
  ),
});

function EntityPage() {
  const { kind, id } = Route.useParams();
  const entity = isKind(kind) ? getEntity(kind, id) : undefined;
  const saved = useSaved((s) => (entity ? s.has({ kind: entity.kind, id: entity.id }) : false));
  const toggle = useSaved((s) => s.toggle);

  if (!entity) return null;

  const Icon = KIND_ICON[entity.kind];
  const related = relatedOf(entity);

  return (
    <article className="px-5 py-10 md:px-8">
      <p className="flex items-center gap-2 font-display text-xs tracking-widest text-heat uppercase">
        <Icon className="size-3.5" />
        <Link to="/atlas/$kind" params={{ kind: entity.kind }} className="hover:text-ivory">
          {KIND_META[entity.kind].singular}
        </Link>
        {entity.source === "public" ? <span className="text-muted">· Public record</span> : null}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <div className="flex items-start gap-4">
            <Portrait
              id={entity.id}
              name={entity.name}
              kind={entity.kind}
              className="hidden h-36 w-[6.8rem] shrink-0 sm:block"
            />
            <div className="min-w-0 flex-1">
              <h1 className={cn("font-display text-4xl tracking-wide md:text-5xl", houseCase(entity.name))}>{entity.name}</h1>
              {entity.subtitle ? <p className="mt-2 text-lg text-muted">{entity.subtitle}</p> : null}
              {entity.aka && entity.aka.length > 0 ? (
                <p className="mt-1 text-sm text-muted">Also {entity.aka.join(", ")}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {entity.status ? (
                  <span className="border border-heat px-2 py-1 font-display text-[11px] tracking-widest text-heat uppercase">
                    {entity.status}
                  </span>
                ) : null}
                {entity.region ? (
                  <span className="border border-line px-2 py-1 font-display text-[11px] tracking-widest uppercase">
                    {entity.region}
                  </span>
                ) : null}
              </div>
              <GhostButton className="mt-4 lg:hidden" onClick={() => toggle({ kind: entity.kind, id: entity.id })}>
                {saved ? <BookmarkCheck className="mr-2 size-4" /> : <Bookmark className="mr-2 size-4" />}
                {saved ? "Saved" : "Save record"}
              </GhostButton>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ivory">{entity.summary}</p>
          {entity.body
            ? entity.body.split("\n\n").map((para) => (
                <p key={para.slice(0, 40)} className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  {para}
                </p>
              ))
            : null}

          {entity.credits && entity.credits.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-display text-xs tracking-widest text-heat uppercase">Credits</h2>
              <table className="mt-3 w-full text-left text-sm">
                <tbody>
                  {entity.credits.map((c, i) => {
                    const target = resolveCredit(c);
                    return (
                      <tr key={i} className="border-b border-line">
                        <td className="py-2.5 pr-4 text-muted">{c.role}</td>
                        <td className="py-2.5 pr-4">
                          {target ? (
                            <Link
                              to="/atlas/$kind/$id"
                              params={{ kind: target.kind, id: target.id }}
                              className="hover:text-heat"
                            >
                              {c.title}
                            </Link>
                          ) : (
                            c.title
                          )}
                        </td>
                        <td className="py-2.5 font-mono text-muted tabular-nums">{c.year}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          ) : null}

          {entity.socials && entity.socials.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-display text-xs tracking-widest text-heat uppercase">Public socials</h2>
              <ul className="mt-3 space-y-1">
                {entity.socials.map((s) => (
                  <li key={`${s.platform}-${s.handle}`} className="flex gap-3 text-sm">
                    <span className="w-24 text-muted">{s.platform}</span>
                    <span className="font-mono">{s.handle}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-display text-xs tracking-widest text-heat uppercase">Related</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <EntityCard key={`${r.kind}:${r.id}`} entity={r} compact />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-4 lg:pt-2">
          <GhostButton
            className="hidden w-full lg:inline-flex"
            onClick={() => toggle({ kind: entity.kind, id: entity.id })}
          >
            {saved ? <BookmarkCheck className="mr-2 size-4" /> : <Bookmark className="mr-2 size-4" />}
            {saved ? "Saved" : "Save record"}
          </GhostButton>
          <dl className="border border-line p-4">
            {entity.citation ? <Fact label="Citation" value={entity.citation} /> : null}
            {entity.venue ? <Fact label="Venue" value={entity.venue} /> : null}
            {entity.dateStart ? (
              <Fact
                label="Dates"
                value={entity.dateEnd ? `${entity.dateStart} – ${entity.dateEnd}` : entity.dateStart}
              />
            ) : null}
            {entity.facts.map((f) => (
              <Fact key={f.label} label={f.label} value={f.value} />
            ))}
          </dl>
          {entity.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {entity.tags.map((t) => (
                <Link
                  key={t}
                  to="/atlas/search"
                  search={{ q: t, kind: "all" }}
                  className="border border-line px-2.5 py-1 text-xs text-muted hover:border-heat hover:text-heat"
                >
                  {t}
                </Link>
              ))}
            </div>
          ) : null}
          {entity.id === "fleshsesh" || (entity.kind === "performers" && entity.tags.includes("signed")) ? (
            <Link to="/talent" className="block font-display text-xs tracking-widest text-heat uppercase">
              Open the house roster →
            </Link>
          ) : null}
          <Link
            to="/atlas/dossier"
            search={{ q: entity.name, qid: "", id: entity.id }}
            className="block font-display text-xs tracking-widest text-heat uppercase"
          >
            Compile a dossier →
          </Link>
        </aside>
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line py-2.5 last:border-0">
      <dt className="font-display text-[11px] tracking-widest text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
