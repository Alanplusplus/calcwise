/**
 * Data and calculations for the "Housing Cost Burden by State" report.
 * The report page, the sortable table, and the CSV download all read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * Inputs (ACS 2025 1-year; tables B25070 gross rent as a percentage of household income, B25091
 * mortgage status by selected monthly owner costs as a percentage of household income, B25071
 * median gross rent as a percentage of household income, and B25092 median selected monthly
 * owner costs as a percentage of household income) were read on 2026-11-11 from the Census
 * Bureau's table-based ACS Summary File (www2.census.gov/programs-surveys/acs/summary_file/2025/
 * table-based-SF/data/1YRData, files acsdt1y2025-b25070, -b25091, -b25071, and -b25092). The
 * Census API requires a key and was not used.
 *
 * What is stored: for every place, the households in the "30.0 percent or more" brackets and the
 * "50.0 percent or more" bracket, and the households for which the ratio was computed (the table
 * total minus the "not computed" row, which the Census Bureau excludes from percentages). Those
 * counts are sums of the published bracket estimates; their margins of error are the square root
 * of the sum of the squared published margins (ACS General Handbook, chapter 8).
 * Checks: in every one of the 52 places the published brackets add up to the table total (B25070
 * rows 2 to 11 equal row 1; B25091 rows 3 to 12 equal row 2, rows 14 to 23 equal row 13, and
 * rows 2 and 13 equal row 1); the national renter counts (22,486,693 households at 30% or more,
 * 11,401,379 at 50% or more, of 43,437,030 with a computed ratio) agree with an independent
 * tabulation of the same table; and state renter shares (for example Florida 61.3%, California
 * 55.5%, North Dakota 34.7%) agree with it as well.
 * B25092 reports the median for owners without a mortgage as a bottom-coded "9.0" with no margin
 * of error in most states, so only the median for owners with a mortgage is stored.
 *
 * Median gross rent (B25064) and median renter household income (B25119) are NOT stored again
 * here: they come from the rent-vs-buy report's STATE_INPUTS, which in turn reads the housing
 * inputs of the affordability report. The guard below fails the build if the rent-vs-buy report
 * moves to a different ACS year before this one does, so the three reports can never silently
 * mix survey years.
 */

import {
  REPORT as RENT_REPORT,
  STATE_INPUTS,
  US_INPUTS,
  pct1,
  usd0,
} from "./rent-vs-buy-by-state";

export { pct1, usd0 };

export const REPORT = {
  slug: "housing-cost-burden-by-state",
  path: "/reports/housing-cost-burden-by-state",
  csvPath: "/reports/housing-cost-burden-by-state/data.csv",
  datePublished: "2026-11-11",
  dateModified: "2026-11-11",
  /** ACS survey year of every figure */
  acsYear: 2025,
  /** Share of income at or above which a household is called cost-burdened (HUD, 24 CFR 91.5) */
  burdenPct: 30,
  /** Share of income at or above which a household is called severely cost-burdened */
  severePct: 50,
} as const;

if (RENT_REPORT.acsYear !== REPORT.acsYear) {
  throw new Error(
    `housing-cost-burden-by-state uses ACS ${REPORT.acsYear} but rent-vs-buy-by-state now uses ACS ` +
      `${RENT_REPORT.acsYear}. Refresh the burden rows in src/lib/reports/housing-cost-burden-by-state.ts ` +
      `(tables B25070, B25091, B25071, B25092) in the same change.`,
  );
}

export const REPORT_SOURCES = {
  acsRenters: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25070 (gross rent as a percentage of household income)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25070",
  },
  acsOwners: {
    label:
      "U.S. Census Bureau, ACS 2025 1-year, table B25091 (mortgage status by selected monthly owner costs as a percentage of household income)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25091",
  },
  acsRentMedian: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25071 (median gross rent as a percentage of household income)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25071",
  },
  acsOwnerMedian: {
    label:
      "U.S. Census Bureau, ACS 2025 1-year, table B25092 (median selected monthly owner costs as a percentage of household income)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25092",
  },
  acsRent: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25064 (median gross rent)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25064",
  },
  acsTenureIncome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25119 (median household income by tenure)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25119",
  },
  acsFile: {
    label: "Census Bureau, 2025 ACS 1-year Summary File, table-based format (released Oct. 29, 2026)",
    href: "https://www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData/",
  },
  acsDefinitions: {
    label: "Census Bureau, 2025 ACS Subject Definitions (gross rent, selected monthly owner costs, percentage of household income)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
  censusQa: {
    label: "Census Bureau, Measuring Housing Affordability Q&A (treatment of \"not computed\" households)",
    href: "https://www2.census.gov/about/training-workshops/2024/2024-08-08-housing-qa.pdf",
  },
  hud: {
    label: "24 CFR 91.5 (HUD definitions of cost burden and severe cost burden)",
    href: "https://www.ecfr.gov/current/title-24/subtitle-A/part-91/subpart-A/section-91.5",
  },
  crs: {
    label:
      "Congressional Research Service, report R48450 on housing cost burdens (2023 ACS), section on the limits of the 30% standard",
    href: "https://www.congress.gov/crs_external_products/R/HTML/R48450.web.html",
  },
} as const;

export interface BurdenRow {
  fips: string;
  abbr: string;
  /** B25070_001: all renter-occupied housing units */
  renterTotal: number;
  /** B25091_001: all owner-occupied housing units */
  ownerTotal: number;
  /** B25070_001 minus _011 (not computed): renter households with a computed ratio, and its margin */
  renterBase: number;
  renterBaseMoe: number;
  /** B25070_007 to _010: gross rent at 30.0% or more of household income */
  renter30: number;
  renter30Moe: number;
  /** B25070_010: gross rent at 50.0% or more */
  renter50: number;
  renter50Moe: number;
  /** B25091_002 minus _012: owners with a mortgage and a computed ratio */
  mortBase: number;
  mortBaseMoe: number;
  /** B25091_008 to _011: selected monthly owner costs at 30.0% or more, with a mortgage */
  mort30: number;
  mort30Moe: number;
  /** B25091_011: 50.0% or more, with a mortgage */
  mort50: number;
  mort50Moe: number;
  /** B25091_013 minus _023: owners without a mortgage and a computed ratio */
  freeBase: number;
  freeBaseMoe: number;
  /** B25091_019 to _022: 30.0% or more, without a mortgage */
  free30: number;
  free30Moe: number;
  /** B25091_022: 50.0% or more, without a mortgage */
  free50: number;
  free50Moe: number;
  /** B25071_001: median gross rent as a percentage of household income, and its margin */
  rentMedianPct: number;
  rentMedianPctMoe: number;
  /** B25092_002: median selected monthly owner costs as a percentage of income, owners with a mortgage */
  mortMedianPct: number;
  mortMedianPctMoe: number;
}

