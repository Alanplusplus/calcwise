import Link from "next/link";
import Image from "next/image";
import { Sources } from "@/components/Sources";

export function CarAffordabilityArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/car-affordability-infographic.webp"
          alt="Infographic walking through the 10% car budget rule for a $72,000 income: a $600 monthly budget, a $260 loan payment, and a maximum car price of about $18,745 at 7.54% APR over 48 months"
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
        <li><strong>4-year maximum loan term</strong> — Finance the vehicle for no more than 48 months. On a $21,750 loan (a $25,000 car with $5,000 down and 7% tax), 48 months at the Federal Reserve G.19 60-month bank average of 7.54% (August 2026) costs about $526 per month and $3,512 in interest. Stretching to 60 months drops the payment to $436 but adds $912 in total interest.</li>
        <li><strong>10% of gross income for all car costs</strong> — Your combined monthly loan payment, insurance, and fuel should not exceed 10% of gross monthly income. Someone earning $72,000 per year ($6,000/month gross) has a $600 monthly car budget. With $165 for insurance and $175 for fuel, the maximum loan payment is $260 per month.</li>
      </ul>
      <p>
        The 10% rule uses gross income (before taxes), not take-home pay. If your gross monthly income is $5,417 ($65,000/year), your total car budget is $542 per month. After $150 for insurance and $150 for fuel, you can afford a loan payment of roughly $242 per month on a 60-month term at 7.54% APR — supporting a maximum car price near $17,050 with a $5,000 down payment in this calculator.
      </p>
      <Sources
        items={[
          {
            label: "Federal Reserve G.19 Consumer Credit (Aug. 2026, released Oct. 7, 2026)",
            href: "https://www.federalreserve.gov/releases/g19/current/",
          },
          {
            label: "Kelley Blue Book / Cox Automotive — Sept. 2026 average transaction price ($50,562)",
            href: "https://www.coxautoinc.com/insights/sept-2026-atp-report/",
          },
          {
            label: "Experian — Auto Loan Rates and Financing (Q2 2026)",
            href: "https://www.experian.com/blogs/ask-experian/auto-loan-rates-financing/",
          },
        ]}
        checked="October 2026"
      />

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
            <td>7.54% APR / 48 months</td>
          </tr>
          <tr>
            <td>Insurance + Fuel</td>
            <td>$340/month</td>
          </tr>
        </tbody>
      </table>
      <p>
        Using the 10% rule, Sophia's total car budget is $600 per month ($6,000 x 0.10). After subtracting $340 for insurance and fuel, her maximum loan payment is $260 per month. At 7.54% over 48 months, that supports a loan of about $10,745, plus her $8,000 down payment, for a maximum car price near $18,745. Her 48-month term passes the 4-year rule. Total monthly car costs of $600 equal exactly 10% of gross income, earning an "Excellent" affordability rating.
      </p>
      <p>
        After car costs and existing debts, Sophia retains $3,620 per month from take-home pay ($4,600 - $600 - $380). She targets a $17,500 used Toyota Corolla, which produces a $260 monthly payment, $600 total monthly car costs (10.0% of gross income), and leaves her $3,620 for rent, groceries, and savings. For a broader view of her overall spending, she checks her numbers against the{" "}
        <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">
          50/30/20 Budget Calculator
        </Link>
        .
      </p>

      <h2>Car Affordability by Income Level</h2>
      <p>
        The table below shows recommended car budgets at common salary levels. Assumptions: 7.54% APR (Federal Reserve G.19 60-month bank average, August 2026), 48-month loan term, $150/month insurance, $150/month fuel, and a 20% down payment (max price = max loan ÷ 0.80). Actual affordability varies based on your debts, credit score, and local insurance rates.
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
            <td>$1,700</td>
          </tr>
          <tr>
            <td>$55,000</td>
            <td>$4,583</td>
            <td>$458/mo</td>
            <td>$158/mo</td>
            <td>$8,200</td>
          </tr>
          <tr>
            <td>$70,000</td>
            <td>$5,833</td>
            <td>$583/mo</td>
            <td>$283/mo</td>
            <td>$14,600</td>
          </tr>
          <tr>
            <td>$85,000</td>
            <td>$7,083</td>
            <td>$708/mo</td>
            <td>$408/mo</td>
            <td>$21,100</td>
          </tr>
          <tr>
            <td>$100,000</td>
            <td>$8,333</td>
            <td>$833/mo</td>
            <td>$533/mo</td>
            <td>$27,600</td>
          </tr>
          <tr>
            <td>$120,000</td>
            <td>$10,000</td>
            <td>$1,000/mo</td>
            <td>$700/mo</td>
            <td>$36,200</td>
          </tr>
        </tbody>
      </table>
      <p>
        Notice how insurance and fuel consume a fixed portion of the budget regardless of income. At $40,000/year, $300 in insurance and fuel leaves only $33 for the loan payment — which is why lower-income buyers often need larger down payments, shorter commutes, or used vehicles below Cox Automotive's $27,235 average used listing price (mid-October 2026). At $120,000/year, the same $300 in operating costs leaves $700 for the loan, supporting a car priced more than twenty times the $40,000 row above. Check your full debt picture with our{" "}
        <Link href="/calculators/debt-to-income" className="text-brand-600 hover:text-brand-800 font-medium">
          Debt-to-Income Calculator
        </Link>{" "}
        before adding a car payment to your monthly obligations.
      </p>

      <h2>Tips for Getting the Best Deal</h2>
      <p>
        <strong>Get pre-approved before visiting dealerships.</strong> A pre-approval letter from your bank or credit union gives you a firm rate and budget ceiling. On a $21,750 loan over 48 months, the difference between 6.35% (Experian Q2 2026 new average) and 7.54% (G.19 bank average) is about $14 per month and $672 in total interest.
      </p>
      <p>
        <strong>Compare new vs. certified pre-owned.</strong> Kelley Blue Book's September 2026 compact-car average transaction price was $27,977 versus a $50,562 industry average for all new vehicles. A 2-year-old certified Honda near $22,000 saves thousands upfront versus new and cuts the loan payment by roughly $100 per month at 7.54% over 48 months compared with financing $28,000.
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
        Many buyers start with less than 20% down, especially on first purchases. If you put 10% down on a $25,000 car ($2,500) instead of 20%, the tax-inclusive loan rises by about $2,000 — adding roughly $48 per month on a 48-month loan at 7.54% APR. The trade-off is higher monthly payments and greater risk of negative equity. Consider saving longer, buying below the $27,977 compact-car average, or targeting used inventory near $15,000–$20,000 where a $3,000–$4,000 down payment meets the 20% threshold.
      </p>

      <h3>Does the 10% rule include maintenance and repairs?</h3>
      <p>
        The traditional 20/4/10 rule covers loan payment, insurance, and fuel only. Maintenance is not included in the 10% calculation, which is why financial planners recommend treating the 10% figure as a ceiling rather than a target. Budget an additional 1-2% of the car's value per year for maintenance — roughly $25-$50 per month on a $20,000 vehicle. Older cars with 75,000+ miles may need $100-$150 per month for repairs and scheduled service.
      </p>

      <h3>How does my credit score affect affordability?</h3>
      <p>
        Credit score directly impacts your interest rate, which changes how much car your monthly payment can support. Experian's Q2 2026 averages show super-prime new borrowers at 4.41% APR versus deep-subprime at 16.11% on the same loan amount — a spread of hundreds of dollars per month. On a $22,000 loan over 48 months, a 3-point APR reduction saves about $700 in total interest. Check your credit report before shopping and consider delaying a purchase if you can improve your score by 30–50 points within six months.
      </p>

      <h3>Is leasing a better option if I cannot meet the 20/4/10 rule?</h3>
      <p>
        Leasing typically offers lower monthly payments — Edmunds' lease calculator guidance uses about 53% residual value on a 36-month term as a planning assumption, which often produces payments below a 7.54% purchase loan on the same MSRP. However, leases come with mileage limits (usually 10,000–12,000 miles per year), wear-and-tear charges, and no equity. Run both paths in our{" "}
        <Link href="/calculators/lease-vs-buy-car" className="text-brand-600 hover:text-brand-800 font-medium">
          Lease vs Buy Car Calculator
        </Link>{" "}
        before deciding, and avoid leasing if you drive more than 15,000 miles per year.
      </p>
    </>
  );
}
