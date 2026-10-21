import Link from "next/link";
import { Sources } from "@/components/Sources";

export function SavingsGoalArticle() {
  return (
    <>
      <h2>How This Savings Goal Calculator Works</h2>
      <p>
        Enter your target amount, what you've already saved, your
        timeframe, and the expected interest rate. The calculator determines
        exactly how much you need to save each month, week, or day to reach your
        goal on time — accounting for compound interest earned along the way.
        Example: $10,000 in 24 months with $1,000 already saved at 4.25% APY
        requires about $353 per month; at 0% interest the same plan needs
        $375 — interest covers the gap so your paycheck carries less of the load.
      </p>
      <p>
        See exactly how your savings grow with interest using our <Link href="/calculators/compound-interest" className="text-brand-600 hover:text-brand-800 font-medium">Compound Interest Calculator</Link>.
      </p>

      <h2>Setting Realistic Savings Goals</h2>
      <p>
        The most effective savings goals are specific, measurable, and
        time-bound. Instead of "save more money," define exactly what
        you're saving for. Run the calculator once per goal — a $6,000
        vacation in 18 months might need $320/month at 4% APY, while a parallel
        $15,000 car fund over 30 months might need $470/month — so you know
        whether $790/month total fits your paycheck or whether one deadline
        needs to move.
      </p>
      <p>
        Common targets with typical dollar ranges:
      </p>
      <ul>
        <li><strong>Emergency fund:</strong> 3-6 months of expenses ($10,000-$30,000 for most households)</li>
        <li><strong>House down payment:</strong> 10-20% of your target home price</li>
        <li><strong>New car:</strong> enough to avoid a loan, or at least cover a 20% down payment</li>
        <li><strong>Vacation:</strong> total trip cost including flights, hotels, food, and activities</li>
        <li><strong>Education:</strong> tuition, books, and living expenses for a semester or full program</li>
      </ul>
      <p>
        Building an emergency fund? Our <Link href="/calculators/emergency-fund" className="text-brand-600 hover:text-brand-800 font-medium">Emergency Fund Calculator</Link> helps determine your target based on monthly expenses.
      </p>

      <h2>Case Study: Saving $20,000 for a Down Payment in 3 Years</h2>
      <p>
        Marcus is a 28-year-old teacher in Ohio earning $52,000 per year (about
        $3,400/month after taxes and retirement contributions). He wants $20,000
        for a house down payment in 36 months and already has $2,500 in a
        high-yield savings account. At 4.25% APY with monthly compounding, he
        needs roughly $446 per month — not the full $486.11 you would get with
        zero interest — because interest on his growing balance covers about
        $1,460 over three years.
      </p>
      <p>
        Marcus automates $235 from each biweekly paycheck into a separate
        "Down Payment" sub-account and sends his $1,800 annual tax
        refund straight to the same bucket each February. That refund alone
        covers nearly four months of contributions. He keeps the fund in cash
        (not stocks) because a 20% market drop six months before closing could
        erase $4,000 of his target. For long-term goals after the home purchase,
        he plans to shift surplus savings into his{" "}
        <Link href="/calculators/retirement" className="text-brand-600 hover:text-brand-800 font-medium">Retirement Savings Calculator</Link>{" "}
        targets once the down payment is funded.
      </p>

      <h2>Where to Keep Your Savings</h2>
      <p>
        The right account depends on your timeframe and risk tolerance. For
        side-by-side rate trade-offs, see{" "}
        <Link href="/guides/high-yield-savings-vs-cd" className="text-brand-600 hover:text-brand-800 font-medium">High-Yield Savings vs CD</Link>:
      </p>
      <ul>
        <li><strong>High-yield savings account (4.2-4.35% APY):</strong> best for goals under 2 years. FDIC-insured, instant access; top October 2026 rates sit far above the 0.38% FDIC national average.</li>
        <li><strong>Certificates of deposit (4.35-5.00% top online):</strong> lock money 6-60 months when you have a fixed date. FDIC 12-month national average was 1.76% in October 2026 — shop online before you auto-renew at a branch.</li>
        <li><strong>Money market accounts (near HYSA yields):</strong> FDIC national money market average was 0.63% in October 2026; top online accounts track HYSA leaders.</li>
        <li><strong>Index funds (7-10% historical):</strong> best for goals 5+ years away. Higher returns but short-term volatility means you could lose money if you need to withdraw during a downturn.</li>
        <li><strong>I Bonds (inflation-linked):</strong> government bonds that protect against inflation. Must hold at least 1 year, penalty-free after 5 years.</li>
      </ul>

      <h2>Comparing Savings Strategies on the Same Goal</h2>
      <p>
        Assume you start at $0 and contribute $500/month for 36 months toward a
        $20,000 goal. Interest and liquidity differ by where you park the money:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Strategy</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Typical APY</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Balance at Month 36</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">Standard savings (big bank)</td>
              <td className="px-3 py-2 text-right text-ink-800">0.01%</td>
              <td className="px-3 py-2 text-right text-ink-800">~$18,003</td>
              <td className="px-3 py-2 text-ink-700">Short-term parking only; you fall ~$2,000 short of $20k on $500/mo</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">High-yield savings account</td>
              <td className="px-3 py-2 text-right text-ink-800">4.25%</td>
              <td className="px-3 py-2 text-right text-ink-800">~$19,233</td>
              <td className="px-3 py-2 text-ink-700">Goals under 2–3 years; withdraw anytime within 1–2 days</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">CD ladder (12 / 24 / 36 mo)</td>
              <td className="px-3 py-2 text-right text-ink-800">4.55–5.00%</td>
              <td className="px-3 py-2 text-right text-ink-800">~$19,305–$19,650</td>
              <td className="px-3 py-2 text-ink-700">Fixed deadline; each rung matures before you need the cash</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        On this example, moving from 0.01% to 4.25% APY adds about $1,233 without
        raising your monthly contribution. A CD ladder may add another $70–$420
        but early withdrawal penalties (often 3–6 months of interest) make it
        a poor fit if your closing date could slip. Recheck rates every 6 months
        because a 0.5% APY change on a $15,000 balance shifts annual interest by $75.
      </p>
      <Sources
        items={[
          {
            label: "FDIC National Rates and Rate Caps (Oct. 19, 2026)",
            href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
          },
          {
            label: "Bankrate best high-yield savings (Oct. 21, 2026)",
            href: "https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/",
          },
        ]}
        checked="October 2026"
        note="Table balances assume $500/month for 36 months with monthly compounding at the stated APY."
      />

      <h2>The 50/30/20 Budget Rule for Savings</h2>
      <p>
        A popular framework for finding room in your budget:
      </p>
      <ul>
        <li><strong>50% — Needs:</strong> housing, groceries, utilities, insurance, minimum debt payments</li>
        <li><strong>30% — Wants:</strong> dining out, entertainment, hobbies, subscriptions</li>
        <li><strong>20% — Savings:</strong> emergency fund, retirement, debt payoff beyond minimums, goal-specific savings</li>
      </ul>
      <p>
        If you earn $5,000/month after taxes, the 20% rule allocates $1,000 to
        savings. That's enough to save $50,000 in just over 4 years with a
        4.25% APY in a HYSA builds about $52,200 in four years — even starting from zero. Split that $1,000 across priorities:
        $400 to retirement, $300 to a 6-month emergency buffer, and $300 to a
        named goal keeps all three timelines visible in one budget.
      </p>

      <h2>Strategies to Save More</h2>
      <ul>
        <li><strong>Pay yourself first:</strong> set up automatic transfers to savings on payday, before you spend on anything discretionary.</li>
        <li><strong>Round-up savings:</strong> many banks offer round-up programs that save your spare change from every transaction.</li>
        <li><strong>Savings challenges:</strong> the 52-week challenge (save $1 in week 1, $2 in week 2, etc.) accumulates $1,378 per year.</li>
        <li><strong>Cut one expense:</strong> redirecting a $150/month subscription or habit to savings adds $1,800/year.</li>
        <li><strong>Windfall rule:</strong> commit to saving at least 50% of any unexpected money (tax refunds, bonuses, gifts).</li>
        <li><strong>Name your sub-accounts:</strong> label savings "2027 Down Payment" or "Japan Trip $6,500" in your bank app so transfers feel tied to a concrete purchase rather than a generic balance.</li>
        <li><strong>Increase contributions with raises:</strong> when you get a 3% raise ($150/month on a $5,000 salary), send at least half ($75) to the goal account before lifestyle creep absorbs it; over 12 months that is $900 extra with no new budget cuts.</li>
      </ul>
      <p>
        For a complete savings strategy, read our guide: <Link href="/guides/save-50000-in-3-years" className="text-brand-600 hover:text-brand-800 font-medium">How to Save $50,000 in 3 Years</Link>.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What return rate should I use?</h3>
      <p>
        For a high-yield savings account in October 2026, use 4.2% to 4.35% APY
        (top online offers on Bankrate). For a diversified portfolio over 5+ years,
        6% to 7% is a common conservative planning band. Use 0% if you plan to keep
        the money in a checking account (though we don't recommend this for
        any savings goal beyond a month).
      </p>

      <h3>What if I can't save the required monthly amount?</h3>
      <p>
        You have three options: extend your timeframe, reduce your goal amount,
        or find ways to increase income or reduce expenses. Even saving a
        smaller amount is better than not saving at all — adjust the calculator
        to find a number you can commit to consistently.
      </p>

      <h3>Should I save or pay off debt first?</h3>
      <p>
        Generally: build a small emergency fund ($1,000-$2,000) first, then
        aggressively pay off high-interest debt (anything above 7-8%), then
        resume saving for other goals. The exception is an employer 401(k)
        match — always capture that free money regardless of debt.
      </p>

      <h3>How do I adjust if inflation raises my goal?</h3>
      <p>
        If your $25,000 wedding fund was set in 2024 and costs rise 3% per year,
        you may need $27,300 in 2026 dollars. Re-run the calculator with the
        updated target and the months remaining — you might add $40–$60 per month
        rather than delaying the date. For goals tied to home prices or tuition,
        add a 2–4% annual buffer to the target amount when you first set the plan.
      </p>
    </>
  );
}
