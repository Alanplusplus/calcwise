import Link from "next/link";
import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET, MORTGAGE_MARKET_SOURCES } from "@/lib/market-data";

const MORTGAGE_SHOPPING_SOURCES = [
  {
    label: "Freddie Mac — When Rates Are Higher, Borrowers Who Shop Around Save More (Feb. 16, 2023)",
    href: "https://www.freddiemac.com/research/insight/20230216-when-rates-are-higher-borrowers-who-shop-around-save",
  },
  {
    label: "Fannie Mae — Impact of Mortgage Shopping on Affordability",
    href: "https://www.fanniemae.com/media/32901/display",
  },
];

const CREDIT_INQUIRY_SOURCES = [
  {
    label: "CFPB — What happens when a mortgage lender checks my credit? (reviewed Aug. 28, 2026)",
    href: "https://www.consumerfinance.gov/ask-cfpb/what-exactly-happens-when-a-mortgage-lender-checks-my-credit-en-2005/",
  },
];

const DISCOUNT_POINTS_SOURCES = [
  {
    label: "CFPB — Data Spotlight: Trends in discount points amid rising interest rates (May 2023)",
    href: "https://www.consumerfinance.gov/data-research/research-reports/data-spotlight-trends-in-discount-points-amid-rising-interest-rates/",
  },
];

