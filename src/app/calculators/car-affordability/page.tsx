import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { CarAffordabilityCalculator } from "./CarAffordabilityCalculator";
import { CarAffordabilityArticle } from "./CarAffordabilityArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("car-affordability")!;

const faqs = [
  {
    question: "What is the 20/4/10 rule for cars?",
    answer:
      "Put 20% down, finance for no more than 48 months, and keep loan payment plus insurance plus fuel under 10% of gross monthly income. At $65,000 salary with $300/month for insurance and fuel, this calculator caps the loan payment near $242 at the 7.54% G.19 bank average over 60 months.",
  },
  {
    question: "Should I use gross or net income for the 10% rule?",
    answer:
      "Use gross income before taxes. The rule builds in a buffer for payroll taxes, health insurance, and retirement contributions that often consume 25–35% of paychecks.",
  },
  {
    question: "What auto loan rate should I assume when budgeting?",
    answer:
      "Prime new-car shoppers often see APRs between Experian's Q2 2026 average (6.35%) and the Federal Reserve G.19 commercial-bank 60-month average (7.54% for August 2026). Edmunds reported 7.0% on financed new purchases in Q3 2026; used finance averaged 10.6%.",
  },
  {
    question: "How does credit score change affordability?",
    answer:
      "Experian Q2 2026 data show super-prime new APRs near 4.41% versus deep-subprime above 16%. A few points on your rate changes how much car the same monthly payment supports — check your credit before applying.",
  },
];

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function CarAffordabilityPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<CarAffordabilityArticle />}>
      <CarAffordabilityCalculator />
      </CalculatorShell>
    </>
  );
}
