import type { CalculatorVariant } from "./types";

// Balance-size variants ($2K/$5K/$10K/$15K) removed — content consolidated into
// /guides/how-to-pay-off-credit-card-fast#payoff-by-balance

export const creditCardPayoffVariants: CalculatorVariant[] = [
  {
    slug: "minimum-payment",
    lastUpdated: "2026-10-21",
    title: "Credit Card Minimum Payment Calculator",
    description:
      "Model 2% minimum payments on an $8,000 balance at the 22.36% Fed G.19 assessed-interest APR. See 50-year minimum cost vs a fixed $250 payment.",
    defaults: {
      balance: "8000",
      interestRate: "22.36",
      fixedPayment: "250",
      minPercent: "2",
    },
    intro:
      "Minimum payments keep your account current while stretching repayment for years or decades. This page uses the same model as the main calculator: minimum due equals 2% of the outstanding balance or $25, whichever is greater — not the alternate 1%-plus-interest formula some issuers use. At the Federal Reserve G.19 average of 22.36% APR for accounts assessed interest (August 2026), an $8,000 balance illustrates how little of each minimum goes to principal and why a fixed payment breaks the cycle.",
    tips: [
      "On $8,000 at 22.36% APR, the first 2% minimum is $160. Monthly interest is about $149, so only $11 reduces principal — roughly 7% of the payment.",
      "Paying only the 2% minimum on $8,000 at 22.36% still leaves about $3,521 owed after 50 years in this model, with about $61,061 in interest paid over that period.",
      "Switching to a fixed $250/month payment clears the same balance in 50 months with about $4,282 in interest — roughly $56,779 less interest than the 50-year minimum path above.",
      "A fixed $200/month payment pays off in 75 months with about $6,818 in interest — still far faster than minimum-only repayment at this APR.",
      "Many issuers also use 1% of balance plus all finance charges; on $8,000 at 22.36% that starts near $229/month and pays off in about 278 months with roughly $13,831 in interest — better than 2%, but still costly versus a fixed $250.",
    ],
    keyResults: [
      { label: "Initial minimum (2% of $8,000)", value: "$160/month" },
      { label: "Interest portion of first payment", value: "$149 (93%)" },
      { label: "Principal portion of first payment", value: "$11 (7%)" },
      { label: "Minimum-only path (50-year cap)", value: "$3,521 still owed" },
      { label: "Interest over 50 years at minimum", value: "~$61,061" },
    ],
    comparisonNote:
      "Moving from minimum-only payments to a fixed $250/month on this $8,000 balance cuts payoff from never (within the 50-year model cap) to 50 months and reduces interest from about $61,061 over that minimum period to $4,282 on the fixed plan — a savings of about $56,779 before counting the remaining $3,521 balance the minimum path would still carry. Fixed payments eliminate the declining-minimum trap that extends high-APR debt for decades.",
    faq: [
      {
        q: "How do credit card issuers calculate minimum payments?",
        a: "Common formulas include a flat percentage of balance (often 1% to 3% with a $25–$35 floor) or 1% of balance plus accrued interest and fees. This variant uses 2% or $25, whichever is greater. On $8,000 at 22.36% APR, that yields a $160 first minimum; the 1%-plus-interest method would start near $229. Check your cardholder agreement for your issuer’s exact rule.",
      },
      {
        q: "Why does my credit card balance barely decrease with minimum payments?",
        a: "At 22.36% APR, $8,000 generates about $149 in monthly interest. A $160 minimum leaves only $11 for principal. As the balance inches down, the 2% minimum drops too, which slows principal reduction further — one reason high-APR balances can persist for decades on minimums alone.",
      },
      {
        q: "How can I break the minimum payment cycle?",
        a: "Pick a fixed payment above your current minimum — $250/month on this $8,000 example pays off in 50 months at 22.36% — and automate it so the amount never falls as the balance declines. If you cannot raise payments, a 0% balance transfer only helps if you stop new charges and pay off before the promo rate ends.",
      },
    ],
    sources: [
      {
        label: "Federal Reserve G.19 Consumer Credit (Aug. 2026 data, released Oct. 7, 2026)",
        href: "https://www.federalreserve.gov/releases/g19/current/",
      },
    ],
    sourcesChecked: "October 2026",
    sourcesNote:
      "APR is the G.19 “accounts assessed interest” series (22.36%), not the 21.19% average across all accounts. Minimum payments follow 2% of balance or $25, whichever is greater.",
  },
];
