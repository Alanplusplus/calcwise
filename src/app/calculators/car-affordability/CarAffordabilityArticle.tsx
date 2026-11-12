import Link from "next/link";
import Image from "next/image";
import { Sources } from "@/components/Sources";
import { DEFAULT_NEW_CAR_APR } from "@/lib/market-data";
import { US_RESULT as carOwnership } from "@/lib/reports/car-ownership-by-state";

const WORKED_EXAMPLE_APR = parseFloat(DEFAULT_NEW_CAR_APR);
const WORKED_EXAMPLE_TERM_MONTHS = 48;
const WORKED_EXAMPLE_INSURANCE = 150;
const WORKED_EXAMPLE_FUEL = 150;
const WORKED_EXAMPLE_OPERATING =
  WORKED_EXAMPLE_INSURANCE + WORKED_EXAMPLE_FUEL;

function calcMaxLoanFromPayment(
  payment: number,
  annualRate: number,
  termMonths: number,
): number {
  if (payment <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return payment * termMonths;
  return payment * ((1 - Math.pow(1 + r, -termMonths)) / r);
}

function formatUsdWhole(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

const WORKED_EXAMPLE_INCOMES = [40_000, 60_000, 80_000, 100_000] as const;

const workedExamples = WORKED_EXAMPLE_INCOMES.map((annualIncome) => {
  const grossMonthly = annualIncome / 12;
  const totalCarCeiling = grossMonthly * 0.1;
  const maxLoanPayment = Math.max(0, totalCarCeiling - WORKED_EXAMPLE_OPERATING);
  const maxLoan = calcMaxLoanFromPayment(
    maxLoanPayment,
    WORKED_EXAMPLE_APR,
    WORKED_EXAMPLE_TERM_MONTHS,
  );
  const maxCarPrice = maxLoan / 0.8;
  return {
    annualIncome,
    grossMonthly,
    totalCarCeiling,
    maxLoanPayment,
    maxCarPrice,
  };
});

const workedExample60k = workedExamples.find((r) => r.annualIncome === 60_000)!;

/** Plain-text FAQ entry, exported so the page's FAQ JSON-LD matches what readers see. */
export const salary60kFaq = {
  question: "How much car can I afford on a $60,000 salary?",
  answer: `About ${formatUsdWhole(workedExample60k.maxCarPrice)}. At $60,000 per year (${formatUsdWhole(workedExample60k.grossMonthly)}/month gross), the 20/4/10 rule allows ${formatUsdWhole(workedExample60k.totalCarCeiling)} per month for payment, insurance, and fuel combined. Subtracting ${formatUsdWhole(WORKED_EXAMPLE_OPERATING)} for the calculator's illustrative insurance and fuel defaults leaves ${formatUsdWhole(workedExample60k.maxLoanPayment)} for the loan at ${WORKED_EXAMPLE_APR}% over 48 months with 20% down. The salary guide reaches a lower figure, about $8,600, because it uses Edmunds' 7.0% Q3 2026 APR and higher insurance and fuel costs ($335 a month).`,
};

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
        Results update in real time as you adjust any field. The top summary cards display your max affordable car price, recommended monthly loan payment, and your 10% gross income budget. Below that, an affordability rating color-codes whether your total car costs (payment plus insurance plus fuel) fall within 10%, 15%, or 20% of gross monthly income. Use the price comparison table to see how a $25,000 car compares to a $35,000 option at your specific loan terms. For salary-specific walkthroughs, insurance benchmarks, and when to stretch the 10% rule, read our{" "}
        <Link href="/guides/how-much-car-can-i-afford" className="text-brand-600 hover:text-brand-800 font-medium">
          how much car can I afford guide
        </Link>
        ; for detailed payment breakdowns on a specific vehicle price, try our{" "}
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

      <h2 id="worked-examples-20410">Worked examples (20/4/10 at this calculator's defaults)</h2>
      <p>
        On a $60,000 salary, 20/4/10 caps total car costs at{" "}
        {formatUsdWhole(workedExample60k.totalCarCeiling)}/month; after{" "}
        {formatUsdWhole(WORKED_EXAMPLE_OPERATING)} for insurance and fuel,{" "}
        {formatUsdWhole(workedExample60k.maxLoanPayment)} is left for the loan
        payment, which supports a maximum car price of about{" "}
        {formatUsdWhole(workedExample60k.maxCarPrice)} with 20% down at{" "}
        {WORKED_EXAMPLE_APR}% APR over 48 months. The table below uses the same
        assumptions for other incomes; for Edmunds Q3 2026 averages and
        $335/month operating costs, see the{" "}
        <Link
          href="/guides/how-much-car-can-i-afford"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          salary-by-salary car affordability guide
        </Link>
        .
      </p>
      <p className="text-sm text-ink-600">
        Assumptions: {WORKED_EXAMPLE_APR}% APR (Federal Reserve G.19
        commercial-bank 60-month new-vehicle average, August 2026, matching this
        calculator's default rate field), 48-month term, 20% down (max car
        price = max loan ÷ 0.80),{" "}
        {formatUsdWhole(WORKED_EXAMPLE_INSURANCE)}/month illustrative insurance
        and {formatUsdWhole(WORKED_EXAMPLE_FUEL)}/month illustrative
        fuel/maintenance in the 10% bucket (matching the calculator field
        defaults, not national full-coverage averages).
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50">
              <th className="px-4 py-3 text-left font-semibold text-ink-700">
                Gross income
              </th>
              <th className="px-4 py-3 text-left font-semibold text-ink-700">
                10% monthly ceiling
              </th>
              <th className="px-4 py-3 text-left font-semibold text-ink-700">
                Insurance + fuel allowance
              </th>
              <th className="px-4 py-3 text-left font-semibold text-ink-700">
                Max loan payment
              </th>
              <th className="px-4 py-3 text-left font-semibold text-ink-700">
                Max car price (20% down)
              </th>
            </tr>
          </thead>
          <tbody>
            {workedExamples.map((row) => (
              <tr key={row.annualIncome} className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">
                  {formatUsdWhole(row.annualIncome)}
                </td>
                <td className="px-4 py-3">
                  {formatUsdWhole(row.totalCarCeiling)}/mo
                </td>
                <td className="px-4 py-3">
                  {formatUsdWhole(WORKED_EXAMPLE_OPERATING)}/mo
                </td>
                <td className="px-4 py-3">
                  {formatUsdWhole(row.maxLoanPayment)}/mo
                </td>
                <td className="px-4 py-3 font-medium text-brand-700">
                  {row.maxLoanPayment <= 0
                    ? "Cash only"
                    : formatUsdWhole(row.maxCarPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        {`The ${formatUsdWhole(workedExamples[0].annualIncome)} row shows the rule's limit at low incomes: the ${formatUsdWhole(workedExamples[0].totalCarCeiling)} monthly ceiling is almost used up by ${formatUsdWhole(WORKED_EXAMPLE_OPERATING)} of insurance and fuel, so only ${formatUsdWhole(workedExamples[0].maxLoanPayment)} is left for a payment and the realistic plan is a used vehicle bought mostly with savings. Each extra $1,000 of income adds about ${formatUsdWhole(100 / 12)} to the monthly ceiling.`}
      </p>
      <p>
        {`For context on how many vehicles households actually carry, the 2025 American Community Survey counts ${carOwnership.perHh.value.toFixed(2)} vehicles per U.S. household, and ${carOwnership.noneShare.pct.toFixed(1)}% of households have none. Our `}
        <Link href="/reports/car-ownership-by-state" className="text-brand-600 hover:text-brand-800 font-medium">
          car ownership by state report
        </Link>
        {" "}
        shows the figures for every state and what AAA's average insurance and fuel costs take of local incomes.
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
        For $40,000, $60,000, $80,000, and $100,000 gross income at this tool's field defaults, use the{" "}
        <Link href="#worked-examples-20410" className="text-brand-600 hover:text-brand-800 font-medium">
          worked examples table
        </Link>{" "}
        above (same figures as the{" "}
        <Link href="/guides/how-much-car-can-i-afford" className="text-brand-600 hover:text-brand-800 font-medium">
          salary car affordability guide
        </Link>
        's calculator-aligned snapshot). The extended table below adds other salary points with the same 7.54% APR, 48-month term, $150/month illustrative insurance, $150/month illustrative fuel, and 20% down (max price = max loan ÷ 0.80). Actual affordability varies with debts, credit score, and local insurance rates.
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
            <td>$1,722</td>
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
            <td>$27,551</td>
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

      <h3>{salary60kFaq.question}</h3>
      <p>
        {salary60kFaq.answer} Our{" "}
        <Link
          href="/guides/how-much-car-can-i-afford"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          car affordability by salary guide
        </Link>{" "}
        shows the same salaries under the Edmunds assumptions.
      </p>

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
