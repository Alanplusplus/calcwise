/**
 * Data and calculations for the "Homeowners Insurance Cost by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * New inputs (ACS 2025 1-year, table B25141 homeowners insurance costs by mortgage status, yearly)
 * were read on 2026-11-12 from the Census Bureau's table-based ACS Summary File
 * (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData, file
 * acsdt1y2025-b25141; B25003 in the same folder was used only for the tie-out below). The Census
 * API requires a key and was not used.
 *
 * What is stored: for every place, the number of owner-occupied housing units in each of the 12
 * published annual-premium brackets (less than $100 up to $4,000 or more), separately for owners
 * with a mortgage (B25141_003 to _014) and owners without one (B25141_016 to _027), the two group
 * totals (B25141_002 and _015), and the margins of error of the totals and of the tail sums used in
 * the shares. A margin of error for a sum of brackets is the square root of the sum of the squared
 * published margins (ACS General Handbook, chapter 8).
 * Checks: all 50 states, DC, and the U.S. row were present (Puerto Rico was dropped, as in the
 * companion reports); in all 52 rows the 12 brackets add up to each group total and the two group
 * totals add up to B25141_001; B25141_001 equals the owner-occupied count in B25003_002 in every
 * row (U.S. 87,511,734, the same owner total stored for the housing-cost-burden report); no cell
 * is missing or a Census placeholder; and the state ranking agrees in broad terms with an
 * independent quote-based series (rank correlation 0.65 across 51 places against the LendingTree
 * and Quadrant Information Services averages for $350,000 of dwelling coverage, February 2026).
 *
 * The Census Bureau publishes B25141 only as brackets, with no median. The median premium here is
 * therefore ESTIMATED: the median household is located in its bracket and placed by linear
 * interpolation inside it, then rounded to the nearest $10. No state's median falls in the open-ended
 * top bracket. The true median lies inside the stated bracket, so an estimate can be off by up to
 * half a bracket width ($250 in the brackets above $1,000).
 *
 * Median home value (B25077), median property tax (B25103), and median household income (B19013)
 * are NOT stored again here: they come from the mortgage affordability report's STATE_ROWS, so the
 * two reports always use the same housing inputs. The guard below fails the build if that report
 * moves to a different ACS year before this one does, so the two can never silently mix survey years.
 */

import {
  REPORT as AFFORDABILITY_REPORT,
  STATE_ROWS,
  US_ROW,
  monthlyPrincipalInterest,
  pct1,
  usd0,
} from "./mortgage-affordability-by-state";

export { pct1, usd0 };

export const REPORT = {
  slug: "homeowners-insurance-by-state",
  path: "/reports/homeowners-insurance-by-state",
  csvPath: "/reports/homeowners-insurance-by-state/data.csv",
  datePublished: "2026-11-12",
  dateModified: "2026-11-12",
  /** ACS survey year of every insurance, housing, and income figure */
  acsYear: 2025,
  /**
   * Freddie Mac PMMS 30-year fixed average, week of November 5, 2026. Pinned on purpose: a dated
   * report must not change when the weekly average does, so it does not read `src/lib/market-data.ts`.
   * The companion reports pin their own rates (7.32% on October 22, 7.24% on October 29).
   */
  mortgageRate: 7.18,
  mortgageRateDate: "November 5, 2026",
  /** Same survey one year earlier (stated in Freddie Mac's Nov. 5, 2026 release) */
  mortgageRateYearAgo: 6.22,
  downPaymentPct: 20,
  termYears: 30,
  /** Front-end housing-cost guideline, % of gross monthly income (same as the affordability report) */
  guidelinePct: 28,
  /** Annual premium thresholds for the "pays this much or more" shares */
  highPremium: 3000,
  midPremium: 2000,
} as const;

if (AFFORDABILITY_REPORT.acsYear !== REPORT.acsYear) {
  throw new Error(
    `homeowners-insurance-by-state uses ACS ${REPORT.acsYear} but mortgage-affordability-by-state now uses ACS ` +
      `${AFFORDABILITY_REPORT.acsYear}. Refresh the insurance rows in ` +
      `src/lib/reports/homeowners-insurance-by-state.ts (table B25141) in the same change.`,
  );
}

export const REPORT_SOURCES = {
  acsInsurance: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25141 (homeowners insurance costs by mortgage status, yearly)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25141",
  },
  acsHome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25077 (median value)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25077",
  },
  acsTax: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25103 (median real estate taxes paid)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25103",
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
    label: "Census Bureau, 2025 ACS Subject Definitions (Insurance for Fire, Hazard, and Flood)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
  pmms: {
    label: "Freddie Mac PMMS release of Nov. 5, 2026",
    href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-decline-third-consecutive-week-718/",
  },
  quotes: {
    label: "LendingTree, State of Home Insurance 2026 (Quadrant Information Services quotes, Feb. 2026)",
    href: "https://www.lendingtree.com/insurance/state-of-home-insurance/",
  },
} as const;

/**
 * Cross-check against an independent, quote-based series, computed once on 2026-11-12 from the
 * 51-row state table in the LendingTree "State of Home Insurance 2026" report (Quadrant Information
 * Services data, February 2026, homes with $350,000 of dwelling coverage). Those figures are
 * averages of new-policy quotes, not what existing owners report paying, so they are used here only
 * to describe how the two measures relate and are not republished. `rankCorrelation` is the Spearman
 * rank correlation between that series and this report's estimated median premium for owners with a
 * mortgage across the same 51 places; `medianRatio` is the median across those places of the quote
 * average divided by this report's estimate.
 */
export const QUOTE_CHECK = {
  rankCorrelation: 0.65,
  medianRatio: 1.47,
  nationalAverage: 2395,
  dwellingCoverage: 350000,
  period: "February 2026",
} as const;

/** Lower edge of each of the 12 published premium brackets, dollars per year. The last is open-ended. */
export const BRACKET_EDGES = [0, 100, 300, 500, 800, 1000, 1500, 2000, 2500, 3000, 3500, 4000] as const;

export const BRACKET_LABELS = [
  "less than $100",
  "$100 to $299",
  "$300 to $499",
  "$500 to $799",
  "$800 to $999",
  "$1,000 to $1,499",
  "$1,500 to $1,999",
  "$2,000 to $2,499",
  "$2,500 to $2,999",
  "$3,000 to $3,499",
  "$3,500 to $3,999",
  "$4,000 or more",
] as const;

