import { REPORT } from "./mortgage-affordability-by-state";
import { REPORT as RENT_VS_BUY } from "./rent-vs-buy-by-state";
import { REPORT as COST_BURDEN, US_RESULT as COST_BURDEN_US } from "./housing-cost-burden-by-state";
import { REPORT as INSURANCE, STATE_RESULTS as INSURANCE_STATES, US_RESULT as INSURANCE_US } from "./homeowners-insurance-by-state";
import { REPORT as CARS, STATE_RESULTS as CAR_STATES, US_RESULT as CARS_US } from "./car-ownership-by-state";
import { REPORT as RETIREMENT, US_RESULT as RETIREMENT_US } from "./retirement-income-by-state";
import { REPORT as MORTGAGE_FREE, US_RESULT as MORTGAGE_FREE_US } from "./mortgage-free-homeowners-by-state";
import { REPORT as SIX_FIGURE, US_RESULT as SIX_FIGURE_US, STATE_RESULTS as SIX_FIGURE_STATES } from "./six-figure-households-by-state";
import { REPORT as SELF_EMPLOYED, US_RESULT as SELF_EMPLOYED_US, STATE_RESULTS as SELF_EMPLOYED_STATES } from "./self-employment-by-state";

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
    slug: SELF_EMPLOYED.slug,
    path: SELF_EMPLOYED.path,
    title: "Self-Employment by State: Who Works for Themselves and What They Earn",
    description: `Share of workers who are self-employed (${SELF_EMPLOYED_US.seWorkerShare.pct.toFixed(1)}% nationally) in all 50 states and DC, from ${SELF_EMPLOYED_STATES[SELF_EMPLOYED_STATES.length - 1].seWorkerShare.pct.toFixed(1)}% to ${SELF_EMPLOYED_STATES[0].seWorkerShare.pct.toFixed(1)}%, how many are incorporated, mean self-employment income, and the self-employment tax on it.`,
    datePublished: SELF_EMPLOYED.datePublished,
    dateModified: SELF_EMPLOYED.dateModified,
    dataSource: `Census ACS ${SELF_EMPLOYED.acsYear} 1-year (B24080, B19053, B19063, B19052, B19062), IRS and SSA self-employment tax rules`,
  },
  {
    slug: SIX_FIGURE.slug,
    path: SIX_FIGURE.path,
    title: "Six-Figure Households by State: Who Earns $100,000 or More",
    description: `Share of households with income of $100,000 or more (${SIX_FIGURE_US.h100Share.pct.toFixed(1)}% nationally) in all 50 states and DC, from ${SIX_FIGURE_STATES[SIX_FIGURE_STATES.length - 1].h100Share.pct.toFixed(1)}% to ${SIX_FIGURE_STATES[0].h100Share.pct.toFixed(1)}%, the percentile of $100K, top-20% cutoffs, and what housing takes of it.`,
    datePublished: SIX_FIGURE.datePublished,
    dateModified: SIX_FIGURE.dateModified,
    dataSource: `Census ACS ${SIX_FIGURE.acsYear} 1-year (B19001, B19080, B19083, B20017), SSA Wage Statistics`,
  },
  {
    slug: MORTGAGE_FREE.slug,
    path: MORTGAGE_FREE.path,
    title: "Mortgage-Free Homeowners by State: Who Owns Free and Clear",
    description: `Share of homeowners with no mortgage (${MORTGAGE_FREE_US.noMortShare.pct.toFixed(1)}% nationally) in all 50 states and DC, how many owners 65 and over still owe (${MORTGAGE_FREE_US.mort65Share.pct.toFixed(1)}%), second mortgage use, and monthly owner costs.`,
    datePublished: MORTGAGE_FREE.datePublished,
    dateModified: MORTGAGE_FREE.dateModified,
    dataSource: `Census ACS ${MORTGAGE_FREE.acsYear} 1-year (B25081, B25027, B25088, B25077)`,
  },
  {
    slug: RETIREMENT.slug,
    path: RETIREMENT.path,
    title: "Social Security and Retirement Income by State: Who Receives It and How Much",
    description: `Share of households with Social Security (${RETIREMENT_US.ssShare.pct.toFixed(1)}% nationally) and retirement income (${RETIREMENT_US.retShare.pct.toFixed(1)}%), the average amounts, and the median income of householders 65 and over, for all 50 states and DC.`,
    datePublished: RETIREMENT.datePublished,
    dateModified: RETIREMENT.dateModified,
    dataSource: `Census ACS ${RETIREMENT.acsYear} 1-year (B19055, B19059, B19065, B19069, B19049), SSA Monthly Statistical Snapshot`,
  },
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
