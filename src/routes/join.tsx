import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { HouseChrome, HeatButton, GhostButton } from "@/components/site/chrome";
import { BrandLogo } from "@/components/site/brand-logo";
import { getJoinFile, submitJoin } from "@/lib/house/join";
import { isUnauthorized } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/join")({ component: JoinPage });

const DRAFT_KEY = "fleshsesh-join-draft";

const INTERESTS = [
  "Model & talent",
  "Creative direction",
  "Image making",
  "Design & culture",
  "Production",
  "Brand partnerships",
];

const ENERGY = [
  { label: "Quiet confidence", note: "Precise. Observant. Intentional." },
  { label: "In motion", note: "Curious. Social. Open to the next room." },
  { label: "Making noise", note: "Expressive. Unexpected. Unafraid of scale." },
];

const TYPES = [
  { label: "Model", note: "Editorial, campaign, stills." },
  { label: "Creator", note: "Image, story, a practice." },
  { label: "Talent", note: "Presence, hosting, specialist work." },
  { label: "Industry partner", note: "Casting, brand, production." },
];

const FOCUS = ["Campaign", "Editorial", "Beauty", "Performance", "Objects", "Creative collaboration"];

const VISIBILITY = [
  { label: "Curated introductions", note: "Visible when a relevant brief is in play." },
  { label: "Look-book ready", note: "Approved partners may review in confidence." },
  { label: "Keep private", note: "On the desk. Not shared onward." },
];

type Draft = {
  step: number;
  name: string;
  location: string;
  role: string;
  intent: string[];
  energy: string;
  profileType: string;
  focus: string[];
  height: string;
  chest: string;
  waist: string;
  hips: string;
  shoe: string;
  availability: string;
  visibility: string;
  portrait: string;
  lookbook: string[];
};

const empty: Draft = {
  step: 0,
  name: "",
  location: "Perth, WA",
  role: "",
  intent: [],
  energy: "",
  profileType: "",
  focus: [],
  height: "",
  chest: "",
  waist: "",
  hips: "",
  shoe: "",
  availability: "",
  visibility: "",
  portrait: "",
  lookbook: [],
};

const STEPS = ["Door", "Name", "Practice", "Interests", "Energy", "File", "Selects", "Visibility"];

function readDraft(): Draft {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as Partial<Draft>) };
  } catch {
    return empty;
  }
}

function writeDraft(d: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    /* ignore quota */
  }
}

