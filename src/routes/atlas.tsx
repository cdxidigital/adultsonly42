import { useEffect } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { HouseChrome } from "@/components/site/chrome";
import { hydrateSaved } from "@/lib/saved";
import { KINDS, KIND_META } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atlas")({ component: AtlasLayout });

function AtlasLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    hydrateSaved();
  }, []);

  return (
    <HouseChrome>
      <div className="border-b border-line px-5 pt-24 md:px-8">
        <nav className="-mx-5 flex gap-x-4 overflow-x-auto px-5 pb-3 font-display text-[11px] tracking-widest whitespace-nowrap uppercase md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:whitespace-normal">
          <Link to="/atlas" className={cn("text-muted hover:text-heat", path === "/atlas" && "text-heat")}>
            Index
          </Link>
          {KINDS.map((k) => (
            <Link
              key={k}
              to="/atlas/$kind"
              params={{ kind: k }}
              className={cn("text-muted hover:text-heat", path.startsWith(`/atlas/${k}`) && "text-heat")}
            >
              {KIND_META[k].label}
            </Link>
          ))}
          <Link
            to="/atlas/search"
            search={{ q: "", kind: "all" }}
            className={cn("text-muted hover:text-heat", path.startsWith("/atlas/search") && "text-heat")}
          >
            Search
          </Link>
          <Link
            to="/atlas/dossier"
            search={{ q: "", qid: "", id: "" }}
            className={cn("text-muted hover:text-heat", path.startsWith("/atlas/dossier") && "text-heat")}
          >
            Dossier
          </Link>
          <Link
            to="/atlas/saved"
            className={cn("text-muted hover:text-heat", path.startsWith("/atlas/saved") && "text-heat")}
          >
            Saved
          </Link>
        </nav>
      </div>
      <Outlet />
    </HouseChrome>
  );
}
