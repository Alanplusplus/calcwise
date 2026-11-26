import type { Metadata } from "next";
import { AuthorByline } from "@/components/AuthorByline";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StatePropertyTaxTable } from "@/components/StatePropertyTaxTable";
import {
  BRACKET_LABELS,
  CSV_HEADER,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_PT_ROW,
  US_RESULT,
  correlation,
  count0,
  millions,
  pct1,
  usd0,
  type PropertyTaxResult,
} from "@/lib/reports/property-tax-by-state";
import { site } from "@/lib/site";
import { reportCitation, reportH1 } from "@/lib/reports/press";

const title = "Property Tax by State: What Homeowners Pay";
const h1 = reportH1(REPORT.slug);

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Name for running text: "DC" reads better in a sentence than "District of Columbia", and avoids a double period at the end of a sentence. */
const short = (r: { abbr: string; name: string }) => (r.abbr === "DC" ? "DC" : r.name);

const billions = (n: number) => `$${(n / 1_000_000_000).toFixed(1)} billion`;
const rate2 = (n: number) => `${n.toFixed(2)}%`;

type Result = PropertyTaxResult;

const sortedBy = (fn: (r: Result) => number) => [...STATE_RESULTS].sort((a, b) => fn(b) - fn(a));

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;

const byBill = STATE_RESULTS; // already ranked by the median property tax bill
const billHigh = byBill[0];
const billLow = byBill[total - 1];
const billTop = byBill.slice(0, 5);
const billBottom = byBill.slice(-4).reverse();
const aboveUs = byBill.filter((r) => r.med > us.med);
const moeMax = sortedBy((r) => r.medMoe)[0];

const byRate = sortedBy((r) => r.effRate.value);
const rateHigh = byRate[0];
const rateLow = byRate[total - 1];
const rateTop = byRate.slice(0, 3);
const rateBottom = byRate.slice(-3).reverse();
const billHighRateRank = byRate.findIndex((r) => r.abbr === billHigh.abbr) + 1;

const byIncomeShare = sortedBy((r) => r.incomeShare.value);
const incHigh = byIncomeShare[0];
const incLow = byIncomeShare[total - 1];

const byOver = sortedBy((r) => r.over3000Share.pct);
const overHigh = byOver[0];
const overLow = byOver[total - 1];
const overTop = byOver.slice(0, 4);
const overBottom = byOver.slice(-3).reverse();
const byUnder = sortedBy((r) => r.under800Share.pct);
const underHigh = byUnder[0];

const byNoTax = sortedBy((r) => r.noTaxShare.pct);
const noTaxHigh = byNoTax.slice(0, 4);
const noTaxLow = byNoTax[total - 1];
const noTaxMajor = STATE_RESULTS.filter((r) => r.noTaxShare.pct >= 15);

const byMean = sortedBy((r) => r.meanTax.value);
const meanHigh = byMean[0];
const meanLow = byMean[total - 1];

const byMortRatio = sortedBy((r) => r.mortRatio.value);
const mortHigh = byMortRatio[0];
const mortAtOrBelowParity = STATE_RESULTS.filter((r) => r.mortRatio.value <= 1);

const byAgg = sortedBy((r) => r.agg);
const aggTop5 = byAgg.slice(0, 5);
const aggTop5Share = aggTop5.reduce((s, r) => s + r.aggShareOfUs, 0);
const aggTop5Owners = aggTop5.reduce((s, r) => s + r.ownersShareOfUs, 0);

const corrBillIncome = correlation(
  STATE_RESULTS.map((r) => r.med),
  STATE_RESULTS.map((r) => r.income),
);
const corrRateIncome = correlation(
  STATE_RESULTS.map((r) => r.effRate.value),
  STATE_RESULTS.map((r) => r.income),
);

// The copy below says the highest bill is not the highest rate, that bills track income far more than rates do, that
// exactly one place has no mortgage premium, that five states pay a bigger share of the tax than their share of homes,
// and that the mean exceeds the median; fail the build if a data refresh changes any of that.
if (
  billHigh.abbr === rateHigh.abbr ||
  corrBillIncome < 0.6 ||
  Math.abs(corrRateIncome) >= 0.4 ||
  mortAtOrBelowParity.length !== 1 ||
  aggTop5Share <= aggTop5Owners ||
  us.meanTax.value <= us.med
) {
  throw new Error("The property tax findings no longer match the data. Rewrite the ranking and correlation findings.");
}

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  med: r.med,
  medMoe: r.medMoe,
  effRate: r.effRate.value,
  medMort: r.medMort,
  medFree: r.medFree,
  over3000: r.over3000Share.pct,
  noTax: r.noTaxShare.pct,
  mean: r.meanTax.value,
  billOnHome: r.billOnHome,
}));

