import { createRouter, Link } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-void px-5 text-center text-ivory">
      <div>
        <p className="font-display text-xs tracking-widest text-heat uppercase">Missing</p>
        <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">No such door.</h1>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase"
        >
          The house
        </Link>
      </div>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
