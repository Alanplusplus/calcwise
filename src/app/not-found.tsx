import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24">
      <h1 className="text-6xl font-bold text-ink-300">404</h1>
      <p className="mt-4 text-lg text-ink-600">Page not found</p>
      <p className="mt-2 text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
