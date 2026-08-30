import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { LoanComparisonCalculator } from "./LoanComparisonCalculator";
import { LoanComparisonArticle } from "./LoanComparisonArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("loan-comparison")!;

const faqs = [
  {
    question: "How many lenders should I compare when shopping for a loan?",
    answer: "Get quotes from at least 3-5 lenders. Studies show borrowers who compare 5+ offers save an average of $3,000-$5,000 over the life of a mortgage. Include different lender types: banks, credit unions, and online lenders.",
  },
  {
    question: "Does getting multiple loan quotes hurt my credit score?",
    answer: "No, if done within a short window. Credit bureaus treat multiple mortgage or auto loan inquiries within 14-45 days as a single inquiry. Rate-shop within 2 weeks to be safe.",
  },
  {
    question: "Should I always choose the loan with the lowest total cost?",
    answer: "Not necessarily. If the lower-cost option requires monthly payments that leave you with no financial cushion, the slightly more expensive option with lower payments may be wiser. Financial flexibility has real value — consider your emergency fund and other obligations.",
  },
  {
    question: "What is the difference between interest rate and APR?",
    answer: "The interest rate is the base cost of borrowing. The APR (Annual Percentage Rate) includes the interest rate plus fees like origination fees, closing costs, and points spread over the loan term. Always compare APR to APR for an accurate cost comparison.",
  },
];

export const metadata: Metadata = {
  title: "Compare Loans Side by Side — Free Loan Comparison Calculator",
  description:
    "Compare multiple loan offers side by side. See monthly payments, total interest, and true cost differences instantly. Works for mortgages, auto loans, personal loans, and student loans.",
  keywords: [
    "loan comparison calculator",
    "compare loans side by side",
    "loan rate comparison",
    "compare loan rates",
    "compare interest rates",
    "loan comparison tool",
    "compare loan offers",
    "interest rate comparison calculator",
  ],
  openGraph: {
    title: `Compare Loans Side by Side — Free Loan Comparison Calculator | ${site.name}`,
    description:
      "Compare multiple loan offers side by side. See monthly payments, total interest, and true cost differences instantly.",
    type: "website",
  },
};

export default function LoanComparisonPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<LoanComparisonArticle />}>
        <LoanComparisonCalculator />
      </CalculatorShell>
    </>
  );
}