export interface InsuranceRow {
  fips: string;
  abbr: string;
  /** B25141_002: owner-occupied units with a mortgage, and its margin */
  mortBase: number;
  mortBaseMoe: number;
  /** B25141_003 to _014: units with a mortgage in each annual-premium bracket */
  mortBins: number[];
  /** B25141_010 to _014: units with a mortgage paying $2,000 or more a year, and its margin */
  mort2k: number;
  mort2kMoe: number;
  /** B25141_012 to _014: units with a mortgage paying $3,000 or more a year, and its margin */
  mort3k: number;
  mort3kMoe: number;
  /** B25141_003: units with a mortgage reporting less than $100 a year, and its margin */
  mortLt100: number;
  mortLt100Moe: number;
  /** B25141_015: owner-occupied units without a mortgage, and its margin */
  freeBase: number;
  freeBaseMoe: number;
  /** B25141_016 to _027: units without a mortgage in each annual-premium bracket */
  freeBins: number[];
  /** B25141_025 to _027: units without a mortgage paying $3,000 or more a year, and its margin */
  free3k: number;
  free3kMoe: number;
}

export const US_INSURANCE_ROW: InsuranceRow =
{ fips: "00", abbr: "US", mortBase: 51628409, mortBaseMoe: 174477, mortBins: [4856318, 1503438, 1268694, 3339409, 2783058, 10633487, 7380894, 6262186, 3399409, 2913669, 1603531, 5684316], mort2k: 19863111, mort2kMoe: 90816, mort3k: 10201516, mort3kMoe: 63719, mortLt100: 4856318, mortLt100Moe: 45441, freeBase: 35883325, freeBaseMoe: 152888, freeBins: [7959596, 955876, 1024621, 2517746, 2070840, 6511806, 4138541, 3437623, 1779515, 1597634, 867616, 3021911], free3k: 5487161, free3kMoe: 43339 };

