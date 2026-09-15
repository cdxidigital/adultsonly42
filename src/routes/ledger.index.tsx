import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { claimFleshPass, getLedger, type FleshActivity } from "@/lib/house/rewards";
import { HeatButton } from "@/components/site/chrome";

export const Route = createFileRoute("/ledger/")({ component: LedgerHome });

function pts(n: number) {
  return n.toLocaleString("en-AU");
}

function LedgerHome() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getLedger>> | null>(null);
  const [busy, setBusy] = useState(false);

  function load() {
    getLedger()
      .then(setData)
      .catch(() => setData(null));
  }

  useEffect(() => {
    load();
  }, []);

  async function claim() {
    setBusy(true);
    try {
      const res = await claimFleshPass({
        data: { idempotencyKey: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
      });
      toast.success(res.message);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "The pass would not mint.");
    } finally {
      setBusy(false);
    }
  }

  if (!data) {
    return <div className="grid min-h-[50vh] place-items-center text-muted">Reading the file…</div>;
  }

  const recent = data.activity.slice(0, 5);

  return (
    <section className="px-5 py-12 md:px-8">
      <p className="font-display text-xs tracking-widest text-heat uppercase">The ledger</p>
      <h1 className="mt-3 font-display text-5xl tracking-wide uppercase md:text-6xl">
        FLESH
        <br />
        Points.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        Ten points per dollar on the tab. Membership, seats, rooms, and files all write here. Spend them on
        credit, a Member month, or the mark.
      </p>

      <div className="mt-10 grid gap-px bg-line md:grid-cols-12">
        <div className="bg-navy p-8 md:col-span-7">
          <p className="font-display text-xs tracking-widest text-heat uppercase">Available</p>
          <p className="mt-4 font-display text-6xl tracking-wide text-heat tabular-nums md:text-7xl">
            {pts(data.points.available)}
          </p>
          <div className="mt-8 flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-xs text-muted">Pending</p>
              <p className="mt-1 font-display text-xl tabular-nums">{pts(data.points.pending)}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Lifetime</p>
              <p className="mt-1 font-display text-xl tabular-nums">{pts(data.points.lifetime_earned)}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Spent</p>
              <p className="mt-1 font-display text-xl tabular-nums">{pts(data.points.lifetime_spent)}</p>
            </div>
          </div>
          <Link
            to="/ledger/rewards"
            className="mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory"
          >
            Spend points
          </Link>
        </div>
        <div className="bg-void p-8 md:col-span-5">
          <p className="font-display text-xs tracking-widest text-heat uppercase">FLESH Pass</p>
          <h2 className="mt-4 font-display text-3xl tracking-wide uppercase">
            {data.plan ? `${data.plan} file` : "No pass yet"}
          </h2>
          <p className="mt-2 font-display text-xs tracking-widest text-muted uppercase">
            {data.pass?.pass_number}
          </p>
          <p className="mt-6 text-sm text-muted">
            {data.pass?.claimed
              ? "The mark is on the collection."
              : data.pass?.eligible
                ? "Eligible to claim. The mint is a house ledger — not a market."
                : "Hold a House Pass, then claim the mark."}
          </p>
          <div className="mt-6">
            {data.pass?.claimed ? (
              <p className="font-display text-xs tracking-widest text-heat uppercase">Claimed</p>
            ) : data.pass?.eligible ? (
              <HeatButton type="button" disabled={busy} onClick={claim}>
                {busy ? "Minting…" : "Claim pass"}
              </HeatButton>
            ) : (
              <Link to="/pass" className="font-display text-xs tracking-widest text-heat uppercase">
                Take a house pass
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <div className="border-t border-line pt-4">
          <p className="text-xs text-muted">Collectibles</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{data.points.collectibles}</p>
        </div>
        <div className="border-t border-line pt-4">
          <p className="text-xs text-muted">Wallet</p>
          <p className="mt-1 font-display text-xl uppercase">{data.wallet?.wallet_type ?? "—"}</p>
        </div>
        <div className="border-t border-line pt-4">
          <p className="text-xs text-muted">Network</p>
          <p className="mt-1 font-display text-xl uppercase">{data.wallet?.network ?? "Base"}</p>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl tracking-wide uppercase">Recent tape</h2>
          <Link to="/ledger/activity" className="font-display text-xs tracking-widest text-heat uppercase">
            Full tape
          </Link>
        </div>
        {recent.length ? (
          <ul className="mt-4">
            {recent.map((row) => (
              <TapeRow key={row.id} row={row} />
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">Settle a tab and the first line writes itself.</p>
        )}
      </div>
    </section>
  );
}

export function TapeRow({ row }: { row: FleshActivity }) {
  const up = row.amount > 0;
  return (
    <li className="flex items-baseline justify-between gap-4 border-t border-line py-4 text-sm">
      <div>
        <p>{row.label}</p>
        <p className="mt-1 text-xs tracking-wide text-muted uppercase">{row.state}</p>
      </div>
      <span className={`font-display tabular-nums ${up ? "text-heat" : "text-muted"}`}>
        {up ? "+" : ""}
        {row.amount.toLocaleString("en-AU")}
      </span>
    </li>
  );
}
