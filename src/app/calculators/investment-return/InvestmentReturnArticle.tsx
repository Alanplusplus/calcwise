import Link from "next/link";
import { Sources } from "@/components/Sources";
import { LONG_TERM_BRACKETS, TAX_DATA, TAX_SOURCES, usd } from "@/lib/tax-data";

const SP500_BENCHMARK = 10.0;
const SP500_REAL_BENCHMARK = 6.8;

export function InvestmentReturnArticle() {
  const ltcg0Single = usd(LONG_TERM_BRACKETS.single[0].upTo);

  return (
    <>
      <h2>Understanding Investment Returns</h2>
      <p>
        Your investment return includes two components: capital gains (the
        increase in your investment's value) and income (dividends,
        interest, or distributions received). This calculator combines both to
        give you a complete picture of your investment performance. With the
        default inputs ($10,000 invested, $16,105 ending value, $250 per year in
        dividends, five years), total return is 73.6% and annualized return (CAGR)
        is about 11.7% — a strong but plausible equity outcome, not a guarantee
        of future results.
      </p>

      <h2>Total Return vs. Annualized Return (CAGR)</h2>
      <p>
        <strong>Total return</strong> shows your overall gain as a percentage of
        your initial investment. If you invested $10,000 and it is now worth
        $16,105 with $1,250 in dividends received over five years, your total
        return is 73.6% ($7,355 gain on $10,000).
      </p>
      <p>
        <strong>Annualized return (CAGR)</strong> — Compound Annual Growth
        Rate — normalizes that return to a per-year rate, accounting for
        compounding. A 73.6% total return over 5 years is approximately 11.7%
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

      <h2>Historical Benchmark Returns (U.S.)</h2>
      <p>
        Long-run benchmarks help you judge whether realized returns are in line
        with history. Figures below are geometric (compound) annual averages from
        complete calendar years unless noted.
      </p>
      <ul>
        <li>
          <strong>S&P 500 (total return, dividends reinvested):</strong> about{" "}
          {SP500_BENCHMARK.toFixed(1)}% per year from 1928 through 2025; about{" "}
          {SP500_REAL_BENCHMARK.toFixed(1)}% after CPI inflation over the same
          span (Damodaran, January 2026 data update).
        </li>
        <li>
          <strong>2025 calendar year:</strong> S&P 500 total return about 17.7%
          (16.4% price change plus about 1.3% dividend yield), per the same
          2026 update — near the long-run median for single years.
        </li>
        <li>
          <strong>10-year U.S. Treasury (nominal yield):</strong> about 5.15% on
          October 19, 2026 (Fed H.15 / FRED DGS10) — a current risk-free
          reference, not a multi-decade average.
        </li>
        <li>
          <strong>3-month T-bills and 10-year Treasuries (1928–2025):</strong>{" "}
          about 3.3% and 4.9% geometric averages in Damodaran's historical
          dataset — lower return than stocks, with far less equity-style
          volatility.
        </li>
        <li>
          <strong>S&P 500 dividend yield (index level):</strong> about 1.05% as
          of October 20, 2026 (Multpl estimate from trailing dividends and index
          price) — well below the long-run average near 4% because price gains
          outpaced payout growth.
        </li>
      </ul>
      <Sources
        items={[
          {
            label: "Damodaran (NYU Stern), Data Update 2 for 2026 (Jan. 2026)",
            href: "https://aswathdamodaran.blogspot.com/2026/01/data-update-2-for-2026-equities-get.html",
          },
          {
            label: "Damodaran historical returns 1928–2025 (Jan. 2026)",
            href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
          },
          {
            label: "Federal Reserve H.15 (Oct. 20, 2026 release)",
            href: "https://www.federalreserve.gov/releases/h15/",
          },
          {
            label: "Multpl S&P 500 dividend yield (Oct. 20, 2026)",
            href: "https://www.multpl.com/s-p-500-dividend-yield",
          },
        ]}
        checked="October 2026"
        note="Past performance does not predict future results. Use a range of assumptions for planning."
      />
      <p>
        Use these benchmarks to evaluate whether your investments are
        outperforming or underperforming a simple index fund. If your stock
        portfolio consistently trails the S&P 500 over 5–10 years, a low-cost
        index fund may be the more reliable choice. If you are just getting
        started, read{" "}
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
        Dividends have contributed about 31% of the S&P 500's long-term
        total return since 1926, with the rest from price appreciation (S&P Dow
        Jones Indices research, data through February 2025). An investment that
        grows from $10,000 to $12,000 while also paying $800 in dividends has a
        true return of $2,800 (28%), not just $2,000 (20%).
      </p>
      <p>
        Reinvesting dividends amplifies compound growth. In S&P DJI's
        illustration, $100 in the index on January 1, 1930 would have grown to
        about 278 times by February 2025 on price alone, but to about 9,584
        times with dividends reinvested — same index, very different outcome.
        For more illustrations, see{" "}
        <Link
          href="/guides/compound-interest-real-examples"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest: 5 Real-Life Examples
        </Link>
        .
      </p>
      <Sources
        items={[
          {
            label: "S&P DJI, Dividend Aristocrats research (Feb. 2025 data)",
            href: "https://www.spglobal.com/spdji/en/documents/research/research-sp500-dividend-aristocrats.pdf",
          },
        ]}
        checked="October 2026"
      />

      <h2>Accounting for Inflation</h2>
      <p>
        A 10% nominal return during a year with 3% inflation produces a real
        return of approximately 7%. Over 1928–2025, the S&P 500's real
        compound return was about 6.8% (Damodaran, CPI-adjusted). When evaluating
        long-term performance, compare your CAGR to a real benchmark near 6–7%
        for broad U.S. equities — otherwise you may overestimate purchasing-power
        gains.
      </p>

      <h2>Case Study: Sarah Compares Three Strategies</h2>
      <p>
        Sarah, a 32-year-old marketing manager in Denver, received a $15,000
        bonus in January 2021 and tracked three choices through December 2025
        using this calculator (initial value, ending value, dividends where
        applicable).
      </p>
      <ul>
        <li>
          <strong>Option A — S&P 500 index fund:</strong> She invested the full
          $15,000 with dividends reinvested and a 0.03% expense ratio. Calendar
          2021–2025 total returns on the index were roughly +28.7%, −18.1%,
          +26.3%, +25.0%, and +17.9% (S&P Dow Jones Indices / SPXTR series).
          Her account finished near $28,400 — about 13.6% annualized before
          taxes, ahead of the very long-run ~10% average but in line with the
          strong 2023–2025 streak.
        </li>
        <li>
          <strong>Option B — High-yield savings:</strong> She parked $15,000 at
          an average 4.1% APY with no market risk. After five years she had about
          $18,300, or about 4.0% annualized — competitive for cash in 2024–2026,
          but below equity growth over the same window.
        </li>
        <li>
          <strong>Option C — Single stock pick:</strong> She bought $15,000 of
          one hypothetical tech holding, received $420 in dividends, and sold for
          $19,100 after a volatile ride. Total gain $4,520 (30.1% total), but
          annualized return was only about 5.4% because of a sharp drawdown in
          year three. Her{" "}
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
        differ. She now benchmarks every holding against a 6–10% long-run equity
        range and uses our{" "}
        <Link
          href="/calculators/retirement"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Retirement Calculator
        </Link>{" "}
        to see whether her 401(k) deferrals still put her on track for $1.5
        million by age 65 at a conservative 6.5% nominal blend.
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
        For a diversified U.S. stock portfolio, matching the long-run S&P 500
        total return near {SP500_BENCHMARK.toFixed(0)}% nominal (about{" "}
        {SP500_REAL_BENCHMARK.toFixed(1)}% real) is a solid outcome. Be wary of
        any strategy promising steady returns far above that without explaining
        extra risk. Over 1–3 years, anything from −20% to +30% can happen in
        equities (2022 and 2023 are recent examples).
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
        and shows about 7.5% — the rate that actually turns your starting
        balance into your ending balance. Use CAGR when comparing funds or
        reporting performance to avoid overstating results after volatile years.
      </p>

      <h3>How do taxes affect my reported return?</h3>
      <p>
        This tool measures pre-tax account growth unless you enter values already
        net of tax. In the U.S. for tax year {TAX_DATA.taxYear}, qualified
        dividends and long-term capital gains on assets held over one year are
        often taxed at 0%, 15%, or 20% depending on taxable income — the 0%
        rate applies up to about {ltcg0Single} for single filers ({TAX_DATA.checkedOnLabel} IRS
        figures). A 10% pre-tax CAGR might feel like 8.5% after a 15% tax drag
        on gains. Track cost basis separately and subtract estimated tax when
        judging whether you beat a {SP500_REAL_BENCHMARK.toFixed(1)}% real
        target.
      </p>
      <Sources
        items={[TAX_SOURCES.capitalGains, TAX_SOURCES.federalRates]}
        checked="October 2026"
      />
    </>
  );
}
