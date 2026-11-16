/**
 * Data and calculations for the "Mortgage-Free Homeowners by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * Inputs (ACS 2025 1-year) were read between 2026-11-12 and 2026-11-16 from the Census Bureau's
 * table-based ACS Summary File (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/
 * data/1YRData, files acsdt1y2025-b25081, -b25027, -b25088; b25003 and b25077 in the same folder were
 * used for the tie-out and the home-value input). The four tables downloaded on 2026-11-12 were
 * downloaded again on 2026-11-16 and are byte-for-byte identical. The Census API requires a key and
 * was not used.
 *
 * What is stored: for every place, the owner-occupied households (B25081_001), those with a mortgage
 * or similar debt (_002), those without (_009), those with multiple mortgages (_004, which is the sum of
 * second mortgage only, home equity loan only, and both) and those with only a home equity loan and
 * no first mortgage (_008), each with its published margin of error. From B25027, owners with and
 * without a mortgage in the age groups 65 to 74 and 75 and over (summed to 65 and over), 55 to 59 and
 * 60 to 64 (summed to 55 to 64), and under 35 and 35 to 44 (summed to under 45); the margin of error of
 * a sum is the square root of the sum of the squared published margins. From B25088, the median selected
 * monthly owner costs for owners with a mortgage (_002) and without one (_003) with their margins.
 * Shares use the ACS General Handbook, chapter 8, formula for a proportion; the ratio of the two cost
 * medians uses the ratio formula. The U.S. age ladder (US_AGE_ROWS) is B25027 for the nation.
 *
 * Checks: all 50 states, DC, and the U.S. row were present (Puerto Rico was dropped, as in the
 * companion reports); in all 52 rows owners with plus without a mortgage equal the owner total, the
 * owner total equals B25003_002 and B25027_001, the three mortgage categories (no second mortgage or
 * home equity loan, multiple mortgages, home equity loan only) add up to owners with a mortgage, the
 * three multiple-mortgage categories add up to _004, the seven age groups add up to owners with and
 * without a mortgage, and the 51 state and DC rows add up exactly to the U.S. row for every count
 * stored here. No median is a top-coded or missing value (the highest is $3,256 a month).
 *
 * The median home value, median household income, and median real estate taxes come from the mortgage
 * affordability report's STATE_ROWS, and the household share with a member 65 or over and the average
 * monthly Social Security amount come from the retirement income report, so all the reports use the same
 * figures. The guards below fail the build if either report moves to a different ACS year before this
 * one does.
 */

import { REPORT as AFFORDABILITY_REPORT, STATE_ROWS, US_ROW, pct1, usd0 } from "./mortgage-affordability-by-state";
import {
  REPORT as RETIREMENT_REPORT,
  STATE_RESULTS as RETIREMENT_STATES,
  US_RESULT as RETIREMENT_US,
  ratio,
  rss,
  share,
  type Ratio,
  type Share,
} from "./retirement-income-by-state";
import { correlation, count0, millions } from "./car-ownership-by-state";

export { correlation, count0, millions, pct1, usd0 };
export type { Ratio, Share };

export const REPORT = {
  slug: "mortgage-free-homeowners-by-state",
  path: "/reports/mortgage-free-homeowners-by-state",
  csvPath: "/reports/mortgage-free-homeowners-by-state/data.csv",
  datePublished: "2026-11-16",
  dateModified: "2026-11-16",
  /** ACS survey year of every figure */
  acsYear: 2025,
} as const;

for (const other of [AFFORDABILITY_REPORT, RETIREMENT_REPORT]) {
  if (other.acsYear !== REPORT.acsYear) {
    throw new Error(
      `mortgage-free-homeowners-by-state uses ACS ${REPORT.acsYear} but ${other.slug} now uses ACS ${other.acsYear}. ` +
        `Refresh the mortgage rows in src/lib/reports/mortgage-free-homeowners-by-state.ts (tables B25081, B25027, B25088) in the same change.`,
    );
  }
}

export const REPORT_SOURCES = {
  acsMortgageStatus: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25081 (mortgage status)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25081",
  },
  acsMortgageByAge: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25027 (mortgage status by age of householder)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25027",
  },
  acsOwnerCosts: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25088 (median selected monthly owner costs by mortgage status)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25088",
  },
  acsValue: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25077 (median value of owner-occupied housing units)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25077",
  },
  acsTenure: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25003 (tenure), used for the owner-count tie-out",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25003",
  },
  acsFile: {
    label: "Census Bureau, 2025 ACS 1-year Summary File, table-based format (released Oct. 29, 2026)",
    href: "https://www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData/",
  },
  acsDefinitions: {
    label: "Census Bureau, 2025 ACS Subject Definitions (Mortgage Status; Selected Monthly Owner Costs)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
} as const;

export interface MortgageSourceRow {
  fips: string;
  abbr: string;
  /** B25081_001: owner-occupied housing units (households that own their home) */
  own: number;
  ownMoe: number;
  /** B25081_002: with a mortgage, contract to purchase, or similar debt */
  mort: number;
  mortMoe: number;
  /** B25081_009: without a mortgage (owned free and clear of debt) */
  noMort: number;
  noMortMoe: number;
  /** B25081_004: with multiple mortgages (a second mortgage, a home equity loan, or both, on top of a first mortgage) */
  multi: number;
  multiMoe: number;
  /** B25081_008: with a home equity loan and no first mortgage */
  helOnly: number;
  helOnlyMoe: number;
  /** B25027_008 + _009: owners with a mortgage, householder 65 and over */
  m65: number;
  m65Moe: number;
  /** B25027_016 + _017: owners without a mortgage, householder 65 and over */
  n65: number;
  n65Moe: number;
  /** B25027_006 + _007: owners with a mortgage, householder 55 to 64 */
  m5564: number;
  m5564Moe: number;
  /** B25027_014 + _015: owners without a mortgage, householder 55 to 64 */
  n5564: number;
  n5564Moe: number;
  /** B25027_003 + _004: owners with a mortgage, householder under 45 */
  mU45: number;
  mU45Moe: number;
  /** B25027_011 + _012: owners without a mortgage, householder under 45 */
  nU45: number;
  nU45Moe: number;
  /** B25088_002: median selected monthly owner costs, owners with a mortgage, dollars */
  medMort: number;
  medMortMoe: number;
  /** B25088_003: median selected monthly owner costs, owners without a mortgage, dollars */
  medNoMort: number;
  medNoMortMoe: number;
}

