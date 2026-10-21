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

      <h2>The 4% Rule Explained</h2>
      <p>
        The 4% rule is a widely-used retirement planning guideline developed
        from the "Trinity Study." It states that you can withdraw 4%
        of your portfolio in your first year of retirement, then adjust for
        inflation each year after, with a high probability that your money lasts
        30+ years.
      </p>
      <p>
        To find how much you need: divide your desired annual income by 0.04.
        For $60,000/year in retirement income, you need $1,500,000 saved.
      </p>
      <p>
        This rule assumes a balanced portfolio (roughly 50-60% stocks, 40-50%
        bonds) and has historically worked in 95% of 30-year periods. Some
        financial planners now recommend a more conservative 3.5% rate given
        lower expected future returns.
      </p>

      <h2>How Much Do You Actually Need?</h2>
      <p>Common benchmarks by age (as a multiple of annual salary):</p>
      <ul>
        <li><strong>Age 30:</strong> 1x your annual salary saved</li>
        <li><strong>Age 35:</strong> 2x your annual salary</li>
        <li><strong>Age 40:</strong> 3x your annual salary</li>
        <li><strong>Age 45:</strong> 4x your annual salary</li>
        <li><strong>Age 50:</strong> 6x your annual salary</li>
        <li><strong>Age 55:</strong> 7x your annual salary</li>
        <li><strong>Age 60:</strong> 8x your annual salary</li>
        <li><strong>Age 67:</strong> 10x your annual salary</li>
      </ul>
      <p>
        These are general guidelines. Your actual need depends on your desired
        lifestyle, healthcare costs, Social Security benefits, pension income,
        and where you plan to live.
      </p>

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
        Assuming 7% average annual returns before inflation, her existing
        balance and contributions grow to roughly $1.62 million by age 62 —
        about $130,000 short of her goal. To close the gap, she can raise
        contributions by $175 per month (to $1,125 total), retire at 63 instead
        of 62, or plan on $65,000 spending ($1,625,000 target), which her
        projected nest egg nearly covers. She uses this calculator to test each
        lever before committing. For aggressive early-retirement targets, pair
        those runs with our{" "}
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
        At 67, many US workers can claim full Social Security, so $65,000 from
        investments might supplement $24,000-$30,000 in benefits rather than
        replace an entire paycheck. Retiring at 55 with the same lifestyle often
        means saving an extra $375,000-$400,000 versus a 65-year-old target, or
        working part-time for the first decade to limit portfolio withdrawals.
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
        Social Security replaces roughly 40% of pre-retirement income for
        average earners. The full retirement age is 67 for those born after
        1960. Claiming at 62 reduces benefits by ~30%, while delaying to 70
        increases them by ~24% versus full retirement age.
      </p>
      <p>
        For planning purposes, it's prudent to estimate Social Security
        will cover 25-40% of your retirement income needs and save enough to
        fund the rest independently.
      </p>

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
