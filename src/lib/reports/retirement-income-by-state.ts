/**
 * Data and calculations for the "Social Security and Retirement Income by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * New inputs (ACS 2025 1-year) were read on 2026-11-14 from the Census Bureau's table-based ACS
 * Summary File (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData,
 * files acsdt1y2025-b19055, -b19059, -b19065, -b19069, -b19049 and -b11007; b19013 and b25003 in the
 * same folder were used only for the tie-outs below). The Census API requires a key and was not used.
 *
 * What is stored: for every place, the households total, the households with Social Security
 * income (B19055_002) and with retirement, survivor, or disability income (B19059_002) and the
 * margins of error of both counts, the aggregate dollars of each income type (B19065_001 and
 * B19069_001) with their margins, the households with one or more people 65 and over
 * (B11007_002), and the median household income of householders 65 and over (B19049_005), each
 * with its published margin of error. Means are aggregate dollars divided by the households that
 * report the income; a margin of error for a sum is the square root of the sum of the squared
 * published margins, and a margin of error for a share or a ratio follows the formulas in the ACS
 * General Handbook, chapter 8.
 * Checks: all 50 states, DC, and the U.S. row were present (Puerto Rico was dropped, as in the
 * companion reports); in all 52 rows households with plus without Social Security income equal
 * the household total, households with plus without retirement income equal the household total,
 * households with plus without a member 65 or over equal the household total, the household
 * total equals B25003_001 (U.S. 134,063,422, the same household count used in the car ownership
 * report), the all-ages median household income in B19049_001 equals B19013_001, and the 51 state
 * and DC rows add up to the U.S. row for households, households with Social Security income,
 * aggregate Social Security dollars, and aggregate retirement dollars (the dollar sums differ by
 * at most $300 from the U.S. row because the Census Bureau rounds each published aggregate to $100).
 * No cell is missing or a Census placeholder.
 *
 * Median household income (B19013) is NOT stored again here: it comes from the mortgage
 * affordability report's STATE_ROWS, so all the reports use the same income figures. The guard
 * below fails the build if that report moves to a different ACS year before this one does.
 *
 * The Social Security Administration benchmark is quoted from its Monthly Statistical Snapshot
 * for October 2026 (released November 2026) and is used only to put the survey numbers in context.
 */

import { REPORT as AFFORDABILITY_REPORT, STATE_ROWS, US_ROW, pct1, usd0 } from "./mortgage-affordability-by-state";
import { correlation, count0, millions } from "./car-ownership-by-state";

export { correlation, count0, millions, pct1, usd0 };

export const REPORT = {
  slug: "retirement-income-by-state",
  path: "/reports/retirement-income-by-state",
  csvPath: "/reports/retirement-income-by-state/data.csv",
  datePublished: "2026-11-14",
  dateModified: "2026-11-14",
  /** ACS survey year of every income and household figure */
  acsYear: 2025,
  /** Withdrawal rate used to express a yearly income as the savings that would produce it */
  withdrawalRatePct: 4,
} as const;

if (AFFORDABILITY_REPORT.acsYear !== REPORT.acsYear) {
  throw new Error(
    `retirement-income-by-state uses ACS ${REPORT.acsYear} but mortgage-affordability-by-state now uses ACS ` +
      `${AFFORDABILITY_REPORT.acsYear}. Refresh the income rows in ` +
      `src/lib/reports/retirement-income-by-state.ts (tables B19055, B19059, B19065, B19069, B19049, B11007) in the same change.`,
  );
}

/**
 * Social Security Administration, Monthly Statistical Snapshot, October 2026 (released November 2026),
 * table 2: Social Security (OASDI) benefits in current payment status. Dollars are per month.
 */
export const SSA = {
  month: "October 2026",
  beneficiariesThousands: 71_758,
  totalMonthlyBenefitsMillions: 139_658,
  averageMonthlyBenefit: 1_946.23,
  retiredWorkersThousands: 55_213,
  retiredWorkerAverageMonthly: 2_092.17,
} as const;

