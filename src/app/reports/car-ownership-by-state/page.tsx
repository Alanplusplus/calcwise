import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateVehicleTable } from "@/components/StateVehicleTable";
import { site } from "@/lib/site";
import {
  AAA,
  AAA_FUEL_PER_YEAR,
  AAA_MAINTENANCE_PER_YEAR,
  CSV_HEADER,
  INSURANCE_FUEL_PER_VEHICLE,
  REPORT,
  REPORT_SOURCES,
  RUNNING_PER_VEHICLE,
  STATE_RESULTS,
  US_RESULT,
  VEHICLE_LABELS,
  correlation,
  count0,
  countOverLine,
  getStateResult,
  millions,
  pct1,
  usd0,
} from "@/lib/reports/car-ownership-by-state";

const title = "Car Ownership by State: Vehicles per Household";
const h1 = "Car Ownership by State: Vehicles per Household and What They Cost";

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Name for running text: "D.C." reads better in a sentence than "District of Columbia". */
const short = (r: { abbr: string; name: string }) => (r.abbr === "DC" ? "D.C." : r.name);

function mustGet(abbr: string) {
  const row = getStateResult(abbr);
  if (!row) throw new Error(`Missing state ${abbr}`);
  return row;
}

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;
const highest = STATE_RESULTS[0];
const lowest = STATE_RESULTS[total - 1];
const secondLowest = STATE_RESULTS[total - 2];
const lowestExNyDc = STATE_RESULTS.filter((r) => r.abbr !== "NY" && r.abbr !== "DC").slice(-1)[0];
const topFour = STATE_RESULTS.slice(0, 4);
const topFourFloor = Math.floor(topFour[3].perHh.value * 10) / 10;
const atLeastTwo = STATE_RESULTS.filter((r) => Math.round(r.perHh.value * 100) / 100 >= 2);
const aboveUs = STATE_RESULTS.filter((r) => r.perHh.value > us.perHh.value).length;

const byNone = [...STATE_RESULTS].sort((a, b) => b.noneShare.pct - a.noneShare.pct);
const noneTop = byNone.slice(0, 4);
const noneLow = byNone.slice(-3).reverse();
const ny = mustGet("NY");
const dc = mustGet("DC");
const tx = mustGet("TX");
const ca = mustGet("CA");
const nyDcNone = ny.bins[0] + dc.bins[0];
const nyDcNoneShare = (nyDcNone / us.bins[0]) * 100;
const over10None = STATE_RESULTS.filter((r) => r.noneShare.pct >= 10).sort(
  (a, b) => b.noneShare.pct - a.noneShare.pct,
);

const renterNoneHigh = [...STATE_RESULTS].sort((a, b) => b.renterNoneShare.pct - a.renterNoneShare.pct)[0];
const renterNoneLow = [...STATE_RESULTS].sort((a, b) => a.renterNoneShare.pct - b.renterNoneShare.pct)[0];

const incomes = STATE_RESULTS.map((r) => r.income);
const corrAll = correlation(incomes, STATE_RESULTS.map((r) => r.perHh.value));
const exNyDc = STATE_RESULTS.filter((r) => r.abbr !== "NY" && r.abbr !== "DC");
const corrExNyDc = correlation(
  exNyDc.map((r) => r.income),
  exNyDc.map((r) => r.perHh.value),
);

const overLine = countOverLine();
const byInsFuel = [...STATE_RESULTS].sort((a, b) => b.insFuelShare - a.insFuelShare);
const insFuelTop = byInsFuel.slice(0, 3);
const insFuelLow = byInsFuel.slice(-3).reverse();
const insFuelTopMaxIncome = Math.max(...insFuelTop.map((r) => r.income));
const underLine = STATE_RESULTS.filter((r) => r.insFuelShare <= REPORT.guidelinePct);

