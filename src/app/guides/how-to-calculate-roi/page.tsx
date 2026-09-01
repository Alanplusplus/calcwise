import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "How to Calculate ROI: Formula, Examples, and Common Mistakes",
  description:
    "Learn how to calculate return on investment (ROI) with the simple formula, five real-world examples across marketing, real estate, and stocks, plus common mistakes that inflate your numbers.",
  keywords: [
    "how to calculate ROI",
    "ROI formula",
    "return on investment calculator",
    "ROI examples",
    "annualized ROI",
    "investment return calculation",
  ],
};

const faqs = [
  {
    question: "What is a good ROI percentage?",
    answer:
      "There is no universal 'good' ROI because it depends on the asset class, time horizon, and risk. The S&P 500 has averaged roughly 10% annualized return before inflation (7% after inflation) over the past 50 years. For business investments, most companies target at least 15-25% ROI to justify the capital and risk. Real estate rental properties commonly target 8-12% cash-on-cash return. Marketing campaigns often aim for 300-500% ROI. Always compare ROI against the risk-free rate (currently ~5% from Treasury bonds) as your baseline.",
  },
  {
    question: "What is the difference between ROI and annualized ROI?",
    answer:
      "Simple ROI shows total return regardless of time: a $10,000 investment that earns $5,000 over 5 years has a 50% ROI. Annualized ROI adjusts for time using the formula: Annualized ROI = ((1 + Total ROI)^(1/years)) - 1. That same 50% total return over 5 years equals approximately 8.45% annualized ROI. Annualized ROI lets you compare investments with different holding periods on equal footing -- a 30% return over 1 year is far better than 50% over 5 years.",
  },
  {
    question: "Does ROI account for inflation?",
    answer:
      "The standard ROI formula does not adjust for inflation. To calculate real (inflation-adjusted) ROI, use: Real ROI = ((1 + Nominal ROI) / (1 + Inflation Rate)) - 1. For example, a nominal 10% ROI with 3% inflation yields a real ROI of approximately 6.8%. Over long holding periods, ignoring inflation can make investments look significantly more profitable than they actually are in purchasing power terms.",
  },
  {
    question: "How do I calculate ROI on rental property?",
    answer:
      "For rental property, use cash-on-cash ROI: (Annual Net Cash Flow / Total Cash Invested) x 100. Total cash invested includes down payment, closing costs, and initial repairs. Annual net cash flow is rental income minus mortgage payments, property taxes, insurance, maintenance, and vacancy costs. On a $300,000 property with $60,000 down and $4,000 in closing costs, earning $24,000/year in rent with $16,000 in total expenses (including mortgage), your cash-on-cash ROI is ($8,000 / $64,000) x 100 = 12.5%.",
  },
  {
    question: "Can ROI be negative?",
    answer:
      "Yes. A negative ROI means the investment lost money. If you invest $10,000 and receive back only $8,000, your ROI is -20%. Negative ROI is common in business startups (many are unprofitable initially), failed marketing campaigns, and investments sold at a loss. Tracking negative ROI is just as important as tracking positive returns -- it helps identify underperforming assets that should be cut or restructured.",
  },
];

