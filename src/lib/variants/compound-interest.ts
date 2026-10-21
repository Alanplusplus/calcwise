import type { CalculatorVariant } from "./types";

export const compoundInterestVariants: CalculatorVariant[] = [
  {
    slug: "10-percent",
    lastUpdated: "2026-10-21",
    title: "Compound Interest at 10% Annual Return",
    description:
      "Model 10% annual growth on $10,000 with $500/month over 20 years. Final balance about $453,000 — a planning rate above 7%, below recent S&P 500 10-year returns.",
    defaults: { principal: "10000", monthlyContribution: "500", annualRate: "10", years: "20" },
    intro:
      "Ten percent annual return is a common shorthand for long-run U.S. large-cap equity performance, though actual year-to-year results swing widely. S&P Dow Jones Indices reported a 13.44% 10-year annualized price return and roughly 15.5% 10-year total return on the S&P 500 as of September 30, 2026 — both above this scenario's 10% assumption. Use 10% as an aspirational stress test; plan withdrawals and retirement timelines at 7% so bear markets do not force you to sell low.",
    tips: [
      "At 10% annual return with $10,000 starting capital and $500/month over 20 years (monthly compounding), the balance reaches about $452,965 — compound interest contributes roughly $322,965 on $130,000 in contributions.",
      "The same inputs at 7% yield about $300,851 — the extra 3 percentage points add roughly $152,114, more than your entire starting principal.",
      "By year five the portfolio reaches about $55,172 at 10% versus $49,973 at 7% with identical contributions, showing how return gaps widen early.",
      "The $10,000 principal alone at 10% compounded monthly for 20 years grows to about $73,281 versus $40,387 at 7% before counting any monthly deposits.",
      "Adding $50 more per month at 10% pushes the 20-year total to about $490,934; a 1% fee drag effectively shaves a full percentage point off net return and can cost tens of thousands over two decades.",
    ],
    keyResults: [
      { label: "Final balance after 20 years", value: "$452,965" },
      { label: "Total contributions", value: "$130,000" },
      { label: "Compound interest earned", value: "$322,965" },
      { label: "Same plan at 7% return", value: "$300,851" },
      { label: "Same plan at 12% return", value: "$603,553 (20 yr)" },
    ],
    comparisonNote:
      "At 10% annual return, $130,000 in contributions grow to $452,965, but dropping to 7% cuts the final balance to $300,851 — a $152,114 gap. Pushing to 12% (well above long-run averages) reaches $603,553. The spread between 7% and 10% exceeds your $10,000 seed investment, which is why retirement models often stress-test at 7% even when historical equity returns were higher.",
    faq: [
      {
        q: "Is 10% a realistic long-term return expectation?",
        a: "The S&P 500's 10-year annualized total return was near 15.5% as of September 30, 2026 (S&P Dow Jones Indices), but single years ranged from large gains to double-digit losses. Diversified index funds capture market returns minus fees. Planning at 7% builds margin for fees, taxes, and below-average decades; treat 10% as upside, not a guarantee.",
      },
      {
        q: "How much do investment fees reduce a 10% return?",
        a: "A 1% annual fee on a portfolio targeting 10% gross return effectively leaves about 9% net. On the $452,965 balance this scenario produces, 1% fees compound to roughly $60,000 to $75,000 in foregone wealth over 20 years compared with a 0.05% index fund — often more than a year of contributions.",
      },
      {
        q: "Should I plan for 10% growth or use a lower estimate?",
        a: "Use 10% to see upside if markets cooperate, but set financial independence timelines using 7% so sequence-of-returns risk does not derail you. If your plan works at 7%, years that deliver 10% or better accelerate the timeline instead of creating a shortfall.",
      },
    ],
    sources: [
      {
        label: "S&P 500 index data (10-yr annualized returns, Sep. 30, 2026)",
        href: "https://www.spglobal.com/spdji/en/indices/equity/sp-500/",
      },
    ],
    sourcesChecked: "October 2026",
    sourcesNote: "Scenario uses 10% for illustration; index history is not a forecast.",
  },
];
