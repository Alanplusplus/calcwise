import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { HomeAffordabilityCalculator } from "./HomeAffordabilityCalculator";
import { HomeAffordabilityArticle } from "./HomeAffordabilityArticle";

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

export default function HomeAffordabilityPage() {
  return (
    <CalculatorShell calculator={calc} article={<HomeAffordabilityArticle />}>
      <HomeAffordabilityCalculator />
    </CalculatorShell>
  );
}
