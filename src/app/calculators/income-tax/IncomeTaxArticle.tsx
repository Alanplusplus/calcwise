import Link from "next/link";
import { Sources } from "@/components/Sources";
import {
  HSA_LIMITS,
  ORDINARY_BRACKETS,
  RETIREMENT_LIMITS,
  SALT_CAP,
  STANDARD_DEDUCTIONS,
  TAX_DATA,
  TAX_SOURCES,
  TOP_ORDINARY_RATE,
  usd,
  type FilingStatus,
} from "@/lib/tax-data";

function BracketTable({ status }: { status: FilingStatus }) {
  const rows = ORDINARY_BRACKETS[status];
  return (
    <table>
      <thead>
        <tr>
          <th>Tax Rate</th>
          <th>Taxable Income Range</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((b, i) => (
          <tr key={b.rate}>
            <td>{Math.round(b.rate * 100)}%</td>
            <td>
              {usd(i === 0 ? 0 : rows[i - 1].upTo + 1)} – {usd(b.upTo)}
            </td>
          </tr>
        ))}
        <tr>
          <td>{Math.round(TOP_ORDINARY_RATE * 100)}%</td>
          <td>{usd(rows[rows.length - 1].upTo + 1)} and above</td>
        </tr>
      </tbody>
    </table>
  );
}

