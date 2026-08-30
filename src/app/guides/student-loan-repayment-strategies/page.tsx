import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "Student Loan Repayment: 7 Strategies to Pay Off Debt Faster in 2026",
  description:
    "Learn 7 proven student loan repayment strategies with real numbers on a $40,000 balance. Compare standard repayment, IDR, refinancing, PSLF, and accelerated payoff methods.",
  keywords: [
    "student loan repayment strategies",
    "how to pay off student loans faster",
    "student loan payoff strategies",
    "income driven repayment",
    "student loan refinancing",
    "PSLF student loans",
  ],
};

const faqs = [
  {
    question: "What is the fastest way to pay off student loans?",
    answer:
      "The fastest method is making extra payments toward principal using the avalanche approach (targeting highest-rate loans first) combined with side income. On a $40,000 balance at 5.5%, increasing payments from $434/month to $800/month cuts the payoff timeline from 10 years to 4 years and 8 months, saving $5,687 in interest. Adding $500/month in side income on top of standard payments clears the debt in 3 years and 9 months.",
  },
  {
    question: "Should I refinance my student loans in 2026?",
    answer:
      "Refinancing makes sense if you can lower your interest rate by at least 1% and you do not need federal protections like income-driven repayment or Public Service Loan Forgiveness. In August 2026, private refinancing rates range from 4.5-7.5% depending on credit score and term. On a $40,000 balance, refinancing from 5.5% to 4.0% over 7 years saves $3,940 in interest. However, refinancing federal loans into a private loan permanently forfeits IDR eligibility, PSLF, and federal forbearance options.",
  },
  {
    question: "Is income-driven repayment a good idea?",
    answer:
      "IDR plans (SAVE, PAYE, IBR) are ideal if your income is low relative to your debt or if you are pursuing PSLF. Payments are capped at 5-10% of discretionary income, and remaining balances are forgiven after 20-25 years. The downside: you pay more total interest over the longer term. On a $40,000 balance, IDR at $217/month costs $22,080 in interest over 25 years versus $12,040 on the standard plan. Use IDR as a bridge during low-income periods, not as a permanent strategy unless pursuing forgiveness.",
  },
  {
    question: "How does the avalanche method work for student loans?",
    answer:
      "List all loans by interest rate from highest to lowest. Make minimum payments on everything, then send all extra money to the highest-rate loan. When that loan is paid off, roll its payment to the next highest-rate loan. On a typical $40,000 portfolio with loans at 6.8%, 5.5%, and 4.5%, avalanche saves $340 more than snowball (smallest balance first) over the payoff period. The savings increase with larger rate spreads and longer timelines.",
  },
  {
    question: "Does employer student loan repayment assistance really help?",
    answer:
      "Yes. Since the Consolidated Appropriations Act of 2020 (extended through 2025 and made permanent in some proposals), employers can contribute up to $5,250 per year toward employee student loans tax-free. On a $40,000 balance, $5,250/year from your employer reduces the payoff timeline from 10 years to approximately 6.5 years, saving $3,280 in interest. About 17% of employers offered this benefit in 2025, up from 8% in 2021. Ask your HR department if this benefit is available.",
  },
];

