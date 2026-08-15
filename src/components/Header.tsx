"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/calculators";
import { site } from "@/lib/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-700">{site.name}</span>
          <span className="hidden text-sm text-ink-500 sm:inline">
            {site.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/#${cat.slug}`}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/about"
            className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
          >
            About
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-ink-600 hover:bg-ink-100 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-ink-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/#${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-ink-600"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-ink-600"
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
