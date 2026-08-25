import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "How to Save $50,000 in 3 Years: A Realistic Plan",
  description:
    "A step-by-step plan to save $50,000 in 3 years on an average salary. Includes monthly targets, budget breakdowns, a real case study, and strategies that actually work.",
  keywords: [
    "how to save 50000 in 3 years",
    "save 50k in 3 years",
    "saving plan 50000",
    "how to save money fast",
    "3 year savings plan",
  ],
};

const faqs = [
  {
    question: "How much do I need to save per month to reach $50,000 in 3 years?",
    answer:
      "Without any interest, you need to save $1,389 per month ($50,000 / 36 months). With a high-yield savings account earning 4.5-5.0% APY, the required monthly contribution drops to approximately $1,295-$1,310 because compound interest does some of the work for you.",
  },
  {
    question: "Can I save $50,000 in 3 years on a $60,000 salary?",
    answer:
      "It's extremely difficult but possible with aggressive lifestyle changes. On a $60,000 gross salary (approximately $3,750/month after taxes), saving $1,389 leaves only $2,361 for all expenses. You'd likely need to supplement with side income of $500-800/month and keep housing costs under $1,200/month. A more comfortable path requires either a higher salary or a longer timeline.",
  },
  {
    question: "Where should I keep my $50,000 savings goal money?",
    answer:
      "A high-yield savings account (HYSA) is the best option for a 3-year goal. In 2026, the best HYSAs offer 4.5-5.0% APY with FDIC insurance. Avoid investing this money in stocks — a 3-year timeline is too short to recover from a potential market downturn. CDs can work if you use a CD ladder strategy, but they sacrifice flexibility.",
  },
  {
    question: "What if I fall behind on my savings goal?",
    answer:
      "Recalculate immediately. If you miss $500 one month, you need an extra $16/month across the remaining months to catch up — manageable if caught early. Consider building a one-month buffer into your plan (target $50,000 in 35 months instead of 36). Also look for one-time windfalls: tax refunds, bonuses, or selling unused items can cover gaps.",
  },
  {
    question: "Should I pay off debt before saving $50,000?",
    answer:
      "It depends on the interest rate. Pay off credit card debt (18-25% APR) first — no savings account can match that guaranteed return. For student loans under 5-6%, you can save and pay simultaneously. For a car loan at 4-7%, consider the minimum payments while saving. The math is simple: if your debt interest rate exceeds your savings rate (currently 4.5-5%), pay the debt first.",
  },
];

