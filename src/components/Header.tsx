"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Trava o scroll da página e fecha com Esc enquanto o menu mobile está aberto
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-950/80 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-6 lg:h-16">
        <Link
          href="/"
          aria-label="Fluxus Tecnologia — página inicial"
          className="rounded-lg"
        >
          <Logo variant="header" />
        </Link>

        {/* Navegação desktop */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-base",
                    isActive(pathname, link.href)
                      ? "text-brand-500"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contato" className="hidden lg:inline-flex">
            Fale conosco
          </Button>

          {/* Gatilho do menu mobile */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label="Abrir menu"
            className="-mr-2.5 rounded-lg p-2.5 text-text-primary transition-base hover:text-brand-500 lg:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </Container>

      {/* Menu mobile — overlay fullscreen */}
      <div
        id="menu-mobile"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-ink-950 transition-base lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <Container className="flex h-14 items-center justify-between lg:h-16">
          <Link
            href="/"
            aria-label="Fluxus Tecnologia — página inicial"
            onClick={() => setOpen(false)}
          >
            <Logo variant="header" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            className="-mr-2.5 rounded-lg p-2.5 text-text-primary transition-base hover:text-brand-500"
          >
            <CloseIcon className="size-6" />
          </button>
        </Container>

        <nav aria-label="Menu mobile" className="flex flex-1 flex-col justify-center">
          <Container>
            <ul
              className={cn(
                "flex flex-col gap-6 transition-base",
                open ? "translate-y-0" : "translate-y-2",
              )}
            >
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={cn(
                      "text-2xl font-semibold transition-base",
                      isActive(pathname, link.href)
                        ? "text-brand-500"
                        : "text-text-primary hover:text-brand-500",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>

        <Container className="pb-10">
          <Button href="/contato" size="lg" className="w-full" onClick={() => setOpen(false)}>
            Fale conosco
          </Button>
        </Container>
      </div>
    </header>
  );
}
