import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { StudentLoanCalculator } from "./StudentLoanCalculator";
import { StudentLoanArticle } from "./StudentLoanArticle";

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

export default function StudentLoanPage() {
  return (
    <CalculatorShell calculator={calc} article={<StudentLoanArticle />}>
      <StudentLoanCalculator />
    </CalculatorShell>
  );
}
