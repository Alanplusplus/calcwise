import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import {
  MEDICARE_EMPLOYEE_RATE,
  ORDINARY_BRACKETS,
  SOCIAL_SECURITY_EMPLOYEE_RATE,
  SOCIAL_SECURITY_WAGE_BASE,
  STANDARD_DEDUCTIONS,
  TAX_DATA,
  TAX_SOURCES,
  TOP_ORDINARY_RATE,
  usd,
} from "@/lib/tax-data";

/** Single filer, no state income tax: federal income tax plus employee FICA on wages (2026 constants from tax-data.ts). */
function estimateMonthlyTakeHomeSingle(grossAnnual: number): number {
  const taxable = Math.max(0, grossAnnual - STANDARD_DEDUCTIONS.single);
  let federal = 0;
  let prev = 0;
  for (const bracket of ORDINARY_BRACKETS.single) {
    if (taxable <= prev) break;
    federal += (Math.min(taxable, bracket.upTo) - prev) * bracket.rate;
    prev = bracket.upTo;
  }
  if (taxable > prev) {
    federal += (taxable - prev) * TOP_ORDINARY_RATE;
  }
  const ssWages = Math.min(grossAnnual, SOCIAL_SECURITY_WAGE_BASE);
  const fica =
    ssWages * SOCIAL_SECURITY_EMPLOYEE_RATE + grossAnnual * MEDICARE_EMPLOYEE_RATE;
  return (grossAnnual - federal - fica) / 12;
}

const SAVINGS_GOAL = 50_000;
/** Example top online HYSA rate used throughout this guide (mid-October 2026). */
const EXAMPLE_HYSA_APY = 0.045;
const SUSTAINABLE_SAVINGS_RATE_MIN = 0.3;
const SUSTAINABLE_SAVINGS_RATE_MAX = 0.35;

function monthlyRateFromApy(apy: number): number {
  return apy / 12;
}

/** Deposits at the start of each month (matches the 3-year milestone table). */
function requiredMonthlyDeposit(months: number, startingBalance = 0): number {
  const r = monthlyRateFromApy(EXAMPLE_HYSA_APY);
  const fvStarting = startingBalance * Math.pow(1 + r, months);
  const amountNeeded = SAVINGS_GOAL - fvStarting;
  if (r === 0) return amountNeeded / months;
  const endAnnuityFactor = (Math.pow(1 + r, months) - 1) / r;
  const startAnnuityFactor = endAnnuityFactor * (1 + r);
  return amountNeeded / startAnnuityFactor;
}

function savingsSnapshot(
  months: number,
  monthlyPayment: number,
  startingBalance = 0,
): { balance: number; deposited: number; interest: number } {
  const r = monthlyRateFromApy(EXAMPLE_HYSA_APY);
  let balance = startingBalance;
  let deposited = startingBalance;
  for (let m = 0; m < months; m++) {
    balance = (balance + monthlyPayment) * (1 + r);
    deposited += monthlyPayment;
  }
  return { balance, deposited, interest: balance - deposited };
}

function weeklyFromMonthly(monthly: number): number {
  return (monthly * 12) / 52;
}

function takeHomeRangeForPayment(monthlyPayment: number): {
  min: number;
  max: number;
} {
  return {
    min: monthlyPayment / SUSTAINABLE_SAVINGS_RATE_MAX,
    max: monthlyPayment / SUSTAINABLE_SAVINGS_RATE_MIN,
  };
}

type TimelinePlan = {
  years: number;
  months: number;
  monthlyAtApy: number;
  weeklyAtApy: number;
  monthlyNoInterest: number;
  totalContributed: number;
  interestEarned: number;
  takeHomeLow: number;
  takeHomeHigh: number;
};

function planForYears(years: number): TimelinePlan {
  const months = years * 12;
  const monthlyAtApy = requiredMonthlyDeposit(months);
  const totalContributed = monthlyAtApy * months;
  return {
    years,
    months,
    monthlyAtApy,
    weeklyAtApy: weeklyFromMonthly(monthlyAtApy),
    monthlyNoInterest: SAVINGS_GOAL / months,
    totalContributed,
    interestEarned: SAVINGS_GOAL - totalContributed,
    takeHomeLow: takeHomeRangeForPayment(monthlyAtApy).min,
    takeHomeHigh: takeHomeRangeForPayment(monthlyAtApy).max,
  };
}

const PLAN_1Y = planForYears(1);
const PLAN_2Y = planForYears(2);
const PLAN_3Y = planForYears(3);
const PLAN_4Y = planForYears(4);
const PLAN_5Y = planForYears(5);
const TIMELINE_PLANS: TimelinePlan[] = [
  PLAN_1Y,
  PLAN_2Y,
  PLAN_3Y,
  PLAN_4Y,
  PLAN_5Y,
];

const MONTHLY_SAVINGS_TARGET = Math.round(PLAN_3Y.monthlyAtApy);
const TAKE_HOME_60K_SINGLE = estimateMonthlyTakeHomeSingle(60_000);

const THREE_YEAR_MILESTONES = [6, 12, 18, 24, 30, 36].map((months) => {
  const { balance, deposited, interest } = savingsSnapshot(
    months,
    MONTHLY_SAVINGS_TARGET,
  );
  return { months, balance, deposited, interest };
});

const TWO_YEAR_QUARTER_MILESTONES = [3, 6, 9, 12, 15, 18, 21, 24].map(
  (months) => {
    const { balance, deposited, interest } = savingsSnapshot(
      months,
      PLAN_2Y.monthlyAtApy,
    );
    return {
      months,
      quarter: Math.ceil(months / 3),
      balance,
      deposited,
      interest,
    };
  },
);

const INFOGRAPHIC_YEAR1 = THREE_YEAR_MILESTONES[1]!;
const INFOGRAPHIC_YEAR2 = THREE_YEAR_MILESTONES[3]!;
const INFOGRAPHIC_YEAR3 = THREE_YEAR_MILESTONES[5]!;

