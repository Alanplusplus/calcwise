import Link from "next/link";

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
        The brackets below are 2026 estimates based on recent IRS inflation adjustments. Final
        numbers are typically announced in late fall each year. These apply to taxable income
        after deductions.
      </p>

      <h3>Single Filers</h3>
      <table>
        <thead>
          <tr>
            <th>Tax Rate</th>
            <th>Taxable Income Range</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>10%</td><td>$0 – $11,600</td></tr>
          <tr><td>12%</td><td>$11,601 – $47,150</td></tr>
          <tr><td>22%</td><td>$47,151 – $100,525</td></tr>
          <tr><td>24%</td><td>$100,526 – $191,950</td></tr>
          <tr><td>32%</td><td>$191,951 – $243,725</td></tr>
          <tr><td>35%</td><td>$243,726 – $609,350</td></tr>
          <tr><td>37%</td><td>$609,351 and above</td></tr>
        </tbody>
      </table>

      <h3>Married Filing Jointly</h3>
      <table>
        <thead>
          <tr>
            <th>Tax Rate</th>
            <th>Taxable Income Range</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>10%</td><td>$0 – $23,200</td></tr>
          <tr><td>12%</td><td>$23,201 – $94,300</td></tr>
          <tr><td>22%</td><td>$94,301 – $201,050</td></tr>
          <tr><td>24%</td><td>$201,051 – $383,900</td></tr>
          <tr><td>32%</td><td>$383,901 – $487,450</td></tr>
          <tr><td>35%</td><td>$487,451 – $1,218,700</td></tr>
          <tr><td>37%</td><td>$1,218,701 and above</td></tr>
        </tbody>
      </table>

      <h3>Head of Household</h3>
      <table>
        <thead>
          <tr>
            <th>Tax Rate</th>
            <th>Taxable Income Range</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>10%</td><td>$0 – $17,400</td></tr>
          <tr><td>12%</td><td>$17,401 – $65,700</td></tr>
          <tr><td>22%</td><td>$65,701 – $150,788</td></tr>
          <tr><td>24%</td><td>$150,789 – $287,925</td></tr>
          <tr><td>32%</td><td>$287,926 – $365,587</td></tr>
          <tr><td>35%</td><td>$365,588 – $914,025</td></tr>
          <tr><td>37%</td><td>$914,026 and above</td></tr>
        </tbody>
      </table>

      <p>
        Standard deductions for 2026 are estimated at $15,000 for single filers, $30,000 for
        married filing jointly, and $22,500 for head of household. These amounts reduce your
        taxable income before brackets are applied.
      </p>

      <h2>Standard vs Itemized Deductions</h2>
      <p>
        Every taxpayer chooses between taking the standard deduction or itemizing individual
        deductions on Schedule A. You should pick whichever method gives you the larger total
        deduction. The standard deduction is a fixed amount based on filing status — simple and
        available to everyone with no record-keeping required.
      </p>
      <p>
        Itemized deductions include mortgage interest, state and local taxes (SALT, capped at
        $10,000), charitable contributions, and certain medical expenses exceeding 7.5% of
        adjusted gross income. Itemizing makes sense when your total exceeds the standard
        deduction. For most taxpayers, especially those without a mortgage or large charitable
        gifts, the standard deduction is the better choice.
      </p>
      <p>
        Pre-tax retirement contributions like traditional 401(k) deferrals reduce your taxable
        income regardless of whether you itemize. A $23,000 401(k) contribution directly lowers
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
        <strong>Standard deduction scenario:</strong> Rachel takes the $15,000 standard deduction
        plus $6,000 in 401(k) contributions, reducing taxable income to $74,000. Her federal tax
        breaks down as follows: $1,160 at 10% (on the first $11,600), $4,246 at 12% (on
        $11,601–$47,150), and $5,907 at 22% (on $47,151–$74,000). Total federal tax: $11,313.
        Her effective rate is 11.9% and her marginal rate is 22%.
      </p>
      <p>
        <strong>Itemized deduction scenario:</strong> Rachel pays $8,400 in mortgage interest,
        $4,200 in state income tax, and donates $2,000 to charity — totaling $14,600 in itemized
        deductions. Combined with her $6,000 401(k) contribution, taxable income is $74,400.
        Because $14,600 is less than the $15,000 standard deduction, itemizing actually costs her
        money. She would owe roughly $130 more in tax by itemizing.
      </p>
      <p>
        Rachel&apos;s takeaway: the standard deduction wins, and increasing her 401(k) contribution
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
          <strong>401(k) and 403(b) contributions:</strong> Up to $23,500 in 2026 (plus $7,500
          catch-up if age 50+). Every dollar deferred avoids taxation at your marginal rate.
        </li>
        <li>
          <strong>Traditional IRA:</strong> Contribute up to $7,000 ($8,000 if 50+) and deduct if
          income limits allow. Ideal for those without employer plans or seeking additional
          deferrals.
        </li>
        <li>
          <strong>Health Savings Account (HSA):</strong> Triple tax advantage — deductible
          contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses.
          2026 limits are approximately $4,300 individual / $8,550 family.
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
        be better. If you are in a high bracket now, traditional deferrals reduce today&apos;s tax
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
        <strong>When are final 2026 tax brackets announced?</strong> The IRS typically publishes
        inflation-adjusted brackets and standard deduction amounts in October or November of the
        prior year. Update your planning once official numbers are released.
      </p>
    </>
  );
}