/** Total yearly benefits implied by the October 2026 monthly total, in dollars */
export const SSA_ANNUALIZED = SSA.totalMonthlyBenefitsMillions * 12 * 1_000_000;

export const REPORT_SOURCES = {
  acsSocialSecurity: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19055 (Social Security income for households)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19055",
  },
  acsSocialSecurityAggregate: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19065 (aggregate Social Security income for households)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19065",
  },
  acsRetirement: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19059 (retirement income for households)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19059",
  },
  acsRetirementAggregate: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19069 (aggregate retirement income for households)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19069",
  },
  acsMedianByAge: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19049 (median household income by age of householder)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19049",
  },
  acsHouseholds65: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B11007 (households by presence of people 65 years and over)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B11007",
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
    label: "Census Bureau, 2025 ACS Subject Definitions (Income in the Past 12 Months)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
  ssaSnapshot: {
    label: "Social Security Administration, Monthly Statistical Snapshot, October 2026 (released November 2026)",
    href: "https://www.ssa.gov/policy/docs/quickfacts/stat_snapshot/",
  },
} as const;

export interface IncomeSourceRow {
  fips: string;
  abbr: string;
  /** B19055_001: households */
  hh: number;
  hhMoe: number;
  /** B19055_002: households with Social Security income */
  ss: number;
  ssMoe: number;
  /** B19065_001: aggregate Social Security income of households, dollars */
  ssAgg: number;
  ssAggMoe: number;
  /** B19059_002: households with retirement, survivor, or disability income */
  ret: number;
  retMoe: number;
  /** B19069_001: aggregate retirement, survivor, and disability income of households, dollars */
  retAgg: number;
  retAggMoe: number;
  /** B11007_002: households with one or more people 65 years and over */
  hh65: number;
  hh65Moe: number;
  /** B19049_005: median household income of householders 65 years and over, dollars */
  med65: number;
  med65Moe: number;
}

export const US_INCOME_ROW: IncomeSourceRow =
{ fips: "00", abbr: "US", hh: 134063422, hhMoe: 130863, ss: 44055028, ssMoe: 87170, ssAgg: 1148942960600, ssAggMoe: 2717385607, ret: 33743125, retMoe: 144258, retAgg: 1132844317800, retAggMoe: 7113152479, hh65: 45887587, hh65Moe: 73665, med65: 61989, med65Moe: 235 };

