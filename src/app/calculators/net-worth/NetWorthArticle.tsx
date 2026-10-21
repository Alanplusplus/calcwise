import Link from "next/link";
import { Sources } from "@/components/Sources";

export function NetWorthArticle() {
  return (
    <>
      <h2>What Is Net Worth and Why It Matters</h2>
      <p>
        Net worth is the single most important number in personal finance. It represents everything
        you own minus everything you owe — your true financial position at any given moment.
        Unlike income, which measures what you earn, net worth measures what you have accumulated.
        A high earner with substantial debt may have a lower net worth than a moderate earner who
        saves consistently.
      </p>
      <p>
        Tracking net worth over time reveals whether your financial decisions are working. Income
        can fluctuate with job changes, bonuses, or economic cycles, but net worth trends show the
        cumulative effect of saving, investing, paying down debt, and avoiding lifestyle inflation.
        Many financially successful people review their net worth quarterly or annually.
      </p>
      <p>
        Net worth also determines how close you are to major milestones like buying a home,
        reaching financial independence, or retiring comfortably. Your{" "}
        <Link
          href="/calculators/retirement"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Retirement Savings Calculator
        </Link>{" "}
        projects future needs, but net worth tells you where you stand today. Together, they form
        a complete picture of your financial health.
      </p>

      <h2>How to Calculate Your Net Worth</h2>
      <p>
        The formula is straightforward: Net Worth = Total Assets − Total Liabilities. Assets are
        anything you own that has monetary value. Liabilities are any debts or obligations you owe
        to others.
      </p>
      <p>
        <strong>Common assets include:</strong> cash in checking and savings accounts, brokerage
        and investment accounts, retirement accounts (401k, IRA, Roth IRA), home equity (market
        value minus mortgage), vehicle value, and other property like rental real estate or
        valuable collectibles.
      </p>
      <p>
        <strong>Common liabilities include:</strong> mortgage balance, student loans, auto loans,
        credit card balances, personal loans, medical debt, and any other outstanding obligations.
      </p>
      <p>
        Use current market values for assets, not what you paid. Your home is worth what it would
        sell for today, not your purchase price from five years ago. Similarly, use your most
        recent investment account balances. For vehicles, check Kelley Blue Book or similar guides
        for a realistic estimate.
      </p>
      <p>
        Enter all values into the calculator above to see your total assets, total liabilities,
        net worth, and a breakdown of how your wealth is allocated across asset categories. With
        the default demo inputs ($160,000 in assets and $36,000 in liabilities), net worth is
        $124,000.
      </p>

      <h2>Median Net Worth by Age (2025 SCF)</h2>
      <p>
        The Federal Reserve's 2025 Survey of Consumer Finances (released October 9, 2026) reports
        median and mean family net worth by age of the reference person. Median is the better
        benchmark for a typical household because means are pulled up by wealthy outliers.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50">
              <th className="px-3 py-2 font-semibold text-ink-900">Age of reference person</th>
              <th className="px-3 py-2 font-semibold text-ink-900">Median (2025 SCF)</th>
              <th className="px-3 py-2 font-semibold text-ink-900">Mean (2025 SCF)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ink-100">
              <td className="px-3 py-2">Under 35</td>
              <td className="px-3 py-2">$33,000</td>
              <td className="px-3 py-2">$135,400</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-3 py-2">35–44</td>
              <td className="px-3 py-2">$155,600</td>
              <td className="px-3 py-2">$681,900</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-3 py-2">45–54</td>
              <td className="px-3 py-2">$253,700</td>
              <td className="px-3 py-2">$1,244,500</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-3 py-2">55–64</td>
              <td className="px-3 py-2">$411,900</td>
              <td className="px-3 py-2">$1,878,000</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-3 py-2">65–74</td>
              <td className="px-3 py-2">$431,300</td>
              <td className="px-3 py-2">$1,897,600</td>
            </tr>
            <tr>
              <td className="px-3 py-2">75 or older</td>
              <td className="px-3 py-2">$504,900</td>
              <td className="px-3 py-2">$1,962,200</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        All US families: median $215,900 (+2% versus the 2022 survey, in 2025 dollars) and mean
        $1,241,500 (+7%). For a deeper breakdown, read our{" "}
        <Link
          href="/guides/net-worth-by-age"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Net Worth by Age guide
        </Link>
        .
      </p>
      <Sources
        items={[
          {
            label: "Federal Reserve, Changes in U.S. Family Finances 2022–2025 (Table 2, Oct. 2026)",
            href: "https://www.federalreserve.gov/publications/files/scf26.pdf",
          },
        ]}
        checked="October 2026"
        note="Dollar amounts are in 2025 dollars as published in the October 2026 release."
      />

      <h2>Case Study: Kevin, 32 Years Old, $95K Salary</h2>
      <p>
        Kevin is a 32-year-old project manager earning $95,000 per year in Austin, Texas. He
        started tracking his net worth two years ago when it was $42,000. Today, his breakdown
        looks like this:
      </p>
      <ul>
        <li>Cash and savings: $18,000 (emergency fund plus checking buffer)</li>
        <li>Brokerage account: $32,000 (index fund portfolio started three years ago)</li>
        <li>401(k): $78,000 (15% contribution with employer match)</li>
        <li>Car value: $14,000 (2021 sedan, paid off last year)</li>
        <li>Student loans: $22,000 remaining (down from $38,000)</li>
        <li>Credit cards: $1,200 (paid in full monthly, but tracked for completeness)</li>
      </ul>
      <p>
        Kevin's total assets: $142,000. Total liabilities: $23,200. Net worth: $118,800 —
        well above the $33,000 median for families under 35 in the 2025 SCF, though below the
        $155,600 median for ages 35–44 he will enter soon. Retirement accounts are 55% of assets;
        brokerage is 23%.
      </p>
      <p>
        Kevin's plan for the next three years: eliminate the remaining $22,000 in student
        loans (freeing $350/month), increase brokerage contributions to $500/month using our{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Savings Goal Calculator
        </Link>
        , and maintain his 15% 401(k) deferral. At this pace, he projects reaching $200,000 net
        worth by age 35. He also reads our{" "}
        <Link
          href="/guides/how-to-start-investing-1000"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How to Start Investing with $1,000 guide
        </Link>{" "}
        to optimize his brokerage allocation.
      </p>

      <h2>How to Increase Your Net Worth</h2>
      <p>
        Growing net worth comes down to two levers: increase assets and decrease liabilities.
        Most people focus on both simultaneously.
      </p>
      <ul>
        <li>
          <strong>Maximize employer 401(k) match:</strong> This is an immediate 50–100% return
          on contributed dollars. Never leave matching funds on the table.
        </li>
        <li>
          <strong>Pay off high-interest debt:</strong> Credit card debt at 20%+ APR destroys net
          worth faster than most investments can grow. Eliminate it aggressively.
        </li>
        <li>
          <strong>Invest consistently:</strong> Regular contributions to diversified index funds
          harness compound growth over decades. Even $200/month adds up significantly over time.
        </li>
        <li>
          <strong>Avoid lifestyle inflation:</strong> When you get a raise, allocate at least half
          to savings and debt payoff rather than upgrading your spending across the board.
        </li>
        <li>
          <strong>Build home equity:</strong> Mortgage payments gradually shift from interest to
          principal, building an asset. However, a home is illiquid — do not over-concentrate.
        </li>
        <li>
          <strong>Increase earning power:</strong> Negotiate raises, develop skills, or pursue
          side income. Higher earnings accelerate both saving and debt elimination when managed
          deliberately.
        </li>
      </ul>

      <h2>Net Worth Percentiles (All US Families, 2025 SCF)</h2>
      <p>
        The Fed publishes net worth cutoffs for the full sample — not every age band — in the 2025
        survey. Use these to see where you stand nationally; compare medians by age in the table
        above for peer context.
      </p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 text-left font-medium text-ink-700">Percentile</th>
            <th className="py-2 text-left font-medium text-ink-700">Net worth cutoff (2025 SCF)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">25th</td>
            <td className="py-2 text-ink-600">$27,900</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">50th (median)</td>
            <td className="py-2 text-ink-600">$215,900</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">75th</td>
            <td className="py-2 text-ink-600">$812,800</td>
          </tr>
          <tr>
            <td className="py-2 text-ink-600">90th</td>
            <td className="py-2 text-ink-600">$2,539,200</td>
          </tr>
        </tbody>
      </table>
      <p>
        If you are below the median for your age, focus on debt elimination and consistent
        investing rather than comparing yourself to top percentiles. Use our{" "}
        <Link
          href="/calculators/home-affordability"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Home Affordability Calculator
        </Link>{" "}
        before taking on a mortgage, since housing is the largest asset and liability for most
        households.
      </p>

      <h2>FAQ</h2>
      <p>
        <strong>Should I include my home in net worth?</strong> Yes. Use the current estimated
        market value as an asset and your remaining mortgage balance as a liability. The difference
        is your home equity, which is part of your net worth even though it is not easily accessible
        without selling or borrowing against it.
      </p>
      <p>
        <strong>What about retirement accounts I cannot touch until 59½?</strong> Include them.
        They are real assets that will fund your future. Just remember they are tax-advantaged and
        may have withdrawal restrictions — factor that into financial planning separately from
        liquid net worth.
      </p>
      <p>
        <strong>How often should I calculate my net worth?</strong> Quarterly is a good cadence.
        Monthly is fine if you enjoy tracking progress, but daily updates are unnecessary since
        investment values fluctuate and most liabilities change slowly.
      </p>
      <p>
        <strong>Is negative net worth normal?</strong> It is common for recent graduates with
        student loans or new homeowners with small down payments. What matters is the trend — is
        your net worth increasing over time? A negative net worth at 25 is less concerning than
        a declining net worth at 45.
      </p>
      <p>
        <strong>What is a good net worth target?</strong> Fidelity suggests retirement savings
        equal to 1× salary by 30, 3× by 40, 6× by 50, and 10× by 67 (retirement accounts, not
        total net worth). The 2025 SCF median for ages 35–44 is $155,600 for all assets minus
        debts — use the measure that matches your question.
      </p>
    </>
  );
}
