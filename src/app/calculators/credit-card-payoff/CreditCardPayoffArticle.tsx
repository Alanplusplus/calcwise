import Link from "next/link";

export function CreditCardPayoffArticle() {
  return (
    <>
      <h2>How Credit Card Interest Works</h2>
      <p>
        Credit card interest is calculated using your Annual Percentage Rate (APR),
        but it compounds daily rather than monthly. Your issuer converts your APR
        into a daily periodic rate by dividing it by 365 (or sometimes 360). Each
        day, interest accrues on your average daily balance. At the end of the
        billing cycle, those daily charges are added together and appear on your
        statement as your monthly finance charge.
      </p>
      <p>
        This daily compounding means you pay interest on interest. If you carry a
        balance from month to month, new purchases and existing debt both generate
        daily charges. Paying your statement balance in full by the due date
        eliminates interest entirely — the grace period is one of the most
        valuable features of credit cards when used responsibly.
      </p>
      <p>
        When you only make partial payments, the remaining balance continues
        accruing interest every single day. A 22.9% APR sounds manageable until
        you realize it translates to roughly 0.063% interest per day on every
        dollar you owe. Over a year, that adds up quickly, which is why credit
        card debt is among the most expensive consumer debt you can carry.
      </p>

      <h2>The Minimum Payment Trap</h2>
      <p>
        Credit card issuers set minimum payments deliberately low — typically 1%
        to 3% of your balance or a flat dollar amount like $25, whichever is
        greater. This keeps your account in good standing while maximizing the
        total interest you pay over time. Minimum payments cover mostly interest
        with very little going toward principal, especially in the early months.
      </p>
      <p>
        Consider a concrete example: an $8,000 balance at 22.9% APR with a 2%
        minimum payment. Your first minimum payment would be $160 (2% of $8,000),
        but roughly $153 of that goes to interest and only $7 reduces your
        principal. The next month, your balance is still $7,993, and the cycle
        repeats. At this pace, paying only the minimum would take decades to
        eliminate the debt and cost tens of thousands of dollars in interest —
        often more than the original balance itself.
      </p>
      <p>
        Use our calculator above to see exactly how long minimum payments would
        keep you in debt compared to a fixed monthly payment. The difference is
        often shocking enough to motivate real change in your payment habits.
      </p>

      <h2>Case Study: Sarah&apos;s $12,000 Credit Card Debt</h2>
      <p>
        Sarah accumulated $12,000 in credit card debt across two cards, both
        charging around 22% APR. Her combined minimum payments totaled roughly
        $240 per month. She assumed that paying the minimum meant she was handling
        her debt responsibly. After running the numbers, she discovered that at
        minimum payments, she would remain in debt for over 25 years and pay
        approximately $18,000 in interest alone.
      </p>
      <p>
        Sarah decided to cut discretionary spending and commit to a fixed $400
        monthly payment instead. The results were dramatic: her payoff timeline
        dropped from over 300 months to about 38 months, and her total interest
        fell from $18,000 to roughly $3,200. By paying an extra $160 per month,
        she saved nearly $15,000 and became debt-free more than 22 years sooner.
      </p>
      <p>
        Sarah&apos;s story illustrates a key principle: the gap between minimum
        and intentional payments is where real financial progress happens. Even
        modest increases above the minimum can cut years off your timeline.
      </p>

      <h2>Strategies to Pay Off Credit Card Debt Faster</h2>
      <p>
        Once you understand the cost of minimum payments, the next step is
        building a payoff strategy. Start by listing every card, its balance,
        APR, and minimum payment. Then choose an approach that fits your
        personality and financial situation.
      </p>
      <ul>
        <li>
          <strong>Pay more than the minimum:</strong> Even an extra $50 to $100
          per month significantly reduces total interest and payoff time.
        </li>
        <li>
          <strong>Use the avalanche method:</strong> Pay minimums on all cards,
          then direct extra money to the highest APR card first. This saves the
          most money mathematically. Read our guide on{" "}
          <Link
            href="/guides/debt-avalanche-vs-snowball"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            Debt Avalanche vs Snowball
          </Link>{" "}
          for a full comparison.
        </li>
        <li>
          <strong>Stop adding new charges:</strong> Put the cards away and use
          cash or debit until the balance is gone. Continuing to spend on credit
          while paying down debt is like filling a bucket with a hole in the bottom.
        </li>
        <li>
          <strong>Automate your payments:</strong> Set up automatic transfers
          for your target payment amount so you never accidentally pay only the
          minimum.
        </li>
        <li>
          <strong>Apply windfalls to debt:</strong> Tax refunds, bonuses, and
          side income can make large dents in your balance when applied directly
          to principal.
        </li>
      </ul>
      <p>
        For a multi-debt payoff plan, use our{" "}
        <Link
          href="/calculators/debt-payoff"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Debt Payoff Calculator
        </Link>{" "}
        to model avalanche and snowball strategies across several accounts.
      </p>

      <h2>Payoff Timelines at Different Payment Levels</h2>
      <p>
        The table below shows estimated payoff timelines for a $12,000 balance at
        22.9% APR at four common payment levels. These figures assume you make no
        additional purchases and pay the same amount every month.
      </p>
      <table className="my-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink-200 text-ink-500">
            <th className="py-2 pr-4 font-medium">Monthly Payment</th>
            <th className="py-2 pr-4 font-medium">Months to Pay Off</th>
            <th className="py-2 pr-4 font-medium">Total Interest</th>
            <th className="py-2 font-medium">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">$150 (near minimum)</td>
            <td className="py-2 pr-4 text-ink-800">Never (payment too low)</td>
            <td className="py-2 pr-4 text-ink-800">—</td>
            <td className="py-2 text-ink-800">—</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">$250</td>
            <td className="py-2 pr-4 text-ink-800">~72 months</td>
            <td className="py-2 pr-4 text-ink-800">~$6,000</td>
            <td className="py-2 text-ink-800">~$18,000</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">$400</td>
            <td className="py-2 pr-4 text-ink-800">~38 months</td>
            <td className="py-2 pr-4 text-ink-800">~$3,200</td>
            <td className="py-2 text-ink-800">~$15,200</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">$600</td>
            <td className="py-2 pr-4 text-ink-800">~23 months</td>
            <td className="py-2 pr-4 text-ink-800">~$1,700</td>
            <td className="py-2 text-ink-800">~$13,700</td>
          </tr>
        </tbody>
      </table>
      <p>
        Notice how each increase in payment has an outsized effect on interest
        savings. Going from $250 to $400 per month cuts the timeline nearly in
        half. Going from $400 to $600 saves another 15 months and over $1,500 in
        interest. Every dollar above the minimum attacks principal directly.
      </p>

      <h2>Balance Transfer vs Payoff Strategies</h2>
      <p>
        A balance transfer moves your debt to a new card offering a 0% introductory
        APR for 12 to 21 months. This can save significant interest if you pay off
        the balance before the promotional period ends. However, balance transfers
        come with caveats: transfer fees (typically 3% to 5%), the risk of running
        up your old card again, and a higher APR that kicks in if you miss a
        payment or fail to pay off the balance in time.
      </p>
      <p>
        Balance transfers work best when you have a clear payoff plan and
        disciplined spending habits. If you transfer $8,000 to a 0% card for 18
        months, you need to pay roughly $445 per month to clear the debt before
        interest resumes. Without that commitment, you may end up in worse shape
        than before.
      </p>
      <p>
        For most people, increasing fixed monthly payments on existing cards is
        the simplest and most reliable path. Combine aggressive payments with a
        structured budget — and use our{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Savings Goal Calculator
        </Link>{" "}
        to build an emergency fund afterward so you do not rely on credit for
        unexpected expenses. For step-by-step guidance, read{" "}
        <Link
          href="/guides/how-to-pay-off-credit-card-fast"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How to Pay Off Credit Card Debt Fast
        </Link>
        .
      </p>

      <h2>FAQ</h2>

      <h3>Should I pay off credit cards or save first?</h3>
      <p>
        Build a small emergency fund of $1,000 to $2,000 first, then focus on
        high-interest credit card debt. Credit cards charging 20%+ APR cost far
        more than you would earn in a savings account. Once high-interest debt is
        gone, redirect those payments toward a full emergency fund and long-term
        savings goals.
      </p>

      <h3>Does paying the minimum hurt my credit score?</h3>
      <p>
        Paying the minimum keeps your account in good standing and avoids late
        payment marks, but high credit utilization (balance relative to credit
        limit) can lower your score. Paying down balances reduces utilization and
        improves your score over time, even if you keep the accounts open.
      </p>

      <h3>What if I can only afford the minimum right now?</h3>
      <p>
        Pay the minimum on every card to avoid fees and penalties, then look for
        ways to increase income or reduce expenses — even temporarily. Consider
        a side gig, selling unused items, or negotiating lower bills. Every extra
        dollar above the minimum accelerates your payoff and reduces total interest.
      </p>

      <h3>Is it better to pay off one card or spread payments across all cards?</h3>
      <p>
        Always pay at least the minimum on every card to avoid penalties. Beyond
        that, concentrate extra payments on one card using either the avalanche
        method (highest APR first) or snowball method (smallest balance first).
        Spreading small extra amounts across multiple cards slows progress on all
        of them. Focus creates momentum and measurable wins.
      </p>
    </>
  );
}
