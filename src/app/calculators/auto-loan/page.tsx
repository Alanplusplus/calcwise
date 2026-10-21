import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { AutoLoanCalculator } from "./AutoLoanCalculator";
import { AutoLoanArticle } from "./AutoLoanArticle";
import { autoLoanVariants } from "@/lib/variants/auto-loan";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("auto-loan")!;

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
    question: "What is a good auto loan APR in 2026?",
    answer:
      "For new cars, prime borrowers often land between Experian's Q2 2026 market average (6.35%) and the Federal Reserve G.19 commercial-bank 60-month average (7.54% for August 2026). Edmunds reported a 7.0% average APR on financed new purchases in Q3 2026; used-car finance averaged 10.6% in the same Edmunds release.",
  },
  {
    question: "How much car can I afford?",
    answer:
      "Many planners cap total vehicle costs (payment, insurance, fuel) at 10% of gross monthly income. On $65,000 per year with $150/month for insurance and $150 for fuel, about $242 remains for the loan payment — roughly a $17,000 car with $5,000 down at 7.54% over 60 months using this site's affordability calculator.",
  },
  {
    question: "Should I lease or buy?",
    answer:
      "Leasing lowers the monthly payment but builds no equity. With Kelley Blue Book's September 2026 industry average transaction price at $50,562 and Edmunds' Q3 average new payment at $787, compare both paths if you trade every 3–4 years or drive more than 12,000 miles annually.",
  },
  {
    question: "Can I pay off my auto loan early?",
    answer:
      "Most auto loans allow extra principal without penalty — verify your contract. On the default $32,450 loan at 7.54% over 60 months ($651/month), even $50 per month in additional principal reduces interest and shortens the term.",
  },
  {
    question: "What is GAP insurance and do I need it?",
    answer:
      "GAP insurance pays the difference between your loan balance and the insurer's total-loss payout. It is most useful with less than 20% down or loan terms beyond 60 months, when Edmunds and industry depreciation data show a wider gap between loan balance and market value.",
  },
];

export default function AutoLoanPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<AutoLoanArticle />} variants={autoLoanVariants}>
        <AutoLoanCalculator />
      </CalculatorShell>
    </>
  );
}
