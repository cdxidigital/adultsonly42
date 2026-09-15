import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#houses", label: "Houses" },
  { href: "#code", label: "Code" },
  { href: "#contact", label: "Enter" },
];

const HOUSES = [
  {
    n: "01",
    id: "talent",
    title: "Talent",
    kicker: "The roster is the brand.",
    copy: "Signed adult talent only. Campaigns, likeness, and management with explicit permission. If you are not on the roster, you are not spoken for.",
    img: "/still-talent.jpg",
    cta: { href: "mailto:models@fleshsesh.com", label: "Model desk" },
  },
  {
    n: "02",
    id: "live",
    title: "Live",
    kicker: "Rooms, not inventory.",
    copy: "Directed live rooms for signed performers. Presence over thumbnails. Heat with a door policy.",
    img: "/still-live.jpg",
    cta: { href: "mailto:enquiries@fleshsesh.com", label: "Room desk" },
  },
  {
    n: "03",
    id: "academy",
    title: "Academy",
    kicker: "Knowledge before performance.",
    copy: "Consent-first adult education. Communication, identity, kink literacy. Educators — not coaches for real-time acts.",
    img: "/still-academy.jpg",
    cta: { href: "mailto:enquiries@fleshsesh.com", label: "Academy desk" },
  },
  {
    n: "04",
    id: "atelier",
    title: "Atelier",
    kicker: "Objects with authorship.",
    copy: "Selected retail and commissioned stills. Same eye as the rest of the house. Virtual twins only for permitted, signed talent.",
    img: "/still-atelier.jpg",
    cta: { href: "mailto:enquiries@fleshsesh.com", label: "Studio desk" },
  },
];

const MARQUEE = ["TALENT", "LIVE", "ACADEMY", "ATELIER", "PERTH"];

