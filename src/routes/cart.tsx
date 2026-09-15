import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { HouseChrome, HeatButton, SignInHere } from "@/components/site/chrome";
import { addToCart, checkout, getCart, getDesk, setCartQty, type CartLine } from "@/lib/house/shop";
import { aud, isDiscountable, isUnauthorized, memberRate, planLabel } from "@/lib/house/money";
import { specLabel } from "@/lib/house/atelier";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { takeAdd } from "@/lib/house/pending";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [lines, setLines] = useState<CartLine[] | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [credits, setCredits] = useState(0);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const [c, d] = await Promise.all([getCart(), getDesk()]);
      setLines(c);
      setPlan(d.plan);
      setCredits(d.credits);
    } catch (err) {
      if (isUnauthorized(err)) return;
      toast.error("The tab would not open.");
      setLines([]);
    }
  }

  useEffect(() => {
    if (isPending || !user) return;
    const pending = takeAdd();
    if (pending) {
      addToCart({ data: { productId: pending.productId, qty: 1, spec: pending.spec } })
        .then(() => load())
        .catch(() => load());
      return;
    }
    void load();
  }, [isPending, user]);

  if (isPending) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the tab…</div>
      </HouseChrome>
    );
  }
  if (!user) return <SignInHere next="/cart" />;

  const rate = memberRate(plan);
  const subtotal = (lines ?? []).reduce((n, l) => {
    const discountable = isDiscountable(l.kind);
    const unit = discountable ? Math.round(l.price_cents * rate) : l.price_cents;
    return n + unit * l.qty;
  }, 0);
  const creditUsed = Math.min(credits, subtotal);
  const total = subtotal - creditUsed;

  async function settle() {
    setBusy(true);
    try {
      const res = await checkout();
      toast.success(`Settled ${aud(res.total)}.`);
      navigate({ to: "/desk" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not settle.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <HouseChrome>
      <section className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:px-8">
        <p className="font-display text-xs tracking-widest text-heat uppercase">The tab</p>
        <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">Cart</h1>
        {!lines || lines.length === 0 ? (
          <div className="mt-10">
            <p className="text-muted">Nothing on the tab.</p>
            <Link to="/atelier" className="mt-4 inline-block text-heat">
              Walk the floor
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-10">
              {lines.map((l) => {
                const discountable = isDiscountable(l.kind);
                const unit = discountable ? Math.round(l.price_cents * rate) : l.price_cents;
                return (
                  <li key={l.lineId} className="flex items-center gap-4 border-t border-line py-5">
                    <img src={l.image} alt="" className="size-20 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="font-display tracking-wide uppercase">{l.title}</p>
                      <p className="text-xs text-muted">
                        {specLabel(l.spec, l.id) || l.kind}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="size-11 border border-line"
                        onClick={() =>
                          setCartQty({ data: { lineId: l.lineId, qty: l.qty - 1 } }).then(load)
                        }
                      >
                        −
                      </button>
                      <span className="w-6 text-center tabular-nums">{l.qty}</span>
                      <button
                        type="button"
                        className="size-11 border border-line"
                        onClick={() =>
                          setCartQty({ data: { lineId: l.lineId, qty: l.qty + 1 } }).then(load)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="w-20 text-right font-display text-heat tabular-nums">{aud(unit * l.qty)}</p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 space-y-2 text-sm">
              {plan ? <p className="text-muted">{planLabel(plan)} pricing on the floor.</p> : null}
              {creditUsed > 0 ? <p className="text-muted">House credit {aud(creditUsed)}</p> : null}
              <p className="font-display text-3xl text-heat tabular-nums">{aud(total)}</p>
            </div>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-muted">
              The house tab posts the order in AUD so the tools unlock immediately. A card rail can sit in front of this later.
            </p>
            <HeatButton className="mt-6" disabled={busy} onClick={settle}>
              {busy ? "Settling…" : "Settle on the house tab"}
            </HeatButton>
          </>
        )}
      </section>
    </HouseChrome>
  );
}
