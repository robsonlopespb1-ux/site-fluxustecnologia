import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Hero interno das páginas: menor que o da Home, sem vídeo — tipografia
 * forte sobre fundo profundo (§5.2/§9.2).
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-ink-950">
      <Container className="py-20 lg:py-28">
        <ScrollReveal>
          <p className="text-caption uppercase tracking-widest text-brand-500">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance">{title}</h1>
          {subtitle && <div className="mt-6 max-w-2xl text-lg">{subtitle}</div>}
          {children}
        </ScrollReveal>
      </Container>
    </section>
  );
}