export interface AgeRow {
  label: string;
  withMortgage: number;
  withMortgageMoe: number;
  withoutMortgage: number;
  withoutMortgageMoe: number;
}

/** B25027 for the United States, by age of householder */
export const US_AGE_ROWS: AgeRow[] = [
  { label: "Under 35", withMortgage: 6997616, withMortgageMoe: 72962, withoutMortgage: 1721006, withoutMortgageMoe: 33838 },
  { label: "35 to 44", withMortgage: 11528516, withMortgageMoe: 63118, withoutMortgage: 2789095, withoutMortgageMoe: 39298 },
  { label: "45 to 54", withMortgage: 11266527, withMortgageMoe: 62408, withoutMortgage: 4005796, withoutMortgageMoe: 36590 },
  { label: "55 to 59", withMortgage: 5314324, withMortgageMoe: 41519, withoutMortgage: 2949161, withoutMortgageMoe: 29071 },
  { label: "60 to 64", withMortgage: 5194522, withMortgageMoe: 34267, withoutMortgage: 4410989, withoutMortgageMoe: 38857 },
  { label: "65 to 74", withMortgage: 7397969, withMortgageMoe: 38768, withoutMortgage: 10255650, withoutMortgageMoe: 52125 },
  { label: "75 and over", withMortgage: 3928935, withMortgageMoe: 31556, withoutMortgage: 9751628, withoutMortgageMoe: 44659 },
];

export const US_MORTGAGE_ROW: MortgageSourceRow =
{ fips: "00", abbr: "US", own: 87511734, ownMoe: 290818, mort: 51628409, mortMoe: 174477, noMort: 35883325, noMortMoe: 152888, multi: 5946060, multiMoe: 49042, helOnly: 1413807, helOnlyMoe: 21383, m65: 11326904, m65Moe: 49987, n65: 20007278, n65Moe: 68640, m5564: 10508846, m5564Moe: 53834, n5564: 7360150, n5564Moe: 48528, mU45: 18526132, mU45Moe: 96475, nU45: 4510101, nU45Moe: 51859, medMort: 2163, medMortMoe: 4, medNoMort: 703, medNoMortMoe: 2 };

