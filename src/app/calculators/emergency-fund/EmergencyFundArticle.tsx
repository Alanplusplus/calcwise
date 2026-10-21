import Link from "next/link";

export function EmergencyFundArticle() {
  return (
    <>
      <h2>Why You Need an Emergency Fund</h2>
      <p>
        An emergency fund is money set aside for unexpected expenses — job loss,
        medical bills, car repairs, or home emergencies. Without one, a single
        unexpected event can force you into high-interest debt or derail your
        financial progress entirely.
      </p>
      <p>
        According to the Federal Reserve, 37% of Americans cannot cover a $400
        emergency without borrowing or selling something. An emergency fund is
        the foundation of financial stability.
      </p>

      <h2>How Much Should You Save?</h2>
      <p>The standard recommendation varies based on your situation:</p>
      <ul>
        <li><strong>3 months:</strong> minimum for dual-income households with stable employment and no dependents.</li>
        <li><strong>6 months:</strong> recommended for most people — single-income households, those with children, or moderate job stability.</li>
        <li><strong>9-12 months:</strong> ideal for self-employed individuals, freelancers, single parents, people in volatile industries, or those with irregular income.</li>
      </ul>
      <p>
        Calculate based on your <em>essential</em> expenses only — housing,
        food, utilities, insurance, transportation, and minimum debt payments.
        Don't include discretionary spending like dining out or entertainment.
      </p>

      <h2>Case Study: Building a 6-Month Fund on $65,000</h2>
      <p>
        Priya is a single parent in Denver earning $65,000 per year. After
        federal and state taxes, a 5% 401(k) contribution, and health insurance,
        her take-home pay is about $3,900 per month. Her essential expenses —
        rent ($1,650), groceries ($520), utilities ($180), car payment and
        insurance ($410), childcare ($600), and minimum debt payments ($140) —
        total $3,500 per month. A 6-month emergency fund target is $21,000, not
        the $23,400 she would need if she included $400/month for dining and
        streaming in the calculation.
      </p>
      <p>
        Priya already has $1,200 saved. Using the{" "}
        <Link
          href="/calculators/budget-50-30-20"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          50/30/20 Budget Calculator
        </Link>
        , she allocates $390/month (10% of take-home) to the emergency fund while
        paying down a $2,800 credit card at 22% APR. At that pace she reaches
        $21,000 in about 4 years and 8 months; bumping contributions to $550
        after the card is paid off cuts the timeline to under 3 years. She keeps
        the fund in a high-yield account earning 4.4% APY — roughly $75/month in
        interest once the balance passes $20,000, which covers one week of
        groceries without touching principal.
      </p>

      <h2>Where to Keep Your Emergency Fund</h2>
      <p>
        Your emergency fund needs to be both accessible and earning interest.
        For a full comparison of account types, read{" "}
        <Link
          href="/guides/emergency-fund-where-to-keep"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Where to Keep Your Emergency Fund
        </Link>
        . The best options in 2024-2026:
      </p>
      <ul>
        <li><strong>High-yield savings account (4-5% APY):</strong> the gold standard. FDIC-insured, accessible within 1-2 days, no risk of loss. Look for online banks like Marcus, Ally, or Discover.</li>
        <li><strong>Money market account:</strong> similar rates to HYSA, sometimes with check-writing or debit card access for even faster access.</li>
        <li><strong>Treasury bills (T-Bills):</strong> slightly better rates, backed by the US government, but less liquid (you may wait until maturity).</li>
      </ul>
      <p>
        <strong>Do NOT</strong> keep your emergency fund in stocks, crypto, or
        any volatile investment. You may need this money at the worst possible
        time — during a market crash that coincides with job loss.
      </p>

      <h2>HYSA vs Money Market vs CD for Emergency Cash</h2>
      <p>
        On a $18,000 balance (six months at $3,000 essential expenses), where
        you hold the money affects access, yield, and penalties:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Account type</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Typical APY</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">Annual interest on $18k</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Access</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Main drawback</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">High-yield savings (HYSA)</td>
              <td className="px-3 py-2 text-right text-ink-800">4.3–4.8%</td>
              <td className="px-3 py-2 text-right text-ink-800">$770–$860</td>
              <td className="px-3 py-2 text-ink-700">Transfer to checking in 1–2 business days</td>
              <td className="px-3 py-2 text-ink-700">Some banks cap 6 withdrawals/month on legacy rules</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">Money market account</td>
              <td className="px-3 py-2 text-right text-ink-800">4.2–4.7%</td>
              <td className="px-3 py-2 text-right text-ink-800">$750–$850</td>
              <td className="px-3 py-2 text-ink-700">Often same-day via debit or check writing</td>
              <td className="px-3 py-2 text-ink-700">$500–$2,500 minimum balance at many credit unions</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">12-month CD</td>
              <td className="px-3 py-2 text-right text-ink-800">4.8–5.2%</td>
              <td className="px-3 py-2 text-right text-ink-800">$860–$940</td>
              <td className="px-3 py-2 text-ink-700">Locked until maturity unless you pay a penalty</td>
              <td className="px-3 py-2 text-ink-700">Early exit may forfeit 3–6 months of interest — poor for job-loss cash</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Most households should keep the full emergency reserve in a HYSA or money
        market. If you want slightly higher yield on a slice you are unlikely to
        touch for 12 months, model a CD with our{" "}
        <Link
          href="/calculators/cd-calculator"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          CD Calculator
        </Link>{" "}
        — but never lock more than 1–2 months of expenses in a CD until the main
        fund is fully funded.
      </p>

      <h2>Actionable Tips While You Build</h2>
      <ul>
        <li><strong>Automate on payday:</strong> schedule a transfer for the day after each paycheck — $200 twice a month beats hoping $400 is left on the 28th.</li>
        <li><strong>Sell one unused item per month:</strong> listing $50–$150 of gear on marketplace sites can fund an entire starter $1,000 fund in under a year without cutting groceries.</li>
        <li><strong>Pause non-matching retirement briefly only if necessary:</strong> redirecting $300/month from taxable investing for 6 months adds $1,800; do not skip a 50% employer 401(k) match worth $2,000+ per year on a $40,000 salary.</li>
      </ul>

      <h2>Building Your Fund: A Step-by-Step Approach</h2>
      <ul>
        <li><strong>Step 1:</strong> Start with a $1,000 "starter" emergency fund as fast as possible. This covers most minor emergencies.</li>
        <li><strong>Step 2:</strong> Build to 1 month of expenses while also paying off high-interest debt.</li>
        <li><strong>Step 3:</strong> Once high-interest debt is eliminated, aggressively build to 3-6 months.</li>
        <li><strong>Step 4:</strong> If you're self-employed or in a volatile field, continue to 9-12 months.</li>
      </ul>
      <p>
        Use our{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Savings Goal Calculator
        </Link>{" "}
        to figure out how much to save each month to reach your target emergency
        fund.
      </p>

      <h2>What Counts as an Emergency?</h2>
      <p>Use your emergency fund for genuine emergencies only:</p>
      <ul>
        <li>Job loss or significant income reduction</li>
        <li>Medical emergencies and unexpected health costs</li>
        <li>Critical car or home repairs (not upgrades)</li>
        <li>Emergency travel (family illness, funeral)</li>
        <li>Unexpected essential expenses you cannot delay</li>
      </ul>
      <p>
        <strong>Not emergencies:</strong> vacations, holiday gifts, sales,
        planned purchases, routine maintenance, or "I forgot to budget for
        it." Create separate sinking funds for predictable expenses, and
        follow{" "}
        <Link
          href="/guides/50-30-20-budget-rule"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          The 50/30/20 Budget Rule
        </Link>{" "}
        to keep savings on track.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I invest my emergency fund?</h3>
      <p>
        No. The purpose of an emergency fund is safety and accessibility, not
        growth. A 4-5% HYSA gives a reasonable return without any risk of loss
        or liquidity issues. Any amount beyond your target (e.g., 12+ months)
        could be considered for conservative investments.
      </p>

      <h3>I have debt. Should I build an emergency fund first?</h3>
      <p>
        Yes — a small one. Keep at least $1,000-$2,000 in emergency savings
        even while paying off debt. Without it, every unexpected expense goes
        back on credit cards, creating a debt cycle. Once high-interest debt is
        gone, build the full 3-6 month fund.
      </p>

      <h3>How do I avoid spending my emergency fund?</h3>
      <p>
        Keep it in a separate bank from your checking account — the slight
        friction of transferring between banks reduces impulse use. Give it a
        name (e.g., "Job Loss Fund" or "Peace of Mind") to
        make it psychologically harder to raid. Set clear rules for what
        constitutes an emergency.
      </p>

      <h3>What if I use part of the fund — how fast should I refill it?</h3>
      <p>
        Treat replenishment like the original build. If you withdraw $4,500 for
        an urgent roof repair and essential expenses are $3,000 per month, that
        withdrawal erased 1.5 months of coverage. Split the refill across 6–12
        months ($375–$750/month) while temporarily trimming wants — not needs —
        so you are back to six full months before the next major risk, not
        lingering at 4.5 months for two years.
      </p>
    </>
  );
}
