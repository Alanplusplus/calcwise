import Link from "next/link";
import { categories, getCalculatorsByCategory } from "@/lib/calculators";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${site.name} – Free Online Financial Calculators`,
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Smart Financial Calculators
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            Free, accurate tools to help you plan your mortgage, grow your
            savings, pay off debt, and make confident financial decisions.
          </p>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {categories.map((category) => {
          const calcs = getCalculatorsByCategory(category.slug);
          return (
            <div key={category.slug} id={category.slug} className="mb-12">
              <h2 className="text-2xl font-bold text-ink-900">
                {category.name}
              </h2>
              <p className="mt-1 text-ink-500">{category.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {calcs.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    className="group rounded-xl border border-ink-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{calc.icon}</span>
                      <div>
                        <h3 className="font-semibold text-ink-800 group-hover:text-brand-600">
                          {calc.shortTitle}
                        </h3>
                        <p className="mt-1 text-sm text-ink-500 line-clamp-2">
                          {calc.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Trust/Value Section */}
      <section className="border-t border-ink-200 bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Why Use CalcWise?
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-xl">
                🎯
              </div>
              <h3 className="mt-3 font-semibold text-ink-800">Accurate Results</h3>
              <p className="mt-1 text-sm text-ink-500">
                Our calculators use industry-standard formulas reviewed by
                financial professionals.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-xl">
                🔒
              </div>
              <h3 className="mt-3 font-semibold text-ink-800">100% Private</h3>
              <p className="mt-1 text-sm text-ink-500">
                All calculations run in your browser. We never store or transmit
                your financial data.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-xl">
                ⚡
              </div>
              <h3 className="mt-3 font-semibold text-ink-800">Free Forever</h3>
              <p className="mt-1 text-sm text-ink-500">
                No signup, no hidden fees. Use any calculator as many times as
                you need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
