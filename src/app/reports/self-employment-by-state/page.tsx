import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateSelfEmploymentTable } from "@/components/StateSelfEmploymentTable";
import {
  CSV_HEADER,
  REPORT,
  REPORT_SOURCES,
  SE_TAX_BASIS,
  STATE_RESULTS,
  US_RESULT,
  correlation,
  count0,
  millions,
  pct1,
  selfEmploymentTax,
  usd0,
  type SelfEmploymentResult,
} from "@/lib/reports/self-employment-by-state";
import { site } from "@/lib/site";
import { MEDICARE_EMPLOYEE_RATE, SOCIAL_SECURITY_EMPLOYEE_RATE, TAX_DATA, usd } from "@/lib/tax-data";

const title = "Self-Employment Rate by State: Who Works for Themselves";
const h1 = "Self-Employment by State: Who Works for Themselves and What They Earn";

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Name for running text: "DC" reads better in a sentence than "District of Columbia", and avoids a double period at the end of a sentence. */
const short = (r: { abbr: string; name: string }) => (r.abbr === "DC" ? "DC" : r.name);

type Result = SelfEmploymentResult;

const sortedBy = (fn: (r: Result) => number) => [...STATE_RESULTS].sort((a, b) => fn(b) - fn(a));

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;

const byShare = STATE_RESULTS; // already ranked by the share of workers who are self-employed
const shareHigh = byShare[0];
const shareLow = byShare[total - 1];
const shareTop = byShare.slice(0, 5);
const shareBottom = byShare.slice(-4).reverse();
const aboveUs = byShare.filter((r) => r.seWorkerShare.pct > us.seWorkerShare.pct);
const moeMax = sortedBy((r) => r.seWorkerShare.moe)[0];
const moeWithin1 = STATE_RESULTS.filter((r) => r.seWorkerShare.moe <= 1).length;
const bySize = sortedBy((r) => r.seWorkers);
const biggest = bySize.slice(0, 3);

const byHh = sortedBy((r) => r.hhShare.pct);
const hhHigh = byHh[0];
const hhLow = byHh[total - 1];

const byMean = sortedBy((r) => r.seMean.value);
const meanHigh = byMean[0];
const meanLow = byMean[total - 1];
const meanAboveUs = byMean.filter((r) => r.seMean.value > us.seMean.value);

const byEarn = sortedBy((r) => r.earnShare.pct);
const earnHigh = byEarn[0];
const earnLow = byEarn[total - 1];

const byUninc = sortedBy((r) => r.unincShareOfSe.pct);
const unincHigh = byUninc[0];
const unincLow = byUninc[total - 1];
const incMajority = STATE_RESULTS.filter((r) => r.unincShareOfSe.pct < 50);

const byFemale = sortedBy((r) => r.femaleShareOfSe.pct);
const femHigh = byFemale[0];
const femLow = byFemale[total - 1];
const femMajority = STATE_RESULTS.filter((r) => r.femaleShareOfSe.pct >= 50);

const both = byShare.filter(
  (r) => r.seWorkerShare.pct > us.seWorkerShare.pct && r.seMean.value > us.seMean.value,
);

const corrIncome = correlation(
  STATE_RESULTS.map((r) => r.seWorkerShare.pct),
  STATE_RESULTS.map((r) => r.income),
);
const corrMeanIncome = correlation(
  STATE_RESULTS.map((r) => r.seMean.value),
  STATE_RESULTS.map((r) => r.income),
);
const corrHouseholds = correlation(
  STATE_RESULTS.map((r) => r.seWorkerShare.pct),
  STATE_RESULTS.map((r) => r.hhShare.pct),
);

// The copy below describes the sign and size of three correlations and says that exactly one state has a majority of incorporated owners
// and exactly one has a majority of women among the self-employed; fail the build if a data refresh changes any of that.
if (
  Math.abs(corrIncome) >= 0.3 ||
  corrMeanIncome < 0.4 ||
  corrHouseholds < 0.6 ||
  incMajority.length !== 1 ||
  femMajority.length !== 1
) {
  throw new Error("The self-employment findings no longer match the data. Rewrite the correlation and ranking findings.");
}

