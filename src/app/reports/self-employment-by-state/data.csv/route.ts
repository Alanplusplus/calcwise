import { csvResponse } from "@/lib/reports/csv";
import { REPORT, buildCsv } from "@/lib/reports/self-employment-by-state";

export const dynamic = "force-static";

export function GET() {
  return csvResponse(buildCsv(), REPORT);
}