export function IncomeTaxArticle() {
  return (
    <>
      <h2>How Federal Income Tax Works</h2>
      <p>
        The United States uses a progressive tax system, which means your income is divided into
        brackets and each portion is taxed at a different rate. You do not pay a single flat
        percentage on your entire salary. Instead, the first dollars you earn are taxed at the
        lowest rate, and only income above each threshold moves into higher brackets.
      </p>
      <p>
        This structure is often misunderstood. If you are in the 22% bracket, that does not mean
        every dollar you earn is taxed at 22%. It means your last dollar of taxable income falls
        into the 22% bracket, while earlier dollars were taxed at 10% and 12%. Your effective
        tax rate — total tax divided by gross income — is always lower than your marginal rate
        because of this layering effect.
      </p>
      <p>
        Federal income tax is calculated on taxable income, not gross income. Taxable income equals
        your gross earnings minus deductions (standard or itemized) and certain adjustments like
        traditional 401(k) contributions. The IRS then applies the bracket schedule for your
        filing status to determine how much you owe. State and local taxes are separate and not
        included in this calculator.
      </p>
      <p>
        Understanding your marginal rate matters when making financial decisions. A $1,000 bonus
        is taxed at your highest bracket, not your average rate. That is why maximizing pre-tax
        retirement contributions can be so powerful — they reduce taxable income in your highest
        bracket first. Use our calculator above alongside a{" "}
        <Link
          href="/calculators/retirement"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Retirement Savings Calculator
        </Link>{" "}
        to see how contributions affect both your tax bill and long-term wealth.
      </p>

      <h2>2026 Tax Brackets</h2>
      <p>
        The brackets below are the official figures for tax year {TAX_DATA.taxYear}, published by
        the IRS in Revenue Procedure 2025-32. They apply to taxable income after deductions, and
        you file the return that uses them in early 2027.
      </p>

      <h3>Single Filers</h3>
      <BracketTable status="single" />

      <h3>Married Filing Jointly</h3>
      <BracketTable status="mfj" />

      <h3>Head of Household</h3>
      <BracketTable status="hoh" />

      <p>
        The 2026 standard deduction is {usd(STANDARD_DEDUCTIONS.single)} for single filers,{" "}
        {usd(STANDARD_DEDUCTIONS.mfj)} for married filing jointly, and{" "}
        {usd(STANDARD_DEDUCTIONS.hoh)} for head of household. These amounts reduce your taxable
        income before the brackets are applied.
      </p>
      <Sources
        items={[TAX_SOURCES.revProc, TAX_SOURCES.irsRelease]}
        checked={TAX_DATA.checkedOnLabel}
      />

      <h2>Standard vs Itemized Deductions</h2>
      <p>
        Every taxpayer chooses between taking the standard deduction or itemizing individual
        deductions on Schedule A. You should pick whichever method gives you the larger total
        deduction. The standard deduction is a fixed amount based on filing status — simple and
        available to everyone with no record-keeping required.
      </p>
      <p>
        Itemized deductions include mortgage interest, state and local taxes (SALT, capped at
        {usd(SALT_CAP.limit)} for 2026 and reduced for modified adjusted gross income above{" "}
        {usd(SALT_CAP.phaseOutMagi)}, never below {usd(SALT_CAP.floor)}), charitable contributions, and certain medical expenses exceeding 7.5% of
        adjusted gross income. Itemizing makes sense when your total exceeds the standard
        deduction. For most taxpayers, especially those without a mortgage or large charitable
        gifts, the standard deduction is the better choice.
      </p>
      <p>
        Pre-tax retirement contributions like traditional 401(k) deferrals reduce your taxable
        income regardless of whether you itemize. A {usd(RETIREMENT_LIMITS.employeeDeferral)} 401(k) contribution directly lowers
        the income subject to brackets. For a detailed comparison of account types, see our{" "}
        <Link
          href="/guides/401k-vs-roth-ira"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          401(k) vs Roth IRA guide
        </Link>
        .
      </p>

      <h2>Case Study: Rachel, $95K Salary, Single Filer</h2>
      <p>
        Rachel is a 29-year-old marketing manager earning $95,000 per year. She files as single,
        contributes $6,000 to her traditional 401(k), and has no other above-the-line deductions.
        Her gross income is $95,000, but her taxable income calculation starts with deductions.
      </p>
      <p>
        <strong>Standard deduction scenario:</strong> Rachel takes the {usd(STANDARD_DEDUCTIONS.single)} standard deduction
        plus $6,000 in 401(k) contributions, reducing taxable income to $72,900. Her federal tax
        breaks down as follows: $1,240 at 10% (on the first $12,400), $4,560 at 12% (on
        $12,401–$50,400), and $4,950 at 22% (on $50,401–$72,900). Total federal tax: $10,750.
        Her effective rate is 11.3% and her marginal rate is 22%.
      </p>
      <p>
        <strong>Itemized deduction scenario:</strong> Rachel pays $8,400 in mortgage interest,
        $4,200 in state income tax, and donates $2,000 to charity — totaling $14,600 in itemized
        deductions. Combined with her $6,000 401(k) contribution, taxable income is $74,400.
        Because $14,600 is less than the {usd(STANDARD_DEDUCTIONS.single)} standard deduction, itemizing
        actually costs her money. Her taxable income would be $1,500 higher and she would owe
        $330 more in tax ($11,080 instead of $10,750).
      </p>
      <p>
        Rachel's takeaway: the standard deduction wins, and increasing her 401(k) contribution
        to $10,000 would save an additional $880 in taxes (22% of $4,000). She also uses the{" "}
        <Link
          href="/calculators/fire-calculator"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          FIRE Calculator
        </Link>{" "}
        to model how higher savings rates accelerate her path to financial independence.
      </p>

      <h2>Ways to Reduce Your Tax Bill</h2>
      <p>
        Legal tax reduction strategies focus on lowering taxable income or claiming credits that
        directly reduce tax owed dollar-for-dollar.
      </p>
      <ul>
        <li>
          <strong>401(k) and 403(b) contributions:</strong> Up to {usd(RETIREMENT_LIMITS.employeeDeferral)} in 2026 (plus{" "}
          {usd(RETIREMENT_LIMITS.catchUp50)} catch-up if age 50+, or {usd(RETIREMENT_LIMITS.catchUp60to63)}{" "}
          at ages 60 to 63). Every dollar deferred avoids taxation at your marginal rate.
        </li>
        <li>
          <strong>Traditional IRA:</strong> Contribute up to {usd(RETIREMENT_LIMITS.ira)} (
          {usd(RETIREMENT_LIMITS.ira + RETIREMENT_LIMITS.iraCatchUp50)} if 50+) and deduct if
          income limits allow. Ideal for those without employer plans or seeking additional
          deferrals.
        </li>
        <li>
          <strong>Health Savings Account (HSA):</strong> Triple tax advantage — deductible
          contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses.
          2026 limits are {usd(HSA_LIMITS.selfOnly)} for self-only coverage and{" "}
          {usd(HSA_LIMITS.family)} for family coverage, plus {usd(HSA_LIMITS.catchUp55)} if you are 55 or older.
        </li>
        <li>
          <strong>Charitable giving:</strong> Donations to qualified 501(c)(3) organizations are
          deductible when itemizing. Bunching donations into alternate years can push you above
          the standard deduction threshold.
        </li>
        <li>
          <strong>Tax credits:</strong> Unlike deductions, credits reduce tax owed directly.
          Common credits include the Child Tax Credit, Earned Income Tax Credit, and education
          credits like the American Opportunity Credit.
        </li>
      </ul>
      <Sources
        items={[TAX_SOURCES.retirementLimits, TAX_SOURCES.hsaLimits, TAX_SOURCES.saltCap]}
        checked={TAX_DATA.checkedOnLabel}
      />
      <p>
        Pair tax planning with budgeting using our{" "}
        <Link
          href="/calculators/budget-50-30-20"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          50/30/20 Budget Calculator
        </Link>{" "}
        to ensure you are allocating enough to savings while keeping tax-efficient contributions
        on track.
      </p>

      <h2>FAQ</h2>
      <p>
        <strong>What is the difference between effective and marginal tax rate?</strong> Your
        effective rate is total tax divided by gross income — your overall tax burden as a
        percentage. Your marginal rate is the bracket your last dollar of income falls into.
        Marginal rate matters for decisions about earning extra income or making additional
        pre-tax contributions.
      </p>
      <p>
        <strong>Does a raise push all my income into a higher bracket?</strong> No. Only income
        above the bracket threshold is taxed at the higher rate. A raise from $90,000 to $95,000
        does not retroactively tax your first $90,000 at a new rate.
      </p>
      <p>
        <strong>Are these estimates accurate for my actual tax return?</strong> This calculator
        provides federal income tax estimates only. It does not account for tax credits, alternative
        minimum tax, self-employment tax, capital gains, or state and local taxes. Use it for
        planning purposes and consult a tax professional for filing.
      </p>
      <p>
        <strong>Should I contribute to a Roth or traditional 401(k)?</strong> If you expect to be
        in a higher tax bracket in retirement, Roth contributions (taxed now, tax-free later) may
        be better. If you are in a high bracket now, traditional deferrals reduce today's tax
        bill. Our{" "}
        <Link
          href="/guides/401k-vs-roth-ira"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          401(k) vs Roth IRA guide
        </Link>{" "}
        walks through the decision in detail.
      </p>
      <p>
        <strong>Where do the 2026 brackets and standard deduction come from?</strong> They are
        the final inflation-adjusted figures in IRS Revenue Procedure 2025-32, which the IRS
        released in October 2025. The IRS normally publishes the next year's adjustments in
        October or November, and this page is updated when they are released (figures last
        checked {TAX_DATA.checkedOnLabel}).
      </p>
    </>
  );
}