// ---- Self-employment tax on the mean self-employment income ----
const employeeRate = SOCIAL_SECURITY_EMPLOYEE_RATE + MEDICARE_EMPLOYEE_RATE;
const flatSeRate = ((SE_TAX_BASIS.socialSecurityRate + SE_TAX_BASIS.medicareRate) * SE_TAX_BASIS.earningsFactor) * 100;
const taxUs = selfEmploymentTax(us.seMean.value);
const taxRows = [
  { label: `Lowest mean (${short(meanLow)})`, mean: meanLow.seMean.value },
  { label: "United States", mean: us.seMean.value },
  { label: `Highest mean (${short(meanHigh)})`, mean: meanHigh.seMean.value },
].map((row) => {
  const t = selfEmploymentTax(row.mean);
  return { ...row, ...t, employee: row.mean * employeeRate };
});

if (taxRows.some((row) => row.earnings >= SE_TAX_BASIS.wageBase)) {
  throw new Error("A state mean now exceeds the Social Security wage base; the flat-rate wording on the page no longer holds.");
}

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  seShare: r.seWorkerShare.pct,
  seShareMoe: r.seWorkerShare.moe,
  unincShare: r.unincShareOfSe.pct,
  femaleShare: r.femaleShareOfSe.pct,
  hhShare: r.hhShare.pct,
  seMean: r.seMean.value,
  earnShare: r.earnShare.pct,
  seTax: r.seTaxOnMean,
}));

const exampleClauses: { r: Result; text: string }[] = [
  { r: shareHigh, text: "the largest share of workers who are self-employed" },
  { r: shareLow, text: "the smallest share" },
  { r: meanHigh, text: "the highest mean self-employment income" },
  { r: meanLow, text: "the lowest mean self-employment income" },
  { r: unincHigh, text: "the largest share of unincorporated owners" },
  { r: femHigh, text: "the largest share of women among the self-employed" },
  { r: biggest[0], text: "the most self-employed workers" },
];
const exampleGroups: { r: Result; texts: string[] }[] = [];
for (const c of exampleClauses) {
  const hit = exampleGroups.find((g) => g.r.abbr === c.r.abbr);
  if (hit) hit.texts.push(c.text);
  else exampleGroups.push({ r: c.r, texts: [c.text] });
}
const exampleRows = [
  { label: "United States", r: us as Omit<Result, "rank"> },
  ...exampleGroups.map((g) => ({ label: g.r.name, r: g.r as Omit<Result, "rank"> })),
];

