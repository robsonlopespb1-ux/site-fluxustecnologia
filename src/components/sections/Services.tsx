import Link from "next/link";
import { homeServices } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Lista editorial numerada — sem grade de cards nem ícones genéricos (§9.1).
 * Número + título à esquerda, descrição à direita; hairlines separam as linhas.
 */
export function Services() {
  return (
    <SectionWrapper id="servicos">
      <Container>
        <div className="max-w-2xl">
          <p className="text-caption uppercase tracking-widest text-brand-500">
            O que fazemos
          </p>
          <h2 className="mt-4">
            Tecnologia sob medida, do site institucional à automação com IA
          </h2>
        </div>

        <ul className="mt-14">
          {homeServices.map((service) => (
            <li
              key={service.number}
              className="group grid gap-4 border-t border-line py-8 transition-colors duration-300 last:border-b hover:border-brand-500/40 lg:grid-cols-12 lg:gap-8 lg:py-10"
            >
              <div className="flex items-baseline gap-4 lg:col-span-5 lg:gap-5">
                <span
                  aria-hidden="true"
                  className="text-xs font-semibold tabular-nums text-brand-500/70 transition-all duration-300 group-hover:text-brand-500 group-hover:[text-shadow:0_0_14px_rgba(245,166,35,0.45)] lg:text-sm"
                >
                  {service.number}
                </span>
                <h3 className="transition-transform duration-300 lg:group-hover:translate-x-1.5">
                  {service.title}
                </h3>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p>{service.description}</p>
                {service.caseRef && (
                  <Link
                    href={service.caseRef.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 underline-offset-4 transition-base hover:text-brand-600 hover:underline"
                  >
                    {service.caseRef.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Button href="/servicos" variant="outline">
            Ver todos os serviços
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
