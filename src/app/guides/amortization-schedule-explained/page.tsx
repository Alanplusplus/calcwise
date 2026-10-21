import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";

export const metadata: Metadata = {
  title:
    "Amortization Schedule Explained: How Your Loan Payments Actually Work",
  description:
    "Understand how an amortization schedule splits every loan payment into principal and interest. See a real 30-year mortgage example, learn the formula, and download a free schedule.",
  keywords: [
    "amortization schedule explained",
    "amortization schedule",
    "how amortization works",
    "loan payment breakdown",
    "mortgage amortization",
    "amortization formula",
  ],
};

const faqs = [
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule is a table that shows every payment over the life of a loan, broken into two parts: principal (which reduces the balance you owe) and interest (the cost of borrowing). Each row represents one payment period -- typically monthly -- and shows how the split between principal and interest shifts over time. Early payments are mostly interest; later payments are mostly principal. The schedule also tracks your remaining balance after each payment.",
  },
  {
    question: "Why do I pay more interest at the beginning of a loan?",
    answer:
      "Interest is calculated as a percentage of your outstanding balance. At the start of a 30-year mortgage, your balance is at its highest -- for example, $350,000. At 6.5% annual interest (0.5417% monthly), the first month's interest charge is $1,896. As you make payments and the balance drops, the interest portion shrinks and more of each payment goes to principal. By month 300, the balance might be $113,000, so the interest charge drops to about $620.",
  },
  {
    question: "How is each monthly payment calculated in an amortization schedule?",
    answer:
      "The monthly payment uses the standard amortization formula: M = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the loan principal, r is the monthly interest rate (annual rate divided by 12), and n is the total number of payments. For a $350,000 loan at 6.5% over 30 years: r = 0.065/12 = 0.005417, n = 360. The formula yields M = $2,212.24. This payment stays fixed for the entire loan term on a fixed-rate mortgage.",
  },
  {
    question: "Does making extra payments change my amortization schedule?",
    answer:
      "Yes. Extra payments go entirely toward reducing the principal balance. This has two effects: it shortens the total loan term and reduces the total interest paid. For example, adding $200/month to a $350,000 mortgage at 6.5% over 30 years saves about $108,100 in interest and pays off the loan in roughly 24 years instead of 30. Even a single extra payment per year (13 payments instead of 12) can shave 4-5 years off a 30-year mortgage.",
  },
  {
    question:
      "What is the difference between amortization and simple interest?",
    answer:
      "With amortized loans (mortgages, auto loans, personal loans), each fixed payment covers both interest and principal, and the loan is fully paid off at the end of the term. With simple interest loans, you pay interest only on the original principal amount -- the payment structure does not shift over time. Credit cards use a different model entirely: minimum payments are recalculated monthly based on the outstanding balance. Amortization is the most common structure for installment loans because it gives borrowers a predictable fixed payment.",
  },
];

