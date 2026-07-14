import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "default" | "lg";

const baseClasses =
  "inline-flex items-center justify-center rounded-lg font-semibold transition-base " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 " +
  "disabled:pointer-events-none disabled:opacity-50";

/* Texto sempre escuro sobre amarelo — WCAG (§8.1/§14.3) */
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-ink-950 hover:bg-brand-600",
  outline: "border border-brand-500 text-text-primary hover:bg-brand-500/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Com href renderiza <Link>; sem href, <button>. */
  href?: string;
  /** Link externo: <a> com target="_blank" e rel seguro. */
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "default",
  href,
  external = false,
  type = "button",
  disabled,
  onClick,
  className,
  children,
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
        <span className="sr-only">(abre em nova aba)</span>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
