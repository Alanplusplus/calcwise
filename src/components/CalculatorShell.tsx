import Link from "next/link";
import { calculators, categories } from "@/lib/calculators";
import { getGuidesBySlug } from "@/lib/guides";
import { isEmbeddable } from "@/lib/embeds";
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

const updatedFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function CalculatorShell({ calculator, children, article, variants }: Props) {
  const related = calculator.relatedCalculators
    ? calculators.filter((c) => calculator.relatedCalculators!.includes(c.slug))
    : calculators
        .filter((c) => c.slug !== calculator.slug && c.category === calculator.category)
        .slice(0, 4);

  const relatedGuides = calculator.relatedGuides
    ? getGuidesBySlug(calculator.relatedGuides)
    : [];

  const categoryName =
    categories.find((c) => c.slug === calculator.category)?.name ??
    calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-6">
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
      <nav aria-label="Breadcrumb" className="mb-7 text-[0.8125rem] text-ink-500">
        <Link href="/" className="transition-colors hover:text-brand-700">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2 text-ink-300">
          /
        </span>
        <Link
          href={`/calculators/category/${calculator.category}`}
          className="transition-colors hover:text-brand-700"
        >
          {categoryName}
        </Link>
        <span aria-hidden="true" className="mx-2 text-ink-300">
          /
        </span>
        <span aria-current="page" className="text-ink-800">
          {calculator.shortTitle}
        </span>
      </nav>

      {/* Title */}
      <header className="mb-9 max-w-3xl">
        <p className="eyebrow flex items-center gap-2.5">
          <CategoryIcon name={calculator.slug} className="h-4 w-4" />
          {categoryName}
        </p>
        <h1 className="mt-3 text-[2.25rem] font-semibold text-ink-900 sm:text-[2.875rem]">
          {calculator.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-600">{calculator.description}</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.8125rem] text-ink-500">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
            Updated {updatedFormat.format(new Date(calculator.lastUpdated))}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
            Runs in your browser
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
            Free, no signup
          </li>
        </ul>
      </header>

      {/* Calculator Widget */}
      <div className="calc-widget rounded-xl border border-ink-200 border-t-[3px] border-t-brand-800 bg-white p-6 shadow-card sm:p-9">
        {children}
      </div>

      {isEmbeddable(calculator.slug) && (
        <p className="mt-4 text-sm text-ink-500">
          Want this calculator on your own site?{" "}
          <Link
            href={`/embed#${calculator.slug}`}
            className="font-semibold text-brand-700 underline decoration-gold-400 decoration-[1.5px] underline-offset-4 hover:text-brand-900"
          >
            Embed it for free
          </Link>
          .
        </p>
      )}

      {/* Popular Scenarios (variant links) */}
      {variants && variants.length > 0 && (
        <section className="mt-10">
          <h2 className="eyebrow font-sans">Popular scenarios</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {variants.map((v) => (
              <Link
                key={v.slug}
                href={`/calculators/${calculator.slug}/${v.slug}`}
                className="rounded-full border border-ink-300 bg-white px-4 py-1.5 text-sm text-ink-700 transition-colors hover:border-brand-700 hover:bg-brand-800 hover:text-white"
              >
                {v.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Article Content */}
      {article && (
        <article className="prose mx-auto mt-16 max-w-3xl">{article}</article>
      )}

      {/* Related Calculators */}
      <section className="mt-16">
        <div className="border-b border-ink-200 pb-4">
          <p className="eyebrow">Keep going</p>
          <h2 className="mt-1.5 text-[1.5rem] font-semibold text-ink-900">Related calculators</h2>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/calculators/${c.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-ink-200 bg-white p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-100 bg-brand-50 text-brand-700 transition-colors group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-gold-200">
                <CategoryIcon name={c.slug} className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-ink-800">{c.shortTitle}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Helpful Articles (Related Guides) */}
      {relatedGuides.length > 0 && (
        <section className="mt-16">
          <div className="border-b border-ink-200 pb-4">
            <p className="eyebrow">Read next</p>
            <h2 className="mt-1.5 text-[1.5rem] font-semibold text-ink-900">Helpful articles</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group rounded-lg border border-ink-200 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <h3 className="font-serif text-[1.0625rem] font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
                  {g.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-500">
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
