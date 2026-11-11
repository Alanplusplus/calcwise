"use client";

import { useMemo, useState } from "react";

export interface BurdenTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** percent of renter households at 30% or more of income */
  renter30: number;
  /** percent of renter households at 50% or more */
  renter50: number;
  /** percent of owners with a mortgage at 30% or more */
  mort30: number;
  /** percent of owners without a mortgage at 30% or more */
  free30: number;
  /** percent of all households at 30% or more, with its 90% range */
  all30: number;
  all30Low: number;
  all30High: number;
  /** median gross rent as a percentage of household income */
  rentMedianPct: number;
}

type SortKey =
  | "rank"
  | "name"
  | "renter30"
  | "renter50"
  | "mort30"
  | "free30"
  | "all30"
  | "rentMedianPct";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "renter30", label: "Renters, 30%+", align: "right" },
  { key: "renter50", label: "Renters, 50%+", align: "right" },
  { key: "mort30", label: "Owners with mortgage, 30%+", align: "right" },
  { key: "free30", label: "Owners without mortgage, 30%+", align: "right" },
  { key: "all30", label: "All households, 30%+", align: "left" },
  { key: "rentMedianPct", label: "Median rent, % of income", align: "right" },
];

const LOWER = 30;
const UPPER = 35;

export function StateBurdenTable({ rows, usShare }: { rows: BurdenTableRow[]; usShare: number }) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxShare = Math.max(...rows.map((r) => r.all30High));

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
            placeholder="e.g. Florida or FL"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent-500" />
            Under {LOWER}%
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-warning" />
            {LOWER}% to {UPPER}%
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-negative" />
            Over {UPPER}%
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
                r.all30 < LOWER ? "bg-accent-500" : r.all30 <= UPPER ? "bg-warning" : "bg-negative";
              return (
                <tr key={r.abbr} className="transition-colors hover:bg-gold-50">
                  <td className="px-3 py-2 text-ink-500">{r.rank}</td>
                  <td className="px-3 py-2 font-medium text-ink-900">{r.name}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.renter30.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.renter50.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.mort30.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.free30.toFixed(1)}%</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="relative h-2.5 w-28 shrink-0 rounded-full bg-ink-100"
                        title={`90% range: ${r.all30Low.toFixed(1)}% to ${r.all30High.toFixed(1)}%`}
                      >
                        <div
                          className={`h-2.5 rounded-full ${color}`}
                          style={{ width: `${(r.all30 / maxShare) * 100}%` }}
                        />
                        <div
                          className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                          style={{ left: `${(usShare / maxShare) * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="w-14 tabular-nums font-semibold text-ink-900">
                        {r.all30.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">
                    {r.rentMedianPct.toFixed(1)}%
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
        Rank 1 is the state where the largest share of households pays 30% or more of income for
        housing. Each percentage is a share of the households in that group for which the Census Bureau
        could compute the ratio. The thin vertical mark on each bar is the U.S. figure ({usShare.toFixed(1)}%).
        Hover a bar to see the 90% range from the Census margins of error; states whose ranges overlap
        are statistically tied.
      </p>
    </div>
  );
}
