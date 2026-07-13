# Arquitetura — Site Institucional Fluxus Tecnologia

> **Documento de arquitetura e decisões técnicas**
> Projeto: `fluxustecnologia.com.br`
> Status: proposta aprovável — nenhuma linha de código foi escrita ainda.
> Última atualização: 2026-07-13

---

## Sumário

1. [Visão geral e objetivos](#1-visão-geral-e-objetivos)
2. [Escopo](#2-escopo)
3. [Stack técnica e versões](#3-stack-técnica-e-versões)
4. [Política de dependências (análise item a item)](#4-política-de-dependências)
5. [Arquitetura de informação e mapa do site](#5-arquitetura-de-informação-e-mapa-do-site)
6. [Estrutura de diretórios](#6-estrutura-de-diretórios)
7. [Camada de conteúdo (dados estáticos)](#7-camada-de-conteúdo-dados-estáticos)
8. [Design system e identidade visual](#8-design-system-e-identidade-visual)
9. [Direção visual: o que buscar e o que evitar](#9-direção-visual-o-que-buscar-e-o-que-evitar)
10. [Estratégia de conteúdo por página](#10-estratégia-de-conteúdo-por-página)
11. [Números de impacto e prova social](#11-números-de-impacto-e-prova-social)
12. [Formulário de contato sem backend próprio](#12-formulário-de-contato-sem-backend-próprio)
13. [SEO técnico](#13-seo-técnico)
14. [Acessibilidade](#14-acessibilidade)
15. [Performance e Core Web Vitals](#15-performance-e-core-web-vitals)
16. [Animações e microinterações](#16-animações-e-microinterações)
17. [Segurança](#17-segurança)
18. [Responsividade](#18-responsividade)
19. [Preparação para crescimento](#19-preparação-para-crescimento)
20. [Deploy e infraestrutura](#20-deploy-e-infraestrutura)
21. [Roadmap de implementação](#21-roadmap-de-implementação)
22. [Critérios de aceitação](#22-critérios-de-aceitação)
23. [Riscos e pontos em aberto](#23-riscos-e-pontos-em-aberto)

---

## 1. Visão geral e objetivos

### 1.1 O que é este projeto

Site institucional da **Fluxus Tecnologia**, empresa de tecnologia que atua em desenvolvimento de sites, sistemas web, plataformas SaaS, soluções com IA, automações e consultoria. O site substitui a landing page atual do SaaS de igrejas em `fluxustecnologia.com.br` (o SaaS migrará para `igrejas.fluxustecnologia.com.br`).

### 1.2 O que o site precisa comunicar

A Fluxus **não é uma agência de sites** — é uma empresa de tecnologia com serviços e produtos próprios. Esta distinção orienta toda a arquitetura de informação: serviços e produtos são cidadãos de primeira classe, separados e visualmente distintos.

Atributos a transmitir: tecnologia, competência, inovação, confiança, sofisticação, modernidade — no nível visual de agências digitais profissionais brasileiras, sem copiar identidade, texto ou layout de nenhuma referência.

### 1.3 Objetivos mensuráveis

| Objetivo | Métrica | Meta |
|---|---|---|
| Gerar contato qualificado | Cliques em WhatsApp / envios de formulário | Canal primário de conversão |
| Credibilidade técnica | Lighthouse (Performance/A11y/SEO/Best Practices) | ≥ 95 em todas as categorias |
| Encontrabilidade | Indexação das páginas de serviço e cases | 100% das rotas públicas indexadas |
| Base para crescimento | Adição de blog/CMS/i18n sem refatoração estrutural | Zero decisões bloqueantes |

### 1.4 Público-alvo

1. **Instituições e organizações** (conselhos, entidades do terceiro setor, igrejas) — perfil do case real existente; valorizam confiança, transparência e acompanhamento próximo.
2. **Pequenas e médias empresas** buscando presença digital ou sistemas sob medida.
3. **Gestores avaliando o SaaS de igrejas** — chegam pelo produto e precisam encontrar rapidamente o caminho para `igrejas.fluxustecnologia.com.br`.

---

## 2. Escopo

### 2.1 Dentro do escopo (v1)

- Home, páginas de serviços, página de produto (Fluxus Gestão para Igrejas), cases, quem somos, contato, política de privacidade.
- Formulário de contato funcional sem backend próprio (ver §12).
- SEO técnico completo, acessibilidade WCAG 2.1 AA, dark mode como identidade única.
- Conteúdo 100% estático (sem banco de dados, sem CMS na v1).

### 2.2 Fora do escopo (v1) — mas não impedido pela arquitetura

- Blog, CMS headless, área de clientes, internacionalização, novas landing pages de produtos, toggle claro/escuro. Ver §19 para como a arquitetura os acomoda no futuro.

---

## 3. Stack técnica e versões

### 3.1 Matriz de versões recomendadas

| Tecnologia | Versão recomendada | Justificativa |
|---|---|---|
| **Node.js** | 22 LTS (mínimo 20.9) | Exigência do Next.js 16; 22 é a LTS ativa com suporte longo. |
| **Next.js** | **16.x** (App Router) | Versão estável mais recente; Turbopack como bundler padrão (builds e dev server significativamente mais rápidos), cache components estáveis, melhor suporte a React 19. Alternativa conservadora: 15.5.x (LTS de fato, amplamente documentada). Recomendo 16.x — projeto novo, sem legado, e roda sem restrições em container no Railway (build padrão + `output: 'standalone'`). |
| **React** | 19.x (a versão que o Next.js 16 fixar como peer) | React 19 é requisito do Next 16. Traz Actions, `useActionState`, melhorias em Server Components — úteis para o formulário de contato. |
| **TypeScript** | 5.7+ | `strict: true` obrigatório. Sem razão para versão menor. |
| **Tailwind CSS** | **4.1+** | v4 é CSS-first: tokens definidos em `@theme` dentro do CSS, sem `tailwind.config.js` para o caso comum. Engine nova (Oxide) muito mais rápida. Integração com Next via `@tailwindcss/postcss`. |

### 3.2 Decisões arquiteturais de framework

**App Router, Server Components por padrão.**
Todo componente é Server Component até que precise de interatividade. Client Components (`"use client"`) ficam restritos a: menu mobile, formulário de contato, componentes de animação on-scroll, carrosséis (se houver). Isso mantém o bundle JS mínimo — crítico para um site institucional onde quase tudo é conteúdo estático.

**Renderização: 100% estática (SSG).**
Sem banco de dados e com conteúdo em arquivos TypeScript, **todas as rotas são geradas em build time**. Nenhuma rota dinâmica em runtime, nenhum `fetch` em request time. Resultado: nenhum render por request — o servidor Next no Railway apenas serve HTML/assets pré-gerados, com TTFB baixo e previsível e imunidade a picos de tráfego.

- Rotas dinâmicas de conteúdo (ex.: `/cases/[slug]`) usam `generateStaticParams` + `export const dynamicParams = false` — qualquer slug inexistente resulta em 404 em build/em runtime, sem renderização sob demanda.
- Exceção única: o Route Handler do formulário de contato (se a opção A do §12 for escolhida) roda no próprio servidor Next dentro do container do Railway.

**Sem gerenciamento de estado global.**
Não há estado compartilhado que justifique Zustand/Redux/Context elaborado. O estado existente (menu aberto, passos do formulário) é local por componente.

**Convenção de importação com alias.**
`@/*` apontando para `src/*` — padrão do `create-next-app`, elimina caminhos relativos profundos.

---

## 4. Política de dependências

Princípio: **cada dependência precisa pagar seu custo** (peso no bundle, superfície de manutenção, risco de abandono). Abaixo, a análise completa do que é proposto — incluindo o que **não** instalar.

### 4.1 Dependências recomendadas

#### `motion` (sucessora do Framer Motion) — **recomendada com restrições**

| Critério | Análise |
|---|---|
| Finalidade | Animações declarativas: reveal on scroll, stagger, microinterações, transições de layout. |
| Benefício | API `whileInView` resolve reveal-on-scroll com poucas linhas; respeita `useReducedMotion`; interpolação por spring dá o acabamento "caro" que CSS puro dificulta. |
| Impacto | ~4–18 kB gzip conforme o entry point usado (`motion/mini` ~4 kB; API completa ~18 kB). Só carrega em Client Components — não afeta as partes estáticas. |
| Por que é necessária | O nível visual pretendido (§9) depende de animações orquestradas (stagger, reveal coordenado). Implementar orquestração robusta à mão vira uma mini-biblioteca interna. |
| Alternativa sem dependência | CSS `@keyframes` + `IntersectionObserver` em um hook próprio (~40 linhas) + a API nativa de View Transitions. Cobre fade-in/slide-up simples. **Estratégia adotada: começar com a alternativa nativa na Fase 1–2 e só adicionar `motion` na Fase 3 (polimento) se a orquestração exigir.** |

#### `clsx` + `tailwind-merge` — **recomendadas**

| Critério | Análise |
|---|---|
| Finalidade | Composição condicional de classes (`clsx`) e resolução de conflitos de utilitários Tailwind (`tailwind-merge`) — combinadas no utilitário `cn()`. |
| Benefício | Componentes de design system com variantes (`Button`, `Badge`, `Section`) ficam legíveis e sem bugs de precedência de classe. |
| Impacto | Desprezível: ~0,5 kB + ~7 kB gzip, tree-shakeable. |
| Por que são necessárias | Sem `tailwind-merge`, `className` passado por prop não sobrescreve a classe base de forma previsível (`p-4` vs `p-2` — vence a ordem do CSS, não a intenção). |
| Alternativa sem dependência | Template literals condicionais. Funciona, mas o bug de precedência permanece e some a ergonomia. Custo/benefício favorece amplamente a inclusão. |

#### `schema-dts` (devDependency) — **recomendada**

| Critério | Análise |
|---|---|
| Finalidade | Tipos TypeScript para JSON-LD (Schema.org). |
| Benefício | Dados estruturados (Organization, Service, Product, BreadcrumbList) validados em compile time — erro de digitação em `@type` vira erro de build, não silêncio no Google. |
| Impacto | **Zero em runtime** (só tipos). |
| Por que é necessária | O site terá 5+ tipos de dados estruturados (§13.4); manter isso sem tipos é frágil. |
| Alternativa sem dependência | Objetos `Record<string, unknown>` escritos à mão. Viável, mas perde a única proteção que existe para JSON-LD (não há validação em runtime). |

### 4.2 Dependências avaliadas e **rejeitadas** (v1)

| Biblioteca | Por que NÃO instalar |
|---|---|
| `react-hook-form` + `zod` | O site tem **um** formulário com 4–5 campos. `useActionState` (React 19) + validação nativa HTML + uma função de validação de ~20 linhas cobrem o caso. RHF+Zod somam ~25 kB para resolver um problema que não existe nesta escala. Reavaliar se surgirem formulários complexos (orçamento multi-etapas). |
| `lucide-react` (ou qualquer icon pack) | O anti-padrão nº 1 de "site feito por IA" é ícone genérico em toda seção (§9). A v1 usa **SVGs próprios inline** (~8–12 ícones no total: WhatsApp, Instagram, e-mail, setas, menu). Ícones desenhados no grid da marca > pack genérico. Se a contagem crescer muito, reavaliar importando ícones individuais. |
| `next-seo` | Redundante: a Metadata API nativa do App Router cobre tudo (title template, OG, Twitter Cards, canonical, robots). |
| `next-sitemap` | Redundante: `app/sitemap.ts` e `app/robots.ts` são nativos. |
| `shadcn/ui` / Radix | O site não tem primitivas complexas (dialogs, dropdowns, comboboxes). Importar uma camada de componentes para usar botão e card é peso e estética emprestada. O design system próprio (§8) é pequeno e sob controle total. |
| `GSAP` | Poderosa, mas licença comercial para alguns plugins, peso maior e sobreposição total com `motion` para o escopo permitido de animações. |
| Qualquer CSS-in-JS (styled-components, emotion) | Incompatível com a filosofia Server Components + Tailwind v4. |
| `axios` | `fetch` nativo. |
| `moment`/`dayjs`/`date-fns` | Site institucional sem manipulação de datas. `Intl.DateTimeFormat` se precisar formatar algo. |

### 4.3 Ferramentas de desenvolvimento (devDependencies)

- **ESLint 9** (flat config) + `eslint-config-next` — obrigatório.
- **Prettier** + `prettier-plugin-tailwindcss` — ordenação automática de classes; elimina bikeshedding.
- **`@tailwindcss/postcss`** — integração Tailwind v4.

Nada de Husky/lint-staged na v1 (time de uma pessoa; o build do Railway a cada deploy já roda lint/build e barra regressões).

---

## 5. Arquitetura de informação e mapa do site

### 5.1 Princípios

1. **Serviços ≠ Produtos.** Navegação, URLs e tratamento visual distintos. Serviços = "o que fazemos para você"; Produtos = "o que construímos e operamos".
2. **Cada serviço tem página própria** — não âncoras na home. Motivo: SEO (uma URL indexável por intenção de busca — "desenvolvimento de sites João Pessoa", "automação com IA para empresas") e espaço para profundidade sem poluir a home.
3. **Cases são o motor de credibilidade** de uma empresa em fase inicial — merecem hub próprio e páginas individuais detalhadas.
4. **Profundidade máxima: 2 cliques** da home até qualquer conteúdo.

### 5.2 Mapa de rotas

```
/                                    Home
/servicos                            Hub de serviços (visão geral + navegação)
/servicos/sites-institucionais       Serviço 1
/servicos/sistemas-web               Serviço 2
/servicos/ia-e-automacoes            Serviço 3
/servicos/consultoria                Serviço 4
/produtos                            Hub de produtos próprios
/produtos/gestao-para-igrejas        Fluxus Gestão para Igrejas (aponta para o
                                     futuro subdomínio igrejas.fluxustecnologia.com.br)
/cases                               Hub de cases
/cases/portal-conselho-comunidade-jp Case 1 — Portal do Conselho
/cases/bia-assistente-ia             Case 2 — BIA
/cases/fluxus-gestao-igrejas         Case 3 — SaaS de igrejas
/quem-somos                          A empresa, abordagem, forma de trabalhar
/contato                             Formulário + WhatsApp + Instagram + e-mail
/politica-de-privacidade             LGPD (obrigatória por haver formulário)
```

Reservadas para o futuro (não criar agora, não conflitar): `/blog`, `/blog/[slug]`, `/lp/[campanha]`.

### 5.3 Navegação

**Header (fixo, com fundo que ganha opacidade no scroll):**
`Serviços` · `Produtos` · `Cases` · `Quem somos` · CTA destacado `Fale conosco` (amarelo — único elemento de cor cheia no header).

Sem dropdowns na v1 — 4 serviços não justificam a complexidade de acessibilidade de um menu suspenso. O hub `/servicos` cumpre o papel.

**Footer (3 colunas + barra legal):**
navegação completa (incluindo links diretos para cada serviço — bom para SEO interno), contato (WhatsApp, e-mail, Instagram), link para o produto/subdomínio, política de privacidade, CNPJ quando aplicável.

**Mobile:** menu full-screen overlay acionado por botão hambúrguer (Client Component), com foco gerenciado (§14).

### 5.4 Fluxos de conversão

Todas as páginas terminam em CTA. Hierarquia de conversão:
1. **WhatsApp** (link direto `wa.me` com mensagem pré-preenchida contextual à página de origem) — menor atrito no Brasil.
2. **Formulário** em `/contato` — para quem prefere registro formal.
3. **Instagram** — descoberta/prova social, não conversão primária.

---

## 6. Estrutura de diretórios

```
site-fluxustecnologia/
├── docs/
│   └── ARQUITETURA.md            ← este documento
├── public/
│   ├── images/
│   │   ├── cases/                ← screenshots reais dos projetos
│   │   ├── brand/                ← logo, variações, favicon fonte
│   │   └── og/                   ← imagens Open Graph (1200×630)
│   ├── favicon.ico
│   └── (favicons gerados: icon.svg, apple-touch-icon.png…)
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← root layout: fontes, metadata base, JSON-LD Organization
│   │   ├── page.tsx              ← Home
│   │   ├── globals.css           ← Tailwind v4 @theme (tokens do design system)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   ├── not-found.tsx         ← 404 com a identidade da marca
│   │   ├── servicos/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx   ← generateStaticParams a partir de src/data
│   │   ├── produtos/
│   │   │   ├── page.tsx
│   │   │   └── gestao-para-igrejas/page.tsx
│   │   ├── cases/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── quem-somos/page.tsx
│   │   ├── contato/page.tsx
│   │   ├── politica-de-privacidade/page.tsx
│   │   └── api/
│   │       └── contato/route.ts  ← única rota dinâmica (envio do formulário)
│   ├── components/
│   │   ├── ui/                   ← primitivas do design system
│   │   │   (button.tsx, badge.tsx, section.tsx, container.tsx,
│   │   │    heading.tsx, prose.tsx…)
│   │   ├── layout/               ← header.tsx, footer.tsx, mobile-menu.tsx
│   │   ├── sections/             ← blocos de página reutilizáveis
│   │   │   (hero.tsx, services-overview.tsx, case-showcase.tsx,
│   │   │    product-banner.tsx, cta-final.tsx, process-steps.tsx…)
│   │   ├── motion/               ← reveal.tsx, stagger.tsx (Client Components,
│   │   │                           encapsulam TODA lógica de animação)
│   │   └── seo/                  ← json-ld.tsx (componente <script> tipado)
│   ├── data/                     ← camada de conteúdo (ver §7)
│   │   ├── site.ts               ← nome, URLs, contatos, redes sociais
│   │   ├── services.ts
│   │   ├── products.ts
│   │   ├── cases.ts
│   │   └── navigation.ts
│   ├── lib/
│   │   ├── cn.ts                 ← clsx + tailwind-merge
│   │   ├── metadata.ts           ← factory de metadata por página
│   │   └── schema.ts             ← builders de JSON-LD tipados (schema-dts)
│   └── types/
│       └── content.ts            ← interfaces Service, Product, CaseStudy…
├── next.config.ts                ← headers de segurança, config de imagens
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

**Regras da estrutura:**

- `components/ui` **não conhece conteúdo** — só recebe props. `components/sections` conhece os tipos de `src/data` e compõe as primitivas.
- Toda animação vive em `components/motion` — se um dia a estratégia de animação mudar (CSS ↔ motion), o resto do código não muda.
- `src/data` é a **única fonte de conteúdo**. Nenhum texto de negócio hardcoded em componente.

---

## 7. Camada de conteúdo (dados estáticos)

### 7.1 Por que TypeScript e não Markdown/MDX/JSON

| Opção | Avaliação |
|---|---|
| **`.ts` tipado (escolhida)** | Autocomplete, validação em compile time, refactor seguro, permite estruturas ricas (listas de features, links, metadados de imagem com dimensões e alt obrigatórios). Sem parser extra. |
| JSON | Sem tipos, sem comentários, strings multilinhas dolorosas. |
| Markdown/MDX | Ótimo para **blog** (conteúdo longo, editorial) — será a escolha quando o blog existir. Para conteúdo estruturado de páginas (título, features, CTA), MDX adiciona pipeline sem ganho. |

### 7.2 Modelo de dados (interfaces conceituais)

```
Service {
  slug, título, resumo (para cards), descrição longa,
  entregáveis[], para quem é, processo (etapas)[],
  caseRelacionado?: slug, seo: { title, description },
  faq?: { pergunta, resposta }[]
}

Product {
  slug, nome, tagline, descrição, módulos[],
  url externa (subdomínio), status ("disponível"),
  distinçãoVisual: sempre renderizado com tratamento de "produto"
}

CaseStudy {
  slug, cliente, título, contexto/desafio, solução (narrativa),
  entregas[], stack[], imagens[] { src, alt, largura, altura },
  urlPublica?, serviçosRelacionados[]: slug[],
  depoimento?: null na v1 — NUNCA inventado; o campo existe
               para quando houver depoimento real autorizado
}
```

**Regra de integridade:** campos de prova social (depoimento, métricas de resultado) são opcionais e ficam **vazios até existirem dados reais**. O design das seções precisa funcionar bem sem eles (ver §11).

### 7.3 Imagens de cases

- Screenshots reais dos projetos (Portal do Conselho, BIA em uso, telas do SaaS), armazenados em `public/images/cases/`, servidos via `next/image`.
- Cada imagem registrada em `src/data` com `alt` obrigatório (o tipo não permite omitir) e dimensões intrínsecas.
- Formato fonte: PNG/screenshot original; o Next converte para AVIF/WebP automaticamente.
- Mockups de dispositivo (browser frame, celular) compostos **em CSS**, não embutidos no arquivo de imagem — mantém as screenshots atualizáveis.

---

## 8. Design system e identidade visual

### 8.1 Tokens de cor (Tailwind v4 `@theme`)

A identidade é dark-first: o fundo escuro **é** a marca, não um "modo".

| Token | Valor | Uso |
|---|---|---|
| `--color-ink-950` | `#0D0D0D` | Fundo profundo — hero, footer, seções de ênfase |
| `--color-ink-900` | `#1A1A1A` | Fundo padrão de página |
| `--color-ink-800` | ~`#242424` (derivar) | Superfícies elevadas: cards, header com scroll |
| `--color-ink-700` | ~`#2E2E2E` (derivar) | Bordas fortes, divisores visíveis |
| `--color-line` | branco a ~8–10% de opacidade | Bordas sutis, hairlines |
| `--color-brand-500` | `#F5A623` | Amarelo principal — CTAs, destaques, o "F" |
| `--color-brand-600` | `#E5A000` | Dourado — hover de CTA, detalhes secundários |
| `--color-text-primary` | `#FFFFFF` | Títulos |
| `--color-text-secondary` | branco ~70% | Corpo de texto |
| `--color-text-tertiary` | branco ~45% | Legendas, metadados — **uso restrito** (ver contraste, §14) |

**Disciplina de uso do amarelo:** é cor de **ação e assinatura**, não decoração. Regra prática: no máximo um elemento amarelo dominante por viewport (o CTA), mais microdetalhes (sublinhado de link ativo, marcador de item, traço gráfico). Amarelo em área grande de fundo só em uma eventual seção de assinatura — nunca como padrão repetido.

**Texto sobre amarelo:** sempre `#0D0D0D`/`#1A1A1A` (contraste ~9:1). Nunca branco sobre amarelo (reprova WCAG).

### 8.2 Tipografia

**Fontes via `next/font` (self-hosted, zero requisição externa, sem layout shift):**

- **Display/títulos:** uma grotesca geométrica com personalidade técnica — candidatas: **Space Grotesk** (detalhes técnicos, ótima em dark), **Sora** ou **Clash Display**. Decidir na fase de design com o logo real em mãos; o requisito arquitetural é apenas: *uma* família display, pesos 500–700, subset latin.
- **Texto/UI:** **Inter** (variable) — legibilidade em dark mode, x-height alta, numerais tabulares para eventuais métricas.
- **Mono (opcional, uso pontual):** para detalhes de marca "de engenharia" (tags de stack nos cases, labels de seção estilo `// serviços`). Candidata: JetBrains Mono ou Geist Mono. Só incluir se o design usar de fato.

**Escala tipográfica (modular, base 1rem, razão ~1.25 com clamp fluido):**

| Papel | Tamanho (fluido) | Uso |
|---|---|---|
| Display | `clamp(2.5rem, 6vw, 4.5rem)` | H1 do hero apenas |
| H1 interno | `clamp(2rem, 4vw, 3rem)` | Título de páginas internas |
| H2 | `clamp(1.5rem, 3vw, 2.25rem)` | Títulos de seção |
| H3 | `1.25–1.5rem` | Subtítulos, cards |
| Body | `1rem–1.125rem` | Texto corrido (nunca abaixo de 1rem) |
| Small/labels | `0.875rem` | Metadados, labels de seção |

Hierarquia forte = contraste de tamanho **e** de peso **e** de cor (branco vs. branco 70%) trabalhando juntos. `line-height` apertado em display (1.05–1.15), confortável no corpo (1.6–1.7). `max-width` de texto corrido: ~65–70ch.

### 8.3 Espaçamento, grid e ritmo

- **Grid:** container central `max-width: 80rem (1280px)` com padding lateral fluido (`1.25rem` mobile → `3rem` desktop). Layout interno em CSS Grid de 12 colunas quando a composição pedir assimetria (ver §9).
- **Ritmo vertical:** seções com respiro generoso — `py` na faixa de `6–10rem` desktop, `4–6rem` mobile. Espaço em branco (escuro, no caso) é o principal marcador de sofisticação.
- **Raio de borda:** escala curta e consistente — `0.5rem` (elementos pequenos), `1rem` (cards), `1.5rem` (blocos de destaque). O logo em fundo arredondado sugere cantos suaves como traço de marca.
- **Elevação em dark mode:** sombras funcionam mal sobre `#1A1A1A`. Elevação = **cor de superfície mais clara + borda hairline** (`--color-line`), não box-shadow.

### 8.4 Inventário de componentes (v1)

**Primitivas (`components/ui`):**
`Container`, `Section` (variantes de fundo: ink-900 / ink-950 / com textura de marca), `Heading` (com eyebrow/label opcional), `Button` (variantes: `primary` amarelo, `secondary` outline, `ghost`; tamanhos `md`/`lg`; renderiza `<a>` ou `<button>` conforme prop), `Badge`/`Tag` (stack de cases, módulos do produto), `Prose` (tipografia de texto longo), `ExternalLink` (encapsula `rel="noopener noreferrer"`).

**Layout:** `Header`, `Footer`, `MobileMenu`, `SkipLink`.

**Seções (`components/sections`):** `Hero`, `ServicesOverview`, `ServiceDetail`, `CaseShowcase` (destaque com screenshot grande), `CaseGrid`, `ProductBanner` (tratamento visual exclusivo de produto), `ProcessSteps`, `AboutIntro`, `ContactChannels`, `ContactForm`, `FinalCTA`, `FaqAccordion` (se usado: `<details>/<summary>` nativo estilizado — sem JS).

**Motion (`components/motion`):** `Reveal` (fade+slide on-scroll), `Stagger` (orquestra filhos). API por props (`delay`, `direction`) — as seções nunca importam a lib de animação diretamente.

### 8.5 Elementos gráficos proprietários da marca

Para o site ter assinatura visual própria (e não parecer template), a fase de design deve produzir um pequeno vocabulário gráfico derivado do conceito **"fluxus" = fluxo**:

- **Linhas de fluxo:** paths SVG finos (1px, branco 8–12% com nós/acentos em amarelo) sugerindo conexão e movimento — usados como fundo de hero e divisores de seção. Desenhados sob medida, não gerados.
- **O "F" como padrão:** recortes/ângulos do símbolo do logo usados como máscara ou marca d'água sutil em seções de destaque.
- **Labels técnicas:** eyebrows de seção com estética de código (`// nossos serviços`) em mono, se a fonte mono for adotada.

Esses elementos são SVG inline (tema via `currentColor`/variáveis CSS), leves e exclusivos.

---

## 9. Direção visual: o que buscar e o que evitar

### 9.1 Anti-padrões proibidos (a lista do "site feito por IA")

| Anti-padrão | Regra de prevenção neste projeto |
|---|---|
| Grade de cards idênticos em toda seção | Máximo **uma** seção em grade de cards uniformes por página. Serviços na home: layout de lista editorial ou grid assimétrico, não 4 cards iguais com ícone em cima. |
| Gradientes aleatórios roxo/azul | Paleta fechada (§8.1). Gradiente só de tons da própria marca (ink→ink, amarelo→dourado em detalhes) e com função. |
| Glow/blur excessivo | Nenhum `blur` decorativo gigante de fundo. Profundidade vem de camadas de superfície e das linhas de fluxo. |
| Glassmorphism indiscriminado | Uso zero por padrão; no máximo o header com scroll (fundo semi-opaco + blur leve) — que é convenção funcional, não decoração. |
| Ícone genérico em toda seção | Sem icon pack (§4.2). Onde um card pediria ícone, usar: número tipográfico grande, screenshot real, ou elemento do vocabulário gráfico (§8.5). |
| Textos vagos ("soluções inovadoras que transformam") | Diretriz editorial do §10: todo parágrafo deve conter substantivo concreto (o quê) ou evidência (case, entregável). Frases proibidas listadas no §10.6. |
| Animações exageradas | Catálogo fechado de animações (§16), durações curtas, uma intensidade só. |
| Mesmo padrão visual repetido | Checklist de ritmo (§9.2): duas seções adjacentes não podem ter a mesma estrutura de layout. |

### 9.2 Ritmo entre seções (regra de composição)

Cada página alterna deliberadamente entre estruturas: largura total ↔ duas colunas assimétricas (7/5, 8/4) ↔ conteúdo centralizado estreito ↔ showcase com imagem dominante. Alternância também de fundo (`ink-900` ↔ `ink-950` ↔ seção com elemento gráfico). **Teste prático:** reduzir o zoom para 25% — se a página parecer "listras iguais empilhadas", o ritmo falhou.

### 9.3 O que as referências ensinam (sem copiar)

- **upbranding.com.br** → estudar: hierarquia de informação da home (autoridade antes de venda), como cases ancoram credibilidade, densidade tipográfica.
- **agenciacws.com.br/lp-criacao-de-sites** → estudar: apresentação de serviço orientada a conversão, posicionamento de CTAs ao longo do scroll, apresentação de portfólio.

O que se extrai é **estrutura e princípio**, nunca layout, texto, cor ou componente.

---

## 10. Estratégia de conteúdo por página

### 10.1 Home (`/`)

Sequência narrativa (autoridade → oferta → prova → produto → ação):

1. **Hero** — afirmação clara do que a Fluxus é (empresa de tecnologia: sites, sistemas, IA), uma frase de suporte concreta, CTA duplo (WhatsApp primário + "ver cases" secundário). Fundo `ink-950` com linhas de fluxo. **Sem carrossel, sem vídeo de fundo.**
2. **Serviços (visão geral)** — 4 serviços em layout editorial, cada um com link para sua página.
3. **Case em destaque** — Portal do Conselho com screenshot real em destaque visual grande. Um case bem contado > três resumidos.
4. **Produto** — banner do Fluxus Gestão para Igrejas com tratamento visual de produto (distinto das seções de serviço), link para página interna/subdomínio.
5. **Como trabalhamos** — 3–4 etapas do processo (entender → propor → construir → acompanhar) com texto específico.
6. **Diferenciais** — ver §10.5.
7. **CTA final** — seção de fechamento com contato.

### 10.2 Páginas de serviço (`/servicos/[slug]`)

Estrutura por página: o que é (em termos do problema do cliente) → o que está incluído (entregáveis concretos) → para quem é → processo → case relacionado (quando houver) → FAQ curto (alimenta SEO long-tail e rich results) → CTA com mensagem de WhatsApp contextual.

Mapeamento de casos reais: Sites institucionais ↔ Portal do Conselho; IA e automações ↔ BIA. Sistemas web e Consultoria: sem case dedicado na v1 — a página se apoia em entregáveis e processo, sem inventar prova.

### 10.3 Produto (`/produtos/gestao-para-igrejas`)

Página-ponte: apresenta o produto (tagline, módulos: membros, ação social, voluntários, financeiro, eventos, relatórios, indicadores, multi-templo), screenshots reais, e direciona para o subdomínio (quando ativo) ou para contato/demonstração (enquanto não estiver). A distinção visual de "produto" (badge, tratamento de cor, moldura própria) é aplicada aqui e em toda menção ao produto no site.

### 10.4 Cases (`/cases`, `/cases/[slug]`)

Formato narrativo por case: **Contexto** (quem é o cliente, qual o problema real) → **Solução** (o que foi construído, decisões relevantes) → **Entregas** (lista concreta: "16 páginas", "portal de notícias", "assistente IA", "doações via PIX", "notas fiscais", "transparência") → **Stack** (tags) → **Imagens reais** → link público quando existir (conselhodacomunidadejp.com.br). Sem números de resultado inventados, sem depoimentos inventados.

### 10.5 Diferenciais (diretriz editorial)

Cada diferencial segue o formato **afirmação específica + evidência demonstrável**:

| Diferencial (direção) | Evidência que o sustenta |
|---|---|
| Soluções partem de problemas reais, não de pacote pronto | O portal do Conselho foi desenhado para as necessidades específicas de transparência e prestação de contas da entidade |
| Tecnologia + compreensão institucional | Case de entidade pública/terceiro setor com requisitos próprios (inspiração em portais do Judiciário) |
| IA aplicada com responsabilidade | BIA: assistente com escopo definido e função clara, não chatbot genérico |
| Arquitetura pensada para crescer | O SaaS de igrejas é modular e multi-templo por design |
| Acompanhamento próximo | Modelo de trabalho descrito no processo (§10.1 item 5) |

### 10.6 Frases proibidas em todo o site

"Soluções inovadoras", "qualidade e excelência", "apaixonados por tecnologia", "transformação digital" (sem complemento concreto), "líder em", "o melhor do mercado", "tecnologia de ponta", superlativo sem evidência. Revisão editorial no checklist de aceitação (§22).

---

## 11. Números de impacto e prova social

**Problema:** empresa em fase inicial; inventar métricas está proibido e seria destrutivo para a confiança.

**Análise dos indicadores reais disponíveis:** projetos entregues (3, contando o produto), páginas do portal (16), módulos do SaaS (8), áreas de atuação (4). São números pequenos e/ou de esforço (não de resultado) — uma faixa clássica de "números de impacto" (`+500 clientes · 10 anos · 98% satisfação`) ficaria vazia ou constrangedora.

**Decisão: não usar seção de "números de impacto" na v1.** Substituir por **prova por demonstração**:

1. **Case showcase profundo** — screenshots reais em destaque, narrativa de problema→solução, link para o produto no ar. Um portal público verificável vale mais que qualquer contador animado.
2. **Especificidade como prova** — os números reais aparecem *dentro do contexto* ("portal com 16 páginas e assistente IA integrada"), onde são fatos, não métricas de vaidade.
3. **Arquitetura preparada:** o tipo `CaseStudy` já possui campos opcionais para métricas e depoimentos; quando existirem dados reais autorizados, a seção de prova social é adicionada sem redesenho.

---

## 12. Formulário de contato sem backend próprio

### 12.1 Opções analisadas

| Opção | Como funciona | Prós | Contras |
|---|---|---|---|
| **A. Route Handler + Resend (recomendada)** | `POST /api/contato` (rota atendida pelo próprio servidor Next no container do Railway) → envia e-mail via API do Resend | Dados não passam por terceiro visível ao usuário; domínio remetente próprio (`contato@fluxustecnologia.com.br` via DNS no registro.br); validação e anti-spam sob nosso controle; free tier (100 e-mails/dia) folgado; mantém o site "sem backend" no sentido relevante (nenhum serviço adicional para operar, sem banco) | Exige 1 variável de ambiente e verificação de domínio no Resend |
| B. Web3Forms / Formspree | `POST` direto do browser para serviço de forms | Zero código servidor | Chave de acesso exposta no client (spam), branding/limites do free tier, dados do lead transitando por terceiro, menos controle de validação |
| C. Só `mailto:` + WhatsApp | Links diretos | Zero infraestrutura | `mailto:` tem UX péssima (depende de cliente de e-mail configurado); perde leads |

**Decisão: A**, com WhatsApp como canal paralelo sempre visível. A opção B fica documentada como fallback aceitável se se quiser zero código de servidor.

### 12.2 Especificação do formulário

- Campos: nome, e-mail, telefone/WhatsApp (opcional), tipo de interesse (select: serviços/produto/consultoria — pré-selecionável via query param das páginas de origem), mensagem. Mínimo necessário — cada campo a mais reduz conversão.
- Client: `useActionState` (React 19) para estados de envio/sucesso/erro; validação HTML nativa + mensagens acessíveis (§14).
- Server (route handler): validação independente da do client; sanitização; verificação de origem.
- **Anti-spam sem CAPTCHA** (CAPTCHAs punem usuários legítimos): honeypot (campo oculto que bots preenchem) + verificação de tempo mínimo de preenchimento + rate limit por IP na função. Suficiente para o volume esperado.
- LGPD: aviso curto de finalidade junto ao botão + link para a política de privacidade. Nenhum dado é armazenado — o e-mail é o único destino.

---

## 13. SEO técnico

### 13.1 Metadata (nativa do App Router)

- Root layout: `metadataBase` (`https://fluxustecnologia.com.br`), template de título (`%s | Fluxus Tecnologia`), descrição padrão, `openGraph` e `twitter` base, ícones, `lang="pt-BR"` no `<html>`.
- Por página: `title` e `description` únicos e escritos à mão (fábrica em `lib/metadata.ts` garante consistência), `alternates.canonical` explícito em toda rota.
- Rotas dinâmicas: `generateMetadata` lendo de `src/data`.

### 13.2 Palavras-chave de intenção (orientam títulos/H1, sem stuffing)

Home: "empresa de tecnologia", marca. Serviços: "criação de sites institucionais", "desenvolvimento de sistemas web", "automação com IA para empresas", "consultoria em tecnologia" (+ variações regionais João Pessoa/PB, dado o case local — avaliar na redação). Produto: "sistema de gestão para igrejas".

### 13.3 Arquivos de indexação

- `app/sitemap.ts` — todas as rotas públicas, geradas das mesmas listas de `src/data` (impossível esquecer página nova).
- `app/robots.ts` — allow geral, `Disallow: /api/`, referência ao sitemap.
- `app/manifest.ts` — nome, cores da marca (`#1A1A1A`/`#F5A623`), ícones.

### 13.4 Dados estruturados (JSON-LD, tipados com `schema-dts`)

| Página | Schema |
|---|---|
| Todas (root) | `Organization` (nome, logo, URL, `sameAs`: Instagram) |
| Serviços | `Service` (+ `FAQPage` quando houver FAQ) |
| Produto | `SoftwareApplication` |
| Cases | `CreativeWork`/`WebSite` referenciado |
| Internas | `BreadcrumbList` |

Renderização via componente `<JsonLd>` (script `application/ld+json` em Server Component). Validar com o Rich Results Test antes do lançamento.

### 13.5 Open Graph / Twitter Cards

Imagens OG estáticas (1200×630) desenhadas com a identidade: uma padrão do site + uma por case/produto (screenshots reais compostos com a marca). Estáticas em `public/images/og/` na v1; `next/og` (geração dinâmica) fica anotada como evolução quando houver blog.

### 13.6 Higiene de indexação na virada

Como o domínio hoje serve a landing do SaaS: mapear URLs atualmente indexadas (Search Console) e configurar **redirects 301** no `next.config.ts` para as rotas novas equivalentes (ex.: rota antiga do SaaS → `/produtos/gestao-para-igrejas`, e futuramente → subdomínio). Registrar a propriedade no Search Console e submeter o sitemap no lançamento.

---

## 14. Acessibilidade

Meta: **WCAG 2.1 nível AA** em todas as páginas.

### 14.1 Estrutura e semântica

- Landmarks: `<header>`, `<nav aria-label>`, `<main>` (um por página), `<footer>`. Hierarquia de headings estrita (um `<h1>` por página, sem pular níveis — o componente `Heading` ajuda a impor).
- Skip link ("Pular para o conteúdo") como primeiro elemento focável.
- Listas reais (`<ul>/<ol>`) para grupos; `<article>` para cases; `<address>` para contato.

### 14.2 Teclado e foco

- Tudo operável por teclado; ordem de tabulação = ordem visual.
- `:focus-visible` customizado com a cor da marca (anel amarelo sobre fundo escuro — alto contraste natural), **nunca** `outline: none` sem substituto.
- Menu mobile: focus trap enquanto aberto, `Esc` fecha, foco retorna ao botão hambúrguer, `aria-expanded`/`aria-controls` no gatilho.

### 14.3 Contraste (atenção especial ao dark + amarelo)

| Par | Razão aprox. | Veredito |
|---|---|---|
| `#FFFFFF` sobre `#1A1A1A` | ~17:1 | AA/AAA ✓ |
| Branco 70% sobre `#1A1A1A` | ~8:1 | AA ✓ |
| Branco 45% sobre `#1A1A1A` | ~3.5:1 | **Só para texto grande/decorativo — validar caso a caso** |
| `#F5A623` sobre `#1A1A1A` | ~7.5:1 | AA ✓ (texto amarelo sobre escuro ok) |
| `#0D0D0D` sobre `#F5A623` | ~9:1 | AA ✓ (botões) |
| Branco sobre `#F5A623` | ~2:1 | **Proibido** |

Contraste verificado com ferramenta (não a olho) para cada par novo introduzido no design.

### 14.4 Conteúdo e mídia

- `alt` obrigatório por tipo em `src/data` (§7.3); imagens decorativas com `alt=""`.
- Formulário: `<label>` explícito em todo campo, erros anunciados via `aria-describedby` + região `aria-live` para o resultado do envio, `autocomplete` apropriado (`name`, `email`, `tel`).
- Links externos (WhatsApp, Instagram, portal do case) com indicação textual/acessível de que abrem em nova aba.
- `prefers-reduced-motion`: ver §16.3 — tratado como requisito de acessibilidade, não como detalhe de animação.

### 14.5 Verificação

Axe DevTools + navegação real por teclado + leitor de tela (NVDA no Windows) nas 5 páginas principais antes do lançamento. Lighthouse A11y ≥ 95 como gate de build.

---

## 15. Performance e Core Web Vitals

### 15.1 Orçamento de performance

| Métrica | Meta |
|---|---|
| LCP | < 2,0 s (4G simulado) |
| CLS | < 0,05 |
| INP | < 200 ms |
| JS de client por página | < 90 kB gzip (a maioria das páginas deve ficar bem abaixo — quase tudo é Server Component) |
| Peso total da home | < 1 MB na primeira visita (imagens incluídas) |

### 15.2 Estratégias

**Imagens (maior risco do projeto — screenshots de cases são pesadas):**
- `next/image` em tudo: AVIF/WebP automático, `sizes` correto por breakpoint, lazy loading por padrão.
- Imagem LCP (hero/case em destaque na dobra) com `priority`.
- `placeholder="blur"` em screenshots grandes para percepção de velocidade.
- Dimensões intrínsecas sempre declaradas → CLS zero por imagem.

**Fontes:** `next/font` self-hosted, subset `latin`, `display: swap`, variable fonts (1 arquivo por família), no máximo 2 famílias + mono opcional.

**JS:** Server Components por padrão (§3.2); animação on-scroll via os wrappers de `components/motion` — client islands pequenas, nunca a página inteira em client; sem bibliotecas de UI pesadas (§4.2); `next/dynamic` apenas se surgir componente pesado abaixo da dobra.

**CSS:** Tailwind v4 gera apenas o CSS usado; crítico inline pelo Next.

**Estático total (§3.2):** todas as páginas pré-geradas em build; o servidor Next no Railway só serve arquivos prontos (assets com cache imutável via headers). Se o RUM pós-lançamento indicar latência relevante, adicionar uma CDN na frente (ex.: Cloudflare) é uma otimização compatível — não é pré-requisito.

### 15.3 Verificação contínua

Lighthouse CI (ou auditoria manual no ambiente de preview) a cada deploy; RUM pós-lançamento decidido junto com analytics (§20.3 — ex.: relatório `web-vitals` para uma opção sem cookies); teste em dispositivo Android médio real, não só no desktop.

---

## 16. Animações e microinterações

### 16.1 Princípio

Animação **explica ou orienta** (entrada de conteúdo, feedback de interação, direcionamento de atenção); nunca decora por decorar. Na dúvida, não animar.

### 16.2 Catálogo permitido (fechado)

| Animação | Onde | Parâmetros |
|---|---|---|
| Fade-in + slide-up (reveal) | Entrada de seções no scroll | 300–500 ms, deslocamento ≤ 24 px, ease-out, **uma vez só** (não repete ao rolar de volta) |
| Stagger | Listas/grupos (serviços, entregas) | 60–90 ms entre itens, máx. ~6 itens orquestrados |
| Microinterações de hover | Botões, cards, links | 150–200 ms; mudança de cor/borda/translate ≤ 2–4 px |
| Transição do header | Scroll | Opacidade/borda do fundo |
| Tipográfica discreta | Só no H1 do hero, se o design pedir | Reveal por linha; sem efeito "máquina de escrever" |
| Linhas de fluxo (SVG) | Hero / divisores | Desenho de path lento e sutil; pausado fora do viewport |
| Parallax sutil | No máximo 1–2 pontos no site | Deslocamento ≤ 10% do scroll, via `transform` |

Proibido: animação infinita em loop chamativa, bounce/elastic, contadores animados (não temos números, §11), tilt 3D em cards, cursor customizado, preloader/splash.

### 16.3 Restrições técnicas

- Animar **apenas** `transform` e `opacity` (compositor; nunca layout/paint).
- `prefers-reduced-motion: reduce` → todas as animações de entrada viram estado final imediato (conteúdo visível, sem movimento); microinterações reduzidas a mudança de cor. Implementado centralmente nos componentes de `components/motion` e por media query no CSS — um único ponto de controle.
- Conteúdo **nunca** depende de animação para aparecer (sem JS = tudo visível; SSR renderiza estado final; animação apenas adiciona a transição no client).
- Mobile: reveals simplificados; parallax desativado.
- Foco por teclado dispara os mesmos feedbacks visuais do hover.

---

## 17. Segurança

### 17.1 Headers HTTP (via `next.config.ts`)

| Header | Valor/objetivo |
|---|---|
| `Content-Security-Policy` | Restritiva: `default-src 'self'`; sem scripts de terceiros na v1 (nenhum analytics externo decidido), o que permite CSP rigorosa. Ajustar se analytics for adicionado. |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Negar câmera, microfone, geolocalização |
| `X-Frame-Options` / `frame-ancestors` | Bloquear embedding |

### 17.2 Aplicação

- **Variáveis de ambiente:** chave do Resend somente como env var do servidor (nunca `NEXT_PUBLIC_*`); `.env*` no `.gitignore` desde o primeiro commit; valores de produção só no painel do Railway.
- **Formulário:** validação server-side independente, sanitização de campos refletidos no e-mail, honeypot + rate limit (§12.2), sem armazenamento de dados pessoais.
- **Links externos:** `rel="noopener noreferrer"` centralizado no componente `ExternalLink`.
- **Dependências:** superfície mínima (§4) já é a principal medida; `npm audit` no CI.
- **Deploy:** HTTPS forçado (TLS automático do Railway para domínios customizados), DNSSEC habilitado no registro.br (suporte nativo), e-mail com SPF/DKIM/DMARC ao configurar o Resend.

---

## 18. Responsividade

### 18.1 Abordagem

**Mobile-first real:** o design de cada seção começa pelo layout de 360 px; desktop é o aprimoramento. No Brasil, a maioria do tráfego institucional chega por celular (Instagram → site).

### 18.2 Breakpoints (padrão Tailwind — sem customização, menos surpresas)

| Faixa | Alvo | Notas de layout |
|---|---|---|
| < 640 px | Celulares (incl. pequenos, 360 px) | Coluna única; tipografia fluida via `clamp`; alvos de toque ≥ 44 px; CTAs em largura total |
| `sm` 640+ | Celulares grandes / paisagem | Ajustes pontuais |
| `md` 768+ | Tablets | Grids passam a 2 colunas; header ainda pode ser mobile |
| `lg` 1024+ | Notebooks | Layout completo, navegação desktop |
| `xl` 1280+ | Desktop | Container atinge largura máxima |
| ≥ 1536 (`2xl`) e ultrawide | Monitores grandes | Conteúdo **não** estica: container limitado a 80rem; fundos/elementos gráficos preenchem a largura para não parecer "coluna perdida" |

### 18.3 Regras específicas

- Nenhum scroll horizontal em nenhuma largura (teste em 320 px).
- Imagens de case: versões de crop diferentes por breakpoint quando o screenshot for largo (via `sizes`/art direction se necessário).
- Menu mobile até `lg` (4 itens + CTA não cabem confortavelmente antes disso).
- Testes em: 360×800 (Android comum), 390×844 (iPhone), 768, 1024, 1440, 1920 e um ultrawide.

---

## 19. Preparação para crescimento

Regra: **não construir agora, não impedir depois.** Como cada evolução se encaixa:

| Evolução futura | Como a arquitetura v1 a acomoda |
|---|---|
| **Blog** | Rota `/blog` reservada (§5.2); conteúdo longo entrará como MDX ou CMS (decisão adiada de propósito); o componente `Prose` já define a tipografia de texto longo; sitemap/metadata são gerados por dados, basta somar a nova fonte. |
| **CMS headless** | A camada `src/data` é a fronteira: as seções consomem tipos (`Service`, `CaseStudy`), não arquivos. Trocar a origem (arquivo TS → fetch de CMS em build) não toca em componentes. Os tipos de `src/types/content.ts` viram o contrato do CMS. |
| **Novos produtos** | `products.ts` é lista; `/produtos` já é hub. Novo produto = novo item + nova página (ou LP). |
| **Landing pages de campanha** | Prefixo `/lp/` reservado; LPs usam as mesmas primitivas de `components/ui` com layout próprio (sem header/footer completos, via layout de grupo de rotas). |
| **Área de clientes** | Ficará em subdomínio (`app.` ou `clientes.`) como aplicação separada — o site institucional permanece estático. Nenhum acoplamento a evitar desde já, apenas a decisão registrada. Quando existir, o Firebase já contratado pelo cliente (plano pago, com experiência de uso) é o candidato natural para autenticação e dados — sem custo novo de infraestrutura. |
| **Internacionalização** | Duas providências baratas agora: (1) nenhum texto hardcoded em componente — tudo em `src/data` (§6); (2) URLs sem estrutura que conflite com prefixo de locale futuro (`/en/...`). O framework de i18n fica para quando houver demanda. |
| **Toggle claro/escuro** | Cores consumidas **somente** via tokens semânticos (`--color-ink-*`, `--color-text-*`) — nunca hex solto em componente. Um tema claro futuro = novo mapa de valores para os mesmos tokens. |

---

## 20. Deploy e infraestrutura

### 20.1 Plataforma: Railway Pro (decisão tomada)

**O deploy será no Railway, plano Pro — já contratado e pago pelo cliente.** A decisão está encerrada; não há comparação de plataformas em aberto. Contexto adicional de infraestrutura: o cliente também mantém serviços Google Firebase em plano pago (com experiência na plataforma) — isso **não altera** a decisão de site estático sem banco de dados (§3.2); fica registrado como recurso disponível para evoluções futuras (§19).

Implicações e configuração do Next.js em container no Railway:

- **`output: 'standalone'`** no `next.config.ts` — gera um servidor Node mínimo e autocontido, reduzindo o tamanho da imagem e o tempo de build/deploy.
- **Otimização de imagens:** `next/image` em ambiente self-hosted usa `sharp` — o Next 16 já o traz embutido; nenhuma configuração extra além de manter o cache de otimização no filesystem do container.
- **Container sempre ativo** (característica do Railway): sem cold start — o formulário de contato responde com latência constante.
- **Healthcheck** configurado no Railway apontando para a raiz, garantindo deploys sem downtime (o container antigo só é substituído quando o novo responde).
- **Boas práticas independentes de plataforma** (mantidas): build reproduzível com lockfile, headers de segurança no `next.config.ts` (§17.1), assets com cache imutável, HTTPS forçado, variáveis de ambiente fora do repositório.

### 20.2 Domínios e DNS (gerenciados no registro.br)

Os domínios são administrados no **registro.br**, que será usado para apontar `fluxustecnologia.com.br` e `igrejas.fluxustecnologia.com.br` para o Railway:

- `fluxustecnologia.com.br` → serviço do site institucional no Railway (domínio customizado configurado no painel do Railway; apex + `www` com redirect de um para o outro; recomendo canonical **sem** `www`).
- `igrejas.fluxustecnologia.com.br` → registro DNS separado no registro.br (CNAME para o target fornecido pelo Railway) apontando para o serviço do SaaS (migração fora deste escopo, mas o plano de redirects do §13.6 depende da ordem: idealmente o subdomínio entra no ar **antes** da troca do site principal).
- **Ponto de atenção — apex no registro.br:** o Railway entrega domínios customizados via target CNAME, e o DNS do registro.br não suporta CNAME/ALIAS no apex (raiz do domínio). Verificar na configuração qual caminho o Railway oferece para apex (registro A/AAAA ou instrução própria); se não houver, o caminho usual é manter o registro do domínio no registro.br e delegar apenas o DNS a um provedor com CNAME flattening (ex.: Cloudflare DNS, gratuito). Subdomínios (`www`, `igrejas`) não têm essa limitação. Ver risco nº 4 (§23).
- E-mail: registros SPF/DKIM do Resend criados no painel DNS do registro.br para `contato@fluxustecnologia.com.br`.

### 20.3 Ambientes e fluxo

- Git com branch principal protegida mentalmente (time de 1): `main` = produção.
- **PR environments do Railway** (disponíveis no plano Pro): cada pull request gera um ambiente efêmero com URL própria — é o ambiente de validação visual antes do merge.
- Variáveis de ambiente: apenas `RESEND_API_KEY` (server) e `NEXT_PUBLIC_SITE_URL` na v1, cadastradas no painel do Railway.
- Analytics: **decisão adiada.** Se desejado no lançamento, preferir uma opção sem cookies e sem banner de consentimento (ex.: Plausible ou Umami — este último pode inclusive rodar como serviço adicional no próprio Railway Pro já pago), mantendo a CSP restritiva com ajuste mínimo. Google Analytics exigiria banner de consentimento e furo na CSP — não recomendado para a v1.

---

## 21. Roadmap de implementação

**Fase 0 — Fundação (1 sessão de trabalho)**
Scaffold do projeto (Next 16 + TS strict + Tailwind v4), tokens do design system em `@theme`, fontes via `next/font`, headers de segurança, estrutura de pastas, tipos de conteúdo, `site.ts` com dados reais de contato. *Critério de saída: página vazia no ar em preview com Lighthouse 100.*

**Fase 1 — Design system e layout (1–2 sessões)**
Primitivas de `components/ui`, `Header`/`Footer`/`MobileMenu` acessíveis, página 404, elementos gráficos da marca (linhas de fluxo v1). *Critério: navegação completa por teclado; ritmo visual aprovado em preview.*

**Fase 2 — Conteúdo e páginas (2–3 sessões)**
`src/data` completo (redação seguindo §10, com revisão contra a lista do §10.6), Home, serviços (hub + 4), produto, cases (hub + 3, com screenshots reais coletadas), quem somos. SEO por página (metadata, JSON-LD, sitemap, robots, OG estáticas). *Critério: todas as rotas no ar; Rich Results Test passando.*

**Fase 3 — Contato e conversão (1 sessão)**
Route handler + Resend (com domínio verificado), formulário acessível com `useActionState`, honeypot/rate-limit, política de privacidade, links de WhatsApp contextuais. *Critério: e-mail chegando; erro e sucesso anunciados por leitor de tela.*

**Fase 4 — Polimento e animação (1–2 sessões)**
Componentes de `components/motion` (nativo primeiro; avaliar `motion` conforme §4.1), microinterações, passagem de `prefers-reduced-motion`, ajustes de ritmo visual (§9.2), teste em dispositivos reais.

**Fase 5 — Lançamento**
Checklist §22 completo, mapeamento de URLs antigas + redirects 301, apontamento de DNS no registro.br para o Railway (§20.2), Search Console + sitemap, monitoramento na primeira semana (métricas/logs do Railway, formulário, indexação).

---

## 22. Critérios de aceitação

**Qualidade técnica**
- [ ] Lighthouse ≥ 95 nas 4 categorias, nas 5 páginas principais, em mobile simulado
- [ ] CWV dentro do orçamento (§15.1) em dispositivo Android real
- [ ] Zero erros no console; zero requisições a domínios externos (exceto o envio do formulário)
- [ ] Build estático: nenhuma rota renderizada em request time além de `/api/contato`

**Acessibilidade**
- [ ] Axe sem violações críticas/graves em todas as páginas
- [ ] Fluxo completo por teclado (incl. menu mobile e formulário) sem armadilhas
- [ ] Todos os pares de cor do design final validados AA
- [ ] `prefers-reduced-motion` verificado com a preferência ativada no SO

**SEO**
- [ ] Title/description únicos por página; canonical em todas
- [ ] JSON-LD validado (Rich Results Test) para Organization, Service, SoftwareApplication, BreadcrumbList
- [ ] Sitemap e robots acessíveis; OG testado (previews de WhatsApp/LinkedIn corretos)
- [ ] Redirects 301 das URLs antigas verificados

**Conteúdo e marca**
- [ ] Nenhuma frase da lista proibida (§10.6); nenhum número/depoimento inventado
- [ ] Screenshots reais em todos os cases, com `alt` descritivo
- [ ] Serviços e produtos visualmente distintos em toda ocorrência
- [ ] Teste do zoom 25% (§9.2): ritmo visual aprovado
- [ ] Revisão em 320 px, 360 px e ultrawide sem quebras

**Operação**
- [ ] Formulário entrega e-mail em produção; honeypot testado
- [ ] Env vars só no painel do Railway; `.env` fora do Git
- [ ] Search Console configurado com sitemap submetido

---

## 23. Riscos e pontos em aberto

| # | Item | Impacto | Encaminhamento |
|---|---|---|---|
| 1 | **Logo real ainda não validado** — a paleta é provisória | Tokens de cor podem mudar | Tokens centralizados em `@theme` tornam a troca trivial; travar a paleta antes da Fase 4 |
| 2 | **Qualidade das screenshots dos cases** — a direção visual depende de imagens reais boas | O showcase é o coração da prova social | Sessão dedicada de captura (telas limpas, dados não sensíveis, alta resolução) antes da Fase 2 |
| 3 | **Ordem da migração do SaaS** para o subdomínio | Redirects e a página de produto dependem do subdomínio ativo | Definir data; se o site novo lançar antes, a página de produto usa CTA de contato/demonstração no lugar do link |
| 4 | **Apex de domínio no registro.br + Railway** — o DNS do registro.br não suporta CNAME/ALIAS na raiz do domínio (§20.2) | Pode bloquear o apontamento de `fluxustecnologia.com.br` (o apex) na virada | Verificar com antecedência a opção que o Railway oferece para apex; plano B: delegar o DNS ao Cloudflare (gratuito) mantendo o registro no registro.br |
| 5 | **Redação dos textos** — arquitetura pronta não substitui copy específica e revisada | Textos vagos derrubam todo o posicionamento | Redigir dentro das diretrizes do §10 e validar com o dono da marca antes da Fase 2 terminar |
| 6 | **Verificação de domínio no Resend** exige acesso ao DNS | Bloqueia a Fase 3 | Garantir acesso ao painel do registro.br com antecedência (criação dos registros SPF/DKIM) |
| 7 | Contrastes de tons derivados (ink-800/700, branco 45%) são estimativas | Reprovação AA pontual | Medir com ferramenta quando o design definir os valores finais (§14.3) |

---

*Fim do documento. Próximo passo sugerido: aprovação deste documento e, em seguida, início da Fase 0 do roadmap (§21).*
