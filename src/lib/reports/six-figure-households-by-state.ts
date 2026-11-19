/**
 * Data and calculations for the "Six-Figure Households by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * Inputs (ACS 2025 1-year) were read on 2026-11-19 from the Census Bureau's table-based ACS Summary
 * File (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData, files
 * acsdt1y2025-b19001, -b19080, -b19083, -b20017; b25003 and b19013 in the same folder were used for the
 * tie-out). The Census API requires a key and was not used. Row labels were checked against the
 * Census variable list (api.census.gov/data/2025/acs/acs1/groups/<table>.html).
 *
 * What is stored: for every place, the households in the income distribution (B19001_001) and the
 * households under $50,000 (rows 002 to 010 added up), at $100,000 or more (rows 014 to 017), at
 * $150,000 or more (rows 016 and 017), and at $200,000 or more (row 017), each with its published margin
 * of error (the margin of a sum is the square root of the sum of the squared published margins). From
 * B19080 the four quintile upper limits and the lower limit of the top 5 percent (the Census Bureau
 * top-codes that last figure at $250,001, which means "$250,000 or more", and publishes no margin of
 * error for it). From B19083 the Gini index of income inequality. From B20017 the median earnings of
 * men and of women who worked full-time, year-round (_003 and _006). Shares use the ACS General Handbook,
 * chapter 8, formula for a proportion; the women-to-men earnings ratio uses the ratio formula.
 *
 * Checks: all 50 states, DC, and the U.S. row were present (Puerto Rico was dropped, as in the
 * companion reports); in all 52 rows the 16 income brackets add up to the household total, the
 * household total equals B25003_001, the median household income equals the B19013 value used by the
 * mortgage affordability report (estimate and margin of error), the 51 state and DC rows add up exactly
 * to the U.S. row for every count stored here, and no estimate or margin of error is negative or
 * missing except the top-coded top-5-percent limit. The U.S. owner count in B25003 (87,511,734) is the
 * same figure the mortgage-free homeowners report uses.
 *
 * Median gross rent and the median home value, real estate taxes, and household income come from the
 * rent vs. buy and mortgage affordability reports, so all the reports use the same figures. The guards
 * below fail the build if either report moves to a different ACS year before this one does.
 *
 * Individual wage earners (WAGE_EARNERS) come from the Social Security Administration's Wage
 * Statistics for 2025 (W-2 net compensation), read on 2026-11-19. That table counts every W-2 wage
 * earner, part-time and part-year included, so it is a different group from full-time workers and from
 * households.
 */

import {
  REPORT as AFFORDABILITY_REPORT,
  STATE_ROWS,
  US_ROW,
  computeRow as affordabilityRow,
  pct1,
  usd0,
} from "./mortgage-affordability-by-state";
import { REPORT as RENT_REPORT, STATE_INPUTS, US_INPUTS } from "./rent-vs-buy-by-state";
import { ratio, rss, share, type Ratio, type Share } from "./retirement-income-by-state";
import { correlation, count0, millions } from "./car-ownership-by-state";

export { correlation, count0, millions, pct1, usd0 };
export type { Ratio, Share };

export const REPORT = {
  slug: "six-figure-households-by-state",
  path: "/reports/six-figure-households-by-state",
  csvPath: "/reports/six-figure-households-by-state/data.csv",
  datePublished: "2026-11-19",
  dateModified: "2026-11-19",
  /** ACS survey year of every figure */
  acsYear: 2025,
  /** The income used to express rent and the home payment as a share of a six-figure income */
  benchmarkIncome: 100_000,
} as const;

for (const other of [AFFORDABILITY_REPORT, RENT_REPORT]) {
  if (other.acsYear !== REPORT.acsYear) {
    throw new Error(
      `six-figure-households-by-state uses ACS ${REPORT.acsYear} but ${other.slug} now uses ACS ${other.acsYear}. ` +
        `Refresh the income rows in src/lib/reports/six-figure-households-by-state.ts (tables B19001, B19080, B19083, B20017) in the same change.`,
    );
  }
}

/** The mortgage affordability report's pinned terms, which the home-payment columns use. */
export const AFFORDABILITY_PINNED = {
  rate: AFFORDABILITY_REPORT.mortgageRate,
  rateDate: AFFORDABILITY_REPORT.mortgageRateDate,
  downPaymentPct: AFFORDABILITY_REPORT.downPaymentPct,
  termYears: AFFORDABILITY_REPORT.termYears,
  guidelinePct: AFFORDABILITY_REPORT.guidelinePct,
} as const;

/**
 * Social Security Administration, Wage Statistics for 2025 (ssa.gov/cgi-bin/netcomp.cgi?year=2025),
 * distribution of wage earners by level of net compensation. "below" counts are the cumulative number
 * of wage earners at the end of the interval just under the threshold.
 */
export const WAGE_EARNERS = {
  year: 2025,
  total: 175_588_374,
  below100k: 143_733_143,
  below150k: 160_842_946,
  below200k: 167_574_801,
  below250k: 170_510_429,
  medianNetCompensation: 46_797.9,
  rawAverageNetCompensation: 69_861.77,
} as const;

export const WAGE_EARNER_SHARES = {
  atLeast100k: ((WAGE_EARNERS.total - WAGE_EARNERS.below100k) / WAGE_EARNERS.total) * 100,
  atLeast150k: ((WAGE_EARNERS.total - WAGE_EARNERS.below150k) / WAGE_EARNERS.total) * 100,
  atLeast200k: ((WAGE_EARNERS.total - WAGE_EARNERS.below200k) / WAGE_EARNERS.total) * 100,
  atLeast250k: ((WAGE_EARNERS.total - WAGE_EARNERS.below250k) / WAGE_EARNERS.total) * 100,
  count100k: WAGE_EARNERS.total - WAGE_EARNERS.below100k,
};

