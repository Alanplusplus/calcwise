import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { BudgetCalculator } from "./BudgetCalculator";
import { BudgetArticle } from "./BudgetArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("budget-50-30-20")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

const faqs = [
  {
    question: "Should I use gross or net income for the 50/30/20 rule?",
    answer: "Always use after-tax (net) income — the amount that hits your bank account. Using gross income makes every category appear larger than what you can actually spend, leading to overspending.",
  },
  {
    question: "Where do credit card minimum payments go in the 50/30/20 budget?",
    answer: "Minimum payments count as needs (50%). Any payment above the minimum comes from the savings/debt repayment bucket (20%).",
  },
  {
    question: "Can I adjust the 50/30/20 percentages?",
    answer: "Yes. The 50/30/20 split is a starting point — adjust based on your city, debt level, and goals. The key principle is separating needs from wants and making savings a fixed allocation.",
  },
];

export default function Budget503020Page() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<BudgetArticle />}>
        <BudgetCalculator />
      </CalculatorShell>
    </>
  );
}
