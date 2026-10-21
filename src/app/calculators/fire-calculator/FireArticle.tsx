import Link from "next/link";

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
        Some planners recommend a more conservative 3.5% rate given lower expected future returns
        and longer retirement horizons for early retirees. A 3.5% rate means multiplying expenses
        by roughly 28.6 instead of 25. For detailed retirement planning scenarios, see our guide
        on{" "}
        <Link
          href="/guides/how-much-to-retire-at-55"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How Much Do You Need to Retire at 55?
        </Link>
        .
      </p>

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

      <h2>Case Study: Michael's Path to FIRE at 42</h2>
      <p>
        Michael is a 32-year-old software engineer earning $90,000 after taxes in Denver,
        Colorado. He currently spends $45,000 per year — including $18,000 on housing, $6,000 on
        food, $5,000 on transportation, and $16,000 on everything else. He has $120,000 saved
        across his 401(k), Roth IRA, and taxable brokerage account.
      </p>
      <p>
        Michael's savings rate is 50% — he saves $45,000 per year. His FIRE number at a 4%
        withdrawal rate is $1,125,000 ($45,000 divided by 0.04). Using our calculator with a 7%
        expected return and 3% expense inflation, Michael reaches FIRE in approximately 10 years
        at age 42.
      </p>
      <p>
        Here is how his wealth builds: starting with $120,000, adding $45,000 annually, and
        compounding at 7%, his portfolio crosses $500,000 by year 5, $750,000 by year 7, and
        surpasses $1.125 million by year 10. Even accounting for inflation increasing his target
        to roughly $1.46 million, his portfolio growth outpaces the rising target because
        investment returns exceed the inflation rate.
      </p>
      <p>
        Michael's key decisions: he maxes his 401(k) and Roth IRA ($30,500 combined in
        2024), lives in a modest apartment rather than buying, drives a used car, and cooks most
        meals at home. His high income in a moderate cost-of-living city makes a 50% savings rate
        achievable without extreme deprivation.
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
            <td className="py-2 text-ink-600">32 years</td>
            <td className="py-2 text-ink-600">$1,250,000</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">30%</td>
            <td className="py-2 text-ink-600">$71,429</td>
            <td className="py-2 text-ink-600">$21,429</td>
            <td className="py-2 text-ink-600">22 years</td>
            <td className="py-2 text-ink-600">$1,250,000</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">50%</td>
            <td className="py-2 text-ink-600">$100,000</td>
            <td className="py-2 text-ink-600">$50,000</td>
            <td className="py-2 text-ink-600">11 years</td>
            <td className="py-2 text-ink-600">$1,250,000</td>
          </tr>
          <tr>
            <td className="py-2 text-ink-600">70%</td>
            <td className="py-2 text-ink-600">$166,667</td>
            <td className="py-2 text-ink-600">$116,667</td>
            <td className="py-2 text-ink-600">6 years</td>
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
        A 50% savings rate typically leads to FIRE in 15 to 17 years. A 65% rate can achieve it
        in 10 to 12 years. The average American saves roughly 5% to 7% of income, which is why
        traditional retirement at 65 remains the norm. Even increasing from 10% to 25% makes a
        dramatic difference.
      </p>

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
