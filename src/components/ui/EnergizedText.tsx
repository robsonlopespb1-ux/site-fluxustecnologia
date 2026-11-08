import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface EnergizedTextProps {
  text: string;
  className?: string;
  /** Tag do container (padrão: p). */
  as?: "p" | "h2" | "h3" | "span";
  /** Onda de glow automática em loop (além do hover, que segue ativo). */
  autoAnimate?: boolean;
}

/**
 * Texto com letras energizadas: cada letra reage ao hover com glow dourado
 * (classes .energize-letter/.energize-word do globals.css). Palavras em
 * spans inline-block preservam a quebra de linha responsiva.
 * Com autoAnimate, uma onda de glow percorre as letras em loop (delay
 * escalonado por índice global; duração = letras × 100ms + 800ms de pausa).
 * Server-compatible (efeito 100% CSS). Leitores de tela recebem o texto
 * contínuo via aria-label; os spans são aria-hidden.
 */
export function EnergizedText({
  text,
  className,
  as: Tag = "p",
  autoAnimate = false,
}: EnergizedTextProps) {
  const letterCount = text.replace(/ /g, "").length;
  let letterIndex = 0;

  return (
    <Tag
      aria-label={text}
      className={cn(className)}
      style={
        autoAnimate
          ? ({
              "--glow-duration": `${letterCount * 100 + 800}ms`,
            } as CSSProperties)
          : undefined
      }
    >
      <span aria-hidden="true">
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex}>
            {wordIndex > 0 && " "}
            <span className="energize-word inline-block">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={cn(
                    "energize-letter",
                    autoAnimate && "energize-letter-auto",
                  )}
                  style={
                    autoAnimate
                      ? ({ "--letter-index": letterIndex++ } as CSSProperties)
                      : undefined
                  }
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
