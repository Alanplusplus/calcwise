import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { AutoLoanCalculator } from "./AutoLoanCalculator";
import { AutoLoanArticle } from "./AutoLoanArticle";
import { autoLoanVariants } from "@/lib/variants/auto-loan";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("auto-loan")!;

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
    question: "How much car can I afford?",
    answer: "Your total car payment (including insurance) should not exceed 10–15% of take-home pay. For $5,000/month take-home, that means $500–750 max. Also budget for fuel, maintenance, and registration.",
  },
  {
    question: "Should I lease or buy?",
    answer: "Leasing offers lower monthly payments and newer cars every few years, but you build no equity and face mileage restrictions. Buying costs more per month but is cheaper long-term if you keep the car 7+ years after payoff.",
  },
  {
    question: "Can I pay off my auto loan early?",
    answer: "Most auto loans allow early payoff without penalty — check your contract. Paying even $50–100 extra toward principal each month can shave months off the loan and save hundreds in interest.",
  },
  {
    question: "What is GAP insurance and do I need it?",
    answer: "GAP insurance covers the difference between what you owe and what insurance pays if your car is totaled or stolen. Consider it if your down payment is under 20% or your loan term exceeds 60 months.",
  },
];

export default function AutoLoanPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<AutoLoanArticle />} variants={autoLoanVariants}>
        <AutoLoanCalculator />
      </CalculatorShell>
    </>
  );
}
