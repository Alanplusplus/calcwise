/**
 * Data and calculations for the "Property Tax by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * Inputs (ACS 2025 1-year) were read on 2026-11-26 from the Census Bureau's table-based ACS Summary
 * File (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData, files
 * acsdt1y2025-b25102, -b25103, -b25090; b25003 was used for the tie-out). The Census API requires a key
 * and was not used. Row labels were checked against the Census variable list
 * (api.census.gov/data/2025/acs/acs1/groups/<table>.html).
 *
 * What is stored: for every place, from B25102 (mortgage status by real estate taxes paid, owner-occupied
 * housing units) the total owner-occupied units (_001), the units with a mortgage (_002) and without one
 * (_009), and the units in each of six tax brackets for each group (_003 to _008 with a mortgage, _010 to
 * _015 without; the sixth bracket is "no real estate taxes paid"); from B25103 the median real estate
 * taxes paid for all owners (_001), owners with a mortgage (_002), and owners without one (_003); from
 * B25090 the aggregate real estate taxes paid, in dollars, for all owners (_001), owners with a mortgage
 * (_002), and owners without one (_003). Every count and median carries its published 90% margin of error.
 * The margin of a sum is the square root of the sum of the squared published margins, and the margin of a
 * share or a ratio follows the ACS General Handbook, chapter 8.
 *
 * Median home value (B25077) and median household income (B19013) are NOT stored again here: they come
 * from the mortgage affordability report's STATE_ROWS, so all the reports use the same figures. The guard
 * below fails the build if that report moves to a different ACS year before this one does.
 *
 * Checks: all 50 states, DC, and the U.S. row were present (Puerto Rico was dropped, as in the companion
 * reports). In all 52 rows the six brackets add up to each group total and the two group totals add up to
 * B25102_001; B25102_001 equals the owner-occupied count in B25003_002 (U.S. 87,511,734, the same owner
 * total used in the homeowners insurance report); the B25103_001 median equals the median property tax
 * stored in the mortgage affordability report in all 51 places (U.S. $3,344); no cell is missing, zero,
 * negative, or a Census placeholder; and the 51 state and DC rows add up exactly to the U.S. row for
 * owner-occupied units and for every bracket. Aggregate dollars add up to within $100 (the Census Bureau
 * rounds each published aggregate to $100). The guards below enforce the arithmetic checks at build time.
 *
 * The mean here is the aggregate (B25090) divided by the owners who report a tax bill, that is, all owners
 * minus the "no real estate taxes paid" bracket. The effective rate is the published median tax divided by
 * the published median home value; both are medians, so it is a ratio of two medians and not the median of
 * each home's own rate. The bill on an illustrative home applies that rate to a round home value.
 */

import { REPORT as AFFORDABILITY_REPORT, STATE_ROWS, US_ROW, pct1, usd0 } from "./mortgage-affordability-by-state";
import { ratio, rss, share, type Ratio, type Share } from "./retirement-income-by-state";
import { correlation, count0, millions } from "./car-ownership-by-state";

export { correlation, count0, millions, pct1, usd0 };
export type { Ratio, Share };

export const REPORT = {
  slug: "property-tax-by-state",
  path: "/reports/property-tax-by-state",
  csvPath: "/reports/property-tax-by-state/data.csv",
  datePublished: "2026-11-26",
  dateModified: "2026-11-26",
  /** ACS survey year of every figure */
  acsYear: 2025,
  /** Round home value used for the "bill on a typical home" column, dollars */
  illustrativeHome: 400000,
  /** Annual tax thresholds of the published brackets used for the "pays this much" shares */
  highBill: 3000,
  lowBill: 800,
} as const;

if (AFFORDABILITY_REPORT.acsYear !== REPORT.acsYear) {
  throw new Error(
    `property-tax-by-state uses ACS ${REPORT.acsYear} but mortgage-affordability-by-state now uses ACS ` +
      `${AFFORDABILITY_REPORT.acsYear}. Refresh the rows in src/lib/reports/property-tax-by-state.ts ` +
      `(tables B25102, B25103, B25090) in the same change.`,
  );
}

export const REPORT_SOURCES = {
  acsBrackets: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25102 (mortgage status by real estate taxes paid)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25102",
  },
  acsMedian: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25103 (mortgage status by median real estate taxes paid)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25103",
  },
  acsAggregate: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25090 (mortgage status by aggregate real estate taxes paid)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25090",
  },
  acsHome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25077 (median value), used for the effective rate",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25077",
  },
  acsIncome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19013 (median household income), used for the income share",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19013",
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
    label: "Census Bureau, 2025 ACS Subject Definitions (Real Estate Taxes)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
} as const;

/** The six published tax brackets, in the order they are stored. The last one is "no real estate taxes paid". */
export const BRACKET_LABELS = [
  "less than $800",
  "$800 to $1,499",
  "$1,500 to $1,999",
  "$2,000 to $2,999",
  "$3,000 or more",
  "no real estate taxes paid",
] as const;

export interface PropertyTaxRow {
  fips: string;
  abbr: string;
  /** B25102_001: owner-occupied housing units */
  owners: number;
  ownersMoe: number;
  /** B25102_002: owner-occupied units with a mortgage */
  mortTot: number;
  mortTotMoe: number;
  /** B25102_009: owner-occupied units without a mortgage */
  freeTot: number;
  freeTotMoe: number;
  /** B25102_003 to _008: units with a mortgage in each bracket */
  mortBr: number[];
  mortBrMoe: number[];
  /** B25102_010 to _015: units without a mortgage in each bracket */
  freeBr: number[];
  freeBrMoe: number[];
  /** B25103_001: median real estate taxes paid, dollars a year */
  med: number;
  medMoe: number;
  /** B25103_002: median real estate taxes paid, units with a mortgage */
  medMort: number;
  medMortMoe: number;
  /** B25103_003: median real estate taxes paid, units without a mortgage */
  medFree: number;
  medFreeMoe: number;
  /** B25090_001: aggregate real estate taxes paid by owner-occupied units, dollars */
  agg: number;
  aggMoe: number;
  /** B25090_002: aggregate, units with a mortgage */
  aggMort: number;
  aggMortMoe: number;
  /** B25090_003: aggregate, units without a mortgage */
  aggFree: number;
  aggFreeMoe: number;
}

export const US_PT_ROW: Omit<PropertyTaxRow, "fips" | "abbr"> =
{ owners: 87511734, ownersMoe: 290818, mortTot: 51628409, mortTotMoe: 174477, freeTot: 35883325, freeTotMoe: 152888, mortBr: [3353411, 5435144, 3925478, 7524609, 29407811, 1981956], mortBrMoe: [36419, 50702, 38614, 49475, 106424, 32311], freeBr: [5338943, 4713674, 2785371, 4869586, 15502609, 2673142], freeBrMoe: [46847, 37685, 34881, 40985, 80691, 30653], med: 3344, medMoe: 8, medMort: 3719, medMortMoe: 10, medFree: 2774, medFreeMoe: 10, agg: 388157609500, aggMoe: 1371857198, aggMort: 250572012700, aggMortMoe: 1030176390, aggFree: 137585596800, aggFreeMoe: 737190985 };

