import Link from "next/link";
import Image from "next/image";
import { Sources } from "@/components/Sources";
import { FEDERAL_UNDERGRAD_DIRECT_RATE_2026_27 } from "@/lib/market-data";

export function StudentLoanArticle() {
  return (
    <>
      <Image
        src="/images/student-loan-infographic.webp"
        alt="Comparison of 5-, 10-, and 15-year payoff timelines for a $35,000 student loan at 6.52% showing monthly payment, total interest, and total paid"
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
        interest — on a $35,000 loan at {FEDERAL_UNDERGRAD_DIRECT_RATE_2026_27}% over 10 years,
        your first payment of about $398 includes roughly $190 in interest and $208 toward
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

      <h2>2026–27 Federal Direct Loan Rates</h2>
      <p>
        For loans first disbursed July 1, 2026 through June 30, 2027, the U.S.
        Department of Education set fixed rates at {FEDERAL_UNDERGRAD_DIRECT_RATE_2026_27}% for
        undergraduate Direct Subsidized and Unsubsidized Loans, 8.07% for graduate
        Direct Unsubsidized Loans, and 9.07% for Direct PLUS Loans (based on the
        May 12, 2026 10-year Treasury auction plus statutory add-ons). Each loan
        keeps its rate for life. The calculator defaults to the undergraduate rate;
        enter your servicer's weighted average if you hold multiple disbursement
        years.
      </p>
      <Sources
        items={[
          {
            label:
              "FSA Partner Announcement GENERAL-26-33 (June 4, 2026) — 2026–27 Direct Loan rates",
            href: "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/interest-rates-federal-direct-loans-first-disbursed-between-july-1-2026-and-june-30-2027",
          },
          {
            label:
              "Federal Register annual rate notice (Sept. 10, 2026)",
            href: "https://www.federalregister.gov/documents/2026/09/10/2026-18493/annual-notice-of-interest-rates-for-fixed-rate-federal-student-loans-made-under-the-william-d-ford",
          },
        ]}
        checked="October 2026"
      />

      <h2>Federal vs Private Student Loans</h2>
      <p>
        Federal student loans are issued by the U.S. Department of Education and
        come with borrower protections that private loans rarely match. They
        include fixed interest rates set by formula each award year, income-driven
        and Repayment Assistance Plan (RAP) options, Public Service Loan Forgiveness
        (PSLF), deferment and forbearance options, and no credit check for most
        undergraduate borrowers. Direct Subsidized Loans do not accrue interest while
        you are enrolled at least half-time, which can save thousands compared to
        unsubsidized loans that capitalize interest at graduation.
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
        bills but adding substantial interest.         Income-driven repayment (IDR) plans — including the new Repayment Assistance
        Plan (RAP) available from July 1, 2026, plus PAYE, IBR, and ICR where you
        still qualify — tie payments to income and family size. The Saving on a
        Valuable Education (SAVE) Plan ended in March 2026 after a court order;
        borrowers formerly on SAVE must choose another plan. RAP uses 1–10% of
        adjusted gross income (with a $10 monthly floor and interest subsidies while
        payments stay current) and can run up to 30 years. New loans disbursed on
        or after July 1, 2026 generally must use RAP or the Tiered Standard plan.
      </p>
      <Sources
        items={[
          {
            label: "Federal Student Aid — SAVE Plan ended; choose a new plan",
            href: "https://studentaid.gov/articles/save/",
          },
          {
            label:
              "U.S. Department of Education — RAP and Tiered Standard (July 1, 2026)",
            href: "https://www.ed.gov/about/news/press-release/fact-sheet-trump-administration-making-higher-education-more-affordable-expanding-opportunity-and-simplifying-student-loan-repayment",
          },
        ]}
        checked="October 2026"
      />
      <p>
        Private loan borrowers have fewer options. Most lenders offer standard
        fixed repayment over 5 to 15 years. Some allow interest-only payments
        during school or a short grace period. If you need flexibility, contact
        your servicer directly — many offer temporary hardship programs even
        though they are not required by law.
      </p>

      <h2>Case Study: Sarah, a 25-Year-Old Software Engineer</h2>
      <p>
        Sarah graduated with $42,000 in federal Direct Loans at a weighted
        average rate of 6.52% (2026–27 undergraduate disbursements). Her first
        job pays $78,000 per year, and after taxes and rent she has about $900
        per month available for loan payments. On the Standard 10-year plan, her
        monthly payment is about $477, leaving room for savings and discretionary
        spending.
      </p>
      <p>
        Sarah considered switching to a 25-year Tiered Standard schedule to free
        up cash flow. That would drop her payment to roughly $284, but total
        interest would jump from about $15,300 to over $43,200 — an extra
        $28,000 in cost for modest monthly relief. She stayed on the 10-year
        standard plan and added $100 per month toward principal.
      </p>
      <p>
        With the extra $100, Sarah pays off her loans in about seven years and
        nine months instead of 10 years, saving approximately $3,700 in interest.
        She also redirects the freed-up $577 monthly payment toward her{" "}
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
        {FEDERAL_UNDERGRAD_DIRECT_RATE_2026_27}% interest. RAP payments vary with AGI and
        dependents; illustrative low-income payments often fall below standard.
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
            <td className="py-2 pr-4">$398</td>
            <td className="py-2 pr-4">10 years</td>
            <td className="py-2">$12,733</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Tiered Standard (25-year)</td>
            <td className="py-2 pr-4">$237</td>
            <td className="py-2 pr-4">25 years</td>
            <td className="py-2">$36,028</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">RAP (income-based)</td>
            <td className="py-2 pr-4">Varies by AGI</td>
            <td className="py-2 pr-4">Up to 30 years</td>
            <td className="py-2">Lower near-term; may qualify for PSLF</td>
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
        than advancing your due date.         Even $50 per month on a $35,000 loan at {FEDERAL_UNDERGRAD_DIRECT_RATE_2026_27}%
        saves about $2,000 in interest and cuts roughly 17 months off a 10-year
        term. Apply windfalls — tax refunds, bonuses, side income —
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
        You may deduct up to $2,500 in qualified student loan interest per year
        (2026 limit unchanged). The deduction phases out for single filers with
        modified adjusted gross income between $85,000 and $100,000, and for
        joint filers between $175,000 and $205,000 (IRS Rev. Proc. 2025-32). It
        is above-the-line — no itemizing required — and reduces taxable income,
        not tax dollar-for-dollar. A full $2,500 deduction saves roughly
        $275–$925 depending on your marginal bracket.
      </p>
      <Sources
        items={[
          {
            label: "IRS Topic 456 — Student loan interest deduction",
            href: "https://www.irs.gov/taxtopics/tc456",
          },
          {
            label: "IRS Rev. Proc. 2025-32 (2026 inflation adjustments)",
            href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
          },
        ]}
        checked="October 2026"
      />
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
