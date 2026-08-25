import Link from "next/link";

export function BudgetArticle() {
  return (
    <>
      <h2>How the 50/30/20 Rule Works</h2>
      <p>
        The 50/30/20 budget rule is a simple framework for dividing your after-tax income
        into three categories: 50% for needs, 30% for wants, and 20% for savings and debt
        repayment beyond minimums. Popularized by Senator Elizabeth Warren in her book
        &quot;All Your Worth,&quot; the rule gives you a clear starting point without
        tracking every coffee purchase or categorizing dozens of line items.
      </p>
      <p>
        Needs are expenses you cannot realistically eliminate — housing, utilities,
        groceries, insurance, transportation to work, and minimum payments on existing
        debt. Wants are discretionary spending that improves your quality of life but is
        not strictly necessary: dining out, entertainment, hobbies, and non-essential
        shopping. Savings covers everything that builds your financial future: emergency
        fund contributions, retirement accounts, extra debt payments, and investments.
      </p>
      <p>
        The beauty of the framework is its simplicity. Enter your take-home pay in the
        calculator above and you immediately see dollar amounts for each bucket. No
        spreadsheet required. For a deeper dive into the philosophy behind the rule, read{" "}
        <Link
          href="/guides/50-30-20-budget-rule"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          The 50/30/20 Budget Rule
        </Link>
        .
      </p>

      <h2>Budget Allocations at Different Income Levels</h2>
      <p>
        The percentages stay constant, but the dollar amounts change dramatically as
        income rises. Here is how the rule plays out at four common take-home income levels:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Monthly Income</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Needs (50%)</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Wants (30%)</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Savings (20%)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">$4,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$2,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,200</td>
              <td className="px-3 py-2 text-right text-ink-800">$800</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">$5,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$2,500</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,500</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,000</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">$7,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$3,500</td>
              <td className="px-3 py-2 text-right text-ink-800">$2,100</td>
              <td className="px-3 py-2 text-right text-ink-800">$1,400</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">$10,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$5,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$3,000</td>
              <td className="px-3 py-2 text-right text-ink-800">$2,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        At $4,000 per month, the $800 savings allocation may feel tight — but saving 20%
        consistently builds $9,600 per year before any investment growth. At $10,000 per
        month, the $2,000 savings bucket can fund maxed retirement contributions, an
        aggressive emergency fund, and still leave room for taxable investments.
      </p>

      <h2>Case Study: Jennifer Applies the Rule at $5,800/Month</h2>
      <p>
        Jennifer is a 34-year-old marketing coordinator in Austin with a monthly take-home
        pay of $5,800. She has been winging her budget for years — paying bills first,
        spending whatever is left, and saving inconsistently. After reading about the
        50/30/20 rule, she ran her numbers through the calculator and got clear targets:
      </p>
      <ul>
        <li><strong>Needs ($2,900):</strong> rent $1,650, utilities $120, groceries $400, car insurance $95, gas $180, health insurance $155, minimum student loan payment $300</li>
        <li><strong>Wants ($1,740):</strong> dining out $350, streaming services $45, gym $60, shopping $300, weekend activities $200, travel fund $200, miscellaneous $585</li>
        <li><strong>Savings ($1,160):</strong> 401(k) contribution $450, emergency fund $300, extra student loan payment $250, Roth IRA $160</li>
      </ul>
      <p>
        Jennifer discovered her needs actually totaled $3,100 — $200 over the 50% target.
        Rather than abandoning the framework, she identified two adjustments: switching to
        a cheaper phone plan saved $40, and meal prepping twice a week cut dining out from
        $350 to $250. Those changes brought her needs to $2,990, within $90 of target.
      </p>
      <p>
        On the savings side, she used our{" "}
        <Link
          href="/calculators/emergency-fund"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Emergency Fund Calculator
        </Link>{" "}
        and found she needed $17,400 for six months of essential expenses. At $300 per
        month, she would reach that goal in about four years while also attacking her
        student loans with an extra $250 monthly payment through the{" "}
        <Link
          href="/calculators/debt-payoff"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Debt Payoff Calculator
        </Link>
        .
      </p>

      <h2>When the Rule Does Not Work</h2>
      <p>
        The 50/30/20 rule is a guideline, not a law. It breaks down in several common
        situations where rigid percentages do not match financial reality.
      </p>
      <p>
        <strong>High-cost cities:</strong> In San Francisco, New York, or Boston, housing
        alone can consume 40% to 50% of take-home pay. A software engineer earning $8,000
        after taxes might pay $3,200 for rent — already 40% of income before groceries,
        insurance, or transportation. In these cases, a 60/20/20 or 65/15/20 split may be
        more realistic until income rises or housing costs decrease.
      </p>
      <p>
        <strong>Heavy debt loads:</strong> If you carry $40,000 in credit card debt at 22%
        APR, allocating only 20% of income to debt payoff and savings may not be aggressive
        enough. Temporarily shifting to a 50/20/30 split — directing 30% toward debt
        elimination — can save thousands in interest and accelerate your path to financial
        stability.
      </p>
      <p>
        <strong>Low income:</strong> Someone earning $2,500 after taxes may need 65% or
        more just for essentials, leaving little room for wants or savings. The priority
        becomes covering basics first, then saving whatever is possible — even $50 per month
        builds the savings habit.
      </p>
      <p>
        <strong>High earners:</strong> At $15,000 or $20,000 monthly take-home, spending
        30% on wants ($4,500 to $6,000) may be more than you actually need. Many high
        earners invert the ratio — saving 30% or 40% while keeping wants at 10% to 15%.
      </p>

      <h2>Putting Your Savings to Work</h2>
      <p>
        The 20% savings bucket is only as powerful as what you do with it. A structured
        priority order helps maximize impact:
      </p>
      <ul>
        <li><strong>First:</strong> Capture any employer 401(k) match — that is an immediate 50% to 100% return.</li>
        <li><strong>Second:</strong> Build a starter emergency fund of $1,000 to $2,000.</li>
        <li><strong>Third:</strong> Pay off high-interest debt (above 7% to 8% APR).</li>
        <li><strong>Fourth:</strong> Expand your emergency fund to three to six months of expenses.</li>
        <li><strong>Fifth:</strong> Max out tax-advantaged retirement accounts, then invest in taxable brokerage accounts.</li>
      </ul>
      <p>
        Use our{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Savings Goal Calculator
        </Link>{" "}
        to determine how long it will take to reach specific targets at your current
        savings rate. For a concrete long-term example, see{" "}
        <Link
          href="/guides/save-50000-in-3-years"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How to Save $50,000 in 3 Years
        </Link>
        , which shows how consistent 20% savings compounds into meaningful wealth over time.
      </p>

      <h2>Tips for Making the Rule Stick</h2>
      <p>
        Automate transfers on payday so savings happens before you can spend it. Review your
        budget monthly for the first three months, then quarterly once the habit is
        established. Track only the three category totals rather than every transaction —
        the rule works because it reduces decision fatigue.
      </p>
      <p>
        If you consistently overspend in wants, try a cash envelope or separate debit card
        funded with exactly 30% on the first of each month. When the wants money is gone,
        it is gone until next month. If needs consistently exceed 50%, the data tells you
        to focus on income growth or cost reduction rather than cutting small pleasures.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I use gross or net income?</h3>
      <p>
        Always use after-tax (net) income — the amount that actually hits your bank account.
        Using gross income makes every category appear larger than what you can actually
        spend, leading to consistent overspending.
      </p>

      <h3>Where do credit card minimum payments go?</h3>
      <p>
        Minimum payments count as needs (50%). Any payment above the minimum comes from
        the savings/debt repayment bucket (20%). This distinction matters when you are
        aggressively paying down debt.
      </p>

      <h3>Can I adjust the percentages?</h3>
      <p>
        Absolutely. The 50/30/20 split is a starting point. Adjust based on your city,
        debt level, and goals. The important principle is separating needs from wants and
        ensuring savings is a fixed allocation — not an afterthought.
      </p>
    </>
  );
}
