import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function NotFound() {
  return (
    <SectionWrapper className="flex flex-1 items-center">
      <Container className="flex flex-col items-start gap-6">
        <p className="text-caption uppercase tracking-wider">Erro 404</p>
        <h1>Página não encontrada</h1>
        <p className="max-w-md">
          O endereço que você acessou não existe ou foi movido.
        </p>
        <Button href="/">Voltar para a home</Button>
      </Container>
    </SectionWrapper>
  );
}
