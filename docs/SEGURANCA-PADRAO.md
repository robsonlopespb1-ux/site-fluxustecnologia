# Padrão de Segurança — Fluxus Tecnologia

> Padrão reutilizável para todos os projetos da Fluxus. Implementação de
> referência: este repositório (`src/app/api/contact/route.ts` e
> `next.config.ts`). Validado em incidente real de varredura automatizada
> (22/08/2026, 244 requisições — todas as defesas seguraram).

## Formulários

- **Honeypot**: campo hidden (`website`) que humanos não veem; se preenchido,
  responder **200 falso** silenciosamente — não ensinar o bot que foi detectado.
- **Rate limit por IP**: 3 envios / 10 minutos (nível 1) + **bloqueio total de
  1 hora após 5 rejeições** em 10 minutos (nível 2). Em memória serve para
  container único; usar store externo se houver múltiplas réplicas.
- **Validação server-side independente do frontend**:
  - Limites de tamanho: nome ≤ 100, e-mail ≤ 254, telefone ≤ 20,
    assunto ≤ 150, mensagem 20–2000.
  - Nome: rejeitar caracteres `< > { } [ ] \ / ;` e palavras-chave de ataque
    (`script`, `alert`, `select`, `drop`, `union`, `eval`, `onclick`,
    `onerror`) — **com word boundary** (`\b`) para não bloquear nomes
    legítimos como "Evaldo".
  - E-mail: formato + lista de domínios descartáveis (test.com, example.com,
    mailinator.com, guerrillamail.com, tempmail.com, throwaway.email).
  - Mensagem: padrões de prompt injection ("ignore previous", "reveal your",
    "system prompt", "act as", "api key", "secret key"…).
  - Rejeições por padrão malicioso usam **mensagem genérica** ("Dados
    inválidos.") — não ajudar o atacante a calibrar o payload.
- **Bloqueio de User-Agent de bot** em endpoints de formulário: `curl`,
  `wget`, `python-requests`, `scrapy`, `bot` (case-insensitive) → 403.
  Ausência de UA **não** bloqueia (proxies podem removê-lo).
- **escapeHtml em TODO output** que inclua input do usuário (e-mails HTML,
  páginas, logs renderizados). Escapar ANTES de converter `\n` em `<br>`.
- Campos refletidos em headers/assunto de e-mail: remover `\r\n` (evita
  header injection).
- **NUNCA** usar `dangerouslySetInnerHTML` com dados de usuário.
- Espelhar limites no frontend (`maxLength`) para UX — mas a validação que
  conta é a do servidor.

## Headers de segurança (next.config.ts)

- `Content-Security-Policy` — `default-src 'self'`; App Router exige
  `'unsafe-inline'`/`'unsafe-eval'` em `script-src` (sem arquitetura de
  nonce); `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`.
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `X-DNS-Prefetch-Control: on`

## Variáveis de ambiente

- **NUNCA** usar prefixo `NEXT_PUBLIC_` para chaves/segredos — tudo com esse
  prefixo é embutido no bundle do navegador e legível por qualquer pessoa.
- Chaves apenas no painel do Railway/Vercel — nunca no repositório.
- `.env.example` com placeholders (`re_xxxxx`), NUNCA valores reais.
- `.gitignore` com `.env*` e exceção `!.env.example`; `.dockerignore` com
  `.env*` (segredos fora da imagem).

## Proteção de rotas

- Redirect das rotas comumente varridas (`/.env`, `/.env.local`,
  `/package.json`, `/admin`, `/wp-admin`, `/wp-login.php`, `/xmlrpc.php`)
  para a **home real** — scanners registram 200 de página legítima em vez de
  um mapa limpo de 404s.
- 404 customizada sem stack traces (padrão do Next em produção).
- API routes com validação própria — nunca confiar no frontend.
- `dynamicParams = false` em rotas SSG: slug desconhecido → 404 imediato.

## Monitoramento

- Log estruturado em JSON para toda requisição bloqueada:
  `{ type: "SECURITY", event, reason, ip, ua, timestamp }` — pesquisável nos
  logs do Railway (`type":"SECURITY`).
- Razões padronizadas: `bot_ua`, `honeypot`, `invalid_input`, `xss_pattern`,
  `disposable_email`, `prompt_injection`, `rate_limit`, `ip_blocked`,
  `invalid_json`.
- Verificar os logs do período após qualquer suspeita de incidente.
- Preservar evidências: exportar logs + hash SHA-256 do arquivo exportado.

## Resposta a incidentes

1. Exportar e preservar os logs do período (com hash).
2. Confirmar que nenhuma variável de ambiente foi exposta (varrer respostas
   servidas e o bundle público por `NEXT_PUBLIC_`).
3. Verificar deployments e variáveis no painel do Railway (nada alterado?).
4. Rotacionar chaves se houver qualquer dúvida (Resend etc. — rotação é barata).
5. Denunciar ao provedor do IP de origem (`abuse@…`) com CERT.br em cópia
   (cert@cert.br).
6. Registrar boletim de ocorrência se houver dano ou persistência.
