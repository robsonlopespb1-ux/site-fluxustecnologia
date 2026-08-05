import type { Metadata } from "next";
import { product, productScreenshots, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Produtos digitais próprios da Fluxus Tecnologia. Conheça o Fluxus Gestão para Igrejas — plataforma SaaS modular.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nossos produtos"
        title="Produtos próprios que nascem da prática"
        subtitle={
          <p>
            Além de desenvolver soluções sob medida, criamos produtos digitais
            próprios para resolver problemas que encontramos no caminho.
          </p>
        }
      />

      {/* Fluxus Gestão para Igrejas — fundo claro */}
      <SectionWrapper className="section-light">
        <Container>
          <ScrollReveal className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-brand-700/40 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
              Produto próprio · SaaS
            </span>
            <EnergizedText as="h2" className="mt-6" text="Fluxus Gestão para Igrejas" />
            <p className="mt-5">{product.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-paper-line bg-white px-3 py-1 text-xs text-[#52525b]"
                >
                  {fact}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Screenshots reais */}
          <ScrollReveal delay={200} className="mt-12">
            <figure className="overflow-hidden rounded-xl border border-paper-line bg-white p-2 shadow-[0_20px_50px_-20px_rgba(13,13,13,0.25)] sm:p-3">
              <ImageCarousel
                images={productScreenshots}
                sizes="(min-width: 1024px) 80rem, 100vw"
                aspectClassName="aspect-[1345/500]"
                fit="contain"
                className="overflow-hidden rounded-lg pb-1"
              />
            </figure>
          </ScrollReveal>

          {/* Módulos */}
          <ScrollReveal delay={100} className="mt-16">
            <h3 className="text-caption uppercase tracking-widest">
              Módulos disponíveis
            </h3>
          </ScrollReveal>
          <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {product.modules.map((module, index) => (
              <ScrollReveal key={module.name} delay={index * 80}>
                <span
                  aria-hidden="true"
                  className="block size-2 rounded-sm bg-brand-500"
                />
                <div className="mt-3 flex items-center gap-2">
                  <h4>{module.name}</h4>
                  {!module.available && (
                    <span className="rounded-full border border-brand-700/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-700">
                      Em breve
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm">{module.description}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={150} className="mt-14">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/contato" size="lg">
                Solicitar demonstração
              </Button>
              {/* [CONTEÚDO PENDENTE] trocar pelo link do subdomínio
                  igrejas.fluxustecnologia.com.br quando o produto estiver no ar */}
              <p className="text-sm font-medium text-ink-900">{product.pricing}</p>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Próximos produtos — fundo escuro */}
      <SectionWrapper className="border-t border-line bg-ink-950">
        <Container className="text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="mx-auto max-w-2xl text-balance">O que vem por aí</h2>
            <p className="mx-auto mt-4 max-w-xl">
              Estamos sempre desenvolvendo. Novos produtos estão em planejamento
              — cada um nascendo de um problema real que encontramos no caminho.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href={site.instagram.url} external variant="outline">
                Acompanhe no Instagram
              </Button>
              <Button href="/contato">Fale conosco</Button>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  );
}
