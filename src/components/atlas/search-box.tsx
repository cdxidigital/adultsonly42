import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export function SearchBox({
  initial = "",
  size = "lg",
  autoFocus = false,
  kind = "all",
  dest = "search",
  placeholder = "Search talent, titles, houses, statutes…",
}: {
  initial?: string;
  size?: "lg" | "sm";
  autoFocus?: boolean;
  kind?: string;
  dest?: "search" | "dossier";
  placeholder?: string;
}) {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        ref.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "").trim();
    if (dest === "dossier") {
      void navigate({ to: "/atlas/dossier", search: { q, qid: "", id: "" } });
    } else {
      void navigate({ to: "/atlas/search", search: { q, kind } });
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted",
          size === "lg" ? "size-5" : "size-4",
        )}
        strokeWidth={1.75}
      />
      <input
        ref={ref}
        name="q"
        defaultValue={initial}
        autoFocus={autoFocus}
        autoComplete="off"
        placeholder={placeholder}
        aria-label="Search the index"
        className={cn(
          "w-full border border-line bg-navy text-ivory placeholder:text-muted focus:border-heat focus:outline-none",
          size === "lg" ? "h-14 pl-12 pr-4 font-display text-xl" : "h-11 pl-11 pr-4 text-sm",
        )}
      />
    </form>
  );
}
