/**
 * Data and calculations for the "Car Ownership by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * New inputs (ACS 2025 1-year) were read on 2026-11-12 from the Census Bureau's table-based ACS
 * Summary File (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData,
 * files acsdt1y2025-b25044 and acsdt1y2025-b25046; b25003 in the same folder was used only for the
 * tie-out below). The Census API requires a key and was not used.
 *
 * What is stored: for every place, the number of occupied housing units (households) with no
 * vehicle, 1, 2, 3, 4, and 5 or more vehicles available (B25044, owner and renter households added
 * together), the margins of error of each of those six counts, the owner and renter household
 * totals and the owner and renter households with no vehicle, the household total, and the aggregate
 * number of vehicles available (B25046_001). A margin of error for a sum is the square root of the
 * sum of the squared published margins, and a margin of error for a share or a ratio follows the
 * formulas in the ACS General Handbook, chapter 8.
 * Checks: all 50 states, DC, and the U.S. row were present (Puerto Rico was dropped, as in the
 * companion reports); in all 52 rows the six vehicle counts add up to the household total, the
 * owner and renter households add up to the household total, the owner and renter vehicle counts
 * add up to each tenure total, the owner total equals the owner-occupied count in B25003_002 (U.S.
 * 87,511,734, the same owner total stored for the insurance and housing-cost-burden reports), the
 * published aggregate number of vehicles (B25046_001) is at least the minimum implied by the
 * counts (the 5-or-more group counted as exactly 5), and no cell is missing or a Census placeholder.
 *
 * Median household income (B19013) is NOT stored again here: it comes from the mortgage
 * affordability report's STATE_ROWS, so all the reports use the same income figures. The guard
 * below fails the build if that report moves to a different ACS year before this one does.
 *
 * Cost inputs are national figures from AAA's Your Driving Costs 2026 study (September 2026) and
 * are applied to every state the same way. They describe what a NEW vehicle costs a typical driver
 * who drives 15,000 miles a year; the report uses them to show how much of local income that
 * ownership model would take, not to claim what households in a state actually spend.
 */

import {
  REPORT as AFFORDABILITY_REPORT,
  STATE_ROWS,
  US_ROW,
  pct1,
  usd0,
} from "./mortgage-affordability-by-state";

export { pct1, usd0 };

export const REPORT = {
  slug: "car-ownership-by-state",
  path: "/reports/car-ownership-by-state",
  csvPath: "/reports/car-ownership-by-state/data.csv",
  datePublished: "2026-11-12",
  dateModified: "2026-11-12",
  /** ACS survey year of every vehicle and income figure */
  acsYear: 2025,
  /** The 20/4/10 rule: payment plus insurance plus fuel at or below this share of gross income */
  guidelinePct: 10,
} as const;

if (AFFORDABILITY_REPORT.acsYear !== REPORT.acsYear) {
  throw new Error(
    `car-ownership-by-state uses ACS ${REPORT.acsYear} but mortgage-affordability-by-state now uses ACS ` +
      `${AFFORDABILITY_REPORT.acsYear}. Refresh the vehicle rows in ` +
      `src/lib/reports/car-ownership-by-state.ts (tables B25044 and B25046) in the same change.`,
  );
}

/**
 * AAA, Your Driving Costs 2026 fact sheet (September 2026): average cost to own and operate a new
 * vehicle, five years and 75,000 miles of ownership, 15,000 miles a year. Category figures are
 * quoted as published; fuel and maintenance are published per mile and are converted to a year at
 * 15,000 miles. The categories add up to $12,856, $7 below the published $12,863 total because AAA
 * rounds the per-mile figures.
 */
export const AAA = {
  year: 2026,
  milesPerYear: 15_000,
  total: 12_863,
  depreciation: 4_422,
  finance: 1_184,
  insurance: 2_098,
  licenseRegistrationTaxes: 802,
  fuelCentsPerMile: 17.3,
  maintenanceCentsPerMile: 11.7,
  regularGasPerGallon: 4.152,
  weightedMsrp: 39_376,
  priorYearTotal: 11_577,
} as const;

export const AAA_FUEL_PER_YEAR = Math.round((AAA.fuelCentsPerMile / 100) * AAA.milesPerYear);
export const AAA_MAINTENANCE_PER_YEAR = Math.round((AAA.maintenanceCentsPerMile / 100) * AAA.milesPerYear);
/** Insurance plus fuel: the two operating costs that count inside the 20/4/10 "10%" bucket */
export const INSURANCE_FUEL_PER_VEHICLE = AAA.insurance + AAA_FUEL_PER_YEAR;
/** Insurance, fuel, maintenance, and registration: what a paid-off vehicle costs to keep on the road */
export const RUNNING_PER_VEHICLE =
  AAA.insurance + AAA_FUEL_PER_YEAR + AAA_MAINTENANCE_PER_YEAR + AAA.licenseRegistrationTaxes;

