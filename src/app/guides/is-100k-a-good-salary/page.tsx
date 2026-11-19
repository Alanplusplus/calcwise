import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import { REPORT_SOURCES as AFFORDABILITY_SOURCES } from "@/lib/reports/mortgage-affordability-by-state";
import { REPORT_SOURCES as RENT_SOURCES } from "@/lib/reports/rent-vs-buy-by-state";
import {
  AFFORDABILITY_PINNED,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_RESULT,
  WAGE_EARNERS,
  WAGE_EARNER_SHARES,
  getStateResult,
  pct1,
  usd0,
  type IncomeBandResult,
} from "@/lib/reports/six-figure-households-by-state";
import { site } from "@/lib/site";
import {
  MEDICARE_EMPLOYEE_RATE,
  ORDINARY_BRACKETS,
  RETIREMENT_LIMITS,
  SOCIAL_SECURITY_EMPLOYEE_RATE,
  SOCIAL_SECURITY_WAGE_BASE,
  STANDARD_DEDUCTIONS,
  TAX_DATA,
  TAX_SOURCES,
  TOP_ORDINARY_RATE,
  usd,
  type FilingStatus,
} from "@/lib/tax-data";
import {
  BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026,
  STANDARD_PAID_HOURS_PER_YEAR,
  WAGE_BENCHMARK_SOURCES,
  hourlyFromAnnual,
  usd2,
  usdWhole,
} from "@/lib/wage-data";

const slug = "is-100k-a-good-salary";
const h1 = "Is $100,000 a Good Salary? Rank, Take-Home Pay, and Rent by State";
const metadataTitle = "Is $100K a Good Salary? Take-Home Pay and Rank (2026)";
const description =
  "Is $100,000 a good salary in 2026? See where it ranks, the take-home after federal tax and FICA, and what rent and a home payment take in each state.";
const datePublished = "2026-11-19";
const dateModified = "2026-11-19";

export const metadata: Metadata = {
  title: metadataTitle,
  description,
  keywords: [
    "is 100k a good salary",
    "100k salary after taxes",
    "100k take home pay",
    "what percentile is 100k salary",
    "is 100k a year good",
    "100k salary by state",
  ],
  openGraph: {
    title: `${metadataTitle} | ${site.name}`,
    description,
    type: "article",
    publishedTime: datePublished,
    modifiedTime: dateModified,
  },
};

const GROSS = 100_000;

/** The 28% front-end guideline and 36% back-end guideline named in the site's debt-to-income guide. */
const FRONT_END_PCT = AFFORDABILITY_PINNED.guidelinePct;
const BACK_END_PCT = 36;

