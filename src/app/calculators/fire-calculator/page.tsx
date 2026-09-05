import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FireCalculator } from "./FireCalculator";
import { FireArticle } from "./FireArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("fire-calculator")!;

export const metadata: Metadata = {
  title: "FIRE Calculator — Financial Independence, Retire Early",
  description: "Calculate your FIRE number and see how soon you can reach financial independence. Based on your savings rate, expenses, and investment returns. Free and instant.",
  keywords: [
    "FIRE calculator",
    "financial independence retire early",
    "FIRE number calculator",
    "early retirement calculator",
    "financial independence calculator",
    "retirement savings rate calculator",
  ],
  openGraph: {
    title: `FIRE Calculator — Financial Independence, Retire Early | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

const faqs = [
  {
    question: "What savings rate do I need for FIRE?",
    answer: "A 50% savings rate leads to FIRE in 15–17 years; 65% achieves it in 10–12 years. The average American saves 5–7%, which is why traditional retirement at 65 remains the norm.",
  },
  {
    question: "Is 7% a realistic return assumption?",
    answer: "The S&P 500 has returned roughly 10% nominally (about 7% after inflation) over long periods. A diversified stocks-and-bonds portfolio might assume 6–7% nominal returns.",
  },
  {
    question: "Can I FIRE with debt?",
    answer: "Eliminate high-interest debt (credit cards, personal loans) before pursuing FIRE aggressively. Low-interest mortgage debt is debatable — some pay it off for peace of mind, others invest when rates are below expected returns.",
  },
  {
    question: "What about Social Security?",
    answer: "Many FIRE planners ignore Social Security as a conservative buffer. If you reach FIRE at 42, Social Security at 67 becomes a bonus that can reduce your required portfolio by 10–20%.",
  },
];

export default function FireCalculatorPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<FireArticle />}>
        <FireCalculator />
      </CalculatorShell>
    </>
  );
}