const INCOME_ROWS: IncomeSourceRow[] = [
  { fips: "01", abbr: "AL", hh: 2070835, hhMoe: 13313, ss: 757233, ssMoe: 9714, ssAgg: 18743820700, ssAggMoe: 253339354, ret: 545410, retMoe: 10607, retAgg: 16399449300, retAggMoe: 601964376, hh65: 725533, hh65Moe: 7785, med65: 50908, med65Moe: 1462 },
  { fips: "02", abbr: "AK", hh: 278920, hhMoe: 3561, ss: 76021, ssMoe: 2888, ssAgg: 2008124000, ssAggMoe: 102178206, ret: 72987, retMoe: 3408, retAgg: 3262804200, retAggMoe: 331378915, hh65: 81398, hh65Moe: 2123, med65: 72408, med65Moe: 4835 },
  { fips: "04", abbr: "AZ", hh: 3040935, hhMoe: 13096, ss: 1071985, ssMoe: 10772, ssAgg: 29729822400, ssAggMoe: 365354931, ret: 829867, retMoe: 14848, retAgg: 27712950700, retAggMoe: 820096209, hh65: 1104890, hh65Moe: 8262, med65: 64644, med65Moe: 1454 },
  { fips: "05", abbr: "AR", hh: 1277805, hhMoe: 8667, ss: 466007, ssMoe: 7957, ssAgg: 11427636700, ssAggMoe: 197533397, ret: 314772, retMoe: 7939, retAgg: 8814516000, retAggMoe: 548659799, hh65: 431818, hh65Moe: 5469, med65: 50183, med65Moe: 1534 },
  { fips: "06", abbr: "CA", hh: 13898622, hhMoe: 27332, ss: 4246067, ssMoe: 21501, ssAgg: 107845673400, ssAggMoe: 754460993, ret: 3192627, retMoe: 28481, retAgg: 127740413700, retAggMoe: 1980437555, hh65: 4822026, hh65Moe: 19520, med65: 75584, med65Moe: 832 },
  { fips: "08", abbr: "CO", hh: 2483142, hhMoe: 10139, ss: 670082, ssMoe: 9665, ssAgg: 18099828700, ssAggMoe: 263249778, ret: 570241, retMoe: 9387, retAgg: 21318101200, retAggMoe: 496811320, hh65: 726575, hh65Moe: 6759, med65: 71449, med65Moe: 1613 },
  { fips: "09", abbr: "CT", hh: 1456915, hhMoe: 7398, ss: 500722, ssMoe: 8136, ssAgg: 13991588100, ssAggMoe: 235698196, ret: 393877, retMoe: 8286, retAgg: 14418682200, retAggMoe: 583061920, hh65: 532014, hh65Moe: 5985, med65: 75184, med65Moe: 2226 },
  { fips: "10", abbr: "DE", hh: 422123, hhMoe: 4587, ss: 166879, ssMoe: 3842, ssAgg: 4937990400, ssAggMoe: 117432965, ret: 146386, retMoe: 5700, retAgg: 5084393100, retAggMoe: 333967127, hh65: 173327, hh65Moe: 3548, med65: 71156, med65Moe: 2795 },
  { fips: "11", abbr: "DC", hh: 333195, hhMoe: 4240, ss: 62515, ssMoe: 3101, ssAgg: 1426928800, ssAggMoe: 92423470, ret: 58115, retMoe: 4323, retAgg: 3015182300, retAggMoe: 352801808, hh65: 73931, hh65Moe: 2201, med65: 64957, med65Moe: 8806 },
  { fips: "12", abbr: "FL", hh: 9326796, hhMoe: 31150, ss: 3533647, ssMoe: 22029, ssAgg: 92803354000, ssAggMoe: 741950539, ret: 2418236, retMoe: 27299, retAgg: 87507237600, retAggMoe: 1648708142, hh65: 3731763, hh65Moe: 16953, med65: 61637, med65Moe: 694 },
  { fips: "13", abbr: "GA", hh: 4269857, hhMoe: 14138, ss: 1327162, ssMoe: 12529, ssAgg: 33491767600, ssAggMoe: 313613697, ret: 981512, retMoe: 16121, retAgg: 31641822800, retAggMoe: 830856594, hh65: 1353445, hh65Moe: 11479, med65: 59699, med65Moe: 1585 },
  { fips: "15", abbr: "HI", hh: 500883, hhMoe: 5945, ss: 204598, ssMoe: 4729, ssAgg: 5681321300, ssAggMoe: 152453965, ret: 165255, retMoe: 4754, retAgg: 6516139200, retAggMoe: 545027295, hh65: 220015, hh65Moe: 3205, med65: 91116, med65Moe: 3604 },
  { fips: "16", abbr: "ID", hh: 765200, hhMoe: 5511, ss: 259637, ssMoe: 3888, ssAgg: 7062115200, ssAggMoe: 137646764, ret: 200300, retMoe: 6217, retAgg: 6553632100, retAggMoe: 374760087, hh65: 258509, hh65Moe: 3571, med65: 60574, med65Moe: 1917 },
  { fips: "17", abbr: "IL", hh: 5134283, hhMoe: 13761, ss: 1607737, ssMoe: 13731, ssAgg: 41385174100, ssAggMoe: 428166725, ret: 1285989, retMoe: 15841, retAgg: 46592597200, retAggMoe: 1404658613, hh65: 1711979, hh65Moe: 9975, med65: 62826, med65Moe: 1178 },
  { fips: "18", abbr: "IN", hh: 2816686, hhMoe: 9835, ss: 930809, ssMoe: 9381, ssAgg: 24690084100, ssAggMoe: 269547798, ret: 732053, retMoe: 9978, retAgg: 17782703800, retAggMoe: 637671475, hh65: 917006, hh65Moe: 8168, med65: 53130, med65Moe: 1171 },
  { fips: "19", abbr: "IA", hh: 1355504, hhMoe: 6652, ss: 444688, ssMoe: 6127, ssAgg: 11678941800, ssAggMoe: 183597049, ret: 354151, retMoe: 7050, retAgg: 9569100100, retAggMoe: 405667719, hh65: 451252, hh65Moe: 4535, med65: 56864, med65Moe: 1443 },
  { fips: "20", abbr: "KS", hh: 1205638, hhMoe: 6563, ss: 390427, ssMoe: 6530, ssAgg: 10709947400, ssAggMoe: 183345361, ret: 305109, retMoe: 9100, retAgg: 8699452400, retAggMoe: 443434010, hh65: 396484, hh65Moe: 5057, med65: 59917, med65Moe: 1707 },
  { fips: "21", abbr: "KY", hh: 1885581, hhMoe: 9687, ss: 667465, ssMoe: 9141, ssAgg: 16073194100, ssAggMoe: 256199493, ret: 507149, retMoe: 10947, retAgg: 14034779400, retAggMoe: 527216340, hh65: 636117, hh65Moe: 6497, med65: 48542, med65Moe: 1510 },
  { fips: "22", abbr: "LA", hh: 1855847, hhMoe: 11110, ss: 637925, ssMoe: 10100, ssAgg: 14494962600, ssAggMoe: 269522796, ret: 421948, retMoe: 11862, retAgg: 12638752000, retAggMoe: 554424660, hh65: 638504, hh65Moe: 6261, med65: 47391, med65Moe: 1397 },
  { fips: "23", abbr: "ME", hh: 620759, hhMoe: 6210, ss: 242534, ssMoe: 4250, ssAgg: 6336367400, ssAggMoe: 129671053, ret: 178086, retMoe: 5733, retAgg: 5603468800, retAggMoe: 280755446, hh65: 242122, hh65Moe: 3879, med65: 60410, med65Moe: 2714 },
  { fips: "24", abbr: "MD", hh: 2428843, hhMoe: 9986, ss: 736823, ssMoe: 9578, ssAgg: 19605794200, ssAggMoe: 300827667, ret: 659955, retMoe: 13367, retAgg: 27963875800, retAggMoe: 858434853, hh65: 830917, hh65Moe: 6572, med65: 77599, med65Moe: 2174 },
  { fips: "25", abbr: "MA", hh: 2827794, hhMoe: 12938, ss: 912088, ssMoe: 12209, ssAgg: 24751955700, ssAggMoe: 302486965, ret: 692148, retMoe: 11510, retAgg: 26834923000, retAggMoe: 1000038479, hh65: 1009600, hh65Moe: 9382, med65: 70107, med65Moe: 1799 },
  { fips: "26", abbr: "MI", hh: 4150990, hhMoe: 12914, ss: 1511355, ssMoe: 12114, ssAgg: 40756727300, ssAggMoe: 381976650, ret: 1187362, retMoe: 15380, retAgg: 34579742100, retAggMoe: 764050828, hh65: 1483652, hh65Moe: 8515, med65: 57075, med65Moe: 872 },
  { fips: "27", abbr: "MN", hh: 2391870, hhMoe: 8635, ss: 748179, ssMoe: 7455, ssAgg: 21068084700, ssAggMoe: 279844535, ret: 621705, retMoe: 8249, retAgg: 19446435200, retAggMoe: 586046331, hh65: 773789, hh65Moe: 5179, med65: 65242, med65Moe: 1300 },
  { fips: "28", abbr: "MS", hh: 1197317, hhMoe: 8286, ss: 434066, ssMoe: 9461, ssAgg: 10239720800, ssAggMoe: 222542332, ret: 288909, retMoe: 7032, retAgg: 8063552500, retAggMoe: 548294589, hh65: 422772, hh65Moe: 6056, med65: 47199, med65Moe: 1568 },
  { fips: "29", abbr: "MO", hh: 2604619, hhMoe: 11993, ss: 894133, ssMoe: 10683, ssAgg: 22606303500, ssAggMoe: 347376875, ret: 701426, retMoe: 11923, retAgg: 20259556500, retAggMoe: 696258213, hh65: 884077, hh65Moe: 7753, med65: 55661, med65Moe: 929 },
  { fips: "30", abbr: "MT", hh: 481275, hhMoe: 4632, ss: 180124, ssMoe: 3560, ssAgg: 4575276900, ssAggMoe: 128634891, ret: 122157, retMoe: 4290, retAgg: 4091586400, retAggMoe: 308592808, hh65: 178180, hh65Moe: 3328, med65: 54814, med65Moe: 3018 },
  { fips: "31", abbr: "NE", hh: 827249, hhMoe: 4929, ss: 247885, ssMoe: 4340, ssAgg: 6720452200, ssAggMoe: 158652961, ret: 186647, retMoe: 5644, retAgg: 5407584300, retAggMoe: 290408040, hh65: 259384, hh65Moe: 3431, med65: 60928, med65Moe: 2356 },
  { fips: "32", abbr: "NV", hh: 1245703, hhMoe: 8030, ss: 397735, ssMoe: 7371, ssAgg: 10092475600, ssAggMoe: 185587253, ret: 318910, retMoe: 8216, retAgg: 12066212600, retAggMoe: 664604744, hh65: 426759, hh65Moe: 5415, med65: 67916, med65Moe: 2747 },
  { fips: "33", abbr: "NH", hh: 574089, hhMoe: 5217, ss: 218181, ssMoe: 5577, ssAgg: 6446060500, ssAggMoe: 186373027, ret: 163783, retMoe: 4911, retAgg: 5451789800, retAggMoe: 263093331, hh65: 226298, hh65Moe: 4094, med65: 75611, med65Moe: 2635 },
  { fips: "34", abbr: "NJ", hh: 3565008, hhMoe: 10954, ss: 1173970, ssMoe: 13679, ssAgg: 32998288900, ssAggMoe: 434929410, ret: 911526, retMoe: 14831, retAgg: 32546368900, retAggMoe: 921414803, hh65: 1266042, hh65Moe: 8178, med65: 76677, med65Moe: 1347 },
  { fips: "35", abbr: "NM", hh: 863010, hhMoe: 7332, ss: 325173, ssMoe: 6124, ssAgg: 7999967400, ssAggMoe: 174073168, ret: 238202, retMoe: 8100, retAgg: 8426390800, retAggMoe: 443487459, hh65: 328751, hh65Moe: 5677, med65: 55419, med65Moe: 2456 },
  { fips: "36", abbr: "NY", hh: 7867612, hhMoe: 17339, ss: 2593905, ssMoe: 19872, ssAgg: 66047012900, ssAggMoe: 531776784, ret: 1988657, retMoe: 21400, retAgg: 70000848400, retAggMoe: 1706768339, hh65: 2790427, hh65Moe: 15010, med65: 63012, med65Moe: 1155 },
  { fips: "37", abbr: "NC", hh: 4539531, hhMoe: 17005, ss: 1504929, ssMoe: 14144, ssAgg: 39427539500, ssAggMoe: 442111313, ret: 1163992, retMoe: 15853, retAgg: 35230123000, retAggMoe: 1085076033, hh65: 1518105, hh65Moe: 10463, med65: 57593, med65Moe: 1025 },
  { fips: "38", abbr: "ND", hh: 352013, hhMoe: 3073, ss: 101037, ssMoe: 3355, ssAgg: 2594137200, ssAggMoe: 89105994, ret: 71511, retMoe: 3335, retAgg: 1962423900, retAggMoe: 137102613, hh65: 100283, hh65Moe: 2151, med65: 61109, med65Moe: 3527 },
  { fips: "39", abbr: "OH", hh: 4957873, hhMoe: 12038, ss: 1669586, ssMoe: 11541, ssAgg: 41153082300, ssAggMoe: 360000523, ret: 1331846, retMoe: 14449, retAgg: 39805641500, retAggMoe: 726525597, hh65: 1725610, hh65Moe: 8970, med65: 54710, med65Moe: 833 },
  { fips: "40", abbr: "OK", hh: 1616177, hhMoe: 6690, ss: 543141, ssMoe: 5332, ssAgg: 13505801300, ssAggMoe: 181409170, ret: 372699, retMoe: 7344, retAgg: 10876249500, retAggMoe: 461771912, hh65: 529006, hh65Moe: 4324, med65: 53044, med65Moe: 1250 },
  { fips: "41", abbr: "OR", hh: 1745361, hhMoe: 9072, ss: 600178, ssMoe: 8367, ssAgg: 16504926800, ssAggMoe: 287894340, ret: 456757, retMoe: 9230, retAgg: 16081623700, retAggMoe: 613602963, hh65: 616779, hh65Moe: 6847, med65: 64960, med65Moe: 1573 },
  { fips: "42", abbr: "PA", hh: 5405581, hhMoe: 14199, ss: 1977861, ssMoe: 17066, ssAgg: 53005997100, ssAggMoe: 495277565, ret: 1534660, retMoe: 15234, retAgg: 44533004200, retAggMoe: 1084642025, hh65: 1991948, hh65Moe: 10366, med65: 58611, med65Moe: 787 },
  { fips: "44", abbr: "RI", hh: 450467, hhMoe: 4304, ss: 161964, ssMoe: 5108, ssAgg: 4288671900, ssAggMoe: 169776279, ret: 116586, retMoe: 5425, retAgg: 3869356400, retAggMoe: 285347789, hh65: 166557, hh65Moe: 3145, med65: 66884, med65Moe: 4705 },
  { fips: "45", abbr: "SC", hh: 2296350, hhMoe: 12026, ss: 837312, ssMoe: 11703, ssAgg: 22308557500, ssAggMoe: 368434743, ret: 658596, retMoe: 14150, retAgg: 20565257800, retAggMoe: 913375897, hh65: 830603, hh65Moe: 7137, med65: 57720, med65Moe: 1152 },
  { fips: "46", abbr: "SD", hh: 387580, hhMoe: 3932, ss: 121769, ssMoe: 3503, ssAgg: 3131476900, ssAggMoe: 101545472, ret: 89646, retMoe: 4464, retAgg: 2612862100, retAggMoe: 217488295, hh65: 122973, hh65Moe: 2416, med65: 60564, med65Moe: 3388 },
  { fips: "47", abbr: "TN", hh: 2954096, hhMoe: 11880, ss: 988122, ssMoe: 11757, ssAgg: 25955843800, ssAggMoe: 413502337, ret: 720488, retMoe: 13081, retAgg: 21607587800, retAggMoe: 1062475072, hh65: 969824, hh65Moe: 8780, med65: 54442, med65Moe: 1418 },
  { fips: "48", abbr: "TX", hh: 11607274, hhMoe: 26154, ss: 3156505, ssMoe: 22950, ssAgg: 78781774900, ssAggMoe: 621497310, ret: 2347392, retMoe: 29935, retAgg: 75899533300, retAggMoe: 1577406681, hh65: 3354365, hh65Moe: 17086, med65: 61480, med65Moe: 733 },
  { fips: "49", abbr: "UT", hh: 1208124, hhMoe: 6720, ss: 299213, ssMoe: 5618, ssAgg: 8081772800, ssAggMoe: 178179621, ret: 247536, retMoe: 6092, retAgg: 7900828100, retAggMoe: 337158081, hh65: 315319, hh65Moe: 4011, med65: 69889, med65Moe: 2313 },
  { fips: "50", abbr: "VT", hh: 285750, hhMoe: 2748, ss: 106916, ssMoe: 3118, ssAgg: 2949175000, ssAggMoe: 97473673, ret: 81934, retMoe: 3091, retAgg: 2478532700, retAggMoe: 187812005, hh65: 108983, hh65Moe: 2224, med65: 62064, med65Moe: 2996 },
  { fips: "51", abbr: "VA", hh: 3480219, hhMoe: 10199, ss: 1106134, ssMoe: 11690, ssAgg: 30122527300, ssAggMoe: 323660367, ret: 991537, retMoe: 14335, retAgg: 39946062400, retAggMoe: 951780718, hh65: 1155923, hh65Moe: 9677, med65: 72907, med65Moe: 1468 },
  { fips: "53", abbr: "WA", hh: 3180129, hhMoe: 10710, ss: 961268, ssMoe: 11632, ssAgg: 26841699600, ssAggMoe: 359508907, ret: 781960, retMoe: 12009, retAgg: 28880355600, retAggMoe: 944311711, hh65: 1020582, hh65Moe: 8118, med65: 72150, med65Moe: 1618 },
  { fips: "54", abbr: "WV", hh: 747801, hhMoe: 6569, ss: 309071, ssMoe: 5449, ssAgg: 7627914900, ssAggMoe: 147285098, ret: 223019, retMoe: 5516, retAgg: 5525593300, retAggMoe: 308748401, hh65: 288133, hh65Moe: 3743, med65: 46931, med65Moe: 1979 },
  { fips: "55", abbr: "WI", hh: 2567583, hhMoe: 9080, ss: 889410, ssMoe: 9036, ssAgg: 23847241000, ssAggMoe: 247645289, ret: 724250, retMoe: 9137, retAgg: 22413769100, retAggMoe: 763780414, hh65: 877013, hh65Moe: 6290, med65: 57556, med65Moe: 955 },
  { fips: "56", abbr: "WY", hh: 256608, hhMoe: 3485, ss: 82855, ssMoe: 3683, ssAgg: 2288057700, ssAggMoe: 106783627, ret: 73259, retMoe: 3611, retAgg: 2610468900, retAggMoe: 319608638, hh65: 86225, hh65Moe: 3159, med65: 68834, med65Moe: 4669 },
];

