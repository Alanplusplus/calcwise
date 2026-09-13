import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "How Much House Can I Afford? Complete Guide by Income Level",
  description:
    "Find out exactly how much home you can afford based on your salary. Includes income-based affordability tables, the 28/36 rule explained, a real case study, and common mistakes to avoid.",
  keywords: [
    "how much house can I afford",
    "home affordability by income",
    "28/36 rule",
    "mortgage affordability calculator",
    "house affordability guide",
  ],
};

const faqs = [
  {
    question: "How much house can I afford on a $60,000 salary?",
    answer:
      "With a $60K salary, lenders typically approve a mortgage between $168,000 and $180,000 using the 28/36 rule. Your actual amount depends on debts, down payment, credit score, and local interest rates.",
  },
  {
    question: "What is the 28/36 rule for mortgages?",
    answer:
      "The 28/36 rule states that you should spend no more than 28% of your gross monthly income on housing costs (mortgage, taxes, insurance) and no more than 36% on total debt payments including housing.",
  },
  {
    question: "How much should I put down on a house?",
    answer:
      "While 20% is the traditional recommendation (to avoid PMI), many buyers put 3-10% down. FHA loans allow as little as 3.5%. A larger down payment means lower monthly payments and less interest paid over time.",
  },
  {
    question: "Does my credit score affect how much house I can afford?",
    answer:
      "Yes. A higher credit score gets you a lower interest rate, which directly increases your buying power. A score of 760+ typically gets the best rates. The difference between a 620 and 760 score can be 1-1.5% in rate, which translates to $50,000-100,000 in purchasing power.",
  },
  {
    question: "Should I use my maximum approved mortgage amount?",
    answer:
      "Financial advisors generally recommend staying well below your maximum approval. Lender maximums don't account for your lifestyle, savings goals, or unexpected expenses. A comfortable range is 2.5-3x your annual income.",
  },
];

