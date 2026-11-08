"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface KbImage {
  src: string;
  alt: string;
}

interface KenBurnsCarouselProps {
  images: readonly KbImage[];
  /** Tempo de exibição de cada imagem (ms) — o zoom preenche o período. */
  interval?: number;
  aspectClassName?: string;
  className?: string;
}

const KB_VARIANTS = ["animate-kb-1", "animate-kb-2", "animate-kb-3", "animate-kb-4"];

/**
 * Ken Burns: cada imagem fica 5s em cena com zoom lento + pan sutil
 * (variação por índice % 4) e troca por crossfade de 1s — a próxima já
 * entra em movimento durante o fade.
 * Duas camadas alternam (A/B): a inativa segura a imagem anterior (com o
 * fim do seu movimento congelado via fill both) enquanto desvanece.
 * prefers-reduced-motion: keyframes anulados no CSS — resta o crossfade.
 * Decorativo: container aria-hidden.
 */
export function KenBurnsCarousel({
  images,
  interval = 5000,
  aspectClassName = "aspect-video",
  className,
}: KenBurnsCarouselProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(
      () => setTick((current) => current + 1),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [images.length, interval]);

  const count = images.length;
  const currentIndex = tick % count;
  const previousIndex = (tick - 1 + count) % count;
  const activeLayer = tick % 2;

  /* Cada camada mostra a imagem corrente quando é a ativa; senão, retém a
     anterior durante o fade-out. O tick serve de key para reiniciar o
     movimento a cada entrada. */
  const layers = [0, 1].map((layer) => {
    const isActive = layer === activeLayer;
    const imageIndex = isActive ? currentIndex : previousIndex;
    return {
      layer,
      isActive,
      image: images[imageIndex],
      variant: KB_VARIANTS[imageIndex % KB_VARIANTS.length],
      motionKey: isActive ? tick : tick - 1,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden bg-ink-800",
        aspectClassName,
        className,
      )}
    >
      {layers.map(({ layer, isActive, image, variant, motionKey }) => (
        <div
          key={layer}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            isActive ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            key={motionKey}
            className={cn("absolute inset-0", variant)}
            style={{ "--kb-duration": `${interval + 1200}ms` } as React.CSSProperties}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
