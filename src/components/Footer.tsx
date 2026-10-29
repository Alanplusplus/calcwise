import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark, Wordmark } from "./Logo";

const popularCalculators = [
  { slug: "mortgage", label: "Mortgage Calculator" },
  { slug: "compound-interest", label: "Compound Interest" },
  { slug: "retirement", label: "Retirement Calculator" },
  { slug: "savings-goal", label: "Savings Goal" },
  { slug: "debt-payoff", label: "Debt Payoff" },
  { slug: "loan-comparison", label: "Loan Comparison" },
  { slug: "emergency-fund", label: "Emergency Fund" },
];

const featuredGuides = [
  { slug: "how-much-house-can-i-afford", label: "How Much House Can I Afford?" },
  { slug: "compound-interest-real-examples", label: "Compound Interest Examples" },
  { slug: "debt-avalanche-vs-snowball", label: "Avalanche vs Snowball" },
  { slug: "401k-vs-roth-ira", label: "401(k) vs Roth IRA" },
  { slug: "save-50000-in-3-years", label: "Save $50K in 3 Years" },
];

const companyLinks = [
  { href: "/guides", label: "All Guides" },
  { href: "/about", label: "About Us" },
  { href: "/methodology", label: "Methodology" },
  { href: "/reports", label: "Data Reports" },
  { href: "/embed", label: "Embed Calculators" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const linkClass =
  "text-sm text-[#b9c4d4] transition-colors hover:text-white focus-visible:text-white";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="eyebrow eyebrow-light">{title}</h4>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-brand-950 text-[#b9c4d4]">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr]">
          <div>
            <Link href="/" aria-label={`${site.name} home`} className="inline-flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 shrink-0" />
              <Wordmark className="text-[1.5rem]" tone="light" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Free, accurate financial calculators built on primary-source data. No signup, and
              the numbers you enter never leave your browser.
            </p>
          </div>

          <Column title="Calculators">
            {popularCalculators.map((calc) => (
              <li key={calc.slug}>
                <Link href={`/calculators/${calc.slug}`} className={linkClass}>
                  {calc.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Guides">
            {featuredGuides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className={linkClass}>
                  {guide.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Company">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.github} target="_blank" rel="noopener" className={linkClass}>
                Source on GitHub
              </a>
            </li>
          </Column>

          <Column title="Legal">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms of Service
              </Link>
            </li>
          </Column>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#8d9bb0] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Calculators are for educational purposes only. Consult a financial advisor for
            personalized advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
