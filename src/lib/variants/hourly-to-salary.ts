import type { CalculatorVariant } from "./types";
import {
  MEDICARE_EMPLOYEE_RATE,
  SOCIAL_SECURITY_EMPLOYEE_RATE,
  STANDARD_DEDUCTIONS,
  TAX_SOURCES,
  federalIncomeTax,
} from "../tax-data";
import {
  OEWS_MEDIAN_HOURLY_MAY_2025,
  STANDARD_PAID_HOURS_PER_YEAR,
  WAGE_BENCHMARK_SOURCES,
  annualFromHourly,
  usd2,
  usdWhole,
} from "../wage-data";

const STD = STANDARD_DEDUCTIONS.single;
const FICA_RATE = SOCIAL_SECURITY_EMPLOYEE_RATE + MEDICARE_EMPLOYEE_RATE;

/** Federal income tax, FICA, and take-home for wage income, single filer, 2026, no state tax. */
function takeHome(gross: number) {
  const taxable = Math.max(0, gross - STD);
  const federal = federalIncomeTax(taxable, "single");
  const fica = gross * FICA_RATE;
  return { taxable, federal, fica, net: gross - federal - fica };
}

const IRS_FULL_TIME = {
  label: "IRS: Identifying full-time employees (30 hours of service a week or 130 hours a month)",
  href: "https://www.irs.gov/affordable-care-act/employers/identifying-full-time-employees",
};

// ---- Part-time: $22 an hour, 20 hours a week, 52 weeks ----
const PT_RATE = 22;
const PT_HOURS = 20;
const PT_WEEKS = 52;
const ptGross = PT_RATE * PT_HOURS * PT_WEEKS;
const ptWeekly = PT_RATE * PT_HOURS;
const ptMonthly = ptGross / 12;
const ptTax = takeHome(ptGross);
const ptFullTimeGross = PT_RATE * STANDARD_PAID_HOURS_PER_YEAR;
const ptFullTimeTax = takeHome(ptFullTimeGross);
const ptPerHourYear = PT_RATE * PT_WEEKS;
const ptThirtyGross = PT_RATE * 30 * PT_WEEKS;
const ptTargetHours = 30000 / PT_RATE / PT_WEEKS;
const ptSixMoreHours = PT_RATE * 6 * PT_WEEKS;
const ptFedRate = ((ptTax.federal / ptGross) * 100).toFixed(2);
const ptBelowMedianPct = ((OEWS_MEDIAN_HOURLY_MAY_2025 - PT_RATE) / OEWS_MEDIAN_HOURLY_MAY_2025) * 100;

// ---- Seasonal: $24 an hour, 40 hours a week, 40 paid weeks ----
const SE_RATE = 24;
const SE_HOURS = 40;
const SE_WEEKS = 40;
const seGross = SE_RATE * SE_HOURS * SE_WEEKS;
const seFullYear = SE_RATE * SE_HOURS * 52;
const seLost = seFullYear - seGross;
const seWeekly = SE_RATE * SE_HOURS;
const seEvenWeekly = seGross / 52;
const seSavePerCheck = (seWeekly * (52 - SE_WEEKS)) / 52;
const seSavePct = ((52 - SE_WEEKS) / 52) * 100;
const seYearRoundRate = seGross / STANDARD_PAID_HOURS_PER_YEAR;
const seTax = takeHome(seGross);
const seMonthlyWhileWorking = (seWeekly * 52) / 12;
const seYearRoundAlt = annualFromHourly(20);
const seMedianFullYear = annualFromHourly(OEWS_MEDIAN_HOURLY_MAY_2025);
const seFedRate = ((seTax.federal / seGross) * 100).toFixed(2);
const seOffsetHours = SE_HOURS * SE_WEEKS;
const ptHoursYear = PT_HOURS * PT_WEEKS;

