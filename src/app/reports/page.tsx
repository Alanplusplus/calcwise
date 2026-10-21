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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <BreadcrumbJsonLd items={[{ name: "Data Reports", href: "/reports" }]} />

      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Data Reports</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900">Data Reports</h1>
      <p className="mt-3 text-lg text-ink-600">
        Each report starts from a public dataset, applies the same formulas as our calculators,
        and publishes the result for every state. Inputs, assumptions, and limits are written
        out, and the full table is free to download, so anyone can check the work.
      </p>

      <div className="mt-8 space-y-4">
        {reports.map((report) => (
          <Link
            key={report.slug}
            href={report.path}
            className="block rounded-xl border border-ink-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
              Updated {monthYear.format(new Date(report.dateModified))}
            </p>
            <h2 className="mt-1 text-xl font-bold text-ink-900">{report.title}</h2>
            <p className="mt-2 text-sm text-ink-600">{report.description}</p>
            <p className="mt-3 text-xs text-ink-500">Data: {report.dataSource}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-600">
        Every report follows the standards on our{" "}
        <Link href="/methodology" className="text-brand-600 underline">
          methodology page
        </Link>
        : primary sources, a stated check date, and plain-language limits. To use a figure in
        your own work, see the citation and license note at the end of each report.
      </p>
    </div>
  );
}
