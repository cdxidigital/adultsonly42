import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { HouseChrome } from "@/components/site/chrome";
import { getTalent, type Talent } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/talent/$id")({ component: TalentProfile });

function TalentProfile() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Talent | null | undefined>(undefined);

  useEffect(() => {
    getTalent({ data: id }).then(setPerson).catch(() => setPerson(null));
  }, [id]);

  if (person === undefined) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the file…</div>
      </HouseChrome>
    );
  }
  if (!person) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center px-5 pt-24">Not on the roster.</div>
      </HouseChrome>
    );
  }

  return (
    <HouseChrome>
      <section className="grid min-h-dvh pt-20 md:grid-cols-2">
        <img src={person.image} alt="" className="h-80 w-full object-cover md:h-full" />
        <div className="flex flex-col justify-center px-5 py-12 md:px-12">
          <Link to="/talent" className="font-display text-xs tracking-widest text-heat uppercase">
            Roster
          </Link>
          <p className="mt-6 font-display text-xs tracking-widest text-heat uppercase">{person.pronouns}</p>
          <h1 className="mt-2 font-display text-5xl tracking-wide uppercase">{person.name}</h1>
          <p className="mt-2 text-muted">{person.role}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{person.bio}</p>
          <p className="mt-6 font-display text-3xl text-heat tabular-nums">{aud(person.day_rate_cents)} / day</p>
          <button
            type="button"
            className="mt-8 inline-flex min-h-12 w-fit items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase hover:bg-ivory"
            onClick={() => navigate({ to: "/apply", search: { talent: person.id } })}
          >
            Open a campaign brief
          </button>
        </div>
      </section>
    </HouseChrome>
  );
}
