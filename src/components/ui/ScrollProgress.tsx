"use client";

import { useEffect, useState } from "react";

/**
 * Barra de progresso de rolagem — feedback de navegação (não é animação
 * decorativa, então permanece com prefers-reduced-motion).
 * Atualização throttled via requestAnimationFrame.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
    >
      <div
        className="h-full bg-brand-500 shadow-[0_0_8px_rgba(245,166,35,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
