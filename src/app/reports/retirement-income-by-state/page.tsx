import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateRetirementTable } from "@/components/StateRetirementTable";
import { site } from "@/lib/site";
import {
  CSV_HEADER,
  REPORT,
  REPORT_SOURCES,
  SSA,
  SSA_ANNUALIZED,
  STATE_RESULTS,
  US_RESULT,
  correlation,
  count0,
  getStateResult,
  millions,
  pct1,
  usd0,
  type IncomeResult,
} from "@/lib/reports/retirement-income-by-state";

const title = "Social Security and Retirement Income by State";
const h1 = "Social Security and Retirement Income by State: Who Receives It and How Much";

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Name for running text: "D.C." reads better in a sentence than "District of Columbia". */
const short = (r: { abbr: string; name: string }) => (r.abbr === "DC" ? "D.C." : r.name);

const ordinal = (n: number) => {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`;
};

const trillions = (n: number) => `$${(n / 1e12).toFixed(2)} trillion`;
const billions = (n: number) => `$${(n / 1e9).toFixed(1)} billion`;
const usd2 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);
const roundThousand = (n: number) => Math.round(n / 1000) * 1000;

function mustGet(abbr: string) {
  const row = getStateResult(abbr);
  if (!row) throw new Error(`Missing state ${abbr}`);
  return row;
}

const sortedBy = (fn: (r: IncomeResult) => number) => [...STATE_RESULTS].sort((a, b) => fn(b) - fn(a));

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;
const withdrawalRate = REPORT.withdrawalRatePct / 100;

const bySsShare = sortedBy((r) => r.ssShare.pct);
const ssShareTop = bySsShare.slice(0, 4);
const ssShareLow = bySsShare.slice(-4).reverse();
const ssShareHigh = bySsShare[0];
const ssShareMin = bySsShare[total - 1];
const atLeast40 = bySsShare.filter((r) => r.ssShare.pct >= 40);
const under30 = bySsShare.filter((r) => r.ssShare.pct < 30);
const corrSsShareAge = correlation(
  STATE_RESULTS.map((r) => r.ssShare.pct),
  STATE_RESULTS.map((r) => r.hh65Share.pct),
);
const corrSsShareIncome = correlation(
  STATE_RESULTS.map((r) => r.ssShare.pct),
  STATE_RESULTS.map((r) => r.income),
);
const corrSsMeanIncome = correlation(
  STATE_RESULTS.map((r) => r.ssMean.value),
  STATE_RESULTS.map((r) => r.income),
);

const bySsMean = sortedBy((r) => r.ssMean.value);
const ssMeanHigh = bySsMean[0];
const ssMeanLow = bySsMean[total - 1];
const ssMeanSpread = ssMeanHigh.ssMean.value / ssMeanLow.ssMean.value;

const byRetMean = sortedBy((r) => r.retMean.value);
const retMeanTop = byRetMean.slice(0, 4);
const retMeanLow = byRetMean.slice(-4).reverse();
const retMeanHigh = byRetMean[0];
const retMeanMin = byRetMean[total - 1];
const retMeanSpread = retMeanHigh.retMean.value / retMeanMin.retMean.value;
const retBelowSs = STATE_RESULTS.filter((r) => r.retMean.value < r.ssMean.value);

const byRetShare = sortedBy((r) => r.retShare.pct);
const retShareHigh = byRetShare[0];
const retShareMin = byRetShare[total - 1];
const wv = mustGet("WV");
const wvRetShareRank = byRetShare.findIndex((r) => r.abbr === "WV") + 1;
const wvRetMeanRankFromBottom = total - byRetMean.findIndex((r) => r.abbr === "WV");

const byMed65 = sortedBy((r) => r.med65);
const med65High = byMed65[0];
const med65Low = byMed65[total - 1];
const med65AtLeast70 = byMed65.filter((r) => r.med65 >= 70000);
const med65Under55 = byMed65.filter((r) => r.med65 < 55000);

const byCombined = STATE_RESULTS;
const combinedTop = byCombined.slice(0, 3);
const combinedLow = byCombined.slice(-3).reverse();

const bySize = [...STATE_RESULTS].sort((a, b) => b.hh - a.hh);
const secondLargest = bySize[1];
const ssMoeMax = [...STATE_RESULTS].sort((a, b) => b.ssShare.moe - a.ssShare.moe)[0];
const ssMoeWithin1 = STATE_RESULTS.filter((r) => r.ssShare.moe <= 1).length;

// The copy below describes West Virginia and the sign of two correlations; fail the build if a data refresh changes that.
if (
  ssShareHigh.abbr !== "WV" ||
  med65Low.abbr !== "WV" ||
  wvRetShareRank > 5 ||
  wvRetMeanRankFromBottom > 5 ||
  corrSsShareIncome >= 0 ||
  corrSsMeanIncome <= 0
) {
  throw new Error("The retirement-income findings no longer match the data. Rewrite the West Virginia and correlation findings.");
}

const ssaCoverage = (us.ssAgg / SSA_ANNUALIZED) * 100;
const ssMonthly = us.ssMean.value / 12;
const ssVsRetiredWorker = (ssMonthly / SSA.retiredWorkerAverageMonthly - 1) * 100;

const nestEggUs = us.ssMean.value / withdrawalRate;
const nestEggLow = ssMeanLow.ssMean.value / withdrawalRate;
const nestEggHigh = ssMeanHigh.ssMean.value / withdrawalRate;
const extra1000Monthly = (1000 * 12) / withdrawalRate;

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  combined: r.combinedPerHh.value,
  combinedMoe: r.combinedPerHh.moe,
  ssShare: r.ssShare.pct,
  ssMean: r.ssMean.value,
  retShare: r.retShare.pct,
  retMean: r.retMean.value,
  med65: r.med65,
}));

const exampleClauses = [
  { r: ssShareHigh, text: "the highest share of households on Social Security" },
  { r: combinedTop[0], text: "the most Social Security plus retirement income per household" },
  { r: ssShareMin, text: "the lowest share of households on Social Security" },
  { r: retMeanHigh, text: "the highest average retirement income" },
  { r: ssMeanLow, text: "the lowest average Social Security amount" },
  { r: retMeanMin, text: "the lowest average retirement income" },
];
const exampleRows = [
  { label: "United States", r: us as Omit<IncomeResult, "rank"> },
  ...[...exampleClauses.map((c) => c.r), secondLargest]
    .filter((r, i, all) => all.findIndex((x) => x.abbr === r.abbr) === i)
    .map((r) => ({ label: r.name, r })),
];

const findings: { lead: string; body: string }[] = [
  {
    lead: `${pct1(us.ssShare.pct)} of U.S. households (${millions(us.ss)} of ${millions(us.hh)}) receive Social Security income, and ${pct1(us.retShare.pct)} (${millions(us.ret)}) receive retirement, survivor, or disability income.`,
    body: `Households with Social Security average ${usd0(us.ssMean.value)} a year (${usd0(ssMonthly)} a month); those with retirement income average ${usd0(us.retMean.value)}. Counting every household, the two sources bring in ${usd0(us.ssPerHh.value)} and ${usd0(us.retPerHh.value)} a year, ${usd0(us.combinedPerHh.value)} together.`,
  },
  {
    lead: `The share of households receiving Social Security runs from ${pct1(ssShareMin.ssShare.pct)} in ${short(ssShareMin)} to ${pct1(ssShareHigh.ssShare.pct)} in ${short(ssShareHigh)}.`,
    body: `${longList(ssShareTop.map((r) => `${short(r)} (${pct1(r.ssShare.pct)})`))} are the highest, and ${atLeast40.length} places are at 40% or more. ${under30.length} places are below 30%, the lowest being ${longList(ssShareLow.slice(0, 3).map((r) => `${short(r)} (${pct1(r.ssShare.pct)})`))}. The share follows age: across the ${total} places, the correlation with the share of households that have a member 65 or older is ${corrSsShareAge.toFixed(2)}.`,
  },
  {
    lead: `The size of the Social Security check varies far less across states than retirement income does.`,
    body: `The average for recipient households runs from ${usd0(ssMeanLow.ssMean.value)} in ${short(ssMeanLow)} to ${usd0(ssMeanHigh.ssMean.value)} in ${short(ssMeanHigh)}, a spread of ${ssMeanSpread.toFixed(2)} times. Average retirement income runs from ${usd0(retMeanMin.retMean.value)} in ${short(retMeanMin)} to ${usd0(retMeanHigh.retMean.value)} in ${short(retMeanHigh)}, ${retMeanSpread.toFixed(2)} times as much.`,
  },
  {
    lead: `Average retirement income is larger than average Social Security income in ${total - retBelowSs.length} of ${total} places.`,
    body: `${retBelowSs.length === 1 ? "The exception is" : "The exceptions are"} ${longList(retBelowSs.map((r) => `${short(r)} (${usd0(r.retMean.value)} against ${usd0(r.ssMean.value)})`))}. The highest averages are in ${longList(retMeanTop.map((r) => `${short(r)} (${usd0(r.retMean.value)})`))}, the lowest in ${longList(retMeanLow.map((r) => `${short(r)} (${usd0(r.retMean.value)})`))}. The survey does not say what kind of pension or account the income comes from.`,
  },
  {
    lead: `${short(wv)} pairs a high share of retirement income with a low amount.`,
    body: `${pct1(wv.retShare.pct)} of its households report retirement income, the ${ordinal(wvRetShareRank)} highest share (the range is ${pct1(retShareMin.retShare.pct)} in ${short(retShareMin)} to ${pct1(retShareHigh.retShare.pct)} in ${short(retShareHigh)}), but they average ${usd0(wv.retMean.value)}, the ${ordinal(wvRetMeanRankFromBottom)} lowest. It also has the highest share of households on Social Security (${pct1(wv.ssShare.pct)}) and the lowest median income for householders 65 and over (${usd0(wv.med65)}).`,
  },
  {
    lead: `Median income for householders 65 and over runs from ${usd0(med65Low.med65)} in ${short(med65Low)} to ${usd0(med65High.med65)} in ${short(med65High)}.`,
    body: `The U.S. median is ${usd0(us.med65)}. ${med65AtLeast70.length} places are at $70,000 or more, and ${med65Under55.length} states are below $55,000 (${longList(med65Under55.map((r) => short(r)))}). This is a household median, so it includes earnings from household members who still work, not only retirement income.`,
  },
  {
    lead: `Higher-income states have fewer households on Social Security, but the ones that receive it get larger amounts.`,
    body: `Across the ${total} places, the correlation between median household income and the share of households receiving Social Security is ${corrSsShareIncome.toFixed(2)}, while the correlation with the average Social Security amount is ${corrSsMeanIncome.toFixed(2)}. The pattern fits a benefit that is based on lifetime earnings and a share that tracks age, but the data cannot prove why.`,
  },
];

const faqs = [
  {
    question: "What percentage of households receive Social Security?",
    answer: `In the ${REPORT.acsYear} American Community Survey, ${pct1(us.ssShare.pct)} of U.S. households (${millions(us.ss)} of ${millions(us.hh)}) received Social Security income. By state the share runs from ${pct1(ssShareMin.ssShare.pct)} in ${short(ssShareMin)} to ${pct1(ssShareHigh.ssShare.pct)} in ${short(ssShareHigh)}, and it is highest where more households have a member 65 or older. The survey counts retirement, survivor, and disability benefits together, so the figure is not limited to retirees.`,
  },
  {
    question: "How much Social Security does the average household receive?",
    answer: `Households that receive Social Security averaged ${usd0(us.ssMean.value)} a year (${usd0(ssMonthly)} a month) in the ${REPORT.acsYear} ACS, from ${usd0(ssMeanLow.ssMean.value)} in ${short(ssMeanLow)} to ${usd0(ssMeanHigh.ssMean.value)} in ${short(ssMeanHigh)}. For comparison, the Social Security Administration reports that the average retired worker received ${usd2(SSA.retiredWorkerAverageMonthly)} a month in ${SSA.month}. A household can include more than one beneficiary, and survey respondents tend to under-report income, so use your own Social Security statement for planning.`,
  },
  {
    question: "Which states have the highest and lowest share of households on Social Security?",
    answer: `${longList(ssShareTop.map((r) => `${short(r)} (${pct1(r.ssShare.pct)})`))} have the highest shares. The lowest are ${longList(ssShareLow.map((r) => `${short(r)} (${pct1(r.ssShare.pct)})`))}. The U.S. figure is ${pct1(us.ssShare.pct)}. The 90% margin of error on the share is within 1 percentage point in ${ssMoeWithin1} of ${total} places and at most ${ssMoeMax.ssShare.moe.toFixed(1)} points (${short(ssMoeMax)}); all are in the CSV.`,
  },
  {
    question: "What share of households have retirement income, and how much is it?",
    answer: `${pct1(us.retShare.pct)} of U.S. households (${millions(us.ret)}) reported retirement, survivor, or disability income in the ${REPORT.acsYear} ACS, averaging ${usd0(us.retMean.value)} a year. That includes regular income from pensions and annuities and regular withdrawals from accounts such as an IRA or 401(k), but not Social Security or money rolled into another account. The average is highest in ${short(retMeanHigh)} (${usd0(retMeanHigh.retMean.value)}) and lowest in ${short(retMeanMin)} (${usd0(retMeanMin.retMean.value)}).`,
  },
  {
    question: "Why do the survey totals for Social Security not match what the SSA pays?",
    answer: `The ${REPORT.acsYear} ACS adds up to ${trillions(us.ssAgg)} of Social Security income reported by households, ${pct1(ssaCoverage)} of the ${trillions(SSA_ANNUALIZED)} a year implied by the Social Security Administration's ${SSA.month} total of ${billions(SSA.totalMonthlyBenefitsMillions * 1e6)} a month. The periods differ, the survey covers households rather than people living abroad or in group quarters, and the Census Bureau warns that income answers come from memory and tend to be under-reported. The dollar levels are therefore best read as a floor, and the report is most useful for comparing states.`,
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau data are public domain, and the Social Security Administration figures are quoted from its published Monthly Statistical Snapshot.`,
  },
];

const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const description = `Households with Social Security and retirement income, average amounts, and income of householders 65+ for all 50 states and DC. ACS ${REPORT.acsYear}, free CSV.`;

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

const citation = `${site.name} (${new Date(REPORT.dateModified).getUTCFullYear()}). ${h1}. ${site.url}${REPORT.path}. Data: U.S. Census Bureau, ${REPORT.acsYear} American Community Survey 1-year estimates (B19055, B19059, B19065, B19069, B19049, B11007); Social Security Administration, Monthly Statistical Snapshot, ${SSA.month}.`;

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data)`,
    description: `Households with Social Security income and with retirement, survivor, or disability income, the average amount for the households that receive each, Social Security plus retirement income per household, the share of households with a member 65 or older, and the median household income of householders 65 and over, with margins of error, for the 50 states, the District of Columbia, and the United States.`,
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
      "social security income by state",
      "retirement income by state",
      "percent of households receiving social security by state",
      "average social security benefit by state",
      "median income of householders 65 and over by state",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsSocialSecurity.href,
      REPORT_SOURCES.acsSocialSecurityAggregate.href,
      REPORT_SOURCES.acsRetirement.href,
      REPORT_SOURCES.acsRetirementAggregate.href,
      REPORT_SOURCES.acsMedianByAge.href,
      REPORT_SOURCES.acsHouseholds65.href,
      REPORT_SOURCES.ssaSnapshot.href,
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

export default function RetirementIncomeByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Social Security and Retirement Income by State", href: REPORT.path },
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
        <span className="text-ink-700">Social Security and Retirement Income by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        {`Published ${longDate.format(new Date(REPORT.datePublished))} · Income data: Census ACS ${REPORT.acsYear} 1-year · Benchmark: SSA Monthly Statistical Snapshot, ${SSA.month}`}
      </p>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          {`In the ${REPORT.acsYear} American Community Survey, `}
          <strong>{`${pct1(us.ssShare.pct)} of U.S. households`}</strong>
          {` received Social Security income, averaging ${usd0(us.ssMean.value)} a year (${usd0(ssMonthly)} a month), and `}
          <strong>{`${pct1(us.retShare.pct)}`}</strong>
          {` had retirement, survivor, or disability income, averaging ${usd0(us.retMean.value)}. By state, the Social Security share runs from ${pct1(ssShareMin.ssShare.pct)} in ${short(ssShareMin)} to ${pct1(ssShareHigh.ssShare.pct)} in ${short(ssShareHigh)}. The Social Security amount varies little (${usd0(ssMeanLow.ssMean.value)} to ${usd0(ssMeanHigh.ssMean.value)}), while average retirement income varies ${retMeanSpread.toFixed(1)} times over, from ${usd0(retMeanMin.retMean.value)} to ${usd0(retMeanHigh.retMean.value)}.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Households with Social Security",
            value: pct1(us.ssShare.pct),
            note: `${millions(us.ss)} of ${millions(us.hh)} households. ${usd0(us.ssMean.value)} a year on average, ${usd0(ssMonthly)} a month`,
          },
          {
            label: "Households with retirement income",
            value: pct1(us.retShare.pct),
            note: `${millions(us.ret)} households. ${usd0(us.retMean.value)} a year on average`,
          },
          {
            label: "Per household, all households",
            value: usd0(us.combinedPerHh.value),
            note: `${usd0(us.ssPerHh.value)} Social Security plus ${usd0(us.retPerHh.value)} retirement income a year`,
          },
          {
            label: "Median income, householder 65+",
            value: usd0(us.med65),
            note: `${short(med65Low)} ${usd0(med65Low.med65)} to ${short(med65High)} ${usd0(med65High.med65)}`,
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
          {findings.map((f) => (
            <li key={f.lead}>
              <strong>{f.lead}</strong>
              {" "}
              {f.body}
            </li>
          ))}
        </ul>

        <h2>The two income sources side by side</h2>
        <p>
          The Census Bureau asks about each income type separately. Social Security income covers retirement,
          survivor, and disability benefits paid by the Social Security Administration (and railroad retirement
          benefits). Retirement income covers regular payments from pensions, annuities, and retirement
          accounts such as an IRA or 401(k), plus survivor and disability pensions from an employer, union,
          or government. Supplemental Security Income is counted separately and is not in either column.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                U.S., {REPORT.acsYear}
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Households
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share of all households
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Total reported
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Average per recipient household
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Average per household, all
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            <tr>
              <td className="px-3 py-2 text-ink-800">Social Security</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.ss)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(us.ssShare.pct)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{trillions(us.ssAgg)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(us.ssMean.value)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(us.ssPerHh.value)}</td>
            </tr>
            <tr>
              <td className="px-3 py-2 text-ink-800">Retirement, survivor, or disability income</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.ret)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(us.retShare.pct)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{trillions(us.retAgg)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(us.retMean.value)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(us.retPerHh.value)}</td>
            </tr>
            <tr className="bg-ink-50 font-semibold">
              <td className="px-3 py-2 text-ink-800">Both added together</td>
              <td className="px-3 py-2 text-right text-ink-500">Overlap, so not added</td>
              <td className="px-3 py-2 text-right text-ink-500">Overlap, so not added</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{trillions(us.ssAgg + us.retAgg)}</td>
              <td className="px-3 py-2 text-right text-ink-500">Not meaningful</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(us.combinedPerHh.value)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Households with both income types appear in both rows, so the household counts cannot be added; the dollars can. The per-household column divides total dollars by all ${count0(us.hh)} households, including those that receive neither.`}
      </p>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar is Social Security plus retirement income per
          household; the other columns show how common each income type is, the average amount for the
          households that receive it, and the median income of households headed by someone 65 or older.
        </p>
        <div className="mt-4">
          <StateRetirementTable rows={tableRows} usCombined={us.combinedPerHh.value} />
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
            {`${total + 1} rows (states, DC, and the U.S.), ${CSV_HEADER.length} columns, CC BY 4.0`}
          </span>
        </div>
      </section>

      <div className="prose mt-12 max-w-none">
        <h2>Seven places side by side</h2>
        <p>
          {`Each row shows the same measures for the places at the ends of the rankings: ${exampleClauses.map((c) => `${short(c.r)} has ${c.text}`).join("; ")}. ${short(secondLargest)}, the second-largest state by households, is added as a large-state example.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Place
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                With Social Security
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Average Social Security, a month
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                With retirement income
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Average retirement income, a year
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Both, per household
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Median income, 65+
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {exampleRows.map(({ label, r }, i) => (
              <tr key={label} className={i === 0 ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.ssShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.ssMean.value / 12)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.retShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.retMean.value)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.combinedPerHh.value)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.med65)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The shaded row is the national figure. Across all ${total} places, the per-household total runs from ${usd0(combinedLow[0].combinedPerHh.value)} in ${short(combinedLow[0])} to ${usd0(combinedTop[0].combinedPerHh.value)} in ${short(combinedTop[0])}; ${longList(combinedTop.map((r) => short(r)))} are the three highest and ${longList(combinedLow.map((r) => short(r)))} the three lowest.`}
      </p>

      <div className="prose mt-10 max-w-none">
        <h2>How the survey compares with the Social Security Administration</h2>
        <p>
          {`The Social Security Administration counts what it pays. In ${SSA.month} it paid ${millions(SSA.beneficiariesThousands * 1000)} people ${billions(SSA.totalMonthlyBenefitsMillions * 1e6)}, an average of ${usd2(SSA.averageMonthlyBenefit)} a month, and ${millions(SSA.retiredWorkersThousands * 1000)} of them retired workers averaging ${usd2(SSA.retiredWorkerAverageMonthly)}. Twelve times the October total is ${trillions(SSA_ANNUALIZED)} a year. Households in the ${REPORT.acsYear} survey reported ${trillions(us.ssAgg)} of Social Security income, ${pct1(ssaCoverage)} of that figure.`}
        </p>
        <p>
          {`The two numbers are not supposed to match. The survey year is ${REPORT.acsYear} and the SSA figure is for ${SSA.month}, after the cost-of-living adjustment that took effect in January 2026. The survey covers households in the 50 states and DC, not people living abroad or in group quarters such as nursing homes. And the survey asks people, while the Census Bureau notes that income answers are often given from memory and tend to be under-reported. The household average of ${usd0(ssMonthly)} a month is only ${pct1(ssVsRetiredWorker)} above the ${usd2(SSA.retiredWorkerAverageMonthly)} the average retired worker gets, even though some households have more than one beneficiary, which is consistent with under-reporting.`}
        </p>
        <p>
          Read the dollar levels as a floor and the differences between states as the signal. Reporting habits
          could differ between states as well, so small gaps are not worth reading into.
        </p>

        <h2>Using this report</h2>
        <ul>
          <li>
            <strong>Turn Social Security into a savings equivalent.</strong>
            {" "}
            {`At a ${REPORT.withdrawalRatePct}% withdrawal rate, the national average of ${usd0(us.ssMean.value)} a year is the income a portfolio of about ${usd0(roundThousand(nestEggUs))} would produce, and the range across states is about ${usd0(roundThousand(nestEggLow))} in ${short(ssMeanLow)} to ${usd0(roundThousand(nestEggHigh))} in ${short(ssMeanHigh)}. Because the survey under-reports, your own benefit estimate may be higher. Put the gap between that income and your target spending into the `}
            <Link href="/calculators/retirement" className="text-brand-600 underline">
              retirement calculator
            </Link>
            {" "}
            or read{" "}
            <Link href="/guides/how-much-to-retire-at-55" className="text-brand-600 underline">
              how much you need to retire at 55
            </Link>
            .
          </li>
          <li>
            <strong>Do not count on a pension.</strong>
            {" "}
            {`Only ${pct1(us.retShare.pct)} of households, about one in four, report any retirement, survivor, or disability income. For most households the second leg of retirement income is savings. Each extra $1,000 a month needs about ${usd0(extra1000Monthly)} at a ${REPORT.withdrawalRatePct}% withdrawal rate, and the `}
            <Link href="/guides/401k-vs-roth-ira" className="text-brand-600 underline">
              401(k) vs Roth IRA guide
            </Link>
            {" "}
            explains which account to fill first.
          </li>
          <li>
            <strong>Check the benchmark against where you will live.</strong>
            {" "}
            {`Households headed by someone 65 or older have a median income of ${usd0(us.med65)} nationally, ${usd0(med65Low.med65)} in ${short(med65Low)}, and ${usd0(med65High.med65)} in ${short(med65High)}. The `}
            <Link href="/guides/net-worth-by-age" className="text-brand-600 underline">
              net worth by age guide
            </Link>
            {" "}
            shows what households have saved at each stage, and the{" "}
            <Link href="/calculators/inflation" className="text-brand-600 underline">
              inflation calculator
            </Link>
            {" "}
            shows what a fixed income buys over time.
          </li>
          <li>
            <strong>Use your own statement for planning.</strong>
            {" "}
            These are averages for households, mixed across ages and claiming ages. Your Social Security
            statement shows an estimate based on your own earnings record, which is a better input than any
            state average.
          </li>
        </ul>

        <h2>How the numbers were built</h2>
        <ul>
          <li>
            <strong>Shares of households</strong>
            {" "}
            are households with the income (B19055 for Social Security, B19059 for retirement income) divided
            by all households. The share of households with a member 65 or older comes from B11007.
          </li>
          <li>
            <strong>Averages for recipient households</strong>
            {" "}
            are the total dollars reported (B19065, B19069) divided by the households that report that
            income. Dividing the same dollars by all households gives the per-household figures, which add
            up across the two sources.
          </li>
          <li>
            <strong>Median income of householders 65 and over</strong>
            {" "}
            is B19049, the median income of households whose householder is 65 or older.
          </li>
          <li>
            <strong>Margins of error</strong>
            {" "}
            are the 90% margins published by the Census Bureau; those for shares, ratios, and sums follow the
            ACS General Handbook (chapter 8) and are in the CSV.
          </li>
        </ul>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>Social Security income is not only retirement.</strong>
            {" "}
            The Census Bureau counts Social Security retirement, survivor, and disability benefits and railroad
            retirement benefits together. A household with Social Security income may include a younger
            person receiving disability or survivor benefits.
          </li>
          <li>
            <strong>Retirement income is regular income only.</strong>
            {" "}
            The Census Bureau counts regular payments from pensions, annuities, and retirement accounts and
            excludes money rolled over or reinvested. Occasional large withdrawals are likely to be missed,
            and survivor and disability pensions are counted alongside retirement pensions.
          </li>
          <li>
            <strong>Averages are for households, not people or typical benefits.</strong>
            {" "}
            {`A household can have two beneficiaries, and a mean is pulled up by large amounts. The ${usd0(us.ssMean.value)} average is not what one person receives, and it should not be compared with the ${usd2(SSA.retiredWorkerAverageMonthly)} monthly average for retired workers without that in mind.`}
          </li>
          <li>
            <strong>The survey under-reports.</strong>
            {" "}
            {`The reported Social Security dollars are ${pct1(ssaCoverage)} of what the SSA's ${SSA.month} total implies for a year. The state rankings are more reliable than the dollar levels.`}
          </li>
          <li>
            <strong>No causes are shown.</strong>
            {" "}
            The data do not say whether a state's retirement income comes from government pensions, private
            pensions, or account withdrawals, and state figures mix older and younger households, ages at
            claiming, and work histories.
          </li>
          <li>
            <strong>This is state-level data for one year.</strong>
            {" "}
            Retirement incomes differ sharply between cities and rural areas inside a state, which this
            report cannot show. The {REPORT.acsYear} ACS was released on October 29, 2026, and the{" "}
            {REPORT.acsYear + 1} estimates are expected in fall {REPORT.acsYear + 2}. We will update the
            report after that release.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsSocialSecurity,
          REPORT_SOURCES.acsSocialSecurityAggregate,
          REPORT_SOURCES.acsRetirement,
          REPORT_SOURCES.acsRetirementAggregate,
          REPORT_SOURCES.acsMedianByAge,
          REPORT_SOURCES.acsHouseholds65,
          REPORT_SOURCES.acsIncome,
          REPORT_SOURCES.acsTenure,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
          REPORT_SOURCES.ssaSnapshot,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for tables B19055, B19059, B19065, B19069, B19049, and B11007 were read from the Census Bureau's ACS 1-year Summary File on November 14, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the household totals agree across tables and with B25003, and the state rows add up to the U.S. row for households, households with Social Security income, and both aggregates (the aggregate sums differ by at most $300 because the Census Bureau rounds them to $100). The Social Security Administration figures are for ${SSA.month}.`}
      />

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Cite or reuse this report</h2>
        <p className="mt-2 text-sm text-ink-600">
          The figures calculated by {site.name} (shares, averages, ratios, margins of error, rankings)
          are licensed under{" "}
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
          <Link href="/embed#retirement" className="text-brand-600 underline">
            Embed the retirement calculator for free
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
            { href: "/calculators/retirement", label: "Retirement Calculator", note: "See if your savings cover the gap" },
            { href: "/calculators/fire-calculator", label: "FIRE Calculator", note: "Test an early retirement target" },
            { href: "/calculators/inflation", label: "Inflation Calculator", note: "See what a fixed income buys later" },
            { href: "/calculators/net-worth", label: "Net Worth Calculator", note: "Add up what you have saved" },
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
          <Link href="/reports/housing-cost-burden-by-state" className="text-brand-600 underline">
            housing cost burden by state report
          </Link>
          ,{" "}
          <Link href="/reports/car-ownership-by-state" className="text-brand-600 underline">
            car ownership by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/how-much-to-retire-at-55" className="text-brand-600 underline">
            how much to retire at 55
          </Link>{" "}
          and{" "}
          <Link href="/guides/401k-vs-roth-ira" className="text-brand-600 underline">
            401(k) vs Roth IRA
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