export const US_BURDEN_ROW: BurdenRow = 
{ fips: "00", abbr: "US", renterTotal: 46551688, ownerTotal: 87511734, renterBase: 43437030, renterBaseMoe: 196020, renter30: 22486693, renter30Moe: 122055, renter50: 11401379, renter50Moe: 84431, mortBase: 51353084, mortBaseMoe: 174879, mort30: 15750833, mort30Moe: 81994, mort50: 6573122, mort50Moe: 53970, freeBase: 35383167, freeBaseMoe: 153418, free30: 5451110, free30Moe: 43989, free50: 2735250, free50Moe: 31963, rentMedianPct: 30.9, rentMedianPctMoe: 0.1, mortMedianPct: 21.9, mortMedianPctMoe: 0.3 };

const BURDEN_ROWS: BurdenRow[] = [
  { fips: "01", abbr: "AL", renterTotal: 601847, ownerTotal: 1468988, renterBase: 529698, renterBaseMoe: 15092, renter30: 262294, renter30Moe: 11525, renter50: 135394, renter50Moe: 8288, mortBase: 778606, mortBaseMoe: 14324, mort30: 205628, mort30Moe: 8936, mort50: 83366, mort50Moe: 6154, freeBase: 673365, freeBaseMoe: 12088, free30: 82841, free30Moe: 5921, free50: 40408, free50Moe: 4084, rentMedianPct: 29.8, rentMedianPctMoe: 0.8, mortMedianPct: 20.0, mortMedianPctMoe: 0.4 },
  { fips: "02", abbr: "AK", renterTotal: 93426, ownerTotal: 185494, renterBase: 85069, renterBaseMoe: 4618, renter30: 36736, renter30Moe: 4184, renter50: 14746, renter50Moe: 2313, mortBase: 103844, mortBaseMoe: 4550, mort30: 28415, mort30Moe: 2980, mort50: 10586, mort50Moe: 1780, freeBase: 80409, freeBaseMoe: 3690, free30: 9983, free30Moe: 1534, free50: 4565, free50Moe: 958, rentMedianPct: 27.2, rentMedianPctMoe: 1.5, mortMedianPct: 21.1, mortMedianPctMoe: 0.8 },
  { fips: "04", abbr: "AZ", renterTotal: 1012686, ownerTotal: 2028249, renterBase: 941251, renterBaseMoe: 18995, renter30: 511761, renter30Moe: 17407, renter50: 247872, renter50Moe: 11904, mortBase: 1233585, mortBaseMoe: 20815, mort30: 400740, mort30Moe: 13667, mort50: 161330, mort50Moe: 8334, freeBase: 770198, freeBaseMoe: 15713, free30: 91638, free30Moe: 6256, free50: 46564, free50Moe: 4489, rentMedianPct: 32.2, rentMedianPctMoe: 0.7, mortMedianPct: 22.5, mortMedianPctMoe: 0.3 },
  { fips: "05", abbr: "AR", renterTotal: 419056, ownerTotal: 858749, renterBase: 370447, renterBaseMoe: 10839, renter30: 166564, renter30Moe: 10663, renter50: 81945, renter50Moe: 7927, mortBase: 450014, mortBaseMoe: 11133, mort30: 118894, mort30Moe: 7199, mort50: 46602, mort50Moe: 4595, freeBase: 399608, freeBaseMoe: 9633, free30: 51013, free30Moe: 4536, free50: 23751, free50Moe: 2839, rentMedianPct: 27.8, rentMedianPctMoe: 0.8, mortMedianPct: 19.9, mortMedianPctMoe: 0.4 },
  { fips: "06", abbr: "CA", renterTotal: 6159367, ownerTotal: 7739255, renterBase: 5849874, renterBaseMoe: 45660, renter30: 3243815, renter30Moe: 39647, renter50: 1696822, renter50Moe: 26483, mortBase: 5045647, mortBaseMoe: 35694, mort30: 2021975, mort30Moe: 26143, mort50: 920366, mort50Moe: 16372, freeBase: 2624891, freeBaseMoe: 26476, free30: 477340, free30Moe: 14124, free50: 252135, free50Moe: 10389, rentMedianPct: 32.9, rentMedianPctMoe: 0.3, mortMedianPct: 25.3, mortMedianPctMoe: 0.2 },
  { fips: "08", abbr: "CO", renterTotal: 861251, ownerTotal: 1621891, renterBase: 818980, renterBaseMoe: 16488, renter30: 423929, renter30Moe: 16624, renter50: 207991, renter50Moe: 12048, mortBase: 1103167, mortBaseMoe: 17172, mort30: 381080, mort30Moe: 12940, mort50: 156678, mort50Moe: 8111, freeBase: 507068, freeBaseMoe: 12271, free30: 73640, free30Moe: 5014, free50: 41267, free50Moe: 3927, rentMedianPct: 30.9, rentMedianPctMoe: 0.7, mortMedianPct: 23.4, mortMedianPctMoe: 0.3 },
  { fips: "09", abbr: "CT", renterTotal: 486030, ownerTotal: 970885, renterBase: 457977, renterBaseMoe: 11283, renter30: 254715, renter30Moe: 12583, renter50: 130673, renter50Moe: 8917, mortBase: 607873, mortBaseMoe: 10077, mort30: 188161, mort30Moe: 8627, mort50: 78098, mort50Moe: 5840, freeBase: 356587, freeBaseMoe: 8498, free30: 69087, free30Moe: 5306, free50: 31942, free50Moe: 3858, rentMedianPct: 32.7, rentMedianPctMoe: 0.8, mortMedianPct: 22.3, mortMedianPctMoe: 0.3 },
  { fips: "10", abbr: "DE", renterTotal: 106854, ownerTotal: 315269, renterBase: 100561, renterBaseMoe: 7873, renter30: 50868, renter30Moe: 5860, renter50: 26029, renter50Moe: 4541, mortBase: 194211, mortBaseMoe: 6957, mort30: 55093, mort30Moe: 4625, mort50: 22264, mort50Moe: 3046, freeBase: 119101, freeBaseMoe: 5790, free30: 17302, free30Moe: 2942, free50: 8953, free50Moe: 2087, rentMedianPct: 30.3, rentMedianPctMoe: 2.1, mortMedianPct: 20.2, mortMedianPctMoe: 0.8 },
  { fips: "11", abbr: "DC", renterTotal: 206244, ownerTotal: 126951, renterBase: 192088, renterBaseMoe: 7035, renter30: 94472, renter30Moe: 7531, renter50: 44326, renter50Moe: 4762, mortBase: 92613, mortBaseMoe: 4618, mort30: 24853, mort30Moe: 3468, mort50: 10751, mort50Moe: 2049, freeBase: 33051, freeBaseMoe: 2825, free30: 5667, free30Moe: 1499, free50: 3162, free50Moe: 1087, rentMedianPct: 29.6, rentMedianPctMoe: 1.2, mortMedianPct: 21.2, mortMedianPctMoe: 0.9 },
  { fips: "12", abbr: "FL", renterTotal: 2981485, ownerTotal: 6345311, renterBase: 2797066, renterBaseMoe: 32155, renter30: 1713801, renter30Moe: 32393, renter50: 876972, renter50Moe: 20768, mortBase: 3445841, mortBaseMoe: 33415, mort30: 1341918, mort30Moe: 26089, mort50: 606177, mort50Moe: 18299, freeBase: 2823678, freeBaseMoe: 32698, free30: 558717, free30Moe: 15348, free50: 289624, free50Moe: 10883, rentMedianPct: 35.5, rentMedianPctMoe: 0.5, mortMedianPct: 25.1, mortMedianPctMoe: 0.3 },
  { fips: "13", abbr: "GA", renterTotal: 1444265, ownerTotal: 2825592, renterBase: 1341373, renterBaseMoe: 24914, renter30: 707616, renter30Moe: 21030, renter50: 349590, renter50Moe: 15403, mortBase: 1726416, mortBaseMoe: 21814, mort30: 533000, mort30Moe: 15547, mort50: 225498, mort50Moe: 10410, freeBase: 1069527, freeBaseMoe: 19097, free30: 136770, free30Moe: 6709, free50: 69254, free50Moe: 4672, rentMedianPct: 31.4, rentMedianPctMoe: 0.6, mortMedianPct: 21.7, mortMedianPctMoe: 0.3 },
  { fips: "15", abbr: "HI", renterTotal: 186614, ownerTotal: 314269, renterBase: 173534, renterBaseMoe: 6194, renter30: 95643, renter30Moe: 5460, renter50: 50316, renter50Moe: 3298, mortBase: 185547, mortBaseMoe: 6220, mort30: 69511, mort30Moe: 4433, mort50: 30156, mort50Moe: 2973, freeBase: 126115, freeBaseMoe: 5790, free30: 18987, free30Moe: 2434, free50: 8757, free50Moe: 1659, rentMedianPct: 32.8, rentMedianPctMoe: 1.2, mortMedianPct: 24.9, mortMedianPctMoe: 0.8 },
  { fips: "16", abbr: "ID", renterTotal: 220973, ownerTotal: 544227, renterBase: 207078, renterBaseMoe: 7324, renter30: 101068, renter30Moe: 6141, renter50: 49071, renter50Moe: 3790, mortBase: 326755, mortBaseMoe: 8379, mort30: 92223, mort30Moe: 5161, mort50: 34885, mort50Moe: 3253, freeBase: 211978, freeBaseMoe: 7192, free30: 25051, free30Moe: 2847, free50: 13448, free50Moe: 2093, rentMedianPct: 29.6, rentMedianPctMoe: 0.7, mortMedianPct: 20.9, mortMedianPctMoe: 0.4 },
  { fips: "17", abbr: "IL", renterTotal: 1655530, ownerTotal: 3478753, renterBase: 1531492, renterBaseMoe: 23887, renter30: 761428, renter30Moe: 20091, renter50: 405142, renter50Moe: 12919, mortBase: 2056133, mortBaseMoe: 23510, mort30: 599021, mort30Moe: 14744, mort50: 246061, mort50Moe: 8370, freeBase: 1395011, freeBaseMoe: 19268, free30: 236986, free30Moe: 9015, free50: 119969, free50Moe: 6068, rentMedianPct: 29.9, rentMedianPctMoe: 0.5, mortMedianPct: 21.4, mortMedianPctMoe: 0.3 },
  { fips: "18", abbr: "IN", renterTotal: 818290, ownerTotal: 1998396, renterBase: 758664, renterBaseMoe: 14777, renter30: 367565, renter30Moe: 13625, renter50: 187026, renter50Moe: 9328, mortBase: 1216104, mortBaseMoe: 16339, mort30: 294512, mort30Moe: 10452, mort50: 110175, mort50Moe: 6128, freeBase: 767415, freeBaseMoe: 14234, free30: 92541, free30Moe: 5647, free50: 43404, free50Moe: 3792, rentMedianPct: 29.3, rentMedianPctMoe: 0.6, mortMedianPct: 19.5, mortMedianPctMoe: 0.2 },
  { fips: "19", abbr: "IA", renterTotal: 387776, ownerTotal: 967728, renterBase: 358108, renterBaseMoe: 9465, renter30: 166604, renter30Moe: 7803, renter50: 81681, renter50Moe: 4834, mortBase: 557131, mortBaseMoe: 9901, mort30: 125564, mort30Moe: 5832, mort50: 46216, mort50Moe: 3897, freeBase: 403737, freeBaseMoe: 8430, free30: 53433, free30Moe: 3425, free50: 26193, free50Moe: 2390, rentMedianPct: 28.5, rentMedianPctMoe: 0.7, mortMedianPct: 19.2, mortMedianPctMoe: 0.3 },
  { fips: "20", abbr: "KS", renterTotal: 391639, ownerTotal: 813999, renterBase: 367363, renterBaseMoe: 9855, renter30: 157016, renter30Moe: 8314, renter50: 75352, renter50Moe: 5208, mortBase: 448609, mortBaseMoe: 10034, mort30: 110145, mort30Moe: 5771, mort50: 38276, mort50Moe: 2895, freeBase: 360730, freeBaseMoe: 8969, free30: 49694, free30Moe: 3621, free50: 23311, free50Moe: 2377, rentMedianPct: 27.1, rentMedianPctMoe: 0.8, mortMedianPct: 19.8, mortMedianPctMoe: 0.3 },
  { fips: "21", abbr: "KY", renterTotal: 598691, ownerTotal: 1286890, renterBase: 525901, renterBaseMoe: 14082, renter30: 244837, renter30Moe: 11146, renter50: 120496, renter50Moe: 7900, mortBase: 686516, mortBaseMoe: 13977, mort30: 169840, mort30Moe: 7667, mort50: 68927, mort50Moe: 4769, freeBase: 584444, freeBaseMoe: 10842, free30: 76571, free30Moe: 4660, free50: 39030, free50Moe: 3271, rentMedianPct: 28.5, rentMedianPctMoe: 0.6, mortMedianPct: 19.6, mortMedianPctMoe: 0.3 },
  { fips: "22", abbr: "LA", renterTotal: 594118, ownerTotal: 1261729, renterBase: 524377, renterBaseMoe: 14869, renter30: 279905, renter30Moe: 12712, renter50: 148087, renter50Moe: 8508, mortBase: 637082, mortBaseMoe: 13749, mort30: 182319, mort30Moe: 9176, mort50: 80165, mort50Moe: 6237, freeBase: 607402, freeBaseMoe: 11176, free30: 94241, free30Moe: 6797, free50: 47500, free50Moe: 4777, rentMedianPct: 31.7, rentMedianPctMoe: 0.9, mortMedianPct: 20.5, mortMedianPctMoe: 0.5 },
  { fips: "23", abbr: "ME", renterTotal: 161595, ownerTotal: 459164, renterBase: 148110, renterBaseMoe: 7002, renter30: 73048, renter30Moe: 5844, renter50: 35136, renter50Moe: 3321, mortBase: 254535, mortBaseMoe: 6930, mort30: 72331, mort30Moe: 4629, mort50: 26592, mort50Moe: 2764, freeBase: 201570, freeBaseMoe: 5892, free30: 32421, free30Moe: 2833, free50: 15375, free50Moe: 1831, rentMedianPct: 29.7, rentMedianPctMoe: 1.2, mortMedianPct: 21.0, mortMedianPctMoe: 0.5 },
  { fips: "24", abbr: "MD", renterTotal: 793554, ownerTotal: 1635289, renterBase: 747733, renterBaseMoe: 14482, renter30: 387411, renter30Moe: 14461, renter50: 204811, renter50Moe: 10063, mortBase: 1126956, mortBaseMoe: 14916, mort30: 318683, mort30Moe: 11650, mort50: 134918, mort50Moe: 7366, freeBase: 492949, freeBaseMoe: 11435, free30: 72052, free30Moe: 5223, free50: 38157, free50Moe: 3904, rentMedianPct: 31.0, rentMedianPctMoe: 0.7, mortMedianPct: 21.1, mortMedianPctMoe: 0.3 },
  { fips: "25", abbr: "MA", renterTotal: 1053310, ownerTotal: 1774484, renterBase: 1000584, renterBaseMoe: 17035, renter30: 525245, renter30Moe: 16061, renter50: 267982, renter50Moe: 11687, mortBase: 1146364, mortBaseMoe: 15694, mort30: 371678, mort30Moe: 12756, mort50: 155221, mort50Moe: 8016, freeBase: 617701, freeBaseMoe: 12053, free30: 130320, free30Moe: 6869, free50: 63676, free50Moe: 4491, rentMedianPct: 31.2, rentMedianPctMoe: 0.6, mortMedianPct: 22.8, mortMedianPctMoe: 0.3 },
  { fips: "26", abbr: "MI", renterTotal: 1075747, ownerTotal: 3075243, renterBase: 996054, renterBaseMoe: 17606, renter30: 514871, renter30Moe: 15726, renter50: 276866, renter50Moe: 11768, mortBase: 1730457, mortBaseMoe: 16005, mort30: 444630, mort30Moe: 12552, mort50: 180235, mort50Moe: 8603, freeBase: 1313728, freeBaseMoe: 16654, free30: 194659, free30Moe: 7224, free50: 95589, free50Moe: 4837, rentMedianPct: 30.9, rentMedianPctMoe: 0.5, mortMedianPct: 19.9, mortMedianPctMoe: 0.2 },
  { fips: "27", abbr: "MN", renterTotal: 667944, ownerTotal: 1723926, renterBase: 631968, renterBaseMoe: 11529, renter30: 307999, renter30Moe: 10445, renter50: 151360, renter50Moe: 6440, mortBase: 1075863, mortBaseMoe: 11035, mort30: 278337, mort30Moe: 8742, mort50: 101144, mort50Moe: 5413, freeBase: 639464, freeBaseMoe: 8593, free30: 86211, free30Moe: 4127, free50: 40135, free50Moe: 2661, rentMedianPct: 29.5, rentMedianPctMoe: 0.5, mortMedianPct: 20.7, mortMedianPctMoe: 0.3 },
  { fips: "28", abbr: "MS", renterTotal: 339628, ownerTotal: 857689, renterBase: 286496, renterBaseMoe: 12043, renter30: 152762, renter30Moe: 8845, renter50: 81356, renter50Moe: 6626, mortBase: 403270, mortBaseMoe: 11093, mort30: 116472, mort30Moe: 6963, mort50: 52425, mort50Moe: 4536, freeBase: 443350, freeBaseMoe: 10401, free30: 61155, free30Moe: 4913, free50: 29408, free50Moe: 3500, rentMedianPct: 31.7, rentMedianPctMoe: 1.1, mortMedianPct: 21.0, mortMedianPctMoe: 0.6 },
  { fips: "29", abbr: "MO", renterTotal: 805660, ownerTotal: 1798959, renterBase: 744299, renterBaseMoe: 15423, renter30: 337710, renter30Moe: 12892, renter50: 158034, renter50Moe: 9134, mortBase: 1049389, mortBaseMoe: 18054, mort30: 253047, mort30Moe: 9184, mort50: 101993, mort50Moe: 5419, freeBase: 735764, freeBaseMoe: 13338, free30: 96068, free30Moe: 6101, free50: 43673, free50Moe: 4149, rentMedianPct: 28.0, rentMedianPctMoe: 0.5, mortMedianPct: 19.6, mortMedianPctMoe: 0.3 },
  { fips: "30", abbr: "MT", renterTotal: 147108, ownerTotal: 334167, renterBase: 133285, renterBaseMoe: 6005, renter30: 64855, renter30Moe: 5157, renter50: 26088, renter50Moe: 2961, mortBase: 179565, mortBaseMoe: 5725, mort30: 57517, mort30Moe: 4897, mort50: 23309, mort50Moe: 3280, freeBase: 152989, freeBaseMoe: 5320, free30: 23330, free30Moe: 2874, free50: 11782, free50Moe: 1977, rentMedianPct: 29.4, rentMedianPctMoe: 1.0, mortMedianPct: 22.2, mortMedianPctMoe: 0.8 },
  { fips: "31", abbr: "NE", renterTotal: 282038, ownerTotal: 545211, renterBase: 263193, renterBaseMoe: 8321, renter30: 117523, renter30Moe: 7394, renter50: 58746, renter50Moe: 5409, mortBase: 313413, mortBaseMoe: 7685, mort30: 75514, mort30Moe: 4715, mort50: 26514, mort50Moe: 2627, freeBase: 228724, freeBaseMoe: 5498, free30: 28359, free30Moe: 2522, free50: 12635, free50Moe: 1702, rentMedianPct: 27.6, rentMedianPctMoe: 0.8, mortMedianPct: 20.2, mortMedianPctMoe: 0.5 },
  { fips: "32", abbr: "NV", renterTotal: 484049, ownerTotal: 761654, renterBase: 460551, renterBaseMoe: 12029, renter30: 244575, renter30Moe: 11709, renter50: 122712, renter50Moe: 8480, mortBase: 485281, mortBaseMoe: 12106, mort30: 165867, mort30Moe: 8680, mort50: 70905, mort50Moe: 5290, freeBase: 268230, freeBaseMoe: 10255, free30: 36554, free30Moe: 3985, free50: 18103, free50Moe: 2908, rentMedianPct: 31.7, rentMedianPctMoe: 0.8, mortMedianPct: 22.6, mortMedianPctMoe: 0.5 },
  { fips: "33", abbr: "NH", renterTotal: 161116, ownerTotal: 412973, renterBase: 153647, renterBaseMoe: 7124, renter30: 74391, renter30Moe: 5732, renter50: 33347, renter50Moe: 4004, mortBase: 245056, mortBaseMoe: 6912, mort30: 68251, mort30Moe: 4953, mort50: 26664, mort50Moe: 3248, freeBase: 165567, freeBaseMoe: 4897, free30: 29026, free30Moe: 2811, free50: 13770, free50Moe: 1760, rentMedianPct: 29.4, rentMedianPctMoe: 1.0, mortMedianPct: 21.4, mortMedianPctMoe: 0.6 },
  { fips: "34", abbr: "NJ", renterTotal: 1289291, ownerTotal: 2275717, renterBase: 1226793, renterBaseMoe: 17882, renter30: 649449, renter30Moe: 19597, renter50: 336965, renter50Moe: 14592, mortBase: 1416641, mortBaseMoe: 17037, mort30: 473279, mort30Moe: 14008, mort50: 187713, mort50Moe: 8690, freeBase: 846579, freeBaseMoe: 14667, free30: 186732, free30Moe: 8313, free50: 90673, free50Moe: 6298, rentMedianPct: 31.6, rentMedianPctMoe: 0.7, mortMedianPct: 23.3, mortMedianPctMoe: 0.3 },
  { fips: "35", abbr: "NM", renterTotal: 260504, ownerTotal: 602506, renterBase: 236685, renterBaseMoe: 9740, renter30: 113039, renter30Moe: 7349, renter50: 56682, renter50Moe: 4900, mortBase: 298957, mortBaseMoe: 9404, mort30: 87259, mort30Moe: 6275, mort50: 38928, mort50Moe: 3662, freeBase: 294807, freeBaseMoe: 7873, free30: 37682, free30Moe: 3339, free50: 19193, free50Moe: 2277, rentMedianPct: 29.0, rentMedianPctMoe: 1.0, mortMedianPct: 20.4, mortMedianPctMoe: 0.7 },
  { fips: "36", abbr: "NY", renterTotal: 3620018, ownerTotal: 4247594, renterBase: 3410664, renterBaseMoe: 28711, renter30: 1776717, renter30Moe: 28313, renter50: 985975, renter50Moe: 18738, mortBase: 2348546, mortBaseMoe: 21363, mort30: 821652, mort30Moe: 19768, mort50: 388940, mort50Moe: 14453, freeBase: 1865199, freeBaseMoe: 20197, free30: 397959, free30Moe: 11712, free50: 206434, free50Moe: 7813, rentMedianPct: 31.2, rentMedianPctMoe: 0.4, mortMedianPct: 23.0, mortMedianPctMoe: 0.2 },
  { fips: "37", abbr: "NC", renterTotal: 1499411, ownerTotal: 3040120, renterBase: 1393650, renterBaseMoe: 23138, renter30: 696749, renter30Moe: 19839, renter50: 322764, renter50Moe: 13632, mortBase: 1819049, mortBaseMoe: 24940, mort30: 500089, mort30Moe: 15947, mort50: 211772, mort50Moe: 9272, freeBase: 1190014, freeBaseMoe: 16337, free30: 154990, free30Moe: 7803, free50: 79076, free50Moe: 5900, rentMedianPct: 30.0, rentMedianPctMoe: 0.4, mortMedianPct: 20.5, mortMedianPctMoe: 0.3 },
  { fips: "38", abbr: "ND", renterTotal: 134608, ownerTotal: 217405, renterBase: 125479, renterBaseMoe: 5653, renter30: 43523, renter30Moe: 4768, renter50: 19321, renter50Moe: 3246, mortBase: 110472, mortBaseMoe: 4569, mort30: 22484, mort30Moe: 2779, mort50: 6735, mort50Moe: 1355, freeBase: 104881, freeBaseMoe: 3867, free30: 11389, free30Moe: 1766, free50: 6129, free50Moe: 1302, rentMedianPct: 23.8, rentMedianPctMoe: 1.2, mortMedianPct: 18.8, mortMedianPctMoe: 0.5 },
  { fips: "39", abbr: "OH", renterTotal: 1614779, ownerTotal: 3343094, renterBase: 1498672, renterBaseMoe: 22893, renter30: 726243, renter30Moe: 18278, renter50: 357976, renter50Moe: 11622, mortBase: 1952441, mortBaseMoe: 23368, mort30: 475226, mort30Moe: 12591, mort50: 186257, mort50Moe: 7939, freeBase: 1365393, freeBaseMoe: 17923, free30: 190256, free30Moe: 7744, free50: 94420, free50Moe: 5584, rentMedianPct: 29.3, rentMedianPctMoe: 0.5, mortMedianPct: 19.4, mortMedianPctMoe: 0.2 },
  { fips: "40", abbr: "OK", renterTotal: 558244, ownerTotal: 1057933, renterBase: 503870, renterBaseMoe: 10868, renter30: 230328, renter30Moe: 8298, renter50: 110682, renter50Moe: 5328, mortBase: 540303, mortBaseMoe: 9407, mort30: 147623, mort30Moe: 5862, mort50: 59356, mort50Moe: 3663, freeBase: 506824, freeBaseMoe: 8069, free30: 65444, free30Moe: 3930, free50: 31432, free50Moe: 2580, rentMedianPct: 28.2, rentMedianPctMoe: 0.5, mortMedianPct: 20.6, mortMedianPctMoe: 0.4 },
  { fips: "41", abbr: "OR", renterTotal: 644001, ownerTotal: 1101360, renterBase: 607013, renterBaseMoe: 14758, renter30: 322060, renter30Moe: 13542, renter50: 167425, renter50Moe: 10327, mortBase: 679701, mortBaseMoe: 14220, mort30: 226898, mort30Moe: 8966, mort50: 92909, mort50Moe: 5879, freeBase: 410939, freeBaseMoe: 9455, free30: 71357, free30Moe: 4841, free50: 34727, free50Moe: 3389, rentMedianPct: 31.6, rentMedianPctMoe: 0.8, mortMedianPct: 23.0, mortMedianPctMoe: 0.4 },
  { fips: "42", abbr: "PA", renterTotal: 1666725, ownerTotal: 3738856, renterBase: 1537945, renterBaseMoe: 22041, renter30: 750165, renter30Moe: 21201, renter50: 386388, renter50Moe: 16182, mortBase: 2083541, mortBaseMoe: 24137, mort30: 523962, mort30Moe: 14814, mort50: 207762, mort50Moe: 8776, freeBase: 1626993, freeBaseMoe: 18019, free30: 240454, free30Moe: 8526, free50: 115837, free50Moe: 5790, rentMedianPct: 29.5, rentMedianPctMoe: 0.4, mortMedianPct: 19.7, mortMedianPctMoe: 0.3 },
  { fips: "44", abbr: "RI", renterTotal: 156541, ownerTotal: 293926, renterBase: 146030, renterBaseMoe: 7189, renter30: 72383, renter30Moe: 6740, renter50: 33746, renter50Moe: 4419, mortBase: 187473, mortBaseMoe: 6940, mort30: 63232, mort30Moe: 5807, mort50: 29756, mort50Moe: 3854, freeBase: 104402, freeBaseMoe: 4675, free30: 17896, free30Moe: 2207, free50: 9465, free50Moe: 1555, rentMedianPct: 29.8, rentMedianPctMoe: 1.4, mortMedianPct: 23.2, mortMedianPctMoe: 0.8 },
  { fips: "45", abbr: "SC", renterTotal: 646966, ownerTotal: 1649384, renterBase: 587459, renterBaseMoe: 16665, renter30: 307668, renter30Moe: 13533, renter50: 157339, renter50Moe: 8651, mortBase: 921899, mortBaseMoe: 13499, mort30: 262790, mort30Moe: 11038, mort50: 111333, mort50Moe: 7248, freeBase: 710366, freeBaseMoe: 13074, free30: 94206, free30Moe: 6410, free50: 50552, free50Moe: 5018, rentMedianPct: 31.3, rentMedianPctMoe: 0.9, mortMedianPct: 20.5, mortMedianPctMoe: 0.4 },
  { fips: "46", abbr: "SD", renterTotal: 130691, ownerTotal: 256889, renterBase: 121678, renterBaseMoe: 5630, renter30: 54666, renter30Moe: 4808, renter50: 23341, renter50Moe: 2847, mortBase: 132385, mortBaseMoe: 4478, mort30: 30771, mort30Moe: 3091, mort50: 11636, mort50Moe: 1894, freeBase: 123049, freeBaseMoe: 4224, free30: 14155, free30Moe: 1750, free50: 6472, free50Moe: 1203, rentMedianPct: 28.0, rentMedianPctMoe: 1.3, mortMedianPct: 20.6, mortMedianPctMoe: 0.7 },
  { fips: "47", abbr: "TN", renterTotal: 955330, ownerTotal: 1998766, renterBase: 872825, renterBaseMoe: 18272, renter30: 438835, renter30Moe: 14504, renter50: 206267, renter50Moe: 10285, mortBase: 1113037, mortBaseMoe: 16287, mort30: 298293, mort30Moe: 10757, mort50: 119352, mort50Moe: 6750, freeBase: 867893, freeBaseMoe: 14876, free30: 88256, free30Moe: 5022, free50: 45023, free50Moe: 3402, rentMedianPct: 30.1, rentMedianPctMoe: 0.6, mortMedianPct: 20.3, mortMedianPctMoe: 0.4 },
  { fips: "48", abbr: "TX", renterTotal: 4333910, ownerTotal: 7273364, renterBase: 4062544, renterBaseMoe: 37477, renter30: 2088946, renter30Moe: 37734, renter50: 1038732, renter50Moe: 26694, mortBase: 4005831, mortBaseMoe: 31586, mort30: 1277097, mort30Moe: 26262, mort50: 509740, mort50Moe: 19066, freeBase: 3204404, freeBaseMoe: 34454, free30: 477739, free30Moe: 15456, free50: 229935, free50Moe: 11511, rentMedianPct: 30.8, rentMedianPctMoe: 0.4, mortMedianPct: 22.8, mortMedianPctMoe: 0.2 },
  { fips: "49", abbr: "UT", renterTotal: 378670, ownerTotal: 829454, renterBase: 362139, renterBaseMoe: 10941, renter30: 182050, renter30Moe: 9959, renter50: 84599, renter50Moe: 6882, mortBase: 552257, mortBaseMoe: 8386, mort30: 164346, mort30Moe: 8024, mort50: 60653, mort50Moe: 4804, freeBase: 271918, freeBaseMoe: 7013, free30: 30187, free30Moe: 3185, free50: 18586, free50Moe: 2685, rentMedianPct: 30.1, rentMedianPctMoe: 0.9, mortMedianPct: 22.1, mortMedianPctMoe: 0.5 },
  { fips: "50", abbr: "VT", renterTotal: 78080, ownerTotal: 207670, renterBase: 72359, renterBaseMoe: 4061, renter30: 35969, renter30Moe: 3824, renter50: 16615, renter50Moe: 2499, mortBase: 116838, mortBaseMoe: 4751, mort30: 34053, mort30Moe: 3163, mort50: 15030, mort50Moe: 2073, freeBase: 88935, freeBaseMoe: 3725, free30: 16722, free30Moe: 1679, free50: 8832, free50Moe: 1235, rentMedianPct: 29.9, rentMedianPctMoe: 2.0, mortMedianPct: 21.7, mortMedianPctMoe: 0.7 },
  { fips: "51", abbr: "VA", renterTotal: 1117312, ownerTotal: 2362907, renterBase: 1044852, renterBaseMoe: 18470, renter30: 526562, renter30Moe: 16236, renter50: 246215, renter50Moe: 10844, mortBase: 1535036, mortBaseMoe: 17951, mort30: 417517, mort30Moe: 12270, mort50: 162331, mort50Moe: 6972, freeBase: 811087, freeBaseMoe: 14399, free30: 101880, free30Moe: 5772, free50: 50639, free50Moe: 4209, rentMedianPct: 30.2, rentMedianPctMoe: 0.6, mortMedianPct: 20.5, mortMedianPctMoe: 0.3 },
  { fips: "53", abbr: "WA", renterTotal: 1182426, ownerTotal: 1997703, renterBase: 1126368, renterBaseMoe: 17326, renter30: 570011, renter30Moe: 16890, renter50: 276482, renter50Moe: 12371, mortBase: 1269751, mortBaseMoe: 16553, mort30: 421885, mort30Moe: 12357, mort50: 165355, mort50Moe: 6966, freeBase: 711347, freeBaseMoe: 11599, free30: 100386, free30Moe: 5697, free50: 52913, free50Moe: 4028, rentMedianPct: 30.3, rentMedianPctMoe: 0.6, mortMedianPct: 23.4, mortMedianPctMoe: 0.3 },
  { fips: "54", abbr: "WV", renterTotal: 188868, ownerTotal: 558933, renterBase: 158493, renterBaseMoe: 8655, renter30: 77292, renter30Moe: 5576, renter50: 41841, renter50Moe: 4046, mortBase: 241177, mortBaseMoe: 7778, mort30: 55562, mort30Moe: 4212, mort50: 22699, mort50Moe: 2464, freeBase: 312008, freeBaseMoe: 7333, free30: 36515, free30Moe: 3399, free50: 17067, free50Moe: 2123, rentMedianPct: 29.5, rentMedianPctMoe: 1.2, mortMedianPct: 18.2, mortMedianPctMoe: 0.5 },
  { fips: "55", abbr: "WI", renterTotal: 819851, ownerTotal: 1747732, renterBase: 773402, renterBaseMoe: 13145, renter30: 353239, renter30Moe: 11754, renter50: 173137, renter50Moe: 8350, mortBase: 1022732, mortBaseMoe: 12978, mort30: 247216, mort30Moe: 7789, mort50: 96654, mort50Moe: 4762, freeBase: 712564, freeBaseMoe: 10244, free30: 95233, free30Moe: 5002, free50: 47735, free50Moe: 3708, rentMedianPct: 28.2, rentMedianPctMoe: 0.5, mortMedianPct: 19.8, mortMedianPctMoe: 0.2 },
  { fips: "56", abbr: "WY", renterTotal: 77571, ownerTotal: 179037, renterBase: 71289, renterBaseMoe: 4915, renter30: 29772, renter30Moe: 3857, renter50: 12918, renter50Moe: 2655, mortBase: 99174, mortBaseMoe: 4719, mort30: 34380, mort30Moe: 3833, mort50: 11714, mort50Moe: 2144, freeBase: 79214, freeBaseMoe: 4333, free30: 10015, free30Moe: 1778, free50: 4570, free50Moe: 1156, rentMedianPct: 25.5, rentMedianPctMoe: 2.0, mortMedianPct: 22.9, mortMedianPctMoe: 1.1 },
];


