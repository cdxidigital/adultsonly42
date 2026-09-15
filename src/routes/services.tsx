import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { listProducts, type Product } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/services")({ component: ServicesPage });

function ServicesPage() {
  const [rows, setRows] = useState<Product[]>([]);
  useEffect(() => {
    listProducts({ data: "service" }).then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <HouseChrome>
      <PageHero kicker="Studio services" title={<>High ticket.<br />A file, not a vibe.</>} image="/still-talent.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Launch kits, capture days, takedowns. The house takes a file. Rooms hire by the hour. Lookbooks lease a
          likeness — signed talent only.
        </p>
      </PageHero>
      <section>
        {rows.map((p) => (
          <article key={p.id} className="grid border-t border-line md:grid-cols-[1fr_auto] md:items-center">
            <div className="px-5 py-10 md:px-10">
              <p className="font-display text-xs tracking-widest text-heat uppercase">{p.subtitle}</p>
              <h2 className="mt-2 font-display text-3xl tracking-wide uppercase">{p.title}</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{p.description}</p>
            </div>
            <div className="flex flex-col items-start gap-4 px-5 pb-10 md:items-end md:px-10 md:pb-0">
              <p className="font-display text-2xl text-heat tabular-nums">{aud(p.price_cents)}</p>
              <BuyButton productId={p.id} label="Open this job" />
            </div>
          </article>
        ))}
      </section>
      <section className="grid sm:grid-cols-3">
        {[
          { to: "/live" as const, t: "Rooms", d: "Capture days. Two-hour blocks. Directed stills." },
          { to: "/lookbook" as const, t: "Lookbooks", d: "Permissioned editorial likeness. A lease, not a person." },
          { to: "/apply" as const, t: "Briefs", d: "Campaigns, talent files, likeness commissions." },
        ].map((x) => (
          <Link key={x.to} to={x.to} className="border-t border-line px-5 py-12 hover:bg-navy md:px-8">
            <h3 className="font-display text-2xl tracking-wide uppercase">{x.t}</h3>
            <p className="mt-3 text-sm text-muted">{x.d}</p>
          </Link>
        ))}
      </section>
    </HouseChrome>
  );
}
