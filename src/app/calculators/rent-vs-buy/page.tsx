import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RentVsBuyCalculator } from "./RentVsBuyCalculator";
import { RentVsBuyArticle } from "./RentVsBuyArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("rent-vs-buy")!;

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
    question: "Is renting really throwing money away?",
    answer: "No. Rent buys housing and flexibility — it is exchanged for shelter. The real question is whether total renting costs (minus investment gains) exceed total buying costs (minus equity) over your time horizon.",
  },
  {
    question: "What down payment should I assume?",
    answer: "20% is standard for avoiding PMI. If you put down less, add PMI costs (typically 0.5–1% of the loan amount annually) to your buying scenario.",
  },
  {
    question: "Should I include tax benefits in my calculation?",
    answer: "If you itemize and mortgage interest plus property taxes exceed the standard deduction, ownership tax savings can reduce effective cost by $2,000–$5,000/year. With the $14,600 standard deduction, many homeowners don't itemize.",
  },
  {
    question: "How does home appreciation affect the decision?",
    answer: "Higher appreciation favors buying, but it is the least predictable variable. Use historical local averages rather than recent peaks — nationally, homes have appreciated 3–4% annually over long periods.",
  },
];

export default function RentVsBuyPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<RentVsBuyArticle />}>
        <RentVsBuyCalculator />
      </CalculatorShell>
    </>
  );
}
