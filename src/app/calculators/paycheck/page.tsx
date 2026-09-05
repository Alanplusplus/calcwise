import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { PaycheckCalculator } from "./PaycheckCalculator";
import { PaycheckArticle } from "./PaycheckArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("paycheck")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

const faqs = [
  {
    question: "Why is my take-home pay so much lower than my salary?",
    answer: "Federal income tax, Social Security (6.2%), Medicare (1.45%), state taxes, and pre-tax deductions like 401(k) and health insurance all reduce gross pay. For a $75,000 salary, total deductions consume roughly 30–35%.",
  },
  {
    question: "Does my 401(k) contribution actually cost me the full amount?",
    answer: "No. Pre-tax 401(k) contributions reduce taxable income. In the 22% federal + 5% state bracket, every $100 contributed only reduces take-home by about $73 — you get $100 invested for $73 of reduced spending.",
  },
  {
    question: "How do I calculate my paycheck if I am paid hourly?",
    answer: "Multiply hourly rate by hours worked for gross pay, then apply withholding: federal/state income tax on annualized income, Social Security at 6.2%, Medicare at 1.45%. Overtime is paid at 1.5x and taxed at your marginal rate.",
  },
  {
    question: "What happens to my paycheck when I get a raise?",
    answer: "Only the portion pushing you into a new bracket is taxed at the higher rate. A $5,000 raise doesn't move your entire salary into a higher bracket — your effective tax rate rises gradually.",
  },
  {
    question: "Should I adjust my withholding if I have a side income?",
    answer: "Yes. Employer withholding covers only W-2 salary. You'll owe additional taxes on 1099 income at filing time. Increase W-4 withholding or make quarterly estimated payments (Form 1040-ES).",
  },
];

export default function PaycheckPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<PaycheckArticle />}>
        <PaycheckCalculator />
      </CalculatorShell>
    </>
  );
}
