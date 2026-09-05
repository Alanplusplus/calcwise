import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { HomeAffordabilityCalculator } from "./HomeAffordabilityCalculator";
import { HomeAffordabilityArticle } from "./HomeAffordabilityArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("home-affordability")!;

export const metadata: Metadata = {
  title: "Home Affordability Calculator — How Much House Can I Afford?",
  description: "Find out how much house you can afford based on your income, debts, down payment, and interest rate using the 28/36 rule. Get a realistic budget before you start house hunting.",
  keywords: [
    "home affordability calculator",
    "how much house can I afford",
    "how much is a mortgage on a 300k house",
    "home buying calculator",
    "house budget calculator",
    "28/36 rule calculator",
  ],
  openGraph: { title: `Home Affordability Calculator — How Much House Can I Afford? | ${site.name}`, description: calc.description, type: "website" },
};

const faqs = [
  {
    question: "Does this calculator include PMI?",
    answer: "No. Private mortgage insurance applies when your down payment is less than 20% and typically adds 0.5% to 1.5% of the loan amount annually. If your down payment is under 20%, subtract an estimated PMI cost for a more conservative result.",
  },
  {
    question: "Should I buy at the maximum the calculator shows?",
    answer: "Financial advisors generally recommend staying below the maximum, leaving room for maintenance (budget 1% of home value per year), utilities, and lifestyle expenses. Buying at 80–90% of your calculated maximum provides a buffer.",
  },
  {
    question: "Why do lenders use gross income instead of take-home pay?",
    answer: "Lenders standardize on gross income because tax situations vary widely. However, you should evaluate affordability based on your net income and full budget.",
  },
  {
    question: "How accurate are the property tax and insurance estimates?",
    answer: "Property tax rates vary by county and insurance depends on home age, construction type, and local risk factors. Use your county assessor's effective rate and get an insurance quote for the most accurate results.",
  },
];

export default function HomeAffordabilityPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<HomeAffordabilityArticle />}>
        <HomeAffordabilityCalculator />
      </CalculatorShell>
    </>
  );
}
