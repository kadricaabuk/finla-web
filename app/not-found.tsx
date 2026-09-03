import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı - finla",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-5 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-4xl sm:text-5xl">Sayfa bulunamadı</h1>
      <p className="mt-4 max-w-md text-muted">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
      >
        Ana sayfaya dön
      </Link>
    </main>
  );
}
