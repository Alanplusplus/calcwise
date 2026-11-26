/**
 * Data dictionary for the ten CSV downloads.
 *
 * The rows are generated from each report's CSV_HEADER, so the dictionary always lists exactly the
 * columns the file has, in the file's order. TypeScript refuses to compile when a column has no entry
 * or an entry has no column. Margin-of-error columns (names containing "moe90") are not written by hand:
 * each one is the 90% margin of error of the column right before it, in that column's unit (percentage
 * points for a percent). Units are checked against the column name, so "_usd" cannot be described as a
 * percent. Meanings and table numbers restate the field comments in each report's data module and the
 * method notes on the report pages.
 */

import * as affordability from "./mortgage-affordability-by-state";
import * as rentVsBuy from "./rent-vs-buy-by-state";
import * as costBurden from "./housing-cost-burden-by-state";
import * as insurance from "./homeowners-insurance-by-state";
import * as cars from "./car-ownership-by-state";
import * as retirement from "./retirement-income-by-state";
import * as mortgageFree from "./mortgage-free-homeowners-by-state";
import * as sixFigure from "./six-figure-households-by-state";
import * as propertyTax from "./property-tax-by-state";
import * as selfEmployment from "./self-employment-by-state";
import { csvFilename } from "./csv";
import type { ReportSlug } from "./press";

export interface DictionaryRow {
  column: string;
  unit: string;
  meaning: string;
  /** ACS table and line, or the other source, the column comes from */
  tables: string;
  /** true for a 90% margin-of-error column */
  isMargin: boolean;
}

export interface Dictionary {
  slug: ReportSlug;
  filename: string;
  rows: DictionaryRow[];
}

interface Def {
  unit: string;
  meaning: string;
  tables: string;
}

const d = (unit: string, meaning: string, tables: string): Def => ({ unit, meaning, tables });

/** Columns that need a hand-written entry: not the identifier columns, not the margin-of-error columns. */
type Columns<H extends readonly string[]> = Exclude<H[number], `${string}moe90${string}` | `rank_${string}` | "state" | "abbr" | "fips">;

const USD = "US dollars";
const USD_YR = "US dollars per year";
const USD_MO = "US dollars per month";
const PCT = "percent";
const PTS = "percentage points";
const RANK = "rank, 1 to 51";
const TEXT = "text";
const CALC = "Calculated by CalcWise";
const NONE = "None (identifier)";

/** Identifier columns every file starts with. Only the rank column differs by report. */
const ids = (rankMeaning: string) => ({
  state: d(TEXT, "State name, DC, or United States (the last row of the file)", NONE),
  abbr: d(TEXT, "Two-letter abbreviation (US for the United States)", NONE),
  fips: d(TEXT, "Two-digit FIPS code of the state (00 for the United States)", NONE),
  rankColumn: d(RANK, `${rankMeaning}. Blank on the United States row`, CALC),
});

function checkUnit(column: string, unit: string) {
  const tokens = column.split("_");
  const has = (t: string) => tokens.includes(t);
  const bad = (why: string) => {
    throw new Error(`Data dictionary: column "${column}" has unit "${unit}", but ${why}`);
  };
  if (has("usd") && !unit.startsWith(USD)) bad("its name says US dollars");
  if (has("pct") && !has("moe90") && unit !== PCT) bad("its name says percent");
  if (has("pts") && unit !== PTS) bad("its name says percentage points");
  // "ratio_computed" counts households whose housing-cost ratio could be computed; it is not a ratio itself.
  if (has("ratio") && !has("computed") && !unit.startsWith("ratio")) bad("its name says ratio");
}

function build<H extends readonly string[]>(
  slug: ReportSlug,
  report: { slug: string; acsYear: number; csvVersion: number },
  header: H,
  rank: string,
  defs: Record<Columns<H>, Def>,
): Dictionary {
  const all: Record<string, Def> = { ...defs };
  const idDefs = ids(rank);
  const rows: DictionaryRow[] = [];

  if (!header[0]?.startsWith("rank_")) throw new Error(`Data dictionary: the first column of ${slug} is not the rank column`);

  header.forEach((column, i) => {
    if (column.includes("moe90")) {
      const prev = header[i - 1];
      if (!prev || prev.includes("moe90")) throw new Error(`Data dictionary: margin column "${column}" does not follow an estimate column`);
      const base = i === 0 ? undefined : rows[i - 1];
      if (!base) throw new Error(`Data dictionary: no estimate row for "${column}"`);
      const unit = base.unit === PCT ? PTS : base.unit;
      checkUnit(column, unit);
      rows.push({
        column,
        unit,
        meaning: `90% margin of error of ${prev}`,
        tables: base.tables,
        isMargin: true,
      });
      return;
    }
    let def: Def | undefined;
    if (i === 0) def = idDefs.rankColumn;
    else if (column === "state" || column === "abbr" || column === "fips") def = idDefs[column];
    else def = all[column];
    if (!def) throw new Error(`Data dictionary: no definition for column "${column}" of ${slug}`);
    checkUnit(column, def.unit);
    rows.push({ column, unit: def.unit, meaning: def.meaning, tables: def.tables, isMargin: false });
  });

  return { slug, filename: csvFilename(report), rows };
}

