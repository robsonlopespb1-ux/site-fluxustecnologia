# HANDOVER — Site Institucional Fluxus Tecnologia

> Dossiê técnico de transferência. Permite a qualquer desenvolvedor ou nova
> sessão de IA assumir o projeto imediatamente.
> Estado documentado em: 2026-07-14. Documento-irmão: [ARQUITETURA.md](ARQUITETURA.md).
> Itens marcados **[CONFIRMAR]** não são verificáveis pelo código — precisam do
> dono do projeto (painéis registro.br/Railway/Resend).

---

## 1. Visão geral

| Item | Valor |
|---|---|
| Projeto | Site institucional da **Fluxus Tecnologia** |
| Empresa | Fluxus Tecnologia — João Pessoa/PB |
| Domínio produção | `fluxustecnologia.com.br` (hoje serve a landing antiga do SaaS; será substituído por este site) |
| Staging | **[CONFIRMAR]** — URL do serviço Railway antes do apontamento de DNS |
| SaaS de igrejas | `igrejas.fluxustecnologia.com.br` (subdomínio futuro; produto próprio) |
| Objetivo | Apresentar a Fluxus como **empresa de tecnologia** (não agência de sites): serviços + produtos próprios, com conversão via WhatsApp e formulário |
| Público-alvo | Instituições/terceiro setor (perfil dos cases reais), PMEs, gestores avaliando o SaaS de igrejas |
| Core message | "**[Sites/Sistemas/Automações/Soluções] que funcionam.**" — soluções a partir de problemas reais |
| Instagram | [@fluxustecnologia](https://www.instagram.com/fluxustecnologia) |
| E-mail | contato@fluxustecnologia.com.br |
| WhatsApp | +55 83 98795-4038 (link com mensagem pré-preenchida em `site.ts`) |

## 2. Stack tecnológica

**Runtime/framework** (versões exatas do `package.json` / lockfile):

| Pacote | Versão | Papel |
|---|---|---|
| next | 16.2.10 | App Router, Turbopack, `output: 'standalone'` |
| react / react-dom | 19.2.4 | UI |
| typescript | ^5 (instalado 5.9.3) | `strict: true` |
| tailwindcss / @tailwindcss/postcss | ^4 (instalado 4.3.2) | CSS-first (`@theme` no globals.css, sem tailwind.config) |
| clsx | ^2.1.1 | composição de classes (via `cn()`) |
| tailwind-merge | ^3.6.0 | resolução de conflitos de utilitários (via `cn()`) |
| resend | ^6.17.2 | envio do e-mail do formulário |
| eslint 9 + eslint-config-next | dev | lint |

- **Node:** 22 (Docker `node:22-alpine`; local v22.18.0). **Gerenciador:** pnpm, fixado em `packageManager: "pnpm@11.8.0"` (corepack). `pnpm-workspace.yaml` aprova os build scripts de `sharp` e `unrs-resolver` — **não remover** (sem ele o sharp não compila e o `next/image` quebra em produção).
- **Banco de dados: NÃO HÁ.** Conteúdo 100% estático em `src/data/site.ts`; formulário vai por e-mail, nada é persistido.
- **Deploy:** Railway Pro (container via `Dockerfile`), decisão fechada — ver ARQUITETURA §20.
- **Serviços externos:** Resend (e-mail transacional; domínio ainda não verificado — ver §15), registro.br (DNS), Railway (hospedagem). Hostinger: **[CONFIRMAR]** — citado pelo cliente como fornecedor (provavelmente e-mail), não aparece em nenhuma configuração do código.
- **Analytics: nenhum instalado** (decisão adiada; sem cookies → sem banner de consentimento).

## 3. Estrutura de pastas

```
site-fluxustecnologia/
├── Dockerfile                  # multi-stage p/ Railway (deps → build → runner não-root)
├── .dockerignore               # exclui node_modules, .next, .git, .env*, *.md, docs/
├── .env.example                # RESEND_API_KEY (único env var secreto)
├── .gitattributes              # eol=lf
├── next.config.ts              # standalone + headers de segurança (6)
├── pnpm-workspace.yaml         # aprovação de build scripts (sharp) — NÃO remover
├── docs/
│   ├── ARQUITETURA.md          # decisões técnicas (fonte da verdade)
│   └── HANDOVER.md             # este documento
├── public/
│   ├── logo-fluxus-icone.png   # F dourado 256², transparência REAL (processado)
│   ├── logo-fluxus-wordmark.png# "Fluxus" branco 398×96 (derivado, transparente)
│   ├── logo-fluxus{,-horizontal,-icone-old,-icone-transparente}.png  # originais (não usados no código)
│   ├── og-image.png            # 1200×630 gerada da marca
│   ├── icon.png (192²) / apple-icon.png (180²)  # favicons da marca
│   ├── images/cases/           # screenshots reais (portal, BIA, 3× SaaS igrejas)
│   ├── images/logos-clientes/  # 4 logos do marquee (downscaled p/ ≤480px)
│   └── videos/hero-bg.mp4      # vídeo do hero — 19MB, PENDENTE comprimir
└── src/
    ├── app/                    # rotas (ver §4) + globals.css + favicon.ico
    │   └── api/contact/route.ts# único endpoint dinâmico
    ├── components/
    │   ├── Header.tsx, Footer.tsx, ContactForm.tsx   # globais
    │   ├── sections/           # seções da Home + PageHero consumers
    │   └── ui/                 # primitivas reutilizáveis (ver §8)
    ├── data/site.ts            # TODO O CONTEÚDO do site (fonte única)
    ├── lib/cn.ts               # clsx + twMerge
    └── lib/email-template.ts   # HTML do e-mail do formulário
```

## 4. Páginas e rotas

| Rota | Tipo | Objetivo | Title (template `%s | Fluxus Tecnologia`) |
|---|---|---|---|
| `/` | Estática | Home completa (8 seções) | default: "Fluxus Tecnologia — Sites, Sistemas, IA e Consultoria" |
| `/a-fluxus` | Estática | Quem somos, processo, valores | "A Fluxus" |
| `/solucoes` | Estática | 4 serviços detalhados em seções alternadas | "Soluções" |
| `/produtos` | Estática | Fluxus Gestão para Igrejas (7 módulos + carrossel) | "Produtos" |
| `/projetos` | Estática | Hub editorial dos 3 projetos | "Projetos" |
| `/projetos/[slug]` | SSG (3 páginas, `dynamicParams=false` → 404 p/ slug inválido) | Detalhe de cada projeto | nome do projeto |
| `/contato` | Estática | Formulário + canais (form em `<Suspense>`) | "Contato" |
| `/politica-de-privacidade` | Estática | LGPD em linguagem simples | "Política de Privacidade" |
| `/api/contact` | **Dinâmica** (única) | POST do formulário | — |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Estáticas | SEO/PWA | — |

Slugs: `portal-conselho-comunidade`, `bia-assistente-virtual`, `fluxus-gestao-igrejas`. Todas as páginas têm `description` própria e `alternates.canonical`.

## 5. Sequência da Home (`src/app/page.tsx`)

1. **Hero** (`sections/Hero.tsx`, Client) — vídeo de fundo em loop (`/videos/hero-bg.mp4`, overlay `ink-950/70`), título "**[palavra rotativa] que funcionam.**" com ticker vertical (Sites→Sistemas→Automações→Soluções, 3s, slide 500ms, clone p/ loop infinito, sizer p/ largura estável), palavra em amarelo, subtítulo, CTAs "Conheça nossos projetos" (`/projetos`) e "Fale conosco". Dados: `hero` em site.ts. Reduced motion: sem vídeo, "Soluções que funcionam." estático.
2. **Services** (`sections/Services.tsx`, Server + `ServicesHeader.tsx` Client) — seção CLARA; cabeçalho com **shimmer dourado** no eyebrow + **typewriter** no h2 (IO-disparados, uma vez) e **letras energizadas** pós-digitação; 4 cartões **sticky "fichário"** (tops 72/92/112/132px, z 10–40, fundo branco) empilhando no scroll. Dados: `servicesSection`, `homeServices`.
3. **Product** (`sections/Product.tsx`, Server) — seção ESCURA; badge "Produto próprio", 5 módulos, screenshot em moldura-browser CSS com glow dourado + 2 miniaturas. Dados: `product`.
4. **Cases** (`sections/Cases.tsx`, Server) — seção CLARA; h2 com letras energizadas; destaque (Portal) com moldura clara + botão externo + link de detalhes; 2 cards com **carrossel** no Fluxus Igrejas (3 imgs) e link esticado p/ `/projetos/[slug]`. Dados: `cases`.
5. **Differentials** (`sections/Differentials.tsx`, Server) — ESCURA; título sticky à esquerda, 4 itens com hairlines e borda-esquerda amarela no hover. Dados: `differentials`.
6. **LogoMarquee** (`sections/LogoMarquee.tsx`, Server) — faixa BRANCA; 4 logos × **4 cópias** (loop `translateX(-25%)`), 20s mobile/28s desktop, pausa no hover, fade lateral branco (100px/60px), logos grayscale+blur → reveal no hover, cópias extras `aria-hidden`+`tabIndex=-1`. Dados: `clientProjects`.
7. **Diagnostic** (`sections/Diagnostic.tsx`, Client) — ESCURA; "Não sabe por onde começar?", 6 opções `aria-pressed` com ícones próprios e **card-orbit** (luz orbitante no hover; permanente no selecionado); resposta contextual `aria-live` com fade-up; CTA → `/contato?assunto={id}` (pré-seleciona o form). Dados: `diagnosticOptions`.
8. **CallToAction** (`sections/CallToAction.tsx`, Server) — **AMARELA** (única área grande de cor); "Tem um projeto em mente?", botão escuro → `/contato`, "F" gigante em marca d'água 5%.

Ritmo de fundos: escuro → claro → escuro → claro → escuro → branco → escuro → amarelo.

## 6. Efeitos e animações

| Efeito | Onde | Tipo | Descrição | Reduced motion |
|---|---|---|---|---|
| Ticker vertical do h1 | Hero | JS (state) + transition | palavra desliza p/ cima a cada 3s; clone + snap sem transição p/ loop | palavra estática "Soluções" |
| Vídeo de fundo | Hero | `<video>` | loop mudo, `preload="metadata"` | não é montado |
| ScrollReveal | todas as seções (22+ na Home) | JS (IO compartilhado) + CSS `.scroll-reveal*` | fade-up/left/right/scale, delays stagger, 1×; `style` mesclável (sticky) | tudo visível (CSS `!important` + JS pula) |
| Fichário sticky | Services | CSS puro (`position: sticky` + tops escalonados) | cartões empilham no scroll | inerte por natureza |
| Shimmer | ServicesHeader (eyebrow) | CSS `@keyframes shimmer` + IO | stripe DOURADO (não branco — fundo é claro) passa 1× | anulado (CSS+JS) |
| Typewriter | ServicesHeader (h2) | JS interval + CSS `animate-blink` | 45ms/char, cursor pisca 1,5s e some; altura reservada (sem layout shift) | texto completo instantâneo |
| Letras energizadas | ServicesHeader, Cases h2 (via `EnergizedText`) | CSS `:hover`, `:has()` p/ vizinha anterior | glow dourado por letra + spread p/ vizinhas; palavras em spans (wrap ok) | hover só muda cor |
| Luz orbital (logo) | Logo (header/footer) | CSS `@property --angle` + `rotate-border` 2s + máscara exclude | anel de 2px com ponto orbitando no hover | sem órbita, glow estático |
| Card orbit | Diagnostic | mesma mecânica, 2.5s | hover = órbita; selecionado = órbita permanente | sem órbita, borda amarela |
| Marquee | LogoMarquee | CSS `@keyframes marquee` (−25%) | loop contínuo, pausa no hover | parado + scroll-x manual |
| Carrossel | ImageCarousel (Cases, Produtos, projeto) | JS interval + fade 500ms | 4s, dots clicáveis, pausa hover | sem autoplay (manual ok) |
| Barra de progresso | ScrollProgress (layout) | JS scroll+rAF | 3px amarela com glow, topo, z-50 | mantida (feedback, não animação) |
| Back to top | BackToTop (layout) | JS scroll+rAF | aparece >300px, fade+slide, scroll smooth | scroll instantâneo, sem fade |
| Hover dos cartões/cards | Services, Cases, Diagnostic, Product | CSS | translate/scale/bordas/sombras 300ms | — |
| Fade da resposta | Diagnostic | CSS `diag-in` re-disparado por `key` | fade-up 300ms | instantâneo |

## 7. Identidade visual

**Tokens** (globals.css `@theme` — dark-first, paleta provisória até validação final do logo):

| Token | Hex | Função |
|---|---|---|
| `ink-950` | #0D0D0D | fundo profundo (hero, seções de ênfase, footer) |
| `ink-900` | #1A1A1A | fundo padrão (body) |
| `ink-800` | #242424 | superfícies elevadas |
| `ink-700` | #2E2E2E | bordas fortes |
| `line` | branco 8% | hairlines em fundo escuro |
| `brand-500` | #F5A623 | amarelo principal (CTAs, destaques) |
| `brand-600` | #E5A000 | hover/detalhes |
| `brand-700` | #B45309 | **texto pequeno sobre fundo claro (AA)** |
| `paper` | #FAFAFA | seções claras |
| `paper-line` | #E4E4E4 | hairlines em fundo claro |
| `text-primary/secondary/tertiary` | #FFF / #B3B3B3 / #8C8C8C | texto sobre escuro |

Em seções claras: classe **`.section-light`** inverte a paleta (p → #52525B, caption → #6B6B6B).

**Tipografia:** Inter (next/font, swap, subset latin), pesos 400–700; h1–h4 com clamps no `@layer base`; utilities `text-display`, `text-stat`, `text-caption`. Movimento: `--transition-base` 200ms, `--ease-soft`.

**Regras de contraste (INEGOCIÁVEIS):** texto sobre amarelo = **escuro** (#0D0D0D; branco sobre amarelo ≈ 2:1, reprovado); amarelo puro sobre branco só em elemento decorativo grande/`aria-hidden` — texto pequeno em fundo claro usa `brand-700`.

**Anti-padrões proibidos (ARQUITETURA §9):** cards idênticos repetidos, gradientes aleatórios, glow excessivo, glassmorphism, icon packs genéricos (todo ícone é SVG inline próprio em `Icons.tsx`), textos clichês (§10.6), animação sem propósito, mesmo layout em seções adjacentes.

## 8. Componentes

**Globais:** `Header` (Client — sticky, blur, link ativo via pathname, menu mobile overlay com Esc/trava de scroll, logo oversized vazando 5–7px), `Footer` (Server — 3 colunas, h2 de rodapé, link privacidade), `ContactForm` (Client — ver §9).

**UI reutilizáveis (`components/ui/`):**

| Componente | Tipo | Props principais / função |
|---|---|---|
| `Container` | Server | max-w-7xl + padding responsivo; `className` |
| `SectionWrapper` | Server | `<section>` com `section-padding` + `scroll-mt-20`; `id`, `className` |
| `Button` | Server | `variant` primary/outline, `size`, `href` (→Link), `external` (→`<a>` seguro + sr-only) |
| `Logo` | Server | `variant` header/footer; ícone com glow/orbit + "Fluxus" texto + "TECNOLOGIA" descritor |
| `Icons` | Server | todos os SVGs do site (menu, close, whatsapp, instagram, mail + 6 do diagnóstico) |
| `PageHero` | Server | hero interno das páginas: `eyebrow`, `title`, `subtitle`, children |
| `ScrollReveal` | Client | `animation`, `delay`, `duration`, `threshold`, `as`, `style` — **observer compartilhado** singleton |
| `EnergizedText` | Server | `text`, `as` — letras com glow CSS; aria-label contínuo |
| `ImageCarousel` | Client | `images`, `aspectClassName`, `dotsVariant` light/dark, `intervalMs` |
| `ScrollProgress` | Client | barra de progresso global |
| `BackToTop` | Client | botão flutuante |

**Seções da Home:** ver §5. `ServicesHeader` é o único pedaço client de `Services`.

## 9. Formulário de contato

- **Campos:** nome (req, min 2), e-mail (req, formato), telefone (opcional), assunto (select: Site institucional / Sistema web / Inteligência Artificial / Consultoria / Outro), mensagem (req, min 20). Labels associados, `aria-live` no resultado, consentimento LGPD com link p/ privacidade.
- **Pré-seleção:** `?assunto=` (site|sistema|desorganizacao|atendimento|ideia|perdido → mapeado em `SUBJECT_BY_PARAM`); vem do Diagnostic da Home. `useSearchParams` ⇒ o form fica dentro de `<Suspense>` em `/contato` (**não remover**, quebra o build).
- **Backend (`api/contact/route.ts`):** validação server-side independente; **honeypot** `website` (preenchido → 200 falso sem envio); **rate limit em memória** 3/hora por IP (reseta em restart — aceitável no volume esperado); sanitização de quebras de linha em campos refletidos.
- **Resend:** `from: Fluxus Tecnologia <contato@fluxustecnologia.com.br>`, `to` idem, `replyTo` = e-mail do visitante, subject "Novo contato pelo site — {assunto}". **Requer domínio verificado no Resend** (pendência §15). **Fallback dev:** sem `RESEND_API_KEY`, loga no console e responde sucesso.
- **Template (`lib/email-template.ts`):** HTML de tabela com estilos inline (header escuro com marca + traço dourado, campos com labels, mensagem em caixa com borda dourada, footer), **escapeHtml em todo input**, `\n`→`<br>`, telefone omitido se vazio; enviado com fallback `text`.

## 10. SEO

- Metadata root completa: `metadataBase`, title template, description, keywords, robots/googleBot, OG pt_BR (og-image.png 1200×630), Twitter `summary_large_image`, `category`. Canonicals em todas as páginas (relativos, resolvidos pela base).
- `sitemap.ts` (projetos gerados de `cases` — slug novo entra sozinho), `robots.ts` (Disallow `/api/`), `manifest.ts` (cores da marca).
- JSON-LD `Organization` no layout (endereço JP/PB, sameAs Instagram). Evolução: `Service`/`SoftwareApplication`/`BreadcrumbList`.
- Favicons: `src/app/favicon.ico` (32²) + `public/icon.png` + `public/apple-icon.png` via `metadata.icons`.

## 11. Acessibilidade

- **Skip link** "Pular para o conteúdo" (primeiro focável, visível no focus) → `<main id="conteudo">`.
- Hierarquia de headings correta em todas as páginas (footer usa h2; um h1 por página).
- `aria`: menu mobile (`expanded/controls/label`, Esc, visibility fora do tab), carrossel (`aria-label`/`aria-current` nas dots), diagnóstico (`aria-pressed`, resposta `aria-live`), ticker do hero (coluna `aria-hidden` + sr-only `aria-live` com a palavra atual), EnergizedText (`aria-label` contínuo), links externos com sr-only "(abre em nova aba)" e `rel="noopener noreferrer"`.
- `prefers-reduced-motion`: tratado em TODOS os efeitos (ver tabela §6) — via CSS media query E checagem JS.
- **noscript:** `<noscript><style>` no layout força `.scroll-reveal` visível — sem JS nenhum conteúdo fica oculto.
- Focus ring amarelo global (`:focus-visible`); escuro sobre superfícies amarelas.

## 12. Segurança

- **Headers (next.config.ts, todos os responses):** `X-Frame-Options: DENY` · `X-Content-Type-Options: nosniff` · `Referrer-Policy: origin-when-cross-origin` · `X-DNS-Prefetch-Control: on` · `Strict-Transport-Security: max-age=31536000; includeSubDomains` · `Permissions-Policy: camera=(), microphone=(), geolocation=()`. (CSP fina: pendência de evolução.)
- Honeypot + rate limit (§9); `escapeHtml` no template de e-mail; `singleLine` no subject.
- `.env*` fora do git (exceção `!.env.example`) e fora da imagem Docker (`.dockerignore`); única secret: `RESEND_API_KEY` (server-only).
- Runner Docker com usuário não-root.

## 13. DNS e infraestrutura

⚠️ Registros DNS **não são verificáveis pelo código** — tabela com o estado PLANEJADO (ARQUITETURA §20.2); preencher os valores reais do painel do registro.br:

| Tipo | Nome | Valor | Status |
|---|---|---|---|
| CNAME | `www` | target fornecido pelo Railway | **[CONFIRMAR]** |
| A/ALIAS | apex `fluxustecnologia.com.br` | **RISCO**: registro.br não suporta CNAME/ALIAS no apex; verificar opção do Railway ou delegar DNS ao Cloudflare (registro permanece no registro.br) | **[CONFIRMAR]** |
| CNAME | `igrejas` | target Railway do SaaS | **[CONFIRMAR]** (subdomínio futuro) |
| MX | @ | provedor de e-mail (Hostinger? **[CONFIRMAR]**) | **[CONFIRMAR]** |
| TXT | @ / `resend._domainkey` | SPF + DKIM do Resend (gerados ao verificar o domínio no painel Resend) | **PENDENTE** |

- **Railway:** projeto/serviço **[CONFIRMAR]** — deploy via Dockerfile; healthcheck recomendado na raiz; PR environments disponíveis no Pro. Risco do IP: Railway não fornece IP fixo garantido p/ apontamento A no apex — daí o plano B Cloudflare.
- **Resend:** domínio NÃO verificado ainda; `from` já configurado para o institucional (envios falharão até a verificação).

## 14. Deploy

- **Local:** `C:\Users\Thiago\projetos\site-fluxustecnologia` — `pnpm install` · `pnpm dev` (localhost:3000) · `pnpm build` · `pnpm lint`. Teste do standalone: `$env:PORT='3210'; node .next\standalone\server.js`.
- **GitHub:** `https://github.com/robsonlopespb1-ux/site-fluxustecnologia` — branch única `main` (= produção). Workflow CI: **não há** (build acontece no Railway).
- **Railway:** conectar o repo, build pelo `Dockerfile` (multi-stage; runner roda `node server.js`, porta 3000). Variáveis: `RESEND_API_KEY` (única). `NEXT_PUBLIC_SITE_URL` prevista no ARQUITETURA mas o código usa constante — alinhar se necessário.

## 15. Pendências e riscos (priorizado)

1. **Vídeo do hero: 19MB** (`public/videos/hero-bg.mp4`) — instalar ffmpeg (`winget install Gyan.FFmpeg`), comprimir p/ <5MB (crf 28→32), mover original p/ fora do repo (já há regra no .gitignore p/ `hero-bg-original.mp4`). Maior item de performance.
2. **Resend:** criar API key → env no Railway; verificar domínio (TXT SPF/DKIM no registro.br). Sem isso o formulário só funciona em modo dev.
3. **Apex DNS no registro.br × Railway** (risco nº 4 do ARQUITETURA §23) — validar antes da virada; plano B: DNS no Cloudflare.
4. **Screenshots do SaaS** com e-mail pessoal real e dados de teste ("João da silva") — recapturar com conta demo antes do lançamento.
5. **`technologies` dos 3 cases** vazias em `site.ts` (linha só renderiza quando preenchida).
6. **Descrição expandida por projeto** em `/projetos/[slug]` (hoje reusa a curta).
7. **Link do subdomínio** `igrejas.fluxustecnologia.com.br` no CTA de `/produtos` quando ativo (hoje → `/contato`); o marquee já linka o subdomínio (não resolve até o DNS existir).
8. Redirects 301 das URLs antigas indexadas (landing atual) — mapear no Search Console na virada.
9. Analytics: decisão adiada (se entrar: opção sem cookies — Plausible/Umami).
10. Cloudflare como CDN/DNS: opcional, avaliar pós-lançamento com RUM.

## 16. Bugs solucionados durante o desenvolvimento (não reintroduzir)

1. **"SVG" do wordmark era PNG raster de 1,3MB com xadrez de transparência PINTADO** (fake) — wordmark real foi extraído do `logo-fluxus.png` convertendo tinta→alpha (398×96, 5,3KB).
2. **Ícone F "transparente" também era fake** (xadrez opaco baked) — reprocessado croma→alpha, 816KB→5,5KB; cor reforçada p/ #F5A623. Armadilhas GDI+: não salvar sobre arquivo aberto; `UnlockBits` descarta alpha em fonte 24bpp (usar bitmap 32bpp novo).
3. **Shimmer invisível**: stripe branco sobre seção #FAFAFA — trocado por stripe dourado (#B45309→#F5A623) com janela maior.
4. **Gap no loop do marquee**: 2 cópias não cobriam viewports largas → 4 cópias + `translateX(-25%)`; espaçamento movido p/ padding POR ITEM (gap no container abre buraco na emenda).
5. **Wordmark preto ilegível no header escuro** (todos os PNGs originais têm texto preto) — resolvido com ícone + texto HTML, depois wordmark derivado.
6. **`useSearchParams` sem Suspense** quebraria o build — form envolto em `<Suspense>` em `/contato`.
7. **pnpm ≥10 bloqueando build script do sharp** (abortou o create-next-app) — aprovado em `pnpm-workspace.yaml`; replicado no Dockerfile (copiar o yaml no estágio deps).
8. **Ordem de pintura CSS**: anel orbital via `z-index:-1` renderiza SOBRE o background do próprio elemento — usar máscara `exclude` (logo-orbit/card-orbit).
9. **Dots do carrossel invisíveis em fundo escuro** — prop `dotsVariant="dark"`.
10. **Footer com h4 pulando níveis de heading** — rebaixado p/ h2 estilizado.
11. `!text-sm` (sintaxe v3) não compila no Tailwind v4 — importante: v4 usa sufixo (`text-sm!`), e naquele caso não era necessário.
12. Painel de preview do Claude com renderer congelado (IO/rAF/screenshots mortos, computed styles obsoletos pós-HMR) — NÃO é bug do site; validar efeitos em navegador real.

## 17. Decisões técnicas que NÃO devem ser revertidas

1. **Header `sticky` (não `fixed`)** — ocupa espaço no fluxo; sem padding-top compensatório nem layout shift.
2. **Server Components por padrão**; client apenas onde há estado (Header, Hero, ServicesHeader, Diagnostic, ContactForm, carrossel, progress, back-to-top, reveals). Marquee e EnergizedText são CSS puro — manter server.
3. **Todo conteúdo em `src/data/site.ts`** — componentes não contêm texto de negócio; `testimonial`/`metrics` tipados `null` (inventar prova social exige mudar o tipo conscientemente).
4. **Sem bibliotecas de animação/ícones/forms** (motion, lucide, RHF avaliadas e dispensadas — ARQUITETURA §4); tudo CSS/IO nativo.
5. **`output: 'standalone'` + Dockerfile com `pnpm-workspace.yaml` no estágio deps** — deploy Railway depende disso.
6. **ScrollReveal com IntersectionObserver COMPARTILHADO** e reveal no PRÓPRIO elemento sticky (`as="li"`) — wrapper mataria o range do sticky.
7. **EnergizedText quebra por PALAVRA** (spans inline-block) — nbsp em espaços impediria wrap no mobile.
8. **`aria-pressed` (não radiogroup) no Diagnostic** — preserva Tab+Enter/Space sem impor setas do padrão ARIA radio.
9. **brand-700 para texto pequeno em fundo claro** — amarelo puro reprova WCAG sobre branco.
10. **Fallback dev do formulário** (sem chave → simula) — permite desenvolver sem secret.
11. **Espaçamento do marquee por item** (não gap/padding no container) — imunidade a gap na emenda.
12. **noscript + reduced-motion em camadas (CSS e JS)** — conteúdo nunca refém de animação.

## 18. Prompt de ignição (nova sessão de desenvolvimento)

```
Atue como Engenheiro de Software Sênior no site institucional da Fluxus Tecnologia.

CONTEXTO: Site institucional (fluxustecnologia.com.br) da Fluxus Tecnologia —
empresa de tecnologia de João Pessoa/PB (sites, sistemas, IA, consultoria +
produto SaaS próprio de gestão de igrejas). Projeto FUNCIONAL e completo nas
fases 1–8; pré-lançamento.

STACK: Next.js 16.2.10 (App Router, Turbopack, output standalone) · React 19.2.4 ·
TypeScript strict · Tailwind v4 (tokens em @theme no globals.css, SEM
tailwind.config) · pnpm 11.8 · deps runtime: clsx, tailwind-merge, resend.
Deploy: Railway Pro via Dockerfile. SEM banco de dados — todo conteúdo em
src/data/site.ts. Único endpoint dinâmico: /api/contact (Resend + honeypot +
rate limit; fallback dev sem RESEND_API_KEY).

LEIA ANTES DE QUALQUER ALTERAÇÃO:
1. docs/HANDOVER.md (dossiê completo — rotas, componentes, efeitos, decisões)
2. docs/ARQUITETURA.md (decisões e anti-padrões §9/§10.6)
3. src/data/site.ts (todo o conteúdo do site)
4. Os arquivos específicos que for alterar

EFEITOS EXISTENTES (NÃO DESTRUIR): ticker vertical do hero, fichário sticky de
serviços, shimmer + typewriter + letras energizadas, luz orbital (logo e cards
do diagnóstico), marquee infinito de logos, carrossel, scroll reveals (observer
compartilhado), barra de progresso, back-to-top, diagnóstico interativo com
pré-seleção do formulário via ?assunto=.

FLUXO DE TRABALHO (6 passos):
1. Ler os arquivos envolvidos ANTES de alterar
2. Mapear todos os arquivos que criará/alterará
3. Implementar seguindo os padrões existentes (cn(), tokens, section-light,
   componentes de ui/)
4. pnpm build — zero erros antes de considerar pronto
5. Validar no navegador (pnpm dev) — inclusive mobile e prefers-reduced-motion
6. Reportar alterações e decisões

REGRAS:
- NUNCA fazer commit/push sem pedido explícito
- PowerShell usa ";" para encadear comandos, NÃO "&&"
- Texto sobre amarelo (#F5A623) = SEMPRE escuro (#0D0D0D); texto pequeno em
  fundo claro usa brand-700 (#B45309), nunca amarelo puro
- Dark mode é o padrão; seções claras usam .section-light
- Sem bibliotecas novas sem justificativa forte (ARQUITETURA §4)
- Todo conteúdo novo vai em src/data/site.ts, não hardcoded
- Respeitar prefers-reduced-motion em qualquer animação nova
- Não inventar clientes, números, depoimentos (campos são null tipados)

PENDÊNCIAS CONHECIDAS: vídeo hero 19MB (comprimir com ffmpeg), verificação do
domínio no Resend + RESEND_API_KEY no Railway, apex DNS registro.br×Railway
(plano B Cloudflare), screenshots do SaaS com dados de teste, technologies dos
cases vazias, descrições expandidas dos projetos.

TAREFA: [DESCREVA AQUI O QUE VOCÊ QUER]
```

---

*Fim do dossiê. Em caso de divergência entre este documento e o código, o código vence — atualize este arquivo.*
