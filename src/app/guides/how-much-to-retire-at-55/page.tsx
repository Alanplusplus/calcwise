import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "How Much Do I Need to Retire at 55? A Complete Breakdown",
  description:
    "Find out how much you need to retire at 55. Covers the 4% rule, healthcare costs, portfolio targets by lifestyle, and a step-by-step action plan.",
  keywords: [
    "how much do I need to retire at 55",
    "retire at 55 calculator",
    "early retirement savings goal",
    "4 percent rule retirement",
    "retirement planning at 55",
  ],
};

const faqs = [
  {
    question: "How much money do I need to retire at 55?",
    answer:
      "Most people need a portfolio of $1.5 million to $2.5 million to retire at 55, depending on annual spending. Using the 4% rule, $50,000/year requires $1.25 million, $80,000/year requires $2 million, and $120,000/year requires $3 million — but early retirees should add $300,000-$500,000 for the 10-year healthcare gap before Medicare at 65.",
  },
  {
    question: "Can I retire at 55 and still access my 401(k)?",
    answer:
      "Not without penalties before age 59½, unless you use Rule of 55 (if you leave your employer at 55+) or SEPP/72(t) distributions. Most early retirees fund ages 55-59½ from taxable brokerage accounts and Roth conversion ladders, keeping 401(k) and traditional IRA assets for later years when penalty-free withdrawals are available.",
  },
  {
    question: "Is the 4% rule safe for a 40-year retirement?",
    answer:
      "The classic 4% rule was designed for a 30-year retirement. Retiring at 55 with a 35-40 year horizon calls for a more conservative 3.25-3.5% withdrawal rate, or building in flexibility to reduce spending during market downturns. A $2 million portfolio at 3.5% yields $70,000/year — safer than $80,000 at 4% over four decades.",
  },
  {
    question: "How much does health insurance cost if I retire before 65?",
    answer:
      "Expect $800-$1,500 per month ($9,600-$18,000 per year) for ACA marketplace coverage in 2026, depending on your state, age, and plan tier. A couple in their late 50s often pays $1,200-$1,800/month before subsidies. Budget $144,000-$216,000 total for the 10-year gap until Medicare eligibility at 65.",
  },
  {
    question: "What is the fastest way to reach a $2 million retirement portfolio?",
    answer:
      "Maximize tax-advantaged accounts first: 401(k) ($23,500/year in 2026), IRA ($7,000/year), and HSA ($4,300 individual / $8,550 family). Then pour surplus into taxable index funds. At a 7% average return, saving $3,500/month from a $400,000 starting balance reaches $2 million in roughly 12-13 years. Use our Compound Interest Calculator to model your exact timeline.",
  },
];

