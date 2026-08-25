import Image from "next/image";
import Link from "next/link";

export function DebtPayoffArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/debt-payoff-strategies.webp"
          alt="Infographic comparing Avalanche method (highest interest first) vs Snowball method (smallest balance first) for debt payoff"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          Two proven debt payoff strategies: Avalanche saves more money, Snowball builds momentum.
        </figcaption>
      </figure>

      <h2>How This Debt Payoff Calculator Works</h2>
      <p>
        Enter your current debt balance, interest rate, and monthly payment to
        see when you&apos;ll be debt-free. Then add an extra payment amount to
        see how much faster you could eliminate your debt and how much interest
        you&apos;d save.
      </p>

      <h2>Debt Payoff Strategies</h2>
      <p>Two popular approaches to paying off multiple debts:</p>

      <h3>The Avalanche Method (Saves the Most Money)</h3>
      <p>
        Pay minimums on all debts, then put every extra dollar toward the debt
        with the highest interest rate. Once that&apos;s paid off, move to the
        next highest rate. This method minimizes total interest paid and is
        mathematically optimal.
      </p>

      <h3>The Snowball Method (Best for Motivation)</h3>
      <p>
        Pay minimums on all debts, then put extra money toward the smallest
        balance first. The quick wins of eliminating smaller debts create
        momentum and motivation. Studies show people using this method are more
        likely to become debt-free because the psychological wins keep them
        going.
      </p>
      <p>
        Learn the full comparison in our guide: <Link href="/guides/debt-avalanche-vs-snowball" className="text-brand-600 hover:text-brand-800 font-medium">Debt Avalanche vs Snowball: Which Gets You Debt-Free Faster?</Link>
      </p>

      <h2>The True Cost of Minimum Payments</h2>
      <p>
        Credit card companies set minimum payments intentionally low — often 1-2%
        of the balance or $25, whichever is greater. This keeps you in debt
        longer and maximizes their interest revenue.
      </p>
      <p>
        Example: A $10,000 credit card balance at 19.9% APR with only minimum
        payments would take over 35 years to pay off and cost approximately
        $16,000 in interest — more than the original balance. Increasing the
        payment to $300/month cuts the timeline to 44 months and total interest
        to about $3,100.
      </p>
      <p>
        For credit card-specific strategies, try our <Link href="/calculators/credit-card-payoff" className="text-brand-600 hover:text-brand-800 font-medium">Credit Card Payoff Calculator</Link> which models minimum payments vs. fixed payments.
      </p>

      <h2>How Extra Payments Reduce Interest</h2>
      <p>
        Every extra dollar goes directly to reducing your principal balance.
        With less principal, the next month&apos;s interest charge is lower,
        which means more of your regular payment goes to principal too. This
        creates an accelerating payoff effect:
      </p>
      <ul>
        <li>Lower balance → less interest accrues</li>
        <li>Less interest → more of your payment reduces balance</li>
        <li>Faster balance reduction → even less interest next month</li>
      </ul>
      <p>
        Even $50 or $100 extra per month can save thousands in interest and
        years off your debt timeline.
      </p>

      <h2>Where to Find Extra Money for Debt Payoff</h2>
      <ul>
        <li><strong>Audit subscriptions:</strong> most people have $50-$200/month in subscriptions they barely use.</li>
        <li><strong>Side income:</strong> freelancing, selling unused items, or a part-time gig. Direct 100% of extra income to debt.</li>
        <li><strong>Tax refund:</strong> the average US tax refund is ~$3,000. Applied to debt, this could save $1,000+ in interest.</li>
        <li><strong>Negotiate rates:</strong> call your credit card company and ask for a lower rate. A drop from 22% to 16% saves significant interest.</li>
        <li><strong>Balance transfer:</strong> a 0% APR promotional card gives you 12-21 months of interest-free payoff time (watch for transfer fees).</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I save or pay off debt?</h3>
      <p>
        If your debt interest rate exceeds your savings rate (which it almost
        always does for credit cards), prioritize debt payoff. Every dollar of
        debt at 20% costs you more than a dollar saved at 5% earns. The
        exception: maintain a small emergency fund ($1,000-$2,000) so
        unexpected expenses don&apos;t force you back into debt.
      </p>
      <p>
        Once you&apos;re debt-free, start building wealth with our <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">Savings Goal Calculator</Link>.
      </p>

      <h3>Does paying off debt improve my credit score?</h3>
      <p>
        Yes, significantly. Reducing your credit utilization ratio (how much of
        your available credit you&apos;re using) is one of the fastest ways to
        boost your score. Going from 80% utilization to 30% can improve your
        score by 50-100 points within a billing cycle.
      </p>

      <h3>What about debt consolidation?</h3>
      <p>
        Consolidation loans make sense if you can get a significantly lower
        interest rate and you&apos;re committed to not accumulating new debt.
        They simplify multiple payments into one and can reduce total interest.
        However, they don&apos;t solve the spending habits that created the debt.
      </p>
    </>
  );
}
