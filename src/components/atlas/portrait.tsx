import type { Kind } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function initials(name: string): string {
  const parts = name.replace(/[§.]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function Portrait({
  id,
  name,
  kind,
  className,
}: {
  id: string;
  name: string;
  kind: Kind;
  className?: string;
}) {
  const h = hash(id + kind);
  const letters = initials(name);
  const rot = (h % 18) - 9;
  const offset = (h % 7) - 3;

  return (
    <div className={cn("relative overflow-hidden bg-navy", className)} aria-hidden="true">
      <svg viewBox="0 0 160 200" className="size-full" preserveAspectRatio="xMidYMid slice">
        <rect width="160" height="200" fill="#0B022D" />
        <rect
          x={12 + offset}
          y="18"
          width="136"
          height="164"
          fill="none"
          stroke="#E07DCF"
          strokeOpacity="0.35"
          strokeWidth="0.6"
        />
        <rect
          x="28"
          y="40"
          width="104"
          height="88"
          fill="#E07DCF"
          opacity="0.12"
          transform={`rotate(${rot} 80 84)`}
        />
        <text
          x="80"
          y="168"
          textAnchor="middle"
          fill="#F3F9F7"
          fontFamily="Oswald, sans-serif"
          fontSize="28"
          letterSpacing="3"
        >
          {letters}
        </text>
      </svg>
    </div>
  );
}