const MORTGAGE_ROWS: MortgageSourceRow[] = [
  { fips: "01", abbr: "AL", own: 1468988, ownMoe: 13637, mort: 783690, mortMoe: 14265, noMort: 685298, noMortMoe: 11918, multi: 71442, multiMoe: 5087, helOnly: 19812, helOnlyMoe: 2413, m65: 175380, m65Moe: 6063, n65: 361145, n65Moe: 8092, m5564: 155897, m5564Moe: 7306, n5564: 145990, n5564Moe: 6310, mU45: 290072, mU45Moe: 9645, nU45: 101006, nU45Moe: 6208, medMort: 1588, medMortMoe: 17, medNoMort: 486, medNoMortMoe: 6 },
  { fips: "02", abbr: "AK", own: 185494, ownMoe: 3875, mort: 104243, mortMoe: 4542, noMort: 81251, noMortMoe: 3639, multi: 7356, multiMoe: 1298, helOnly: 1157, helOnlyMoe: 488, m65: 17620, m65Moe: 1924, n65: 41182, n65Moe: 2355, m5564: 19697, m5564Moe: 2231, n5564: 17842, n5564Moe: 2245, mU45: 46745, mU45Moe: 3446, nU45: 12854, nU45Moe: 1845, medMort: 2291, medMortMoe: 63, medNoMort: 709, medNoMortMoe: 28 },
  { fips: "04", abbr: "AZ", own: 2028249, ownMoe: 16762, mort: 1243177, mortMoe: 20703, noMort: 785072, noMortMoe: 15565, multi: 139034, multiMoe: 8062, helOnly: 19146, helOnlyMoe: 2219, m65: 340423, m65Moe: 10766, n65: 471503, n65Moe: 10711, m5564: 241501, m5564Moe: 9688, n5564: 149821, n5564Moe: 7501, mU45: 416260, mU45Moe: 12929, nU45: 89487, nU45Moe: 6700, medMort: 2010, medMortMoe: 26, medNoMort: 569, medNoMortMoe: 7 },
  { fips: "05", abbr: "AR", own: 858749, ownMoe: 10972, mort: 452679, mortMoe: 11091, noMort: 406070, noMortMoe: 9506, multi: 40505, multiMoe: 4883, helOnly: 9565, helOnlyMoe: 2023, m65: 92005, m65Moe: 4498, n65: 218599, n65Moe: 5769, m5564: 86793, m5564Moe: 4939, n5564: 85345, n5564Moe: 5094, mU45: 182399, mU45Moe: 7522, nU45: 48826, nU45Moe: 4113, medMort: 1477, medMortMoe: 22, medNoMort: 478, medNoMortMoe: 6 },
  { fips: "06", abbr: "CA", own: 7739255, ownMoe: 41400, mort: 5074122, mortMoe: 35478, noMort: 2665133, noMortMoe: 26185, multi: 585382, multiMoe: 15268, helOnly: 77756, helOnlyMoe: 4515, m65: 1355037, m65Moe: 17935, n65: 1519503, n65Moe: 18004, m5564: 1144745, m5564Moe: 19116, n5564: 508029, n5564Moe: 12078, mU45: 1459720, mU45Moe: 20649, nU45: 343706, nU45Moe: 10686, medMort: 3080, medMortMoe: 17, medNoMort: 918, medNoMortMoe: 7 },
  { fips: "08", abbr: "CO", own: 1621891, ownMoe: 15125, mort: 1108939, mortMoe: 17099, noMort: 512952, noMortMoe: 12191, multi: 162871, multiMoe: 7301, helOnly: 18759, helOnlyMoe: 2392, m65: 227827, m65Moe: 6838, n65: 291980, n65Moe: 7342, m5564: 208664, m5564Moe: 7928, n5564: 97840, n5564Moe: 5093, mU45: 435958, mU45Moe: 11630, nU45: 67808, nU45Moe: 5825, medMort: 2623, medMortMoe: 26, medNoMort: 766, medNoMortMoe: 11 },
  { fips: "09", abbr: "CT", own: 970885, ownMoe: 9905, mort: 610340, mortMoe: 10024, noMort: 360545, noMortMoe: 8391, multi: 82184, multiMoe: 4570, helOnly: 23023, helOnlyMoe: 2955, m65: 137224, m65Moe: 6006, n65: 217067, n65Moe: 6140, m5564: 131051, m5564Moe: 5939, n5564: 76149, n5564Moe: 4683, mU45: 201055, mU45Moe: 7637, nU45: 33280, nU45Moe: 3650, medMort: 2580, medMortMoe: 33, medNoMort: 1126, medNoMortMoe: 19 },
  { fips: "10", abbr: "DE", own: 315269, ownMoe: 6875, mort: 194852, mortMoe: 6942, noMort: 120417, noMortMoe: 5743, multi: 20073, multiMoe: 2735, helOnly: 6739, helOnlyMoe: 1486, m65: 55413, m65Moe: 3435, n65: 74048, n65Moe: 3778, m5564: 42726, m5564Moe: 3535, n5564: 23948, n5564Moe: 3101, mU45: 59607, mU45Moe: 4598, nU45: 12691, nU45Moe: 2494, medMort: 1960, medMortMoe: 38, medNoMort: 641, medNoMortMoe: 19 },
  { fips: "11", abbr: "DC", own: 126951, ownMoe: 4991, mort: 93315, mortMoe: 4577, noMort: 33636, noMortMoe: 2791, multi: 10846, multiMoe: 2327, helOnly: 1154, helOnlyMoe: 510, m65: 20578, m65Moe: 2707, n65: 17489, n65Moe: 1998, m5564: 15646, m5564Moe: 2618, n5564: 4828, n5564Moe: 1271, mU45: 38399, mU45Moe: 3162, nU45: 6404, nU45Moe: 2046, medMort: 3256, medMortMoe: 100, medNoMort: 922, medNoMortMoe: 81 },
  { fips: "12", abbr: "FL", own: 6345311, ownMoe: 42598, mort: 3471332, mortMoe: 33217, noMort: 2873979, noMortMoe: 32341, multi: 360204, multiMoe: 11077, helOnly: 85475, helOnlyMoe: 6780, m65: 930853, m65Moe: 16629, n65: 1721770, n65Moe: 21191, m5564: 743354, m5564Moe: 17523, n5564: 581120, n5564Moe: 13399, mU45: 1066110, mU45Moe: 21512, nU45: 299101, nU45Moe: 13170, medMort: 2265, medMortMoe: 16, medNoMort: 797, medNoMortMoe: 7 },
  { fips: "13", abbr: "GA", own: 2825592, ownMoe: 27198, mort: 1738857, mortMoe: 21660, noMort: 1086735, noMortMoe: 18826, multi: 170559, multiMoe: 7190, helOnly: 39875, helOnlyMoe: 3675, m65: 369037, m65Moe: 9455, n65: 558413, n65Moe: 11806, m5564: 375259, m5564Moe: 11566, n5564: 231305, n5564Moe: 8830, mU45: 587733, mU45Moe: 15843, nU45: 159364, nU45Moe: 8716, medMort: 2037, medMortMoe: 19, medNoMort: 617, medNoMortMoe: 7 },
  { fips: "15", abbr: "HI", own: 314269, ownMoe: 7066, mort: 186600, mortMoe: 6191, noMort: 127669, noMortMoe: 5733, multi: 34223, multiMoe: 2930, helOnly: 9482, helOnlyMoe: 1803, m65: 60743, m65Moe: 3463, n65: 79556, n65Moe: 4139, m5564: 40466, m5564Moe: 3258, n5564: 23220, n5564Moe: 2673, mU45: 47330, mU45Moe: 3614, nU45: 13562, nU45Moe: 2382, medMort: 3025, medMortMoe: 70, medNoMort: 752, medNoMortMoe: 24 },
  { fips: "16", abbr: "ID", own: 544227, ownMoe: 8165, mort: 329294, mortMoe: 8321, noMort: 214933, noMortMoe: 7153, multi: 57542, multiMoe: 3986, helOnly: 10012, helOnlyMoe: 1838, m65: 68791, m65Moe: 3655, n65: 124963, n65Moe: 4456, m5564: 62921, m5564Moe: 3860, n5564: 43104, n5564Moe: 3272, mU45: 132257, mU45Moe: 5401, nU45: 23901, nU45Moe: 3031, medMort: 1914, medMortMoe: 33, medNoMort: 511, medNoMortMoe: 12 },
  { fips: "17", abbr: "IL", own: 3478753, ownMoe: 24036, mort: 2068385, mortMoe: 23388, noMort: 1410368, noMortMoe: 19143, multi: 193241, multiMoe: 7506, helOnly: 44116, helOnlyMoe: 3798, m65: 418079, m65Moe: 11092, n65: 781091, n65Moe: 11155, m5564: 424647, m5564Moe: 11360, n5564: 281522, n5564Moe: 9265, mU45: 765550, mU45Moe: 15408, nU45: 178335, nU45Moe: 9420, medMort: 2129, medMortMoe: 18, medNoMort: 863, medNoMortMoe: 8 },
  { fips: "18", abbr: "IN", own: 1998396, ownMoe: 16788, mort: 1221439, mortMoe: 16267, noMort: 776957, noMortMoe: 14120, multi: 155964, multiMoe: 6260, helOnly: 42416, helOnlyMoe: 3002, m65: 244960, m65Moe: 6492, n65: 421018, n65Moe: 8053, m5564: 233974, m5564Moe: 8567, n5564: 152828, n5564Moe: 6521, mU45: 485115, mU45Moe: 10347, nU45: 113040, nU45Moe: 6638, medMort: 1577, medMortMoe: 16, medNoMort: 572, medNoMortMoe: 6 },
  { fips: "19", abbr: "IA", own: 967728, ownMoe: 10381, mort: 559732, mortMoe: 9865, noMort: 407996, noMortMoe: 8386, multi: 83669, multiMoe: 5110, helOnly: 15766, helOnlyMoe: 1922, m65: 92865, m65Moe: 4251, n65: 240560, n65Moe: 5453, m5564: 100656, m5564Moe: 4640, n5564: 82054, n5564Moe: 4157, mU45: 247508, mU45Moe: 6990, nU45: 47326, nU45Moe: 3826, medMort: 1650, medMortMoe: 17, medNoMort: 644, medNoMortMoe: 7 },
  { fips: "20", abbr: "KS", own: 813999, ownMoe: 9852, mort: 450473, mortMoe: 9998, noMort: 363526, noMortMoe: 8940, multi: 43368, multiMoe: 3439, helOnly: 9013, helOnlyMoe: 1581, m65: 86861, m65Moe: 4424, n65: 196677, n65Moe: 5474, m5564: 80306, m5564Moe: 4404, n5564: 73766, n5564Moe: 4376, mU45: 190433, mU45Moe: 7264, nU45: 52505, nU45Moe: 4473, medMort: 1818, medMortMoe: 31, medNoMort: 715, medNoMortMoe: 12 },
  { fips: "21", abbr: "KY", own: 1286890, ownMoe: 14947, mort: 691821, mortMoe: 13890, noMort: 595069, noMortMoe: 10683, multi: 93694, multiMoe: 5288, helOnly: 26026, helOnlyMoe: 3017, m65: 140956, m65Moe: 5656, n65: 312702, n65Moe: 6654, m5564: 132104, m5564Moe: 6433, n5564: 129672, n5564Moe: 5748, mU45: 268773, mU45Moe: 8352, nU45: 81910, nU45Moe: 5531, medMort: 1564, medMortMoe: 18, medNoMort: 510, medNoMortMoe: 7 },
  { fips: "22", abbr: "LA", own: 1261729, ownMoe: 15061, mort: 642351, mortMoe: 13676, noMort: 619378, noMortMoe: 10931, multi: 47735, multiMoe: 4724, helOnly: 11307, helOnlyMoe: 1847, m65: 123442, m65Moe: 5874, n65: 333712, n65Moe: 7833, m5564: 122009, m5564Moe: 6668, n5564: 129283, n5564Moe: 6325, mU45: 250829, mU45Moe: 8870, nU45: 87185, nU45Moe: 6687, medMort: 1708, medMortMoe: 25, medNoMort: 496, medNoMortMoe: 8 },
  { fips: "23", abbr: "ME", own: 459164, ownMoe: 6227, mort: 255997, mortMoe: 6909, noMort: 203167, noMortMoe: 5865, multi: 42024, multiMoe: 3658, helOnly: 13594, helOnlyMoe: 2107, m65: 57853, m65Moe: 3213, n65: 119899, n65Moe: 3836, m5564: 54620, m5564Moe: 3740, n5564: 43050, n5564Moe: 3067, mU45: 90520, mU45Moe: 4769, nU45: 21167, nU45Moe: 2423, medMort: 1957, medMortMoe: 37, medNoMort: 700, medNoMortMoe: 14 },
  { fips: "24", abbr: "MD", own: 1635289, ownMoe: 15769, mort: 1135376, mortMoe: 14729, noMort: 499913, noMortMoe: 11323, multi: 138574, multiMoe: 6854, helOnly: 27944, helOnlyMoe: 2926, m65: 260643, m65Moe: 7601, n65: 294547, n65Moe: 7269, m5564: 248753, m5564Moe: 9155, n5564: 98911, n5564Moe: 5571, mU45: 377232, mU45Moe: 11078, nU45: 54541, nU45Moe: 5058, medMort: 2548, medMortMoe: 24, medNoMort: 850, medNoMortMoe: 11 },
  { fips: "25", abbr: "MA", own: 1774484, ownMoe: 14797, mort: 1150587, mortMoe: 15647, noMort: 623897, noMortMoe: 11944, multi: 185546, multiMoe: 8676, helOnly: 43448, helOnlyMoe: 4647, m65: 258540, m65Moe: 8289, n65: 380092, n65Moe: 8965, m5564: 262926, m5564Moe: 8891, n5564: 131863, n5564Moe: 6439, mU45: 372971, mU45Moe: 11334, nU45: 55707, nU45Moe: 5273, medMort: 2884, medMortMoe: 22, medNoMort: 1154, medNoMortMoe: 15 },
  { fips: "26", abbr: "MI", own: 3075243, ownMoe: 18580, mort: 1739683, mortMoe: 15905, noMort: 1335560, noMortMoe: 16406, multi: 208981, multiMoe: 6313, helOnly: 51842, helOnlyMoe: 3754, m65: 375861, m65Moe: 8344, n65: 724383, n65Moe: 10172, m5564: 344552, m5564Moe: 8673, n5564: 284391, n5564Moe: 8080, mU45: 657861, mU45Moe: 10751, nU45: 179803, nU45Moe: 7936, medMort: 1696, medMortMoe: 11, medNoMort: 640, medNoMortMoe: 5 },
  { fips: "27", abbr: "MN", own: 1723926, ownMoe: 12370, mort: 1079036, mortMoe: 10997, noMort: 644890, noMortMoe: 8546, multi: 134109, multiMoe: 5391, helOnly: 25515, helOnlyMoe: 2361, m65: 186086, m65Moe: 5370, n65: 365990, n65Moe: 6346, m5564: 200812, m5564Moe: 5602, n5564: 140971, n5564Moe: 4807, mU45: 459461, mU45Moe: 8968, nU45: 71113, nU45Moe: 4137, medMort: 2130, medMortMoe: 17, medNoMort: 786, medNoMortMoe: 7 },
  { fips: "28", abbr: "MS", own: 857689, ownMoe: 10683, mort: 405272, mortMoe: 11060, noMort: 452417, noMortMoe: 10228, multi: 33452, multiMoe: 3498, helOnly: 9502, helOnlyMoe: 2099, m65: 87185, m65Moe: 4865, n65: 228226, n65Moe: 6524, m5564: 74873, m5564Moe: 5034, n5564: 96082, n5564Moe: 5266, mU45: 151736, mU45Moe: 7052, nU45: 67564, nU45Moe: 6097, medMort: 1499, medMortMoe: 31, medNoMort: 472, medNoMortMoe: 8 },
  { fips: "29", abbr: "MO", own: 1798959, ownMoe: 16531, mort: 1053964, mortMoe: 18007, noMort: 744995, noMortMoe: 13234, multi: 105903, multiMoe: 5982, helOnly: 23698, helOnlyMoe: 2803, m65: 212687, m65Moe: 6941, n65: 418406, n65Moe: 7804, m5564: 204528, m5564Moe: 7022, n5564: 149455, n5564Moe: 6173, mU45: 423838, mU45Moe: 10604, nU45: 95544, nU45Moe: 6135, medMort: 1676, medMortMoe: 16, medNoMort: 598, medNoMortMoe: 6 },
  { fips: "30", abbr: "MT", own: 334167, ownMoe: 5760, mort: 180223, mortMoe: 5705, noMort: 153944, noMortMoe: 5308, multi: 22604, multiMoe: 2444, helOnly: 3663, helOnlyMoe: 848, m65: 39299, m65Moe: 2775, n65: 91125, n65Moe: 3397, m5564: 32185, m5564Moe: 3180, n5564: 31089, n5564Moe: 2447, mU45: 70130, mU45Moe: 4179, nU45: 18753, nU45Moe: 2338, medMort: 1984, medMortMoe: 42, medNoMort: 630, medNoMortMoe: 15 },
  { fips: "31", abbr: "NE", own: 545211, ownMoe: 8330, mort: 314231, mortMoe: 7673, noMort: 230980, noMortMoe: 5416, multi: 35662, multiMoe: 3394, helOnly: 6837, helOnlyMoe: 1436, m65: 55166, m65Moe: 3621, n65: 129798, n65Moe: 3867, m5564: 53282, m5564Moe: 3503, n5564: 44218, n5564Moe: 3052, mU45: 135117, mU45Moe: 5766, nU45: 32267, nU45Moe: 3498, medMort: 1916, medMortMoe: 23, medNoMort: 721, medNoMortMoe: 11 },
  { fips: "32", abbr: "NV", own: 761654, ownMoe: 12923, mort: 488376, mortMoe: 12061, noMort: 273278, noMortMoe: 10152, multi: 48933, multiMoe: 4112, helOnly: 7407, helOnlyMoe: 1671, m65: 132715, m65Moe: 5728, n65: 146647, n65Moe: 6373, m5564: 96609, m5564Moe: 5469, n5564: 56155, n5564Moe: 4163, mU45: 155087, mU45Moe: 8125, nU45: 40370, nU45Moe: 4455, medMort: 2042, medMortMoe: 37, medNoMort: 582, medNoMortMoe: 12 },
  { fips: "33", abbr: "NH", own: 412973, ownMoe: 6835, mort: 245602, mortMoe: 6907, noMort: 167371, noMortMoe: 4845, multi: 39626, multiMoe: 3960, helOnly: 8420, helOnlyMoe: 1731, m65: 57580, m65Moe: 3434, n65: 101882, n65Moe: 3843, m5564: 55378, m5564Moe: 3572, n5564: 35669, n5564Moe: 3038, mU45: 79414, mU45Moe: 4350, nU45: 14498, nU45Moe: 2091, medMort: 2492, medMortMoe: 43, medNoMort: 1073, medNoMortMoe: 24 },
  { fips: "34", abbr: "NJ", own: 2275717, ownMoe: 18446, mort: 1421288, mortMoe: 16969, noMort: 854429, noMortMoe: 14589, multi: 170708, multiMoe: 8330, helOnly: 54055, helOnlyMoe: 3474, m65: 303653, m65Moe: 9292, n65: 493572, n65Moe: 10178, m5564: 312054, m5564Moe: 10204, n5564: 184109, n5564Moe: 7502, mU45: 474905, mU45Moe: 12395, nU45: 84552, nU45Moe: 6383, medMort: 2970, medMortMoe: 25, medNoMort: 1294, medNoMortMoe: 11 },
  { fips: "35", abbr: "NM", own: 602506, ownMoe: 9186, mort: 301459, mortMoe: 9357, noMort: 301047, noMortMoe: 7698, multi: 28540, multiMoe: 3105, helOnly: 5252, helOnlyMoe: 1137, m65: 75522, m65Moe: 4423, n65: 159660, n65Moe: 5270, m5564: 57408, m5564Moe: 4971, n5564: 60979, n5564Moe: 3818, mU45: 109312, mU45Moe: 6174, nU45: 44097, nU45Moe: 4407, medMort: 1654, medMortMoe: 30, medNoMort: 454, medNoMortMoe: 10 },
  { fips: "36", abbr: "NY", own: 4247594, ownMoe: 24877, mort: 2360541, mortMoe: 21239, noMort: 1887053, noMortMoe: 19939, multi: 280317, multiMoe: 8685, helOnly: 102165, helOnlyMoe: 5230, m65: 519645, m65Moe: 10645, n65: 1070629, n65Moe: 14834, m5564: 524584, m5564Moe: 11924, n5564: 394128, n5564Moe: 10580, mU45: 784399, mU45Moe: 15250, nU45: 224851, nU45Moe: 9000, medMort: 2703, medMortMoe: 22, medNoMort: 1049, medNoMortMoe: 11 },
  { fips: "37", abbr: "NC", own: 3040120, ownMoe: 25841, mort: 1830100, mortMoe: 24785, noMort: 1210020, noMortMoe: 16136, multi: 215340, multiMoe: 8975, helOnly: 58539, helOnlyMoe: 4691, m65: 406683, m65Moe: 10896, n65: 674724, n65Moe: 10723, m5564: 369440, m5564Moe: 11586, n5564: 243484, n5564Moe: 8133, mU45: 646379, mU45Moe: 13057, nU45: 152539, nU45Moe: 8345, medMort: 1864, medMortMoe: 18, medNoMort: 563, medNoMortMoe: 5 },
  { fips: "38", abbr: "ND", own: 217405, ownMoe: 5422, mort: 111034, mortMoe: 4555, noMort: 106371, noMortMoe: 3825, multi: 10600, multiMoe: 2097, helOnly: 2376, helOnlyMoe: 961, m65: 12990, m65Moe: 1658, n65: 56443, n65Moe: 2985, m5564: 16807, m5564Moe: 2068, n5564: 21705, n5564Moe: 2129, mU45: 57280, mU45Moe: 3477, nU45: 17665, nU45Moe: 2028, medMort: 1836, medMortMoe: 56, medNoMort: 605, medNoMortMoe: 15 },
  { fips: "39", abbr: "OH", own: 3343094, ownMoe: 23883, mort: 1962018, mortMoe: 23301, noMort: 1381076, noMortMoe: 17804, multi: 274890, multiMoe: 9197, helOnly: 90222, helOnlyMoe: 5425, m65: 424581, m65Moe: 10769, n65: 794731, n65Moe: 11547, m5564: 393008, m5564Moe: 10422, n5564: 282643, n5564Moe: 9496, mU45: 738967, mU45Moe: 14617, nU45: 155385, nU45Moe: 7577, medMort: 1672, medMortMoe: 10, medNoMort: 658, medNoMortMoe: 4 },
  { fips: "40", abbr: "OK", own: 1057933, ownMoe: 9821, mort: 543354, mortMoe: 9360, noMort: 514579, noMortMoe: 7993, multi: 42151, multiMoe: 3056, helOnly: 8398, helOnlyMoe: 1192, m65: 105898, m65Moe: 4540, n65: 270797, n65Moe: 5574, m5564: 99946, m5564Moe: 3977, n5564: 104654, n5564Moe: 4032, mU45: 221354, mU45Moe: 6308, nU45: 75752, nU45Moe: 4289, medMort: 1709, medMortMoe: 18, medNoMort: 563, medNoMortMoe: 6 },
  { fips: "41", abbr: "OR", own: 1101360, ownMoe: 14222, mort: 684804, mortMoe: 14138, noMort: 416556, noMortMoe: 9315, multi: 94230, multiMoe: 7380, helOnly: 15184, helOnlyMoe: 1993, m65: 184126, m65Moe: 6884, n65: 251831, n65Moe: 6752, m5564: 127318, m5564Moe: 5545, n5564: 76367, n5564Moe: 5170, mU45: 228354, mU45Moe: 7291, nU45: 44830, nU45Moe: 3985, medMort: 2343, medMortMoe: 26, medNoMort: 761, medNoMortMoe: 13 },
  { fips: "42", abbr: "PA", own: 3738856, ownMoe: 22114, mort: 2092089, mortMoe: 24053, noMort: 1646767, noMortMoe: 17803, multi: 308658, multiMoe: 10045, helOnly: 120958, helOnlyMoe: 5542, m65: 431909, m65Moe: 10076, n65: 954534, n65Moe: 11875, m5564: 432152, m5564Moe: 11634, n5564: 340841, n5564Moe: 8953, mU45: 772234, mU45Moe: 14319, nU45: 182760, nU45Moe: 9202, medMort: 1879, medMortMoe: 14, medNoMort: 687, medNoMortMoe: 6 },
  { fips: "44", abbr: "RI", own: 293926, ownMoe: 6539, mort: 188381, mortMoe: 6911, noMort: 105545, noMortMoe: 4648, multi: 34936, multiMoe: 3326, helOnly: 8068, helOnlyMoe: 1817, m65: 45539, m65Moe: 3409, n65: 64696, n65Moe: 3264, m5564: 39242, m5564Moe: 3599, n5564: 23081, n5564Moe: 3026, mU45: 61378, mU45Moe: 4916, nU45: 10172, nU45Moe: 2214, medMort: 2481, medMortMoe: 66, medNoMort: 960, medNoMortMoe: 24 },
  { fips: "45", abbr: "SC", own: 1649384, ownMoe: 13290, mort: 927350, mortMoe: 13432, noMort: 722034, noMortMoe: 12833, multi: 88735, multiMoe: 5406, helOnly: 23816, helOnlyMoe: 2870, m65: 222287, m65Moe: 7806, n65: 398324, n65Moe: 8382, m5564: 189027, m5564Moe: 7701, n5564: 148423, n5564Moe: 7172, mU45: 331940, mU45Moe: 9860, nU45: 92646, nU45Moe: 7642, medMort: 1736, medMortMoe: 22, medNoMort: 496, medNoMortMoe: 7 },
  { fips: "46", abbr: "SD", own: 256889, ownMoe: 5301, mort: 132680, mortMoe: 4471, noMort: 124209, noMortMoe: 4196, multi: 15745, multiMoe: 2069, helOnly: 2316, helOnlyMoe: 716, m65: 19942, m65Moe: 2086, n65: 67125, n65Moe: 2749, m5564: 23039, m5564Moe: 2421, n5564: 27008, n5564Moe: 2215, mU45: 62014, mU45Moe: 3634, nU45: 16985, nU45Moe: 2359, medMort: 1853, medMortMoe: 48, medNoMort: 667, medNoMortMoe: 16 },
  { fips: "47", abbr: "TN", own: 1998766, ownMoe: 18922, mort: 1118036, mortMoe: 16226, noMort: 880730, noMortMoe: 14729, multi: 126365, multiMoe: 7101, helOnly: 33088, helOnlyMoe: 3339, m65: 220932, m65Moe: 6936, n65: 480423, n65Moe: 10122, m5564: 226132, m5564Moe: 9471, n5564: 188929, n5564Moe: 7486, mU45: 416699, mU45Moe: 11455, nU45: 109464, nU45Moe: 7501, medMort: 1749, medMortMoe: 20, medNoMort: 503, medNoMortMoe: 7 },
  { fips: "48", abbr: "TX", own: 7273364, ownMoe: 38723, mort: 4024062, mortMoe: 31447, noMort: 3249302, noMortMoe: 34043, multi: 221598, multiMoe: 9715, helOnly: 64270, helOnlyMoe: 4833, m65: 665605, m65Moe: 15840, n65: 1559507, n65Moe: 17908, m5564: 747905, m5564Moe: 16569, n5564: 710151, n5564Moe: 14764, mU45: 1650623, mU45Moe: 22065, nU45: 511704, nU45Moe: 16585, medMort: 2345, medMortMoe: 17, medNoMort: 729, medNoMortMoe: 6 },
  { fips: "49", abbr: "UT", own: 829454, ownMoe: 9786, mort: 554345, mortMoe: 8333, noMort: 275109, noMortMoe: 6943, multi: 101235, multiMoe: 5028, helOnly: 13868, helOnlyMoe: 2028, m65: 89902, m65Moe: 4103, n65: 146708, n65Moe: 4353, m5564: 87160, m5564Moe: 4418, n5564: 50919, n5564Moe: 3516, mU45: 247299, mU45Moe: 7801, nU45: 38705, nU45Moe: 3705, medMort: 2283, medMortMoe: 28, medNoMort: 610, medNoMortMoe: 10 },
  { fips: "50", abbr: "VT", own: 207670, ownMoe: 4101, mort: 117535, mortMoe: 4734, noMort: 90135, noMortMoe: 3643, multi: 18440, multiMoe: 2241, helOnly: 4703, helOnlyMoe: 989, m65: 25801, m65Moe: 2086, n65: 52658, n65Moe: 2539, m5564: 25529, m5564Moe: 2350, n5564: 17404, n5564Moe: 1828, mU45: 42120, mU45Moe: 3350, nU45: 10605, nU45Moe: 2053, medMort: 2044, medMortMoe: 56, medNoMort: 871, medNoMortMoe: 24 },
  { fips: "51", abbr: "VA", own: 2362907, ownMoe: 18701, mort: 1541576, mortMoe: 17882, noMort: 821331, noMortMoe: 14271, multi: 179316, multiMoe: 7385, helOnly: 39884, helOnlyMoe: 3938, m65: 347523, m65Moe: 8768, n65: 477285, n65Moe: 8902, m5564: 331998, m5564Moe: 9849, n5564: 163951, n5564Moe: 6963, mU45: 530503, mU45Moe: 12417, nU45: 89059, nU45Moe: 6522, medMort: 2277, medMortMoe: 20, medNoMort: 663, medNoMortMoe: 10 },
  { fips: "53", abbr: "WA", own: 1997703, ownMoe: 16415, mort: 1276752, mortMoe: 16469, noMort: 720951, noMortMoe: 11488, multi: 172789, multiMoe: 7760, helOnly: 26921, helOnlyMoe: 3032, m65: 275272, m65Moe: 8154, n65: 415877, n65Moe: 9010, m5564: 249007, m5564Moe: 8332, n5564: 136116, n5564Moe: 6355, mU45: 475214, mU45Moe: 10761, nU45: 92467, nU45Moe: 6329, medMort: 2715, medMortMoe: 21, medNoMort: 845, medNoMortMoe: 11 },
  { fips: "54", abbr: "WV", own: 558933, ownMoe: 8009, mort: 242502, mortMoe: 7750, noMort: 316431, noMortMoe: 7239, multi: 23497, multiMoe: 2819, helOnly: 7794, helOnlyMoe: 1524, m65: 47941, m65Moe: 3232, n65: 168520, n65Moe: 4848, m5564: 44819, m5564Moe: 3465, n5564: 65989, n5564Moe: 3993, mU45: 92099, mU45Moe: 5124, nU45: 44921, nU45Moe: 3804, medMort: 1375, medMortMoe: 30, medNoMort: 439, medNoMortMoe: 7 },
  { fips: "55", abbr: "WI", own: 1747732, ownMoe: 13592, mort: 1025232, mortMoe: 12959, noMort: 722500, noMortMoe: 10031, multi: 168148, multiMoe: 5720, helOnly: 37384, helOnlyMoe: 2628, m65: 198859, m65Moe: 5457, n65: 421000, n65Moe: 7543, m5564: 202184, m5564Moe: 6506, n5564: 155717, n5564Moe: 5067, mU45: 398944, mU45Moe: 8266, nU45: 76759, nU45Moe: 4734, medMort: 1787, medMortMoe: 15, medNoMort: 686, medNoMortMoe: 6 },
  { fips: "56", abbr: "WY", own: 179037, ownMoe: 4689, mort: 99283, mortMoe: 4717, noMort: 79754, noMortMoe: 4289, multi: 14516, multiMoe: 2445, helOnly: 2077, helOnlyMoe: 708, m65: 20585, m65Moe: 2149, n65: 44261, n65Moe: 2861, m5564: 19153, m5564Moe: 2460, n5564: 14032, n5564Moe: 2004, mU45: 38895, mU45Moe: 3693, nU45: 10565, nU45Moe: 2128, medMort: 1896, medMortMoe: 70, medNoMort: 586, medNoMortMoe: 15 },
];