export default function HowToCalculateRoiGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="How to Calculate ROI: Formula, Examples, and Common Mistakes"
        description="Learn how to calculate return on investment (ROI) with the simple formula, five real-world examples across marketing, real estate, and stocks, plus common mistakes that inflate your numbers."
        slug="how-to-calculate-roi"
        datePublished="2026-09-01"
        image="/images/guides/how-to-calculate-roi.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "How to Calculate ROI",
            href: "/guides/how-to-calculate-roi",
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Investment Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            How to Calculate ROI: Formula, Examples, and Common Mistakes
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Return on investment (ROI) is the most widely used metric for
            evaluating whether an investment, project, or business decision was
            worth the money. This guide walks through the exact formula, five
            real-world calculations across different asset classes, the
            annualized ROI method for comparing investments over different time
            periods, and the most common mistakes that lead to inflated or
            misleading ROI figures.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: September 2026</p>
        </header>

        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Basic formula:</strong> ROI = (Net Profit / Investment
              Cost) x 100
            </li>
            <li>
              <strong>Example:</strong> Invest $10,000, receive $15,000 back.
              Net profit = $5,000. ROI = ($5,000 / $10,000) x 100 = 50%
            </li>
            <li>
              <strong>Annualized formula:</strong> Annualized ROI = ((1 + Total
              ROI)^(1/years)) - 1, which adjusts for holding period
            </li>
            <li>
              <strong>Common mistake:</strong> Ignoring ongoing costs (taxes,
              maintenance, fees) inflates ROI by 20-40% on average
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Run your own numbers with our{" "}
            <Link
              href="/calculators/roi"
              className="font-medium text-brand-600 underline"
            >
              ROI Calculator
            </Link>{" "}
            for instant results.
          </p>
        </section>

        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/how-to-calculate-roi.webp"
              alt="Infographic showing the ROI formula, three example calculations for marketing, rental property, and stocks, and a compound ROI growth curve over 5 years"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              ROI formula and three real-world examples: marketing campaign (160%), rental property (26.7%), and stock portfolio (50%)
            </figcaption>
          </figure>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The ROI Formula Explained
          </h2>
          <p className="mt-4 text-ink-700">
            Return on investment measures the gain or loss generated relative to
            the amount invested. The basic formula is straightforward:
          </p>
          <div className="my-6 rounded-lg bg-ink-100 p-5 text-center">
            <p className="text-xl font-bold text-ink-900">
              ROI = (Net Profit / Investment Cost) x 100
            </p>
            <p className="mt-2 text-sm text-ink-600">
              Where Net Profit = Total Returns - Investment Cost - Ongoing Costs
            </p>
          </div>
          <p className="mt-4 text-ink-700">
            The result is expressed as a percentage. A positive ROI means the
            investment earned more than it cost; a negative ROI means it lost
            money. Simple as the formula appears, the challenge lies in correctly
            defining &quot;net profit&quot; and &quot;investment cost.&quot; Most
            ROI errors come from incomplete accounting of costs -- forgetting
            taxes, fees, maintenance, opportunity cost, or the time value of
            money.
          </p>
          <p className="mt-4 text-ink-700">
            For investments held over multiple years, the basic formula fails to
            account for time. A 50% return over 1 year is dramatically better
            than 50% over 10 years, yet simple ROI treats them identically.
            That is where annualized ROI comes in:
          </p>
          <div className="my-6 rounded-lg bg-ink-100 p-5 text-center">
            <p className="text-xl font-bold text-ink-900">
              Annualized ROI = ((1 + Total ROI)^(1/years)) - 1
            </p>
            <p className="mt-2 text-sm text-ink-600">
              Converts total return to an equivalent annual rate for apples-to-apples comparison
            </p>
          </div>
          <p className="mt-4 text-ink-700">
            Use our{" "}
            <Link
              href="/calculators/roi"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              ROI Calculator
            </Link>{" "}
            to compute both simple and annualized ROI instantly, including
            ongoing costs and multi-year revenue projections. For compound
            growth scenarios, pair it with the{" "}
            <Link
              href="/calculators/compound-interest"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Compound Interest Calculator
            </Link>{" "}
            to model how reinvested returns accelerate wealth building.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            5 Real-World ROI Calculations
          </h2>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            1. Marketing Campaign ROI
          </h3>
          <p className="mt-2 text-ink-700">
            A small e-commerce business spends $5,000 on a Facebook ad campaign
            over 3 months. The campaign generates $18,000 in attributable
            revenue. The cost of goods sold on those orders is $7,200 (40%
            margin).
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Gross revenue:</strong> $18,000</li>
            <li><strong>COGS:</strong> $7,200</li>
            <li><strong>Gross profit:</strong> $10,800</li>
            <li><strong>Ad spend:</strong> $5,000</li>
            <li><strong>Net profit:</strong> $10,800 - $5,000 = $5,800</li>
            <li><strong>ROI:</strong> ($5,800 / $5,000) x 100 = <strong>116%</strong></li>
          </ul>
          <p className="mt-4 text-ink-700">
            Many marketers calculate ROI using gross revenue instead of gross
            profit, which would show ($18,000 - $5,000) / $5,000 = 260%.
            That is misleading because it ignores the cost of fulfilling those
            orders. Always use net profit for an accurate picture.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            2. Rental Property ROI
          </h3>
          <p className="mt-2 text-ink-700">
            A real estate investor purchases a $300,000 rental property with
            $60,000 down (20%) and $4,000 in closing costs. The mortgage payment
            is $1,556/month. Annual rental income is $24,000 ($2,000/month).
            Annual expenses beyond the mortgage include $3,600 in property taxes,
            $1,500 in insurance, $2,400 in maintenance, and $1,200 for vacancy
            allowance (5%).
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Total cash invested:</strong> $64,000</li>
            <li><strong>Annual revenue:</strong> $24,000</li>
            <li><strong>Annual mortgage:</strong> $18,672</li>
            <li><strong>Annual operating costs:</strong> $8,700</li>
            <li><strong>Net annual cash flow:</strong> $24,000 - $18,672 - $8,700 = -$3,372</li>
            <li><strong>Cash-on-cash ROI:</strong> (-$3,372 / $64,000) x 100 = <strong>-5.3%</strong></li>
          </ul>
          <p className="mt-4 text-ink-700">
            This is a negative cash-on-cash ROI in year one, which is common
            when including the full mortgage payment. However, the ROI picture
            improves when factoring in equity buildup (approximately $5,400/year
            in principal paydown) and potential 3-4% annual appreciation. The
            total ROI including equity and appreciation is closer to 10-14%
            annually, but the cash-flow-only measure reveals that this property
            requires out-of-pocket support each month.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            3. Stock Portfolio ROI
          </h3>
          <p className="mt-2 text-ink-700">
            An investor buys $50,000 worth of an S&P 500 index fund (VOO) and
            holds it for 3 years. The portfolio grows to $62,500 after
            dividends are reinvested. Trading commissions are $0 (most brokers
            charge no commission). The fund&apos;s expense ratio of 0.03% costs
            roughly $50 over the period.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Total return:</strong> $62,500 - $50,000 = $12,500</li>
            <li><strong>Net profit:</strong> $12,500 - $50 (fees) = $12,450</li>
            <li><strong>Simple ROI:</strong> ($12,450 / $50,000) x 100 = <strong>24.9%</strong></li>
            <li><strong>Annualized ROI:</strong> ((1 + 0.249)^(1/3)) - 1 = <strong>7.7%</strong></li>
          </ul>
          <p className="mt-4 text-ink-700">
            The 7.7% annualized return is slightly below the S&P 500 long-term
            average of ~10%, reflecting a moderate growth period. Note that this
            is pre-tax: long-term capital gains tax (0%, 15%, or 20% depending
            on income) would reduce the effective return. For detailed investment
            growth projections, use our{" "}
            <Link
              href="/calculators/investment-return"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Investment Return Calculator
            </Link>.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            4. Business Equipment ROI
          </h3>
          <p className="mt-2 text-ink-700">
            A bakery invests $50,000 in a commercial convection oven that
            increases production capacity by 40%. The additional capacity
            generates $30,000/year in incremental revenue with $12,000/year in
            additional ingredient and labor costs. The oven has a 10-year
            useful life and $2,000 in annual maintenance.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Annual net profit:</strong> $30,000 - $12,000 - $2,000 = $16,000</li>
            <li><strong>5-year net profit:</strong> $80,000</li>
            <li><strong>5-year ROI:</strong> ($80,000 / $50,000) x 100 = <strong>160%</strong></li>
            <li><strong>Annualized ROI:</strong> ((1 + 1.6)^(1/5)) - 1 = <strong>21.1%</strong></li>
            <li><strong>Payback period:</strong> $50,000 / $16,000 = <strong>3.1 years</strong></li>
          </ul>
          <p className="mt-4 text-ink-700">
            A 3.1-year payback period with 21.1% annualized ROI is excellent
            for a capital equipment investment. The oven continues generating
            $16,000/year in profit for the remaining 7 years of its life,
            making the full 10-year ROI significantly higher.
          </p>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            5. Education ROI
          </h3>
          <p className="mt-2 text-ink-700">
            A professional spends $25,000 on an MBA program (part-time, 2
            years) while continuing to work. After completing the degree, their
            salary increases from $65,000 to $85,000 -- a $20,000 annual raise.
            Opportunity cost: $3,000/year in reduced free time valued at
            consulting rates.
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li><strong>Investment:</strong> $25,000 tuition + $6,000 opportunity cost = $31,000</li>
            <li><strong>Annual salary increase:</strong> $20,000</li>
            <li><strong>5-year cumulative gain:</strong> $100,000</li>
            <li><strong>5-year net profit:</strong> $100,000 - $31,000 = $69,000</li>
            <li><strong>5-year ROI:</strong> ($69,000 / $31,000) x 100 = <strong>222.6%</strong></li>
            <li><strong>Annualized ROI (from graduation):</strong> ((1 + 2.226)^(1/5)) - 1 = <strong>26.4%</strong></li>
          </ul>
          <p className="mt-4 text-ink-700">
            Education ROI compounds over a career: the $20,000 raise persists
            for 20-30 working years, making the true lifetime ROI far higher.
            However, this example does not account for the tax impact on the
            higher salary or potential raises the professional might have
            received without the degree.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            ROI Comparison Across Investment Types
          </h2>
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">Investment Type</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Investment</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Time</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Net Profit</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Simple ROI</th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">Annualized ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Marketing Campaign</td>
                  <td className="px-4 py-2 text-right text-ink-700">$5,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">3 months</td>
                  <td className="px-4 py-2 text-right text-ink-700">$5,800</td>
                  <td className="px-4 py-2 text-right text-ink-700">116%</td>
                  <td className="px-4 py-2 text-right text-ink-700">~560%*</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Rental Property (cash flow)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$64,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">1 year</td>
                  <td className="px-4 py-2 text-right text-ink-700">-$3,372</td>
                  <td className="px-4 py-2 text-right text-ink-700">-5.3%</td>
                  <td className="px-4 py-2 text-right text-ink-700">-5.3%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">S&P 500 Index Fund</td>
                  <td className="px-4 py-2 text-right text-ink-700">$50,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">3 years</td>
                  <td className="px-4 py-2 text-right text-ink-700">$12,450</td>
                  <td className="px-4 py-2 text-right text-ink-700">24.9%</td>
                  <td className="px-4 py-2 text-right text-ink-700">7.7%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Business Equipment</td>
                  <td className="px-4 py-2 text-right text-ink-700">$50,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">5 years</td>
                  <td className="px-4 py-2 text-right text-ink-700">$80,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">160%</td>
                  <td className="px-4 py-2 text-right text-ink-700">21.1%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">MBA Education</td>
                  <td className="px-4 py-2 text-right text-ink-700">$31,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">5 years</td>
                  <td className="px-4 py-2 text-right text-ink-700">$69,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">222.6%</td>
                  <td className="px-4 py-2 text-right text-ink-700">26.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-500">
            *Marketing campaign annualized ROI is extrapolated from a 3-month period and is not sustainable at scale.
          </p>
          <p className="mt-4 text-ink-700">
            This table demonstrates why annualized ROI is essential for
            comparison. The marketing campaign has the highest simple ROI
            (116%) but operates over just 3 months. The education investment
            shows the highest annualized ROI (26.4%) with a long payback
            horizon that compounds over an entire career.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: David Evaluates Three Investment Opportunities
          </h2>
          <p className="mt-4 text-ink-700">
            David is a 35-year-old small business owner in Phoenix with $50,000
            to invest. He is comparing three options: expanding his business
            (new equipment), a rental property down payment, and investing in an
            S&P 500 index fund. He uses ROI analysis to make a data-driven
            decision.
          </p>
          <p className="mt-4 text-ink-700">
            <strong>Option A: Business expansion.</strong> A $50,000 commercial
            pizza oven increases his restaurant&apos;s capacity by 35%. He
            estimates $28,000/year in additional revenue with $10,000 in
            additional costs (ingredients, labor, utilities), yielding
            $18,000/year net. Over 5 years: ROI = ($90,000 / $50,000) x 100 =
            180%. Annualized: 22.9%.
          </p>
          <p className="mt-4 text-ink-700">
            <strong>Option B: Rental property.</strong> He uses the $50,000 as a
            down payment on a $250,000 condo. After mortgage, taxes, insurance,
            and maintenance, net annual cash flow is $2,400. Cash-on-cash ROI:
            ($2,400 / $54,000) x 100 = 4.4%. Including 3% appreciation and
            equity buildup, total annualized ROI is approximately 11%.
          </p>
          <p className="mt-4 text-ink-700">
            <strong>Option C: Index fund.</strong> Historical average return of
            10% annually. After 5 years, $50,000 grows to approximately
            $80,525. Annualized ROI: 10%. Fully passive with no management
            effort.
          </p>
          <p className="mt-4 text-ink-700">
            David chooses Option A. The 22.9% annualized ROI is more than
            double the index fund return, and the investment directly
            strengthens his primary income source. He accepts the higher risk
            (his business must sustain the increased demand) in exchange for the
            higher return. He uses our{" "}
            <Link
              href="/calculators/roi"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              ROI Calculator
            </Link>{" "}
            to model sensitivity: even if revenue growth is only 25% of
            projections ($7,000/year net instead of $18,000), the 5-year ROI
            is still -30% -- meaning he loses money. This downside scenario
            helps him set a minimum revenue target to monitor monthly.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            5 Common Mistakes That Inflate ROI
          </h2>
          <ul className="mt-4 space-y-4 text-ink-700">
            <li>
              <strong>1. Forgetting ongoing costs.</strong> A rental property ROI
              calculated with only the down payment and gross rent ignores
              mortgage payments, taxes, insurance, maintenance, and vacancy.
              This can inflate ROI from the realistic 4-12% range to an
              unrealistic 25-40%.
            </li>
            <li>
              <strong>2. Ignoring the time dimension.</strong> Reporting &quot;200%
              ROI&quot; without specifying whether it took 1 year or 10 years
              makes the number meaningless. Always calculate and report
              annualized ROI alongside simple ROI.
            </li>
            <li>
              <strong>3. Using revenue instead of profit.</strong> Marketing ROI
              is especially prone to this error. An ad campaign that generates
              $50,000 in revenue on $10,000 in ad spend looks like 400% ROI,
              but if the product margin is 30%, the actual profit-based ROI is
              ($15,000 - $10,000) / $10,000 = 50%.
            </li>
            <li>
              <strong>4. Excluding opportunity cost.</strong> Money invested in
              one asset cannot simultaneously earn returns elsewhere. If your
              business investment returns 8% but a risk-free Treasury bond pays
              5%, your excess return is only 3%. Compare every ROI against what
              the money would have earned in the next-best alternative.
            </li>
            <li>
              <strong>5. Ignoring taxes.</strong> A stock sold for 25% profit
              owes 15% long-term capital gains tax in most brackets, reducing
              the after-tax ROI to 21.25%. Real estate investors face
              depreciation recapture at 25%. Always factor in tax impact for
              accurate after-tax ROI.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: How to Calculate ROI for Any Investment
          </h2>
          <ol className="mt-4 space-y-4 text-ink-700 list-decimal list-inside">
            <li>
              <strong>Identify total investment cost.</strong> Include the
              purchase price, transaction fees, setup costs, and any opportunity
              cost of capital. For a business: equipment + installation +
              training. For real estate: down payment + closing costs + initial
              repairs.
            </li>
            <li>
              <strong>Calculate ongoing costs.</strong> List all recurring
              expenses tied to the investment: maintenance, management fees,
              taxes, insurance, subscription costs. Sum these over your
              evaluation period.
            </li>
            <li>
              <strong>Measure total returns.</strong> Track all revenue,
              dividends, rental income, cost savings, or resale value generated
              by the investment. Use actual numbers, not projections, whenever
              possible.
            </li>
            <li>
              <strong>Compute net profit.</strong> Total returns minus
              investment cost minus ongoing costs = net profit. This must be a
              single, honest number.
            </li>
            <li>
              <strong>Apply the ROI formula.</strong> (Net Profit / Investment
              Cost) x 100 for simple ROI. Use the annualized formula if the
              holding period exceeds one year.
            </li>
            <li>
              <strong>Compare against alternatives.</strong> Stack your ROI
              against the risk-free rate, market index returns, and other
              available investments to determine if the return justified the
              risk.
            </li>
          </ol>
          <p className="mt-4 text-ink-700">
            For an instant calculation with ongoing costs and multi-year
            projections built in, use our{" "}
            <Link
              href="/calculators/roi"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              ROI Calculator
            </Link>. For comparing how compound growth changes your returns
            over time, try the{" "}
            <Link
              href="/calculators/compound-interest"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Compound Interest Calculator
            </Link>.
          </p>
        </section>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Numbers</p>
          <p className="mt-1 text-sm text-ink-600">Use our free calculator to see ROI for your specific investment scenario.</p>
          <Link href="/calculators/roi" className="mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
            Open ROI Calculator
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="mt-8">
              <h3 className="text-lg font-semibold text-ink-800">
                {faq.question}
              </h3>
              <p className="mt-2 text-ink-700">{faq.answer}</p>
            </div>
          ))}
        </section>

        <RelatedGuides
          currentSlug="how-to-calculate-roi"
          relatedSlugs={["how-to-start-investing-1000", "compound-interest-real-examples", "student-loan-repayment-strategies"]}
        />
      </article>
    </>
  );
}
