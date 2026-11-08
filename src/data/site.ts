/**
 * Fonte única de dados do site (docs/ARQUITETURA.md §6/§7).
 * Nenhum texto de negócio hardcoded em componente.
 */

export const site = {
  name: "Fluxus Tecnologia",
  razaoSocial: "FLUXUS TECNOLOGIA LTDA",
  cnpj: "68.129.138/0001-29",
  cidade: "João Pessoa/PB",
  description:
    "Empresa de tecnologia: sites institucionais, sistemas web, soluções com IA, automações e consultoria.",
  email: "contato@fluxustecnologia.com.br",
  whatsappUrl:
    "https://api.whatsapp.com/send?phone=5583993780710&text=Ol%C3%A1!%20Vi%20o%20site%20da%20Fluxus%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.",
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
  { label: "A Fluxus", href: "/a-fluxus" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Produtos", href: "/produtos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

/* ————— Home: Hero ————— */

export const hero = {
  /** Palavra rotativa do h1 (slide vertical) — "Soluções" é a exibida com
   *  reduced motion por ser a mais abrangente. */
  rotatingWords: ["Sites", "Sistemas", "Automações", "Soluções"],
  reducedMotionWord: "Soluções",
  titleSuffix: "que funcionam.",
  subtitle:
    "Transformamos ideias e desafios em sites, sistemas e soluções digitais pensadas para gerar resultados de verdade.",
  primaryCta: { label: "Conheça nossos projetos", href: "/projetos" },
  secondaryCta: { label: "Fale conosco", href: "/contato" },
} as const;

/* ————— Home: cabeçalho da seção de soluções ————— */

export const servicesSection = {
  eyebrow: "O que fazemos",
  title: "Tecnologia sob medida, do site institucional à automação com IA",
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
      "Sites que passam confiança, valorizam sua marca e ajudam empresas e instituições a se apresentarem de forma profissional no digital.",
    caseRef: {
      label: "Projeto real: Portal do Conselho da Comunidade JP",
      href: "/projetos",
    },
  },
  {
    number: "02",
    title: "Sistemas e aplicações web",
    description:
      "Sistemas criados para resolver os desafios reais do seu dia a dia — organizando informações, facilitando tarefas e tornando o trabalho mais simples e eficiente.",
  },
  {
    number: "03",
    title: "IA e automações",
    description:
      "Assistentes virtuais com inteligência artificial para tirar dúvidas, agilizar atendimentos e facilitar o dia a dia de empresas e instituições.",
    caseRef: { label: "Projeto real: BIA, assistente virtual", href: "/projetos" },
  },
  {
    number: "04",
    title: "Consultoria em tecnologia",
    description:
      "Ajudamos sua empresa a organizar ideias, melhorar processos e escolher as melhores soluções antes de investir em tecnologia.",
  },
];

/* ————— Cases (§10.4/§11) — apenas dados reais, nada inventado ————— */

export interface CaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Screenshots reais do Fluxus Gestão para Igrejas (compartilhados entre o
 *  case, a seção da Home e a página de produtos). */
export const productScreenshots: CaseImage[] = [
  {
    src: "/images/cases/fluxus-igrejas-01.png",
    alt: "Módulos do Fluxus Gestão para Igrejas: Ação Social, Financeiro e Louvor",
    width: 1020,
    height: 279,
  },
  {
    src: "/images/cases/fluxus-igrejas-02.png",
    alt: "Módulos do Fluxus Gestão para Igrejas: Pessoas, Estudo Bíblico e Ministério Infantil",
    width: 1012,
    height: 250,
  },
  {
    src: "/images/cases/fluxus-igrejas-03.png",
    alt: "Módulo de Eventos do Fluxus Gestão para Igrejas: cultos, congressos e retiros",
    width: 356,
    height: 246,
  },
  {
    src: "/images/cases/fluxus-igrejas-04.png",
    alt: "Dashboard da Ação Social com beneficiários ativos, atendimentos, projetos, voluntários e estoque",
    width: 1344,
    height: 514,
  },
  {
    src: "/images/cases/fluxus-igrejas-05.png",
    alt: "Visão geral do Financeiro: saldo consolidado, resultado do mês, receitas, despesas e contas a vencer",
    width: 1347,
    height: 548,
  },
  {
    src: "/images/cases/fluxus-igrejas-06.png",
    alt: "Painel do Louvor: bandas, músicos, escalas da semana, confirmações pendentes e repertório",
    width: 1342,
    height: 500,
  },
  {
    src: "/images/cases/fluxus-igrejas-07.png",
    alt: "Painel de Pessoas: membros ativos, visitantes, novos convertidos, check-ins e cultos realizados",
    width: 1345,
    height: 503,
  },
  {
    src: "/images/cases/fluxus-igrejas-08.png",
    alt: "Painel do Estudo Bíblico: cursos, turmas, alunos, inscrições, presenças e materiais",
    width: 1345,
    height: 500,
  },
  {
    src: "/images/cases/fluxus-igrejas-09.png",
    alt: "Painel do Ministério Infantil: crianças cadastradas, presenças com check-in, salas e voluntários escalados",
    width: 1358,
    height: 424,
  },
  {
    src: "/images/cases/fluxus-igrejas-10.png",
    alt: "Módulo de Eventos com busca, filtros, calendário, escalas e criação de novo evento",
    width: 1365,
    height: 514,
  },
];

export interface CaseItem {
  slug: string;
  name: string;
  organization: string;
  type: string;
  description: string;
  /** Narrativa longa da página de detalhe (parágrafos separados por \n). */
  expandedDescription?: string;
  /** Vídeo decorativo de fundo do hero da página de detalhe. */
  heroVideo?: string;
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
      "Site institucional de alta performance com foco em engajamento e transparência. Conta com hub de notícias, sistema integrado de doações, prestação de contas em tempo real e atendimento automatizado via Inteligência Artificial.",
    expandedDescription:
      "O Conselho da Comunidade precisava de um canal seguro para prestar contas, facilitar doações e acolher a sociedade.\nA partir dessa urgência, a Fluxus desenvolveu uma solução completa em apenas uma semana.",
    heroVideo: "/videos/conselho-hero.mp4",
    features: [
      "Hub de Conteúdo Dinâmico",
      "Atendimento IA 24/7",
      "Transparência Ativa",
      "Integração PIX Segura",
      "Arquitetura Escalável",
      "Design Mobile-First",
      "Painel Admin Exclusivo",
      "Segurança e Adequação LGPD",
    ],
    technologies: [],
    images: [
      {
        src: "/images/cases/conselho-header.png",
        alt: "Header do Portal do Conselho da Comunidade",
        width: 1347,
        height: 589,
      },
      {
        src: "/images/cases/conselho-detalhe-01.png",
        alt: "Página inicial do Portal do Conselho da Comunidade",
        width: 1345,
        height: 389,
      },
      {
        src: "/images/cases/conselho-detalhe-02.png",
        alt: "Seção interna do Portal do Conselho",
        width: 1351,
        height: 485,
      },
      {
        src: "/images/cases/conselho-detalhe-03.png",
        alt: "Área de transparência do Portal",
        width: 1350,
        height: 484,
      },
      {
        src: "/images/cases/conselho-detalhe-04.png",
        alt: "Sistema de doações do Portal",
        width: 1272,
        height: 481,
      },
      {
        src: "/images/cases/conselho-detalhe-05.png",
        alt: "Hub de notícias do Portal",
        width: 1347,
        height: 603,
      },
      {
        src: "/images/cases/conselho-detalhe-06.png",
        alt: "Assistente virtual BIA do Portal",
        width: 1242,
        height: 307,
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
      "Plataforma SaaS modular para gestão de igrejas evangélicas — 7 módulos disponíveis (+1 em breve), multi-templo, controle de acesso por perfil e dashboards automáticos. Sem instalação: acesso pelo navegador.",
    features: [
      "Ação Social",
      "Financeiro",
      "Louvor",
      "Pessoas",
      "Estudo Bíblico",
      "Ministério Infantil",
      "Eventos",
      "Relatórios & BI (em breve)",
      "Multi-templo",
      "Acesso por perfil",
    ],
    technologies: [],
    images: productScreenshots,
    externalUrl: null,
    testimonial: null,
    metrics: null,
  },
  {
    slug: "site-mpviagens",
    name: "MP Viagens",
    organization: "MP Viagens — Agência de Turismo, João Pessoa/PB",
    type: "Site institucional",
    description:
      "Plataforma de turismo com catálogo de viagens em grupo, filtros por categoria, páginas individuais por destino com preços e datas, e atendimento direto pelo WhatsApp.",
    expandedDescription:
      "A MP Viagens precisava de uma presença digital que transmitisse confiança e facilitasse o acesso às viagens disponíveis.\nA Fluxus criou uma plataforma completa com catálogo de destinos, filtros por categoria, páginas individuais por viagem com preços e datas, vídeo institucional e atendimento direto pelo WhatsApp.",
    features: [
      "Catálogo de viagens",
      "Filtro por categoria",
      "Página por destino",
      "Consulta via WhatsApp",
      "Vídeo institucional",
      "Design responsivo",
      "Integração Instagram",
    ],
    technologies: [],
    images: [
      {
        src: "/images/cases/mp-viagens-header.png",
        alt: "Topo do site da MP Viagens, com busca de destinos e o título “Sua próxima viagem começa em João Pessoa”",
        width: 1106,
        height: 594,
      },
    ],
    externalUrl: "http://mpviagensjp.com.br",
    testimonial: null,
    metrics: null,
  },
];

/* ————— Diagnóstico interativo (Home): "Não sabe por onde começar?" ————— */

export interface DiagnosticOption {
  id: string;
  label: string;
  icon: "globe" | "cog" | "layers" | "message" | "lightbulb" | "compass";
  response: string;
  cta: string;
}

export const diagnosticOptions: DiagnosticOption[] = [
  {
    id: "site",
    label: "Preciso de um site profissional",
    icon: "globe",
    response:
      "Um site bem construído é o cartão de visitas da sua organização. Criamos sites que passam confiança, funcionam em qualquer dispositivo e são encontrados no Google.",
    cta: "Fale sobre seu site",
  },
  {
    id: "sistema",
    label: "Tenho processos manuais demais",
    icon: "cog",
    response:
      "Se sua equipe ainda depende de planilhas, cadernos ou grupos de WhatsApp para organizar o trabalho, um sistema sob medida pode transformar a operação.",
    cta: "Fale sobre seus processos",
  },
  {
    id: "desorganizacao",
    label: "Informações desorganizadas",
    icon: "layers",
    response:
      "Dados espalhados em vários lugares geram retrabalho e decisões erradas. Podemos estruturar suas informações em um sistema que centraliza e organiza tudo.",
    cta: "Fale sobre sua organização",
  },
  {
    id: "atendimento",
    label: "Atendimento sobrecarregado",
    icon: "message",
    response:
      "Um assistente virtual com IA pode responder dúvidas frequentes, orientar cidadãos e desafogar sua equipe — 24 horas por dia, sem fila.",
    cta: "Fale sobre seu atendimento",
  },
  {
    id: "ideia",
    label: "Tenho uma ideia de sistema",
    icon: "lightbulb",
    response:
      "Ideias precisam de estrutura para virar produto. Ajudamos a validar, planejar a arquitetura e construir do zero — com tecnologia que escala.",
    cta: "Fale sobre sua ideia",
  },
  {
    id: "perdido",
    label: "Não sei por onde começar",
    icon: "compass",
    response:
      "Tudo bem. A maioria dos nossos projetos começa assim. Uma conversa de 15 minutos já é suficiente para entendermos sua necessidade e sugerir um caminho.",
    cta: "Vamos conversar",
  },
];

/* ————— Marquee de projetos/clientes (Home) ————— */

export interface ClientProject {
  name: string;
  url: string;
  logo: string;
}

export const clientProjects: ClientProject[] = [
  {
    name: "Escritório Social",
    url: "https://www.portalescritoriosocial.com.br",
    logo: "/images/logos-clientes/escritorio-social.png",
  },
  {
    name: "Atendimento à Pessoa Custodiada",
    url: "https://www.apecpb.com.br",
    logo: "/images/logos-clientes/audiencias-de-custodia.png",
  },
  {
    name: "Conselho da Comunidade",
    url: "https://www.conselhodacomunidadejp.com.br",
    logo: "/images/logos-clientes/conselho-da-comunidade.png",
  },
  {
    name: "Fluxus Igrejas",
    url: "https://igrejas.fluxustecnologia.com.br",
    logo: "/images/logos-clientes/fluxus-igrejas.png",
  },
  {
    name: "MP Viagens",
    url: "http://mpviagensjp.com.br",
    logo: "/images/logos-clientes/mp-viagens.png",
  },
  {
    name: "Construtor Digital",
    url: "http://construtordigital.com.br",
    logo: "/images/logos-clientes/construtor-digital.png",
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

export interface ProductModule {
  name: string;
  description: string;
  available: boolean;
}

export const productModules: ProductModule[] = [
  {
    name: "Ação Social",
    description:
      "Beneficiários, atendimentos, estoque e entregas — com assinatura no ato e comprovante em PDF.",
    available: true,
  },
  {
    name: "Financeiro",
    description:
      "Entradas, saídas, dízimos, campanhas e patrimônio — com prestação de contas pronta.",
    available: true,
  },
  {
    name: "Louvor",
    description:
      "Escalas que o músico confirma pelo celular, repertório com cifra e ensaios organizados.",
    available: true,
  },
  {
    name: "Pessoas",
    description:
      "Visitantes, membros e presença — do primeiro domingo ao acompanhamento pastoral.",
    available: true,
  },
  {
    name: "Estudo Bíblico",
    description:
      "Cursos e turmas com matrícula online, presença por QR Code e controle de vagas.",
    available: true,
  },
  {
    name: "Ministério Infantil",
    description:
      "Check-in e check-out com código de segurança, ficha de saúde e escala de voluntários.",
    available: true,
  },
  {
    name: "Eventos",
    description:
      "Do cadastro à entrada: inscrições por QR Code, ingresso digital, check-in, escalas e relatórios.",
    available: true,
  },
  {
    name: "Relatórios & BI",
    description: "Business intelligence e análise avançada de dados.",
    available: false,
  },
];

export const product = {
  badge: "Produto próprio",
  name: "Fluxus Gestão para Igrejas",
  description:
    "Plataforma modular criada para simplificar a gestão de igrejas evangélicas. Cada módulo resolve um problema real do dia a dia — desde o controle de membros até a gestão financeira, passando por ação social, louvor, eventos e muito mais.",
  /** Fatos do produto real — não inventar além disto */
  facts: [
    "7 módulos disponíveis + 1 em breve",
    "Multi-templo: gestão de múltiplos templos em uma plataforma",
    "Controle de acesso por perfil",
    "Dashboards e indicadores automáticos",
    "Sem instalação — acesso pelo navegador",
  ],
  pricing: "Planos a partir de R$ 49,99/mês",
  modules: productModules,
  /** Site do produto (SaaS) */
  externalUrl: "https://igrejas.fluxustecnologia.com.br",
  urlLabel: "igrejas.fluxustecnologia.com.br",
  benefits: ["Sem instalação", "7 dias grátis", "Usuários ilimitados"],
  cta: { label: "Conhecer o produto" },
  secondaryCta: { label: "Saiba mais", href: "/produtos" },
  screenshots: productScreenshots,
} as const;
