import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";

export const metadata: Metadata = {
  title: "Debt Avalanche vs Snowball Method: Which Gets You Debt-Free Faster?",
  description:
    "Debt avalanche vs snowball compared with real numbers. See which payoff method saves more interest, gets you debt-free faster, and fits your personality.",
  keywords: [
    "debt avalanche vs snowball",
    "debt snowball vs avalanche",
    "debt payoff method",
    "debt avalanche method",
    "debt snowball method",
    "which debt to pay off first",
  ],
};

const faqs = [
  {
    question: "Which saves more money: debt avalanche or debt snowball?",
    answer:
      "The debt avalanche saves more money in virtually every scenario because you eliminate high-interest debt first. In a typical $38,000 portfolio with $400/month in extra payments, avalanche saves about $108 in total interest versus snowball (both methods share the same 44-month debt-free timeline when the highest-rate debt is also the smallest balance). The gap widens as interest rate spreads increase — a portfolio with a 24% credit card and a 4% student loan can see avalanche save hundreds of dollars over snowball.",
  },
  {
    question: "Is the debt snowball method ever better than avalanche?",
    answer:
      "The snowball method can be better psychologically, not mathematically. If you have multiple small debts under $2,000 and need quick wins to stay motivated, snowball delivers visible progress faster. Research from Northwestern Kellogg found that consumers who paid off smaller balances first were more likely to eliminate their entire debt load, even though they paid slightly more interest. If you've quit debt payoff plans before, snowball's momentum may outweigh avalanche's math.",
  },
  {
    question: "How much extra should I pay toward debt each month?",
    answer:
      "Aim for at least $200-$400 above minimum payments, or 10-15% of your take-home pay dedicated to debt elimination. On a $70,000 salary ($4,375/month take-home), that means $438-$656/month toward debt. Even $150/month extra cuts a 5-year payoff timeline to roughly 3.5 years on $38,000 of debt. Use our Debt Payoff Calculator to find the exact amount that hits your target date.",
  },
  {
    question: "Should I pay off debt or build an emergency fund first?",
    answer:
      "Build a starter emergency fund of $1,500-$2,500 first, then attack debt aggressively. Without any buffer, one car repair or medical bill sends you right back to credit cards. Once you have that cushion, redirect every extra dollar to debt while maintaining minimum payments. After becoming debt-free, grow the emergency fund to 3-6 months of expenses ($13,000-$26,000 for most households).",
  },
  {
    question: "Can I combine avalanche and snowball into a hybrid method?",
    answer:
      "Yes, and many financial coaches recommend it. One approach: use snowball for debts under $3,000 (quick wins), then switch to avalanche for everything above that threshold. Another hybrid: avalanche for all debts above 15% APR (credit cards), snowball order for debts under 8%. This captures avalanche's savings on expensive debt while keeping snowball's motivational wins on manageable balances.",
  },
  {
    question: "Should I use a debt consolidation loan instead of avalanche or snowball?",
    answer:
      "It depends on the rate you qualify for. If you can consolidate $38,000 in mixed-rate debt into a single personal loan at 9-11% APR, you simplify payments and potentially lower your blended rate. However, as of mid-October 2026 the latest Federal Reserve G.19 release (August 2026 data) shows the average bank rate on 24-month personal loans at 11.90%, which only helps if your current blended rate exceeds that. Also budget for origination fees (often 1-8% of the loan amount on marketplace personal loans) — a 5% fee on $38,000 adds $1,900 in costs upfront. Run both scenarios in our Debt Payoff Calculator before committing.",
  },
];

export default function DebtAvalancheVsSnowballGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Debt Avalanche vs Snowball Method: Which Gets You Debt-Free Faster?"
        description="Debt avalanche vs snowball compared with real numbers. See which payoff method saves more interest, gets you debt-free faster, and fits your personality."
        slug="debt-avalanche-vs-snowball"
        datePublished="2026-08-24"
        dateModified="2026-10-20"
        image="/images/guides/debt-avalanche-vs-snowball.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "Debt Avalanche vs Snowball",
            href: "/guides/debt-avalanche-vs-snowball",
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
            / Debt Strategy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Debt Avalanche vs Snowball Method: Which Gets You Debt-Free Faster?
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            You owe $38,000 across three loans and can spare $400 a month beyond
            minimum payments. Two proven strategies — avalanche and snowball —
            will get you to zero, but they take different routes, cost different
            amounts in interest, and feel very different along the way. This guide
            runs the exact numbers so you can choose the method that actually
            works for your situation.
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
              <strong>Debt avalanche (highest rate first):</strong> Saves
              about $108 in interest on a typical $38,000 portfolio — the math
              winner whenever high-rate debts dominate
            </li>
            <li>
              <strong>Debt snowball (smallest balance first):</strong> Costs
              slightly more but delivers faster visible wins, which helps people
              who have quit debt plans before
            </li>
            <li>
              <strong>The real gap:</strong> On $38,000 with $400/month extra,
              avalanche takes 44 months and costs $6,267 in interest; snowball
              takes 44 months and costs $6,375
            </li>
            <li>
              <strong>Best hybrid:</strong> Avalanche for anything above 15% APR,
              snowball for balances under $3,000
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/debt-payoff"
              className="font-medium text-brand-600 underline"
            >
              Debt Payoff Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/credit-card-payoff"
              className="font-medium text-brand-600 underline"
            >
              Credit Card Payoff Calculator
            </Link>{" "}
            to model your exact debts.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/debt-avalanche-vs-snowball.webp"
              alt="Infographic comparing debt avalanche and debt snowball methods: avalanche targets highest interest rate first to save interest on $38,000 debt, snowball targets smallest balance first for faster psychological wins"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Avalanche minimizes interest; snowball maximizes momentum — same $1,014/month budget, different payoff order
            </figcaption>
          </figure>
        </section>

        {/* Section 1: What Are These Methods */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How the Debt Avalanche and Snowball Methods Work
          </h2>
          <p className="mt-4 text-ink-700">
            Both methods share the same foundation: pay the minimum on every
            debt, then throw every extra dollar at one target debt until it is
            gone. When a debt is eliminated, roll its payment into the next
            target. The only difference is which debt you target first — and
            that single choice changes your timeline, total interest, and
            day-to-day motivation.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            The Debt Avalanche Method
          </h3>
          <p className="mt-2 text-ink-700">
            Avalanche prioritizes the debt with the highest interest rate,
            regardless of balance size. The logic is straightforward: every
            dollar applied to a 22.36% credit card (the Federal Reserve G.19
            average for accounts assessed interest as of August 2026) saves you $0.224 per
            year in future interest, while a dollar on a 6.52% undergraduate
            federal student loan saves only $0.065. You always attack the most
            expensive debt first.
          </p>
          <p className="mt-4 text-ink-700">
            The formula for monthly interest on any debt is:
          </p>
          <div className="mt-3 rounded-lg border border-ink-200 bg-ink-50 px-4 py-3 font-mono text-sm text-ink-800">
            Monthly Interest = Balance × (APR ÷ 12)
          </div>
          <p className="mt-4 text-ink-700">
            On an $8,500 credit card at 22.36% APR, monthly interest is $158.38.
            On a $14,500 student loan at 6.52%, it is $78.78. Avalanche sends
            your extra $400/month to the credit card first, eliminating $158.38
            in monthly interest charges as fast as possible.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            The Debt Snowball Method
          </h3>
          <p className="mt-2 text-ink-700">
            Snowball prioritizes the smallest balance, regardless of interest
            rate. You pay minimums on everything, then direct all extra money
            to the debt with the lowest dollar amount. When that balance hits
            $0, you roll its entire payment — minimum plus extra — into the
            next-smallest debt.
          </p>
          <p className="mt-4 text-ink-700">
            The snowball payment escalation works like this:
          </p>
          <div className="mt-3 rounded-lg border border-ink-200 bg-ink-50 px-4 py-3 font-mono text-sm text-ink-800">
            Next Target Payment = Previous Target Payment + Freed Minimum
            Payment
          </div>
          <p className="mt-4 text-ink-700">
            If your smallest debt has a $170 minimum and you add $400 extra,
            you pay $570/month until it is gone. When eliminated, that entire
            $570 rolls to the next-smallest debt, on top of its existing
            minimum. Each elimination creates a larger payment snowball rolling
            downhill toward the final debt.
          </p>
        </section>

        {/* Section 2: Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Head-to-Head: $38,000 Debt Portfolio
          </h2>
          <p className="mt-4 text-ink-700">
            Here is a realistic three-debt portfolio totaling $38,000, with
            $614/month in minimum payments and $400/month in extra cash ($1,014
            total monthly budget). Both methods use identical total payments —
            only the order changes.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Debt
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Balance
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Min Payment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Credit card</td>
                  <td className="px-4 py-3">$8,500</td>
                  <td className="px-4 py-3">22.36%</td>
                  <td className="px-4 py-3">$170</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Car loan</td>
                  <td className="px-4 py-3">$15,000</td>
                  <td className="px-4 py-3">7.54%</td>
                  <td className="px-4 py-3">$294</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Student loan</td>
                  <td className="px-4 py-3">$14,500</td>
                  <td className="px-4 py-3">6.52%</td>
                  <td className="px-4 py-3">$150</td>
                </tr>
                <tr className="bg-brand-50/50 font-medium">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3">$38,000</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">$614</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Avalanche
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Snowball
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Payoff order</td>
                  <td className="px-4 py-3">
                    Credit card (22.36%) → Car (7.54%) → Student (6.52%)
                  </td>
                  <td className="px-4 py-3">
                    Credit card ($8,500) → Student ($14,500) → Car
                    ($15,000)
                  </td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">First debt eliminated</td>
                  <td className="px-4 py-3">Month 18 (credit card)</td>
                  <td className="px-4 py-3">Month 18 (credit card)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Second debt eliminated</td>
                  <td className="px-4 py-3">Month 32 (car loan)</td>
                  <td className="px-4 py-3">Month 37 (student loan)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Debt-free date</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    Month 44
                  </td>
                  <td className="px-4 py-3">Month 44</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total interest paid</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    $6,267
                  </td>
                  <td className="px-4 py-3">$6,375</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Interest difference</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    Saves $108
                  </td>
                  <td className="px-4 py-3">Costs $108 more</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total amount paid</td>
                  <td className="px-4 py-3">$44,267</td>
                  <td className="px-4 py-3">$44,375</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Assumes $400/month extra on top of $614 in minimum payments ($1,014
            total). Credit card APR reflects the 22.36% G.19 average for accounts
            assessed interest (August 2026, release Oct. 7, 2026); car and student
            rates reflect G.19 and 2026-27 federal undergraduate loan rates.
            Calculations use standard monthly compounding with rolled minimum
            payments. Payoff table figures recomputed October 2026 — use our
            calculators for your exact debts.
          </p>
          <Sources
            items={[
              {
                label:
                  "Federal Reserve — G.19 Consumer Credit terms of credit (Aug. 2026, Oct. 7, 2026 release)",
                href: "https://www.federalreserve.gov/releases/g19/current/default.htm",
              },
              {
                label:
                  "Federal Student Aid — Direct Loan rates 2026-27 (June 4, 2026)",
                href: "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/interest-rates-federal-direct-loans-first-disbursed-between-july-1-2026-and-june-30-2027",
              },
            ]}
            checked="October 2026"
          />

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Key Insight</p>
            <p className="mt-1 text-sm text-amber-700">
              Both methods eliminate the $8,500 credit card in month 18 because
              it is both the highest-rate and smallest-balance debt. The
              divergence happens next: avalanche targets the 7.54% car loan while
              snowball targets the 6.52% student loan. That rate-order difference
              on similar $14,500-$15,000 balances accounts for the $108 interest
              gap even though both portfolios become debt-free in month 44.
            </p>
          </div>
        </section>

        {/* Section 3: Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Maria, 31, $70K Salary in Chicago
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Her Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Gross salary: $70,000/year ($4,375/month take-home)</li>
                  <li>Total debt: $24,000 across 4 accounts</li>
                  <li>Minimum payments: $490/month</li>
                  <li>Extra available: $350/month</li>
                  <li>Total debt budget: $840/month (19.2% of take-home)</li>
                  <li>No employer 401(k) match (already contributing 4%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Her 4 Debts</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Store credit card: $3,200 at 26.49% ($64 min)</li>
                  <li>Visa card: $1,800 at 21.99% ($36 min)</li>
                  <li>Personal loan: $6,600 at 11.9% ($145 min)</li>
                  <li>Car loan: $12,400 at 7.8% ($245 min)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                Avalanche: First 6 Months (Highest Rate First)
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                Maria targets the 26.49% store card first, paying $64 minimum +
                $350 extra = $414/month.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-ink-200 bg-ink-50">
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Month
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Store CC
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Visa
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Personal
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Car
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Total Debt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    <tr>
                      <td className="px-3 py-2">Start</td>
                      <td className="px-3 py-2">$3,200</td>
                      <td className="px-3 py-2">$1,800</td>
                      <td className="px-3 py-2">$6,600</td>
                      <td className="px-3 py-2">$12,400</td>
                      <td className="px-3 py-2 font-medium">$24,000</td>
                    </tr>
                    <tr className="bg-ink-50/50">
                      <td className="px-3 py-2">1</td>
                      <td className="px-3 py-2">$2,857</td>
                      <td className="px-3 py-2">$1,797</td>
                      <td className="px-3 py-2">$6,520</td>
                      <td className="px-3 py-2">$12,236</td>
                      <td className="px-3 py-2">$23,410</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">2</td>
                      <td className="px-3 py-2">$2,506</td>
                      <td className="px-3 py-2">$1,794</td>
                      <td className="px-3 py-2">$6,440</td>
                      <td className="px-3 py-2">$12,070</td>
                      <td className="px-3 py-2">$22,810</td>
                    </tr>
                    <tr className="bg-ink-50/50">
                      <td className="px-3 py-2">3</td>
                      <td className="px-3 py-2">$2,147</td>
                      <td className="px-3 py-2">$1,791</td>
                      <td className="px-3 py-2">$6,359</td>
                      <td className="px-3 py-2">$11,904</td>
                      <td className="px-3 py-2">$22,201</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">$1,780</td>
                      <td className="px-3 py-2">$1,788</td>
                      <td className="px-3 py-2">$6,277</td>
                      <td className="px-3 py-2">$11,736</td>
                      <td className="px-3 py-2">$21,581</td>
                    </tr>
                    <tr className="bg-ink-50/50">
                      <td className="px-3 py-2">5</td>
                      <td className="px-3 py-2">$1,406</td>
                      <td className="px-3 py-2">$1,784</td>
                      <td className="px-3 py-2">$6,194</td>
                      <td className="px-3 py-2">$11,567</td>
                      <td className="px-3 py-2">$20,951</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">6</td>
                      <td className="px-3 py-2">$1,023</td>
                      <td className="px-3 py-2">$1,781</td>
                      <td className="px-3 py-2">$6,111</td>
                      <td className="px-3 py-2">$11,397</td>
                      <td className="px-3 py-2">$20,312</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-ink-500">
                After 6 months: $3,688 paid down (15.4% of total debt). Store
                card on track to clear by month 9. Total interest paid so far:
                approximately $1,350.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                Snowball: First 6 Months (Smallest Balance First)
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                Maria targets the $1,800 Visa first ($36 min + $350 extra =
                $386/month), even though the store card has a higher rate.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-ink-200 bg-ink-50">
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Month
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Visa
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Store CC
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Personal
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Car
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">
                        Total Debt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    <tr>
                      <td className="px-3 py-2">Start</td>
                      <td className="px-3 py-2">$1,800</td>
                      <td className="px-3 py-2">$3,200</td>
                      <td className="px-3 py-2">$6,600</td>
                      <td className="px-3 py-2">$12,400</td>
                      <td className="px-3 py-2 font-medium">$24,000</td>
                    </tr>
                    <tr className="bg-ink-50/50">
                      <td className="px-3 py-2">1</td>
                      <td className="px-3 py-2">$1,447</td>
                      <td className="px-3 py-2">$3,207</td>
                      <td className="px-3 py-2">$6,520</td>
                      <td className="px-3 py-2">$12,236</td>
                      <td className="px-3 py-2">$23,410</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">2</td>
                      <td className="px-3 py-2">$1,088</td>
                      <td className="px-3 py-2">$3,213</td>
                      <td className="px-3 py-2">$6,440</td>
                      <td className="px-3 py-2">$12,070</td>
                      <td className="px-3 py-2">$22,811</td>
                    </tr>
                    <tr className="bg-ink-50/50">
                      <td className="px-3 py-2">3</td>
                      <td className="px-3 py-2">$721</td>
                      <td className="px-3 py-2">$3,220</td>
                      <td className="px-3 py-2">$6,359</td>
                      <td className="px-3 py-2">$11,904</td>
                      <td className="px-3 py-2">$22,204</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">$349</td>
                      <td className="px-3 py-2">$3,227</td>
                      <td className="px-3 py-2">$6,277</td>
                      <td className="px-3 py-2">$11,736</td>
                      <td className="px-3 py-2">$21,589</td>
                    </tr>
                    <tr className="bg-brand-50/50">
                      <td className="px-3 py-2">5</td>
                      <td className="px-3 py-2 text-brand-700 font-medium">
                        $0
                      </td>
                      <td className="px-3 py-2">$3,204</td>
                      <td className="px-3 py-2">$6,194</td>
                      <td className="px-3 py-2">$11,567</td>
                      <td className="px-3 py-2">$20,965</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">6</td>
                      <td className="px-3 py-2">—</td>
                      <td className="px-3 py-2">$2,824</td>
                      <td className="px-3 py-2">$6,111</td>
                      <td className="px-3 py-2">$11,397</td>
                      <td className="px-3 py-2">$20,332</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-ink-500">
                After 6 months: $3,668 paid down (15.3% of total debt). Visa
                eliminated in month 5 — Maria gets her first zero-balance win.
                Payment snowball increases to $450/month on store card (month
                6). Total interest paid so far: approximately $1,370 ($20 more
                than avalanche).
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Maria's Outcome</h4>
              <p className="mt-2 text-sm text-ink-700">
                Avalanche clears all $24,000 in 33 months with $3,642 in total
                interest. Snowball also takes 33 months but costs $3,715 — about
                $73 more. Maria still chose snowball because she had abandoned
                two previous debt plans. Eliminating the $1,800 Visa in month 5
                gave her the momentum to stay on track even though avalanche
                would have saved $73 in interest over the same timeline.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: When to Use Which */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When to Use Avalanche vs Snowball
          </h2>
          <p className="mt-4 text-ink-700">
            The right method depends less on the math and more on how you behave
            with money. Here is how to match the strategy to your personality
            and debt profile.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Choose Avalanche If You Are...
          </h3>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Data-driven and disciplined.</strong> You track spreadsheets,
              check balances weekly, and stay motivated by watching interest
              charges shrink — not by closing accounts.
            </li>
            <li>
              <strong>Carrying high-rate credit card debt.</strong> If any debt
              exceeds 18% APR, avalanche savings become significant. On $15,000
              at 22% or higher, avalanche vs snowball can differ by hundreds of
              dollars depending on your other balances.
            </li>
            <li>
              <strong>Already tried and stuck with a debt plan.</strong> If you
              have successfully paid off debt before, you do not need snowball's
              psychological crutch — take the mathematically optimal path.
            </li>
            <li>
              <strong>Facing a large rate spread.</strong> When your highest and
              lowest rates differ by 10+ points (for example, a store card above
              24% APR versus a federal student loan near 6.5%), avalanche's
              advantage is largest.
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Choose Snowball If You Are...
          </h3>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Someone who has quit debt plans before.</strong> If willpower
              failed you in the past, the quick win of eliminating a $1,800 or
              $2,400 balance in 4-5 months can be the difference between finishing
              and giving up.
            </li>
            <li>
              <strong>Juggling 5+ small debts.</strong> Multiple accounts under
              $3,000 create decision fatigue. Snowball gives you a clear, simple
              rule: smallest first, always.
            </li>
            <li>
              <strong>Needing visible progress fast.</strong> Closing an account
              in month 5 (like Maria's Visa) feels dramatically different from
              watching a $3,200 balance slowly shrink on a single card.
            </li>
            <li>
              <strong>Dealing with similar interest rates.</strong> If all debts
              are within 2-3 percentage points of each other, the math difference
              between methods shrinks to $50-$100 — not worth sacrificing
              motivation over.
            </li>
          </ul>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">The Math vs Motivation Test</p>
            <p className="mt-1 text-sm text-brand-700">
              Ask yourself one question: "Have I started and abandoned a debt
              payoff plan in the last 3 years?" If yes, use snowball — the
              $100-$300 in extra interest is cheaper than another failed attempt
              that leaves you $24,000 in debt. If no, use avalanche and keep
              every dollar working for you.
            </p>
          </div>
        </section>

        {/* Section 5: Step-by-Step Implementation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: How to Implement Each Method
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Setting Up the Debt Avalanche
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  List every debt with balance, APR, and minimum payment
                </h4>
                <p className="mt-1 text-sm text-ink-700">
                  Include credit cards, car loans, personal loans, medical bills,
                  and student loans. For $38,000 across 3 debts, your list
                  might show $8,500 at 22.36%, $15,000 at 7.54%, and $14,500 at
                  6.52%.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  Sort by interest rate, highest to lowest
                </h4>
                <p className="mt-1 text-sm text-ink-700">
                  Your avalanche order: 22.36% credit card first, 7.54% car loan
                  second, 6.52% student loan last. Rate beats balance every
                  time.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  Pay minimums on all debts, extra on the top of the list
                </h4>
                <p className="mt-1 text-sm text-ink-700">
                  With $614 in minimums and $400 extra, send $570 to the credit
                  card ($170 min + $400), $294 to the car, and $150 to the
                  student loan. Total outflow: $1,014/month.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  Roll payments forward when a debt is eliminated
                </h4>
                <p className="mt-1 text-sm text-ink-700">
                  When the credit card clears in month 18, redirect the full
                  $570 to the car loan ($570 + $294 = $864/month). When the car
                  clears, send $864 + $150 = $1,014 to the student loan until
                  everything is zero.
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Setting Up the Debt Snowball
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  List every debt with balance, APR, and minimum payment
                </h4>
                <p className="mt-1 text-sm text-ink-700">
                  Same starting list as avalanche — you need identical
                  information. Do not skip any account, even a $400 medical bill
                  at 0% interest.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  Sort by balance, smallest to largest
                </h4>
                <p className="mt-1 text-sm text-ink-700">
                  Your snowball order: $8,500 credit card first, $14,500 student
                  loan second, $15,000 car loan last. Balance beats rate every
                  time.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  Pay minimums on all debts, extra on the smallest balance
                </h4>
                <p className="mt-1 text-sm text-ink-700">
                  Same $1,014/month budget. Send $570 to the credit card, $150
                  to the student loan, and $294 to the car. The payment
                  distribution looks identical to avalanche in month 1 — the
                  difference appears when the first debt clears.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  Celebrate each elimination and roll the snowball forward
                </h4>
                <p className="mt-1 text-sm text-ink-700">
                  When the credit card clears in month 18, roll $570 to the
                  student loan ($570 + $150 = $720/month). When the student
                  loan clears in month 37, roll $720 to the car ($720 + $294 =
                  $1,014/month) until the final balance hits $0.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Common Mistakes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            4 Mistakes That Derail Both Methods
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Adding new debt while paying off old debt
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Putting $400/month toward payoff while charging $300/month in new
                purchases on the same card is running on a treadmill. Cut up the
                card or freeze it in a block of ice. Use a debit card or cash
                for all spending until every balance reads $0.00.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Ignoring the emergency fund entirely
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Sending 100% of savings to debt with $0 in the bank means one
                $800 car repair goes right back on a credit card at 22%+. Save
                $1,500-$2,500 first, then redirect the full $400/month to debt.
                The 2-month delay costs roughly $35 in extra interest — far less
                than an $800 relapse.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Paying only minimums on the target debt
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The method only works if you add extra beyond the minimum. On
                an $8,500 credit card at 22.36%, paying just the $170 minimum takes
                about 12 years and costs roughly $16,200 in interest. Adding
                $570/month on that card ($170 minimum plus $400 extra) cuts that to 18 months and about $1,550 in interest.
                The extra payment is the entire strategy.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                Switching methods mid-stream
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Pick one method and commit for at least 6 months. Switching from
                avalanche to snowball in month 4 resets your mental accounting
                and often leads to abandoning the plan entirely. Run both
                scenarios in a calculator first, choose one, and execute.
              </p>
            </div>
          </div>
        </section>

        <Sources
          items={[
            {
              label:
                "Gal & McShane (Kellogg) — debt snowball account-closure study (JMR, 2012)",
              href: "https://doi.org/10.1509/jmr.11.0272",
            },
          ]}
          checked="October 2026"
          note="Cited for snowball motivation research in the FAQ; payoff timelines above are CalcWise illustrations."
          className="mt-8"
        />

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Run Your Debt Payoff Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Every debt portfolio is different. Enter your exact balances, rates,
            and monthly budget to see whether avalanche or snowball gets you
            debt-free faster — and how much each method costs in interest.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/debt-payoff"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Debt Payoff Calculator
            </Link>
            <Link
              href="/calculators/credit-card-payoff"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Credit Card Payoff Calculator
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
        <RelatedGuides currentSlug="debt-avalanche-vs-snowball" relatedSlugs={["how-to-pay-off-credit-card-fast", "50-30-20-budget-rule"]} />
      </article>
    </>
  );
}
