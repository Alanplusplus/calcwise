import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET } from "@/lib/market-data";

export function DebtToIncomeArticle() {
  return (
    <>
      <figure className="my-8">
        <Image
          src="/images/debt-to-income-infographic.webp"
          alt="Infographic showing front-end and back-end debt-to-income ratio thresholds used by mortgage lenders, with a scale from excellent to high risk"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          Lenders use two DTI ratios — front-end (housing only) and back-end (all debt) — to evaluate your borrowing capacity.
        </figcaption>
      </figure>

      <h2>How to Use This Debt-to-Income Ratio Calculator</h2>
      <p>
        Enter your gross monthly income (before taxes) and all recurring monthly debt payments. The calculator instantly computes two critical ratios: your <strong>front-end DTI</strong> (housing costs divided by income) and your <strong>back-end DTI</strong> (total monthly debt divided by income). You will also see exactly where you stand against lender qualification thresholds for conventional, FHA, VA, and qualified mortgage programs.
      </p>
      <p>
        Every field updates in real time. Adjust any payment to see how paying off a credit card or reducing your housing costs changes your DTI. The lender threshold table shows whether you pass or exceed each program's limit, giving you a clear picture of which loans you currently qualify for.
      </p>

      <h2>What Is Debt-to-Income Ratio?</h2>
      <p>
        Your debt-to-income ratio (DTI) is the percentage of your gross monthly income that goes toward paying debts. Lenders use it as a primary measure of your ability to manage monthly payments and repay borrowed money. A lower DTI signals to lenders that you have a healthy balance between debt and income.
      </p>
      <p>
        There are two versions of DTI that lenders evaluate:
      </p>
      <ul>
        <li><strong>Front-End DTI (Housing Ratio)</strong> — Only your housing costs: mortgage or rent payment, property taxes, homeowners insurance, and HOA fees if applicable. Most conventional lenders want this at or below 28%.</li>
        <li><strong>Back-End DTI (Total Debt Ratio)</strong> — All recurring monthly obligations: housing costs plus car payments, student loans, credit card minimums, personal loans, child support, and alimony. Conventional guidelines often target 36% back-end; FHA manual underwriting uses 43% standard and up to 50% with compensating factors.</li>
      </ul>
      <p>
        The formula is straightforward: <strong>DTI = Total Monthly Debt Payments / Gross Monthly Income x 100</strong>. For example, if you earn $6,000/month and pay $2,400 in total debts, your back-end DTI is 40%.
      </p>

      <h2>DTI Thresholds by Loan Type</h2>
      <p>
        Different mortgage programs have different DTI limits. Here is what you need to know:
      </p>
      <table>
        <thead>
          <tr>
            <th>Loan Program</th>
            <th>Front-End Limit</th>
            <th>Back-End Limit</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Conventional</td>
            <td>28%</td>
            <td>36%</td>
            <td>Standard guideline; some lenders allow up to 45% with strong compensating factors</td>
          </tr>
          <tr>
            <td>FHA</td>
            <td>31%</td>
            <td>43%</td>
            <td>May go up to 50% with significant reserves and high credit score</td>
          </tr>
          <tr>
            <td>VA</td>
            <td>N/A</td>
            <td>41%</td>
            <td>No hard front-end limit; residual income test used instead</td>
          </tr>
          <tr>
            <td>USDA</td>
            <td>29%</td>
            <td>41%</td>
            <td>For eligible rural properties; income limits apply</td>
          </tr>
          <tr>
            <td>General Qualified Mortgage (QM)</td>
            <td>N/A</td>
            <td>No fixed DTI cap</td>
            <td>Since 2021, General QM uses a price-based test (APR vs. APOR), not a 43% DTI limit; lenders still must consider DTI or residual income</td>
          </tr>
        </tbody>
      </table>
      <Sources
        items={[
          {
            label: "CFPB — General QM final rule (Dec. 29, 2020; mandatory compliance 2021)",
            href: "https://www.federalregister.gov/documents/2020/12/29/2020-27567/qualified-mortgage-definition-under-the-truth-in-lending-act-regulation-z-general-qm-loan-definition",
          },
          {
            label: "HUD FHA Handbook 4000.1 Update 18 (Aug. 12, 2026)",
            href: "https://www.hud.gov/sites/default/files/Housing/documents/40001-hsgh-Update-18.pdf",
          },
        ]}
        checked="October 2026"
      />
      <p>
        These are guidelines, not guarantees. Automated underwriting (Fannie Mae Desktop Underwriter, FHA TOTAL Scorecard) may approve higher DTIs when credit, reserves, and loan structure are strong. Staying near 36% back-end keeps the widest conventional options. Use our{" "}
        <Link href="/calculators/home-affordability" className="text-brand-600 hover:text-brand-800 font-medium">
          Home Affordability Calculator
        </Link>{" "}
        to see the maximum home price your DTI supports.
      </p>

      <h2>Case Study: Jason and Priya Plan Their First Mortgage</h2>
      <p>
        Jason, a software engineer, earns $5,800/month gross. His wife Priya, a teacher, earns $4,200/month. Their combined gross income is $10,000/month. Here are their current monthly debt obligations:
      </p>
      <table>
        <thead>
          <tr>
            <th>Debt Category</th>
            <th>Monthly Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Car Payment (Jason)</td>
            <td>$450</td>
          </tr>
          <tr>
            <td>Student Loans (Priya)</td>
            <td>$380</td>
          </tr>
          <tr>
            <td>Credit Card Minimums</td>
            <td>$120</td>
          </tr>
          <tr>
            <td><strong>Total Non-Housing Debt</strong></td>
            <td><strong>$950</strong></td>
          </tr>
        </tbody>
      </table>
      <p>
        Their non-housing debt alone is $950/month, which means 9.5% of gross income is already committed before any housing costs. Under the conventional 36% back-end limit, they can allocate a maximum of $3,600/month to total debt. Subtracting existing debts: $3,600 - $950 = $2,650 maximum for housing (PITI).
      </p>
      <p>
        Under the 28% front-end rule, their maximum housing payment is $2,800/month. Since their back-end constraint ($2,650) is more restrictive, that becomes the binding limit. At the Freddie Mac PMMS 30-year average of {MORTGAGE_MARKET.thirtyYear.toFixed(2)}% ({MORTGAGE_MARKET.asOfLabel}), a $2,650 principal-and-interest payment on a 30-year loan supports roughly a $383,000 loan balance — about a $425,000 purchase with 10% down before taxes and insurance.
      </p>
      <p>
        Paying off the $120/month credit card minimums first raises their housing room to $2,770/month. Paying off Jason's $450 car note later adds another $450/month of capacity. Reducing fixed payments before you apply often increases buying power more than saving an equal dollar amount toward down payment.
      </p>

      <h2>DTI by Income Level: What You Can Afford</h2>
      <p>
        The following table shows maximum monthly debt capacity at different income levels, assuming standard lender thresholds:
      </p>
      <table>
        <thead>
          <tr>
            <th>Gross Monthly Income</th>
            <th>Max Housing (28%)</th>
            <th>Max Total Debt (36%)</th>
            <th>Max Total Debt (43%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$4,000</td>
            <td>$1,120</td>
            <td>$1,440</td>
            <td>$1,720</td>
          </tr>
          <tr>
            <td>$6,000</td>
            <td>$1,680</td>
            <td>$2,160</td>
            <td>$2,580</td>
          </tr>
          <tr>
            <td>$8,000</td>
            <td>$2,240</td>
            <td>$2,880</td>
            <td>$3,440</td>
          </tr>
          <tr>
            <td>$10,000</td>
            <td>$2,800</td>
            <td>$3,600</td>
            <td>$4,300</td>
          </tr>
          <tr>
            <td>$12,000</td>
            <td>$3,360</td>
            <td>$4,320</td>
            <td>$5,160</td>
          </tr>
          <tr>
            <td>$15,000</td>
            <td>$4,200</td>
            <td>$5,400</td>
            <td>$6,450</td>
          </tr>
        </tbody>
      </table>
      <p>
        Remember, the back-end limit includes all debt — not just housing. If you already have $800/month in car and student loan payments on a $6,000 income, your available housing budget at 36% drops from $2,160 to just $1,360. Use a{" "}
        <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">
          50/30/20 Budget Calculator
        </Link>{" "}
        to see how your debt payments fit into your overall spending plan.
      </p>

      <h2>How to Lower Your Debt-to-Income Ratio</h2>
      <p>
        If your DTI is too high, there are two fundamental strategies: reduce debt or increase income. Here are specific tactics:
      </p>
      <ul>
        <li><strong>Pay off high-minimum debts first</strong> — Target debts with the largest monthly payments to free up DTI capacity quickly. A $200/month credit card minimum eliminated has the same DTI impact as earning $556 more per month (at 36% threshold).</li>
        <li><strong>Consolidate debts at lower payments</strong> — Refinancing a 5-year auto loan to a 6-year term reduces the monthly payment, lowering your DTI. Be aware this increases total interest paid.</li>
        <li><strong>Avoid new debt before applying</strong> — Every new loan or credit card balance adds to your monthly obligations. Freeze all new borrowing 6-12 months before a mortgage application.</li>
        <li><strong>Increase provable income</strong> — Overtime, bonuses, and a second job count if you can document 2 years of consistent earnings. A side income of $500/month reduces a $6,000 earner's DTI from 40% to 36.9%.</li>
        <li><strong>Add a co-borrower</strong> — A spouse's income is combined with yours, increasing the denominator and lowering the ratio. However, their debts are also included.</li>
      </ul>
      <p>
        For a structured debt reduction plan, try our{" "}
        <Link href="/calculators/credit-card-payoff" className="text-brand-600 hover:text-brand-800 font-medium">
          Credit Card Payoff Calculator
        </Link>{" "}
        to see exactly when each balance will be eliminated and how much interest you will save.
      </p>

      <h2>Common Mistakes When Calculating DTI</h2>
      <ul>
        <li><strong>Using net income instead of gross</strong> — Lenders always use pre-tax income. Using take-home pay will make your DTI appear higher than what lenders see.</li>
        <li><strong>Forgetting recurring obligations</strong> — Child support, alimony, and court-ordered payments count. So do co-signed loans, even if someone else makes the payments.</li>
        <li><strong>Including non-debt expenses</strong> — Utilities, groceries, subscriptions, and gas are not debts. Only fixed monthly obligations that appear on your credit report (plus housing costs) count toward DTI.</li>
        <li><strong>Miscounting credit card payments</strong> — Lenders use your minimum payment due, not the full balance or the amount you actually pay. If your minimum is $35 but you pay $200, lenders count $35.</li>
        <li><strong>Ignoring deferred student loans</strong> — Even if your student loans are in deferment, many lenders still count 0.5% to 1% of the balance as a monthly obligation for DTI purposes.</li>
      </ul>

      <h2>DTI vs. Credit Score: Which Matters More?</h2>
      <p>
        Both matter, but they measure different things. Your credit score reflects how reliably you repay debts — it is a backward-looking indicator. Your DTI measures how much of your current income is committed to debt — it is a forward-looking measure of capacity. You can have a 780 credit score and still be denied a mortgage if your DTI is 55%.
      </p>
      <p>
        In practice, lenders use both together. A strong credit score (740+) can sometimes compensate for a DTI slightly above the standard threshold. For a complete picture of how your financial profile compares to guidelines, check our{" "}
        <Link href="/calculators/mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
          Mortgage Calculator
        </Link>{" "}
        to model your actual payment and see how it fits within your DTI limits. Also read our{" "}
        <Link href="/guides/how-much-house-can-i-afford" className="text-brand-600 hover:text-brand-800 font-medium">
          How Much House Can I Afford
        </Link>{" "}
        guide for income-based affordability tables that factor in DTI, down payment, and interest rates.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What is a good debt-to-income ratio?</h3>
      <p>
        A back-end DTI of 36% or lower aligns with common conventional guidelines. Below 20% is excellent. Between 36% and 43% can still qualify through FHA manual underwriting or strong automated approvals. Above 43% usually requires FHA compensating factors or non-QM products; General QM eligibility is not a fixed 43% DTI test since the 2021 price-based rule.
      </p>

      <h3>Does rent count as debt in the DTI calculation?</h3>
      <p>
        When you are applying for a mortgage, your current rent is replaced by the proposed mortgage payment (PITI) in the DTI calculation. Your rent does not appear on your credit report and is not counted as existing debt. However, if you will continue renting one property while paying a mortgage on another, both payments count.
      </p>

      <h3>How do I calculate my DTI if I am self-employed?</h3>
      <p>
        Self-employed borrowers typically use the average of the last two years of net income from tax returns (Schedule C, K-1, or 1120-S). Lenders may also require year-to-date profit and loss statements. The income figure used is often lower than what you actually earn because of business deductions, which can make your DTI appear higher than expected. Read our{" "}
        <Link href="/guides/rent-vs-buy-decision" className="text-brand-600 hover:text-brand-800 font-medium">
          Rent vs Buy guide
        </Link>{" "}
        for tips on how income documentation affects the buying decision.
      </p>

      <h3>Can I get a mortgage with a 50% DTI?</h3>
      <p>
        FHA manual underwriting may allow up to 50% back-end DTI with two compensating factors (for example strong reserves plus minimal payment shock). Automated FHA approvals sometimes exceed 43% when the full file is strong. General QM loans no longer use a 43% DTI cutoff — they use pricing tests — but lenders still evaluate whether you can repay. A 50% DTI leaves little cushion for taxes, utilities, and emergencies.
      </p>

      <h3>Do utility bills and subscriptions affect my DTI?</h3>
      <p>
        No. Utility bills, streaming subscriptions, groceries, gas, and other living expenses are not debts and do not count toward DTI. Only fixed monthly obligations that appear on your credit report — plus housing costs — are included. That said, these expenses affect your actual budget and ability to comfortably make payments, so they should still factor into your personal financial planning.
      </p>
    </>
  );
}