function downscale(file: File, max = 720): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not process the still."));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = () => reject(new Error("That still would not open."));
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function JoinPage() {
  const { user } = useCurrentUserState();
  const navigate = useNavigate();
  const [d, setD] = useState<Draft>(empty);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [filed, setFiled] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const local = readDraft();
    setD(local);
    setReady(true);
    if (!user) return;
    getJoinFile()
      .then((s) => {
        if (s.file) {
          setFiled(true);
          setD((cur) => ({
            ...cur,
            name: s.file!.display_name,
            location: s.file!.location,
            role: s.file!.role,
            intent: s.file!.intent,
            energy: s.file!.energy,
            profileType: s.file!.profile_type,
            focus: s.file!.focus,
            height: s.file!.height,
            chest: s.file!.chest,
            waist: s.file!.waist,
            hips: s.file!.hips,
            shoe: s.file!.shoe,
            availability: s.file!.availability,
            visibility: s.file!.visibility,
            portrait: s.file!.portrait,
            lookbook: s.file!.lookbook,
            step: STEPS.length - 1,
          }));
        }
      })
      .catch(() => undefined);
  }, [user]);

  useEffect(() => {
    if (ready) writeDraft(d);
  }, [d, ready]);

  const percent = useMemo(() => ((d.step + 1) / STEPS.length) * 100, [d.step]);

  function patch(p: Partial<Draft>) {
    setD((cur) => ({ ...cur, ...p }));
    setErr("");
  }

  function next() {
    if (d.step === 1 && d.name.trim().length < 2) {
      setErr("A name on the file.");
      return;
    }
    if (d.step === 2 && !d.profileType) {
      setErr("Choose a practice.");
      return;
    }
    if (d.step === 3 && d.intent.length === 0) {
      setErr("Pick at least one interest.");
      return;
    }
    if (d.step === 4 && !d.energy) {
      setErr("Choose an energy.");
      return;
    }
    if (d.step === 7 && !d.visibility) {
      setErr("Choose how the file travels.");
      return;
    }
    patch({ step: Math.min(STEPS.length - 1, d.step + 1) });
  }

  async function onFile(e: ChangeEvent<HTMLInputElement>, slot: "portrait" | "lookbook") {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErr("JPEG, PNG or WebP.");
      return;
    }
    try {
      const data = await downscale(file);
      if (slot === "portrait") patch({ portrait: data });
      else if (d.lookbook.length >= 4) setErr("Four selects is the file.");
      else patch({ lookbook: [...d.lookbook, data] });
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "The still would not take.");
    }
  }

  async function submit() {
    if (!d.visibility || d.name.trim().length < 2 || !d.profileType) {
      setErr("Finish the file first.");
      return;
    }
    setBusy(true);
    try {
      await submitJoin({
        data: {
          displayName: d.name.trim(),
          location: d.location.trim() || "Perth, WA",
          role: d.role.trim(),
          intent: d.intent,
          energy: d.energy,
          profileType: d.profileType,
          focus: d.focus,
          height: d.height,
          chest: d.chest,
          waist: d.waist,
          hips: d.hips,
          shoe: d.shoe,
          availability: d.availability,
          visibility: d.visibility,
          portrait: d.portrait,
          lookbook: d.lookbook,
        },
      });
      localStorage.removeItem(DRAFT_KEY);
      setFiled(true);
      toast.success("The desk has the file.");
      navigate({ to: "/desk" });
    } catch (ex) {
      if (isUnauthorized(ex)) {
        navigate({ to: "/login", search: { redirect: "/join" } });
        return;
      }
      toast.error(ex instanceof Error ? ex.message : "The desk could not take the file.");
    } finally {
      setBusy(false);
    }
  }

  if (!ready) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the file…</div>
      </HouseChrome>
    );
  }

  if (filed && d.step === STEPS.length - 1) {
    return (
      <HouseChrome>
        <section className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-5 py-28 text-center">
          <BrandLogo variant="lockup" className="mb-8 h-32 w-auto" />
          <p className="font-display text-xs tracking-widest text-heat uppercase">On the desk</p>
          <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">File received.</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {d.name}. {d.profileType}. {d.visibility}. The house reads it before anyone else does.
          </p>
          <Link
            to="/desk"
            className="mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase"
          >
            Open the desk
          </Link>
        </section>
      </HouseChrome>
    );
  }

  return (
    <HouseChrome>
      <section className="relative min-h-dvh px-5 pt-24 pb-20 md:px-8">
        <img src="/still-lips.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/80 via-void/85 to-void" />

        <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[11rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <p className="font-display text-7xl tracking-wide text-heat tabular-nums">
              {String(d.step + 1).padStart(2, "0")}
            </p>
            <div className="mt-6 h-40 w-px bg-line">
              <div className="w-px bg-heat" style={{ height: `${percent}%` }} />
            </div>
            <p className="mt-6 font-display text-xs tracking-widest text-muted uppercase">{STEPS[d.step]}</p>
          </aside>

          <div className="border border-line bg-navy/80 p-6 backdrop-blur-sm md:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <BrandLogo variant="lockup" className="h-14 w-auto md:h-16" />
              <p className="font-display text-xs tracking-widest text-muted uppercase">
                {d.step + 1} / {STEPS.length}
              </p>
            </div>
            <div className="mb-8 h-px bg-line">
              <div className="h-px bg-heat transition-[width] duration-200" style={{ width: `${percent}%` }} />
            </div>

            {d.step === 0 ? (
              <StepFrame kicker="The file" title="A profile with a point of view.">
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Nine quiet questions. Adults only. The house reads it before a brand does. You can leave and come
                  back — the draft sits on this device until you sign it in.
                </p>
              </StepFrame>
            ) : null}

            {d.step === 1 ? (
              <StepFrame kicker="Introduction" title="What does the file call you?">
                <Field label="Name">
                  <input
                    value={d.name}
                    onChange={(e) => patch({ name: e.target.value })}
                    className="h-12 w-full border border-line bg-void px-3 text-sm focus:border-heat focus:outline-none"
                    placeholder="Chosen name"
                  />
                </Field>
                <Field label="City">
                  <input
                    value={d.location}
                    onChange={(e) => patch({ location: e.target.value })}
                    className="h-12 w-full border border-line bg-void px-3 text-sm focus:border-heat focus:outline-none"
                    placeholder="Perth, WA"
                  />
                </Field>
              </StepFrame>
            ) : null}

            {d.step === 2 ? (
              <StepFrame kicker="Practice" title="How do you work?">
                <div className="grid gap-2 sm:grid-cols-2">
                  {TYPES.map((t) => (
                    <Choice
                      key={t.label}
                      active={d.profileType === t.label}
                      label={t.label}
                      note={t.note}
                      onClick={() => patch({ profileType: t.label, role: t.label })}
                    />
                  ))}
                </div>
              </StepFrame>
            ) : null}

            {d.step === 3 ? (
              <StepFrame kicker="Interests" title="What do you want in the room?">
                <div className="grid gap-2 sm:grid-cols-2">
                  {INTERESTS.map((item) => (
                    <Choice
                      key={item}
                      active={d.intent.includes(item)}
                      label={item}
                      onClick={() =>
                        patch({
                          intent: d.intent.includes(item)
                            ? d.intent.filter((v) => v !== item)
                            : [...d.intent, item],
                        })
                      }
                    />
                  ))}
                </div>
              </StepFrame>
            ) : null}

            {d.step === 4 ? (
              <StepFrame kicker="Energy" title="How do you enter?">
                <div className="grid gap-2">
                  {ENERGY.map((t) => (
                    <Choice
                      key={t.label}
                      active={d.energy === t.label}
                      label={t.label}
                      note={t.note}
                      onClick={() => patch({ energy: t.label })}
                    />
                  ))}
                </div>
              </StepFrame>
            ) : null}

            {d.step === 5 ? (
              <StepFrame kicker="The file" title="Measurements are optional. Focus is not.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["height", "Height", d.height],
                      ["chest", "Chest / bust", d.chest],
                      ["waist", "Waist", d.waist],
                      ["hips", "Hips", d.hips],
                      ["shoe", "Shoe", d.shoe],
                    ] as const
                  ).map(([key, label, value]) => (
                    <Field key={key} label={label}>
                      <input
                        value={value}
                        onChange={(e) => patch({ [key]: e.target.value } as Partial<Draft>)}
                        className="h-12 w-full border border-line bg-void px-3 text-sm focus:border-heat focus:outline-none"
                      />
                    </Field>
                  ))}
                </div>
                <p className="mt-6 font-display text-[11px] tracking-widest text-heat uppercase">Focus</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {FOCUS.map((item) => (
                    <Choice
                      key={item}
                      active={d.focus.includes(item)}
                      label={item}
                      onClick={() =>
                        patch({
                          focus: d.focus.includes(item) ? d.focus.filter((v) => v !== item) : [...d.focus, item],
                        })
                      }
                    />
                  ))}
                </div>
                <Field label="Availability">
                  <textarea
                    value={d.availability}
                    onChange={(e) => patch({ availability: e.target.value })}
                    rows={3}
                    className="mt-0 w-full border border-line bg-void px-3 py-3 text-sm focus:border-heat focus:outline-none"
                    placeholder="Dates, cities, what you will not do."
                  />
                </Field>
              </StepFrame>
            ) : null}

            {d.step === 6 ? (
              <StepFrame kicker="Selects" title="A first impression. Skip if you want.">
                <p className="text-sm text-muted">JPEG, PNG or WebP. The house stores a compact still, not a tube.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center border border-dashed border-line hover:border-heat">
                    {d.portrait ? (
                      <img src={d.portrait} alt="" className="size-full object-cover" />
                    ) : (
                      <span className="font-display text-xs tracking-widest uppercase">Portrait</span>
                    )}
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onFile(e, "portrait")} />
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {d.lookbook.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        className="relative aspect-square overflow-hidden border border-line"
                        onClick={() => patch({ lookbook: d.lookbook.filter((_, j) => j !== i) })}
                      >
                        <img src={src} alt="" className="size-full object-cover" />
                      </button>
                    ))}
                    {d.lookbook.length < 4 ? (
                      <label className="flex aspect-square cursor-pointer items-center justify-center border border-dashed border-line text-xs uppercase tracking-widest hover:border-heat">
                        Add
                        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onFile(e, "lookbook")} />
                      </label>
                    ) : null}
                  </div>
                </div>
              </StepFrame>
            ) : null}

            {d.step === 7 ? (
              <StepFrame kicker="Visibility" title="Who may see this file?">
                <div className="grid gap-2">
                  {VISIBILITY.map((t) => (
                    <Choice
                      key={t.label}
                      active={d.visibility === t.label}
                      label={t.label}
                      note={t.note}
                      onClick={() => patch({ visibility: t.label })}
                    />
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted">
                  {user ? "Settling puts the file on the desk." : "Sign in to put the file on the desk. The draft stays on this device."}
                </p>
              </StepFrame>
            ) : null}

            {err ? <p className="mt-4 text-sm text-heat">{err}</p> : null}

            <div className="mt-10 flex flex-wrap gap-3">
              {d.step > 0 ? (
                <GhostButton type="button" onClick={() => patch({ step: d.step - 1 })}>
                  Back
                </GhostButton>
              ) : null}
              {d.step < STEPS.length - 1 ? (
                <HeatButton type="button" onClick={next}>
                  Continue
                </HeatButton>
              ) : (
                <HeatButton type="button" disabled={busy} onClick={submit}>
                  {busy ? "Filing…" : user ? "File with the house" : "Sign in and file"}
                </HeatButton>
              )}
            </div>
          </div>
        </div>
      </section>
    </HouseChrome>
  );
}

function StepFrame({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-display text-xs tracking-widest text-heat uppercase">{kicker}</p>
      <h1 className="mt-2 font-display text-4xl tracking-wide uppercase md:text-5xl">{title}</h1>
      <div className="mt-8 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-display text-[11px] tracking-widest text-heat uppercase">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Choice({
  active,
  label,
  note,
  onClick,
}: {
  active: boolean;
  label: string;
  note?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex min-h-14 items-start gap-3 border px-4 py-3 text-left",
        active ? "border-heat" : "border-line hover:border-heat",
      )}
    >
      <span className={cn("mt-0.5 grid size-4 place-items-center border", active ? "border-heat bg-heat text-navy" : "border-line")}>
        {active ? <Check className="size-3" strokeWidth={3} /> : null}
      </span>
      <span>
        <strong className="font-display text-sm tracking-wide uppercase">{label}</strong>
        {note ? <small className="mt-1 block text-xs text-muted">{note}</small> : null}
      </span>
    </button>
  );
}
