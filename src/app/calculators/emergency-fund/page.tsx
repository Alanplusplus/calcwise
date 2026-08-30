import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { EmergencyFundCalculator } from "./EmergencyFundCalculator";
import { EmergencyFundArticle } from "./EmergencyFundArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("emergency-fund")!;

const faqs = [
  {
    question: "How much should I have in my emergency fund?",
    answer: "Most financial experts recommend 3-6 months of essential living expenses. If you have variable income, are self-employed, or have dependents, aim for 6-8 months. Use this calculator to find your exact number based on your monthly expenses and risk factors.",
  },
  {
    question: "How do I calculate my emergency fund?",
    answer: "Add up your essential monthly expenses (housing, food, utilities, insurance, transportation, minimum debt payments). Multiply by the number of months you want to cover (typically 3-8). That total is your emergency fund target. Our calculator factors in income stability and dependents to recommend the right number of months for you.",
  },
  {
    question: "Where should I keep my emergency fund?",
    answer: "Keep your emergency fund in a high-yield savings account (HYSA) where it earns interest while remaining fully accessible. Avoid investing it in stocks or locking it in CDs — emergency funds need to be liquid for unexpected expenses like job loss, medical bills, or urgent home repairs.",
  },
];

export const metadata: Metadata = {
  title: "Emergency Fund Calculator — How Much Do You Really Need?",
  description:
    "Calculate your ideal emergency fund size based on monthly expenses, income stability, and risk factors. Most experts recommend 3-8 months of expenses. Find your number in seconds.",
  keywords: [
    "emergency fund calculator",
    "how to calculate emergency fund",
    "how much emergency fund do I need",
    "8 month emergency fund calculator",
    "emergency savings calculator",
  ],
  openGraph: {
    title: `Emergency Fund Calculator — How Much Do You Really Need? | ${site.name}`,
    description:
      "Calculate your ideal emergency fund size based on monthly expenses, income stability, and risk factors.",
    type: "website",
  },
};

export default function EmergencyFundPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<EmergencyFundArticle />}>
        <EmergencyFundCalculator />
      </CalculatorShell>
    </>
  );
}
