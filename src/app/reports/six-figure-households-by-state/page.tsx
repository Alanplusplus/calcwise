import type { Metadata } from "next";
import { AuthorByline } from "@/components/AuthorByline";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateIncomeTable } from "@/components/StateIncomeTable";
import { site } from "@/lib/site";
import { reportCitation, reportH1 } from "@/lib/reports/press";
import {
  AFFORDABILITY_PINNED,
  CSV_HEADER,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_LADDER,
  US_RESULT,
  WAGE_EARNERS,
  WAGE_EARNER_SHARES,
  correlation,
  count0,
  getStateResult,
  millions,
  pct1,
  usd0,
  type IncomeBandResult,
} from "@/lib/reports/six-figure-households-by-state";

const title = "Percent of Households Making $100K or More by State";
const h1 = reportH1(REPORT.slug);

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Name for running text: "DC" reads better in a sentence than "District of Columbia", and avoids a double period at the end of a sentence. */
const short = (r: { abbr: string; name: string }) => (r.abbr === "DC" ? "DC" : r.name);

const ordinal = (n: number) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : n % 10]}`;
};

function mustGet(abbr: string) {
  const row = getStateResult(abbr);
  if (!row) throw new Error(`Missing state ${abbr}`);
  return row;
}

const sortedBy = (fn: (r: IncomeBandResult) => number) => [...STATE_RESULTS].sort((a, b) => fn(b) - fn(a));

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;
const benchmark = REPORT.benchmarkIncome;
const benchmarkLabel = usd0(benchmark);

const byShare = STATE_RESULTS; // already ranked by the share of households at $100,000 or more
const shareHigh = byShare[0];
const shareLow = byShare[total - 1];
const shareTop = byShare.slice(0, 4);
const shareBottom = byShare.slice(-4).reverse();
const majority = byShare.filter((r) => r.h100Share.pct >= 50);
const medianAtBenchmark = byShare.filter((r) => r.income >= benchmark);
const closestBelow = sortedBy((r) => r.income).find((r) => r.income < benchmark)!;
const atLeast45 = byShare.filter((r) => r.h100Share.pct >= 45);
const under35 = byShare.filter((r) => r.h100Share.pct < 35);
const moeMax = sortedBy((r) => r.h100Share.moe)[0];
const moeWithin1 = STATE_RESULTS.filter((r) => r.h100Share.moe <= 1).length;

const byQ4 = sortedBy((r) => r.q4);
const q4High = byQ4[0];
const q4Low = byQ4[total - 1];
const aboveQuintileLine = STATE_RESULTS.filter((r) => r.q4 <= benchmark);
const topCoded = STATE_RESULTS.filter((r) => r.top5Coded);
const notTopCoded = STATE_RESULTS.filter((r) => !r.top5Coded);
const above60th = [...STATE_RESULTS]
  .filter((r) => r.q3 <= benchmark)
  .sort((a, b) => b.below100Share.pct - a.below100Share.pct);
const percentileHigh = sortedBy((r) => r.below100Share.pct)[0];
const percentileLow = sortedBy((r) => r.below100Share.pct)[total - 1];

const byRatio = sortedBy((r) => r.femaleToMale.value);
const ratioHigh = byRatio[0];
const ratioLow = byRatio[total - 1];
const maleAtBenchmark = STATE_RESULTS.filter((r) => r.maleFt >= benchmark);
const byMale = sortedBy((r) => r.maleFt);
const maleHigh = byMale[0];
const maleLow = byMale[total - 1];

const byRent = sortedBy((r) => r.rentShare);
const rentHigh = byRent[0];
const rentLow = byRent[total - 1];
const byPay = sortedBy((r) => r.paymentShare);
const payHigh = byPay[0];
const payLow = byPay[total - 1];
const paySpread = payHigh.paymentShare / payLow.paymentShare;
const payOverHalf = byPay.filter((r) => r.paymentShare > 50);
const meets = STATE_RESULTS.filter((r) => r.meetsGuideline);
const misses = STATE_RESULTS.filter((r) => !r.meetsGuideline);
const balanced = byShare.filter((r) => r.h100Share.pct >= us.h100Share.pct && r.meetsGuideline);

const byGini = sortedBy((r) => r.gini);
const giniHigh = byGini[0];
const giniLow = byGini[total - 1];

const corrPay = correlation(
  STATE_RESULTS.map((r) => r.h100Share.pct),
  STATE_RESULTS.map((r) => r.paymentShare),
);
const corrRent = correlation(
  STATE_RESULTS.map((r) => r.h100Share.pct),
  STATE_RESULTS.map((r) => r.rentShare),
);
const corrGini = correlation(
  STATE_RESULTS.map((r) => r.h100Share.pct),
  STATE_RESULTS.map((r) => r.gini),
);

const bySize = [...STATE_RESULTS].sort((a, b) => b.hh - a.hh);
const largestState = bySize[0];

// The copy below describes the sign and size of three correlations and says the households with a majority at $100,000 are exactly the
// places where the median household income reaches $100,000; fail the build if a data refresh changes that.
if (
  corrPay < 0.5 ||
  corrRent < 0.5 ||
  Math.abs(corrGini) >= 0.3 ||
  majority.map((r) => r.abbr).join() !== medianAtBenchmark.map((r) => r.abbr).join() ||
  aboveQuintileLine.length !== 0 ||
  maleAtBenchmark.length > 2
) {
  throw new Error("The six-figure household findings no longer match the data. Rewrite the correlation and ranking findings.");
}

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  h100: r.h100Share.pct,
  h100Moe: r.h100Share.moe,
  h150: r.h150Share.pct,
  h200: r.h200Share.pct,
  income: r.income,
  q4: r.q4,
  rentShare: r.rentShare,
  paymentShare: r.paymentShare,
}));

const exampleClauses: { r: IncomeBandResult; text: string }[] = [
  { r: shareHigh, text: "the highest share of households at $100,000 or more" },
  { r: shareLow, text: "the lowest share of households at $100,000 or more" },
  { r: q4High, text: "the highest income needed to reach the top 20%" },
  { r: payHigh, text: "the largest share of $100,000 taken by the payment on the median home" },
  { r: rentHigh, text: "the largest share of $100,000 taken by median rent" },
  { r: payLow, text: "the smallest share taken by the payment on the median home" },
  { r: largestState, text: "the most households" },
];
const exampleGroups: { r: IncomeBandResult; texts: string[] }[] = [];
for (const c of exampleClauses) {
  const hit = exampleGroups.find((g) => g.r.abbr === c.r.abbr);
  if (hit) hit.texts.push(c.text);
  else exampleGroups.push({ r: c.r, texts: [c.text] });
}
const exampleRows = [
  { label: "United States", r: us as Omit<IncomeBandResult, "rank"> },
  ...exampleGroups.map((g) => ({ label: g.r.name, r: g.r as Omit<IncomeBandResult, "rank"> })),
];

const findings: { lead: string; body: string }[] = [
  {
    lead: `${pct1(us.h100Share.pct)} of U.S. households (${millions(us.h100)} of ${millions(us.hh)}) have income of $100,000 or more.`,
    body: `${pct1(us.h150Share.pct)} are at $150,000 or more and ${pct1(us.h200Share.pct)} are at $200,000 or more. A household at exactly $100,000 sits at about the ${ordinal(Math.round(us.below100Share.pct))} percentile, because ${pct1(us.below100Share.pct)} of households have less. This is household income: it adds up everyone 15 or older who lives in the home, before tax, so it is not the same thing as one person's salary.`,
  },
  {
    lead: `The share runs from ${pct1(shareLow.h100Share.pct)} in ${short(shareLow)} to ${pct1(shareHigh.h100Share.pct)} in ${short(shareHigh)}.`,
    body: `${longList(shareTop.map((r) => `${short(r)} (${pct1(r.h100Share.pct)})`))} are the highest, and the lowest are ${longList(shareBottom.map((r) => `${short(r)} (${pct1(r.h100Share.pct)})`))}. ${atLeast45.length} places are at 45% or more and ${under35.length} are below 35%. The margin of error on the share is within 1 point in ${moeWithin1} of ${total} places and at most ${moeMax.h100Share.moe.toFixed(1)} points (${short(moeMax)}).`,
  },
  {
    lead: `Only ${majority.length} places have a majority of households at $100,000 or more, which makes them the only places where the median household income reaches $100,000.`,
    body: `They are ${longList(majority.map((r) => short(r)))}. Everywhere else the median household income is below $100,000; ${short(closestBelow)} comes closest at ${usd0(closestBelow.income)}. The U.S. median is ${usd0(us.income)}.`,
  },
  {
    lead: `$100,000 is not a top-20% household income in any state.`,
    body: `The income needed to reach the top 20% of households is ${usd0(us.q4)} nationally and runs from ${usd0(q4Low.q4)} in ${short(q4Low)} to ${usd0(q4High.q4)} in ${short(q4High)}. A $100,000 household is above the 60th percentile in ${above60th.length} places (the third-quintile limit is under $100,000), led by ${longList(above60th.slice(0, 3).map((r) => `${short(r)} (${ordinal(Math.round(r.below100Share.pct))} percentile)`))}, and it sits lowest in ${short(percentileLow)}, at the ${ordinal(Math.round(percentileLow.below100Share.pct))} percentile. The lower limit of the top 5% is top-coded at "$250,000 or more" in the U.S. and in ${topCoded.length} of ${total} places; only ${longList(notTopCoded.map((r) => short(r)))} publish a lower figure.`,
  },
  {
    lead: `One earner is a different story: ${pct1(WAGE_EARNER_SHARES.atLeast100k)} of W-2 wage earners made $100,000 or more in ${WAGE_EARNERS.year}.`,
    body: `The Social Security Administration counted ${millions(WAGE_EARNER_SHARES.count100k)} of ${millions(WAGE_EARNERS.total)} wage earners at that level, ${pct1(WAGE_EARNER_SHARES.atLeast150k)} at $150,000 or more, and ${pct1(WAGE_EARNER_SHARES.atLeast200k)} at $200,000 or more. The median wage earner had net compensation of ${usd0(WAGE_EARNERS.medianNetCompensation)}. That count includes part-time and part-year workers, so it understates what a full-time worker earns, and it is a different group from households.`,
  },
  {
    lead: `The median full-time, year-round worker earns ${usd0(us.maleFt)} (men) or ${usd0(us.femaleFt)} (women), well under $100,000.`,
    body: `$100,000 is ${(benchmark / us.maleFt).toFixed(2)} times the median man's full-time earnings and ${(benchmark / us.femaleFt).toFixed(2)} times the median woman's. By state the men's median runs from ${usd0(maleLow.maleFt)} in ${short(maleLow)} to ${usd0(maleHigh.maleFt)} in ${short(maleHigh)}${maleAtBenchmark.length === 1 ? `, the only place where it reaches $100,000` : ""}. Women's median earnings are ${pct1(us.femaleToMale.value * 100)} of men's nationally, from ${pct1(ratioLow.femaleToMale.value * 100)} in ${short(ratioLow)} to ${pct1(ratioHigh.femaleToMale.value * 100)} in ${short(ratioHigh)}.`,
  },
  {
    lead: `Where more households reach $100,000, living costs more.`,
    body: `Across the ${total} places the share of households at $100,000 or more has a correlation of ${corrPay.toFixed(2)} with the payment on the median home as a share of a $100,000 income and ${corrRent.toFixed(2)} with median rent as a share of it. Median rent would take ${pct1(rentLow.rentShare)} of $100,000 in ${short(rentLow)} and ${pct1(rentHigh.rentShare)} in ${short(rentHigh)}. The payment on the median home (principal, interest, and property tax) would take ${pct1(payLow.paymentShare)} in ${short(payLow)} and ${pct1(payHigh.paymentShare)} in ${short(payHigh)}, ${paySpread.toFixed(1)} times as much.`,
  },
  {
    lead: `A $100,000 household meets the 28% housing guideline for the median home in ${meets.length} of ${total} places.`,
    body: `On the mortgage affordability report's terms (${AFFORDABILITY_PINNED.downPaymentPct}% down, ${AFFORDABILITY_PINNED.rate.toFixed(2)}% on ${AFFORDABILITY_PINNED.termYears} years), the payment on the U.S. median home is ${usd0(us.payment)} a month, ${pct1(us.paymentShare)} of $100,000, and the income that meets the guideline is ${usd0(us.incomeNeeded)}. In ${payOverHalf.length === 0 ? "no place" : `${longList(payOverHalf.map((r) => short(r)))}`} the payment takes more than half of $100,000 before any tax. Only ${longList(balanced.map((r) => short(r)))} combine an above-average share of $100,000 households with a median home that a $100,000 income can carry under the guideline.`,
  },
  {
    lead: `Inequality is highest in ${short(giniHigh)} and lowest in ${short(giniLow)}, and is unrelated to how many households reach $100,000.`,
    body: `The Gini index runs from ${giniLow.gini.toFixed(3)} in ${short(giniLow)} to ${giniHigh.gini.toFixed(3)} in ${short(giniHigh)} (${us.gini.toFixed(3)} nationally; 0 is perfect equality). Its correlation with the share of six-figure households is ${corrGini.toFixed(2)}.`,
  },
];

