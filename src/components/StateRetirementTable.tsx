"use client";

import { useMemo, useState } from "react";

export interface RetirementTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** Social Security plus retirement dollars per household, all households, a year */
  combined: number;
  /** 90% margin of error of combined */
  combinedMoe: number;
  /** percent of households with Social Security income */
  ssShare: number;
  /** mean Social Security income of recipient households, a year */
  ssMean: number;
  /** percent of households with retirement, survivor, or disability income */
  retShare: number;
  /** mean retirement income of recipient households, a year */
  retMean: number;
  /** median household income of householders 65 and over */
  med65: number;
}

type SortKey = "rank" | "name" | "combined" | "ssShare" | "ssMean" | "retShare" | "retMean" | "med65";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "combined", label: "Per household, a year", align: "left" },
  { key: "ssShare", label: "Households with Social Security", align: "right" },
  { key: "ssMean", label: "Average Social Security", align: "right" },
  { key: "retShare", label: "Households with retirement income", align: "right" },
  { key: "retMean", label: "Average retirement income", align: "right" },
  { key: "med65", label: "Median income, householder 65+", align: "right" },
];

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StateRetirementTable({
  rows,
  usCombined,
}: {
  rows: RetirementTableRow[];
  usCombined: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxCombined = Math.max(...rows.map((r) => r.combined));

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
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand-600" />
            Social Security plus retirement income per household
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[980px] text-sm">
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
                      title={`${usd0(r.combined)} a year per household, margin of error ±${usd0(r.combinedMoe)}`}
                    >
                      <div
                        className="h-2.5 rounded-full bg-brand-600"
                        style={{ width: `${(r.combined / maxCombined) * 100}%` }}
                      />
                      <div
                        className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                        style={{ left: `${(usCombined / maxCombined) * 100}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-16 tabular-nums font-semibold text-ink-900">{usd0(r.combined)}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.ssShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.ssMean)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.retShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.retMean)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.med65)}</td>
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
        Rank 1 is the state where the average household receives the most Social Security plus retirement
        income a year, counting households that receive neither. The thin vertical mark on each bar is the U.S.
        figure ({usd0(usCombined)}); hover a bar for its margin of error. The two average columns are for
        the households that receive that income, not for all households.
      </p>
    </div>
  );
}
