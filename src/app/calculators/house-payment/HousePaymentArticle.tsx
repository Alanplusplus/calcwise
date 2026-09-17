import Image from "next/image";
import Link from "next/link";

export function HousePaymentArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/house-payment-infographic.webp"
          alt="Infographic showing the five components of a monthly house payment: principal, interest, property taxes, insurance, and PMI"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          A typical house payment includes five components. Understanding each one helps you budget accurately.
        </figcaption>
      </figure>

      <h2>How to Use This House Payment Calculator</h2>
      <p>
        Enter your home price, down payment, loan term, and interest rate to see your monthly principal and interest. Then add property tax rate, homeowners insurance, PMI rate, and HOA fees to get your <strong>true total monthly house payment</strong>. Unlike a basic mortgage calculator that only shows principal and interest, this tool reveals the full picture of what homeownership actually costs each month.
      </p>
      <p>
        Every input updates results instantly. Adjust any number to see how changes in home price, down payment, or interest rate affect your total monthly obligation. The annual breakdown table shows how your costs shift year by year as you build equity.
      </p>

      <h2>What Goes Into a House Payment?</h2>
      <p>
        Your monthly house payment is commonly referred to as <strong>PITI</strong> — Principal, Interest, Taxes, and Insurance. Here is what each component means:
      </p>
      <ul>
        <li><strong>Principal</strong> — The portion of your payment that reduces the loan balance. In early years, this is the smallest slice. Over time, as your balance shrinks, more of each payment goes toward principal.</li>
        <li><strong>Interest</strong> — The cost of borrowing money from the lender. With a fixed-rate loan, the interest rate stays the same, but the dollar amount of interest decreases each month as your balance drops.</li>
        <li><strong>Property Taxes</strong> — Local governments levy property taxes based on assessed value. The national average is approximately 1.1% of home value per year, but rates vary dramatically from 0.28% in Hawaii to 2.47% in New Jersey.</li>
        <li><strong>Homeowners Insurance</strong> — Protects against damage from fire, storms, theft, and liability. The average annual premium for a $350,000 home is roughly $1,800, though costs depend on location, coverage level, and claims history.</li>
        <li><strong>PMI (Private Mortgage Insurance)</strong> — Required when your down payment is less than 20%. PMI typically costs 0.5% to 1.5% of the loan amount per year and can be removed once you reach 20% equity.</li>
      </ul>
      <p>
        If your home is in a planned community, you may also pay <strong>HOA fees</strong> that cover landscaping, amenities, and exterior maintenance. These can range from $100 to over $1,000 per month depending on the community.
      </p>

      <h2>PITI: The Number Lenders Actually Use</h2>
      <p>
        When you apply for a mortgage, lenders calculate your <strong>front-end debt-to-income ratio</strong> using your total PITI payment, not just principal and interest. Most conventional lenders want your PITI to be no more than 28% of your gross monthly income. For a household earning $7,500 per month, that means a maximum house payment of $2,100.
      </p>
      <p>
        This is why a basic mortgage calculator can be misleading. You might qualify for a $280,000 loan based on principal and interest alone, but once taxes, insurance, and PMI are factored in, the true payment could push you past the 28% threshold. Use our{" "}
        <Link href="/calculators/home-affordability" className="text-brand-600 hover:text-brand-800 font-medium">
          Home Affordability Calculator
        </Link>{" "}
        to see the maximum home price your income supports after all PITI costs.
      </p>

      <h2>Case Study: The Martinez Family&apos;s First Home</h2>
      <p>
        Carlos and Elena Martinez earn a combined $96,000 per year ($8,000/month) and have saved $45,000 for a down payment. They are looking at a $320,000 home in a suburb of Austin, Texas. Here is how their monthly house payment breaks down:
      </p>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Monthly Amount</th>
            <th>Annual Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Principal & Interest (6.75%, 30 yr)</td>
            <td>$1,784</td>
            <td>$21,408</td>
          </tr>
          <tr>
            <td>Property Tax (1.8%)</td>
            <td>$480</td>
            <td>$5,760</td>
          </tr>
          <tr>
            <td>Homeowners Insurance</td>
            <td>$175</td>
            <td>$2,100</td>
          </tr>
          <tr>
            <td>PMI (0.7%, down &lt; 20%)</td>
            <td>$160</td>
            <td>$1,925</td>
          </tr>
          <tr>
            <td><strong>Total House Payment</strong></td>
            <td><strong>$2,599</strong></td>
            <td><strong>$31,193</strong></td>
          </tr>
        </tbody>
      </table>
      <p>
        The Martinez family&apos;s PITI is 32.5% of gross income — above the recommended 28% threshold. By increasing their down payment to $64,000 (20%), they eliminate PMI and reduce the loan amount, dropping the total payment to $2,215/month (27.7% of income). That $19,000 extra savings would take about 8 months of aggressive saving but would save $160/month in PMI alone.
      </p>

      <h2>Comparing House Payment Scenarios</h2>
      <p>
        The table below shows how house payments change across different price points, assuming a 6.5% rate, 30-year term, 1.1% property tax rate, and $1,800/year insurance:
      </p>
      <table>
        <thead>
          <tr>
            <th>Home Price</th>
            <th>Down 10%</th>
            <th>Down 20%</th>
            <th>Savings with 20% Down</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$250,000</td>
            <td>$1,838/mo</td>
            <td>$1,564/mo</td>
            <td>$274/mo</td>
          </tr>
          <tr>
            <td>$350,000</td>
            <td>$2,509/mo</td>
            <td>$2,137/mo</td>
            <td>$372/mo</td>
          </tr>
          <tr>
            <td>$450,000</td>
            <td>$3,181/mo</td>
            <td>$2,710/mo</td>
            <td>$471/mo</td>
          </tr>
          <tr>
            <td>$550,000</td>
            <td>$3,852/mo</td>
            <td>$3,282/mo</td>
            <td>$570/mo</td>
          </tr>
        </tbody>
      </table>
      <p>
        Putting down 20% not only lowers the loan amount but eliminates PMI entirely, creating a double savings effect. For a $350,000 home, the difference is $372 per month — that is $4,464 per year or $133,920 over the life of the loan.
      </p>

      <h2>Property Tax Rates by State</h2>
      <p>
        Property taxes are one of the most variable components of a house payment. Here are some notable extremes:
      </p>
      <ul>
        <li><strong>Lowest rates:</strong> Hawaii (0.28%), Alabama (0.41%), Colorado (0.51%)</li>
        <li><strong>Highest rates:</strong> New Jersey (2.47%), Illinois (2.27%), Connecticut (2.14%)</li>
        <li><strong>National average:</strong> approximately 1.1%</li>
      </ul>
      <p>
        On a $350,000 home, the difference between Hawaii&apos;s 0.28% and New Jersey&apos;s 2.47% property tax rate translates to $639 per month — a significant factor when comparing homes in different states.
      </p>

      <h2>How to Lower Your Monthly House Payment</h2>
      <ul>
        <li><strong>Increase your down payment to 20%</strong> — Eliminates PMI and reduces the loan balance, cutting both principal and interest.</li>
        <li><strong>Shop for a lower interest rate</strong> — Even 0.25% lower on a $280,000 loan saves roughly $50/month and over $18,000 over 30 years. Compare rates from at least 3 lenders.</li>
        <li><strong>Choose a longer loan term</strong> — A 30-year term has lower monthly payments than 15 years, though total interest increases. See our{" "}
          <Link href="/calculators/mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
            Mortgage Calculator
          </Link>{" "}
          to compare terms.
        </li>
        <li><strong>Appeal your property tax assessment</strong> — If your assessed value seems high, file an appeal with your county. Success rates vary, but homeowners who appeal save an average of $1,000 to $3,000 per year.</li>
        <li><strong>Bundle insurance policies</strong> — Combining home and auto insurance with the same company often yields a 5-15% discount on premiums.</li>
        <li><strong>Buy in a lower-tax area</strong> — If you are flexible on location, a few miles can mean dramatically different property tax rates.</li>
      </ul>

      <h2>When Does PMI Go Away?</h2>
      <p>
        For conventional loans, you can request PMI removal once your loan balance reaches 80% of the original home value. By law (the Homeowners Protection Act), your lender must automatically cancel PMI when your balance reaches 78%.
      </p>
      <p>
        You can accelerate PMI removal by making extra principal payments. If your home has appreciated significantly, you can also request a new appraisal to demonstrate you have 20% equity sooner than scheduled. Check our{" "}
        <Link href="/calculators/down-payment" className="text-brand-600 hover:text-brand-800 font-medium">
          Down Payment Calculator
        </Link>{" "}
        to plan your savings target and see how much you need to avoid PMI entirely.
      </p>

      <h2>House Payment vs. Renting</h2>
      <p>
        A common question is whether the total house payment is competitive with renting. Remember that part of your payment — the principal portion — builds equity. In the first year of a $280,000 loan at 6.5%, approximately $3,600 of your payments go toward principal. By year 10, that number grows to about $6,900 per year.
      </p>
      <p>
        However, renters avoid property taxes, insurance, PMI, maintenance (typically 1-2% of home value per year), and potential HOA fees. Use our{" "}
        <Link href="/calculators/rent-vs-buy" className="text-brand-600 hover:text-brand-800 font-medium">
          Rent vs Buy Calculator
        </Link>{" "}
        to compare the total cost of ownership versus renting over your expected timeline, and read our{" "}
        <Link href="/guides/rent-vs-buy-decision" className="text-brand-600 hover:text-brand-800 font-medium">
          Rent vs Buy in 2026
        </Link>{" "}
        guide for a comprehensive decision framework.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How much is the house payment on a $300,000 home?</h3>
      <p>
        With 20% down ($60,000), a 6.5% rate, and a 30-year term, the P&I payment is approximately $1,517/month. Add property taxes (~$275/mo at 1.1%), insurance (~$150/mo), and you get a total house payment around $1,942/month. With less than 20% down, add PMI of roughly $100-$150/month.
      </p>

      <h3>What percentage of income should go to a house payment?</h3>
      <p>
        The standard guideline is the <strong>28/36 rule</strong>: your total house payment (PITI) should not exceed 28% of gross monthly income, and total debt payments should stay below 36%. Some lenders allow up to 43% total debt-to-income for qualified borrowers, but staying within 28% provides a comfortable financial cushion.
      </p>

      <h3>Does my house payment stay the same for 30 years?</h3>
      <p>
        With a fixed-rate mortgage, your principal and interest portion stays constant. However, property taxes and insurance premiums can increase over time as home values rise and insurance costs adjust. Your total PITI payment may gradually increase by $50-$200 per year due to escrow adjustments. PMI will eventually be removed once you reach 20% equity, partially offsetting these increases.
      </p>

      <h3>Should I include HOA fees in my budget?</h3>
      <p>
        Absolutely. HOA fees are a mandatory monthly cost that lenders include when calculating your debt-to-income ratio. A $300/month HOA fee has the same impact on your budget as a $300 increase in principal and interest. Always factor HOA fees into your total house payment before committing to a purchase. Read our{" "}
        <Link href="/guides/how-much-house-can-i-afford" className="text-brand-600 hover:text-brand-800 font-medium">
          How Much House Can I Afford
        </Link>{" "}
        guide for detailed income-based tables that account for all housing costs.
      </p>

      <h3>How can I estimate my property tax rate?</h3>
      <p>
        Check your county assessor&apos;s website for the current millage rate, or look at comparable recently sold homes on sites like Zillow, which display annual property tax amounts. Divide the annual tax by the home price to get the effective rate. For a quick estimate, the national average of 1.1% is a reasonable starting point.
      </p>
    </>
  );
}
