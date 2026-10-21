import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import { SOCIAL_SECURITY_WAGE_BASE, usd } from "@/lib/tax-data";
import {
  BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026,
  BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026,
  DENVER_MIN_WAGE_2026,
  ECEC_BENEFITS_SHARE_FULLTIME_PRIVATE_PCT,
  FEDERAL_MINIMUM_WAGE,
  FLSA_EXEMPT_MIN_ANNUAL,
  FLSA_EXEMPT_MIN_WEEKLY,
  KFF_EMPLOYER_SHARE_SINGLE_2025,
  KFF_SINGLE_PREMIUM_2025,
  OEWS_MEDIAN_HOURLY_MAY_2025,
  STANDARD_PAID_HOURS_PER_YEAR,
  WAGE_BENCHMARK_SOURCES,
  annualFromHourly,
  hourlyFromAnnual,
  usd2,
  usdWhole,
} from "@/lib/wage-data";

const oewsMedianAnnual = annualFromHourly(OEWS_MEDIAN_HOURLY_MAY_2025);
const blsMedianAnnualAt40 = BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026 * 52;
const blsAverageAnnualAt2080 = annualFromHourly(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026);

export function SalaryToHourlyArticle() {
  return (
    <article className="prose prose-ink max-w-none">
      <h2>Salary to Hourly: How to Calculate Your True Hourly Rate</h2>

      <Image
        src="/images/salary-to-hourly-infographic.webp"
        alt="Salary to hourly rate conversion infographic showing how a $65,000 annual salary breaks down into monthly, biweekly, weekly, daily, and hourly pay rates"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <p>
        Knowing your hourly rate is essential for comparing job offers, evaluating freelance opportunities, and making informed decisions about
        your time. Whether you earn a $50,000 salary or a $150,000 salary, converting that annual figure into an hourly rate reveals the real
        value of each working hour. This calculation becomes especially important when you factor in paid time off, taxes, and the actual hours
        you spend at work versus what you are compensated for. Use our{" "}
        <Link href="/calculators/paycheck" className="text-brand-600 hover:text-brand-800 font-medium">Paycheck Calculator</Link>{" "}
        alongside this tool to see exactly what lands in your bank account each pay period.
      </p>

      <h3>How the Salary to Hourly Conversion Works</h3>

      <p>
        The standard salary-to-hourly formula divides your annual salary by the total number of paid hours in a year:
      </p>

      <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-lg font-semibold text-ink-900">
        Hourly Rate = Annual Salary / (Hours per Week x Weeks per Year)
      </p>

      <p>
        For a typical full-time employee working 40 hours per week across 52 weeks, the total is {STANDARD_PAID_HOURS_PER_YEAR.toLocaleString()}{" "}
        paid hours per year. A $65,000 annual salary divided by {STANDARD_PAID_HOURS_PER_YEAR.toLocaleString()} hours equals {usd2(65000 / STANDARD_PAID_HOURS_PER_YEAR)} per hour. This is the gross hourly rate before taxes and deductions. Federal payroll systems use a{" "}
        <strong>2,087-hour</strong> divisor instead of 2,080, so a $65,000 GS salary equates to about {usd2(65000 / 2087)}/hr on government
        pay tables — about 4 cents less per hour than the private-sector convention.
      </p>
      <Sources
        items={[WAGE_BENCHMARK_SOURCES.opm2087]}
        checked="October 2026"
        note="Private employers and BLS wage surveys typically use 40 × 52 = 2,080 paid hours for annual/hourly conversions."
      />

      <p>
        However, this basic formula does not tell the complete story. Most salaried employees receive paid holidays and vacation days, meaning they
        earn the same annual pay while working fewer actual hours. The <strong>effective hourly rate</strong> — which accounts for paid time off —
        is always higher than the standard calculation. With 10 holidays and 15 vacation days (25 total days off), your actual working hours drop
        from 2,080 to 1,880, pushing the effective rate from {usd2(65000 / 2080)} to {usd2(65000 / 1880)} per hour on a $65,000 salary.
      </p>

      <h3>How Your Rate Compares to National Wage Benchmarks</h3>

      <p>
        Context helps when you negotiate. In September 2026, BLS average hourly earnings for all private employees were {usd2(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026)} — about{" "}
        {usdWhole(blsAverageAnnualAt2080)} at 2,080 paid hours. The May 2025 Occupational Employment and Wage Statistics (OEWS) median for all occupations was{" "}
        {usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}/hr ({usdWhole(oewsMedianAnnual)} annualized at 2,080 hours). Median usual weekly earnings for full-time workers were{" "}
        {usdWhole(BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026)} in the second quarter of 2026 ({usdWhole(blsMedianAnnualAt40)} if paid for 52 weeks at that level). The federal minimum wage remains {usd2(FEDERAL_MINIMUM_WAGE)}/hr, while local floors are higher in many metros — for example {usd2(DENVER_MIN_WAGE_2026)}/hr in Denver in 2026.
      </p>
      <Sources
        items={[
          WAGE_BENCHMARK_SOURCES.blsEmpsitSep2026,
          WAGE_BENCHMARK_SOURCES.blsOewsMay2025,
          WAGE_BENCHMARK_SOURCES.blsWeeklyQ2_2026,
          WAGE_BENCHMARK_SOURCES.federalMinWage,
          WAGE_BENCHMARK_SOURCES.denverMin2026,
        ]}
        checked="October 2026"
      />

      <h3>Key Concepts for Salary Comparisons</h3>

      <p>
        When comparing a salaried position to an hourly job or freelance contract, several factors beyond the base number matter significantly.
        For full-time private-sector workers, BLS employer-cost data show benefits averaging {ECEC_BENEFITS_SHARE_FULLTIME_PRIVATE_PCT}% of total compensation (June 2026), on top of wages and salaries. Employer-sponsored health insurance alone averaged {usdWhole(KFF_SINGLE_PREMIUM_2025)} in total premium for single coverage in 2025 (KFF survey), with employers paying about {usdWhole(KFF_EMPLOYER_SHARE_SINGLE_2025)} of that amount. An hourly worker earning $35 per hour
        with no benefits has a total compensation value of approximately {usdWhole(annualFromHourly(35))} annually — but a salaried employee at $65,000 with a standard
        benefits package may have total compensation exceeding {usdWhole(65000 + KFF_EMPLOYER_SHARE_SINGLE_2025 + 65000 * 0.04)} when health and a 4% 401(k) match are included.
      </p>
      <Sources
        items={[WAGE_BENCHMARK_SOURCES.blsEcecJun2026, WAGE_BENCHMARK_SOURCES.kff2025]}
        checked="October 2026"
        note="KFF 2026 employer survey results were scheduled for release October 22, 2026; figures above are from the 2025 survey."
      />

      <p>
        Tax treatment also differs. Salaried employees have taxes withheld automatically, while freelancers and contractors must pay self-employment
        tax (15.3% on net earnings, with the Social Security part capped at {usd(SOCIAL_SECURITY_WAGE_BASE)} in 2026). This means a freelancer needs to charge roughly $38 to $42 per hour to match
        the take-home pay of a {usd2(65000 / 2080)}/hr salaried position. Budget your take-home pay effectively using our{" "}
        <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">50/30/20 Budget Calculator</Link>{" "}
        to allocate your after-tax income across needs, wants, and savings, or see our{" "}
        <Link href="/guides/self-employment-tax-guide" className="text-brand-600 hover:text-brand-800 font-medium">self-employment tax guide</Link>{" "}
        for contractor withholding.
      </p>

      <p>
        Most salaried “white collar” exemptions from overtime require a salary of at least {usdWhole(FLSA_EXEMPT_MIN_WEEKLY)}/week ({usdWhole(FLSA_EXEMPT_MIN_ANNUAL)}/year) under the Fair Labor Standards Act rules restored in 2026 after the 2024 DOL increases were vacated. Below that threshold, eligible employees must receive overtime at 1.5× for hours over 40 in a workweek even if they are paid on a salary basis.
      </p>
      <Sources
        items={[WAGE_BENCHMARK_SOURCES.dolExempt]}
        checked="October 2026"
      />

      <h3>Case Study: Rachel Evaluates Two Job Offers</h3>

      <p>
        Rachel, a 31-year-old graphic designer in Denver, Colorado, received two competing job offers. Offer A was a salaried position at
        $72,000 per year with 12 paid holidays, 20 vacation days, health insurance (employer pays $6,200 toward premium), and a 4% 401(k) match. Offer B was
        a contract role paying $42 per hour with no benefits, no paid time off, and a 1099 arrangement — well above Denver’s {usd2(DENVER_MIN_WAGE_2026)}/hr local minimum wage but without employer-paid insurance.
      </p>

      <p>
        Here is how the numbers break down for Rachel:
      </p>

      <ul>
        <li><strong>Offer A standard hourly:</strong> $72,000 / 2,080 = {usd2(72000 / 2080)}/hr</li>
        <li><strong>Offer A effective hourly (excluding 32 PTO days):</strong> $72,000 / 1,824 = {usd2(72000 / 1824)}/hr</li>
        <li><strong>Offer A total compensation:</strong> $72,000 + $6,200 (health) + $2,880 (401k match) = {usdWhole(81080)}</li>
        <li><strong>Offer A total comp hourly:</strong> {usdWhole(81080)} / 1,824 = {usd2(81080 / 1824)}/hr</li>
        <li><strong>Offer B annual (40hrs x 52wks):</strong> $42 x 2,080 = {usdWhole(annualFromHourly(42))} gross</li>
        <li><strong>Offer B self-employment tax (illustrative 15.3% on gross):</strong> {usdWhole(Math.round(87360 * 0.153))}</li>
        <li><strong>Offer B health insurance (self-paid, near KFF single premium):</strong> ~{usdWhole(KFF_SINGLE_PREMIUM_2025)}/year</li>
        <li><strong>Offer B net annual (after SE tax and insurance):</strong> {usdWhole(87360 - Math.round(87360 * 0.153) - KFF_SINGLE_PREMIUM_2025)} (self-paid premium at KFF average)</li>
        <li><strong>Offer B no paid time off:</strong> Taking 4 weeks off costs {usdWhole(42 * 40 * 4)} in lost billable income</li>
      </ul>

      <p>
        After running the numbers, Rachel discovered that Offer A was actually worth more per working hour when factoring in benefits and paid
        leave. The salaried position provided an effective total-comp value of {usd2(81080 / 1824)}/hr, while the $42/hr contract yielded approximately
        {usd2((87360 - Math.round(87360 * 0.153) - KFF_SINGLE_PREMIUM_2025) / 2080)}/hr after simplified self-employment costs and a full-year schedule — and only if she worked all 52 weeks with no unpaid leave. Rachel accepted Offer A.
      </p>

      <h3>Salary to Hourly Conversion Table by Income Level</h3>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Annual Salary</th>
              <th>Hourly (2,080 hrs)</th>
              <th>Effective Hourly (1,880 hrs)</th>
              <th>Monthly Gross</th>
              <th>After Tax (~22%)</th>
              <th>vs OEWS median ({usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}/hr)</th>
            </tr>
          </thead>
          <tbody>
            {[
              40000, 50000, 65000, 80000, 100000, 120000, 150000,
            ].map((s) => {
              const hourly = hourlyFromAnnual(s);
              const vsMedian = (hourly / OEWS_MEDIAN_HOURLY_MAY_2025 - 1) * 100;
              return (
                <tr key={s}>
                  <td>{usdWhole(s)}</td>
                  <td>{usd2(hourly)}</td>
                  <td>{usd2(s / 1880)}</td>
                  <td>{usdWhole(Math.round(s / 12))}</td>
                  <td>{usdWhole(Math.round(s * 0.78))}</td>
                  <td>{vsMedian >= 0 ? "+" : ""}{vsMedian.toFixed(0)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p>
        The table above assumes 40 hours per week, 52 weeks per year, 25 paid days off (holidays and vacation combined), and a 22%
        combined effective tax rate. Your specific numbers will vary based on state taxes, deductions, and individual circumstances. For a
        more precise after-tax calculation, use our{" "}
        <Link href="/calculators/income-tax" className="text-brand-600 hover:text-brand-800 font-medium">Income Tax Calculator</Link>{" "}
        to find your actual effective rate.
      </p>

      <h3>Tips for Maximizing Your Effective Hourly Rate</h3>

      <ul>
        <li>
          <strong>Negotiate PTO alongside salary.</strong> An extra 5 vacation days at a $75,000 salary raises your effective hourly rate by
          approximately {usd2(75000 / 1840 - 75000 / 1880)}/hr without changing your paycheck. That is the equivalent of a {usdWhole(Math.round((75000 / 1840 - 75000 / 2080) * 1840))} raise in time value.
        </li>
        <li>
          <strong>Account for commute time and costs.</strong> A 45-minute one-way commute adds 7.5 hours per week of unpaid work time. On a
          $65,000 salary, your true hourly rate including commute drops from {usd2(65000 / 2080)} to {usd2(65000 / (2080 + 7.5 * 52))}. Remote work eliminates this hidden cost entirely.
        </li>
        <li>
          <strong>Factor in overtime exemption.</strong> Most salaried employees above {usdWhole(FLSA_EXEMPT_MIN_ANNUAL)}/year meet the FLSA salary-level test but still must pass the duties test to be overtime-exempt. If you regularly work
          50 hours per week instead of 40, your actual hourly rate drops by 20%. A $65,000 salary at 50 hours/week is {usd2(65000 / (50 * 52))}/hr, not {usd2(65000 / 2080)}.
        </li>
        <li>
          <strong>Use the hourly rate for side gig evaluation.</strong> If your salaried hourly rate is {usd2(72000 / 2080)}, any freelance work or side gig paying
          less than about $45/hr (accounting for self-employment tax and no benefits) is effectively a pay cut.
        </li>
        <li>
          <strong>Compare total compensation, not just base salary.</strong> A $70,000 job with excellent benefits can outvalue a $85,000 job
          with minimal benefits. Calculate the dollar value of health insurance, retirement match, HSA contributions, and stock options.
        </li>
      </ul>

      <h3>Frequently Asked Questions</h3>

      <h4>How do I convert my salary to an hourly rate?</h4>
      <p>
        Divide your annual salary by 2,080 (40 hours x 52 weeks). For example, a $60,000 salary equals {usd2(60000 / 2080)} per hour. For a more accurate
        figure that accounts for paid time off, divide by your actual working hours: 2,080 minus (PTO days x 8 hours). With 25 days off, that
        is 1,880 hours, making $60,000 equal to {usd2(60000 / 1880)}/hr effective.
      </p>

      <h4>Is a $30/hour job better than a $55,000 salary?</h4>
      <p>
        At 40 hours per week and 52 weeks, $30/hour equals {usdWhole(annualFromHourly(30))} annually — {usdWhole(annualFromHourly(30) - 55000)} more in gross pay than $55,000. However, if the salaried position
        includes health insurance (KFF 2025 average single premium {usdWhole(KFF_SINGLE_PREMIUM_2025)}), retirement match ($2,200+ at 4%), and paid leave ({usdWhole(30 * 40 * 3)}+ value for three weeks), the $55,000 salary may offer
        higher total compensation of approximately {usdWhole(55000 + KFF_EMPLOYER_SHARE_SINGLE_2025 + 2200 + 3600)}. Always compare total packages, not headline numbers. Check your take-home with our{" "}
        <Link href="/guides/50-30-20-budget-rule" className="text-brand-600 hover:text-brand-800 font-medium">guide to the 50/30/20 budget rule</Link>{" "}
        to see how each option impacts your monthly budget.
      </p>

      <h4>How many hours do salaried employees actually work per year?</h4>
      <p>
        Pay conversions usually start from 2,080 paid hours (40 x 52). After subtracting 10 federal holidays and 15 vacation days, scheduled working time is about 1,880 hours while pay still covers 2,080. BLS Current Population Survey data for 2025 show full-time workers averaging 41.9 hours per week on the job — about 2,179 hours over 52 weeks — which is higher than the 40-hour convention used in most offer letters.
      </p>
      <Sources items={[WAGE_BENCHMARK_SOURCES.cpsHours2025]} checked="October 2026" />

      <h4>Should I include overtime when calculating my hourly rate?</h4>
      <p>
        Yes, if you consistently work more than 40 hours per week. Your real hourly rate should reflect your actual time investment. Working
        45 hours weekly at a $75,000 salary means your real rate is $75,000 / (45 x 52) = {usd2(75000 / (45 * 52))}/hr, not the {usd2(75000 / 2080)} you would get using
        the standard 2,080-hour calculation.
      </p>
    </article>
  );
}