const INSURANCE_ROWS: InsuranceRow[] = [
  { fips: "01", abbr: "AL", mortBase: 783690, mortBaseMoe: 14265, mortBins: [84258, 32231, 16881, 32623, 22602, 141615, 140423, 123956, 60510, 43766, 25637, 59188], mort2k: 313057, mort2kMoe: 10199, mort3k: 128591, mort3kMoe: 6801, mortLt100: 84258, mortLt100Moe: 5475, freeBase: 685298, freeBaseMoe: 11918, freeBins: [200720, 22034, 13961, 28668, 19206, 113066, 96725, 76284, 35744, 29827, 14105, 34958], free3k: 78890, free3kMoe: 4868 },
  { fips: "02", abbr: "AK", mortBase: 104243, mortBaseMoe: 4542, mortBins: [11564, 2711, 2544, 6910, 6845, 32466, 14521, 11320, 4317, 2926, 1652, 6467], mort2k: 26682, mort2kMoe: 3021, mort3k: 11045, mort3kMoe: 1989, mortLt100: 11564, mortLt100Moe: 1658, freeBase: 81251, freeBaseMoe: 3639, freeBins: [29892, 1013, 1894, 6930, 4625, 17362, 8584, 4631, 1946, 1681, 753, 1940], free3k: 4374, free3kMoe: 1145 },
  { fips: "04", abbr: "AZ", mortBase: 1243177, mortBaseMoe: 20703, mortBins: [122567, 47433, 36353, 123340, 110239, 307378, 177816, 129790, 65045, 40941, 25376, 56899], mort2k: 318051, mort2kMoe: 11513, mort3k: 123216, mort3kMoe: 6868, mortLt100: 122567, mortLt100Moe: 7465, freeBase: 785072, freeBaseMoe: 15565, freeBins: [182127, 24742, 26111, 86360, 75717, 169265, 85457, 57601, 25347, 17283, 7516, 27546], free3k: 52345, free3kMoe: 4386 },
  { fips: "05", abbr: "AR", mortBase: 452679, mortBaseMoe: 11091, mortBins: [52076, 14785, 13957, 17935, 11655, 80115, 71707, 68836, 38237, 30713, 17344, 35319], mort2k: 190449, mort2kMoe: 8390, mort3k: 83376, mort3kMoe: 5654, mortLt100: 52076, mortLt100Moe: 4641, freeBase: 406070, freeBaseMoe: 9506, freeBins: [117330, 13978, 9660, 13159, 11833, 62513, 52564, 50326, 26909, 18111, 9596, 20091], free3k: 47798, free3kMoe: 3816 },
  { fips: "06", abbr: "CA", mortBase: 5074122, mortBaseMoe: 35478, mortBins: [380156, 102668, 88606, 282399, 274478, 1079556, 773950, 638923, 308787, 294855, 146460, 703284], mort2k: 2092309, mort2kMoe: 27080, mort3k: 1144599, mort3kMoe: 20057, mortLt100: 380156, mortLt100Moe: 10953, freeBase: 2665133, freeBaseMoe: 26185, freeBins: [485528, 48131, 50683, 156612, 153046, 497402, 355773, 284320, 139989, 133749, 64805, 295095], free3k: 493649, free3kMoe: 12238 },
  { fips: "08", abbr: "CO", mortBase: 1108939, mortBaseMoe: 17099, mortBins: [83605, 28595, 20422, 46663, 30522, 120231, 106238, 152041, 104948, 93915, 69096, 252663], mort2k: 672663, mort2kMoe: 15275, mort3k: 415674, mort3kMoe: 11920, mortLt100: 83605, mortLt100Moe: 5342, freeBase: 512952, freeBaseMoe: 12191, freeBins: [88362, 10590, 11075, 22685, 15723, 49281, 49376, 55442, 38724, 44510, 24195, 102989], free3k: 171694, free3kMoe: 6507 },
  { fips: "09", abbr: "CT", mortBase: 610340, mortBaseMoe: 10024, mortBins: [63530, 13403, 18141, 29279, 14552, 96774, 85471, 93330, 51303, 42653, 24005, 77899], mort2k: 289190, mort2kMoe: 9304, mort3k: 144557, mort3kMoe: 6519, mortLt100: 63530, mortLt100Moe: 5445, freeBase: 360545, freeBaseMoe: 8391, freeBins: [54778, 6126, 13980, 18012, 12173, 58859, 53526, 46435, 24055, 22166, 10493, 39942], free3k: 72601, free3kMoe: 4346 },
  { fips: "10", abbr: "DE", mortBase: 194852, mortBaseMoe: 6942, mortBins: [18482, 6218, 8734, 24419, 24587, 54534, 24759, 15983, 5794, 4602, 2389, 4351], mort2k: 33119, mort2kMoe: 3494, mort3k: 11342, mort3kMoe: 1850, mortLt100: 18482, mortLt100Moe: 2587, freeBase: 120417, freeBaseMoe: 5743, freeBins: [17578, 3942, 5323, 16317, 11911, 35106, 13566, 8435, 2467, 1672, 855, 3245], free3k: 5772, free3kMoe: 1117 },
  { fips: "11", abbr: "DC", mortBase: 93315, mortBaseMoe: 4577, mortBins: [7026, 4440, 6092, 12373, 6061, 17178, 11278, 10414, 5133, 3905, 1290, 8125], mort2k: 28867, mort2kMoe: 3399, mort3k: 13320, mort3kMoe: 2239, mortLt100: 7026, mortLt100Moe: 1371, freeBase: 33636, freeBaseMoe: 2791, freeBins: [6424, 1726, 2130, 5610, 2044, 4614, 2756, 3381, 202, 1687, 183, 2879], free3k: 4749, free3kMoe: 1481 },
  { fips: "12", abbr: "FL", mortBase: 3471332, mortBaseMoe: 33217, mortBins: [369400, 49478, 41675, 106561, 84237, 370259, 355367, 382727, 285987, 281220, 192205, 952216], mort2k: 2094355, mort2kMoe: 32352, mort3k: 1425641, mort3kMoe: 25699, mortLt100: 369400, mortLt100Moe: 12397, freeBase: 2873979, freeBaseMoe: 32341, freeBins: [955010, 41242, 42469, 93996, 67553, 246002, 219182, 245765, 151338, 165063, 110204, 536155], free3k: 811422, free3kMoe: 17205 },
  { fips: "13", abbr: "GA", mortBase: 1738857, mortBaseMoe: 21660, mortBins: [163799, 51764, 32082, 78725, 62390, 328432, 303386, 256421, 140337, 112527, 55125, 153869], mort2k: 718279, mort2kMoe: 17991, mort3k: 321521, mort3kMoe: 10948, mortLt100: 163799, mortLt100Moe: 7677, freeBase: 1086735, freeBaseMoe: 18826, freeBins: [247733, 34424, 25409, 48359, 45193, 207629, 155932, 123507, 61647, 45750, 25953, 65199], free3k: 136902, free3kMoe: 6307 },
  { fips: "15", abbr: "HI", mortBase: 186600, mortBaseMoe: 6191, mortBins: [11298, 7702, 11093, 20201, 9454, 25166, 18999, 22831, 14018, 10998, 7098, 27742], mort2k: 82687, mort2kMoe: 4915, mort3k: 45838, mort3kMoe: 3427, mortLt100: 11298, mortLt100Moe: 1505, freeBase: 127669, freeBaseMoe: 5733, freeBins: [24090, 4759, 7579, 12570, 6304, 18306, 9916, 11245, 6595, 6714, 3226, 16365], free3k: 26305, free3kMoe: 2721 },
  { fips: "16", abbr: "ID", mortBase: 329294, mortBaseMoe: 8321, mortBins: [29611, 13622, 10047, 39742, 30963, 81734, 47053, 32778, 16017, 9759, 5212, 12756], mort2k: 76522, mort2kMoe: 4872, mort3k: 27727, mort3kMoe: 2987, mortLt100: 29611, mortLt100Moe: 3330, freeBase: 214933, freeBaseMoe: 7153, freeBins: [37951, 6692, 8101, 22339, 20833, 50333, 26181, 16618, 8557, 5439, 2813, 9076], free3k: 17328, free3kMoe: 2182 },
  { fips: "17", abbr: "IL", mortBase: 2068385, mortBaseMoe: 23388, mortBins: [181793, 73229, 76311, 132817, 85561, 466827, 368338, 272852, 128724, 100400, 42960, 138573], mort2k: 683509, mort2kMoe: 16300, mort3k: 281933, mort3kMoe: 10125, mortLt100: 181793, mortLt100Moe: 8818, freeBase: 1410368, freeBaseMoe: 19143, freeBins: [229722, 46327, 50920, 91493, 60253, 330185, 216652, 160009, 76786, 55515, 25323, 67183], free3k: 148021, free3kMoe: 7181 },
  { fips: "18", abbr: "IN", mortBase: 1221439, mortBaseMoe: 16267, mortBins: [136616, 40538, 30618, 69291, 69640, 324887, 210600, 147221, 64315, 46227, 22696, 58790], mort2k: 339249, mort2kMoe: 11360, mort3k: 127713, mort3kMoe: 7346, mortLt100: 136616, mortLt100Moe: 6887, freeBase: 776957, freeBaseMoe: 14120, freeBins: [161392, 20318, 19746, 52484, 50607, 200227, 109197, 71072, 31089, 24523, 12329, 23973], free3k: 60825, free3kMoe: 4175 },
  { fips: "19", abbr: "IA", mortBase: 559732, mortBaseMoe: 9865, mortBins: [62003, 18606, 11379, 28606, 19930, 116948, 94557, 80593, 39359, 30627, 17604, 39520], mort2k: 207703, mort2kMoe: 7847, mort3k: 87751, mort3kMoe: 5119, mortLt100: 62003, mortLt100Moe: 3589, freeBase: 407996, freeBaseMoe: 8386, freeBins: [76944, 10987, 11717, 19378, 15978, 82041, 62475, 48927, 25397, 18300, 10495, 25357], free3k: 54152, free3kMoe: 3356 },
  { fips: "20", abbr: "KS", mortBase: 450473, mortBaseMoe: 9998, mortBins: [37350, 12205, 7795, 15876, 10312, 56920, 65937, 75486, 45760, 38385, 21886, 62561], mort2k: 244078, mort2kMoe: 8192, mort3k: 122832, mort3kMoe: 6038, mortLt100: 37350, mortLt100Moe: 3351, freeBase: 363526, freeBaseMoe: 8940, freeBins: [74388, 10196, 5675, 10865, 7294, 45661, 46494, 51605, 32716, 27403, 14127, 37102], free3k: 78632, free3kMoe: 4673 },
  { fips: "21", abbr: "KY", mortBase: 691821, mortBaseMoe: 13890, mortBins: [74885, 19784, 19101, 38524, 29691, 154363, 122373, 96302, 46249, 33908, 14911, 41730], mort2k: 233100, mort2kMoe: 9215, mort3k: 90549, mort3kMoe: 5505, mortLt100: 74885, mortLt100Moe: 5007, freeBase: 595069, freeBaseMoe: 10683, freeBins: [167340, 14325, 15248, 34551, 24520, 107608, 83043, 58367, 32055, 20200, 8576, 29236], free3k: 58012, free3kMoe: 3645 },
  { fips: "22", abbr: "LA", mortBase: 642351, mortBaseMoe: 13676, mortBins: [62577, 15292, 10934, 25341, 21871, 69860, 54881, 64745, 49880, 54607, 36628, 175735], mort2k: 381595, mort2kMoe: 12507, mort3k: 266970, mort3kMoe: 10581, mortLt100: 62577, mortLt100Moe: 4655, freeBase: 619378, freeBaseMoe: 10931, freeBins: [197583, 15397, 10580, 19951, 15572, 52800, 45395, 50643, 37936, 38737, 23781, 111003], free3k: 173521, free3kMoe: 7419 },
  { fips: "23", abbr: "ME", mortBase: 255997, mortBaseMoe: 6909, mortBins: [20378, 6569, 11177, 37144, 28853, 72534, 33540, 20088, 9322, 5887, 2558, 7947], mort2k: 45802, mort2kMoe: 3841, mort3k: 16392, mort3kMoe: 2081, mortLt100: 20378, mortLt100Moe: 2751, freeBase: 203167, freeBaseMoe: 5865, freeBins: [40251, 4024, 11166, 31602, 25245, 45158, 18744, 12291, 4995, 3784, 1687, 4220], free3k: 9691, free3kMoe: 1760 },
  { fips: "24", abbr: "MD", mortBase: 1135376, mortBaseMoe: 14729, mortBins: [113172, 46489, 31246, 70051, 51639, 255898, 183121, 143496, 72526, 59634, 30055, 78049], mort2k: 383760, mort2kMoe: 11993, mort3k: 167738, mort3kMoe: 7635, mortLt100: 113172, mortLt100Moe: 7120, freeBase: 499913, freeBaseMoe: 11323, freeBins: [77524, 16992, 21037, 31876, 28405, 103912, 75351, 64036, 24463, 19768, 8465, 28084], free3k: 56317, free3kMoe: 4021 },
  { fips: "25", abbr: "MA", mortBase: 1150587, mortBaseMoe: 15647, mortBins: [103233, 22703, 32773, 60794, 37255, 206988, 168134, 173909, 90767, 87469, 38859, 127703], mort2k: 518707, mort2kMoe: 14055, mort3k: 254031, mort3kMoe: 10259, mortLt100: 103233, mortLt100Moe: 7377, freeBase: 623897, freeBaseMoe: 11944, freeBins: [90904, 10630, 18288, 30961, 22256, 103995, 87426, 83139, 45050, 41531, 18443, 71274], free3k: 131248, free3kMoe: 6601 },
  { fips: "26", abbr: "MI", mortBase: 1739683, mortBaseMoe: 15905, mortBins: [182214, 58258, 51417, 157158, 152196, 505268, 267955, 162771, 66807, 52907, 20699, 62033], mort2k: 365217, mort2kMoe: 10322, mort3k: 135639, mort3kMoe: 6235, mortLt100: 182214, mortLt100Moe: 7496, freeBase: 1335560, freeBaseMoe: 16406, freeBins: [308623, 42970, 53123, 154879, 136752, 322813, 133736, 80889, 29425, 27161, 11042, 34147], free3k: 72350, free3kMoe: 4710 },
  { fips: "27", abbr: "MN", mortBase: 1079036, mortBaseMoe: 10997, mortBins: [102418, 28573, 26587, 58275, 26878, 124576, 130174, 167196, 109670, 96512, 52205, 155972], mort2k: 581555, mort2kMoe: 11205, mort3k: 304689, mort3kMoe: 8272, mortLt100: 102418, mortLt100Moe: 5655, freeBase: 644890, freeBaseMoe: 8546, freeBins: [102733, 14237, 20348, 33222, 19815, 73786, 78608, 93882, 57795, 50121, 27363, 72980], free3k: 150464, free3kMoe: 5375 },
  { fips: "28", abbr: "MS", mortBase: 405272, mortBaseMoe: 11060, mortBins: [40506, 16574, 6889, 12960, 11218, 66302, 59815, 57317, 37978, 29262, 17261, 49190], mort2k: 191008, mort2kMoe: 8313, mort3k: 95713, mort3kMoe: 5623, mortLt100: 40506, mortLt100Moe: 4474, freeBase: 452417, freeBaseMoe: 10228, freeBins: [141786, 14922, 10380, 18468, 13119, 62470, 52159, 48002, 25604, 23335, 11711, 30461], free3k: 65507, free3kMoe: 4853 },
  { fips: "29", abbr: "MO", mortBase: 1053964, mortBaseMoe: 18007, mortBins: [105230, 36699, 20981, 47289, 28700, 172774, 185520, 171169, 89781, 71586, 39136, 85099], mort2k: 456771, mort2kMoe: 11358, mort3k: 195821, mort3kMoe: 7647, mortLt100: 105230, mortLt100Moe: 6243, freeBase: 744995, freeBaseMoe: 13234, freeBins: [152809, 23700, 14603, 32881, 25314, 119088, 122951, 96687, 53100, 38050, 17914, 47898], free3k: 103862, free3kMoe: 5463 },
  { fips: "30", abbr: "MT", mortBase: 180223, mortBaseMoe: 5705, mortBins: [16481, 5271, 2782, 10985, 5332, 33264, 24463, 28196, 15524, 14241, 6819, 16865], mort2k: 81645, mort2kMoe: 5071, mort3k: 37925, mort3kMoe: 3430, mortLt100: 16481, mortLt100Moe: 2141, freeBase: 153944, freeBaseMoe: 5308, freeBins: [36317, 2315, 3037, 6633, 5053, 22523, 18792, 19929, 9319, 9137, 6907, 13982], free3k: 30026, free3kMoe: 2903 },
  { fips: "31", abbr: "NE", mortBase: 314231, mortBaseMoe: 7673, mortBins: [33888, 10582, 5411, 8470, 5268, 28298, 33715, 44581, 31739, 32688, 20215, 59376], mort2k: 188599, mort2kMoe: 6719, mort3k: 112279, mort3kMoe: 5401, mortLt100: 33888, mortLt100Moe: 2762, freeBase: 230980, freeBaseMoe: 5416, freeBins: [46625, 6907, 4199, 5170, 4053, 20042, 22312, 31779, 21783, 20616, 13397, 34097], free3k: 68110, free3kMoe: 3718 },
  { fips: "32", abbr: "NV", mortBase: 488376, mortBaseMoe: 12061, mortBins: [53292, 20507, 16887, 77547, 56067, 119207, 61766, 33406, 14998, 13264, 4860, 16575], mort2k: 83103, mort2kMoe: 5791, mort3k: 34699, mort3kMoe: 3740, mortLt100: 53292, mortLt100Moe: 4949, freeBase: 273278, freeBaseMoe: 10152, freeBins: [57424, 8620, 11668, 39991, 30856, 57358, 26092, 17498, 5883, 5828, 2889, 9171], free3k: 17888, free3kMoe: 2659 },
  { fips: "33", abbr: "NH", mortBase: 245602, mortBaseMoe: 6907, mortBins: [19165, 7283, 9055, 25938, 23620, 73986, 31922, 24619, 9805, 7557, 3538, 9114], mort2k: 54633, mort2kMoe: 4453, mort3k: 20209, mort3kMoe: 2783, mortLt100: 19165, mortLt100Moe: 2579, freeBase: 167371, freeBaseMoe: 4845, freeBins: [21744, 3804, 6449, 19059, 18518, 44315, 21305, 14848, 5032, 3670, 2098, 6529], free3k: 12297, free3kMoe: 1786 },
  { fips: "34", abbr: "NJ", mortBase: 1421288, mortBaseMoe: 16969, mortBins: [131527, 32346, 36938, 94634, 76592, 360576, 225576, 182740, 84927, 61069, 26156, 108207], mort2k: 463099, mort2kMoe: 12663, mort3k: 195432, mort3kMoe: 8127, mortLt100: 131527, mortLt100Moe: 6614, freeBase: 854429, freeBaseMoe: 14589, freeBins: [121126, 19828, 32887, 63482, 54412, 204091, 121815, 98465, 40660, 28934, 15837, 52892], free3k: 97663, free3kMoe: 5790 },
  { fips: "35", abbr: "NM", mortBase: 301459, mortBaseMoe: 9357, mortBins: [35475, 11520, 5870, 22218, 23987, 76771, 45183, 30101, 16870, 11667, 5958, 15839], mort2k: 80435, mort2kMoe: 5316, mort3k: 33464, mort3kMoe: 3474, mortLt100: 35475, mortLt100Moe: 4291, freeBase: 301047, freeBaseMoe: 7698, freeBins: [110512, 6535, 6498, 22420, 17955, 52383, 28796, 19566, 11104, 8329, 3834, 13115], free3k: 25278, free3kMoe: 2821 },
  { fips: "36", abbr: "NY", mortBase: 2360541, mortBaseMoe: 21239, mortBins: [203199, 68765, 90987, 242587, 167608, 496073, 285672, 263067, 133110, 123024, 51723, 234726], mort2k: 805650, mort2kMoe: 16612, mort3k: 409473, mort3kMoe: 11707, mortLt100: 203199, mortLt100Moe: 8495, freeBase: 1887053, freeBaseMoe: 19939, freeBins: [316458, 61179, 94904, 208150, 144101, 346757, 189410, 171711, 87186, 81373, 36310, 149514], free3k: 267197, free3kMoe: 9127 },
  { fips: "37", abbr: "NC", mortBase: 1830100, mortBaseMoe: 24785, mortBins: [168449, 56346, 42722, 120947, 121127, 439212, 316923, 220294, 109032, 85626, 38598, 110824], mort2k: 564374, mort2kMoe: 15355, mort3k: 235048, mort3kMoe: 9401, mortLt100: 168449, mortLt100Moe: 8422, freeBase: 1210020, freeBaseMoe: 16136, freeBins: [264588, 38721, 33036, 91414, 81797, 257867, 166149, 105783, 52051, 39395, 19389, 59830], free3k: 118614, free3kMoe: 5666 },
  { fips: "38", abbr: "ND", mortBase: 111034, mortBaseMoe: 4555, mortBins: [16831, 3472, 1787, 6591, 2815, 19344, 16636, 15822, 8765, 7266, 3423, 8282], mort2k: 43558, mort2kMoe: 3580, mort3k: 18971, mort3kMoe: 2288, mortLt100: 16831, mortLt100Moe: 2254, freeBase: 106371, freeBaseMoe: 3825, freeBins: [23675, 2412, 1783, 5114, 3513, 19138, 14397, 14356, 7767, 4247, 2305, 7664], free3k: 14216, free3kMoe: 1808 },
  { fips: "39", abbr: "OH", mortBase: 1962018, mortBaseMoe: 23301, mortBins: [196950, 77327, 63435, 156441, 164684, 579010, 296308, 188010, 79942, 57888, 25246, 76777], mort2k: 427863, mort2kMoe: 11217, mort3k: 159911, mort3kMoe: 6933, mortLt100: 196950, mortLt100Moe: 8805, freeBase: 1381076, freeBaseMoe: 17804, freeBins: [252591, 49409, 53073, 133890, 136659, 372337, 166198, 93827, 39418, 30191, 13258, 40225], free3k: 83674, free3kMoe: 4855 },
  { fips: "40", abbr: "OK", mortBase: 543354, mortBaseMoe: 9360, mortBins: [51889, 13336, 8615, 12818, 7727, 53871, 60939, 77389, 64191, 59702, 40146, 92731], mort2k: 334159, mort2kMoe: 8971, mort3k: 192579, mort3kMoe: 7062, mortLt100: 51889, mortLt100Moe: 2965, freeBase: 514579, freeBaseMoe: 7993, freeBins: [150882, 11751, 5458, 11303, 9004, 47902, 40348, 64557, 46243, 40166, 22057, 64908], free3k: 127131, free3kMoe: 5239 },
  { fips: "41", abbr: "OR", mortBase: 684804, mortBaseMoe: 14138, mortBins: [51188, 20826, 22960, 77581, 68597, 184492, 99379, 62706, 26381, 23108, 11672, 35914], mort2k: 159781, mort2kMoe: 7224, mort3k: 70694, mort3kMoe: 5000, mortLt100: 51188, mortLt100Moe: 3707, freeBase: 416556, freeBaseMoe: 9315, freeBins: [67118, 11261, 14184, 53445, 39936, 100741, 48539, 34799, 12087, 10714, 5645, 18087], free3k: 34446, free3kMoe: 3209 },
  { fips: "42", abbr: "PA", mortBase: 2092089, mortBaseMoe: 24053, mortBins: [203898, 57042, 65052, 223192, 226435, 604226, 274997, 193380, 78338, 62942, 23169, 79418], mort2k: 437247, mort2kMoe: 12730, mort3k: 165529, mort3kMoe: 7649, mortLt100: 203898, mortLt100Moe: 6381, freeBase: 1646767, freeBaseMoe: 17803, freeBins: [266053, 48724, 68201, 236203, 206809, 420831, 162656, 107835, 39307, 31861, 14153, 44134], free3k: 90148, free3kMoe: 5603 },
  { fips: "44", abbr: "RI", mortBase: 188381, mortBaseMoe: 6911, mortBins: [19415, 6080, 5636, 10346, 3818, 26374, 25639, 31077, 16593, 12473, 5701, 25229], mort2k: 91073, mort2kMoe: 6331, mort3k: 43403, mort3kMoe: 4322, mortLt100: 19415, mortLt100Moe: 2957, freeBase: 105545, freeBaseMoe: 4648, freeBins: [15378, 1747, 4231, 6948, 2096, 13478, 13018, 18117, 7657, 7233, 2821, 12821], free3k: 22875, free3kMoe: 2775 },
  { fips: "45", abbr: "SC", mortBase: 927350, mortBaseMoe: 13432, mortBins: [86215, 28757, 19909, 60969, 51409, 216362, 139833, 113603, 65442, 46595, 22377, 75879], mort2k: 323896, mort2kMoe: 11717, mort3k: 144851, mort3kMoe: 7853, mortLt100: 86215, mortLt100Moe: 7217, freeBase: 722034, freeBaseMoe: 12833, freeBins: [187751, 20527, 17776, 48624, 40676, 157836, 83567, 57688, 28212, 19597, 13858, 45922], free3k: 79377, free3kMoe: 4789 },
  { fips: "46", abbr: "SD", mortBase: 132680, mortBaseMoe: 4471, mortBins: [17120, 4719, 1780, 5891, 3611, 17916, 20144, 19939, 11423, 8607, 5984, 15546], mort2k: 61499, mort2kMoe: 4065, mort3k: 30137, mort3kMoe: 2825, mortLt100: 17120, mortLt100Moe: 2195, freeBase: 124209, freeBaseMoe: 4196, freeBins: [26749, 3650, 2969, 7717, 4281, 18704, 14762, 14909, 7836, 6944, 3916, 11772], free3k: 22632, free3kMoe: 2314 },
  { fips: "47", abbr: "TN", mortBase: 1118036, mortBaseMoe: 16226, mortBins: [111253, 42610, 27691, 62143, 51401, 259917, 199247, 144975, 69056, 49453, 28745, 71545], mort2k: 363774, mort2kMoe: 11651, mort3k: 149743, mort3kMoe: 7764, mortLt100: 111253, mortLt100Moe: 6686, freeBase: 880730, freeBaseMoe: 14729, freeBins: [198002, 27597, 23781, 54874, 46175, 192995, 127004, 88681, 37553, 29228, 16644, 38196], free3k: 84068, free3kMoe: 5511 },
  { fips: "48", abbr: "TX", mortBase: 4024062, mortBaseMoe: 31447, mortBins: [342433, 98746, 51039, 124840, 92812, 447323, 416341, 506234, 382184, 371521, 262950, 927639], mort2k: 2450528, mort2kMoe: 33505, mort3k: 1562110, mort3kMoe: 26462, mortLt100: 342433, mortLt100Moe: 12721, freeBase: 3249302, freeBaseMoe: 34043, freeBins: [968404, 68731, 43470, 88088, 67964, 290376, 252361, 313631, 217685, 242176, 166429, 529987], free3k: 938592, free3kMoe: 17625 },
  { fips: "49", abbr: "UT", mortBase: 554345, mortBaseMoe: 8333, mortBins: [51362, 23245, 19757, 65228, 48935, 142658, 78784, 52170, 22647, 20377, 6658, 22524], mort2k: 124376, mort2kMoe: 6175, mort3k: 49559, mort3kMoe: 3978, mortLt100: 51362, mortLt100Moe: 4443, freeBase: 275109, freeBaseMoe: 6943, freeBins: [36979, 10084, 14419, 35333, 24967, 64842, 29525, 23699, 7722, 10661, 4144, 12734], free3k: 27539, free3kMoe: 2880 },
  { fips: "50", abbr: "VT", mortBase: 117535, mortBaseMoe: 4734, mortBins: [11665, 3999, 4297, 12950, 13678, 33843, 16532, 8660, 4129, 3657, 897, 3228], mort2k: 20571, mort2kMoe: 2445, mort3k: 7782, mort3kMoe: 1602, mortLt100: 11665, mortLt100Moe: 1775, freeBase: 90135, freeBaseMoe: 3643, freeBins: [14358, 2724, 3366, 13591, 9678, 21861, 9438, 7315, 1610, 2549, 929, 2716], free3k: 6194, free3kMoe: 1015 },
  { fips: "51", abbr: "VA", mortBase: 1541576, mortBaseMoe: 17882, mortBins: [146811, 50327, 46406, 119795, 106077, 374029, 240044, 178138, 85869, 66233, 29353, 98494], mort2k: 458087, mort2kMoe: 13008, mort3k: 194080, mort3kMoe: 8467, mortLt100: 146811, mortLt100Moe: 7989, freeBase: 821331, freeBaseMoe: 14271, freeBins: [137604, 24170, 29928, 81647, 73639, 184895, 104395, 71002, 31461, 29983, 12172, 40435], free3k: 82590, free3kMoe: 4664 },
  { fips: "53", abbr: "WA", mortBase: 1276752, mortBaseMoe: 16469, mortBins: [108277, 37879, 30950, 95101, 82090, 318805, 198282, 150705, 68627, 55500, 30580, 99956], mort2k: 405368, mort2kMoe: 10759, mort3k: 186036, mort3kMoe: 7298, mortLt100: 108277, mortLt100Moe: 6750, freeBase: 720951, freeBaseMoe: 11488, freeBins: [118885, 16470, 17673, 57969, 55621, 164617, 100562, 74946, 33982, 27768, 12108, 40350], free3k: 80226, free3kMoe: 4688 },
  { fips: "54", abbr: "WV", mortBase: 242502, mortBaseMoe: 7750, mortBins: [33886, 15843, 7490, 25343, 24404, 67683, 28592, 19103, 6842, 5722, 2813, 4781], mort2k: 39261, mort2kMoe: 3229, mort3k: 13316, mort3kMoe: 2017, mortLt100: 33886, mortLt100Moe: 3210, freeBase: 316431, freeBaseMoe: 7239, freeBins: [103861, 17916, 15332, 44098, 26504, 58958, 21646, 11753, 5664, 4891, 2338, 3470], free3k: 10699, free3kMoe: 1768 },
  { fips: "55", abbr: "WI", mortBase: 1025232, mortBaseMoe: 12959, mortBins: [117609, 34459, 34527, 97372, 87648, 313160, 148068, 87928, 34985, 27628, 12490, 29358], mort2k: 192389, mort2kMoe: 6223, mort3k: 69476, mort3kMoe: 4026, mortLt100: 117609, mortLt100Moe: 5321, freeBase: 722500, freeBaseMoe: 10031, freeBins: [130155, 24641, 32857, 84290, 70536, 185723, 82922, 48233, 18566, 15748, 6265, 22564], free3k: 44577, free3kMoe: 3035 },
  { fips: "56", abbr: "WY", mortBase: 99283, mortBaseMoe: 4717, mortBins: [8293, 1582, 2876, 4186, 4987, 17504, 19996, 12848, 6419, 5670, 3113, 11809], mort2k: 39859, mort2kMoe: 3952, mort3k: 20592, mort3kMoe: 3072, mortLt100: 8293, mortLt100Moe: 1855, freeBase: 79754, freeBaseMoe: 4289, freeBins: [16835, 1729, 2236, 4065, 4746, 11754, 10763, 9157, 3796, 4315, 1960, 8398], free3k: 14673, free3kMoe: 2428 },
];

