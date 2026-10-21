import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import {
  STANDARD_DEDUCTIONS,
  TAX_DATA,
  TAX_SOURCES,
  usd,
} from "@/lib/tax-data";

export const metadata: Metadata = {
  title: "Rent vs Buy in 2026: How to Make the Right Decision",
  description:
    "Should you rent or buy in 2026? Compare real monthly costs, break-even timelines at 7.40% PMMS rates, and a step-by-step framework for your housing decision.",
  keywords: [
    "should I rent or buy a house",
    "rent vs buy calculator",
    "rent or buy 2026",
    "break even rent vs buy",
    "is it better to rent or buy",
    "rent vs buy decision framework",
  ],
};

const faqs = [
  {
    question: "Should I rent or buy a house in 2026?",
    answer:
      "As of mid-October 2026, Freddie Mac’s PMMS 30-year fixed rate averaged 7.40% (week of October 15). Renting often wins financially if you plan to move within 4 to 5 years. Buying makes sense when you will stay 6+ years, have stable income, and can cover a 20% down payment plus closing costs (typically 2–5% of the purchase price per the CFPB) without draining your emergency fund. Rates rose from 6.65% in August to 7.40% by mid-October, which widens the monthly cost gap versus renting. Run your exact numbers with a rent-vs-buy calculator before deciding.",
  },
  {
    question: "How long do you need to stay to break even on buying vs renting?",
    answer:
      "At the October 15, 2026 PMMS average of 7.40% on a 30-year fixed, many scenarios break even in roughly 4.5 to 6 years — longer than when rates were near 6.5% in mid-2026. Closing costs of $8,000–$15,000, 1–2% annual maintenance, and the opportunity cost of your down payment all delay the point where buying costs less than renting. In high-cost cities like San Francisco or New York, break-even can still stretch to 7–9 years.",
  },
  {
    question: "Is renting throwing money away?",
    answer:
      "No. Rent buys you housing and flexibility. On a $2,250/month lease, you pay $27,000 per year for shelter with zero maintenance bills, no property tax, and no $12,000 roof replacement risk. The money you keep out of a down payment ($78,000 on a $390,000 home) could stay in FDIC-insured savings (the FDIC national average savings rate was 0.38% as of October 2026) or, if invested for the long term, participate in historical stock-market returns that have varied widely year to year.",
  },
  {
    question: "What hidden costs make buying more expensive than the mortgage payment?",
    answer:
      "Beyond principal and interest, homeowners pay property tax (2024 Census ACS data imply a national effective rate of about 0.89% of home value; local rates vary), insurance ($1,500–$2,600/year), maintenance and repairs (1–2% of home value annually), closing costs ($8,000–$15,000 upfront), and selling costs (5–6% agent commission when you move). On a $390,000 home at 7.40%, the true monthly cost is often $900–$1,100 higher than the mortgage payment alone.",
  },
  {
    question: "Does buying always build more wealth than renting?",
    answer:
      "Not automatically. A renter who invests the down payment ($78,000) and monthly cost difference ($966/month in the $390,000 scenario below) at a hypothetical 7% long-term return — not a guarantee — could accumulate roughly $314,000 over 10 years. A buyer builds equity through paydown and appreciation, but pays about $466,000 in interest over 30 years at 7.40% on a $312,000 loan. Wealth building depends on how long you stay, local appreciation, and whether you actually invest the savings from renting.",
  },
  {
    question: "Should I wait for mortgage rates to drop further before buying?",
    answer:
      "Timing the market is rarely wise. PMMS 30-year rates rose from 6.65% (August 20, 2026) to 7.40% (October 15, 2026), adding about $157/month in principal and interest on a $312,000 loan. Waiting for lower rates can coincide with higher prices: FHFA’s national house price index rose 2.6% year-over-year through July 2026 (release dated September 29, 2026). A $390,000 home appreciating at 2.6% adds about $10,140 in value in year one. Buy when you meet the 5-step framework criteria, not based on rate forecasts alone.",
  },
];