export interface AgeLadderRow extends AgeRow {
  owners: number;
  /** share of owners in the age group who still have a mortgage */
  mortgageShare: Share;
}

export const US_AGE_LADDER: AgeLadderRow[] = US_AGE_ROWS.map((a) => {
  const owners = a.withMortgage + a.withoutMortgage;
  return {
    ...a,
    owners,
    mortgageShare: share(a.withMortgage, a.withMortgageMoe, owners, rss([a.withMortgageMoe, a.withoutMortgageMoe])),
  };
});

export interface MortgageResult extends MortgageSourceRow {
  name: string;
  /** 1 = the highest share of owners without a mortgage */
  rank: number;
  /** B25077 median home value, dollars */
  value: number;
  /** B19013 median household income, dollars */
  income: number;
  /** B25103 median real estate taxes paid, dollars a year */
  tax: number;
  /** share of owner households without a mortgage */
  noMortShare: Share;
  /** share of owner households with a mortgage, contract to purchase, or similar debt */
  mortShare: Share;
  /** share of owner households with a second mortgage or a home equity loan (with or without a first mortgage) */
  secondShare: Share;
  /** share of owner households with a mortgage that also have a second mortgage or home equity loan */
  secondOfMort: Share;
  /** owner households with a householder 65 and over */
  own65: number;
  /** share of owner households with a householder 65 and over that still have a mortgage */
  mort65Share: Share;
  /** share of owner households with a householder 55 to 64 that have a mortgage */
  mort5564Share: Share;
  /** share of owner households with a householder under 45 that have a mortgage */
  mortU45Share: Share;
  /** median cost with a mortgage minus median cost without one, dollars a month (two different groups of households) */
  costGap: Ratio;
  /** median cost without a mortgage divided by median cost with one */
  costRatio: Ratio;
  /** share of all households with a member 65 or over, from the retirement income report */
  hh65Pct: number;
  /** average monthly Social Security income of households that receive it, from the retirement income report */
  ssMonthly: number;
  /** median monthly cost of owning with a mortgage divided by the average monthly Social Security amount */
  costVsSs: number;
}

