import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCalculator, calculators } from "@/lib/calculators";
import { getGuidesBySlug } from "@/lib/guides";
import { site } from "@/lib/site";
import { CreditCardPayoffCalculator } from "../CreditCardPayoffCalculator";
import { creditCardPayoffVariants } from "@/lib/variants/credit-card-payoff";
import { CategoryIcon } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { WebApplicationJsonLd } from "@/components/WebApplicationJsonLd";

interface Props {
  params: Promise<{ variant: string }>;
}

export async function generateStaticParams() {
  return creditCardPayoffVariants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variant: slug } = await params;
  const variant = creditCardPayoffVariants.find((v) => v.slug === slug);
  if (!variant) return {};
  return {
    title: variant.title,
    description: variant.description,
    openGraph: { title: `${variant.title} | ${site.name}`, description: variant.description },
  };
}

export default async function VariantPage({ params }: Props) {
  const { variant: slug } = await params;
  const variant = creditCardPayoffVariants.find((v) => v.slug === slug);
  if (!variant) notFound();
  const calc = getCalculator("credit-card-payoff")!;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Debt", href: "/calculators/category/debt" },
          { name: calc.shortTitle, href: `/calculators/${calc.slug}` },
          { name: variant.title, href: `/calculators/${calc.slug}/${slug}` },
        ]}
      />
      <WebApplicationJsonLd
        name={variant.title}
        description={variant.description}
        slug={`${calc.slug}/${slug}`}
      />
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/calculators/${calc.slug}`} className="hover:text-brand-600">{calc.shortTitle}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{variant.title}</span>
      </nav>

      <div className="mb-8 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <CategoryIcon name={calc.slug} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ink-900">{variant.title}</h1>
          <p className="mt-2 text-lg text-ink-600">{variant.description}</p>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-brand-200 bg-brand-50 p-4">
        <p className="text-ink-700">{variant.intro}</p>
      </div>

      <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
        <CreditCardPayoffCalculator defaults={variant.defaults} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-ink-900">Key Considerations</h2>
        <ul className="mt-4 space-y-3">
          {variant.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span className="text-ink-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related variants */}
      <div className="mt-8 border-t border-ink-200 pt-6">
        <p className="text-sm font-medium text-ink-600">See also:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {creditCardPayoffVariants.filter((v) => v.slug !== slug).slice(0, 4).map((v) => (
            <Link key={v.slug} href={`/calculators/credit-card-payoff/${v.slug}`}
              className="rounded-md border border-ink-200 px-3 py-1.5 text-sm text-ink-600 hover:border-brand-300 hover:text-brand-600">
              {v.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Related Calculators */}
      {calc.relatedCalculators && calc.relatedCalculators.length > 0 && (
        <div className="mt-8 border-t border-ink-200 pt-6">
          <p className="text-sm font-medium text-ink-600">Related Tools:</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {calculators.filter((c) => calc.relatedCalculators!.includes(c.slug)).map((c) => (
              <Link key={c.slug} href={`/calculators/${c.slug}`}
                className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white p-3 text-sm text-ink-700 hover:border-brand-300 hover:text-brand-600">
                <CategoryIcon name={c.slug} className="h-4 w-4 shrink-0 text-brand-500" />
                {c.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Guides */}
      {calc.relatedGuides && calc.relatedGuides.length > 0 && (() => {
        const guides = getGuidesBySlug(calc.relatedGuides!);
        return guides.length > 0 ? (
          <div className="mt-6 border-t border-ink-200 pt-6">
            <p className="text-sm font-medium text-ink-600">Learn More:</p>
            <ul className="mt-2 space-y-2">
              {guides.slice(0, 2).map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="text-sm text-brand-600 hover:text-brand-800 font-medium">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null;
      })()}

      <div className="mt-6">
        <Link href={`/calculators/${calc.slug}`} className="text-sm font-medium text-brand-600 hover:text-brand-800">
          &larr; Back to {calc.title}
        </Link>
      </div>
    </div>
  );
}
