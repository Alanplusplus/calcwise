/**
 * Data and calculations for the "Mortgage Affordability by State" report.
 * The report page and the CSV download both read from this file, so the
 * numbers in the text, the table, and the dataset cannot drift apart.
 *
 * Raw inputs (ACS 2025 1-year, tables B25077, B25103, B19013) were read on
 * 2026-10-29, the day of release, from the Census Bureau's table-based ACS
 * Summary File (www2.census.gov/programs-surveys/acs/summary_file/2025/
 * table-based-SF/data/1YRData, files acsdt1y2025-b25077, -b25103, -b19013).
 * The Census API requires a key and was not used. All 50 states, DC, and the
 * U.S. row were present, every margin of error was positive, and every
 * year-over-year change fell inside a plausible range. The national median
 * household income ($84,780) and the largest state gains (RI +9.0%, VA +7.9%,
 * WY +7.1%, AK -0.5%) match the Census release as reported on 2026-10-29.
 * The 2024 inputs this replaces are in git history (commit f4b2858 and earlier).
 */

export const REPORT = {
  slug: "mortgage-affordability-by-state",
  path: "/reports/mortgage-affordability-by-state",
  csvPath: "/reports/mortgage-affordability-by-state/data.csv",
  datePublished: "2026-10-20",
  dateModified: "2026-10-29",
  /** ACS survey year of the housing and income figures */
  acsYear: 2025,
  /**
   * Freddie Mac PMMS 30-year fixed average, week of October 22, 2026. Pinned on purpose: a dated
   * report must not change when the weekly average does, so it does not read `src/lib/market-data.ts`.
   */
  mortgageRate: 7.32,
  mortgageRateDate: "October 22, 2026",
  /** Same survey one year earlier (stated in Freddie Mac's Oct. 22, 2026 release) */
  mortgageRateYearAgo: 6.19,
  downPaymentPct: 20,
  termYears: 30,
  /** Front-end housing-cost guideline, % of gross monthly income */
  guidelinePct: 28,
  /** Rates shown in the sensitivity table */
  sensitivityRates: [6.0, 6.19, 7.0, 7.32, 8.0],
} as const;

export const REPORT_SOURCES = {
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
  acsFile: {
    label: "Census Bureau, 2025 ACS 1-year Summary File, table-based format (released Oct. 29, 2026)",
    href: "https://www2.census.gov/programs-surveys/acs/summary_file/2025/table-based-SF/data/1YRData/",
  },
  pmms: {
    label: "Freddie Mac PMMS release of Oct. 22, 2026",
    href: "https://freddiemac.gcs-web.com/news-releases/news-release-details/mortgage-rates-decrease-732/",
  },
  acsRelease: {
    label: "Census Bureau, 2025 ACS 1-year estimates press kit (Oct. 29, 2026)",
    href: "https://www.census.gov/newsroom/press-kits/2026/acs-1-year-estimates.html",
  },
} as const;

export interface StateRow {
  fips: string;
  abbr: string;
  name: string;
  /** B25077_001E: median value of owner-occupied housing units, dollars */
  value: number;
  valueMoe: number;
  /** B25103_001E: median real estate taxes paid, dollars per year */
  tax: number;
  taxMoe: number;
  /** B19013_001E: median household income, dollars per year */
  income: number;
  incomeMoe: number;
}

export const US_ROW: StateRow = {
  fips: "00",
  abbr: "US",
  name: "United States",
  value: 371100,
  valueMoe: 646,
  tax: 3344,
  taxMoe: 8,
  income: 84780,
  incomeMoe: 215,
};

