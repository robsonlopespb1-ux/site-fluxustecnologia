import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Fechamento em amarelo pleno — a única área grande de cor da página,
 * usada como seção de assinatura (§8.1). Texto sempre escuro sobre amarelo.
 */
export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-brand-500">
      {/* Marca d'água do "F" — detalhe gráfico da marca (§8.5) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-24 select-none text-[22rem] font-bold leading-none text-ink-950/5"
      >
        F
      </span>

      <Container className="relative py-20 text-center lg:py-28">
        <ScrollReveal animation="scale-in">
          <h2 className="mx-auto max-w-2xl text-balance text-ink-950">
            Tem um projeto em mente?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-950/70">
            Conte o problema que você precisa resolver — a conversa começa por aí.
          </p>
          <div className="mt-10">
            <Button
              href="/contato"
              size="lg"
              className="w-full bg-ink-950 text-text-primary hover:bg-ink-900 focus-visible:outline-ink-950 sm:w-auto"
            >
              Fale com a Fluxus
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
