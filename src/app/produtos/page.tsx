import type { Metadata } from "next";
import Image from "next/image";
import { product, productScreenshots, site } from "@/data/site";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { ExternalLinkIcon } from "@/components/ui/Icons";
import { FlashlightReveal } from "@/components/ui/FlashlightReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Produtos digitais próprios da Fluxus Tecnologia. Conheça o Fluxus Gestão para Igrejas — plataforma SaaS modular.",
  alternates: { canonical: "/produtos" },
};

/* Glass cards decorativos da seção "Produtos próprios". As rotações/offsets
   empilhados valem só no desktop (lg:) e com motion-safe — no mobile e com
   reduced motion os cards ficam num grid limpo, sem transform. */
interface GlassCardData {
  emoji: string;
  name: string;
  description: string;
  transform: string;
}

const glassCardsLeft: GlassCardData[] = [
  {
    emoji: "🌐",
    name: "Web",
    description: "Aplicações web modernas",
    transform:
      "motion-safe:lg:[transform:rotate(-6deg)_translate(-10px,-20px)]",
  },
  {
    emoji: "⚡",
    name: "Performance",
    description: "Rápido por padrão",
    transform: "motion-safe:lg:[transform:rotate(-3deg)_translate(-5px,0)]",
  },
  {
    emoji: "📊",
    name: "Dados",
    description: "Decisões baseadas em dados",
    transform: "motion-safe:lg:[transform:rotate(-1deg)_translate(-15px,20px)]",
  },
];

const glassCardsRight: GlassCardData[] = [
  {
    emoji: "📱",
    name: "Mobile",
    description: "Funciona em qualquer tela",
    transform: "motion-safe:lg:[transform:rotate(3deg)_translate(10px,-15px)]",
  },
  {
    emoji: "🔒",
    name: "Segurança",
    description: "Dados protegidos",
    transform: "motion-safe:lg:[transform:rotate(1deg)_translate(5px,5px)]",
  },
  {
    emoji: "🤖",
    name: "IA",
    description: "Inteligência onde faz sentido",
    transform: "motion-safe:lg:[transform:rotate(5deg)_translate(15px,25px)]",
  },
];

function GlassCard({ card }: { card: GlassCardData }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-[10px]",
        "transition-all duration-300 ease-out hover:border-brand-500/30",
        "lg:min-h-[80px] lg:w-[200px]",
        "motion-safe:lg:hover:[transform:rotate(0deg)_scale(1.05)]",
        card.transform,
      )}
    >
      <p className="text-sm font-bold text-text-primary">
        <span aria-hidden="true" className="mr-2">
          {card.emoji}
        </span>
        {card.name}
      </p>
      <p className="mt-1 text-xs text-text-secondary">{card.description}</p>
    </div>
  );
}

/* Banners de plataforma: card escuro com orbit, texto + screenshot em
   moldura de browser. Visual único, dados por plataforma. */
interface Platform {
  eyebrow: string;
  title: string;
  urlLabel: string;
  externalUrl: string;
  description: string;
  benefits: readonly string[];
  screenshot: { src: string; alt: string; width: number; height: number };
  ctaText: string;
  whatsappLinkText: string;
}

const platforms: Platform[] = [
  {
    eyebrow: "Plataforma online",
    title: `Conheça o ${product.name}`,
    urlLabel: product.urlLabel,
    externalUrl: product.externalUrl,
    description:
      "Acesse a plataforma, explore os módulos e solicite uma demonstração gratuita.",
    benefits: product.benefits,
    screenshot: {
      src: productScreenshots[3].src,
      alt: productScreenshots[3].alt,
      width: productScreenshots[3].width,
      height: productScreenshots[3].height,
    },
    ctaText: "Acessar a plataforma →",
    whatsappLinkText: "solicite uma demonstração pelo WhatsApp",
  },
  {
    eyebrow: "Plataforma online",
    title: "Conheça o Construtor Digital",
    urlLabel: "construtordigital.com.br",
    externalUrl: "http://construtordigital.com.br",
    description:
      "Gestão completa de obras para construtoras e construtores. Etapas, despesas, diário de obra e cobranças num lugar só.",
    benefits: ["Sem instalação", "7 dias grátis", "Obras ilimitadas"],
    screenshot: {
      src: "/images/cases/construtor-digital-header.png",
      alt: "Painel do Construtor Digital com obras e indicadores",
      width: 1365,
      height: 601,
    },
    ctaText: "Acessar a plataforma →",
    whatsappLinkText: "fale com a gente pelo WhatsApp",
  },
];

