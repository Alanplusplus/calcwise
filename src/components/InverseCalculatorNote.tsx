import Link from "next/link";

interface Props {
  href: string;
  linkText: string;
  children: React.ReactNode;
}

/** One-line pointer to the calculator that converts in the opposite direction. */
export function InverseCalculatorNote({ href, linkText, children }: Props) {
  return (
    <p className="mt-4 text-sm text-ink-500">
      {children}{" "}
      <Link
        href={href}
        className="font-semibold text-brand-700 underline decoration-gold-400 decoration-[1.5px] underline-offset-4 hover:text-brand-900"
      >
        {linkText}
      </Link>
      .
    </p>
  );
}
