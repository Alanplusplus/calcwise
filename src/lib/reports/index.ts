import { REPORT } from "./mortgage-affordability-by-state";

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
    slug: REPORT.slug,
    path: REPORT.path,
    title: "Mortgage Affordability by State: Median Home vs. Median Income",
    description: `What the monthly payment on each state's median home costs at ${REPORT.mortgageRate.toFixed(2)}%, as a share of median household income, for all 50 states and DC.`,
    datePublished: REPORT.datePublished,
    dateModified: REPORT.dateModified,
    dataSource: `Census ACS ${REPORT.acsYear} 1-year, Freddie Mac PMMS`,
  },
];
