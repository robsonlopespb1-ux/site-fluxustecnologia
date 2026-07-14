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
            <h4 className="mb-4 text-caption uppercase tracking-wider">Navegação</h4>
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
            <h4 className="mb-4 text-caption uppercase tracking-wider">Contato</h4>
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
          <p className="text-caption">
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
