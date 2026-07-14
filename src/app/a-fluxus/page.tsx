import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "A Fluxus",
  description:
    "Conheça a Fluxus Tecnologia — empresa de soluções digitais em João Pessoa/PB. Sites, sistemas, IA e consultoria para organizações que precisam de tecnologia sob medida.",
  alternates: { canonical: "/a-fluxus" },
};

const processSteps = [
  {
    number: "01",
    title: "Entendemos o problema",
    description:
      "Antes de qualquer código, ouvimos. Mapeamos a necessidade real, os processos existentes e os resultados esperados.",
  },
  {
    number: "02",
    title: "Planejamos a solução",
    description:
      "Definimos a arquitetura, as tecnologias e o caminho mais eficiente para transformar o problema em produto.",
  },
  {
    number: "03",
    title: "Construímos com qualidade",
    description:
      "Desenvolvemos com código limpo, testes e atenção à experiência do usuário. Cada entrega funciona de verdade.",
  },
  {
    number: "04",
    title: "Acompanhamos o resultado",
    description:
      "Não desaparecemos após a entrega. Mantemos proximidade, iteramos e garantimos que a solução evolua junto com a organização.",
  },
];

const values = [
  {
    title: "Honestidade técnica",
    description:
      "Não prometemos o que não podemos entregar. Se uma solução simples resolve, recomendamos a simples.",
  },
  {
    title: "Resultado acima de tendência",
    description:
      "Usamos tecnologia que funciona, não a que está na moda. A escolha técnica serve ao problema, não ao portfólio.",
  },
  {
    title: "Proximidade real",
    description:
      "Cada cliente tem acesso direto a quem constrói. Sem camadas de atendimento entre o problema e a solução.",
  },
  {
    title: "Responsabilidade com IA",
    description:
      "Inteligência artificial é uma ferramenta poderosa. Usamos com escopo definido, transparência e propósito claro.",
  },
];

export default function AFluxusPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre a Fluxus"
        title="Tecnologia com propósito e resultado"
        subtitle={
          <p>
            Somos uma empresa de tecnologia em João Pessoa/PB. Desenvolvemos
            sites, sistemas, plataformas e soluções com inteligência artificial
            para organizações que precisam de tecnologia sob medida.
          </p>
        }
      />

      {/* O que nos move — fundo claro */}
      <SectionWrapper className="section-light">
        <Container>
          <ScrollReveal className="max-w-2xl">
            <EnergizedText as="h2" text="O que nos move" />
          </ScrollReveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <h3>Propósito</h3>
              <p className="mt-4">
                Acreditamos que tecnologia boa é a que resolve problemas reais.
                Não criamos soluções genéricas — cada projeto nasce de uma
                necessidade concreta e é construído para funcionar no dia a dia
                de quem vai usar.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h3>Abordagem</h3>
              <p className="mt-4">
                Combinamos conhecimento técnico com compreensão institucional.
                Entendemos como organizações funcionam por dentro — seus
                processos, desafios e objetivos — antes de propor qualquer
                solução tecnológica.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </SectionWrapper>

      {/* Como trabalhamos — fundo escuro, lista editorial */}
      <SectionWrapper className="border-y border-line bg-ink-950">
        <Container>
          <ScrollReveal className="max-w-2xl">
            <h2>Como trabalhamos</h2>
          </ScrollReveal>
          <ul className="mt-12">
            {processSteps.map((step, index) => (
              <ScrollReveal
                as="li"
                key={step.number}
                delay={index * 150}
                className="grid gap-3 border-t border-line py-8 last:border-b lg:grid-cols-12 lg:gap-8 lg:py-10"
              >
                <div className="flex items-baseline gap-4 lg:col-span-5">
                  <span
                    aria-hidden="true"
                    className="text-xs font-semibold tabular-nums text-brand-500"
                  >
                    {step.number}
                  </span>
                  <h3>{step.title}</h3>
                </div>
                <p className="lg:col-span-6 lg:col-start-7">{step.description}</p>
              </ScrollReveal>
            ))}
          </ul>
        </Container>
      </SectionWrapper>

      {/* Valores — fundo claro, blocos com marcador (sem cards) */}
      <SectionWrapper className="section-light">
        <Container>
          <ScrollReveal className="max-w-2xl">
            <h2>No que acreditamos</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <span
                  aria-hidden="true"
                  className="block size-2 rounded-sm bg-brand-500"
                />
                <h3 className="mt-4">{value.title}</h3>
                <p className="mt-3">{value.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-ink-950">
        <Container className="text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="mx-auto max-w-2xl text-balance">Vamos conversar?</h2>
            <p className="mx-auto mt-4 max-w-xl">
              Conheça o que já entregamos ou conte o problema que você precisa
              resolver.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/projetos" size="lg">
                Ver projetos
              </Button>
              <Button href="/contato" size="lg" variant="outline">
                Fale conosco
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  );
}
