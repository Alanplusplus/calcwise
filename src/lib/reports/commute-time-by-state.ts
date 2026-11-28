/**
 * Data and calculations for the "Commute Time by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * Inputs (ACS 2025 1-year) were read on 2026-11-28 from the Census Bureau's table-based ACS Summary
 * File (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData, files
 * acsdt1y2025-b08301, -b08303, -b08013, -b08121). The Census API requires a key and was not used. Row
 * labels were checked against the Census variable list (api.census.gov/data/2025/acs/acs1/groups/<table>.html).
 *
 * What is stored: for every place, from B08301 (means of transportation to work, workers 16 and over)
 * the total workers (_001) and the workers who drove alone (_003), carpooled (_004), took public
 * transportation (_010), walked (_019), bicycled (_018), worked from home (_021), and used another means
 * (taxi or ride-hailing _016 plus motorcycle _017 plus other _020). From B08303 (travel time to work,
 * workers who did not work from home) the commuters (_001) in six groups: under 15 minutes (_002 to
 * _004), 15 to 29 (_005 to _007), 30 to 44 (_008 to _010), 45 to 59 (_011), 60 to 89 (_012), and 90 or
 * more (_013). From B08013 the aggregate travel time to work in minutes (_001), one way, summed over
 * the commuters. From B08121 the median earnings in the past 12 months of all workers (_001), of the
 * workers who drove alone (_002), and of the workers who worked from home (_007), in 2025 dollars.
 * Each count carries its published margin of error; the margin of a sum is the square root of the sum
 * of the squared published margins, and the margin of a share or a ratio follows the ACS General
 * Handbook, chapter 8. The mean one-way travel time is the aggregate minutes divided by the commuters.
 *
 * Checks: all 50 states, DC, and the U.S. row were present (Puerto Rico was dropped, as in the
 * companion reports). In all 52 rows the nine means of transportation add up to the worker total, the
 * car, truck, or van count equals drove alone plus carpooled, the public transportation count equals
 * its five parts, the commuters in B08303 equal the workers minus those who worked from home, and the
 * twelve travel-time groups add up to the commuters. The 51 state and DC rows add up exactly to the U.S.
 * row for every count in B08301 and B08303 and for the aggregate travel time. The aggregate minutes for
 * men and women differ from the total by 5 minutes or less in 11 of the 52 rows because the Census
 * Bureau rounds each aggregate to a multiple of 5. No cell is missing or a Census placeholder.
 *
 * Median household income (B19013) is NOT stored again here: it comes from the mortgage affordability
 * report's STATE_ROWS, so all the reports use the same income figures. The guard below fails the build
 * if that report moves to a different ACS year before this one does.
 *
 * Hours a year are a what-if, not a measurement: the one-way mean is doubled for the round trip and
 * multiplied by 250 commuting days (5 days a week for 50 weeks), and a day on the job is 8 hours. The
 * effective-pay drop is the share of an hour of pay that disappears when the round trip is counted as
 * time given to the job: commute hours divided by (hours on the job plus commute hours).
 */

import { REPORT as AFFORDABILITY_REPORT, STATE_ROWS, US_ROW, pct1, usd0 } from "./mortgage-affordability-by-state";
import { ratio, rss, share, type Ratio, type Share } from "./retirement-income-by-state";
import { correlation, count0, millions } from "./car-ownership-by-state";

export { correlation, count0, millions, pct1, usd0 };
export type { Ratio, Share };

export const REPORT = {
  slug: "commute-time-by-state",
  path: "/reports/commute-time-by-state",
  csvPath: "/reports/commute-time-by-state/data.csv",
  datePublished: "2026-11-28",
  dateModified: "2026-11-28",
  /** ACS survey year of every figure */
  acsYear: 2025,
  /** Version label of the CSV download. It is part of the download file name. */
  csvVersion: 1,
  /** Commuting days in a year used to turn a one-way mean into hours: 5 days a week for 50 weeks */
  commuteDays: 250,
  /** Hours on the job on one of those days */
  workdayHours: 8,
} as const;

if (AFFORDABILITY_REPORT.acsYear !== REPORT.acsYear) {
  throw new Error(
    `commute-time-by-state uses ACS ${REPORT.acsYear} but mortgage-affordability-by-state now uses ACS ` +
      `${AFFORDABILITY_REPORT.acsYear}. Refresh the rows in src/lib/reports/commute-time-by-state.ts ` +
      `(tables B08301, B08303, B08013, B08121) in the same change.`,
  );
}

/** Hours on the job in a year under the report's assumptions: 250 days of 8 hours. */
export const JOB_HOURS_PER_YEAR = REPORT.commuteDays * REPORT.workdayHours;

/** Round-trip hours a year for a given one-way trip in minutes. */
export const commuteHoursPerYear = (oneWayMinutes: number) => (oneWayMinutes * 2 * REPORT.commuteDays) / 60;

/** Share of an hour of pay lost when the commute counts as time given to the job, in percent. */
export const payDropPct = (hoursPerYear: number) => (hoursPerYear / (JOB_HOURS_PER_YEAR + hoursPerYear)) * 100;

export const REPORT_SOURCES = {
  acsTransport: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B08301 (means of transportation to work)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B08301",
  },
  acsTravelTime: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B08303 (travel time to work)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B08303",
  },
  acsAggregate: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B08013 (aggregate travel time to work in minutes of workers by sex)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B08013",
  },
  acsEarnings: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B08121 (median earnings by means of transportation to work)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B08121",
  },
  acsIncome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19013 (median household income), used for the median-income column",
    href: "https://data.census.gov/table/ACSDT1Y2025.B19013",
  },
  acsFile: {
    label: "Census Bureau, 2025 ACS 1-year Summary File, table-based format (released Oct. 29, 2026)",
    href: "https://www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData/",
  },
  acsDefinitions: {
    label: "Census Bureau, 2025 ACS Subject Definitions (Journey to Work: Means of Transportation, Travel Time)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
} as const;

/** The six travel-time groups, in the order of CommuteRow.bins. */
export const BIN_LABELS = [
  "Under 15 minutes",
  "15 to 29 minutes",
  "30 to 44 minutes",
  "45 to 59 minutes",
  "60 to 89 minutes",
  "90 minutes or more",
] as const;

