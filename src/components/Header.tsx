"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/calculators";
import { site } from "@/lib/site";
import { LogoMark, Wordmark } from "./Logo";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" aria-label={`${site.name} home`} className="flex shrink-0 items-center gap-2.5">
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="flex flex-col">
            <Wordmark className="text-xl" />
            <span className="mt-1 hidden whitespace-nowrap text-[11px] font-medium leading-none tracking-wide text-ink-500 sm:block">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/calculators/category/${cat.slug}`}
              className="whitespace-nowrap text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/guides"
            className="whitespace-nowrap text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
          >
            Guides
          </Link>
          <Link
            href="/about"
            className="whitespace-nowrap text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
          >
            About
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-ink-600 hover:bg-ink-100 lg:hidden"
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
        <nav className="border-t border-ink-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/calculators/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-ink-600"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/guides"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-ink-600"
            >
              Guides
            </Link>
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
