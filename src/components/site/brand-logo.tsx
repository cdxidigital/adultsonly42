import { cn } from "@/lib/utils";

const SRC = {
  wordmark: "/wordmark-3d.png",
  lockup: "/lockup-lips.png",
  original: "/logo.png",
} as const;

export function BrandLogo({
  className,
  alt = "fleshsesh",
  variant = "wordmark",
}: {
  className?: string;
  alt?: string;
  variant?: keyof typeof SRC;
}) {
  return (
    <img
      src={SRC[variant]}
      alt={alt}
      className={cn("pointer-events-none select-none object-contain", className)}
    />
  );
}