export const REPORT_SOURCES = {
  acsVehicles: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25044 (tenure by vehicles available)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25044",
  },
  acsAggregate: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25046 (aggregate number of vehicles available by tenure)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25046",
  },
  acsIncome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B19013 (median household income)",
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
    label: "Census Bureau, 2025 ACS Subject Definitions (Vehicles Available)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
  aaa: {
    label: "AAA, Your Driving Costs 2026 fact sheet (September 2026)",
    href: "https://newsroom.aaa.com/wp-content/uploads/2026/09/AAA_YDC-Fact-Sheet_2026.pdf",
  },
} as const;

/** Households by number of vehicles available: none, 1, 2, 3, 4, and 5 or more. */
export const VEHICLE_LABELS = ["No vehicle", "1 vehicle", "2 vehicles", "3 vehicles", "4 vehicles", "5 or more vehicles"] as const;

export interface VehicleRow {
  fips: string;
  abbr: string;
  /** B25044_001: occupied housing units (households) */
  hh: number;
  hhMoe: number;
  /** households with 0, 1, 2, 3, 4, and 5+ vehicles available (owner plus renter) */
  bins: number[];
  binsMoe: number[];
  /** B25044_002 and _003: owner-occupied households, and those with no vehicle */
  ownerBase: number;
  ownerBaseMoe: number;
  ownerNone: number;
  ownerNoneMoe: number;
  /** B25044_009 and _010: renter-occupied households, and those with no vehicle */
  renterBase: number;
  renterBaseMoe: number;
  renterNone: number;
  renterNoneMoe: number;
  /** B25046_001: aggregate number of vehicles available to all occupied housing units */
  vehicles: number;
  vehiclesMoe: number;
}

export const US_VEHICLE_ROW: VehicleRow =
{ fips: "00", abbr: "US", hh: 134063422, hhMoe: 130863, bins: [11781997, 44424682, 48200889, 19320828, 7006168, 3328858], binsMoe: [77237, 160654, 176765, 95016, 51476, 34146], ownerBase: 87511734, ownerBaseMoe: 290818, ownerNone: 3105476, ownerNoneMoe: 33957, renterBase: 46551688, renterBaseMoe: 193219, renterNone: 8676521, renterNoneMoe: 69372, vehicles: 244626402, vehiclesMoe: 419933 };

