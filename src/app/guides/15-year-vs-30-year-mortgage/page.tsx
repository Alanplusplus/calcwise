import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

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
      "On a $350,000 loan at fall 2026 rates, a 15-year mortgage at 6.20% costs $2,991 per month versus $2,224 for a 30-year at 6.55% — a difference of $768 per month. That extra $768 buys you a mortgage-free life 15 years sooner and saves $262,092 in total interest over the life of the loan.",
  },
  {
    question: "Is a 15-year mortgage always cheaper in the long run?",
    answer:
      "A 15-year mortgage always saves on total interest — on a $350,000 loan you pay $188,461 in interest versus $450,553 on a 30-year, a $262,092 difference. However, if you invest the $768 monthly payment difference at a 7% average return, your portfolio grows to $244,749 over 15 years. The 15-year still wins on guaranteed savings, but the gap narrows significantly when you factor in investment opportunity cost.",
  },
  {
    question: "What are typical 15-year and 30-year mortgage rates in fall 2026?",
    answer:
      "As of fall 2026, the national average 30-year fixed rate sits around 6.40% to 6.70%, while 15-year fixed rates average 6.00% to 6.35% — typically 0.25 to 0.50 percentage points lower. Rates have eased roughly 0.40 to 0.50 points since summer 2026 as the Fed signaled further rate cuts. Freddie Mac's Primary Mortgage Market Survey shows the 15-year rate has averaged 0.38 percentage points below the 30-year rate over the past decade.",
  },
  {
    question: "Can I switch from a 30-year to a 15-year mortgage later?",
    answer:
      "Yes, through refinancing. If rates drop further or your income rises, you can refinance a $350,000 remaining balance from a 30-year to a 15-year term. Refinancing costs typically run $3,000 to $6,000 in closing fees, so the break-even point is usually 18 to 36 months of interest savings. Alternatively, you can simulate a 15-year payoff by adding $768 per month in extra principal payments without refinancing.",
  },
  {
    question: "Who should choose a 15-year mortgage over a 30-year?",
    answer:
      "Choose a 15-year mortgage if your housing payment stays below 28% of gross income ($3,383/month on a $145,000 salary), you have at least 6 months of emergency savings ($25,000+), you are within 20 years of retirement, or you prioritize guaranteed interest savings over market returns. Skip the 15-year if the higher payment would push your total debt above 36% of income or leave you with less than $15,000 in liquid savings.",
  },
  {
    question: "How do falling mortgage rates in late 2026 affect the 15-year vs 30-year decision?",
    answer:
      "Lower rates benefit both terms, but they shrink the absolute dollar gap. At summer 2026 rates (6.75% / 7.0%), the 15-year saved roughly $280,000 in interest on a $350,000 loan. At fall 2026 rates (6.20% / 6.55%), that savings drops to about $262,000. The lower rates also reduce the monthly payment gap, making the 15-year more accessible to more buyers — the extra monthly cost dropped from $769 to $768. If rates continue falling, consider locking a 30-year now and refinancing to a 15-year later if rates drop below 5.5%.",
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
        dateModified="2026-09-30"
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
            $350,000 loan is not a rounding error — it is $768 per month and
            $262,092 in total interest over the life of the loan. This guide
            runs every number at fall 2026 rates so you can see exactly what
            each term costs, where the break-even point falls, and which option
            fits your budget.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: September 2026</p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>15-year at 6.20%:</strong> $2,991/month, $188,461 total
              interest, $538,461 total cost on a $350,000 loan
            </li>
            <li>
              <strong>30-year at 6.55%:</strong> $2,224/month, $450,553 total
              interest, $800,553 total cost on the same loan
            </li>
            <li>
              <strong>Monthly difference:</strong> $768 — enough to max a Roth
              IRA ($583/month) with $185 left over
            </li>
            <li>
              <strong>Break-even on interest savings:</strong> Guaranteed from
              day one — the 15-year saves $262,092 no matter what the market
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
              alt="Infographic comparing 15-year and 30-year mortgages on a $350,000 loan: $2,991 vs $2,224 monthly payments, $188,461 vs $450,553 in total interest, and $262,092 in lifetime savings with the shorter term"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Side-by-side comparison: a 15-year mortgage costs $768 more per month but saves $262,092 in total interest on a $350,000 loan
            </figcaption>
          </figure>
        </section>

        {/* Detailed Explanation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Real Numbers: $350,000 at Fall 2026 Rates
          </h2>
          <p className="mt-4 text-ink-700">
            The national median home price reached $412,300 in Q2 2026, according
            to the National Association of Realtors. A buyer putting 15% down
            on a median-priced home borrows roughly $350,000 — a round number
            that makes the math easy to follow. As of fall 2026, a 15-year
            fixed mortgage averages 6.20% while the 30-year fixed sits at 6.55%.
            Rates have eased roughly 0.40 to 0.50 points since summer 2026 as the
            Federal Reserve signaled further rate cuts. That 0.35-percentage-point gap
            between terms is typical: 15-year rates have averaged 0.38 points
            below 30-year rates over the past decade.
          </p>
          <p className="mt-4 text-ink-700">
            On that $350,000 principal, the 15-year payment comes to $2,991
            per month. Over 180 payments, you send the lender $538,461 and pay
            $188,461 in interest. The 30-year payment drops to $2,224 per
            month — $768 less — but over 360 payments you send $800,553 total
            and pay $450,553 in interest. That is $262,092 more in interest
            charges for the privilege of a lower monthly bill.
          </p>
          <p className="mt-4 text-ink-700">
            The trade-off is cash flow versus total cost. The 15-year borrower
            pays an extra $9,216 per year ($768 x 12) but owns the home outright
            in 2041 instead of 2056. After 15 years, the 15-year borrower has
            zero mortgage balance. The 30-year borrower still owes $254,476 and
            faces 180 more payments totaling $400,277. From year 16 onward, the
            15-year borrower has $2,991 per month freed up — while the 30-year
            borrower continues writing checks.
          </p>
          <p className="mt-4 text-ink-700">
            The opportunity cost matters. If you take the 30-year and invest the
            $768 monthly difference in a diversified index fund earning 7%
            annually, that investment grows to $244,749 over 15 years. You still
            owe $254,476 on the mortgage, so your net position is roughly
            $9,727 worse off than the 15-year borrower who owns the home free
            and clear. At a 10% return, the invested portfolio hits $320,837 —
            enough to pay off the remaining $254,476 balance with $66,361
            left over. The break-even investment return sits around 8.0%: above
            that, the 30-year plus investing wins; below it, the 15-year wins
            on total wealth.
          </p>
          <p className="mt-4 text-ink-700">
            Closing costs are nearly identical for both terms — typically
            $6,500 to $8,500 on a $350,000 loan (roughly 2% of the purchase
            price). Lenders do not charge a premium for the shorter term. The
            only difference is qualification: because the 15-year payment is
            $768 higher, you need roughly $2,743 more in monthly gross income to
            qualify under the 28% housing ratio ($768 / 0.28 = $2,743).
          </p>
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
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">15-Year (6.20%)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">30-Year (6.55%)</th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Monthly principal + interest</td>
                  <td className="px-4 py-3 font-medium">$2,991</td>
                  <td className="px-4 py-3">$2,224</td>
                  <td className="px-4 py-3 text-brand-700">+$768/mo (15yr)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Total payments over life of loan</td>
                  <td className="px-4 py-3">$538,461</td>
                  <td className="px-4 py-3">$800,553</td>
                  <td className="px-4 py-3">+$262,092 (30yr)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total interest paid</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$188,461</td>
                  <td className="px-4 py-3">$450,553</td>
                  <td className="px-4 py-3 text-brand-700">$262,092 saved (15yr)</td>
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
                  <td className="px-4 py-3">$254,476</td>
                  <td className="px-4 py-3">$254,476 remaining</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Amount paid in first 15 years</td>
                  <td className="px-4 py-3">$538,461</td>
                  <td className="px-4 py-3">$400,277</td>
                  <td className="px-4 py-3">+$138,184 (15yr)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Invest $768/mo at 7% for 15 years</td>
                  <td className="px-4 py-3">N/A</td>
                  <td className="px-4 py-3">$244,749</td>
                  <td className="px-4 py-3">Still $9,727 short of payoff</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Min. gross income (28% rule)</td>
                  <td className="px-4 py-3">$10,684/mo ($128,205/yr)</td>
                  <td className="px-4 py-3">$7,942/mo ($95,304/yr)</td>
                  <td className="px-4 py-3">+$32,901/yr (15yr)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Rates reflect fall 2026 national averages (15-year: 6.20%, 30-year: 6.55%). Property taxes, insurance, and PMI not included. Investment return assumes 7% annual average in a taxable brokerage account.
          </p>
        </section>

        {/* Break-Even Analysis */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Break-Even Analysis: When Does Each Option Win?
          </h2>
          <p className="mt-4 text-ink-700">
            The 15-year mortgage wins on guaranteed interest savings from month
            one — $262,092 over the full term, with no market risk attached. But
            the 30-year plus invest strategy closes the gap over time. In year 1,
            investing the $768 difference at 7% yields $9,512 while you only
            paid $9,216 extra on the 15-year — a $296 advantage to investing.
            By year 5, the investment portfolio reaches $54,957 versus
            $46,080 in cumulative extra 15-year payments, an $8,877 lead.
          </p>
          <p className="mt-4 text-ink-700">
            The crossover happens around year 14, when the invested balance exceeds
            the cumulative extra payments — but you still owe
            $254,476 on the mortgage at that point. True wealth parity requires
            either an 8.0%+ investment return over 15 years or reaching year 15
            with a 10% return ($320,837 invested vs. $254,476 owed, a $66,361 surplus). Below 7%
            returns, the 15-year mortgage builds more net wealth every single
            year because the guaranteed interest savings outpace mediocre market
            performance.
          </p>
          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Key Insight</p>
            <p className="mt-1 text-sm text-amber-700">
              The 15-year mortgage is a guaranteed 6.20% return on every extra
              dollar. To beat it by investing, you need consistent after-tax
              returns above 6.20% for 15 straight years — more achievable than
              when rates were 6.75% in summer 2026 (S&amp;P 500 averages 10%),
              but still not guaranteed. The 2000-2010
              decade returned just 1.2% annually. The lower rate environment makes
              the invest-the-difference strategy slightly more competitive than it
              was a few months ago.
            </p>
          </div>
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
              You have 6+ months of expenses saved ($25,000 minimum on a
              $3,097/month payment)
            </li>
            <li>
              You are 50 or older and want the mortgage paid off before a
              planned retirement at 65
            </li>
            <li>
              You value guaranteed returns over market volatility — $262,092 in
              interest savings with zero risk
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
              The $768/month difference would strain your budget or prevent
              retirement contributions (401(k) match, Roth IRA)
            </li>
            <li>
              You plan to invest the payment difference — $768/month at 7%
              grows to $244,749 in 15 years
            </li>
            <li>
              Your income is variable (commission, freelance, startup equity)
              and you need payment flexibility during lean months
            </li>
            <li>
              You may move within 10 years — total interest paid on a $350,000
              30-year loan sold after 7 years is roughly $168,000 vs. $154,000
              on a 15-year, a $14,000 gap that may not justify the higher payment
            </li>
            <li>
              You want to qualify for a larger home — the 30-year requires
              $32,901 less annual income to meet the 28% ratio
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
                  <li>15-year PITI: $3,371/month (27.9% of gross income)</li>
                  <li>30-year PITI: $2,638/month (21.8% of gross income)</li>
                  <li>15-year total interest: $180,061 over 180 payments</li>
                  <li>30-year total interest: $430,472 over 360 payments</li>
                  <li>Total debt ratio (30yr): 28.5% — well within 36% limit</li>
                  <li>Total debt ratio (15yr): 34.5% — within limit but tight</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">What They Chose: 30-Year with a Plan</h4>
              <p className="mt-2 text-sm text-ink-700">
                David and Sarah chose the 30-year at 6.55% ($2,125/month P&amp;I)
                even though the 15-year now technically fits within lender limits
                at 34.5% total DTI. Their reasoning: with $2,100/month average
                childcare costs starting in 2027, the 15-year&apos;s $3,371 PITI
                plus $800 in existing debts leaves just $1,012/month for everything
                else after childcare — too thin for comfort. Their monthly budget
                with the 30-year: $2,638 housing + $800 debts + $1,450 groceries
                and utilities + $800 retirement + $500 savings = $6,188 against
                $8,200 take-home pay, leaving $2,012 in flex money. They
                auto-deposit $400/month into a brokerage account
                (roughly half the $733 payment difference) and plan to refinance to a
                15-year when their student loans are paid off in 2029, freeing
                $380/month. At that point, their projected income of $158,000
                makes the 15-year PITI ($3,371) just 25.6% of gross — comfortably
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
                  the difference is $733/month ($2,858 vs. $2,125). On $350,000,
                  it is $768/month. Know your exact number before deciding — a
                  $50,000 difference in loan size shifts the monthly gap by
                  $115.
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
                  ($150-$280/month). David and Sarah&apos;s 15-year PITI of
                  $3,371 looked manageable on P&amp;I alone ($2,858) but
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
                  $72,500 ($6,042/month gross). A $3,371 housing payment would
                  consume 55.8% of one income — risky. The $2,638 30-year payment
                  consumes 43.7%, still tight but survivable with their $28,000
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
                  Will you actually invest the $768/month difference, or will it
                  absorb into lifestyle spending? Studies show 68% of people who
                  choose a 30-year for &quot;investment flexibility&quot; never
                  invest the difference. If you will not invest it, the 15-year
                  saves $262,092 in guaranteed interest. If you will invest
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
                  Take the 30-year at $2,224/month and add $400/month in extra
                  principal. You pay off the $350,000 loan in 20 years instead
                  of 30, save $172,795 in interest, and retain the flexibility
                  to skip extra payments during tight months. This is the
                  approach most financial planners recommend for buyers under age
                  45 in fall 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

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