export const REPORT_SOURCES = {
  acsDistribution: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19001 (household income in the past 12 months)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19001",
  },
  acsQuintiles: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19080 (household income quintile upper limits)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19080",
  },
  acsGini: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19083 (Gini index of income inequality)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19083",
  },
  acsEarnings: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B20017 (median earnings by sex and work experience)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B20017",
  },
  acsIncome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19013 (median household income), used for the median-income tie-out",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19013",
  },
  acsTenure: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25003 (tenure), used for the household-count tie-out",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25003",
  },
  acsFile: {
    label: "Census Bureau, 2025 ACS 1-year Summary File, table-based format (released Oct. 29, 2026)",
    href: "https://www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData/",
  },
  acsDefinitions: {
    label: "Census Bureau, 2025 ACS Subject Definitions (Income in the Past 12 Months; Earnings)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
  ssaWages: {
    label: "Social Security Administration, Wage Statistics for 2025 (distribution of W-2 wage earners by net compensation)",
    href: "https://www.ssa.gov/cgi-bin/netcomp.cgi?year=2025",
  },
} as const;

export interface IncomeBandRow {
  fips: string;
  abbr: string;
  /** B19001_001: households */
  hh: number;
  hhMoe: number;
  /** B19001_002 to _010 added up: households with income under $50,000 */
  u50: number;
  u50Moe: number;
  /** B19001_014 to _017 added up: households with income of $100,000 or more */
  h100: number;
  h100Moe: number;
  /** B19001_016 and _017 added up: households with income of $150,000 or more */
  h150: number;
  h150Moe: number;
  /** B19001_017: households with income of $200,000 or more */
  h200: number;
  h200Moe: number;
  /** B19080_001 to _004: upper limits of the lowest, second, third, and fourth household income quintiles, dollars */
  q1: number;
  q1Moe: number;
  q2: number;
  q2Moe: number;
  q3: number;
  q3Moe: number;
  q4: number;
  q4Moe: number;
  /** B19080_005: lower limit of the top 5 percent; 250001 means the Census Bureau top-coded it at "$250,000 or more" (no margin of error published, stored as 0) */
  top5: number;
  top5Moe: number;
  /** B19083_001: Gini index of income inequality (0 = equal, 1 = one household has everything) */
  gini: number;
  giniMoe: number;
  /** B20017_003: median earnings of men who worked full-time, year-round, dollars */
  maleFt: number;
  maleFtMoe: number;
  /** B20017_006: median earnings of women who worked full-time, year-round, dollars */
  femaleFt: number;
  femaleFtMoe: number;
}

export interface BracketRow {
  label: string;
  households: number;
  moe: number;
}

/** B19001_002 to _017 for the United States */
export const US_BRACKETS: BracketRow[] = [
  { label: "Less than $10,000", households: 6907494, moe: 56321 },
  { label: "$10,000 to $14,999", households: 4122559, moe: 41478 },
  { label: "$15,000 to $19,999", households: 3562681, moe: 38500 },
  { label: "$20,000 to $24,999", households: 4134814, moe: 39307 },
  { label: "$25,000 to $29,999", households: 3798283, moe: 41179 },
  { label: "$30,000 to $34,999", households: 4244777, moe: 47993 },
  { label: "$35,000 to $39,999", households: 4115542, moe: 39633 },
  { label: "$40,000 to $44,999", households: 4418938, moe: 49333 },
  { label: "$45,000 to $49,999", households: 4088045, moe: 47639 },
  { label: "$50,000 to $59,999", households: 8349679, moe: 56061 },
  { label: "$60,000 to $74,999", households: 12163886, moe: 68478 },
  { label: "$75,000 to $99,999", households: 16814245, moe: 87520 },
  { label: "$100,000 to $124,999", households: 13869394, moe: 71429 },
  { label: "$125,000 to $149,999", households: 10149590, moe: 69508 },
  { label: "$150,000 to $199,999", households: 13521827, moe: 70662 },
  { label: "$200,000 or more", households: 19801668, moe: 84119 },
];

export const US_INCOME_ROW: IncomeBandRow =
{ fips: "00", abbr: "US", hh: 134063422, hhMoe: 130863, u50: 39393133, u50Moe: 134881, h100: 57342479, h100Moe: 148333, h150: 33323495, h150Moe: 109860, h200: 19801668, h200Moe: 84119, q1: 35046, q1Moe: 121, q2: 66788, q2Moe: 154, q3: 105373, q3Moe: 213, q4: 169893, q4Moe: 331, top5: 250001, top5Moe: 0, gini: 0.4823, giniMoe: 0.0007, maleFt: 70319, maleFtMoe: 112, femaleFt: 57690, femaleFtMoe: 250 };

