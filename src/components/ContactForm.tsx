"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "sending" | "success" | "error";

const SUBJECT_OPTIONS = [
  "Site institucional",
  "Sistema web",
  "Inteligência Artificial",
  "Consultoria",
  "Outro",
];

const inputClasses =
  "w-full rounded-lg border border-paper-line bg-white px-4 py-3 text-sm text-ink-900 " +
  "placeholder:text-[#8c8c8c] transition-base focus:border-brand-500 focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          typeof result.error === "string"
            ? result.error
            : "Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.",
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Falha de conexão. Tente novamente ou fale pelo WhatsApp.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
            Nome *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className={inputClasses}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
            E-mail *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClasses}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">
            Telefone/WhatsApp
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium">
            Assunto
          </label>
          <select id="contact-subject" name="subject" className={inputClasses}>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
            Mensagem *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={20}
            rows={5}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Honeypot anti-spam — invisível para pessoas, preenchido por bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Não preencha este campo</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex h-12 items-center justify-center rounded-lg bg-brand-500 px-7",
            "text-base font-semibold text-ink-950 transition-base hover:bg-brand-600",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700",
            "disabled:pointer-events-none disabled:opacity-60",
            "w-full sm:w-auto",
          )}
        >
          {status === "sending" ? "Enviando…" : "Enviar mensagem"}
        </button>
      </div>

      <p className="mt-3 text-xs text-[#6b6b6b]">
        Ao enviar, você concorda com nossa{" "}
        <a
          href="/politica-de-privacidade"
          className="underline underline-offset-2 transition-base hover:text-ink-900"
        >
          Política de Privacidade
        </a>
        .
      </p>

      {/* Resultado anunciado a leitores de tela */}
      <div aria-live="polite" className="mt-4 min-h-6">
        {status === "success" && (
          <p className="text-sm font-medium text-[#15803d]">
            Mensagem enviada! Respondemos em até 24 horas.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-[#b91c1c]">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
