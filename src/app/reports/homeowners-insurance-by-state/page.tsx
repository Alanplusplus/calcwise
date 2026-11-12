import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateInsuranceTable } from "@/components/StateInsuranceTable";
import { site } from "@/lib/site";
import {
  BRACKET_EDGES,
  BRACKET_LABELS,
  CSV_HEADER,
  QUOTE_CHECK,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_MEDIAN_MORTGAGE_EXCLUDING_UNDER_100,
  US_RESULT,
  count0,
  countOverGuideline,
  getStateResult,
  millions,
  pct1,
  rateRiseEquivalent,
  usd0,
} from "@/lib/reports/homeowners-insurance-by-state";
import { monthlyPrincipalInterest } from "@/lib/reports/mortgage-affordability-by-state";

const title = "Homeowners Insurance Cost by State: What Owners Pay";
const h1 = "Homeowners Insurance Cost by State: What Owners Actually Pay";

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

function mustGet(abbr: string) {
  const row = getStateResult(abbr);
  if (!row) throw new Error(`Missing state ${abbr}`);
  return row;
}

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;
const highest = STATE_RESULTS[0];
const lowest = STATE_RESULTS[total - 1];
const tiedTop = STATE_RESULTS.filter((r) => r.mortMedian === highest.mortMedian);
const tiedTopNames = longList(tiedTop.map((r) => r.name));
const topSix = STATE_RESULTS.slice(0, 6);
const topSixSpread = topSix[0].mortMedian - topSix[5].mortMedian;
const spreadRatio = highest.mortMedian / lowest.mortMedian;
const aboveUsCount = STATE_RESULTS.filter((r) => r.mortMedian > us.mortMedian).length;

const bracketCount = (label: string) => STATE_RESULTS.filter((r) => r.mortBracket === label).length;
const topBracketLabel = highest.mortBracket;
const topBracketPlaces = STATE_RESULTS.filter((r) => r.mortBracket === topBracketLabel);
const midBracketLabel = "$1,500 to $1,999";
const lowBracketLabel = "$1,000 to $1,499";

const byShare3k = [...STATE_RESULTS].sort((a, b) => b.mortShare3k.pct - a.mortShare3k.pct);
const thirdPlus = byShare3k.filter((r) => r.mortShare3k.pct >= 100 / 3);
const lowShare3k = byShare3k.slice(-3).reverse();
const widestShareMoe = [...STATE_RESULTS].sort((a, b) => b.mortShare3k.moe - a.mortShare3k.moe)[0];
const medianShareMoe = [...STATE_RESULTS]
  .map((r) => r.mortShare3k.moe)
  .sort((a, b) => a - b)[Math.floor(total / 2)];

const insOverTax = STATE_RESULTS.filter((r) => r.insuranceToTax > 1).sort(
  (a, b) => b.insuranceToTax - a.insuranceToTax,
);
const lowestToTax = [...STATE_RESULTS].sort((a, b) => a.insuranceToTax - b.insuranceToTax)[0];

const byPctValue = [...STATE_RESULTS].sort((a, b) => b.premiumPctOfValue - a.premiumPctOfValue);
const pctValueTop = byPctValue.slice(0, 3);
const pctValueLow = byPctValue.slice(-2).reverse();
const fl = mustGet("FL");
const co = mustGet("CO");
const la = mustGet("LA");
const nj = mustGet("NJ");
const flPctRank = byPctValue.findIndex((r) => r.abbr === "FL") + 1;

const overNo = countOverGuideline(false);
const overWith = countOverGuideline(true);
const over15 = countOverGuideline(true, 1.5);
const over20 = countOverGuideline(true, 2);
const crossers = STATE_RESULTS.filter(
  (r) => r.shareNoInsurance <= REPORT.guidelinePct && r.share > REPORT.guidelinePct,
);
const byAdds = [...STATE_RESULTS].sort((a, b) => b.insuranceAddsPts - a.insuranceAddsPts);
const addsHighest = byAdds[0];
const addsLowest = byAdds[total - 1];

