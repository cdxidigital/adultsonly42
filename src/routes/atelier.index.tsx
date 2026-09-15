import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { listProducts, type Product } from "@/lib/house/shop";
import { specSchema } from "@/lib/house/atelier";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/atelier/")({ component: AtelierPage });

function AtelierPage() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    listProducts({ data: "atelier" }).then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <HouseChrome>
      <PageHero kicker="04 — Atelier" title={<>Objects with<br />authorship.</>} image="/still-atelier.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Cut to the file. Size is a letter, not a gender. A name goes on the object if you want it there. Member
          pricing lands at the tab.
        </p>
      </PageHero>
      <section className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Link
            key={p.id}
            to="/atelier/$slug"
            params={{ slug: p.slug }}
            className="border-t border-line p-5 md:p-6"
          >
            <div className="aspect-portrait overflow-hidden bg-navy outline outline-ivory/10 -outline-offset-1">
              <img src={p.image} alt="" className="size-full object-cover" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg tracking-wide uppercase">{p.title}</p>
                <p className="text-xs text-muted">{p.subtitle}</p>
              </div>
              <p className="font-display text-heat tabular-nums">{aud(p.price_cents)}</p>
            </div>
            <p className="mt-2 text-xs text-muted">
              {(() => {
                const custom = specSchema(p.id);
                if (custom?.madeToOrder || p.inventory === null) return "Made to order";
                if (custom) return "Cut to the file";
                return `${p.inventory} left`;
              })()}
            </p>
          </Link>
        ))}
      </section>
    </HouseChrome>
  );
}
