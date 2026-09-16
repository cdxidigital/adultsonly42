import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { addDays, format } from "date-fns";
import { toast } from "sonner";
import { HouseChrome, PageHero, HeatButton } from "@/components/site/chrome";
import { bookRoom, getDesk, listRoomDay, listRooms, type Room } from "@/lib/house/shop";
import { aud, isUnauthorized, memberRate } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/live")({ component: LivePage });

const HOURS = [12, 14, 16, 18];

function LivePage() {
  const { user } = useCurrentUserState();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [date, setDate] = useState(() => format(addDays(new Date(), 1), "yyyy-MM-dd"));
  const [startHour, setStartHour] = useState(14);
  const [hours, setHours] = useState(2);
  const [taken, setTaken] = useState<{ start_hour: number; hours: number }[]>([]);
  const [plan, setPlan] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const dates = useMemo(
    () => Array.from({ length: 10 }, (_, i) => format(addDays(new Date(), i + 1), "yyyy-MM-dd")),
    [],
  );

  useEffect(() => {
    listRooms().then((rows) => {
      setRooms(rows);
      setRoomId((id) => id || rows[0]?.id || "");
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    getDesk()
      .then((d) => setPlan(d.plan))
      .catch(() => setPlan(null));
  }, [user]);

  useEffect(() => {
    if (!roomId || !date) return;
    listRoomDay({ data: { roomId, date } })
      .then(setTaken)
      .catch(() => setTaken([]));
  }, [roomId, date]);

  const room = rooms.find((r) => r.id === roomId);
  const rate = memberRate(plan);
  const clash = taken.some((b) => startHour < b.start_hour + b.hours && startHour + hours > b.start_hour);
  const total = room ? Math.round(room.hourly_cents * hours * rate) : 0;

  async function book() {
    if (!room) return;
    setBusy(true);
    try {
      const res = await bookRoom({
        data: { roomId: room.id, date, startHour, hours },
      });
      toast.success(`Room held. ${aud(res.total)} settled.`);
      navigate({ to: "/desk" });
    } catch (err) {
      if (isUnauthorized(err)) {
        navigate({ to: "/login", search: { redirect: "/live" } });
        return;
      }
      toast.error(err instanceof Error ? err.message : "The room would not hold.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <HouseChrome>
      <PageHero kicker="Rooms" title={<>Rooms without<br />a binary door.</>} image="/still-live.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Studio hire for capture and directed stills — not a streaming tube. Two-hour minimum. 12:00–22:00. Signed talent only.
        </p>
        <a
          href="https://webcams.fleshsesh.com"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex min-h-11 items-center border border-heat px-4 font-display text-xs tracking-widest text-heat uppercase hover:bg-heat hover:text-navy"
        >
          View live cams
        </a>
      </PageHero>

      <section className="grid gap-8 px-5 py-12 md:grid-cols-2 md:px-10">
        <div className="space-y-4">
          {rooms.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRoomId(r.id)}
              className={`w-full border px-4 py-4 text-left ${roomId === r.id ? "border-heat" : "border-line"}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-xl tracking-wide uppercase">{r.name}</p>
                <p className="font-display text-heat tabular-nums">{aud(Math.round(r.hourly_cents * rate))}/hr</p>
              </div>
              <p className="mt-2 text-sm text-muted">{r.blurb}</p>
            </button>
          ))}
        </div>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            void book();
          }}
        >
          <label className="block font-display text-xs tracking-widest text-heat uppercase">
            Date
            <select
              className="mt-2 block w-full border-b border-line bg-transparent py-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            >
              {dates.map((d) => (
                <option key={d} value={d} className="bg-navy">
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="block font-display text-xs tracking-widest text-heat uppercase">
            Start
            <select
              className="mt-2 block w-full border-b border-line bg-transparent py-3"
              value={startHour}
              onChange={(e) => setStartHour(Number(e.target.value))}
            >
              {HOURS.map((h) => (
                <option key={h} value={h} className="bg-navy">
                  {String(h).padStart(2, "0")}:00
                </option>
              ))}
            </select>
          </label>
          <label className="block font-display text-xs tracking-widest text-heat uppercase">
            Hours
            <select
              className="mt-2 block w-full border-b border-line bg-transparent py-3"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            >
              {[2, 3, 4].map((h) => (
                <option key={h} value={h} className="bg-navy">
                  {h}
                </option>
              ))}
            </select>
          </label>
          {clash ? <p className="text-sm text-heat">That block is taken.</p> : null}
          <p className="font-display text-2xl text-heat tabular-nums">{aud(total)}</p>
          {plan ? (
            <p className="text-xs text-muted">
              {plan} pricing applied.
            </p>
          ) : (
            <p className="text-xs text-muted">Sign in for member rates. House tab settles in AUD.</p>
          )}
          <HeatButton type="submit" disabled={busy || clash || !room}>
            {busy ? "Holding…" : "Settle the block"}
          </HeatButton>
        </form>
      </section>
    </HouseChrome>
  );
}