const loanFor = (value: number) => value * (1 - REPORT.downPaymentPct / 100);
const usLoan = loanFor(us.value);
const topLoan = loanFor(highest.value);
const rateEquivUs = rateRiseEquivalent(usLoan, REPORT.mortgageRate, us.insuranceMonthly);
const rateEquivTop = rateRiseEquivalent(topLoan, REPORT.mortgageRate, highest.insuranceMonthly);
const loanPer100 = (100 / monthlyPrincipalInterest(1000, REPORT.mortgageRate, REPORT.termYears)) * 1000;
const piAtYearAgoRate = monthlyPrincipalInterest(usLoan, REPORT.mortgageRateYearAgo, REPORT.termYears);
const usShareAtYearAgoRate =
  ((piAtYearAgoRate + us.taxMonthly + us.insuranceMonthly) / us.incomeMonthly) * 100;

const freeLt100Share = (us.freeBins[0] / us.freeBase) * 100;
const lt100Max = [...STATE_RESULTS].sort((a, b) => b.lt100Share.pct - a.lt100Share.pct)[0];
const medianBracketIndex = BRACKET_LABELS.indexOf(us.mortBracket as (typeof BRACKET_LABELS)[number]);
const belowMedianBracket = us.mortBins.slice(0, medianBracketIndex).reduce((s, n) => s + n, 0);
const medianBracketCount = us.mortBins[medianBracketIndex];
const medianBracketLow = BRACKET_EDGES[medianBracketIndex];
const medianBracketWidth = BRACKET_EDGES[medianBracketIndex + 1] - medianBracketLow;
const medianRaw =
  medianBracketLow + ((us.mortBase / 2 - belowMedianBracket) / medianBracketCount) * medianBracketWidth;

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  median: r.mortMedian,
  bracket: r.mortBracket,
  share3k: r.mortShare3k.pct,
  freeMedian: r.freeMedian,
  pctOfValue: r.premiumPctOfValue,
  toTax: r.insuranceToTax,
  addsPts: r.insuranceAddsPts,
  paymentShare: r.share,
}));

const exampleRows = [
  { label: "United States", r: us },
  ...["LA", "FL", "TX", "CA", "NJ", "NV"].map((abbr) => {
    const r = mustGet(abbr);
    return { label: r.name, r };
  }),
];

