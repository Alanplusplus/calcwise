import Link from "next/link";
import { Sources } from "@/components/Sources";
import { RETIREMENT_LIMITS, usd } from "@/lib/tax-data";

export function FireArticle() {
  return (
    <>
      <h2>What Is FIRE?</h2>
      <p>
        FIRE stands for Financial Independence, Retire Early — a movement built on the idea that
        by saving aggressively and investing wisely, you can accumulate enough wealth to live off
        your investments decades before traditional retirement age. Rather than working until 65
        and relying on Social Security, FIRE practitioners aim to reach a portfolio size that
        generates sufficient passive income to cover all living expenses indefinitely.
      </p>
      <p>
        The core math is straightforward: if your investments can sustainably produce enough
        income to cover your annual spending, you no longer need to work for money. You may still
        choose to work — many FIRE adherents pursue passion projects, part-time work, or
        volunteering — but the financial pressure to earn a paycheck disappears. This calculator
        shows your FIRE number, savings rate, and projected timeline based on your current
        financial situation.
      </p>
      <p>
        Explore how compound growth accelerates your timeline with our{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest Calculator
        </Link>
        , or compare your FIRE plan against traditional retirement with our{" "}
        <Link href="/calculators/retirement" className="text-brand-600 hover:text-brand-800 font-medium">
          Retirement Savings Calculator
        </Link>
        .
      </p>

      <h2>The 4% Rule and the Trinity Study</h2>
      <p>
        The foundation of FIRE planning is the 4% rule, derived from the Trinity Study published
        in 1998 by three professors at Trinity University. They analyzed historical US stock and
        bond returns from 1926 to 1995 and found that retirees who withdrew 4% of their portfolio
        in the first year — then adjusted for inflation each subsequent year — had a 95%
        probability of their money lasting at least 30 years.
      </p>
      <p>
        The practical application: multiply your annual expenses by 25 to find your FIRE number.
        If you spend $50,000 per year, you need $1,250,000 invested ($50,000 divided by 0.04).
        At a 4% withdrawal rate, that portfolio should generate $50,000 annually without
        depleting the principal over a 30-year retirement.
      </p>
      <p>
        Morningstar's February 2026 update estimates a 3.9% starting rate for new retirees
        seeking fixed inflation-adjusted withdrawals over 30 years (90% success in their model).
        Early retirees with 40+ year horizons often plan at 3.5% (about 28.6× expenses) or use
        flexible spending. For detailed retirement planning scenarios, see our guide on{" "}
        <Link
          href="/guides/how-much-to-retire-at-55"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How Much Do You Need to Retire at 55?
        </Link>
        .
      </p>
      <Sources
        items={[
          {
            label: "Morningstar, safe withdrawal rate research (Feb. 18, 2026)",
            href: "https://www.morningstar.com/retirement/morningstars-retirement-income-research-finding-your-safe-withdrawal-rate",
          },
        ]}
        checked="October 2026"
      />

      <h2>Types of FIRE</h2>
      <p>
        The FIRE movement has evolved into several distinct approaches, each with different
        spending targets and lifestyle expectations:
      </p>
      <ul>
        <li>
          <strong>Lean FIRE:</strong> Retiring on a minimal budget, typically $25,000 to $40,000
          per year. Lean FIRE practitioners live frugally, often in low-cost areas, and prioritize
          freedom over comfort. The required portfolio is smaller, but the lifestyle is austere.
        </li>
        <li>
          <strong>Regular FIRE:</strong> The standard approach targeting your actual current
          expenses. If you spend $50,000 per year, your FIRE number is $1.25 million at a 4%
          withdrawal rate. This maintains your current lifestyle without work income.
        </li>
        <li>
          <strong>Fat FIRE:</strong> Retiring with a cushion above your current spending, often
          $100,000 or more per year. Fat FIRE provides luxury and flexibility but requires a
          portfolio of $2.5 million or more. Popular among high earners who want to maintain an
          upper-middle-class lifestyle.
        </li>
        <li>
          <strong>Barista FIRE:</strong> Reaching partial financial independence where investment
          income covers most expenses, supplemented by part-time work for health insurance and
          discretionary spending. The portfolio target is lower because part-time income bridges
          the gap.
        </li>
      </ul>

      <h2>Case Study: Michael's Path to FIRE at 49</h2>
      <p>
        Michael is a 32-year-old software engineer earning $90,000 after taxes in Denver,
        Colorado. He spends $45,000 per year — $18,000 on housing, $6,000 on food, $5,000 on
        transportation, and $16,000 on everything else — and has $120,000 across his 401(k), Roth
        IRA, and taxable brokerage.
      </p>
      <p>
        His savings rate is 50% ($45,000 per year). At a 4% withdrawal rate his initial FIRE
        number is $1,125,000. With 7% returns and 3% expense inflation, this calculator shows
        about 17 years to FIRE — age 49, not 42 — because the inflation-adjusted target rises
        each year while contributions stay flat in nominal dollars.
      </p>
      <p>
        Year-by-year with the same assumptions: the portfolio reaches about $445,000 by year 5,
        $797,000 by year 9, and crosses the inflation-adjusted target near year 17 (portfolio
        about $1.35 million versus a target near $1.33 million). Returns above inflation help,
        but the timeline is longer than a static 25× rule suggests.
      </p>
      <p>
        Michael maxes tax-advantaged accounts where possible — in 2026 that is up to{" "}
        {usd(RETIREMENT_LIMITS.employeeDeferral)} in his 401(k) and {usd(RETIREMENT_LIMITS.ira)} in
        his IRA ({usd(RETIREMENT_LIMITS.employeeDeferral + RETIREMENT_LIMITS.ira)} combined before
        catch-up) — and sends overflow to taxable index funds. A moderate cost-of-living city
        makes a 50% rate feasible without extreme frugality.
      </p>

      <h2>Comparison Table: Years to FIRE at Different Savings Rates</h2>
      <p>
        The table below shows how long it takes to reach FIRE starting from $100,000 with $50,000
        annual expenses, a 4% withdrawal rate, 7% returns, and 3% expense inflation. Annual income
        varies to produce different savings rates:
      </p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 text-left font-medium text-ink-700">Savings Rate</th>
            <th className="py-2 text-left font-medium text-ink-700">Annual Income</th>
            <th className="py-2 text-left font-medium text-ink-700">Annual Savings</th>
            <th className="py-2 text-left font-medium text-ink-700">Years to FIRE</th>
            <th className="py-2 text-left font-medium text-ink-700">FIRE Number</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">20%</td>
            <td className="py-2 text-ink-600">$62,500</td>
            <td className="py-2 text-ink-600">$12,500</td>
            <td className="py-2 text-ink-600">40 years</td>
            <td className="py-2 text-ink-600">$1,250,000</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">30%</td>
            <td className="py-2 text-ink-600">$71,429</td>
            <td className="py-2 text-ink-600">$21,429</td>
            <td className="py-2 text-ink-600">31 years</td>
            <td className="py-2 text-ink-600">$1,250,000</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">50%</td>
            <td className="py-2 text-ink-600">$100,000</td>
            <td className="py-2 text-ink-600">$50,000</td>
            <td className="py-2 text-ink-600">18 years</td>
            <td className="py-2 text-ink-600">$1,250,000</td>
          </tr>
          <tr>
            <td className="py-2 text-ink-600">70%</td>
            <td className="py-2 text-ink-600">$166,667</td>
            <td className="py-2 text-ink-600">$116,667</td>
            <td className="py-2 text-ink-600">9 years</td>
            <td className="py-2 text-ink-600">$1,250,000</td>
          </tr>
        </tbody>
      </table>
      <p>
        The relationship is not linear — doubling your savings rate more than halves your timeline
        because higher savings both add more principal and reduce your FIRE number target. This is
        why savings rate is the most powerful lever in FIRE planning. For real-world examples of
        compound growth, read{" "}
        <Link
          href="/guides/compound-interest-real-examples"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest: Real-World Examples
        </Link>
        .
      </p>

      <h2>How to Accelerate Your FIRE Timeline</h2>
      <p>
        If your projected timeline feels too long, several strategies can compress it
        significantly:
      </p>
      <ul>
        <li>
          <strong>Increase income:</strong> A raise, side hustle, or career change that adds
          $10,000 to savings (while keeping expenses flat) can shave 3 to 5 years off your
          timeline. Every dollar of additional income directed to savings has a double effect.
        </li>
        <li>
          <strong>Reduce expenses:</strong> Cutting $500 per month ($6,000 per year) lowers both
          your FIRE number by $150,000 and adds $6,000 to annual savings. This dual impact is
          more powerful than earning the same amount extra.
        </li>
        <li>
          <strong>Maximize tax-advantaged accounts:</strong> Contributing to a 401(k), Roth IRA,
          and HSA reduces your tax burden and lets investments grow tax-free or tax-deferred,
          effectively boosting your real return rate.
        </li>
        <li>
          <strong>Optimize investment fees:</strong> Switching from actively managed funds (1%+
          fees) to low-cost index funds (0.03% to 0.10%) can add 0.5% to 1% to your annual
          returns, compounding into hundreds of thousands over a career.
        </li>
        <li>
          <strong>Consider geo-arbitrage:</strong> Relocating to a lower cost-of-living area
          reduces your FIRE number and may allow you to maintain or increase your savings rate
          if remote work is an option.
        </li>
      </ul>
      <p>
        Use our{" "}
        <Link
          href="/calculators/investment-return"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Investment Return Calculator
        </Link>{" "}
        to model how different return rates affect your portfolio growth over time.
      </p>

      <h2>Common FIRE Planning Mistakes</h2>
      <ul>
        <li>
          <strong>Underestimating healthcare costs:</strong> Early retirees lose employer health
          insurance. Budget $500 to $1,500 per month for ACA marketplace plans until Medicare at
          65.
        </li>
        <li>
          <strong>Ignoring sequence-of-returns risk:</strong> A market crash in your first years
          of retirement can permanently impair your portfolio. Maintain a cash buffer and consider
          a bond tent strategy.
        </li>
        <li>
          <strong>Using pre-tax income for calculations:</strong> FIRE numbers should be based on
          after-tax spending. A $60,000 gross income with $12,000 in taxes means $48,000 in
          actual spending power.
        </li>
        <li>
          <strong>Forgetting about inflation:</strong> Your FIRE number in today's dollars
          will need to be higher in future dollars. This calculator accounts for expense inflation
          in the target projection.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What savings rate do I need for FIRE?</h3>
      <p>
        With this calculator's inflation-adjusted target, a 50% rate ($50,000 saved on $100,000
        income, $50,000 expenses) from $100,000 starting balance takes about 18 years at 7% returns.
        A 70% rate reaches FIRE in about 9 years on the same assumptions. The BEA personal saving
        rate averaged about 4.7% from January through August 2026 — far below FIRE levels.
      </p>
      <Sources
        items={[
          {
            label: "BEA personal saving rate (August 2026 release)",
            href: "https://www.bea.gov/data/income-saving/personal-saving-rate",
          },
        ]}
        checked="October 2026"
        note="FIRE timelines in the comparison table assume $100,000 starting balance, $50,000 expenses, 7% returns, 4% withdrawal, and 3% expense inflation."
      />

      <h3>Is 7% a realistic return assumption?</h3>
      <p>
        The S&P 500 has returned approximately 10% nominally over long periods, or roughly
        7% after adjusting for inflation. A diversified portfolio of stocks and bonds might
        assume 6% to 7% nominal returns. Being conservative in your projections is prudent —
        reaching FIRE a year later than expected is far better than falling short.
      </p>

      <h3>Can I FIRE with debt?</h3>
      <p>
        High-interest debt (credit cards, personal loans) should be eliminated before pursuing
        FIRE aggressively. Low-interest mortgage debt is debatable — some FIRE advocates pay it
        off for peace of mind, while others invest instead when mortgage rates are below expected
        investment returns.
      </p>

      <h3>What about Social Security?</h3>
      <p>
        Many FIRE planners ignore Social Security as a conservative buffer — if you reach FIRE at
        42, Social Security at 67 becomes a bonus that reduces your withdrawal rate or increases
        your spending flexibility. Including it can reduce your required portfolio by 10% to 20%.
      </p>
    </>
  );
}
