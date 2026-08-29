import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { buildContactEmailHtml } from "@/lib/email-template";

/**
 * Envio do formulário de contato (docs/ARQUITETURA.md §12) com o padrão de
 * segurança Fluxus (docs/SEGURANCA-PADRAO.md):
 * bloqueio de IP reincidente → filtro de User-Agent de bot → honeypot →
 * validação rígida (tamanhos, padrões maliciosos) → rate limit → envio.
 * Toda rejeição gera log estruturado (visível nos logs do Railway).
 */

/* ————— Rate limit e bloqueio (em memória — container único) ————— */

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 3 envios / 10 min
const REJECTION_LIMIT = 5;
const REJECTION_WINDOW_MS = 10 * 60 * 1000; // 5 rejeições / 10 min…
const BLOCK_DURATION_MS = 60 * 60 * 1000; // …bloqueiam o IP por 1 h

const submissionsByIp = new Map<string, number[]>();
const rejectionsByIp = new Map<string, number[]>();
const blockedIps = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return false;
}

function registerRejection(ip: string) {
  const now = Date.now();
  const recent = (rejectionsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < REJECTION_WINDOW_MS,
  );
  recent.push(now);
  rejectionsByIp.set(ip, recent);
  if (recent.length >= REJECTION_LIMIT) {
    blockedIps.set(ip, now + BLOCK_DURATION_MS);
  }
}

function isBlocked(ip: string): boolean {
  const until = blockedIps.get(ip);
  if (!until) return false;
  if (Date.now() > until) {
    blockedIps.delete(ip);
    return false;
  }
  return true;
}

/* ————— Validações ————— */

const NAME_FORBIDDEN_CHARS = /[<>{}[\]\\/;]/;
/* \b evita falso positivo em nomes legítimos (ex.: "Evaldo" contém "eval") */
const NAME_FORBIDDEN_WORDS =
  /\b(script|alert|select|drop|union|eval|onclick|onerror)\b/i;

const DISPOSABLE_DOMAINS = [
  "test.com",
  "example.com",
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
];

const INJECTION_PATTERNS = [
  "ignore previous",
  "ignore all",
  "reveal your",
  "system prompt",
  "you are now",
  "act as",
  "system:",
  "api key",
  "api_key",
  "secret key",
];

function hasInjectionPattern(text: string): boolean {
  const lowered = text.toLowerCase();
  return INJECTION_PATTERNS.some((pattern) => lowered.includes(pattern));
}

/** Remove quebras de linha de campos refletidos em headers/assunto. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/* ————— Logging estruturado de segurança ————— */

function logSecurity(reason: string, request: Request) {
  console.warn(
    JSON.stringify({
      type: "SECURITY",
      event: "blocked_submission",
      reason,
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
      ua: request.headers.get("user-agent") ?? "unknown",
      timestamp: new Date().toISOString(),
    }),
  );
}

function reject(
  request: Request,
  ip: string,
  reason: string,
  status: number,
  message: string,
) {
  registerRejection(ip);
  logSecurity(reason, request);
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";

  // Nível 2 do rate limit: IP com 5+ rejeições recentes fica 1 h bloqueado
  if (isBlocked(ip)) {
    logSecurity("ip_blocked", request);
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  // Bots de linha de comando não enviam formulários legítimos.
  // Ausência de User-Agent não bloqueia (proxies podem removê-lo).
  const userAgent = request.headers.get("user-agent");
  if (userAgent && /curl|wget|python-requests|scrapy|bot/i.test(userAgent)) {
    return reject(request, ip, "bot_ua", 403, "Acesso negado.");
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return reject(request, ip, "invalid_json", 400, "Requisição inválida.");
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  // Honeypot: bots preenchem o campo oculto — responde sucesso sem enviar
  // (200 falso de propósito: não ensina o bot que foi detectado)
  if (website !== "") {
    logSecurity("honeypot", request);
    return NextResponse.json({ ok: true });
  }

  /* — Limites de tamanho — */
  if (!name || name.length < 2) {
    return reject(request, ip, "invalid_input", 400, "Informe seu nome.");
  }
  if (name.length > 100 || email.length > 254 || phone.length > 20 || subject.length > 150) {
    return reject(request, ip, "invalid_input", 400, "Dados inválidos.");
  }
  if (!message || message.length < 20) {
    return reject(
      request,
      ip,
      "invalid_input",
      400,
      "A mensagem precisa ter pelo menos 20 caracteres.",
    );
  }
  if (message.length > 2000) {
    return reject(
      request,
      ip,
      "invalid_input",
      400,
      "A mensagem é muito longa (máximo de 2000 caracteres).",
    );
  }

  /* — Padrões maliciosos no nome (mensagem genérica: não calibrar atacante) — */
  if (NAME_FORBIDDEN_CHARS.test(name) || NAME_FORBIDDEN_WORDS.test(name)) {
    return reject(request, ip, "xss_pattern", 400, "Dados inválidos.");
  }

  /* — E-mail: formato + domínios descartáveis — */
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reject(request, ip, "invalid_input", 400, "Informe um e-mail válido.");
  }
  const emailDomain = email.split("@")[1]?.toLowerCase() ?? "";
  if (DISPOSABLE_DOMAINS.includes(emailDomain)) {
    return reject(request, ip, "disposable_email", 400, "Informe um e-mail válido.");
  }

  /* — Padrões de prompt injection na mensagem — */
  if (hasInjectionPattern(message) || hasInjectionPattern(name)) {
    return reject(request, ip, "prompt_injection", 400, "Dados inválidos.");
  }

  /* — Rate limit nível 1 — */
  if (isRateLimited(ip)) {
    return reject(
      request,
      ip,
      "rate_limit",
      429,
      "Muitos envios recentes. Tente novamente em alguns minutos.",
    );
  }

  const emailText = [
    `Nome: ${singleLine(name)}`,
    `E-mail: ${singleLine(email)}`,
    phone ? `Telefone/WhatsApp: ${singleLine(phone)}` : null,
    subject ? `Assunto: ${singleLine(subject)}` : null,
    "",
    "Mensagem:",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fallback de desenvolvimento: sem chave, apenas registra no servidor
    console.log("[contato] RESEND_API_KEY ausente — envio simulado:\n" + emailText);
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Requer domínio verificado no Resend (registros DNS no registro.br — §20.2)
      from: `Fluxus Tecnologia <${site.email}>`,
      to: site.email,
      replyTo: email,
      subject: `Novo contato pelo site — ${singleLine(subject) || "Outro"}`,
      html: buildContactEmailHtml({ name, email, phone, subject, message }),
      text: emailText,
    });
    if (error) {
      console.error("[contato] erro do Resend:", error);
      return NextResponse.json(
        { error: "Não foi possível enviar. Tente pelo WhatsApp." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contato] falha no envio:", err);
    return NextResponse.json(
      { error: "Não foi possível enviar. Tente pelo WhatsApp." },
      { status: 500 },
    );
  }
}
