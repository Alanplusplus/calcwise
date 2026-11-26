import type { Metadata } from "next";
import { AuthorByline } from "@/components/AuthorByline";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateMortgageTable } from "@/components/StateMortgageTable";
import { site } from "@/lib/site";
import { REPORT as RETIREMENT_REPORT } from "@/lib/reports/retirement-income-by-state";
import {
  CSV_HEADER,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_AGE_LADDER,
  US_RESULT,
  correlation,
  count0,
  getStateResult,
  millions,
  pct1,
  usd0,
  type MortgageResult,
} from "@/lib/reports/mortgage-free-homeowners-by-state";

const title = "Share of Homeowners Without a Mortgage by State";
const h1 = "Mortgage-Free Homeowners by State: Who Owns Free and Clear";

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Name for running text: "DC" reads better in a sentence than "District of Columbia", and avoids a double period at the end of a sentence. */
const short = (r: { abbr: string; name: string }) => (r.abbr === "DC" ? "DC" : r.name);

const roundThousand = (n: number) => Math.round(n / 1000) * 1000;

function mustGet(abbr: string) {
  const row = getStateResult(abbr);
  if (!row) throw new Error(`Missing state ${abbr}`);
  return row;
}

const sortedBy = (fn: (r: MortgageResult) => number) => [...STATE_RESULTS].sort((a, b) => fn(b) - fn(a));

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;
const withdrawalRate = RETIREMENT_REPORT.withdrawalRatePct / 100;

const byNo = STATE_RESULTS; // already ranked by the share without a mortgage
const noTop = byNo.slice(0, 4);
const noLow = byNo.slice(-4).reverse();
const noHigh = byNo[0];
const noMin = byNo[total - 1];
const majorityFree = byNo.filter((r) => r.noMortShare.pct >= 50);
const atLeast45 = byNo.filter((r) => r.noMortShare.pct >= 45);
const under40 = byNo.filter((r) => r.noMortShare.pct < 40);
const noMoeMax = [...STATE_RESULTS].sort((a, b) => b.noMortShare.moe - a.noMortShare.moe)[0];
const noMoeWithin1 = STATE_RESULTS.filter((r) => r.noMortShare.moe <= 1).length;

const corrNoIncome = correlation(
  STATE_RESULTS.map((r) => r.noMortShare.pct),
  STATE_RESULTS.map((r) => r.income),
);
const corrNoValue = correlation(
  STATE_RESULTS.map((r) => r.noMortShare.pct),
  STATE_RESULTS.map((r) => r.value),
);
const corrNoAge = correlation(
  STATE_RESULTS.map((r) => r.noMortShare.pct),
  STATE_RESULTS.map((r) => r.hh65Pct),
);

const by65 = sortedBy((r) => r.mort65Share.pct);
const mort65High = by65[0];
const mort65Low = by65[total - 1];
const mort65AtLeast40 = by65.filter((r) => r.mort65Share.pct >= 40);
const mort65AtMost28 = by65.filter((r) => r.mort65Share.pct <= 28);
const mort65Moe = [...STATE_RESULTS].sort((a, b) => b.mort65Share.moe - a.mort65Share.moe)[0];
const mort65Within3 = STATE_RESULTS.filter((r) => r.mort65Share.moe <= 3).length;
const corrMort65Value = correlation(
  STATE_RESULTS.map((r) => r.mort65Share.pct),
  STATE_RESULTS.map((r) => r.value),
);

const bySecond = sortedBy((r) => r.secondShare.pct);
const secondTop = bySecond.slice(0, 4);
const secondLow = bySecond.slice(-4).reverse();
const secondHigh = bySecond[0];
const secondOfMortHigh = sortedBy((r) => r.secondOfMort.pct)[0];

const byNoCost = sortedBy((r) => r.medNoMort);
const noCostHigh = byNoCost[0];
const noCostLow = byNoCost[total - 1];
const noCostSpread = noCostHigh.medNoMort / noCostLow.medNoMort;
const corrNoCostTax = correlation(
  STATE_RESULTS.map((r) => r.medNoMort),
  STATE_RESULTS.map((r) => r.tax),
);
const corrMortCostValue = correlation(
  STATE_RESULTS.map((r) => r.medMort),
  STATE_RESULTS.map((r) => r.value),
);
const byMortCost = sortedBy((r) => r.medMort);
const mortCostHigh = byMortCost[0];
const mortCostLow = byMortCost[total - 1];

