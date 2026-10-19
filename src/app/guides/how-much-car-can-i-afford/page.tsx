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
      "On a $50,000 salary, the strict 20/4/10 rule leaves very little room for a loan in October 2026. Ten percent of your $4,167 gross monthly income is $417. Full-coverage insurance averages roughly $200 a month (between Insurify's $187 and Bankrate's $225 national averages) and fuel for 12,000 miles at 32 mpg and $4.33 a gallon costs about $135, so only about $82 is left for a payment. At 7.0% APR over 48 months, $82 a month supports a $3,400 loan, or a car of about $4,260 with 20% down. In practice, a $50,000 earner is better off targeting a reliable used car in the $10,000-$15,000 range bought mostly with savings. Stretching to 15% of gross income ($625 a month) lifts the loan payment to about $290, a $12,100 loan, and a car of about $15,100 with 20% down, but that breaks the guideline and should be a deliberate choice.",
  },
  {
    question: "What is the 20/4/10 rule for buying a car?",
    answer:
      "The 20/4/10 rule is a car-buying guideline that sets three boundaries: put at least 20% down, finance for no more than 4 years (48 months), and keep monthly transportation costs (loan payment + insurance + fuel) under 10% of your gross monthly income. On a $70,000 salary ($5,833/month gross), that means those three items should stay below $583/month; after about $335 for insurance and fuel, roughly $248 is left for the loan payment. Maintenance is budgeted separately: AAA's 2026 Your Driving Costs study puts maintenance, repairs, and tires at 11.7 cents per mile, about $117 a month at 12,000 miles. The rule exists to stop buyers from becoming 'car poor' and to counter ever-longer loans. Edmunds reports that 25.5% of financed new-car purchases in Q3 2026 carried terms of 84 months or longer, and the average new-car loan ran 70.5 months.",
  },
  {
    question: "Is it better to buy new or used to maximize affordability?",
    answer:
      "Used usually wins on total cost, but higher used-car interest rates shrink the advantage. Edmunds' Q3 2026 data shows an average APR of 7.0% for new cars versus 10.6% for used, and Experian's Q2 2026 data for prime borrowers (661-780 scores) shows 6.15% for new versus 8.81% for used. On a $22,000 loan over 48 months, 8.81% costs $4,183 in interest versus $2,873 at 6.15%, which is $1,310 more. That penalty is small next to the sticker gap: in our example a $30,000 new car costs $33,134 out of pocket over 48 months at 20% down, while the same model two years old at $22,500 costs $25,923, a $7,211 saving. Shop used-car rates at a credit union before visiting a dealer, and compare certified pre-owned programs, which sometimes come with lower promotional rates.",
  },
  {
    question:
      "How much should I put down on a car to get the best monthly payment?",
    answer:
      "Aim for 20% down to protect yourself from owing more than the car is worth. On a $28,000 car, 20% down is $5,600, leaving a $22,400 loan. At 7.0% APR (the Edmunds Q3 2026 average for new cars) over 48 months, that payment is $536/month with $3,347 of total interest. With only 10% down ($2,800), the $25,200 loan costs $603/month and $3,765 in interest, which is $67 more per month and $418 more interest. Putting 0% down means a $28,000 loan at $670/month and $4,184 in interest, $134 more per month and $837 more interest than the 20% plan, and some lenders charge a higher rate when you have no equity. For context, Edmunds reports the average new-car down payment in Q3 2026 was $5,554, which works out to about 11% of the vehicle price ($5,554 divided by the $44,664 financed plus the down payment).",
  },
  {
    question: "Should I buy or lease a car in 2026?",
    answer:
      "Buy if you drive over 12,000 miles per year, plan to keep the car 5+ years, or want to build equity. Lease if you want a new car every 3 years, drive under 10,000-12,000 miles annually, and prefer lower monthly payments. Take an illustrative $35,000 sedan leased for 36 months at $389/month (an example quote, since lease terms vary widely) plus $3,500 down: $17,504 per lease with no asset at the end. Buying the same car with 20% down ($7,000) at 7.0% APR over 48 months costs $670/month ($32,184 in total payments). Using AAA's 2026 average depreciation rate (about 11.2% of purchase price per year, straight-line), the car is worth about $19,300 after 4 years and $11,500 after 6. Over 6 years, two leases cost $35,008 and leave you with nothing, while buying costs $39,184 in cash outlay but leaves an asset worth about $11,500, a net cost of about $27,700. In this example buying is roughly $7,300 cheaper over 6 years, but leasing is cheaper if you swap cars every 3 years and value the lower monthly payment.",
  },
  {
    question: "How much do high gas prices change my car budget?",
    answer:
      "Fuel is the most volatile line in a car budget. The U.S. Energy Information Administration reported regular gasoline at $4.331 per gallon for the week of October 12, 2026, up $1.27 from a year earlier ($3.061). For a driver covering 12,000 miles a year at 30 mpg, that is about $144 a month today versus $102 a year ago, an extra $42 a month. At 20 mpg, a full-size truck costs about $217 a month versus $153. Because fuel counts inside the 10% guideline, every extra $42 a month of fuel reduces your loan payment capacity by the same amount: at 7.0% over 48 months that is about $1,750 of loan, or roughly $2,200 less car price with 20% down. If your commute is long, favor a 35+ mpg car or hybrid before stretching the price.",
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
        dateModified="2026-10-19"
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
            The average new vehicle sold for $50,562 in September 2026, and
            Edmunds reports the average new-car loan in Q3 2026 was $44,664 at
            7.0% APR over 70.5 months, with a record $787 monthly payment.
            Another record 21.2% of new-car buyers now commit to payments of
            $1,000 or more. Meanwhile regular gasoline sits at $4.33 a gallon,
            $1.27 above last year. This guide uses the 20/4/10 rule and
            October 2026 loan, insurance, and fuel data to show how much car
            you can afford at every income level, from $40,000 to $150,000,
            without wrecking your budget.
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
              <strong>The 20/4/10 rule:</strong> Put 20% down, finance for
              4 years max, keep total car costs (payment + insurance + fuel)
              under 10% of gross monthly income
            </li>
            <li>
              <strong>$50K salary:</strong> Max car about $4,300 at 7.0% APR
              ($417/month budget, $82 left for the loan payment)
            </li>
            <li>
              <strong>$75K salary:</strong> Max car about $15,100
              ($625/month budget, $290 loan payment)
            </li>
            <li>
              <strong>$100K salary:</strong> Max car about $26,000
              ($833/month budget, $498 loan payment)
            </li>
            <li>
              <strong>Reality check:</strong> The $787 average new-car payment
              (Edmunds, Q3 2026) needs a $94,440 gross income to fit inside 10%
              before insurance or fuel
            </li>
            <li>
              <strong>Hidden costs add about $450/month:</strong> Insurance
              (about $200), fuel (about $135 at $4.33/gallon), and maintenance
              (about $117) sit on top of the loan payment
            </li>
          </ul>
          <p className="mt-3 text-xs text-ink-500">
            Sources:{" "}
            <a
              href="https://www.edmunds.com/press/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Edmunds Q3 2026 finance report (Oct 1, 2026)
            </a>
            ,{" "}
            <a
              href="https://www.eia.gov/petroleum/gasdiesel/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              EIA gasoline prices (week of Oct 12, 2026)
            </a>
            ,{" "}
            <a
              href="https://newsroom.aaa.com/wp-content/uploads/2026/09/AAA_YDC-Fact-Sheet_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              AAA Your Driving Costs 2026
            </a>
            .
          </p>
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
            payments. Dealerships and lenders will often approve you for far
            more than you should spend. The 20/4/10 rule draws the line at a
            sustainable level, and the October 2026 numbers show why it
            matters: the average new-car buyer finances $44,664 and, over
            70.5 months at 7.0% APR, pays $9,938 in interest (Edmunds, Q3 2026).
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
                owing more than the car is worth. NerdWallet notes that in a
                normal market cars lose around 20% to 30% of their value in the
                first year, and AAA&apos;s 2026 study puts average depreciation
                at $4,422 a year. On a $30,000 car, 20% down ($6,000) means you
                borrow $24,000. If the car is worth $25,500 after you leave the
                dealership (an illustrative 15% immediate drop), your loan
                balance is $24,000 — you still have $1,500 of equity. With 0%
                down, you owe $30,000 on a car worth $25,500, and you are
                $4,500 underwater from day one. Edmunds reports the average
                new-car down payment in Q3 2026 was $5,554, only about 11% of
                the price.
              </p>
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-ink-800">
                4-Year (48-Month) Maximum Loan Term
              </h3>
              <p className="mt-3 text-ink-700">
                The average new-car loan term reached 70.5 months in Q3 2026,
                and 25.5% of financed new-car purchases now run 84 months or
                longer (Edmunds). Longer terms lower monthly payments but
                increase total interest and keep you underwater longer. On a
                $24,000 loan at 7.0% APR: a 48-month term costs $575/month with
                $3,586 total interest; a 72-month term costs $409/month but
                with $5,461 total interest — $1,875 more paid to the bank. If
                you put $0 down on a $30,000 car, a 72-month loan leaves you
                underwater for about 15 months and an 84-month loan for about
                28 months (peak gap about $1,058), under the depreciation
                assumptions in the table below. That makes trading in early
                expensive without rolling negative equity into the next loan.
              </p>
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-ink-800">
                10% of Gross Monthly Income for Total Car Costs
              </h3>
              <p className="mt-3 text-ink-700">
                This is the most commonly violated boundary and the most important.
                Total car costs for this rule include the monthly loan payment,
                insurance premium, and fuel; set routine maintenance aside
                separately. On a $70,000 salary ($5,833/month gross), the 10%
                ceiling is $583/month. If your loan payment is $480/month, you
                have just $103 left for insurance and gas — meaning you cannot
                afford that payment, because full-coverage insurance averages
                $187/month (Insurify, Sept 2026) to $225/month (Bankrate) and
                fuel for 12,000 miles at 32 mpg costs about $135/month at
                today&apos;s $4.33 gallon. The 10% rule forces you to account for
                the real cost of ownership, not just the loan payment.
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
            The following table applies the 20/4/10 rule at October 2026 rates
            to show maximum car price by annual salary. For context, Edmunds
            reports a 7.0% average APR on new-car loans in Q3 2026 (10.6% for
            used), Experian reports 6.35% new and 11.19% used for Q2 2026, and
            the Federal Reserve&apos;s G.19 release shows commercial banks
            charging 7.54% on 60-month new-car loans in August 2026. All
            numbers below assume a 20% down payment, a 48-month loan at 7.0%
            APR, and $335 a month for insurance ($200) and fuel ($135).
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
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Cash only</td>
                  <td className="px-4 py-3">—</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">$50,000</td>
                  <td className="px-4 py-3">$417</td>
                  <td className="px-4 py-3">$82</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$4,300</td>
                  <td className="px-4 py-3">$850</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">$60,000</td>
                  <td className="px-4 py-3">$500</td>
                  <td className="px-4 py-3">$165</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$8,600</td>
                  <td className="px-4 py-3">$1,720</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">$70,000</td>
                  <td className="px-4 py-3">$583</td>
                  <td className="px-4 py-3">$248</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$13,000</td>
                  <td className="px-4 py-3">$2,590</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">$80,000</td>
                  <td className="px-4 py-3">$667</td>
                  <td className="px-4 py-3">$332</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$17,300</td>
                  <td className="px-4 py-3">$3,460</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">$90,000</td>
                  <td className="px-4 py-3">$750</td>
                  <td className="px-4 py-3">$415</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$21,700</td>
                  <td className="px-4 py-3">$4,330</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">$100,000</td>
                  <td className="px-4 py-3">$833</td>
                  <td className="px-4 py-3">$498</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$26,000</td>
                  <td className="px-4 py-3">$5,200</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">$120,000</td>
                  <td className="px-4 py-3">$1,000</td>
                  <td className="px-4 py-3">$665</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$34,700</td>
                  <td className="px-4 py-3">$6,940</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">$150,000</td>
                  <td className="px-4 py-3">$1,250</td>
                  <td className="px-4 py-3">$915</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$47,800</td>
                  <td className="px-4 py-3">$9,550</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Max loan payment = 10% monthly budget minus $335 for insurance
            ($200, between Insurify&apos;s $187 and Bankrate&apos;s $225 national
            full-coverage averages) and fuel ($135 = 12,000 miles at 32 mpg and
            EIA&apos;s $4.33/gallon for Oct 12, 2026). Max car price = max loan
            (48-month payment at 7.0% APR, the Edmunds Q3 2026 new-car average)
            / 0.80 to account for 20% down. Actual numbers vary by credit
            score, location, and vehicle type.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            Sources:{" "}
            <a
              href="https://www.edmunds.com/press/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Edmunds
            </a>
            ,{" "}
            <a
              href="https://fred.stlouisfed.org/series/RIFLPBCIANM60NM"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Federal Reserve G.19 via FRED (60-month new-car rate, Aug 2026)
            </a>
            ,{" "}
            <a
              href="https://www.experian.com/blogs/ask-experian/average-car-payment/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Experian Q2 2026
            </a>
            .
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Important Caveat</p>
            <p className="mt-1 text-sm text-amber-700">
              Below about $55,000 of income, the strict 20/4/10 rule leaves
              almost nothing for a loan payment once insurance and $4.33 gas
              are counted. At $40,000 the $333 budget is consumed by insurance
              and fuel alone. This is by design: at lower income levels a car
              payment competes directly with rent, groceries, and emergency
              savings. If you earn under $60,000, prioritize a reliable used
              vehicle in the $5,000-$12,000 range bought mostly with cash, and
              avoid financing more than 36 months. Note the contrast with the
              market: the $787 average new-car payment would need a $94,440
              gross income to fit within 10% before insurance or fuel.
            </p>
          </div>
        </section>

        {/* Total Cost of Ownership */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Total Cost of Ownership: The Numbers Dealerships Never Show You
          </h2>
          <p className="mt-4 text-ink-700">
            Your monthly payment is only 54-70% of the cash a car costs each
            month in the three examples below. Insurance, fuel, and maintenance
            add $448-$545 a month, and depreciation adds another $261-$631 that
            never shows up on a bill. The table uses the September 2026 Kelley
            Blue Book average transaction price for three of the best-selling
            segments.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Monthly Cost
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Compact car ($27,977)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Compact SUV ($37,614)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Full-size pickup ($67,573)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Down payment (20%)</td>
                  <td className="px-4 py-3">$5,595</td>
                  <td className="px-4 py-3">$7,523</td>
                  <td className="px-4 py-3">$13,515</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Loan payment (48 mo., 7.0%)</td>
                  <td className="px-4 py-3">$536</td>
                  <td className="px-4 py-3">$721</td>
                  <td className="px-4 py-3">$1,294</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Insurance (full coverage)</td>
                  <td className="px-4 py-3">$200</td>
                  <td className="px-4 py-3">$200</td>
                  <td className="px-4 py-3">$200</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Fuel (12,000 mi/year)</td>
                  <td className="px-4 py-3">$131 (33 mpg)</td>
                  <td className="px-4 py-3">$155 (28 mpg)</td>
                  <td className="px-4 py-3">$228 (19 mpg)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Maintenance &amp; repairs</td>
                  <td className="px-4 py-3">$117</td>
                  <td className="px-4 py-3">$117</td>
                  <td className="px-4 py-3">$117</td>
                </tr>
                <tr className="bg-ink-50/50 border-t-2 border-ink-200">
                  <td className="px-4 py-3 font-medium">Monthly cash cost</td>
                  <td className="px-4 py-3 font-medium">$984</td>
                  <td className="px-4 py-3 font-medium">$1,193</td>
                  <td className="px-4 py-3 font-medium">$1,839</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Depreciation (11.2% of price/year)</td>
                  <td className="px-4 py-3">$261</td>
                  <td className="px-4 py-3">$351</td>
                  <td className="px-4 py-3">$631</td>
                </tr>
                <tr className="border-t-2 border-ink-200 bg-brand-50/50">
                  <td className="px-4 py-3 font-semibold">Total monthly cost</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">$1,245</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">$1,544</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">$2,470</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">
                    Salary needed (payment + insurance + fuel within 10%)
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-700">$104,000</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$129,100</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$206,600</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Vehicle prices are the September 2026 Kelley Blue Book average
            transaction prices for the compact car, compact SUV, and full-size
            pickup segments. Fuel uses EIA&apos;s $4.331/gallon (week of Oct 12,
            2026) with assumed fuel economy shown. Insurance is $200, between
            the $187 Insurify and $225 Bankrate national full-coverage
            averages; trucks and SUVs often cost more. Maintenance uses AAA&apos;s
            11.7 cents per mile (about $117 at 12,000 miles). Depreciation
            applies AAA&apos;s 2026 average ($4,422 a year on a $39,376 average
            MSRP, or 11.2%) to each price.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            Sources:{" "}
            <a
              href="https://www.coxautoinc.com/insights/sept-2026-atp-report/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Kelley Blue Book / Cox Automotive (Oct 13, 2026)
            </a>
            ,{" "}
            <a
              href="https://newsroom.aaa.com/wp-content/uploads/2026/09/AAA_YDC-Fact-Sheet_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              AAA Your Driving Costs 2026
            </a>
            ,{" "}
            <a
              href="https://www.eia.gov/petroleum/gasdiesel/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              EIA
            </a>
            ,{" "}
            <a
              href="https://insurify.com/car-insurance/average-car-insurance-cost/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Insurify
            </a>
            .
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">The Depreciation Tax</p>
            <p className="mt-1 text-sm text-ink-700">
              Depreciation is the largest cost of car ownership and the one most
              buyers ignore because it is invisible — there is no monthly bill.
              AAA&apos;s 2026 study found new vehicles lose a weighted average of
              $4,422 a year, about $22,100 over five years and 75,000 miles,
              or roughly 56% of the $39,376 average MSRP. A buyer paying the
              $50,562 September 2026 average transaction price would lose about
              $5,660 a year at the same 11.2% rate. Buying a 2-3 year old
              vehicle lets the first owner absorb the steepest part of that
              loss, which is why the used-versus-new comparison below favors
              used on price even though used loan rates are higher.
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
                  <li>
                    Credit score: 720 (prime tier: Experian Q2 2026 average
                    6.15% new, 8.81% used)
                  </li>
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
                    <strong>Fuel estimate:</strong> $87/month (25 mi/day x
                    22 days, 32 MPG, $5.07/gal West Coast excluding California
                    average, EIA Oct 12, 2026)
                  </li>
                  <li>
                    <strong>Maintenance reserve:</strong> $65/month, kept
                    outside the 10%
                  </li>
                  <li>
                    <strong>Available for loan payment:</strong> $315/month
                    ($567 - $165 - $87)
                  </li>
                  <li>
                    <strong>Max loan at $315/mo, 48 months, 8.81% (used):</strong>{" "}
                    $12,700
                  </li>
                  <li>
                    <strong>Max car price:</strong> $15,880 ($12,700 / 0.80,
                    with a $3,180 down payment)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                What Rachel Actually Did
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                The strict 20/4/10 math pointed to a $15,880 max car price.
                But Rachel had $7,000 saved — far more than the 20% minimum
                ($3,180) — so she could put a larger down payment to afford a
                better vehicle. She allocated $6,000 as down payment (keeping
                $1,000 as a car repair emergency fund) and searched for
                certified pre-owned vehicles.
              </p>
              <p className="mt-3 text-sm text-ink-700">
                She found a 2024 Honda Civic EX with 22,000 miles, certified
                pre-owned, priced at $22,500. With $6,000 down (27% of
                price), her loan was $16,500 at 8.81% APR (the Experian Q2 2026
                prime-tier used-car average). Over 48 months, her payment was
                $409/month with $3,138 in total interest.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                Rachel&apos;s Monthly Breakdown
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Loan payment</p>
                  <p className="font-semibold text-ink-800">$409</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Insurance</p>
                  <p className="font-semibold text-ink-800">$165</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Fuel</p>
                  <p className="font-semibold text-ink-800">$87</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-ink-500">Total monthly</p>
                  <p className="font-semibold text-brand-700">$661</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-700">
                Rachel&apos;s total monthly car costs came to $661 — 11.7%
                of her gross monthly income, above the 10% guideline by $94 a
                month. She accepted this because: (1) her student loan
                payments end in 14 months, freeing $280/month; (2) the
                certified pre-owned Civic carries remaining manufacturer
                coverage, reducing near-term repair risk; (3) the 27% down
                payment meant she had equity from day one, protecting against
                negative equity.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                The Alternative She Avoided
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                The dealership approved Rachel for a new compact SUV at
                $37,614 (the September 2026 segment average) with $2,000 down
                and 72-month financing at 6.15% APR. That loan of $35,614
                would have cost $593/month — more than her entire $567 10%
                car budget before insurance and fuel. Total monthly costs
                would have been $845 (14.9% of gross income). After 12
                payments she would still owe about $30,550. If the SUV lost
                20% of its value in year one it would be worth $30,091, putting
                her about $460 underwater; at a 30% loss (the top of
                NerdWallet&apos;s normal-market range) she would be about
                $4,220 underwater. The CPO Civic costs her $184/month less,
                builds equity faster, and she will own it free and clear in
                4 years with roughly 48,000 miles on the odometer (22,000 today
                plus about 26,400 from her 25-mile commute).
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
            depreciation. The financing gap is real, though: Edmunds reports
            Q3 2026 averages of 7.0% APR and a $787 payment for new cars
            versus 10.6% APR and a $582 payment for used cars. Here is the math
            on the same model bought new versus 2 years old, using Experian&apos;s
            Q2 2026 prime-tier averages (661-780 credit scores) of 6.15% for
            new and 8.81% for used.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    New midsize car
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Same model, 2 years old
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Purchase price</td>
                  <td className="px-4 py-3">$30,000</td>
                  <td className="px-4 py-3">$22,500</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Down payment (20%)</td>
                  <td className="px-4 py-3">$6,000</td>
                  <td className="px-4 py-3">$4,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Loan amount</td>
                  <td className="px-4 py-3">$24,000</td>
                  <td className="px-4 py-3">$18,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Interest rate (48 months)</td>
                  <td className="px-4 py-3">6.15% APR</td>
                  <td className="px-4 py-3">8.81% APR</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Monthly payment</td>
                  <td className="px-4 py-3">$565</td>
                  <td className="px-4 py-3">$446</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Total interest paid</td>
                  <td className="px-4 py-3">$3,134</td>
                  <td className="px-4 py-3">$3,423</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total out-of-pocket (4 years)</td>
                  <td className="px-4 py-3">$33,134</td>
                  <td className="px-4 py-3">$25,923</td>
                </tr>
                <tr className="border-t-2 border-ink-200 bg-brand-50/50">
                  <td className="px-4 py-3 font-semibold">
                    Out-of-pocket savings (used vs new)
                  </td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">
                    $7,211
                  </td>
                </tr>
                <tr className="bg-brand-50/50">
                  <td className="px-4 py-3 font-medium">Extra interest on used</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">
                    $289
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *APRs are Experian&apos;s Q2 2026 averages for prime (661-780) borrowers.
            The $22,500 used price is an illustrative 25% discount to the new
            price; check Kelley Blue Book or Edmunds for the model you want.
            Total out-of-pocket = down payment + 48 monthly payments, before
            resale value. The $7,211 gap equals the $7,500 price difference
            minus the $289 of extra interest paid on the used-car loan.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            Sources:{" "}
            <a
              href="https://www.experian.com/blogs/ask-experian/average-car-payment/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Experian Q2 2026
            </a>
            ,{" "}
            <a
              href="https://www.edmunds.com/press/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Edmunds Q3 2026
            </a>
            .
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
                  Subtract estimated insurance and fuel
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Get an insurance quote online (Progressive, Geico, State Farm)
                  before shopping for cars; national full-coverage averages run
                  $187-$225 a month. Fuel for 12,000 miles at 32 mpg and
                  $4.33/gallon is about $135 a month ($108 at 40 mpg, $217 at
                  20 mpg). $600 - $200 insurance - $135 fuel = $265 available
                  for the loan payment. Set aside about $117 a month for
                  maintenance separately (AAA&apos;s 11.7 cents per mile).
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
                  at current rates. At $265/month, 48 months, 7.0% APR, your max
                  loan is approximately $11,070.
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
                  $11,070 / 0.80 = $13,840 max car price. Your 20% down payment
                  is $2,770, and you finance the remaining $11,070.
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
                  approved for $45,000,&quot; you already know your real number
                  is $13,840.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Term Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            48 vs 60 vs 72 vs 84 Months: How Loan Term Affects Total Cost
          </h2>
          <p className="mt-4 text-ink-700">
            Stretching a loan term lowers monthly payments but increases what
            you pay in total. With 25.5% of new-car buyers now choosing 84
            months or longer (Edmunds, Q3 2026), here is the same $24,000 loan
            at 7.0% APR across four common terms.
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
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    84 Months
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Monthly payment</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$575</td>
                  <td className="px-4 py-3">$475</td>
                  <td className="px-4 py-3">$409</td>
                  <td className="px-4 py-3">$362</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Total interest</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$3,586</td>
                  <td className="px-4 py-3">$4,514</td>
                  <td className="px-4 py-3">$5,461</td>
                  <td className="px-4 py-3">$6,427</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total paid</td>
                  <td className="px-4 py-3">$27,586</td>
                  <td className="px-4 py-3">$28,514</td>
                  <td className="px-4 py-3">$29,461</td>
                  <td className="px-4 py-3">$30,427</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Car value at payoff</td>
                  <td className="px-4 py-3">~$17,400</td>
                  <td className="px-4 py-3">~$15,300</td>
                  <td className="px-4 py-3">~$13,500</td>
                  <td className="px-4 py-3">~$11,800</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Equity at month 36 (20% down)</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$13,105</td>
                  <td className="px-4 py-3">$9,133</td>
                  <td className="px-4 py-3">$6,495</td>
                  <td className="px-4 py-3">$4,621</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Months underwater with $0 down</td>
                  <td className="px-4 py-3 font-medium text-brand-700">0</td>
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3">~15</td>
                  <td className="px-4 py-3">~28</td>
                </tr>
                <tr className="border-t-2 border-ink-200 bg-brand-50/50">
                  <td className="px-4 py-3 font-semibold">Extra cost vs 48 months</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">$0 (baseline)</td>
                  <td className="px-4 py-3 font-semibold">+$928</td>
                  <td className="px-4 py-3 font-semibold">+$1,875</td>
                  <td className="px-4 py-3 font-semibold">+$2,841</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Loan amount: $24,000 at 7.0% APR (the Edmunds Q3 2026 new-car
            average) on a $30,000 purchase with 20% down. Car values are an
            illustrative model: 15% depreciation in year 1, then 12% per year
            thereafter. &quot;Months underwater&quot; applies the same model to a
            $30,000 loan ($0 down) at each term; underwater means the loan
            balance exceeds the car&apos;s value.
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
              href="/calculators/car-affordability"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Car Affordability Calculator
            </Link>
            <Link
              href="/calculators/lease-vs-buy-car"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Lease vs Buy Calculator
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
