import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import {
  ADDITIONAL_MEDICARE_THRESHOLDS,
  BUSINESS_MILEAGE_CENTS_2026,
  RETIREMENT_LIMITS,
  SOCIAL_SECURITY_WAGE_BASE,
  TAX_DATA,
  TAX_SOURCES,
  usd,
} from "@/lib/tax-data";

export function SelfEmploymentTaxArticle() {
  return (
    <>
      <Image
        src="/images/self-employment-tax-infographic.webp"
        alt="Self-employment tax breakdown showing 15.3% rate split into 12.4% Social Security and 2.9% Medicare with wage base cap and deductible half"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <h2>What Is Self-Employment Tax?</h2>
      <p>
        Self-employment tax is the Social Security and Medicare tax that freelancers,
        independent contractors, sole proprietors, and gig workers pay on their net business
        earnings. When you work for an employer, your employer pays half of the Social
        Security and Medicare taxes (FICA) and withholds the other half from your paycheck.
        When you are self-employed, you pay both halves -- the employee share and the
        employer share -- which totals 15.3% of your net self-employment earnings.
      </p>
      <p>
        The 15.3% rate breaks down into two components: 12.4% for Social Security (officially
        Old-Age, Survivors, and Disability Insurance) and 2.9% for Medicare (Hospital
        Insurance). The Social Security portion applies only up to the 2026 wage base of
        {usd(SOCIAL_SECURITY_WAGE_BASE)}, meaning earnings above that cap are exempt from the 12.4% tax. The Medicare
        portion has no cap -- it applies to every dollar of SE earnings. High earners also face
        an additional 0.9% Medicare surtax on earnings above {usd(ADDITIONAL_MEDICARE_THRESHOLDS.single)} for single filers or{" "}
        {usd(ADDITIONAL_MEDICARE_THRESHOLDS.mfj)} for married filing jointly. Use the calculator above to see your exact
        breakdown, or check your combined tax picture with our{" "}
        <Link
          href="/calculators/income-tax"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Income Tax Calculator
        </Link>.
      </p>

      <h2>How Self-Employment Tax Is Calculated</h2>
      <p>
        The calculation follows a specific sequence required by the IRS. First, determine
        your net self-employment earnings by subtracting all allowable business expenses from
        your gross income. This includes home office deductions, supplies, software
        subscriptions, professional development, vehicle expenses, health insurance premiums,
        and any other ordinary and necessary business costs.
      </p>
      <p>
        Second, multiply your net earnings by 92.35% (the factor 0.9235). This adjustment
        simulates the employer-equivalent deduction that W-2 workers receive. The logic: if
        you earned $100,000, the IRS considers $92,350 to be the earnings base for computing
        SE tax. Without this adjustment, self-employed workers would pay tax on the
        employer-share portion of FICA, which W-2 employees never do.
      </p>
      <p>
        Third, apply the 12.4% Social Security rate to the lesser of your adjusted earnings
        or the remaining wage base (after subtracting any W-2 wages already subject to Social
        Security). Then apply the 2.9% Medicare rate to your full adjusted earnings. Finally,
        add the 0.9% Additional Medicare Tax if applicable. The sum of these three components
        is your total self-employment tax.
      </p>

      <h2>Key Concepts Every Freelancer Should Know</h2>
      <p>
        <strong>The 92.35% adjustment:</strong> The IRS multiplies net SE earnings by 0.9235
        before computing tax. This reduces your taxable base by 7.65%, effectively giving you
        the same treatment as a W-2 employee whose employer pays half of FICA. On $100,000 in
        net earnings, this adjustment saves you about $1,175 in SE tax.
      </p>
      <p>
        <strong>The deductible half:</strong> After calculating your total SE tax, you can
        deduct exactly half of it (the employer-equivalent portion) as an above-the-line
        deduction on your Form 1040. This deduction reduces your adjusted gross income (AGI),
        which in turn lowers your income tax. For example, if your SE tax is $14,130, you
        deduct $7,065 from your AGI before computing income tax. This deduction is available
        even if you do not itemize.
      </p>
      <p>
        <strong>The Social Security wage base cap:</strong> The 12.4% Social Security tax
        applies only up to {usd(SOCIAL_SECURITY_WAGE_BASE)} in combined wages and SE earnings for 2026. Once your
        total earnings from all sources hit this ceiling, additional income is only subject to
        the 2.9% Medicare tax (plus the 0.9% surtax if applicable). If you have a W-2 job
        earning $100,000 and net freelance income of $100,000 ($92,350 after the 92.35%
        adjustment), only $84,500 ({usd(SOCIAL_SECURITY_WAGE_BASE)} - $100,000) of those adjusted earnings is
        subject to Social Security tax. The other $7,850 pays Medicare tax only.
      </p>
      <p>
        <strong>Quarterly estimated payments:</strong> Unlike W-2 employees whose taxes are
        withheld each pay period, self-employed individuals must make estimated tax payments
        four times per year. The IRS expects you to pay as you earn -- waiting until April 15
        to pay the full amount triggers underpayment penalties. Plan your cash flow using our{" "}
        <Link
          href="/calculators/budget-50-30-20"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          50/30/20 Budget Calculator
        </Link>{" "}
        to ensure you set aside enough each month.
      </p>

      <h2>Case Study: Priya, a Freelance UX Designer</h2>
      <p>
        Priya is a 29-year-old UX designer in Austin, Texas, who left her $95,000 salary
        job in January 2026 to freelance full-time. In her first year, she earns $130,000 in
        gross revenue from three long-term clients. Her deductible business expenses total
        $18,000, broken down as: $6,000 for a home office (rent allocation, utilities,
        internet), $4,500 for software and design tools (Figma, Adobe Creative Suite,
        prototyping tools), $3,000 for professional development (conferences, online courses),
        $2,500 for health insurance premiums, and $2,000 for business travel and miscellaneous
        supplies. This leaves her with net self-employment earnings of $112,000.
      </p>
      <p>
        Applying the 92.35% adjustment: $112,000 x 0.9235 = $103,432 in taxable SE earnings.
        Social Security tax: $103,432 x 12.4% = $12,826 (all under the {usd(SOCIAL_SECURITY_WAGE_BASE)} wage base).
        Medicare tax: $103,432 x 2.9% = $3,000. Total SE tax: $15,826. Her effective SE tax
        rate is $15,826 / $112,000 = 14.1%.
      </p>
      <p>
        Priya can deduct half of her SE tax ($7,913) as an above-the-line deduction, reducing
        her AGI from $112,000 to $104,087 before computing income tax. Her quarterly estimated
        SE tax payment is $15,826 / 4 = $3,957. Since she also owes income tax, her total
        quarterly payment (SE tax + estimated income tax) will be higher.
      </p>
      <p>
        Compare this to her old W-2 job: at a $95,000 salary, her employer paid 7.65%
        ($7,268) of FICA and withheld 7.65% ($7,268) from her paycheck. She only saw the
        employee half on her pay stub. As a freelancer earning $112,000, she pays $15,826 in
        SE tax -- more than double the $7,268 employee FICA she used to pay, but she also
        earns $17,000 more. Understanding this trade-off is critical. Use our{" "}
        <Link
          href="/calculators/paycheck"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Paycheck Calculator
        </Link>{" "}
        to compare your W-2 take-home pay against your freelance earnings after SE tax.
      </p>

      <h2>Self-Employment Tax vs W-2 Employee FICA: Side-by-Side Comparison</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Factor</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">W-2 Employee</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Self-Employed (1099)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">Social Security Rate</td>
              <td className="px-3 py-2 text-ink-800">6.2% (employee) + 6.2% (employer)</td>
              <td className="px-3 py-2 text-ink-800">12.4% (both halves)</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">Medicare Rate</td>
              <td className="px-3 py-2 text-ink-800">1.45% (employee) + 1.45% (employer)</td>
              <td className="px-3 py-2 text-ink-800">2.9% (both halves)</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">Total Rate</td>
              <td className="px-3 py-2 text-ink-800">7.65% visible + 7.65% employer</td>
              <td className="px-3 py-2 text-ink-800">15.3% (before 92.35% adjustment)</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">92.35% Adjustment</td>
              <td className="px-3 py-2 text-ink-800">Not applicable</td>
              <td className="px-3 py-2 text-ink-800">Applied to reduce taxable base</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">Employer-Half Deduction</td>
              <td className="px-3 py-2 text-ink-800">Employer pays directly (not deductible to you)</td>
              <td className="px-3 py-2 text-ink-800">Deduct 50% of SE tax on Form 1040</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">Withholding</td>
              <td className="px-3 py-2 text-ink-800">Automatic per paycheck</td>
              <td className="px-3 py-2 text-ink-800">Quarterly estimated payments (Form 1040-ES)</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">On $100K Net Earnings</td>
              <td className="px-3 py-2 text-green-700">$7,650 (employee share only)</td>
              <td className="px-3 py-2 text-red-600">$14,130 (full SE tax)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The table above makes one thing clear: self-employed workers pay roughly double the
        visible FICA tax of W-2 employees. However, the true economic cost is similar because
        W-2 employees indirectly bear the employer share through lower wages. Economists
        generally agree that the employer portion of FICA reduces the total compensation
        employers are willing to offer. The difference is visibility -- freelancers see the
        full 15.3% on their tax return, while employees only see 7.65% on their pay stubs.
      </p>

      <h2>Strategies to Reduce Self-Employment Tax</h2>
      <ul>
        <li>
          <strong>Maximize business deductions.</strong> Every legitimate business expense
          reduces your net SE income and therefore your SE tax. Track all deductible costs
          meticulously: home office, vehicle mileage ({BUSINESS_MILEAGE_CENTS_2026.janToJun} cents per mile for January through June 2026, raised to{" "}
          {BUSINESS_MILEAGE_CENTS_2026.julToDec} cents from July 1), equipment,
          software, professional services, business insurance, and continuing education. A
          $5,000 increase in deductions saves approximately $707 in SE tax.
        </li>
        <li>
          <strong>Consider an S-Corporation election.</strong> Once your net SE income exceeds
          approximately $60,000 to $80,000, electing S-Corp status through Form 2553 can
          save significant SE tax. As an S-Corp, you pay yourself a "reasonable salary" (subject
          to FICA) and take remaining profits as distributions (not subject to SE tax). On
          $120,000 in net income with a $70,000 salary, you save SE tax on $50,000 of
          distributions -- approximately $7,065 per year.
        </li>
        <li>
          <strong>Contribute to a Solo 401(k) or SEP-IRA.</strong> While retirement
          contributions do not directly reduce SE tax (they are calculated on net earnings
          before contributions), they reduce your income tax. A Solo 401(k) allows up to
          {usd(RETIREMENT_LIMITS.employeeDeferral)} in employee contributions in 2026 ({usd(RETIREMENT_LIMITS.catchUp50)} more if you are 50 or
          older) plus employer contributions of up to 25% of your plan compensation, which
          for a sole proprietor works out to about 20% of net SE earnings after the deductible
          half of SE tax. Read our{" "}
          <Link
            href="/guides/401k-vs-roth-ira"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            401(k) vs Roth IRA guide
          </Link>{" "}
          to choose the best retirement vehicle for your situation.
        </li>
        <li>
          <strong>Deduct health insurance premiums.</strong> Self-employed individuals can
          deduct 100% of health, dental, and long-term care insurance premiums for themselves
          and their family as an above-the-line deduction. This does not reduce SE tax
          directly, but it lowers your AGI and income tax.
        </li>
        <li>
          <strong>Time income and expenses strategically.</strong> If you are near the Social
          Security wage base ({usd(SOCIAL_SECURITY_WAGE_BASE)}), deferring income to next year or accelerating expenses
          into this year can shift earnings below the cap, reducing the 12.4% SS portion.
          Similarly, bunching expenses into high-income years maximizes their tax benefit.
        </li>
      </ul>

      <h2>SE Tax at Different Income Levels</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Net SE Income</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">SE Tax</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Effective Rate</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Deductible Half</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Quarterly Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$40,000</td>
              <td className="px-3 py-2 text-ink-800">$5,652</td>
              <td className="px-3 py-2 text-ink-800">14.1%</td>
              <td className="px-3 py-2 text-ink-800">$2,826</td>
              <td className="px-3 py-2 text-ink-800">$1,413</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$75,000</td>
              <td className="px-3 py-2 text-ink-800">$10,597</td>
              <td className="px-3 py-2 text-ink-800">14.1%</td>
              <td className="px-3 py-2 text-ink-800">$5,299</td>
              <td className="px-3 py-2 text-ink-800">$2,649</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$100,000</td>
              <td className="px-3 py-2 text-ink-800">$14,130</td>
              <td className="px-3 py-2 text-ink-800">14.1%</td>
              <td className="px-3 py-2 text-ink-800">$7,065</td>
              <td className="px-3 py-2 text-ink-800">$3,532</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$150,000</td>
              <td className="px-3 py-2 text-ink-800">$21,194</td>
              <td className="px-3 py-2 text-ink-800">14.1%</td>
              <td className="px-3 py-2 text-ink-800">$10,597</td>
              <td className="px-3 py-2 text-ink-800">$5,299</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$200,000</td>
              <td className="px-3 py-2 text-ink-800">$28,234</td>
              <td className="px-3 py-2 text-ink-800">14.1%</td>
              <td className="px-3 py-2 text-ink-800">$14,117</td>
              <td className="px-3 py-2 text-ink-800">$7,059</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$300,000</td>
              <td className="px-3 py-2 text-ink-800">$31,606</td>
              <td className="px-3 py-2 text-ink-800">10.5%</td>
              <td className="px-3 py-2 text-ink-800">$15,456</td>
              <td className="px-3 py-2 text-ink-800">$7,901</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The effective SE tax rate stays close to 14.1% for most income levels because the
        92.35% adjustment brings the effective rate down from 15.3%. At very high incomes
        above the {usd(SOCIAL_SECURITY_WAGE_BASE)} Social Security wage base, the rate drops because you stop paying
        the 12.4% SS portion on earnings above the cap. However, the 0.9% Additional Medicare
        Tax kicks in above $200,000, partially offsetting that reduction. At $300,000 of net
        income the Additional Medicare Tax adds $693 (0.9% of the $77,050 of SE earnings above
        $200,000), which is included in the SE tax shown but is not part of the deductible half.
        Understanding these thresholds helps you plan for the right amount in quarterly payments
        and avoid underpayment penalties.
      </p>
      <Sources
        items={[
          TAX_SOURCES.selfEmploymentTax,
          TAX_SOURCES.ssaWageBase,
          TAX_SOURCES.additionalMedicare,
          TAX_SOURCES.retirementLimits,
          TAX_SOURCES.soloK,
          TAX_SOURCES.mileage,
        ]}
        checked={TAX_DATA.checkedOnLabel}
        note="The table assumes single filing, no other W-2 wages, and no business losses."
      />

      <h2>Common Self-Employment Tax Mistakes</h2>
      <p>
        <strong>Forgetting quarterly payments:</strong> The most expensive mistake is not
        making estimated payments. The IRS charges both interest and a penalty on
        underpayments. Set up automatic transfers on the 1st of each quarter month to a
        dedicated tax savings account, then pay the IRS by the 15th.
      </p>
      <p>
        <strong>Not separating business and personal expenses:</strong> Mixing accounts makes
        it nearly impossible to track deductible expenses accurately. Open a separate business
        checking account and credit card. This single step typically increases deductions by
        15% to 20% because you stop missing legitimate write-offs buried in personal spending.
      </p>
      <p>
        <strong>Ignoring the deductible half:</strong> Many freelancers correctly compute
        their SE tax but forget to claim the above-the-line deduction for half of it. This
        deduction reduces your AGI and your income tax. On $14,130 of SE tax, the $7,065
        deduction at a 22% marginal rate saves $1,554 in income tax.
      </p>
      <p>
        <strong>Missing the S-Corp election window:</strong> If S-Corp status makes sense for
        your income level, you must file Form 2553 by March 15 for it to apply to the current
        tax year (or within 75 days of forming the LLC). Late elections are sometimes
        accepted with reasonable cause, but it is far easier to plan ahead. Track your
        financial trajectory with our{" "}
        <Link
          href="/guides/50-30-20-budget-rule"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          50/30/20 Budget Rule guide
        </Link>{" "}
        to determine when your income justifies the S-Corp conversion.
      </p>

      <h2>FAQ</h2>
      <p>
        <strong>What is self-employment tax?</strong>{" "}
        Self-employment tax is the combined Social Security (12.4%) and Medicare (2.9%)
        tax that self-employed individuals pay on their net business earnings. The total
        rate is 15.3% before the 92.35% earnings adjustment. It is reported on Schedule SE
        and paid with your annual tax return and quarterly estimated payments.
      </p>
      <p>
        <strong>How is self-employment tax calculated?</strong>{" "}
        Multiply net self-employment income by 92.35% to get taxable SE earnings. Apply
        12.4% for Social Security (capped at the {usd(SOCIAL_SECURITY_WAGE_BASE)} wage base) and 2.9% for Medicare
        (no cap). Add 0.9% Additional Medicare Tax on combined earnings above {usd(ADDITIONAL_MEDICARE_THRESHOLDS.single)}
        (single) or {usd(ADDITIONAL_MEDICARE_THRESHOLDS.mfj)} (married filing jointly). The total is your SE tax.
      </p>
      <p>
        <strong>Can I deduct self-employment tax?</strong>{" "}
        Yes, you can deduct the employer-equivalent half of your SE tax as an above-the-line
        deduction on Form 1040, Line 15. This reduces your adjusted gross income and lowers
        your income tax. You claim this deduction regardless of whether you itemize.
      </p>
      <p>
        <strong>Do I need to make quarterly estimated tax payments?</strong>{" "}
        Yes, if you expect to owe $1,000 or more in combined income and self-employment tax.
        Quarterly due dates are April 15, June 15, September 15, and January 15. Pay at least
        100% of last year's tax liability (110% if AGI exceeds $150,000) to avoid
        underpayment penalties.
      </p>
      <p>
        <strong>What qualifies as self-employment income?</strong>{" "}
        Net earnings from a sole proprietorship, freelance or contract work reported on
        1099-NEC, gig economy earnings (rideshare, delivery, etc.), partnership distributions,
        and any trade or business you operate for profit. W-2 wages, rental income (unless you
        are a real estate professional), and passive investment income do not count as SE income.
      </p>
    </>
  );
}
