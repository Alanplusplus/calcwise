import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCalculatorsByCategory } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorCard } from "@/components/CalculatorCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} Calculators`,
    description: `Free ${category.name.toLowerCase()} calculators: ${category.description}`,
    openGraph: {
      title: `${category.name} Calculators | ${site.name}`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const calcs = getCalculatorsByCategory(slug);
  const others = categories.filter((c) => c.slug !== slug);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-6 pt-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-7 text-[0.8125rem] text-ink-500">
        <Link href="/" className="transition-colors hover:text-brand-700">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2 text-ink-300">
          /
        </span>
        <span aria-current="page" className="text-ink-800">
          {category.name}
        </span>
      </nav>

      <header className="border-b border-ink-200 pb-8">
        <p className="eyebrow">{calcs.length} calculators</p>
        <h1 className="mt-3 text-[2.25rem] font-semibold text-ink-900 sm:text-[2.875rem]">
          {category.name} Calculators
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600">{category.description}</p>
      </header>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calcs.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} heading="h2" />
        ))}
      </div>

      <nav aria-label="Other categories" className="mt-14 border-t border-ink-200 pt-6">
        <p className="eyebrow">Explore other categories</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/calculators/category/${c.slug}`}
              className="rounded-full border border-ink-300 bg-white px-4 py-1.5 text-sm text-ink-700 transition-colors hover:border-brand-700 hover:bg-brand-800 hover:text-white"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