const exampleClauses: { r: Result; text: string }[] = [
  { r: billHigh, text: "the highest median bill" },
  { r: billLow, text: "the lowest median bill" },
  { r: rateHigh, text: "the highest effective rate" },
  { r: rateLow, text: "the lowest effective rate" },
  { r: incHigh, text: "the largest bill relative to income" },
  { r: aggTop5[0], text: "the most property tax paid in total" },
  { r: mortHigh, text: "the largest gap between owners with and without a mortgage" },
];
const exampleGroups: { r: Result; texts: string[] }[] = [];
for (const c of exampleClauses) {
  const hit = exampleGroups.find((g) => g.r.abbr === c.r.abbr);
  if (hit) hit.texts.push(c.text);
  else exampleGroups.push({ r: c.r, texts: [c.text] });
}
const exampleRows = [
  { label: "United States", r: us as Omit<Result, "rank"> },
  ...exampleGroups.map((g) => ({ label: g.r.name, r: g.r as Omit<Result, "rank"> })),
];

const bracketRows = BRACKET_LABELS.map((label, i) => {
  const all = US_PT_ROW.mortBr[i] + US_PT_ROW.freeBr[i];
  return {
    label,
    all,
    allShare: (all / US_PT_ROW.owners) * 100,
    mortShare: (US_PT_ROW.mortBr[i] / US_PT_ROW.mortTot) * 100,
    freeShare: (US_PT_ROW.freeBr[i] / US_PT_ROW.freeTot) * 100,
  };
});

const home = REPORT.illustrativeHome;

