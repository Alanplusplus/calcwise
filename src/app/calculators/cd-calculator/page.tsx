import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { CdCalculator } from "./CdCalculator";
import { CdArticle } from "./CdArticle";
import { cdVariants } from "@/lib/variants/cd-calculator";

const calc = getCalculator("cd-calculator")!;

const faqs = [
  {
    question: "Are CD earnings taxable?",
    answer: "Yes. CD interest is taxed as ordinary income in the year it is credited to your account, even if you cannot withdraw it without penalty until maturity. Your bank will send a Form 1099-INT if you earn more than $10 in interest.",
  },
  {
    question: "What happens when my CD matures?",
    answer: "Most banks offer a grace period of 7 to 10 days after maturity during which you can withdraw funds without penalty. If you take no action, the CD typically auto-renews at the current rate for the same term — which may be higher or lower than your original rate.",
  },
  {
    question: "Can I lose money on a CD?",
    answer: "You cannot lose your principal on a standard FDIC-insured CD held to maturity. Early withdrawal penalties are the main risk: if you cash out before the term ends, the penalty could exceed your accrued interest and reduce your original deposit.",
  },
];

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  keywords: [
    "cd calculator",
    "cd interest calculator",
    "certificate of deposit calculator",
    "cd rate calculator",
    "cd apy calculator",
    "cd earnings calculator",
  ],
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function CdCalculatorPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<CdArticle />} variants={cdVariants}>
        <CdCalculator />
      </CalculatorShell>
    </>
  );
}
