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
  title: "Average Net Worth by Age in 2026 — Where Do You Stand?",
  description:
    "Median net worth by age from the Fed's 2025 SCF (released Oct 2026): under 35 $33K, 35-44 $156K, 55-64 $412K. Compare your net worth to peers.",
  keywords: [
    "net worth by age",
    "average net worth by age",
    "median net worth by age",
    "net worth percentile by age",
    "what is a good net worth at 35",
    "average net worth for 24 year old",
    "net worth benchmark",
    "2025 Survey of Consumer Finances net worth",
    "Federal Reserve net worth data",
    "75th percentile net worth by age",
    "age and net worth",
  ],
};

const faqs = [
  {
    question: "What is the average net worth by age in the United States?",
    answer:
      "According to the Federal Reserve's 2025 Survey of Consumer Finances (SCF), released October 9, 2026, average (mean) family net worth by age of the reference person is $135,400 under 35, $681,900 for ages 35-44, $1,244,500 for ages 45-54, $1,878,000 for ages 55-64, $1,897,600 for ages 65-74, and $1,962,200 for ages 75 and older. These averages are pulled upward by a small number of very wealthy households: the average is 4 to 5 times the median in every age group, so the median is the better benchmark for a typical family.",
  },
  {
    question: "What is a good net worth at 35?",
    answer:
      "The 2025 SCF median for families aged 35-44 is $155,600, so a net worth above that puts you ahead of half your age group. For retirement savings specifically, Fidelity suggests 1x your salary by 30 and 3x by 40, which on a $75,000 salary is $75,000 and $225,000 in retirement accounts. Note that Fidelity's guideline covers retirement accounts only, while the SCF median covers total net worth including home equity.",
  },
  {
    question: "Why is median net worth so much lower than average net worth?",
    answer:
      "A small group of very wealthy families pulls the average up. In the 2025 SCF, the 90th percentile of net worth starts at $2,539,200, and families in the top decile have an average net worth of $8,975,200 versus $1,241,500 for all families. For ages 35-44 the average is $681,900 but the median is only $155,600, meaning half of those families have less than $155,600. Use the median when you want to know where a typical household stands.",
  },
  {
    question: "Did net worth for young adults really fall in the latest survey?",
    answer:
      "Yes. Between the 2022 and 2025 surveys, median net worth for families under 35 fell 23 percent in inflation-adjusted terms, from $42,700 to $33,000, and the average fell 33 percent to $135,400. The Federal Reserve attributes the decline primarily to the unwinding of business equity gains recorded between 2019 and 2022. If you are under 35 and below the 2022 headline figure of $39,000 (in 2022 dollars), that figure is no longer the current benchmark.",
  },
  {
    question: "What counts toward net worth?",
    answer:
      "Net worth equals total assets minus total liabilities. Assets include the full market value of your home, retirement accounts (401(k), IRA, pension), taxable investments, cash and savings, and vehicle value. Liabilities include mortgages, student loans, auto loans, credit card debt, and personal loans. Counting only home equity means you have already subtracted the mortgage, so do not subtract it a second time. Annual income is not part of net worth.",
  },
  {
    question: "How can I increase my net worth quickly?",
    answer:
      "The fastest levers are eliminating high-interest debt (credit cards at roughly 20%+ APR), contributing at least enough to earn your full employer 401(k) match, and avoiding lifestyle inflation as income rises. For 2026 the IRS limits are $24,500 for a 401(k), $7,500 for an IRA, and $4,400 (self-only) or $8,750 (family) for an HSA. Use our Net Worth Calculator to track progress and our Compound Interest Calculator to project growth.",
  },
];

