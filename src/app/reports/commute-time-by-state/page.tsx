import type { Metadata } from "next";
import { AuthorByline } from "@/components/AuthorByline";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Sources } from "@/components/Sources";
import { StateCommuteTable } from "@/components/StateCommuteTable";
import {
  BIN_LABELS,
  CSV_HEADER,
  JOB_HOURS_PER_YEAR,
  REPORT,
  REPORT_SOURCES,
  STATE_RESULTS,
  US_RESULT,
  commuteHoursPerYear,
  correlation,
  count0,
  millions,
  payDropPct,
  pct1,
  usd0,
  type CommuteResult,
} from "@/lib/reports/commute-time-by-state";
import { site } from "@/lib/site";
import { reportCitation, reportH1 } from "@/lib/reports/press";

const title = "Average Commute Time by State: Longest and Shortest";
const h1 = reportH1(REPORT.slug);

const longList = (items: string[]) =>
  items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Name for running text: "DC" reads better in a sentence than "District of Columbia", and avoids a double period at the end of a sentence. */
const short = (r: { abbr: string; name: string }) => (r.abbr === "DC" ? "DC" : r.name);

type Result = CommuteResult;

const sortedBy = (fn: (r: Result) => number) => [...STATE_RESULTS].sort((a, b) => fn(b) - fn(a));
const min1 = (n: number) => `${n.toFixed(1)} minutes`;
const hrs0 = (n: number) => `${Math.round(n).toLocaleString("en-US")} hours`;
const billions1 = (n: number) => `${(n / 1_000_000_000).toFixed(1)} billion`;

// ---- Derived facts used in the copy (all computed from the data module) ----
const us = US_RESULT;
const total = STATE_RESULTS.length;

const byMean = STATE_RESULTS; // already ranked by the mean one-way commute, longest first
const meanHigh = byMean[0];
const meanLow = byMean[total - 1];
const meanTop = byMean.slice(0, 5);
const meanBottom = byMean.slice(-4).reverse();
const aboveUs = byMean.filter((r) => r.meanMin.value > us.meanMin.value);
const moeMax = sortedBy((r) => r.meanMin.moe)[0];
const moeWithin1 = STATE_RESULTS.filter((r) => r.meanMin.moe <= 1).length;

const usHours = us.hoursYear.value;
const usWeeks = usHours / 40;
const hoursHigh = meanHigh.hoursYear.value;
const hoursLow = meanLow.hoursYear.value;

const byLong60 = sortedBy((r) => r.long60.pct);
const long60High = byLong60[0];
const long60Low = byLong60[total - 1];
const usLong60Count = us.bins[4] + us.bins[5];
const usUnder30 = us.binShares[0].pct + us.binShares[1].pct;

const byWfh = sortedBy((r) => r.wfhShare.pct);
const wfhHigh = byWfh[0];
const wfhLow = byWfh[total - 1];
const wfhTop = byWfh.slice(0, 4);
const wfhBottom = byWfh.slice(-4).reverse();
const wfhAbove15 = STATE_RESULTS.filter((r) => r.wfhShare.pct >= 15);
const wfhOverTransit = STATE_RESULTS.filter((r) => r.wfhShare.pct > r.transitShare.pct);
const wfhNotOverTransit = STATE_RESULTS.filter((r) => r.wfhShare.pct <= r.transitShare.pct);

const byTransit = sortedBy((r) => r.transitShare.pct);
const transitTop = byTransit.slice(0, 3);

const byAlone = sortedBy((r) => r.aloneShare.pct);
const aloneHigh = byAlone[0];
const aloneLow = byAlone[total - 1];

const byRatio = sortedBy((r) => r.earnRatio.value);
const ratioHigh = byRatio[0];
const ratioLow = byRatio[total - 1];
const ratio30 = STATE_RESULTS.filter((r) => r.earnRatio.value >= 1.3).length;

