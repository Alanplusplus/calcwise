import type { Metadata } from "next";
import { AuthorByline } from "@/components/AuthorByline";
import Image from "next/image";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Sources } from "@/components/Sources";
import { COMMUTE_ASSUMPTIONS as A, JOB_HOURS, breakEvenSalary, breakEvenWeight, commuteYear } from "@/lib/commute-cost";
import { REPORT_SOURCES as CAR_SOURCES } from "@/lib/reports/car-ownership-by-state";
import {
  REPORT as COMMUTE_REPORT,
  REPORT_SOURCES as COMMUTE_SOURCES,
  STATE_RESULTS as COMMUTE_STATES,
  US_RESULT as COMMUTE_US,
  commuteHoursPerYear,
  payDropPct,
} from "@/lib/reports/commute-time-by-state";
import { site } from "@/lib/site";
import { TAX_DATA, TAX_SOURCES } from "@/lib/tax-data";
import { usd2, usdWhole } from "@/lib/wage-data";

const slug = "is-a-long-commute-worth-it";
const h1 = "Is a Long Commute Worth It? The Raise You Need for Each Extra Minute of Drive";
const metadataTitle = "Is a Long Commute Worth It? The Raise You Need (2026)";
const datePublished = "2026-11-28";
const dateModified = "2026-11-28";

const NEAR_SALARY = 78_000;
const NEAR_MINUTES = 22;
const FAR_SALARY = 92_000;
const FAR_MINUTES = 58;
/** Commute-hour weights shown in the sensitivity table. */
const WEIGHTS = [1, 0.75, 0.5, 0.25, 0] as const;
/** Office days a week shown in the hybrid table. */
const OFFICE_WEEK_DAYS = [5, 4, 3, 2, 1] as const;
/** One-way minutes shown in the raise table. */
const RAISE_MINUTES = [NEAR_MINUTES, 30, 45, FAR_MINUTES, 75, 90] as const;

const daysPerWeek = 5;
const nearOp = commuteYear({ salary: NEAR_SALARY, oneWayMinutes: NEAR_MINUTES });
const farOp = commuteYear({ salary: FAR_SALARY, oneWayMinutes: FAR_MINUTES });
const nearAll = commuteYear({ salary: NEAR_SALARY, oneWayMinutes: NEAR_MINUTES, centsPerMile: A.allInCentsPerMile });
const farAll = commuteYear({ salary: FAR_SALARY, oneWayMinutes: FAR_MINUTES, centsPerMile: A.allInCentsPerMile });

const raise = FAR_SALARY - NEAR_SALARY;
const raisePct = (raise / NEAR_SALARY) * 100;
const beOp = breakEvenSalary(nearOp.realPerHour, { oneWayMinutes: FAR_MINUTES });
const beAll = breakEvenSalary(nearAll.realPerHour, { oneWayMinutes: FAR_MINUTES, centsPerMile: A.allInCentsPerMile });
const shortfallOp = beOp - FAR_SALARY;
const shortfallAll = beAll - FAR_SALARY;
const takeHomeGain = farOp.takeHome - nearOp.takeHome;
const carCostGain = farOp.carCost - nearOp.carCost;
const hoursGain = farOp.commuteHours - nearOp.commuteHours;
const cashGain = farOp.cash - nearOp.cash;
const cashPerExtraHour = cashGain / hoursGain;
const paycheckLiftPct = (farOp.takeHomePerJobHour / nearOp.takeHomePerJobHour - 1) * 100;
const realGapPct = (1 - farOp.realPerHour / nearOp.realPerHour) * 100;
const keepRate = (commuteYear({ salary: FAR_SALARY + 1_000, oneWayMinutes: FAR_MINUTES }).takeHome - farOp.takeHome) / 1_000;
const marginalRatePct = (1 - keepRate) * 100;
const raisePerThousand = 1_000 / keepRate;
const weightBreakEven = breakEvenWeight(nearOp, farOp);
const hoursPerMinute = (2 * A.jobDays) / 60;
const hoursPerWeekday = farOp.commuteHours / daysPerWeek;
const carCostPerWeekday = farOp.carCost / daysPerWeek;
const extraMinutes = FAR_MINUTES - NEAR_MINUTES;
const carCostPerMinute = (hoursPerMinute * 60 * (A.mph / 60) * A.operatingCentsPerMile) / 100;
const TRANSIT_PASS_PER_MONTH = 150;

const nearHybridTarget = nearOp.realPerHour;
const nearHybridTargetAll = nearAll.realPerHour;
const hybridRows = OFFICE_WEEK_DAYS.map((d) => {
  const officeDays = (A.jobDays / daysPerWeek) * d;
  const op = commuteYear({ salary: FAR_SALARY, oneWayMinutes: FAR_MINUTES, officeDays });
  const all = commuteYear({ salary: FAR_SALARY, oneWayMinutes: FAR_MINUTES, officeDays, centsPerMile: A.allInCentsPerMile });
  const match = breakEvenSalary(nearHybridTarget, { oneWayMinutes: FAR_MINUTES, officeDays });
  return { d, officeDays, op, all, match, winsOp: op.realPerHour > nearHybridTarget, winsAll: all.realPerHour > nearHybridTargetAll };
});
const maxDaysWinOp = Math.max(...hybridRows.filter((r) => r.winsOp).map((r) => r.d));
const maxDaysWinAll = Math.max(...hybridRows.filter((r) => r.winsAll).map((r) => r.d));
const rowAtDays = (d: number) => hybridRows.find((r) => r.d === d)!;