export interface CommuteRow {
  fips: string;
  abbr: string;
  /** B08301_001: workers 16 and over */
  workers: number;
  workersMoe: number;
  /** B08301_003: drove alone in a car, truck, or van */
  alone: number;
  aloneMoe: number;
  /** B08301_004: carpooled */
  pool: number;
  poolMoe: number;
  /** B08301_010: public transportation, excluding taxicab */
  transit: number;
  transitMoe: number;
  /** B08301_019: walked */
  walk: number;
  walkMoe: number;
  /** B08301_018: bicycle */
  bike: number;
  bikeMoe: number;
  /** B08301_016 + _017 + _020: taxi or ride-hailing, motorcycle, and other means */
  other: number;
  otherMoe: number;
  /** B08301_021: worked from home */
  wfh: number;
  wfhMoe: number;
  /** B08303_001: workers 16 and over who did not work from home */
  commuters: number;
  commutersMoe: number;
  /** B08303: commuters by one-way travel time, in the six groups of BIN_LABELS */
  bins: number[];
  binsMoe: number[];
  /** B08013_001: aggregate one-way travel time to work of the commuters, minutes */
  agg: number;
  aggMoe: number;
  /** B08121_001: median earnings in the past 12 months, all workers, dollars */
  earn: number;
  earnMoe: number;
  /** B08121_002: median earnings of workers who drove alone, dollars */
  earnAlone: number;
  earnAloneMoe: number;
  /** B08121_007: median earnings of workers who worked from home, dollars */
  earnWfh: number;
  earnWfhMoe: number;
}

export const US_COMMUTE_ROW: CommuteRow =
{ fips: "00", abbr: "US", workers: 165214453, workersMoe: 174503, alone: 115297377, aloneMoe: 192942, pool: 14712170, poolMoe: 97235, transit: 6322566, transitMoe: 58425, walk: 4016469, walkMoe: 41065, bike: 782811, bikeMoe: 22259, other: 2794667, otherMoe: 42712, wfh: 21288393, wfhMoe: 105742, commuters: 143926060, commutersMoe: 174054, bins: [35691280, 51789228, 30589439, 12174408, 9269392, 4412313], binsMoe: [128233, 153598, 116307, 81622, 69861, 47431], agg: 3946553575, aggMoe: 7846253, earn: 51751, earnMoe: 64, earnAlone: 51832, earnAloneMoe: 61, earnWfh: 72311, earnWfhMoe: 259 };

