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
import {
  BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026,
  FLSA_EXEMPT_MIN_ANNUAL,
  FLSA_EXEMPT_MIN_WEEKLY,
  KFF_EMPLOYER_SHARE_SINGLE_2025,
  OEWS_MEDIAN_HOURLY_MAY_2025,
  STANDARD_PAID_HOURS_PER_YEAR,
  WAGE_BENCHMARK_SOURCES,
  annualFromHourly,
  hourlyFromAnnual,
  usd2,
  usdWhole,
} from "@/lib/wage-data";

const slug = "salary-vs-hourly-pay";
const h1 = "Salary vs Hourly Pay: Which Is Better for You in 2026?";
const metadataTitle = "Salary vs Hourly: Which Pays More in 2026?";
const description =
  "Salary vs hourly pay in 2026: compare offers with overtime, PTO, federal exempt rules, BLS benefits data, take-home math, and a job-offer checklist.";
const datePublished = "2026-11-14";
const dateModified = "2026-11-14";

export const metadata: Metadata = {
  title: metadataTitle,
  description,
  keywords: [
    "salary vs hourly",
    "salaried vs hourly pay",
    "convert salary to hourly",
    "effective hourly rate",
    "FLSA exempt salary threshold",
    "no tax on overtime deduction",
  ],
  openGraph: {
    title: `${metadataTitle} | ${site.name}`,
    description,
    type: "article",
    publishedTime: datePublished,
    modifiedTime: dateModified,
  },
};

/** DOL highly compensated employee total annual compensation (dol.gov salary-levels page). */
const FLSA_HCE_ANNUAL = 107_432;

/** California minimum wage effective Jan. 1, 2026 (DIR). Exempt salary = 2 x minimum wage x full-time hours (Labor Code 515(a), 515(c)). */
const CA_STATE_MIN_WAGE_2026 = 16.9;
const CA_EXEMPT_MIN_ANNUAL = CA_STATE_MIN_WAGE_2026 * 2 * STANDARD_PAID_HOURS_PER_YEAR;

/** BLS ECEC, June 2026 (released Sept. 9, 2026): private industry, all workers. */
const ECEC_TOTAL_COMP_HOURLY_PRIVATE = 46.89;
const ECEC_WAGE_COST_HOURLY_PRIVATE = 32.82;
const ECEC_BENEFIT_COST_HOURLY_PRIVATE = 14.07;
const ECEC_BENEFITS_SHARE = ECEC_BENEFIT_COST_HOURLY_PRIVATE / ECEC_TOTAL_COMP_HOURLY_PRIVATE;
const ECEC_WAGES_SHARE = ECEC_WAGE_COST_HOURLY_PRIVATE / ECEC_TOTAL_COMP_HOURLY_PRIVATE;

/** BLS ECEC, June 2026: full-time private industry workers. */
const ECEC_FULLTIME_TOTAL_COMP_HOURLY = 54.0;
const ECEC_FULLTIME_PAID_LEAVE_HOURLY = 4.4;
const ECEC_FULLTIME_PAID_LEAVE_SHARE = ECEC_FULLTIME_PAID_LEAVE_HOURLY / ECEC_FULLTIME_TOTAL_COMP_HOURLY;

/** BLS Employee Benefits in the United States, March 2026 (released Sept. 25, 2026): private industry. */
const BLS_PAID_VACATION_DAYS_AFTER_1YR = 9;
const BLS_PAID_HOLIDAY_DAYS = 8;
const BLS_PTO_DAYS_TOTAL = BLS_PAID_VACATION_DAYS_AFTER_1YR + BLS_PAID_HOLIDAY_DAYS;
const BLS_PAID_VACATION_ACCESS_PCT = 80;
const BLS_PAID_HOLIDAY_ACCESS_PCT = 81;

/** BLS Characteristics of Minimum Wage Workers, 2024: 80.3 million hourly-paid workers, 55.6% of wage and salary workers. */
const BLS_HOURLY_WORKERS_SHARE_2024 = 0.556;

/** IRS qualified overtime compensation deduction, tax years 2025 through 2028 (single filers; phase-out starts at $150,000 MAGI). */
const OVERTIME_DEDUCTION_CAP = 12_500;

const FLSA_OT_MULTIPLIER = 1.5;
const HOURS_PER_WEEK = 40;
const WEEKS_PER_YEAR = 52;
const HOURS_PER_WORKDAY = 8;

const COMPARE_SALARY = 52_000;
const COMPARE_HOURLY = 25;

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const pct1 = (n: number) => `${n.toFixed(1)}%`;

function hoursWorkedPerYear(daysOff: number): number {
  return STANDARD_PAID_HOURS_PER_YEAR - daysOff * HOURS_PER_WORKDAY;
}

/** Annual gross for a non-exempt hourly worker paid 1.5x for every hour over 40 in a week, 52 paid weeks. */
function grossHourlyAnnual(rate: number, hoursPerWeek: number): number {
  const regularHours = HOURS_PER_WEEK * WEEKS_PER_YEAR;
  const overtimeHours = Math.max(0, hoursPerWeek - HOURS_PER_WEEK) * WEEKS_PER_YEAR;
  return rate * regularHours + rate * FLSA_OT_MULTIPLIER * overtimeHours;
}

/** The "half" in time-and-a-half: the premium the IRS treats as qualified overtime compensation. */
function overtimePremium(rate: number, hoursPerWeek: number): number {
  const overtimeHours = Math.max(0, hoursPerWeek - HOURS_PER_WEEK) * WEEKS_PER_YEAR;
  return rate * (FLSA_OT_MULTIPLIER - 1) * overtimeHours;
}

function effectiveHourlyRate(annualGross: number, hoursPerWeek: number): number {
  return annualGross / (hoursPerWeek * WEEKS_PER_YEAR);
}

