import Link from "next/link";
import Image from "next/image";
import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET, MORTGAGE_MARKET_SOURCES } from "@/lib/market-data";

const PMI_SOURCES = [
  {
    label: "CFPB — When can I remove private mortgage insurance (PMI) from my loan?",
    href: "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/",
  },
  {
    label: "Fannie Mae — What to Know About PMI",
    href: "https://yourhome.fanniemae.com/buy/private-mortgage-insurance",
  },
];

export function AmortizationArticle() {
  return (
    <>
      <Image
        src="/images/amortization-infographic.webp"
        alt="Amortization schedule infographic showing how a $250,000 loan at 7.40% breaks down into principal and interest over 30 years with monthly payment timeline"
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
        to principal. The calculator above defaults to{" "}
        {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% — the Freddie Mac PMMS 30-year
        fixed average for the week of {MORTGAGE_MARKET.asOfLabel}. On a
        $250,000 loan over 30 years at that rate, your first monthly payment of
        $1,730.95 allocates $1,541.67 to interest and only $189.28 to principal.
        By month 180 you still pay about $1,162 in interest versus $569 in
        principal; principal does not exceed interest until around month 249. In
        the final year, nearly the entire payment reduces your balance.
      </p>
      <Sources
        items={MORTGAGE_MARKET_SOURCES}
        checked={MORTGAGE_MARKET.checkedLabel}
      />
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
        For a $250,000 loan at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% APR over
        30 years: r = 0.074/12 = 0.006167, n = 360. Plugging in: M = $250,000
        x [0.006167 x (1.006167)^360] / [(1.006167)^360 - 1] = $1,730.95 per
        month. The total paid over the life of the loan is $1,730.95 x 360 =
        $623,142, meaning you pay $373,142 in interest alone, more than the
        original loan amount.
      </p>

      <h2>Case Study: David and Lisa Compare Loan Strategies</h2>
      <p>
        David and Lisa are purchasing a $350,000 home in Austin, TX, with a
        $70,000 down payment, leaving a $280,000 mortgage. They have been
        using Freddie Mac PMMS benchmarks for the week of{" "}
        {MORTGAGE_MARKET.asOfLabel}: {MORTGAGE_MARKET.thirtyYear.toFixed(2)}%
        on a 30-year fixed and {MORTGAGE_MARKET.fifteenYear.toFixed(2)}% on a
        15-year fixed. They want to compare those terms and see what an extra
        $200 per month in principal payments would do on the 30-year option.
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
            <td className="py-2 pr-4">$1,939</td>
            <td className="py-2 pr-4">$417,919</td>
            <td className="py-2">30 years</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">30-year + $200 extra/mo</td>
            <td className="py-2 pr-4">$2,139</td>
            <td className="py-2 pr-4">$292,929</td>
            <td className="py-2">22 years 4 months</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">15-year fixed</td>
            <td className="py-2 pr-4">$2,472</td>
            <td className="py-2 pr-4">$164,877</td>
            <td className="py-2">15 years</td>
          </tr>
        </tbody>
      </table>
      <p>
        The 15-year option saves $253,041 in interest compared to the standard
        30-year mortgage, but the $533 higher monthly payment ($2,472 vs.
        $1,939) strains their $5,800 monthly take-home budget. The compromise
        option of a 30-year mortgage with $200/month extra payments reduces
        interest by $124,990 and shortens the loan by about 7 years 8 months,
        while keeping mandatory payments manageable if one spouse loses income.
        David
        and Lisa chose the 30-year with extra payments because it offered
        flexibility: they can stop extra payments during tight months without
        risk of default.
      </p>

      <h2>30-Year vs. 15-Year vs. 20-Year: Amortization Compared</h2>
      <p>
        The loan term determines how quickly equity builds and how much total
        interest you pay. Shorter terms mean higher monthly payments but
        dramatically less interest over the life of the loan. Here is a
        side-by-side comparison for a $300,000 loan: 30- and 20-year terms at
        the {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% PMMS 30-year average, and
        a 15-year term at the {MORTGAGE_MARKET.fifteenYear.toFixed(2)}% PMMS
        15-year average.
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
            <td className="py-2 pr-4">$2,077</td>
            <td className="py-2 pr-4">$2,398</td>
            <td className="py-2">$2,648</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Total interest</td>
            <td className="py-2 pr-4">$447,770</td>
            <td className="py-2 pr-4">$275,633</td>
            <td className="py-2">$176,654</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Total cost</td>
            <td className="py-2 pr-4">$747,770</td>
            <td className="py-2 pr-4">$575,633</td>
            <td className="py-2">$476,654</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Interest as % of loan</td>
            <td className="py-2 pr-4">149.3%</td>
            <td className="py-2 pr-4">91.9%</td>
            <td className="py-2">58.9%</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Equity at year 5</td>
            <td className="py-2 pr-4">$16,431</td>
            <td className="py-2 pr-4">$39,676</td>
            <td className="py-2">$68,968</td>
          </tr>
        </tbody>
      </table>
      <p>
        The 30-year loan costs $271,116 more in interest than the 15-year
        option. However, the $571 monthly savings ($2,648 - $2,077) invested at
        a 7% annual return (a conservative long-run planning assumption, not a
        guarantee) would grow to about $697,000 over 30 years; at 10% it would
        reach about $1.29 million. This is why the{" "}
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
        On a $250,000 loan at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% over 30
        years, here is what different extra payment amounts achieve:
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
            <td className="py-2 pr-4">$73,598</td>
            <td className="py-2 pr-4">59</td>
            <td className="py-2">25 years 1 month</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">$250</td>
            <td className="py-2 pr-4">$137,811</td>
            <td className="py-2 pr-4">115</td>
            <td className="py-2">20 years 5 months</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">$500</td>
            <td className="py-2 pr-4">$196,916</td>
            <td className="py-2 pr-4">168</td>
            <td className="py-2">16 years 0 months</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">$1,000</td>
            <td className="py-2 pr-4">$253,860</td>
            <td className="py-2 pr-4">224</td>
            <td className="py-2">11 years 4 months</td>
          </tr>
        </tbody>
      </table>
      <p>
        The first $100 extra provides the best return per dollar: about $736
        saved for every $1 of monthly extra payment, cutting nearly 5 years off
        the
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
        mortgage at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}%, the crossover
        happens around month 249 (year 21). Any
        payment before the crossover is majority interest. Refinancing before
        the crossover restarts the interest-heavy cycle, which is why
        refinancing a 30-year mortgage after 15 years often costs more than it
        saves unless the rate drop is substantial.
      </p>
      <p>
        <strong>Equity milestones.</strong> Track when you reach 20% equity
        to eliminate PMI (private mortgage insurance) on conventional loans. On
        a $300,000 home with $15,000 down (5%), you need to reach $60,000 in
        equity. At {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% on a 30-year loan,
        this takes approximately 11 years 3 months with standard payments, but
        about 5 years 11 months with $300/month extra. On conventional loans, PMI
        must also terminate automatically once the balance reaches 78% of the
        home's original value if you are current. See our{" "}
        <Link
          href="/guides/amortization-schedule-explained"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          amortization schedule guide
        </Link>{" "}
        for how to read each column, or use our{" "}
        <Link
          href="/calculators/auto-loan"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Auto Loan Calculator
        </Link>{" "}
        for shorter-term car-loan schedules.
      </p>
      <Sources items={PMI_SOURCES} checked="October 2026" />

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
        payment is $1,731, putting an additional $1,731 toward principal once a
        year (perhaps from a tax refund or bonus) can shorten a 30-year mortgage
        by about 6 years 4 months and save roughly $93,000 in interest. Specify that the
        extra payment applies to principal, not as a prepayment of the next
        month.
      </p>
      <p>
        <strong>Round up your payment.</strong> Rounding from $1,731 to $1,750
        adds just $20/month extra but saves approximately $18,000 in interest
        and eliminates 14 months of payments on a $250,000 loan at{" "}
        {MORTGAGE_MARKET.thirtyYear.toFixed(2)}%. This
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
        start of a $250,000 loan at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}%,
        you owe interest on the full $250,000, which is about $1,542/month.
        Since the total payment is $1,731, only $189 goes to principal. As the
        balance drops, less interest accrues
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
        payment goes entirely to principal. On a $250,000 loan at{" "}
        {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% for 30 years, biweekly payments
        reduce the payoff time to approximately 23 years 3 months and save
        about $100,000 in interest (half your monthly payment every two weeks
        equals 13 full payments per year with earlier paydown). The effect is
        similar to, but slightly faster than, one lump-sum extra payment per year.
      </p>
    </>
  );
}