// ---- Mortgage affordability -----------------------------------------------------------------------------

const AF = affordability.REPORT;
const AF_CALC = "Calculated from B25077, B25103, B19013; Freddie Mac PMMS";

const mortgageAffordability = build(AF.slug, AF, affordability.CSV_HEADER, "1 = the payment on the median home takes the smallest share of income", {
  median_home_value_usd: d(USD, "Median value of owner-occupied housing units", "B25077_001"),
  median_property_tax_paid_usd: d(USD_YR, "Median real estate taxes paid by owner-occupied housing units", "B25103_001"),
  median_household_income_usd: d(USD_YR, "Median household income", "B19013_001"),
  down_payment_usd: d(USD, `Down payment on the median home: ${AF.downPaymentPct}% of the median home value`, AF_CALC),
  loan_amount_usd: d(USD, "Median home value minus the down payment", AF_CALC),
  mortgage_rate_pct: d(
    PCT,
    `Freddie Mac PMMS 30-year fixed-rate average for the week of ${AF.mortgageRateDate}, fixed for the whole report: the same value in every row`,
    "Freddie Mac PMMS",
  ),
  monthly_principal_interest_usd: d(USD_MO, `Principal and interest on the loan, ${AF.termYears}-year fixed at the report rate`, AF_CALC),
  monthly_property_tax_usd: d(USD_MO, "Median property tax paid divided by 12", "Calculated from B25103"),
  monthly_payment_usd: d(USD_MO, "Principal, interest, and property tax on the median home (homeowners insurance is not included)", AF_CALC),
  payment_share_of_gross_income_pct: d(PCT, "Monthly payment as a share of gross monthly income (median household income divided by 12)", AF_CALC),
  share_range_low_pct: d(PCT, "Low end of a conservative range for the payment share, using every input at its 90% margin of error", AF_CALC),
  share_range_high_pct: d(PCT, "High end of the same conservative range", AF_CALC),
  income_needed_at_28pct_usd: d(USD_YR, `Annual income at which the payment equals the ${AF.guidelinePct}% guideline share of gross income`, AF_CALC),
  price_to_income_ratio: d("ratio", "Median home value divided by median household income", "Calculated from B25077, B19013"),
  effective_property_tax_rate_pct: d(PCT, "Median property tax paid divided by median home value", "Calculated from B25103, B25077"),
  monthly_payment_at_year_ago_rate_usd: d(USD_MO, `The same monthly payment recalculated at the rate of a year earlier (${AF.mortgageRateYearAgo}%)`, AF_CALC),
  share_at_year_ago_rate_pct: d(PCT, "Payment at the year-ago rate as a share of gross monthly income", AF_CALC),
});

// ---- Rent vs. buy -----------------------------------------------------------------------------------------

const RB = rentVsBuy.REPORT;
const RB_CALC = "Calculated from B25077, B25103, B25064; Freddie Mac PMMS";