export function HouseSite() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative bg-void text-ivory">
      <div className="grain" />

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="block w-28 md:w-32" aria-label="fleshsesh home">
          <BrandLogo className="w-full drop-shadow-lg" />
        </a>
        <nav className="hidden items-center gap-7 font-display text-xs tracking-widest uppercase md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-ivory/80 hover:text-heat">
              {item.label}
            </a>
          ))}
          <a
            href="mailto:models@fleshsesh.com"
            className="border border-heat px-3 py-2 text-heat hover:bg-heat hover:text-navy"
          >
            Talent
          </a>
        </nav>
        <button
          type="button"
          className="flex size-11 items-center justify-center text-ivory md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 flex flex-col justify-end bg-navy/95 px-6 pb-12 pt-24 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 font-display text-3xl tracking-wide uppercase"
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:models@fleshsesh.com"
            className="mt-8 bg-heat py-4 text-center font-display tracking-widest text-navy uppercase"
          >
            Talent desk
          </a>
        </div>
      ) : null}

      <main id="top">
        <section className="relative flex min-h-dvh items-end overflow-hidden">
          <img
            src="/hero-corridor.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-void via-navy/50 to-navy/30" />
          <div className="relative z-10 flex w-full flex-col items-center px-5 pb-16 pt-28">
            <p className="mb-4 font-display text-xs tracking-widest text-heat uppercase">
              Adult lifestyle house · Perth
            </p>
            <BrandLogo className="w-full max-w-sm drop-shadow-2xl" />
            <p className="mt-6 max-w-xs text-center text-sm text-ivory/80">
              Modern. Edgy. Built for heat with taste.
            </p>
          </div>
        </section>

        <div className="overflow-hidden border-y border-line bg-navy py-3">
          <div className="marquee-track flex w-max gap-10 font-display text-sm tracking-widest text-heat uppercase">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-10">
                {item}
                <span className="inline-block size-1.5 rounded-full bg-ivory/40" />
              </span>
            ))}
          </div>
        </div>

        <section className="grid md:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden md:min-h-dvh">
            <img src="/still-lips.jpg" alt="" className="absolute inset-0 size-full object-cover" />
          </div>
          <div className="flex flex-col justify-center bg-navy px-6 py-16 md:px-14">
            <p className="font-display text-xs tracking-widest text-heat uppercase">The mark</p>
            <h2 className="mt-4 font-display text-4xl leading-none tracking-wide text-ivory uppercase md:text-6xl">
              The original
              <br />
              lips stay.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Same wordmark. Same curves. The house just got sharper — less flyer,
              more campaign. Desire as craft, not as clutter.
            </p>
          </div>
        </section>

        <section id="houses">
          {HOUSES.map((house, i) => (
            <article
              key={house.id}
              className={cn(
                "grid min-h-dvh md:grid-cols-2",
                i % 2 === 1 && "md:[&>div:first-child]:order-2",
              )}
            >
              <div className="relative min-h-96 overflow-hidden">
                <img
                  src={house.img}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/20" />
              </div>
              <div className="flex flex-col justify-center border-t border-line px-6 py-16 md:border-t-0 md:px-14">
                <p className="font-display text-xs tracking-widest text-heat uppercase">
                  {house.n} — {house.title}
                </p>
                <h3 className="mt-4 font-display text-4xl leading-none tracking-wide uppercase md:text-6xl">
                  {house.kicker}
                </h3>
                <p className="mt-6 max-w-md leading-relaxed text-muted">{house.copy}</p>
                <a
                  href={house.cta.href}
                  className="mt-8 inline-flex min-h-12 w-fit items-center border border-heat px-6 font-display text-xs tracking-widest text-heat uppercase hover:bg-heat hover:text-navy"
                >
                  {house.cta.label}
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="relative min-h-[70vh] overflow-hidden" id="code">
          <img src="/still-hands.jpg" alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-navy/75" />
          <div className="relative z-10 grid gap-10 px-6 py-24 md:grid-cols-3 md:px-14">
            {[
              {
                t: "Consent is architecture",
                b: "Informed, ongoing, revocable. It structures contracts, likeness, rooms, and curriculum.",
              },
              {
                t: "Adults only. Always.",
                b: "Eighteen and over. No ambiguity. Age is the first door, not a footer line.",
              },
              {
                t: "Heat can be elegant",
                b: "Adult does not have to look cheap. Flesh is the subject. Taste is the method.",
              },
            ].map((item) => (
              <div key={item.t} className="border-t border-heat/50 pt-6">
                <h4 className="font-display text-2xl tracking-wide text-ivory uppercase">{item.t}</h4>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">{item.b}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="flex min-h-[80vh] flex-col items-center justify-center bg-void px-6 py-24 text-center"
        >
          <BrandLogo className="mb-8 w-40 md:w-52" />
          <p className="font-display text-xs tracking-widest text-heat uppercase">The door is open</p>
          <h2 className="mt-4 font-display text-5xl leading-none tracking-wide uppercase md:text-8xl">
            Come in
            <br />
            properly.
          </h2>
          <p className="mt-6 max-w-md text-muted">
            Talent to models@fleshsesh.com. Everything else to enquiries@fleshsesh.com.
          </p>
          <div className="mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:models@fleshsesh.com"
              className="min-h-12 bg-heat px-8 py-3 font-display text-sm tracking-widest text-navy uppercase hover:bg-ivory"
            >
              Join the roster
            </a>
            <a
              href="mailto:enquiries@fleshsesh.com"
              className="flex min-h-12 items-center justify-center border border-line px-8 py-3 font-display text-sm tracking-widest uppercase hover:border-heat hover:text-heat"
            >
              General enquiry
            </a>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-4 border-t border-line px-6 py-8 text-xs tracking-wide text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <span>© {new Date().getFullYear()} fleshsesh · Perth</span>
        <span>18+ · No explicit media on this domain</span>
        <span className="flex gap-4">
          <a href="mailto:enquiries@fleshsesh.com" className="hover:text-heat">
            enquiries
          </a>
          <a href="mailto:models@fleshsesh.com" className="hover:text-heat">
            models
          </a>
        </span>
      </footer>
    </div>
  );
}
