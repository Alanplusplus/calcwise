import Link from "next/link";
import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET, MORTGAGE_MARKET_SOURCES } from "@/lib/market-data";

export function HomeAffordabilityArticle() {
  return (
    <>
      <h2>How the Home Affordability Calculator Works</h2>
      <p>
        Buying a home is one of the largest financial decisions most people will ever make,
        and the first question is almost always the same: how much house can I actually afford?
        Our Home Affordability Calculator answers that question using the widely accepted 28/36
        rule, the same guideline mortgage lenders use when evaluating loan applications.
      </p>
      <p>
        Enter your annual gross income, existing monthly debt payments, saved down payment,
        expected interest rate, loan term, property tax rate, and homeowners insurance estimate.
        The calculator instantly determines your maximum home price, maximum loan amount, and
        a full monthly payment breakdown including principal and interest, property taxes, and
        insurance. It also shows your front-end and back-end debt-to-income (DTI) ratios so you
        can see exactly where you stand relative to lender standards.
      </p>
      <p>
        Unlike a simple income multiplier (such as "buy a home worth three times your salary"),
        this calculator accounts for your specific debts, down payment, local tax rates, and
        current mortgage rates. For a detailed payment on a specific home price, pair these
        results with our{" "}
        <Link href="/calculators/mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
          Mortgage Calculator
        </Link>
        .
      </p>

      <h2>The 28/36 Rule Explained</h2>
      <p>
        The 28/36 rule is a pair of DTI limits that lenders and financial advisors have used
        for decades. The front-end ratio (28%) caps your total housing costs — mortgage payment,
        property taxes, homeowners insurance, and HOA fees if applicable — at 28% of your gross
        monthly income. The back-end ratio (36%) caps your total monthly debt obligations,
        including housing plus car loans, student loans, and minimum credit card payments, at
        36% of gross income.
      </p>
      <p>
        Your affordable housing budget is whichever limit is more restrictive. If you carry
        significant non-housing debt, the 36% back-end cap will bind before the 28% front-end
        cap, reducing how much you can spend on a home even if your income is strong.
      </p>
      <p>Here is how the 28% rule applies at three common income levels (assuming no other debt):</p>
      <ul>
        <li>
          <strong>$60,000/year ($5,000/month):</strong> Maximum housing payment of $1,400/month.
          At a {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% rate on a 30-year loan with $30,000 down, 0.9% property taxes, and $2,400/year
          insurance, that supports a home price of roughly $175,000 to $185,000.
        </li>
        <li>
          <strong>$80,000/year ($6,667/month):</strong> Maximum housing payment of $1,867/month.
          With $40,000 down and the same assumptions, you could afford approximately $250,000 to
          $260,000.
        </li>
        <li>
          <strong>$100,000/year ($8,333/month):</strong> Maximum housing payment of $2,333/month.
          With $50,000 down, that translates to a home price around $315,000 to $325,000 depending
          on your local tax rate.
        </li>
      </ul>
      <p>
        These figures shift with every input change. A higher interest rate reduces buying power
        significantly — a one-percentage-point increase can cut affordability by 10% or more. The
        calculator defaults to the Freddie Mac PMMS 30-year average ({MORTGAGE_MARKET.thirtyYear.toFixed(2)}%
        as of {MORTGAGE_MARKET.asOfLabel}); at that rate a $75,000 income with $40,000 down and $500/month
        in other debt caps buying power near $238,000, versus about $260,000 at the year-ago average of{" "}
        {MORTGAGE_MARKET.thirtyYearYearAgo.toFixed(2)}%.
      </p>
      <Sources items={MORTGAGE_MARKET_SOURCES} checked={MORTGAGE_MARKET.checkedLabel} />
      <p>
        NAR reported a median existing-home price of $417,500 in September 2026 — above what many
        households can carry under the 28/36 rule at today's rate, which is why the calculator
        defaults use a $75,000 income scenario rather than the national median price.
      </p>
      <Sources
        items={[
          {
            label: "NAR Existing-Home Sales (Sept. 2026 median price $417,500)",
            href: "https://www.nar.realtor/newsroom/existing-home-sales-increased-1-5-in-september-according-to-nar-report",
          },
          {
            label: "NAHB analysis of Census ACS 2024 (0.89% effective property tax rate)",
            href: "https://www.nahb.org/blog/2025/12/property-taxes-2024-residential",
          },
          {
            label: "LendingTree State of Home Insurance 2026 ($2,395 avg. on $350k dwelling)",
            href: "https://www.lendingtree.com/insurance/state-of-home-insurance/",
          },
        ]}
        checked="October 2026"
      />
      <p>
        For a deeper dive into income-based limits, see our{" "}
        <Link
          href="/guides/how-much-house-can-i-afford"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How Much House Can I Afford guide
        </Link>
        .
      </p>

      <h2>Case Study: Marcus in Denver</h2>
      <p>
        Marcus is a 32-year-old software developer earning $85,000 per year ($7,083/month gross).
        He has a $400/month car payment and no other debt. He has saved $45,000 for a down payment
        and is looking at homes in the Denver metro area, where property tax rates average around
        0.6% and homeowners insurance runs about $1,800/year.
      </p>
      <p>
        Under the 28% rule, Marcus can spend up to $1,983/month on housing. Under the 36% rule,
        his total debt ceiling is $2,550/month; subtracting his $400 car payment leaves $2,150
        for housing. The 28% rule is more restrictive, so $1,983 is his cap.
      </p>
      <p>
        At a {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% interest rate on a 30-year loan, with 0.6% property taxes and $1,800/year
        insurance, the calculator estimates Marcus can afford a home priced around $289,000, requiring
        a loan of approximately $244,000. His estimated monthly breakdown would be roughly $1,689
        in principal and interest, $144 in property taxes, and $150 in insurance — totaling
        $1,983, which matches his 28% housing ceiling of $1,983/month.
      </p>
      <p>
        Marcus notices that Denver median home prices in his target neighborhoods run closer to
        $450,000. He has three levers: increase his down payment to reduce the loan amount,
        pay off his car loan early to free up the 36% back-end room, or expand his search to
        adjacent suburbs with lower price points. He also uses our{" "}
        <Link
          href="/calculators/loan-comparison"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Loan Comparison Calculator
        </Link>{" "}
        to see whether a slightly higher rate from one lender is offset by lower closing costs
        from another.
      </p>

      <h2>Factors That Affect How Much Home You Can Afford</h2>
      <p>
        The calculator provides a strong baseline, but several real-world factors can raise or
        lower your actual buying power beyond what the 28/36 rule suggests.
      </p>
      <p>
        <strong>Credit score</strong> is among the most impactful. Borrowers with scores above
        740 typically qualify for the lowest rates, which directly increases affordability. A
        borrower at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% versus {MORTGAGE_MARKET.thirtyYearYearAgo.toFixed(2)}% (the PMMS average from one year earlier) on a $300,000 loan pays roughly $226 more per month — money
        that could otherwise go toward a higher purchase price.
      </p>
      <p>
        <strong>Location</strong> affects affordability through property tax rates (0.3% in Hawaii
        to over 2% in parts of New Jersey and Illinois), insurance costs (higher in hurricane and
        wildfire zones), and HOA fees common in condos and planned communities. Always use your
        local tax rate rather than a national average.
      </p>
      <p>
        <strong>Debt-to-income ratio</strong> is the binding constraint for many buyers. Lenders
        may approve back-end DTIs up to 43% with strong compensating factors (high credit score,
        significant cash reserves), but the 36% guideline remains the conservative standard.
        Every $100 in monthly debt reduces your housing budget by the same amount under the
        back-end cap.
      </p>
      <p>
        Other factors include employment stability, down payment size (20% avoids PMI, which can
        add $100 to $300/month), and whether you are buying in a market where sellers expect
        cash offers above asking price.
      </p>

      <h2>Affordability at Different Income Levels</h2>
      <p>
        The table below shows estimated maximum home prices using the calculator's default
        assumptions: {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% interest rate, 30-year term, 0.9% property tax rate, $2,400/year
        insurance, and no existing monthly debt. Down payment is set at 10% of the estimated
        home price.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-100">
              <th className="px-4 py-2 text-left font-medium text-ink-700">Annual Income</th>
              <th className="px-4 py-2 text-right font-medium text-ink-700">Max Housing/mo</th>
              <th className="px-4 py-2 text-right font-medium text-ink-700">Est. Max Home Price</th>
              <th className="px-4 py-2 text-right font-medium text-ink-700">Front-End DTI</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">$50,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$1,167</td>
              <td className="px-4 py-2 text-right text-ink-700">~$138,000</td>
              <td className="px-4 py-2 text-right text-ink-700">28%</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">$75,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$1,750</td>
              <td className="px-4 py-2 text-right text-ink-700">~$222,000</td>
              <td className="px-4 py-2 text-right text-ink-700">28%</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-4 py-2 text-ink-700">$100,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$2,333</td>
              <td className="px-4 py-2 text-right text-ink-700">~$306,000</td>
              <td className="px-4 py-2 text-right text-ink-700">28%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-ink-700">$150,000</td>
              <td className="px-4 py-2 text-right text-ink-700">$3,500</td>
              <td className="px-4 py-2 text-right text-ink-700">~$473,000</td>
              <td className="px-4 py-2 text-right text-ink-700">28%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Add $500/month in existing debt and a $75,000 earner's maximum home price drops by
        roughly $70,000 to $80,000 because the 36% back-end rule becomes the limiting factor
        instead of the 28% front-end rule.
      </p>

      <h2>Tips to Increase Your Home Buying Budget</h2>
      <ul>
        <li>
          <strong>Pay down high-interest debt first.</strong> Eliminating a $300/month car payment
          or $200/month in credit card minimums directly increases your housing budget under the
          36% rule.
        </li>
        <li>
          <strong>Save a larger down payment.</strong> Every additional $10,000 down reduces your
          loan amount and may eliminate PMI if you cross the 20% threshold, freeing up room in
          your monthly housing budget.
        </li>
        <li>
          <strong>Improve your credit score.</strong> Moving from 680 to 740 can lower your rate
          by 0.5% or more. Shop at least three lenders and compare offers using our{" "}
          <Link
            href="/calculators/loan-comparison"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            Loan Comparison Calculator
          </Link>
          .
        </li>
        <li>
          <strong>Consider total cost of ownership, not just the mortgage.</strong> A home with
          lower property taxes or no HOA may afford you more interior space than a similarly priced
          home in a high-tax district.
        </li>
        <li>
          <strong>Evaluate rent vs. buy timing.</strong> If buying at the top of your budget leaves
          no margin for maintenance and emergencies, renting longer while saving may be the smarter
          move. Our{" "}
          <Link
            href="/guides/rent-vs-buy-decision"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            Rent vs Buy guide
          </Link>{" "}
          walks through that decision framework.
        </li>
        <li>
          <strong>Look into first-time buyer programs.</strong> FHA loans (3.5% down), VA loans
          (0% down for eligible veterans), and state down-payment assistance programs can reduce
          upfront cash requirements without changing the income-based DTI limits.
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Does this calculator include PMI?</h3>
      <p>
        No. Private mortgage insurance applies when your down payment is less than 20% and typically
        adds 0.5% to 1.5% of the loan amount annually. If your down payment is under 20%, subtract
        an estimated PMI cost from your maximum housing payment for a more conservative result.
      </p>
      <h3>Should I buy at the maximum the calculator shows?</h3>
      <p>
        Financial advisors generally recommend staying below the maximum, leaving room for maintenance
        (budget 1% of home value per year), utilities, and lifestyle expenses. Buying at 80% to 90%
        of your calculated maximum provides a buffer if interest rates rise at renewal or income
        fluctuates.
      </p>
      <h3>Why do lenders use gross income instead of take-home pay?</h3>
      <p>
        Lenders standardize on gross income because tax situations vary widely. However, you should
        evaluate affordability based on your net income and full budget. A household with high
        childcare costs or medical expenses may feel stretched at 28% of gross even if a lender
        approves the loan.
      </p>
      <h3>How accurate are the property tax and insurance estimates?</h3>
      <p>
        Property tax rates vary by county and municipality, and insurance depends on home age,
        construction type, and local risk factors. Use your county assessor's effective rate and
        get an insurance quote for a home in your target price range for the most accurate results.
        The calculator defaults (0.9% tax, $2,400/year insurance on a typical mid-priced home) track
        the 2024 national effective property-tax rate and 2026 homeowners premium averages — localize
        both before you offer on a specific address.
      </p>
    </>
  );
}
