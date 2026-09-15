import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome } from "@/components/site/chrome";
import { getPublicStorefront, tapStorefrontLink, type CreatorOs } from "@/lib/house/ops";

export const Route = createFileRoute("/os/$handle")({ component: PublicStorefront });

function PublicStorefront() {
  const { handle } = Route.useParams();
  const [os, setOs] = useState<CreatorOs | null | undefined>(undefined);

  useEffect(() => {
    getPublicStorefront({ data: handle }).then(setOs).catch(() => setOs(null));
  }, [handle]);

  if (os === undefined) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the file…</div>
      </HouseChrome>
    );
  }
  if (!os) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center px-5 pt-24">
          <p>No such storefront.</p>
          <Link to="/os" className="mt-4 text-heat">
            Creator OS
          </Link>
        </div>
      </HouseChrome>
    );
  }

  return (
    <HouseChrome>
      <section className="mx-auto max-w-lg px-5 pt-28 pb-20">
        <p className="font-display text-xs tracking-widest text-heat uppercase">OS · {os.plan}</p>
        <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">{os.display_name || os.handle}</h1>
        <p className="mt-2 text-sm text-muted">@{os.handle}</p>
        {os.bio ? <p className="mt-6 text-sm leading-relaxed text-ivory/80">{os.bio}</p> : null}
        {os.links.length > 0 ? (
          <ul className="mt-8 space-y-2">
            {os.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href || "#"}
                  className="flex min-h-12 items-center justify-between border border-line px-4 hover:border-heat hover:text-heat"
                  onClick={() => {
                    void tapStorefrontLink({ data: os.handle });
                  }}
                >
                  <span className="font-display text-xs tracking-widest uppercase">{l.label}</span>
                  <span className="truncate text-sm text-muted">{l.href}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {os.menu.length > 0 ? (
          <div className="mt-10">
            <p className="font-display text-xs tracking-widest text-heat uppercase">Menu</p>
            <ul className="mt-4">
              {os.menu.map((m) => (
                <li key={m.title} className="flex justify-between border-t border-line py-3 text-sm">
                  <span>{m.title}</span>
                  <span className="text-heat">{m.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="mt-10 text-xs text-muted">{os.views} views</p>
      </section>
    </HouseChrome>
  );
}
