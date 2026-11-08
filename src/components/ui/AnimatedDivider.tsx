/**
 * Separador decorativo entre seções: linha escura fina de largura total
 * com um traço de luz dourada (gradiente transparente → dourado →
 * transparente) percorrendo da esquerda para a direita em loop.
 * CSS puro (Server Component). prefers-reduced-motion: animação pausada
 * no 0% — o traço fica fora da tela e resta a linha estática.
 */
export function AnimatedDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative h-px w-full overflow-hidden bg-ink-800"
    >
      <div className="animate-shimmer-line absolute inset-y-0 left-0 w-[150px] bg-[linear-gradient(to_right,transparent,#F5A623,transparent)]" />
    </div>
  );
}
