import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "Compound Interest: 5 Real-Life Examples That Show Its Power",
  description:
    "Real-life compound interest examples with exact numbers: retirement investing, credit card debt, student loans, and high-yield savings.",
  keywords: [
    "compound interest examples real life",
    "compound interest real world examples",
    "how compound interest works examples",
    "compound interest calculator examples",
    "rule of 72 examples",
  ],
};

const faqs = [
  {
    question: "What is a real-life example of compound interest working in your favor?",
    answer:
      "The clearest positive example is monthly retirement investing. Contributing $500 per month from age 25 to 65 at an 8% average annual return grows to approximately $1.74 million — even though you only deposited $240,000 out of pocket. The remaining $1.5 million comes entirely from compound growth on both your contributions and the returns they generate.",
  },
  {
    question: "How does compound interest hurt you with credit card debt?",
    answer:
      "Credit cards compound interest against you daily or monthly. A $5,000 balance at 22% APR with minimum payments of roughly $125/month means you pay about $12,800 total over 6-7 years — $7,800 of that is interest. The debt grows faster than minimum payments reduce the principal, which is why carrying a balance is one of the most expensive financial mistakes.",
  },
  {
    question: "What is the Rule of 72 and how do you use it?",
    answer:
      "Divide 72 by your annual interest rate to estimate how many years it takes for money to double. At 8%, money doubles in about 9 years (72 ÷ 8 = 9). At 22% (typical credit card APR), debt doubles in roughly 3.3 years. It is a quick mental math shortcut — not exact, but accurate within 1-2 years for rates between 4% and 15%.",
  },
  {
    question: "How much difference does starting 10 years earlier really make?",
    answer:
      "Starting at 25 instead of 35 with the same $500/month contribution at 8% until age 65 produces $1.74 million versus approximately $745,000 — a difference of nearly $1 million on identical monthly deposits. The 25-year-old contributes $60,000 more over those extra 10 years, but earns roughly $935,000 more in compound growth because early dollars have decades longer to multiply.",
  },
  {
    question: "Is compound interest the same for savings accounts and investments?",
    answer:
      "The math is identical — interest earns interest in both cases — but the rates and risk differ dramatically. A high-yield savings account at 5% APY with FDIC insurance is guaranteed but capped. Stock market investments historically return 8-10% long-term but fluctuate year to year. A $25,000 HYSA at 5% grows to $32,010 in 5 years with zero risk. The same $25,000 in an index fund at 8% could reach $36,734 — but might temporarily drop 20-30% along the way.",
  },
];

export default function CompoundInterestRealExamplesGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Compound Interest: 5 Real-Life Examples That Show Its Power"
        description="Real-life compound interest examples with exact numbers: retirement investing, credit card debt, student loans, and high-yield savings."
        slug="compound-interest-real-examples"
        datePublished="2026-08-24"
        image="/images/guides/compound-interest-real-examples.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "Compound Interest: 5 Real-Life Examples",
            href: "/guides/compound-interest-real-examples",
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
            Compound Interest: 5 Real-Life Examples That Show Its Power
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Compound interest is the reason a modest monthly contribution can
            turn into a seven-figure retirement account — and the reason a
            $5,000 credit card balance can cost you nearly $13,000. These five
            compound interest examples from real life show exactly how the math
            plays out with specific dollar amounts, so you can see where
            compounding helps you and where it works against you.
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
              <strong>Retirement:</strong> $500/month from age 25 to 65 at 8%
              grows to $1.74 million on $240,000 contributed
            </li>
            <li>
              <strong>Lump sum:</strong> $10,000 invested once at 10% for 30
              years becomes $174,494
            </li>
            <li>
              <strong>Credit card debt:</strong> $5,000 at 22% with minimum
              payments costs $12,800 total — compound interest in reverse
            </li>
            <li>
              <strong>Student loans:</strong> Repayment plan choice changes
              total interest from $8,964 to $22,850 on the same $35,000 balance
            </li>
            <li>
              <strong>High-yield savings:</strong> $25,000 at 5% APY for 5
              years grows to $32,010 with no market risk
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Model your own scenarios with our{" "}
            <Link
              href="/calculators/compound-interest"
              className="font-medium text-brand-600 underline"
            >
              Compound Interest Calculator
            </Link>
            ,{" "}
            <Link
              href="/calculators/retirement"
              className="font-medium text-brand-600 underline"
            >
              Retirement Calculator
            </Link>
            , and{" "}
            <Link
              href="/calculators/savings-goal"
              className="font-medium text-brand-600 underline"
            >
              Savings Goal Calculator
            </Link>
            .
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/compound-interest-real-examples.webp"
              alt="Infographic comparing five real-life compound interest examples: retirement investing, lump-sum growth, credit card debt, student loan repayment, and high-yield savings with specific dollar outcomes"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Five real-life compound interest examples: where your money grows — and where it drains away
            </figcaption>
          </figure>
        </section>

        {/* Formula Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Compound Interest Formula Explained
          </h2>
          <p className="mt-4 text-ink-700">
            Every example in this guide uses the same underlying formula.
            Compound interest means you earn returns not just on your original
            principal, but on the accumulated interest from prior periods. The
            standard formula is:
          </p>
          <div className="mt-6 rounded-lg border border-ink-200 bg-ink-50 px-6 py-4 text-center">
            <p className="text-xl font-semibold text-ink-900">
              A = P(1 + r/n)<sup>nt</sup>
            </p>
          </div>
          <ul className="mt-6 space-y-2 text-ink-700">
            <li>
              <strong>A</strong> = final amount (what you end up with)
            </li>
            <li>
              <strong>P</strong> = principal (starting balance)
            </li>
            <li>
              <strong>r</strong> = annual interest rate (as a decimal, so 8% =
              0.08)
            </li>
            <li>
              <strong>n</strong> = number of times interest compounds per year
              (12 for monthly, 365 for daily)
            </li>
            <li>
              <strong>t</strong> = time in years
            </li>
          </ul>
          <p className="mt-4 text-ink-700">
            For recurring monthly contributions — like the retirement example
            below — the formula extends to include a payment stream. But the
            core idea is identical: each period&apos;s growth becomes part of
            the base for the next period. Over decades, that snowball effect
            dominates the outcome far more than the original deposit amount.
          </p>
          <p className="mt-4 text-ink-700">
            Albert Einstein reportedly called compound interest the eighth
            wonder of the world. Whether or not he actually said it, the math
            is undeniable — and the five examples below show why.
          </p>
        </section>

        {/* Example 1 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Example 1: Monthly Retirement Contributions ($500/Month, Age 25 to 65)
          </h2>
          <p className="mt-4 text-ink-700">
            This is the compound interest example that personal finance advisors
            cite most often — and for good reason. A 25-year-old who invests
            $500 every month into a tax-advantaged account (401(k) or IRA)
            earning an average 8% annual return builds substantial wealth without
            ever needing a large lump sum.
          </p>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-ink-800">The Inputs</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Monthly contribution: $500</li>
                  <li>Starting age: 25</li>
                  <li>Retirement age: 65 (40 years)</li>
                  <li>Average annual return: 8%</li>
                  <li>Compounding: monthly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">The Outcome</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Total contributed: $240,000</li>
                  <li>Investment growth: $1,500,504</li>
                  <li>
                    <strong>Final balance: $1,745,504</strong>
                  </li>
                  <li>Growth multiplier: 7.3x your contributions</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-4 text-ink-700">
            Notice what happened: you deposited $240,000 over 40 years — roughly
            $6,000 per year — and compound growth added $1.5 million on top.
            More than 86% of the final balance came from returns, not from money
            you saved out of pocket. That is the power of compound interest
            over a long timeline.
          </p>
          <p className="mt-4 text-ink-700">
            The 8% return assumption reflects the long-term historical average
            of a diversified stock index fund (S&P 500). Actual returns vary
            year to year — the market dropped 37% in 2008 and gained 32% in
            2013 — but over 40-year periods, 7-10% annualized returns are
            historically common. Use our{" "}
            <Link
              href="/calculators/retirement"
              className="text-brand-600 underline"
            >
              Retirement Calculator
            </Link>{" "}
            to adjust the contribution amount, return rate, and timeline for
            your situation.
          </p>
        </section>

        {/* Example 2 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Example 2: One-Time $10,000 Investment at 10% for 30 Years
          </h2>
          <p className="mt-4 text-ink-700">
            Not everyone can commit to monthly contributions from day one.
            Sometimes you receive a windfall — an inheritance, a bonus, or
            proceeds from selling a home — and invest it once. Here is what
            happens when you leave that money alone to compound.
          </p>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-ink-800">The Inputs</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Initial investment: $10,000</li>
                  <li>Annual return: 10%</li>
                  <li>Time horizon: 30 years</li>
                  <li>Additional contributions: $0</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">The Outcome</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Total contributed: $10,000</li>
                  <li>Investment growth: $164,494</li>
                  <li>
                    <strong>Final balance: $174,494</strong>
                  </li>
                  <li>Growth multiplier: 17.4x your original deposit</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-4 text-ink-700">
            Using the formula directly: A = $10,000 × (1.10)<sup>30</sup> =
            $174,494. Your $10,000 doubles to $20,000 in about 7.2 years (Rule
            of 72), doubles again to $40,000 around year 14, and keeps
            accelerating from there. By year 30, the annual growth on the
            portfolio alone ($17,449 in the final year) exceeds the entire
            original investment.
          </p>
          <p className="mt-4 text-ink-700">
            This example illustrates why financial advisors emphasize investing
            windfalls rather than spending them. A $10,000 vacation today versus
            $174,494 at retirement is one of the starkest trade-offs in
            personal finance — and compound interest is the engine behind it.
          </p>
        </section>

        {/* Example 3 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Example 3: Credit Card Debt — $5,000 at 22% APR Making Minimum Payments
          </h2>
          <p className="mt-4 text-ink-700">
            Compound interest is not always your friend. When you carry credit
            card debt, the bank applies the same compounding math — but the
            interest accrues against you. This is one of the most painful
            compound interest examples in real life because the rates are so
            high and minimum payments are designed to keep you in debt.
          </p>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-ink-800">The Inputs</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Starting balance: $5,000</li>
                  <li>APR: 22%</li>
                  <li>Minimum payment: ~$125/month (typical 2-3% of balance)</li>
                  <li>Compounding: daily (standard for credit cards)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">The Outcome</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Original balance: $5,000</li>
                  <li>Total interest paid: $7,800</li>
                  <li>
                    <strong>Total amount paid: $12,800</strong>
                  </li>
                  <li>Time to pay off: approximately 6-7 years</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-4 text-ink-700">
            At 22% APR, your debt doubles in roughly 3.3 years if you make no
            payments (72 ÷ 22 = 3.3). Minimum payments barely outpace the
            interest charge each month — in the first month alone, $5,000 at
            22% generates about $92 in interest. Your $125 payment sends only
            $33 toward the principal. The next month, interest calculates on
            $4,967, and the cycle continues.
          </p>
          <p className="mt-4 text-ink-700">
            The lesson is stark: paying off a $5,000 credit card balance saves
            you $7,800 in compound interest — a guaranteed 22% return that no
            investment can reliably match. If you have credit card debt and are
            also investing, you are effectively borrowing at 22% to earn 8-10%.
            The math almost always favors paying the debt first.
          </p>
        </section>

        {/* Example 4 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Example 4: Student Loans — $35,000 at 5.5% (Standard vs Income-Driven)
          </h2>
          <p className="mt-4 text-ink-700">
            Student loans demonstrate how the same principal and interest rate
            can produce wildly different total costs depending on your repayment
            plan. Compound interest still applies — but the timeline and payment
            structure determine whether you pay $8,964 or $22,850 in interest on
            the same $35,000 borrowed.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Term
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Monthly Payment
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Total Interest
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Total Paid
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">Standard Repayment</td>
                  <td className="px-4 py-3">10 years</td>
                  <td className="px-4 py-3">$379/month</td>
                  <td className="px-4 py-3 text-brand-700">$8,964</td>
                  <td className="px-4 py-3">$43,964</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">
                    Income-Driven (20 years)
                  </td>
                  <td className="px-4 py-3">20 years</td>
                  <td className="px-4 py-3">$198/month (avg.)</td>
                  <td className="px-4 py-3 text-amber-700">$22,850</td>
                  <td className="px-4 py-3">$57,850</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Based on $35,000 at 5.5% fixed APR. Income-driven payment assumes
            average monthly payment of $198 over 20 years with remaining
            balance forgiven. Actual IDR payments vary by income and family
            size.
          </p>
          <p className="mt-4 text-ink-700">
            The standard 10-year plan attacks the principal aggressively. Each
            month, a larger share of your $379 payment reduces the balance,
            which means less interest accrues in the next period — compound
            interest working in your favor when you pay down fast.
          </p>
          <p className="mt-4 text-ink-700">
            The income-driven plan lowers monthly payments to $198 on average,
            but the balance shrinks slowly. Interest continues compounding on
            a larger remaining balance for twice as long. You pay $13,886 more
            in total interest — even though the monthly payment feels more
            manageable. For borrowers who qualify for Public Service Loan
            Forgiveness (PSLF), the extended timeline may still make sense. For
            everyone else, the standard plan&apos;s lower total cost is
            compelling if the monthly payment fits your budget.
          </p>
        </section>

        {/* Example 5 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Example 5: High-Yield Savings — $25,000 at 5% APY for 5 Years
          </h2>
          <p className="mt-4 text-ink-700">
            Compound interest is not limited to the stock market. High-yield
            savings accounts (HYSAs) compound daily or monthly, and in 2026
            many online banks offer 4.5-5.0% APY with FDIC insurance. This
            example shows what happens when you park a lump sum and let it
            grow risk-free.
          </p>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-ink-800">The Inputs</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Initial deposit: $25,000</li>
                  <li>APY: 5.0%</li>
                  <li>Time horizon: 5 years</li>
                  <li>Compounding: monthly</li>
                  <li>Additional contributions: $0</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">The Outcome</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Total deposited: $25,000</li>
                  <li>Interest earned: $7,010</li>
                  <li>
                    <strong>Final balance: $32,010</strong>
                  </li>
                  <li>Effective annual gain: $1,402/year</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-4 text-ink-700">
            Compare that to a traditional brick-and-mortar savings account
            paying 0.01% APY: the same $25,000 earns $13 over five years. The
            HYSA earns $7,010 — more than 500 times as much — because compound
            interest at a meaningful rate actually has room to work. This is
            why emergency funds and short-term savings goals belong in HYSAs,
            not checking accounts or under the mattress.
          </p>
          <p className="mt-4 text-ink-700">
            The trade-off is lower returns than the stock market. That same
            $25,000 at 8% over 5 years would reach approximately $36,734 — but
            with volatility and no guarantee. For money you need within 3-5
            years (emergency fund, down payment, vacation fund), the HYSA&apos;s
            guaranteed $7,010 in interest is the right tool.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Side-by-Side Comparison: All Five Examples
          </h2>
          <p className="mt-4 text-ink-700">
            This table summarizes every compound interest example from real life
            covered in this guide. Notice the pattern: longer timelines and
            higher rates amplify the gap between what you put in and what you
            end up with.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Example
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    You Put In
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Final Value / Total Paid
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Compounding Effect
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Retirement ($500/mo)</td>
                  <td className="px-4 py-3">8%</td>
                  <td className="px-4 py-3">40 years</td>
                  <td className="px-4 py-3">$240,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    $1,745,504
                  </td>
                  <td className="px-4 py-3">+$1,505,504 growth</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Lump sum ($10,000)</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">30 years</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    $174,494
                  </td>
                  <td className="px-4 py-3">+$164,494 growth</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Credit card debt</td>
                  <td className="px-4 py-3">22%</td>
                  <td className="px-4 py-3">~6-7 years</td>
                  <td className="px-4 py-3">$5,000 borrowed</td>
                  <td className="px-4 py-3 font-medium text-amber-700">
                    $12,800 paid
                  </td>
                  <td className="px-4 py-3">+$7,800 interest cost</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Student loans (standard)</td>
                  <td className="px-4 py-3">5.5%</td>
                  <td className="px-4 py-3">10 years</td>
                  <td className="px-4 py-3">$35,000 borrowed</td>
                  <td className="px-4 py-3 font-medium">$43,964 paid</td>
                  <td className="px-4 py-3">+$8,964 interest cost</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Student loans (IDR)</td>
                  <td className="px-4 py-3">5.5%</td>
                  <td className="px-4 py-3">20 years</td>
                  <td className="px-4 py-3">$35,000 borrowed</td>
                  <td className="px-4 py-3 font-medium text-amber-700">
                    $57,850 paid
                  </td>
                  <td className="px-4 py-3">+$22,850 interest cost</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">High-yield savings</td>
                  <td className="px-4 py-3">5%</td>
                  <td className="px-4 py-3">5 years</td>
                  <td className="px-4 py-3">$25,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    $32,010
                  </td>
                  <td className="px-4 py-3">+$7,010 growth</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Early Start Advantage */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Early Start Advantage: Age 25 vs Age 35
          </h2>
          <p className="mt-4 text-ink-700">
            The single most important variable in compound interest is time.
            Waiting 10 years to start investing is not just 10 years of missed
            contributions — it is 10 years of lost compounding on every dollar
            you would have invested. Here is what happens when two people
            contribute the same $500 per month at 8%, but one starts at 25 and
            the other waits until 35.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Starting Age
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Years Investing
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Total Contributed
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Final Balance at 65
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Growth from Compounding
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">Age 25</td>
                  <td className="px-4 py-3">40 years</td>
                  <td className="px-4 py-3">$240,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    $1,745,504
                  </td>
                  <td className="px-4 py-3">$1,505,504</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Age 35</td>
                  <td className="px-4 py-3">30 years</td>
                  <td className="px-4 py-3">$180,000</td>
                  <td className="px-4 py-3 font-medium">$745,180</td>
                  <td className="px-4 py-3">$565,180</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Difference</td>
                  <td className="px-4 py-3">10 years</td>
                  <td className="px-4 py-3">$60,000 more</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    $1,000,324 more
                  </td>
                  <td className="px-4 py-3">$940,324 more</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-ink-700">
            The 25-year-old contributes only $60,000 more over those extra 10
            years — but ends up with over $1 million more at retirement. The
            35-year-old would need to contribute approximately $1,170 per month
            (more than double) to reach the same $1.74 million by age 65. Time
            is the one input you cannot buy back.
          </p>
          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">Key Insight</p>
            <p className="mt-1 text-sm text-brand-700">
              The first $120,000 the 25-year-old contributes (Years 1-20) grows
              to approximately $592,000 by age 65 — nearly 5x. The last
              $120,000 contributed (Years 21-40) only grows to about $353,000
              — less than 3x. Early dollars have more time to compound, which
              is why starting now with any amount beats waiting for the
              &quot;perfect&quot; time to invest a larger sum.
            </p>
          </div>
        </section>

        {/* Rule of 72 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Rule of 72: Quick Mental Math for Doubling Time
          </h2>
          <p className="mt-4 text-ink-700">
            You do not need a calculator to estimate how long compound interest
            takes to double your money. The Rule of 72 is a shortcut used by
            financial professionals for decades: divide 72 by the annual
            interest rate to get the approximate doubling time in years.
          </p>
          <div className="mt-6 rounded-lg border border-ink-200 bg-ink-50 px-6 py-4 text-center">
            <p className="text-xl font-semibold text-ink-900">
              Doubling Time (years) = 72 ÷ Annual Interest Rate
            </p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Interest Rate
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Rule of 72 Estimate
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Real-Life Context
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    $10,000 Becomes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">5% (HYSA)</td>
                  <td className="px-4 py-3">14.4 years</td>
                  <td className="px-4 py-3">Emergency fund doubling</td>
                  <td className="px-4 py-3">$20,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">8% (index fund)</td>
                  <td className="px-4 py-3">9 years</td>
                  <td className="px-4 py-3">Retirement account growth</td>
                  <td className="px-4 py-3">$20,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">10% (aggressive portfolio)</td>
                  <td className="px-4 py-3">7.2 years</td>
                  <td className="px-4 py-3">Lump-sum investing</td>
                  <td className="px-4 py-3">$20,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">22% (credit card)</td>
                  <td className="px-4 py-3">3.3 years</td>
                  <td className="px-4 py-3">Debt doubling if unpaid</td>
                  <td className="px-4 py-3">$20,000 owed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-ink-700">
            Apply the rule to Example 2: $10,000 at 10% doubles to $20,000 in
            7.2 years, doubles again to $40,000 in 14.4 years, and reaches
            $80,000 around year 21.6. Three doublings in roughly 22 years — and
            one more doubling in the remaining 8 years pushes the total to
            $174,494. The Rule of 72 is not perfectly precise (actual doubling
            at 10% takes 7.27 years), but it is close enough for planning and
            far faster than running the full compound interest formula.
          </p>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Run Your Own Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Every financial situation is different. Use our free calculators to
            model compound interest on your savings, investments, debt, and
            retirement timeline with your actual numbers.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/compound-interest"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Compound Interest Calculator
            </Link>
            <Link
              href="/calculators/retirement"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Retirement Calculator
            </Link>
            <Link
              href="/calculators/savings-goal"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Savings Goal Calculator
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
        <RelatedGuides currentSlug="compound-interest-real-examples" relatedSlugs={["save-50000-in-3-years", "how-to-start-investing-1000"]} />
      </article>
    </>
  );
}
