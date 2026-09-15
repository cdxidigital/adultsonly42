import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { listNights, type NightRow } from "@/lib/house/ops";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/nights")({ component: NightsPage });

function NightsPage() {
  const [nights, setNights] = useState<NightRow[]>([]);
  useEffect(() => {
    listNights().then(setNights).catch(() => setNights([]));
  }, []);

  return (
    <HouseChrome>
      <PageHero kicker="Nights" title={<>A door<br />with a date.</>} image="/still-live.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Perth first. A ticket holds a name. Featured slots are for clubs, drops, and house collabs — not a
          classifieds board.
        </p>
      </PageHero>
      <section>
        {nights.map((n) => (
          <article key={n.id} className="grid border-t border-line md:grid-cols-2">
            <img src={n.image} alt="" className="h-64 w-full object-cover md:h-80" />
            <div className="flex flex-col justify-center px-5 py-8 md:px-10">
              {n.featured ? (
                <p className="font-display text-xs tracking-widest text-heat uppercase">Featured</p>
              ) : (
                <p className="font-display text-xs tracking-widest text-muted uppercase">{n.city}</p>
              )}
              <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">{n.title}</h2>
              <p className="mt-1 text-sm text-muted">
                {n.venue} · {n.date}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{n.blurb}</p>
              <p className="mt-4 font-display text-xl text-heat tabular-nums">{aud(n.price_cents)}</p>
              <div className="mt-6">
                <BuyButton productId={n.product_id} label="Take a ticket" />
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="border-t border-line px-5 py-16 md:px-10">
        <p className="font-display text-xs tracking-widest text-heat uppercase">Placement</p>
        <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">Feature a night</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          Your name on this page for a week. Clubs and house collabs. The house does not sell escort ads.
        </p>
        <p className="mt-4 font-display text-2xl text-heat tabular-nums">{aud(49900)}</p>
        <div className="mt-6">
          <BuyButton productId="night-boost" label="Buy a featured slot" />
        </div>
      </section>
    </HouseChrome>
  );
}
