import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { StudentLoanCalculator } from "./StudentLoanCalculator";
import { StudentLoanArticle } from "./StudentLoanArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("student-loan")!;

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
    question: "Should I pay off student loans or invest?",
    answer: "Compare your loan rate to expected investment returns. At 5–7% loans vs. 8–10% portfolio returns, investing while making minimum payments may build more wealth. Above 7%, prioritize payoff.",
  },
  {
    question: "What happens if I miss a student loan payment?",
    answer: "Federal loans enter delinquency after one missed payment and default after 270 days — consequences include damaged credit, wage garnishment, and loss of deferment/forgiveness eligibility. Contact your servicer immediately.",
  },
  {
    question: "Can I deduct student loan interest on my taxes?",
    answer: "You may deduct up to $2,500/year if MAGI is below the phase-out threshold. The deduction is above-the-line — no itemizing required — saving roughly $550–$925 depending on your bracket.",
  },
  {
    question: "Is Public Service Loan Forgiveness worth pursuing?",
    answer: "PSLF forgives remaining Direct Loan balances after 120 qualifying payments in public service. It can save tens of thousands for high-balance, lower-income public sector workers. Enroll in IDR and certify employment annually.",
  },
  {
    question: "Does paying extra on student loans hurt my credit score?",
    answer: "No. Paying extra reduces your balance and improves your debt-to-income ratio. Closing loan accounts may cause a small temporary dip, but the long-term benefit of lower debt outweighs this.",
  },
];

export default function StudentLoanPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<StudentLoanArticle />}>
        <StudentLoanCalculator />
      </CalculatorShell>
    </>
  );
}
