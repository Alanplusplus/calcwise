"use client";

import { useMemo, useState } from "react";

export interface InsuranceTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** estimated median annual premium, owners with a mortgage (dollars) */
  median: number;
  /** published premium bracket that holds that median */
  bracket: string;
  /** percent of owners with a mortgage paying $3,000 or more a year */
  share3k: number;
  /** estimated median annual premium, owners without a mortgage (dollars) */
  freeMedian: number;
  /** estimated median premium as a percentage of the median home value */
  pctOfValue: number;
  /** estimated median premium divided by the median property tax bill */
  toTax: number;
  /** percentage points of gross income that insurance adds to the monthly payment */
  addsPts: number;
  /** full monthly payment (principal, interest, tax, insurance) as % of gross income */
  paymentShare: number;
}

type SortKey =
  | "rank"
  | "name"
  | "median"
  | "share3k"
  | "freeMedian"
  | "pctOfValue"
  | "toTax"
  | "addsPts"
  | "paymentShare";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "median", label: "Typical premium, with mortgage", align: "left" },
  { key: "share3k", label: "Paying $3,000+", align: "right" },
  { key: "freeMedian", label: "Typical premium, no mortgage", align: "right" },
  { key: "pctOfValue", label: "Premium, % of home value", align: "right" },
  { key: "toTax", label: "Premium ÷ property tax", align: "right" },
  { key: "addsPts", label: "Income points added", align: "right" },
  { key: "paymentShare", label: "Payment, % of income", align: "right" },
];

const LOWER = 1500;
const UPPER = 2000;

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StateInsuranceTable({
  rows,
  usMedian,
  guidelinePct,
}: {
  rows: InsuranceTableRow[];
  usMedian: number;
  guidelinePct: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxMedian = Math.max(...rows.map((r) => r.median));

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? rows.filter((r) => r.name.toLowerCase().includes(q) || r.abbr.toLowerCase() === q)
      : rows;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "string" && typeof bv === "string"
          ? av.localeCompare(bv)
          : (av as number) - (bv as number);
      return asc ? cmp : -cmp;
    });
  }, [rows, sortKey, asc, query]);

  function toggle(key: SortKey) {
    if (key === sortKey) {
      setAsc(!asc);
    } else {
      setSortKey(key);
      setAsc(key === "rank" || key === "name");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-ink-600">
          <span className="font-medium text-ink-800">Find a state</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Louisiana or LA"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent-500" />
            Under {usd0(LOWER)} a year
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-warning" />
            {usd0(LOWER)} to {usd0(UPPER - 1)}
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-negative" />
            {usd0(UPPER)} or more
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[960px] text-sm">
          <thead className="bg-paper-2 text-[0.6875rem] uppercase tracking-[0.07em] text-ink-600">
            <tr className="border-b-2 border-brand-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={col.key === sortKey ? (asc ? "ascending" : "descending") : "none"}
                  className={`px-3 py-3 font-semibold ${col.align === "right" ? "text-right" : "text-left"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(col.key)}
                    className="inline-flex items-center gap-1 text-left uppercase hover:text-brand-600"
                  >
                    {col.label}
                    <span aria-hidden="true" className="text-ink-400">
                      {col.key === sortKey ? (asc ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {visible.map((r) => {
              const color =
                r.median < LOWER ? "bg-accent-500" : r.median < UPPER ? "bg-warning" : "bg-negative";
              const over = r.paymentShare > guidelinePct;
              return (
                <tr key={r.abbr} className="transition-colors hover:bg-gold-50">
                  <td className="px-3 py-2 text-ink-500">{r.rank}</td>
                  <td className="px-3 py-2 font-medium text-ink-900">{r.name}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="relative h-2.5 w-24 shrink-0 rounded-full bg-ink-100"
                        title={`Estimated from the published bracket ${r.bracket} a year`}
                      >
                        <div
                          className={`h-2.5 rounded-full ${color}`}
                          style={{ width: `${(r.median / maxMedian) * 100}%` }}
                        />
                        <div
                          className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                          style={{ left: `${(usMedian / maxMedian) * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="w-14 tabular-nums font-semibold text-ink-900">{usd0(r.median)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.share3k.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.freeMedian)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.pctOfValue.toFixed(2)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.toTax.toFixed(2)}×</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                    +{r.addsPts.toFixed(1)} pts
                  </td>
                  <td
                    className={`px-3 py-2 text-right tabular-nums ${over ? "font-semibold text-negative" : "text-ink-700"}`}
                  >
                    {r.paymentShare.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-6 text-center text-ink-500">
                  No state matches that search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        Rank 1 is the state with the highest estimated median annual premium among owners with a mortgage.
        The Census Bureau publishes only brackets, so each median is estimated inside its bracket and the
        top few states are within the estimation error of one another. The thin vertical mark on each bar is
        the U.S. figure ({usd0(usMedian)}). Payment is principal, interest, property tax, and insurance on
        the median home with 20% down; figures in red are above {guidelinePct}% of the median household's
        gross income.
      </p>
    </div>
  );
}