const costAboveSs = sortedBy((r) => r.costVsSs).filter((r) => r.costVsSs > 1);

const bySize = [...STATE_RESULTS].sort((a, b) => b.own - a.own);
const largestState = bySize[0];

const wv = mustGet("WV");
const dc = mustGet("DC");

// The copy below names the two ends of the ranking and the sign and size of three correlations; fail the build if a data refresh changes that.
if (
  noHigh.abbr !== "WV" ||
  noMin.abbr !== "DC" ||
  mort65High.abbr !== "DC" ||
  corrNoIncome >= -0.5 ||
  corrNoValue >= 0 ||
  corrNoCostTax < 0.9 ||
  corrMortCostValue < 0.8 ||
  Math.abs(corrNoAge) >= Math.abs(corrNoIncome)
) {
  throw new Error("The mortgage-free findings no longer match the data. Rewrite the ranking and correlation findings.");
}

const ladder = US_AGE_LADDER;
const ladderUnder35 = ladder[0];
const ladder5559 = ladder[3];
const ladder6064 = ladder[4];
const ladder6574 = ladder[5];
const ladder75 = ladder[6];
const ladderMinDrop = Math.floor(
  Math.min(...ladder.slice(3).map((a, i) => ladder[2 + i].mortgageShare.pct - a.mortgageShare.pct)),
);
const costGap = us.costGap.value;
const gapNestEgg = (costGap * 12) / withdrawalRate;

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  noMort: r.noMortShare.pct,
  noMortMoe: r.noMortShare.moe,
  second: r.secondShare.pct,
  mort65: r.mort65Share.pct,
  medMort: r.medMort,
  medNoMort: r.medNoMort,
  value: r.value,
}));

const exampleClauses: { r: MortgageResult; text: string }[] = [
  { r: noHigh, text: "the highest share of owners without a mortgage" },
  { r: noMin, text: "the lowest share of owners without a mortgage" },
  { r: mort65High, text: "the highest share of owners 65 and over who still have one" },
  { r: mort65Low, text: "the lowest share of owners 65 and over who still have one" },
  { r: secondHigh, text: "the highest share of owners with a second mortgage or home equity loan" },
  { r: noCostHigh, text: "the highest median cost of a home without a mortgage" },
  { r: largestState, text: "the most owner households" },
];
const exampleGroups: { r: MortgageResult; texts: string[] }[] = [];
for (const c of exampleClauses) {
  const hit = exampleGroups.find((g) => g.r.abbr === c.r.abbr);
  if (hit) hit.texts.push(c.text);
  else exampleGroups.push({ r: c.r, texts: [c.text] });
}
const exampleRows = [
  { label: "United States", r: us as Omit<MortgageResult, "rank"> },
  ...exampleGroups.map((g) => ({ label: g.r.name, r: g.r as Omit<MortgageResult, "rank"> })),
];

