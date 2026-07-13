import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>
      <Link href="/" className="text-brand-500 underline underline-offset-4">
        Voltar para a home
      </Link>
    </main>
  );
}
