import Link from "next/link";
import { Sources } from "@/components/Sources";
import { HSA_LIMITS, RETIREMENT_LIMITS, TAX_DATA, TAX_SOURCES, usd } from "@/lib/tax-data";

export function RetirementArticle() {
  return (
    <>
      <h2>How This Retirement Calculator Works</h2>
      <p>
        This calculator projects your retirement savings based on your current
        age, savings rate, and expected investment returns. It then compares
        your projected nest egg to the amount needed to generate your desired
        annual income using the safe withdrawal rate.
      </p>
      <p>
        See how compound growth builds your nest egg over time with our <Link href="/calculators/compound-interest" className="text-brand-600 hover:text-brand-800 font-medium">Compound Interest Calculator</Link>.
      </p>

      <h2>The 4% Rule and Safe Withdrawal Rates</h2>
      <p>
        The 4% rule comes from William Bengen's research and the Trinity Study:
        withdraw 4% of the portfolio in year one, adjust for inflation thereafter,
        and historical US stock/bond mixes often sustained 30-year retirements.
        This calculator defaults to 4% for the target nest egg and sustainable
        income lines.
      </p>
      <p>
        To find how much you need: divide desired annual income by your withdrawal
        rate. At 4%, $60,000 per year requires $1,500,000 ($60,000 ÷ 0.04). At
        Morningstar's 2026 base-case starting rate of 3.9% for new retirees with
        a 30-year horizon, the same $60,000 needs about $1,538,000.
      </p>
      <p>
        Longer retirements (FIRE at 40 or 50) often use 3.5% or flexible spending
        rules instead of a fixed real withdrawal. Morningstar also models flexible
        strategies above 5% for retirees who can trim spending in bad years.
      </p>
      <Sources
        items={[
          {
            label: "Morningstar, safe withdrawal rate research (Feb. 18, 2026)",
            href: "https://www.morningstar.com/retirement/morningstars-retirement-income-research-finding-your-safe-withdrawal-rate",
          },
        ]}
        checked="October 2026"
        note="3.9% is Morningstar's fixed real withdrawal base case for new 2026 retirees; the 4% rule remains a common planning default."
      />

      <h2>How Much Do You Actually Need?</h2>
      <p>
        Fidelity publishes age-based savings factors (multiples of current salary)
        assuming 15% annual savings from age 25, retirement at 67, and no pension:
      </p>
      <ul>
        <li><strong>Age 30:</strong> 1× salary</li>
        <li><strong>Age 35:</strong> 2× salary</li>
        <li><strong>Age 40:</strong> 3× salary</li>
        <li><strong>Age 45:</strong> 4× salary</li>
        <li><strong>Age 50:</strong> 6× salary</li>
        <li><strong>Age 55:</strong> 7× salary</li>
        <li><strong>Age 60:</strong> 8× salary</li>
        <li><strong>Age 67:</strong> 10× salary</li>
      </ul>
      <p>
        On a $90,000 salary, 3× at 40 means about $270,000 in retirement accounts;
        10× at 67 means $900,000 — a checkpoint separate from this calculator's
        spending-based target. Pension income, lower spending, or later retirement
        change the number you actually need.
      </p>
      <Sources
        items={[
          {
            label: "Fidelity Viewpoints, How much do I need to retire? (Sept. 25, 2026)",
            href: "https://www.fidelity.com/viewpoints/retirement/how-much-do-i-need-to-retire",
          },
        ]}
        checked="October 2026"
      />

      <h2>Case Study: Linda, 42, Targeting Retirement at 62</h2>
      <p>
        Linda earns $95,000 per year and wants $70,000 of annual spending in
        retirement (about 74% of today's pre-tax income). Using the 4%
        rule, her portfolio target is $70,000 ÷ 0.04 = $1,750,000. She already
        has $142,000 in her 401(k) and Roth IRA combined and contributes $950
        per month ($11,400 per year), including a 4% employer match on the
        first 6% of salary.
      </p>
      <p>
        At 7% returns, her balance and $950 monthly contributions grow to about
        $1.07 million by 62 — roughly $681,000 below the $1.75 million target.
        The calculator shows about $2,258 per month of total savings (including
        her $950) to hit the goal on time — an extra $1,308 per month, not a
        small tweak. Retiring at 63 with unchanged $950 contributions reaches
        about $1.16 million, or she can cut spending to $65,000 ($1.625 million
        target) and still need more than $950 per month. She uses this calculator
        to test each lever. For aggressive
        early-retirement targets, pair those runs with our{" "}
        <Link href="/calculators/fire-calculator" className="text-brand-600 hover:text-brand-800 font-medium">FIRE Calculator</Link>{" "}
        and the{" "}
        <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">Savings Goal Calculator</Link>{" "}
        to back into monthly savings for a fixed deadline.
      </p>

      <h2>Nest Egg Targets by Retirement Age</h2>
      <p>
        The table below assumes you want $65,000 per year from investments (not
        including Social Security or a pension). Earlier retirement usually
        requires a larger portfolio or a lower withdrawal rate because money
        must last longer.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50">
              <th className="px-3 py-2 font-semibold text-ink-900">Retire at age</th>
              <th className="px-3 py-2 font-semibold text-ink-900">Typical withdrawal rate</th>
              <th className="px-3 py-2 font-semibold text-ink-900">Portfolio needed ($65k/yr)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ink-100">
              <td className="px-3 py-2">55</td>
              <td className="px-3 py-2">~3.25%</td>
              <td className="px-3 py-2">~$2,000,000</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-3 py-2">60</td>
              <td className="px-3 py-2">~3.5%</td>
              <td className="px-3 py-2">~$1,860,000</td>
            </tr>
            <tr className="border-b border-ink-100">
              <td className="px-3 py-2">65</td>
              <td className="px-3 py-2">4%</td>
              <td className="px-3 py-2">~$1,625,000</td>
            </tr>
            <tr>
              <td className="px-3 py-2">67</td>
              <td className="px-3 py-2">4%</td>
              <td className="px-3 py-2">~$1,625,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        With the calculator's default inputs (age 30, retire at 65, $50,000 saved,
        $1,000 per month, 7% return, $60,000 desired income, 4% withdrawal), the
        projection is about $2.38 million versus a $1.5 million target — on track
        with roughly $95,000 per year of sustainable income at 4%. At 67, full
        Social Security replaces part of that need: SSA estimates the average
        retired-worker benefit at $2,170 per month in January 2027 after the 3.6%
        COLA, so $65,000 from investments might stack on top of about $26,000 in
        benefits rather than replace an entire paycheck.
      </p>

      <h2>Retirement Account Types</h2>

      <h3>401(k) / 403(b)</h3>
      <p>
        Employer-sponsored plans with tax-deferred growth. 2026 contribution
        limit: {usd(RETIREMENT_LIMITS.employeeDeferral)} ({usd(RETIREMENT_LIMITS.employeeDeferral + RETIREMENT_LIMITS.catchUp50)} if age 50+). Many employers match a percentage
        of your contributions — this is essentially free money.
      </p>

      <h3>Traditional IRA</h3>
      <p>
        Contributions may be tax-deductible. Growth is tax-deferred until
        withdrawal. 2026 limit: {usd(RETIREMENT_LIMITS.ira)} ({usd(RETIREMENT_LIMITS.ira + RETIREMENT_LIMITS.iraCatchUp50)} if 50+). Best if you expect to
        be in a lower tax bracket in retirement.
      </p>

      <h3>Roth IRA</h3>
      <p>
        Contributions are made with after-tax dollars, but growth and
        withdrawals are tax-free. Same contribution limits as Traditional IRA.
        Best if you expect to be in a higher tax bracket in retirement or want
        tax-free income flexibility.
      </p>
      <p>
        Not sure which account to use? Compare options in our guide: <Link href="/guides/401k-vs-roth-ira" className="text-brand-600 hover:text-brand-800 font-medium">401(k) vs Roth IRA: Which Is Better for You?</Link>
      </p>

      <h3>HSA (Health Savings Account)</h3>
      <p>
        Triple tax advantage: tax-deductible contributions, tax-free growth,
        and tax-free withdrawals for medical expenses. After age 65, can be
        used for any expense (taxed like a traditional IRA). 2026 limit:
        {usd(HSA_LIMITS.selfOnly)} self-only / {usd(HSA_LIMITS.family)} family.
      </p>
      <Sources
        items={[TAX_SOURCES.retirementLimits, TAX_SOURCES.hsaLimits]}
        checked={TAX_DATA.checkedOnLabel}
      />

      <h2>Maximizing Your Retirement Savings</h2>
      <ul>
        <li><strong>Capture your full employer match</strong> — this is an immediate 50-100% return on your money.</li>
        <li><strong>Increase contributions with every raise</strong> — if you get a 3% raise, put 2% more toward retirement. You'll never miss money you never had.</li>
        <li><strong>Keep fees under 0.3%</strong> — choose low-cost index funds. A 1% fee vs 0.1% fee can cost you hundreds of thousands over a career.</li>
        <li><strong>Don't touch it early</strong> — early withdrawals incur a 10% penalty plus income taxes. Leave it invested.</li>
        <li><strong>Rebalance annually</strong> — maintain your target asset allocation to manage risk as you age.</li>
      </ul>

      <h2>Social Security Considerations</h2>
      <p>
        Full retirement age is 67 for workers born in 1960 or later. Claiming at
        62 permanently reduces the monthly benefit by about 30% versus waiting
        until 67; delaying to 70 adds up to 24% above the full retirement age
        amount. SSA's estimate for the average retired-worker benefit in January
        2027 is $2,170 per month after the 3.6% COLA ($2,095 before it); the
        September 2026 statistical snapshot shows $2,089 for retired workers in
        current payment status.
      </p>
      <p>
        For planning, download your my Social Security statement for a personal
        estimate, then decide how much portfolio income must cover healthcare,
        travel, and housing. Many planners treat Social Security as a partial
        offset, not the entire income floor.
      </p>
      <Sources
        items={[
          {
            label: "SSA, 2027 COLA fact sheet (Oct. 2026)",
            href: "https://www.ssa.gov/news/en/cola/factsheets/2027.html",
          },
          {
            label: "SSA Monthly Statistical Snapshot, September 2026",
            href: "https://www.ssa.gov/policy/docs/quickfacts/stat_snapshot/",
          },
        ]}
        checked="October 2026"
      />

      <h2>Frequently Asked Questions</h2>

      <h3>What return rate should I assume?</h3>
      <p>
        For a diversified portfolio, 7% (after inflation) is a common
        assumption for stocks over long periods. If you want to be more
        conservative, use 5-6%. For a mix of stocks and bonds, 5-6% is
        appropriate.
      </p>

      <h3>When should I start saving for retirement?</h3>
      <p>
        Now. Every decade you delay roughly doubles the monthly amount you need
        to save. Starting at 25 versus 35 means needing to save about half as
        much per month to reach the same retirement target.
      </p>

      <h3>Can I retire early?</h3>
      <p>
        Yes, with the FIRE (Financial Independence, Retire Early) approach.
        This typically requires saving 50-70% of income and accumulating 25-33x
        your annual expenses. Many FIRE adherents retire in their 40s or 50s
        by maintaining low expenses and high savings rates.
      </p>
      <p>
        Planning to retire before 60? Read our guide: <Link href="/guides/how-much-to-retire-at-55" className="text-brand-600 hover:text-brand-800 font-medium">How Much Do I Need to Retire at 55?</Link>
      </p>
    </>
  );
}
