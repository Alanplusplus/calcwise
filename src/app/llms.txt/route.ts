import { calculators, categories } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { reports } from "@/lib/reports";
import { site } from "@/lib/site";
import { variantRegistry } from "@/lib/variants";

export const dynamic = "force-static";

const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`, "");
  lines.push(
    `> ${oneLine(site.description)} Every calculator runs in the browser, shows its formula, and uses tax, wage, and rate figures checked against primary sources (IRS, BLS, Census, SSA, KFF). Nothing a visitor types is sent to a server.`,
    "",
  );
  lines.push(
    `${site.name} is founded and maintained by ${site.founder.name} (${site.founder.jobTitle}, ${site.founder.linkedin}). Pages that quote regulated or market figures show a Sources line and the month the figures were last checked. Content is educational and not personalized financial advice.`,
    "",
  );

  lines.push("## Key pages", "");
  lines.push(`- [Methodology](${site.url}/methodology): formulas, assumptions, data sources, and known limits behind each calculator`);
  lines.push(`- [About](${site.url}/about): who runs ${site.name} and the editorial standards`);
  lines.push(`- [Guides](${site.url}/guides): long-form guides with worked examples and case studies`);
  lines.push(`- [Data reports](${site.url}/reports): state-by-state datasets built from Census, IRS, and BLS sources`);
  lines.push("");

  lines.push("## Calculators", "");
  for (const cat of categories) {
    const inCat = calculators.filter((c) => c.category === cat.slug);
    if (inCat.length === 0) continue;
    lines.push(`### ${cat.name}`, "");
    for (const c of inCat) {
      lines.push(`- [${c.title}](${site.url}/calculators/${c.slug}): ${oneLine(c.description)}`);
    }
    lines.push("");
  }

  lines.push("## Scenario pages", "");
  lines.push("Each scenario page pre-fills a calculator for one specific situation and answers a narrow question with worked numbers.", "");
  for (const { calculator, variants } of variantRegistry) {
    for (const v of variants) {
      lines.push(`- [${v.title}](${site.url}/calculators/${calculator}/${v.slug}): ${oneLine(v.description)}`);
    }
  }
  lines.push("");

  lines.push("## Guides", "");
  for (const g of guides.filter((x) => x.published)) {
    lines.push(`- [${g.title}](${site.url}/guides/${g.slug}): ${oneLine(g.description)}`);
  }
  lines.push("");

  lines.push("## Data reports", "");
  for (const r of reports) {
    lines.push(`- [${r.title}](${site.url}${r.path}): ${oneLine(r.description)}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
