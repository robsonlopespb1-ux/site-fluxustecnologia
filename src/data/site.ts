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

/* ————— Home: Hero ————— */

export const hero = {
  titleStatic: "Desenvolvemos",
  /** Parte rotativa do h1 — a primeira frase é a exibida com reduced motion */
  rotatingPhrases: [
    "sites que convertem",
    "sistemas que resolvem",
    "IA que automatiza",
    "soluções sob medida",
  ],
  subtitle:
    "Sites institucionais, sistemas web e soluções com inteligência artificial para empresas e instituições que precisam de tecnologia sob medida — de problemas reais a resultados concretos.",
  primaryCta: { label: "Conheça nossos cases", href: "/cases" },
  secondaryCta: { label: "Fale conosco", href: "/contato" },
} as const;

/* ————— Home: Serviços (§10.2) ————— */

export interface HomeService {
  number: string;
  title: string;
  description: string;
  caseRef?: { label: string; href: string };
}

export const homeServices: HomeService[] = [
  {
    number: "01",
    title: "Sites institucionais",
    description:
      "Sites profissionais, responsivos e acessíveis, construídos para representar a instituição com credibilidade — de portais completos a presenças digitais enxutas.",
    caseRef: {
      label: "Case real: Portal do Conselho da Comunidade JP",
      href: "/cases",
    },
  },
  {
    number: "02",
    title: "Sistemas e aplicações web",
    description:
      "Sistemas personalizados que partem do problema concreto da operação — cadastros, fluxos, relatórios e integrações desenhados para o seu processo, não o contrário.",
  },
  {
    number: "03",
    title: "IA e automações",
    description:
      "Assistentes virtuais, automação de atendimento e apoio operacional com IA aplicada com escopo definido e responsabilidade.",
    caseRef: { label: "Case real: BIA, assistente virtual", href: "/cases" },
  },
  {
    number: "04",
    title: "Consultoria em tecnologia",
    description:
      "Orientação para digitalização, estruturação de processos e escolha tecnológica — para decidir com clareza antes de investir.",
  },
];

/* ————— Cases (§10.4/§11) — apenas dados reais, nada inventado ————— */

export interface CaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseItem {
  slug: string;
  name: string;
  organization: string;
  type: string;
  description: string;
  features: string[];
  /** TODO: preencher com a stack real de cada projeto (conteúdo pendente).
   *  Enquanto vazio, a linha de tecnologias não é renderizada. */
  technologies: string[];
  images: CaseImage[];
  externalUrl: string | null;
  /** Nunca inventar — permanecem null até existirem dados reais autorizados (§11). */
  testimonial: null;
  metrics: null;
}

