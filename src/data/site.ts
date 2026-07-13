/**
 * Fonte única de dados do site (docs/ARQUITETURA.md §6/§7).
 * Nenhum texto de negócio hardcoded em componente.
 */

export const site = {
  name: "Fluxus Tecnologia",
  description:
    "Empresa de tecnologia: sites institucionais, sistemas web, soluções com IA, automações e consultoria.",
  email: "contato@fluxustecnologia.com.br",
  // TODO: substituir pelo número real de WhatsApp comercial antes do lançamento
  whatsappUrl: "https://wa.me/5583999999999",
  instagram: {
    handle: "@fluxustecnologia",
    url: "https://www.instagram.com/fluxustecnologia",
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const navigation: NavLink[] = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Produtos", href: "/produtos" },
  { label: "Cases", href: "/cases" },
  { label: "Contato", href: "/contato" },
];
