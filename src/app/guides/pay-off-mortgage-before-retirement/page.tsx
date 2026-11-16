import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import {
  REPORT as MORTGAGE_FREE,
  REPORT_SOURCES as MORTGAGE_FREE_SOURCES,
  STATE_RESULTS,
  US_AGE_LADDER,
  US_RESULT,
  millions,
  pct1,
  usd0,
} from "@/lib/reports/mortgage-free-homeowners-by-state";
import { REPORT_SOURCES as RETIREMENT_SOURCES, SSA } from "@/lib/reports/retirement-income-by-state";
import { site } from "@/lib/site";
import {
  LONG_TERM_BRACKETS,
  LONG_TERM_TOP_RATE,
  NIIT_RATE,
  NIIT_THRESHOLDS,
  ORDINARY_BRACKETS,
  STANDARD_DEDUCTIONS,
  TAX_DATA,
  TAX_SOURCES,
  TOP_ORDINARY_RATE,
  usd,
} from "@/lib/tax-data";

const slug = "pay-off-mortgage-before-retirement";
const h1 = "Should You Pay Off Your Mortgage Before You Retire? The Tax Math";
const metadataTitle = "Pay Off Your Mortgage Before Retiring? The Math";
const description =
  "Pay off your mortgage before retirement? See the tax cost of IRA withdrawals, Medicare surcharges, and the break-even return, using 2026 brackets.";
const datePublished = "2026-11-16";
const dateModified = "2026-11-16";

export const metadata: Metadata = {
  title: metadataTitle,
  description,
  keywords: [
    "pay off mortgage before retirement",
    "should I pay off my mortgage before I retire",
    "pay off mortgage with IRA",
    "pay off mortgage with 401k",
    "mortgage in retirement",
    "IRMAA mortgage payoff",
  ],
  openGraph: {
    title: `${metadataTitle} | ${site.name}`,
    description,
    type: "article",
    publishedTime: datePublished,
    modifiedTime: dateModified,
  },
};

/* ------------------------------------------------------------------------------------------ */
/* Scenario                                                                                    */
/* ------------------------------------------------------------------------------------------ */

/** Greg and Maria Alvarez: both 63, married filing jointly, San Antonio (no state income tax). */
const BALANCE = 200_000;
const RATE = 0.0325;
const TERM_MONTHS = 240;
const HORIZON_YEARS = TERM_MONTHS / 12;
const START_AGE = 63;
/** Other income before any payoff: $28,000 pension plus $42,000 of IRA withdrawals for living costs. */
const PENSION = 28_000;
const IRA_LIVING_DRAWS = 42_000;
const BASE_INCOME = PENSION + IRA_LIVING_DRAWS;
const STAGED_YEARS = 4;
const TRADITIONAL_BALANCE = 1_100_000;
const ROTH_BALANCE = 140_000;
const CASH_RESERVE = 45_000;
const BROKERAGE_GAIN_SHARE = 0.4;

/** Freddie Mac PMMS 30-year fixed average, week of November 12, 2026. */
const PMMS_RATE = 7.11;
const PMMS_DATE = "November 12, 2026";
const COMPARE_RATES = [3.25, 4.5, 6.0, PMMS_RATE];
const COMPARE_RETURNS = [0.02, 0.03, 0.04, 0.06, 0.08];

/* ------------------------------------------------------------------------------------------ */
/* Tax model (married filing jointly, 2026 federal tables from src/lib/tax-data.ts)            */
/* ------------------------------------------------------------------------------------------ */

const MFJ = ORDINARY_BRACKETS.mfj;
const STD = STANDARD_DEDUCTIONS.mfj;
const TOP_OF_12 = MFJ[1].upTo;
const TOP_OF_22 = MFJ[2].upTo;
const TOP_OF_24 = MFJ[3].upTo;
/** Gross income at which the 12% bracket ends (taxable income plus the standard deduction). */
const GROSS_TOP_OF_12 = TOP_OF_12 + STD;
const ROOM_IN_12 = GROSS_TOP_OF_12 - BASE_INCOME;

function federalTax(gross: number): number {
  const taxable = Math.max(0, gross - STD);
  let tax = 0;
  let lower = 0;
  for (const b of MFJ) {
    if (taxable <= lower) break;
    tax += (Math.min(taxable, b.upTo) - lower) * b.rate;
    lower = b.upTo;
  }
  if (taxable > lower) tax += (taxable - lower) * TOP_ORDINARY_RATE;
  return tax;
}

function marginalRate(gross: number): number {
  const taxable = Math.max(0, gross - STD);
  for (const b of MFJ) {
    if (taxable <= b.upTo) return b.rate;
  }
  return TOP_ORDINARY_RATE;
}

/** Extra federal tax caused by taking `withdrawal` on top of `base` income. */
function extraTax(withdrawal: number, base: number = BASE_INCOME): number {
  return federalTax(base + withdrawal) - federalTax(base);
}

