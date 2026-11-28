"use client";

import { useMemo, useState } from "react";
import { StateNameLink } from "./StateNameLink";

export interface CommuteTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** mean one-way travel time of the commuters, minutes */
  meanMin: number;
  /** 90% margin of error of meanMin, minutes */
  meanMinMoe: number;
  /** round-trip commute hours a year at 250 commuting days */
  hoursYear: number;
  /** percent of commuters whose one-way trip is 60 minutes or more */
  long60: number;
  /** percent of all workers who worked from home */
  wfhShare: number;
  /** percent of all workers who drove alone */
  aloneShare: number;
  /** percent of all workers who took public transportation */
  transitShare: number;
  /** median earnings of workers who worked from home divided by that of workers who drove alone */
  earnRatio: number;
}

type SortKey =
  | "rank"
  | "name"
  | "meanMin"
  | "hoursYear"
  | "long60"
  | "wfhShare"
  | "aloneShare"
  | "transitShare"
  | "earnRatio";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "meanMin", label: "Mean one-way commute", align: "left" },
  { key: "hoursYear", label: "Round-trip hours a year", align: "right" },
  { key: "long60", label: "Commuters at 60+ minutes", align: "right" },
  { key: "wfhShare", label: "Work from home", align: "right" },
  { key: "aloneShare", label: "Drive alone", align: "right" },
  { key: "transitShare", label: "Public transit", align: "right" },
  { key: "earnRatio", label: "Median earnings, home vs. drive alone", align: "right" },
];

export function StateCommuteTable({
  rows,
  usMean,
}: {
  rows: CommuteTableRow[];
  usMean: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxMean = Math.max(...rows.map((r) => r.meanMin));

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
            placeholder="e.g. Maryland or MD"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand-600" />
            Mean one-way travel time of workers who commute
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[1120px] text-sm">
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
                <td className="px-3 py-2 font-medium text-ink-900">
                  <StateNameLink abbr={r.abbr} name={r.name} />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="relative h-2.5 w-24 shrink-0 rounded-full bg-ink-100"
                      title={`${r.meanMin.toFixed(1)} minutes one way, margin of error ±${r.meanMinMoe.toFixed(2)} minutes`}
                    >
                      <div
                        className="h-2.5 rounded-full bg-brand-600"
                        style={{ width: `${(r.meanMin / maxMean) * 100}%` }}
                      />
                      <div
                        className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                        style={{ left: `${(usMean / maxMean) * 100}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="w-16 tabular-nums font-semibold text-ink-900">{r.meanMin.toFixed(1)} min</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{Math.round(r.hoursYear)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.long60.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.wfhShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.aloneShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.transitShare.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.earnRatio.toFixed(2)}x</td>
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
        Rank 1 is the state with the longest mean one-way commute among workers who do not work from home. The
        thin vertical mark on each bar is the U.S. figure ({usMean.toFixed(1)} minutes); hover a bar for its
        margin of error. Hours a year double the one-way mean and multiply by 250 commuting days. Work from
        home, drive alone, and public transit are shares of all workers; 60+ minutes is a share of commuters.
        The last column divides the median earnings of workers who work from home by those of workers who
        drive alone.
      </p>
    </div>
  );
}
