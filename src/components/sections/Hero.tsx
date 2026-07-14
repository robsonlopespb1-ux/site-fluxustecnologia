"use client";

import { useEffect, useState } from "react";
import { hero } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const ROTATE_INTERVAL_MS = 3000;
const EXIT_DURATION_MS = 220;

/**
 * Hero com vídeo de fundo decorativo e texto rotativo no h1.
 * Com prefers-reduced-motion: vídeo não é montado e a primeira frase fica
 * estática (§16.3).
 */
export function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Rotação: fade-out para cima → troca → entrada animada (keyframe word-in)
  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setLeaving(true);
      window.setTimeout(() => {
        setPhraseIndex((current) => (current + 1) % hero.rotatingPhrases.length);
        setLeaving(false);
      }, EXIT_DURATION_MS);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[85svh] items-center overflow-hidden bg-ink-950 lg:min-h-[calc(100svh-4rem)]"
    >
      {/* Fundo decorativo */}
      {!reducedMotion && (
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      {/* Overlay para legibilidade do texto sobre o vídeo */}
      <div className="absolute inset-0 z-10 bg-ink-950/70" aria-hidden="true" />

      <Container className="relative z-20 py-16 sm:py-20">
        <h1 className="text-display max-w-4xl">
          {hero.titleStatic}
          <span aria-live="polite" className="block text-brand-500">
            <span
              key={phraseIndex}
              className={cn(
                "animate-word-in inline-block transition-base",
                leaving && "-translate-y-2 opacity-0",
              )}
            >
              {hero.rotatingPhrases[phraseIndex]}
            </span>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg">{hero.subtitle}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
            {hero.primaryCta.label}
          </Button>
          <Button
            href={hero.secondaryCta.href}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            {hero.secondaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