const findings: { lead: string; body: string }[] = [
  {
    lead: `The median homeowner pays ${usd0(us.med)} a year in property tax, about ${rate2(us.effRate.value)} of the median home's value.`,
    body: `That is ${usd0(us.med / 12)} a month, and it runs from ${usd0(billLow.med)} in ${short(billLow)} to ${usd0(billHigh.med)} in ${short(billHigh)}, ${(billHigh.med / billLow.med).toFixed(1)} times as much. ${longList(billTop.map((r) => `${short(r)} (${usd0(r.med)})`))} have the highest bills, and ${longList(billBottom.map((r) => `${short(r)} (${usd0(r.med)})`))} the lowest. ${aboveUs.length} of ${total} places are above the national median. The 90% margin of error is at most ±${usd0(moeMax.medMoe)} (${short(moeMax)}).`,
  },
  {
    lead: `The highest bill is not the highest rate: ${short(rateHigh)} taxes at ${rate2(rateHigh.effRate.value)} while ${short(billHigh)} has the biggest bill.`,
    body: `The effective rate divides the median bill by the median home value. ${longList(rateTop.map((r) => `${short(r)} (${rate2(r.effRate.value)})`))} are highest, and ${longList(rateBottom.map((r) => `${short(r)} (${rate2(r.effRate.value)})`))} are lowest. ${short(billHigh)} is No. ${billHighRateRank} by rate. ${short(rateLow)} has the lowest rate even though its median home is worth ${usd0(rateLow.value)}: a ${usd0(rateLow.med)} bill on that value. At each state's rate, a ${usd0(home)} home would carry ${usd0(rateHigh.billOnHome)} a year in ${short(rateHigh)} and ${usd0(rateLow.billOnHome)} in ${short(rateLow)}, against ${usd0(us.billOnHome)} at the national rate.`,
  },
  {
    lead: `Bills track household income closely, but rates barely do.`,
    body: `Across the ${total} places, the median bill has a correlation of ${corrBillIncome.toFixed(2)} with median household income, while the effective rate has a correlation of ${corrRateIncome.toFixed(2)}. That pattern fits richer states having pricier homes rather than much higher rates, though these tables cannot prove the cause. The median bill takes ${pct1(us.incomeShare.value)} of the median household income nationally, from ${pct1(incLow.incomeShare.value)} in ${short(incLow)} to ${pct1(incHigh.incomeShare.value)} in ${short(incHigh)}.`,
  },
  {
    lead: `${pct1(us.over3000Share.pct)} of owners pay $${REPORT.highBill.toLocaleString("en-US")} or more a year, but only ${pct1(overLow.over3000Share.pct)} do in ${short(overLow)}.`,
    body: `The share is highest in ${longList(overTop.map((r) => `${short(r)} (${pct1(r.over3000Share.pct)})`))} and lowest in ${longList(overBottom.map((r) => `${short(r)} (${pct1(r.over3000Share.pct)})`))}. At the other end, ${pct1(us.under800Share.pct)} of owners pay less than $${REPORT.lowBill}, and the share is ${pct1(underHigh.under800Share.pct)} in ${short(underHigh)}.`,
  },
  {
    lead: `${pct1(us.noTaxShare.pct)} of owners (${millions(us.noTax)} homes) report paying no property tax at all.`,
    body: `The share is ${longList(noTaxHigh.map((r) => `${pct1(r.noTaxShare.pct)} in ${short(r)}`))}${noTaxMajor.length === noTaxHigh.length ? ", the only places above 15%" : ""}, against ${pct1(noTaxLow.noTaxShare.pct)} in ${short(noTaxLow)}. The survey records the amount an owner reports, not the reason for a zero. The bill medians and means in this report describe owners who have a bill; the no-tax owners are shown in their own column.`,
  },
  {
    lead: `Owners with a mortgage pay ${((us.mortRatio.value - 1) * 100).toFixed(0)}% more at the median than owners without one (${usd0(us.medMort)} against ${usd0(us.medFree)}).`,
    body: `The gap is widest in ${short(mortHigh)}, where owners with a mortgage have a median bill of ${usd0(mortHigh.medMort)} against ${usd0(mortHigh.medFree)} without, ${((mortHigh.mortRatio.value - 1) * 100).toFixed(0)}% more. ${short(mortAtOrBelowParity[0])} is the only place where owners with a mortgage do not pay more (${usd0(mortAtOrBelowParity[0].medMort)} against ${usd0(mortAtOrBelowParity[0].medFree)}). The table cannot separate home value, how recently the home was bought, and exemptions, so read the gap as a fact about who owes what, not as a rule for any one home.`,
  },
  {
    lead: `Owner-occupants paid ${billions(us.agg)} in property tax, and five states account for ${pct1(aggTop5Share)} of it.`,
    body: `Owners with a mortgage paid ${billions(us.aggMort)} (${pct1((us.aggMort / us.agg) * 100)}) and owners without one ${billions(us.aggFree)}. ${longList(aggTop5.map((r) => `${short(r)} (${billions(r.agg)})`))} pay the most, and those five states hold ${pct1(aggTop5Owners)} of all owner-occupied homes. The figure covers homes lived in by their owners only; rental, second-home, and commercial property pay property tax on top of it.`,
  },
  {
    lead: `The mean bill is ${usd0(us.meanTax.value)}, ${(((us.meanTax.value - us.med) / us.med) * 100).toFixed(0)}% above the median.`,
    body: `Dividing the total tax by the ${millions(us.payers)} owners who report a bill gives ${usd0(us.meanTax.value)} nationally, because a long tail of large bills pulls the mean up. ${short(meanHigh)} has the highest mean at ${usd0(meanHigh.meanTax.value)} and ${short(meanLow)} the lowest at ${usd0(meanLow.meanTax.value)}. Use the median for a typical owner and the mean for what a state collects per taxed home.`,
  },
];

