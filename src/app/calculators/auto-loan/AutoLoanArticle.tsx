import Link from "next/link";
import { Sources } from "@/components/Sources";
import { DEFAULT_NEW_CAR_APR } from "@/lib/market-data";

export function AutoLoanArticle() {
  return (
    <>
      <h2>How Auto Loan Payments Are Calculated</h2>
      <p>
        Auto loan payments use the same fixed-rate amortization formula as other
        installment loans. Each month you pay interest on the remaining balance
        plus principal that reduces what you owe. Early payments are
        interest-heavy; later payments retire principal faster. For home loans,
        see our{" "}
        <Link
          href="/calculators/mortgage"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Mortgage Calculator
        </Link>
        .
      </p>
      <p>
        <strong>M = P × [r(1+r)^n] / [(1+r)^n − 1]</strong>
      </p>
      <ul>
        <li><strong>M</strong> = monthly payment</li>
        <li><strong>P</strong> = loan principal (vehicle price + tax − down payment − trade-in)</li>
        <li><strong>r</strong> = monthly interest rate (annual APR ÷ 12)</li>
        <li><strong>n</strong> = number of monthly payments</li>
      </ul>
      <p>
        With this calculator's default inputs — $35,000 vehicle, $5,000 down, 7%
        sales tax, {DEFAULT_NEW_CAR_APR}% APR, and a 60-month term — you finance
        $32,450 and pay about $651 per month. Total interest over five years is
        roughly $6,601 on top of the principal.
      </p>

      <h2>Auto Loan Rates in October 2026</h2>
      <p>
        Lenders price auto loans from your credit profile, the vehicle age, and
        the loan term. Market benchmarks help you judge a dealer or credit-union
        quote. The Federal Reserve's G.19 Consumer Credit release (August 2026
        data, published October 7, 2026) shows commercial banks charging 7.54%
        on average for 60-month new-car loans and 7.17% on 72-month new-car
        loans. Finance companies reported a 6.31% amount-weighted average on
        new-car paper in June 2026 (latest finance-company rate in that release).
      </p>
      <p>
        Experian's State of the Automotive Finance Market for Q2 2026 puts the
        average new-car APR at 6.35%, average used-car APR at 11.19%, and
        average new-car payments at $765 on roughly $43,610 borrowed over 69.5
        months. Edmunds' Q3 2026 finance data shows a 7.0% average APR on
        financed new purchases, a record $787 average monthly payment, and 25.5%
        of new-car buyers choosing loan terms of 84 months or longer.
      </p>
      <Sources
        items={[
          {
            label: "Federal Reserve G.19 Consumer Credit (Aug. 2026, released Oct. 7, 2026)",
            href: "https://www.federalreserve.gov/releases/g19/current/",
          },
          {
            label: "Experian — Auto Loan Rates and Financing (Q2 2026)",
            href: "https://www.experian.com/blogs/ask-experian/auto-loan-rates-financing/",
          },
          {
            label: "Edmunds — Q3 2026 new-car finance averages (Oct. 1, 2026)",
            href: "https://www.edmunds.com/press/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html",
          },
          {
            label: "Kelley Blue Book / Cox Automotive — Sept. 2026 average transaction price",
            href: "https://www.coxautoinc.com/insights/sept-2026-atp-report/",
          },
        ]}
        checked="October 2026"
        note="Kelley Blue Book reported a $50,562 industry average new-vehicle transaction price in September 2026."
      />

      <h2>What Affects Your Auto Loan Rate?</h2>
      <ul>
        <li>
          <strong>Credit score:</strong> Experian's Q2 2026 averages range from
          4.41% APR on new cars for super-prime borrowers (781+) to 16.11% for
          deep-subprime new-car loans. Used-car spreads run wider (6.29% to
          21.62% across the same tiers).
        </li>
        <li>
          <strong>Loan term:</strong> G.19 data show 72-month bank rates (7.17%
          in August 2026) below 60-month rates (7.54%) in the same release — but
          longer terms still increase total interest and negative-equity risk.
        </li>
        <li>
          <strong>New vs. used:</strong> Edmunds' Q3 2026 used-car finance
          average APR was 10.6% versus 7.0% for new — plan for a higher coupon
          on a $15,000–$20,000 used compact.
        </li>
        <li>
          <strong>Down payment:</strong> Edmunds reports average new-car down
          payments near $5,554 in Q3 2026. Putting 20% down on a $35,000
          purchase ($7,000) cuts the financed balance by $2,000 versus the
          calculator default and reduces interest by hundreds over 60 months.
        </li>
      </ul>

      <h2>Choosing the Right Loan Term</h2>
      <p>
        On a $30,000 loan balance at {DEFAULT_NEW_CAR_APR}% APR (near the G.19
        60-month bank average), monthly payments and total interest compare as
        follows:
      </p>
      <ul>
        <li><strong>36 months:</strong> $934/mo — $3,615 total interest</li>
        <li><strong>48 months:</strong> $726/mo — $4,845 total interest</li>
        <li><strong>60 months:</strong> $602/mo — $6,103 total interest</li>
        <li><strong>72 months:</strong> $519/mo — $7,388 total interest</li>
        <li><strong>84 months:</strong> $461/mo — $8,702 total interest</li>
      </ul>
      <p>
        Shorter terms cost more per month but save thousands in interest. Edmunds
        notes that among buyers with $1,000+ monthly payments in Q3 2026, 69%
        still chose terms of 72 months or longer — a sign that payment size, not
        total cost, is driving many decisions.
      </p>

      <h2>Case Study: Jordan Finances a Used Civic in Columbus</h2>
      <p>
        Jordan, a 32-year-old nurse in Columbus, Ohio, buys a certified 2022 Honda
        Civic for $18,500. She puts $3,700 down (20%), has no trade-in, and pays
        7% sales tax. Her credit union approves a 48-month used-car loan at 9.0%
        APR — below the Edmunds Q3 used average of 10.6% but above prime new-car
        rates.         She finances $16,095 and pays about $401 per month, with roughly
        $3,130 in total interest over four years.
      </p>
      <p>
        Jordan's payment sits near the Experian Q2 2026 average used-car payment
        ($542) because her purchase price and term are lower than the typical
        $27,852 used loan. She runs the same scenario in our{" "}
        <Link
          href="/calculators/car-affordability"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Car Affordability Calculator
        </Link>{" "}
        and keeps total car costs under 10% of her $62,000 gross income before
        adding the loan to her budget.
      </p>

      <h2>The Hidden Cost of Long-Term Auto Loans</h2>
      <ul>
        <li>
          <strong>Negative equity:</strong> Edmunds reports three-year-old
          vehicles retaining about 66% of original MSRP on average in Q1 2026 — a
          five-year low. A 72- or 84-month loan can leave you owing more than
          the car is worth for years if you put little down.
        </li>
        <li>
          <strong>Full coverage:</strong> Lenders require comprehensive and
          collision insurance for the life of the loan, which often runs
          $150–$225 per month nationally for full coverage on a newer car.
        </li>
        <li>
          <strong>Repair overlap:</strong> Factory bumper-to-bumper coverage
          often ends at 3 years/36,000 miles while Edmunds' Q3 average new loan
          term is 70.5 months — budget maintenance as the car ages.
        </li>
      </ul>

      <h2>How to Get the Best Deal</h2>
      <ul>
        <li>
          <strong>Get pre-approved</strong> before visiting the dealership, then
          compare the offer using our{" "}
          <Link
            href="/calculators/loan-comparison"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            Loan Comparison Calculator
          </Link>
          . Even a 1-point APR gap on a $25,000 balance over 60 months is worth
          about $700 in interest.
        </li>
        <li>
          <strong>Aim for 20% down</strong> on purchases near the Kelley Blue Book
          September 2026 compact-car average ($27,977) or compact-SUV average
          ($37,614) so your loan tracks depreciation.
        </li>
        <li>
          <strong>Compare lease vs. buy</strong> if you change cars every three
          years — our{" "}
          <Link
            href="/calculators/lease-vs-buy-car"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            Lease vs Buy Car Calculator
          </Link>{" "}
          models five-year net cost with equity on the buy side.
        </li>
        <li>
          <strong>Watch total interest, not just the payment.</strong> Edmunds
          pegs average total interest on a financed new purchase at a record
          $9,938 in Q3 2026 even though the average APR held at 7.0% — longer
          terms and larger amounts financed drive that figure.
        </li>
      </ul>

      <h2>Down Payment vs. Trade-in</h2>
      <p>
        Both reduce the amount you borrow. In many states, trade-in value is
        subtracted from the taxable price before sales tax is calculated, which
        can save hundreds compared with applying cash down after tax. Confirm
        your state's motor-vehicle tax rules on the purchase order before you
        sign.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What is a good auto loan rate in 2026?</h3>
      <p>
        For new cars, prime borrowers often see APRs between the Experian Q2
        market average (6.35%) and the G.19 commercial-bank 60-month average
        (7.54% in August 2026). Used-car buyers with strong credit might aim
        below Edmunds' Q3 used average (10.6%); near-prime used loans commonly
        land in the low double digits. Always compare the APR, not just the
        monthly payment.
      </p>

      <h3>How much car can I afford?</h3>
      <p>
        A common guideline keeps total vehicle costs (loan payment, insurance,
        fuel) under 10% of gross monthly income. On $65,000 per year ($5,417/mo
        gross), that is $542 per month for everything car-related. After $150
        each for insurance and fuel, about $242 remains for the loan payment —
        supporting roughly a $17,000 purchase with $5,000 down at {DEFAULT_NEW_CAR_APR}%
        over 60 months in this calculator.
      </p>

      <h3>Should I lease or buy?</h3>
      <p>
        Leasing trades equity for a lower payment and a new vehicle every few
        years; buying costs more per month but builds resale value. At the
        industry average new price near $50,562 (Kelley Blue Book, September
        2026), financing trends favor comparing both paths with your actual
        mileage and holding period.
      </p>

      <h3>Can I pay off my auto loan early?</h3>
      <p>
        Most auto loans allow extra principal payments without penalty, but read
        your contract. Adding $50 per month to the default $651 payment on a
        $32,450 balance at {DEFAULT_NEW_CAR_APR}% retires the loan months sooner
        and trims interest. Model strategies in our{" "}
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
        Guaranteed Asset Protection (GAP) covers the difference between your loan
        balance and the insurer's payout if the car is totaled or stolen.
        Consider it when you put less than 20% down or choose terms beyond 60
        months — especially on new vehicles that depreciate quickly in the first
        two years.
      </p>
    </>
  );
}
