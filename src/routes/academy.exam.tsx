import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { HouseChrome, SignInHere, HeatButton } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { CRAFT_EXAM, getExamState, takeCraftExam } from "@/lib/house/ops";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/academy/exam")({ component: ExamPage });

function ExamPage() {
  const { user, isPending } = useCurrentUserState();
  const [bought, setBought] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [picks, setPicks] = useState<number[]>(() => CRAFT_EXAM.questions.map(() => -1));
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    getExamState()
      .then((s) => {
        setBought(s.bought);
        setResult(s.result);
      })
      .catch(() => undefined);
  }, [user]);

  if (isPending) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Opening the exam…</div>
      </HouseChrome>
    );
  }
  if (!user) return <SignInHere next="/academy/exam" />;

  async function submit() {
    if (picks.some((p) => p < 0)) {
      toast.error("Answer every question.");
      return;
    }
    setBusy(true);
    try {
      const res = await takeCraftExam({ data: picks });
      setResult({ score: res.score, passed: res.passed });
      toast.success(res.passed ? `Passed at ${res.score}%.` : `Scored ${res.score}%. Seventy-five to pass.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "The desk could not mark that.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <HouseChrome>
      <section className="mx-auto max-w-2xl px-5 pt-28 pb-20">
        <Link to="/academy" className="font-display text-xs tracking-widest text-heat uppercase">
          Academy
        </Link>
        <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">House craft</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Four questions. Seventy-five percent to pass. The badge sits on the desk. Language, consent, and what this
          house will not do.
        </p>

        {!bought ? (
          <div className="mt-10">
            <p className="font-display text-2xl text-heat tabular-nums">A$29</p>
            <div className="mt-6">
              <BuyButton productId="exam-craft" label="Settle the exam" />
            </div>
          </div>
        ) : result?.passed ? (
          <div className="mt-10 border border-heat p-6">
            <p className="font-display text-xs tracking-widest text-heat uppercase">Certificate</p>
            <p className="mt-3 font-display text-3xl tracking-wide uppercase">House craft</p>
            <p className="mt-2 text-sm text-muted">Scored {result.score}%. The badge is on your desk.</p>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {CRAFT_EXAM.questions.map((q, i) => (
              <fieldset key={q.id} className="border-t border-line pt-6">
                <legend className="font-display text-lg tracking-wide uppercase">{q.prompt}</legend>
                <div className="mt-4 space-y-2">
                  {q.options.map((opt, n) => (
                    <label key={opt} className="flex items-start gap-3 text-sm">
                      <input
                        type="radio"
                        className="mt-1 size-4 accent-heat"
                        name={q.id}
                        checked={picks[i] === n}
                        onChange={() => setPicks(picks.map((p, x) => (x === i ? n : p)))}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {result && !result.passed ? (
              <p className="text-sm text-muted">Last score {result.score}%. Sit it again.</p>
            ) : null}
            <HeatButton type="button" disabled={busy} onClick={submit}>
              {busy ? "Marking…" : "Sit the exam"}
            </HeatButton>
          </div>
        )}
      </section>
    </HouseChrome>
  );
}