const PT_ROWS: PropertyTaxRow[] = [
  { fips: "01", abbr: "AL", owners: 1468988, ownersMoe: 13637, mortTot: 783690, mortTotMoe: 14265, freeTot: 685298, freeTotMoe: 11918, mortBr: [239577, 198888, 79556, 81253, 76614, 107802], mortBrMoe: [8535, 7986, 6027, 5932, 5174, 5879], freeBr: [269869, 118315, 41573, 41498, 33109, 180934], freeBrMoe: [9298, 4923, 3261, 3431, 3345, 7231], med: 946, medMoe: 15, medMort: 1116, medMortMoe: 26, medFree: 734, medFreeMoe: 21, agg: 1614295100, aggMoe: 37327735, aggMort: 1040211700, aggMortMoe: 33988210, aggFree: 574083300, aggFreeMoe: 25011820 },
  { fips: "02", abbr: "AK", owners: 185494, ownersMoe: 3875, mortTot: 104243, mortTotMoe: 4542, freeTot: 81251, freeTotMoe: 3639, mortBr: [2755, 6777, 3637, 11841, 68861, 10372], mortBrMoe: [644, 1628, 906, 1670, 4306, 1520], freeBr: [6864, 4904, 3612, 9101, 31216, 25554], freeBrMoe: [1348, 1159, 907, 1395, 3258, 1788], med: 4067, medMoe: 122, medMort: 4424, medMortMoe: 141, medFree: 3413, medFreeMoe: 239, agg: 688738800, aggMoe: 51010887, aggMort: 481877400, aggMortMoe: 51064209, aggFree: 206861400, aggFreeMoe: 19826799 },
  { fips: "04", abbr: "AZ", owners: 2028249, ownersMoe: 16762, mortTot: 1243177, mortTotMoe: 20703, freeTot: 785072, freeTotMoe: 15565, mortBr: [139553, 275131, 197265, 274313, 307172, 49743], mortBrMoe: [8922, 11054, 10246, 10402, 10310, 4546], freeBr: [150831, 155279, 91134, 134832, 170247, 82749], freeBrMoe: [7745, 7431, 5387, 5612, 7719, 4808], med: 1894, medMoe: 23, medMort: 1961, medMortMoe: 29, medFree: 1747, medFreeMoe: 40, agg: 4580250300, aggMoe: 101925439, aggMort: 3001573800, aggMortMoe: 110904213, aggFree: 1578676500, aggFreeMoe: 51462962 },
  { fips: "05", abbr: "AR", owners: 858749, ownersMoe: 10972, mortTot: 452679, mortTotMoe: 11091, freeTot: 406070, freeTotMoe: 9506, mortBr: [125769, 104062, 60427, 62843, 66968, 32610], mortBrMoe: [7687, 5180, 3940, 4999, 5734, 3529], freeBr: [174162, 78690, 35071, 40439, 37180, 40528], freeBrMoe: [7313, 4378, 3711, 3779, 3407, 3277], med: 1142, medMoe: 27, medMort: 1367, medMortMoe: 35, medFree: 863, medFreeMoe: 39, agg: 1262968800, aggMoe: 54685261, aggMort: 770130000, aggMortMoe: 50510814, aggFree: 492838700, aggFreeMoe: 19871782 },
  { fips: "06", abbr: "CA", owners: 7739255, ownersMoe: 41400, mortTot: 5074122, mortTotMoe: 35478, freeTot: 2665133, freeTotMoe: 26185, mortBr: [112994, 199323, 173193, 458045, 4007342, 123225], mortBrMoe: [6347, 9096, 8811, 11533, 32511, 6268], freeBr: [194396, 218113, 160549, 333531, 1569842, 188702], freeBrMoe: [7921, 7150, 8437, 10033, 21295, 7197], med: 5537, medMoe: 29, medMort: 6202, medMortMoe: 36, medFree: 4161, medFreeMoe: 56, agg: 54829879700, aggMoe: 473114101, aggMort: 39539096400, aggMortMoe: 383508475, aggFree: 15290783400, aggFreeMoe: 296654892 },
  { fips: "08", abbr: "CO", owners: 1621891, ownersMoe: 15125, mortTot: 1108939, mortTotMoe: 17099, freeTot: 512952, freeTotMoe: 12191, mortBr: [55939, 123708, 114420, 232367, 559553, 22952], mortBrMoe: [4696, 6464, 6149, 8943, 11841, 2683], freeBr: [64087, 61556, 53520, 99850, 209515, 24424], freeBrMoe: [4994, 4248, 4067, 5579, 6641, 3451], med: 2945, medMoe: 29, medMort: 3087, medMortMoe: 45, medFree: 2652, medFreeMoe: 52, agg: 5961991100, aggMoe: 103641911, aggMort: 4232386000, aggMortMoe: 93483741, aggFree: 1729605100, aggFreeMoe: 72259992 },
  { fips: "09", abbr: "CT", owners: 970885, ownersMoe: 9905, mortTot: 610340, mortTotMoe: 10024, freeTot: 360545, freeTotMoe: 8391, mortBr: [14043, 7619, 5402, 23463, 554246, 5567], mortBrMoe: [3009, 1805, 1488, 3036, 9825, 1659], freeBr: [9919, 5934, 5349, 14997, 317699, 6647], freeBrMoe: [2055, 1374, 1351, 2235, 8007, 1811], med: 6725, medMoe: 55, medMort: 6749, medMortMoe: 64, medFree: 6682, medFreeMoe: 101, agg: 7449597500, aggMoe: 141403699, aggMort: 4685281700, aggMortMoe: 101510931, aggFree: 2764315800, aggFreeMoe: 110237615 },
  { fips: "10", abbr: "DE", owners: 315269, ownersMoe: 6875, mortTot: 194852, mortTotMoe: 6942, freeTot: 120417, freeTotMoe: 5743, mortBr: [18239, 45112, 28561, 45002, 49943, 7995], mortBrMoe: [2478, 3683, 3692, 4352, 4657, 2057], freeBr: [26607, 25640, 13204, 21586, 25933, 7447], freeBrMoe: [2883, 2630, 1966, 2583, 2627, 1951], med: 1911, medMoe: 55, medMort: 2034, medMortMoe: 87, medFree: 1660, medFreeMoe: 103, agg: 673193200, aggMoe: 24165033, aggMort: 442742900, aggMortMoe: 23640407, aggFree: 230450300, aggFreeMoe: 15656213 },
  { fips: "11", abbr: "DC", owners: 126951, ownersMoe: 4991, mortTot: 93315, mortTotMoe: 4577, freeTot: 33636, freeTotMoe: 2791, mortBr: [3751, 6221, 5538, 10827, 63305, 3673], mortBrMoe: [1507, 1785, 1570, 2154, 3882, 1323], freeBr: [2645, 3698, 2241, 3976, 18077, 2999], freeBrMoe: [916, 1143, 1048, 1409, 2027, 1336], med: 4805, medMoe: 279, medMort: 5112, medMortMoe: 359, medFree: 3988, medFreeMoe: 504, agg: 713609000, aggMoe: 37487101, aggMort: 545401200, aggMortMoe: 34976055, aggFree: 168207800, aggFreeMoe: 20881244 },
  { fips: "12", abbr: "FL", owners: 6345311, ownersMoe: 42598, mortTot: 3471332, mortTotMoe: 33217, freeTot: 2873979, freeTotMoe: 32341, mortBr: [206001, 350739, 260317, 572767, 1917738, 163770], mortBrMoe: [9224, 11533, 11995, 17485, 26049, 9666], freeBr: [374703, 407928, 231782, 419515, 1207869, 232182], freeBrMoe: [11317, 11134, 9502, 12429, 21848, 9814], med: 3180, medMoe: 29, medMort: 3521, medMortMoe: 38, medFree: 2731, medFreeMoe: 36, agg: 25941011800, aggMoe: 310578965, aggMort: 15119496200, aggMortMoe: 238540527, aggFree: 10821515500, aggFreeMoe: 209332466 },
  { fips: "13", abbr: "GA", owners: 2825592, ownersMoe: 27198, mortTot: 1738857, mortTotMoe: 21660, freeTot: 1086735, freeTotMoe: 18826, mortBr: [128876, 203816, 159431, 322246, 867017, 57471], mortBrMoe: [6115, 8762, 6965, 12085, 14863, 6042], freeBr: [223091, 192566, 110950, 161805, 326356, 71967], freeBrMoe: [8338, 7897, 6276, 7152, 10184, 6071], med: 2680, medMoe: 22, medMort: 3102, medMortMoe: 38, medFree: 1913, medFreeMoe: 39, agg: 9203243500, aggMoe: 150202631, aggMort: 6365070200, aggMortMoe: 130894452, aggFree: 2838173300, aggFreeMoe: 101856499 },
  { fips: "15", abbr: "HI", owners: 314269, ownersMoe: 7066, mortTot: 186600, mortTotMoe: 6191, freeTot: 127669, freeTotMoe: 5733, mortBr: [23624, 29096, 19434, 36916, 67158, 10372], mortBrMoe: [2697, 3086, 2521, 3262, 4617, 1410], freeBr: [22164, 20038, 11860, 23144, 45488, 4975], freeBrMoe: [3109, 2736, 2219, 2259, 3409, 950], med: 2387, medMoe: 65, medMort: 2432, medMortMoe: 98, medFree: 2315, medFreeMoe: 117, agg: 967119900, aggMoe: 45605102, aggMort: 557672400, aggMortMoe: 33324102, aggFree: 409447500, aggFreeMoe: 30191208 },
  { fips: "16", abbr: "ID", owners: 544227, ownersMoe: 8165, mortTot: 329294, mortTotMoe: 8321, freeTot: 214933, freeTotMoe: 7153, mortBr: [23122, 81720, 57245, 79597, 75183, 12427], mortBrMoe: [2906, 5370, 3844, 4506, 4339, 1707], freeBr: [28404, 52425, 29412, 44947, 46338, 13407], freeBrMoe: [2341, 3510, 3289, 3197, 3328, 1981], med: 1924, medMoe: 33, medMort: 1968, medMortMoe: 41, medFree: 1839, medFreeMoe: 56, agg: 1268528600, aggMoe: 51283060, aggMort: 765512900, aggMortMoe: 30338331, aggFree: 503015700, aggFreeMoe: 45856871 },
  { fips: "17", abbr: "IL", owners: 3478753, ownersMoe: 24036, mortTot: 2068385, mortTotMoe: 23388, freeTot: 1410368, freeTotMoe: 19143, mortBr: [61308, 94462, 85006, 165609, 1603620, 58380], mortBrMoe: [4895, 5155, 5124, 7390, 17722, 5621], freeBr: [115810, 97572, 70385, 139281, 920535, 66785], freeBrMoe: [6311, 4485, 4833, 6388, 16526, 4263], med: 5655, medMoe: 51, medMort: 6183, medMortMoe: 65, medFree: 4789, medFreeMoe: 72, agg: 22114331100, aggMoe: 240490275, aggMort: 14294058000, aggMortMoe: 205241707, aggFree: 7820273100, aggFreeMoe: 162066547 },
  { fips: "18", abbr: "IN", owners: 1998396, ownersMoe: 16788, mortTot: 1221439, mortTotMoe: 16267, freeTot: 776957, freeTotMoe: 14120, mortBr: [167294, 258661, 178459, 247171, 336801, 33053], mortBrMoe: [7286, 10299, 7703, 8331, 9783, 3182], freeBr: [169537, 161029, 96961, 141287, 179088, 29055], freeBrMoe: [6553, 7494, 4844, 6783, 7975, 2830], med: 1884, medMoe: 20, medMort: 1971, medMortMoe: 29, medFree: 1724, medFreeMoe: 40, agg: 4574359600, aggMoe: 63469740, aggMort: 2907174700, aggMortMoe: 60696230, aggFree: 1667185000, aggFreeMoe: 61154339 },
  { fips: "19", abbr: "IA", owners: 967728, ownersMoe: 10381, mortTot: 559732, mortTotMoe: 9865, freeTot: 407996, freeTotMoe: 8386, mortBr: [24675, 64495, 45252, 111676, 300496, 13138], mortBrMoe: [2470, 3748, 3075, 5033, 7612, 1971], freeBr: [44295, 53386, 38650, 86063, 172272, 13330], freeBrMoe: [3309, 3072, 2692, 4654, 6315, 1793], med: 3014, medMoe: 45, medMort: 3293, medMortMoe: 58, medFree: 2709, medFreeMoe: 53, agg: 3352387000, aggMoe: 55211919, aggMort: 2093534500, aggMortMoe: 51500516, aggFree: 1258852500, aggFreeMoe: 39072844 },
  { fips: "20", abbr: "KS", owners: 813999, ownersMoe: 9852, mortTot: 450473, mortTotMoe: 9998, freeTot: 363526, freeTotMoe: 8940, mortBr: [18494, 47009, 41345, 80505, 253084, 10036], mortBrMoe: [2321, 3698, 3878, 5040, 6898, 1647], freeBr: [41112, 52172, 34233, 63140, 161880, 10989], freeBrMoe: [3342, 3781, 3309, 3616, 5233, 1725], med: 3144, medMoe: 54, medMort: 3422, medMortMoe: 66, medFree: 2772, medFreeMoe: 67, agg: 3018555000, aggMoe: 57232556, aggMort: 1814034400, aggMortMoe: 58223350, aggFree: 1204520500, aggFreeMoe: 40579667 },
  { fips: "21", abbr: "KY", owners: 1286890, ownersMoe: 14947, mortTot: 691821, mortTotMoe: 13890, freeTot: 595069, freeTotMoe: 10683, mortBr: [82152, 141272, 106823, 143932, 187305, 30337], mortBrMoe: [4416, 7038, 6300, 6105, 7335, 3549], freeBr: [176494, 117028, 63704, 78608, 95871, 63364], freeBrMoe: [6799, 5594, 4315, 4680, 5624, 4066], med: 1734, medMoe: 24, medMort: 2003, medMortMoe: 40, medFree: 1327, medFreeMoe: 35, agg: 2652483300, aggMoe: 52923182, aggMort: 1652687000, aggMortMoe: 44300693, aggFree: 999796300, aggFreeMoe: 37108486 },
  { fips: "22", abbr: "LA", owners: 1261729, ownersMoe: 15061, mortTot: 642351, mortTotMoe: 13676, freeTot: 619378, freeTotMoe: 10931, mortBr: [152461, 127573, 66492, 97942, 124505, 73378], mortBrMoe: [8282, 6071, 5315, 7069, 6508, 5659], freeBr: [216629, 87911, 38298, 46941, 67375, 162224], freeBrMoe: [8153, 6003, 3810, 3898, 4971, 6432], med: 1268, medMoe: 30, medMort: 1533, medMortMoe: 57, medFree: 885, medFreeMoe: 39, agg: 1921171700, aggMoe: 59462896, aggMort: 1211091000, aggMortMoe: 45707010, aggFree: 710080700, aggFreeMoe: 47814733 },
  { fips: "23", abbr: "ME", owners: 459164, ownersMoe: 6227, mortTot: 255997, mortTotMoe: 6909, freeTot: 203167, freeTotMoe: 5865, mortBr: [7712, 19557, 20995, 51384, 152977, 3372], mortBrMoe: [1236, 2160, 2478, 3839, 6113, 1184], freeBr: [16660, 23651, 19182, 35488, 101688, 6498], freeBrMoe: [1989, 2390, 1950, 2889, 4665, 1112], med: 3404, medMoe: 59, medMort: 3591, medMortMoe: 89, medFree: 3115, medFreeMoe: 103, agg: 1820771800, aggMoe: 55035451, aggMort: 1071594800, aggMortMoe: 51758233, aggFree: 749177000, aggFreeMoe: 30959043 },
  { fips: "24", abbr: "MD", owners: 1635289, ownersMoe: 15769, mortTot: 1135376, mortTotMoe: 14729, freeTot: 499913, freeTotMoe: 11323, mortBr: [25901, 48998, 52162, 154541, 811127, 42647], mortBrMoe: [3877, 3822, 4567, 6958, 14223, 5195], freeBr: [19936, 28329, 23884, 73105, 321876, 32783], freeBrMoe: [2787, 3607, 3144, 4784, 8700, 3949], med: 4368, medMoe: 49, medMort: 4504, medMortMoe: 55, medFree: 4043, medFreeMoe: 93, agg: 7952609200, aggMoe: 135626851, aggMort: 5710268200, aggMortMoe: 123483428, aggFree: 2242340900, aggFreeMoe: 57759169 },
  { fips: "25", abbr: "MA", owners: 1774484, ownersMoe: 14797, mortTot: 1150587, mortTotMoe: 15647, freeTot: 623897, freeTotMoe: 11944, mortBr: [20716, 29127, 31398, 64243, 985002, 20101], mortBrMoe: [2806, 3971, 4419, 4727, 15077, 3128], freeBr: [14657, 14111, 9885, 31237, 522878, 31129], freeBrMoe: [2458, 2339, 1824, 3292, 11113, 3825], med: 6345, medMoe: 46, medMort: 6320, medMortMoe: 60, medFree: 6392, medFreeMoe: 80, agg: 12879992300, aggMoe: 197308462, aggMort: 8248891900, aggMortMoe: 149205394, aggFree: 4631100500, aggFreeMoe: 164334524 },
  { fips: "26", abbr: "MI", owners: 3075243, ownersMoe: 18580, mortTot: 1739683, mortTotMoe: 15905, freeTot: 1335560, freeTotMoe: 16406, mortBr: [55846, 162496, 134967, 328705, 979287, 78382], mortBrMoe: [3311, 7336, 6338, 8620, 13359, 5154], freeBr: [90342, 188156, 130500, 273273, 541662, 111627], freeBrMoe: [4479, 7316, 4777, 8946, 10708, 5808], med: 3163, medMoe: 25, medMort: 3510, medMortMoe: 32, medFree: 2743, medFreeMoe: 24, agg: 11236493100, aggMoe: 117230771, aggMort: 7037599900, aggMortMoe: 107490533, aggFree: 4198893200, aggFreeMoe: 79694152 },
  { fips: "27", abbr: "MN", owners: 1723926, ownersMoe: 12370, mortTot: 1079036, mortTotMoe: 10997, freeTot: 644890, freeTotMoe: 8546, mortBr: [35664, 73791, 68133, 187908, 691721, 21819], mortBrMoe: [2970, 4085, 3683, 7239, 10954, 2455], freeBr: [53614, 51710, 41930, 106836, 374443, 16357], freeBrMoe: [3276, 2604, 2600, 3885, 7523, 1734], med: 3682, medMoe: 28, medMort: 3777, medMortMoe: 35, medFree: 3511, medFreeMoe: 37, agg: 6995781900, aggMoe: 85057622, aggMort: 4490115500, aggMortMoe: 70015618, aggFree: 2505666300, aggFreeMoe: 53431430 },
  { fips: "28", abbr: "MS", owners: 857689, ownersMoe: 10683, mortTot: 405272, mortTotMoe: 11060, freeTot: 452417, freeTotMoe: 10228, mortBr: [77439, 93346, 53123, 62993, 59983, 58388], mortBrMoe: [5293, 6308, 4349, 5056, 5154, 5172], freeBr: [150039, 74341, 31922, 35383, 31847, 128885], freeBrMoe: [7245, 5072, 2777, 4240, 3636, 7225], med: 1248, medMoe: 31, medMort: 1525, medMortMoe: 51, medFree: 896, medFreeMoe: 43, agg: 1101790400, aggMoe: 37266665, aggMort: 678205800, aggMortMoe: 37924957, aggFree: 423584600, aggFreeMoe: 21340906 },
  { fips: "29", abbr: "MO", owners: 1798959, ownersMoe: 16531, mortTot: 1053964, mortTotMoe: 18007, freeTot: 744995, freeTotMoe: 13234, mortBr: [117641, 204041, 125610, 210994, 370872, 24806], mortBrMoe: [6303, 7697, 6276, 8180, 11122, 2766], freeBr: [146737, 151123, 79140, 134016, 208341, 25638], freeBrMoe: [5958, 6101, 5399, 6271, 6773, 2797], med: 2145, medMoe: 30, medMort: 2319, medMortMoe: 37, medFree: 1891, medFreeMoe: 38, agg: 4786695300, aggMoe: 83363546, aggMort: 2989489700, aggMortMoe: 70073978, aggFree: 1797205600, aggFreeMoe: 68221558 },
  { fips: "30", abbr: "MT", owners: 334167, ownersMoe: 5760, mortTot: 180223, mortTotMoe: 5705, freeTot: 153944, freeTotMoe: 5308, mortBr: [9630, 14266, 15826, 42913, 93629, 3959], mortBrMoe: [1839, 2253, 2075, 3554, 5209, 1240], freeBr: [20479, 17348, 13646, 28371, 61329, 12771], freeBrMoe: [2133, 1690, 1728, 2658, 3914, 1981], med: 2947, medMoe: 65, medMort: 3167, medMortMoe: 110, medFree: 2674, medFreeMoe: 94, agg: 1103011800, aggMoe: 43889458, aggMort: 630894800, aggMortMoe: 35064735, aggFree: 472117100, aggFreeMoe: 33772698 },
  { fips: "31", abbr: "NE", owners: 545211, ownersMoe: 8330, mortTot: 314231, mortTotMoe: 7673, freeTot: 230980, freeTotMoe: 5416, mortBr: [9746, 19842, 19816, 50796, 200061, 13970], mortBrMoe: [1225, 1983, 2310, 3883, 5862, 2436], freeBr: [21703, 23093, 18429, 38887, 111283, 17585], freeBrMoe: [2429, 2003, 2004, 2561, 4197, 1975], med: 3665, medMoe: 60, medMort: 3993, medMortMoe: 102, medFree: 3144, medFreeMoe: 97, agg: 2240566000, aggMoe: 59021726, aggMort: 1399777900, aggMortMoe: 38348821, aggFree: 840788100, aggFreeMoe: 49163691 },
  { fips: "32", abbr: "NV", owners: 761654, ownersMoe: 12923, mortTot: 488376, mortTotMoe: 12061, freeTot: 273278, freeTotMoe: 10152, mortBr: [48628, 99622, 62310, 100622, 156743, 20451], mortBrMoe: [4727, 6598, 4110, 6512, 8317, 2750], freeBr: [39815, 53620, 30912, 51357, 78369, 19205], freeBrMoe: [3707, 4241, 3747, 4524, 4915, 3124], med: 2172, medMoe: 52, medMort: 2233, medMortMoe: 68, medFree: 2052, medFreeMoe: 75, agg: 2142957400, aggMoe: 84040351, aggMort: 1401937300, aggMortMoe: 66378653, aggFree: 741020000, aggFreeMoe: 52401343 },
  { fips: "33", abbr: "NH", owners: 412973, ownersMoe: 6835, mortTot: 245602, mortTotMoe: 6907, freeTot: 167371, freeTotMoe: 4845, mortBr: [3611, 3638, 3408, 9053, 223869, 2023], mortBrMoe: [1156, 1170, 1303, 1566, 6548, 919], freeBr: [5605, 4817, 4284, 10134, 138632, 3899], freeBrMoe: [1441, 1224, 1223, 1735, 5025, 993], med: 6983, medMoe: 105, medMort: 7155, medMortMoe: 136, medFree: 6681, medFreeMoe: 173, agg: 3070737400, aggMoe: 68279962, aggMort: 1889221100, aggMortMoe: 67628359, aggFree: 1181516300, aggFreeMoe: 49008847 },
  { fips: "34", abbr: "NJ", owners: 2275717, ownersMoe: 18446, mortTot: 1421288, mortTotMoe: 16969, freeTot: 854429, freeTotMoe: 14589, mortBr: [15126, 12730, 13553, 26117, 1322405, 31357], mortBrMoe: [2368, 2275, 2553, 3427, 18443, 2811], freeBr: [12119, 11196, 8263, 23972, 752800, 46079], freeBrMoe: [1907, 1467, 1703, 2866, 14066, 4413], med: 9648, medMoe: 71, medMort: 9790, medMortMoe: 89, medFree: 9402, medFreeMoe: 106, agg: 23015962900, aggMoe: 261664021, aggMort: 14815083000, aggMortMoe: 228747142, aggFree: 8200879800, aggFreeMoe: 167009287 },
  { fips: "35", abbr: "NM", owners: 602506, ownersMoe: 9186, mortTot: 301459, mortTotMoe: 9357, freeTot: 301047, freeTotMoe: 7698, mortBr: [34174, 53232, 37391, 64920, 88620, 23122], mortBrMoe: [3821, 4815, 3657, 5380, 5637, 2675], freeBr: [84314, 48175, 28765, 38958, 55549, 45286], freeBrMoe: [5581, 3403, 2939, 3752, 3593, 3544], med: 1856, medMoe: 48, medMort: 2221, medMortMoe: 78, medFree: 1431, medFreeMoe: 61, agg: 1231812600, aggMoe: 36799415, aggMort: 724813800, aggMortMoe: 34517950, aggFree: 506998800, aggFreeMoe: 27470876 },
  { fips: "36", abbr: "NY", owners: 4247594, ownersMoe: 24877, mortTot: 2360541, mortTotMoe: 21239, freeTot: 1887053, freeTotMoe: 19939, mortBr: [47189, 89226, 66281, 159825, 1861300, 136720], mortBrMoe: [3101, 5360, 4873, 6508, 18642, 8166], freeBr: [63825, 96731, 73163, 157214, 1297644, 198476], freeBrMoe: [4501, 4880, 4880, 6270, 19703, 7405], med: 6706, medMoe: 39, medMort: 7057, medMortMoe: 68, medFree: 6193, medFreeMoe: 79, agg: 33388878200, aggMoe: 401390358, aggMort: 19673057000, aggMortMoe: 285477374, aggFree: 13715821300, aggFreeMoe: 299935840 },
  { fips: "37", abbr: "NC", owners: 3040120, ownersMoe: 25841, mortTot: 1830100, mortTotMoe: 24785, freeTot: 1210020, freeTotMoe: 16136, mortBr: [129947, 330219, 255430, 415853, 652360, 46291], mortBrMoe: [6155, 10878, 10758, 12188, 15620, 4568], freeBr: [220090, 270955, 153208, 217602, 298703, 49462], freeBrMoe: [8398, 9828, 6772, 7280, 9212, 4588], med: 2177, medMoe: 22, medMort: 2424, medMortMoe: 28, medFree: 1791, medFreeMoe: 29, agg: 8106726600, aggMoe: 155780846, aggMort: 5274503700, aggMortMoe: 130569126, aggFree: 2832222800, aggFreeMoe: 80500123 },
  { fips: "38", abbr: "ND", owners: 217405, ownersMoe: 5422, mortTot: 111034, mortTotMoe: 4555, freeTot: 106371, freeTotMoe: 3825, mortBr: [7980, 13113, 10284, 23963, 51029, 4665], mortBrMoe: [1500, 2103, 1738, 2808, 3548, 1467], freeBr: [16787, 15333, 12082, 18501, 33059, 10609], freeBrMoe: [1558, 1577, 1854, 2141, 2267, 1167], med: 2600, medMoe: 74, medMort: 2910, medMortMoe: 113, medFree: 2199, medFreeMoe: 109, agg: 611825400, aggMoe: 24712710, aggMort: 349279700, aggMortMoe: 20369924, aggFree: 262545700, aggFreeMoe: 18882599 },
  { fips: "39", abbr: "OH", owners: 3343094, ownersMoe: 23883, mortTot: 1962018, mortTotMoe: 23301, freeTot: 1381076, freeTotMoe: 17804, mortBr: [93087, 240085, 175528, 353379, 1050187, 49752], mortBrMoe: [5381, 8576, 7239, 10715, 15156, 5231], freeBr: [133508, 195695, 130863, 249037, 627044, 44929], freeBrMoe: [7509, 7558, 5779, 8146, 11861, 3962], med: 3107, medMoe: 26, medMort: 3311, medMortMoe: 35, medFree: 2835, medFreeMoe: 35, agg: 12713631600, aggMoe: 129283121, aggMort: 7817624500, aggMortMoe: 106204747, aggFree: 4896007100, aggFreeMoe: 99982493 },
  { fips: "40", abbr: "OK", owners: 1057933, ownersMoe: 9821, mortTot: 543354, mortTotMoe: 9360, freeTot: 514579, freeTotMoe: 7993, mortBr: [70363, 91830, 70680, 112395, 165636, 32450], mortBrMoe: [3265, 4876, 4025, 4357, 5197, 2632], freeBr: [170112, 97660, 48956, 69296, 97610, 30945], freeBrMoe: [4918, 3774, 3196, 3865, 4096, 2063], med: 1781, medMoe: 26, medMort: 2201, medMortMoe: 40, medFree: 1311, medFreeMoe: 29, agg: 2355520400, aggMoe: 48684647, aggMort: 1387255700, aggMortMoe: 40081035, aggFree: 968264800, aggFreeMoe: 35996558 },
  { fips: "41", abbr: "OR", owners: 1101360, ownersMoe: 14222, mortTot: 684804, mortTotMoe: 14138, freeTot: 416556, freeTotMoe: 9315, mortBr: [13812, 34465, 46759, 99703, 474899, 15166], mortBrMoe: [1934, 3564, 3937, 5554, 13345, 2610], freeBr: [28478, 32533, 22915, 55876, 249217, 27537], freeBrMoe: [3393, 3234, 2233, 4605, 7730, 3061], med: 4009, medMoe: 52, medMort: 4123, medMortMoe: 67, medFree: 3826, medFreeMoe: 78, agg: 4950964800, aggMoe: 95813073, aggMort: 3204933500, aggMortMoe: 95424016, aggFree: 1746031400, aggFreeMoe: 64995707 },
  { fips: "42", abbr: "PA", owners: 3738856, ownersMoe: 22114, mortTot: 2092089, mortTotMoe: 24053, freeTot: 1646767, freeTotMoe: 17803, mortBr: [125758, 226437, 161492, 323005, 1210367, 45030], mortBrMoe: [6227, 9160, 9253, 11626, 19050, 4492], freeBr: [195266, 249418, 141831, 254140, 755648, 50464], freeBrMoe: [8313, 9370, 6334, 7986, 13162, 4942], med: 3288, medMoe: 31, medMort: 3628, medMortMoe: 41, medFree: 2833, medFreeMoe: 40, agg: 14778233600, aggMoe: 170704930, aggMort: 8893404100, aggMortMoe: 141299874, aggFree: 5884829500, aggFreeMoe: 126232586 },
  { fips: "44", abbr: "RI", owners: 293926, ownersMoe: 6539, mortTot: 188381, mortTotMoe: 6911, freeTot: 105545, freeTotMoe: 4648, mortBr: [3431, 4723, 3744, 17047, 156810, 2626], mortBrMoe: [1196, 1771, 1774, 2485, 6539, 992], freeBr: [3033, 2355, 1668, 9996, 85103, 3390], freeBrMoe: [1228, 1081, 705, 2235, 4189, 1185], med: 4901, medMoe: 90, medMort: 4984, medMortMoe: 139, medFree: 4768, medFreeMoe: 110, agg: 1575809300, aggMoe: 54879961, aggMort: 1008806800, aggMortMoe: 46972501, aggFree: 567002500, aggFreeMoe: 41480740 },
  { fips: "45", abbr: "SC", owners: 1649384, ownersMoe: 13290, mortTot: 927350, mortTotMoe: 13432, freeTot: 722034, freeTotMoe: 12833, mortBr: [151136, 260815, 132292, 164437, 175746, 42924], mortBrMoe: [8237, 8549, 7286, 7838, 8523, 4959], freeBr: [276138, 169235, 70537, 68430, 84184, 53510], freeBrMoe: [9094, 6946, 4489, 4798, 5411, 4405], med: 1367, medMoe: 18, medMort: 1614, medMortMoe: 34, medFree: 1004, medFreeMoe: 34, agg: 3044687600, aggMoe: 105595824, aggMort: 1914034400, aggMortMoe: 76541731, aggFree: 1130653200, aggFreeMoe: 80572297 },
  { fips: "46", abbr: "SD", owners: 256889, ownersMoe: 5301, mortTot: 132680, mortTotMoe: 4471, freeTot: 124209, freeTotMoe: 4196, mortBr: [5901, 11552, 10840, 28481, 72727, 3179], mortBrMoe: [1277, 1710, 1529, 2731, 3391, 999], freeBr: [16137, 15288, 8768, 20925, 53993, 9098], freeBrMoe: [1794, 1714, 1246, 2240, 2888, 1632], med: 3098, medMoe: 71, medMort: 3311, medMortMoe: 102, medFree: 2830, medFreeMoe: 95, agg: 872352000, aggMoe: 28091458, aggMort: 502162300, aggMortMoe: 26373195, aggFree: 370189700, aggFreeMoe: 18366359 },
  { fips: "47", abbr: "TN", owners: 1998766, ownersMoe: 18922, mortTot: 1118036, mortTotMoe: 16226, freeTot: 880730, freeTotMoe: 14729, mortBr: [171577, 282672, 170009, 216945, 229629, 47204], mortBrMoe: [8182, 9223, 8820, 7205, 9245, 4702], freeBr: [234166, 231718, 108240, 131803, 128085, 46718], freeBrMoe: [10037, 8390, 6817, 6713, 6261, 3856], med: 1558, medMoe: 23, medMort: 1739, medMortMoe: 29, medFree: 1352, medFreeMoe: 23, agg: 3994186500, aggMoe: 90401922, aggMort: 2386278500, aggMortMoe: 62567193, aggFree: 1607908000, aggFreeMoe: 68903544 },
  { fips: "48", abbr: "TX", owners: 7273364, ownersMoe: 38723, mortTot: 4024062, mortTotMoe: 31447, freeTot: 3249302, freeTotMoe: 34043, mortBr: [199121, 218288, 144164, 373528, 2850833, 238128], mortBrMoe: [11556, 8688, 8676, 12401, 28097, 11513], freeBr: [576054, 419315, 226647, 368880, 1388251, 270155], freeBrMoe: [13964, 13436, 10418, 11353, 23509, 11095], med: 4205, medMoe: 37, medMort: 5404, medMortMoe: 56, medFree: 2725, medFreeMoe: 40, agg: 36455740200, aggMoe: 354267610, aggMort: 24247124000, aggMortMoe: 305372941, aggFree: 12208616100, aggFreeMoe: 237860174 },
  { fips: "49", abbr: "UT", owners: 829454, ownersMoe: 9786, mortTot: 554345, mortTotMoe: 8333, freeTot: 275109, freeTotMoe: 6943, mortBr: [17523, 50222, 58527, 186143, 220571, 21359], mortBrMoe: [2911, 4059, 3890, 6341, 6750, 2777], freeBr: [18059, 26016, 27157, 84371, 105593, 13913], freeBrMoe: [2457, 2355, 2833, 4277, 4619, 2013], med: 2738, medMoe: 24, medMort: 2753, medMortMoe: 28, medFree: 2704, medFreeMoe: 40, agg: 2477550600, aggMoe: 59094678, aggMort: 1664328900, aggMortMoe: 48955301, aggFree: 813221600, aggFreeMoe: 31829288 },
  { fips: "50", abbr: "VT", owners: 207670, ownersMoe: 4101, mortTot: 117535, mortTotMoe: 4734, freeTot: 90135, freeTotMoe: 3643, mortBr: [1643, 2578, 2061, 11436, 97759, 2058], mortBrMoe: [762, 911, 666, 1655, 4616, 674], freeBr: [4099, 4459, 2910, 8330, 67573, 2764], freeBrMoe: [1107, 1113, 770, 1106, 3399, 814], med: 5418, medMoe: 141, medMort: 5663, medMortMoe: 163, medFree: 5034, medFreeMoe: 226, agg: 1214236300, aggMoe: 39493539, aggMort: 705241500, aggMortMoe: 36475017, aggFree: 508994800, aggFreeMoe: 29321540 },
  { fips: "51", abbr: "VA", owners: 2362907, ownersMoe: 18701, mortTot: 1541576, mortTotMoe: 17882, freeTot: 821331, freeTotMoe: 14271, mortBr: [111385, 183864, 134509, 251789, 787324, 72705], mortBrMoe: [5787, 8435, 7238, 7669, 14827, 5160], freeBr: [131106, 114090, 69923, 127323, 338096, 40793], freeBrMoe: [5890, 6146, 4336, 5343, 10395, 3539], med: 3003, medMoe: 36, medMort: 3265, medMortMoe: 53, medFree: 2590, medFreeMoe: 58, agg: 9422815200, aggMoe: 159077990, aggMort: 6441967400, aggMortMoe: 142382765, aggFree: 2980847800, aggFreeMoe: 108247904 },
  { fips: "53", abbr: "WA", owners: 1997703, ownersMoe: 16415, mortTot: 1276752, mortTotMoe: 16469, freeTot: 720951, freeTotMoe: 11488, mortBr: [38268, 51245, 46764, 131437, 980980, 28058], mortBrMoe: [3660, 4550, 3874, 6767, 16711, 3369], freeBr: [59852, 39825, 28950, 74940, 479884, 37500], freeBrMoe: [3811, 3375, 3450, 5000, 10603, 4197], med: 4911, medMoe: 42, medMort: 5005, medMortMoe: 64, medFree: 4702, medFreeMoe: 72, agg: 11279188000, aggMoe: 165134077, aggMort: 7412095400, aggMortMoe: 142958982, aggFree: 3867092600, aggFreeMoe: 111249051 },
  { fips: "54", abbr: "WV", owners: 558933, ownersMoe: 8009, mortTot: 242502, mortTotMoe: 7750, freeTot: 316431, freeTotMoe: 7239, mortBr: [74854, 74634, 30114, 31151, 21805, 9944], mortBrMoe: [4714, 4251, 3138, 3118, 3040, 1987], freeBr: [159413, 74053, 22129, 21581, 10529, 28726], freeBrMoe: [5627, 3936, 2647, 2980, 2081, 2506], med: 904, medMoe: 25, medMort: 1185, medMortMoe: 36, medFree: 718, medFreeMoe: 24, agg: 604135300, aggMoe: 17681033, aggMort: 330706000, aggMortMoe: 14450598, aggFree: 273429200, aggFreeMoe: 13650875 },
  { fips: "55", abbr: "WI", owners: 1747732, ownersMoe: 13592, mortTot: 1025232, mortTotMoe: 12959, freeTot: 722500, freeTotMoe: 10031, mortBr: [20230, 48600, 59406, 186546, 698844, 11606], mortBrMoe: [2389, 3356, 3412, 6513, 10428, 1588], freeBr: [33727, 41556, 47375, 129286, 445987, 24569], freeBrMoe: [2373, 2997, 3034, 4782, 7164, 2618], med: 3810, medMoe: 21, medMort: 3894, medMortMoe: 31, medFree: 3684, medFreeMoe: 34, agg: 7411078800, aggMoe: 76504364, aggMort: 4462152000, aggMortMoe: 63410870, aggFree: 2948926800, aggFreeMoe: 56978485 },
  { fips: "56", abbr: "WY", owners: 179037, ownersMoe: 4689, mortTot: 99283, mortTotMoe: 4717, freeTot: 79754, freeTotMoe: 4289, mortBr: [7745, 20206, 20099, 24042, 25798, 1393], mortBrMoe: [1814, 2393, 2691, 2818, 2893, 580], freeBr: [11454, 13585, 14819, 16497, 19819, 3580], freeBrMoe: [1738, 1698, 2265, 2251, 2493, 1127], med: 1987, medMoe: 56, medMort: 2037, medMortMoe: 108, medFree: 1940, medFreeMoe: 70, agg: 533152100, aggMoe: 41922721, aggMort: 290130900, aggMortMoe: 30102147, aggFree: 243021200, aggFreeMoe: 37956656 },
];

