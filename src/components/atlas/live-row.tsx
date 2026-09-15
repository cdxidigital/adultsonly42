import { Link } from "@tanstack/react-router";
import { Portrait } from "./portrait";
import { KIND_ICON } from "./kind-mark";
import { KIND_META } from "@/lib/catalog/types";
import { Highlight } from "./entity-card";
import type { LiveHit } from "@/lib/live/types";

export function LiveRow({ hit, q }: { hit: LiveHit; q?: string }) {
  const Icon = KIND_ICON[hit.kind];
  return (
    <Link
      to="/atlas/live/$qid"
      params={{ qid: hit.qid }}
      className="group flex items-start gap-3 border-t border-line py-4 hover:text-heat"
    >
      <Portrait id={hit.qid} name={hit.name} kind={hit.kind} className="size-12 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-lg tracking-wide uppercase">
            <Highlight text={hit.name} q={q} />
          </span>
          <span className="inline-flex items-center gap-1 font-display text-[11px] tracking-widest text-muted uppercase">
            <Icon className="size-3" />
            {KIND_META[hit.kind].singular}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{hit.summary}</p>
        {hit.databases.length > 0 ? (
          <p className="mt-1.5 font-display text-[11px] tracking-widest text-heat uppercase">
            {hit.databases
              .map((d) => d.name)
              .filter((n, i, a) => a.indexOf(n) === i)
              .join(" · ")}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