const corrIncomeMean = correlation(
  STATE_RESULTS.map((r) => r.meanMin.value),
  STATE_RESULTS.map((r) => r.income),
);
const corrIncomeWfh = correlation(
  STATE_RESULTS.map((r) => r.wfhShare.pct),
  STATE_RESULTS.map((r) => r.income),
);
const corrMeanLong = correlation(
  STATE_RESULTS.map((r) => r.meanMin.value),
  STATE_RESULTS.map((r) => r.long60.pct),
);
const corrMeanTransit = correlation(
  STATE_RESULTS.map((r) => r.meanMin.value),
  STATE_RESULTS.map((r) => r.transitShare.pct),
);
const corrMeanAlone = correlation(
  STATE_RESULTS.map((r) => r.meanMin.value),
  STATE_RESULTS.map((r) => r.aloneShare.pct),
);

// The copy below describes the sign and size of five correlations and says that exactly two places have as many transit commuters as
// remote workers or more; fail the build if a data refresh changes any of that.
if (
  corrMeanLong < 0.8 ||
  corrIncomeWfh < 0.5 ||
  corrIncomeMean < 0.3 ||
  corrIncomeMean >= 0.55 ||
  corrIncomeWfh <= corrIncomeMean ||
  corrMeanTransit < 0.5 ||
  corrMeanAlone > -0.4 ||
  wfhNotOverTransit.length !== 2
) {
  throw new Error("The commute findings no longer match the data. Rewrite the correlation and ranking findings.");
}

// ---- What the commute takes from the work year ----
const timeRows = [
  { label: `Shortest mean (${short(meanLow)})`, min: meanLow.meanMin.value },
  { label: "United States", min: us.meanMin.value },
  { label: `Longest mean (${short(meanHigh)})`, min: meanHigh.meanMin.value },
  { label: "A 60-minute commute each way", min: 60 },
  { label: "A 90-minute commute each way", min: 90 },
].map((row) => {
  const hours = commuteHoursPerYear(row.min);
  return { ...row, hours, weeks: hours / 40, add: (hours / JOB_HOURS_PER_YEAR) * 100, drop: payDropPct(hours) };
});

const tableRows = STATE_RESULTS.map((r) => ({
  rank: r.rank,
  name: r.name,
  abbr: r.abbr,
  meanMin: r.meanMin.value,
  meanMinMoe: r.meanMin.moe,
  hoursYear: r.hoursYear.value,
  long60: r.long60.pct,
  wfhShare: r.wfhShare.pct,
  aloneShare: r.aloneShare.pct,
  transitShare: r.transitShare.pct,
  earnRatio: r.earnRatio.value,
}));