const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);

// ---- Build-time checks (see the header comment) ----
for (const r of [...PT_ROWS, { ...US_PT_ROW, fips: "00", abbr: "US" }]) {
  const tag = `${r.abbr} (${r.fips})`;
  if (sum(r.mortBr) !== r.mortTot) throw new Error(`${tag}: mortgage brackets do not add up to B25102_002`);
  if (sum(r.freeBr) !== r.freeTot) throw new Error(`${tag}: no-mortgage brackets do not add up to B25102_009`);
  if (r.mortTot + r.freeTot !== r.owners) throw new Error(`${tag}: group totals do not add up to B25102_001`);
  if (Math.abs(r.aggMort + r.aggFree - r.agg) > 100) throw new Error(`${tag}: aggregates do not add up to B25090_001`);
}
{
  const check = (label: string, parts: number[], total: number, tolerance = 0) => {
    if (Math.abs(sum(parts) - total) > tolerance) throw new Error(`State rows do not add up to the U.S. row for ${label}`);
  };
  check("owner-occupied units", PT_ROWS.map((r) => r.owners), US_PT_ROW.owners);
  for (let i = 0; i < 6; i++) {
    check(`mortgage bracket ${i + 1}`, PT_ROWS.map((r) => r.mortBr[i]), US_PT_ROW.mortBr[i]);
    check(`no-mortgage bracket ${i + 1}`, PT_ROWS.map((r) => r.freeBr[i]), US_PT_ROW.freeBr[i]);
  }
  // Each published aggregate is rounded to $100 (error of at most $50 each), so allow $50 per row.
  check("aggregate real estate taxes", PT_ROWS.map((r) => r.agg), US_PT_ROW.agg, 50 * (PT_ROWS.length + 1));
}