const rentVsBuyDict = build(RB.slug, RB, rentVsBuy.CSV_HEADER, "1 = the payment on the median home is closest to the median rent", {
  median_gross_rent_usd_per_month: d(USD_MO, "Median gross rent: contract rent plus tenant-paid utilities", "B25064_001"),
  median_home_value_usd: d(USD, "Median value of owner-occupied housing units", "B25077_001"),
  median_property_tax_paid_usd: d(USD_YR, "Median real estate taxes paid by owner-occupied housing units", "B25103_001"),
  down_payment_usd: d(USD, `Down payment on the median home: ${RB.downPaymentPct}% of the median home value`, "Calculated from B25077"),
  loan_amount_usd: d(USD, "Median home value minus the down payment", "Calculated from B25077"),
  mortgage_rate_pct: d(
    PCT,
    `Freddie Mac PMMS 30-year fixed-rate average for the week of ${RB.mortgageRateDate}, fixed for the whole report: the same value in every row`,
    "Freddie Mac PMMS",
  ),
  monthly_principal_interest_usd: d(USD_MO, `Principal and interest on the loan, ${RB.termYears}-year fixed at the report rate`, RB_CALC),
  monthly_property_tax_usd: d(USD_MO, "Median property tax paid divided by 12", "Calculated from B25103"),
  monthly_payment_usd: d(USD_MO, "Principal, interest, and property tax on the median home", RB_CALC),
  payment_minus_rent_usd: d(USD_MO, "Monthly payment minus median gross rent", RB_CALC),
  payment_to_rent_ratio: d("ratio", "Monthly payment divided by median gross rent", RB_CALC),
  ratio_range_low: d("ratio", "Low end of a conservative range for the payment-to-rent ratio, using every input at its 90% margin of error", RB_CALC),
  ratio_range_high: d("ratio", "High end of the same conservative range", RB_CALC),
  price_to_annual_rent_ratio: d("ratio", "Median home value divided by a year of median gross rent", "Calculated from B25077, B25064"),
  down_payment_in_years_of_rent: d("years of rent", "Down payment expressed in years of median gross rent", "Calculated from B25077, B25064"),
  first_year_principal_repaid_usd: d(USD, "Principal repaid during the first 12 payments", RB_CALC),
  monthly_interest_plus_tax_first_year_usd: d(USD_MO, "Average monthly interest plus property tax over the first year (excludes principal repaid)", RB_CALC),
  interest_plus_tax_to_rent_ratio: d("ratio", "That monthly interest plus property tax divided by median gross rent", RB_CALC),
  break_even_rate_pct: d(
    PCT,
    "Mortgage rate at which the payment on the median home equals the median rent. Blank when even a 0% loan would cost more than the rent",
    RB_CALC,
  ),
  rent_equivalent_home_price_usd: d(USD, "Price of a home whose payment equals the median rent at the report rate, using the state's property tax rate", RB_CALC),
  rent_equivalent_price_pct_of_median_value: d(PCT, "That price as a percent of the median home value", "Calculated from B25077, B25064, B25103"),
  median_renter_household_income_usd: d(USD_YR, "Median household income of renter-occupied households", "B25119_003"),
  median_owner_household_income_usd: d(USD_YR, "Median household income of owner-occupied households", "B25119_002"),
  rent_share_of_renter_income_pct: d(PCT, "Median rent as a percent of median renter-household income", "Calculated from B25064, B25119"),
  payment_share_of_owner_income_pct: d(PCT, "Monthly payment as a percent of median owner-household income", RB_CALC + ", B25119"),
  payment_share_of_renter_income_pct: d(PCT, "Monthly payment as a percent of median renter-household income: what a typical renter would pay to buy the median home", RB_CALC + ", B25119"),
  monthly_payment_at_year_ago_rate_usd: d(USD_MO, `The same monthly payment recalculated at the rate of a year earlier (${RB.mortgageRateYearAgo}%)`, RB_CALC),
  payment_to_rent_ratio_at_year_ago_rate: d("ratio", "Payment at the year-ago rate divided by median gross rent", RB_CALC),
});

// ---- Housing cost burden ------------------------------------------------------------------------------------

const CB = costBurden.REPORT;

const costBurdenDict = build(CB.slug, CB, costBurden.CSV_HEADER, "1 = the largest share of households paying 30% or more of income for housing", {
  all_households_30pct_or_more_share_pct: d(PCT, "Share of households paying 30% or more of income on housing: renters, owners with a mortgage, and owners without a mortgage, among those with a computed ratio", "B25070, B25091"),
  all_households_50pct_or_more_share_pct: d(PCT, "Share of households paying 50% or more of income on housing, same group", "B25070, B25091"),
  all_households_30pct_or_more_count: d("households", "Households paying 30% or more of income on housing", "B25070_007 to _010; B25091_008 to _011 and _019 to _022"),
  all_households_50pct_or_more_count: d("households", "Households paying 50% or more of income on housing", "B25070_010; B25091_011 and _022"),
  all_households_ratio_computed_count: d("households", "Households for which the housing-cost ratio was computed: renters plus owners with and without a mortgage", "B25070, B25091"),
  renter_households_total: d("renter-occupied housing units", "All renter-occupied housing units", "B25070_001"),
  renter_households_ratio_computed: d("renter households", "Renter households with a computed gross-rent ratio: the total minus the \"not computed\" row", "B25070_001 minus _011"),
  renter_30pct_or_more_count: d("renter households", "Renter households paying 30% or more of income in gross rent", "B25070_007 to _010"),
  renter_30pct_or_more_share_pct: d(PCT, "Renter households paying 30% or more, as a share of renter households with a computed ratio", "B25070"),
  renter_50pct_or_more_count: d("renter households", "Renter households paying 50% or more of income in gross rent", "B25070_010"),
  renter_50pct_or_more_share_pct: d(PCT, "Renter households paying 50% or more, as a share of renter households with a computed ratio", "B25070"),
  owner_households_total: d("owner-occupied housing units", "All owner-occupied housing units", "B25091_001"),
  owner_with_mortgage_ratio_computed: d("owner households", "Owners with a mortgage and a computed cost ratio", "B25091_002 minus _012"),
  owner_with_mortgage_30pct_or_more_count: d("owner households", "Owners with a mortgage whose selected monthly owner costs are 30% or more of income", "B25091_008 to _011"),
  owner_with_mortgage_30pct_or_more_share_pct: d(PCT, "That count as a share of owners with a mortgage and a computed ratio", "B25091"),
  owner_with_mortgage_50pct_or_more_count: d("owner households", "Owners with a mortgage whose costs are 50% or more of income", "B25091_011"),
  owner_with_mortgage_50pct_or_more_share_pct: d(PCT, "That count as a share of owners with a mortgage and a computed ratio", "B25091"),
  owner_without_mortgage_ratio_computed: d("owner households", "Owners without a mortgage and a computed cost ratio", "B25091_013 minus _023"),
  owner_without_mortgage_30pct_or_more_count: d("owner households", "Owners without a mortgage whose costs are 30% or more of income", "B25091_019 to _022"),
  owner_without_mortgage_30pct_or_more_share_pct: d(PCT, "That count as a share of owners without a mortgage and a computed ratio", "B25091"),
  owner_without_mortgage_50pct_or_more_count: d("owner households", "Owners without a mortgage whose costs are 50% or more of income", "B25091_022"),
  owner_without_mortgage_50pct_or_more_share_pct: d(PCT, "That count as a share of owners without a mortgage and a computed ratio", "B25091"),
  renter_share_of_all_households_pct: d(PCT, "Renter-occupied units as a percent of all occupied units", "B25070_001, B25091_001"),
  renter_share_of_households_paying_30pct_or_more_pct: d(PCT, "Renters as a percent of all households paying 30% or more", "B25070, B25091"),
  median_gross_rent_pct_of_income: d(PCT, "Median gross rent as a percentage of household income", "B25071_001"),
  median_owner_costs_pct_of_income_with_mortgage: d(PCT, "Median selected monthly owner costs as a percentage of income, owners with a mortgage", "B25092_002"),
  median_gross_rent_usd_per_month: d(USD_MO, "Median gross rent", "B25064_001"),
  median_renter_household_income_usd: d(USD_YR, "Median household income of renter-occupied households", "B25119_003"),
  income_needed_for_median_rent_at_30pct_usd: d(USD_YR, `Annual income at which the median rent is exactly ${CB.burdenPct}% of income`, "Calculated from B25064"),
  median_renter_income_vs_income_needed_pct: d(PCT, "Median renter household income relative to the income needed, in percent (negative means below)", "Calculated from B25119, B25064"),
});

