import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { AmortizationCalculator } from "./AmortizationCalculator";
import { AmortizationArticle } from "./AmortizationArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("amortization")!;

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
    question: "What is the difference between an amortization schedule and a loan statement?",
    answer: "An amortization schedule is a projected table showing every payment for the full life of the loan, assuming on-time payments with no extras. A loan statement shows actual payments made, including missed payments, late fees, extra payments, or escrow adjustments.",
  },
  {
    question: "Does an amortization schedule work for adjustable-rate mortgages?",
    answer: "A standard schedule assumes a fixed rate. For ARMs, it is accurate only through the initial fixed-rate period (typically 5, 7, or 10 years). After the rate adjusts, the monthly payment and principal/interest split change.",
  },
  {
    question: "Why do I pay more interest than principal in the first years?",
    answer: "Interest is calculated on the outstanding balance each month. At the start of a $250,000 loan at 7.40%, you owe about $1,542/month in interest on the full balance, leaving only $189 of a $1,731 payment for principal.",
  },
  {
    question: "Can I use an amortization schedule for student loans or car loans?",
    answer: "Yes. The formula works identically for any fixed-rate, fixed-term installment loan — mortgages, auto loans, personal loans, and student loans.",
  },
  {
    question: "How do biweekly payments affect the amortization schedule?",
    answer:
      "Biweekly payments split your monthly payment in half and pay every two weeks. You make 26 half-payments (13 full payments) per year instead of 12, with the extra going entirely to principal — saving about $100,000 in interest and shortening payoff to about 23 years 3 months on a $250,000 loan at 7.40%.",
  },
];

export default function AmortizationPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<AmortizationArticle />}>
        <AmortizationCalculator />
      </CalculatorShell>
    </>
  );
}
