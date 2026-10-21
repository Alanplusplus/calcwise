"use client";

import { useEffect } from "react";
import { EMBED_RESIZE_MESSAGE } from "@/lib/embeds";

/**
 * Runs inside the iframe. Reports the content height to the host page (which
 * resizes the iframe if it loaded /embed.js) and opens every link in a new tab
 * so visitors are not navigated away inside a small frame.
 */
export function EmbedResizer({ slug, targetId }: { slug: string; targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || window.parent === window) return;

    let last = 0;
    const report = () => {
      const height = Math.ceil(el.getBoundingClientRect().height);
      if (height === last) return;
      last = height;
      window.parent.postMessage({ type: EMBED_RESIZE_MESSAGE, slug, height }, "*");
    };

    const observer = new ResizeObserver(report);
    observer.observe(el);
    report();

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || !anchor.href || anchor.target === "_blank") return;
      event.preventDefault();
      window.open(anchor.href, "_blank", "noopener");
    };
    document.addEventListener("click", onClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, [slug, targetId]);

  return null;
}