const weightRows = WEIGHTS.map((w) => {
  const near = commuteYear({ salary: NEAR_SALARY, oneWayMinutes: NEAR_MINUTES, timeWeight: w });
  const far = commuteYear({ salary: FAR_SALARY, oneWayMinutes: FAR_MINUTES, timeWeight: w });
  return { w, near, far, farWins: far.realPerHour > near.realPerHour };
});
const halfWeight = weightRows.find((r) => r.w === 0.5)!;

const raiseRows = RAISE_MINUTES.map((m) => {
  const op = commuteYear({ salary: NEAR_SALARY, oneWayMinutes: m });
  const all = commuteYear({ salary: NEAR_SALARY, oneWayMinutes: m, centsPerMile: A.allInCentsPerMile });
  const needOp = breakEvenSalary(nearOp.realPerHour, { oneWayMinutes: m }) - NEAR_SALARY;
  const needAll = breakEvenSalary(nearAll.realPerHour, { oneWayMinutes: m, centsPerMile: A.allInCentsPerMile }) - NEAR_SALARY;
  const extra = m - NEAR_MINUTES;
  return { m, op, all, needOp, needAll, perMinOp: extra > 0 ? needOp / extra : 0, perMinAll: extra > 0 ? needAll / extra : 0 };
});
const raiseAtFar = raiseRows.find((r) => r.m === FAR_MINUTES)!;
const perMinOp = raiseAtFar.perMinOp;
const perMinAll = raiseAtFar.perMinAll;
const longerRows = raiseRows.filter((r) => r.m > NEAR_MINUTES);
const perMinOpSpread = Math.max(...longerRows.map((r) => r.perMinOp)) / Math.min(...longerRows.map((r) => r.perMinOp));
const perMinAllSpread = Math.max(...longerRows.map((r) => r.perMinAll)) / Math.min(...longerRows.map((r) => r.perMinAll));

const usMean = COMMUTE_US.meanMin.value;
const usHours = COMMUTE_US.hoursYear.value;
const usDrop = COMMUTE_US.payDrop.pct;
const longest = COMMUTE_STATES[0];
const shortest = COMMUTE_STATES[COMMUTE_STATES.length - 1];
const usOver45 = COMMUTE_US.long45.pct;
const usPool = COMMUTE_US.poolShare.pct;
const usTransit = COMMUTE_US.transitShare.pct;
const usWfh = COMMUTE_US.wfhShare.pct;
const weeksOfWork = usHours / 40;
const poolSaving = farOp.carCost / 2;
const poolRaiseEquivalent = poolSaving / keepRate;
const weekdaySalaryEquivalent = carCostPerWeekday / keepRate;
const nearFarGapAtFive = nearOp.realPerHour - farOp.realPerHour;
const fourDayLift = rowAtDays(4).op.realPerHour - rowAtDays(5).op.realPerHour;
const fourDayEdge = rowAtDays(4).op.realPerHour - nearOp.realPerHour;

const compareRows = [
  { label: "Shortest-commute state", sub: shortest.name, minutes: shortest.meanMin.value },
  { label: "U.S. average", sub: "ACS 2025", minutes: usMean },
  { label: "Longest-commute state", sub: longest.name, minutes: longest.meanMin.value },
  { label: "Daniel's nearby job", sub: "11 miles", minutes: NEAR_MINUTES },
  { label: "Daniel's far job", sub: "29 miles", minutes: FAR_MINUTES },
].map((r) => {
  const hours = commuteHoursPerYear(r.minutes);
  return { ...r, hours, drop: payDropPct(hours) };
});

// Build-time guards: the prose below states these relationships, so fail the build if the data stops supporting them.
if (
  shortest.name === longest.name ||
  !(farOp.realPerHour < nearOp.realPerHour) ||
  !(farAll.realPerHour < nearAll.realPerHour) ||
  !(farOp.takeHomePerJobHour > nearOp.takeHomePerJobHour) ||
  !(weightBreakEven > 0.5 && weightBreakEven < 1) ||
  !(halfWeight.farWins && weightRows[0].farWins === false) ||
  !(maxDaysWinOp === 4 && maxDaysWinAll === 3) ||
  !(rowAtDays(5).winsOp === false) ||
  !(perMinOpSpread < 1.02 && perMinAllSpread < 1.02) ||
  !(shortfallOp > 0 && shortfallOp < raise) ||
  longest.name !== "Maryland" ||
  Math.abs(marginalRatePct - 29.65) > 0.01 ||
  !(poolRaiseEquivalent > shortfallOp) ||
  !(payDropPct(farOp.commuteHours) / usDrop > 1.7 && payDropPct(farOp.commuteHours) / usDrop < 2.05) ||
  COMMUTE_REPORT.commuteDays !== A.jobDays
) {
  throw new Error("is-a-long-commute-worth-it: model output no longer matches the claims made in the guide text");
}

const description = `Is a long commute worth it? A ${usdWhole(raise)} raise for a ${FAR_MINUTES}-minute drive leaves ${usd2(farOp.realPerHour)} an hour against ${usd2(nearOp.realPerHour)}. See the break-even raise.`;

export const metadata: Metadata = {
  title: metadataTitle,
  description,
  keywords: [
    "is a long commute worth it",
    "how much is a commute worth",
    "cost of commuting",
    "long commute raise calculator",
    "commute time vs salary",
    "real hourly pay after commute",
  ],
  openGraph: {
    title: `${metadataTitle} | ${site.name}`,
    description,
    type: "article",
    publishedTime: datePublished,
    modifiedTime: dateModified,
  },
};