/** Pre-tax withdrawal needed to keep `net` dollars after federal tax, stacked on `base` income. */
function grossForNet(net: number, base: number = BASE_INCOME): number {
  let lo = net;
  let hi = net * 2;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (mid - extraTax(mid, base) < net) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Pre-tax withdrawal that is no longer needed when `net` dollars of annual spending disappear. */
function reductionForNet(net: number, base: number = BASE_INCOME): number {
  let lo = net * 0.9;
  let hi = net * 1.5;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (mid - (federalTax(base) - federalTax(base - mid)) < net) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Federal tax on a long-term gain stacked on top of ordinary income (0% / 15% / 20% brackets). */
function longTermGainTax(ordinaryGross: number, gain: number): number {
  const ordinaryTaxable = Math.max(0, ordinaryGross - STD);
  const [zero, fifteen] = LONG_TERM_BRACKETS.mfj;
  const top = ordinaryTaxable + gain;
  const at15 = Math.max(0, Math.min(top, fifteen.upTo) - Math.max(ordinaryTaxable, zero.upTo));
  const at20 = Math.max(0, top - Math.max(ordinaryTaxable, fifteen.upTo));
  return at15 * fifteen.rate + at20 * LONG_TERM_TOP_RATE;
}

/** Sale proceeds needed from a taxable account to net `net` dollars when 40% of the sale is gain. */
function brokerageSaleForNet(net: number): number {
  let lo = net;
  let hi = net * 1.5;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (mid - longTermGainTax(BASE_INCOME, mid * BROKERAGE_GAIN_SHARE) < net) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/* Medicare income-related monthly adjustment amounts, 2026, married filing jointly (SSA). */
interface IrmaaTier {
  label: string;
  /** MAGI above this amount lands in the tier (the last tier starts at the amount itself). */
  above: number;
  inclusive?: boolean;
  partB: number;
  partD: number;
}

const IRMAA_MFJ: IrmaaTier[] = [
  { label: "$218,000 or less", above: 0, partB: 0, partD: 0 },
  { label: "Above $218,000 up to $274,000", above: 218_000, partB: 81.2, partD: 14.5 },
  { label: "Above $274,000 up to $342,000", above: 274_000, partB: 202.9, partD: 37.5 },
  { label: "Above $342,000 up to $410,000", above: 342_000, partB: 324.6, partD: 60.4 },
  { label: "Above $410,000, under $750,000", above: 410_000, partB: 446.3, partD: 83.3 },
  { label: "$750,000 or more", above: 750_000, inclusive: true, partB: 487.0, partD: 91.0 },
];
const IRMAA_STANDARD_PART_B = 202.9;

function irmaaTier(magi: number): IrmaaTier {
  let found = IRMAA_MFJ[0];
  for (const t of IRMAA_MFJ) {
    if (t.inclusive ? magi >= t.above : magi > t.above) found = t;
  }
  return found;
}

/** Extra Part B and Part D premiums for a couple (both on Medicare) for one premium year. */
function irmaaAnnual(magi: number, people = 2): number {
  const t = irmaaTier(magi);
  return (t.partB + t.partD) * 12 * people;
}

/** IRS Publication 915 Worksheet 1, married filing jointly: taxable part of Social Security benefits. */
function taxableSocialSecurity(benefits: number, otherIncome: number): number {
  const provisional = otherIncome + benefits / 2;
  const base1 = 32_000;
  const base2 = 44_000;
  if (provisional <= base1) return 0;
  if (provisional <= base2) return Math.min(benefits * 0.5, (provisional - base1) * 0.5);
  return Math.min(benefits * 0.85, (provisional - base2) * 0.85 + Math.min(benefits * 0.5, (base2 - base1) * 0.5));
}

/* ------------------------------------------------------------------------------------------ */
/* Payoff plans                                                                                */
/* ------------------------------------------------------------------------------------------ */

function payment(balance: number, annualRate: number, months: number): number {
  const r = annualRate / 12;
  return (balance * r) / (1 - Math.pow(1 + r, -months));
}

interface Tranche {
  year: number;
  net: number;
  gross: number;
  tax: number;
  magi: number;
  marginal: number;
}

interface Plan {
  years: number;
  payment: number;
  tranches: Tranche[];
  gross: number;
  tax: number;
  interest: number;
  irmaa: number;
  total: number;
  maxMagi: number;
  maxGross: number;
  maxMarginal: number;
}

/**
 * Pay the loan off in `years` equal-share steps at the start of each year, taken from a traditional IRA.
 * Scheduled payments continue between steps, so the later steps are smaller and the interest keeps accruing.
 */
function stagedPlan(annualRate: number, years: number): Plan {
  const monthlyRate = annualRate / 12;
  const pay = payment(BALANCE, annualRate, TERM_MONTHS);
  let balance = BALANCE;
  let interest = 0;
  const tranches: Tranche[] = [];
  for (let k = 1; k <= years; k++) {
    const net = balance / (years - k + 1);
    const gross = grossForNet(net);
    const magi = BASE_INCOME + gross;
    tranches.push({ year: k, net, gross, tax: extraTax(gross), magi, marginal: marginalRate(magi) });
    balance -= net;
    if (k < years) {
      for (let m = 0; m < 12; m++) {
        const monthInterest = balance * monthlyRate;
        interest += monthInterest;
        balance -= pay - monthInterest;
      }
    }
  }
  const gross = tranches.reduce((s, t) => s + t.gross, 0);
  const tax = tranches.reduce((s, t) => s + t.tax, 0);
  const irmaa = tranches.reduce((s, t) => s + irmaaAnnual(t.magi), 0);
  return {
    years,
    payment: pay,
    tranches,
    gross,
    tax,
    interest,
    irmaa,
    total: tax + interest + irmaa,
    maxMagi: Math.max(...tranches.map((t) => t.magi)),
    maxGross: Math.max(...tranches.map((t) => t.gross)),
    maxMarginal: Math.max(...tranches.map((t) => t.marginal)),
  };
}

/**
 * Pre-tax IRA dollars after 20 years: paying off minus keeping the loan, at a constant annual return `g`.
 * Withdrawals for the payoff happen at the start of each year; the payment saved (grossed up for tax)
 * arrives at the end of each year from the year the loan is gone.
 */
function payoffAdvantage(plan: Plan, savedGross: number, g: number): number {
  let saved = 0;
  for (let t = plan.years; t <= HORIZON_YEARS; t++) saved += savedGross * Math.pow(1 + g, HORIZON_YEARS - t);
  let spent = 0;
  for (const tr of plan.tranches) spent += tr.gross * Math.pow(1 + g, HORIZON_YEARS - (tr.year - 1));
  return saved - spent;
}

/** Annual return at which paying off and keeping the loan end up equal. */
function breakEvenReturn(plan: Plan, savedGross: number): number {
  let lo = -0.05;
  let hi = 0.3;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (payoffAdvantage(plan, savedGross, mid) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/* ------------------------------------------------------------------------------------------ */
/* Computed figures                                                                            */
/* ------------------------------------------------------------------------------------------ */

const monthlyPayment = payment(BALANCE, RATE, TERM_MONTHS);
const annualPayment = monthlyPayment * 12;
const remainingInterest = monthlyPayment * TERM_MONTHS - BALANCE;
let yearOneInterest = 0;
{
  let b = BALANCE;
  for (let m = 0; m < 12; m++) {
    const i = (b * RATE) / 12;
    yearOneInterest += i;
    b -= monthlyPayment - i;
  }
}
const portfolioForPayment = Math.round(annualPayment / 0.04 / 1000) * 1000;

const planRows = [1, 2, 3, 4, 5, 6].map((n) => stagedPlan(RATE, n));
const lump = planRows[0];
const staged = planRows[STAGED_YEARS - 1];
const cheapest = planRows.reduce((a, b) => (b.total < a.total ? b : a));
if (cheapest.years !== STAGED_YEARS) {
  throw new Error(`Guide copy and infographic assume a ${STAGED_YEARS}-year plan is cheapest; the model now picks ${cheapest.years}.`);
}
if (staged.maxMarginal !== MFJ[1].rate || staged.maxGross > ROOM_IN_12) {
  throw new Error("The staged plan no longer fits inside the 12% bracket; revise the copy.");
}
if (lump.maxMarginal !== MFJ[3].rate || irmaaTier(lump.maxMagi).partB !== 202.9) {
  throw new Error("The lump-sum case no longer lands in the 24% bracket and the second IRMAA surcharge tier; revise the copy.");
}
if (planRows.slice(1).some((p) => p.irmaa !== 0)) {
  throw new Error("A staged plan now triggers IRMAA; revise the copy.");
}
const lumpAverageRate = lump.tax / lump.gross;
const lumpSavings = Math.round(lump.total) - Math.round(staged.total);

const savedGross = reductionForNet(annualPayment);
const lumpBreakEven = breakEvenReturn(lump, savedGross) * 100;
const stagedBreakEven = breakEvenReturn(staged, savedGross) * 100;

const breakEvenRows = COMPARE_RATES.map((rate) => {
  const r = rate / 100;
  const pay = payment(BALANCE, r, TERM_MONTHS);
  const saved = reductionForNet(pay * 12);
  const l = stagedPlan(r, 1);
  const s = stagedPlan(r, STAGED_YEARS);
  return { rate, lump: breakEvenReturn(l, saved) * 100, staged: breakEvenReturn(s, saved) * 100 };
});
const breakEvenAtPmms = breakEvenRows[breakEvenRows.length - 1];
const breakEvenAt6 = breakEvenRows[2];
const breakEvenAt45 = breakEvenRows[1];

const advantageRows = COMPARE_RETURNS.map((g) => ({
  g: g * 100,
  lump: payoffAdvantage(lump, savedGross, g),
  staged: payoffAdvantage(staged, savedGross, g),
}));
const advantageAt = (g: number) => advantageRows.find((r) => Math.abs(r.g - g) < 1e-9)!;
const advantageAt2 = advantageAt(2);
const advantageAt4 = advantageAt(4);
const advantageAt6 = advantageAt(6);

const netOptions = [50_000, 100_000, 150_000, 200_000].map((net) => {
  const gross = grossForNet(net);
  const tax = gross - net;
  const magi = BASE_INCOME + gross;
  return { net, gross, tax, avg: tax / gross, marginal: marginalRate(magi), magi, irmaa: irmaaAnnual(magi) };
});
const taxOnExactly200k = extraTax(BALANCE);

const brokerageSale = brokerageSaleForNet(BALANCE);
const brokerageGain = brokerageSale * BROKERAGE_GAIN_SHARE;
const brokerageTax = longTermGainTax(BASE_INCOME, brokerageGain);

const SS_BENEFITS = Math.round((2 * SSA.retiredWorkerAverageMonthly * 12) / 1000) * 1000;
const SS_OTHER_INCOME = 30_000;
const ssTaxableBefore = taxableSocialSecurity(SS_BENEFITS, SS_OTHER_INCOME);
const ssTaxableAfter = taxableSocialSecurity(SS_BENEFITS, SS_OTHER_INCOME + lump.gross);
const ssExtraTax =
  federalTax(SS_OTHER_INCOME + lump.gross + ssTaxableAfter) - federalTax(SS_OTHER_INCOME + lump.gross + ssTaxableBefore);

const SECOND_IRMAA_TIER = IRMAA_MFJ[2];

/* ACS facts from the companion report. */
const ladder = (label: string) => US_AGE_LADDER.find((r) => r.label === label)!;
const share5559 = ladder("55 to 59").mortgageShare.pct;
const share6064 = ladder("60 to 64").mortgageShare.pct;
const share6574 = ladder("65 to 74").mortgageShare.pct;
const share75 = ladder("75 and over").mortgageShare.pct;
const withThe = (name: string) => (name === "District of Columbia" ? "the District of Columbia" : name);
const stateBy65 = [...STATE_RESULTS].sort((a, b) => a.mort65Share.pct - b.mort65Share.pct);
const lowest65 = stateBy65[0];
const highest65 = stateBy65[stateBy65.length - 1];

const usd2 = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct2 = (n: number) => `${n.toFixed(2)}%`;
const pctWhole = (n: number) => `${Math.round(n * 100)}%`;
const advantageLabel = (v: number) => (v >= 0 ? `Paying off ahead by ${usd0(v)}` : `Keeping the loan ahead by ${usd0(-v)}`);

const faqs = [
  {
    question: "Should I pay off my mortgage before I retire?",
    answer: `It depends on where the money comes from and what the loan costs. Cash, a Roth account, or investments with small gains can retire a loan with little or no tax, and a rate near or above 6% strengthens the case. Pre-tax money is different: a married couple with ${usd0(BASE_INCOME)} of other income needs a ${usd0(lump.gross)} IRA withdrawal to net ${usd0(BALANCE)}, and ${usd0(lump.tax)} of that goes to federal tax. Spread over ${STAGED_YEARS} years inside the 12% bracket, the same payoff costs ${usd0(staged.total)} in tax and extra interest. Even then, a ${pct2(RATE * 100)} loan is a close call: the payoff only wins if your portfolio would have earned less than ${pct1(stagedBreakEven)} a year over the remaining 20 years.`,
  },
  {
    question: "Is it smart to use my IRA or 401(k) to pay off my mortgage?",
    answer: `Only in small yearly pieces and only when the loan rate is high enough to justify the tax. A lump-sum withdrawal taxed at 24% turns a ${usd0(BALANCE)} payoff into a ${usd0(lump.gross)} withdrawal, and it can add about ${usd0(lump.irmaa)} to Medicare premiums two years later. Splitting the payoff over ${STAGED_YEARS} years kept every dollar in the 12% bracket in our example and avoided the Medicare surcharge, which lowered the total cost from ${usd0(lump.total)} to ${usd0(staged.total)}. If your loan rate is below roughly ${pct1(breakEvenAt45.rate)} and the money would come from a pre-tax account, keeping the loan is usually the better financial move.`,
  },
  {
    question: "Does paying off a mortgage with an IRA withdrawal raise my Medicare premiums?",
    answer: `It can. Medicare adds an income-related surcharge to Part B and Part D premiums when modified adjusted gross income (MAGI) is above ${usd0(IRMAA_MFJ[1].above)} for a joint return, or $109,000 for a single filer, and the Social Security Administration looks at your tax return from two years earlier. A ${usd0(lump.gross)} withdrawal on top of ${usd0(BASE_INCOME)} of income produces MAGI of ${usd0(lump.maxMagi)}, which puts a couple in the second surcharge tier and adds about ${usd0(lump.irmaa)} for the premium year it is measured. Keeping each year's MAGI under ${usd0(IRMAA_MFJ[1].above)}, as the ${STAGED_YEARS}-year plan does at a peak of ${usd0(staged.maxMagi)}, avoids the surcharge entirely.`,
  },
  {
    question: "How much tax will I owe on a $200,000 IRA withdrawal?",
    answer: `For a married couple filing jointly with ${usd0(BASE_INCOME)} of other income and the ${TAX_DATA.taxYear} standard deduction of ${usd(STD)}, withdrawing exactly ${usd0(BALANCE)} adds about ${usd0(taxOnExactly200k)} of federal income tax. If you need ${usd0(BALANCE)} left after tax, you must withdraw ${usd0(lump.gross)} and owe ${usd0(lump.tax)}, an average rate of ${pct1(lumpAverageRate * 100)} on the withdrawal, with the top dollars taxed at 24%. State income tax is extra, and if you already collect Social Security, more of your benefits become taxable as well.`,
  },
  {
    question: "What mortgage rate makes paying it off worth it?",
    answer: `For a ${usd0(BALANCE)} balance with 20 years left, paying it off over ${STAGED_YEARS} years from pre-tax money breaks even against a portfolio return of ${pct1(breakEvenRows[0].staged)} for a ${pct2(breakEvenRows[0].rate)} loan, ${pct1(breakEvenAt45.staged)} for ${pct1(breakEvenAt45.rate)}, ${pct1(breakEvenAt6.staged)} for ${pct1(breakEvenAt6.rate)}, and ${pct1(breakEvenAtPmms.staged)} for ${pct2(breakEvenAtPmms.rate)}, the Freddie Mac 30-year average on ${PMMS_DATE}. Treat the break-even as the guaranteed yield you earn by paying off. If your portfolio can reasonably earn more than that and you can tolerate the swings, keeping the loan wins; if not, payoff wins. The lump sum breaks even at a lower return, so it is the weaker plan at every rate in the table.`,
  },
  {
    question: "How many retirees still have a mortgage?",
    answer: `${millions(US_RESULT.m65)} owner households headed by someone 65 or older had a mortgage in the Census Bureau's 2025 American Community Survey, which is ${pct1(US_RESULT.mort65Share.pct)} of owners that age. The share is ${pct1(share5559)} at ages 55 to 59 and ${pct1(share75)} at 75 and over, so the share falls steadily with age. By state it ranges from ${pct1(lowest65.mort65Share.pct)} in ${withThe(lowest65.name)} to ${pct1(highest65.mort65Share.pct)} in ${withThe(highest65.name)}.`,
  },
];

const sourceClass = "text-brand-600 hover:text-brand-800 font-medium";

export default function PayOffMortgageBeforeRetirementGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified}
        image="/images/guides/pay-off-mortgage-before-retirement.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Pay Off Mortgage Before Retirement", href: `/guides/${slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Retirement & Mortgage
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{h1}</h1>
          <p className="mt-4 text-lg text-ink-600">
            {`You are about to retire with ${usd0(BALANCE)} left on a ${pct2(RATE * 100)} mortgage and most of your savings in a traditional IRA or 401(k). Wiping out the loan would remove a ${usd0(monthlyPayment)} monthly payment from your retirement budget, so it sounds like an easy win. The catch is that money in a pre-tax account is not worth ${usd0(BALANCE)} once the IRS takes its share. For a married couple in the ${TAX_DATA.taxYear} brackets with ${usd0(BASE_INCOME)} of other income, getting ${usd0(BALANCE)} out of an IRA in one year takes a ${usd0(lump.gross)} withdrawal and costs ${usd0(lump.tax)} in federal tax. This guide shows what the withdrawal really costs, how to cut the total cost by about ${usd0(lumpSavings)}, and when paying off the mortgage before retirement still makes sense.`}
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: November 2026</p>
        </header>

        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">Quick Answer</p>
          <p className="mt-1 text-ink-700">
            {`Pay the mortgage off before you retire when the money comes from cash, a Roth account, or investments with small gains. When it would come from a traditional IRA or 401(k), the tax bill usually decides. For a couple with ${usd0(BASE_INCOME)} of other income, clearing ${usd0(BALANCE)} in one year takes a ${usd0(lump.gross)} withdrawal, ${usd0(lump.tax)} of federal tax, and about ${usd0(lump.irmaa)} of extra Medicare premiums later. Spreading the payoff over ${STAGED_YEARS} years keeps every dollar in the 12% bracket and cuts the total cost to ${usd0(staged.total)}. Even then, the payoff beats keeping a ${pct2(RATE * 100)} loan only if the portfolio you drain would have earned less than ${pct1(stagedBreakEven)} a year (${pct1(lumpBreakEven)} for the lump sum).`}
          </p>
        </div>

        <figure className="mt-10">
          <Image
            src="/images/guides/pay-off-mortgage-before-retirement.webp"
            alt={`Infographic comparing a ${usd0(lump.gross)} one-year IRA withdrawal to pay off a ${usd0(BALANCE)} mortgage (${usd0(lump.tax)} federal tax) with a ${STAGED_YEARS}-year payoff costing ${usd0(staged.total)} in tax and interest`}
            width={1200}
            height={800}
            className="rounded-lg border border-ink-200"
          />
          <figcaption className="mt-2 text-center text-sm text-ink-500">
            {`Paying off a ${usd0(BALANCE)} mortgage from a traditional IRA: all in one year vs spread over ${STAGED_YEARS} years (married couple, ${usd0(BASE_INCOME)} other income, ${pct2(RATE * 100)} loan, ${TAX_DATA.taxYear} brackets)`}
          </figcaption>
        </figure>

        <section className="prose mt-10 max-w-none">
          <h2>How Common Is a Mortgage in Retirement?</h2>
          <p>
            {`Common enough to plan for. In the Census Bureau's 2025 American Community Survey, ${millions(US_RESULT.m65)} owner households headed by someone 65 or older still had a mortgage, which is ${pct1(US_RESULT.mort65Share.pct)} of all owners in that age group. The share falls with age: ${pct1(share5559)} of owners 55 to 59 have a mortgage, ${pct1(share6064)} at 60 to 64, ${pct1(share6574)} at 65 to 74, and ${pct1(share75)} at 75 and over. By state, the share of owners 65 and over who still owe money runs from ${pct1(lowest65.mort65Share.pct)} in ${withThe(lowest65.name)} to ${pct1(highest65.mort65Share.pct)} in ${withThe(highest65.name)}; the full table is in our `}
            <Link href={MORTGAGE_FREE.path} className={sourceClass}>
              report on mortgage-free homeowners by state
            </Link>
            .
          </p>
          <p>
            {`Carrying a loan also shows up in the monthly budget. The median owner with a mortgage spends ${usd0(US_RESULT.medMort)} a month on selected owner costs (payment, property tax, insurance, utilities, and association fees), against ${usd0(US_RESULT.medNoMort)} for owners without one. The two groups are different households, so the ${usd0(US_RESULT.medMort - US_RESULT.medNoMort)} gap is not the exact saving from paying off any one loan, but it shows why a fixed payment feels heavy on a retirement income. A paid-off house still has taxes, insurance, and repairs; only the loan payment goes away.`}
          </p>
          <Sources
            items={[MORTGAGE_FREE_SOURCES.acsMortgageByAge, MORTGAGE_FREE_SOURCES.acsOwnerCosts, MORTGAGE_FREE_SOURCES.acsDefinitions]}
            checked="November 2026"
            note="ACS figures are survey estimates with margins of error; the report page lists them for every state."
          />

          <h2>What Paying Off the Mortgage Actually Buys</h2>
          <p>
            {`Paying down a loan earns a guaranteed return equal to its interest rate. On a ${usd0(BALANCE)} balance at ${pct2(RATE * 100)}, that is about ${usd0(yearOneInterest)} of interest avoided in the first year and ${usd0(remainingInterest)} over the remaining 20 years (a ${usd0(monthlyPayment)} payment for ${TERM_MONTHS} months). First-year interest is far below the ${usd(STD)} standard deduction for a married couple, so this household would not itemize and loses no mortgage interest deduction by paying off.`}
          </p>
          <p>
            What you give up to get that return is the question. Two formulas capture it. The first is the size of the withdrawal when the money comes from a pre-tax account:
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-base font-semibold text-ink-900 sm:text-lg">
            Gross withdrawal = Amount to pay ÷ (1 − Average tax rate on the withdrawal)
          </p>
          <p>
            {`The average tax rate is the extra federal tax divided by the withdrawal, and it rises as the withdrawal gets bigger because each dollar pushes more income into higher brackets. In our example, ${usd0(BALANCE)} ÷ (1 − ${pct1(lumpAverageRate * 100)}) = ${usd0(lump.gross)}. The second formula is the break-even return, the annual return your IRA would have to earn for keeping the money invested to match paying the loan off:`}
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-base font-semibold text-ink-900 sm:text-lg">
            Gross withdrawal = Σ [ Saved gross payment ÷ (1 + r)^t ], for t = 1 to 20
          </p>
          <ul>
            <li>
              <strong>Saved gross payment:</strong>
              {` the extra IRA withdrawal you no longer need each year once the loan is gone, taxes included. A ${usd0(annualPayment)} annual payment needs a ${usd0(savedGross)} withdrawal to fund it, because the last dollars of this household's income are taxed at only 12% and 10%.`}
            </li>
            <li>
              <strong>r:</strong>
              {` the break-even annual return, found by solving the equation numerically.`}
            </li>
            <li>
              <strong>t:</strong>
              {` the years left on the loan, which is where the payment savings stop.`}
            </li>
          </ul>
          <p>
            {`The formula is exact for a one-time payoff. For a payoff spread over several years, each withdrawal compounds from the year it is taken and the savings begin once the loan is gone; the idea is the same. Plug in the lump-sum case and r comes out at ${pct2(lumpBreakEven)}: paying ${usd0(lump.gross)} to save ${usd0(savedGross)} a year for 20 years is equivalent to a guaranteed ${pct2(lumpBreakEven)} return, well below the ${pct2(RATE * 100)} on the loan because the withdrawal is taxed at an average ${pct1(lumpAverageRate * 100)} (24% at the top) while the payments it replaces would have been funded at only 10% to 12%. That tax-rate gap is the whole story, and the rest of this guide is about shrinking it.`}
          </p>

          <h2>Where the Money Comes From Changes the Answer</h2>
          <p>
            {`Four sources can fund a ${usd0(BALANCE)} payoff, and they are taxed very differently. The table assumes a married couple filing jointly with ${usd0(BASE_INCOME)} of other income and ${usd0(BALANCE)} of cash needed after tax.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Source</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Amount taken out</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Federal tax</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">What it costs you</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">Cash savings or CDs</td>
                  <td className="px-4 py-3 text-ink-800">{usd0(BALANCE)}</td>
                  <td className="px-4 py-3 text-ink-800">$0</td>
                  <td className="px-4 py-3 text-ink-800">{`The interest you stop earning, which you compare with ${pct2(RATE * 100)}. Keep an emergency reserve before you spend it.`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">Roth IRA (qualified)</td>
                  <td className="px-4 py-3 text-ink-800">{usd0(BALANCE)}</td>
                  <td className="px-4 py-3 text-ink-800">$0</td>
                  <td className="px-4 py-3 text-ink-800">Tax-free growth you give up. Qualified Roth withdrawals do not count toward MAGI, so Medicare premiums are unaffected.</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">{`Taxable brokerage (${pctWhole(BROKERAGE_GAIN_SHARE)} of the sale is gain)`}</td>
                  <td className="px-4 py-3 text-ink-800">{usd0(brokerageSale)}</td>
                  <td className="px-4 py-3 text-ink-800">{usd0(brokerageTax)}</td>
                  <td className="px-4 py-3 text-ink-800">{`Long-term gains of ${usd0(brokerageGain)} sit partly in the 0% bracket (taxable income up to ${usd0(LONG_TERM_BRACKETS.mfj[0].upTo)}) and the rest at 15%.`}</td>
                </tr>
                <tr className="border-b border-ink-100 bg-ink-50/50">
                  <td className="px-4 py-3 font-semibold text-ink-800">Traditional IRA or 401(k), one year</td>
                  <td className="px-4 py-3 font-semibold text-ink-800">{usd0(lump.gross)}</td>
                  <td className="px-4 py-3 font-semibold text-ink-800">{usd0(lump.tax)}</td>
                  <td className="px-4 py-3 text-ink-800">{`${pct1(lumpAverageRate * 100)} average rate, 24% at the top, and a Medicare surcharge two years later.`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {`Cash and Roth money are the cleanest sources, but they are also the money most retirees want for emergencies and tax flexibility, so draining them to kill a ${pct2(RATE * 100)} loan has its own cost. The expensive source is the one most households actually hold: the traditional IRA or 401(k). Every dollar in it carries an IRS claim that gets paid whenever the dollar leaves, and a payoff forces a large claim to be paid in a single year.`}
          </p>
          <Sources
            items={[TAX_SOURCES.revProc, TAX_SOURCES.federalRates, TAX_SOURCES.capitalGains]}
            checked={TAX_DATA.checkedOnLabel}
            note={`Federal income tax only, married filing jointly, standard deduction. Brokerage tax uses the long-term 0%, 15%, and 20% brackets and ignores the ${pct1(NIIT_RATE * 100)} net investment income tax, which does not apply below ${usd(NIIT_THRESHOLDS.mfj)} of MAGI for joint filers.`}
          />

          <h2>Why a Big IRA Withdrawal Costs So Much: The Bracket Staircase</h2>
          <p>
            {`For ${TAX_DATA.taxYear}, a married couple filing jointly has a ${usd(STD)} standard deduction. The 10% bracket ends at ${usd(MFJ[0].upTo)} of taxable income, 12% at ${usd(TOP_OF_12)}, 22% at ${usd(TOP_OF_22)}, and 24% at ${usd(TOP_OF_24)}. Adding the standard deduction, a couple stays in the 12% bracket until gross income reaches ${usd(GROSS_TOP_OF_12)}. A household that already has ${usd0(BASE_INCOME)} of income has ${usd0(ROOM_IN_12)} of room left at 12%. Anything above that is taxed at 22% or 24%, which is what makes a ${usd0(lump.gross)} withdrawal so expensive.`}
          </p>
          <p>
            {`The table shows what it costs to take out enough to net different payoff amounts in a single year. The ${usd0(BALANCE)} row is the lump-sum case.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Cash needed after tax</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">IRA withdrawal</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Federal tax</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Average rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Top bracket</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Total income (MAGI)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Medicare surcharge, later</th>
                </tr>
              </thead>
              <tbody>
                {netOptions.map((row) => (
                  <tr key={row.net} className={`border-b border-ink-100 ${row.net === BALANCE ? "bg-ink-50/50" : ""}`}>
                    <td className="px-4 py-3 text-ink-800">{usd0(row.net)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(row.gross)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(row.tax)}</td>
                    <td className="px-4 py-3 text-ink-800">{pct1(row.avg * 100)}</td>
                    <td className="px-4 py-3 text-ink-800">{pctWhole(row.marginal)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(row.magi)}</td>
                    <td className="px-4 py-3 text-ink-800">{row.irmaa === 0 ? "None" : `${usd0(row.irmaa)} a year`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`Notice how the cost per dollar climbs. The first ${usd0(netOptions[1].net)} of payoff costs ${usd0(netOptions[1].tax)} in tax (${pct1(netOptions[1].avg * 100)} of the withdrawal); the second ${usd0(netOptions[3].net - netOptions[1].net)} costs ${usd0(netOptions[3].tax - netOptions[1].tax)} more, an incremental rate of ${pct1(((netOptions[3].tax - netOptions[1].tax) / (netOptions[3].gross - netOptions[1].gross)) * 100)}. Big, rare withdrawals are the most expensive way to move IRA money; small, repeated ones are the cheapest.`}
          </p>

          <h2>Two Costs That Most Payoff Plans Miss</h2>
          <h3>Medicare premium surcharges (IRMAA)</h3>
          <p>
            {`Medicare charges higher Part B and Part D premiums when income is high, and the measure is MAGI, which includes IRA withdrawals. For 2026 the first surcharge starts above ${usd0(IRMAA_MFJ[1].above)} for a joint return ($109,000 for a single filer). Social Security generally uses the tax return from two years earlier, so a payoff at 63 or 64 shows up in premiums at 65 or 66. The tiers for couples are below, with the extra yearly cost when both spouses are enrolled.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">MAGI, married filing jointly</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Extra Part B, per person per month</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Extra Part D, per person per month</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Extra cost, couple, per year</th>
                </tr>
              </thead>
              <tbody>
                {IRMAA_MFJ.map((t) => (
                  <tr key={t.label} className={`border-b border-ink-100 ${t === SECOND_IRMAA_TIER ? "bg-ink-50/50" : ""}`}>
                    <td className="px-4 py-3 text-ink-800">{t.label}</td>
                    <td className="px-4 py-3 text-ink-800">{t.partB === 0 ? "None" : usd2(t.partB)}</td>
                    <td className="px-4 py-3 text-ink-800">{t.partD === 0 ? "None" : usd2(t.partD)}</td>
                    <td className="px-4 py-3 text-ink-800">{t.partB === 0 ? "None" : usd0(irmaaAnnual(t.above + 1))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`The ${usd0(lump.gross)} lump-sum withdrawal pushes the couple's MAGI to ${usd0(lump.maxMagi)}, into the second surcharge tier (MAGI above ${usd0(SECOND_IRMAA_TIER.above)} up to ${usd0(IRMAA_MFJ[3].above)}), which adds about ${usd0(lump.irmaa)} for the one premium year that return is used. The standard 2026 Part B premium is ${usd2(IRMAA_STANDARD_PART_B)} a month, so the surcharge is large: in that tier each person's Part B premium doubles to ${usd2(IRMAA_STANDARD_PART_B + SECOND_IRMAA_TIER.partB)} before the Part D add-on of ${usd2(SECOND_IRMAA_TIER.partD)}. The surcharge is a cliff, not a slope. A MAGI of ${usd0(IRMAA_MFJ[1].above)} costs nothing; one dollar more puts both spouses in the first surcharge tier.`}
          </p>
          <Sources
            items={[
              {
                label: "Social Security Administration: Medicare premiums, rules for higher-income beneficiaries",
                href: "https://www.ssa.gov/benefits/medicare/medicare-premiums.html",
              },
            ]}
            checked="November 2026"
            note="2026 amounts. Premium surcharges can change each year. A couple pays the surcharge once for each spouse on Medicare."
          />

          <h3>Taxes on Social Security benefits</h3>
          <p>
            {`If you already collect Social Security, a large IRA withdrawal can also make more of your benefits taxable. Under IRS Publication 915, a married couple's benefits start to become taxable when provisional income (other income plus half of benefits) passes $32,000, and up to 85% of benefits are taxable once it passes $44,000. These thresholds are not indexed for inflation. Take two average retired-worker benefits (the SSA average was ${usd2(SSA.retiredWorkerAverageMonthly)} a month in ${SSA.month}), about ${usd0(SS_BENEFITS)} a year, plus ${usd0(SS_OTHER_INCOME)} of pension and interest. Without a withdrawal, ${usd0(ssTaxableBefore)} of the benefits is taxable (${pct1((ssTaxableBefore / SS_BENEFITS) * 100)}). Add a ${usd0(lump.gross)} IRA withdrawal and the taxable part jumps to ${usd0(ssTaxableAfter)} (85%), an extra ${usd0(ssTaxableAfter - ssTaxableBefore)} of taxable income that costs roughly ${usd0(ssExtraTax)} in additional federal tax on top of the tax on the withdrawal itself.`}
          </p>
          <Sources
            items={[
              { label: "IRS Publication 915, Social Security and Equivalent Railroad Retirement Benefits", href: "https://www.irs.gov/publications/p915" },
              RETIREMENT_SOURCES.ssaSnapshot,
            ]}
            checked="November 2026"
            note="Worksheet 1 of Publication 915, married filing jointly. The result assumes a withdrawal of the same size and ignores state tax."
          />

          <h2>Case Study: Greg and Maria Alvarez in San Antonio</h2>
          <p>
            {`Greg and Maria are both 63 and retiring this year in San Antonio, where there is no state income tax. They have ${usd0(TRADITIONAL_BALANCE)} in traditional IRAs and 401(k)s, ${usd0(ROTH_BALANCE)} in Roth IRAs, and a ${usd0(CASH_RESERVE)} cash reserve, with no taxable brokerage account. Maria's pension pays ${usd0(PENSION)} a year and they draw ${usd0(IRA_LIVING_DRAWS)} from the IRAs for living costs, so their income is ${usd0(BASE_INCOME)} before any payoff. They plan to claim Social Security at 67. Their mortgage has ${usd0(BALANCE)} left at ${pct2(RATE * 100)} with 20 years to go, a ${usd0(monthlyPayment)} payment. The cash reserve is too small to retire the loan and the Roth money is the part they want to keep, so the only realistic source is the traditional accounts.`}
          </p>
          <p>
            {`The table prices six ways to get to zero, from one big withdrawal to six equal annual steps. In every staged plan the payments continue between steps, so the later steps are smaller, but interest keeps accruing while the loan is open. Cost means federal tax on the withdrawals, mortgage interest paid before the loan is gone, and Medicare surcharges.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Payoff plan</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Total IRA withdrawals</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Federal tax</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Interest while waiting</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Medicare surcharge</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Total cost</th>
                </tr>
              </thead>
              <tbody>
                {planRows.map((p) => (
                  <tr key={p.years} className={`border-b border-ink-100 ${p.years === cheapest.years ? "bg-ink-50/50" : ""}`}>
                    <td className="px-4 py-3 text-ink-800">{p.years === 1 ? "All at once" : `${p.years} yearly steps`}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(p.gross)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(p.tax)}</td>
                    <td className="px-4 py-3 text-ink-800">{p.interest === 0 ? "$0" : usd0(p.interest)}</td>
                    <td className="px-4 py-3 text-ink-800">{p.irmaa === 0 ? "None" : usd0(p.irmaa)}</td>
                    <td className={`px-4 py-3 text-ink-800 ${p.years === cheapest.years ? "font-semibold" : ""}`}>{usd0(p.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`The cheapest route is ${STAGED_YEARS} steps at ${usd0(staged.total)}, which is ${usd0(lumpSavings)} less than the lump sum. Fewer steps cost more tax because each step lands higher in the brackets; more steps cost more interest because the loan stays open longer. Four steps also keep the peak income at ${usd0(staged.maxMagi)}, comfortably under the ${usd0(IRMAA_MFJ[1].above)} Medicare line, and the largest single withdrawal of ${usd0(staged.maxGross)} fits inside their ${usd0(ROOM_IN_12)} of room at 12%. Here is the year-by-year schedule.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Year</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Loan paid off that year</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">IRA withdrawal</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Federal tax</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Top bracket</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Total income (MAGI)</th>
                </tr>
              </thead>
              <tbody>
                {staged.tranches.map((t) => (
                  <tr key={t.year} className="border-b border-ink-100">
                    <td className="px-4 py-3 text-ink-800">{`Year ${t.year} (age ${START_AGE + t.year - 1})`}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(t.net)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(t.gross)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(t.tax)}</td>
                    <td className="px-4 py-3 text-ink-800">{pctWhole(t.marginal)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd0(t.magi)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`The last step lands at age ${START_AGE + STAGED_YEARS - 1}, the year before Greg and Maria plan to start Social Security, so none of the withdrawals stack on top of taxable benefits. That timing is a quiet advantage of paying off in the gap years between retiring and claiming.`}
          </p>
          <p>
            <strong>Is paying off worth it at all?</strong>
            {` The ${STAGED_YEARS}-year plan costs money up front, so the real test is against keeping the loan. At their ${pct2(RATE * 100)} rate the break-even return is ${pct2(stagedBreakEven)}. In plain terms, paying off earns Greg and Maria a guaranteed ${pct1(stagedBreakEven)} a year for 20 years after the tax cost of freeing up the money. If their portfolio earns more than that, keeping the loan wins; if it earns less, paying off wins. The next section puts dollars on that.`}
          </p>

          <h2>The Break-Even: What Must Your Portfolio Earn?</h2>
          <p>
            {`The break-even return is the yield that paying off is worth, after counting the tax on the money you take out. The table solves it for four loan rates on a ${usd0(BALANCE)} balance with 20 years left, for the one-year lump sum and the ${STAGED_YEARS}-year plan. The last row uses ${pct2(PMMS_RATE)}, the Freddie Mac 30-year average on ${PMMS_DATE}, as the rate on a hypothetical new loan.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Mortgage rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Lump sum: keeping wins if portfolio earns more than</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">{`${STAGED_YEARS}-year plan: keeping wins if portfolio earns more than`}</th>
                </tr>
              </thead>
              <tbody>
                {breakEvenRows.map((row) => (
                  <tr key={row.rate} className={`border-b border-ink-100 ${row.rate === RATE * 100 ? "bg-ink-50/50" : ""}`}>
                    <td className="px-4 py-3 text-ink-800">{row.rate === PMMS_RATE ? `${pct2(row.rate)} (${PMMS_DATE})` : pct2(row.rate)}</td>
                    <td className="px-4 py-3 text-ink-800">{pct1(row.lump)} a year</td>
                    <td className="px-4 py-3 text-ink-800">{pct1(row.staged)} a year</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`Two patterns stand out. First, keeping the loan beats the lump sum at a much lower portfolio return, at every rate, because the lump sum pays tax at higher brackets. Second, the ${STAGED_YEARS}-year plan lands within about ${Math.max(...breakEvenRows.map((r) => Math.abs(r.rate - r.staged))).toFixed(1)} percentage points of the loan rate in every row, so a staged payoff from pre-tax money is nearly equal to a guaranteed return at the mortgage rate. That makes the question one of risk, not arithmetic: if your portfolio will earn more than the loan rate on average, you accept volatility to come out ahead by keeping the loan.`}
          </p>
          <p>
            {`Here is the same ${pct2(RATE * 100)} comparison in dollars. Each cell shows how much larger or smaller the IRA is after 20 years in pre-tax dollars, assuming a constant return.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Portfolio return</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Lump sum</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">{`${STAGED_YEARS}-year plan`}</th>
                </tr>
              </thead>
              <tbody>
                {advantageRows.map((row) => (
                  <tr key={row.g} className="border-b border-ink-100">
                    <td className="px-4 py-3 text-ink-800">{pct1(row.g)} a year</td>
                    <td className="px-4 py-3 text-ink-800">{advantageLabel(row.lump)}</td>
                    <td className="px-4 py-3 text-ink-800">{advantageLabel(row.staged)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`At ${pct1(advantageAt2.g)} the ${STAGED_YEARS}-year payoff finishes ${usd0(advantageAt2.staged)} ahead; at ${pct1(advantageAt4.g)} keeping the loan is ${usd0(-advantageAt4.staged)} ahead, and at ${pct1(advantageAt6.g)} it is ${usd0(-advantageAt6.staged)} ahead. The lump sum is behind at every return above ${pct1(lumpBreakEven)}, by ${usd0(-advantageAt6.lump)} at ${pct1(advantageAt6.g)}. The model is deliberately simple: constant ${TAX_DATA.taxYear} brackets and a constant ${usd0(BASE_INCOME)} of other income for 20 years, withdrawals at the start of each year, saved payments counted at year-end, no Medicare or Social Security effects in the break-even, and no change in spending. Real years will differ, but the order of the results is robust: staged beats lump sum, and the keep-or-pay decision turns on your expected return against the loan rate.`}
          </p>

          <h3>Greg and Maria’s decision</h3>
          <p>
            {`They rule out the lump sum immediately: it costs ${usd0(lumpSavings)} more than the ${STAGED_YEARS}-year plan and triggers Medicare surcharges. Between the staged payoff and keeping the loan, the math is close at ${pct2(RATE * 100)}, so they decide on risk. Maria's pension covers only ${usd0(PENSION)} of their ${usd0(BASE_INCOME)} budget, and Greg does not want a fixed ${usd0(annualPayment)} yearly payment competing with IRA withdrawals in a down market. They choose the ${STAGED_YEARS}-year plan, finishing at ${START_AGE + STAGED_YEARS - 1}, and accept a guaranteed ${pct1(stagedBreakEven)} instead of betting their portfolio will beat it. A household with a 6% loan would not face a close call: the ${STAGED_YEARS}-year break-even there is ${pct1(breakEvenAt6.staged)}, which asks a portfolio to beat a guaranteed ${pct1(breakEvenAt6.staged)} every year for 20 years.`}
          </p>

          <h2>When Paying Off Wins, and When Keeping the Loan Wins</h2>
          <h3>Pay it off when</h3>
          <ul>
            <li>
              {`The loan rate is high. At ${pct2(PMMS_RATE)} the ${STAGED_YEARS}-year break-even is ${pct1(breakEvenAtPmms.staged)}; at 6% it is ${pct1(breakEvenAt6.staged)}. Few portfolios beat those returns without large swings.`}
            </li>
            <li>
              {`The money comes from cash, a Roth account, or shares with small gains. The tax cost is near zero, so the payoff earns close to the full loan rate.`}
            </li>
            <li>
              {`You can do it in the low-income gap years, before Social Security and before required distributions, and keep each year in the 12% bracket.`}
            </li>
            <li>
              {`Fixed costs are the risk. A ${usd0(annualPayment)} yearly payment would take a portfolio of about ${usd0(portfolioForPayment)} to fund at the 4% rule of thumb, and unlike a portfolio withdrawal it never adjusts when markets fall.`}
            </li>
          </ul>
          <Sources
            items={[
              {
                label: "William Bengen, Journal of Financial Planning (Oct. 1994 reprint PDF)",
                href: "https://www.financialplanningassociation.org/sites/default/files/2021-04/MAR04%20Determining%20Withdrawal%20Rates%20Using%20Historical%20Data.pdf",
              },
            ]}
            checked="November 2026"
            note="The 4% rule is a historical simulation, not an IRS or SSA rule; read our guide on how much you need to retire for its limits."
          />
          <h3>Keep the loan when</h3>
          <ul>
            <li>
              {`The rate is low and the money is pre-tax. At ${pct2(RATE * 100)} the ${STAGED_YEARS}-year break-even is ${pct1(stagedBreakEven)}, and at ${pct1(breakEvenAt45.rate)} it is ${pct1(breakEvenAt45.staged)}.`}
            </li>
            <li>
              {`The only way to fund it is a single large withdrawal. The lump-sum case costs ${usd0(lumpSavings)} more than the staged plan in our example.`}
            </li>
            <li>
              {`It would drain cash you need for emergencies, or money you have earmarked for Roth conversions, a bequest, or long-term care.`}
            </li>
            <li>
              {`A one-time withdrawal would push MAGI above ${usd0(IRMAA_MFJ[1].above)} in a year Medicare will use to set your premiums at 65 or later.`}
            </li>
          </ul>

          <h2>How to Decide in Six Steps</h2>
          <ol>
            <li>
              {`Get a payoff quote from your servicer: the balance, the rate, the remaining term, and the payment. Greg and Maria's is ${usd0(BALANCE)}, ${pct2(RATE * 100)}, ${TERM_MONTHS} months, and ${usd0(monthlyPayment)}.`}
            </li>
            <li>
              {`List your accounts by tax type: cash, Roth, taxable (with cost basis), and traditional. Only the traditional balances carry a payoff tax of the kind described above.`}
            </li>
            <li>
              {`Find your income without the payoff, then the room left in your bracket. For a couple, the 12% bracket ends at ${usd0(GROSS_TOP_OF_12)} of gross income in ${TAX_DATA.taxYear}; with ${usd0(BASE_INCOME)} already planned, the room is ${usd0(ROOM_IN_12)} a year.`}
            </li>
            <li>
              {`Compare your loan rate with the break-even table. If the rate is under about ${pct1(breakEvenAt45.rate)} and the money is pre-tax, lean toward keeping the loan; if it is ${pct1(breakEvenAt6.rate)} or higher, lean toward paying off.`}
            </li>
            <li>
              {`If you pay off from pre-tax money, size each year's withdrawal to the room in your bracket and the Medicare line (${usd0(IRMAA_MFJ[1].above)} of MAGI for a couple), and stretch it over as many years as the interest cost allows. Use the `}
              <Link href="/calculators/amortization" className={sourceClass}>
                Amortization Calculator
              </Link>
              {` to see how much interest each extra year of waiting costs.`}
            </li>
            <li>
              {`Re-check each year. Update your income, the remaining balance, and your state's tax. Stop early if markets fall sharply and the next withdrawal would mean selling at a loss.`}
            </li>
          </ol>
          <p>
            {`This guide builds on our broader comparison of `}
            <Link href="/guides/pay-off-mortgage-early-vs-invest" className={sourceClass}>
              paying off a mortgage early vs investing
            </Link>
            {` by adding the retirement-specific taxes. The `}
            <Link href="/guides/401k-vs-roth-ira" className={sourceClass}>
              401(k) vs Roth IRA guide
            </Link>
            {` explains why the account you take money from matters, and our `}
            <Link href="/guides/how-much-to-retire-at-55" className={sourceClass}>
              how much to retire at 55 guide
            </Link>
            {` shows how a mortgage payment changes the portfolio you need.`}
          </p>
          <p className="text-sm text-ink-500">
            {`This guide is for general education, not tax or investment advice. Your own brackets, state tax, Social Security timing, and Medicare enrollment can change the result, so check the numbers with a tax professional before moving retirement money.`}
          </p>
        </section>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Numbers</p>
          <p className="mt-1 text-sm text-ink-600">
            Price the loan, see how much interest each year of waiting costs, and test the tax on a withdrawal.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/mortgage"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Mortgage Calculator
            </Link>
            <Link
              href="/calculators/amortization"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Amortization Calculator
            </Link>
            <Link
              href="/calculators/income-tax"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Income Tax Calculator
            </Link>
            <Link
              href="/calculators/retirement"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Retirement Calculator
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
          <Sources
            items={[
              TAX_SOURCES.federalRates,
              {
                label: "Social Security Administration: Medicare premiums, rules for higher-income beneficiaries",
                href: "https://www.ssa.gov/benefits/medicare/medicare-premiums.html",
              },
              { label: "Freddie Mac, Primary Mortgage Market Survey", href: "https://www.freddiemac.com/pmms" },
              MORTGAGE_FREE_SOURCES.acsMortgageByAge,
            ]}
            checked="November 2026"
            note={`The ${pct2(PMMS_RATE)} rate is the Freddie Mac 30-year fixed average for the week of ${PMMS_DATE}.`}
          />
        </section>

        <RelatedGuides
          currentSlug={slug}
          relatedSlugs={["pay-off-mortgage-early-vs-invest", "401k-vs-roth-ira", "how-much-to-retire-at-55"]}
        />
      </article>
    </>
  );
}
