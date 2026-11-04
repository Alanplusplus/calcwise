import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import { site } from "@/lib/site";
import {
  DEFAULT_NEW_CAR_APR,
  FEDERAL_UNDERGRAD_DIRECT_RATE_2026_27,
  G19_CREDIT_CARD_APR,
  MORTGAGE_MARKET,
  MORTGAGE_MARKET_SOURCES,
} from "@/lib/market-data";

const title = "Simple vs Compound Interest: Differences and Examples";
const h1 = "Simple vs Compound Interest: What’s the Difference and Why It Matters";
const description =
  "Simple vs compound interest explained: the formulas, a $10,000 example over 30 years, and how to tell which one your loan, card, or savings uses.";
const slug = "simple-vs-compound-interest";
const datePublished = "2026-11-04";
const dateModified = "2026-11-04";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "simple vs compound interest",
    "simple interest vs compound interest",
    "difference between simple and compound interest",
    "APR vs APY",
    "simple interest loan",
  ],
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "article",
    publishedTime: datePublished,
    modifiedTime: dateModified,
  },
};

// ---- Math helpers: every number on the page is computed here, never typed by hand ----
const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const usd2 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
const pct2 = (n: number) => `${n.toFixed(2)}%`;

const simpleValue = (p: number, r: number, t: number) => p * (1 + r * t);
const compoundValue = (p: number, r: number, n: number, t: number) => p * Math.pow(1 + r / n, n * t);
const apy = (ratePct: number, n: number) => (Math.pow(1 + ratePct / 100 / n, n) - 1) * 100;
const monthlyPayment = (loan: number, aprPct: number, months: number) => {
  const i = aprPct / 100 / 12;
  return (loan * i) / (1 - Math.pow(1 + i, -months));
};

// Benchmarks (checked November 2026). Market rates come from the shared data module.
const CARD_APR = G19_CREDIT_CARD_APR.assessedInterest;
const AUTO_APR = Number(DEFAULT_NEW_CAR_APR);
const STUDENT_RATE = FEDERAL_UNDERGRAD_DIRECT_RATE_2026_27;
const MORTGAGE_RATE = MORTGAGE_MARKET.thirtyYear;
/** FDIC national average rates, October 19, 2026 release (September-end data). */
const FDIC_SAVINGS = 0.38;
const FDIC_CD_12M = 1.76;
/** Illustrative competitive online-account yield used in the case study; not a quoted offer. */
const HYSA_ILLUSTRATIVE = 4.0;

// Core example: $10,000 at 5%
const P = 10000;
const R = 0.05;
const growthYears = [1, 5, 10, 20, 30];
const growthRows = growthYears.map((t) => ({
  t,
  simple: simpleValue(P, R, t),
  annual: compoundValue(P, R, 1, t),
  monthly: compoundValue(P, R, 12, t),
  daily: compoundValue(P, R, 365, t),
}));
const g10 = growthRows.find((r) => r.t === 10)!;
const g30 = growthRows.find((r) => r.t === 30)!;
const gap30 = g30.monthly - g30.simple;
const freqGap10 = g10.daily - g10.annual;

// APR to APY
const apyAt5 = [1, 4, 12, 365].map((n) => ({ n, apy: apy(5, n) }));
const cardApy = apy(CARD_APR, 365);

// Add-on (precomputed) loan vs simple-interest loan, same quoted rate
const LOAN = 22000;
const MONTHS = 60;
const simplePmt = monthlyPayment(LOAN, AUTO_APR, MONTHS);
const simpleInterestTotal = simplePmt * MONTHS - LOAN;
const addOnInterest = LOAN * (AUTO_APR / 100) * (MONTHS / 12);
const addOnPmt = (LOAN + addOnInterest) / MONTHS;
const addOnApr = (() => {
  let lo = 0;
  let hi = 100;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (monthlyPayment(LOAN, mid, MONTHS) < addOnPmt) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
})();

// Mortgage month 1 split (simple interest on the remaining balance)
const MORT = 300000;
const mortPmt = monthlyPayment(MORT, MORTGAGE_RATE, 360);
const mortInterest1 = (MORT * (MORTGAGE_RATE / 100)) / 12;
const mortPrincipal1 = mortPmt - mortInterest1;