/** A share in percent and its 90% margin of error in percentage points. */
export interface Share {
  pct: number;
  moe: number;
}

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

/**
 * Median of a bracketed distribution by linear interpolation inside the bracket that holds the
 * middle household. `edges` are the lower edges of the brackets; the last bracket is open-ended and
 * cannot be interpolated, so a median that lands in it is an error.
 */
function medianFromBrackets(bins: readonly number[], edges: readonly number[]) {
  const total = bins.reduce((s, n) => s + n, 0);
  let below = 0;
  for (let i = 0; i < bins.length; i++) {
    if (below + bins[i] >= total / 2) {
      if (i === bins.length - 1) throw new Error("Median falls in the open-ended top bracket");
      const lo = edges[i];
      const hi = edges[i + 1];
      return { value: lo + ((total / 2 - below) / bins[i]) * (hi - lo), index: i };
    }
    below += bins[i];
  }
  throw new Error("Empty distribution");
}

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

export interface InsuranceResult extends InsuranceRow {
  name: string;
  /** 1 = the highest estimated median premium among owners with a mortgage */
  rank: number;
  /** estimated median annual premium, owners with a mortgage, rounded to $10 */
  mortMedian: number;
  /** the published bracket that holds that median */
  mortBracket: string;
  /** estimated median annual premium, owners without a mortgage, rounded to $10 */
  freeMedian: number;
  freeBracket: string;
  /** owners with a mortgage paying $3,000 or more, and $2,000 or more, a year */
  mortShare3k: Share;
  mortShare2k: Share;
  /** owners without a mortgage paying $3,000 or more a year */
  freeShare3k: Share;
  /** owners with a mortgage reporting less than $100 a year */
  lt100Share: Share;
  /** B25077 median home value, B25103 median property tax, B19013 median income */
  value: number;
  tax: number;
  income: number;
  /** estimated median premium as a percentage of the median home value */
  premiumPctOfValue: number;
  /** estimated median premium divided by the median property tax bill */
  insuranceToTax: number;
  /** median property tax plus estimated median premium, per month */
  carryMonthly: number;
  /** median property tax plus estimated median premium, as % of median household income */
  carryShareOfIncome: number;
  /** principal and interest on the loan for the median home at the report rate */
  pi: number;
  taxMonthly: number;
  insuranceMonthly: number;
  /** principal, interest, property tax, and insurance */
  payment: number;
  /** principal, interest, and property tax only (the definition used by the affordability report) */
  paymentNoInsurance: number;
  incomeMonthly: number;
  /** payment as % of gross monthly income, with and without insurance */
  share: number;
  shareNoInsurance: number;
  /** percentage points of income that insurance adds */
  insuranceAddsPts: number;
  /** insurance as % of the full monthly payment */
  insuranceShareOfPayment: number;
  /** annual income needed for the full payment to equal the guideline share */
  incomeNeeded: number;
}

