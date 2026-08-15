import Link from "next/link";
import { calculators } from "@/lib/calculators";
import type { Calculator } from "@/lib/calculators";

interface Props {
  calculator: Calculator;
  children: React.ReactNode;
  article?: React.ReactNode;
}

export function CalculatorShell({ calculator, children, article }: Props) {
  const related = calculators
    .filter((c) => c.slug !== calculator.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{calculator.title}</span>
      </nav>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
          {calculator.icon} {calculator.title}
        </h1>
        <p className="mt-2 text-lg text-ink-600">{calculator.description}</p>
      </div>

      {/* Calculator Widget */}
      <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
        {children}
      </div>

      {/* Article Content */}
      {article && (
        <article className="prose mt-12 max-w-none">{article}</article>
      )}

      {/* Related Calculators */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink-900">Related Calculators</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/calculators/${c.slug}`}
              className="rounded-lg border border-ink-200 bg-white p-4 transition-shadow hover:shadow-card-hover"
            >
              <span className="text-lg">{c.icon}</span>
              <h3 className="mt-1 text-sm font-semibold text-ink-800">
                {c.shortTitle}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
