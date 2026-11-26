import type { CalculatorVariant } from "./types";
import {
  FLSA_EXEMPT_MIN_ANNUAL,
  FLSA_EXEMPT_MIN_WEEKLY,
  STANDARD_PAID_HOURS_PER_YEAR,
  WAGE_BENCHMARK_SOURCES,
  hourlyFromAnnual,
  usd2,
  usdWhole,
} from "../wage-data";

const SALARY = 75000;
const WEEKS = 52;
const PTO_DAYS = 25; // calculator default: 10 paid holidays + 15 vacation days
const HOURS = 50;

const hoursYear = (hpw: number) => hpw * WEEKS;
const rate = (hpw: number) => SALARY / hoursYear(hpw);

const rate40 = hourlyFromAnnual(SALARY);
const rate50 = rate(HOURS);
const ptoHours = PTO_DAYS * (HOURS / 5);
const effective50 = SALARY / (hoursYear(HOURS) - ptoHours);
const dropPct = ((rate40 - rate50) / rate40) * 100;
const extraHoursYear = (HOURS - 40) * WEEKS;
const salaryToHold50 = rate40 * hoursYear(HOURS);
const salaryToHold45 = rate40 * hoursYear(45);
const otWeekly = rate40 * 1.5 * (HOURS - 40);
const otYear = otWeekly * WEEKS;
const taxKeep = SALARY * (1 - 0.22);
// An hourly job paying the same effective rate as the salary at 50 hours, with the 10 extra hours paid at time-and-a-half.
const hourlyEquivalentYear = (rate50 * 40 + rate50 * 1.5 * (HOURS - 40)) * WEEKS;