// ---- Homeowners insurance ---------------------------------------------------------------------------------------

const IN = insurance.REPORT;
const IN_PAY = "Calculated from B25077, B25103, B25141, B19013; Freddie Mac PMMS";

const insuranceDict = build(IN.slug, IN, insurance.CSV_HEADER, "1 = the highest estimated median premium among owners with a mortgage", {
  owners_with_mortgage_count: d("owner-occupied housing units", "Owner-occupied units with a mortgage", "B25141_002"),
  estimated_median_annual_premium_with_mortgage_usd: d(
    USD_YR,
    "Estimated median annual premium, owners with a mortgage. The Census Bureau publishes brackets, not a median, so the median is placed by linear interpolation inside its bracket and rounded to the nearest $10",
    "B25141_003 to _014",
  ),
  median_premium_bracket_with_mortgage: d(TEXT, "The published annual-premium bracket that holds that median, owners with a mortgage", "B25141_003 to _014"),
  share_paying_3000_or_more_with_mortgage_pct: d(PCT, "Owners with a mortgage paying $3,000 or more a year, as a share of owners with a mortgage", "B25141_012 to _014 over _002"),
  share_paying_2000_or_more_with_mortgage_pct: d(PCT, "Owners with a mortgage paying $2,000 or more a year, as a share of owners with a mortgage", "B25141_010 to _014 over _002"),
  share_reporting_under_100_with_mortgage_pct: d(PCT, "Owners with a mortgage reporting less than $100 a year, as a share of owners with a mortgage", "B25141_003 over _002"),
  owners_without_mortgage_count: d("owner-occupied housing units", "Owner-occupied units without a mortgage", "B25141_015"),
  estimated_median_annual_premium_without_mortgage_usd: d(USD_YR, "Estimated median annual premium, owners without a mortgage, by the same interpolation", "B25141_016 to _027"),
  median_premium_bracket_without_mortgage: d(TEXT, "The published annual-premium bracket that holds that median, owners without a mortgage", "B25141_016 to _027"),
  share_paying_3000_or_more_without_mortgage_pct: d(PCT, "Owners without a mortgage paying $3,000 or more a year, as a share of owners without a mortgage", "B25141_025 to _027 over _015"),
  median_home_value_usd: d(USD, "Median value of owner-occupied housing units", "B25077_001"),
  median_property_tax_paid_usd: d(USD_YR, "Median real estate taxes paid", "B25103_001"),
  median_household_income_usd: d(USD_YR, "Median household income", "B19013_001"),
  premium_pct_of_median_home_value: d(PCT, "Estimated median premium as a percent of the median home value", "Calculated from B25141, B25077"),
  premium_to_property_tax_ratio: d("ratio", "Estimated median premium divided by the median property tax bill", "Calculated from B25141, B25103"),
  monthly_tax_plus_insurance_usd: d(USD_MO, "Median property tax plus estimated median premium, per month", "Calculated from B25103, B25141"),
  tax_plus_insurance_share_of_income_pct: d(PCT, "Median property tax plus estimated median premium, as a percent of median household income", "Calculated from B25103, B25141, B19013"),
  mortgage_rate_pct: d(
    PCT,
    `Freddie Mac PMMS 30-year fixed-rate average for the week of ${IN.mortgageRateDate}, fixed for the whole report: the same value in every row`,
    "Freddie Mac PMMS",
  ),
  monthly_principal_interest_usd: d(USD_MO, "Principal and interest on the loan for the median home at the report rate", IN_PAY),
  monthly_property_tax_usd: d(USD_MO, "Median property tax paid divided by 12", "Calculated from B25103"),
  monthly_insurance_usd: d(USD_MO, "Estimated median premium divided by 12", "Calculated from B25141"),
  monthly_payment_with_insurance_usd: d(USD_MO, "Principal, interest, property tax, and insurance", IN_PAY),
  payment_share_of_gross_income_with_insurance_pct: d(PCT, "Payment with insurance as a percent of gross monthly income", IN_PAY),
  monthly_payment_without_insurance_usd: d(USD_MO, "Principal, interest, and property tax only", IN_PAY),
  payment_share_of_gross_income_without_insurance_pct: d(PCT, "Payment without insurance as a percent of gross monthly income", IN_PAY),
  insurance_adds_pts_of_income: d(PTS, "Percentage points of income that insurance adds to the payment", IN_PAY),
  income_needed_at_28pct_with_insurance_usd: d(USD_YR, `Annual income at which the full payment equals the ${IN.guidelinePct}% guideline share of gross income`, IN_PAY),
});