export default function Save50000In3YearsGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="How to Save $50,000 in 3 Years: A Realistic Plan"
        description="A step-by-step plan to save $50,000 in 3 years on an average salary. Includes monthly targets, budget breakdowns, a real case study, and strategies that actually work."
        slug="save-50000-in-3-years"
        datePublished="2026-08-24"
        image="/images/guides/save-50000-in-3-years.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "How to Save $50,000 in 3 Years", href: "/guides/save-50000-in-3-years" },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Savings Strategy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            How to Save $50,000 in 3 Years: A Realistic Plan
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Saving $50,000 in 36 months means putting away $1,389 every single
            month. That sounds daunting — but with the right strategy, automation,
            and a high-yield savings account working in your favor, it breaks down
            into a system anyone earning $75,000+ can follow. This guide maps out
            exactly how to get there.
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
              <strong>Monthly target:</strong> $1,389/month without interest, or
              ~$1,300/month with a 5% APY savings account
            </li>
            <li>
              <strong>Best vehicle:</strong> High-yield savings account (4.5-5.0%
              APY in 2026) — not stocks, not CDs
            </li>
            <li>
              <strong>The formula:</strong> 60% budget cuts + 30% income boost +
              10% interest earnings
            </li>
            <li>
              <strong>Automate everything:</strong> Set up automatic transfers on
              payday — savings that require willpower fail
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/savings-goal"
              className="font-medium text-brand-600 underline"
            >
              Savings Goal Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/compound-interest"
              className="font-medium text-brand-600 underline"
            >
              Compound Interest Calculator
            </Link>{" "}
            to build your personalized plan.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/save-50000-in-3-years.webp"
              alt="Infographic showing a 3-year savings timeline from $0 to $50,000, with monthly target of $1,389 broken into budget cuts, side income, and interest earnings"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              The 3-year path to $50,000: consistent monthly contributions plus compound interest
            </figcaption>
          </figure>
        </section>

        {/* Section 1: The Math */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Math Behind Saving $50,000 in 3 Years
          </h2>
          <p className="mt-4 text-ink-700">
            Before building a plan, you need to understand the raw numbers.
            $50,000 divided by 36 months equals $1,388.89 per month. That is your
            baseline target if you stuff cash under a mattress with zero interest.
          </p>
          <p className="mt-4 text-ink-700">
            But you are not going to use a mattress. A high-yield savings account
            paying 5.0% APY (readily available from online banks in 2026) means
            compound interest contributes roughly $3,800 of that $50,000 over
            three years. Your actual monthly contribution drops to approximately
            $1,283 — saving you $106/month compared to the zero-interest baseline.
          </p>
          <p className="mt-4 text-ink-700">
            Here is how the money grows month by month at 5.0% APY:
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Milestone</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Months</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Total Deposited</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Interest Earned</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Month 6</td>
                  <td className="px-4 py-3">6</td>
                  <td className="px-4 py-3">$7,698</td>
                  <td className="px-4 py-3">$97</td>
                  <td className="px-4 py-3">$7,795</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Year 1</td>
                  <td className="px-4 py-3">12</td>
                  <td className="px-4 py-3">$15,396</td>
                  <td className="px-4 py-3">$395</td>
                  <td className="px-4 py-3">$15,791</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Month 18</td>
                  <td className="px-4 py-3">18</td>
                  <td className="px-4 py-3">$23,094</td>
                  <td className="px-4 py-3">$899</td>
                  <td className="px-4 py-3">$23,993</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Year 2</td>
                  <td className="px-4 py-3">24</td>
                  <td className="px-4 py-3">$30,792</td>
                  <td className="px-4 py-3">$1,616</td>
                  <td className="px-4 py-3">$32,408</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Month 30</td>
                  <td className="px-4 py-3">30</td>
                  <td className="px-4 py-3">$38,490</td>
                  <td className="px-4 py-3">$2,554</td>
                  <td className="px-4 py-3">$41,044</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Year 3 (Goal)</td>
                  <td className="px-4 py-3 font-medium">36</td>
                  <td className="px-4 py-3 font-medium">$46,188</td>
                  <td className="px-4 py-3 font-medium">$3,812</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$50,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Based on $1,283/month deposits into a 5.0% APY high-yield savings account with monthly compounding. Actual interest may vary with rate changes.
          </p>

          <p className="mt-6 text-ink-700">
            The key insight: interest contributes $3,812 — nearly 3 full months of
            deposits you do not have to make. Every dollar saved earlier in the
            timeline earns more interest, which is why front-loading contributions
            (saving more in Year 1) accelerates the goal significantly.
          </p>
        </section>

        {/* Section 2: Income Requirements */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            What Income Do You Actually Need?
          </h2>
          <p className="mt-4 text-ink-700">
            Saving $1,283/month requires a certain minimum take-home pay to
            remain realistic. Financial experts generally agree that saving more
            than 30-35% of take-home pay is unsustainable long-term without
            extreme lifestyle sacrifices. Here is the salary math:
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Gross Annual Salary</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Monthly Take-Home (est.)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">$1,283 as % of Take-Home</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Feasibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">$50,000</td>
                  <td className="px-4 py-3">$3,333</td>
                  <td className="px-4 py-3">38.5%</td>
                  <td className="px-4 py-3 text-amber-700">Very difficult</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">$65,000</td>
                  <td className="px-4 py-3">$4,167</td>
                  <td className="px-4 py-3">30.8%</td>
                  <td className="px-4 py-3 text-amber-700">Challenging but doable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">$75,000</td>
                  <td className="px-4 py-3">$4,688</td>
                  <td className="px-4 py-3">27.4%</td>
                  <td className="px-4 py-3 text-brand-700">Realistic</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">$90,000</td>
                  <td className="px-4 py-3">$5,500</td>
                  <td className="px-4 py-3">23.3%</td>
                  <td className="px-4 py-3 text-brand-700">Comfortable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">$120,000</td>
                  <td className="px-4 py-3">$7,000</td>
                  <td className="px-4 py-3">18.3%</td>
                  <td className="px-4 py-3 text-brand-700">Highly achievable</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Take-home estimates assume single filer, standard deduction, no state income tax. Your actual take-home varies by state, filing status, and pre-tax deductions.
          </p>

          <p className="mt-6 text-ink-700">
            If your income puts you in the "very difficult" range, you have two
            options: extend the timeline (4 years requires only $1,000/month) or
            boost income through side work. We cover both strategies below.
          </p>
        </section>

        {/* Section 3: Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Real Case Study: Jessica, $72,000 Salary in Austin, TX
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Her Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Age: 28, marketing manager</li>
                  <li>Gross salary: $72,000/year ($6,000/month)</li>
                  <li>Take-home after taxes/benefits: $4,480/month</li>
                  <li>Goal: $50,000 for a house down payment in 3 years</li>
                  <li>Current savings: $2,400 (essentially starting from zero)</li>
                  <li>Debt: $8,200 student loans at 4.2% (minimum $145/month)</li>
                  <li>Rent: $1,450/month (1BR apartment)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Her Strategy</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Moved to a $1,150/month apartment (saved $300)</li>
                  <li>Cut subscriptions from $187 to $45 (saved $142)</li>
                  <li>Meal prepped lunches — food from $680 to $420 (saved $260)</li>
                  <li>Started freelance copywriting: $600-900/month</li>
                  <li>Opened a 5.0% APY HYSA (Marcus by Goldman Sachs)</li>
                  <li>Automated $1,350 transfer every payday</li>
                  <li>Kept student loan at minimum (4.2% &lt; 5.0% savings rate)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Her Monthly Budget (Post-Optimization)</h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Housing</p>
                  <p className="font-semibold text-ink-800">$1,150</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Savings Transfer</p>
                  <p className="font-semibold text-brand-700">$1,350</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Food & Groceries</p>
                  <p className="font-semibold text-ink-800">$420</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Transportation</p>
                  <p className="font-semibold text-ink-800">$280</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Student Loan</p>
                  <p className="font-semibold text-ink-800">$145</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Everything Else</p>
                  <p className="font-semibold text-ink-800">$535</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Results After 18 Months</h4>
              <p className="mt-2 text-sm text-ink-700">
                Jessica&apos;s HYSA balance hit $25,400 — slightly ahead of
                schedule because her freelance income averaged $750/month (she
                deposited this as a bonus on top of her $1,350 base). She also
                received a $3,200 tax refund in Year 1 that went straight into
                savings. At month 18, she was tracking to reach $50,000 by month
                32 — four months early. She adjusted her freelance hours down
                slightly and added back a $50/month gym membership she had
                canceled without feeling guilty.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Budget Breakdown Strategies */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Where to Find $1,300/Month: Budget Cuts That Actually Work
          </h2>
          <p className="mt-4 text-ink-700">
            Most savings advice tells you to "cut lattes." That saves $150/month
            at best. To find $1,300+, you need to attack the three biggest expense
            categories — housing, transportation, and food — which typically
            consume 65-75% of take-home pay.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Strategy</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Monthly Savings</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Housing</td>
                  <td className="px-4 py-3">Get a roommate or downsize</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$300-800</td>
                  <td className="px-4 py-3">High impact, high effort</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Transportation</td>
                  <td className="px-4 py-3">Switch to a paid-off used car or bike commute</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$200-500</td>
                  <td className="px-4 py-3">Moderate effort</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Food</td>
                  <td className="px-4 py-3">Meal prep + limit dining to 2x/month</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$200-400</td>
                  <td className="px-4 py-3">Moderate effort</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Subscriptions</td>
                  <td className="px-4 py-3">Cancel all but 2-3 essentials</td>
                  <td className="px-4 py-3 font-medium">$80-200</td>
                  <td className="px-4 py-3">Easy</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Insurance</td>
                  <td className="px-4 py-3">Shop for quotes annually, raise deductibles</td>
                  <td className="px-4 py-3 font-medium">$50-150</td>
                  <td className="px-4 py-3">Easy</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Shopping</td>
                  <td className="px-4 py-3">30-day rule + unsubscribe from retail emails</td>
                  <td className="px-4 py-3 font-medium">$100-300</td>
                  <td className="px-4 py-3">Moderate effort</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Savings estimates based on national averages. Your actual savings will vary by location and current spending habits.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Key Insight</p>
            <p className="mt-1 text-sm text-amber-700">
              Housing is the single biggest lever. Reducing rent by $400/month
              accounts for 31% of your entire savings target. If you can negotiate
              a roommate situation or move to a cheaper area for 3 years, you are
              already one-third of the way to $50,000 from housing savings alone.
            </p>
          </div>
        </section>

        {/* Section 5: Income Boosting */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Boosting Income: The Faster Path to $50,000
          </h2>
          <p className="mt-4 text-ink-700">
            There is a ceiling on how much you can cut expenses — you cannot
            reduce your food budget below zero. But there is no ceiling on
            income. Adding $500-1,000/month in side income reduces the pressure
            on your budget dramatically and often makes the difference between
            "possible" and "comfortable."
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Freelancing Your Existing Skills ($500-3,000/month)
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The highest ROI side income uses skills you already have. A
                marketing professional can freelance on Upwork for $50-100/hour.
                A developer can build small projects for $2,000-5,000 each. A
                teacher can tutor for $40-80/hour. Start with 5-10 hours/week and
                scale based on capacity. Platforms: Upwork, Fiverr Pro, Toptal,
                or direct outreach to small businesses.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Negotiate a Raise ($200-800/month)
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The average raise request yields a 5-7% increase when backed by
                market data. On a $72,000 salary, that is $3,600-5,040 annually
                ($300-420/month). Time your ask after a strong performance review
                or completed major project. Research comparable salaries on
                Glassdoor, Levels.fyi, or Payscale and present a specific number,
                not a range.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Sell Unused Assets ($1,000-5,000 one-time)
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The average American household has $3,000-5,000 in unused items.
                Old electronics ($200-800), furniture ($100-500), clothing
                ($200-600), collectibles, and sporting equipment all sell quickly
                on Facebook Marketplace, eBay, or Poshmark. A one-time $3,000
                asset sale equals 2+ months of savings deposits.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Step-by-Step Plan */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: Your 3-Year Savings Plan
          </h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Open a high-yield savings account (Day 1)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Choose a bank offering 4.5%+ APY with no minimum balance and no
                  monthly fees. In 2026, top options include Marcus (Goldman
                  Sachs), Ally Bank, and Capital One 360. Separate this from your
                  checking account — out of sight, out of mind. Do not get a
                  linked debit card.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Calculate your exact monthly target (Day 1)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Use our{" "}
                  <Link
                    href="/calculators/savings-goal"
                    className="text-brand-600 underline"
                  >
                    Savings Goal Calculator
                  </Link>{" "}
                  with: Goal = $50,000, Timeline = 36 months, Interest Rate =
                  your HYSA's APY. This gives you the precise monthly deposit
                  needed. Write this number down and memorize it.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Automate the transfer (Day 2)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Set up an automatic recurring transfer from checking to your
                  HYSA for the morning after each payday. If paid biweekly,
                  split it: $642/paycheck. The transfer must happen before you
                  see the money in your checking account. This is non-negotiable
                  — willpower-based savings fail 73% of the time according to
                  behavioral finance research.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Audit your spending and cut the Big 3 (Week 1)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Pull 3 months of bank/credit card statements. Categorize every
                  dollar. Focus cuts on housing, transportation, and food — these
                  three typically total 65-75% of spending. Target $700-900/month
                  in cuts from these categories alone. Ignore small purchases
                  under $20/month — they are not worth the mental energy.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                5
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Start one income-boosting activity (Month 1)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Pick the highest-value side income you can start this month.
                  Freelancing, tutoring, consulting, or a part-time gig that pays
                  $400+/month. Dedicate the first month to getting set up and
                  landing your first client. All side income goes directly into
                  the HYSA — do not blend it with regular spending.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                6
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Monthly check-in: track and adjust (Every 30 days)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Every month, compare your HYSA balance to the milestone table
                  above. If you are behind, identify why and make one specific
                  adjustment. If ahead, consider whether you can sustain the pace
                  or need to ease up to avoid burnout. The goal is consistency
                  over heroics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Common Mistakes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            5 Mistakes That Derail $50,000 Savings Goals
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                1. Investing the money in stocks
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Three years is too short for stock market risk. The S&P 500
                dropped 34% in 33 days during COVID (2020) and took 6 months to
                recover. If your timeline coincides with a crash, you could be
                sitting at $33,000 when you need $50,000. A HYSA with 5% APY
                gives you guaranteed growth with zero downside.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                2. Not automating transfers
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Manual savings requires 36 consecutive decisions to transfer
                money. Each one is an opportunity to rationalize skipping "just
                this month." Automatic transfers remove decision fatigue entirely.
                Research from the National Bureau of Economic Research shows
                automatic enrollment increases savings rates by 55% compared to
                opt-in systems.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. Starting too aggressively and burning out
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Saving 40% of take-home pay from day one is like running a sprint
                at marathon pace. By month 4, most people quit entirely. Start at
                25% if needed and ramp up as you adjust. Consistency at $1,100/month
                for 36 months beats $1,500/month for 8 months followed by giving
                up.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                4. No emergency fund buffer
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                If your car breaks down ($1,500 repair) and your only savings is
                the $50,000 fund, you will raid it. Keep a separate $2,000-3,000
                emergency buffer in checking or a separate savings account. This
                prevents one bad month from derailing your entire 3-year plan.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                5. Ignoring lifestyle inflation during the 3 years
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                You get a $5,000 raise in Year 2. The temptation is to "reward
                yourself" with a nicer apartment or a new car. Every dollar of
                lifestyle inflation during your 3-year window directly reduces
                your savings. The raise should go into the HYSA until you hit
                $50,000 — then celebrate however you want.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Run Your Own Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Every income and expense situation is different. Use our free
            calculators to find your exact monthly target and see how interest
            accelerates your progress.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/savings-goal"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Savings Goal Calculator
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
        <RelatedGuides currentSlug="save-50000-in-3-years" relatedSlugs={["50-30-20-budget-rule", "high-yield-savings-vs-cd"]} />
      </article>
    </>
  );
}
