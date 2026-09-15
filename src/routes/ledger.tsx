import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { HouseChrome, SignInHere } from "@/components/site/chrome";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ledger")({ component: LedgerLayout });

const TABS = [
  { to: "/ledger", label: "Overview" },
  { to: "/ledger/rewards", label: "Shelf" },
  { to: "/ledger/collection", label: "Pass" },
  { to: "/ledger/wallet", label: "Wallet" },
  { to: "/ledger/activity", label: "Tape" },
] as const;

function LedgerLayout() {
  const { user, isPending } = useCurrentUserState();
  const path = useRouterState({ select: (s) => s.location.pathname });

  if (isPending) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the ledger…</div>
      </HouseChrome>
    );
  }
  if (!user) return <SignInHere />;

  return (
    <HouseChrome>
      <div className="px-5 pt-24 md:px-8">
        <nav className="flex flex-wrap gap-4 border-b border-line pb-3 font-display text-xs tracking-widest uppercase">
          {TABS.map((tab) => {
            const on =
              tab.to === "/ledger"
                ? path === "/ledger" || path === "/ledger/"
                : path.startsWith(tab.to);
            return (
              <Link key={tab.to} to={tab.to} className={cn("text-muted hover:text-heat", on && "text-heat")}>
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <Outlet />
    </HouseChrome>
  );
}
