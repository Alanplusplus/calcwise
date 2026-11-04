"use client";

import { useMemo, useState } from "react";

export interface RentBuyTableRow {
  rank: number;
  name: string;
  abbr: string;
  rent: number;
  payment: number;
  ratio: number;
  ratioLow: number;
  ratioHigh: number;
  /** rate at which payment equals rent; null when not reachable at any rate of 0% or above */
  breakEvenRate: number | null;
  rentShare: number;
  renterBuyShare: number;
}

type SortKey =
  | "rank"
  | "name"
  | "rent"
  | "payment"
  | "ratio"
  | "breakEvenRate"
  | "rentShare"
  | "renterBuyShare";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "rent", label: "Median rent", align: "right" },
  { key: "payment", label: "Payment, median home", align: "right" },
  { key: "ratio", label: "Payment ÷ rent", align: "left" },
  { key: "breakEvenRate", label: "Break-even rate", align: "right" },
  { key: "rentShare", label: "Rent, % of renter income", align: "right" },
  { key: "renterBuyShare", label: "Payment, % of renter income", align: "right" },
];

const MODERATE = 1.25;
const HIGH = 1.75;

function sortValue(row: RentBuyTableRow, key: SortKey): string | number {
  if (key === "breakEvenRate") return row.breakEvenRate ?? -1;
  return row[key];
}

export function StateRentBuyTable({ rows }: { rows: RentBuyTableRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxRatio = Math.max(...rows.map((r) => r.ratioHigh));

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? rows.filter((r) => r.name.toLowerCase().includes(q) || r.abbr.toLowerCase() === q)
      : rows;
    return [...filtered].sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
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
            placeholder="e.g. Ohio or OH"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent-500" />
            Up to {MODERATE.toFixed(2)}x rent
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-warning" />
            {MODERATE.toFixed(2)}x to {HIGH.toFixed(2)}x
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-negative" />
            Over {HIGH.toFixed(2)}x
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[900px] text-sm">
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
                    className="inline-flex items-center gap-1 hover:text-brand-600"
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
                r.ratio <= MODERATE ? "bg-accent-500" : r.ratio <= HIGH ? "bg-warning" : "bg-negative";
              return (
                <tr key={r.abbr} className="transition-colors hover:bg-gold-50">
                  <td className="px-3 py-2 text-ink-500">{r.rank}</td>
                  <td className="px-3 py-2 font-medium text-ink-900">{r.name}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd.format(r.rent)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd.format(r.payment)}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="relative h-2.5 w-28 shrink-0 rounded-full bg-ink-100"
                        title={`90% range: ${r.ratioLow.toFixed(2)}x to ${r.ratioHigh.toFixed(2)}x`}
                      >
                        <div
                          className={`h-2.5 rounded-full ${color}`}
                          style={{ width: `${(r.ratio / maxRatio) * 100}%` }}
                        />
                        <div
                          className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                          style={{ left: `${(1 / maxRatio) * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="w-12 tabular-nums font-semibold text-ink-900">
                        {r.ratio.toFixed(2)}x
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                    {r.breakEvenRate === null ? "None" : `${r.breakEvenRate.toFixed(2)}%`}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.rentShare.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                    {r.renterBuyShare.toFixed(1)}%
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
        Rank 1 is the state where the payment on the median home is closest to the median rent. The thin
        vertical mark on each bar is 1.00x, where owning and renting cost the same. Hover a bar to see the
        90% range from the Census margins of error. “None” means the payment on the median home is above
        the median rent even at a 0% mortgage rate.
      </p>
    </div>
  );
}
