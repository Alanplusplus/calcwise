import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DownPaymentCalculator } from "./DownPaymentCalculator";
import { DownPaymentArticle } from "./DownPaymentArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("down-payment")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

const faqs = [
  {
    question: "Is a 20% down payment always the best choice?",
    answer: "Not necessarily. While 20% eliminates PMI and gives the lowest monthly payment, waiting years to save 20% means potentially missing home appreciation and continuing to pay rent. The right down payment balances monthly affordability, PMI cost, and opportunity cost.",
  },
  {
    question: "What is PMI and how do I get rid of it?",
    answer: "Private mortgage insurance protects the lender if you default with less than 20% equity. On conventional loans, request PMI removal at 80% loan-to-value ratio. Lenders must auto-cancel at 78%. FHA loans require mortgage insurance for the life of the loan if you put less than 10% down.",
  },
  {
    question: "Should I use retirement funds for a down payment?",
    answer: "First-time buyers can withdraw up to $10,000 from a traditional IRA penalty-free (taxes still apply) or pull Roth IRA contributions at any time. However, this permanently reduces retirement savings and compound growth. Most planners recommend exhausting other savings first.",
  },
  {
    question: "How much should I budget for closing costs on top of the down payment?",
    answer: "Closing costs typically run 2% to 5% of the purchase price. On a $350,000 home, budget $7,000 to $17,500 for origination fees, appraisal, title insurance, escrow deposits, and prepaid property taxes.",
  },
];

export default function DownPaymentPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<DownPaymentArticle />}>
        <DownPaymentCalculator />
      </CalculatorShell>
    </>
  );
}
