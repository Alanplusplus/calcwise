import Link from "next/link";

export function InvestmentReturnArticle() {
  return (
    <>
      <h2>Understanding Investment Returns</h2>
      <p>
        Your investment return includes two components: capital gains (the
        increase in your investment's value) and income (dividends,
        interest, or distributions received). This calculator combines both to
        give you a complete picture of your investment performance.
      </p>

      <h2>Total Return vs. Annualized Return (CAGR)</h2>
      <p>
        <strong>Total return</strong> shows your overall gain as a percentage of
        your initial investment. If you invested $10,000 and it's now worth
        $15,000, your total return is 50%.
      </p>
      <p>
        <strong>Annualized return (CAGR)</strong> — Compound Annual Growth
        Rate — normalizes that return to a per-year rate, accounting for
        compounding. A 50% total return over 5 years is approximately 8.45%
        annualized. CAGR is the best metric for comparing investments held for
        different time periods. To project future growth with compounding, use
        our{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest Calculator
        </Link>
        .
      </p>

      <h2>Historical Benchmark Returns</h2>
      <ul>
        <li><strong>S&P 500:</strong> ~10% annual average (1926-2024), ~7% after inflation</li>
        <li><strong>Total US Bond Market:</strong> ~5% annual average</li>
        <li><strong>International Stocks:</strong> ~8% annual average</li>
        <li><strong>Real Estate (REITs):</strong> ~9-11% annual average</li>
        <li><strong>Gold:</strong> ~7% annual average (highly volatile)</li>
        <li><strong>Cash/Savings:</strong> ~3% annual average (varies dramatically by era)</li>
      </ul>
      <p>
        Use these benchmarks to evaluate whether your investments are
        outperforming or underperforming the market. If your stock portfolio
        consistently trails the S&P 500, you might be better served by a simple
        index fund. If you're just getting started, read{" "}
        <Link
          href="/guides/how-to-start-investing-1000"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How to Start Investing with $1,000
        </Link>{" "}
        for practical first steps.
      </p>

      <h2>Why Dividends Matter</h2>
      <p>
        Dividends have contributed approximately 40% of the S&P 500's total
        return historically. An investment that grows from $10,000 to $12,000
        while also paying $800 in dividends has a true return of $2,800 (28%),
        not just $2,000 (20%).
      </p>
      <p>
        Reinvesting dividends amplifies compound growth significantly. $10,000
        invested in the S&P 500 in 1990 would be worth about $110,000 by 2024
        without reinvesting dividends, but approximately $210,000 with dividends
        reinvested. For more concrete illustrations, see{" "}
        <Link
          href="/guides/compound-interest-real-examples"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest: 5 Real-Life Examples
        </Link>
        .
      </p>

      <h2>Accounting for Inflation</h2>
      <p>
        A 10% nominal return during a year with 3% inflation produces a real
        return of approximately 7%. When evaluating long-term investment
        performance, always consider whether your returns are beating inflation —
        otherwise your purchasing power isn't actually growing.
      </p>

      <h2>Case Study: Sarah Compares Three Strategies</h2>
      <p>
        Sarah, a 32-year-old marketing manager in Manchester, received a
        $15,000 bonus in January 2019 and wanted to measure how three choices
        performed over five years. She tracked each path with this calculator
        using initial value, ending value, and dividends where applicable.
      </p>
      <ul>
        <li>
          <strong>Option A — S&P 500 index fund:</strong> She invested the full
          $15,000, reinvested dividends, and paid a 0.03% expense ratio. By
          December 2024 her account was about $24,200, implying roughly 9.8%
          annualized before fees and about 9.5% net — close to the long-run US
          equity benchmark.
        </li>
        <li>
          <strong>Option B — High-yield savings:</strong> She parked $15,000 at
          an average 4.2% APY with no market risk. After five years she had
          roughly $18,400, or about 4.0% annualized — solid for cash, but far
          below equity growth over the same window.
        </li>
        <li>
          <strong>Option C — Single stock pick:</strong> She bought $15,000 of
          one tech name, received $420 in dividends, and sold for $19,100 after
          a volatile ride. Total gain $4,520 (30.1% total), but annualized
          return was only about 5.4% because of a sharp drawdown in year three
          that recovered late. Her{" "}
          <Link
            href="/calculators/roi"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            ROI Calculator
          </Link>{" "}
          entry helped her separate cash-on-cash profit from time-adjusted CAGR.
        </li>
      </ul>
      <p>
        Sarah's takeaway: headline percentages mislead when time and income
        differ. She now benchmarks every holding against 7–10% long-run stock
        expectations and uses our{" "}
        <Link
          href="/calculators/retirement"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Retirement Calculator
        </Link>{" "}
        to see whether her 401(k) and ISA contributions still put her on track
        for £1.2M by age 65 at a conservative 6.5% blend.
      </p>

      <h2>$10,000 Growth at 6%, 8%, and 10% Annual Returns</h2>
      <p>
        Lump-sum growth assumes no additional contributions and annual
        compounding. Small differences in rate widen dramatically over decades —
        the gap between 6% and 10% on $10,000 over 30 years is more than
        $117,000.
      </p>
      <table>
        <thead>
          <tr>
            <th>Annual rate</th>
            <th>After 10 years</th>
            <th>After 20 years</th>
            <th>After 30 years</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>6%</td>
            <td>$17,908</td>
            <td>$32,071</td>
            <td>$57,435</td>
          </tr>
          <tr>
            <td>8%</td>
            <td>$21,589</td>
            <td>$46,610</td>
            <td>$100,627</td>
          </tr>
          <tr>
            <td>10%</td>
            <td>$25,937</td>
            <td>$67,275</td>
            <td>$174,494</td>
          </tr>
        </tbody>
      </table>
      <p>
        A balanced portfolio might land near 6–7% after inflation; an aggressive
        equity mix might approach 8–10% nominal over long periods, with higher
        interim swings. Enter your own start amount, end value, and years held
        above to see whether your realized CAGR sits in this range.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What's a good annualized return?</h3>
      <p>
        For a diversified stock portfolio, matching or slightly trailing the
        market (8-10% nominal) is considered good. Consistently beating the
        market by 2%+ annually puts you among the top investors globally. Be
        wary of any investment promising consistent returns above 12% — the
        risk is likely much higher than advertised.
      </p>

      <h3>How do I account for additional contributions?</h3>
      <p>
        If you made regular contributions over time, your true return is more
        complex to calculate (you'd need the internal rate of return or
        money-weighted return). This calculator is designed for lump-sum
        investments. For regular contributions, use our{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest Calculator
        </Link>
        .
      </p>

      <h3>Should I include fees in my calculation?</h3>
      <p>
        Yes. Use your actual account value (after fees have been deducted) as
        the "Current Value." This gives you your net return — what you
        actually earned after all costs.
      </p>

      <h3>What is the difference between CAGR and average annual return?</h3>
      <p>
        Average annual return adds each year's percentage and divides by
        the number of years. If you earn +20%, −10%, and +15% over three years,
        the simple average is 8.3%. CAGR instead links those years geometrically
        and might show about 7.4% — the rate that actually turns your starting
        balance into your ending balance. Use CAGR when comparing funds or
        reporting performance to avoid overstating results after volatile years.
      </p>

      <h3>How do taxes affect my reported return?</h3>
      <p>
        This tool measures pre-tax account growth unless you enter values already
        net of tax. In the US, long-term capital gains on assets held over one
        year are often taxed at 0%, 15%, or 20% depending on income; qualified
        dividends follow similar brackets. A 10% pre-tax CAGR might feel like
        8.5% after a 15% tax drag on gains. Track cost basis separately and
        subtract estimated tax when judging whether you beat a 7% inflation-adjusted
        target.
      </p>
    </>
  );
}
