/**
 * Data and calculations for the "Self-Employment by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * Inputs (ACS 2025 1-year) were read on 2026-11-23 from the Census Bureau's table-based ACS Summary
 * File (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData, files
 * acsdt1y2025-b24080, -b19053, -b19063, -b19052, -b19062; b25003 and b19013 were used for the tie-outs).
 * The Census API requires a key and was not used. Row labels were checked against the Census variable
 * list (api.census.gov/data/2025/acs/acs1/groups/<table>.html).
 *
 * What is stored: for every place, from B24080 (sex by class of worker, civilian employed population
 * 16 and over) the total workers (_001), the women among them (_012), the workers self-employed in an
 * own incorporated business (_005 men plus _015 women), the workers self-employed in an own
 * unincorporated business (_010 men plus _020 women), and the women in those two classes (_015 plus
 * _020). From B19053 the households (_001) and the households with self-employment income (_002); from
 * B19063 the aggregate self-employment income of all households, in dollars; from B19052 the households
 * with wage or salary income (_002) and from B19062 their aggregate wage and salary income. Unpaid
 * family workers are counted in the worker total but not as self-employed. Each count carries its
 * published margin of error; the margin of a sum is the square root of the sum of the squared
 * published margins, and the margin of a share or a ratio follows the ACS General Handbook, chapter 8.
 * Means are aggregate dollars divided by the households that report the income. Self-employment income
 * is net: receipts minus expenses, and a loss counts as a negative amount.
 *
 * Checks: all 50 states, DC, and the U.S. row were present (Puerto Rico was dropped, as in the
 * companion reports). In all 52 rows households with plus without self-employment income equal the
 * household total, households with plus without wage or salary income equal the household total, the
 * household total equals the B25003 count used in the retirement income report (U.S. 134,063,422), the
 * men and women class-of-worker rows add up to their sex totals and the sex totals add up to the worker
 * total, private for-profit workers equal the employees of private companies plus the incorporated
 * self-employed, and no count is zero or negative. The 51 state and DC rows add up exactly to the U.S.
 * row for households, households with self-employment income, households with wage income, aggregate
 * self-employment income, workers, and every class of worker stored here (aggregate wage dollars differ
 * by $400 because the Census Bureau rounds each published aggregate to $100).
 *
 * Median household income (B19013) is NOT stored again here: it comes from the mortgage affordability
 * report's STATE_ROWS, so all the reports use the same income figures. The guard below fails the build
 * if that report moves to a different ACS year before this one does.
 *
 * Self-employment tax follows IRC 1401 and 1402 through the shared constants in src/lib/tax-data.ts (tax
 * year 2026). It is applied to the 2025 income the ACS measured, as a what-if with today's rules.
 */

import { REPORT as AFFORDABILITY_REPORT, STATE_ROWS, US_ROW, pct1, usd0 } from "./mortgage-affordability-by-state";
import { ratio, rss, share, type Ratio, type Share } from "./retirement-income-by-state";
import { correlation, count0, millions } from "./car-ownership-by-state";
import {
  MEDICARE_SELF_EMPLOYED_RATE,
  SE_EARNINGS_FACTOR,
  SOCIAL_SECURITY_SELF_EMPLOYED_RATE,
  SOCIAL_SECURITY_WAGE_BASE,
  TAX_DATA,
  selfEmploymentTax,
} from "../tax-data";

export { correlation, count0, millions, pct1, usd0 };
export type { Ratio, Share };

export const REPORT = {
  slug: "self-employment-by-state",
  path: "/reports/self-employment-by-state",
  csvPath: "/reports/self-employment-by-state/data.csv",
  datePublished: "2026-11-23",
  dateModified: "2026-11-23",
  /** ACS survey year of every figure */
  acsYear: 2025,
  /** Version label of the CSV download. It is part of the download file name. */
  csvVersion: 1,
} as const;

if (AFFORDABILITY_REPORT.acsYear !== REPORT.acsYear) {
  throw new Error(
    `self-employment-by-state uses ACS ${REPORT.acsYear} but mortgage-affordability-by-state now uses ACS ` +
      `${AFFORDABILITY_REPORT.acsYear}. Refresh the rows in src/lib/reports/self-employment-by-state.ts ` +
      `(tables B24080, B19053, B19063, B19052, B19062) in the same change.`,
  );
}

export const REPORT_SOURCES = {
  acsClass: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B24080 (sex by class of worker for the civilian employed population 16 years and over)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B24080",
  },
  acsHouseholds: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19053 (self-employment income in the past 12 months for households)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19053",
  },
  acsAggregate: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19063 (aggregate self-employment income for households)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19063",
  },
  acsWage: {
    label: "U.S. Census Bureau, ACS 2025 1-year, tables B19052 and B19062 (wage or salary income for households, count and aggregate)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19052",
  },
  acsIncome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19013 (median household income), used for the median-income column",
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
    label: "Census Bureau, 2025 ACS Subject Definitions (Class of Worker; Income in the Past 12 Months)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
  irsSeTax: {
    label: "IRS, Self-Employment Tax (Social Security and Medicare Taxes)",
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
  },
  ssaWageBase: {
    label: "SSA, Contribution and Benefit Base",
    href: "https://www.ssa.gov/oact/cola/cbb.html",
  },
} as const;

