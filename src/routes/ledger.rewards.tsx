import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { getLedger, listFleshRewards, redeemReward, type FleshReward } from "@/lib/house/rewards";
import { HeatButton } from "@/components/site/chrome";

export const Route = createFileRoute("/ledger/rewards")({ component: ShelfPage });

function ShelfPage() {
  const [rewards, setRewards] = useState<FleshReward[]>([]);
  const [available, setAvailable] = useState(0);
  const [filter, setFilter] = useState("All");
  const [busy, setBusy] = useState<string | null>(null);

  function load() {
    listFleshRewards()
      .then(setRewards)
      .catch(() => setRewards([]));
    getLedger()
      .then((d) => setAvailable(d.points.available))
      .catch(() => setAvailable(0));
  }

  useEffect(() => {
    load();
  }, []);

  const cats = useMemo(
    () => ["All", ...Array.from(new Set(rewards.map((r) => r.category)))],
    [rewards],
  );
  const shown = rewards.filter((r) => filter === "All" || r.category === filter);

  async function unlock(id: string) {
    setBusy(id);
    try {
      const res = await redeemReward({
        data: {
          rewardId: id,
          idempotencyKey: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        },
      });
      toast.success(res.message);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "The shelf held the perk.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="px-5 py-12 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs tracking-widest text-heat uppercase">The shelf</p>
          <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">Spend it well.</h1>
        </div>
        <div className="border-t border-line pt-3">
          <p className="text-xs text-muted">Balance</p>
          <p className="font-display text-3xl text-heat tabular-nums">{available.toLocaleString("en-AU")}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`min-h-11 border px-4 font-display text-xs tracking-widest uppercase ${
              filter === c ? "border-heat bg-heat text-navy" : "border-line hover:border-heat hover:text-heat"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((r) => {
          const can = available >= r.points_cost && r.available;
          return (
            <article key={r.id} className="flex min-h-64 flex-col bg-void p-6">
              <p className="font-display text-xs tracking-widest text-heat uppercase">{r.category}</p>
              <h2 className="mt-4 font-display text-2xl tracking-wide uppercase">{r.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{r.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="font-display text-sm tabular-nums">{r.points_cost.toLocaleString("en-AU")} pts</p>
                <HeatButton type="button" disabled={!can || busy === r.id} onClick={() => unlock(r.id)}>
                  {!r.available ? "Gone" : !can ? "Need more" : busy === r.id ? "Unlocking…" : "Unlock"}
                </HeatButton>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
