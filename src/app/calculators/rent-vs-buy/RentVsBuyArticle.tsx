import Link from "next/link";

export function RentVsBuyArticle() {
  return (
    <>
      <h2>How the Calculator Works</h2>
      <p>
        The rent vs buy decision is one of the most consequential financial choices you will make,
        yet it is often reduced to a simple monthly payment comparison. Our calculator takes a
        comprehensive approach by modeling the full economic picture over your chosen time horizon.
        It accounts for mortgage payments, property taxes, homeowners insurance, maintenance costs,
        closing costs, home appreciation, rent increases, and the investment returns a renter could
        earn by keeping their down payment in the market.
      </p>
      <p>
        For the buying scenario, the calculator tracks your mortgage amortization, accumulating
        housing costs, and growing home equity through both principal payments and appreciation.
        For the renting scenario, it assumes you invest your down payment and any monthly savings
        when renting costs less than owning. The result is a side-by-side comparison of net cost
        and net wealth for each path, plus a break-even year showing when buying begins to
        outperform renting.
      </p>
      <p>
        Use our{" "}
        <Link href="/calculators/mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
          Mortgage Payment Calculator
        </Link>{" "}
        to estimate your monthly payment, and our{" "}
        <Link
          href="/calculators/home-affordability"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Home Affordability Calculator
        </Link>{" "}
        to determine whether you qualify for the home price you are considering.
      </p>

      <h2>The Hidden Costs of Homeownership</h2>
      <p>
        Many first-time buyers focus exclusively on the mortgage payment and overlook the ongoing
        costs that make homeownership significantly more expensive than the sticker price suggests.
        Property taxes typically run 1% to 2% of home value annually and tend to rise over time,
        even when your mortgage payment stays fixed. Maintenance and repairs average 1% to 2% of
        home value per year — a $350,000 home may require $3,500 to $7,000 annually for HVAC
        service, roof repairs, plumbing, and general upkeep.
      </p>
      <p>
        Homeowners insurance adds another $1,200 to $2,000 per year depending on location and
        coverage. Closing costs at purchase — including origination fees, title insurance, and
        inspections — typically total 2% to 5% of the purchase price. If you sell within a few
        years, you will also pay 5% to 6% in real estate agent commissions. These costs do not build
        equity and are easy to underestimate when comparing a mortgage payment to a rent check.
      </p>
      <p>
        For a deeper look at the full decision framework, read our guide on{" "}
        <Link
          href="/guides/rent-vs-buy-decision"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Rent vs Buy: How to Make the Right Decision
        </Link>
        .
      </p>

      <h2>The Opportunity Cost of Renting</h2>
      <p>
        Renting is often dismissed as &quot;throwing money away,&quot; but this ignores a critical
        advantage: liquidity. When you rent, your down payment remains invested and can compound
        at market rates. A $70,000 down payment invested at 7% annual return grows to roughly
        $112,000 in seven years — wealth you would not have if that money were tied up in home
        equity.
      </p>
      <p>
        Renters also avoid the risk of home value declines. During the 2008 housing crisis, many
        homeowners found themselves underwater — owing more than their home was worth — while
        renters with invested portfolios recovered more quickly. Renting provides flexibility to
        relocate for career opportunities without the friction and cost of selling. In high-cost
        markets where price-to-rent ratios exceed 20, renting and investing the difference
        historically outperforms buying for periods under 10 years.
      </p>
      <p>
        The key insight is that renting is not inherently wasteful — it becomes costly only when
        you fail to invest the savings. If your total housing cost as a renter is lower than
        owning, directing that difference into index funds can build substantial wealth over time.
      </p>

      <h2>Case Study: Alex and Jamie in Austin</h2>
      <p>
        Alex and Jamie are a dual-income couple in Austin, Texas, earning a combined $145,000
        per year. They have saved $70,000 for a down payment and are deciding between buying a
        $350,000 townhouse or continuing to rent a comparable two-bedroom apartment for $2,100
        per month.
      </p>
      <p>
        Using a 6.75% mortgage rate on a 30-year loan, their monthly mortgage payment would be
        approximately $1,810. Adding property taxes ($350/month), insurance ($100/month), and
        maintenance ($290/month), their total monthly ownership cost reaches roughly $2,550 — $450
        more than their rent.
      </p>
      <p>
        Over seven years with 3% home appreciation and 3% annual rent increases, buying builds
        approximately $195,000 in home equity (including appreciation). However, Alex and Jamie
        would have paid roughly $214,000 in total housing costs net of that equity. As renters
        investing their $70,000 down payment plus $450 monthly savings at 7% returns, their
        investment portfolio would grow to approximately $178,000 while paying $183,000 in rent.
        Their net cost of renting would be just $5,000 — far less than the net cost of buying.
      </p>
      <p>
        In this scenario, renting wins over a seven-year horizon. However, if Alex and Jamie plan
        to stay 12 or more years, buying begins to pull ahead as rent increases compound and
        mortgage principal builds equity faster. Their break-even point falls around year 9.
      </p>

      <h2>Break-Even Analysis at Different Time Horizons</h2>
      <p>
        The break-even point — when buying builds more wealth than renting — depends heavily on
        how long you stay. Here is how the Austin scenario plays out at different horizons using
        the same assumptions:
      </p>
      <ul>
        <li>
          <strong>3 years:</strong> Renting wins decisively. Transaction costs of buying and
          selling (closing costs plus agent fees) consume 8% to 10% of home value, making short
          ownership periods expensive regardless of appreciation.
        </li>
        <li>
          <strong>5 years:</strong> Renting still leads in most moderate-appreciation markets.
          The renter&apos;s invested down payment has compounded significantly while the buyer
          has paid mostly interest.
        </li>
        <li>
          <strong>7 years:</strong> The gap narrows. In high-appreciation markets like Austin,
          Denver, or Nashville, buying may begin to match renting. In slower markets, renting
          still leads.
        </li>
        <li>
          <strong>10 years:</strong> Buying typically wins in most markets with average
          appreciation. Equity accumulation and appreciation outpace the renter&apos;s investment
          portfolio, especially as rent increases erode the renter&apos;s monthly savings advantage.
        </li>
      </ul>
      <p>
        The lesson: your expected tenure in the home is the single most important variable. If you
        might relocate within five years, run the numbers carefully before buying.
      </p>

      <h2>Comparison Table: Rent vs Buy at Different Price Points</h2>
      <p>
        The table below shows seven-year outcomes at different home prices and rent levels,
        assuming a 20% down payment, 6.75% mortgage rate, 3% appreciation, 3% rent increases, and
        7% investment returns:
      </p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="py-2 text-left font-medium text-ink-700">Home Price</th>
            <th className="py-2 text-left font-medium text-ink-700">Monthly Rent</th>
            <th className="py-2 text-left font-medium text-ink-700">Buy Net Wealth</th>
            <th className="py-2 text-left font-medium text-ink-700">Rent Net Wealth</th>
            <th className="py-2 text-left font-medium text-ink-700">Winner (7 yr)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">$250,000</td>
            <td className="py-2 text-ink-600">$1,500</td>
            <td className="py-2 text-ink-600">$138,000</td>
            <td className="py-2 text-ink-600">$142,000</td>
            <td className="py-2 text-ink-600">Rent</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">$350,000</td>
            <td className="py-2 text-ink-600">$2,000</td>
            <td className="py-2 text-ink-600">$195,000</td>
            <td className="py-2 text-ink-600">$178,000</td>
            <td className="py-2 text-ink-600">Buy</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">$350,000</td>
            <td className="py-2 text-ink-600">$2,500</td>
            <td className="py-2 text-ink-600">$195,000</td>
            <td className="py-2 text-ink-600">$155,000</td>
            <td className="py-2 text-ink-600">Buy</td>
          </tr>
          <tr className="border-b border-ink-100">
            <td className="py-2 text-ink-600">$500,000</td>
            <td className="py-2 text-ink-600">$2,800</td>
            <td className="py-2 text-ink-600">$278,000</td>
            <td className="py-2 text-ink-600">$248,000</td>
            <td className="py-2 text-ink-600">Buy</td>
          </tr>
          <tr>
            <td className="py-2 text-ink-600">$500,000</td>
            <td className="py-2 text-ink-600">$3,500</td>
            <td className="py-2 text-ink-600">$278,000</td>
            <td className="py-2 text-ink-600">$210,000</td>
            <td className="py-2 text-ink-600">Buy</td>
          </tr>
        </tbody>
      </table>
      <p>
        Notice how the rent-to-price ratio shifts the outcome. When rent is low relative to home
        price (as with the $250,000 home at $1,500 rent), renting and investing wins. When rent is
        high relative to price, buying captures more value. For guidance on setting your budget,
        see{" "}
        <Link
          href="/guides/how-much-house-can-i-afford"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          How Much House Can I Afford?
        </Link>
      </p>

      <h2>Key Factors That Tip the Decision</h2>
      <ul>
        <li>
          <strong>Time horizon:</strong> The longer you stay, the more buying favors you. Under
          five years, renting almost always wins after transaction costs.
        </li>
        <li>
          <strong>Price-to-rent ratio:</strong> Divide home price by annual rent. Ratios above 20
          favor renting; below 15 favor buying.
        </li>
        <li>
          <strong>Investment discipline:</strong> Renting only wins if you actually invest the
          savings. Without that discipline, buying forces equity building.
        </li>
        <li>
          <strong>Tax benefits:</strong> Mortgage interest and property tax deductions can reduce
          the cost of ownership, though the standard deduction limits this benefit for many
          taxpayers.
        </li>
        <li>
          <strong>Local market conditions:</strong> Appreciation rates, property tax policies, and
          rent control laws vary dramatically by city and state.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Is renting really throwing money away?</h3>
      <p>
        No. Rent buys you housing and flexibility. The money is not wasted — it is exchanged for
        shelter. The real question is whether the total cost of renting (minus investment gains)
        exceeds the total cost of buying (minus equity) over your time horizon.
      </p>

      <h3>What down payment should I assume?</h3>
      <p>
        Twenty percent is the standard for avoiding private mortgage insurance (PMI). If you put
        down less, add PMI costs (typically 0.5% to 1% of the loan amount annually) to your
        buying scenario.
      </p>

      <h3>Should I include tax benefits in my calculation?</h3>
      <p>
        If you itemize deductions and your mortgage interest plus property taxes exceed the
        standard deduction, ownership tax savings can reduce your effective cost by $2,000 to
        $5,000 per year. However, with the current standard deduction at $14,600 for single
        filers, many homeowners do not itemize.
      </p>

      <h3>How does home appreciation affect the decision?</h3>
      <p>
        Higher appreciation favors buying, but it is the least predictable variable. Use
        historical local averages rather than recent peaks. Nationally, homes have appreciated
        roughly 3% to 4% annually over long periods, but individual markets vary widely.
      </p>
    </>
  );
}