// ---- Car ownership ----------------------------------------------------------------------------------------------

const CO = cars.REPORT;
const AAA_NOTE = `AAA Your Driving Costs ${cars.AAA.year}, national figure applied to every state`;

const carDict = build(CO.slug, CO, cars.CSV_HEADER, "1 = the most vehicles per household", {
  households: d("households", "Occupied housing units (households)", "B25044_001"),
  vehicles_available_total: d("vehicles", "Aggregate number of vehicles available to all occupied housing units", "B25046_001"),
  vehicles_per_household: d("vehicles per household", "Vehicles available per household, all households", "B25046_001 over B25044_001"),
  vehicles_per_household_with_a_vehicle: d("vehicles per household", "Vehicles available per household that has at least one", "B25046_001 over B25044"),
  households_no_vehicle_pct: d(PCT, "Households with no vehicle available, owners and renters together", "B25044"),
  households_1_vehicle_pct: d(PCT, "Households with 1 vehicle available", "B25044"),
  households_2_vehicles_pct: d(PCT, "Households with 2 vehicles available", "B25044"),
  households_3_plus_vehicles_pct: d(PCT, "Households with 3 or more vehicles available", "B25044"),
  households_2_plus_vehicles_pct: d(PCT, "Households with 2 or more vehicles available", "B25044"),
  owner_households_no_vehicle_pct: d(PCT, "Owner-occupied households with no vehicle, as a share of owner-occupied households", "B25044_003 over _002"),
  renter_households_no_vehicle_pct: d(PCT, "Renter-occupied households with no vehicle, as a share of renter-occupied households", "B25044_010 over _009"),
  median_household_income_usd: d(USD_YR, "Median household income", "B19013_001"),
  aaa_insurance_plus_fuel_per_vehicle_usd: d(USD_YR, `Insurance plus fuel for one new vehicle driven ${cars.AAA.milesPerYear.toLocaleString("en-US")} miles a year; the same value in every row`, AAA_NOTE),
  insurance_plus_fuel_average_car_household_usd: d(USD_YR, "AAA insurance plus fuel for the vehicles of the average household that has a vehicle", `${AAA_NOTE}; B25046, B25044`),
  insurance_plus_fuel_share_of_income_pct: d(PCT, "That amount as a percent of median household income", `${AAA_NOTE}; B19013`),
  aaa_running_cost_per_vehicle_usd: d(USD_YR, "Insurance, fuel, maintenance, and registration for one vehicle: what a paid-off vehicle costs to keep on the road; the same value in every row", AAA_NOTE),
  running_cost_average_car_household_usd: d(USD_YR, "That running cost for the vehicles of the average household that has a vehicle", `${AAA_NOTE}; B25046, B25044`),
  running_cost_share_of_income_pct: d(PCT, "That amount as a percent of median household income", `${AAA_NOTE}; B19013`),
  aaa_all_in_one_new_vehicle_share_of_income_pct: d(PCT, "AAA all-in cost of one new vehicle as a percent of median household income", `${AAA_NOTE}; B19013`),
  vehicles_inside_10pct_line_at_median_income: d("vehicles", `How many vehicles' worth of AAA insurance and fuel fit inside the ${CO.guidelinePct}% line at the median income`, `${AAA_NOTE}; B19013`),
});

// ---- Social Security and retirement income ----------------------------------------------------------------------------

const RT = retirement.REPORT;