function compute(
  row: MortgageSourceRow,
  name: string,
  value: number,
  income: number,
  tax: number,
  hh65Pct: number,
  ssMonthly: number,
): Omit<MortgageResult, "rank"> {
  const second = row.multi + row.helOnly;
  const secondMoe = rss([row.multiMoe, row.helOnlyMoe]);
  const own65 = row.m65 + row.n65;
  const own65Moe = rss([row.m65Moe, row.n65Moe]);
  const own5564 = row.m5564 + row.n5564;
  const own5564Moe = rss([row.m5564Moe, row.n5564Moe]);
  const ownU45 = row.mU45 + row.nU45;
  const ownU45Moe = rss([row.mU45Moe, row.nU45Moe]);
  return {
    ...row,
    name,
    value,
    income,
    tax,
    noMortShare: share(row.noMort, row.noMortMoe, row.own, row.ownMoe),
    mortShare: share(row.mort, row.mortMoe, row.own, row.ownMoe),
    secondShare: share(second, secondMoe, row.own, row.ownMoe),
    secondOfMort: share(second, secondMoe, row.mort, row.mortMoe),
    own65,
    mort65Share: share(row.m65, row.m65Moe, own65, own65Moe),
    mort5564Share: share(row.m5564, row.m5564Moe, own5564, own5564Moe),
    mortU45Share: share(row.mU45, row.mU45Moe, ownU45, ownU45Moe),
    costGap: { value: row.medMort - row.medNoMort, moe: rss([row.medMortMoe, row.medNoMortMoe]) },
    costRatio: ratio(row.medNoMort, row.medNoMortMoe, row.medMort, row.medMortMoe),
    hh65Pct,
    ssMonthly,
    costVsSs: row.medMort / ssMonthly,
  };
}