const VEHICLE_ROWS: VehicleRow[] = [
  { fips: "01", abbr: "AL", hh: 2070835, hhMoe: 13313, bins: [116497, 656495, 745072, 351814, 131117, 69840], binsMoe: [6764, 16435, 13451, 9209, 6517, 5211], ownerBase: 1468988, ownerBaseMoe: 13637, ownerNone: 40949, ownerNoneMoe: 3181, renterBase: 601847, renterBaseMoe: 13745, renterNone: 75548, renterNoneMoe: 5969, vehicles: 4099356, vehiclesMoe: 42613 },
  { fips: "02", abbr: "AK", hh: 278920, hhMoe: 3561, bins: [26035, 85895, 93531, 47217, 16696, 9546], binsMoe: [2068, 5117, 4892, 3730, 2529, 1637], ownerBase: 185494, ownerBaseMoe: 3875, ownerNone: 12110, ownerNoneMoe: 1307, renterBase: 93426, renterBaseMoe: 4378, renterNone: 13925, renterNoneMoe: 1603, vehicles: 533309, vehiclesMoe: 13343 },
  { fips: "04", abbr: "AZ", hh: 3040935, hhMoe: 13096, bins: [179549, 1040068, 1136985, 440052, 167938, 76343], binsMoe: [10029, 19941, 20430, 13855, 9060, 6478], ownerBase: 2028249, ownerBaseMoe: 16762, ownerNone: 55758, ownerNoneMoe: 4873, renterBase: 1012686, renterBaseMoe: 18271, renterNone: 123791, renterNoneMoe: 8765, vehicles: 5714779, vehiclesMoe: 43138 },
  { fips: "05", abbr: "AR", hh: 1277805, hhMoe: 8667, bins: [72415, 416736, 473610, 208680, 73283, 33081], binsMoe: [5661, 11206, 12394, 9182, 5383, 3640], ownerBase: 858749, ownerBaseMoe: 10972, ownerNone: 20693, ownerNoneMoe: 3023, renterBase: 419056, renterBaseMoe: 9859, renterNone: 51722, renterNoneMoe: 4786, vehicles: 2460265, vehiclesMoe: 31424 },
  { fips: "06", abbr: "CA", hh: 13898622, hhMoe: 27332, bins: [1098607, 4287726, 4971820, 2178974, 898199, 463296], binsMoe: [20671, 39997, 44688, 28959, 17197, 11687], ownerBase: 7739255, ownerBaseMoe: 41400, ownerNone: 264620, ownerNoneMoe: 9144, renterBase: 6159367, renterBaseMoe: 44094, renterNone: 833987, renterNoneMoe: 18539, vehicles: 26830423, vehiclesMoe: 97563 },
  { fips: "08", abbr: "CO", hh: 2483142, hhMoe: 10139, bins: [139097, 778602, 948388, 396807, 143125, 77123], binsMoe: [7861, 15661, 16299, 12671, 7171, 5876], ownerBase: 1621891, ownerBaseMoe: 15125, ownerNone: 40671, ownerNoneMoe: 4030, renterBase: 861251, renterBaseMoe: 15840, renterNone: 98426, renterNoneMoe: 6749, vehicles: 4855226, vehiclesMoe: 38735 },
  { fips: "09", abbr: "CT", hh: 1456915, hhMoe: 7398, bins: [134694, 484153, 533850, 204786, 70757, 28675], binsMoe: [7349, 12580, 11419, 8695, 5079, 3270], ownerBase: 970885, ownerBaseMoe: 9905, ownerNone: 27112, ownerNoneMoe: 3165, renterBase: 486030, renterBaseMoe: 10563, renterNone: 107582, renterNoneMoe: 6633, vehicles: 2600515, vehiclesMoe: 29343 },
  { fips: "10", abbr: "DE", hh: 422123, hhMoe: 4587, bins: [23230, 143129, 167034, 56045, 21304, 11381], binsMoe: [3112, 7190, 7560, 4551, 3029, 2196], ownerBase: 315269, ownerBaseMoe: 6875, ownerNone: 10483, ownerNoneMoe: 1927, renterBase: 106854, renterBaseMoe: 7659, renterNone: 12747, renterNoneMoe: 2444, vehicles: 789906, vehiclesMoe: 14793 },
  { fips: "11", abbr: "DC", hh: 333195, hhMoe: 4240, bins: [126623, 148519, 48329, 6698, 2322, 704], binsMoe: [7189, 7448, 4326, 2040, 1074, 541], ownerBase: 126951, ownerBaseMoe: 4991, ownerNone: 24074, ownerNoneMoe: 2927, renterBase: 206244, renterBaseMoe: 6179, renterNone: 102549, renterNoneMoe: 6566, vehicles: 278583, vehiclesMoe: 9994 },
  { fips: "12", abbr: "FL", hh: 9326796, hhMoe: 31150, bins: [590071, 3639343, 3500785, 1124342, 354711, 117544], binsMoe: [17532, 39483, 34013, 20701, 14356, 8305], ownerBase: 6345311, ownerBaseMoe: 42598, ownerNone: 213256, ownerNoneMoe: 10622, renterBase: 2981485, renterBaseMoe: 30575, renterNone: 376815, renterNoneMoe: 13948, vehicles: 16056291, vehiclesMoe: 86062 },
  { fips: "13", abbr: "GA", hh: 4269857, hhMoe: 14138, bins: [270468, 1406379, 1556632, 670862, 247507, 118009], binsMoe: [12955, 25855, 24104, 15203, 9645, 6630], ownerBase: 2825592, ownerBaseMoe: 27198, ownerNone: 73353, ownerNoneMoe: 6432, renterBase: 1444265, renterBaseMoe: 24015, renterNone: 197115, renterNoneMoe: 11245, vehicles: 8149226, vehiclesMoe: 56278 },
  { fips: "15", abbr: "HI", hh: 500883, hhMoe: 5945, bins: [37676, 169474, 169791, 72198, 31006, 20738], binsMoe: [2914, 7162, 6486, 5073, 3364, 2355], ownerBase: 314269, ownerBaseMoe: 7066, ownerNone: 12267, ownerNoneMoe: 1666, renterBase: 186614, renterBaseMoe: 5906, renterNone: 25409, renterNoneMoe: 2391, vehicles: 961341, vehiclesMoe: 20326 },
  { fips: "16", abbr: "ID", hh: 765200, hhMoe: 5511, bins: [32975, 191866, 283669, 154920, 64626, 37144], binsMoe: [3276, 7339, 8495, 6114, 4118, 3006], ownerBase: 544227, ownerBaseMoe: 8165, ownerNone: 10321, ownerNoneMoe: 1494, renterBase: 220973, renterBaseMoe: 6953, renterNone: 22654, renterNoneMoe: 2915, vehicles: 1684222, vehiclesMoe: 21029 },
  { fips: "17", abbr: "IL", hh: 5134283, hhMoe: 13761, bins: [577541, 1850753, 1765335, 636093, 210838, 93723], binsMoe: [16406, 24255, 23087, 13251, 8895, 5643], ownerBase: 3478753, ownerBaseMoe: 24036, ownerNone: 154728, ownerNoneMoe: 8551, renterBase: 1655530, renterBaseMoe: 22540, renterNone: 422813, renterNoneMoe: 14001, vehicles: 8632903, vehiclesMoe: 50484 },
  { fips: "18", abbr: "IN", hh: 2816686, hhMoe: 9835, bins: [190687, 910612, 1034965, 447381, 156718, 76323], binsMoe: [7438, 16559, 18380, 11380, 7916, 4652], ownerBase: 1998396, ownerBaseMoe: 16788, ownerNone: 63990, ownerNoneMoe: 4417, renterBase: 818290, renterBaseMoe: 14171, renterNone: 126697, renterNoneMoe: 5985, vehicles: 5357521, vehiclesMoe: 38524 },
  { fips: "19", abbr: "IA", hh: 1355504, hhMoe: 6652, bins: [84684, 421693, 492797, 223234, 84696, 48400], binsMoe: [5123, 10895, 10713, 7267, 4255, 3459], ownerBase: 967728, ownerBaseMoe: 10381, ownerNone: 25061, ownerNoneMoe: 2510, renterBase: 387776, renterBaseMoe: 9082, renterNone: 59623, renterNoneMoe: 4466, vehicles: 2678137, vehiclesMoe: 26579 },
  { fips: "20", abbr: "KS", hh: 1205638, hhMoe: 6563, bins: [61012, 358884, 461704, 200444, 79991, 43603], binsMoe: [4850, 9561, 10065, 7604, 4729, 3297], ownerBase: 813999, ownerBaseMoe: 9852, ownerNone: 14780, ownerNoneMoe: 2099, renterBase: 391639, renterBaseMoe: 9435, renterNone: 46232, renterNoneMoe: 4372, vehicles: 2438735, vehiclesMoe: 25310 },
  { fips: "21", abbr: "KY", hh: 1885581, hhMoe: 9687, bins: [128856, 614276, 679369, 305460, 103016, 54604], binsMoe: [7044, 14695, 14724, 9601, 5735, 3827], ownerBase: 1286890, ownerBaseMoe: 14947, ownerNone: 43297, ownerNoneMoe: 3702, renterBase: 598691, renterBaseMoe: 13222, renterNone: 85559, renterNoneMoe: 5993, vehicles: 3592140, vehiclesMoe: 30814 },
  { fips: "22", abbr: "LA", hh: 1855847, hhMoe: 11110, bins: [155244, 671160, 686895, 240544, 71778, 30226], binsMoe: [7702, 15891, 15983, 9671, 5693, 3839], ownerBase: 1261729, ownerBaseMoe: 15061, ownerNone: 42843, ownerNoneMoe: 3637, renterBase: 594118, renterBaseMoe: 14063, renterNone: 112401, renterNoneMoe: 6789, vehicles: 3214509, vehiclesMoe: 37585 },
  { fips: "23", abbr: "ME", hh: 620759, hhMoe: 6210, bins: [44822, 198208, 245298, 93742, 28141, 10548], binsMoe: [3896, 7491, 7021, 4670, 2679, 1878], ownerBase: 459164, ownerBaseMoe: 6227, ownerNone: 12147, ownerNoneMoe: 1610, renterBase: 161595, renterBaseMoe: 6686, renterNone: 32675, renterNoneMoe: 3548, vehicles: 1138705, vehiclesMoe: 16494 },
  { fips: "24", abbr: "MD", hh: 2428843, hhMoe: 9986, bins: [225555, 819939, 852977, 348603, 123642, 58127], binsMoe: [9856, 16806, 16551, 11983, 6697, 4241], ownerBase: 1635289, ownerBaseMoe: 15769, ownerNone: 57597, ownerNoneMoe: 5310, renterBase: 793554, renterBaseMoe: 13555, renterNone: 167958, renterNoneMoe: 8303, vehicles: 4379243, vehiclesMoe: 35230 },
  { fips: "25", abbr: "MA", hh: 2827794, hhMoe: 12938, bins: [343599, 1020465, 984943, 327555, 110287, 40945], binsMoe: [12391, 17814, 16465, 10727, 6704, 4162], ownerBase: 1774484, ownerBaseMoe: 14797, ownerNone: 70233, ownerNoneMoe: 5578, renterBase: 1053310, renterBaseMoe: 16029, renterNone: 273366, renterNoneMoe: 11065, vehicles: 4632460, vehiclesMoe: 38462 },
  { fips: "26", abbr: "MI", hh: 4150990, hhMoe: 12914, bins: [300264, 1461209, 1554440, 555682, 187926, 91469], binsMoe: [9566, 22066, 18932, 11385, 7099, 4842], ownerBase: 3075243, ownerBaseMoe: 18580, ownerNone: 106450, ownerNoneMoe: 6157, renterBase: 1075747, renterBaseMoe: 16514, renterNone: 193814, renterNoneMoe: 7321, vehicles: 7476800, vehiclesMoe: 47834 },
  { fips: "27", abbr: "MN", hh: 2391870, hhMoe: 8635, bins: [176466, 742522, 931967, 357881, 123955, 59079], binsMoe: [7649, 13857, 14512, 8229, 4896, 3695], ownerBase: 1723926, ownerBaseMoe: 12370, ownerNone: 40740, ownerNoneMoe: 3623, renterBase: 667944, renterBaseMoe: 11040, renterNone: 135726, renterNoneMoe: 6737, vehicles: 4494978, vehiclesMoe: 32815 },
  { fips: "28", abbr: "MS", hh: 1197317, hhMoe: 8286, bins: [84311, 375912, 427592, 193814, 81011, 34677], binsMoe: [6025, 12011, 13167, 8300, 5987, 4231], ownerBase: 857689, ownerBaseMoe: 10683, ownerNone: 35490, ownerNoneMoe: 3800, renterBase: 339628, renterBaseMoe: 11085, renterNone: 48821, renterNoneMoe: 4676, vehicles: 2320875, vehiclesMoe: 28741 },
  { fips: "29", abbr: "MO", hh: 2604619, hhMoe: 11993, bins: [184276, 847890, 952637, 407888, 141715, 70213], binsMoe: [9041, 15671, 16266, 11825, 6571, 4322], ownerBase: 1798959, ownerBaseMoe: 16531, ownerNone: 59187, ownerNoneMoe: 3805, renterBase: 805660, renterBaseMoe: 14590, renterNone: 125089, renterNoneMoe: 8201, vehicles: 4918657, vehiclesMoe: 38577 },
  { fips: "30", abbr: "MT", hh: 481275, hhMoe: 4632, bins: [23278, 126930, 175866, 90140, 39632, 25429], binsMoe: [2722, 5788, 6646, 4304, 2979, 2925], ownerBase: 334167, ownerBaseMoe: 5760, ownerNone: 7232, ownerNoneMoe: 1371, renterBase: 147108, renterBaseMoe: 5711, renterNone: 16046, renterNoneMoe: 2352, vehicles: 1045484, vehiclesMoe: 19591 },
  { fips: "31", abbr: "NE", hh: 827249, hhMoe: 4929, bins: [44588, 247292, 310579, 139007, 56466, 29317], binsMoe: [3973, 8555, 8538, 6210, 3231, 2752], ownerBase: 545211, ownerBaseMoe: 8330, ownerNone: 12368, ownerNoneMoe: 1975, renterBase: 282038, renterBaseMoe: 8055, renterNone: 32220, renterNoneMoe: 3447, vehicles: 1669435, vehiclesMoe: 19996 },
  { fips: "32", abbr: "NV", hh: 1245703, hhMoe: 8030, bins: [90898, 434308, 437349, 183740, 64568, 34840], binsMoe: [5798, 12456, 12886, 8442, 4727, 3259], ownerBase: 761654, ownerBaseMoe: 12923, ownerNone: 22677, ownerNoneMoe: 3092, renterBase: 484049, renterBaseMoe: 11584, renterNone: 68221, renterNoneMoe: 4905, vehicles: 2306393, vehiclesMoe: 25920 },
  { fips: "33", abbr: "NH", hh: 574089, hhMoe: 5217, bins: [30556, 177921, 223598, 92666, 32930, 16418], binsMoe: [3968, 7260, 6710, 5049, 3218, 2030], ownerBase: 412973, ownerBaseMoe: 6835, ownerNone: 8621, ownerNoneMoe: 1556, renterBase: 161116, renterBaseMoe: 6908, renterNone: 21935, renterNoneMoe: 3650, vehicles: 1122987, vehiclesMoe: 18175 },
  { fips: "34", abbr: "NJ", hh: 3565008, hhMoe: 10954, bins: [398119, 1233704, 1273782, 450142, 152140, 57121], binsMoe: [12540, 21121, 18526, 13089, 7643, 4092], ownerBase: 2275717, ownerBaseMoe: 18446, ownerNone: 94381, ownerNoneMoe: 6463, renterBase: 1289291, renterBaseMoe: 17120, renterNone: 303738, renterNoneMoe: 10746, vehicles: 6042917, vehiclesMoe: 38506 },
  { fips: "35", abbr: "NM", hh: 863010, hhMoe: 7332, bins: [46271, 279500, 295815, 148718, 63041, 29665], binsMoe: [4677, 10312, 10120, 8073, 5149, 3122], ownerBase: 602506, ownerBaseMoe: 9186, ownerNone: 17159, ownerNoneMoe: 2975, renterBase: 260504, renterBaseMoe: 8952, renterNone: 29112, renterNoneMoe: 3609, vehicles: 1729612, vehiclesMoe: 25140 },
  { fips: "36", abbr: "NY", hh: 7867612, hhMoe: 17339, bins: [2431019, 2581235, 1941739, 621643, 207760, 84216], binsMoe: [26596, 31227, 27010, 14247, 8188, 5777], ownerBase: 4247594, ownerBaseMoe: 24877, ownerNone: 468496, ownerNoneMoe: 13236, renterBase: 3620018, renterBaseMoe: 26625, renterNone: 1962523, renterNoneMoe: 23068, vehicles: 9610622, vehiclesMoe: 50284 },
  { fips: "37", abbr: "NC", hh: 4539531, hhMoe: 17005, bins: [245908, 1429999, 1692892, 750637, 284614, 135481], binsMoe: [10290, 22268, 24929, 16579, 11013, 7287], ownerBase: 3040120, ownerBaseMoe: 25841, ownerNone: 75015, ownerNoneMoe: 5216, renterBase: 1499411, renterBaseMoe: 21884, renterNone: 170893, renterNoneMoe: 8870, vehicles: 8931546, vehiclesMoe: 60387 },
  { fips: "38", abbr: "ND", hh: 352013, hhMoe: 3073, bins: [21934, 109227, 122478, 60798, 23424, 14152], binsMoe: [3411, 6204, 6115, 3618, 2480, 1483], ownerBase: 217405, ownerBaseMoe: 5422, ownerNone: 3506, ownerNoneMoe: 1217, renterBase: 134608, renterBaseMoe: 5333, renterNone: 18428, renterNoneMoe: 3187, vehicles: 706812, vehiclesMoe: 12800 },
  { fips: "39", abbr: "OH", hh: 4957873, hhMoe: 12038, bins: [377059, 1695794, 1823418, 701826, 238280, 121496], binsMoe: [12576, 24467, 22709, 13924, 8596, 7333], ownerBase: 3343094, ownerBaseMoe: 23883, ownerNone: 103173, ownerNoneMoe: 6272, renterBase: 1614779, renterBaseMoe: 21975, renterNone: 273886, renterNoneMoe: 10900, vehicles: 9055476, vehiclesMoe: 48909 },
  { fips: "40", abbr: "OK", hh: 1616177, hhMoe: 6690, bins: [94997, 518217, 595453, 259547, 100125, 47838], binsMoe: [4897, 10234, 10323, 6427, 4704, 2980], ownerBase: 1057933, ownerBaseMoe: 9821, ownerNone: 26814, ownerNoneMoe: 2422, renterBase: 558244, renterBaseMoe: 10113, renterNone: 68183, renterNoneMoe: 4256, vehicles: 3144368, vehiclesMoe: 21635 },
  { fips: "41", abbr: "OR", hh: 1745361, hhMoe: 9072, bins: [132943, 574211, 628865, 254429, 101279, 53634], binsMoe: [7272, 15188, 13038, 9811, 6277, 4668], ownerBase: 1101360, ownerBaseMoe: 14222, ownerNone: 30186, ownerNoneMoe: 3271, renterBase: 644001, renterBaseMoe: 14181, renterNone: 102757, renterNoneMoe: 6495, vehicles: 3289885, vehiclesMoe: 36770 },
  { fips: "42", abbr: "PA", hh: 5405581, hhMoe: 14199, bins: [616922, 1864172, 1906968, 690913, 228964, 97642], binsMoe: [15623, 27255, 24545, 13077, 8278, 5272], ownerBase: 3738856, ownerBaseMoe: 22114, ownerNone: 188626, ownerNoneMoe: 8170, renterBase: 1666725, renterBaseMoe: 20986, renterNone: 428296, renterNoneMoe: 13317, vehicles: 9189589, vehiclesMoe: 52755 },
  { fips: "44", abbr: "RI", hh: 450467, hhMoe: 4304, bins: [42039, 162926, 164938, 55038, 17426, 8100], binsMoe: [4823, 8243, 6766, 4650, 2418, 2181], ownerBase: 293926, ownerBaseMoe: 6539, ownerNone: 9281, ownerNoneMoe: 1991, renterBase: 156541, renterBaseMoe: 6721, renterNone: 32758, renterNoneMoe: 4393, vehicles: 770328, vehiclesMoe: 14582 },
  { fips: "45", abbr: "SC", hh: 2296350, hhMoe: 12026, bins: [135080, 743868, 880196, 356747, 127560, 52899], binsMoe: [8188, 16866, 16822, 11551, 7037, 4648], ownerBase: 1649384, ownerBaseMoe: 13290, ownerNone: 48905, ownerNoneMoe: 4202, renterBase: 646966, renterBaseMoe: 15958, renterNone: 86175, renterNoneMoe: 7028, vehicles: 4367534, vehiclesMoe: 33634 },
  { fips: "46", abbr: "SD", hh: 387580, hhMoe: 3932, bins: [23545, 113454, 137170, 70640, 27012, 15759], binsMoe: [2940, 5787, 5937, 4632, 2569, 1948], ownerBase: 256889, ownerBaseMoe: 5301, ownerNone: 4460, ownerNoneMoe: 1036, renterBase: 130691, renterBaseMoe: 5292, renterNone: 19085, renterNoneMoe: 2751, vehicles: 793302, vehiclesMoe: 15169 },
  { fips: "47", abbr: "TN", hh: 2954096, hhMoe: 11880, bins: [165335, 885885, 1109025, 506071, 192339, 95441], binsMoe: [9417, 18764, 20697, 12647, 8774, 5897], ownerBase: 1998766, ownerBaseMoe: 18922, ownerNone: 53431, ownerNoneMoe: 4960, renterBase: 955330, renterBaseMoe: 17492, renterNone: 111904, renterNoneMoe: 8005, vehicles: 5902647, vehiclesMoe: 43047 },
  { fips: "48", abbr: "TX", hh: 11607274, hhMoe: 26154, bins: [681783, 3871004, 4407176, 1773339, 614327, 259645], binsMoe: [19517, 40664, 41730, 26961, 17169, 10739], ownerBase: 7273364, ownerBaseMoe: 38723, ownerNone: 180387, ownerNoneMoe: 8760, renterBase: 4333910, renterBaseMoe: 35839, renterNone: 501396, renterNoneMoe: 17441, vehicles: 21840489, vehiclesMoe: 103536 },
  { fips: "49", abbr: "UT", hh: 1208124, hhMoe: 6720, bins: [51459, 298635, 464906, 230305, 101352, 61467], binsMoe: [4568, 10612, 11888, 8423, 5470, 4361], ownerBase: 829454, ownerBaseMoe: 9786, ownerNone: 16580, ownerNoneMoe: 2257, renterBase: 378670, renterBaseMoe: 10759, renterNone: 34879, renterNoneMoe: 3971, vehicles: 2657079, vehiclesMoe: 29895 },
  { fips: "50", abbr: "VT", hh: 285750, hhMoe: 2748, bins: [16910, 99389, 114009, 39324, 11669, 4449], binsMoe: [2428, 4899, 4540, 3151, 1608, 1034], ownerBase: 207670, ownerBaseMoe: 4101, ownerNone: 5039, ownerNoneMoe: 1075, renterBase: 78080, renterBaseMoe: 3871, renterNone: 11871, renterNoneMoe: 2177, vehicles: 515736, vehiclesMoe: 10293 },
  { fips: "51", abbr: "VA", hh: 3480219, hhMoe: 10199, bins: [214831, 1093376, 1288019, 559953, 218313, 105727], binsMoe: [9029, 19801, 18991, 12216, 8393, 5982], ownerBase: 2362907, ownerBaseMoe: 18701, ownerNone: 66616, ownerNoneMoe: 5177, renterBase: 1117312, renterBaseMoe: 17876, renterNone: 148215, renterNoneMoe: 7398, vehicles: 6787623, vehiclesMoe: 43448 },
  { fips: "53", abbr: "WA", hh: 3180129, hhMoe: 10710, bins: [244502, 978281, 1137661, 506833, 201393, 111459], binsMoe: [10112, 18973, 18628, 13306, 8559, 6401], ownerBase: 1997703, ownerBaseMoe: 16415, ownerNone: 54338, ownerNoneMoe: 4617, renterBase: 1182426, renterBaseMoe: 16485, renterNone: 190164, renterNoneMoe: 8996, vehicles: 6184333, vehiclesMoe: 46786 },
  { fips: "54", abbr: "WV", hh: 747801, hhMoe: 6569, bins: [62178, 254862, 271420, 110988, 32001, 16352], binsMoe: [4902, 8811, 7512, 5211, 2887, 2222], ownerBase: 558933, ownerBaseMoe: 8009, ownerNone: 24685, ownerNoneMoe: 2744, renterBase: 188868, renterBaseMoe: 7991, renterNone: 37493, renterNoneMoe: 4062, vehicles: 1346642, vehiclesMoe: 17939 },
  { fips: "55", abbr: "WI", hh: 2567583, hhMoe: 9080, bins: [175192, 844289, 1005613, 361969, 121508, 59012], binsMoe: [7527, 12605, 14347, 9335, 5475, 3609], ownerBase: 1747732, ownerBaseMoe: 13592, ownerNone: 46661, ownerNoneMoe: 3722, renterBase: 819851, renterBaseMoe: 12412, renterNone: 128531, renterNoneMoe: 6542, vehicles: 4745273, vehiclesMoe: 27669 },
  { fips: "56", abbr: "WY", hh: 256608, hhMoe: 3485, bins: [9397, 64295, 91539, 53699, 21740, 15938], binsMoe: [1671, 4965, 5967, 4230, 2771, 2232], ownerBase: 179037, ownerBaseMoe: 4689, ownerNone: 4629, ownerNoneMoe: 1096, renterBase: 77571, renterBaseMoe: 4671, renterNone: 4768, renterNoneMoe: 1262, vehicles: 581185, vehiclesMoe: 12814 },
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
const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);

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

