import { site } from "@/lib/site";

/**
 * schema.org Person for the founder, shared by Article, WebApplication and
 * Organization structured data so every page names the same author entity.
 */
export function founderPerson() {
  return {
    "@type": "Person",
    "@id": `${site.url}/about#founder`,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    url: `${site.url}/about`,
    sameAs: [site.founder.linkedin],
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}
