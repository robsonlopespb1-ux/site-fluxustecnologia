import type { Metadata } from "next";
import Image from "next/image";
import { product, productScreenshots, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { ExternalLinkIcon } from "@/components/ui/Icons";
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
              <p className="text-sm font-medium text-ink-900">{product.pricing}</p>
            </div>
          </ScrollReveal>

          {/* Banner "Conheça a plataforma" — escuro sobre a seção clara,
              com a luz orbital sempre ativa */}
          <ScrollReveal delay={100} className="mt-16">
            <div className="card-orbit card-orbit-always relative overflow-hidden rounded-2xl border border-line bg-ink-950 p-8 sm:p-10 lg:p-14">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                {/* Texto */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-500">
                    Plataforma online
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-text-primary lg:text-3xl">
                    Conheça o {product.name}
                  </h3>
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 break-all text-lg font-semibold text-brand-500 underline-offset-4 transition-base hover:text-brand-600 hover:underline lg:text-xl"
                  >
                    {product.urlLabel}
                    <ExternalLinkIcon className="size-4.5 shrink-0" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                  <p className="mt-4 max-w-md text-text-secondary">
                    Acesse a plataforma, explore os módulos e solicite uma
                    demonstração gratuita.
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {product.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="rounded-full border border-line px-3 py-1 text-xs text-text-secondary"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      href={product.externalUrl}
                      external
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Acessar a plataforma →
                    </Button>
                  </div>
                  <p className="mt-3 text-xs text-text-tertiary">
                    ou{" "}
                    <a
                      href={site.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 transition-base hover:text-text-secondary"
                    >
                      solicite uma demonstração pelo WhatsApp
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </p>
                </div>

                {/* Screenshot em moldura de browser */}
                <figure className="overflow-hidden rounded-xl border border-line bg-ink-800 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.7),0_0_45px_rgba(245,166,35,0.1)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_26px_60px_-16px_rgba(0,0,0,0.8),0_0_60px_rgba(245,166,35,0.16)]">
                  <div
                    aria-hidden="true"
                    className="flex items-center gap-1.5 border-b border-line px-4 py-3"
                  >
                    <span className="size-2.5 rounded-full bg-ink-700" />
                    <span className="size-2.5 rounded-full bg-ink-700" />
                    <span className="size-2.5 rounded-full bg-ink-700" />
                  </div>
                  <Image
                    src={productScreenshots[3].src}
                    alt={productScreenshots[3].alt}
                    width={productScreenshots[3].width}
                    height={productScreenshots[3].height}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="w-full"
                  />
                </figure>
              </div>
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