export default function HowMuchHouseGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="How Much House Can I Afford? Complete Guide by Income Level"
        description="Find out exactly how much home you can afford based on your salary. Includes income-based affordability tables, the 28/36 rule explained, a real case study, and common mistakes to avoid."
        slug="how-much-house-can-i-afford"
        datePublished="2026-08-10"
        dateModified="2026-08-24"
        image="/images/guides/house-affordability-infographic.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "How Much House Can I Afford", href: "/guides/how-much-house-can-i-afford" },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Home Buying
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            How Much House Can I Afford? Complete Guide by Income Level
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            The biggest financial decision most people will ever make, and the
            one where gut feelings fail the most. This guide replaces guesswork
            with real formulas, income-based tables, and a step-by-step framework
            to find your true comfortable range.
          </p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Conservative estimate:</strong> 2.5 - 3x your annual
              household income
            </li>
            <li>
              <strong>Lender maximum:</strong> Often up to 4-5x income (but not
              recommended)
            </li>
            <li>
              <strong>The 28/36 rule:</strong> Keep housing costs under 28% of
              gross income, total debt under 36%
            </li>
            <li>
              <strong>Bottom line:</strong> Your comfortable amount is usually
              20-30% below what a lender will approve
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
            to run your exact numbers.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/house-affordability-infographic.webp"
              alt="Infographic showing the 28/36 rule breakdown: how gross income translates to maximum monthly housing payment and total debt payment, with visual examples at different income levels"
              width={1200}
              height={675}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              The 28/36 Rule: How your income determines your maximum housing budget
            </figcaption>
          </figure>
        </section>

        {/* Section 1: The Rules Lenders Use */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Rules Lenders Actually Use
          </h2>
          <p className="mt-4 text-ink-700">
            Banks don't just look at your income. They use specific debt-to-income
            (DTI) ratios to determine your maximum borrowing capacity. Understanding
            these ratios is the first step to knowing your true budget.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Front-End Ratio (28% Rule)
          </h3>
          <p className="mt-2 text-ink-700">
            Your total monthly housing expense (mortgage principal + interest +
            property taxes + homeowner's insurance + HOA fees) should not exceed
            28% of your gross monthly income.
          </p>
          <div className="mt-4 rounded-lg bg-ink-50 p-4 font-mono text-sm text-ink-800">
            Max monthly housing = Gross monthly income x 0.28
            <br />
            Example: $6,000/month income → $1,680 max housing payment
          </div>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Back-End Ratio (36% Rule)
          </h3>
          <p className="mt-2 text-ink-700">
            Your total monthly debt payments (housing + car loans + student loans +
            credit card minimums + other obligations) should not exceed 36% of gross
            monthly income.
          </p>
          <div className="mt-4 rounded-lg bg-ink-50 p-4 font-mono text-sm text-ink-800">
            Max total debt = Gross monthly income x 0.36
            <br />
            Example: $6,000/month income → $2,160 max total debt
            <br />
            If you have $400/month in car + student loans → Max housing = $1,760
          </div>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Important Caveat</p>
            <p className="mt-1 text-sm text-amber-700">
              Some lenders will approve DTI ratios as high as 43% (or even 50% for
              FHA). Just because you're approved doesn't mean it's comfortable.
              These higher ratios leave almost no room for savings, emergencies, or
              lifestyle expenses.
            </p>
          </div>
        </section>

        {/* Section 2: Income Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Home Affordability by Income Level
          </h2>
          <p className="mt-4 text-ink-700">
            The table below shows approximate home prices you can afford at each
            income level. Assumptions: 20% down payment, 6.5% interest rate,
            30-year fixed mortgage, property tax 1.2%, insurance 0.5%.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Annual Income
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Monthly Housing Budget (28%)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Comfortable Home Price
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Max Lender Approval
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">$50,000</td>
                  <td className="px-4 py-3">$1,167</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$175,000</td>
                  <td className="px-4 py-3 text-ink-500">$225,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">$75,000</td>
                  <td className="px-4 py-3">$1,750</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$270,000</td>
                  <td className="px-4 py-3 text-ink-500">$345,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">$100,000</td>
                  <td className="px-4 py-3">$2,333</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$360,000</td>
                  <td className="px-4 py-3 text-ink-500">$460,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">$125,000</td>
                  <td className="px-4 py-3">$2,917</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$450,000</td>
                  <td className="px-4 py-3 text-ink-500">$575,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">$150,000</td>
                  <td className="px-4 py-3">$3,500</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$540,000</td>
                  <td className="px-4 py-3 text-ink-500">$690,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">$200,000</td>
                  <td className="px-4 py-3">$4,667</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$720,000</td>
                  <td className="px-4 py-3 text-ink-500">$920,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *"Comfortable" = conservative 28% front-end DTI with no other
            significant debts. "Max Lender Approval" = 36-43% DTI. Real numbers
            vary by location, credit score, and current rates.
          </p>
        </section>

        {/* Income Tier Breakdowns */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Detailed Breakdowns by Income Level
          </h2>
          <p className="mt-4 text-ink-700">
            The table above gives you quick reference numbers. These three
            income tiers walk through the full math — monthly gross income,
            maximum housing and debt payments under the 28/36 rule, realistic
            home price ranges, and the costs that tables alone cannot capture.
          </p>

          <h3 id="75000-income" className="mt-8 text-xl font-semibold text-ink-800">
            $75,000 Income
          </h3>
          <p className="mt-4 text-ink-700">
            At $75,000 per year, your gross monthly income is $6,250. Under the
            28% rule, your maximum monthly housing payment (mortgage, taxes,
            insurance, and HOA) is $1,750. Under the 36% back-end rule, your
            total debt ceiling — including housing — is $2,250 per month. If you
            carry no other debts, the full $1,750 goes toward housing. With a
            $400/month car payment, your housing budget drops to $1,850 under
            the back-end rule, but the 28% front-end cap of $1,750 still
            applies.
          </p>
          <p className="mt-4 text-ink-700">
            With a conventional loan at 10% down on a $300,000 home, expect a
            home price range of roughly $280,000 to $330,000 depending on your
            debts, credit score, and local tax rates. A 10% down payment on
            $300,000 means $30,000 upfront plus closing costs. Because you are
            below 20% down, private mortgage insurance (PMI) adds approximately
            $80 to $150 per month until you reach 20% equity — typically 5-7
            years of on-time payments.
          </p>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">At a Glance</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Gross monthly income: $6,250</li>
                  <li>Max housing (28%): $1,750/month</li>
                  <li>Max total debt (36%): $2,250/month</li>
                  <li>Home price range: $280,000 - $330,000</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Loan Details</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Down payment: 10% (~$30,000)</li>
                  <li>PMI: ~$80 - $150/month</li>
                  <li>Loan type: Conventional</li>
                  <li>Comfortable target: ~$270,000</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 id="100000-income" className="mt-10 text-xl font-semibold text-ink-800">
            $100,000 Income
          </h3>
          <p className="mt-4 text-ink-700">
            A $100,000 salary translates to $8,333 per month in gross income.
            The 28% rule gives you a maximum housing budget of $2,333 per
            month, and the 36% back-end rule caps total debt at $3,000. At this
            income level, the comfortable home price range is approximately
            $380,000 to $440,000 with 20% down, 6.5% interest, and typical
            property tax and insurance rates. Lenders may pre-approve you for
            $460,000 or more — but that maximum leaves almost no margin for
            savings, maintenance, or lifestyle expenses.
          </p>
          <p className="mt-4 text-ink-700">
            The key at this income level: do not max out. Targeting 25% of
            gross income ($2,083/month) instead of 28% preserves roughly
            $250/month for retirement contributions, emergency savings, or
            unexpected costs. On a $350,000 mortgage at 6.5% over 30 years,
            total interest paid equals approximately $446,000 — meaning you
            pay more in interest over the life of the loan than the home&apos;s
            purchase price. A $400,000 home at the top of your range pushes
            that interest total above $510,000.
          </p>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">At a Glance</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Gross monthly income: $8,333</li>
                  <li>Max housing (28%): $2,333/month</li>
                  <li>Recommended (25%): $2,083/month</li>
                  <li>Home price range: $380,000 - $440,000</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Cost of Borrowing</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>$350K mortgage at 6.5%: ~$446K total interest</li>
                  <li>Monthly P&amp;I on $350K: ~$2,212</li>
                  <li>Max lender approval: ~$460,000</li>
                  <li>Comfortable target: ~$360,000</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 id="150000-income" className="mt-10 text-xl font-semibold text-ink-800">
            $150,000 Income
          </h3>
          <p className="mt-4 text-ink-700">
            At $150,000 per year, gross monthly income reaches $12,500. Maximum
            housing under the 28% rule is $3,500 per month, with total debt
            capped at $4,500 under the 36% rule. The comfortable home price
            range is approximately $540,000 to $620,000. Homes above $766,550
            (the 2026 conforming loan limit in most areas) require jumbo
            financing, which typically demands higher credit scores, larger down
            payments (often 15-20%), and interest rates 0.25-0.5% above
            conventional loans.
          </p>
          <p className="mt-4 text-ink-700">
            At this income level, the mortgage interest deduction becomes
            meaningfully valuable — potentially saving $3,000-$5,000 per year
            in federal taxes on a $500,000+ mortgage, though the benefit
            depends on whether you itemize deductions and your marginal tax
            bracket. Total homeownership costs extend well beyond the mortgage:
            on a $580,000 home, expect roughly $2,900/month in P&amp;I, $580 in
            property taxes, $240 in insurance, and $480/month set aside for
            maintenance — a true monthly cost of approximately $4,200, or 34%
            of gross income before HOA fees or PMI.
          </p>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">At a Glance</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Gross monthly income: $12,500</li>
                  <li>Max housing (28%): $3,500/month</li>
                  <li>Max total debt (36%): $4,500/month</li>
                  <li>Home price range: $540,000 - $620,000</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Additional Considerations</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Jumbo threshold: $766,550 (most areas)</li>
                  <li>Tax deduction: ~$3,000 - $5,000/year</li>
                  <li>True monthly cost on $580K home: ~$4,200</li>
                  <li>Comfortable target: ~$540,000</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Real Case Study: The Johnsons, $95K Combined Income
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Their Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Combined gross income: $95,000/year</li>
                  <li>Monthly gross: $7,917</li>
                  <li>Existing debts: $450/month (car + student loans)</li>
                  <li>Savings for down payment: $45,000</li>
                  <li>Credit score: 740</li>
                  <li>Target area: Suburban, property tax ~1.3%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">The Math</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>28% of gross: $2,217/month for housing</li>
                  <li>36% of gross: $2,850 total debt capacity</li>
                  <li>Available for housing: $2,850 - $450 = $2,400</li>
                  <li>Limiting factor: 28% rule → $2,217</li>
                  <li>Loan amount at 6.5%: ~$290,000</li>
                  <li>+ Down payment ($45K): ~$335,000 home</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">What They Did</h4>
              <p className="mt-2 text-sm text-ink-700">
                The Johnsons were pre-approved for $395,000, but they chose a
                $310,000 home. This gave them breathing room of ~$400/month —
                enough for retirement savings, an emergency fund contribution, and
                occasional travel. Two years in, they've had zero months where
                bills felt tight, even after a job transition and unexpected car
                repair.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Hidden Costs */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Hidden Costs Most Buyers Forget
          </h2>
          <p className="mt-4 text-ink-700">
            The sticker price is just the beginning. Here's what a $350,000 home
            actually costs you monthly:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Expense
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-800">
                    Monthly Cost
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Mortgage (P&I)</td>
                  <td className="px-4 py-3 text-right">$1,770</td>
                  <td className="px-4 py-3 text-ink-500">
                    $280K loan, 6.5%, 30yr
                  </td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Property Tax</td>
                  <td className="px-4 py-3 text-right">$350</td>
                  <td className="px-4 py-3 text-ink-500">1.2% of home value</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Homeowner's Insurance</td>
                  <td className="px-4 py-3 text-right">$146</td>
                  <td className="px-4 py-3 text-ink-500">~0.5% of home value</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">PMI (if &lt;20% down)</td>
                  <td className="px-4 py-3 text-right">$140</td>
                  <td className="px-4 py-3 text-ink-500">~0.5-1% of loan/year</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Maintenance & Repairs</td>
                  <td className="px-4 py-3 text-right">$292</td>
                  <td className="px-4 py-3 text-ink-500">1% of home value/year</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">HOA (if applicable)</td>
                  <td className="px-4 py-3 text-right">$200</td>
                  <td className="px-4 py-3 text-ink-500">Varies widely</td>
                </tr>
                <tr className="border-t-2 border-ink-200 font-semibold">
                  <td className="px-4 py-3">True Monthly Cost</td>
                  <td className="px-4 py-3 text-right text-brand-700">$2,898</td>
                  <td className="px-4 py-3 text-ink-500">
                    64% more than just P&I
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Step by Step */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            5-Step Framework to Find Your Comfortable Number
          </h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Calculate your actual take-home pay
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Use after-tax, after-deduction income — not gross. This is what
                  you actually have to work with each month. Include both earners
                  if dual income.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  List every recurring monthly expense
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Car payments, student loans, subscriptions, childcare,
                  groceries, utilities, health insurance. Be brutally honest — most
                  people underestimate by 20-30%.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Subtract non-negotiable savings
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Retirement contributions (at minimum enough for employer match),
                  emergency fund building, and any other savings goals. These are
                  not optional.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  The remainder is your housing budget
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Include ALL housing costs: mortgage payment, taxes, insurance,
                  HOA, maintenance fund (~1% of home value per year). Not just the
                  mortgage number.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                5
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Work backwards to a home price
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Plug your housing budget into our{" "}
                  <Link
                    href="/calculators/mortgage"
                    className="text-brand-600 underline"
                  >
                    Mortgage Calculator
                  </Link>{" "}
                  to see what home price fits. This bottom-up approach is more
                  accurate than any rule of thumb.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Common Mistakes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            5 Expensive Mistakes to Avoid
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">
                1. Spending your full pre-approval amount
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Pre-approval shows the maximum a bank will lend, not what you can
                comfortably afford. Think of it as a speed limit, not a speed
                target.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">
                2. Ignoring the true cost of ownership
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Maintenance, repairs, and upgrades average 1-3% of home value per
                year. A $400K home needs $4,000-$12,000/year in upkeep. Budget for
                it upfront.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">
                3. Draining your emergency fund for the down payment
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Keep 3-6 months of expenses separate from your down payment. The
                last thing you want is a surprise repair in month two with zero
                savings.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">
                4. Forgetting about interest rate impact
              </h3>
              <p className="mt-1 text-sm text-red-700">
                A 1% rate increase on a $300K loan adds ~$170/month ($61,000 over
                30 years). Don't house-hunt based on today's rate if you're closing
                in 6 months.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">
                5. Not accounting for lifestyle changes
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Planning for kids? Career change? One partner staying home? Buy for
                your future finances, not just today's dual income.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Calculate Your Exact Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Stop guessing. Plug in your income, debts, and down payment to see
            your real monthly payment and total cost.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/mortgage"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Mortgage Calculator
            </Link>
            <Link
              href="/calculators/home-affordability"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Home Affordability Calculator
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
        <RelatedGuides currentSlug="how-much-house-can-i-afford" relatedSlugs={["15-year-vs-30-year-mortgage", "rent-vs-buy-decision"]} />
      </article>
    </>
  );
}
