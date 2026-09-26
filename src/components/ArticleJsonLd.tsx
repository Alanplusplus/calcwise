import { site } from "@/lib/site";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  urlPrefix?: string;
}

function toIsoWithTz(date: string): string {
  return date.includes("T") ? date : `${date}T00:00:00+00:00`;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image,
  urlPrefix = "/guides",
}: ArticleJsonLdProps) {
  const pageUrl = `${site.url}${urlPrefix}/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: pageUrl,
    datePublished: toIsoWithTz(datePublished),
    dateModified: toIsoWithTz(dateModified || datePublished),
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/icon.png`,
      },
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${site.url}${image}`,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
