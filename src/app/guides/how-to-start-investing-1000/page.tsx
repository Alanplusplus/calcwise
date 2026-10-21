import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import { TAX_SOURCES } from "@/lib/tax-data";

export const metadata: Metadata = {
  title: "How to Start Investing with $1,000: A Beginner's Step-by-Step Guide",
  description:
    "Learn how to start investing with $1,000: where to open an account, what index funds to buy (VTI, VOO, VTSAX), and a real case study with 10-, 20-, and 30-year projections.",
  keywords: [
    "how to start investing with $1000",
    "investing with 1000 dollars",
    "beginner investing guide",
    "first investment 1000",
    "Roth IRA beginner",
    "index fund investing",
  ],
};

const faqs = [
  {
    question: "Is $1,000 enough to start investing?",
    answer:
      "Yes. Fidelity, Charles Schwab, and Vanguard all have $0 account minimums and $0 online commissions on U.S. stock and ETF trades. As of October 2026, Fidelity, Schwab, and Vanguard each let you buy a fractional share for as little as $1 (at Vanguard this applies to Vanguard ETFs such as VTI and VOO). A $1,000 starting balance plus a steady monthly contribution is enough to own the entire U.S. market through a single fund.",
  },
  {
    question: "Should I invest $1,000 in a Roth IRA or a taxable brokerage account?",
    answer:
      "For most beginners under age 50 with earned income, a Roth IRA is the better first choice. You contribute after-tax dollars, but all growth and qualified withdrawals in retirement are tax-free. The 2026 IRA contribution limit is $7,500 per year ($625/month), up from $7,000 in 2025, so your $1,000 fits easily. Use a taxable brokerage only after maxing your Roth IRA and any employer 401(k) match.",
  },
  {
    question: "Is there an income limit for contributing to a Roth IRA in 2026?",
    answer:
      "Yes. For 2026 the Roth IRA contribution phase-out is $153,000-$168,000 of modified adjusted gross income for single filers and heads of household, and $242,000-$252,000 for married couples filing jointly (IRS Notice 2025-67). Below the lower number you can contribute the full $7,500; above the upper number you cannot contribute directly. Most people starting with $1,000 are well under these limits.",
  },
  {
    question: "What is the best thing to buy with $1,000 as a beginner?",
    answer:
      "A broad market index fund or ETF. VTI (Vanguard Total Stock Market ETF) at 0.03% expense ratio gives you exposure to roughly 3,500 U.S. companies in one purchase. VOO (S&P 500 ETF) is a solid alternative with the same 0.03% cost. Avoid individual stocks, crypto, and actively managed funds with fees above 0.50% — a 1.0% fund costs $10 per year on $1,000 versus $0.30 for VTI, and that gap compounds to about $2,450 over 30 years at an 8% gross return.",
  },
  {
    question: "How much will $1,000 grow if I invest it and add $100/month?",
    answer:
      "At an 8% average annual return compounded monthly, $1,000 invested today plus $100/month grows to approximately $20,514 in 10 years, $63,829 in 20 years, and $159,972 in 30 years. At 6%, those numbers are $18,207, $49,514, and $106,474; at 10%, $23,192, $83,265, and $245,886. Actual returns vary year to year — use our Investment Return Calculator to model different scenarios.",
  },
  {
    question: "Do I need a financial advisor to start investing with $1,000?",
    answer:
      "No. For a simple index fund strategy, a self-directed account at Fidelity, Schwab, or Vanguard is sufficient. Wealthfront charges 0.25% annually ($2.50 per $1,000), and Betterment charges 0.25% or a flat $5 per month ($60 per year, or 6% of a $1,000 balance) unless you hold $24,000 or set up $200/month in recurring deposits. Human advisors typically charge about 1% ($10 per $1,000) and rarely make sense this early. At $1,000, DIY with a total market ETF or a target-date fund keeps your annual cost under $1.",
  },
  {
    question: "Why did the 10-year returns in this guide look higher than the 8% used in projections?",
    answer:
      "Trailing 10-year returns through September 30, 2026 were 15.29% for VOO and 14.70% for VTI, which is unusually strong. Over the 20 years ending December 2025, J.P. Morgan Asset Management reports the S&P 500 returned about 11.0% annualized. We use 8% for the projections as a deliberately cautious planning number that leaves room for weaker decades, fees, and inflation. Treat past returns as context, not a forecast.",
  },
];

