import Link from "next/link";
import { site } from "@/lib/site";

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

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-brand-700">{site.name}</h3>
            <p className="mt-2 text-sm text-ink-500">
              Free, accurate financial calculators to help you make confident
              money decisions. No signup required.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-ink-800">Calculators</h4>
            <ul className="mt-2 space-y-1.5">
              {popularCalculators.map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={`/calculators/${calc.slug}`}
                    className="text-sm text-ink-500 hover:text-brand-600"
                  >
                    {calc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink-800">Guides</h4>
            <ul className="mt-2 space-y-1.5">
              {featuredGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-sm text-ink-500 hover:text-brand-600"
                  >
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink-800">Company</h4>
            <ul className="mt-2 space-y-1.5">
              <li>
                <Link href="/guides" className="text-sm text-ink-500 hover:text-brand-600">
                  All Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-ink-500 hover:text-brand-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ink-500 hover:text-brand-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-ink-500 hover:text-brand-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink-800">Legal</h4>
            <ul className="mt-2 space-y-1.5">
              <li>
                <Link href="/privacy" className="text-sm text-ink-500 hover:text-brand-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-ink-500 hover:text-brand-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-200 pt-6 text-center text-sm text-ink-400">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Calculators are for educational purposes only. Consult a financial
            advisor for personalized advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