const COMMUTE_ROWS: CommuteRow[] = [
  { fips: "01", abbr: "AL", workers: 2344600, workersMoe: 19254, alone: 1877381, aloneMoe: 21215, pool: 199345, poolMoe: 8044, transit: 7707, transitMoe: 2024, walk: 28842, walkMoe: 3511, bike: 1725, bikeMoe: 930, other: 28010, otherMoe: 3758, wfh: 201590, wfhMoe: 10147, commuters: 2143010, commutersMoe: 19354, bins: [528891, 835117, 452515, 166688, 110052, 49747], binsMoe: [14638, 19488, 13828, 8269, 6626, 4160], agg: 55739230, aggMoe: 840218, earn: 45955, earnMoe: 574, earnAlone: 46321, earnAloneMoe: 561, earnWfh: 57964, earnWfhMoe: 4490 },
  { fips: "02", abbr: "AK", workers: 359647, workersMoe: 5936, alone: 239681, aloneMoe: 6703, pool: 48746, poolMoe: 5615, transit: 2652, transitMoe: 1345, walk: 23676, walkMoe: 2003, bike: 2165, bikeMoe: 824, other: 17171, otherMoe: 2106, wfh: 25556, wfhMoe: 2613, commuters: 334091, commutersMoe: 6315, bins: [148837, 122714, 31579, 12389, 10514, 8058], binsMoe: [6619, 7373, 3469, 2086, 2004, 1709], agg: 6675890, aggMoe: 319678, earn: 54344, earnMoe: 2581, earnAlone: 60875, earnAloneMoe: 1066, earnWfh: 60909, earnWfhMoe: 8050 },
  { fips: "04", abbr: "AZ", workers: 3516108, workersMoe: 25066, alone: 2403937, aloneMoe: 26830, pool: 365084, poolMoe: 14557, transit: 34896, transitMoe: 4254, walk: 55257, walkMoe: 5657, bike: 19100, bikeMoe: 3778, other: 67967, otherMoe: 5630, wfh: 569867, wfhMoe: 18097, commuters: 2946241, commutersMoe: 27511, bins: [704609, 1103331, 674795, 251062, 149782, 62662], binsMoe: [20571, 25596, 20273, 12151, 9564, 6225], agg: 77798410, aggMoe: 1096701, earn: 50893, earnMoe: 337, earnAlone: 51070, earnAloneMoe: 371, earnWfh: 66036, earnWfhMoe: 1281 },
  { fips: "05", abbr: "AR", workers: 1413291, workersMoe: 13354, alone: 1089390, aloneMoe: 13029, pool: 147441, poolMoe: 9316, transit: 2485, transitMoe: 1146, walk: 24166, walkMoe: 3827, bike: 3842, bikeMoe: 1598, other: 21331, otherMoe: 3324, wfh: 124636, wfhMoe: 8282, commuters: 1288655, commutersMoe: 12832, bins: [435069, 464352, 232985, 80954, 46271, 29024], binsMoe: [13532, 14046, 8833, 5326, 3648, 3004], agg: 30027775, aggMoe: 518375, earn: 43893, earnMoe: 936, earnAlone: 45434, earnAloneMoe: 712, earnWfh: 52125, earnWfhMoe: 2750 },
  { fips: "06", abbr: "CA", workers: 18635762, workersMoe: 46197, alone: 12804376, aloneMoe: 51640, pool: 1799272, poolMoe: 31401, transit: 630268, transitMoe: 17220, walk: 446456, walkMoe: 17662, bike: 134140, bikeMoe: 7181, other: 324975, otherMoe: 14970, wfh: 2496275, wfhMoe: 33628, commuters: 16139487, commutersMoe: 44717, bins: [3395367, 5692800, 3659030, 1424026, 1288510, 679754], binsMoe: [41074, 50645, 43037, 26470, 20472, 18986], agg: 480338205, aggMoe: 2749904, earn: 55739, earnMoe: 342, earnAlone: 56096, earnAloneMoe: 386, earnWfh: 80202, earnWfhMoe: 1208 },
  { fips: "08", abbr: "CO", workers: 3166027, workersMoe: 17117, alone: 2122605, aloneMoe: 23303, pool: 258399, poolMoe: 12597, transit: 46686, transitMoe: 4589, walk: 72770, walkMoe: 5590, bike: 30437, bikeMoe: 3453, other: 38759, otherMoe: 4235, wfh: 596371, wfhMoe: 14196, commuters: 2569656, commutersMoe: 19689, bins: [667440, 949165, 568556, 204804, 120299, 59392], binsMoe: [16827, 21137, 15987, 9044, 7552, 4478], agg: 66397905, aggMoe: 858440, earn: 60753, earnMoe: 371, earnAlone: 59734, earnAloneMoe: 1087, earnWfh: 82050, earnWfhMoe: 1978 },
  { fips: "09", abbr: "CT", workers: 1857031, workersMoe: 16931, alone: 1324455, aloneMoe: 18124, pool: 141248, poolMoe: 9668, transit: 78153, transitMoe: 6049, walk: 43819, walkMoe: 4730, bike: 4487, bikeMoe: 1310, other: 34861, otherMoe: 4958, wfh: 230008, wfhMoe: 9113, commuters: 1627023, commutersMoe: 17569, bins: [401555, 606657, 326953, 132360, 92479, 67019], binsMoe: [13569, 17408, 11719, 6720, 6391, 5815], agg: 45804795, aggMoe: 958678, earn: 60731, earnMoe: 541, earnAlone: 61115, earnAloneMoe: 579, earnWfh: 86095, earnWfhMoe: 3668 },
  { fips: "10", abbr: "DE", workers: 502259, workersMoe: 8632, alone: 366944, aloneMoe: 10064, pool: 37546, poolMoe: 5147, transit: 8547, transitMoe: 2178, walk: 7820, walkMoe: 1654, bike: 1651, bikeMoe: 871, other: 9545, otherMoe: 2818, wfh: 70206, wfhMoe: 5677, commuters: 432053, commutersMoe: 9776, bins: [105121, 164444, 90116, 37386, 21332, 13654], binsMoe: [7097, 9544, 6750, 3577, 3226, 2532], agg: 11715635, aggMoe: 456326, earn: 56433, earnMoe: 1375, earnAlone: 56502, earnAloneMoe: 1506, earnWfh: 71551, earnWfhMoe: 6807 },
  { fips: "11", abbr: "DC", workers: 373088, workersMoe: 6701, alone: 105721, aloneMoe: 6910, pool: 17002, poolMoe: 3384, transit: 100268, transitMoe: 6219, walk: 40275, walkMoe: 3685, bike: 15566, bikeMoe: 2440, other: 9694, otherMoe: 2441, wfh: 84562, wfhMoe: 6876, commuters: 288526, commutersMoe: 8136, bins: [34966, 104620, 92183, 36183, 15700, 4874], binsMoe: [4026, 7086, 6411, 4979, 2860, 1378], agg: 8679660, aggMoe: 318225, earn: 87189, earnMoe: 3195, earnAlone: 87021, earnAloneMoe: 4128, earnWfh: 101321, earnWfhMoe: 3154 },
  { fips: "12", abbr: "FL", workers: 11128119, workersMoe: 42240, alone: 7775736, aloneMoe: 53421, pool: 1022569, poolMoe: 27658, transit: 135666, transitMoe: 9957, walk: 174203, walkMoe: 12143, bike: 53521, bikeMoe: 6113, other: 244086, otherMoe: 15582, wfh: 1722338, wfhMoe: 28441, commuters: 9405781, commutersMoe: 42354, bins: [1829583, 3338725, 2333415, 951121, 663836, 289101], binsMoe: [33780, 44683, 37972, 25542, 21390, 14658], agg: 275635665, aggMoe: 1981026, earn: 47949, earnMoe: 453, earnAlone: 47522, earnAloneMoe: 453, earnWfh: 66120, earnWfhMoe: 1065 },
  { fips: "13", abbr: "GA", workers: 5429690, workersMoe: 31443, alone: 3891666, aloneMoe: 34553, pool: 502099, poolMoe: 17350, transit: 60631, transitMoe: 6747, walk: 71807, walkMoe: 5927, bike: 11634, bikeMoe: 1963, other: 104963, otherMoe: 9061, wfh: 786890, wfhMoe: 21250, commuters: 4642800, commutersMoe: 31367, bins: [1014380, 1578094, 1015456, 503226, 366855, 164789], binsMoe: [24437, 30104, 24909, 16459, 14465, 9723], agg: 137770155, aggMoe: 1450743, earn: 50524, earnMoe: 263, earnAlone: 50536, earnAloneMoe: 323, earnWfh: 71741, earnWfhMoe: 1192 },
  { fips: "15", abbr: "HI", workers: 710626, workersMoe: 8725, alone: 466236, aloneMoe: 9876, pool: 105127, poolMoe: 6128, transit: 28630, transitMoe: 2993, walk: 27188, walkMoe: 3113, bike: 5268, bikeMoe: 1397, other: 17203, otherMoe: 2440, wfh: 60974, wfhMoe: 4361, commuters: 649652, commutersMoe: 9693, bins: [155916, 221021, 159541, 55758, 41742, 15674], binsMoe: [7678, 9652, 7820, 4266, 3821, 2521], agg: 17584255, aggMoe: 457115, earn: 53087, earnMoe: 1519, earnAlone: 56941, earnAloneMoe: 1531, earnWfh: 60424, earnWfhMoe: 5299 },
  { fips: "16", abbr: "ID", workers: 959066, workersMoe: 10802, alone: 689018, aloneMoe: 12046, pool: 100636, poolMoe: 6913, transit: 4884, transitMoe: 1160, walk: 20824, walkMoe: 2485, bike: 8451, bikeMoe: 1395, other: 12255, otherMoe: 2322, wfh: 122998, wfhMoe: 6138, commuters: 836068, commutersMoe: 11293, bins: [300735, 293131, 145601, 47948, 30416, 18237], binsMoe: [11172, 9947, 7334, 3659, 3299, 3007], agg: 18995255, aggMoe: 490644, earn: 48439, earnMoe: 1454, earnAlone: 48888, earnAloneMoe: 1729, earnWfh: 64261, earnWfhMoe: 4768 },
  { fips: "17", abbr: "IL", workers: 6269691, workersMoe: 28730, alone: 4160110, aloneMoe: 35212, pool: 522173, poolMoe: 17632, transit: 461032, transitMoe: 15548, walk: 188701, walkMoe: 11071, bike: 31352, bikeMoe: 3793, other: 96554, otherMoe: 8424, wfh: 809769, wfhMoe: 17557, commuters: 5459922, commutersMoe: 33508, bins: [1311676, 1807684, 1232301, 523721, 432367, 152173], binsMoe: [23759, 26047, 23585, 13647, 13497, 7784], agg: 155313470, aggMoe: 1407891, earn: 53831, earnMoe: 788, earnAlone: 52184, earnAloneMoe: 301, earnWfh: 80032, earnWfhMoe: 2148 },
  { fips: "18", abbr: "IN", workers: 3352659, workersMoe: 19225, alone: 2571437, aloneMoe: 20574, pool: 304341, poolMoe: 11627, transit: 20500, transitMoe: 2595, walk: 66483, walkMoe: 5125, bike: 12471, bikeMoe: 2000, other: 48093, otherMoe: 5856, wfh: 329334, wfhMoe: 12429, commuters: 3023325, commutersMoe: 20158, bins: [891452, 1137843, 592729, 208214, 127142, 65945], binsMoe: [20156, 20628, 16667, 9313, 6232, 4706], agg: 74331915, aggMoe: 811244, earn: 49010, earnMoe: 570, earnAlone: 50163, earnAloneMoe: 313, earnWfh: 63259, earnWfhMoe: 2340 },
  { fips: "19", abbr: "IA", workers: 1625721, workersMoe: 10885, alone: 1244406, aloneMoe: 14015, pool: 139279, poolMoe: 7528, transit: 14534, transitMoe: 2505, walk: 42030, walkMoe: 3703, bike: 7323, bikeMoe: 1929, other: 21796, otherMoe: 2640, wfh: 156353, wfhMoe: 7202, commuters: 1469368, commutersMoe: 11871, bins: [598934, 544878, 203824, 60279, 37663, 23790], binsMoe: [13330, 12485, 7308, 3975, 3792, 2606], agg: 29658540, aggMoe: 447229, earn: 50128, earnMoe: 453, earnAlone: 50824, earnAloneMoe: 468, earnWfh: 62289, earnWfhMoe: 3668 },
  { fips: "20", abbr: "KS", workers: 1490389, workersMoe: 13327, alone: 1139786, aloneMoe: 15327, pool: 137362, poolMoe: 8450, transit: 6876, transitMoe: 1595, walk: 33211, walkMoe: 2935, bike: 3301, bikeMoe: 861, other: 17426, otherMoe: 2881, wfh: 152427, wfhMoe: 7403, commuters: 1337962, commutersMoe: 14219, bins: [509939, 517674, 204044, 51877, 32814, 21614], binsMoe: [14075, 14515, 7986, 4498, 3902, 2554], agg: 27402675, aggMoe: 490041, earn: 48141, earnMoe: 966, earnAlone: 49658, earnAloneMoe: 965, earnWfh: 66437, earnWfhMoe: 3164 },
  { fips: "21", abbr: "KY", workers: 2071816, workersMoe: 15946, alone: 1564865, aloneMoe: 20400, pool: 222971, poolMoe: 10714, transit: 12921, transitMoe: 2507, walk: 36613, walkMoe: 3817, bike: 6013, bikeMoe: 2144, other: 27009, otherMoe: 3925, wfh: 201424, wfhMoe: 9183, commuters: 1870392, commutersMoe: 19144, bins: [541688, 725943, 356605, 123466, 80217, 42473], binsMoe: [15326, 16415, 11078, 6478, 5221, 4240], agg: 45799150, aggMoe: 688090, earn: 46202, earnMoe: 611, earnAlone: 47430, earnAloneMoe: 851, earnWfh: 57759, earnWfhMoe: 3925 },
  { fips: "22", abbr: "LA", workers: 2064063, workersMoe: 18633, alone: 1631888, aloneMoe: 21425, pool: 183993, poolMoe: 10510, transit: 18747, transitMoe: 4185, walk: 35017, walkMoe: 3661, bike: 5862, bikeMoe: 1716, other: 34989, otherMoe: 4278, wfh: 153567, wfhMoe: 8199, commuters: 1910496, commutersMoe: 19176, bins: [526727, 730709, 357413, 142923, 96070, 56654], binsMoe: [15470, 19016, 14028, 9146, 7080, 6072], agg: 49415340, aggMoe: 854481, earn: 45818, earnMoe: 784, earnAlone: 47766, earnAloneMoe: 1168, earnWfh: 56193, earnWfhMoe: 3811 },
  { fips: "23", abbr: "ME", workers: 700372, workersMoe: 8192, alone: 503705, aloneMoe: 9212, pool: 59534, poolMoe: 4628, transit: 5898, transitMoe: 1667, walk: 23471, walkMoe: 3177, bike: 2343, bikeMoe: 790, other: 9206, otherMoe: 1976, wfh: 96215, wfhMoe: 5487, commuters: 604157, commutersMoe: 9967, bins: [190299, 208738, 113374, 46622, 29907, 15217], binsMoe: [8411, 9170, 5956, 4406, 2718, 2297], agg: 15018400, aggMoe: 351214, earn: 52045, earnMoe: 579, earnAlone: 52223, earnAloneMoe: 679, earnWfh: 71795, earnWfhMoe: 2512 },
  { fips: "24", abbr: "MD", workers: 3179937, workersMoe: 21959, alone: 2167856, aloneMoe: 23762, pool: 261685, poolMoe: 14382, transit: 174860, transitMoe: 10198, walk: 63419, walkMoe: 5896, bike: 8938, bikeMoe: 2054, other: 67487, otherMoe: 7724, wfh: 435692, wfhMoe: 12713, commuters: 2744245, commutersMoe: 22000, bins: [456916, 841701, 671032, 344279, 286931, 143386], binsMoe: [15872, 20947, 18829, 15235, 11334, 9284], agg: 92477670, aggMoe: 1256266, earn: 64264, earnMoe: 1459, earnAlone: 65539, earnAloneMoe: 722, earnWfh: 90535, earnWfhMoe: 2186 },
  { fips: "25", abbr: "MA", workers: 3687781, workersMoe: 24281, alone: 2314311, aloneMoe: 20970, pool: 275275, poolMoe: 12878, transit: 309867, transitMoe: 13737, walk: 156633, walkMoe: 7936, bike: 35489, bikeMoe: 4063, other: 71931, otherMoe: 6705, wfh: 524275, wfhMoe: 14864, commuters: 3163506, commutersMoe: 21850, bins: [657105, 1008762, 735294, 344487, 295193, 122665], binsMoe: [18441, 20784, 19790, 12985, 11524, 7947], agg: 97460935, aggMoe: 1302963, earn: 65529, earnMoe: 602, earnAlone: 64838, earnAloneMoe: 1138, earnWfh: 91068, earnWfhMoe: 1910 },
  { fips: "26", abbr: "MI", workers: 4755644, workersMoe: 24046, alone: 3589418, aloneMoe: 23895, pool: 418402, poolMoe: 15559, transit: 43058, transitMoe: 4495, walk: 96546, walkMoe: 6130, bike: 16258, bikeMoe: 2539, other: 63506, otherMoe: 6139, wfh: 528456, wfhMoe: 13198, commuters: 4227188, commutersMoe: 24961, bins: [1169771, 1634134, 835953, 307300, 192031, 87999], binsMoe: [20167, 24295, 16192, 10324, 6791, 5979], agg: 105567265, aggMoe: 910375, earn: 50232, earnMoe: 241, earnAlone: 50945, earnAloneMoe: 240, earnWfh: 66734, earnWfhMoe: 1706 },
  { fips: "27", abbr: "MN", workers: 2999334, workersMoe: 15837, alone: 2135627, aloneMoe: 17552, pool: 226248, poolMoe: 9560, transit: 56136, transitMoe: 5314, walk: 79011, walkMoe: 5193, bike: 19412, bikeMoe: 2509, other: 39953, otherMoe: 3939, wfh: 442947, wfhMoe: 10390, commuters: 2556387, commutersMoe: 16637, bins: [787213, 991014, 482433, 155920, 93156, 46651], binsMoe: [15648, 19284, 12305, 7679, 5513, 3201], agg: 59967675, aggMoe: 711023, earn: 56924, earnMoe: 473, earnAlone: 57226, earnAloneMoe: 574, earnWfh: 77084, earnWfhMoe: 1721 },
  { fips: "28", abbr: "MS", workers: 1293969, workersMoe: 14207, alone: 1035109, aloneMoe: 17029, pool: 121532, poolMoe: 8883, transit: 4301, transitMoe: 1839, walk: 20643, walkMoe: 3511, bike: 2687, bikeMoe: 1144, other: 26211, otherMoe: 3821, wfh: 83486, wfhMoe: 6773, commuters: 1210483, commutersMoe: 15883, bins: [334663, 440551, 246159, 91004, 57860, 40246], binsMoe: [12390, 14088, 10266, 5927, 4172, 3883], agg: 32146010, aggMoe: 731356, earn: 41445, earnMoe: 466, earnAlone: 42167, earnAloneMoe: 544, earnWfh: 46058, earnWfhMoe: 3097 },
  { fips: "29", abbr: "MO", workers: 3037995, workersMoe: 17899, alone: 2287211, aloneMoe: 21551, pool: 268748, poolMoe: 11526, transit: 24401, transitMoe: 4149, walk: 61890, walkMoe: 5335, bike: 7229, bikeMoe: 1589, other: 39722, otherMoe: 4651, wfh: 348794, wfhMoe: 10592, commuters: 2689201, commutersMoe: 21168, bins: [777031, 1052632, 522627, 180315, 101641, 54955], binsMoe: [17783, 20384, 13763, 9010, 6116, 4343], agg: 65046355, aggMoe: 875001, earn: 48847, earnMoe: 681, earnAlone: 49678, earnAloneMoe: 726, earnWfh: 66080, earnWfhMoe: 1486 },
  { fips: "30", abbr: "MT", workers: 561953, workersMoe: 6973, alone: 408362, aloneMoe: 8885, pool: 45330, poolMoe: 4553, transit: 4401, transitMoe: 1230, walk: 24656, walkMoe: 3225, bike: 4881, bikeMoe: 1538, other: 6487, otherMoe: 1442, wfh: 67836, wfhMoe: 4868, commuters: 494117, commutersMoe: 7847, bins: [214458, 180502, 54815, 17214, 15058, 12070], binsMoe: [8440, 8124, 4046, 2172, 2436, 1826], agg: 9904470, aggMoe: 305221, earn: 47339, earnMoe: 1584, earnAlone: 49037, earnAloneMoe: 2325, earnWfh: 54495, earnWfhMoe: 5359 },
  { fips: "31", abbr: "NE", workers: 1044976, workersMoe: 8782, alone: 804366, aloneMoe: 9952, pool: 98442, poolMoe: 7093, transit: 6228, transitMoe: 1918, walk: 29914, walkMoe: 3287, bike: 2534, bikeMoe: 885, other: 10228, otherMoe: 1905, wfh: 93264, wfhMoe: 5407, commuters: 951712, commutersMoe: 8745, bins: [381981, 370843, 127903, 36588, 21813, 12584], binsMoe: [11353, 11347, 6445, 4078, 2890, 2539], agg: 18629950, aggMoe: 411425, earn: 50908, earnMoe: 480, earnAlone: 51782, earnAloneMoe: 535, earnWfh: 62444, earnWfhMoe: 4993 },
  { fips: "32", abbr: "NV", workers: 1605977, workersMoe: 17148, alone: 1135126, aloneMoe: 18001, pool: 191762, poolMoe: 12916, transit: 38322, transitMoe: 4869, walk: 22291, walkMoe: 3477, bike: 7723, bikeMoe: 2217, other: 48034, otherMoe: 6665, wfh: 162719, wfhMoe: 9624, commuters: 1443258, commutersMoe: 18069, bins: [329349, 604838, 350609, 76719, 49512, 32231], binsMoe: [14275, 20006, 14614, 7585, 5092, 4180], agg: 36380080, aggMoe: 853406, earn: 49270, earnMoe: 1193, earnAlone: 50570, earnAloneMoe: 611, earnWfh: 63019, earnWfhMoe: 4276 },
  { fips: "33", abbr: "NH", workers: 757025, workersMoe: 8547, alone: 561324, aloneMoe: 10171, pool: 54506, poolMoe: 5318, transit: 4057, transitMoe: 1270, walk: 18178, walkMoe: 2084, bike: 2066, bikeMoe: 784, other: 7741, otherMoe: 1720, wfh: 109153, wfhMoe: 6070, commuters: 647872, commutersMoe: 10223, bins: [178910, 218783, 140658, 52102, 39485, 17934], binsMoe: [8923, 8827, 6935, 4294, 3524, 2691], agg: 17284155, aggMoe: 475721, earn: 60484, earnMoe: 994, earnAlone: 58706, earnAloneMoe: 2604, earnWfh: 85180, earnWfhMoe: 4710 },
  { fips: "34", abbr: "NJ", workers: 4828177, workersMoe: 24936, alone: 3080468, aloneMoe: 27947, pool: 392555, poolMoe: 15584, transit: 479229, transitMoe: 13075, walk: 127337, walkMoe: 8712, bike: 16960, bikeMoe: 3221, other: 104533, otherMoe: 8223, wfh: 627095, wfhMoe: 16579, commuters: 4201082, commutersMoe: 27680, bins: [841723, 1350179, 924718, 431139, 430286, 223037], binsMoe: [21585, 26677, 20185, 14879, 13963, 11410], agg: 135274975, aggMoe: 1542645, earn: 61101, earnMoe: 413, earnAlone: 60609, earnAloneMoe: 462, earnWfh: 90300, earnWfhMoe: 2386 },
  { fips: "35", abbr: "NM", workers: 955432, workersMoe: 11487, alone: 711092, aloneMoe: 13327, pool: 102072, poolMoe: 7481, transit: 7165, transitMoe: 2017, walk: 20477, walkMoe: 3242, bike: 4160, bikeMoe: 1084, other: 14161, otherMoe: 2559, wfh: 96305, wfhMoe: 7131, commuters: 859127, commutersMoe: 12364, bins: [277509, 313347, 149482, 58504, 36999, 23286], binsMoe: [11293, 12455, 8423, 6067, 4077, 3348], agg: 20667320, aggMoe: 625641, earn: 43397, earnMoe: 1772, earnAlone: 45015, earnAloneMoe: 1437, earnWfh: 51216, earnWfhMoe: 2789 },
  { fips: "36", abbr: "NY", workers: 9654086, workersMoe: 42930, alone: 4662789, aloneMoe: 37775, pool: 593590, poolMoe: 17660, transit: 2446051, transitMoe: 32847, walk: 561003, walkMoe: 18201, bike: 87102, bikeMoe: 8770, other: 196795, otherMoe: 10987, wfh: 1106756, wfhMoe: 23217, commuters: 8547330, commutersMoe: 40956, bins: [1621659, 2553594, 1907020, 934471, 1058103, 472483], binsMoe: [26049, 37639, 29436, 20651, 22687, 16197], agg: 286092385, aggMoe: 2208210, earn: 56787, earnMoe: 398, earnAlone: 57469, earnAloneMoe: 727, earnWfh: 72701, earnWfhMoe: 2255 },
  { fips: "37", abbr: "NC", workers: 5419398, workersMoe: 28216, alone: 3890450, aloneMoe: 31553, pool: 494687, poolMoe: 16503, transit: 38360, transitMoe: 5410, walk: 92769, walkMoe: 6735, bike: 9527, bikeMoe: 1995, other: 73981, otherMoe: 6751, wfh: 819624, wfhMoe: 18927, commuters: 4599774, commutersMoe: 28786, bins: [1150856, 1796536, 976329, 358105, 220295, 97653], binsMoe: [23714, 28871, 24874, 13412, 10469, 6148], agg: 118059220, aggMoe: 1300456, earn: 50080, earnMoe: 371, earnAlone: 50065, earnAloneMoe: 509, earnWfh: 70870, earnWfhMoe: 1338 },
  { fips: "38", abbr: "ND", workers: 426586, workersMoe: 5702, alone: 335922, aloneMoe: 7617, pool: 40491, poolMoe: 4786, transit: 1206, transitMoe: 554, walk: 13954, walkMoe: 2206, bike: 987, bikeMoe: 601, other: 7214, otherMoe: 1921, wfh: 26812, wfhMoe: 2865, commuters: 399774, commutersMoe: 6809, bins: [198036, 143001, 27450, 10408, 12775, 8104], binsMoe: [8480, 7497, 2803, 1794, 2344, 1746], agg: 7240650, aggMoe: 328255, earn: 51842, earnMoe: 538, earnAlone: 53144, earnAloneMoe: 1455, earnWfh: 58784, earnWfhMoe: 6267 },
  { fips: "39", abbr: "OH", workers: 5753655, workersMoe: 26108, alone: 4363384, aloneMoe: 28913, pool: 464142, poolMoe: 16984, transit: 59805, transitMoe: 5640, walk: 115591, walkMoe: 7095, bike: 18362, bikeMoe: 2733, other: 80756, otherMoe: 6547, wfh: 651615, wfhMoe: 16880, commuters: 5102040, commutersMoe: 28602, bins: [1402463, 2069669, 1047746, 313386, 174282, 94494], binsMoe: [23232, 28280, 19293, 11094, 7283, 6186], agg: 122905540, aggMoe: 1084914, earn: 50345, earnMoe: 244, earnAlone: 50939, earnAloneMoe: 268, earnWfh: 69018, earnWfhMoe: 2760 },
  { fips: "40", abbr: "OK", workers: 1892255, workersMoe: 12805, alone: 1470944, aloneMoe: 14922, pool: 195317, poolMoe: 8097, transit: 4059, transitMoe: 871, walk: 32195, walkMoe: 2793, bike: 3285, bikeMoe: 1019, other: 22241, otherMoe: 2616, wfh: 164214, wfhMoe: 6358, commuters: 1728041, commutersMoe: 14310, bins: [555039, 666142, 317547, 95118, 55786, 38409], binsMoe: [12836, 13607, 9075, 5319, 3946, 3188], agg: 39977800, aggMoe: 639124, earn: 44140, earnMoe: 646, earnAlone: 45589, earnAloneMoe: 514, earnWfh: 53724, earnWfhMoe: 2558 },
  { fips: "41", abbr: "OR", workers: 2037946, workersMoe: 18693, alone: 1372287, aloneMoe: 19006, pool: 172116, poolMoe: 10724, transit: 57897, transitMoe: 5833, walk: 74647, walkMoe: 6265, bike: 23146, bikeMoe: 2944, other: 29840, otherMoe: 3967, wfh: 308013, wfhMoe: 10694, commuters: 1729933, commutersMoe: 18828, bins: [533846, 662841, 311211, 111303, 79525, 31207], binsMoe: [15635, 16113, 11814, 6797, 6704, 3075], agg: 40761205, aggMoe: 620195, earn: 52862, earnMoe: 1003, earnAlone: 53010, earnAloneMoe: 1121, earnWfh: 76411, earnWfhMoe: 2140 },
  { fips: "42", abbr: "PA", workers: 6342083, workersMoe: 34989, alone: 4334091, aloneMoe: 34843, pool: 501552, poolMoe: 15514, transit: 272221, transitMoe: 12745, walk: 228076, walkMoe: 8566, bike: 33196, bikeMoe: 3796, other: 107649, otherMoe: 7958, wfh: 865298, wfhMoe: 19992, commuters: 5476785, commutersMoe: 34871, bins: [1384959, 1973545, 1164341, 471981, 323316, 158643], binsMoe: [23752, 30947, 21862, 15761, 12062, 10511], agg: 148525195, aggMoe: 1602382, earn: 52311, earnMoe: 232, earnAlone: 53072, earnAloneMoe: 659, earnWfh: 72488, earnWfhMoe: 2093 },
  { fips: "44", abbr: "RI", workers: 568214, workersMoe: 9480, alone: 402760, aloneMoe: 10075, pool: 48478, poolMoe: 6519, transit: 15406, transitMoe: 3090, walk: 21498, walkMoe: 3593, bike: 3028, bikeMoe: 1149, other: 11942, otherMoe: 3085, wfh: 65102, wfhMoe: 5368, commuters: 503112, commutersMoe: 9147, bins: [124791, 190258, 102648, 41437, 31642, 12336], binsMoe: [8785, 10501, 7599, 5524, 5130, 2788], agg: 13354680, aggMoe: 434181, earn: 55452, earnMoe: 1636, earnAlone: 55927, earnAloneMoe: 1423, earnWfh: 77390, earnWfhMoe: 7817 },
  { fips: "45", abbr: "SC", workers: 2599763, workersMoe: 22044, alone: 1962150, aloneMoe: 21522, pool: 239234, poolMoe: 11176, transit: 13064, transitMoe: 2361, walk: 41280, walkMoe: 4340, bike: 3271, bikeMoe: 954, other: 38121, otherMoe: 4515, wfh: 302643, wfhMoe: 10639, commuters: 2297120, commutersMoe: 22340, bins: [548525, 852940, 513858, 198086, 122637, 61074], binsMoe: [15273, 20894, 15930, 9734, 8550, 5034], agg: 62109540, aggMoe: 964342, earn: 47201, earnMoe: 657, earnAlone: 47770, earnAloneMoe: 857, earnWfh: 67246, earnWfhMoe: 3340 },
  { fips: "46", abbr: "SD", workers: 475348, workersMoe: 6809, alone: 364984, aloneMoe: 8198, pool: 40490, poolMoe: 4591, transit: 799, transitMoe: 467, walk: 14853, walkMoe: 1761, bike: 741, bikeMoe: 464, other: 6778, otherMoe: 1346, wfh: 46703, wfhMoe: 4050, commuters: 428645, commutersMoe: 7387, bins: [201032, 157121, 42662, 12298, 9656, 5876], binsMoe: [8220, 7241, 3547, 1858, 1781, 1168], agg: 7640620, aggMoe: 261343, earn: 50468, earnMoe: 651, earnAlone: 51166, earnAloneMoe: 680, earnWfh: 60688, earnWfhMoe: 4727 },
  { fips: "47", abbr: "TN", workers: 3513161, workersMoe: 22820, alone: 2647831, aloneMoe: 24564, pool: 309923, poolMoe: 11294, transit: 16925, transitMoe: 4070, walk: 44095, walkMoe: 4654, bike: 3156, bikeMoe: 1113, other: 51365, otherMoe: 5309, wfh: 439866, wfhMoe: 12521, commuters: 3073295, commutersMoe: 24246, bins: [736523, 1172498, 658890, 268962, 172204, 64218], binsMoe: [18552, 23969, 19573, 12760, 8692, 6246], agg: 81254715, aggMoe: 1111817, earn: 48128, earnMoe: 842, earnAlone: 47967, earnAloneMoe: 947, earnWfh: 68330, earnWfhMoe: 3666 },
  { fips: "48", abbr: "TX", workers: 15278739, workersMoe: 51237, alone: 11051873, aloneMoe: 50638, pool: 1577041, poolMoe: 34448, transit: 142393, transitMoe: 10915, walk: 217240, walkMoe: 12407, bike: 33983, bikeMoe: 4976, other: 280624, otherMoe: 15582, wfh: 1975585, wfhMoe: 35223, commuters: 13303154, commutersMoe: 50630, bins: [3121859, 4727119, 2941995, 1234671, 910223, 367287], binsMoe: [40534, 59031, 36423, 22120, 26049, 14085], agg: 370134050, aggMoe: 2455825, earn: 50153, earnMoe: 176, earnAlone: 50505, earnAloneMoe: 198, earnWfh: 70114, earnWfhMoe: 1335 },
  { fips: "49", abbr: "UT", workers: 1794708, workersMoe: 13779, alone: 1233657, aloneMoe: 16593, pool: 182869, poolMoe: 11337, transit: 33345, transitMoe: 4270, walk: 43325, walkMoe: 4541, bike: 10676, bikeMoe: 1783, other: 22948, otherMoe: 3369, wfh: 267888, wfhMoe: 9680, commuters: 1526820, commutersMoe: 13018, bins: [454260, 603940, 285713, 89861, 63381, 29665], binsMoe: [12730, 15224, 12007, 5646, 5308, 3964], agg: 36138175, aggMoe: 644628, earn: 50736, earnMoe: 492, earnAlone: 51465, earnAloneMoe: 572, earnWfh: 62249, earnWfhMoe: 2008 },
  { fips: "50", abbr: "VT", workers: 336494, workersMoe: 5861, alone: 233098, aloneMoe: 6464, pool: 28272, poolMoe: 3283, transit: 2749, transitMoe: 1151, walk: 13379, walkMoe: 1825, bike: 2087, bikeMoe: 800, other: 3479, otherMoe: 1147, wfh: 53430, wfhMoe: 4358, commuters: 283064, commutersMoe: 6618, bins: [82385, 107313, 58084, 19633, 9606, 6043], binsMoe: [5494, 6020, 3969, 1923, 1760, 1434], agg: 6846320, aggMoe: 259740, earn: 52906, earnMoe: 1902, earnAlone: 52983, earnAloneMoe: 2022, earnWfh: 70647, earnWfhMoe: 4939 },
  { fips: "51", abbr: "VA", workers: 4485851, workersMoe: 19396, alone: 3167870, aloneMoe: 23835, pool: 361903, poolMoe: 15267, transit: 142787, transitMoe: 7560, walk: 101683, walkMoe: 6544, bike: 12556, bikeMoe: 2481, other: 74879, otherMoe: 6425, wfh: 624173, wfhMoe: 15171, commuters: 3861678, commutersMoe: 23390, bins: [855774, 1423561, 844404, 367115, 258090, 112734], binsMoe: [17815, 25012, 19046, 11768, 10272, 8075], agg: 108850960, aggMoe: 1239663, earn: 58842, earnMoe: 894, earnAlone: 58178, earnAloneMoe: 813, earnWfh: 82642, earnWfhMoe: 2915 },
  { fips: "53", abbr: "WA", workers: 3912058, workersMoe: 22023, alone: 2546482, aloneMoe: 23138, pool: 365727, poolMoe: 14084, transit: 195701, transitMoe: 10732, walk: 112669, walkMoe: 6777, bike: 28477, bikeMoe: 4119, other: 48804, otherMoe: 4763, wfh: 614198, wfhMoe: 13673, commuters: 3297860, commutersMoe: 20950, bins: [819637, 1198223, 688629, 282117, 208385, 100869], binsMoe: [19886, 24301, 17572, 11765, 9821, 6149], agg: 90158000, aggMoe: 1038754, earn: 61985, earnMoe: 344, earnAlone: 60919, earnAloneMoe: 424, earnWfh: 89672, earnWfhMoe: 2875 },
  { fips: "54", abbr: "WV", workers: 737038, workersMoe: 10452, alone: 576666, aloneMoe: 10260, pool: 67280, poolMoe: 5747, transit: 6259, transitMoe: 1598, walk: 15929, walkMoe: 2069, bike: 928, bikeMoe: 660, other: 9280, otherMoe: 2036, wfh: 60696, wfhMoe: 4156, commuters: 676342, commutersMoe: 10368, bins: [192588, 242270, 118852, 49558, 43852, 29222], binsMoe: [8936, 10062, 6799, 3843, 3992, 3615], agg: 18526320, aggMoe: 508334, earn: 45293, earnMoe: 1053, earnAlone: 46576, earnAloneMoe: 1236, earnWfh: 55611, earnWfhMoe: 3810 },
  { fips: "55", abbr: "WI", workers: 3025750, workersMoe: 15734, alone: 2265259, aloneMoe: 17595, pool: 234487, poolMoe: 10067, transit: 37800, transitMoe: 4337, walk: 80024, walkMoe: 5528, bike: 17105, bikeMoe: 2802, other: 39451, otherMoe: 3999, wfh: 351624, wfhMoe: 9945, commuters: 2674126, commutersMoe: 17080, bins: [878644, 1020535, 476247, 150078, 90606, 58016], binsMoe: [16103, 17414, 12401, 7053, 4493, 4768], agg: 62165495, aggMoe: 773554, earn: 51725, earnMoe: 282, earnAlone: 52207, earnAloneMoe: 313, earnWfh: 65667, earnWfhMoe: 1462 },
  { fips: "56", abbr: "WY", workers: 283095, workersMoe: 5627, alone: 211267, aloneMoe: 7279, pool: 23847, poolMoe: 2942, transit: 1733, transitMoe: 707, walk: 8635, walkMoe: 1641, bike: 2209, bikeMoe: 965, other: 2633, otherMoe: 1016, wfh: 32771, wfhMoe: 3592, commuters: 250324, commutersMoe: 6445, bins: [128591, 73196, 21115, 9242, 11095, 7085], binsMoe: [6738, 5353, 3115, 2005, 2098, 1971], agg: 4903520, aggMoe: 305544, earn: 50778, earnMoe: 1268, earnAlone: 51851, earnAloneMoe: 2195, earnWfh: 51887, earnWfhMoe: 10976 },
];

