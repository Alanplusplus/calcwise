import type { Metadata } from "next";
import { AuthorByline } from "@/components/AuthorByline";
import Image from "next/image";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import { FREELANCE_ASSUMPTIONS as A, HEALTH, HOURS, freelanceRequirement, freelanceYear } from "@/lib/freelance-rate";
import { REPORT as SE_REPORT, REPORT_SOURCES as SE_SOURCES, US_RESULT as SE_US, pct1, usd0 } from "@/lib/reports/self-employment-by-state";
import { site } from "@/lib/site";
import {
  ESTIMATED_TAX_DUE_DATES_2026,
  MEDICARE_SELF_EMPLOYED_RATE,
  QBI_THRESHOLDS,
  RETIREMENT_LIMITS,
  SE_EARNINGS_FACTOR,
  SOCIAL_SECURITY_EMPLOYEE_RATE,
  MEDICARE_EMPLOYEE_RATE,
  SOCIAL_SECURITY_SELF_EMPLOYED_RATE,
  SOCIAL_SECURITY_WAGE_BASE,
  TAX_DATA,
  TAX_SOURCES,
} from "@/lib/tax-data";
import {
  ECEC_BENEFITS_SHARE_FULLTIME_PRIVATE_PCT,
  ECEC_FULLTIME_PRIVATE_JUN_2026,
  STANDARD_PAID_HOURS_PER_YEAR,
  WAGE_BENCHMARK_SOURCES,
  usd2,
  usdWhole,
} from "@/lib/wage-data";

const slug = "how-much-should-a-freelancer-charge";
const h1 = "How Much Should a Freelancer Charge? The Hourly Rate That Matches a $90,000 Salary";
const metadataTitle = "Freelance Hourly Rate to Match a $90,000 Salary (2026)";
const datePublished = "2026-11-23";
const dateModified = "2026-11-23";

const SALARY = 90_000;
/** The rate a client might offer when it is close to the salary's hourly equivalent. */
const LOW_RATE = 45;
/** The rate Priya quotes after running the numbers. */
const QUOTE_RATE = 90;

const r = freelanceRequirement(SALARY);
const w2 = r.w2;
const base = HOURS.base;
const weeklyHours = base / HOURS.weeks;
const hourlyMultiple = r.hourly / w2.hourly;
const hoursMultiple = STANDARD_PAID_HOURS_PER_YEAR / base;
const revenueGap = r.revenue - SALARY;
const healthGap = HEALTH.totalPremium - HEALTH.workerShare;

const low = freelanceYear(LOW_RATE * base, w2.employerMatch);
const lowShortfall = w2.cash - low.cash;
const quote = freelanceYear(QUOTE_RATE * base, w2.employerMatch);
const quoteEdge = quote.cash - w2.cash;
const [uLow, , uHigh] = A.utilizationScenarios;
const quoteLowUtil = freelanceYear(QUOTE_RATE * HOURS.billableAt(uLow), w2.employerMatch);
const quoteHighUtil = freelanceYear(QUOTE_RATE * HOURS.billableAt(uHigh), w2.employerMatch);
const quoteBaseVsLowUtil = quote.cash - quoteLowUtil.cash;

const utilRows = A.utilizationScenarios.map((u) => {
  const hours = HOURS.billableAt(u);
  return { u, hours, perWeek: hours / HOURS.weeks, rate: r.revenue / hours };
});

const salaryRows = [60_000, 75_000, 90_000, 120_000, 150_000].map((s) => freelanceRequirement(s));

const hourlyMultipleAt = (row: (typeof salaryRows)[number]) => row.hourly / row.w2.hourly;
const payrollGap = r.seTax - w2.fica;
const incomeTaxGap = w2.federal - r.federal;
const seCombinedPct = (SOCIAL_SECURITY_SELF_EMPLOYED_RATE + MEDICARE_SELF_EMPLOYED_RATE) * 100;
const seCombinedLabel = seCombinedPct.toFixed(1);
const seFactorLabel = (SE_EARNINGS_FACTOR * 100).toFixed(2);
const seTaxRatePct = SE_EARNINGS_FACTOR * seCombinedPct;
const employeeFicaPct = (SOCIAL_SECURITY_EMPLOYEE_RATE + MEDICARE_EMPLOYEE_RATE) * 100;
const quarterlySetAside = (r.seTax + r.federal) / 4;
const meanSe = SE_US.seMean.value;
const profitVsMean = r.profit / meanSe;
const seWorkerPct = SE_US.seWorkerShare.pct;
const ecec = ECEC_FULLTIME_PRIVATE_JUN_2026;
const eceBenefitsPct = ECEC_BENEFITS_SHARE_FULLTIME_PRIVATE_PCT;
const estDates = ESTIMATED_TAX_DUE_DATES_2026.map((d) => d.replace(", 2026", ""));
const estDatesLabel = `${estDates.slice(0, -1).join(", ")}, and ${estDates[estDates.length - 1]}`;

