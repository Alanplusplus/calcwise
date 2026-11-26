import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { DICTIONARIES } from "@/lib/reports/dictionary";
import { csvFilename } from "@/lib/reports/csv";
import { PILOT_STATES } from "@/lib/reports/pilot-states";
import { ACS_YEARS, CHANGELOG, PINNED_RATES, PRESS_ROWS } from "@/lib/reports/press";
import { getStateProfile, keyFigureFor } from "@/lib/reports/state-metrics";
import { site } from "@/lib/site";

const PATH = "/reports/press";
const title = "Data for Journalists: Cite State Reports and CSVs";
const description = `${PRESS_ROWS.length} state reports built from Census Bureau data: key figures, ready-made citations, CC BY 4.0 license, CSV data dictionaries, limits, and a change log.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "website",
    url: `${site.url}${PATH}`,
  },
};

const longDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const date = (iso: string) => longDate.format(new Date(iso));

const EMAIL = "hello@calcwise.tools";
const CC_BY = "https://creativecommons.org/licenses/by/4.0/";

const acsYear = ACS_YEARS.length === 1 ? ACS_YEARS[0] : null;
const dictionaries = new Map(DICTIONARIES.map((d) => [d.slug, d]));
const stateNames = PILOT_STATES.map((s) => {
  const profile = getStateProfile(s.slug);
  if (!profile) throw new Error(`No profile for ${s.slug}`);
  return { slug: s.slug, name: profile.name };
});

const linkClass =
  "font-medium text-brand-700 underline decoration-gold-400 decoration-[1.5px] underline-offset-[3px]";

const sections = [
  { id: "reports", label: "Reports" },
  { id: "cite", label: "Citations" },
  { id: "license", label: "License" },
  { id: "limits", label: "Limits" },
  { id: "dictionary", label: "Data dictionary" },
  { id: "states", label: "State pages" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PressPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 pt-8 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Press and data access", href: PATH },
        ]}
      />

      <nav aria-label="Breadcrumb" className="mb-7 text-[0.8125rem] text-ink-500">
        <Link href="/" className="transition-colors hover:text-brand-700">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2 text-ink-300">
          /
        </span>
        <Link href="/reports" className="transition-colors hover:text-brand-700">
          Data Reports
        </Link>
        <span aria-hidden="true" className="mx-2 text-ink-300">
          /
        </span>
        <span aria-current="page" className="text-ink-800">
          Press and data access
        </span>
      </nav>

      <header className="border-b border-ink-200 pb-8">
        <p className="eyebrow">For journalists, bloggers, and editors</p>
        <h1 className="mt-3 text-[2.25rem] font-semibold text-ink-900 sm:text-[2.875rem]">
          Data for Reporters and Writers
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600">
          {`${PRESS_ROWS.length} state-level reports, each with every state and DC, a downloadable CSV, and a stated source`}
          {acsYear ? ` (the ${acsYear} American Community Survey)` : ""}
          {". This page answers the three questions an editor asks first, then lists the figures, the citation to paste, the limits, and every column in every file."}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="eyebrow">Can I use it?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Yes. The figures {site.name} calculates are licensed under{" "}
              <a href={CC_BY} target="_blank" rel="noopener noreferrer" className={linkClass}>
                CC BY 4.0
              </a>
              : copy, chart, and republish them, including commercially, with a link back to the report page.{" "}
              <a href="#license" className={linkClass}>
                License details
              </a>
            </p>
          </div>
          <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="eyebrow">How do I cite it?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Copy the line under the report you used. It carries the title, the year, the link, and the
              Census tables.{" "}
              <a href="#cite" className={linkClass}>
                Ready-made citations
              </a>
            </p>
          </div>
          <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="eyebrow">Who do I contact?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              {site.founder.name} runs {site.name}. Email{" "}
              <a href={`mailto:${EMAIL}`} className={linkClass}>
                {EMAIL}
              </a>
              .{" "}
              <a href="#contact" className={linkClass}>
                Contact details
              </a>
            </p>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem]">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-ink-600 transition-colors hover:text-brand-700">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <section id="reports" className="mt-10 scroll-mt-20">
        <h2 className="text-xl font-bold text-ink-900">{`The ${PRESS_ROWS.length} reports at a glance`}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
          The key number is the national figure from the report. Every number on this page is read from the
          same data files that build the report pages and the CSVs.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
          <table className="w-full min-w-[56rem] table-fixed text-sm">
            <colgroup>
              <col className="w-[29%]" />
              <col className="w-[20%]" />
              <col className="w-[21%]" />
              <col className="w-[13%]" />
              <col className="w-[17%]" />
            </colgroup>
            <thead className="bg-paper-2 text-[0.6875rem] uppercase tracking-[0.07em] text-ink-600">
              <tr className="border-b-2 border-brand-800">
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Report
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Key number
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Source and year
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Published and modified
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Links
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 align-top">
              {PRESS_ROWS.map((row) => {
                const key = keyFigureFor(row.slug);
                return (
                  <tr key={row.slug} className="transition-colors hover:bg-gold-50">
                    <td className="px-3 py-3">
                      <Link href={row.path} className="font-semibold text-ink-900 hover:text-brand-700">
                        {row.title}
                      </Link>
                      <p className="mt-1 text-xs leading-relaxed text-ink-600">{row.summary}</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-lg font-semibold text-ink-900">{key.us}</p>
                      <p className="mt-0.5 text-xs leading-snug text-ink-600">
                        {`${key.label}, United States`}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-ink-500">
                        {`Highest ${key.highest}. Lowest ${key.lowest}.`}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-xs leading-relaxed text-ink-700">
                      <p>{`U.S. Census Bureau, ${row.acsYear} ACS 1-year estimates`}</p>
                      <p className="mt-0.5 text-ink-500">{`Tables ${row.tables}`}</p>
                      {row.extraSource ? <p className="mt-0.5 text-ink-500">{row.extraSource}</p> : null}
                    </td>
                    <td className="px-3 py-3 text-xs leading-relaxed text-ink-700">
                      <p>{`Published ${date(row.datePublished)}`}</p>
                      <p className="text-ink-500">{`Modified ${date(row.dateModified)}`}</p>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      <p>
                        <Link href={row.path} className={linkClass}>
                          Report
                        </Link>
                      </p>
                      <p className="mt-1">
                        <a href={row.csvPath} className={linkClass}>
                          CSV
                        </a>
                      </p>
                      <p className="mt-1 break-all text-[0.6875rem] text-ink-500">{csvFilename(row)}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="cite" className="mt-12 scroll-mt-20">
        <h2 className="text-xl font-bold text-ink-900">Ready-made citations</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
          Each line is built from the report's own metadata and is identical to the citation printed at the end
          of that report. Click a line to select it, then copy.
        </p>
        <div className="mt-4 space-y-4">
          {PRESS_ROWS.map((row) => (
            <div key={row.slug}>
              <h3 className="text-sm font-semibold text-ink-900">{row.title}</h3>
              <p className="mt-1.5 cursor-pointer select-all rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-700">
                {row.citation}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="license" className="mt-12 scroll-mt-20 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">License and reuse</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          The figures calculated by {site.name} (shares, ratios, margins of error, rankings) are licensed under{" "}
          <a href={CC_BY} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
            CC BY 4.0
          </a>
          : you may copy, chart, and republish them, including commercially, with a link back to the report
          page. The Census Bureau inputs are public domain.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          The same notice is printed at the end of each report, under “Cite or reuse this report”, next to the
          citation line.
        </p>
      </section>

      <section id="limits" className="mt-12 scroll-mt-20">
        <h2 className="text-xl font-bold text-ink-900">What the data cannot tell you</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-ink-700">
          <li>
            <strong>ACS figures are estimates with margins of error.</strong>{" "}
            The American Community Survey is a sample survey. The margins of error in the reports are the 90%
            margins published by the Census Bureau; those for shares, ratios, and sums follow the ACS General
            Handbook (chapter 8) and are in the CSV, in the columns whose names contain moe90. A state whose margin
            overlaps its neighbor's is not reliably above it.
          </li>
          <li>
            <strong>The insurance premium median is an estimate inside brackets.</strong>{" "}
            The Census Bureau publishes insurance premiums in brackets and no median, so the homeowners insurance
            report finds the bracket that holds the middle household and places the median inside it in
            proportion, rounded to the nearest $10. The true median can sit anywhere in its bracket, so an
            estimate can be off by up to half a bracket width, which is $250 for brackets above $1,000. The shares
            paying $2,000 or $3,000 or more are published counts and do not have this limit.
          </li>
          <li>
            <strong>Each payment-based report pins the mortgage rate to one week.</strong>{" "}
            The rate is the Freddie Mac 30-year average of that week. The report page is the authority for its own
            rate and date:
            <ul className="mt-2 list-[circle] space-y-1 pl-5 text-ink-600">
              {PINNED_RATES.map((p) => (
                <li key={p.slug}>
                  <Link href={p.path} className={linkClass}>
                    {p.title}
                  </Link>
                  {`: ${p.rate.toFixed(2)}% (Freddie Mac, ${p.date})${p.note ? `, ${p.note}` : ""}`}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </section>

      <section id="dictionary" className="mt-12 scroll-mt-20">
        <h2 className="text-xl font-bold text-ink-900">Data dictionary</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
          Each CSV has one row for each of the 50 states and DC, and a last row for the United States. The columns
          below are listed in file order. Source tables are Census Bureau American Community Survey table
          numbers{acsYear ? ` (${acsYear} 1-year estimates)` : ""}; “Calculated by {site.name}” means the column is
          computed from them. Open a file to see its columns.
        </p>
        <div className="mt-4 space-y-3">
          {PRESS_ROWS.map((row) => {
            const dict = dictionaries.get(row.slug);
            if (!dict) throw new Error(`No dictionary for ${row.slug}`);
            return (
              <details
                key={row.slug}
                id={`dictionary-${row.slug}`}
                className="group scroll-mt-20 rounded-xl border border-ink-200 bg-white shadow-card"
              >
                <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-ink-900 group-open:text-brand-700">{row.title}</span>
                  <span className="text-xs text-ink-500">
                    {`${dict.filename} · ${dict.rows.length} columns · `}
                    <span className="font-medium text-brand-700 group-open:hidden">Show columns</span>
                    <span className="hidden font-medium text-brand-700 group-open:inline">Hide columns</span>
                  </span>
                </summary>
                <div className="overflow-x-auto border-t border-ink-100">
                  <table className="w-full min-w-[44rem] table-fixed text-xs">
                    <colgroup>
                      <col className="w-[31%]" />
                      <col className="w-[34%]" />
                      <col className="w-[14%]" />
                      <col className="w-[21%]" />
                    </colgroup>
                    <thead className="bg-paper-2 text-[0.6875rem] uppercase tracking-[0.07em] text-ink-600">
                      <tr className="border-b-2 border-brand-800">
                        <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                          Column
                        </th>
                        <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                          Meaning
                        </th>
                        <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                          Unit
                        </th>
                        <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                          Source table
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100 align-top">
                      {dict.rows.map((col) => (
                        <tr key={col.column} className={col.isMargin ? "bg-ink-50/60" : undefined}>
                          <td className="px-3 py-2 font-mono text-[0.6875rem] text-ink-900 [overflow-wrap:anywhere]">{col.column}</td>
                          <td className="px-3 py-2 leading-relaxed text-ink-700">{col.meaning}</td>
                          <td className="px-3 py-2 text-ink-600">{col.unit}</td>
                          <td className="px-3 py-2 text-ink-600">{col.tables}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <h2 className="text-xl font-bold text-ink-900">State pages</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
          {`Seven states have a page that puts their figures from all ${PRESS_ROWS.length} reports side by side, with the national figure, the rank among the 50 states and DC, and the margin of error where the source gives one. Each figure links to its report.`}
        </p>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          {stateNames.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/states/${s.slug}`}
                className="inline-block rounded-lg border border-ink-200 bg-white px-3.5 py-2 font-medium text-ink-900 shadow-card transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="changes" className="mt-12 scroll-mt-20">
        <h2 className="text-xl font-bold text-ink-900">Change log</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
          First-published and last-modified dates of every report, newest first, with the data year each report
          uses. A CSV file name carries the same data year and a version label, in the form{" "}
          <span className="font-mono text-xs text-ink-800">{`calcwise-<report>-acs<year>-v<version>.csv`}</span>.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
          <table className="w-full min-w-[40rem] text-sm">
            <thead className="bg-paper-2 text-[0.6875rem] uppercase tracking-[0.07em] text-ink-600">
              <tr className="border-b-2 border-brand-800">
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Date
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Event
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Report
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Data year
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {CHANGELOG.map((event) => (
                <tr key={`${event.slug}-${event.kind}`}>
                  <td className="whitespace-nowrap px-3 py-2 text-ink-700">{date(event.date)}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-ink-700">{event.kind}</td>
                  <td className="px-3 py-2">
                    <Link href={event.path} className="text-ink-900 hover:text-brand-700">
                      {event.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-ink-700">{`${event.acsYear} ACS`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="contact" className="mt-12 scroll-mt-20 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          {site.name} is founded and maintained by {site.founder.name}, an independent developer (see the{" "}
          <Link href="/about" className="text-brand-600 underline">
            About page
          </Link>
          ). For a question about a figure, a method, or a correction, email{" "}
          <a href={`mailto:${EMAIL}`} className="text-brand-600 underline">
            {EMAIL}
          </a>
          . How the reports are built is on the{" "}
          <Link href="/methodology" className="text-brand-600 underline">
            methodology page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
