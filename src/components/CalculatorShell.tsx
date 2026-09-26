import Link from "next/link";
import { calculators } from "@/lib/calculators";
import { guides, getGuidesBySlug } from "@/lib/guides";
import { CategoryIcon } from "./Icons";
import { BreadcrumbJsonLd } from "./BreadcrumbJsonLd";
import { WebApplicationJsonLd } from "./WebApplicationJsonLd";
import { ArticleJsonLd } from "./ArticleJsonLd";
import type { Calculator } from "@/lib/calculators";
import type { CalculatorVariant } from "@/lib/variants/types";

interface Props {
  calculator: Calculator;
  children: React.ReactNode;
  article?: React.ReactNode;
  variants?: CalculatorVariant[];
}

export function CalculatorShell({ calculator, children, article, variants }: Props) {
  const related = calculator.relatedCalculators
    ? calculators.filter((c) => calculator.relatedCalculators!.includes(c.slug))
    : calculators
        .filter((c) => c.slug !== calculator.slug && c.category === calculator.category)
        .slice(0, 4);

  const relatedGuides = calculator.relatedGuides
    ? getGuidesBySlug(calculator.relatedGuides)
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1), href: `/calculators/category/${calculator.category}` },
          { name: calculator.shortTitle, href: `/calculators/${calculator.slug}` },
        ]}
      />
      <WebApplicationJsonLd
        name={calculator.title}
        description={calculator.description}
        slug={calculator.slug}
      />
      <ArticleJsonLd
        title={calculator.title}
        description={calculator.description}
        slug={calculator.slug}
        datePublished={calculator.datePublished}
        dateModified={calculator.lastUpdated}
        urlPrefix="/calculators"
      />
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/calculators/category/${calculator.category}`} className="hover:text-brand-600">
          {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{calculator.shortTitle}</span>
      </nav>

      {/* Title */}
      <div className="mb-8 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <CategoryIcon name={calculator.slug} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
            {calculator.title}
          </h1>
          <p className="mt-2 text-lg text-ink-600">{calculator.description}</p>
        </div>
      </div>

      {/* Calculator Widget */}
      <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
        {children}
      </div>

      {/* Popular Scenarios (variant links) */}
      {variants && variants.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-ink-900">Popular Scenarios</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {variants.map((v) => (
              <Link
                key={v.slug}
                href={`/calculators/${calculator.slug}/${v.slug}`}
                className="rounded-md border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                {v.title}
              </Link>
            ))}
          </div>
        </section>
      )}

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
              className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white p-4 transition-shadow hover:shadow-card-hover"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                <CategoryIcon name={c.slug} className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-ink-800">
                {c.shortTitle}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Helpful Articles (Related Guides) */}
      {relatedGuides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-ink-900">Helpful Articles</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group rounded-lg border border-ink-200 bg-white p-5 transition-shadow hover:shadow-card-hover"
              >
                <h3 className="text-sm font-semibold text-ink-800 group-hover:text-brand-600">
                  {g.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-ink-500">
                  {g.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
