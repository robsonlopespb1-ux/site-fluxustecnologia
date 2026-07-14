"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealAnimation = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";

const animationClasses: Record<RevealAnimation, string | null> = {
  "fade-up": "scroll-reveal-up",
  "fade-in": null,
  "fade-left": "scroll-reveal-left",
  "fade-right": "scroll-reveal-right",
  "scale-in": "scroll-reveal-scale",
};

/*
 * Observers compartilhados por threshold: com 15+ reveals na página, um
 * IntersectionObserver por elemento seria desperdício — todos os elementos
 * com o mesmo threshold dividem uma única instância.
 */
const sharedObservers = new Map<number, IntersectionObserver>();
const revealCallbacks = new WeakMap<Element, () => void>();

function observeOnce(element: Element, threshold: number, onReveal: () => void) {
  let observer = sharedObservers.get(threshold);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          revealCallbacks.get(entry.target)?.();
          revealCallbacks.delete(entry.target);
          obs.unobserve(entry.target);
        }
      },
      { threshold },
    );
    sharedObservers.set(threshold, observer);
  }
  revealCallbacks.set(element, onReveal);
  observer.observe(element);
  return () => {
    revealCallbacks.delete(element);
    observer.unobserve(element);
  };
}

interface ScrollRevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  /** transition-delay em ms — usar para stagger entre elementos. */
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  /** Mesclado ao style da transição (ex.: top/zIndex dos cartões sticky). */
  style?: CSSProperties;
  as?: "div" | "li" | "span" | "figure";
}

/**
 * Reveal on scroll (§16.2): dispara uma única vez, anima apenas
 * opacity/transform, respeita prefers-reduced-motion (via CSS e via JS).
 * O estado inicial oculto tem escape hatch no <noscript> do layout.
 */
export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className,
  style,
  as: Tag = "div",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || revealed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    return observeOnce(element, threshold, () => setRevealed(true));
  }, [revealed, threshold]);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        elementRef.current = node;
      }}
      className={cn(
        "scroll-reveal",
        animationClasses[animation],
        revealed && "revealed",
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