const findings: { lead: string; body: string }[] = [
  {
    lead: `The typical owner with a mortgage pays about ${usd0(us.mortMedian)} a year, and ${pct1(us.mortShare3k.pct)} pay ${usd0(REPORT.highPremium)} or more.`,
    body: `Of ${count0(us.mortBase)} owners with a mortgage, ${pct1(us.mortShare2k.pct)} (${count0(us.mort2k)}) pay ${usd0(REPORT.midPremium)} or more and ${pct1(us.mortShare3k.pct)} (${count0(us.mort3k)}) pay ${usd0(REPORT.highPremium)} or more. Owners without a mortgage typically pay about ${usd0(us.freeMedian)}, which is ${usd0(us.mortMedian - us.freeMedian)} less, and ${pct1(us.freeShare3k.pct)} of them (${count0(us.free3k)}) still pay ${usd0(REPORT.highPremium)} or more. The two groups differ in home value, age of the home, and how recently they bought, so the gap is not the price of having a loan.`,
  },
  {
    lead: `By state, the typical premium runs from ${usd0(lowest.mortMedian)} in ${lowest.name} to ${usd0(highest.mortMedian)} in ${tiedTopNames}, a ${spreadRatio.toFixed(1)} to 1 spread.`,
    body: `The top six (${longList(topSix.map((r) => r.name))}) are within ${usd0(topSixSpread)} of one another, closer than the error in estimating a median from brackets, so read them as one tier rather than a strict order. ${topBracketPlaces.length} places have a typical premium in the ${topBracketLabel} bracket (${longList(topBracketPlaces.map((r) => r.name))}), ${bracketCount(midBracketLabel)} are in ${midBracketLabel}, and ${bracketCount(lowBracketLabel)} are in ${lowBracketLabel}. ${aboveUsCount} of ${total} places are above the U.S. figure of ${usd0(us.mortMedian)}.`,
  },
  {
    lead: `The share of owners paying ${usd0(REPORT.highPremium)} or more is the firmer measure, and it reaches ${pct1(byShare3k[0].mortShare3k.pct)} in ${byShare3k[0].name}.`,
    body: `This share comes straight from published counts, with no interpolation. In ${thirdPlus.length} places more than a third of owners with a mortgage pay that much: ${longList(thirdPlus.map((r) => `${r.name} (${pct1(r.mortShare3k.pct)})`))}. At the other end, ${longList(lowShare3k.map((r) => `${r.name} (${pct1(r.mortShare3k.pct)})`))} have the smallest shares. The 90% margin of error on these shares is about ${medianShareMoe.toFixed(1)} points for a typical state and widest for ${widestShareMoe.name} (${widestShareMoe.mortShare3k.moe.toFixed(1)} points).`,
  },
  {
    lead: `In ${insOverTax.length} places the typical insurance premium is larger than the typical property tax bill.`,
    body: `${longList(insOverTax.map((r) => `${r.name} (${usd0(r.mortMedian)} of insurance against ${usd0(r.tax)} of tax, ${r.insuranceToTax.toFixed(2)} times)`))}. Nationally the premium is ${us.insuranceToTax.toFixed(2)} times the median tax bill (${usd0(us.mortMedian)} against ${usd0(us.tax)}), and in ${lowestToTax.name} it is only ${lowestToTax.insuranceToTax.toFixed(2)} times. Where property tax is low and premiums are high, insurance can be the larger of the two escrow items. This compares the typical premium for owners with a mortgage with the median tax bill for all owners.`,
  },
  {
    lead: `Measured against home value, the ranking changes: ${longList(pctValueTop.map((r) => r.name))} lead.`,
    body: `The typical premium equals ${us.premiumPctOfValue.toFixed(2)}% of the median home value nationally. It is ${pctValueTop[0].premiumPctOfValue.toFixed(2)}% in ${pctValueTop[0].name}, ${pctValueTop[1].premiumPctOfValue.toFixed(2)}% in ${pctValueTop[1].name}, and ${pctValueTop[2].premiumPctOfValue.toFixed(2)}% in ${pctValueTop[2].name}. ${fl.name} drops to ${fl.premiumPctOfValue.toFixed(2)}% (rank ${flPctRank} of ${total}) and ${co.name} to ${co.premiumPctOfValue.toFixed(2)}% because their median homes cost ${usd0(fl.value)} and ${usd0(co.value)}. The lowest are ${pctValueLow[0].name} (${pctValueLow[0].premiumPctOfValue.toFixed(2)}%) and ${pctValueLow[1].name} (${pctValueLow[1].premiumPctOfValue.toFixed(2)}%).`,
  },
  {
    lead: `Insurance adds ${us.insuranceAddsPts.toFixed(1)} points to the share of income that the median home payment takes, and ${addsHighest.insuranceAddsPts.toFixed(1)} in ${addsHighest.name}.`,
    body: `On the median U.S. home at ${REPORT.mortgageRate.toFixed(2)}% with ${REPORT.downPaymentPct}% down, principal, interest, and property tax take ${pct1(us.shareNoInsurance)} of median household income. Adding the typical premium raises that to ${pct1(us.share)}. ${overNo} of ${total} places are above the ${REPORT.guidelinePct}% guideline before insurance and ${overWith} are above it after. ${crossers.length} places cross the line only because of insurance: ${longList(crossers.map((r) => r.name))}. ${addsLowest.name} adds the least, ${addsLowest.insuranceAddsPts.toFixed(1)} points.`,
  },
  {
    lead: `A typical premium costs as much each month as a ${rateEquivUs.toFixed(2)}-point rise in the mortgage rate on the median U.S. loan.`,
    body: `On a ${usd0(usLoan)} loan, ${usd0(us.insuranceMonthly)} a month is the difference between ${REPORT.mortgageRate.toFixed(2)}% and ${(REPORT.mortgageRate + rateEquivUs).toFixed(2)}%. In ${highest.name}, ${usd0(highest.insuranceMonthly)} a month on the median loan of ${usd0(topLoan)} is the same as ${rateEquivTop.toFixed(2)} points. Put the other way, each $100 a month of insurance cuts the loan that a fixed monthly payment can carry by about ${usd0(Math.round(loanPer100 / 10) * 10)}. Comparing insurance quotes deserves the same effort as comparing mortgage rates.`,
  },
  {
    lead: `If premiums rose 50%, ${over15} of ${total} places would be over the ${REPORT.guidelinePct}% line, and if they doubled, ${over20}.`,
    body: `Today the count is ${overWith}. The scenarios multiply each place's typical premium by 1.5 and by 2 and change nothing else. They are what-if arithmetic, not a forecast, and they show how little room the median home has under the guideline at ${REPORT.mortgageRate.toFixed(2)}%.`,
  },
];