const ordinal = (n: number) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : n % 10]}`;
};

/** "DC" reads better in a sentence than "District of Columbia". */
const short = (r: { abbr: string; name: string }) => (r.abbr === "DC" ? "DC" : r.name);

/** Federal ordinary income tax on taxable income, from the shared tax-data brackets. */
function federalTax(taxable: number, status: FilingStatus): number {
  let tax = 0;
  let prev = 0;
  for (const bracket of ORDINARY_BRACKETS[status]) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, bracket.upTo) - prev) * bracket.rate;
    prev = bracket.upTo;
  }
  if (taxable > prev) tax += (taxable - prev) * TOP_ORDINARY_RATE;
  return tax;
}

/** Marginal federal rate on the last dollar of taxable income. */
function marginalRate(taxable: number, status: FilingStatus): number {
  for (const bracket of ORDINARY_BRACKETS[status]) {
    if (taxable <= bracket.upTo) return bracket.rate;
  }
  return TOP_ORDINARY_RATE;
}

interface TakeHome {
  gross: number;
  deferral: number;
  taxable: number;
  federal: number;
  ss: number;
  medicare: number;
  fica: number;
  /** cash left after the deferral, federal income tax, and FICA; no state or local tax */
  cash: number;
}

/**
 * Wages only, standard deduction, tax-data brackets, employee FICA, no state or local tax.
 * 401(k) deferrals lower federal taxable income but not Social Security or Medicare wages.
 */
function takeHome(gross: number, status: FilingStatus, deferral = 0): TakeHome {
  const taxable = Math.max(0, gross - deferral - STANDARD_DEDUCTIONS[status]);
  const federal = federalTax(taxable, status);
  const ss = Math.min(gross, SOCIAL_SECURITY_WAGE_BASE) * SOCIAL_SECURITY_EMPLOYEE_RATE;
  const medicare = gross * MEDICARE_EMPLOYEE_RATE;
  return { gross, deferral, taxable, federal, ss, medicare, fica: ss + medicare, cash: gross - deferral - federal - ss - medicare };
}

const us = US_RESULT;

// --- Rank -------------------------------------------------------------------------------------
const earnersAtOrAbove = WAGE_EARNER_SHARES.atLeast100k;
const householdsAtOrAbove = us.h100Share.pct;
const householdPercentile = Math.round(us.below100Share.pct);
const medianFtWeeklyAnnualized = BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026 * 52;

// --- Take-home --------------------------------------------------------------------------------
const base = takeHome(GROSS, "single");
const tenPct = takeHome(GROSS, "single", GROSS * 0.1);
const maxK = takeHome(GROSS, "single", RETIREMENT_LIMITS.employeeDeferral);
const jointSole = takeHome(GROSS, "mfj");
/** Two earners at $50,000 each: FICA is owed per earner; the joint return taxes the combined wages. */
const twoEarnerFica = takeHome(GROSS / 2, "single").fica * 2;
const baseMonthly = base.cash / 12;
const baseMarginal = marginalRate(base.taxable, "single");
const keptPerExtraDollar = 1 - baseMarginal - MEDICARE_EMPLOYEE_RATE - SOCIAL_SECURITY_EMPLOYEE_RATE;
const bracket24Start = ORDINARY_BRACKETS.single[2].upTo + STANDARD_DEDUCTIONS.single;

const raiseRows = [80_000, 90_000, 100_000, 110_000, 120_000].map((gross, i, all) => {
  const t = takeHome(gross, "single");
  const prev = i > 0 ? takeHome(all[i - 1], "single") : null;
  return {
    gross,
    cash: t.cash,
    monthly: t.cash / 12,
    federal: t.federal,
    fica: t.fica,
    kept: prev ? (t.cash - prev.cash) / (gross - all[i - 1]) : null,
  };
});

// --- Budget -----------------------------------------------------------------------------------
const needs = baseMonthly * 0.5;
const wants = baseMonthly * 0.3;
const savings = baseMonthly * 0.2;
const frontEndMonthly = (GROSS * FRONT_END_PCT) / 100 / 12;
const backEndMonthly = (GROSS * BACK_END_PCT) / 100 / 12;
const hourly = hourlyFromAnnual(GROSS);

// --- States -----------------------------------------------------------------------------------
function mustGet(abbr: string): IncomeBandResult {
  const r = getStateResult(abbr);
  if (!r) throw new Error(`Missing state result for ${abbr}`);
  return r;
}

const TABLE_STATES = ["WV", "OH", "TX", "FL", "IL", "NY", "WA", "CA", "HI"];
const stateRows = TABLE_STATES.map(mustGet).sort((a, b) => a.incomeNeeded - b.incomeNeeded);

const byRent = [...STATE_RESULTS].sort((a, b) => a.rentShare - b.rentShare);
const rentLow = byRent[0];
const rentHigh = byRent[byRent.length - 1];
const byPayment = [...STATE_RESULTS].sort((a, b) => a.paymentShare - b.paymentShare);
const payLow = byPayment[0];
const payHigh = byPayment[byPayment.length - 1];
const meetsGuideline = STATE_RESULTS.filter((r) => r.meetsGuideline);
const missesGuideline = STATE_RESULTS.filter((r) => !r.meetsGuideline);
const neededLowMiss = Math.min(...missesGuideline.map((r) => r.incomeNeeded));
const neededHigh = Math.max(...STATE_RESULTS.map((r) => r.incomeNeeded));
const neededHighState = STATE_RESULTS.find((r) => r.incomeNeeded === neededHigh) ?? STATE_RESULTS[0];
const places = STATE_RESULTS.length;

// --- Case study: same job, same $100,000, two states --------------------------------------------
const tx = mustGet("TX");
const ca = mustGet("CA");
const caseTakeHome = baseMonthly;
const caseSavings = caseTakeHome * 0.2;
const txLeft = caseTakeHome - tx.rent - caseSavings;
const caLeft = caseTakeHome - ca.rent - caseSavings;
const txRentYear = tx.rent * 12;
const caRentYear = ca.rent * 12;
const rentGapYear = caRentYear - txRentYear;
const txDown = tx.value * (AFFORDABILITY_PINNED.downPaymentPct / 100);
const caDown = ca.value * (AFFORDABILITY_PINNED.downPaymentPct / 100);
const txYearsToDown = txDown / (caseSavings * 12);
const caYearsToDown = caDown / (caseSavings * 12);

const faqs = [
  {
    question: "Is $100,000 a good salary for a single person?",
    answer: `Yes by most measures, with a location caveat. In ${WAGE_EARNERS.year}, ${pct1(earnersAtOrAbove)} of W-2 wage earners made $100,000 or more (Social Security Administration), and the median U.S. man working full-time, year-round earned ${usd0(us.maleFt)} (the median woman, ${usd0(us.femaleFt)}). A single filer keeps about ${usdWhole(base.cash)} a year after federal tax and FICA, or ${usdWhole(baseMonthly)} a month, before any state tax. The median rent in ${short(tx)} takes ${pct1((tx.rent / baseMonthly) * 100)} of that and the median rent in ${short(ca)} takes ${pct1((ca.rent / baseMonthly) * 100)}, so the same salary feels very different depending on the state.`,
  },
  {
    question: "What is $100,000 a year after taxes?",
    answer: `For a single filer using the ${TAX_DATA.taxYear} standard deduction of ${usd(STANDARD_DEDUCTIONS.single)}, federal income tax is ${usdWhole(base.federal)} and Social Security plus Medicare is ${usdWhole(base.fica)}, which leaves ${usdWhole(base.cash)} a year (${usdWhole(baseMonthly)} a month, or ${usd2(base.cash / STANDARD_PAID_HOURS_PER_YEAR)} an hour) before state and local tax. Putting 10% in a 401(k) cuts federal tax to ${usdWhole(tenPct.federal)} and leaves ${usdWhole(tenPct.cash)} in cash, plus ${usdWhole(tenPct.deferral)} saved. A married couple filing jointly on one $100,000 paycheck owes ${usdWhole(jointSole.federal)} in federal income tax and keeps ${usdWhole(jointSole.cash)}. Use the paycheck calculator to add your state.`,
  },
  {
    question: "Is $100,000 a good household income for a family?",
    answer: `It is above the middle but not high. ${pct1(householdsAtOrAbove)} of U.S. households had income of $100,000 or more in ${REPORT.acsYear}, which puts $100,000 at about the ${ordinal(householdPercentile)} percentile, and the median household income was ${usd0(us.income)}. The top 20% of households start at ${usd0(us.q4)}, so $100,000 is not a top-quintile household income in any state. The report's household income counts everyone 15 or older in the home and does not adjust for family size, so a household of five at $100,000 has far less room than a household of two. On one earner filing jointly, the take-home is about ${usdWhole(jointSole.cash)} a year (${usdWhole(jointSole.cash / 12)} a month) before state tax.`,
  },
  {
    question: "Is $100,000 a year rich?",
    answer: `Not by household standards. Only ${pct1(earnersAtOrAbove)} of individual wage earners made $100,000 or more in ${WAGE_EARNERS.year}, so it is a high individual salary, but ${pct1(householdsAtOrAbove)} of households already reach it, and the top 20% of households start at ${usd0(us.q4)}. After tax a single filer keeps ${usdWhole(baseMonthly)} a month, and in ${short(ca)} the median home payment alone (${usdWhole(ca.payment)} a month with ${AFFORDABILITY_PINNED.downPaymentPct}% down) would take ${pct1((ca.payment / baseMonthly) * 100)} of it. It is comfortable in many places and thin in a few.`,
  },
  {
    question: "Where does a $100,000 salary go the furthest?",
    answer: `Measured by housing, the median rent equals ${pct1(rentLow.rentShare)} of $100,000 in ${short(rentLow)}, against ${pct1(rentHigh.rentShare)} in ${short(rentHigh)}. For buying, the payment on the median home (principal, interest, and property tax, ${AFFORDABILITY_PINNED.downPaymentPct}% down at ${AFFORDABILITY_PINNED.rate}%) takes ${pct1(payLow.paymentShare)} of $100,000 in ${short(payLow)} and ${pct1(payHigh.paymentShare)} in ${short(payHigh)}. A $100,000 income meets the ${FRONT_END_PCT}% housing guideline for the median home in ${meetsGuideline.length} of ${places} places (50 states and DC). State income tax, groceries, and transportation vary too, so check your own numbers in the paycheck calculator.`,
  },
];