/** All 50 states and DC, ranked from the highest to the lowest share of owners without a mortgage. */
export const STATE_RESULTS: MortgageResult[] = MORTGAGE_ROWS.map((row) => {
  const base = STATE_ROWS.find((s) => s.fips === row.fips);
  const ret = RETIREMENT_STATES.find((s) => s.fips === row.fips);
  if (!base || !ret) throw new Error(`Missing companion input for FIPS ${row.fips}`);
  if (base.abbr !== row.abbr || ret.abbr !== row.abbr) throw new Error(`State mismatch for FIPS ${row.fips}`);
  return compute(row, base.name, base.value, base.income, base.tax, ret.hh65Share.pct, ret.ssMean.value / 12);
})
  .sort((a, b) => b.noMortShare.pct - a.noMortShare.pct)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<MortgageResult, "rank"> = compute(
  US_MORTGAGE_ROW,
  "United States",
  US_ROW.value,
  US_ROW.income,
  US_ROW.tax,
  RETIREMENT_US.hh65Share.pct,
  RETIREMENT_US.ssMean.value / 12,
);

export function getStateResult(abbr: string): MortgageResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_highest_share_of_owners_without_a_mortgage",
  "state",
  "abbr",
  "fips",
  "owner_households",
  "owners_without_mortgage",
  "owners_without_mortgage_pct",
  "owners_without_mortgage_moe90_pts",
  "owners_with_mortgage",
  "owners_with_mortgage_pct",
  "owners_with_second_mortgage_or_home_equity_loan",
  "owners_with_second_mortgage_or_home_equity_loan_pct_of_all_owners",
  "owners_with_second_mortgage_or_home_equity_loan_pct_moe90_pts",
  "owners_with_second_mortgage_or_home_equity_loan_pct_of_owners_with_mortgage",
  "owners_65plus",
  "owners_65plus_with_mortgage_pct",
  "owners_65plus_with_mortgage_moe90_pts",
  "owners_55_to_64_with_mortgage_pct",
  "owners_55_to_64_with_mortgage_moe90_pts",
  "owners_under_45_with_mortgage_pct",
  "owners_under_45_with_mortgage_moe90_pts",
  "median_monthly_owner_cost_with_mortgage_usd",
  "median_monthly_owner_cost_with_mortgage_moe90_usd",
  "median_monthly_owner_cost_without_mortgage_usd",
  "median_monthly_owner_cost_without_mortgage_moe90_usd",
  "median_cost_without_mortgage_as_pct_of_median_cost_with_mortgage",
  "median_home_value_usd",
  "median_household_income_usd",
  "median_real_estate_taxes_usd_per_year",
  "avg_monthly_social_security_per_recipient_household_usd",
  "median_owner_cost_with_mortgage_as_pct_of_avg_monthly_social_security",
] as const;

function csvLine(r: MortgageResult | (Omit<MortgageResult, "rank"> & { rank?: number })): string {
  const second = r.multi + r.helOnly;
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.own,
    r.noMort,
    round(r.noMortShare.pct, 2),
    round(r.noMortShare.moe, 2),
    r.mort,
    round(r.mortShare.pct, 2),
    second,
    round(r.secondShare.pct, 2),
    round(r.secondShare.moe, 2),
    round(r.secondOfMort.pct, 2),
    r.own65,
    round(r.mort65Share.pct, 2),
    round(r.mort65Share.moe, 2),
    round(r.mort5564Share.pct, 2),
    round(r.mort5564Share.moe, 2),
    round(r.mortU45Share.pct, 2),
    round(r.mortU45Share.moe, 2),
    r.medMort,
    r.medMortMoe,
    r.medNoMort,
    r.medNoMortMoe,
    round(r.costRatio.value * 100, 1),
    r.value,
    r.income,
    r.tax,
    round(r.ssMonthly),
    round(r.costVsSs * 100, 1),
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [CSV_HEADER.join(","), ...STATE_RESULTS.map(csvLine), csvLine(US_RESULT)].join("\n") + "\n";
}
