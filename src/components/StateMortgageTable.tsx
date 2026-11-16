"use client";

import { useMemo, useState } from "react";

export interface MortgageTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** percent of owner households without a mortgage */
  noMort: number;
  /** 90% margin of error of noMort, percentage points */
  noMortMoe: number;
  /** percent of owner households with a second mortgage or home equity loan */
  second: number;
  /** percent of owner households with a householder 65 and over that still have a mortgage */
  mort65: number;
  /** median selected monthly owner costs, owners with a mortgage */
  medMort: number;
  /** median selected monthly owner costs, owners without a mortgage */
  medNoMort: number;
  /** median home value */
  value: number;
}

type SortKey = "rank" | "name" | "noMort" | "second" | "mort65" | "medMort" | "medNoMort" | "value";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "noMort", label: "Owners without a mortgage", align: "left" },
  { key: "second", label: "With a second mortgage or home equity loan", align: "right" },
  { key: "mort65", label: "Owners 65+ with a mortgage", align: "right" },
  { key: "medMort", label: "Median monthly cost, with mortgage", align: "right" },
  { key: "medNoMort", label: "Median monthly cost, no mortgage", align: "right" },
  { key: "value", label: "Median home value", align: "right" },
];

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StateMortgageTable({
  rows,
  usNoMort,
}: {
  rows: MortgageTableRow[];
  usNoMort: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxNoMort = Math.max(...rows.map((r) => r.noMort));

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
            placeholder="e.g. Ohio or OH"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand-600" />
            Share of owner households with no mortgage
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[1040px] text-sm">
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
            {visible.map((r) => (
              <tr key={r.abbr} className="transition-colors hover:bg-gold-50">
                <td className="px-3 py-2 text-ink-500">{r.rank}</td>
                <td className="px-3 py-2 font-medium text-ink-900">{r.name}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="relative h-2.5 w-24 shrink-0 rounded-full bg-ink-100"
                      title={`${r.noMort.toFixed(1)}% of owners have no mortgage, margin of error ±${r.noMortMoe.toFixed(1)} points`}
                    >
                      <div
                        className="h-2.5 rounded-full bg-brand-600"
                        style={{ width: `${(r.noMort / maxNoMort) * 100}%` }}
                      />
                      <div
                        className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                        style={{ left: `${(usNoMort / maxNoMort) * 100}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-14 tabular-nums font-semibold text-ink-900">{r.noMort.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.second.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.mort65.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.medMort)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.medNoMort)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.value)}</td>
              </tr>
            ))}
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
        Rank 1 is the state where the largest share of homeowners owns with no mortgage or other debt on the
        home. The thin vertical mark on each bar is the U.S. figure ({usNoMort.toFixed(1)}%); hover a bar for its
        margin of error. The two cost columns are medians for different groups of households, so they are not a
        before-and-after for one homeowner.
      </p>
    </div>
  );
}
