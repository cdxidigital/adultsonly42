import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome, SignInHere } from "@/components/site/chrome";
import { getDesk } from "@/lib/house/shop";
import { getLedger } from "@/lib/house/rewards";
import { aud, planLabel } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/desk")({ component: DeskPage });

function DeskPage() {
  const { user, isPending } = useCurrentUserState();
  const [desk, setDesk] = useState<Awaited<ReturnType<typeof getDesk>> | null>(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (isPending || !user) return;
    getDesk().then(setDesk).catch(() => setDesk(null));
    getLedger()
      .then((d) => setPoints(d.points.available))
      .catch(() => setPoints(0));
  }, [isPending, user]);

  if (isPending) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the desk…</div>
      </HouseChrome>
    );
  }
  if (!user) return <SignInHere next="/desk" />;

  const spend = desk?.orders.reduce((n, o) => n + o.total_cents, 0) ?? 0;

  return (
    <HouseChrome>
      <section className="px-5 pt-28 pb-20 md:px-10">
        <p className="font-display text-xs tracking-widest text-heat uppercase">The desk</p>
        <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">
          {user.displayName ?? "Member"}
        </h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-t border-line pt-4">
            <p className="text-xs text-muted">Pass</p>
            <p className="mt-1 font-display text-2xl uppercase">{planLabel(desk?.plan)}</p>
          </div>
          <div className="border-t border-line pt-4">
            <p className="text-xs text-muted">House credit</p>
            <p className="mt-1 font-display text-2xl text-heat tabular-nums">{aud(desk?.credits ?? 0)}</p>
          </div>
          <div className="border-t border-line pt-4">
            <p className="text-xs text-muted">FLESH Points</p>
            <p className="mt-1 font-display text-2xl text-heat tabular-nums">
              <Link to="/ledger">{points.toLocaleString("en-AU")}</Link>
            </p>
          </div>
          <div className="border-t border-line pt-4">
            <p className="text-xs text-muted">Lifetime on the tab</p>
            <p className="mt-1 font-display text-2xl tabular-nums">{aud(spend)}</p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">File</h2>
          {desk?.profile ? (
            <p className="mt-3 text-sm">
              {desk.profile.display_name} · {desk.profile.profile_type} · {desk.profile.status.replaceAll("_", " ")}
              {" · "}
              <Link to="/join" className="text-heat">
                Update
              </Link>
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No talent file.{" "}
              <Link to="/join" className="text-heat">
                Open one
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Seats</h2>
          {desk?.enrollments.length ? (
            <ul className="mt-4">
              {desk.enrollments.map((e) => (
                <li key={e.product_id} className="border-t border-line py-3">
                  <Link to="/academy/$slug" params={{ slug: e.slug }} className="hover:text-heat">
                    {e.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No seats yet.{" "}
              <Link to="/academy" className="text-heat">
                Academy
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Rooms</h2>
          {desk?.bookings.length ? (
            <ul className="mt-4">
              {desk.bookings.map((b) => (
                <li key={b.id} className="flex flex-wrap justify-between gap-3 border-t border-line py-3 text-sm">
                  <span>
                    {b.name} · {b.date} · {String(b.start_hour).padStart(2, "0")}:00 · {b.hours}h
                  </span>
                  <span className="text-heat tabular-nums">{aud(b.total_cents)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No blocks held.{" "}
              <Link to="/live" className="text-heat">
                Book a room
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Briefs</h2>
          {desk?.briefs.length ? (
            <ul className="mt-4">
              {desk.briefs.map((b) => (
                <li key={b.id} className="border-t border-line py-3 text-sm">
                  <span className="uppercase tracking-wide text-heat">{b.kind}</span>
                  {" · "}
                  {b.status}
                  {b.deposit_cents ? ` · ${aud(b.deposit_cents)}` : ""}
                  <p className="mt-1 text-muted">{b.details.slice(0, 140)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No briefs.{" "}
              <Link to="/apply" className="text-heat">
                Open one
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">OS</h2>
          {desk?.os ? (
            <p className="mt-3 text-sm">
              Plan {desk.os.plan}
              {desk.os.handle ? (
                <>
                  {" · "}
                  <Link to="/os/desk" className="text-heat">
                    Open desk
                  </Link>
                </>
              ) : (
                <>
                  {" · "}
                  <Link to="/os/desk" className="text-heat">
                    Open desk
                  </Link>
                </>
              )}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No OS yet.{" "}
              <Link to="/os" className="text-heat">
                Creator OS
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Jobs</h2>
          {desk?.jobs?.length ? (
            <ul className="mt-4">
              {desk.jobs.map((j) => (
                <li key={j.id} className="border-t border-line py-3 text-sm">
                  <span className="uppercase tracking-wide text-heat">{j.kind}</span>
                  {" · "}
                  {j.title} · {j.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No studio jobs.{" "}
              <Link to="/services" className="text-heat">
                Services
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Lookbooks</h2>
          {desk?.licenses?.length ? (
            <ul className="mt-4">
              {desk.licenses.map((l) => (
                <li key={l.title} className="border-t border-line py-3 text-sm">
                  {l.title} · {l.kind} · {l.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No leases.{" "}
              <Link to="/lookbook" className="text-heat">
                Lookbook
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Nights</h2>
          {desk?.rsvps?.length ? (
            <ul className="mt-4">
              {desk.rsvps.map((r) => (
                <li key={r.title} className="flex justify-between border-t border-line py-3 text-sm">
                  <span>
                    {r.title} · {r.date} · ×{r.qty}
                  </span>
                  <span className="text-heat tabular-nums">{aud(r.total_cents)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No tickets.{" "}
              <Link to="/nights" className="text-heat">
                Nights
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Badges</h2>
          {desk?.badges?.some((b) => b.passed) ? (
            <ul className="mt-4">
              {desk.badges.filter((b) => b.passed).map((b) => (
                <li key={b.exam_id} className="border-t border-line py-3 text-sm">
                  House craft · {b.score}%
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No certificates.{" "}
              <Link to="/academy/exam" className="text-heat">
                Sit the exam
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Dossiers</h2>
          {desk?.dossiers?.length ? (
            <ul className="mt-4">
              {desk.dossiers.map((d) => (
                <li key={d.id} className="border-t border-line py-3 text-sm">
                  <Link
                    to="/atlas/dossier"
                    search={{ q: d.query, qid: "", id: "" }}
                    className="hover:text-heat"
                  >
                    {d.title}
                  </Link>
                  <span className="text-muted"> · {d.created_at.slice(0, 10)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No names filed.{" "}
              <Link to="/atlas/dossier" search={{ q: "", qid: "", id: "" }} className="text-heat">
                Compile a dossier
              </Link>
            </p>
          )}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl tracking-wide uppercase">Orders</h2>
          {desk?.orders.length ? (
            <ul className="mt-4">
              {desk.orders.map((o) => (
                <li key={o.id} className="flex justify-between border-t border-line py-3 text-sm">
                  <span>#{o.id}</span>
                  <span className="tabular-nums text-heat">{aud(o.total_cents)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">The ledger is quiet.</p>
          )}
        </div>
      </section>
    </HouseChrome>
  );
}