export const cases: CaseItem[] = [
  {
    slug: "portal-conselho-comunidade",
    name: "Portal do Conselho da Comunidade",
    organization: "Conselho da Comunidade da Comarca de João Pessoa/PB",
    type: "Portal institucional",
    description:
      "Portal institucional completo com portal de notícias, assistente virtual com IA, área de transparência e sistema de doações.",
    features: [
      "Portal de notícias",
      "Assistente virtual (BIA)",
      "Transparência com notas fiscais",
      "Doações via PIX",
      "≈16 páginas",
      "Responsivo",
    ],
    technologies: [],
    images: [
      {
        src: "/images/cases/portal-conselho-home.png",
        alt: "Página inicial do Portal do Conselho da Comunidade da Comarca de João Pessoa",
        width: 1365,
        height: 593,
      },
    ],
    externalUrl: "https://www.conselhodacomunidadejp.com.br",
    testimonial: null,
    metrics: null,
  },
  {
    slug: "bia-assistente-virtual",
    name: "BIA",
    organization: "Conselho da Comunidade da Comarca de João Pessoa/PB",
    type: "Inteligência Artificial",
    description:
      "Assistente virtual com IA integrada ao portal institucional para atendimento, informações e orientação aos cidadãos.",
    features: [
      "Atendimento automatizado",
      "Consulta de informações",
      "Integração com o portal",
      "Interface conversacional",
    ],
    technologies: [],
    images: [
      {
        src: "/images/cases/bia-chat.png",
        alt: "Janela de conversa da BIA, assistente virtual do Conselho da Comunidade",
        width: 376,
        height: 439,
      },
    ],
    externalUrl: "https://www.conselhodacomunidadejp.com.br",
    testimonial: null,
    metrics: null,
  },
  {
    slug: "fluxus-gestao-igrejas",
    name: "Fluxus Gestão para Igrejas",
    organization: "Fluxus Tecnologia (produto próprio)",
    type: "Plataforma SaaS",
    description:
      "Plataforma SaaS modular para gestão completa de igrejas — membros, financeiro, ação social, voluntários e multi-templo.",
    features: [
      "Gestão de membros",
      "Financeiro completo",
      "Ação social com distribuições",
      "Banco de voluntários",
      "Eventos e relatórios",
      "Multi-templo",
    ],
    technologies: [],
    images: [
      {
        src: "/images/cases/fluxus-igrejas-acao-social.png",
        alt: "Módulo de Ação Social do Fluxus Gestão para Igrejas, com dashboard de distribuições e estoque",
        width: 1365,
        height: 605,
      },
      {
        src: "/images/cases/fluxus-igrejas-financeiro.png",
        alt: "Módulo Financeiro do Fluxus Gestão para Igrejas, com visão geral de saldos, receitas e despesas",
        width: 1363,
        height: 602,
      },
      {
        src: "/images/cases/fluxus-igrejas-site.png",
        alt: "Página inicial do Fluxus Gestão para Igrejas, com o título “Menos burocracia. Mais Ministérios.”",
        width: 1363,
        height: 617,
      },
    ],
    externalUrl: null,
    testimonial: null,
    metrics: null,
  },
];

/* ————— Diferenciais (§10.5) — específicos e demonstráveis ————— */

export interface Differential {
  number: string;
  title: string;
  description: string;
}

export const differentials: Differential[] = [
  {
    number: "01",
    title: "Soluções a partir de problemas reais",
    description:
      "Não criamos tecnologia por criar. Cada projeto começa entendendo o problema real da organização e desenvolvendo a solução que resolve de verdade.",
  },
  {
    number: "02",
    title: "Tecnologia + compreensão institucional",
    description:
      "Entendemos como organizações funcionam por dentro — processos, hierarquias, necessidades. A tecnologia que entregamos se encaixa na realidade de quem vai usar.",
  },
  {
    number: "03",
    title: "Arquitetura preparada para crescer",
    description:
      "Nenhum projeto nosso nasce engessado. Construímos com arquitetura que permite evoluir, escalar e integrar com novos serviços quando a organização precisar.",
  },
  {
    number: "04",
    title: "Acompanhamento de verdade",
    description:
      "Não entregamos o projeto e desaparecemos. Mantemos proximidade, iteramos juntos e garantimos que a solução funcione no dia a dia real.",
  },
];

/* ————— Home: Produto próprio (§10.3) ————— */

export const product = {
  badge: "Produto próprio",
  name: "Fluxus Gestão para Igrejas",
  description:
    "Plataforma SaaS modular para a gestão completa da igreja — do cadastro de membros ao financeiro, com suporte a múltiplos templos.",
  modules: [
    "Gestão de membros",
    "Financeiro",
    "Ação social",
    "Voluntários",
    "Multi-templo",
  ],
  cta: { label: "Conhecer o produto", href: "/produtos" },
  screenshots: [
    {
      src: "/images/cases/fluxus-igrejas-site.png",
      alt: "Página inicial do Fluxus Gestão para Igrejas, com o título “Menos burocracia. Mais Ministérios.”",
      width: 1363,
      height: 617,
    },
    {
      src: "/images/cases/fluxus-igrejas-financeiro.png",
      alt: "Módulo Financeiro do Fluxus Gestão para Igrejas, com visão geral de saldos, receitas e despesas",
      width: 1363,
      height: 602,
    },
    {
      src: "/images/cases/fluxus-igrejas-acao-social.png",
      alt: "Módulo de Ação Social do Fluxus Gestão para Igrejas, com dashboard de distribuições e estoque",
      width: 1365,
      height: 605,
    },
  ],
} as const;
