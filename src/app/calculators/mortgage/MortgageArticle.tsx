import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET, MORTGAGE_MARKET_SOURCES } from "@/lib/market-data";

export function MortgageArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/mortgage-payment-breakdown.webp"
          alt="Stacked bar chart showing a $280,000 30-year mortgage at 7.40% shifting from 88% interest in year 1 to 99% principal in year 30"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          Share of each payment going to interest versus principal on the default $280,000, 30-year loan at 7.40%.
        </figcaption>
      </figure>

      <h2>How to Use This Mortgage Calculator</h2>
      <p>
        Enter your home price, down payment amount, loan term, and interest rate
        to instantly see your estimated monthly payment. The calculator also
        shows you the total interest you'll pay over the life of the loan and
        provides a year-by-year amortization schedule.
      </p>

      <h2>Understanding Your Mortgage Payment</h2>
      <p>
        A mortgage payment consists of principal and interest (P&I). The
        principal is the amount that reduces your loan balance, while the
        interest is the cost charged by the lender for borrowing the money.
        The calculator above pre-fills a {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% rate — the
        Freddie Mac PMMS 30-year fixed average for the week of {MORTGAGE_MARKET.asOfLabel}.
        On the default $350,000 home with $70,000 down, that produces a $280,000 loan and
        about $1,939/month in principal and interest over 30 years.
      </p>
      <Sources
        items={MORTGAGE_MARKET_SOURCES}
        checked={MORTGAGE_MARKET.checkedLabel}
      />
      <p>
        In the early years of a mortgage, most of your payment goes toward
        interest. As the balance decreases, more of each payment is applied to
        principal. This gradual shift is shown in the amortization schedule
        above.
      </p>

      <h3>What's Not Included</h3>
      <p>
        This calculator estimates principal and interest only. Your actual
        monthly housing cost will also include:
      </p>
      <ul>
        <li><strong>Property taxes</strong> — the national effective rate on owner-occupied homes averaged 0.89% of value in 2024 (about $8.88 per $1,000), but state rates span roughly 0.26% in Hawaii to 2.08% in New Jersey.</li>
        <li><strong>Homeowners insurance</strong> — national averages near $2,400 per year on a $350,000 dwelling are common in 2026 quotes, with wide swings in coastal and wildfire-prone states.</li>
        <li><strong>PMI (Private Mortgage Insurance)</strong> — required if your down payment is less than 20%, typically 0.5% to 1.5% of the loan amount per year.</li>
        <li><strong>HOA fees</strong> — if applicable, can range from $100 to $1,000+ per month.</li>
      </ul>
      <Sources
        items={[
          {
            label: "NAHB analysis of Census ACS 2024 (effective property tax rate, Dec. 2025)",
            href: "https://www.nahb.org/blog/2025/12/property-taxes-2024-residential",
          },
          {
            label: "Tax Foundation effective property tax rates by state (2022 housing data, 2024)",
            href: "https://taxfoundation.org/data/all/state/property-taxes-by-state-county-2024/",
          },
          {
            label: "LendingTree State of Home Insurance 2026 ($350k dwelling, Feb. 2026)",
            href: "https://www.lendingtree.com/insurance/state-of-home-insurance/",
          },
        ]}
        checked="October 2026"
      />

      <h2>How Much House Can You Afford?</h2>
      <p>
        Financial experts generally recommend{" "}
        <Link
          href="/guides/how-much-house-can-i-afford"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          keeping your total housing costs below 28% of your gross monthly income
        </Link>{" "}
        (the "28% rule"). For
        example, if your household earns $8,000 per month before taxes, aim for
        a total housing payment of no more than $2,240.
      </p>
      <p>
        Additionally, the "36% rule" suggests your total debt payments
        (housing + car loans + student loans + credit cards) should stay below
        36% of gross income.
      </p>
      <p>
        Use our <Link href="/calculators/loan-comparison" className="text-brand-600 hover:text-brand-800 font-medium">Loan Comparison Calculator</Link> to compare different loan offers side by side, or explore our guide on <Link href="/guides/how-much-house-can-i-afford" className="text-brand-600 hover:text-brand-800 font-medium">How Much House Can You Afford</Link> for detailed income-based tables.
      </p>

      <h2>Tips to Lower Your Monthly Payment</h2>
      <ul>
        <li><strong>Increase your down payment</strong> — a larger down payment reduces your loan amount and may eliminate PMI.</li>
        <li><strong>Choose a longer loan term</strong> — a 30-year term has lower monthly payments than a 15-year, though you'll pay more interest overall.</li>
        <li><strong>Shop for a lower rate</strong> — even a 0.25% rate difference can save thousands over the life of the loan. Get quotes from at least 3 lenders.</li>
        <li><strong>Consider points</strong> — paying discount points upfront can lower your interest rate if you plan to stay in the home long-term.</li>
        <li><strong>Improve your credit score</strong> — borrowers with scores above 740 typically qualify for the best rates.</li>
      </ul>

      <h2>Fixed-Rate vs. Adjustable-Rate Mortgages</h2>
      <p>
        A <strong>fixed-rate mortgage</strong> keeps the same interest rate for
        the entire loan term, making your payment predictable. This is the most
        popular choice for homebuyers who plan to stay long-term.
      </p>
      <p>
        An <strong>adjustable-rate mortgage (ARM)</strong> starts with a lower
        introductory rate that adjusts periodically based on market conditions.
        A 5/1 ARM, for example, has a fixed rate for 5 years, then adjusts
        annually. ARMs can be beneficial if you plan to sell or refinance within
        the introductory period.
      </p>

      <h2>How Rate Changes Move Your Payment</h2>
      <p>
        Mortgage rates shift with inflation, Fed policy, and bond markets. The same $280,000,
        30-year loan illustrates how much a higher average rate changes the monthly bill:
      </p>
      <table>
        <thead>
          <tr>
            <th>30-year fixed rate</th>
            <th>Monthly P&I</th>
            <th>Total interest (30 years)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{MORTGAGE_MARKET.thirtyYearYearAgo.toFixed(2)}% (year-ago PMMS average)</td>
            <td>$1,728</td>
            <td>$341,955</td>
          </tr>
          <tr>
            <td>{MORTGAGE_MARKET.thirtyYear.toFixed(2)}% (week of {MORTGAGE_MARKET.asOfLabel})</td>
            <td>$1,939</td>
            <td>$417,919</td>
          </tr>
          <tr>
            <td><strong>Difference</strong></td>
            <td><strong>+$211/month</strong></td>
            <td><strong>+$75,964</strong></td>
          </tr>
        </tbody>
      </table>
      <p>
        That $211 monthly gap is why shopping multiple lenders and improving your credit score
        before you apply still matters, even when national averages move slowly week to week.
      </p>

      <h2>Case Study: A $96,000 Household Meets the 28% Rule</h2>
      <p>
        Priya and Marcus earn $96,000 a year together ($8,000 a month), so the 28% rule caps
        their housing payment at $2,240. They want the calculator's default home: $350,000 with
        $70,000 down. At {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% the principal and interest is
        $1,938.66. Property tax at 0.9% (near the 2024 national effective average) adds $262.50 a month
        and insurance at $2,400/year adds $200, so the total is $2,401.16, which is $161.16 over their
        limit. They test three ways to close the
        gap in the <Link href="/calculators/house-payment" className="text-brand-600 hover:text-brand-800 font-medium">House Payment Calculator</Link>:
      </p>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Home price</th>
            <th>Down payment</th>
            <th>Monthly total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Original plan</td>
            <td>$350,000</td>
            <td>$70,000 (20%)</td>
            <td>$2,401.16</td>
          </tr>
          <tr>
            <td>Put more down</td>
            <td>$350,000</td>
            <td>$93,300 (27%)</td>
            <td>$2,239.84</td>
          </tr>
          <tr>
            <td>Buy a cheaper home</td>
            <td>$320,000</td>
            <td>$64,000 (20%)</td>
            <td>$2,212.49</td>
          </tr>
          <tr>
            <td>Same home if the rate were {MORTGAGE_MARKET.thirtyYearYearAgo.toFixed(2)}%</td>
            <td>$350,000</td>
            <td>$70,000 (20%)</td>
            <td>$2,190.15</td>
          </tr>
        </tbody>
      </table>
      <p>
        Monthly totals include principal, interest, tax, and insurance; none needs PMI because
        each plan puts at least 20% down. The first fix costs $23,300 of extra savings, the second
        costs $30,000 of house, and the third only works if rates drift back toward last year's
        {" "}{MORTGAGE_MARKET.thirtyYearYearAgo.toFixed(2)}%, which is a bet rather than a plan. Running these scenarios before you tour homes tells you which
        lever you can actually pull.
      </p>

      <h2>The Mortgage Formula</h2>
      <p>
        The standard formula for calculating a fixed-rate mortgage payment is:
      </p>
      <p>
        <strong>M = P × [r(1+r)^n] / [(1+r)^n - 1]</strong>
      </p>
      <ul>
        <li><strong>M</strong> = monthly payment</li>
        <li><strong>P</strong> = principal loan amount</li>
        <li><strong>r</strong> = monthly interest rate (annual rate ÷ 12)</li>
        <li><strong>n</strong> = total number of monthly payments (years × 12)</li>
      </ul>
      <p>
        For example, a $280,000 loan at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% for 30 years: r = 0.074/12 =
        0.006167, n = 360. The monthly payment would be approximately $1,939 — the same figure
        you see with the calculator defaults above.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How much down payment do I need?</h3>
      <p>
        Conventional loans typically require 3% to 20% down. FHA loans allow as
        little as 3.5% with a credit score of 580+. VA and USDA loans may
        require no down payment at all for eligible borrowers.
      </p>

      <h3>Should I choose a 15-year or 30-year mortgage?</h3>
      <p>
        A 15-year mortgage has higher monthly payments but saves significant
        interest — often 50% or more compared to a 30-year loan. Choose 15
        years if you can comfortably afford the higher payment without
        sacrificing emergency savings or retirement contributions.
      </p>
      <p>
        Read our in-depth comparison: <Link href="/guides/15-year-vs-30-year-mortgage" className="text-brand-600 hover:text-brand-800 font-medium">15-Year vs 30-Year Mortgage: Which Saves You More?</Link>
      </p>

      <h3>What credit score do I need for a mortgage?</h3>
      <p>
        Most conventional lenders require a minimum score of 620. FHA loans may
        accept scores as low as 500 with 10% down. For the best rates and
        terms, aim for 740 or higher.
      </p>

      <h3>Can I pay off my mortgage early?</h3>
      <p>
        Most mortgages allow extra payments without penalty. Even adding $100
        per month to a 30-year, $280,000 loan at {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% would save you
        approximately $75,000 in interest and shorten the loan by about 4.5
        years.
      </p>
      <p>
        Learn more in our guide: <Link href="/guides/pay-off-mortgage-early-vs-invest" className="text-brand-600 hover:text-brand-800 font-medium">Pay Off Mortgage Early vs Invest</Link>.
      </p>
    </>
  );
}
