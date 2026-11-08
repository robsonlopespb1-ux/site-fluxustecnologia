import type { Metadata } from "next";
import Image from "next/image";
import { cases } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ClipRevealCarousel } from "@/components/ui/ClipRevealCarousel";
import { Container } from "@/components/ui/Container";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { FlashlightReveal } from "@/components/ui/FlashlightReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Sites institucionais, sistemas web, inteligência artificial e consultoria em tecnologia. Soluções digitais sob medida para sua organização.",
  alternates: { canonical: "/solucoes" },
};

interface Solution {
  number: string;
  title: string;
  light: boolean;
  paragraphs: string[];
  includes: string[];
  caseSlug?: string;
  /** Carrossel com clip-path reveal no lugar do screenshot estático. */
  revealImages?: { src: string; alt: string }[];
  /** Substitui o botão de case externo por um CTA interno. */
  ctaOverride?: { label: string; href: string };
}

const solutions: Solution[] = [
  {
    number: "01",
    title: "Sites institucionais",
    light: true,
    paragraphs: [
      "Um site institucional é, muitas vezes, o primeiro contato de alguém com a sua organização. Desenvolvemos sites profissionais que passam confiança desde o primeiro clique — responsivos, acessíveis e rápidos em qualquer dispositivo.",
      "Cada projeto é construído com otimização para mecanismos de busca e arquitetura preparada para crescer: quando a organização precisar de novas páginas, áreas ou integrações, a base já está pronta.",
    ],
    includes: [
      "Responsivo em qualquer dispositivo",
      "Otimizado para mecanismos de busca",
      "Carregamento rápido e fluido",
      "Acessível e dentro dos padrões web",
      "Arquitetura escalável",
      "Autonomia para atualizar conteúdo",
    ],
    revealImages: [
      {
        src: "/images/cases/portal-conselho-home.png",
        alt: "Página inicial do Portal do Conselho da Comunidade da Comarca de João Pessoa",
      },
      {
        src: "/images/cases/mp-viagens-header.png",
        alt: "Topo do site da MP Viagens",
      },
    ],
    ctaOverride: { label: "Ver nossos sites →", href: "/projetos" },
  },
  {
    number: "02",
    title: "Sistemas e aplicações web",
    light: false,
    paragraphs: [
      "Planilhas espalhadas, informações duplicadas e tarefas manuais consomem o tempo de qualquer equipe. Desenvolvemos sistemas personalizados que organizam informações, automatizam tarefas repetitivas e geram relatórios confiáveis.",
      "O processo começa pelo levantamento dos requisitos reais da operação — e termina com uma interface que a equipe consegue usar sem manual, com suporte contínuo da Fluxus.",
    ],
    includes: [
      "Levantamento de requisitos sob medida",
      "Arquitetura escalável e segura",
      "Interface intuitiva sem manual",
      "Integrações com sistemas existentes",
      "Relatórios e dashboards automáticos",
      "Suporte contínuo pós-entrega",
    ],
    revealImages: [
      {
        src: "/images/cases/sistemas-01.png",
        alt: "Dashboard do sistema Fluxus Igrejas",
      },
      {
        src: "/images/cases/sistemas-02.png",
        alt: "Painel administrativo do sistema",
      },
      {
        src: "/images/cases/sistemas-03.png",
        alt: "Página inicial do sistema Lanche Digital para cantinas escolares",
      },
      {
        src: "/images/cases/sistemas-04.png",
        alt: "Tela de acesso do sistema Escritório Social de gestão e atendimento",
      },
      {
        src: "/images/cases/sistemas-05.png",
        alt: "Tela de acesso do sistema Audiências de Custódia",
      },
    ],
    ctaOverride: { label: "Ver nossos sistemas →", href: "/produtos" },
  },
  {
    number: "03",
    title: "IA e automações",
    light: true,
    paragraphs: [
      "Inteligência artificial aplicada com propósito: assistentes virtuais que respondem dúvidas a qualquer hora, automação de atendimentos repetitivos e consulta inteligente de informações institucionais.",
      "Cada assistente é construído com escopo definido e integrado aos sistemas que a organização já usa — a BIA, assistente do Conselho da Comunidade JP, nasceu exatamente assim.",
    ],
    includes: [
      "Assistentes virtuais (chatbots)",
      "Automação de atendimento",
      "Consulta inteligente de informações",
      "Integração com sistemas existentes",
    ],
    caseSlug: "bia-assistente-virtual",
  },
  {
    number: "04",
    title: "Consultoria em tecnologia",
    light: false,
    paragraphs: [
      "Nem todo problema começa com desenvolvimento — alguns começam com decisão. A consultoria da Fluxus orienta organizações que precisam escolher caminhos tecnológicos com clareza, antes de investir.",
      "Diagnosticamos a situação atual, planejamos as soluções e entregamos um roadmap prático: o que fazer, em que ordem e com quais ferramentas.",
    ],
    includes: [
      "Diagnóstico tecnológico",
      "Planejamento de soluções",
      "Escolha de ferramentas",
      "Estruturação de processos",
      "Roadmap de implementação",
    ],
  },
];