const retirementDict = build(RT.slug, RT, retirement.CSV_HEADER, "1 = the most Social Security plus retirement income per household", {
  households: d("households", "Households", "B19055_001"),
  households_with_social_security: d("households", "Households with Social Security income", "B19055_002"),
  households_with_social_security_pct: d(PCT, "Households with Social Security income as a share of all households", "B19055"),
  social_security_aggregate_usd: d(USD, "Aggregate Social Security income of households", "B19065_001"),
  social_security_mean_per_recipient_household_usd: d(USD_YR, "Mean Social Security income of the households that receive it: aggregate divided by households with the income", "B19065_001 over B19055_002"),
  social_security_mean_per_recipient_household_monthly_usd: d(USD_MO, "That mean divided by 12", "B19065_001 over B19055_002"),
  households_with_retirement_income: d("households", "Households with retirement, survivor, or disability income", "B19059_002"),
  households_with_retirement_income_pct: d(PCT, "Households with retirement, survivor, or disability income as a share of all households", "B19059"),
  retirement_income_aggregate_usd: d(USD, "Aggregate retirement, survivor, and disability income of households", "B19069_001"),
  retirement_income_mean_per_recipient_household_usd: d(USD_YR, "Mean retirement income of the households that receive it: aggregate divided by households with the income", "B19069_001 over B19059_002"),
  social_security_plus_retirement_per_household_usd: d(USD_YR, "Social Security plus retirement dollars per household, counting households with none", "B19065_001, B19069_001, B19055_001"),
  households_with_65plus_member_pct: d(PCT, "Households with one or more people 65 years and over, as a share of all households", "B11007_002"),
  median_income_householder_65plus_usd: d(USD_YR, "Median household income of householders 65 years and over", "B19049_005"),
  median_household_income_all_ages_usd: d(USD_YR, "Median household income, all ages", "B19013_001"),
});

// ---- Mortgage-free homeowners -----------------------------------------------------------------------------------------

const MF = mortgageFree.REPORT;

const mortgageFreeDict = build(MF.slug, MF, mortgageFree.CSV_HEADER, "1 = the highest share of owners without a mortgage", {
  owner_households: d("owner-occupied households", "Owner-occupied households", "B25081_001"),
  owners_without_mortgage: d("owner-occupied households", "Owners without a mortgage (owned free and clear of debt)", "B25081_009"),
  owners_without_mortgage_pct: d(PCT, "Owners without a mortgage as a share of owner households", "B25081"),
  owners_with_mortgage: d("owner-occupied households", "Owners with a mortgage, contract to purchase, or similar debt", "B25081_002"),
  owners_with_mortgage_pct: d(PCT, "Owners with a mortgage as a share of owner households", "B25081"),
  owners_with_second_mortgage_or_home_equity_loan: d("owner-occupied households", "Owners with a second mortgage or a home equity loan, with or without a first mortgage", "B25081_004 plus _008"),
  owners_with_second_mortgage_or_home_equity_loan_pct_of_all_owners: d(PCT, "Owners with a second mortgage or home equity loan as a share of all owner households", "B25081"),
  owners_with_second_mortgage_or_home_equity_loan_pct_of_owners_with_mortgage: d(PCT, "Owners with a second mortgage or home equity loan as a share of owners with a mortgage", "B25081"),
  owners_65plus: d("owner-occupied households", "Owner households with a householder 65 and over", "B25027_008, _009, _016, _017"),
  owners_65plus_with_mortgage_pct: d(PCT, "Owners with a householder 65 and over that still have a mortgage, as a share of owners in that age group", "B25027_008 and _009 over _008, _009, _016, _017"),
  owners_55_to_64_with_mortgage_pct: d(PCT, "Owners with a householder 55 to 64 that have a mortgage, as a share of owners in that age group", "B25027_006 and _007 over _006, _007, _014, _015"),
  owners_under_45_with_mortgage_pct: d(PCT, "Owners with a householder under 45 that have a mortgage, as a share of owners in that age group", "B25027_003, _004 over _003, _004, _011, _012"),
  median_monthly_owner_cost_with_mortgage_usd: d(USD_MO, "Median selected monthly owner costs, owners with a mortgage", "B25088_002"),
  median_monthly_owner_cost_without_mortgage_usd: d(USD_MO, "Median selected monthly owner costs, owners without a mortgage", "B25088_003"),
  median_cost_without_mortgage_as_pct_of_median_cost_with_mortgage: d(PCT, "Median cost without a mortgage divided by median cost with one, as a percent", "B25088_003 over _002"),
  median_home_value_usd: d(USD, "Median value of owner-occupied housing units", "B25077_001"),
  median_household_income_usd: d(USD_YR, "Median household income", "B19013_001"),
  median_real_estate_taxes_usd_per_year: d(USD_YR, "Median real estate taxes paid", "B25103_001"),
  avg_monthly_social_security_per_recipient_household_usd: d(USD_MO, "Average monthly Social Security income of households that receive it, from the retirement income report", "B19065_001 over B19055_002, divided by 12"),
  median_owner_cost_with_mortgage_as_pct_of_avg_monthly_social_security: d(PCT, "Median monthly owner cost with a mortgage divided by the average monthly Social Security amount, as a percent", "B25088_002; B19065_001 and B19055_002"),
});