function PlatformBanner({ platform }: { platform: Platform }) {
  return (
    <div className="card-orbit card-orbit-always relative overflow-hidden rounded-2xl border border-line bg-ink-950 p-8 sm:p-10 lg:p-14">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Texto */}
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-500">
            {platform.eyebrow}
          </p>
          <h3 className="mt-4 text-2xl font-bold text-text-primary lg:text-3xl">
            {platform.title}
          </h3>
          <a
            href={platform.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 break-all text-lg font-semibold text-brand-500 underline-offset-4 transition-base hover:text-brand-600 hover:underline lg:text-xl"
          >
            {platform.urlLabel}
            <ExternalLinkIcon className="size-4.5 shrink-0" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <p className="mt-4 max-w-md text-text-secondary">
            {platform.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {platform.benefits.map((benefit) => (
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
              href={platform.externalUrl}
              external
              size="lg"
              className="w-full sm:w-auto"
            >
              {platform.ctaText}
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
              {platform.whatsappLinkText}
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
            src={platform.screenshot.src}
            alt={platform.screenshot.alt}
            width={platform.screenshot.width}
            height={platform.screenshot.height}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="w-full"
          />
        </figure>
      </div>
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <>
      {/* Hero com efeito lanterna: a palavra "Tecnologia" gigante em amarelo
          escondida no escuro é revelada pelo círculo de luz que segue o mouse
          (PageHero inline — o fundo opaco do componente compartilhado
          cobriria a marca d'água) */}
      {/* border-b removida: o AnimatedDivider logo abaixo faz o papel
          de separador (evita linha dupla) */}
      <FlashlightReveal
        watermarkText="Tecnologia"
        watermarkColor="text-brand-500"
        className="bg-ink-950"
      >
        <section>
          <Container className="py-20 lg:py-28">
            <ScrollReveal>
              <p className="text-caption uppercase tracking-widest text-brand-500">
                Nossos produtos
              </p>
              <h1 className="mt-4 max-w-3xl text-balance">
                Produtos próprios que nascem da prática
              </h1>
              <div className="mt-6 max-w-2xl text-lg">
                <p>
                  Além de desenvolver soluções sob medida, criamos produtos
                  digitais próprios para resolver problemas que encontramos no
                  caminho.
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </FlashlightReveal>

      <AnimatedDivider />

      {/* Produtos próprios — título energizado ao centro, glass cards
          empilhados dos lados (desktop) ou em grid limpo acima (mobile) */}
      <SectionWrapper className="bg-ink-950">
        <Container>
          <div className="lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
            {/* Mobile: todos os cards num grid 2x3, sem rotações */}
            <ScrollReveal className="grid grid-cols-2 gap-4 lg:hidden">
              {[...glassCardsLeft, ...glassCardsRight].map((card) => (
                <GlassCard key={card.name} card={card} />
              ))}
            </ScrollReveal>

            {/* Desktop: pilha esquerda */}
            <div className="hidden lg:flex lg:flex-col lg:items-end lg:gap-6">
              {glassCardsLeft.map((card, index) => (
                <ScrollReveal
                  key={card.name}
                  animation="fade-left"
                  delay={index * 120}
                >
                  <GlassCard card={card} />
                </ScrollReveal>
              ))}
            </div>

            {/* Título central */}
            <ScrollReveal className="mt-12 text-center lg:mt-0">
              <EnergizedText
                as="h2"
                text="Produtos próprios"
                autoAnimate
                className="text-5xl font-bold md:text-6xl lg:text-7xl [&_.energize-word]:block"
              />
              <p className="mx-auto mt-6 max-w-md text-center text-lg text-text-secondary">
                Criamos produtos digitais próprios para resolver problemas que
                encontramos no caminho.
              </p>
            </ScrollReveal>

            {/* Desktop: pilha direita */}
            <div className="hidden lg:flex lg:flex-col lg:items-start lg:gap-6">
              {glassCardsRight.map((card, index) => (
                <ScrollReveal
                  key={card.name}
                  animation="fade-right"
                  delay={index * 120}
                >
                  <GlassCard card={card} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Banners de plataforma — mesmo visual, dados diferentes,
          um divider antes de cada um */}
      {platforms.map((platform) => (
        <div key={platform.urlLabel}>
          <AnimatedDivider />
          <SectionWrapper className="section-light">
            <Container>
              <ScrollReveal delay={100}>
                <PlatformBanner platform={platform} />
              </ScrollReveal>
            </Container>
          </SectionWrapper>
        </div>
      ))}

      <AnimatedDivider />

      {/* Próximos produtos — fundo escuro (border-t removida: o
          AnimatedDivider acima é o separador) */}
      <SectionWrapper className="bg-ink-950">
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
