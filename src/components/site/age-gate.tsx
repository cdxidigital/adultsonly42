import { BrandLogo } from "./brand-logo";

export function AgeGate({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
    >
      <img
        src="/still-lips.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy/70 via-navy/55 to-void" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 pb-12 pt-20 text-center md:pb-0">
        <BrandLogo variant="lockup" className="mb-8 h-36 w-auto md:h-48" />
        <p
          id="gate-title"
          className="font-display text-3xl font-medium tracking-wide text-ivory uppercase md:text-5xl"
        >
          18+ to enter
        </p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          Adult house. Adult only. Confirm you are eighteen or older and that
          adult content is legal where you are.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onEnter}
            className="min-h-12 bg-heat px-8 py-3 font-display text-sm tracking-widest text-navy uppercase transition-colors hover:bg-ivory"
          >
            I am 18+
          </button>
          <a
            href="https://www.google.com"
            className="flex min-h-12 items-center justify-center border border-line px-8 py-3 font-display text-sm tracking-widest text-ivory uppercase transition-colors hover:border-heat hover:text-heat"
          >
            Exit
          </a>
        </div>
        <p className="mt-6 text-xs tracking-wide text-muted">
          No explicit media on this domain.
        </p>
      </div>
    </div>
  );
}
