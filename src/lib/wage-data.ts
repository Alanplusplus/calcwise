/**
 * Verified wage and compensation benchmarks for salary/hourly calculators.
 * Import from server components (Article, page.tsx) only — not from "use client" modules.
 */

/** BLS Employment Situation, September 2026 (preliminary): all private employees. */
export const BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026 = 37.81;

/** BLS Employment Situation, September 2026 (preliminary): production and nonsupervisory. */
export const BLS_AVERAGE_HOURLY_PRODUCTION_SEP_2026 = 32.6;

/** BLS OEWS, May 2025 data (released May 15, 2026): median for all occupations. */
export const OEWS_MEDIAN_HOURLY_MAY_2025 = 24.51;

/** BLS Usual Weekly Earnings, Q2 2026: median for full-time wage and salary workers. */
export const BLS_MEDIAN_WEEKLY_FULL_TIME_Q2_2026 = 1251;

/** CPS ASEC / Income in the United States: 2024, money income median household. */
export const CPS_MEDIAN_HOUSEHOLD_INCOME_2024 = 83730;

/** KFF 2025 Employer Health Benefits Survey: average annual single premium. */
export const KFF_SINGLE_PREMIUM_2025 = 9325;

/** KFF 2025: average worker contribution toward single premium. */
export const KFF_WORKER_SHARE_SINGLE_2025 = 1440;

/** Employer share of KFF 2025 average single premium. */
export const KFF_EMPLOYER_SHARE_SINGLE_2025 =
  KFF_SINGLE_PREMIUM_2025 - KFF_WORKER_SHARE_SINGLE_2025;

/** BLS ECEC June 2026: benefits share of total compensation, full-time private industry. */
export const ECEC_BENEFITS_SHARE_FULLTIME_PRIVATE_PCT = 31.5;

/** DOL FLSA white-collar exempt minimum salary (2019 rule restored May 2026). */
export const FLSA_EXEMPT_MIN_WEEKLY = 684;
export const FLSA_EXEMPT_MIN_ANNUAL = 35568;

export const FEDERAL_MINIMUM_WAGE = 7.25;

/** Colorado statewide minimum wage, Jan. 1, 2026 (CDLE). */
export const COLORADO_MIN_WAGE_2026 = 15.16;

/** Denver city/county minimum wage, 2026 (City and County of Denver). */
export const DENVER_MIN_WAGE_2026 = 19.29;

/** Arizona statewide minimum wage, Jan. 1, 2026 (Industrial Commission of Arizona). */
export const ARIZONA_MIN_WAGE_2026 = 15.15;

/** Arizona individual income tax rate for taxable years beginning Jan. 1, 2026 (A.R.S. § 43-1022). */
export const ARIZONA_INCOME_TAX_RATE_2026 = 0.0247;

export const STANDARD_PAID_HOURS_PER_YEAR = 2080;

export function usdWhole(n: number): string {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function usd2(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Annual salary at 40 hours × 52 weeks from an hourly rate. */
export function annualFromHourly(hourly: number): number {
  return hourly * STANDARD_PAID_HOURS_PER_YEAR;
}

/** Gross hourly from annual salary at 2,080 paid hours. */
export function hourlyFromAnnual(annual: number): number {
  return annual / STANDARD_PAID_HOURS_PER_YEAR;
}

export const WAGE_BENCHMARK_SOURCES = {
  blsEmpsitSep2026: {
    label: "BLS Employment Situation (Sep. 2026, released Oct. 2, 2026)",
    href: "https://www.bls.gov/news.release/empsit.nr0.htm",
  },
  blsOewsMay2025: {
    label: "BLS OEWS national table, May 2025 (released May 15, 2026)",
    href: "https://www.bls.gov/news.release/ocwage.t01.htm",
  },
  blsWeeklyQ2_2026: {
    label: "BLS Usual Weekly Earnings, Q2 2026 (released July 17, 2026)",
    href: "https://www.bls.gov/news.release/wkyeng.t02.htm",
  },
  blsEcecJun2026: {
    label: "BLS Employer Costs for Employee Compensation, June 2026 (released Sep. 9, 2026)",
    href: "https://www.bls.gov/news.release/ecec.htm",
  },
  kff2025: {
    label: "KFF 2025 Employer Health Benefits Survey (Sep. 2025)",
    href: "https://www.kff.org/health-costs/2025-employer-health-benefits-survey/",
  },
  dolExempt: {
    label: "DOL FLSA salary-level thresholds (2019 rule in effect)",
    href: "https://www.dol.gov/agencies/whd/overtime/salary-levels",
  },
  opm2087: {
    label: "OPM fact sheet: 2,087-hour divisor for federal hourly rates",
    href: "https://www.opm.gov/policy-data-oversight/pay-leave/pay-administration/fact-sheets/computing-hourly-rates-of-pay-using-the-2087-hour-divisor",
  },
  censusIncome2024: {
    label: "Census Income in the United States: 2024 (CPS ASEC, Sep. 9, 2025)",
    href: "https://www.census.gov/library/publications/2025/demo/p60-286.html",
  },
  federalMinWage: {
    label: "DOL FLSA minimum wage ($7.25/hour)",
    href: "https://www.dol.gov/agencies/whd/flsa",
  },
  coloradoMin2026: {
    label: "Colorado Department of Labor, 2026 minimum wage",
    href: "https://cdle.colorado.gov/dlss",
  },
  denverMin2026: {
    label: "City and County of Denver, 2026 minimum wage ($19.29/hour)",
    href: "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Auditors-Office/Denver-Labor/Citywide-Minimum-Wage",
  },
  arizonaMin2026: {
    label: "Industrial Commission of Arizona, 2026 minimum wage ($15.15/hour)",
    href: "https://www.azica.gov/labor-minimum-wage-main-page",
  },
  cpsHours2025: {
    label: "BLS CPS Table 62, 2025 annual averages (full-time hours)",
    href: "https://www.bls.gov/cps/cpsaat62.htm",
  },
} as const;