export interface PropertyTaxResult extends PropertyTaxRow {
  name: string;
  /** 1 = the highest median property tax bill */
  rank: number;
  /** B25077 median home value, dollars */
  value: number;
  valueMoe: number;
  /** B19013 median household income, dollars a year */
  income: number;
  incomeMoe: number;
  /** owners who report a tax bill: all owners minus the "no real estate taxes paid" bracket */
  payers: number;
  payersMoe: number;
  /** owners who report no real estate taxes, and their share of all owners */
  noTax: number;
  noTaxShare: Share;
  /** owners whose bill is under $800 / $3,000 or more, as a share of all owners */
  under800Share: Share;
  over3000Share: Share;
  /** mean bill among owners who report one, dollars a year */
  meanTax: Ratio;
  /** median tax divided by median home value, percent */
  effRate: Ratio;
  /** median tax as a percent of median household income */
  incomeShare: Ratio;
  /** the effective rate applied to the illustrative home value, dollars a year */
  billOnHome: number;
  /** median bill with a mortgage divided by median bill without one */
  mortRatio: Ratio;
  /** this place's share of all property tax paid by U.S. owner-occupants, percent */
  aggShareOfUs: number;
  /** this place's share of all U.S. owner-occupied homes, percent */
  ownersShareOfUs: number;
}

