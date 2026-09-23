import Link from "next/link";
import Image from "next/image";

export function RefinanceArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/refinance-calculator-infographic.webp"
          alt="Infographic showing how mortgage refinancing works, comparing old and new loan terms with monthly savings and break-even timeline"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          How mortgage refinancing works: comparing your current loan to a new one with a lower rate.
        </figcaption>
      </figure>

      <h2>How to Use This Mortgage Refinance Calculator</h2>
      <p>
        Start by entering your original loan amount, current interest rate, original loan term, and the number of payments you have already made. These fields define your existing mortgage and let the calculator determine your remaining balance and outstanding interest. Next, enter the new interest rate you have been offered, the term for the new loan, the estimated closing costs, and whether you want to roll those costs into the new loan balance or pay them out of pocket. The calculator instantly compares your current path to the refinanced scenario, showing your monthly savings, break-even point, and total lifetime savings including all closing costs.
      </p>
      <p>
        For a deeper look at how each payment splits between principal and interest, generate a full schedule with our{" "}
        <Link href="/calculators/amortization" className="text-brand-600 hover:text-brand-800 font-medium">
          Amortization Schedule Calculator
        </Link>
        . If you are also considering whether to put extra money toward your mortgage or invest it, read our guide on{" "}
        <Link href="/guides/pay-off-mortgage-early-vs-invest" className="text-brand-600 hover:text-brand-800 font-medium">
          paying off your mortgage early versus investing
        </Link>
        .
      </p>

      <h2>How Mortgage Refinancing Works</h2>
      <p>
        Refinancing replaces your existing mortgage with a brand-new loan, typically at a lower interest rate. The new lender pays off your old loan balance, and you begin making payments on the new loan under the updated terms. The mechanics are nearly identical to getting an original mortgage: you apply, the lender orders an appraisal, you go through underwriting, and you close on the new loan with associated closing costs (typically 2-5% of the loan amount).
      </p>
      <p>
        The most common type is a rate-and-term refinance, where you change the interest rate, the loan term, or both while keeping the same loan balance. A cash-out refinance lets you borrow more than your remaining balance and pocket the difference as cash, which can be useful for home improvements or debt consolidation but increases your loan amount.
      </p>
      <p>
        The primary goal of a rate-and-term refinance is to reduce your monthly payment, shorten your loan term, or both. Even a reduction of 0.5-1.0 percentage points can save tens of thousands of dollars over the life of a 30-year loan. To estimate your original payment or compare different loan terms, use our{" "}
        <Link href="/calculators/mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
          Mortgage Payment Calculator
        </Link>
        .
      </p>

      <h2>Key Concepts in Refinancing</h2>
      <h3>Break-Even Point</h3>
      <p>
        The break-even point is the number of months it takes for your monthly savings to exceed the closing costs you paid. If refinancing saves you $200 per month and closing costs are $6,000, your break-even point is 30 months (2.5 years). You should only refinance if you plan to stay in your home past the break-even point; otherwise, the closing costs outweigh the savings. A break-even period under 3 years is generally considered favorable, while anything over 5 years warrants careful consideration.
      </p>
      <h3>Closing Costs</h3>
      <p>
        Refinance closing costs typically range from 2% to 5% of the new loan amount and include application fees, appraisal fees ($400-$700), title insurance ($500-$1,500), origination fees (0.5-1% of the loan), recording fees, and prepaid escrow items. On a $300,000 refinance, expect closing costs between $6,000 and $15,000. You can choose to pay these upfront or roll them into the new loan balance, though rolling them in increases the amount you are borrowing and the total interest you pay over time.
      </p>
      <h3>Rate Drop Threshold</h3>
      <p>
        The old rule of thumb was to refinance only if you can drop your rate by at least 1 percentage point. In practice, the right threshold depends on your loan balance and remaining term. On a $400,000 loan, a 0.5% rate reduction saves roughly $120 per month ($43,200 over 30 years). On a $150,000 loan, the same rate drop saves about $45 per month. The higher your balance, the smaller the rate reduction needed to justify the closing costs.
      </p>
      <h3>Loan Term Reset</h3>
      <p>
        When you refinance a 30-year mortgage five years in, the new loan starts a fresh 30-year clock (or whatever term you choose). This means you could end up paying for your home over 35 total years if you choose another 30-year term. To avoid extending your payoff timeline, consider refinancing into a 25-year or 20-year term. The monthly payment may be slightly higher, but you will pay far less in total interest and stay on track for the same payoff date.
      </p>

      <h2>Case Study: Sarah Refinances Her Denver Townhome</h2>
      <p>
        Sarah is a 38-year-old software engineer in Denver who bought her townhome in 2021 for $420,000 with a $336,000 mortgage at 6.875% on a 30-year fixed term. After five years (60 payments) of on-time payments, her remaining balance is approximately $316,400. Her current monthly principal and interest payment is $2,209.
      </p>
      <p>
        Rates have dropped, and Sarah qualifies for a 5.5% rate on a new 30-year fixed mortgage. Her lender quotes $7,500 in closing costs. She decides to pay the closing costs out of pocket rather than rolling them into the loan to keep her balance lower.
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Current Mortgage</th>
            <th>Refinanced Mortgage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interest Rate</td>
            <td>6.875%</td>
            <td>5.5%</td>
          </tr>
          <tr>
            <td>Monthly Payment (P&amp;I)</td>
            <td>$2,209</td>
            <td>$1,797</td>
          </tr>
          <tr>
            <td>Monthly Savings</td>
            <td>--</td>
            <td>$412</td>
          </tr>
          <tr>
            <td>Remaining Term</td>
            <td>300 months</td>
            <td>360 months</td>
          </tr>
          <tr>
            <td>Total Remaining Interest</td>
            <td>$346,300</td>
            <td>$331,300</td>
          </tr>
          <tr>
            <td>Closing Costs</td>
            <td>$0</td>
            <td>$7,500</td>
          </tr>
          <tr>
            <td>Break-Even Point</td>
            <td>--</td>
            <td>18 months</td>
          </tr>
          <tr>
            <td>Lifetime Savings</td>
            <td>--</td>
            <td>$7,500</td>
          </tr>
        </tbody>
      </table>
      <p>
        By refinancing, Sarah saves $412 per month, reaches her break-even point in just 18 months, and saves approximately $7,500 over the life of the loan even after accounting for closing costs. However, she notices that her new loan resets to 30 years, extending her total payoff timeline from 25 remaining years to 30 years. To counter this, Sarah plans to make an extra $200 per month in principal payments, which will pay off the new loan in about 23 years and boost her total savings to over $45,000 in interest.
      </p>
      <p>
        To check whether her home&apos;s current value supports the refinance, Sarah uses the{" "}
        <Link href="/calculators/home-affordability" className="text-brand-600 hover:text-brand-800 font-medium">
          Home Affordability Calculator
        </Link>{" "}
        to verify her loan-to-value ratio stays under 80%, avoiding the need for private mortgage insurance on the new loan.
      </p>

      <h2>When Refinancing Makes Sense: Scenario Comparison</h2>
      <p>
        The table below shows how different rate reductions affect monthly savings and break-even timelines on a $300,000 remaining balance with $6,000 in closing costs.
      </p>
      <table>
        <thead>
          <tr>
            <th>Current Rate</th>
            <th>New Rate</th>
            <th>Rate Drop</th>
            <th>Monthly Savings</th>
            <th>Break-Even</th>
            <th>30-Year Savings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7.5%</td>
            <td>7.0%</td>
            <td>0.50%</td>
            <td>$104</td>
            <td>58 months</td>
            <td>$31,440</td>
          </tr>
          <tr>
            <td>7.5%</td>
            <td>6.5%</td>
            <td>1.00%</td>
            <td>$205</td>
            <td>29 months</td>
            <td>$67,800</td>
          </tr>
          <tr>
            <td>7.5%</td>
            <td>6.0%</td>
            <td>1.50%</td>
            <td>$302</td>
            <td>20 months</td>
            <td>$102,720</td>
          </tr>
          <tr>
            <td>7.5%</td>
            <td>5.5%</td>
            <td>2.00%</td>
            <td>$396</td>
            <td>15 months</td>
            <td>$136,560</td>
          </tr>
          <tr>
            <td>7.0%</td>
            <td>6.0%</td>
            <td>1.00%</td>
            <td>$197</td>
            <td>30 months</td>
            <td>$64,920</td>
          </tr>
          <tr>
            <td>6.5%</td>
            <td>5.5%</td>
            <td>1.00%</td>
            <td>$189</td>
            <td>32 months</td>
            <td>$62,040</td>
          </tr>
        </tbody>
      </table>
      <p>
        A 1% rate drop consistently delivers break-even periods under 3 years and lifetime savings above $60,000. Even a 0.5% reduction can be worthwhile if you plan to stay in your home for 5+ years, particularly on higher balances. The key takeaway: the larger your remaining balance and the bigger the rate drop, the more compelling the refinance becomes.
      </p>

      <h2>Tips for Getting the Best Refinance Deal</h2>
      <p>
        <strong>Shop at least three lenders.</strong> Mortgage rates can vary by 0.25-0.75% between lenders on the same day. Get quotes from your current servicer, a local credit union, and an online lender. Each quote should include the rate, APR (which factors in fees), and an itemized closing cost estimate. Comparing three offers typically saves $1,500-$3,000 in fees or gets you a 0.125-0.25% better rate.
      </p>
      <p>
        <strong>Lock your rate at the right time.</strong> Rate locks typically last 30-60 days. If you believe rates will continue dropping, a float-down option (usually $200-$500 extra) lets you lock now but take advantage of a lower rate if one becomes available before closing. If you think rates have bottomed, lock immediately to protect against increases during the 30-45 day closing process.
      </p>
      <p>
        <strong>Consider a shorter term.</strong> If you can afford a slightly higher payment, refinancing from a 30-year to a 15-year mortgage dramatically reduces total interest. On a $300,000 loan, a 15-year term at 5.0% costs $2,372/month versus $1,610 for 30 years at 5.5%, but you save $217,000 in total interest and own your home free and clear 15 years sooner. Use our guide on{" "}
        <Link href="/guides/15-year-vs-30-year-mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
          15-year vs 30-year mortgages
        </Link>{" "}
        for a complete term comparison.
      </p>
      <p>
        <strong>Check your loan-to-value ratio.</strong> Most lenders require your loan-to-value (LTV) ratio to be 80% or below for the best rates. If your home has appreciated since you purchased it, you may qualify for better terms than your original mortgage. If your LTV is above 80%, you will either pay PMI on the new loan or need to make a lump-sum payment to bring it below the threshold.
      </p>
      <p>
        <strong>Negotiate closing costs.</strong> Many refinance fees are negotiable, particularly the origination fee (ask for 0.5% instead of 1%), the title insurance (request a reissue rate discount of 20-40% since you are refinancing an existing policy), and the appraisal fee (some lenders accept an automated valuation model instead of a full appraisal, saving $300-$500). For a broader comparison of different loan options, try our{" "}
        <Link href="/calculators/loan-comparison" className="text-brand-600 hover:text-brand-800 font-medium">
          Loan Comparison Calculator
        </Link>{" "}
        to evaluate multiple refinance offers side by side.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How many times can you refinance a mortgage?</h3>
      <p>
        There is no legal limit on how many times you can refinance. However, most lenders require a seasoning period of 6-12 months between refinances, meaning you must wait at least six months after your last closing before refinancing again. Each refinance triggers new closing costs, so it only makes financial sense if the rate drop is large enough to justify those costs within a reasonable break-even period. Serial refinancing with small rate drops (0.25% or less) rarely pays off because the cumulative closing costs eat into the savings.
      </p>

      <h3>Should I roll closing costs into the new loan or pay out of pocket?</h3>
      <p>
        Paying closing costs out of pocket is almost always cheaper in the long run because you avoid paying interest on those costs over the life of the loan. For example, rolling $7,000 in closing costs into a 30-year loan at 5.5% adds approximately $4,300 in additional interest over the full term. However, if you do not have the cash available and the refinance still saves you significantly, rolling the costs in can make sense as long as the total savings (after accounting for the increased interest) remain positive. Run both scenarios through the calculator to compare.
      </p>

      <h3>Does refinancing hurt your credit score?</h3>
      <p>
        Refinancing causes a temporary credit score dip of 5-15 points due to the hard inquiry and the new account lowering your average account age. However, the impact is typically short-lived (3-6 months), and if refinancing results in lower monthly payments that help you avoid late payments, the net effect on your credit can actually be positive. If you are shopping rates, submit all mortgage applications within a 14-day window so the credit bureaus treat them as a single inquiry for scoring purposes (the window is 45 days under newer FICO models).
      </p>

      <h3>Can I refinance if my home value has dropped?</h3>
      <p>
        If your home value has decreased and your LTV is above 80%, refinancing becomes more difficult and more expensive. Conventional refinances typically require an LTV at or below 80% for the best rates. If your LTV is between 80% and 97%, you may still refinance but will pay PMI. Government programs like the FHA Streamline Refinance or VA Interest Rate Reduction Refinance Loan (IRRRL) offer refinancing options with less stringent appraisal requirements for borrowers with existing FHA or VA loans.
      </p>

      <h3>When is the best time to refinance?</h3>
      <p>
        The best time to refinance is when current market rates are at least 0.75-1.0% below your existing rate, your credit score has improved since your original mortgage (potentially qualifying you for better rates), your home has appreciated enough to give you a favorable LTV ratio, and you plan to stay in your home past the break-even point. Monitor the Federal Reserve&apos;s rate announcements and the 10-year Treasury yield (mortgage rates closely track it) to time your application. Also consider refinancing if you need to switch from an adjustable-rate mortgage (ARM) to a fixed rate before your ARM adjusts upward.
      </p>
    </>
  );
}