const findings: { lead: string; body: string }[] = [
  {
    lead: `${pct1(us.seWorkerShare.pct)} of U.S. workers (${millions(us.seWorkers)} of ${millions(us.workers)}) run their own business.`,
    body: `${millions(us.uninc)} of them (${pct1(us.unincShareOfSe.pct)}) have an unincorporated business and ${millions(us.inc)} (${pct1(us.incShareOfSe.pct)}) have an incorporated one. The count covers employed civilians 16 and older and sorts each person by their main job, so someone who drives for a delivery app on weekends and works for a company on weekdays is counted as an employee.`,
  },
  {
    lead: `The share runs from ${pct1(shareLow.seWorkerShare.pct)} in ${short(shareLow)} to ${pct1(shareHigh.seWorkerShare.pct)} in ${short(shareHigh)}.`,
    body: `${longList(shareTop.map((r) => `${short(r)} (${pct1(r.seWorkerShare.pct)})`))} are the highest, and the lowest are ${longList(shareBottom.map((r) => `${short(r)} (${pct1(r.seWorkerShare.pct)})`))}. ${aboveUs.length} of ${total} places are above the national figure. The largest self-employed workforces are in ${longList(biggest.map((r) => `${short(r)} (${millions(r.seWorkers)})`))}. The margin of error on the share is within 1 point in ${moeWithin1} of ${total} places and at most ${moeMax.seWorkerShare.moe.toFixed(1)} points (${short(moeMax)}).`,
  },
  {
    lead: `${pct1(us.hhShare.pct)} of households report self-employment income, and the states that lead on workers lead on households.`,
    body: `${millions(us.se)} of ${millions(us.hh)} households had some self-employment income in the year, from ${pct1(hhLow.hhShare.pct)} in ${short(hhLow)} to ${pct1(hhHigh.hhShare.pct)} in ${short(hhHigh)}. The household count is a wider net than the worker count: it includes side income earned by people whose main job is a paycheck. Across the ${total} places the two shares have a correlation of ${corrHouseholds.toFixed(2)}.`,
  },
  {
    lead: `The average household that reports self-employment income made ${usd0(us.seMean.value)} from it.`,
    body: `That is the mean, with losses counted as negative amounts, and it runs from ${usd0(meanLow.seMean.value)} in ${short(meanLow)} to ${usd0(meanHigh.seMean.value)} in ${short(meanHigh)}. For comparison, the average household with wage or salary income received ${usd0(us.wageMean.value)} from wages, ${(us.wageMean.value / us.seMean.value).toFixed(1)} times as much, though a household can have several earners.`,
  },
  {
    lead: `Self-employment is ${pct1(us.earnShare.pct)} of earned income even though ${pct1(us.seWorkerShare.pct)} of workers are self-employed.`,
    body: `Adding self-employment income and wage and salary income across all households, self-employment is ${pct1(us.earnShare.pct)}, so the worker share is ${(us.seWorkerShare.pct / us.earnShare.pct).toFixed(1)} times the income share. It ranges from ${pct1(earnLow.earnShare.pct)} in ${short(earnLow)} to ${pct1(earnHigh.earnShare.pct)} in ${short(earnHigh)}. Part of the gap is side businesses with small profits and part is owners who pay themselves through wages, which the ACS counts as wage income.`,
  },
  {
    lead: `Where people work for themselves is unrelated to household income, but what self-employment pays follows it.`,
    body: `The share of workers who are self-employed has a correlation of ${corrIncome.toFixed(2)} with median household income across the ${total} places, so rich and poor states are equally likely to be at the top. The mean self-employment income has a correlation of ${corrMeanIncome.toFixed(2)} with it. ${meanAboveUs.length} places are above the national mean; ${both.length} combine an above-average share of self-employed workers with an above-average mean: ${longList(both.map((r) => short(r)))}.`,
  },
  {
    lead: `${pct1(us.unincShareOfSe.pct)} of the self-employed have an unincorporated business, and ${short(incMajority[0])} is the only place where incorporated owners are the majority.`,
    body: `The unincorporated share runs from ${pct1(unincLow.unincShareOfSe.pct)} in ${short(unincLow)} to ${pct1(unincHigh.unincShareOfSe.pct)} in ${short(unincHigh)}. The distinction matters for tax: an unincorporated owner usually reports profit on Schedule C and pays self-employment tax on all of it, while an owner of an incorporated business is usually paid wages with ordinary payroll tax. The Census Bureau goes by how the owner answers the question, which may differ from how the IRS treats the business.`,
  },
  {
    lead: `Women are ${pct1(us.femaleShareOfSe.pct)} of the self-employed but ${pct1(us.femaleShareOfWorkers.pct)} of all workers.`,
    body: `The share of women among the self-employed runs from ${pct1(femLow.femaleShareOfSe.pct)} in ${short(femLow)} to ${pct1(femHigh.femaleShareOfSe.pct)} in ${short(femHigh)}, the only place where they are half or more.`,
  },
  {
    lead: `Self-employment tax on the average self-employment income is ${usd0(taxUs.total)} under the ${SE_TAX_BASIS.taxYear} rules.`,
    body: `That is ${pct1(flatSeRate)} of net profit, because the income is far below the ${usd(SE_TAX_BASIS.wageBase)} Social Security wage base. An employee paid the same ${usd0(us.seMean.value)} would owe ${usd0(us.seMean.value * employeeRate)} (${pct1(employeeRate * 100)}), and the employer would pay a matching share. The self-employed pay both halves, and deduct the employer half, ${usd0(taxUs.total / 2)} here, when they compute income tax.`,
  },
];

