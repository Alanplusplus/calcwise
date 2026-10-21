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
    answer: "Multiply essential monthly expenses (housing, food, utilities, insurance, transport, minimum debt payments) by 3 months for dual-income stable households, 6 months for most families, or 9-12 months if self-employed or in a volatile industry. Default calculator expenses ($3,400/month) yield a $20,400 target at six months with $5,000 saved ($15,400 gap).",
  },
  {
    question: "How do I calculate my emergency fund?",
    answer: "Add up your essential monthly expenses (housing, food, utilities, insurance, transportation, minimum debt payments). Multiply by the number of months you want to cover (typically 3-8). That total is your emergency fund target. Our calculator factors in income stability and dependents to recommend the right number of months for you.",
  },
  {
    question: "Where should I keep my emergency fund?",
    answer: "Keep your emergency fund in an FDIC-insured high-yield savings account near 4.2-4.35% APY (top online offers, October 2026). Avoid stocks and avoid locking more than one month of expenses in CDs — you need same-day or next-day access for job loss, medical bills, or urgent repairs.",
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
