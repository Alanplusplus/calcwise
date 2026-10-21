import Link from "next/link";

export function CdArticle() {
  return (
    <>
      <h2>How CDs Work</h2>
      <p>
        A Certificate of Deposit (CD) is a savings product offered by banks and credit
        unions that pays a fixed interest rate for a set term. When you open a CD, you
        agree to leave your money deposited for a specific period — anywhere from three
        months to five years or longer. In exchange for that commitment, the financial
        institution pays you a higher rate than you would typically earn in a standard
        savings account.
      </p>
      <p>
        Unlike stocks or mutual funds, CDs are FDIC-insured up to $250,000 per depositor,
        per institution. That means your principal is protected even if the bank fails.
        The trade-off is liquidity: withdrawing early usually triggers a penalty equal to
        several months of interest, which can wipe out your earnings or even reduce your
        principal if you cash out too soon.
      </p>
      <p>
        The rate you see advertised is typically the APY (Annual Percentage Yield), which
        reflects how compounding affects your return over a full year. A CD quoted at
        4.75% APY with daily compounding will earn slightly more than one at 4.75% with
        annual compounding, because interest is calculated and added to your balance more
        frequently. Use our calculator above to compare how compounding frequency affects
        your actual earnings on any deposit amount and term length.
      </p>

      <h2>Understanding APY vs. Effective Rate</h2>
      <p>
        Banks advertise APY because it gives you the true annual return after accounting
        for compounding. However, when comparing CDs with different compounding schedules,
        it helps to understand the effective annual rate — the actual yield you receive
        based on how often interest is credited to your account.
      </p>
      <p>
        For example, a $10,000 CD at 4.75% APY compounded daily for 12 months grows to
        approximately $10,486. With monthly compounding at the same stated rate, the
        balance reaches about $10,484. The difference is modest over one year but becomes
        more meaningful on larger deposits and longer terms. Before committing, compare
        the maturity value rather than the headline rate alone.
      </p>
      <p>
        CDs work well for money you know you will not need before the term ends. For
        shorter-term goals or funds you might need on short notice, a high-yield savings
        account may be more appropriate. Read our guide on{" "}
        <Link
          href="/guides/high-yield-savings-vs-cd"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          High-Yield Savings vs. CDs
        </Link>{" "}
        to decide which product fits your timeline.
      </p>

      <h2>CD Term Comparison: How Rates and Lengths Stack Up</h2>
      <p>
        Longer CD terms generally offer higher rates, but locking in for five years carries
        opportunity cost if rates rise. The table below shows estimated maturity values for
        a $10,000 deposit at different terms and APY levels, assuming daily compounding:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Term</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">4.00% APY</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">4.75% APY</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">5.25% APY</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">6 months</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,203</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,241</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,266</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">1 year</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,408</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,486</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,538</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">2 years</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,832</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,994</td>
              <td className="px-3 py-2 text-right text-ink-800">$11,078</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">5 years</td>
              <td className="px-3 py-2 text-right text-ink-800">$12,214</td>
              <td className="px-3 py-2 text-right text-ink-800">$12,625</td>
              <td className="px-3 py-2 text-right text-ink-800">$12,915</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Notice how a five-year CD at 5.25% APY nearly doubles the interest earned compared
        to a six-month CD at 4.00% APY on the same $10,000 deposit. That is the power of
        both higher rates and longer compounding periods working together.
      </p>

      <h2>CD Laddering Strategy</h2>
      <p>
        CD laddering is a technique that balances higher CD rates with periodic access to
        your money. Instead of putting all your savings into one long-term CD, you split
        the deposit across multiple CDs with staggered maturity dates. When each CD matures,
        you can reinvest at current rates, spend the funds, or roll them into a new rung
        on the ladder.
      </p>
      <p>
        A typical ladder might include equal amounts in 6-month, 1-year, 2-year, 3-year,
        and 5-year CDs. Every six months to a year, one rung matures and becomes available.
        If rates rise, you capture the higher yield on reinvestment. If rates fall, you
        still have longer-term CDs locked in at previously higher rates.
      </p>
      <p>
        Laddering is especially useful for emergency fund money beyond your immediate
        cash buffer. The first three to six months of expenses should stay in a liquid
        high-yield savings account. Any additional safety net can earn more in a CD ladder
        while still providing regular access. For guidance on where to keep different tiers
        of savings, see{" "}
        <Link
          href="/guides/emergency-fund-where-to-keep"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Where to Keep Your Emergency Fund
        </Link>
        .
      </p>

      <h2>Case Study: David Builds a CD Ladder with $30,000</h2>
      <p>
        David, a 42-year-old project manager in Denver, completed his six-month emergency
        fund of $18,000 in a high-yield savings account earning 4.50% APY. He had an
        additional $30,000 sitting in checking that he wanted to put to work without
        locking everything away for five years.
      </p>
      <p>
        David decided to build a five-rung CD ladder with $6,000 in each rung:
      </p>
      <ul>
        <li><strong>6-month CD at 4.60% APY:</strong> matures in August, earns roughly $138</li>
        <li><strong>1-year CD at 4.75% APY:</strong> matures in February next year, earns roughly $285</li>
        <li><strong>2-year CD at 4.90% APY:</strong> earns roughly $602 over the full term</li>
        <li><strong>3-year CD at 5.00% APY:</strong> earns roughly $945 over the full term</li>
        <li><strong>5-year CD at 5.10% APY:</strong> earns roughly $1,703 over the full term</li>
      </ul>
      <p>
        Combined, David's ladder generates approximately $3,673 in total interest over
        the weighted average term — significantly more than the $1,350 he would have earned
        leaving all $30,000 in his checking account at 0% or even in savings at 4.50%.
        When his first CD matures in six months, he plans to reinvest into a new 5-year
        rung, keeping the ladder rolling indefinitely.
      </p>
      <p>
        David used our{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest Calculator
        </Link>{" "}
        to model how reinvesting each maturing rung would compound over a decade, and our{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Savings Goal Calculator
        </Link>{" "}
        to confirm he could still reach his $50,000 home renovation fund on schedule while
        keeping $30,000 in the ladder.
      </p>

      <h2>When CDs Make Sense — and When They Do Not</h2>
      <p>
        CDs are ideal for specific, date-certain goals: a down payment due in 18 months,
        tuition due in two years, or a known tax bill. They are less suitable for money
        you might need unexpectedly, for keeping pace with inflation over decades, or for
        retirement savings where equities historically deliver higher long-term returns.
      </p>
      <p>
        Before opening a CD, confirm the early withdrawal penalty, whether the rate is
        fixed or variable (brokered CDs can differ), and whether you are staying under
        the FDIC insurance limit across all accounts at the same bank. Shop rates across
        online banks, credit unions, and brokerage platforms — the best CD rates are often
        0.50% to 1.00% higher than what your primary bank offers on the same term.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Are CD earnings taxable?</h3>
      <p>
        Yes. Interest earned on CDs is taxed as ordinary income in the year it is credited
        to your account, even if you cannot withdraw it without penalty until maturity.
        Your bank will send a Form 1099-INT if you earn more than $10 in interest.
      </p>

      <h3>What happens when my CD matures?</h3>
      <p>
        Most banks offer a grace period of 7 to 10 days after maturity during which you can
        withdraw funds without penalty. If you take no action, the CD typically auto-renews
        at the current rate for the same term — which may be higher or lower than your
        original rate.
      </p>

      <h3>Can I lose money on a CD?</h3>
      <p>
        You cannot lose your principal on a standard FDIC-insured CD held to maturity.
        Early withdrawal penalties are the main risk: if you cash out before the term ends,
        the penalty could exceed your accrued interest and reduce your original deposit.
      </p>
    </>
  );
}