export { selfEmploymentTax };

export const SE_TAX_BASIS = {
  taxYear: TAX_DATA.taxYear,
  wageBase: SOCIAL_SECURITY_WAGE_BASE,
  earningsFactor: SE_EARNINGS_FACTOR,
  socialSecurityRate: SOCIAL_SECURITY_SELF_EMPLOYED_RATE,
  medicareRate: MEDICARE_SELF_EMPLOYED_RATE,
} as const;

export interface SelfEmploymentRow {
  fips: string;
  abbr: string;
  /** B19053_001: households */
  hh: number;
  hhMoe: number;
  /** B19053_002: households with self-employment income */
  se: number;
  seMoe: number;
  /** B19063_001: aggregate self-employment income of households, dollars (net, losses included) */
  seAgg: number;
  seAggMoe: number;
  /** B19052_002: households with wage or salary income */
  wage: number;
  wageMoe: number;
  /** B19062_001: aggregate wage and salary income of households, dollars */
  wageAgg: number;
  wageAggMoe: number;
  /** B24080_001: civilian employed workers 16 and over */
  workers: number;
  workersMoe: number;
  /** B24080_012: women among those workers */
  wf: number;
  wfMoe: number;
  /** B24080_005 + _015: workers self-employed in an own incorporated business */
  inc: number;
  incMoe: number;
  /** B24080_010 + _020: workers self-employed in an own unincorporated business */
  uninc: number;
  unincMoe: number;
  /** B24080_015 + _020: women among the self-employed workers */
  seFemale: number;
  seFemaleMoe: number;
}

export const US_SE_ROW: SelfEmploymentRow =
{ fips: "00", abbr: "US", hh: 134063422, hhMoe: 130863, se: 14617795, seMoe: 66569, seAgg: 700793812200, seAggMoe: 7687221796, wage: 99690015, wageMoe: 136972, wageAgg: 11748813264200, wageAggMoe: 30523819241, workers: 167279529, workersMoe: 171374, wf: 80922277, wfMoe: 107115, inc: 6786638, incMoe: 52752, uninc: 9695272, unincMoe: 59255, seFemale: 6641884, seFemaleMoe: 51247 };