const exampleClauses: { r: Result; text: string }[] = [
  { r: meanHigh, text: "the longest mean commute" },
  { r: meanLow, text: "the shortest" },
  { r: long60High, text: "the largest share of commuters at 60 minutes or more" },
  { r: wfhHigh, text: "the largest share of workers at home" },
  { r: wfhLow, text: "the smallest" },
  { r: ratioHigh, text: "the widest earnings gap between remote workers and solo drivers" },
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
    lead: `The average U.S. commuter travels ${min1(us.meanMin.value)} each way, and ${pct1(usUnder30)} of commuters get there in under 30 minutes.`,
    body: `That is the mean for the ${millions(us.commuters)} workers who did not work from home, out of ${millions(us.workers)} workers in all. It runs from ${min1(meanLow.meanMin.value)} in ${short(meanLow)} to ${min1(meanHigh.meanMin.value)} in ${short(meanHigh)}. ${longList(meanTop.map((r) => `${short(r)} (${r.meanMin.value.toFixed(1)})`))} have the longest commutes, and ${longList(meanBottom.map((r) => `${short(r)} (${r.meanMin.value.toFixed(1)})`))} have the shortest. ${aboveUs.length} of ${total} places are above the national mean. The margin of error is within 1 minute in ${moeWithin1} of ${total} places and at most ${moeMax.meanMin.moe.toFixed(2)} minutes (${short(moeMax)}).`,
  },
  {
    lead: `A ${us.meanMin.value.toFixed(1)}-minute trip each way is ${hrs0(usHours)} a year, about ${usWeeks.toFixed(1)} full workweeks.`,
    body: `The figure doubles the one-way mean for the round trip and multiplies it by ${REPORT.commuteDays} commuting days. By state it runs from ${hrs0(hoursLow)} in ${short(meanLow)} to ${hrs0(hoursHigh)} in ${short(meanHigh)}, a gap of ${hrs0(hoursHigh - hoursLow)}. Added together, the ${millions(us.commuters)} commuters spend about ${billions1(us.totalHours.value)} hours a year getting to and from work under the same assumption.`,
  },
  {
    lead: `Counting the commute as time given to the job cuts the average worker's effective hourly pay by ${pct1(us.payDrop.pct)}.`,
    body: `A worker on the job ${count0(JOB_HOURS_PER_YEAR)} hours a year who adds ${hrs0(usHours)} of travel gives up ${pct1(us.payDrop.pct)} of each hour's pay compared with a worker who has no commute. The drop runs from ${pct1(meanLow.payDrop.pct)} in ${short(meanLow)} to ${pct1(meanHigh.payDrop.pct)} in ${short(meanHigh)}. It is an effect of time only; the cost of fuel, tolls, and parking comes on top.`,
  },
  {
    lead: `${pct1(us.long60.pct)} of commuters (${millions(usLong60Count)}) travel 60 minutes or more each way, and ${pct1(us.binShares[5].pct)} travel 90 or more.`,
    body: `The share runs from ${pct1(long60Low.long60.pct)} in ${short(long60Low)} to ${pct1(long60High.long60.pct)} in ${short(long60High)}. A state's mean commute is mostly a measure of its long tail: across the ${total} places the mean and the share at 60 minutes or more have a correlation of ${corrMeanLong.toFixed(2)}. The shortest group, under 15 minutes, holds ${pct1(us.binShares[0].pct)} of commuters nationally.`,
  },
  {
    lead: `${pct1(us.wfhShare.pct)} of workers (${millions(us.wfh)}) worked from home, from ${pct1(wfhLow.wfhShare.pct)} in ${short(wfhLow)} to ${pct1(wfhHigh.wfhShare.pct)} in ${short(wfhHigh)}.`,
    body: `${longList(wfhTop.map((r) => `${short(r)} (${pct1(r.wfhShare.pct)})`))} are the highest, and the lowest are ${longList(wfhBottom.map((r) => `${short(r)} (${pct1(r.wfhShare.pct)})`))}. ${wfhAbove15.length} of ${total} places are at 15% or higher. In ${wfhOverTransit.length} of ${total} places more workers work from home than ride public transportation; the exceptions are ${longList(wfhNotOverTransit.map((r) => short(r)))}.`,
  },
  {
    lead: `Higher-income states have both longer commutes and more remote work.`,
    body: `Across the ${total} places the mean commute has a correlation of ${corrIncomeMean.toFixed(2)} with median household income, and the share of workers at home has a correlation of ${corrIncomeWfh.toFixed(2)}. Both are positive and the second is stronger. Neither means income causes the pattern: large, dense, expensive metro areas raise the pay and lengthen the trip at the same time.`,
  },
  {
    lead: `${pct1(us.aloneShare.pct)} of workers drive alone, and places with more transit riders tend to have longer commutes.`,
    body: `${pct1(us.poolShare.pct)} carpool, ${pct1(us.transitShare.pct)} take public transportation, ${pct1(us.walkBikeShare.pct)} walk or bicycle, and ${pct1(us.otherShare.pct)} use another means. The drive-alone share runs from ${pct1(aloneLow.aloneShare.pct)} in ${short(aloneLow)} to ${pct1(aloneHigh.aloneShare.pct)} in ${short(aloneHigh)}. The mean commute has a correlation of ${corrMeanTransit.toFixed(2)} with the transit share and ${corrMeanAlone.toFixed(2)} with the drive-alone share. ${longList(transitTop.map((r) => `${short(r)} (${pct1(r.transitShare.pct)})`))} have the most transit commuters.`,
  },
  {
    lead: `Workers who work from home had median earnings of ${usd0(us.earnWfh)}, ${us.earnRatio.value.toFixed(2)} times the ${usd0(us.earnAlone)} of workers who drove alone.`,
    body: `In ${ratio30} of ${total} places the work-from-home median is at least 1.3 times the drive-alone median. The ratio is highest in ${short(ratioHigh)} (${ratioHigh.earnRatio.value.toFixed(2)}) and lowest in ${short(ratioLow)} (${ratioLow.earnRatio.value.toFixed(2)}, with a margin of error of ±${ratioLow.earnRatio.moe.toFixed(2)}). The gap most likely reflects who has jobs that can be done remotely, such as office and professional work, rather than a raise for staying home; the tables cannot separate the two.`,
  },
];

