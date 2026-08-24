export interface Guide {
  slug: string;
  title: string;
  description: string;
  published: boolean;
}

export const guides: Guide[] = [
  {
    slug: "how-much-house-can-i-afford",
    title: "How Much House Can I Afford? Complete Guide by Income Level",
    description: "Learn exactly how much home you can afford based on your salary, debts, and down payment. Includes income-based tables, a real case study, and the formulas lenders actually use.",
    published: true,
  },
  {
    slug: "pay-off-mortgage-early-vs-invest",
    title: "Pay Off Mortgage Early vs Invest: The Math Behind the Decision",
    description: "Should you pay off your mortgage early or invest the extra money? We run the real numbers at today's rates so you can see exactly which option builds more wealth.",
    published: true,
  },
  {
    slug: "save-50000-in-3-years",
    title: "How to Save $50,000 in 3 Years: A Realistic Plan",
    description: "A step-by-step plan to save $50,000 in 3 years on an average salary. Includes monthly targets, budget breakdowns, a real case study, and strategies that actually work.",
    published: true,
  },
];
