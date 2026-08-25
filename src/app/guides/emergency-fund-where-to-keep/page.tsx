import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "Where to Keep Your Emergency Fund for the Best Interest Rate",
  description:
    "Where to keep your emergency fund for the best interest rate. Compare HYSAs, money market accounts, CDs, and more with real APY numbers and a case study.",
  keywords: [
    "where to keep emergency fund",
    "emergency fund interest rate",
    "best place for emergency fund",
    "high yield savings emergency fund",
    "emergency fund account",
  ],
};

const faqs = [
  {
    question: "Where is the best place to keep an emergency fund in 2026?",
    answer:
      "A high-yield savings account (HYSA) is the best default for most people. Top online banks currently offer 4.5-5.0% APY with FDIC insurance up to $250,000 per depositor, per bank. You get same-day or next-day access to your money without market risk. Keep 3-6 months of expenses in a HYSA and avoid keeping more than $500-1,000 in a traditional checking account earning 0.01% APY.",
  },
  {
    question: "Should I keep my emergency fund in a checking account?",
    answer:
      "No — not beyond a small buffer for immediate needs. A traditional checking account at a big bank pays roughly 0.01% APY. On a $25,000 balance, that earns $2.50 per year. The same $25,000 in a 5.0% APY HYSA earns $1,250 per year — a $1,247.50 difference. Keep $500-1,000 in checking for same-day transactions and park the rest in a HYSA.",
  },
  {
    question: "Can I use a CD for my emergency fund?",
    answer:
      "Only with a CD ladder strategy, not a single long-term CD. A 12-month CD might pay 4.8-5.2% APY, but early withdrawal penalties typically cost 3-6 months of interest. A 3-rung ladder — splitting funds across 3-month, 6-month, and 12-month CDs — gives you quarterly liquidity while locking in higher rates than checking. Keep at least 1 month of expenses ($3,000-5,000 for most households) in a HYSA for instant access.",
  },
  {
    question: "Is it safe to invest my emergency fund in stocks or ETFs?",
    answer:
      "No. Emergency funds must be liquid and stable. The S&P 500 dropped 34% in 33 days during March 2020. If you lost your job during that crash, you would be forced to sell investments at a loss to cover rent and groceries. A $24,000 emergency fund invested in stocks could have dropped to $15,840 — leaving you $8,160 short when you needed the money most. Keep emergency money in FDIC-insured cash accounts.",
  },
  {
    question: "How much should I keep in my emergency fund?",
    answer:
      "Most financial planners recommend 3-6 months of essential expenses — not gross income. If your monthly essentials (housing, food, insurance, minimum debt payments, utilities) total $4,000, target $12,000-$24,000. Single-income households and freelancers should aim for 6 months ($24,000 on $4,000/month expenses). Dual-income households with stable jobs can often target 3 months ($12,000). Use our Emergency Fund Calculator to find your exact number.",
  },
];

export default function EmergencyFundWhereToKeepGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Where to Keep Your Emergency Fund for the Best Interest Rate"
        description="Where to keep your emergency fund for the best interest rate. Compare HYSAs, money market accounts, CDs, and more with real APY numbers and a case study."
        slug="emergency-fund-where-to-keep"
        datePublished="2026-08-24"
        image="/images/guides/emergency-fund-where-to-keep.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "Where to Keep Your Emergency Fund",
            href: "/guides/emergency-fund-where-to-keep",
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
            / Savings Strategy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Where to Keep Your Emergency Fund for the Best Interest Rate
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            You built a $24,000 emergency fund. Congratulations — 68% of Americans
            cannot cover a $1,000 surprise expense. But where you keep that money
            matters as much as how much you saved. The difference between a
            traditional checking account and a high-yield savings account on
            $25,000 is $1,250 per year in free money. This guide breaks down every
            option, compares real 2026 rates, and shows you exactly where to park
            your cash for maximum safety and interest.
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: August 2026</p>
        </header>

        {/* TL;DR */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <p className="mt-3 text-ink-700">
            <strong>Best option:</strong> High-yield savings account at 4.5-5.0%
            APY. Keep 3-6 months of expenses liquid and FDIC insured.
          </p>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>Target size:</strong> 3-6 months of essential expenses
              ($12,000-$24,000 for most households spending $4,000/month)
            </li>
            <li>
              <strong>Top accounts:</strong> Online HYSAs from Ally Bank, Marcus
              by Goldman Sachs, and Capital One 360 (4.5-5.0% APY as of August 2026)
            </li>
            <li>
              <strong>Avoid:</strong> Traditional checking (0.01% APY), stocks,
              and single long-term CDs without a ladder strategy
            </li>
            <li>
              <strong>Annual gain:</strong> Moving $25,000 from checking to a
              5.0% HYSA earns an extra $1,247.50 per year
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/emergency-fund"
              className="font-medium text-brand-600 underline"
            >
              Emergency Fund Calculator
            </Link>{" "}
            to determine your target amount.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/emergency-fund-where-to-keep.webp"
              alt="Infographic comparing emergency fund account types by APY, liquidity, and FDIC insurance, with a high-yield savings account highlighted as the best option at 4.5-5.0% APY"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              Where to keep your emergency fund: comparing APY, liquidity, and safety across account types
            </figcaption>
          </figure>
        </section>

        {/* Why Location Matters */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Why Where You Keep Your Emergency Fund Matters
          </h2>
          <p className="mt-4 text-ink-700">
            Most people leave their emergency fund in the same checking account
            where their paycheck lands. That account probably earns 0.01% APY — the
            national average at the four largest U.S. banks in 2026. On a $25,000
            balance, that generates $2.50 in annual interest. You essentially earn
            nothing while inflation erodes your purchasing power at roughly 2.8%
            per year ($700 in real value lost annually on $25,000).
          </p>
          <p className="mt-4 text-ink-700">
            Move that same $25,000 to a high-yield savings account paying 5.0%
            APY and the math changes dramatically. You earn $1,250 per year in
            interest — a $1,247.50 annual difference compared to checking. Over
            five years, that compounds to roughly $6,900 in extra interest, enough
            to cover 1.7 months of expenses for someone spending $4,000 per month
            on essentials.
          </p>
          <p className="mt-4 text-ink-700">
            The account type also determines access speed and safety. Your
            emergency fund exists for job loss, medical bills, and car repairs —
            events that require cash within 24-48 hours, not weeks. A brokerage
            account might earn 8-10% historically, but it can drop 20-30% in a
            recession exactly when you need the money. The right account balances
            three priorities: competitive interest (4.5%+ APY), instant liquidity
            (same-day or next-day transfers), and full principal protection (FDIC
            insurance up to $250,000 per depositor, per bank).
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Account Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    APY on $25,000
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Annual Interest
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    5-Year Total Interest
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Traditional checking</td>
                  <td className="px-4 py-3">0.01%</td>
                  <td className="px-4 py-3">$2.50</td>
                  <td className="px-4 py-3">$12.50</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium text-brand-700">
                    High-yield savings
                  </td>
                  <td className="px-4 py-3 font-medium">5.0%</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$1,250</td>
                  <td className="px-4 py-3 font-medium text-brand-700">$6,901</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *5-year total assumes constant 5.0% APY with monthly compounding and no
            withdrawals. Actual rates fluctuate with Federal Reserve policy.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Emergency Fund Account Comparison: Every Option Ranked
          </h2>
          <p className="mt-4 text-ink-700">
            Here is how every common account type stacks up for emergency fund
            purposes. Rates reflect August 2026 market conditions from top
            providers across each category.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Account Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    APY
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Liquidity
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    FDIC Insured
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Traditional checking</td>
                  <td className="px-4 py-3">0.01%</td>
                  <td className="px-4 py-3">Instant</td>
                  <td className="px-4 py-3">Yes</td>
                  <td className="px-4 py-3">Daily spending buffer ($500-1,000 max)</td>
                </tr>
                <tr className="bg-brand-50/50">
                  <td className="px-4 py-3 font-medium text-brand-700">
                    High-yield savings (HYSA)
                  </td>
                  <td className="px-4 py-3 font-medium">4.5-5.0%</td>
                  <td className="px-4 py-3">Same/next day</td>
                  <td className="px-4 py-3">Yes</td>
                  <td className="px-4 py-3 font-medium">
                    Primary emergency fund (best default)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Money market account</td>
                  <td className="px-4 py-3">4.3-4.8%</td>
                  <td className="px-4 py-3">Same day (check/debit)</td>
                  <td className="px-4 py-3">Yes</td>
                  <td className="px-4 py-3">Those wanting check-writing access</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Certificates of deposit (CDs)</td>
                  <td className="px-4 py-3">4.8-5.2%</td>
                  <td className="px-4 py-3">Locked (penalty to withdraw)</td>
                  <td className="px-4 py-3">Yes</td>
                  <td className="px-4 py-3">CD ladder strategy only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Treasury bills (T-bills)</td>
                  <td className="px-4 py-3">4.6-5.0%</td>
                  <td className="px-4 py-3">1-3 business days</td>
                  <td className="px-4 py-3">No (U.S. gov backed)</td>
                  <td className="px-4 py-3">Tax-advantaged savers in high brackets</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Series I savings bonds</td>
                  <td className="px-4 py-3">3.5-4.5% (variable)</td>
                  <td className="px-4 py-3">12-month lock, 3-mo penalty if &lt;5 yrs</td>
                  <td className="px-4 py-3">No (U.S. gov backed)</td>
                  <td className="px-4 py-3">Inflation hedge, not primary emergency fund</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Brokerage (stocks/ETFs)</td>
                  <td className="px-4 py-3">8-10% avg (variable)</td>
                  <td className="px-4 py-3">1-3 business days</td>
                  <td className="px-4 py-3">No (SIPC up to $500K)</td>
                  <td className="px-4 py-3">Long-term investing, not emergencies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *APY ranges based on top-tier providers as of August 2026. I-bond rates
            adjust every 6 months. Brokerage returns are historical averages, not
            guaranteed.
          </p>
        </section>

        {/* Top 3 Options Detailed */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Top 3 Options: Detailed Pros and Cons
          </h2>

          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-brand-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-brand-700">
                1. High-Yield Savings Account (HYSA)
              </h3>
              <p className="mt-3 text-ink-700">
                The HYSA is the gold standard for emergency funds in 2026. Online
                banks like Ally (4.50% APY), Marcus by Goldman Sachs (4.65% APY),
                and Capital One 360 (4.75% APY) offer rates 450-500x higher than
                traditional checking accounts, with no minimum balance requirements
                and no monthly fees on most accounts.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-ink-800">Pros</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>4.5-5.0% APY on $24,000 = $1,080-$1,200/year in interest</li>
                    <li>FDIC insured up to $250,000 per bank</li>
                    <li>Transfers to checking in 1-2 business days (some instant)</li>
                    <li>No market risk — principal never drops</li>
                    <li>No early withdrawal penalties</li>
                    <li>Can open in 10 minutes online</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-800">Cons</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Rates can drop when the Fed cuts rates (was 5.3% in 2023)</li>
                    <li>No check-writing on most HYSAs</li>
                    <li>Some accounts limit to 6 withdrawals/month (soft limit)</li>
                    <li>Separate from your primary bank — one extra login</li>
                    <li>Not ideal for balances over $250,000 (FDIC limit per bank)</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-600">
                <strong>Verdict:</strong> Best for 80-90% of your emergency fund.
                Put $18,000-$22,000 of a $24,000 fund here.
              </p>
            </div>

            <div className="rounded-xl border border-ink-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-ink-800">
                2. Money Market Account
              </h3>
              <p className="mt-3 text-ink-700">
                Money market accounts (MMAs) function like savings accounts but
                typically include check-writing and debit card access. Vanguard
                Federal Money Market Fund (VMFXX) and Fidelity Government Money
                Market (SPAXX) offer 4.3-4.8% APY. Bank MMAs from Discover and
                Synchrony pay similar rates with FDIC insurance.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-ink-800">Pros</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Check and debit access for emergencies</li>
                    <li>4.3-4.8% APY — nearly matches HYSA rates</li>
                    <li>FDIC insured at bank MMAs</li>
                    <li>Same-day access via debit card at ATMs</li>
                    <li>Often pairs well with existing brokerage accounts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-800">Cons</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Minimum balance requirements ($1,000-$2,500 at some banks)</li>
                    <li>Debit card access makes it easier to spend impulsively</li>
                    <li>Fund-based MMAs are not FDIC insured (but very safe)</li>
                    <li>Slightly lower rates than top HYSAs (0.1-0.3% difference)</li>
                    <li>Monthly fee if balance drops below minimum ($10-15/month)</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-600">
                <strong>Verdict:</strong> Good alternative if you want check access
                without sacrificing much yield. On $24,000, the 0.2% rate difference
                vs. a HYSA costs about $48/year.
              </p>
            </div>

            <div className="rounded-xl border border-ink-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-ink-800">
                3. CD Ladder Strategy
              </h3>
              <p className="mt-3 text-ink-700">
                A CD ladder splits your emergency fund across multiple certificates
                of deposit with staggered maturity dates. Instead of locking
                $24,000 in a single 12-month CD at 5.0% APY (and paying a 6-month
                interest penalty to access it early), you divide the money into
                3-month, 6-month, and 12-month rungs. Each quarter, a CD matures
                and you can reinvest or withdraw without penalty.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-ink-800">Pros</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>4.8-5.2% APY — highest FDIC-insured cash rates available</li>
                    <li>Rate locked for the CD term regardless of Fed cuts</li>
                    <li>Quarterly liquidity with a 4-rung ladder</li>
                    <li>Disciplined structure prevents impulsive spending</li>
                    <li>Works well for funds above $15,000</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-800">Cons</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Early withdrawal penalty: 3-6 months of interest</li>
                    <li>More complex to manage than a single HYSA</li>
                    <li>Not suitable for the first $5,000-$8,000 (keep that liquid)</li>
                    <li>Requires reinvestment action every 3-6 months</li>
                    <li>Opportunity cost if rates rise after you lock in</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-600">
                <strong>Verdict:</strong> Best as a supplement to a HYSA, not a
                replacement. Use for the portion of your fund you are confident you
                will not need for 90+ days.
              </p>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Amanda, 34, Nurse, $78K in Phoenix
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">Her Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Age: 34, registered nurse at Banner Health</li>
                  <li>Gross salary: $78,000/year ($6,500/month)</li>
                  <li>Take-home after taxes/benefits: $4,850/month</li>
                  <li>Monthly essentials: $4,000 (rent $1,650, car $420, food $550, insurance $380, utilities $180, minimum debt $820)</li>
                  <li>Target emergency fund: 6 months = $24,000</li>
                  <li>Current savings: $24,000 (goal reached after 18 months of saving $1,333/month)</li>
                  <li>Previously kept entire fund in Wells Fargo checking at 0.01% APY</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">Her New Structure</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>
                    <strong>$4,000</strong> in Wells Fargo checking (1 month buffer +
                    daily spending)
                  </li>
                  <li>
                    <strong>$14,000</strong> in Ally Bank HYSA at 4.50% APY (3.5 months
                    of expenses, instant transfer)
                  </li>
                  <li>
                    <strong>$6,000</strong> in CD ladder across Ally (2 rungs: $3,000
                    in 6-month CD at 4.90% APY, $3,000 in 12-month CD at 5.05% APY)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                Annual Interest Comparison
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">Old setup (all checking)</p>
                  <p className="font-semibold text-ink-800">$2.40/year</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-ink-500">New setup (split accounts)</p>
                  <p className="font-semibold text-brand-700">$928/year</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-ink-500">Annual gain</p>
                  <p className="font-semibold text-brand-700">+$925.60</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-700">
                Amanda&apos;s restructure took 45 minutes total — 15 minutes to open
                the Ally HYSA, 15 minutes to initiate the $20,000 transfer from
                Wells Fargo, and 15 minutes to set up the 2-rung CD ladder. Her
                $14,000 HYSA earns $630/year. Her $6,000 in CDs earns $298/year
                (blended 4.98% APY). The $4,000 in checking earns $0.40/year — but
                gives her instant access for a flat tire or urgent copay without
                touching the higher-yield accounts.
              </p>
              <p className="mt-3 text-sm text-ink-700">
                When her 6-month CD matured in February 2026, she rolled the
                $3,073 ($3,000 principal + $73 interest) into a new 12-month CD
                at 5.05% APY. She kept the matured funds in her HYSA for 2 weeks
                while comparing rates, then locked in the new CD. This rolling
                strategy ensures she always has either a CD maturing or $14,000+
                available in her HYSA within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* CD Ladder Strategy */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            The CD Ladder Strategy Explained With Numbers
          </h2>
          <p className="mt-4 text-ink-700">
            A CD ladder works by dividing your emergency fund into equal portions
            across CDs with different maturity dates. Here is a 4-rung ladder for
            $16,000 of Amanda&apos;s fund (keeping $8,000 in HYSA for instant access):
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Rung
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Term
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    APY
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Maturity Value
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Matures
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Rung 1</td>
                  <td className="px-4 py-3">$4,000</td>
                  <td className="px-4 py-3">3 months</td>
                  <td className="px-4 py-3">4.75%</td>
                  <td className="px-4 py-3">$4,047</td>
                  <td className="px-4 py-3">November 2026</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Rung 2</td>
                  <td className="px-4 py-3">$4,000</td>
                  <td className="px-4 py-3">6 months</td>
                  <td className="px-4 py-3">4.90%</td>
                  <td className="px-4 py-3">$4,098</td>
                  <td className="px-4 py-3">February 2027</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Rung 3</td>
                  <td className="px-4 py-3">$4,000</td>
                  <td className="px-4 py-3">9 months</td>
                  <td className="px-4 py-3">4.95%</td>
                  <td className="px-4 py-3">$4,149</td>
                  <td className="px-4 py-3">May 2027</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Rung 4</td>
                  <td className="px-4 py-3">$4,000</td>
                  <td className="px-4 py-3">12 months</td>
                  <td className="px-4 py-3">5.05%</td>
                  <td className="px-4 py-3">$4,202</td>
                  <td className="px-4 py-3">August 2027</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-ink-700">
            Total interest earned across all 4 rungs in the first year: $496 on
            $16,000 — a blended rate of 4.91% APY. Compare that to leaving $16,000
            in checking at 0.01% APY, which earns $1.60. The ladder generates $494.40
            more per year while providing access to $4,000 every 3 months without
            early withdrawal penalties.
          </p>
          <p className="mt-4 text-ink-700">
            When Rung 1 matures in November 2026, Amanda has three choices: withdraw
            the $4,047 if she needs it, roll it into a new 12-month CD at the current
            rate, or move it to her HYSA. Most months she reinvests into a new
            12-month CD, creating a self-perpetuating ladder where one CD matures
            every quarter. Use our{" "}
            <Link
              href="/calculators/cd-calculator"
              className="font-medium text-brand-600 underline"
            >
              CD Calculator
            </Link>{" "}
            to model different ladder configurations and see exact maturity values.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">CD Ladder Rule of Thumb</p>
            <p className="mt-1 text-sm text-ink-700">
              Never put more than 50-67% of your emergency fund in CDs. Keep the
              remaining 33-50% ($8,000-$12,000 of a $24,000 fund) in a HYSA for
              same-day access. If you need $6,000 for an emergency root canal and
              your next CD does not mature for 8 weeks, the HYSA covers you without
              penalty.
            </p>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            3 Common Emergency Fund Mistakes
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                1. Keeping too much in checking
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The average American keeps $5,300 in checking — often including
                their entire emergency fund. At 0.01% APY, $24,000 in checking earns
                $2.40 per year. That same $24,000 in a 4.50% HYSA earns $1,080 per
                year. The $1,077.60 you leave on the table annually equals 27 days
                of groceries for a household spending $550/month on food. Keep
                $500-1,000 in checking for immediate needs and move the rest today.
                The transfer takes 5 minutes and the interest starts accruing
                immediately.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                2. Investing your emergency fund in stocks
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Stocks average 8-10% returns long-term, so investing a $24,000
                emergency fund seems smart — until you need the money during a
                downturn. In 2022, the S&amp;P 500 dropped 18.1%. A $24,000 portfolio
                would have fallen to $19,656 — a $4,344 shortfall when covering
                6 months of $4,000/month expenses. Job losses and market crashes
                correlate: companies lay off workers during recessions, exactly when
                your portfolio is down 15-25%. Emergency funds must prioritize
                stability over growth. A 5.0% HYSA guarantees your $24,000 stays
                $24,000.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. Not having an emergency fund at all
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                56% of Americans cannot cover a $1,000 emergency with savings, according
                to recent Bankrate surveys. Without a fund, a $2,400 transmission
                repair goes on a credit card at 22% APR — costing $528 in interest
                over 12 months if you pay $220/month. A $4,800 medical bill becomes
                a payment plan at 18% APR. The math is unforgiving: a single $3,000
                surprise expense on credit at 22% APR costs $370 in interest over
                one year. Building even a $1,000 starter fund in a HYSA (requiring
                just $167/month for 6 months) breaks the cycle of debt for most
                unexpected costs.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Calculate Your Emergency Fund Target
          </h2>
          <p className="mt-2 text-ink-600">
            Before choosing where to keep your money, know how much you need. Our
            free calculators help you set the right target and plan how long it
            takes to get there.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/emergency-fund"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Emergency Fund Calculator
            </Link>
            <Link
              href="/calculators/savings-goal"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              Savings Goal Calculator
            </Link>
            <Link
              href="/calculators/cd-calculator"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              CD Calculator
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
        <RelatedGuides currentSlug="emergency-fund-where-to-keep" relatedSlugs={["high-yield-savings-vs-cd", "50-30-20-budget-rule"]} />
      </article>
    </>
  );
}
