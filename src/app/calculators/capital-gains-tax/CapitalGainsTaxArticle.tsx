import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import {
  LONG_TERM_BRACKETS,
  NIIT_THRESHOLDS,
  TAX_DATA,
  TAX_SOURCES,
  usd,
} from "@/lib/tax-data";

const LT = LONG_TERM_BRACKETS;

export function CapitalGainsTaxArticle() {
  return (
    <>
      <Image
        src="/images/capital-gains-tax-infographic.webp"
        alt="Capital gains tax rates comparison showing short-term rates from 10% to 37% and long-term rates of 0%, 15%, and 20% with income thresholds"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <h2>What Is Capital Gains Tax?</h2>
      <p>
        Capital gains tax is a federal tax on the profit you make when you sell an asset for
        more than you paid for it. The asset can be stocks, bonds, mutual funds, real estate,
        cryptocurrency, collectibles, or any other property. The tax only applies when you
        realize the gain by actually selling -- unrealized gains on paper are not taxed until
        you sell. The amount of tax you owe depends on two critical factors: how long you
        held the asset before selling and your total taxable income for the year.
      </p>
      <p>
        Understanding capital gains tax is essential for any investor because it directly
        affects your net return. A stock that doubles in value looks impressive on paper, but
        your actual profit depends heavily on whether you pay the short-term rate of up to 37%
        or the long-term rate of 0% to 20%. The difference can amount to thousands of dollars
        on a single transaction. Use the calculator above to see exactly how much you would
        owe on a specific sale, and read on to learn the strategies that experienced investors
        use to minimize their tax burden legally.
      </p>

      <h2>Short-Term vs Long-Term Capital Gains</h2>
      <p>
        The IRS divides capital gains into two categories based on holding period. Short-term
        capital gains apply to assets held for one year or less. These gains are taxed at your
        ordinary income tax rate, which ranges from 10% to 37% depending on your total taxable
        income and filing status. For a high earner in the 37% bracket, selling a stock after
        11 months means losing more than a third of the profit to taxes.
      </p>
      <p>
        Long-term capital gains apply to assets held for more than one year. These gains
        receive preferential tax treatment with three rate tiers: 0%, 15%, or 20%. For 2026,
        single filers with taxable income up to {usd(LT.single[0].upTo)} pay 0% on long-term gains. Income
        between {usd(LT.single[0].upTo)} and {usd(LT.single[1].upTo)} is taxed at 15%, and income above {usd(LT.single[1].upTo)} is taxed at
        20%. Married couples filing jointly get roughly double these thresholds. This
        preferential treatment creates a powerful incentive to hold investments for at least
        one year and one day before selling.
      </p>
      <p>
        The difference between short-term and long-term rates can be dramatic. Consider an
        investor in the 32% ordinary income bracket who sells stock for a $50,000 profit.
        Selling after 11 months triggers a $16,000 short-term tax bill. Waiting just two
        more months to cross the one-year threshold drops the rate to 15%, reducing the tax
        to $7,500 -- a savings of $8,500 simply by being patient. You can use our{" "}
        <Link
          href="/calculators/income-tax"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Income Tax Calculator
        </Link>{" "}
        to determine your current ordinary income tax bracket and see how it compares to the
        long-term capital gains rate.
      </p>

      <h2>2026 Capital Gains Tax Brackets</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Tax Rate</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Single</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Married Filing Jointly</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Head of Household</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">0%</td>
              <td className="px-3 py-2 text-ink-800">Up to {usd(LT.single[0].upTo)}</td>
              <td className="px-3 py-2 text-ink-800">Up to {usd(LT.mfj[0].upTo)}</td>
              <td className="px-3 py-2 text-ink-800">Up to {usd(LT.hoh[0].upTo)}</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">15%</td>
              <td className="px-3 py-2 text-ink-800">{usd(LT.single[0].upTo + 1)} - {usd(LT.single[1].upTo)}</td>
              <td className="px-3 py-2 text-ink-800">{usd(LT.mfj[0].upTo + 1)} - {usd(LT.mfj[1].upTo)}</td>
              <td className="px-3 py-2 text-ink-800">{usd(LT.hoh[0].upTo + 1)} - {usd(LT.hoh[1].upTo)}</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800 font-medium">20%</td>
              <td className="px-3 py-2 text-ink-800">Over {usd(LT.single[1].upTo)}</td>
              <td className="px-3 py-2 text-ink-800">Over {usd(LT.mfj[1].upTo)}</td>
              <td className="px-3 py-2 text-ink-800">Over {usd(LT.hoh[1].upTo)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Sources
        items={[TAX_SOURCES.revProc, TAX_SOURCES.capitalGains]}
        checked={TAX_DATA.checkedOnLabel}
        note="Thresholds are for tax year 2026 and are measured against taxable income including the gain."
      />
      <p>
        These thresholds are based on your total taxable income, not just the capital gain
        itself. Your wages, salary, business income, and other earnings stack underneath the
        gain to determine which bracket applies. An investor with $40,000 of taxable income
        (wages after the standard deduction and other deductions) who realizes a $20,000
        long-term gain has a total taxable income of $60,000. The first $9,450 of the gain
        ({usd(LT.single[0].upTo)} - $40,000) falls in the 0% bracket, and the remaining $10,550 is taxed at 15%,
        a tax of $1,583. This stacking effect is why the calculator asks for your
        annual income -- it directly affects the rate you pay on the gain.
      </p>

      <h2>The Net Investment Income Tax (NIIT)</h2>
      <p>
        High earners face an additional 3.8% Net Investment Income Tax on top of the regular
        capital gains rate. The NIIT applies to the lesser of your net investment income or the
        amount by which your modified adjusted gross income (MAGI) exceeds {usd(NIIT_THRESHOLDS.single)} for single
        filers or {usd(NIIT_THRESHOLDS.mfj)} for married filing jointly. These thresholds are not adjusted for inflation. This effectively raises the maximum
        long-term capital gains rate from 20% to 23.8%.
      </p>
      <p>
        For example, a single filer with $180,000 in salary and a $50,000 long-term capital
        gain has a MAGI of $230,000. The NIIT applies to the lesser of the $50,000 investment
        income or the $30,000 excess over the $200,000 threshold. So the NIIT is 3.8% of
        $30,000 = $1,140, added on top of the regular capital gains tax. Track your total
        investment returns using our{" "}
        <Link
          href="/calculators/investment-return"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Investment Return Calculator
        </Link>{" "}
        to see how the NIIT and capital gains taxes affect your real after-tax performance.
      </p>

      <h2>Case Study: Marcus Sells His Tech Stock Portfolio</h2>
      <p>
        Marcus, a 34-year-old software engineer in Seattle, earns $120,000 in annual salary.
        Three years ago, he invested $25,000 in a diversified tech stock portfolio. The
        portfolio has grown to $58,000, giving him a paper gain of $33,000. Marcus is
        considering selling to fund a down payment on his first home. He files as single.
      </p>
      <p>
        Since Marcus held the stocks for more than one year, the $33,000 gain qualifies for
        long-term capital gains rates. His taxable income of $103,900 ($120,000 minus the $16,100 standard deduction) puts him well above the 0%
        threshold of {usd(LT.single[0].upTo)}, so the entire gain is taxed at 15%. His capital gains tax is
        $33,000 x 15% = $4,950. His MAGI is $120,000 + $33,000 = $153,000, which is below
        the $200,000 NIIT threshold, so no NIIT applies. Marcus nets $58,000 - $4,950 =
        $53,050 after tax.
      </p>
      <p>
        If Marcus had sold after only 10 months, the same $33,000 gain would be taxed at his
        ordinary income rate. His $103,900 of taxable income sits just under the
        $105,700 top of the 22% bracket, so the gain would fill the last $1,800 of that bracket
        and push the other $31,200 into the 24% bracket: $1,800 x 22% + $31,200 x 24% =
        $7,884. That is $2,934 more in taxes -- nearly $3,000 lost simply because he did not
        wait two more months. The difference would have been even larger if Marcus had been in
        the 32% bracket.
      </p>
      <p>
        Marcus decides to sell and uses the $53,050 proceeds as part of his home down payment.
        He uses our{" "}
        <Link
          href="/calculators/roi"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          ROI Calculator
        </Link>{" "}
        to compare his after-tax stock market return against the expected appreciation on the
        home, helping him confirm that redirecting the funds into real estate is the right
        move for his financial plan.
      </p>

      <h2>Tax Scenarios: How Income Level Affects Your Rate</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Taxable Income (before gain)</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">$20K Gain (Short-Term)</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">$20K Gain (Long-Term)</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Tax Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$30,000</td>
              <td className="px-3 py-2 text-red-600">$2,400</td>
              <td className="px-3 py-2 text-green-700">$83</td>
              <td className="px-3 py-2 text-green-700 font-medium">$2,318</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$60,000</td>
              <td className="px-3 py-2 text-red-600">$4,400</td>
              <td className="px-3 py-2 text-green-700">$3,000</td>
              <td className="px-3 py-2 text-green-700 font-medium">$1,400</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$100,000</td>
              <td className="px-3 py-2 text-red-600">$4,686</td>
              <td className="px-3 py-2 text-green-700">$3,000</td>
              <td className="px-3 py-2 text-green-700 font-medium">$1,686</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$200,000</td>
              <td className="px-3 py-2 text-red-600">$6,258</td>
              <td className="px-3 py-2 text-green-700">$3,000</td>
              <td className="px-3 py-2 text-green-700 font-medium">$3,258</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-800">$500,000</td>
              <td className="px-3 py-2 text-red-600">$7,000</td>
              <td className="px-3 py-2 text-green-700">$3,000</td>
              <td className="px-3 py-2 text-green-700 font-medium">$4,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The table above shows how the same $20,000 capital gain is taxed differently depending
        on your income level and holding period. At every income level, long-term treatment
        produces a lower tax bill. The savings are most dramatic for lower-income investors
        who qualify for the 0% rate and for high earners where the spread between their
        ordinary income bracket and the 15% or 20% long-term rate is widest. The table is for a
        single filer and shows income tax only, before the 3.8% Net Investment Income Tax. Filing status
        also matters: married couples filing jointly enjoy wider 0% and 15% brackets, often
        cutting the tax bill in half compared to a single filer at the same income.
      </p>

      <h2>Strategies to Minimize Capital Gains Tax</h2>
      <ul>
        <li>
          <strong>Hold for more than one year.</strong> The single most effective strategy is
          simply waiting. Long-term rates of 0% to 20% are significantly lower than short-term
          rates of 10% to 37%. Before selling any investment, check how long you have held it.
          If you are close to the one-year mark, the tax savings of waiting almost always
          outweigh any potential price decline risk.
        </li>
        <li>
          <strong>Harvest tax losses.</strong> Sell losing investments to offset gains dollar
          for dollar. If you have $30,000 in gains and $10,000 in losses, you only pay tax on
          the net $20,000 gain. If losses exceed gains, you can deduct up to $3,000 per year
          against ordinary income and carry remaining losses forward indefinitely. This strategy
          works year-round, not just at year-end.
        </li>
        <li>
          <strong>Use the 0% bracket strategically.</strong> If your income falls near the 0%
          threshold ({usd(LT.single[0].upTo)} for single filers in 2026), you can sell appreciated assets
          tax-free up to that limit. Retirees and gap-year professionals often take advantage
          of low-income years to realize gains at 0%. This is called tax-gain harvesting --
          the opposite of tax-loss harvesting.
        </li>
        <li>
          <strong>Maximize retirement account contributions.</strong> Pre-tax contributions
          to a 401(k) or traditional IRA reduce your taxable income, potentially keeping
          your capital gains in a lower bracket. Reducing your ordinary income by $10,000
          through retirement contributions could shift $10,000 of gains from the 15% bracket
          to the 0% bracket. Check our{" "}
          <Link
            href="/guides/capital-gains-tax-guide"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            Capital Gains Tax Guide
          </Link>{" "}
          for a deeper look at bracket management techniques.
        </li>
        <li>
          <strong>Consider the primary residence exclusion.</strong> If you sell your primary
          home, you can exclude up to $250,000 in gains ($500,000 for married couples) from
          tax, provided you lived in the home for at least two of the last five years. This
          is one of the most valuable tax breaks available to homeowners.
        </li>
        <li>
          <strong>Gift or donate appreciated assets.</strong> Donating appreciated stock to a
          qualified charity lets you deduct the full fair market value without paying capital
          gains tax on the appreciation. Gifting to a family member in a lower tax bracket
          can also shift the tax burden. Dividend-paying stocks are especially good candidates;
          learn more in our{" "}
          <Link
            href="/guides/dividend-investing-beginners"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            Dividend Investing Guide
          </Link>.
        </li>
      </ul>

      <h2>Capital Gains on Different Asset Types</h2>
      <p>
        <strong>Stocks and ETFs:</strong> Standard capital gains rules apply. Cost basis is
        the purchase price plus brokerage commissions. If you bought shares at different
        times, you can choose specific lot identification to sell the highest-cost shares
        first, minimizing the taxable gain. Most brokerages default to FIFO (first in, first
        out), which may not be optimal.
      </p>
      <p>
        <strong>Real estate:</strong> The gain equals the sale price minus the adjusted basis,
        which is the purchase price plus improvement costs minus accumulated depreciation (for
        rental property). The primary residence exclusion can eliminate up to $250,000
        ($500,000 for couples) in gains. Rental property owners may face depreciation recapture
        taxed at 25% on the portion attributable to prior depreciation deductions, in addition
        to capital gains tax on the remaining profit.
      </p>
      <p>
        <strong>Cryptocurrency:</strong> The IRS treats crypto as property, subject to the
        same capital gains rules as stocks. Every trade, including swapping one crypto for
        another, is a taxable event. The cost basis is the fair market value at the time you
        acquired the crypto. Record-keeping is critical because exchanges may not track basis
        across wallets or platforms.
      </p>
      <p>
        <strong>Collectibles:</strong> Art, antiques, precious metals, and coins are taxed at
        a flat 28% rate for long-term gains, which is higher than the standard 20% maximum.
        Short-term gains on collectibles are still taxed at ordinary income rates.
      </p>

      <h2>FAQ</h2>
      <p>
        <strong>What is the difference between short-term and long-term capital gains?</strong>{" "}
        Short-term capital gains apply to assets held for one year or less and are taxed at
        your ordinary income tax rate, ranging from 10% to 37%. Long-term capital gains apply
        to assets held for more than one year and qualify for preferential rates of 0%, 15%,
        or 20%. The holding period is measured from the day after purchase to the day of sale.
      </p>
      <p>
        <strong>How do I calculate my capital gain?</strong>{" "}
        Subtract your cost basis (purchase price plus fees and improvements) from the sale
        price. If the result is positive, you have a capital gain. If negative, you have a
        capital loss. The calculator above handles this automatically and applies the correct
        tax rate based on your income and filing status.
      </p>
      <p>
        <strong>Can capital losses offset capital gains?</strong>{" "}
        Yes. Capital losses directly offset capital gains of the same type (short-term losses
        offset short-term gains first, then long-term gains). If total losses exceed total
        gains, you can deduct up to $3,000 per year against ordinary income. Unused losses
        carry forward to future years with no expiration.
      </p>
      <p>
        <strong>Is there a 0% capital gains tax rate?</strong>{" "}
        Yes. For 2026, single filers with taxable income up to {usd(LT.single[0].upTo)} and married filing
        jointly up to {usd(LT.mfj[0].upTo)} pay 0% on long-term capital gains. This threshold applies to
        your total taxable income including the gain, so partial gains may qualify for 0%
        even if your total income pushes some of the gain into the 15% bracket.
      </p>
      <p>
        <strong>Does selling my home trigger capital gains tax?</strong>{" "}
        Possibly, but the primary residence exclusion lets you exclude up to $250,000 in
        gains ($500,000 for married couples filing jointly) if you owned and lived in the
        home for at least two of the last five years. Only gains exceeding the exclusion
        amount are taxable.
      </p>
    </>
  );
}