const findings: { lead: string; body: string }[] = [
  {
    lead: `${pct1(us.noMortShare.pct)} of U.S. homeowners (${millions(us.noMort)} of ${millions(us.own)} owner households) own their home with no mortgage or other debt on it.`,
    body: `The other ${pct1(us.mortShare.pct)} have a mortgage, a contract to purchase, or a similar debt, and ${pct1(us.secondShare.pct)} of all owners (${millions(us.multi + us.helOnly)}) have a second mortgage or a home equity loan, which is ${pct1(us.secondOfMort.pct)} of the owners who have any mortgage debt.`,
  },
  {
    lead: `The share without a mortgage runs from ${pct1(noMin.noMortShare.pct)} in ${short(noMin)} to ${pct1(noHigh.noMortShare.pct)} in ${short(noHigh)}.`,
    body: `${longList(noTop.map((r) => `${short(r)} (${pct1(r.noMortShare.pct)})`))} are the highest, and ${majorityFree.length === 1 ? "only one place has" : `only ${majorityFree.length} places have`} a majority of owners with no mortgage (${longList(majorityFree.map((r) => short(r)))}). ${atLeast45.length} places are at 45% or more and ${under40.length} are below 40%, the lowest being ${longList(noLow.slice(0, 3).map((r) => `${short(r)} (${pct1(r.noMortShare.pct)})`))}.`,
  },
  {
    lead: `The pattern follows prices and incomes more than age.`,
    body: `Across the ${total} places, the share without a mortgage has a correlation of ${corrNoIncome.toFixed(2)} with median household income and ${corrNoValue.toFixed(2)} with median home value, but only ${corrNoAge.toFixed(2)} with the share of households that have a member 65 or older. States with lower prices and incomes have more owners with no mortgage. The data cannot say why; smaller loans, older homes, and more cash purchases are all possible.`,
  },
  {
    lead: `Owning without a mortgage is mostly a story of the 60s and 70s.`,
    body: `${pct1(ladderUnder35.mortgageShare.pct)} of owners under 35 have a mortgage, ${pct1(ladder5559.mortgageShare.pct)} of those 55 to 59, ${pct1(ladder6064.mortgageShare.pct)} of those 60 to 64, ${pct1(ladder6574.mortgageShare.pct)} of those 65 to 74, and ${pct1(ladder75.mortgageShare.pct)} of those 75 and over. Of all owner households with a householder 65 or older (${millions(us.own65)}), ${pct1(us.mort65Share.pct)} still owe on the home.`,
  },
  {
    lead: `Among owners 65 and over, the share who still have a mortgage runs from ${pct1(mort65Low.mort65Share.pct)} in ${short(mort65Low)} to ${pct1(mort65High.mort65Share.pct)} in ${short(mort65High)}.`,
    body: `${mort65AtLeast40.length} places are at 40% or more (${longList(mort65AtLeast40.map((r) => short(r)))}) and ${mort65AtMost28.length} are at 28% or less (${longList(mort65AtMost28.map((r) => short(r)))}). The share tracks home prices (correlation ${corrMort65Value.toFixed(2)} with median home value). Margins of error are wider for this age group: within 3 points in ${mort65Within3} of ${total} places, at most ${mort65Moe.mort65Share.moe.toFixed(1)} points (${short(mort65Moe)}).`,
  },
  {
    lead: `Second mortgages and home equity loans are most common in ${longList(secondTop.slice(0, 3).map((r) => short(r)))}.`,
    body: `${longList(secondTop.map((r) => `${short(r)} (${pct1(r.secondShare.pct)})`))} have the highest shares of owners with one, against ${longList(secondLow.map((r) => `${short(r)} (${pct1(r.secondShare.pct)})`))} at the low end. Measured against owners who have any mortgage debt, the highest share is ${pct1(secondOfMortHigh.secondOfMort.pct)} in ${short(secondOfMortHigh)}.`,
  },
  {
    lead: `A home with no mortgage still has a median cost of ${usd0(us.medNoMort)} a month, against ${usd0(us.medMort)} with a mortgage.`,
    body: `Without a mortgage the figure runs from ${usd0(noCostLow.medNoMort)} in ${short(noCostLow)} to ${usd0(noCostHigh.medNoMort)} in ${short(noCostHigh)}, ${noCostSpread.toFixed(1)} times as much, and it tracks the property tax bill (correlation ${corrNoCostTax.toFixed(2)} with median real estate taxes). With a mortgage it runs from ${usd0(mortCostLow.medMort)} in ${short(mortCostLow)} to ${usd0(mortCostHigh.medMort)} in ${short(mortCostHigh)} and tracks home values (correlation ${corrMortCostValue.toFixed(2)}).`,
  },
  {
    lead: `The median cost of owning with a mortgage is almost exactly the average Social Security check.`,
    body: `Nationally the median monthly cost with a mortgage (${usd0(us.medMort)}) is ${pct1(us.costVsSs * 100)} of the average monthly Social Security amount for households that receive it (${usd0(us.ssMonthly)}). In ${costAboveSs.length} of ${total} places the median cost is higher than the average check, led by ${longList(costAboveSs.slice(0, 3).map((r) => `${short(r)} (${Math.round(r.costVsSs * 100)}%)`))}. The two figures describe different groups, a median for owners of all ages and an average for recipient households, so read it as a scale comparison, not a household budget.`,
  },
];

