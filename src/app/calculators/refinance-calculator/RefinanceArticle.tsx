import Link from "next/link";
import Image from "next/image";
import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET, MORTGAGE_MARKET_SOURCES } from "@/lib/market-data";

const REFINANCE_ORIGINAL_RATE_SOURCES = [
  ...MORTGAGE_MARKET_SOURCES,
  {
    label: "Freddie Mac PMMS (Oct. 26, 2023)",
    href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-continue-climb-toward-eight-percent",
  },
];

const CLOSING_COST_SOURCES = [
  {
    label: "CFPB — Loan Estimate explainer",
    href: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/",
  },
  {
    label: "Federal Reserve — A Consumer's Guide to Mortgage Refinancings",
    href: "https://www.federalreserve.gov/pubs/refinancings",
  },
];

const REFINANCE_SHOPPING_SOURCES = [
  {
    label: "Freddie Mac — When Rates Are Higher, Borrowers Who Shop Around Save More (Feb. 16, 2023)",
    href: "https://www.freddiemac.com/research/insight/20230216-when-rates-are-higher-borrowers-who-shop-around-save",
  },
  {
    label: "CFPB — What happens when a mortgage lender checks my credit? (reviewed Aug. 28, 2026)",
    href: "https://www.consumerfinance.gov/ask-cfpb/what-exactly-happens-when-a-mortgage-lender-checks-my-credit-en-2005/",
  },
];

