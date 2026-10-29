import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { reports } from "@/lib/reports";
import { site } from "@/lib/site";

const title = "Data Reports: State-Level Money Research";
const description = `Original ${site.name} reports built from public Census Bureau and Freddie Mac data, with the method, the sources, and a downloadable dataset for each.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "website",
  },
};

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-6 pt-8 sm:px-6">
      <BreadcrumbJsonLd items={[{ name: "Data Reports", href: "/reports" }]} />

      <nav aria-label="Breadcrumb" className="mb-7 text-[0.8125rem] text-ink-500">
        <Link href="/" className="transition-colors hover:text-brand-700">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2 text-ink-300">
          /
        </span>
        <span aria-current="page" className="text-ink-800">
          Data Reports
        </span>
      </nav>

      <header className="border-b border-ink-200 pb-8">
        <p className="eyebrow">Original research</p>
        <h1 className="mt-3 text-[2.25rem] font-semibold text-ink-900 sm:text-[2.875rem]">
          Data Reports
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600">
          Each report starts from a public dataset, applies the same formulas as our calculators,
          and publishes the result for every state. Inputs, assumptions, and limits are written
          out, and the full table is free to download, so anyone can check the work.
        </p>
      </header>

      <div className="mt-9 space-y-5">
        {reports.map((report) => (
          <Link
            key={report.slug}
            href={report.path}
            className="group block rounded-xl border border-ink-200 border-l-[3px] border-l-gold-500 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover sm:p-8"
          >
            <p className="eyebrow">Updated {monthYear.format(new Date(report.dateModified))}</p>
            <h2 className="mt-2 text-[1.625rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
              {report.title}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">{report.description}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-4 text-[0.8125rem]">
              <span className="text-ink-500">Data: {report.dataSource}</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
                Read the report
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-600">
        Every report follows the standards on our{" "}
        <Link href="/methodology" className="font-medium text-brand-700 underline decoration-gold-400 decoration-[1.5px] underline-offset-[3px]">
          methodology page
        </Link>
        : primary sources, a stated check date, and plain-language limits. To use a figure in your
        own work, see the citation and license note at the end of each report.
      </p>
    </div>
  );
}