const faqs = [
  {
    question: "Is a long commute worth it?",
    answer: `It is worth it when the raise is bigger than the break-even raise for the extra minutes. In this guide's model a ${usdWhole(NEAR_SALARY)} job ${NEAR_MINUTES} minutes from home needs a ${usdWhole(beOp)} salary to be matched by a job ${FAR_MINUTES} minutes away, a raise of ${usdWhole(raiseAtFar.needOp)} for ${extraMinutes} extra minutes each way. An offer of ${usdWhole(FAR_SALARY)} falls ${usdWhole(shortfallOp)} short at AAA's ${A.operatingCentsPerMile.toFixed(1)} cents a mile and ${usdWhole(shortfallAll)} short at the IRS rate of ${A.allInCentsPerMile} cents. It becomes worth it if you can stay home one day a week, or if you count each commute hour as less than ${(weightBreakEven * 100).toFixed(0)}% of a working hour.`,
  },
  {
    question: "How much of a raise do I need to justify a longer commute?",
    answer: `At a ${usdWhole(NEAR_SALARY)} salary, each extra minute each way needs about ${usdWhole(perMinOp)} of extra salary a year at the AAA operating cost, and about ${usdWhole(perMinAll)} at the IRS all-in rate. That works out to ${((perMinOp / NEAR_SALARY) * 100).toFixed(2)}% of salary per minute at the AAA cost. The reason is the ${hoursPerMinute.toFixed(1)} hours a year that every one-way minute adds at ${A.jobDays} office days, plus ${usdWhole(carCostPerMinute)} a year of car cost per minute, all paid for out of a raise that tax shrinks by ${marginalRatePct.toFixed(2)}%.`,
  },
  {
    question: "How many hours a year does the average commute take?",
    answer: `The average U.S. commuter spends ${usHours.toFixed(0)} hours a year traveling to and from work, which is ${weeksOfWork.toFixed(1)} forty-hour weeks. That figure comes from the Census Bureau's ${COMMUTE_REPORT.acsYear} mean one-way travel time of ${usMean.toFixed(1)} minutes, doubled and multiplied by ${A.jobDays} commuting days. By state it runs from ${shortest.hoursYear.value.toFixed(0)} hours in ${shortest.name} to ${longest.hoursYear.value.toFixed(0)} hours in ${longest.name}. Your own number is minutes × 2 × office days ÷ 60. The state-by-state table is in our commute time by state report.`,
  },
  {
    question: "Should commute time count as work time?",
    answer: `This guide counts it fully, because that is the strictest test: a commute hour costs you as much as a working hour. Most people value it somewhere below that, especially on a train where they can read or work. The weight matters. In the case study the shorter commute wins when each commute hour counts for ${(weightBreakEven * 100).toFixed(0)}% or more of a working hour, and the ${usdWhole(FAR_SALARY)} job wins below that. At a weight of 50% the far job leaves ${usd2(halfWeight.far.realPerHour)} an hour against ${usd2(halfWeight.near.realPerHour)}. If you would rather be at home than anywhere else, use a weight near 100%; if you listen to audiobooks and like the drive, use less.`,
  },
  {
    question: "What cost per mile should I use for my commute?",
    answer: `Use AAA's fuel and maintenance cost, ${A.operatingCentsPerMile.toFixed(1)} cents a mile in 2026, if the car is already paid for and a longer commute only adds fuel, tires, and servicing. Use the IRS business rate, ${A.allInCentsPerMile} cents a mile from July 1, 2026, as an all-in yardstick if the extra miles will bring a replacement car, higher insurance, or more depreciation forward. Commuting miles themselves are not tax-deductible for employees. The two rates move the far job's annual car cost from ${usdWhole(farOp.carCost)} to ${usdWhole(farAll.carCost)} over ${farOp.miles.toLocaleString("en-US")} miles.`,
  },
  {
    question: "Does working from home even one day a week change the math?",
    answer: `A lot. Each weekday at home removes ${hoursPerWeekday.toFixed(0)} commute hours and ${usdWhole(carCostPerWeekday)} of car cost a year on the ${FAR_MINUTES}-minute commute. With four office days the ${usdWhole(FAR_SALARY)} job leaves ${usd2(rowAtDays(4).op.realPerHour)} an hour against ${usd2(nearOp.realPerHour)} for the nearby job, and the salary that would just match it drops from ${usdWhole(beOp)} to ${usdWhole(rowAtDays(4).match)}. At three office days it leaves ${usd2(rowAtDays(3).op.realPerHour)}. Ask for the remote days in writing before you accept an offer that depends on them.`,
  },
];

const tdClass = "px-4 py-3 text-ink-800";
const tdRight = "px-4 py-3 text-right text-ink-800";
const thClass = "px-4 py-3 text-left font-semibold text-ink-700";
const thRight = "px-4 py-3 text-right font-semibold text-ink-700";
const linkClass = "text-brand-600 hover:text-brand-800 font-medium";
const pct0 = (w: number) => `${Math.round(w * 100)}%`;

