import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET, MORTGAGE_MARKET_SOURCES } from "@/lib/market-data";

export function HousePaymentArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/house-payment-infographic.webp"
          alt="Donut chart of a $2,401 monthly house payment on a $350,000 home with 20% down at 7.40%, split into principal and interest, property tax, and insurance, plus how the first payment divides between interest and principal"
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
        <li><strong>Property Taxes</strong> — Local governments levy property taxes based on assessed value. The national effective rate on owner-occupied homes averaged 0.89% in 2024, but effective rates vary from about 0.26% in Hawaii to 2.08% in New Jersey.</li>
        <li><strong>Homeowners Insurance</strong> — Protects against damage from fire, storms, theft, and liability. National averages near $2,395 per year on a $350,000 dwelling were typical in early 2026 insurer filings, though coastal and wildfire zones run much higher.</li>
        <li><strong>PMI (Private Mortgage Insurance)</strong> — Required when your down payment is less than 20%. PMI typically costs 0.5% to 1.5% of the loan amount per year (the calculator defaults to 0.5%) and can be removed once you reach 20% equity.</li>
      </ul>
      <Sources
        items={[
          {
            label: "NAHB analysis of Census ACS 2024 (national effective property tax rate)",
            href: "https://www.nahb.org/blog/2025/12/property-taxes-2024-residential",
          },
          {
            label: "Tax Foundation effective property tax rates by state (2024)",
            href: "https://taxfoundation.org/data/all/state/property-taxes-by-state-county-2024/",
          },
          {
            label: "LendingTree State of Home Insurance 2026 ($350k dwelling)",
            href: "https://www.lendingtree.com/insurance/state-of-home-insurance/",
          },
        ]}
        checked="October 2026"
      />
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

      <h2>Case Study: The Martinez Family's First Home</h2>
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
            <td>Principal & Interest ({MORTGAGE_MARKET.thirtyYear.toFixed(2)}%, 30 yr)</td>
            <td>$1,904</td>
            <td>$22,848</td>
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
            <td>PMI (0.7%, down {"<"} 20%)</td>
            <td>$160</td>
            <td>$1,920</td>
          </tr>
          <tr>
            <td><strong>Total House Payment</strong></td>
            <td><strong>$2,719</strong></td>
            <td><strong>$32,628</strong></td>
          </tr>
        </tbody>
      </table>
      <p>
        The Martinez family's PITI is 34.0% of gross income — above the recommended 28% threshold. By increasing their down payment to $64,000 (20%), they eliminate PMI and reduce the loan amount, dropping the total payment to $2,427/month (30.3% of income). That $19,000 extra savings would take about 8 months of aggressive saving but would save $160/month in PMI alone.
      </p>

      <h2>Comparing House Payment Scenarios</h2>
      <p>
        The table below shows how house payments change across different price points, assuming a{" "}
        {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% rate (Freddie Mac PMMS 30-year average, week of{" "}
        {MORTGAGE_MARKET.asOfLabel}), 30-year term, 0.9% property tax rate, $2,400/year insurance, and
        0.5% PMI when down payment is below 20%:
      </p>
      <Sources
        items={MORTGAGE_MARKET_SOURCES}
        checked={MORTGAGE_MARKET.checkedLabel}
      />
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
            <td>$2,039/mo</td>
            <td>$1,772/mo</td>
            <td>$267/mo</td>
          </tr>
          <tr>
            <td>$350,000</td>
            <td>$2,775/mo</td>
            <td>$2,401/mo</td>
            <td>$374/mo</td>
          </tr>
          <tr>
            <td>$450,000</td>
            <td>$3,535/mo</td>
            <td>$3,055/mo</td>
            <td>$480/mo</td>
          </tr>
          <tr>
            <td>$550,000</td>
            <td>$4,288/mo</td>
            <td>$3,701/mo</td>
            <td>$587/mo</td>
          </tr>
        </tbody>
      </table>
      <p>
        Putting down 20% not only lowers the loan amount but eliminates PMI entirely, creating a double savings effect. For a $350,000 home, the difference is $374 per month — that is $4,488 per year or $134,640 over the life of the loan. At {MORTGAGE_MARKET.thirtyYearYearAgo.toFixed(2)}% (the year-ago PMMS average), the same $350,000 home with 20% down would run about $2,190/month — roughly $211 less than at today's {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% default.
      </p>

      <h2>Property Tax Rates by State</h2>
      <p>
        Property taxes are one of the most variable components of a house payment. Here are some notable extremes:
      </p>
      <ul>
        <li><strong>Lowest effective rates:</strong> Hawaii (0.26%), Alabama (0.36%), Colorado (0.45%)</li>
        <li><strong>Highest effective rates:</strong> New Jersey (2.08%), Illinois (1.95%), Connecticut (1.78%)</li>
        <li><strong>National average:</strong> approximately 0.89% (2024 owner-occupied housing)</li>
      </ul>
      <p>
        On a $350,000 home, the difference between Hawaii's 0.26% and New Jersey's 2.08% effective property tax rate translates to about $531 per month — a significant factor when comparing homes in different states.
      </p>

      <h2>How to Lower Your Monthly House Payment</h2>
      <ul>
        <li><strong>Increase your down payment to 20%</strong> — Eliminates PMI and reduces the loan balance, cutting both principal and interest.</li>
        <li><strong>Shop for a lower interest rate</strong> — Even 0.25% lower on a $280,000 loan saves roughly $48/month and about $17,100 over 30 years. Compare rates from at least 3 lenders.</li>
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
        A common question is whether the total house payment is competitive with renting. Remember that part of your payment — the principal portion — builds equity. In the first year of a $280,000 loan at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}%, approximately $2,632 of your payments go toward principal. By year 10, that number grows to about $5,113 per year.
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
        With 20% down ($60,000), a {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% rate, and a 30-year term, the P&I payment is approximately $1,662/month. Add property taxes (~$225/mo at 0.9%), insurance (~$200/mo at $2,400/year), and you get a total house payment around $2,087/month. With less than 20% down, add PMI of roughly $100-$150/month.
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
        Check your county assessor's website for the current millage rate, or look at comparable recently sold homes on sites like Zillow, which display annual property tax amounts. Divide the annual tax by the home price to get the effective rate. For a quick estimate, the 2024 national effective average of about 0.89% is a reasonable starting point before you localize the number.
      </p>
    </>
  );
}
