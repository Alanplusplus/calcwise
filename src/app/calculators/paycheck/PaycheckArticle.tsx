import Link from "next/link";
import Image from "next/image";
import { Sources } from "@/components/Sources";
import {
  FSA_LIMITS,
  HSA_LIMITS,
  ORDINARY_BRACKETS,
  SOCIAL_SECURITY_WAGE_BASE,
  TAX_DATA,
  TAX_SOURCES,
  usd,
} from "@/lib/tax-data";

const BRACKET_10_TOP = ORDINARY_BRACKETS.single[0].upTo;
const BRACKET_12_WIDTH = ORDINARY_BRACKETS.single[1].upTo - ORDINARY_BRACKETS.single[0].upTo;

export function PaycheckArticle() {
  return (
    <>
      <Image
        src="/images/paycheck-infographic.webp"
        alt="Paycheck breakdown showing how gross salary is split between federal tax, state tax, Social Security, Medicare, 401k contributions, and take-home pay"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <h2>How Your Paycheck Is Calculated</h2>
      <p>
        Every pay period, your employer withholds a series of deductions from your gross pay before
        depositing the remainder into your bank account. Understanding each deduction helps you
        forecast your actual spending power and make better decisions about retirement contributions,
        tax withholding adjustments, and overall budgeting. The gap between what you earn on paper
        and what hits your checking account can be surprising, especially for first-time salaried
        employees or those switching from freelance to W-2 employment.
      </p>
      <p>
        The major components of paycheck withholding fall into three categories: federal income tax
        (progressive, based on filing status and income), FICA taxes (Social Security at 6.2% up to
        the {usd(SOCIAL_SECURITY_WAGE_BASE)} wage base for 2026, plus Medicare at 1.45% with no cap), and state/local income taxes
        that vary widely by jurisdiction. On top of these mandatory withholdings, voluntary pre-tax
        deductions like 401(k) contributions, health insurance premiums, and HSA contributions
        further reduce your taxable income.
      </p>

      <h2>Key Concepts Behind Paycheck Withholding</h2>
      <p>
        Federal income tax withholding uses the W-4 form you submitted when starting your job. The
        IRS progressive bracket system means your first {usd(BRACKET_10_TOP)} of taxable income
        (single filer, 2026) is taxed at only 10%, then the next {usd(BRACKET_12_WIDTH)} at 12%,
        and so on up through the 37% bracket. Your
        employer approximates your annual tax liability and divides it evenly across pay periods,
        so your per-paycheck withholding stays consistent even though the brackets are annual.
      </p>
      <p>
        FICA taxes fund Social Security and Medicare. Unlike income tax, these are flat-rate taxes
        with no deductions or brackets reducing them (below the wage base). The 6.2% Social
        Security tax stops once you earn {usd(SOCIAL_SECURITY_WAGE_BASE)} in a calendar year — if you earn more than this,
        your later paychecks will see a bump in take-home pay because Social Security withholding
        stops. Medicare has no cap and adds a 0.9% surtax on earnings above $200,000 for single
        filers. Your employer matches your FICA contributions dollar-for-dollar, but that match
        does not appear on your pay stub.
      </p>
      <p>
        Pre-tax deductions like traditional 401(k) contributions reduce your taxable income dollar
        for dollar. Contributing 6% of a $75,000 salary ($4,500 per year) lowers your federal
        taxable income to $70,500, saving you roughly $990 in federal taxes at the 22% bracket. This
        is why financial planners often describe 401(k) contributions as costing less than the
        headline amount — a $4,500 contribution might only reduce your take-home pay by about $3,500
        because of the tax savings. Use our{" "}
        <Link href="/calculators/income-tax" className="text-brand-600 hover:text-brand-800 font-medium">
          Income Tax Calculator
        </Link>{" "}
        to see exactly how different income levels map to tax brackets.
      </p>

      <h2>Case Study: Marcus, Software Developer in Texas</h2>
      <p>
        Marcus earns $95,000 per year as a mid-level developer in Austin, Texas. He is paid
        bi-weekly (26 paychecks per year) and files as single. Texas has no state income tax, but
        he contributes 8% to his 401(k). Here is how his paycheck breaks down:
      </p>
      <ul>
        <li>Gross pay per paycheck: $3,653.85</li>
        <li>401(k) contribution (8%): -$292.31</li>
        <li>Federal income tax: -$399.92 (based on $71,300 taxable after the $16,100 standard deduction and 401(k))</li>
        <li>Social Security (6.2%): -$226.54</li>
        <li>Medicare (1.45%): -$52.98</li>
        <li>State tax: $0.00 (Texas has no income tax)</li>
        <li><strong>Take-home pay: $2,682.10</strong></li>
      </ul>
      <p>
        Marcus takes home 73.4% of his gross pay. His effective overall tax rate is 18.6%, and his
        retirement savings grow tax-deferred at $7,600 per year. If he moved to a state taxing
        income at the roughly 8% rate used in the comparison table below, his take-home would drop
        by about $269 per paycheck ($87,400 of pay after his 401(k) x 8% / 26). He uses the{" "}
        <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">
          50/30/20 Budget Calculator
        </Link>{" "}
        to allocate his $5,811 monthly take-home between needs, wants, and savings.
      </p>

      <h2>How Pay Frequency Affects Your Finances</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Pay Frequency</th>
              <th>Paychecks/Year</th>
              <th>Gross Per Check ($75K)</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Weekly</td>
              <td>52</td>
              <td>$1,442</td>
              <td>Hourly workers, tight cash flow management</td>
            </tr>
            <tr>
              <td>Bi-weekly</td>
              <td>26</td>
              <td>$2,885</td>
              <td>Most common for salaried employees</td>
            </tr>
            <tr>
              <td>Semi-monthly</td>
              <td>24</td>
              <td>$3,125</td>
              <td>Aligns with monthly bill cycles</td>
            </tr>
            <tr>
              <td>Monthly</td>
              <td>12</td>
              <td>$6,250</td>
              <td>Executives, some government positions</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Bi-weekly pay creates two “bonus” months per year where you receive three
        paychecks instead of two. These months are powerful savings opportunities — if your budget
        is built around two paychecks per month, that third check can go directly to your{" "}
        <Link href="/calculators/savings-goal" className="text-brand-600 hover:text-brand-800 font-medium">
          savings goal
        </Link>{" "}
        or debt payoff without affecting your normal spending.
      </p>

      <h2>State Tax Impact: A Comparison</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Income Tax Rate (approx.)</th>
              <th>Annual Tax on $75K</th>
              <th>Monthly Take-Home Difference vs. No-Tax State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Texas / Florida / Washington</td>
              <td>0%</td>
              <td>$0</td>
              <td>Baseline</td>
            </tr>
            <tr>
              <td>Colorado</td>
              <td>4.4%</td>
              <td>$3,300</td>
              <td>-$275/mo</td>
            </tr>
            <tr>
              <td>Illinois</td>
              <td>4.95%</td>
              <td>$3,713</td>
              <td>-$309/mo</td>
            </tr>
            <tr>
              <td>New York</td>
              <td>~6.5%</td>
              <td>$4,875</td>
              <td>-$406/mo</td>
            </tr>
            <tr>
              <td>California</td>
              <td>~8%</td>
              <td>$6,000</td>
              <td>-$500/mo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        State income tax significantly impacts take-home pay, but should not be the sole factor in
        relocation decisions. No-tax states often have higher property taxes or sales taxes that
        offset the income tax savings. The true comparison requires looking at your total tax burden
        including property, sales, and local taxes specific to your spending patterns.
      </p>

      <h2>Strategies to Maximize Your Take-Home Pay</h2>
      <ul>
        <li>
          <strong>Optimize W-4 withholding:</strong> If you consistently receive large tax refunds
          ($1,000+), you are over-withholding. Adjust your W-4 to keep more money in each paycheck
          rather than giving the IRS an interest-free loan.
        </li>
        <li>
          <strong>Use pre-tax benefits strategically:</strong> Max out your HSA ({usd(HSA_LIMITS.selfOnly)} self-only /{" "}
          {usd(HSA_LIMITS.family)} family in 2026) if eligible — it reduces taxable income, grows tax-free, and
          withdrawals for medical expenses are never taxed.
        </li>
        <li>
          <strong>Consider Roth vs. Traditional 401(k):</strong> Roth contributions do not reduce
          your current paycheck taxes, but they grow tax-free. If you expect to be in a higher
          bracket in retirement, Roth may win long-term despite the lower current take-home. Read
          our{" "}
          <Link href="/guides/401k-vs-roth-ira" className="text-brand-600 hover:text-brand-800 font-medium">
            401(k) vs Roth IRA guide
          </Link>{" "}
          for a detailed comparison.
        </li>
        <li>
          <strong>Leverage FSA or DCFSA:</strong> Flexible Spending Accounts for healthcare ({usd(FSA_LIMITS.health)})
          or dependent care ({usd(FSA_LIMITS.dependentCare)}) reduce taxable income and cover predictable expenses with
          pre-tax dollars.
        </li>
        <li>
          <strong>Watch the Social Security wage base:</strong> High earners ({usd(SOCIAL_SECURITY_WAGE_BASE)}+) see a
          take-home pay increase in later months when Social Security withholding stops for the year.
          Plan for this windfall rather than letting lifestyle creep absorb it.
        </li>
      </ul>
      <Sources
        items={[
          TAX_SOURCES.revProc,
          TAX_SOURCES.ssaWageBase,
          TAX_SOURCES.hsaLimits,
          TAX_SOURCES.pub15b,
        ]}
        checked={TAX_DATA.checkedOnLabel}
        note="Health FSA limit is from Rev. Proc. 2025-32; your employer's plan may set a lower cap. State rates in the table above are approximate."
      />

      <h2>Frequently Asked Questions</h2>
      <h3>Why is my take-home pay so much lower than my salary?</h3>
      <p>
        Federal income tax, Social Security (6.2%), Medicare (1.45%), state taxes, and pre-tax
        deductions like 401(k) and health insurance all reduce your gross pay. For a typical single
        filer earning $75,000 with a 5% state tax and 6% 401(k) contribution, total deductions
        consume roughly 27% of gross pay ($20,443 including the $4,500 401(k) deferral), leaving
        about $54,558 in actual take-home. Without the 401(k) deferral, taxes alone take about 21%.
      </p>

      <h3>Does my 401(k) contribution actually cost me the full amount?</h3>
      <p>
        No. Pre-tax 401(k) contributions reduce your taxable income, so the net cost to your
        paycheck is less than the contribution amount. If you are in the 22% federal bracket plus
        5% state tax, every $100 contributed only reduces your take-home by about $73. You get $100
        invested for $73 of reduced spending money.
      </p>

      <h3>How do I calculate my paycheck if I am paid hourly?</h3>
      <p>
        Multiply your hourly rate by hours worked in the pay period to get gross pay. Then apply
        the same withholding calculations: federal and state income tax based on annualized income,
        Social Security at 6.2%, and Medicare at 1.45%. Overtime hours (over 40/week) are paid at
        1.5x your regular rate and taxed at your marginal rate.
      </p>

      <h3>What happens to my paycheck when I get a raise?</h3>
      <p>
        Only the portion of your raise that pushes you into a new bracket is taxed at the higher
        rate. A $5,000 raise does not move your entire salary into a higher bracket — it only
        increases your marginal tax by the bracket rate applied to those additional dollars. Your
        effective tax rate rises gradually, not suddenly. Use our{" "}
        <Link href="/calculators/income-tax" className="text-brand-600 hover:text-brand-800 font-medium">
          Income Tax Calculator
        </Link>{" "}
        to model your specific before-and-after scenario.
      </p>

      <h3>Should I adjust my withholding if I have a side income?</h3>
      <p>
        Yes. If you have freelance or gig income, your employer withholding is calculated only on
        your W-2 salary. You will owe additional taxes on 1099 income at filing time. Either
        increase W-4 withholding at your primary job or make quarterly estimated payments (Form
        1040-ES) to avoid underpayment penalties.
      </p>
    </>
  );
}
