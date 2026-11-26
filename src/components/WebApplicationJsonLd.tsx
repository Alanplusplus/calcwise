import { founderPerson } from "@/lib/author";
import { site } from "@/lib/site";

interface Props {
  name: string;
  description: string;
  slug: string;
  /** ISO date (YYYY-MM-DD) the page content was last reviewed. */
  dateModified?: string;
}

export function WebApplicationJsonLd({ name, description, slug, dateModified }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${site.url}/calculators/${slug}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    author: founderPerson(),
    ...(dateModified && {
      dateModified: dateModified.includes("T") ? dateModified : `${dateModified}T00:00:00+00:00`,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
