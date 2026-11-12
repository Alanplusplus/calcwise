import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateRentBuyTable } from "@/components/StateRentBuyTable";
import { site } from "@/lib/site";
import {
  CSV_HEADER,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_BEDROOMS,
  US_RESULT,
  getStateResult,
  mult,
  pct1,
  sensitivityAt,
  usd0,
} from "@/lib/reports/rent-vs-buy-by-state";

const rate = REPORT.mortgageRate.toFixed(2);
const yearAgoRate = REPORT.mortgageRateYearAgo.toFixed(2);

const title = "Rent vs. Buy by State: Median Rent vs. Mortgage Payment";
const h1 = "Rent vs. Buy by State: Median Rent vs. the Payment on the Median Home";
const description = `What owning the median home costs a month at ${rate}% against the median rent in all 50 states and DC, with break-even rates, income shares, and a free CSV.`;

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
const best = STATE_RESULTS[0];
const worst = STATE_RESULTS[total - 1];
const closestFive = STATE_RESULTS.slice(0, 5);
const widestFive = STATE_RESULTS.slice(-5).reverse();
const atOrBelowRent = STATE_RESULTS.filter((r) => r.ratio <= 1);
const atOrBelowExEquity = STATE_RESULTS.filter((r) => r.ratioExEquity <= 1);
const noBreakEven = STATE_RESULTS.filter((r) => r.breakEvenRate === null);
const rentOver30 = STATE_RESULTS.filter((r) => r.rentShare > 30);
const buyOver50 = STATE_RESULTS.filter((r) => r.renterBuyShare > 50);
const rentIncomeHighest = [...STATE_RESULTS].sort((a, b) => b.rentShare - a.rentShare)[0];
const rentIncomeLowest = [...STATE_RESULTS].sort((a, b) => a.rentShare - b.rentShare)[0];
const downYearsHigh = [...STATE_RESULTS].sort(
  (a, b) => b.downPaymentYearsOfRent - a.downPaymentYearsOfRent,
)[0];
const downYearsLow = [...STATE_RESULTS].sort(
  (a, b) => a.downPaymentYearsOfRent - b.downPaymentYearsOfRent,
)[0];
const priceToRentHigh = [...STATE_RESULTS].sort((a, b) => b.priceToRent - a.priceToRent)[0];
const priceToRentLow = [...STATE_RESULTS].sort((a, b) => a.priceToRent - b.priceToRent)[0];
const highestTax = [...STATE_RESULTS].sort((a, b) => b.taxMonthly - a.taxMonthly)[0];
const widestRange = [...STATE_RESULTS]
  .sort((a, b) => b.ratioHigh - b.ratioLow - (a.ratioHigh - a.ratioLow))
  .slice(0, 4);
const ca = mustGet("CA");
const noBreakEvenExample = noBreakEven[0];
const noBreakEvenNames = longList(noBreakEven.map((r) => r.name));
const exEquityNames =
  atOrBelowExEquity.length > 0 ? ` (${longList(atOrBelowExEquity.map((r) => r.name))})` : "";
const sens = REPORT.sensitivityRates.map((r) => ({
  ...sensitivityAt(r),
  label:
    r === REPORT.mortgageRate
      ? `${r.toFixed(2)}% (Freddie Mac, ${REPORT.mortgageRateDate})`
      : r === REPORT.mortgageRateYearAgo
        ? `${r.toFixed(2)}% (a year earlier)`
        : `${r.toFixed(2)}%`,
}));
const at3 = sensitivityAt(3.0);
const ownerThreePlus = (US_BEDROOMS.ownerThreePlus / US_BEDROOMS.ownerTotal) * 100;
const renterThreePlus = (US_BEDROOMS.renterThreePlus / US_BEDROOMS.renterTotal) * 100;
const principalMonthly = us.principalFirstYear / 12;