export const STATE_ROWS: StateRow[] = [
  { fips: "01", abbr: "AL", name: "Alabama", value: 246500, valueMoe: 3108, tax: 946, taxMoe: 15, income: 67663, incomeMoe: 1147 },
  { fips: "02", abbr: "AK", name: "Alaska", value: 385100, valueMoe: 8954, tax: 4067, taxMoe: 122, income: 95220, incomeMoe: 4301 },
  { fips: "04", abbr: "AZ", name: "Arizona", value: 427600, valueMoe: 2683, tax: 1894, taxMoe: 23, income: 82940, incomeMoe: 1117 },
  { fips: "05", abbr: "AR", name: "Arkansas", value: 228400, valueMoe: 3677, tax: 1142, taxMoe: 27, income: 65588, incomeMoe: 976 },
  { fips: "06", abbr: "CA", name: "California", value: 770700, valueMoe: 3949, tax: 5537, taxMoe: 29, income: 102159, incomeMoe: 390 },
  { fips: "08", abbr: "CO", name: "Colorado", value: 567600, valueMoe: 5009, tax: 2945, taxMoe: 29, income: 99729, incomeMoe: 1273 },
  { fips: "09", abbr: "CT", name: "Connecticut", value: 423900, valueMoe: 4096, tax: 6725, taxMoe: 55, income: 100056, incomeMoe: 1570 },
  { fips: "10", abbr: "DE", name: "Delaware", value: 392600, valueMoe: 7385, tax: 1911, taxMoe: 55, income: 92520, incomeMoe: 3776 },
  { fips: "11", abbr: "DC", name: "District of Columbia", value: 715500, valueMoe: 24713, tax: 4805, taxMoe: 279, income: 109505, incomeMoe: 7573 },
  { fips: "12", abbr: "FL", name: "Florida", value: 396700, valueMoe: 2125, tax: 3180, taxMoe: 29, income: 80846, incomeMoe: 521 },
  { fips: "13", abbr: "GA", name: "Georgia", value: 346500, valueMoe: 2425, tax: 2680, taxMoe: 22, income: 81847, incomeMoe: 761 },
  { fips: "15", abbr: "HI", name: "Hawaii", value: 901500, valueMoe: 16299, tax: 2387, taxMoe: 65, income: 105013, incomeMoe: 3065 },
  { fips: "16", abbr: "ID", name: "Idaho", value: 457800, valueMoe: 6135, tax: 1924, taxMoe: 33, income: 84234, incomeMoe: 1941 },
  { fips: "17", abbr: "IL", name: "Illinois", value: 294400, valueMoe: 1931, tax: 5655, taxMoe: 51, income: 86676, incomeMoe: 814 },
  { fips: "18", abbr: "IN", name: "Indiana", value: 255200, valueMoe: 2289, tax: 1884, taxMoe: 20, income: 74516, incomeMoe: 875 },
  { fips: "19", abbr: "IA", name: "Iowa", value: 237000, valueMoe: 2264, tax: 3014, taxMoe: 45, income: 76483, incomeMoe: 958 },
  { fips: "20", abbr: "KS", name: "Kansas", value: 252600, valueMoe: 4302, tax: 3144, taxMoe: 54, income: 77824, incomeMoe: 1333 },
  { fips: "21", abbr: "KY", name: "Kentucky", value: 242000, valueMoe: 2467, tax: 1734, taxMoe: 24, income: 66447, incomeMoe: 962 },
  { fips: "22", abbr: "LA", name: "Louisiana", value: 231800, valueMoe: 2979, tax: 1268, taxMoe: 30, income: 65139, incomeMoe: 1183 },
  { fips: "23", abbr: "ME", name: "Maine", value: 370300, valueMoe: 5877, tax: 3404, taxMoe: 59, income: 81760, incomeMoe: 1561 },
  { fips: "24", abbr: "MD", name: "Maryland", value: 445800, valueMoe: 3662, tax: 4368, taxMoe: 49, income: 107700, incomeMoe: 1661 },
  { fips: "25", abbr: "MA", name: "Massachusetts", value: 626900, valueMoe: 4178, tax: 6345, taxMoe: 46, income: 106539, incomeMoe: 1459 },
  { fips: "26", abbr: "MI", name: "Michigan", value: 269500, valueMoe: 1932, tax: 3163, taxMoe: 25, income: 75832, incomeMoe: 691 },
  { fips: "27", abbr: "MN", name: "Minnesota", value: 353800, valueMoe: 2300, tax: 3682, taxMoe: 28, income: 92297, incomeMoe: 1085 },
  { fips: "28", abbr: "MS", name: "Mississippi", value: 192700, valueMoe: 4627, tax: 1248, taxMoe: 31, income: 59346, incomeMoe: 1510 },
  { fips: "29", abbr: "MO", name: "Missouri", value: 271400, valueMoe: 2495, tax: 2145, taxMoe: 30, income: 75485, incomeMoe: 937 },
  { fips: "30", abbr: "MT", name: "Montana", value: 427500, valueMoe: 6599, tax: 2947, taxMoe: 65, income: 77099, incomeMoe: 2479 },
  { fips: "31", abbr: "NE", name: "Nebraska", value: 279200, valueMoe: 3160, tax: 3665, taxMoe: 60, income: 81614, incomeMoe: 1319 },
  { fips: "32", abbr: "NV", name: "Nevada", value: 459400, valueMoe: 5404, tax: 2172, taxMoe: 52, income: 85198, incomeMoe: 1837 },
  { fips: "33", abbr: "NH", name: "New Hampshire", value: 487100, valueMoe: 8193, tax: 6983, taxMoe: 105, income: 106759, incomeMoe: 2502 },
  { fips: "34", abbr: "NJ", name: "New Jersey", value: 530800, valueMoe: 3638, tax: 9648, taxMoe: 71, income: 107797, incomeMoe: 1374 },
  { fips: "35", abbr: "NM", name: "New Mexico", value: 293400, valueMoe: 5069, tax: 1856, taxMoe: 48, income: 70342, incomeMoe: 1508 },
  { fips: "36", abbr: "NY", name: "New York", value: 470900, valueMoe: 5866, tax: 6706, taxMoe: 39, income: 89210, incomeMoe: 934 },
  { fips: "37", abbr: "NC", name: "North Carolina", value: 342800, valueMoe: 2737, tax: 2177, taxMoe: 22, income: 77638, incomeMoe: 876 },
  { fips: "38", abbr: "ND", name: "North Dakota", value: 281700, valueMoe: 6105, tax: 2600, taxMoe: 74, income: 81545, incomeMoe: 2073 },
  { fips: "39", abbr: "OH", name: "Ohio", value: 254100, valueMoe: 1892, tax: 3107, taxMoe: 26, income: 74804, incomeMoe: 615 },
  { fips: "40", abbr: "OK", name: "Oklahoma", value: 234000, valueMoe: 2384, tax: 1781, taxMoe: 26, income: 68441, incomeMoe: 911 },
  { fips: "41", abbr: "OR", name: "Oregon", value: 507900, valueMoe: 4066, tax: 4009, taxMoe: 52, income: 86953, incomeMoe: 1920 },
  { fips: "42", abbr: "PA", name: "Pennsylvania", value: 292400, valueMoe: 1766, tax: 3288, taxMoe: 31, income: 81473, incomeMoe: 603 },
  { fips: "44", abbr: "RI", name: "Rhode Island", value: 478700, valueMoe: 8075, tax: 4901, taxMoe: 90, income: 91039, incomeMoe: 2617 },
  { fips: "45", abbr: "SC", name: "South Carolina", value: 306200, valueMoe: 3027, tax: 1367, taxMoe: 18, income: 73672, incomeMoe: 1216 },
  { fips: "46", abbr: "SD", name: "South Dakota", value: 299100, valueMoe: 6467, tax: 3098, taxMoe: 71, income: 80506, incomeMoe: 1946 },
  { fips: "47", abbr: "TN", name: "Tennessee", value: 341200, valueMoe: 3027, tax: 1558, taxMoe: 23, income: 75875, incomeMoe: 816 },
  { fips: "48", abbr: "TX", name: "Texas", value: 318100, valueMoe: 1418, tax: 4205, taxMoe: 37, income: 82625, incomeMoe: 670 },
  { fips: "49", abbr: "UT", name: "Utah", value: 543400, valueMoe: 4242, tax: 2738, taxMoe: 24, income: 99311, incomeMoe: 2056 },
  { fips: "50", abbr: "VT", name: "Vermont", value: 359800, valueMoe: 8499, tax: 5418, taxMoe: 141, income: 86018, incomeMoe: 2458 },
  { fips: "51", abbr: "VA", name: "Virginia", value: 422600, valueMoe: 3315, tax: 3003, taxMoe: 36, income: 99322, incomeMoe: 1105 },
  { fips: "53", abbr: "WA", name: "Washington", value: 605600, valueMoe: 4205, tax: 4911, taxMoe: 42, income: 101946, incomeMoe: 719 },
  { fips: "54", abbr: "WV", name: "West Virginia", value: 176300, valueMoe: 4940, tax: 904, taxMoe: 25, income: 61340, incomeMoe: 1301 },
  { fips: "55", abbr: "WI", name: "Wisconsin", value: 316500, valueMoe: 2156, tax: 3810, taxMoe: 21, income: 80213, incomeMoe: 703 },
  { fips: "56", abbr: "WY", name: "Wyoming", value: 357300, valueMoe: 9475, tax: 1987, taxMoe: 56, income: 80894, incomeMoe: 3128 },
];

