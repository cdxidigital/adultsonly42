import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { connectWallet, getLedger, type FleshWallet } from "@/lib/house/rewards";
import { HeatButton } from "@/components/site/chrome";

export const Route = createFileRoute("/ledger/wallet")({ component: WalletPage });

function WalletPage() {
  const [wallet, setWallet] = useState<FleshWallet | null>(null);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState<"Ethereum" | "Polygon" | "Base">("Base");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getLedger()
      .then((d) => setWallet(d.wallet))
      .catch(() => setWallet(null));
  }, []);

  async function copy() {
    if (!wallet?.address) return;
    try {
      await navigator.clipboard.writeText(wallet.address);
      toast.success("Address copied.");
    } catch {
      toast.error("Could not copy.");
    }
  }

  async function connect(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const next = await connectWallet({ data: { address: address.trim(), network } });
      setWallet(next);
      toast.success("External wallet on the file.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "That address would not hold.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="px-5 py-12 md:px-8">
      <p className="font-display text-xs tracking-widest text-heat uppercase">The wallet</p>
      <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">Keep it simple.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        An embedded house wallet is enough. Connect an external address only if you want the pass to
        travel with you.
      </p>

      <div className="mt-10 grid gap-px bg-line lg:grid-cols-12">
        <div className="bg-navy p-8 lg:col-span-7">
          <p className="font-display text-xs tracking-widest text-heat uppercase">Current</p>
          <h2 className="mt-4 font-display text-3xl tracking-wide uppercase">
            {wallet?.wallet_type ?? "Embedded wallet"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {wallet?.provider} · {wallet?.network}
          </p>
          <p className="mt-10 break-all font-display text-xs tracking-widest text-ivory/80 uppercase">
            {wallet?.address ?? "An address writes when the file opens."}
          </p>
          {wallet?.address ? (
            <button
              type="button"
              onClick={copy}
              className="mt-6 font-display text-xs tracking-widest text-heat uppercase"
            >
              Copy address
            </button>
          ) : null}
        </div>
        <form onSubmit={connect} className="space-y-5 bg-void p-8 lg:col-span-5">
          <p className="font-display text-xs tracking-widest text-heat uppercase">External</p>
          <h2 className="font-display text-2xl tracking-wide uppercase">Connect another</h2>
          <label className="block font-display text-xs tracking-widest uppercase">
            Address
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x…"
              className="mt-2 block w-full border-b border-line bg-transparent py-3 font-sans text-sm tracking-normal normal-case"
            />
          </label>
          <label className="block font-display text-xs tracking-widest uppercase">
            Network
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value as typeof network)}
              className="mt-2 block w-full border-b border-line bg-transparent py-3 font-sans text-sm tracking-normal normal-case"
            >
              <option value="Base" className="bg-navy">
                Base
              </option>
              <option value="Ethereum" className="bg-navy">
                Ethereum
              </option>
              <option value="Polygon" className="bg-navy">
                Polygon
              </option>
            </select>
          </label>
          <HeatButton type="submit" disabled={busy}>
            {busy ? "Connecting…" : "Connect wallet"}
          </HeatButton>
        </form>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          { t: "Protected", d: "The embedded wallet is managed by the house." },
          { t: "No homework", d: "You never have to pick a chain to spend points." },
          { t: "No surprise fees", d: "Redemptions settle on the house ledger." },
        ].map((x) => (
          <div key={x.t} className="border-t border-line pt-4">
            <h3 className="font-display text-lg tracking-wide uppercase">{x.t}</h3>
            <p className="mt-2 text-sm text-muted">{x.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