const faqs = [
  {
    question: "What percentage of workers are self-employed?",
    answer: `In the ${REPORT.acsYear} American Community Survey, ${pct1(us.seWorkerShare.pct)} of employed U.S. workers (${millions(us.seWorkers)} of ${millions(us.workers)}) were self-employed in their own business, ${pct1(us.unincShareOfSe.pct)} of them unincorporated. By state the share runs from ${pct1(shareLow.seWorkerShare.pct)} in ${short(shareLow)} to ${pct1(shareHigh.seWorkerShare.pct)} in ${short(shareHigh)}. The 90% margin of error is within 1 percentage point in ${moeWithin1} of ${total} places and at most ${moeMax.seWorkerShare.moe.toFixed(1)} points (${short(moeMax)}); all are in the CSV. People are classified by their main job, so side businesses are not in this count.`,
  },
  {
    question: "Which state has the most self-employed people?",
    answer: `By share of workers, ${longList(shareTop.slice(0, 3).map((r) => `${short(r)} (${pct1(r.seWorkerShare.pct)})`))} lead, and ${longList(shareBottom.slice(0, 3).map((r) => `${short(r)} (${pct1(r.seWorkerShare.pct)})`))} have the smallest shares. By headcount, ${longList(biggest.map((r) => `${short(r)} (${millions(r.seWorkers)})`))} have the most self-employed workers because they are the largest states by workforce.`,
  },
  {
    question: "How much do self-employed people make on average?",
    answer: `Households that report any self-employment income averaged ${usd0(us.seMean.value)} from it in ${REPORT.acsYear}, from ${usd0(meanLow.seMean.value)} in ${short(meanLow)} to ${usd0(meanHigh.seMean.value)} in ${short(meanHigh)}. That is a mean per household, net of business expenses, with losses counted, and it includes small side businesses, so it is not the profit of a full-time freelancer. Our guide on how much a freelancer should charge shows the hourly rate needed to replace a salary.`,
  },
  {
    question: "How much self-employment tax does the average self-employed household owe?",
    answer: `Applying the ${SE_TAX_BASIS.taxYear} rules to the national mean of ${usd0(us.seMean.value)}: net earnings are ${usd0(taxUs.earnings)} after the ${(SE_TAX_BASIS.earningsFactor * 100).toFixed(2)}% adjustment, Social Security tax is ${usd0(taxUs.socialSecurity)}, Medicare tax is ${usd0(taxUs.medicare)}, and the total is ${usd0(taxUs.total)}, or ${pct1(flatSeRate)} of net profit. Half of it is deductible for income tax. Use the self-employment tax calculator for your own profit.`,
  },
  {
    question: "What is the difference between an incorporated and an unincorporated self-employed worker?",
    answer: `The Census Bureau counts a self-employed person as incorporated or not according to how they describe their own business. Nationally ${millions(us.uninc)} workers (${pct1(us.unincShareOfSe.pct)}) have an unincorporated business and ${millions(us.inc)} have an incorporated one. Sole proprietors and most single-member LLCs are taxed on their profit with self-employment tax; an S corporation pays its owner a wage. The IRS, not the Census Bureau, decides how a business is taxed.`,
  },
  {
    question: "Can I reuse the data from this report?",
    answer: `Yes. The figures calculated by ${site.name} are licensed under CC BY 4.0: use them anywhere, including commercially, with a link to this page. The underlying Census Bureau data are public domain.`,
  },
];

const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const description = `Share of workers who are self-employed in all 50 states and DC (${pct1(us.seWorkerShare.pct)} nationally), mean self-employment income, and the tax on it. ACS ${REPORT.acsYear}, free CSV.`;

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

