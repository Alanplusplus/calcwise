import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { MortgageCalculator } from "./MortgageCalculator";
import { MortgageArticle } from "./MortgageArticle";
import { mortgageVariants } from "@/lib/variants/mortgage";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { MORTGAGE_MARKET } from "@/lib/market-data";

const calc = getCalculator("mortgage")!;

const rate30 = MORTGAGE_MARKET.thirtyYear.toFixed(2);
const rate15 = MORTGAGE_MARKET.fifteenYear.toFixed(2);

const faqs = [
  {
    question: "How is my monthly mortgage payment calculated?",
    answer: "Your monthly mortgage payment includes principal (paying down the loan balance), interest (the cost of borrowing), property taxes, and homeowners insurance. The principal and interest portion is calculated using the loan amount, interest rate, and loan term. Our calculator breaks down all components so you can see exactly where your money goes.",
  },
  {
    question: "How much is the monthly payment on a $300,000 mortgage?",
    answer: `With 20% down ($60,000) on a $300,000 home, your loan is $240,000. At ${rate30}% interest over 30 years, the monthly principal and interest payment is approximately $1,662. Add property taxes (~$225/mo at 0.9%) and insurance (~$200/mo at $2,400/year) for a total housing payment around $2,087/month.`,
  },
  {
    question: "What is the monthly payment on a $200,000 mortgage?",
    answer: `With 20% down ($40,000) on a $200,000 home, your loan is $160,000. At ${rate30}% interest over 30 years, the monthly principal and interest payment is approximately $1,108. A 15-year term at the current ${rate15}% average raises the payment to about $1,412 but saves over $144,000 in total interest versus a 30-year loan.`,
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 15-year mortgage has higher monthly payments but saves dramatically on total interest — often $100,000-$200,000+. Choose 15 years if the payment fits comfortably within 28% of gross income and you still have room for retirement savings and an emergency fund. Otherwise, take the 30-year and make extra payments when possible.",
  },
];

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  keywords: [
    "mortgage payment calculator",
    "mortgage calculator",
    "monthly mortgage payment",
    "home loan calculator",
    "amortization schedule",
    "mortgage interest calculator",
  ],
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function MortgagePage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<MortgageArticle />} variants={mortgageVariants}>
        <MortgageCalculator />
      </CalculatorShell>
    </>
  );
}
