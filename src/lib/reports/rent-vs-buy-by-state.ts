/**
 * Data and calculations for the "Rent vs. Buy by State" report.
 * The report page and the CSV download both read from this file, so the numbers in the text,
 * the table, and the dataset cannot drift apart.
 *
 * New inputs (ACS 2025 1-year, tables B25064 median gross rent and B25119 median household
 * income by tenure) were read on 2026-11-04 from the Census Bureau's table-based ACS Summary File
 * (www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData, files
 * acsdt1y2025-b25064 and acsdt1y2025-b25119). The Census API requires a key and was not used.
 * Checks: all 50 states, DC, and the U.S. row were present; the all-household income column of
 * B25119 equals the B19013 figure already stored for the companion report in every one of the 51
 * places; the U.S. median gross rent of $1,557 +/- $4 matches the Census table K202511 shown on
 * data.census.gov; the extremes (West Virginia $921, California $2,160) match.
 * The U.S. bedroom counts by tenure in US_BEDROOMS (table B25042, same Summary File, same day) are
 * used only for the "what this report does not capture" note on unit size.
 *
 * Median home value (B25077) and median property tax (B25103) are NOT stored again here: they
 * come from the companion report's STATE_ROWS so the two reports always use the same housing
 * inputs. The guard below fails the build if the companion report moves to a different ACS year
 * before this one does, so the two can never silently mix survey years.
 */

import {
  REPORT as AFFORDABILITY_REPORT,
  STATE_ROWS,
  US_ROW,
  monthlyPrincipalInterest,
} from "./mortgage-affordability-by-state";

export const REPORT = {
  slug: "rent-vs-buy-by-state",
  path: "/reports/rent-vs-buy-by-state",
  csvPath: "/reports/rent-vs-buy-by-state/data.csv",
  datePublished: "2026-11-04",
  dateModified: "2026-11-04",
  /** ACS survey year of every housing, rent, and income figure */
  acsYear: 2025,
  /**
   * Freddie Mac PMMS 30-year fixed average, week of October 29, 2026. Pinned on purpose: a dated
   * report must not change when the weekly average does, so it does not read `src/lib/market-data.ts`.
   * The companion affordability report pins its own rate (7.32%, October 22, 2026).
   */
  mortgageRate: 7.24,
  mortgageRateDate: "October 29, 2026",
  /** Same survey one year earlier (stated in Freddie Mac's Oct. 29, 2026 release) */
  mortgageRateYearAgo: 6.17,
  downPaymentPct: 20,
  termYears: 30,
  /** Rates shown in the sensitivity table */
  sensitivityRates: [3.0, 4.0, 5.0, 6.17, 7.24, 8.0],
} as const;

if (AFFORDABILITY_REPORT.acsYear !== REPORT.acsYear) {
  throw new Error(
    `rent-vs-buy-by-state uses ACS ${REPORT.acsYear} but mortgage-affordability-by-state now uses ACS ` +
      `${AFFORDABILITY_REPORT.acsYear}. Refresh the rent and tenure-income rows in ` +
      `src/lib/reports/rent-vs-buy-by-state.ts (tables B25064 and B25119) in the same change.`,
  );
}

export const REPORT_SOURCES = {
  acsRent: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25064 (median gross rent)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25064",
  },
  acsTenureIncome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25119 (median household income by tenure)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25119",
  },
  acsBedrooms: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25042 (tenure by bedrooms)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25042",
  },
  acsHome: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25077 (median value)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25077",
  },
  acsTax: {
    label: "U.S. Census Bureau, ACS 2025 1-year, table B25103 (median real estate taxes paid)",
    href: "https://data.census.gov/table/ACSDT1Y2025.B25103",
  },
  acsFile: {
    label: "Census Bureau, 2025 ACS 1-year Summary File, table-based format (released Oct. 29, 2026)",
    href: "https://www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData/",
  },
  acsDefinitions: {
    label: "Census Bureau, 2025 ACS Subject Definitions (gross rent)",
    href: "https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2025_ACSSubjectDefinitions.pdf",
  },
  pmms: {
    label: "Freddie Mac PMMS release of Oct. 29, 2026",
    href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-decline-further-724/",
  },
} as const;

