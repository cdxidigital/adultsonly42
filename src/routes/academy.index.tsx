import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { listProducts, type Product } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";

export const Route = createFileRoute("/academy/")({ component: AcademyPage });

function AcademyPage() {
  const [courses, setCourses] = useState<Product[]>([]);

  useEffect(() => {
    listProducts({ data: "academy" }).then(setCourses).catch(() => setCourses([]));
  }, []);

  return (
    <HouseChrome>
      <PageHero kicker="03 — Academy" title={<>Knowledge<br />before heat.</>} image="/still-academy.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Paid seats. Educators, not coaches. Language, consent, and house craft — never real-time instruction of acts.
        </p>
      </PageHero>
      <section>
        {courses.map((c, i) => (
          <Link
            key={c.id}
            to="/academy/$slug"
            params={{ slug: c.slug }}
            className="grid border-t border-line md:grid-cols-[120px_1fr_auto] md:items-center"
          >
            <p className="px-5 pt-8 font-display text-xs tracking-widest text-heat uppercase md:px-8 md:pt-0">
              0{i + 1}
            </p>
            <div className="px-5 py-6 md:py-10">
              <h2 className="font-display text-3xl tracking-wide uppercase md:text-4xl">{c.title}</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{c.description}</p>
            </div>
            <p className="px-5 pb-8 font-display text-xl text-heat tabular-nums md:px-8 md:pb-0">
              {aud(c.price_cents)}
            </p>
          </Link>
        ))}
      </section>
      <section className="grid md:grid-cols-2">
        <Link to="/academy/exam" className="border-t border-line px-5 py-12 hover:bg-navy md:px-8">
          <p className="font-display text-xs tracking-widest text-heat uppercase">Certificate</p>
          <h2 className="mt-2 font-display text-3xl tracking-wide uppercase">House craft exam</h2>
          <p className="mt-3 max-w-md text-sm text-muted">Four questions. A$29. The badge sits on the desk.</p>
        </Link>
        <div className="border-t border-line px-5 py-12 md:px-8">
          <p className="font-display text-xs tracking-widest text-heat uppercase">Library</p>
          <h2 className="mt-2 font-display text-3xl tracking-wide uppercase">Every seat</h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Academy library A$19 / mo, or included in Sesh Black and House.
          </p>
          <div className="mt-6">
            <BuyButton productId="pass-academy" label="Open the library" />
          </div>
        </div>
      </section>
    </HouseChrome>
  );
}
