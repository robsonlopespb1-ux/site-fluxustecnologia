import { cn } from "@/lib/cn";

/**
 * Placeholder tipográfico da marca: símbolo "F" em amarelo sobre fundo
 * arredondado + wordmark. Substituir pelo SVG real quando o logo for validado
 * (risco nº 1 — docs/ARQUITETURA.md §23).
 */
export function Logo({
  variant = "md",
  className,
}: {
  variant?: "sm" | "md";
  className?: string;
}) {
  const markSize = variant === "sm" ? "size-7 text-sm" : "size-8 text-base";
  const wordSize = variant === "sm" ? "text-base" : "text-lg";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-lg bg-brand-500 font-bold text-ink-950",
          markSize,
        )}
      >
        F
      </span>
      <span className={cn("font-semibold tracking-tight text-text-primary", wordSize)}>
        Fluxus
      </span>
    </span>
  );
}
