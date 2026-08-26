import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "How Much Car Can I Afford? The Complete 2026 Guide by Salary",
  description:
    "Find out how much car you can afford based on your salary using the 20/4/10 rule. Includes affordability tables by income, a real case study, and total cost of ownership breakdown.",
  keywords: [
    "how much car can I afford",
    "car affordability by salary",
    "20/4/10 rule car buying",
    "how much should I spend on a car",
    "car budget calculator",
    "auto loan affordability",
  ],
};

const faqs = [
  {
    question: "How much car can I afford on a $50,000 salary?",
    answer:
      "On a $50,000 salary, you can afford a car priced between $17,500 and $25,000 using the 20/4/10 rule. With a 20% down payment ($3,500-$5,000), a 48-month loan at 6.5% APR, and total monthly car costs (payment + insurance + gas) under $417 (10% of $4,167 gross monthly income), a $20,000-$22,000 vehicle is the sweet spot. This keeps your monthly payment around $290-$320, leaving room for $100-$130 in insurance and fuel. Going above $25,000 typically pushes total monthly costs past the 10% threshold, risking financial strain on other budget categories.",
  },
  {
    question: "What is the 20/4/10 rule for buying a car?",
    answer:
      "The 20/4/10 rule is a car-buying guideline that sets three boundaries: put at least 20% down, finance for no more than 4 years (48 months), and keep total monthly transportation costs (loan payment + insurance + gas + maintenance) under 10% of your gross monthly income. On a $70,000 salary ($5,833/month gross), that means total car costs should stay below $583/month. The rule prevents buyers from becoming 'car poor' — spending so much on a vehicle that savings, retirement contributions, and lifestyle spending suffer. It was popularized by financial advisors as a response to the trend toward 72-84 month auto loans that keep borrowers underwater on their vehicles for years.",
  },
  {
    question: "Is it better to buy new or used to maximize affordability?",
    answer:
      "Used cars (2-3 years old) typically offer the best value because new cars lose 20-30% of their value in the first two years. A 2024 Toyota Camry that stickered at $30,000 sells for $21,000-$23,000 in 2026 with 25,000-35,000 miles — saving $7,000-$9,000 while still having 60-75% of its factory warranty remaining. However, used car loan rates average 7.5-9.0% APR versus 5.5-6.8% for new cars in August 2026. On a $22,000 loan over 48 months, the 2% rate difference costs $940 in extra interest — far less than the $7,000+ depreciation savings. For most buyers on a budget, a certified pre-owned vehicle 2-3 years old with under 40,000 miles provides the best balance of price, reliability, and financing terms.",
  },
  {
    question:
      "How much should I put down on a car to get the best monthly payment?",
    answer:
      "Aim for 20% down to avoid being underwater on your loan and to qualify for the best interest rates. On a $28,000 car, 20% down is $5,600, leaving a $22,400 loan. At 6.5% APR over 48 months, that payment is $532/month. With only 10% down ($2,800), the $25,200 loan payment jumps to $598/month — $66 more per month and $3,168 in extra interest over the loan term. Putting 0% down on the same car means a $28,000 loan at a likely higher rate (7.0-7.5% APR with no equity), costing $670/month and $4,160 more in total interest. The 20% threshold also typically qualifies you for rates 0.5-1.0% lower because lenders see less risk when you have equity from day one.",
  },
  {
    question: "Should I buy or lease a car in 2026?",
    answer:
      "Buy if you drive over 12,000 miles per year, plan to keep the car 5+ years, or want to build equity. Lease if you want a new car every 3 years, drive under 10,000-12,000 miles annually, and prefer lower monthly payments. A $35,000 sedan leased for 36 months at $389/month costs $14,004 in payments plus a $3,500 down payment — $17,504 total with no asset at the end. Buying the same car with 20% down ($7,000) at 6.5% APR over 48 months costs $661/month ($31,728 total payments), but you own a car worth approximately $18,000-$20,000 at payoff. Over 6 years, two 3-year leases cost $35,008 and you own nothing; buying once costs $38,728 but you have a $12,000-$14,000 asset. For most people who keep cars 5+ years, buying is $10,000-$15,000 cheaper long-term.",
  },
];

export default function HowMuchCarCanIAffordGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="How Much Car Can I Afford? The Complete 2026 Guide by Salary"
        description="Find out how much car you can afford based on your salary using the 20/4/10 rule. Includes affordability tables by income, a real case study, and total cost of ownership breakdown."
        slug="how-much-car-can-i-afford"
        datePublished="2026-08-26"
        image="/images/guides/how-much-car-can-i-afford.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "How Much Car Can I Afford",
            href: "/guides/how-much-car-can-i-afford",
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
            / Auto Finance
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            How Much Car Can I Afford? The Complete 2026 Guide by Salary
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            The average new car transaction price hit $48,528 in Q2 2026, while
            the average auto loan payment climbed to $738/month over 68 months.
            Nearly 17% of new car buyers now commit more than 15% of their gross
            income to vehicle payments alone — a level that financial advisors
            call &quot;car poor.&quot; This guide uses the 20/4/10 rule and real
            2026 loan rates to show you exactly how much car you can afford at
            every income level, from $40,000 to $150,000, without wrecking your
            budget.
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
              <strong>The 20/4/10 rule:</strong> Put 20% down, finance for
              4 years max, keep total car costs (payment + insurance + gas)
              under 10% of gross monthly income
            </li>
            <li>
              <strong>$50K salary:</strong> Afford $17,500-$25,000 car
              ($290-$420/month total costs)
            </li>
            <li>
              <strong>$75K salary:</strong> Afford $26,000-$37,500 car
              ($435-$625/month total costs)
            </li>
            <li>
              <strong>$100K salary:</strong> Afford $35,000-$50,000 car
              ($580-$833/month total costs)
            </li>
            <li>
              <strong>Hidden costs add 30-40%:</strong> Insurance ($150-$220/month),
              gas ($120-$180/month), and maintenance ($75-$125/month) are on top
              of the loan payment
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/auto-loan"
              className="font-medium text-brand-600 underline"
            >
              Auto Loan Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/budget-50-30-20"
              className="font-medium text-brand-600 underline"
            >
              Budget Calculator
            </Link>{" "}
            to model your exact scenario.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/how-much-car-can-i-afford.webp"
              alt="Infographic showing the 20/4/10 car affordability rule: 20% down payment, 4-year max loan, 10% of gross income for total car costs, with salary-to-price ranges"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              The 20/4/10 rule: a simple framework for car affordability at every income level
            </figcaption>
          </figure>
        </section>

        {/* The 20/4/10 Rule */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The 20/4/10 Rule: How Much Car You Can Actually Afford
          </h2>
          <p className="mt-4 text-ink-700">
            Financial advisors developed the 20/4/10 rule as a guardrail against
            the auto industry&apos;s push toward longer loan terms and lower down
            payments. Dealerships will approve you for far more than you should
            spend — lenders routinely approve borrowers for payments consuming
            15-20% of gross income. The 20/4/10 rule draws the line at a
            sustainable level.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-brand-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-brand-700">
                20% Down Payment
              </h3>
              <p className="mt-3 text-ink-700">
                A 20% down payment immediately solves two problems: it reduces
                your loan balance (and therefore monthly payment and total
                interest), and it protects you from being &quot;underwater&quot; —
                owing more than the car is worth. New cars lose 10-15% of value
                the moment you drive off the lot and 20-30% within the first two
                years. On a $30,000 car, 20% down ($6,000) means you borrow
                $24,000. If the car is worth $25,500 after you leave the
                dealership (15% immediate depreciation), your loan balance is
                $24,000 — you still have equity. With 0% down, you owe $30,000
                on a car worth $25,500, and you are $4,500 underwater from day
                one.
              </p>
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-ink-800">
                4-Year (48-Month) Maximum Loan Term
              </h3>
              <p className="mt-3 text-ink-700">
                The average auto loan term has stretched to 68 months in 2026,
                with 72- and 84-month loans increasingly common. Longer terms
                lower monthly payments but dramatically increase total interest
                and keep you underwater longer. On a $24,000 loan at 6.5% APR:
                a 48-month term costs $569/month with $3,328 total interest; a
                72-month term costs $406/month but with $5,230 total interest —
                $1,902 more paid to the bank. Worse, at month 36 of a 72-month
                loan you still owe $12,840 on a car worth approximately $12,000,
                making it nearly impossible to trade in without rolling negative
                equity into your next loan.
              </p>
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-ink-800">
                10% of Gross Monthly Income for Total Car Costs
              </h3>
              <p className="mt-3 text-ink-700">
                This is the most commonly violated boundary and the most important.
                Total car costs include the monthly loan payment, insurance
                premium, fuel, and routine maintenance. On a $70,000 salary
                ($5,833/month gross), the 10% ceiling is $583/month. If your loan
                payment is $480/month, you have just $103 left for insurance, gas,
                and maintenance — meaning you probably cannot afford that payment.
                Insurance alone averages $175/month for full coverage in 2026.
                The 10% rule forces you to account for the real cost of
                ownership, not just the loan payment.
              </p>
            </div>
          </div>
        </section>

        {/* Affordability by Salary */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How Much Car Can I Afford by Salary? (2026 Rates)
          </h2>
          <p className="mt-4 text-ink-700">
            The following table applies the 20/4/10 rule at current August 2026
            auto loan rates (5.5-6.8% APR for new, 7.5-9.0% for used) to show
            maximum car price by annual salary. All numbers assume a 20% down
            payment, 48-month loan at 6.5% APR, and average insurance/fuel costs.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Annual Salary
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    10% Monthly Budget
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Max Loan Payment
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Max Car Price
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Down Payment (20%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">$40,000</td>
                  <td className="px-4 py-3">$333</td>
                  <td className="px-4 py-3">$133</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$7,000</td>
                  <td className="px-4 py-3">$1,400</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">$50,000</td>
                  <td className="px-4 py-3">$417</td>
                  <td className="px-4 py-3">$217</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$11,400</td>
                  <td className="px-4 py-3">$2,280</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">$60,000</td>
                  <td className="px-4 py-3">$500</td>
                  <td className="px-4 py-3">$300</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$15,800</td>
                  <td className="px-4 py-3">$3,160</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">$70,000</td>
                  <td className="px-4 py-3">$583</td>
                  <td className="px-4 py-3">$383</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$20,200</td>
                  <td className="px-4 py-3">$4,040</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">$80,000</td>
                  <td className="px-4 py-3">$667</td>
                  <td className="px-4 py-3">$467</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$24,600</td>
                  <td className="px-4 py-3">$4,920</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">$90,000</td>
                  <td className="px-4 py-3">$750</td>
                  <td className="px-4 py-3">$550</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$29,000</td>
                  <td className="px-4 py-3">$5,800</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">$100,000</td>
                  <td className="px-4 py-3">$833</td>
                  <td className="px-4 py-3">$633</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$33,400</td>
                  <td className="px-4 py-3">$6,680</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">$120,000</td>
                  <td className="px-4 py-3">$1,000</td>
                  <td className="px-4 py-3">$800</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$42,200</td>
                  <td className="px-4 py-3">$8,440</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">$150,000</td>
                  <td className="px-4 py-3">$1,250</td>
                  <td className="px-4 py-3">$1,050</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$55,400</td>
                  <td className="px-4 py-3">$11,080</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Max loan payment = 10% monthly budget minus $200 estimated
            insurance/gas/maintenance. Max car price = max loan amount (from
            48-month payment at 6.5% APR) / 0.80 to account for 20% down.
            Actual numbers vary by credit score, location, and vehicle type.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Important Caveat</p>
            <p className="mt-1 text-sm text-amber-700">
              At $40,000 income, the 20/4/10 rule limits you to roughly $7,000
              — a car you will likely buy with cash rather than finance. This is
              by design: the rule acknowledges that at lower income levels, a
              car payment competes directly with rent, groceries, and
              emergency savings. If you earn under $50,000, prioritize reliable
              used vehicles in the $5,000-$12,000 range and avoid financing
              more than 36 months.
            </p>
          </div>
        </section>

        {/* Total Cost of Ownership */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Total Cost of Ownership: The Numbers Dealerships Never Show You
          </h2>
          <p className="mt-4 text-ink-700">
            Your monthly payment is just 55-65% of what a car actually costs
            each month. The rest — insurance, fuel, depreciation, and
            maintenance — adds $350-$600/month depending on the vehicle. Here
            is a breakdown for three popular 2026 vehicles.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Monthly Cost
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Honda Civic ($28,500)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Toyota RAV4 ($35,000)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Ford F-150 ($48,000)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Loan payment (20% down, 48 mo., 6.5%)</td>
                  <td className="px-4 py-3">$541</td>
                  <td className="px-4 py-3">$665</td>
                  <td className="px-4 py-3">$912</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Insurance (full coverage)</td>
                  <td className="px-4 py-3">$155</td>
                  <td className="px-4 py-3">$185</td>
                  <td className="px-4 py-3">$220</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Fuel (12,000 mi/year)</td>
                  <td className="px-4 py-3">$120</td>
                  <td className="px-4 py-3">$140</td>
                  <td className="px-4 py-3">$195</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Maintenance &amp; repairs</td>
                  <td className="px-4 py-3">$75</td>
                  <td className="px-4 py-3">$90</td>
                  <td className="px-4 py-3">$125</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Depreciation (year 1-4 avg)</td>
                  <td className="px-4 py-3">$225</td>
                  <td className="px-4 py-3">$280</td>
                  <td className="px-4 py-3">$390</td>
                </tr>
                <tr className="border-t-2 border-ink-200 bg-brand-50/50">
                  <td className="px-4 py-3 font-semibold">Total monthly cost</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">$1,116</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">$1,360</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">$1,842</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Salary needed (10% rule)</td>
                  <td className="px-4 py-3 font-medium">$133,900</td>
                  <td className="px-4 py-3 font-medium">$163,200</td>
                  <td className="px-4 py-3 font-medium">$221,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">
                    Salary needed (payment + insurance + gas only)
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-700">$97,900</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$118,800</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$159,200</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Fuel cost assumes $3.50/gallon national average (August 2026). Insurance
            based on 30-year-old driver with clean record and 750+ credit score.
            Depreciation is the average annual value loss over the first 4 years
            of ownership.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">The Depreciation Tax</p>
            <p className="mt-1 text-sm text-ink-700">
              Depreciation is the largest cost of car ownership and the one most
              buyers ignore because it is invisible — there is no monthly bill.
              A $48,000 truck loses $4,680 in value during year one alone. Over
              four years of ownership, depreciation on new vehicles averages
              40-50% of the purchase price. Buying a 2-3 year old vehicle lets
              the first owner absorb that hit: a $48,000 F-150 purchased at
              $32,000 with 25,000 miles saves you approximately $16,000 in
              depreciation without significantly changing reliability or
              maintenance costs.
            </p>
          </div>
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Rachel, 31, Buying Her First Car on a $68,000 Salary
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Her Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Age: 31, UX designer in Portland, OR</li>
                  <li>Gross salary: $68,000/year ($5,667/month gross)</li>
                  <li>Take-home pay: $4,350/month after tax</li>
                  <li>Credit score: 720 (qualifies for 6.5% APR)</li>
                  <li>Savings available for down payment: $7,000</li>
                  <li>Current rent: $1,600/month</li>
                  <li>Existing debt: $280/month student loan payment</li>
                  <li>Needs: reliable commuter, 25-mile round trip, 5 days/week</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  Her 20/4/10 Budget
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>
                    <strong>10% monthly budget:</strong> $567/month
                    ($5,667 x 10%)
                  </li>
                  <li>
                    <strong>Insurance estimate:</strong> $165/month (full
                    coverage, Portland rates, clean record)
                  </li>
                  <li>
                    <strong>Fuel estimate:</strong> $95/month (25 mi/day x
                    22 days, 32 MPG, $3.80/gal Oregon avg)
                  </li>
                  <li>
                    <strong>Maintenance:</strong> $65/month average
                  </li>
                  <li>
                    <strong>Available for loan payment:</strong> $242/month
                    ($567 - $165 - $95 - $65)
                  </li>
                  <li>
                    <strong>Max loan at $242/mo, 48 months, 6.5%:</strong>{" "}
                    $10,200
                  </li>
                  <li>
                    <strong>Down payment:</strong> $5,100 (20% of car price)
                  </li>
                  <li>
                    <strong>Max car price:</strong> $12,750 ($10,200 / 0.80)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                What Rachel Actually Did
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                The strict 20/4/10 math pointed to a $12,750 max car price.
                But Rachel had $7,000 saved — more than the 20% minimum
                ($2,550) — so she could put a larger down payment to afford a
                slightly better vehicle. She allocated $6,000 as down payment
                (keeping $1,000 as a car repair emergency fund) and searched
                for certified pre-owned vehicles.
              </p>
              <p className="mt-3 text-sm text-ink-700">
                She found a 2024 Honda Civic EX with 22,000 miles, certified
                pre-owned, priced at $22,500. With $6,000 down (27% of
                price), her loan was $16,500 at 7.2% APR (used car rate for
                720 credit score). Over 48 months, her payment was $397/month.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                Rachel&apos;s Monthly Breakdown
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Loan payment</p>
                  <p className="font-semibold text-ink-800">$397</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Insurance</p>
                  <p className="font-semibold text-ink-800">$155</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Fuel</p>
                  <p className="font-semibold text-ink-800">$85</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-ink-500">Total monthly</p>
                  <p className="font-semibold text-brand-700">$637</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-700">
                Rachel&apos;s total monthly car costs came to $637 — 11.2%
                of her gross monthly income, slightly above the 10%
                guideline. She accepted this because: (1) her student loan
                payments end in 14 months, freeing $280/month; (2) the CPO
                Civic has a remaining 3-year/36,000-mile warranty, reducing
                maintenance risk; (3) the 27% down payment meant she had
                $6,000 in equity from day one, protecting against negative
                equity.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                The Alternative She Avoided
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                The dealership approved Rachel for a $35,000 new RAV4 with
                $2,000 down and 72-month financing at 6.9% APR. That monthly
                payment alone would have been $567/month — her entire 10%
                car budget before insurance and fuel. Total monthly costs
                would have been $807 (14.2% of gross income), and she would
                have been $4,200 underwater by month 12. The CPO Civic costs
                her $170/month less, builds equity faster, and she will own
                it free and clear in 4 years with 70,000 miles — well within
                a Civic&apos;s 200,000+ mile reliability window.
              </p>
            </div>
          </div>
        </section>

        {/* New vs Used Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            New vs Used: The Real Cost Difference in 2026
          </h2>
          <p className="mt-4 text-ink-700">
            New cars offer the latest features, full warranty, and better loan
            rates. Used cars cost less upfront and avoid the steepest
            depreciation. Here is the math on the same vehicle — a Toyota
            Camry — bought new versus 2 years old.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    2026 Camry (New)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    2024 Camry (Used, 28K mi)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Purchase price</td>
                  <td className="px-4 py-3">$30,500</td>
                  <td className="px-4 py-3">$22,800</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Down payment (20%)</td>
                  <td className="px-4 py-3">$6,100</td>
                  <td className="px-4 py-3">$4,560</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Loan amount</td>
                  <td className="px-4 py-3">$24,400</td>
                  <td className="px-4 py-3">$18,240</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Interest rate (48 months)</td>
                  <td className="px-4 py-3">6.2% APR</td>
                  <td className="px-4 py-3">7.8% APR</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Monthly payment</td>
                  <td className="px-4 py-3">$575</td>
                  <td className="px-4 py-3">$444</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Total interest paid</td>
                  <td className="px-4 py-3">$3,200</td>
                  <td className="px-4 py-3">$3,072</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total out-of-pocket (4 years)</td>
                  <td className="px-4 py-3">$33,700</td>
                  <td className="px-4 py-3">$25,872</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Value at year 4 (6 yrs old / 4 yrs old)</td>
                  <td className="px-4 py-3">$14,600</td>
                  <td className="px-4 py-3">$13,200</td>
                </tr>
                <tr className="border-t-2 border-ink-200 bg-brand-50/50">
                  <td className="px-4 py-3 font-semibold">
                    True cost of ownership (4 years)
                  </td>
                  <td className="px-4 py-3 font-semibold">$19,100</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">
                    $12,672
                  </td>
                </tr>
                <tr className="bg-brand-50/50">
                  <td className="px-4 py-3 font-medium">Savings (used vs new)</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">
                    $6,428
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *New car APR based on national average for 700+ credit score
            (August 2026). Used car APR typically 1.3-2.0% higher. Residual
            values from Kelley Blue Book projections. True cost = total
            payments + down payment - residual value.
          </p>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: How to Calculate Your Car Budget
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4 rounded-lg border border-ink-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Calculate your 10% monthly car budget
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Take your gross annual salary, divide by 12, multiply by 0.10.
                  Example: $72,000 / 12 = $6,000/month gross x 0.10 = $600/month
                  total car budget.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-ink-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Subtract estimated insurance, fuel, and maintenance
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Get an insurance quote online (Progressive, Geico, State Farm)
                  before shopping for cars. Budget $100-$180 for fuel depending
                  on commute and $65-$100 for maintenance. $600 - $170 insurance
                  - $130 fuel - $75 maintenance = $225 available for loan payment.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-ink-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Calculate your maximum loan amount
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Use the{" "}
                  <Link
                    href="/calculators/auto-loan"
                    className="font-medium text-brand-600 underline"
                  >
                    Auto Loan Calculator
                  </Link>{" "}
                  to find the loan amount that produces your target monthly payment
                  at current rates. At $225/month, 48 months, 6.5% APR, your max
                  loan is approximately $9,480.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-ink-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Add your down payment to find max purchase price
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Max car price = max loan / 0.80 (to build in the 20% down).
                  $9,480 / 0.80 = $11,850 max car price. Your 20% down payment
                  is $2,370, and you finance the remaining $9,480.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-ink-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                5
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Shop within your budget (not the dealer&apos;s approval)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Get pre-approved through your bank or credit union before
                  visiting dealerships. Pre-approval locks your rate, prevents
                  dealer markup on financing, and gives you a non-negotiable
                  price ceiling. When a salesperson says &quot;we can get you
                  approved for $35,000,&quot; you already know your real number
                  is $11,850.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Term Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            48 vs 60 vs 72 Months: How Loan Term Affects Total Cost
          </h2>
          <p className="mt-4 text-ink-700">
            Stretching a loan term lowers monthly payments but dramatically
            increases what you pay in total. Here is the same $24,000 loan at
            6.5% APR across three common terms.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    48 Months
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    60 Months
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    72 Months
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Monthly payment</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$569</td>
                  <td className="px-4 py-3">$470</td>
                  <td className="px-4 py-3">$406</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Total interest</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$3,328</td>
                  <td className="px-4 py-3">$4,183</td>
                  <td className="px-4 py-3">$5,230</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total paid</td>
                  <td className="px-4 py-3">$27,328</td>
                  <td className="px-4 py-3">$28,183</td>
                  <td className="px-4 py-3">$29,230</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Car value at payoff</td>
                  <td className="px-4 py-3">~$16,200</td>
                  <td className="px-4 py-3">~$13,400</td>
                  <td className="px-4 py-3">~$10,800</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Months underwater</td>
                  <td className="px-4 py-3 font-medium text-brand-700">0</td>
                  <td className="px-4 py-3">~14</td>
                  <td className="px-4 py-3">~30</td>
                </tr>
                <tr className="border-t-2 border-ink-200 bg-brand-50/50">
                  <td className="px-4 py-3 font-semibold">Extra cost vs 48 months</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">$0 (baseline)</td>
                  <td className="px-4 py-3 font-semibold">+$855</td>
                  <td className="px-4 py-3 font-semibold">+$1,902</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Loan amount: $24,000 at 6.5% APR. Car values assume 15% year-1
            depreciation, then 12% annually thereafter on a $30,000 new
            purchase. &quot;Underwater&quot; = loan balance exceeds car value.
          </p>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Calculate Your Car Budget
          </h2>
          <p className="mt-2 text-ink-600">
            Every situation is different. Use our free calculators to find the
            exact car price, monthly payment, and total cost that fits your
            salary, down payment, and loan terms.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/auto-loan"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Auto Loan Calculator
            </Link>
            <Link
              href="/calculators/budget-50-30-20"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              50/30/20 Budget Calculator
            </Link>
            <Link
              href="/calculators/savings-goal"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Savings Goal Calculator
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
        <RelatedGuides
          currentSlug="how-much-car-can-i-afford"
          relatedSlugs={["50-30-20-budget-rule", "save-50000-in-3-years", "how-much-house-can-i-afford"]}
        />
      </article>
    </>
  );
}