const belowRentSentence =
  atOrBelowRent.length === 0
    ? `In none of the ${total} places is the payment on the median home at or below the median rent`
    : `The payment on the median home is at or below the median rent in only ${atOrBelowRent.length} of ${total} places`;

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  rent: r.rent,
  payment: Math.round(r.payment),
  ratio: r.ratio,
  ratioLow: r.ratioLow,
  ratioHigh: r.ratioHigh,
  breakEvenRate: r.breakEvenRate,
  rentShare: r.rentShare,
  renterBuyShare: r.renterBuyShare,
}));

const faqs = [
  {
    question: "Is it cheaper to rent or buy in my state?",
    answer: `At ${rate}% with 20% down, the monthly payment on the median home is higher than the median rent in every state in the data. Nationally it is ${usd0(us.payment)} against ${usd0(us.rent)}, or ${mult(us.ratio)} the rent. The gap runs from ${mult(best.ratio)} in ${best.name} to ${mult(worst.ratio)} in ${worst.name}. The state table above has your state, and the rent vs buy calculator lets you test your own price, rent, and rate.`,
  },
  {
    question: "What mortgage rate makes buying as cheap as renting?",
    answer: `Holding home values and rents at their ${REPORT.acsYear} medians, the U.S. payment equals the median rent at a mortgage rate of about ${us.breakEvenRate?.toFixed(2)}%. That is ${(REPORT.mortgageRate - (us.breakEvenRate ?? 0)).toFixed(2)} points below the ${rate}% average. State break-even rates range from ${best.breakEvenRate?.toFixed(2)}% in ${best.name} to under 1% in several expensive states, and ${noBreakEven.length} places${noBreakEven.length > 0 ? ` (${noBreakEvenNames})` : ""} have no break-even rate because the payment is above the rent even with a 0% loan.`,
  },
  {
    question: "Why compare the payment with rent instead of the full cost of owning?",
    answer: `The payment (principal, interest, and property tax) is the part every buyer can calculate from public data, and it is the number that has to fit in a monthly budget. The report adds a second view that removes the first year of principal repaid, which is savings rather than cost. Even then, the cost of owning (interest plus property tax) is ${mult(us.ratioExEquity)} the median rent nationally. Insurance, maintenance, HOA dues, appreciation, and tax effects are not modeled; the limits section lists them.`,
  },
  {
    question: "Does the rent figure include utilities?",
    answer: `Yes. The Census Bureau's gross rent is contract rent plus the estimated monthly cost of electricity, gas, water and sewer, and fuels when the renter pays them. The mortgage payment in this report has no utilities, so an owner's real monthly outlay is higher than the payment shown and the true gap between owning and renting is wider than the table suggests.`,
  },
  {
    question: "Why does a typical renter look more cost-burdened than a typical buyer?",
    answer: `Renter and owner households have very different incomes. The U.S. median renter household earns ${usd0(us.renterIncome)} a year and the median owner household ${usd0(us.ownerIncome)}. Median rent takes ${pct1(us.rentShare)} of the renter figure, while the payment on the median home would take ${pct1(us.ownerShare)} of the owner figure. The same payment against a renter's income would be ${pct1(us.renterBuyShare)}, which is the barrier between renting and buying for a typical renter household.`,
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau data are public domain. A CSV with every figure is available at ${site.url}${REPORT.csvPath}.`,
  },
];

const citation = `${site.name} (${new Date(REPORT.dateModified).getUTCFullYear()}). ${h1}. ${site.url}${REPORT.path}. Data: U.S. Census Bureau, ${REPORT.acsYear} American Community Survey 1-year estimates (B25064, B25119, B25077, B25103); Freddie Mac Primary Mortgage Market Survey, ${REPORT.mortgageRateDate}.`;

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data, ${rate}% rate)`,
    description: `Monthly principal, interest, and property tax on each state's median owner-occupied home (20% down, 30-year fixed at ${rate}%) compared with median gross rent, plus break-even mortgage rates and rent and payment shares of renter and owner household income, for the 50 states and DC. Derived from ACS ${REPORT.acsYear} 1-year tables B25064, B25119, B25077, and B25103.`,
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
      "rent vs buy by state",
      "median rent by state",
      "mortgage payment vs rent",
      "price to rent ratio by state",
      "break-even mortgage rate",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsRent.href,
      REPORT_SOURCES.acsTenureIncome.href,
      REPORT_SOURCES.acsHome.href,
      REPORT_SOURCES.acsTax.href,
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

export default function RentVsBuyByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Rent vs. Buy by State", href: REPORT.path },
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
        <span className="text-ink-700">Rent vs. Buy by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        Published {longDate.format(new Date(REPORT.datePublished))} · Housing, rent, and income data:
        Census ACS {REPORT.acsYear} 1-year · Mortgage rate: Freddie Mac, {REPORT.mortgageRateDate}
      </p>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          At the {REPORT.mortgageRateDate} average 30-year rate of {rate}%, principal, interest, and
          property tax on the median U.S. home come to <strong>{usd0(us.payment)} a month</strong> with
          20% down, which is <strong>{mult(us.ratio)}</strong> the median gross rent of {usd0(us.rent)}.{" "}
          {belowRentSentence}. The gap runs from {mult(best.ratio)} in {best.name} to{" "}
          {mult(worst.ratio)} in {worst.name}.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Payment on median home vs. median rent",
            value: `${usd0(us.payment)} vs. ${usd0(us.rent)}`,
            note: `Owning costs ${usd0(us.premium)} a month more at the median`,
          },
          {
            label: "Payment ÷ rent",
            value: mult(us.ratio),
            note: `${mult(best.ratio)} in ${best.abbr} to ${mult(worst.ratio)} in ${worst.abbr}`,
          },
          {
            label: "Break-even mortgage rate, U.S.",
            value: `${us.breakEvenRate?.toFixed(2)}%`,
            note: `Rate at which the payment equals the median rent. Today: ${rate}%`,
          },
          {
            label: "Payment as share of renter income",
            value: pct1(us.renterBuyShare),
            note: `Rent today takes ${pct1(us.rentShare)} of the median renter household's income`,
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
            <strong>Owning costs more than renting at the median, everywhere.</strong> The median home (
            {usd0(us.value)}) with 20% down ({usd0(us.downPayment)}) means a {usd0(us.loan)} loan. At{" "}
            {rate}% the principal and interest is {usd0(us.pi)} and property tax adds{" "}
            {usd0(us.taxMonthly)}, for {usd0(us.payment)} a month against median rent of {usd0(us.rent)}.{" "}
            {belowRentSentence}. The five places where the two are closest are{" "}
            {longList(closestFive.map((r) => `${r.name} (${mult(r.ratio)})`))}. The five with the widest
            gap are {longList(widestFive.map((r) => `${r.name} (${mult(r.ratio)})`))}.
          </li>
          <li>
            <strong>Counting principal as savings does not close the gap.</strong> In the first year of
            the U.S. loan, {usd0(us.principalFirstYear)} of the payments ({usd0(principalMonthly)} a
            month) goes to principal, which you keep as equity. Remove it and the cost of owning is{" "}
            {usd0(us.costExEquity)} a month, still {mult(us.ratioExEquity)} the median rent. Only{" "}
            {atOrBelowExEquity.length} of {total} places come in at or below {mult(1)} on that basis
            {exEquityNames}.
          </li>
          <li>
            <strong>Rates would have to fall about {(REPORT.mortgageRate - (us.breakEvenRate ?? 0)).toFixed(1)}{" "}
            points for the U.S. to break even.</strong> The payment on the median home equals the
            median rent at {us.breakEvenRate?.toFixed(2)}%. At a 3.00% rate, {at3.atOrBelowRent} of{" "}
            {total} places would have a payment at or below the rent. {noBreakEven.length} places ({noBreakEvenNames})
            would still be above the rent with a 0% mortgage. In {noBreakEvenExample.name}, repaying the
            loan principal alone takes {usd0(noBreakEvenExample.loan / (REPORT.termYears * 12))} a month and
            property tax adds {usd0(noBreakEvenExample.taxMonthly)}, against a {usd0(noBreakEvenExample.rent)}{" "}
            median rent.
          </li>
          <li>
            <strong>Renters carry the heavier income burden, and buying would add to it.</strong> The
            median renter household earns {usd0(us.renterIncome)} and pays {pct1(us.rentShare)} of it in
            gross rent; {rentOver30.length} of {total} places are above 30%, led by {rentIncomeHighest.name}{" "}
            at {pct1(rentIncomeHighest.rentShare)} ({rentIncomeLowest.name} is lowest at{" "}
            {pct1(rentIncomeLowest.rentShare)}). Buying the median home would take {pct1(us.renterBuyShare)}{" "}
            of that renter income, and more than half of it in {buyOver50.length} of {total} places. The
            median owner household ({usd0(us.ownerIncome)}) would spend {pct1(us.ownerShare)}.
          </li>
          <li>
            <strong>The down payment is the other hurdle.</strong> Twenty percent down on the median home
            is {usd0(us.downPayment)}, which equals {us.downPaymentYearsOfRent.toFixed(1)} years of median
            rent. It ranges from {downYearsLow.downPaymentYearsOfRent.toFixed(1)} years in{" "}
            {downYearsLow.name} to {downYearsHigh.downPaymentYearsOfRent.toFixed(1)} in{" "}
            {downYearsHigh.name}. The price-to-rent ratio, home value divided by a year of rent, runs from{" "}
            {priceToRentLow.priceToRent.toFixed(1)} in {priceToRentLow.name} to{" "}
            {priceToRentHigh.priceToRent.toFixed(1)} in {priceToRentHigh.name} ({us.priceToRent.toFixed(1)}{" "}
            nationally).
          </li>
          <li>
            <strong>Rent and property tax move states in different directions.</strong>{" "}
            {rentIncomeHighest.name} has the highest rent burden of any state ({pct1(rentIncomeHighest.rentShare)}{" "}
            of renter income) yet sits at {mult(rentIncomeHighest.ratio)} on payment against rent, so both
            options are heavy there.{" "}
            {highestTax.name} has the highest property tax in the data ({usd0(highestTax.tax)} a year, or{" "}
            {usd0(highestTax.taxMonthly)} a month), which lifts its ratio to {mult(highestTax.ratio)} even
            though its median home ({usd0(highestTax.value)}) is far cheaper than California’s (
            {usd0(ca.value)}). {best.name} sits at the other end: a {usd0(best.value)} median home and a{" "}
            {usd0(best.rent)} median rent leave a {usd0(best.premium)} monthly premium.
          </li>
        </ul>

        <h2>How the rate changes the picture</h2>
        <p>
          The mortgage rate is the one input that can change next week, so here is the same calculation at
          six rates. Each row recomputes all {total} places. The year-earlier rate is {yearAgoRate}%.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                30-year fixed rate
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Payment, median U.S. home
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Payment ÷ rent
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                States and DC at or below rent
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Within 1.25x of rent
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {sens.map((row) => (
              <tr
                key={row.rate}
                className={row.rate === REPORT.mortgageRate ? "bg-brand-50 font-semibold" : ""}
              >
                <td className="px-3 py-2 text-ink-800">{row.label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(row.usPayment)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{mult(row.usRatio)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {row.atOrBelowRent} of {total}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {row.within25} of {total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. “Break-even rate” is the 30-year rate at which the
          payment on the state’s median home equals its median rent.
        </p>
        <div className="mt-4">
          <StateRentBuyTable rows={tableRows} />
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
          Five Census Bureau tables supply the inputs for each state. We apply one fixed-rate loan formula
          to all of them and compare the result with the median rent.
        </p>
        <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-sm">
          Payment = P&I + (median property tax ÷ 12), where P&I = L × r ÷ (1 − (1 + r)<sup>−n</sup>)
        </p>
        <ul>
          <li>
            <strong>L</strong> is the loan: median home value (ACS table B25077) less a{" "}
            {REPORT.downPaymentPct}% down payment. <strong>r</strong> is the monthly rate:{" "}
            {rate}% ÷ 12 = {(REPORT.mortgageRate / 12).toFixed(4)}%. <strong>n</strong> is{" "}
            {REPORT.termYears * 12} monthly payments.
          </li>
          <li>
            <strong>Property tax</strong> is the median real estate tax paid by owner-occupied homes
            (B25103), divided by 12. These are the same home value and tax inputs as our{" "}
            <Link href="/reports/mortgage-affordability-by-state">mortgage affordability report</Link>.
          </li>
          <li>
            <strong>Rent</strong> is median gross rent (B25064), contract rent plus tenant-paid utilities.{" "}
            <strong>Payment ÷ rent</strong> is the payment divided by that figure.
          </li>
          <li>
            <strong>Break-even rate</strong> is the mortgage rate at which the payment equals the median
            rent, found by bisection on the formula above. It is reported as “None” when the payment is
            above the rent even at a 0% rate.
          </li>
          <li>
            <strong>Interest plus tax</strong> removes the principal repaid in the first 12 payments from
            the payment, as a view of cost that excludes equity.
          </li>
          <li>
            <strong>Income shares</strong> use median household income by tenure (B25119): rent ÷ renter
            income, payment ÷ owner income, and payment ÷ renter income, each on a monthly basis.
          </li>
          <li>
            <strong>Down payment in years of rent</strong> is {REPORT.downPaymentPct}% of the median home
            value divided by 12 months of median rent.
          </li>
        </ul>
        <p>
          Worked example, United States: {usd0(us.value)} × 80% = {usd0(us.loan)}. At {rate}% over 360
          months the principal and interest is {usd0(us.pi)}. Property tax of {usd0(us.tax)} a year adds{" "}
          {usd0(us.taxMonthly)}, for {usd0(us.payment)} a month. Median gross rent is {usd0(us.rent)}, so
          the payment is {mult(us.ratio)} the rent and the monthly premium is {usd0(us.premium)}. You can
          run the same inputs in our <Link href="/calculators/mortgage">mortgage payment calculator</Link>{" "}
          or compare the two options with your own numbers in the{" "}
          <Link href="/calculators/rent-vs-buy">rent vs buy calculator</Link>.
        </p>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>The median home is a bigger home than the median rental.</strong> In the {REPORT.acsYear}{" "}
            ACS, {pct1(ownerThreePlus)} of owner-occupied homes have three or more bedrooms, against{" "}
            {pct1(renterThreePlus)} of renter-occupied homes. Part of the premium for owning pays for
            more space, and a like-for-like comparison would show a smaller gap than the table does.
          </li>
          <li>
            <strong>Gross rent includes utilities; the payment does not.</strong> The rent figure adds
            tenant-paid utilities, while the payment leaves out utilities, homeowners insurance, HOA dues,
            and maintenance that an owner pays. Those omissions make owning look cheaper than it is, so
            the real gap is wider.
          </li>
          <li>
            <strong>Equity, appreciation, and taxes are not modeled.</strong> Principal repaid is shown
            separately (the interest-plus-tax view). Price changes, transaction costs of buying and
            selling, and the effect of mortgage interest and property tax on an income tax return depend
            on your situation and are left out. Over a long stay they can outweigh a monthly premium; the{" "}
            <Link href="/guides/rent-vs-buy-decision">rent vs buy guide</Link> covers that math.
          </li>
          <li>
            <strong>Values are from {REPORT.acsYear}; the rate is from {REPORT.mortgageRateDate}.</strong>{" "}
            Home values and rents have moved since the survey year. The result is the cost of financing a{" "}
            {REPORT.acsYear} median home at today’s rate. The companion affordability report uses the
            October 22 rate of 7.32%, so its payments differ slightly from the ones here. The 2026
            estimates are expected in fall 2027, and we will update both reports after that release.
          </li>
          <li>
            <strong>Medians describe different households and homes.</strong> Median value is an owner’s
            estimate for all owner-occupied homes, including ones bought years ago. Median rent covers all
            renters, including long-term tenants. A first-time buyer usually buys below the median, and a
            new renter may pay above it. Property tax reflects current owners; where tax is reassessed
            at sale, a new buyer’s bill is typically higher.
          </li>
          <li>
            <strong>Income shares compare medians, not matched households.</strong> The share of income
            is the median rent divided by the median renter income, not the median of each household’s
            own ratio. It is a standard summary but will not match other published rent-burden figures
            exactly.
          </li>
          <li>
            <strong>ACS figures are estimates with margins of error.</strong> The Census Bureau publishes
            90% margins for every number. We combine the margins of value, tax, and rent into a
            conservative range for each ratio (hover a bar in the table). Most ranges are within about
            0.1x of the estimate, but they are wider for{" "}
            {longList(
              widestRange.map((r) => `${r.name} (${mult(r.ratioLow)} to ${mult(r.ratioHigh)})`),
            )}
            . Treat states a tenth of a point apart as ties.
          </li>
          <li>
            <strong>The rate is a national average.</strong> Freddie Mac’s survey covers conforming loans
            for well-qualified borrowers with 20% down. Your rate depends on credit, loan type, and
            lender.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsRent,
          REPORT_SOURCES.acsTenureIncome,
          REPORT_SOURCES.acsHome,
          REPORT_SOURCES.acsTax,
          REPORT_SOURCES.acsBedrooms,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
          REPORT_SOURCES.pmms,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for rent (B25064) and income by tenure (B25119) were read from the Census Bureau's ACS 1-year Summary File on November 4, 2026. The Census API requires a key, so the Summary File was used instead. The all-household income column of B25119 equals the B19013 figure used in our affordability report for every state, and the national median gross rent of $${us.rent.toLocaleString("en-US")} matches the Census table shown on data.census.gov. Bedroom shares are U.S. totals from table B25042. See our methodology page for how we verify figures.`}
      />

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Cite or reuse this report</h2>
        <p className="mt-2 text-sm text-ink-600">
          The figures calculated by {site.name} (payments, ratios, break-even rates, income shares,
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
            { href: "/calculators/rent-vs-buy", label: "Rent vs Buy Calculator", note: "Break-even year for your own rent and price" },
            { href: "/calculators/mortgage", label: "Mortgage Payment Calculator", note: "Test any price, rate, and down payment" },
            { href: "/calculators/down-payment", label: "Down Payment Calculator", note: "Plan the cash you need up front" },
            { href: "/calculators/home-affordability", label: "Home Affordability Calculator", note: "Find the price your income supports" },
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
          , the{" "}
          <Link href="/reports/housing-cost-burden-by-state" className="text-brand-600 underline">
            housing cost burden by state report
          </Link>
          , the{" "}
          <Link href="/reports/homeowners-insurance-by-state" className="text-brand-600 underline">
            homeowners insurance by state report
          </Link>
          , the{" "}
          <Link href="/reports/car-ownership-by-state" className="text-brand-600 underline">
            car ownership by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/rent-vs-buy-decision" className="text-brand-600 underline">
            rent vs buy in 2026
          </Link>
          ,{" "}
          <Link href="/guides/how-much-down-payment-for-house" className="text-brand-600 underline">
            how much down payment you need
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