const faqs = [
  {
    question: "Which state has the highest property taxes?",
    answer: `It depends on the measure. ${short(billHigh)} has the highest median bill at ${usd0(billHigh.med)} a year, followed by ${longList(byBill.slice(1, 4).map((r) => `${short(r)} (${usd0(r.med)})`))}. ${short(rateHigh)} has the highest effective rate at ${rate2(rateHigh.effRate.value)} of home value, with ${short(byRate[1])} (${rate2(byRate[1].effRate.value)}) next. The national median is ${usd0(us.med)}, or ${rate2(us.effRate.value)} of the median home value, in the ${REPORT.acsYear} American Community Survey.`,
  },
  {
    question: "What is the average property tax in the United States?",
    answer: `The median homeowner paid ${usd0(us.med)} in ${REPORT.acsYear}, or ${usd0(us.med / 12)} a month. The mean bill among owners who report one is ${usd0(us.meanTax.value)}, higher because large bills pull it up, and ${pct1(us.noTaxShare.pct)} of owners report no property tax. By state the median runs from ${usd0(billLow.med)} in ${short(billLow)} to ${usd0(billHigh.med)} in ${short(billHigh)}.`,
  },
  {
    question: "Which state has the lowest property taxes?",
    answer: `${short(billLow)} has the lowest median bill at ${usd0(billLow.med)} a year, followed by ${longList(billBottom.slice(1).map((r) => `${short(r)} (${usd0(r.med)})`))}. By effective rate, ${short(rateLow)} is lowest at ${rate2(rateLow.effRate.value)}, then ${longList(rateBottom.slice(1).map((r) => `${short(r)} (${rate2(r.effRate.value)})`))}. A low bill can mean a low rate, a low home value, or both, so compare the rate when you are choosing between places with different home prices.`,
  },
  {
    question: `How much property tax would I pay on a ${usd0(home)} home?`,
    answer: `Applying each state's effective rate (median tax divided by median home value) to a ${usd0(home)} home gives ${usd0(us.billOnHome)} a year at the national rate, from ${usd0(rateLow.billOnHome)} in ${short(rateLow)} to ${usd0(rateHigh.billOnHome)} in ${short(rateHigh)}. That is an illustration: the real bill depends on the assessed value, the county, city, and school district rates, and any exemptions. Check the seller's current bill and ask the county assessor whether the sale will trigger a reassessment.`,
  },
  {
    question: "Do homeowners without a mortgage pay property tax?",
    answer: `Yes, in most cases. Owners without a mortgage had a median bill of ${usd0(us.medFree)} in ${REPORT.acsYear}, against ${usd0(us.medMort)} for owners with a mortgage, and together they paid ${billions(us.aggFree)} of the ${billions(us.agg)} total. ${pct1(us.noTaxShare.pct)} of owners overall report no property tax, so a minority owe nothing. Paying off a mortgage removes the principal and interest, not the property tax, which is why it belongs in a retirement budget.`,
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

const description = `Median property tax bill in all 50 states and DC (${usd0(us.med)} nationally), effective rates, and the bill on a ${usd0(home)} home. ACS ${REPORT.acsYear}, free CSV.`;

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
    description: `Median real estate taxes paid by owner-occupied households (with and without a mortgage), the mean bill, the effective rate (median tax over median home value), the bill as a share of median household income, the share of owners paying under $800, $3,000 or more, or no real estate tax, and aggregate property tax paid, with margins of error, for the 50 states, the District of Columbia, and the United States.`,
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
      "property tax by state",
      "property taxes by state",
      "property tax rates by state",
      "median property tax by state",
      "average property tax by state",
      "effective property tax rate by state",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsBrackets.href,
      REPORT_SOURCES.acsMedian.href,
      REPORT_SOURCES.acsAggregate.href,
      REPORT_SOURCES.acsHome.href,
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

const thClass = "px-3 py-2.5 text-right font-semibold";

export default function PropertyTaxByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Property Tax by State", href: REPORT.path },
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
        <span className="text-ink-700">Property Tax by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        {`Published ${longDate.format(new Date(REPORT.datePublished))} · Data: Census ACS ${REPORT.acsYear} 1-year · Tables B25102, B25103, B25090, B25077, B19013`}
      </p>
      <AuthorByline />

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          {`In the ${REPORT.acsYear} American Community Survey, the median U.S. homeowner pays `}
          <strong>{`${usd0(us.med)} a year`}</strong>
          {` in property tax, ${usd0(us.med / 12)} a month and about ${rate2(us.effRate.value)} of the median home's value. The median bill runs from ${usd0(billLow.med)} in ${short(billLow)} to ${usd0(billHigh.med)} in ${short(billHigh)}, while the effective rate is highest in ${short(rateHigh)} (${rate2(rateHigh.effRate.value)}) and lowest in ${short(rateLow)} (${rate2(rateLow.effRate.value)}). `}
          <strong>{`${pct1(us.over3000Share.pct)} of owners`}</strong>
          {` pay $${REPORT.highBill.toLocaleString("en-US")} or more, and at each state's rate a ${usd0(home)} home would owe between ${usd0(rateLow.billOnHome)} and ${usd0(rateHigh.billOnHome)} a year.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Median property tax bill",
            value: usd0(us.med),
            note: `${usd0(us.med / 12)} a month. ${short(billLow)} ${usd0(billLow.med)} to ${short(billHigh)} ${usd0(billHigh.med)}`,
          },
          {
            label: "Effective rate",
            value: rate2(us.effRate.value),
            note: `Median tax over the ${usd0(us.value)} median home. ${short(rateLow)} ${rate2(rateLow.effRate.value)} to ${short(rateHigh)} ${rate2(rateHigh.effRate.value)}`,
          },
          {
            label: `Owners paying $${REPORT.highBill.toLocaleString("en-US")} or more`,
            value: pct1(us.over3000Share.pct),
            note: `${short(overLow)} ${pct1(overLow.over3000Share.pct)} to ${short(overHigh)} ${pct1(overHigh.over3000Share.pct)}`,
          },
          {
            label: "Property tax paid by owner-occupants",
            value: billions(us.agg),
            note: `${pct1(us.noTaxShare.pct)} of owners report no property tax. ${short(aggTop5[0])} alone paid ${billions(aggTop5[0].agg)}`,
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

        <h2>How property tax enters the monthly payment</h2>
        <p>
          {`Many lenders collect property tax with the mortgage payment in an escrow account, so the annual bill is added to principal, interest, and insurance as one twelfth a month. On a ${usd0(home)} home the national rate means about ${usd0(us.billOnHome / 12)} a month in escrow (${usd0(us.billOnHome)} a year); at ${short(rateHigh)}'s rate it is ${usd0(rateHigh.billOnHome / 12)} and at ${short(rateLow)}'s rate ${usd0(rateLow.billOnHome / 12)}. That swing of ${usd0((rateHigh.billOnHome - rateLow.billOnHome) / 12)} a month comes on top of principal and interest, so it belongs in the budget before the loan size is chosen. The `}
          <Link href="/calculators/house-payment" className="text-brand-600 underline">
            house payment calculator
          </Link>
          {" "}
          adds property tax, insurance, and PMI to the loan payment, and the{" "}
          <Link href="/calculators/mortgage" className="text-brand-600 underline">
            mortgage calculator
          </Link>
          {" "}
          shows the tax line on the full amortization schedule. The{" "}
          <Link href="/reports/homeowners-insurance-by-state" className="text-brand-600 underline">
            homeowners insurance report
          </Link>
          {" "}
          gives the matching insurance figure for every state.
        </p>

        <h2>How bills are distributed across owners nationally</h2>
        <p>
          {`The median hides a wide spread. Of the ${millions(US_PT_ROW.owners)} owner-occupied homes, the bracket with the most owners is $${REPORT.highBill.toLocaleString("en-US")} or more, and it holds ${pct1(bracketRows[4].allShare)} of them; ${pct1(bracketRows[0].allShare)} pay under $${REPORT.lowBill} and ${pct1(bracketRows[5].allShare)} report no tax.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Annual property tax bill
              </th>
              <th scope="col" className={thClass}>
                All owners
              </th>
              <th scope="col" className={thClass}>
                Share of all owners
              </th>
              <th scope="col" className={thClass}>
                Share of owners with a mortgage
              </th>
              <th scope="col" className={thClass}>
                Share of owners without a mortgage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {bracketRows.map((row) => (
              <tr key={row.label}>
                <td className="px-3 py-2 text-ink-800">{row.label.charAt(0).toUpperCase() + row.label.slice(1)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(row.all)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-900">{pct1(row.allShare)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(row.mortShare)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(row.freeShare)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Table B25102, owner-occupied housing units, United States, ${REPORT.acsYear}. The brackets are the ones the Census Bureau publishes; the top bracket is open-ended, so it cannot show how large the largest bills are.`}
      </p>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar is the median property tax bill; the other columns show
          the effective rate, the medians for owners with and without a mortgage, how many owners pay $3,000 or
          more or report no tax, the mean bill, and what the state's effective rate would mean on a{" "}
          {usd0(home)} home.
        </p>
        <div className="mt-4">
          <StatePropertyTaxTable rows={tableRows} usMedian={us.med} homeValue={home} />
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
              <th scope="col" className={thClass}>
                Median bill
              </th>
              <th scope="col" className={thClass}>
                Effective rate
              </th>
              <th scope="col" className={thClass}>
                {`On a ${usd0(home)} home`}
              </th>
              <th scope="col" className={thClass}>
                Median home value
              </th>
              <th scope="col" className={thClass}>
                Bill, % of median income
              </th>
              <th scope="col" className={thClass}>
                {`Owners paying $${REPORT.highBill.toLocaleString("en-US")}+`}
              </th>
              <th scope="col" className={thClass}>
                Owners reporting no tax
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {exampleRows.map(({ label, r }, i) => (
              <tr key={label} className={i === 0 ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.med)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{rate2(r.effRate.value)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.billOnHome)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.value)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.incomeShare.value)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.over3000Share.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.noTaxShare.pct)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The shaded row is the national figure. The effective rate is the median bill divided by the median home value, and the "on a ${usd0(home)} home" column applies it to a round value; neither is a quote for a specific property. Dollar figures are ${REPORT.acsYear} dollars.`}
      </p>

      <div className="prose mt-10 max-w-none">
        <h2>Using this report</h2>
        <ul>
          <li>
            <strong>Compare the rate, not only the bill.</strong>
            {" "}
            {`A low bill can come from a low rate or from a cheap home. ${short(rateLow)} has the lowest rate at ${rate2(rateLow.effRate.value)} and ${short(billLow)} the lowest bill at ${usd0(billLow.med)}. Put the bill beside the price in the `}
            <Link href="/reports/mortgage-affordability-by-state" className="text-brand-600 underline">
              mortgage affordability by state report
            </Link>
            {" "}
            and run the full payment through the{" "}
            <Link href="/calculators/home-affordability" className="text-brand-600 underline">
              home affordability calculator
            </Link>
            .
          </li>
          <li>
            <strong>Use the seller's bill as a starting point, then check the assessment.</strong>
            {" "}
            {`A listing shows what the current owner pays. Some jurisdictions reassess a home after a sale, and exemptions can end when ownership changes, so ask the county assessor what the bill would be for you. The ${usd0(home)} column is a rough guide for comparing states, not a prediction for an address.`}
          </li>
          <li>
            <strong>Budget for the tax after the mortgage is paid off.</strong>
            {" "}
            {`Owners without a mortgage still have a median bill of ${usd0(us.medFree)}. The `}
            <Link href="/reports/mortgage-free-homeowners-by-state" className="text-brand-600 underline">
              mortgage-free homeowners report
            </Link>
            {" "}
            shows who owns free and clear, and the guide{" "}
            <Link href="/guides/pay-off-mortgage-before-retirement" className="text-brand-600 underline">
              pay off your mortgage before retirement
            </Link>
            {" "}
            walks through what the payment drops to.
          </li>
          <li>
            <strong>Weigh it against renting.</strong>
            {" "}
            {`Property tax is one of the costs that make owning more expensive than the loan payment alone. The `}
            <Link href="/reports/rent-vs-buy-by-state" className="text-brand-600 underline">
              rent vs. buy by state report
            </Link>
            {" "}
            and the{" "}
            <Link href="/guides/rent-vs-buy-decision" className="text-brand-600 underline">
              rent vs buy decision guide
            </Link>
            {" "}
            compare the full monthly cost of each.
          </li>
        </ul>

        <h2>How the numbers were built</h2>
        <ul>
          <li>
            <strong>Median bill</strong>
            {" "}
            is table B25103: the median of the real estate taxes owners report for the entire property, land and
            buildings, payable to all taxing jurisdictions, converted to a year. It includes taxes that are
            delinquent or paid by someone outside the household and excludes taxes due from prior years. The
            figures for owners with and without a mortgage are B25103_002 and _003. The median is the same figure
            the mortgage affordability report uses.
          </li>
          <li>
            <strong>Distribution</strong>
            {" "}
            comes from table B25102, which counts owner-occupied homes in six brackets: less than $800, $800 to
            $1,499, $1,500 to $1,999, $2,000 to $2,999, $3,000 or more, and no real estate taxes paid. The share
            paying $3,000 or more, under $800, or nothing divides the matching brackets, with and without a
            mortgage added together, by all owner-occupied homes.
          </li>
          <li>
            <strong>Mean bill and total tax</strong>
            {" "}
            use the aggregate real estate taxes in table B25090. The mean divides the aggregate by the owners who
            report a bill, that is, all owners minus the "no real estate taxes paid" bracket.
          </li>
          <li>
            <strong>Effective rate</strong>
            {" "}
            is the median bill divided by the median home value (B25077), and the income share divides it by the
            median household income (B19013). Both are ratios of medians. The bill on a {usd0(home)} home applies
            the state's effective rate to that round value.
          </li>
          <li>
            <strong>Margins of error</strong>
            {" "}
            are the 90% margins published by the Census Bureau; those for shares, ratios, and sums follow the ACS
            General Handbook (chapter 8) and are in the CSV. Rank 1 is the highest median bill, so a state whose
            margin overlaps its neighbor's is not reliably above it.
          </li>
        </ul>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>It is the owner's bill, not a tax rate.</strong>
            {" "}
            The effective rate is a ratio of two medians for a whole state. Actual rates are set by county, city,
            school district, and special districts, and differ sharply inside a state. For one address, use the
            county assessor's rate and the assessed value.
          </li>
          <li>
            <strong>Exemptions and caps are inside the numbers.</strong>
            {" "}
            Homestead exemptions, senior and veteran relief, and limits on assessment growth all lower the bills
            owners report, but the survey does not separate them, so a low bill is not proof of a low rate.
          </li>
          <li>
            <strong>Owners with no bill are shown separately.</strong>
            {" "}
            The survey records the amount, not the reason for a zero. The Census Bureau's standard distribution for
            the median begins at "less than $200", so the median appears to describe owners with a bill, the same
            group as the mean here.
          </li>
          <li>
            <strong>Only owner-occupied homes.</strong>
            {" "}
            Rental properties, second homes, farms, and commercial buildings pay property tax too, so the total
            here is part of what local governments collect, not the whole.
          </li>
          <li>
            <strong>Reported, not assessed.</strong>
            {" "}
            Owners report their bill in the survey. A figure can differ from the tax roll when an owner estimates
            it, and the Census Bureau counts taxes payable even if unpaid.
          </li>
          <li>
            <strong>One year of data.</strong>
            {" "}
            The {REPORT.acsYear} ACS was released on October 29, 2026, and the {REPORT.acsYear + 1} estimates are
            expected in fall {REPORT.acsYear + 2}. We will update the report after that release.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsBrackets,
          REPORT_SOURCES.acsMedian,
          REPORT_SOURCES.acsAggregate,
          REPORT_SOURCES.acsHome,
          REPORT_SOURCES.acsIncome,
          REPORT_SOURCES.acsTenure,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for tables B25102, B25103, and B25090 were read from the Census Bureau's ACS 1-year Summary File on November 26, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the brackets add up to the group totals, the group totals add up to the owner-occupied count in B25003, the median equals the one in the mortgage affordability report, and the state rows add up exactly to the U.S. row for every count (aggregate dollars differ by $100 because the Census Bureau rounds each published aggregate to $100).`}
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
          Writing about this data? The{" "}
          <Link href="/reports/press" className="text-brand-600 underline">
            press page
          </Link>{" "}
          has a citation for every report, the data dictionary of each CSV, and the limits of the data.
        </p>
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
            { href: "/calculators/house-payment", label: "House Payment Calculator", note: "Loan plus tax, insurance, and PMI" },
            { href: "/calculators/mortgage", label: "Mortgage Calculator", note: "Payment and amortization schedule" },
            { href: "/calculators/home-affordability", label: "Home Affordability Calculator", note: "How much house your income supports" },
            { href: "/calculators/down-payment", label: "Down Payment Calculator", note: "Cash needed and PMI at each level" },
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
          <Link href="/reports/homeowners-insurance-by-state" className="text-brand-600 underline">
            homeowners insurance by state report
          </Link>
          ,{" "}
          <Link href="/reports/housing-cost-burden-by-state" className="text-brand-600 underline">
            housing cost burden by state report
          </Link>
          ,{" "}
          <Link href="/reports/mortgage-affordability-by-state" className="text-brand-600 underline">
            mortgage affordability by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/how-much-house-can-i-afford" className="text-brand-600 underline">
            how much house can I afford
          </Link>
          ,{" "}
          <Link href="/guides/how-much-down-payment-for-house" className="text-brand-600 underline">
            how much down payment for a house
          </Link>
          , and{" "}
          <Link href="/guides/pay-off-mortgage-before-retirement" className="text-brand-600 underline">
            pay off your mortgage before retirement
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
