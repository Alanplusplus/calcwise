import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Sources } from "@/components/Sources";
import {
  LONG_TERM_BRACKETS,
  LONG_TERM_TOP_RATE,
  NIIT_RATE,
  NIIT_THRESHOLDS,
  RETIREMENT_LIMITS,
  TAX_DATA,
  TAX_SOURCES,
  usd,
} from "@/lib/tax-data";

const QD_ZERO_MAX_SINGLE = LONG_TERM_BRACKETS.single[0].upTo;
const QD_FIFTEEN_MAX_SINGLE = LONG_TERM_BRACKETS.single[1].upTo;

function qualifiedDividendTaxSummary(): string {
  return `Qualified dividends (from U.S. stocks held more than 60 days in the required window) are taxed at long-term capital gains rates for tax year ${TAX_DATA.taxYear}: 0% when taxable income is up to ${usd(QD_ZERO_MAX_SINGLE)}, 15% up to ${usd(QD_FIFTEEN_MAX_SINGLE)}, and ${LONG_TERM_TOP_RATE * 100}% above that (single filer). Non-qualified dividends, including most REIT distributions, are taxed as ordinary income. High earners may also owe the ${NIIT_RATE * 100}% net investment income tax when modified adjusted gross income exceeds ${usd(NIIT_THRESHOLDS.single)} (${usd(NIIT_THRESHOLDS.mfj)} married filing jointly). Holding dividend stocks in a Roth IRA eliminates annual dividend taxation on qualified growth and withdrawals in retirement.`;
}

export const metadata: Metadata = {
  title: "Dividend Investing for Beginners: How to Build Passive Income",
  description: "Learn how to start dividend investing from scratch. Covers dividend yield, DRIP reinvestment, Dividend Aristocrats, and a step-by-step portfolio plan with real numbers.",
  openGraph: {
    title: `Dividend Investing for Beginners: How to Build Passive Income | ${site.name}`,
    description: "Learn how to start dividend investing from scratch. Covers dividend yield, DRIP reinvestment, Dividend Aristocrats, and a step-by-step portfolio plan with real numbers.",
    type: "article",
  },
};

