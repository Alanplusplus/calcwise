import Link from "next/link";
import Image from "next/image";

export function StudentLoanArticle() {
  return (
    <>
      <Image
        src="/images/student-loan-infographic.webp"
        alt="Student loan repayment strategy comparison showing monthly payments, total interest, and payoff timelines for standard, extended, and accelerated plans"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <h2>How Student Loan Interest Works</h2>
      <p>
        Student loan interest accrues on your outstanding principal balance each
        day, but most borrowers experience it as a monthly charge on their
        statement. For fixed-rate loans, your interest rate stays the same for
        the life of the loan. The lender converts your annual rate into a daily
        rate by dividing by 365, then multiplies that rate by your current
        balance each day. At the end of the billing cycle, those daily charges
        are summed and added to your account.
      </p>
      <p>
        Unlike credit cards, student loans use simple interest on a declining
        balance through amortization. Each monthly payment is split between
        interest and principal. Early payments are heavily weighted toward
        interest — on a $35,000 loan at 5.5% over 10 years, your first payment
        of roughly $380 includes about $160 in interest and only $220 toward
        principal. As the balance drops, the interest portion shrinks and more
        of each payment attacks the principal directly.
      </p>
      <p>
        This structure means the total interest you pay depends on three
        variables: your starting balance, your interest rate, and how long you
        take to repay. Extending your term lowers monthly payments but
        dramatically increases total interest. Understanding this tradeoff is
        the foundation of every smart repayment decision. Use our calculator
        above to see exactly how your balance, rate, and term interact for
        your specific situation.
      </p>

      <h2>Federal vs Private Student Loans</h2>
      <p>
        Federal student loans are issued by the U.S. Department of Education and
        come with borrower protections that private loans rarely match. They
        include fixed interest rates set by Congress, income-driven repayment
        plans, Public Service Loan Forgiveness (PSLF), deferment and forbearance
        options, and no credit check for most undergraduate borrowers. Direct
        Subsidized Loans do not accrue interest while you are enrolled at least
        half-time, which can save thousands compared to unsubsidized loans that
        capitalize interest at graduation.
      </p>
      <p>
        Private student loans are issued by banks, credit unions, and online
        lenders. Rates are typically variable or fixed based on your credit
        score and cosigner strength. A borrower with excellent credit might
        qualify for rates near 4-6%, while those with thin credit files could
        face rates of 10% or higher. Private loans generally lack income-driven
        repayment, loan forgiveness programs, and flexible deferment. If you
        have both federal and private loans, prioritize understanding the terms
        of each before choosing a repayment strategy.
      </p>
      <p>
        A common mistake is refinancing federal loans into a private loan to
        get a lower rate without weighing the lost protections. If you work in
        public service, expect income fluctuations, or might need deferment,
        keeping federal loans in the federal system is often the better choice
        even at a slightly higher rate.
      </p>

      <h2>Repayment Plan Options</h2>
      <p>
        Federal borrowers can choose from several repayment plans, each designed
        for different financial situations. The Standard Repayment Plan spreads
        payments evenly over 10 years — the fastest option for paying the least
        total interest. The Graduated Repayment Plan starts with lower payments
        that increase every two years, useful for borrowers who expect rising
        income but want to stay on a 10-year track.
      </p>
      <p>
        Extended Repayment stretches payments over 25 years, cutting monthly
        bills but adding substantial interest. Income-Driven Repayment (IDR) plans
        — including SAVE, PAYE, IBR, and ICR — cap payments at a percentage of
        discretionary income and forgive remaining balances after 20 or 25 years
        of qualifying payments. These plans can reduce monthly payments to zero
        for low earners but may result in a larger forgiven balance that is
        treated as taxable income.
      </p>
      <p>
        Private loan borrowers have fewer options. Most lenders offer standard
        fixed repayment over 5 to 15 years. Some allow interest-only payments
        during school or a short grace period. If you need flexibility, contact
        your servicer directly — many offer temporary hardship programs even
        though they are not required by law.
      </p>

      <h2>Case Study: Sarah, a 25-Year-Old Software Engineer</h2>
      <p>
        Sarah graduated with $42,000 in federal student loans at a weighted
        average rate of 5.8%. Her first job pays $78,000 per year, and after
        taxes and rent she has about $900 per month available for loan payments.
        On the Standard 10-year plan, her monthly payment would be approximately
        $462, leaving room in her budget for savings and discretionary spending.
      </p>
      <p>
        Sarah considered switching to an Extended 25-year plan to free up $200
        per month. That would drop her payment to roughly $265, but her total
        interest would jump from about $13,400 to over $37,500 — an extra
        $24,000 in cost for modest monthly relief. She decided to stay on the
        Standard plan and add a $100 extra payment each month toward principal.
      </p>
      <p>
        With the extra $100, Sarah pays off her loans in roughly 7 years and 8
        months instead of 10 years, saving approximately $3,800 in interest. She
        also redirects the freed-up $562 monthly payment toward her{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          compound interest
        </Link>{" "}
        investment account once the loans are gone. By age 33, she is
        debt-free and has built a portfolio that would not have been possible
        if she had stretched her loans over 25 years.
      </p>

      <h2>Comparison: Standard vs Extended vs Income-Driven</h2>
      <p>
        The table below compares three common approaches for a $35,000 loan at
        5.5% interest. Income-driven figures assume a borrower earning $45,000
        with a monthly payment of approximately $150 under SAVE.
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 pr-4 text-left font-semibold">Plan</th>
            <th className="py-2 pr-4 text-left font-semibold">Monthly Payment</th>
            <th className="py-2 pr-4 text-left font-semibold">Payoff Timeline</th>
            <th className="py-2 text-left font-semibold">Total Interest</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Standard (10-year)</td>
            <td className="py-2 pr-4">$380</td>
            <td className="py-2 pr-4">10 years</td>
            <td className="py-2">$10,600</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Extended (25-year)</td>
            <td className="py-2 pr-4">$215</td>
            <td className="py-2 pr-4">25 years</td>
            <td className="py-2">$29,500</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Income-Driven (SAVE)</td>
            <td className="py-2 pr-4">$150</td>
            <td className="py-2 pr-4">20-25 years</td>
            <td className="py-2">Varies; balance may be forgiven</td>
          </tr>
        </tbody>
      </table>
      <p>
        The Standard plan costs the least in total interest. Extended repayment
        nearly triples interest cost for a 43% lower monthly payment. IDR plans
        trade higher long-term cost (or forgiven balance) for payment flexibility
        when income is limited. Run your own numbers with our calculator to see
        where extra payments shift the balance.
      </p>

      <h2>Tips for Faster Payoff</h2>
      <p>
        Paying off student loans faster starts with a clear target. List every
        loan, its balance, rate, and servicer. If you have multiple loans, use
        the{" "}
        <Link
          href="/guides/debt-avalanche-vs-snowball"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          avalanche method
        </Link>{" "}
        (highest rate first) to minimize total interest, or the snowball method
        (smallest balance first) if quick wins keep you motivated. Our{" "}
        <Link
          href="/calculators/debt-payoff"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Debt Payoff Calculator
        </Link>{" "}
        can model both strategies across multiple debts.
      </p>
      <p>
        Make extra payments toward principal, not future bills. Contact your
        servicer to confirm extra amounts apply to principal immediately rather
        than advancing your due date. Even $50 per month on a $35,000 loan at
        5.5% saves over $2,000 in interest and cuts roughly 18 months off a
        10-year term. Apply windfalls — tax refunds, bonuses, side income —
        directly to your highest-rate loan.
      </p>
      <p>
        Avoid diverting loan payment money toward lower-priority spending. If
        your loans are your highest-rate debt, they deserve priority over
        discretionary purchases. If you also carry credit card debt at 20%+
        APR, tackle that first using our{" "}
        <Link
          href="/calculators/credit-card-payoff"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Credit Card Payoff Calculator
        </Link>
        , then redirect those payments to student loans. Once loans are gone,
        redirect the full payment amount to investing — see{" "}
        <Link
          href="/guides/compound-interest-real-examples"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          compound interest in real examples
        </Link>{" "}
        for how early investing compounds over decades.
      </p>
      <p>
        Consider whether refinancing makes sense only after evaluating federal
        protections. Autopay discounts of 0.25% are offered by most servicers and
        private lenders — a small but effortless saving. Set calendar reminders
        to recheck your strategy annually as income and rates change.
      </p>

      <h2>Frequently Asked Questions</h2>
      <h3>Should I pay off student loans or invest?</h3>
      <p>
        Compare your loan interest rate to expected investment returns after
        taxes. If your loans are at 5-7% and you can earn 8-10% long-term in a
        diversified portfolio, investing while making minimum payments may
        build more wealth. If your loans are above 7% or you value the
        guaranteed return of being debt-free, prioritize payoff. Many borrowers
        split the difference: minimum payments plus retirement match, then
        extra toward loans.
      </p>
      <h3>What happens if I miss a student loan payment?</h3>
      <p>
        Federal loans enter delinquency after one missed payment and default
        after 270 days. Consequences include damaged credit, wage garnishment,
        and loss of eligibility for deferment and forgiveness. Private lenders
        may report delinquency after 30 days and pursue collections sooner.
        Contact your servicer immediately if you anticipate difficulty — IDR
        plans and temporary forbearance exist specifically for this situation.
      </p>
      <h3>Can I deduct student loan interest on my taxes?</h3>
      <p>
        You may deduct up to $2,500 in student loan interest per year if your
        modified adjusted gross income is below the phase-out threshold
        ($165,000 for married filing jointly in 2026). The deduction is
        above-the-line, meaning you do not need to itemize. It reduces your
        taxable income, not your tax dollar-for-dollar — a $2,500 deduction
        saves roughly $550-$925 depending on your tax bracket.
      </p>
      <h3>Is Public Service Loan Forgiveness worth pursuing?</h3>
      <p>
        PSLF forgives remaining federal Direct Loan balances after 120 qualifying
        payments while working full-time for a qualifying employer (government,
        nonprofits, etc.). If you work in public service and have high loan
        balances relative to income, PSLF can save tens of thousands. Enroll in
        an IDR plan, certify employment annually, and keep meticulous records.
        For high earners in the private sector, aggressive payoff often
        outperforms PSLF timelines.
      </p>
      <h3>Does paying extra on student loans hurt my credit score?</h3>
      <p>
        No. Paying extra reduces your balance and improves your debt-to-income
        ratio, both positive for credit health. Closing student loan accounts
        may cause a small temporary dip because you lose an active installment
        account, but the long-term benefit of lower debt outweighs this effect.
        Keep other credit accounts open and in good standing to maintain a
        strong score after payoff.
      </p>
    </>
  );
}
