import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DebtToIncomeCalculator } from "./DebtToIncomeCalculator";
import { DebtToIncomeArticle } from "./DebtToIncomeArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("debt-to-income")!;

const faqs = [
  {
    question: "Is 43% still the Qualified Mortgage DTI limit?",
    answer:
      "No. Since mandatory compliance in 2021, the General QM definition uses a price-based APR test versus APOR, not a fixed 43% DTI cap. Lenders must still consider DTI or residual income, and FHA manual underwriting still uses 43%/50% back-end benchmarks.",
  },
  {
    question: "What is a good debt-to-income ratio?",
    answer:
      "Back-end DTI of 36% or lower matches common conventional targets. Below 20% is excellent. FHA manual underwriting uses 31%/43% front/back standard ratios and may allow up to 50% back-end with compensating factors.",
  },
  {
    question: "Do credit card minimums count in DTI?",
    answer:
      "Yes. Lenders use the minimum payment shown on your credit report, not the amount you choose to pay. Paying $200 when the minimum is $35 still counts as $35 in the DTI calculation.",
  },
];

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function DebtToIncomePage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<DebtToIncomeArticle />}>
        <DebtToIncomeCalculator />
      </CalculatorShell>
    </>
  );
}