export default function HowMuchToRetireAt55Guide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="How Much Do I Need to Retire at 55? A Complete Breakdown"
        description="Find out how much you need to retire at 55. Covers the 4% rule, healthcare costs, portfolio targets by lifestyle, and a step-by-step action plan."
        slug="how-much-to-retire-at-55"
        datePublished="2026-08-24"
        image="/images/guides/how-much-to-retire-at-55.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "How Much Do I Need to Retire at 55",
            href: "/guides/how-much-to-retire-at-55",
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
            / Retirement Planning
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            How Much Do I Need to Retire at 55? A Complete Breakdown
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Retiring at 55 sounds like freedom — but it requires a portfolio
            large enough to cover 30-40 years of expenses, a decade of healthcare
            before Medicare kicks in, and a withdrawal strategy that avoids early
            withdrawal penalties. This guide gives you the exact numbers, a real
            case study, and a step-by-step plan to get there.
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
              <strong>Most people need:</strong> $1.5 million - $2.5 million to
              retire at 55 comfortably
            </li>
            <li>
              <strong>The 4% rule:</strong> Withdraw 4% of your portfolio annually
              ($80,000/year from a $2 million portfolio)
            </li>
            <li>
              <strong>Healthcare gap:</strong> Budget an extra $300,000-$500,000
              for the 10 years before Medicare at 65
            </li>
            <li>
              <strong>Conservative target:</strong> Use 3.5% withdrawal rate for a
              35-40 year retirement horizon
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Run your numbers with our{" "}
            <Link
              href="/calculators/retirement"
              className="font-medium text-brand-600 underline"
            >
              Retirement Calculator
            </Link>
            ,{" "}
            <Link
              href="/calculators/fire-calculator"
              className="font-medium text-brand-600 underline"
            >
              FIRE Calculator
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
              src="/images/guides/how-much-to-retire-at-55.webp"
              alt="Infographic showing retirement portfolio targets by lifestyle level for age 55, including the 4% rule, healthcare gap costs, and timeline from age 55 to Medicare at 65"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Portfolio targets for retiring at 55, adjusted for lifestyle and the 10-year healthcare gap
            </figcaption>
          </figure>
        </section>

        {/* The Math */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">The Math Behind Retiring at 55</h2>
          <p className="mt-4 text-ink-700">
            Every retirement number starts with one question: how much will you
            spend each year? Once you know that, you can work backward to the
            portfolio size you need. The most widely cited framework is the 4%
            rule — but retiring at 55 requires adjustments that most standard
            retirement advice ignores.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            The 4% Rule Explained
          </h3>
          <p className="mt-2 text-ink-700">
            The 4% rule says you can withdraw 4% of your portfolio in the first
            year of retirement, then adjust for inflation each year, with a high
            probability your money lasts 30 years. The formula is simple:
          </p>
          <div className="mt-4 rounded-lg bg-ink-50 p-4 font-mono text-sm text-ink-800">
            Required portfolio = Annual spending / 0.04
            <br />
            Example: $80,000/year spending → $80,000 / 0.04 = $2,000,000
          </div>
          <p className="mt-4 text-ink-700">
            This rule comes from the Trinity Study, which tested withdrawal rates
            against historical US stock and bond returns. A 4% withdrawal rate
            succeeded 95%+ of the time over 30-year periods. The key word is{" "}
            <em>30 years</em>.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Why 55 Means a 30-40 Year Horizon
          </h3>
          <p className="mt-2 text-ink-700">
            Retire at 65 and you need your money to last roughly 25-30 years.
            Retire at 55 and you are planning for 35-40 years — possibly longer if
            you have longevity in your family. Every additional year of retirement
            increases the risk of a bad sequence of returns (a market crash early
            in retirement) depleting your portfolio.
          </p>
          <p className="mt-4 text-ink-700">
            The practical adjustment: use a 3.25-3.5% withdrawal rate instead of
            4%. That changes the math significantly:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Annual Spending
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    At 4% Rule
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    At 3.5% Rule (Safer)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">$50,000</td>
                  <td className="px-4 py-3">$1,250,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$1,428,571</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">$80,000</td>
                  <td className="px-4 py-3">$2,000,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$2,285,714</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">$120,000</td>
                  <td className="px-4 py-3">$3,000,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$3,428,571</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            The Healthcare Gap Before Medicare
          </h3>
          <p className="mt-2 text-ink-700">
            Medicare eligibility begins at 65. Retire at 55 and you are on your
            own for a full decade of health insurance — the single biggest
            financial wildcard for early retirees. Employer-sponsored coverage
            disappears, and ACA marketplace premiums for someone in their late
            50s run $800-$1,500 per month in most states.
          </p>
          <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">The 10-Year Penalty</p>
            <p className="mt-1 text-sm text-amber-700">
              At $1,200/month for health insurance, the 10-year gap before Medicare
              costs $144,000 in premiums alone — not counting deductibles,
              copays, or dental and vision. Capitalize that into your portfolio
              using the 4% rule and you need an additional $360,000 ($144,000 /
              0.04) just for healthcare.
            </p>
          </div>
        </section>

        {/* Spending Breakdown Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Required Portfolio by Lifestyle Level
          </h2>
          <p className="mt-4 text-ink-700">
            The table below shows total portfolio targets for three common
            retirement lifestyles. Figures include a healthcare reserve for ages
            55-64 and use a 3.5% withdrawal rate for the longer retirement horizon.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Lifestyle
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Annual Spending
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Base Portfolio (3.5%)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Healthcare Reserve
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Total Target
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">Modest</td>
                  <td className="px-4 py-3">$50,000/yr</td>
                  <td className="px-4 py-3">$1,428,571</td>
                  <td className="px-4 py-3">$360,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$1,788,571</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Comfortable</td>
                  <td className="px-4 py-3">$80,000/yr</td>
                  <td className="px-4 py-3">$2,285,714</td>
                  <td className="px-4 py-3">$400,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$2,685,714</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Affluent</td>
                  <td className="px-4 py-3">$120,000/yr</td>
                  <td className="px-4 py-3">$3,428,571</td>
                  <td className="px-4 py-3">$450,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$3,878,571</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Modest lifestyle assumes paid-off housing in a lower cost-of-living
            area. Comfortable includes travel and dining out. Affluent assumes
            maintaining a higher standard of living, potentially in a major metro.
            Healthcare reserve covers ACA premiums at $1,000-$1,250/month for 10
            years, capitalized at 4%.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            What Each Lifestyle Looks Like in Practice
          </h3>
          <p className="mt-2 text-ink-700">
            A <strong>modest $50,000/year</strong> budget might include a
            $1,800/month mortgage-free housing cost, $600/month for groceries and
            dining, $500/month for transportation, $400/month for healthcare
            (post-Medicare), and $700/month for everything else. This works well
            in cities like Pittsburgh, Indianapolis, or Raleigh — less so in San
            Francisco or New York.
          </p>
          <p className="mt-4 text-ink-700">
            A <strong>comfortable $80,000/year</strong> budget adds international
            travel ($8,000/year), a newer car replacement fund, higher dining and
            entertainment spending, and a buffer for home maintenance. This is the
            target most dual-income professionals aim for.
          </p>
          <p className="mt-4 text-ink-700">
            An <strong>affluent $120,000/year</strong> budget supports maintaining
            your pre-retirement lifestyle: premium healthcare, multiple trips per
            year, helping adult children, and living in a higher cost-of-living
            area without downsizing.
          </p>
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Robert, 42, Software Engineer in Seattle
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Current Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Age: 42 (target retirement: 55)</li>
                  <li>Salary: $165,000/year</li>
                  <li>401(k) balance: $198,000</li>
                  <li>Roth IRA: $52,000</li>
                  <li>Taxable brokerage: $45,000</li>
                  <li>Total invested: $295,000</li>
                  <li>Monthly savings: $3,400 ($2,000 401k + $583 Roth + $817 taxable)</li>
                  <li>Mortgage: $2,800/month (12 years remaining)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Retirement Target</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Desired spending: $85,000/year (comfortable, mortgage-free)</li>
                  <li>Portfolio needed (3.5% rule): $2,428,571</li>
                  <li>Healthcare reserve (10 years): $400,000</li>
                  <li>Total target: $2,828,571</li>
                  <li>Years until 55: 13</li>
                  <li>Assumed return: 7% average annual</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Projection at Current Pace</h4>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                <li>
                  $295,000 growing at 7% for 13 years: $295,000 x 1.07^13 = $708,847
                </li>
                <li>
                  $3,400/month ($40,800/year) invested for 13 years at 7%:
                  ~$858,000 in contributions + growth
                </li>
                <li>
                  <strong>Projected portfolio at 55: ~$1,566,847</strong>
                </li>
                <li>
                  Mortgage paid off by 54, freeing $2,800/month ($33,600/year)
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Gap Analysis</h4>
              <p className="mt-2 text-sm text-ink-700">
                Robert&apos;s projected $1,566,847 falls short of his $2,828,571
                target by <strong>$1,261,724</strong>. At 3.5% withdrawal, his
                projected portfolio would generate $54,840/year — enough for a
                modest lifestyle but $30,160 short of his $85,000 comfort target.
                Even accounting for the mortgage payoff reducing his spending need
                to roughly $51,400/year ($85,000 - $33,600), he would still need
                ~$1,468,571 — leaving a gap of roughly $1,261,724 when healthcare
                is included.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Robert&apos;s Action Plan</h4>
              <ul className="mt-2 space-y-2 text-sm text-ink-700">
                <li>
                  <strong>1. Increase savings to $5,200/month</strong> — redirect
                  the $2,800 mortgage payment after payoff plus boost contributions
                  now. This closes the gap to within $400,000.
                </li>
                <li>
                  <strong>2. Build a taxable bridge account</strong> — target
                  $350,000 in taxable index funds by 55 to fund ages 55-59½ without
                  touching 401(k) or IRA (avoiding the 10% early withdrawal penalty).
                </li>
                <li>
                  <strong>3. Start a Roth conversion ladder at 50</strong> — convert
                  $40,000/year from traditional IRA to Roth for 5 years, creating
                  penalty-free access to converted principal after the 5-year seasoning
                  period.
                </li>
                <li>
                  <strong>4. Consider a partial retirement at 55</strong> — consulting
                  2 days/week at $200/hour ($1,600/week, ~$80,000/year) covers
                  healthcare and reduces portfolio withdrawals to near zero for the
                  first 5 years.
                </li>
                <li>
                  <strong>5. Evaluate relocating at 55</strong> — moving from Seattle
                  to a lower cost-of-living area like Boise or Phoenix could cut
                  annual spending from $85,000 to $65,000, reducing the target
                  portfolio by $571,428.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Healthcare Costs */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Healthcare: The Biggest Wildcard for Early Retirees
          </h2>
          <p className="mt-4 text-ink-700">
            If you retire at 65, Medicare handles most of your healthcare costs.
            Retire at 55 and you enter the most expensive decade of private health
            insurance — premiums spike in your late 50s, and you have no employer
            subsidy to soften the blow.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Age Range
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Monthly Premium (Individual)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Annual Total (Premiums + Out-of-Pocket)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">55-59</td>
                  <td className="px-4 py-3">$800 - $1,200</td>
                  <td className="px-4 py-3">$12,000 - $18,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">60-64</td>
                  <td className="px-4 py-3">$1,000 - $1,500</td>
                  <td className="px-4 py-3">$15,000 - $22,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">65+ (Medicare)</td>
                  <td className="px-4 py-3">$185 - $560 (Part B + D + Medigap)</td>
                  <td className="px-4 py-3">$4,500 - $8,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-ink-700">
            For a couple retiring at 55, double the individual estimates. A
            57-year-old couple on a Silver-tier ACA plan in 2026 typically pays
            $2,200-$2,800/month ($26,400-$33,600/year) without subsidies. ACA
            premium tax credits are based on income — if you keep taxable income
            below ~$82,000 (2026 federal poverty level thresholds for a couple),
            subsidies can reduce premiums by 50-80%.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">Strategy: Manage Your MAGI</p>
            <p className="mt-1 text-sm text-brand-700">
              Early retirees often live off taxable brokerage accounts and Roth
              contributions (which do not count as income) to keep Modified
              Adjusted Gross Income low enough to qualify for ACA subsidies.
              This can save $10,000-$15,000 per year in healthcare costs — which,
              capitalized at 4%, represents $250,000-$375,000 in portfolio value.
            </p>
          </div>
        </section>

        {/* Step-by-Step Plan */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step Plan to Retire at 55
          </h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Calculate your exact retirement number
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Track every dollar you spend for 3 months. Multiply by 12, add
                  10-15% buffer, then divide by 0.035 (conservative withdrawal
                  rate). Add $360,000-$450,000 for healthcare. That is your target.
                  A $75,000/year spender needs roughly $2,500,000 total.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Maximize tax-advantaged accounts
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  In 2026, contribute the maximum to your 401(k) ($23,500),
                  Roth or traditional IRA ($7,000), and HSA if eligible ($4,300
                  individual / $8,550 family). Capture every dollar of employer
                  match — it is an instant 50-100% return. These three accounts
                  alone allow $34,800/year in tax-advantaged savings.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Build a taxable bridge account
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  You cannot access 401(k) or IRA funds without penalty until
                  59½ (with limited exceptions). Fund a taxable brokerage with
                  low-cost index funds — this is your spending money for ages
                  55-59½. Target 4-5 years of expenses: $80,000/year x 5 =
                  $400,000 in taxable accounts.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Set up a Roth conversion ladder
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Starting 5 years before retirement, convert $40,000-$50,000/year
                  from traditional IRA/401(k) to Roth IRA. Pay taxes at your current
                  (lower) rate. After 5 years, each conversion&apos;s principal becomes
                  available for penalty-free withdrawal. This bridges the gap between
                  your taxable account depletion and age 59½.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                5
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Plan your healthcare strategy
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Research ACA plans in your state. If retiring before 55, consider
                  COBRA (18 months of employer coverage, typically $600-$900/month).
                  Structure withdrawals to keep MAGI low for premium subsidies. Budget
                  $1,000-$1,500/month for ages 55-64.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                6
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Run annual projections and adjust
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Every year, recalculate your projected portfolio at 55 using
                  actual returns and savings. If you are behind, increase savings
                  or push the target date by 1-2 years. If ahead, consider reducing
                  risk by shifting 5-10% from stocks to bonds. Use our{" "}
                  <Link
                    href="/calculators/compound-interest"
                    className="text-brand-600 underline"
                  >
                    Compound Interest Calculator
                  </Link>{" "}
                  to model different scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Calculate Your Retirement Number
          </h2>
          <p className="mt-2 text-ink-600">
            Stop guessing. Plug in your current savings, monthly contributions,
            and target retirement age to see exactly where you stand and what it
            takes to retire at 55.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/retirement"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
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
        <RelatedGuides currentSlug="how-much-to-retire-at-55" relatedSlugs={["401k-vs-roth-ira", "compound-interest-real-examples"]} />
      </article>
    </>
  );
}
