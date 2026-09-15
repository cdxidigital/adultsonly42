import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { getCourse, getCourseReader } from "@/lib/house/shop";
import { aud, isUnauthorized } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/academy/$slug")({ component: CoursePage });

function CoursePage() {
  const { slug } = Route.useParams();
  const { user } = useCurrentUserState();
  const [pack, setPack] = useState<Awaited<ReturnType<typeof getCourse>>>(undefined as never);
  const [reader, setReader] = useState<Awaited<ReturnType<typeof getCourseReader>> | null>(null);

  useEffect(() => {
    getCourse({ data: slug }).then(setPack).catch(() => setPack(null));
  }, [slug]);

  useEffect(() => {
    if (!user) {
      setReader(null);
      return;
    }
    getCourseReader({ data: slug })
      .then(setReader)
      .catch((err) => {
        if (!isUnauthorized(err)) setReader(null);
      });
  }, [slug, user]);

  if (pack === undefined) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the file…</div>
      </HouseChrome>
    );
  }
  if (!pack) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center px-5 pt-24">
          <p>No such seat.</p>
          <Link to="/academy" className="mt-4 text-heat">
            Academy
          </Link>
        </div>
      </HouseChrome>
    );
  }

  const enrolled = reader?.enrolled === true;

  return (
    <HouseChrome>
      <section className="grid pt-20 md:grid-cols-2">
        <img src={pack.product.image} alt="" className="h-72 w-full object-cover md:min-h-[70dvh] md:h-full" />
        <div className="flex flex-col justify-center px-5 py-12 md:px-12">
          <Link to="/academy" className="font-display text-xs tracking-widest text-heat uppercase">
            Academy
          </Link>
          <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">{pack.product.title}</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{pack.product.description}</p>
          <p className="mt-5 font-display text-3xl text-heat tabular-nums">{aud(pack.product.price_cents)}</p>
          <div className="mt-8">
            {enrolled ? (
              <p className="font-display text-xs tracking-widest text-heat uppercase">You hold this seat</p>
            ) : (
              <BuyButton productId={pack.product.id} label="Take this seat" />
            )}
          </div>
        </div>
      </section>
      <section className="border-t border-line px-5 py-12 md:px-12">
        <p className="font-display text-xs tracking-widest text-heat uppercase">Modules</p>
        <ol className="mt-8 space-y-8">
          {enrolled && reader
            ? reader.modules.map((m, i) => (
                <li key={m.id} className="border-t border-line pt-6">
                  <p className="font-display text-xs tracking-widest text-heat uppercase">0{i + 1}</p>
                  <h2 className="mt-2 font-display text-2xl tracking-wide uppercase">{m.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{m.body}</p>
                </li>
              ))
            : pack.modules.map((m, i) => (
                <li key={m.id} className="border-t border-line pt-6">
                  <p className="font-display text-xs tracking-widest text-heat uppercase">0{i + 1}</p>
                  <h2 className="mt-2 font-display text-2xl tracking-wide uppercase">{m.title}</h2>
                  <p className="mt-3 text-sm text-muted">Locked. The seat opens the file.</p>
                </li>
              ))}
        </ol>
      </section>
    </HouseChrome>
  );
}
