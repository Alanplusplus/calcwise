import type { Calculator } from "@/lib/calculators";
import type { CalculatorVariant } from "@/lib/variants/types";
import { BreadcrumbJsonLd } from "./BreadcrumbJsonLd";
import { WebApplicationJsonLd } from "./WebApplicationJsonLd";

interface Props {
  calc: Calculator;
  variant: CalculatorVariant;
}

/** Breadcrumb and WebApplication structured data shared by every variant page. */
export function VariantJsonLd({ calc, variant }: Props) {
  const category = calc.category.charAt(0).toUpperCase() + calc.category.slice(1);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: category, href: `/calculators/category/${calc.category}` },
          { name: calc.shortTitle, href: `/calculators/${calc.slug}` },
          { name: variant.title, href: `/calculators/${calc.slug}/${variant.slug}` },
        ]}
      />
      <WebApplicationJsonLd
        name={variant.title}
        description={variant.description}
        slug={`${calc.slug}/${variant.slug}`}
        dateModified={variant.lastUpdated}
      />
    </>
  );
}
