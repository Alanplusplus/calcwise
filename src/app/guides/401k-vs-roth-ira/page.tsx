import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "401(k) vs Roth IRA: Which Retirement Account Is Better for You?",
  description:
    "Compare 401(k) vs Roth IRA in 2026: contribution limits, tax treatment, employer match, income limits, and which account fits your income and career stage.",
  keywords: [
    "401k vs Roth IRA",
    "Roth IRA vs 401k",
    "401k or Roth IRA which is better",
    "retirement account comparison",
    "Roth IRA contribution limits 2026",
    "401k contribution limits 2026",
  ],
};

const faqs = [
  {
    question: "Should I contribute to a 401(k) or Roth IRA first?",
    answer:
      "Contribute enough to your 401(k) to capture your full employer match first — that is an immediate 50-100% return. Then max a Roth IRA ($7,000 in 2026) if your income is below the limits ($161,000 single / $240,000 married filing jointly). After that, return to your 401(k) and contribute up to the $23,500 limit. This hybrid approach captures free employer money, builds tax-free Roth assets, and maximizes total tax-advantaged savings.",
  },
  {
    question: "Can I have both a 401(k) and a Roth IRA?",
    answer:
      "Yes, and most people should. A 401(k) and Roth IRA are separate accounts with separate contribution limits. In 2026 you can contribute up to $23,500 to a 401(k) and $7,000 to a Roth IRA — $30,500 total — as long as your income is below the Roth IRA phase-out thresholds. Having both gives you tax diversification: pre-tax 401(k) withdrawals and tax-free Roth withdrawals in retirement.",
  },
  {
    question: "Is a Roth IRA better than a 401(k) for taxes?",
    answer:
      "It depends on your current versus expected future tax rate. A traditional 401(k) saves taxes now but you pay ordinary income tax on withdrawals. A Roth IRA offers no deduction now but all qualified withdrawals are tax-free. If you are in a low tax bracket early in your career (12-22%), Roth often wins. If you are in a high bracket now (32%+) and expect a lower bracket in retirement, the traditional 401(k) usually wins.",
  },
  {
    question: "What happens if I earn too much for a Roth IRA?",
    answer:
      "In 2026, Roth IRA contributions phase out for single filers with modified adjusted gross income between $161,000 and $176,000, and for married couples filing jointly between $240,000 and $250,000. Above those ranges, direct Roth contributions are not allowed. High earners can use a backdoor Roth IRA (contribute to a traditional IRA, then convert to Roth), though the pro-rata rule applies if you hold existing traditional IRA balances.",
  },
  {
    question: "Does a Roth IRA have required minimum distributions (RMDs)?",
    answer:
      "No. Roth IRAs have no RMDs during the original account owner's lifetime, which makes them powerful estate planning tools. Traditional 401(k) accounts require RMDs starting at age 73 under current law (SECURE 2.0). Roth 401(k) accounts also had RMDs, but starting in 2024 Roth 401(k) balances are exempt from RMDs — though rolling to a Roth IRA remains a common strategy for flexibility.",
  },
];

export default function FourOhOneKVsRothIraGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="401(k) vs Roth IRA: Which Retirement Account Is Better for You?"
        description="Compare 401(k) vs Roth IRA in 2026: contribution limits, tax treatment, employer match, income limits, and which account fits your income and career stage."
        slug="401k-vs-roth-ira"
        datePublished="2026-08-24"
        image="/images/guides/401k-vs-roth-ira.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "401(k) vs Roth IRA",
            href: "/guides/401k-vs-roth-ira",
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Retirement Planning
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            401(k) vs Roth IRA: Which Retirement Account Is Better for You?
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            The 401(k) vs Roth IRA debate is not about picking one winner — it
            is about understanding how each account taxes your money differently
            and which fits your current income, career trajectory, and retirement
            timeline. This guide breaks down the 2026 rules, runs the numbers on
            a real case study, and shows you the hybrid strategy most financial
            planners recommend.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: August 2026</p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>401(k) in 2026:</strong> Contribute up to $23,500 pre-tax;
              employer match is free money you should never leave on the table
            </li>
            <li>
              <strong>Roth IRA in 2026:</strong> Contribute up to $7,000
              after-tax; all qualified withdrawals are tax-free in retirement
            </li>
            <li>
              <strong>401(k) wins when:</strong> You are in a high tax bracket
              now, your employer offers a match, or you earn above Roth income
              limits ($161K single / $240K married)
            </li>
            <li>
              <strong>Roth wins when:</strong> You are early in your career in a
              lower bracket, expect higher taxes in retirement, or want tax
              diversification and penalty-free access to contributions
            </li>
            <li>
              <strong>Best strategy for most people:</strong> Get the full 401(k)
              match, max the Roth IRA, then fill remaining capacity in the 401(k)
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Model your retirement with our{" "}
            <Link
              href="/calculators/retirement"
              className="font-medium text-brand-600 underline"
            >
              Retirement Calculator
            </Link>
            ,{" "}
            <Link
              href="/calculators/compound-interest"
              className="font-medium text-brand-600 underline"
            >
              Compound Interest Calculator
            </Link>
            , and{" "}
            <Link
              href="/calculators/income-tax"
              className="font-medium text-brand-600 underline"
            >
              Income Tax Calculator
            </Link>
            .
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/401k-vs-roth-ira.webp"
              alt="Infographic comparing 401(k) and Roth IRA: pre-tax vs after-tax contributions, 2026 contribution limits of $23,500 and $7,000, employer match, income limits, and withdrawal rules"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Side-by-side comparison of 401(k) and Roth IRA tax treatment, limits, and withdrawal rules for 2026
            </figcaption>
          </figure>
        </section>

        {/* Key Differences */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Key Differences: Pre-Tax vs After-Tax
          </h2>
          <p className="mt-4 text-ink-700">
            The fundamental split between a 401(k) and a Roth IRA comes down to
            when you pay taxes. A traditional 401(k) reduces your taxable income
            today — you contribute pre-tax dollars, investments grow tax-deferred,
            and you pay ordinary income tax on every dollar you withdraw in
            retirement. A Roth IRA flips that timeline: you contribute
            after-tax dollars now, investments grow tax-free, and qualified
            withdrawals in retirement are completely tax-free.
          </p>
          <p className="mt-4 text-ink-700">
            That timing difference sounds abstract until you put real numbers on
            it. A $23,500 contribution to a traditional 401(k) for someone in the
            22% federal bracket saves $5,170 in taxes this year. The same person
            putting $7,000 into a Roth IRA gets no deduction — but every dollar
            of growth over the next 30 years comes out untaxed.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            2026 Contribution Limits
          </h3>
          <p className="mt-2 text-ink-700">
            The IRS sets separate limits for each account type. These limits
            apply to your employee contributions — employer matching dollars do
            not count against your personal cap.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
              <p className="font-semibold text-ink-800">401(k)</p>
              <p className="mt-1 text-2xl font-bold text-brand-700">$23,500</p>
              <p className="mt-1 text-sm text-ink-600">
                Employee contribution limit. Workers age 50+ can add a $7,500
                catch-up contribution for a total of $31,000.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
              <p className="font-semibold text-ink-800">Roth IRA</p>
              <p className="mt-1 text-2xl font-bold text-brand-700">$7,000</p>
              <p className="mt-1 text-sm text-ink-600">
                Combined limit for Roth and traditional IRA contributions. Age
                50+ catch-up adds $1,000 for a total of $8,000.
              </p>
            </div>
          </div>
          <p className="mt-4 text-ink-700">
            Combined, a worker under 50 can funnel up to $30,500 per year into
            tax-advantaged retirement accounts — plus whatever employer match
            their company adds on top. That is a meaningful gap from the Roth IRA
            alone, which is one reason the 401(k) remains the primary retirement
            vehicle for most Americans.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            401(k) vs Roth IRA: Full Comparison
          </h2>
          <p className="mt-4 text-ink-700">
            Use this table as a quick reference when deciding where to allocate
            your next retirement dollar. The right column is not always better —
            context determines the winner.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    401(k) (Traditional)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Roth IRA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3 font-medium">Contribution limit (2026)</td>
                  <td className="px-4 py-3">$23,500 ($31,000 age 50+)</td>
                  <td className="px-4 py-3">$7,000 ($8,000 age 50+)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Tax treatment</td>
                  <td className="px-4 py-3">Pre-tax in, taxed on withdrawal</td>
                  <td className="px-4 py-3">After-tax in, tax-free out</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Employer match</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Yes — often 50-100% of first 3-6%</td>
                  <td className="px-4 py-3">No employer involvement</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Income limits</td>
                  <td className="px-4 py-3">None for participation</td>
                  <td className="px-4 py-3">Phase-out above $161K single / $240K married</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Withdrawal rules</td>
                  <td className="px-4 py-3">Penalty before age 59½ (10% + taxes)</td>
                  <td className="px-4 py-3">Contributions anytime; earnings after 59½ + 5-year rule</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Required minimum distributions</td>
                  <td className="px-4 py-3">Yes — starting at age 73</td>
                  <td className="px-4 py-3 font-medium text-brand-700">No RMDs during owner&apos;s lifetime</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Investment options</td>
                  <td className="px-4 py-3">Limited to plan menu (often 15-30 funds)</td>
                  <td className="px-4 py-3">Full brokerage choice (stocks, ETFs, bonds)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">Loans</td>
                  <td className="px-4 py-3">Some plans allow 401(k) loans</td>
                  <td className="px-4 py-3">No loan provision</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When 401k Wins */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When a 401(k) Wins
          </h2>
          <p className="mt-4 text-ink-700">
            A traditional 401(k) is the better choice in several specific
            situations. If any of these describe you, prioritize maxing your
            401(k) before directing extra dollars to a Roth IRA.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            You Are in a High Tax Bracket Now
          </h3>
          <p className="mt-2 text-ink-700">
            If you are earning $150,000+ and sitting in the 24-32% federal bracket,
            every pre-tax 401(k) dollar saves you $2,400-$3,200 in immediate taxes.
            If you expect to retire into a lower bracket — drawing $80,000/year
            from a paid-off home in a no-income-tax state puts you in the 12-22%
            range — you are effectively prepaying taxes at a higher rate by
            choosing Roth over traditional. The 401(k) lets you defer that bill.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Your Employer Offers a Match
          </h3>
          <p className="mt-2 text-ink-700">
            Employer matching is the single highest-return investment available
            to most workers. A typical match — 50% of contributions up to 6% of
            salary — on a $95,000 income adds $2,850 per year in free money. That
            is an instant 50% return before any market growth. No Roth IRA
            contribution can replicate that. Always contribute at least enough to
            capture the full match before funding a Roth IRA.
          </p>
          <div className="mt-4 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">The Match Math</p>
            <p className="mt-1 text-sm text-brand-700">
              On a $95,000 salary with a 50% match up to 6%: contributing 6%
              ($5,700) triggers a $2,850 employer deposit. Over 30 years at 7%
              average return, that match alone grows to approximately $287,000 —
              money you never would have had without the 401(k).
            </p>
          </div>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            You Earn Above Roth IRA Income Limits
          </h3>
          <p className="mt-2 text-ink-700">
            In 2026, direct Roth IRA contributions phase out for single filers
            with modified adjusted gross income above $161,000 and married couples
            above $240,000. If you are above those thresholds, a Roth IRA is not
            an option without a backdoor conversion strategy. Your 401(k) becomes
            the primary tax-advantaged account by default — and its $23,500 limit
            is more than three times the Roth cap anyway.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            You Need the Higher Contribution Ceiling
          </h3>
          <p className="mt-2 text-ink-700">
            Aggressive savers who want to put away more than $7,000 per year in
            tax-advantaged accounts have no choice but the 401(k). Pair it with
            an HSA ($4,300 individual / $8,550 family in 2026) and you can
            shelter up to $32,050 per year before touching taxable accounts.
          </p>
        </section>

        {/* When Roth Wins */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When a Roth IRA Wins
          </h2>
          <p className="mt-4 text-ink-700">
            Roth accounts shine in the opposite scenarios — lower income today,
            higher expected taxes tomorrow, and when flexibility matters as much
            as raw contribution limits.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Early Career, Lower Tax Bracket
          </h3>
          <p className="mt-2 text-ink-700">
            A 28-year-old earning $55,000 sits in the 12% federal bracket. Paying
            12% tax on Roth contributions now — when they are likely at their
            lifetime tax low — is far cheaper than paying 22-24% on traditional
            401(k) withdrawals decades later. Every year you are in the 12-22%
            bracket is a Roth opportunity. The tax you pay today is the lowest
            rate you will ever lock in on that money.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            You Expect Higher Taxes in Retirement
          </h3>
          <p className="mt-2 text-ink-700">
            If you believe tax rates will rise — due to national debt, policy
            changes, or your own income growth — paying taxes now at today&apos;s
            rates is a hedge. A $7,000 Roth contribution today that grows to
            $56,000 over 30 years at 7% comes out entirely tax-free. The same
            growth in a traditional 401(k) would trigger roughly $12,320-$18,480
            in federal taxes on withdrawal, depending on your retirement bracket.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Tax Diversification
          </h3>
          <p className="mt-2 text-ink-700">
            Retirees with only traditional 401(k) balances face a tax bill on
            every withdrawal — including Social Security, which becomes partially
            taxable once other income exceeds thresholds. A Roth IRA balance gives
            you a tax-free bucket to draw from strategically. You can pull Roth
            money to stay below a tax bracket threshold, reduce Medicare IRMAA
            surcharges, or qualify for ACA premium subsidies during early
            retirement before Medicare at 65.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-ink-800">
            Flexibility and No RMDs
          </h3>
          <p className="mt-2 text-ink-700">
            Roth IRA contributions (not earnings) can be withdrawn at any time
            without penalty. And unlike a 401(k), there are no required minimum
            distributions — you can let a Roth compound untouched and pass it to
            heirs tax-free.
          </p>
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Priya, 32, Product Manager in Austin
          </h2>
          <p className="mt-4 text-ink-700">
            Priya earns $95,000 as a product manager at a tech company in Austin,
            Texas. Texas has no state income tax, so her federal bracket (22%
            marginal, roughly 14% effective) drives the analysis. Her employer
            matches 50% of contributions up to 6% of salary. She has $44,000 in
            her 401(k) and $9,000 in a Roth IRA, and she can allocate $1,625 per
            month ($19,500/year) toward retirement beyond the match.
          </p>

          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Current Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Age: 32 (target retirement: 62)</li>
                  <li>Salary: $95,000/year</li>
                  <li>401(k) balance: $44,000</li>
                  <li>Roth IRA balance: $9,000</li>
                  <li>Employer match: 50% up to 6% ($2,850/year at full match)</li>
                  <li>Available for retirement savings: $19,500/year + match</li>
                  <li>Assumed return: 7% average annual</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Two Strategies Compared</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>
                    <strong>Strategy A (401(k)-heavy):</strong> $19,500 to 401(k)
                    + $2,850 match = $22,350/year pre-tax
                  </li>
                  <li>
                    <strong>Strategy B (Hybrid):</strong> $5,700 to 401(k) (match)
                    + $7,000 Roth IRA + $6,800 to 401(k) + $2,850 match =
                    $22,350/year total
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                30-Year Projection: Strategy A (401(k)-Heavy)
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                <li>
                  Existing $44,000 growing at 7% for 30 years: $44,000 x 1.07^30 =
                  $335,073
                </li>
                <li>
                  $22,350/year invested for 30 years at 7%: approximately $2,247,000
                  in total contributions + growth
                </li>
                <li>
                  <strong>Total pre-tax balance at 62: ~$2,582,073</strong>
                </li>
                <li>
                  Estimated taxes on withdrawal at 18% effective rate: ~$464,773
                </li>
                <li>
                  <strong>After-tax spendable amount: ~$2,117,300</strong>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                30-Year Projection: Strategy B (Hybrid with Roth IRA)
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                <li>
                  Existing 401(k) $44,000 + Roth $9,000 = $53,000 growing at 7%
                  for 30 years: $53,000 x 1.07^30 = $403,495
                </li>
                <li>
                  $15,350/year to 401(k) (including match) for 30 years at 7%:
                  approximately $1,543,000
                </li>
                <li>
                  $7,000/year to Roth IRA for 30 years at 7%: approximately
                  $703,000 (all tax-free)
                </li>
                <li>
                  <strong>Total balance at 62: ~$2,649,495</strong>
                </li>
                <li>
                  Roth portion ($703,000 + growth on $9,000): ~$820,000 completely
                  tax-free
                </li>
                <li>
                  401(k) portion after 18% effective tax: ~$1,505,000 spendable
                </li>
                <li>
                  <strong>After-tax spendable amount: ~$2,325,000</strong>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">What Priya Should Do</h4>
              <p className="mt-2 text-sm text-ink-700">
                Strategy B leaves Priya with roughly <strong>$207,700 more in
                after-tax retirement wealth</strong> over 30 years — not because
                Roth magically earns more, but because she pays 22% tax on $7,000
                now while she is in a moderate bracket, rather than paying a
                potentially higher rate on a much larger withdrawal decades later.
                The hybrid approach also gives her a $820,000 tax-free bucket for
                flexible withdrawals, ACA subsidy management if she retires before
                65, and no RMDs on the Roth portion. At her income level, Strategy
                B is the clear winner — but the 401(k) match remains non-negotiable
                in either scenario.
              </p>
            </div>
          </div>
        </section>

        {/* Hybrid Strategy */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The Hybrid Strategy Most Experts Recommend
          </h2>
          <p className="mt-4 text-ink-700">
            For the majority of workers, the answer to 401(k) vs Roth IRA is not
            either/or — it is a sequenced approach that captures the best features
            of both accounts. Follow this priority order with every paycheck:
          </p>

          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Get the full 401(k) employer match
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  Contribute at least enough to trigger 100% of your employer
                  match. On a $95,000 salary with a 50% match up to 6%, that
                  means contributing $5,700 to receive $2,850 in free money. This
                  step is non-negotiable regardless of your tax bracket or age.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Max your Roth IRA ($7,000 in 2026)
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  If your income is below the Roth limits ($161,000 single /
                  $240,000 married), fund the full $7,000 Roth IRA next. You gain
                  tax-free growth, flexible contribution access, and no RMDs. Open
                  the account at a low-cost brokerage with broad index fund options.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Return to your 401(k) and max it out
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  After the match and Roth IRA are funded, direct remaining
                  retirement savings back to your 401(k) until you hit the $23,500
                  limit. If you already contributed $5,700 for the match, you have
                  $17,800 of remaining 401(k) capacity. This maximizes your total
                  tax-advantaged savings at $30,500 per year.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-ink-800">
                  Overflow into taxable brokerage or HSA
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  If you still have surplus savings after maxing both accounts,
                  fund an HSA if you have a qualifying high-deductible health plan
                  ($4,300 individual / $8,550 family in 2026), then invest in a
                  taxable brokerage with low-cost index funds. Taxable accounts
                  provide the bridge for early retirement before age 59½.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">Annual Savings Checklist</p>
            <p className="mt-1 text-sm text-brand-700">
              For a single filer earning $95,000 with a 50% match up to 6%:
              $5,700 (401k match) + $7,000 (Roth IRA) + $17,800 (remaining 401k)
              = $30,500 personal contributions + $2,850 employer match. At 7% over
              30 years, that totals roughly $3.4 million before taxes.
            </p>
          </div>
        </section>

        {/* Tax Bracket Considerations */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How Your Tax Bracket Should Drive the Decision
          </h2>
          <p className="mt-4 text-ink-700">
            The entire 401(k) vs Roth IRA calculation hinges on one comparison:
            your marginal tax rate today versus your expected marginal rate in
            retirement. When today&apos;s rate is higher, choose traditional. When
            tomorrow&apos;s rate is expected to be higher, choose Roth.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Current Marginal Rate
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Recommended Priority
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">10-12%</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Roth IRA first</td>
                  <td className="px-4 py-3">Lock in the lowest rate you will ever pay</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">22-24%</td>
                  <td className="px-4 py-3 font-medium text-brand-700">Hybrid (both)</td>
                  <td className="px-4 py-3">Tax diversification; rates may rise by retirement</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">32%+</td>
                  <td className="px-4 py-3 font-medium text-brand-700">401(k) first</td>
                  <td className="px-4 py-3">Large immediate deduction; likely lower rate in retirement</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Above Roth limits</td>
                  <td className="px-4 py-3 font-medium text-brand-700">401(k) + backdoor Roth</td>
                  <td className="px-4 py-3">Direct Roth unavailable; max 401(k) then convert</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-ink-700">
            Use our{" "}
            <Link
              href="/calculators/income-tax"
              className="text-brand-600 underline"
            >
              Income Tax Calculator
            </Link>{" "}
            to estimate your marginal rate and compare it to your expected
            retirement rate. If the gap is 5+ points, lean toward the lower-rate
            account.
          </p>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Run Your Retirement Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Compare 401(k) and Roth IRA growth side by side with your actual
            salary, contribution rate, and employer match. See how tax treatment
            changes your spendable balance at retirement.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/retirement"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Retirement Calculator
            </Link>
            <Link
              href="/calculators/compound-interest"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Compound Interest Calculator
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

        {/* Related Guides */}
        <section className="mt-12 border-t border-ink-200 pt-8">
          <h2 className="text-lg font-semibold text-ink-800">Related Guides</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/guides/how-much-to-retire-at-55"
                className="text-brand-600 hover:underline"
              >
                How Much Do I Need to Retire at 55? A Complete Breakdown
              </Link>
            </li>
            <li>
              <Link
                href="/guides/save-50000-in-3-years"
                className="text-brand-600 hover:underline"
              >
                How to Save $50,000 in 3 Years: A Realistic Plan
              </Link>
            </li>
            <li>
              <Link
                href="/guides/compound-interest-real-examples"
                className="text-brand-600 hover:underline"
              >
                Compound Interest: 5 Real-Life Examples That Show Its Power
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
