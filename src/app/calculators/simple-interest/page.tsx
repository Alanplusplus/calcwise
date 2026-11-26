import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { SimpleInterestCalculator } from "./SimpleInterestCalculator";
import { SimpleInterestArticle } from "./SimpleInterestArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("simple-interest")!;

export const metadata: Metadata = {
  title: calc.seoTitle ?? calc.title,
  description: calc.description,
  openGraph: { title: `${calc.seoTitle ?? calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

const faqs = [
  {
    question: "Is simple interest better than compound interest?",
    answer:
      "It depends on which side of the transaction you are on. As a borrower, simple interest is better because you pay less over time. As an investor or saver, compound interest is better because your money grows faster. For a $10,000 investment at 5% over 10 years, compound interest earns $1,289 more than simple interest.",
  },
  {
    question: "How do I calculate simple interest for less than one year?",
    answer:
      "Use fractions of a year in the time variable. For 6 months, use T = 0.5. For 90 days, use T = 90/365 = 0.2466. On a $5,000 principal at 4% for 90 days, the interest is $5,000 x 0.04 x 0.2466 = $49.32.",
  },
  {
    question: "Do any savings accounts use simple interest?",
    answer:
      "Almost no savings accounts use simple interest. Banks calculate savings account interest using compound interest, typically compounding daily or monthly. This is advantageous for you as a depositor. However, the advertised APY (annual percentage yield) already accounts for compounding, so you can compare rates directly.",
  },
  {
    question: "Can I use simple interest to estimate mortgage costs?",
    answer:
      "Simple interest gives a very rough estimate for mortgages but significantly undercounts the total interest on a 30-year term. Mortgages use amortization, a form of compound interest where each payment covers both interest and principal. For accurate mortgage calculations, use a dedicated mortgage calculator with amortization schedules.",
  },
  {
    question: "What is the Rule of 72 and does it apply to simple interest?",
    answer:
      "The Rule of 72 is a shortcut for estimating how long it takes to double your money: divide 72 by the annual interest rate. At 6%, your money doubles in about 12 years. However, the Rule of 72 applies to compound interest only. With simple interest at 6%, it takes exactly 100/6 = 16.67 years to double your money, significantly longer.",
  },
];

export default function SimpleInterestPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<SimpleInterestArticle />}>
        <SimpleInterestCalculator />
      </CalculatorShell>
    </>
  );
}