const faqs = [
  {
    question: "How much money do I need to start dividend investing?",
    answer: "You can start with as little as $100 using fractional shares available through most modern brokerages like Fidelity, Schwab, and Robinhood. However, starting with $1,000 to $5,000 provides a more meaningful income base. With $5,000 invested at a 3% yield, you earn $150/year in dividends — enough to see the compounding effect within a few years.",
  },
  {
    question: "What is the difference between dividend yield and dividend growth?",
    answer: "Dividend yield is the annual dividend divided by the current share price, expressed as a percentage. A $50 stock paying $2/year has a 4% yield. Dividend growth is the annual rate at which a company increases its dividend payment. A company raising its dividend from $2.00 to $2.10 has 5% dividend growth. For long-term investors, dividend growth often matters more than starting yield because it compounds over time.",
  },
  {
    question: "Are dividend stocks safe investments?",
    answer: "Dividend-paying stocks — especially Dividend Aristocrats with 25+ years of consecutive increases — are generally considered lower-risk than non-dividend stocks. However, no stock is completely safe. Companies can cut dividends during severe downturns, and share prices still fluctuate. Diversification across 15-20 dividend stocks in different sectors reduces individual company risk significantly.",
  },
  {
    question: "Should I invest in individual dividend stocks or dividend ETFs?",
    answer: "For beginners, broad dividend ETFs like SCHD (Schwab U.S. Dividend Equity) and VYM (Vanguard High Dividend Yield) provide instant diversification with expense ratios around 0.06%. Specialized funds such as NOBL (ProShares S&P 500 Dividend Aristocrats) cost more but track the Aristocrats list directly. Individual stocks offer more control but require more research. A balanced approach uses ETFs as a core (60-70%) with select Aristocrats (30-40%).",
  },
  {
    question: "How are dividends taxed?",
    answer: qualifiedDividendTaxSummary(),
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Dividend Investing for Beginners: How to Build Passive Income"
        description="Learn how to start dividend investing from scratch. Covers dividend yield, DRIP reinvestment, Dividend Aristocrats, and a step-by-step portfolio plan with real numbers."
        slug="dividend-investing-beginners"
        datePublished="2026-09-09"
        dateModified="2026-10-20"
        image="/images/guides/dividend-investing-beginners.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Dividend Investing", href: "/guides/dividend-investing-beginners" },
        ]}
      />

      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-brand-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Dividend Investing</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">Dividend Investing for Beginners: How to Build Passive Income</h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: October 2026</p>

      <article className="prose mt-8">
        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">Quick Answer</p>
          <p className="mt-1 text-ink-700">
            Dividend investing means buying stocks that pay you regular cash distributions from company profits. Starting with $5,000
            in dividend growth stocks yielding 3%, reinvesting all dividends (DRIP), assuming 8% annual dividend growth and 5% share price
            appreciation, and adding $200/month, you could build a portfolio generating about $8,300 per year in passive dividend income
            within 20 years (illustrative; actual returns vary).
          </p>
        </div>

        <Image
          src="/images/guides/dividend-investing-beginners.webp"
          alt="Dividend investing infographic: $5,000 starting investment at a 3% yield with 8% annual dividend growth, 5% share price growth, DRIP and $200 monthly contributions producing about $8,300 per year in dividend income after 20 years"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />

        <h2>What Is Dividend Investing and Why It Works</h2>

        <p>
          Dividend investing is a strategy where you buy shares in companies that distribute a portion of their profits to shareholders as
          regular cash payments. Unlike growth investing, where returns come exclusively from share price appreciation, dividend investing
          provides two income streams: the dividends themselves and potential capital gains on the stock price. This dual-return mechanism
          is what makes dividend investing one of the most reliable long-term wealth-building strategies available to individual investors.
        </p>

        <p>
          When you own 100 shares of a company paying $2.00 per share annually, you receive $200 in cash dividends each year — regardless
          of whether the stock price goes up or down. If you reinvest those dividends through a Dividend Reinvestment Plan (DRIP), you
          automatically purchase additional shares, which then generate their own dividends. This compounding cycle is what transforms
          modest initial investments into substantial income streams over time. The{" "}
          <Link href="/calculators/compound-interest" className="text-brand-600 hover:text-brand-800 font-medium">Compound Interest Calculator</Link>{" "}
          demonstrates exactly how this snowball effect works with real numbers.
        </p>

        <p>
          Historically, dividends have accounted for about 31% of the S&P 500's total return from December 1926 through early 2025,
          with the rest coming from price appreciation (S&P Dow Jones Indices research). Dividend income was an especially large share of
          returns in flat or weak price-return decades such as the 2000s. This resilience during choppy markets is a core advantage of the
          dividend investing approach.
        </p>

        <Sources
          items={[
            {
              label: "S&P Dow Jones Indices, S&P 500 Dividend Aristocrats research (Feb. 2025)",
              href: "https://www.spglobal.com/spdji/en/documents/research/research-sp500-dividend-aristocrats.pdf",
            },
          ]}
          checked="October 2026"
          note="Tier-2 market data; pre-1957 S&P 500 figures are back-tested."
        />

        <h2>Key Concepts Every Dividend Investor Must Know</h2>

        <h3>Dividend Yield</h3>

        <p>
          Dividend yield is the annual dividend payment divided by the current share price. A stock trading at $100 that pays $3.50 per
          year has a 3.5% yield. This metric lets you compare the income potential of different stocks and decide where to allocate capital.
          The S&P 500 dividend yield was about 1.1% as of September 2026 (S&P Dow Jones Indices data), while dedicated dividend stocks
          typically yield 2.5% to 5.0%.
          Yields above 6% often indicate elevated risk — the company may be paying out more than it can sustain, or the stock price has
          dropped sharply (inflating the yield mathematically).
        </p>

        <h3>Dividend Growth Rate</h3>

        <p>
          This measures how quickly a company increases its dividend year over year. A company paying $1.00/share this year and $1.08 next
          year has an 8% dividend growth rate. Over decades, dividend growth is arguably more important than starting yield. A stock with
          a 2.5% yield and 10% annual growth will pay more in dividends after year 8 than a stock with a 5% yield and 0% growth — and the
          gap widens every year after that. Use the{" "}
          <Link href="/calculators/dividend" className="text-brand-600 hover:text-brand-800 font-medium">Dividend Calculator</Link>{" "}
          to model how dividend growth compounds over any time horizon.
        </p>

        <h3>Payout Ratio</h3>

        <p>
          The payout ratio is the percentage of earnings a company distributes as dividends. A company earning $5.00 per share and paying
          $2.50 has a 50% payout ratio. Lower ratios (under 60%) generally indicate safer dividends because the company retains enough
          earnings to grow the business and maintain payments during temporary downturns. REITs are an exception — they typically pay
          75-95% of earnings due to tax structure requirements.
        </p>

        <h3>Dividend Aristocrats and Kings</h3>

        <p>
          Dividend Aristocrats are S&P 500 members that have increased their total dividend per share for at least 25 consecutive years
          (S&P Dow Jones Indices methodology). Dividend Kings is an informal label for companies with 50+ years of consecutive increases.
          Examples with verified streaks as of mid-October 2026 include Johnson & Johnson (64 consecutive annual increases, April 2026),
          Coca-Cola (64, February 2026), and Procter & Gamble (70, April 2026). Owning a diversified basket of Aristocrats — often through
          an ETF — is one of the simplest dividend strategies.
        </p>

        <Sources
          items={[
            {
              label: "S&P Dow Jones Indices, S&P Dividend Aristocrats methodology",
              href: "https://www.spglobal.com/spdji/en/documents/methodologies/methodology-sp-dividend-aristocrats-indices.pdf",
            },
            {
              label: "Johnson & Johnson dividend increase press release (Apr. 14, 2026)",
              href: "https://www.jnj.com/media-center/press-releases/johnson-johnson-announces-64th-consecutive-year-of-dividend-increase-raises-quarterly-dividend-by-3-1",
            },
            {
              label: "The Coca-Cola Company, 64th consecutive dividend increase (Feb. 19, 2026)",
              href: "https://www.coca-colacompany.com/media-center/board-elects-new-officer-and-approves-annual-dividend-increase",
            },
            {
              label: "Procter & Gamble dividend increase (Apr. 14, 2026)",
              href: "https://www.pginvestor.com/news/news-details/2026/PG-Declares-Dividend-Increase-for-April-2026/default.aspx",
            },
          ]}
          checked="October 2026"
        />

        <h2>Case Study: Priya Builds a Dividend Portfolio from Scratch</h2>

        <p>
          Priya, a 29-year-old data analyst in Charlotte, North Carolina, earning $78,000 per year, decided to start dividend investing
          in January 2024. She had $8,000 in savings earmarked for investing and could commit $400/month from her paycheck. Her goal: build
          a portfolio generating $24,000/year in dividends by age 55 to supplement her retirement income.
        </p>

        <p>
          Priya allocated her $8,000 initial investment across a diversified dividend portfolio:
        </p>

        <ul>
          <li><strong>SCHD (Schwab U.S. Dividend Equity ETF):</strong> $3,200 (40%)</li>
          <li><strong>Johnson & Johnson (JNJ):</strong> $1,600 (20%) — Dividend Aristocrat; 64th consecutive annual increase in 2026</li>
          <li><strong>Vanguard High Dividend Yield ETF (VYM):</strong> $1,600 (20%)</li>
          <li><strong>iShares Core Dividend Growth ETF (DGRO):</strong> $1,200 (15%)</li>
          <li><strong>ProShares S&P 500 Dividend Aristocrats ETF (NOBL):</strong> $400 (5%)</li>
        </ul>

        <p>
          Priya targets a blended starting yield of about 3.5%, 8% annual dividend growth, 5% share price appreciation, and full DRIP —
          the same mechanics as our{" "}
          <Link href="/calculators/dividend" className="text-brand-600 hover:text-brand-800 font-medium">Dividend Calculator</Link>.
          She enabled DRIP on all positions and set up automatic $400/month contributions. Here is her illustrative trajectory:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Year</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Portfolio Value</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Annual Dividends</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Monthly Income</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Yield on Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Year 1</td>
                <td className="px-4 py-3 text-ink-800">$13,700</td>
                <td className="px-4 py-3 text-green-700">$475</td>
                <td className="px-4 py-3 text-ink-800">$40</td>
                <td className="px-4 py-3 text-ink-800">3.8%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Year 5</td>
                <td className="px-4 py-3 text-ink-800">$42,200</td>
                <td className="px-4 py-3 text-green-700">$1,634</td>
                <td className="px-4 py-3 text-ink-800">$136</td>
                <td className="px-4 py-3 text-ink-800">5.3%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Year 10</td>
                <td className="px-4 py-3 text-ink-800">$97,200</td>
                <td className="px-4 py-3 text-green-700">$4,308</td>
                <td className="px-4 py-3 text-ink-800">$359</td>
                <td className="px-4 py-3 text-ink-800">8.0%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Year 15</td>
                <td className="px-4 py-3 text-ink-800">$190,000</td>
                <td className="px-4 py-3 text-green-700">$9,618</td>
                <td className="px-4 py-3 text-ink-800">$802</td>
                <td className="px-4 py-3 text-ink-800">12.7%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Year 20</td>
                <td className="px-4 py-3 text-ink-800">$353,000</td>
                <td className="px-4 py-3 text-green-700">$20,447</td>
                <td className="px-4 py-3 text-ink-800">$1,704</td>
                <td className="px-4 py-3 text-ink-800">20.9%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Year 26 (age 55)</td>
                <td className="px-4 py-3 text-ink-800">$744,000</td>
                <td className="px-4 py-3 text-green-700">$50,470</td>
                <td className="px-4 py-3 text-ink-800">$4,206</td>
                <td className="px-4 py-3 text-ink-800">40.8%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          By age 55, Priya's illustrative portfolio generates about $50,500 in annual dividends — more than double her original $24,000 goal.
          The key drivers: consistent $400/month contributions, DRIP reinvestment, and dividend growth. Her total out-of-pocket investment over
          26 years is $132,800 ($8,000 + $400 × 312 months); the portfolio could be worth about $744,000 producing roughly $4,200 per month in
          passive income under these assumptions (not guaranteed).
        </p>

        <Sources
          items={[
            {
              label: "Moody's Analytics / S&P Dow Jones Indices, S&P 500 dividend yield (Sep. 2026)",
              href: "https://www.economy.com/united-states/s-and-p-500-dividend-yield",
            },
          ]}
          checked="October 2026"
          note="Tier-2 index data. Priya's table uses 3.5% starting yield, 8% dividend growth, 5% price growth, and monthly DRIP."
        />

        <h2>Dividend Investing Strategies Compared</h2>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Strategy</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Starting Yield</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Dividend Growth</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Best For</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">Dividend Growth</td>
                <td className="px-4 py-3 text-ink-800">1.5-3.0%</td>
                <td className="px-4 py-3 text-ink-800">8-15%/year</td>
                <td className="px-4 py-3 text-ink-800">Long-term wealth building (15+ years)</td>
                <td className="px-4 py-3 text-ink-800">Low-Medium</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">High Yield</td>
                <td className="px-4 py-3 text-ink-800">4.0-7.0%</td>
                <td className="px-4 py-3 text-ink-800">2-5%/year</td>
                <td className="px-4 py-3 text-ink-800">Immediate income needs</td>
                <td className="px-4 py-3 text-ink-800">Medium-High</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">Dividend Aristocrats</td>
                <td className="px-4 py-3 text-ink-800">2.0-3.5%</td>
                <td className="px-4 py-3 text-ink-800">6-10%/year</td>
                <td className="px-4 py-3 text-ink-800">Reliability and consistency</td>
                <td className="px-4 py-3 text-ink-800">Low</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">REIT Focused</td>
                <td className="px-4 py-3 text-ink-800">4.0-6.5%</td>
                <td className="px-4 py-3 text-ink-800">3-6%/year</td>
                <td className="px-4 py-3 text-ink-800">Real estate exposure + high income</td>
                <td className="px-4 py-3 text-ink-800">Medium</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">Dividend ETF</td>
                <td className="px-4 py-3 text-ink-800">2.5-4.0%</td>
                <td className="px-4 py-3 text-ink-800">5-8%/year</td>
                <td className="px-4 py-3 text-ink-800">Beginners and hands-off investors</td>
                <td className="px-4 py-3 text-ink-800">Low</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How Dividends Are Taxed (2026)</h2>

        <p>
          {qualifiedDividendTaxSummary()} To qualify for the lower rates, you generally must hold the stock for at least 61 days during the
          121-day period that begins 60 days before the ex-dividend date (IRS Form 1099-DIV instructions). REIT and many partnership
          distributions are usually non-qualified. In a taxable account, you may owe estimated tax if dividend income is large; in a Roth IRA,
          qualified withdrawals avoid federal tax on growth, and you can contribute up to {usd(RETIREMENT_LIMITS.ira)} in 2026 if eligible
          (plus catch-up if age 50+).
        </p>

        <Sources
          items={[
            TAX_SOURCES.capitalGains,
            TAX_SOURCES.revProc,
            TAX_SOURCES.niit,
            {
              label: "IRS Topic 404, Dividends (Oct. 8, 2026)",
              href: "https://www.irs.gov/taxtopics/tc404",
            },
            {
              label: "IRS Form 1099-DIV instructions, qualified dividends",
              href: "https://www.irs.gov/instructions/i1099div",
            },
            TAX_SOURCES.retirementLimits,
          ]}
          checked={TAX_DATA.checkedOnLabel}
        />

        <h2>Step-by-Step Guide: Start Dividend Investing Today</h2>

        <p>
          <strong>Step 1: Open a brokerage account.</strong> Choose a no-fee brokerage that supports DRIP and fractional shares. Fidelity,
          Charles Schwab, and Vanguard are the top three for dividend investors. Open both a taxable brokerage account and a Roth IRA —
          hold higher-yield stocks (REITs, high-yield payers) in the Roth to shelter dividends from taxes.
        </p>

        <p>
          <strong>Step 2: Set your monthly investment budget.</strong> Determine how much you can invest each month after covering expenses
          and emergency fund contributions. Even $100/month builds meaningful dividend income over time. Use a{" "}
          <Link href="/calculators/investment-return" className="text-brand-600 hover:text-brand-800 font-medium">Investment Return Calculator</Link>{" "}
          to project what your monthly contributions could grow to over 10, 20, or 30 years.
        </p>

        <p>
          <strong>Step 3: Build a diversified portfolio.</strong> Start with 2-3 dividend ETFs (SCHD, VYM, or DGRO) for broad exposure.
          As your portfolio grows past $10,000, begin adding individual Dividend Aristocrats in sectors you understand. Target 15-20
          holdings across at least 7 sectors for adequate diversification.
        </p>

        <p>
          <strong>Step 4: Enable DRIP on every position.</strong> Automatic dividend reinvestment is the single most important action
          for long-term wealth building. It eliminates the temptation to spend dividends and ensures compounding works at maximum efficiency.
        </p>

        <p>
          <strong>Step 5: Monitor quarterly and rebalance annually.</strong> Check dividend announcements each quarter. Watch for payout
          ratios creeping above 75% or earnings declining for two consecutive quarters — these are warning signs. Once per year, rebalance
          positions that have drifted more than 5% from your target allocation.
        </p>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Numbers</p>
          <p className="mt-1 text-sm text-ink-600">Use our free calculator to see how much dividend income your portfolio could generate.</p>
          <Link href="/calculators/dividend" className="mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
            Open Dividend Calculator
          </Link>
        </div>

        <h2>Frequently Asked Questions</h2>

        <h3>How much money do I need to start dividend investing?</h3>
        <p>
          You can start with as little as $100 using fractional shares available through most modern brokerages like Fidelity, Schwab, and
          Robinhood. However, starting with $1,000 to $5,000 provides a more meaningful income base. With $5,000 invested at a 3% yield,
          you earn $150/year in dividends — enough to see the compounding effect within a few years.
        </p>

        <h3>What is the difference between dividend yield and dividend growth?</h3>
        <p>
          Dividend yield is the annual dividend divided by the current share price. A $50 stock paying $2/year has a 4% yield.
          Dividend growth is the rate at which a company increases its dividend annually. A company raising its dividend from $2.00 to $2.10
          has 5% growth. For long-term investors, growth often matters more because it compounds — a 2.5% yield growing at 10% per year
          surpasses a static 5% yield within 8 years. See the power of compounding with our{" "}
          <Link href="/guides/compound-interest-real-examples" className="text-brand-600 hover:text-brand-800 font-medium">guide to compound interest with real-life examples</Link>.
        </p>

        <h3>Are dividend stocks safe investments?</h3>
        <p>
          Dividend-paying stocks — especially Dividend Aristocrats with 25+ years of consecutive increases — are generally lower-risk than
          non-dividend stocks. However, no stock is completely safe. Companies can cut dividends during severe downturns. Diversifying across
          15-20 stocks in different sectors significantly reduces individual company risk. REITs, utilities, and consumer staples tend to have
          the most stable dividends.
        </p>

        <h3>Should I invest in individual dividend stocks or dividend ETFs?</h3>
        <p>
          For beginners, broad ETFs such as SCHD and VYM provide instant diversification with expense ratios around 0.06%. NOBL tracks
          Dividend Aristocrats directly but charges a higher fee. Individual stocks offer more control but require more research. A balanced
          approach uses ETFs as a 60-70% core with select Aristocrats for the remaining 30-40%.
        </p>

        <h3>How are dividends taxed?</h3>
        <p>{qualifiedDividendTaxSummary()}</p>

        <Sources
          items={[TAX_SOURCES.capitalGains, TAX_SOURCES.revProc, TAX_SOURCES.niit, TAX_SOURCES.retirementLimits]}
          checked={TAX_DATA.checkedOnLabel}
        />
      </article>
    </div>
  );
}