interface Inputs {
  name: string;
  value: number;
  valueMoe: number;
  income: number;
  incomeMoe: number;
}

function compute(row: PropertyTaxRow, base: Inputs): Omit<PropertyTaxResult, "rank"> {
  const noTax = row.mortBr[5] + row.freeBr[5];
  const noTaxMoe = rss([row.mortBrMoe[5], row.freeBrMoe[5]]);
  const payers = row.owners - noTax;
  const payersMoe = rss([...row.mortBrMoe.slice(0, 5), ...row.freeBrMoe.slice(0, 5)]);
  const under = row.mortBr[0] + row.freeBr[0];
  const underMoe = rss([row.mortBrMoe[0], row.freeBrMoe[0]]);
  const over = row.mortBr[4] + row.freeBr[4];
  const overMoe = rss([row.mortBrMoe[4], row.freeBrMoe[4]]);
  const eff = ratio(row.med, row.medMoe, base.value, base.valueMoe);
  const inc = ratio(row.med, row.medMoe, base.income, base.incomeMoe);
  return {
    ...row,
    name: base.name,
    value: base.value,
    valueMoe: base.valueMoe,
    income: base.income,
    incomeMoe: base.incomeMoe,
    payers,
    payersMoe,
    noTax,
    noTaxShare: share(noTax, noTaxMoe, row.owners, row.ownersMoe),
    under800Share: share(under, underMoe, row.owners, row.ownersMoe),
    over3000Share: share(over, overMoe, row.owners, row.ownersMoe),
    meanTax: ratio(row.agg, row.aggMoe, payers, payersMoe),
    effRate: { value: eff.value * 100, moe: eff.moe * 100 },
    incomeShare: { value: inc.value * 100, moe: inc.moe * 100 },
    billOnHome: (row.med / base.value) * REPORT.illustrativeHome,
    mortRatio: ratio(row.medMort, row.medMortMoe, row.medFree, row.medFreeMoe),
    aggShareOfUs: (row.agg / US_PT_ROW.agg) * 100,
    ownersShareOfUs: (row.owners / US_PT_ROW.owners) * 100,
  };
}

