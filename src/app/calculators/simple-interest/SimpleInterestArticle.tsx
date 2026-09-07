import Image from "next/image";
import Link from "next/link";

export function SimpleInterestArticle() {
  return (
    <article className="prose prose-ink max-w-none">
      <h2>Understanding Simple Interest: The Foundation of All Financial Calculations</h2>

      <Image
        src="/images/simple-interest-infographic.webp"
        alt="Simple interest formula infographic showing how principal, rate, and time determine total interest earned across different scenarios"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <p>
        Simple interest is the most straightforward way to calculate the cost of borrowing money or the return on an investment. Unlike{" "}
        <Link href="/calculators/compound-interest" className="text-brand-600 hover:text-brand-800 font-medium">compound interest</Link>,
        where interest earns interest over time, simple interest is calculated only on the original principal amount. This makes it predictable,
        transparent, and easy to understand — which is exactly why it remains the standard for auto loans, short-term personal loans, and
        certain types of Treasury bills.
      </p>

      <h3>How Simple Interest Works</h3>

      <p>
        The simple interest formula is one of the most fundamental equations in finance:
      </p>

      <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-lg font-semibold text-ink-900">
        Interest = Principal x Rate x Time (I = P x R x T)
      </p>

      <p>
        Each variable plays a clear role. The <strong>Principal (P)</strong> is the initial amount of money — the loan balance you owe or
        the deposit you invest. The <strong>Rate (R)</strong> is the annual interest rate expressed as a decimal (5% becomes 0.05).
        The <strong>Time (T)</strong> is measured in years. If you borrow $10,000 at 5% for 3 years, your interest is exactly
        $10,000 x 0.05 x 3 = $1,500. No compounding, no surprises.
      </p>

      <h3>Key Concepts You Should Know</h3>

      <p>
        Simple interest differs from compound interest in one critical way: the interest base never changes. With a $10,000 principal
        at 5% annual interest, you earn exactly $500 every year — whether it is year one or year ten. In a{" "}
        <Link href="/calculators/compound-interest" className="text-brand-600 hover:text-brand-800 font-medium">compound interest scenario</Link>,
        your year-two interest would be calculated on $10,500 instead of $10,000, creating an accelerating growth curve. This distinction matters
        enormously over long time horizons but is less significant for short-term calculations.
      </p>

      <p>
        For borrowers, simple interest is generally favorable. Your total cost is fixed and easy to calculate upfront. For investors seeking
        long-term growth, compound interest — available through savings accounts, CDs, and investment funds — will always produce higher returns.
        Use our{" "}
        <Link href="/calculators/cd-calculator" className="text-brand-600 hover:text-brand-800 font-medium">CD Interest Calculator</Link>{" "}
        to see how compounding affects your returns on certificates of deposit.
      </p>

      <h3>Case Study: Marcus and His Auto Loan</h3>

      <p>
        Marcus, a 28-year-old software developer in Austin, Texas, purchased a used 2022 Honda Accord for $22,000. After a $4,000 down payment,
        he financed $18,000 through his credit union at 4.5% simple interest for 48 months (4 years). Here is exactly what his loan cost:
      </p>

      <ul>
        <li><strong>Principal:</strong> $18,000</li>
        <li><strong>Annual Interest Rate:</strong> 4.5%</li>
        <li><strong>Loan Term:</strong> 4 years</li>
        <li><strong>Total Interest:</strong> $18,000 x 0.045 x 4 = $3,240</li>
        <li><strong>Total Amount Repaid:</strong> $18,000 + $3,240 = $21,240</li>
        <li><strong>Monthly Payment:</strong> $21,240 / 48 = $442.50</li>
      </ul>

      <p>
        Marcus compared this to a dealer-financed option at 6.9% for the same term. That loan would have cost him $4,968 in interest — a
        difference of $1,728. By shopping for the lower rate and understanding exactly how simple interest works, Marcus saved enough to cover
        six months of car insurance premiums.
      </p>

      <h3>Simple Interest vs Compound Interest: Side-by-Side Comparison</h3>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Simple Interest</th>
              <th>Compound Interest (Annual)</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$10,000 at 5% for 1 year</td>
              <td>$500</td>
              <td>$500</td>
              <td>$0</td>
            </tr>
            <tr>
              <td>$10,000 at 5% for 5 years</td>
              <td>$2,500</td>
              <td>$2,763</td>
              <td>$263</td>
            </tr>
            <tr>
              <td>$10,000 at 5% for 10 years</td>
              <td>$5,000</td>
              <td>$6,289</td>
              <td>$1,289</td>
            </tr>
            <tr>
              <td>$10,000 at 5% for 20 years</td>
              <td>$10,000</td>
              <td>$16,533</td>
              <td>$6,533</td>
            </tr>
            <tr>
              <td>$10,000 at 5% for 30 years</td>
              <td>$15,000</td>
              <td>$33,219</td>
              <td>$18,219</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The table above reveals a critical insight: for short periods (one to three years), simple and compound interest produce nearly identical
        results. But as time extends, the gap becomes dramatic. At 30 years, compound interest generates more than double the return of simple interest
        on the same principal and rate.
      </p>

      <h3>Where You Will Encounter Simple Interest</h3>

      <p>
        Auto loans are the most common real-world application of simple interest. Most credit unions and banks calculate auto loan interest using the
        simple interest method, which means extra payments reduce your principal directly and lower your total interest cost. This is why financial
        advisors recommend making bi-weekly payments on auto loans — each extra payment chips away at the principal faster. You can estimate your
        auto loan costs using our{" "}
        <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">Savings Goal Calculator</Link>{" "}
        to plan how much to set aside each month for a car purchase.
      </p>

      <p>
        Other common applications include short-term personal loans, some student loan structures during grace periods, Treasury bills (T-bills),
        and certain installment agreements. Retailers who offer &ldquo;no interest for 12 months&rdquo; promotions are effectively using a simple
        interest model — though deferred interest kicks in if you do not pay in full by the deadline.
      </p>

      <h3>Tips for Getting the Most from Simple Interest Calculations</h3>

      <ul>
        <li>
          <strong>Pay early when possible.</strong> With simple interest loans, paying extra toward principal reduces the base for future interest
          calculations. On a $20,000 auto loan at 5%, paying an extra $100 per month saves approximately $480 in total interest over a 4-year term.
        </li>
        <li>
          <strong>Compare APR vs. stated rate.</strong> The annual percentage rate (APR) includes fees and closing costs, giving you the true cost of
          borrowing. A 4% simple interest loan with $500 in fees may have a higher effective cost than a 4.25% loan with no fees.
        </li>
        <li>
          <strong>Use simple interest for quick estimates.</strong> Even when a loan uses compound interest, the simple interest formula gives you a
          reasonable ballpark figure for short-term loans (under 3 years). The error margin is typically less than 3%.
        </li>
        <li>
          <strong>Watch the day count convention.</strong> Some lenders calculate simple interest using a 360-day year (common in commercial lending)
          rather than 365 days, which slightly increases your effective interest rate.
        </li>
        <li>
          <strong>Combine with compound interest knowledge.</strong> Understanding both types of interest helps you evaluate whether to pay off
          simple-interest debt early or invest that money in a compound-interest vehicle like a{" "}
          <Link href="/guides/high-yield-savings-vs-cd" className="text-brand-600 hover:text-brand-800 font-medium">high-yield savings account or CD</Link>.
        </li>
      </ul>

      <h3>Frequently Asked Questions</h3>

      <h4>Is simple interest better than compound interest?</h4>
      <p>
        It depends on which side of the transaction you are on. As a borrower, simple interest is better because you pay less over time. As an
        investor or saver, compound interest is better because your money grows faster. For a $10,000 investment at 5% over 10 years, compound
        interest earns $1,289 more than simple interest. Read more about how compounding works in our{" "}
        <Link href="/guides/compound-interest-real-examples" className="text-brand-600 hover:text-brand-800 font-medium">guide to compound interest with real examples</Link>.
      </p>

      <h4>How do I calculate simple interest for less than one year?</h4>
      <p>
        Use fractions of a year in the time variable. For 6 months, use T = 0.5. For 90 days, use T = 90/365 = 0.2466.
        On a $5,000 principal at 4% for 90 days, the interest is $5,000 x 0.04 x 0.2466 = $49.32.
      </p>

      <h4>Do any savings accounts use simple interest?</h4>
      <p>
        Almost no savings accounts use simple interest. Banks calculate savings account interest using compound interest, typically compounding
        daily or monthly. This is advantageous for you as a depositor. However, the advertised APY (annual percentage yield) already accounts for
        compounding, so you can compare rates directly.
      </p>

      <h4>Can I use simple interest to estimate mortgage costs?</h4>
      <p>
        Simple interest gives a very rough estimate for mortgages but significantly undercounts the total interest on a 30-year term. Mortgages
        use amortization — a form of compound interest where each payment covers both interest and principal. For accurate mortgage calculations,
        use a dedicated mortgage calculator with amortization schedules.
      </p>

      <h4>What is the Rule of 72 and does it apply to simple interest?</h4>
      <p>
        The Rule of 72 is a shortcut for estimating how long it takes to double your money: divide 72 by the annual interest rate. At 6%, your
        money doubles in about 12 years. However, the Rule of 72 applies to compound interest only. With simple interest at 6%, it takes
        exactly 100/6 = 16.67 years to double your money — significantly longer.
      </p>
    </article>
  );
}
