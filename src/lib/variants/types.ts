export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
  faq?: Array<{ q: string; a: string }>;
  comparisonNote?: string;
  keyResults?: Array<{ label: string; value: string }>;
}