/** A share in percent and its 90% margin of error in percentage points. */
export interface Share {
  pct: number;
  moe: number;
}

/** A ratio and its 90% margin of error, in the units of the ratio. */
export interface Ratio {
  value: number;
  moe: number;
}

const rss = (xs: number[]) => Math.sqrt(xs.reduce((s, x) => s + x * x, 0));

/**
 * Share of a group that is also part of a larger group (num is a subset of den), with the margin of
 * error for a proportion from the ACS General Handbook, chapter 8.
 */
function share(num: number, numMoe: number, den: number, denMoe: number): Share {
  const p = num / den;
  const inner = numMoe * numMoe - p * p * denMoe * denMoe;
  const moe =
    inner >= 0
      ? Math.sqrt(inner) / den
      : Math.sqrt(numMoe * numMoe + p * p * denMoe * denMoe) / den;
  return { pct: p * 100, moe: moe * 100 };
}

/** Ratio of two estimates that are not nested (ACS General Handbook, chapter 8, ratios). */
function ratio(num: number, numMoe: number, den: number, denMoe: number): Ratio {
  const r = num / den;
  return { value: r, moe: Math.sqrt(numMoe * numMoe + r * r * denMoe * denMoe) / den };
}

export interface IncomeResult extends IncomeSourceRow {
  name: string;
  /** 1 = the most Social Security plus retirement income per household */
  rank: number;
  /** B19013 median household income, all ages */
  income: number;
  /** share of all households with Social Security income */
  ssShare: Share;
  /** mean Social Security income of the households that receive it, dollars a year */
  ssMean: Ratio;
  /** share of all households with retirement, survivor, or disability income */
  retShare: Share;
  /** mean retirement income of the households that receive it, dollars a year */
  retMean: Ratio;
  /** Social Security dollars per household, counting households with none */
  ssPerHh: Ratio;
  /** retirement dollars per household, counting households with none */
  retPerHh: Ratio;
  /** Social Security plus retirement dollars per household, counting households with none */
  combinedPerHh: Ratio;
  /** share of households with a member 65 or over */
  hh65Share: Share;
}

