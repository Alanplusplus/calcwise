import type { CalculatorVariant } from "./types";

// Credit card and $30K student loan variants removed — content consolidated into respective guides

export const debtPayoffVariants: CalculatorVariant[] = [
  {
    slug: "50000-student-loan",
    title: "Pay Off $50,000 Student Loan",
    description:
      "Build a payoff plan for $50,000 in student loans. See how payment increases and refinancing affect your total cost and freedom date.",
    defaults: { balance: "50000", interestRate: "6.0", monthlyPayment: "550" },
    intro:
      "A $50,000 student loan balance is common among graduates with advanced degrees or those who attended private universities. At this level, the standard 10-year repayment plan requires over $555 per month, which can strain budgets for early-career professionals. Strategic decisions about repayment plan selection, refinancing timing, and whether to pursue Public Service Loan Forgiveness (PSLF) can mean differences of $10,000 or more in total cost.",
    tips: [
      "The standard 10-year plan at 6.0% on $50,000 requires $555/month with $16,613 in total interest. Paying $550/month (just below standard) extends payoff to 125 months with $18,611 in interest.",
      "Increasing payments to $800/month cuts the timeline to 76 months (6.3 years) and reduces total interest to $10,636 -- saving nearly $8,000 versus the standard plan.",
      "If your employer offers student loan repayment assistance ($100-$200/month is common), that benefit is worth $12,000-$24,000 over 10 years when you include the interest savings from faster payoff.",
      "PSLF eligibility: if you work for a qualifying employer and make 120 payments on an income-driven plan, the remaining balance is forgiven tax-free -- at $50,000 this could save $15,000-$30,000 depending on income growth.",
      "Refinancing from 6.0% to 4.5% on a 10-year term drops the monthly payment to $518 and saves $4,440 in total interest, but only makes sense if you do not need federal repayment flexibility or forgiveness options.",
    ],
    keyResults: [
      { label: "Standard 10-year payment", value: "$555/month" },
      { label: "Total interest (standard plan)", value: "$16,613" },
      { label: "PSLF potential savings", value: "$15,000–$30,000" },
      { label: "Refinance savings at 4.5%", value: "$4,429 in total interest" },
      { label: "IDR estimated payment (SAVE plan)", value: "~$280/month at $55K income" },
    ],
    comparisonNote:
      "Standard repayment costs $16,613 in interest over 10 years, while PSLF through an income-driven plan could forgive the remaining balance after 120 qualifying payments — saving $15,000–$30,000 depending on income growth. Refinancing to 4.5% saves a more modest $4,429 but eliminates federal protections. Standard repayment wins for high earners in private-sector jobs; PSLF wins for qualifying public-sector workers; refinancing suits stable-income borrowers who will never need IDR or forgiveness.",
    faq: [
      {
        q: "Am I eligible for Public Service Loan Forgiveness on $50,000?",
        a: "PSLF requires full-time employment at a qualifying government or nonprofit organization, enrollment in an income-driven repayment plan, and 120 qualifying monthly payments. On a $50,000 balance, forgiveness after 10 years of public service could eliminate $15,000–$30,000 in remaining principal and interest, depending on your income trajectory. Only Direct Loans qualify — FFEL or Perkins loans must be consolidated into a Direct Consolidation Loan first.",
      },
      {
        q: "What are the trade-offs of refinancing federal student loans?",
        a: "Refinancing from 6.0% to 4.5% saves $4,429 in total interest and drops your payment from $555 to $518, but you permanently lose access to income-driven repayment, PSLF, deferment, and forbearance. This trade-off makes sense if you have stable high income, strong credit (typically 680+), and work in the private sector with no intention of pursuing forgiveness. Keep at least one federal loan unrefinanced if you want a safety net.",
      },
      {
        q: "Does employer student loan repayment assistance help with $50,000 in debt?",
        a: "Employer programs typically contribute $100–$200 per month toward loan payments, and this benefit is now tax-free up to $5,250 per year under current federal law. On a $50,000 balance, $150/month in employer assistance applied to your standard $555 payment effectively reduces your out-of-pocket cost to $405 and saves approximately $3,000–$5,000 in interest by accelerating payoff. Ask your HR department about availability — roughly 8% of employers now offer this benefit.",
      },
    ],
  },
];
