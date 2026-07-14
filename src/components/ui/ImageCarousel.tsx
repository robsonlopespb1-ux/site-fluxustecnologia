"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageCarouselProps {
  images: readonly CarouselImage[];
  sizes?: string;
  /** Classe de aspect-ratio (ex.: "aspect-[16/10]"). Sem ela, usa a proporção da 1ª imagem. */
  aspectClassName?: string;
  className?: string;
  intervalMs?: number;
  /** Cor das bolinhas inativas conforme o fundo da seção. */
  dotsVariant?: "light" | "dark";
}

/**
 * Carrossel automático leve, sem dependências: fade de 500ms, bolinhas
 * clicáveis, pausa no hover. Com 1 imagem renderiza estático.
 * prefers-reduced-motion: sem autoplay (navegação manual continua).
 */
export function ImageCarousel({
  images,
  sizes,
  aspectClassName,
  className,
  intervalMs = 4000,
  dotsVariant = "light",
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const multiple = images.length > 1;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!multiple || paused || reducedMotion) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % images.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [multiple, paused, reducedMotion, images.length, intervalMs]);

  const first = images[0];

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={cn("relative w-full overflow-hidden", aspectClassName)}
        style={
          aspectClassName
            ? undefined
            : { aspectRatio: `${first.width} / ${first.height}` }
        }
      >
        {images.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className={cn(
              "object-cover object-top transition-opacity duration-500",
              i === index ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i !== index}
          />
        ))}
      </div>

      {multiple && (
        <div className="relative z-10 mt-3 flex justify-center gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir para imagem ${i + 1} de ${images.length}`}
              aria-current={i === index}
              className={cn(
                "size-2 rounded-full transition-base",
                i === index && "bg-brand-500",
                i !== index &&
                  (dotsVariant === "dark"
                    ? "bg-white/25 hover:bg-white/50"
                    : "bg-ink-900/20 hover:bg-ink-900/40"),
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