// ---- Six-figure households --------------------------------------------------------------------------------------------

const SF = sixFigure.REPORT;
const SF_PAY = `Calculated from B25077, B25103, B19013; Freddie Mac PMMS (affordability report's rate, week of ${sixFigure.AFFORDABILITY_PINNED.rateDate})`;

const sixFigureDict = build(SF.slug, SF, sixFigure.CSV_HEADER, "1 = the highest share of households with income of $100,000 or more", {
  households: d("households", "Households in the income distribution", "B19001_001"),
  households_100k_plus: d("households", "Households with income of $100,000 or more", "B19001_014 to _017"),
  households_100k_plus_pct: d(PCT, "Households with income of $100,000 or more as a share of all households", "B19001"),
  households_150k_plus_pct: d(PCT, "Households with income of $150,000 or more as a share of all households", "B19001_016 and _017"),
  households_200k_plus_pct: d(PCT, "Households with income of $200,000 or more as a share of all households", "B19001_017"),
  households_under_50k_pct: d(PCT, "Households with income under $50,000 as a share of all households", "B19001_002 to _010"),
  percentile_of_a_100k_household_pct_below: d(PCT, "Share of households with income under $100,000: the percentile at which a $100,000 household sits", "B19001"),
  median_household_income_usd: d(USD_YR, "Median household income", "B19013_001"),
  quintile1_upper_limit_usd: d(USD_YR, "Upper limit of the lowest household income quintile", "B19080_001"),
  quintile2_upper_limit_usd: d(USD_YR, "Upper limit of the second household income quintile", "B19080_002"),
  quintile3_upper_limit_usd: d(USD_YR, "Upper limit of the third household income quintile", "B19080_003"),
  top_quintile_lower_limit_usd: d(USD_YR, "Upper limit of the fourth quintile, which is the lower limit of the top quintile", "B19080_004"),
  top_5pct_lower_limit_usd: d(USD_YR, "Lower limit of the top 5 percent of households. The Census Bureau top-codes it at $250,001, which means $250,000 or more; no margin of error is published for it", "B19080_005"),
  top_5pct_lower_limit_is_top_coded_250000_or_more: d(TEXT, "yes when the top 5 percent limit is top-coded at $250,000 or more, otherwise no", "B19080_005"),
  gini_index: d("index, 0 to 1", "Gini index of income inequality: 0 is equal, 1 is one household having everything", "B19083_001"),
  median_earnings_men_full_time_year_round_usd: d(USD_YR, "Median earnings of men who worked full-time, year-round", "B20017_003"),
  median_earnings_women_full_time_year_round_usd: d(USD_YR, "Median earnings of women who worked full-time, year-round", "B20017_006"),
  women_to_men_median_earnings_pct: d(PCT, "Median earnings of women who work full-time, year-round, divided by the same for men, as a percent", "B20017_006 over _003"),
  median_gross_rent_usd_per_month: d(USD_MO, "Median gross rent, from the rent vs. buy report", "B25064_001"),
  median_rent_as_pct_of_100k: d(PCT, `Median monthly rent times 12 as a percent of the benchmark income of $${SF.benchmarkIncome.toLocaleString("en-US")}`, "Calculated from B25064"),
  median_home_value_usd: d(USD, "Median value of owner-occupied housing units, from the mortgage affordability report", "B25077_001"),
  payment_on_median_home_usd_per_month: d(USD_MO, `Principal, interest, and property tax on the median home (${sixFigure.AFFORDABILITY_PINNED.downPaymentPct}% down, ${sixFigure.AFFORDABILITY_PINNED.rate.toFixed(2)}%, the affordability report's terms)`, SF_PAY),
  payment_as_pct_of_100k: d(PCT, `That payment times 12 as a percent of the benchmark income of $${SF.benchmarkIncome.toLocaleString("en-US")}`, SF_PAY),
  income_needed_for_median_home_at_28pct_usd: d(USD_YR, `Annual income at which the payment equals the affordability report's ${sixFigure.AFFORDABILITY_PINNED.guidelinePct}% guideline`, SF_PAY),
});

// ---- Property tax ------------------------------------------------------------------------------------------------------

const PT = propertyTax.REPORT;