const faqs = [
  {
    question: "What percentage of households make $100,000 or more?",
    answer: `In the ${REPORT.acsYear} American Community Survey, ${pct1(us.h100Share.pct)} of U.S. households (${millions(us.h100)} of ${millions(us.hh)}) had income of $100,000 or more, ${pct1(us.h150Share.pct)} had $150,000 or more, and ${pct1(us.h200Share.pct)} had $200,000 or more. By state the share at $100,000 or more runs from ${pct1(shareLow.h100Share.pct)} in ${short(shareLow)} to ${pct1(shareHigh.h100Share.pct)} in ${short(shareHigh)}. The 90% margin of error is within 1 percentage point in ${moeWithin1} of ${total} places and at most ${moeMax.h100Share.moe.toFixed(1)} points (${short(moeMax)}); all are in the CSV.`,
  },
  {
    question: "Which states have the most six-figure households?",
    answer: `${longList(shareTop.map((r) => `${short(r)} (${pct1(r.h100Share.pct)})`))} have the highest shares of households with income of $100,000 or more. The lowest are ${longList(shareBottom.map((r) => `${short(r)} (${pct1(r.h100Share.pct)})`))}. Only ${longList(majority.map((r) => short(r)))} have a majority of households at that level, and they are also the only places where the median household income is $100,000 or more.`,
  },
  {
    question: "What percentile is a $100,000 household income?",
    answer: `Nationally, ${pct1(us.below100Share.pct)} of households have income below $100,000, so $100,000 is about the ${ordinal(Math.round(us.below100Share.pct))} percentile. By state it runs from the ${ordinal(Math.round(percentileLow.below100Share.pct))} percentile in ${short(percentileLow)} to the ${ordinal(Math.round(percentileHigh.below100Share.pct))} in ${short(percentileHigh)}. The top 20% of households start at ${usd0(us.q4)} nationally, so $100,000 is not a top-quintile household income in any state.`,
  },
  {
    question: "Is $100,000 a good salary for one person?",
    answer: `By earnings it is well above typical: the median U.S. worker who worked full-time, year-round earned ${usd0(us.maleFt)} (men) or ${usd0(us.femaleFt)} (women) in ${REPORT.acsYear}, and ${pct1(WAGE_EARNER_SHARES.atLeast100k)} of all W-2 wage earners made $100,000 or more in ${WAGE_EARNERS.year} (Social Security Administration). Whether it feels comfortable depends on where you live: the payment on the median home would take ${pct1(payLow.paymentShare)} of a $100,000 income in ${short(payLow)} and ${pct1(payHigh.paymentShare)} in ${short(payHigh)}. Our guide to whether $100,000 is a good salary turns this into take-home pay and a budget.`,
  },
  {
    question: "How far does $100,000 go on housing?",
    answer: `On the median rent, $100,000 pays ${pct1(us.rentShare)} of income nationally ($${count0(us.rent)} a month) and between ${pct1(rentLow.rentShare)} in ${short(rentLow)} and ${pct1(rentHigh.rentShare)} in ${short(rentHigh)}. Buying the median home takes ${pct1(us.paymentShare)} of $100,000 nationally for principal, interest, and property tax at ${AFFORDABILITY_PINNED.rate.toFixed(2)}% with ${AFFORDABILITY_PINNED.downPaymentPct}% down. A $100,000 income meets the 28% guideline for the median home in ${meets.length} of ${total} places.`,
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau and Social Security Administration data are public domain.`,
  },
];

const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const description = `Households earning $100,000 or more in all 50 states and DC, the percentile of $100K, top-20% cutoffs, and what housing takes of it. ACS ${REPORT.acsYear}, free CSV.`;

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

const citation = reportCitation(REPORT.slug);

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data)`,
    description: `Households with income of $100,000, $150,000, and $200,000 or more, household income quintile limits, the Gini index, median earnings of full-time men and women, and the share of a $100,000 income taken by median rent and by the payment on the median home, with margins of error, for the 50 states, the District of Columbia, and the United States.`,
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
      "percent of households making over 100k by state",
      "six figure households by state",
      "what percentile is 100k household income",
      "household income needed for top 20 percent by state",
      "is 100k a good salary by state",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsDistribution.href,
      REPORT_SOURCES.acsQuintiles.href,
      REPORT_SOURCES.acsGini.href,
      REPORT_SOURCES.acsEarnings.href,
      REPORT_SOURCES.ssaWages.href,
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

export default function SixFigureHouseholdsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Six-Figure Households by State", href: REPORT.path },
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
        <span className="text-ink-700">Six-Figure Households by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        {`Published ${longDate.format(new Date(REPORT.datePublished))} · Data: Census ACS ${REPORT.acsYear} 1-year · Tables B19001, B19080, B19083, B20017`}
      </p>
      <AuthorByline />

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          {`In the ${REPORT.acsYear} American Community Survey, `}
          <strong>{`${pct1(us.h100Share.pct)} of U.S. households`}</strong>
          {` have income of $100,000 or more, so a $100,000 household sits at about the ${ordinal(Math.round(us.below100Share.pct))} percentile. The share runs from ${pct1(shareLow.h100Share.pct)} in ${short(shareLow)} to ${pct1(shareHigh.h100Share.pct)} in ${short(shareHigh)}. The top 20% of households start at `}
          <strong>{usd0(us.q4)}</strong>
          {`, and the payment on the median home takes ${pct1(us.paymentShare)} of a $100,000 income, from ${pct1(payLow.paymentShare)} in ${short(payLow)} to ${pct1(payHigh.paymentShare)} in ${short(payHigh)}.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Households at $100K or more",
            value: pct1(us.h100Share.pct),
            note: `${millions(us.h100)} of ${millions(us.hh)} households. ${short(shareLow)} ${pct1(shareLow.h100Share.pct)} to ${short(shareHigh)} ${pct1(shareHigh.h100Share.pct)}`,
          },
          {
            label: "Percentile of a $100K household",
            value: ordinal(Math.round(us.below100Share.pct)),
            note: `${pct1(us.below100Share.pct)} of households have less. Median household income is ${usd0(us.income)}`,
          },
          {
            label: "Top 20% of households start at",
            value: usd0(us.q4),
            note: `${usd0(q4Low.q4)} in ${short(q4Low)} to ${usd0(q4High.q4)} in ${short(q4High)}`,
          },
          {
            label: "Median-home payment, % of $100K",
            value: pct1(us.paymentShare),
            note: `${usd0(us.payment)} a month. ${pct1(payLow.paymentShare)} in ${short(payLow)} to ${pct1(payHigh.paymentShare)} in ${short(payHigh)}`,
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

        <h2>Households versus wage earners</h2>
        <p>
          {`A household is not a worker. The Census Bureau counts the income of every person 15 or older in the home, so a couple earning $55,000 each is a six-figure household, while the Social Security Administration counts each W-2 wage earner separately. The table sets the two side by side for ${REPORT.acsYear}. For the personal-income version of the question, with take-home pay and a budget, see our guide `}
          <Link href="/guides/is-100k-a-good-salary" className="text-brand-600 underline">
            is $100,000 a good salary
          </Link>
          .
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                At or above
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                U.S. households (Census ACS {REPORT.acsYear})
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                W-2 wage earners (SSA {WAGE_EARNERS.year})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {[
              { level: "$100,000", hh: us.h100Share.pct, earners: WAGE_EARNER_SHARES.atLeast100k },
              { level: "$150,000", hh: us.h150Share.pct, earners: WAGE_EARNER_SHARES.atLeast150k },
              { level: "$200,000", hh: us.h200Share.pct, earners: WAGE_EARNER_SHARES.atLeast200k },
            ].map((row) => (
              <tr key={row.level}>
                <td className="px-3 py-2 text-ink-800">{row.level}</td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold text-ink-900">{pct1(row.hh)}</td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold text-ink-900">{pct1(row.earners)}</td>
              </tr>
            ))}
            <tr className="bg-ink-50">
              <td className="px-3 py-2 text-ink-800">Median</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(us.income)} household income</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                {usd0(WAGE_EARNERS.medianNetCompensation)} net compensation
              </td>
            </tr>
            <tr className="bg-ink-50">
              <td className="px-3 py-2 text-ink-800">Median, full-time year-round (ACS)</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700" colSpan={2}>
                {usd0(us.maleFt)} men, {usd0(us.femaleFt)} women
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The wage-earner column counts every W-2 earner, part-time and part-year included (${millions(WAGE_EARNERS.total)} in all), and uses net compensation, which adds pre-tax retirement plan contributions to wages. The household column and the full-time medians come from the ACS. Households are measured in ${REPORT.acsYear} dollars before tax.`}
      </p>

      <div className="prose mt-10 max-w-none">
        <h2>The U.S. household income ladder</h2>
        <p>
          {`The 16 brackets the Census Bureau publishes in table B19001, grouped into seven bands. ${pct1(US_LADDER[6].share.pct)} of households are at $200,000 or more, and ${pct1(US_LADDER[0].share.pct + US_LADDER[1].share.pct)} are below $50,000.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Household income, U.S. {REPORT.acsYear}
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Households
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share of households
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share at or above the band
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {US_LADDER.map((band, i) => {
              const atOrAbove = US_LADDER.slice(i).reduce((s, b) => s + b.share.pct, 0);
              return (
                <tr key={band.label} className={band.label.startsWith("$100,000") ? "bg-brand-50" : ""}>
                  <td className="px-3 py-2 text-ink-800">{band.label}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(band.households)}</td>
                  <td className="px-3 py-2 text-right tabular-nums font-semibold text-ink-900">
                    {pct1(band.share.pct)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(atOrAbove)}</td>
                </tr>
              );
            })}
            <tr className="bg-ink-50 font-semibold">
              <td className="px-3 py-2 text-ink-800">All households</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.hh)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-900">100.0%</td>
              <td className="px-3 py-2" />
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Each band's margin of error on the share is below ${(Math.floor(Math.max(...US_LADDER.map((b) => b.share.moe)) * 10) + 1) / 10} points. Quintile upper limits for the U.S.: ${usd0(us.q1)}, ${usd0(us.q2)}, ${usd0(us.q3)}, and ${usd0(us.q4)}; the lower limit of the top 5% is top-coded at "$250,000 or more".`}
      </p>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar is the share of households with income of $100,000 or
          more; the other columns show how many reach $150,000 and $200,000, the median household income, the
          income at which the top 20% begins, and how much of a $100,000 income median rent and the payment on the
          median home would take.
        </p>
        <div className="mt-4">
          <StateIncomeTable rows={tableRows} usShare={us.h100Share.pct} />
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
        <h2>The extremes side by side</h2>
        <p>
          {`Each row shows the same measures for the places at the ends of the rankings: ${exampleGroups.map((g) => `${short(g.r)} has ${longList(g.texts)}`).join("; ")}.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Place
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Households at $100K or more
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Percentile of $100K
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Median household income
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Top 20% starts at
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Median rent, % of $100K
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Median-home payment, % of $100K
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Income for median home at 28%
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {exampleRows.map(({ label, r }, i) => (
              <tr key={label} className={i === 0 ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.h100Share.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {ordinal(Math.round(r.below100Share.pct))}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.income)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.q4)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.rentShare)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.paymentShare)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.incomeNeeded)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The shaded row is the national figure. The housing columns use the median gross rent from the rent vs. buy report and, for the home payment, the mortgage affordability report's terms: ${AFFORDABILITY_PINNED.downPaymentPct}% down, ${AFFORDABILITY_PINNED.rate.toFixed(2)}% (Freddie Mac, ${AFFORDABILITY_PINNED.rateDate}), ${AFFORDABILITY_PINNED.termYears} years, plus median property tax, with no insurance.`}
      </p>

      <div className="prose mt-10 max-w-none">
        <h2>Using this report</h2>
        <ul>
          <li>
            <strong>Place your own income.</strong>
            {" "}
            {`Use household income if you share expenses with a partner and personal earnings if you do not. $100,000 is the ${ordinal(Math.round(us.below100Share.pct))} percentile of households nationally but well above the median full-time earner (${usd0(us.maleFt)} for men, ${usd0(us.femaleFt)} for women). The `}
            <Link href="/guides/is-100k-a-good-salary" className="text-brand-600 underline">
              guide to whether $100,000 is a good salary
            </Link>
            {" "}
            adds take-home pay and a budget.
          </li>
          <li>
            <strong>Turn gross pay into take-home pay.</strong>
            {" "}
            {`Every figure here is before tax. The `}
            <Link href="/calculators/paycheck" className="text-brand-600 underline">
              paycheck calculator
            </Link>
            {" "}
            shows what is left after federal tax, Social Security, Medicare, and your state's income tax, and the{" "}
            <Link href="/calculators/salary-to-hourly" className="text-brand-600 underline">
              salary to hourly calculator
            </Link>
            {" "}
            converts $100,000 into an hourly rate.
          </li>
          <li>
            <strong>Check the home you could carry.</strong>
            {" "}
            {`At ${AFFORDABILITY_PINNED.rate.toFixed(2)}% the median home needs ${usd0(us.incomeNeeded)} of income to meet the 28% guideline nationally, and ${usd0(payLow.incomeNeeded)} in ${short(payLow)} against ${usd0(payHigh.incomeNeeded)} in ${short(payHigh)}. The `}
            <Link href="/calculators/home-affordability" className="text-brand-600 underline">
              home affordability calculator
            </Link>
            {" "}
            runs it for your income, debts, and down payment, and the{" "}
            <Link href="/reports/mortgage-affordability-by-state" className="text-brand-600 underline">
              mortgage affordability report
            </Link>
            {" "}
            ranks every state.
          </li>
          <li>
            <strong>Compare states on rent, not only on salary.</strong>
            {" "}
            {`Median rent takes ${pct1(rentLow.rentShare)} of $100,000 in ${short(rentLow)} and ${pct1(rentHigh.rentShare)} in ${short(rentHigh)}. The `}
            <Link href="/reports/housing-cost-burden-by-state" className="text-brand-600 underline">
              housing cost burden report
            </Link>
            {" "}
            shows how many households actually pay more than 30% of income, and the{" "}
            <Link href="/calculators/budget-50-30-20" className="text-brand-600 underline">
              50/30/20 budget calculator
            </Link>
            {" "}
            splits what remains.
          </li>
        </ul>

        <h2>How the numbers were built</h2>
        <ul>
          <li>
            <strong>Shares of households</strong>
            {" "}
            are the households in an income band divided by all households in the ACS income distribution
            (B19001): $100,000 or more is the four top brackets added up, $150,000 or more the top two, and
            $200,000 or more the top one. Household income is the sum of the pre-tax cash income of every person
            15 or older in the home, in {REPORT.acsYear} dollars; it excludes non-cash benefits such as SNAP and
            employer health insurance.
          </li>
          <li>
            <strong>Percentile of $100,000</strong>
            {" "}
            is the share of households below $100,000, which is 100 minus the share at $100,000 or more.
            Quintile limits (B19080) are published by the Census Bureau; the limit of the top 5% is top-coded at
            $250,001 where it exceeds $250,000.
          </li>
          <li>
            <strong>Full-time earnings and inequality</strong>
            {" "}
            are the median earnings of men and of women who worked full-time, year-round (B20017) and the Gini
            index (B19083). The women-to-men ratio is the ratio of the two medians.
          </li>
          <li>
            <strong>Rent and home payment shares</strong>
            {" "}
            take the median gross rent (B25064) and the payment on the median home (B25077, B25103) from the rent
            vs. buy and mortgage affordability reports, so every report uses the same figures, and divide the
            yearly total by $100,000. The payment is principal and interest on a loan for 80% of the median value
            plus median real estate tax; insurance and maintenance are not included. The 28% guideline column is
            the income at which that payment equals 28% of gross monthly income.
          </li>
          <li>
            <strong>Margins of error</strong>
            {" "}
            are the 90% margins published by the Census Bureau; those for shares, ratios, and sums follow the ACS
            General Handbook (chapter 8) and are in the CSV. The wage-earner figures are from the Social Security
            Administration's full W-2 count and have no sampling error.
          </li>
        </ul>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>Household income is not a salary.</strong>
            {" "}
            It includes every earner in the home plus Social Security, retirement income, interest, and rent. A
            household of two retirees and a household of one 28-year-old are counted the same way.
          </li>
          <li>
            <strong>Everything is before tax.</strong>
            {" "}
            Federal income tax, payroll tax, and state and local tax can take a fifth to a quarter of $100,000,
            and they differ by state. Nothing here is take-home pay.
          </li>
          <li>
            <strong>Only housing is priced.</strong>
            {" "}
            The rent and home payment columns leave out groceries, health care, childcare, transportation,
            utilities, and insurance, which also vary by state. A place where $100,000 covers housing easily is
            not necessarily cheap overall.
          </li>
          <li>
            <strong>Medians hide cities.</strong>
            {" "}
            A state median for rent or home value blends expensive metros with cheap rural areas; a $100,000
            income can feel very different in San Francisco and in the rest of California.
          </li>
          <li>
            <strong>The top tail is top-coded.</strong>
            {" "}
            The Census Bureau does not publish the lower limit of the top 5% above $250,001, and the highest
            income bracket is "$200,000 or more", so this report cannot rank the very top.
          </li>
          <li>
            <strong>The wage-earner count is a different group.</strong>
            {" "}
            The Social Security Administration's W-2 statistics include part-time and part-year workers and
            leave out self-employment income, so they are lower than full-time earnings would be. This is
            state-level data for one year: the {REPORT.acsYear} ACS was released on October 29, 2026, and the{" "}
            {REPORT.acsYear + 1} estimates are expected in fall {REPORT.acsYear + 2}. We will update the report
            after that release.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsDistribution,
          REPORT_SOURCES.acsQuintiles,
          REPORT_SOURCES.acsGini,
          REPORT_SOURCES.acsEarnings,
          REPORT_SOURCES.acsIncome,
          REPORT_SOURCES.acsTenure,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
          REPORT_SOURCES.ssaWages,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for tables B19001, B19080, B19083, and B20017 were read from the Census Bureau's ACS 1-year Summary File on November 19, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the 16 income brackets add up to the household total, which equals the B25003 household count; the median household income equals the B19013 figure used in the mortgage affordability report; and the state rows add up exactly to the U.S. row. The Social Security Administration figures are from its Wage Statistics for ${WAGE_EARNERS.year} table of W-2 wage earners by net compensation.`}
      />

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Cite or reuse this report</h2>
        <p className="mt-2 text-sm text-ink-600">
          The figures calculated by {site.name} (shares, ratios, margins of error, rankings) are licensed
          under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline"
          >
            CC BY 4.0
          </a>
          : you may copy, chart, and republish them, including commercially, with a link back to this
          page. The Census Bureau and Social Security Administration inputs are public domain.
        </p>
        <p className="mt-3 rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-700">{citation}</p>
        <p className="mt-3 text-sm text-ink-600">
          Writing about this data? The{" "}
          <Link href="/reports/press" className="text-brand-600 underline">
            press page
          </Link>{" "}
          has a citation for every report, the data dictionary of each CSV, and the limits of the data.
        </p>
        <p className="mt-3 text-sm text-ink-600">
          Want a calculator on your site?{" "}
          <Link href="/embed#paycheck" className="text-brand-600 underline">
            Embed the paycheck calculator for free
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
            { href: "/calculators/paycheck", label: "Paycheck Calculator", note: "Take-home pay after federal and state tax" },
            { href: "/calculators/salary-to-hourly", label: "Salary to Hourly Calculator", note: "Turn $100,000 into an hourly rate" },
            { href: "/calculators/home-affordability", label: "Home Affordability Calculator", note: "How much house your income supports" },
            { href: "/calculators/budget-50-30-20", label: "50/30/20 Budget Calculator", note: "Split take-home pay into needs, wants, savings" },
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
          <Link href="/reports/mortgage-affordability-by-state" className="text-brand-600 underline">
            mortgage affordability by state report
          </Link>
          ,{" "}
          <Link href="/reports/rent-vs-buy-by-state" className="text-brand-600 underline">
            rent vs. buy by state report
          </Link>
          ,{" "}
          <Link href="/reports/retirement-income-by-state" className="text-brand-600 underline">
            Social Security and retirement income by state report
          </Link>
          ,{" "}
          <Link href="/reports/self-employment-by-state" className="text-brand-600 underline">
            self-employment by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/is-100k-a-good-salary" className="text-brand-600 underline">
            is $100,000 a good salary
          </Link>
          ,{" "}
          <Link href="/guides/salary-vs-hourly-pay" className="text-brand-600 underline">
            salary vs hourly pay
          </Link>
          ,{" "}
          <Link href="/guides/how-much-should-a-freelancer-charge" className="text-brand-600 underline">
            how much should a freelancer charge
          </Link>
          , and{" "}
          <Link href="/guides/50-30-20-budget-rule" className="text-brand-600 underline">
            the 50/30/20 budget rule
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
