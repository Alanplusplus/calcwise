import type { CalculatorVariant } from "./types";
import { mortgageVariants } from "./mortgage";
import { savingsGoalVariants } from "./savings-goal";
import { retirementVariants } from "./retirement";
import { debtPayoffVariants } from "./debt-payoff";
import { compoundInterestVariants } from "./compound-interest";
import { inflationVariants } from "./inflation";
import { roiVariants } from "./roi";
import { autoLoanVariants } from "./auto-loan";
import { studentLoanVariants } from "./student-loan";
import { creditCardPayoffVariants } from "./credit-card-payoff";
import { cdVariants } from "./cd-calculator";
import { homeAffordabilityVariants } from "./home-affordability";
import { dividendVariants } from "./dividend";
import { tipCalculatorVariants } from "./tip-calculator";
import { hourlyToSalaryVariants } from "./hourly-to-salary";
import { salaryToHourlyVariants } from "./salary-to-hourly";
import { emergencyFundVariants } from "./emergency-fund";

/** Every calculator that has scenario pages at /calculators/[slug]/[variant]. Add new variant lists here. */
export const variantRegistry: Array<{ calculator: string; variants: CalculatorVariant[] }> = [
  { calculator: "mortgage", variants: mortgageVariants },
  { calculator: "savings-goal", variants: savingsGoalVariants },
  { calculator: "retirement", variants: retirementVariants },
  { calculator: "debt-payoff", variants: debtPayoffVariants },
  { calculator: "compound-interest", variants: compoundInterestVariants },
  { calculator: "inflation", variants: inflationVariants },
  { calculator: "roi", variants: roiVariants },
  { calculator: "auto-loan", variants: autoLoanVariants },
  { calculator: "student-loan", variants: studentLoanVariants },
  { calculator: "credit-card-payoff", variants: creditCardPayoffVariants },
  { calculator: "cd-calculator", variants: cdVariants },
  { calculator: "home-affordability", variants: homeAffordabilityVariants },
  { calculator: "dividend", variants: dividendVariants },
  { calculator: "tip-calculator", variants: tipCalculatorVariants },
  { calculator: "hourly-to-salary", variants: hourlyToSalaryVariants },
  { calculator: "salary-to-hourly", variants: salaryToHourlyVariants },
  { calculator: "emergency-fund", variants: emergencyFundVariants },
];
