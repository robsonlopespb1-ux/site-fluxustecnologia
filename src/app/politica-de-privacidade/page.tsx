import type { Metadata } from "next";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade da Fluxus Tecnologia — como tratamos seus dados pessoais.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Transparência"
        title="Política de Privacidade"
        subtitle={<p>Como tratamos os seus dados pessoais, em linguagem simples.</p>}
      />

      <SectionWrapper className="section-light">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-2xl">Quem somos</h2>
              <p className="mt-3">
                A Fluxus Tecnologia é uma empresa de tecnologia sediada em João
                Pessoa/PB, responsável pelo site fluxustecnologia.com.br.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Quais dados coletamos</h2>
              <p className="mt-3">
                Coletamos apenas os dados que você informa voluntariamente no
                formulário de contato: nome, e-mail, telefone/WhatsApp
                (opcional) e a sua mensagem.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Para que usamos</h2>
              <p className="mt-3">
                Usamos esses dados com uma única finalidade: responder à sua
                solicitação de contato. Nada além disso — sem listas de
                marketing, sem venda de dados, sem uso secundário.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Onde os dados ficam</h2>
              <p className="mt-3">
                As informações do formulário são enviadas diretamente para o
                nosso e-mail institucional e não são armazenadas em banco de
                dados pelo site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Com quem compartilhamos</h2>
              <p className="mt-3">
                Não compartilhamos seus dados com terceiros. A única exceção
                técnica é o serviço de envio de e-mail (Resend), que processa a
                mensagem para que ela chegue à nossa caixa de entrada.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Seus direitos</h2>
              <p className="mt-3">
                Você pode solicitar a exclusão ou a correção dos seus dados a
                qualquer momento escrevendo para {site.email}. Respondemos a
                todas as solicitações.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Cookies e rastreamento</h2>
              <p className="mt-3">
                Este site não utiliza cookies de rastreamento e não possui
                ferramentas de analytics instaladas nesta versão.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Atualizações desta política</h2>
              <p className="mt-3">
                Esta política pode ser atualizada quando necessário, e a data da
                última revisão será sempre informada nesta página.
              </p>
              <p className="mt-3 text-sm">Última revisão: julho de 2026.</p>
            </div>

            <div className="border-t border-paper-line pt-8">
              <p>Dúvidas sobre esta política?</p>
              <div className="mt-5">
                <Button href="/contato">Fale conosco</Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
