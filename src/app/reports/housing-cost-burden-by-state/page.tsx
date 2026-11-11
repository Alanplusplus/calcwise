import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateBurdenTable } from "@/components/StateBurdenTable";
import { site } from "@/lib/site";
import {
  CSV_HEADER,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_RESULT,
  correlation,
  count0,
  getStateResult,
  millions,
  pct1,
  usd0,
} from "@/lib/reports/housing-cost-burden-by-state";
import { REPORT as RENT_REPORT, US_RESULT as RENT_US } from "@/lib/reports/rent-vs-buy-by-state";

const title = "Housing Cost Burden by State: 30%+ of Income";
const h1 = "Housing Cost Burden by State: Households Paying 30% or More of Income";
const description = `Share of renters and owners spending 30% or more of income on housing in all 50 states and DC, with severe burden, 2025 ACS data, and a free CSV.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "article",
    publishedTime: REPORT.datePublished,
    modifiedTime: REPORT.dateModified,
  },
};

const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function mustGet(abbr: string) {
  const row = getStateResult(abbr);
  if (!row) throw new Error(`Missing state ${abbr}`);
  return row;
}

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;
const highestFive = STATE_RESULTS.slice(0, 5);
const lowestFive = STATE_RESULTS.slice(-5).reverse();
const highest = STATE_RESULTS[0];
const lowest = STATE_RESULTS[total - 1];
const aboveUs = STATE_RESULTS.filter((r) => r.allShare30.pct > us.allShare30.pct);

const byRenter = [...STATE_RESULTS].sort((a, b) => b.renterShare30.pct - a.renterShare30.pct);
const renterHighest = byRenter[0];
const renterLowest = byRenter[total - 1];
const renterSevereHighest = [...STATE_RESULTS].sort(
  (a, b) => b.renterShare50.pct - a.renterShare50.pct,
)[0];
const renterMajority = STATE_RESULTS.filter((r) => r.renterShare30.pct >= 50);

const byMort = [...STATE_RESULTS].sort((a, b) => b.mortShare30.pct - a.mortShare30.pct);
const mortHighestThree = byMort.slice(0, 3);
const mortLowest = byMort[total - 1];
const byFree = [...STATE_RESULTS].sort((a, b) => b.freeShare30.pct - a.freeShare30.pct);
const freeHighest = byFree[0];

const rentCorr = correlation(
  STATE_RESULTS.map((r) => r.rent),
  STATE_RESULTS.map((r) => r.renterShare30.pct),
);
const incomeCorr = correlation(
  STATE_RESULTS.map((r) => r.renterIncome),
  STATE_RESULTS.map((r) => r.renterShare30.pct),
);
const rentIncomeCorr = correlation(
  STATE_RESULTS.map((r) => r.rent),
  STATE_RESULTS.map((r) => r.renterIncome),
);
const ratioCorr = correlation(
  STATE_RESULTS.map((r) => (r.rent * 12) / r.renterIncome),
  STATE_RESULTS.map((r) => r.renterShare30.pct),
);
const lowRentHighBurden = STATE_RESULTS.filter(
  (r) => r.rent < us.rent && r.renterShare30.pct > us.renterShare30.pct + 1,
).sort((a, b) => a.rent - b.rent);
const highRentLowBurden = STATE_RESULTS.filter(
  (r) => r.rent > us.rent * 1.15 && r.renterShare30.pct < us.renterShare30.pct - 1,
).sort((a, b) => b.rent - a.rent);
const burdenExample = (r: (typeof STATE_RESULTS)[number]) =>
  `${r.name} (median rent ${usd0(r.rent)}, ${pct1(r.renterShare30.pct)} of renters burdened)`;

const mixExample = [...STATE_RESULTS].sort((a, b) => b.renterHouseholdShare - a.renterHouseholdShare)[0];
const mixBelow = mixExample.renterShare30.pct < us.renterShare30.pct;

const incomeBelow = STATE_RESULTS.filter((r) => r.incomeVsNeeded < 0);
const shortfallMost = [...STATE_RESULTS].sort((a, b) => a.incomeVsNeeded - b.incomeVsNeeded)[0];
const surplusMost = [...STATE_RESULTS].sort((a, b) => b.incomeVsNeeded - a.incomeVsNeeded)[0];
const needHigh = [...STATE_RESULTS].sort((a, b) => b.incomeNeeded - a.incomeNeeded)[0];
const needLow = [...STATE_RESULTS].sort((a, b) => a.incomeNeeded - b.incomeNeeded)[0];
const hourlyNeeded = us.incomeNeeded / 2080;
const atThirtyMonthly = (us.renterIncome * REPORT.burdenPct) / 100 / 12;

const notComputedRenters = us.renterTotal - us.renterBase;
const notComputedOwners = us.ownerTotal - us.mortBase - us.freeBase;
const renterShareOfAllRenters = (us.renter30 / us.renterTotal) * 100;
const burdenedByRenters = (us.renter30 / us.burdened) * 100;
const burdenedByMort = (us.mort30 / us.burdened) * 100;
const burdenedByFree = (us.free30 / us.burdened) * 100;
const ratioOfMediansRentShare = (us.rent / (us.renterIncome / 12)) * 100;
const widestMoe = [...STATE_RESULTS]
  .sort((a, b) => b.allShare30.moe - a.allShare30.moe)
  .slice(0, 4);
const medianMoe = [...STATE_RESULTS].map((r) => r.allShare30.moe).sort((a, b) => a - b)[
  Math.floor(total / 2)
];

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  renter30: r.renterShare30.pct,
  renter50: r.renterShare50.pct,
  mort30: r.mortShare30.pct,
  free30: r.freeShare30.pct,
  all30: r.allShare30.pct,
  all30Low: r.allShare30.pct - r.allShare30.moe,
  all30High: r.allShare30.pct + r.allShare30.moe,
  rentMedianPct: r.rentMedianPct,
}));

const groups = [
  {
    label: "Renters",
    base: us.renterBase,
    n30: us.renter30,
    s30: us.renterShare30,
    n50: us.renter50,
    s50: us.renterShare50,
  },
  {
    label: "Owners with a mortgage",
    base: us.mortBase,
    n30: us.mort30,
    s30: us.mortShare30,
    n50: us.mort50,
    s50: us.mortShare50,
  },
  {
    label: "Owners without a mortgage",
    base: us.freeBase,
    n30: us.free30,
    s30: us.freeShare30,
    n50: us.free50,
    s50: us.freeShare50,
  },
  {
    label: "All households",
    base: us.allBase,
    n30: us.burdened,
    s30: us.allShare30,
    n50: us.severe,
    s50: us.allShare50,
  },
];

const faqs = [
  {
    question: "What does it mean to be housing cost-burdened?",
    answer: `A household is cost-burdened when housing takes 30% or more of its gross income, and severely cost-burdened at 50% or more. HUD defines the terms in 24 CFR 91.5, and the Census Bureau publishes the household counts in those brackets. In the ${REPORT.acsYear} ACS, ${millions(us.burdened)} U.S. households (${pct1(us.allShare30.pct)}) were at 30% or more and ${millions(us.severe)} (${pct1(us.allShare50.pct)}) were at 50% or more. For renters, housing cost is gross rent (rent plus utilities). For owners it is the mortgage payment, property tax, insurance, utilities, and similar costs.`,
  },
  {
    question: "Which state has the most cost-burdened households?",
    answer: `${highest.name} has the largest share of households at 30% or more of income (${pct1(highest.allShare30.pct)}), followed by ${longList(STATE_RESULTS.slice(1, 4).map((r) => `${r.name} (${pct1(r.allShare30.pct)})`))}. ${lowest.name} has the smallest (${pct1(lowest.allShare30.pct)}). For renters alone the highest is ${renterHighest.name} at ${pct1(renterHighest.renterShare30.pct)}. Estimates have margins of error, so states a point or two apart can be statistical ties; the state table shows the 90% range for each.`,
  },
  {
    question: "Is the 30% rule based on gross or take-home pay?",
    answer: `Gross. Both the Census Bureau and HUD measure housing cost against household income before taxes. The same dollars are a bigger share of take-home pay. For example, a renter household earning the U.S. median of ${usd0(us.renterIncome)} reaches the 30% line at ${usd0(atThirtyMonthly)} a month, while the median gross rent is ${usd0(us.rent)}. Our paycheck calculator shows what your own gross pay turns into after taxes.`,
  },
  {
    question: "Why does this report include homeowners?",
    answer: `Owners are burdened too, just less often. ${pct1(us.mortShare30.pct)} of owners with a mortgage and ${pct1(us.freeShare30.pct)} of owners without one spend 30% or more, which is ${count0(us.mort30 + us.free30)} households. Owners without a mortgage still carry property tax, insurance, and utilities, and the Census measure counts all of them. Owners who bought years ago often have lower payments than a buyer would face today, so the owner figures understate what new buyers face.`,
  },
  {
    question: "How much income do I need to rent the median apartment in my state?",
    answer: `At the 30% line, the median U.S. gross rent of ${usd0(us.rent)} a month needs an income of ${usd0(us.incomeNeeded)} a year, about ${usd0(hourlyNeeded)} an hour for a full-time job. By state it runs from ${usd0(needLow.incomeNeeded)} in ${needLow.name} to ${usd0(needHigh.incomeNeeded)} in ${needHigh.name}. The CSV has the figure for every state next to the median renter household income.`,
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau data are public domain. A CSV with every figure is available at ${site.url}${REPORT.csvPath}.`,
  },
];

