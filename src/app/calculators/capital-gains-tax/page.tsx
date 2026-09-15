import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { CapitalGainsTaxCalculator } from "./CapitalGainsTaxCalculator";
import { CapitalGainsTaxArticle } from "./CapitalGainsTaxArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("capital-gains-tax")!;

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
    question: "What is the difference between short-term and long-term capital gains?",
    answer: "Short-term capital gains apply to assets held for one year or less and are taxed at your ordinary income tax rate (10% to 37%). Long-term capital gains apply to assets held for more than one year and are taxed at preferential rates of 0%, 15%, or 20% depending on your taxable income.",
  },
  {
    question: "How do I calculate my capital gain?",
    answer: "Capital gain equals the sale price minus your cost basis. Your cost basis is typically the purchase price plus any transaction fees, commissions, or improvements. For stocks, include the brokerage commission in your cost basis. For real estate, add renovation costs to the purchase price.",
  },
  {
    question: "Can capital losses offset capital gains?",
    answer: "Yes. Capital losses directly offset capital gains dollar for dollar. If your losses exceed your gains, you can deduct up to $3,000 per year ($1,500 if married filing separately) against ordinary income. Remaining losses carry forward to future tax years indefinitely.",
  },
  {
    question: "Is there a 0% capital gains tax rate?",
    answer: "Yes. For 2026, single filers with taxable income up to $48,350 and married filing jointly up to $96,700 pay 0% on long-term capital gains. This makes tax-gain harvesting possible: selling appreciated assets tax-free if your income falls within the 0% bracket.",
  },
  {
    question: "Does the Net Investment Income Tax apply to capital gains?",
    answer: "The 3.8% Net Investment Income Tax (NIIT) applies to the lesser of your net investment income or the amount by which your modified adjusted gross income exceeds $200,000 for single filers or $250,000 for married filing jointly. This can effectively raise the top long-term capital gains rate to 23.8%.",
  },
];

export default function CapitalGainsTaxPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<CapitalGainsTaxArticle />}>
        <CapitalGainsTaxCalculator />
      </CalculatorShell>
    </>
  );
}
