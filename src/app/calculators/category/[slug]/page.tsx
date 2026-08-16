import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCalculatorsByCategory } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CategoryIcon } from "@/components/Icons";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{category.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
        {category.name} Calculators
      </h1>
      <p className="mt-2 text-lg text-ink-600">{category.description}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {calcs.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="group rounded-xl border border-ink-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <CategoryIcon name={calc.slug} />
              </div>
              <div>
                <h2 className="font-semibold text-ink-800 group-hover:text-brand-600">
                  {calc.shortTitle}
                </h2>
                <p className="mt-1 text-sm text-ink-500">
                  {calc.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