/** Amount per paycheck for a monthly target when paid every two weeks (26 paychecks a year). */
function biweeklyAmount(monthly: number): number {
  return (monthly * 12) / 26;
}

function moneyWhole(dollars: number): string {
  return `$${Math.round(dollars).toLocaleString("en-US")}`;
}

function moneyCents(dollars: number): string {
  return `$${dollars.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

const META_DESCRIPTION =
  "Save $50,000 in 1, 2, or 3 years: monthly and weekly targets at 4.50% APY, income you need, and a step-by-step 3-year plan with a case study.";

const PAGE_TITLE = "How to Save $50,000 in 3 Years: 1, 2 & 3-Year Plans";
/** Shorter title for the browser tab and search results (the site adds " | CalcWise"). */
const META_TITLE = "Save $50,000 in 3 Years: 1, 2 & 3-Year Plans";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  keywords: [
    "how to save 50000 in 3 years",
    "save 50k in 3 years",
    "how to save 50000 in a year",
    "how to save 50k in 2 years",
    "saving plan 50000",
    "how to save money fast",
    "3 year savings plan",
  ],
};

const faqs = [
  {
    question: "How much do I need to save per month to reach $50,000 in 3 years?",
    answer: `Without any interest, you need ${moneyWhole(
      PLAN_3Y.monthlyNoInterest,
    )} per month (${moneyWhole(SAVINGS_GOAL)} ÷ ${PLAN_3Y.months} months). At this guide's ${(EXAMPLE_HYSA_APY * 100).toFixed(2)}% example HYSA APY (top online rates often near 4.25-4.75% as of mid-October 2026), the required deposit is about ${moneyCents(
      PLAN_3Y.monthlyAtApy,
    )}/month (${moneyWhole(PLAN_3Y.weeklyAtApy)}/week)—roughly ${moneyWhole(
      PLAN_3Y.interestEarned,
    )} comes from interest instead of your paycheck.`,
  },
  {
    question: "How much per month to save $50,000 in 2 years?",
    answer: `Target ${moneyCents(PLAN_2Y.monthlyAtApy)} per month (${moneyWhole(
      PLAN_2Y.weeklyAtApy,
    )}/week) for 24 months at ${(EXAMPLE_HYSA_APY * 100).toFixed(
      2,
    )}% APY—${moneyWhole(
      PLAN_2Y.totalContributed,
    )} in deposits and ${moneyWhole(
      PLAN_2Y.interestEarned,
    )} in interest. That equals 30-35% of take-home when you earn about ${moneyWhole(
      PLAN_2Y.takeHomeLow,
    )}-${moneyWhole(
      PLAN_2Y.takeHomeHigh,
    )}/month after taxes; splitting ${moneyWhole(Math.round(PLAN_2Y.monthlyAtApy / 2))} per paycheck if you are paid twice a month (about ${moneyWhole(biweeklyAmount(PLAN_2Y.monthlyAtApy))} if you are paid every two weeks) keeps you on track.`,
  },
  {
    question: "Can you save $50,000 in a year?",
    answer: `Yes, but only with a high income or a windfall. Saving $50,000 in 12 months takes ${moneyCents(
      PLAN_1Y.monthlyAtApy,
    )} a month in a ${(EXAMPLE_HYSA_APY * 100).toFixed(
      2,
    )}% high-yield account, or ${moneyWhole(
      PLAN_1Y.monthlyNoInterest,
    )} a month with no interest. At the 30-35% savings rate this guide treats as sustainable, that implies about ${moneyWhole(
      PLAN_1Y.takeHomeLow,
    )} to ${moneyWhole(
      PLAN_1Y.takeHomeHigh,
    )} of monthly take-home pay. If your income is lower, a 2-year plan needs ${moneyCents(
      PLAN_2Y.monthlyAtApy,
    )} a month and a 3-year plan ${moneyCents(PLAN_3Y.monthlyAtApy)}.`,
  },
  {
    question: "Can I save $50,000 in 3 years on a $60,000 salary?",
    answer: `It's extremely difficult but possible with aggressive lifestyle changes. On a $60,000 gross salary (about ${moneyWhole(
      TAKE_HOME_60K_SINGLE,
    )}/month take-home for a single filer with no state income tax in ${TAX_DATA.taxYear}, before benefits), saving ${moneyCents(
      PLAN_3Y.monthlyAtApy,
    )} leaves limited room for housing and essentials. You'd likely need side income of $500-800/month and tight housing costs. A more comfortable path requires either a higher salary or a longer timeline.`,
  },
  {
    question: "Where should I keep my $50,000 savings goal money?",
    answer:
      "A high-yield savings account (HYSA) is the best option for a 3-year goal. As of mid-October 2026, many top online HYSAs advertise about 4.25-4.75% APY with FDIC insurance up to $250,000 per depositor, per bank. Avoid investing this money in stocks — a 3-year timeline is too short to recover from a potential market downturn. CDs can work if you use a CD ladder strategy, but they sacrifice flexibility.",
  },
  {
    question: "What if I fall behind on my savings goal?",
    answer:
      "Recalculate immediately. If you miss $500 one month, you need an extra $16/month across the remaining months to catch up — manageable if caught early. Consider building a one-month buffer into your plan (target $50,000 in 35 months instead of 36). Also look for one-time windfalls: tax refunds, bonuses, or selling unused items can cover gaps.",
  },
  {
    question: "Should I pay off debt before saving $50,000?",
    answer:
      "It depends on the interest rate. Pay off credit card balances first when you are paying assessed interest — the Federal Reserve's G.19 release put the average APR on credit card accounts assessed interest at 22.36% in August 2026. No savings account matches that guaranteed cost. For student loans under 5-6%, you can save and pay simultaneously. For a car loan at 4-7%, consider minimum payments while saving. If your debt rate exceeds your HYSA rate (often about 4.25-4.75% at top online banks as of mid-October 2026), prioritize the debt.",
  },
  {
    question: "What happens to my savings plan if HYSA rates drop?",
    answer: `HYSA rates can fluctuate with Federal Reserve policy. If your rate drops from ${(EXAMPLE_HYSA_APY * 100).toFixed(1)}% to 3.5% while you still target ${moneyWhole(SAVINGS_GOAL)} in ${PLAN_3Y.months} months, plan on adding about $20-$25 per month to your transfer. Run the updated numbers in a savings goal calculator each quarter and adjust your automatic transfer accordingly. Even at 3.5% APY, a HYSA still beats leaving deposits in an account earning the FDIC national average savings rate (0.38% as of October 19, 2026) by roughly $3,100 in extra interest over 36 months of ${moneyWhole(MONTHLY_SAVINGS_TARGET)}/month deposits.`,
  },
];

