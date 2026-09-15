import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { getCreatorOs } from "@/lib/house/ops";
import { listProducts, type Product } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/os/")({ component: OsPage });

const PERKS: Record<string, string[]> = {
  "os-lite": ["Named public storefront", "Bio, links, a menu", "View and click counts", "Zero take on money you process elsewhere"],
  "os-pro": ["Everything in Lite", "Posting calendar (X, Reddit, Telegram, site)", "Leak watch toggle", "The week, in order"],
  "os-studio": ["Everything in Pro", "BAS-ready tax pack from the house tab", "Built for more than one name", "Undercuts a fifty-percent agency"],
};

function OsPage() {
  const { user } = useCurrentUserState();
  const [plans, setPlans] = useState<Product[]>([]);
  const [mine, setMine] = useState<string | null>(null);

  useEffect(() => {
    listProducts({ data: "os" }).then(setPlans).catch(() => setPlans([]));
  }, []);

  useEffect(() => {
    if (!user) return;
    getCreatorOs()
      .then((d) => setMine(d.os?.plan ?? null))
      .catch(() => setMine(null));
  }, [user]);

  return (
    <HouseChrome>
      <PageHero kicker="Creator OS" title={<>Tools, not a tube.</>} image="/still-hands.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          A storefront with your name. Scheduling, a leak watch, a BAS pack. Models already pay agencies twenty to
          fifty percent. This is cheaper, and it sits on the same ledger.
        </p>
        {mine ? (
          <Link
            to="/os/desk"
            className="mt-6 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase"
          >
            Open your OS · {mine}
          </Link>
        ) : null}
      </PageHero>
      <section className="grid md:grid-cols-3">
        {plans.map((p) => (
          <article key={p.id} className="border-t border-line px-5 py-14 md:px-8">
            <p className="font-display text-xs tracking-widest text-heat uppercase">{p.subtitle}</p>
            <h2 className="mt-2 font-display text-3xl tracking-wide uppercase">{p.title}</h2>
            <p className="mt-3 font-display text-3xl text-heat tabular-nums">{aud(p.price_cents)} / mo</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-ivory/80">
              {(PERKS[p.id] ?? []).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="mt-8">
              {mine === p.id.replace("os-", "") ? (
                <Link to="/os/desk" className="font-display text-xs tracking-widest text-heat uppercase">
                  You hold this desk
                </Link>
              ) : (
                <BuyButton productId={p.id} label="Take this desk" />
              )}
            </div>
          </article>
        ))}
      </section>
    </HouseChrome>
  );
}
