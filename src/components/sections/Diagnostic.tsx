"use client";

import { useState } from "react";
import { diagnosticOptions, type DiagnosticOption } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  CogIcon,
  CompassIcon,
  GlobeIcon,
  LayersIcon,
  LightbulbIcon,
  MessageIcon,
} from "@/components/ui/Icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";

const icons: Record<DiagnosticOption["icon"], React.ComponentType<{ className?: string }>> = {
  globe: GlobeIcon,
  cog: CogIcon,
  layers: LayersIcon,
  message: MessageIcon,
  lightbulb: LightbulbIcon,
  compass: CompassIcon,
};

/**
 * Diagnóstico interativo: o visitante escolhe a situação que mais se parece
 * com a dele e recebe uma orientação curta + CTA contextual (o assunto vai
 * por query param e pré-seleciona o formulário de contato).
 * Botões com aria-pressed (toggle) em vez de radiogroup: preserva a
 * navegação por Tab + Enter/Space pedida, sem impor o padrão de setas do
 * ARIA radio.
 */
export function Diagnostic() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = diagnosticOptions.find((option) => option.id === selectedId);

  return (
    <SectionWrapper id="diagnostico" className="bg-ink-950">
      <Container>
        <ScrollReveal className="max-w-2xl">
          <h2>Não sabe por onde começar?</h2>
          <p className="mt-4">Escolha o que mais se parece com a sua situação.</p>
        </ScrollReveal>

        <div
          role="group"
          aria-label="Qual é a sua situação?"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {diagnosticOptions.map((option, index) => {
            const Icon = icons[option.icon];
            const isSelected = option.id === selectedId;
            return (
              <ScrollReveal key={option.id} delay={index * 80}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() =>
                    setSelectedId((current) => (current === option.id ? null : option.id))
                  }
                  className={cn(
                    "card-orbit relative flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left",
                    "transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                    isSelected
                      ? "card-orbit-active border-brand-500 bg-ink-800"
                      : "border-ink-700 bg-ink-900 hover:scale-[1.02] hover:border-brand-500",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-6 shrink-0 transition-base",
                      isSelected ? "text-brand-500" : "text-text-tertiary",
                    )}
                  />
                  <span className="text-sm font-medium text-text-primary">
                    {option.label}
                  </span>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Resposta contextual — container aria-live permanece montado */}
        <div aria-live="polite" className="mt-8 min-h-4">
          {selected && (
            <div
              key={selected.id}
              className="animate-diag-in flex flex-col gap-6 rounded-xl border border-line bg-ink-900 p-7 sm:flex-row sm:items-center sm:justify-between lg:p-9"
            >
              <p className="max-w-2xl">{selected.response}</p>
              <div className="shrink-0">
                <Button href={`/contato?assunto=${selected.id}`} size="lg">
                  {selected.cta}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  );
}