const INCOME_ROWS: IncomeBandRow[] = [
  { fips: "01", abbr: "AL", hh: 2070835, hhMoe: 13313, u50: 781251, u50Moe: 17955, h100: 682961, h100Moe: 14324, h150: 352260, h150Moe: 10394, h200: 186210, h200Moe: 7586, q1: 26304, q1Moe: 576, q2: 52971, q2Moe: 1133, q3: 85619, q3Moe: 971, q4: 137380, q4Moe: 1722, top5: 248184, top5Moe: 4616, gini: 0.4805, giniMoe: 0.0048, maleFt: 62537, maleFtMoe: 1402, femaleFt: 48151, femaleFtMoe: 1123 },
  { fips: "02", abbr: "AK", hh: 278920, hhMoe: 3561, u50: 70049, u50Moe: 4668, h100: 133955, h100Moe: 6760, h150: 80311, h150Moe: 5071, h200: 46039, h200Moe: 3465, q1: 41472, q1Moe: 1688, q2: 75389, q2Moe: 3012, q3: 116404, q3Moe: 4164, q4: 178985, q4Moe: 5467, top5: 250001, top5Moe: 0, gini: 0.4421, giniMoe: 0.0124, maleFt: 73459, maleFtMoe: 3714, femaleFt: 65091, femaleFtMoe: 4088 },
  { fips: "04", abbr: "AZ", hh: 3040935, hhMoe: 13096, u50: 869885, u50Moe: 21558, h100: 1254350, h100Moe: 20818, h150: 678052, h150Moe: 15125, h200: 382003, h200Moe: 11618, q1: 36269, q1Moe: 844, q2: 66348, q2Moe: 853, q3: 101889, q3Moe: 904, q4: 158237, q4Moe: 2120, top5: 250001, top5Moe: 0, gini: 0.4653, giniMoe: 0.0044, maleFt: 66775, maleFtMoe: 900, femaleFt: 55361, femaleFtMoe: 650 },
  { fips: "05", abbr: "AR", hh: 1277805, hhMoe: 8667, u50: 492973, u50Moe: 14027, h100: 390799, h100Moe: 11298, h150: 193812, h150Moe: 7056, h200: 103740, h200Moe: 5469, q1: 26850, q1Moe: 727, q2: 51722, q2Moe: 869, q3: 81452, q3Moe: 1072, q4: 128710, q4Moe: 2628, top5: 241293, top5Moe: 6558, gini: 0.4831, giniMoe: 0.0063, maleFt: 56588, maleFtMoe: 1100, femaleFt: 46833, femaleFtMoe: 741 },
  { fips: "06", abbr: "CA", hh: 13898622, hhMoe: 27332, u50: 3423995, u50Moe: 40911, h100: 7147218, h100Moe: 46692, h150: 4654665, h150Moe: 34713, h200: 3015058, h200Moe: 27271, q1: 40559, q1Moe: 363, q2: 80662, q2Moe: 452, q3: 128661, q3Moe: 800, q4: 208169, q4Moe: 1348, top5: 250001, top5Moe: 0, gini: 0.4891, giniMoe: 0.0018, maleFt: 75132, maleFtMoe: 447, femaleFt: 66465, femaleFtMoe: 428 },
  { fips: "08", abbr: "CO", hh: 2483142, hhMoe: 10139, u50: 584469, u50Moe: 16815, h100: 1238955, h100Moe: 21405, h150: 768994, h150Moe: 16209, h200: 467258, h200Moe: 11595, q1: 42714, q1Moe: 1080, q2: 79823, q2Moe: 1182, q3: 122777, q3Moe: 1521, q4: 193702, q4Moe: 2303, top5: 250001, top5Moe: 0, gini: 0.46, giniMoe: 0.0051, maleFt: 80104, maleFtMoe: 1102, femaleFt: 67340, femaleFtMoe: 660 },
  { fips: "09", abbr: "CT", hh: 1456915, hhMoe: 7398, u50: 362640, u50Moe: 13676, h100: 728984, h100Moe: 14098, h150: 466869, h150Moe: 10760, h200: 298890, h200Moe: 8155, q1: 41083, q1Moe: 1312, q2: 78219, q2Moe: 2082, q3: 125616, q3Moe: 2102, q4: 202149, q4Moe: 2395, top5: 250001, top5Moe: 0, gini: 0.4955, giniMoe: 0.0067, maleFt: 81250, maleFtMoe: 844, femaleFt: 70550, femaleFtMoe: 934 },
  { fips: "10", abbr: "DE", hh: 422123, hhMoe: 4587, u50: 109513, u50Moe: 7326, h100: 197211, h100Moe: 8806, h150: 116454, h150Moe: 6852, h200: 62252, h200Moe: 5160, q1: 40026, q1Moe: 2141, q2: 72294, q2Moe: 2534, q3: 114594, q3Moe: 4299, q4: 174092, q4Moe: 5413, top5: 250001, top5Moe: 0, gini: 0.4427, giniMoe: 0.0093, maleFt: 72602, maleFtMoe: 4397, femaleFt: 62813, femaleFtMoe: 3587 },
  { fips: "11", abbr: "DC", hh: 333195, hhMoe: 4240, u50: 85877, u50Moe: 7486, h100: 178701, h100Moe: 7784, h150: 124394, h150Moe: 5775, h200: 87338, h200Moe: 4453, q1: 33615, q1Moe: 4098, q2: 82901, q2Moe: 4956, q3: 141901, q3Moe: 4849, q4: 238802, q4Moe: 8305, top5: 250001, top5Moe: 0, gini: 0.5148, giniMoe: 0.0122, maleFt: 105853, maleFtMoe: 7803, femaleFt: 100200, femaleFtMoe: 2252 },
  { fips: "12", abbr: "FL", hh: 9326796, hhMoe: 31150, u50: 2816074, u50Moe: 37457, h100: 3747965, h100Moe: 46875, h150: 2064351, h150Moe: 33365, h200: 1201189, h200Moe: 26504, q1: 34875, q1Moe: 403, q2: 64061, q2Moe: 633, q3: 100289, q3Moe: 527, q4: 157780, q4Moe: 1477, top5: 250001, top5Moe: 0, gini: 0.4843, giniMoe: 0.0032, maleFt: 61662, maleFtMoe: 323, femaleFt: 51776, femaleFtMoe: 280 },
  { fips: "13", abbr: "GA", hh: 4269857, hhMoe: 14138, u50: 1274373, u50Moe: 24267, h100: 1742640, h100Moe: 24624, h150: 970533, h150Moe: 16105, h200: 556542, h200Moe: 11019, q1: 34368, q1Moe: 748, q2: 65355, q2Moe: 789, q3: 101175, q3Moe: 660, q4: 161567, q4Moe: 1547, top5: 250001, top5Moe: 0, gini: 0.4722, giniMoe: 0.0042, maleFt: 65499, maleFtMoe: 624, femaleFt: 54407, femaleFtMoe: 986 },
  { fips: "15", abbr: "HI", hh: 500883, hhMoe: 5945, u50: 107580, u50Moe: 6089, h100: 267346, h100Moe: 7984, h150: 164004, h150Moe: 6213, h200: 100554, h200Moe: 4916, q1: 46511, q1Moe: 2012, q2: 84717, q2Moe: 2897, q3: 128953, q3Moe: 3359, q4: 200322, q4Moe: 4331, top5: 250001, top5Moe: 0, gini: 0.4523, giniMoe: 0.0092, maleFt: 70331, maleFtMoe: 1543, femaleFt: 58592, femaleFtMoe: 2242 },
  { fips: "16", abbr: "ID", hh: 765200, hhMoe: 5511, u50: 215451, u50Moe: 8399, h100: 317542, h100Moe: 9179, h150: 158474, h150Moe: 6274, h200: 85822, h200Moe: 4944, q1: 37248, q1Moe: 1180, q2: 67860, q2Moe: 1455, q3: 102064, q3Moe: 1280, q4: 151987, q4Moe: 2194, top5: 250001, top5Moe: 0, gini: 0.4433, giniMoe: 0.0084, maleFt: 66180, maleFtMoe: 1030, femaleFt: 52054, femaleFtMoe: 766 },
  { fips: "17", abbr: "IL", hh: 5134283, hhMoe: 13761, u50: 1481214, u50Moe: 25086, h100: 2247397, h100Moe: 27588, h150: 1304833, h150Moe: 18529, h200: 775818, h200Moe: 13939, q1: 35213, q1Moe: 561, q2: 68176, q2Moe: 983, q3: 107556, q3Moe: 959, q4: 171828, q4Moe: 1316, top5: 250001, top5Moe: 0, gini: 0.478, giniMoe: 0.0035, maleFt: 73143, maleFtMoe: 1478, femaleFt: 60788, femaleFtMoe: 457 },
  { fips: "18", abbr: "IN", hh: 2816686, hhMoe: 9835, u50: 919107, u50Moe: 19136, h100: 1000879, h100Moe: 17619, h150: 497494, h150Moe: 12488, h200: 259021, h200Moe: 8807, q1: 32999, q1Moe: 649, q2: 59880, q2Moe: 748, q3: 91461, q3Moe: 705, q4: 141664, q4Moe: 1456, top5: 250001, top5Moe: 0, gini: 0.4515, giniMoe: 0.0043, maleFt: 64773, maleFtMoe: 1218, femaleFt: 51287, femaleFtMoe: 419 },
  { fips: "19", abbr: "IA", hh: 1355504, hhMoe: 6652, u50: 434031, u50Moe: 11834, h100: 501494, h100Moe: 10742, h150: 247768, h150Moe: 7487, h200: 128110, h200Moe: 5528, q1: 33597, q1Moe: 948, q2: 61271, q2Moe: 710, q3: 93596, q3Moe: 1370, q4: 143369, q4Moe: 1866, top5: 250001, top5Moe: 0, gini: 0.4532, giniMoe: 0.0064, maleFt: 65258, maleFtMoe: 1033, femaleFt: 52369, femaleFtMoe: 712 },
  { fips: "20", abbr: "KS", hh: 1205638, hhMoe: 6563, u50: 371374, u50Moe: 10496, h100: 457775, h100Moe: 11459, h150: 232976, h150Moe: 7712, h200: 133645, h200Moe: 5344, q1: 35906, q1Moe: 848, q2: 62239, q2Moe: 1095, q3: 95484, q3Moe: 1591, q4: 147109, q4Moe: 2871, top5: 250001, top5Moe: 0, gini: 0.4542, giniMoe: 0.0061, maleFt: 63862, maleFtMoe: 2456, femaleFt: 51164, femaleFtMoe: 705 },
  { fips: "21", abbr: "KY", hh: 1885581, hhMoe: 9687, u50: 716483, u50Moe: 16924, h100: 599385, h100Moe: 13872, h150: 300699, h150Moe: 9452, h200: 155503, h200Moe: 6998, q1: 26201, q1Moe: 657, q2: 52445, q2Moe: 888, q3: 82836, q3Moe: 1193, q4: 133402, q4Moe: 2008, top5: 242495, top5Moe: 5243, gini: 0.4776, giniMoe: 0.0048, maleFt: 61274, maleFtMoe: 510, femaleFt: 50246, femaleFtMoe: 730 },
  { fips: "22", abbr: "LA", hh: 1855847, hhMoe: 11110, u50: 737209, u50Moe: 17957, h100: 596744, h100Moe: 16083, h150: 312964, h150Moe: 11710, h200: 161516, h200Moe: 7559, q1: 23729, q1Moe: 733, q2: 50309, q2Moe: 875, q3: 81906, q3Moe: 1113, q4: 136841, q4Moe: 2691, top5: 249805, top5Moe: 7146, gini: 0.4899, giniMoe: 0.0057, maleFt: 62518, maleFtMoe: 2689, femaleFt: 47257, femaleFtMoe: 1132 },
  { fips: "23", abbr: "ME", hh: 620759, hhMoe: 6210, u50: 183528, u50Moe: 7930, h100: 251865, h100Moe: 7965, h150: 133991, h150Moe: 5524, h200: 71762, h200Moe: 3805, q1: 35394, q1Moe: 1227, q2: 65485, q2Moe: 1406, q3: 100826, q3Moe: 1474, q4: 156001, q4Moe: 2941, top5: 250001, top5Moe: 0, gini: 0.4583, giniMoe: 0.0091, maleFt: 70604, maleFtMoe: 1199, femaleFt: 58389, femaleFtMoe: 1628 },
  { fips: "24", abbr: "MD", hh: 2428843, hhMoe: 9986, u50: 550942, u50Moe: 16937, h100: 1295933, h100Moe: 21008, h150: 857604, h150Moe: 15101, h200: 544290, h200Moe: 10903, q1: 43426, q1Moe: 1376, q2: 85179, q2Moe: 1332, q3: 134206, q3Moe: 1365, q4: 210695, q4Moe: 2071, top5: 250001, top5Moe: 0, gini: 0.459, giniMoe: 0.0043, maleFt: 83289, maleFtMoe: 2131, femaleFt: 71435, femaleFtMoe: 797 },
  { fips: "25", abbr: "MA", hh: 2827794, hhMoe: 12938, u50: 675771, u50Moe: 18078, h100: 1503697, h100Moe: 23006, h150: 1006895, h150Moe: 16878, h200: 673506, h200Moe: 12350, q1: 40529, q1Moe: 927, q2: 83357, q2Moe: 1655, q3: 135672, q3Moe: 1726, q4: 219901, q4Moe: 2495, top5: 250001, top5Moe: 0, gini: 0.4863, giniMoe: 0.004, maleFt: 89139, maleFtMoe: 2483, femaleFt: 75628, femaleFtMoe: 761 },
  { fips: "26", abbr: "MI", hh: 4150990, hhMoe: 12914, u50: 1354922, u50Moe: 21884, h100: 1545359, h100Moe: 21186, h150: 829040, h150Moe: 14829, h200: 452802, h200Moe: 9745, q1: 31786, q1Moe: 437, q2: 60488, q2Moe: 476, q3: 93545, q3Moe: 1018, q4: 149881, q4Moe: 1324, top5: 250001, top5Moe: 0, gini: 0.4696, giniMoe: 0.0036, maleFt: 69278, maleFtMoe: 1350, femaleFt: 55168, femaleFtMoe: 616 },
  { fips: "27", abbr: "MN", hh: 2391870, hhMoe: 8635, u50: 609047, u50Moe: 14003, h100: 1112163, h100Moe: 16276, h150: 633395, h150Moe: 11207, h200: 354467, h200Moe: 8370, q1: 41105, q1Moe: 617, q2: 73844, q2Moe: 1057, q3: 114043, q3Moe: 1164, q4: 173090, q4Moe: 1620, top5: 250001, top5Moe: 0, gini: 0.4512, giniMoe: 0.0045, maleFt: 75909, maleFtMoe: 585, femaleFt: 63334, femaleFtMoe: 1124 },
  { fips: "28", abbr: "MS", hh: 1197317, hhMoe: 8286, u50: 516384, u50Moe: 14862, h100: 334119, h100Moe: 10957, h150: 151336, h150Moe: 7214, h200: 74620, h200Moe: 5005, q1: 23478, q1Moe: 784, q2: 45717, q2Moe: 1015, q3: 74900, q3Moe: 1823, q4: 120796, q4Moe: 2030, top5: 214924, top5Moe: 6095, gini: 0.4779, giniMoe: 0.0068, maleFt: 55716, maleFtMoe: 1672, femaleFt: 44082, femaleFtMoe: 1006 },
  { fips: "29", abbr: "MO", hh: 2604619, hhMoe: 11993, u50: 852131, u50Moe: 18564, h100: 952703, h100Moe: 16208, h150: 496759, h150Moe: 11572, h200: 267874, h200Moe: 9040, q1: 32596, q1Moe: 703, q2: 60056, q2Moe: 703, q3: 92501, q3Moe: 1091, q4: 146253, q4Moe: 1812, top5: 250001, top5Moe: 0, gini: 0.4668, giniMoe: 0.0056, maleFt: 63466, maleFtMoe: 1658, femaleFt: 51987, femaleFtMoe: 465 },
  { fips: "30", abbr: "MT", hh: 481275, hhMoe: 4632, u50: 154128, u50Moe: 7165, h100: 186810, h100Moe: 6981, h150: 95818, h150Moe: 5066, h200: 48550, h200Moe: 3707, q1: 32499, q1Moe: 1290, q2: 61644, q2Moe: 1705, q3: 96942, q3Moe: 2648, q4: 149698, q4Moe: 2990, top5: 250001, top5Moe: 0, gini: 0.4568, giniMoe: 0.011, maleFt: 65493, maleFtMoe: 2082, femaleFt: 51662, femaleFtMoe: 1029 },
  { fips: "31", abbr: "NE", hh: 827249, hhMoe: 4929, u50: 242571, u50Moe: 9254, h100: 332548, h100Moe: 9331, h150: 175729, h150Moe: 6933, h200: 95291, h200Moe: 5215, q1: 36506, q1Moe: 1188, q2: 65590, q2Moe: 1136, q3: 100281, q3Moe: 1361, q4: 155288, q4Moe: 3205, top5: 250001, top5Moe: 0, gini: 0.4539, giniMoe: 0.0083, maleFt: 65785, maleFtMoe: 985, femaleFt: 52170, femaleFtMoe: 674 },
  { fips: "32", abbr: "NV", hh: 1245703, hhMoe: 8030, u50: 355592, u50Moe: 13319, h100: 534219, h100Moe: 15263, h150: 294466, h150Moe: 11717, h200: 166387, h200Moe: 8767, q1: 36606, q1Moe: 1008, q2: 67223, q2Moe: 1673, q3: 105263, q3Moe: 1932, q4: 162990, q4Moe: 2662, top5: 250001, top5Moe: 0, gini: 0.4682, giniMoe: 0.0076, maleFt: 61675, maleFtMoe: 708, femaleFt: 52201, femaleFtMoe: 766 },
  { fips: "33", abbr: "NH", hh: 574089, hhMoe: 5217, u50: 122877, u50Moe: 6622, h100: 305630, h100Moe: 9620, h150: 191199, h150Moe: 6848, h200: 115214, h200Moe: 4953, q1: 46726, q1Moe: 1868, q2: 85562, q2Moe: 2440, q3: 130896, q3Moe: 2424, q4: 200288, q4Moe: 4211, top5: 250001, top5Moe: 0, gini: 0.442, giniMoe: 0.0083, maleFt: 80818, maleFtMoe: 982, femaleFt: 66497, femaleFtMoe: 1419 },
  { fips: "34", abbr: "NJ", hh: 3565008, hhMoe: 10954, u50: 811319, u50Moe: 21090, h100: 1909284, h100Moe: 27351, h150: 1262769, h150Moe: 21738, h200: 818922, h200Moe: 17185, q1: 44460, q1Moe: 977, q2: 85197, q2Moe: 1299, q3: 134523, q3Moe: 1280, q4: 214529, q4Moe: 3033, top5: 250001, top5Moe: 0, gini: 0.476, giniMoe: 0.0043, maleFt: 81733, maleFtMoe: 528, femaleFt: 70435, femaleFtMoe: 806 },
  { fips: "35", abbr: "NM", hh: 863010, hhMoe: 7332, u50: 316003, u50Moe: 11119, h100: 297178, h100Moe: 10295, h150: 159147, h150Moe: 6739, h200: 87944, h200Moe: 5026, q1: 28072, q1Moe: 1261, q2: 54758, q2Moe: 1584, q3: 86996, q3Moe: 1628, q4: 143730, q4Moe: 2703, top5: 250001, top5Moe: 0, gini: 0.4812, giniMoe: 0.0098, maleFt: 60607, maleFtMoe: 956, femaleFt: 51962, femaleFtMoe: 1204 },
  { fips: "36", abbr: "NY", hh: 7867612, hhMoe: 17339, u50: 2360403, u50Moe: 32927, h100: 3582472, h100Moe: 35369, h150: 2275073, h150Moe: 27857, h200: 1463812, h200Moe: 21471, q1: 32285, q1Moe: 395, q2: 68463, q2Moe: 792, q3: 113687, q3Moe: 1076, q4: 190771, q4Moe: 1674, top5: 250001, top5Moe: 0, gini: 0.5189, giniMoe: 0.003, maleFt: 75442, maleFtMoe: 561, femaleFt: 67128, femaleFtMoe: 588 },
  { fips: "37", abbr: "NC", hh: 4539531, hhMoe: 17005, u50: 1448070, u50Moe: 24708, h100: 1758568, h100Moe: 25673, h150: 969768, h150Moe: 19401, h200: 544034, h200Moe: 14775, q1: 33246, q1Moe: 589, q2: 61487, q2Moe: 603, q3: 97073, q3Moe: 957, q4: 154502, q4Moe: 1475, top5: 250001, top5Moe: 0, gini: 0.4693, giniMoe: 0.0032, maleFt: 65064, maleFtMoe: 1055, femaleFt: 53032, femaleFtMoe: 986 },
  { fips: "38", abbr: "ND", hh: 352013, hhMoe: 3073, u50: 97647, u50Moe: 5829, h100: 139757, h100Moe: 6293, h150: 71800, h150Moe: 4355, h200: 38033, h200Moe: 2989, q1: 38087, q1Moe: 1662, q2: 65764, q2Moe: 2268, q3: 99450, q3Moe: 2445, q4: 151337, q4Moe: 4058, top5: 250001, top5Moe: 0, gini: 0.4442, giniMoe: 0.0105, maleFt: 67226, maleFtMoe: 3664, femaleFt: 52951, femaleFtMoe: 1437 },
  { fips: "39", abbr: "OH", hh: 4957873, hhMoe: 12038, u50: 1641831, u50Moe: 24467, h100: 1814613, h100Moe: 23370, h150: 938304, h150Moe: 15232, h200: 493297, h200Moe: 11620, q1: 31568, q1Moe: 353, q2: 59517, q2Moe: 648, q3: 92443, q3Moe: 725, q4: 145586, q4Moe: 1305, top5: 250001, top5Moe: 0, gini: 0.4645, giniMoe: 0.0033, maleFt: 66734, maleFtMoe: 442, femaleFt: 54173, femaleFtMoe: 808 },
  { fips: "40", abbr: "OK", hh: 1616177, hhMoe: 6690, u50: 591380, u50Moe: 12394, h100: 535258, h100Moe: 11076, h150: 262830, h150Moe: 7505, h200: 134774, h200Moe: 5094, q1: 28967, q1Moe: 644, q2: 54067, q2Moe: 827, q3: 85668, q3Moe: 1063, q4: 134395, q4Moe: 1567, top5: 245596, top5Moe: 4853, gini: 0.4695, giniMoe: 0.0049, maleFt: 59991, maleFtMoe: 1196, femaleFt: 46902, femaleFtMoe: 551 },
  { fips: "41", abbr: "OR", hh: 1745361, hhMoe: 9072, u50: 509971, u50Moe: 14831, h100: 757225, h100Moe: 15848, h150: 429584, h150Moe: 11668, h200: 241999, h200Moe: 8520, q1: 35193, q1Moe: 1107, q2: 68022, q2Moe: 1786, q3: 106841, q3Moe: 2177, q4: 166754, q4Moe: 2926, top5: 250001, top5Moe: 0, gini: 0.4606, giniMoe: 0.0054, maleFt: 72085, maleFtMoe: 892, femaleFt: 61726, femaleFtMoe: 713 },
  { fips: "42", abbr: "PA", hh: 5405581, hhMoe: 14199, u50: 1646870, u50Moe: 26836, h100: 2216468, h100Moe: 25032, h150: 1236897, h150Moe: 18885, h200: 712438, h200Moe: 12998, q1: 33401, q1Moe: 633, q2: 64227, q2Moe: 738, q3: 101685, q3Moe: 671, q4: 161580, q4Moe: 1307, top5: 250001, top5Moe: 0, gini: 0.4724, giniMoe: 0.0034, maleFt: 70662, maleFtMoe: 473, femaleFt: 58093, femaleFtMoe: 874 },
  { fips: "44", abbr: "RI", hh: 450467, hhMoe: 4304, u50: 120327, u50Moe: 7625, h100: 204208, h100Moe: 8638, h150: 125035, h150Moe: 6650, h200: 68579, h200Moe: 4989, q1: 36790, q1Moe: 3098, q2: 71407, q2Moe: 2326, q3: 112922, q3Moe: 4635, q4: 177192, q4Moe: 6004, top5: 250001, top5Moe: 0, gini: 0.4728, giniMoe: 0.0146, maleFt: 75096, maleFtMoe: 2152, femaleFt: 61974, femaleFtMoe: 1576 },
  { fips: "45", abbr: "SC", hh: 2296350, hhMoe: 12026, u50: 770692, u50Moe: 19074, h100: 837841, h100Moe: 17838, h150: 429665, h150Moe: 11949, h200: 237813, h200Moe: 8293, q1: 30824, q1Moe: 556, q2: 58559, q2Moe: 997, q3: 91770, q3Moe: 1152, q4: 144822, q4Moe: 2110, top5: 250001, top5Moe: 0, gini: 0.4728, giniMoe: 0.0059, maleFt: 62170, maleFtMoe: 705, femaleFt: 51947, femaleFtMoe: 496 },
  { fips: "46", abbr: "SD", hh: 387580, hhMoe: 3932, u50: 117832, u50Moe: 6484, h100: 151680, h100Moe: 6629, h150: 72853, h150Moe: 4298, h200: 34673, h200Moe: 2830, q1: 36213, q1Moe: 1247, q2: 63297, q2Moe: 2726, q3: 98573, q3Moe: 2240, q4: 145009, q4Moe: 4186, top5: 250001, top5Moe: 0, gini: 0.4471, giniMoe: 0.0122, maleFt: 64706, maleFtMoe: 2947, femaleFt: 51811, femaleFtMoe: 837 },
  { fips: "47", abbr: "TN", hh: 2954096, hhMoe: 11880, u50: 977536, u50Moe: 21662, h100: 1100338, h100Moe: 20503, h150: 573386, h150Moe: 15240, h200: 321601, h200Moe: 11264, q1: 32106, q1Moe: 475, q2: 60315, q2Moe: 729, q3: 94137, q3Moe: 1226, q4: 147260, q4Moe: 1995, top5: 250001, top5Moe: 0, gini: 0.4768, giniMoe: 0.0058, maleFt: 62637, maleFtMoe: 1246, femaleFt: 51323, femaleFtMoe: 390 },
  { fips: "48", abbr: "TX", hh: 11607274, hhMoe: 26154, u50: 3430856, u50Moe: 43391, h100: 4847541, h100Moe: 44546, h150: 2780724, h150Moe: 32893, h200: 1611315, h200Moe: 23419, q1: 35313, q1Moe: 386, q2: 65865, q2Moe: 444, q3: 102834, q3Moe: 703, q4: 164894, q4Moe: 1044, top5: 250001, top5Moe: 0, gini: 0.4776, giniMoe: 0.0025, maleFt: 65874, maleFtMoe: 423, femaleFt: 52424, femaleFtMoe: 436 },
  { fips: "49", abbr: "UT", hh: 1208124, hhMoe: 6720, u50: 270985, u50Moe: 10703, h100: 601058, h100Moe: 14693, h150: 338503, h150Moe: 9971, h200: 194915, h200Moe: 7607, q1: 44842, q1Moe: 1589, q2: 80710, q2Moe: 1029, q3: 120205, q3Moe: 1822, q4: 180888, q4Moe: 2949, top5: 250001, top5Moe: 0, gini: 0.4354, giniMoe: 0.0068, maleFt: 73494, maleFtMoe: 2068, femaleFt: 56361, femaleFtMoe: 1080 },
  { fips: "50", abbr: "VT", hh: 285750, hhMoe: 2748, u50: 79612, u50Moe: 4612, h100: 123556, h100Moe: 5884, h150: 66320, h150Moe: 4589, h200: 37063, h200Moe: 2975, q1: 36746, q1Moe: 2325, q2: 69012, q2Moe: 2805, q3: 106410, q3Moe: 3177, q4: 161634, q4Moe: 4252, top5: 250001, top5Moe: 0, gini: 0.4565, giniMoe: 0.0133, maleFt: 69840, maleFtMoe: 2729, femaleFt: 62273, femaleFtMoe: 1911 },
  { fips: "51", abbr: "VA", hh: 3480219, hhMoe: 10199, u50: 852978, u50Moe: 19035, h100: 1731080, h100Moe: 21968, h150: 1088051, h150Moe: 16497, h200: 689556, h200Moe: 12668, q1: 41317, q1Moe: 642, q2: 77628, q2Moe: 968, q3: 123583, q3Moe: 1330, q4: 199042, q4Moe: 1854, top5: 250001, top5Moe: 0, gini: 0.469, giniMoe: 0.0034, maleFt: 78311, maleFtMoe: 1522, femaleFt: 63214, femaleFtMoe: 1381 },
  { fips: "53", abbr: "WA", hh: 3180129, hhMoe: 10710, u50: 734966, u50Moe: 18358, h100: 1627746, h100Moe: 23358, h150: 1022433, h150Moe: 17775, h200: 649001, h200Moe: 13160, q1: 43513, q1Moe: 996, q2: 80890, q2Moe: 751, q3: 125919, q3Moe: 1056, q4: 202046, q4Moe: 1918, top5: 250001, top5Moe: 0, gini: 0.4725, giniMoe: 0.0042, maleFt: 83603, maleFtMoe: 2120, femaleFt: 70261, femaleFtMoe: 727 },
  { fips: "54", abbr: "WV", hh: 747801, hhMoe: 6569, u50: 306747, u50Moe: 9881, h100: 207722, h100Moe: 7734, h150: 99192, h150Moe: 5162, h200: 47362, h200Moe: 3484, q1: 24078, q1Moe: 976, q2: 48276, q2Moe: 1640, q3: 75915, q3Moe: 1894, q4: 120654, q4Moe: 2007, top5: 220706, top5Moe: 8681, gini: 0.4744, giniMoe: 0.0072, maleFt: 61615, maleFtMoe: 897, femaleFt: 48821, femaleFtMoe: 2745 },
  { fips: "55", abbr: "WI", hh: 2567583, hhMoe: 9080, u50: 761975, u50Moe: 16132, h100: 1010268, h100Moe: 14557, h150: 514938, h150Moe: 10794, h200: 274420, h200Moe: 8029, q1: 36041, q1Moe: 616, q2: 64703, q2Moe: 797, q3: 98548, q3Moe: 934, q4: 150189, q4Moe: 1233, top5: 250001, top5Moe: 0, gini: 0.4485, giniMoe: 0.0051, maleFt: 68974, maleFtMoe: 1414, femaleFt: 56929, femaleFtMoe: 583 },
  { fips: "56", abbr: "WY", hh: 256608, hhMoe: 3485, u50: 73692, u50Moe: 5501, h100: 101271, h100Moe: 6588, h150: 50084, h150Moe: 4383, h200: 28846, h200Moe: 3369, q1: 36478, q1Moe: 2618, q2: 66245, q2Moe: 2535, q3: 99276, q3Moe: 3092, q4: 148295, q4Moe: 5298, top5: 250001, top5Moe: 0, gini: 0.4653, giniMoe: 0.0207, maleFt: 68321, maleFtMoe: 2796, femaleFt: 52433, femaleFtMoe: 2574 },
];

