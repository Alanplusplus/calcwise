import type { CalculatorVariant } from "./types";
import { CREDIT_CARD_MINIMUM_PAYMENT, G19_CREDIT_CARD_APR } from "../market-data";

// Balance-size variants ($2K/$5K/$10K/$15K) removed — content consolidated into
// /guides/how-to-pay-off-credit-card-fast#payoff-by-balance

export const creditCardPayoffVariants: CalculatorVariant[] = [
  {
    slug: "minimum-payment",
    lastUpdated: "2026-10-22",
    title: "Credit Card Minimum Payment Calculator",
    description:
      "Model interest-plus-1% minimum payments on an $8,000 balance at the 22.36% Fed G.19 APR. Compare 278 months of minimums with a fixed $250 payment.",
    defaults: {
      balance: "8000",
      interestRate: "22.36",
      fixedPayment: "250",
      minPercent: "1",
    },
    intro:
      "Minimum payments keep your account current while stretching repayment for decades. This page uses the same model as the main calculator: the minimum due is the greater of $25 or the month's interest plus 1% of the balance, a formula printed in published issuer agreements (your card may differ, so check your cardmember agreement). At the Federal Reserve G.19 average of 22.36% APR for accounts assessed interest (August 2026), an $8,000 balance shows how little of each minimum reaches principal and why a fixed payment breaks the cycle.",
    tips: [
      "On $8,000 at 22.36% APR, the first minimum is $229: about $149 of interest plus $80 (1% of the balance) toward principal, so roughly 35% of the payment reduces the debt.",
      "Paying only the minimum takes about 278 months (23 years) and about $13,831 in interest on this balance. The minimum shrinks with the balance, and the $25 floor takes over once the balance falls below about $870.",
      "A fixed $250 per month clears the same balance in 50 months with about $4,282 in interest, which is about $9,549 less interest and 228 months (19 years) sooner than paying only the minimum.",
      "If your issuer adds 2% of the balance to interest instead of 1% (set the percentage field to 2), the first minimum is $309 and payoff takes 161 months with about $7,095 in interest, still 111 months longer than the fixed $250 path.",
      "Set autopay to a fixed dollar amount, not to the statement minimum. A fixed $250 is only $21 above the first minimum of $229, but it does not fall as the balance falls, which removes the long tail of small payments.",
    ],
    keyResults: [
      { label: "Initial minimum (interest + 1% of $8,000)", value: "$229/month" },
      { label: "Interest portion of first payment", value: "$149 (65%)" },
      { label: "Principal portion of first payment", value: "$80 (35%)" },
      { label: "Minimum-only payoff", value: "278 months (about 23 years)" },
      { label: "Interest paid on minimums only", value: "~$13,831" },
      { label: "Fixed $250 payoff", value: "50 months, ~$4,282 interest" },
    ],
    comparisonNote:
      "Moving from minimum-only payments to a fixed $250 per month on this $8,000 balance cuts the payoff from 278 months to 50 months and reduces interest from about $13,831 to $4,282, a saving of about $9,549. The fixed payment is only $21 above the first minimum, but it does not decline as the balance falls, and that is what removes the decades-long tail.",
    faq: [
      {
        q: "How do credit card issuers calculate minimum payments?",
        a: "A common formula, printed in cardmember agreements on file with the CFPB, is the larger of $25 or 1% of the new balance plus the period's interest and any late fees. Other issuers use different percentages or floors. This variant uses the greater of $25 or interest plus 1%, which starts at $229 on $8,000 at 22.36% APR. Check your cardmember agreement for your issuer's exact rule.",
      },
      {
        q: "Why does my credit card balance barely decrease with minimum payments?",
        a: "At 22.36% APR, $8,000 generates about $149 in monthly interest, so only $80 of a $229 minimum reduces principal. Because the minimum is recalculated on a shrinking balance, the payment falls too, and the last years are paid mostly at the $25 floor. That is how a balance can take about 23 years to clear on minimums alone.",
      },
      {
        q: "How can I break the minimum payment cycle?",
        a: "Pick a fixed payment at or above your current minimum and automate it: $250 per month on this $8,000 example pays off in 50 months at 22.36%. Autopay set to the minimum keeps the declining payment; autopay set to a fixed dollar amount does not. If you cannot raise payments, a 0% balance transfer only helps if you stop new charges and pay off before the promo rate ends.",
      },
    ],
    sources: [...G19_CREDIT_CARD_APR.sources, ...CREDIT_CARD_MINIMUM_PAYMENT.sources],
    sourcesChecked: "October 2026",
    sourcesNote:
      "APR is the G.19 “accounts assessed interest” series (22.36%), not the 21.19% average across all accounts. Minimum payments follow the greater of $25 or interest plus 1% of the balance; your issuer's formula may differ.",
  },
];
