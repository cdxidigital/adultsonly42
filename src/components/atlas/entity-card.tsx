import { Link } from "@tanstack/react-router";
import type { Entity } from "@/lib/catalog/types";
import { KIND_META } from "@/lib/catalog/types";
import { Portrait } from "./portrait";
import { KIND_ICON } from "./kind-mark";
import { cn, houseCase } from "@/lib/utils";

export function EntityCard({
  entity,
  compact = false,
}: {
  entity: Entity;
  compact?: boolean;
}) {
  const Icon = KIND_ICON[entity.kind];

  return (
    <Link
      to="/atlas/$kind/$id"
      params={{ kind: entity.kind, id: entity.id }}
      className={cn("group block border border-line bg-navy p-3 hover:border-heat", compact && "p-2.5")}
    >
      <div className={cn("flex gap-3", compact ? "items-center" : "items-start")}>
        <Portrait
          id={entity.id}
          name={entity.name}
          kind={entity.kind}
          className={compact ? "size-14 shrink-0" : "h-24 w-[4.6rem] shrink-0"}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-muted">
            <Icon className="size-3.5" strokeWidth={1.75} />
            <span className="font-display text-[11px] tracking-widest uppercase">
              {KIND_META[entity.kind].singular}
            </span>
          </div>
          <h3 className={cn("mt-1 font-display text-lg tracking-wide text-ivory group-hover:text-heat", houseCase(entity.name))}>
            {entity.name}
          </h3>
          {entity.subtitle ? <p className="mt-0.5 truncate text-sm text-muted">{entity.subtitle}</p> : null}
          {!compact ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{entity.summary}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function EntityRow({ entity, q }: { entity: Entity; q?: string }) {
  const Icon = KIND_ICON[entity.kind];
  return (
    <Link
      to="/atlas/$kind/$id"
      params={{ kind: entity.kind, id: entity.id }}
      className="group flex items-start gap-3 border-t border-line py-4 hover:text-heat"
    >
      <Portrait id={entity.id} name={entity.name} kind={entity.kind} className="size-12 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className={cn("font-display text-lg tracking-wide", houseCase(entity.name))}>
            <Highlight text={entity.name} q={q} />
          </span>
          <span className="inline-flex items-center gap-1 font-display text-[11px] tracking-widest text-muted uppercase">
            <Icon className="size-3" />
            {KIND_META[entity.kind].singular}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          <Highlight text={entity.summary} q={q} />
        </p>
      </div>
    </Link>
  );
}

export function Highlight({ text, q }: { text: string; q?: string }) {
  if (!q?.trim()) return <>{text}</>;
  const tokens = q
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (tokens.length === 0) return <>{text}</>;
  const re = new RegExp(`(${tokens.map(escapeReg).join("|")})`, "ig");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        tokens.some((t) => part.toLowerCase() === t.toLowerCase()) ? (
          <mark key={i} className="bg-transparent text-heat">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function escapeReg(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
