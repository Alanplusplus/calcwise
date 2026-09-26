import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Self-Employment Tax Explained: What Freelancers and 1099 Workers Must Know",
  description: "Learn how self employment tax works in 2026: the 15.3% rate, Social Security wage base, deductible half, quarterly payments, and strategies to reduce what freelancers owe.",
  openGraph: {
    title: `Self-Employment Tax Explained: What Freelancers and 1099 Workers Must Know | ${site.name}`,
    description: "Learn how self employment tax works in 2026: the 15.3% rate, Social Security wage base, deductible half, quarterly payments, and strategies to reduce what freelancers owe.",
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the self-employment tax rate for 2026?",
    answer: "The combined self-employment tax rate for 2026 is 15.3%, split into 12.4% for Social Security and 2.9% for Medicare. Social Security tax applies only to the first $168,600 of net earnings from self-employment. Medicare tax applies to all net earnings with no cap. An additional 0.9% Medicare surtax applies when combined wages and self-employment income exceed $200,000 for single filers or $250,000 for married filing jointly. The IRS taxes 92.35% of your net Schedule C profit, not the full amount.",
  },
  {
    question: "Do I have to pay self-employment tax on side income?",
    answer: "Yes, if your net self-employment earnings exceed $400 in a tax year, you must file Schedule SE and pay self-employment tax on that income. Side income from freelancing, consulting, gig work, or 1099-NEC forms counts even if you also have a W-2 job. If you earn $8,000 from weekend photography on top of a $70,000 salary, you owe SE tax on the $8,000 net profit. Your W-2 employer already withholds Social Security and Medicare on your salary, but the side income requires separate SE tax payments.",
  },
  {
    question: "How do I lower my self-employment tax?",
    answer: "You cannot eliminate self-employment tax entirely on legitimate business income, but several strategies reduce the taxable base. Maximize business deductions on Schedule C to lower net profit. Contribute to a Solo 401(k) or SEP-IRA, which reduce net self-employment income. Deduct health insurance premiums above the line if you are not eligible for employer coverage. Consider S-Corp election once net profit consistently exceeds $60,000 to pay yourself a reasonable W-2 salary and take remaining profit as distributions exempt from SE tax. Claim the Qualified Business Income deduction for up to 20% of qualified business income.",
  },
  {
    question: "When are quarterly estimated tax payments due?",
    answer: "Quarterly estimated tax payments for 2026 are due April 15, June 16, September 15, and January 15, 2027. Each payment should cover at least 25% of your expected annual federal tax liability, including both self-employment tax and income tax. If you expect to owe $24,000 total for the year, each quarterly payment should be roughly $6,000. Missing a deadline triggers an underpayment penalty calculated on the shortfall, currently around 7% annual interest. Use Form 1040-ES vouchers or pay electronically at IRS.gov.",
  },
  {
    question: "What is the difference between self-employment tax and income tax?",
    answer: "Self-employment tax funds Social Security and Medicare programs and is calculated at a flat 15.3% on net self-employment earnings (after the 92.35% adjustment). Income tax is a separate federal obligation calculated on your total taxable income using progressive brackets from 10% to 37%. A freelancer earning $95,000 net might owe $13,423 in SE tax plus approximately $11,094 in federal income tax. SE tax is reported on Schedule SE; income tax is calculated on Form 1040. Both amounts are combined when determining quarterly estimated payments.",
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Self-Employment Tax Explained: What Freelancers and 1099 Workers Must Know"
        description="Learn how self employment tax works in 2026: the 15.3% rate, Social Security wage base, deductible half, quarterly payments, and strategies to reduce what freelancers owe."
        slug="self-employment-tax-guide"
        datePublished="2026-09-19"
        dateModified="2026-09-19"
        image="/images/guides/self-employment-tax-guide.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Self-Employment Tax", href: "/guides/self-employment-tax-guide" },
        ]}
      />

      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-brand-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Self-Employment Tax</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
        Self-Employment Tax Explained: What Freelancers and 1099 Workers Must Know
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: September 2026</p>

      <article className="prose mt-8">
        <p>
          If you earn income as a freelancer, consultant, gig worker, or independent contractor, you
          owe <strong>self employment tax</strong> on top of regular federal income tax. Unlike W-2
          employees who split Social Security and Medicare taxes with their employer, self-employed
          workers pay the full 15.3% themselves. On $80,000 in net profit, that means roughly $11,304
          in SE tax before you even calculate income tax. Understanding how this tax is calculated,
          when it is due, and what you can deduct is essential for every 1099 worker who wants to
          avoid surprise tax bills and IRS penalties.
        </p>

        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">Quick Answer</p>
          <p className="mt-1 text-ink-700">
            Self-employment tax is 15.3% of your net business profit (12.4% Social Security + 2.9%
            Medicare), applied to 92.35% of your Schedule C net income. You can deduct half of the
            SE tax on your income tax return, and you must make quarterly estimated payments if you
            expect to owe $1,000 or more in total federal tax.
          </p>
        </div>

        <Image
          src="/images/guides/self-employment-tax-guide.webp"
          alt="Infographic showing how self-employment tax is calculated for freelancers, including Social Security and Medicare rates and the deductible half"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />

        <h2>How Self-Employment Tax Works in 2026</h2>

        <p>
          When you work for an employer, you pay 7.65% in FICA taxes (6.2% Social Security + 1.45%
          Medicare) and your employer matches that amount. Self-employed workers must pay both halves,
          which is why the <strong>self employment tax rate</strong> totals 15.3%. This tax is
          separate from your federal income tax and is calculated on Schedule SE when you file your
          return.
        </p>

        <p>
          The IRS does not apply the 15.3% rate to your entire net profit. Instead, it multiplies your
          Schedule C net income by 92.35% to arrive at &quot;net earnings from self-employment.&quot;
          This adjustment accounts for the fact that W-2 employees do not pay FICA on the employer&apos;s
          half. If your net profit is $100,000, your net earnings subject to SE tax are $92,350
          ($100,000 × 0.9235). Your SE tax: $92,350 × 15.3% = <strong>$14,130</strong>.
        </p>

        <p>
          The 15.3% breaks into two components with different rules. The <strong>Social Security
          portion (12.4%)</strong> applies only to net earnings up to the wage base of{" "}
          <strong>$168,600</strong> in 2026. Earnings above that threshold are exempt from the Social
          Security tax but still subject to Medicare. The <strong>Medicare portion (2.9%)</strong> has
          no income cap. High earners with combined wages and self-employment income above $200,000
          (single) or $250,000 (married filing jointly) also owe an additional 0.9% Medicare surtax.
        </p>

        <p>
          One important relief: you can deduct <strong>half of your self-employment tax</strong> as an
          above-the-line deduction on Form 1040. On $14,130 in SE tax, you deduct $7,065, which
          reduces your adjusted gross income and lowers your income tax bill. This deduction does not
          reduce your SE tax itself — it only affects income tax.
        </p>

        <p>
          Because no employer withholds taxes from your 1099 payments, the IRS expects you to make{" "}
          <strong>quarterly estimated tax payments</strong> if you expect to owe $1,000 or more in
          total federal tax for the year. The four due dates for 2026 are April 15, June 16, September
          15, and January 15, 2027. Each payment should cover roughly one-quarter of your expected
          annual SE tax plus income tax. Missing deadlines triggers underpayment penalties. Use our{" "}
          <Link href="/calculators/self-employment-tax" className="text-brand-600 hover:text-brand-800 font-medium">
            Self-Employment Tax Calculator
          </Link>{" "}
          to estimate your total liability and quarterly amounts before the next deadline.
        </p>

        <h2>Case Study: Marcus, a Freelance Web Developer in Denver</h2>

        <p>
          Marcus is a 34-year-old freelance web developer in Denver. He left a $95,000 W-2 job in 2024
          and now runs his own LLC, billing clients directly. In 2026, his Schedule C shows{" "}
          <strong>$125,000 in gross receipts</strong> from 14 client projects. After subtracting
          business expenses — $6,200 for software subscriptions, $4,800 for a home office deduction,
          $3,500 for a new laptop and monitor, $8,400 in health insurance premiums, $4,600 for
          professional development and conferences, and $2,500 in travel — his{" "}
          <strong>net self-employment income is $95,000</strong>.
        </p>

        <p>
          Marcus calculates his SE tax using the standard formula. Net earnings from self-employment:
          $95,000 × 92.35% = <strong>$87,732.50</strong>. Self-employment tax: $87,732.50 × 15.3% ={" "}
          <strong>$13,423</strong>. Because his net earnings are well below the $168,600 Social
          Security wage base, the full 12.4% Social Security rate applies to all $87,732.50, plus
          2.9% Medicare on the same amount.
        </p>

        <p>
          Marcus deducts half of his SE tax — <strong>$6,712</strong> — on Form 1040, reducing his
          adjusted gross income to $88,288. After the $15,750 standard deduction (single filer), his
          taxable income is $73,538. Using 2026 federal brackets, his income tax is approximately{" "}
          <strong>$11,094</strong>. Combined federal tax burden: $13,423 (SE tax) + $11,094 (income
          tax) = <strong>$24,517</strong>.
        </p>

        <p>
          Marcus makes quarterly estimated payments of <strong>$6,129</strong> ($24,517 ÷ 4) on April
          15, June 16, September 15, and January 15. His effective total tax rate on $95,000 net
          profit is <strong>25.8%</strong> ($24,517 ÷ $95,000). Colorado adds a flat 4.4% state
          income tax on his taxable income, roughly $3,236 more. After all taxes, Marcus keeps about
          $67,247 — which is why he tracks every deductible expense and contributes $22,500 to a
          Solo 401(k) to reduce next year&apos;s bill.
        </p>

        <p>
          Compare this to his old W-2 job: on $95,000 salary, his employer paid half his FICA ($7,259),
          and his share was $7,259. As a freelancer on the same net income, Marcus pays nearly double
          the FICA portion — the defining cost of self-employment. Planning for that difference with a{" "}
          <Link href="/calculators/budget-50-30-20" className="text-brand-600 hover:text-brand-800 font-medium">
            50/30/20 Budget Calculator
          </Link>{" "}
          helps Marcus set aside 25% to 30% of every client payment for taxes before spending on
          personal expenses.
        </p>

        <h2>Self-Employment Tax at Different Income Levels</h2>

        <p>
          The table below shows estimated self-employment tax for six net profit levels in 2026,
          assuming all income comes from self-employment with no W-2 wages. Calculations use the
          92.35% net earnings adjustment and the 15.3% combined rate, with the Social Security cap
          applied at $168,600 for the highest tier.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Net Profit</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Net Earnings (92.35%)</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">SE Tax (15.3%)</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Deductible Half</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Effective SE Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$40,000</td>
                <td className="px-4 py-3 text-ink-800">$36,940</td>
                <td className="px-4 py-3 text-ink-800">$5,652</td>
                <td className="px-4 py-3 text-ink-800">$2,826</td>
                <td className="px-4 py-3 text-ink-800">14.1%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$60,000</td>
                <td className="px-4 py-3 text-ink-800">$55,410</td>
                <td className="px-4 py-3 text-ink-800">$8,478</td>
                <td className="px-4 py-3 text-ink-800">$4,239</td>
                <td className="px-4 py-3 text-ink-800">14.1%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$80,000</td>
                <td className="px-4 py-3 text-ink-800">$73,880</td>
                <td className="px-4 py-3 text-ink-800">$11,304</td>
                <td className="px-4 py-3 text-ink-800">$5,652</td>
                <td className="px-4 py-3 text-ink-800">14.1%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$100,000</td>
                <td className="px-4 py-3 text-ink-800">$92,350</td>
                <td className="px-4 py-3 text-ink-800">$14,130</td>
                <td className="px-4 py-3 text-ink-800">$7,065</td>
                <td className="px-4 py-3 text-ink-800">14.1%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$120,000</td>
                <td className="px-4 py-3 text-ink-800">$110,820</td>
                <td className="px-4 py-3 text-ink-800">$16,955</td>
                <td className="px-4 py-3 text-ink-800">$8,478</td>
                <td className="px-4 py-3 text-ink-800">14.1%</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$200,000+</td>
                <td className="px-4 py-3 text-ink-800">$184,700</td>
                <td className="px-4 py-3 text-ink-800">$26,263</td>
                <td className="px-4 py-3 text-ink-800">$13,132</td>
                <td className="px-4 py-3 text-ink-800">13.1%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Notice the effective SE rate drops above the Social Security wage base. At $200,000 net profit,
          only $168,600 of net earnings ($184,700 total) is subject to the 12.4% Social Security rate.
          The remaining $16,100 in net earnings pays only the 2.9% Medicare tax, plus the 0.9% surtax
          if total income exceeds $200,000. Income tax is calculated separately on top of these amounts
          — use the{" "}
          <Link href="/calculators/income-tax" className="text-brand-600 hover:text-brand-800 font-medium">
            Income Tax Calculator
          </Link>{" "}
          to see your combined federal liability at any income level.
        </p>

        <h2>5 Steps to Reduce Your Self-Employment Tax</h2>

        <p>
          <strong>1. Maximize legitimate business deductions.</strong> Every dollar you deduct on
          Schedule C reduces your net profit and therefore your SE tax. Track home office expenses,
          mileage ($0.70 per mile in 2026), software, equipment, professional memberships, and client
          meals (50% deductible). A freelancer who increases deductions from $15,000 to $25,000 on
          $100,000 gross income saves $1,413 in SE tax ($10,000 × 92.35% × 15.3%).
        </p>

        <p>
          <strong>2. Contribute to a Solo 401(k) or SEP-IRA.</strong> Retirement contributions reduce
          net self-employment income before SE tax is calculated. A Solo 401(k) allows up to $23,500
          in employee deferrals plus 25% of net self-employment income as employer contributions (capped
          at $70,000 total for 2026). Marcus contributing $22,500 lowers his net profit from $95,000 to
          $72,500, saving approximately $3,178 in SE tax. See our{" "}
          <Link href="/guides/401k-vs-roth-ira" className="text-brand-600 hover:text-brand-800 font-medium">
            401(k) vs Roth IRA guide
          </Link>{" "}
          for help choosing the right retirement account structure.
        </p>

        <p>
          <strong>3. Deduct health insurance premiums.</strong> Self-employed workers who are not
          eligible for employer-sponsored coverage can deduct health, dental, and qualified long-term
          care premiums above the line on Form 1040. Marcus deducts $8,400 in premiums on Schedule C,
          which reduces both SE tax and income tax. This deduction is unavailable if you could enroll
          in a spouse&apos;s employer plan.
        </p>

        <p>
          <strong>4. Consider S-Corp election at higher income levels.</strong> Once net profit
          consistently exceeds $60,000 to $80,000, forming an S-Corp and paying yourself a reasonable
          W-2 salary while taking remaining profit as distributions can significantly reduce SE tax.
          Only the salary portion is subject to FICA; distributions are not. A consultant earning
          $150,000 net who pays herself a $70,000 salary and takes $80,000 in distributions saves
          roughly $11,304 in SE tax on the distribution portion. S-Corp compliance costs ($2,000 to
          $4,000 annually for payroll and filing) must be weighed against the savings.
        </p>

        <p>
          <strong>5. Claim the Qualified Business Income (QBI) deduction.</strong> Most self-employed
          taxpayers can deduct up to 20% of qualified business income on Form 8995, subject to income
          limits ($191,950 for single filers in 2026). On $95,000 net profit, the QBI deduction could
          reduce taxable income by $19,000, saving approximately $3,800 in income tax. The QBI
          deduction does not reduce SE tax directly, but it lowers overall tax burden. Maintain
          meticulous records — bank statements, invoices, mileage logs, and receipt archives — to
          substantiate every deduction if the IRS questions your return.
        </p>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Calculate Your Self-Employment Tax</p>
          <p className="mt-1 text-sm text-ink-600">Use our free calculator to estimate your SE tax, quarterly payments, and deductible half.</p>
          <Link href="/calculators/self-employment-tax" className="mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
            Open Self-Employment Tax Calculator
          </Link>
        </div>

        <h2>Frequently Asked Questions</h2>

        <h3>What is the self-employment tax rate for 2026?</h3>
        <p>
          The combined self-employment tax rate for 2026 is 15.3%, split into 12.4% for Social Security
          and 2.9% for Medicare. Social Security tax applies only to the first $168,600 of net earnings
          from self-employment. Medicare tax applies to all net earnings with no cap. An additional 0.9%
          Medicare surtax applies when combined wages and self-employment income exceed $200,000 for
          single filers or $250,000 for married filing jointly. The IRS taxes 92.35% of your net
          Schedule C profit, not the full amount.
        </p>

        <h3>Do I have to pay self-employment tax on side income?</h3>
        <p>
          Yes, if your net self-employment earnings exceed $400 in a tax year, you must file Schedule SE
          and pay self-employment tax on that income. Side income from freelancing, consulting, gig
          work, or 1099-NEC forms counts even if you also have a W-2 job. If you earn $8,000 from
          weekend photography on top of a $70,000 salary, you owe SE tax on the $8,000 net profit.
          Your W-2 employer already withholds Social Security and Medicare on your salary, but the
          side income requires separate SE tax payments.
        </p>

        <h3>How do I lower my self-employment tax?</h3>
        <p>
          You cannot eliminate self-employment tax entirely on legitimate business income, but several
          strategies reduce the taxable base. Maximize business deductions on Schedule C to lower net
          profit. Contribute to a Solo 401(k) or SEP-IRA, which reduce net self-employment income.
          Deduct health insurance premiums above the line if you are not eligible for employer coverage.
          Consider S-Corp election once net profit consistently exceeds $60,000 to pay yourself a
          reasonable W-2 salary and take remaining profit as distributions exempt from SE tax. Claim
          the Qualified Business Income deduction for up to 20% of qualified business income.
        </p>

        <h3>When are quarterly estimated tax payments due?</h3>
        <p>
          Quarterly estimated tax payments for 2026 are due April 15, June 16, September 15, and
          January 15, 2027. Each payment should cover at least 25% of your expected annual federal tax
          liability, including both self-employment tax and income tax. If you expect to owe $24,000
          total for the year, each quarterly payment should be roughly $6,000. Missing a deadline
          triggers an underpayment penalty calculated on the shortfall, currently around 7% annual
          interest. Use Form 1040-ES vouchers or pay electronically at IRS.gov.
        </p>

        <h3>What is the difference between self-employment tax and income tax?</h3>
        <p>
          Self-employment tax funds Social Security and Medicare programs and is calculated at a flat
          15.3% on net self-employment earnings (after the 92.35% adjustment). Income tax is a separate
          federal obligation calculated on your total taxable income using progressive brackets from 10%
          to 37%. A freelancer earning $95,000 net might owe $13,423 in SE tax plus approximately
          $11,094 in federal income tax. SE tax is reported on Schedule SE; income tax is calculated
          on Form 1040. Both amounts are combined when determining quarterly estimated payments.
        </p>
      </article>
    </div>
  );
}