export interface VehicleResult extends VehicleRow {
  name: string;
  /** 1 = the most vehicles per household */
  rank: number;
  /** B19013 median household income */
  income: number;
  /** households with at least one vehicle */
  carHh: number;
  carHhMoe: number;
  /** vehicles available per household, all households */
  perHh: Ratio;
  /** vehicles available per household that has at least one */
  perCarHh: Ratio;
  noneShare: Share;
  oneShare: Share;
  twoShare: Share;
  threePlusShare: Share;
  /** 2 or more vehicles */
  twoPlusShare: Share;
  ownerNoneShare: Share;
  renterNoneShare: Share;
  /** share of all households without a vehicle that rent */
  renterShareOfNone: number;
  /** AAA insurance plus fuel for the average car-owning household's vehicles, dollars a year */
  insFuelHousehold: number;
  /** that amount as a % of median household income */
  insFuelShare: number;
  /** AAA insurance, fuel, maintenance, and registration for the same vehicles, dollars a year */
  runningHousehold: number;
  runningShare: number;
  /** AAA all-in cost of ONE new vehicle as a % of median household income */
  allInOneShare: number;
  /** how many vehicles' worth of AAA insurance and fuel fit inside the 10% line at the median income */
  vehiclesInsideLine: number;
}

function compute(row: VehicleRow, name: string, income: number): Omit<VehicleResult, "rank"> {
  const none = row.bins[0];
  const carHh = row.hh - none;
  const carHhMoe = rss(row.binsMoe.slice(1));
  const sub = (idx: number[]) => ({ n: sum(idx.map((i) => row.bins[i])), moe: rss(idx.map((i) => row.binsMoe[i])) });
  const one = sub([1]);
  const two = sub([2]);
  const threePlus = sub([3, 4, 5]);
  const twoPlus = sub([2, 3, 4, 5]);
  const perCarHh = ratio(row.vehicles, row.vehiclesMoe, carHh, carHhMoe);
  const insFuelHousehold = perCarHh.value * INSURANCE_FUEL_PER_VEHICLE;
  const runningHousehold = perCarHh.value * RUNNING_PER_VEHICLE;
  return {
    ...row,
    name,
    income,
    carHh,
    carHhMoe,
    perHh: ratio(row.vehicles, row.vehiclesMoe, row.hh, row.hhMoe),
    perCarHh,
    noneShare: share(none, row.binsMoe[0], row.hh, row.hhMoe),
    oneShare: share(one.n, one.moe, row.hh, row.hhMoe),
    twoShare: share(two.n, two.moe, row.hh, row.hhMoe),
    threePlusShare: share(threePlus.n, threePlus.moe, row.hh, row.hhMoe),
    twoPlusShare: share(twoPlus.n, twoPlus.moe, row.hh, row.hhMoe),
    ownerNoneShare: share(row.ownerNone, row.ownerNoneMoe, row.ownerBase, row.ownerBaseMoe),
    renterNoneShare: share(row.renterNone, row.renterNoneMoe, row.renterBase, row.renterBaseMoe),
    renterShareOfNone: (row.renterNone / none) * 100,
    insFuelHousehold,
    insFuelShare: (insFuelHousehold / income) * 100,
    runningHousehold,
    runningShare: (runningHousehold / income) * 100,
    allInOneShare: (AAA.total / income) * 100,
    vehiclesInsideLine: (income * (REPORT.guidelinePct / 100)) / INSURANCE_FUEL_PER_VEHICLE,
  };
}

