import Image from "next/image";
import { clientProjects } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Marquee infinito de logos de projetos/clientes — 100% CSS (Server
 * Component: sem estado; loop, pausa no hover e reduced-motion vivem no
 * globals.css). A faixa renderiza o array 2x e anima translateX(-50%),
 * então a emenda do loop é invisível.
 * Os logos têm fundo branco original — os chips brancos arredondados os
 * acomodam no fundo escuro sem processar as artes de terceiros.
 */
export function LogoMarquee() {
  return (
    <section
      aria-label="Projetos desenvolvidos pela Fluxus"
      className="marquee border-y border-paper-line bg-white py-10 lg:py-14"
    >
      <p className="text-center text-xs uppercase tracking-widest text-[#6b6b6b]">
        Projetos que desenvolvemos
      </p>

      {/* 4 cópias: com poucos logos, 2 cópias não cobrem viewports largas.
          O keyframe move -25% (uma cópia) — loop sem vazio em qualquer tela. */}
      <div className="marquee-track mt-8 [--marquee-duration:20s] lg:[--marquee-duration:28s]">
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0}
            className="flex shrink-0 items-center"
          >
            {clientProjects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={copy > 0 ? -1 : undefined}
                aria-label={`Visitar site: ${project.name}`}
                /* Espaçamento por item (px): idêntico em toda a faixa,
                   inclusive na emenda entre as cópias — sem gap/padding
                   no container que possa abrir buraco no loop. */
                className="group/logo block shrink-0 px-8 lg:px-10"
              >
                <span
                  className={cn(
                    "relative block h-16 w-40",
                    "opacity-50 blur-[0.5px] grayscale transition-all duration-300 lg:opacity-40",
                    "group-hover/logo:scale-110 group-hover/logo:opacity-100 group-hover/logo:blur-none group-hover/logo:grayscale-0",
                    "group-focus-visible/logo:opacity-100 group-focus-visible/logo:grayscale-0",
                  )}
                >
                  <Image
                    src={project.logo}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </span>
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