/** The Census Bureau's top-code for the lower limit of the top 5 percent: "$250,000 or more" */
export const TOP_CODE = 250_001;

export interface BracketBand {
  label: string;
  households: number;
  moe: number;
  share: Share;
}

/** The 16 published brackets grouped into seven bands for the U.S. ladder table. */
export const US_LADDER: BracketBand[] = (() => {
  const hh = US_INCOME_ROW.hh;
  const hhMoe = US_INCOME_ROW.hhMoe;
  const groups: [string, number, number][] = [
    ["Under $25,000", 0, 3],
    ["$25,000 to $49,999", 4, 8],
    ["$50,000 to $74,999", 9, 10],
    ["$75,000 to $99,999", 11, 11],
    ["$100,000 to $149,999", 12, 13],
    ["$150,000 to $199,999", 14, 14],
    ["$200,000 or more", 15, 15],
  ];
  return groups.map(([label, from, to]) => {
    const slice = US_BRACKETS.slice(from, to + 1);
    const households = slice.reduce((s, b) => s + b.households, 0);
    const moe = rss(slice.map((b) => b.moe));
    return { label, households, moe, share: share(households, moe, hh, hhMoe) };
  });
})();

export interface IncomeBandResult extends IncomeBandRow {
  name: string;
  /** 1 = the highest share of households with income of $100,000 or more */
  rank: number;
  /** B19013 median household income, dollars */
  income: number;
  /** share of households with income of $100,000 or more */
  h100Share: Share;
  /** share of households with income of $150,000 or more */
  h150Share: Share;
  /** share of households with income of $200,000 or more */
  h200Share: Share;
  /** share of households with income under $50,000 */
  u50Share: Share;
  /** share of households with income under $100,000: the percentile at which a $100,000 household sits */
  below100Share: Share;
  /** the lower limit of the top 5 percent is top-coded at "$250,000 or more" */
  top5Coded: boolean;
  /** median earnings of women who work full-time, year-round, divided by the same for men */
  femaleToMale: Ratio;
  /** B25064 median gross rent, dollars a month, from the rent vs. buy report */
  rent: number;
  /** B25077 median home value, dollars, from the mortgage affordability report */
  value: number;
  /** median monthly rent times 12 as a percent of the benchmark income */
  rentShare: number;
  /** principal, interest, and property tax on the median home (20% down, the affordability report's pinned rate), dollars a month */
  payment: number;
  /** that payment times 12 as a percent of the benchmark income */
  paymentShare: number;
  /** annual income at which the payment equals the affordability report's 28% guideline */
  incomeNeeded: number;
  /** the benchmark income meets the 28% guideline for the median home */
  meetsGuideline: boolean;
}

