import Image from "next/image";
import Link from "next/link";
import { SOCIAL_SECURITY_WAGE_BASE, usd } from "@/lib/tax-data";

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
        For a typical full-time employee working 40 hours per week across 52 weeks, the total is 2,080 paid hours per year. A $65,000 annual
        salary divided by 2,080 hours equals $31.25 per hour. This is the gross hourly rate before taxes and deductions.
      </p>

      <p>
        However, this basic formula does not tell the complete story. Most salaried employees receive paid holidays and vacation days, meaning they
        earn the same annual pay while working fewer actual hours. The <strong>effective hourly rate</strong> — which accounts for paid time off —
        is always higher than the standard calculation. With 10 holidays and 15 vacation days (25 total days off), your actual working hours drop
        from 2,080 to 1,880, pushing the effective rate from $31.25 to $34.57 per hour.
      </p>

      <h3>Key Concepts for Salary Comparisons</h3>

      <p>
        When comparing a salaried position to an hourly job or freelance contract, several factors beyond the base number matter significantly.
        Salaried employees typically receive benefits that add 20% to 40% to their total compensation: health insurance averaging $7,739 per year
        for single coverage, employer 401(k) matches worth 3% to 6% of salary, paid leave, and other perks. An hourly worker earning $35 per hour
        with no benefits has a total compensation value of approximately $72,800 annually — but a salaried employee at $65,000 with a standard
        benefits package may have total compensation exceeding $85,000.
      </p>

      <p>
        Tax treatment also differs. Salaried employees have taxes withheld automatically, while freelancers and contractors must pay self-employment
        tax (15.3% on net earnings, with the Social Security part capped at {usd(SOCIAL_SECURITY_WAGE_BASE)} in 2026). This means a freelancer needs to charge roughly $38 to $42 per hour to match
        the take-home pay of a $31.25/hour salaried position. Budget your take-home pay effectively using our{" "}
        <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">50/30/20 Budget Calculator</Link>{" "}
        to allocate your after-tax income across needs, wants, and savings.
      </p>

      <h3>Case Study: Rachel Evaluates Two Job Offers</h3>

      <p>
        Rachel, a 31-year-old graphic designer in Denver, Colorado, received two competing job offers. Offer A was a salaried position at
        $72,000 per year with 12 paid holidays, 20 vacation days, health insurance (employer pays $6,200), and a 4% 401(k) match. Offer B was
        a contract role paying $42 per hour with no benefits, no paid time off, and a 1099 arrangement.
      </p>

      <p>
        Here is how the numbers break down for Rachel:
      </p>

      <ul>
        <li><strong>Offer A standard hourly:</strong> $72,000 / 2,080 = $34.62/hr</li>
        <li><strong>Offer A effective hourly (excluding 32 PTO days):</strong> $72,000 / 1,824 = $39.47/hr</li>
        <li><strong>Offer A total compensation:</strong> $72,000 + $6,200 (health) + $2,880 (401k match) = $81,080</li>
        <li><strong>Offer A total comp hourly:</strong> $81,080 / 1,824 = $44.45/hr</li>
        <li><strong>Offer B annual (40hrs x 52wks):</strong> $42 x 2,080 = $87,360 gross</li>
        <li><strong>Offer B self-employment tax:</strong> $87,360 x 15.3% = $13,366</li>
        <li><strong>Offer B health insurance (self-paid):</strong> ~$7,200/year</li>
        <li><strong>Offer B net annual (after SE tax and insurance):</strong> $87,360 - $13,366 - $7,200 = $66,794</li>
        <li><strong>Offer B no paid time off:</strong> Taking 4 weeks off costs $6,720 in lost income</li>
      </ul>

      <p>
        After running the numbers, Rachel discovered that Offer A was actually worth more per working hour when factoring in benefits and paid
        leave. The salaried position at $72,000 provided an effective value of $44.45/hr, while the $42/hr contract yielded approximately
        $32.11/hr after self-employment costs and unpaid vacation. Rachel accepted Offer A.
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$40,000</td>
              <td>$19.23</td>
              <td>$21.28</td>
              <td>$3,333</td>
              <td>$2,600</td>
            </tr>
            <tr>
              <td>$50,000</td>
              <td>$24.04</td>
              <td>$26.60</td>
              <td>$4,167</td>
              <td>$3,250</td>
            </tr>
            <tr>
              <td>$65,000</td>
              <td>$31.25</td>
              <td>$34.57</td>
              <td>$5,417</td>
              <td>$4,225</td>
            </tr>
            <tr>
              <td>$80,000</td>
              <td>$38.46</td>
              <td>$42.55</td>
              <td>$6,667</td>
              <td>$5,200</td>
            </tr>
            <tr>
              <td>$100,000</td>
              <td>$48.08</td>
              <td>$53.19</td>
              <td>$8,333</td>
              <td>$6,500</td>
            </tr>
            <tr>
              <td>$120,000</td>
              <td>$57.69</td>
              <td>$63.83</td>
              <td>$10,000</td>
              <td>$7,800</td>
            </tr>
            <tr>
              <td>$150,000</td>
              <td>$72.12</td>
              <td>$79.79</td>
              <td>$12,500</td>
              <td>$9,375</td>
            </tr>
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
          approximately $1.08/hr without changing your paycheck. That is the equivalent of a $2,250 raise in time value.
        </li>
        <li>
          <strong>Account for commute time and costs.</strong> A 45-minute one-way commute adds 7.5 hours per week of unpaid work time. On a
          $65,000 salary, your true hourly rate including commute drops from $31.25 to $26.32. Remote work eliminates this hidden cost entirely.
        </li>
        <li>
          <strong>Factor in overtime exemption.</strong> Most salaried employees in the U.S. are exempt from overtime pay. If you regularly work
          50 hours per week instead of 40, your actual hourly rate drops by 20%. A $65,000 salary at 50 hours/week is $25.00/hr, not $31.25.
        </li>
        <li>
          <strong>Use the hourly rate for side gig evaluation.</strong> If your salaried hourly rate is $34, any freelance work or side gig paying
          less than $45/hr (accounting for self-employment tax and no benefits) is effectively a pay cut.
        </li>
        <li>
          <strong>Compare total compensation, not just base salary.</strong> A $70,000 job with excellent benefits can outvalue a $85,000 job
          with minimal benefits. Calculate the dollar value of health insurance, retirement match, HSA contributions, and stock options.
        </li>
      </ul>

      <h3>Frequently Asked Questions</h3>

      <h4>How do I convert my salary to an hourly rate?</h4>
      <p>
        Divide your annual salary by 2,080 (40 hours x 52 weeks). For example, a $60,000 salary equals $28.85 per hour. For a more accurate
        figure that accounts for paid time off, divide by your actual working hours: 2,080 minus (PTO days x 8 hours). With 25 days off, that
        is 1,880 hours, making $60,000 equal to $31.91/hr effective.
      </p>

      <h4>Is a $30/hour job better than a $55,000 salary?</h4>
      <p>
        At 40 hours per week and 52 weeks, $30/hour equals $62,400 annually — $7,400 more in gross pay. However, if the salaried position
        includes health insurance ($6,000+ value), retirement match ($2,200+), and paid leave ($5,300+ value), the $55,000 salary may offer
        higher total compensation of approximately $68,500. Always compare total packages, not headline numbers. Check your take-home with our{" "}
        <Link href="/guides/50-30-20-budget-rule" className="text-brand-600 hover:text-brand-800 font-medium">guide to the 50/30/20 budget rule</Link>{" "}
        to see how each option impacts your monthly budget.
      </p>

      <h4>How many hours do salaried employees actually work per year?</h4>
      <p>
        The standard calculation uses 2,080 hours (40 x 52). After subtracting 10 federal holidays and an average of 15 vacation days, actual
        working hours are approximately 1,880. Bureau of Labor Statistics data shows the average American full-time employee works about
        1,791 hours per year when accounting for all forms of leave.
      </p>

      <h4>Should I include overtime when calculating my hourly rate?</h4>
      <p>
        Yes, if you consistently work more than 40 hours per week. Your real hourly rate should reflect your actual time investment. Working
        45 hours weekly at a $75,000 salary means your real rate is $75,000 / (45 x 52) = $32.05/hr, not the $36.06 you would get using
        the standard 2,080-hour calculation.
      </p>
    </article>
  );
}
