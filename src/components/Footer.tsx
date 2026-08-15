import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/lib/calculators";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-brand-700">{site.name}</h3>
            <p className="mt-2 text-sm text-ink-500">
              Free, accurate financial calculators to help you make confident
              money decisions. No signup required.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-ink-800">Calculators</h4>
            <ul className="mt-2 space-y-1.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/#${cat.slug}`}
                    className="text-sm text-ink-500 hover:text-brand-600"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink-800">Company</h4>
            <ul className="mt-2 space-y-1.5">
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
