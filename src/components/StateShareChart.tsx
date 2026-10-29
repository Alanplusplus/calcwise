import Link from "next/link";
import {
  REPORT,
  STATE_RESULTS,
  US_RESULT,
  pct1,
  usd0,
} from "@/lib/reports/mortgage-affordability-by-state";

const longDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Home page "data card": the headline of the state affordability report with one bar per state.
 * Everything here is read from the report module, so it can never disagree with the report page.
 */
export function StateShareChart() {
  const guideline = REPORT.guidelinePct;
  const farAbove = guideline * 1.5;
  const total = STATE_RESULTS.length;
  const over = STATE_RESULTS.filter((r) => r.share > guideline).length;
  const best = STATE_RESULTS[0];
  const worst = STATE_RESULTS[total - 1];
  const maxShare = Math.ceil(worst.share / 10) * 10;
  const guidelineBottom = (guideline / maxShare) * 100;

  return (
    <aside
      aria-label="Data report: mortgage affordability by state"
      className="relative overflow-hidden rounded-2xl bg-brand-950 p-6 text-[#e6ecf5] shadow-panel ring-1 ring-gold-500/35 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl"
      />
      <div className="relative">
        <p className="eyebrow eyebrow-light">Data report · Updated {longDate.format(new Date(REPORT.dateModified))}</p>
        <h2 className="mt-3 text-[1.5rem] font-semibold leading-snug text-white">
          The median home against the median paycheck
        </h2>

        <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-3">
          <p className="numeral text-[3.5rem] font-semibold leading-none text-white sm:text-[4rem]">
            {usd0(US_RESULT.payment)}
            <span className="ml-1.5 text-lg font-medium text-[#b9c4d4]">/ month</span>
          </p>
          <p className="max-w-[13rem] pb-1.5 text-sm leading-snug text-[#b9c4d4]">
            Principal, interest, and property tax on the median U.S. home at {REPORT.mortgageRate.toFixed(2)}% with{" "}
            {REPORT.downPaymentPct}% down.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10 text-sm">
          <div className="bg-brand-950 p-4">
            <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#8d9bb0]">
              Share of median income
            </dt>
            <dd className="numeral mt-1 text-2xl font-semibold text-gold-200">{pct1(US_RESULT.share)}</dd>
          </div>
          <div className="bg-brand-950 p-4">
            <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#8d9bb0]">
              Places over {guideline}%
            </dt>
            <dd className="numeral mt-1 text-2xl font-semibold text-gold-200">
              {over} <span className="text-base font-medium text-[#8d9bb0]">of {total}</span>
            </dd>
          </div>
        </dl>

        <figure
          className="mt-6"
          role="img"
          aria-label={`Bar chart of the payment as a share of income for each of ${total} places, from ${best.name} at ${pct1(best.share)} to ${worst.name} at ${pct1(worst.share)}. ${over} are above the ${guideline}% guideline.`}
        >
          <div className="relative h-32" aria-hidden="true">
            <div
              className="absolute inset-x-0 z-10 border-t border-dashed border-gold-300/70"
              style={{ bottom: `${guidelineBottom}%` }}
            >
              <span className="absolute -top-5 left-0 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-gold-300">
                {guideline}% guideline
              </span>
            </div>
            <div className="absolute inset-0 flex items-end gap-[2px]">
              {STATE_RESULTS.map((r) => (
                <span
                  key={r.abbr}
                  className={`flex-1 rounded-t-[2px] ${
                    r.share <= guideline ? "bg-accent-400" : r.share <= farAbove ? "bg-gold-300" : "bg-[#e58f80]"
                  }`}
                  style={{ height: `${(r.share / maxShare) * 100}%` }}
                />
              ))}
            </div>
          </div>
          <figcaption className="mt-2 flex justify-between text-xs text-[#8d9bb0]" aria-hidden="true">
            <span>
              {best.name} {pct1(best.share)}
            </span>
            <span>
              {worst.name} {pct1(worst.share)}
            </span>
          </figcaption>
        </figure>

        <Link
          href={REPORT.path}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-200 transition-colors hover:text-white"
        >
          Explore all 50 states and DC
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </aside>
  );
}