/** All 50 states and DC, ranked from the most to the fewest vehicles per household. */
export const STATE_RESULTS: VehicleResult[] = VEHICLE_ROWS.map((row) => {
  const housing = STATE_ROWS.find((s) => s.fips === row.fips);
  if (!housing) throw new Error(`Missing income input for FIPS ${row.fips}`);
  if (housing.abbr !== row.abbr) throw new Error(`State mismatch for FIPS ${row.fips}`);
  return compute(row, housing.name, housing.income);
})
  .sort((a, b) => b.perHh.value - a.perHh.value)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<VehicleResult, "rank"> = compute(US_VEHICLE_ROW, "United States", US_ROW.income);

export function getStateResult(abbr: string): VehicleResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

/** Number of places where insurance and fuel for the average car-owning household exceed the line. */
export function countOverLine(): number {
  return STATE_RESULTS.filter((r) => r.insFuelShare > REPORT.guidelinePct).length;
}

/** Pearson correlation of two equally long series. */
export function correlation(xs: number[], ys: number[]): number {
  const n = xs.length;
  const mx = sum(xs) / n;
  const my = sum(ys) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_most_vehicles_per_household",
  "state",
  "abbr",
  "fips",
  "households",
  "vehicles_available_total",
  "vehicles_per_household",
  "vehicles_per_household_moe90",
  "vehicles_per_household_with_a_vehicle",
  "households_no_vehicle_pct",
  "households_no_vehicle_moe90_pts",
  "households_1_vehicle_pct",
  "households_2_vehicles_pct",
  "households_3_plus_vehicles_pct",
  "households_3_plus_vehicles_moe90_pts",
  "households_2_plus_vehicles_pct",
  "owner_households_no_vehicle_pct",
  "renter_households_no_vehicle_pct",
  "renter_households_no_vehicle_moe90_pts",
  "median_household_income_usd",
  "aaa_insurance_plus_fuel_per_vehicle_usd",
  "insurance_plus_fuel_average_car_household_usd",
  "insurance_plus_fuel_share_of_income_pct",
  "aaa_running_cost_per_vehicle_usd",
  "running_cost_average_car_household_usd",
  "running_cost_share_of_income_pct",
  "aaa_all_in_one_new_vehicle_share_of_income_pct",
  "vehicles_inside_10pct_line_at_median_income",
] as const;

