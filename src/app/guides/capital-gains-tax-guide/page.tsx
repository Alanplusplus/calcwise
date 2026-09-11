import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { FaqJsonLd } from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "Capital Gains Tax 2026: Rates, Brackets, and How to Minimize What You Owe",
  description: "Understand 2026 capital gains tax rates, brackets for every filing status, and proven strategies to minimize your tax bill on stocks, real estate, and crypto.",
  openGraph: {
    title: `Capital Gains Tax 2026: Rates, Brackets, and How to Minimize What You Owe | ${site.name}`,
    description: "Understand 2026 capital gains tax rates, brackets for every filing status, and proven strategies to minimize your tax bill on stocks, real estate, and crypto.",
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the capital gains tax rate for 2026?",
    answer: "For 2026, long-term capital gains (assets held more than one year) are taxed at 0%, 15%, or 20% depending on your taxable income and filing status. Single filers pay 0% on gains when total taxable income is up to $48,350, 15% from $48,351 to $533,400, and 20% above $533,400. Short-term gains on assets held one year or less are taxed as ordinary income at rates from 10% to 37%. High earners with modified adjusted gross income above $200,000 (single) or $250,000 (married filing jointly) may also owe an additional 3.8% Net Investment Income Tax.",
  },
  {
    question: "Do I pay capital gains tax on my primary home?",
    answer: "You may owe no capital gains tax on your primary residence if you meet the IRS exclusion rules. Single filers can exclude up to $250,000 of gain; married couples filing jointly can exclude up to $500,000. You must have owned and lived in the home as your primary residence for at least two of the five years before the sale. Gains above those thresholds are taxed at long-term capital gains rates. A couple who bought a home for $400,000 and sold it for $950,000 would have a $550,000 gain but pay tax on only $50,000 after the $500,000 exclusion.",
  },
  {
    question: "How do I calculate capital gains on stocks?",
    answer: "Capital gain equals your sale proceeds minus your cost basis. If you bought 100 shares at $50 per share ($5,000 cost basis) and sold at $80 per share ($8,000 proceeds), your gain is $3,000. Subtract any commissions and add reinvested dividends to your cost basis if applicable. The holding period determines the rate: sell within 365 days and the gain is short-term; hold at least 366 days and it qualifies for long-term rates. Use our Income Tax Calculator to estimate federal tax on a specific gain amount at your income level.",
  },
  {
    question: "Are there ways to avoid capital gains tax legally?",
    answer: "You cannot eliminate capital gains tax entirely on taxable accounts, but several legal strategies reduce what you owe. Hold investments for more than one year to access lower long-term rates. Harvest losses to offset gains — up to $3,000 of net losses can offset ordinary income annually. Invest inside tax-advantaged accounts like a 401(k) or Roth IRA where gains grow tax-deferred or tax-free. Donate appreciated stock directly to charity to avoid tax on the gain and claim a deduction. Use the primary-home exclusion ($250,000/$500,000) when selling your residence.",
  },
  {
    question: "Do I pay capital gains tax on crypto?",
    answer: "Yes. The IRS treats cryptocurrency as property, not currency. Selling Bitcoin, Ethereum, or any other crypto for U.S. dollars triggers a capital gain or loss calculated the same way as stocks: sale price minus purchase price. Swapping one crypto for another (e.g., Bitcoin for Ethereum) is also a taxable event. Mining or staking rewards are taxed as ordinary income when received, and selling those coins later creates a separate capital gain. Crypto held over one year qualifies for long-term rates; anything sold within a year is short-term.",
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
        <span className="text-ink-700">Capital Gains Tax</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
        Capital Gains Tax 2026: Rates, Brackets, and How to Minimize What You Owe
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: September 2026</p>

      <article className="prose mt-8">
        <p>
          Whether you sold stock, cryptocurrency, rental property, or a business asset in 2026, the{" "}
          <strong>capital gains tax rate 2026</strong> you pay depends on two factors: how long you held
          the asset and your total taxable income. Short-term gains on assets held one year or less are
          taxed as ordinary income at rates up to 37%. Long-term gains on assets held more than one year
          qualify for preferential rates of 0%, 15%, or 20%. For most middle-income investors, the
          difference between selling one month too early and holding for 13 months can mean paying $2,000
          to $4,000 more in federal tax on the same $25,000 profit.
        </p>

        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">Quick Answer</p>
          <p className="mt-1 text-ink-700">
            Short-term capital gains (held one year or less) are taxed as ordinary income at rates from
            10% to 37%. Long-term gains (held more than one year) are taxed at 0%, 15%, or 20% depending
            on income. Most taxpayers pay 15% on long-term gains. Holding investments at least 366 days
            before selling is the single easiest way to cut your tax bill.
          </p>
        </div>

        <Image
          src="/images/guides/capital-gains-tax-guide.webp"
          alt="Capital gains tax rates infographic showing 2026 short-term and long-term tax brackets for single filers and married filing jointly"
          width={1200}
          height={800}
          className="rounded-lg border border-ink-200"
        />

        <h2>What Are Capital Gains?</h2>

        <p>
          A capital gain is the profit you realize when you sell an asset for more than you paid for it.
          The formula is straightforward: <strong>Sale Price − Purchase Price = Capital Gain</strong>.
          If you bought shares of an index fund for $12,000 and sold them for $19,500, your capital gain
          is $7,500. If you sold for $10,000, you have a $2,000 capital loss instead — and losses can
          offset gains on your tax return.
        </p>

        <p>
          Capital gains apply to nearly every investment asset: stocks, bonds, mutual funds, ETFs,
          cryptocurrency, real estate, collectibles, and business interests. The IRS does not tax
          unrealized gains — you only owe tax when you actually sell. That is why many long-term investors
          hold positions for decades: deferring the sale defers the tax bill, and your money continues
          compounding in the meantime. Before selling any position, run the numbers with our{" "}
          <Link href="/calculators/investment-return" className="text-brand-600 hover:text-brand-800 font-medium">
            Investment Return Calculator
          </Link>{" "}
          to see how the after-tax return compares to your original investment thesis.
        </p>

        <p>
          Your cost basis matters as much as the sale price. Cost basis includes the purchase price plus
          commissions, and it can be adjusted upward for reinvested dividends or capital improvements on
          real estate. Getting cost basis wrong is one of the most common mistakes investors make — overstate
          it and you underpay tax (risking an audit); understate it and you overpay. Brokerage firms report
          cost basis for stocks purchased after 2011, but older positions and crypto require your own records.
        </p>

        <h2>Short-Term vs Long-Term Capital Gains</h2>

        <p>
          The holding period is the dividing line that determines your tax rate. Sell an asset within 365
          days of purchase and the gain is <strong>short-term</strong> — taxed at your ordinary federal
          income tax rate, which ranges from 10% to 37% in 2026. Hold the asset for at least 366 days
          and the gain becomes <strong>long-term</strong>, qualifying for the reduced rates of 0%, 15%,
          or 20%.
        </p>

        <p>
          The one-day difference is not symbolic — it is financial. A single filer earning $120,000 who
          realizes a $20,000 gain pays $4,800 in federal tax if the gain is short-term (24% marginal rate)
          but only $3,000 if it is long-term (15% rate). That $1,800 savings requires nothing more than
          waiting until day 366 to click sell. Mark your purchase dates in a spreadsheet or use your
          brokerage&apos;s lot-tracking tools to avoid accidentally triggering short-term treatment.
        </p>

        <h2>2026 Long-Term Capital Gains Tax Rates and Brackets</h2>

        <p>
          The <strong>capital gains tax rate 2026</strong> for long-term gains uses separate brackets from
          ordinary income. These thresholds apply to your total taxable income, including the gain itself.
          For single filers in 2026:
        </p>

        <ul>
          <li><strong>0% rate:</strong> Taxable income up to $48,350</li>
          <li><strong>15% rate:</strong> Taxable income from $48,351 to $533,400</li>
          <li><strong>20% rate:</strong> Taxable income above $533,400</li>
        </ul>

        <p>
          For married couples filing jointly, the brackets are roughly double:
        </p>

        <ul>
          <li><strong>0% rate:</strong> Taxable income up to $96,700</li>
          <li><strong>15% rate:</strong> Taxable income from $96,701 to $600,050</li>
          <li><strong>20% rate:</strong> Taxable income above $600,050</li>
        </ul>

        <p>
          A retiree with $35,000 in Social Security and pension income who sells stock for a $10,000
          long-term gain would have total taxable income around $45,000 — entirely within the 0% bracket,
          meaning zero federal capital gains tax on that sale. The same retiree with $55,000 in ordinary
          income would pay 15% on most of the gain because they exceed the $48,350 threshold.
        </p>

        <p>
          High earners face an additional layer. The 3.8% Net Investment Income Tax (NIIT) applies when
          modified adjusted gross income exceeds $200,000 for single filers or $250,000 for married filing
          jointly. This surtax stacks on top of the 15% or 20% long-term rate. A single filer with
          $300,000 in income who realizes a $50,000 long-term gain pays 15% ($7,500) plus 3.8% NIIT
          ($1,900) on the gain — $9,400 total, an effective rate of 18.8%.
        </p>

        <h2>2026 Short-Term Capital Gains Tax Rates</h2>

        <p>
          Short-term gains do not get preferential treatment. They are added to your ordinary income and
          taxed at the same federal brackets that apply to your salary. For 2026, the seven ordinary
          income brackets for single filers are:
        </p>

        <ul>
          <li><strong>10%:</strong> $0 to $11,925</li>
          <li><strong>12%:</strong> $11,926 to $48,475</li>
          <li><strong>22%:</strong> $48,476 to $103,350</li>
          <li><strong>24%:</strong> $103,351 to $197,300</li>
          <li><strong>32%:</strong> $197,301 to $250,525</li>
          <li><strong>35%:</strong> $250,526 to $626,350</li>
          <li><strong>37%:</strong> Above $626,350</li>
        </ul>

        <p>
          Because short-term gains stack on top of your existing income, they are typically taxed at your
          highest marginal rate — not your average rate. An engineer earning $145,000 who flips a stock
          position within six months pays 24% on the entire short-term gain, even though their average
          tax rate on salary alone is closer to 18%. Use the{" "}
          <Link href="/calculators/income-tax" className="text-brand-600 hover:text-brand-800 font-medium">
            Income Tax Calculator
          </Link>{" "}
          to model how a short-term gain shifts your effective tax rate before you execute a trade.
        </p>

        <h2>Case Study: David&apos;s Tech Stock Sale in Seattle</h2>

        <p>
          David is a 42-year-old software engineer in Seattle earning $145,000 per year in W-2 salary.
          In March 2024, he bought 200 shares of a tech stock at $85 per share, investing $17,000 total.
          By July 2026, the stock had climbed to $142 per share. He sold all 200 shares for $28,400.
        </p>

        <p>
          David held the shares for 28 months — well beyond the one-year threshold — so his entire profit
          qualifies as a long-term capital gain. His gain calculation: $28,400 (sale proceeds) minus
          $17,000 (cost basis) = <strong>$11,400 long-term capital gain</strong>.
        </p>

        <p>
          David&apos;s adjusted gross income for 2026 is $156,400 ($145,000 salary + $11,400 gain). As a
          single filer, he falls squarely in the 15% long-term capital gains bracket (income between
          $48,351 and $533,400). His federal capital gains tax: $11,400 × 15% = <strong>$1,710</strong>.
        </p>

        <p>
          Now consider the alternative. If David had sold in January 2025 — just 10 months after buying —
          the same $11,400 profit would be a short-term gain taxed at his 24% marginal ordinary income
          rate. Tax owed: $11,400 × 24% = <strong>$2,736</strong>. Waiting an extra 14 months to cross
          the one-year mark saved David <strong>$1,026</strong> in federal tax alone — nearly 60% more
          than he would have paid on a short-term sale.
        </p>

        <p>
          Washington State has no state income tax, so David owes only federal capital gains tax. If he
          lived in California, he would owe an additional 9.3% to 13.3% state tax on the gain regardless
          of holding period — making the long-term vs short-term distinction even more valuable. Always
          factor in state taxes when evaluating a sale; nine states (including Texas, Florida, and Nevada)
          impose no state income tax on capital gains.
        </p>

        <h2>Capital Gains Tax on a $25,000 Gain by Income Level</h2>

        <p>
          The table below shows federal tax on a $25,000 capital gain for single filers at five different
          income levels. Short-term tax uses the marginal ordinary income rate at each income level.
          Long-term tax uses the 2026 preferential brackets, including partial 0% treatment where applicable.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Taxable Income (Single)</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Short-Term Tax</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Long-Term Tax</th>
                <th className="px-4 py-3 text-left font-semibold text-ink-700">Savings from Holding</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$40,000</td>
                <td className="px-4 py-3 text-ink-800">$4,785</td>
                <td className="px-4 py-3 text-ink-800">$2,498</td>
                <td className="px-4 py-3 text-ink-800">$2,287</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$60,000</td>
                <td className="px-4 py-3 text-ink-800">$5,500</td>
                <td className="px-4 py-3 text-ink-800">$3,750</td>
                <td className="px-4 py-3 text-ink-800">$1,750</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$100,000</td>
                <td className="px-4 py-3 text-ink-800">$6,000</td>
                <td className="px-4 py-3 text-ink-800">$3,750</td>
                <td className="px-4 py-3 text-ink-800">$2,250</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$150,000</td>
                <td className="px-4 py-3 text-ink-800">$6,000</td>
                <td className="px-4 py-3 text-ink-800">$3,750</td>
                <td className="px-4 py-3 text-ink-800">$2,250</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">$250,000</td>
                <td className="px-4 py-3 text-ink-800">$8,000</td>
                <td className="px-4 py-3 text-ink-800">$3,750</td>
                <td className="px-4 py-3 text-ink-800">$4,250</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The pattern is clear: at every income level, holding for more than one year produces meaningful
          savings. The benefit is largest for high earners — a single filer at $250,000 saves $4,250 on
          the same $25,000 gain. Even at lower incomes, the $40,000 earner saves $2,287 by qualifying for
          long-term treatment, partly because a portion of the gain falls in the 0% bracket.
        </p>

        <h2>6 Strategies to Minimize Capital Gains Tax</h2>

        <p>
          <strong>1. Tax-loss harvesting.</strong> Sell losing positions to offset gains from winners.
          If you have $15,000 in gains and $10,000 in losses, you pay tax on only $5,000 net gain. Unused
          losses carry forward indefinitely. You can also deduct up to $3,000 of net capital losses against
          ordinary income each year. Be aware of the wash-sale rule: repurchasing the same security within
          30 days before or after the sale disallows the loss.
        </p>

        <p>
          <strong>2. Hold investments for at least one year.</strong> As David&apos;s case shows, crossing
          the 366-day mark can save 9 to 13 percentage points on your tax rate. Before selling any
          profitable position, check the purchase date. If you are within weeks of the one-year mark,
          waiting is almost always worth it unless the stock is in free fall.
        </p>

        <p>
          <strong>3. Use tax-advantaged accounts.</strong> Gains inside a 401(k) or traditional IRA grow
          tax-deferred — you pay ordinary income tax only when you withdraw in retirement. Gains inside a
          Roth IRA grow completely tax-free if you meet the five-year rule and are age 59½ or older.
          Maxing these accounts before investing in taxable brokerage accounts is the most powerful
          long-term tax strategy available.
        </p>

        <p>
          <strong>4. Claim the primary home sale exclusion.</strong> Single filers exclude up to $250,000
          of gain; married couples exclude up to $500,000. You must have owned and used the home as your
          primary residence for two of the five years before the sale. A couple who bought for $350,000
          and sells for $800,000 has a $450,000 gain — entirely tax-free under the exclusion.
        </p>

        <p>
          <strong>5. Gift appreciated assets to lower-income family members.</strong> If your adult child
          is in the 0% long-term capital gains bracket (taxable income under $48,350), gifting appreciated
          stock lets them sell at 0% federal tax. You can gift up to $19,000 per recipient per year (2026
          limit) without triggering gift tax. This works best when the recipient is genuinely in a lower
          bracket — not as a sham transaction.
        </p>

        <p>
          <strong>6. Donate appreciated stock to charity.</strong> Instead of selling stock and donating
          cash, transfer shares directly to a qualified charity. You avoid capital gains tax on the
          appreciation and deduct the full fair market value if you itemize. Donating $10,000 of stock
          with a $4,000 cost basis saves you $1,500 in capital gains tax (at 15%) plus provides a
          $10,000 charitable deduction — a double benefit that cash donations cannot match.
        </p>

        <p>
          Understanding your return before taxes is just as important as minimizing the tax itself. Our{" "}
          <Link href="/guides/how-to-calculate-roi" className="text-brand-600 hover:text-brand-800 font-medium">
            guide to calculating ROI
          </Link>{" "}
          walks through how to measure investment performance after fees and taxes, and our{" "}
          <Link href="/guides/dividend-investing-beginners" className="text-brand-600 hover:text-brand-800 font-medium">
            dividend investing guide
          </Link>{" "}
          explains how qualified dividends receive the same preferential long-term rates as capital gains.
        </p>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Estimate Your Capital Gains Tax</p>
          <p className="mt-1 text-sm text-ink-600">Use our free calculator to see how much you owe on stock sales, real estate, and other investments.</p>
          <Link href="/calculators/income-tax" className="mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
            Open Income Tax Calculator
          </Link>
        </div>

        <h2>Frequently Asked Questions</h2>

        <h3>What is the capital gains tax rate for 2026?</h3>
        <p>
          For 2026, long-term capital gains are taxed at 0%, 15%, or 20% based on taxable income and
          filing status. Single filers pay 0% when income is up to $48,350, 15% from $48,351 to $533,400,
          and 20% above $533,400. Short-term gains are taxed as ordinary income at rates from 10% to 37%.
          High earners with modified adjusted gross income above $200,000 (single) or $250,000 (married
          filing jointly) may also owe an additional 3.8% Net Investment Income Tax on investment income.
        </p>

        <h3>Do I pay capital gains tax on my primary home?</h3>
        <p>
          You may owe no capital gains tax if you meet the IRS exclusion. Single filers exclude up to
          $250,000 of gain; married couples exclude up to $500,000. You must have owned and lived in the
          home as your primary residence for at least two of the five years before the sale. Gains above
          those thresholds are taxed at long-term rates. A couple who bought for $400,000 and sold for
          $950,000 would pay tax on only $50,000 of their $550,000 gain.
        </p>

        <h3>How do I calculate capital gains on stocks?</h3>
        <p>
          Capital gain equals sale proceeds minus cost basis. Buy 100 shares at $50 ($5,000 basis), sell
          at $80 ($8,000 proceeds), and your gain is $3,000. Subtract commissions and adjust for
          reinvested dividends. The holding period determines the rate: under 366 days is short-term;
          366 days or more is long-term. Brokerages report cost basis for most stock purchases, but
          verify older positions and crypto trades against your own records.
        </p>

        <h3>Are there ways to avoid capital gains tax legally?</h3>
        <p>
          You cannot eliminate capital gains tax on taxable accounts entirely, but several strategies
          reduce what you owe. Hold for more than one year for lower rates. Harvest losses to offset
          gains — up to $3,000 of net losses can offset ordinary income annually. Invest in 401(k) or
          Roth IRA accounts. Donate appreciated stock directly to charity. Use the $250,000/$500,000
          primary-home exclusion. Gift appreciated assets to family members in lower tax brackets.
        </p>

        <h3>Do I pay capital gains tax on crypto?</h3>
        <p>
          Yes. The IRS treats cryptocurrency as property. Selling crypto for dollars triggers a capital
          gain or loss: sale price minus purchase price. Swapping one crypto for another is also taxable.
          Mining and staking rewards are taxed as ordinary income when received; selling those coins later
          creates a separate capital gain. Crypto held over one year qualifies for long-term rates;
          anything sold within a year is short-term and taxed at ordinary income rates up to 37%.
        </p>
      </article>
    </div>
  );
}
