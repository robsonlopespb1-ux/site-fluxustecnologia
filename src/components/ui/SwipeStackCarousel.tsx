"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface StackImage {
  src: string;
  alt: string;
}

interface SwipeStackCarouselProps {
  images: readonly StackImage[];
  /** Intervalo entre swipes (ms). */
  interval?: number;
  aspectClassName?: string;
  /** cover (corta) ou contain (letterbox sobre o fundo da carta). */
  fit?: "cover" | "contain";
  className?: string;
}

const SWIPE_DURATION_MS = 600;
const FADE_DURATION_MS = 300;

/* Profundidade da pilha por posição (0 = topo) */
const depthClasses = [
  "z-30",
  "z-20 scale-[0.97] translate-y-2",
  "z-10 scale-[0.94] translate-y-4",
];

/**
 * Pilha de cartas estilo swipe: a carta do topo desliza para a direita com
 * rotação e sai, revelando a de baixo (que sobe suavemente para o topo);
 * a que saiu volta ao fim da pilha — loop infinito.
 * prefers-reduced-motion: sem swipe — crossfade simples de 300ms.
 * Decorativo: container aria-hidden.
 */
export function SwipeStackCarousel({
  images,
  interval = 4000,
  aspectClassName = "aspect-video",
  fit = "cover",
  className,
}: SwipeStackCarouselProps) {
  /* order[0] é a carta do topo; rotaciona a cada swipe */
  const [order, setOrder] = useState<number[]>(() => images.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    const exitDuration = reducedMotion ? FADE_DURATION_MS : SWIPE_DURATION_MS;
    const timer = window.setInterval(() => {
      setLeaving(true);
      window.setTimeout(() => {
        setOrder((current) => [...current.slice(1), current[0]]);
        setLeaving(false);
      }, exitDuration);
    }, interval);
    return () => window.clearInterval(timer);
  }, [images.length, interval, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full overflow-hidden", aspectClassName, className)}
    >
      {images.map((image, imageIndex) => {
        const position = order.indexOf(imageIndex);
        const isTop = position === 0;
        return (
          <div
            key={image.src}
            className={cn(
              "absolute inset-0 overflow-hidden rounded-lg bg-ink-800",
              "transition-all duration-500 ease-out",
              depthClasses[position] ?? "z-0 scale-[0.94] translate-y-4 opacity-0",
              isTop &&
                "shadow-[0_10px_30px_rgba(0,0,0,0.3),0_0_20px_rgba(245,166,35,0.1)]",
              /* Saída: swipe com rotação — ou fade com reduced motion
                 (a keyframe é anulada pela media query no CSS) */
              isTop && leaving && "animate-swipe-out opacity-0 duration-300",
            )}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className={cn(
                fit === "cover" ? "object-cover object-top" : "object-contain",
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