const description = `How much should a freelancer charge? Matching a ${usdWhole(SALARY)} salary takes ${usdWhole(r.revenue)} in revenue, or ${usd2(r.hourly)} an hour at ${base.toLocaleString("en-US")} billable hours. See the 2026 math.`;

const IRS_QBI = {
  label: "IRS Qualified Business Income Deduction",
  href: "https://www.irs.gov/newsroom/qualified-business-income-deduction",
};
const IRS_FORM_7206 = {
  label: "IRS About Form 7206, Self-Employed Health Insurance Deduction",
  href: "https://www.irs.gov/forms-pubs/about-form-7206",
};

export const metadata: Metadata = {
  title: metadataTitle,
  description,
  keywords: [
    "how much should a freelancer charge",
    "freelance hourly rate calculator",
    "freelance rate to match salary",
    "salary to freelance rate",
    "how to set freelance rates",
    "freelance vs employee pay",
  ],
  openGraph: {
    title: `${metadataTitle} | ${site.name}`,
    description,
    type: "article",
    publishedTime: datePublished,
    modifiedTime: dateModified,
  },
};

const faqs = [
  {
    question: "How much should a freelancer charge per hour?",
    answer: `Enough that the year ends with the same spendable cash, health insurance, and retirement saving as the job it replaces. To match a ${usdWhole(SALARY)} salary, a freelancer in this guide's model needs ${usdWhole(r.revenue)} of revenue, which is ${usd2(r.hourly)} an hour over ${base.toLocaleString("en-US")} billable hours a year. That is ${hourlyMultiple.toFixed(1)} times the ${usd2(w2.hourly)} the salary pays per paid hour. The multiple falls as the salary rises, from ${hourlyMultipleAt(salaryRows[0]).toFixed(1)} at a ${usdWhole(salaryRows[0].w2.salary)} salary to ${hourlyMultipleAt(salaryRows[4]).toFixed(1)} at ${usdWhole(salaryRows[4].w2.salary)}, so "about double your salary's hourly equivalent" is a safe starting point for a single filer.`,
  },
  {
    question: "Why is a freelance rate about double the hourly pay of a salary?",
    answer: `Two multipliers stack. The revenue multiple is ${r.multiple.toFixed(2)} (${usdWhole(r.revenue)} against ${usdWhole(SALARY)}) because the freelancer pays ${usdWhole(r.seTax)} of self-employment tax against ${usdWhole(w2.fica)} of employee payroll tax, buys the whole ${usdWhole(HEALTH.totalPremium)} health premium, funds a ${usdWhole(w2.employerMatch)} retirement contribution, and covers ${usdWhole(A.businessExpenses)} of business costs. The hours multiple is ${hoursMultiple.toFixed(2)} because a job pays for ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} hours and a freelancer bills only ${base.toLocaleString("en-US")}. ${r.multiple.toFixed(2)} × ${hoursMultiple.toFixed(2)} = ${hourlyMultiple.toFixed(2)}.`,
  },
  {
    question: "How much of freelance income should I set aside for taxes?",
    answer: `At the ${usdWhole(r.profit)} profit this model needs, federal self-employment tax and income tax together take ${pct1(r.taxShareOfProfit)} of profit (${usdWhole(r.seTax)} and ${usdWhole(r.federal)}), before any state tax. Self-employment tax alone is ${seTaxRatePct.toFixed(2)}% of net profit (${seCombinedLabel}% applied to ${seFactorLabel}% of profit), so even a freelancer with no income tax owes it from the first dollar of profit. Moving a quarter of the combined bill, about ${usdWhole(quarterlySetAside)}, into a separate account before each estimated payment date keeps the bill from landing all at once. The 2026 federal dates were ${estDatesLabel}.`,
  },
  {
    question: "How many hours a year can a freelancer actually bill?",
    answer: `Less than most people assume. A full-time job pays for ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} hours a year. Taking ${A.vacationDays} vacation days, ${A.holidays} holidays, and ${A.sickDays} sick days (${HOURS.offDays} days, ${HOURS.off} hours) leaves ${HOURS.available.toLocaleString("en-US")} hours, or ${HOURS.weeks.toFixed(0)} weeks. Selling, invoicing, and bookkeeping take part of that time, so this guide assumes ${A.baseUtilizationPct}% is billable, ${base.toLocaleString("en-US")} hours, or ${weeklyHours.toFixed(0)} hours a week. A freelancer who bills ${uLow}% instead needs ${usd2(utilRows[0].rate)} an hour for the same result; one who bills ${uHigh}% needs ${usd2(utilRows[2].rate)}.`,
  },
  {
    question: "Should I charge hourly, daily, or per project?",
    answer: `All three come from the same required revenue, so the choice is about risk, not math. The ${usdWhole(r.revenue)} target works out to ${usd2(r.hourly)} an hour, ${usdWhole(r.hourly * A.hoursPerDay)} for an ${A.hoursPerDay}-hour day, or ${usdWhole(r.revenue / 12)} a month. Hourly pricing protects you when scope grows, but it caps your income at your billable hours. A project price rewards speed, as long as it is built from estimated hours times your rate plus a buffer for revisions; pricing a project at ${usdWhole(LOW_RATE)} an hour, close to the ${usd2(w2.hourly)} salary hourly equivalent, leaves you ${usdWhole(lowShortfall)} short over a year at ${usdWhole(LOW_RATE * base)} of revenue.`,
  },
];

