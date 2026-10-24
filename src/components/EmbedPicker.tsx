"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export interface EmbedPickerItem {
  slug: string;
  title: string;
  blurb: string;
  height: number;
}

function buildSnippet(item: EmbedPickerItem, autoResize: boolean): string {
  const lines = [
    `<iframe src="${site.url}/embed/${item.slug}" title="${item.title} by ${site.name}" width="100%" height="${item.height}" style="border:0;width:100%;max-width:720px" loading="lazy"></iframe>`,
    `<p style="font-size:13px;margin:6px 0 0">${item.title} by <a href="${site.url}/calculators/${item.slug}">${site.name}</a></p>`,
  ];
  if (autoResize) {
    lines.push(`<script async src="${site.url}/embed.js"></script>`);
  }
  return lines.join("\n");
}

export function EmbedPicker({ items }: { items: EmbedPickerItem[] }) {
  const [slug, setSlug] = useState(items[0].slug);
  const [autoResize, setAutoResize] = useState(true);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  // Links like /embed#mortgage preselect that calculator.
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (fromHash && items.some((i) => i.slug === fromHash)) {
      setSlug(fromHash);
      rootRef.current?.scrollIntoView({ block: "start" });
    }
  }, [items]);

  const item = items.find((i) => i.slug === slug) ?? items[0];
  const snippet = buildSnippet(item, autoResize);

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      areaRef.current?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section ref={rootRef} id="embed-picker" className="scroll-mt-6">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Calculator to embed">
        {items.map((i) => {
          const active = i.slug === item.slug;
          return (
            <button
              key={i.slug}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSlug(i.slug)}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {i.title.replace(/ Calculator$/, "")}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm text-ink-600">{item.blurb}.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="embed-code" className="text-sm font-semibold text-ink-900">
              Embed code
            </label>
            <button
              type="button"
              onClick={copy}
              className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              {copied ? "Copied" : "Copy code"}
            </button>
          </div>
          <textarea
            id="embed-code"
            ref={areaRef}
            readOnly
            value={snippet}
            rows={11}
            spellCheck={false}
            onFocus={(e) => e.currentTarget.select()}
            className="mt-2 w-full rounded-lg border border-ink-200 bg-ink-50 p-3 font-mono text-xs leading-relaxed text-ink-800"
          />
          <label className="mt-3 flex items-start gap-2 text-sm text-ink-600">
            <input
              type="checkbox"
              checked={autoResize}
              onChange={(e) => setAutoResize(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              Add the optional resize script so the frame always fits the calculator (leave it
              off on platforms that strip script tags; the frame then keeps a fixed height of{" "}
              {item.height}px, which can scroll inside the frame on narrow phones).
            </span>
          </label>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-900">Live preview</p>
          <div className="mt-2 overflow-hidden rounded-lg border border-ink-200 bg-ink-50">
            <iframe
              key={item.slug}
              src={`/embed/${item.slug}`}
              title={`${item.title} preview`}
              loading="lazy"
              className="block w-full border-0"
              style={{ height: item.height, maxHeight: 720 }}
            />
          </div>
          <p className="mt-2 text-xs text-ink-500">
            The preview scrolls inside this box. On your page the frame uses its full height.
          </p>
        </div>
      </div>
    </section>
  );
}
