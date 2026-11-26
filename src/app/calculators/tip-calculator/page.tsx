import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { TipCalculator } from "./TipCalculator";
import { TipArticle } from "./TipArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { tipCalculatorVariants } from "@/lib/variants/tip-calculator";

const calc = getCalculator("tip-calculator")!;

export const metadata: Metadata = {
  title: calc.seoTitle ?? calc.title,
  description: calc.description,
  openGraph: { title: `${calc.seoTitle ?? calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

const faqs = [
  {
    question: "How much should you tip at a restaurant?",
    answer:
      "Standard restaurant tipping in the United States is 18% to 20% of the pre-tax bill for good service, with Toast card data averaging 19.1% at full-service restaurants in Q2 2026. Fifteen percent is acceptable for adequate service, while 25% signals exceptional care. On an $85 dinner, that range is $12.75 at 15%, $15.30 at 18%, $17.00 at 20%, and $21.25 at 25%.",
  },
  {
    question: "Do you tip on pre-tax or post-tax amount?",
    answer:
      "Most etiquette experts and servers expect tips calculated on the pre-tax subtotal. Tipping on the post-tax total inflates your gratuity by the tax percentage. On a $100 bill with 8% tax, post-tax tipping at 20% costs $2.16 more than pre-tax tipping. Check your receipt for the subtotal line before calculating.",
  },
  {
    question: "How do you calculate tip when splitting a bill?",
    answer:
      "First add the tip to the full bill amount, then divide the total by the number of people. For an $85 bill with 20% tip ($17.00), the total is $102.00. Split between two people, each pays $51.00. Split four ways, each pays $25.50.",
  },
  {
    question: "Is it rude not to tip in the US?",
    answer:
      "In sit-down restaurants and other tipped service industries, yes. Failing to tip is widely considered rude because servers depend on gratuities for the majority of their income. At counter-service coffee shops or fast-casual restaurants where tipping is optional, skipping a tip is not considered offensive, though small tips of $1 to $2 are appreciated. A mandatory service charge on a large group bill already covers gratuity, so an additional tip is optional rather than expected.",
  },
];

export default function TipPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<TipArticle />} variants={tipCalculatorVariants}>
        <TipCalculator />
      </CalculatorShell>
    </>
  );
}