export function RefinanceArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/refinance-calculator-infographic.webp"
          alt="Refinance comparison for a $350,000 loan at 7.79% after 36 payments versus a new 7.40% 30-year loan: about $162 monthly savings, 37-month break-even on $6,000 closing costs, and roughly $38,000 negative lifetime savings from resetting the term"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          The default scenario above uses a peak 2023 rate (7.79%) and today's 30-year PMMS average ({MORTGAGE_MARKET.thirtyYear.toFixed(2)}%) — a small rate drop that still resets your payoff clock.
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

      <h2>What the Default Numbers Show (Honest but Unexciting)</h2>
      <p>
        The calculator opens with a realistic late-2023 borrower: a $350,000 loan at 7.79% (the Freddie Mac
        PMMS 30-year high for the week of October 26, 2023) with 36 payments already made, compared to a
        new 30-year loan at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% — the PMMS 30-year average for{" "}
        {MORTGAGE_MARKET.asOfLabel} — plus $6,000 in closing costs paid upfront. On those inputs you still
        owe about $340,099, your current principal-and-interest payment is $2,517, and refinancing to{" "}
        {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% drops the payment to about $2,355, saving roughly $162 per
        month. Closing costs take about 37 months to recover ($6,000 ÷ $162). Lifetime savings, however, are
        about <strong>negative $38,170</strong>: you would pay roughly $853,718 on the new path (payments plus
        closing costs) versus $815,548 if you simply kept the existing loan for the remaining 324 months.
        Interest saved is also negative (about $32,170 more interest on the refinance) because restarting a
        full 30-year schedule outweighs the small rate improvement.
      </p>
      <Sources items={REFINANCE_ORIGINAL_RATE_SOURCES} checked={MORTGAGE_MARKET.checkedLabel} />
      <p>
        That does not mean refinancing is always wrong — it means you need a bigger rate drop, a shorter new
        term, or both. If you refinanced the same $340,099 balance into a 15-year loan at{" "}
        {MORTGAGE_MARKET.fifteenYear.toFixed(2)}% (today's PMMS 15-year average), the payment jumps to about
        $3,002 but total interest falls sharply versus staying on the old 7.79% schedule. A hypothetical return
        to {MORTGAGE_MARKET.thirtyYearYearAgo.toFixed(2)}% (where the 30-year PMMS stood one year ago) would
        cut the new payment to about $2,098 — but that rate is not available in the default fields; edit the
        calculator to model quotes you actually receive. Keeping your remaining 324 months and only changing the
        rate to 7.40% (same-term refinance) would run about $2,429 per month — higher than the reset 30-year
        payment but without extending your payoff date.
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
        The break-even point is the number of months it takes for your monthly savings to exceed the closing costs you paid. On the default scenario above, $162 in monthly savings and $6,000 in closing costs imply a 37-month break-even (just over three years). You should only refinance if you plan to stay in your home past that point — and if lifetime savings (not just the monthly check) still come out ahead after resetting the term. A break-even period under 3 years is generally favorable; when lifetime savings stay negative despite positive monthly savings, the term reset is the culprit.
      </p>
      <h3>Closing Costs</h3>
      <p>
        Refinance closing costs typically range from 2% to 5% of the new loan amount and include application fees, appraisal fees ($400-$700), title insurance ($500-$1,500), origination fees (0.5-1% of the loan), recording fees, and prepaid escrow items. On a $300,000 refinance, expect closing costs between $6,000 and $15,000. You can choose to pay these upfront or roll them into the new loan balance, though rolling them in increases the amount you are borrowing and the total interest you pay over time.
      </p>
      <Sources
        items={CLOSING_COST_SOURCES}
        checked="October 2026"
        note="Use the Loan Estimate's Estimated Closing Costs and Cash to Close for your quote — ranges vary by state and lender."
      />
      <h3>Rate Drop Threshold</h3>
      <p>
        The old rule of thumb was to refinance only if you can drop your rate by at least 1 percentage point. In practice, the right threshold depends on your loan balance, remaining term, and whether you reset the clock. On a $400,000 balance with 360 payments remaining, dropping from 7.40% to 6.90% saves about $135 per month (roughly $48,643 over 30 years of payments). On a $150,000 balance, the same 0.50% drop saves about $51 per month. The default 7.79% → 7.40% move on $340,099 saves only $162 per month — enough to eventually cover $6,000 in fees, but not enough to beat staying put on total cost unless you shorten the term or negotiate a larger discount.
      </p>
      <h3>Loan Term Reset</h3>
      <p>
        When you refinance a 30-year mortgage five years in, the new loan starts a fresh 30-year clock (or whatever term you choose). This means you could end up paying for your home over 35 total years if you choose another 30-year term. To avoid extending your payoff timeline, consider refinancing into a 25-year or 20-year term. The monthly payment may be slightly higher, but you will pay far less in total interest and stay on track for the same payoff date.
      </p>

      <h2>Case Study: Sarah Refinances Her Denver Townhome</h2>
      <p>
        Sarah is a 38-year-old software engineer in Denver who bought her townhome in 2021 for $420,000 with a $336,000 mortgage at 6.875% on a 30-year fixed term. After five years (60 payments) of on-time payments, her remaining balance is $315,856. Her current monthly principal and interest payment is $2,207.
      </p>
      <p>
        Sarah receives a firm 5.50% offer on a new 30-year fixed mortgage — well below today's {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% PMMS average and far below her existing 6.875% note. Her lender quotes $7,500 in closing costs. She decides to pay the closing costs out of pocket rather than rolling them into the loan to keep her balance lower.
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
            <td>5.50%</td>
          </tr>
          <tr>
            <td>Monthly Payment (P&I)</td>
            <td>$2,207</td>
            <td>$1,793</td>
          </tr>
          <tr>
            <td>Monthly Savings</td>
            <td>--</td>
            <td>$414</td>
          </tr>
          <tr>
            <td>Remaining Term</td>
            <td>300 months</td>
            <td>360 months</td>
          </tr>
          <tr>
            <td>Total Remaining Interest</td>
            <td>$346,328</td>
            <td>$329,766</td>
          </tr>
          <tr>
            <td>Closing Costs</td>
            <td>$0</td>
            <td>$7,500</td>
          </tr>
          <tr>
            <td>Break-Even Point</td>
            <td>--</td>
            <td>19 months</td>
          </tr>
          <tr>
            <td>Lifetime Savings</td>
            <td>--</td>
            <td>$9,062</td>
          </tr>
        </tbody>
      </table>
      <p>
        By refinancing, Sarah saves $414 per month, reaches her break-even point in 19 months, and saves about $9,062 over the life of the loan even after accounting for closing costs — a much larger rate gap than the default 7.79% → 7.40% example. She still notices that her new loan resets to 30 years, extending her total payoff timeline from 25 remaining years to 30 years. To counter that, she plans extra principal payments so she is not paying interest for 35 combined years.
      </p>
      <p>
        To check whether her home's current value supports the refinance, Sarah uses the{" "}
        <Link href="/calculators/home-affordability" className="text-brand-600 hover:text-brand-800 font-medium">
          Home Affordability Calculator
        </Link>{" "}
        to verify her loan-to-value ratio stays under 80%, avoiding the need for private mortgage insurance on the new loan.
      </p>

      <h2>When Refinancing Makes Sense: Scenario Comparison</h2>
      <p>
        The table below shows how different rate reductions affect monthly savings and break-even timelines on a $300,000 loan amount refinanced into a new 30-year fixed loan with $6,000 in closing costs (both loans amortized over 360 months — a simplified apples-to-apples payment comparison).
      </p>
      <table>
        <thead>
          <tr>
            <th>Current Rate</th>
            <th>New Rate</th>
            <th>Rate Drop</th>
            <th>Monthly Savings</th>
            <th>Break-Even</th>
            <th>30-Year Payment Savings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7.79%</td>
            <td>7.40%</td>
            <td>0.39%</td>
            <td>$80</td>
            <td>75 months</td>
            <td>$28,942</td>
          </tr>
          <tr>
            <td>7.79%</td>
            <td>6.71%</td>
            <td>1.08%</td>
            <td>$220</td>
            <td>28 months</td>
            <td>$79,096</td>
          </tr>
          <tr>
            <td>7.79%</td>
            <td>6.27%</td>
            <td>1.52%</td>
            <td>$306</td>
            <td>20 months</td>
            <td>$110,333</td>
          </tr>
          <tr>
            <td>7.40%</td>
            <td>6.71%</td>
            <td>0.69%</td>
            <td>$139</td>
            <td>44 months</td>
            <td>$50,153</td>
          </tr>
          <tr>
            <td>7.40%</td>
            <td>6.27%</td>
            <td>1.13%</td>
            <td>$226</td>
            <td>27 months</td>
            <td>$81,390</td>
          </tr>
          <tr>
            <td>7.00%</td>
            <td>6.27%</td>
            <td>0.73%</td>
            <td>$145</td>
            <td>42 months</td>
            <td>$52,147</td>
          </tr>
        </tbody>
      </table>
      <p>
        A peak-era 7.79% loan needs more than the current {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% average to produce quick break-even results on payment savings alone — the first row takes 75 months to recover $6,000. Drops toward {MORTGAGE_MARKET.fifteenYear.toFixed(2)}% or {MORTGAGE_MARKET.thirtyYearYearAgo.toFixed(2)}% look much stronger on monthly cash flow, but always run the full calculator with your actual remaining balance and months left; payment savings multiplied by 360 still ignore the cost of extending your payoff timeline.
      </p>

      <h2>Tips for Getting the Best Refinance Deal</h2>
      <p>
        <strong>Shop at least three lenders.</strong> Mortgage rates can vary by 0.25-0.75% between lenders on the same day. Get quotes from your current servicer, a local credit union, and an online lender. Each quote should include the rate, APR (which factors in fees), and an itemized closing cost estimate. Freddie Mac research found additional rate quotes can reduce the offered rate by 10-20 basis points in high-dispersion periods — worth thousands over the life of the loan if you keep the mortgage several years.
      </p>
      <Sources items={REFINANCE_SHOPPING_SOURCES} checked="October 2026" />
      <p>
        <strong>Lock your rate at the right time.</strong> Rate locks typically last 30-60 days. If you believe rates will continue dropping, a float-down option (usually $200-$500 extra) lets you lock now but take advantage of a lower rate if one becomes available before closing. If you think rates have bottomed, lock immediately to protect against increases during the 30-45 day closing process.
      </p>
      <p>
        <strong>Consider a shorter term.</strong> If you can afford a higher payment, refinancing from a 30-year to a 15-year mortgage dramatically reduces total interest. On a $300,000 loan, a 15-year term at {MORTGAGE_MARKET.fifteenYear.toFixed(2)}% costs about $2,648/month versus about $2,077 for 30 years at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}%, but you save about $271,000 in total interest and own your home free and clear 15 years sooner. Use our guide on{" "}
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
        Paying closing costs out of pocket is almost always cheaper in the long run because you avoid paying interest on those costs over the life of the loan. For example, rolling $7,000 in closing costs into a 30-year loan at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% adds about $10,448 in additional interest over the full term versus paying the $7,000 upfront on a $300,000 base loan. However, if you do not have the cash available and the refinance still saves you significantly, rolling the costs in can make sense as long as the total savings (after accounting for the increased interest) remain positive. Run both scenarios through the calculator to compare.
      </p>

      <h3>Does refinancing hurt your credit score?</h3>
      <p>
        Refinancing causes a temporary credit score dip due to the hard inquiry and the new account lowering your average account age; the CFPB describes the impact as typically small. If you are shopping rates, the CFPB groups mortgage inquiries within 45 days as one inquiry, but many mortgage lenders still use older FICO models with a 14-day grouping window — cluster applications within about two weeks when possible.
      </p>

      <h3>Can I refinance if my home value has dropped?</h3>
      <p>
        If your home value has decreased and your LTV is above 80%, refinancing becomes more difficult and more expensive. Conventional refinances typically require an LTV at or below 80% for the best rates. If your LTV is between 80% and 97%, you may still refinance but will pay PMI. Government programs like the FHA Streamline Refinance or VA Interest Rate Reduction Refinance Loan (IRRRL) offer refinancing options with less stringent appraisal requirements for borrowers with existing FHA or VA loans.
      </p>

      <h3>When is the best time to refinance?</h3>
      <p>
        The best time to refinance is when market rates are meaningfully below your existing rate — often 0.75-1.0% or more on a 30-year fixed — your credit score has improved, your home has appreciated enough for a strong LTV, and you plan to stay past the break-even point with positive lifetime savings. With the 30-year PMMS near {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% in {MORTGAGE_MARKET.checkedLabel}, a borrower at 7.79% only gains about $162 per month on the default scenario and still loses on lifetime cost unless they shorten the term or lock a deeper discount. Also consider refinancing if you need to switch from an adjustable-rate mortgage (ARM) to a fixed rate before your ARM adjusts upward.
      </p>

      <h3>Does the default refinance example save money overall?</h3>
      <p>
        No. On the pre-filled $350,000 / 7.79% / 36 payments made scenario, refinancing to {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% for another 30 years lowers the payment by about $162 per month and reaches break-even on $6,000 in closing costs in 37 months, but lifetime savings are about negative $38,170 and interest saved is about negative $32,170 because you stretch payments across a fresh 360-month schedule. Use the calculator to test a 15-year at {MORTGAGE_MARKET.fifteenYear.toFixed(2)}% or a same-term refinance before deciding.
      </p>
    </>
  );
}
