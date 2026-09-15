import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { isKind } from "@/lib/catalog";

export const Route = createFileRoute("/atlas/$kind")({
  component: Outlet,
  beforeLoad: ({ params }) => {
    if (!isKind(params.kind)) throw notFound();
  },
  notFoundComponent: () => (
    <div className="px-5 py-16">
      <h1 className="font-display text-3xl tracking-wide uppercase">Unknown desk</h1>
      <p className="mt-2 text-muted">That section is not in the index.</p>
    </div>
  ),
});