export interface CommuteResult extends CommuteRow {
  name: string;
  /** 1 = the longest mean one-way commute */
  rank: number;
  /** B19013 median household income, dollars */
  income: number;
  /** mean one-way travel time of the commuters, minutes */
  meanMin: Ratio;
  /** round-trip hours a year at the report's 250 commuting days */
  hoursYear: Ratio;
  /** hours a year of all commuters together, from the aggregate minutes */
  totalHours: Ratio;
  /** effective hourly pay lost when the round trip counts as time given to the job, percent */
  payDrop: Share;
  /** commuters in each travel-time group, as a share of commuters */
  binShares: Share[];
  /** commuters with a one-way trip of 45 minutes or more */
  long45: Share;
  /** commuters with a one-way trip of 60 minutes or more */
  long60: Share;
  /** workers who worked from home, as a share of all workers */
  wfhShare: Share;
  aloneShare: Share;
  poolShare: Share;
  transitShare: Share;
  /** walked plus bicycled, as a share of all workers */
  walkBikeShare: Share;
  otherShare: Share;
  /** median earnings of workers who worked from home divided by that of workers who drove alone */
  earnRatio: Ratio;
}

function compute(row: CommuteRow, name: string, income: number): Omit<CommuteResult, "rank"> {
  const meanMin = ratio(row.agg, row.aggMoe, row.commuters, row.commutersMoe);
  const perYear = (2 * REPORT.commuteDays) / 60;
  const hoursYear: Ratio = { value: commuteHoursPerYear(meanMin.value), moe: meanMin.moe * perYear };
  const dropLow = payDropPct(Math.max(0, hoursYear.value - hoursYear.moe));
  const dropHigh = payDropPct(hoursYear.value + hoursYear.moe);
  const sumMoe = (idx: number[]) => rss(idx.map((i) => row.binsMoe[i]));
  const sumBins = (idx: number[]) => idx.reduce((s, i) => s + row.bins[i], 0);
  const long45Idx = [3, 4, 5];
  const long60Idx = [4, 5];
  return {
    ...row,
    name,
    income,
    meanMin,
    hoursYear,
    totalHours: { value: row.agg * perYear, moe: row.aggMoe * perYear },
    payDrop: { pct: payDropPct(hoursYear.value), moe: (dropHigh - dropLow) / 2 },
    binShares: row.bins.map((n, i) => share(n, row.binsMoe[i], row.commuters, row.commutersMoe)),
    long45: share(sumBins(long45Idx), sumMoe(long45Idx), row.commuters, row.commutersMoe),
    long60: share(sumBins(long60Idx), sumMoe(long60Idx), row.commuters, row.commutersMoe),
    wfhShare: share(row.wfh, row.wfhMoe, row.workers, row.workersMoe),
    aloneShare: share(row.alone, row.aloneMoe, row.workers, row.workersMoe),
    poolShare: share(row.pool, row.poolMoe, row.workers, row.workersMoe),
    transitShare: share(row.transit, row.transitMoe, row.workers, row.workersMoe),
    walkBikeShare: share(row.walk + row.bike, rss([row.walkMoe, row.bikeMoe]), row.workers, row.workersMoe),
    otherShare: share(row.other, row.otherMoe, row.workers, row.workersMoe),
    earnRatio: ratio(row.earnWfh, row.earnWfhMoe, row.earnAlone, row.earnAloneMoe),
  };
}

