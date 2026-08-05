import { product } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Produto próprio — tratamento visual distinto de serviços (§5.1/§10.3):
 * fundo ink-950, badge de produto e screenshots reais em carrossel dentro
 * de moldura de browser. fit="contain": os screenshots têm proporções
 * heterogêneas (banners largos + telas).
 */
export function Product() {
  return (
    <SectionWrapper id="produto" className="border-y border-line bg-ink-950">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Texto */}
          <div>
            <ScrollReveal animation="fade-in">
              <span className="inline-flex items-center rounded-full border border-brand-500/40 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-500">
                {product.badge}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="mt-6">{product.name}</h2>
              <p className="mt-5 max-w-lg">{product.description}</p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {product.modules.map((module) => (
                  <li key={module.name}>
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-sm bg-brand-500"
                      />
                      <span className="text-sm font-semibold text-text-primary">
                        {module.name}
                      </span>
                      {!module.available && (
                        <span className="rounded-full border border-brand-500/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-500">
                          Em breve
                        </span>
                      )}
                    </div>
                    <p className="mt-1 pl-4 text-xs leading-relaxed">
                      {module.description}
                    </p>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={300} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              {/* CTA principal vai direto ao site do SaaS; detalhes internos no secundário */}
              <Button
                href={product.externalUrl}
                external
                size="lg"
                className="w-full sm:w-auto"
              >
                {product.cta.label} →
              </Button>
              <Button
                href={product.secondaryCta.href}
                variant="outline"
                className="w-full sm:w-auto"
              >
                {product.secondaryCta.label}
              </Button>
            </ScrollReveal>
          </div>

          {/* Screenshots reais em carrossel, moldura de browser em CSS (§7.3) */}
          <div>
            <ScrollReveal animation="fade-right" delay={300}>
              <figure className="overflow-hidden rounded-xl border border-line bg-ink-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_55px_rgba(245,166,35,0.1)] transition-shadow duration-300 hover:shadow-[0_32px_70px_-12px_rgba(0,0,0,0.7),0_0_70px_rgba(245,166,35,0.14)]">
                <div
                  aria-hidden="true"
                  className="flex items-center gap-1.5 border-b border-line px-4 py-3"
                >
                  <span className="size-2.5 rounded-full bg-ink-700" />
                  <span className="size-2.5 rounded-full bg-ink-700" />
                  <span className="size-2.5 rounded-full bg-ink-700" />
                </div>
                <ImageCarousel
                  images={product.screenshots}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  aspectClassName="aspect-[1345/500]"
                  fit="contain"
                  dotsVariant="dark"
                  className="pb-3"
                />
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