/** All 50 states and DC, ranked from the highest to the lowest median property tax bill. */
export const STATE_RESULTS: PropertyTaxResult[] = STATE_ROWS.map((base) => {
  const row = PT_ROWS.find((r) => r.fips === base.fips);
  if (!row) throw new Error(`Missing property tax inputs for FIPS ${base.fips}`);
  if (row.abbr !== base.abbr) throw new Error(`State mismatch for FIPS ${base.fips}`);
  if (row.med !== base.tax || row.medMoe !== base.taxMoe) {
    throw new Error(
      `${base.abbr}: B25103_001 median ${row.med} (±${row.medMoe}) differs from the mortgage affordability report ` +
        `(${base.tax} ±${base.taxMoe}). Both reports must use the same median property tax.`,
    );
  }
  return compute(row, base);
})
  .sort((a, b) => b.med - a.med)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<PropertyTaxResult, "rank"> = (() => {
  if (US_PT_ROW.med !== US_ROW.tax) throw new Error("U.S. median property tax differs from the mortgage affordability report");
  return compute({ ...US_PT_ROW, fips: "00", abbr: "US" }, US_ROW);
})();

export function getStateResult(abbr: string): PropertyTaxResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_highest_median_property_tax",
  "state",
  "abbr",
  "fips",
  "owner_occupied_units",
  "median_property_tax_usd",
  "median_property_tax_moe90_usd",
  "median_property_tax_with_mortgage_usd",
  "median_property_tax_with_mortgage_moe90_usd",
  "median_property_tax_without_mortgage_usd",
  "median_property_tax_without_mortgage_moe90_usd",
  "mean_property_tax_among_owners_with_a_bill_usd",
  "mean_property_tax_among_owners_with_a_bill_moe90_usd",
  "effective_rate_median_tax_over_median_home_value_pct",
  "effective_rate_moe90_pts",
  "median_property_tax_pct_of_median_household_income",
  "median_property_tax_pct_of_median_household_income_moe90_pts",
  "tax_on_400000_home_at_state_effective_rate_usd",
  "owners_paying_under_800_pct",
  "owners_paying_under_800_moe90_pts",
  "owners_paying_3000_or_more_pct",
  "owners_paying_3000_or_more_moe90_pts",
  "owners_reporting_no_property_tax_pct",
  "owners_reporting_no_property_tax_moe90_pts",
  "aggregate_property_tax_usd",
  "aggregate_property_tax_pct_of_us",
  "owner_occupied_units_pct_of_us",
  "median_home_value_usd",
  "median_household_income_usd",
] as const;

function csvLine(r: PropertyTaxResult | (Omit<PropertyTaxResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.owners,
    r.med,
    r.medMoe,
    r.medMort,
    r.medMortMoe,
    r.medFree,
    r.medFreeMoe,
    round(r.meanTax.value),
    round(r.meanTax.moe),
    round(r.effRate.value, 3),
    round(r.effRate.moe, 3),
    round(r.incomeShare.value, 2),
    round(r.incomeShare.moe, 2),
    round(r.billOnHome),
    round(r.under800Share.pct, 2),
    round(r.under800Share.moe, 2),
    round(r.over3000Share.pct, 2),
    round(r.over3000Share.moe, 2),
    round(r.noTaxShare.pct, 2),
    round(r.noTaxShare.moe, 2),
    r.agg,
    round(r.aggShareOfUs, 2),
    round(r.ownersShareOfUs, 2),
    r.value,
    r.income,
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [CSV_HEADER.join(","), ...STATE_RESULTS.map(csvLine), csvLine(US_RESULT)].join("\n") + "\n";
}
