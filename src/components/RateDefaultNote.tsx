import { Sources } from "@/components/Sources";
import { MORTGAGE_MARKET, MORTGAGE_MARKET_SOURCES } from "@/lib/market-data";

/**
 * Shown under a mortgage-family calculator's inputs while a rate field still holds a market
 * benchmark (the 30-year or the 15-year average), so the starting number is never an unexplained
 * assumption. Pass one rate, or every rate field of the calculator (e.g. the loan comparison tool).
 * Renders nothing once the visitor has replaced every benchmark value.
 */
export function RateDefaultNote({
  rate,
  field,
  className = "mt-3",
}: {
  rate: string | string[];
  /** Name of the field the note refers to, when the calculator has more than one rate input (e.g. "new rate"). */
  field?: string;
  className?: string;
}) {
  const rates = Array.isArray(rate) ? rate : [rate];
  const has30 = rates.includes(String(MORTGAGE_MARKET.thirtyYear));
  const has15 = rates.includes(String(MORTGAGE_MARKET.fifteenYear));
  if (!has30 && !has15) return null;

  const t30 = `30-year (${MORTGAGE_MARKET.thirtyYear.toFixed(2)}%)`;
  const t15 = `15-year (${MORTGAGE_MARKET.fifteenYear.toFixed(2)}%)`;
  const which = has30 && has15 ? `rates are the national ${t30} and ${t15} fixed averages` : `rate is the national ${has30 ? t30 : t15} fixed average`;

  return (
    <Sources
      items={MORTGAGE_MARKET_SOURCES}
      checked={MORTGAGE_MARKET.checkedLabel}
      className={className}
      note={
        <>
          The starting {which} for the week of {MORTGAGE_MARKET.asOfLabel}. Your lender’s quote will differ, so edit
          the {field ?? (has30 && has15 ? "rates" : "rate")} above.
        </>
      }
    />
  );
}