function csvLine(r: VehicleResult | (Omit<VehicleResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.hh,
    r.vehicles,
    round(r.perHh.value, 3),
    round(r.perHh.moe, 3),
    round(r.perCarHh.value, 3),
    round(r.noneShare.pct, 2),
    round(r.noneShare.moe, 2),
    round(r.oneShare.pct, 2),
    round(r.twoShare.pct, 2),
    round(r.threePlusShare.pct, 2),
    round(r.threePlusShare.moe, 2),
    round(r.twoPlusShare.pct, 2),
    round(r.ownerNoneShare.pct, 2),
    round(r.renterNoneShare.pct, 2),
    round(r.renterNoneShare.moe, 2),
    r.income,
    INSURANCE_FUEL_PER_VEHICLE,
    round(r.insFuelHousehold),
    round(r.insFuelShare, 2),
    RUNNING_PER_VEHICLE,
    round(r.runningHousehold),
    round(r.runningShare, 2),
    round(r.allInOneShare, 2),
    round(r.vehiclesInsideLine, 2),
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [CSV_HEADER.join(","), ...STATE_RESULTS.map(csvLine), csvLine(US_RESULT)].join("\n") + "\n";
}

/** Whole number with thousands separators. */
export const count0 = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

/** Counts in millions with one decimal, such as "11.8 million". */
export const millions = (n: number) => `${(n / 1_000_000).toFixed(1)} million`;
