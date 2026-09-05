import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { IncomeTaxCalculator } from "./IncomeTaxCalculator";
import { IncomeTaxArticle } from "./IncomeTaxArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("income-tax")!;

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
    question: "What is the difference between effective and marginal tax rate?",
    answer: "Your effective rate is total tax divided by gross income — your overall tax burden as a percentage. Your marginal rate is the bracket your last dollar of income falls into. Marginal rate matters for decisions about earning extra income or making additional pre-tax contributions.",
  },
  {
    question: "Does a raise push all my income into a higher bracket?",
    answer: "No. Only income above the bracket threshold is taxed at the higher rate. A raise from $90,000 to $95,000 does not retroactively tax your first $90,000 at a new rate.",
  },
  {
    question: "Are these estimates accurate for my actual tax return?",
    answer: "This calculator provides federal income tax estimates only. It does not account for tax credits, alternative minimum tax, self-employment tax, capital gains, or state and local taxes. Use it for planning purposes and consult a tax professional for filing.",
  },
  {
    question: "Should I contribute to a Roth or traditional 401(k)?",
    answer: "If you expect to be in a higher tax bracket in retirement, Roth contributions (taxed now, tax-free later) may be better. If you are in a high bracket now, traditional deferrals reduce today's tax bill.",
  },
];

export default function IncomeTaxPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<IncomeTaxArticle />}>
        <IncomeTaxCalculator />
      </CalculatorShell>
    </>
  );
}
