import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "High-Yield Savings Account vs CD: Which Is Better in 2026?",
  description:
    "High yield savings vs CD compared with real 2026 APY numbers. See when a HYSA wins on flexibility and when a CD wins on rate-locking, with a $30,000 example and case study.",
  keywords: [
    "high yield savings vs CD",
    "high yield savings account vs certificate of deposit",
    "HYSA vs CD",
    "CD vs savings account",
    "best CD rates 2026",
    "high yield savings account rates",
  ],
};

const faqs = [
  {
    question: "Is a high-yield savings account or CD better in 2026?",
    answer:
      "Neither is universally better — it depends on your timeline and liquidity needs. A HYSA wins when you need flexible access, are still adding deposits, or expect rates to rise (4.5-5.0% APY as of August 2026). A CD wins when you have a fixed withdrawal date, want to lock in today's rate before expected Fed cuts, and do not need the money early (4.8-5.2% APY on 12-month terms). On $30,000 over 12 months, a 5.05% CD earns $90 more than a 4.75% HYSA — but the HYSA lets you withdraw without penalty.",
  },
  {
    question: "Can you lose money in a high-yield savings account or CD?",
    answer:
      "No — both are FDIC insured up to $250,000 per depositor, per bank, so your principal is protected. The risk is opportunity cost, not loss of principal. If you lock $30,000 in a 12-month CD at 5.05% APY and rates rise to 5.5%, you miss out on $135 in extra annual interest. If you keep money in a HYSA and rates fall from 4.75% to 4.0%, you lose $225 in annual interest on $30,000. Early CD withdrawal penalties (typically 3-6 months of interest) can reduce your earnings but do not eat into principal unless you withdraw very early.",
  },
  {
    question: "What is the penalty for breaking a CD early?",
    answer:
      "Most banks charge 3-6 months of interest as an early withdrawal penalty. On a $30,000 12-month CD at 5.05% APY, a 6-month penalty costs approximately $757.50 in forfeited interest. On a $10,000 6-month CD at 4.90% APY with a 3-month penalty, you forfeit about $122.50. Some no-penalty CDs exist (Ally, Marcus) but typically pay 0.10-0.25% less than standard CDs. Always check the specific penalty terms before opening — penalties vary by bank and term length.",
  },
  {
    question: "Should I put my emergency fund in a CD or high-yield savings account?",
    answer:
      "Keep your emergency fund in a HYSA, not a single long-term CD. Emergency funds require same-day or next-day access for job loss, medical bills, and car repairs — events that do not wait for a CD maturity date. A HYSA at 4.5-5.0% APY gives you FDIC protection, unlimited deposits, and penalty-free withdrawals. If you want slightly higher rates on a portion of your fund, use a CD ladder for 33-50% of the balance while keeping the rest liquid in a HYSA. See our emergency fund guide for a full breakdown.",
  },
  {
    question: "What is a CD ladder and when does it beat a HYSA?",
    answer:
      "A CD ladder splits your savings across multiple CDs with staggered maturity dates — for example, $10,000 each in 3-month, 6-month, 12-month, and 18-month CDs. One CD matures every quarter, giving you periodic liquidity while locking in higher rates than a HYSA. A 4-rung ladder on $40,000 earns a blended 4.91% APY versus 4.75% in a HYSA — about $64 extra per year. CD ladders beat a HYSA when you have $15,000+, a predictable savings timeline of 12-24 months, and do not need instant access to the full balance. For goals under 12 months or amounts under $10,000, a HYSA is simpler and nearly as competitive.",
  },
];

export default function HighYieldSavingsVsCdGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="High-Yield Savings Account vs CD: Which Is Better in 2026?"
        description="High yield savings vs CD compared with real 2026 APY numbers. See when a HYSA wins on flexibility and when a CD wins on rate-locking, with a $30,000 example and case study."
        slug="high-yield-savings-vs-cd"
        datePublished="2026-08-24"
        image="/images/guides/high-yield-savings-vs-cd.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "High-Yield Savings vs CD",
            href: "/guides/high-yield-savings-vs-cd",
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
            High-Yield Savings Account vs CD: Which Is Better in 2026?
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            You have $30,000 sitting in a traditional savings account earning
            0.01% APY — roughly $3 per year. Two FDIC-insured alternatives
            dominate in 2026: high-yield savings accounts paying 4.5-5.0% APY
            and certificates of deposit locking in 4.8-5.2% APY. The rate gap
            looks small, but the trade-off between flexibility and guaranteed
            yield changes everything depending on your timeline. This guide
            compares real August 2026 rates, runs the numbers on $30,000, and
            shows you exactly when each account type wins.
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
              <strong>HYSA wins for flexibility:</strong> 4.5-5.0% APY,
              unlimited deposits, penalty-free withdrawals, variable rate
              rises with the Fed
            </li>
            <li>
              <strong>CD wins for rate-locking:</strong> 4.8-5.2% APY on
              12-month terms, fixed rate guaranteed for the full term, ideal
              when you know your withdrawal date
            </li>
            <li>
              <strong>The $30,000 gap:</strong> A 12-month CD at 5.05% earns
              $1,515/year vs $1,425 in a 4.75% HYSA — a $90 difference that
              may not justify losing access to your money
            </li>
            <li>
              <strong>Best hybrid:</strong> HYSA for emergency funds and
              short-term goals; CD or CD ladder for fixed-date savings of
              $15,000+ over 12-18 months
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Use our{" "}
            <Link
              href="/calculators/savings-goal"
              className="font-medium text-brand-600 underline"
            >
              Savings Goal Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/cd-calculator"
              className="font-medium text-brand-600 underline"
            >
              CD Calculator
            </Link>{" "}
            to model your exact scenario.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/high-yield-savings-vs-cd.webp"
              alt="Infographic comparing high-yield savings accounts and CDs: HYSA offers 4.5-5.0% APY with flexible access, CD offers 4.8-5.2% APY with rate lock and fixed term"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              High-yield savings vs CD: comparing APY, liquidity, and rate certainty for August 2026
            </figcaption>
          </figure>
        </section>

        {/* Current Rates Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Current Rates: HYSA vs CD Terms (August 2026)
          </h2>
          <p className="mt-4 text-ink-700">
            Top online banks currently offer competitive rates across both
            account types. CD rates typically run 0.25-0.55 percentage points
            higher than HYSAs at the same bank, reflecting the trade-off of
            locking your money for a fixed term. These ranges reflect rates
            from Ally Bank, Marcus by Goldman Sachs, Capital One 360, and
            Discover as of August 2026.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Account Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Term
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    APY Range
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Interest on $30,000 (1 Year)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Access
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr className="bg-brand-50/50">
                  <td className="px-4 py-3 font-medium text-brand-700">
                    High-yield savings (HYSA)
                  </td>
                  <td className="px-4 py-3">No term</td>
                  <td className="px-4 py-3 font-medium">4.50-5.00%</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    $1,350-$1,500
                  </td>
                  <td className="px-4 py-3">Anytime, no penalty</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">3-month CD</td>
                  <td className="px-4 py-3">3 months</td>
                  <td className="px-4 py-3">4.60-4.85%</td>
                  <td className="px-4 py-3">$345-$364 (3 mo.)</td>
                  <td className="px-4 py-3">Locked; 3-mo. penalty</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">6-month CD</td>
                  <td className="px-4 py-3">6 months</td>
                  <td className="px-4 py-3">4.75-4.95%</td>
                  <td className="px-4 py-3">$712-$743 (6 mo.)</td>
                  <td className="px-4 py-3">Locked; 3-mo. penalty</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">12-month CD</td>
                  <td className="px-4 py-3">12 months</td>
                  <td className="px-4 py-3">4.85-5.20%</td>
                  <td className="px-4 py-3">$1,455-$1,560</td>
                  <td className="px-4 py-3">Locked; 3-6 mo. penalty</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">18-month CD</td>
                  <td className="px-4 py-3">18 months</td>
                  <td className="px-4 py-3">4.90-5.15%</td>
                  <td className="px-4 py-3">$2,205-$2,318 (18 mo.)</td>
                  <td className="px-4 py-3">Locked; 6-mo. penalty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *APY ranges from top online banks as of August 2026. Interest
            calculated on $30,000 using stated APY for the full term shown.
            HYSA rates are variable and can change at any time. CD rates are
            fixed at opening.
          </p>
        </section>

        {/* How Each Works */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How High-Yield Savings Accounts and CDs Work
          </h2>
          <p className="mt-4 text-ink-700">
            Both accounts are FDIC insured up to $250,000 per depositor, per
            bank. Both earn compound interest. The fundamental difference is
            whether you trade flexibility for a guaranteed rate — and that
            trade-off drives every decision in this comparison.
          </p>

          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-brand-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-brand-700">
                High-Yield Savings Account (HYSA)
              </h3>
              <p className="mt-3 text-ink-700">
                A HYSA functions like a regular savings account but pays
                dramatically higher interest. Online banks like Ally (4.50%
                APY), Marcus (4.65% APY), and Capital One 360 (4.75% APY)
                offer rates 450-500x higher than traditional brick-and-mortar
                savings accounts at 0.01% APY.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-ink-800">Key Features</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Variable rate — rises and falls with Fed policy</li>
                    <li>Unlimited deposits at any time</li>
                    <li>Withdrawals with no penalty (some limit to 6/month)</li>
                    <li>Same-day or next-day transfers to checking</li>
                    <li>No minimum term or maturity date</li>
                    <li>FDIC insured up to $250,000 per bank</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-800">Rate Behavior</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Rate can increase if the Fed raises rates</li>
                    <li>Rate can decrease if the Fed cuts rates</li>
                    <li>Banks adjust independently — shop around quarterly</li>
                    <li>No guarantee your 4.75% APY stays at 4.75% for 12 months</li>
                    <li>Historical range: 0.50% (2021) to 5.30% (2023)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-ink-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-ink-800">
                Certificate of Deposit (CD)
              </h3>
              <p className="mt-3 text-ink-700">
                A CD is a time deposit: you commit a lump sum for a fixed
                term (3 months to 5 years) and receive a guaranteed APY for
                the entire period. You cannot add money after opening, and
                withdrawing before maturity triggers an early withdrawal
                penalty — typically 3-6 months of accrued interest.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-ink-800">Key Features</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Fixed rate locked for the full term</li>
                    <li>One-time deposit at opening (no additions)</li>
                    <li>Early withdrawal penalty: 3-6 months of interest</li>
                    <li>Maturity date is predetermined (e.g., August 2027)</li>
                    <li>Auto-renewal option at maturity (check new rate)</li>
                    <li>FDIC insured up to $250,000 per bank</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-800">Rate Behavior</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Rate locked regardless of Fed cuts or hikes</li>
                    <li>Longer terms typically pay higher APY (up to 18-24 mo.)</li>
                    <li>5-year CDs currently pay 4.25-4.50% (inverted yield curve)</li>
                    <li>No-penalty CDs available at 0.10-0.25% lower APY</li>
                    <li>At maturity: withdraw, renew, or roll into new term</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">The Core Trade-Off</p>
            <p className="mt-1 text-sm text-ink-700">
              A HYSA pays you for keeping your options open. A CD pays you
              for making a commitment. The 0.25-0.55 percentage point rate
              premium on CDs is the bank&apos;s compensation for knowing
              exactly how long they hold your money — and your compensation
              for giving up access.
            </p>
          </div>
        </section>

        {/* When HYSA Wins */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When a High-Yield Savings Account Wins
          </h2>
          <p className="mt-4 text-ink-700">
            A HYSA is the right default for most savers in 2026. The rate
            difference versus CDs is small enough that flexibility often
            matters more than the extra 0.30-0.50 percentage points.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                1. Emergency fund storage
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Emergency funds must be accessible within 24-48 hours. A $24,000
                emergency fund in a 12-month CD at 5.05% APY earns $1,212/year
                — but breaking it early for a $6,000 car repair costs a
                6-month interest penalty of approximately $606, wiping out half
                a year of gains. The same $24,000 in a 4.75% HYSA earns
                $1,140/year with zero penalty for withdrawal. The $72 annual
                difference is negligible compared to the $606 penalty risk.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                2. Saving for a goal under 2 years with ongoing deposits
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                CDs accept one deposit at opening. If you are saving $1,500/month
                toward a $20,000 vacation fund over 13 months, a HYSA lets you
                deposit incrementally and earn interest on every dollar from day
                one. A CD requires you to wait until you have the full amount —
                meaning $1,500/month sits in checking at 0.01% APY for months
                before you can lock it in. On $1,500/month over 13 months, the
                lost interest from delayed CD funding costs $180-$240 compared
                to depositing into a HYSA immediately.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. You expect rates to rise
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                If the Federal Reserve is pausing cuts or signaling future
                hikes, a HYSA lets you benefit automatically. HYSA rates
                climbed from 0.50% to 5.30% between 2021 and 2023 as the Fed
                raised rates. Locking $30,000 in a 12-month CD at 5.05% today
                means missing out if HYSA rates climb to 5.50% in six months.
                That 0.45 percentage point difference on $30,000 equals $135
                in annual interest you would forfeit by being locked in.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                4. Uncertain withdrawal timeline
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Saving for a house down payment but not sure if you will buy in
                12 or 24 months? A HYSA keeps your options open. A 12-month CD
                forces a decision: withdraw at maturity and reinvest, or pay a
                penalty to access funds early. Uncertainty about timing is the
                single strongest argument for HYSA over CD — the flexibility
                premium costs $90/year on $30,000, which is cheap insurance
                against a $757 early withdrawal penalty.
              </p>
            </div>
          </div>
        </section>

        {/* When CD Wins */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When a Certificate of Deposit Wins
          </h2>
          <p className="mt-4 text-ink-700">
            CDs reward savers who know exactly when they need their money and
            can commit a lump sum without touching it. The rate premium is
            modest but guaranteed — and that guarantee matters most when rates
            are expected to fall.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                1. Saving for a known future date
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Wedding in exactly 14 months? Property tax due in 12 months?
                A CD matched to your withdrawal date locks in today&apos;s rate
                with zero ongoing management. A $15,000 12-month CD at 5.05%
                APY matures to $15,757.50 — you know the exact amount on day
                one. A HYSA at 4.75% might drop to 4.25% if the Fed cuts rates
                in month 6, reducing your return to $1,425 instead of the
                projected $1,515. The CD eliminates that uncertainty.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                2. You expect rates to fall
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                When the Fed signals rate cuts, HYSA rates follow within weeks.
                Banks cut HYSA rates faster than they raise CD rates because
                HYSAs have no lock-in. If you believe rates will drop 0.50-0.75
                percentage points over the next 12 months, locking a 5.05%
                12-month CD today protects your yield. A HYSA starting at
                4.75% that falls to 4.00% by month 6 earns approximately
                $1,313 over the year — $202 less than the CD&apos;s guaranteed
                $1,515 on $30,000.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. You have a lump sum ready now
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Inherited $50,000? Sold a car for $18,000? Received a bonus?
                A CD maximizes yield on money you will not add to later. There
                is no advantage to a HYSA&apos;s unlimited deposit feature if
                the full amount is already saved. A $50,000 18-month CD at
                5.00% APY earns $3,750 over the term — $375 more than the same
                amount in a 4.75% HYSA ($3,375). When the deposit is complete
                and the timeline is fixed, the CD&apos;s rate premium is free
                money.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                4. Discipline and lock-in advantage
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Some savers spend money they can access too easily. A CD creates
                a psychological and financial barrier: the early withdrawal
                penalty makes impulsive spending costly. If you saved $20,000
                for a house down payment but dipped into your HYSA twice for
                vacations ($3,200 total), the CD&apos;s lock-in would have
                preserved the full balance. The $90/year rate premium on
                $30,000 is a small price for forced discipline on goal-oriented
                savings.
              </p>
            </div>
          </div>
        </section>

        {/* $30,000 Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            $30,000 Over 12 Months: HYSA vs 12-Month CD
          </h2>
          <p className="mt-4 text-ink-700">
            Here is the head-to-head comparison most savers want to see. Both
            accounts hold the same $30,000 for exactly 12 months with no
            additional deposits or withdrawals.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    HYSA at 4.75% APY
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    12-Month CD at 5.05% APY
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Starting balance</td>
                  <td className="px-4 py-3">$30,000</td>
                  <td className="px-4 py-3">$30,000</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Rate type</td>
                  <td className="px-4 py-3">Variable (can change)</td>
                  <td className="px-4 py-3">Fixed (locked 12 months)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Interest earned (12 months)</td>
                  <td className="px-4 py-3 font-medium text-brand-700">
                    $1,425
                  </td>
                  <td className="px-4 py-3 font-medium">$1,515</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Ending balance</td>
                  <td className="px-4 py-3">$31,425</td>
                  <td className="px-4 py-3">$31,515</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Additional deposits allowed</td>
                  <td className="px-4 py-3">Yes, unlimited</td>
                  <td className="px-4 py-3">No</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Early withdrawal penalty</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3">~$757 (6 months interest)</td>
                </tr>
                <tr className="bg-brand-50/50 font-medium">
                  <td className="px-4 py-3">CD advantage</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3 text-brand-700">+$90/year</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Interest calculated on $30,000 at stated APY for 12 months.
            Assumes HYSA rate remains constant at 4.75% — actual HYSA earnings
            may vary if rates change. Early withdrawal penalty assumes 6-month
            interest forfeiture on the CD.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Is $90 Worth It?</p>
            <p className="mt-1 text-sm text-amber-700">
              The CD earns $90 more — $7.50 per month — in exchange for
              locking $30,000 with no access for 12 months. If you need even
              $5,000 before maturity, the 6-month early withdrawal penalty
              ($757) wipes out 8.4 years of that $90 premium. The CD only
              makes financial sense if you are confident you will not touch
              the money early. For most savers, the HYSA&apos;s flexibility
              is worth far more than $7.50/month.
            </p>
          </div>
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Tom, 40, Saving $50K House Down Payment in 18 Months
          </h2>
          <div className="mt-4 rounded-xl border border-ink-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold text-ink-800">His Situation</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>Age: 40, software engineer in Denver</li>
                  <li>Gross salary: $125,000/year ($7,400/month take-home)</li>
                  <li>Goal: $50,000 house down payment</li>
                  <li>Timeline: 18 months (February 2028 purchase target)</li>
                  <li>Current savings: $32,000 already saved</li>
                  <li>Monthly contribution: $1,000/month ($18,000 over 18 months)</li>
                  <li>Total at goal date: $50,000 ($32,000 + $18,000)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  His Optimal Split Strategy
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>
                    <strong>$12,000</strong> in Ally HYSA at 4.50% APY
                    (ongoing $1,000/month deposits + buffer)
                  </li>
                  <li>
                    <strong>$32,000</strong> in Marcus 18-month CD at 5.00%
                    APY (lump sum locked until February 2028)
                  </li>
                  <li>
                    <strong>$6,000</strong> in Ally 6-month CD at 4.90% APY
                    (maturing August 2027, then rolled to HYSA)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                Why This Split Works
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                Tom already has $32,000 saved — a lump sum ideal for an
                18-month CD matched to his purchase date. Locking it at 5.00%
                APY guarantees $2,400 in interest regardless of rate cuts.
                His ongoing $1,000/month contributions go into a HYSA because
                CDs do not accept additional deposits. The $12,000 HYSA
                balance grows by $1,000/month and provides a buffer if the
                home purchase timeline shifts by 3-6 months.
              </p>
              <p className="mt-3 text-sm text-ink-700">
                The $6,000 6-month CD is a bridge: it earns 4.90% APY on
                money Tom saved before finalizing his strategy. When it matures
                in February 2027, he moves the $6,147 ($6,000 + $147 interest)
                into the HYSA to continue receiving deposits alongside his
                monthly $1,000 contributions.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                18-Month Interest Comparison
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">All in HYSA (4.50%)</p>
                  <p className="font-semibold text-ink-800">~$3,510</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-ink-500">Split strategy</p>
                  <p className="font-semibold text-brand-700">~$3,890</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-ink-500">Extra vs all-HYSA</p>
                  <p className="font-semibold text-brand-700">+$380</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-700">
                Tom&apos;s split earns approximately $380 more over 18 months
                than keeping everything in a HYSA — while maintaining $12,000+
                in penalty-free access at any point. The $32,000 CD generates
                $2,400 in guaranteed interest. The HYSA portion earns roughly
                $890 on average balances. The 6-month CD adds $147. If Tom&apos;s
                closing date slips to month 20, he can cover the gap from his
                HYSA without touching the CD or paying a penalty.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                What Tom Avoided
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                Putting all $50,000 in a single 18-month CD would have been
                impossible — he only had $32,000 at the start and adds $1,000/month.
                Keeping everything in a HYSA would have cost $380 in foregone
                interest over 18 months. Locking all $32,000 in a CD with zero
                HYSA buffer would mean paying a $800+ early withdrawal penalty
                if his closing date moved up by 2 months. The split captures
                97% of the CD rate advantage while preserving flexibility on
                24% of his total savings.
              </p>
            </div>
          </div>
        </section>

        {/* CD Ladder vs HYSA */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            CD Ladder vs HYSA for Different Goals
          </h2>
          <p className="mt-4 text-ink-700">
            A CD ladder splits your savings across multiple CDs with staggered
            maturity dates, combining CD rate premiums with periodic liquidity.
            Here is how ladders compare to a pure HYSA strategy for common
            savings goals.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Goal
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Timeline
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Best Choice
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Emergency fund</td>
                  <td className="px-4 py-3">$15,000-$25,000</td>
                  <td className="px-4 py-3">Permanent</td>
                  <td className="px-4 py-3 font-medium text-brand-700">HYSA</td>
                  <td className="px-4 py-3">Instant access required; no CD penalty risk</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Vacation fund</td>
                  <td className="px-4 py-3">$5,000-$8,000</td>
                  <td className="px-4 py-3">6-12 months</td>
                  <td className="px-4 py-3 font-medium text-brand-700">HYSA</td>
                  <td className="px-4 py-3">Still adding deposits; CD rate premium too small on low balance</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">House down payment</td>
                  <td className="px-4 py-3">$30,000-$60,000</td>
                  <td className="px-4 py-3">12-24 months</td>
                  <td className="px-4 py-3 font-medium">Split or CD ladder</td>
                  <td className="px-4 py-3">Lock lump sum in CD; HYSA for ongoing deposits and timeline buffer</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Car purchase</td>
                  <td className="px-4 py-3">$20,000-$35,000</td>
                  <td className="px-4 py-3">12-18 months</td>
                  <td className="px-4 py-3 font-medium">12-18 month CD</td>
                  <td className="px-4 py-3">Fixed date, lump sum ready, 5.00-5.05% APY rate lock</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Tax payment reserve</td>
                  <td className="px-4 py-3">$8,000-$15,000</td>
                  <td className="px-4 py-3">6-12 months</td>
                  <td className="px-4 py-3 font-medium">6-12 month CD</td>
                  <td className="px-4 py-3">Exact due date known; no need for ongoing deposits</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">General savings</td>
                  <td className="px-4 py-3">$10,000+</td>
                  <td className="px-4 py-3">No fixed date</td>
                  <td className="px-4 py-3 font-medium text-brand-700">HYSA</td>
                  <td className="px-4 py-3">Uncertain timeline; flexibility worth more than 0.30% APY premium</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Sample 4-Rung CD Ladder on $40,000
          </h3>
          <p className="mt-2 text-ink-700">
            For savers with $40,000 and a 12-18 month horizon who want higher
            rates than a HYSA but more liquidity than a single long-term CD:
          </p>

          <div className="mt-4 overflow-x-auto">
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
                    Year-1 Interest
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Matures
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr>
                  <td className="px-4 py-3">Rung 1</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3">3 months</td>
                  <td className="px-4 py-3">4.75%</td>
                  <td className="px-4 py-3">$119</td>
                  <td className="px-4 py-3">November 2026</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Rung 2</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3">6 months</td>
                  <td className="px-4 py-3">4.90%</td>
                  <td className="px-4 py-3">$245</td>
                  <td className="px-4 py-3">February 2027</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Rung 3</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3">12 months</td>
                  <td className="px-4 py-3">5.05%</td>
                  <td className="px-4 py-3">$505</td>
                  <td className="px-4 py-3">August 2027</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Rung 4</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3">18 months</td>
                  <td className="px-4 py-3">5.00%</td>
                  <td className="px-4 py-3">$500</td>
                  <td className="px-4 py-3">February 2028</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-ink-700">
            Total year-1 interest: $1,369 on $40,000 — a blended rate of 3.42%
            in year 1 (ramps up as longer rungs accrue full-year interest).
            Full 18-month blended rate: approximately 4.91% APY. Compare to
            $40,000 in a HYSA at 4.75% APY earning $1,900/year. The ladder
            earns $64 more in year 1 while providing access to $10,000 every
            3 months without penalty. Use our{" "}
            <Link
              href="/calculators/cd-calculator"
              className="font-medium text-brand-600 underline"
            >
              CD Calculator
            </Link>{" "}
            to model different ladder configurations.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4">
            <p className="font-medium text-brand-800">Decision Framework</p>
            <p className="mt-1 text-sm text-ink-700">
              Under $10,000 or under 12 months: HYSA, no question. $10,000-$25,000
              with a fixed date: single CD matched to your timeline. $25,000+
              with a fixed date and lump sum ready: CD or split (HYSA for
              deposits, CD for existing balance). $25,000+ with uncertain timeline:
              HYSA, or CD ladder if you will not need more than 25% of the
              balance at any one time.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900">
            Run Your Savings Numbers
          </h2>
          <p className="mt-2 text-ink-600">
            Every savings goal has different math. Use our free calculators to
            compare HYSA and CD returns, plan monthly contributions, and see
            how compound interest grows your balance over time.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/savings-goal"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Savings Goal Calculator
            </Link>
            <Link
              href="/calculators/cd-calculator"
              className="rounded-lg border border-brand-300 bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
            >
              CD Calculator
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
                href="/guides/emergency-fund-where-to-keep"
                className="text-brand-600 hover:underline"
              >
                Where to Keep Your Emergency Fund for the Best Interest Rate
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
