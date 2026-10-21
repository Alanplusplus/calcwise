import Link from "next/link";
import { Sources } from "@/components/Sources";

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
        reflects how compounding affects your return over a full year. Branch-bank averages
        remain far below top online offers: the FDIC national average for 12-month CDs was
        1.76% on October 19, 2026, while NerdWallet listed E*TRADE at 4.55% APY with no
        minimum deposit on October 20, 2026. Use the calculator above with daily compounding
        to see maturity value on any deposit and term.
      </p>
      <Sources
        items={[
          {
            label: "FDIC National Rates and Rate Caps (Oct. 19, 2026)",
            href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
          },
          {
            label: "NerdWallet best CD rates (Oct. 20, 2026)",
            href: "https://www.nerdwallet.com/banking/best/cd-rates",
          },
        ]}
        checked="October 2026"
        note="National averages are deposit-weighted; top APY figures are editorial observations from NerdWallet, not a single bank offer."
      />

      <h2>Understanding APY vs. Effective Rate</h2>
      <p>
        Banks advertise APY because it gives you the true annual return after accounting
        for compounding. When comparing CDs with different compounding schedules,
        maturity value matters more than the headline rate alone.
      </p>
      <p>
        For example, a $10,000 CD at 4.55% APY compounded daily for 12 months grows to
        approximately $10,465 — the default output of this calculator. With monthly
        compounding at the same stated APY, the balance reaches about $10,464. The
        difference is modest over one year but grows on six-figure jumbo deposits held
        for five years at 5.00% APY.
      </p>
      <p>
        CDs work well for money you know you will not need before the term ends. For
        shorter-term goals or funds you might need on short notice, a high-yield savings
        account near 4.20% to 4.35% APY (Bankrate top picks, October 21, 2026) may be
        more appropriate. Read our guide on{" "}
        <Link
          href="/guides/high-yield-savings-vs-cd"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          High-Yield Savings vs. CDs
        </Link>{" "}
        to decide which product fits your timeline.
      </p>

      <h2>CD Term Comparison: National Averages vs. Top Online APYs</h2>
      <p>
        The table below shows maturity values for a $10,000 deposit with daily compounding
        at three APY levels. The 4.55% column matches a top 1-year online rate in October
        2026; the 1.76% column reflects the FDIC national average for 12-month CDs that
        month:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Term</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">1.76% APY (FDIC 12-mo avg.)</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">4.55% APY (top online)</th>
              <th className="px-3 py-2 text-right font-medium text-ink-600">5.00% APY (top 5-yr)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">6 months</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,088</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,230</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,253</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">1 year</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,178</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,465</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,513</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">2 years</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,358</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,953</td>
              <td className="px-3 py-2 text-right text-ink-800">$11,052</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">5 years</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,920</td>
              <td className="px-3 py-2 text-right text-ink-800">$12,554</td>
              <td className="px-3 py-2 text-right text-ink-800">$12,840</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        On a 5-year hold, the gap between the 1.76% FDIC average and a 5.00% top online
        CD is about $1,920 in interest on the same $10,000 — why savers shop beyond their
        primary checking bank before each maturity date.
      </p>

      <h2>CD Laddering Strategy</h2>
      <p>
        CD laddering balances higher CD rates with periodic access to cash. Instead of
        putting all your savings into one long-term CD, you split the deposit across
        multiple CDs with staggered maturity dates. When each CD matures, you can
        reinvest at current rates, spend the funds, or roll them into a new rung on the
        ladder.
      </p>
      <p>
        A typical ladder might include equal amounts in 6-month, 1-year, 2-year, 3-year,
        and 5-year CDs. After the September 2026 Fed hike, top 1-year and 5-year online
        rates often sat within 0.50% of each other — NerdWallet listed 4.55% on 1-year
        and 5.00% on 5-year CDs at Popular Direct on October 20, 2026 — so each maturity
        window deserves its own quote rather than assuming longer always pays more.
      </p>
      <p>
        Laddering suits emergency fund money beyond your immediate cash buffer. Keep the
        first three to six months of essential expenses in a liquid HYSA earning near
        4.35% APY. Any additional safety net can earn more in a CD ladder while still
        providing annual access. For guidance on tiers of savings, see{" "}
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
        David, a 42-year-old project manager in Denver, finished a six-month emergency
        fund of $18,000 in a high-yield savings account at 4.25% APY. He had an
        additional $30,000 in checking that he wanted to put to work without locking
        everything away for five years.
      </p>
      <p>
        David opened a five-rung ladder with $6,000 in each rung (daily compounding,
        October 2026 top rates from NerdWallet):
      </p>
      <ul>
        <li><strong>6-month CD at 4.35% APY:</strong> earns about $132 over the term</li>
        <li><strong>1-year CD at 4.55% APY:</strong> earns about $279</li>
        <li><strong>2-year CD at 4.75% APY:</strong> earns about $598 over the full term</li>
        <li><strong>3-year CD at 4.85% APY:</strong> earns about $940</li>
        <li><strong>5-year CD at 5.00% APY:</strong> earns about $1,704</li>
      </ul>
      <p>
        Combined, the ladder generates approximately $3,653 in total interest over the
        weighted terms — far more than the $1,275 he would earn leaving all $30,000 in
        savings at 4.25% APY for one year. When his first rung matures in six months, he
        plans to reinvest into a new 5-year certificate at whatever top rate is available,
        keeping the ladder rolling.
      </p>
      <p>
        David used our{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest Calculator
        </Link>{" "}
        to model reinvesting each maturing rung over a decade, and our{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Savings Goal Calculator
        </Link>{" "}
        to confirm he could still reach a $50,000 home renovation fund on schedule while
        keeping $30,000 in the ladder.
      </p>

      <h2>When CDs Make Sense — and When They Do Not</h2>
      <p>
        CDs are ideal for specific, date-certain goals: a down payment due in 18 months,
        tuition due in two years, or a known tax bill. They are less suitable for money
        you might need unexpectedly, for keeping pace with inflation over decades, or for
        retirement savings where diversified equities historically delivered higher
        long-run total returns (S&P 500 10-year annualized total return near 15.5% as of
        mid-2026 — past performance is not a guarantee).
      </p>
      <p>
        Before opening a CD, confirm the early withdrawal penalty, whether the rate is
        fixed, and whether you are staying under the $250,000 FDIC insurance limit across
        all accounts at the same bank. Shop rates across online banks, credit unions, and
        brokerage platforms — top October 2026 CD APYs were often 2.5 to 3 percentage
        points above FDIC national averages on the same term.
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
        at the current rate for the same term — which may track the low FDIC national
        average rather than top online APYs unless you move the balance.
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
