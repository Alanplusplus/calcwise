import { buildCsv } from "@/lib/reports/housing-cost-burden-by-state";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calcwise-housing-cost-burden-by-state-2026.csv"',
    },
  });
}
