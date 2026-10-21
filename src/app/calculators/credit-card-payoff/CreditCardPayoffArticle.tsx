import Link from "next/link";
import { Sources } from "@/components/Sources";
import { CREDIT_CARD_MINIMUM_PAYMENT, G19_CREDIT_CARD_APR } from "@/lib/market-data";

const APR = G19_CREDIT_CARD_APR.assessedInterest;

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
        accruing interest every single day. At the Federal Reserve G.19 average of{" "}
        {APR}% APR for accounts assessed interest ({G19_CREDIT_CARD_APR.asOfLabel}
        ), every $1,000 carried for a month costs about ${((1000 * APR) / 100 / 12).toFixed(0)}{" "}
        in simple monthly interest before compounding — which is why revolving
        balances are among the most expensive consumer debt you can carry.
      </p>
      <Sources
        items={[...G19_CREDIT_CARD_APR.sources]}
        checked={G19_CREDIT_CARD_APR.checkedLabel}
        note={`We quote the G.19 “accounts assessed interest” rate (${APR}%), not the ${G19_CREDIT_CARD_APR.allAccounts}% average across all accounts (including paid-in-full balances).`}
      />

      <h2>Minimum Payment Formula (What This Calculator Uses)</h2>
      <p>
        Issuers use several minimum formulas; this calculator models a common one
        printed in cardmember agreements: the{" "}
        <strong>greater of $25 or the month's interest plus 1% of the balance</strong>.
        You can change the 1% in the calculator. Each month:
      </p>
      <p>
        <strong>
          Interest = balance × (APR ÷ 12); minimum payment = max($25, interest + 1% ×
          balance); principal reduction = payment − interest
        </strong>
        . Because the minimum always exceeds the month's interest, the balance falls
        every month, but slowly: the principal share is only 1% of the balance.
      </p>
      <p>
        On the default $8,000 balance at {APR}% APR, the first minimum is $229: about
        $149 of interest plus $80 (1% of $8,000) toward principal, so roughly 35% of
        the payment reduces the debt. As the balance shrinks the minimum shrinks
        with it, and the $25 floor takes over once the balance is below about $870.
        Paying only the minimum takes about 278 months (23 years) and about
        $13,831 in interest, versus 50 months and $4,282 in interest at a fixed
        $250 per month.
      </p>
      <Sources
        items={[...CREDIT_CARD_MINIMUM_PAYMENT.sources]}
        checked={G19_CREDIT_CARD_APR.checkedLabel}
        note="Your own formula is in your cardmember agreement and on each statement; flat-percentage and fee-inclusive formulas change the timeline."
      />

      <h2>The Minimum Payment Trap</h2>
      <p>
        A common minimum-payment formula is the larger of a flat $25 or 1% of the
        balance plus that month's interest and any late fees. That keeps the payment
        small relative to the debt: at {APR}% APR, interest alone takes about 65% of
        the first payment on an $8,000 balance, and the minimum falls as the balance
        falls, so the payoff drags on for decades.
      </p>
      <p>
        Use our calculator above to compare minimum-only payments against a fixed
        monthly payment at the same APR. On $8,000 at {APR}%, the fixed $250/month
        path in the default inputs pays off in 50 months with about $4,282 in
        interest. The minimum-only path takes about 278 months and about $13,831 in
        interest, so the fixed payment saves about $9,549 and 228 months (19 years).
      </p>

      <h2>Case Study: Sarah's $12,000 Credit Card Debt</h2>
      <p>
        Sarah accumulated $12,000 in credit card debt across two cards near the G.19
        assessed-interest average ({APR}% APR). Her combined minimums started around
        $344 per month: about $224 of interest plus $120 (1% of the balance) toward
        principal. Running the numbers at {APR}% with the interest-plus-1% minimum
        model, paying only minimums would take about 318 months (26.5 years) and
        cost about $21,285 in interest.
      </p>
      <p>
        Sarah cut discretionary spending and committed to a fixed $400 monthly
        payment instead, only about $56 above her starting minimum. At {APR}% APR,
        that clears $12,000 in about 45 months with roughly $5,739 in total
        interest, saving about $15,500 in interest and 273 months (22 years and 9
        months) compared with paying only the minimum.
      </p>

      <h2>Strategies to Pay Off Credit Card Debt Faster</h2>
      <p>
        Once you understand the cost of minimum payments, list every card, its
        balance, APR, and minimum payment. Then choose an approach that fits your
        situation.
      </p>
      <ul>
        <li>
          <strong>Pay more than the minimum:</strong> Even an extra $50 to $100
          per month significantly reduces total interest and payoff time.
        </li>
        <li>
          <strong>Use the avalanche method:</strong> Pay minimums on all cards,
          then direct extra money to the highest APR card first. Read our guide on{" "}
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
          cash or debit until the balance is gone.
        </li>
        <li>
          <strong>Automate your payments:</strong> Set up automatic transfers
          for your target payment amount so you never accidentally pay only the
          minimum.
        </li>
        <li>
          <strong>Apply windfalls to debt:</strong> Tax refunds, bonuses, and
          side income applied to principal can shave months off high-APR balances.
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
        to model extra payments across several accounts.
      </p>

      <h2>Payoff Timelines at Different Payment Levels</h2>
      <p>
        Estimated timelines for a $12,000 balance at {APR}% APR (interest plus 1%
        minimum model with a $25 floor for the minimum row; fixed payments
        otherwise). No new purchases.
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
            <td className="py-2 pr-4 text-ink-800">$344 (interest + 1% minimum start, falling)</td>
            <td className="py-2 pr-4 text-ink-800">318</td>
            <td className="py-2 pr-4 text-ink-800">~$21,285</td>
            <td className="py-2 text-ink-800">~$33,285</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">$250 fixed</td>
            <td className="py-2 pr-4 text-ink-800">122</td>
            <td className="py-2 pr-4 text-ink-800">~$18,443</td>
            <td className="py-2 text-ink-800">~$30,443</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">$400 fixed</td>
            <td className="py-2 pr-4 text-ink-800">45</td>
            <td className="py-2 pr-4 text-ink-800">~$5,739</td>
            <td className="py-2 text-ink-800">~$17,739</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4 text-ink-800">$600 fixed</td>
            <td className="py-2 pr-4 text-ink-800">26</td>
            <td className="py-2 pr-4 text-ink-800">~$3,155</td>
            <td className="py-2 text-ink-800">~$15,155</td>
          </tr>
        </tbody>
      </table>
      <p>
        Going from $250 to $400 per month cuts the timeline from 122 months to 45
        months and saves about $12,700 in interest on this balance.
      </p>

      <h2>Balance Transfer vs Payoff Strategies</h2>
      <p>
        A balance transfer moves debt to a card with a 0% introductory APR for 12
        to 21 months. Transfer $8,000 into an 18-month 0% offer and you need about
        $445 per month to clear the balance before the promo APR ends. Watch transfer
        fees (often 3% to 5%) and avoid running up the old card again.
      </p>
      <p>
        For most people, increasing fixed payments on existing cards is the simplest
        path. After payoff, use our{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Savings Goal Calculator
        </Link>{" "}
        to build an emergency fund so you do not rely on credit for surprises. See{" "}
        <Link
          href="/guides/how-to-pay-off-credit-card-fast"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How to Pay Off Credit Card Debt Fast
        </Link>{" "}
        for a month-by-month plan.
      </p>

      <h2>FAQ</h2>

      <h3>Should I pay off credit cards or save first?</h3>
      <p>
        Build a small emergency fund of $1,000 to $2,000 first, then focus on
        high-interest credit card debt. Cards near the {APR}% assessed-interest
        average cost far more than typical savings yields. Once high-interest debt
        is gone, redirect those payments toward a full emergency fund.
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
        ways to increase income or reduce expenses — even temporarily. Every extra
        dollar above the minimum accelerates your payoff and reduces total interest.
      </p>

      <h3>Is it better to pay off one card or spread payments across all cards?</h3>
      <p>
        Always pay at least the minimum on every card to avoid penalties. Beyond
        that, concentrate extra payments on one card using either the avalanche
        method (highest APR first) or snowball method (smallest balance first).
        Spreading small extra amounts across multiple cards slows progress on all
        of them.
      </p>
    </>
  );
}
