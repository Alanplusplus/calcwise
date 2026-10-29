"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/calculators";
import { site } from "@/lib/site";
import { LogoMark, Wordmark } from "./Logo";

const links = [
  ...categories.map((cat) => ({
    href: `/calculators/category/${cat.slug}`,
    label: cat.name,
    // A calculator page belongs to its category, so the category link stays lit there too.
    match: (path: string) => path === `/calculators/category/${cat.slug}`,
  })),
  { href: "/guides", label: "Guides", match: (path: string) => path.startsWith("/guides") },
  { href: "/reports", label: "Reports", match: (path: string) => path.startsWith("/reports") },
  { href: "/about", label: "About", match: (path: string) => path.startsWith("/about") },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-50 border-t-[3px] border-t-brand-900 border-b border-b-ink-200 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <LogoMark className="h-8 w-8 shrink-0" />
          <Wordmark className="text-[1.5rem]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap py-1 text-[0.8125rem] font-medium tracking-[0.01em] transition-colors after:absolute after:inset-x-0 after:-bottom-[15px] after:h-[2px] after:origin-left after:bg-gold-500 after:transition-transform ${
                  active
                    ? "text-ink-900 after:scale-x-100"
                    : "text-ink-600 after:scale-x-0 hover:text-ink-900 hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md border border-ink-200 bg-white p-2 text-ink-700 transition-colors hover:border-ink-300 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile" className="border-t border-ink-200 bg-paper px-4 py-2 lg:hidden">
          <div className="flex flex-col divide-y divide-ink-200">
            {links.map((link) => {
              const active = link.match(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between py-3 text-sm font-medium ${
                    active ? "text-ink-900" : "text-ink-600"
                  }`}
                >
                  {link.label}
                  <span aria-hidden="true" className={active ? "text-gold-600" : "text-ink-300"}>
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
