import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import {
  ARIZONA_INCOME_TAX_RATE_2026,
  ARIZONA_MIN_WAGE_2026,
  BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026,
  BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026,
  COLORADO_MIN_WAGE_2026,
  CPS_MEDIAN_HOUSEHOLD_INCOME_2024,
  FEDERAL_MINIMUM_WAGE,
  FLSA_EXEMPT_MIN_ANNUAL,
  KFF_EMPLOYER_SHARE_SINGLE_2025,
  KFF_SINGLE_PREMIUM_2025,
  OEWS_MEDIAN_HOURLY_MAY_2025,
  STANDARD_PAID_HOURS_PER_YEAR,
  WAGE_BENCHMARK_SOURCES,
  annualFromHourly,
  usd2,
  usdWhole,
} from "@/lib/wage-data";

const danaCurrentNet = 34566;
const danaNewGross = 47840 + 6900;
const danaNewNet = 44812;

export function HourlyToSalaryArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/hourly-to-salary-infographic.webp"
          alt="Infographic showing hourly to annual salary conversion formula with example calculations at different hourly rates from $15 to $50"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          The standard conversion: hourly rate multiplied by hours per week multiplied by 52 weeks equals annual salary.
        </figcaption>
      </figure>

      <h2>How to Convert Hourly Pay to Annual Salary</h2>
      <p>
        The standard formula for converting an hourly wage to an annual salary is straightforward:
        <strong> Annual Salary = Hourly Rate x Hours Per Week x 52 Weeks</strong>. At $25/hour
        working 40 hours per week for 52 weeks, the calculation is $25 x 40 x 52 ={" "}
        <strong>$52,000 per year</strong> ({STANDARD_PAID_HOURS_PER_YEAR.toLocaleString()} paid hours). However, this baseline number does not account for paid
        time off, overtime, benefits, or taxes — factors that can shift your real earning power by
        thousands of dollars in either direction. With default tax inputs (22% federal, 5% state, 7.65% FICA), the calculator above estimates about {usdWhole(33982)} net on $52,000 gross — roughly {usdWhole(2832)}/month.
      </p>
      <p>
        This calculator goes beyond the simple formula. Enter your hourly rate, weekly hours, PTO
        weeks, and overtime to see your gross and net income at every pay frequency: annual,
        monthly, biweekly, weekly, and daily. The tax estimate section shows approximate take-home
        pay after federal, state, and FICA taxes. You can also compare your rate against the full
        reference table of common hourly wages and their salary equivalents.
      </p>

      <h2>National Hourly Benchmarks (2025–2026)</h2>
      <p>
        Job posts are easier to evaluate with context. The May 2025 OEWS median for all U.S. occupations is {usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}/hr ({usdWhole(annualFromHourly(OEWS_MEDIAN_HOURLY_MAY_2025))} at 2,080 hours). BLS average hourly earnings for all private employees reached {usd2(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026)} in September 2026. Median usual weekly earnings for full-time workers were {usdWhole(BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026)} in Q2 2026. Legal floors matter too: the federal minimum is still {usd2(FEDERAL_MINIMUM_WAGE)}/hr, while Arizona’s 2026 minimum is {usd2(ARIZONA_MIN_WAGE_2026)}/hr and Colorado’s is {usd2(COLORADO_MIN_WAGE_2026)}/hr — employers must pay the highest rate that applies to the work location.
      </p>
      <Sources
        items={[
          WAGE_BENCHMARK_SOURCES.blsOewsMay2025,
          WAGE_BENCHMARK_SOURCES.blsEmpsitSep2026,
          WAGE_BENCHMARK_SOURCES.blsWeeklyQ2_2026,
          WAGE_BENCHMARK_SOURCES.federalMinWage,
          WAGE_BENCHMARK_SOURCES.arizonaMin2026,
          WAGE_BENCHMARK_SOURCES.coloradoMin2026,
        ]}
        checked="October 2026"
      />

      <h2>Why the Simple Formula Can Be Misleading</h2>
      <p>
        The $25/hour = $52,000 calculation assumes you work every week of the year. In practice,
        most full-time employees receive 2 to 4 weeks of paid time off (vacation, sick days, and
        holidays). If you receive 3 weeks of PTO, you are actually working 49 weeks but being paid
        for 52 — which means your <strong>effective hourly rate</strong> is higher than your nominal
        rate. At $25/hour with 3 weeks PTO, your effective rate for hours actually worked is $25 x
        52 / 49 = <strong>$26.53/hour</strong>.
      </p>
      <p>
        Conversely, if you are a contractor or part-time worker with no paid time off, you only earn
        money for the weeks you work. Taking 2 weeks unpaid vacation reduces your annual income from
        $52,000 to $50,000 — a $2,000 difference that matters when budgeting. The calculator above
        accounts for this by separating total weeks from PTO weeks. Compare how different PTO
        policies affect your earnings using our{" "}
        <Link href="/calculators/salary-to-hourly" className="text-brand-600 hover:text-brand-800 font-medium">
          Salary to Hourly Calculator
        </Link>{" "}
        to see the reverse conversion.
      </p>

      <h2>Overtime and Its Impact on Annual Earnings</h2>
      <p>
        Under the Fair Labor Standards Act (FLSA), non-exempt hourly workers must receive at least
        1.5x their regular rate for hours worked beyond 40 per week. Some employers pay double time
        (2x) for holidays or hours exceeding 12 in a single day. The financial impact is
        significant: a $25/hour worker who averages 5 hours of overtime per week at 1.5x for 50 paid weeks earns
        an additional $9,375/year ($25 x 1.5 x 5 x 50), bringing total gross pay from
        $52,000 to <strong>$61,375</strong>. Salaried roles near {usdWhole(FLSA_EXEMPT_MIN_ANNUAL)}/year may still be overtime-exempt if they meet the duties test — hourly workers are not.
      </p>
      <Sources items={[WAGE_BENCHMARK_SOURCES.federalMinWage, WAGE_BENCHMARK_SOURCES.dolExempt]} checked="October 2026" />
      <p>
        Some industries routinely offer overtime opportunities. Nurses working three 12-hour shifts
        plus one 8-hour shift log 44 hours — 4 hours of overtime per week at $35/hour adds $10,920
        annually ($35 x 1.5 x 4 x 52). Construction workers averaging 44 hours per week at $22/hour (4 hours of weekly overtime) add $6,864 in overtime pay ($22 x 1.5 x 4 x 52). Use the overtime section above to model exactly how extra hours translate to annual
        income, and see how that additional income fits into a{" "}
        <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">
          50/30/20 Budget
        </Link>{" "}
        for effective financial planning.
      </p>

      <h2>Case Study: Dana Evaluates a Job Offer</h2>
      <p>
        Dana, a 26-year-old administrative assistant in Phoenix, currently earns $20/hour working 40
        hours/week with no overtime and 2 weeks of PTO. Her gross annual salary: $20 x 40 x 52 ={" "}
        <strong>$41,600</strong>. Using 2026 federal brackets (single, standard deduction), Arizona income tax at {(ARIZONA_INCOME_TAX_RATE_2026 * 100).toFixed(2)}%, and FICA (7.65%), her estimated take-home is approximately {usdWhole(danaCurrentNet)} — or {usdWhole(Math.round(danaCurrentNet / 12))}/month.
      </p>
      <p>
        Dana receives a job offer from a logistics company at $23/hour with the same 40-hour
        schedule, 2 weeks PTO, but with an average of 5 hours/week overtime at 1.5x during peak
        shipping season (roughly 40 weeks/year). Her new compensation:
      </p>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Current Job ($20/hr)</th>
            <th>New Offer ($23/hr)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Base annual (40 hrs x 52 wks)</td>
            <td>$41,600</td>
            <td>$47,840</td>
          </tr>
          <tr>
            <td>Overtime (5 hrs/wk x 40 wks at 1.5x)</td>
            <td>$0</td>
            <td>$6,900</td>
          </tr>
          <tr>
            <td>Gross annual</td>
            <td>$41,600</td>
            <td>{usdWhole(danaNewGross)}</td>
          </tr>
          <tr>
            <td>Estimated taxes (fed + AZ {(ARIZONA_INCOME_TAX_RATE_2026 * 100).toFixed(2)}% + FICA)</td>
            <td>{usdWhole(41600 - danaCurrentNet)}</td>
            <td>{usdWhole(danaNewGross - danaNewNet)}</td>
          </tr>
          <tr>
            <td>Net annual take-home</td>
            <td>{usdWhole(danaCurrentNet)}</td>
            <td>{usdWhole(danaNewNet)}</td>
          </tr>
          <tr>
            <td>Net monthly</td>
            <td>{usdWhole(Math.round(danaCurrentNet / 12))}</td>
            <td>{usdWhole(Math.round(danaNewNet / 12))}</td>
          </tr>
        </tbody>
      </table>
      <Sources
        items={[WAGE_BENCHMARK_SOURCES.arizonaMin2026]}
        checked="October 2026"
        note="Tax estimates use 2026 federal brackets and Arizona’s 2.47% rate; your withholding may differ."
      />
      <p>
        The new position pays {usdWhole(danaNewGross - 41600)} more gross and {usdWhole(danaNewNet - danaCurrentNet)} more net annually — a {(((danaNewNet - danaCurrentNet) / danaCurrentNet) * 100).toFixed(1)}% increase
        in take-home pay. Even accounting for 5 extra hours per week during peak season, Dana's
        effective hourly rate on the new job is {usd2(danaNewGross / (50 * 45))} when she works 45-hour weeks for 50 paid weeks. The {usdWhole(Math.round((danaNewNet - danaCurrentNet) / 12))}/month
        increase in take-home pay would allow her to accelerate savings toward a down payment, which
        she can model with a{" "}
        <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">
          Savings Goal Calculator
        </Link>{" "}
        to see exactly when she reaches her target.
      </p>

      <h2>Hourly to Salary Reference: Common Rates</h2>
      <p>
        The following table converts common hourly wages to annual salaries based on a standard 40-hour
        workweek, 52 weeks per year. Use it as a quick reference when evaluating job offers or
        comparing compensation:
      </p>
      <table>
        <thead>
          <tr>
            <th>Hourly Rate</th>
            <th>Weekly</th>
            <th>Monthly</th>
            <th>Annual Salary</th>
            <th>Typical Roles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{usd2(FEDERAL_MINIMUM_WAGE)}</td>
            <td>{usdWhole(FEDERAL_MINIMUM_WAGE * 40)}</td>
            <td>{usdWhole(Math.round((FEDERAL_MINIMUM_WAGE * 40 * 52) / 12))}</td>
            <td>{usdWhole(annualFromHourly(FEDERAL_MINIMUM_WAGE))}</td>
            <td>Federal FLSA floor (higher in most states)</td>
          </tr>
          <tr>
            <td>{usd2(ARIZONA_MIN_WAGE_2026)}</td>
            <td>{usdWhole(ARIZONA_MIN_WAGE_2026 * 40)}</td>
            <td>{usdWhole(Math.round((ARIZONA_MIN_WAGE_2026 * 40 * 52) / 12))}</td>
            <td>{usdWhole(annualFromHourly(ARIZONA_MIN_WAGE_2026))}</td>
            <td>State minimum (Phoenix metro, 2026)</td>
          </tr>
          <tr>
            <td>{usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}</td>
            <td>{usdWhole(OEWS_MEDIAN_HOURLY_MAY_2025 * 40)}</td>
            <td>{usdWhole(Math.round((OEWS_MEDIAN_HOURLY_MAY_2025 * 40 * 52) / 12))}</td>
            <td>{usdWhole(annualFromHourly(OEWS_MEDIAN_HOURLY_MAY_2025))}</td>
            <td>OEWS median, all occupations (May 2025)</td>
          </tr>
          <tr>
            <td>$20.00</td>
            <td>$800</td>
            <td>$3,467</td>
            <td>$41,600</td>
            <td>Administrative, skilled trades entry</td>
          </tr>
          <tr>
            <td>$25.00</td>
            <td>$1,000</td>
            <td>$4,333</td>
            <td>$52,000</td>
            <td>Technician, paralegal, bookkeeper</td>
          </tr>
          <tr>
            <td>$30.00</td>
            <td>$1,200</td>
            <td>$5,200</td>
            <td>$62,400</td>
            <td>Electrician, dental hygienist</td>
          </tr>
          <tr>
            <td>$35.00</td>
            <td>$1,400</td>
            <td>$6,067</td>
            <td>$72,800</td>
            <td>Registered nurse, IT support</td>
          </tr>
          <tr>
            <td>$40.00</td>
            <td>$1,600</td>
            <td>$6,933</td>
            <td>$83,200</td>
            <td>Project coordinator, analyst</td>
          </tr>
          <tr>
            <td>{usd2(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026)}</td>
            <td>{usdWhole(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026 * 40)}</td>
            <td>{usdWhole(Math.round((BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026 * 40 * 52) / 12))}</td>
            <td>{usdWhole(annualFromHourly(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026))}</td>
            <td>BLS avg. hourly, all private (Sep. 2026)</td>
          </tr>
        </tbody>
      </table>
      <Sources
        items={[WAGE_BENCHMARK_SOURCES.blsOewsMay2025, WAGE_BENCHMARK_SOURCES.blsEmpsitSep2026]}
        checked="October 2026"
      />
      <p>
        These figures represent gross pay before taxes. Actual take-home pay depends on your tax
        bracket, state taxes, and deductions. Workers in no-income-tax states like Texas, Florida,
        and Washington keep more of each dollar than workers in states with broad income taxes. Use our{" "}
        <Link href="/calculators/paycheck" className="text-brand-600 hover:text-brand-800 font-medium">
          Paycheck Calculator
        </Link>{" "}
        to estimate your exact take-home pay after all deductions.
      </p>

      <h2>Hidden Factors That Affect Your True Hourly Value</h2>
      <p>
        When comparing hourly jobs, the posted rate is only part of the picture. Consider these
        additional factors that affect your real compensation:
      </p>
      <ul>
        <li>
          <strong>Benefits value:</strong> KFF reports an average single health premium of {usdWhole(KFF_SINGLE_PREMIUM_2025)} in 2025 ({usdWhole(KFF_EMPLOYER_SHARE_SINGLE_2025)} paid by employers on average). A $22/hour job with full health coverage may be
          worth more than a $25/hour job without it. Add the premium you would pay out of pocket before comparing.
        </li>
        <li>
          <strong>Retirement match:</strong> A 401(k) match of 4% on a $52,000 salary adds $2,080
          in free money annually. Over 30 years at 7% returns, that match alone grows to roughly
          $196,000 — an often-overlooked component of hourly compensation.
        </li>
        <li>
          <strong>Commute costs:</strong> An extra 30 minutes of commute each way costs approximately
          $3,000 to $5,000/year in gas, vehicle wear, and opportunity cost. A $23/hour job 10 minutes
          from home may net more than a $26/hour job with a 45-minute commute.
        </li>
        <li>
          <strong>Schedule consistency:</strong> Unpredictable scheduling with variable hours makes
          budgeting difficult. A guaranteed 40-hour schedule at $22/hour provides more financial
          stability than a $25/hour position that fluctuates between 25 and 45 hours weekly.
        </li>
      </ul>
      <Sources items={[WAGE_BENCHMARK_SOURCES.kff2025]} checked="October 2026" />

      <h2>Tips for Negotiating a Higher Hourly Rate</h2>
      <p>
        <strong>1. Know your market rate.</strong> Research the hourly range for your role in your
        metro area using the Bureau of Labor Statistics Occupational Employment and Wage Statistics.
        The national median was {usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}/hr in May 2025; metro tables run higher in major cities.
      </p>
      <p>
        <strong>2. Quantify your value in dollars.</strong> If you saved your previous employer
        $15,000 annually through process improvements, that number justifies a $2 to $3/hour
        premium. Prepare specific examples with dollar amounts.
      </p>
      <p>
        <strong>3. Negotiate total compensation.</strong> If the employer cannot budge on hourly
        rate, negotiate for additional PTO (each week is worth your hourly rate x 40), a signing
        bonus, earlier review dates for raises, or tuition reimbursement. One extra week of PTO at
        $25/hour is worth $1,000 in paid time off. See how different rates translate to annual
        income in our{" "}
        <Link href="/calculators/income-tax" className="text-brand-600 hover:text-brand-800 font-medium">
          Income Tax Calculator
        </Link>{" "}
        to understand the after-tax impact of each dollar increase, or read our{" "}
        <Link href="/guides/401k-vs-roth-ira" className="text-brand-600 hover:text-brand-800 font-medium">401(k) vs Roth IRA guide</Link>{" "}
        when weighing retirement benefits.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How do you convert hourly to salary?</h3>
      <p>
        Multiply your hourly rate by the number of hours you work per week, then multiply by 52
        (the number of weeks in a year). For example, $20/hour x 40 hours x 52 weeks = $41,600
        annual salary. If you receive paid time off, the formula stays the same because you are
        paid for all 52 weeks. If you do not receive PTO, multiply by only the weeks you actually
        work.
      </p>

      <h3>Is $25 an hour a good salary?</h3>
      <p>
        At $25/hour working full-time (40 hours/week, 52 weeks), you earn $52,000/year gross — slightly above the May 2025 OEWS median of {usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}/hr ({usdWhole(annualFromHourly(OEWS_MEDIAN_HOURLY_MAY_2025))}). Median household money income was {usdWhole(CPS_MEDIAN_HOUSEHOLD_INCOME_2024)} in 2024 (CPS ASEC), so a single earner at $52,000 is below typical household income but near the middle of the individual wage distribution. Whether it is sufficient depends heavily on your location and household size. With the calculator’s default tax assumptions (34.65% combined), take-home is about {usdWhole(33982)}/year.
      </p>
      <Sources items={[WAGE_BENCHMARK_SOURCES.blsOewsMay2025, WAGE_BENCHMARK_SOURCES.censusIncome2024]} checked="October 2026" />

      <h3>How many working hours are in a year?</h3>
      <p>
        A standard full-time work year is 2,080 hours (40 hours/week x 52 weeks). If you subtract
        typical PTO — 10 holidays and 10 vacation days (4 weeks total) — the actual working hours
        drop to 1,920. Government and union positions often use 1,920 or 1,950 hours for salary
        equivalency calculations. The 2,080 figure is the standard used by the Bureau of Labor
        Statistics and most employers for converting between hourly and annual pay. Federal payroll uses 2,087 hours for hourly-rate conversions.
      </p>
      <Sources items={[WAGE_BENCHMARK_SOURCES.opm2087]} checked="October 2026" />

      <h3>How does overtime affect my annual salary?</h3>
      <p>
        Under FLSA rules, overtime pays at least 1.5x your regular rate for hours over 40 per week.
        A $20/hour worker averaging 5 hours of overtime weekly at 1.5x earns $7,500 in overtime
        annually ($30/hour x 5 hours x 50 weeks), boosting total pay from $41,600 to $49,100. Some
        states like California require daily overtime after 8 hours, even if the weekly total is
        under 40.
      </p>

      <h3>Should I take the higher hourly rate or the salaried position?</h3>
      <p>
        Compare total compensation, not just the top-line numbers. A $28/hour position ({usdWhole(annualFromHourly(28))}
        annual at 40 hours) with health insurance worth {usdWhole(KFF_EMPLOYER_SHARE_SINGLE_2025)}/year (employer share of average single premium) and a 4% 401(k) match ({usdWhole(Math.round(annualFromHourly(28) * 0.04))})
        has total compensation near {usdWhole(Math.round(annualFromHourly(28) + KFF_EMPLOYER_SHARE_SINGLE_2025 + annualFromHourly(28) * 0.04))}. A salaried position at $62,000 without benefits has a
        lower total package despite a similar base. Also consider overtime eligibility — hourly
        workers earn extra for hours over 40, while many salaried roles are overtime-exempt only if they meet both the duties test and the {usdWhole(FLSA_EXEMPT_MIN_ANNUAL)} salary threshold.
      </p>
    </>
  );
}
