import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes condicionalmente (clsx) e resolve conflitos de
 * utilitários Tailwind (twMerge) — docs/ARQUITETURA.md §4.1.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