export function LoanComparisonArticle() {
  return (
    <>
      <h2>How to Compare Loans Side by Side</h2>
      <p>
        When evaluating multiple loan offers, don't just look at the
        monthly payment or interest rate in isolation. This loan comparison calculator helps you
        see the full picture by comparing the total cost (principal + all
        interest paid) of different loan terms and rates side by side. Whether you are comparing
        mortgage rates, auto loan offers, or student loan options, enter each offer's
        details to instantly see which deal saves you the most money.
      </p>

      <h2>Key Factors When You Compare Loan Rates</h2>

      <h3>Interest Rate vs. APR</h3>
      <p>
        The <strong>interest rate</strong> is the base cost of borrowing. The{" "}
        <strong>APR (Annual Percentage Rate)</strong> includes the interest rate
        plus fees (origination fees, closing costs, points) spread over the loan
        term. APR gives a more accurate picture of the true cost — always
        compare APR to APR when evaluating offers from different lenders.
      </p>

      <h3>Loan Term: Short vs. Long</h3>
      <p>
        A shorter term (e.g., 15 years vs. 30 years) means higher monthly
        payments but dramatically less total interest. For a $250,000 mortgage
        (model your own numbers with our{" "}
        <Link
          href="/calculators/mortgage"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Mortgage Calculator
        </Link>
        ):
      </p>
      <ul>
        <li>
          <strong>30 years at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}%:</strong> $1,731/month, $373,142
          total interest
        </li>
        <li>
          <strong>15 years at {MORTGAGE_MARKET.fifteenYear.toFixed(2)}%:</strong> $2,207/month, $147,212
          total interest
        </li>
      </ul>
      <Sources items={MORTGAGE_MARKET_SOURCES} checked={MORTGAGE_MARKET.checkedLabel} />
      <p>
        The 15-year loan costs $476 more per month but saves $225,930 in
        interest over the life of the loan. Choose the shorter term if you can
        comfortably afford the higher payment. For a deeper breakdown, read{" "}
        <Link
          href="/guides/15-year-vs-30-year-mortgage"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          15-Year vs 30-Year Mortgage
        </Link>
        .
      </p>

      <h3>Fixed vs. Variable Rate</h3>
      <p>
        A fixed rate stays constant for the loan's life — your payment
        never changes. A variable rate may start lower but can increase
        significantly if market rates rise. For long-term loans (10+ years),
        fixed rates provide certainty and protection against rate hikes.
      </p>

      <h2>When a Higher Monthly Payment Makes Sense</h2>
      <p>
        Choosing a loan with higher monthly payments often saves substantial
        money long-term. Consider the higher payment if:
      </p>
      <ul>
        <li>The payment fits comfortably within 28% of your gross income</li>
        <li>You have a stable income and solid emergency fund</li>
        <li>The interest savings over the loan life exceed $20,000+</li>
        <li>You don't have higher-interest debt to prioritize</li>
      </ul>

      <h2>Step-by-Step: How to Compare Loan Offers</h2>
      <p>
        Follow this process to ensure you are making an apples-to-apples comparison
        when evaluating multiple loan offers from different lenders:
      </p>
      <ol>
        <li><strong>Gather at least 3 Loan Estimates:</strong> Apply with multiple lenders within a 14-day window. Each will provide a standardized Loan Estimate form breaking down rates, fees, and closing costs.</li>
        <li><strong>Compare APR, not just interest rate:</strong> One lender may quote 6.25% with $4,000 in fees while another quotes 6.50% with $1,000 in fees. The APR accounts for these differences. Enter both into our calculator above.</li>
        <li><strong>Match the loan terms:</strong> Only compare 30-year to 30-year, or 60-month to 60-month. Mixing terms makes the comparison misleading because shorter terms always show less total interest.</li>
        <li><strong>Factor in closing costs:</strong> Add any upfront costs (origination fees, points, application fees) to the total cost. A low rate with high fees may cost more than a slightly higher rate with no fees.</li>
        <li><strong>Check for prepayment penalties:</strong> Some loans charge penalties for paying ahead of schedule. If you plan to make extra payments or refinance, ensure the loan allows penalty-free prepayment.</li>
      </ol>

      <h2>Real-World Comparison: How 0.25% Changes Everything</h2>
      <p>
        A quarter-point difference in interest rate might seem trivial, but over a
        long loan term, it adds up to thousands of dollars. Here is a side-by-side
        comparison of a $300,000 mortgage at different rates over 30 years:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Rate</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Monthly P&I</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Total Interest</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Savings vs. 7.40%</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">7.40%</td>
              <td className="px-3 py-2 text-right text-ink-800">$2,077</td>
              <td className="px-3 py-2 text-right text-ink-800">$447,770</td>
              <td className="px-3 py-2 text-right text-ink-500">—</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">7.15%</td>
              <td className="px-3 py-2 text-right text-ink-800">$2,026</td>
              <td className="px-3 py-2 text-right text-ink-800">$429,439</td>
              <td className="px-3 py-2 text-right text-accent-700 font-medium">$18,331</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">6.90%</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,976</td>
              <td className="px-3 py-2 text-right text-ink-800">$411,288</td>
              <td className="px-3 py-2 text-right text-accent-700 font-medium">$36,482</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">6.71%</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,938</td>
              <td className="px-3 py-2 text-right text-ink-800">$397,617</td>
              <td className="px-3 py-2 text-right text-accent-700 font-medium">$50,153</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">6.50%</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,896</td>
              <td className="px-3 py-2 text-right text-ink-800">$382,633</td>
              <td className="px-3 py-2 text-right text-accent-700 font-medium">$65,137</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">6.27%</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,851</td>
              <td className="px-3 py-2 text-right text-ink-800">$366,380</td>
              <td className="px-3 py-2 text-right text-accent-700 font-medium">$81,390</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Negotiating your rate down by just 0.50% (from 7.40% to 6.90%) on a $300,000 mortgage saves you
        roughly $36,482 over the life of the loan — and about $101 per month in cash flow.
        That is why comparing rates across lenders matters so much. Use our{" "}
        <Link
          href="/calculators/mortgage"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Mortgage Calculator
        </Link>{" "}
        to run your own numbers with specific loan amounts.
      </p>

      <h2>Common Loan Comparison Scenarios</h2>
      <ul>
        <li><strong>15 vs. 30-year mortgage:</strong> lower rate and massive interest savings vs. lower monthly flexibility — see our guide on <Link href="/guides/15-year-vs-30-year-mortgage" className="text-brand-600 hover:text-brand-800 font-medium">15-Year vs 30-Year Mortgage</Link></li>
        <li><strong>Same term, different rates:</strong> compare interest rates from multiple lenders — even 0.25% matters over 30 years</li>
        <li>
          <strong>Points vs. no points:</strong> paying upfront points for a lower rate vs. keeping cash — divide the points cost by your monthly P&I savings; CFPB guidance treats break-even as often roughly 4-8 years depending on loan size and rate buy-down
        </li>
        <li><strong>Auto loan terms:</strong> 48 vs. 60 vs. 72 months — longer terms cost significantly more in interest. Use our <Link href="/calculators/auto-loan" className="text-brand-600 hover:text-brand-800 font-medium">Auto Loan Calculator</Link> to compare specific offers.</li>
        <li><strong>Student loan refinancing:</strong> compare your current federal loan rate against private refinancing offers — but be aware you lose federal protections like IDR and PSLF. See our <Link href="/guides/student-loan-repayment-strategies" className="text-brand-600 hover:text-brand-800 font-medium">Student Loan Repayment Strategies</Link> guide.</li>
        <li><strong>Comparing loan rates across lenders:</strong> use our loan rate comparison tool above to enter each lender's offer and see exactly how much each one costs over the full loan term</li>
      </ul>

      <h2>Mistakes to Avoid When Comparing Loans</h2>
      <p>
        Even experienced borrowers can make costly comparison errors:
      </p>
      <ul>
        <li><strong>Comparing rate to APR:</strong> If Lender A quotes a rate and Lender B quotes an APR, you are not comparing the same thing. Always use APR-to-APR or rate-to-rate.</li>
        <li><strong>Ignoring loan fees:</strong> A “no closing cost” loan often has a higher rate that costs more over time. Calculate the total cost including fees.</li>
        <li><strong>Only looking at monthly payment:</strong> A longer term lowers the monthly payment but dramatically increases total interest. A $300,000 loan at 7.40% costs $447,770 in interest over 30 years but only $176,654 over 15 years at 6.71% — a $271,116 difference.</li>
        <li><strong>Not rate-locking:</strong> Rates change daily. Once you find the best offer, lock the rate. An unlocked quote is not a guarantee.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>How many lenders should I compare?</h3>
      <p>
        Get quotes from at least 3-5 lenders. Fannie Mae research finds borrowers who
        obtain multiple quotes are more likely to receive better rates, fees, and closing-cost
        terms than those who stop at one offer. Freddie Mac rate-shopping analysis in
        high-dispersion periods found five quotes could save more than $6,000 in interest
        over the first several years of a typical loan — actual savings depend on your balance,
        rate spread, and how long you keep the mortgage. Include banks, credit unions, and
        online lenders. For a payment-by-payment view of term trade-offs, see our{" "}
        <Link
          href="/guides/amortization-schedule-explained"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          amortization schedule guide
        </Link>
        .
      </p>
      <Sources items={MORTGAGE_SHOPPING_SOURCES} checked="October 2026" />

      <h3>Does getting multiple quotes hurt my credit?</h3>
      <p>
        Multiple mortgage inquiries within a short window usually count as one inquiry for
        scoring. The CFPB describes a 45-day window for mortgage shopping; many mortgage
        lenders still score with older FICO models that use a 14-day grouping period, so
        completing applications within about two weeks is the safer target.
      </p>
      <Sources items={CREDIT_INQUIRY_SOURCES} checked="October 2026" />

      <h3>When do discount points break even?</h3>
      <p>
        One discount point typically costs 1% of the loan amount and may reduce the rate by
        about 0.25%, though the buy-down varies by lender. Divide the upfront points cost by
        your monthly principal-and-interest savings to estimate break-even months. On a
        $300,000 loan, paying $3,000 for a $50-per-month reduction breaks even in about 60
        months (five years). Points only pay off if you keep the loan past that point.
      </p>
      <Sources items={DISCOUNT_POINTS_SOURCES} checked="October 2026" />

      <h3>Should I always choose the lowest total cost?</h3>
      <p>
        Not necessarily. If the lower-cost option requires monthly payments that
        leave you with no financial cushion, the slightly more expensive option
        with lower payments may be wiser. Financial flexibility has real value.
      </p>
    </>
  );
}
