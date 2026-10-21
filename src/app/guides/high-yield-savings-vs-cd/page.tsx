import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";

export const metadata: Metadata = {
  title: "High-Yield Savings Account vs CD: Which Is Better in 2026?",
  description:
    "High yield savings vs CD with October 2026 APYs. See when a HYSA wins on flexibility, when a CD wins on rate-locking, plus a $30,000 example.",
  keywords: [
    "high yield savings vs CD",
    "high yield savings account vs certificate of deposit",
    "HYSA vs CD",
    "CD vs savings account",
    "best CD rates October 2026",
    "high yield savings account rates",
  ],
};

const faqs = [
  {
    question: "Is a high-yield savings account or CD better in 2026?",
    answer:
      "Neither is universally better — it depends on your timeline and liquidity needs. As of October 17, 2026, the best listed high-yield savings rate is 4.27% APY (Peak Bank, per Bankrate), while a 12-month CD at a widely available online bank pays about 4.50% APY. A HYSA wins when you need flexible access, are still adding deposits, or expect rates to keep rising after the Fed's September 2026 hike. A CD wins when you have a fixed withdrawal date and want to lock today's rate. On $30,000 over 12 months, a 4.50% CD earns $1,350 versus $1,281 in a 4.27% HYSA — a $69 gap — but the HYSA lets you withdraw without penalty.",
  },
  {
    question: "Can you lose money in a high-yield savings account or CD?",
    answer:
      "No — both are FDIC insured up to $250,000 per depositor, per bank, so your principal is protected. The risk is opportunity cost, not loss of principal. If you lock $30,000 in a 12-month CD at 4.50% APY and savings rates climb to 4.90% after six months, the HYSA would have earned about $25 more over the year. If you keep money in a HYSA and its rate slides from 4.27% to 3.50% after six months, you earn about $185 less than the CD would have paid. Early CD withdrawal penalties (60 days to 270 days of interest, depending on the bank and term) reduce earnings and, if you withdraw very early, can reach into principal.",
  },
  {
    question: "What is the penalty for breaking a CD early?",
    answer:
      "It varies by bank and term. Capital One 360 and Marcus charge 3 months of interest on CDs of 12 months or less and 6 months of interest on longer terms; Ally charges 60 days of interest on 3-24 month CDs; Popular Direct charges 270 days of interest on 12-36 month CDs. On a $30,000 12-month CD at 4.50% APY, a 3-month penalty costs about $338 — roughly 4.9 years of the $69 annual premium over a top HYSA. Because the penalty is taken from accrued interest first and then principal if needed, breaking a CD in the first weeks can cost more than you have earned. No-penalty CDs exist (Marcus 11-month no-penalty CD: 4.00% APY on October 17, 2026) but pay less than standard CDs.",
  },
  {
    question: "Should I put my emergency fund in a CD or high-yield savings account?",
    answer:
      "Keep your emergency fund in a HYSA, not a single long-term CD. Emergency funds require same-day or next-day access for job loss, medical bills, and car repairs — events that do not wait for a CD maturity date. With the best HYSAs at 3.90-4.27% APY (Bankrate, October 17, 2026) and 12-month CDs at 4.40-4.50%, the premium for locking up a $24,000 fund is only about $55 per year, while breaking the CD costs about $270 in penalty. If you want slightly higher rates on a portion of your fund, use a CD ladder for 33-50% of the balance while keeping the rest liquid in a HYSA. See our emergency fund guide for a full breakdown.",
  },
  {
    question: "What is a CD ladder and when does it beat a HYSA?",
    answer:
      "A CD ladder splits your savings across multiple CDs with staggered maturity dates — for example, $10,000 each in 6-month, 9-month, 12-month, and 18-month CDs. One CD matures every few months, giving you periodic liquidity while locking in fixed rates. Using Marcus's October 17, 2026 rates (3.95%, 4.30%, 4.40%, 4.40%), a $40,000 four-rung ladder blends to about 4.26% APY — roughly $105 more per year than a 4.00% HYSA and $305 more than Marcus's own 3.50% savings rate, but no better than the very best 4.27% HYSA. Ladders beat a HYSA mainly when your bank's savings rate is low or you want to lock rates before they fall; they are not a reason to leave a competitive HYSA.",
  },
  {
    question: "How does the Fed's September 2026 rate hike affect HYSA and CD rates?",
    answer:
      "On September 16, 2026 the FOMC raised the federal funds target range by 0.25 percentage point to 3.75-4.00%, and its next meeting is October 28, 2026. HYSA rates are variable, so banks can raise them as the Fed tightens; CD rates on new accounts also move with market yields, but a CD you have already opened stays fixed. That makes timing a bet in both directions: a HYSA benefits if more hikes follow, while a CD protects you if rates reverse. If you are unsure, splitting a lump sum — for example half in a HYSA and half in a 12-month CD — limits the regret either way.",
  },
];

export default function HighYieldSavingsVsCdGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="High-Yield Savings Account vs CD: Which Is Better in 2026?"
        description="High yield savings vs CD with October 2026 APYs. See when a HYSA wins on flexibility, when a CD wins on rate-locking, plus a $30,000 example."
        slug="high-yield-savings-vs-cd"
        datePublished="2026-08-24"
        dateModified="2026-10-18"
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
            You have $30,000 sitting in a savings account earning the 0.37%
            national average (FDIC, September 2026) — about $111 per year.
            Two FDIC-insured alternatives pay roughly 11 times that: the best
            high-yield savings accounts at 3.90-4.27% APY and 12-month
            certificates of deposit at 4.40-4.83% APY. The Federal Reserve
            raised rates in September 2026 after cutting them in 2025, which
            makes the choice between a variable HYSA rate and a locked CD
            rate a real bet on direction. This guide compares October 2026 rates,
            runs the numbers on $30,000, and shows you exactly when each
            account type wins.
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
              <strong>HYSA wins for flexibility:</strong> best listed rate
              4.27% APY (October 2026), unlimited deposits, penalty-free
              withdrawals, variable rate that can rise with the Fed
            </li>
            <li>
              <strong>CD wins for rate-locking:</strong> 4.40-4.83% APY on
              12-month terms, fixed rate guaranteed for the full term, ideal
              when you know your withdrawal date
            </li>
            <li>
              <strong>The $30,000 gap:</strong> A 12-month CD at 4.50% earns
              $1,350/year vs $1,281 in a 4.27% HYSA — a $69 difference that
              is smaller than the roughly $338 penalty for breaking the CD
              early
            </li>
            <li>
              <strong>Best hybrid:</strong> HYSA for emergency funds and
              short-term goals; CD or CD ladder for fixed-date savings of
              $15,000+ over 12-18 months, especially if your bank pays
              well below the top HYSA rate
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
              alt="Infographic comparing a high-yield savings account at 4.27% APY with a 12-month CD at 4.50% APY on $30,000: $1,281 versus $1,350 interest, a $69 yearly difference, October 2026 rates"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              High-yield savings vs CD: $30,000 for one year at a 4.27% HYSA vs a 4.50% 12-month CD (rates as of October 2026)
            </figcaption>
          </figure>
        </section>

        {/* Current Rates Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Current Rates: HYSA vs CD Terms (October 2026)
          </h2>
          <p className="mt-4 text-ink-700">
            The gap between a mainstream online bank and the best rate on the
            market is now larger than the gap between a HYSA and a CD. At
            Marcus by Goldman Sachs, the 12-month CD pays 4.40% versus 3.50%
            on its savings account — a 0.90-point premium. Across the whole
            market, the best listed 12-month CD (4.83%, Forbes Advisor,
            October 14, 2026) beats the best listed HYSA (4.27%, Bankrate,
            October 17, 2026) by 0.56 points. Ally's savings account pays
            3.10% APY, so shopping rates matters more than choosing between
            the two account types.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Account Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Marcus APY (issuer page)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    Top Listed APY
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    $30,000 at Marcus APY
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    $30,000 at Top Listed APY
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <tr className="bg-brand-50/50">
                  <td className="px-4 py-3 font-medium">High-yield savings (HYSA)</td>
                  <td className="px-4 py-3">3.50%</td>
                  <td className="px-4 py-3">4.27% (Peak Bank)</td>
                  <td className="px-4 py-3">$1,050 (1 yr)</td>
                  <td className="px-4 py-3">$1,281 (1 yr)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">6-month CD</td>
                  <td className="px-4 py-3">3.95%</td>
                  <td className="px-4 py-3">4.94%</td>
                  <td className="px-4 py-3">$587 (6 mo.)</td>
                  <td className="px-4 py-3">$732 (6 mo.)</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3 font-medium">12-month CD</td>
                  <td className="px-4 py-3">4.40%</td>
                  <td className="px-4 py-3">4.83%</td>
                  <td className="px-4 py-3">$1,320 (1 yr)</td>
                  <td className="px-4 py-3">$1,449 (1 yr)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">18-month CD</td>
                  <td className="px-4 py-3">4.40%</td>
                  <td className="px-4 py-3">4.85% (Bread Savings)</td>
                  <td className="px-4 py-3">$2,002 (18 mo.)</td>
                  <td className="px-4 py-3">$2,209 (18 mo.)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *APYs as of October 14-17, 2026. Marcus APYs are from marcus.com
            (October 17, 2026). Top listed HYSA rate from Bankrate (October
            17, 2026); top listed 6- and 12-month CD rates from Forbes
            Advisor (October 14, 2026); top listed 18-month rate from Bankrate
            (Bread Savings, October 16, 2026, $1,500 minimum). Interest
            assumes the stated APY for the full term and no withdrawals. HYSA
            rates are variable and can change at any time; CD rates are fixed
            at opening.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            For context, the FDIC's national average rates as of September
            21, 2026 were 0.37% for savings, 1.41% for a 6-month CD, 1.73% for
            a 12-month CD, and 1.61% for a 24-month CD.
          </p>
          <Sources
            className="mt-2"
            items={[
              {
                label: "FDIC National Rates and Rate Caps",
                href: "https://www.fdic.gov/national-rates-and-rate-caps",
              },
              {
                label: "FOMC statement, September 16, 2026",
                href: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm",
              },
              {
                label: "Marcus CD rates",
                href: "https://www.marcus.com/us/en/savings/high-yield-cds/cd-rates",
              },
            ]}
            checked="October 2026"
          />
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
                dramatically higher interest. Marcus pays 3.50% APY and Ally
                pays 3.10% APY (issuer pages, October 16-17, 2026), while the
                best listed accounts reach 4.27% APY (Peak Bank, Bankrate) —
                more than 11 times the FDIC national average of 0.37%.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-ink-800">Key Features</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Variable rate — rises and falls with Fed policy</li>
                    <li>Unlimited deposits at any time</li>
                    <li>Withdrawals with no penalty (some banks cap transfers, e.g. Ally at 10 per statement cycle)</li>
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
                    <li>No guarantee your 4.27% APY stays at 4.27% for 12 months</li>
                    <li>The Fed raised its target range to 3.75-4.00% on September 16, 2026</li>
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
                penalty — from 60 days of interest (Ally, 3-24 month CDs) to
                270 days (Popular Direct, 12-36 month CDs).
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-ink-800">Key Features</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Fixed rate locked for the full term</li>
                    <li>One-time deposit at opening (no additions)</li>
                    <li>Early withdrawal penalty: 60-270 days of interest, by bank and term</li>
                    <li>Maturity date is predetermined (e.g., October 2027)</li>
                    <li>Auto-renewal option at maturity (check new rate)</li>
                    <li>FDIC insured up to $250,000 per bank</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-800">Rate Behavior</h4>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    <li>Rate locked regardless of Fed cuts or hikes after you open it</li>
                    <li>Longer terms do not always pay more: Marcus pays 4.40% on every term from 12 months to 6 years</li>
                    <li>Rate-shop: top 12-month rates run 4.40-4.83% vs the 1.73% FDIC national average</li>
                    <li>No-penalty CDs pay less: Marcus 11-month no-penalty is 4.00% vs 4.40% for its 12-month CD</li>
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
              for making a commitment. In October 2026 that commitment is
              worth 0.23 points at the very top of the market (4.50% CD vs
              4.27% HYSA) and 0.90 points at Marcus (4.40% vs 3.50%) — the
              bank's compensation for knowing exactly how long it holds
              your money, and your compensation for giving up access.
            </p>
          </div>
        </section>

        {/* When HYSA Wins */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When a High-Yield Savings Account Wins
          </h2>
          <p className="mt-4 text-ink-700">
            A HYSA is the right default for most savers in 2026. If you
            rate-shop, the premium a 12-month CD pays over the best HYSA is
            only 0.23-0.56 percentage points, which is often smaller than the
            cost of one early withdrawal.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                1. Emergency fund storage
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Emergency funds must be accessible within 24-48 hours. A $24,000
                emergency fund in a 12-month CD at 4.50% APY earns $1,080/year
                — but breaking it early for a $6,000 car repair costs a
                3-month interest penalty of approximately $270 (banks such as
                Ally do not allow partial CD withdrawals, so you may have to
                close the whole CD). The same $24,000 in a 4.27% HYSA earns
                $1,025/year with zero penalty for withdrawal. The $55 annual
                difference is negligible compared to the $270 penalty risk.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                2. Saving for a goal under 2 years with ongoing deposits
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                CDs accept one deposit at opening. If you are saving $1,500/month
                toward a $20,000 vacation fund over 13 months, a HYSA at 4.27%
                lets you deposit incrementally and earn about $483 in total
                interest on the $19,500 you contribute. A CD requires you to
                wait until you have the full amount — meaning each $1,500
                sits in checking, earning roughly $1 in total over the same 13
                months, until you can lock it in. The delay costs about $482
                of interest compared with depositing into a HYSA immediately.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. You expect rates to rise
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                The Fed raised its target range to 3.75-4.00% on September 16,
                2026, and the FOMC meets again on October 28. If more hikes
                follow, a HYSA reprices automatically. Suppose a $30,000
                HYSA starts at 4.27% and climbs to 4.90% after six months: it
                earns about $1,375 over the year, $25 more than a 12-month CD
                locked at 4.50% ($1,350). The edge is small unless rates move
                a lot — which is why a HYSA is the default when you are
                unsure of direction.
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
                premium costs $69/year on $30,000, which is cheap insurance
                against a $338 early withdrawal penalty.
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
            modest but guaranteed — and that guarantee matters most when your
            current HYSA rate is low or rates could reverse. The Fed cut in
            2025 and raised in September 2026, so a direction call is risky.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                1. Saving for a known future date
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Wedding in exactly 14 months? Property tax due in 12 months?
                A CD matched to your withdrawal date locks in today's rate
                with zero ongoing management. A $15,000 12-month CD at 4.50%
                APY matures to $15,675 — you know the exact amount on day
                one. A HYSA that starts at 4.27% and slips to 3.50% after six
                months earns about $583 instead of the CD's guaranteed
                $675. The CD eliminates that $92 uncertainty.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                2. You expect rates to fall
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Rates have already reversed direction once in a year. If you believe the
                September hike was the last one and rates will drift lower,
                locking a 4.50% 12-month CD today protects your yield. On
                $30,000, a HYSA that starts at 4.27% and falls to 3.50% by
                month 6 earns approximately $1,165 over the year — $185 less
                than the CD's guaranteed $1,350. This is a forecast, not
                a prediction: the same HYSA that falls to 3.50% could just as
                easily rise to 4.90%.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-5">
              <h3 className="font-semibold text-ink-800">
                3. You have a lump sum ready now
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Inherited $50,000? Sold a car for $18,000? Received a bonus?
                A CD maximizes yield on money you will not add to later. There
                is no advantage to a HYSA's unlimited deposit feature if
                the full amount is already saved. A $50,000 18-month CD at
                Marcus's 4.40% APY earns $3,336 over the term — $688 more
                than the same amount in Marcus's 3.50% savings account
                ($2,648) and about $100 more than a 4.27% HYSA ($3,236). If
                your current bank pays a mainstream rate, the CD premium is
                no longer small.
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
                vacations ($3,200 total), the CD's lock-in would have
                preserved the full balance. The $69/year rate premium on
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
                    HYSA at 4.27% APY
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-ink-800">
                    12-Month CD at 4.50% APY
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
                    $1,281
                  </td>
                  <td className="px-4 py-3 font-medium">$1,350</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Ending balance</td>
                  <td className="px-4 py-3">$31,281</td>
                  <td className="px-4 py-3">$31,350</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Additional deposits allowed</td>
                  <td className="px-4 py-3">Yes, unlimited</td>
                  <td className="px-4 py-3">No</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Early withdrawal penalty</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3">~$338 (3 months interest)</td>
                </tr>
                <tr className="bg-brand-50/50 font-medium">
                  <td className="px-4 py-3">CD advantage</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3 text-brand-700">+$69/year</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            *Interest calculated on $30,000 at stated APY for 12 months.
            Assumes the HYSA rate stays at 4.27% (best listed, Bankrate,
            October 17, 2026) — actual HYSA earnings vary if rates change. The
            12-month CD rate of 4.50% is a widely available rate (for
            example, Popular Direct, $10,000 minimum, per NerdWallet). Early
            withdrawal penalty assumes 3 months of interest, the charge at
            Capital One 360 and Marcus for CDs of 12 months or less.
          </p>

          <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="font-medium text-amber-800">Is $69 Worth It?</p>
            <p className="mt-1 text-sm text-amber-700">
              The CD earns $69 more — $5.75 per month — in exchange for
              locking $30,000 with no access for 12 months. If you need even
              $5,000 before maturity, the 3-month early withdrawal penalty
              ($338) wipes out 4.9 years of that $69 premium. The gap widens
              if your HYSA pays less: against Marcus's 3.50% savings rate
              the same CD earns $270 more, and against the best listed
              12-month CD (4.83%) the premium over a 4.27% HYSA is $168. The CD only
              makes financial sense if you are confident you will not touch
              the money early. For most savers, the HYSA's flexibility
              is worth far more than $5.75/month.
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
                  <li>Timeline: 18 months (April 2028 purchase target)</li>
                  <li>Current savings: $32,000 already saved (October 2026)</li>
                  <li>Monthly contribution: $1,000/month ($18,000 over 18 months)</li>
                  <li>Total at goal date before interest: $50,000</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink-800">
                  His Optimal Split Strategy
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>
                    <strong>$26,000</strong> in a Marcus 18-month CD at 4.40%
                    APY (locked until April 2028)
                  </li>
                  <li>
                    <strong>$6,000 plus $1,000/month</strong> in a rate-shopped
                    HYSA at 4.00% APY (the Bankrate top-12 list spans
                    3.90-4.27%)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                Why This Split Works
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                Tom already has $32,000 saved, but CDs accept no additional
                deposits, so his $1,000/month contributions must go into a
                HYSA regardless. He locks $26,000 in an 18-month CD matched to
                his purchase date: at 4.40% APY it earns a guaranteed $1,735
                no matter what the Fed does next. The remaining $6,000 and
                every monthly deposit sit in the HYSA, which grows to about
                $24,873 by month 18 and provides a penalty-free buffer if the
                purchase date shifts.
              </p>
              <p className="mt-3 text-sm text-ink-700">
                At closing he holds $27,735 from the CD ($26,000 plus $1,735)
                and $24,873 from the HYSA — $52,608 in total, which includes
                $2,608 of interest. By month 14 the HYSA alone holds about
                $20,583, so a closing date that moves up two months never
                forces him to break the CD.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                18-Month Interest Comparison
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">All in Marcus HYSA (3.50%)</p>
                  <p className="font-semibold text-ink-800">~$2,141</p>
                </div>
                <div className="rounded-lg bg-ink-50 p-3">
                  <p className="text-ink-500">All in HYSA (4.00%)</p>
                  <p className="font-semibold text-ink-800">~$2,449</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-ink-500">Split strategy</p>
                  <p className="font-semibold text-brand-700">~$2,608</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-ink-500">Extra vs 4.00% HYSA</p>
                  <p className="font-semibold text-brand-700">+$159</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-700">
                Tom's split earns about $159 more over 18 months than a
                rate-shopped 4.00% HYSA, and $467 more than keeping everything
                in a 3.50% savings account. The takeaway: when your HYSA is
                already near the top of the market, a CD is mostly insurance
                against falling rates, not a large raise. If he had left the
                money at a mainstream bank paying 3.50%, the CD would have
                mattered far more.
              </p>
              <p className="mt-2 text-xs text-ink-500">
                *Month-by-month calculation with monthly compounding at the
                stated APY, deposits at the end of each month, and constant
                rates for 18 months. HYSA rates are variable, so actual
                results will differ.
              </p>
            </div>

            <div className="mt-6 border-t border-ink-100 pt-4">
              <h4 className="font-semibold text-ink-800">
                What Tom Avoided
              </h4>
              <p className="mt-2 text-sm text-ink-700">
                Leaving all $32,000 in a 3.50% HYSA would have cost him $467 in
                forgone interest. Breaking the $26,000 CD to cover a
                closing-date change would cost about $564 (180 days of
                interest at 4.40%, the Marcus charge for CDs over 12 months),
                which is more than three times the $159 he gained from the
                split. Matching the CD to his purchase date and keeping the
                HYSA as the flexible layer means he never has to choose
                between the two.
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
                  <td className="px-4 py-3">Fixed date, lump sum ready; 4.40-4.85% APY rate lock (Marcus to Bread Savings)</td>
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
                  <td className="px-4 py-3">Uncertain timeline; flexibility worth more than the 0.23-0.56 point CD premium</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-semibold text-ink-800">
            Sample 4-Rung CD Ladder on $40,000 (Marcus Rates, October 17, 2026)
          </h3>
          <p className="mt-2 text-ink-700">
            For savers with $40,000 and a 6-18 month horizon who want fixed
            rates and a maturing rung every few months, here is a ladder built
            entirely from Marcus's published high-yield CD rates:
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
                    Interest Over Term
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
                  <td className="px-4 py-3">6 months</td>
                  <td className="px-4 py-3">3.95%</td>
                  <td className="px-4 py-3">$196</td>
                  <td className="px-4 py-3">April 2027</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Rung 2</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3">9 months</td>
                  <td className="px-4 py-3">4.30%</td>
                  <td className="px-4 py-3">$321</td>
                  <td className="px-4 py-3">July 2027</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Rung 3</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3">12 months</td>
                  <td className="px-4 py-3">4.40%</td>
                  <td className="px-4 py-3">$440</td>
                  <td className="px-4 py-3">October 2027</td>
                </tr>
                <tr className="bg-ink-50/50">
                  <td className="px-4 py-3">Rung 4</td>
                  <td className="px-4 py-3">$10,000</td>
                  <td className="px-4 py-3">18 months</td>
                  <td className="px-4 py-3">4.40%</td>
                  <td className="px-4 py-3">$667</td>
                  <td className="px-4 py-3">April 2028</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-ink-700">
            On an annualized basis the four rungs earn $395 + $430 + $440 +
            $440 = $1,705 on $40,000, a blended 4.26% APY. That compares with
            $1,708 in a 4.27% HYSA, $1,600 in a 4.00% HYSA, and $1,400 in
            Marcus's 3.50% savings account. In other words, the ladder
            beats a mainstream or mid-tier savings rate by $105-$305 per year
            but does not beat the single best HYSA; its real value is locking
            those rates and giving you access to $10,000 at months 6, 9, 12,
            and 18 without penalty. Use our{" "}
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
              HYSA, or CD ladder if your savings rate is more than about 0.5
              points below the top 12-month CD and you will not need more than
              25% of the balance at any one time.
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
        <RelatedGuides currentSlug="high-yield-savings-vs-cd" relatedSlugs={["emergency-fund-where-to-keep", "save-50000-in-3-years"]} />
      </article>
    </>
  );
}
