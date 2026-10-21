import type { CalculatorVariant } from "./types";

// Credit card and $30K student loan variants removed — content consolidated into respective guides

export const debtPayoffVariants: CalculatorVariant[] = [
  {
    slug: "50000-student-loan",
    lastUpdated: "2026-10-21",
    title: "Pay Off $50,000 Student Loan — 6.52% Standard Plan",
    description:
      "Plan payoff for $50,000 in federal Direct Loans at the 6.52% 2026–27 undergraduate rate. Compare standard, extra payments, PSLF, and refinance.",
    defaults: { balance: "50000", interestRate: "6.52", monthlyPayment: "569", extraPayment: "100" },
    intro:
      "A $50,000 federal student loan balance is common for borrowers who attended private universities or borrowed across several years, usually at a blend of rates. This scenario uses one benchmark: the 6.52% fixed rate on new undergraduate Direct Subsidized and Unsubsidized Loans first disbursed between July 1, 2026 and June 30, 2027 (graduate unsubsidized loans carry 8.07% for the same year, so enter your own weighted-average rate if it differs). On the standard 10-year plan that produces a payment of about $568 a month before any extra amounts. Choosing a repayment strategy — standard versus income-driven plans, Public Service Loan Forgiveness (PSLF), or private refinancing — can change total cost by thousands of dollars.",
    tips: [
      "The standard 10-year payment on $50,000 at 6.52% is about $568/month, and the interest over 120 months comes to roughly $18,150. The pre-filled calculator rounds the payment up to $569 so the balance clears in exactly 120 months.",
      "Paying $669/month ($569 plus $100 extra in the pre-filled calculator) clears the balance in 97 months with about $14,326 in interest — saving roughly $3,827 and 23 months versus staying on the $569 schedule.",
      "Increasing to $800/month cuts the timeline to 77 months with about $11,254 in interest — nearly $6,900 less interest than the standard plan.",
      "Employer student loan assistance up to $5,250 per year can be excluded from your taxable income under IRC section 127 (2025–2026 limit). Applying $150/month from an employer program on top of your payment accelerates payoff without increasing your out-of-pocket cost.",
      "Refinancing from 6.52% to 4.5% on a new 10-year private loan drops the payment to about $518 and saves roughly $5,970 in total interest versus standard federal repayment, but you lose income-driven repayment, PSLF, and federal deferment options.",
    ],
    keyResults: [
      { label: "Standard 10-year payment (6.52%)", value: "About $568/month" },
      { label: "Total interest (standard plan)", value: "$18,153" },
      { label: "Payoff at $669/mo ($569 + $100 extra)", value: "97 months" },
      { label: "Refinance savings at 4.5% (10 yr)", value: "~$5,970 interest" },
      { label: "PSLF (qualifying public service)", value: "Balance forgiven after 120 qualifying payments on an eligible IDR plan" },
    ],
    comparisonNote:
      "Standard repayment at 6.52% costs about $18,153 in interest over 10 years. PSLF through an income-driven plan can forgive the remaining balance after 120 qualifying payments for full-time public service work — worth pursuing only if you expect a large forgiven balance and meet employer and loan-type rules. Refinancing to 4.5% saves a more predictable ~$5,970 in interest but eliminates federal protections. High-income private-sector borrowers often favor standard or extra payments; qualifying nonprofit or government workers should model PSLF before refinancing.",
    faq: [
      {
        q: "Am I eligible for Public Service Loan Forgiveness on $50,000?",
        a: "PSLF requires full-time work at a qualifying government or 501(c)(3) employer, eligible federal Direct Loans, an income-driven repayment plan, and 120 qualifying payments. FFEL or Perkins loans must be consolidated into a Direct Consolidation Loan first. Forgiveness is tax-free under current law. Use the PSLF Help Tool on StudentAid.gov to confirm employer and plan eligibility before relying on forgiveness math.",
      },
      {
        q: "What are the trade-offs of refinancing federal student loans?",
        a: "Refinancing $50,000 from 6.52% to 4.5% over 10 years lowers the payment from about $568 to $518 and cuts total interest by roughly $5,970, but you permanently lose income-driven repayment, PSLF, and federal deferment or forbearance. Refinancing suits stable high earners with strong credit who will not need federal safety nets.",
      },
      {
        q: "Does employer student loan repayment assistance help with $50,000 in debt?",
        a: "If your employer pays up to $5,250 per year toward qualified education loans under a section 127 plan, that amount is generally tax-free in 2025–2026. An extra $150/month from your employer applied to the $569 standard payment effectively adds $1,800 per year toward principal without increasing your paycheck withholding, shortening payoff and reducing interest — ask HR whether a written educational assistance program exists.",
      },
    ],
    sources: [
      {
        label: "FSA Partner Announcement GENERAL-26-33 (June 4, 2026) — 2026–27 Direct Loan fixed rates",
        href: "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/interest-rates-federal-direct-loans-first-disbursed-between-july-1-2026-and-june-30-2027",
      },
      {
        label: "IRS FAQ — Section 127 educational assistance ($5,250 exclusion, 2025–2026)",
        href: "https://www.irs.gov/newsroom/updates-to-frequently-asked-questions-about-educational-assistance-programs",
      },
    ],
    sourcesChecked: "October 2026",
    sourcesNote:
      "Standard payment and interest totals assume a fixed 6.52% undergraduate Direct Loan rate and level payments over 10 years. IDR payments depend on income, family size, and plan rules (SAVE ended March 2026; IBR, PAYE, ICR, or RAP may apply).",
  },
];
