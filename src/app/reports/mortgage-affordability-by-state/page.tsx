import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateAffordabilityTable } from "@/components/StateAffordabilityTable";
import { site } from "@/lib/site";
import {
  CSV_HEADER,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_RESULT,
  getStateResult,
  pct1,
  sensitivityAt,
  usd0,
} from "@/lib/reports/mortgage-affordability-by-state";

const rate = REPORT.mortgageRate.toFixed(2);
const yearAgoRate = REPORT.mortgageRateYearAgo.toFixed(2);

const title = "Mortgage Affordability by State: Home vs. Income";
const h1 = "Mortgage Affordability by State: Median Home vs. Median Income";
const description = `The monthly payment on each state's median home at ${rate}%, as a share of median household income. Ranked for all 50 states and DC, with a free CSV.`;

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

// ---- Derived facts used in the copy (all computed from the data module) ----
const guideline = REPORT.guidelinePct;
const farAbove = guideline * 1.5;
const total = STATE_RESULTS.length;
const overGuideline = STATE_RESULTS.filter((r) => r.share > guideline);
const withinGuideline = total - overGuideline.length;
const farOver = STATE_RESULTS.filter((r) => r.share > farAbove);
const best = STATE_RESULTS[0];
const worst = STATE_RESULTS[total - 1];
const lowestFive = STATE_RESULTS.slice(0, 5);
const highestFive = STATE_RESULTS.slice(-5).reverse();
const us = US_RESULT;
const usYearAgoOver = sensitivityAt(REPORT.mortgageRateYearAgo);
const rateJump = us.payment - us.paymentYearAgoRate;
const il = mustGet("IL");
const pa = mustGet("PA");
const hi = mustGet("HI");
const ca = mustGet("CA");
const sunBelt = ["AZ", "FL", "ID", "NV", "UT", "MT"].map(mustGet);
const widest = [...STATE_RESULTS]
  .sort((a, b) => b.shareHigh - b.shareLow - (a.shareHigh - a.shareLow))
  .slice(0, 4);
const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  value: r.value,
  income: r.income,
  payment: Math.round(r.payment),
  share: r.share,
  shareLow: r.shareLow,
  shareHigh: r.shareHigh,
  incomeNeeded: Math.round(r.incomeNeeded),
}));

const sensitivity = REPORT.sensitivityRates.map((r) => ({
  ...sensitivityAt(r),
  label:
    r === REPORT.mortgageRate
      ? `${r.toFixed(2)}% (Freddie Mac, ${REPORT.mortgageRateDate})`
      : r === REPORT.mortgageRateYearAgo
        ? `${r.toFixed(2)}% (a year earlier)`
        : `${r.toFixed(2)}%`,
}));