/** Standard fixed-rate payment: M = P * r / (1 - (1 + r)^-n) */
export function monthlyPrincipalInterest(
  loan: number,
  annualRatePct: number,
  years: number = REPORT.termYears,
): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

function paymentFor(value: number, tax: number, ratePct: number) {
  const loan = value * (1 - REPORT.downPaymentPct / 100);
  const pi = monthlyPrincipalInterest(loan, ratePct);
  return { loan, pi, taxMonthly: tax / 12, total: pi + tax / 12 };
}

export interface StateResult extends StateRow {
  /** 1 = payment takes the smallest share of income */
  rank: number;
  downPayment: number;
  loan: number;
  pi: number;
  taxMonthly: number;
  payment: number;
  incomeMonthly: number;
  /** payment as % of gross monthly income */
  share: number;
  /** conservative range using every input at its 90% margin of error */
  shareLow: number;
  shareHigh: number;
  /** annual income needed for the payment to equal the guideline share */
  incomeNeeded: number;
  priceToIncome: number;
  /** median tax / median value, % */
  taxRate: number;
  paymentYearAgoRate: number;
  shareYearAgoRate: number;
}

export function computeRow(row: StateRow, ratePct: number = REPORT.mortgageRate): Omit<StateResult, "rank"> {
  const base = paymentFor(row.value, row.tax, ratePct);
  const low = paymentFor(row.value - row.valueMoe, row.tax - row.taxMoe, ratePct);
  const high = paymentFor(row.value + row.valueMoe, row.tax + row.taxMoe, ratePct);
  const yearAgo = paymentFor(row.value, row.tax, REPORT.mortgageRateYearAgo);
  const incomeMonthly = row.income / 12;

  return {
    ...row,
    downPayment: row.value * (REPORT.downPaymentPct / 100),
    loan: base.loan,
    pi: base.pi,
    taxMonthly: base.taxMonthly,
    payment: base.total,
    incomeMonthly,
    share: (base.total / incomeMonthly) * 100,
    shareLow: (low.total / ((row.income + row.incomeMoe) / 12)) * 100,
    shareHigh: (high.total / ((row.income - row.incomeMoe) / 12)) * 100,
    incomeNeeded: (base.total * 12) / (REPORT.guidelinePct / 100),
    priceToIncome: row.value / row.income,
    taxRate: (row.tax / row.value) * 100,
    paymentYearAgoRate: yearAgo.total,
    shareYearAgoRate: (yearAgo.total / incomeMonthly) * 100,
  };
}

