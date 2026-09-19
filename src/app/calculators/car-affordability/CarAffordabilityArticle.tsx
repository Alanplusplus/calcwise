import Link from "next/link";
import Image from "next/image";

export function CarAffordabilityArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/car-affordability-infographic.webp"
          alt="Infographic showing the 20/4/10 rule for car affordability with income-based vehicle budget recommendations"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          The 20/4/10 rule helps you determine how much car you can truly afford without stretching your budget.
        </figcaption>
      </figure>

      <h2>How to Use This Car Affordability Calculator</h2>
      <p>
        Enter your annual gross income, monthly take-home pay, and existing debt payments to establish your financial baseline. Add your planned down payment, trade-in value, expected interest rate, loan term, and estimated monthly insurance and fuel costs. The calculator instantly computes your maximum affordable car price using the 20/4/10 rule and shows whether your budget passes each criterion.
      </p>
      <p>
        Results update in real time as you adjust any field. The top summary cards display your max affordable car price, recommended monthly loan payment, and your 10% gross income budget. Below that, an affordability rating color-codes whether your total car costs (payment plus insurance plus fuel) fall within 10%, 15%, or 20% of gross monthly income. Use the price comparison table to see how a $25,000 car compares to a $35,000 option at your specific loan terms. For detailed payment breakdowns on a specific vehicle price, try our{" "}
        <Link href="/calculators/auto-loan" className="text-brand-600 hover:text-brand-800 font-medium">
          Auto Loan Calculator
        </Link>
        .
      </p>

      <h2>The 20/4/10 Rule Explained</h2>
      <p>
        Financial advisors and consumer advocates widely recommend the 20/4/10 rule as a framework for car buying. Each number represents a specific limit designed to keep transportation costs from crowding out savings, housing, and other priorities.
      </p>
      <ul>
        <li><strong>20% down payment</strong> — Put at least 20% of the vehicle purchase price down at signing. On a $30,000 car, that means $6,000 upfront. A larger down payment reduces your loan balance, lowers monthly payments, and helps you avoid being upside-down (owing more than the car is worth) if you need to sell early.</li>
        <li><strong>4-year maximum loan term</strong> — Finance the vehicle for no more than 48 months. A 60-month loan on a $25,000 balance at 6.5% APR costs $489 per month and $4,340 in total interest. Stretching to 72 months drops the payment to $420 but pushes total interest to $5,240 — an extra $900 for the same car.</li>
        <li><strong>10% of gross income for all car costs</strong> — Your combined monthly loan payment, insurance, and fuel should not exceed 10% of gross monthly income. Someone earning $72,000 per year ($6,000/month gross) has a $600 monthly car budget. With $160 for insurance and $140 for fuel, the maximum loan payment is $300 per month.</li>
      </ul>
      <p>
        The 10% rule uses gross income (before taxes), not take-home pay. This is intentional — it builds in a buffer for taxes, retirement contributions, and unexpected expenses. If your gross monthly income is $5,417 ($65,000/year), your total car budget is $542 per month. After $150 for insurance and $150 for fuel, you can afford a loan payment of roughly $242 per month on a 60-month term at 6.5% APR, which supports a car priced around $18,500 with a $5,000 down payment.
      </p>

      <h2>Case Study: Sophia Buys Her First Car in Phoenix</h2>
      <p>
        Sophia is a 29-year-old data analyst living in Phoenix, Arizona. She earns $72,000 per year ($6,000/month gross, $4,600/month take-home after taxes and her 401(k) contribution). Her existing monthly debt payments total $380 — $280 for student loans and $100 in credit card minimums. She has saved $8,000 for a down payment and expects $0 trade-in value on her current vehicle.
      </p>
      <p>
        Sophia estimates $165 per month for full-coverage insurance (Arizona averages $1,810/year for a 30-year-old driver) and $175 per month for fuel based on her 25-mile daily commute. She plans to finance at 6.5% APR over 48 months, following the 4-year recommendation.
      </p>
      <table>
        <thead>
          <tr>
            <th>Input</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Annual Gross Income</td>
            <td>$72,000</td>
          </tr>
          <tr>
            <td>Monthly Take-Home Pay</td>
            <td>$4,600</td>
          </tr>
          <tr>
            <td>Existing Monthly Debts</td>
            <td>$380</td>
          </tr>
          <tr>
            <td>Down Payment</td>
            <td>$8,000</td>
          </tr>
          <tr>
            <td>Interest Rate / Term</td>
            <td>6.5% APR / 48 months</td>
          </tr>
          <tr>
            <td>Insurance + Fuel</td>
            <td>$340/month</td>
          </tr>
        </tbody>
      </table>
      <p>
        Using the 10% rule, Sophia&apos;s total car budget is $600 per month ($6,000 x 0.10). After subtracting $340 for insurance and fuel, her maximum loan payment is $260 per month. At 6.5% over 48 months, that supports a loan of $10,970, plus her $8,000 down payment, for a maximum car price of $18,970. Her $8,000 down payment represents 42% of that price — well above the 20% threshold. Her 48-month term passes the 4-year rule. Total monthly car costs of $600 equal exactly 10% of gross income, earning an &quot;Excellent&quot; affordability rating.
      </p>
      <p>
        After car costs and existing debts, Sophia retains $3,660 per month from take-home pay ($4,600 - $600 - $380). She decides to target a $17,500 used Toyota Corolla, which produces a $227 monthly payment, $567 total monthly car costs (9.5% of gross income), and leaves her $3,693 per month for rent, groceries, and savings. For a broader view of her overall spending, she checks her numbers against the{" "}
        <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">
          50/30/20 Budget Calculator
        </Link>
        .
      </p>

      <h2>Car Affordability by Income Level</h2>
      <p>
        The table below shows recommended car budgets at common salary levels. Assumptions: 6.5% APR, 48-month loan term, $150/month insurance, $150/month fuel, and a 20% down payment. Actual affordability varies based on your debts, credit score, and local insurance rates.
      </p>
      <table>
        <thead>
          <tr>
            <th>Annual Salary</th>
            <th>Gross Monthly</th>
            <th>10% Car Budget</th>
            <th>Max Loan Payment</th>
            <th>Recommended Max Car Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$40,000</td>
            <td>$3,333</td>
            <td>$333/mo</td>
            <td>$33/mo</td>
            <td>$9,200</td>
          </tr>
          <tr>
            <td>$55,000</td>
            <td>$4,583</td>
            <td>$458/mo</td>
            <td>$158/mo</td>
            <td>$14,700</td>
          </tr>
          <tr>
            <td>$70,000</td>
            <td>$5,833</td>
            <td>$583/mo</td>
            <td>$283/mo</td>
            <td>$20,200</td>
          </tr>
          <tr>
            <td>$85,000</td>
            <td>$7,083</td>
            <td>$708/mo</td>
            <td>$408/mo</td>
            <td>$25,700</td>
          </tr>
          <tr>
            <td>$100,000</td>
            <td>$8,333</td>
            <td>$833/mo</td>
            <td>$533/mo</td>
            <td>$31,200</td>
          </tr>
          <tr>
            <td>$120,000</td>
            <td>$10,000</td>
            <td>$1,000/mo</td>
            <td>$700/mo</td>
            <td>$38,500</td>
          </tr>
        </tbody>
      </table>
      <p>
        Notice how insurance and fuel consume a fixed portion of the budget regardless of income. At $40,000/year, $300 in insurance and fuel leaves only $33 for the loan payment — which is why lower-income buyers often need larger down payments or shorter commutes to stay within the 10% guideline. At $120,000/year, the same $300 in operating costs leaves $700 for the loan, supporting a car priced nearly four times higher. Check your full debt picture with our{" "}
        <Link href="/calculators/debt-to-income" className="text-brand-600 hover:text-brand-800 font-medium">
          Debt-to-Income Calculator
        </Link>{" "}
        before adding a car payment to your monthly obligations.
      </p>

      <h2>Tips for Getting the Best Deal</h2>
      <p>
        <strong>Get pre-approved before visiting dealerships.</strong> A pre-approval letter from your bank or credit union gives you a firm rate and budget ceiling. Credit unions often offer rates 1-2 percentage points below dealer financing — on a $20,000 loan over 48 months, the difference between 5.5% and 7.5% APR is $19 per month and $912 over the life of the loan.
      </p>
      <p>
        <strong>Compare new vs. certified pre-owned.</strong> A 2-year-old certified pre-owned vehicle typically costs 25-35% less than its new equivalent while retaining most of its warranty coverage. A new 2025 Honda Civic EX at $28,500 versus a 2023 CPO model at $22,400 saves $6,100 upfront and roughly $115 per month on a 48-month loan at 6.5% APR.
      </p>
      <p>
        <strong>Negotiate the out-the-door price, not the monthly payment.</strong> Dealers can extend loan terms or inflate trade-in values to hit a target monthly payment while increasing total cost. Focus on the total purchase price, interest rate, and loan term as separate line items. A $350/month payment over 72 months costs $25,200 total; the same payment over 48 months on a cheaper car costs $16,800.
      </p>
      <p>
        <strong>Factor in total ownership costs beyond the sticker price.</strong> Registration fees, sales tax (which ranges from 0% in Oregon to over 9% in states like Tennessee), maintenance, and depreciation all affect your true cost. Budget an additional $50-$100 per month for maintenance on vehicles past 50,000 miles. For a deeper dive into car buying strategy, read our{" "}
        <Link href="/guides/how-much-car-can-i-afford" className="text-brand-600 hover:text-brand-800 font-medium">
          car affordability guide
        </Link>
        .
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I use gross or net income for the 10% rule?</h3>
      <p>
        Use gross income (before taxes and deductions). The 10% rule is designed as a conservative ceiling that accounts for the gap between gross and take-home pay. If you earn $80,000/year ($6,667/month gross, roughly $4,800 take-home), your car budget is $667/month based on gross income — not $480 based on net. Using gross income prevents overcommitting when taxes, health insurance, and retirement contributions consume 25-35% of your paycheck.
      </p>

      <h3>What if I cannot afford 20% down?</h3>
      <p>
        Many buyers start with less than 20% down, especially on first purchases. If you put 10% down on a $25,000 car ($2,500), your loan balance is $22,500 instead of $20,000 — adding roughly $47 per month on a 48-month loan at 6.5% APR. The trade-off is higher monthly payments and greater risk of negative equity. Consider saving longer, buying a less expensive vehicle, or looking at certified pre-owned models in the $15,000-$20,000 range where a $3,000-$4,000 down payment meets the 20% threshold.
      </p>

      <h3>Does the 10% rule include maintenance and repairs?</h3>
      <p>
        The traditional 20/4/10 rule covers loan payment, insurance, and fuel only. Maintenance is not included in the 10% calculation, which is why financial planners recommend treating the 10% figure as a ceiling rather than a target. Budget an additional 1-2% of the car&apos;s value per year for maintenance — roughly $25-$50 per month on a $20,000 vehicle. Older cars with 75,000+ miles may need $100-$150 per month for repairs and scheduled service.
      </p>

      <h3>How does my credit score affect affordability?</h3>
      <p>
        Credit score directly impacts your interest rate, which changes how much car your monthly payment can support. On a $22,000 loan over 48 months, a borrower with a 760+ credit score might qualify for 5.5% APR ($511/month, $2,528 total interest), while a borrower at 620 might pay 12% APR ($581/month, $5,888 total interest). That $70/month difference reduces the maximum car price by approximately $3,000 at the same payment level. Check your credit report before shopping and consider delaying a purchase if you can improve your score by 30-50 points within six months.
      </p>

      <h3>Is leasing a better option if I cannot meet the 20/4/10 rule?</h3>
      <p>
        Leasing typically offers lower monthly payments — a $30,000 car might lease for $350/month versus $570/month to purchase over 48 months at 6.5% APR. However, leases come with mileage limits (usually 10,000-12,000 miles per year), wear-and-tear charges, and no equity at the end of the term. If your 10% budget is $450/month and a purchase requires $570/month, leasing at $350/month plus $150 insurance leaves $50 for fuel — tight but workable. Run the numbers for both options over a 3-year period before deciding, and avoid leasing if you drive more than 15,000 miles per year.
      </p>
    </>
  );
}