export const salaryToHourlyVariants: CalculatorVariant[] = [
  {
    slug: "50-hour-work-week",
    lastUpdated: "2026-11-26",
    title: "Salary to Hourly at 50 Hours a Week: $75,000",
    description: `A $75,000 salary pays ${usd2(rate40)} an hour at 40 hours but only ${usd2(rate50)} at 50 hours, a ${dropPct.toFixed(0)}% cut. See the real rate and the raise needed.`,
    defaults: {
      annualSalary: String(SALARY),
      hoursPerWeek: String(HOURS),
      weeksPerYear: String(WEEKS),
      paidHolidays: "10",
      vacationDays: "15",
      effectiveTaxRate: "22",
    },
    intro: `A $75,000 salary is ${usd2(rate40)} an hour only if you work 40 hours a week. At ${HOURS} hours a week for ${WEEKS} weeks you work ${hoursYear(HOURS).toLocaleString("en-US")} hours, and the same pay is ${usd2(rate50)} an hour, a ${dropPct.toFixed(0)}% drop. After subtracting ${PTO_DAYS} paid days off at ${HOURS / 5} hours each (${ptoHours} hours), the effective rate for hours actually worked is ${usd2(effective50)}. Most salaried professionals are exempt from overtime, so those 10 extra hours a week, ${extraHoursYear} hours a year, are unpaid.`,
    tips: [
      `Every extra hour lowers the rate. $75,000 is ${usd2(rate40)} an hour at 40 hours, ${usd2(rate(45))} at 45, ${usd2(rate50)} at 50, ${usd2(rate(55))} at 55, and ${usd2(rate(60))} at 60. Each additional five hours trims roughly $3 to $4 off the hourly rate, so the longest weeks cost the most.`,
      `To keep ${usd2(rate40)} an hour at ${HOURS} hours a week, the salary has to be ${usdWhole(salaryToHold50)}, a ${usdWhole(salaryToHold50 - SALARY)} raise (${(((salaryToHold50 - SALARY) / SALARY) * 100).toFixed(0)}%). Use that as the number to anchor a negotiation: it is the price of the extra ${extraHoursYear} hours. At 45 hours the matching salary is ${usdWhole(salaryToHold45)}, a ${(((salaryToHold45 - SALARY) / SALARY) * 100).toFixed(1)}% raise.`,
      `Overtime status decides what the hours are worth. If the same job were overtime-eligible at ${usd2(rate40)} an hour, ten hours a week at time-and-a-half would pay ${usd2(otWeekly)} a week, or ${usdWhole(otYear)} a year. Exempt salaried roles do not receive that, which is why exemption status matters more than the headline salary.`,
      `A salary alone does not make a role exempt. The federal white-collar exemption requires at least ${usdWhole(FLSA_EXEMPT_MIN_WEEKLY)} a week (${usdWhole(FLSA_EXEMPT_MIN_ANNUAL)} a year) plus a qualifying duties test, and some states set a higher pay floor. A $75,000 salary clears the federal pay test, but a non-exempt employee on salary is still owed overtime for hours over 40.`,
      `After tax, the picture is the same. At the calculator's 22% effective rate, $75,000 keeps ${usdWhole(taxKeep)}, which is ${usd2(taxKeep / hoursYear(HOURS))} an hour at ${HOURS} hours against ${usd2(taxKeep / STANDARD_PAID_HOURS_PER_YEAR)} at 40 hours. The extra hours change your hourly take-home rate by about ${usd2(taxKeep / STANDARD_PAID_HOURS_PER_YEAR - taxKeep / hoursYear(HOURS))} per hour.`,
    ],
    keyResults: [
      { label: "Hourly at 40 hours a week", value: usd2(rate40) },
      { label: `Hourly at ${HOURS} hours a week`, value: usd2(rate50) },
      { label: `Effective hourly after ${PTO_DAYS} paid days off`, value: usd2(effective50) },
      { label: "Hourly at 60 hours a week", value: usd2(rate(60)) },
      { label: `Salary to keep ${usd2(rate40)} at ${HOURS} hours`, value: usdWhole(salaryToHold50) },
      { label: "Value of 10 overtime hours at 1.5x (non-exempt)", value: `${usdWhole(otYear)} a year` },
    ],
    comparisonNote: `The main salary to hourly calculator assumes a 40-hour week and returns ${usd2(rate40)} for $75,000. This scenario shows how far that number moves when the week grows: 45 hours gives ${usd2(rate(45))} and 60 hours gives ${usd2(rate(60))}. Compare the real rate with hourly offers that pay overtime: an hourly job at ${usd2(rate50)} with 10 weekly overtime hours at time-and-a-half would pay about ${usdWhole(hourlyEquivalentYear)} a year, ${usdWhole(hourlyEquivalentYear - SALARY)} more than the salary for the same hours.`,
    faq: [
      {
        q: `What is $75,000 a year per hour at ${HOURS} hours a week?`,
        a: `Divide the salary by hours worked in the year: $75,000 ÷ (${HOURS} × ${WEEKS}) = ${usd2(rate50)} an hour. At 40 hours the same salary is ${usd2(rate40)}, so the longer week lowers the hourly rate by ${usd2(rate40 - rate50)}.`,
      },
      {
        q: `Can an employer require ${HOURS}-hour weeks on a salary without paying overtime?`,
        a: `Only if the job is legally exempt. Federal law requires exempt employees to earn at least ${usdWhole(FLSA_EXEMPT_MIN_WEEKLY)} a week and perform exempt duties; some states set higher thresholds. A salaried employee who does not meet both tests is owed overtime at 1.5 times the regular rate for hours over 40. Check the Department of Labor or your state labor office if you are unsure.`,
      },
      {
        q: `How many unpaid hours is a ${HOURS}-hour week over a year?`,
        a: `Ten extra hours a week for ${WEEKS} weeks is ${extraHoursYear} hours, the equivalent of ${extraHoursYear / 40} extra 40-hour weeks. At ${usd2(rate40)} an hour, those hours are worth ${usdWhole(extraHoursYear * rate40)}, or ${usdWhole(otYear)} if they were paid at time-and-a-half.`,
      },
      {
        q: `How much of a raise offsets a ${HOURS}-hour week?`,
        a: `To match the ${usd2(rate40)} hourly rate you earn at 40 hours, a ${HOURS}-hour week needs ${usdWhole(salaryToHold50)}, a ${(((salaryToHold50 - SALARY) / SALARY) * 100).toFixed(0)}% raise. At 45 hours the figure is ${usdWhole(salaryToHold45)}. Both numbers assume the same ${WEEKS} paid weeks.`,
      },
    ],
    sources: [WAGE_BENCHMARK_SOURCES.dolExempt],
    sourcesChecked: "November 2026",
    sourcesNote:
      "Exemption thresholds shown are the federal level currently in effect; several states set higher salary tests. Hourly figures divide salary by hours worked in a 52-week year.",
  },
];
