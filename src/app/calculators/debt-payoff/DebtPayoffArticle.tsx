import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import { G19_CREDIT_CARD_APR } from "@/lib/market-data";

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
        see when you'll be debt-free. Then add an extra payment amount to
        see how much faster you could eliminate your debt and how much interest
        you'd save.
      </p>

      <h2>Debt Payoff Strategies</h2>
      <p>Two popular approaches to paying off multiple debts:</p>

      <h3>The Avalanche Method (Saves the Most Money)</h3>
      <p>
        Pay minimums on all debts, then put every extra dollar toward the debt
        with the highest interest rate. Once that's paid off, move to the
        next highest rate. This method minimizes total interest paid and is
        mathematically optimal.
      </p>

      <h3>The Snowball Method (Best for Motivation)</h3>
      <p>
        Pay minimums on all debts, then put extra money toward the smallest
        balance first. Clearing a small balance frees its minimum payment for
        the next target, which can keep you motivated when the math-heavy
        avalanche method feels slow.
      </p>
      <p>
        Learn the full comparison in our guide: <Link href="/guides/debt-avalanche-vs-snowball" className="text-brand-600 hover:text-brand-800 font-medium">Debt Avalanche vs Snowball: Which Gets You Debt-Free Faster?</Link>
      </p>

      <h2>Case Study: Avalanche vs Snowball on $28,000 of Debt</h2>
      <p>
        James, a 35-year-old engineer, owes $28,000 across three accounts: a
        $12,000 credit card at {G19_CREDIT_CARD_APR.assessedInterest}% APR (near
        the Fed G.19 assessed-interest average, $240 minimum at 2%), a $6,000
        store card at 19.99% APR ($120 minimum), and a $10,000 auto loan at 7.54%
        APR (near the G.19 60-month new-car bank average, $198 minimum). His
        total minimums are about $558 per month. After trimming dining and
        subscriptions, he frees $400 extra and commits $958 per month to debt
        payoff.
      </p>
      <Sources
        items={[...G19_CREDIT_CARD_APR.sources]}
        checked={G19_CREDIT_CARD_APR.checkedLabel}
        note="Credit card APR uses G.19 accounts assessed interest (22.36%, August 2026). Auto rate is illustrative near the G.19 commercial-bank 60-month new-car average (7.54%, August 2026)."
      />
      <p>
        Using the avalanche method, James attacks the highest-APR card first
        while paying minimums elsewhere, then rolls freed payments down the rate
        ladder. That approach minimizes total interest versus snowball order on
        the same $958 monthly pool. Either structured method beats paying
        minimums only on revolving debt at {G19_CREDIT_CARD_APR.assessedInterest}%
        APR, where 2% minimums can leave balances for decades. Run your own
        balances in this
        calculator, or compare consolidation offers with our{" "}
        <Link href="/calculators/loan-comparison" className="text-brand-600 hover:text-brand-800 font-medium">Loan Comparison Calculator</Link>.
      </p>

      <h2>The True Cost of Minimum Payments</h2>
      <p>
        Credit card companies set minimum payments intentionally low — often 1-2%
        of the balance or $25, whichever is greater. This keeps you in debt
        longer and maximizes their interest revenue.
      </p>
      <p>
        Example: A $10,000 credit card balance at {G19_CREDIT_CARD_APR.assessedInterest}%
        APR with 2%/$25 minimums still owes thousands after 50 years in this
        model and accrues well over $60,000 in interest in that period. Increasing
        to a fixed $300/month payment clears the same balance in 53 months with
        about $5,771 in total interest.
      </p>
      <p>
        For credit card-specific strategies, try our <Link href="/calculators/credit-card-payoff" className="text-brand-600 hover:text-brand-800 font-medium">Credit Card Payoff Calculator</Link> which models minimum payments vs. fixed payments, and read{" "}
        <Link href="/guides/how-to-pay-off-credit-card-fast" className="text-brand-600 hover:text-brand-800 font-medium">How to Pay Off Credit Card Debt Fast</Link> for a month-by-month action plan.
      </p>

      <h2>How Extra Payments Reduce Interest</h2>
      <p>
        Every extra dollar goes directly to reducing your principal balance.
        With less principal, the next month's interest charge is lower,
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
        <li><strong>Audit subscriptions:</strong> cancel unused streaming, gym, or app charges — even $75/month redirected to debt cuts interest on a 22% balance.</li>
        <li><strong>Side income:</strong> freelancing, selling unused items, or a part-time gig. Direct 100% of extra income to debt.</li>
        <li><strong>Tax refund or bonus:</strong> a single $2,000 lump sum on a $15,000 balance at 22.36% APR can shave several months off a fixed $400/month plan.</li>
        <li><strong>Negotiate rates:</strong> call your credit card company and ask for a lower APR. A 3-point drop on a $10,000 balance saves hundreds per year in interest.</li>
        <li><strong>Balance transfer:</strong> a 0% APR promotional card gives you 12-21 months of interest-free payoff time (watch for transfer fees).</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I save or pay off debt?</h3>
      <p>
        If your debt interest rate exceeds your savings rate (which it almost
        always does for credit cards), prioritize debt payoff. Every dollar of
        debt at 20% costs you more than a dollar saved at 5% earns. The
        exception: maintain a small emergency fund ($1,000-$2,000) so
        unexpected expenses don't force you back into debt.
      </p>
      <p>
        Once you're debt-free, start building wealth with our <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">Savings Goal Calculator</Link>.
      </p>

      <h3>Does paying off debt improve my credit score?</h3>
      <p>
        Yes, significantly. Reducing your credit utilization ratio (how much of
        your available credit you're using) is one of the fastest ways to
        boost your score. Going from 80% utilization to 30% can improve your
        score by 50-100 points within a billing cycle.
      </p>

      <h3>What about debt consolidation?</h3>
      <p>
        Consolidation loans make sense if you can get a significantly lower
        interest rate and you're committed to not accumulating new debt.
        They simplify multiple payments into one and can reduce total interest.
        However, they don't solve the spending habits that created the debt.
      </p>

      <h3>Which debts should I pay off first if rates are similar?</h3>
      <p>
        When two debts sit within 1-2 percentage points of each other (for
        example, 18.9% vs 19.5%), the dollar difference in interest is small.
        In that case, snowball order — smallest balance first — often finishes
        one account 2-3 months sooner and frees a minimum payment you can roll
        into the next debt. If one rate is 5+ points higher (22% vs 7% on a car
        loan), avalanche almost always wins by hundreds of dollars.
      </p>

      <h3>How do I stay motivated during a long payoff?</h3>
      <p>
        Set milestone targets every $2,500-$5,000 of progress and track your
        "interest saved to date" in this calculator each month. James
        in our case study above celebrated each paid-off statement with a
        $20 coffee, not a $200 dinner — small rewards that do not add new
        balances. Pair that habit with automating the extra $400 on payday so
        the money never sits in checking where it is easy to spend.
      </p>
    </>
  );
}
