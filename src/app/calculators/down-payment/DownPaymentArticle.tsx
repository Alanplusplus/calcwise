import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET, MORTGAGE_MARKET_SOURCES } from "@/lib/market-data";

export function DownPaymentArticle() {
  return (
    <>
      <h2>How the Down Payment Calculator Works</h2>
      <p>
        The down payment is the single largest upfront cost in a home purchase, and choosing the
        right amount affects everything from your monthly mortgage payment to whether you pay
        private mortgage insurance (PMI). Our Down Payment Calculator lets you experiment with
        different percentages on any home price and instantly see the impact on your loan amount,
        monthly payment, PMI cost, and total interest over the life of the loan.
      </p>
      <p>
        Enter your target home price, desired down payment percentage, current savings, and how
        much you can set aside each month. The calculator computes exactly how much cash you need,
        how long it takes to reach that goal, and provides a side-by-side comparison of five
        common down payment levels (3.5%, 5%, 10%, 15%, and 20%). Use it alongside our{" "}
        <Link href="/calculators/mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
          Mortgage Calculator
        </Link>{" "}
        to see how down payment size changes your monthly obligation and total borrowing cost.
      </p>

      <figure className="my-8 overflow-hidden rounded-xl border border-ink-200">
        <Image
          src="/images/down-payment-infographic.webp"
          alt="Table comparing 3.5%, 5%, 10%, 15%, and 20% down payments on a $350,000 home with cash needed, monthly principal and interest, and PMI at a 7.40% mortgage rate"
          width={1200}
          height={800}
          className="w-full"
        />
      </figure>

      <h2>How Much Down Payment Do You Actually Need?</h2>
      <p>
        The conventional wisdom of "20% down" persists, but the reality is more nuanced. According
        to the National Association of Realtors, the median down payment for first-time buyers
        in 2025 was 10% (the highest share recorded since 1989), while repeat buyers averaged 23%
        and all buyers 19%. Several loan programs allow significantly less:
      </p>
      <Sources
        items={[
          {
            label: "NAR 2025 Profile of Home Buyers and Sellers (July 2024–June 2025 purchases)",
            href: "https://www.nar.realtor/press-releases/first-time-home-buyer-share-falls-to-historic-low-of-21-median-age-rises-to-40",
          },
        ]}
        checked="October 2026"
      />
      <ul>
        <li>
          <strong>Conventional loans:</strong> As low as 3% down for first-time buyers through
          Fannie Mae HomeReady or Freddie Mac Home Possible programs, though PMI applies until
          you reach 20% equity.
        </li>
        <li>
          <strong>FHA loans:</strong> 3.5% minimum down payment with a credit score of 580 or
          higher. FHA mortgage insurance premiums (both upfront and annual) are required for the
          life of the loan unless you refinance.
        </li>
        <li>
          <strong>VA loans:</strong> 0% down for eligible military service members and veterans.
          No PMI required, though a VA funding fee applies (typical range roughly 1.25% to 3.3% of
          the loan for most first-use purchases, with exemptions for disabled veterans).
        </li>
        <li>
          <strong>USDA loans:</strong> 0% down for eligible rural and suburban properties in
          designated areas, with household income limits.
        </li>
      </ul>
      <p>
        The 20% threshold remains significant because it eliminates PMI on conventional loans.
        On a $350,000 home at a {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% mortgage rate, PMI at 0.7% of the loan amount (the
        calculator's typical assumption for sub-20% conventional loans) adds roughly $194/month when you put
        only 5% down versus zero PMI at 20% down — that is $2,328/year in additional cost until
        you build sufficient equity.
      </p>
      <Sources
        items={[
          ...MORTGAGE_MARKET_SOURCES,
          {
            label: "CFPB — What is private mortgage insurance?",
            href: "https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/",
          },
        ]}
        checked={MORTGAGE_MARKET.checkedLabel}
        note="PMI percentages are illustrative; actual quotes depend on credit score and loan-to-value."
      />
      <p>
        For a complete analysis of how much home you can afford at
        different income levels, see our{" "}
        <Link href="/guides/how-much-house-can-i-afford" className="text-brand-600 hover:text-brand-800 font-medium">
          How Much House Can I Afford guide
        </Link>.
      </p>

      <h2>Case Study: Rachel Saving for Her First Home in Atlanta</h2>
      <p>
        Rachel is a 29-year-old physical therapist earning $68,000/year in Atlanta, Georgia. She
        has $18,000 in savings and can contribute $1,200/month toward her down payment fund,
        which earns 4.5% APY in a high-yield savings account. She is targeting homes in the
        $320,000 range.
      </p>
      <p>
        <strong>Scenario A: 20% down ($64,000).</strong> Rachel needs $46,000 more. At
        $1,200/month with 4.5% APY, the calculator shows she reaches her goal in approximately
        35 months (just under 3 years). Her loan would be $256,000, with a monthly P&I of
        $1,772 at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% and no PMI. Total interest over 30 years: $382,100.
      </p>
      <p>
        <strong>Scenario B: 10% down ($32,000).</strong> Rachel needs only $14,000 more, which
        she accumulates in about 11 months. Her loan rises to $288,000, pushing the monthly P&I
        to $1,994, plus roughly $168/month in PMI. That PMI adds $2,016/year until she reaches
        20% equity (approximately 7-8 years with normal appreciation and payment). Total interest
        over 30 years: $429,860.
      </p>
      <p>
        <strong>Scenario C: 5% down ($16,000).</strong> Rachel already has enough saved today
        (plus a $2,000 buffer for closing costs). Her loan jumps to $304,000, monthly P&I hits
        $2,105, and PMI adds approximately $177/month. While she enters the market immediately,
        the larger loan means $71,600 more in total interest compared to the 20% down scenario.
      </p>
      <p>
        Rachel decides on 10% down as a compromise: she enters the market within a year, avoids
        the highest PMI tier, and uses the additional time to improve her credit score for a
        better rate. She also uses our{" "}
        <Link href="/calculators/home-affordability" className="text-brand-600 hover:text-brand-800 font-medium">
          Home Affordability Calculator
        </Link>{" "}
        to stress-test whether a $320,000 purchase fits her $68,000 income at a{" "}
        {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% rate (P&I plus PMI near $2,162/month before taxes), and our{" "}
        <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">
          Savings Goal Calculator
        </Link>{" "}
        to track her monthly progress.
      </p>

      <h2>Down Payment Comparison by Home Price</h2>
      <p>
        The table below shows the required down payment, loan amount, estimated monthly payment
        (P&I only at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}%, 30-year term), and PMI cost at five common down payment levels for
        three popular home prices.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50">
              <th className="px-4 py-3 text-left font-semibold text-ink-700">Home Price</th>
              <th className="px-4 py-3 text-left font-semibold text-ink-700">Down %</th>
              <th className="px-4 py-3 text-right font-semibold text-ink-700">Down Payment</th>
              <th className="px-4 py-3 text-right font-semibold text-ink-700">Monthly P&I</th>
              <th className="px-4 py-3 text-right font-semibold text-ink-700">Monthly PMI</th>
              <th className="px-4 py-3 text-right font-semibold text-ink-700">Total Interest (30yr)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700" rowSpan={3}>$250,000</td>
              <td className="px-4 py-2 text-ink-700">5%</td>
              <td className="px-4 py-2 text-right text-ink-700">$12,500</td>
              <td className="px-4 py-2 text-right text-ink-700">$1,644</td>
              <td className="px-4 py-2 text-right text-ink-700">$139</td>
              <td className="px-4 py-2 text-right text-ink-700">$354,500</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">10%</td>
              <td className="px-4 py-2 text-right text-ink-700">$25,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$1,558</td>
              <td className="px-4 py-2 text-right text-ink-700">$131</td>
              <td className="px-4 py-2 text-right text-ink-700">$335,800</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">20%</td>
              <td className="px-4 py-2 text-right text-ink-700">$50,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$1,385</td>
              <td className="px-4 py-2 text-right text-ink-700">$0</td>
              <td className="px-4 py-2 text-right text-ink-700">$298,500</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700" rowSpan={3}>$400,000</td>
              <td className="px-4 py-2 text-ink-700">5%</td>
              <td className="px-4 py-2 text-right text-ink-700">$20,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$2,631</td>
              <td className="px-4 py-2 text-right text-ink-700">$222</td>
              <td className="px-4 py-2 text-right text-ink-700">$567,200</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">10%</td>
              <td className="px-4 py-2 text-right text-ink-700">$40,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$2,493</td>
              <td className="px-4 py-2 text-right text-ink-700">$210</td>
              <td className="px-4 py-2 text-right text-ink-700">$537,300</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">20%</td>
              <td className="px-4 py-2 text-right text-ink-700">$80,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$2,216</td>
              <td className="px-4 py-2 text-right text-ink-700">$0</td>
              <td className="px-4 py-2 text-right text-ink-700">$477,600</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700" rowSpan={3}>$600,000</td>
              <td className="px-4 py-2 text-ink-700">5%</td>
              <td className="px-4 py-2 text-right text-ink-700">$30,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$3,947</td>
              <td className="px-4 py-2 text-right text-ink-700">$333</td>
              <td className="px-4 py-2 text-right text-ink-700">$850,800</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">10%</td>
              <td className="px-4 py-2 text-right text-ink-700">$60,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$3,739</td>
              <td className="px-4 py-2 text-right text-ink-700">$315</td>
              <td className="px-4 py-2 text-right text-ink-700">$806,000</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">20%</td>
              <td className="px-4 py-2 text-right text-ink-700">$120,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$3,323</td>
              <td className="px-4 py-2 text-right text-ink-700">$0</td>
              <td className="px-4 py-2 text-right text-ink-700">$716,400</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The pattern is clear: every 5% increase in down payment drops the monthly payment and
        eliminates years of PMI cost. However, the largest jump in savings comes at the 20%
        threshold where PMI disappears entirely. On a $400,000 home, the difference between
        5% and 20% down is roughly $637/month ($415 less in P&I plus $222 saved on PMI).
      </p>

      <h2>Strategies to Save for a Down Payment Faster</h2>
      <ul>
        <li>
          <strong>Automate transfers to a high-yield savings account.</strong> Set up a recurring
          transfer on payday so the money moves before you can spend it. Current HYSA rates of
          4.0% to 5.0% APY mean your savings earn meaningful interest while you accumulate.
        </li>
        <li>
          <strong>Use a dedicated savings account.</strong> Keeping down payment funds separate
          from your checking account reduces the temptation to dip in. Some banks let you create
          named sub-accounts specifically for goals.
        </li>
        <li>
          <strong>Redirect windfalls.</strong> Tax refunds, work bonuses, and cash gifts can
          accelerate your timeline dramatically. A single $5,000 tax refund can cut 4-5 months
          off a $1,000/month savings plan.
        </li>
        <li>
          <strong>Explore down payment assistance programs.</strong> Over 2,000 programs exist
          nationwide, offering grants, forgivable loans, or matched savings for first-time buyers.
          Check your state housing finance agency for eligibility.
        </li>
        <li>
          <strong>Consider a CD ladder strategy.</strong> If your timeline is 2-3 years, splitting
          savings across multiple CDs with staggered maturity dates can earn higher rates than a
          standard savings account. See our{" "}
          <Link href="/guides/high-yield-savings-vs-cd" className="text-brand-600 hover:text-brand-800 font-medium">
            High-Yield Savings vs CD guide
          </Link>{" "}
          for details on this approach.
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Is a 20% down payment always the best choice?</h3>
      <p>
        Not necessarily. While 20% down eliminates PMI and gives you the lowest monthly payment,
        waiting years to save 20% means potentially missing home appreciation and continuing to
        pay rent. If putting 10% down lets you buy 2 years sooner and home values rise 4% annually,
        you capture roughly $28,000 in appreciation on a $350,000 home that would otherwise be
        lost. The right down payment balances monthly affordability, PMI cost, and opportunity cost.
      </p>
      <h3>What is PMI and how do I get rid of it?</h3>
      <p>
        Private mortgage insurance (PMI) protects the lender if you default on a loan with less
        than 20% equity. On conventional loans, you can request PMI removal once your loan-to-value
        ratio reaches 80% (through payments, appreciation, or both). Lenders must automatically
        cancel PMI when the ratio hits 78% based on the original amortization schedule. FHA loans
        require mortgage insurance for the life of the loan if you put less than 10% down.
      </p>
      <h3>Should I use retirement funds for a down payment?</h3>
      <p>
        First-time buyers can withdraw up to $10,000 from a traditional IRA penalty-free (taxes
        still apply) or pull Roth IRA contributions at any time without tax or penalty. However,
        this permanently reduces your retirement savings and the decades of compound growth those
        funds would have generated. Most financial planners recommend exhausting other savings
        strategies first and only tapping retirement accounts as a last resort.
      </p>
      <h3>How much should I budget for closing costs on top of the down payment?</h3>
      <p>
        Closing costs typically run 2% to 5% of the home purchase price. On a $350,000 home,
        budget $7,000 to $17,500 for items like origination fees, appraisal, title insurance,
        escrow deposits, and prepaid property taxes. Some closing costs are negotiable, and
        sellers occasionally contribute toward them as part of the purchase agreement.
      </p>
    </>
  );
}
