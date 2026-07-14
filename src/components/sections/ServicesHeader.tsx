"use client";

import { useEffect, useRef, useState } from "react";
import { servicesSection } from "@/data/site";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { cn } from "@/lib/cn";

const TYPE_SPEED_MS = 45;
const CURSOR_LINGER_MS = 1500;

/**
 * Cabeçalho da seção de soluções: shimmer no eyebrow (uma passada) e
 * typewriter no título, ambos disparados quando a seção entra no viewport.
 * prefers-reduced-motion: tudo aparece estático e completo.
 */
export function ServicesHeader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [cursorGone, setCursorGone] = useState(false);

  const title = servicesSection.title;
  const done = typedCount >= title.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Dispara os efeitos uma única vez, quando o cabeçalho fica visível
  useEffect(() => {
    const el = rootRef.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  // Typewriter: uma letra por intervalo; cursor pisca e some ao terminar
  useEffect(() => {
    if (!visible || reducedMotion) return;
    if (done) {
      const timeout = window.setTimeout(() => setCursorGone(true), CURSOR_LINGER_MS);
      return () => window.clearTimeout(timeout);
    }
    const interval = window.setInterval(
      () => setTypedCount((count) => Math.min(count + 1, title.length)),
      TYPE_SPEED_MS,
    );
    return () => window.clearInterval(interval);
  }, [visible, reducedMotion, done, title.length]);

  const showFull = reducedMotion || !visible;
  const interactive = showFull || done;

  return (
    <div ref={rootRef} className="max-w-2xl">
      <p
        className={cn(
          "text-caption uppercase tracking-widest",
          visible && !reducedMotion && "shimmer-run",
        )}
      >
        {servicesSection.eyebrow}
      </p>
      {/* O texto completo invisível reserva a altura final — o typewriter
          não desloca o layout (fichário abaixo) enquanto digita. */}
      <h2 className="relative mt-4" aria-label={title}>
        <span aria-hidden="true" className="invisible">
          {title}
        </span>
        <span aria-hidden="true" className="absolute inset-0">
          {interactive ? (
            /* Terminada a digitação, cada letra reage ao hover (glow dourado). */
            <>
              <EnergizedText as="span" text={title} />
              {visible && !reducedMotion && !cursorGone && (
                <span className="animate-blink ml-0.5 inline-block font-light">
                  |
                </span>
              )}
            </>
          ) : (
            <>
              {title.slice(0, typedCount)}
              {!cursorGone && (
                <span className="animate-blink ml-0.5 inline-block font-light">
                  |
                </span>
              )}
            </>
          )}
        </span>
      </h2>
    </div>
  );
}
