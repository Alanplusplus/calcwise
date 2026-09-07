import type { CalculatorVariant } from "./mortgage";

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
  },
  {
    slug: "75000-income",
    title: "How Much House Can I Afford on $75,000 Salary",
    description:
      "Calculate your home buying budget on a $75,000 annual salary. See the maximum mortgage amount, estimated monthly costs, and how debt levels affect your affordability.",
    defaults: { annualIncome: "75000", monthlyDebts: "400", downPayment: "30000", interestRate: "6.5" },
    intro:
      "A $75,000 salary — close to the U.S. median household income — opens up a significantly wider range of housing options than the $50,000 tier. Your monthly gross of $6,250 supports a housing payment of up to $1,750 under the 28% rule, and total debt obligations of $2,250 under the 36% rule. With $30,000 saved for a down payment, you are well-positioned for a conventional loan with as little as 5% down, which avoids the higher mortgage insurance costs of FHA loans. Many suburban and mid-sized metro markets have quality homes in your price range.",
    tips: [
      "With $75,000 income and $400 in monthly debts, your maximum home price typically falls in the $280,000-$330,000 range — enough for a three-bedroom home in most suburban markets.",
      "Your $30,000 down payment represents roughly 10% on a $300,000 home. Putting down less than 20% triggers private mortgage insurance (PMI) of approximately $80-$150 per month, but reaching 20% ($60,000) may not be worth the additional years of saving.",
      "At 6.5% interest on a $270,000 loan (after $30,000 down on a $300,000 home), your principal and interest payment is approximately $1,706 per month — add $250-$350 for taxes and insurance.",
      "If you can reduce your monthly debts from $400 to $200 by paying off a car loan or credit card, your maximum home price could increase by $25,000-$35,000 under the 36% back-end rule.",
      "Consider a 15-year mortgage if you can afford the higher payment — at $75,000 income, you could potentially handle the payment on a $220,000 loan at 5.75%, saving over $100,000 in total interest compared to a 30-year term.",
    ],
  },
  {
    slug: "100000-income",
    title: "How Much House Can I Afford on $100,000 Salary",
    description:
      "Determine your maximum home price on a $100,000 salary. Includes monthly payment estimates, DTI analysis, and affordability tips for six-figure earners.",
    defaults: { annualIncome: "100000", monthlyDebts: "500", downPayment: "50000", interestRate: "6.5" },
    intro:
      "A six-figure income of $100,000 provides substantial home buying power, with a monthly gross of $8,333 supporting housing payments up to $2,333 under the 28% front-end ratio. Even with $500 per month in existing debts (a typical car payment plus minimum credit card payments), the 36% back-end rule still allows $2,500 for total obligations. Your $50,000 down payment positions you for either a strong conventional loan on a mid-range home or a comfortable entry into higher-priced markets. At this income level, the key decision shifts from 'can I afford a home' to 'how much home should I buy while maintaining financial flexibility.'",
    tips: [
      "On $100,000 income with $500 in monthly debts, your maximum home price generally falls between $380,000 and $440,000. In many markets, this buys a well-maintained four-bedroom home or a newer three-bedroom in a desirable school district.",
      "Your $50,000 down payment is roughly 13% on a $380,000 home. You will pay PMI until you reach 20% equity, but the cost is relatively low at about $100-$180 per month. Alternatively, explore lender-paid PMI options that roll the cost into a slightly higher interest rate.",
      "At this income level, resist the temptation to max out your budget. Financial planners recommend spending no more than 25% of gross income on housing ($2,083/month) to leave room for retirement savings, investments, and lifestyle flexibility.",
      "A $350,000 mortgage at 6.5% over 30 years costs $2,212 per month in principal and interest alone. The total interest paid over the life of the loan is approximately $446,000 — consider whether a 20-year or 15-year term fits your cash flow.",
      "If you are in a high-cost metro (San Francisco, New York, Boston), $100,000 income may require a longer savings timeline or exploring condos and townhomes rather than single-family homes. Consider areas within commuting distance where prices drop 20-30%.",
    ],
  },
  {
    slug: "150000-income",
    title: "How Much House Can I Afford on $150,000 Salary",
    description:
      "Calculate home affordability on $150,000 annual income. See your buying power with current rates, down payment scenarios, and strategies for high-earner homebuyers.",
    defaults: { annualIncome: "150000", monthlyDebts: "600", downPayment: "80000", interestRate: "6.5" },
    intro:
      "At $150,000 per year, you are in the top 20% of U.S. household incomes, and your home buying power reflects that position. Your monthly gross income of $12,500 supports a maximum housing payment of $3,500 under the 28% rule, and total debt payments of $4,500 under the 36% rule. With $80,000 saved for a down payment, you can comfortably target homes in the $500,000-$600,000 range in most markets. At this level, you may also encounter jumbo loan territory in some areas (conventional limits vary by county), which may require slightly different qualification criteria and interest rates.",
    tips: [
      "With $150,000 income and $600 in monthly debts, your maximum affordable home price typically ranges from $540,000 to $620,000. In most U.S. metros outside the top-5 most expensive cities, this provides excellent options including newer construction and premium neighborhoods.",
      "Your $80,000 down payment represents about 15% on a $550,000 home. To avoid PMI entirely, you would need $110,000 (20%). Weigh the cost of PMI ($150-$250/month) against the opportunity cost of keeping that extra $30,000 invested — at 8% annual returns, $30,000 grows to over $64,000 in 10 years.",
      "In 2026, the conforming loan limit is $766,550 in most counties. If your loan exceeds this, you will need a jumbo mortgage, which typically requires 10-20% down, a credit score above 700, and may carry rates 0.25-0.50% higher than conforming loans.",
      "At $150,000 income, you are likely in the 24% federal tax bracket. The mortgage interest deduction becomes valuable — on a $470,000 mortgage at 6.5%, you pay approximately $30,000 in interest the first year, potentially saving $7,200 in federal taxes if you itemize.",
      "Do not overlook the total cost of homeownership at this price point. A $550,000 home typically costs $8,000-$15,000 annually in maintenance, repairs, and capital improvements beyond your mortgage, taxes, and insurance.",
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
  },
];