/**
 * Average weekly hours at which non-exempt hourly gross reaches a salary offer.
 * Returns 40 when the hourly offer already matches or beats the salary at 40 hours.
 */
function hoursToMatchSalary(salary: number, rate: number, unpaidAdjustment = 0): number {
  const base = rate * STANDARD_PAID_HOURS_PER_YEAR - unpaidAdjustment;
  if (base >= salary) return HOURS_PER_WEEK;
  const grossPerWeeklyOvertimeHour = rate * FLSA_OT_MULTIPLIER * WEEKS_PER_YEAR;
  return HOURS_PER_WEEK + Math.ceil(((salary - base) / grossPerWeeklyOvertimeHour) * 10) / 10;
}

/**
 * Single filer, standard deduction, tax-data federal brackets, employee FICA, no state income tax.
 * qualifiedOvertimePremium is deducted from taxable income up to the IRS cap; payroll taxes are unaffected.
 */
function estimateAnnualTakeHomeSingle(grossAnnual: number, qualifiedOvertimePremium = 0): number {
  const overtimeDeduction = Math.min(qualifiedOvertimePremium, OVERTIME_DEDUCTION_CAP);
  const taxable = Math.max(0, grossAnnual - STANDARD_DEDUCTIONS.single - overtimeDeduction);
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
  const fica = ssWages * SOCIAL_SECURITY_EMPLOYEE_RATE + grossAnnual * MEDICARE_EMPLOYEE_RATE;
  return grossAnnual - federal - fica;
}

const compareHours = [40, 45, 50] as const;

const comparisonRows = compareHours.map((hoursPerWeek) => {
  const hourlyGross = grossHourlyAnnual(COMPARE_HOURLY, hoursPerWeek);
  return {
    hoursPerWeek,
    salaryGross: COMPARE_SALARY,
    hourlyGross,
    salaryEffective: effectiveHourlyRate(COMPARE_SALARY, hoursPerWeek),
    hourlyEffective: effectiveHourlyRate(hourlyGross, hoursPerWeek),
  };
});

const salaryEffectiveWithPto = COMPARE_SALARY / hoursWorkedPerYear(BLS_PTO_DAYS_TOTAL);
const hourlyGrossNoPaidLeave = COMPARE_HOURLY * hoursWorkedPerYear(BLS_PTO_DAYS_TOTAL);
const unpaidLeaveGap = COMPARE_SALARY - hourlyGrossNoPaidLeave;

const hourlyOffers = [22, 23, 24, 25, 26].map((rate) => {
  const base = annualFromHourly(rate);
  return {
    rate,
    base,
    gap: COMPARE_SALARY - base,
    hoursToMatch: hoursToMatchSalary(COMPARE_SALARY, rate),
  };
});

const offer23 = hourlyOffers.find((row) => row.rate === 23)!;

const hours45Gross = grossHourlyAnnual(COMPARE_HOURLY, 45);
const hours45Premium = overtimePremium(COMPARE_HOURLY, 45);
const hours45TakeHome = estimateAnnualTakeHomeSingle(hours45Gross, hours45Premium);
const hours45TakeHomeNoDeduction = estimateAnnualTakeHomeSingle(hours45Gross);
const overtimeDeductionSavings45 = hours45TakeHome - hours45TakeHomeNoDeduction;
const salaryTakeHome = estimateAnnualTakeHomeSingle(COMPARE_SALARY);
const hourly40TakeHome = estimateAnnualTakeHomeSingle(annualFromHourly(COMPARE_HOURLY));

// Case study: Daniela, Austin TX (no state wage income tax). Same role at two employers, both with about 43-hour weeks.
const DANIELA_SALARY = 58_500;
const DANIELA_HOURLY = 27.5;
const DANIELA_AVG_HOURS = 43;
const DANIELA_DAYS_OFF = 12;
const DANIELA_HOURLY_PAID_DAYS = 5;
const danielaUnpaidDays = DANIELA_DAYS_OFF - DANIELA_HOURLY_PAID_DAYS;
const danielaUnpaidCost = danielaUnpaidDays * HOURS_PER_WORKDAY * DANIELA_HOURLY;
const danielaHourlyBeforeUnpaid = grossHourlyAnnual(DANIELA_HOURLY, DANIELA_AVG_HOURS);
const danielaHourlyGross = danielaHourlyBeforeUnpaid - danielaUnpaidCost;
const danielaPremium = overtimePremium(DANIELA_HOURLY, DANIELA_AVG_HOURS);
const danielaNominalHourly = hourlyFromAnnual(DANIELA_SALARY);
const danielaSalaryEffective = effectiveHourlyRate(DANIELA_SALARY, DANIELA_AVG_HOURS);
const danielaHourlyEffective = effectiveHourlyRate(danielaHourlyGross, DANIELA_AVG_HOURS);
const danielaSalaryTakeHome = estimateAnnualTakeHomeSingle(DANIELA_SALARY);
const danielaHourlyTakeHome = estimateAnnualTakeHomeSingle(danielaHourlyGross, danielaPremium);
const danielaTakeHomeDiff = danielaHourlyTakeHome - danielaSalaryTakeHome;
const danielaHealthGap = KFF_EMPLOYER_SHARE_SINGLE_2025 - danielaTakeHomeDiff;
const danielaOvertimeDeductionSavings =
  danielaHourlyTakeHome - estimateAnnualTakeHomeSingle(danielaHourlyGross);
const danielaHoursToMatchGross = hoursToMatchSalary(DANIELA_SALARY, DANIELA_HOURLY, danielaUnpaidCost);
const danielaNeedsSalary = (danielaSalaryTakeHome / 12) * 0.5;
const danielaNeedsHourly = (danielaHourlyTakeHome / 12) * 0.5;

