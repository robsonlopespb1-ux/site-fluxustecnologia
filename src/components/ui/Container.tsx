import { cn } from "@/lib/cn";

/**
 * Wrapper de largura máxima (80rem/1280px — §8.3) com padding lateral responsivo.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