/** A share in percent and its 90% margin of error in percentage points. */
export interface Share {
  pct: number;
  moe: number;
}

const rss = (...xs: number[]) => Math.sqrt(xs.reduce((s, x) => s + x * x, 0));

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

export interface BurdenResult extends BurdenRow {
  name: string;
  /** 1 = the largest share of households paying 30% or more of income for housing */
  rank: number;
  renterShare30: Share;
  renterShare50: Share;
  mortShare30: Share;
  mortShare50: Share;
  freeShare30: Share;
  freeShare50: Share;
  /** all households with a computed ratio: renters plus owners with and without a mortgage */
  allBase: number;
  allShare30: Share;
  allShare50: Share;
  /** households at 30% or more, and at 50% or more, of income */
  burdened: number;
  severe: number;
  /** renter-occupied units as a percentage of all occupied units */
  renterHouseholdShare: number;
  /** renters as a percentage of all households paying 30% or more */
  renterShareOfBurdened: number;
  /** B25064 median gross rent, dollars per month */
  rent: number;
  /** B25119 median income of renter households, dollars per year */
  renterIncome: number;
  /** annual income at which the median rent is exactly 30% of income */
  incomeNeeded: number;
  /** median renter income relative to incomeNeeded, percent (negative = below) */
  incomeVsNeeded: number;
}

