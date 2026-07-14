import { CallToAction } from "@/components/sections/CallToAction";
import { Cases } from "@/components/sections/Cases";
import { Diagnostic } from "@/components/sections/Diagnostic";
import { Differentials } from "@/components/sections/Differentials";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Product } from "@/components/sections/Product";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Product />
      <Cases />
      <Differentials />
      <LogoMarquee />
      <Diagnostic />
      <CallToAction />
    </>
  );
}
