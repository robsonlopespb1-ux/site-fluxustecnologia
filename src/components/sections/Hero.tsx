"use client";

import { useEffect, useState } from "react";
import { hero } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/cn";

const ROTATE_INTERVAL_MS = 3000;
const SLIDE_DURATION_MS = 500;

const words = hero.rotatingWords;
/** Clone da primeira palavra no fim: o loop desliza até ela e "salta" de
 *  volta ao início sem transição — rotação infinita sem retorno visível. */
const columnItems = [...words, words[0]];
const longestWord = [...words].sort((a, b) => b.length - a.length)[0];

/**
 * Hero com vídeo de fundo decorativo e palavra rotativa vertical no h1:
 * "[Palavra] que funcionam." — a palavra sai por cima e a próxima entra
 * por baixo. Com prefers-reduced-motion: vídeo não montado e título
 * estático ("Soluções que funcionam.").
 */
export function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Avança uma posição a cada intervalo
  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(
      () => setIndex((current) => current + 1),
      ROTATE_INTERVAL_MS,
    );
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  // Ao alcançar o clone final, salta para o início sem transição
  useEffect(() => {
    if (index !== words.length) return;
    const snap = window.setTimeout(() => {
      setWithTransition(false);
      setIndex(0);
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => setWithTransition(true)),
      );
    }, SLIDE_DURATION_MS + 50);
    return () => window.clearTimeout(snap);
  }, [index]);

  const currentWord = words[index % words.length];

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
          {reducedMotion ? (
            <span className="text-brand-500">{hero.reducedMotionWord}</span>
          ) : (
            <>
              {/* Palavra anunciada a leitores de tela sem o ticker visual */}
              <span className="sr-only" aria-live="polite">
                {currentWord}
              </span>
              <span
                aria-hidden="true"
                className="relative inline-block h-[1.05em] overflow-hidden align-top text-brand-500"
              >
                {/* Sizer invisível: trava a largura na maior palavra (sem layout shift) */}
                <span className="invisible">{longestWord}</span>
                <span
                  className={cn(
                    "absolute inset-0 flex flex-col ease-in-out",
                    withTransition && "transition-transform duration-500",
                  )}
                  style={{ transform: `translateY(-${index * 100}%)` }}
                >
                  {columnItems.map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className={cn(
                        "block h-full shrink-0 transition-opacity duration-500",
                        i === index ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </>
          )}{" "}
          <span>{hero.titleSuffix}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg">{hero.subtitle}</p>
        <ScrollReveal
          delay={300}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
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
        </ScrollReveal>
      </Container>
    </section>
  );
}