const minVehicles = us.bins.reduce((s, n, i) => s + n * i, 0);
const usLine = (us.income * REPORT.guidelinePct) / 100;
const leftOneVehicle = usLine - INSURANCE_FUEL_PER_VEHICLE;
const twoVehiclesInsFuel = 2 * INSURANCE_FUEL_PER_VEHICLE;
const twoVehiclesOver = twoVehiclesInsFuel - usLine;
const usInsFuelShare = (INSURANCE_FUEL_PER_VEHICLE / us.income) * 100;
const usAllInOne = (AAA.total / us.income) * 100;
const usAllInTwo = ((2 * AAA.total) / us.income) * 100;
const usRunningOne = (RUNNING_PER_VEHICLE / us.income) * 100;
const usRunningTwo = ((2 * RUNNING_PER_VEHICLE) / us.income) * 100;
const categoriesSum =
  AAA.depreciation +
  AAA.finance +
  AAA.insurance +
  AAA.licenseRegistrationTaxes +
  AAA_FUEL_PER_YEAR +
  AAA_MAINTENANCE_PER_YEAR;

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  perHh: r.perHh.value,
  perHhMoe: r.perHh.moe,
  none: r.noneShare.pct,
  threePlus: r.threePlusShare.pct,
  renterNone: r.renterNoneShare.pct,
  income: r.income,
  insFuelShare: r.insFuelShare,
}));

const exampleRows = [
  { label: "United States", r: us },
  ...["WY", "MS", "TX", "CA", "NY", "DC"].map((abbr) => {
    const r = mustGet(abbr);
    return { label: r.name, r };
  }),
];

const findings: { lead: string; body: string }[] = [
  {
    lead: `The typical U.S. household has ${us.perHh.value.toFixed(2)} vehicles, and ${pct1(us.noneShare.pct)} of households (${millions(us.bins[0])}) have none.`,
    body: `Of ${count0(us.hh)} households, ${pct1(us.oneShare.pct)} have one vehicle, ${pct1(us.twoShare.pct)} have two, and ${pct1(us.threePlusShare.pct)} have three or more, ${count0(us.vehicles)} vehicles in all. Among the ${millions(us.carHh)} households with at least one vehicle, the average is ${us.perCarHh.value.toFixed(2)}. The most common situation is two vehicles, and ${pct1(us.twoPlusShare.pct)} of households have two or more.`,
  },
  {
    lead: `By state, vehicles per household run from ${lowest.perHh.value.toFixed(2)} in ${short(lowest)} to ${highest.perHh.value.toFixed(2)} in ${short(highest)}.`,
    body: `${longList(topFour.map((r) => short(r)))} are the four highest, all above ${topFourFloor.toFixed(1)}; in ${short(highest)}, ${pct1(highest.threePlusShare.pct)} of households have three or more vehicles. In ${atLeastTwo.length} of ${total} places the average is 2.00 or more (rounded to two decimals), and in ${aboveUs} it is above the U.S. figure. At the other end, ${short(lowest)} (${lowest.perHh.value.toFixed(2)}) and ${short(secondLowest)} (${secondLowest.perHh.value.toFixed(2)}) are the only places below 1.5; the lowest state outside them is ${short(lowestExNyDc)} at ${lowestExNyDc.perHh.value.toFixed(2)}.`,
  },
  {
    lead: `${longList(noneTop.slice(0, 2).map((r) => `${short(r)} (${pct1(r.noneShare.pct)})`))} have the most households without a vehicle, and ${over10None.length} places are at 10% or more.`,
    body: `The places at 10% or more are ${longList(over10None.map((r) => `${short(r)} (${pct1(r.noneShare.pct)})`))}. The smallest shares are in ${longList(noneLow.map((r) => `${short(r)} (${pct1(r.noneShare.pct)})`))}. ${short(ny)} and ${short(dc)} together hold ${millions(nyDcNone)} vehicle-free households, ${pct1(nyDcNoneShare)} of the U.S. total, although they have ${pct1(((ny.hh + dc.hh) / us.hh) * 100)} of its households.`,
  },
  {
    lead: `Renting makes a large difference: ${pct1(us.renterNoneShare.pct)} of renter households have no vehicle, against ${pct1(us.ownerNoneShare.pct)} of owner households.`,
    body: `Renters make up ${pct1(us.renterShareOfNone)} of all vehicle-free households. The renter share without a vehicle runs from ${pct1(renterNoneLow.renterNoneShare.pct)} in ${short(renterNoneLow)} to ${pct1(renterNoneHigh.renterNoneShare.pct)} in ${short(renterNoneHigh)}.`,
  },
  {
    lead: `Higher-income states do not have more vehicles per household.`,
    body: `Across the ${total} places, the correlation between median household income and vehicles per household is ${corrAll.toFixed(2)}, and ${corrExNyDc.toFixed(2)} without ${short(ny)} and ${short(dc)}. Income does not line up with vehicle counts: ${short(highest)} has ${highest.perHh.value.toFixed(2)} vehicles per household on a median income of ${usd0(highest.income)}, and ${short(ca)} has ${ca.perHh.value.toFixed(2)} on ${usd0(ca.income)}.`,
  },
  {
    lead: `AAA puts the average cost of a new vehicle at ${usd0(AAA.total)} a year, and insurance plus fuel alone are ${usd0(INSURANCE_FUEL_PER_VEHICLE)} of it.`,
    body: `At the U.S. median household income of ${usd0(us.income)}, one vehicle's insurance and fuel take ${pct1(usInsFuelShare)} of income, and the average car-owning household has ${us.perCarHh.value.toFixed(2)} vehicles, so the bill is ${pct1(us.insFuelShare)} of income before any loan payment. The 20/4/10 rule allows ${REPORT.guidelinePct}% for payment, insurance, and fuel together.`,
  },
  {
    lead: `In ${overLine} of ${total} places, insurance and fuel for the average car-owning household would already take more than ${REPORT.guidelinePct}% of the median household income.`,
    body: `The highest shares are in ${longList(insFuelTop.map((r) => `${short(r)} (${pct1(r.insFuelShare)})`))}, where median household incomes are ${usd0(insFuelTopMaxIncome)} or less. The lowest are in ${longList(insFuelLow.map((r) => `${short(r)} (${pct1(r.insFuelShare)})`))}. Only ${underLine.length} places stay at or under the line, and this is arithmetic with national cost averages, not what households in each state spend.`,
  },
];

