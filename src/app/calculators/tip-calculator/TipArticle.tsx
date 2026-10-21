import Image from "next/image";
import Link from "next/link";
import { Sources } from "@/components/Sources";

export function TipArticle() {
  return (
    <>
      <Image
        src="/images/tip-calculator-infographic.webp"
        alt="Tipping guide infographic showing recommended tip percentages for restaurants, delivery, salon, and other services in the United States"
        width={1200}
        height={800}
        className="rounded-lg border border-ink-200"
      />

      <h2>Why Tipping Matters in the United States</h2>
      <p>
        Tipping is woven into the fabric of American service culture in a way that surprises
        many visitors from abroad. In the United States, tipped workers in restaurants, bars,
        salons, and delivery services often earn a base wage well below the federal minimum wage,
        with tips making up the majority of their take-home pay. Under the Fair Labor Standards
        Act, employers may pay a direct cash wage of at least $2.13 per hour when tips bring
        the worker to the $7.25 federal minimum each workweek. Toast card data averaged 19.1%
        tips at full-service restaurants in Q2 2026 — near the 18–20% range etiquette guides
        recommend. When you leave an appropriate tip, you are completing the compensation model
        many states still use for waitstaff.
      </p>
      <Sources
        items={[
          {
            label: "U.S. DOL Fact Sheet #15 — tipped employees (2026)",
            href: "https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa",
          },
          {
            label: "Toast — U.S. restaurant tipping averages, Q2 2026",
            href: "https://pos.toasttab.com/blog/data/restaurant-tipping-trends",
          },
        ]}
        checked="October 2026"
        note="Many states require higher cash wages than the $2.13 federal tipped minimum."
      />
      <p>
        For diners and consumers, tipping also affects your monthly budget in ways that are easy
        to overlook. A couple who dines out twice per week at $60 per meal and tips 20% spends
        roughly $1,248 per year on gratuities alone — before drinks, tax, or delivery fees. That
        is real money that belongs in your discretionary spending category alongside entertainment
        and travel. Tracking tipping as part of your overall spending plan helps you avoid
        end-of-month surprises. Use our{" "}
        <Link
          href="/calculators/budget-50-30-20"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          50/30/20 Budget Calculator
        </Link>{" "}
        to see how dining and tipping fit into your wants allocation, and adjust your restaurant
        frequency or tip percentage if gratuities are pushing you over budget.
      </p>

      <h2>Qualified Tips Tax Deduction (2025–2028)</h2>
      <p>
        The One Big Beautiful Bill Act allows eligible workers in listed tipped occupations to
        deduct up to $25,000 of qualified tips per year on federal returns for tax years 2025
        through 2028, whether they itemize or take the standard deduction. Tips must be voluntary,
        reported on Form W-2, Form 1099-NEC/MISC/K, or Form 4137, and earned in an occupation
        that customarily received tips on or before December 31, 2024. The deduction phases out
        above $150,000 modified adjusted gross income ($300,000 joint). Mandatory service charges
        that customers cannot change generally do not count as qualified tips.
      </p>
      <Sources
        items={[
          {
            label: "IRS — What the no tax on tips deduction means (March 5, 2026)",
            href: "https://www.irs.gov/newsroom/what-the-no-tax-on-tips-deduction-means-for-you",
          },
          {
            label: "IRS Publication 6133 (Rev. 3-2026)",
            href: "https://www.irs.gov/pub/irs-pdf/p6133.pdf",
          },
        ]}
        checked="October 2026"
      />

      <h2>How Tipping Works in the United States</h2>
      <p>
        Standard restaurant tipping in the U.S. falls between 15% and 20% of the pre-tax bill,
        with 20% common for good service and 25% for exceptional care. Toast reported 19.1%
        average tips at full-service restaurants in Q2 2026. Bankrate's June 2025 survey found
        35% of Americans typically tip at least 20% at sit-down restaurants. These percentages
        apply to sit-down dining where a server takes
        your order, refills drinks, and handles the check. Fast-casual counter service — where
        you order at a register and pick up your food — typically does not require a tip,
        though many payment screens now prompt for one anyway.
      </p>
      <p>
        Delivery drivers, rideshare operators, hotel housekeeping staff, and salon professionals
        each operate under different norms. Food delivery through apps like DoorDash or Uber
        Eats generally expects 15% to 20% of the order total, with a $3 to $5 minimum on small
        orders. Rideshare tipping runs 15% to 20% of the fare, though a flat $2 to $5 is common
        on short trips under $15. Hotel housekeeping typically receives $2 to $5 per night left
        on the pillow or desk, not as a lump sum at checkout. Understanding these service-specific
        benchmarks prevents both under-tipping — which directly reduces a worker's income —
        and over-tipping out of uncertainty.
      </p>
      <p>
        Sales tax adds another layer of complexity. In most states, the amount printed on your
        receipt includes tax on top of the food and beverage subtotal. A $100 dinner in Chicago
        with 10.25% sales tax becomes $110.25 before tip. Whether you calculate 20% on $100 or
        $110.25 changes your tip by $2.05 — small on one meal, but meaningful over hundreds of
        dining occasions per year. The calculator above lets you enter your pre-tax bill amount
        so you can tip consistently on the subtotal, which is the approach most etiquette
        experts recommend.
      </p>

      <h2>Key Concepts for Tipping</h2>
      <p>
        <strong>Pre-tax vs post-tax tipping.</strong> Etiquette guides and many restaurant
        industry standards recommend calculating your tip on the pre-tax subtotal, not the
        total after sales tax is added. Tax is a government levy, not a cost of service, and
        tipping on the tax amount effectively increases your gratuity rate without benefiting
        the server. On a $120 pre-tax bill with $10.80 tax (9%), tipping 20% pre-tax means
        $24.00 in gratuity. Tipping 20% post-tax on $130.80 yields $26.16 — an extra $2.16
        that adds up across frequent dining. When the check arrives, look for the subtotal line
        or ask your server if you are unsure.
      </p>
      <p>
        <strong>Service quality adjustments.</strong> Standard percentages are starting points,
        not rigid rules. Exceptional service — attentive without being intrusive, accurate
        orders, timely refills, and genuine warmth — warrants 20% to 25%. Mediocre service with
        long waits or repeated errors might justify 15%, though many diners still tip 18% to
        avoid penalizing a server who may be covering too many tables through no fault of their
        own. Truly poor service — rude behavior, completely wrong orders with no apology — may
        warrant speaking with a manager rather than simply reducing the tip to zero, since many
        restaurants pool or share tips among staff.
      </p>
      <p>
        <strong>Group dining auto-gratuity.</strong> Restaurants commonly add an automatic
        gratuity of 18% to 20% for parties of six or more. This charge appears on your bill
        as "gratuity" or "service charge" and is legally distinct from a
        voluntary tip in some jurisdictions. Before adding an extra tip on top, read the check
        carefully. If 20% auto-gratuity is already included on a $500 group bill, you have
        already paid $100 in gratuity — adding another 20% would double-pay. You may still
        leave an additional amount for outstanding service, but the baseline is covered.
      </p>

      <h2>Case Study: Client Dinner in Chicago</h2>
      <p>
        Marcus, a 34-year-old sales manager in Chicago, takes his team of 6 out for a client
        dinner. The bill comes to $420 before tax. Tax at 10.25% adds $43.05, making the
        subtotal $463.05. Marcus wants to tip on the pre-tax amount at 20%: $420 x 0.20 = $84
        tip. Total: $420 + $43.05 + $84 = $547.05. Split 6 ways: $91.18 per person.
      </p>
      <p>
        If Marcus had tipped 20% on the post-tax total instead, his gratuity would have been
        $463.05 x 0.20 = $92.61 — $8.61 more than his intended amount. Over a year of monthly
        client dinners at similar price points, that difference alone exceeds $100. Marcus uses
        the tip calculator before the meal to set expectations with his team about per-person
        cost, including tax and gratuity, so no one is surprised when the check arrives.
      </p>

      <h2>Standard Tipping Percentages by Service</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border border-ink-200">
          <thead className="bg-ink-100">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Service</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Low (Acceptable)</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Standard</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Generous</th>
              <th className="px-3 py-2 text-left font-medium text-ink-600">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">Restaurant dining</td>
              <td className="px-3 py-2 text-ink-800">15%</td>
              <td className="px-3 py-2 text-ink-800">18-20%</td>
              <td className="px-3 py-2 text-ink-800">25%+</td>
              <td className="px-3 py-2 text-ink-800">On pre-tax amount</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">Delivery (food)</td>
              <td className="px-3 py-2 text-ink-800">$3-5 minimum</td>
              <td className="px-3 py-2 text-ink-800">15-20%</td>
              <td className="px-3 py-2 text-ink-800">25%+</td>
              <td className="px-3 py-2 text-ink-800">Higher for bad weather</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">Salon/Barber</td>
              <td className="px-3 py-2 text-ink-800">15%</td>
              <td className="px-3 py-2 text-ink-800">20%</td>
              <td className="px-3 py-2 text-ink-800">25%+</td>
              <td className="px-3 py-2 text-ink-800">On total service cost</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">Taxi/Rideshare</td>
              <td className="px-3 py-2 text-ink-800">10%</td>
              <td className="px-3 py-2 text-ink-800">15-20%</td>
              <td className="px-3 py-2 text-ink-800">25%+</td>
              <td className="px-3 py-2 text-ink-800">$2 minimum for short rides</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">Hotel housekeeping</td>
              <td className="px-3 py-2 text-ink-800">$2/night</td>
              <td className="px-3 py-2 text-ink-800">$3-5/night</td>
              <td className="px-3 py-2 text-ink-800">$10+/night</td>
              <td className="px-3 py-2 text-ink-800">Leave daily, not at checkout</td>
            </tr>
            <tr className="border-t border-ink-100">
              <td className="px-3 py-2 text-ink-700">Coffee/Counter</td>
              <td className="px-3 py-2 text-ink-800">$0</td>
              <td className="px-3 py-2 text-ink-800">$1-2</td>
              <td className="px-3 py-2 text-ink-800">Round up</td>
              <td className="px-3 py-2 text-ink-800">Not expected but appreciated</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Practical Tipping Tips</h2>
      <ul>
        <li>
          <strong>Calculate before you sit down.</strong> On an $85 bill with 20% tip, you
          owe $17.00 in gratuity for a $102.00 total. Knowing this upfront prevents awkward
          mental math at the table and helps you decide whether to order that extra appetizer.
        </li>
        <li>
          <strong>Use the reference table for quick decisions.</strong> The calculator above
          shows tip amounts at 15%, 18%, 20%, 22%, and 25% for any bill size. Glance at the
          row closest to your preferred percentage rather than doing multiplication on your phone.
        </li>
        <li>
          <strong>Split fairly when dining in groups.</strong>           Divide the total (bill plus tip)
          by the number of people, not just the food subtotal. On a $102.00 total split two
          ways, each person pays $51.00 — including their share of the tip. One person covering
          the full tip and splitting only the food creates confusion and often shortchanges the
          server.
        </li>
        <li>
          <strong>Budget for tips as a line item.</strong> If you dine out $400 per month on
          food and drink before tip, add 18% ($72) to your dining budget for a realistic $472
          monthly restaurant spend. Our{" "}
          <Link
            href="/guides/50-30-20-budget-rule"
            className="text-brand-600 hover:text-brand-800 font-medium"
          >
            50/30/20 budget rule guide
          </Link>{" "}
          explains how to fit dining into your wants category without crowding out savings.
        </li>
        <li>
          <strong>Tip in cash when possible for direct delivery.</strong> App-based tips do
          reach drivers, but cash tips at the door guarantee immediate compensation and are
          especially appreciated during peak hours when drivers handle multiple orders in rain
          or snow.
        </li>
      </ul>
      <p>
        Understanding your hourly earning power also helps you gauge whether your tipping
        habits align with your income. A worker earning $65,000 per year takes home roughly
        $31 per hour before taxes on a standard 2,080-hour work year. Use our{" "}
        <Link
          href="/calculators/salary-to-hourly"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Salary to Hourly Calculator
        </Link>{" "}
        to convert your annual salary to an hourly rate and compare it against your average
        tip spending per hour of dining or delivery.
      </p>

      <h2>FAQ</h2>
      <p>
        <strong>How much should you tip at a restaurant?</strong> Standard restaurant tipping
        in the United States is 18% to 20% of the pre-tax bill for good service, with Toast
        card data averaging 19.1% at full-service restaurants in Q2 2026. Fifteen percent is
        acceptable for adequate service, while 25% signals exceptional care. On an $85 dinner,
        that range is $12.75 at 15%, $15.30 at 18%, $17.00 at 20%, and $21.25 at 25%.
      </p>
      <p>
        <strong>Do you tip on pre-tax or post-tax amount?</strong> Most etiquette experts and
        servers expect tips calculated on the pre-tax subtotal. Tipping on the post-tax total
        inflates your gratuity by the tax percentage — on a $100 bill with 8% tax, post-tax
        tipping at 20% costs $2.16 more than pre-tax tipping. Check your receipt for the
        subtotal line before calculating.
      </p>
      <p>
        <strong>How do you calculate tip when splitting a bill?</strong> First add the tip to
        the full bill amount, then divide the total by the number of people. For an $85 bill
        with 20% tip ($17.00), the total is $102.00. Split between two people, each pays
        $51.00. Split four ways, each pays $25.50. The calculator above handles this
        automatically when you enter the number of diners.
      </p>
      <p>
        <strong>Is it rude not to tip in the US?</strong> In sit-down restaurants and other
        tipped service industries, yes — failing to tip is widely considered rude because servers
        depend on gratuities for the majority of their income. At counter-service coffee shops
        or fast-casual restaurants where tipping is optional, skipping a tip is not considered
        offensive, though small tips of $1 to $2 are appreciated. Context matters: a mandatory
        service charge on a large group bill already covers gratuity, so an additional tip is
        optional rather than expected.
      </p>
    </>
  );
}