export default function IsALongCommuteWorthItGuide() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={slug}
        datePublished={datePublished}
        dateModified={dateModified}
        image="/images/guides/is-a-long-commute-worth-it.webp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Guides", href: "/guides" },
          { name: "Is a Long Commute Worth It?", href: `/guides/${slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header>
          <p className="text-sm font-medium text-brand-600">
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>{" "}
            / Pay & Career
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{h1}</h1>
          <p className="mt-4 text-lg text-ink-600">
            {`Daniel earns ${usdWhole(NEAR_SALARY)} at a job ${NEAR_MINUTES} minutes from home, and a company ${FAR_MINUTES} minutes away offers ${usdWhole(FAR_SALARY)}. That is a ${usdWhole(raise)} raise, ${raisePct.toFixed(1)}% more, and on a paycheck basis his pay per working hour rises ${paycheckLiftPct.toFixed(1)}%. Once the extra ${hoursGain.toFixed(0)} hours a year on the road and ${usdWhole(carCostGain)} of extra fuel and maintenance are counted, his take-home pay per hour goes from ${usd2(nearOp.realPerHour)} to ${usd2(farOp.realPerHour)}: slightly lower. So is a long commute worth it? Only if the raise clears a break-even that most people never calculate. This guide shows how to calculate it with 2026 federal tax rules, AAA and IRS mileage costs, and Census commute data, then works through Daniel's decision and what changes it.`}
          </p>
          <p className="mt-2 text-sm text-ink-500">Last updated: November 2026</p>
          <AuthorByline />
        </header>

        <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50 p-4 my-6">
          <p className="font-semibold text-ink-800">TL;DR</p>
          <p className="mt-1 text-ink-700">
            {`A commute costs hours first and money second. Every one-way minute is ${hoursPerMinute.toFixed(1)} hours a year at ${A.jobDays} office days, and every minute costs about ${usdWhole(carCostPerMinute)} a year in fuel and maintenance. To stay even at a ${usdWhole(NEAR_SALARY)} salary, each extra minute each way needs roughly ${usdWhole(perMinOp)} of extra salary. Daniel's ${FAR_MINUTES}-minute job would need ${usdWhole(beOp)}, so the ${usdWhole(FAR_SALARY)} offer falls ${usdWhole(shortfallOp)} short. It wins if he works from home one day a week (${usd2(rowAtDays(4).op.realPerHour)} an hour against ${usd2(nearOp.realPerHour)}) or if he values a commute hour at less than ${pct0(weightBreakEven)} of a working hour.`}
          </p>
        </div>

        <figure className="mt-10">
          <Image
            src="/images/guides/is-a-long-commute-worth-it.webp"
            alt={`Infographic comparing a ${usdWhole(NEAR_SALARY)} job with a ${NEAR_MINUTES}-minute commute and a ${usdWhole(FAR_SALARY)} job with a ${FAR_MINUTES}-minute commute: ${farOp.commuteHours.toFixed(0)} against ${nearOp.commuteHours.toFixed(0)} commute hours a year and real take-home pay of ${usd2(farOp.realPerHour)} against ${usd2(nearOp.realPerHour)} an hour`}
            width={1200}
            height={795}
            className="rounded-lg border border-ink-200"
          />
          <figcaption className="mt-2 text-center text-sm text-ink-500">
            {`Two job offers compared by real take-home pay per hour (${TAX_DATA.taxYear} federal rules, single filer, no state tax, AAA operating cost per mile)`}
          </figcaption>
        </figure>

        <section className="prose mt-10 max-w-none">
          <h2>What a Commute Really Costs: Hours First, Then Miles</h2>
          <p>
            {`A paycheck prices a job by the hours you are paid for. A commute adds hours you are not paid for and miles you pay for yourself, so the paycheck overstates what a job is worth per hour. The guide counts both, using the same assumptions on every row so that the jobs can be compared fairly.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Assumption</th>
                  <th className={thRight}>Value</th>
                  <th className={thClass}>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Days worked a year</td>
                  <td className={tdRight}>{A.jobDays}</td>
                  <td className={tdClass}>{`${daysPerWeek} days × 50 weeks; the same assumption as the commute time by state report`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Hours in a working day</td>
                  <td className={tdRight}>{A.workdayHours}</td>
                  <td className={tdClass}>{`${A.jobDays} × ${A.workdayHours} = ${JOB_HOURS.toLocaleString("en-US")} job hours a year`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Door-to-door speed</td>
                  <td className={tdRight}>{`${A.mph} mph`}</td>
                  <td className={tdClass}>{`Turns minutes into miles: a ${FAR_MINUTES}-minute trip is ${(FAR_MINUTES * (A.mph / 60)).toFixed(0)} miles`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Car cost, own car</td>
                  <td className={tdRight}>{`${A.operatingCentsPerMile.toFixed(1)}¢ a mile`}</td>
                  <td className={tdClass}>AAA 2026 fuel (17.3¢) plus maintenance (11.7¢)</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Car cost, all-in yardstick</td>
                  <td className={tdRight}>{`${A.allInCentsPerMile}¢ a mile`}</td>
                  <td className={tdClass}>IRS business mileage rate from July 1, 2026; includes depreciation and insurance</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Taxes</td>
                  <td className={tdRight}>Federal only</td>
                  <td className={tdClass}>{`Single filer, ${TAX_DATA.taxYear} brackets and standard deduction, 7.65% payroll tax; state tax omitted`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {`These are planning assumptions, not statistics, and your own numbers will differ. The first two rows turn any commute into a single useful figure: each one-way minute is ${A.jobDays} × 2 ÷ 60 = ${hoursPerMinute.toFixed(1)} hours a year. A ${FAR_MINUTES}-minute commute is ${farOp.commuteHours.toFixed(0)} hours, which is ${(farOp.commuteHours / 40).toFixed(1)} forty-hour weeks spent traveling.`}
          </p>

          <h2>The Formula for Real Take-Home Pay per Hour</h2>
          <p>
            {`Start with the pay you actually receive, remove the car cost of the commute, and divide by every hour the job takes, counting the travel.`}
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-base font-semibold text-ink-900">
            Real pay per hour = (Take-home pay − Car cost) ÷ (Job hours + Weight × Commute hours)
          </p>
          <p className="rounded-lg bg-ink-50 p-4 text-center font-mono text-sm font-semibold text-ink-900">
            Commute hours = Minutes each way × 2 × Office days ÷ 60
          </p>
          <ul>
            <li>
              <strong>Take-home pay</strong>
              {` is salary minus federal income tax and the employee's payroll tax. For ${usdWhole(NEAR_SALARY)} that is ${usdWhole(nearOp.takeHome)}; for ${usdWhole(FAR_SALARY)} it is ${usdWhole(farOp.takeHome)}. Our `}
              <Link href="/calculators/paycheck" className={linkClass}>
                Paycheck Calculator
              </Link>
              {` adds your state tax.`}
            </li>
            <li>
              <strong>Car cost</strong>
              {` is miles times the cost per mile, plus any parking, tolls, or transit fares.`}
            </li>
            <li>
              <strong>Job hours</strong>
              {` are the ${JOB_HOURS.toLocaleString("en-US")} hours you work, whether you are in the office or at home.`}
            </li>
            <li>
              <strong>Weight</strong>
              {` is how much a commute hour counts compared with a working hour. A weight of 1 is the strictest test and is used unless a row says otherwise; a weight of 0 ignores the time.`}
            </li>
          </ul>
          <p>
            {`The break-even salary is the salary at which a job with a longer commute produces the same real pay per hour as the job you have. There is no closed form because tax rises with salary, so the model finds it by trial, the same way a spreadsheet goal seek would.`}
          </p>

          <h2>How Your Commute Compares With the National Average</h2>
          <p>
            {`The Census Bureau's ${COMMUTE_REPORT.acsYear} American Community Survey reports a mean one-way commute of ${usMean.toFixed(1)} minutes for U.S. workers who travel to a workplace, and ${usOver45.toFixed(1)}% of them travel 45 minutes or more. The table converts typical commutes into yearly hours using the same assumptions as above, and shows the share of total job-plus-travel time that goes to the road.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Commute</th>
                  <th className={thRight}>Minutes each way</th>
                  <th className={thRight}>Hours a year</th>
                  <th className={thRight}>Pay-per-hour drop</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className={`border-b border-ink-100 ${row.label.startsWith("Daniel's far") ? "bg-ink-50/50 font-semibold" : ""}`}>
                    <td className={tdClass}>{`${row.label} (${row.sub})`}</td>
                    <td className={tdRight}>{row.minutes.toFixed(1)}</td>
                    <td className={tdRight}>{row.hours.toFixed(0)}</td>
                    <td className={tdRight}>{`${row.drop.toFixed(1)}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`The pay-per-hour drop is commute hours divided by job hours plus commute hours: the share of your working-plus-travel time that earns nothing. The average American loses ${usDrop.toFixed(1)}% of hourly pay to the commute on this measure, and a worker in ${longest.name} loses ${longest.payDrop.pct.toFixed(1)}%. Daniel's far job takes ${payDropPct(farOp.commuteHours).toFixed(1)}%, almost double the national average, which is why a raise that looks generous on the offer letter can vanish. See the full table for all 50 states and D.C., including how many commuters travel an hour or more, in our `}
            <Link href={COMMUTE_REPORT.path} className={linkClass}>
              commute time by state report
            </Link>
            {`.`}
          </p>

          <h2>Case Study: Daniel, an Operations Analyst in Columbia, Maryland</h2>
          <p>
            {`Daniel is 34, single, and drives his own paid-off car. He earns ${usdWhole(NEAR_SALARY)} at a logistics company ${(NEAR_MINUTES * (A.mph / 60)).toFixed(0)} miles from his apartment in Columbia, Maryland, a ${NEAR_MINUTES}-minute drive. A consulting firm in downtown Washington, D.C., offers ${usdWhole(FAR_SALARY)}, a ${FAR_MINUTES}-minute drive of ${(FAR_MINUTES * (A.mph / 60)).toFixed(0)} miles each way. Both are five days a week in the office. A ${FAR_MINUTES}-minute commute is in the 45-minutes-or-more group, which is ${usOver45.toFixed(1)}% of U.S. commuters, and Maryland has the longest average commute in the Census data, ${longest.meanMin.value.toFixed(1)} minutes. Maryland and D.C. income taxes are left out of every figure below, on both sides.`}
          </p>
          <p>
            <strong>The paycheck view.</strong>
            {` After federal income tax and payroll tax, ${usdWhole(NEAR_SALARY)} leaves ${usdWhole(nearOp.takeHome)} and ${usdWhole(FAR_SALARY)} leaves ${usdWhole(farOp.takeHome)}, a gain of ${usdWhole(takeHomeGain)} because the extra ${usdWhole(raise)} is taxed at a combined ${marginalRatePct.toFixed(2)}% (a 22% federal bracket plus 7.65% payroll tax). Divided by ${JOB_HOURS.toLocaleString("en-US")} job hours, that is ${usd2(nearOp.takeHomePerJobHour)} against ${usd2(farOp.takeHomePerJobHour)} an hour, ${paycheckLiftPct.toFixed(1)}% better.`}
          </p>
          <p>
            <strong>The commute view.</strong>
            {` The far job adds ${hoursGain.toFixed(0)} hours on the road (${farOp.commuteHours.toFixed(0)} against ${nearOp.commuteHours.toFixed(0)}) and ${usdWhole(carCostGain)} of car cost (${usdWhole(farOp.carCost)} against ${usdWhole(nearOp.carCost)}). His cash after the commute rises by only ${usdWhole(cashGain)}, and he pays for it with ${hoursGain.toFixed(0)} more hours, or ${usd2(cashPerExtraHour)} for each extra hour. That is less than the ${usd2(nearOp.realPerHour)} an hour he already earns, so the extra hours pull his average down to ${usd2(farOp.realPerHour)}, ${realGapPct.toFixed(1)}% below the nearby job.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Line</th>
                  <th className={thRight}>Nearby job</th>
                  <th className={thRight}>Far job</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Salary</td>
                  <td className={tdRight}>{usdWhole(NEAR_SALARY)}</td>
                  <td className={tdRight}>{usdWhole(FAR_SALARY)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Federal income tax</td>
                  <td className={tdRight}>{`-${usdWhole(nearOp.federal)}`}</td>
                  <td className={tdRight}>{`-${usdWhole(farOp.federal)}`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Social Security and Medicare tax</td>
                  <td className={tdRight}>{`-${usdWhole(nearOp.payroll)}`}</td>
                  <td className={tdRight}>{`-${usdWhole(farOp.payroll)}`}</td>
                </tr>
                <tr className="border-b border-ink-100 font-semibold">
                  <td className={tdClass}>Take-home pay</td>
                  <td className={tdRight}>{usdWhole(nearOp.takeHome)}</td>
                  <td className={tdRight}>{usdWhole(farOp.takeHome)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>One-way commute</td>
                  <td className={tdRight}>{`${NEAR_MINUTES} min, ${(NEAR_MINUTES * (A.mph / 60)).toFixed(0)} miles`}</td>
                  <td className={tdRight}>{`${FAR_MINUTES} min, ${(FAR_MINUTES * (A.mph / 60)).toFixed(0)} miles`}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>Commute hours a year</td>
                  <td className={tdRight}>{nearOp.commuteHours.toFixed(0)}</td>
                  <td className={tdRight}>{farOp.commuteHours.toFixed(0)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>{`Car cost at ${A.operatingCentsPerMile.toFixed(1)}¢ a mile`}</td>
                  <td className={tdRight}>{`-${usdWhole(nearOp.carCost)}`}</td>
                  <td className={tdRight}>{`-${usdWhole(farOp.carCost)}`}</td>
                </tr>
                <tr className="border-b border-ink-100 font-semibold">
                  <td className={tdClass}>Cash after the commute</td>
                  <td className={tdRight}>{usdWhole(nearOp.cash)}</td>
                  <td className={tdRight}>{usdWhole(farOp.cash)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>{`Paycheck view: take-home ÷ ${JOB_HOURS.toLocaleString("en-US")} job hours`}</td>
                  <td className={tdRight}>{usd2(nearOp.takeHomePerJobHour)}</td>
                  <td className={tdRight}>{usd2(farOp.takeHomePerJobHour)}</td>
                </tr>
                <tr className="border-b border-ink-100 bg-ink-50/50 font-semibold">
                  <td className={tdClass}>Real take-home per hour</td>
                  <td className={tdRight}>{usd2(nearOp.realPerHour)}</td>
                  <td className={tdRight}>{usd2(farOp.realPerHour)}</td>
                </tr>
                <tr className="border-b border-ink-100">
                  <td className={tdClass}>{`Real take-home per hour at ${A.allInCentsPerMile}¢ a mile`}</td>
                  <td className={tdRight}>{usd2(nearAll.realPerHour)}</td>
                  <td className={tdRight}>{usd2(farAll.realPerHour)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>The break-even.</strong>
            {` The salary at the far job that matches the nearby job's ${usd2(nearOp.realPerHour)} an hour is ${usdWhole(beOp)}, so the offer is ${usdWhole(shortfallOp)} short. Price the car at the IRS yardstick of ${A.allInCentsPerMile} cents a mile, because the longer drive will wear out his car sooner, and the break-even rises to ${usdWhole(beAll)}, ${usdWhole(shortfallAll)} above the offer. Parking is not in either number: every $1,000 a year of parking or tolls adds about ${usdWhole(raisePerThousand)} to the raise he needs, because only ${(keepRate * 100).toFixed(2)} cents of each raise dollar survives tax.`}
          </p>
          <p>
            <strong>His decision.</strong>
            {` Daniel does not turn the job down; he negotiates. The firm lets people work from home on Fridays if they ask, and with four office days his real pay at ${usdWhole(FAR_SALARY)} is ${usd2(rowAtDays(4).op.realPerHour)} an hour, ${usd2(fourDayEdge)} above the nearby job. He asks for a written remote-day policy and a ${usdWhole(Math.ceil(rowAtDays(5).match / 1_000) * 1_000)} salary if he must be in five days a week.`}
          </p>

          <h2>How Much Is an Hour of Commuting Worth to You?</h2>
          <p>
            {`Everything above counts a commute hour as a full working hour. That is a conservative test, and it is the one assumption you can change to fit your life. The table reruns Daniel's decision with the commute hours discounted.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>A commute hour counts as</th>
                  <th className={thRight}>{`Nearby job (${usdWhole(NEAR_SALARY)})`}</th>
                  <th className={thRight}>{`Far job (${usdWhole(FAR_SALARY)})`}</th>
                  <th className={thClass}>Better job</th>
                </tr>
              </thead>
              <tbody>
                {weightRows.map((row) => (
                  <tr key={row.w} className="border-b border-ink-100">
                    <td className={tdClass}>{`${pct0(row.w)} of a working hour`}</td>
                    <td className={tdRight}>{usd2(row.near.realPerHour)}</td>
                    <td className={tdRight}>{usd2(row.far.realPerHour)}</td>
                    <td className={tdClass}>{row.farWins ? "Far job" : "Nearby job"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`The two jobs tie at a weight of ${pct0(weightBreakEven)}. If Daniel values an hour behind the wheel at less than ${pct0(weightBreakEven)} of an hour at his desk, the far job is better; if he dreads the drive nearly as much as work, the nearby job is. That makes the decision a close call on money alone, and it moves the question from "what does the drive cost" to "what is my time worth to me". A train commute where he can read or work, for example, might sit near the 50% row, where the far job leaves ${usd2(halfWeight.far.realPerHour)} an hour against ${usd2(halfWeight.near.realPerHour)}.`}
          </p>

          <h2>How Many Office Days Does the Longer Commute Need to Stay Worth It?</h2>
          <p>
            {`Hybrid work changes the math because it removes commutes without removing pay. Job hours stay at ${JOB_HOURS.toLocaleString("en-US")}; only the commute hours and car cost fall. The table keeps the ${usdWhole(FAR_SALARY)} offer and counts only the days in the office.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Office days a week</th>
                  <th className={thRight}>Commute hours a year</th>
                  <th className={thRight}>{`Car cost at ${A.operatingCentsPerMile.toFixed(1)}¢`}</th>
                  <th className={thRight}>Real pay per hour</th>
                  <th className={thRight}>{`Vs. nearby job (${usd2(nearOp.realPerHour)})`}</th>
                  <th className={thRight}>Salary that would just match</th>
                </tr>
              </thead>
              <tbody>
                {hybridRows.map((row) => (
                  <tr key={row.d} className="border-b border-ink-100">
                    <td className={tdClass}>{row.d}</td>
                    <td className={tdRight}>{row.op.commuteHours.toFixed(0)}</td>
                    <td className={tdRight}>{usdWhole(row.op.carCost)}</td>
                    <td className={tdRight}>{usd2(row.op.realPerHour)}</td>
                    <td className={tdRight}>{`${row.op.realPerHour >= nearOp.realPerHour ? "+" : "-"}${usd2(Math.abs(row.op.realPerHour - nearOp.realPerHour))}`}</td>
                    <td className={tdRight}>{usdWhole(row.match)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`Each weekday at home saves ${hoursPerWeekday.toFixed(0)} hours and ${usdWhole(carCostPerWeekday)} a year. One day is enough to turn Daniel's loss into a win at the AAA cost: ${maxDaysWinOp} office days leaves ${usd2(rowAtDays(4).op.realPerHour)} an hour. At the IRS all-in rate it takes ${5 - maxDaysWinAll} days at home, ${maxDaysWinAll} in the office, to get ahead (${usd2(rowAtDays(maxDaysWinAll).all.realPerHour)} against ${usd2(nearAll.realPerHour)}). At the ${usdWhole(FAR_SALARY)} salary, going from five office days to four lifts real pay by ${usd2(fourDayLift)} an hour, which closes the ${usd2(nearFarGapAtFive)} gap between the two jobs and adds ${usd2(fourDayEdge)} on top.`}
          </p>

          <h2>The Raise Each Extra Commute Minute Demands</h2>
          <p>
            {`To generalize the case study, the table starts from the ${usdWhole(NEAR_SALARY)} job with its ${NEAR_MINUTES}-minute commute and asks how much more salary a job with a longer commute must pay to leave the same real pay per hour. The last two columns show the raise at the two car-cost rates.`}
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  <th className={thClass}>Minutes each way</th>
                  <th className={thRight}>Commute hours a year</th>
                  <th className={thRight}>Miles a year</th>
                  <th className={thRight}>{`Car cost at ${A.operatingCentsPerMile.toFixed(1)}¢`}</th>
                  <th className={thRight}>{`Raise needed at ${A.operatingCentsPerMile.toFixed(1)}¢`}</th>
                  <th className={thRight}>{`Raise needed at ${A.allInCentsPerMile}¢`}</th>
                </tr>
              </thead>
              <tbody>
                {raiseRows.map((row) => (
                  <tr key={row.m} className={`border-b border-ink-100 ${row.m === FAR_MINUTES ? "bg-ink-50/50 font-semibold" : ""}`}>
                    <td className={tdClass}>{row.m === NEAR_MINUTES ? `${row.m} (your job)` : row.m}</td>
                    <td className={tdRight}>{row.op.commuteHours.toFixed(0)}</td>
                    <td className={tdRight}>{row.op.miles.toLocaleString("en-US")}</td>
                    <td className={tdRight}>{usdWhole(row.op.carCost)}</td>
                    <td className={tdRight}>{row.m === NEAR_MINUTES ? "$0" : usdWhole(row.needOp)}</td>
                    <td className={tdRight}>{row.m === NEAR_MINUTES ? "$0" : usdWhole(row.needAll)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {`The raise is a straight line in minutes: about ${usdWhole(perMinOp)} per extra one-way minute at the AAA cost, and about ${usdWhole(perMinAll)} at the IRS rate, because the extra minutes are taxed at the same ${marginalRatePct.toFixed(2)}% throughout the table. A 90-minute commute against ${NEAR_MINUTES} minutes needs ${usdWhole(raiseRows[raiseRows.length - 1].needOp)} more salary, ${((raiseRows[raiseRows.length - 1].needOp / NEAR_SALARY) * 100).toFixed(0)}% of the base. The numbers scale with pay: a higher salary makes each hour worth more, so the raise needed per minute grows. Our `}
            <Link href="/calculators/salary-to-hourly" className={linkClass}>
              Salary to Hourly Calculator
            </Link>
            {` converts any salary to the hourly figure you would compare, and the `}
            <Link href="/guides/salary-vs-hourly-pay" className={linkClass}>
              salary vs hourly pay guide
            </Link>
            {` explains what a paycheck's hourly equivalent leaves out.`}
          </p>

          <h2>How to Decide in 6 Steps</h2>
          <ol>
            <li>
              {`Write down both jobs: salary, one-way minutes on a typical day (not the best day), and office days a week. Use a mapping app set to your usual departure time.`}
            </li>
            <li>
              {`Find take-home pay for each salary with the `}
              <Link href="/calculators/paycheck" className={linkClass}>
                Paycheck Calculator
              </Link>
              {`, including your state tax. The model here finds ${usdWhole(nearOp.takeHome)} for ${usdWhole(NEAR_SALARY)} and ${usdWhole(farOp.takeHome)} for ${usdWhole(FAR_SALARY)} before state tax.`}
            </li>
            <li>
              {`Compute commute hours (minutes × 2 × office days ÷ 60) and miles (minutes × ${(A.mph / 60).toFixed(1)} × 2 × office days). Add parking, tolls, and fares to the cost, which the per-mile rate does not cover.`}
            </li>
            <li>
              {`Price the miles at ${A.operatingCentsPerMile.toFixed(1)} cents if you own the car outright, or at ${A.allInCentsPerMile} cents if the extra driving will bring a replacement forward. Run both; if the decision flips between them, the car cost is what the decision turns on.`}
            </li>
            <li>
              {`Divide cash after the commute by job hours plus commute hours. Compare the two jobs, then find the salary at which they tie: ${usdWhole(beOp)} in Daniel's case.`}
            </li>
            <li>
              {`Choose your weight and rerun. If the answer holds from a weight of 100% down to 50%, the decision is robust. If it flips near ${pct0(weightBreakEven)}, as Daniel's does, it comes down to how much you value your time, and a hybrid schedule or a salary counter is the way to settle it.`}
            </li>
          </ol>

          <h2>Ways to Shrink a Commute You Cannot Avoid</h2>
          <ul>
            <li>
              <strong>Negotiate remote days.</strong>
              {` Each weekday at home on a ${FAR_MINUTES}-minute commute saves ${hoursPerWeekday.toFixed(0)} hours and ${usdWhole(carCostPerWeekday)} a year, which is worth about ${usdWhole(weekdaySalaryEquivalent)} of gross salary for the car cost alone, before counting the time.`}
            </li>
            <li>
              <strong>Share the ride.</strong>
              {` ${usPool.toFixed(1)}% of U.S. workers carpool. Splitting the far job's ${farOp.miles.toLocaleString("en-US")} miles two ways saves ${usdWhole(poolSaving)} a year at ${A.operatingCentsPerMile.toFixed(1)} cents a mile, worth about ${usdWhole(Math.round(poolRaiseEquivalent / 100) * 100)} of gross salary, more than the ${usdWhole(shortfallOp)} the offer falls short.`}
            </li>
            <li>
              <strong>Switch to transit if it is time you can use.</strong>
              {` Only ${usTransit.toFixed(1)}% of workers ride public transportation, but a seat on a train turns commute hours into reading or work hours. At a weight of 50% the far job gains ${usd2(halfWeight.far.realPerHour - farOp.realPerHour)} an hour compared with counting every hour in full. A pass at an illustrative ${usdWhole(TRANSIT_PASS_PER_MONTH)} a month costs ${usdWhole(TRANSIT_PASS_PER_MONTH * 12)} a year, which is ${usdWhole(farOp.carCost - TRANSIT_PASS_PER_MONTH * 12)} below the far job's car cost.`}
            </li>
            <li>
              <strong>Move the commute off the peak.</strong>
              {` Every minute cut from a one-way trip is ${hoursPerMinute.toFixed(1)} hours a year. Shifting your hours to miss the peak and saving 10 minutes each way returns ${(hoursPerMinute * 10).toFixed(0)} hours a year, ${((hoursPerMinute * 10) / 40).toFixed(1)} forty-hour weeks.`}
            </li>
            <li>
              <strong>Count the working-from-home option.</strong>
              {` ${usWfh.toFixed(1)}% of U.S. workers worked mainly from home in ${COMMUTE_REPORT.acsYear}. If the role can be done remotely at least part of the week, ask before you accept.`}
            </li>
          </ul>
        </section>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 my-8 text-center">
          <p className="font-semibold text-ink-800">Run Your Own Commute Numbers</p>
          <p className="mt-1 text-sm text-ink-600">
            Find take-home pay for each offer, convert salary to an hourly figure, and see what a car really costs you a year.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/paycheck"
              className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Paycheck Calculator
            </Link>
            <Link
              href="/calculators/salary-to-hourly"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Salary to Hourly Calculator
            </Link>
            <Link
              href="/calculators/car-affordability"
              className="inline-block rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Car Affordability Calculator
            </Link>
          </div>
        </div>

        <section className="prose mt-8 max-w-none">
          <Sources
            items={[
              COMMUTE_SOURCES.acsTravelTime,
              COMMUTE_SOURCES.acsAggregate,
              COMMUTE_SOURCES.acsTransport,
              COMMUTE_SOURCES.acsDefinitions,
              CAR_SOURCES.aaa,
              TAX_SOURCES.mileage,
              TAX_SOURCES.revProc,
              TAX_SOURCES.ssaWageBase,
            ]}
            checked="November 2026"
            note="Federal tax only, single filer, tax year 2026. Days worked, hours a day, the 30 mph door-to-door speed, and the weight on commute hours are planning assumptions, not statistics. Census figures are survey estimates for workers who travel to a workplace; the mean one-way time is for all such workers, not a median. The IRS rate is a business rate used here as a yardstick; employees cannot deduct commuting miles."
          />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="mt-8">
              <h3 className="text-lg font-semibold text-ink-800">{faq.question}</h3>
              <p className="mt-2 text-ink-700">{faq.answer}</p>
            </div>
          ))}
        </section>

        <RelatedGuides
          currentSlug={slug}
          relatedSlugs={["how-much-car-can-i-afford", "salary-vs-hourly-pay", "is-100k-a-good-salary"]}
        />
      </article>
    </>
  );
}
