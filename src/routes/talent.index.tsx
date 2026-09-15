import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { listTalent, type Talent } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/talent/")({ component: TalentPage });

function TalentPage() {
  const [roster, setRoster] = useState<Talent[]>([]);

  useEffect(() => {
    listTalent().then(setRoster).catch(() => setRoster([]));
  }, []);

  return (
    <HouseChrome>
      <PageHero kicker="01 — Talent" title={<>Every body<br />that consents.</>} image="/still-talent.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Signed adult talent. Day rates in AUD. Campaign deposits open a brief. If they are not on this list, they are not available.
        </p>
        <Link
          to="/join"
          className="mt-6 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase"
        >
          Open a talent file
        </Link>
      </PageHero>
      <section>
        {roster.map((t) => (
          <Link
            key={t.id}
            to="/talent/$id"
            params={{ id: t.id }}
            className="grid border-t border-line md:grid-cols-2"
          >
            <img src={t.image} alt="" className="h-64 w-full object-cover md:h-80" />
            <div className="flex flex-col justify-center px-5 py-8 md:px-10">
              <p className="font-display text-xs tracking-widest text-heat uppercase">{t.pronouns}</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide uppercase">{t.name}</h2>
              <p className="mt-1 text-sm text-muted">{t.role}</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{t.bio}</p>
              <p className="mt-4 font-display text-xl text-heat tabular-nums">{aud(t.day_rate_cents)} / day</p>
            </div>
          </Link>
        ))}
      </section>
      <section className="grid place-items-center px-5 py-20 text-center">
        <p className="font-display text-xs tracking-widest text-heat uppercase">Roster</p>
        <h2 className="mt-3 font-display text-4xl tracking-wide uppercase">Want a file?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/apply"
            className="inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase"
          >
            Apply / brief
          </Link>
          <Link
            to="/lookbook"
            className="inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
          >
            Lookbook
          </Link>
          <Link
            to="/atlas"
            className="inline-flex min-h-12 items-center border border-line px-6 font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
          >
            Atlas
          </Link>
        </div>
      </section>
    </HouseChrome>
  );
}