const faqs = [
  {
    question: "How much is homeowners insurance per year?",
    answer: `In the ${REPORT.acsYear} American Community Survey, the typical U.S. owner with a mortgage paid about ${usd0(us.mortMedian)} a year (the published bracket is ${us.mortBracket}), and the typical owner without a mortgage paid about ${usd0(us.freeMedian)}. ${pct1(us.mortShare2k.pct)} of owners with a mortgage paid ${usd0(REPORT.midPremium)} or more and ${pct1(us.mortShare3k.pct)} paid ${usd0(REPORT.highPremium)} or more. These are existing policies for fire, hazard, and flood coverage as reported by owners, and a new policy on a different home can cost more or less.`,
  },
  {
    question: "Which state has the most expensive homeowners insurance?",
    answer: `${tiedTopNames} ${tiedTop.length > 1 ? "are" : "is"} highest on the typical premium at ${usd0(highest.mortMedian)} a year, followed by ${longList(STATE_RESULTS.slice(tiedTop.length, 5).map((r) => `${r.name} (${usd0(r.mortMedian)})`))}. Those figures are estimates from published brackets, so the top six are effectively tied. By the share of owners paying ${usd0(REPORT.highPremium)} or more, ${byShare3k[0].name} leads at ${pct1(byShare3k[0].mortShare3k.pct)}. As a percentage of home value the top is ${pctValueTop[0].name} (${pctValueTop[0].premiumPctOfValue.toFixed(2)}%). ${lowest.name} has the lowest typical premium at ${usd0(lowest.mortMedian)}.`,
  },
  {
    question: `Why do other sites show higher averages, such as ${usd0(QUOTE_CHECK.nationalAverage)}?`,
    answer: `They measure something else. LendingTree's analysis of Quadrant Information Services data from ${QUOTE_CHECK.period} averages quotes for a home with ${usd0(QUOTE_CHECK.dwellingCoverage)} of dwelling coverage and puts the national average at ${usd0(QUOTE_CHECK.nationalAverage)}. The Census figures are what existing owners report paying, as a median, for homes of every value and age. An average is pulled up by expensive policies, and a quote for a new policy can differ from a renewal. The two series still agree on the broad pattern: the rank correlation across the 50 states and DC is ${QUOTE_CHECK.rankCorrelation.toFixed(2)}, although the quote-based figure for the median state is about ${QUOTE_CHECK.medianRatio.toFixed(1)} times the Census-based one.`,
  },
  {
    question: "Is homeowners insurance included in my mortgage payment?",
    answer: `Often, through an escrow account: the lender collects one-twelfth of the annual premium and property tax with each payment and pays the bills. The payment in this report adds insurance to principal, interest, and property tax, which is what an escrowed payment contains. If your lender does not escrow, you pay the premium yourself, but the cost to your budget is the same. Our mortgage calculator includes property tax and insurance so you can see the full monthly payment.`,
  },
  {
    question: "How much does insurance change what I can afford?",
    answer: `Each $100 a month of insurance reduces the loan that a fixed payment can carry by about ${usd0(Math.round(loanPer100 / 10) * 10)} at ${REPORT.mortgageRate.toFixed(2)}%. The typical premium adds ${us.insuranceAddsPts.toFixed(1)} points to the share of median income that the median home payment takes nationally and ${addsHighest.insuranceAddsPts.toFixed(1)} points in ${addsHighest.name}. To see where a premium leaves your own budget, run the home affordability calculator with the insurance amount from a real quote.`,
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau data are public domain. A CSV with every figure is available at ${site.url}${REPORT.csvPath}.`,
  },
];

const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const description = `Typical homeowners insurance premium in all 50 states and DC, ${usd0(lowest.mortMedian)} to ${usd0(highest.mortMedian)} a year (2025 ACS), what it adds to the payment, and a free CSV.`;

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

const citation = `${site.name} (${new Date(REPORT.dateModified).getUTCFullYear()}). ${h1}. ${site.url}${REPORT.path}. Data: U.S. Census Bureau, ${REPORT.acsYear} American Community Survey 1-year estimates (B25141, B25077, B25103, B19013); Freddie Mac PMMS, ${REPORT.mortgageRateDate}.`;

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data)`,
    description: `Estimated median annual homeowners insurance premium for owners with and without a mortgage, the share paying $2,000 and $3,000 or more with margins of error, premium as a share of home value and compared with property tax, and the effect of insurance on the monthly payment on the median home, for the 50 states and DC. Derived from ACS ${REPORT.acsYear} 1-year tables B25141, B25077, B25103, and B19013 and the Freddie Mac PMMS rate of ${REPORT.mortgageRateDate}.`,
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
      "homeowners insurance cost by state",
      "average homeowners insurance by state",
      "home insurance premium by state",
      "homeowners insurance as a share of home value",
      "cost of homeowners insurance",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsInsurance.href,
      REPORT_SOURCES.acsHome.href,
      REPORT_SOURCES.acsTax.href,
      REPORT_SOURCES.acsIncome.href,
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

export default function HomeownersInsuranceByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Homeowners Insurance by State", href: REPORT.path },
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
        <span className="text-ink-700">Homeowners Insurance by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        {`Published ${longDate.format(new Date(REPORT.datePublished))} · Insurance, housing, and income data: Census ACS ${REPORT.acsYear} 1-year · Mortgage rate: Freddie Mac PMMS, ${REPORT.mortgageRateDate}`}
      </p>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          {`In the ${REPORT.acsYear} American Community Survey, the typical U.S. owner with a mortgage paid `}
          <strong>{`about ${usd0(us.mortMedian)} a year`}</strong>
          {` for homeowners insurance, and ${pct1(us.mortShare3k.pct)} (${millions(us.mort3k)} households) paid ${usd0(REPORT.highPremium)} or more. By state the typical premium runs from ${usd0(lowest.mortMedian)} in ${lowest.name} to ${usd0(highest.mortMedian)} in ${tiedTopNames}. Adding it to principal, interest, and property tax on the median home at ${REPORT.mortgageRate.toFixed(2)}% moves the payment from ${pct1(us.shareNoInsurance)} to `}
          <strong>{`${pct1(us.share)} of median household income`}</strong>
          {` and puts ${overWith - overNo} more places above the ${REPORT.guidelinePct}% guideline. “Typical” means an estimated median.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Typical premium, owners with a mortgage",
            value: usd0(us.mortMedian),
            note: `Published bracket ${us.mortBracket}. Owners without a mortgage: about ${usd0(us.freeMedian)}`,
          },
          {
            label: `Mortgaged owners paying ${usd0(REPORT.highPremium)}+`,
            value: pct1(us.mortShare3k.pct),
            note: `${millions(us.mort3k)} households. ${pct1(us.mortShare2k.pct)} pay ${usd0(REPORT.midPremium)} or more`,
          },
          {
            label: "Range across states",
            value: `${usd0(lowest.mortMedian)} to ${usd0(highest.mortMedian)}`,
            note: `${lowest.name} to ${tiedTopNames}. A ${spreadRatio.toFixed(1)} to 1 spread`,
          },
          {
            label: "Added to the median home payment",
            value: `+${us.insuranceAddsPts.toFixed(1)} pts`,
            note: `${pct1(us.shareNoInsurance)} to ${pct1(us.share)} of income at ${REPORT.mortgageRate.toFixed(2)}%. Up to +${addsHighest.insuranceAddsPts.toFixed(1)} in ${addsHighest.name}`,
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

        <h2>How premiums are distributed nationally</h2>
        <p>
          The Census Bureau publishes owner insurance costs only in twelve brackets, so the whole
          distribution fits in one table. Counts are owner-occupied housing units, and the share is
          taken within each group.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Annual premium
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Owners with a mortgage
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Owners without a mortgage
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {BRACKET_LABELS.map((label, i) => (
              <tr key={label} className={i === medianBracketIndex ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label.charAt(0).toUpperCase() + label.slice(1)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.mortBins[i])}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {pct1((us.mortBins[i] / us.mortBase) * 100)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.freeBins[i])}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {pct1((us.freeBins[i] / us.freeBase) * 100)}
                </td>
              </tr>
            ))}
            <tr className="bg-ink-50 font-semibold">
              <td className="px-3 py-2 text-ink-800">All owner-occupied units</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.mortBase)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">100.0%</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.freeBase)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">100.0%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The shaded row holds the estimated median for owners with a mortgage. The smallest bracket, less than $100 a year, holds ${pct1(us.lt100Share.pct)} of owners with a mortgage (${count0(us.mortLt100)}) and ${pct1(freeLt100Share)} of owners without one (${count0(us.freeBins[0])}). The Census table does not say whether those owners have no policy or a very small premium, so this report does not call them uninsured; leaving that bracket out would lift the U.S. typical premium for owners with a mortgage from ${usd0(us.mortMedian)} to ${usd0(US_MEDIAN_MORTGAGE_EXCLUDING_UNDER_100)}.`}
      </p>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar is the typical annual premium for owners with
          a mortgage; the other columns show how common high premiums are, how the premium compares with
          home value and property tax, and what it adds to the payment on the median home.
        </p>
        <div className="mt-4">
          <StateInsuranceTable
            rows={tableRows}
            usMedian={us.mortMedian}
            guidelinePct={REPORT.guidelinePct}
          />
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
        <h2>Insurance, property tax, and the payment in seven places</h2>
        <p>
          {`Every row uses the same recipe: the median home value in the place, ${REPORT.downPaymentPct}% down, a ${REPORT.termYears}-year loan at ${REPORT.mortgageRate.toFixed(2)}%, the median property tax bill, and the typical premium for owners with a mortgage. The last two columns compare the payment with median household income before and after insurance.`}
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
                Median home
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Principal and interest
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Property tax
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Insurance
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Monthly total
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share of income, before
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share of income, after
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {exampleRows.map(({ label, r }) => (
              <tr key={label} className={label === "United States" ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.value)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.pi)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.taxMonthly)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.insuranceMonthly)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.payment)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.shareNoInsurance)}</td>
                <td
                  className={`px-3 py-2 text-right tabular-nums ${r.share > REPORT.guidelinePct ? "text-negative" : "text-ink-700"}`}
                >
                  {pct1(r.share)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Monthly amounts. Figures in red are above ${REPORT.guidelinePct}% of the median household's gross income. The rate is the Freddie Mac PMMS 30-year average of ${REPORT.mortgageRateDate}.`}
      </p>

      <div className="prose mt-6 max-w-none">
        <p>
          {`The two ends of the table behave differently. In ${la.name} the typical premium (${usd0(la.mortMedian)}) is ${la.insuranceToTax.toFixed(2)} times the median property tax (${usd0(la.tax)}) and makes up ${pct1(la.insuranceShareOfPayment)} of the full payment. In ${nj.name} it is ${nj.insuranceToTax.toFixed(2)} times the tax and ${pct1(nj.insuranceShareOfPayment)} of the payment, because the tax bill is ${usd0(nj.tax)}. A budget built from principal, interest, and property tax alone understates the monthly payment by ${usd0(la.insuranceMonthly)} in ${la.name} and ${usd0(nj.insuranceMonthly)} in ${nj.name}. Our `}
          <Link href="/calculators/mortgage">mortgage calculator</Link>
          {` takes property tax and insurance as inputs, and the `}
          <Link href="/calculators/home-affordability">home affordability calculator</Link>
          {` shows how a premium changes the price you can afford.`}
        </p>

        <h2>How we calculated it</h2>
        <p>
          {`Table B25141 counts owner-occupied housing units in twelve brackets of annual fire, hazard, and flood insurance premium, separately for owners with a mortgage and owners without one. The Census Bureau does not publish a median for it, so we estimate one. We find the bracket that holds the middle household and place the median inside it in proportion, which is the standard way to get a median from grouped data. The result is rounded to the nearest $10.`}
        </p>
        <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-sm">
          Median ≈ L + ((N ÷ 2 − C) ÷ f) × W
        </p>
        <p>
          {`Here L is the lower edge of the median bracket, N is the number of owners in the group, C is the number in the brackets below it, f is the number in the median bracket, and W is the bracket width. For U.S. owners with a mortgage, N = ${count0(us.mortBase)}, so N ÷ 2 = ${count0(us.mortBase / 2)}. ${count0(belowMedianBracket)} owners pay less than ${usd0(medianBracketLow)}, and the ${us.mortBracket} bracket holds ${count0(medianBracketCount)}. The median is ${usd0(medianBracketLow)} + ((${count0(us.mortBase / 2)} − ${count0(belowMedianBracket)}) ÷ ${count0(medianBracketCount)}) × ${usd0(medianBracketWidth)} = ${usd0(medianRaw)}, or about ${usd0(us.mortMedian)}.`}
        </p>
        <ul>
          <li>
            <strong>Shares paying $2,000 or $3,000 or more</strong>
            {" "}
            add the published brackets from that threshold up and divide by all owners in the group. No
            interpolation is involved. The margin of error for a sum is the square root of the sum of the
            squared published margins, and for a share we use the Census Bureau's formula for a proportion,
            √(MOE<sub>x</sub>² − p² × MOE<sub>y</sub>²) ÷ y, where x is the count at or above the threshold
            and y is the group total.
          </li>
          <li>
            <strong>Home value, property tax, and income</strong>
            {" "}
            are the median home value (B25077), median real estate taxes paid (B25103), and median household
            income (B19013) for each place. They are the same inputs as our{" "}
            <Link href="/reports/mortgage-affordability-by-state">mortgage affordability by state report</Link>
            , so the payments here equal that report's payments plus insurance.
          </li>
          <li>
            <strong>Monthly payment</strong>
            {" "}
            = principal and interest + property tax ÷ 12 + typical premium ÷ 12. Principal and interest use
            the standard formula, M = L × r ÷ (1 − (1 + r)<sup>−n</sup>), with L the loan ({REPORT.downPaymentPct}%
            down on the median value), r the monthly rate, and n = {REPORT.termYears * 12}.
          </li>
          <li>
            <strong>Insurance share of income</strong>
            {" "}
            is the typical premium ÷ 12 divided by median household income ÷ 12. The{" "}
            {REPORT.guidelinePct}% guideline is the front-end ratio our home affordability calculator uses.
          </li>
        </ul>
        <p>
          {`Worked example, U.S. median home: ${usd0(us.value)} × ${(1 - REPORT.downPaymentPct / 100).toFixed(2)} = ${usd0(usLoan)} loan. At ${REPORT.mortgageRate.toFixed(2)}% over ${REPORT.termYears} years, principal and interest are ${usd0(us.pi)}. Property tax is ${usd0(us.tax)} ÷ 12 = ${usd0(us.taxMonthly)} and insurance is ${usd0(us.mortMedian)} ÷ 12 = ${usd0(us.insuranceMonthly)}, for a total of ${usd0(us.payment)}. Median household income of ${usd0(us.income)} is ${usd0(us.incomeMonthly)} a month, so the payment is ${pct1(us.share)} of income, or ${pct1(us.shareNoInsurance)} without insurance.`}
        </p>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>The medians are estimates inside brackets.</strong>
            {" "}
            The true median can sit anywhere in its bracket, so an estimate can be off by up to half a
            bracket width, which is $250 for brackets above $1,000. That is why the top six states are
            treated as one tier. The shares paying $2,000 or $3,000 or more are published counts and do
            not have this limit.
          </li>
          <li>
            <strong>A typical premium is not your premium.</strong>
            {" "}
            What a household pays depends on the home, its age and construction, the coverage and deductible,
            claims history, and the insurer. Use the state figure as a budgeting starting point and get
            quotes for the actual property before you make an offer.
          </li>
          <li>
            <strong>What counts as insurance is defined by the Census Bureau.</strong>
            {" "}
            The measure is the annual premium for fire, hazard, and flood insurance on the property.
            Liability coverage is included only when it is billed together and cannot be separated. Premiums
            are reported even if unpaid or paid by someone outside the household, and payments made on a
            schedule other than yearly are converted to a year. The table does not say whether owners with
            a separate flood policy included it.
          </li>
          <li>
            <strong>Existing owners are not new buyers.</strong>
            {" "}
            The figures describe policies in force during {REPORT.acsYear}, many of them renewals on homes
            bought years ago. A quote for a new policy today can be higher or lower. LendingTree's
            quote-based national average for a home with {usd0(QUOTE_CHECK.dwellingCoverage)} of dwelling
            coverage was {usd0(QUOTE_CHECK.nationalAverage)} in {QUOTE_CHECK.period}, against the{" "}
            {usd0(us.mortMedian)} typical premium here. The two measures differ in what they count (new
            quotes against premiums owners report, averages against medians), and their state rankings
            correlate at {QUOTE_CHECK.rankCorrelation.toFixed(2)}.
          </li>
          <li>
            <strong>The payment mixes populations.</strong>
            {" "}
            The typical premium is for owners with a mortgage, the median property tax is for all owners, and
            median household income covers all households, renters included. The payment shares are a gauge
            of how heavy the cost is relative to local incomes, not the experience of any one household,
            and they describe a buyer with {REPORT.downPaymentPct}% down and excellent credit, the profile
            the Freddie Mac survey tracks.
          </li>
          <li>
            <strong>Rates matter as much as premiums.</strong>
            {" "}
            The rate is pinned at {REPORT.mortgageRate.toFixed(2)}% (Freddie Mac, {REPORT.mortgageRateDate}).
            A year earlier it was {REPORT.mortgageRateYearAgo.toFixed(2)}%, and at that rate the same U.S.
            payment with insurance would be {usd0(piAtYearAgoRate + us.taxMonthly + us.insuranceMonthly)}, or{" "}
            {pct1(usShareAtYearAgoRate)} of income. The insurance premium would have been the same dollars.
          </li>
          <li>
            <strong>Less than $100 a year is a large bracket.</strong>
            {" "}
            {pct1(us.lt100Share.pct)} of owners with a mortgage and {pct1(freeLt100Share)} of owners without
            one fall in it, and they stay in the medians. The share is largest in {lt100Max.name} (
            {pct1(lt100Max.lt100Share.pct)} of owners with a mortgage), so that state's estimated median is
            the most sensitive to how these owners are counted.
          </li>
          <li>
            <strong>This is state-level data for one year.</strong>
            {" "}
            Premiums vary a great deal inside a state, by county, ZIP code, and home, and this report cannot
            show that. The {REPORT.acsYear} ACS was released on October 29, 2026. It says nothing about
            renewals since, and the {REPORT.acsYear + 1} estimates are expected in fall {REPORT.acsYear + 2}.
            We will update the report after that release.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsInsurance,
          REPORT_SOURCES.acsHome,
          REPORT_SOURCES.acsTax,
          REPORT_SOURCES.acsIncome,
          REPORT_SOURCES.acsTenure,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
          REPORT_SOURCES.pmms,
          REPORT_SOURCES.quotes,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for table B25141 were read from the Census Bureau's ACS 1-year Summary File on November 12, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the twelve published brackets add up to each group total, and the two group totals add up to the owner-occupied count in table B25003 (${count0(us.mortBase + us.freeBase)} nationally). The LendingTree figures are quoted for comparison only. The Census definition of the insurance measure is from the 2025 ACS Subject Definitions. See our methodology page for how we verify figures.`}
      />

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Cite or reuse this report</h2>
        <p className="mt-2 text-sm text-ink-600">
          The figures calculated by {site.name} (estimated medians, shares, margins of error, payments,
          rankings) are licensed under{" "}
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
            { href: "/calculators/mortgage", label: "Mortgage Calculator", note: "Add tax and insurance to see the full payment" },
            { href: "/calculators/home-affordability", label: "Home Affordability Calculator", note: "See how a premium changes the price you can afford" },
            { href: "/calculators/house-payment", label: "House Payment Calculator", note: "Compare payments across prices and rates" },
            { href: "/calculators/debt-to-income", label: "Debt-to-Income Calculator", note: "Check your ratio before you apply for a loan" },
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
          <Link href="/reports/housing-cost-burden-by-state" className="text-brand-600 underline">
            housing cost burden by state report
          </Link>
          ,{" "}
          <Link href="/reports/rent-vs-buy-by-state" className="text-brand-600 underline">
            rent vs buy by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/how-much-house-can-i-afford" className="text-brand-600 underline">
            how much house you can afford
          </Link>
          {" "}
          and{" "}
          <Link href="/guides/how-much-down-payment-for-house" className="text-brand-600 underline">
            how much to put down on a house
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
