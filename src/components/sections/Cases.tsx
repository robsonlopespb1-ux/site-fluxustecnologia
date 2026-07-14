import Image from "next/image";
import Link from "next/link";
import { cases } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * Prova por demonstração (§11): um case em destaque com screenshot grande e
 * verificável, seguido dos demais em grid discreto. Sem números ou
 * depoimentos inventados.
 */
export function Cases() {
  const [featured, ...others] = cases;
  const featuredImage = featured.images[0];

  return (
    <SectionWrapper id="cases">
      <Container>
        <div className="max-w-2xl">
          <p className="text-caption uppercase tracking-widest text-brand-500">
            Projetos reais
          </p>
          <h2 className="mt-4">
            Cada projeto nasce de um problema real e entrega uma solução que
            funciona
          </h2>
        </div>

        {/* Case em destaque */}
        <article className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <figure className="overflow-hidden rounded-xl border border-line bg-ink-800 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] sm:p-3 lg:col-span-7">
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              width={featuredImage.width}
              height={featuredImage.height}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="w-full rounded-lg"
            />
          </figure>

          <div className="lg:col-span-5">
            <p className="text-caption uppercase tracking-widest">{featured.type}</p>
            <h3 className="mt-3 text-2xl">{featured.name}</h3>
            <p className="mt-1 text-sm text-text-tertiary">{featured.organization}</p>
            <p className="mt-5">{featured.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-line px-3 py-1 text-xs text-text-secondary"
                >
                  {feature}
                </li>
              ))}
            </ul>

            {featured.externalUrl && (
              <div className="mt-8">
                <Button href={featured.externalUrl} external variant="outline">
                  Ver projeto ao vivo →
                </Button>
              </div>
            )}
          </div>
        </article>

        {/* Demais cases */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {others.map((item) => {
            const image = item.images[0];
            return (
              <Link
                key={item.slug}
                href="/cases"
                className="group block overflow-hidden rounded-xl border border-line transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.55)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-ink-800">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <p className="text-caption uppercase tracking-widest">{item.type}</p>
                  <h3 className="mt-2 transition-base group-hover:text-brand-500">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
