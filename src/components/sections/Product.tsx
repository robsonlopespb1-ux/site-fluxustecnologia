import Image from "next/image";
import { product } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Produto próprio — tratamento visual distinto de serviços (§5.1/§10.3):
 * fundo ink-950, badge de produto e screenshots reais em moldura de browser.
 */
export function Product() {
  const [main, ...thumbs] = product.screenshots;

  return (
    <SectionWrapper id="produto" className="border-y border-line bg-ink-950">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Texto */}
          <div>
            <span className="inline-flex items-center rounded-full border border-brand-500/40 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-500">
              {product.badge}
            </span>
            <h2 className="mt-6">{product.name}</h2>
            <p className="mt-5 max-w-lg">{product.description}</p>

            <ul className="mt-8 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              {product.modules.map((moduleName) => (
                <li
                  key={moduleName}
                  className="flex items-center gap-2.5 text-sm text-text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-sm bg-brand-500"
                  />
                  {moduleName}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={product.cta.href} size="lg">
                {product.cta.label}
              </Button>
            </div>
          </div>

          {/* Screenshots reais em moldura de browser (composta em CSS — §7.3) */}
          <div>
            <figure className="overflow-hidden rounded-xl border border-line bg-ink-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_55px_rgba(245,166,35,0.1)] transition-shadow duration-300 hover:shadow-[0_32px_70px_-12px_rgba(0,0,0,0.7),0_0_70px_rgba(245,166,35,0.14)]">
              <div
                aria-hidden="true"
                className="flex items-center gap-1.5 border-b border-line px-4 py-3"
              >
                <span className="size-2.5 rounded-full bg-ink-700" />
                <span className="size-2.5 rounded-full bg-ink-700" />
                <span className="size-2.5 rounded-full bg-ink-700" />
              </div>
              <Image
                src={main.src}
                alt={main.alt}
                width={main.width}
                height={main.height}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full"
              />
            </figure>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {thumbs.map((shot) => (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="w-full rounded-lg border border-line transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
