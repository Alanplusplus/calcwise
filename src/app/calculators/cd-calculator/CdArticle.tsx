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

      <h2>How to Calculate CD Interest</h2>
      <p>
        The maturity value of a CD comes from one formula:
      </p>
      <p>
        <strong>Maturity value = P × (1 + APY)^(months ÷ 12)</strong>
      </p>
      <ul>
        <li><strong>P</strong> is your deposit (the principal).</li>
        <li><strong>APY</strong> is the annual percentage yield written as a decimal, so 4.55% becomes 0.0455. APY already includes compounding.</li>
        <li><strong>months ÷ 12</strong> converts the term to years: a 6-month CD uses 0.5 and a 5-year CD uses 5.</li>
      </ul>
      <p>
        Interest earned is the maturity value minus P. For $10,000 at 4.55% APY over 12
        months: $10,000 × 1.0455 = $10,455, so you earn $455. For a 6-month term at the
        same APY: $10,000 × 1.0455^0.5 = $10,225, or about $225 in interest, slightly less
        than half of $455 because the balance has had only half a year to compound. If
        your bank quotes a stated rate instead of an APY, convert it first with{" "}
        APY = (1 + rate ÷ n)^n − 1, where n is the number of compounding periods per year
        (365 for daily, 12 for monthly).
      </p>

      <h2>Understanding APY vs. Effective Rate</h2>
      <p>
        Banks advertise APY because it gives you the true annual return after accounting
        for compounding. When comparing CDs with different compounding schedules,
        maturity value matters more than the headline rate alone.
      </p>
      <p>
        For example, a $10,000 CD at 4.55% APY for 12 months grows to exactly $10,455 —
        the default output of this calculator. Because APY already includes compounding,
        daily versus monthly compounding does not change that number. Compounding only
        matters when a bank quotes a stated rate instead of an APY: a 4.45% stated rate
        compounded daily works out to a 4.55% APY ($455 on $10,000 in a year), while the
        same 4.45% compounded monthly yields a 4.54% APY ($454). Switch the Rate Type menu
        in the calculator above to enter a stated rate and see its APY.
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
        The table below shows maturity values for a $10,000 deposit at three APY levels,
        using the formula above. The 4.55% column matches a top 1-year online rate in
        October 2026; the 1.76% column reflects the FDIC national average for 12-month CDs
        that month. Many banks cap CD terms at five years, but this calculator accepts any
        term from 1 to 120 months, so the 10-year row shows what the same APYs would
        produce over a decade:
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
              <td className="px-3 py-2 text-ink-700">3 months</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,044</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,112</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,123</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">6 months</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,088</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,225</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,247</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">1 year</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,176</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,455</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,500</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">2 years</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,355</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,931</td>
              <td className="px-3 py-2 text-right text-ink-800">$11,025</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">3 years</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,537</td>
              <td className="px-3 py-2 text-right text-ink-800">$11,428</td>
              <td className="px-3 py-2 text-right text-ink-800">$11,576</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">5 years</td>
              <td className="px-3 py-2 text-right text-ink-800">$10,912</td>
              <td className="px-3 py-2 text-right text-ink-800">$12,492</td>
              <td className="px-3 py-2 text-right text-ink-800">$12,763</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">10 years</td>
              <td className="px-3 py-2 text-right text-ink-800">$11,906</td>
              <td className="px-3 py-2 text-right text-ink-800">$15,604</td>
              <td className="px-3 py-2 text-right text-ink-800">$16,289</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        On a 5-year hold, the gap between the 1.76% FDIC average and a 5.00% top online
        CD is about $1,851 in interest on the same $10,000 — why savers shop beyond their
        primary checking bank before each maturity date.
      </p>
      <p>
        Want a pre-filled version for one term? Open the{" "}
        <Link href="/calculators/cd-calculator/3-month" className="text-brand-600 hover:text-brand-800 font-medium">
          3-month CD calculator
        </Link>
        ,{" "}
        <Link href="/calculators/cd-calculator/6-month" className="text-brand-600 hover:text-brand-800 font-medium">
          6-month CD calculator
        </Link>
        ,{" "}
        <Link href="/calculators/cd-calculator/1-year" className="text-brand-600 hover:text-brand-800 font-medium">
          1-year CD calculator
        </Link>{" "}
        or{" "}
        <Link href="/calculators/cd-calculator/5-year" className="text-brand-600 hover:text-brand-800 font-medium">
          5-year CD calculator
        </Link>
        , or the{" "}
        <Link href="/calculators/cd-calculator/jumbo-cd" className="text-brand-600 hover:text-brand-800 font-medium">
          jumbo CD calculator
        </Link>{" "}
        for deposits of $100,000 or more.
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
        David opened a five-rung ladder with $6,000 in each rung (October 2026 top APYs
        from NerdWallet):
      </p>
      <ul>
        <li><strong>6-month CD at 4.35% APY:</strong> earns about $129 over the term</li>
        <li><strong>1-year CD at 4.55% APY:</strong> earns about $273</li>
        <li><strong>2-year CD at 4.75% APY:</strong> earns about $584 over the full term</li>
        <li><strong>3-year CD at 4.85% APY:</strong> earns about $916</li>
        <li><strong>5-year CD at 5.00% APY:</strong> earns about $1,658</li>
      </ul>
      <p>
        Combined, the five rungs lock in about $3,559 of interest by the time each one
        matures (terms run from 6 months to 5 years). Over the first 12 months alone the
        ladder earns about $1,278, before reinvesting the 6-month rung, against $1,275 for
        the same $30,000 in a 4.25% APY savings account, which is essentially a tie. David's
        reason for the ladder is not extra yield today: it is holding 4.35% to 5.00% for as
        long as five years in case savings rates fall, while rungs still mature at 6 months,
        1, 2, 3, and 5 years. When his first rung matures in six months, he plans to
        reinvest into a new 5-year certificate at whatever top rate is available, keeping
        the ladder rolling.
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

      <h3>How do you calculate CD interest?</h3>
      <p>
        Multiply your deposit by (1 + APY) raised to the power of the term in years, then
        subtract the deposit. For $10,000 at 4.55% APY for 12 months, $10,000 × 1.0455 =
        $10,455, so you earn $455. For 6 months, use 0.5 as the exponent: $10,000 ×
        1.0455^0.5 = $10,225, or about $225 in interest. If your bank quotes a stated rate
        instead of an APY, convert it first with APY = (1 + rate ÷ n)^n − 1.
      </p>

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
