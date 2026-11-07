"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface RevealImage {
  src: string;
  alt: string;
}

interface ClipRevealCarouselProps {
  images: readonly RevealImage[];
  /** Intervalo entre trocas (ms). */
  interval?: number;
  /** Proporção do container (ex.: "aspect-[1365/593]"). */
  aspectClassName?: string;
  className?: string;
}

/**
 * Carrossel com clip-path reveal diagonal: a imagem que entra varre a tela
 * do canto superior esquerdo, precedida por uma lâmina dourada (a camada
 * brand-500 roda a MESMA animação ~70ms à frente da imagem — a borda do
 * wipe fica dourada, assinatura Fluxus).
 * Decorativo: container aria-hidden. prefers-reduced-motion: sem wipe
 * (troca seca via CSS animation:none) e sem autoplay (JS nem agenda).
 */
export function ClipRevealCarousel({
  images,
  interval = 4000,
  aspectClassName = "aspect-[1365/593]",
  className,
}: ClipRevealCarouselProps) {
  const [index, setIndex] = useState(0);
  const previousIndex = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => {
        previousIndex.current = current;
        return (current + 1) % images.length;
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [reducedMotion, images.length, interval]);

  const current = images[index];
  const previous = images[previousIndex.current];
  /* Na montagem (e com reduced motion) não houve troca — imagem estática,
     sem wipe gratuito ao carregar a página. */
  const hasSwapped = index !== previousIndex.current;

  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full overflow-hidden", aspectClassName, className)}
    >
      {/* Imagem que sai: estática por baixo até ser coberta */}
      <Image
        src={previous.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover object-top"
      />
      {/* key remonta as camadas a cada troca, re-disparando o wipe */}
      {hasSwapped ? (
        <div key={index} className="absolute inset-0">
          {/* Lâmina dourada à frente do wipe */}
          <div className="animate-clip-reveal absolute inset-0 bg-brand-500" />
          {/* Imagem que entra, ~70ms atrás da lâmina */}
          <Image
            src={current.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="animate-clip-reveal object-cover object-top"
            style={{ animationDelay: "70ms" }}
          />
        </div>
      ) : (
        <Image
          src={current.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-top"
        />
      )}
    </div>
  );
}
