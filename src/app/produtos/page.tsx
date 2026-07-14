import type { Metadata } from "next";
import { cases, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Produtos | Fluxus Tecnologia",
  description:
    "Produtos digitais próprios da Fluxus Tecnologia. Conheça o Fluxus Gestão para Igrejas — plataforma SaaS modular.",
};

const productModules = [
  {
    name: "Gestão de Membros",
    description: "Cadastro completo, visitantes, novos convertidos, check-in e acompanhamento.",
  },
  {
    name: "Financeiro",
    description: "Contas, lançamentos, dízimos, ofertas, relatórios e fluxo de caixa.",
  },
  {
    name: "Ação Social",
    description: "Beneficiários, distribuições, estoque, projetos sociais e voluntários.",
  },
  {
    name: "Banco de Voluntários",
    description: "Cadastro, disponibilidade, escalas e acompanhamento.",
  },
  {
    name: "Eventos",
    description: "Planejamento, inscrições e gestão de eventos da igreja.",
  },
  {
    name: "Relatórios e Indicadores",
    description: "Dashboards, relatórios em PDF/Excel e indicadores de gestão.",
  },
  {
    name: "Multi-templo",
    description: "Gestão centralizada de múltiplos templos em uma única plataforma.",
  },
];

export default function ProdutosPage() {
  const productCase = cases.find((item) => item.slug === "fluxus-gestao-igrejas");

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
            <p className="mt-5">
              Plataforma modular criada para simplificar a gestão de igrejas.
              Cada módulo foi pensado para resolver um problema real do dia a
              dia — desde o controle de membros até a gestão financeira
              completa, passando por ação social, voluntários e eventos.
            </p>
          </ScrollReveal>

          {/* Screenshots reais */}
          {productCase && (
            <ScrollReveal delay={200} className="mt-12">
              <figure className="overflow-hidden rounded-xl border border-paper-line bg-white p-2 shadow-[0_20px_50px_-20px_rgba(13,13,13,0.25)] sm:p-3">
                <ImageCarousel
                  images={productCase.images}
                  sizes="(min-width: 1024px) 80rem, 100vw"
                  className="overflow-hidden rounded-lg pb-1"
                />
              </figure>
            </ScrollReveal>
          )}

          {/* Módulos */}
          <ScrollReveal delay={100} className="mt-16">
            <h3 className="text-caption uppercase tracking-widest">
              Módulos disponíveis
            </h3>
          </ScrollReveal>
          <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {productModules.map((module, index) => (
              <ScrollReveal key={module.name} delay={index * 80}>
                <span
                  aria-hidden="true"
                  className="block size-2 rounded-sm bg-brand-500"
                />
                <h4 className="mt-3">{module.name}</h4>
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
              <p className="text-sm">
                Produto em desenvolvimento — em breve em domínio próprio.
              </p>
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
