"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  tag?: "h3" | "p" | "span";
  /** Revela em dourado (números e títulos) em vez de branco. */
  highlight?: boolean;
}

/**
 * Texto que se "pinta" palavra por palavra conforme o scroll: o progresso é
 * contínuo e proporcional à posição do elemento no viewport (subir a página
 * reverte). Mapeamento: começa quando o topo do elemento cruza 85% da
 * altura do viewport e completa aos 35%.
 * Estado inicial = tudo visível → sem JS, com reduced motion e no SSR o
 * texto nunca fica refém do efeito (§16.3); o JS escurece o que ainda está
 * abaixo da dobra ao montar.
 * Leitores de tela recebem o texto contínuo via aria-label.
 */
export function ScrollRevealText({
  children,
  className,
  tag: Tag = "p",
  highlight = false,
}: ScrollRevealTextProps) {
  const words = children.split(" ");
  const elementRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef(0);
  const [revealedCount, setRevealedCount] = useState(words.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealedCount(words.length);
      return;
    }

    const update = () => {
      frameRef.current = 0;
      const el = elementRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      /* 0 quando o topo está em 85% do viewport; 1 quando chega a 35% */
      const raw = (vh * 0.85 - rect.top) / (vh * 0.5);
      const progress = Math.max(0, Math.min(1, raw));
      const count = Math.round(progress * words.length);
      setRevealedCount((prev) => (prev === count ? prev : count));
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update(); // posição inicial (síncrono — independe de rAF)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [words.length]);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        elementRef.current = node;
      }}
      aria-label={children}
      className={className}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={cn(
              "transition-colors duration-300",
              i < revealedCount
                ? highlight
                  ? "text-brand-500"
                  : "text-white"
                : "text-white/10",
            )}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
