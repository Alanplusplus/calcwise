import { buildCsv } from "@/lib/reports/mortgage-affordability-by-state";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calcwise-mortgage-affordability-by-state-2026.csv"',
    },
  });
}
