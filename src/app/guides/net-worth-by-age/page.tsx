import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Average Net Worth by Age: Where Do You Stand?",
  description:
    "See average and median net worth by age group using Federal Reserve SCF data. Compare your net worth to peers, understand what counts, and learn how to build wealth at any age.",
  keywords: [
    "net worth by age",
    "average net worth by age",
    "median net worth by age",
    "what is a good net worth at 35",
    "net worth benchmark",
    "Federal Reserve net worth data",
  ],
};

const faqs = [
  {
    question: "What is the average net worth by age in the United States?",
    answer:
      "According to the Federal Reserve Survey of Consumer Finances (SCF), average net worth by age group is approximately: $120,000 for ages 25-34, $549,000 for ages 35-44, $975,000 for ages 45-54, $1.56 million for ages 55-64, and $1.79 million for ages 65-74. These averages are heavily skewed by high-wealth households — median figures are much lower and better represent the typical American.",
  },
  {
    question: "What is a good net worth at 35?",
    answer:
      "The median net worth for Americans aged 35-44 is $135,000, according to Federal Reserve SCF data. A net worth above $135,000 puts you ahead of half your peers. Financial planners often suggest having 1-2 times your annual salary saved by 35 — so on a $75,000 income, a target of $75,000-$150,000 is reasonable. Home equity and retirement accounts typically make up the bulk of net worth at this age.",
  },
  {
    question: "Why is median net worth so much lower than average net worth?",
    answer:
      "The top 10% of households hold roughly 65-70% of total US wealth. When you calculate the average (mean), a handful of billionaires and multi-millionaires pull the number dramatically upward. For example, the average net worth for ages 35-44 is $549,000, but the median is only $135,000 — meaning half of households in that age group have less than $135,000. The median is the more useful benchmark for comparing yourself to typical Americans.",
  },
  {
    question: "What counts toward net worth?",
    answer:
      "Net worth equals total assets minus total liabilities. Assets include home equity (home value minus mortgage), retirement accounts (401(k), IRA, pension), taxable investments, cash and savings, and vehicle value. Liabilities include mortgages, student loans, auto loans, credit card debt, and personal loans. Annual income is not part of net worth — only what you have accumulated and owe.",
  },
  {
    question: "How can I increase my net worth quickly?",
    answer:
      "The fastest levers are eliminating high-interest debt (credit cards at 20%+ APR), maximizing employer-matched retirement contributions, and avoiding lifestyle inflation as income rises. Building home equity through mortgage payments and appreciation helps, but diversification into retirement and taxable investment accounts reduces concentration risk. Use our Net Worth Calculator to track progress and our Compound Interest Calculator to project growth.",
  },
];