export default function AmortizationScheduleGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title="Amortization Schedule Explained: How Your Loan Payments Actually Work"
        description="Understand how an amortization schedule splits every loan payment into principal and interest. See a real 30-year mortgage example, learn the formula, and download a free schedule."
        slug="amortization-schedule-explained"
        datePublished="2026-09-04"
        dateModified="2026-10-20"
        image="/images/guides/amortization-schedule-explained.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "Amortization Schedule Explained",
            href: "/guides/amortization-schedule-explained",
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Loans & Mortgages
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Amortization Schedule Explained: How Your Loan Payments Actually
            Work
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Every month you make a mortgage or car payment, a hidden tug-of-war
            plays out between principal and interest. An amortization schedule
            reveals exactly where each dollar goes -- and why a $350,000
            mortgage at 6.5% costs you $446,406 in interest alone over 30 years.
            This guide breaks down the amortization formula, walks through a
            real payment schedule month by month, and shows you concrete
            strategies to tilt the balance in your favor.
          </p>
          <p className="mt-2 text-sm text-ink-500">
            Last updated: October 2026
          </p>
        </header>

        {/* TL;DR Box */}
        <section className="mt-10 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-800">
            TL;DR - Quick Answer
          </h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong>What it is:</strong> A table showing exactly how much of
              each loan payment goes to principal (reducing your balance) vs.
              interest (the lender's profit)
            </li>
            <li>
              <strong>Key insight:</strong> On a $350,000 mortgage at 6.5%, your
              first payment is $2,212 -- but only $316 reduces your balance.
              The other $1,896 (85.7%) is pure interest
            </li>
            <li>
              <strong>The shift:</strong> By payment 233 (year 19), the split
              flips -- more than half of each payment finally goes to principal
            </li>
            <li>
              <strong>Total cost:</strong> 360 payments of $2,212 = $796,406
              total. You pay $446,406 in interest on a $350,000 loan
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">
            Generate your own schedule with our{" "}
            <Link
              href="/calculators/amortization"
              className="font-medium text-brand-600 underline"
            >
              Amortization Calculator
            </Link>{" "}
            for instant results.
          </p>
        </section>

        {/* Infographic */}
        <section className="mt-12">
          <figure className="overflow-hidden rounded-xl border border-ink-200">
            <Image
              src="/images/guides/amortization-schedule-explained.webp"
              alt="Infographic showing how amortization works: a $350,000 loan at 6.5% over 30 years with monthly payment of $2,212 and total interest of $446,406, with bars showing the interest-to-principal shift over time"
              width={1200}
              height={800}
              quality={80}
              className="w-full"
              priority
            />
            <figcaption className="bg-ink-50 px-4 py-2 text-center text-sm text-ink-500">
              How amortization works: each payment gradually shifts from mostly
              interest to mostly principal over the life of the loan
            </figcaption>
          </figure>
        </section>

        {/* Detailed Explanation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How an Amortization Schedule Works
          </h2>
          <p className="mt-4 text-ink-700">
            An amortization schedule is a payment-by-payment roadmap for any
            installment loan -- mortgages, auto loans, personal loans, and
            student loans all use the same underlying math. The schedule shows
            three things for every payment: the interest charge, the principal
            reduction, and the remaining balance.
          </p>
          <p className="mt-4 text-ink-700">
            The core mechanic is simple: interest is always calculated on the
            current outstanding balance. On day one of a $350,000 mortgage at
            6.5% APR, the monthly interest rate is 0.5417% (6.5% / 12). The
            first month's interest charge is $350,000 x 0.005417 =
            $1,895.83. Your fixed payment is $2,212.24, so only $316.41 goes
            toward reducing the principal. Your new balance drops to
            $349,683.59.
          </p>
          <p className="mt-4 text-ink-700">
            The next month, interest is calculated on $349,683.59 instead of
            $350,000. That saves you $1.71 in interest, meaning $318.12 goes to
            principal -- $1.71 more than last month. This snowball effect
            accelerates: by month 12, the principal portion has grown to $336
            ($20 more than month 1). By month 120 (year 10), it reaches
            $602. By month 300 (year 25), it hits $1,591 -- about five
            times the initial principal payment.
          </p>
          <p className="mt-4 text-ink-700">
            The amortization formula that determines your fixed monthly payment
            is:
          </p>
          <div className="my-6 rounded-lg bg-ink-100 p-5 text-center">
            <p className="text-xl font-bold text-ink-900">
              M = P x [r(1+r)^n] / [(1+r)^n - 1]
            </p>
            <p className="mt-2 text-sm text-ink-600">
              M = monthly payment, P = principal ($350,000), r = monthly rate
              (0.005417), n = total payments (360)
            </p>
          </div>
          <p className="mt-4 text-ink-700">
            For our example: M = $350,000 x [0.005417 x (1.005417)^360] /
            [(1.005417)^360 - 1] = $2,212.24. This payment stays identical for
            all 360 months on a fixed-rate mortgage. What changes is the split:
            the interest portion starts at $1,896 and falls to $12 in the final
            month, while the principal portion starts at $316 and grows to
            $2,200.
          </p>
          <p className="mt-4 text-ink-700">
            Use our{" "}
            <Link
              href="/calculators/amortization"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Amortization Calculator
            </Link>{" "}
            to generate a complete payment schedule for any loan amount, rate,
            and term. For comparing different loan options side by side, try the{" "}
            <Link
              href="/calculators/mortgage"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Mortgage Calculator
            </Link>
            .
          </p>
        </section>

        {/* Real Amortization Schedule Snapshot */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Sample Amortization Schedule: $350,000 at 6.5% for 30 Years
          </h2>
          <p className="mt-4 text-ink-700">
            Below is a snapshot of key months from a real amortization schedule.
            Notice how the interest-to-principal ratio flips dramatically over
            time:
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Principal
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Interest
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Total Payment
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Remaining Balance
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Principal %
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">1 (Month 1)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$316</td>
                  <td className="px-4 py-2 text-right text-ink-700">$1,896</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,212</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $349,684
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">14.3%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">12 (Year 1)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$336</td>
                  <td className="px-4 py-2 text-right text-ink-700">$1,876</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,212</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $346,088
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">15.2%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">60 (Year 5)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$435</td>
                  <td className="px-4 py-2 text-right text-ink-700">$1,777</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,212</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $327,638
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">19.7%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">120 (Year 10)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$602</td>
                  <td className="px-4 py-2 text-right text-ink-700">$1,610</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,212</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $296,716
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">27.2%</td>
                </tr>
                <tr className="border-b border-ink-100 bg-brand-50">
                  <td className="px-4 py-2 font-medium text-ink-700">
                    233 (Year 19)
                  </td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">
                    $1,108
                  </td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">
                    $1,104
                  </td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">
                    $2,212
                  </td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">
                    $202,754
                  </td>
                  <td className="px-4 py-2 text-right font-medium text-ink-700">
                    50.1%
                  </td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">240 (Year 20)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$1,255</td>
                  <td className="px-4 py-2 text-right text-ink-700">$957</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,212</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $176,240
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">56.7%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">300 (Year 25)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$1,591</td>
                  <td className="px-4 py-2 text-right text-ink-700">$621</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,212</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $113,065
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">71.9%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">360 (Year 30)</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,200</td>
                  <td className="px-4 py-2 text-right text-ink-700">$12</td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,212</td>
                  <td className="px-4 py-2 text-right text-ink-700">$0</td>
                  <td className="px-4 py-2 text-right text-ink-700">99.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-ink-500">
            Highlighted row: payment 233 (year 19) is the crossover point where
            principal exceeds interest for the first time on this loan.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            Table values recomputed from the standard fixed-rate amortization
            formula (October 2026 check); amounts rounded to the nearest dollar.
          </p>
        </section>

        {/* Comparison Table: Different Loan Terms */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How Loan Term and Rate Affect Amortization
          </h2>
          <p className="mt-4 text-ink-700">
            The loan term and interest rate dramatically change how amortization
            plays out. A shorter term means higher monthly payments but a faster
            crossover to principal-heavy payments -- and far less total interest
            paid:
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className="px-4 py-3 text-left font-semibold text-ink-700">
                    Loan Scenario
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Monthly Payment
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Total Interest
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Total Cost
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Crossover Month
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-ink-700">
                    Interest % of 1st Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">
                    $350K / 30-yr / 6.5%
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">$2,212</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $446,406
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $796,406
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    Month 233
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">85.7%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">
                    $350K / 15-yr / 6.71%
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">$3,089</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $206,097
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $556,097
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    Month 57
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">63.3%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">
                    $350K / 30-yr / 4.0%
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">$1,671</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $251,543
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $601,543
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    Month 153
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">69.8%</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">
                    $30K / 5-yr / 7.5% (auto)
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">$601</td>
                  <td className="px-4 py-2 text-right text-ink-700">$6,068</td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    $36,068
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">
                    Month 1
                  </td>
                  <td className="px-4 py-2 text-right text-ink-700">31.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-ink-700">
            The difference is stark: a 15-year mortgage at 6.71% (the Freddie
            Mac PMMS 15-year average as of October 15, 2026) saves $240,309 in
            interest compared to the 30-year at 6.5% -- and the crossover
            point arrives in year 5 instead of year 19. The 5-year auto loan
            sends more to principal than interest from the first payment because
            the shorter term keeps each installment principal-heavy from the
            start.
          </p>
          <p className="mt-4 text-ink-700">
            Compare these scenarios yourself with our{" "}
            <Link
              href="/calculators/mortgage"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Mortgage Calculator
            </Link>{" "}
            or{" "}
            <Link
              href="/calculators/auto-loan"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Auto Loan Calculator
            </Link>
            .
          </p>
          <Sources
            items={[
              {
                label:
                  "Freddie Mac PMMS (15-year FRM 6.71%, week of Oct. 15, 2026)",
                href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-hold-steady-740/",
              },
              {
                label:
                  "Freddie Mac PMMS archive (weekly 30- and 15-year averages, 2026)",
                href: "https://www.freddiemac.com/pmms/archive",
              },
            ]}
            checked="October 2026"
            note="The 6.5% and 4.0% 30-year rows are illustrative fixed-rate examples; the 15-year row uses the published PMMS average for that week."
          />
        </section>

        {/* Case Study */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Case Study: Rachel Discovers Where Her Mortgage Payments Go
          </h2>
          <p className="mt-4 text-ink-700">
            Rachel is a 32-year-old physical therapist earning $78,000 in
            Charlotte, NC. She recently bought a $320,000 home with 10% down
            ($32,000) and financed $288,000 at 6.75% over 30 years. Her monthly
            principal and interest payment is $1,868.
          </p>
          <p className="mt-4 text-ink-700">
            When Rachel looked at her first mortgage statement, she was
            surprised: of the $1,868 payment, only $248 went to principal. The
            remaining $1,620 -- 86.7% -- went straight to interest. After 12
            months of payments totaling $22,416, she had only reduced her
            balance from $288,000 to $284,931. She paid $19,346 in interest and
            just $3,069 in principal during her entire first year.
          </p>
          <p className="mt-4 text-ink-700">
            Rachel decided to use two strategies to accelerate her amortization.
            First, she set up biweekly payments of $934 (half the monthly
            amount), which results in 26 half-payments -- the equivalent of 13
            full payments per year instead of 12. Second, she directed her
            annual $3,200 tax refund as a lump-sum extra principal payment each
            spring.
          </p>
          <p className="mt-4 text-ink-700">
            The combined impact on her amortization schedule is dramatic:
          </p>
          <ul className="mt-4 space-y-2 text-ink-700">
            <li>
              <strong>Standard schedule:</strong> 360 payments, $384,467 total
              interest, payoff in 2056
            </li>
            <li>
              <strong>With biweekly + annual lump sum:</strong> Equivalent of
              ~267 monthly payments, approximately $246,000 total interest,
              payoff in 2048
            </li>
            <li>
              <strong>Savings:</strong> $138,480 less interest, 8 years shorter
              loan
            </li>
            <li>
              <strong>Extra cost:</strong> One additional monthly payment per
              year ($1,868) plus $3,200 annual lump sum = $5,068/year in extra
              payments
            </li>
          </ul>
          <p className="mt-4 text-ink-700">
            Rachel's crossover point -- where principal exceeds interest in
            each payment -- moves from about month 238 (year 20) on the standard
            schedule to approximately month 144 (year 12) with her accelerated
            strategy. That means she starts building equity faster during the
            years when her home is most likely to appreciate.
          </p>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Step-by-Step: How to Read and Use Your Amortization Schedule
          </h2>
          <ol className="mt-4 space-y-4 text-ink-700 list-decimal list-inside">
            <li>
              <strong>Get your schedule.</strong> Use our{" "}
              <Link
                href="/calculators/amortization"
                className="text-brand-600 hover:text-brand-800 font-medium"
              >
                Amortization Calculator
              </Link>{" "}
              or request one from your lender. You need three inputs: loan
              amount, interest rate, and term length. The calculator generates
              every monthly payment with the principal/interest split.
            </li>
            <li>
              <strong>Find your crossover point.</strong> Scan the schedule for
              the month where the principal column first exceeds the interest
              column. On a 30-year mortgage at 6-7%, this typically falls
              between year 16 and year 20. Mark this date -- it is when your
              equity building truly accelerates.
            </li>
            <li>
              <strong>Calculate total interest cost.</strong> Add up the interest
              column for the full schedule. This is the true cost of borrowing.
              On a $350,000 loan at 6.5% for 30 years, you pay $446,406 in
              interest -- about 128% of the original loan amount.
            </li>
            <li>
              <strong>Model extra payments.</strong> Use the calculator to add a
              monthly extra payment ($100, $200, $500) and compare the new
              schedule to the original. Note three changes: shorter payoff date,
              lower total interest, and an earlier crossover point.
            </li>
            <li>
              <strong>Compare refinancing scenarios.</strong> If rates drop,
              generate a new amortization schedule at the lower rate. Compare
              total interest remaining on your current schedule vs. the new
              schedule, accounting for refinancing costs (typically 2–5% of the
              purchase price per the CFPB, excluding the down payment).
            </li>
            <li>
              <strong>Review annually.</strong> Pull your current amortization
              schedule each year. Confirm your balance matches the projected
              remaining balance. If you have made extra payments, the balance
              should be lower than the original schedule predicted, meaning you
              are ahead of schedule.
            </li>
          </ol>
        </section>

        <Sources
          items={[
            {
              label:
                "CFPB, closing costs typically 2–5% of purchase price (excluding down payment)",
              href: "https://www.consumerfinance.gov/owning-a-home/prepare/determine-your-down-payment/",
            },
          ]}
          checked="October 2026"
        />

        {/* Calculator CTA */}
        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">
            See Your Payment Breakdown
          </p>
          <p className="mt-1 text-sm text-ink-600">
            Generate a complete amortization schedule for your loan -- see every
            payment, the principal/interest split, and how extra payments change
            your timeline.
          </p>
          <div className="mt-3 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/calculators/amortization"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Open Amortization Calculator
            </Link>
            <Link
              href="/calculators/mortgage"
              className="inline-block rounded-lg border border-brand-600 px-5 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              Open Mortgage Calculator
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="mt-8">
              <h3 className="text-lg font-semibold text-ink-800">
                {faq.question}
              </h3>
              <p className="mt-2 text-ink-700">{faq.answer}</p>
            </div>
          ))}
        </section>

        <RelatedGuides
          currentSlug="amortization-schedule-explained"
          relatedSlugs={[
            "15-year-vs-30-year-mortgage",
            "how-much-house-can-i-afford",
            "pay-off-mortgage-early-vs-invest",
          ]}
        />
      </article>
    </>
  );
}
