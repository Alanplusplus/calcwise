import type { CalculatorVariant } from "./types";

// $75K/$100K/$150K income variants removed — content consolidated into /guides/how-much-house-can-i-afford

export const homeAffordabilityVariants: CalculatorVariant[] = [
  {
    slug: "50000-income",
    title: "How Much House Can I Afford on $50,000 Salary",
    description:
      "Find out how much house you can afford earning $50,000 a year. See your maximum home price, monthly payment, and debt-to-income ratios at current mortgage rates.",
    defaults: { annualIncome: "50000", monthlyDebts: "300", downPayment: "15000", interestRate: "6.5" },
    intro:
      "Earning $50,000 per year puts you in the largest income bracket of American homebuyers, and the housing market still has options in this range — especially outside major metro areas. With a monthly gross income of $4,167, the 28% front-end rule limits your housing payment to about $1,167. After accounting for $300 in existing monthly debts, the 36% back-end rule further constrains your total obligations to $1,500. A $15,000 down payment is achievable through two to three years of disciplined saving, and several first-time buyer programs can supplement your savings with down payment assistance grants.",
    tips: [
      "At $50,000 income with $300 in monthly debts, you can typically afford a home in the $180,000-$210,000 range depending on property taxes and insurance costs in your area.",
      "FHA loans allow as little as 3.5% down ($6,300 on a $180,000 home), which could get you into a home sooner, but you will pay mortgage insurance premiums of roughly $100-$140 per month.",
      "Consider areas where property tax rates are below 1.0% — the difference between a 0.8% and 1.5% property tax rate can add $100+ per month to your housing costs on a $200,000 home.",
      "At this income level, your monthly mortgage payment including taxes and insurance will likely be $1,100-$1,200 — make sure your emergency fund covers at least three months of this amount before buying.",
      "State and local first-time homebuyer programs often provide $5,000-$15,000 in down payment assistance for buyers earning under $60,000. Check your state housing finance agency before assuming you need to save the full down payment.",
    ],
    keyResults: [
      { label: "Maximum home price", value: "$180,000–$210,000" },
      { label: "Maximum monthly housing payment", value: "~$1,167 (28% rule)" },
      { label: "FHA option (3.5% down)", value: "$6,300 on a $180,000 home" },
      { label: "Down payment assistance available", value: "$5,000–$15,000 in many states" },
    ],
    comparisonNote:
      "At $50,000 income, your buying power is roughly $100,000 below the $75,000 tier, which supports homes in the $280,000–$330,000 range. The gap reflects tighter debt-to-income limits and the challenge of saving a meaningful down payment on a lower salary. FHA loans and state down payment assistance programs can partially close this gap, but you will likely need to target lower-cost markets or smaller homes.",
    faq: [
      {
        q: "Can I buy a home on a $50,000 salary?",
        a: "Yes, especially outside high-cost metros where homes in the $180,000–$210,000 range are available. With $300 in monthly debts, the 36% back-end rule limits total obligations to $1,500, leaving about $1,167 for housing under the 28% front-end guideline. A $15,000 down payment plus state assistance programs can make entry feasible within two to three years of disciplined saving.",
      },
      {
        q: "Should I use an FHA loan or save for a conventional down payment?",
        a: "FHA loans require just 3.5% down ($6,300 on a $180,000 home) and accept lower credit scores, but you will pay mortgage insurance premiums of $100–$140 per month for the life of the loan. A conventional loan with 5% down avoids some FHA restrictions but still requires PMI until you reach 20% equity. If you qualify for down payment assistance, FHA often gets you into a home faster with less cash upfront.",
      },
      {
        q: "What down payment assistance programs are available for low-income buyers?",
        a: "Most states offer grants or forgivable loans of $5,000–$15,000 through their housing finance agencies for buyers earning under $60,000. Programs like FHA's $100 Down, USDA zero-down loans in eligible rural areas, and local city grants can further reduce your upfront cost. Apply early — many programs have limited funding and income caps that vary by county.",
      },
    ],
  },
  {
    slug: "200000-income",
    title: "How Much House Can I Afford on $200,000 Salary",
    description:
      "See how much home you can buy on a $200,000 annual salary. Includes jumbo loan considerations, investment trade-offs, and premium market strategies.",
    defaults: { annualIncome: "200000", monthlyDebts: "800", downPayment: "120000", interestRate: "6.5" },
    intro:
      "A $200,000 annual salary places you in the top 10% of U.S. earners, providing significant flexibility in the housing market. With a monthly gross income of $16,667, the 28% rule allows up to $4,667 for housing costs, and even with $800 in existing monthly debts, the 36% back-end threshold supports $5,200 in total obligations. Your $120,000 down payment is substantial, but in high-cost markets (coastal California, Manhattan, parts of the Pacific Northwest), it may still represent less than 20% of target home prices. At this income level, the question is less about what you can afford and more about optimizing the financial structure of your purchase — balancing home equity against market investments, evaluating jumbo loan products, and determining how much of your wealth to concentrate in real estate.",
    tips: [
      "With $200,000 income and $800 in monthly debts, your maximum affordable home price falls between $730,000 and $840,000 depending on local property taxes and insurance costs. This provides access to premium homes in virtually every market outside ultra-high-cost coastal cities.",
      "Your $120,000 down payment represents about 16% on a $750,000 home. In most counties, a $630,000 loan is within conforming limits ($766,550), keeping you in the more favorable conventional loan category with competitive rates and terms.",
      "At a $750,000 purchase price, your estimated total monthly cost is $4,200-$4,800 including principal, interest, taxes, insurance, and PMI. This leaves $8,000-$9,000 of your after-tax monthly income for savings, investments, and living expenses.",
      "Consider whether putting 20% down ($150,000) to eliminate PMI is better than investing the additional $30,000. At $200,000 income, your investment returns likely exceed PMI costs. Run the numbers: PMI on a $630,000 loan costs roughly $200-$350/month, while $30,000 invested at 8% generates $2,400/year in growth.",
      "In high-cost markets where $200,000 income still feels stretched, explore physician loans, attorney loans, or other professional mortgage programs that offer favorable terms for high-earning borrowers with limited savings or recent graduation from professional programs.",
    ],
    keyResults: [
      { label: "Maximum home price", value: "$730,000–$840,000" },
      { label: "Conforming loan limit (2026)", value: "$766,550 in most counties" },
      { label: "Jumbo threshold on $750K home", value: "Not required (loan ~$630,000)" },
      { label: "20% down vs. investing trade-off", value: "PMI ~$250/mo vs. $30K at 8% = $2,400/yr" },
    ],
    comparisonNote:
      "Compared to the $150,000 income tier ($540,000–$620,000 range), a $200,000 salary adds roughly $190,000–$220,000 in buying power. The key difference at this level is not whether you qualify, but how to structure the purchase — a $750,000 home with 16% down stays within conforming limits, while pushing above $850,000 triggers jumbo loan requirements with stricter underwriting and potentially higher rates.",
    faq: [
      {
        q: "When does my mortgage become a jumbo loan?",
        a: "In 2026, the conforming loan limit is $766,550 in most U.S. counties, though high-cost areas like San Francisco and New York City have limits up to $1,149,825. On a $750,000 home with $120,000 down, your $630,000 loan stays conforming. If you target an $850,000 home with the same down payment, the $730,000 loan enters jumbo territory, typically requiring 10–20% down, a credit score above 700, and rates 0.25–0.50% higher.",
      },
      {
        q: "What is the optimal down payment at a $200,000 income?",
        a: "Putting 20% down ($150,000 on a $750,000 home) eliminates PMI of roughly $250–$350 per month, but tying up an extra $30,000 in home equity has an opportunity cost. At 8% annual investment returns, that $30,000 generates about $2,400 per year in growth — potentially exceeding PMI costs. Many high earners put 10–15% down and invest the difference, especially when conforming loan rates remain competitive.",
      },
      {
        q: "Should I max out my home budget or invest the difference?",
        a: "Financial planners often recommend spending no more than 25% of gross income on housing ($4,167/month at $200,000), even though you may qualify for up to $4,667 under the 28% rule. The $500 monthly difference, invested at 8% over 20 years, grows to over $290,000. Concentrating too much wealth in a single property reduces liquidity and diversification, particularly when your income already supports strong retirement contributions.",
      },
    ],
  },
];
