"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SHOW_AFTER_PX = 300;

/**
 * Botão fixo "voltar ao topo": aparece após ~300px de scroll, com fade+slide.
 * prefers-reduced-motion: scroll instantâneo e sem animação de entrada.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
      }
      className={cn(
        "fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-xl",
        "bg-brand-500 text-ink-950 shadow-[0_0_12px_rgba(245,166,35,0.4)]",
        "transition-all duration-300 motion-reduce:transition-none",
        "hover:scale-110 hover:shadow-[0_0_20px_rgba(245,166,35,0.6)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-950",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2.5 opacity-0",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
        aria-hidden="true"
      >
        <path d="m6 14 6-6 6 6" />
      </svg>
    </button>
  );
}