function compute(row: BurdenRow, name: string, rent: number, renterIncome: number): Omit<BurdenResult, "rank"> {
  const allBase = row.renterBase + row.mortBase + row.freeBase;
  const allBaseMoe = rss(row.renterBaseMoe, row.mortBaseMoe, row.freeBaseMoe);
  const burdened = row.renter30 + row.mort30 + row.free30;
  const burdenedMoe = rss(row.renter30Moe, row.mort30Moe, row.free30Moe);
  const severe = row.renter50 + row.mort50 + row.free50;
  const severeMoe = rss(row.renter50Moe, row.mort50Moe, row.free50Moe);
  const incomeNeeded = (rent * 12) / (REPORT.burdenPct / 100);
  return {
    ...row,
    name,
    renterShare30: share(row.renter30, row.renter30Moe, row.renterBase, row.renterBaseMoe),
    renterShare50: share(row.renter50, row.renter50Moe, row.renterBase, row.renterBaseMoe),
    mortShare30: share(row.mort30, row.mort30Moe, row.mortBase, row.mortBaseMoe),
    mortShare50: share(row.mort50, row.mort50Moe, row.mortBase, row.mortBaseMoe),
    freeShare30: share(row.free30, row.free30Moe, row.freeBase, row.freeBaseMoe),
    freeShare50: share(row.free50, row.free50Moe, row.freeBase, row.freeBaseMoe),
    allBase,
    allShare30: share(burdened, burdenedMoe, allBase, allBaseMoe),
    allShare50: share(severe, severeMoe, allBase, allBaseMoe),
    burdened,
    severe,
    renterHouseholdShare: (row.renterTotal / (row.renterTotal + row.ownerTotal)) * 100,
    renterShareOfBurdened: (row.renter30 / burdened) * 100,
    rent,
    renterIncome,
    incomeNeeded,
    incomeVsNeeded: (renterIncome / incomeNeeded - 1) * 100,
  };
}

