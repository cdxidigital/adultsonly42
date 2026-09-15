import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { listTwins, type TwinRow } from "@/lib/house/ops";
import { listProducts, type Product } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/lookbook/")({ component: LookbookPage });

function LookbookPage() {
  const [twins, setTwins] = useState<TwinRow[]>([]);
  const [builds, setBuilds] = useState<Product[]>([]);

  useEffect(() => {
    listTwins().then(setTwins).catch(() => setTwins([]));
    listProducts({ data: "twin" })
      .then((rows) => setBuilds(rows.filter((p) => p.id === "twin-build" || p.id === "twin-exclusive")))
      .catch(() => setBuilds([]));
  }, []);

  return (
    <HouseChrome>
      <PageHero kicker="Lookbook" title={<>A lease,<br />not a person.</>} image="/still-talent.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Permissioned editorial likeness for signed talent only. Written, dated authorization. Withdrawal ends the
          work. No walk-up sessions. No clones of anyone who did not sign.
        </p>
      </PageHero>
      <section>
        {twins.length === 0 ? (
          <p className="border-t border-line px-5 py-12 text-sm text-muted md:px-10">
            No live lookbooks on the floor.
          </p>
        ) : null}
        {twins.map((t) => (
          <Link
            key={t.id}
            to="/lookbook/$id"
            params={{ id: t.id }}
            className="grid border-t border-line md:grid-cols-2"
          >
            <img src={t.image} alt="" className="h-64 w-full object-cover md:h-80" />
            <div className="flex flex-col justify-center px-5 py-8 md:px-10">
              <p className="font-display text-xs tracking-widest text-heat uppercase">{t.pronouns}</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">{t.title}</h2>
              <p className="mt-1 text-sm text-muted">{t.talent_name}</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{t.blurb}</p>
              <p className="mt-4 font-display text-xl text-heat tabular-nums">{aud(t.price_cents)} / mo</p>
            </div>
          </Link>
        ))}
      </section>
      <section className="grid md:grid-cols-2">
        {builds.map((p) => (
          <article key={p.id} className="border-t border-line px-5 py-14 md:px-10">
            <p className="font-display text-xs tracking-widest text-heat uppercase">{p.subtitle}</p>
            <h2 className="mt-2 font-display text-3xl tracking-wide uppercase">{p.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
            <p className="mt-4 font-display text-2xl text-heat tabular-nums">{aud(p.price_cents)}</p>
            <div className="mt-6">
              <BuyButton productId={p.id} label="Open this file" />
            </div>
          </article>
        ))}
      </section>
    </HouseChrome>
  );
}