function compute(row: IncomeBandRow, name: string, income: number, rent: number, base: (typeof STATE_ROWS)[number]): Omit<IncomeBandResult, "rank"> {
  const afford = affordabilityRow(base);
  const yearlyBenchmark = REPORT.benchmarkIncome;
  const h100Share = share(row.h100, row.h100Moe, row.hh, row.hhMoe);
  return {
    ...row,
    name,
    income,
    h100Share,
    h150Share: share(row.h150, row.h150Moe, row.hh, row.hhMoe),
    h200Share: share(row.h200, row.h200Moe, row.hh, row.hhMoe),
    u50Share: share(row.u50, row.u50Moe, row.hh, row.hhMoe),
    below100Share: { pct: 100 - h100Share.pct, moe: h100Share.moe },
    top5Coded: row.top5 >= TOP_CODE,
    femaleToMale: ratio(row.femaleFt, row.femaleFtMoe, row.maleFt, row.maleFtMoe),
    rent,
    value: base.value,
    rentShare: ((rent * 12) / yearlyBenchmark) * 100,
    payment: afford.payment,
    paymentShare: ((afford.payment * 12) / yearlyBenchmark) * 100,
    incomeNeeded: afford.incomeNeeded,
    meetsGuideline: afford.incomeNeeded <= yearlyBenchmark,
  };
}