/** All 50 states and DC, ranked from the longest to the shortest mean one-way commute. */
export const STATE_RESULTS: CommuteResult[] = COMMUTE_ROWS.map((row) => {
  const base = STATE_ROWS.find((s) => s.fips === row.fips);
  if (!base) throw new Error(`Missing income input for FIPS ${row.fips}`);
  if (base.abbr !== row.abbr) throw new Error(`State mismatch for FIPS ${row.fips}`);
  return compute(row, base.name, base.income);
})
  .sort((a, b) => b.meanMin.value - a.meanMin.value)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<CommuteResult, "rank"> = compute(US_COMMUTE_ROW, "United States", US_ROW.income);

export function getStateResult(abbr: string): CommuteResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_longest_mean_one_way_commute",
  "state",
  "abbr",
  "fips",
  "workers_16plus",
  "workers_who_commute",
  "mean_one_way_commute_minutes",
  "mean_one_way_commute_minutes_moe90_minutes",
  "round_trip_commute_hours_per_year",
  "round_trip_commute_hours_per_year_moe90_hours",
  "effective_hourly_pay_drop_pct",
  "effective_hourly_pay_drop_moe90_pts",
  "commuters_under_15_minutes_pct",
  "commuters_15_to_29_minutes_pct",
  "commuters_30_to_44_minutes_pct",
  "commuters_45_to_59_minutes_pct",
  "commuters_60_to_89_minutes_pct",
  "commuters_90_plus_minutes_pct",
  "commuters_60_plus_minutes",
  "commuters_60_plus_minutes_pct",
  "commuters_60_plus_minutes_pct_moe90_pts",
  "worked_from_home_workers",
  "worked_from_home_pct",
  "worked_from_home_pct_moe90_pts",
  "drove_alone_pct",
  "drove_alone_pct_moe90_pts",
  "carpooled_pct",
  "public_transit_pct",
  "public_transit_pct_moe90_pts",
  "walked_or_bicycled_pct",
  "other_means_pct",
  "median_earnings_all_workers_usd",
  "median_earnings_all_workers_moe90_usd",
  "median_earnings_drove_alone_usd",
  "median_earnings_drove_alone_moe90_usd",
  "median_earnings_worked_from_home_usd",
  "median_earnings_worked_from_home_moe90_usd",
  "worked_from_home_to_drove_alone_earnings_ratio",
  "worked_from_home_to_drove_alone_earnings_ratio_moe90",
  "median_household_income_usd",
] as const;

