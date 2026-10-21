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
    answer:
      "Get quotes from at least 3-5 lenders. Fannie Mae research links comparison shopping to better rate and fee outcomes, and Freddie Mac analysis in high-dispersion rate periods found five quotes could save more than $6,000 in interest over the first several years of a typical loan if you keep the mortgage — actual savings depend on your balance and rate spread. Include banks, credit unions, and online lenders.",
  },
  {
    question: "Does getting multiple loan quotes hurt my credit score?",
    answer:
      "Usually not if you cluster applications. The CFPB treats mortgage inquiries within 45 days as one inquiry for scoring, but many mortgage lenders use older FICO models with a 14-day grouping window — completing quotes within about two weeks is the safer target.",
  },
  {
    question: "How long does it take mortgage discount points to break even?",
    answer:
      "Divide the upfront points cost by your monthly principal-and-interest savings. On a $300,000 loan, $3,000 in points that save $50 per month break even in about 60 months (five years). CFPB guidance notes points help only if you keep the loan past that break-even period — often roughly 4-8 years depending on the buy-down.",
  },
  {
    question: "Should I always choose the loan with the lowest total cost?",
    answer: "Not necessarily. If the lower-cost option requires monthly payments that leave you with no financial cushion, the slightly more expensive option with lower payments may be wiser. Financial flexibility has real value — consider your emergency fund and other obligations.",
  },
  {
    question: "What is the difference between interest rate and APR?",
    answer: "The interest rate is the base cost of borrowing. The APR (Annual Percentage Rate) includes the interest rate plus fees like origination fees, closing costs, and points spread over the loan term. Always compare APR to APR for an accurate cost comparison.",
  },
  {
    question: "On a $250,000 loan, how much does a 15-year mortgage save versus 30 years at today's averages?",
    answer:
      "Using the Freddie Mac PMMS averages of 7.40% on a 30-year and 6.71% on a 15-year, Loan A runs $1,730.95 per month with $373,142 in total interest, while Loan B runs $2,206.73 per month with $147,212 in total interest. Loan B costs $476 more per month but saves $225,930 in interest over the full term.",
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
