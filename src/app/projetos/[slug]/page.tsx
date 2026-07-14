import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/* Slugs fora da lista → 404 em build/runtime (§3.2) */
export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} | Projetos | Fluxus Tecnologia`,
    description: item.description,
  };
}

export default async function ProjetoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) notFound();

  const hasResultSection = Boolean(
    item.externalUrl || item.testimonial || item.metrics,
  );

  return (
    <>
      {/* Hero do projeto */}
      <section className="border-b border-line bg-ink-950">
        <Container className="py-16 lg:py-24">
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="text-caption">
              <Link href="/projetos" className="transition-base hover:text-text-secondary">
                Projetos
              </Link>
              <span aria-hidden="true" className="mx-2">
                ›
              </span>
              <span className="text-text-secondary">{item.name}</span>
            </nav>
            <span className="mt-6 inline-flex items-center rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-500">
              {item.type}
            </span>
            <h1 className="mt-4 max-w-3xl text-balance">{item.name}</h1>
            <p className="mt-2 text-sm text-text-tertiary">{item.organization}</p>
            <p className="mt-5 max-w-2xl text-lg">{item.description}</p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Sobre o projeto */}
      <SectionWrapper className="section-light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-6">
              <h2>Sobre o projeto</h2>
              {/* [CONTEÚDO PENDENTE] descrição expandida por projeto —
                  por ora, a descrição curta de src/data/site.ts */}
              <p className="mt-5 max-w-xl">{item.description}</p>
            </ScrollReveal>
            <ScrollReveal delay={150} className="lg:col-span-5 lg:col-start-8">
              <h3 className="text-caption uppercase tracking-widest">
                O que o projeto entrega
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border border-paper-line bg-white px-3.5 py-1.5 text-sm text-[#52525b]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              {item.technologies.length > 0 && (
                <>
                  <h3 className="mt-8 text-caption uppercase tracking-widest">
                    Tecnologias
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-paper-line px-3 py-1 text-xs text-[#52525b]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </ScrollReveal>
          </div>
        </Container>
      </SectionWrapper>

      {/* Screenshots */}
      <SectionWrapper className="border-y border-line bg-ink-950">
        <Container>
          <ScrollReveal>
            <figure className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-line bg-ink-800 p-2 sm:p-3">
              <ImageCarousel
                images={item.images}
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="overflow-hidden rounded-lg"
                dotsVariant="dark"
              />
            </figure>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Resultado / link ao vivo — só renderiza com dados reais (§11) */}
      {hasResultSection && (
        <SectionWrapper className="section-light">
          <Container className="text-center">
            <ScrollReveal>
              {item.externalUrl && (
                <>
                  <h2 className="mx-auto max-w-2xl text-balance">
                    O projeto está no ar
                  </h2>
                  <div className="mt-8">
                    <Button href={item.externalUrl} external size="lg">
                      Ver projeto ao vivo →
                    </Button>
                  </div>
                </>
              )}
              {/* Estrutura pronta para depoimento e métricas reais (§7.2):
                  os campos são null até existirem dados autorizados. */}
              {item.testimonial}
              {item.metrics}
            </ScrollReveal>
          </Container>
        </SectionWrapper>
      )}

      {/* CTA */}
      <SectionWrapper className="bg-ink-900">
        <Container className="text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="mx-auto max-w-2xl text-balance">
              Quer um projeto como este?
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
