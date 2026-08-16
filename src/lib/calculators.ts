export interface Calculator {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: "loans",
    name: "Loans & Mortgages",
    description: "Calculate payments, interest, and amortization for all types of loans.",
  },
  {
    slug: "savings",
    name: "Savings & Investment",
    description: "Plan your savings goals, investment growth, and retirement funds.",
  },
  {
    slug: "debt",
    name: "Debt Management",
    description: "Strategize your debt payoff and understand the true cost of borrowing.",
  },
  {
    slug: "planning",
    name: "Financial Planning",
    description: "Budget, plan for emergencies, and make informed financial decisions.",
  },
];

export const calculators: Calculator[] = [
  {
    slug: "mortgage",
    title: "Mortgage Payment Calculator",
    shortTitle: "Mortgage",
    description: "Calculate your monthly mortgage payment, total interest, and view a full amortization schedule for your home loan.",
    category: "loans",
  },
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    shortTitle: "Compound Interest",
    description: "See how your money grows over time with compound interest. Compare different compounding frequencies and contribution schedules.",
    category: "savings",
  },
  {
    slug: "savings-goal",
    title: "Savings Goal Calculator",
    shortTitle: "Savings Goal",
    description: "Figure out how much you need to save each month to reach your financial goal by your target date.",
    category: "savings",
  },
  {
    slug: "investment-return",
    title: "Investment Return Calculator",
    shortTitle: "Investment Return",
    description: "Calculate the total return and annualized performance of your investments including dividends and contributions.",
    category: "savings",
  },
  {
    slug: "debt-payoff",
    title: "Debt Payoff Calculator",
    shortTitle: "Debt Payoff",
    description: "Create a debt payoff plan using avalanche or snowball methods. See exactly when you'll be debt-free.",
    category: "debt",
  },
  {
    slug: "retirement",
    title: "Retirement Savings Calculator",
    shortTitle: "Retirement",
    description: "Estimate how much you need to save for retirement and whether you're on track to meet your goals.",
    category: "planning",
  },
  {
    slug: "loan-comparison",
    title: "Loan Comparison Calculator",
    shortTitle: "Loan Comparison",
    description: "Compare two or more loan offers side by side to find the best deal based on total cost and monthly payments.",
    category: "loans",
  },
  {
    slug: "emergency-fund",
    title: "Emergency Fund Calculator",
    shortTitle: "Emergency Fund",
    description: "Determine how much you should have in your emergency fund based on your monthly expenses and risk factors.",
    category: "planning",
  },
];

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter((c) => c.category === categorySlug);
}

export function getCalculator(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}