const propertyTaxDict = build(PT.slug, PT, propertyTax.CSV_HEADER, "1 = the highest median property tax bill", {
  owner_occupied_units: d("owner-occupied housing units", "Owner-occupied housing units", "B25102_001"),
  median_property_tax_usd: d(USD_YR, "Median real estate taxes paid, all owners", "B25103_001"),
  median_property_tax_with_mortgage_usd: d(USD_YR, "Median real estate taxes paid, owners with a mortgage", "B25103_002"),
  median_property_tax_without_mortgage_usd: d(USD_YR, "Median real estate taxes paid, owners without a mortgage", "B25103_003"),
  mean_property_tax_among_owners_with_a_bill_usd: d(USD_YR, "Aggregate real estate taxes divided by the owners who report a bill: all owners minus the \"no real estate taxes paid\" bracket", "B25090_001; B25102"),
  effective_rate_median_tax_over_median_home_value_pct: d(PCT, "Median tax divided by median home value. A ratio of two medians, not the median of each home's own rate", "B25103_001 over B25077"),
  median_property_tax_pct_of_median_household_income: d(PCT, "Median tax as a percent of median household income", "B25103_001 over B19013"),
  tax_on_400000_home_at_state_effective_rate_usd: d(USD_YR, `The state's effective rate applied to a round home value of $${PT.illustrativeHome.toLocaleString("en-US")}`, "Calculated from B25103, B25077"),
  owners_paying_under_800_pct: d(PCT, "Owners whose bill is under $800, as a share of all owners", "B25102_003 and _010 over _001"),
  owners_paying_3000_or_more_pct: d(PCT, "Owners whose bill is $3,000 or more, as a share of all owners", "B25102_007 and _014 over _001"),
  owners_reporting_no_property_tax_pct: d(PCT, "Owners who report no real estate taxes paid, as a share of all owners", "B25102_008 and _015 over _001"),
  aggregate_property_tax_usd: d(USD, "Aggregate real estate taxes paid by owner-occupied units", "B25090_001"),
  aggregate_property_tax_pct_of_us: d(PCT, "This place's share of all property tax paid by U.S. owner-occupants", "B25090_001"),
  owner_occupied_units_pct_of_us: d(PCT, "This place's share of all U.S. owner-occupied homes", "B25102_001"),
  median_home_value_usd: d(USD, "Median value of owner-occupied housing units", "B25077_001"),
  median_household_income_usd: d(USD_YR, "Median household income", "B19013_001"),
});

// ---- Self-employment ----------------------------------------------------------------------------------------------------

const SE = selfEmployment.REPORT;

const selfEmploymentDict = build(SE.slug, SE, selfEmployment.CSV_HEADER, "1 = the largest share of workers who are self-employed", {
  employed_workers_16plus: d("workers", "Civilian employed workers 16 and over", "B24080_001"),
  self_employed_workers: d("workers", "Self-employed workers: incorporated plus unincorporated own business", "B24080_005, _010, _015, _020"),
  self_employed_workers_pct_of_workers: d(PCT, "Self-employed workers as a share of all employed workers", "B24080"),
  self_employed_incorporated_workers: d("workers", "Workers self-employed in an own incorporated business", "B24080_005 plus _015"),
  self_employed_unincorporated_workers: d("workers", "Workers self-employed in an own unincorporated business", "B24080_010 plus _020"),
  unincorporated_pct_of_self_employed: d(PCT, "Unincorporated self-employed workers as a share of the self-employed", "B24080"),
  women_self_employed_workers: d("workers", "Women among the self-employed workers", "B24080_015 plus _020"),
  women_pct_of_self_employed: d(PCT, "Women as a share of the self-employed", "B24080"),
  women_pct_of_all_workers: d(PCT, "Women as a share of all employed workers", "B24080_012 over _001"),
  households: d("households", "Households", "B19053_001"),
  households_with_self_employment_income: d("households", "Households with self-employment income", "B19053_002"),
  households_with_self_employment_income_pct: d(PCT, "Households with self-employment income as a share of all households", "B19053"),
  self_employment_income_aggregate_usd: d(USD, "Aggregate self-employment income of households: net of expenses, losses counted as negative amounts", "B19063_001"),
  self_employment_income_mean_per_household_with_it_usd: d(USD_YR, "Mean self-employment income of the households that report it: aggregate divided by households with the income", "B19063_001 over B19053_002"),
  households_with_wage_income: d("households", "Households with wage or salary income", "B19052_002"),
  wage_income_mean_per_household_with_it_usd: d(USD_YR, "Mean wage and salary income of the households that report it", "B19062_001 over B19052_002"),
  self_employment_pct_of_self_employment_plus_wage_income: d(PCT, "Self-employment income as a share of self-employment plus wage and salary income, all households", "B19063_001, B19062_001"),
  se_tax_on_mean_self_employment_income_2026_rules_usd: d(
    USD_YR,
    `Self-employment tax on the mean self-employment income under the ${selfEmployment.SE_TAX_BASIS.taxYear} rules (IRC 1401 and 1402), applied to the income the ACS measured`,
    "Calculated from B19063_001, B19053_002; IRS and SSA rules",
  ),
  median_household_income_usd: d(USD_YR, "Median household income", "B19013_001"),
});

/** Newest report first, the same order as the press page table. */
export const DICTIONARIES: Dictionary[] = [
  propertyTaxDict,
  selfEmploymentDict,
  sixFigureDict,
  mortgageFreeDict,
  retirementDict,
  carDict,
  insuranceDict,
  costBurdenDict,
  rentVsBuyDict,
  mortgageAffordability,
];

export function getDictionary(slug: ReportSlug): Dictionary {
  const found = DICTIONARIES.find((x) => x.slug === slug);
  if (!found) throw new Error(`No data dictionary for ${slug}`);
  return found;
}
