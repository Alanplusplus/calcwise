import { csvResponse } from "@/lib/reports/csv";
import { REPORT, buildCsv } from "@/lib/reports/mortgage-affordability-by-state";

export const dynamic = "force-static";

export function GET() {
  return csvResponse(buildCsv(), REPORT);
}