function compute(row: IncomeSourceRow, name: string, income: number): Omit<IncomeResult, "rank"> {
  const combined = row.ssAgg + row.retAgg;
  const combinedMoe = rss([row.ssAggMoe, row.retAggMoe]);
  return {
    ...row,
    name,
    income,
    ssShare: share(row.ss, row.ssMoe, row.hh, row.hhMoe),
    ssMean: ratio(row.ssAgg, row.ssAggMoe, row.ss, row.ssMoe),
    retShare: share(row.ret, row.retMoe, row.hh, row.hhMoe),
    retMean: ratio(row.retAgg, row.retAggMoe, row.ret, row.retMoe),
    ssPerHh: ratio(row.ssAgg, row.ssAggMoe, row.hh, row.hhMoe),
    retPerHh: ratio(row.retAgg, row.retAggMoe, row.hh, row.hhMoe),
    combinedPerHh: ratio(combined, combinedMoe, row.hh, row.hhMoe),
    hh65Share: share(row.hh65, row.hh65Moe, row.hh, row.hhMoe),
  };
}

/** All 50 states and DC, ranked from the most to the least Social Security plus retirement income per household. */
export const STATE_RESULTS: IncomeResult[] = INCOME_ROWS.map((row) => {
  const base = STATE_ROWS.find((s) => s.fips === row.fips);
  if (!base) throw new Error(`Missing income input for FIPS ${row.fips}`);
  if (base.abbr !== row.abbr) throw new Error(`State mismatch for FIPS ${row.fips}`);
  return compute(row, base.name, base.income);
})
  .sort((a, b) => b.combinedPerHh.value - a.combinedPerHh.value)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<IncomeResult, "rank"> = compute(US_INCOME_ROW, "United States", US_ROW.income);

