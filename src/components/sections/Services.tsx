import Link from "next/link";
import { homeServices } from "@/data/site";
import { ServicesHeader } from "@/components/sections/ServicesHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Seção clara com efeito fichário: cada serviço é um cartão sticky que
 * empilha sobre o anterior durante o scroll (CSS puro — sem animação JS,
 * naturalmente compatível com prefers-reduced-motion).
 */
export function Services() {
  return (
    <SectionWrapper id="servicos" className="section-light">
      <Container>
        <ServicesHeader />

        <ul className="mt-14 flex flex-col gap-6 lg:gap-8">
          {homeServices.map((service, i) => (
            <li
              key={service.number}
              className="group sticky rounded-xl border border-paper-line bg-white p-7 shadow-[0_-8px_24px_-16px_rgba(13,13,13,0.2),0_16px_40px_-20px_rgba(13,13,13,0.25)] transition-colors duration-300 hover:border-brand-500/40 sm:p-9 lg:p-12"
              style={{
                top: `calc(4.5rem + ${i} * 1.25rem)`,
                zIndex: 10 * (i + 1),
              }}
            >
              <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
                <div className="flex items-start gap-5 lg:col-span-5">
                  <span
                    aria-hidden="true"
                    className="text-stat text-brand-500"
                  >
                    {service.number}
                  </span>
                  <h3 className="pt-1">{service.title}</h3>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p>{service.description}</p>
                  {service.caseRef && (
                    <Link
                      href={service.caseRef.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 underline-offset-4 transition-base hover:underline"
                    >
                      {service.caseRef.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <Button
            href="/solucoes"
            variant="outline"
            className="text-ink-900 hover:bg-brand-500/10"
          >
            Ver todas as soluções
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
