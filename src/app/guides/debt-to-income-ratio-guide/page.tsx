import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { FaqJsonLd } from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "Debt-to-Income Ratio: What It Is and Why Lenders Care",
  description: "Understand what debt-to-income ratio is, how lenders use front-end and back-end DTI to evaluate your mortgage application, and actionable strategies to lower your ratio before applying.",
  openGraph: {
    title: `Debt-to-Income Ratio: What It Is and Why Lenders Care | ${site.name}`,
    description: "Understand what debt-to-income ratio is, how lenders use front-end and back-end DTI to evaluate your mortgage application, and actionable strategies to lower your ratio before applying.",
    type: "article",
  },
};

const faqs = [
  {
    question: "What is a good debt-to-income ratio for a mortgage?",
    answer: "A back-end debt-to-income ratio of 36% or lower is considered good by most conventional mortgage lenders, meaning no more than 36% of your gross monthly income goes toward total debt payments. A front-end DTI of 28% or less for housing costs alone is the standard guideline. Below 20% back-end DTI is excellent and gives you the best rates and most loan options. FHA loans may accept up to 43% back-end DTI, and in some cases up to 50% with strong compensating factors like a high credit score or large cash reserves.",
  },
  {
    question: "What debts are included in the DTI calculation?",
    answer: "Lenders include all recurring monthly obligations that appear on your credit report plus housing costs. This covers mortgage or rent payments, property taxes, homeowners insurance, car loan payments, student loan payments, credit card minimum payments, personal loans, child support, alimony, and co-signed loan obligations. Utilities, groceries, streaming subscriptions, gas, and insurance premiums other than homeowners are not included. For credit cards, lenders use the minimum payment due, not your full balance or the amount you actually pay each month.",
  },
  {
    question: "How do I calculate my debt-to-income ratio?",
    answer: "Divide your total monthly debt payments by your gross monthly income (before taxes) and multiply by 100 to get a percentage. For example, if you earn $7,000 per month gross and pay $2,100 in total monthly debts including housing, your DTI is $2,100 divided by $7,000 times 100, which equals 30%. Lenders calculate two versions: front-end DTI uses only housing costs, and back-end DTI uses all debt payments. Always use pre-tax income, not take-home pay.",
  },
  {
    question: "Can I get a mortgage with a 45% debt-to-income ratio?",
    answer: "It is difficult with conventional loans, which typically cap back-end DTI at 36% to 45% depending on compensating factors. FHA loans allow up to 43% as a standard guideline and may stretch to 50% if you have significant cash reserves, a credit score above 680, or a substantial down payment. Some non-QM lenders offer products for higher DTI borrowers at higher interest rates. A 45% DTI leaves minimal financial cushion, so most financial advisors recommend reducing debt before applying.",
  },
  {
    question: "Does my DTI affect my interest rate?",
    answer: "Yes, indirectly. While DTI is primarily a qualification metric rather than a direct pricing factor, a higher DTI signals greater risk to lenders. Borrowers with DTI ratios above 36% may face risk-based pricing adjustments that add 0.25% to 0.75% to their interest rate compared to borrowers with DTI below 30%. Additionally, a higher DTI limits your loan options to programs with less competitive rates. Reducing your DTI from 42% to 34% could save you $30,000 to $50,000 in interest over a 30-year mortgage.",
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <FaqJsonLd faqs={faqs} />

      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-brand-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Debt-to-Income Ratio</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
        Debt-to-Income Ratio: What It Is and Why Lenders Care
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: September 2026</p>

      <article className="prose mt-8">
        <p>
          Your <strong>debt-to-income ratio</strong> is the single most important number most
          borrowers have never calculated. Before a lender approves your mortgage, they divide your
          total monthly debt payments by your gross monthly income to determine whether you can
          realistically handle another obligation. A DTI of 35% means $35 of every $100 you earn
          is already committed to debt — and lenders have hard thresholds for how high that number
          can go before they decline your application. In 2026, with the median home price at
          $420,000 and average 30-year mortgage rates near 6.5%, understanding and optimizing your
          DTI is more critical than ever.
        </p>

        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">Quick Answer</p>
          <p className="mt-1 text-ink-700">
            Your debt-to-income ratio equals total monthly debt payments divided by gross monthly
            income. Most conventional lenders want a front-end DTI (housing only) at or below 28%
            and a back-end DTI (all debt) at or below 36%. FHA loans allow up to 43%, sometimes
            50% with compensating factors.
          </p>
        </div>

        <Image
          src="/images/guides/debt-to-income-ratio-guide.webp"
          alt="Infographic explaining front-end and back-end debt-to-income ratios with threshold scales from excellent to high risk, showing maximum housing and total debt amounts at different income levels"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />

        <h2>What Is Debt-to-Income Ratio and How Is It Calculated?</h2>

        <p>
          Debt-to-income ratio (DTI) measures the percentage of your gross monthly income that goes
          toward paying recurring debts. Lenders use it as a primary gauge of your ability to manage
          new monthly payments. The formula is simple: <strong>DTI = (Total Monthly Debt Payments /
          Gross Monthly Income) x 100</strong>. If you earn $8,000/month before taxes and pay $2,400
          in total debts, your back-end DTI is 30%.
        </p>

        <p>
          Lenders evaluate two distinct versions of DTI. The <strong>front-end ratio</strong> (also
          called the housing ratio) includes only housing-related costs: mortgage principal and
          interest, property taxes, homeowners insurance, and HOA dues. Conventional lenders
          typically want this at or below 28%. The <strong>back-end ratio</strong> includes housing
          costs plus all other recurring obligations: car payments, student loans, credit card
          minimums, personal loans, child support, and alimony. The standard threshold for
          conventional loans is 36%, though some lenders extend this to 43% or even 45% with
          strong compensating factors.
        </p>

        <p>
          The critical detail most borrowers miss: lenders use <strong>gross income</strong> (before
          taxes and deductions), not net take-home pay. A person earning $72,000 annually has a gross
          monthly income of $6,000, even if their paycheck after taxes, retirement contributions,
          and insurance premiums is only $4,200. This distinction means your DTI may be lower than
          you think if you have been mentally calculating with net pay. Use our{" "}
          <Link href="/calculators/debt-to-income" className="text-brand-600 hover:text-brand-800 font-medium">
            Debt-to-Income Ratio Calculator
          </Link>{" "}
          to see your exact front-end and back-end ratios instantly.
        </p>

        <h2>What Counts as Debt (and What Does Not)</h2>

        <p>
          Not every monthly expense counts toward DTI. Lenders include <strong>fixed monthly
          obligations</strong> that appear on your credit report, plus housing costs. Here is the
          full breakdown:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Included in DTI</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">NOT Included in DTI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Mortgage / Rent payment</td>
                <td className="px-4 py-3 text-ink-800">Groceries and food</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Property taxes and insurance</td>
                <td className="px-4 py-3 text-ink-800">Utility bills (electric, gas, water)</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Car loan payments</td>
                <td className="px-4 py-3 text-ink-800">Streaming subscriptions</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Student loan payments</td>
                <td className="px-4 py-3 text-ink-800">Cell phone bills</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Credit card minimum payments</td>
                <td className="px-4 py-3 text-ink-800">Gasoline and transportation</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Personal loan payments</td>
                <td className="px-4 py-3 text-ink-800">Health / auto / life insurance</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Child support / Alimony</td>
                <td className="px-4 py-3 text-ink-800">Gym memberships</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Co-signed loan obligations</td>
                <td className="px-4 py-3 text-ink-800">Daycare / tuition expenses</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Two common traps: <strong>credit card minimums</strong> are counted at the minimum payment
          due on your statement, not the full balance or the amount you actually pay. If your minimum
          is $35 but you pay $500/month, lenders count $35. Second, <strong>deferred student
          loans</strong> still count — most lenders impute 0.5% to 1% of the outstanding balance as
          a monthly obligation, even during deferment or forbearance. A $45,000 student loan balance
          in deferment adds $225 to $450/month to your DTI calculation.
        </p>

        <h2>DTI Thresholds by Loan Program</h2>

        <p>
          Different mortgage programs set different DTI limits. The table below shows the standard
          guidelines lenders follow in 2026:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Loan Program</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Front-End Max</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Back-End Max</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Exceptions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">Conventional</td>
                <td className="px-4 py-3 text-ink-800">28%</td>
                <td className="px-4 py-3 text-ink-800">36%</td>
                <td className="px-4 py-3 text-ink-800">Up to 45% with 740+ credit, 20%+ down payment</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">FHA</td>
                <td className="px-4 py-3 text-ink-800">31%</td>
                <td className="px-4 py-3 text-ink-800">43%</td>
                <td className="px-4 py-3 text-ink-800">Up to 50% with 680+ credit, 3+ months reserves</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">VA</td>
                <td className="px-4 py-3 text-ink-800">No limit</td>
                <td className="px-4 py-3 text-ink-800">41%</td>
                <td className="px-4 py-3 text-ink-800">Residual income test used; no hard front-end cap</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">USDA</td>
                <td className="px-4 py-3 text-ink-800">29%</td>
                <td className="px-4 py-3 text-ink-800">41%</td>
                <td className="px-4 py-3 text-ink-800">Eligible rural properties; income limits apply</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">Qualified Mortgage (QM)</td>
                <td className="px-4 py-3 text-ink-800">N/A</td>
                <td className="px-4 py-3 text-ink-800">43%</td>
                <td className="px-4 py-3 text-ink-800">Federal Dodd-Frank limit; exceeding loses QM safe harbor</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          These thresholds are guidelines, not absolute ceilings. Lenders can make exceptions when
          you have <strong>compensating factors</strong>: large cash reserves (6+ months of
          payments), excellent credit above 740, a substantial down payment (20%+), or stable
          employment history of 5+ years. However, staying within these ranges ensures you qualify
          for the most competitive rates and widest range of products. Check your{" "}
          <Link href="/calculators/mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
            Mortgage Calculator
          </Link>{" "}
          to model payments at different price points that keep you within your DTI limits.
        </p>

        <h2>Case Study: Adriana and Kevin Apply for Their First Home</h2>

        <p>
          Adriana, a 31-year-old registered nurse in Charlotte, NC, earns $5,500/month gross. Her
          fiance Kevin, a high school teacher, earns $4,000/month. Their combined gross monthly
          income is <strong>$9,500</strong>. They want to buy a home priced at $375,000 with 10%
          down ($37,500), financing $337,500 at 6.5% interest over 30 years.
        </p>

        <p>
          Their estimated monthly housing payment (PITI): $2,133 for principal and interest, $312 for
          property taxes, $125 for homeowners insurance, and $95 for PMI (since they are putting less
          than 20% down). Total housing cost: <strong>$2,665/month</strong>.
        </p>

        <p>
          Their existing monthly debts:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Debt</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Monthly Payment</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Adriana&apos;s car payment</td>
                <td className="px-4 py-3 text-ink-800">$385</td>
                <td className="px-4 py-3 text-ink-800">$14,200</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Kevin&apos;s student loans</td>
                <td className="px-4 py-3 text-ink-800">$290</td>
                <td className="px-4 py-3 text-ink-800">$28,000</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Credit card minimums (combined)</td>
                <td className="px-4 py-3 text-ink-800">$175</td>
                <td className="px-4 py-3 text-ink-800">$6,800</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">Total non-housing debt</td>
                <td className="px-4 py-3 font-medium text-ink-800">$850</td>
                <td className="px-4 py-3 text-ink-800"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong>Front-end DTI:</strong> $2,665 / $9,500 = <strong>28.1%</strong> — barely above
          the 28% conventional threshold but within FHA&apos;s 31% limit.
        </p>
        <p>
          <strong>Back-end DTI:</strong> ($2,665 + $850) / $9,500 = $3,515 / $9,500 ={" "}
          <strong>37.0%</strong> — above the conventional 36% limit but under the FHA 43% ceiling.
        </p>
        <p>
          With a conventional loan, Adriana and Kevin are over the standard 36% back-end threshold.
          Their lender offers approval at 37% DTI because both have credit scores above 720 and
          they have $18,000 in savings beyond the down payment (4.8 months of reserves). But their
          rate includes a 0.25% risk-based pricing adjustment compared to a borrower at 32% DTI,
          costing them an extra <strong>$17,100 over 30 years</strong>.
        </p>
        <p>
          If they pay off the $6,800 credit card balance before applying — eliminating $175/month —
          their back-end DTI drops to <strong>35.2%</strong>, qualifying them for the standard rate
          tier and saving that $17,100. The $6,800 payoff generates a <strong>2.5x return</strong>
          in avoided interest. This is why reducing small debts before a mortgage application can
          have an outsized financial impact. Use our{" "}
          <Link href="/calculators/home-affordability" className="text-brand-600 hover:text-brand-800 font-medium">
            Home Affordability Calculator
          </Link>{" "}
          to see exactly how debt reduction changes your maximum qualifying home price.
        </p>

        <h2>Maximum Debt Capacity by Income Level</h2>

        <p>
          The following table shows how much monthly debt you can carry at each DTI threshold for
          different gross income levels. These numbers represent total capacity — subtract your
          existing non-housing debts to find your available housing budget:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Gross Monthly Income</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Max Housing at 28%</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Max Total Debt at 36%</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Max Total Debt at 43%</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Max Total Debt at 50%</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$4,000</td>
                <td className="px-4 py-3 text-ink-800">$1,120</td>
                <td className="px-4 py-3 text-ink-800">$1,440</td>
                <td className="px-4 py-3 text-ink-800">$1,720</td>
                <td className="px-4 py-3 text-ink-800">$2,000</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$6,000</td>
                <td className="px-4 py-3 text-ink-800">$1,680</td>
                <td className="px-4 py-3 text-ink-800">$2,160</td>
                <td className="px-4 py-3 text-ink-800">$2,580</td>
                <td className="px-4 py-3 text-ink-800">$3,000</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$8,000</td>
                <td className="px-4 py-3 text-ink-800">$2,240</td>
                <td className="px-4 py-3 text-ink-800">$2,880</td>
                <td className="px-4 py-3 text-ink-800">$3,440</td>
                <td className="px-4 py-3 text-ink-800">$4,000</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$10,000</td>
                <td className="px-4 py-3 text-ink-800">$2,800</td>
                <td className="px-4 py-3 text-ink-800">$3,600</td>
                <td className="px-4 py-3 text-ink-800">$4,300</td>
                <td className="px-4 py-3 text-ink-800">$5,000</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$12,500</td>
                <td className="px-4 py-3 text-ink-800">$3,500</td>
                <td className="px-4 py-3 text-ink-800">$4,500</td>
                <td className="px-4 py-3 text-ink-800">$5,375</td>
                <td className="px-4 py-3 text-ink-800">$6,250</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$15,000</td>
                <td className="px-4 py-3 text-ink-800">$4,200</td>
                <td className="px-4 py-3 text-ink-800">$5,400</td>
                <td className="px-4 py-3 text-ink-800">$6,450</td>
                <td className="px-4 py-3 text-ink-800">$7,500</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The gap between 36% and 43% widens at higher incomes. At $10,000/month, that 7-percentage-point
          spread represents $700/month in additional debt capacity — enough to cover a car payment
          and student loans. However, stretching to 43% leaves far less cushion for emergencies,
          lifestyle expenses, and retirement savings. Financial advisors generally recommend keeping
          back-end DTI below 35% for long-term financial health, even if lenders will approve
          higher. See how your budget breaks down with our{" "}
          <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">
            50/30/20 Budget Calculator
          </Link>{" "}
          to understand whether stretching your DTI leaves enough for savings and discretionary
          spending.
        </p>

        <h2>6 Strategies to Lower Your DTI Before a Mortgage Application</h2>

        <p>
          <strong>1. Pay off high-minimum debts first.</strong> Target debts with the largest monthly
          payments relative to their balance. Paying off a $3,500 credit card with a $150/month
          minimum has the same DTI impact as earning $417 more per month (at 36% threshold). A
          $400/month car payment with 8 months remaining can be eliminated for $3,200, freeing
          significant DTI capacity. Prioritize by monthly payment size, not by interest rate or
          balance, when your immediate goal is mortgage qualification.
        </p>

        <p>
          <strong>2. Increase your documented income.</strong> Overtime, bonuses, commissions, and
          side income count if you can demonstrate 2 years of consistent earning history. A
          documented side income of $600/month increases your gross income from $6,000 to $6,600,
          dropping a 38% DTI to 34.5%. Ask your employer about overtime opportunities 12 to 24
          months before you plan to apply. For freelance income, ensure it appears on your last
          two tax returns.
        </p>

        <p>
          <strong>3. Avoid new debt in the 6-12 months before applying.</strong> Every new loan or
          credit card balance adds to your monthly obligations. Do not finance furniture, a new car,
          or make large purchases on credit. Even a $5,000 personal loan at $150/month can push you
          from 35% to 37.5% DTI on a $6,000 income.
        </p>

        <p>
          <strong>4. Consolidate debts to lower monthly payments.</strong> Refinancing a car loan
          from a 4-year term to a 6-year term reduces the monthly payment, though it increases total
          interest. If the priority is qualifying for a mortgage, the reduced monthly payment may
          be worth the trade-off. A $20,000 auto loan at 6.5% drops from $475/month (4-year) to
          $337/month (6-year), freeing $138/month in DTI.
        </p>

        <p>
          <strong>5. Add a co-borrower.</strong> A spouse or partner&apos;s income increases the
          denominator in the DTI formula. A couple earning $4,500 and $5,500 individually has DTI
          calculated on $10,000 combined, giving them substantially more borrowing power than either
          person alone. However, the co-borrower&apos;s debts are also included, so this strategy
          works best when the co-borrower has minimal existing obligations.
        </p>

        <p>
          <strong>6. Request a credit card minimum payment reduction.</strong> Some credit card
          issuers will lower your minimum payment if you have a strong payment history. Reducing a
          minimum from $200 to $125 on a $6,000 balance saves $75/month in DTI — a small change
          that can be the difference between approval and denial. This does not affect your balance
          or interest rate.
        </p>

        <h2>DTI vs. Credit Score: How Lenders Weigh Each Factor</h2>

        <p>
          Both DTI and credit score are critical, but they measure fundamentally different things.
          Your <strong>credit score</strong> is backward-looking — it reflects how reliably you
          have repaid debts in the past based on payment history, utilization, length of credit
          history, and credit mix. Your <strong>DTI</strong> is forward-looking — it measures how
          much of your current income is committed to debt, indicating your capacity to take on
          more.
        </p>

        <p>
          You can have a 780 credit score and be denied a mortgage if your DTI is 55%. Conversely,
          a borrower with a 680 credit score and 25% DTI may qualify more easily than someone with
          750 credit and 44% DTI. In practice, lenders use both together in a matrix: strong credit
          can compensate for slightly elevated DTI (up to 3-5 percentage points above standard
          thresholds), and low DTI can partially offset a lower credit score.
        </p>

        <p>
          The most competitive mortgage terms go to borrowers with <strong>both</strong> a credit
          score above 740 and a back-end DTI below 36%. This combination qualifies you for the
          best rates, lowest PMI premiums, and widest selection of loan products. Use our{" "}
          <Link href="/calculators/mortgage" className="text-brand-600 hover:text-brand-800 font-medium">
            Mortgage Calculator
          </Link>{" "}
          to model the rate you are likely to receive at different DTI levels and see the total
          cost difference over your loan term.
        </p>

        <h2>Common DTI Calculation Mistakes to Avoid</h2>

        <ul>
          <li>
            <strong>Using net income instead of gross</strong> — Lenders always calculate with
            pre-tax income. Using take-home pay inflates your apparent DTI. An $85,000 annual
            salary is $7,083/month gross, not the $5,200 that may hit your bank account after
            taxes, 401(k), and insurance.
          </li>
          <li>
            <strong>Forgetting co-signed loans</strong> — If you co-signed a family member&apos;s
            car loan or student loan, that payment appears on your credit report and counts toward
            your DTI, even if the other person makes every payment. The only way to remove it is
            to refinance the loan in the other person&apos;s name alone.
          </li>
          <li>
            <strong>Ignoring deferred student loans</strong> — Many borrowers assume deferred
            loans do not count. Most lenders impute 0.5% to 1% of the loan balance as a monthly
            payment. A $50,000 deferred student loan adds $250 to $500/month to your DTI.
          </li>
          <li>
            <strong>Counting non-debt expenses</strong> — Utilities, groceries, subscriptions,
            gas, and childcare are not debts. Only fixed monthly obligations that appear on your
            credit report (plus proposed housing costs) count toward DTI.
          </li>
          <li>
            <strong>Using the wrong credit card number</strong> — Lenders use the minimum payment
            due from your credit report, not your full balance or what you actually pay. Check
            your credit report to see the reported minimum.
          </li>
        </ul>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Check Your Debt-to-Income Ratio</p>
          <p className="mt-1 text-sm text-ink-600">Use our free calculator to see your front-end and back-end DTI, lender qualification thresholds, and how much room you have to borrow.</p>
          <Link href="/calculators/debt-to-income" className="mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
            Open Debt-to-Income Calculator
          </Link>
        </div>

        <h2>Frequently Asked Questions</h2>

        <h3>What is a good debt-to-income ratio for a mortgage?</h3>
        <p>
          A back-end debt-to-income ratio of 36% or lower is considered good by most conventional
          mortgage lenders, meaning no more than 36% of your gross monthly income goes toward total
          debt payments. A front-end DTI of 28% or less for housing costs alone is the standard
          guideline. Below 20% back-end DTI is excellent and gives you the best rates and most loan
          options. FHA loans may accept up to 43% back-end DTI, and in some cases up to 50% with
          strong compensating factors like a high credit score or large cash reserves.
        </p>

        <h3>What debts are included in the DTI calculation?</h3>
        <p>
          Lenders include all recurring monthly obligations that appear on your credit report plus
          housing costs. This covers mortgage or rent payments, property taxes, homeowners insurance,
          car loan payments, student loan payments, credit card minimum payments, personal loans,
          child support, alimony, and co-signed loan obligations. Utilities, groceries, streaming
          subscriptions, gas, and insurance premiums other than homeowners are not included. For
          credit cards, lenders use the minimum payment due, not your full balance or the amount
          you actually pay each month.
        </p>

        <h3>How do I calculate my debt-to-income ratio?</h3>
        <p>
          Divide your total monthly debt payments by your gross monthly income (before taxes) and
          multiply by 100 to get a percentage. For example, if you earn $7,000 per month gross and
          pay $2,100 in total monthly debts including housing, your DTI is $2,100 divided by $7,000
          times 100, which equals 30%. Lenders calculate two versions: front-end DTI uses only
          housing costs, and back-end DTI uses all debt payments. Always use pre-tax income, not
          take-home pay.
        </p>

        <h3>Can I get a mortgage with a 45% debt-to-income ratio?</h3>
        <p>
          It is difficult with conventional loans, which typically cap back-end DTI at 36% to 45%
          depending on compensating factors. FHA loans allow up to 43% as a standard guideline and
          may stretch to 50% if you have significant cash reserves, a credit score above 680, or a
          substantial down payment. Some non-QM lenders offer products for higher DTI borrowers at
          higher interest rates. A 45% DTI leaves minimal financial cushion, so most financial
          advisors recommend reducing debt before applying.
        </p>

        <h3>Does my DTI affect my interest rate?</h3>
        <p>
          Yes, indirectly. While DTI is primarily a qualification metric rather than a direct pricing
          factor, a higher DTI signals greater risk to lenders. Borrowers with DTI ratios above 36%
          may face risk-based pricing adjustments that add 0.25% to 0.75% to their interest rate
          compared to borrowers with DTI below 30%. Additionally, a higher DTI limits your loan
          options to programs with less competitive rates. Reducing your DTI from 42% to 34% could
          save you $30,000 to $50,000 in interest over a 30-year mortgage.
        </p>
      </article>
    </div>
  );
}