interface RentRow {
  fips: string;
  abbr: string;
  /** B25064_001E: median gross rent (contract rent plus tenant-paid utilities), dollars per month */
  rent: number;
  rentMoe: number;
  /** B25119_002E: median household income of owner-occupied households, dollars per year */
  ownerIncome: number;
  ownerIncomeMoe: number;
  /** B25119_003E: median household income of renter-occupied households, dollars per year */
  renterIncome: number;
  renterIncomeMoe: number;
}

const US_RENT_ROW: RentRow = {
  fips: "00",
  abbr: "US",
  rent: 1557,
  rentMoe: 4,
  ownerIncome: 103251,
  ownerIncomeMoe: 239,
  renterIncome: 57048,
  renterIncomeMoe: 213,
};

/**
 * ACS 2025 1-year, table B25042, United States: occupied housing units by tenure and number of
 * bedrooms (B25042_002 and _009 are the owner and renter totals; 3+ bedrooms is the sum of
 * _006, _007, _008 for owners and _013, _014, _015 for renters).
 */
export const US_BEDROOMS = {
  ownerTotal: 87511734,
  ownerThreePlus: 41709877 + 22253832 + 6551971,
  renterTotal: 46551688,
  renterThreePlus: 10346847 + 2711652 + 583391,
} as const;

