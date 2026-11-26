import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PILOT_STATES } from "@/lib/reports/pilot-states";
import { PRESS_ROWS } from "@/lib/reports/press";
import { getStateProfile, type ProfileRow } from "@/lib/reports/state-metrics";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PILOT_STATES.map((s) => ({ state: s.slug }));
}

const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function profileOrNotFound(slug: string) {
  const profile = getStateProfile(slug);
  if (!profile) notFound();
  return profile;
}

const reportCount = (rows: ProfileRow[]) => new Set(rows.map((r) => r.reportSlug)).size;

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const profile = profileOrNotFound(state);
  const title = `${profile.name} Housing and Income Data, Ranked`;
  const description = `${profile.name}: ${profile.rows.length} figures from ${reportCount(profile.rows)} ${site.name} reports (${profile.acsYear} ACS), each next to the U.S. figure and its rank among the 50 states and DC.`;
  const path = `/states/${profile.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      type: "website",
      url: `${site.url}${path}`,
    },
  };
}

const linkClass =
  "font-medium text-brand-700 underline decoration-gold-400 decoration-[1.5px] underline-offset-[3px]";

const errorLabel: Record<ProfileRow["errorKind"], string> = {
  moe: "90% margin of error",
  range: "Conservative range",
  none: "",
};

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const profile = profileOrNotFound(state);
  const groups = PRESS_ROWS.map((report) => ({
    report,
    rows: profile.rows.filter((r) => r.reportSlug === report.slug),
  })).filter((g) => g.rows.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 pt-8 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Press and data access", href: "/reports/press" },
          { name: profile.name, href: `/states/${profile.slug}` },
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
        <Link href="/reports/press" className="transition-colors hover:text-brand-700">
          Press and data access
        </Link>
        <span aria-hidden="true" className="mx-2 text-ink-300">
          /
        </span>
        <span aria-current="page" className="text-ink-800">
          {profile.name}
        </span>
      </nav>

      <header className="border-b border-ink-200 pb-8">
        <p className="eyebrow">{`State data · ${profile.acsYear} ACS 1-year estimates`}</p>
        <h1 className="mt-3 text-[2.25rem] font-semibold text-ink-900 sm:text-[2.875rem]">
          {`${profile.name} by the Numbers: Housing, Income, and Household Costs`}
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          {`Data last changed ${longDate.format(new Date(profile.dataDate))} · Source of every figure: the linked ${site.name} report`}
        </p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600">{profile.overview}</p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink-900">{`${profile.name} figures from ${reportCount(profile.rows)} reports`}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
          Each figure links to the report it comes from, where the method and the other states are.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
          <table className="w-full min-w-[46rem] text-sm">
            <thead className="bg-paper-2 text-[0.6875rem] uppercase tracking-[0.07em] text-ink-600">
              <tr className="border-b-2 border-brand-800">
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Figure
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">
                  {profile.name}
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">
                  United States
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  {`Rank of ${profile.rows[0].places}`}
                </th>
                <th scope="col" className="px-3 py-3 text-left font-semibold">
                  Margin of error
                </th>
              </tr>
            </thead>
            {groups.map(({ report, rows }) => (
              <tbody key={report.slug} className="divide-y divide-ink-100 border-t border-ink-200 align-top">
                <tr className="bg-ink-50">
                  <th scope="colgroup" colSpan={5} className="px-3 py-2 text-left">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <Link href={report.path} className="text-[0.8125rem] font-semibold text-ink-900 hover:text-brand-700">
                        {report.title}
                      </Link>
                      <a href={report.csvPath} className="text-xs font-medium text-brand-700 underline underline-offset-2">
                        CSV
                      </a>
                    </span>
                  </th>
                </tr>
                {rows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-gold-50">
                    <td className="max-w-[22rem] px-3 py-2.5">
                      <p className="text-ink-900">{row.label}</p>
                      {row.sub ? <p className="mt-0.5 text-xs leading-snug text-ink-500">{row.sub}</p> : null}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-base font-semibold">
                      <Link href={row.reportPath} className="text-brand-700 underline decoration-gold-400 decoration-[1.5px] underline-offset-[3px]">
                        {row.value}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-ink-700">{row.us}</td>
                    <td className="px-3 py-2.5 text-ink-700">
                      <p className="whitespace-nowrap">{row.rank}</p>
                      {row.tiedWith.length > 0 ? (
                        <p className="mt-0.5 text-xs leading-snug text-ink-500">{`Same value as ${row.tiedWith.join(", ")}`}</p>
                      ) : null}
                    </td>
                    <td className="px-3 py-2.5 text-ink-700">
                      {row.errorKind === "none" ? (
                        <>
                          <span aria-label="No margin of error given">—</span>
                          {row.note ? <p className="mt-0.5 text-xs leading-snug text-ink-500">{row.note}</p> : null}
                        </>
                      ) : (
                        <>
                          <p className="whitespace-nowrap">{row.error}</p>
                          <p className="mt-0.5 text-xs leading-snug text-ink-500">{errorLabel[row.errorKind]}</p>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">How to read this page</h2>
        <ul className="mt-3 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-ink-700">
          <li>
            Ranks compare the 50 states and DC. “Nth highest” counts down from the largest value and “Nth lowest”
            counts up from the smallest. Where a report ranks by a figure, the rank shown is the report’s own.
          </li>
          <li>
            A margin of error is the 90% margin published by the Census Bureau, or one calculated from its margins
            for a share, ratio, or sum. “Conservative range” is the span the report gets by combining the margins
            of the inputs to a payment. A dash means the report gives no margin for that figure. A state whose margin
            overlaps its neighbor’s is not reliably above it.
          </li>
          <li>
            The American Community Survey is a sample survey, so every Census figure here is an estimate. The
            limits of each report are on its own page and on the{" "}
            <Link href="/reports/press#limits" className={linkClass}>
              press page
            </Link>
            .
          </li>
          <li>
            To use a figure, cite the report it comes from; the citation lines and the license are on the{" "}
            <Link href="/reports/press#cite" className={linkClass}>
              press page
            </Link>
            . The full table is in each report’s CSV, one row per state: filter the abbr column on{" "}
            <span className="font-mono text-xs text-ink-800">{profile.abbr}</span>.
          </li>
        </ul>
      </section>
    </div>
  );
}
