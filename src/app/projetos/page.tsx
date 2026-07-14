import type { Metadata } from "next";
import Image from "next/image";
import { cases } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos reais desenvolvidos pela Fluxus Tecnologia. Portais institucionais, assistentes com IA e plataformas SaaS.",
  alternates: { canonical: "/projetos" },
};

export default function ProjetosPage() {
  return (
    <>
      <PageHero
        eyebrow="Projetos"
        title="Cada projeto nasce de um problema real"
        subtitle={
          <EnergizedText
            as="p"
            text="Conheça as soluções que desenvolvemos para organizações que precisavam de tecnologia sob medida."
          />
        }
      />

      {/* Grid editorial: 1 projeto por linha, lado do screenshot alternando */}
      <SectionWrapper className="section-light">
        <Container>
          <div className="flex flex-col gap-20 lg:gap-24">
            {cases.map((item, index) => {
              const image = item.images[0];
              const reversed = index % 2 === 1;
              return (
                <ScrollReveal key={item.slug} as="div" delay={100}>
                  <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                    <figure
                      className={cn(
                        "overflow-hidden rounded-xl border border-paper-line bg-white p-2 shadow-[0_16px_40px_-18px_rgba(13,13,13,0.25)] lg:col-span-7",
                        reversed && "lg:order-2 lg:col-start-6",
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="mx-auto w-full max-w-md rounded-lg lg:max-w-none"
                      />
                    </figure>

                    <div className={cn("lg:col-span-5", reversed && "lg:order-1 lg:col-start-1")}>
                      <span className="inline-flex items-center rounded-full border border-brand-700/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                        {item.type}
                      </span>
                      <h2 className="mt-4">{item.name}</h2>
                      <p className="mt-1 text-sm">{item.organization}</p>
                      <p className="mt-4">{item.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {item.features.slice(0, 4).map((feature) => (
                          <li
                            key={feature}
                            className="rounded-full border border-paper-line bg-white px-3 py-1 text-xs text-[#52525b]"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-7">
                        <Button
                          href={`/projetos/${item.slug}`}
                          variant="outline"
                          className="text-ink-900 hover:bg-brand-500/10"
                        >
                          Ver detalhes →
                        </Button>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-ink-950">
        <Container className="text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="mx-auto max-w-2xl text-balance">
              Quer ver seu projeto aqui?
            </h2>
            <div className="mt-10">
              <Button href="/contato" size="lg" className="w-full sm:w-auto">
                Fale com a Fluxus
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  );
}
