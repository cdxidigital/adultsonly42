import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { HouseChrome } from "@/components/site/chrome";
import { BrandLogo } from "@/components/site/brand-logo";
import { safeRedirect } from "@/lib/house/pending";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof s.redirect === "string" ? safeRedirect(s.redirect) : undefined,
  }),
  component: Login,
});

function Login() {
  const redirect = safeRedirect(Route.useSearch().redirect);
  const { user, isPending } = useCurrentUserState();
  const router = useRouter();

  useEffect(() => {
    if (isPending || !user) return;
    router.history.push(redirect);
  }, [isPending, user, redirect, router]);

  if (!isPending && user) return null;

  return (
    <HouseChrome>
      <section className="grid min-h-dvh place-items-center px-5 pt-24 pb-16">
        <div className="w-full max-w-sm text-center">
          <BrandLogo className="mx-auto mb-8 h-14 w-auto" />
          <p className="font-display text-xs tracking-widest text-heat uppercase">The desk</p>
          <h1 className="mt-3 font-display text-4xl tracking-wide uppercase">Sign in</h1>
          <p className="mt-3 mb-8 text-sm leading-relaxed text-muted">
            Member pricing, seats, rooms, and the tab all sit on a signed file. Google or X.
          </p>
          {authEnabled ? (
            <div className="flex flex-col gap-3">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: redirect })}
                  className="min-h-12 border border-line font-display text-xs tracking-widest uppercase hover:border-heat hover:text-heat"
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
          <p className="mt-8 text-xs text-muted">
            <Link to="/" className="hover:text-heat">
              Back to the house
            </Link>
          </p>
        </div>
      </section>
    </HouseChrome>
  );
}