const RENT_ROWS: RentRow[] = [
  { fips: "01", abbr: "AL", rent: 1121, rentMoe: 15, ownerIncome: 82333, ownerIncomeMoe: 1188, renterIncome: 41098, renterIncomeMoe: 981 },
  { fips: "02", abbr: "AK", rent: 1500, rentMoe: 44, ownerIncome: 116233, ownerIncomeMoe: 4158, renterIncome: 64236, renterIncomeMoe: 5668 },
  { fips: "04", abbr: "AZ", rent: 1698, rentMoe: 17, ownerIncome: 98348, ownerIncomeMoe: 1689, renterIncome: 60154, renterIncomeMoe: 1492 },
  { fips: "05", abbr: "AR", rent: 1055, rentMoe: 20, ownerIncome: 80444, ownerIncomeMoe: 1153, renterIncome: 43623, renterIncomeMoe: 2322 },
  { fips: "06", abbr: "CA", rent: 2160, rentMoe: 9, ownerIncome: 131087, ownerIncomeMoe: 859, renterIncome: 74878, renterIncomeMoe: 827 },
  { fips: "08", abbr: "CO", rent: 1839, rentMoe: 16, ownerIncome: 122614, ownerIncomeMoe: 1828, renterIncome: 68913, renterIncomeMoe: 1957 },
  { fips: "09", abbr: "CT", rent: 1679, rentMoe: 26, ownerIncome: 128949, ownerIncomeMoe: 2029, renterIncome: 55849, renterIncomeMoe: 1914 },
  { fips: "10", abbr: "DE", rent: 1614, rentMoe: 53, ownerIncome: 106503, ownerIncomeMoe: 2804, renterIncome: 59799, renterIncomeMoe: 5874 },
  { fips: "11", abbr: "DC", rent: 2075, rentMoe: 51, ownerIncome: 174774, ownerIncomeMoe: 9329, renterIncome: 79741, renterIncomeMoe: 6692 },
  { fips: "12", abbr: "FL", rent: 1866, rentMoe: 11, ownerIncome: 94192, ownerIncomeMoe: 886, renterIncome: 60280, renterIncomeMoe: 735 },
  { fips: "13", abbr: "GA", rent: 1575, rentMoe: 15, ownerIncome: 100008, ownerIncomeMoe: 1014, renterIncome: 56663, renterIncomeMoe: 1236 },
  { fips: "15", abbr: "HI", rent: 2009, rentMoe: 69, ownerIncome: 127316, ownerIncomeMoe: 4766, renterIncome: 76161, renterIncomeMoe: 4192 },
  { fips: "16", abbr: "ID", rent: 1462, rentMoe: 31, ownerIncome: 98094, ownerIncomeMoe: 2564, renterIncome: 57223, renterIncomeMoe: 2636 },
  { fips: "17", abbr: "IL", rent: 1419, rentMoe: 17, ownerIncome: 105504, ownerIncomeMoe: 926, renterIncome: 53560, renterIncomeMoe: 1563 },
  { fips: "18", abbr: "IN", rent: 1187, rentMoe: 12, ownerIncome: 89532, ownerIncomeMoe: 1252, renterIncome: 46650, renterIncomeMoe: 1267 },
  { fips: "19", abbr: "IA", rent: 1026, rentMoe: 18, ownerIncome: 93117, ownerIncomeMoe: 1433, renterIncome: 43644, renterIncomeMoe: 1524 },
  { fips: "20", abbr: "KS", rent: 1134, rentMoe: 15, ownerIncome: 96484, ownerIncomeMoe: 2035, renterIncome: 50519, renterIncomeMoe: 1313 },
  { fips: "21", abbr: "KY", rent: 1072, rentMoe: 16, ownerIncome: 81369, ownerIncomeMoe: 1060, renterIncome: 43590, renterIncomeMoe: 1561 },
  { fips: "22", abbr: "LA", rent: 1105, rentMoe: 15, ownerIncome: 81395, ownerIncomeMoe: 1223, renterIncome: 39015, renterIncomeMoe: 1643 },
  { fips: "23", abbr: "ME", rent: 1329, rentMoe: 43, ownerIncome: 96350, ownerIncomeMoe: 1944, renterIncome: 49990, renterIncomeMoe: 2745 },
  { fips: "24", abbr: "MD", rent: 1822, rentMoe: 22, ownerIncome: 135969, ownerIncomeMoe: 2042, renterIncome: 66624, renterIncomeMoe: 1473 },
  { fips: "25", abbr: "MA", rent: 1962, rentMoe: 25, ownerIncome: 139091, ownerIncomeMoe: 1902, renterIncome: 67180, renterIncomeMoe: 1907 },
  { fips: "26", abbr: "MI", rent: 1220, rentMoe: 11, ownerIncome: 90037, ownerIncomeMoe: 770, renterIncome: 44595, renterIncomeMoe: 1360 },
  { fips: "27", abbr: "MN", rent: 1357, rentMoe: 17, ownerIncome: 112555, ownerIncomeMoe: 1113, renterIncome: 52258, renterIncomeMoe: 1133 },
  { fips: "28", abbr: "MS", rent: 1033, rentMoe: 26, ownerIncome: 71400, ownerIncomeMoe: 1317, renterIncome: 36065, renterIncomeMoe: 1957 },
  { fips: "29", abbr: "MO", rent: 1142, rentMoe: 15, ownerIncome: 91599, ownerIncomeMoe: 896, renterIncome: 47459, renterIncomeMoe: 1276 },
  { fips: "30", abbr: "MT", rent: 1208, rentMoe: 43, ownerIncome: 94109, ownerIncomeMoe: 3299, renterIncome: 51326, renterIncomeMoe: 1439 },
  { fips: "31", abbr: "NE", rent: 1194, rentMoe: 20, ownerIncome: 102823, ownerIncomeMoe: 2036, renterIncome: 51346, renterIncomeMoe: 1662 },
  { fips: "32", abbr: "NV", rent: 1692, rentMoe: 21, ownerIncome: 103839, ownerIncomeMoe: 2885, renterIncome: 61177, renterIncomeMoe: 1370 },
  { fips: "33", abbr: "NH", rent: 1742, rentMoe: 39, ownerIncome: 127915, ownerIncomeMoe: 3494, renterIncome: 68045, renterIncomeMoe: 3479 },
  { fips: "34", abbr: "NJ", rent: 1885, rentMoe: 19, ownerIncome: 137095, ownerIncomeMoe: 1861, renterIncome: 67627, renterIncomeMoe: 2210 },
  { fips: "35", abbr: "NM", rent: 1145, rentMoe: 30, ownerIncome: 82888, ownerIncomeMoe: 2071, renterIncome: 46671, renterIncomeMoe: 2171 },
  { fips: "36", abbr: "NY", rent: 1704, rentMoe: 14, ownerIncome: 116950, ownerIncomeMoe: 1230, renterIncome: 60510, renterIncomeMoe: 701 },
  { fips: "37", abbr: "NC", rent: 1412, rentMoe: 15, ownerIncome: 95173, ownerIncomeMoe: 1147, renterIncome: 52326, renterIncomeMoe: 948 },
  { fips: "38", abbr: "ND", rent: 1071, rentMoe: 32, ownerIncome: 104161, ownerIncomeMoe: 3573, renterIncome: 56648, renterIncomeMoe: 3359 },
  { fips: "39", abbr: "OH", rent: 1155, rentMoe: 9, ownerIncome: 92615, ownerIncomeMoe: 729, renterIncome: 46228, renterIncomeMoe: 922 },
  { fips: "40", abbr: "OK", rent: 1107, rentMoe: 11, ownerIncome: 85801, ownerIncomeMoe: 1213, renterIncome: 46232, renterIncomeMoe: 953 },
  { fips: "41", abbr: "OR", rent: 1629, rentMoe: 18, ownerIncome: 107125, ownerIncomeMoe: 2394, renterIncome: 58188, renterIncomeMoe: 2308 },
  { fips: "42", abbr: "PA", rent: 1329, rentMoe: 13, ownerIncome: 100203, ownerIncomeMoe: 808, renterIncome: 51010, renterIncomeMoe: 928 },
  { fips: "44", abbr: "RI", rent: 1531, rentMoe: 63, ownerIncome: 117272, ownerIncomeMoe: 4389, renterIncome: 54928, renterIncomeMoe: 3669 },
  { fips: "45", abbr: "SC", rent: 1395, rentMoe: 25, ownerIncome: 86526, ownerIncomeMoe: 1198, renterIncome: 50286, renterIncomeMoe: 1316 },
  { fips: "46", abbr: "SD", rent: 1089, rentMoe: 33, ownerIncome: 100750, ownerIncomeMoe: 2058, renterIncome: 48182, renterIncomeMoe: 2829 },
  { fips: "47", abbr: "TN", rent: 1356, rentMoe: 17, ownerIncome: 91585, ownerIncomeMoe: 1043, renterIncome: 51404, renterIncomeMoe: 1106 },
  { fips: "48", abbr: "TX", rent: 1515, rentMoe: 11, ownerIncome: 104525, ownerIncomeMoe: 816, renterIncome: 56887, renterIncomeMoe: 698 },
  { fips: "49", abbr: "UT", rent: 1646, rentMoe: 22, ownerIncome: 119395, ownerIncomeMoe: 2302, renterIncome: 63562, renterIncomeMoe: 2793 },
  { fips: "50", abbr: "VT", rent: 1338, rentMoe: 57, ownerIncome: 100812, ownerIncomeMoe: 3083, renterIncome: 55108, renterIncomeMoe: 7005 },
  { fips: "51", abbr: "VA", rent: 1734, rentMoe: 20, ownerIncome: 119909, ownerIncomeMoe: 1423, renterIncome: 65439, renterIncomeMoe: 1339 },
  { fips: "53", abbr: "WA", rent: 1873, rentMoe: 16, ownerIncome: 125882, ownerIncomeMoe: 1177, renterIncome: 70924, renterIncomeMoe: 1278 },
  { fips: "54", abbr: "WV", rent: 921, rentMoe: 22, ownerIncome: 72182, ownerIncomeMoe: 1630, renterIncome: 34045, renterIncomeMoe: 1712 },
  { fips: "55", abbr: "WI", rent: 1219, rentMoe: 12, ownerIncome: 98292, ownerIncomeMoe: 1152, renterIncome: 51620, renterIncomeMoe: 953 },
  { fips: "56", abbr: "WY", rent: 1087, rentMoe: 57, ownerIncome: 95240, ownerIncomeMoe: 5217, renterIncome: 56109, renterIncomeMoe: 5986 },
];

