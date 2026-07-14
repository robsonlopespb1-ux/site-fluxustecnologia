import { differentials } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Layout editorial em duas colunas (§10.5): título sticky à esquerda,
 * lista com hairlines à direita — sem cards, sem ícones genéricos (§9.1).
 */
export function Differentials() {
  return (
    <SectionWrapper id="diferenciais" className="border-y border-line bg-ink-950">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {/* Reveal dentro do wrapper sticky — não interfere no range do sticky */}
            <div className="lg:sticky lg:top-24">
              <ScrollReveal animation="fade-left">
                <p className="text-caption uppercase tracking-widest text-brand-500">
                  Por que a Fluxus
                </p>
                <h2 className="mt-4">
                  O que sustenta cada projeto que entregamos
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <ul className="lg:col-span-8">
            {differentials.map((item, index) => (
              <ScrollReveal
                as="li"
                key={item.number}
                delay={index * 150}
                className="border-t border-line py-8 pl-5 [border-left:2px_solid_transparent] first:border-t-line last:border-b last:border-b-line hover:[border-left-color:var(--color-brand-500)] lg:py-10"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="text-xs font-semibold tabular-nums text-text-tertiary"
                  >
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-brand-500">{item.title}</h3>
                    <p className="mt-3 max-w-xl">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Container>
    </SectionWrapper>
  );
}
