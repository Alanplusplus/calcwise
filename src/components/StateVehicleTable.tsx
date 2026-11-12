"use client";

import { useMemo, useState } from "react";

export interface VehicleTableRow {
  rank: number;
  name: string;
  abbr: string;
  /** vehicles available per household, all households */
  perHh: number;
  /** 90% margin of error of perHh */
  perHhMoe: number;
  /** percent of households with no vehicle */
  none: number;
  /** percent of households with 3 or more vehicles */
  threePlus: number;
  /** percent of renter households with no vehicle */
  renterNone: number;
  /** median household income, dollars */
  income: number;
  /** AAA insurance plus fuel for the average car-owning household's vehicles, % of median income */
  insFuelShare: number;
}

type SortKey =
  | "rank"
  | "name"
  | "perHh"
  | "none"
  | "threePlus"
  | "renterNone"
  | "income"
  | "insFuelShare";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "Rank", align: "left" },
  { key: "name", label: "State", align: "left" },
  { key: "perHh", label: "Vehicles per household", align: "left" },
  { key: "none", label: "No vehicle", align: "right" },
  { key: "threePlus", label: "3 or more", align: "right" },
  { key: "renterNone", label: "Renters, no vehicle", align: "right" },
  { key: "income", label: "Median income", align: "right" },
  { key: "insFuelShare", label: "Insurance + fuel, % of income", align: "right" },
];

const usd0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StateVehicleTable({
  rows,
  usPerHh,
  guidelinePct,
}: {
  rows: VehicleTableRow[];
  usPerHh: number;
  guidelinePct: number;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [asc, setAsc] = useState(true);
  const [query, setQuery] = useState("");

  const maxPerHh = Math.max(...rows.map((r) => r.perHh));

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
            placeholder="e.g. Wyoming or WY"
            className="w-52 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 shadow-input transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
          />
        </label>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand-600" />
            Vehicles per household
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-negative" />
            Above {guidelinePct}% of income
          </li>
        </ul>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200 bg-white shadow-card">
        <table className="w-full min-w-[920px] text-sm">
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
              const over = r.insFuelShare > guidelinePct;
              return (
                <tr key={r.abbr} className="transition-colors hover:bg-gold-50">
                  <td className="px-3 py-2 text-ink-500">{r.rank}</td>
                  <td className="px-3 py-2 font-medium text-ink-900">{r.name}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="relative h-2.5 w-24 shrink-0 rounded-full bg-ink-100"
                        title={`${r.perHh.toFixed(2)} vehicles per household, margin of error ±${r.perHhMoe.toFixed(2)}`}
                      >
                        <div
                          className="h-2.5 rounded-full bg-brand-600"
                          style={{ width: `${(r.perHh / maxPerHh) * 100}%` }}
                        />
                        <div
                          className="absolute top-[-2px] h-[14px] w-px bg-ink-700"
                          style={{ left: `${(usPerHh / maxPerHh) * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="w-10 tabular-nums font-semibold text-ink-900">{r.perHh.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.none.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.threePlus.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{r.renterNone.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-700">{usd0(r.income)}</td>
                  <td
                    className={`px-3 py-2 text-right tabular-nums ${over ? "font-semibold text-negative" : "text-ink-700"}`}
                  >
                    {r.insFuelShare.toFixed(1)}%
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
        Rank 1 is the state with the most vehicles available per household. The thin vertical mark on each
        bar is the U.S. figure ({usPerHh.toFixed(2)}); hover a bar for its margin of error. The last column
        applies AAA's national insurance and fuel costs for a new vehicle to the average household that has
        at least one vehicle, and divides by the state's median household income; figures in red are above{" "}
        {guidelinePct}%, the cap the 20/4/10 rule puts on payment, insurance, and fuel together.
      </p>
    </div>
  );
}