const faqs = [
  {
    question: "What is the average commute time in the United States?",
    answer: `In the ${REPORT.acsYear} American Community Survey, workers who did not work from home spent a mean of ${min1(us.meanMin.value)} getting to work one way. By state the mean runs from ${min1(meanLow.meanMin.value)} in ${short(meanLow)} to ${min1(meanHigh.meanMin.value)} in ${short(meanHigh)}. The margin of error is within 1 minute in ${moeWithin1} of ${total} places and at most ${moeMax.meanMin.moe.toFixed(2)} minutes (${short(moeMax)}); all are in the CSV. The Census Bureau counts the whole trip, including time waiting for a bus or picking up a carpool passenger.`,
  },
  {
    question: "Which state has the longest commute?",
    answer: `${longList(meanTop.slice(0, 3).map((r) => `${short(r)} (${r.meanMin.value.toFixed(1)} minutes)`))} have the longest mean one-way commutes, and ${longList(meanBottom.slice(0, 3).map((r) => `${short(r)} (${r.meanMin.value.toFixed(1)} minutes)`))} have the shortest. By the share of commuters traveling 60 minutes or more each way, ${short(long60High)} is highest at ${pct1(long60High.long60.pct)}.`,
  },
  {
    question: "How many hours a year does the average person spend commuting?",
    answer: `About ${hrs0(usHours)} for a worker with the national mean commute of ${min1(us.meanMin.value)} each way, assuming ${REPORT.commuteDays} commuting days (5 days a week for 50 weeks). That is ${usWeeks.toFixed(1)} workweeks of 40 hours. In ${short(meanHigh)} the same calculation gives ${hrs0(hoursHigh)} and in ${short(meanLow)} ${hrs0(hoursLow)}. A worker with a 60-minute trip each way spends ${hrs0(timeRows[3].hours)}, and one with 90 minutes spends ${hrs0(timeRows[4].hours)}. Fewer office days lower the figure in proportion.`,
  },
  {
    question: "What percentage of workers work from home?",
    answer: `${pct1(us.wfhShare.pct)} of workers 16 and over (${millions(us.wfh)} of ${millions(us.workers)}) worked from home in the ${REPORT.acsYear} ACS. The share runs from ${pct1(wfhLow.wfhShare.pct)} in ${short(wfhLow)} to ${pct1(wfhHigh.wfhShare.pct)} in ${short(wfhHigh)}. Respondents report the means of transportation they used on most days of the survey week, so a hybrid worker who is home most days counts as working from home and one who is in the office most days counts under the way they travel.`,
  },
  {
    question: "How much does a commute reduce your hourly pay?",
    answer: `If you count the round trip as time given to the job, the national mean commute of ${min1(us.meanMin.value)} each way adds ${hrs0(usHours)} to ${count0(JOB_HOURS_PER_YEAR)} hours on the job and lowers effective hourly pay by ${pct1(us.payDrop.pct)}. A 60-minute commute each way lowers it by ${pct1(timeRows[3].drop)} and a 90-minute commute by ${pct1(timeRows[4].drop)}. Fuel and car costs lower it further. Our guide on whether a long commute is worth it shows the raise needed to make up for each extra minute.`,
  },
  {
    question: "Do people who work from home earn more?",
    answer: `On average, yes: the median earnings of workers who worked from home were ${usd0(us.earnWfh)} against ${usd0(us.earnAlone)} for workers who drove alone, a ratio of ${us.earnRatio.value.toFixed(2)}. The ratio is at least 1.3 in ${ratio30} of ${total} places. It does not show that working from home raises pay; jobs that can be done remotely tend to be professional and managerial jobs, and the medians include part-time and part-year workers.`,
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

const description = `Mean one-way commute in all 50 states and DC (${us.meanMin.value.toFixed(1)} minutes nationally), hours a year, commuters at 60+ minutes, and remote work. ACS ${REPORT.acsYear}, free CSV.`;

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

const citation = reportCitation(REPORT.slug);

function DatasetJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${h1} (${REPORT.acsYear} ACS data)`,
    description: `Mean one-way travel time to work, round-trip commute hours a year, the share of commuters traveling 60 minutes or more, the share of workers who drive alone, take public transportation, and work from home, and median earnings by means of transportation, with margins of error, for the 50 states, the District of Columbia, and the United States.`,
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
      "average commute time by state",
      "longest commute by state",
      "work from home percentage by state",
      "how many hours a year do people spend commuting",
      "average commute time in the united states",
    ],
    isBasedOn: [
      REPORT_SOURCES.acsTransport.href,
      REPORT_SOURCES.acsTravelTime.href,
      REPORT_SOURCES.acsAggregate.href,
      REPORT_SOURCES.acsEarnings.href,
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
const linkClass = "text-brand-600 underline";

export default function CommuteTimeByStatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Data Reports", href: "/reports" },
          { name: "Commute Time by State", href: REPORT.path },
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
        <span className="text-ink-700">Commute Time by State</span>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      <p className="mt-3 text-sm text-ink-500">
        {`Published ${longDate.format(new Date(REPORT.datePublished))} · Data: Census ACS ${REPORT.acsYear} 1-year · Tables B08301, B08303, B08013, B08121`}
      </p>
      <AuthorByline />

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <p className="eyebrow">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-ink-800">
          {`In the ${REPORT.acsYear} American Community Survey, the average U.S. commuter spends `}
          <strong>{min1(us.meanMin.value)}</strong>
          {` getting to work each way, which is about `}
          <strong>{hrs0(usHours)}</strong>
          {` a year for the round trip. The mean runs from ${min1(meanLow.meanMin.value)} in ${short(meanLow)} to ${min1(meanHigh.meanMin.value)} in ${short(meanHigh)}. ${pct1(us.long60.pct)} of commuters travel 60 minutes or more each way, and `}
          <strong>{`${pct1(us.wfhShare.pct)} of workers`}</strong>
          {` work from home, from ${pct1(wfhLow.wfhShare.pct)} in ${short(wfhLow)} to ${pct1(wfhHigh.wfhShare.pct)} in ${short(wfhHigh)}.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Mean one-way commute",
            value: `${us.meanMin.value.toFixed(1)} min`,
            note: `${millions(us.commuters)} commuters. ${short(meanLow)} ${meanLow.meanMin.value.toFixed(1)} to ${short(meanHigh)} ${meanHigh.meanMin.value.toFixed(1)} minutes`,
          },
          {
            label: "Round-trip hours a year",
            value: Math.round(usHours).toLocaleString("en-US"),
            note: `${usWeeks.toFixed(1)} workweeks at ${REPORT.commuteDays} commuting days. ${Math.round(hoursLow)} in ${short(meanLow)} to ${Math.round(hoursHigh)} in ${short(meanHigh)}`,
          },
          {
            label: "Commuters at 60+ minutes",
            value: pct1(us.long60.pct),
            note: `${millions(usLong60Count)} people each way. ${short(long60Low)} ${pct1(long60Low.long60.pct)} to ${short(long60High)} ${pct1(long60High.long60.pct)}`,
          },
          {
            label: "Workers who work from home",
            value: pct1(us.wfhShare.pct),
            note: `${millions(us.wfh)} of ${millions(us.workers)} workers. ${short(wfhLow)} ${pct1(wfhLow.wfhShare.pct)} to ${short(wfhHigh)} ${pct1(wfhHigh.wfhShare.pct)}`,
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

        <h2>What the commute takes from the work year</h2>
        <p>
          {`The Census Bureau measures minutes per trip, which hides the size of the total. The table turns a one-way trip into the hours a worker gives up in a year, at ${REPORT.commuteDays} commuting days, and compares them with ${count0(JOB_HOURS_PER_YEAR)} hours on the job (${REPORT.commuteDays} days of ${REPORT.workdayHours} hours). The last column is the share of an hour of pay that disappears if the round trip counts as time given to the job. It covers time only; for the money side, including fuel and the raise a longer commute needs, see the guide `}
          <Link href="/guides/is-a-long-commute-worth-it" className={linkClass}>
            is a long commute worth it
          </Link>
          {" "}
          and the{" "}
          <Link href="/calculators/salary-to-hourly" className={linkClass}>
            salary to hourly calculator
          </Link>
          .
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Commute
              </th>
              <th scope="col" className={thClass}>
                One way
              </th>
              <th scope="col" className={thClass}>
                Round trip, hours a year
              </th>
              <th scope="col" className={thClass}>
                Workweeks of 40 hours
              </th>
              <th scope="col" className={thClass}>
                Added to the hours on the job
              </th>
              <th scope="col" className={thClass}>
                Effective hourly pay lost
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {timeRows.map((row, i) => (
              <tr key={row.label} className={i === 1 ? "bg-brand-50 font-semibold" : ""}>
                <td className="px-3 py-2 text-ink-800">{row.label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{min1(row.min)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{Math.round(row.hours).toLocaleString("en-US")}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{row.weeks.toFixed(1)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(row.add)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-900">{pct1(row.drop)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Hours a year = one-way minutes × 2 × ${REPORT.commuteDays} ÷ 60. Pay lost = commute hours ÷ (${count0(JOB_HOURS_PER_YEAR)} + commute hours). A worker who is in the office fewer days spends proportionally fewer hours: three office days a week is 60% of the figures shown.`}
      </p>

      <section className="mt-12" id="state-table">
        <h2 className="text-2xl font-bold text-ink-900">All 50 states and DC, ranked</h2>
        <p className="mt-2 text-ink-600">
          Sort any column or search for your state. The bar is the mean one-way travel time of workers who
          do not work from home; the other columns show the hours that adds up to in a year, how many commuters
          travel 60 minutes or more, how workers get there or stay home, and how the median earnings of remote
          workers compare with those of workers who drive alone.
        </p>
        <div className="mt-4">
          <StateCommuteTable rows={tableRows} usMean={us.meanMin.value} />
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
        <h2>How long the trip is, group by group</h2>
        <p>
          {`The mean hides how the trips are spread out. Nationally, ${pct1(usUnder30)} of commuters travel under 30 minutes one way, and the groups below add up to 100%. The long tail is small but heavy: the ${pct1(us.binShares[4].pct)} of commuters in the 60 to 89 minute group and the ${pct1(us.binShares[5].pct)} at 90 minutes or more make up ${pct1(us.long60.pct)} of commuters, and each of them spends at least ${hrs0(commuteHoursPerYear(60))} a year on the road at ${REPORT.commuteDays} commuting days.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                One-way travel time
              </th>
              <th scope="col" className={thClass}>
                U.S. commuters
              </th>
              <th scope="col" className={thClass}>
                Share of commuters
              </th>
              <th scope="col" className={thClass}>
                Lowest state
              </th>
              <th scope="col" className={thClass}>
                Highest state
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {BIN_LABELS.map((label, i) => {
              const sorted = sortedBy((r) => r.binShares[i].pct);
              const hi = sorted[0];
              const lo = sorted[total - 1];
              return (
                <tr key={label}>
                  <td className="px-3 py-2 text-ink-800">{label}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{count0(us.bins[i])}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-900">{pct1(us.binShares[i].pct)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                    {`${pct1(lo.binShares[i].pct)} (${short(lo)})`}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                    {`${pct1(hi.binShares[i].pct)} (${short(hi)})`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`Commuters are workers 16 and over who did not work from home (${count0(us.commuters)} nationally). The six groups combine the Census Bureau's twelve published travel-time ranges.`}
      </p>

      <div className="prose mt-12 max-w-none">
        <h2>The extremes side by side</h2>
        <p>
          {`Each row shows the same measures for the places at the ends of the rankings: ${exampleGroups.map((g) => `${short(g.r)} has ${longList(g.texts)}`).join("; ")}.`}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full min-w-[960px] text-sm">
          <thead className="bg-ink-50 text-xs text-ink-600">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                Place
              </th>
              <th scope="col" className={thClass}>
                Mean one-way commute
              </th>
              <th scope="col" className={thClass}>
                Commuters at 60+ minutes
              </th>
              <th scope="col" className={thClass}>
                Work from home
              </th>
              <th scope="col" className={thClass}>
                Drive alone
              </th>
              <th scope="col" className={thClass}>
                Public transit
              </th>
              <th scope="col" className={thClass}>
                Median earnings, at home
              </th>
              <th scope="col" className={thClass}>
                Median earnings, drive alone
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
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{min1(r.meanMin.value)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.long60.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.wfhShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.aloneShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{pct1(r.transitShare.pct)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.earnWfh)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.earnAlone)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.income)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {`The shaded row is the national figure. Work from home, drive alone, and public transit are shares of all workers; 60+ minutes is a share of commuters. Earnings are median earnings in the past 12 months in ${REPORT.acsYear} dollars before tax, for workers with earnings.`}
      </p>

      <div className="prose mt-10 max-w-none">
        <h2>Using this report</h2>
        <ul>
          <li>
            <strong>Price your own commute, not the average.</strong>
            {" "}
            {`The mean here is ${min1(us.meanMin.value)} each way, but the cost of a commute grows with every extra minute: at 60 minutes each way the time alone takes ${pct1(timeRows[3].drop)} of each hour's pay. The guide `}
            <Link href="/guides/is-a-long-commute-worth-it" className={linkClass}>
              is a long commute worth it
            </Link>
            {" "}
            works out the raise a longer job needs once fuel and time are counted.
          </li>
          <li>
            <strong>Turn a salary into pay per hour that includes the drive.</strong>
            {" "}
            {`The `}
            <Link href="/calculators/salary-to-hourly" className={linkClass}>
              salary to hourly calculator
            </Link>
            {" "}
            gives the hourly rate for the hours on the job; add your round-trip hours from the table to see the lower figure, and use the{" "}
            <Link href="/calculators/paycheck" className={linkClass}>
              paycheck calculator
            </Link>
            {" "}
            for take-home pay.
          </li>
          <li>
            <strong>Count the car as part of the commute.</strong>
            {" "}
            {`${pct1(us.aloneShare.pct)} of workers drive alone, so most commutes carry fuel, maintenance, and wear. The `}
            <Link href="/reports/car-ownership-by-state" className={linkClass}>
              car ownership by state report
            </Link>
            {" "}
            shows what insurance and fuel take of income, and the{" "}
            <Link href="/calculators/car-affordability" className={linkClass}>
              car affordability calculator
            </Link>
            {" "}
            sets a budget for the vehicle.
          </li>
          <li>
            <strong>Compare the housing cost of a shorter trip.</strong>
            {" "}
            {`Living closer to work usually costs more per month. The `}
            <Link href="/reports/rent-vs-buy-by-state" className={linkClass}>
              rent vs. buy by state report
            </Link>
            {" "}
            and the{" "}
            <Link href="/reports/housing-cost-burden-by-state" className={linkClass}>
              housing cost burden report
            </Link>
            {" "}
            show what rent and a home payment take of income, and the{" "}
            <Link href="/calculators/home-affordability" className={linkClass}>
              home affordability calculator
            </Link>
            {" "}
            tests a specific price.
          </li>
        </ul>

        <h2>How the numbers were built</h2>
        <ul>
          <li>
            <strong>Workers and commuters</strong>
            {" "}
            are people 16 and over who were at work in the survey week (B08301). Commuters are the workers who did
            not work from home (B08303), so the travel-time figures describe them only. Each respondent reports the
            means of transportation used on most days of the week.
          </li>
          <li>
            <strong>Mean one-way commute</strong>
            {" "}
            is the aggregate travel time to work in minutes (B08013) divided by the commuters (B08303). Travel time
            is the total number of minutes it usually took to get from home to work in the survey week, including
            waiting for public transportation and picking up carpool passengers.
          </li>
          <li>
            <strong>Hours a year and the pay lost</strong>
            {" "}
            {`are what-ifs, not measurements. The one-way mean is doubled for the round trip and multiplied by ${REPORT.commuteDays} commuting days (5 days a week for 50 weeks). The pay lost is the commute hours divided by the ${count0(JOB_HOURS_PER_YEAR)} hours on the job (${REPORT.commuteDays} days of ${REPORT.workdayHours} hours) plus the commute hours.`}
          </li>
          <li>
            <strong>Travel-time groups</strong>
            {" "}
            add up the Census Bureau's twelve ranges: under 15 minutes (the first three ranges), 15 to 29, 30 to
            44, 45 to 59, 60 to 89, and 90 or more. The share at 60 minutes or more adds the last two.
          </li>
          <li>
            <strong>Means of transportation</strong>
            {" "}
            are shares of all workers, including those at home. Drove alone and carpooled are the two parts of
            car, truck, or van; public transportation excludes taxicabs; other means is taxi or ride-hailing,
            motorcycle, and other means.
          </li>
          <li>
            <strong>Median earnings</strong>
            {" "}
            (B08121) are for workers with earnings in the past 12 months, by the means of transportation they used
            to get to work. The ratio divides the median for workers who worked from home by the median for workers
            who drove alone.
          </li>
          <li>
            <strong>Margins of error</strong>
            {" "}
            are the 90% margins published by the Census Bureau; those for sums, shares, and ratios follow the ACS
            General Handbook (chapter 8) and are in the CSV. The median household income column is table B19013,
            the same figure the other state reports use.
          </li>
        </ul>

        <h2>What this report does not capture</h2>
        <ul>
          <li>
            <strong>Hybrid work is counted one way.</strong>
            {" "}
            A worker who is in the office two days and at home three counts as working from home; one who is in the
            office three days counts under the way they travel. The report cannot show how many days a commuter
            actually travels, so the hours a year overstate the time of anyone who goes in fewer than 250 days.
          </li>
          <li>
            <strong>Distance and cost are not in the data.</strong>
            {" "}
            The tables give minutes, not miles, so the report does not price the drive. Two commutes of the same
            length cost different amounts if one is a 15-mile highway trip and the other a 5-mile crawl.
          </li>
          <li>
            <strong>The mean is not the typical commute.</strong>
            {" "}
            It is pulled up by the long tail of trips of an hour or more, and these tables publish no median travel
            time. The travel-time groups show how the trips are spread out.
          </li>
          <li>
            <strong>Earnings by means of transportation are not causal.</strong>
            {" "}
            Workers who work from home differ in occupation, education, age, and hours from those who drive alone.
            The medians also include part-time and part-year workers, so they are not annual salaries.
          </li>
          <li>
            <strong>Pay lost covers time only.</strong>
            {" "}
            It leaves out fuel, tolls, parking, and wear on the car, and it treats every commute hour as equal to
            an hour on the job, which a train commute spent reading or working may not be.
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
          REPORT_SOURCES.acsTransport,
          REPORT_SOURCES.acsTravelTime,
          REPORT_SOURCES.acsAggregate,
          REPORT_SOURCES.acsEarnings,
          REPORT_SOURCES.acsIncome,
          REPORT_SOURCES.acsFile,
          REPORT_SOURCES.acsDefinitions,
        ]}
        checked="November 2026"
        note={`The estimates and margins of error for tables B08301, B08303, B08013, and B08121 were read from the Census Bureau's ACS 1-year Summary File on November 28, 2026. The Census API requires a key, so the Summary File was used instead. In all ${total + 1} places the nine means of transportation add up to the worker total, the commuters equal the workers minus those who worked from home, and the travel-time ranges add up to the commuters; the state rows add up exactly to the U.S. row for every count and for the aggregate travel time. The Census Bureau rounds each aggregate to a multiple of 5 minutes.`}
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
          Writing about this data? The{" "}
          <Link href="/reports/press" className="text-brand-600 underline">
            press page
          </Link>{" "}
          has a citation for every report, the data dictionary of each CSV, and the limits of the data.
        </p>
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
            { href: "/calculators/salary-to-hourly", label: "Salary to Hourly Calculator", note: "Turn a salary into an hourly rate" },
            { href: "/calculators/paycheck", label: "Paycheck Calculator", note: "Take-home pay after tax" },
            { href: "/calculators/car-affordability", label: "Car Affordability Calculator", note: "A vehicle budget that fits your income" },
            { href: "/calculators/home-affordability", label: "Home Affordability Calculator", note: "What a home closer to work can cost" },
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
          <Link href="/reports/car-ownership-by-state" className={linkClass}>
            car ownership by state report
          </Link>
          ,{" "}
          <Link href="/reports/six-figure-households-by-state" className={linkClass}>
            six-figure households by state report
          </Link>
          ,{" "}
          <Link href="/reports/rent-vs-buy-by-state" className={linkClass}>
            rent vs. buy by state report
          </Link>
          , and the guides{" "}
          <Link href="/guides/is-a-long-commute-worth-it" className={linkClass}>
            is a long commute worth it
          </Link>
          ,{" "}
          <Link href="/guides/salary-vs-hourly-pay" className={linkClass}>
            salary vs hourly pay
          </Link>
          , and{" "}
          <Link href="/guides/how-much-car-can-i-afford" className={linkClass}>
            how much car can I afford
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
