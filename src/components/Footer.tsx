import Image from "next/image";
import Link from "next/link";
import { navigation, site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Marca */}
          <div className="flex flex-col gap-4">
            <Logo variant="footer" />
            <p className="max-w-xs text-sm">{site.description}</p>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <h2 className="mb-4 text-caption uppercase tracking-wider">Navegação</h2>
            <ul className="flex flex-col gap-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-base hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <address className="not-italic">
            <h2 className="mb-4 text-caption uppercase tracking-wider">Contato</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-text-secondary transition-base hover:text-text-primary"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary transition-base hover:text-text-primary"
                >
                  <WhatsAppIcon className="size-4.5" />
                  WhatsApp
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary transition-base hover:text-text-primary"
                >
                  <InstagramIcon className="size-4.5" />
                  {site.instagram.handle}
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-caption">
              © {new Date().getFullYear()} {site.name}. Todos os direitos
              reservados.
            </p>
            <Link
              href="/politica-de-privacidade"
              className="text-caption transition-base hover:text-text-secondary"
            >
              Política de Privacidade
            </Link>
          </div>
          <p className="mt-2 text-xs text-white/40">
            {site.razaoSocial} · CNPJ {site.cnpj} · {site.cidade}
          </p>

          {/* Pagamento */}
          <div className="mt-6 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
            {/* Variante "pluma" (100% branca) — desenhada para fundo escuro;
                nunca colocar em container branco (fica invisível) */}
            <Image
              src="/MP_RGB_HANDSHAKE_pluma_horizontal.png"
              alt="Mercado Pago"
              width={150}
              height={61}
              className="h-auto w-[140px] shrink-0"
            />
            <div>
              <p className="text-xs font-medium text-text-secondary">
                Pagamento seguro via Mercado Pago
              </p>
              <p className="mt-0.5 text-xs text-white/40">
                PIX, boleto ou cartão de crédito.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
