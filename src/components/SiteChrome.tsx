"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface SiteChromeProps {
  header: ReactNode;
  footer: ReactNode;
  jsonLd: ReactNode;
  children: ReactNode;
}

/**
 * Wraps the site header/footer so the iframe-only pages under /embed/[slug]
 * render the calculator on its own. /embed (the copy-the-code page) keeps the
 * normal chrome because only paths with a slug segment are framed.
 *
 * Vercel Web Analytics (cookieless, anonymized) is mounted only outside the
 * framed pages, so embedded calculators on other sites are never measured.
 */
export function SiteChrome({ header, footer, jsonLd, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isFramed = pathname?.startsWith("/embed/") ?? false;

  if (isFramed) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {jsonLd}
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      <Analytics />
    </>
  );
}
