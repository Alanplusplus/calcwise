import Link from "next/link";
import Image from "next/image";
import { Sources } from "@/components/Sources";

export function InflationArticle() {
  return (
    <>
      <Image
        src="/images/inflation-infographic.webp"
        alt="Inflation infographic showing $100 losing purchasing power at 3% inflation (74% after 10 years, 55% after 20, 41% after 30) and the average yearly BLS price change by category from September 2006 to September 2026"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <h2>How Inflation Works</h2>
      <p>
        Inflation measures the rate at which the general level of prices for
        goods and services rises over time, eroding the purchasing power of each
        dollar you hold. When inflation runs at 3% per year, something that costs
        $100 today will cost $103 next year, about $134 in 10 years, and $243 in 30
        years. At the September 2026 CPI-U pace of 3.7%, that same $100 item needs
        about $104 next year and $144 in 10 years. The effect compounds, which means
        the damage accelerates the longer you hold cash without earning a return
        that outpaces inflation.
      </p>
      <p>
        The U.S. Bureau of Labor Statistics tracks inflation through the Consumer
        Price Index (CPI). The all-items CPI-U rose 3.7% for the 12 months ending
        September 2026 (index level 336.940, released October 14, 2026). Core
        inflation (all items less food and energy) rose 2.6%, while the food index
        rose 2.5% and energy 20.4%. The Federal Reserve targets 2% inflation over
        the longer run as measured by PCE, which often runs slightly below CPI-U.
        Understanding your personal inflation rate — weighted toward the
        categories you spend the most on — is more useful than watching headline
        CPI alone.
      </p>
      <p>
        Inflation is not uniformly distributed across categories. In the 20 years
        from September 2006 to September 2026, the BLS index for college tuition
        and fees rose 3.4% a year and shelter rose 3.1%, versus 2.6% for all
        items, while information technology commodities fell 3.0% a year. If your
        budget skews toward the faster-rising categories, your personal inflation
        rate can sit above the headline figure. Use the calculator above to model
        different rates and see how they compound over your specific time horizon.
      </p>
      <Sources
        items={[
          {
            label: "BLS CPI — September 2026 (released Oct. 14, 2026)",
            href: "https://www.bls.gov/news.release/cpi.htm",
          },
          {
            label: "Federal Reserve — 2% longer-run PCE inflation objective",
            href: "https://www.federalreserve.gov/faqs/economy_14400.htm",
          },
        ]}
        checked="October 2026"
        note="Headline CPI-U can differ from the Fed's PCE target; both are useful for planning bounds."
      />

      <h2>The Rule of 72: A Mental Shortcut</h2>
      <p>
        The Rule of 72 provides a quick way to estimate how long it takes for
        prices to double at a given inflation rate. Divide 72 by the annual rate:
        at 3% inflation, prices double in roughly 24 years; at 6%, in just 12
        years. This mental model is valuable for retirement planning — if you are
        30 years old and plan to retire at 65, prices will approximately double
        during that period at a 2% rate, or triple at 3%. Your{" "}
        <Link
          href="/calculators/retirement"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          retirement savings target
        </Link>{" "}
        must account for this future cost increase, not just today's expenses.
      </p>
      <p>
        The Rule of 72 also works in reverse for investments. If your savings
        earn 7% annually, your money doubles roughly every 10 years. The gap
        between your investment return and the inflation rate is your real
        return — the only number that matters for building purchasing power.
        A savings account earning 4% during 3% inflation delivers only a 1% real
        return, meaning it takes 72 years for your actual buying power to double.
      </p>

      <h2>Inflation Categories: What Rises Fastest</h2>
      <p>
        Not all prices move at the same rate. The table below shows the average
        annual change in selected BLS CPI-U categories from September 2006 to
        September 2026 (not seasonally adjusted, U.S. city average), and what $100
        of each category would cost after 20 and 30 years. The 20-year column is
        the measured change; the 30-year column assumes the same rate continues.
        Small differences in the rate compound into large differences over long
        horizons.
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 pr-4 text-left font-semibold">Category</th>
            <th className="py-2 pr-4 text-left font-semibold">Avg Annual Rate</th>
            <th className="py-2 pr-4 text-left font-semibold">$100 After 20 Years</th>
            <th className="py-2 text-left font-semibold">$100 After 30 Years</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">General CPI (All Items)</td>
            <td className="py-2 pr-4">2.6%</td>
            <td className="py-2 pr-4">$166</td>
            <td className="py-2">$214</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Medical Care</td>
            <td className="py-2 pr-4">2.9%</td>
            <td className="py-2 pr-4">$175</td>
            <td className="py-2">$232</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">College Tuition & Fees</td>
            <td className="py-2 pr-4">3.4%</td>
            <td className="py-2 pr-4">$195</td>
            <td className="py-2">$272</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Housing (Shelter)</td>
            <td className="py-2 pr-4">3.1%</td>
            <td className="py-2 pr-4">$185</td>
            <td className="py-2">$251</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">Food at Home</td>
            <td className="py-2 pr-4">2.6%</td>
            <td className="py-2 pr-4">$166</td>
            <td className="py-2">$213</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">IT Commodities (computers, phones, software)</td>
            <td className="py-2 pr-4">-3.0%</td>
            <td className="py-2 pr-4">$55</td>
            <td className="py-2">$40</td>
          </tr>
        </tbody>
      </table>
      <p>
        College tuition and shelter rose faster than the headline index, while
        medical care ran only slightly above it (2.9% versus 2.6%). A medical
        bill that cost $10,000 in September 2006 would cost about $17,500 in
        September 2026 at the measured pace. CPI tracks the price of a fixed
        basket of services, not your total spending, so your own healthcare and
        tuition bills can grow faster than the index as usage and quality change.
        Many planners therefore model 4–5% for those categories as a deliberate
        cushion; that is a planning choice, not a BLS measurement. Health savings
        accounts (HSAs) and 529 plans are common ways to earmark money for these
        costs.{" "}
        <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">
          Set a savings goal
        </Link>{" "}
        with the category-specific rate you choose.
      </p>
      <Sources
        items={[
          {
            label: "BLS CPI-U category indexes via FRED (CPIAUCNS, CPIMEDNS, CUUR0000SEEB, CUUR0000SAH1, CUUR0000SAF11, CUUR0000SEEE)",
            href: "https://fred.stlouisfed.org/series/CPIAUCNS",
          },
        ]}
        checked="October 2026"
        note="Rates are compound annual changes from September 2006 to September 2026; the 30-year column extends the same rate."
      />

      <h2>Case Study: David, a 35-Year-Old Planning for Retirement</h2>
      <p>
        David earns $85,000 per year and spends approximately $4,500 per month
        on living expenses. He plans to retire at 65, giving him a 30-year
        planning horizon. At 3% inflation, his $4,500 monthly budget requires
        about $10,900 per month in 30 years ($131,000 per year in future dollars).
        Stress-testing at 3.7% (near the September 2026 CPI pace) pushes that need
        to about $13,100 per month ($157,000 per year).
      </p>
      <p>
        David currently has $95,000 in his 401(k) and contributes $800 per month.
        Assuming 7% nominal returns and 3% inflation, his portfolio grows to
        approximately $1,020,000 in nominal terms by age 65. In today's
        dollars, that is about $420,000 of real purchasing power. Using the 4%
        safe withdrawal rate, he could draw roughly $16,800 per year in real
        terms — far short of the $54,000 per year (in today's dollars) he
        needs.
      </p>
      <p>
        The gap reveals what many savers miss: a portfolio that sounds large in
        future dollars may fall dramatically short once inflation is factored in.
        David increased his contributions to $1,500 per month and shifted his
        allocation to include more equities and inflation-protected securities.
        Using our{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest Calculator
        </Link>
        , he projects that the higher contribution rate puts him on track for
        roughly $1,800,000 nominal ($740,000 real), generating about $29,600 per
        year in real withdrawals — much closer to his target when combined with
        projected Social Security benefits.
      </p>

      <h2>Comparison: Different Inflation Scenarios</h2>
      <p>
        The table below shows how a $50,000 annual income requirement grows
        under different inflation assumptions over 10, 20, and 30 years. Even
        small differences in the inflation rate produce dramatic cost increases
        over multi-decade horizons.
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 pr-4 text-left font-semibold">Inflation Rate</th>
            <th className="py-2 pr-4 text-left font-semibold">After 10 Years</th>
            <th className="py-2 pr-4 text-left font-semibold">After 20 Years</th>
            <th className="py-2 text-left font-semibold">After 30 Years</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">2%</td>
            <td className="py-2 pr-4">$60,950</td>
            <td className="py-2 pr-4">$74,300</td>
            <td className="py-2">$90,570</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">3%</td>
            <td className="py-2 pr-4">$67,200</td>
            <td className="py-2 pr-4">$90,300</td>
            <td className="py-2">$121,360</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">3.7%</td>
            <td className="py-2 pr-4">$71,905</td>
            <td className="py-2 pr-4">$103,406</td>
            <td className="py-2">$148,707</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 pr-4">4%</td>
            <td className="py-2 pr-4">$74,010</td>
            <td className="py-2 pr-4">$109,560</td>
            <td className="py-2">$162,170</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">5%</td>
            <td className="py-2 pr-4">$81,440</td>
            <td className="py-2 pr-4">$132,660</td>
            <td className="py-2">$216,100</td>
          </tr>
        </tbody>
      </table>
      <p>
        At 2% inflation, your $50,000 need grows to about $90,600 in 30 years.
        At 5%, the same purchasing power requires $216,100. That is a $125,500
        difference driven entirely by a 3 percentage point change in the
        inflation assumption. This is why financial planners stress-test
        retirement plans at multiple inflation rates, and why your{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          savings goals
        </Link>{" "}
        should target real (inflation-adjusted) returns rather than nominal ones.
      </p>

      <h2>Strategies to Protect Against Inflation</h2>
      <p>
        The most reliable inflation hedge for long-term investors is broad
        equity exposure. Stocks have delivered roughly 7% real (after-inflation)
        returns over the past century, outpacing inflation by a wide margin.
        Short-term, stocks are volatile, but over 20-30 year horizons, they
        have consistently preserved and grown purchasing power better than
        bonds, cash, or gold.
      </p>
      <p>
        Treasury Inflation-Protected Securities (TIPS) offer direct inflation
        protection for the conservative portion of your portfolio. The
        principal value adjusts with CPI, guaranteeing that your investment
        keeps pace with official inflation. I Bonds, issued by the U.S.
        Treasury, provide similar protection with a fixed rate plus a variable
        inflation adjustment, and are currently one of the few risk-free ways to
        earn a positive real return.
      </p>
      <p>
        Real estate has historically appreciated at roughly the rate of inflation
        plus 1-3%, making it a useful hedge for homeowners. Rental income also
        tends to rise with inflation, providing a natural income escalator.
        However, real estate is illiquid and requires active management — it
        is a hedge, not a substitute for a diversified investment portfolio.
        Review your overall financial picture with our{" "}
        <Link
          href="/guides/how-much-to-retire-at-55"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          retirement planning guide
        </Link>{" "}
        to see how inflation protection fits into your broader strategy.
      </p>
      <p>
        For cash reserves, keep only what you need for emergencies and near-term
        expenses in savings accounts. Move the rest into investments with
        positive real returns. Even a high-yield savings account earning 4.5%
        APY loses purchasing power when inflation exceeds that rate. Use our{" "}
        <Link
          href="/guides/compound-interest-real-examples"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          compound interest examples
        </Link>{" "}
        to see how small differences in real returns compound over decades.
      </p>

      <h2>Frequently Asked Questions</h2>
      <h3>What is a good inflation rate to use for planning?</h3>
      <p>
        For general financial planning, 3% remains a common long-run estimate,
        while 3.7% reflects the September 2026 CPI-U 12-month change. The Federal
        Reserve targets 2% PCE inflation over the longer run — often below
        headline CPI. BLS data show 2.9% a year for medical care and 3.4% for
        college tuition and fees over the past 20 years, so a 4–5% assumption for
        those categories is a deliberate cushion rather than a measured rate.
        Conservative planners bracket scenarios at 2%, 3.7%, and 4%.
      </p>
      <h3>Does inflation affect everyone equally?</h3>
      <p>
        No. Inflation hits lower-income households harder because they spend a
        larger share of income on necessities like food, housing, and energy —
        categories that often inflate faster than discretionary goods. Retirees
        living on fixed incomes are also disproportionately affected because
        their purchasing power declines every year if income does not adjust.
        Social Security includes cost-of-living adjustments (COLA), but these
        are based on CPI-W and may not fully reflect retiree spending patterns.
      </p>
      <h3>How does inflation affect my savings account?</h3>
      <p>
        If your savings account earns 4% APY and inflation is 3%, your real
        return is approximately 1%. After taxes on the interest (which are
        assessed on the nominal 4%, not the real 1%), your after-tax real return
        may be near zero or negative. This is why holding large cash balances
        long-term is one of the surest ways to lose purchasing power. Move
        excess cash beyond your emergency fund into tax-advantaged investment
        accounts.
      </p>
      <h3>Can deflation happen?</h3>
      <p>
        Yes, deflation (falling prices) has occurred historically, most notably
        during the Great Depression and briefly during the 2008-2009 financial
        crisis. While deflation sounds beneficial for consumers, it can trigger
        a destructive cycle: falling prices reduce business revenue, leading to
        layoffs, reduced spending, and further price declines. Central banks
        actively work to prevent sustained deflation, which is why most
        developed economies experience moderate positive inflation as the norm.
      </p>
      <h3>Should I adjust my budget for inflation each year?</h3>
      <p>
        Yes. Review your budget annually and increase expense categories by the
        actual inflation rate for that year. If you do not adjust, you will
        gradually underspend on savings targets and overspend on discretionary
        items relative to your plan. Track your actual spending against
        inflation-adjusted projections to stay on course for long-term goals
        like retirement and college funding.
      </p>
    </>
  );
}
