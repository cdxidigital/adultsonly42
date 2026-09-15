import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getLedger, type FleshActivity } from "@/lib/house/rewards";
import { TapeRow } from "./ledger.index";

export const Route = createFileRoute("/ledger/activity")({ component: TapePage });

const FILTERS = ["all", "available", "pending", "redeemed"] as const;

function TapePage() {
  const [rows, setRows] = useState<FleshActivity[]>([]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  useEffect(() => {
    getLedger()
      .then((d) => setRows(d.activity))
      .catch(() => setRows([]));
  }, []);

  const shown = rows.filter((r) => filter === "all" || r.state === filter);

  return (
    <section className="px-5 py-12 md:px-8">
      <p className="font-display text-xs tracking-widest text-heat uppercase">The tape</p>
      <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">Every point has a story.</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`min-h-11 border px-4 font-display text-xs tracking-widest uppercase ${
              filter === f ? "border-heat bg-heat text-navy" : "border-line hover:border-heat hover:text-heat"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {shown.length ? (
        <ul className="mt-8 max-w-3xl">
          {shown.map((row) => (
            <TapeRow key={row.id} row={row} />
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-sm text-muted">Nothing in this filter yet.</p>
      )}
    </section>
  );
}