/** All 50 states and DC, ranked from most to least affordable at the report rate. */
export const STATE_RESULTS: StateResult[] = STATE_ROWS.map((r) => computeRow(r))
  .sort((a, b) => a.share - b.share)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const US_RESULT = computeRow(US_ROW);

export function getStateResult(abbr: string): StateResult | undefined {
  return STATE_RESULTS.find((r) => r.abbr === abbr);
}

/** National and state-level share of income at an arbitrary mortgage rate. */
export function sensitivityAt(ratePct: number) {
  const us = computeRow(US_ROW, ratePct);
  const shares = STATE_ROWS.map((r) => computeRow(r, ratePct));
  return {
    rate: ratePct,
    usPayment: us.payment,
    usShare: us.share,
    overGuideline: shares.filter((s) => s.share > REPORT.guidelinePct).length,
  };
}

const round = (n: number, digits = 0) => {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
};

export const CSV_HEADER = [
  "rank_1_most_affordable",
  "state",
  "abbr",
  "fips",
  "median_home_value_usd",
  "median_home_value_moe90_usd",
  "median_property_tax_paid_usd",
  "median_property_tax_moe90_usd",
  "median_household_income_usd",
  "median_household_income_moe90_usd",
  "down_payment_usd",
  "loan_amount_usd",
  "mortgage_rate_pct",
  "monthly_principal_interest_usd",
  "monthly_property_tax_usd",
  "monthly_payment_usd",
  "payment_share_of_gross_income_pct",
  "share_range_low_pct",
  "share_range_high_pct",
  "income_needed_at_28pct_usd",
  "price_to_income_ratio",
  "effective_property_tax_rate_pct",
  "monthly_payment_at_year_ago_rate_usd",
  "share_at_year_ago_rate_pct",
] as const;

function csvLine(r: StateResult | (Omit<StateResult, "rank"> & { rank?: number })): string {
  const cells: (string | number)[] = [
    r.rank ?? "",
    r.name,
    r.abbr,
    r.fips,
    r.value,
    r.valueMoe,
    r.tax,
    r.taxMoe,
    r.income,
    r.incomeMoe,
    round(r.downPayment),
    round(r.loan),
    REPORT.mortgageRate,
    round(r.pi),
    round(r.taxMonthly),
    round(r.payment),
    round(r.share, 2),
    round(r.shareLow, 2),
    round(r.shareHigh, 2),
    round(r.incomeNeeded),
    round(r.priceToIncome, 2),
    round(r.taxRate, 2),
    round(r.paymentYearAgoRate),
    round(r.shareYearAgoRate, 2),
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
