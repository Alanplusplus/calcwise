import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";

export function CompoundInterestArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/compound-interest-growth.webp"
          alt="Infographic showing compound interest growth vs simple interest over 30 years, starting with $10,000 at 7% annual return"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          Compound interest creates exponential growth compared to simple interest over time.
        </figcaption>
      </figure>

      <h2>How Compound Interest Works</h2>
      <p>
        Compound interest is interest calculated on both the initial principal
        and the accumulated interest from previous periods. Unlike simple
        interest (which only earns on the original principal), compound interest
        creates a snowball effect — your money earns interest on its interest,
        leading to exponential growth over time.
      </p>
      <p>
        Albert Einstein reportedly called compound interest the "eighth
        wonder of the world." Whether or not the attribution is accurate,
        the math is undeniable: given enough time, even modest savings can grow
        into substantial wealth.
      </p>

      <h2>The Compound Interest Formula</h2>
      <p>The formula for compound interest with regular contributions is:</p>
      <p>
        <strong>A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]</strong>
      </p>
      <ul>
        <li><strong>A</strong> = future value (what you'll have)</li>
        <li><strong>P</strong> = initial principal (starting amount)</li>
        <li><strong>r</strong> = annual interest rate (as a decimal)</li>
        <li><strong>n</strong> = number of times interest compounds per year</li>
        <li><strong>t</strong> = number of years</li>
        <li><strong>PMT</strong> = regular contribution amount</li>
      </ul>

      <h2>Why Compounding Frequency Matters</h2>
      <p>
        The more frequently interest compounds, the faster your money grows.
        Here's how $10,000 at 7% annual interest looks after 20 years with
        different compounding frequencies:
      </p>
      <ul>
        <li><strong>Annually:</strong> $38,697</li>
        <li><strong>Quarterly:</strong> $40,064</li>
        <li><strong>Monthly:</strong> $40,387</li>
        <li><strong>Daily:</strong> $40,547</li>
      </ul>
      <p>
        The difference between annual and daily compounding is about $1,850 on
        principal alone — meaningful, but smaller than adding $500 per month for
        the same period. Consistent contributions and years in the market dominate
        compounding frequency.
      </p>
      <p>
        Want to see how compound interest helps you reach a specific goal? Try our <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">Savings Goal Calculator</Link> to find the monthly contribution needed for your target.
      </p>

      <h2>The Power of Starting Early</h2>
      <p>
        Consider two investors, both targeting retirement at age 65 with a 7%
        annual return:
      </p>
      <ul>
        <li>
          <strong>Investor A</strong> starts at 25, invests $300/month for 40
          years. Total contributions: $144,000. Final balance: approximately
          $787,000 at 7% with monthly compounding.
        </li>
        <li>
          <strong>Investor B</strong> starts at 35, invests $600/month for 30
          years. Total contributions: $216,000. Final balance: approximately
          $732,000 at the same 7% return.
        </li>
      </ul>
      <p>
        Investor A contributes $72,000 less but ends up with about $55,000 more —
        purely because of the extra 10 years of compounding. This illustrates
        why financial advisors stress starting as early as possible, even with
        small amounts.
      </p>
      <p>
        See how compounding powers your retirement savings with our <Link href="/calculators/retirement" className="text-brand-600 hover:text-brand-800 font-medium">Retirement Calculator</Link>, or read <Link href="/guides/compound-interest-real-examples" className="text-brand-600 hover:text-brand-800 font-medium">5 Real-Life Examples of Compound Interest</Link> for concrete scenarios.
      </p>

      <h2>Realistic Return Rate Assumptions</h2>
      <p>When planning your investments, anchor assumptions to published benchmarks:</p>
      <ul>
        <li><strong>S&P 500 (stocks):</strong> 13.44% 10-year annualized price return and about 15.5% 10-year total return as of September 30, 2026 (S&P Dow Jones Indices) — past performance is not a forecast.</li>
        <li><strong>Planning rate:</strong> many models use 7% nominal for diversified equity portfolios to leave room for fees, taxes, and weak decades.</li>
        <li><strong>High-yield savings:</strong> top online APYs near 4.2% to 4.35% in October 2026; FDIC national average savings was 0.38% the same month.</li>
        <li><strong>Certificates of deposit:</strong> FDIC 12-month national average 1.76% in October 2026; top online 1-year CDs near 4.55% to 4.60% APY.</li>
      </ul>
      <p>
        For long-term planning (20+ years), using 7% in this calculator while
        studying 10% scenarios shows how sensitive outcomes are to return
        assumptions — a 3-point spread can add more wealth than your initial
        principal over two decades.
      </p>
      <Sources
        items={[
          {
            label: "S&P 500 index facts (Sep. 30, 2026)",
            href: "https://www.spglobal.com/spdji/en/indices/equity/sp-500/",
          },
          {
            label: "FDIC National Rates and Rate Caps (Oct. 19, 2026)",
            href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
          },
        ]}
        checked="October 2026"
      />

      <h2>Comparison: Same Contributions at 7%, 10%, and 12%</h2>
      <p>
        Starting from $0 and investing $500 per month for 30 years with monthly
        compounding illustrates how return assumptions reshape retirement-scale
        balances:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Annual return</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Total contributions</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Final balance</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Interest earned</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">7% (conservative plan)</td>
              <td className="px-3 py-2 text-right text-ink-800">$180,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$610,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$430,000</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">10% (historical equity shorthand)</td>
              <td className="px-3 py-2 text-right text-ink-800">$180,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,130,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$950,000</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">12% (stress-test upside)</td>
              <td className="px-3 py-2 text-right text-ink-800">$180,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,747,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,567,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The 7% row matches what this calculator outputs for $500/month over 30
        years with no starting principal. The gap between 7% and 10% — about
        $520,000 on the same contributions — is why planners stress-test lower
        returns even when recent S&P 500 decade returns were higher.
      </p>
      <p>
        Already have investments? Use our <Link href="/calculators/investment-return" className="text-brand-600 hover:text-brand-800 font-medium">Investment Return Calculator</Link> to measure your actual annualized performance.
      </p>

      <h2>Compound Interest vs. Simple Interest</h2>
      <p>
        With <strong>simple interest</strong>, $10,000 at 7% earns $700 per
        year, every year — totaling $24,000 in interest over 20 years.
      </p>
      <p>
        With <strong>compound interest</strong> (monthly), the same $10,000
        grows to $40,387 — earning $30,387 in interest. That's 27% more
        growth from compounding alone, with no additional contributions.
      </p>

      <h2>Tips to Maximize Compound Growth</h2>
      <ul>
        <li><strong>Start immediately</strong> — even small amounts benefit enormously from additional time.</li>
        <li><strong>Automate contributions</strong> — set up automatic transfers so you invest consistently regardless of market conditions.</li>
        <li><strong>Reinvest dividends</strong> — dividend reinvestment plans (DRIPs) compound your returns without effort.</li>
        <li><strong>Minimize fees</strong> — a 1% annual fee can reduce your final balance by 25% or more over 30 years. Choose low-cost index funds.</li>
        <li><strong>Avoid withdrawals</strong> — every withdrawal resets your compounding clock. Let time do the heavy lifting.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What's a good rate of return to assume?</h3>
      <p>
        For stock market investments over 20+ years, 7% (inflation-adjusted) is
        a commonly used conservative estimate. For a savings account or CDs, use
        the current advertised rate, keeping in mind that rates fluctuate over
        time.
      </p>

      <h3>How often should I contribute?</h3>
      <p>
        Monthly contributions are the most common approach and align with most
        people's pay schedules. The key is consistency — whether weekly,
        biweekly, or monthly, regular contributions matter more than the exact
        frequency.
      </p>

      <h3>Does compound interest work against me with debt?</h3>
      <p>
        Yes. Credit card debt compounds daily at rates of 15-25%+. A $5,000
        credit card balance at 20% APR making only minimum payments (the greater of
        $25 or interest plus 1% of the balance) would take about 19 years to pay off
        and cost about $7,300 in interest. This is why paying off high-interest debt
        should be a priority.
      </p>
    </>
  );
}