export default function HowToStartInvesting1000Guide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="How to Start Investing with $1,000: A Beginner's Step-by-Step Guide"
        description="Learn how to start investing with $1,000: where to open an account, what index funds to buy (VTI, VOO, VTSAX), and a real case study with 10-, 20-, and 30-year projections."
        slug="how-to-start-investing-1000"
        datePublished="2026-08-24"
        dateModified="2026-10-16"
        image="/images/guides/how-to-start-investing-1000.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "How to Start Investing with $1,000",
            href: "/guides/how-to-start-investing-1000",
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Investing Basics
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            How to Start Investing with $1,000: A Beginner's Step-by-Step
            Guide
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            You do not need $10,000 or a finance degree to start building wealth.
            With $1,000, zero-commission brokerages, and fractional shares, you
            can own a piece of the entire U.S. stock market today. This guide
            walks through exactly where to put your money, what to buy, and how
            to set it up so investing becomes automatic.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: October 2026</p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Best account:</strong> Roth IRA at Fidelity, Schwab, or
              Vanguard — tax-free growth on every dollar
            </li>
            <li>
              <strong>Best investment:</strong> Broad market index fund like VTI
              (0.03% expense ratio) or FXAIX (0.015%) — one fund, hundreds to
              thousands of companies. VTSAX needs $3,000 at Vanguard, so VTI is
              the practical $1,000 choice
            </li>
            <li>
              <strong>Minimum needed:</strong> $1.00 — Fidelity, Schwab, and
              Vanguard all allow $1 fractional purchases (October 2026)
            </li>
            <li>
              <strong>2026 Roth IRA limit:</strong> $7,500 ($625/month), up from
              $7,000 in 2025
            </li>
            <li>
              <strong>Next step:</strong> Set up $50-$100/month auto-invest and
              forget about it for 20 years
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Model your growth with our{" "}
            <Link
              href="/calculators/investment-return"
              className="font-medium text-brand-600 underline"
            >
              Investment Return Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/compound-interest"
              className="font-medium text-brand-600 underline"
            >
              Compound Interest Calculator
            </Link>
            .
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/how-to-start-investing-1000.webp"
              alt="Infographic showing how to start investing with $1,000: open a Roth IRA ($7,500 limit in 2026), buy a low-cost index fund like VTI or FXAIX, auto-invest $100/month, and grow to $20,514, $63,829, and $159,972 after 10, 20, and 30 years at 8%"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              The beginner path: Roth IRA + low-cost index fund + automatic monthly contributions
            </figcaption>
          </figure>
        </section>

        {/* Section 1: Why $1,000 Is Enough */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Why $1,000 Is Enough to Start Investing
          </h2>
          <p className="mt-4 text-ink-700">
            A decade ago, starting with $1,000 meant paying $7-$10 per trade,
            needing $3,000 minimums for mutual funds, and buying whole shares
            only. That world is gone. In 2026, the barriers to entry have
            effectively disappeared.
          </p>
          <p className="mt-4 text-ink-700">
            <strong>Fractional shares</strong> let you buy $50 of VTI instead of
            needing roughly $380 for a full share (it closed near $380 in late
            September 2026). <strong>$0 commissions</strong> mean
            Fidelity, Charles Schwab, and Vanguard charge nothing to buy or
            sell stocks and ETFs. <strong>No account minimums</strong> mean you
            can open a Roth IRA with $1 if you wanted to — though starting with
            $1,000 gives you meaningful diversification from day one.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Brokerage
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Account Minimum
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Stock/ETF Commissions
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Fractional Shares
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Fidelity</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">Yes ($1 minimum)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Charles Schwab</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">Yes ($1 minimum; most U.S. stocks and ETFs)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Vanguard</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">Yes ($1 minimum; Vanguard ETFs only)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            Schwab raised its fractional-share coverage in 2026: the old Stock
            Slices program (S&P 500 stocks only, $5 minimum) is now simply
            "fractional shares" on most U.S. stocks and ETFs with a $1
            minimum.
          </p>
          <Sources
            items={[
              {
                label: "Fidelity",
                href: "https://www.fidelity.com/trading/fractional-shares",
              },
              {
                label: "Schwab",
                href: "https://www.schwab.com/fractional-shares-stock-slices",
              },
              {
                label: "Vanguard",
                href: "https://investor.vanguard.com/investment-products/etfs/etf-fees",
              },
            ]}
            checked="October 2026"
          />

          <p className="mt-6 text-ink-700">
            The math favors starting now over waiting to save more. $1,000
            invested at age 25 with an 8% average return grows to $10,063 by age
            55 — even with zero additional contributions. Start the same $1,000
            at age 30 instead and it reaches only $6,848 by 55, a 32% smaller
            result for five idle years. Waiting to build a bigger lump sum does
            not pay either: investing $1,000 now and adding $4,000 at age 30
            ends at $37,457 by age 55, versus $34,242 if you hold everything
            in cash and invest $5,000 at 30. Starting now is worth $3,215 here,
            and every extra year of delay shrinks the final balance by about 7%.
          </p>
        </section>

        {/* Section 2: Where to Invest */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Where to Invest Your First $1,000
          </h2>
          <p className="mt-4 text-ink-700">
            Your first decision is not what stock to pick — it is what type of
            account to open. The account wrapper determines how your money is
            taxed, which directly affects how much you keep over 30 years.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Account Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Tax Benefit
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    2026 Limit
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Best For
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Example Fund
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">Roth IRA</td>
                  <td className="px-4 py-3">
                    Tax-free growth and withdrawals in retirement
                  </td>
                  <td className="px-4 py-3">$7,500/year ($625/month)</td>
                  <td className="px-4 py-3 text-brand-700">
                    Most beginners (best first choice)
                  </td>
                  <td className="px-4 py-3">VTI (0.03% ER) or FXAIX (0.015% ER)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Taxable Brokerage</td>
                  <td className="px-4 py-3">None — pay taxes on dividends and gains</td>
                  <td className="px-4 py-3">Unlimited</td>
                  <td className="px-4 py-3">
                    After maxing Roth IRA; mid-term goals (5-10 years)
                  </td>
                  <td className="px-4 py-3">VTI (0.03% ER); VTSAX (0.04%) once you reach $3,000 at Vanguard</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Robo-Advisor</td>
                  <td className="px-4 py-3">
                    Same as underlying account (Roth or taxable)
                  </td>
                  <td className="px-4 py-3">Varies</td>
                  <td className="px-4 py-3">
                    Hands-off investors who want automatic rebalancing
                  </td>
                  <td className="px-4 py-3">
                    Diversified ETF portfolio (+ 0.25% management fee, or $5/month at Betterment under $24,000)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">Our Recommendation</p>
            <p className="mt-1 text-sm text-brand-700">
              Open a Roth IRA at Fidelity and buy FXAIX (Fidelity 500 Index
              Fund, 0.015% expense ratio) or VTI if you prefer an ETF. The Roth
              IRA gives you decades of tax-free compounding on a $1,000 start.
              Skip robo-advisors until your balance exceeds $10,000 — the 0.25%
              fee costs you $25/year on $10,000 versus $3/year with VTI alone.
              Betterment's Digital plan is worse at this size: a flat $5 per
              month is $60 per year, or 6% of a $1,000 balance, unless you
              automate $200/month or reach $24,000.
            </p>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Roth IRA vs Taxable vs Robo-Advisor: Cost Comparison on $1,000
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Option
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Annual Fees on $1,000
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    30-Year Fee Drag on $1,000 (est.)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Effort Required
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">DIY Roth IRA + VTI</td>
                  <td className="px-4 py-3">$0.30 (0.03% ER)</td>
                  <td className="px-4 py-3 text-brand-700">~$84</td>
                  <td className="px-4 py-3">15 minutes to set up</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">DIY Roth IRA + FXAIX</td>
                  <td className="px-4 py-3">$0.15 (0.015% ER)</td>
                  <td className="px-4 py-3 text-brand-700">~$42</td>
                  <td className="px-4 py-3">15 minutes to set up</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Wealthfront (0.25% + ~0.03% fund ER)</td>
                  <td className="px-4 py-3">$2.80</td>
                  <td className="px-4 py-3 text-amber-700">~$754</td>
                  <td className="px-4 py-3">5 minutes to set up</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Betterment Digital (under $24,000, under $200/mo deposits)</td>
                  <td className="px-4 py-3">$60.00 ($5/month, plus fund ER)</td>
                  <td className="px-4 py-3 text-red-700">Flat fee = 6% of $1,000 per year</td>
                  <td className="px-4 py-3">5 minutes to set up</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Actively managed fund (1.0% ER)</td>
                  <td className="px-4 py-3">$10.00</td>
                  <td className="px-4 py-3 text-red-700">~$2,450</td>
                  <td className="px-4 py-3">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *30-year fee drag = ending value at 8% gross return minus ending
            value at (8% minus the fee), for a single $1,000 deposit with no
            additions: $10,063 versus $9,979 for VTI, $10,021 for FXAIX,
            $9,309 for Wealthfront, and $7,612 for a 1.0% fund. Fee data as of
            October 2026.
          </p>
          <Sources
            items={[
              {
                label: "Wealthfront pricing",
                href: "https://www.wealthfront.com/pricing",
              },
              {
                label: "Betterment pricing",
                href: "https://www.betterment.com/pricing",
              },
              {
                label: "Fidelity FXAIX",
                href: "https://fundresearch.fidelity.com/mutual-funds/fees-and-prices/315911750",
              },
            ]}
            checked="October 2026"
          />
        </section>

        {/* Section 3: What to Buy */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            What to Buy: Index Funds That Work for Beginners
          </h2>
          <p className="mt-4 text-ink-700">
            You need exactly one fund to start. Pick a broad, low-cost index fund
            that tracks the U.S. stock market (or the S&P 500 as a close proxy).
            Here are the best options for a $1,000 starter portfolio, plus a
            target-date fund if you want zero decisions. Returns below are
            trailing figures through September 30, 2026 and are context, not a
            forecast.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Fund
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Expense Ratio
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    10-Year Avg Return
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Holdings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">VOO</td>
                  <td className="px-4 py-3">S&P 500 ETF</td>
                  <td className="px-4 py-3">0.03%</td>
                  <td className="px-4 py-3">15.29%</td>
                  <td className="px-4 py-3">~500 large U.S. companies</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">FXAIX</td>
                  <td className="px-4 py-3">S&P 500 Mutual Fund (Fidelity)</td>
                  <td className="px-4 py-3">0.015%</td>
                  <td className="px-4 py-3">15.32%</td>
                  <td className="px-4 py-3">~500 large U.S. companies, $0 minimum</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">VTI</td>
                  <td className="px-4 py-3">Total Market ETF</td>
                  <td className="px-4 py-3">0.03%</td>
                  <td className="px-4 py-3">14.70%</td>
                  <td className="px-4 py-3">~3,500 U.S. companies</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">VTSAX</td>
                  <td className="px-4 py-3">Total Market Mutual Fund</td>
                  <td className="px-4 py-3">0.04%</td>
                  <td className="px-4 py-3">14.69%</td>
                  <td className="px-4 py-3">Same as VTI (Admiral shares, $3,000 minimum)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">VLXVX (2065)</td>
                  <td className="px-4 py-3">Target Date Fund</td>
                  <td className="px-4 py-3">0.08%</td>
                  <td className="px-4 py-3">11.01%* (since July 2017)</td>
                  <td className="px-4 py-3">Stocks + bonds, auto-rebalanced, $1,000 minimum</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Sources
            items={[
              {
                label: "Vanguard Total Return Chart (Sept. 30, 2026)",
                href: "https://workplace.vanguard.com/content/dam/inst/iig-transformation/pdf/total_return_chart.pdf",
              },
              {
                label: "Fidelity FXAIX",
                href: "https://fundresearch.fidelity.com/mutual-funds/view-all/315911750",
              },
            ]}
            checked="October 2026"
            note="*Annualized total returns through September 30, 2026. VLXVX launched in July 2017, so it has no 10-year record; its 5-year return was 10.22%. Vanguard renamed its CRSP-benchmarked funds in 2026 (for example, &quot;Vanguard Morningstar Total Stock Market Index Fund&quot;), but the tickers VTI and VTSAX did not change. Past performance does not guarantee future results."
          />
          <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-900">
              Why the projections below use 8%, not 15%
            </p>
            <p className="mt-1 text-sm text-amber-800">
              The 10-year window ending September 2026 was unusually strong: $1,000
              in VOO at 15.29% would have become about $4,149. Over the longer 20
              years ending December 2025, J.P. Morgan Asset Management's data
              imply about 11.0% a year for the S&P 500 ($10,000 became $80,619).
              This guide plans with 8% so the numbers still work if the next
              decade is weaker; see the 6%, 8%, and 10% results in the case study.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                VOO — Best if you want simplicity
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Tracks the S&P 500 — the 500 largest U.S. companies including
                Apple, Microsoft, Nvidia, and Amazon. At 0.03% expense ratio, you
                pay $0.30 per year on every $1,000 invested. In the 10 years
                through September 30, 2026, VOO returned 15.29% annually,
                turning $1,000 into approximately $4,149 before any additional
                contributions. That stretch was unusually strong, so do not
                expect it to repeat.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                VTI / VTSAX — Best for maximum diversification
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Holds roughly 3,500 U.S. stocks — large, mid, and small cap. VTI
                is the ETF version (trade anytime, $1 minimum); VTSAX is the
                mutual fund version with the same holdings but a $3,000 minimum
                for Admiral shares at Vanguard. With $1,000, buy VTI now and
                consider VTSAX only if you are already a Vanguard mutual fund
                investor with $3,000 or more. The 0.03-0.04% expense ratio is
                among the lowest available anywhere.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Target Date Fund — Best if you want zero maintenance
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Pick the fund closest to the year you turn 65. A 23-year-old in
                2026 turns 65 in 2068, so Vanguard Target Retirement 2065
                (VLXVX) or 2070 (VSVNX) both fit. It starts nearly 100% in
                stocks (check the fund's current allocation) and automatically shifts toward bonds as you age. The
                0.08% fee is slightly higher than VTI (about $0.80 per year on
                $1,000), but you never need to rebalance or pick a bond fund.
                Vanguard's Target Retirement Investor shares have a $1,000
                minimum, so your starting amount qualifies exactly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Jordan, 23, $48K First Job, $1,000 Saved
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Starting Point</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Age: 23, first full-time job</li>
                  <li>Gross salary: $48,000/year ($4,000/month)</li>
                  <li>Take-home after taxes: ~$3,200/month</li>
                  <li>Savings available: $1,000</li>
                  <li>Employer 401(k): No match offered</li>
                  <li>Debt: $0 credit card, $12,000 student loans at 5.2%</li>
                  <li>Emergency fund: $2,400 (3 months expenses — already set)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">What Jordan Did</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Opened a Fidelity Roth IRA (15 minutes online)</li>
                  <li>Contributed full $1,000 as initial deposit</li>
                  <li>Bought FXAIX (Fidelity 500 Index, 0.015% ER)</li>
                  <li>Set up $100/month auto-transfer from checking</li>
                  <li>Scheduled auto-invest into FXAIX on the 1st of each month</li>
                  <li>Kept student loans at minimum ($128/month)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                Projected Portfolio Value (8% Average Annual Return)
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                Starting with $1,000 plus $100/month contributions, compounded
                monthly at 8%:
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-ink-50 p-4 text-center">
                  <p className="text-sm text-ink-500">After 10 Years (Age 33)</p>
                  <p className="mt-1 text-2xl font-bold text-brand-700">
                    $20,514
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    $13,000 contributed + $7,514 growth
                  </p>
                </div>
                <div className="rounded-lg bg-ink-50 p-4 text-center">
                  <p className="text-sm text-ink-500">After 20 Years (Age 43)</p>
                  <p className="mt-1 text-2xl font-bold text-brand-700">
                    $63,829
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    $25,000 contributed + $38,829 growth
                  </p>
                </div>
                <div className="rounded-lg bg-ink-50 p-4 text-center">
                  <p className="text-sm text-ink-500">After 30 Years (Age 53)</p>
                  <p className="mt-1 text-2xl font-bold text-brand-700">
                    $159,972
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    $37,000 contributed + $122,972 growth
                  </p>
                </div>
              </div>

              <h4 className="mt-6 font-semibold text-ink-800">
                What If Returns Are Lower or Higher? (Same $1,000 + $100/month)
              </h4>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-ink-200 bg-ink-50">
                      <th className="px-4 py-3 text-left font-semibold text-ink-800">
                        Annual Return
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-ink-800">
                        10 Years
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-ink-800">
                        20 Years
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-ink-800">
                        30 Years
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    <tr>
                      <td className="px-4 py-3">6% (cautious)</td>
                      <td className="px-4 py-3">$18,207</td>
                      <td className="px-4 py-3">$49,514</td>
                      <td className="px-4 py-3">$106,474</td>
                    </tr>
                    <tr className="bg-ink-50/50">
                      <td className="px-4 py-3 font-medium">8% (planning case)</td>
                      <td className="px-4 py-3 font-medium">$20,514</td>
                      <td className="px-4 py-3 font-medium">$63,829</td>
                      <td className="px-4 py-3 font-medium">$159,972</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">10% (optimistic)</td>
                      <td className="px-4 py-3">$23,192</td>
                      <td className="px-4 py-3">$83,265</td>
                      <td className="px-4 py-3">$245,886</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-ink-500">
                Monthly compounding, $100 added at the end of each month, no fees
                or taxes (Roth IRA), not adjusted for inflation. If inflation
                held at the 3.7% rate BLS reported for September 2026, the
                30-year 8% result would buy roughly what $53,800 buys today; at
                3% it would be about $65,900.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">The Tax Advantage</h4>
              <p className="mt-2 text-sm text-ink-700">
                Because Jordan used a Roth IRA, the entire $159,972 at age 53
                is tax-free upon withdrawal in retirement. If the same portfolio
                were in a taxable brokerage account, roughly $122,972 in gains
                would be subject to a 15% long-term capital gains rate
                (a common rate for middle incomes) — about $18,446 owed to the
                IRS. The Roth IRA saved Jordan over $18,000 in taxes on the same
                investment strategy. Jordan's $100/month is also well under the
                2026 Roth IRA limit of $7,500 per year ($625/month), so there is
                room to raise contributions with each raise.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Common Mistakes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            4 Common Mistakes When Starting with $1,000
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                1. Buying individual stocks
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Putting $1,000 into 3-5 individual stocks feels exciting but
                concentrates your risk. Enron, Lehman Brothers, and Blockbuster
                were all "sure things" until they were not. A single
                company can drop 50-100% — VTI dropped 34% in 2020 and recovered
                within months because it held hundreds of companies. With $1,000,
                diversification is not optional.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                2. Trying to time the market
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Waiting for a "correction" before investing $1,000
                sounds prudent but costs you money. J.P. Morgan Asset Management
                found that $10,000 left fully invested in the S&P 500 from
                January 2006 through December 2025 grew to $80,619 (about 11.0%
                a year). Missing just the 10 best days cut that to $35,866
                (about 6.6% a year). Six of the 10 best days came within two weeks
                of the 10 worst days, so you cannot dodge the bad ones without
                missing the good ones. Invest on a schedule regardless of
                headlines.
              </p>
              <Sources
                className="mt-2"
                items={[
                  {
                    label: "J.P. Morgan Asset Management",
                    href: "https://am.jpmorgan.com/sg/en/asset-management/per/insights/retirement-insights/retirement-resources/",
                  },
                ]}
                checked="October 2026"
              />
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. Not investing at all
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The most expensive mistake is leaving $1,000 in a checking account.
                The FDIC's September 2026 national average is 0.07% for
                interest checking and 0.37% for savings, while BLS reported
                consumer prices up 3.7% over the 12 months ending September 2026.
                After 10 years at 0.07%, $1,000 becomes $1,007 — but if inflation
                averaged 3.7%, its purchasing power drops to roughly $695 in
                today's dollars (about $744 at 3%). The same $1,000 in VTI
                at 8% becomes $2,159. Analysis paralysis costs real money every
                month you wait.
              </p>
              <Sources
                className="mt-2"
                items={[
                  {
                    label: "FDIC national rates",
                    href: "https://www.fdic.gov/national-rates-and-rate-caps",
                  },
                  {
                    label: "BLS CPI release",
                    href: "https://www.bls.gov/news.release/cpi.nr0.htm",
                  },
                ]}
                checked="October 2026"
              />
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                4. Choosing high-fee funds
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                A 1.0% expense ratio fund costs $10/year on $1,000 versus $0.30
                for VTI. That gap widens as your balance grows. On a $50,000
                portfolio over 30 years, the difference between a 1.0% fee fund
                and a 0.03% index fund is approximately $118,000 in lost
                compound growth ($498,957 versus $380,613 at an 8% gross
                return). Always check the expense ratio before buying —
                anything above 0.20% needs a specific justification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Step-by-Step */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: Invest Your First $1,000 This Week
          </h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Open a Roth IRA (Day 1 — 15 minutes)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Go to fidelity.com, schwab.com, or vanguard.com and open a
                  Roth IRA. You need your Social Security number, bank account
                  info for linking, and employment details. Select
                  "Individual Roth IRA" — not a managed account or
                  robo-advisor unless you specifically want one. There is no
                  minimum deposit to open.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Fund the account (Day 1-3)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Link your checking account and transfer $1,000. ACH transfers
                  typically take 1-3 business days to settle. While waiting,
                  research your fund choice: FXAIX at Fidelity, VTI/VOO at any
                  brokerage, or a Target Retirement fund at Vanguard (VTSAX
                  needs $3,000 there). Do not let the transfer time
                  become an excuse to delay — initiate it today.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Buy your index fund (Day 3-4)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Once cash settles, search for your fund ticker (e.g., FXAIX or
                  VTI) and click Buy. Enter $1,000 (or the full available
                  balance). Select "Market order" for immediate
                  execution. You now own a slice of the U.S. stock market. The
                  entire purchase takes under 2 minutes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Set up automatic monthly contributions (Day 4)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  In your Roth IRA settings, enable automatic investments:
                  transfer $50-$100/month from checking and auto-buy your index
                  fund. Schedule it for 1-2 days after payday. Jordan chose
                  $100/month — that is 3.1% of take-home pay on a $48,000
                  salary, a sustainable starting rate. Increase by $25 every time
                  you get a raise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            See What Your $1,000 Could Become
          </h2>
          <p className="mt-2 text-ink-600">
            Plug in your starting amount, monthly contribution, and expected
            return to see exactly how compound growth transforms a $1,000 start
            over 10, 20, or 30 years.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/investment-return"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Investment Return Calculator
            </Link>
            <Link
              href="/calculators/compound-interest"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Compound Interest Calculator
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-ink-200 bg-white"
              >
                <summary className="cursor-pointer px-5 py-4 font-medium text-ink-800 hover:text-brand-600">
                  {faq.question}
                </summary>
                <p className="px-5 pb-4 text-sm text-ink-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <Sources
          className="mt-8"
          items={[
            TAX_SOURCES.retirementLimits,
            {
              label: "Vanguard fund returns as of Sept. 30, 2026",
              href: "https://workplace.vanguard.com/content/dam/inst/iig-transformation/pdf/total_return_chart.pdf",
            },
            {
              label: "Vanguard fund minimums",
              href: "https://investor.vanguard.com/investment-products/mutual-funds/fees",
            },
          ]}
          checked="October 2026"
          note="Educational content, not personalized investment advice."
        />
        <RelatedGuides currentSlug="how-to-start-investing-1000" relatedSlugs={["compound-interest-real-examples", "401k-vs-roth-ira"]} />
      </article>
    </>
  );
}