const faqs = [
  {
    question: "How much income do I need to afford the median home in my state?",
    answer: `At ${rate}% with 20% down, the payment on the median U.S. home is ${usd0(us.payment)} a month, so a household needs about ${usd0(us.incomeNeeded)} a year for that payment to stay at ${guideline}% of gross income. The state table above lists the figure for every state, from ${usd0(best.incomeNeeded)} in ${best.name} to ${usd0(worst.incomeNeeded)} in ${worst.name}.`,
  },
  {
    question: `Why does the report use a ${guideline}% benchmark?`,
    answer: `${guideline}% of gross monthly income is the common front-end guideline from the 28/36 rule: housing costs at or under 28% of income and total debt payments at or under 36%. Lenders apply their own limits and many approve higher ratios, so treat ${guideline}% as a planning benchmark, not a cutoff.`,
  },
  {
    question: "Why does the report use 2024 home values with a 2026 mortgage rate?",
    answer: `The American Community Survey is the Census Bureau's largest household survey. It publishes median home value, property taxes, and household income for every state from one consistent source, with margins of error. The latest release covers ${REPORT.acsYear}. The 2025 estimates are scheduled for release on October 29, 2026, and this report will be refreshed afterward. Using a current rate on older values shows what ${REPORT.acsYear} homes cost to finance today.`,
  },
  {
    question: "Does the payment include insurance and HOA dues?",
    answer:
      "No. The payment is principal, interest, and property tax only. Homeowners insurance, HOA dues, and maintenance are not included, so real monthly costs are higher than the figures shown, and the share of income would be higher too.",
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau data are public domain. A CSV with every figure is available at ${site.url}${REPORT.csvPath}.`,
  },
];

const citation = `${site.name} (${new Date(REPORT.dateModified).getUTCFullYear()}). ${h1}. ${site.url}${REPORT.path}. Data: U.S. Census Bureau, ${REPORT.acsYear} American Community Survey 1-year estimates (B25077, B25103, B19013); Freddie Mac Primary Mortgage Market Survey, ${REPORT.mortgageRateDate}.`;

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data, ${rate}% rate)`,
    description: `Monthly principal, interest, and property tax on each state's median owner-occupied home (20% down, 30-year fixed at ${rate}%), compared with median household income, for the 50 states and DC. Derived from ACS ${REPORT.acsYear} 1-year tables B25077, B25103, and B19013.`,
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
      "mortgage affordability",
      "median home value by state",
      "median household income by state",
      "property tax by state",
      "housing cost burden",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsHome.href,
      REPORT_SOURCES.acsTax.href,
      REPORT_SOURCES.acsIncome.href,
      REPORT_SOURCES.pmms.href,
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

export default function MortgageAffordabilityByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Mortgage Affordability by State", href: REPORT.path },
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
        <span className="text-ink-700">Mortgage Affordability by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        Published {longDate.format(new Date(REPORT.datePublished))} · Housing and income
        data: Census ACS {REPORT.acsYear} 1-year · Mortgage rate: Freddie Mac,{" "}
        {REPORT.mortgageRateDate}
      </p>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          At the {REPORT.mortgageRateDate} average 30-year rate of {rate}%, the payment on the
          median U.S. home takes <strong>{pct1(us.share)}</strong> of the median household’s
          gross income, well above the {guideline}% guideline. {overGuideline.length} of the 50
          states and DC are over {guideline}%. {best.name} is the lowest at {pct1(best.share)} and{" "}
          {worst.name} the highest at {pct1(worst.share)}.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Monthly payment, median U.S. home",
            value: usd0(us.payment),
            note: `${usd0(us.pi)} principal and interest + ${usd0(us.taxMonthly)} property tax`,
          },
          {
            label: "Share of median household income",
            value: pct1(us.share),
            note: `Guideline: ${guideline}%. Median income ${usd0(us.income)}`,
          },
          {
            label: `States and DC over ${guideline}%`,
            value: `${overGuideline.length} of ${total}`,
            note: `${farOver.length} are over ${farAbove}%`,
          },
          {
            label: `Income needed to stay at ${guideline}%`,
            value: usd0(us.incomeNeeded),
            note: `${usd0(us.incomeNeeded - us.income)} above the national median`,
          },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-ink-200 bg-white p-4 shadow-card">
            <p className="text-xs font-medium text-ink-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-ink-900">{card.value}</p>
            <p className="mt-1 text-xs text-ink-500">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="prose mt-10 max-w-none">
        <h2>What the numbers show</h2>
        <ul>
          <li>
            <strong>The typical American household is over the line.</strong> The median home
            ({usd0(us.value)}) with 20% down ({usd0(us.downPayment)}) means a{" "}
            {usd0(us.loan)} loan. At {rate}% that is {usd0(us.pi)} a month before property tax.
            With tax the payment is {usd0(us.payment)}, or {pct1(us.share)} of the{" "}
            {usd0(us.incomeMonthly)} a month the median household earns before taxes.
          </li>
          <li>
            <strong>The spread between states is {(worst.share - best.share).toFixed(0)} percentage points.</strong> Only{" "}
            {withinGuideline} of {total} places come in at or under {guideline}%. The five most
            affordable are{" "}
            {longList(lowestFive.map((r) => `${r.name} (${pct1(r.share)})`))}. The five least
            affordable are{" "}
            {longList(highestFive.map((r) => `${r.name} (${pct1(r.share)})`))}.{" "}
            {ca.name} would need an income of {usd0(ca.incomeNeeded)}, which is{" "}
            {(ca.incomeNeeded / ca.income).toFixed(1)} times its actual median of{" "}
            {usd0(ca.income)}.
          </li>
          <li>
            <strong>The rate rise alone is expensive.</strong> A year earlier the same Freddie Mac
            survey showed {yearAgoRate}%. Holding the home value fixed, the higher rate adds{" "}
            {usd0(rateJump)} a month on the median U.S. home and lifts the national share from{" "}
            {pct1(us.shareYearAgoRate)} to {pct1(us.share)}. The number of places over{" "}
            {guideline}% rises from {usYearAgoOver.overGuideline} to {overGuideline.length}.
          </li>
          <li>
            <strong>Property tax moves the ranking.</strong> {il.name} and {pa.name} have almost
            the same median home value ({usd0(il.value)} and {usd0(pa.value)}), but the{" "}
            {il.name} payment is {usd0(il.payment - pa.payment)} higher because property tax adds{" "}
            {usd0(il.taxMonthly)} a month there against {usd0(pa.taxMonthly)}. At the other
            extreme, {hi.name} has the lowest effective tax rate ({hi.taxRate.toFixed(2)}% of
            value) and still has the highest share of income, because the median home costs{" "}
            {hi.priceToIncome.toFixed(1)} times the median income.
          </li>
          <li>
            <strong>It is not only a coastal problem.</strong> Mountain West and Sun Belt states
            sit well above the guideline:{" "}
            {longList(sunBelt.map((r) => `${r.name} (${pct1(r.share)})`))}.
          </li>
        </ul>

        <h2>How the rate changes the picture</h2>
        <p>
          The mortgage rate is the one input that can change next week, so here is the same
          calculation at five rates. Each row recomputes all {total} places.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                30-year fixed rate
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Payment, median U.S. home
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share of income
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                States and DC over {guideline}%
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {sensitivity.map((row) => (
              <tr
                key={row.rate}
                className={row.rate === REPORT.mortgageRate ? "bg-brand-50 font-semibold" : ""}
              >
                <td className="px-3 py-2 text-ink-800">{row.label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(row.usPayment)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(row.usShare)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {row.overGuideline} of {total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. “Income needed” is the annual
          household income at which the payment equals {guideline}% of gross income.
        </p>
        <div className="mt-4">
          <StateAffordabilityTable rows={tableRows} guidelinePct={guideline} />
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
          Three Census Bureau tables supply the housing and income inputs for each state. We
          apply one fixed-rate loan formula to all of them.
        </p>
        <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-sm">
          Payment = P&I + (median property tax ÷ 12), where P&I = L × r
          ÷ (1 − (1 + r)<sup>−n</sup>)
        </p>
        <ul>
          <li>
            <strong>L</strong> is the loan: median home value (ACS table B25077) less a{" "}
            {REPORT.downPaymentPct}% down payment.
          </li>
          <li>
            <strong>r</strong> is the monthly rate: {rate}% ÷ 12 = {(REPORT.mortgageRate / 12).toFixed(4)}%.{" "}
            <strong>n</strong> is {REPORT.termYears * 12} monthly payments.
          </li>
          <li>
            <strong>Property tax</strong> is the median real estate tax paid by owner-occupied
            homes (B25103), divided by 12.
          </li>
          <li>
            <strong>Income</strong> is median household income (B19013) before taxes, divided by
            12. <strong>Share of income</strong> is payment ÷ monthly income.
          </li>
          <li>
            <strong>Income needed</strong> is payment × 12 ÷ {guideline / 100}.
          </li>
        </ul>
        <p>
          Worked example, United States: {usd0(us.value)} × 80% = {usd0(us.loan)}. At {rate}%
          over 360 months the principal and interest is {usd0(us.pi)}. Property tax of{" "}
          {usd0(us.tax)} a year adds {usd0(us.taxMonthly)}, for {usd0(us.payment)} a month.
          Median income of {usd0(us.income)} is {usd0(us.incomeMonthly)} a month, so the share is{" "}
          {pct1(us.share)}. You can run the same inputs in our{" "}
          <Link href="/calculators/mortgage">mortgage payment calculator</Link>.
        </p>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>Values are from {REPORT.acsYear}; the rate is from {REPORT.mortgageRateDate}.</strong>{" "}
            Home values have moved since the survey year. The result is the cost of financing a{" "}
            {REPORT.acsYear} median home at today’s rate. The Census Bureau has scheduled
            the 2025 ACS 1-year release for October 29, 2026, and we will update this report
            after it.
          </li>
          <li>
            <strong>Values are owner estimates.</strong> ACS asks owners what their home is
            worth. It is not a sales price, and it includes homes bought years ago. A first-time
            buyer usually buys below the median.
          </li>
          <li>
            <strong>Property tax reflects current owners.</strong> In states that reassess a home
            when it sells, California’s Proposition 13 being the best known, a new
            buyer’s bill is typically higher than the median owner’s, so the payment
            there is understated.
          </li>
          <li>
            <strong>Insurance, HOA dues, and maintenance are excluded.</strong> The common{" "}
            {guideline}% guideline includes homeowners insurance, so the shares here are a floor.
            No private mortgage insurance is assumed because the down payment is{" "}
            {REPORT.downPaymentPct}%.
          </li>
          <li>
            <strong>Income covers all households.</strong> The median includes renters. Owner
            households earn more than the all-household median, so a typical buyer’s share
            can be lower than the figures here.
          </li>
          <li>
            <strong>The rate is a national average.</strong> Freddie Mac’s survey covers
            conforming loans for well-qualified borrowers with 20% down. Your rate depends on
            credit, loan type, and lender.
          </li>
          <li>
            <strong>ACS figures are estimates with margins of error.</strong> The Census Bureau
            publishes 90% margins for every number. We combine them into a conservative range
            for each share (hover a bar in the table). Most ranges are within about one
            percentage point of the estimate, but they are wider for{" "}
            {longList(
              widest.map(
                (r) => `${r.name} (${pct1(r.shareLow)} to ${pct1(r.shareHigh)})`,
              ),
            )}
            . Treat states a point or two apart as ties.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsHome,
          REPORT_SOURCES.acsTax,
          REPORT_SOURCES.acsIncome,
          REPORT_SOURCES.acsBrief,
          REPORT_SOURCES.pmms,
          REPORT_SOURCES.acsRelease,
        ]}
        checked="October 2026"
        note={`Median home value and median household income for all 51 places were checked against the Census Bureau's own published tables, and property tax figures against data.census.gov and a second compilation of the same table. See our methodology page for how we verify figures.`}
      />

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Cite or reuse this report</h2>
        <p className="mt-2 text-sm text-ink-600">
          The figures calculated by {site.name} (payments, shares, income needed, rankings) are
          licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline"
          >
            CC BY 4.0
          </a>
          : you may copy, chart, and republish them, including commercially, with a link back to
          this page. The Census Bureau inputs are public domain.
        </p>
        <p className="mt-3 rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-700">{citation}</p>
        <p className="mt-3 text-sm text-ink-600">
          Want the calculator itself on your site?{" "}
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
            { href: "/calculators/mortgage", label: "Mortgage Payment Calculator", note: "Test any price, rate, and down payment" },
            { href: "/calculators/home-affordability", label: "Home Affordability Calculator", note: "Find the price your income supports" },
            { href: "/calculators/down-payment", label: "Down Payment Calculator", note: "Plan the cash you need up front" },
            { href: "/calculators/debt-to-income", label: "Debt-to-Income Calculator", note: "Check the 36% back-end ratio" },
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
          Related guides:{" "}
          <Link href="/guides/how-much-house-can-i-afford" className="text-brand-600 underline">
            How much house can I afford
          </Link>
          ,{" "}
          <Link href="/guides/how-much-down-payment-for-house" className="text-brand-600 underline">
            how much down payment you need
          </Link>
          , and{" "}
          <Link href="/guides/debt-to-income-ratio-guide" className="text-brand-600 underline">
            the debt-to-income ratio guide
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