const citation = `${site.name} (${new Date(REPORT.dateModified).getUTCFullYear()}). ${h1}. ${site.url}${REPORT.path}. Data: U.S. Census Bureau, ${REPORT.acsYear} American Community Survey 1-year estimates (B25070, B25091, B25071, B25092, B25064, B25119).`;

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data)`,
    description: `Share of renter households, owner households with a mortgage, and owner households without a mortgage spending 30% or more and 50% or more of household income on housing, with margins of error, median housing cost as a share of income, and the income needed to rent the median unit at 30% of income, for the 50 states and DC. Derived from ACS ${REPORT.acsYear} 1-year tables B25070, B25091, B25071, B25092, B25064, and B25119.`,
    url: `${site.url}${REPORT.path}`,
    identifier: `${site.url}${REPORT.path}`,
    datePublished: REPORT.datePublished,
    dateModified: REPORT.dateModified,
    inLanguage: "en",
    creator: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    temporalCoverage: String(REPORT.acsYear),
    spatialCoverage: { "@type": "Place", name: "United States (50 states and District of Columbia)" },
    keywords: [
      "housing cost burden by state",
      "cost burdened households by state",
      "rent burden by state",
      "percent of income spent on housing by state",
      "severely cost burdened renters",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsRenters.href,
      REPORT_SOURCES.acsOwners.href,
      REPORT_SOURCES.acsRentMedian.href,
      REPORT_SOURCES.acsOwnerMedian.href,
      REPORT_SOURCES.acsRent.href,
      REPORT_SOURCES.acsTenureIncome.href,
    ],
    variableMeasured: CSV_HEADER.map((name) => ({ "@type": "PropertyValue", name })),
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: `${site.url}${REPORT.csvPath}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HousingCostBurdenByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Housing Cost Burden by State", href: REPORT.path },
        ]}
      />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={REPORT.slug}
        datePublished={REPORT.datePublished}
        dateModified={REPORT.dateModified}
        urlPrefix="/reports"
      />
      <DatasetJsonLd />
      <FaqJsonLd faqs={faqs} />

      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/reports" className="hover:text-brand-600">
          Data Reports
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Housing Cost Burden by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        Published {longDate.format(new Date(REPORT.datePublished))} · Housing cost and income data:
        Census ACS {REPORT.acsYear} 1-year · Definitions: HUD, 24 CFR 91.5
      </p>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          In the {REPORT.acsYear} American Community Survey, <strong>{millions(us.burdened)} U.S.
          households ({pct1(us.allShare30.pct)})</strong> spent 30% or more of their income on housing,
          and {millions(us.severe)} ({pct1(us.allShare50.pct)}) spent half or more. The share is{" "}
          <strong>{pct1(us.renterShare30.pct)} of renters</strong>, {pct1(us.mortShare30.pct)} of owners
          with a mortgage, and {pct1(us.freeShare30.pct)} of owners without one. By state, it runs from{" "}
          {pct1(highest.allShare30.pct)} in {highest.name} to {pct1(lowest.allShare30.pct)} in{" "}
          {lowest.name}.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Households paying 30%+ of income",
            value: pct1(us.allShare30.pct),
            note: `${millions(us.burdened)} of ${millions(us.allBase)} households with a computed ratio`,
          },
          {
            label: "Renters paying 30%+",
            value: pct1(us.renterShare30.pct),
            note: `${pct1(us.renterShare50.pct)} pay 50% or more. Median renter pays ${pct1(us.rentMedianPct)} of income`,
          },
          {
            label: "Owners with a mortgage, 30%+",
            value: pct1(us.mortShare30.pct),
            note: `${pct1(us.freeShare30.pct)} of owners without a mortgage are also at 30% or more`,
          },
          {
            label: "Income to rent the median home at 30%",
            value: usd0(us.incomeNeeded),
            note: `Median gross rent ${usd0(us.rent)} a month. Median renter household earns ${usd0(us.renterIncome)}`,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-ink-200 border-t-[3px] border-t-gold-500 bg-white p-4 shadow-card"
          >
            <p className="text-[0.6875rem] font-semibold uppercase leading-snug tracking-[0.09em] text-ink-500">
              {card.label}
            </p>
            <p className="numeral mt-2 text-[1.75rem] font-semibold leading-none text-ink-900">
              {card.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-500">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="prose mt-10 max-w-none">
        <h2>What the numbers show</h2>
        <ul>
          <li>
            <strong>Housing cost burden is common, and renters carry most of it.</strong> Of{" "}
            {millions(us.allBase)} households with a computed ratio, {millions(us.burdened)} (
            {pct1(us.allShare30.pct)}) are at 30% or more and {millions(us.severe)} (
            {pct1(us.allShare50.pct)}) are at 50% or more. Renters are {pct1(us.renterHouseholdShare)} of all
            households but {pct1(burdenedByRenters)} of the burdened ones: {count0(us.renter30)} renter
            households, against {count0(us.mort30)} owners with a mortgage ({pct1(burdenedByMort)}) and{" "}
            {count0(us.free30)} owners without one ({pct1(burdenedByFree)}).
          </li>
          <li>
            <strong>
              The share runs from {pct1(lowest.allShare30.pct)} in {lowest.name} to{" "}
              {pct1(highest.allShare30.pct)} in {highest.name}.
            </strong>{" "}
            The five highest are{" "}
            {longList(highestFive.map((r) => `${r.name} (${pct1(r.allShare30.pct)})`))}. The five lowest
            are             {longList(lowestFive.map((r) => `${r.name} (${pct1(r.allShare30.pct)})`))}. In {aboveUs.length}{" "}
            of {total} places the share is above the U.S. figure of {pct1(us.allShare30.pct)}.
          </li>
          <li>
            <strong>
              A majority of renters are burdened in {renterMajority.length} of {total} places.
            </strong>{" "}
            {renterHighest.name} is highest at {pct1(renterHighest.renterShare30.pct)}
            {renterSevereHighest.abbr === renterHighest.abbr
              ? ", and it also has the most renters at 50% or more"
              : `, and ${renterSevereHighest.name} has the most renters at 50% or more`}{" "}
            ({pct1(renterSevereHighest.renterShare50.pct)}). {renterLowest.name} is lowest at{" "}
            {pct1(renterLowest.renterShare30.pct)}, and {pct1(renterLowest.renterShare50.pct)} of its renters
            still pay half or more. Nationally {pct1(us.renterShare50.pct)} of renters, {count0(us.renter50)}{" "}
            households, spend at least half of their income on rent and utilities.
          </li>
          <li>
            <strong>Burden follows rent relative to income, not rent or income alone.</strong> Across the{" "}
            {total} places, the share of renters at 30% or more has a correlation of {rentCorr.toFixed(2)}{" "}
            with median rent and {incomeCorr.toFixed(2)} with median renter income, because higher-income
            states are also higher-rent states (rent and renter income correlate at{" "}
            {rentIncomeCorr.toFixed(2)}). Divide one by the other, a year of median rent over median renter
            income, and the correlation with the burden share rises to {ratioCorr.toFixed(2)}.{" "}
            {lowRentHighBurden.length > 0
              ? `Low rent does not protect renters where incomes are lower still: ${longList(lowRentHighBurden.slice(0, 2).map(burdenExample))}, against a U.S. median rent of ${usd0(us.rent)} and ${pct1(us.renterShare30.pct)} burdened. `
              : ""}
            {highRentLowBurden.length > 0
              ? `High rent can go with a lower burden where incomes are high: ${longList(highRentLowBurden.slice(0, 2).map(burdenExample))}. `
              : ""}
            These are descriptive correlations across states, not causes.
          </li>
          <li>
            <strong>Owners are burdened too, and the range by state is wide.</strong> Among owners with a
            mortgage, the share at 30% or more runs from {pct1(mortLowest.mortShare30.pct)} in{" "}
            {mortLowest.name} to {pct1(mortHighestThree[0].mortShare30.pct)} in {mortHighestThree[0].name};{" "}
            {longList(mortHighestThree.slice(1).map((r) => `${r.name} (${pct1(r.mortShare30.pct)})`))}{" "}
            follow. Owners without a mortgage are burdened less often ({pct1(us.freeShare30.pct)}{" "}
            nationally) but still number {count0(us.free30)} households, and the share reaches{" "}
            {pct1(freeHighest.freeShare30.pct)} in {freeHighest.name}. The measure includes property tax,
            insurance, and utilities, which continue after the loan is paid.
          </li>
          <li>
            <strong>The all-household rank mixes burden with how many people rent.</strong>{" "}
            {mixExample.name} ranks {mixExample.rank} of {total} at {pct1(mixExample.allShare30.pct)}, yet
            its renter burden ({pct1(mixExample.renterShare30.pct)}) is {mixBelow ? "below" : "above"} the
            U.S. figure of {pct1(us.renterShare30.pct)}. Renters are {pct1(mixExample.renterHouseholdShare)}{" "}
            of its households against {pct1(us.renterHouseholdShare)} nationally, and renters are burdened
            more often than owners, so a renter-heavy state ranks higher overall. The table lets you
            sort by each group to compare like with like.
          </li>
          <li>
            <strong>
              In {incomeBelow.length} of {total} places the median renter household earns less than the
              30% rule asks for the median rent.
            </strong>{" "}
            Renting the median U.S. unit at 30% of income takes {usd0(us.incomeNeeded)} a year (
            {usd0(hourlyNeeded)} an hour full time); the median renter household has {usd0(us.renterIncome)},
            or {Math.abs(us.incomeVsNeeded).toFixed(1)}% {us.incomeVsNeeded < 0 ? "less" : "more"}. The
            shortfall is largest in {shortfallMost.name} (income {usd0(shortfallMost.renterIncome)} against{" "}
            {usd0(shortfallMost.incomeNeeded)} needed) and the cushion largest in {surplusMost.name} (
            {usd0(surplusMost.renterIncome)} against {usd0(surplusMost.incomeNeeded)}). This compares two
            medians, not matched households, so read it as a gauge of how tight the market is rather than a
            count of who can afford what.
          </li>
        </ul>

        <h2>Burden by type of household</h2>
        <p>
          The table below is the national picture for each group. Shares use households for which the
          Census Bureau could compute the ratio, and the 90% margin of error is in percentage points.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Household group
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                With ratio computed
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                At 30% or more
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share (90% margin)
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                At 50% or more
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {groups.map((g) => (
              <tr key={g.label} className={g.label === "All households" ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{g.label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(g.base)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(g.n30)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {pct1(g.s30.pct)} (±{g.s30.moe.toFixed(2)})
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(g.n50)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(g.s50.pct)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar shows the share of all households at 30% or
          more of income; the other columns split it by renters and owners.
        </p>
        <div className="mt-4">
          <StateBurdenTable rows={tableRows} usShare={us.allShare30.pct} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={REPORT.csvPath}
            download
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Download the full dataset (CSV)
          </a>
          <span className="text-xs text-ink-500">
            {total + 1} rows (states, DC, and the U.S.), {CSV_HEADER.length} columns, CC BY 4.0
          </span>
        </div>
      </section>

      <div className="prose mt-12 max-w-none">
        <h2>How we calculated it</h2>
        <p>
          Six Census Bureau tables supply the inputs. Two of them, B25070 for renters and B25091 for owners,
          count the households in each bracket of housing cost as a share of income. We add up the brackets
          at {REPORT.burdenPct}% and above, divide by the households for which the ratio could be
          computed, and attach a margin of error. The other four tables give medians and the rent and
          income used for the income-needed figure.
        </p>
        <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-sm">
          Share = households at {REPORT.burdenPct}% or more ÷ (all households in the table − “not computed”)
        </p>
        <ul>
          <li>
            <strong>Renters</strong> (table B25070): gross rent as a percentage of household income, which
            is monthly contract rent plus tenant-paid utilities and fuels divided by monthly household
            income. The {REPORT.burdenPct}%-or-more group adds the brackets {REPORT.burdenPct}.0 to 34.9%,
            35.0 to 39.9%, 40.0 to 49.9%, and {REPORT.severePct}.0% or more; the severe group is the last
            bracket alone.
          </li>
          <li>
            <strong>Owners</strong> (table B25091): selected monthly owner costs as a percentage of household
            income, split into owners with and without a mortgage. Selected costs are mortgage payments,
            real estate taxes, insurance, utilities and fuels, and condominium or mobile-home fees. The
            same brackets are added.
          </li>
          <li>
            <strong>All households</strong> add the burdened households of the three groups and divide by
            the sum of their computed-ratio bases.
          </li>
          <li>
            <strong>Margin of error</strong> for a sum is the square root of the sum of the squared published
            margins. For a share, we use the Census Bureau’s formula for a proportion,{" "}
            √(MOE<sub>x</sub>² − p² × MOE<sub>y</sub>²) ÷ y, where x is the burdened count and y is the base.
            The 90% range in the table is the share plus and minus that margin.
          </li>
          <li>
            <strong>Median rent as a share of income</strong> (B25071) and the median owner cost share for
            owners with a mortgage (B25092) are the published medians of each household’s own ratio.
          </li>
          <li>
            <strong>Income needed</strong> is median gross rent (B25064) × 12 ÷{" "}
            {(REPORT.burdenPct / 100).toFixed(2)}, compared with median renter household income (B25119).
            These are the same rent and income inputs as our{" "}
            <Link href="/reports/rent-vs-buy-by-state">rent vs buy by state report</Link>.
          </li>
        </ul>
        <p>
          Worked example, U.S. renters: {count0(us.renter30)} households at 30% or more ÷ {count0(us.renterBase)}{" "}
          with a computed ratio ({count0(us.renterTotal)} renter households less {count0(notComputedRenters)}{" "}
          not computed) = {pct1(us.renterShare30.pct)}. All households: {count0(us.renter30)} +{" "}
          {count0(us.mort30)} + {count0(us.free30)} = {count0(us.burdened)}, divided by {count0(us.allBase)},
          is {pct1(us.allShare30.pct)}. Income needed: {usd0(us.rent)} × 12 ÷ 0.30 = {usd0(us.incomeNeeded)}.
          To see where your own housing cost falls, use our{" "}
          <Link href="/calculators/budget-50-30-20">50/30/20 budget calculator</Link> or the{" "}
          <Link href="/calculators/debt-to-income">debt-to-income calculator</Link>.
        </p>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>Thirty percent is a rule of thumb, not a budget.</strong> It ignores household size,
            local costs, and what else a household must pay for, such as child care, transportation, and
            health care. A household earning $200,000 and paying 32% is “burdened” by the definition; one
            earning $30,000 and paying 25% is not, though it may have less left over. The Congressional
            Research Service discusses these limits in its review of the measure.
          </li>
          <li>
            <strong>Households with no computed ratio are left out.</strong> {count0(notComputedRenters)} renter
            households (no cash rent paid, or zero or negative income) and {count0(notComputedOwners)} owner
            households (zero or negative income) have no ratio and are excluded from the percentages, as the
            Census Bureau does. If renters in that group were counted in the base, the renter share would
            be {pct1(renterShareOfAllRenters)} instead of {pct1(us.renterShare30.pct)}.
          </li>
          <li>
            <strong>Owner and renter costs are different bundles.</strong> Gross rent includes utilities. Owner
            costs add property tax and insurance but not maintenance, repairs, or the cost of replacing a
            roof, so owner shares understate the full cost of owning. The tenure groups are not strictly
            like-for-like.
          </li>
          <li>
            <strong>Current owners are not new buyers.</strong> The median owner with a mortgage spends{" "}
            {pct1(us.mortMedianPct)} of income on housing, and many hold loans from years when rates were
            lower. Financing today’s median home at {RENT_REPORT.mortgageRate.toFixed(2)}% costs{" "}
            {usd0(RENT_US.payment)} a month in principal, interest, and property tax in our rent vs buy
            report, or {pct1(RENT_US.ownerShare)} of the median owner household’s income before insurance and
            utilities are added.
          </li>
          <li>
            <strong>Two different “rent share of income” figures.</strong> The median renter household pays{" "}
            {pct1(us.rentMedianPct)} of income for rent and utilities (the median of each household’s own
            ratio, from B25071). The rent vs buy report divides the median rent by the median renter income
            instead, which gives {pct1(ratioOfMediansRentShare)}. Both are valid summaries of different
            things and they will not match.
          </li>
          <li>
            <strong>ACS figures are estimates with margins of error.</strong> The median 90% margin on a
            state’s all-household share is about {medianMoe.toFixed(1)} points, but it is wider for{" "}
            {longList(
              widestMoe.map(
                (r) =>
                  `${r.name} (${pct1(r.allShare30.pct - r.allShare30.moe)} to ${pct1(r.allShare30.pct + r.allShare30.moe)})`,
              ),
            )}
            . Treat states whose ranges overlap as ties.
          </li>
          <li>
            <strong>This is one year of data for states, not trends or cities.</strong> The {REPORT.acsYear} ACS
            reflects responses collected during {REPORT.acsYear} and was released on October 29, 2026. It
            says nothing about 2026 rents or rates, and cities, metro areas, and neighborhoods can differ a
            lot from their state. The 2026 estimates are expected in fall 2027, and we will update the
            report after that release.
          </li>
          <li>
            <strong>Households, not people.</strong> A household of four and a household of one each count
            once, and a burdened household can include several earners.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsRenters,
          REPORT_SOURCES.acsOwners,
          REPORT_SOURCES.acsRentMedian,
          REPORT_SOURCES.acsOwnerMedian,
          REPORT_SOURCES.acsRent,
          REPORT_SOURCES.acsTenureIncome,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
          REPORT_SOURCES.censusQa,
          REPORT_SOURCES.hud,
          REPORT_SOURCES.crs,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for B25070, B25091, B25071, and B25092 were read from the Census Bureau's ACS 1-year Summary File on November 11, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the published brackets add up to each table total. The national renter counts (${count0(us.renter30)} at 30% or more and ${count0(us.renter50)} at 50% or more, of ${count0(us.renterBase)} with a computed ratio) and the state renter shares agree with an independent tabulation of table B25070. The definitions of cost burden, gross rent, selected monthly owner costs, and “not computed” are from HUD and the Census Bureau documents listed above. See our methodology page for how we verify figures.`}
      />

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Cite or reuse this report</h2>
        <p className="mt-2 text-sm text-ink-600">
          The figures calculated by {site.name} (shares, margins of error, income needed, rankings) are
          licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline"
          >
            CC BY 4.0
          </a>
          : you may copy, chart, and republish them, including commercially, with a link back to this
          page. The Census Bureau inputs are public domain.
        </p>
        <p className="mt-3 rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-700">{citation}</p>
        <p className="mt-3 text-sm text-ink-600">
          Want a calculator on your site?{" "}
          <Link href="/embed#mortgage" className="text-brand-600 underline">
            Embed the mortgage calculator for free
          </Link>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink-900">Frequently asked questions</h2>
        <div className="mt-4 divide-y divide-ink-200 rounded-xl border border-ink-200 bg-white">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-5">
              <h3 className="text-base font-semibold text-ink-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink-900">Run your own numbers</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/calculators/budget-50-30-20", label: "50/30/20 Budget Calculator", note: "See what share of your pay goes to needs" },
            { href: "/calculators/debt-to-income", label: "Debt-to-Income Calculator", note: "Check your ratio before you apply for a loan" },
            { href: "/calculators/home-affordability", label: "Home Affordability Calculator", note: "Find the price your income supports" },
            { href: "/calculators/salary-to-hourly", label: "Salary to Hourly Calculator", note: "Turn the income you need into an hourly wage" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-ink-200 bg-white p-4 transition-shadow hover:shadow-card-hover"
            >
              <h3 className="text-sm font-semibold text-ink-800">{item.label}</h3>
              <p className="mt-1 text-xs text-ink-500">{item.note}</p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-600">
          Related: our{" "}
          <Link href="/reports/rent-vs-buy-by-state" className="text-brand-600 underline">
            rent vs buy by state report
          </Link>
          ,{" "}
          <Link href="/reports/mortgage-affordability-by-state" className="text-brand-600 underline">
            mortgage affordability by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/50-30-20-budget-rule" className="text-brand-600 underline">
            the 50/30/20 budget rule
          </Link>
          ,{" "}
          <Link href="/guides/debt-to-income-ratio-guide" className="text-brand-600 underline">
            debt-to-income ratio explained
          </Link>
          , and{" "}
          <Link href="/guides/how-much-house-can-i-afford" className="text-brand-600 underline">
            how much house you can afford
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
