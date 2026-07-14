import Link from "next/link";
import { cases } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EnergizedText } from "@/components/ui/EnergizedText";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Seção clara. Prova por demonstração (§11): case em destaque + demais em
 * grid. Cases com múltiplas imagens usam o carrossel automático; com uma
 * imagem, renderização estática.
 */
export function Cases() {
  const [featured, ...others] = cases;

  return (
    <SectionWrapper id="cases" className="section-light">
      <Container>
        <div className="max-w-2xl">
          <p className="text-caption uppercase tracking-widest">Projetos reais</p>
          <EnergizedText
            as="h2"
            className="mt-4"
            text="Cada projeto nasce de um problema real e entrega uma solução que funciona"
          />
        </div>

        {/* Case em destaque */}
        <article className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <figure className="overflow-hidden rounded-xl border border-paper-line bg-white p-2 shadow-[0_20px_50px_-20px_rgba(13,13,13,0.25)] sm:p-3 lg:col-span-7">
            <ImageCarousel
              images={featured.images}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="overflow-hidden rounded-lg"
            />
          </figure>

          <div className="lg:col-span-5">
            <p className="text-caption uppercase tracking-widest">{featured.type}</p>
            <h3 className="mt-3 text-2xl">{featured.name}</h3>
            <p className="mt-1 text-sm">{featured.organization}</p>
            <p className="mt-5">{featured.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-paper-line bg-white px-3 py-1 text-xs text-[#52525b]"
                >
                  {feature}
                </li>
              ))}
            </ul>

            {featured.externalUrl && (
              <div className="mt-8">
                <Button
                  href={featured.externalUrl}
                  external
                  variant="outline"
                  className="text-ink-900 hover:bg-brand-500/10"
                >
                  Ver projeto ao vivo →
                </Button>
              </div>
            )}
          </div>
        </article>

        {/* Demais cases — carrossel fica clicável acima do link esticado */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {others.map((item) => (
            <article
              key={item.slug}
              className="group relative overflow-hidden rounded-xl border border-paper-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-[0_16px_40px_-18px_rgba(13,13,13,0.3)]"
            >
              <div className="border-b border-paper-line bg-[#f0f0f0]">
                <ImageCarousel
                  images={item.images}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  aspectClassName="aspect-[16/10]"
                  className={item.images.length > 1 ? "pb-2" : undefined}
                />
              </div>
              <div className="p-6">
                <p className="text-caption uppercase tracking-widest">{item.type}</p>
                <h3 className="mt-2 transition-base group-hover:text-brand-700">
                  <Link href="/projetos" className="after:absolute after:inset-0">
                    {item.name}
                  </Link>
                </h3>
                <p className="mt-3 text-sm">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