export interface StateInputs {
  fips: string;
  abbr: string;
  name: string;
  value: number;
  valueMoe: number;
  tax: number;
  taxMoe: number;
  rent: number;
  rentMoe: number;
  ownerIncome: number;
  renterIncome: number;
}

function join(base: (typeof STATE_ROWS)[number], rent: RentRow): StateInputs {
  return {
    fips: base.fips,
    abbr: base.abbr,
    name: base.name,
    value: base.value,
    valueMoe: base.valueMoe,
    tax: base.tax,
    taxMoe: base.taxMoe,
    rent: rent.rent,
    rentMoe: rent.rentMoe,
    ownerIncome: rent.ownerIncome,
    renterIncome: rent.renterIncome,
  };
}

export const STATE_INPUTS: StateInputs[] = STATE_ROWS.map((base) => {
  const rent = RENT_ROWS.find((r) => r.fips === base.fips);
  if (!rent) throw new Error(`Missing rent row for ${base.name}`);
  return join(base, rent);
});

export const US_INPUTS: StateInputs = join(US_ROW, US_RENT_ROW);

const downFrac = () => REPORT.downPaymentPct / 100;

/** Principal and interest on one dollar of loan, per month, at an annual rate in percent. */
function pmtPerDollar(ratePct: number): number {
  if (ratePct === 0) return 1 / (REPORT.termYears * 12);
  return monthlyPrincipalInterest(1, ratePct, REPORT.termYears);
}