export default function RentVsBuyDecisionGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Rent vs Buy in 2026: How to Make the Right Decision"
        description="Should you rent or buy in 2026? Compare real monthly costs, break-even timelines at 7.40% PMMS rates, and a step-by-step framework for your housing decision."
        slug="rent-vs-buy-decision"
        datePublished="2026-08-24"
        dateModified="2026-10-20"
        image="/images/guides/rent-vs-buy-decision.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Rent vs Buy Decision", href: "/guides/rent-vs-buy-decision" },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Housing Strategy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Rent vs Buy in 2026: How to Make the Right Decision
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            "Should I rent or buy a house?" is the question behind
            every housing search — and the honest answer is not always
            "buy."             With 30-year fixed mortgage rates averaging 7.40% in the Freddie
            Mac PMMS for the week of October 15, 2026 — up from 6.65% in
            August — the monthly cost of buying has moved further from renting.
            This guide compares real monthly costs, break-even timelines, and
            a decision framework built on specific numbers, not real estate
            slogans.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: October 2026</p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Break-even timeline (Oct 2026):</strong> Often 4.5–6
              years at 7.40% PMMS mortgage rates before buying costs less than
              renting in many scenarios — longer than when rates were near 6.5%
              mid-year
            </li>
            <li>
              <strong>Monthly cost gap:</strong> Owning a $390,000 home costs
              ~$3,216/month vs. $2,250/month rent — a $966/month premium
            </li>
            <li>
              <strong>Hidden buy costs:</strong> $8,000–$15,000 closing fees,
              1–2% annual maintenance, plus opportunity cost on your down payment
            </li>
            <li>
              <strong>Rent if:</strong> Moving within 5 years, unstable income,
              or buying would drain your emergency fund below 3 months
            </li>
            <li>
              <strong>Buy if:</strong> Staying 6+ years, stable dual income,
              20% down saved, and total housing stays under 28% of gross pay
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/rent-vs-buy"
              className="font-medium text-brand-600 underline"
            >
              Rent vs Buy Calculator
            </Link>{" "}
            to run your exact scenario.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/rent-vs-buy-decision.webp"
              alt="Infographic comparing rent vs buy in 2026: $2,250 monthly rent versus about $3,216 true monthly cost of owning a $390,000 home, with a 4.5 to 6 year break-even timeline at 7.40% mortgage rates"
              width={1200}
              height={675}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Rent vs buy at a glance: monthly cost comparison and typical break-even timeline as of October 2026
            </figcaption>
          </figure>
        </section>

        {/* Section 1: Real Cost of Buying vs Renting */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Real Cost of Buying vs Renting
          </h2>
          <p className="mt-4 text-ink-700">
            Most rent-vs-buy debates compare a $2,250 rent check to a $2,160
            mortgage payment and declare buying the winner. That comparison
            ignores $900–$1,100 in monthly costs that homeowners pay and
            renters never see. At 7.40% interest on a 30-year fixed loan (Freddie
            Mac PMMS, week of October 15, 2026), the sticker price is only the
            starting point.
          </p>
          <p className="mt-4 text-ink-700">
            Consider a $390,000 home with 20% down ($78,000). Your loan is
            $312,000. Principal and interest run $2,160 per month at the
            October 15, 2026 PMMS average of 7.40%. Property tax at 1.2% adds
            $390 per month (above the roughly 0.89% U.S. effective rate implied
            by 2024 Census ACS aggregates, but typical in many counties).
            Homeowner's
            insurance at 0.55% of value costs $179 per month. Maintenance and
            repairs at 1.5% of home value — the midpoint of the 1–2% rule — add
            $488 per month. Your true monthly ownership cost is $3,216, not
            $2,160. That is $966 more than the $2,250 rent payment next door (a
            worked example; the Census ACS 2024 U.S. median gross rent was
            $1,487).
          </p>
          <p className="mt-4 text-ink-700">
            Rates climbed from 6.65% (August 20, 2026 PMMS) to 7.40% (October
            15, 2026), adding about $157 per month in P&I on a $312,000
            loan — roughly $56,600 more interest over 30 years than financing
            at 6.65% (PMMS week of August 20, 2026).
          </p>
          <p className="mt-4 text-ink-700">
            Upfront costs widen the gap further. Closing costs on a $390,000
            purchase typically run $7,800 to $19,500 (2–5% of the purchase
            price per the CFPB, excluding the down payment). Title insurance,
            appraisal fees, lender origination charges, and prepaid property
            taxes all hit at closing. A $78,000 down payment plus $11,700 in
            closing costs (3% midpoint) means $89,700 leaves your bank account
            before you hang a single picture.
          </p>
          <p className="mt-4 text-ink-700">
            Then there is opportunity cost — the investment return you give up
            by tying cash in a house. If you invested that $78,000 down payment
            in a diversified stock portfolio at a hypothetical 7% long-term
            annual return (historical U.S. stock returns have averaged near 10%
            over very long periods but vary sharply year to year), it could grow
            to roughly $153,400 over 10 years — not a guarantee. Parked in an
            FDIC-insured savings account at the October 2026 national average
            rate of 0.38%, it earns about $296 per year. Renters keep capital
            liquid; buyers convert it to illiquid home equity.
          </p>
          <Sources
            items={[
              {
                label:
                  "Freddie Mac PMMS (30-year FRM 7.40%, Oct. 15, 2026)",
                href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-hold-steady-740/",
              },
              {
                label:
                  "CFPB, closing costs typically 2–5% of purchase price",
                href: "https://www.consumerfinance.gov/owning-a-home/prepare/determine-your-down-payment/",
              },
              {
                label:
                  "U.S. Census Bureau, ACS 2024 tables B25090 & B25082 (national effective property tax rate ~0.89%)",
                href: "https://data.census.gov/table/ACSDT1Y2024.B25090",
              },
              {
                label: "Census ACS 2024, U.S. median gross rent $1,487",
                href: "https://data.census.gov/table/ACSDT1Y2024.B25064",
              },
              {
                label:
                  "FDIC national deposit rates (savings 0.38%, October 2026 release)",
                href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
              },
            ]}
            checked="October 2026"
            note="National effective property tax rate (~0.89%) = aggregate real estate taxes on owner-occupied homes (ACS table B25090) divided by aggregate home value (B25082). Insurance and maintenance percentages are planning assumptions."
          />

          <h3 className="mt-8 text-xl font-semibold text-ink-800">
            Hidden Costs Most Renters Never Pay
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Cost Category
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-800">
                    Renting ($2,250/mo)
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-800">
                    Buying ($390K home)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Monthly housing payment</td>
                  <td className="px-4 py-3 text-right">$2,250</td>
                  <td className="px-4 py-3 text-right">$2,160 (P&I)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Property tax</td>
                  <td className="px-4 py-3 text-right">$0</td>
                  <td className="px-4 py-3 text-right">$390</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Homeowner's insurance</td>
                  <td className="px-4 py-3 text-right">$0 (renter's ~$18)</td>
                  <td className="px-4 py-3 text-right">$179</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Maintenance & repairs (1.5%/yr)</td>
                  <td className="px-4 py-3 text-right">$0</td>
                  <td className="px-4 py-3 text-right">$488</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Upfront costs</td>
                  <td className="px-4 py-3 text-right">$2,250 (deposit)</td>
                  <td className="px-4 py-3 text-right">$89,700 (down + closing)</td>
                </tr>
                <tr className="border-t-2 border-ink-200 font-semibold">
                  <td className="px-4 py-3">True monthly cost</td>
                  <td className="px-4 py-3 text-right text-brand-700">$2,250</td>
                  <td className="px-4 py-3 text-right">$3,216</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Assumes $390,000 purchase, 20% down, $312,000 loan at 7.40% for 30
            years, 1.2% property tax, 0.55% insurance. Maintenance at 1.5% of home
            value per year. PMMS rate as of October 15, 2026.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Important Caveat</p>
            <p className="mt-1 text-sm text-amber-700">
              Renters who invest the $966 monthly difference ($11,592/year) at a
              hypothetical 7% long-term return build about $167,200 from those
              contributions alone over 10 years — on top of keeping their
              $78,000 down payment invested (roughly $314,000 combined at 7%,
              not guaranteed). Buying only wins if home appreciation and equity
              paydown exceed that renter wealth.
            </p>
          </div>
        </section>

        {/* Section 2: Break-Even Analysis */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Break-Even Analysis: How Long Must You Stay?
          </h2>
          <p className="mt-4 text-ink-700">
            The break-even point is when the total cost of buying equals the
            total cost of renting, accounting for equity gained through mortgage
            paydown and home appreciation. By mid-October 2026, PMMS 30-year
            fixed rates averaged 7.40% — up from 6.65% in August and well above
            the 3% era when break-even often hit in 3 to 4 years.
          </p>
          <p className="mt-4 text-ink-700">
            On the $390,000 home scenario above, buying starts $966 per month
            more expensive than renting from day one. Over the first year, that
            gap totals $11,592 in extra out-of-pocket costs, plus $11,700 in
            closing fees — $23,292 before counting equity from appreciation.
            At 2.6% annual home appreciation (FHFA national HPI, July 2025 to
            July 2026, released September 29, 2026), the property gains about
            $10,140 in value in year one. Mortgage principal paydown adds
            roughly $2,933 at 7.40%. Combined, you recover about $13,073
            against $23,292 in excess cash costs — still underwater after year
            one in this simplified cash-flow view.
          </p>
          <p className="mt-4 text-ink-700">
            By year 5, cumulative extra ownership costs reach approximately
            $69,660 ($966/month × 60 months + $11,700 closing). Equity from
            appreciation (about $51,500 cumulative at 2.6%/year compounded)
            plus principal paydown (about $16,800) totals roughly $68,300 on top
            of the original $78,000 down payment — putting net housing cost near
            break-even with renting around years 4–5 in this scenario. If
            appreciation slows to 1%, break-even pushes toward year 6 or later.
          </p>
          <p className="mt-4 text-ink-700">
            At 7.40% mortgage rates, many planners cite 4.5 to 6 years as a
            typical break-even range nationally — longer than when rates were
            near 6.5% mid-year. Faster-appreciation metros can break even
            sooner; slow-growth markets can take 7 to 9 years. If you sell before
            break-even, you also pay 5–6% in agent commissions
            ($19,500–$23,400 on a $390,000 home), which can erase another year
            of equity gains.
          </p>
          <p className="mt-4 text-ink-700">
            The 7.40% rate environment skews early payments heavily toward
            interest. On a $312,000 loan at 7.40%, you pay about $22,990 in
            interest in year one versus roughly $2,933 toward principal. At 3%,
            that ratio was roughly $9,000 interest and $6,800 principal.
          </p>
          <Sources
            items={[
              {
                label:
                  "FHFA, U.S. house prices up 2.6% year-over-year (July 2025–July 2026; release Sept. 29, 2026)",
                href: "https://www.fhfa.gov/reports/house-price-index/2026/9",
              },
              {
                label:
                  "Freddie Mac PMMS archive (30-year rates Aug.–Oct. 2026)",
                href: "https://www.freddiemac.com/pmms/archive",
              },
            ]}
            checked="October 2026"
            note="Break-even timing depends on rent growth, taxes, maintenance, and whether you invest the monthly gap."
          />
        </section>

        {/* Section 3: Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Side-by-Side: $2,250/Month Rent vs. $390,000 Home Purchase
          </h2>
          <p className="mt-4 text-ink-700">
            The table below compares renting at $2,250/month against buying a
            $390,000 home with 20% down ($78,000), a $312,000 mortgage at 7.40%,
            and $11,700 in closing costs. Rent assumes 3% annual increases.
            Home assumes 2.6% annual appreciation (FHFA national year-over-year
            rate through July 2026).
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Rent ($2,250/mo)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Buy ($390K home)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Monthly cost (year 1)</td>
                  <td className="px-4 py-3">$2,250</td>
                  <td className="px-4 py-3">$3,216</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Upfront cash required</td>
                  <td className="px-4 py-3">$2,250 (deposit)</td>
                  <td className="px-4 py-3">$89,700 (down + closing)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">5-year total housing spend</td>
                  <td className="px-4 py-3">$143,347</td>
                  <td className="px-4 py-3">$204,660</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">5-year equity / net position</td>
                  <td className="px-4 py-3">$0 equity</td>
                  <td className="px-4 py-3 font-medium text-brand-700">~$148,500 equity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">5-year net cost (spend minus equity)</td>
                  <td className="px-4 py-3">$143,347</td>
                  <td className="px-4 py-3 font-medium text-brand-700">~$56,170</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">10-year total housing spend</td>
                  <td className="px-4 py-3">$309,525</td>
                  <td className="px-4 py-3">$397,676</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">10-year equity / net position</td>
                  <td className="px-4 py-3">$0 equity</td>
                  <td className="px-4 py-3 font-medium text-brand-700">~$234,000 equity</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">10-year net cost (spend minus equity)</td>
                  <td className="px-4 py-3">$309,525</td>
                  <td className="px-4 py-3 font-medium text-brand-700">~$163,700</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Break-even timeline</td>
                  <td className="px-4 py-3">N/A</td>
                  <td className="px-4 py-3">~4–5 years</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Flexibility to relocate</td>
                  <td className="px-4 py-3 font-medium text-brand-700">30-day notice</td>
                  <td className="px-4 py-3">3–6 months to sell</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Net cost = total cash spent minus home equity (down payment + principal
            paydown + appreciation at 2.6%/year). Does not include opportunity cost
            of invested down payment or selling costs. Rent total includes 3%
            annual increases. Rate: 7.40% 30-year fixed (PMMS, Oct. 15, 2026).
          </p>
        </section>

        {/* Section 4: Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Kevin and Lisa, $130K Combined, Charlotte, NC
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Their Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Combined gross income: $130,000/year ($10,833/month)</li>
                  <li>Take-home pay: ~$8,100/month after taxes and 401(k)</li>
                  <li>Current rent: $2,200/month for a 2-bedroom apartment</li>
                  <li>Target purchase: $365,000 townhouse in South Charlotte</li>
                  <li>Savings: $78,000 ($55,000 earmarked for down payment)</li>
                  <li>Existing debts: $340/month (student loans + one car)</li>
                  <li>Both employed 4+ years, expect to stay 8–10 years</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">The Numbers</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Down payment (20%): $73,000 on $365,000 purchase</li>
                  <li>Loan amount: $292,000 at 7.40%, 30-year fixed (PMMS Oct. 15, 2026)</li>
                  <li>P&I payment: $2,022/month</li>
                  <li>Property tax: $292/month (0.96% planning rate; Mecklenburg County levy 48.31¢ per $100 for FY2025 plus city taxes)</li>
                  <li>Insurance: $167/month (0.55% planning assumption)</li>
                  <li>Maintenance (1.5%): $456/month</li>
                  <li>True monthly ownership cost: $2,937/month</li>
                  <li>Closing costs: ~$10,950 (3% of purchase price)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">The Decision</h4>
              <p className="mt-2 text-sm text-ink-700">
                Kevin and Lisa face a $737/month premium to own ($2,937 vs.
                $2,200 rent). Their total housing cost would be 27.1% of gross
                income — within the 28% guideline. Total debt ratio
                with their $340/month obligations hits 30.2%, still under the 36%
                lender limit. FHFA data show Charlotte metro house prices up
                about 1.4% year-over-year through Q2 2026, which modestly
                shortens break-even versus the national 2.6% pace.
              </p>
              <p className="mt-2 text-sm text-ink-700">
                They chose to buy — but with conditions. They kept $23,000 of
                their $78,000 savings as an emergency fund (2.8 months of
                expenses) rather than pushing to a 25% down payment. They budget
                $456/month for maintenance from day one. Lisa's employer
                requires in-office presence, and Kevin's remote role is
                stable for at least 3 years with a contract extension likely.
                Their 8–10 year horizon exceeds a roughly 4-year break-even in
                this scenario, and Charlotte's purchase price ($365,000) sits
                below the Census median new-home sale price of $410,700 (Q2
                2026). Financing at 7.40% instead of 6.65% (August 2026 PMMS)
                costs them about $147/month more in P&I on their $292,000
                loan — roughly $53,000 more interest over 30 years than at
                6.65%. If either had expected a move within
                4 years, renting at $2,200 and investing the $737 difference
                would have been the smarter financial move.
              </p>
            </div>
          </div>
          <Sources
            items={[
              {
                label:
                  "FHFA / FRED, Charlotte-Concord-Gastonia HPI (Q2 2026)",
                href: "https://fred.stlouisfed.org/series/ATNHPIUS16740Q",
              },
              {
                label:
                  "Census / HUD, median new home sale price $410,700 (Q2 2026)",
                href: "https://fred.stlouisfed.org/series/MSPUS",
              },
              {
                label:
                  "Mecklenburg County, FY2025 property tax rate 48.31¢ per $100",
                href: "https://news.mecknc.gov/bocc-adopts-25-billion-operating-budget-fy2025",
              },
            ]}
            checked="October 2026"
          />
        </section>

        {/* Section 5: When to Rent */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When Renting Is the Smarter Financial Move
          </h2>
          <p className="mt-4 text-ink-700">
            Renting is not a failure — it is often the optimal choice. Here are
            the situations where signing a lease beats signing a mortgage in
            2026:
          </p>
          <ul className="mt-4 space-y-3 text-ink-700">
            <li>
              <strong>You plan to move within 4 to 5 years.</strong> Selling
              costs (5–6% commission), closing costs, and the front-loaded
              interest on a 7.40% mortgage mean short-term owners rarely come out
              ahead. A 3-year stay on a $390,000 home typically costs $30,000–$40,000
              more than renting after selling fees.
            </li>
            <li>
              <strong>Your income is unstable or variable.</strong> Commission
              sales, freelance work, startup equity, or a single-income household
              with one partner considering a career change all increase risk. A
              $3,216 monthly ownership cost is fixed; a $2,250 lease gives you
              flexibility to downsize if income drops 30%.
            </li>
            <li>
              <strong>Local home prices are elevated relative to rents.</strong>{" "}
              When the price-to-rent ratio exceeds 20 (home price divided by
              annual rent), buying rarely makes financial sense. A $390,000 home
              renting for $2,250/month has a ratio of 14.4 — borderline. In San
              Francisco, where a $1.3 million condo rents for $3,600/month (ratio
              30.1), renting is almost always cheaper.
            </li>
            <li>
              <strong>You need career flexibility.</strong> Relocating for a
              $25,000 raise, accepting a 2-year assignment in another city, or
              pursuing an advanced degree all favor renting. Breaking a lease
              costs 1–2 months' rent ($2,250–$4,500). Selling a home costs
              $19,500–$23,400 plus 60–120 days on market.
            </li>
            <li>
              <strong>Buying would drain your emergency fund below 3 months.</strong>{" "}
              If a $78,000 down payment plus $11,700 closing costs leaves you
              with less than $15,000 in liquid savings on a $5,000/month
              budget, one HVAC failure ($8,500) or job loss creates a crisis.
              Renters call the landlord; homeowners write the check.
            </li>
          </ul>
        </section>

        {/* Section 6: When to Buy */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When Buying Makes Financial Sense
          </h2>
          <p className="mt-4 text-ink-700">
            Buying builds wealth through forced savings (mortgage principal
            paydown) and appreciation — but only if you stay long enough and
            buy within your means. These conditions favor purchasing in 2026:
          </p>
          <ul className="mt-4 space-y-3 text-ink-700">
            <li>
              <strong>You will stay 6 or more years.</strong> At 7.40% rates,
              years 5 to 6 is often where cumulative equity on a $390,000 home
              at roughly 2.6% FHFA-style appreciation exceeds the total premium paid
              over renting plus all transaction costs. Every year beyond 6 widens
              the gap in the buyer's favor.
            </li>
            <li>
              <strong>You have stable, predictable income.</strong> Dual-income
              households with 5+ years at current employers, W-2 salaried roles,
              and total housing under 28% of gross income ($3,033/month on
              $130,000/year) can absorb the $966/month ownership premium without
              sacrificing retirement savings or emergency fund contributions.
            </li>
            <li>
              <strong>You can put 20% down without touching your emergency fund.</strong>{" "}
              A $78,000 down payment on a $390,000 home plus $11,700 closing
              costs requires $89,700 upfront — and you should still have
              $20,000–$30,000 in liquid savings afterward. Kevin and Lisa kept
              $23,000 in reserve; that discipline is what makes buying safe.
            </li>
            <li>
              <strong>You want to build equity and control your housing costs.</strong>{" "}
              A fixed 7.40% mortgage payment stays $2,160 for 30 years while
              rent rises 3% annually ($2,250 today becomes $3,024 in 10 years).
              After year 10, the buyer's monthly cost advantage grows every
              year as rent climbs and the mortgage stays flat.
            </li>
            <li>
              <strong>Tax benefits apply to your situation.</strong> If you
              itemize deductions and your combined mortgage interest (about
              $22,990 in year one on a $312,000 loan at 7.40%) plus property
              taxes exceed the {usd(STANDARD_DEDUCTIONS.mfj)} standard deduction
              for {TAX_DATA.taxYear} married filing jointly, the mortgage
              interest deduction could lower your effective borrowing cost. On
              this scenario, year-one interest plus $4,680 property tax totals
              about $27,670 — below the standard deduction, so many couples still
              take the standard amount.               IRS Statistics of Income (Publication 4801, tax year 2023) show
              about 9.5% of returns filed Schedule A; verify your situation.
            </li>
          </ul>
          <Sources
            items={[
              TAX_SOURCES.revProc,
              {
                label:
                  "IRS SOI Publication 4801 (Rev. 6-2026), Schedule A filings tax year 2023",
                href: "https://www.irs.gov/pub/irs-access/p4801_accessible.pdf",
              },
              {
                label:
                  "SEC, Beginners' Guide to Asset Allocation (stocks and long-term risk)",
                href: "https://www.sec.gov/about/reports-publications/investorpubsassetallocationhtm",
              },
            ]}
            checked={TAX_DATA.checkedOnLabel}
            note={`Standard deduction shown is ${usd(STANDARD_DEDUCTIONS.mfj)} MFJ for tax year ${TAX_DATA.taxYear}.`}
          />
        </section>

        {/* Section 7: Step-by-Step Framework */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step Decision Framework
          </h2>
          <p className="mt-4 text-ink-700">
            Work through these five steps in order. Each one either qualifies you
            to buy or points you toward renting for now.
          </p>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Confirm your timeline: how long will you stay?
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  If the answer is under 4 to 5 years, rent unless you have a
                  strong reason unrelated to money (aging parents nearby, kids in
                  a specific school district with no rental options). At 7.40%
                  PMMS rates, break-even often requires at least 4.5 years in most markets.
                  Write down a realistic year count — not "forever,"
                  but "until 2034 when our youngest starts college."
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Calculate true monthly cost for both options
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  For buying, add P&I + property tax + insurance + maintenance
                  (1–2% of home value/year). For renting, include renter's
                  insurance (~$18/month). Compare the gap — if it exceeds 25% of
                  your take-home pay, buying may strain your budget. On $8,100
                  take-home, a $737/month gap (Kevin and Lisa) is 9.1% —
                  manageable. A $1,200 gap would be 14.8% — risky.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Verify you can afford the down payment plus reserves
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  You need 20% down ($73,000 on a $365,000 home), $8,000–$15,000
                  closing costs, and 3–6 months of expenses ($15,000–$30,000)
                  remaining in savings after closing. Total required: roughly
                  $96,000–$118,000 in accessible funds. If you have $75,000
                  total, you are not ready to buy a $365,000 home — Kevin and
                  Lisa had just enough because their target price matched their
                  savings.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Run the break-even calculation for your market
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Plug your rent, target home price, down payment, rate, and
                  expected appreciation into our{" "}
                  <Link
                    href="/calculators/rent-vs-buy"
                    className="text-brand-600 underline"
                  >
                    Rent vs Buy Calculator
                  </Link>
                  . If break-even exceeds your planned stay by 2+ years, renting
                  wins on math alone.                   Charlotte at roughly 2–3% annual appreciation broke even
                  in about 4 years for Kevin and Lisa; a flat market at 1% would
                  push that to 6+ years.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                5
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Factor in non-financial priorities, then decide
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Stability for children, freedom from landlord rules, ability to
                  renovate, and pride of ownership have real value — but assign
                  them a dollar figure. If owning costs $737/month more and
                  break-even is 4 years, you are paying $35,400 in premium over
                  4 years for intangibles. If that trade-off feels worth it and
                  steps 1–4 check out, buy. If the math fails step 4, rent and
                  revisit when rates drop further or your timeline lengthens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Run Your Rent vs Buy Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Every market, income, and timeline produces a different answer. Use
            our free calculators to compare your exact rent payment against the
            true cost of owning.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/rent-vs-buy"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Rent vs Buy Calculator
            </Link>
            <Link
              href="/calculators/mortgage"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Mortgage Calculator
            </Link>
            <Link
              href="/calculators/home-affordability"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Home Affordability Calculator
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-ink-200 bg-white"
              >
                <summary className="cursor-pointer px-5 py-4 font-medium text-ink-800 hover:text-brand-600">
                  {faq.question}
                </summary>
                <p className="px-5 pb-4 text-sm text-ink-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <RelatedGuides currentSlug="rent-vs-buy-decision" relatedSlugs={["how-much-house-can-i-afford", "15-year-vs-30-year-mortgage"]} />
      </article>
    </>
  );
}
