import { cn } from "@/lib/cn";

interface EnergizedTextProps {
  text: string;
  className?: string;
  /** Tag do container (padrão: p). */
  as?: "p" | "h2" | "h3" | "span";
}

/**
 * Texto com letras energizadas: cada letra reage ao hover com glow dourado
 * (classes .energize-letter/.energize-word do globals.css). Palavras em
 * spans inline-block preservam a quebra de linha responsiva.
 * Server-compatible (efeito 100% CSS). Leitores de tela recebem o texto
 * contínuo via aria-label; os spans são aria-hidden.
 */
export function EnergizedText({ text, className, as: Tag = "p" }: EnergizedTextProps) {
  return (
    <Tag aria-label={text} className={cn(className)}>
      <span aria-hidden="true">
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex}>
            {wordIndex > 0 && " "}
            <span className="energize-word inline-block">
              {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="energize-letter">
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
