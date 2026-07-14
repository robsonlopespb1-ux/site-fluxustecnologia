import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Lockup da marca: [ícone F em container com glow] + [Fluxus] / [TECNOLOGIA].
 * Wordmark e descritor são texto HTML (Inter) — nítidos em qualquer densidade
 * e temáveis; o PNG de wordmark deixou de ser usado aqui.
 * Os efeitos de hover disparam pelo `group` no root (o Link inteiro reage).
 */
const variants = {
  header: {
    /* Oversized: maior que a barra e deslocado para baixo — "vaza" ~6-8px
       sob a borda inferior do header (efeito de overflow premium). */
    box: "relative z-20 size-11 translate-y-3 rounded-lg lg:size-15 lg:translate-y-2.5",
    img: "size-7.5 lg:size-10",
    glow:
      "shadow-[0_0_12px_rgba(245,166,35,0.15)] group-hover:shadow-[0_0_20px_rgba(245,166,35,0.3)]",
    word: "text-lg sm:text-xl",
    descriptor:
      "hidden text-white/30 transition-colors duration-300 group-hover:text-white/60 sm:inline",
  },
  footer: {
    box: "size-13 rounded-xl",
    img: "size-9",
    glow:
      "shadow-[0_0_10px_rgba(245,166,35,0.12)] group-hover:shadow-[0_0_16px_rgba(245,166,35,0.24)]",
    word: "text-2xl",
    descriptor:
      "inline text-white/40 transition-colors duration-300 group-hover:text-white/70",
  },
} as const;

export function Logo({
  variant = "header",
  className,
}: {
  variant?: keyof typeof variants;
  className?: string;
}) {
  const s = variants[variant];

  return (
    <span
      className={cn("group inline-flex cursor-pointer items-center gap-3", className)}
    >
      {/* Ícone em container elevado com glow dourado */}
      <span
        className={cn(
          "logo-orbit relative flex shrink-0 items-center justify-center border border-brand-500/25 bg-ink-950 transition-shadow duration-300",
          s.box,
          s.glow,
        )}
      >
        <Image
          src="/logo-fluxus-icone.png"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className={s.img}
          priority={variant === "header"}
        />
      </span>

      {/* Wordmark + descritor lado a lado, na mesma baseline */}
      <span className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-bold leading-none tracking-wide text-text-primary",
            s.word,
          )}
        >
          Fluxus
        </span>
        <span
          className={cn(
            "text-[10px] font-light uppercase leading-none tracking-[0.25em]",
            s.descriptor,
          )}
        >
          Tecnologia
        </span>
      </span>
    </span>
  );
}