function compute(
  row: InsuranceRow,
  name: string,
  value: number,
  tax: number,
  income: number,
): Omit<InsuranceResult, "rank"> {
  const mort = medianFromBrackets(row.mortBins, BRACKET_EDGES);
  const free = medianFromBrackets(row.freeBins, BRACKET_EDGES);
  const mortMedian = roundTo(mort.value, 10);
  const freeMedian = roundTo(free.value, 10);

  const loan = value * (1 - REPORT.downPaymentPct / 100);
  const pi = monthlyPrincipalInterest(loan, REPORT.mortgageRate, REPORT.termYears);
  const taxMonthly = tax / 12;
  const insuranceMonthly = mortMedian / 12;
  const paymentNoInsurance = pi + taxMonthly;
  const payment = paymentNoInsurance + insuranceMonthly;
  const incomeMonthly = income / 12;

  return {
    ...row,
    name,
    mortMedian,
    mortBracket: BRACKET_LABELS[mort.index],
    freeMedian,
    freeBracket: BRACKET_LABELS[free.index],
    mortShare3k: share(row.mort3k, row.mort3kMoe, row.mortBase, row.mortBaseMoe),
    mortShare2k: share(row.mort2k, row.mort2kMoe, row.mortBase, row.mortBaseMoe),
    freeShare3k: share(row.free3k, row.free3kMoe, row.freeBase, row.freeBaseMoe),
    lt100Share: share(row.mortLt100, row.mortLt100Moe, row.mortBase, row.mortBaseMoe),
    value,
    tax,
    income,
    premiumPctOfValue: (mortMedian / value) * 100,
    insuranceToTax: mortMedian / tax,
    carryMonthly: (tax + mortMedian) / 12,
    carryShareOfIncome: ((tax + mortMedian) / income) * 100,
    pi,
    taxMonthly,
    insuranceMonthly,
    payment,
    paymentNoInsurance,
    incomeMonthly,
    share: (payment / incomeMonthly) * 100,
    shareNoInsurance: (paymentNoInsurance / incomeMonthly) * 100,
    insuranceAddsPts: (insuranceMonthly / incomeMonthly) * 100,
    insuranceShareOfPayment: (insuranceMonthly / payment) * 100,
    incomeNeeded: (payment * 12) / (REPORT.guidelinePct / 100),
  };
}