const SE_ROWS: SelfEmploymentRow[] = [
  { fips: "01", abbr: "AL", hh: 2070835, hhMoe: 13313, se: 187387, seMoe: 9333, seAgg: 7459886100, seAggMoe: 557439336, wage: 1442957, wageMoe: 14167, wageAgg: 137883435700, wageAggMoe: 2441079480, workers: 2364679, workersMoe: 18307, wf: 1155694, wfMoe: 13831, inc: 91157, incMoe: 6431, uninc: 127336, unincMoe: 7028, seFemale: 91010, seFemaleMoe: 6436 },
  { fips: "02", abbr: "AK", hh: 278920, hhMoe: 3561, se: 36536, seMoe: 3732, seAgg: 1754153700, seAggMoe: 369635158, wage: 219089, wageMoe: 4254, wageAgg: 24674966000, wageAggMoe: 945475082, workers: 348504, workersMoe: 6267, wf: 160619, wfMoe: 4183, inc: 13673, incMoe: 2312, uninc: 20763, unincMoe: 2810, seFemale: 17324, seFemaleMoe: 2637 },
  { fips: "04", abbr: "AZ", hh: 3040935, hhMoe: 13096, se: 325704, seMoe: 12823, seAgg: 16349733100, seAggMoe: 1276146726, wage: 2184369, wageMoe: 15286, wageAgg: 239388740400, wageAggMoe: 3986408986, workers: 3551607, workersMoe: 24912, wf: 1684164, wfMoe: 16969, inc: 148621, incMoe: 8960, uninc: 209766, unincMoe: 10388, seFemale: 141595, seFemaleMoe: 8580 },
  { fips: "05", abbr: "AR", hh: 1277805, hhMoe: 8667, se: 135934, seMoe: 6882, seAgg: 5888735200, seAggMoe: 639468190, wage: 897822, wageMoe: 11568, wageAgg: 81146534500, wageAggMoe: 2000333786, workers: 1433788, workersMoe: 13055, wf: 693260, wfMoe: 9911, inc: 64870, incMoe: 4746, uninc: 94196, unincMoe: 5761, seFemale: 62842, seFemaleMoe: 5129 },
  { fips: "06", abbr: "CA", hh: 13898622, hhMoe: 27332, se: 1818381, seMoe: 25132, seAgg: 92489255100, seAggMoe: 3052963207, wage: 10629891, wageMoe: 35402, wageAgg: 1521746869800, wageAggMoe: 8492408099, workers: 18995602, workersMoe: 44546, wf: 9015354, wfMoe: 36058, inc: 812091, incMoe: 17781, uninc: 1355515, unincMoe: 23915, seFemale: 889362, seFemaleMoe: 18383 },
  { fips: "08", abbr: "CO", hh: 2483142, hhMoe: 10139, se: 331407, seMoe: 11439, seAgg: 15909550600, seAggMoe: 1096243000, wage: 1937549, wageMoe: 15549, wageAgg: 248795063000, wageAggMoe: 3531952581, workers: 3174268, workersMoe: 17092, wf: 1506613, wfMoe: 12125, inc: 169625, incMoe: 8088, uninc: 193110, unincMoe: 9209, seFemale: 154989, seFemaleMoe: 8831 },
  { fips: "09", abbr: "CT", hh: 1456915, hhMoe: 7398, se: 148385, seMoe: 7523, seAgg: 8268703800, seAggMoe: 836821508, wage: 1093896, wageMoe: 10159, wageAgg: 157560875300, wageAggMoe: 3240171227, workers: 1893540, workersMoe: 16875, wf: 934741, wfMoe: 12760, inc: 70158, incMoe: 5676, uninc: 98202, unincMoe: 6032, seFemale: 72119, seFemaleMoe: 5424 },
  { fips: "10", abbr: "DE", hh: 422123, hhMoe: 4587, se: 33462, seMoe: 3361, seAgg: 1569982800, seAggMoe: 296537590, wage: 305252, wageMoe: 5943, wageAgg: 35553399500, wageAggMoe: 1280875287, workers: 510229, workersMoe: 8112, wf: 259002, wfMoe: 5336, inc: 20339, incMoe: 2920, uninc: 22458, unincMoe: 2889, seFemale: 17009, seFemaleMoe: 2757 },
  { fips: "11", abbr: "DC", hh: 333195, hhMoe: 4240, se: 37572, seMoe: 4743, seAgg: 2044870100, seAggMoe: 358259043, wage: 256905, wageMoe: 6203, wageAgg: 41993711600, wageAggMoe: 1345339118, workers: 377470, workersMoe: 6998, wf: 198488, wfMoe: 5402, inc: 12432, incMoe: 2434, uninc: 19359, unincMoe: 3635, seFemale: 15036, seFemaleMoe: 3238 },
  { fips: "12", abbr: "FL", hh: 9326796, hhMoe: 31150, se: 1036147, seMoe: 21883, seAgg: 53884449600, seAggMoe: 2740918487, wage: 6560613, wageMoe: 34454, wageAgg: 722702702100, wageAggMoe: 8379320926, workers: 11246155, workersMoe: 42228, wf: 5484496, wfMoe: 31535, inc: 751225, incMoe: 19454, uninc: 726111, unincMoe: 19141, seFemale: 607587, seFemaleMoe: 17275 },
  { fips: "13", abbr: "GA", hh: 4269857, hhMoe: 14138, se: 441131, seMoe: 13397, seAgg: 19728507300, seAggMoe: 1208266142, wage: 3261259, wageMoe: 18238, wageAgg: 363377328800, wageAggMoe: 3946081378, workers: 5493495, workersMoe: 29693, wf: 2725533, wfMoe: 20974, inc: 254912, incMoe: 10422, uninc: 289523, unincMoe: 11918, seFemale: 221557, seFemaleMoe: 10111 },
  { fips: "15", abbr: "HI", hh: 500883, hhMoe: 5945, se: 71121, seMoe: 4924, seAgg: 4093871400, seAggMoe: 766132240, wage: 372872, wageMoe: 6396, wageAgg: 46842864400, wageAggMoe: 1639147428, workers: 681782, workersMoe: 8862, wf: 339513, wfMoe: 5643, inc: 26126, incMoe: 2860, uninc: 52612, unincMoe: 4321, seFemale: 37493, seFemaleMoe: 3633 },
  { fips: "16", abbr: "ID", hh: 765200, hhMoe: 5511, se: 107602, seMoe: 5074, seAgg: 5327197500, seAggMoe: 649526127, wage: 560504, wageMoe: 7551, wageAgg: 57417456500, wageAggMoe: 1302649063, workers: 977897, workersMoe: 10881, wf: 441029, wfMoe: 7365, inc: 46499, incMoe: 3309, uninc: 73972, unincMoe: 4637, seFemale: 45977, seFemaleMoe: 3821 },
  { fips: "17", abbr: "IL", hh: 5134283, hhMoe: 13761, se: 468608, seMoe: 12859, seAgg: 20490412400, seAggMoe: 1193991324, wage: 3842705, wageMoe: 18251, wageAgg: 465259196500, wageAggMoe: 4554485856, workers: 6365592, workersMoe: 27683, wf: 3097041, wfMoe: 21554, inc: 247766, incMoe: 9788, uninc: 276389, unincMoe: 10973, seFemale: 206122, seFemaleMoe: 8710 },
  { fips: "18", abbr: "IN", hh: 2816686, hhMoe: 9835, se: 243439, seMoe: 8641, seAgg: 9680898500, seAggMoe: 862433604, wage: 2121930, wageMoe: 13619, wageAgg: 208410150100, wageAggMoe: 3038520018, workers: 3415709, workersMoe: 18586, wf: 1643444, wfMoe: 13802, inc: 119557, incMoe: 5797, uninc: 135935, unincMoe: 6810, seFemale: 99348, seFemaleMoe: 5378 },
  { fips: "19", abbr: "IA", hh: 1355504, hhMoe: 6652, se: 158193, seMoe: 5709, seAgg: 7833729800, seAggMoe: 989648825, wage: 1005258, wageMoe: 8734, wageAgg: 97189678800, wageAggMoe: 1746260982, workers: 1655777, workersMoe: 10985, wf: 788313, wfMoe: 8687, inc: 65474, incMoe: 4096, uninc: 93251, unincMoe: 4476, seFemale: 61435, seFemaleMoe: 3808 },
  { fips: "20", abbr: "KS", hh: 1205638, hhMoe: 6563, se: 138925, seMoe: 5483, seAgg: 6363286200, seAggMoe: 690805616, wage: 916193, wageMoe: 8013, wageAgg: 92406280500, wageAggMoe: 1984940818, workers: 1494302, workersMoe: 13087, wf: 717721, wfMoe: 10543, inc: 56923, incMoe: 4619, uninc: 86834, unincMoe: 5244, seFemale: 58516, seFemaleMoe: 4486 },
  { fips: "21", abbr: "KY", hh: 1885581, hhMoe: 9687, se: 176632, seMoe: 7168, seAgg: 7011949900, seAggMoe: 654208986, wage: 1318609, wageMoe: 11424, wageAgg: 123417136100, wageAggMoe: 2384982667, workers: 2098439, workersMoe: 15476, wf: 1004637, wfMoe: 11386, inc: 65903, incMoe: 4337, uninc: 112263, unincMoe: 7545, seFemale: 69702, seFemaleMoe: 5404 },
  { fips: "22", abbr: "LA", hh: 1855847, hhMoe: 11110, se: 182762, seMoe: 6955, seAgg: 8270953700, seAggMoe: 816179650, wage: 1321277, wageMoe: 15060, wageAgg: 122079487400, wageAggMoe: 2311738554, workers: 2085590, workersMoe: 18019, wf: 1039504, wfMoe: 12646, inc: 79084, incMoe: 5364, uninc: 123465, unincMoe: 6469, seFemale: 80878, seFemaleMoe: 5692 },
  { fips: "23", abbr: "ME", hh: 620759, hhMoe: 6210, se: 82258, seMoe: 4778, seAgg: 3949181200, seAggMoe: 528232499, wage: 431870, wageMoe: 7052, wageAgg: 46348906700, wageAggMoe: 1292127147, workers: 710896, workersMoe: 8104, wf: 352854, wfMoe: 4949, inc: 34069, incMoe: 3061, uninc: 53963, unincMoe: 3771, seFemale: 37956, seFemaleMoe: 3206 },
  { fips: "24", abbr: "MD", hh: 2428843, hhMoe: 9986, se: 265574, seMoe: 11645, seAgg: 12611867600, seAggMoe: 939167450, wage: 1882881, wageMoe: 14078, wageAgg: 263830000900, wageAggMoe: 3679470197, workers: 3209975, workersMoe: 20866, wf: 1612686, wfMoe: 14738, inc: 105078, incMoe: 6519, uninc: 169132, unincMoe: 9628, seFemale: 114722, seFemaleMoe: 7295 },
  { fips: "25", abbr: "MA", hh: 2827794, hhMoe: 12938, se: 309178, seMoe: 10446, seAgg: 15968922100, seAggMoe: 1151945926, wage: 2141619, wageMoe: 13764, wageAgg: 323898349100, wageAggMoe: 4535217870, workers: 3766496, workersMoe: 23728, wf: 1877215, wfMoe: 16188, inc: 120521, incMoe: 7720, uninc: 197944, unincMoe: 9298, seFemale: 135056, seFemaleMoe: 7526 },
  { fips: "26", abbr: "MI", hh: 4150990, hhMoe: 12914, se: 401323, seMoe: 9494, seAgg: 17630756200, seAggMoe: 1222750784, wage: 2945767, wageMoe: 18564, wageAgg: 307861171500, wageAggMoe: 3572879777, workers: 4846668, workersMoe: 24146, wf: 2337162, wfMoe: 15715, inc: 174868, incMoe: 8984, uninc: 259473, unincMoe: 9990, seFemale: 169788, seFemaleMoe: 7417 },
  { fips: "27", abbr: "MN", hh: 2391870, hhMoe: 8635, se: 266917, seMoe: 7894, seAgg: 12186269300, seAggMoe: 739078650, wage: 1816888, wageMoe: 12802, wageAgg: 219537964000, wageAggMoe: 2959999446, workers: 3048112, workersMoe: 15375, wf: 1483630, wfMoe: 11999, inc: 123602, incMoe: 6269, uninc: 154102, unincMoe: 5979, seFemale: 106346, seFemaleMoe: 5607 },
  { fips: "28", abbr: "MS", hh: 1197317, hhMoe: 8286, se: 116086, seMoe: 6353, seAgg: 4387010500, seAggMoe: 479013762, wage: 835717, wageMoe: 10497, wageAgg: 68275461300, wageAggMoe: 1622652707, workers: 1301789, workersMoe: 14536, wf: 646504, wfMoe: 9870, inc: 49986, incMoe: 4831, uninc: 80139, unincMoe: 6121, seFemale: 47760, seFemaleMoe: 4733 },
  { fips: "29", abbr: "MO", hh: 2604619, hhMoe: 11993, se: 273784, seMoe: 10016, seAgg: 12477626400, seAggMoe: 903710854, wage: 1895448, wageMoe: 14095, wageAgg: 192853736900, wageAggMoe: 3040738727, workers: 3069505, workersMoe: 16951, wf: 1503350, wfMoe: 13829, inc: 103619, incMoe: 6083, uninc: 170380, unincMoe: 7476, seFemale: 106209, seFemaleMoe: 6327 },
  { fips: "30", abbr: "MT", hh: 481275, hhMoe: 4632, se: 75404, seMoe: 4701, seAgg: 3733364400, seAggMoe: 670637725, wage: 342764, wageMoe: 5415, wageAgg: 32581966800, wageAggMoe: 959727875, workers: 566947, workersMoe: 7023, wf: 273088, wfMoe: 4987, inc: 33888, incMoe: 3188, uninc: 51356, unincMoe: 4008, seFemale: 34895, seFemaleMoe: 3244 },
  { fips: "31", abbr: "NE", hh: 827249, hhMoe: 4929, se: 102514, seMoe: 4664, seAgg: 4862073400, seAggMoe: 626078139, wage: 635913, wageMoe: 7121, wageAgg: 66022862100, wageAggMoe: 1352207618, workers: 1056079, workersMoe: 8695, wf: 502236, wfMoe: 6604, inc: 46947, incMoe: 3626, uninc: 63370, unincMoe: 3767, seFemale: 41279, seFemaleMoe: 3470 },
  { fips: "32", abbr: "NV", hh: 1245703, hhMoe: 8030, se: 136771, seMoe: 8538, seAgg: 7834357400, seAggMoe: 1003806181, wage: 938966, wageMoe: 9684, wageAgg: 102278464800, wageAggMoe: 2601379332, workers: 1625446, workersMoe: 17388, wf: 767663, wfMoe: 12222, inc: 68638, incMoe: 6303, uninc: 89900, unincMoe: 7229, seFemale: 69708, seFemaleMoe: 6319 },
  { fips: "33", abbr: "NH", hh: 574089, hhMoe: 5217, se: 70843, seMoe: 5021, seAgg: 4037001200, seAggMoe: 502041658, wage: 426079, wageMoe: 6444, wageAgg: 57301483400, wageAggMoe: 1536628502, workers: 767357, workersMoe: 8745, wf: 371356, wfMoe: 5948, inc: 21872, incMoe: 2759, uninc: 47110, unincMoe: 3675, seFemale: 28898, seFemaleMoe: 2922 },
  { fips: "34", abbr: "NJ", hh: 3565008, hhMoe: 10954, se: 375647, seMoe: 11303, seAgg: 19901778600, seAggMoe: 1190124930, wage: 2769732, wageMoe: 15510, wageAgg: 415915068000, wageAggMoe: 5216323362, workers: 4938043, workersMoe: 24479, wf: 2407486, wfMoe: 21092, inc: 184462, incMoe: 8589, uninc: 253927, unincMoe: 10785, seFemale: 171603, seFemaleMoe: 9289 },
  { fips: "35", abbr: "NM", hh: 863010, hhMoe: 7332, se: 79636, seMoe: 5413, seAgg: 3093153700, seAggMoe: 410554988, wage: 596284, wageMoe: 8238, wageAgg: 56306920200, wageAggMoe: 1421513002, workers: 960921, workersMoe: 11488, wf: 466757, wfMoe: 8215, inc: 35914, incMoe: 3739, uninc: 53996, unincMoe: 4416, seFemale: 40269, seFemaleMoe: 3754 },
  { fips: "36", abbr: "NY", hh: 7867612, hhMoe: 17339, se: 811588, seMoe: 18242, seAgg: 41888938000, seAggMoe: 1979039331, wage: 5803438, wageMoe: 30621, wageAgg: 798568185100, wageAggMoe: 8658791924, workers: 9830756, workersMoe: 43399, wf: 4871047, wfMoe: 31309, inc: 409671, incMoe: 13232, uninc: 526441, unincMoe: 14315, seFemale: 368269, seFemaleMoe: 12826 },
  { fips: "37", abbr: "NC", hh: 4539531, hhMoe: 17005, se: 458629, seMoe: 13320, seAgg: 19109923300, seAggMoe: 1202887038, wage: 3358692, wageMoe: 23036, wageAgg: 355645054700, wageAggMoe: 4297560511, workers: 5408731, workersMoe: 28142, wf: 2661950, wfMoe: 18775, inc: 219953, incMoe: 10261, uninc: 299744, unincMoe: 11532, seFemale: 208052, seFemaleMoe: 9969 },
  { fips: "38", abbr: "ND", hh: 352013, hhMoe: 3073, se: 44922, seMoe: 3573, seAgg: 2315943300, seAggMoe: 280103116, wage: 271754, wageMoe: 5349, wageAgg: 27415973800, wageAggMoe: 1101740634, workers: 424036, workersMoe: 6301, wf: 196294, wfMoe: 3623, inc: 13848, incMoe: 1975, uninc: 28060, unincMoe: 2454, seFemale: 13783, seFemaleMoe: 1627 },
  { fips: "39", abbr: "OH", hh: 4957873, hhMoe: 12038, se: 460803, seMoe: 12393, seAgg: 20434941200, seAggMoe: 1510977007, wage: 3602989, wageMoe: 16978, wageAgg: 367541097900, wageAggMoe: 3607479266, workers: 5844610, workersMoe: 25770, wf: 2831500, wfMoe: 21180, inc: 180049, incMoe: 7771, uninc: 294796, unincMoe: 10481, seFemale: 179437, seFemaleMoe: 7464 },
  { fips: "40", abbr: "OK", hh: 1616177, hhMoe: 6690, se: 172917, seMoe: 6192, seAgg: 6956508800, seAggMoe: 591260521, wage: 1175489, wageMoe: 9118, wageAgg: 108057898300, wageAggMoe: 1719596012, workers: 1896602, workersMoe: 13213, wf: 899641, wfMoe: 9039, inc: 70982, incMoe: 4349, uninc: 116000, unincMoe: 5338, seFemale: 73739, seFemaleMoe: 4209 },
  { fips: "41", abbr: "OR", hh: 1745361, hhMoe: 9072, se: 208080, seMoe: 8671, seAgg: 8395775800, seAggMoe: 676660834, wage: 1251227, wageMoe: 12509, wageAgg: 141900774600, wageAggMoe: 2397711825, workers: 2087908, workersMoe: 16982, wf: 1012873, wfMoe: 10722, inc: 86200, incMoe: 5691, uninc: 136786, unincMoe: 6947, seFemale: 100510, seFemaleMoe: 5697 },
  { fips: "42", abbr: "PA", hh: 5405581, hhMoe: 14199, se: 504063, seMoe: 13501, seAgg: 22597279500, seAggMoe: 1223937559, wage: 3921423, wageMoe: 21680, wageAgg: 441455751300, wageAggMoe: 3950063856, workers: 6449699, workersMoe: 34874, wf: 3148119, wfMoe: 22237, inc: 201984, incMoe: 8981, uninc: 313005, unincMoe: 10931, seFemale: 192208, seFemaleMoe: 9068 },
  { fips: "44", abbr: "RI", hh: 450467, hhMoe: 4304, se: 42750, seMoe: 4243, seAgg: 1669216400, seAggMoe: 376736509, wage: 327176, wageMoe: 6005, wageAgg: 41837431700, wageAggMoe: 1934085999, workers: 576818, workersMoe: 9230, wf: 283774, wfMoe: 5924, inc: 18615, incMoe: 2989, uninc: 28616, unincMoe: 3991, seFemale: 20072, seFemaleMoe: 2973 },
  { fips: "45", abbr: "SC", hh: 2296350, hhMoe: 12026, se: 236776, seMoe: 8667, seAgg: 11049193000, seAggMoe: 960286608, wage: 1638505, wageMoe: 13691, wageAgg: 160265908000, wageAggMoe: 2936507376, workers: 2608349, workersMoe: 21982, wf: 1293480, wfMoe: 16128, inc: 111630, incMoe: 7456, uninc: 158780, unincMoe: 8352, seFemale: 110842, seFemaleMoe: 7289 },
  { fips: "46", abbr: "SD", hh: 387580, hhMoe: 3932, se: 55396, seMoe: 3785, seAgg: 2710840700, seAggMoe: 311908200, wage: 294787, wageMoe: 4661, wageAgg: 28285236700, wageAggMoe: 1062423231, workers: 479777, workersMoe: 6576, wf: 227168, wfMoe: 4438, inc: 21534, incMoe: 2432, uninc: 36559, unincMoe: 3165, seFemale: 18832, seFemaleMoe: 2395 },
  { fips: "47", abbr: "TN", hh: 2954096, hhMoe: 11880, se: 337437, seMoe: 12455, seAgg: 18970324800, seAggMoe: 1855758626, wage: 2169548, wageMoe: 16800, wageAgg: 222917589200, wageAggMoe: 3133459599, workers: 3556299, workersMoe: 23584, wf: 1718876, wfMoe: 13637, inc: 106543, incMoe: 6978, uninc: 247110, unincMoe: 11197, seFemale: 137404, seFemaleMoe: 8168 },
  { fips: "48", abbr: "TX", hh: 11607274, hhMoe: 26154, se: 1415995, seMoe: 26613, seAgg: 71798234000, seAggMoe: 3039356081, wage: 9173529, wageMoe: 34856, wageAgg: 1024307745900, wageAggMoe: 7378585008, workers: 15443066, workersMoe: 50347, wf: 7264120, wfMoe: 34421, inc: 555555, incMoe: 19213, uninc: 1005930, unincMoe: 23715, seFemale: 616882, seFemaleMoe: 17542 },
  { fips: "49", abbr: "UT", hh: 1208124, hhMoe: 6720, se: 156705, seMoe: 6498, seAgg: 7203850200, seAggMoe: 717104145, wage: 984733, wageMoe: 9078, wageAgg: 119619575300, wageAggMoe: 2108225757, workers: 1814718, workersMoe: 14117, wf: 824197, wfMoe: 10820, inc: 83398, incMoe: 5243, uninc: 86724, unincMoe: 5780, seFemale: 63850, seFemaleMoe: 4717 },
  { fips: "50", abbr: "VT", hh: 285750, hhMoe: 2748, se: 46384, seMoe: 3532, seAgg: 1716350100, seAggMoe: 228683171, wage: 202706, wageMoe: 3961, wageAgg: 22724485500, wageAggMoe: 1106237231, workers: 342604, workersMoe: 5783, wf: 169636, wfMoe: 4352, inc: 17570, incMoe: 1940, uninc: 30177, unincMoe: 2954, seFemale: 18797, seFemaleMoe: 2279 },
  { fips: "51", abbr: "VA", hh: 3480219, hhMoe: 10199, se: 356274, seMoe: 10874, seAgg: 16865594900, seAggMoe: 1169611232, wage: 2659365, wageMoe: 15873, wageAgg: 349714726300, wageAggMoe: 4554500896, workers: 4433379, workersMoe: 19508, wf: 2186136, wfMoe: 15931, inc: 168250, incMoe: 7359, uninc: 209665, unincMoe: 8251, seFemale: 160838, seFemaleMoe: 6784 },
  { fips: "53", abbr: "WA", hh: 3180129, hhMoe: 10710, se: 339164, seMoe: 9937, seAgg: 16094393800, seAggMoe: 1037390970, wage: 2404833, wageMoe: 16094, wageAgg: 339900430800, wageAggMoe: 4132516113, workers: 3949503, workersMoe: 21185, wf: 1868555, wfMoe: 16537, inc: 159266, incMoe: 7777, uninc: 210639, unincMoe: 8651, seFemale: 161637, seFemaleMoe: 7040 },
  { fips: "54", abbr: "WV", hh: 747801, hhMoe: 6569, se: 53734, seMoe: 4338, seAgg: 1856157900, seAggMoe: 215411317, wage: 488448, wageMoe: 8909, wageAgg: 43145957400, wageAggMoe: 1220971729, workers: 748955, workersMoe: 10079, wf: 359683, wfMoe: 7248, inc: 23082, incMoe: 3018, uninc: 34610, unincMoe: 3910, seFemale: 23169, seFemaleMoe: 3308 },
  { fips: "55", abbr: "WI", hh: 2567583, hhMoe: 9080, se: 247010, seMoe: 6409, seAgg: 10586332700, seAggMoe: 642688236, wage: 1860810, wageMoe: 11344, wageAgg: 195697248700, wageAggMoe: 2474129709, workers: 3065849, workersMoe: 16027, wf: 1478980, wfMoe: 11237, inc: 102222, incMoe: 5271, uninc: 156316, unincMoe: 5606, seFemale: 101768, seFemaleMoe: 5260 },
  { fips: "56", abbr: "WY", hh: 256608, hhMoe: 3485, se: 33905, seMoe: 3578, seAgg: 1480525000, seAggMoe: 317761627, wage: 191685, wageMoe: 4689, wageAgg: 18953960700, wageAggMoe: 1010144980, workers: 285211, workersMoe: 5939, wf: 135095, wfMoe: 4104, inc: 16387, incMoe: 2645, uninc: 19462, unincMoe: 2774, seFemale: 17405, seFemaleMoe: 2920 },
];

