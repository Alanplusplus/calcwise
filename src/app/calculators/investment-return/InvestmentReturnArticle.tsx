export function InvestmentReturnArticle() {
  return (
    <>
      <h2>Understanding Investment Returns</h2>
      <p>
        Your investment return includes two components: capital gains (the
        increase in your investment&apos;s value) and income (dividends,
        interest, or distributions received). This calculator combines both to
        give you a complete picture of your investment performance.
      </p>

      <h2>Total Return vs. Annualized Return (CAGR)</h2>
      <p>
        <strong>Total return</strong> shows your overall gain as a percentage of
        your initial investment. If you invested $10,000 and it&apos;s now worth
        $15,000, your total return is 50%.
      </p>
      <p>
        <strong>Annualized return (CAGR)</strong> — Compound Annual Growth
        Rate — normalizes that return to a per-year rate, accounting for
        compounding. A 50% total return over 5 years is approximately 8.45%
        annualized. CAGR is the best metric for comparing investments held for
        different time periods.
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
        index fund.
      </p>

      <h2>Why Dividends Matter</h2>
      <p>
        Dividends have contributed approximately 40% of the S&P 500&apos;s total
        return historically. An investment that grows from $10,000 to $12,000
        while also paying $800 in dividends has a true return of $2,800 (28%),
        not just $2,000 (20%).
      </p>
      <p>
        Reinvesting dividends amplifies compound growth significantly. $10,000
        invested in the S&P 500 in 1990 would be worth about $110,000 by 2024
        without reinvesting dividends, but approximately $210,000 with dividends
        reinvested.
      </p>

      <h2>Accounting for Inflation</h2>
      <p>
        A 10% nominal return during a year with 3% inflation produces a real
        return of approximately 7%. When evaluating long-term investment
        performance, always consider whether your returns are beating inflation —
        otherwise your purchasing power isn&apos;t actually growing.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What&apos;s a good annualized return?</h3>
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
        complex to calculate (you&apos;d need the internal rate of return or
        money-weighted return). This calculator is designed for lump-sum
        investments. For regular contributions, use our Compound Interest
        Calculator.
      </p>

      <h3>Should I include fees in my calculation?</h3>
      <p>
        Yes. Use your actual account value (after fees have been deducted) as
        the &quot;Current Value.&quot; This gives you your net return — what you
        actually earned after all costs.
      </p>
    </>
  );
}