const citation = `${site.name} (${new Date(REPORT.dateModified).getUTCFullYear()}). ${h1}. ${site.url}${REPORT.path}. Data: U.S. Census Bureau, ${REPORT.acsYear} American Community Survey 1-year estimates (B24080, B19053, B19063, B19052, B19062, B19013).`;

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data)`,
    description: `Self-employed workers (incorporated and unincorporated) as a share of employed workers, the share of women among them, households with self-employment income, mean self-employment income, self-employment income as a share of earned income, and the self-employment tax on the mean, with margins of error, for the 50 states, the District of Columbia, and the United States.`,
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
      "self employment rate by state",
      "percent of workers self employed by state",
      "how many people are self employed by state",
      "average self employment income by state",
      "self employment tax on average income",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsClass.href,
      REPORT_SOURCES.acsHouseholds.href,
      REPORT_SOURCES.acsAggregate.href,
      REPORT_SOURCES.acsWage.href,
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

const thClass = "px-3 py-2.5 text-right font-semibold";

export default function SelfEmploymentByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Self-Employment by State", href: REPORT.path },
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
        <span className="text-ink-700">Self-Employment by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        {`Published ${longDate.format(new Date(REPORT.datePublished))} · Data: Census ACS ${REPORT.acsYear} 1-year · Tables B24080, B19053, B19063, B19052, B19062`}
      </p>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          {`In the ${REPORT.acsYear} American Community Survey, `}
          <strong>{`${pct1(us.seWorkerShare.pct)} of U.S. workers`}</strong>
          {` (${millions(us.seWorkers)}) are self-employed in their own business, and ${pct1(us.unincShareOfSe.pct)} of them are unincorporated. The share runs from ${pct1(shareLow.seWorkerShare.pct)} in ${short(shareLow)} to ${pct1(shareHigh.seWorkerShare.pct)} in ${short(shareHigh)}. ${pct1(us.hhShare.pct)} of households report self-employment income, averaging `}
          <strong>{usd0(us.seMean.value)}</strong>
          {` a year among those that do, which carries ${usd0(taxUs.total)} of self-employment tax under the ${SE_TAX_BASIS.taxYear} rules.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Workers who are self-employed",
            value: pct1(us.seWorkerShare.pct),
            note: `${millions(us.seWorkers)} of ${millions(us.workers)} workers. ${short(shareLow)} ${pct1(shareLow.seWorkerShare.pct)} to ${short(shareHigh)} ${pct1(shareHigh.seWorkerShare.pct)}`,
          },
          {
            label: "Households with self-employment income",
            value: pct1(us.hhShare.pct),
            note: `${millions(us.se)} of ${millions(us.hh)} households. ${short(hhLow)} ${pct1(hhLow.hhShare.pct)} to ${short(hhHigh)} ${pct1(hhHigh.hhShare.pct)}`,
          },
          {
            label: "Mean self-employment income",
            value: usd0(us.seMean.value),
            note: `Per household that reports it. ${usd0(meanLow.seMean.value)} in ${short(meanLow)} to ${usd0(meanHigh.seMean.value)} in ${short(meanHigh)}`,
          },
          {
            label: "Self-employment tax on that mean",
            value: usd0(taxUs.total),
            note: `${pct1(flatSeRate)} of net profit, ${SE_TAX_BASIS.taxYear} rules. An employee at the same pay owes ${usd0(us.seMean.value * employeeRate)}`,
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

        <h2>What the average self-employment income owes in self-employment tax</h2>
        <p>
          {`Self-employed people pay both halves of Social Security and Medicare tax. The IRS multiplies net profit by ${(SE_TAX_BASIS.earningsFactor * 100).toFixed(2)}%, charges ${(SE_TAX_BASIS.socialSecurityRate * 100).toFixed(1)}% Social Security tax on that amount up to ${usd(SE_TAX_BASIS.wageBase)} and ${(SE_TAX_BASIS.medicareRate * 100).toFixed(1)}% Medicare tax on all of it. The table applies the ${SE_TAX_BASIS.taxYear} rules (checked ${TAX_DATA.checkedOnLabel}) to the mean self-employment income in this report. It is a what-if: the income was earned in ${REPORT.acsYear}, and it leaves out income tax, state tax, and the 0.9% Additional Medicare Tax, which starts at $200,000 for a single filer. The `}
          <Link href="/calculators/self-employment-tax" className="text-brand-600 underline">
            self-employment tax calculator
          </Link>
          {" "}
          runs it for your own profit, and the{" "}
          <Link href="/guides/self-employment-tax-guide" className="text-brand-600 underline">
            self-employment tax guide
          </Link>
          {" "}
          covers the deductions that lower the bill.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Mean self-employment income
              </th>
              <th scope="col" className={thClass}>
                Mean income
              </th>
              <th scope="col" className={thClass}>
                Net earnings (92.35%)
              </th>
              <th scope="col" className={thClass}>
                Social Security (12.4%)
              </th>
              <th scope="col" className={thClass}>
                Medicare (2.9%)
              </th>
              <th scope="col" className={thClass}>
                Total tax
              </th>
              <th scope="col" className={thClass}>
                Employee at the same pay
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {taxRows.map((row, i) => (
              <tr key={row.label} className={i === 1 ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{row.label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(row.mean)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(row.earnings)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(row.socialSecurity)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(row.medicare)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-900">{usd0(row.total)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(row.employee)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Below the ${usd(SE_TAX_BASIS.wageBase)} wage base the tax is a flat ${pct1(flatSeRate)} of net profit (15.3% of 92.35%). The employee column is ${pct1(employeeRate * 100)} of the same amount paid as wages; the employer pays a matching ${pct1(employeeRate * 100)} on top. Half of the self-employment tax is deductible when computing income tax.`}
      </p>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar is the share of employed workers who are
          self-employed in an own business; the other columns show how many of them are unincorporated and
          how many are women, how many households report self-employment income and what it averages, what
          share of earned income it is, and the self-employment tax on that average.
        </p>
        <div className="mt-4">
          <StateSelfEmploymentTable rows={tableRows} usShare={us.seWorkerShare.pct} />
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
        <h2>The extremes side by side</h2>
        <p>
          {`Each row shows the same measures for the places at the ends of the rankings: ${exampleGroups.map((g) => `${short(g.r)} has ${longList(g.texts)}`).join("; ")}.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Place
              </th>
              <th scope="col" className={thClass}>
                Self-employed workers
              </th>
              <th scope="col" className={thClass}>
                Households with self-employment income
              </th>
              <th scope="col" className={thClass}>
                Mean self-employment income
              </th>
              <th scope="col" className={thClass}>
                Self-employment, % of earned income
              </th>
              <th scope="col" className={thClass}>
                Unincorporated
              </th>
              <th scope="col" className={thClass}>
                Women
              </th>
              <th scope="col" className={thClass}>
                Median household income
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {exampleRows.map(({ label, r }, i) => (
              <tr key={label} className={i === 0 ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                  {`${pct1(r.seWorkerShare.pct)} (${count0(r.seWorkers)})`}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.hhShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.seMean.value)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.earnShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.unincShareOfSe.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.femaleShareOfSe.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.income)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The shaded row is the national figure. The first column shows the share of employed workers and, in parentheses, the number of self-employed workers. Unincorporated and women are shares of the self-employed. Income is in ${REPORT.acsYear} dollars before tax.`}
      </p>

      <div className="prose mt-10 max-w-none">
        <h2>Using this report</h2>
        <ul>
          <li>
            <strong>Put your own profit next to the average.</strong>
            {" "}
            {`The mean here is ${usd0(us.seMean.value)} per household that reports any self-employment income, and it includes side businesses. A full-time freelancer should compare against a salary, not against this mean: the guide `}
            <Link href="/guides/how-much-should-a-freelancer-charge" className="text-brand-600 underline">
              how much should a freelancer charge
            </Link>
            {" "}
            works out the rate that replaces a salary after tax, benefits, and unpaid time.
          </li>
          <li>
            <strong>Budget for the tax before you spend the revenue.</strong>
            {" "}
            {`Self-employment tax alone is ${pct1(flatSeRate)} of net profit before income tax. The `}
            <Link href="/calculators/self-employment-tax" className="text-brand-600 underline">
              self-employment tax calculator
            </Link>
            {" "}
            and the{" "}
            <Link href="/calculators/income-tax" className="text-brand-600 underline">
              income tax calculator
            </Link>
            {" "}
            give the quarterly amount to set aside.
          </li>
          <li>
            <strong>Check that the business covers its costs.</strong>
            {" "}
            {`Where the mean is ${usd0(meanLow.seMean.value)} (${short(meanLow)}), fixed costs matter more. The `}
            <Link href="/calculators/break-even" className="text-brand-600 underline">
              break-even calculator
            </Link>
            {" "}
            and the{" "}
            <Link href="/guides/break-even-analysis-guide" className="text-brand-600 underline">
              break-even analysis guide
            </Link>
            {" "}
            show how many sales it takes to pay for them.
          </li>
          <li>
            <strong>Compare a salary with a paycheck, not a gross number.</strong>
            {" "}
            {`The `}
            <Link href="/calculators/salary-to-hourly" className="text-brand-600 underline">
              salary to hourly calculator
            </Link>
            {" "}
            and the{" "}
            <Link href="/guides/salary-vs-hourly-pay" className="text-brand-600 underline">
              salary vs hourly pay guide
            </Link>
            {" "}
            show what a job pays per paid hour, and the{" "}
            <Link href="/reports/six-figure-households-by-state" className="text-brand-600 underline">
              six-figure households report
            </Link>
            {" "}
            shows how many households reach $100,000.
          </li>
        </ul>

        <h2>How the numbers were built</h2>
        <ul>
          <li>
            <strong>Self-employed workers</strong>
            {" "}
            are the civilian employed people 16 and older whose class of worker (B24080) is "self-employed in own
            incorporated business" or "self-employed in own not incorporated business", men and women added up.
            The share divides them by all employed workers, unpaid family workers included. The Census Bureau
            classifies each person by their main job, the one with the most hours in the week before the
            survey.
          </li>
          <li>
            <strong>Households with self-employment income</strong>
            {" "}
            (B19053) are the households in which anyone 15 or older had net income from a farm or nonfarm
            business, professional practice, or partnership in the past 12 months. Aggregate self-employment
            income (B19063) is the sum of those amounts in {REPORT.acsYear} dollars, receipts minus expenses, with
            losses included as negative amounts. The mean divides the aggregate by those households.
          </li>
          <li>
            <strong>Share of earned income</strong>
            {" "}
            is aggregate self-employment income divided by the sum of aggregate self-employment income (B19063)
            and aggregate wage and salary income (B19062) for all households. It ignores Social Security,
            retirement income, interest, and other sources.
          </li>
          <li>
            <strong>Self-employment tax</strong>
            {" "}
            uses the {SE_TAX_BASIS.taxYear} constants in the shared tax data (net earnings factor, the 12.4% and
            2.9% rates, and the Social Security wage base) and is applied to the mean, so it is a what-if rather
            than a measurement. It does not model the $400 minimum or the Additional Medicare Tax.
          </li>
          <li>
            <strong>Margins of error</strong>
            {" "}
            are the 90% margins published by the Census Bureau; those for shares, ratios, and sums follow the ACS
            General Handbook (chapter 8) and are in the CSV. The median household income column is table B19013,
            the same figure the other state reports use.
          </li>
        </ul>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>Side businesses are in the household count, not the worker count.</strong>
            {" "}
            A person with a paycheck and a weekend business is an employee in B24080 but adds a household to
            B19053. The two counts measure different things and should not be compared one for one:{" "}
            {millions(us.seWorkers)} workers have an own business as their main job, while {millions(us.se)}{" "}
            households had any self-employment income during the year.
          </li>
          <li>
            <strong>The mean is not a typical income.</strong>
            {" "}
            It includes losses and a long tail of high earners, and the tables used here publish no median for
            this income type. It is also per household, so a couple who both run businesses is one household.
          </li>
          <li>
            <strong>Incorporated is self-reported.</strong>
            {" "}
            People answer the class-of-worker question themselves, so an owner of a single-member LLC may check
            either box. Tax treatment is decided by the IRS.
          </li>
          <li>
            <strong>Owner wages are wage income.</strong>
            {" "}
            An owner of an incorporated business who pays themselves a salary shows up under wages in B19052 and
            B19062, so the share of earned income understates how much income comes from owning a business.
          </li>
          <li>
            <strong>The tax column is one tax.</strong>
            {" "}
            It is self-employment tax only, on a mean, under 2026 rules. Federal and state income tax, the
            qualified business income deduction, health insurance, and retirement contributions all change the
            real bill.
          </li>
          <li>
            <strong>State-level data for one year.</strong>
            {" "}
            The {REPORT.acsYear} ACS was released on October 29, 2026, and the {REPORT.acsYear + 1} estimates are
            expected in fall {REPORT.acsYear + 2}. We will update the report after that release.
          </li>
        </ul>
      </div>

      <Sources
        className="mt-8"
        items={[
          REPORT_SOURCES.acsClass,
          REPORT_SOURCES.acsHouseholds,
          REPORT_SOURCES.acsAggregate,
          REPORT_SOURCES.acsWage,
          REPORT_SOURCES.acsIncome,
          REPORT_SOURCES.acsTenure,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
          REPORT_SOURCES.irsSeTax,
          REPORT_SOURCES.ssaWageBase,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for tables B24080, B19053, B19063, B19052, and B19062 were read from the Census Bureau's ACS 1-year Summary File on November 23, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the household counts with and without each income type add up to the household total, which equals the B25003 household count; the class-of-worker rows add up to their totals; and the state rows add up exactly to the U.S. row for every count and for aggregate self-employment income. The self-employment tax constants come from the IRS and the Social Security Administration through the site's shared tax data (checked ${TAX_DATA.checkedOnLabel}).`}
      />

      <section className="mt-12 rounded-xl border border-ink-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Cite or reuse this report</h2>
        <p className="mt-2 text-sm text-ink-600">
          The figures calculated by {site.name} (shares, ratios, margins of error, rankings) are licensed
          under{" "}
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
          <Link href="/embed#salary-to-hourly" className="text-brand-600 underline">
            Embed the salary to hourly calculator for free
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
            { href: "/calculators/self-employment-tax", label: "Self-Employment Tax Calculator", note: "Tax on your own net profit" },
            { href: "/calculators/income-tax", label: "Income Tax Calculator", note: "Federal tax after deductions" },
            { href: "/calculators/break-even", label: "Break-Even Calculator", note: "Sales needed to cover your costs" },
            { href: "/calculators/salary-to-hourly", label: "Salary to Hourly Calculator", note: "Turn a salary into an hourly rate" },
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
          <Link href="/reports/six-figure-households-by-state" className="text-brand-600 underline">
            six-figure households by state report
          </Link>
          ,{" "}
          <Link href="/reports/retirement-income-by-state" className="text-brand-600 underline">
            Social Security and retirement income by state report
          </Link>
          ,{" "}
          <Link href="/reports/mortgage-affordability-by-state" className="text-brand-600 underline">
            mortgage affordability by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/how-much-should-a-freelancer-charge" className="text-brand-600 underline">
            how much should a freelancer charge
          </Link>
          ,{" "}
          <Link href="/guides/self-employment-tax-guide" className="text-brand-600 underline">
            self-employment tax explained
          </Link>
          , and{" "}
          <Link href="/guides/break-even-analysis-guide" className="text-brand-600 underline">
            break-even analysis
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