const tdClass = "px-4 py-3 text-ink-800";
const thClass = "px-4 py-3 text-left font-semibold text-ink-700";
const linkClass = "text-brand-600 hover:text-brand-800 font-medium";

export default function Is100kAGoodSalaryGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified}
        image="/images/guides/is-100k-a-good-salary.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Is $100K a Good Salary?", href: `/guides/${slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Pay & Career
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{h1}</h1>
          <p className="mt-4 text-lg text-ink-600">
            {`You have an offer, a raise, or a household income of exactly $100,000, and you want to know whether that is a good number. The answer needs three figures, not one: where $100,000 ranks among earners and among households, how much of it is left after federal tax and payroll tax (${usdWhole(base.cash)} a year for a single filer), and what housing takes of it where you live. This guide builds each figure from 2026 federal tax tables, Social Security Administration wage statistics, and Census Bureau data for all 50 states and DC, then runs a Texas and California case study with the same salary.`}
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: November 2026</p>
        </header>

        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">Quick Answer</p>
          <p className="mt-1 text-ink-700">
            {`Yes, $100,000 is a good individual salary: ${pct1(earnersAtOrAbove)} of W-2 wage earners made that much in ${WAGE_EARNERS.year}, and the median full-time man and woman earned ${usd0(us.maleFt)} and ${usd0(us.femaleFt)}. It is only an average-to-good household income, though: ${pct1(householdsAtOrAbove)} of households reach it (the ${ordinal(householdPercentile)} percentile), and the top 20% of households start at ${usd0(us.q4)}. A single filer takes home about ${usdWhole(base.cash)} (${usdWhole(baseMonthly)} a month) after federal tax and FICA, before state tax. The median rent takes ${pct1((tx.rent / baseMonthly) * 100)} of that in ${short(tx)} and ${pct1((ca.rent / baseMonthly) * 100)} in ${short(ca)}, and the median home is within the ${FRONT_END_PCT}% housing guideline in ${meetsGuideline.length} of ${places} places.`}
          </p>
        </div>

        <figure className="mt-10">
          <Image
            src="/images/guides/is-100k-a-good-salary.webp"
            alt={`Infographic showing where a $100,000 salary goes: ${usdWhole(base.cash)} take-home, ${usdWhole(base.federal)} federal income tax, ${usdWhole(base.ss)} Social Security, and ${usdWhole(base.medicare)} Medicare, about ${usdWhole(baseMonthly)} a month for a single filer`}
            width={1200}
            height={795}
            className="rounded-lg border border-ink-200"
          />
          <figcaption className="mt-2 text-center text-sm text-ink-500">
            {`A $100,000 salary for a single filer: federal tax and FICA leave ${usdWhole(base.cash)} (${TAX_DATA.taxYear} tax tables, no state tax)`}
          </figcaption>
        </figure>

        <section className="prose mt-10 max-w-none">
          <h2>Where $100,000 Ranks: Earners vs Households</h2>
          <p>
            {`"Good" starts with a comparison, and the group you compare against changes the answer. Among individual W-2 wage earners, ${WAGE_EARNER_SHARES.count100k.toLocaleString("en-US")} of ${WAGE_EARNERS.total.toLocaleString("en-US")} made $100,000 or more in ${WAGE_EARNERS.year}, which is ${pct1(earnersAtOrAbove)} (Social Security Administration wage statistics). Among households, the Census Bureau's ${REPORT.acsYear} American Community Survey puts ${pct1(householdsAtOrAbove)} at $100,000 or more. The two numbers differ by a factor of ${(householdsAtOrAbove / earnersAtOrAbove).toFixed(1)} because a household can pool several earners and other income, so a $100,000 household is ordinary while a single $100,000 paycheck is not.`}
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Measure</th>
                  <th className={thClass}>Figure</th>
                  <th className={thClass}>Where $100,000 lands</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>{`W-2 wage earners, ${WAGE_EARNERS.year} (SSA)`}</td>
                  <td className={tdClass}>{`${pct1(earnersAtOrAbove)} made $100,000 or more`}</td>
                  <td className={tdClass}>{`Top ${pct1(earnersAtOrAbove)} of earners`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>{`All U.S. households, ${REPORT.acsYear} (ACS)`}</td>
                  <td className={tdClass}>{`${pct1(householdsAtOrAbove)} have $100,000 or more`}</td>
                  <td className={tdClass}>{`${ordinal(householdPercentile)} percentile`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Top 20% of households begin at</td>
                  <td className={tdClass}>{usd0(us.q4)}</td>
                  <td className={tdClass}>{`${usd0(us.q4 - GROSS)} below the line`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Median household income</td>
                  <td className={tdClass}>{usd0(us.income)}</td>
                  <td className={tdClass}>{`${(GROSS / us.income).toFixed(2)} times the median`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Median full-time, year-round man</td>
                  <td className={tdClass}>{usd0(us.maleFt)}</td>
                  <td className={tdClass}>{`${(GROSS / us.maleFt).toFixed(2)} times the median`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Median full-time, year-round woman</td>
                  <td className={tdClass}>{usd0(us.femaleFt)}</td>
                  <td className={tdClass}>{`${(GROSS / us.femaleFt).toFixed(2)} times the median`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>BLS median usual weekly pay, full-time, Q2 2026 (annualized)</td>
                  <td className={tdClass}>{`${usdWhole(BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026)} × 52 = ${usdWhole(medianFtWeeklyAnnualized)}`}</td>
                  <td className={tdClass}>{`${(GROSS / medianFtWeeklyAnnualized).toFixed(2)} times the median`}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            {`Two cautions apply. The SSA table counts every W-2 wage earner, part-time and part-year workers included, so among full-time, year-round workers the share at $100,000 or more is higher than ${pct1(earnersAtOrAbove)}. And the household figure adds up everyone 15 or older in the home before tax, with no adjustment for how many people it supports. Our full state-by-state breakdown is in the `}
            <Link href="/reports/six-figure-households-by-state" className={linkClass}>
              six-figure households by state report
            </Link>
            {`, where the share at $100,000 or more runs from ${pct1(STATE_RESULTS[STATE_RESULTS.length - 1].h100Share.pct)} in ${short(STATE_RESULTS[STATE_RESULTS.length - 1])} to ${pct1(STATE_RESULTS[0].h100Share.pct)} in ${short(STATE_RESULTS[0])}.`}
          </p>
          <Sources
            items={[
              REPORT_SOURCES.ssaWages,
              REPORT_SOURCES.acsDistribution,
              REPORT_SOURCES.acsQuintiles,
              REPORT_SOURCES.acsEarnings,
              WAGE_BENCHMARK_SOURCES.blsWeeklyQ2_2026,
            ]}
            checked="November 2026"
            note="SSA net compensation includes all W-2 wage earners; ACS household income is before tax and counts every household member 15 or older; ACS earnings cover full-time, year-round workers only."
          />

          <h2>What $100,000 Takes Home in 2026</h2>
          <p>
            {`Take-home pay is gross pay minus every tax that comes out of the paycheck. For a single wage earner with no other income, the federal pieces are:`}
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-lg font-semibold text-ink-900">
            Take-home = Gross − Pre-tax deferrals − Federal income tax − Social Security − Medicare − State tax
          </p>
          <p>
            {`Federal income tax is computed on taxable income, which is gross pay minus pre-tax deferrals minus the standard deduction, and it applies each rate only to the slice of income inside that bracket. Social Security is ${(SOCIAL_SECURITY_EMPLOYEE_RATE * 100).toFixed(1)}% of wages up to ${usd(SOCIAL_SECURITY_WAGE_BASE)} and Medicare is ${(MEDICARE_EMPLOYEE_RATE * 100).toFixed(2)}% of all wages. Here is the ${usdWhole(GROSS)} example for a single filer in ${TAX_DATA.taxYear}:`}
          </p>
          <ul>
            <li>
              {`Taxable income: ${usdWhole(GROSS)} − ${usd(STANDARD_DEDUCTIONS.single)} standard deduction = ${usdWhole(base.taxable)}.`}
            </li>
            <li>
              {`Federal income tax: ${usdWhole(base.federal)}, which is ${pct1((base.federal / GROSS) * 100)} of gross pay even though the top bracket reached is ${Math.round(baseMarginal * 100)}%.`}
            </li>
            <li>
              {`Social Security ${usdWhole(base.ss)} plus Medicare ${usdWhole(base.medicare)} = ${usdWhole(base.fica)} in payroll tax.`}
            </li>
            <li>
              {`Take-home: ${usdWhole(GROSS)} − ${usdWhole(base.federal)} − ${usdWhole(base.fica)} = ${usdWhole(base.cash)}, or ${usdWhole(baseMonthly)} a month and ${usd2(base.cash / STANDARD_PAID_HOURS_PER_YEAR)} for each of ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} paid hours (the gross hourly equivalent is ${usd2(hourly)}).`}
            </li>
          </ul>
          <p>
            {`Retirement contributions and filing status move the number. The table keeps the salary fixed at ${usdWhole(GROSS)} and changes one thing at a time; the 401(k) rows use the ${usd(RETIREMENT_LIMITS.employeeDeferral)} ${TAX_DATA.taxYear} employee deferral limit, and payroll tax is owed on the full salary because 401(k) deferrals do not reduce Social Security or Medicare wages.`}
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Scenario</th>
                  <th className={thClass}>401(k) deferral</th>
                  <th className={thClass}>Federal income tax</th>
                  <th className={thClass}>Social Security + Medicare</th>
                  <th className={thClass}>Cash take-home</th>
                  <th className={thClass}>Per month</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Single, no 401(k)", t: base },
                  { label: "Single, 10% to 401(k)", t: tenPct },
                  { label: "Single, maximum 401(k)", t: maxK },
                  { label: "Married filing jointly, one earner, no 401(k)", t: jointSole },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-ink-100">
                    <td className={tdClass}>{row.label}</td>
                    <td className={tdClass}>{usdWhole(row.t.deferral)}</td>
                    <td className={tdClass}>{usdWhole(row.t.federal)}</td>
                    <td className={tdClass}>{usdWhole(row.t.fica)}</td>
                    <td className={tdClass}>{usdWhole(row.t.cash)}</td>
                    <td className={tdClass}>{usdWhole(row.t.cash / 12)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            {`A 10% deferral moves ${usdWhole(tenPct.deferral)} into the plan but lowers cash take-home by only ${usdWhole(base.cash - tenPct.cash)}, because it saves ${usdWhole(base.federal - tenPct.federal)} of federal tax: each dollar deferred reduces take-home by about ${((base.cash - tenPct.cash) / tenPct.deferral).toFixed(2)} dollars. At the maximum, ${usdWhole(maxK.deferral)} goes into the plan and cash take-home falls by ${usdWhole(base.cash - maxK.cash)}, with federal tax down by ${usdWhole(base.federal - maxK.federal)}. A married couple filing jointly on one $100,000 paycheck uses a ${usd(STANDARD_DEDUCTIONS.mfj)} deduction and pays ${usdWhole(base.federal - jointSole.federal)} less in federal income tax than a single filer. The same $100,000 split between two earners at $50,000 each owes ${usdWhole(twoEarnerFica)} in combined payroll tax, the same as one earner (${usdWhole(jointSole.fica)}), and the same joint federal tax, because the joint return taxes the combined wages.`}
          </p>

          <h2>How Much of a Raise You Keep Near $100,000</h2>
          <p>
            {`The marginal federal rate for a single filer at $100,000 is ${Math.round(baseMarginal * 100)}%, and payroll tax adds ${((SOCIAL_SECURITY_EMPLOYEE_RATE + MEDICARE_EMPLOYEE_RATE) * 100).toFixed(2)}%, so each extra dollar of salary keeps about ${(keptPerExtraDollar * 100).toFixed(2)} cents before state tax, or ${usd2(keptPerExtraDollar * 1000)} of each additional $1,000. The ${Math.round(ORDINARY_BRACKETS.single[3].rate * 100)}% bracket starts at a salary of ${usdWhole(bracket24Start)} for a single filer, ${usdWhole(bracket24Start - GROSS)} above $100,000.`}
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Gross salary</th>
                  <th className={thClass}>Federal income tax</th>
                  <th className={thClass}>Payroll tax</th>
                  <th className={thClass}>Take-home (year)</th>
                  <th className={thClass}>Take-home (month)</th>
                  <th className={thClass}>Kept of the raise</th>
                </tr>
              </thead>
              <tbody>
                {raiseRows.map((row) => (
                  <tr key={row.gross} className={`border-b border-ink-100 ${row.gross === GROSS ? "bg-ink-50/50" : ""}`}>
                    <td className={tdClass}>{usdWhole(row.gross)}</td>
                    <td className={tdClass}>{usdWhole(row.federal)}</td>
                    <td className={tdClass}>{usdWhole(row.fica)}</td>
                    <td className={tdClass}>{usdWhole(row.cash)}</td>
                    <td className={tdClass}>{usdWhole(row.monthly)}</td>
                    <td className={tdClass}>{row.kept === null ? "n/a" : `${(row.kept * 100).toFixed(2)}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            {`State and local income tax comes on top of every figure above. Some states, Texas and Florida among them, levy no tax on wages, and the rest tax at rates that vary widely with income, so the paycheck estimate for your state is the number to budget with. Our `}
            <Link href="/calculators/paycheck" className={linkClass}>
              Paycheck Calculator
            </Link>
            {` adds state tax, pre-tax deductions, and your pay frequency.`}
          </p>
          <Sources
            items={[TAX_SOURCES.federalRates, TAX_SOURCES.revProc, TAX_SOURCES.ssaWageBase, TAX_SOURCES.retirementLimits]}
            checked={TAX_DATA.checkedOnLabel}
            note="Federal figures come from CalcWise tax data (wages only, standard deduction, employee FICA); state and local income tax, health premiums, and other pre-tax deductions are not included."
          />

          <h2>What $100,000 Buys by State</h2>
          <p>
            {`A salary buys different amounts of housing depending on the state, and housing is the largest line in most budgets. The table uses the median gross monthly rent (Census table B25064) and the monthly payment on the median home (principal, interest, and property tax with ${AFFORDABILITY_PINNED.downPaymentPct}% down on a ${AFFORDABILITY_PINNED.termYears}-year loan at ${AFFORDABILITY_PINNED.rate}%, the Freddie Mac average for ${AFFORDABILITY_PINNED.rateDate}). Percentages are shown against the ${usdWhole(baseMonthly)} monthly take-home of a single filer, and the last column is the income at which that home payment equals ${FRONT_END_PCT}% of gross pay.`}
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>State</th>
                  <th className={thClass}>$100K household percentile</th>
                  <th className={thClass}>Median rent / month</th>
                  <th className={thClass}>Rent % of take-home</th>
                  <th className={thClass}>Median home payment / month</th>
                  <th className={thClass}>Payment % of take-home</th>
                  <th className={thClass}>Income needed ({FRONT_END_PCT}% rule)</th>
                </tr>
              </thead>
              <tbody>
                {stateRows.map((r) => (
                  <tr key={r.abbr} className="border-b border-ink-100">
                    <td className={tdClass}>{r.name}</td>
                    <td className={tdClass}>{ordinal(Math.round(r.below100Share.pct))}</td>
                    <td className={tdClass}>{usdWhole(r.rent)}</td>
                    <td className={tdClass}>{pct1((r.rent / baseMonthly) * 100)}</td>
                    <td className={tdClass}>{usdWhole(r.payment)}</td>
                    <td className={tdClass}>{pct1((r.payment / baseMonthly) * 100)}</td>
                    <td className={tdClass}>{usdWhole(r.incomeNeeded)}</td>
                  </tr>
                ))}
                <tr className="border-b border-ink-100 bg-ink-50/50">
                  <td className={tdClass}>United States</td>
                  <td className={tdClass}>{ordinal(householdPercentile)}</td>
                  <td className={tdClass}>{usdWhole(us.rent)}</td>
                  <td className={tdClass}>{pct1((us.rent / baseMonthly) * 100)}</td>
                  <td className={tdClass}>{usdWhole(us.payment)}</td>
                  <td className={tdClass}>{pct1((us.payment / baseMonthly) * 100)}</td>
                  <td className={tdClass}>{usdWhole(us.incomeNeeded)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            {`Across all ${places} places, a $100,000 income meets the ${FRONT_END_PCT}% housing guideline for the median home in ${meetsGuideline.length} and misses it in ${missesGuideline.length}. Where it misses, the income needed starts at ${usdWhole(neededLowMiss)} and reaches ${usdWhole(neededHigh)} in ${short(neededHighState)}. Median rent takes ${pct1(rentLow.rentShare)} of a $100,000 gross income in ${short(rentLow)} and ${pct1(rentHigh.rentShare)} in ${short(rentHigh)}. Our `}
            <Link href="/reports/mortgage-affordability-by-state" className={linkClass}>
              mortgage affordability by state report
            </Link>
            {` shows the full ranking and the `}
            <Link href="/reports/rent-vs-buy-by-state" className={linkClass}>
              rent vs buy by state report
            </Link>
            {` compares renting and owning for each state.`}
          </p>
          <Sources
            items={[
              RENT_SOURCES.acsRent,
              AFFORDABILITY_SOURCES.acsHome,
              AFFORDABILITY_SOURCES.acsTax,
              AFFORDABILITY_SOURCES.acsIncome,
              AFFORDABILITY_SOURCES.pmms,
              REPORT_SOURCES.acsFile,
            ]}
            checked="November 2026"
            note="State medians describe typical households, not a specific city; a metro area can sit far above or below its state median. The payment excludes insurance, mortgage insurance, and maintenance."
          />

          <h2>{`Case Study: Marcus in ${short(tx)}, Elena in ${short(ca)}`}</h2>
          <p>
            {`Marcus and Elena are both 31, both single, and both just accepted the same project coordinator job at $100,000, one in ${short(tx)} and one in ${short(ca)}. Federal tax and FICA are identical for them, so each takes home ${usdWhole(base.cash)} a year, or ${usdWhole(caseTakeHome)} a month, before state tax. ${short(tx)} has no state income tax on wages while ${short(ca)} does, so the real gap is wider than the housing math below. Both follow the 50/30/20 rule: ${usdWhole(needs)} for needs, ${usdWhole(wants)} for wants, and ${usdWhole(caseSavings)} for savings.`}
          </p>
          <p>
            <strong>Renting.</strong>
            {` The median rent is ${usdWhole(tx.rent)} a month in ${short(tx)} and ${usdWhole(ca.rent)} in ${short(ca)}. Marcus spends ${pct1((tx.rent / baseMonthly) * 100)} of take-home on rent and Elena spends ${pct1((ca.rent / baseMonthly) * 100)}, a gap of ${usdWhole(rentGapYear)} a year (${usdWhole(caRentYear)} against ${usdWhole(txRentYear)}). After rent and the ${usdWhole(caseSavings)} savings line, Marcus has ${usdWhole(txLeft)} a month for everything else (utilities are already in median gross rent) and Elena has ${usdWhole(caLeft)}, which is ${usdWhole(txLeft - caLeft)} less before any state income tax.`}
          </p>
          <p>
            <strong>Buying.</strong>
            {` The median home is worth ${usdWhole(tx.value)} in ${short(tx)} and ${usdWhole(ca.value)} in ${short(ca)}. With ${AFFORDABILITY_PINNED.downPaymentPct}% down, the payment is ${usdWhole(tx.payment)} a month for Marcus (${pct1(tx.paymentShare)} of gross pay, inside the ${FRONT_END_PCT}% guideline) and ${usdWhole(ca.payment)} for Elena (${pct1(ca.paymentShare)} of gross pay). Elena would need an income of about ${usdWhole(ca.incomeNeeded)} to meet the guideline, ${usdWhole(ca.incomeNeeded - GROSS)} more than she earns. The down payment is ${usdWhole(txDown)} for Marcus and ${usdWhole(caDown)} for Elena; if the whole ${usdWhole(caseSavings)} savings line went to a down payment and earned nothing, it would take Marcus ${txYearsToDown.toFixed(1)} years and Elena ${caYearsToDown.toFixed(1)} years.`}
          </p>
          <p>
            {`Their decisions: Marcus can plan to buy within the guideline and still keep ${usdWhole(txLeft)} a month of flexibility once he starts saving, so his question is timing. Elena's median-home payment would take ${pct1((ca.payment / baseMonthly) * 100)} of her take-home, so she should rent, keep saving, and look at below-median homes or a higher income before buying. These are state medians, not city prices, so each of them should rerun the comparison with local rent and listing prices in the `}
            <Link href="/calculators/home-affordability" className={linkClass}>
              Home Affordability Calculator
            </Link>
            .
          </p>

          <h2>Is $100,000 Enough? Six Steps to Decide</h2>
          <ol>
            <li>
              {`Find your real take-home. Enter your state, filing status, and 401(k) contribution into the `}
              <Link href="/calculators/paycheck" className={linkClass}>
                Paycheck Calculator
              </Link>
              {`. A single filer with no state tax starts from ${usdWhole(baseMonthly)} a month.`}
            </li>
            <li>
              {`Set the housing ceiling. At ${FRONT_END_PCT}% of gross pay, housing should stay near ${usdWhole(frontEndMonthly)} a month on $100,000; compare that with local rent and with the home-payment column above.`}
            </li>
            <li>
              {`Split take-home with the 50/30/20 rule: ${usdWhole(needs)} for needs, ${usdWhole(wants)} for wants, and ${usdWhole(savings)} for savings and extra debt payments. Put your numbers in the `}
              <Link href="/calculators/budget-50-30-20" className={linkClass}>
                50/30/20 Budget Calculator
              </Link>
              {`, and read the `}
              <Link href="/guides/50-30-20-budget-rule" className={linkClass}>
                50/30/20 budget rule guide
              </Link>
              {` if needs come out above half.`}
            </li>
            <li>
              {`Check total debt. At a ${BACK_END_PCT}% back-end guideline, all monthly debt payments including housing should stay under ${usdWhole(backEndMonthly)} on $100,000; our `}
              <Link href="/guides/debt-to-income-ratio-guide" className={linkClass}>
                debt-to-income ratio guide
              </Link>
              {` explains how lenders count them.`}
            </li>
            <li>
              {`Decide the 401(k) contribution before the raise lands. Contributing 10% costs about ${usdWhole((base.cash - tenPct.cash) / 12)} a month in take-home and moves ${usdWhole(tenPct.deferral / 12)} a month into retirement savings.`}
            </li>
            <li>
              {`Compare against your local benchmark. Find your state in the `}
              <Link href="/reports/six-figure-households-by-state" className={linkClass}>
                six-figure households report
              </Link>
              {` to see whether $100,000 is above or below the typical household where you live, and use the `}
              <Link href="/calculators/salary-to-hourly" className={linkClass}>
                Salary to Hourly Calculator
              </Link>
              {` to compare it with an hourly offer (${usd2(hourly)} an hour before tax at ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} hours).`}
            </li>
          </ol>

          <h2>When $100,000 Is More Than Enough and When It Is Not</h2>
          <p>
            {`$100,000 is more than enough when housing stays below the guideline, debt is low, and the household has one or two people. A single renter paying the ${short(tx)} median of ${usdWhole(tx.rent)} keeps ${usdWhole(txLeft)} a month after rent and a 20% savings rate. It is not enough for a buyer in a high-cost state, for a household supporting several people on one income (the Census household figure does not adjust for size), or when student loans or a car note push total debt past the ${usdWhole(backEndMonthly)} monthly back-end ceiling. A two-earner household with a combined $100,000 owes the same federal tax and payroll tax as a one-earner household, so for families the household percentile (${ordinal(householdPercentile)}) is the better benchmark, and for a single paycheck the individual rank (top ${pct1(earnersAtOrAbove)}) is.`}
          </p>
          <p>
            {`The practical test is the same in every state: take-home after tax, minus the housing line, minus the savings line, leaves the budget for everything else. If that remainder covers food, transportation, insurance, and a cushion, $100,000 is a good salary for you. If it does not, the fix is usually the housing line, which our `}
            <Link href="/guides/how-much-house-can-i-afford" className={linkClass}>
              how much house can I afford guide
            </Link>
            {` and `}
            <Link href="/guides/rent-vs-buy-decision" className={linkClass}>
              rent vs buy decision guide
            </Link>
            {` take apart in detail.`}
          </p>
        </section>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Numbers</p>
          <p className="mt-1 text-sm text-ink-600">
            Estimate your take-home pay, test a home payment against it, and split what is left with the 50/30/20 rule.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/paycheck"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Paycheck Calculator
            </Link>
            <Link
              href="/calculators/home-affordability"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Home Affordability Calculator
            </Link>
            <Link
              href="/calculators/budget-50-30-20"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              50/30/20 Budget Calculator
            </Link>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="mt-8">
              <h3 className="text-lg font-semibold text-ink-800">{faq.question}</h3>
              <p className="mt-2 text-ink-700">{faq.answer}</p>
            </div>
          ))}
        </section>

        <RelatedGuides
          currentSlug={slug}
          relatedSlugs={["salary-vs-hourly-pay", "50-30-20-budget-rule", "how-much-house-can-i-afford"]}
        />
      </article>
    </>
  );
}