// Student loan daily accrual (Federal Student Aid formula: balance x rate / 365.25)
const STUDENT_BAL = 12000;
const studentDaily = (STUDENT_BAL * (STUDENT_RATE / 100)) / 365.25;
const studentDays = 4 * 365.25;
const studentAccrued = studentDaily * studentDays;

// Case study: where does $6,000 work hardest for the next 12 months?
const WINDFALL = 6000;
const caseCardSimple = WINDFALL * (CARD_APR / 100);
const caseCardCompound = WINDFALL * (cardApy / 100);
const caseAuto = WINDFALL * (AUTO_APR / 100);
const caseStudent = WINDFALL * (STUDENT_RATE / 100);
const caseStudentAutopay = WINDFALL * ((STUDENT_RATE - 1) / 100);
const caseHysa = WINDFALL * (HYSA_ILLUSTRATIVE / 100);
const caseFdic = WINDFALL * (FDIC_SAVINGS / 100);

// CD with interest paid out (simple) vs reinvested (compound)
const CD_AMOUNT = 15000;
const CD_RATE = 0.04;
const cdYears = 5;
const cdSimple = CD_AMOUNT * CD_RATE * cdYears;
const cdCompound = CD_AMOUNT * Math.pow(1 + CD_RATE, cdYears) - CD_AMOUNT;

const faqs = [
  {
    question: "Is simple interest better than compound interest?",
    answer: `It depends on which side of the account you are on. For money you save or invest, compound interest is better: $10,000 at 5% for 10 years earns ${usd0(g10.simple - P)} with simple interest and ${usd0(g10.monthly - P)} with monthly compounding. For money you borrow, you want the lowest interest that accrues, so a loan that charges simple interest on the declining balance is better than one that compounds on unpaid interest. Credit cards compound daily, which is why a ${CARD_APR.toFixed(2)}% APR costs about ${pct2(cardApy)} a year if the balance is never paid.`,
  },
  {
    question: "Does a mortgage use compound interest?",
    answer: `A standard fixed-rate mortgage accrues interest on the remaining balance and you pay that interest with each payment, so interest never piles up on interest. On a ${usd0(MORT)} loan at ${MORTGAGE_RATE.toFixed(2)}% the first month’s interest is ${usd2(mortInterest1)} of a ${usd2(mortPmt)} payment, and the other ${usd2(mortPrincipal1)} reduces the balance. Compounding only enters if a payment is smaller than the interest due, which is rare and usually disclosed. Our amortization schedule guide shows how the split shifts over 30 years.`,
  },
  {
    question: "How much does compounding frequency matter?",
    answer: `Less than most people expect. On $10,000 at 5% for 10 years, annual compounding grows to ${usd0(g10.annual)}, monthly to ${usd0(g10.monthly)}, and daily to ${usd0(g10.daily)}. The difference between annual and daily compounding is ${usd0(freqGap10)} over a decade, while moving the rate from 5% to 6% or adding 10 more years changes the result by thousands. Compare accounts on APY, which already includes the compounding frequency, and spend your effort on rate and time.`,
  },
  {
    question: "Do federal student loans compound?",
    answer: `Federal student loans accrue simple daily interest: balance times rate divided by 365.25. On ${usd0(STUDENT_BAL)} at ${STUDENT_RATE.toFixed(2)}% that is about ${usd2(studentDaily)} a day, or ${usd0(studentAccrued)} over four years of school if nothing is paid. Interest does not compound while it accrues, but it can capitalize: when unpaid interest is added to the principal, for example at the end of a deferment on an unsubsidized loan, later interest accrues on the larger balance. Paying accrued interest before one of those events avoids the jump.`,
  },
  {
    question: "What does APY tell me that APR does not?",
    answer: `APY includes how often interest compounds and APR does not. Regulation DD defines the annual percentage yield as the total interest earned on an account over a 365-day period, based on the rate and the frequency of compounding. A 5% rate compounded monthly is a ${pct2(apyAt5[2].apy)} APY, and a ${CARD_APR.toFixed(2)}% card APR compounded daily works out to ${pct2(cardApy)} a year. When you compare two offers, convert both to the same yearly measure first.`,
  },
];

