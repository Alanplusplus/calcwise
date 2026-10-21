import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RefinanceCalculator } from "./RefinanceCalculator";
import { RefinanceArticle } from "./RefinanceArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { MORTGAGE_MARKET } from "@/lib/market-data";

const calc = getCalculator("refinance-calculator")!;

const faqs = [
  {
    question: "Does the default refinance example save money overall?",
    answer: `No. On the pre-filled $350,000 loan at 7.79% with 36 payments made, refinancing to ${MORTGAGE_MARKET.thirtyYear.toFixed(2)}% for another 30 years lowers the payment by about $162 per month and reaches break-even on $6,000 in closing costs in 37 months, but lifetime savings are about negative $38,170 and interest saved is about negative $32,170 because you restart a 360-month schedule.`,
  },
  {
    question: "Should I roll closing costs into the new loan or pay out of pocket?",
    answer: `Paying upfront avoids interest on those fees. Rolling $7,000 into a 30-year loan at ${MORTGAGE_MARKET.thirtyYear.toFixed(2)}% on a $300,000 base adds about $10,448 in extra interest versus paying the $7,000 at closing. Use the calculator's roll-in toggle to compare your numbers.`,
  },
  {
    question: "How many times can you refinance a mortgage?",
    answer:
      "There is no legal limit, but most lenders require 6-12 months between closings. Each refinance adds closing costs, so small rate drops rarely pay off unless you stay past break-even and lifetime savings stay positive.",
  },
  {
    question: "How much should I budget for refinance closing costs?",
    answer:
      "Plan on roughly 2% to 5% of the new loan amount — about $6,000 to $15,000 on a $300,000 refinance. Your Loan Estimate lists the exact Estimated Closing Costs and Cash to Close; rolling costs into the loan avoids upfront cash but adds interest over the full term.",
  },
  {
    question: "When is the best time to refinance?",
    answer: `When rates are well below your current note (often 0.75-1.0% on a 30-year fixed), your credit and LTV are strong, and you will stay past break-even with positive lifetime savings. With the 30-year PMMS near ${MORTGAGE_MARKET.thirtyYear.toFixed(2)}%, a 7.79% borrower only saves about $162 per month on the default scenario and still loses on lifetime cost unless they shorten the term or get a larger rate cut.`,
  },
];

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function RefinancePage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<RefinanceArticle />}>
        <RefinanceCalculator />
      </CalculatorShell>
    </>
  );
}