export interface SelfEmploymentResult extends SelfEmploymentRow {
  name: string;
  /** 1 = the largest share of workers who are self-employed */
  rank: number;
  /** B19013 median household income, dollars */
  income: number;
  /** self-employed workers, incorporated plus unincorporated */
  seWorkers: number;
  seWorkersMoe: number;
  /** self-employed workers as a share of all employed workers */
  seWorkerShare: Share;
  /** workers self-employed in an incorporated business as a share of the self-employed */
  incShareOfSe: Share;
  /** workers self-employed in an unincorporated business as a share of the self-employed */
  unincShareOfSe: Share;
  /** women as a share of the self-employed */
  femaleShareOfSe: Share;
  /** women as a share of all employed workers */
  femaleShareOfWorkers: Share;
  /** households with self-employment income as a share of all households */
  hhShare: Share;
  /** mean self-employment income of the households that report it, dollars a year */
  seMean: Ratio;
  /** mean wage and salary income of the households that report it, dollars a year */
  wageMean: Ratio;
  /** self-employment income as a share of self-employment plus wage and salary income, all households */
  earnShare: Share;
  /** self-employment tax on the mean self-employment income under the 2026 rules, dollars */
  seTaxOnMean: number;
}

function compute(row: SelfEmploymentRow, name: string, income: number): Omit<SelfEmploymentResult, "rank"> {
  const seWorkers = row.inc + row.uninc;
  const seWorkersMoe = rss([row.incMoe, row.unincMoe]);
  const earnTotal = row.seAgg + row.wageAgg;
  const earnTotalMoe = rss([row.seAggMoe, row.wageAggMoe]);
  const seMean = ratio(row.seAgg, row.seAggMoe, row.se, row.seMoe);
  return {
    ...row,
    name,
    income,
    seWorkers,
    seWorkersMoe,
    seWorkerShare: share(seWorkers, seWorkersMoe, row.workers, row.workersMoe),
    incShareOfSe: share(row.inc, row.incMoe, seWorkers, seWorkersMoe),
    unincShareOfSe: share(row.uninc, row.unincMoe, seWorkers, seWorkersMoe),
    femaleShareOfSe: share(row.seFemale, row.seFemaleMoe, seWorkers, seWorkersMoe),
    femaleShareOfWorkers: share(row.wf, row.wfMoe, row.workers, row.workersMoe),
    hhShare: share(row.se, row.seMoe, row.hh, row.hhMoe),
    seMean,
    wageMean: ratio(row.wageAgg, row.wageAggMoe, row.wage, row.wageMoe),
    earnShare: share(row.seAgg, row.seAggMoe, earnTotal, earnTotalMoe),
    seTaxOnMean: selfEmploymentTax(seMean.value).total,
  };
}