/** All 50 states and DC, ranked from the highest to the lowest estimated median premium. */
export const STATE_RESULTS: InsuranceResult[] = INSURANCE_ROWS.map((row) => {
  const housing = STATE_ROWS.find((s) => s.fips === row.fips);
  if (!housing) throw new Error(`Missing housing inputs for FIPS ${row.fips}`);
  if (housing.abbr !== row.abbr) throw new Error(`State mismatch for FIPS ${row.fips}`);
  return compute(row, housing.name, housing.value, housing.tax, housing.income);
})
  .sort((a, b) => b.mortMedian - a.mortMedian || b.mortShare3k.pct - a.mortShare3k.pct)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<InsuranceResult, "rank"> = compute(
  US_INSURANCE_ROW,
  "United States",
  US_ROW.value,
  US_ROW.tax,
  US_ROW.income,
);

export function getStateResult(abbr: string): InsuranceResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

/**
 * U.S. estimated median among owners with a mortgage who report $100 or more a year. Used only in
 * the note on the "less than $100" bracket, to show how much that bracket pulls the median down.
 */
export const US_MEDIAN_MORTGAGE_EXCLUDING_UNDER_100 = roundTo(
  medianFromBrackets(US_INSURANCE_ROW.mortBins.slice(1), BRACKET_EDGES.slice(1)).value,
  10,
);

