import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Financial Guides & Articles",
  description: "In-depth financial guides with real examples, comparison tables, and actionable strategies for mortgages, savings, investing, and debt payoff.",
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export default function GuidesIndexPage() {
  const published = guides.filter((g) => g.published);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-6 pt-10 sm:px-6">
      <header className="border-b border-ink-200 pb-8">
        <p className="eyebrow">{published.length} guides</p>
        <h1 className="mt-3 text-[2.25rem] font-semibold text-ink-900 sm:text-[2.875rem]">
          Financial Guides
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600">
          In-depth articles with real numbers, case studies, and strategies to help you make smarter
          financial decisions. Figures are dated and linked to their sources.
        </p>
      </header>

      <ol className="divide-y divide-ink-200">
        {published.map((guide, i) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start"
            >
              <span className="numeral hidden pt-1 text-2xl font-semibold text-gold-500 sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-[1.375rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700 sm:text-[1.5rem]">
                  {guide.title}
                </h2>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink-600">{guide.description}</p>
              </div>
              <div className="flex items-center gap-4 text-[0.8125rem] text-ink-500 sm:flex-col sm:items-end sm:gap-1 sm:pt-1.5">
                <span>Updated {dateFormat.format(new Date(guide.lastUpdated))}</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700 group-hover:text-brand-900">
                  Read
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
