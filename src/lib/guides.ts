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
];