/** All 50 states and DC, ranked from the highest to the lowest share of households with income of $100,000 or more. */
export const STATE_RESULTS: IncomeBandResult[] = INCOME_ROWS.map((row) => {
  const base = STATE_ROWS.find((s) => s.fips === row.fips);
  const rent = STATE_INPUTS.find((s) => s.fips === row.fips);
  if (!base || !rent) throw new Error(`Missing companion input for FIPS ${row.fips}`);
  if (base.abbr !== row.abbr || rent.abbr !== row.abbr) throw new Error(`State mismatch for FIPS ${row.fips}`);
  return compute(row, base.name, base.income, rent.rent, base);
})
  .sort((a, b) => b.h100Share.pct - a.h100Share.pct)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<IncomeBandResult, "rank"> = compute(US_INCOME_ROW, "United States", US_ROW.income, US_INPUTS.rent, US_ROW);

export function getStateResult(abbr: string): IncomeBandResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_highest_share_of_households_at_100k_plus",
  "state",
  "abbr",
  "fips",
  "households",
  "households_100k_plus",
  "households_100k_plus_pct",
  "households_100k_plus_moe90_pts",
  "households_150k_plus_pct",
  "households_150k_plus_moe90_pts",
  "households_200k_plus_pct",
  "households_200k_plus_moe90_pts",
  "households_under_50k_pct",
  "households_under_50k_moe90_pts",
  "percentile_of_a_100k_household_pct_below",
  "median_household_income_usd",
  "quintile1_upper_limit_usd",
  "quintile2_upper_limit_usd",
  "quintile3_upper_limit_usd",
  "top_quintile_lower_limit_usd",
  "top_quintile_lower_limit_moe90_usd",
  "top_5pct_lower_limit_usd",
  "top_5pct_lower_limit_is_top_coded_250000_or_more",
  "gini_index",
  "gini_index_moe90",
  "median_earnings_men_full_time_year_round_usd",
  "median_earnings_men_full_time_year_round_moe90_usd",
  "median_earnings_women_full_time_year_round_usd",
  "median_earnings_women_full_time_year_round_moe90_usd",
  "women_to_men_median_earnings_pct",
  "median_gross_rent_usd_per_month",
  "median_rent_as_pct_of_100k",
  "median_home_value_usd",
  "payment_on_median_home_usd_per_month",
  "payment_as_pct_of_100k",
  "income_needed_for_median_home_at_28pct_usd",
] as const;

function csvLine(r: IncomeBandResult | (Omit<IncomeBandResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.hh,
    r.h100,
    round(r.h100Share.pct, 2),
    round(r.h100Share.moe, 2),
    round(r.h150Share.pct, 2),
    round(r.h150Share.moe, 2),
    round(r.h200Share.pct, 2),
    round(r.h200Share.moe, 2),
    round(r.u50Share.pct, 2),
    round(r.u50Share.moe, 2),
    round(r.below100Share.pct, 1),
    r.income,
    r.q1,
    r.q2,
    r.q3,
    r.q4,
    r.q4Moe,
    r.top5,
    r.top5Coded ? "yes" : "no",
    r.gini,
    r.giniMoe,
    r.maleFt,
    r.maleFtMoe,
    r.femaleFt,
    r.femaleFtMoe,
    round(r.femaleToMale.value * 100, 1),
    r.rent,
    round(r.rentShare, 1),
    r.value,
    round(r.payment),
    round(r.paymentShare, 1),
    round(r.incomeNeeded),
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [CSV_HEADER.join(","), ...STATE_RESULTS.map(csvLine), csvLine(US_RESULT)].join("\n") + "\n";
}
