import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

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
      "Yes. Major brokerages like Fidelity, Schwab, and Vanguard have $0 account minimums and $0 commissions on stock and ETF trades. Fractional shares let you buy into funds like VTI or VOO with any dollar amount. A $1,000 initial investment plus consistent monthly contributions is how most millionaire-next-door investors actually started.",
  },
  {
    question: "Should I invest $1,000 in a Roth IRA or a taxable brokerage account?",
    answer:
      "For most beginners under age 50 with earned income, a Roth IRA is the better first choice. You contribute after-tax dollars, but all growth and qualified withdrawals in retirement are tax-free. The 2026 contribution limit is $7,000 per year ($583/month), so your $1,000 fits easily. Use a taxable brokerage only after maxing your Roth IRA and any employer 401(k) match.",
  },
  {
    question: "What is the best thing to buy with $1,000 as a beginner?",
    answer:
      "A broad market index fund or ETF. VTI (Vanguard Total Stock Market ETF) at 0.03% expense ratio gives you exposure to roughly 3,500 U.S. companies in one purchase. VOO (S&P 500 ETF) is a solid alternative with a similar cost. Avoid individual stocks, crypto, and actively managed funds with fees above 0.50% — the data consistently shows low-cost index funds outperform most stock pickers over 10+ years.",
  },
  {
    question: "How much will $1,000 grow if I invest it and add $100/month?",
    answer:
      "At an 8% average annual return, $1,000 invested today plus $100/month grows to approximately $20,500 in 10 years, $63,800 in 20 years, and $174,800 in 30 years. At 10%, those numbers rise to roughly $23,200, $83,300, and $245,900. Actual returns vary year to year — use our Investment Return Calculator to model different scenarios.",
  },
  {
    question: "Do I need a financial advisor to start investing with $1,000?",
    answer:
      "No. For a simple index fund strategy, a robo-advisor or self-directed account at Fidelity, Schwab, or Vanguard is sufficient. Robo-advisors charge 0.25% annually ($2.50 per $1,000) for automated rebalancing. Human advisors typically charge 1% ($10 per $1,000) and rarely make sense until your portfolio exceeds $250,000. At $1,000, DIY with a target-date fund or total market index fund saves you hundreds in fees over a decade.",
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
            How to Start Investing with $1,000: A Beginner&apos;s Step-by-Step
            Guide
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            You do not need $10,000 or a finance degree to start building wealth.
            With $1,000, zero-commission brokerages, and fractional shares, you
            can own a piece of the entire U.S. stock market today. This guide
            walks through exactly where to put your money, what to buy, and how
            to set it up so investing becomes automatic.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: August 2026</p>
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
              (0.03% expense ratio) or VTSAX — one fund, thousands of companies
            </li>
            <li>
              <strong>Minimum needed:</strong> $1.00 — fractional shares mean
              no account minimums at major brokerages
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
              alt="Infographic showing how to start investing with $1,000: open a Roth IRA, buy a broad market index fund like VTI, and set up monthly auto-investing for long-term compound growth"
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
            needing $280 for a full share. <strong>$0 commissions</strong> mean
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
                  <td className="px-4 py-3">Yes ($5 minimum)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Vanguard</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">Yes ($1 minimum)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-ink-700">
            The math favors starting now over waiting to save more. $1,000
            invested at age 25 with an 8% average return grows to $10,063 by age
            55 — even with zero additional contributions. Wait until you have
            $5,000 at age 30 and you lose five years of compounding, dropping
            that same outcome to $6,848. Time in the market beats timing the
            market, and $1,000 today beats $5,000 in three years.
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
                  <td className="px-4 py-3">$7,000/year</td>
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
                  <td className="px-4 py-3">VTI or VTSAX (0.04% ER)</td>
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
                    Diversified ETF portfolio (+ 0.25% management fee)
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
              fee costs you $25/year on $10,000 versus $0.30/year with VTI
              alone.
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
                    30-Year Fee Drag (est.)
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
                  <td className="px-4 py-3 text-brand-700">~$450</td>
                  <td className="px-4 py-3">15 minutes to set up</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">DIY Roth IRA + VTSAX</td>
                  <td className="px-4 py-3">$0.40 (0.04% ER)</td>
                  <td className="px-4 py-3 text-brand-700">~$600</td>
                  <td className="px-4 py-3">15 minutes to set up</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Robo-advisor (Betterment/Wealthfront)</td>
                  <td className="px-4 py-3">$3.40 (0.25% + fund ER)</td>
                  <td className="px-4 py-3 text-amber-700">~$4,200</td>
                  <td className="px-4 py-3">5 minutes to set up</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Actively managed fund (1.0% ER)</td>
                  <td className="px-4 py-3">$10.00</td>
                  <td className="px-4 py-3 text-red-700">~$12,400</td>
                  <td className="px-4 py-3">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *30-year fee drag estimates assume 8% annual growth and constant
            balance growth. Actual fees compound against returns over time.
          </p>
        </section>

        {/* Section 3: What to Buy */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            What to Buy: Index Funds That Work for Beginners
          </h2>
          <p className="mt-4 text-ink-700">
            You need exactly one fund to start. Pick a broad, low-cost index fund
            that tracks the U.S. stock market (or the S&P 500 as a close proxy).
            Here are the three best options for a $1,000 starter portfolio, plus
            a target-date fund if you want zero decisions.
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
                  <td className="px-4 py-3">12.4%</td>
                  <td className="px-4 py-3">~500 large U.S. companies</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">VTI</td>
                  <td className="px-4 py-3">Total Market ETF</td>
                  <td className="px-4 py-3">0.03%</td>
                  <td className="px-4 py-3">12.2%</td>
                  <td className="px-4 py-3">~3,500 U.S. companies</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">VTSAX</td>
                  <td className="px-4 py-3">Total Market Mutual Fund</td>
                  <td className="px-4 py-3">0.04%</td>
                  <td className="px-4 py-3">12.2%</td>
                  <td className="px-4 py-3">Same as VTI (Admiral shares)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">VLXVX (2065)</td>
                  <td className="px-4 py-3">Target Date Fund</td>
                  <td className="px-4 py-3">0.08%</td>
                  <td className="px-4 py-3">10.8%*</td>
                  <td className="px-4 py-3">Stocks + bonds, auto-rebalanced</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *10-year returns are annualized averages through December 2025. Past
            performance does not guarantee future results. VLXVX launched in 2020;
            return reflects since-inception performance.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                VOO — Best if you want simplicity
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Tracks the S&P 500 — the 500 largest U.S. companies including
                Apple, Microsoft, Nvidia, and Amazon. At 0.03% expense ratio, you
                pay $0.30 per year on every $1,000 invested. Over 10 years, VOO
                returned 12.4% annually, turning $1,000 into approximately
                $3,220 before any additional contributions.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                VTI / VTSAX — Best for maximum diversification
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Holds roughly 3,500 U.S. stocks — large, mid, and small cap. VTI
                is the ETF version (trade anytime); VTSAX is the mutual fund
                version (same holdings, $3,000 minimum for Admiral shares at
                Vanguard, but $0 minimum at Fidelity if offered). The 0.03-0.04%
                expense ratio is among the lowest available anywhere.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Target Date Fund — Best if you want zero maintenance
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Pick the fund closest to when you turn 65 (e.g., Vanguard Target
                Retirement 2065 — VLXVX if you are 23 today). It starts nearly
                100% in stocks and automatically shifts toward bonds as you age.
                The 0.08% fee is slightly higher than VTI, but you never need to
                rebalance or pick a bond fund. One purchase, done forever.
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
                  <li>Kept student loans at minimum ($127/month)</li>
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
                    $174,816
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    $37,000 contributed + $137,816 growth
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">The Tax Advantage</h4>
              <p className="mt-2 text-sm text-ink-700">
                Because Jordan used a Roth IRA, the entire $174,816 at age 53
                is tax-free upon withdrawal in retirement. If the same portfolio
                were in a taxable brokerage account, roughly $137,816 in gains
                would be subject to 15% long-term capital gains tax — about
                $20,672 owed to the IRS. The Roth IRA saved Jordan over $20,000
                in taxes on the same investment strategy.
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
                were all &quot;sure things&quot; until they were not. A single
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
                Waiting for a &quot;correction&quot; before investing $1,000
                sounds prudent but costs you money. An investor who stayed fully
                invested in the S&P 500 from 2005-2024 earned 9.8% annually. One
                who missed the 10 best days (often during crashes) earned just
                5.6%. You cannot predict those days. Invest on a schedule
                regardless of headlines.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. Not investing at all
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The most expensive mistake is keeping $1,000 in a checking account
                earning 0.01% while inflation runs at 2-3%. After 10 years,
                $1,000 in checking becomes $1,001 — but its purchasing power
                drops to roughly $750 in today&apos;s dollars. The same $1,000 in
                VTI at 8% becomes $2,159. Analysis paralysis costs real money
                every month you wait.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                4. Choosing high-fee funds
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                A 1.0% expense ratio fund costs $10/year on $1,000 versus $0.30
                for VTI. That gap widens as your balance grows. On a $50,000
                portfolio over 30 years, the difference between a 1.0% fee fund
                and a 0.03% index fund is approximately $100,000 in lost
                compound growth. Always check the expense ratio before buying —
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
                  &quot;Individual Roth IRA&quot; — not a managed account or
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
                  brokerage, or VTSAX at Vanguard. Do not let the transfer time
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
                  balance). Select &quot;Market order&quot; for immediate
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

        {/* Related Guides */}
        <section className="mt-12 border-t border-ink-200 pt-8">
          <h2 className="text-lg font-semibold text-ink-800">
            Related Guides
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/guides/compound-interest-real-examples"
                className="text-brand-600 hover:underline"
              >
                Compound Interest: 5 Real-Life Examples That Show Its Power
              </Link>
            </li>
            <li>
              <Link
                href="/guides/save-50000-in-3-years"
                className="text-brand-600 hover:underline"
              >
                How to Save $50,000 in 3 Years: A Realistic Plan
              </Link>
            </li>
            <li>
              <Link
                href="/guides/401k-vs-roth-ira"
                className="text-brand-600 hover:underline"
              >
                401(k) vs Roth IRA: Which Retirement Account Is Better for You?
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
