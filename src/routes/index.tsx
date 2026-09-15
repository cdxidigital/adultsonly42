import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome } from "@/components/site/chrome";
import { BrandLogo } from "@/components/site/brand-logo";
import { listProducts, type Product } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/")({ component: Home });

const MARQUEE = ["PASS", "ATELIER", "ACADEMY", "TALENT", "OS", "ATLAS", "NIGHTS", "LEDGER", "PERTH", "GENDER-FLUID"];

function Home() {
  const [drop, setDrop] = useState<Product[]>([]);

  useEffect(() => {
    listProducts({ data: "atelier" })
      .then((rows) => setDrop(rows.slice(0, 3)))
      .catch(() => setDrop([]));
  }, []);

  return (
    <HouseChrome>
      <section className="relative flex min-h-dvh items-end justify-center px-5 pb-16 pt-32">
        <img src="/still-lips.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-void via-void/40 to-navy/50" />
        <div className="relative flex flex-col items-center text-center">
          <p className="mb-4 font-display text-xs tracking-widest text-heat uppercase">
            Gender-fluid adult house · Perth
          </p>
          <BrandLogo variant="lockup" className="h-36 w-auto md:h-52" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/80">
            Membership, objects, seats, talent, tools, and an industry index — a ledger, not a landing page.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/pass"
              className="inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory"
            >
              Take a pass
            </Link>
            <Link
              to="/atelier"
              className="inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
            >
              This drop
            </Link>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-line bg-navy py-3" aria-hidden="true">
        <div className="marquee-track flex w-max gap-9 font-display text-xs tracking-widest text-heat uppercase">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="flex items-center gap-9">
              {w}
              <i className="size-1.5 rounded-full bg-ivory/30" />
            </span>
          ))}
        </div>
      </div>

      <section className="grid md:grid-cols-2">
        <img src="/hero-corridor.jpg" alt="" className="h-80 w-full object-cover md:h-auto" />
        <div className="flex flex-col justify-center bg-navy px-5 py-16 md:px-12">
          <p className="font-display text-xs tracking-widest text-heat uppercase">The identity</p>
          <h2 className="mt-3 font-display text-4xl tracking-wide uppercase md:text-6xl">
            Not a side.
            <br />
            The house.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            Gender-fluid by design. The mark does not pick a gender and neither does the roster,
            the rooms, or the tab. Four desks take money. One ledger holds it.
          </p>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4">
        {[
          { n: "01", to: "/talent" as const, t: "Talent", d: "Day rates. Campaign deposits. Signed bodies only." },
          { n: "02", to: "/os" as const, t: "OS", d: "Storefront, calendar, leak watch, BAS pack." },
          { n: "03", to: "/atlas" as const, t: "Atlas", d: "The trade, indexed. Compile a dossier from live identifiers." },
          { n: "04", to: "/academy" as const, t: "Academy", d: "Paid seats. Identity, consent, house craft." },
          { n: "05", to: "/nights" as const, t: "Nights", d: "Perth doors. Tickets and featured slots." },
          { n: "06", to: "/lookbook" as const, t: "Lookbook", d: "Permissioned editorial likeness. A lease." },
          { n: "07", to: "/services" as const, t: "Services", d: "Launch kits, capture days, takedowns." },
          { n: "08", to: "/ledger" as const, t: "Ledger", d: "FLESH Points. Rewards. A pass you can claim." },
        ].map((h) => (
          <Link
            key={h.n}
            to={h.to}
            className="border-t border-line px-5 py-12 transition-colors hover:bg-navy md:px-8"
          >
            <p className="font-display text-xs tracking-widest text-heat uppercase">{h.n}</p>
            <h3 className="mt-3 font-display text-3xl tracking-wide uppercase">{h.t}</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{h.d}</p>
          </Link>
        ))}
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs tracking-widest text-heat uppercase">Atelier</p>
            <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">This drop</h2>
          </div>
          <Link to="/atelier" className="font-display text-xs tracking-widest text-heat uppercase">
            Full floor
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {drop.map((p) => (
            <Link key={p.id} to="/atelier/$slug" params={{ slug: p.slug }} className="group">
              <div className="aspect-portrait overflow-hidden bg-navy">
                <img
                  src={p.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <p className="font-display text-sm tracking-wide uppercase">{p.title}</p>
                <p className="font-display text-sm text-heat tabular-nums">{aud(p.price_cents)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid place-items-center px-5 py-24 text-center">
        <p className="font-display text-xs tracking-widest text-heat uppercase">The door is open</p>
        <h2 className="mt-3 font-display text-5xl tracking-wide uppercase md:text-7xl">
          Come in
          <br />
          as you are.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/pass"
            className="inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory"
          >
            House pass
          </Link>
          <Link
            to="/join"
            className="inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
          >
            Open a file
          </Link>
        </div>
      </section>
    </HouseChrome>
  );
}
