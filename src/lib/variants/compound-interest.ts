import type { CalculatorVariant } from "./types";

// Starting-amount variants ($1K/$5K/$10K/$100K) removed — content consolidated into /guides/compound-interest-real-examples

export const compoundInterestVariants: CalculatorVariant[] = [
  {
    slug: "10-percent",
    title: "Compound Interest at 10% Annual Return",
    description:
      "Explore 10% annual growth on $10,000 with $500 monthly over 20 years. Reflects long-term S&P 500 returns for diversified equity investors.",
    defaults: { principal: "10000", monthlyContribution: "500", annualRate: "10", years: "20" },
    intro:
      "A 10% annual return aligns with the historical long-term average of the S&P 500, though actual year-to-year results vary widely with market cycles. This scenario suits investors with a 20-year horizon who can tolerate volatility — typically those holding broad index funds in tax-advantaged accounts. The difference between 7% and 10% may seem modest, but over two decades it transforms a comfortable nest egg into generational wealth, making asset selection and staying invested through downturns critical.",
    tips: [
      "At 10% annual return with $10,000 starting capital and $500/month over 20 years, your balance grows to approximately $452,965 — compound interest contributes $322,965 on $130,000 in total contributions.",
      "Compared to the same inputs at 7% ($300,851 final balance), the extra 3 percentage points of return add roughly $152,114 — more than your entire starting principal.",
      "By year five your portfolio reaches about $55,172, growing faster than the 7% scenario's $49,973 despite identical contribution amounts, showing how rate differences amplify early.",
      "The $10,000 principal alone at 10% compounds to approximately $73,281 in 20 years — nearly double the $40,387 it would earn at 7%, before counting any monthly deposits.",
      "Adding $50 more per month at 10% pushes your final total to about $490,934, and sustaining an 11% return would reach roughly $522,169 — underscoring why minimizing fees and maintaining discipline through bear markets pays off.",
    ],
    keyResults: [
      { label: "Final balance after 20 years", value: "$452,965" },
      { label: "Total contributions", value: "$130,000" },
      { label: "Compound interest earned", value: "$322,965" },
      { label: "Interest-to-contribution ratio", value: "2.5:1 (248%)" },
      { label: "Same plan at 7% return", value: "$300,851 (33% less)" },
    ],
    comparisonNote:
      "At 10% annual return, your $130,000 in contributions grow to $452,965 — but dropping to a conservative 7% reduces the final balance to $300,851, a $152,114 difference. An aggressive 12% scenario would reach approximately $603,000 over the same period. The 3-percentage-point spread between 7% and 10% adds more wealth than your entire $10,000 starting principal, illustrating why long-term return assumptions dramatically shape retirement outcomes.",
    faq: [
      {
        q: "Is 10% a realistic long-term return expectation?",
        a: "The S&P 500 has averaged roughly 10% annual returns (including dividends) over the past 30 years, though this includes significant volatility — years with 30%+ gains and others with 20%+ losses. A diversified portfolio of low-cost index funds is the most reliable way to capture market returns, but past performance does not guarantee future results. Planning at 7–8% provides a conservative buffer for fees, taxes, and below-average decades.",
      },
      {
        q: "How much do investment fees reduce a 10% return?",
        a: "A 1% annual expense ratio on a $452,965 portfolio costs roughly $4,500 per year — and because fees compound, a 1% fee effectively reduces your net return from 10% to 9%, lowering your 20-year balance by approximately $60,000–$75,000. Index funds with expense ratios of 0.03–0.10% preserve nearly the full market return. Over two decades, the difference between a 0.05% and 1.00% fee can cost more than a year of contributions.",
      },
      {
        q: "Should I plan for 10% growth or use a lower estimate?",
        a: "Use 10% as an aspirational benchmark tied to broad equity market history, but plan your financial independence timeline at 7% to account for sequence-of-returns risk, inflation, and periods of underperformance. If your plan works at 7%, any years returning 10% or higher accelerate your timeline rather than creating a shortfall. This approach builds in margin for market downturns without requiring you to save excessively.",
      },
    ],
  },
];
