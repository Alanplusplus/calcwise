import { buildCsv } from "@/lib/reports/self-employment-by-state";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calcwise-self-employment-by-state-2026.csv"',
    },
  });
}