export const hourlyToSalaryVariants: CalculatorVariant[] = [
  {
    slug: "part-time-20-hours",
    lastUpdated: "2026-11-26",
    title: "Part-Time Hourly to Annual Pay: 20 Hours a Week",
    description: `$${PT_RATE} an hour at ${PT_HOURS} hours a week pays ${usdWhole(ptGross)} a year gross, about ${usdWhole(ptTax.net)} after federal tax and FICA. See the weekly and full-time math.`,
    defaults: {
      hourlyRate: String(PT_RATE),
      hoursPerWeek: String(PT_HOURS),
      weeksPerYear: String(PT_WEEKS),
      ptoWeeks: "0",
      overtimeHours: "0",
      federalTaxRate: ptFedRate,
      stateTaxRate: "0",
      ficaRate: "7.65",
    },
    intro: `At $${PT_RATE} an hour and ${PT_HOURS} hours a week for ${PT_WEEKS} weeks, part-time pay is ${usdWhole(ptGross)} a year before taxes: ${usdWhole(ptWeekly)} a week or ${usdWhole(ptMonthly)} a month. That is exactly half of the ${usdWhole(ptFullTimeGross)} the same rate pays at 40 hours. Take-home falls by slightly less than half, from ${usdWhole(ptFullTimeTax.net)} to ${usdWhole(ptTax.net)} before state tax, because the ${usdWhole(STD)} standard deduction shelters a larger share of a smaller paycheck. The calculator is pre-filled with the ${ptFedRate}% effective federal rate on that pay and no state tax, so its result matches these figures.`,
    tips: [
      `Weekly pay is ${usdWhole(ptWeekly)} before tax, and a month averages 4.33 weeks, which is ${usdWhole(ptMonthly)}. If your hours change from week to week, build the monthly budget on your lowest recent month instead of the average, so a slow month never leaves rent short.`,
      `Federal income tax is the small part. Taxable income is ${usdWhole(ptGross)} minus the ${usdWhole(STD)} standard deduction, or ${usdWhole(ptTax.taxable)}, taxed at 10% for ${usdWhole(ptTax.federal)} (${((ptTax.federal / ptGross) * 100).toFixed(1)}% of gross). Payroll tax at 7.65% applies from the first dollar and comes to ${usdWhole(ptTax.fica)}, more than twice the income tax at this level.`,
      `Reaching $30,000 a year at $${PT_RATE} an hour takes about ${ptTargetHours.toFixed(1)} hours a week (30,000 ÷ ${PT_RATE} ÷ ${PT_WEEKS}). Six more hours a week, from ${PT_HOURS} to ${PT_HOURS + 6}, adds ${usdWhole(ptSixMoreHours)} a year, and each single extra weekly hour is worth ${usdWhole(ptPerHourYear)}.`,
      `Thirty hours is a benefits line. The IRS treats an employee as full-time for the Affordable Care Act employer coverage rules at an average of 30 hours of service a week (130 hours a month). At $${PT_RATE} that schedule pays ${usdWhole(ptThirtyGross)} a year, ${usdWhole(ptThirtyGross - ptGross)} more than 20 hours, and may qualify you for employer health coverage, so value the extra 10 hours beyond the paycheck.`,
      `For context, the national median hourly wage for all occupations was ${usd2(OEWS_MEDIAN_HOURLY_MAY_2025)} in May 2025 (BLS OEWS), so $${PT_RATE} is about ${ptBelowMedianPct.toFixed(0)}% below the median. At that median rate, 20 hours a week would pay ${usdWhole(OEWS_MEDIAN_HOURLY_MAY_2025 * ptHoursYear)} a year.`,
    ],
    keyResults: [
      { label: `Annual gross (${PT_HOURS} h × ${PT_WEEKS} wk)`, value: usdWhole(ptGross) },
      { label: "Weekly / monthly gross", value: `${usdWhole(ptWeekly)} / ${usdWhole(ptMonthly)}` },
      { label: "Federal income tax (2026, single)", value: `${usdWhole(ptTax.federal)} (${((ptTax.federal / ptGross) * 100).toFixed(1)}%)` },
      { label: "Payroll tax (FICA, 7.65%)", value: usdWhole(ptTax.fica) },
      { label: "Take-home before state tax", value: usdWhole(ptTax.net) },
      { label: "Same rate at 40 hours (gross)", value: usdWhole(ptFullTimeGross) },
    ],
    comparisonNote: `Doubling hours to 40 doubles gross pay to ${usdWhole(ptFullTimeGross)}, while take-home rises from ${usdWhole(ptTax.net)} to ${usdWhole(ptFullTimeTax.net)}, a gain of ${usdWhole(ptFullTimeTax.net - ptTax.net)}, because the second 20 hours is taxed at the 12% bracket as well as 7.65% payroll tax. A middle schedule of 30 hours reaches ${usdWhole(ptThirtyGross)} gross and crosses the 30-hour full-time line, and 25 hours pays ${usdWhole(PT_RATE * 25 * PT_WEEKS)}. Compare these totals on the main hourly to salary calculator before deciding how many hours to take.`,
    faq: [
      {
        q: `How much is $${PT_RATE} an hour part-time per year?`,
        a: `At ${PT_HOURS} hours a week for ${PT_WEEKS} weeks, $${PT_RATE} an hour is ${usdWhole(ptGross)} before taxes. With two unpaid weeks it is ${usdWhole(PT_RATE * PT_HOURS * 50)} (${PT_RATE} × ${PT_HOURS} × 50). Each extra hour a week adds ${usdWhole(ptPerHourYear)} a year.`,
      },
      {
        q: "Do I owe federal income tax on part-time pay?",
        a: `Only on income above the standard deduction. A single filer's 2026 standard deduction is ${usdWhole(STD)}, so wages up to that amount owe no federal income tax. At ${usdWhole(ptGross)} the taxable part is ${usdWhole(ptTax.taxable)} and the tax is ${usdWhole(ptTax.federal)}. FICA payroll tax still applies from the first dollar, and state rules vary.`,
      },
      {
        q: "How many hours a week is full-time?",
        a: "There is no single pay-related definition; employers set their own. For Affordable Care Act employer rules, the IRS counts an employee as full-time at an average of 30 hours of service a week or 130 hours a month. Many employers use 32 or 40 hours for benefits, so ask HR which threshold your plan uses.",
      },
      {
        q: "What if I work two part-time jobs?",
        a: "Add the annual pay from both jobs to get your total income, then compare it with the standard deduction. Each employer withholds as if its paycheck were your only income, so two jobs can leave you under-withheld. Use the IRS Tax Withholding Estimator or step 2 of Form W-4 to correct it.",
      },
    ],
    sources: [TAX_SOURCES.revProc, TAX_SOURCES.federalRates, IRS_FULL_TIME, WAGE_BENCHMARK_SOURCES.blsOewsMay2025],
    sourcesChecked: "November 2026",
    sourcesNote:
      "Federal tax is for a single filer with wage income only, using the 2026 standard deduction and brackets. State and local taxes are not included.",
  },
  {
    slug: "seasonal-40-weeks",
    lastUpdated: "2026-11-26",
    title: "Hourly Pay for 40 Weeks a Year: $24 an Hour",
    description: `$${SE_RATE} an hour for ${SE_WEEKS} weeks pays ${usdWhole(seGross)}, not the ${usdWhole(seFullYear)} a 52-week year suggests. See the true annual pay and a monthly budget.`,
    defaults: {
      hourlyRate: String(SE_RATE),
      hoursPerWeek: String(SE_HOURS),
      weeksPerYear: String(SE_WEEKS),
      ptoWeeks: "0",
      overtimeHours: "0",
      federalTaxRate: seFedRate,
      stateTaxRate: "0",
      ficaRate: "7.65",
    },
    intro: `Seasonal and school-year jobs pay only for the weeks you work. At $${SE_RATE} an hour, ${SE_HOURS} hours a week, and ${SE_WEEKS} paid weeks, annual pay is ${usdWhole(seGross)}, which is ${usdWhole(seLost)} (${((seLost / seFullYear) * 100).toFixed(0)}%) less than the ${usdWhole(seFullYear)} you get by multiplying by 52 weeks. The same ${usdWhole(seGross)} equals ${usd2(seYearRoundRate)} an hour spread over a full year, so judging this job by its headline rate overstates it by ${usd2(SE_RATE - seYearRoundRate)} an hour.`,
    tips: [
      `To live on an even ${usd2(seEvenWeekly)} a week all year, save ${usd2(seSavePerCheck)} (${seSavePct.toFixed(0)}%) of each ${usdWhole(seWeekly)} working paycheck. That is the ${52 - SE_WEEKS} off weeks divided by 52. While you work, ${usdWhole(seWeekly)} a week looks like ${usdWhole(seMonthlyWhileWorking)} a month, which makes it easy to overspend.`,
      `Federal tax is figured on the year, not the week. Taxable income is ${usdWhole(seGross)} minus the ${usdWhole(STD)} standard deduction, or ${usdWhole(seTax.taxable)}, taxed at ${usdWhole(seTax.federal)}, plus ${usdWhole(seTax.fica)} of FICA. Take-home is about ${usdWhole(seTax.net)} before state tax. Employers usually withhold as if you earn ${usdWhole(seWeekly)} every week of the year, so you may be over-withheld and get a refund when you file.`,
      `Ask whether your employer can pay the same annual total across 12 months. Some school-year and seasonal employers offer that, and it removes the budgeting problem. If not, treat unemployment benefits between seasons as uncertain income, because eligibility depends on your state and employer.`,
      `Compare offers on a full-year basis. $${SE_RATE} for ${SE_WEEKS} weeks equals ${usd2(seYearRoundRate)} year-round. A year-round job at $20 an hour and 40 hours pays ${usdWhole(seYearRoundAlt)}, which is ${usdWhole(seYearRoundAlt - seGross)} more than this seasonal job despite the lower headline rate.`,
      `The national median hourly wage for all occupations was ${usd2(OEWS_MEDIAN_HOURLY_MAY_2025)} in May 2025 (BLS OEWS), so $${SE_RATE} sits near the median. A full year at the median pays ${usdWhole(seMedianFullYear)}, against ${usdWhole(seGross)} here, so the shorter calendar, not the rate, drives the gap.`,
    ],
    keyResults: [
      { label: `Annual gross ($${SE_RATE} × ${SE_HOURS} h × ${SE_WEEKS} wk)`, value: usdWhole(seGross) },
      { label: "Same rate for 52 weeks", value: usdWhole(seFullYear) },
      { label: `Pay lost to the ${52 - SE_WEEKS} off weeks`, value: usdWhole(seLost) },
      { label: "Equivalent year-round hourly rate", value: usd2(seYearRoundRate) },
      { label: "Weekly gross while working", value: usdWhole(seWeekly) },
      { label: "Take-home before state tax", value: usdWhole(seTax.net) },
    ],
    comparisonNote: `The main hourly to salary calculator assumes 52 paid weeks, so this scenario cuts annual pay by ${((seLost / seFullYear) * 100).toFixed(0)}%. Seasonal and part-time work both shrink annual pay but through different levers: fewer weeks per year here, fewer hours per week in the 20-hour scenario. Forty hours for ${SE_WEEKS} weeks (${usdWhole(seOffsetHours)} hours) at $${SE_RATE} pays ${usdWhole(seGross)}, while 20 hours for 52 weeks (${usdWhole(ptHoursYear)} hours) at $${PT_RATE} pays ${usdWhole(ptGross)}. Compare total hours first and hourly rate second.`,
    faq: [
      {
        q: `How much is $${SE_RATE} an hour for ${SE_WEEKS} weeks?`,
        a: `At ${SE_HOURS} hours a week, $${SE_RATE} an hour pays ${usdWhole(seWeekly)} a week, so ${SE_WEEKS} weeks is ${usdWhole(seGross)} gross for ${usdWhole(seOffsetHours)} hours of work. A full 52 weeks at the same pay would be ${usdWhole(seFullYear)}, which is ${usdWhole(seLost)} more.`,
      },
      {
        q: "How do I budget if I am paid only 40 weeks a year?",
        a: `Divide annual pay by 52, not by the weeks you work. ${usdWhole(seGross)} ÷ 52 is ${usd2(seEvenWeekly)} a week, so you need to save ${usd2(seSavePerCheck)} of each ${usdWhole(seWeekly)} paycheck, about ${seSavePct.toFixed(0)}%, to cover the ${52 - SE_WEEKS} unpaid weeks. Put that money in a separate savings account so it is not spent in working weeks.`,
      },
      {
        q: `What hourly rate does ${SE_WEEKS} weeks at $${SE_RATE} equal for a full year?`,
        a: `Divide annual pay by ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} paid hours: ${usdWhole(seGross)} ÷ ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString("en-US")} is ${usd2(seYearRoundRate)} an hour. That is the number to compare against a year-round job, which pays for all 52 weeks.`,
      },
      {
        q: "Will I get a tax refund if I work only part of the year?",
        a: `Often, yes. Payroll withholding annualizes each paycheck as if you were paid all 52 weeks: ${usdWhole(seWeekly)} a week annualizes to ${usdWhole(seFullYear)}, but you earn ${usdWhole(seGross)}. The extra withholding comes back as a refund at filing. It is likely but not guaranteed, because other income and credits change the result.`,
      },
    ],
    sources: [TAX_SOURCES.revProc, TAX_SOURCES.federalRates, WAGE_BENCHMARK_SOURCES.blsOewsMay2025],
    sourcesChecked: "November 2026",
    sourcesNote: `Federal tax is for a single filer with wage income only, using the 2026 standard deduction and brackets. State and local taxes are not included. The calculator is pre-filled with the ${seFedRate}% effective federal rate and no state tax, so its result matches the take-home figure above.`,
  },
];