const faqs = [
  {
    question: "What percentage of U.S. households have no car?",
    answer: `In the ${REPORT.acsYear} American Community Survey, ${pct1(us.noneShare.pct)} of U.S. households (${millions(us.bins[0])} of ${millions(us.hh)}) had no vehicle available. The share is ${pct1(us.renterNoneShare.pct)} among renter households and ${pct1(us.ownerNoneShare.pct)} among owner households. By state it ranges from ${pct1(noneLow[0].noneShare.pct)} in ${noneLow[0].name} to ${pct1(noneTop[0].noneShare.pct)} in ${noneTop[0].name}.`,
  },
  {
    question: "How many cars does the average American household have?",
    answer: `${us.perHh.value.toFixed(2)} vehicles per household, counting the households that have none. Households with at least one vehicle average ${us.perCarHh.value.toFixed(2)}. The ${REPORT.acsYear} ACS counts ${count0(us.vehicles)} passenger cars, vans, and light trucks available to ${count0(us.hh)} households, and ${pct1(us.twoPlusShare.pct)} of households have two or more.`,
  },
  {
    question: "Which state has the most cars per household?",
    answer: `${short(highest)}, with ${highest.perHh.value.toFixed(2)} vehicles per household (margin of error ±${highest.perHh.moe.toFixed(2)}), followed by ${longList(STATE_RESULTS.slice(1, 4).map((r) => `${short(r)} (${r.perHh.value.toFixed(2)})`))}. The fewest are in ${short(lowest)} (${lowest.perHh.value.toFixed(2)}) and ${short(secondLowest)} (${secondLowest.perHh.value.toFixed(2)}), where ${pct1(lowest.noneShare.pct)} and ${pct1(secondLowest.noneShare.pct)} of households have no vehicle.`,
  },
  {
    question: "How much does it cost to own a car per year?",
    answer: `AAA's Your Driving Costs 2026 study puts the average cost to own and operate a new vehicle at ${usd0(AAA.total)} a year (${usd0(AAA.total / 12)} a month) at ${count0(AAA.milesPerYear)} miles a year, up from ${usd0(AAA.priorYearTotal)} in 2025. Depreciation is ${usd0(AAA.depreciation)}, insurance ${usd0(AAA.insurance)}, fuel about ${usd0(AAA_FUEL_PER_YEAR)}, maintenance and tires about ${usd0(AAA_MAINTENANCE_PER_YEAR)}, finance charges ${usd0(AAA.finance)}, and license, registration, and taxes ${usd0(AAA.licenseRegistrationTaxes)}. A used or paid-off vehicle skips most depreciation and financing.`,
  },
  {
    question: "How much of income should go to car costs?",
    answer: `A common guideline is the 20/4/10 rule: 20% down, a loan of no more than 4 years, and payment plus insurance plus fuel at or below 10% of gross income. At the U.S. median household income of ${usd0(us.income)}, that is ${usd0(usLine)} a year. One vehicle's insurance and fuel at AAA's averages use ${usd0(INSURANCE_FUEL_PER_VEHICLE)} of it, leaving ${usd0(leftOneVehicle)} (${usd0(leftOneVehicle / 12)} a month) for a loan payment, and two vehicles use ${usd0(twoVehiclesInsFuel)}, which is ${usd0(twoVehiclesOver)} more than the whole allowance.`,
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau data are public domain, and the AAA figures are quoted from its published fact sheet.`,
  },
];

const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const description = `Vehicles per household in all 50 states and DC, ${lowest.perHh.value.toFixed(2)} to ${highest.perHh.value.toFixed(2)}, the share with no car, and what insurance and fuel take of income. Free CSV.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "article",
    publishedTime: REPORT.datePublished,
    modifiedTime: REPORT.dateModified,
  },
};