export default function StudentLoanRepaymentGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Student Loan Repayment: 7 Strategies to Pay Off Debt Faster in 2026"
        description="Learn 7 proven student loan repayment strategies with real numbers on a $40,000 balance. Compare standard repayment, IDR, refinancing, PSLF, and accelerated payoff methods."
        slug="student-loan-repayment-strategies"
        datePublished="2026-08-30"
        image="/images/guides/student-loan-repayment-strategies.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "Student Loan Repayment Strategies",
            href: "/guides/student-loan-repayment-strategies",
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Debt Strategy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Student Loan Repayment: 7 Strategies to Pay Off Debt Faster in 2026
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            The average student loan borrower graduates with $37,850 in debt and
            spends 10 years on the standard repayment plan, paying over $12,000
            in interest. This guide breaks down seven specific strategies with
            real numbers on a $40,000 balance so you can find the approach that
            matches your income, career path, and financial goals.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: August 2026</p>
        </header>

        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Standard plan baseline:</strong> $40,000 at 5.5% costs
              $434/month for 10 years with $12,040 in total interest
            </li>
            <li>
              <strong>Fastest payoff:</strong> Accelerated payments of
              $800/month clear the balance in 4 years 8 months, saving $5,687 in
              interest
            </li>
            <li>
              <strong>Lowest total cost:</strong> Refinancing to 4.0% over 7
              years at $547/month costs $5,936 total interest, saving $6,104
            </li>
            <li>
              <strong>Lowest monthly payment:</strong> Income-driven repayment at
              $217/month (based on $45,000 income) with forgiveness after 20-25
              years
            </li>
            <li>
              <strong>Free money:</strong> Employer repayment assistance provides
              up to $5,250/year tax-free, cutting 3.5 years off the standard plan
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/student-loan"
              className="font-medium text-brand-600 underline"
            >
              Student Loan Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/debt-payoff"
              className="font-medium text-brand-600 underline"
            >
              Debt Payoff Calculator
            </Link>{" "}
            to model your exact loan portfolio.
          </p>
        </section>

        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/student-loan-repayment-strategies.webp"
              alt="Infographic comparing 7 student loan repayment strategies: standard repayment, income-driven, refinancing, employer assistance, avalanche method, side income acceleration, and PSLF with monthly payment and total interest comparisons"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Seven paths to paying off $40,000 in student loans — from 10 years on the standard plan to under 4 years with aggressive payments
            </figcaption>
          </figure>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Student Loan Landscape in 2026
          </h2>
          <p className="mt-4 text-ink-700">
            Total outstanding student loan debt in the U.S. stands at
            approximately $1.77 trillion across 43.5 million borrowers. The
            average monthly payment on the standard 10-year plan is $393, but
            actual payments vary enormously based on loan type, interest rate,
            and repayment plan selection. Federal student loan interest rates for
            2025-2026 range from 5.50% for undergraduate Direct Loans to 7.05%
            for Direct PLUS Loans, while private loan rates vary from 4.0% to
            14.0% depending on creditworthiness and term length.
          </p>
          <p className="mt-4 text-ink-700">
            The critical distinction is between federal and private loans.
            Federal loans offer income-driven repayment, forgiveness programs,
            and forbearance protections that private loans do not. Before
            choosing a repayment strategy, categorize your loans: federal
            Direct Subsidized, federal Direct Unsubsidized, federal PLUS, and
            private. Each type has different rules that affect which strategies
            are available to you. Log into{" "}
            <strong>studentaid.gov</strong> to see your complete federal loan
            portfolio and current servicer assignments.
          </p>
          <p className="mt-4 text-ink-700">
            All seven strategies below use a benchmark portfolio of $40,000 in
            federal Direct Unsubsidized loans at 5.5% interest. Your actual
            numbers will differ — run them through our{" "}
            <Link
              href="/calculators/student-loan"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Student Loan Calculator
            </Link>{" "}
            to get precise monthly payments and payoff timelines for your
            specific balance and rate.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            7 Student Loan Repayment Strategies Compared
          </h2>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Strategy 1: Standard Repayment Plan (Baseline)
          </h3>
          <p className="mt-2 text-ink-700">
            The default federal repayment plan assigns fixed monthly payments
            over 10 years (120 months). On $40,000 at 5.5%, your monthly
            payment is $434. This is the baseline against which every other
            strategy is measured.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Monthly payment:</strong> $434</li>
            <li><strong>Payoff timeline:</strong> 10 years (120 months)</li>
            <li><strong>Total interest:</strong> $12,040</li>
            <li><strong>Total repaid:</strong> $52,040</li>
          </ul>
          <p className="mt-4 text-ink-700">
            The standard plan is straightforward and predictable. You know
            exactly when you will be debt-free, and the payment never changes.
            The downside: $434/month on a starting salary of $45,000 ($3,375/
            month take-home) represents 12.9% of take-home pay. If that ratio
            strains your budget, consider IDR as a temporary bridge while your
            income grows.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Strategy 2: Income-Driven Repayment (IDR)
          </h3>
          <p className="mt-2 text-ink-700">
            IDR plans cap payments at a percentage of your discretionary income.
            The newest plan, SAVE (Saving on a Valuable Education), sets
            undergraduate loan payments at 5% of income above 225% of the
            poverty line. On a $45,000 salary, your estimated monthly payment
            drops to approximately $217 — half the standard plan.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Monthly payment:</strong> ~$217 (based on $45,000 income)</li>
            <li><strong>Payoff timeline:</strong> 20-25 years (with forgiveness of remaining balance)</li>
            <li><strong>Total interest:</strong> ~$22,080 (if no forgiveness)</li>
            <li><strong>Total repaid:</strong> ~$62,080 (before forgiveness)</li>
          </ul>
          <p className="mt-4 text-ink-700">
            IDR is a lifeline when income is low, but it is not free money.
            Payments that fall below the monthly interest accrual ($183/month on
            $40,000 at 5.5%) cause your balance to grow. On $217/month, only $34
            goes toward principal in month one — the rest covers interest. Under
            the SAVE plan, the government covers unpaid interest on subsidized
            portions, but your unsubsidized balance may still grow. Use IDR
            strategically: stay on it while your income is below $60,000, then
            switch to standard or accelerated payments once your salary allows
            larger monthly contributions.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Strategy 3: Refinancing to a Lower Rate
          </h3>
          <p className="mt-2 text-ink-700">
            Private lenders offer refinancing rates from 4.0% to 7.5% in August
            2026, depending on credit score, income, and chosen term. Refinancing
            $40,000 from 5.5% to 4.0% over 7 years reduces the total interest
            by $6,104 compared to the standard plan.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Monthly payment:</strong> $547 (7-year term at 4.0%)</li>
            <li><strong>Payoff timeline:</strong> 7 years (84 months)</li>
            <li><strong>Total interest:</strong> $5,936</li>
            <li><strong>Total repaid:</strong> $45,936</li>
            <li><strong>Savings vs. standard:</strong> $6,104 in interest, 3 years faster</li>
          </ul>
          <p className="mt-4 text-ink-700">
            Refinancing is the best option if you have strong credit (720+), a
            stable income above $55,000, and do not need federal protections.
            The trade-off is permanent: refinancing federal loans into a private
            loan eliminates your eligibility for IDR, PSLF, and federal
            forbearance. Never refinance if you work in public service or
            anticipate income instability. Compare refinancing offers from at
            least three lenders — rate quotes use soft credit pulls that do not
            affect your score.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Strategy 4: Employer Student Loan Repayment Assistance
          </h3>
          <p className="mt-2 text-ink-700">
            Section 127 of the Internal Revenue Code allows employers to
            contribute up to $5,250 per year toward employee student loans
            tax-free. This benefit was made permanent in recent legislation and
            approximately 17% of employers now offer it. At $5,250/year
            ($437.50/month), employer assistance alone covers more than the
            standard monthly payment.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Employer contribution:</strong> $5,250/year ($437.50/month)</li>
            <li><strong>Your additional payment:</strong> $0-$434/month depending on budget</li>
            <li><strong>Payoff timeline:</strong> ~6.5 years (employer pays alone) or ~4.5 years (employer + $300/month from you)</li>
            <li><strong>Total interest saved:</strong> $3,280-$6,800 depending on your contribution</li>
          </ul>
          <p className="mt-4 text-ink-700">
            Employer assistance is the closest thing to free money in student
            loan repayment. The $5,250 is excluded from your gross income,
            meaning you save both on loan interest and income taxes. If your
            current employer does not offer this benefit, factor it into job
            negotiations. A position paying $70,000 with $5,250/year in loan
            assistance is effectively worth $75,250 pre-tax — and the loan
            assistance is worth even more because it is not subject to income or
            payroll taxes.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Strategy 5: Debt Avalanche (Highest Rate First)
          </h3>
          <p className="mt-2 text-ink-700">
            If you have multiple loans at different rates, the avalanche method
            minimizes total interest. Make minimum payments on all loans, then
            direct every extra dollar to the loan with the highest interest rate.
            On a typical three-loan portfolio:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Loan</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Balance</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Min Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Direct PLUS (grad)</td>
                  <td className="px-4 py-3">$12,000</td>
                  <td className="px-4 py-3">6.8%</td>
                  <td className="px-4 py-3">$138</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Direct Unsub (senior year)</td>
                  <td className="px-4 py-3">$15,000</td>
                  <td className="px-4 py-3">5.5%</td>
                  <td className="px-4 py-3">$163</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Direct Sub (freshman-junior)</td>
                  <td className="px-4 py-3">$13,000</td>
                  <td className="px-4 py-3">4.5%</td>
                  <td className="px-4 py-3">$134</td>
                </tr>
                <tr className="bg-brand-50/50 font-medium">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3">$40,000</td>
                  <td className="px-4 py-3">~5.6% wtd avg</td>
                  <td className="px-4 py-3">$435</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-ink-700">
            With $600/month available, pay $435 in minimums and send the extra
            $165 to the 6.8% PLUS loan. It clears in about 5 years instead of
            10. Then roll the $138 minimum plus $165 extra ($303 total) to the
            5.5% loan. Using avalanche with $600/month total, the entire
            portfolio clears in approximately 7 years and 4 months with $9,680
            in total interest — saving $2,360 compared to the standard plan.
            Read our{" "}
            <Link
              href="/guides/debt-avalanche-vs-snowball"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              avalanche vs. snowball comparison
            </Link>{" "}
            for more on choosing between the two methods.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Strategy 6: Side Income Acceleration
          </h3>
          <p className="mt-2 text-ink-700">
            Adding $500/month in side income on top of the $434 standard
            payment ($934 total) transforms a 10-year payoff into a 3-year,
            9-month sprint. On $40,000 at 5.5%, this approach saves $7,560 in
            interest compared to the standard plan.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Monthly payment:</strong> $934 ($434 standard + $500 side income)</li>
            <li><strong>Payoff timeline:</strong> 3 years, 9 months (45 months)</li>
            <li><strong>Total interest:</strong> $4,480</li>
            <li><strong>Total repaid:</strong> $44,480</li>
            <li><strong>Savings vs. standard:</strong> $7,560 in interest, 6+ years faster</li>
          </ul>
          <p className="mt-4 text-ink-700">
            Realistic side income sources for recent graduates: freelance work
            in your field ($30-$75/hour), tutoring undergraduate courses
            ($25-$50/hour, 20 hours/month), part-time remote work ($20-$35/hour),
            or gig economy work ($800-$1,200/month). The key is directing every
            side dollar to loan principal the day it arrives. If it sits in your
            checking account, it gets absorbed by lifestyle inflation. Set up
            automatic extra payments through your loan servicer to ensure
            consistency.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Strategy 7: Public Service Loan Forgiveness (PSLF)
          </h3>
          <p className="mt-2 text-ink-700">
            PSLF forgives the remaining balance on federal Direct Loans after
            120 qualifying monthly payments (10 years) while working full-time
            for a qualifying employer — government agencies, nonprofits, and
            certain public institutions. Combined with IDR, PSLF can eliminate
            tens of thousands of dollars in remaining debt.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Monthly payment:</strong> ~$217 (on SAVE/IDR at $45,000 income)</li>
            <li><strong>Qualifying payments needed:</strong> 120 (10 years)</li>
            <li><strong>Estimated amount forgiven:</strong> $18,000-$25,000 on a $40,000 original balance</li>
            <li><strong>Total out-of-pocket:</strong> ~$26,040 ($217 x 120 months)</li>
          </ul>
          <p className="mt-4 text-ink-700">
            PSLF is the optimal strategy if you plan a long-term career in
            public service. The math is compelling: instead of paying $52,040
            over 10 years on the standard plan, you pay approximately $26,040
            and the remaining balance is forgiven tax-free. The catch is
            qualifying: you must make exactly 120 payments under an IDR plan
            while employed full-time by an eligible employer. Track your
            qualifying payments annually by submitting the Employment
            Certification Form to MOHELA. Failing to certify leaves you
            uncertain about your count until you apply for forgiveness —
            a mistake that has delayed or denied forgiveness for thousands of
            borrowers.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            All 7 Strategies Side by Side
          </h2>
          <p className="mt-4 text-ink-700">
            Use this comparison to match a strategy to your income level, career
            path, and monthly budget. All figures assume $40,000 in federal
            Direct Loans at 5.5%.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Strategy</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Monthly Payment</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Timeline</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Total Interest</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Standard (baseline)</td>
                  <td className="px-4 py-3">$434</td>
                  <td className="px-4 py-3">10 years</td>
                  <td className="px-4 py-3">$12,040</td>
                  <td className="px-4 py-3 text-sm text-ink-600">Default; predictable</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Income-driven (SAVE)</td>
                  <td className="px-4 py-3">$217</td>
                  <td className="px-4 py-3">20-25 years</td>
                  <td className="px-4 py-3">$22,080*</td>
                  <td className="px-4 py-3 text-sm text-ink-600">Low income; PSLF track</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-brand-700">Refinancing (4.0%, 7yr)</td>
                  <td className="px-4 py-3">$547</td>
                  <td className="px-4 py-3 font-medium text-brand-700">7 years</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$5,936</td>
                  <td className="px-4 py-3 text-sm text-ink-600">Good credit; stable income</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Employer assistance</td>
                  <td className="px-4 py-3">$437 (employer)</td>
                  <td className="px-4 py-3">6.5 years</td>
                  <td className="px-4 py-3">$8,760</td>
                  <td className="px-4 py-3 text-sm text-ink-600">Employer offers benefit</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Avalanche ($600/mo)</td>
                  <td className="px-4 py-3">$600</td>
                  <td className="px-4 py-3">7 yr 4 mo</td>
                  <td className="px-4 py-3">$9,680</td>
                  <td className="px-4 py-3 text-sm text-ink-600">Multiple rate loans</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Side income blast</td>
                  <td className="px-4 py-3">$934</td>
                  <td className="px-4 py-3">3 yr 9 mo</td>
                  <td className="px-4 py-3">$4,480</td>
                  <td className="px-4 py-3 text-sm text-ink-600">Fastest debt-free</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">PSLF (IDR + forgiveness)</td>
                  <td className="px-4 py-3">$217</td>
                  <td className="px-4 py-3">10 years</td>
                  <td className="px-4 py-3">$0 forgiven*</td>
                  <td className="px-4 py-3 text-sm text-ink-600">Public service career</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *IDR interest shown before forgiveness. PSLF forgives remaining
            balance tax-free after 120 qualifying payments. All calculations use
            $40,000 at 5.5%. Use our calculators for your exact numbers.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Marcus, 26, $45K Salary in Atlanta
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">His Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Degree: B.S. in Computer Science, state university</li>
                  <li>Gross salary: $45,000/year ($3,375/month take-home)</li>
                  <li>Total student debt: $38,500 across 4 federal loans</li>
                  <li>Weighted average rate: 5.6%</li>
                  <li>Standard monthly payment: $418</li>
                  <li>Rent: $1,100/month (shared apartment)</li>
                  <li>Other monthly expenses: $1,450</li>
                  <li>Available for extra loan payments: $400/month</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">His 4 Loans</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Direct Unsub (senior): $7,500 at 5.5% ($81/mo min)</li>
                  <li>Direct Unsub (junior): $7,000 at 5.3% ($75/mo min)</li>
                  <li>Direct Sub (soph): $5,500 at 4.5% ($57/mo min)</li>
                  <li>Direct Sub (fresh): $18,500 at 6.0% ($205/mo min)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Marcus&apos;s Analysis</h4>
              <p className="mt-2 text-sm text-ink-700">
                Marcus ran all seven strategies through the Student Loan
                Calculator. Standard repayment costs $11,660 in interest over 10
                years. IDR reduces his payment to $197/month but extends the
                timeline to 20+ years with $19,720 in projected interest.
                Refinancing to 4.0% was quoted by two lenders, but his credit
                score of 685 only qualified him for 5.0% — saving only $1,440
                versus standard, not enough to justify losing federal protections.
              </p>
              <p className="mt-3 text-sm text-ink-700">
                His employer, a mid-size tech company, confirmed they offer
                $5,250/year in student loan assistance after 6 months of
                employment. Marcus negotiated to have it applied to his
                highest-rate loan ($18,500 at 6.0%). Combined with his own $400/
                month in extra payments directed via avalanche, he projects
                clearing all four loans in 5 years and 2 months with $6,930 in
                total interest — saving $4,730 and nearly 5 years versus standard
                repayment.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">Marcus&apos;s Chosen Strategy: Employer Assistance + Avalanche</h4>
              <p className="mt-2 text-sm text-ink-700">
                Marcus combined Strategy 4 and Strategy 5. His employer sends
                $437.50/month directly to his 6.0% loan. He adds $400/month from
                his own budget, also targeting the 6.0% loan. The $18,500 loan
                clears in approximately 18 months. He then redirects the
                combined $837.50/month plus freed minimums to the 5.5% loan,
                followed by 5.3% and 4.5%.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-ink-200 bg-ink-50">
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">Milestone</th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">Month</th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">Remaining Balance</th>
                      <th className="px-3 py-2 text-left font-semibold text-ink-800">Interest Saved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    <tr>
                      <td className="px-3 py-2">Start</td>
                      <td className="px-3 py-2">0</td>
                      <td className="px-3 py-2">$38,500</td>
                      <td className="px-3 py-2">-</td>
                    </tr>
                    <tr className="bg-ink-50/50">
                      <td className="px-3 py-2">6.0% loan paid off</td>
                      <td className="px-3 py-2">18</td>
                      <td className="px-3 py-2">$16,840</td>
                      <td className="px-3 py-2">$1,420</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">5.5% loan paid off</td>
                      <td className="px-3 py-2">28</td>
                      <td className="px-3 py-2">$10,130</td>
                      <td className="px-3 py-2">$2,890</td>
                    </tr>
                    <tr className="bg-ink-50/50">
                      <td className="px-3 py-2">5.3% loan paid off</td>
                      <td className="px-3 py-2">38</td>
                      <td className="px-3 py-2">$4,280</td>
                      <td className="px-3 py-2">$3,810</td>
                    </tr>
                    <tr className="bg-brand-50/50">
                      <td className="px-3 py-2 font-medium text-brand-700">All loans paid off</td>
                      <td className="px-3 py-2 font-medium text-brand-700">62</td>
                      <td className="px-3 py-2 font-medium text-brand-700">$0</td>
                      <td className="px-3 py-2 font-medium text-brand-700">$4,730</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-ink-700">
                Marcus will be completely debt-free by October 2031 — 62 months
                from his September 2026 start date. Total cost: $45,430 ($38,500
                principal + $6,930 interest). Starting in month 63, he redirects
                the $818/month ($418 standard + $400 extra) toward building a
                $15,000 emergency fund and maxing out his Roth IRA. Tracking his{" "}
                <Link
                  href="/calculators/compound-interest"
                  className="text-brand-600 hover:text-brand-800 font-medium"
                >
                  compound interest growth
                </Link>
                , that $818/month invested at 7% for 30 years grows to
                approximately $993,000 by age 56.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Your Step-by-Step Student Loan Payoff Plan
          </h2>
          <p className="mt-4 text-ink-700">
            Follow these six steps in order, regardless of which strategy you
            choose. The first two steps take less than an hour and provide the
            data you need to make an informed decision.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">1</div>
              <div>
                <h4 className="font-semibold text-ink-800">Inventory every loan with balance, rate, and servicer</h4>
                <p className="mt-1 text-sm text-ink-700">
                  Log into studentaid.gov to see all federal loans. Check your
                  credit report for any private loans. Record the exact balance,
                  interest rate, monthly minimum, and current servicer for each.
                  Marcus found all four loans in 15 minutes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">2</div>
              <div>
                <h4 className="font-semibold text-ink-800">Check if your employer offers repayment assistance</h4>
                <p className="mt-1 text-sm text-ink-700">
                  Email HR or check your benefits portal. If the benefit exists
                  but you have not enrolled, sign up immediately — every month
                  of unclaimed employer payments is $437.50 left on the table.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">3</div>
              <div>
                <h4 className="font-semibold text-ink-800">Run your numbers through the calculator</h4>
                <p className="mt-1 text-sm text-ink-700">
                  Enter your exact loan details into our{" "}
                  <Link href="/calculators/student-loan" className="text-brand-600 hover:text-brand-800 font-medium">
                    Student Loan Calculator
                  </Link>{" "}
                  to see standard payment timelines, then test different extra
                  payment amounts. The difference between $50 and $200 extra per
                  month can be 2-4 years off your payoff date.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">4</div>
              <div>
                <h4 className="font-semibold text-ink-800">Choose your strategy from the comparison table</h4>
                <p className="mt-1 text-sm text-ink-700">
                  Match your situation: low income + public sector = PSLF. Good
                  credit + private sector = refinancing. Employer benefit
                  available = employer assistance + avalanche. Want speed above
                  all = side income acceleration. Budget is tight = IDR as a
                  temporary bridge.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">5</div>
              <div>
                <h4 className="font-semibold text-ink-800">Automate payments and specify &quot;apply to principal&quot;</h4>
                <p className="mt-1 text-sm text-ink-700">
                  Set up autopay for a 0.25% interest rate discount on federal
                  loans. When making extra payments, explicitly instruct your
                  servicer to apply them to principal — not to advance your due
                  date. Without this instruction, servicers may apply extra
                  payments to future interest instead of reducing your balance.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">6</div>
              <div>
                <h4 className="font-semibold text-ink-800">Redirect freed payments to investing once debt-free</h4>
                <p className="mt-1 text-sm text-ink-700">
                  When your final loan hits $0, immediately redirect the full
                  former payment to an emergency fund (3-6 months of expenses),
                  then to retirement accounts. Marcus&apos;s $818/month, invested
                  at 7% for 30 years, grows to $993,000. The sooner you are
                  debt-free, the longer your money compounds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Calculate Your Student Loan Payoff Plan
          </h2>
          <p className="mt-2 text-ink-600">
            Enter your exact loan balances, interest rates, and monthly budget
            to see how each strategy affects your payoff timeline and total
            interest cost.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/student-loan"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Student Loan Calculator
            </Link>
            <Link
              href="/calculators/debt-payoff"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Debt Payoff Calculator
            </Link>
          </div>
        </section>

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
        <RelatedGuides currentSlug="student-loan-repayment-strategies" relatedSlugs={["debt-avalanche-vs-snowball", "how-to-pay-off-credit-card-fast", "compound-interest-real-examples"]} />
      </article>
    </>
  );
}
