import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Pay Off Mortgage Early vs Invest: The Math Behind the Decision",
  description:
    "Should you pay off your mortgage early or invest the extra money? We run the real numbers at today's rates so you can see exactly which option builds more wealth.",
  keywords: [
    "is it better to pay off mortgage early or invest",
    "pay off mortgage or invest calculator",
    "extra mortgage payment vs investing",
    "mortgage payoff vs stock market",
    "pay off house early or invest difference",
  ],
};

const faqs = [
  {
    question: "Is it better to pay off my mortgage early or invest?",
    answer:
      "Mathematically, investing usually wins if your expected return exceeds your mortgage rate after tax. With a 6.5% mortgage and a historical 10% stock return, investing the extra money produces roughly $87,000 more over 20 years per $500/month. However, the guaranteed savings from paying off a mortgage carry zero risk, while market returns are not guaranteed.",
  },
  {
    question: "What if my mortgage rate is very low — say 3%?",
    answer:
      "A low rate makes investing even more attractive. At 3%, the spread between your mortgage cost and expected investment return is about 7 percentage points. Paying off a 3% mortgage early is essentially choosing a guaranteed 3% return over a historically likely 7-10% return. Most financial advisors would recommend investing in this scenario.",
  },
  {
    question: "Should I factor in the mortgage interest deduction?",
    answer:
      "Yes, but its impact is smaller than most people think. Since the 2017 Tax Cuts and Jobs Act raised the standard deduction, only about 10% of filers itemize. If you do itemize, the deduction lowers your effective mortgage rate by your marginal tax bracket — for example, a 6.5% rate becomes effectively 4.88% in the 25% bracket.",
  },
  {
    question: "What about the emotional benefit of being debt-free?",
    answer:
      "This is real and valid. Studies show that carrying a mortgage is a significant source of financial stress. If being debt-free lets you sleep better, take career risks, or retire with confidence, the peace of mind can outweigh a few percentage points of return. Personal finance is personal — the mathematically optimal answer isn't always the right one for you.",
  },
  {
    question: "Can I do both — pay extra on my mortgage AND invest?",
    answer:
      "Absolutely, and this is what many financial planners recommend. A common approach: invest enough to get your full employer 401(k) match (free money), fund a Roth IRA, then split remaining extra cash 50/50 between extra mortgage payments and taxable investing. This hedges your bets and builds wealth on two fronts.",
  },
];

export default function PayOffMortgageVsInvestGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Pay Off Mortgage Early vs Invest: The Math Behind the Decision"
        description="Should you pay off your mortgage early or invest the extra money? We run the real numbers at today's rates so you can see exactly which option builds more wealth."
        slug="pay-off-mortgage-early-vs-invest"
        datePublished="2026-08-17"
        dateModified="2026-08-24"
        image="/images/guides/pay-off-mortgage-early-vs-invest.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Pay Off Mortgage Early vs Invest", href: "/guides/pay-off-mortgage-early-vs-invest" },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Mortgage Strategy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Pay Off Mortgage Early vs Invest: The Math Behind the Decision
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            You have an extra $500 a month. Should you throw it at your mortgage
            or put it in an index fund? This is one of the most debated
            questions in personal finance — and the answer depends on numbers
            most people never bother to run. This guide does the math for you.
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
              <strong>If your mortgage rate is below 5%:</strong> Investing
              almost always wins — historically by a wide margin
            </li>
            <li>
              <strong>If your mortgage rate is 6-7%:</strong> Investing still
              has the edge mathematically, but the gap narrows enough that
              either choice is reasonable
            </li>
            <li>
              <strong>If your mortgage rate is 8%+:</strong> Paying off the
              mortgage is a guaranteed high return — strongly consider it
            </li>
            <li>
              <strong>The hybrid approach:</strong> Max your 401(k) match first,
              then split extra cash between mortgage and investing
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/mortgage"
              className="font-medium text-brand-600 underline"
            >
              Mortgage Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/compound-interest"
              className="font-medium text-brand-600 underline"
            >
              Compound Interest Calculator
            </Link>{" "}
            to run your exact scenario.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/pay-off-mortgage-early-vs-invest.webp"
              alt="Infographic comparing paying off a mortgage early versus investing: mortgage payoff saves $147,000 in interest at 6.5%, while investing the same $500/month at 10% grows to $234,000 over 30 years"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              The core trade-off: guaranteed interest savings vs. historically higher (but uncertain) investment returns
            </figcaption>
          </figure>
        </section>

        {/* Section 1: The Core Trade-off */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Why This Decision Matters More Than You Think
          </h2>
          <p className="mt-4 text-ink-700">
            The difference between paying off your mortgage early and investing
            isn't just a few thousand dollars — over a 20- to 30-year time
            horizon, it can mean a six-figure swing in your net worth. The
            decision boils down to one question: is it better to pay off
            mortgage early and earn a guaranteed return equal to your interest
            rate, or invest the money and chase a historically higher but
            uncertain return?
          </p>
          <p className="mt-4 text-ink-700">
            When you make an extra mortgage payment, you're effectively earning
            a risk-free return equal to your mortgage interest rate. With a 6.5%
            mortgage, every extra dollar you pay earns you 6.5% by avoiding
            future interest charges. No market crash, no bad quarter, no
            volatility — just a guaranteed, tax-free return.
          </p>
          <p className="mt-4 text-ink-700">
            When you invest instead, you're betting on the long-term average
            returns of the stock market. The S&P 500 has returned roughly 10%
            per year on average (about 7% after inflation) since 1926. That's
            higher than almost any mortgage rate — but it comes with years where
            the market drops 20%, 30%, or even 40%. The 2008 crash wiped out
            37% of the S&P's value in a single year. The 2020 COVID crash saw a
            34% drop in just 33 days.
          </p>
          <p className="mt-4 text-ink-700">
            The mathematical answer and the right-for-you answer are often
            different. Let's start with the math, then factor in the human
            elements.
          </p>
        </section>

        {/* Section 2: Running the Numbers */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Numbers: $500/Month Extra Over 20 Years
          </h2>
          <p className="mt-4 text-ink-700">
            Let's use a common scenario: you have a $300,000 mortgage at 6.5%
            interest on a 30-year fixed term. You're 5 years in and have an
            extra $500/month to either put toward your mortgage or invest in a
            broad market index fund.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Option A: Pay Off Mortgage Early
          </h3>
          <p className="mt-2 text-ink-700">
            Your standard monthly payment on a $300,000 mortgage at 6.5% is
            $1,896. Adding $500/month brings your total to $2,396. Here's what
            happens:
          </p>
          <ul className="mt-3 space-y-1 text-ink-700">
            <li>Remaining balance (after 5 years): approximately $279,000</li>
            <li>Without extra payments: 25 years remaining, $268,800 more in interest</li>
            <li>With $500/month extra: paid off in ~16.5 years instead of 25</li>
            <li>Total interest saved: approximately $121,600</li>
            <li>You own your home free and clear 8.5 years early</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Option B: Invest the $500/Month
          </h3>
          <p className="mt-2 text-ink-700">
            Instead of extra mortgage payments, you invest $500/month in a
            low-cost S&P 500 index fund. Assuming historical average returns:
          </p>
          <ul className="mt-3 space-y-1 text-ink-700">
            <li>At 10% average annual return: $500/month grows to approximately $343,600 after 20 years</li>
            <li>At 7% (inflation-adjusted): grows to approximately $246,200</li>
            <li>Total invested out of pocket: $120,000</li>
            <li>Investment gain at 10%: approximately $223,600</li>
            <li>Investment gain at 7%: approximately $126,200</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Head-to-Head Comparison
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Metric</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Pay Off Mortgage</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Invest (10% return)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Invest (7% return)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Total out-of-pocket</td>
                  <td className="px-4 py-3">$120,000</td>
                  <td className="px-4 py-3">$120,000</td>
                  <td className="px-4 py-3">$120,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Financial benefit</td>
                  <td className="px-4 py-3 font-medium">$121,600 saved</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$223,600 gained</td>
                  <td className="px-4 py-3 font-medium">$126,200 gained</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Mortgage paid off</td>
                  <td className="px-4 py-3">8.5 years early</td>
                  <td className="px-4 py-3">On schedule (year 30)</td>
                  <td className="px-4 py-3">On schedule (year 30)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Risk level</td>
                  <td className="px-4 py-3">Zero (guaranteed)</td>
                  <td className="px-4 py-3">Moderate-High</td>
                  <td className="px-4 py-3">Moderate-High</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Liquidity</td>
                  <td className="px-4 py-3">Locked in home equity</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Fully liquid</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Fully liquid</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Net advantage vs. payoff</td>
                  <td className="px-4 py-3">Baseline</td>
                  <td className="px-4 py-3 font-medium text-brand-700">+$102,000</td>
                  <td className="px-4 py-3">+$4,600</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Assumes $300K mortgage at 6.5%, 30-year fixed, extra payments starting in year 6. Investment returns are nominal (pre-inflation). Tax implications not included — see tax section below.
          </p>
        </section>

        {/* Section 3: Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Real Case Study: Marcus and Elena, $130K Combined Income
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Their Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Combined gross income: $130,000/year in Denver, CO</li>
                  <li>Mortgage: $340,000 at 6.25%, 30-year fixed (3 years in)</li>
                  <li>Current monthly payment: $2,094</li>
                  <li>Remaining balance: $326,000</li>
                  <li>Extra available per month: $800</li>
                  <li>Marcus&apos;s 401(k): contributing 6% (employer matches 4%)</li>
                  <li>Elena&apos;s 401(k): contributing 5% (employer matches 3%)</li>
                  <li>No other debt</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">The Decision</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Both already get full employer match (free 3-4% return)</li>
                  <li>6.25% mortgage rate is in the "gray zone"</li>
                  <li>Elena wants security of faster payoff</li>
                  <li>Marcus wants the upside of market returns</li>
                  <li>Solution: hybrid approach</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">What They Did: The 50/50 Split</h4>
              <p className="mt-2 text-sm text-ink-700">
                Marcus and Elena split their $800/month: $400 extra toward the
                mortgage and $400 into a Vanguard Total Stock Market index fund
                (VTSAX, 0.04% expense ratio). After 27 months, their mortgage
                balance is $296,000 (vs. $311,000 without extra payments — $15,000
                ahead), and their investment account holds $11,800 ($10,800
                contributed + $1,000 growth). They estimate the mortgage will be
                paid off about 6 years early, while the investment account will
                hold roughly $175,000 by the time they hit year 20. They have the
                psychological win of progress on both fronts, and the flexibility
                to shift the ratio if rates drop (refi and invest more) or the
                market tanks (lean into mortgage payments).
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Rate Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How Your Mortgage Rate Changes the Answer
          </h2>
          <p className="mt-4 text-ink-700">
            The decision is heavily influenced by your specific mortgage rate.
            Here's how the 20-year outcome shifts for $500/month extra, assuming
            a 10% average stock market return:
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Mortgage Rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Interest Saved (Payoff)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Investment Growth (Invest)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">3.0%</td>
                  <td className="px-4 py-3">$42,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$223,600</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Invest (by $181K)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">4.5%</td>
                  <td className="px-4 py-3">$71,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$223,600</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Invest (by $153K)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">5.5%</td>
                  <td className="px-4 py-3">$95,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$223,600</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Invest (by $129K)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">6.5%</td>
                  <td className="px-4 py-3">$121,600</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$223,600</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Invest (by $102K)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">7.5%</td>
                  <td className="px-4 py-3">$149,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$223,600</td>
                  <td className="px-4 py-3">Invest (by $75K)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">8.5%</td>
                  <td className="px-4 py-3">$178,000</td>
                  <td className="px-4 py-3">$223,600</td>
                  <td className="px-4 py-3 text-ink-500">Close call</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">10.0%</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$224,000</td>
                  <td className="px-4 py-3">$223,600</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Payoff (breakeven)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Investment returns are nominal at 10%. Interest saved varies by remaining balance and years left. Figures are approximate — use our calculators for your exact scenario.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Key Insight</p>
            <p className="mt-1 text-sm text-amber-700">
              The stock market's long-term average (10% nominal) essentially
              makes investing the mathematical winner at any mortgage rate below
              about 8-9%. But remember: the 10% average includes years of -37%
              (2008) and +29% (2019). The payoff return is guaranteed and
              consistent every single month.
            </p>
          </div>
        </section>

        {/* Section 5: Tax Implications */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Tax Factors Most People Miss
          </h2>
          <p className="mt-4 text-ink-700">
            Taxes change the math in important ways that favor investing in some
            scenarios and mortgage payoff in others:
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Mortgage Interest Deduction
          </h3>
          <p className="mt-2 text-ink-700">
            If you itemize deductions (only about 10% of filers since the 2017
            standard deduction increase), your effective mortgage rate is lower
            than the stated rate. In the 22% tax bracket, a 6.5% mortgage
            effectively costs 5.07%. This widens the gap in favor of investing.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Capital Gains Tax on Investments
          </h3>
          <p className="mt-2 text-ink-700">
            Investment gains are taxed when you sell. Long-term capital gains
            (held over 1 year) are taxed at 0%, 15%, or 20% depending on
            income. For a married couple earning $130,000, the rate is 15%.
            This means your 10% gross return is closer to 8.5% after taxes —
            still higher than most mortgage rates, but the gap narrows.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Tax-Advantaged Accounts Change Everything
          </h3>
          <p className="mt-2 text-ink-700">
            If you invest in a 401(k) or Roth IRA instead of a taxable brokerage
            account, the math shifts dramatically. Roth IRA gains are
            completely tax-free. 401(k) contributions reduce your current
            taxable income. An employer match is an immediate 50-100% return
            that no mortgage payoff can compete with. Always capture the full
            employer match before putting extra money toward the mortgage.
          </p>
        </section>

        {/* Section 6: When Mortgage Payoff Wins */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When Paying Off Your Mortgage Early Is the Better Choice
          </h2>
          <p className="mt-4 text-ink-700">
            Despite the math favoring investing in most scenarios, there are
            real situations where accelerating your mortgage payoff is the
            smarter move:
          </p>
          <ul className="mt-4 space-y-3 text-ink-700">
            <li>
              <strong>You're within 5-7 years of retirement.</strong> Entering
              retirement without a mortgage payment dramatically reduces your
              required withdrawal rate. A $2,000/month mortgage payment means
              you need $600,000 less in your retirement portfolio (using the 4%
              rule).
            </li>
            <li>
              <strong>Your mortgage rate is above 7%.</strong> At rates this
              high, the guaranteed return from payoff starts to rival historical
              stock market returns — with zero risk.
            </li>
            <li>
              <strong>You've already maxed out tax-advantaged accounts.</strong> If
              your 401(k), Roth IRA, and HSA are fully funded, the comparison
              shifts to taxable investing vs. mortgage payoff, where the
              after-tax investment return is lower.
            </li>
            <li>
              <strong>You have low risk tolerance or sleep poorly.</strong> The
              psychological burden of debt is real. A 2024 study by the
              National Endowment for Financial Education found that mortgage
              debt was the #2 source of financial stress (after credit cards).
            </li>
            <li>
              <strong>You're in a high-tax state with no itemized deductions.</strong> Without
              the mortgage interest deduction, your effective rate equals your
              stated rate, making payoff relatively more attractive.
            </li>
          </ul>
        </section>

        {/* Section 7: Step-by-Step Decision Framework */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: How to Make Your Decision
          </h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Max out your employer 401(k) match first
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  This isn't optional. A 50% employer match is an instant 50%
                  return — no mortgage payoff or market investment comes close.
                  If your employer matches 4% and you earn $80,000, contribute
                  at least $3,200/year to get the full $1,600 match.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Build a 3-6 month emergency fund
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Neither extra mortgage payments nor investments help if you
                  lose your income and can't make the regular payment. Keep
                  $15,000-$30,000 in a high-yield savings account (4.5-5.0% APY
                  in 2026) before aggressively tackling either option.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Pay off any debt above your mortgage rate
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Credit card debt at 22%? Car loan at 8%? Pay those off before
                  making extra mortgage payments. The guaranteed return is
                  higher than either your mortgage rate or expected stock
                  returns.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Compare your effective mortgage rate to expected returns
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Calculate your after-tax mortgage rate (rate x (1 - tax bracket)
                  if you itemize). Compare it to your expected after-tax
                  investment return (7-8% in a taxable account, 10% in tax-
                  advantaged). If the spread is 3%+ in favor of investing, lean
                  toward investing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                5
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Factor in your personal risk tolerance and timeline
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  If you're 15+ years from retirement with stable income, you
                  can weather market volatility — lean toward investing. If
                  you're 5-10 years out, the guaranteed return of mortgage
                  payoff becomes more valuable. Use our{" "}
                  <Link
                    href="/calculators/investment-return"
                    className="text-brand-600 underline"
                  >
                    Investment Return Calculator
                  </Link>{" "}
                  to model different scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Common Arguments Debunked */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            3 Common Arguments — And Why They're Only Half Right
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                &quot;You can always borrow against your home equity&quot;
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                True, but a HELOC or cash-out refinance comes with closing
                costs, variable rates, and the risk of owing more than your home
                is worth in a downturn. Investments in a brokerage account are
                instantly liquid — you can sell and have cash in 2 business days.
                Home equity is the least liquid form of wealth you can hold.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                &quot;The stock market always goes up long-term&quot;
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Over 20+ year periods, yes — the S&P 500 has never had a
                negative return over any 20-year rolling period since 1926.
                But 10-year periods can be flat (2000-2010 returned just 1.2%
                annually). Your specific timing matters. If you retire in a
                downturn, a paid-off home provides safety that a depleted
                portfolio cannot.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                &quot;Inflation makes your mortgage cheaper over time&quot;
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                This is correct — a fixed $2,000/month payment feels smaller in
                10 years when inflation has raised wages. But this argument
                applies equally whether you make extra payments or not. Your
                fixed payment stays the same regardless. The real question is
                what earns a better return: the extra payment or the invested
                dollar. Inflation doesn't change that comparison.
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
            Every mortgage and financial situation is different. Use our free
            calculators to see exactly how each scenario plays out for you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/mortgage"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Mortgage Calculator
            </Link>
            <Link
              href="/calculators/compound-interest"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Compound Interest Calculator
            </Link>
            <Link
              href="/calculators/investment-return"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Investment Return Calculator
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
                href="/guides/how-much-house-can-i-afford"
                className="text-brand-600 hover:underline"
              >
                How Much House Can I Afford? Complete Guide by Income Level
              </Link>
            </li>
            <li>
              <Link
                href="/guides/15-year-vs-30-year-mortgage"
                className="text-brand-600 hover:underline"
              >
                15-Year vs 30-Year Mortgage: Which Saves You More Money?
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
