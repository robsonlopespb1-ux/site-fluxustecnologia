import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Fluxus Tecnologia. Formulário, WhatsApp e Instagram.",
  alternates: { canonical: "/contato" },
};

const channels = [
  {
    label: "WhatsApp",
    value: "Conversar agora",
    href: site.whatsappUrl,
    external: true,
    Icon: WhatsAppIcon,
  },
  {
    label: "E-mail",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    Icon: MailIcon,
  },
  {
    label: "Instagram",
    value: site.instagram.handle,
    href: site.instagram.url,
    external: true,
    Icon: InstagramIcon,
  },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar sobre o seu projeto"
        subtitle={<p>Conte o que você precisa. Respondemos em até 24 horas.</p>}
      />

      {/* Formulário + canais */}
      <SectionWrapper className="section-light">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-7">
              <h2 className="text-2xl">Envie sua mensagem</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} className="lg:col-span-4 lg:col-start-9">
              <h2 className="text-2xl">Canais diretos</h2>
              <p className="mt-3 text-sm">
                Prefere conversar diretamente? Estamos no WhatsApp.
              </p>
              <ul className="mt-8 flex flex-col gap-5">
                {channels.map(({ label, value, href, external, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center gap-4"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-paper-line bg-white text-brand-700 transition-base group-hover:border-brand-500/50">
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block text-caption uppercase tracking-wider">
                          {label}
                        </span>
                        <span className="block text-sm font-medium text-ink-900 transition-base group-hover:text-brand-700">
                          {value}
                          {external && (
                            <span className="sr-only"> (abre em nova aba)</span>
                          )}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </Container>
      </SectionWrapper>

      {/* Localização */}
      <SectionWrapper className="border-t border-line bg-ink-950">
        <Container className="text-center">
          <ScrollReveal>
            <p className="mx-auto max-w-xl text-lg">
              Estamos em João Pessoa/PB, mas trabalhamos com organizações de
              todo o Brasil.
            </p>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  );
}