const citation = `${site.name} (${new Date(REPORT.dateModified).getUTCFullYear()}). ${h1}. ${site.url}${REPORT.path}. Data: U.S. Census Bureau, ${REPORT.acsYear} American Community Survey 1-year estimates (B25044, B25046, B19013); AAA, Your Driving Costs ${AAA.year}.`;

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data)`,
    description: `Vehicles available per household, the share of households with no vehicle, one, two, and three or more vehicles with margins of error, renter and owner households without a vehicle, median household income, and the share of income that AAA's national insurance and fuel costs would take, for the 50 states, the District of Columbia, and the United States.`,
    url: `${site.url}${REPORT.path}`,
    identifier: `${site.url}${REPORT.path}`,
    datePublished: REPORT.datePublished,
    dateModified: REPORT.dateModified,
    inLanguage: "en",
    creator: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    temporalCoverage: String(REPORT.acsYear),
    spatialCoverage: { "@type": "Place", name: "United States (50 states and District of Columbia)" },
    keywords: [
      "car ownership by state",
      "vehicles per household by state",
      "households without a car by state",
      "percent of households with no vehicle",
      "cost of owning a car as a share of income",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsVehicles.href,
      REPORT_SOURCES.acsAggregate.href,
      REPORT_SOURCES.acsIncome.href,
      REPORT_SOURCES.aaa.href,
    ],
    variableMeasured: CSV_HEADER.map((name) => ({ "@type": "PropertyValue", name })),
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: `${site.url}${REPORT.csvPath}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function CarOwnershipByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Car Ownership by State", href: REPORT.path },
        ]}
      />
      <ArticleJsonLd
        title={h1}
        description={description}
        slug={REPORT.slug}
        datePublished={REPORT.datePublished}
        dateModified={REPORT.dateModified}
        urlPrefix="/reports"
      />
      <DatasetJsonLd />
      <FaqJsonLd faqs={faqs} />

      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/reports" className="hover:text-brand-600">
          Data Reports
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Car Ownership by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        {`Published ${longDate.format(new Date(REPORT.datePublished))} · Vehicle and income data: Census ACS ${REPORT.acsYear} 1-year · Costs: AAA Your Driving Costs ${AAA.year}`}
      </p>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          {`In the ${REPORT.acsYear} American Community Survey, the average U.S. household had `}
          <strong>{`${us.perHh.value.toFixed(2)} vehicles`}</strong>
          {` and ${pct1(us.noneShare.pct)} of households (${millions(us.bins[0])}) had none. By state, vehicles per household run from ${lowest.perHh.value.toFixed(2)} in ${short(lowest)} to ${highest.perHh.value.toFixed(2)} in ${short(highest)}. AAA puts a new vehicle's yearly cost at ${usd0(AAA.total)}; at that national cost, insurance and fuel for the average car-owning household take `}
          <strong>{`${pct1(us.insFuelShare)} of median household income`}</strong>
          {`, above the ${REPORT.guidelinePct}% that the 20/4/10 rule allows for payment, insurance, and fuel together, and in ${overLine} of ${total} places the same arithmetic is over the line.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Vehicles per household",
            value: us.perHh.value.toFixed(2),
            note: `${count0(us.vehicles)} vehicles, ${count0(us.hh)} households. ${us.perCarHh.value.toFixed(2)} among households with a vehicle`,
          },
          {
            label: "Households with no vehicle",
            value: pct1(us.noneShare.pct),
            note: `${millions(us.bins[0])} households. ${pct1(us.renterNoneShare.pct)} of renters, ${pct1(us.ownerNoneShare.pct)} of owners`,
          },
          {
            label: "Range across states",
            value: `${lowest.perHh.value.toFixed(2)} to ${highest.perHh.value.toFixed(2)}`,
            note: `${short(lowest)} to ${short(highest)}. ${pct1(highest.threePlusShare.pct)} of ${short(highest)} households have 3 or more`,
          },
          {
            label: "Insurance + fuel, % of income",
            value: pct1(us.insFuelShare),
            note: `AAA national costs for ${us.perCarHh.value.toFixed(2)} vehicles on a ${usd0(us.income)} income. ${overLine} places are over ${REPORT.guidelinePct}%`,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-ink-200 border-t-[3px] border-t-gold-500 bg-white p-4 shadow-card"
          >
            <p className="text-[0.6875rem] font-semibold uppercase leading-snug tracking-[0.09em] text-ink-500">
              {card.label}
            </p>
            <p className="numeral mt-2 text-[1.75rem] font-semibold leading-none text-ink-900">
              {card.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-500">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="prose mt-10 max-w-none">
        <h2>What the numbers show</h2>
        <ul>
          {findings.map((f) => (
            <li key={f.lead}>
              <strong>{f.lead}</strong>
              {" "}
              {f.body}
            </li>
          ))}
        </ul>

        <h2>How many vehicles U.S. households have</h2>
        <p>
          The Census Bureau asks how many passenger cars, vans, and light trucks are kept at home and
          available to the household. Counts are occupied housing units (households), and the published
          categories stop at five or more.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Vehicles available
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Households
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Share
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {VEHICLE_LABELS.map((label, i) => (
              <tr key={label} className={i === 2 ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.bins[i])}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {pct1((us.bins[i] / us.hh) * 100)}
                </td>
              </tr>
            ))}
            <tr className="bg-ink-50 font-semibold">
              <td className="px-3 py-2 text-ink-800">All households</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.hh)}</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">100.0%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The shaded row is the most common answer. The vehicles-per-household figures use the Census Bureau's published count of all vehicles available (${count0(us.vehicles)}). Counting every household in the five-or-more group as having exactly five would give ${count0(minVehicles)}, ${pct1((1 - minVehicles / us.vehicles) * 100)} fewer, so the published count is consistent with the groups.`}
      </p>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar is vehicles available per household; the other
          columns show how common it is to have no vehicle, to have three or more, and to rent without a
          vehicle, plus what insurance and fuel would take of the state's median income.
        </p>
        <div className="mt-4">
          <StateVehicleTable
            rows={tableRows}
            usPerHh={us.perHh.value}
            guidelinePct={REPORT.guidelinePct}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={REPORT.csvPath}
            download
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Download the full dataset (CSV)
          </a>
          <span className="text-xs text-ink-500">
            {`${total + 1} rows (states, DC, and the U.S.), ${CSV_HEADER.length} columns, CC BY 4.0`}
          </span>
        </div>
      </section>

      <div className="prose mt-12 max-w-none">
        <h2>What a vehicle costs, according to AAA</h2>
        <p>
          {`AAA's Your Driving Costs ${AAA.year} study prices a new vehicle over five years and 75,000 miles, using the five best-selling models in each of seven vehicle categories (average sticker price ${usd0(AAA.weightedMsrp)}). The average comes to ${usd0(AAA.total)} a year at ${count0(AAA.milesPerYear)} miles a year, up from ${usd0(AAA.priorYearTotal)} in 2025. The two operating costs that count inside the 20/4/10 rule's 10% bucket are insurance and fuel.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                AAA cost category
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                A year, per vehicle
              </th>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Counted in this report as
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {[
              { name: "Insurance (full coverage)", amount: AAA.insurance, role: "Insurance + fuel, and running cost" },
              {
                name: `Fuel (${AAA.fuelCentsPerMile}¢ a mile, regular gas at $${AAA.regularGasPerGallon.toFixed(3)} a gallon)`,
                amount: AAA_FUEL_PER_YEAR,
                role: "Insurance + fuel, and running cost",
              },
              {
                name: `Maintenance, repair, and tires (${AAA.maintenanceCentsPerMile}¢ a mile)`,
                amount: AAA_MAINTENANCE_PER_YEAR,
                role: "Running cost",
              },
              { name: "License, registration, and taxes", amount: AAA.licenseRegistrationTaxes, role: "Running cost" },
              { name: "Depreciation", amount: AAA.depreciation, role: "All-in cost only" },
              { name: "Finance charges", amount: AAA.finance, role: "All-in cost only" },
            ].map((row) => (
              <tr key={row.name}>
                <td className="px-3 py-2 text-ink-800">{row.name}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(row.amount)}</td>
                <td className="px-3 py-2 text-ink-600">{row.role}</td>
              </tr>
            ))}
            <tr className="bg-ink-50 font-semibold">
              <td className="px-3 py-2 text-ink-800">Insurance + fuel</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(INSURANCE_FUEL_PER_VEHICLE)}</td>
              <td className="px-3 py-2 text-ink-600">Used for the rankings and the 10% test</td>
            </tr>
            <tr className="bg-ink-50 font-semibold">
              <td className="px-3 py-2 text-ink-800">Running cost (no depreciation or financing)</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(RUNNING_PER_VEHICLE)}</td>
              <td className="px-3 py-2 text-ink-600">A paid-off vehicle</td>
            </tr>
            <tr className="bg-ink-50 font-semibold">
              <td className="px-3 py-2 text-ink-800">All-in, as published by AAA</td>
              <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(AAA.total)}</td>
              <td className="px-3 py-2 text-ink-600">A new vehicle</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Fuel and maintenance are published per mile and are converted at ${count0(AAA.milesPerYear)} miles a year. The six categories add up to ${usd0(categoriesSum)}, ${usd0(AAA.total - categoriesSum)} less than the published ${usd0(AAA.total)} because AAA rounds the per-mile figures.`}
      </p>

      <div className="prose mt-10 max-w-none">
        <h2>The 10% line at the U.S. median income</h2>
        <p>
          {`The 20/4/10 rule asks for 20% down, a loan of no more than four years, and payment plus insurance plus fuel at or below 10% of gross income. For a household earning the U.S. median of ${usd0(us.income)}, the 10% line is ${usd0(usLine)} a year (${usd0(usLine / 12)} a month).`}
        </p>
        <ul>
          <li>
            <strong>One vehicle:</strong>
            {" "}
            {`insurance and fuel at AAA's averages take ${usd0(INSURANCE_FUEL_PER_VEHICLE)} (${pct1(usInsFuelShare)} of income), which leaves ${usd0(leftOneVehicle)} a year, or ${usd0(leftOneVehicle / 12)} a month, for the loan payment.`}
          </li>
          <li>
            <strong>Two vehicles:</strong>
            {" "}
            {`insurance and fuel take ${usd0(twoVehiclesInsFuel)} (${pct1((twoVehiclesInsFuel / us.income) * 100)} of income), ${usd0(twoVehiclesOver)} more than the whole allowance, so at the U.S. median income no loan payment fits inside the rule.`}
          </li>
          <li>
            <strong>All-in costs:</strong>
            {" "}
            {`${usd0(AAA.total)} for one new vehicle is ${pct1(usAllInOne)} of income and ${usd0(2 * AAA.total)} for two is ${pct1(usAllInTwo)}. Running costs alone, with no depreciation or financing, are ${pct1(usRunningOne)} for one and ${pct1(usRunningTwo)} for two.`}
          </li>
        </ul>
        <p>
          {`That is why the typical two-vehicle household is either driving older vehicles, keeping them without a payment, driving fewer than ${count0(AAA.milesPerYear)} miles each, or spending more than the rule suggests. The rule is a conservative planning cap, not a measure of what households spend.`}
        </p>
        <h2>Seven places side by side</h2>
        <p>
          {`Each row applies the same AAA costs to the average household that has at least one vehicle in that place and divides by the place's median household income. Differences between rows come from vehicle counts and incomes only, because the costs are national.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Place
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Median income
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Vehicles, households with a vehicle
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Insurance + fuel
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                % of income
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                Running cost, % of income
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                One new vehicle, all-in, % of income
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {exampleRows.map(({ label, r }) => (
              <tr key={label} className={label === "United States" ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.income)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.perCarHh.value.toFixed(2)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.insFuelHousehold)}</td>
                <td
                  className={`px-3 py-2 text-right tabular-nums ${r.insFuelShare > REPORT.guidelinePct ? "font-semibold text-negative" : "text-ink-700"}`}
                >
                  {pct1(r.insFuelShare)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.runningShare)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.allInOneShare)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Figures in red are above ${REPORT.guidelinePct}% of the median household income. ${short(tx)} (${pct1(tx.insFuelShare)}) and ${short(ca)} (${pct1(ca.insFuelShare)}) are on opposite sides of the line with similar vehicle counts (${tx.perCarHh.value.toFixed(2)} and ${ca.perCarHh.value.toFixed(2)} per household with a vehicle) because ${short(ca)}'s median income is ${pct1((ca.income / tx.income - 1) * 100)} higher.`}
      </p>

      <div className="prose mt-12 max-w-none">
        <h2>Using this report</h2>
        <ul>
          <li>
            <strong>Budget the second vehicle separately.</strong>
            {" "}
            {`At AAA's averages, each added vehicle brings ${usd0(INSURANCE_FUEL_PER_VEHICLE)} a year (${usd0(INSURANCE_FUEL_PER_VEHICLE / 12)} a month) of insurance and fuel before the payment. Run both vehicles through the `}
            <Link href="/calculators/car-affordability" className="text-brand-600 underline">
              car affordability calculator
            </Link>
            {" "}
            with your own insurance quote and commute.
          </li>
          <li>
            <strong>Check the salary math for one vehicle first.</strong>
            {" "}
            Our guide on{" "}
            <Link href="/guides/how-much-car-can-i-afford" className="text-brand-600 underline">
              how much car you can afford by salary
            </Link>
            {" "}
            walks through the 20/4/10 rule from $40,000 to $150,000.
          </li>
          <li>
            <strong>Compare buying with leasing and with a longer loan.</strong>
            {" "}
            The{" "}
            <Link href="/calculators/lease-vs-buy-car" className="text-brand-600 underline">
              lease vs buy calculator
            </Link>
            {" "}
            and the{" "}
            <Link href="/calculators/auto-loan" className="text-brand-600 underline">
              auto loan calculator
            </Link>
            {" "}
            show how the term changes the monthly cost and the total interest.
          </li>
          <li>
            <strong>Use the state figures as context, not a quote.</strong>
            {" "}
            {`Insurance and fuel prices differ by state and by driver; a household in ${short(ny)} that drives 6,000 miles a year spends about ${usd0((AAA.fuelCentsPerMile / 100) * 6000)} on fuel at AAA's ${AAA.fuelCentsPerMile}¢ a mile, against ${usd0(AAA_FUEL_PER_YEAR)} at the ${count0(AAA.milesPerYear)}-mile average used here.`}
          </li>
        </ul>

        <h2>How the numbers were built</h2>
        <ul>
          <li>
            <strong>Vehicles per household</strong>
            {" "}
            is the Census Bureau's aggregate number of vehicles available (B25046) divided by households
            (B25044). The same count divided by households with at least one vehicle gives the figure for
            households that have a vehicle.
          </li>
          <li>
            <strong>Shares of households</strong>
            {" "}
            add the owner and renter counts in each B25044 group. The 90% margins of error follow the ACS
            General Handbook (chapter 8) for sums, proportions, and ratios, and are in the CSV.
          </li>
          <li>
            <strong>Insurance plus fuel</strong>
            {" "}
            {`is ${usd0(AAA.insurance)} of insurance plus ${usd0(AAA_FUEL_PER_YEAR)} of fuel (${AAA.fuelCentsPerMile}¢ a mile at ${count0(AAA.milesPerYear)} miles), or ${usd0(INSURANCE_FUEL_PER_VEHICLE)} per vehicle, multiplied by the vehicles per household that has one, and divided by the state's median household income (B19013).`}
          </li>
          <li>
            <strong>The 10% line</strong>
            {" "}
            is the cap the 20/4/10 rule puts on payment, insurance, and fuel together. This report tests
            only the insurance and fuel part, so a result above 10% means the cap is exceeded before any
            payment, and a result below 10% does not mean a payment fits.
          </li>
        </ul>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>The costs are national and for new vehicles.</strong>
            {" "}
            AAA's insurance figure is for a full-coverage policy on a new vehicle, and its fuel figure is
            based on a national gas price. Used vehicles, older drivers, lower mileage, liability-only
            policies, and state differences in rates all change the bill. The results show how heavy
            AAA's ownership model would be against local incomes, not what households in a state actually
            spend.
          </li>
          <li>
            <strong>Median household income covers every household.</strong>
            {" "}
            Households with a vehicle may earn more or less than the all-household median, so the share is
            a gauge of how heavy AAA's cost model is against local incomes, not the experience of any one
            household.
          </li>
          <li>
            <strong>Vehicles available is not vehicles owned.</strong>
            {" "}
            The Census Bureau counts passenger cars, vans, and pickups of one ton or less that are kept at
            home and available to household members. Leased vehicles and company vehicles are included if
            kept at home and used for non-business purposes; motorcycles, recreational vehicles, immobile
            vehicles, and vehicles used only for business are excluded.
          </li>
          <li>
            <strong>Averages hide the shape.</strong>
            {" "}
            {`${us.perHh.value.toFixed(2)} vehicles per household is a mix of ${pct1(us.noneShare.pct)} with none, ${pct1(us.threePlusShare.pct)} with three or more, and everything between. In ${short(ny)} and ${short(dc)} the average is pulled down by the large share of households with no vehicle; among households that have one it is ${ny.perCarHh.value.toFixed(2)} and ${dc.perCarHh.value.toFixed(2)}, respectively.`}
          </li>
          <li>
            <strong>This is state-level data for one year.</strong>
            {" "}
            Vehicle ownership differs sharply between cities and rural areas inside a state, which this
            report cannot show. The {REPORT.acsYear} ACS was released on October 29, 2026, and the{" "}
            {REPORT.acsYear + 1} estimates are expected in fall {REPORT.acsYear + 2}. We will update the
            report after that release.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsVehicles,
          REPORT_SOURCES.acsAggregate,
          REPORT_SOURCES.acsIncome,
          REPORT_SOURCES.acsTenure,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
          REPORT_SOURCES.aaa,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for tables B25044 and B25046 were read from the Census Bureau's ACS 1-year Summary File on November 12, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the six vehicle groups add up to the household total, owners and renters add up to the household total, the owner count matches table B25003, and the published count of vehicles is at least the minimum implied by the groups. The AAA figures are quoted from its September 2026 fact sheet.`}
      />

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Cite or reuse this report</h2>
        <p className="mt-2 text-sm text-ink-600">
          The figures calculated by {site.name} (shares, ratios, margins of error, cost shares, rankings)
          are licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline"
          >
            CC BY 4.0
          </a>
          : you may copy, chart, and republish them, including commercially, with a link back to this
          page. The Census Bureau inputs are public domain.
        </p>
        <p className="mt-3 rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-700">{citation}</p>
        <p className="mt-3 text-sm text-ink-600">
          Want a calculator on your site?{" "}
          <Link href="/embed#auto-loan" className="text-brand-600 underline">
            Embed the auto loan calculator for free
          </Link>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink-900">Frequently asked questions</h2>
        <div className="mt-4 divide-y divide-ink-200 rounded-xl border border-ink-200 bg-white">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-5">
              <h3 className="text-base font-semibold text-ink-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink-900">Run your own numbers</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/calculators/car-affordability", label: "Car Affordability Calculator", note: "Test the 20/4/10 rule with your income" },
            { href: "/calculators/auto-loan", label: "Auto Loan Calculator", note: "See the payment and interest for any term" },
            { href: "/calculators/lease-vs-buy-car", label: "Lease vs Buy Car", note: "Compare the total cost of each option" },
            { href: "/calculators/budget-50-30-20", label: "50/30/20 Budget", note: "Fit car costs into your whole budget" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-ink-200 bg-white p-4 transition-shadow hover:shadow-card-hover"
            >
              <h3 className="text-sm font-semibold text-ink-800">{item.label}</h3>
              <p className="mt-1 text-xs text-ink-500">{item.note}</p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-600">
          Related: our{" "}
          <Link href="/reports/housing-cost-burden-by-state" className="text-brand-600 underline">
            housing cost burden by state report
          </Link>
          ,{" "}
          <Link href="/reports/rent-vs-buy-by-state" className="text-brand-600 underline">
            rent vs buy by state report
          </Link>
          ,{" "}
          <Link href="/reports/retirement-income-by-state" className="text-brand-600 underline">
            Social Security and retirement income by state report
          </Link>
          , and the guide{" "}
          <Link href="/guides/how-much-car-can-i-afford" className="text-brand-600 underline">
            how much car you can afford
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
