import { CallToAction } from "@/components/sections/CallToAction";
import { Diagnostic } from "@/components/sections/Diagnostic";
import { Differentials } from "@/components/sections/Differentials";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Services } from "@/components/sections/Services";

/*
 * Ritmo de fundos (§9.2): escuro (hero) → claro (serviços) → escuro
 * (diferenciais) → branco (marquee) → escuro (diagnóstico) → amarelo (CTA).
 * Product e Cases saíram da Home (seguem em /produtos e /projetos).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Differentials />
      <LogoMarquee />
      <Diagnostic />
      <CallToAction />
    </>
  );
}
