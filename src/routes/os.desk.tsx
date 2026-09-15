import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { HouseChrome, SignInHere, HeatButton, GhostButton } from "@/components/site/chrome";
import {
  getCreatorOs,
  getTaxPack,
  markPost,
  queuePost,
  saveStorefront,
  setLeakMonitor,
  type CreatorOs,
  type OsPost,
} from "@/lib/house/ops";
import { osRank } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/os/desk")({ component: OsDesk });

const TABS = ["overview", "storefront", "schedule", "monitor", "tax"] as const;
type Tab = (typeof TABS)[number];

function OsDesk() {
  const { user, isPending } = useCurrentUserState();
  const [tab, setTab] = useState<Tab>("overview");
  const [os, setOs] = useState<CreatorOs | null>(null);
  const [posts, setPosts] = useState<OsPost[]>([]);
  const [ready, setReady] = useState(false);

  async function load() {
    const d = await getCreatorOs();
    setOs(d.os);
    setPosts(d.posts);
    setReady(true);
  }

  useEffect(() => {
    if (isPending || !user) return;
    load().catch(() => setReady(true));
  }, [isPending, user]);

  if (isPending) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening OS…</div>
      </HouseChrome>
    );
  }
  if (!user) return <SignInHere next="/os/desk" />;
  if (!ready) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening OS…</div>
      </HouseChrome>
    );
  }
  if (!os) {
    return (
      <HouseChrome>
        <section className="px-5 pt-28 pb-20 md:px-10">
          <p className="font-display text-xs tracking-widest text-heat uppercase">Creator OS</p>
          <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">No desk yet.</h1>
          <p className="mt-4 max-w-md text-sm text-muted">Take Lite, Pro, or Studio. The tools unlock on settle.</p>
          <Link
            to="/os"
            className="mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase"
          >
            See plans
          </Link>
        </section>
      </HouseChrome>
    );
  }

  const rank = osRank(os.plan);

  return (
    <HouseChrome>
      <section className="px-5 pt-28 pb-20 md:px-10">
        <p className="font-display text-xs tracking-widest text-heat uppercase">Creator OS · {os.plan}</p>
        <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">{os.display_name || "Your desk"}</h1>
        {os.handle ? (
          <Link to="/os/$handle" params={{ handle: os.handle }} className="mt-2 inline-block text-sm text-heat">
            fleshsesh.com/os/{os.handle}
          </Link>
        ) : null}

        <nav className="mt-10 flex flex-wrap gap-4 border-b border-line pb-3 font-display text-xs tracking-widest uppercase">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn("text-muted hover:text-heat", tab === t && "text-heat")}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === "overview" ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Stat label="Views" value={os.views.toLocaleString("en-AU")} />
            <Stat label="Link taps" value={os.clicks.toLocaleString("en-AU")} />
            <Stat label="Queued posts" value={String(posts.filter((p) => p.status === "queued").length)} />
          </div>
        ) : null}

        {tab === "storefront" ? <StorefrontForm os={os} onSaved={load} /> : null}
        {tab === "schedule" ? (
          rank < 2 ? (
            <Locked need="Pro" />
          ) : (
            <Schedule posts={posts} onChange={load} />
          )
        ) : null}
        {tab === "monitor" ? (
          rank < 2 ? (
            <Locked need="Pro" />
          ) : (
            <Monitor on={os.leak_monitor} onChange={load} />
          )
        ) : null}
        {tab === "tax" ? rank < 3 ? <Locked need="Studio" /> : <TaxPack /> : null}
      </section>
    </HouseChrome>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl text-heat tabular-nums">{value}</p>
    </div>
  );
}

function Locked({ need }: { need: string }) {
  return (
    <p className="mt-10 max-w-md text-sm text-muted">
      This sits on {need}.{" "}
      <Link to="/os" className="text-heat">
        Upgrade the desk
      </Link>
    </p>
  );
}