function csvLine(r: CommuteResult | (Omit<CommuteResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.workers,
    r.commuters,
    round(r.meanMin.value, 2),
    round(r.meanMin.moe, 2),
    round(r.hoursYear.value, 1),
    round(r.hoursYear.moe, 1),
    round(r.payDrop.pct, 2),
    round(r.payDrop.moe, 2),
    ...r.binShares.map((s) => round(s.pct, 2)),
    r.bins[4] + r.bins[5],
    round(r.long60.pct, 2),
    round(r.long60.moe, 2),
    r.wfh,
    round(r.wfhShare.pct, 2),
    round(r.wfhShare.moe, 2),
    round(r.aloneShare.pct, 2),
    round(r.aloneShare.moe, 2),
    round(r.poolShare.pct, 2),
    round(r.transitShare.pct, 2),
    round(r.transitShare.moe, 2),
    round(r.walkBikeShare.pct, 2),
    round(r.otherShare.pct, 2),
    r.earn,
    r.earnMoe,
    r.earnAlone,
    r.earnAloneMoe,
    r.earnWfh,
    r.earnWfhMoe,
    round(r.earnRatio.value, 3),
    round(r.earnRatio.moe, 3),
    r.income,
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [CSV_HEADER.join(","), ...STATE_RESULTS.map(csvLine), csvLine(US_RESULT)].join("\n") + "\n";
}