/** All 50 states and DC, ranked from the largest to the smallest share of workers who are self-employed. */
export const STATE_RESULTS: SelfEmploymentResult[] = SE_ROWS.map((row) => {
  const base = STATE_ROWS.find((s) => s.fips === row.fips);
  if (!base) throw new Error(`Missing income input for FIPS ${row.fips}`);
  if (base.abbr !== row.abbr) throw new Error(`State mismatch for FIPS ${row.fips}`);
  return compute(row, base.name, base.income);
})
  .sort((a, b) => b.seWorkerShare.pct - a.seWorkerShare.pct)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<SelfEmploymentResult, "rank"> = compute(US_SE_ROW, "United States", US_ROW.income);

export function getStateResult(abbr: string): SelfEmploymentResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_largest_share_of_workers_self_employed",
  "state",
  "abbr",
  "fips",
  "employed_workers_16plus",
  "self_employed_workers",
  "self_employed_workers_pct_of_workers",
  "self_employed_workers_pct_of_workers_moe90_pts",
  "self_employed_incorporated_workers",
  "self_employed_unincorporated_workers",
  "unincorporated_pct_of_self_employed",
  "unincorporated_pct_of_self_employed_moe90_pts",
  "women_self_employed_workers",
  "women_pct_of_self_employed",
  "women_pct_of_self_employed_moe90_pts",
  "women_pct_of_all_workers",
  "households",
  "households_with_self_employment_income",
  "households_with_self_employment_income_pct",
  "households_with_self_employment_income_moe90_pts",
  "self_employment_income_aggregate_usd",
  "self_employment_income_mean_per_household_with_it_usd",
  "self_employment_income_mean_per_household_with_it_moe90_usd",
  "households_with_wage_income",
  "wage_income_mean_per_household_with_it_usd",
  "self_employment_pct_of_self_employment_plus_wage_income",
  "self_employment_pct_of_self_employment_plus_wage_income_moe90_pts",
  "se_tax_on_mean_self_employment_income_2026_rules_usd",
  "median_household_income_usd",
] as const;

function csvLine(r: SelfEmploymentResult | (Omit<SelfEmploymentResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.workers,
    r.seWorkers,
    round(r.seWorkerShare.pct, 2),
    round(r.seWorkerShare.moe, 2),
    r.inc,
    r.uninc,
    round(r.unincShareOfSe.pct, 2),
    round(r.unincShareOfSe.moe, 2),
    r.seFemale,
    round(r.femaleShareOfSe.pct, 2),
    round(r.femaleShareOfSe.moe, 2),
    round(r.femaleShareOfWorkers.pct, 2),
    r.hh,
    r.se,
    round(r.hhShare.pct, 2),
    round(r.hhShare.moe, 2),
    r.seAgg,
    round(r.seMean.value),
    round(r.seMean.moe),
    r.wage,
    round(r.wageMean.value),
    round(r.earnShare.pct, 2),
    round(r.earnShare.moe, 2),
    round(r.seTaxOnMean),
    r.income,
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [CSV_HEADER.join(","), ...STATE_RESULTS.map(csvLine), csvLine(US_RESULT)].join("\n") + "\n";
}
