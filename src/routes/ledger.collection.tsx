import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { claimFleshPass, getLedger } from "@/lib/house/rewards";
import { HeatButton } from "@/components/site/chrome";

export const Route = createFileRoute("/ledger/collection")({ component: CollectionPage });

const PERKS = [
  "Member pricing on the atelier and academy",
  "FLESH Points on every settle",
  "Priority on live blocks",
  "The mark as a house file, not a market token",
];

function CollectionPage() {
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
      toast.error(err instanceof Error ? err.message : "The mark would not mint.");
    } finally {
      setBusy(false);
    }
  }

  if (!data) {
    return <div className="grid min-h-[50vh] place-items-center text-muted">Opening the collection…</div>;
  }

  const pass = data.pass;

  return (
    <section className="px-5 py-12 md:px-8">
      <p className="font-display text-xs tracking-widest text-heat uppercase">The collection</p>
      <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">Keep what is yours.</h1>

      <div className="mt-10 grid gap-px bg-line lg:grid-cols-12">
        <div className="relative min-h-80 overflow-hidden bg-navy p-8 lg:col-span-7">
          <img src="/logo.png" alt="" className="pointer-events-none absolute top-8 right-8 w-28 opacity-80" />
          <p className="font-display text-xs tracking-widest text-heat uppercase">FLESH Pass</p>
          <h2 className="mt-6 font-display text-4xl tracking-wide uppercase">
            {data.plan ? `${data.plan} mark` : "Unclaimed"}
          </h2>
          <p className="mt-8 font-display text-xl tracking-widest uppercase">{pass?.pass_number}</p>
          {pass?.token_id ? (
            <p className="mt-4 text-xs text-muted">Token {pass.token_id}</p>
          ) : null}
          <div className="mt-10">
            {pass?.claimed ? (
              <p className="font-display text-xs tracking-widest text-heat uppercase">On the file</p>
            ) : pass?.eligible ? (
              <HeatButton type="button" disabled={busy} onClick={claim}>
                {busy ? "Minting…" : "Claim your pass"}
              </HeatButton>
            ) : (
              <Link to="/pass" className="font-display text-xs tracking-widest text-heat uppercase">
                Take a house pass first
              </Link>
            )}
          </div>
        </div>
        <div className="bg-void p-8 lg:col-span-5">
          <p className="font-display text-xs tracking-widest text-heat uppercase">What the pass unlocks</p>
          <ul className="mt-6">
            {PERKS.map((p) => (
              <li key={p} className="border-t border-line py-4 text-sm">
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs leading-relaxed text-muted">
            The mint is a house ledger on a mock chain. You do not need to manage a token to use the
            benefits. Nothing here is for sale as a speculative asset.
          </p>
        </div>
      </div>

      <div className="mt-12 border border-dashed border-line p-8">
        <p className="font-display text-xs tracking-widest text-heat uppercase">Coming</p>
        <h2 className="mt-3 font-display text-3xl tracking-wide uppercase">Collectibles</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          Limited house objects will land here. You hold {data.points.collectibles} so far.
        </p>
      </div>
    </section>
  );
}
