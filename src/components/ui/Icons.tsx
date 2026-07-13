/**
 * Ícones SVG inline próprios — sem icon pack (docs/ARQUITETURA.md §4.2/§9.1).
 * Todos herdam a cor via currentColor e são decorativos por padrão
 * (aria-hidden); o texto acessível fica no elemento pai.
 */

interface IconProps {
  className?: string;
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* balão de conversa com "cauda" + fone simplificado */}
      <path d="M12 3a9 9 0 1 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
      <path d="M9 8.5c0 4 2.5 6.5 6.5 6.5l1-2-2.2-1.1-1.1.8c-1.2-.6-1.9-1.3-2.4-2.4l.8-1.1L10.5 7l-1.5 1.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