const compareProducts = [
  {
    product: "Credit card",
    method: "Compounds daily: the daily periodic rate (APR ÷ 365) is applied to a balance that includes yesterday’s interest",
    quoted: "APR",
    benchmark: `${CARD_APR.toFixed(2)}% APR on accounts assessed interest (Aug. 2026), about ${pct2(cardApy)} a year after daily compounding`,
  },
  {
    product: "Savings, money market, CD",
    method: "Compounds on the schedule the bank sets (daily or monthly is common); the account must disclose APY",
    quoted: "APY",
    benchmark: `National average ${pct2(FDIC_SAVINGS)} savings and ${pct2(FDIC_CD_12M)} 12-month CD (FDIC, Oct. 19, 2026); competitive online accounts pay well above that`,
  },
  {
    product: "Auto loan (simple interest)",
    method: "Interest accrues daily on the unpaid principal only; none is added to the balance",
    quoted: "APR",
    benchmark: `${pct2(AUTO_APR)} on a 60-month new-car loan at commercial banks (Fed G.19, Aug. 2026)`,
  },
  {
    product: "Federal student loan",
    method: "Simple daily interest (balance × rate ÷ 365.25); unpaid interest can capitalize at specific events",
    quoted: "Fixed rate",
    benchmark: `${pct2(STUDENT_RATE)} for undergraduate Direct Loans first disbursed July 2026 to June 2027`,
  },
  {
    product: "Fixed-rate mortgage",
    method: "Interest accrues on the remaining balance and is paid each month, so it is simple interest on a shrinking balance",
    quoted: "Rate and APR",
    benchmark: `${pct2(MORTGAGE_RATE)} 30-year average (Freddie Mac, ${MORTGAGE_MARKET.asOfLabel})`,
  },
  {
    product: "Precomputed (add-on) loan",
    method: "Total interest is calculated up front on the full original principal and spread evenly across payments",
    quoted: "Add-on rate (check the APR)",
    benchmark: "Uncommon for auto loans, per the CFPB; it penalizes early payoff",
  },
];

export default function SimpleVsCompoundInterestGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified}
        image="/images/guides/simple-vs-compound-interest.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Simple vs Compound Interest", href: `/guides/${slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Savings & Investment
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{h1}</h1>
          <p className="mt-4 text-lg text-ink-600">
            A savings account advertises 5% and a loan offer also says 5%, but they are not the same
            5%. One may add interest to your balance every day and then charge interest on that interest.
            The other may charge interest only on the money you still owe. On {usd0(P)} over 30 years, the
            two methods differ by {usd0(gap30)}. This guide shows the formulas, the real-world examples,
            and how to tell which method your own accounts use.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: November 2026</p>
        </header>

        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">TL;DR - Quick Answer</h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Simple interest</strong> is charged only on the original principal:{" "}
              {usd0(P)} at 5% for 10 years earns {usd0(g10.simple - P)}.
            </li>
            <li>
              <strong>Compound interest</strong> is charged on principal plus past interest: the same{" "}
              {usd0(P)} compounded monthly earns {usd0(g10.monthly - P)}, and after 30 years the gap is{" "}
              {usd0(gap30)}.
            </li>
            <li>
              <strong>Credit cards and savings accounts compound.</strong> A {CARD_APR.toFixed(2)}% card
              APR costs about {pct2(cardApy)} a year if you never pay the balance.
            </li>
            <li>
              <strong>Auto loans, federal student loans, and mortgages accrue simple interest</strong> on
              the unpaid balance, so extra payments save interest at your stated rate, with no compounding
              (student loans can capitalize unpaid interest at set events).
            </li>
            <li>
              <strong>Rule of thumb:</strong> compounding helps you when you save and hurts you when you
              carry a balance, so pay down the highest effective rate first.
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Run the math yourself with the{" "}
            <Link href="/calculators/simple-interest" className="font-medium text-brand-600 underline">
              Simple Interest Calculator
            </Link>{" "}
            and the{" "}
            <Link href="/calculators/compound-interest" className="font-medium text-brand-600 underline">
              Compound Interest Calculator
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/simple-vs-compound-interest.webp"
              alt="Bar chart comparing simple and monthly compound interest on $10,000 at 5%: $15,000 versus $16,470 after 10 years, $20,000 versus $27,126 after 20 years, and $25,000 versus $44,677 after 30 years, a $19,677 gap"
              width={1200}
              height={795}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              The same 5% rate, two methods: the gap is small in year 1 and large by year 30
            </figcaption>
          </figure>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">The Two Formulas</h2>
          <p className="mt-4 text-ink-700">
            Simple interest multiplies the original amount by the rate and the number of years. Compound
            interest grows the balance each period, so the next period’s interest is calculated on a
            larger number.
          </p>
          <p className="mt-4 rounded-lg bg-ink-50 p-4 text-center font-mono text-sm text-ink-800">
            Simple: I = P × r × t, so the balance is A = P × (1 + r × t)
          </p>
          <p className="mt-3 rounded-lg bg-ink-50 p-4 text-center font-mono text-sm text-ink-800">
            Compound: A = P × (1 + r ÷ n)<sup>n × t</sup>
          </p>
          <ul className="mt-4 space-y-1 text-ink-700">
            <li>
              <strong>P</strong> is the principal, the amount you deposit or borrow.
            </li>
            <li>
              <strong>r</strong> is the annual rate as a decimal (5% is 0.05).
            </li>
            <li>
              <strong>t</strong> is the time in years.
            </li>
            <li>
              <strong>n</strong> is how many times per year interest compounds: 1 for annual, 12 for
              monthly, 365 for daily.
            </li>
          </ul>
          <p className="mt-4 text-ink-700">
            Worked example with {usd0(P)} at 5% for 10 years. Simple: {usd0(P)} × (1 + 0.05 × 10) ={" "}
            {usd0(g10.simple)}, so the interest is {usd0(g10.simple - P)}. Compounded monthly: {usd0(P)} ×
            (1 + 0.05 ÷ 12)<sup>120</sup> = {usd0(g10.monthly)}, so the interest is{" "}
            {usd0(g10.monthly - P)}. The compounded account earns {usd0(g10.monthly - g10.simple)} more
            from the same rate and the same deposit, because every year after the first earns interest
            on the previous years’ interest.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">Why the Gap Keeps Growing</h2>
          <p className="mt-4 text-ink-700">
            Simple interest adds the same {usd0(P * R)} every year. Compound interest adds a larger
            amount each year, so the lines start together and then pull apart. Here is {usd0(P)} at 5%
            at five time horizons.
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Years</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Simple</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Compound, annual</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Compound, monthly</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Compound, daily</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Monthly minus simple</th>
                </tr>
              </thead>
              <tbody>
                {growthRows.map((row) => (
                  <tr key={row.t} className="border-b border-ink-100">
                    <td className="px-4 py-2 text-ink-700">{row.t}</td>
                    <td className="px-4 py-2 text-right text-ink-700">{usd0(row.simple)}</td>
                    <td className="px-4 py-2 text-right text-ink-700">{usd0(row.annual)}</td>
                    <td className="px-4 py-2 text-right text-ink-700">{usd0(row.monthly)}</td>
                    <td className="px-4 py-2 text-right text-ink-700">{usd0(row.daily)}</td>
                    <td className="px-4 py-2 text-right font-medium text-ink-800">
                      {usd0(row.monthly - row.simple)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-700">
            Two things stand out. First, time does the heavy lifting: in year 1 compounding adds only{" "}
            {usd0(growthRows[0].monthly - growthRows[0].simple)}, but by year 30 it adds{" "}
            {usd0(gap30)}. Second, the compounding frequency barely matters next to time and rate: daily
            instead of annual compounding adds just {usd0(freqGap10)} after 10 years. For the same
            reason, the Rule of 72 (divide 72 by the rate to estimate the doubling time) works only for
            compounding, and our{" "}
            <Link
              href="/guides/compound-interest-real-examples"
              className="font-medium text-brand-600 underline"
            >
              compound interest examples guide
            </Link>{" "}
            applies it to retirement saving and debt.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">APR vs APY: The Same Rate With Two Labels</h2>
          <p className="mt-4 text-ink-700">
            The label tells you which kind of rate you are looking at. APR (annual percentage rate) is
            the stated yearly rate and usually ignores compounding. APY (annual percentage yield) is the
            amount you actually earn in a year once compounding is included. Federal rules require banks
            to disclose APY on deposit accounts, and the formula is APY = (1 + r ÷ n)<sup>n</sup> − 1.
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Stated rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Compounding</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Effective yearly rate</th>
                </tr>
              </thead>
              <tbody>
                {apyAt5.map((row) => (
                  <tr key={row.n} className="border-b border-ink-100">
                    <td className="px-4 py-2 text-ink-700">5.00%</td>
                    <td className="px-4 py-2 text-ink-700">
                      {row.n === 1
                        ? "Annually"
                        : row.n === 4
                          ? "Quarterly"
                          : row.n === 12
                            ? "Monthly"
                            : "Daily"}
                    </td>
                    <td className="px-4 py-2 text-right text-ink-700">{pct2(row.apy)}</td>
                  </tr>
                ))}
                <tr className="border-b border-ink-100 bg-brand-50">
                  <td className="px-4 py-2 font-medium text-ink-800">{CARD_APR.toFixed(2)}% card APR</td>
                  <td className="px-4 py-2 font-medium text-ink-800">Daily</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-800">{pct2(cardApy)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-ink-700">
            The card row is the one that costs money. Card issuers divide the APR by 365 to get a daily
            periodic rate, apply it to the balance each day, and add the interest to the next day’s
            balance. The Federal Reserve’s G.19 report puts the average APR on accounts that were
            assessed interest at {CARD_APR.toFixed(2)}% for August 2026, so a balance left alone for a
            year grows by about {pct2(cardApy)}, not {CARD_APR.toFixed(2)}%. Our{" "}
            <Link href="/calculators/credit-card-payoff" className="font-medium text-brand-600 underline">
              Credit Card Payoff Calculator
            </Link>{" "}
            models this with your actual payment.
          </p>
          <Sources
            items={[
              {
                label: "CFPB: What is a daily periodic rate on a credit card?",
                href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-daily-periodic-rate-on-a-credit-card-en-46/",
              },
              {
                label: "CFPB, Regulation DD (12 CFR 1030) Appendix A: APY calculation",
                href: "https://www.consumerfinance.gov/rules-policy/regulations/1030/A",
              },
              ...G19_CREDIT_CARD_APR.sources,
            ]}
            checked="November 2026"
            note="Effective yearly rate = (1 + APR ÷ 365)^365 − 1, assuming no payments and no new purchases."
          />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">Which Method Does Your Money Actually Use?</h2>
          <p className="mt-4 text-ink-700">
            Most consumer products fall into one of two groups: balances that grow on interest (cards,
            savings) and balances that accrue interest only on what is still owed (most installment loans).
            The table shows how the common ones work and what rate to expect today.
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">How interest is charged</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Quoted as</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Benchmark</th>
                </tr>
              </thead>
              <tbody>
                {compareProducts.map((row) => (
                  <tr key={row.product} className="border-b border-ink-100 align-top">
                    <td className="px-4 py-3 font-medium text-ink-800">{row.product}</td>
                    <td className="px-4 py-3 text-ink-700">{row.method}</td>
                    <td className="px-4 py-3 text-ink-700">{row.quoted}</td>
                    <td className="px-4 py-3 text-ink-700">{row.benchmark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-700">
            The practical difference is what happens when you pay extra. On a simple-interest auto loan,
            every extra dollar of principal stops earning interest at the stated rate the next day, so{" "}
            {usd0(1000)} of extra principal at {pct2(AUTO_APR)} saves about {usd0(1000 * (AUTO_APR / 100))}{" "}
            in a year. On a credit card, the same {usd0(1000)} saves about{" "}
            {usd0(1000 * (cardApy / 100))} in a year because it also stops the compounding. Use the{" "}
            <Link href="/calculators/auto-loan" className="font-medium text-brand-600 underline">
              Auto Loan Calculator
            </Link>{" "}
            or the{" "}
            <Link href="/calculators/student-loan" className="font-medium text-brand-600 underline">
              Student Loan Calculator
            </Link>{" "}
            to see the payoff date move.
          </p>
          <Sources
            items={[
              ...G19_CREDIT_CARD_APR.sources,
              {
                label: "FDIC National Rates and Rate Caps, October 2026",
                href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
              },
              {
                label: "Federal Student Aid, 2026-27 Direct Loan interest rates (June 4, 2026)",
                href: "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/interest-rates-federal-direct-loans-first-disbursed-between-july-1-2026-and-june-30-2027",
              },
              {
                label: "Federal Student Aid: interest accrual and capitalization",
                href: "https://cri.studentaid.gov/content/interestcapitalization",
              },
              {
                label: "CFPB: simple interest vs precomputed interest on an auto loan",
                href: "https://www.consumerfinance.gov/ask-cfpb/whats-the-difference-between-a-simple-interest-rate-and-precomputed-interest-on-an-auto-loan-en-841/",
              },
              ...MORTGAGE_MARKET_SOURCES,
            ]}
            checked="November 2026"
            note="The auto-loan benchmark is the G.19 60-month new-car rate at commercial banks for August 2026, released October 7, 2026."
          />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">The Loan Trap: “Simple” Interest That Is Not</h2>
          <p className="mt-4 text-ink-700">
            The words “simple interest” mean two different things. In a textbook, simple interest is
            the formula I = P × r × t on a fixed principal. On a loan, a “simple interest loan” means
            interest accrues daily on the balance you still owe, which is the borrower-friendly version.
            The CFPB contrasts it with precomputed interest, where the total interest is worked out
            immediately on the full amount borrowed and spread evenly across the payments. The CFPB calls
            that method uncommon and notes it benefits the lender if you pay early.
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">
                    {usd0(LOAN)}, {MONTHS} months, quoted {pct2(AUTO_APR)}
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Monthly payment</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Total interest</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">True APR</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Simple-interest loan (balance-based)</td>
                  <td className="px-4 py-2 text-right text-ink-700">{usd2(simplePmt)}</td>
                  <td className="px-4 py-2 text-right text-ink-700">{usd0(simpleInterestTotal)}</td>
                  <td className="px-4 py-2 text-right text-ink-700">{pct2(AUTO_APR)}</td>
                </tr>
                <tr className="border-b border-ink-100 bg-brand-50">
                  <td className="px-4 py-2 font-medium text-ink-800">Precomputed add-on loan (hypothetical)</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-800">{usd2(addOnPmt)}</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-800">{usd0(addOnInterest)}</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-800">{pct2(addOnApr)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-ink-700">
            Same quoted rate, but the add-on version charges {usd0(addOnInterest - simpleInterestTotal)}{" "}
            more interest because it ignores that you owe less every month, and its true APR is about{" "}
            {pct2(addOnApr)}. The add-on row is a hypothetical to show the mechanism. Before you sign,
            compare the APR on the loan disclosure, not the “rate,” and ask whether the loan is simple
            interest or precomputed and whether early payoff is penalized.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Where Maya’s {usd0(WINDFALL)} Tax Refund Works Hardest
          </h2>
          <p className="mt-4 text-ink-700">
            Maya Ortiz, 31, is a marketing manager in Columbus, Ohio. She gets a {usd0(WINDFALL)} federal
            tax refund and has four places it could go: a {usd0(WINDFALL)} credit card balance at{" "}
            {CARD_APR.toFixed(2)}% APR, a {usd0(LOAN)} simple-interest auto loan at {pct2(AUTO_APR)}, a
            federal student loan at {pct2(STUDENT_RATE)}, or a high-yield savings account paying a
            hypothetical {pct2(HYSA_ILLUSTRATIVE)} APY. The question is which choice improves her finances
            most over the next 12 months. The table assumes the card balance would otherwise sit unpaid for
            the year, which is the upper bound; her actual payments would make the card figure smaller, but
            the ranking holds.
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Where the {usd0(WINDFALL)} goes</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Method</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Effective yearly rate</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">12-month benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100 bg-brand-50">
                  <td className="px-4 py-2 font-medium text-ink-800">Pay off the credit card</td>
                  <td className="px-4 py-2 text-ink-700">Compounds daily</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-800">{pct2(cardApy)}</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-800">{usd0(caseCardCompound)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Prepay the auto loan</td>
                  <td className="px-4 py-2 text-ink-700">Simple, on balance</td>
                  <td className="px-4 py-2 text-right text-ink-700">{pct2(AUTO_APR)}</td>
                  <td className="px-4 py-2 text-right text-ink-700">{usd0(caseAuto)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Prepay the student loan</td>
                  <td className="px-4 py-2 text-ink-700">Simple daily</td>
                  <td className="px-4 py-2 text-right text-ink-700">{pct2(STUDENT_RATE)}</td>
                  <td className="px-4 py-2 text-right text-ink-700">{usd0(caseStudent)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Save at {pct2(HYSA_ILLUSTRATIVE)} APY (illustrative)</td>
                  <td className="px-4 py-2 text-ink-700">Compounds</td>
                  <td className="px-4 py-2 text-right text-ink-700">{pct2(HYSA_ILLUSTRATIVE)}</td>
                  <td className="px-4 py-2 text-right text-ink-700">{usd0(caseHysa)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Leave it at the {pct2(FDIC_SAVINGS)} national average</td>
                  <td className="px-4 py-2 text-ink-700">Compounds</td>
                  <td className="px-4 py-2 text-right text-ink-700">{pct2(FDIC_SAVINGS)}</td>
                  <td className="px-4 py-2 text-right text-ink-700">{usd0(caseFdic)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-ink-700">
            Paying the card is worth {usd0(caseCardCompound)}, more than three times the next best use. A
            reader who treated {CARD_APR.toFixed(2)}% as simple interest would estimate only{" "}
            {usd0(caseCardSimple)}, understating the cost by {usd0(caseCardCompound - caseCardSimple)}.
            Maya clears the card first. After that, the {pct2(AUTO_APR)} auto loan beats the {pct2(STUDENT_RATE)}{" "}
            student loan and the savings account on rate, though she keeps a cash cushion before prepaying
            anything. Federal loans also carry protections, such as income-driven repayment, that disappear
            if you refinance them into a private loan, and autopay on a federal loan currently cuts the rate
            by 1 point, which trims the student-loan figure to about {usd0(caseStudentAutopay)}. Our{" "}
            <Link href="/guides/how-to-pay-off-credit-card-fast" className="font-medium text-brand-600 underline">
              guide to paying off credit card debt
            </Link>{" "}
            walks through the card payoff step by step.
          </p>
          <Sources
            items={[
              ...G19_CREDIT_CARD_APR.sources,
              {
                label: "Federal Student Aid, 2026-27 Direct Loan interest rates (June 4, 2026)",
                href: "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/interest-rates-federal-direct-loans-first-disbursed-between-july-1-2026-and-june-30-2027",
              },
              {
                label: "Federal Student Aid: auto pay 1% interest rate reduction",
                href: "https://studentaid.gov/articles/prepare-for-payments/",
              },
            ]}
            checked="November 2026"
            note="The savings yield is an illustration, not a quote. The 1-point autopay reduction applies to Direct Loans originated after July 1, 2012 when the borrower is enrolled in auto pay by December 31, 2026, and it runs through June 30, 2028."
          />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">Student Loans and Mortgages: Simple Interest, Different Traps</h2>
          <p className="mt-4 text-ink-700">
            Federal student loans accrue simple daily interest using the formula balance × rate ÷ 365.25.
            On {usd0(STUDENT_BAL)} at {pct2(STUDENT_RATE)} that is {usd2(studentDaily)} a day, or{" "}
            {usd0(studentAccrued)} over four years in school if nothing is paid. The trap is
            capitalization: Federal Student Aid says unpaid interest on a Direct unsubsidized loan is added
            to the principal when a deferment ends, and in certain income-based repayment exits, after
            which interest accrues on the larger balance. Paying the accrued interest before that point
            keeps the principal unchanged.
          </p>
          <p className="mt-4 text-ink-700">
            A fixed-rate mortgage works differently. On a {usd0(MORT)} loan at {pct2(MORTGAGE_RATE)} the
            first month’s interest is {usd2(mortInterest1)} of the {usd2(mortPmt)} payment, so only{" "}
            {usd2(mortPrincipal1)} reduces the balance. The interest is calculated on a shrinking balance
            and paid every month, so it never compounds, but it is front-loaded, which is why extra
            payments early in the term save the most. The{" "}
            <Link href="/guides/amortization-schedule-explained" className="font-medium text-brand-600 underline">
              amortization schedule guide
            </Link>{" "}
            shows the full 30-year split.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">Savings Side: Interest Paid Out vs Reinvested</h2>
          <p className="mt-4 text-ink-700">
            You can also choose simple or compound behavior on a deposit. A {usd0(CD_AMOUNT)} certificate
            of deposit at {(CD_RATE * 100).toFixed(2)}% for {cdYears} years that pays its interest out to
            your checking account earns {usd0(cdSimple)}, which is simple interest in effect. If the
            interest stays in the CD, it earns {usd0(cdCompound)}, which is {usd0(cdCompound - cdSimple)}{" "}
            more. The gap is modest over {cdYears} years and grows with time, so for long-term money leave
            interest invested. For the best current deposit rates, see our{" "}
            <Link href="/guides/high-yield-savings-vs-cd" className="font-medium text-brand-600 underline">
              high-yield savings vs CD guide
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">Step-by-Step: Find Out Which One You Have</h2>
          <ol className="mt-4 list-inside list-decimal space-y-4 text-ink-700">
            <li>
              <strong>Read the label.</strong> A rate called APY on a deposit account already includes
              compounding. A rate called APR on a card or loan is the stated yearly rate and does not.
              If you only see “interest rate,” ask which one it is.
            </li>
            <li>
              <strong>Convert everything to an effective yearly rate.</strong> Use (1 + r ÷ n)
              <sup>n</sup> − 1. A {CARD_APR.toFixed(2)}% card compounded daily is {pct2(cardApy)}, and a
              5% account compounded monthly is {pct2(apyAt5[2].apy)}. Compare offers on that number.
            </li>
            <li>
              <strong>Ask whether a loan is simple interest or precomputed.</strong> Look for the
              phrases “simple interest,” “daily accrual,” or “precomputed” in the contract, and confirm
              there is no prepayment penalty. If the payment looks too low for the quoted rate, the
              interest may have been computed on the original principal.
            </li>
            <li>
              <strong>Check for capitalization.</strong> On student loans, view accrued interest on your
              servicer dashboard and pay it before a deferment ends or you change repayment plans.
            </li>
            <li>
              <strong>Target the highest effective rate first.</strong> Pay down balances that compound
              (cards) before balances that accrue simple interest (auto, student, mortgage), unless a
              lower-rate loan has a penalty or protection you would lose.
            </li>
            <li>
              <strong>Put savings where interest compounds, and leave it alone.</strong> Choose the highest
              APY you can get with FDIC or NCUA insurance, keep interest invested, and avoid withdrawals
              that restart the compounding clock.
            </li>
          </ol>
        </section>

        <div className="my-8 rounded-lg border border-brand-200 bg-brand-50 p-6 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Numbers</p>
          <p className="mt-1 text-sm text-ink-600">
            Compare simple and compound growth on your own balance, rate, and time frame.
          </p>
          <div className="mt-3 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators/simple-interest"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Open Simple Interest Calculator
            </Link>
            <Link
              href="/calculators/compound-interest"
              className="inline-block rounded-lg border border-brand-600 px-5 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              Open Compound Interest Calculator
            </Link>
            <Link
              href="/calculators/savings-goal"
              className="inline-block rounded-lg border border-brand-600 px-5 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              Open Savings Goal Calculator
            </Link>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">FAQ</h2>
          {faqs.map((faq) => (
            <div key={faq.question} className="mt-8">
              <h3 className="text-lg font-semibold text-ink-800">{faq.question}</h3>
              <p className="mt-2 text-ink-700">{faq.answer}</p>
            </div>
          ))}
        </section>

        <RelatedGuides
          currentSlug={slug}
          relatedSlugs={[
            "compound-interest-real-examples",
            "high-yield-savings-vs-cd",
            "how-to-pay-off-credit-card-fast",
          ]}
        />
      </article>
    </>
  );
}
