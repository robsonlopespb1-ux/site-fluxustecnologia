import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function HomePage() {
  return (
    <SectionWrapper className="flex flex-1 items-center bg-ink-950">
      <Container>
        <p className="text-caption uppercase tracking-wider">Em construção</p>
        <h1 className="text-display mt-4 max-w-3xl">Fluxus Tecnologia</h1>
        <p className="mt-6 max-w-xl text-lg">
          Sites institucionais, sistemas web, soluções com IA e consultoria em
          tecnologia.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contato" size="lg">
            Fale conosco
          </Button>
          <Button href="/cases" size="lg" variant="outline">
            Ver cases
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
