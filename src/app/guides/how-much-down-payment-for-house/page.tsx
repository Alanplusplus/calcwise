import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";

export const metadata: Metadata = {
  title: "How Much Down Payment Do You Need for a House in 2026?",
  description:
    "Find out how much down payment you need for a house in 2026. Compare conventional, FHA, VA, and USDA loan minimums with real dollar amounts, PMI costs, and savings strategies.",
  keywords: [
    "how much down payment for a house",
    "down payment for house",
    "minimum down payment",
    "down payment percentage",
    "house down payment 2026",
    "PMI cost",
  ],
};

const faqs = [
  {
    question: "What is the minimum down payment for a house?",
    answer:
      "The minimum depends on your loan type. Conventional loans allow as little as 3% down for first-time buyers and 5% for repeat buyers. FHA loans require 3.5% with a credit score of 580 or higher (10% below 580). VA and USDA loans offer 0% down payment options for eligible borrowers. On a $400,000 home, that means you could put down as little as $12,000 (conventional 3%), $14,000 (FHA 3.5%), or $0 (VA/USDA).",
  },
  {
    question: "Is 20% down still necessary in 2026?",
    answer:
      "No. The 20% down payment is not a requirement -- it is a threshold that eliminates private mortgage insurance (PMI). NAR's 2025 Profile of Home Buyers and Sellers (Tier-2 survey) found a median 10% down payment among first-time buyers (July 2024–June 2025 transactions), and many programs allow 3-5%. Putting down 20% saves you $100-$300 per month in PMI on a typical mortgage, but waiting years to save the full 20% means missing out on home price appreciation and paying rent instead of building equity. Run the numbers for your specific situation before assuming 20% is the right target.",
  },
  {
    question: "How much is PMI if I put down less than 20%?",
    answer:
      "PMI typically costs 0.3% to 1.5% of the original loan amount per year, depending on your credit score, down payment percentage, and loan type. On a $380,000 loan (5% down on a $400,000 home), PMI ranges from $95 to $475 per month. Most borrowers with good credit pay 0.4-0.8%, which works out to $127-$253 per month. PMI automatically cancels when your loan balance reaches 78% of the original home value.",
  },
  {
    question: "Can I use gift money for a down payment?",
    answer:
      "Yes, most loan programs accept gift funds for down payments. Conventional loans require a gift letter stating the money is not a loan. FHA loans allow 100% of the down payment to come from a gift from a family member, employer, or approved nonprofit. VA and USDA loans also accept gift funds. The key requirement is documentation: the gift donor must provide a signed letter, and lenders will verify the transfer with bank statements.",
  },
  {
    question: "What are down payment assistance programs?",
    answer:
      "Down payment assistance (DPA) programs are government or nonprofit programs that provide grants, forgivable loans, or low-interest second mortgages to help buyers cover the down payment. Over 2,500 DPA programs exist across the U.S. in 2026. Most target first-time buyers earning below 80-120% of area median income. Common programs include state housing finance agency grants ($5,000-$25,000), employer-assisted housing programs, and community land trust partnerships. Check your state HFA website for current offerings.",
  },
];