function StorefrontForm({ os, onSaved }: { os: CreatorOs; onSaved: () => Promise<void> }) {
  const [displayName, setDisplayName] = useState(os.display_name);
  const [handle, setHandle] = useState(os.handle);
  const [bio, setBio] = useState(os.bio);
  const [links, setLinks] = useState(
    os.links.length ? os.links : [{ label: "X", href: "" }, { label: "Site", href: "" }],
  );
  const [menu, setMenu] = useState(
    os.menu.length ? os.menu : [{ title: "Day rate", price: "" }, { title: "Campaign stills", price: "" }],
  );
  const [busy, setBusy] = useState(false);

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await saveStorefront({
        data: {
          displayName,
          handle,
          bio,
          links: links.filter((l) => l.label.trim()),
          menu: menu.filter((m) => m.title.trim()),
        },
      });
      toast.success(`Storefront live at /os/${res.handle}`);
      await onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="mt-10 max-w-xl space-y-5">
      <Field label="Display name" value={displayName} onChange={setDisplayName} />
      <Field label="Handle" value={handle} onChange={setHandle} />
      <label className="block font-display text-xs tracking-widest text-heat uppercase">
        Bio
        <textarea
          className="mt-2 block min-h-24 w-full border-b border-line bg-transparent py-3"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={400}
        />
      </label>
      <p className="font-display text-xs tracking-widest text-heat uppercase">Links</p>
      {links.map((l, i) => (
        <div key={i} className="grid grid-cols-2 gap-3">
          <input
            className="border-b border-line bg-transparent py-3"
            value={l.label}
            placeholder="Label"
            onChange={(e) =>
              setLinks(links.map((x, n) => (n === i ? { ...x, label: e.target.value } : x)))
            }
          />
          <input
            className="border-b border-line bg-transparent py-3"
            value={l.href}
            placeholder="https://"
            onChange={(e) =>
              setLinks(links.map((x, n) => (n === i ? { ...x, href: e.target.value } : x)))
            }
          />
        </div>
      ))}
      <p className="font-display text-xs tracking-widest text-heat uppercase">Menu</p>
      {menu.map((m, i) => (
        <div key={i} className="grid grid-cols-2 gap-3">
          <input
            className="border-b border-line bg-transparent py-3"
            value={m.title}
            placeholder="Offering"
            onChange={(e) =>
              setMenu(menu.map((x, n) => (n === i ? { ...x, title: e.target.value } : x)))
            }
          />
          <input
            className="border-b border-line bg-transparent py-3"
            value={m.price}
            placeholder="AUD"
            onChange={(e) =>
              setMenu(menu.map((x, n) => (n === i ? { ...x, price: e.target.value } : x)))
            }
          />
        </div>
      ))}
      <HeatButton type="submit" disabled={busy}>
        {busy ? "Saving…" : "Publish storefront"}
      </HeatButton>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block font-display text-xs tracking-widest text-heat uppercase">
      {label}
      <input
        className="mt-2 block w-full border-b border-line bg-transparent py-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Schedule({ posts, onChange }: { posts: OsPost[]; onChange: () => Promise<void> }) {
  const [platform, setPlatform] = useState<"x" | "reddit" | "telegram" | "site">("x");
  const [body, setBody] = useState("");
  const [when, setWhen] = useState("");
  const [busy, setBusy] = useState(false);

  async function add(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await queuePost({ data: { platform, body, scheduledFor: when } });
      toast.success("Queued.");
      setBody("");
      await onChange();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not queue.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-10 max-w-xl">
      <form onSubmit={add} className="space-y-4">
        <label className="block font-display text-xs tracking-widest text-heat uppercase">
          Platform
          <select
            className="mt-2 block w-full border-b border-line bg-transparent py-3"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as typeof platform)}
          >
            <option value="x" className="bg-navy">
              X
            </option>
            <option value="reddit" className="bg-navy">
              Reddit
            </option>
            <option value="telegram" className="bg-navy">
              Telegram
            </option>
            <option value="site" className="bg-navy">
              Site
            </option>
          </select>
        </label>
        <label className="block font-display text-xs tracking-widest text-heat uppercase">
          When
          <input
            type="datetime-local"
            className="mt-2 block w-full border-b border-line bg-transparent py-3"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            required
          />
        </label>
        <label className="block font-display text-xs tracking-widest text-heat uppercase">
          Copy
          <textarea
            className="mt-2 block min-h-24 w-full border-b border-line bg-transparent py-3"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            minLength={4}
          />
        </label>
        <HeatButton type="submit" disabled={busy}>
          {busy ? "Queuing…" : "Queue post"}
        </HeatButton>
      </form>
      <ul className="mt-10">
        {posts.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-3 text-sm">
            <span>
              <span className="text-heat uppercase">{p.platform}</span> · {p.scheduled_for} · {p.status}
              <p className="mt-1 text-muted">{p.body}</p>
            </span>
            {p.status === "queued" ? (
              <GhostButton
                onClick={() =>
                  markPost({ data: p.id })
                    .then(() => onChange())
                    .catch(() => toast.error("Could not mark sent."))
                }
              >
                Mark sent
              </GhostButton>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Monitor({ on, onChange }: { on: boolean; onChange: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);
  async function toggle() {
    setBusy(true);
    try {
      await setLeakMonitor({ data: !on });
      await onChange();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not toggle.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="mt-10 max-w-lg">
      <p className="text-sm leading-relaxed text-muted">
        A watermark watch on files you publish from this desk. The house flags matches; it does not scrape a public
        face that is not yours.
      </p>
      <p className="mt-4 font-display text-2xl uppercase">{on ? "Watch on" : "Watch off"}</p>
      {on ? <p className="mt-2 text-sm text-muted">Last scan: no matches this week. Watermark active.</p> : null}
      <HeatButton className="mt-6" disabled={busy} onClick={toggle}>
        {on ? "Pause watch" : "Arm watch"}
      </HeatButton>
    </div>
  );
}

function TaxPack() {
  const [csv, setCsv] = useState<string | null>(null);
  useEffect(() => {
    getTaxPack()
      .then((d) => {
        const header = "Date,Order,Item,AUD,GST";
        const rows = d.lines.map((l) => `${l.date},${l.order},"${l.item.replaceAll('"', '""')}",${l.aud.toFixed(2)},${l.gst.toFixed(2)}`);
        setCsv([header, ...rows].join("\n"));
      })
      .catch(() => setCsv(null));
  }, []);
  if (!csv) return <p className="mt-10 text-sm text-muted">Building the pack…</p>;
  const href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
  return (
    <div className="mt-10 max-w-lg">
      <p className="text-sm leading-relaxed text-muted">
        AU BAS-shaped export from the house tab. Date, order, item, AUD, GST (1/11). Not advice — a file your
        bookkeeper can read.
      </p>
      <a
        href={href}
        download="fleshsesh-bas.csv"
        className="mt-6 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase"
      >
        Download CSV
      </a>
      <pre className="mt-6 max-h-64 overflow-auto border border-line p-4 text-xs text-muted">{csv}</pre>
    </div>
  );
}
