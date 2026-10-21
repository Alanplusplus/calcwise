import Link from "next/link";

export function AutoLoanArticle() {
  return (
    <>
      <h2>How Auto Loan Payments Are Calculated</h2>
      <p>
        Auto loan payments are calculated using the standard amortization
        formula. Each monthly payment covers two portions: interest on the
        remaining balance and a principal repayment that reduces what you owe.
        Early in the loan, most of your payment goes toward interest; as the
        balance decreases, more of each payment goes toward principal. The same
        amortization formula applies to home loans — see our{" "}
        <Link
          href="/calculators/mortgage"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Mortgage Calculator
        </Link>{" "}
        for mortgage-specific scenarios.
      </p>
      <p>
        The formula for a fixed-rate amortizing loan is:
      </p>
      <p>
        <strong>M = P × [r(1+r)^n] / [(1+r)^n − 1]</strong>
      </p>
      <ul>
        <li><strong>M</strong> = monthly payment</li>
        <li><strong>P</strong> = loan principal (vehicle price + tax − down payment − trade-in)</li>
        <li><strong>r</strong> = monthly interest rate (annual rate ÷ 12)</li>
        <li><strong>n</strong> = total number of monthly payments (loan term)</li>
      </ul>

      <h2>What Affects Your Auto Loan Rate?</h2>
      <p>
        Interest rates on auto loans depend on several factors, and
        understanding them helps you negotiate a better deal:
      </p>
      <ul>
        <li>
          <strong>Credit score:</strong> Borrowers with scores above 750
          typically qualify for the lowest rates (often 4-5% or less), while
          subprime borrowers (below 620) may face rates of 10-20%+.
        </li>
        <li>
          <strong>Loan term:</strong> Shorter terms usually carry lower rates.
          A 36-month loan may be 1-2% cheaper than a 72-month loan.
        </li>
        <li>
          <strong>New vs. used:</strong> Used car loans typically carry
          slightly higher rates (0.5-1% more) than new car loans.
        </li>
        <li>
          <strong>Down payment:</strong> A larger down payment reduces the
          lender's risk and can qualify you for a lower rate.
        </li>
        <li>
          <strong>Market conditions:</strong> Auto loan rates are influenced by
          the Federal Reserve's benchmark rate and overall economic
          conditions.
        </li>
      </ul>

      <h2>Choosing the Right Loan Term</h2>
      <p>
        Loan terms typically range from 24 to 84 months. Here's how a
        $30,000 loan at 6.5% APR compares across terms:
      </p>
      <ul>
        <li><strong>36 months:</strong> $919/mo — $3,082 total interest</li>
        <li><strong>48 months:</strong> $711/mo — $4,143 total interest</li>
        <li><strong>60 months:</strong> $587/mo — $5,225 total interest</li>
        <li><strong>72 months:</strong> $505/mo — $6,329 total interest</li>
        <li><strong>84 months:</strong> $447/mo — $7,455 total interest</li>
      </ul>
      <p>
        Shorter terms mean higher monthly payments but far less interest paid
        overall. Longer terms lower your monthly bill but significantly increase
        the total cost — and you risk being "upside down" on the loan
        (owing more than the car is worth).
      </p>

      <h2>The Hidden Cost of Long-Term Auto Loans</h2>
      <p>
        While 72- and 84-month loans are increasingly popular because of their
        lower monthly payments, they come with real drawbacks:
      </p>
      <ul>
        <li>
          <strong>Negative equity:</strong> Cars depreciate fastest in the first
          2-3 years. With a long loan term, you may owe more than the car is
          worth for most of the loan.
        </li>
        <li>
          <strong>Higher insurance costs:</strong> Lenders typically require
          full coverage (comprehensive + collision) for the entire loan term.
        </li>
        <li>
          <strong>Maintenance overlap:</strong> A 7-year loan means you may be
          paying the loan and covering expensive repairs simultaneously as the
          car ages.
        </li>
      </ul>

      <h2>How to Get the Best Deal</h2>
      <ul>
        <li>
          <strong>Get pre-approved</strong> from your bank or credit union
          before visiting a dealership. This gives you a baseline rate to
          negotiate against. Then use our{" "}
          <Link
            href="/calculators/loan-comparison"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            Loan Comparison Calculator
          </Link>{" "}
          to compare dealer financing side by side.
        </li>
        <li>
          <strong>Aim for 20% down</strong> to avoid negative equity and reduce
          your loan amount. At minimum, cover the taxes, fees, and first
          year's depreciation.
        </li>
        <li>
          <strong>Keep total payments under 10% of gross income</strong> — this
          is a common guideline financial advisors recommend to avoid being
          car-poor.
        </li>
        <li>
          <strong>Consider total cost, not monthly payment</strong> — dealers
          often stretch the term to make the payment look affordable, but you
          pay far more in total.
        </li>
        <li>
          <strong>Check for manufacturer incentives</strong> — 0% or
          low-interest financing offers from automakers can save you thousands,
          though they may not combine with other rebates.
        </li>
      </ul>

      <h2>Down Payment vs. Trade-in</h2>
      <p>
        Both a cash down payment and a trade-in reduce the amount you need to
        borrow, but they work slightly differently for tax purposes. In many
        states, the trade-in value is subtracted from the purchase price
        <em> before </em> sales tax is calculated, which can save you hundreds
        in taxes. A cash down payment, by contrast, is applied after tax
        calculation.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How much car can I afford?</h3>
      <p>
        A common rule of thumb is that your total car payment (including
        insurance) should not exceed 10-15% of your take-home pay. For a
        $5,000/month take-home, that means a car payment of $500-750 at most.
        Also consider fuel, maintenance, and registration costs in your budget.
      </p>

      <h3>Should I lease or buy?</h3>
      <p>
        Leasing typically offers lower monthly payments and lets you drive a
        newer car every few years, but you build no equity and face mileage
        restrictions. Buying costs more per month but is cheaper long-term,
        especially if you keep the car for 7+ years after paying it off.
      </p>

      <h3>Can I pay off my auto loan early?</h3>
      <p>
        Most auto loans allow early payoff without penalty, but check your
        contract for prepayment penalties. Paying extra toward principal each
        month — even $50-100 — can shave months off your loan and save
        hundreds in interest. Model different payoff strategies with our{" "}
        <Link
          href="/calculators/debt-payoff"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Debt Payoff Calculator
        </Link>
        .
      </p>

      <h3>What's GAP insurance and do I need it?</h3>
      <p>
        Guaranteed Asset Protection (GAP) insurance covers the difference
        between what you owe on the loan and what insurance pays if your car is
        totaled or stolen. It's worth considering if your down payment is
        less than 20% or your loan term is longer than 60 months, since
        you're more likely to be upside down on the loan.
      </p>
    </>
  );
}