/** Weekly hours at which Daniela's after-tax hourly pay gap covers the employer health subsidy she would lose. */
function danielaHoursToMatchTotalValue(): number {
  for (let h = HOURS_PER_WEEK; h <= 70; h += 0.25) {
    const gross = grossHourlyAnnual(DANIELA_HOURLY, h) - danielaUnpaidCost;
    const takeHome = estimateAnnualTakeHomeSingle(gross, overtimePremium(DANIELA_HOURLY, h));
    if (takeHome - danielaSalaryTakeHome >= KFF_EMPLOYER_SHARE_SINGLE_2025) return h;
  }
  return 70;
}
const danielaHoursToMatchValue = danielaHoursToMatchTotalValue();

const nominalEquivCompare = hourlyFromAnnual(COMPARE_SALARY);

const faqs = [
  {
    question: "Is salary or hourly better?",
    answer: `Neither label wins by itself: gross pay, hours, overtime rules, and benefits decide. At a matched ${usd2(COMPARE_HOURLY)}/hour and ${usdWhole(COMPARE_SALARY)} salary, both gross ${usdWhole(COMPARE_SALARY)} at 40 hours. If the hourly role is non-exempt and you average 45 hours, gross rises to ${usdWhole(hours45Gross)} while a salaried exempt colleague still earns ${usdWhole(COMPARE_SALARY)}, lifting the hourly effective rate to ${usd2(effectiveHourlyRate(hours45Gross, 45))} versus ${usd2(effectiveHourlyRate(COMPARE_SALARY, 45))} on salary. If the hourly job has no paid time off, ${BLS_PTO_DAYS_TOTAL} unpaid days cut gross to ${usdWhole(hourlyGrossNoPaidLeave)}, which is why PTO policy matters as much as the pay type.`,
  },
  {
    question: "Do salaried employees get overtime?",
    answer: `Most exempt salaried workers do not receive overtime under the Fair Labor Standards Act if they meet the duties test and earn at least ${usdWhole(FLSA_EXEMPT_MIN_WEEKLY)} per week (${usdWhole(FLSA_EXEMPT_MIN_ANNUAL)} per year) under the federal rule, or ${usdWhole(CA_EXEMPT_MIN_ANNUAL)} per year in California, where the floor is twice the ${usd2(CA_STATE_MIN_WAGE_2026)} state minimum wage for full-time work. Non-exempt salaried employees must receive 1.5× their regular rate for hours over 40 in a workweek. An exempt employee at ${usdWhole(COMPARE_SALARY)} working 50-hour weeks still earns ${usd2(effectiveHourlyRate(COMPARE_SALARY, 50))} per hour worked, while a non-exempt hourly worker at ${usd2(COMPARE_HOURLY)} at 50 hours grosses ${usdWhole(grossHourlyAnnual(COMPARE_HOURLY, 50))} for an effective ${usd2(effectiveHourlyRate(grossHourlyAnnual(COMPARE_HOURLY, 50), 50))}.`,
  },
  {
    question: "How do I convert salary to hourly?",
    answer: `Divide annual salary by standard paid hours, usually ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} (40 hours × 52 weeks). ${usdWhole(COMPARE_SALARY)} ÷ ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} = ${usd2(nominalEquivCompare)} per hour before taxes. For an effective rate, divide by the hours you actually work: with ${BLS_PTO_DAYS_TOTAL} paid days off (${BLS_PAID_HOLIDAY_DAYS} holidays + ${BLS_PAID_VACATION_DAYS_AFTER_1YR} vacation days, the BLS private-industry averages), worked hours fall to ${hoursWorkedPerYear(BLS_PTO_DAYS_TOTAL).toLocaleString("en-US")}, so the same salary equals ${usd2(salaryEffectiveWithPto)} per hour worked. Use the ${site.name} Salary to Hourly Calculator for your exact figures.`,
  },
  {
    question: "Is $25 an hour a good salary?",
    answer: `${usd2(COMPARE_HOURLY)} per hour at 40 hours is ${usdWhole(annualFromHourly(COMPARE_HOURLY))} gross per year, the same nominal rate as a ${usdWhole(COMPARE_SALARY)} salary. BLS reported average hourly earnings of private employees at ${usd2(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026)} in September 2026 and a median of ${usd2(OEWS_MEDIAN_HOURLY_MAY_2025)} in the May 2025 occupational employment survey, so ${usd2(COMPARE_HOURLY)} sits slightly above the national median but below the recent average. A single filer keeps about ${usdWhole(hourly40TakeHome)} per year after federal tax and FICA (about ${usd0(hourly40TakeHome / 12)}/month, with no state income tax in this example), which leaves ${usd0((hourly40TakeHome / 12) * 0.5)} a month for needs under a 50/30/20 budget. A few overtime hours per week, or employer health coverage worth about ${usdWhole(KFF_EMPLOYER_SHARE_SINGLE_2025)} a year (KFF 2025 survey), can matter more than the ${usd2(COMPARE_HOURLY)} headline rate.`,
  },
  {
    question: "How much overtime makes hourly pay beat salary?",
    answer: `It depends on how far the hourly rate sits below the salary's per-hour equivalent. At ${usd2(COMPARE_HOURLY)} versus ${usdWhole(COMPARE_SALARY)} the offers tie at exactly 40 hours, so every overtime hour is extra. At ${usd2(24)} an hour you need about ${hourlyOffers[2].hoursToMatch.toFixed(1)} hours a week to reach ${usdWhole(COMPARE_SALARY)}; at ${usd2(23)} you need ${hourlyOffers[1].hoursToMatch.toFixed(1)}; at ${usd2(22)}, ${hourlyOffers[0].hoursToMatch.toFixed(1)}. Overtime is paid at 1.5× the base rate, so each extra weekly hour adds ${usdWhole(COMPARE_HOURLY * FLSA_OT_MULTIPLIER * WEEKS_PER_YEAR)} a year at ${usd2(COMPARE_HOURLY)}.`,
  },
  {
    question: "Is overtime pay taxed differently in 2026?",
    answer: `Overtime is still wages: Social Security and Medicare tax apply to every dollar, and employers still withhold federal income tax. What changed is a federal income tax deduction for the premium part of FLSA overtime (the "half" in time-and-a-half), worth up to ${usdWhole(OVERTIME_DEDUCTION_CAP)} per return ($25,000 if married filing jointly) for tax years 2025 through 2028, phasing out above $150,000 of modified adjusted gross income ($300,000 joint). At ${usd2(COMPARE_HOURLY)} an hour and 45-hour weeks the premium is ${usdWhole(hours45Premium)} a year, which lowers a single filer's federal tax by about ${usdWhole(overtimeDeductionSavings45)}. Exempt salaried workers have no FLSA overtime, so the deduction only helps on the hourly path, and your employer has to report the amount on Form W-2 (box 12, code TT).`,
  },
];

export default function SalaryVsHourlyPayGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified}
        image="/images/guides/salary-vs-hourly-pay.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Salary vs Hourly Pay", href: `/guides/${slug}` },
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
            {`You have two offers for the same logistics coordinator role: ${usdWhole(COMPARE_SALARY)} salaried (exempt) or ${usd2(COMPARE_HOURLY)} per hour (non-exempt). The headline numbers match, since ${usdWhole(COMPARE_SALARY)} ÷ ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} hours = ${usd2(nominalEquivCompare)} per hour, but your choice changes overtime pay, how paid time off affects cash flow, and what happens when steady 45-hour weeks replace a 40-hour expectation. This guide walks through the formulas, federal and California exempt rules, BLS compensation benchmarks, take-home pay with ${TAX_DATA.taxYear} federal tax tables (including the new overtime deduction), and an Austin case study so you can compare offers on your own terms.`}
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: November 2026</p>
        </header>

        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">Quick Answer</p>
          <p className="mt-1 text-ink-700">
            {`Salary vs hourly is a toss-up only when hours stay at 40 and benefits are equal. At ${usdWhole(COMPARE_SALARY)} versus ${usd2(COMPARE_HOURLY)}, gross pay is identical at 40 hours, but 5 hours of weekly overtime lifts hourly gross to ${usdWhole(hours45Gross)} while exempt salary stays flat. Unpaid time off costs an hourly worker without PTO about ${usdWhole(unpaidLeaveGap)} per year versus a salaried colleague who keeps full pay. Compare effective hourly rates (pay divided by hours worked), put a dollar value on health coverage, and confirm exempt status against the federal ${usdWhole(FLSA_EXEMPT_MIN_ANNUAL)} salary floor, or ${usdWhole(CA_EXEMPT_MIN_ANNUAL)} in California.`}
          </p>
        </div>

        <figure className="mt-10">
          <Image
            src="/images/guides/salary-vs-hourly-pay.webp"
            alt={`Salary vs hourly pay comparison infographic: ${usdWhole(COMPARE_SALARY)} salary at 40 and 50 hours worked versus ${usd2(COMPARE_HOURLY)} hourly gross at 40, 45, and 50 hours per week`}
            width={1200}
            height={800}
            className="rounded-lg border border-ink-200"
          />
          <figcaption className="mt-2 text-center text-sm text-ink-500">
            {`Side-by-side gross pay: ${usdWhole(COMPARE_SALARY)} salary vs ${usd2(COMPARE_HOURLY)}/hour (40 to 50 hour weeks, November 2026 assumptions)`}
          </figcaption>
        </figure>

        <section className="prose mt-10 max-w-none">
          <h2>Why Salary vs Hourly Decisions Trip People Up</h2>
          <p>
            {`Employers often frame salary as "stable" and hourly as "flexible," but stability is just a fixed numerator. The denominator (hours worked, overtime eligibility, and paid leave) moves the outcome more than the label. BLS Employer Costs for Employee Compensation show private employers spent ${pct1(ECEC_BENEFITS_SHARE * 100)} of total compensation on benefits in June 2026 (wages were ${pct1(ECEC_WAGES_SHARE * 100)}), so two offers with the same gross wage can still diverge by thousands once health premiums and retirement match enter the picture.`}
          </p>
          <p>
            {`Roughly ${pct1(BLS_HOURLY_WORKERS_SHARE_2024 * 100)} of U.S. wage and salary workers were paid by the hour in 2024 (80.3 million workers, per the BLS Characteristics of Minimum Wage Workers report). Most of the rest are salaried, but a salaried title does not automatically mean exempt from overtime. The federal salary floor for the white-collar exemptions is ${usdWhole(FLSA_EXEMPT_MIN_WEEKLY)} per week, the level the Department of Labor lists after a federal court vacated the higher 2024 threshold in November 2024.`}
          </p>

          <h2>Core Formulas for Salary vs Hourly</h2>
          <p>
            <strong>Nominal hourly equivalent (salary):</strong> divide annual salary by{" "}
            {STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} paid hours (40 hours × 52 weeks).
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-lg font-semibold text-ink-900">
            Hourly equivalent = Annual salary ÷ 2,080
          </p>
          <p>
            {`Example: ${usdWhole(COMPARE_SALARY)} ÷ ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} = ${usd2(nominalEquivCompare)} per hour before taxes. This matches the convention in our `}
            <Link href="/calculators/salary-to-hourly" className="text-brand-600 hover:text-brand-800 font-medium">
              Salary to Hourly Calculator
            </Link>
            {` and is the number recruiters use when they say the offers "are the same."`}
          </p>
          <p>
            <strong>Effective hourly rate:</strong> divide gross annual pay by the hours you actually work.
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-lg font-semibold text-ink-900">
            Effective hourly = Annual pay ÷ (Hours per week × 52)
          </p>
          <p>
            {`A ${usdWhole(COMPARE_SALARY)} exempt employee averaging 50-hour weeks earns an effective ${usd2(effectiveHourlyRate(COMPARE_SALARY, 50))} per hour worked. A non-exempt worker at ${usd2(COMPARE_HOURLY)} on the same schedule grosses ${usdWhole(grossHourlyAnnual(COMPARE_HOURLY, 50))} and works at an effective ${usd2(effectiveHourlyRate(grossHourlyAnnual(COMPARE_HOURLY, 50), 50))} because FLSA overtime kicks in.`}
          </p>
          <p>
            <strong>FLSA overtime (non-exempt):</strong> for hours over 40 in a workweek, pay at least 1.5× the regular rate.
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-lg font-semibold text-ink-900">
            OT pay = 1.5 × Regular rate × Hours over 40 per week
          </p>
          <p>
            {`Five overtime hours at ${usd2(COMPARE_HOURLY)} add ${usd2(COMPARE_HOURLY * FLSA_OT_MULTIPLIER * 5)} per week, or ${usdWhole(COMPARE_HOURLY * FLSA_OT_MULTIPLIER * 5 * WEEKS_PER_YEAR)} per year. That is the difference between ${usdWhole(hours45Gross)} and ${usdWhole(grossHourlyAnnual(COMPARE_HOURLY, 40))} in the comparison table below.`}
          </p>
          <p>
            <strong>Paid-time-off adjustment:</strong> salaried workers usually keep full salary during approved PTO. Hourly workers without paid leave only earn for hours on the clock, so their paid hours can fall below 2,080 even on a 40-hour schedule.
          </p>
          <p>
            {`With ${BLS_PTO_DAYS_TOTAL} days off (${BLS_PAID_HOLIDAY_DAYS} paid holidays and ${BLS_PAID_VACATION_DAYS_AFTER_1YR} vacation days after one year, the BLS private-industry averages in the March 2026 benefits survey), worked hours drop to ${hoursWorkedPerYear(BLS_PTO_DAYS_TOTAL).toLocaleString("en-US")}. Salary still pays ${usdWhole(COMPARE_SALARY)}; hourly with no PTO pays ${usdWhole(COMPARE_HOURLY)} × ${hoursWorkedPerYear(BLS_PTO_DAYS_TOTAL).toLocaleString("en-US")} = ${usdWhole(hourlyGrossNoPaidLeave)}, a ${usdWhole(unpaidLeaveGap)} gap before overtime.`}
          </p>

          <h2>Gross Pay Comparison: {usdWhole(COMPARE_SALARY)} Salary vs {usd2(COMPARE_HOURLY)}/Hour</h2>
          <p>
            {`The table computes annual gross and effective hourly rates for 40-, 45-, and 50-hour average weeks, assuming the hourly worker is paid for 52 full weeks and earns 1.5× for every hour over 40. The last row shows what happens when an hourly employee has no paid leave for the BLS-average ${BLS_PTO_DAYS_TOTAL} days.`}
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Avg hours / week</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Salary gross</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Hourly gross (1.5× OT)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Salary effective $/hr</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Hourly effective $/hr</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.hoursPerWeek} className="border-b border-ink-100">
                    <td className="px-4 py-3 text-ink-800">{row.hoursPerWeek}</td>
                    <td className="px-4 py-3 text-ink-800">{usdWhole(row.salaryGross)}</td>
                    <td className="px-4 py-3 text-ink-800">{usdWhole(row.hourlyGross)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd2(row.salaryEffective)}</td>
                    <td className="px-4 py-3 text-ink-800">{usd2(row.hourlyEffective)}</td>
                  </tr>
                ))}
                <tr className="border-b border-ink-100 bg-ink-50/50">
                  <td className="px-4 py-3 text-ink-800" colSpan={5}>
                    {`PTO lens: with ${BLS_PTO_DAYS_TOTAL} paid days off the salary works out to ${usd2(salaryEffectiveWithPto)} per hour actually worked (${usdWhole(COMPARE_SALARY)} ÷ ${hoursWorkedPerYear(BLS_PTO_DAYS_TOTAL).toLocaleString("en-US")}). An hourly worker with no paid leave for the same days grosses ${usdWhole(hourlyGrossNoPaidLeave)}, ${usdWhole(unpaidLeaveGap)} less.`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>When Does Overtime Make Hourly Beat Salary?</h2>
          <p>
            {`Exempt salary does not increase when weeks run long, so an hourly offer below the salary's per-hour equivalent can still win once overtime starts. The table fixes the salary at ${usdWhole(COMPARE_SALARY)} (${usd2(nominalEquivCompare)} per hour on paper) and asks how many average weekly hours each hourly rate needs to reach the same gross, with every hour past 40 paid at 1.5×.`}
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Hourly offer</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Gross at 40 hours</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">vs {usdWhole(COMPARE_SALARY)} salary</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Avg hours / week to match</th>
                </tr>
              </thead>
              <tbody>
                {hourlyOffers.map((row) => (
                  <tr key={row.rate} className="border-b border-ink-100">
                    <td className="px-4 py-3 text-ink-800">{usd2(row.rate)}</td>
                    <td className="px-4 py-3 text-ink-800">{usdWhole(row.base)}</td>
                    <td className="px-4 py-3 text-ink-800">
                      {row.gap > 0 ? `${usdWhole(row.gap)} below` : row.gap < 0 ? `${usdWhole(-row.gap)} above` : "Even"}
                    </td>
                    <td className="px-4 py-3 text-ink-800">
                      {row.gap < 0
                        ? "Ahead at 40 hours"
                        : row.gap === 0
                          ? "40 (each OT hour is extra)"
                          : `${row.hoursToMatch.toFixed(1)} (${(row.hoursToMatch - HOURS_PER_WEEK).toFixed(1)} OT hours)`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`The pattern: every $1 an hour you give up versus the salary's per-hour equivalent costs ${usdWhole(STANDARD_PAID_HOURS_PER_YEAR)} a year, while each weekly overtime hour earns back ${usdWhole(offer23.rate * FLSA_OT_MULTIPLIER * WEEKS_PER_YEAR)} a year at ${usd2(offer23.rate)} an hour. A $2 shortfall therefore takes about ${(offer23.hoursToMatch - HOURS_PER_WEEK).toFixed(1)} overtime hours a week to close, but only if that overtime is actually scheduled and paid.`}
          </p>

          <h2>Exempt vs Non-Exempt: Federal Rules in November 2026</h2>
          <p>
            {`The Fair Labor Standards Act generally requires overtime at 1.5× for non-exempt workers. The executive, administrative, and professional exemptions require a duties test plus a minimum salary of ${usdWhole(FLSA_EXEMPT_MIN_WEEKLY)} per week (${usdWhole(FLSA_EXEMPT_MIN_ANNUAL)} annually), the figure on the DOL salary-level page after a federal court vacated the 2024 increase. Highly compensated employees face a ${usdWhole(FLSA_HCE_ANNUAL)} total annual compensation test that still includes at least ${usdWhole(FLSA_EXEMPT_MIN_WEEKLY)} per week paid on a salary basis.`}
          </p>
          <p>
            {`California sets a higher floor. Labor Code section 515 requires a monthly salary of at least twice the state minimum wage for full-time work (40 hours a week): ${usd2(CA_STATE_MIN_WAGE_2026)} × 2 × ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} = ${usdWhole(CA_EXEMPT_MIN_ANNUAL)} since January 1, 2026. California also requires daily overtime after 8 hours in a day, not only weekly hours over 40, so a misclassified salaried worker in Los Angeles can be owed more than under federal law alone.`}
          </p>
          <Sources
            items={[
              WAGE_BENCHMARK_SOURCES.dolExempt,
              {
                label: "California DIR, minimum wage FAQ ($16.90 per hour from Jan. 1, 2026)",
                href: "https://www.dir.ca.gov/dlse/faq_minimumwage.htm",
              },
              {
                label: "California Labor Code section 515 (exempt salary of two times the state minimum wage)",
                href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=515",
              },
            ]}
            checked="November 2026"
            note="Local minimum wages and state daily overtime rules can go beyond these figures; confirm classification with your state labor agency."
          />

          <h2>Benefits: What BLS Says Employers Spend</h2>
          <p>
            {`In June 2026, BLS reported private-industry employer compensation cost ${usd2(ECEC_TOTAL_COMP_HOURLY_PRIVATE)} per hour worked: wages ${usd2(ECEC_WAGE_COST_HOURLY_PRIVATE)} (${pct1(ECEC_WAGES_SHARE * 100)}) and benefits ${usd2(ECEC_BENEFIT_COST_HOURLY_PRIVATE)} (${pct1(ECEC_BENEFITS_SHARE * 100)}). For full-time private workers, paid leave alone cost employers ${usd2(ECEC_FULLTIME_PAID_LEAVE_HOURLY)} per hour worked, ${pct1(ECEC_FULLTIME_PAID_LEAVE_SHARE * 100)} of the ${usd2(ECEC_FULLTIME_TOTAL_COMP_HOURLY)} total. Salaried and hourly full-time jobs often differ most in how much of that paid leave actually reaches the worker.`}
          </p>
          <p>
            {`On access, ${BLS_PAID_VACATION_ACCESS_PCT}% of private-industry workers had paid vacation and ${BLS_PAID_HOLIDAY_ACCESS_PCT}% had paid holidays in March 2026. Among those with paid vacation, the mean after one year of service was ${BLS_PAID_VACATION_DAYS_AFTER_1YR} days, and paid holidays averaged ${BLS_PAID_HOLIDAY_DAYS} days. KFF estimates employers contributed ${usdWhole(KFF_EMPLOYER_SHARE_SINGLE_2025)} toward the average single health premium in 2025, a dollar figure worth adding when a salaried package includes subsidized medical and an hourly quote does not.`}
          </p>
          <Sources
            items={[
              WAGE_BENCHMARK_SOURCES.blsEcecJun2026,
              {
                label: "BLS Employee Benefits in the United States, March 2026 (released Sept. 25, 2026)",
                href: "https://www.bls.gov/news.release/ebs2.nr0.htm",
              },
              {
                label: "BLS series: average paid vacation days after 1 year, private industry",
                href: "https://data.bls.gov/timeseries/NBU20500000000000030069",
              },
              {
                label: "BLS series: average paid holidays, private industry",
                href: "https://data.bls.gov/timeseries/NBU20600000000000030074",
              },
              {
                label: "BLS Characteristics of Minimum Wage Workers, 2024 (hourly-paid share)",
                href: "https://www.bls.gov/opub/reports/minimum-wage/2024/home.htm",
              },
              WAGE_BENCHMARK_SOURCES.kff2025,
            ]}
            checked="November 2026"
            note="Benefit access is not the same as participation; employer cost averages include workers who do not enroll in every plan."
          />

          <h2>Case Study: Daniela, 29, Austin, TX</h2>
          <p>
            {`Daniela is an operations analyst in Austin choosing between two offers for the same role at regional distributors. Both jobs run about ${DANIELA_AVG_HOURS} hours in a typical week. Offer A is a ${usdWhole(DANIELA_SALARY)} exempt salary with ${BLS_PTO_DAYS_TOTAL} paid days off (${BLS_PAID_HOLIDAY_DAYS} holidays + ${BLS_PAID_VACATION_DAYS_AFTER_1YR} vacation days, the BLS averages) and employer-paid health insurance worth about ${usdWhole(KFF_EMPLOYER_SHARE_SINGLE_2025)} a year (the KFF 2025 employer share of an average single premium). Offer B is ${usd2(DANIELA_HOURLY)} an hour, non-exempt, with ${DANIELA_HOURLY_PAID_DAYS} paid days off and no premium subsidy. Texas has no state wage income tax, so the federal-only math below is her whole tax picture.`}
          </p>
          <p>
            <strong>Gross pay.</strong>
            {` Offer B pays ${HOURS_PER_WEEK} regular hours plus ${DANIELA_AVG_HOURS - HOURS_PER_WEEK} overtime hours at 1.5×: ${usd2(DANIELA_HOURLY)} × (${HOURS_PER_WEEK} × ${WEEKS_PER_YEAR} + 1.5 × ${DANIELA_AVG_HOURS - HOURS_PER_WEEK} × ${WEEKS_PER_YEAR}) = ${usdWhole(danielaHourlyBeforeUnpaid)}. She expects to be away ${DANIELA_DAYS_OFF} days a year and Offer B pays only ${DANIELA_HOURLY_PAID_DAYS} of them, so ${danielaUnpaidDays} unpaid days × ${HOURS_PER_WORKDAY} hours × ${usd2(DANIELA_HOURLY)} = ${usdWhole(danielaUnpaidCost)} comes off, leaving ${usdWhole(danielaHourlyGross)}. That is ${usdWhole(danielaHourlyGross - DANIELA_SALARY)} above the salary. Per hour of a ${DANIELA_AVG_HOURS}-hour week, the salary works out to ${usd2(danielaSalaryEffective)} and the hourly job to ${usd2(danielaHourlyEffective)}, even though the salary looks like ${usd2(danielaNominalHourly)} on paper (${usdWhole(DANIELA_SALARY)} ÷ 2,080).`}
          </p>
          <p>
            <strong>Take-home pay.</strong>
            {` Using the ${TAX_DATA.taxYear} standard deduction of ${usd(STANDARD_DEDUCTIONS.single)}, the single-filer brackets in ${site.name} tax data, and employee FICA, the salary leaves about ${usdWhole(danielaSalaryTakeHome)} a year (${usd0(danielaSalaryTakeHome / 12)}/month). The hourly job leaves about ${usdWhole(danielaHourlyTakeHome)} (${usd0(danielaHourlyTakeHome / 12)}/month), which includes the federal overtime deduction on her ${usdWhole(danielaPremium)} of overtime premium and is worth ${usdWhole(danielaOvertimeDeductionSavings)} of that. After tax, Offer B is ${usdWhole(danielaTakeHomeDiff)} a year ahead.`}
          </p>
          <p>
            <strong>Health coverage.</strong>
            {` The salaried job also carries employer health insurance worth roughly ${usdWhole(KFF_EMPLOYER_SHARE_SINGLE_2025)} a year. Daniela would have to replace that herself on the hourly job (your own premium will differ; this is the KFF average employer share, not a quote). Counting it, Offer A is ahead by about ${usdWhole(danielaHealthGap)}. On gross pay alone the hourly job passes the salary at about ${danielaHoursToMatchGross.toFixed(1)} hours a week, so at her expected ${DANIELA_AVG_HOURS} hours it looks like the winner. Gross is the wrong finish line when one offer includes insurance: after tax, the hourly job only catches up at about ${danielaHoursToMatchValue.toFixed(1)} hours a week.`}
          </p>
          <p>
            <strong>Budget check.</strong>
            {` Under our `}
            <Link href="/guides/50-30-20-budget-rule" className="text-brand-600 hover:text-brand-800 font-medium">
              50/30/20 budget rule guide
            </Link>
            {`, needs take up 50% of take-home pay: ${usd0(danielaNeedsSalary)} a month on salary versus ${usd0(danielaNeedsHourly)} on hourly. That ${usd0(danielaNeedsHourly - danielaNeedsSalary)} monthly difference is smaller than the ${usd0(KFF_EMPLOYER_SHARE_SINGLE_2025 / 12)} a month the health subsidy is worth.`}
          </p>
          <p>
            {`Daniela's decision: unless the hourly employer offers health coverage or she can get a plan for much less than ${usdWhole(KFF_EMPLOYER_SHARE_SINGLE_2025)} a year, the salary wins on total compensation even though the hourly job pays more cash. If she expects overtime to hold at ${danielaHoursToMatchValue.toFixed(1)} hours a week or more, or Offer B adds benefits, the answer flips. Either way, the hourly upside only exists while overtime is scheduled, recorded, and paid.`}
          </p>

          <h2>How to Compare Two Pay Offers in Six Steps</h2>
          <ol>
            <li>
              {`Convert salary to a nominal hourly rate: annual ÷ ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")}. If the salary is ${usdWhole(DANIELA_SALARY)}, that is ${usd2(danielaNominalHourly)}/hour on paper.`}
            </li>
            <li>
              {`Estimate real hours from the job description, team norms, and what current employees say. Find your number in the comparison table (40, 45, 50, or your own).`}
            </li>
            <li>
              {`Add PTO: count paid days on each offer. For hourly roles without paid leave, multiply unpaid days × ${HOURS_PER_WORKDAY} hours × the hourly rate and subtract it.`}
            </li>
            <li>
              {`Check exempt status against ${usdWhole(FLSA_EXEMPT_MIN_ANNUAL)} federal and any higher state threshold (for example ${usdWhole(CA_EXEMPT_MIN_ANNUAL)} in California). If the duties fail the test, overtime is owed regardless of the salary format.`}
            </li>
            <li>
              {`Model take-home with federal and state withholding. Our example uses a single filer with no state tax, so add your state in the `}
              <Link href="/calculators/paycheck" className="text-brand-600 hover:text-brand-800 font-medium">
                Paycheck Calculator
              </Link>
              .
            </li>
            <li>
              {`Value benefits in dollars: employer health contributions, retirement match, and tuition perks. Compare total compensation, then stress-test the `}
              <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">
                50/30/20 budget
              </Link>
              {` with the lower take-home figure. If either role allows freelance work on the side, 1099 income follows different tax rules; see our `}
              <Link href="/guides/self-employment-tax-guide" className="text-brand-600 hover:text-brand-800 font-medium">
                self-employment tax guide
              </Link>
              .
            </li>
          </ol>

          <h2>Federal Take-Home: Same Gross, Different Labels</h2>
          <p>
            {`Pay type does not change how the IRS taxes W-2 wages; only the gross amount, withholding elections, and the overtime deduction do. On ${usdWhole(COMPARE_SALARY)} gross (salary or a 40-hour hourly week), a single filer using the ${TAX_DATA.taxYear} standard deduction of ${usd(STANDARD_DEDUCTIONS.single)} owes federal income tax on ${usdWhole(COMPARE_SALARY - STANDARD_DEDUCTIONS.single)} of taxable income, plus employee Social Security (${(SOCIAL_SECURITY_EMPLOYEE_RATE * 100).toFixed(1)}% up to ${usd(SOCIAL_SECURITY_WAGE_BASE)}) and Medicare (${(MEDICARE_EMPLOYEE_RATE * 100).toFixed(2)}% on all wages). Estimated annual take-home is about ${usdWhole(salaryTakeHome)} (${usd0(salaryTakeHome / 12)}/month) with no state tax.`}
          </p>
          <p>
            {`Overtime lifts gross, and with it FICA and the federal brackets. At 45 hours on ${usd2(COMPARE_HOURLY)}, gross of ${usdWhole(hours45Gross)} leaves roughly ${usdWhole(hours45TakeHome)} (${usd0(hours45TakeHome / 12)}/month), about ${usdWhole(hours45TakeHome - salaryTakeHome)} more than the ${usdWhole(COMPARE_SALARY)} salary path in this no-state example. That gap funds debt payments or savings goals: our `}
            <Link href="/guides/save-50000-in-3-years" className="text-brand-600 hover:text-brand-800 font-medium">
              save $50,000 in 3 years guide
            </Link>
            {` shows how an extra ${usd0((hours45TakeHome - salaryTakeHome) / 12)} a month changes a plan, but only if the overtime stays on the paycheck instead of fading after onboarding.`}
          </p>
          <p>
            <strong>The overtime deduction.</strong>
            {` For tax years 2025 through 2028, the IRS lets overtime earners deduct the premium part of FLSA overtime (the "half" in time-and-a-half) up to ${usdWhole(OVERTIME_DEDUCTION_CAP)} a year, or $25,000 on a joint return, phasing out above $150,000 of modified adjusted gross income ($300,000 joint). It applies whether you itemize or take the standard deduction, it does not reduce Social Security or Medicare tax, and your employer must report the amount on your W-2. In the 45-hour example the premium is ${usdWhole(hours45Premium)}, which cuts federal tax by about ${usdWhole(overtimeDeductionSavings45)} and is already included in the ${usdWhole(hours45TakeHome)} above. Exempt salaried workers get no overtime pay and therefore no deduction.`}
          </p>
          <Sources
            items={[
              TAX_SOURCES.federalRates,
              TAX_SOURCES.ssaWageBase,
              {
                label: "IRS: What to know about the No Tax on Overtime deduction",
                href: "https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction",
              },
              {
                label: "IRS: Questions and answers about the deduction for qualified overtime compensation",
                href: "https://www.irs.gov/newsroom/questions-and-answers-about-the-new-deduction-for-qualified-overtime-compensation",
              },
            ]}
            checked={TAX_DATA.checkedOnLabel}
            note="Federal tax figures come from CalcWise tax data (single filer, standard deduction, FICA); state and local income tax are not included. The overtime deduction is modeled only for incomes below the phase-out."
          />

          <h2>Salary Culture vs Hourly Reality on the Job</h2>
          <p>
            {`Salaried schedules often absorb extra meetings without extra pay; hourly rosters may restrict overtime but pay when schedules run long. A ${usdWhole(COMPARE_SALARY)} coordinator logging 48-hour weeks during a systems rollout works at an effective ${usd2(effectiveHourlyRate(COMPARE_SALARY, 48))}, well below the ${usd2(nominalEquivCompare)} they thought they negotiated. The same person hourly at ${usd2(COMPARE_HOURLY)} would gross ${usdWhole(grossHourlyAnnual(COMPARE_HOURLY, 48))} if every hour beyond 40 is paid at time-and-a-half.`}
          </p>
          <p>
            {`Union contracts and public-sector jobs sometimes blend formats: a salaried base plus overtime premiums, or hourly pay with guaranteed hours. When in doubt, ask for the written compensation policy and the FLSA classification before you sign. DOL enforcement uses the ${usdWhole(FLSA_EXEMPT_MIN_WEEKLY)}-per-week test and the actual duties, not the job title on the offer letter.`}
          </p>
          <p>
            {`For reverse conversions that start from an hourly quote, use the `}
            <Link href="/calculators/hourly-to-salary" className="text-brand-600 hover:text-brand-800 font-medium">
              Hourly to Salary Calculator
            </Link>
            {` to see annualized pay at your expected overtime and compare it against salaried benefit packages before you negotiate.`}
          </p>
        </section>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Numbers</p>
          <p className="mt-1 text-sm text-ink-600">
            Convert offers, estimate take-home, and see whether your necessities fit the 50/30/20 split.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/salary-to-hourly"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Salary to Hourly Calculator
            </Link>
            <Link
              href="/calculators/hourly-to-salary"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Hourly to Salary Calculator
            </Link>
            <Link
              href="/calculators/paycheck"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Paycheck Calculator
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
          <Sources
            items={[WAGE_BENCHMARK_SOURCES.blsEmpsitSep2026, WAGE_BENCHMARK_SOURCES.blsOewsMay2025]}
            checked="November 2026"
            note="Average hourly earnings are a preliminary monthly estimate for all private employees; the OEWS median covers all occupations."
          />
        </section>

        <RelatedGuides
          currentSlug={slug}
          relatedSlugs={["50-30-20-budget-rule", "self-employment-tax-guide", "save-50000-in-3-years"]}
        />
      </article>
    </>
  );
}
