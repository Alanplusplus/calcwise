import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import { RETIREMENT_LIMITS, usd } from "@/lib/tax-data";

export const metadata: Metadata = {
  title: "15-Year vs 30-Year Mortgage: Which Saves You More Money?",
  description:
    "Compare 15-year vs 30-year mortgages with real numbers on a $350K loan. See monthly payments, total interest, break-even analysis, and who wins.",
  keywords: [
    "15 year vs 30 year mortgage",
    "15 year vs 30 year mortgage calculator",
    "15 year mortgage vs 30 year",
    "should I get a 15 or 30 year mortgage",
    "15 year mortgage savings",
  ],
};

const faqs = [
  {
    question: "How much more does a 15-year mortgage cost per month?",
    answer:
      "On a $350,000 loan at mid-October 2026 Freddie Mac PMMS averages, a 15-year mortgage at 6.71% costs $3,089 per month versus $2,423 for a 30-year at 7.40% — a difference of $666 per month. That extra $666 buys you a mortgage-free life 15 years sooner and saves about $316,260 in total interest over the life of the loan.",
  },
  {
    question: "Is a 15-year mortgage always cheaper in the long run?",
    answer:
      "A 15-year mortgage always saves on total interest — on a $350,000 loan you pay about $206,020 in interest versus $522,280 on a 30-year, a $316,260 difference. However, if you invest the $666 monthly payment difference at a hypothetical 7% average return (not guaranteed), your portfolio grows to about $211,100 over 15 years — still roughly $52,000 short of the $263,000 balance you would owe on the 30-year at that point. The 15-year wins on guaranteed savings, but the gap narrows when you factor in investment opportunity cost and higher historical stock returns.",
  },
  {
    question: "What are typical 15-year and 30-year mortgage rates in fall 2026?",
    answer:
      "As of the Freddie Mac Primary Mortgage Market Survey week ending October 15, 2026, the national average 30-year fixed rate was 7.40% and the 15-year fixed rate was 6.71% — a 0.69-percentage-point spread. PMMS rates apply to conventional, conforming purchase loans with 20% down and strong credit; your quoted rate will differ.",
  },
  {
    question: "Can I switch from a 30-year to a 15-year mortgage later?",
    answer:
      "Yes, through refinancing. If rates drop further or your income rises, you can refinance a remaining balance from a 30-year to a 15-year term. Refinancing costs typically run $3,000 to $6,000 in closing fees, so the break-even point is usually 18 to 36 months of interest savings. Alternatively, you can simulate a 15-year payoff by adding about $666 per month in extra principal payments on a $350,000 loan at current PMMS averages without refinancing.",
  },
  {
    question: "Who should choose a 15-year mortgage over a 30-year?",
    answer:
      "Choose a 15-year mortgage if your full housing payment (PITI) stays below 28% of gross income ($3,383/month on a $145,000 salary), you have at least 6 months of emergency savings (roughly $21,000 on a $3,465/month PITI payment), you are within 20 years of retirement, or you prioritize guaranteed interest savings over market returns. Skip the 15-year if the higher payment would push your total debt above 36% of income or leave you with less than $15,000 in liquid savings.",
  },
  {
    question: "How do mortgage rates affect the 15-year vs 30-year decision?",
    answer:
      "Higher rates raise payments on both terms, but the 15-year still cuts total interest dramatically — at mid-October 2026 PMMS averages (6.71% / 7.40%), the 15-year saves about $316,260 in interest on a $350,000 loan versus a 30-year. When rates fall, both payments drop and the dollar gap between terms usually shrinks. Many buyers lock a 30-year for flexibility and either refinance to a 15-year later or add extra principal when cash flow allows.",
  },
];

export default function FifteenVsThirtyYearMortgageGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="15-Year vs 30-Year Mortgage: Which Saves You More Money?"
        description="Compare 15-year vs 30-year mortgages with real numbers on a $350K loan. See monthly payments, total interest, break-even analysis, and who wins."
        slug="15-year-vs-30-year-mortgage"
        datePublished="2026-08-24"
        dateModified="2026-10-20"
        image="/images/guides/15-year-vs-30-year-mortgage.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "15-Year vs 30-Year Mortgage", href: "/guides/15-year-vs-30-year-mortgage" },
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
            15-Year vs 30-Year Mortgage: Which Saves You More Money?
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            The difference between a 15-year and 30-year mortgage on a
            $350,000 loan is not a rounding error — it is $666 per month and
            about $316,260 in total interest over the life of the loan. This guide
            runs every number at mid-October 2026 PMMS averages so you can see exactly what
            each term costs, where the break-even point falls, and which option
            fits your budget.
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
              <strong>15-year at 6.71%:</strong> $3,089/month, about $206,020 total
              interest, $556,020 total cost on a $350,000 loan
            </li>
            <li>
              <strong>30-year at 7.40%:</strong> $2,423/month, about $522,280 total
              interest, $872,280 total cost on the same loan
            </li>
            <li>
              <strong>Monthly difference:</strong> $666 — enough to max a Roth
              IRA ({usd(Math.round(RETIREMENT_LIMITS.ira / 12))}/month) with about $41 left over
            </li>
            <li>
              <strong>Break-even on interest savings:</strong> Guaranteed from
              day one — the 15-year saves about $316,260 no matter what the market
              does
            </li>
            <li>
              <strong>Best for most buyers in fall 2026:</strong> 30-year for
              flexibility, with extra payments when cash flow allows
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
              href="/calculators/loan-comparison"
              className="font-medium text-brand-600 underline"
            >
              Loan Comparison Calculator
            </Link>{" "}
            to model your exact loan amount and rate.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/15-year-vs-30-year-mortgage.webp"
              alt="Infographic comparing a 15-year mortgage at 6.71% ($3,089 per month, $206,020 total interest) with a 30-year mortgage at 7.40% ($2,423 per month, $522,280 total interest) on a $350,000 loan, using Freddie Mac rates as of October 15, 2026"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Side-by-side comparison at mid-October 2026 PMMS rates: a 15-year mortgage costs $666 more per month but saves about $316,260 in total interest on a $350,000 loan
            </figcaption>
          </figure>
        </section>

        {/* Detailed Explanation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Real Numbers: $350,000 at Fall 2026 Rates
          </h2>
          <p className="mt-4 text-ink-700">
            The national median existing single-family home price was $434,900 in
            Q2 2026, according to the National Association of Realtors (industry
            survey data). A buyer putting roughly 20% down near that median
            often borrows about $350,000 — a round number that makes the math
            easy to follow. As of the Freddie Mac Primary Mortgage Market Survey
            week ending October 15, 2026, the average 15-year fixed rate was 6.71%
            and the 30-year fixed was 7.40% — a 0.69-percentage-point spread.
          </p>
          <p className="mt-4 text-ink-700">
            On that $350,000 principal, the 15-year payment comes to $3,089
            per month. Over 180 payments, you send the lender $556,020 and pay
            about $206,020 in interest. The 30-year payment drops to $2,423 per
            month — $666 less — but over 360 payments you send $872,280 total
            and pay about $522,280 in interest. That is about $316,260 more in interest
            charges for the privilege of a lower monthly bill.
          </p>
          <p className="mt-4 text-ink-700">
            The trade-off is cash flow versus total cost. The 15-year borrower
            pays an extra $7,992 per year ($666 x 12) but owns the home outright
            in 2041 instead of 2056. After 15 years, the 15-year borrower has
            zero mortgage balance. The 30-year borrower still owes about $263,023 and
            faces 180 more payments totaling about $436,140. From year 16 onward, the
            15-year borrower has $3,089 per month freed up — while the 30-year
            borrower continues writing checks.
          </p>
          <p className="mt-4 text-ink-700">
            The opportunity cost matters. If you take the 30-year and invest the
            $666 monthly difference in a diversified index fund at a hypothetical
            7% average annual return (not guaranteed), that investment grows to
            about $211,100 over 15 years. You still owe about $263,023 on the
            mortgage, so your net position is roughly $51,900 worse off than the
            15-year borrower who owns the home free and clear. At a hypothetical
            10% return, the invested portfolio hits about $276,100 — enough to
            pay off the remaining balance with about $13,100 left over. The
            break-even investment return sits around 9.4%: above that, the
            30-year plus investing wins; below it, the 15-year wins on total wealth.
          </p>
          <p className="mt-4 text-ink-700">
            Closing costs are nearly identical for both terms — typically
            $6,500 to $8,500 on a $350,000 loan (roughly 2% of the purchase
            price). Lenders do not charge a premium for the shorter term. The
            only difference is qualification: because the 15-year payment is
            $666 higher, you need roughly $2,379 more in monthly gross income to
            qualify under the 28% housing ratio ($666 / 0.28 = $2,379).
          </p>
          <Sources
            items={[
              {
                label: "Freddie Mac Primary Mortgage Market Survey (week ending Oct. 15, 2026)",
                href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-hold-steady-740/",
              },
              {
                label: "NAR Q2 2026 existing-home median price release (Aug. 4, 2026)",
                href: "https://www.nar.realtor/newsroom/home-prices-increased-in-80-of-metro-areas-in-second-quarter-of-2026",
              },
            ]}
            checked="October 2026"
            note="NAR median price is industry survey data (Tier 2). Loan examples use PMMS averages for 20%-down, excellent-credit conventional loans."
          />
        </section>

        {/* Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            15-Year vs 30-Year: Head-to-Head Comparison
          </h2>
          <p className="mt-4 text-ink-700">
            Every figure below assumes a $350,000 loan with no extra payments,
            property taxes, or insurance. Add $350 to $550 per month for taxes
            and insurance depending on your state.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Metric</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">15-Year (6.71%)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">30-Year (7.40%)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Monthly principal + interest</td>
                  <td className="px-4 py-3 font-medium">$3,089</td>
                  <td className="px-4 py-3">$2,423</td>
                  <td className="px-4 py-3 text-brand-700">+$666/mo (15yr)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Total payments over life of loan</td>
                  <td className="px-4 py-3">$556,020</td>
                  <td className="px-4 py-3">$872,280</td>
                  <td className="px-4 py-3">+$316,260 (30yr)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total interest paid</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$206,020</td>
                  <td className="px-4 py-3">$522,280</td>
                  <td className="px-4 py-3 text-brand-700">$316,260 saved (15yr)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Loan paid off by</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Year 15 (2041)</td>
                  <td className="px-4 py-3">Year 30 (2056)</td>
                  <td className="px-4 py-3">15 years sooner</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Balance after 15 years</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$0</td>
                  <td className="px-4 py-3">$263,023</td>
                  <td className="px-4 py-3">$263,023 remaining</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Amount paid in first 15 years</td>
                  <td className="px-4 py-3">$556,020</td>
                  <td className="px-4 py-3">$436,140</td>
                  <td className="px-4 py-3">+$119,880 (15yr)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Invest $666/mo at 7% for 15 years</td>
                  <td className="px-4 py-3">N/A</td>
                  <td className="px-4 py-3">$211,100</td>
                  <td className="px-4 py-3">Still ~$51,900 short of payoff</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Min. gross income (28% rule)</td>
                  <td className="px-4 py-3">$11,032/mo ($132,386/yr)</td>
                  <td className="px-4 py-3">$8,654/mo ($103,843/yr)</td>
                  <td className="px-4 py-3">+$28,543/yr (15yr)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Rates reflect Freddie Mac PMMS averages for the week ending Oct. 15, 2026 (15-year: 6.71%, 30-year: 7.40%). Property taxes, insurance, and PMI not included. Investment return assumes a hypothetical 7% annual average in a taxable brokerage account (not guaranteed).
          </p>
          <Sources
            items={[
              {
                label: "Freddie Mac PMMS archive (Oct. 15, 2026)",
                href: "https://www.freddiemac.com/pmms/archive",
              },
            ]}
            checked="October 2026"
          />
        </section>

        {/* Break-Even Analysis */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Break-Even Analysis: When Does Each Option Win?
          </h2>
          <p className="mt-4 text-ink-700">
            The 15-year mortgage wins on guaranteed interest savings from month
            one — about $316,260 over the full term, with no market risk attached. But
            the 30-year plus invest strategy closes the gap over time. In year 1,
            investing the $666 difference at a hypothetical 7% yields about $8,255 while you
            paid $7,992 extra on the 15-year — a small advantage to investing.
            By year 5, the investment portfolio reaches about $47,700 versus
            $39,960 in cumulative extra 15-year payments, a $7,740 lead.
          </p>
          <p className="mt-4 text-ink-700">
            The crossover happens around year 14, when the invested balance exceeds
            the cumulative extra payments — but you still owe about
            $263,023 on the mortgage at that point. True wealth parity requires
            roughly a 9.4%+ average investment return over 15 years, or reaching year 15
            with a hypothetical 10% return (about $276,100 invested vs. $263,023 owed, a ~$13,100 surplus). Below 7%
            returns, the 15-year mortgage builds more net wealth in most years because the guaranteed interest savings outpace weaker market
            performance.
          </p>
          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Key Insight</p>
            <p className="mt-1 text-sm text-amber-700">
              The 15-year mortgage is a guaranteed 6.71% return on every extra
              dollar (your PMMS rate). To beat it by investing, you need consistent after-tax
              returns above that level for 15 straight years — historically plausible but never
              guaranteed. From 2000 through 2010, the S&P 500 returned about 0.4% annually
              (historical, NYU Stern Damodaran data). Past performance does not predict future results.
            </p>
          </div>
          <Sources
            items={[
              {
                label: "NYU Stern (Damodaran), Historical Returns on Stocks, Bonds and Bills (Jan. 2026)",
                href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
              },
              {
                label: "S&P Dow Jones Indices, S&P 500 historical returns research (Sept. 2021)",
                href: "https://www.spglobal.com/spdji/en/documents/research/research-returns-values-and-outcomes-a-counterfactual-history.pdf",
              },
            ]}
            checked="October 2026"
            note="Stock returns cited are historical U.S. averages, not forecasts."
          />
        </section>

        {/* Who Should Choose Each */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Who Should Choose a 15-Year vs 30-Year Mortgage
          </h2>
          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Choose the 15-Year If...
          </h3>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              Your total housing cost (PITI) stays under 28% of gross income —
              on $145,000/year, that means $3,383/month or less including taxes
              and insurance
            </li>
            <li>
              You have 6+ months of expenses saved (about $21,000 minimum on a
              ~$3,465/month PITI payment)
            </li>
            <li>
              You are 50 or older and want the mortgage paid off before a
              planned retirement at 65
            </li>
            <li>
              You value guaranteed returns over market volatility — about $316,260 in
              interest savings with zero risk on a $350,000 loan at mid-October 2026 PMMS rates
            </li>
            <li>
              Your income is stable and unlikely to drop — dual-income household
              with combined tenure of 5+ years at current employers
            </li>
          </ul>
          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Choose the 30-Year If...
          </h3>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              The $666/month difference would strain your budget or prevent
              retirement contributions (401(k) match, Roth IRA)
            </li>
            <li>
              You plan to invest the payment difference — $666/month at a hypothetical 7%
              grows to about $211,100 in 15 years
            </li>
            <li>
              Your income is variable (commission, freelance, startup equity)
              and you need payment flexibility during lean months
            </li>
            <li>
              You may move within 10 years — total interest paid on a $350,000
              30-year loan after 7 years is roughly $175,000 vs. about $139,000
              on a 15-year, a ~$36,000 gap that may not justify the higher payment
            </li>
            <li>
              You want to qualify for a larger home — the 30-year requires
              about $28,500 less annual income to meet the 28% ratio on the same loan amount
            </li>
          </ul>
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: David and Sarah, $145K Combined Income in Portland, OR
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Their Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Combined gross income: $145,000/year ($12,083/month)</li>
                  <li>Location: Portland, OR — median home price $485,000</li>
                  <li>Purchase price: $418,000 (14% below median)</li>
                  <li>Down payment: 20% ($83,600), loan amount: $334,400</li>
                  <li>Monthly debts: $380 student loans, $420 car payment</li>
                  <li>Emergency fund: $28,000 (6.2 months of expenses)</li>
                  <li>401(k): both contributing 8% with 4% employer match</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">The Numbers</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Property tax: $348/month (1.0% of value)</li>
                  <li>Homeowners insurance: $165/month</li>
                  <li>15-year PITI: $3,465/month (28.7% of gross income)</li>
                  <li>30-year PITI: $2,828/month (23.4% of gross income)</li>
                  <li>15-year total interest: about $196,910 over 180 payments</li>
                  <li>30-year total interest: about $499,110 over 360 payments</li>
                  <li>Total debt ratio (30yr): 30.0% — within 36% limit</li>
                  <li>Total debt ratio (15yr): 35.3% — within limit but tight</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">What They Chose: 30-Year with a Plan</h4>
              <p className="mt-2 text-sm text-ink-700">
                David and Sarah chose the 30-year at 7.40% ($2,315/month P&I)
                even though the 15-year fits within lender limits
                at 35.3% total DTI. Their reasoning: with $2,100/month average
                childcare costs starting in 2027, the 15-year's $3,465 PITI
                plus $800 in existing debts leaves just $918/month for everything
                else after childcare — too thin for comfort. Their monthly budget
                with the 30-year: $2,828 housing + $800 debts + $1,450 groceries
                and utilities + $800 retirement + $500 savings = $6,378 against
                $8,200 take-home pay, leaving $1,822 in flex money. They
                auto-deposit $400/month into a brokerage account
                (most of the $637 payment difference) and plan to refinance to a
                15-year when their student loans are paid off in 2029, freeing
                $380/month. At that point, their projected income of $158,000
                makes the 15-year PITI ($3,465) about 26.3% of gross — comfortably
                within range.
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step Decision Framework */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: How to Choose Your Mortgage Term
          </h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Calculate both payments on your exact loan amount
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Plug your loan amount into both term options. On $334,400,
                  the difference is about $637/month ($2,952 vs. $2,315). On $350,000,
                  it is $666/month at mid-October 2026 PMMS averages. Know your exact number before deciding — a
                  $50,000 difference in loan size shifts the monthly gap by
                  roughly $95.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Run the 28/36 rule with PITI, not just principal and interest
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Add property taxes ($300-$600/month in most states), insurance
                  ($120-$250/month), and PMI if putting less than 20% down
                  ($150-$280/month).                   David and Sarah's 15-year PITI of
                  $3,465 looked manageable on P&I alone ($2,952) but
                  felt tight once student loans, car
                  payments, and upcoming childcare costs were factored in.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Stress-test your budget at the higher payment
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Could you cover the 15-year payment if one income dropped by
                  50% for 6 months? On $145,000 combined income, half is
                  $72,500 ($6,042/month gross). A $3,465 housing payment would
                  consume 57.4% of one income — risky. The $2,828 30-year payment
                  consumes 46.8%, still tight but survivable with their $28,000
                  emergency fund.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Compare the opportunity cost honestly
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Will you actually invest the $666/month difference, or will it
                  absorb into lifestyle spending? Many households who choose a 30-year for
                  "investment flexibility" never invest the difference. If you will not invest it, the 15-year
                  saves about $316,260 in guaranteed interest on a $350,000 loan. If you will invest
                  consistently, run the break-even at your expected return rate.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                5
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Consider the hybrid: 30-year with extra principal payments
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Take the 30-year at $2,423/month and add $400/month in extra
                  principal. You pay off the $350,000 loan in about 20 years instead
                  of 30, save about $208,400 in interest, and retain the flexibility
                  to skip extra payments during tight months. This is the
                  approach most financial planners recommend for buyers under age
                  45 in fall 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Sources
          items={[
            {
              label: "IRS IR-2025-111 (2026 IRA contribution limits, Nov. 13, 2025)",
              href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
            },
          ]}
          checked="October 2026"
          className="mt-12"
          note={`Roth IRA limit ${usd(RETIREMENT_LIMITS.ira)} in 2026 (also in tax-data.ts).`}
        />

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Run Your Own Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Every loan amount and rate combination produces a different answer.
            Use our free calculators to compare 15-year and 30-year scenarios
            on your exact home price and down payment.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/mortgage"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Mortgage Calculator
            </Link>
            <Link
              href="/calculators/loan-comparison"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Loan Comparison Calculator
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
        <RelatedGuides currentSlug="15-year-vs-30-year-mortgage" relatedSlugs={["how-much-house-can-i-afford", "pay-off-mortgage-early-vs-invest"]} />
      </article>
    </>
  );
}
