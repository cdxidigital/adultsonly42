import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { HouseChrome, PageHero, HeatButton } from "@/components/site/chrome";
import { submitBrief } from "@/lib/house/shop";
import { aud, isUnauthorized } from "@/lib/house/money";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { stashBrief, takeBrief } from "@/lib/house/pending";

type Search = { talent?: string };

export const Route = createFileRoute("/apply")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    talent: typeof s.talent === "string" ? s.talent : undefined,
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const { talent } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [kind, setKind] = useState<"talent" | "campaign" | "twin" | "service">(talent ? "campaign" : "talent");
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [details, setDetails] = useState("");
  const [payFee, setPayFee] = useState(true);
  const [busy, setBusy] = useState(false);

  const fee = kind === "talent" ? 4000 : 50000;

  useEffect(() => {
    const draft = takeBrief();
    if (!draft) return;
    setKind(draft.kind);
    setCompany(draft.company);
    setContactName(draft.contactName);
    setDetails(draft.details);
    setPayFee(draft.payFee);
  }, []);

  function draft() {
    return { kind, talentId: talent, company, contactName, details, payFee };
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!user) {
      stashBrief(draft());
      navigate({
        to: "/login",
        search: { redirect: talent ? `/apply?talent=${talent}` : "/apply" },
      });
      return;
    }
    setBusy(true);
    try {
      const res = await submitBrief({
        data: {
          kind,
          talentId: talent,
          company,
          contactName,
          details,
          payFee,
        },
      });
      toast.success(res.deposit ? `File received. ${aud(res.deposit)} posted.` : "File received.");
      navigate({ to: "/desk" });
    } catch (err) {
      if (isUnauthorized(err)) {
        stashBrief(draft());
        navigate({
          to: "/login",
          search: { redirect: talent ? `/apply?talent=${talent}` : "/apply" },
        });
        return;
      }
      toast.error(err instanceof Error ? err.message : "The desk could not take the file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <HouseChrome>
      <PageHero kicker="The desk" title={<>Open a<br />file.</>} image="/hero-corridor.jpg">
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
          Talent applications, campaign briefs, lookbook commissions, and studio services. A paid file is read first. No guarantee of a yes.
        </p>
        <Link
          to="/join"
          className="mt-6 inline-flex min-h-12 items-center border border-heat px-6 font-display text-xs tracking-widest text-heat uppercase"
        >
          Talent onboarding
        </Link>
      </PageHero>
      <form onSubmit={send} className="mx-auto max-w-lg space-y-5 px-5 py-12 md:px-0">
        <label className="block font-display text-xs tracking-widest text-heat uppercase">
          Kind
          <select
            className="mt-2 block w-full border-b border-line bg-transparent py-3"
            value={kind}
            onChange={(e) => setKind(e.target.value as typeof kind)}
          >
            <option value="talent" className="bg-navy">
              Talent file
            </option>
            <option value="campaign" className="bg-navy">
              Campaign brief
            </option>
            <option value="twin" className="bg-navy">
              Lookbook / likeness (signed only)
            </option>
            <option value="service" className="bg-navy">
              Studio service
            </option>
          </select>
        </label>
        <label className="block font-display text-xs tracking-widest text-heat uppercase">
          House / brand
          <input
            className="mt-2 block w-full border-b border-line bg-transparent py-3"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label className="block font-display text-xs tracking-widest text-heat uppercase">
          Name
          <input
            className="mt-2 block w-full border-b border-line bg-transparent py-3"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
        </label>
        <label className="block font-display text-xs tracking-widest text-heat uppercase">
          The brief
          <textarea
            className="mt-2 block min-h-32 w-full border-b border-line bg-transparent py-3"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            minLength={12}
            placeholder="Pronouns, limits, charge, dates. No moodboard dump."
          />
        </label>
        {talent ? <p className="text-xs text-muted">Attached talent: {talent}</p> : null}
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-heat"
            checked={payFee}
            onChange={(e) => setPayFee(e.target.checked)}
          />
          <span>
            Settle {aud(fee)} now so the file is read first.
            {kind !== "talent" ? " Credited against the day rate if the house says yes." : ""}
          </span>
        </label>
        <HeatButton type="submit" disabled={busy || isPending}>
          {busy ? "Sending…" : user ? "Send the file" : "Sign in to send"}
        </HeatButton>
      </form>
    </HouseChrome>
  );
}