/**
 * How much the mortgage rate would have to rise to add `extraMonthly` dollars to the principal and
 * interest payment on `loan`, starting from `ratePct`. Percentage points, found by bisection.
 */
export function rateRiseEquivalent(loan: number, ratePct: number, extraMonthly: number): number {
  const target = monthlyPrincipalInterest(loan, ratePct, REPORT.termYears) + extraMonthly;
  let lo = ratePct;
  let hi = ratePct + 10;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (monthlyPrincipalInterest(loan, mid, REPORT.termYears) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2 - ratePct;
}

/** Number of places whose full payment (with insurance) is above the guideline share of income. */
export function countOverGuideline(withInsurance: boolean, premiumMultiplier = 1): number {
  return STATE_RESULTS.filter((r) => {
    const insurance = (r.mortMedian * premiumMultiplier) / 12;
    const payment = r.paymentNoInsurance + (withInsurance ? insurance : 0);
    return (payment / r.incomeMonthly) * 100 > REPORT.guidelinePct;
  }).length;
}

/** Pearson correlation of two equally long series. */
export function correlation(xs: number[], ys: number[]): number {
  const n = xs.length;
  const mx = xs.reduce((s, x) => s + x, 0) / n;
  const my = ys.reduce((s, y) => s + y, 0) / n;
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
  "rank_1_highest_estimated_median_premium",
  "state",
  "abbr",
  "fips",
  "owners_with_mortgage_count",
  "estimated_median_annual_premium_with_mortgage_usd",
  "median_premium_bracket_with_mortgage",
  "share_paying_3000_or_more_with_mortgage_pct",
  "share_paying_3000_or_more_with_mortgage_moe90_pts",
  "share_paying_2000_or_more_with_mortgage_pct",
  "share_paying_2000_or_more_with_mortgage_moe90_pts",
  "share_reporting_under_100_with_mortgage_pct",
  "owners_without_mortgage_count",
  "estimated_median_annual_premium_without_mortgage_usd",
  "median_premium_bracket_without_mortgage",
  "share_paying_3000_or_more_without_mortgage_pct",
  "median_home_value_usd",
  "median_property_tax_paid_usd",
  "median_household_income_usd",
  "premium_pct_of_median_home_value",
  "premium_to_property_tax_ratio",
  "monthly_tax_plus_insurance_usd",
  "tax_plus_insurance_share_of_income_pct",
  "mortgage_rate_pct",
  "monthly_principal_interest_usd",
  "monthly_property_tax_usd",
  "monthly_insurance_usd",
  "monthly_payment_with_insurance_usd",
  "payment_share_of_gross_income_with_insurance_pct",
  "monthly_payment_without_insurance_usd",
  "payment_share_of_gross_income_without_insurance_pct",
  "insurance_adds_pts_of_income",
  "income_needed_at_28pct_with_insurance_usd",
] as const;

function csvLine(r: InsuranceResult | (Omit<InsuranceResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.mortBase,
    r.mortMedian,
    r.mortBracket,
    round(r.mortShare3k.pct, 2),
    round(r.mortShare3k.moe, 2),
    round(r.mortShare2k.pct, 2),
    round(r.mortShare2k.moe, 2),
    round(r.lt100Share.pct, 2),
    r.freeBase,
    r.freeMedian,
    r.freeBracket,
    round(r.freeShare3k.pct, 2),
    r.value,
    r.tax,
    r.income,
    round(r.premiumPctOfValue, 3),
    round(r.insuranceToTax, 2),
    round(r.carryMonthly),
    round(r.carryShareOfIncome, 2),
    REPORT.mortgageRate,
    round(r.pi),
    round(r.taxMonthly),
    round(r.insuranceMonthly),
    round(r.payment),
    round(r.share, 2),
    round(r.paymentNoInsurance),
    round(r.shareNoInsurance, 2),
    round(r.insuranceAddsPts, 2),
    round(r.incomeNeeded),
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

/** Household counts in millions with one decimal, such as "51.6 million". */
export const millions = (n: number) => `${(n / 1_000_000).toFixed(1)} million`;
