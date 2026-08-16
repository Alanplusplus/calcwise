import Image from "next/image";

export function MortgageArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/mortgage-payment-breakdown.webp"
          alt="Infographic showing how mortgage payments shift from mostly interest to mostly principal over 30 years"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          Over time, more of each payment goes to principal as your balance decreases.
        </figcaption>
      </figure>

      <h2>How to Use This Mortgage Calculator</h2>
      <p>
        Enter your home price, down payment amount, loan term, and interest rate
        to instantly see your estimated monthly payment. The calculator also
        shows you the total interest you&apos;ll pay over the life of the loan and
        provides a year-by-year amortization schedule.
      </p>

      <h2>Understanding Your Mortgage Payment</h2>
      <p>
        A mortgage payment consists of principal and interest (P&I). The
        principal is the amount that reduces your loan balance, while the
        interest is the cost charged by the lender for borrowing the money.
      </p>
      <p>
        In the early years of a mortgage, most of your payment goes toward
        interest. As the balance decreases, more of each payment is applied to
        principal. This gradual shift is shown in the amortization schedule
        above.
      </p>

      <h3>What&apos;s Not Included</h3>
      <p>
        This calculator estimates principal and interest only. Your actual
        monthly housing cost will also include:
      </p>
      <ul>
        <li><strong>Property taxes</strong> — typically 0.5% to 2.5% of home value annually, depending on your state and county.</li>
        <li><strong>Homeowners insurance</strong> — usually $1,000 to $3,000 per year for a standard policy.</li>
        <li><strong>PMI (Private Mortgage Insurance)</strong> — required if your down payment is less than 20%, typically 0.5% to 1.5% of the loan amount per year.</li>
        <li><strong>HOA fees</strong> — if applicable, can range from $100 to $1,000+ per month.</li>
      </ul>

      <h2>How Much House Can You Afford?</h2>
      <p>
        Financial experts generally recommend keeping your total housing costs
        below 28% of your gross monthly income (the &quot;28% rule&quot;). For
        example, if your household earns $8,000 per month before taxes, aim for
        a total housing payment of no more than $2,240.
      </p>
      <p>
        Additionally, the &quot;36% rule&quot; suggests your total debt payments
        (housing + car loans + student loans + credit cards) should stay below
        36% of gross income.
      </p>

      <h2>Tips to Lower Your Monthly Payment</h2>
      <ul>
        <li><strong>Increase your down payment</strong> — a larger down payment reduces your loan amount and may eliminate PMI.</li>
        <li><strong>Choose a longer loan term</strong> — a 30-year term has lower monthly payments than a 15-year, though you&apos;ll pay more interest overall.</li>
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
        For example, a $280,000 loan at 6.5% for 30 years: r = 0.065/12 =
        0.005417, n = 360. The monthly payment would be approximately $1,770.
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

      <h3>What credit score do I need for a mortgage?</h3>
      <p>
        Most conventional lenders require a minimum score of 620. FHA loans may
        accept scores as low as 500 with 10% down. For the best rates and
        terms, aim for 740 or higher.
      </p>

      <h3>Can I pay off my mortgage early?</h3>
      <p>
        Most mortgages allow extra payments without penalty. Even adding $100
        per month to a 30-year, $280,000 loan at 6.5% would save you
        approximately $48,000 in interest and shorten the loan by about 5
        years.
      </p>
    </>
  );
}
