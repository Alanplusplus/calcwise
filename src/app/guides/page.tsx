import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Financial Guides & Articles",
  description: "In-depth financial guides with real examples, comparison tables, and actionable strategies for mortgages, savings, investing, and debt payoff.",
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
        Financial Guides
      </h1>
      <p className="mt-2 text-lg text-ink-600">
        In-depth articles with real numbers, case studies, and actionable
        strategies to help you make smarter financial decisions.
      </p>

      <div className="mt-10 space-y-6">
        {guides.filter((g) => g.published).map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group block rounded-xl border border-ink-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <h2 className="text-xl font-semibold text-ink-900 group-hover:text-brand-600">
              {guide.title}
            </h2>
            <p className="mt-2 text-ink-600">{guide.description}</p>
            <p className="mt-3 text-sm font-medium text-brand-600">
              Read guide &rarr;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
