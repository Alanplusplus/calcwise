import Link from "next/link";
import Image from "next/image";

export function AmortizationArticle() {
  return (
    <>
      <Image
        src="/images/amortization-infographic.webp"
        alt="Amortization schedule infographic showing how a $250,000 loan at 6.5% breaks down into principal and interest over 30 years with monthly payment timeline"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <h2>How Amortization Works</h2>
      <p>
        Amortization is the process of spreading a loan into a series of fixed
        payments over time. Each payment covers two components: interest charged
        on the outstanding balance and a portion that reduces the principal.
        Because interest is calculated on the remaining balance, early payments
        are heavily weighted toward interest while later payments apply mostly
        to principal. On a $250,000 mortgage at 6.5% over 30 years, your first
        monthly payment of $1,580.17 allocates $1,354.17 to interest and only
        $226.00 to principal. By month 180 (halfway through), the split is
        roughly 50/50. In the final year, nearly the entire payment reduces
        your balance.
      </p>
      <p>
        Understanding this front-loaded interest structure is essential for
        making informed decisions about refinancing, extra payments, and loan
        term selection. Use our{" "}
        <Link
          href="/calculators/mortgage"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Mortgage Calculator
        </Link>{" "}
        to see how different rates and terms affect your monthly payment before
        generating the full amortization schedule here.
      </p>

      <h2>The Amortization Formula</h2>
      <p>
        The standard amortization formula calculates the fixed monthly payment
        (M) from three inputs: the loan principal (P), the monthly interest
        rate (r = annual rate / 12), and the total number of payments (n =
        years x 12):
      </p>
      <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-sm">
        M = P x [r(1 + r)^n] / [(1 + r)^n - 1]
      </p>
      <p>
        For a $250,000 loan at 6.5% APR over 30 years: r = 0.065/12 = 0.005417,
        n = 360. Plugging in: M = $250,000 x [0.005417 x (1.005417)^360] /
        [(1.005417)^360 - 1] = $1,580.17 per month. The total paid over the
        life of the loan is $1,580.17 x 360 = $568,861, meaning you pay
        $318,861 in interest alone, more than the original loan amount.
      </p>

      <h2>Case Study: David and Lisa Compare Loan Strategies</h2>
      <p>
        David and Lisa are purchasing a $350,000 home in Austin, TX, with a
        $70,000 down payment, leaving a $280,000 mortgage. They have been
        approved for 6.75% APR and are deciding between a 30-year and a 15-year
        term. They also want to understand the impact of making an extra $200
        per month in principal payments on the 30-year option.
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 pr-4 text-left font-semibold">Scenario</th>
            <th className="py-2 pr-4 text-left font-semibold">Monthly Payment</th>
            <th className="py-2 pr-4 text-left font-semibold">Total Interest</th>
            <th className="py-2 text-left font-semibold">Payoff Time</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">30-year standard</td>
            <td className="py-2 pr-4">$1,816</td>
            <td className="py-2 pr-4">$373,702</td>
            <td className="py-2">30 years</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">30-year + $200 extra/mo</td>
            <td className="py-2 pr-4">$2,016</td>
            <td className="py-2 pr-4">$270,418</td>
            <td className="py-2">23 years 4 months</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">15-year fixed</td>
            <td className="py-2 pr-4">$2,478</td>
            <td className="py-2 pr-4">$166,038</td>
            <td className="py-2">15 years</td>
          </tr>
        </tbody>
      </table>
      <p>
        The 15-year option saves $207,664 in interest compared to the standard
        30-year mortgage, but the $662 higher monthly payment ($2,478 vs.
        $1,816) strains their $5,800 monthly take-home budget. The compromise
        option of a 30-year mortgage with $200/month extra payments reduces
        interest by $103,284 and shortens the loan by nearly 7 years, while
        keeping mandatory payments manageable if one spouse loses income. David
        and Lisa chose the 30-year with extra payments because it offered
        flexibility: they can stop extra payments during tight months without
        risk of default.
      </p>

      <h2>30-Year vs. 15-Year vs. 20-Year: Amortization Compared</h2>
      <p>
        The loan term determines how quickly equity builds and how much total
        interest you pay. Shorter terms mean higher monthly payments but
        dramatically less interest over the life of the loan. Here is a
        side-by-side comparison for a $300,000 loan at 6.5%.
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 pr-4 text-left font-semibold">Metric</th>
            <th className="py-2 pr-4 text-left font-semibold">30-Year</th>
            <th className="py-2 pr-4 text-left font-semibold">20-Year</th>
            <th className="py-2 text-left font-semibold">15-Year</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Monthly payment</td>
            <td className="py-2 pr-4">$1,896</td>
            <td className="py-2 pr-4">$2,239</td>
            <td className="py-2">$2,613</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Total interest</td>
            <td className="py-2 pr-4">$382,633</td>
            <td className="py-2 pr-4">$237,360</td>
            <td className="py-2">$170,340</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Total cost</td>
            <td className="py-2 pr-4">$682,633</td>
            <td className="py-2 pr-4">$537,360</td>
            <td className="py-2">$470,340</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Interest as % of loan</td>
            <td className="py-2 pr-4">127.5%</td>
            <td className="py-2 pr-4">79.1%</td>
            <td className="py-2">56.8%</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Equity at year 5</td>
            <td className="py-2 pr-4">$19,632</td>
            <td className="py-2 pr-4">$39,816</td>
            <td className="py-2">$55,680</td>
          </tr>
        </tbody>
      </table>
      <p>
        The 30-year loan costs $212,293 more in interest than the 15-year
        option. However, the $717 monthly savings ($2,613 - $1,896) invested in
        an S&P 500 index fund averaging 10% annually would grow to approximately
        $480,000 over 30 years. This is why the{" "}
        <Link
          href="/guides/pay-off-mortgage-early-vs-invest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          pay-off-early vs. invest decision
        </Link>{" "}
        depends on your expected investment returns relative to your mortgage
        rate.
      </p>

      <h2>The Power of Extra Payments</h2>
      <p>
        Even small additional principal payments produce outsized savings because
        they reduce the balance that accrues interest for every remaining month.
        On a $250,000 loan at 6.5% over 30 years, here is what different extra
        payment amounts achieve:
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 pr-4 text-left font-semibold">Extra/Month</th>
            <th className="py-2 pr-4 text-left font-semibold">Interest Saved</th>
            <th className="py-2 pr-4 text-left font-semibold">Months Saved</th>
            <th className="py-2 text-left font-semibold">New Payoff</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">$0 (baseline)</td>
            <td className="py-2 pr-4">--</td>
            <td className="py-2 pr-4">--</td>
            <td className="py-2">30 years</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">$100</td>
            <td className="py-2 pr-4">$62,718</td>
            <td className="py-2 pr-4">62</td>
            <td className="py-2">24 years 10 months</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">$250</td>
            <td className="py-2 pr-4">$117,210</td>
            <td className="py-2 pr-4">115</td>
            <td className="py-2">20 years 5 months</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">$500</td>
            <td className="py-2 pr-4">$170,392</td>
            <td className="py-2 pr-4">163</td>
            <td className="py-2">16 years 5 months</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">$1,000</td>
            <td className="py-2 pr-4">$222,818</td>
            <td className="py-2 pr-4">218</td>
            <td className="py-2">11 years 10 months</td>
          </tr>
        </tbody>
      </table>
      <p>
        The first $100 extra provides the best return per dollar: $627 saved for
        every $1 of monthly extra payment, cutting more than 5 years off the
        loan. Diminishing returns set in at higher amounts, but even $250/month
        extra eliminates nearly a decade of payments. Consider biweekly payments
        as an effortless strategy: paying half your monthly amount every two
        weeks results in 26 half-payments (13 full payments) per year instead of
        12, effectively making one extra payment annually.
      </p>

      <h2>Reading Your Amortization Schedule</h2>
      <p>
        An amortization table shows every payment over the life of your loan,
        broken into principal, interest, and remaining balance columns. The key
        patterns to watch for:
      </p>
      <p>
        <strong>The crossover point.</strong> This is the month where your
        principal payment first exceeds your interest payment. On a 30-year
        mortgage at 6.5%, the crossover happens around month 208 (year 17). Any
        payment before the crossover is majority interest. Refinancing before
        the crossover restarts the interest-heavy cycle, which is why
        refinancing a 30-year mortgage after 15 years often costs more than it
        saves unless the rate drop is substantial.
      </p>
      <p>
        <strong>Equity milestones.</strong> Track when you reach 20% equity
        to eliminate PMI (private mortgage insurance) on conventional loans. On
        a $300,000 home with $15,000 down (5%), you need to reach $60,000 in
        equity. At 6.5% on a 30-year loan, this takes approximately 9.5 years
        with standard payments, but just 5.5 years with $300/month extra. Use
        our{" "}
        <Link
          href="/calculators/auto-loan"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Auto Loan Calculator
        </Link>{" "}
        to generate amortization schedules for car loans and compare the
        interest impact of shorter terms.
      </p>

      <h2>When to Refinance Based on Your Amortization Schedule</h2>
      <p>
        Your amortization schedule reveals whether refinancing makes financial
        sense. The general rule is that refinancing saves money if the new rate
        is at least 0.75-1% lower than your current rate and you plan to stay in
        the home long enough to recoup closing costs (typically 2-5% of the loan
        amount). However, where you stand in the amortization schedule matters
        more than most people realize.
      </p>
      <p>
        If you are in years 1-10 of a 30-year mortgage, you are paying mostly
        interest. Refinancing to a lower rate dramatically reduces total interest
        because the principal reductions in the new schedule are larger from the
        start. If you are in years 15-25, you have already paid the bulk of the
        interest. Refinancing resets the amortization clock, and the new schedule
        front-loads interest again on your remaining balance, often negating the
        rate savings. Compare both scenarios with our{" "}
        <Link
          href="/calculators/loan-comparison"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Loan Comparison Calculator
        </Link>{" "}
        before committing to a refinance.
      </p>

      <h2>Tips for Using Amortization to Your Advantage</h2>
      <p>
        <strong>Make one extra payment per year.</strong> If your monthly
        payment is $1,580, putting an additional $1,580 toward principal once a
        year (perhaps from a tax refund or bonus) can cut 4-5 years off a
        30-year mortgage and save over $50,000 in interest. Specify that the
        extra payment applies to principal, not as a prepayment of the next
        month.
      </p>
      <p>
        <strong>Round up your payment.</strong> Rounding from $1,580 to $1,600
        adds just $20/month extra but saves approximately $13,000 in interest
        and eliminates 14 months of payments on a $250,000 loan at 6.5%. This
        approach works because every dollar of extra principal reduces the
        interest charged on every subsequent payment.
      </p>
      <p>
        <strong>Recast instead of refinancing.</strong> Some lenders allow
        recasting: after making a large lump-sum principal payment, they
        recalculate your monthly payment based on the reduced balance while
        keeping the same rate and term. This avoids the $3,000-$8,000 in
        closing costs associated with refinancing. Use our{" "}
        <Link
          href="/guides/15-year-vs-30-year-mortgage"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          15-year vs. 30-year mortgage guide
        </Link>{" "}
        to understand how term length affects the amortization dynamics.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between an amortization schedule and a loan statement?</h3>
      <p>
        An amortization schedule is a projected table showing every payment for
        the full life of the loan, assuming you make all payments on time and
        make no extra payments. A loan statement shows actual payments made,
        including any missed payments, late fees, extra payments, or escrow
        adjustments. The amortization schedule is your roadmap; the loan
        statement shows where you actually are. If you have made extra payments,
        your actual balance will be lower than what the original amortization
        schedule projected.
      </p>

      <h3>Does an amortization schedule work for adjustable-rate mortgages (ARMs)?</h3>
      <p>
        A standard amortization schedule assumes a fixed interest rate. For
        ARMs, the schedule is accurate only through the initial fixed-rate
        period (typically 5, 7, or 10 years). After the rate adjusts, the
        monthly payment and principal/interest split change. You can use this
        calculator to model different rate scenarios by generating separate
        schedules: one at the initial rate for the fixed period, and another at
        the expected adjusted rate for the remaining term.
      </p>

      <h3>Why do I pay more interest than principal in the first years?</h3>
      <p>
        Interest is calculated on the outstanding balance each month. At the
        start of a $250,000 loan at 6.5%, you owe interest on the full
        $250,000, which is $1,354/month. Since the total payment is $1,580,
        only $226 goes to principal. As the balance drops, less interest accrues
        each month, freeing up more of each payment for principal reduction.
        This is mathematically inherent to how fixed-payment amortization works
        and is not a lender trick, though it does mean early principal paydowns
        have the largest impact on total interest savings.
      </p>

      <h3>Can I use an amortization schedule for student loans or car loans?</h3>
      <p>
        Yes. The amortization formula works identically for any fixed-rate,
        fixed-term installment loan, including mortgages, auto loans, personal
        loans, and student loans. Enter the loan amount, interest rate, and term
        in years. The only difference is the typical term length: 3-7 years for
        auto loans, 10-25 years for student loans, and 15-30 years for
        mortgages. Shorter-term loans have a less dramatic interest front-loading
        effect because the balance decreases faster.
      </p>

      <h3>How do biweekly payments affect the amortization schedule?</h3>
      <p>
        Biweekly payments split your monthly payment in half and pay it every
        two weeks. Since there are 52 weeks in a year, you make 26 half-payments
        (equivalent to 13 full monthly payments) instead of 12. That extra
        payment goes entirely to principal. On a $250,000 loan at 6.5% for 30
        years, biweekly payments reduce the payoff time to approximately 25
        years and save about $62,000 in interest. The effect is essentially
        identical to making one extra monthly payment per year but is easier
        to budget for most people.
      </p>
    </>
  );
}
