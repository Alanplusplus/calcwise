export interface Calculator {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  relatedCalculators?: string[];
  relatedGuides?: string[];
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
    relatedCalculators: ["loan-comparison", "home-affordability", "auto-loan"],
    relatedGuides: ["how-much-house-can-i-afford", "15-year-vs-30-year-mortgage", "pay-off-mortgage-early-vs-invest"],
  },
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    shortTitle: "Compound Interest",
    description: "See how your money grows over time with compound interest. Compare different compounding frequencies and contribution schedules.",
    category: "savings",
    relatedCalculators: ["savings-goal", "investment-return", "retirement"],
    relatedGuides: ["compound-interest-real-examples", "save-50000-in-3-years"],
  },
  {
    slug: "savings-goal",
    title: "Savings Goal Calculator",
    shortTitle: "Savings Goal",
    description: "Figure out how much you need to save each month to reach your financial goal by your target date.",
    category: "savings",
    relatedCalculators: ["compound-interest", "emergency-fund", "retirement"],
    relatedGuides: ["save-50000-in-3-years", "high-yield-savings-vs-cd"],
  },
  {
    slug: "investment-return",
    title: "Investment Return Calculator",
    shortTitle: "Investment Return",
    description: "Calculate the total return and annualized performance of your investments including dividends and contributions.",
    category: "savings",
    relatedCalculators: ["compound-interest", "roi", "retirement"],
    relatedGuides: ["how-to-start-investing-1000", "compound-interest-real-examples"],
  },
  {
    slug: "debt-payoff",
    title: "Debt Payoff Calculator",
    shortTitle: "Debt Payoff",
    description: "Create a debt payoff plan using avalanche or snowball methods. See exactly when you'll be debt-free.",
    category: "debt",
    relatedCalculators: ["credit-card-payoff", "loan-comparison", "savings-goal"],
    relatedGuides: ["debt-avalanche-vs-snowball", "how-to-pay-off-credit-card-fast"],
  },
  {
    slug: "credit-card-payoff",
    title: "Credit Card Payoff Calculator",
    shortTitle: "Credit Card Payoff",
    description: "Calculate how long it takes to pay off credit card debt and how much interest you'll pay with minimum vs. fixed payments.",
    category: "debt",
    relatedCalculators: ["debt-payoff", "budget-50-30-20", "savings-goal"],
    relatedGuides: ["how-to-pay-off-credit-card-fast", "debt-avalanche-vs-snowball"],
  },
  {
    slug: "retirement",
    title: "Retirement Savings Calculator",
    shortTitle: "Retirement",
    description: "Estimate how much you need to save for retirement and whether you're on track to meet your goals.",
    category: "planning",
    relatedCalculators: ["compound-interest", "fire-calculator", "savings-goal"],
    relatedGuides: ["how-much-to-retire-at-55", "401k-vs-roth-ira"],
  },
  {
    slug: "loan-comparison",
    title: "Loan Comparison Calculator",
    shortTitle: "Loan Comparison",
    description: "Compare two or more loan offers side by side to find the best deal based on total cost and monthly payments.",
    category: "loans",
    relatedCalculators: ["mortgage", "auto-loan", "home-affordability"],
    relatedGuides: ["15-year-vs-30-year-mortgage"],
  },
  {
    slug: "emergency-fund",
    title: "Emergency Fund Calculator",
    shortTitle: "Emergency Fund",
    description: "Determine how much you should have in your emergency fund based on your monthly expenses and risk factors.",
    category: "planning",
    relatedCalculators: ["savings-goal", "budget-50-30-20", "cd-calculator"],
    relatedGuides: ["emergency-fund-where-to-keep", "50-30-20-budget-rule"],
  },
  {
    slug: "auto-loan",
    title: "Auto Loan Calculator",
    shortTitle: "Auto Loan",
    description: "Calculate your monthly car payment, total interest cost, and view the full amortization schedule for your auto loan.",
    category: "loans",
    relatedCalculators: ["loan-comparison", "mortgage", "debt-payoff"],
    relatedGuides: [],
  },
  {
    slug: "basic",
    title: "Basic Calculator",
    shortTitle: "Basic",
    description: "A simple everyday calculator for quick math — addition, subtraction, multiplication, division, percentages, and more.",
    category: "planning",
    relatedCalculators: ["compound-interest", "savings-goal", "investment-return"],
    relatedGuides: [],
  },
  {
    slug: "home-affordability",
    title: "Home Affordability Calculator",
    shortTitle: "Home Affordability",
    description: "Find out how much house you can afford based on your income, debts, down payment, and interest rate using the 28/36 rule.",
    category: "loans",
    relatedCalculators: ["mortgage", "rent-vs-buy", "down-payment"],
    relatedGuides: ["how-much-house-can-i-afford", "rent-vs-buy-decision"],
  },
  {
    slug: "cd-calculator",
    title: "CD Interest Calculator",
    shortTitle: "CD Interest",
    description: "Calculate how much interest you'll earn on a Certificate of Deposit based on deposit amount, term, APY, and compounding frequency.",
    category: "savings",
    relatedCalculators: ["compound-interest", "savings-goal", "investment-return"],
    relatedGuides: ["high-yield-savings-vs-cd", "emergency-fund-where-to-keep"],
  },
  {
    slug: "budget-50-30-20",
    title: "50/30/20 Budget Calculator",
    shortTitle: "50/30/20 Budget",
    description: "Apply the 50/30/20 budget rule to your income. See exactly how much to allocate to needs, wants, and savings each month.",
    category: "planning",
    relatedCalculators: ["savings-goal", "emergency-fund", "debt-payoff"],
    relatedGuides: ["50-30-20-budget-rule", "save-50000-in-3-years"],
  },
  {
    slug: "rent-vs-buy",
    title: "Rent vs Buy Calculator",
    shortTitle: "Rent vs Buy",
    description: "Compare the true cost of renting vs buying a home over time. See your break-even point and which option builds more wealth.",
    category: "planning",
    relatedCalculators: ["mortgage", "home-affordability", "investment-return"],
    relatedGuides: ["rent-vs-buy-decision", "how-much-house-can-i-afford"],
  },
  {
    slug: "fire-calculator",
    title: "FIRE Calculator",
    shortTitle: "FIRE",
    description: "Calculate your Financial Independence, Retire Early (FIRE) number. See how soon you can reach financial freedom based on savings rate and expenses.",
    category: "planning",
    relatedCalculators: ["retirement", "compound-interest", "investment-return"],
    relatedGuides: ["how-much-to-retire-at-55", "compound-interest-real-examples"],
  },
  {
    slug: "income-tax",
    title: "Income Tax Calculator",
    shortTitle: "Income Tax",
    description: "Estimate your federal income tax for 2026 based on filing status, income, deductions, and credits. See your effective and marginal tax rates.",
    category: "planning",
    relatedCalculators: ["paycheck", "fire-calculator", "budget-50-30-20"],
    relatedGuides: ["401k-vs-roth-ira"],
  },
  {
    slug: "net-worth",
    title: "Net Worth Calculator",
    shortTitle: "Net Worth",
    description: "Calculate your net worth by adding up all assets and subtracting liabilities. Track your financial health over time.",
    category: "planning",
    relatedCalculators: ["retirement", "savings-goal", "home-affordability"],
    relatedGuides: ["net-worth-by-age", "how-to-start-investing-1000"],
  },
  {
    slug: "paycheck",
    title: "Paycheck Calculator",
    shortTitle: "Paycheck",
    description: "Estimate your take-home pay after federal and state taxes, Social Security, Medicare, and retirement contributions from each paycheck.",
    category: "planning",
    relatedCalculators: ["income-tax", "budget-50-30-20", "savings-goal"],
    relatedGuides: ["50-30-20-budget-rule", "401k-vs-roth-ira"],
  },
];

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter((c) => c.category === categorySlug);
}

export function getCalculator(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}