/** Monthly P&I plus property tax on a home, at a given rate. */
function paymentAt(value: number, tax: number, ratePct: number) {
  const loan = value * (1 - downFrac());
  const pi = loan * pmtPerDollar(ratePct);
  return { loan, pi, taxMonthly: tax / 12, total: pi + tax / 12 };
}

/** Principal repaid during the first 12 payments. */
function firstYearPrincipal(loan: number, ratePct: number): number {
  const r = ratePct / 100 / 12;
  const pi = loan * pmtPerDollar(ratePct);
  if (r === 0) return pi * 12;
  const growth = Math.pow(1 + r, 12);
  const balance = loan * growth - (pi * (growth - 1)) / r;
  return loan - balance;
}

/**
 * Mortgage rate at which the payment on the median home equals the median rent, or null when even
 * a 0% loan costs more than the rent.
 */
function breakEvenRate(value: number, tax: number, rent: number): number | null {
  if (paymentAt(value, tax, 0).total > rent) return null;
  let lo = 0;
  let hi = 25;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (paymentAt(value, tax, mid).total > rent) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

export interface StateResult extends StateInputs {
  /** 1 = the payment on the median home is closest to the median rent */
  rank: number;
  downPayment: number;
  loan: number;
  pi: number;
  taxMonthly: number;
  /** principal, interest, and property tax on the median home */
  payment: number;
  /** payment minus median gross rent, dollars per month */
  premium: number;
  /** payment divided by median gross rent */
  ratio: number;
  /** conservative range using every input at its 90% margin of error */
  ratioLow: number;
  ratioHigh: number;
  /** median home value divided by a year of median gross rent */
  priceToRent: number;
  /** 20% down payment expressed in years of median rent */
  downPaymentYearsOfRent: number;
  /** average monthly interest plus property tax over the first year (excludes principal repaid) */
  costExEquity: number;
  /** costExEquity divided by median gross rent */
  ratioExEquity: number;
  /** principal repaid in the first year, dollars */
  principalFirstYear: number;
  /** rate at which payment equals median rent; null when not reachable at any rate of 0% or above */
  breakEvenRate: number | null;
  /** price of a home whose payment equals the median rent at the report rate (state tax rate) */
  rentEquivalentPrice: number;
  rentEquivalentShare: number;
  /** median rent as % of median renter-household income */
  rentShare: number;
  /** payment as % of median owner-household income */
  ownerShare: number;
  /** payment as % of median renter-household income: what a typical renter would pay to buy the median home */
  renterBuyShare: number;
  paymentYearAgoRate: number;
  ratioYearAgoRate: number;
}

export function computeRow(
  row: StateInputs,
  ratePct: number = REPORT.mortgageRate,
): Omit<StateResult, "rank"> {
  const base = paymentAt(row.value, row.tax, ratePct);
  const low = paymentAt(row.value - row.valueMoe, row.tax - row.taxMoe, ratePct);
  const high = paymentAt(row.value + row.valueMoe, row.tax + row.taxMoe, ratePct);
  const yearAgo = paymentAt(row.value, row.tax, REPORT.mortgageRateYearAgo);
  const principalFirstYear = firstYearPrincipal(base.loan, ratePct);
  const costExEquity = (base.pi * 12 - principalFirstYear) / 12 + base.taxMonthly;
  const taxRateMonthly = row.tax / row.value / 12;
  const rentEquivalentPrice = row.rent / ((1 - downFrac()) * pmtPerDollar(ratePct) + taxRateMonthly);

  return {
    ...row,
    downPayment: row.value * downFrac(),
    loan: base.loan,
    pi: base.pi,
    taxMonthly: base.taxMonthly,
    payment: base.total,
    premium: base.total - row.rent,
    ratio: base.total / row.rent,
    ratioLow: low.total / (row.rent + row.rentMoe),
    ratioHigh: high.total / (row.rent - row.rentMoe),
    priceToRent: row.value / (row.rent * 12),
    downPaymentYearsOfRent: (row.value * downFrac()) / (row.rent * 12),
    costExEquity,
    ratioExEquity: costExEquity / row.rent,
    principalFirstYear,
    breakEvenRate: breakEvenRate(row.value, row.tax, row.rent),
    rentEquivalentPrice,
    rentEquivalentShare: (rentEquivalentPrice / row.value) * 100,
    rentShare: (row.rent / (row.renterIncome / 12)) * 100,
    ownerShare: (base.total / (row.ownerIncome / 12)) * 100,
    renterBuyShare: (base.total / (row.renterIncome / 12)) * 100,
    paymentYearAgoRate: yearAgo.total,
    ratioYearAgoRate: yearAgo.total / row.rent,
  };
}

/** All 50 states and DC, ranked from the smallest to the largest gap between owning and renting. */
export const STATE_RESULTS: StateResult[] = STATE_INPUTS.map((r) => computeRow(r))
  .sort((a, b) => a.ratio - b.ratio)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT = computeRow(US_INPUTS);

export function getStateResult(abbr: string): StateResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

/** National and state-level payment against rent at an arbitrary mortgage rate. */
export function sensitivityAt(ratePct: number) {
  const us = computeRow(US_INPUTS, ratePct);
  const rows = STATE_INPUTS.map((r) => computeRow(r, ratePct));
  return {
    rate: ratePct,
    usPayment: us.payment,
    usRatio: us.ratio,
    atOrBelowRent: rows.filter((s) => s.ratio <= 1).length,
    within25: rows.filter((s) => s.ratio <= 1.25).length,
  };
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_smallest_gap_between_owning_and_renting",
  "state",
  "abbr",
  "fips",
  "median_gross_rent_usd_per_month",
  "median_gross_rent_moe90_usd",
  "median_home_value_usd",
  "median_property_tax_paid_usd",
  "down_payment_usd",
  "loan_amount_usd",
  "mortgage_rate_pct",
  "monthly_principal_interest_usd",
  "monthly_property_tax_usd",
  "monthly_payment_usd",
  "payment_minus_rent_usd",
  "payment_to_rent_ratio",
  "ratio_range_low",
  "ratio_range_high",
  "price_to_annual_rent_ratio",
  "down_payment_in_years_of_rent",
  "first_year_principal_repaid_usd",
  "monthly_interest_plus_tax_first_year_usd",
  "interest_plus_tax_to_rent_ratio",
  "break_even_rate_pct",
  "rent_equivalent_home_price_usd",
  "rent_equivalent_price_pct_of_median_value",
  "median_renter_household_income_usd",
  "median_owner_household_income_usd",
  "rent_share_of_renter_income_pct",
  "payment_share_of_owner_income_pct",
  "payment_share_of_renter_income_pct",
  "monthly_payment_at_year_ago_rate_usd",
  "payment_to_rent_ratio_at_year_ago_rate",
] as const;

function csvLine(r: StateResult | (Omit<StateResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.rent,
    r.rentMoe,
    r.value,
    r.tax,
    round(r.downPayment),
    round(r.loan),
    REPORT.mortgageRate,
    round(r.pi),
    round(r.taxMonthly),
    round(r.payment),
    round(r.premium),
    round(r.ratio, 3),
    round(r.ratioLow, 3),
    round(r.ratioHigh, 3),
    round(r.priceToRent, 2),
    round(r.downPaymentYearsOfRent, 2),
    round(r.principalFirstYear),
    round(r.costExEquity),
    round(r.ratioExEquity, 3),
    r.breakEvenRate === null ? "" : round(r.breakEvenRate, 2),
    round(r.rentEquivalentPrice),
    round(r.rentEquivalentShare, 1),
    r.renterIncome,
    r.ownerIncome,
    round(r.rentShare, 2),
    round(r.ownerShare, 2),
    round(r.renterBuyShare, 2),
    round(r.paymentYearAgoRate),
    round(r.ratioYearAgoRate, 3),
  ];
  return cells
    .map((c) => (typeof c === "string" && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : String(c)))
    .join(",");
}

export function buildCsv(): string {
  return [
    CSV_HEADER.join(","),
    ...STATE_RESULTS.map(csvLine),
    csvLine(US_RESULT),
  ].join("\n") + "\n";
}

export const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const pct1 = (n: number) => `${n.toFixed(1)}%`;

/** "1.8x" style multiple used in text and tables. */
export const mult = (n: number, digits = 2) => `${n.toFixed(digits)}x`;
