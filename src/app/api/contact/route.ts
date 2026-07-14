import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { buildContactEmailHtml } from "@/lib/email-template";

/**
 * Envio do formulário de contato (docs/ARQUITETURA.md §12):
 * validação server-side independente, honeypot, rate limit em memória e
 * envio via Resend. Sem RESEND_API_KEY (dev), simula sucesso e loga.
 */

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hora

const submissionsByIp = new Map<string, number[]>();

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

/** Remove quebras de linha de campos refletidos em headers/assunto. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  // Honeypot: bots preenchem o campo oculto — responde sucesso sem enviar
  if (website !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Informe seu nome." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }
  if (!message || message.length < 20) {
    return NextResponse.json(
      { error: "A mensagem precisa ter pelo menos 20 caracteres." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitos envios recentes. Tente novamente em uma hora." },
      { status: 429 },
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
