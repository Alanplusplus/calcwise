import type { CalculatorVariant } from "./types";

// Balance-size variants ($2K/$5K/$10K/$15K) removed — content consolidated into
// /guides/how-to-pay-off-credit-card-fast#payoff-by-balance

export const creditCardPayoffVariants: CalculatorVariant[] = [
  {
    slug: "minimum-payment",
    lastUpdated: "2026-09-03",
    title: "Credit Card Minimum Payment Calculator",
    description:
      "See the true cost of making only minimum payments on your credit card. Discover how decades of interest add up and how much you save by paying a fixed amount each month.",
    defaults: { balance: "8000", interestRate: "20.9", fixedPayment: "160" },
    intro:
      "Minimum payments are designed to keep your account in good standing while maximizing the total interest the card issuer collects over time. Most cards calculate the minimum as 1-3% of the outstanding balance or a flat floor of $25, whichever is greater. Early in repayment, the vast majority of each minimum payment covers interest — with only a few dollars reducing principal. This structure creates a repayment timeline that can stretch decades, turning a manageable balance into a five-figure lifetime cost.",
    tips: [
      "On an $8,000 balance at 20.9% APR, the initial minimum payment (2%) is $160. Of that, roughly $139 goes to interest and only $21 reduces your principal — a 13% principal reduction rate.",
      "Paying only the minimum on this $8,000 balance takes approximately 30 years to clear and costs over $13,500 in total interest, meaning you pay $21,500 total for an $8,000 purchase.",
      "Switching to a fixed $250/month payment eliminates the same balance in 41 months with $2,190 in interest — saving $11,310 compared to minimum payments.",
      "Even adding just $40/month above the minimum ($200 total) cuts the payoff from 30 years to approximately 57 months and saves roughly $8,200 in interest. Each extra dollar accelerates principal reduction exponentially.",
      "The minimum payment percentage itself matters: a 2% minimum on $8,000 starts at $160 and declines. A 3% minimum starts at $240 but pays off in about 12 years instead of 30 — still expensive, but dramatically faster than the 2% floor most cards use.",
    ],
    keyResults: [
      { label: "Initial minimum payment (2%)", value: "$160/month" },
      { label: "Interest portion of first payment", value: "$139 (87%)" },
      { label: "Principal portion of first payment", value: "$21 (13%)" },
      { label: "Years to payoff at minimum only", value: "~30 years" },
      { label: "Total interest at minimum payments", value: "~$13,500" },
    ],
    comparisonNote:
      "Switching from minimum payments to a fixed $250/month on this $8,000 balance cuts payoff from roughly 30 years to 41 months and reduces total interest from $13,500 to $2,190 — a savings of $11,310. The fixed payment also eliminates the declining-payment trap, where each month your minimum drops slightly and extends the repayment timeline even further.",
    faq: [
      {
        q: "How do credit card issuers calculate minimum payments?",
        a: "Most issuers use one of two methods: a flat percentage of the outstanding balance (typically 1-3%, with a $25-$35 floor) or 1% of the balance plus all accrued interest and fees. On an $8,000 balance at 20.9% APR, a 2% minimum starts at $160, while the 1%-plus-interest method yields about $219. Check your cardholder agreement to see which formula your issuer applies.",
      },
      {
        q: "Why does my credit card balance barely decrease with minimum payments?",
        a: "At 20.9% APR, your $8,000 balance generates roughly $139 in monthly interest. When your minimum payment is $160, only $21 goes toward principal — just 13% of the payment. As the balance slowly drops, the minimum payment declines too, which means even less principal gets paid each month. This compounding effect is why minimum-only repayment can stretch across decades.",
      },
      {
        q: "How can I break the minimum payment cycle?",
        a: "Set a fixed payment amount — even $50 above the minimum — and automate it so it never drops as your balance declines. On this $8,000 balance, paying $250/month instead of the minimum saves over $11,000 in interest and clears the debt in under four years. If you cannot increase payments, a 0% balance transfer with a firm payoff deadline can provide temporary relief, but only if you stop adding new charges.",
      },
    ],
  },
];