export default function NetWorthByAgeGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Average Net Worth by Age: Where Do You Stand?"
        description="See average and median net worth by age group using the Federal Reserve's 2025 SCF data. Compare your net worth to peers, understand what counts, and learn how to build wealth at any age."
        slug="net-worth-by-age"
        datePublished="2026-08-24"
        dateModified="2026-10-17"
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
            average net worth by age using the Federal Reserve's newly
            released 2025 Survey of Consumer Finances, explains what counts in
            the calculation, and shows you how to close the gaps.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: October 2026 (Federal Reserve 2025 SCF, released October 9, 2026)</p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Under 35:</strong> Median net worth $33,000 | Average
              $135,400
            </li>
            <li>
              <strong>Ages 35-44:</strong> Median net worth $155,600 | Average
              $681,900
            </li>
            <li>
              <strong>Ages 45-54:</strong> Median net worth $253,700 | Average
              $1,244,500
            </li>
            <li>
              <strong>Use median, not average:</strong> In every age group the
              average is 4 to 5 times the median because a small number of very
              wealthy families pull it up
            </li>
            <li>
              <strong>What changed in 2025:</strong> Median net worth for
              families under 35 fell 23% after inflation, while families 75 and
              older rose 37% to $504,900
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
              alt="Infographic showing median and average net worth by age group from the Federal Reserve 2025 Survey of Consumer Finances, from under 35 through 75 and older"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Median vs average net worth by age group (Federal Reserve 2025 SCF, 2025 dollars)
            </figcaption>
          </figure>
        </section>

        {/* Net Worth Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Net Worth by Age Group: Federal Reserve 2025 Data
          </h2>
          <p className="mt-4 text-ink-700">
            The Federal Reserve's Survey of Consumer Finances (SCF) is the
            most comprehensive source of household wealth data in the United
            States. Conducted every three years, it surveys thousands of American
            families on assets, liabilities, and income. The 2025 survey was
            released on October 9, 2026 and replaces the 2022 survey as the
            current benchmark. All dollar figures below are in 2025 dollars,
            grouped by the age of the family's reference person.
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
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Median Change vs 2022
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">Under 35</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$33,000</td>
                  <td className="px-4 py-3">$135,400</td>
                  <td className="px-4 py-3">-23%</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">35-44</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$155,600</td>
                  <td className="px-4 py-3">$681,900</td>
                  <td className="px-4 py-3">+5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">45-54</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$253,700</td>
                  <td className="px-4 py-3">$1,244,500</td>
                  <td className="px-4 py-3">-6%</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">55-64</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$411,900</td>
                  <td className="px-4 py-3">$1,878,000</td>
                  <td className="px-4 py-3">+3%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">65-74</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$431,300</td>
                  <td className="px-4 py-3">$1,897,600</td>
                  <td className="px-4 py-3">-4%</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">75 or older</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$504,900</td>
                  <td className="px-4 py-3">$1,962,200</td>
                  <td className="px-4 py-3">+37%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Sources
            items={[
              {
                label:
                  "Federal Reserve, Changes in U.S. Family Finances from 2022 to 2025 (Table 2, October 2026)",
                href: "https://www.federalreserve.gov/publications/files/scf26.pdf",
              },
            ]}
            checked="October 2026"
            note="Median represents the middle family — half above, half below. Average (mean) is pulled upward by high-net-worth outliers. Changes are inflation-adjusted. All US families: median $215,900 (+2%), average $1,241,500 (+7%)."
          />

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            What These Numbers Tell You
          </h3>
          <p className="mt-2 text-ink-700">
            Net worth rises with age through the mid-career years because of
            retirement contributions, mortgage paydown, and peak earning years.
            The median jumps from $33,000 for families under 35 to $155,600 for
            ages 35-44, a 4.7x increase that reflects home purchases and a decade
            of 401(k) contributions. By ages 55-64 the median reaches $411,900,
            yet the average is $1,878,000 — a gap of $1,466,100 created by
            wealth concentration at the top.
          </p>
          <p className="mt-4 text-ink-700">
            Two results from the 2025 survey differ from earlier editions. First,
            families under 35 lost ground: median net worth fell 23% from
            $42,700 (2022, in 2025 dollars) to $33,000, which the Federal Reserve
            attributes primarily to the unwinding of business equity gains
            recorded between 2019 and 2022. Second, families aged 75 and older
            now have the highest median net worth at $504,900 (up 37%),
            overtaking the 65-74 group ($431,300, down 4%) for the first time in
            several surveys. The Fed says the increase was driven mainly by
            higher retirement account values.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Net Worth Percentiles for All US Families (2025)
          </h3>
          <p className="mt-2 text-ink-700">
            If you want to compare against all families instead of one age
            group, these are the net worth cutoffs from the 2025 survey. A net
            worth of $300,000, for example, sits above the median but well below
            the 75th percentile cutoff of $812,800.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Percentile
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Net Worth at Cutoff
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">25th percentile</td>
                  <td className="px-4 py-3">$27,900</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">50th percentile (median)</td>
                  <td className="px-4 py-3">$215,900</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">75th percentile</td>
                  <td className="px-4 py-3">$812,800</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">90th percentile</td>
                  <td className="px-4 py-3">$2,539,200</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Sources
            items={[
              {
                label: "Federal Reserve 2025 SCF report, Table A.2",
                href: "https://www.federalreserve.gov/publications/files/scf26.pdf",
              },
            ]}
            checked="October 2026"
            note="Figures as of the October 9, 2026 release."
          />
        </section>

        {/* Median vs Average */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Why Median vs Average Matters
          </h2>
          <p className="mt-4 text-ink-700">
            If you are 40 years old and read that the "average" net
            worth for your age group is $681,900, you might feel behind — even
            if you are doing fine. That is because the average is a poor measure
            of what typical Americans have. A single extremely wealthy family in
            the sample can add millions to the average without changing the
            median at all.
          </p>
          <p className="mt-4 text-ink-700">
            The 2025 survey shows how large the effect is. The 90th percentile
            of net worth starts at $2,539,200, and the average net worth of
            families in the top decile is $8,975,200 — more than 7 times the
            $1,241,500 average for all families. In the 35-44 age group, a
            small number of high-earning professionals, business owners, and
            inherited-wealth families pull the average to $681,900 while the
            typical family sits at $155,600, a 4.4x gap. The gap is widest at
            ages 45-54, where the average ($1,244,500) is 4.9x the median
            ($253,700).
          </p>
          <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Compare to Median, Not Average</p>
            <p className="mt-1 text-sm text-amber-700">
              If your net worth is above the median for your age group, you are
              ahead of at least half of American families. Being below the
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
            decades. For personal benchmarking, always use the median. A
            second option is to compare your retirement savings to
            salary-multiple milestones such as Fidelity's 1x by 30, 3x by
            40, and 6x by 50 (covered below), which adjust for your income
            instead of the national average.
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
            of your home; use current market value, and list the full mortgage
            balance as a liability instead of netting it against the home value
            twice. Include all retirement
            accounts even if you cannot access them until 59½ — they are real
            assets. On the liability side, include every outstanding balance, not
            just monthly payments.
          </p>
          <div className="mt-4 rounded-lg bg-ink-50 p-4 font-mono text-sm text-ink-800">
            Net Worth = Total Assets - Total Liabilities
            <br />
            Example: $595,000 assets - $303,000 liabilities = $292,000 net worth
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
                  <li>Median net worth (35-44): $155,600</li>
                  <li>Average net worth (35-44): $681,900</li>
                  <li>Their net worth: $292,000</li>
                  <li>vs median: +$136,400 (88% above median)</li>
                  <li>vs average: -$389,900 (57% below average)</li>
                  <li>Fidelity retirement milestone (3x income by 40): $465,000</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Asset Breakdown</h4>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                <li>Home value: $410,000 (mortgage is listed under liabilities)</li>
                <li>Marcus 401(k): $68,000 | Jen 401(k): $47,000 | Total: $115,000</li>
                <li>Roth IRAs (combined): $18,000</li>
                <li>Taxable brokerage: $14,000</li>
                <li>Emergency fund (HYSA): $10,000</li>
                <li>Vehicles (2 cars, paid off): $28,000</li>
                <li>
                  <strong>Total assets: $595,000</strong>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Liability Breakdown</h4>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                <li>Mortgage: $300,000 (home equity: $110,000)</li>
                <li>Student loans (Jen): $3,000</li>
                <li>
                  <strong>Total liabilities: $303,000</strong>
                </li>
                <li>
                  <strong>Net worth: $595,000 - $303,000 = $292,000</strong>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Gap Analysis</h4>
              <p className="mt-2 text-sm text-ink-700">
                Marcus and Jen are in a solid position compared to the median —
                their $292,000 net worth is 88% above the $155,600 median for
                ages 35-44. They fall well short of the $681,900 average, which
                is expected because the average is skewed by high-wealth
                families. Across all US families, $292,000 sits between the
                median ($215,900) and the 75th percentile ($812,800).
              </p>
              <p className="mt-3 text-sm text-ink-700">
                Their biggest vulnerability is <strong>retirement savings</strong>:
                $133,000 in 401(k)s and Roth IRAs is 0.86x their $155,000
                income. Fidelity's milestone is 3x income by age 40, or
                $465,000, so a gap of $332,000 remains. That gap cannot be closed
                in two years, which makes the savings rate the priority. The
                mortgage is also large at $300,000 (1.9x income), and taxable
                investments of $14,000 provide little flexibility for mid-term
                goals.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Recommended Actions</h4>
              <ul className="mt-2 space-y-2 text-sm text-ink-700">
                <li>
                  <strong>1. Raise 401(k) contributions toward the limit</strong> — the
                  2026 limit is $24,500 each ($49,000 combined) and they currently
                  contribute about $22,000 total. Each additional $1,000/month
                  adds $12,000/year in tax-advantaged savings.
                </li>
                <li>
                  <strong>2. Pay off Jen's remaining $3,000 student loan</strong> —
                  small balance, but eliminating it frees cash flow and removes a
                  liability line item.
                </li>
                <li>
                  <strong>3. Build taxable brokerage to $50,000</strong> — at
                  $800/month into a low-cost index fund, and assuming 7% annual
                  growth, the account passes $50,000 in about 37 months.
                </li>
                <li>
                  <strong>4. Avoid upsizing the house</strong> — a $300,000 mortgage is
                  already 1.9x their income, and a bigger loan would slow
                  retirement contributions.
                </li>
                <li>
                  <strong>5. Track quarterly</strong> — use the{" "}
                  <Link
                    href="/calculators/net-worth"
                    className="text-brand-600 underline"
                  >
                    Net Worth Calculator
                  </Link>{" "}
                  to monitor progress; the goal is to close the $332,000 retirement gap
                  toward Fidelity's $465,000 milestone.
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
                  In 2026, the IRS limits are $24,500 for a 401(k), $7,500
                  for an IRA, and $4,400 (self-only) or $8,750 (family) for an
                  HSA if you are eligible. A couple maxing both 401(k)s saves
                  $49,000/year in tax-advantaged accounts alone. Over 20 years
                  at a 7% annual return with year-end contributions, that grows
                  to roughly $2.0 million — use our{" "}
                  <Link
                    href="/calculators/compound-interest"
                    className="text-brand-600 underline"
                  >
                    Compound Interest Calculator
                  </Link>{" "}
                  to model your timeline.
                </p>
                <Sources
                  className="mt-2"
                  items={[TAX_SOURCES.retirementLimits, TAX_SOURCES.hsaLimits]}
                  checked="October 2026"
                />
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
                  paydown and long-term appreciation. In the 2025 SCF, median net
                  worth was $458,900 for homeowners versus $10,600 for renters
                  (all ages), a 43x difference. But do not over-concentrate — if
                  home equity makes up most of your net worth, prioritize
                  retirement and investment accounts to diversify.
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
                  savings rate — not spending. Investing an extra $10,000 every
                  year for a decade grows to about $138,000 at a 7% annual
                  return. On a $75,000 salary, saving 25% ($18,750/year) instead
                  of 15% ($11,250/year) adds $7,500/year, which grows to about
                  $1.04 million over 35 years at 7% (nominal, before
                  inflation).
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Retirement Savings Milestones by Age (Salary-Based Rule of Thumb)
          </h3>
          <p className="mt-2 text-ink-700">
            Fidelity publishes age-based savings milestones as multiples of your
            current salary. They apply to retirement savings (401(k), IRA, and
            similar accounts), not to total net worth, so home equity does not
            count toward them. Because they scale with income, they can be
            more useful than national medians. Fidelity assumes a 15% savings
            rate including employer contributions, retirement at 67, and a
            retirement income target of 45% of pre-retirement income.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Retirement Savings Target
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
                  <td className="px-4 py-3">3x annual salary</td>
                  <td className="px-4 py-3">$225,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">50</td>
                  <td className="px-4 py-3">6x annual salary</td>
                  <td className="px-4 py-3">$450,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">60</td>
                  <td className="px-4 py-3">8x annual salary</td>
                  <td className="px-4 py-3">$600,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">67 (retirement)</td>
                  <td className="px-4 py-3">10x annual salary</td>
                  <td className="px-4 py-3">$750,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Sources
            items={[
              {
                label: "Fidelity retirement guidelines",
                href: "https://www.fidelity.com/viewpoints/retirement/retirement-guidelines",
              },
            ]}
            checked="October 2026"
            note="These are guidelines, not guarantees; your target changes with your retirement age and lifestyle."
          />
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
        <RelatedGuides currentSlug="net-worth-by-age" relatedSlugs={["how-to-start-investing-1000", "save-50000-in-3-years"]} />
      </article>
    </>
  );
}