/** All 50 states and DC, ranked from the largest to the smallest share of burdened households. */
export const STATE_RESULTS: BurdenResult[] = BURDEN_ROWS.map((row) => {
  const inputs = STATE_INPUTS.find((s) => s.fips === row.fips);
  if (!inputs) throw new Error(`Missing rent and income inputs for FIPS ${row.fips}`);
  if (inputs.abbr !== row.abbr) throw new Error(`State mismatch for FIPS ${row.fips}`);
  return compute(row, inputs.name, inputs.rent, inputs.renterIncome);
})
  .sort((a, b) => b.allShare30.pct - a.allShare30.pct)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT: Omit<BurdenResult, "rank"> = compute(
  US_BURDEN_ROW,
  "United States",
  US_INPUTS.rent,
  US_INPUTS.renterIncome,
);

export function getStateResult(abbr: string): BurdenResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
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
  "rank_1_highest_share_of_households_paying_30pct_or_more",
  "state",
  "abbr",
  "fips",
  "all_households_30pct_or_more_share_pct",
  "all_households_30pct_or_more_moe90_pts",
  "all_households_50pct_or_more_share_pct",
  "all_households_30pct_or_more_count",
  "all_households_50pct_or_more_count",
  "all_households_ratio_computed_count",
  "renter_households_total",
  "renter_households_ratio_computed",
  "renter_30pct_or_more_count",
  "renter_30pct_or_more_share_pct",
  "renter_30pct_or_more_moe90_pts",
  "renter_50pct_or_more_count",
  "renter_50pct_or_more_share_pct",
  "renter_50pct_or_more_moe90_pts",
  "owner_households_total",
  "owner_with_mortgage_ratio_computed",
  "owner_with_mortgage_30pct_or_more_count",
  "owner_with_mortgage_30pct_or_more_share_pct",
  "owner_with_mortgage_30pct_or_more_moe90_pts",
  "owner_with_mortgage_50pct_or_more_count",
  "owner_with_mortgage_50pct_or_more_share_pct",
  "owner_without_mortgage_ratio_computed",
  "owner_without_mortgage_30pct_or_more_count",
  "owner_without_mortgage_30pct_or_more_share_pct",
  "owner_without_mortgage_30pct_or_more_moe90_pts",
  "owner_without_mortgage_50pct_or_more_count",
  "owner_without_mortgage_50pct_or_more_share_pct",
  "renter_share_of_all_households_pct",
  "renter_share_of_households_paying_30pct_or_more_pct",
  "median_gross_rent_pct_of_income",
  "median_gross_rent_pct_of_income_moe90_pts",
  "median_owner_costs_pct_of_income_with_mortgage",
  "median_owner_costs_pct_of_income_with_mortgage_moe90_pts",
  "median_gross_rent_usd_per_month",
  "median_renter_household_income_usd",
  "income_needed_for_median_rent_at_30pct_usd",
  "median_renter_income_vs_income_needed_pct",
] as const;