const SALARY_FEASIBILITY: { gross: number; label: string; className: string }[] = [
  { gross: 50000, label: "Very difficult", className: "text-amber-700" },
  { gross: 65000, label: "Challenging but doable", className: "text-amber-700" },
  { gross: 75000, label: "Realistic", className: "text-brand-700" },
  { gross: 90000, label: "Comfortable", className: "text-brand-700" },
  { gross: 120000, label: "Highly achievable", className: "text-brand-700" },
];

export default function Save50000In3YearsGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title={PAGE_TITLE}
        description={META_DESCRIPTION}
        slug="save-50000-in-3-years"
        datePublished="2026-08-24"
        dateModified="2026-11-12"
        image="/images/guides/save-50000-in-3-years.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "How to Save $50,000 in 3 Years", href: "/guides/save-50000-in-3-years" },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Savings Strategy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            {PAGE_TITLE}
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Saving {moneyWhole(SAVINGS_GOAL)} in {PLAN_3Y.months} months means putting away{" "}
            {moneyCents(PLAN_3Y.monthlyAtApy)} every single month (
            {moneyWhole(PLAN_3Y.weeklyAtApy)}/week). That sounds daunting — but with
            the right strategy, automation, and a high-yield savings account at{" "}
            {(EXAMPLE_HYSA_APY * 100).toFixed(2)}% APY, it breaks down into a system
            most single filers earning $75,000+ gross (no state tax) can follow
            sustainably at a 30-35% savings rate. Shorter timelines need{" "}
            {moneyCents(PLAN_1Y.monthlyAtApy)}/month (1 year) or{" "}
            {moneyCents(PLAN_2Y.monthlyAtApy)}/month (2 years)—see the sections below.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: November 2026</p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <p className="mt-3 text-ink-700">
            To reach {moneyWhole(SAVINGS_GOAL)} at{" "}
            {(EXAMPLE_HYSA_APY * 100).toFixed(2)}% APY with deposits on the first
            of each month, you need about{" "}
            <strong>{moneyCents(PLAN_1Y.monthlyAtApy)}/month</strong> (
            {moneyWhole(PLAN_1Y.weeklyAtApy)}/week) in{" "}
            <a href="#save-50000-in-1-year" className="font-medium text-brand-700 underline">
              1 year
            </a>
            , <strong>{moneyCents(PLAN_2Y.monthlyAtApy)}/month</strong> (
            {moneyWhole(PLAN_2Y.weeklyAtApy)}/week) in{" "}
            <a href="#save-50000-in-2-years" className="font-medium text-brand-700 underline">
              2 years
            </a>
            , or <strong>{moneyCents(PLAN_3Y.monthlyAtApy)}/month</strong> (
            {moneyWhole(PLAN_3Y.weeklyAtApy)}/week) in{" "}
            <a href="#the-math-3-years" className="font-medium text-brand-700 underline">
              3 years
            </a>
            . Interest covers {moneyWhole(PLAN_1Y.interestEarned)} on the 1-year
            path, {moneyWhole(PLAN_2Y.interestEarned)} at 2 years, and{" "}
            {moneyWhole(PLAN_3Y.interestEarned)} at 3 years.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-brand-200">
                  <th className="px-3 py-2 text-left font-semibold text-ink-800">
                    Timeline
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-ink-800">
                    Monthly
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-ink-800">
                    Weekly
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-ink-800">
                    You deposit
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-ink-800">
                    Interest
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {[PLAN_1Y, PLAN_2Y, PLAN_3Y].map((plan) => (
                  <tr key={plan.years}>
                    <td className="px-3 py-2">
                      {plan.years} year{plan.years > 1 ? "s" : ""}
                    </td>
                    <td className="px-3 py-2 font-medium">{moneyCents(plan.monthlyAtApy)}</td>
                    <td className="px-3 py-2">{moneyWhole(plan.weeklyAtApy)}</td>
                    <td className="px-3 py-2">{moneyWhole(plan.totalContributed)}</td>
                    <td className="px-3 py-2 text-brand-700">
                      {moneyWhole(plan.interestEarned)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 space-y-2 text-ink-700">
            <li>
              <strong>Best vehicle:</strong> High-yield savings account (example top
              online rates about 4.25-4.75% APY as of mid-October 2026) — not stocks,
              not CDs
            </li>
            <li>
              <strong>The formula:</strong> 60% budget cuts + 30% income boost +
              10% interest earnings
            </li>
            <li>
              <strong>Automate everything:</strong> Set up automatic transfers on
              payday — savings that require willpower fail
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/savings-goal"
              className="font-medium text-brand-600 underline"
            >
              Savings Goal Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/compound-interest"
              className="font-medium text-brand-600 underline"
            >
              Compound Interest Calculator
            </Link>{" "}
            to build your personalized plan.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/save-50000-in-3-years.webp"
              alt={`Infographic showing a 3-year savings timeline from $0 to ${moneyWhole(INFOGRAPHIC_YEAR3.balance)} by saving ${moneyWhole(MONTHLY_SAVINGS_TARGET)} per month at ${(EXAMPLE_HYSA_APY * 100).toFixed(2)}% APY: ${moneyWhole(INFOGRAPHIC_YEAR1.balance)} at month 12, ${moneyWhole(INFOGRAPHIC_YEAR2.balance)} at month 24, and ${moneyWhole(INFOGRAPHIC_YEAR3.balance)} at month 36, made of ${moneyWhole(INFOGRAPHIC_YEAR3.deposited)} in deposits and ${moneyWhole(INFOGRAPHIC_YEAR3.interest)} in interest`}
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              {`The 3-year path to ${moneyWhole(SAVINGS_GOAL)}: ${moneyWhole(MONTHLY_SAVINGS_TARGET)} a month at ${(EXAMPLE_HYSA_APY * 100).toFixed(2)}% APY reaches ${moneyWhole(INFOGRAPHIC_YEAR3.balance)}, of which ${moneyWhole(INFOGRAPHIC_YEAR3.interest)} is interest`}
            </figcaption>
          </figure>
        </section>

        <section id="save-50000-in-1-year" className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How to Save $50,000 in 1 Year (When It Is Realistic)
          </h2>
          <p className="mt-4 text-ink-700">
            A 1-year deadline means {moneyCents(PLAN_1Y.monthlyAtApy)} every month (
            {moneyWhole(PLAN_1Y.weeklyAtApy)}/week)—roughly{" "}
            {((PLAN_1Y.monthlyAtApy / PLAN_3Y.monthlyAtApy) * 100).toFixed(0)}%
            of what a 3-year plan requires. Only about{" "}
            {moneyWhole(PLAN_1Y.interestEarned)} comes from interest; you still
            deposit {moneyWhole(PLAN_1Y.totalContributed)} from income, bonuses, or
            asset sales.
          </p>
          <p className="mt-4 text-ink-700">
            At this guide's sustainable 30-35% savings rate, that payment
            typically needs {moneyWhole(PLAN_1Y.takeHomeLow)}-
            {moneyWhole(PLAN_1Y.takeHomeHigh)} monthly take-home (single filer,
            no state tax, {TAX_DATA.taxYear} federal tables). For context,{" "}
            {moneyWhole(estimateMonthlyTakeHomeSingle(120_000))}/month take-home on
            a $120,000 salary still leaves room for housing—saving{" "}
            {moneyCents(PLAN_1Y.monthlyAtApy)} would be{" "}
            {(
              (PLAN_1Y.monthlyAtApy / estimateMonthlyTakeHomeSingle(120_000)) *
              100
            ).toFixed(0)}
            % of that paycheck, above the 35% ceiling. Use the{" "}
            <Link
              href="/calculators/income-tax"
              className="font-medium text-brand-600 underline"
            >
              Income Tax Calculator
            </Link>{" "}
            if your state taxes apply.
          </p>
          <div className="mt-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
            <p className="font-medium text-amber-900">When 1 year is unrealistic</p>
            <p className="mt-1 text-sm text-amber-800">
              If take-home is under {moneyWhole(PLAN_1Y.takeHomeLow)} without a
              lump sum, a 1-year goal usually means raiding retirement accounts or
              skipping rent—both poor tradeoffs. Drop to{" "}
              <a href="#save-50000-in-2-years" className="font-medium underline">
                2 years
              </a>{" "}
              ({moneyCents(PLAN_2Y.monthlyAtApy)}/month) or{" "}
              <a href="#the-math-3-years" className="font-medium underline">
                3 years
              </a>{" "}
              ({moneyCents(PLAN_3Y.monthlyAtApy)}/month) instead.
            </p>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-ink-800">
            What has to be true for a 1-year plan
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-700">
            <li>
              <strong>Windfall or sale:</strong> A $15,000-$25,000 bonus, RSU
              vest, or home-equity check in month 1 lowers the remaining monthly
              need—model it in the{" "}
              <Link
                href="/calculators/savings-goal"
                className="font-medium text-brand-600 underline"
              >
                Savings Goal Calculator
              </Link>{" "}
              with "Current Savings" filled in.
            </li>
            <li>
              <strong>Side income earmarked 100% for savings:</strong> $1,500/month
              freelance on top of W-2 pay can offset half the transfer without
              pushing your W-2 paycheck above 35% savings.
            </li>
            <li>
              <strong>Short-term housing arbitrage:</strong> Staying with family for
              12 months and banking $1,200/month in rent is often the difference
              between {moneyCents(PLAN_1Y.monthlyAtApy)} feeling impossible vs.
              tight but doable.
            </li>
          </ul>
        </section>

        <section id="save-50000-in-2-years" className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How to Save $50,000 in 2 Years
          </h2>
          <p className="mt-4 text-ink-700">
            Two years splits the difference: {moneyCents(PLAN_2Y.monthlyAtApy)}/month (
            {moneyWhole(PLAN_2Y.weeklyAtApy)}/week), {moneyWhole(
              PLAN_2Y.totalContributed,
            )}{" "}
            from you and {moneyWhole(PLAN_2Y.interestEarned)} from interest at{" "}
            {(EXAMPLE_HYSA_APY * 100).toFixed(2)}% APY. Sustainable saving at 30-35%
            of take-home points to {moneyWhole(PLAN_2Y.takeHomeLow)}-
            {moneyWhole(PLAN_2Y.takeHomeHigh)} monthly take-home—often a
            two-income household, or one W-2 plus $600-$900/month side work like
            the case study below.
          </p>
          <p className="mt-4 text-ink-700">
            Strategy differs from 1 year: you rarely need a single giant windfall.
            Instead combine one housing move ($300-$500/month), automatic transfers
            of {moneyWhole(Math.round(PLAN_2Y.monthlyAtApy / 2))} twice a month (or{" "}
            {moneyWhole(biweeklyAmount(PLAN_2Y.monthlyAtApy))} every two weeks), and
            sending tax refunds straight to the HYSA. Versus 3 years you pay{" "}
            {moneyWhole(PLAN_2Y.monthlyAtApy - PLAN_3Y.monthlyAtApy)} more per month
            but finish 12 months sooner; versus 1 year you pay{" "}
            {moneyWhole(PLAN_1Y.monthlyAtApy - PLAN_2Y.monthlyAtApy)} less per month
            and earn {moneyWhole(PLAN_2Y.interestEarned - PLAN_1Y.interestEarned)}{" "}
            more in interest because the money stays invested longer.
          </p>
          <h3 className="mt-6 text-lg font-semibold text-ink-800">
            Quarterly checkpoints (2-year plan)
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Quarter
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Month
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Deposited
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Interest
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {TWO_YEAR_QUARTER_MILESTONES.map((row, i) => (
                  <tr
                    key={row.months}
                    className={i % 2 === 1 ? "bg-ink-50/50" : undefined}
                  >
                    <td className="px-4 py-3">Q{row.quarter}</td>
                    <td className="px-4 py-3">{row.months}</td>
                    <td className="px-4 py-3">{moneyWhole(row.deposited)}</td>
                    <td className="px-4 py-3">{moneyWhole(row.interest)}</td>
                    <td
                      className={`px-4 py-3 ${row.months === 24 ? "font-medium text-brand-700" : ""}`}
                    >
                      {moneyWhole(row.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Assumes {moneyCents(PLAN_2Y.monthlyAtApy)}/month at the start of each
            month at {(EXAMPLE_HYSA_APY * 100).toFixed(2)}% APY; quarter-end rows show
            months 3, 6, 9, 12, 15, 18, 21, and 24.
          </p>
          <p className="mt-4 text-ink-700">
            Hit {moneyWhole(Math.round(SAVINGS_GOAL / 2))} by month 18 and you are
            on pace—use the{" "}
            <Link
              href="/calculators/compound-interest"
              className="font-medium text-brand-600 underline"
            >
              Compound Interest Calculator
            </Link>{" "}
            if your APY drifts from {(EXAMPLE_HYSA_APY * 100).toFixed(2)}%.
          </p>
        </section>

        {/* Section 1: The Math */}
        <section id="the-math-3-years" className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Math Behind Saving $50,000 in 3 Years
          </h2>
          <p className="mt-4 text-ink-700">
            Before building a plan, you need to understand the raw numbers.{" "}
            {moneyWhole(SAVINGS_GOAL)} divided by {PLAN_3Y.months} months equals{" "}
            {moneyCents(PLAN_3Y.monthlyNoInterest)} per month. That is your
            baseline target if you stuff cash under a mattress with zero interest.
          </p>
          <p className="mt-4 text-ink-700">
            But you are not going to use a mattress. A high-yield savings account
            paying {(EXAMPLE_HYSA_APY * 100).toFixed(2)}% APY (example rates at top
            online banks as of mid-October 2026) means compound interest contributes{" "}
            {moneyWhole(PLAN_3Y.interestEarned)} of that {moneyWhole(SAVINGS_GOAL)}{" "}
            over three years. Your exact monthly contribution is{" "}
            {moneyCents(PLAN_3Y.monthlyAtApy)} ({moneyWhole(MONTHLY_SAVINGS_TARGET)}{" "}
            rounded for automation)—saving you about{" "}
            {moneyWhole(PLAN_3Y.monthlyNoInterest - PLAN_3Y.monthlyAtApy)}/month
            compared to the zero-interest baseline.
          </p>
          <p className="mt-4 text-ink-700">
            Here is how the money grows month by month at 4.50% APY:
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Milestone</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Months</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Total Deposited</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Interest Earned</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {THREE_YEAR_MILESTONES.map((row, i) => {
                  const label =
                    row.months === 12
                      ? "Year 1"
                      : row.months === 24
                        ? "Year 2"
                        : row.months === 36
                          ? "Year 3 (Goal)"
                          : `Month ${row.months}`;
                  return (
                    <tr
                      key={row.months}
                      className={i % 2 === 1 ? "bg-ink-50/50" : undefined}
                    >
                      <td
                        className={`px-4 py-3 ${row.months === 36 ? "font-medium" : ""}`}
                      >
                        {label}
                      </td>
                      <td className="px-4 py-3">{row.months}</td>
                      <td className="px-4 py-3">{moneyWhole(row.deposited)}</td>
                      <td className="px-4 py-3">{moneyWhole(row.interest)}</td>
                      <td
                        className={`px-4 py-3 ${row.months === 36 ? "font-medium text-brand-700" : ""}`}
                      >
                        {moneyWhole(row.balance)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Based on {moneyWhole(MONTHLY_SAVINGS_TARGET)}/month deposits into a{" "}
            {(EXAMPLE_HYSA_APY * 100).toFixed(2)}% APY high-yield savings account with
            monthly compounding at the start of each month (hitting exactly{" "}
            {moneyWhole(SAVINGS_GOAL)} requires {moneyCents(PLAN_3Y.monthlyAtApy)}
            /month). Example HYSA rate as of mid-October 2026; actual interest may
            vary with rate changes.
          </p>
          <Sources
            items={[
              {
                label: "FDIC national deposit rates (Oct. 19, 2026)",
                href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
              },
              {
                label: "Federal Reserve, FOMC target range 3.75%-4.00% (Sept. 17, 2026)",
                href: "https://www.federalreserve.gov/monetarypolicy/openmarket.htm",
              },
            ]}
            checked="October 2026"
            note="Milestone table uses a 4.50% example HYSA APY; FDIC national average savings was 0.38%."
          />

          <p className="mt-6 text-ink-700">
            The key insight: interest contributes{" "}
            {moneyWhole(THREE_YEAR_MILESTONES[THREE_YEAR_MILESTONES.length - 1]!.interest)}{" "}
            at the rounded {moneyWhole(MONTHLY_SAVINGS_TARGET)}/month pace—about{" "}
            {(
              THREE_YEAR_MILESTONES[THREE_YEAR_MILESTONES.length - 1]!.interest /
              MONTHLY_SAVINGS_TARGET
            ).toFixed(1)}{" "}
            full months of deposits you do not have to make. Every dollar saved
            earlier in the timeline earns more interest, which is why front-loading
            contributions (saving more in Year 1) accelerates the goal significantly.
          </p>
        </section>

        {/* Section 2: Income Requirements */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            What Income Do You Actually Need?
          </h2>
          <p className="mt-4 text-ink-700">
            Saving ${MONTHLY_SAVINGS_TARGET.toLocaleString()}/month requires a certain minimum take-home pay to
            remain realistic. Financial experts generally agree that saving more
            than 30-35% of take-home pay is unsustainable long-term without
            extreme lifestyle sacrifices. Here is the salary math:
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Gross Annual Salary</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Monthly Take-Home (est.)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    ${MONTHLY_SAVINGS_TARGET.toLocaleString()} as % of Take-Home
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Feasibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {SALARY_FEASIBILITY.map((row, i) => {
                  const takeHome = estimateMonthlyTakeHomeSingle(row.gross);
                  const pct = ((MONTHLY_SAVINGS_TARGET / takeHome) * 100).toFixed(1);
                  return (
                    <tr key={row.gross} className={i % 2 === 1 ? "bg-ink-50/50" : undefined}>
                      <td className="px-4 py-3">${row.gross.toLocaleString()}</td>
                      <td className="px-4 py-3">${Math.round(takeHome).toLocaleString()}</td>
                      <td className="px-4 py-3">{pct}%</td>
                      <td className={`px-4 py-3 ${row.className}`}>{row.label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Take-home uses {TAX_DATA.taxYear} federal brackets, the{" "}
            {usd(STANDARD_DEDUCTIONS.single)} standard deduction (single), employee
            Social Security and Medicare, and no state income tax. Your actual
            take-home varies by state, filing status, and pre-tax deductions.
          </p>
          <Sources
            items={[TAX_SOURCES.revProc, TAX_SOURCES.ssaWageBase]}
            checked={TAX_DATA.checkedOnLabel}
          />

          <p className="mt-6 text-ink-700">
            If your income puts you in the "very difficult" range, you have two
            options: extend the timeline (4 years requires about{" "}
            {moneyCents(PLAN_4Y.monthlyAtApy)}/month at{" "}
            {(EXAMPLE_HYSA_APY * 100).toFixed(2)}%, see the table below) or
            boost income through side work. A household earning $55,000 that adds
            $600/month in freelance income effectively matches the savings power
            of a $75,000 salary. We cover both strategies below.
          </p>
        </section>

        {/* Section 2b: Other timelines */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Saving $50,000 in 1, 2, 4, or 5 Years Instead
          </h2>
          <p className="mt-4 text-ink-700">
            The same math works for any deadline. Divide $50,000 by the number of
            months for the no-interest baseline, then lower it for interest in a
            4.50% high-yield account with deposits at the start of each month:
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Timeline</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Monthly, No Interest</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Monthly at 4.50%</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Interest Earned</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Take-Home Needed*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {TIMELINE_PLANS.map((plan, i) => (
                  <tr
                    key={plan.years}
                    className={i % 2 === 1 ? "bg-ink-50/50" : undefined}
                  >
                    <td
                      className={`px-4 py-3 ${plan.years === 3 ? "font-medium" : ""}`}
                    >
                      {plan.years} year{plan.years > 1 ? "s" : ""}
                      {plan.years === 3 ? " (this guide)" : ""}
                    </td>
                    <td className="px-4 py-3">
                      {moneyCents(plan.monthlyNoInterest)}
                    </td>
                    <td className="px-4 py-3">
                      {moneyCents(plan.monthlyAtApy)}
                    </td>
                    <td className="px-4 py-3">
                      {moneyWhole(plan.interestEarned)}
                    </td>
                    <td className="px-4 py-3">
                      {moneyWhole(plan.takeHomeLow)}-{moneyWhole(plan.takeHomeHigh)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Monthly take-home pay at which the 4.50% payment equals 30-35% of
            take-home, the range this guide treats as sustainable. Interest assumes
            4.50% compounded monthly, the same example high-yield rate used in the
            milestone table above; rates change, so treat it as an estimate.
          </p>

          <p className="mt-6 text-ink-700">
            Saving {moneyWhole(SAVINGS_GOAL)} in one year takes {moneyCents(
              PLAN_1Y.monthlyAtApy,
            )}{" "}
            a month even with interest (see{" "}
            <a href="#save-50000-in-1-year" className="font-medium text-brand-600 underline">
              the 1-year section
            </a>
            ). At a 30-35% savings rate that means about {moneyWhole(PLAN_1Y.takeHomeLow)} to{" "}
            {moneyWhole(PLAN_1Y.takeHomeHigh)} of monthly take-home pay, so for most
            households a 1-year goal depends on a bonus, a home sale, or an
            inheritance rather than budget cuts. Two years needs {moneyCents(
              PLAN_2Y.monthlyAtApy,
            )}{" "}
            a month (
            <a href="#save-50000-in-2-years" className="font-medium text-brand-600 underline">
              milestones here
            </a>
            ), or {moneyWhole(PLAN_2Y.takeHomeLow)} to {moneyWhole(PLAN_2Y.takeHomeHigh)} of
            take-home, which usually means a two-income household or a strong side
            income.
          </p>
          <p className="mt-4 text-ink-700">
            Stretching the deadline has diminishing returns. Going from 1 year to 2
            years lowers the monthly payment by{" "}
            {moneyWhole(PLAN_1Y.monthlyAtApy - PLAN_2Y.monthlyAtApy)}, while going from
            4 years to 5 years lowers it by only{" "}
            {moneyWhole(PLAN_4Y.monthlyAtApy - PLAN_5Y.monthlyAtApy)}, so a 3- or
            4-year plan is usually the point where the payment and the wait feel
            balanced. To test your own
            deadline and starting balance, enter them in the{" "}
            <Link
              href="/calculators/savings-goal"
              className="font-medium text-brand-600 underline"
            >
              Savings Goal Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 3: Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Real Case Study: Jessica, $72,000 Salary in Austin, TX
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Her Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Age: 28, marketing manager</li>
                  <li>Gross salary: $72,000/year ($6,000/month)</li>
                  <li>Take-home after taxes/benefits: $4,480/month</li>
                  <li>Goal: $50,000 for a house down payment in 3 years</li>
                  <li>Current savings: $2,400 (essentially starting from zero)</li>
                  <li>Debt: $8,200 student loans at 4.2% (minimum $145/month)</li>
                  <li>Rent: $1,450/month (1BR apartment)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Her Strategy</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Moved to a $1,150/month apartment (saved $300)</li>
                  <li>Cut subscriptions from $187 to $45 (saved $142)</li>
                  <li>Meal prepped lunches — food from $680 to $420 (saved $260)</li>
                  <li>Started freelance copywriting: $600-900/month</li>
                  <li>Opened a 4.50% APY HYSA (example top online rate as of mid-October 2026)</li>
                  <li>Automated $1,350 transfer every payday</li>
                  <li>Kept student loan at minimum (4.2% {"<"} 4.50% savings rate)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Her Monthly Budget (Post-Optimization)</h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Housing</p>
                  <p className="font-semibold text-ink-800">$1,150</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Savings Transfer</p>
                  <p className="font-semibold text-brand-700">$1,350</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Food & Groceries</p>
                  <p className="font-semibold text-ink-800">$420</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Transportation</p>
                  <p className="font-semibold text-ink-800">$280</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Student Loan</p>
                  <p className="font-semibold text-ink-800">$145</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Everything Else</p>
                  <p className="font-semibold text-ink-800">$535</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Results After 18 Months</h4>
              <p className="mt-2 text-sm text-ink-700">
                Jessica's HYSA balance reached about $27,750 from her $1,350
                automated transfers alone by month 18 (starting from $2,400 at
                4.50% APY). Freelance income averaging $750/month and a $3,200 tax
                refund in Year 1 pushed her further ahead of the milestone table.
                She adjusted her freelance hours down
                slightly and added back a $50/month gym membership she had
                canceled without feeling guilty.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Budget Breakdown Strategies */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Where to Find {moneyWhole(MONTHLY_SAVINGS_TARGET)}/Month: Budget Cuts That Actually Work
          </h2>
          <p className="mt-4 text-ink-700">
            Most savings advice tells you to "cut lattes." That saves $150/month
            at best. To find {moneyWhole(MONTHLY_SAVINGS_TARGET)}+, you need to attack the three biggest expense
            categories — housing, transportation, and food — which typically
            consume 65-75% of take-home pay.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Strategy</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Monthly Savings</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Housing</td>
                  <td className="px-4 py-3">Get a roommate or downsize</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$300-800</td>
                  <td className="px-4 py-3">High impact, high effort</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Transportation</td>
                  <td className="px-4 py-3">Switch to a paid-off used car or bike commute</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$200-500</td>
                  <td className="px-4 py-3">Moderate effort</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Food</td>
                  <td className="px-4 py-3">Meal prep + limit dining to 2x/month</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$200-400</td>
                  <td className="px-4 py-3">Moderate effort</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Subscriptions</td>
                  <td className="px-4 py-3">Cancel all but 2-3 essentials</td>
                  <td className="px-4 py-3 font-medium">$80-200</td>
                  <td className="px-4 py-3">Easy</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Insurance</td>
                  <td className="px-4 py-3">Shop for quotes annually, raise deductibles</td>
                  <td className="px-4 py-3 font-medium">$50-150</td>
                  <td className="px-4 py-3">Easy</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Shopping</td>
                  <td className="px-4 py-3">30-day rule + unsubscribe from retail emails</td>
                  <td className="px-4 py-3 font-medium">$100-300</td>
                  <td className="px-4 py-3">Moderate effort</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Savings estimates based on national averages. Your actual savings will vary by location and current spending habits.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Key Insight</p>
            <p className="mt-1 text-sm text-amber-700">
              Housing is the single biggest lever. Reducing rent by $400/month
              accounts for 31% of your entire savings target. If you can negotiate
              a roommate situation or move to a cheaper area for 3 years, you are
              already one-third of the way to $50,000 from housing savings alone.
            </p>
          </div>
        </section>

        {/* Section 5: Income Boosting */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Boosting Income: The Faster Path to $50,000
          </h2>
          <p className="mt-4 text-ink-700">
            There is a ceiling on how much you can cut expenses — you cannot
            reduce your food budget below zero. But there is no ceiling on
            income. Adding $500-1,000/month in side income reduces the pressure
            on your budget dramatically and often makes the difference between
            "possible" and "comfortable."
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Freelancing Your Existing Skills ($500-3,000/month)
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The highest ROI side income uses skills you already have. A
                marketing professional can freelance on Upwork for $50-100/hour.
                A developer can build small projects for $2,000-5,000 each. A
                teacher can tutor for $40-80/hour. Start with 5-10 hours/week and
                scale based on capacity. Platforms: Upwork, Fiverr Pro, Toptal,
                or direct outreach to small businesses.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Negotiate a Raise ($200-800/month)
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The average raise request yields a 5-7% increase when backed by
                market data. On a $72,000 salary, that is $3,600-5,040 annually
                ($300-420/month). Time your ask after a strong performance review
                or completed major project. Research comparable salaries on
                Glassdoor, Levels.fyi, or Payscale and present a specific number,
                not a range.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Sell Unused Assets ($1,000-5,000 one-time)
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The average American household has $3,000-5,000 in unused items.
                Old electronics ($200-800), furniture ($100-500), clothing
                ($200-600), collectibles, and sporting equipment all sell quickly
                on Facebook Marketplace, eBay, or Poshmark. A one-time $3,000
                asset sale equals 2+ months of savings deposits.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Step-by-Step Plan */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: Your 3-Year Savings Plan
          </h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Open a high-yield savings account (Day 1)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Choose a bank offering about 4.25%+ APY with no minimum balance and no
                  monthly fees. As of mid-October 2026, example advertised rates at major online banks include roughly 4.20%-4.50% APY (shop current yields before opening). Separate this from your
                  checking account — out of sight, out of mind. Do not get a
                  linked debit card.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Calculate your exact monthly target (Day 1)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Use our{" "}
                  <Link
                    href="/calculators/savings-goal"
                    className="text-brand-600 underline"
                  >
                    Savings Goal Calculator
                  </Link>{" "}
                  with: Goal = $50,000, Timeline = 36 months, Interest Rate =
                  your HYSA's APY. This gives you the precise monthly deposit
                  needed. Write this number down and memorize it.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Automate the transfer (Day 2)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Set up an automatic recurring transfer from checking to your
                  HYSA for the morning after each payday. If paid twice a month,
                  split it: about {moneyWhole(Math.round(PLAN_3Y.monthlyAtApy / 2))}{" "}
                  per paycheck (about {moneyWhole(biweeklyAmount(PLAN_3Y.monthlyAtApy))}{" "}
                  if paid every two weeks). The transfer must happen before you
                  see the money in your checking account. This is non-negotiable
                  — manual savings plans fail when life gets busy; automation removes
                  the decision each month.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Audit your spending and cut the Big 3 (Week 1)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Pull 3 months of bank/credit card statements. Categorize every
                  dollar. Focus cuts on housing, transportation, and food — these
                  three typically total 65-75% of spending. Target $700-900/month
                  in cuts from these categories alone. Ignore small purchases
                  under $20/month — they are not worth the mental energy.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                5
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Start one income-boosting activity (Month 1)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Pick the highest-value side income you can start this month.
                  Freelancing, tutoring, consulting, or a part-time gig that pays
                  $400+/month. Dedicate the first month to getting set up and
                  landing your first client. All side income goes directly into
                  the HYSA — do not blend it with regular spending.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                6
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Monthly check-in: track and adjust (Every 30 days)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Every month, compare your HYSA balance to the milestone table
                  above. If you are behind, identify why and make one specific
                  adjustment. If ahead, consider whether you can sustain the pace
                  or need to ease up to avoid burnout. The goal is consistency
                  over heroics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Common Mistakes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            5 Mistakes That Derail $50,000 Savings Goals
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                1. Investing the money in stocks
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Three years is too short for stock market risk. The S&P 500
                dropped 34% in 33 days during COVID (2020) and took 6 months to
                recover. If your timeline coincides with a crash, you could be
                sitting at $33,000 when you need $50,000. A HYSA with 4.50% APY
                gives you guaranteed growth with zero downside.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                2. Not automating transfers
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Manual savings requires 36 consecutive decisions to transfer
                money. Each one is an opportunity to rationalize skipping "just
                this month." Automatic transfers remove decision fatigue entirely.
                NBER research on 401(k) automatic enrollment found participation
                in tenure months 3–15 rose from 37% to 86% when the default switched
                from opt-in to auto-enroll (Madrian and Shea).
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. Starting too aggressively and burning out
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Saving 40% of take-home pay from day one is like running a sprint
                at marathon pace. By month 4, most people quit entirely. Start at
                25% if needed and ramp up as you adjust. Consistency at $1,100/month
                for 36 months beats $1,500/month for 8 months followed by giving
                up.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                4. No emergency fund buffer
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                If your car breaks down ($1,500 repair) and your only savings is
                the $50,000 fund, you will raid it. Keep a separate $2,000-3,000
                emergency buffer in checking or a separate savings account. This
                prevents one bad month from derailing your entire 3-year plan.
                Our{" "}
                <Link
                  href="/guides/emergency-fund-where-to-keep"
                  className="text-brand-600 underline"
                >
                  guide on where to keep your emergency fund
                </Link>{" "}
                explains the best account options for this buffer.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                5. Ignoring lifestyle inflation during the 3 years
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                You get a $5,000 raise in Year 2. The temptation is to "reward
                yourself" with a nicer apartment or a new car. Every dollar of
                lifestyle inflation during your 3-year window directly reduces
                your savings. The raise should go into the HYSA until you hit
                $50,000 — then celebrate however you want.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Run Your Own Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Every income and expense situation is different. Use our free
            calculators to find your exact monthly target and see how interest
            accelerates your progress.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/savings-goal"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Savings Goal Calculator
            </Link>
            <Link
              href="/calculators/compound-interest"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Compound Interest Calculator
            </Link>
          </div>
        </section>

        <Sources
          items={[
            {
              label: "Federal Reserve G.19, credit card APR (Aug. 2026 release)",
              href: "https://www.federalreserve.gov/releases/g19/current/",
            },
            {
              label: "FDIC deposit insurance ($250,000 per depositor, per bank)",
              href: "https://www.fdic.gov/resources/deposit-insurance/financial-products-insured/",
            },
            {
              label: "NBER Working Paper 7682, Madrian & Shea (401(k) automatic enrollment)",
              href: "https://www.nber.org/papers/w7682",
            },
          ]}
          checked="October 2026"
          className="mt-12"
        />

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-ink-200 bg-white"
              >
                <summary className="cursor-pointer px-5 py-4 font-medium text-ink-800 hover:text-brand-600">
                  {faq.question}
                </summary>
                <p className="px-5 pb-4 text-sm text-ink-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <RelatedGuides currentSlug="save-50000-in-3-years" relatedSlugs={["50-30-20-budget-rule", "high-yield-savings-vs-cd"]} />
      </article>
    </>
  );
}
