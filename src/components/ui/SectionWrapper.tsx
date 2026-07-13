import { cn } from "@/lib/cn";

/**
 * Seção com padding vertical consistente (§8.3).
 * scroll-mt compensa o header sticky em navegação por âncora.
 */
export function SectionWrapper({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("section-padding scroll-mt-20", className)}>
      {children}
    </section>
  );
}