export default function HowMuchDownPaymentForHouse() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="How Much Down Payment Do You Need for a House in 2026?"
        description="Find out how much down payment you need for a house in 2026. Compare conventional, FHA, VA, and USDA loan minimums with real dollar amounts, PMI costs, and savings strategies."
        slug="how-much-down-payment-for-house"
        datePublished="2026-09-08"
        dateModified="2026-10-20"
        image="/images/guides/how-much-down-payment-for-house.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "How Much Down Payment for a House",
            href: "/guides/how-much-down-payment-for-house",
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Loans & Mortgages
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            How Much Down Payment Do You Need for a House in 2026?
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            The 20% down payment is one of the most persistent myths in home
            buying. In reality, NAR reported a median 10% down payment among
            first-time buyers in its 2025 profile (survey period July 2024–June
            2025), and multiple loan programs allow as little as 0-3.5%. The right
            down payment amount depends on your loan type, credit score,
            monthly budget, and how much you want to pay in mortgage insurance.
            This guide breaks down every option with real dollar amounts on a
            $400,000 home so you can decide exactly how much to save.
          </p>
          <p className="mt-2 text-sm text-ink-500">
            Last updated: October 2026
          </p>
        </header>

        {/* TL;DR Box */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Conventional loans:</strong> 3% minimum for first-time
              buyers ($12,000 on a $400,000 home), 5% for repeat buyers
              ($20,000)
            </li>
            <li>
              <strong>FHA loans:</strong> 3.5% with 580+ credit score ($14,000
              on $400,000)
            </li>
            <li>
              <strong>VA and USDA loans:</strong> 0% down for eligible borrowers
            </li>
            <li>
              <strong>20% eliminates PMI:</strong> $80,000 on a $400,000 home,
              saving $150-$250/month in mortgage insurance
            </li>
            <li>
              <strong>Sweet spot for most buyers:</strong> 10-15% down balances
              lower PMI costs with faster homeownership
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Calculate your exact numbers with our{" "}
            <Link
              href="/calculators/down-payment"
              className="font-medium text-brand-600 underline"
            >
              Down Payment Calculator
            </Link>
            .
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/how-much-down-payment-for-house.webp"
              alt="Infographic comparing down payment requirements by loan type: Conventional 3-20%, FHA 3.5%, VA 0%, USDA 0%, with dollar amounts on a $400,000 home and PMI cost indicators"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Down payment requirements vary widely by loan type -- most buyers
              do not need 20% to purchase a home
            </figcaption>
          </figure>
        </section>

        {/* Detailed Explanation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Down Payment Requirements by Loan Type in 2026
          </h2>
          <p className="mt-4 text-ink-700">
            How much down payment you need for a house depends almost entirely
            on the type of mortgage you choose. Each loan program has different
            minimums, different mortgage insurance rules, and different
            trade-offs between upfront costs and monthly payments. Here is how
            the four major loan types compare on a $400,000 home purchase.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Conventional Loans: 3-20% Down
          </h3>
          <p className="mt-3 text-ink-700">
            Conventional loans backed by Fannie Mae and Freddie Mac offer the
            widest range of down payment options. First-time buyers qualify for
            programs like HomeReady and Home Possible with just 3% down --
            $12,000 on a $400,000 home. Repeat buyers typically need 5%
            ($20,000). The trade-off is private mortgage insurance (PMI), which
            adds $95-$300 per month depending on your credit score and loan
            amount. PMI automatically drops off when your loan balance reaches
            78% of the original home value, or you can request removal at 80%.
            Putting down 20% ($80,000) eliminates PMI entirely, which is why
            this number persists as a benchmark -- but it is a guideline, not a
            rule.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            FHA Loans: 3.5% Down
          </h3>
          <p className="mt-3 text-ink-700">
            Federal Housing Administration loans require 3.5% down ($14,000 on
            $400,000) with a credit score of 580 or higher. Borrowers with
            scores between 500-579 must put down 10%. FHA loans are popular
            with first-time buyers because of the lower credit score
            requirements, but they come with a significant drawback: mortgage
            insurance premiums (MIP) include both an upfront fee of 1.75% of
            the loan amount ($6,755 on $385,000, typically rolled into the
            loan) and an annual premium of 0.55% ($2,118/year or $176/month).
            Unlike conventional PMI, FHA mortgage insurance does not
            automatically cancel -- on loans with less than 10% down, MIP
            stays for the life of the loan. You must refinance into a
            conventional loan to remove it.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            VA Loans: 0% Down
          </h3>
          <p className="mt-3 text-ink-700">
            Veterans Affairs loans are available to active military, veterans,
            and eligible surviving spouses. The standout feature is 0% down
            payment with no private mortgage insurance -- ever. There is a
            one-time VA funding fee of 1.25-3.3% of the loan amount (waived
            for veterans with service-connected disabilities), but this can be
            rolled into the loan. On a $400,000 home, a first-time VA buyer
            with no down payment pays a 2.15% funding fee of $8,600. VA loans
            also tend to offer lower interest rates than conventional
            mortgages, typically 0.25-0.50% below market rates.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            USDA Loans: 0% Down
          </h3>
          <p className="mt-3 text-ink-700">
            The U.S. Department of Agriculture offers 0% down payment loans for
            properties in eligible rural and suburban areas (which cover
            roughly 97% of U.S. land area and about 30% of the population).
            Income limits apply -- generally 115% of the area median income.
            USDA loans charge a 1% upfront guarantee fee ($4,000 on $400,000)
            and an annual fee of 0.35% ($1,400/year or $117/month). Both costs
            are lower than FHA mortgage insurance. The catch is the geographic
            restriction: check the{" "}
            <Link
              href="/calculators/home-affordability"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Home Affordability Calculator
            </Link>{" "}
            to see what you can afford in USDA-eligible areas.
          </p>
          <Sources
            items={[
              {
                label: "Fannie Mae HomeReady Mortgage (3% minimum down)",
                href: "https://singlefamily.fanniemae.com/originating-underwriting/mortgage-products/homeready-mortgage",
              },
              {
                label: "HUD Mortgagee Letter 2023-05 (FHA UFMIP and annual MIP)",
                href: "https://www.hud.gov/sites/dfiles/OCHCO/documents/2023-05hsgml.pdf",
              },
              {
                label: "FDIC 203(b) Mortgage Insurance Program summary (FHA 3.5% down, 580+ score)",
                href: "https://www.fdic.gov/resources/bankers/affordable-mortgage-lending-center/guide/part-1-docs/203b-mortgage-insurance-program.pdf",
              },
              {
                label: "VA.gov funding fee rate charts (effective April 7, 2023)",
                href: "https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/",
              },
              {
                label: "USDA RD FY 2026 conditional commitment notice (1% upfront, 0.35% annual fee)",
                href: "https://content.govdelivery.com/accounts/USDARD/bulletins/3f192a6",
              },
            ]}
            checked="October 2026"
          />
        </section>

        {/* Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Down Payment Comparison: $400,000 Home
          </h2>
          <p className="mt-4 text-ink-700">
            The table below shows exactly what each down payment percentage
            means in real dollars, including the monthly cost of mortgage
            insurance at each level:
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">
                    Down Payment %
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Cash Needed
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Loan Amount
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Monthly P&I
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Est. PMI/Month
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Total Monthly
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">3% (Conventional)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$12,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$388,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,686</td>
                  <td className="px-4 py-2 text-right text-ink-700">$178</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,864</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">3.5% (FHA)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$14,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$386,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,719</td>
                  <td className="px-4 py-2 text-right text-ink-700">$177</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,896</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">5%</td>
                  <td className="px-4 py-2 text-right text-ink-700">$20,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$380,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,631</td>
                  <td className="px-4 py-2 text-right text-ink-700">$174</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,805</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">10%</td>
                  <td className="px-4 py-2 text-right text-ink-700">$40,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$360,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,493</td>
                  <td className="px-4 py-2 text-right text-ink-700">$150</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,643</td>
                </tr>
                <tr className="border-b border-ink-100 bg-brand-50">
                  <td className="px-4 py-2 font-medium text-ink-700">20%</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">$80,000</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">$320,000</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">$2,216</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">$0</td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">$2,216</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-ink-500">
            Assumes 7.40% interest rate (Freddie Mac PMMS average as of Oct. 15,
            2026), 30-year fixed mortgage. Conventional PMI estimates use ~0.55%
            of loan balance annually; FHA annual MIP is 0.55% on this 96.5% LTV
            example. Does not include property taxes or homeowners insurance. Use our{" "}
            <Link
              href="/calculators/mortgage"
              className="font-medium text-brand-600 hover:text-brand-800"
            >
              Mortgage Calculator
            </Link>{" "}
            for a complete monthly payment estimate.
          </p>
          <p className="mt-4 text-ink-700">
            The difference between 3% and 20% down is $648 per month in total
            P&I plus mortgage insurance — but also $68,000 in upfront cash. For many buyers,
            that $68,000 difference represents years of additional saving
            during which home prices may rise 3-5% annually, rent continues to
            increase, and the opportunity to build equity is deferred.
          </p>
          <Sources
            items={[
              {
                label: "Freddie Mac Primary Mortgage Market Survey (week of Oct. 15, 2026)",
                href: "https://www.freddiemac.com/pmms",
              },
              {
                label: "HUD Mortgagee Letter 2023-05 (FHA annual MIP tables)",
                href: "https://www.hud.gov/sites/dfiles/OCHCO/documents/2023-05hsgml.pdf",
              },
            ]}
            checked="October 2026"
          />
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Priya and David Choose Their Down Payment Strategy
          </h2>
          <p className="mt-4 text-ink-700">
            Priya (30) and David (32) are a dual-income couple in Raleigh, NC,
            with a combined household income of $115,000. Priya is a data
            analyst earning $62,000 and David is a high school teacher earning
            $53,000. They have $45,000 in savings, no student debt, and $350 in
            monthly car payments. They are targeting homes in the $380,000-
            $420,000 range.
          </p>
          <p className="mt-4 text-ink-700">
            Their dilemma: put down 10% ($40,000) and keep $5,000 as an
            emergency cushion, or continue saving for another 18 months to
            reach 20% ($80,000). They ran both scenarios through the{" "}
            <Link
              href="/calculators/down-payment"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Down Payment Calculator
            </Link>
            :
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">
                    Scenario
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Buy Now (10% Down)
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Wait 18 Months (20% Down)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Home Price</td>
                  <td className="px-4 py-2 text-right text-ink-700">$400,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$418,000*</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Down Payment</td>
                  <td className="px-4 py-2 text-right text-ink-700">$40,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$83,600</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Loan Amount</td>
                  <td className="px-4 py-2 text-right text-ink-700">$360,000</td>
                  <td className="px-4 py-2 text-right text-ink-700">$334,400</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Monthly P&I</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,493</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,315</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">PMI/Month</td>
                  <td className="px-4 py-2 text-right text-ink-700">$150</td>
                  <td className="px-4 py-2 text-right text-ink-700">$0</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Total Monthly</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,643</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,315</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">Rent Paid While Waiting</td>
                  <td className="px-4 py-2 text-right text-ink-700">$0</td>
                  <td className="px-4 py-2 text-right text-ink-700">$27,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-ink-500">
            *Assumes 3% annual home price appreciation over 18 months. Rent
            estimated at $1,500/month.
          </p>
          <p className="mt-4 text-ink-700">
            Priya and David chose to buy now with 10% down. Their reasoning:
            they would spend $27,000 in rent during the 18-month wait, the home
            would likely cost $18,000 more, and they would need $43,600 more in
            cash. The PMI of $150/month on their conventional loan would
            automatically cancel in about 5 years as they build equity through
            payments and appreciation. The total PMI cost over those 5 years is
            approximately $9,000 -- far less than the $27,000 in rent plus
            $18,000 in higher home prices they would have faced by waiting.
          </p>
        </section>

        {/* Step-by-Step Savings Guide */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: How to Save for Your Down Payment Faster
          </h2>
          <ol className="mt-4 space-y-4 text-ink-700 list-decimal list-inside">
            <li>
              <strong>Set your target amount.</strong> Use our{" "}
              <Link
                href="/calculators/down-payment"
                className="text-brand-600 hover:text-brand-800 font-medium"
              >
                Down Payment Calculator
              </Link>{" "}
              to compare different percentages. For most first-time buyers, 5-10%
              is the practical target. On a $400,000 home, that is $20,000-
              $40,000. Add $5,000-$10,000 for closing costs (typically 2-5% of
              the loan amount).
            </li>
            <li>
              <strong>Open a dedicated high-yield savings account.</strong> The
              FDIC national average savings rate was 0.38% in October 2026, but
              competitive online accounts often pay closer to the FDIC national
              rate cap (4.63% for non-maturity deposits as of Oct. 19, 2026). A
              separate account prevents you from dipping into down payment funds.
              On $20,000, a 4.5% APY account earns about $900 per year in interest.
            </li>
            <li>
              <strong>Automate monthly transfers.</strong> Calculate your
              monthly savings target: divide the remaining amount by your
              timeline in months. If you need $30,000 in 24 months, that is
              $1,250/month. Set up automatic transfers on payday to remove the
              decision from the equation.
            </li>
            <li>
              <strong>Explore down payment assistance.</strong> Over 2,500 DPA
              programs exist nationally. Many first-time buyers earning under
              $80,000-$100,000 qualify for $5,000-$25,000 in grants or
              forgivable loans. Your state housing finance agency website lists
              current programs.
            </li>
            <li>
              <strong>Consider your full financial picture.</strong> Do not
              drain your entire savings for the down payment. Keep at least 3
              months of expenses ($6,000-$12,000) in an emergency fund
              separate from your down payment. Factor in $3,000-$10,000 for
              moving costs, immediate repairs, and furnishing.
            </li>
            <li>
              <strong>Run the rent-vs-buy math.</strong> Use our{" "}
              <Link
                href="/calculators/home-affordability"
                className="text-brand-600 hover:text-brand-800 font-medium"
              >
                Home Affordability Calculator
              </Link>{" "}
              to determine the maximum home price you can afford today. If
              buying now with a smaller down payment costs less than renting
              plus saving for a larger down payment, the math favors buying
              sooner.
            </li>
          </ol>
          <Sources
            items={[
              {
                label: "NAR 2025 Profile of Home Buyers and Sellers highlights (Nov. 4, 2025)",
                href: "https://www.nar.realtor/press-releases/first-time-home-buyer-share-falls-to-historic-low-of-21-median-age-rises-to-40",
              },
              {
                label: "FDIC National Rates and Rate Caps — October 2026",
                href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
              },
              {
                label: "Freddie Mac Primary Mortgage Market Survey (week of Oct. 15, 2026)",
                href: "https://www.freddiemac.com/pmms",
              },
              {
                label: "Consumer Financial Protection Bureau — PMI cancellation at 78% LTV",
                href: "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/",
              },
            ]}
            checked="October 2026"
            note="NAR down-payment share is a Tier-2 industry survey; loan minimums are from agency sources above."
          />
        </section>

        {/* Calculator CTA */}
        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">
            Calculate Your Down Payment
          </p>
          <p className="mt-1 text-sm text-ink-600">
            See exactly how much you need, compare PMI costs at different
            percentages, and find out how long it takes to save your target.
          </p>
          <div className="mt-3 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/calculators/down-payment"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Open Down Payment Calculator
            </Link>
            <Link
              href="/calculators/mortgage"
              className="inline-block rounded-lg border border-brand-600 px-5 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              Open Mortgage Calculator
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
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
          currentSlug="how-much-down-payment-for-house"
          relatedSlugs={[
            "how-much-house-can-i-afford",
            "rent-vs-buy-decision",
            "15-year-vs-30-year-mortgage",
          ]}
        />
      </article>
    </>
  );
}