export default function SolucoesPage() {
  return (
    <>
      {/* Hero com efeito lanterna: a palavra "Fluxus" gigante escondida no
          escuro é revelada pelo círculo de luz que segue o mouse (PageHero
          inline — o fundo opaco do componente compartilhado cobriria a
          marca d'água) */}
      <FlashlightReveal
        watermarkText="Fluxus"
        className="border-b border-line bg-ink-950"
      >
        <section>
          <Container className="py-20 lg:py-28">
            <ScrollReveal>
              <p className="text-caption uppercase tracking-widest text-brand-500">
                Soluções
              </p>
              <h1 className="mt-4 max-w-3xl text-balance">
                Tecnologia sob medida para cada desafio
              </h1>
              <div className="mt-6 max-w-2xl text-lg">
                <EnergizedText
                  as="p"
                  text="Do site institucional à automação com IA — desenvolvemos a solução certa para o problema real da sua organização."
                />
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </FlashlightReveal>

      {solutions.map((solution) => {
        const relatedCase = solution.caseSlug
          ? cases.find((item) => item.slug === solution.caseSlug)
          : undefined;
        const caseImage = relatedCase?.images[0];
        const hasMedia = Boolean(caseImage || solution.revealImages);

        return (
          <SectionWrapper
            key={solution.number}
            className={cn(
              solution.light ? "section-light" : "border-y border-line bg-ink-950",
            )}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Texto */}
                <ScrollReveal className={cn("lg:col-span-6", !hasMedia && "lg:col-span-7")}>
                  <span
                    aria-hidden="true"
                    className="text-stat text-brand-500"
                  >
                    {solution.number}
                  </span>
                  <h2 className="mt-4">{solution.title}</h2>
                  {solution.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="mt-5 max-w-xl">
                      {paragraph}
                    </p>
                  ))}
                  {solution.ctaOverride ? (
                    <div className="mt-8">
                      <Button
                        href={solution.ctaOverride.href}
                        variant="outline"
                        className={cn(solution.light && "text-ink-900 hover:bg-brand-500/10")}
                      >
                        {solution.ctaOverride.label}
                      </Button>
                    </div>
                  ) : (
                    relatedCase?.externalUrl && (
                      <div className="mt-8">
                        <Button
                          href={relatedCase.externalUrl}
                          external
                          variant="outline"
                          className={cn(solution.light && "text-ink-900 hover:bg-brand-500/10")}
                        >
                          Ver projeto: {relatedCase.name} →
                        </Button>
                      </div>
                    )
                  )}
                </ScrollReveal>

                {/* Lista + screenshot */}
                <div className={cn("lg:col-span-5 lg:col-start-8", !hasMedia && "lg:col-span-4 lg:col-start-9")}>
                  <ScrollReveal animation="fade-right" delay={150}>
                    <h3 className="text-caption uppercase tracking-widest">
                      O que inclui
                    </h3>
                    <ul className="mt-5 flex flex-col gap-3">
                      {solution.includes.map((item) => (
                        <li
                          key={item}
                          className={cn(
                            "flex items-center gap-2.5 text-sm",
                            solution.light ? "text-[#52525b]" : "text-text-secondary",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className="size-1.5 shrink-0 rounded-sm bg-brand-500"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>

                  {solution.revealImages && (
                    <ScrollReveal animation="fade-right" delay={250} className="mt-8">
                      <figure
                        className={cn(
                          "overflow-hidden rounded-xl border p-2",
                          solution.light
                            ? "border-paper-line bg-white shadow-[0_16px_40px_-18px_rgba(13,13,13,0.25)]"
                            : "border-line bg-ink-800",
                        )}
                      >
                        <ClipRevealCarousel
                          images={solution.revealImages}
                          className="overflow-hidden rounded-lg"
                        />
                      </figure>
                    </ScrollReveal>
                  )}

                  {caseImage && (
                    <ScrollReveal animation="fade-right" delay={250} className="mt-8">
                      <figure
                        className={cn(
                          "overflow-hidden rounded-xl border p-2",
                          solution.light
                            ? "border-paper-line bg-white shadow-[0_16px_40px_-18px_rgba(13,13,13,0.25)]"
                            : "border-line bg-ink-800",
                        )}
                      >
                        <Image
                          src={caseImage.src}
                          alt={caseImage.alt}
                          width={caseImage.width}
                          height={caseImage.height}
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="mx-auto w-full max-w-sm rounded-lg lg:max-w-none"
                        />
                      </figure>
                    </ScrollReveal>
                  )}
                </div>
              </div>
            </Container>
          </SectionWrapper>
        );
      })}

      {/* CTA */}
      <SectionWrapper className="section-light">
        <Container className="text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="mx-auto max-w-2xl text-balance">
              Tem um desafio que a tecnologia pode resolver?
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
