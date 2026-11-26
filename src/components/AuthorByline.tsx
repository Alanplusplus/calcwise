import { site } from "@/lib/site";

interface Props {
  className?: string;
}

/** Visible byline that links the page to the founder's LinkedIn profile. */
export function AuthorByline({ className = "mt-1 text-sm text-ink-500" }: Props) {
  return (
    <p className={className}>
      By{" "}
      <a
        href={site.founder.linkedin}
        rel="author noopener"
        target="_blank"
        className="font-medium text-ink-700 underline decoration-gold-400 decoration-[1.5px] underline-offset-4 hover:text-brand-700"
      >
        {site.founder.name}
      </a>
      , {site.founder.jobTitle} of {site.name}
    </p>
  );
}
