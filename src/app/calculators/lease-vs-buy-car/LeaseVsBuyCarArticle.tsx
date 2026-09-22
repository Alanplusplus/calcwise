import Link from "next/link";
import Image from "next/image";

export function LeaseVsBuyCarArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/lease-vs-buy-car-infographic.webp"
          alt="Infographic comparing leasing vs buying a car showing total costs, monthly payments, and equity over a 5-year period"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          Side-by-side comparison of the true cost of leasing versus buying a vehicle over five years.
        </figcaption>
      </figure>

      <h2>How to Use This Lease vs Buy Car Calculator</h2>
      <p>
        Start by entering the vehicle MSRP, your planned down payment, and trade-in value in the Purchase Details section. Add the sales tax rate for your state, the loan interest rate from your pre-approval, and your preferred loan term. In the Lease Details section, enter the monthly lease payment, amount due at signing, lease term, and the residual value percentage from your dealer quote. Under Ownership Costs, input annual insurance premiums for both options (leases typically require higher coverage), annual maintenance, the depreciation rate, and the number of years you want to compare. The calculator instantly shows which option costs less and gives you a year-by-year cost breakdown that accounts for the equity you build when buying.
      </p>
      <p>
        For a detailed breakdown of just the purchase loan, try our{" "}
        <Link href="/calculators/auto-loan" className="text-brand-600 hover:text-brand-800 font-medium">
          Auto Loan Calculator
        </Link>{" "}
        to view the full amortization schedule and total interest paid.
      </p>

      <h2>How Leasing Works vs How Buying Works</h2>
      <p>
        When you buy a car, you take out a loan for the full purchase price minus your down payment and trade-in. You make monthly payments that cover principal and interest over the loan term, and once the loan is paid off, you own the vehicle outright. The car depreciates over time, but you retain the remaining value as equity that you can use toward your next vehicle or sell at any point.
      </p>
      <p>
        When you lease a car, you essentially pay for the vehicle&apos;s depreciation during the lease term plus a finance charge (called the money factor). Your monthly payment is based on the difference between the vehicle&apos;s selling price (capitalized cost) and its predicted value at lease end (residual value), divided by the lease term, plus interest. At the end of the lease, you return the car to the dealer and walk away with no equity, or you can exercise the purchase option and buy the car at the pre-agreed residual price.
      </p>
      <p>
        The core trade-off is straightforward: leasing offers lower monthly payments and the ability to drive a new car every 2-3 years, while buying costs more per month but builds equity and eliminates payments once the loan is retired. To understand how much car fits your budget before choosing between lease and buy, check our{" "}
        <Link href="/calculators/car-affordability" className="text-brand-600 hover:text-brand-800 font-medium">
          Car Affordability Calculator
        </Link>
        .
      </p>

      <h2>Key Financial Concepts</h2>
      <h3>Residual Value</h3>
      <p>
        Residual value is the predicted worth of a vehicle at the end of its lease term, expressed as a percentage of MSRP. A $35,000 car with a 55% residual after 36 months is expected to be worth $19,250 at lease end. Higher residual values lead to lower lease payments because you are paying for less depreciation. Brands like Toyota, Honda, and Subaru tend to have higher residuals (55-62%) due to strong resale demand, while luxury brands like BMW and Mercedes often fall in the 48-55% range.
      </p>
      <h3>Money Factor</h3>
      <p>
        The money factor is the lease equivalent of an interest rate. To convert a money factor to an APR, multiply by 2,400. A money factor of 0.00125 equals a 3.0% APR. A lower money factor means less finance charges per month. When comparing lease offers, always ask for the money factor and convert it to see the effective interest rate alongside your purchase loan APR.
      </p>
      <h3>Depreciation</h3>
      <p>
        New cars lose roughly 20% of their value in the first year and 15% per year thereafter. After five years, a typical vehicle retains about 40% of its original value. A $35,000 car is worth approximately $28,000 after year one and $15,500 after year five. Depreciation is the largest hidden cost of car ownership and the primary driver of lease payments since you are funding exactly this loss.
      </p>
      <h3>Opportunity Cost</h3>
      <p>
        A $5,000 down payment on a purchase is money you cannot invest elsewhere. If you kept that $5,000 in an index fund averaging 7% annually, it would grow to approximately $7,013 in five years. The lease alternative typically requires a smaller upfront payment ($2,000-$3,000), freeing cash for investment. This opportunity cost can shift the break-even point by $500-$1,500 over a five-year comparison period.
      </p>

      <h2>Case Study: Marcus Compares a 2026 Honda CR-V in Atlanta</h2>
      <p>
        Marcus is a 34-year-old marketing manager in Atlanta earning $88,000 per year. He is deciding between leasing and buying a 2026 Honda CR-V EX-L with an MSRP of $38,400. He has $6,000 saved for a down payment and no trade-in vehicle. His credit score of 740 qualifies him for a 5.9% APR purchase loan from his credit union.
      </p>
      <p>
        The dealer offers a 36-month lease at $389/month with $2,500 due at signing and a 58% residual value ($22,272). Georgia&apos;s sales tax rate is 6.6% (title ad valorem tax, applied at purchase for buyers). Marcus estimates $2,040/year for full-coverage insurance if he buys and $2,400/year if he leases (gap insurance included). He budgets $500/year for maintenance.
      </p>

      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Buy (60-month loan)</th>
            <th>Lease (36-month term)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monthly Payment</td>
            <td>$641</td>
            <td>$389</td>
          </tr>
          <tr>
            <td>Due at Signing</td>
            <td>$8,534 (down + tax)</td>
            <td>$2,500</td>
          </tr>
          <tr>
            <td>Total Payments (5 yr)</td>
            <td>$38,460</td>
            <td>$23,340 + $5,000 (2 lease terms)</td>
          </tr>
          <tr>
            <td>Insurance (5 yr)</td>
            <td>$10,200</td>
            <td>$12,000</td>
          </tr>
          <tr>
            <td>Maintenance (5 yr)</td>
            <td>$2,500</td>
            <td>$2,500</td>
          </tr>
          <tr>
            <td>Vehicle Value at Year 5</td>
            <td>$17,030</td>
            <td>$0</td>
          </tr>
          <tr>
            <td>Net 5-Year Cost</td>
            <td>$42,664</td>
            <td>$45,374</td>
          </tr>
        </tbody>
      </table>
      <p>
        Buying saves Marcus approximately $2,710 over five years. The buy option costs more per month ($641 vs $389) but leaves him with a vehicle worth $17,030 at year five. However, Marcus values always driving a newer car and plans to relocate in three years, making a lease more practical for his lifestyle despite the higher net cost. This illustrates why the cheapest option on paper is not always the best fit. To evaluate whether his monthly payment fits comfortably in his budget, Marcus also runs his numbers through the{" "}
        <Link href="/calculators/loan-comparison" className="text-brand-600 hover:text-brand-800 font-medium">
          Loan Comparison Calculator
        </Link>{" "}
        to test different loan terms side by side.
      </p>

      <h2>Lease vs Buy: Scenario Comparison Table</h2>
      <p>
        The following table compares the net cost of leasing versus buying across different vehicle price points, assuming a 5-year comparison period, 6.5% APR, 36-month lease terms, 55% residual value, and $300/month insurance and maintenance combined.
      </p>
      <table>
        <thead>
          <tr>
            <th>Vehicle MSRP</th>
            <th>Buy Net Cost (5 yr)</th>
            <th>Lease Net Cost (5 yr)</th>
            <th>Savings</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$25,000</td>
            <td>$21,800</td>
            <td>$26,100</td>
            <td>$4,300</td>
            <td>Buy</td>
          </tr>
          <tr>
            <td>$30,000</td>
            <td>$27,400</td>
            <td>$30,900</td>
            <td>$3,500</td>
            <td>Buy</td>
          </tr>
          <tr>
            <td>$35,000</td>
            <td>$33,100</td>
            <td>$35,700</td>
            <td>$2,600</td>
            <td>Buy</td>
          </tr>
          <tr>
            <td>$45,000</td>
            <td>$44,300</td>
            <td>$45,300</td>
            <td>$1,000</td>
            <td>Buy</td>
          </tr>
          <tr>
            <td>$55,000</td>
            <td>$55,600</td>
            <td>$54,900</td>
            <td>$700</td>
            <td>Lease</td>
          </tr>
          <tr>
            <td>$70,000</td>
            <td>$72,100</td>
            <td>$68,400</td>
            <td>$3,700</td>
            <td>Lease</td>
          </tr>
        </tbody>
      </table>
      <p>
        The pattern is clear: buying wins for vehicles under roughly $50,000, where the equity you retain outweighs the payment difference. For more expensive vehicles that depreciate quickly, leasing often wins because you avoid absorbing the steeper value drop. The crossover point varies based on the specific car&apos;s residual value, your interest rate, and how long you plan to keep the vehicle.
      </p>

      <h2>Tips for Making the Right Choice</h2>
      <p>
        <strong>Estimate your annual mileage honestly.</strong> Most leases cap mileage at 10,000-12,000 miles per year with a penalty of $0.15-$0.25 per excess mile. If you drive 18,000 miles per year, a 36-month lease could incur $2,700-$5,400 in overage charges at lease end. If your commute is long or variable, buying eliminates mileage risk entirely.
      </p>
      <p>
        <strong>Compare the effective interest rates.</strong> Ask the dealer for the lease money factor and multiply by 2,400 to get the equivalent APR. If the lease APR is 6% but your credit union offers a 4.9% auto loan, the financing advantage swings toward buying. Some manufacturers offer promotional lease money factors (0.00050 = 1.2% APR) that can make leasing dramatically cheaper during incentive periods.
      </p>
      <p>
        <strong>Factor in gap insurance.</strong> When you lease, gap insurance is typically built into the lease agreement or costs $20-$40 per month. When you buy, you may need to purchase it separately ($200-$500 one time or $20-$30/month) if your loan balance exceeds the car&apos;s market value during the first few years. This is especially relevant with small down payments on rapidly-depreciating models.
      </p>
      <p>
        <strong>Consider your holding period.</strong> If you plan to drive the same car for 7-10 years, buying is nearly always cheaper because you will have years of payment-free ownership after the loan ends. If you prefer a new car every 3 years and value the latest safety and technology features, leasing eliminates the hassle of reselling and trade-in negotiations. Read our{" "}
        <Link href="/guides/how-much-car-can-i-afford" className="text-brand-600 hover:text-brand-800 font-medium">
          complete car affordability guide
        </Link>{" "}
        for a broader framework before making this decision.
      </p>
      <p>
        <strong>Check your budget with the 20/4/10 rule.</strong> Whether you lease or buy, your total monthly transportation costs (payment plus insurance plus fuel) should stay under 10% of gross monthly income. A $500/month lease payment plus $200 for insurance and $175 for fuel totals $875 per month, requiring at least $105,000 in annual income under this rule. Use the{" "}
        <Link href="/guides/50-30-20-budget-rule" className="text-brand-600 hover:text-brand-800 font-medium">
          50/30/20 budget rule guide
        </Link>{" "}
        to see how your car payment fits into your overall spending plan.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is leasing a car always a waste of money?</h3>
      <p>
        Leasing is not inherently wasteful. It is a financing tool that trades equity for lower monthly payments and flexibility. For buyers who keep cars 5+ years and drive high mileage, buying is almost always cheaper. But for people who value always driving a new vehicle, want predictable costs with no resale risk, or use the car primarily for business (lease payments are often tax-deductible), leasing can be the financially smarter choice. The key is running the actual numbers for your situation rather than relying on general advice.
      </p>

      <h3>What happens if I want to end a lease early?</h3>
      <p>
        Early lease termination typically involves paying a penalty equal to the remaining lease payments minus the difference between the car&apos;s current market value and its residual value. On a $400/month lease with 12 months remaining, the penalty could be $2,000-$4,800 depending on the car&apos;s value. Some leases allow lease transfers (swapping to another driver through services like Swapalease or LeaseTrader) for a $200-$500 transfer fee. Before signing, confirm the early termination clause in writing.
      </p>

      <h3>Can I negotiate a lease the same way I negotiate a purchase?</h3>
      <p>
        Yes, and you should. The three negotiable components of a lease are the capitalized cost (the selling price, which works exactly like negotiating a purchase price), the money factor (the interest rate), and the mileage allowance. The residual value is set by the manufacturer&apos;s leasing arm and is generally not negotiable. Focus on lowering the cap cost first — every $1,000 reduction in the selling price saves roughly $28/month on a 36-month lease.
      </p>

      <h3>Should I put a large down payment on a lease?</h3>
      <p>
        Financial advisors generally recommend minimizing the down payment on a lease. If the car is totaled or stolen in month three, gap insurance covers the difference between the car&apos;s value and the lease balance, but you lose your down payment entirely. A $3,000 down payment on a 36-month lease reduces your payment by about $83/month, but putting $0 down and paying $83 more per month protects you from losing that lump sum in an accident. Keep your due-at-signing costs to first payment, acquisition fee, and registration.
      </p>

      <h3>How does sales tax work differently for leases and purchases?</h3>
      <p>
        Tax treatment varies by state. In most states, when you buy a car, you pay sales tax on the full purchase price upfront. When you lease, you pay sales tax only on each monthly payment. On a $35,000 car at 7% tax, a buyer pays $2,450 in tax at signing, while a lessee pays $24.50/month in tax ($882 total over 36 months). In a handful of states (Texas, Illinois, and a few others), lessees pay tax on the full vehicle value upfront, eliminating this advantage. Check your state&apos;s specific rules before comparing.
      </p>
    </>
  );
}