const faqs = [
  {
    question: "What percentage of homeowners have no mortgage?",
    answer: `In the ${REPORT.acsYear} American Community Survey, ${pct1(us.noMortShare.pct)} of U.S. owner-occupied homes (${millions(us.noMort)} of ${millions(us.own)}) had no mortgage or other debt on the property. By state the share runs from ${pct1(noMin.noMortShare.pct)} in ${short(noMin)} to ${pct1(noHigh.noMortShare.pct)} in ${short(noHigh)}. The 90% margin of error is within 1 percentage point in ${noMoeWithin1} of ${total} places and at most ${noMoeMax.noMortShare.moe.toFixed(1)} points (${short(noMoeMax)}); all are in the CSV.`,
  },
  {
    question: "Which states have the most and fewest mortgage-free homeowners?",
    answer: `${longList(noTop.map((r) => `${short(r)} (${pct1(r.noMortShare.pct)})`))} have the highest shares of owners without a mortgage. The lowest are ${longList(noLow.map((r) => `${short(r)} (${pct1(r.noMortShare.pct)})`))}. Only ${longList(majorityFree.map((r) => short(r)))} have a majority of owners with no mortgage. The share is lower where median incomes and home values are higher (correlations of ${corrNoIncome.toFixed(2)} and ${corrNoValue.toFixed(2)}).`,
  },
  {
    question: "How many homeowners over 65 still have a mortgage?",
    answer: `${pct1(us.mort65Share.pct)} of U.S. owner households with a householder 65 or older still have a mortgage (${millions(us.m65)} of ${millions(us.own65)}), down from ${pct1(us.mort5564Share.pct)} of owners 55 to 64. By state the 65-and-over share runs from ${pct1(mort65Low.mort65Share.pct)} in ${short(mort65Low)} to ${pct1(mort65High.mort65Share.pct)} in ${short(mort65High)}. A home equity loan counts as a mortgage in the survey, so the figure includes owners whose only debt is a home equity loan.`,
  },
  {
    question: "How much does a home without a mortgage cost per month?",
    answer: `The median selected monthly owner cost for homes without a mortgage was ${usd0(us.medNoMort)} in ${REPORT.acsYear}, from ${usd0(noCostLow.medNoMort)} in ${short(noCostLow)} to ${usd0(noCostHigh.medNoMort)} in ${short(noCostHigh)}. The Census Bureau's measure adds real estate taxes, homeowners insurance, utilities, fuels, and any HOA or condo fee; it does not include repairs or maintenance. With a mortgage the national median is ${usd0(us.medMort)} because the loan payment is added.`,
  },
  {
    question: "How many homeowners have a second mortgage or home equity loan?",
    answer: `${pct1(us.secondShare.pct)} of U.S. owners (${millions(us.multi + us.helOnly)}) had a second mortgage or home equity loan in ${REPORT.acsYear}, or ${pct1(us.secondOfMort.pct)} of owners with any mortgage debt. The share is highest in ${longList(secondTop.slice(0, 3).map((r) => `${short(r)} (${pct1(r.secondShare.pct)})`))} and lowest in ${longList(secondLow.slice(0, 3).map((r) => `${short(r)} (${pct1(r.secondShare.pct)})`))}.`,
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau data are public domain.`,
  },
];

const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const description = `Share of homeowners with no mortgage in all 50 states and DC, owners 65+ who still owe, second mortgages and HELOCs, and costs. ACS ${REPORT.acsYear}, free CSV.`;

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

const citation = `${site.name} (${new Date(REPORT.dateModified).getUTCFullYear()}). ${h1}. ${site.url}${REPORT.path}. Data: U.S. Census Bureau, ${REPORT.acsYear} American Community Survey 1-year estimates (B25081, B25027, B25088, B25077).`;

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data)`,
    description: `Owner-occupied households with and without a mortgage, owners with a second mortgage or home equity loan, the share of owners 55 to 64 and 65 and over with a mortgage, and the median monthly cost of owning with and without a mortgage, with margins of error, for the 50 states, the District of Columbia, and the United States.`,
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
      "percent of homeowners without a mortgage by state",
      "mortgage free homeowners by state",
      "homeowners over 65 with a mortgage",
      "second mortgage and home equity loan share by state",
      "median monthly owner costs with and without a mortgage",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsMortgageStatus.href,
      REPORT_SOURCES.acsMortgageByAge.href,
      REPORT_SOURCES.acsOwnerCosts.href,
      REPORT_SOURCES.acsValue.href,
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

export default function MortgageFreeHomeownersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Mortgage-Free Homeowners by State", href: REPORT.path },
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
        <span className="text-ink-700">Mortgage-Free Homeowners by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        {`Published ${longDate.format(new Date(REPORT.datePublished))} · Data: Census ACS ${REPORT.acsYear} 1-year · Tables B25081, B25027, B25088`}
      </p>
      <AuthorByline />

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          {`In the ${REPORT.acsYear} American Community Survey, `}
          <strong>{`${pct1(us.noMortShare.pct)} of U.S. homeowners`}</strong>
          {` own their home with no mortgage or other debt. The share runs from ${pct1(noMin.noMortShare.pct)} in ${short(noMin)} to ${pct1(noHigh.noMortShare.pct)} in ${short(noHigh)}. Among owners 65 and over, `}
          <strong>{`${pct1(us.mort65Share.pct)} still have a mortgage`}</strong>
          {`, and a home with no mortgage still costs a median ${usd0(us.medNoMort)} a month for taxes, insurance, and utilities, against ${usd0(us.medMort)} with one.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Owners without a mortgage",
            value: pct1(us.noMortShare.pct),
            note: `${millions(us.noMort)} of ${millions(us.own)} owner households. ${short(noMin)} ${pct1(noMin.noMortShare.pct)} to ${short(noHigh)} ${pct1(noHigh.noMortShare.pct)}`,
          },
          {
            label: "Owners 65+ with a mortgage",
            value: pct1(us.mort65Share.pct),
            note: `${millions(us.m65)} households. ${pct1(us.mort5564Share.pct)} of owners 55 to 64 have one`,
          },
          {
            label: "Second mortgage or home equity loan",
            value: pct1(us.secondShare.pct),
            note: `${millions(us.multi + us.helOnly)} owners, ${pct1(us.secondOfMort.pct)} of those with any mortgage debt`,
          },
          {
            label: "Median monthly cost, no mortgage",
            value: usd0(us.medNoMort),
            note: `${usd0(us.medMort)} with a mortgage. ${usd0(noCostLow.medNoMort)} in ${short(noCostLow)} to ${usd0(noCostHigh.medNoMort)} in ${short(noCostHigh)}`,
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

        <h2>The age ladder: when mortgages disappear</h2>
        <p>
          {`Age here is the age of the householder, the person in whose name the home is owned or rented. The share of owners with a mortgage falls from ${pct1(ladderUnder35.mortgageShare.pct)} among owners under 35 to ${pct1(ladder75.mortgageShare.pct)} among owners 75 and over, and it drops by at least ${ladderMinDrop} points at every step from the 45 to 54 band onward. The survey does not show how those loans end. One route, paying the balance off with retirement savings, is what our `}
          <Link href="/guides/pay-off-mortgage-before-retirement" className="text-brand-600 underline">
            guide to paying off a mortgage before retirement
          </Link>
          {" "}
          tests with tax math.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Age of householder, U.S. {REPORT.acsYear}
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Owner households
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                With a mortgage
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Without a mortgage
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share with a mortgage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {ladder.map((a) => (
              <tr key={a.label}>
                <td className="px-3 py-2 text-ink-800">{a.label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(a.owners)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(a.withMortgage)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(a.withoutMortgage)}</td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold text-ink-900">
                  {pct1(a.mortgageShare.pct)}
                </td>
              </tr>
            ))}
            <tr className="bg-ink-50 font-semibold">
              <td className="px-3 py-2 text-ink-800">All owners</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.own)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.mort)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.noMort)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-900">{pct1(us.mortShare.pct)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Each age group's margin of error on the share is below ${(Math.floor(Math.max(...ladder.map((a) => a.mortgageShare.moe)) * 10) + 1) / 10} points. The age bands are the ones the Census Bureau publishes in table B25027.`}
      </p>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar is the share of owner households with no mortgage;
          the other columns show how common second mortgages and home equity loans are, how many owners 65 and
          over still owe, and the median monthly cost of owning with and without a mortgage.
        </p>
        <div className="mt-4">
          <StateMortgageTable rows={tableRows} usNoMort={us.noMortShare.pct} />
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
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Place
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Owners without a mortgage
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Owners 65+ with a mortgage
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Second mortgage or home equity loan
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Median cost, with mortgage
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Median cost, no mortgage
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Median home value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {exampleRows.map(({ label, r }, i) => (
              <tr key={label} className={i === 0 ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.noMortShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.mort65Share.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.secondShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.medMort)}/mo</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.medNoMort)}/mo</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The shaded row is the national figure. The ${short(wv)} and ${short(dc)} rows show how far apart two places can be: in ${short(wv)} a median home is worth ${usd0(wv.value)} and ${pct1(wv.noMortShare.pct)} of owners have no mortgage, in ${short(dc)} the value is ${usd0(dc.value)} and the share is ${pct1(dc.noMortShare.pct)}.`}
      </p>

      <div className="prose mt-10 max-w-none">
        <h2>Using this report</h2>
        <ul>
          <li>
            <strong>Size the payment you would remove.</strong>
            {" "}
            {`Nationally the median cost of owning with a mortgage is ${usd0(us.medMort)} a month and without one is ${usd0(us.medNoMort)}. The ${usd0(costGap)} gap compares two different groups of homeowners, so treat it as a rough size for what the debt adds, not as one household's saving. Replacing ${usd0(costGap)} a month from savings takes about ${usd0(roundThousand(gapNestEgg))} at a ${RETIREMENT_REPORT.withdrawalRatePct}% withdrawal rate. Whether to use retirement money to remove it depends on the tax cost, which the `}
            <Link href="/guides/pay-off-mortgage-before-retirement" className="text-brand-600 underline">
              pay off your mortgage before retiring guide
            </Link>
            {" "}
            works through, and the{" "}
            <Link href="/calculators/mortgage" className="text-brand-600 underline">
              mortgage calculator
            </Link>
            {" "}
            shows the payoff date for your own loan.
          </li>
          <li>
            <strong>Budget for the costs that stay.</strong>
            {" "}
            {`A home with no mortgage still has a median monthly cost of ${usd0(us.medNoMort)}, and ${usd0(noCostLow.medNoMort)} to ${usd0(noCostHigh.medNoMort)} depending on the state. Most of the difference is property tax, so compare the `}
            <Link href="/reports/homeowners-insurance-by-state" className="text-brand-600 underline">
              homeowners insurance report
            </Link>
            {" "}
            and the property tax figures in the{" "}
            <Link href="/reports/mortgage-affordability-by-state" className="text-brand-600 underline">
              mortgage affordability report
            </Link>
            {" "}
            for the state you would retire in.
          </li>
          <li>
            <strong>Know where your age group sits.</strong>
            {" "}
            {`${pct1(ladder5559.mortgageShare.pct)} of owners 55 to 59 and ${pct1(ladder6064.mortgageShare.pct)} of those 60 to 64 still have a mortgage, so carrying a loan into the early retirement years is common. The `}
            <Link href="/calculators/retirement" className="text-brand-600 underline">
              retirement calculator
            </Link>
            {" "}
            and the guide{" "}
            <Link href="/guides/how-much-to-retire-at-55" className="text-brand-600 underline">
              how much you need to retire at 55
            </Link>
            {" "}
            show how a monthly payment changes the savings target.
          </li>
          <li>
            <strong>Count home equity loans as debt.</strong>
            {" "}
            {`${pct1(us.secondShare.pct)} of owners have a second mortgage or home equity loan, and the survey counts them as a mortgage. If you are comparing a new loan with an existing one, the `}
            <Link href="/calculators/refinance-calculator" className="text-brand-600 underline">
              refinance calculator
            </Link>
            {" "}
            shows the break-even point and the interest saved or added.
          </li>
        </ul>

        <h2>How the numbers were built</h2>
        <ul>
          <li>
            <strong>Shares of owners</strong>
            {" "}
            are owner-occupied households in a category divided by all owner-occupied households (B25081). A
            household owns with no mortgage when the survey finds no mortgage, contract to purchase, home
            equity loan, or similar debt on the property.
          </li>
          <li>
            <strong>Second mortgages and home equity loans</strong>
            {" "}
            are the households with multiple mortgages plus those whose only debt is a home equity loan
            (B25081). Owners 55 to 64, 65 and over, and under 45 combine the age bands in B25027.
          </li>
          <li>
            <strong>Median monthly costs</strong>
            {" "}
            are the Census Bureau's selected monthly owner costs (B25088): mortgage payments, real estate
            taxes, insurance, utilities, fuels, and any HOA or condo fee. The median home value (B25077),
            median household income (B19013), and median real estate taxes (B25103) come from the mortgage
            affordability report so every report uses the same figures.
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
            <strong>It shows who has debt, not how much.</strong>
            {" "}
            The survey does not publish the balance, rate, or remaining term, and it does not show home equity.
            A household with a small balance counts the same as one with a large balance.
          </li>
          <li>
            <strong>The two cost medians describe different homeowners.</strong>
            {" "}
            Owners with a mortgage are younger on average and more likely to have bought recently, so the gap
            between the medians is not what one household saves by paying off its loan.
          </li>
          <li>
            <strong>Owner costs leave out repairs.</strong>
            {" "}
            The measure includes taxes, insurance, utilities, and fuels but not maintenance, repairs, or
            replacement of the roof, furnace, and appliances.
          </li>
          <li>
            <strong>Age is the householder's age.</strong>
            {" "}
            A household headed by a 63-year-old with a 70-year-old spouse is counted at 63.
          </li>
          <li>
            <strong>No causes are shown.</strong>
            {" "}
            The correlations are between state averages. They do not show why one state has more owners
            without a mortgage than another.
          </li>
          <li>
            <strong>This is state-level data for one year.</strong>
            {" "}
            Mortgage-free shares differ sharply between cities and rural areas inside a state, which this
            report cannot show. The {REPORT.acsYear} ACS was released on October 29, 2026, and the{" "}
            {REPORT.acsYear + 1} estimates are expected in fall {REPORT.acsYear + 2}. We will update the
            report after that release.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsMortgageStatus,
          REPORT_SOURCES.acsMortgageByAge,
          REPORT_SOURCES.acsOwnerCosts,
          REPORT_SOURCES.acsValue,
          REPORT_SOURCES.acsTenure,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for tables B25081, B25027, and B25088 were read from the Census Bureau's ACS 1-year Summary File between November 12 and 16, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the owner counts agree across B25081, B25027, and B25003, the mortgage categories add up, and the state rows add up exactly to the U.S. row.`}
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
            { href: "/calculators/mortgage", label: "Mortgage Calculator", note: "Payment, payoff date, and interest" },
            { href: "/calculators/amortization", label: "Amortization Calculator", note: "See principal and interest by year" },
            { href: "/calculators/refinance-calculator", label: "Refinance Calculator", note: "Break-even point on a new loan" },
            { href: "/calculators/retirement", label: "Retirement Calculator", note: "See if your savings cover the gap" },
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
          <Link href="/reports/property-tax-by-state" className="text-brand-600 underline">
            property tax by state report
          </Link>
          ,{" "}
          <Link href="/reports/retirement-income-by-state" className="text-brand-600 underline">
            Social Security and retirement income by state report
          </Link>
          ,{" "}
          <Link href="/reports/housing-cost-burden-by-state" className="text-brand-600 underline">
            housing cost burden by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/pay-off-mortgage-early-vs-invest" className="text-brand-600 underline">
            pay off your mortgage early vs invest
          </Link>{" "}
          and{" "}
          <Link href="/guides/pay-off-mortgage-before-retirement" className="text-brand-600 underline">
            pay off your mortgage before retiring
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
