import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { listProducts, type Product } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/pass")({ component: PassPage });

const PERKS: Record<string, string[]> = {
  "pass-member": [
    "Five percent off atelier, academy, and fees",
    "FLESH Points on every settle",
    "One ID across nights, OS, and the desk",
  ],
  "pass-black": [
    "Ten percent off the floor",
    "Academy library — every current seat",
    "Priority chat with the desk, no ads",
  ],
  "pass-patron": [
    "Twenty percent off",
    "$100 house credit on join",
    "Academy library + concierge routing to signed talent",
  ],
};

function PassPage() {
  const [plans, setPlans] = useState<Product[]>([]);
  const [credit, setCredit] = useState<Product | null>(null);

  useEffect(() => {
    listProducts({ data: "membership" })
      .then((rows) => setPlans(rows.filter((p) => p.id !== "pass-academy")))
      .catch(() => setPlans([]));
    listProducts({ data: "credit" })
      .then((rows) => setCredit(rows[0] ?? null))
      .catch(() => setCredit(null));
  }, []);

  return (
    <HouseChrome>
      <PageHero kicker="The pass" title={<>One ID.<br />Three doors.</>} image="/still-live.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Sesh, Sesh Black, and House. Pricing follows the file. House credit spends like cash in this room. The glue
          across atelier, academy, nights, and OS.
        </p>
      </PageHero>
      <section className="grid md:grid-cols-3">
        {plans.map((p) => (
          <article key={p.id} className="border-t border-line px-5 py-14 md:px-8">
            <p className="font-display text-xs tracking-widest text-heat uppercase">{p.subtitle}</p>
            <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">{p.title}</h2>
            <p className="mt-3 font-display text-3xl text-heat tabular-nums">{aud(p.price_cents)} / mo</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{p.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-ivory/80">
              {(PERKS[p.id] ?? []).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="mt-8">
              <BuyButton productId={p.id} label="Take this pass" />
            </div>
          </article>
        ))}
      </section>
      {credit ? (
        <section className="border-t border-line px-5 py-16 md:px-10">
          <p className="font-display text-xs tracking-widest text-heat uppercase">Ledger</p>
          <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">{credit.title}</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{credit.description}</p>
          <p className="mt-4 font-display text-2xl text-heat tabular-nums">{aud(credit.price_cents)}</p>
          <div className="mt-6">
            <BuyButton productId={credit.id} label="Credit the tab" />
          </div>
        </section>
      ) : null}
    </HouseChrome>
  );
}
