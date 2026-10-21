import Link from "next/link";
import Image from "next/image";
import { Sources } from "@/components/Sources";
import { LONG_TERM_BRACKETS, TAX_DATA, TAX_SOURCES, usd } from "@/lib/tax-data";

export function DividendArticle() {
  const ltcg0Single = usd(LONG_TERM_BRACKETS.single[0].upTo);

  return (
    <>
      <Image
        src="/images/dividend-infographic.webp"
        alt="Dividend investing infographic showing dividend yield formula, growth stocks vs dividend stocks comparison, DRIP reinvestment snowball effect, and portfolio growth timeline over 10 to 30 years"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <h2>How Dividends Work</h2>
      <p>
        A dividend is a portion of a company's earnings distributed to
        shareholders, typically on a quarterly basis. When a company earns
        profits beyond what it needs for reinvestment and operations, the board
        of directors can vote to return some of that cash to shareholders.
        Dividends are usually expressed as a dollar amount per share: if a
        company pays $2.00 annually and you own 100 shares, you receive $200
        per year in dividend income.
      </p>
      <p>
        The dividend yield — calculated by dividing the annual dividend per
        share by the current share price — is the metric investors use to
        compare income across different stocks. A stock trading at $50 that
        pays $2.00 annually has a 4.0% yield. That same $2.00 dividend on a
        stock trading at $100 produces only a 2.0% yield. Yield fluctuates
        daily as the share price moves, which is why a rising stock price can
        actually reduce your yield even if dividends stay constant. Tracking
        your total returns over time with our{" "}
        <Link
          href="/calculators/investment-return"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Investment Return Calculator
        </Link>{" "}
        helps separate price appreciation from dividend income in your
        portfolio.
      </p>

      <h2>Dividend Yield vs. Dividend Growth</h2>
      <p>
        Investors broadly fall into two camps: those who prioritize high
        current yield and those who prioritize dividend growth. High-yield
        stocks (utilities, REITs, tobacco companies) often pay 5% to 8% but
        grow dividends slowly at 1% to 3% per year. Dividend growth stocks
        (technology, healthcare, consumer staples aristocrats) might yield only
        1.5% to 3% initially but raise their dividends 8% to 15% annually.
      </p>
      <p>
        The math reveals a critical crossover point. A stock yielding 2.0%
        with 10% annual dividend growth will surpass the income from a 5.0%
        yielder growing at 2% in approximately year 10. By year 20, the growth
        stock produces nearly three times the annual income. This is why many
        long-term investors prefer growth: the income starts smaller but
        compounds aggressively. The effect mirrors the principles behind{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          compound interest
        </Link>
        , where time transforms modest growth rates into powerful wealth
        accumulation.
      </p>

      <h2>The Power of DRIP (Dividend Reinvestment)</h2>
      <p>
        A Dividend Reinvestment Plan (DRIP) automatically uses your dividend
        payments to purchase additional shares of the same stock. Instead of
        receiving $200 in cash, you receive 4 additional shares at $50 each.
        Those 4 new shares then generate their own dividends, which buy more
        shares, which generate more dividends — creating a compounding
        snowball effect.
      </p>
      <p>
        DRIP is most powerful over long time horizons. Consider an investor who
        buys $10,000 worth of a stock yielding 3.5% with 6% annual dividend
        growth and 7% share price appreciation.         On a hypothetical $10,000 stake with a 3.5% starting yield, 6% dividend
        growth, and 7% price growth, the calculator shows about $54,274 after
        25 years without DRIP versus about $116,562 with DRIP — more than double
        the ending value from reinvesting rather than spending dividends
        (illustrative constants, not a single fund).
      </p>
      <Sources
        items={[
          {
            label: "S&P DJI dividend contribution research (Feb. 2025 data)",
            href: "https://www.spglobal.com/spdji/en/documents/research/research-sp500-dividend-aristocrats.pdf",
          },
        ]}
        checked="October 2026"
      />

      <h2>Case Study: Marcus Builds a Dividend Income Stream</h2>
      <p>
        Marcus is 30 years old and wants to build a portfolio that generates
        $24,000 per year ($2,000 per month) in dividend income by age 55. He
        starts with $15,000 and can invest $400 per month. He builds a
        diversified portfolio of dividend growth stocks and ETFs with an average
        yield of 3.0%, average dividend growth of 7%, and average share price
        appreciation of 8% per year.
      </p>
      <p>
        Using the calculator with $15,000 upfront, $400 per month, a 3.0%
        starting yield, 7% dividend growth, 8% price growth, and DRIP, year 1
        ends near $21,624 in portfolio value with about $624 in dividends. By
        year 10 he reaches about $125,604 ($3,342 in annual dividends). Year 15
        crosses $241,020 ($6,129 dividends). At year 25 the portfolio is about
        $745,640 throwing off $17,316 in annual dividends — below his $24,000
        target on these constants, so he would nudge contributions, yield, or
        timeline rather than assume guaranteed market results.
      </p>
      <p>
        Of the $745,640 at year 25, only $135,000 came from Marcus's
        contributions; the rest came from modeled price gains and reinvested
        dividends. Starting early and staying consistent let compounding do
        the heavy lifting. For a broader perspective on retirement income
        planning, explore our{" "}
        <Link
          href="/calculators/roi"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          ROI Calculator
        </Link>{" "}
        to compare dividend investing against other income-generating
        strategies.
      </p>

      <h2>High Yield vs. Growth: 25-Year Comparison</h2>
      <table className="my-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink-200 text-ink-500">
            <th className="py-2 pr-4 font-medium">Metric</th>
            <th className="py-2 pr-4 font-medium">High Yield (5%, 2% Growth)</th>
            <th className="py-2 font-medium">Dividend Growth (2.5%, 10% Growth)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">Year 1 Income</td>
            <td className="py-2 pr-4 text-ink-800">$500</td>
            <td className="py-2 text-ink-800">$250</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">Year 10 Income</td>
            <td className="py-2 pr-4 text-ink-800">$597</td>
            <td className="py-2 text-ink-800">$648</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">Year 20 Income</td>
            <td className="py-2 pr-4 text-ink-800">$728</td>
            <td className="py-2 text-ink-800">$1,682</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">Year 25 Income</td>
            <td className="py-2 pr-4 text-ink-800">$804</td>
            <td className="py-2 text-ink-800">$2,710</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">Total Dividends (25 yr)</td>
            <td className="py-2 pr-4 text-ink-800">$16,406</td>
            <td className="py-2 text-ink-800">$22,159</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">Crossover Point</td>
            <td className="py-2 pr-4 text-ink-800" colSpan={2}>Year 10 (growth income surpasses high yield)</td>
          </tr>
        </tbody>
      </table>
      <p>
        This comparison assumes a $10,000 initial investment with no additional
        contributions and no DRIP. The dividend growth portfolio generates 35%
        more total income over 25 years despite starting at half the yield. With
        DRIP enabled, the gap widens further because growth stocks reinvest at
        a faster-accelerating rate.
      </p>

      <h2>Building a Dividend Portfolio: Practical Tips</h2>
      <ul>
        <li>
          <strong>Diversify across sectors:</strong> Holding dividend stocks
          in utilities, healthcare, consumer staples, financials, and REITs
          protects you from sector-specific cuts. If one industry slashes
          dividends, others likely continue paying.
        </li>
        <li>
          <strong>Focus on payout ratio:</strong> A company paying 40% to 60%
          of earnings as dividends is sustainable. Above 80% signals the
          dividend may be at risk during a downturn. Below 30% suggests room
          for future increases.
        </li>
        <li>
          <strong>Use dividend ETFs for simplicity:</strong> Funds like
          VYM (Vanguard High Dividend Yield), SCHD (Schwab U.S. Dividend
          Equity), and DGRO (iShares Core Dividend Growth) provide instant
          diversification across 200+ dividend payers for expense ratios
          under 0.10%.
        </li>
        <li>
          <strong>Track yield on cost, not current yield:</strong> Yield on
          cost measures your dividend income relative to what you actually
          paid. A stock bought at $40 now paying $3.20 yields 8.0% on cost
          even if current yield is only 3.5%. This metric reveals the real
          power of holding quality dividend growers.
        </li>
        <li>
          <strong>Reinvest in tax-advantaged accounts:</strong> Hold dividend
          stocks in IRAs or 401(k)s when possible to avoid annual tax drag.
          Qualified dividends in taxable accounts are taxed at 0% to 20%
          depending on income, but tax deferral still accelerates compounding.
          Compare account options using our{" "}
          <Link
            href="/guides/how-to-start-investing-1000"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            beginner investing guide
          </Link>
          .
        </li>
      </ul>

      <h2>Dividend Aristocrats and Kings</h2>
      <p>
        Dividend Aristocrats are S&P 500 companies that have raised their
        dividend for at least 25 consecutive years; the index listed 69
        members after the January 2026 reconstitution (S&P Dow Jones Indices).
        Dividend Kings have done so for 50+ years. Names such as Johnson &
        Johnson, Procter & Gamble, Coca-Cola, and 3M have demonstrated resilience
        through recessions, market crashes, and industry disruptions. While past
        performance does not guarantee future results, a 25-year track record of
        increasing payouts is a strong signal of financial discipline and
        shareholder commitment.
      </p>
      <p>
        Investors building a dividend income stream often anchor their portfolio
        with 5 to 10 Aristocrats or Kings, then supplement with higher-growth
        dividend payers for acceleration. This barbell approach balances
        reliability with growth potential. Read more about building a
        diversified foundation in our{" "}
        <Link
          href="/guides/compound-interest-real-examples"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          compound interest examples guide
        </Link>
        .
      </p>

      <h2>FAQ</h2>

      <h3>How often are dividends paid?</h3>
      <p>
        Most U.S. companies pay dividends quarterly (four times per year). Some
        REITs and international stocks pay monthly. A few companies pay
        semi-annually or annually. You can build a monthly income stream by
        holding stocks with staggered payment schedules — for example, one stock
        paying in January/April/July/October and another paying in
        February/May/August/November.
      </p>

      <h3>What is a good dividend yield?</h3>
      <p>
        For U.S. large-cap stocks, 2.0% to 4.0% is typical for established
        dividend payers. Below 2.0% often indicates a growth company with a
        small payout. Above 6.0% may signal an unsustainable payout or a
        falling stock price (which inflates the yield calculation).         The broad S&P 500 index yield was about 1.05% in October 2026 (Multpl),
        below the long-run historical average near 4% because index prices
        outran dividend growth.
      </p>
      <Sources
        items={[
          {
            label: "Multpl S&P 500 dividend yield (Oct. 20, 2026)",
            href: "https://www.multpl.com/s-p-500-dividend-yield",
          },
          {
            label: "S&P DJI Dividend Aristocrats research (2026 roster)",
            href: "https://www.spglobal.com/spdji/en/documents/research/research-sp500-dividend-aristocrats.pdf",
          },
        ]}
        checked="October 2026"
      />

      <h3>Are dividends taxed?</h3>
      <p>
        Qualified dividends (from stocks held more than 60 days) are taxed at
        long-term capital gains rates for tax year {TAX_DATA.taxYear}: 0% up to
        about {ltcg0Single} for single filers ({TAX_DATA.checkedOnLabel} IRS
        brackets), 15% for most middle-income taxpayers, and 20% above the top
        threshold. Non-qualified (ordinary) dividends — common on many REIT
        payouts — are taxed at regular income rates. Holding dividend stocks in
        tax-advantaged accounts like IRAs eliminates annual tax drag entirely.
      </p>
      <Sources items={[TAX_SOURCES.capitalGains]} checked="October 2026" />

      <h3>Should I reinvest dividends or take cash?</h3>
      <p>
        If you are in the accumulation phase (building wealth for future goals),
        reinvesting via DRIP maximizes compounding and is almost always the
        better choice. If you are in the distribution phase (relying on portfolio
        income for living expenses), taking cash makes sense. The calculator
        above lets you model both scenarios to see the long-term impact.
      </p>

      <h3>What happens if a company cuts its dividend?</h3>
      <p>
        A dividend cut reduces your income from that holding and usually causes
        the stock price to drop 10% to 30% on the announcement. Diversification
        is your primary protection: if one of 20 holdings cuts its dividend, you
        lose roughly 5% of portfolio income rather than a catastrophic amount.
        Monitor payout ratios and earnings trends to identify at-risk dividends
        before cuts happen.
      </p>
    </>
  );
}