function csvLine(r: BurdenResult | (Omit<BurdenResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    round(r.allShare30.pct, 2),
    round(r.allShare30.moe, 2),
    round(r.allShare50.pct, 2),
    r.burdened,
    r.severe,
    r.allBase,
    r.renterTotal,
    r.renterBase,
    r.renter30,
    round(r.renterShare30.pct, 2),
    round(r.renterShare30.moe, 2),
    r.renter50,
    round(r.renterShare50.pct, 2),
    round(r.renterShare50.moe, 2),
    r.ownerTotal,
    r.mortBase,
    r.mort30,
    round(r.mortShare30.pct, 2),
    round(r.mortShare30.moe, 2),
    r.mort50,
    round(r.mortShare50.pct, 2),
    r.freeBase,
    r.free30,
    round(r.freeShare30.pct, 2),
    round(r.freeShare30.moe, 2),
    r.free50,
    round(r.freeShare50.pct, 2),
    round(r.renterHouseholdShare, 2),
    round(r.renterShareOfBurdened, 2),
    r.rentMedianPct,
    r.rentMedianPctMoe,
    r.mortMedianPct,
    r.mortMedianPctMoe,
    r.rent,
    r.renterIncome,
    round(r.incomeNeeded),
    round(r.incomeVsNeeded, 1),
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

/** Household counts in millions with one decimal, such as "43.7 million". */
export const millions = (n: number) => `${(n / 1_000_000).toFixed(1)} million`;
