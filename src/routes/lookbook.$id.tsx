import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { getTwin, type TwinRow } from "@/lib/house/ops";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/lookbook/$id")({ component: TwinPage });

function TwinPage() {
  const { id } = Route.useParams();
  const [row, setRow] = useState<TwinRow | null | undefined>(undefined);

  useEffect(() => {
    getTwin({ data: id }).then(setRow).catch(() => setRow(null));
  }, [id]);

  if (row === undefined) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the lookbook…</div>
      </HouseChrome>
    );
  }
  if (!row) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center px-5 pt-24">
          <p>Not on the lookbook.</p>
          <Link to="/lookbook" className="mt-4 text-heat">
            Lookbook
          </Link>
        </div>
      </HouseChrome>
    );
  }

  return (
    <HouseChrome>
      <section className="grid pt-20 md:grid-cols-2">
        <img src={row.image} alt="" className="h-80 w-full object-cover md:min-h-[70dvh] md:h-full" />
        <div className="flex flex-col justify-center px-5 py-12 md:px-12">
          <Link to="/lookbook" className="font-display text-xs tracking-widest text-heat uppercase">
            Lookbook
          </Link>
          <p className="mt-6 font-display text-xs tracking-widest text-heat uppercase">{row.pronouns}</p>
          <h1 className="mt-2 font-display text-5xl tracking-wide uppercase">{row.title}</h1>
          <p className="mt-2 text-muted">{row.talent_name}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{row.blurb}</p>
          <p className="mt-6 font-display text-3xl text-heat tabular-nums">{aud(row.price_cents)} / mo</p>
          <div className="mt-8">
            <BuyButton productId={row.product_id} label="Lease this lookbook" />
          </div>
          <Link
            to="/talent/$id"
            params={{ id: row.talent_id }}
            className="mt-6 font-display text-xs tracking-widest uppercase hover:text-heat"
          >
            Talent file →
          </Link>
        </div>
      </section>
    </HouseChrome>
  );
}
