"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface FlashlightRevealProps {
  /** Imagem a revelar (alternativa: watermarkText). */
  imageSrc?: string;
  imageAlt?: string;
  /** Dimensões intrínsecas da imagem revelada. */
  imageWidth?: number;
  imageHeight?: number;
  /** Texto gigante como marca d'água em vez de imagem. */
  watermarkText?: string;
  /** Classe de cor do texto da marca d'água. */
  watermarkColor?: string;
  /** Conteúdo customizado como marca d'água.
      Prioridade: watermarkContent > watermarkText > imageSrc. */
  watermarkContent?: React.ReactNode;
  /** true: o watermarkContent cobre a área inteira (fundo, ex.: vídeo);
      false: posicionado à direita, centralizado verticalmente. */
  watermarkFull?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Efeito lanterna: a logo fica como marca d'água no lado direito, coberta
 * por um overlay preto com furo radial que segue o mouse (auréola dourada
 * na borda). Sem mouse (idle/leave): preto total.
 * Mobile e prefers-reduced-motion: sem overlay — logo fixa, bem sutil.
 * O conteúdo (children) fica em z-20, sempre legível.
 */
export function FlashlightReveal({
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  watermarkText,
  watermarkColor = "text-white",
  watermarkContent,
  watermarkFull = false,
  className,
  children,
}: FlashlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const latestPos = useRef<{ x: number; y: number } | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Throttle por rAF: muitos mousemoves, um setState por frame
  const handleMouseMove = (event: React.MouseEvent) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    latestPos.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      setPos(latestPos.current);
    });
  };

  const handleMouseLeave = () => {
    latestPos.current = null;
    setPos(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Marca d'água no lado direito: conteúdo customizado, texto gigante
          OU imagem. Mobile/reduced: opacidade menor, sempre visível (sem
          overlay). */}
      {watermarkContent ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none select-none opacity-10 md:opacity-20",
            watermarkFull
              ? "absolute inset-0 h-full w-full"
              : "absolute right-4 top-1/2 -translate-y-1/2 md:right-12",
          )}
        >
          {watermarkContent}
        </div>
      ) : watermarkText ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[200px] font-bold opacity-10 md:text-[250px] md:opacity-20",
            watermarkColor,
          )}
        >
          {watermarkText}
        </span>
      ) : (
        imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            aria-hidden="true"
            width={imageWidth}
            height={imageHeight}
            className="pointer-events-none absolute right-4 top-1/2 w-[400px] -translate-y-1/2 select-none opacity-10 md:right-12 md:w-[500px] md:opacity-20"
          />
        )
      )}

      {/* Overlay-lanterna: só desktop e sem reduced motion. Sem mouse,
          preto sólido (logo escondida); com mouse, furo radial com
          auréola dourada. */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 hidden md:block"
          style={{
            background: pos
              ? `radial-gradient(circle 150px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(245,166,35,0.08) 60%, rgba(13,13,13,0.5) 80%, #0d0d0d 100%)`
              : "#0d0d0d",
          }}
        />
      )}

      {/* Conteúdo sempre acima e legível */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