export function getStateResult(abbr: string): IncomeResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_most_social_security_plus_retirement_income_per_household",
  "state",
  "abbr",
  "fips",
  "households",
  "households_with_social_security",
  "households_with_social_security_pct",
  "households_with_social_security_moe90_pts",
  "social_security_aggregate_usd",
  "social_security_mean_per_recipient_household_usd",
  "social_security_mean_per_recipient_household_moe90_usd",
  "social_security_mean_per_recipient_household_monthly_usd",
  "households_with_retirement_income",
  "households_with_retirement_income_pct",
  "households_with_retirement_income_moe90_pts",
  "retirement_income_aggregate_usd",
  "retirement_income_mean_per_recipient_household_usd",
  "retirement_income_mean_per_recipient_household_moe90_usd",
  "social_security_plus_retirement_per_household_usd",
  "social_security_plus_retirement_per_household_moe90_usd",
  "households_with_65plus_member_pct",
  "households_with_65plus_member_moe90_pts",
  "median_income_householder_65plus_usd",
  "median_income_householder_65plus_moe90_usd",
  "median_household_income_all_ages_usd",
] as const;

function csvLine(r: IncomeResult | (Omit<IncomeResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.hh,
    r.ss,
    round(r.ssShare.pct, 2),
    round(r.ssShare.moe, 2),
    r.ssAgg,
    round(r.ssMean.value),
    round(r.ssMean.moe),
    round(r.ssMean.value / 12),
    r.ret,
    round(r.retShare.pct, 2),
    round(r.retShare.moe, 2),
    r.retAgg,
    round(r.retMean.value),
    round(r.retMean.moe),
    round(r.combinedPerHh.value),
    round(r.combinedPerHh.moe),
    round(r.hh65Share.pct, 2),
    round(r.hh65Share.moe, 2),
    r.med65,
    r.med65Moe,
    r.income,
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [CSV_HEADER.join(","), ...STATE_RESULTS.map(csvLine), csvLine(US_RESULT)].join("\n") + "\n";
}
