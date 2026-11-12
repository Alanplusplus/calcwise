import { REPORT } from "./mortgage-affordability-by-state";
import { REPORT as RENT_VS_BUY } from "./rent-vs-buy-by-state";
import { REPORT as COST_BURDEN, US_RESULT as COST_BURDEN_US } from "./housing-cost-burden-by-state";
import { REPORT as INSURANCE, STATE_RESULTS as INSURANCE_STATES, US_RESULT as INSURANCE_US } from "./homeowners-insurance-by-state";
import { REPORT as CARS, STATE_RESULTS as CAR_STATES, US_RESULT as CARS_US } from "./car-ownership-by-state";

export interface ReportListing {
  slug: string;
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  dataSource: string;
}

export const reports: ReportListing[] = [
  {
    slug: CARS.slug,
    path: CARS.path,
    title: "Car Ownership by State: Vehicles per Household and What They Cost",
    description: `Vehicles per household in all 50 states and DC, from ${CAR_STATES[CAR_STATES.length - 1].perHh.value.toFixed(2)} to ${CAR_STATES[0].perHh.value.toFixed(2)} (${CARS_US.perHh.value.toFixed(2)} nationally), the share of households with no vehicle, and what insurance and fuel take of income.`,
    datePublished: CARS.datePublished,
    dateModified: CARS.dateModified,
    dataSource: `Census ACS ${CARS.acsYear} 1-year (B25044, B25046), AAA Your Driving Costs 2026`,
  },
  {
    slug: INSURANCE.slug,
    path: INSURANCE.path,
    title: "Homeowners Insurance Cost by State: What Owners Actually Pay",
    description: `Typical annual premium for owners with a mortgage in all 50 states and DC, from $${INSURANCE_STATES[INSURANCE_STATES.length - 1].mortMedian.toLocaleString("en-US")} to $${INSURANCE_STATES[0].mortMedian.toLocaleString("en-US")} (about $${INSURANCE_US.mortMedian.toLocaleString("en-US")} nationally), and how much insurance adds to the monthly payment.`,
    datePublished: INSURANCE.datePublished,
    dateModified: INSURANCE.dateModified,
    dataSource: `Census ACS ${INSURANCE.acsYear} 1-year (B25141), Freddie Mac PMMS`,
  },
  {
    slug: COST_BURDEN.slug,
    path: COST_BURDEN.path,
    title: "Housing Cost Burden by State: Households Paying 30% or More of Income",
    description: `How many renters and owners spend 30% or more, and 50% or more, of income on housing, for all 50 states and DC. Nationally ${COST_BURDEN_US.allShare30.pct.toFixed(1)}% of households and ${COST_BURDEN_US.renterShare30.pct.toFixed(1)}% of renters.`,
    datePublished: COST_BURDEN.datePublished,
    dateModified: COST_BURDEN.dateModified,
    dataSource: `Census ACS ${COST_BURDEN.acsYear} 1-year (B25070, B25091), HUD definitions`,
  },
  {
    slug: RENT_VS_BUY.slug,
    path: RENT_VS_BUY.path,
    title: "Rent vs. Buy by State: Median Rent vs. the Payment on the Median Home",
    description: `What owning the median home costs a month at ${RENT_VS_BUY.mortgageRate.toFixed(2)}% against the median rent, with break-even mortgage rates and income shares, for all 50 states and DC.`,
    datePublished: RENT_VS_BUY.datePublished,
    dateModified: RENT_VS_BUY.dateModified,
    dataSource: `Census ACS ${RENT_VS_BUY.acsYear} 1-year, Freddie Mac PMMS`,
  },
  {
    slug: REPORT.slug,
    path: REPORT.path,
    title: "Mortgage Affordability by State: Median Home vs. Median Income",
    description: `What the monthly payment on each state's median home costs at ${REPORT.mortgageRate.toFixed(2)}%, as a share of median household income, for all 50 states and DC.`,
    datePublished: REPORT.datePublished,
    dateModified: REPORT.dateModified,
    dataSource: `Census ACS ${REPORT.acsYear} 1-year, Freddie Mac PMMS`,
  },
];
