import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { Menu, X, ShoppingBag } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getCart } from "@/lib/house/shop";
import { AgeGate } from "./age-gate";
import { BrandLogo } from "./brand-logo";
import { cn } from "@/lib/utils";
import { readAgeOkClient, writeAgeOk } from "@/lib/house/pending";

const NAV = [
  { to: "/pass", label: "Pass" },
  { to: "/atelier", label: "Atelier" },
  { to: "/academy", label: "Academy" },
  { to: "/talent", label: "Talent" },
  { to: "/os", label: "OS" },
  { to: "/atlas", label: "Atlas" },
  { to: "/nights", label: "Nights" },
  { to: "/ledger", label: "Ledger" },
];

export function AgeShell({ children, ssrOk = false }: { children: ReactNode; ssrOk?: boolean }) {
  const [allowed, setAllowed] = useState(ssrOk);

  useEffect(() => {
    if (ssrOk) {
      writeAgeOk();
      return;
    }
    if (readAgeOkClient()) {
      writeAgeOk();
      setAllowed(true);
    }
  }, [ssrOk]);

  function enter() {
    writeAgeOk();
    setAllowed(true);
  }

  if (!allowed) return <AgeGate onEnter={enter} />;
  return <>{children}</>;
}

export function SignInHere({ next }: { next?: string }) {
  const here = useRouterState({
    select: (s) => s.location.pathname + (s.location.searchStr || ""),
  });
  const href = typeof window !== "undefined" ? window.location.pathname + window.location.search : here;
  const candidate = next || href || here;
  const redirect =
    candidate.startsWith("/") && !candidate.startsWith("//") && !candidate.startsWith("/login")
      ? candidate
      : "/desk";
  return <Navigate to="/login" search={{ redirect }} />;
}

export function HouseChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setCount(0);
      return;
    }
    getCart()
      .then((rows) => setCount(rows.reduce((n, r) => n + r.qty, 0)))
      .catch(() => setCount(0));
  }, [user, path]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative min-h-dvh bg-void text-ivory">
      <div className="grain" />
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line/70 bg-void/80 px-5 py-3.5 backdrop-blur-md md:px-8">
        <Link to="/" className="relative z-10 shrink-0" aria-label="fleshsesh home">
          <BrandLogo className="h-12 w-auto md:h-16" />
        </Link>
        <nav className="hidden items-center gap-3 font-display text-[11px] tracking-widest uppercase xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn("text-ivory/80 hover:text-heat", path.startsWith(item.to) && "text-heat")}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/cart"
            className="relative flex size-11 items-center justify-center text-ivory hover:text-heat"
            aria-label="Cart"
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute top-1 right-1 min-w-4 bg-heat px-1 font-display text-[10px] leading-4 text-navy tabular-nums">
                {count}
              </span>
            ) : null}
          </Link>
          {isPending ? (
            <div className="h-8 w-20 animate-pulse bg-navy" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link to="/desk" className="text-heat">
                Desk
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-heat px-3 py-2 text-heat hover:bg-heat hover:text-navy"
            >
              Sign in
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-1 xl:hidden">
          <Link
            to="/cart"
            className="relative flex size-11 items-center justify-center"
            aria-label="Cart"
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute top-1 right-1 min-w-4 bg-heat px-1 font-display text-[10px] leading-4 text-navy tabular-nums">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-navy px-5 pt-28 xl:hidden">
          <nav className="flex flex-col font-display text-3xl tracking-wide uppercase">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/join" onClick={() => setOpen(false)} className="border-b border-line py-4">
              Join
            </Link>
            <Link to="/desk" onClick={() => setOpen(false)} className="border-b border-line py-4">
              Desk
            </Link>
            <SignedOut>
              <Link to="/login" onClick={() => setOpen(false)} className="py-4 text-heat">
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="py-4">
                <UserButton />
              </div>
            </SignedIn>
          </nav>
        </div>
      ) : null}

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 mt-auto flex flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs tracking-wide text-muted md:px-8">
        <div>© {new Date().getFullYear()} fleshsesh · Perth</div>
        <div>Gender-fluid · 18+ · No explicit media on this domain</div>
        <div className="flex gap-3">
          <Link to="/legal" className="hover:text-heat">
            Legal
          </Link>
          <Link to="/ledger" className="hover:text-heat">
            Ledger
          </Link>
          <Link to="/atlas" className="hover:text-heat">
            Atlas
          </Link>
          <Link to="/os" className="hover:text-heat">
            OS
          </Link>
          <Link to="/join" className="hover:text-heat">
            Join
          </Link>
          <Link to="/apply" className="hover:text-heat">
            Apply
          </Link>
          <Link to="/desk" className="hover:text-heat">
            Desk
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  image,
  children,
}: {
  kicker: string;
  title: ReactNode;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[62dvh] items-end px-5 pb-12 pt-32 md:min-h-[70dvh] md:px-8">
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-void via-void/45 to-navy/40" />
      <div className="relative">
        <p className="mb-3 font-display text-xs tracking-widest text-heat uppercase">{kicker}</p>
        <h1 className="font-display text-5xl font-medium tracking-wide text-ivory uppercase md:text-7xl">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}

export function HeatButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center bg-heat px-6 py-3 font-display text-xs tracking-widest text-navy uppercase transition-colors hover:bg-ivory disabled:opacity-50",
        className,
      )}
    />
  );
}

export function GhostButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center border border-line px-6 py-3 font-display text-xs tracking-widest text-ivory uppercase transition-colors hover:border-heat hover:text-heat disabled:opacity-50",
        className,
      )}
    />
  );
}