const tdClass = "px-4 py-3 text-ink-800";
const tdRight = "px-4 py-3 text-right text-ink-800";
const thClass = "px-4 py-3 text-left font-semibold text-ink-700";
const thRight = "px-4 py-3 text-right font-semibold text-ink-700";
const linkClass = "text-brand-600 hover:text-brand-800 font-medium";

export default function HowMuchShouldAFreelancerChargeGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified}
        image="/images/guides/how-much-should-a-freelancer-charge.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "How Much Should a Freelancer Charge?", href: `/guides/${slug}` },
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
            {`You earn ${usdWhole(SALARY)} a year, and a client offers freelance work at ${usdWhole(LOW_RATE)} an hour, close to what your salary pays per paid hour (${usd2(w2.hourly)}). It sounds like a fair swap, and it is not: at ${usdWhole(LOW_RATE)} an hour and ${base.toLocaleString("en-US")} billable hours you would keep ${usdWhole(low.cash)} after tax, health insurance, and retirement saving, while the salary leaves ${usdWhole(w2.cash)}. So how much should a freelancer charge? For this job, about ${usd2(r.hourly)} an hour, or ${usdWhole(r.revenue)} of revenue a year. This guide shows where each dollar of that gap comes from, using 2026 federal tax rules, KFF health premiums, and BLS benefit costs, then walks through a case study and checks the target against what self-employed households earn in Census data.`}
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: November 2026</p>
          <AuthorByline />
        </header>

        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">TL;DR</p>
          <p className="mt-1 text-ink-700">
            {`To match a ${usdWhole(SALARY)} salary, a freelancer needs about ${usdWhole(r.revenue)} of revenue (${r.multiple.toFixed(2)} times the salary) and ${usd2(r.hourly)} an hour at ${base.toLocaleString("en-US")} billable hours (${hourlyMultiple.toFixed(1)} times the salary's ${usd2(w2.hourly)} per paid hour). The extra revenue pays ${usdWhole(r.seTax)} of self-employment tax (an employee pays ${usdWhole(w2.fica)} of payroll tax), the full ${usdWhole(HEALTH.totalPremium)} health premium, a ${usdWhole(w2.employerMatch)} retirement contribution, and ${usdWhole(A.businessExpenses)} of business costs. The higher hourly multiple comes from time: a job pays for ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} hours and a freelancer bills ${base.toLocaleString("en-US")}.`}
          </p>
        </div>

        <figure className="mt-10">
          <Image
            src="/images/guides/how-much-should-a-freelancer-charge.webp"
            alt={`Infographic comparing a ${usdWhole(SALARY)} employee with a freelancer who has the same ${usdWhole(w2.cash)} of spendable cash: the freelancer needs ${usdWhole(r.revenue)} of revenue after ${usdWhole(r.seTax)} self-employment tax and ${usdWhole(HEALTH.totalPremium)} health premium, an hourly rate of ${usd2(r.hourly)} at ${base.toLocaleString("en-US")} billable hours`}
            width={1200}
            height={795}
            className="rounded-lg border border-ink-200"
          />
          <figcaption className="mt-2 text-center text-sm text-ink-500">
            {`Employee and freelancer with the same ${usdWhole(w2.cash)} of spendable cash (${TAX_DATA.taxYear} federal rules, single filer, no state tax)`}
          </figcaption>
        </figure>

        <section className="prose mt-10 max-w-none">
          <h2>Why Salary Divided by 2,080 Is the Wrong Freelance Rate</h2>
          <p>
            {`The common shortcut is to divide a salary by ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} (40 hours times 52 weeks) and call that the hourly rate. For ${usdWhole(SALARY)} that gives ${usd2(w2.hourly)}. It treats a salary and a freelance invoice as the same kind of money, and they differ in three ways.`}
          </p>
          <ul>
            <li>
              <strong>The tax gap.</strong>
              {` An employee pays ${employeeFicaPct.toFixed(2)}% of wages in Social Security and Medicare tax, and the employer pays another ${employeeFicaPct.toFixed(2)}%. A freelancer pays both halves: ${seCombinedLabel}% applied to ${seFactorLabel}% of net profit, which is ${seTaxRatePct.toFixed(2)}% of profit. On the profit this model needs, that is ${usdWhole(r.seTax)}, against ${usdWhole(w2.fica)} for the employee, a gap of ${usdWhole(payrollGap)} a year.`}
            </li>
            <li>
              <strong>The benefit gap.</strong>
              {` BLS data for June 2026 show private employers spending ${usd2(ecec.benefitsPerHour)} an hour on benefits for full-time workers on top of ${usd2(ecec.wagesPerHour)} an hour in wages, which is ${eceBenefitsPct}% of total compensation. Paid leave is ${ecec.paidLeavePct}% of compensation and legally required benefits, which include employer payroll tax, are ${ecec.legallyRequiredPct}%. A freelancer buys all of these out of revenue. Health insurance is the largest single item: the KFF 2026 survey puts the average single premium at ${usdWhole(HEALTH.totalPremium)}, of which the employer pays ${usdWhole(HEALTH.employerShare)} and the worker ${usdWhole(HEALTH.workerShare)}.`}
            </li>
            <li>
              <strong>The time gap.</strong>
              {` A salary pays for paid holidays, vacation, and sick days, and it pays for hours spent in meetings and on admin. A freelancer is paid only for hours a client agreed to buy. Sales calls, proposals, invoicing, and chasing late payments are unpaid. At ${A.baseUtilizationPct}% billable time, ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} paid hours of a job turn into ${base.toLocaleString("en-US")} sellable hours.`}
            </li>
          </ul>

          <h2>How Much Should a Freelancer Charge? The Formula</h2>
          <p>
            {`Work backward from the cash you want to keep. The employee's spendable cash is the salary minus their share of the health premium, federal income tax, and payroll tax. The freelancer needs the same cash after paying every cost the employer used to cover.`}
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-base font-semibold text-ink-900">
            Rate = (Profit + Business expenses) ÷ Billable hours
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-sm font-semibold text-ink-900">
            Profit = Target cash + SE tax + Income tax + Health premium + Retirement contribution
          </p>
          <ul>
            <li>
              <strong>Target cash</strong>
              {` is what the salary leaves you after tax and the worker's health premium share: ${usdWhole(w2.cash)} here.`}
            </li>
            <li>
              <strong>SE tax</strong>
              {` is ${seTaxRatePct.toFixed(2)}% of profit while net earnings are under the ${usdWhole(SOCIAL_SECURITY_WAGE_BASE)} Social Security wage base, with half of it deductible when computing income tax.`}
            </li>
            <li>
              <strong>Income tax</strong>
              {` is computed on profit minus half of SE tax, the health premium, and the retirement contribution, minus the standard deduction, and then reduced by the 20% qualified business income deduction.`}
            </li>
            <li>
              <strong>Health premium and retirement contribution</strong>
              {` replace what the employer paid: ${usdWhole(HEALTH.totalPremium)} and a ${A.employerMatchPct}% match worth ${usdWhole(w2.employerMatch)}.`}
            </li>
            <li>
              <strong>Billable hours</strong>
              {` are the hours you can sell, which the hours table below builds.`}
            </li>
          </ul>
          <p>
            {`Profit and income tax depend on each other, so the answer comes from solving them together rather than adding fixed percentages. The model behind this guide does that for a single filer using the ${TAX_DATA.taxYear} brackets and a ${usdWhole(A.businessExpenses)} business-cost assumption. State income tax is left out on both sides; our `}
            <Link href="/calculators/self-employment-tax" className={linkClass}>
              Self-Employment Tax Calculator
            </Link>
            {` and `}
            <Link href="/calculators/income-tax" className={linkClass}>
              Income Tax Calculator
            </Link>
            {` let you rerun the tax parts with your own profit.`}
          </p>

          <h2>Count the Hours You Can Actually Bill</h2>
          <p>
            {`Start from the ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} hours a full-time job pays for, remove the days off a paycheck would have covered, and then remove the unbillable share.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Step</th>
                  <th className={thRight}>Hours a year</th>
                  <th className={thClass}>How it is built</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Paid hours of a full-time job</td>
                  <td className={tdRight}>{HOURS.paid.toLocaleString("en-US")}</td>
                  <td className={tdClass}>40 hours × 52 weeks</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Days off</td>
                  <td className={tdRight}>{`-${HOURS.off}`}</td>
                  <td className={tdClass}>{`${A.vacationDays} vacation + ${A.holidays} holidays + ${A.sickDays} sick days = ${HOURS.offDays} days × ${A.hoursPerDay} hours`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Hours available to work</td>
                  <td className={tdRight}>{HOURS.available.toLocaleString("en-US")}</td>
                  <td className={tdClass}>{`${HOURS.weeks.toFixed(0)} working weeks of 40 hours`}</td>
                </tr>
                <tr className="border-b border-ink-100 bg-ink-50/50">
                  <td className={tdClass}>{`Billable hours at ${A.baseUtilizationPct}%`}</td>
                  <td className={tdRight}>{base.toLocaleString("en-US")}</td>
                  <td className={tdClass}>{`About ${weeklyHours.toFixed(0)} billed hours a week; the rest is sales, admin, and bookkeeping`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {`These are planning assumptions, not statistics, and your own numbers will differ. The point is the size of the drop: ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} paid hours become ${base.toLocaleString("en-US")} sellable ones, a factor of ${hoursMultiple.toFixed(2)}, before a single dollar of tax or insurance is counted.`}
          </p>

          <h2>Match the Employee's Spendable Cash</h2>
          <p>
            {`The table lines up a ${usdWhole(SALARY)} employee against a freelancer billing ${usdWhole(r.revenue)}. Both end the year with ${usdWhole(w2.cash)} to spend, and the freelancer is also paying for the insurance and retirement saving the employer provided.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Line</th>
                  <th className={thRight}>Employee</th>
                  <th className={thRight}>Freelancer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Salary or revenue</td>
                  <td className={tdRight}>{usdWhole(SALARY)}</td>
                  <td className={tdRight}>{usdWhole(r.revenue)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Business expenses</td>
                  <td className={tdRight}>$0</td>
                  <td className={tdRight}>{`-${usdWhole(r.expenses)}`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Health premium (your share)</td>
                  <td className={tdRight}>{`-${usdWhole(HEALTH.workerShare)}`}</td>
                  <td className={tdRight}>{`-${usdWhole(HEALTH.totalPremium)}`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Retirement contribution</td>
                  <td className={tdRight}>{`$0 (employer adds ${usdWhole(w2.employerMatch)})`}</td>
                  <td className={tdRight}>{`-${usdWhole(r.retirement)}`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Payroll tax or self-employment tax</td>
                  <td className={tdRight}>{`-${usdWhole(w2.fica)}`}</td>
                  <td className={tdRight}>{`-${usdWhole(r.seTax)}`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Federal income tax</td>
                  <td className={tdRight}>{`-${usdWhole(w2.federal)}`}</td>
                  <td className={tdRight}>{`-${usdWhole(r.federal)}`}</td>
                </tr>
                <tr className="border-b border-ink-100 bg-ink-50/50 font-semibold">
                  <td className={tdClass}>Spendable cash</td>
                  <td className={tdRight}>{usdWhole(w2.cash)}</td>
                  <td className={tdRight}>{usdWhole(r.cash)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Pay per hour</td>
                  <td className={tdRight}>{`${usd2(w2.hourly)} per paid hour`}</td>
                  <td className={tdRight}>{`${usd2(r.hourly)} per billable hour`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {`Notice the one line that moves in the freelancer's favor: federal income tax is ${usdWhole(incomeTaxGap)} lower than the employee's despite ${usdWhole(r.revenue - SALARY)} more revenue. Four deductions explain it. Half of self-employment tax (${usdWhole(r.seTaxDeduction)}) and the full health premium (${usdWhole(r.health)}) come off profit under the `}
            <a href={IRS_FORM_7206.href} className={linkClass} target="_blank" rel="noopener noreferrer">
              self-employed health insurance deduction
            </a>
            {` rules (generally for people not eligible for an employer-subsidized plan), the solo 401(k) contribution (${usdWhole(r.retirement)}) comes off too, and the `}
            <a href={IRS_QBI.href} className={linkClass} target="_blank" rel="noopener noreferrer">
              qualified business income deduction
            </a>
            {` removes ${usdWhole(r.qbi)}, which is 20% of qualified business income. Taxable income is under the ${usdWhole(QBI_THRESHOLDS.single)} single-filer threshold, so the wage and property limits that apply above it are not in play. The ${usdWhole(revenueGap)} revenue gap breaks down as ${usdWhole(r.expenses)} of business costs, ${usdWhole(healthGap)} more for health insurance, ${usdWhole(r.retirement)} of retirement saving, and ${usdWhole(payrollGap)} more payroll-type tax, minus the ${usdWhole(incomeTaxGap)} income-tax saving.`}
          </p>

          <h2>How Much Should a Freelancer Charge at Other Salaries?</h2>
          <p>
            {`The same model works for any target salary. The table finds the revenue that leaves a freelancer with the same cash as the employee, and the hourly rate at ${base.toLocaleString("en-US")} billable hours.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Salary to match</th>
                  <th className={thRight}>Employee cash</th>
                  <th className={thRight}>Revenue needed</th>
                  <th className={thRight}>Revenue ÷ salary</th>
                  <th className={thRight}>Hourly rate</th>
                  <th className={thRight}>Salary ÷ 2,080</th>
                </tr>
              </thead>
              <tbody>
                {salaryRows.map((row) => (
                  <tr key={row.w2.salary} className={`border-b border-ink-100 ${row.w2.salary === SALARY ? "bg-ink-50/50 font-semibold" : ""}`}>
                    <td className={tdClass}>{usdWhole(row.w2.salary)}</td>
                    <td className={tdRight}>{usdWhole(row.w2.cash)}</td>
                    <td className={tdRight}>{usdWhole(row.revenue)}</td>
                    <td className={tdRight}>{`${row.multiple.toFixed(2)}×`}</td>
                    <td className={tdRight}>{usd2(row.hourly)}</td>
                    <td className={tdRight}>{usd2(row.w2.hourly)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`The revenue multiple shrinks from ${salaryRows[0].multiple.toFixed(2)} at ${usdWhole(salaryRows[0].w2.salary)} to ${salaryRows[4].multiple.toFixed(2)} at ${usdWhole(salaryRows[4].w2.salary)} because the ${usdWhole(HEALTH.totalPremium)} premium and ${usdWhole(A.businessExpenses)} of business costs are fixed amounts that weigh less on a larger income. The hourly multiple stays between ${hourlyMultipleAt(salaryRows[4]).toFixed(1)} and ${hourlyMultipleAt(salaryRows[0]).toFixed(1)} across this range, which is why the "about double" rule works for a single filer. Our `}
            <Link href="/calculators/salary-to-hourly" className={linkClass}>
              Salary to Hourly Calculator
            </Link>
            {` fills the salary ÷ 2,080 column for any salary; this guide explains why the rate column runs about twice as high, and the `}
            <Link href="/guides/salary-vs-hourly-pay" className={linkClass}>
              salary vs hourly pay guide
            </Link>
            {` covers the employee side of that comparison in more depth.`}
          </p>

          <h2>How Billable Time Changes the Rate</h2>
          <p>
            {`Utilization is the assumption that moves the hourly rate the most, because it sets the denominator. The required revenue is fixed at ${usdWhole(r.revenue)}; only the hours change.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Billable share of available time</th>
                  <th className={thRight}>Billable hours a year</th>
                  <th className={thRight}>Per week</th>
                  <th className={thRight}>Rate needed</th>
                </tr>
              </thead>
              <tbody>
                {utilRows.map((row) => (
                  <tr key={row.u} className={`border-b border-ink-100 ${row.u === A.baseUtilizationPct ? "bg-ink-50/50 font-semibold" : ""}`}>
                    <td className={tdClass}>{`${row.u}%`}</td>
                    <td className={tdRight}>{row.hours.toLocaleString("en-US")}</td>
                    <td className={tdRight}>{row.perWeek.toFixed(0)}</td>
                    <td className={tdRight}>{usd2(row.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`A new freelancer with a thin client list will sit near the ${uLow}% row, and the rate needed there is ${usd2(utilRows[0].rate - utilRows[1].rate)} an hour higher than at ${A.baseUtilizationPct}%. An established freelancer with a full book of repeat clients can reach ${uHigh}% and charge ${usd2(utilRows[1].rate - utilRows[2].rate)} less for the same income. If you cannot raise the rate, the other lever is the hours: each extra billed hour a week adds about ${usdWhole(r.hourly * HOURS.weeks)} of revenue a year at the target rate.`}
          </p>

          <h2>Case Study: Priya, a UX Designer in Austin</h2>
          <p>
            {`Priya is 31, single, and a UX designer in Austin, Texas, which has no state income tax on wages or self-employment income. She earns ${usdWhole(SALARY)} with employer health coverage and a ${A.employerMatchPct}% 401(k) match. A former colleague offers contract work at ${usdWhole(LOW_RATE)} an hour, and Priya's first instinct is that this is about what she makes now (${usd2(w2.hourly)}).`}
          </p>
          <p>
            <strong>Pricing at the salary's hourly equivalent.</strong>
            {` Priya expects ${weeklyHours.toFixed(0)} billable hours a week over ${HOURS.weeks.toFixed(0)} weeks, or ${base.toLocaleString("en-US")} hours. At ${usdWhole(LOW_RATE)} an hour that is ${usdWhole(low.revenue)} of revenue. After ${usdWhole(A.businessExpenses)} of business costs, profit is ${usdWhole(low.profit)}. Self-employment tax takes ${usdWhole(low.seTax)}, income tax takes ${usdWhole(low.federal)}, her own health plan costs ${usdWhole(low.health)}, and a ${usdWhole(low.retirement)} solo 401(k) contribution matches what her employer gave her. She keeps ${usdWhole(low.cash)}, which is ${usdWhole(lowShortfall)} less than the ${usdWhole(w2.cash)} her salary leaves.`}
          </p>
          <p>
            <strong>Pricing from the target.</strong>
            {` Priya runs the model backward and finds she needs ${usd2(r.hourly)} an hour. She rounds up and quotes ${usdWhole(QUOTE_RATE)}, or ${usdWhole(QUOTE_RATE * A.hoursPerDay)} for an ${A.hoursPerDay}-hour day. At ${base.toLocaleString("en-US")} billed hours that is ${usdWhole(quote.revenue)} of revenue and ${usdWhole(quote.cash)} of spendable cash, ${usdWhole(quoteEdge)} above her salary's cash with the same insurance and retirement saving.`}
          </p>
          <p>
            <strong>Stress test.</strong>
            {` At ${usdWhole(QUOTE_RATE)} an hour, a slow year with ${uLow}% billable time (${HOURS.billableAt(uLow).toLocaleString("en-US")} hours) brings revenue to ${usdWhole(quoteLowUtil.revenue)} and cash to ${usdWhole(quoteLowUtil.cash)}, which is ${usdWhole(w2.cash - quoteLowUtil.cash)} below the cash her salary leaves. A strong year at ${uHigh}% brings ${usdWhole(quoteHighUtil.cash)} of cash. The ten-point swing in utilization between the base case and the slow year is worth ${usdWhole(quoteBaseVsLowUtil)} of cash, more than the ${usdWhole(quoteEdge)} cushion in the base case. Her decision: quote ${usdWhole(QUOTE_RATE)}, ask the client for a minimum number of hours a month so the slow-year case is less likely, and move a quarter of her ${usdWhole(quote.seTax + quote.federal)} estimated federal tax bill into a separate account each quarter.`}
          </p>

          <h2>Reality Check: What Self-Employed Households Actually Earn</h2>
          <p>
            {`The target profit in this model is ${usdWhole(r.profit)} a year. The Census Bureau's ${SE_REPORT.acsYear} American Community Survey reports that ${pct1(seWorkerPct)} of U.S. workers are self-employed, and that households with self-employment income averaged ${usd0(meanSe)} of it. That average includes part-time and side work, so it is not a fair benchmark for a full-time freelancer, but it shows how high a target of ${usdWhole(r.profit)} sits: ${profitVsMean.toFixed(1)} times the average. Reaching it usually means specialized skills, a steady client base, and a rate set by value rather than by the salary it replaces. The state-by-state figures are in our `}
            <Link href={SE_REPORT.path} className={linkClass}>
              self-employment by state report
            </Link>
            {`.`}
          </p>
          <Sources
            items={[SE_SOURCES.acsHouseholds, SE_SOURCES.acsClass, WAGE_BENCHMARK_SOURCES.blsEcecJun2026, WAGE_BENCHMARK_SOURCES.kff2026]}
            checked="November 2026"
            note="Household self-employment income is the mean among households that report any, including side income, so it is not the earnings of full-time freelancers. Census self-employment income is net of business expenses, so compare it with profit, not revenue."
          />

          <h2>How to Set Your Freelance Rate in 7 Steps</h2>
          <ol>
            <li>
              {`Decide the salary you would accept. Use the `}
              <Link href="/calculators/paycheck" className={linkClass}>
                Paycheck Calculator
              </Link>
              {` to find the take-home pay for that salary; that is your target cash (${usdWhole(w2.cash)} for ${usdWhole(SALARY)} in this model).`}
            </li>
            <li>
              {`Count your billable hours. Start from ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")}, subtract ${HOURS.off} hours of days off, and multiply by the share of time you expect to bill (${A.baseUtilizationPct}% gives ${base.toLocaleString("en-US")} hours).`}
            </li>
            <li>
              {`List business costs: software, equipment, insurance, accounting, and a website. This model uses ${usdWhole(A.businessExpenses)}.`}
            </li>
            <li>
              {`Price your own benefits. Get a health quote (the KFF 2026 average single premium is ${usdWhole(HEALTH.totalPremium)}) and choose a retirement contribution. A solo 401(k) allows employee deferrals up to ${usdWhole(RETIREMENT_LIMITS.employeeDeferral)} in 2026, so ${usdWhole(w2.employerMatch)} is well within the limit.`}
            </li>
            <li>
              {`Estimate the tax. Self-employment tax is ${seTaxRatePct.toFixed(2)}% of profit; income tax follows the ${TAX_DATA.taxYear} brackets after the deductions above. The `}
              <Link href="/calculators/self-employment-tax" className={linkClass}>
                Self-Employment Tax Calculator
              </Link>
              {` does the first part and the `}
              <Link href="/calculators/income-tax" className={linkClass}>
                Income Tax Calculator
              </Link>
              {` the second.`}
            </li>
            <li>
              {`Divide required revenue by billable hours to get the hourly rate, then round up. Convert it to a day rate (rate × ${A.hoursPerDay}) and a project price (estimated hours × rate, plus a buffer for revisions).`}
            </li>
            <li>
              {`Set aside tax from every payment and pay quarterly. At this profit, federal tax runs ${pct1(r.taxShareOfProfit)} of profit, about ${usdWhole(quarterlySetAside)} a quarter. The 2026 estimated payment dates were ${estDatesLabel}. Track billed hours monthly and raise your rate when you are consistently above ${uHigh}% booked.`}
            </li>
          </ol>

          <h2>Pricing Mistakes That Cost Freelancers Money</h2>
          <ul>
            <li>
              {`Quoting the salary's hourly equivalent. In the case study this alone costs ${usdWhole(lowShortfall)} a year.`}
            </li>
            <li>
              {`Assuming every working hour is billable. Dropping from ${A.baseUtilizationPct}% to ${uLow}% at the same rate removes ${usdWhole(quoteBaseVsLowUtil)} of cash in the case study.`}
            </li>
            <li>
              {`Forgetting the second half of payroll tax. The employer used to pay ${usdWhole(w2.fica)} of it for you; now it is part of the ${usdWhole(r.seTax)} you owe.`}
            </li>
            <li>
              {`Leaving out state and local tax. This model is federal only. Texas and Florida levy no income tax on self-employment profit, but most other states take a further share, so add yours before you finalize the rate.`}
            </li>
            <li>
              {`Giving away unpaid revisions. If a fixed-fee project runs over its estimated hours, the effective rate falls below the one you quoted, so write the number of revision rounds into the contract.`}
            </li>
          </ul>
        </section>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Freelance Numbers</p>
          <p className="mt-1 text-sm text-ink-600">
            Estimate self-employment tax on your profit, convert a salary to an hourly equivalent, and check your income tax.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/self-employment-tax"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Self-Employment Tax Calculator
            </Link>
            <Link
              href="/calculators/salary-to-hourly"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Salary to Hourly Calculator
            </Link>
            <Link
              href="/calculators/income-tax"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Income Tax Calculator
            </Link>
          </div>
        </div>

        <section className="prose mt-8 max-w-none">
          <Sources
            items={[
              TAX_SOURCES.selfEmploymentTax,
              TAX_SOURCES.revProc,
              IRS_QBI,
              IRS_FORM_7206,
              TAX_SOURCES.soloK,
              TAX_SOURCES.retirementLimits,
              TAX_SOURCES.ssaWageBase,
              TAX_SOURCES.estimatedTaxForm,
              WAGE_BENCHMARK_SOURCES.kff2026,
              WAGE_BENCHMARK_SOURCES.blsEcecJun2026,
            ]}
            checked={TAX_DATA.checkedOnLabel}
            note="Federal tax only, single filer, tax year 2026. Billable hours, business expenses, and the 4% retirement contribution are planning assumptions, not statistics. The KFF premium is a national average; your quote will differ."
          />
        </section>

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
          relatedSlugs={["self-employment-tax-guide", "salary-vs-hourly-pay", "break-even-analysis-guide"]}
        />
      </article>
    </>
  );
}