export default function NetWorthByAgeGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Average Net Worth by Age: Where Do You Stand?"
        description="See average and median net worth by age group using Federal Reserve SCF data. Compare your net worth to peers, understand what counts, and learn how to build wealth at any age."
        slug="net-worth-by-age"
        datePublished="2026-08-24"
        image="/images/guides/net-worth-by-age.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "Average Net Worth by Age",
            href: "/guides/net-worth-by-age",
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
            / Financial Planning
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Average Net Worth by Age: Where Do You Stand?
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Net worth is the single best snapshot of your financial health — but
            comparing yourself to national averages can be misleading if you do
            not know which number to trust. This guide breaks down median and
            average net worth by age using Federal Reserve data, explains what
            counts in the calculation, and shows you how to close the gaps.
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
              <strong>Ages 25-34:</strong> Median net worth $39,000 | Average
              $120,000
            </li>
            <li>
              <strong>Ages 35-44:</strong> Median net worth $135,000 | Average
              $549,000
            </li>
            <li>
              <strong>Ages 45-54:</strong> Median net worth $247,000 | Average
              $975,000
            </li>
            <li>
              <strong>Use median, not average:</strong> The top 10% of households
              skew averages 3-4x above what most Americans actually have
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Calculate your number with our{" "}
            <Link
              href="/calculators/net-worth"
              className="font-medium text-brand-600 underline"
            >
              Net Worth Calculator
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
              src="/images/guides/net-worth-by-age.webp"
              alt="Infographic showing median and average net worth by age group from Federal Reserve SCF data, with benchmarks for ages 25 through 74"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Median vs average net worth by age group (Federal Reserve SCF)
            </figcaption>
          </figure>
        </section>

        {/* Net Worth Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Net Worth by Age Group: Federal Reserve Data
          </h2>
          <p className="mt-4 text-ink-700">
            The Federal Reserve&apos;s Survey of Consumer Finances (SCF) is the
            most comprehensive source of household wealth data in the United
            States. Conducted every three years, it surveys thousands of American
            families on assets, liabilities, and income. The latest published
            data provides these benchmarks by age group.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Age Group
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Median Net Worth
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Average Net Worth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">25-34</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$39,000</td>
                  <td className="px-4 py-3">$120,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">35-44</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$135,000</td>
                  <td className="px-4 py-3">$549,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">45-54</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$247,000</td>
                  <td className="px-4 py-3">$975,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">55-64</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$364,000</td>
                  <td className="px-4 py-3">$1,560,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">65-74</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$409,000</td>
                  <td className="px-4 py-3">$1,790,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            Source: Federal Reserve Survey of Consumer Finances (SCF). Median
            represents the middle household — half above, half below. Average
            (mean) is pulled upward by high-net-worth outliers.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            What These Numbers Tell You
          </h3>
          <p className="mt-2 text-ink-700">
            Net worth tends to rise with age because of compound investment
            growth, mortgage paydown, and peak earning years. The jump from the
            25-34 group (median $39,000) to the 35-44 group (median $135,000)
            reflects home purchases, career advancement, and a decade of
            retirement contributions. By ages 55-64, the median reaches
            $364,000 — but the average hits $1.56 million, a gap of more than
            $1.2 million caused by wealth concentration at the top.
          </p>
        </section>

        {/* Median vs Average */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Why Median vs Average Matters
          </h2>
          <p className="mt-4 text-ink-700">
            If you are 40 years old and read that the &quot;average&quot; net
            worth for your age group is $549,000, you might feel behind — even
            if you are doing fine. That is because the average is a poor measure
            of what typical Americans have. A single billionaire in the sample
            can add millions to the average without changing the median at all.
          </p>
          <p className="mt-4 text-ink-700">
            The top 10% of US households hold roughly 65-70% of total national
            wealth. In the 35-44 age group, this means a small number of
            high-earning professionals, business owners, and inherited-wealth
            households pull the average to $549,000 while the typical household
            sits at $135,000. The ratio is even more extreme for older groups:
            ages 55-64 show a median of $364,000 against an average of $1.56
            million — a 4.3x gap.
          </p>
          <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Compare to Median, Not Average</p>
            <p className="mt-1 text-sm text-amber-700">
              If your net worth is above the median for your age group, you are
              ahead of at least half of American households. Being below the
              average but above the median is completely normal — and does not
              mean you are failing financially.
            </p>
          </div>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            When Average Is Useful
          </h3>
          <p className="mt-2 text-ink-700">
            Average net worth is relevant if you are studying total national
            wealth, analyzing tax policy, or comparing aggregate savings across
            decades. For personal benchmarking, always use the median. Financial
            planners typically recommend comparing net worth to 1x, 2x, or 3x your
            annual salary by certain milestone ages — a more actionable framework
            than national averages.
          </p>
        </section>

        {/* What Counts in Net Worth */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            What Counts in Net Worth
          </h2>
          <p className="mt-4 text-ink-700">
            Net worth is a simple formula: <strong>Assets minus Liabilities</strong>.
            What you own minus what you owe. Income is not included — only
            accumulated wealth and outstanding debt.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">Assets (What You Own)</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-700">
                <li>
                  <strong>Home equity:</strong> Market value minus remaining
                  mortgage balance
                </li>
                <li>
                  <strong>Retirement accounts:</strong> 401(k), 403(b), traditional
                  IRA, Roth IRA, pension balances
                </li>
                <li>
                  <strong>Taxable investments:</strong> Brokerage accounts, index
                  funds, individual stocks and bonds
                </li>
                <li>
                  <strong>Cash and savings:</strong> Checking, savings, money market,
                  CDs, HYSA balances
                </li>
                <li>
                  <strong>Other assets:</strong> Vehicle value, business equity,
                  rental property equity, collectibles (at realistic resale value)
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">Liabilities (What You Owe)</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-700">
                <li>
                  <strong>Mortgage:</strong> Remaining principal on primary and
                  secondary homes
                </li>
                <li>
                  <strong>Student loans:</strong> Federal and private education debt
                </li>
                <li>
                  <strong>Auto loans:</strong> Outstanding car loan balances
                </li>
                <li>
                  <strong>Credit card debt:</strong> Revolving balances (pay these
                  off first)
                </li>
                <li>
                  <strong>Other debt:</strong> Personal loans, medical debt, home
                  equity lines of credit (HELOC)
                </li>
              </ul>
            </div>
          </div>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Common Mistakes When Calculating Net Worth
          </h3>
          <p className="mt-2 text-ink-700">
            Do not count your gross annual salary — income flows through net worth
            only when you save or invest it. Do not use the original purchase price
            of your home; use current market value. Include all retirement
            accounts even if you cannot access them until 59½ — they are real
            assets. On the liability side, include every outstanding balance, not
            just monthly payments.
          </p>
          <div className="mt-4 rounded-lg bg-ink-50 p-4 font-mono text-sm text-ink-800">
            Net Worth = Total Assets - Total Liabilities
            <br />
            Example: $480,000 assets - $188,000 liabilities = $292,000 net worth
          </div>
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Marcus and Jen, Both 38, in Minneapolis
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Household Profile</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Ages: Both 38 (35-44 age group)</li>
                  <li>Combined income: $155,000/year</li>
                  <li>Marcus: Marketing manager, $82,000</li>
                  <li>Jen: Registered nurse, $73,000</li>
                  <li>Location: Minneapolis, MN</li>
                  <li>Married, one child (age 4)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Benchmark Comparison</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Median net worth (35-44): $135,000</li>
                  <li>Average net worth (35-44): $549,000</li>
                  <li>Their net worth: $292,000</li>
                  <li>vs median: +$157,000 (116% above median)</li>
                  <li>vs average: -$257,000 (47% below average)</li>
                  <li>Salary benchmark (2x income): $310,000 target</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Asset Breakdown</h4>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                <li>Home value: $480,000 | Mortgage owed: $185,000 | Equity: $295,000</li>
                <li>Marcus 401(k): $68,000 | Jen 401(k): $47,000 | Total: $115,000</li>
                <li>Roth IRAs (combined): $18,000</li>
                <li>Taxable brokerage: $14,000</li>
                <li>Emergency fund (HYSA): $10,000</li>
                <li>Vehicles (2 cars, paid off): $28,000</li>
                <li>
                  <strong>Total assets: $480,000</strong>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Liability Breakdown</h4>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                <li>Mortgage: $185,000</li>
                <li>Student loans (Jen): $3,000</li>
                <li>
                  <strong>Total liabilities: $188,000</strong>
                </li>
                <li>
                  <strong>Net worth: $480,000 - $188,000 = $292,000</strong>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Gap Analysis</h4>
              <p className="mt-2 text-sm text-ink-700">
                Marcus and Jen are in a strong position compared to the median —
                their $292,000 net worth is more than double the $135,000 median
                for their age group. However, they fall well short of the $549,000
                average, which is expected given that average is skewed by
                high-wealth households. Against the common planner rule of 2x
                annual income by 40, they are $18,000 short of the $310,000
                target with two years to close the gap.
              </p>
              <p className="mt-3 text-sm text-ink-700">
                Their biggest vulnerability is <strong>concentration in home
                equity</strong>: $295,000 of their $292,000 net worth (101%) is
                tied up in their house. Retirement accounts total $133,000 — below
                the $155,000-$310,000 range recommended for their income level.
                Taxable investments at $14,000 provide almost no flexibility for
                mid-term goals or early retirement bridge funding.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Recommended Actions</h4>
              <ul className="mt-2 space-y-2 text-sm text-ink-700">
                <li>
                  <strong>1. Max both 401(k)s</strong> — at $23,500 each ($47,000
                  combined), they are currently contributing ~$22,000 total. Closing
                  this gap adds $25,000/year in tax-advantaged savings.
                </li>
                <li>
                  <strong>2. Pay off Jen&apos;s remaining $3,000 student loan</strong> —
                  small balance, but eliminating it frees cash flow and removes a
                  liability line item.
                </li>
                <li>
                  <strong>3. Build taxable brokerage to $50,000</strong> — target
                  $800/month into a low-cost index fund for flexibility beyond
                  retirement accounts.
                </li>
                <li>
                  <strong>4. Avoid upgrading the house</strong> — resist lifestyle
                  inflation; their home equity is already their largest asset class.
                </li>
                <li>
                  <strong>5. Track quarterly</strong> — use the{" "}
                  <Link
                    href="/calculators/net-worth"
                    className="text-brand-600 underline"
                  >
                    Net Worth Calculator
                  </Link>{" "}
                  to monitor progress toward the $310,000 target by age 40.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Increase Net Worth */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How to Increase Net Worth at Any Age
          </h2>
          <p className="mt-4 text-ink-700">
            Net worth grows through a combination of saving, investing, debt
            reduction, and asset appreciation. The strategies below work at every
            life stage — the priorities just shift depending on where you are in
            the wealth-building timeline.
          </p>

          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Eliminate high-interest debt first
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Credit card debt at 20-25% APR destroys net worth faster than
                  any investment can build it. Paying off a $8,000 balance at 22%
                  APR saves $1,760/year in interest — a guaranteed return no index
                  fund can match. After credit cards, tackle auto loans above 7%
                  and private student loans above 6%.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Max retirement accounts every year
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  In 2026, contribute the maximum to your 401(k) ($23,500),
                  IRA ($7,000), and HSA if eligible ($4,300 individual /
                  $8,550 family). A couple maxing both 401(k)s saves $47,000/year
                  in tax-advantaged accounts alone. Over 20 years at 7% returns,
                  that is roughly $2.1 million — use our{" "}
                  <Link
                    href="/calculators/compound-interest"
                    className="text-brand-600 underline"
                  >
                    Compound Interest Calculator
                  </Link>{" "}
                  to model your timeline.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Build home equity strategically
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Homeownership builds net worth through mortgage principal
                  paydown and long-term appreciation. The median homeowner aged
                  35-44 holds significantly more net worth than renters at the
                  same age. But do not over-concentrate — if home equity exceeds
                  60-70% of total net worth, prioritize investment accounts to
                  diversify.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Avoid lifestyle inflation
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Every raise, bonus, and promotion is an opportunity to increase
                  savings rate — not spending. Households that maintain a fixed
                  budget through income growth of $10,000/year and invest the
                  difference add $100,000+ to net worth over a decade, assuming
                  7% returns. The difference between saving 15% and 25% of income
                  over a career can mean $500,000-$1,000,000 in additional net
                  worth at retirement.
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Net Worth Targets by Age (Salary-Based Rule of Thumb)
          </h3>
          <p className="mt-2 text-ink-700">
            Financial author Thomas J. Stanley and many planners recommend these
            multiples of annual income as net worth milestones. They adjust for
            individual circumstances better than national medians.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Target Net Worth
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Example ($75K Income)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">30</td>
                  <td className="px-4 py-3">1x annual salary</td>
                  <td className="px-4 py-3">$75,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">40</td>
                  <td className="px-4 py-3">2x annual salary</td>
                  <td className="px-4 py-3">$150,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">50</td>
                  <td className="px-4 py-3">4x annual salary</td>
                  <td className="px-4 py-3">$300,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">60</td>
                  <td className="px-4 py-3">6x annual salary</td>
                  <td className="px-4 py-3">$450,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">67 (retirement)</td>
                  <td className="px-4 py-3">8-10x annual salary</td>
                  <td className="px-4 py-3">$600,000 - $750,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Calculate Your Net Worth
          </h2>
          <p className="mt-2 text-ink-600">
            Stop guessing where you stand. Enter your assets and liabilities to
            see your net worth, compare it to age-group benchmarks, and project
            how your wealth grows over time.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/net-worth"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Net Worth Calculator
            </Link>
            <Link
              href="/calculators/retirement"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Retirement Calculator
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
          <h2 className="text-lg font-semibold text-ink-800">Related Guides</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/guides/how-much-to-retire-at-55"
                className="text-brand-600 hover:underline"
              >
                How Much Do I Need to Retire at 55? A Complete Breakdown
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
                href="/guides/compound-interest-real-examples"
                className="text-brand-600 hover:underline"
              >
                Compound Interest: 5 Real-Life Examples That Show Its Power
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
